import { extractBasicToken } from "@/backend/authToken/extractBasicToken";
import { User } from "@/generated/prisma";
import { prisma } from "@/utils/prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const [email, password] = extractBasicToken(request);

    const loginUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!loginUser) {
      return new Response(JSON.stringify("User not found"));
    }

    const isPasswordValid = await bcrypt.compare(password, loginUser.hash);

    if (!isPasswordValid) {
      return new Response(JSON.stringify("Invalid password"));
    }
    // Assuming login is successful, you would typically generate a token here.

    console.log("login success, here is your token");

    const generateToken = (user: User, isRefreshToken: boolean) => {
      const token = {
        sub: user.id,
        role: user.role,
        type: isRefreshToken ? "refresh" : "access",
      };

      const secret = isRefreshToken
        ? process.env.REFRESH_TOKEN_SECRET
        : process.env.ACCESS_TOKEN_SECRET;

      const expiresIn = isRefreshToken ? "3600h" : "1h";

      return jwt.sign(token, secret!, { expiresIn });
    };

    const token = {
      accessToken: generateToken(loginUser, false),
      refreshToken: generateToken(loginUser, true),
    };

    const response = {
      status: 200,
      statusText: "Login successful",
      data: token,
    };

    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
