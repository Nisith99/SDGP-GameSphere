// NetworkPage.jsx
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { Trophy, UserPlus } from "lucide-react";
import FriendRequest from "../components/FriendRequest";
import UserCard from "../components/UserCard";

const NetworkPage = () => {
  const { data: user } = useQuery({ queryKey: ["authUser"] });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: () => axiosInstance.get("/connections/requests").then(res => res.data),
  });

  const { data: connections } = useQuery({
    queryKey: ["connections"],
    queryFn: () => axiosInstance.get("/connections").then(res => res.data),
  });

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
                My Team Network
              </h1>

              {connectionRequests?.length > 0 ? (
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold mb-5 text-gray-800">
                    Team Invites
                  </h2>
                  <div className="space-y-5">
                    {connectionRequests.map((request) => (
                      <FriendRequest key={request.id} request={request} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg shadow-md p-6 text-center mb-8 border border-gray-100">
                  <div className="bg-green-100 p-4 rounded-full shadow-md inline-block mb-4">
                    <UserPlus size={36} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                    No Team Invites
                  </h3>
                  <p className="text-gray-600 text-lg">
                    You don’t have any pending team invites right now.
                  </p>
                  <p className="text-gray-500 mt-2">
                    Explore leagues to grow your network!
                  </p>
                </div>
              )}

              {connections?.length > 0 ? (
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold mb-5 text-gray-800">
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
                <div className="bg-gray-50 rounded-lg shadow-md p-6 text-center mb-8 border border-gray-100">
                  <div className="bg-blue-100 p-4 rounded-full shadow-md inline-block mb-4">
                    <Trophy size={36} className="text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                    Join Your First Team
                  </h3>
                  <p className="text-gray-600 text-lg">
                    You haven’t joined any teams yet. Connect with sports fans!
                  </p>
                  <button className="mt-4 inline-flex justify-center py-2 px-6 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
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