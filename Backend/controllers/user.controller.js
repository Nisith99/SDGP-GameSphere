import User from "../models/user.model.js";

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, userName, password, profilePicture, coverImg, location, about, profileData } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (fullName) user.fullName = fullName;
        if (userName) user.userName = userName;
        if (password) user.password = password;
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

export const getProfile = async (req, res) => {
    try {
       const userId = req.user._id; 
 
       const user = await User.findById(userId).select('-password');
       if (!user) {
          return res.status(404).json({ message: "User not found" });
       }
 
       res.json({ 
          profile: {
             fullName: user.fullName,
             userName: user.userName,
             email: user.email,
             role: user.role,
             profilePicture: user.profilePicture,
             coverImg: user.coverImg,
             location: user.location,
             about: user.about,
             ...(user.role === 'player' ? { playerProfile: user.playerProfile } : {}),
             ...(user.role === 'club' ? { clubProfile: user.clubProfile } : {})
          }
       });
    } catch (error) {
       console.error("Error in getProfile:", error.message);
       res.status(500).json({ message: "Server error" });
    }
 };

