import User from "../models/user.model.js";

export const getPlayerProfils = async (req, res) => {
    try {
        const players = await User.find({ role: "player" }).select("userName fullName profilePicture about");

        if (!players.length) {
            return res.status(404).json({ message: "Not any player profile found" });
        }

        res.status(200).json({ players });
    } catch (error) {
        console.error("Error in getPlayerProfils:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getPlayerProfileById = async (req, res) => {
    try {
        const { playerId } = req.params;

        const player = await User.findOne({ _id: playerId, role: "player" })
            .select("-password")
            .lean();

        if (!player) {
            return res.status(404).json({ message: "player profile not found" });
        }

        const playerProfile = {
            fullName: player.fullName,
            userName: player.userName,
            email: player.email,
            profilePicture: player.profilePicture,
            location: player.location,
            about: player.about,
            playerProfile: player.playerProfile
        };

        res.status(200).json({ player: playerProfile });
    } catch (error) {
        console.error("Error in getPlayerProfileById:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};
