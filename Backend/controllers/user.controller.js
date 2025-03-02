import User from "../models/user.model.js";

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, userName, profilePicture, coverImg, location, about, profileData } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (fullName) user.fullName = fullName;
        if (userName) user.userName = userName;
        if (profilePicture) user.profilePicture = profilePicture;
        if (coverImg) user.coverImg = coverImg;
        if (location) user.location = location;
        if (about) user.about = about;

        if (user.role === "player") {
            user.playerProfile = { ...user.playerProfile, ...profileData };
        } else if (user.role === "club") {
            user.clubProfile = { ...user.clubProfile, ...profileData };
        }

        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};