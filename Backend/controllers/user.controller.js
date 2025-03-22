import User from "../models/user.model.js";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

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

    // Update text fields
    if (name !== undefined) user.name = name;
    if (headline !== undefined) user.headline = headline;
    if (location !== undefined) user.location = location;
    if (about !== undefined) user.about = about;
    if (achievements !== undefined) {
      try {
        user.achievements = JSON.parse(achievements);
      } catch (jsonError) {
        console.error("Error parsing achievements:", jsonError);
        return res.status(400).json({ message: "Invalid achievements data format" });
      }
    }
    if (education !== undefined) {
      try {
        user.education = JSON.parse(education);
      } catch (jsonError) {
        console.error("Error parsing education:", jsonError);
        return res.status(400).json({ message: "Invalid education data format" });
      }
    }
    if (skills !== undefined) {
      try {
        user.skills = JSON.parse(skills);
      } catch (jsonError) {
        console.error("Error parsing skills:", jsonError);
        return res.status(400).json({ message: "Invalid skills data format" });
      }
    }

    // Handle file uploads (if applicable)
    if (req.files) {
      console.log("Files received:", req.files);
      const BASE_URL = process.env.NODE_ENV === "production"
        ? "https://your-production-url.com"
        : "http://localhost:5000";
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

export const rateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Updated to use req.params.userId
    const { rating } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Add rating logic here (e.g., update a ratings field in the user model)
    res.status(200).json({ message: "User rated successfully" });
  } catch (error) {
    console.error("Error in rateUser:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserRatings = async (req, res) => {
  try {
    const { username } = req.params; // Updated to use username
    const user = await User.findOne({ username }).select("ratings");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Return ratings (assumes a ratings field exists in the model)
    res.status(200).json({ ratings: user.ratings || [] });
  } catch (error) {
    console.error("Error in getUserRatings:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

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
      .limit(10);

    res.status(200).json({
      message: "Suggested connections retrieved successfully",
      suggestedUsers,
    });
  } catch (error) {
    console.error("Error in getSuggestedConnections:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Removed the duplicate export statement
// export { rateUser, getUserRatings, getSuggestedConnections };