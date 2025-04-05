import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { Trophy, UserPlus } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";

const NetworkPage = () => {
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data || null;
    },
  });

  const { data: connectionRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/connections/requests");
      return res.data || [];
    },
    enabled: !!user,
  });

  const { data: connections, isLoading: connectionsLoading } = useQuery({
    queryKey: ["connections"],
    queryFn: async () => {
      const res = await axiosInstance.get("/connections");
      return res.data || [];
    },
    enabled: !!user,
  });

  if (userLoading || requestsLoading || connectionsLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffff] via-[#ffff] to-[#B98EA7]">
      <div className="container mx-auto py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="col-span-1 lg:col-span-1">
            <Sidebar user={user} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg border border-[#302F4D]/20 p-8">
              <h1 className="text-3xl font-bold text-[#120D31] mb-8 tracking-tight">
                My Team Network
              </h1>

              {connectionRequests?.length > 0 ? (
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold mb-5 text-[#120D31]">
                    Team Invites
                  </h2>
                  <div className="space-y-5">
                    {connectionRequests.map((request) => (
                      <FriendRequest key={request._id || request.id} request={request} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#F0D3F7]/50 rounded-lg shadow-md p-6 text-center mb-8 border border-[#302F4D]/20">
                  <div className="bg-[#B98EA7]/20 p-4 rounded-full shadow-md inline-block mb-4">
                    <UserPlus size={36} className="text-[#A57982]" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-[#120D31]">
                    No Team Invites
                  </h3>
                  <p className="text-[#302F4D]/80 text-lg">
                    You don’t have any pending team invites right now.
                  </p>
                  <p className="text-[#302F4D]/60 mt-2">
                    Explore leagues to grow your network!
                  </p>
                </div>
              )}

              {connections?.length > 0 ? (
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold mb-5 text-[#302F4D]">
                    My Teams
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {connections.map((connection) => (
                      <UserCard
                        key={connection._id}
                        user={connection}
                        isConnection={true}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-[#F0D3F7]/50 rounded-lg shadow-md p-6 text-center mb-8 border border-[#302F4D]/20">
                  <div className="bg-[#B98EA7]/20 p-4 rounded-full shadow-md inline-block mb-4">
                    <Trophy size={36} className="text-[#A57982]" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-[#120D31]">
                    Join Your First Team
                  </h3>
                  <p className="text-[#302F4D]/80 text-lg">
                    You haven’t joined any teams yet. Connect with sports fans!
                  </p>
                  <button className="mt-4 inline-flex justify-center py-2 px-6 border border-transparent rounded-lg shadow-md text-base font-medium text-[#120D31] bg-[#B98EA7] hover:bg-[#A57982] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A57982] transition-colors">
                    Find Teams
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;