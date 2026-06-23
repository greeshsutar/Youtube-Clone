import bcrypt from "bcrypt";

import { User } from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export async function register(req, res) {
  const { username, email, password } = req.body || {};

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "username, email, and password are required" });
  }

  const emailNorm = String(email).toLowerCase().trim();

  const exists = await User.findOne({ email: emailNorm });
  if (exists) {
    return res.status(409).json({ success: false, message: "Email already registered" });
  }

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    username: String(username).trim(),
    email: emailNorm,
    passwordHash
  });

  // Create token
  const token = generateToken(user);

  return res.status(201).json({
    success: true,
    message: "User registered",
    data: {
      token,
      user: { id: user._id, username: user.username, email: user.email }
    }
  });
}

export async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "email and password are required" });
  }

  const emailNorm = String(email).toLowerCase().trim();
  const user = await User.findOne({ email: emailNorm });
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }

  const token = generateToken(user);

  return res.json({
    success: true,
    message: "Login successful",
    data: {
      token,
      user: { id: user._id, username: user.username, email: user.email }
    }
  });
}

