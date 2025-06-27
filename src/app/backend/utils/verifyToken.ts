import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

  return decoded;
}
