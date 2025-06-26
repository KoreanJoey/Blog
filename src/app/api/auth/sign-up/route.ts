import { randonIdGenerator } from "../../../../utils/lib/generator";
import bcrypt from "bcryptjs";
import { prisma } from "@/utils/prisma/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const authHeaders = request.headers.get("Authorization");

  if (!authHeaders) {
    return new Response("Auth Header does not exist");
  }

  const headersArray = authHeaders.split(" ");

  if (headersArray.length != 2) {
    return new Response("Unexpected token");
  }

  if (headersArray[0].toLowerCase() !== "basic") {
    return new Response("Auth Header is not Basic");
  }

  const header = headersArray[1];

  const decoded = Buffer.from(header, "base64").toString("utf-8").split(":");

  if (decoded.length !== 2) {
    return new Response("Invalid Authorization header format");
  }

  if (!body.name) {
    return new Response("Error in request body");
  }

  const [email, password] = decoded;

  if (!email || !password) {
    return new Response("Email and password are required");
  }

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
}
