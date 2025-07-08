import jwt from "jsonwebtoken";
import { TokenType } from "./tokenType";

export function verifyToken(token: string, tokenType: TokenType = TokenType.ACCESS) {
  const secret = tokenType === TokenType.REFRESH
    ? process.env.REFRESH_TOKEN_SECRET!
    : process.env.ACCESS_TOKEN_SECRET!;

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string") {
      throw new Error("Error: Invalid token", { cause: 401 });
    }

    return decoded;
  } catch (error) {
    throw new Error("Error: Invalid token", { cause: 401 });
  }
}
