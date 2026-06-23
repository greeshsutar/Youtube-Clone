import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Missing/invalid Authorization header" });
    }

    const token = header.slice("Bearer ".length);
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) {
      return res.status(500).json({ success: false, message: "JWT secret not configured" });
    }

    const decoded = jwt.verify(token, secret);

    // attach to request
    req.user = {
      id: decoded.sub,
      email: decoded.email
    };

    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid/expired token" });
  }
}

