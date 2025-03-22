import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { Search, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const LeaguesPage = () => {
  const { data: user } = useQuery({ queryKey: ["authUser"] });
  const [searchTerm, setSearchTerm] = useState("");

  const { data: leaguesData, isLoading } = useQuery({
    queryKey: ["leagues"],
    queryFn: () => axiosInstance.get("/leagues").then(res => res.data),
  });

  const joinLeagueMutation = useMutation({
    mutationFn: (leagueId) => axiosInstance.post(`/leagues/join/${leagueId}`),
    onSuccess: () => {
      toast.success("Successfully joined the league!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to join league");
    },
  });

  const filteredLeagues = leaguesData?.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const trendingLeagues = filteredLeagues.filter(item => item.category === "league");
  const newClubs = filteredLeagues.filter(item => item.category === "club");

  const getColorClass = (color) => color || "gray";

  if (isLoading) {
    return <div>Loading leagues...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-green-50 to-blue-100">
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <Sidebar user={user} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">
                Discover Leagues & Clubs
              </h1>

              {/* Search Bar */}
              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search leagues, clubs, or sports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-5 pl-12 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-700 shadow-sm placeholder-gray-400 text-lg"
                />
                <Search
                  size={24}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
              </div>

              {/* Trending Leagues */}
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                  <Star size={20} className="text-yellow-500 mr-2" />
                  Trending Leagues
                </h2>
                {trendingLeagues.length > 0 ? (
                  <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {trendingLeagues.map((league) => (
                      <div
                        key={league._id}
                        className="min-w-[240px] bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center mb-3">
                          <div className={`bg-${getColorClass(league.color)}-100 p-2 rounded-full mr-3`}>
                            <svg className={`h-6 w-6 text-${getColorClass(league.color)}-600`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{league.name}</h3>
                            <p className="text-sm text-gray-500">{league.members.toLocaleString()} members</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Users size={16} className="mr-1" />
                          <span>Active: {league.active.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => joinLeagueMutation.mutate(league._id)}
                          disabled={joinLeagueMutation.isLoading}
                          className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                        >
                          {joinLeagueMutation.isLoading ? "Joining..." : "Join Now"}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No trending leagues match your search.</p>
                )}
              </div>

              {/* New Clubs */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                  <Users size={20} className="text-blue-500 mr-2" />
                  New Clubs to Explore
                </h2>
                {newClubs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newClubs.map((club) => (
                      <div
                        key={club._id}
                        className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center mb-3">
                          <div className={`bg-${getColorClass(club.color)}-100 p-2 rounded-full mr-3`}>
                            <svg className={`h-6 w-6 text-${getColorClass(club.color)}-600`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">{club.name}</h3>
                            <p className="text-sm text-gray-500">{club.members.toLocaleString()} members</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <Users size={16} className="mr-1" />
                          <span>Active: {club.active.toLocaleString()}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => joinLeagueMutation.mutate(club._id)}
                            disabled={joinLeagueMutation.isLoading}
                            className="flex-1 py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            {joinLeagueMutation.isLoading ? "Joining..." : "Join Now"}
                          </button>
                          <Link
                            to={`/clubs/${club.name.toLowerCase().replace(/\s+/g, "-")}`}
                            className="flex-1 py-2 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-center"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No clubs match your search.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaguesPage;