import bcrypt from "bcryptjs";
import { prisma } from "@/utils/prisma/prisma";
import { extractBasicToken } from "@/backend/authToken/extractBasicToken";

export async function POST(request: Request) {
  try {
    // 1. Bring the email and password - extract the email and password from http header

    const [email, password] = extractBasicToken(request);

    if (!email || !password) {
      return new Response("Email and password are required");
    }

    // 2. Bring the name from the request body

    const body = await request.json();

    if (!body.name) {
      return new Response("Error in request body");
    }

    // 3. Sign up the user - create a new user in the database

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: email,
        hash: hash,
      },
    });

    if (!user) {
      return new Response("Error: The user is not saved");
    }

    const response = {
      status: 200,
      statusText: "UserSignUpWell!",
      data: user,
    };

    console.log(response);

    return new Response(JSON.stringify(response));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}
