import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies["jwt-gamesphere"];

        if(!token){
            return res.status(401).json({message: "No taken provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: "Invalid token"})
        }

        const user = await User.findById(decoded.userId).select("-password")

        if(!user){
            return res.status(401).json({message: "User not founded"});
        }

        req.user = user;

        next();

    }catch(error){
        console.log("Error in middleware:", error.message);
        res.status(500).json({message: "Server error"});
    }
};

export const roleRequired = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied: required role not found" });
        }
        next();
    };
};