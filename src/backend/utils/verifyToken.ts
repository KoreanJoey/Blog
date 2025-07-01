import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    if (typeof decoded === "string") {
      throw new Error("Error: Invalid token", { cause: 401 });
    }

    return decoded;
  } catch (error) {
    throw new Error("Error: Invalid token", { cause: 401 });
  }
}
