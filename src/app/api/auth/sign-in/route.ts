import { extractBasicToken } from "@/backend/authToken/extractBasicToken";
import { prisma } from "@/utils/prisma/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/backend/utils/generateToken";
import { TokenType } from "@/backend/utils/tokenType";

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

    const token = {
      accessToken: generateToken(loginUser, TokenType.ACCESS),
      refreshToken: generateToken(loginUser, TokenType.REFRESH),
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
