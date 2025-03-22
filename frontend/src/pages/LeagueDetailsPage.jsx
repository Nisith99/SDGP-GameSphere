import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Users } from "lucide-react";
import toast from "react-hot-toast";

const LeagueDetailsPage = () => {
  const { leagueName } = useParams();
  const navigate = useNavigate();
  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const { data: league, isLoading } = useQuery({
    queryKey: ["league", leagueName],
    queryFn: () => axiosInstance.get(`/leagues/${leagueName}`).then(res => res.data),
  });

  const leaveLeagueMutation = useMutation({
    mutationFn: (leagueId) => axiosInstance.post(`/leagues/leave/${leagueId}`),
    onSuccess: () => {
      toast.success(`Successfully left ${league?.name}!`);
      navigate("/leagues"); // Redirect back to Leagues page
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to leave league");
    },
  });

  if (isLoading) {
    return <div>Loading league details...</div>;
  }

  if (!league) {
    return <div>League or club not found</div>;
  }

  const isMember = league.membersList.some(memberId => memberId.toString() === user?._id?.toString());

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-green-50 to-blue-100">
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <Sidebar user={user} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
                {league.name}
              </h1>
              <div className="mb-6">
                <p className="text-gray-600 text-lg">
                  {league.members.toLocaleString()} members • {league.active.toLocaleString()} active
                </p>
                <p className="text-gray-500 mt-2">
                  Category: {league.category.charAt(0).toUpperCase() + league.category.slice(1)}
                </p>
              </div>
              <div className="flex items-center text-gray-600 mb-6">
                <Users size={20} className="mr-2" />
                <span>Founded: {new Date(league.createdAt).toLocaleDateString()}</span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About</h2>
                <p className="text-gray-600 mb-6">
                  This is a placeholder description for {league.name}. Add more details about the {league.category} here in the future!
                </p>
              </div>
              {isMember && (
                <button
                  onClick={() => leaveLeagueMutation.mutate(league._id)}
                  disabled={leaveLeagueMutation.isLoading}
                  className="w-full py-2 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  {leaveLeagueMutation.isLoading ? "Leaving..." : "Leave " + (league.category === "league" ? "League" : "Club")}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeagueDetailsPage;