import { randonIdGenerator } from "../../../../utils/lib/generator";
import { users, User } from "../db";


export async function POST(request: Request) {
  const body = await request.json();

  const authHeaders = request.headers.get("Authorization");
  console.log("AuthHeaders : ", authHeaders);
  console.log("auth body : ", body);

  if (!authHeaders) {
    return new Response("Auth Header does not exist");
  }

  const headersArray = authHeaders.split(" ");

  if (headersArray.length != 2) {
    return new Response("Unexpected token");
  }

  const header = headersArray[1];

  console.log("header : ", header);

  const decoded = Buffer.from(header, "base64").toString("utf-8").split(":");

  console.log("Decoded : ", decoded);

  const email = decoded[0];
  const password = decoded[1];
  const userId = randonIdGenerator();

  const user: User = {
    id: userId,
    name: body,
    email: email,
    password: password,
    createdAt: Date.now().toString(),
  };

  users.push(user);

  const savedUser = users.find((user) => user.id === userId);

  if (!savedUser) {
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
