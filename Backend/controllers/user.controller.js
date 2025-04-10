// backend/controllers/user.controller.js
import User from "../models/user.model.js";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { uploadToCloudinary } from "../lib/cloudinary.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const updateProfile = async (req, res) => {
  try {
    console.log("Received PUT /users/profile request");
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    console.log("Authenticated user:", req.user);

    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      console.error("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    const { name, headline, location, about, achievements, education, skills } = req.body;

    if (name !== undefined) user.name = name;
    if (headline !== undefined) user.headline = headline;
    if (location !== undefined) user.location = location;
    if (about !== undefined) user.about = about;
    if (achievements !== undefined) {
      user.achievements = Array.isArray(achievements) ? achievements : JSON.parse(achievements || "[]");
    }
    if (education !== undefined) {
      user.education = Array.isArray(education) ? education : JSON.parse(education || "[]");
    }
    if (skills !== undefined) {
      user.skills = Array.isArray(skills) ? skills : JSON.parse(skills || "[]");
    }

    if (req.files) {
      const { profilePicture, bannerImg } = req.files;
    
      if (profilePicture) {
        const result = await uploadToCloudinary(profilePicture, "profile");
        user.profilePicture = result.secure_url;
      }
    
      if (bannerImg) {
        const result = await uploadToCloudinary(bannerImg, "banner");
        user.bannerImg = result.secure_url;
      }
    }

    await user.save();

    const updatedUser = await User.findById(userId).select("-password");
    console.log("Updated user:", updatedUser);
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
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

export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;
    console.log(`Fetching public profile for username: ${username}`);
    const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } })
      .select("-password")
      .populate("connections", "name username profilePicture");

    if (!user) {
      console.log(`User not found: ${username}`);
      return res.status(404).json({ message: "User not found" });
    }

    const BASE_URL = process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:5000";

    if (user.profilePicture && !user.profilePicture.startsWith("http")) {
      user.profilePicture = `${BASE_URL}${user.profilePicture}`;
    }
    if (user.bannerImg && !user.bannerImg.startsWith("http")) {
      user.bannerImg = `${BASE_URL}${user.bannerImg}`;
    }

    console.log(`Profile fetched successfully for: ${username}`);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getPublicProfile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const rateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rating, comment } = req.body;
    const raterId = req.user._id;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingRating = user.ratings.find(r => r.ratedBy.toString() === raterId.toString());
    if (existingRating) {
      existingRating.score = rating;
      existingRating.comment = comment || "";
      existingRating.createdAt = Date.now();
    } else {
      user.ratings.push({
        ratedBy: raterId,
        score: rating,
        comment: comment || "",
      });
    }

    await user.save();
    res.status(200).json({ message: "User rated successfully" });
  } catch (error) {
    console.error("Error in rateUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserRatings = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username })
      .select("ratings averageRating ratingCount")
      .populate("ratings.ratedBy", "name username profilePicture");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.status(200).json({
      ratings: user.ratings,
      averageRating: user.averageRating,
      ratingCount: user.ratingCount
    });
  } catch (error) {
    console.error("Error in getUserRatings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getSuggestedConnections = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("connections skills sport");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const suggestedUsers = await User.find({
      _id: { $ne: userId, $nin: user.connections },
      $or: [
        { sport: user.sport },
        { skills: { $in: user.skills } }
      ]
    })
      .select("name username profilePicture sport skills")
      .limit(10);

    const BASE_URL = process.env.NODE_ENV === "production"
      ? process.env.BASE_URL
      : "http://localhost:5000";

    const formattedUsers = suggestedUsers.map(user => ({
      ...user.toObject(),
      profilePicture: user.profilePicture 
        ? user.profilePicture.startsWith("http") 
          ? user.profilePicture 
          : `${BASE_URL}${user.profilePicture}`
        : ""
    }));

    res.status(200).json({
      message: "Suggested connections retrieved successfully",
      suggestedUsers: formattedUsers,
    });
  } catch (error) {
    console.error("Error in getSuggestedConnections:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUserStats = async (req, res) => {
  try {
    console.log("Fetching stats for all users");
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("name username averageRating achievements")
      .skip(skip)
      .limit(limit)
      .lean();

    const totalUsers = await User.countDocuments();

    if (!users || users.length === 0) {
      console.log("No users found in the database");
      return res.status(404).json({ message: "No users found" });
    }

    console.log(`Fetched stats for ${users.length} users on page ${page}`);
    res.status(200).json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page,
    });
  } catch (error) {
    console.error("Error in getAllUserStats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add test endpoint for getting user statistics
export const getTestUserStats = async (req, res) => {
  try {
    const users = await User.find().select("name username averageRating achievements").lean();
    console.log("Test stats fetched:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getTestUserStats:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    console.log("searchUsers function called with query:", req.query);
    const { q } = req.query;

    if (!q || q.trim().length < 1) {
      console.log("Invalid search query received");
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await User.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { username: { $regex: q, $options: 'i' } }
      ]
    }).select('_id name username profilePicture sport');

    res.status(200).json({
      users,
      query: q
    });
  } catch (error) {
    console.error("Error in searchUsers:", {
      message: error.message,
      stack: error.stack
    });
    res.status(500).json({ 
      message: "Server error",
      error: error.message 
    });
  }
};
