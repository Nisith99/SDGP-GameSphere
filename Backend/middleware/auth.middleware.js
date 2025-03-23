import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-gameSphere"];
    console.log("ProtectRoute - Token check:", {
      tokenPresent: !!token,
      tokenSnippet: token ? `${token.slice(0, 10)}...` : "Not present",
      requestPath: req.path,
    });

    if (!token) {
      console.warn("ProtectRoute - No token provided for request:", req.method, req.url);
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("ProtectRoute - Token decoded successfully:", {
        userId: decoded.userId,
        iat: decoded.iat,
        exp: decoded.exp,
      });
    } catch (jwtError) {
      console.error("ProtectRoute - JWT verification failed:", {
        error: jwtError.message,
        tokenSnippet: token.slice(0, 10) + "...",
      });
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.warn("ProtectRoute - User not found for ID:", decoded.userId);
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    console.log("ProtectRoute - Authentication successful:", {
      userId: user._id,
      username: user.username,
    });
    next();
  } catch (error) {
    console.error("ProtectRoute - Unexpected error:", {
      message: error.message,
      stack: error.stack,
      requestPath: req.path,
    });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};