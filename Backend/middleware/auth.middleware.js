import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies["jwt-gameSphere"];
    console.log("Token received in protectRoute:", token ? "Present" : "Not present");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token decoded:", decoded);
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError.message);
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("User not found for decoded ID:", decoded.userId);
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }

    req.user = user;
    console.log("Authentication successful for user:", user._id);
    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message, error.stack);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};