import { extractBearerToken } from "@/backend/authToken/extractBearerToken";
import { RbacGuard } from "@/backend/guard/rbacGuard";
import { verifyToken } from "@/backend/utils/verifyToken";
import { User } from "@/generated/prisma";
import { prisma } from "@/utils/prisma/prisma";
import bcrypt from "bcryptjs";

export async function GET(request: Request) {
  try {
    const accessToken = extractBearerToken(request);

    const decoded = verifyToken(accessToken);

    const accessPermission = RbacGuard(decoded.role, "ADMIN");

    if (!accessPermission) {
      return new Response("Error: Unauthorized");
    }

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const response = {
      status: 200,
      statusText: "GetAllUsersWell",
      data: users,
    };

    return Response.json(response);
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: (error as Error).message,
        status: (error as Error).cause as number,
      })
    );
  }
}

export async function POST(request: Request) {
  const authHeaders = request.headers.get("Authorization");

  if (!authHeaders) {
    return new Response("Auth Header does not exist");
  }

  const headersArray = authHeaders.split(" ");

  if (headersArray.length != 2) {
    return new Response(JSON.stringify("Unexpected token"));
  }

  const header = headersArray[1];

  const decoded = Buffer.from(header, "base64").toString("utf-8").split(":");

  const email = decoded[0];
  const password = decoded[1];

  const hash = await bcrypt.hash(password, 10);

  const body = await request.json();

  if (!body.name) {
    return new Response("Error in request body");
  }

  const user: User = await prisma.user.create({
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
    statusText: "UserSavedWell!",
    data: user,
  };

  return new Response(JSON.stringify(response));
}
