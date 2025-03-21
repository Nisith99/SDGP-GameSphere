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
    queryFn: () => axiosInstance.get("/connections/requests"),
  });

  const { data: connections } = useQuery({
    queryKey: ["connections"],
    queryFn: () => axiosInstance.get("/connections"),
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-1 lg:col-span-1">
            <Sidebar user={user} />
          </div>
          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
              <h1 className="text-2xl font-extrabold text-gray-900 mb-6">
                My Team Network
              </h1>

              {connectionRequests?.data?.length > 0 ? (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    Team Invites
                  </h2>
                  <div className="space-y-4">
                    {connectionRequests.data.map((request) => (
                      <FriendRequest key={request.id} request={request} />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center mb-6 border border-gray-200">
                  <div className="bg-green-100 p-3 rounded-full shadow-md inline-block mb-4">
                    <UserPlus size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    No Team Invites
                  </h3>
                  <p className="text-gray-600">
                    You don't have any pending team invites at the moment.
                  </p>
                  <p className="text-gray-600 mt-2">
                    Check out suggested teams below to expand your network!
                  </p>
                </div>
              )}

              {connections?.data?.length > 0 ? (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    My Teams
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {connections.data.map((connection) => (
                      <UserCard
                        key={connection._id}
                        user={connection}
                        isConnection={true}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center mb-6 border border-gray-200">
                  <div className="bg-blue-100 p-3 rounded-full shadow-md inline-block mb-4">
                    <Trophy size={32} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Join Your First Team
                  </h3>
                  <p className="text-gray-600">
                    You haven't joined any teams yet. Connect with other sports
                    fans!
                  </p>
                  <button className="mt-4 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    Find Teams
                  </button>
                </div>
              )}

              <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">
                  Recommended Leagues
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <svg
                          className="h-6 w-6 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Fantasy Basketball
                        </h3>
                        <p className="text-xs text-gray-500">23,456 players</p>
                      </div>
                    </div>
                    <button className="w-full mt-3 py-1 px-3 border border-green-500 text-green-600 rounded text-sm hover:bg-green-50">
                      Join League
                    </button>
                  </div>
                  <div className="bg-white rounded-lg shadow p-4 border border-gray-200 hover:shadow-md transition-shadow">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <svg
                          className="h-6 w-6 text-green-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">
                          Premier Soccer League
                        </h3>
                        <p className="text-xs text-gray-500">15,789 players</p>
                      </div>
                    </div>
                    <button className="w-full mt-3 py-1 px-3 border border-green-500 text-green-600 rounded text-sm hover:bg-green-50">
                      Join League
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
