import { users, User } from "../db";

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

  console.log("Decoded : ", decoded);
  console.log("email : ", email);
  console.log("password : ", password);

  const selectedUser = users.find((user) => user.email === email);

  if (!selectedUser) {
    console.log(selectedUser);

    console.log("selectedUser not found");

    return new Response(JSON.stringify("Invalid email"));
  }

  if (selectedUser.password !== password) {
    console.log("Invalid password");

    return new Response(JSON.stringify("Invalid password"));
  }

  console.log("login success, here is your token");

  const token = {
    message: "login success",
    accessToken: "accessToken",
    refreshToken: "refreshToken",
  };

  return new Response(JSON.stringify(token));
}
