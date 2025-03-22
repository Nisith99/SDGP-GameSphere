<<<<<<< HEAD
// backend/controllers/user.controller.js
import mongoose from "mongoose";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
//import { User } from "../models/user.model.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get public profile
export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select("-password")
      .populate("connections", "name username profilePicture");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getPublicProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Rate user
export const rateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { score, comment } = req.body;

    console.log("Received userId in rateUser:", userId);
    console.log("Authenticated user:", req.user._id);

    if (!score || score < 1 || score > 5) {
      return res.status(400).json({ message: "Score must be between 1 and 5" });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId format:", userId);
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const userToRate = await User.findById(userId);
    if (!userToRate) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    if (req.user._id.toString() === userId) {
      return res.status(400).json({ message: "You cannot rate yourself" });
    }

    const isConnected = userToRate.connections.some(
      connection => connection.toString() === req.user._id.toString()
    );

    if (!isConnected) {
      return res.status(403).json({ message: "You can only rate users in your network" });
    }

    const existingRatingIndex = userToRate.ratings.findIndex(
      rating => rating.ratedBy.toString() === req.user._id.toString()
    );

    if (existingRatingIndex !== -1) {
      userToRate.ratings[existingRatingIndex] = {
        ratedBy: req.user._id,
        score,
        comment: comment || userToRate.ratings[existingRatingIndex].comment,
        createdAt: Date.now(),
      };
    } else {
      userToRate.ratings.push({
        ratedBy: req.user._id,
        score,
        comment: comment || "",
        createdAt: Date.now(),
      });
    }

    await userToRate.save();
    console.log("Rating saved successfully for user:", userId);

    res.status(200).json({
      message: "Rating submitted successfully",
      averageRating: userToRate.averageRating,
      ratingCount: userToRate.ratingCount,
    });
  } catch (error) {
    console.error("Error in rateUser controller:", error.message, error.stack);
    res.status(500).json({ message: "Server error" });
  }
};

// Get user ratings
export const getUserRatings = async (req, res) => {
  try {
    const { username } = req.params;
    
    const user = await User.findOne({ username })
      .select("ratings averageRating ratingCount")
      .populate("ratings.ratedBy", "name username profilePicture");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    let userRating = null;
    if (req.user) {
      userRating = user.ratings.find(
        rating => rating.ratedBy._id.toString() === req.user._id.toString()
      );
    }
    
    res.status(200).json({
      averageRating: user.averageRating,
      ratingCount: user.ratingCount,
      ratings: user.ratings,
      userRating: userRating ? {
        score: userRating.score,
        comment: userRating.comment,
        createdAt: userRating.createdAt,
      } : null,
    });
  } catch (error) {
    console.error("Error in getUserRatings controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get suggested connections
export const getSuggestedConnections = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("connections");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const suggestedUsers = await User.find({
      _id: { $ne: userId, $nin: user.connections },
    })
      .select("name username profilePicture")
      .limit(5);

    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.error("Error in getSuggestedConnections:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Configure Cloudinary (move to a config file if already done)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const updateProfile = async (req, res) => {
  try {
    console.log("Received PUT /users/profile request");
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    console.log("Authenticated user:", req.user);

    // Check authentication
    if (!req.user || !req.user._id) {
      console.error("No authenticated user found");
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    const allowedFields = [
      "name",
      "username",
      "headline",
      "about",
      "location",
      "profilePicture",
      "bannerImg",
      "skills",
      "experience",
      "education",
      "sport",
      "achievements",
    ];

    const updatedData = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined && req.body[field] !== null) {
        if (field === "achievements") {
          try {
            console.log("Raw achievements data:", req.body[field]);
            updatedData[field] = JSON.parse(req.body[field]);
            console.log("Parsed achievements:", updatedData[field]);
          } catch (jsonError) {
            console.error("Error parsing achievements:", jsonError);
            return res.status(400).json({ message: "Invalid achievements data format", error: jsonError.message });
          }
        } else {
          updatedData[field] = req.body[field];
        }
      }
    }

    console.log("Final data to update:", updatedData);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true, runValidators: true }
    ).select("-password");
=======
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, headline, location, about, achievements, education, skills } = req.body;
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872

    if (!user) {
      console.error("User not found for ID:", req.user._id);
      return res.status(404).json({ message: "User not found" });
    }

<<<<<<< HEAD
    console.log("Updated user:", user);
    res.json({ user });
=======
    // Update text fields
    if (name !== undefined) user.name = name;
    if (headline !== undefined) user.headline = headline;
    if (location !== undefined) user.location = location;
    if (about !== undefined) user.about = about;
    if (achievements !== undefined) user.achievements = JSON.parse(achievements);
    if (education !== undefined) user.education = JSON.parse(education);
    if (skills !== undefined) user.skills = JSON.parse(skills);

    // Define backend base URL (adjust port if different)
    const BASE_URL = process.env.NODE_ENV === "production" 
      ? "https://your-production-url.com" 
      : "http://localhost:5000";

    if (req.files) {
      console.log("Files received:", req.files);
      const { profilePicture, bannerImg } = req.files;

      if (profilePicture) {
        const profilePicturePath = path.join(
          __dirname,
          "../uploads/profile",
          `${userId}-${Date.now()}-${profilePicture.name}`
        );
        await profilePicture.mv(profilePicturePath);
        user.profilePicture = `${BASE_URL}/uploads/profile/${path.basename(profilePicturePath)}`;
      }

      if (bannerImg) {
        const bannerImgPath = path.join(
          __dirname,
          "../uploads/banner",
          `${userId}-${Date.now()}-${bannerImg.name}`
        );
        await bannerImg.mv(bannerImgPath);
        user.bannerImg = `${BASE_URL}/uploads/banner/${path.basename(bannerImgPath)}`;
      }
    }

    await user.save();

    const updatedUser = await User.findById(userId).select("-password");
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
>>>>>>> 7f619189c4c7aa1905ebbdec9dc5b3b15774f872
  } catch (error) {
    console.error("Error in updateProfile controller:", {
      message: error.message,
      stack: error.stack,
      details: error,
    });
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or email already exists" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: "Validation error", details: error.errors });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update getPublicProfile to use absolute URLs too
export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select("-password")
      .populate("connections", "name username profilePicture");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const BASE_URL = process.env.NODE_ENV === "production" 
      ? "https://your-production-url.com" 
      : "http://localhost:5000";

    if (user.profilePicture && !user.profilePicture.startsWith("http")) {
      user.profilePicture = `${BASE_URL}${user.profilePicture}`;
    }
    if (user.bannerImg && !user.bannerImg.startsWith("http")) {
      user.bannerImg = `${BASE_URL}${user.bannerImg}`;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getPublicProfile:", error);
    res.status(500).json({ message: "Server error" });
  }
};