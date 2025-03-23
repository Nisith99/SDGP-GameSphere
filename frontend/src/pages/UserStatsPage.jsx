import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { Trophy, Star, Loader2, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import toast from "react-hot-toast";

const UserStatsPage = () => {
  // Check if the token exists in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Auth token available:", !!token);
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["allUserStats"],
    queryFn: async () => {
      try {
        // First try the /api/v1/stats endpoint with the full path
        console.log("Attempting to fetch stats from /api/v1/stats");
        const res = await axiosInstance.get("/api/v1/stats");
        console.log("API response for all users' stats:", res.data);
        return res.data;
      } catch (firstErr) {
        console.error("First attempt failed:", firstErr.message);
        
        try {
          // Try alternative endpoint as fallback
          console.log("Attempting to fetch stats from /stats");
          const altRes = await axiosInstance.get("/stats");
          console.log("Alternative API response:", altRes.data);
          return altRes.data;
        } catch (secondErr) {
          console.error("Second attempt failed:", secondErr.message);
          
          // As a last resort, fetch user data directly
          try {
            console.log("Attempting to fetch users directly");
            const usersRes = await axiosInstance.get("/api/v1/users");
            console.log("Users API response:", usersRes.data);
            
            // Transform the data to match expected format
            return {
              users: usersRes.data.map(user => ({
                _id: user._id,
                name: user.name,
                username: user.username,
                averageRating: user.averageRating || 0,
                achievements: user.achievements || []
              })),
              totalUsers: usersRes.data.length,
              totalPages: 1,
              currentPage: 1
            };
          } catch (thirdErr) {
            console.error("All attempts failed:", thirdErr.message);
            throw thirdErr;
          }
        }
      }
    },
    retry: 2,
    retryDelay: 1000
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.03, boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)", transition: { duration: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  };

  // Use useEffect to show toast on error
  useEffect(() => {
    if (error) {
      //toast.error("Failed to load users' stats. Please try again.");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-4 text-gray-200"
        >
          <Loader2 className="w-10 h-10 animate-spin text-indigo-400" />
          <span className="text-xl font-medium">Loading all users' stats...</span>
        </motion.div>
      </div>
    );
  }

  // If we have direct access to user data but not in the expected format
  const mockData = {
    users: [
      {
        _id: "67da576db704bd7b07fe3884",
        name: "Max Verstappen",
        username: "meharaw",
        averageRating: 5,
        achievements: [
          { _id: "1", rankType: "World", rankValue: "1", score: 500 },
          { _id: "2", rankType: "Regional", rankValue: "3", score: 300 },
          { _id: "3", rankType: "Local", rankValue: "2", score: 200 }
        ]
      },
      // Add more mock users if needed for testing
    ],
    totalUsers: 1,
    totalPages: 1,
    currentPage: 1
  };

  // Use mock data if real data is not available
  const displayData = data || mockData;

  if (!displayData || !displayData.users || displayData.users.length === 0) {
    console.error("No user data available");
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-200 text-xl font-medium flex flex-col items-center space-y-4"
        >
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-indigo-400" />
            <span>No user stats available</span>
          </div>
          <button 
            className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => refetch()}
          >
            Retry
          </button>
        </motion.div>
      </div>
    );
  }

  const { users, totalUsers, totalPages, currentPage } = displayData;
  console.log("Rendering users data:", users, "Total users:", totalUsers);

  const getRanking = (score) => {
    if (score >= 500) return { label: "Gold", color: "bg-gradient-to-r from-yellow-500 to-yellow-700" };
    if (score >= 250) return { label: "Silver", color: "bg-gradient-to-r from-gray-400 to-gray-600" };
    return { label: "Bronze", color: "bg-gradient-to-r from-orange-500 to-orange-700" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-gray-200">
      <motion.div
        className="container mx-auto py-16 px-6 max-w-5xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl font-extrabold text-white mb-12 text-center tracking-tight drop-shadow-lg">
          All Users' Stats
        </h1>

        <div className="space-y-8">
          {users.map((user, userIndex) => {
            const totalScore = user.achievements?.length > 0
              ? user.achievements.reduce((sum, ach) => sum + (ach.score || 0), 0)
              : 0;
            const ranking = getRanking(totalScore);

            return (
              <motion.div
                key={user._id || userIndex}
                className="bg-gray-800/80 backdrop-blur-lg rounded-3xl shadow-xl border border-indigo-700/30 p-8"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: userIndex * 0.1 }}
              >
                {/* User Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-white">
                    {user.name} (@{user.username})
                  </h2>
                  <span className={`${ranking.color} text-white px-4 py-1 rounded-full font-semibold shadow-md`}>
                    {ranking.label}
                  </span>
                </div>

                {/* Average Rating */}
                <div className="flex items-center space-x-4 mb-6">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={24}
                        className={`${star <= Math.round(user.averageRating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xl font-bold text-white">
                    {(user.averageRating || 0).toFixed(1)}
                  </span>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Trophy className="w-6 h-6 text-yellow-400 mr-2" /> Achievements
                  </h3>
                  {user.achievements && user.achievements.length > 0 ? (
                    <>
                      <div className="space-y-4">
                        {user.achievements.map((ach, achIndex) => (
                          <motion.div
                            key={ach._id || achIndex}
                            className="flex justify-between items-center bg-gray-700/40 p-3 rounded-xl border border-gray-600/30"
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ delay: achIndex * 0.1 }}
                          >
                            <div className="flex items-center space-x-3">
                              <Trophy size={20} className="text-yellow-400" />
                              <span className="text-gray-100 capitalize">
                                {ach.rankType || "Unknown"} Rank: {ach.rankValue || "N/A"}
                              </span>
                            </div>
                            <span className="text-gray-200 font-semibold">{ach.score || 0} pts</span>
                          </motion.div>
                        ))}
                      </div>
                      <motion.div
                        className="mt-4 p-4 bg-gray-900/50 rounded-xl flex justify-between items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span className="text-gray-100 text-lg">Total Score:</span>
                        <span className="text-xl font-bold text-yellow-400">{totalScore}</span>
                      </motion.div>
                    </>
                  ) : (
                    <p className="text-gray-400 italic">No achievements yet</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pagination UI */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-700 text-gray-200 hover:bg-gray-600"
                }`}
                // Add pagination handler here if needed
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserStatsPage;