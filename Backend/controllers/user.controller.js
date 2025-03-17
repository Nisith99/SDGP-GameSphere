import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const { fullName, profilePicture, email, location, about, playerProfile, clubProfile } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (fullName) user.fullName = fullName;
        if (profilePicture) user.profilePicture = profilePicture;
        if (email) user.email = email;
        if (location) user.location
        if (about) user.about = about;

        if (user.role === 'player' && playerProfile) {
            user.playerProfile.sport = playerProfile.sport || user.playerProfile.sport;
            user.playerProfile.skills = playerProfile.skills || user.playerProfile.skills;
            user.playerProfile.achievements.province = playerProfile.achievements?.province || user.playerProfile.achievements.province;
            user.playerProfile.achievements.district = playerProfile.achievements?.district || user.playerProfile.achievements.district;
            user.playerProfile.achievements.island = playerProfile.achievements?.island || user.playerProfile.achievements.island;
        }

        if (user.role === 'club' && clubProfile) {
            user.clubProfile.sportType = clubProfile.sportType || user.clubProfile.sportType;
            user.clubProfile.ageRange = clubProfile.ageRange ?? user.clubProfile.ageRange;
            user.clubProfile.opportunities = clubProfile.opportunities || user.clubProfile.opportunities;
        
        }

        await user.save();
        res.status(200).json({ 
            message: "Profile updated successfully", 
            user: {
                fullName: user.fullName,
                profilePicture: user.profilePicture
            } 
        });

    } catch (error) {
        console.error("Error in updating profile:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getProfile = async (req, res) => {
    try {
       const userId = req.user._id; 
 
       const user = await User.findById(userId).select('-password').lean();
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
