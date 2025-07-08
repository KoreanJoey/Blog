import { User } from "@/generated/prisma";
import jwt from "jsonwebtoken";
import { TokenType } from "./tokenType";

export const generateToken = (user: User, tokenType: TokenType) => {
  const token = {
    sub: user.id,
    role: user.role,
    type: tokenType,
  };

  const secret = tokenType === TokenType.REFRESH
    ? process.env.REFRESH_TOKEN_SECRET!
    : process.env.ACCESS_TOKEN_SECRET!;

  const expiresIn = tokenType === TokenType.REFRESH ? "3600h" : "1h";

  return jwt.sign(token, secret, { expiresIn });
};

