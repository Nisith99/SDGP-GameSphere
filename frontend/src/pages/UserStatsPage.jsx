import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { Trophy, Star, Loader2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import toast from "react-hot-toast";

// Helper function to calculate total points from achievements
const getTotalPoints = (achievements) => {
  return achievements?.reduce((sum, ach) => sum + (parseInt(ach.score) || 0), 0) || 0;
};

const UserStatsPage = () => {
  // Fetch user stats
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allUserStats"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/stats/test");
        return { users: res.data, totalUsers: res.data.length, totalPages: 1, currentPage: 1 };
      } catch (err) {
        throw err;
      }
    },
    retry: 2,
    retryDelay: 1000,
  });

  // State for sorting
  const [sortBy, setSortBy] = useState(null);

  // Memoized sorted users list
  const displayedUsers = useMemo(() => {
    if (!data || !data.users) return [];
    if (sortBy === "ratingDesc") {
      return [...data.users].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    } else if (sortBy === "pointsDesc") {
      return [...data.users].sort((a, b) => getTotalPoints(b.achievements) - getTotalPoints(a.achievements));
    }
    return data.users; // Original order
  }, [data, sortBy]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error("Failed to load users' stats. Please try again.");
    }
  }, [error]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.03, boxShadow: "0 12px 24px rgba(48, 47, 77, 0.15)", transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0D3F7] via-[#E0C2E5] to-[#B98EA7] flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-4 text-[#302F4D]">
          <Loader2 className="w-10 h-10 animate-spin text-[#A57982]" />
          <span className="text-xl font-medium">Loading users' stats...</span>
        </motion.div>
      </div>
    );
  }

  // Empty state
  if (!data || !data.users || data.users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0D3F7] via-[#E0C2E5] to-[#B98EA7] flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#302F4D] text-xl font-medium flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-[#A57982]" />
            <span>No user stats available</span>
          </div>
          <button className="px-4 py-2 bg-[#B98EA7] text-[#120D31] rounded-lg hover:bg-[#A57982] transition-colors" onClick={() => refetch()}>
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  // Helper to format achievement type
  const getAchievementTypeLabel = (type) => {
    const labels = {
      district: "District",
      province: "Province",
      state: "State",
      island: "Island",
      national: "National",
      international: "International",
    };
    return labels[type] || type;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0D3F7] via-[#E0C2E5] to-[#B98EA7] text-[#120D31]">
      <motion.div className="container mx-auto py-16 px-6 max-w-5xl" variants={containerVariants} initial="hidden" animate="visible">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-extrabold text-[#120D31] tracking-tight">Users' Stats</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setSortBy((prev) => (prev === "ratingDesc" ? null : "ratingDesc"))}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg ${
                sortBy === "ratingDesc" ? "bg-[#A57982] text-white" : "bg-[#B98EA7] text-[#120D31] hover:bg-[#A57982] hover:text-white"
              }`}
            >
              <Star className="w-5 h-5 mr-2" />
              {sortBy === "ratingDesc" ? "Reset Sort" : "Sort by Rating"}
            </button>
            <button
              onClick={() => setSortBy((prev) => (prev === "pointsDesc" ? null : "pointsDesc"))}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg ${
                sortBy === "pointsDesc" ? "bg-[#A57982] text-white" : "bg-[#B98EA7] text-[#120D31] hover:bg-[#A57982] hover:text-white"
              }`}
            >
              <Trophy className="w-5 h-5 mr-2" />
              {sortBy === "pointsDesc" ? "Reset Sort" : "Sort by Points"}
            </button>
          </div>
        </div>

        <div className="space-y-8">
          {displayedUsers.map((user, userIndex) => (
            <motion.div
              key={user._id || userIndex}
              className="bg-white/90 rounded-3xl shadow-md border border-[#302F4D]/20 p-8"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: userIndex * 0.1 }}
            >
              {/* User Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-[#120D31]">{user.name}</h2>
                <span className="text-[#302F4D]/80">Total Points: {getTotalPoints(user.achievements)}</span>
              </div>

              {/* Average Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <Star className="w-6 h-6 text-[#A57982]" />
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className={`${star <= Math.round(user.averageRating || 0) ? "text-[#A57982] fill-[#A57982]" : "text-[#302F4D]/20"}`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-[#120D31]">{(user.averageRating || 0).toFixed(1)}</span>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-semibold text-[#120D31] mb-4 flex items-center">
                  <Trophy className="w-6 h-6 text-[#A57982] mr-2" /> Achievements
                </h3>
                {user.achievements && user.achievements.length > 0 ? (
                  <div className="space-y-4">
                    {user.achievements.map((ach, achIndex) => (
                      <motion.div
                        key={ach._id || `ach-${achIndex}`}
                        className="flex justify-between items-center bg-[#F0D3F7]/50 p-3 rounded-xl border border-[#302F4D]/20"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: achIndex * 0.1 }}
                      >
                        <div className="flex items-center space-x-3">
                          <Trophy size={20} className="text-[#A57982]" />
                          <span className="text-[#302F4D] capitalize">
                            {getAchievementTypeLabel(ach.rankType || "Unknown")} Rank: {ach.rankValue || "N/A"}
                          </span>
                        </div>
                        <span className="text-[#120D31] font-semibold">{ach.score || 0} pts</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#302F4D]/80 italic">No achievements yet</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default UserStatsPage;