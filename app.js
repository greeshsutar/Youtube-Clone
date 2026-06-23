import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";

dotenv.config();

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// Health
app.get("/", (req, res) => {
  res.json({ success: true, message: "YouTube Clone API running" });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, ok: true });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/channel", channelRoutes);
app.use("/api/likes", likeRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  // Avoid leaking stack traces in production
  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" ? { stack: err.stack } : {})
  });
});

// Ensure DB connection is established when app is imported/started
await connectDB();

export default app;

