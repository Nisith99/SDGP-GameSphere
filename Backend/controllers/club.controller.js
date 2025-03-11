import User from "../models/user.model.js";

export const getClubProfils = async (req, res) => {
    try {
        const clubs = await User.find({ role: "club" }).select("userName fullName profilePicture about");

        if (!clubs.length) {
            return res.status(404).json({ message: "Not any club profile found" });
        }

        res.status(200).json({ clubs });
    } catch (error) {
        console.error("Error in getClubProfils:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getClubProfileById = async (req, res) => {
    try {
        const { clubId } = req.params;

        const club = await User.findOne({ _id: clubId, role: "club" })
            .select("-password")
            .lean();

        if (!club) {
            return res.status(404).json({ message: "Club profile not found" });
        }

        const clubProfile = {
            fullName: club.fullName,
            userName: club.userName,
            email: club.email,
            profilePicture: club.profilePicture,
            location: club.location,
            about: club.about,
            playerProfile: club.playerProfile
        };

        res.status(200).json({ club: clubProfile });
    } catch (error) {
        console.error("Error in getClubProfileById:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
