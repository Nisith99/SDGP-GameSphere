import User from "../models/user.model.js"

export const ratingClub = async (req, res) => {
    try {
        const { clubId } = req.params;
        const { rate } = req.body;
        const userId = req.user._id; 

        if (!rate || rate < 1 || rate > 5) {
            return res.status(400).json({ message: "Rating must be between 1 and 5." });
        }

        const club = await User.findOne({ _id: clubId, role: "club" });

        if (!club) {
            return res.status(404).json({ message: "Ther is no club with this id." });
        }

        if (!club.clubProfile) {
            club.clubProfile = { rating: [], avgRating: 0 };
        }

        // check ratings array exists
        if (!Array.isArray(club.clubProfile.rating)) {
            club.clubProfile.rating = [];
        }

        const existingIndex = club.clubProfile.rating.findIndex(
            r => r.user.toString() === userId.toString()
        );

        if (existingIndex !== -1) {
            club.clubProfile.rating[existingIndex].rate = rate;
        } else {
            club.clubProfile.rating.push({ user: userId, rate });
        }

        const totalRating = club.clubProfile.rating.length;
        const avgRating = club.clubProfile.rating.reduce((sum, r) => sum + r.rate, 0) / totalRating;
        club.clubProfile.avgRating = parseFloat(avgRating.toFixed(1));

        await club.save();

        res.status(200).json({ message: "Submitted rating successfully", avgRating });

    } catch (error) {
        console.error("Error in rattingClub:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getClubRating = async (req, res) => {
    try {
        const { clubId } = req.params;

        const club = await User.findOne({ _id: clubId, role: "club" })
            .populate({
                path: "clubProfile.rating.user",
                select: "fullName userName profilePicture"
            });

        if (!club) {
            return res.status(404).json({ message: "There is no club with this id." });
        }

        res.status(200).json({
            averageRating: club.clubProfile.avgRating,
            rating: club.clubProfile.rating
        });
    } catch (error) {
        console.error("Error in getClubRating:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const getClubsSortedUsingRating = async (req, res) => {
    try {
        const clubs = await User.find({ role: "club" })
            .select("fullName userName profilePicture about clubProfile.avgRating")
            .lean();

        const sortedClubs = clubs.map(club => ({
                fullName: club.fullName,
                userName: club.userName,
                profilePicture: club.profilePicture,
                about: club.about,
                avgRating: parseFloat(club.clubProfile?.avgRating || 0).toFixed(1)
        })).sort((a, b) => {
            if(b.avgRating === a.avgRating) {
                return b.clubProfile.rating.leangth - a.clubProfile.rating.length;
            }
            return b.avgRating - a.avgRating;
        });

        res.status(200).json({ clubs: sortedClubs });
    } catch (error) {
        console.error("Error in getClubsSortedUsingRating:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const removeRating = async (req, res) => {
    try {
        const { clubId } = req.params;
        const userId = req.user._id;

        const club = await User.findOne({ _id: clubId, role: "club" });

        if (!club) {
            return res.status(404).json({ message: "There is no club with this id." });
        }

        if (!club.clubProfile || !Array.isArray(club.clubProfile.rating)) {
            return res.status(400).json({ message: "No ratings" });
        }

        const initialRatingsLength = club.clubProfile.rating.length;
        club.clubProfile.rating = club.clubProfile.rating.filter(
            r => r.user.toString() !== userId.toString()
        );

        if (club.clubProfile.rating.length > 0) {
            const totalRating = club.clubProfile.rating.reduce(
                (sum, r) => sum + r.rate, 
                0
            );
            club.clubProfile.avgRating = (totalRating / club.clubProfile.rating.length).toFixed(1);
        } else {
            club.clubProfile.avgRating = 0;
        }

        await club.save();

        const ratingRemoved = initialRatingsLength !== club.clubProfile.rating.length;
        res.status(200).json({ 
            message: ratingRemoved 
                ? "Rating removed successfully" 
                : "No rating found to remove",
            averageRating: club.clubProfile.avgRating 
        });
    } catch (error) {
        console.error("Error in removeRating:", error);
        res.status(500).json({ message: "Server error" });
    }
};