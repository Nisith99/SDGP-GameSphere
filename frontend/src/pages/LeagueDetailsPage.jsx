import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Users, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const LeagueDetailsPage = () => {
  const { leagueName } = useParams();
  const navigate = useNavigate();
  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const { data: league, isLoading } = useQuery({
    queryKey: ["league", leagueName],
    queryFn: () => axiosInstance.get(`/leagues/${leagueName}`).then((res) => res.data),
  });

  const leaveLeagueMutation = useMutation({
    mutationFn: (leagueId) => axiosInstance.post(`/leagues/leave/${leagueId}`),
    onSuccess: () => {
      toast.success(`Successfully left ${league?.name}!`);
      navigate("/leagues");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to leave league");
    },
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(18, 13, 49, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0D3F7] via-[#E0C2E5] to-[#B98EA7] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3 text-[#302F4D]"
        >
          <Loader2 className="w-8 h-8 animate-spin text-[#A57982]" />
          <span className="text-lg font-medium">Loading league details...</span>
        </motion.div>
      </div>
    );
  }

  if (!league) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0D3F7] via-[#E0C2E5] to-[#B98EA7] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[#302F4D] text-lg font-medium"
        >
          League or club not found
        </motion.div>
      </div>
    );
  }

  const isMember = league.membersList.some((memberId) => memberId.toString() === user?._id?.toString());

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0D3F7] via-[#E0C2E5] to-[#B98EA7] text-[#120D31]">
      <motion.div
        className="container mx-auto py-12 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="col-span-1 lg:col-span-1">
            <Sidebar user={user} />
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-3">
            <motion.div
              className="bg-white rounded-2xl shadow-lg border border-[#302F4D]/20 p-8"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <h1 className="text-4xl font-extrabold text-[#120D31] mb-6 tracking-tight drop-shadow-md">
                {league.name}
              </h1>

              <div className="mb-6 space-y-2">
                <p className="text-[#302F4D]/80 text-lg">
                  <span className="font-semibold text-[#A57982]">
                    {league.members.toLocaleString()}
                  </span>{" "}
                  members •{" "}
                  <span className="font-semibold text-[#B98EA7]">
                    {league.active.toLocaleString()}
                  </span>{" "}
                  active
                </p>
                <p className="text-[#302F4D]/60">
                  Category:{" "}
                  <span className="text-[#A57982] capitalize">
                    {league.category}
                  </span>
                </p>
              </div>

              <motion.div
                className="flex items-center text-[#302F4D]/80 mb-6"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <Users size={20} className="mr-2 text-[#A57982]" />
                <span>Founded: {new Date(league.createdAt).toLocaleDateString()}</span>
              </motion.div>

              <div>
                <h2 className="text-2xl font-semibold text-[#120D31] mb-4 drop-shadow-sm">
                  About
                </h2>
                <motion.p
                  className="text-[#302F4D]/80 mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  {league.description || `This is a placeholder description for ${league.name}. Add more details about the ${league.category} here in the future!`}
                </motion.p>
              </div>

              {/* Add more sections here if needed */}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LeagueDetailsPage;