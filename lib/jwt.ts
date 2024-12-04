// utils/jwt.ts
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "supersecretkey";

export function generateToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string | undefined) {
  if (!token) {
    return null;
  }
  return jwt.verify(token, SECRET);
}
