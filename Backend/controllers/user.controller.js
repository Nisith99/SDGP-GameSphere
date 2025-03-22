export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, headline, location, about, achievements, education, skills } = req.body;

    if (!user) {
      console.error("User not found for ID:", req.user._id);
      return res.status(404).json({ message: "User not found" });
    }

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