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

  if (isLoading) {
    return <div className="text-[#302F4D]">Loading leagues...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffff] via-[#ffff] to-[#B98EA7]">
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <Sidebar user={user} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-[#E5D9F2] rounded-xl shadow-lg border border-[#302F4D]/20 p-8">
              <h1 className="text-3xl font-bold text-[#120D31] mb-8 tracking-tight">
                Discover Leagues & Clubs
              </h1>

              <div className="relative mb-8">
                <input
                  type="text"
                  placeholder="Search leagues, clubs, or sports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 px-5 pl-12 border border-[#302F4D]/20 rounded-full focus:outline-none focus:ring-2 focus:ring-[#A57982] focus:border-transparent text-[#120D31] shadow-sm placeholder-[#302F4D]/60 text-lg"
                />
                <Search size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#302F4D]" />
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-6 text-[#120D31] flex items-center">
                  <Star size={20} className="text-[#A57982] mr-2" />
                  Trending Leagues
                </h2>
                {trendingLeagues.length > 0 ? (
                  <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-thin scrollbar-thumb-[#302F4D]/40 scrollbar-track-[#F0D3F7]">
                    {trendingLeagues.map((league) => (
                      <Link
                        key={league._id}
                        to={`/leagues/${league.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="min-w-[240px] bg-white rounded-lg shadow-md p-5 border border-[#302F4D]/10 hover:shadow-lg transition-all"
                      >
                        <h3 className="font-semibold text-[#120D31]">{league.name}</h3>
                        <p className="text-sm text-[#302F4D]/80">{league.members.toLocaleString()} members</p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            joinLeagueMutation.mutate(league._id);
                          }}
                          disabled={joinLeagueMutation.isLoading}
                          className="w-full py-2 px-4 bg-[#B98EA7] text-[#120D31] rounded-lg hover:bg-[#A57982] transition-colors disabled:opacity-50"
                        >
                          {joinLeagueMutation.isLoading ? "Joining..." : "Join Now"}
                        </button>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#302F4D]/80">No trending leagues match your search.</p>
                )}
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-6 text-[#120D31] flex items-center">
                  <Users size={20} className="text-[#302F4D] mr-2" />
                  New Clubs to Explore
                </h2>
                {newClubs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newClubs.map((club) => (
                      <Link
                        key={club._id}
                        to={`/leagues/${club.name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="bg-white rounded-lg shadow-md p-5 border border-[#302F4D]/10 hover:shadow-lg transition-all"
                      >
                        <h3 className="font-semibold text-[#120D31]">{club.name}</h3>
                        <p className="text-sm text-[#302F4D]/80">{club.members.toLocaleString()} members</p>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            joinLeagueMutation.mutate(club._id);
                          }}
                          disabled={joinLeagueMutation.isLoading}
                          className="w-full py-2 px-4 bg-[#B98EA7] text-[#120D31] rounded-lg hover:bg-[#A57982] transition-colors disabled:opacity-50"
                        >
                          {joinLeagueMutation.isLoading ? "Joining..." : "Join Now"}
                        </button>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#302F4D]/80">No clubs match your search.</p>
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