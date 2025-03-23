import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { Trophy, Star, Loader2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import toast from "react-hot-toast";

const UserStatsPage = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allUserStats"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/stats/test");
        console.log("Test stats API response:", res.data);
        return { users: res.data, totalUsers: res.data.length, totalPages: 1, currentPage: 1 };
      } catch (err) {
        console.error("Failed to fetch stats:", err.message);
        throw err;
      }
    },
    retry: 2,
    retryDelay: 1000,
  });

  // Animation variants (unchanged)
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.03, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)", transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  useEffect(() => {
    if (error) {
      toast.error("Failed to load users' stats. Please try again.");
      console.error("Error details:", error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-4 text-gray-700">
          <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
          <span className="text-xl font-medium">Loading users' stats...</span>
        </motion.div>
      </div>
    );
  }

  if (!data || !data.users || data.users.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-700 text-xl font-medium flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-500" />
            <span>No user stats available</span>
          </div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" onClick={() => refetch()}>
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  const { users } = data;

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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800">
      <motion.div className="container mx-auto py-16 px-6 max-w-5xl" variants={containerVariants} initial="hidden" animate="visible">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-12 text-center tracking-tight">
          Users' Stats
        </h1>

        <div className="space-y-8">
          {users.map((user, userIndex) => (
            <motion.div
              key={user._id || userIndex}
              className="bg-white/90 rounded-3xl shadow-md border border-blue-200 p-8"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ delay: userIndex * 0.1 }}
            >
              {/* User Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  {user.name} (@{user.username || "unknown"})
                </h2>
              </div>

              {/* Average Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <Star className="w-6 h-6 text-yellow-500" />
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={24}
                      className={`${star <= Math.round(user.averageRating || 0) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-gray-900">{(user.averageRating || 0).toFixed(1)}</span>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Trophy className="w-6 h-6 text-yellow-500 mr-2" /> Achievements
                </h3>
                {user.achievements && user.achievements.length > 0 ? (
                  <div className="space-y-4">
                    {user.achievements.map((ach, achIndex) => (
                      <motion.div
                        key={ach._id || `ach-${achIndex}`}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-200"
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: achIndex * 0.1 }}
                      >
                        <div className="flex items-center space-x-3">
                          <Trophy size={20} className="text-yellow-500" />
                          <span className="text-gray-800 capitalize">
                            {getAchievementTypeLabel(ach.rankType || "Unknown")} Rank: {ach.rankValue || "N/A"}
                          </span>
                        </div>
                        <span className="text-gray-700 font-semibold">{ach.score || 0} pts</span>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 italic">No achievements yet</p>
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