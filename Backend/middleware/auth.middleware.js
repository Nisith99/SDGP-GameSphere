import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies["jwt-gameSphere"];
    console.log("Token received:", token ? "Present" : "Not present"); // Debug log

    // Check if token exists
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No Token Provided" });
    }

    // Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded:", decoded); // Debug log
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError.message); // Detailed error log
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    // Fetch user from database
    const user = await User.findById(decoded.userId).select("-password");
    console.log("User found:", user ? user._id : "Not found"); // Debug log

    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    // Attach user to request object
    req.user = user;
    console.log("protectRoute passed for user:", user._id); // Confirmation log

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message, error.stack); // Enhanced error logging
    return res.status(500).json({ message: "Internal Server Error" });
  }
};