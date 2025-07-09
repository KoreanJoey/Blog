import { TokenType } from "@/backend/utils/tokenType";
import jwt from "jsonwebtoken";

export const testGenerateToken = (tokenType: TokenType) => {
  const token = {
    sub: "1",
  };

  const secret =
    tokenType === TokenType.REFRESH
      ? process.env.REFRESH_TOKEN_SECRET!
      : process.env.ACCESS_TOKEN_SECRET!;

  const expiresIn = tokenType === TokenType.REFRESH ? "1min" : "1000ms";

  return jwt.sign(token, secret, { expiresIn });
};
