import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";


export const getSuggestedConnections = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select("connections");

    // Find users who are not connected and exclude the current user
    const suggestedUsers = await User.find({
      _id: {
        $ne: req.user._id,
        $nin: currentUser.connections,
      },
      status: "active", // Only suggest active users
    })
      .select("name username profilePicture headline sport") // Include sport
      .limit(3);

    res.json(suggestedUsers);
  } catch (error) {
    console.error("Error in getSuggestedConnections controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const getPublicProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select("-password") // Exclude password
      .populate("connections", "username name profilePicture"); // Populate connections with basic info

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getPublicProfile controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
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
      "sport", // Added sport to editable fields
    ];

    const updatedData = {};

    for (const field of allowedFields) {
      if (req.body[field]) {
        updatedData[field] = req.body[field];
      }
    }

    // Handle profile picture upload
    if (req.body.profilePicture) {
      const result = await cloudinary.uploader.upload(req.body.profilePicture);
      updatedData.profilePicture = result.secure_url;
    }

    // Handle banner image upload
    if (req.body.bannerImg) {
      const result = await cloudinary.uploader.upload(req.body.bannerImg);
      updatedData.bannerImg = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true, runValidators: true } // Validate updates
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in updateProfile controller:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export const searchUsers = async (req, res) => {
	console.log("searchUsers called with query:", req.query.q);
	try {
	  const query = req.query.q?.toLowerCase() || "";
	  if (!query) {
		console.log("No query, returning empty array");
		return res.status(200).json([]);
	  }
	  const users = await User.find(
		{ 
		  $text: { $search: query },
		  status: "active",
		},
		{ score: { $meta: "textScore" } }
	  )
		.where("_id").ne(req.user._id)
		.sort({ score: { $meta: "textScore" } })
		.select("username name sport profilePicture")
		.limit(10);
	  console.log("Search results:", users.length, "users found");
	  res.status(200).json(users);
	} catch (error) {
	  console.error("Error in searchUsers:", error);
	  res.status(500).json({ message: "Server error" });
	}
  };