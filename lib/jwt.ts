// utils/jwt.ts
interface TokenData {
  email: string;
  iat: number;
  exp: number;
}

import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export function generateToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string | undefined): TokenData | null {
  if (!token) {
    return null;
  }
  try {
    return jwt.verify(token, SECRET) as TokenData;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}
