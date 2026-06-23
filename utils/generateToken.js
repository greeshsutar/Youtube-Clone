import jwt from "jsonwebtoken";

export function generateToken(user) {
  const secret = process.env.JWT_ACCESS_SECRET;
  const expiresIn = process.env.JWT_ACCESS_EXPIRES_IN || "7d";

  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET is not set");
  }

  // Keep payload minimal
  const payload = {
    sub: user._id.toString(),
    email: user.email
  };

  return jwt.sign(payload, secret, { expiresIn });
}

