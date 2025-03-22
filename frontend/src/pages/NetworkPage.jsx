import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import { Trophy, UserPlus, Search, Users, Star } from "lucide-react";
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

              {connectionRequests?.data?.length > 0 ? (
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold mb-5 text-gray-800">
                    Team Invites
                  </h2>
                  <div className="space-y-5">
                    {connectionRequests.data.map((request) => (
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
                    Explore leagues below to grow your network!
                  </p>
                </div>
              )}

              {connections?.data?.length > 0 ? (
                <div className="mb-10">
                  <h2 className="text-2xl font-semibold mb-5 text-gray-800">
                    My Teams
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              {/* Enhanced Find & Join Leagues Section */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-gray-100 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 tracking-tight">
                  Discover Leagues & Clubs
                </h2>

                {/* Search Bar */}
                <div className="relative mb-8">
                  <input
                    type="text"
                    placeholder="Search leagues, clubs, or sports..."
                    className="w-full py-3 px-5 pl-12 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent text-gray-700 shadow-sm placeholder-gray-400 text-lg"
                  />
                  <Search
                    size={24}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>

                {/* Recommended Leagues */}
                <div>
                  <h3 className="text-xl font-medium mb-4 text-gray-800 flex items-center">
                    <Star size={20} className="text-yellow-500 mr-2" />
                    Trending Leagues
                  </h3>
                  <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {/* League 1 */}
                    <div className="min-w-[240px] bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center mb-3">
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
                          <h3 className="font-semibold text-gray-800">
                            Fantasy Basketball
                          </h3>
                          <p className="text-sm text-gray-500">23,456 members</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={16} className="mr-1" />
                        <span>Active: 1,234</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        Join Now
                      </button>
                    </div>

                    {/* League 2 */}
                    <div className="min-w-[240px] bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center mb-3">
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
                          <h3 className="font-semibold text-gray-800">
                            Premier Soccer League
                          </h3>
                          <p className="text-sm text-gray-500">15,789 members</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={16} className="mr-1" />
                        <span>Active: 987</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        Join Now
                      </button>
                    </div>

                    {/* League 3 */}
                    <div className="min-w-[240px] bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center mb-3">
                        <div className="bg-red-100 p-2 rounded-full mr-3">
                          <svg
                            className="h-6 w-6 text-red-600"
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
                          <h3 className="font-semibold text-gray-800">
                            NFL Fantasy League
                          </h3>
                          <p className="text-sm text-gray-500">19,234 members</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={16} className="mr-1" />
                        <span>Active: 1,500</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        Join Now
                      </button>
                    </div>

                    {/* League 4 */}
                    <div className="min-w-[240px] bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center mb-3">
                        <div className="bg-yellow-100 p-2 rounded-full mr-3">
                          <svg
                            className="h-6 w-6 text-yellow-600"
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
                          <h3 className="font-semibold text-gray-800">
                            Cricket World Cup
                          </h3>
                          <p className="text-sm text-gray-500">12,345 members</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={16} className="mr-1" />
                        <span>Active: 890</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        Join Now
                      </button>
                    </div>

                    {/* League 5 */}
                    <div className="min-w-[240px] bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center mb-3">
                        <div className="bg-purple-100 p-2 rounded-full mr-3">
                          <svg
                            className="h-6 w-6 text-purple-600"
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
                          <h3 className="font-semibold text-gray-800">
                            Tennis Grand Slam
                          </h3>
                          <p className="text-sm text-gray-500">8,910 members</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={16} className="mr-1" />
                        <span>Active: 670</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        Join Now
                      </button>
                    </div>

                    {/* League 6 */}
                    <div className="min-w-[240px] bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center mb-3">
                        <div className="bg-orange-100 p-2 rounded-full mr-3">
                          <svg
                            className="h-6 w-6 text-orange-600"
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
                          <h3 className="font-semibold text-gray-800">
                            MLB Home Run Derby
                          </h3>
                          <p className="text-sm text-gray-500">10,567 members</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={16} className="mr-1" />
                        <span>Active: 780</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        Join Now
                      </button>
                    </div>

                    {/* League 7 */}
                    <div className="min-w-[240px] bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center mb-3">
                        <div className="bg-teal-100 p-2 rounded-full mr-3">
                          <svg
                            className="h-6 w-6 text-teal-600"
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
                          <h3 className="font-semibold text-gray-800">
                            Esports Championship
                          </h3>
                          <p className="text-sm text-gray-500">17,890 members</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={16} className="mr-1" />
                        <span>Active: 1,200</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        Join Now
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Category: New Clubs */}
                <div className="mt-8">
                  <h3 className="text-xl font-medium mb-4 text-gray-800 flex items-center">
                    <Users size={20} className="text-blue-500 mr-2" />
                    New Clubs to Explore
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Club 1 */}
                    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center mb-3">
                        <div className="bg-indigo-100 p-2 rounded-full mr-3">
                          <svg
                            className="h-6 w-6 text-indigo-600"
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
                          <h3 className="font-semibold text-gray-800">
                            Rugby Union Fans
                          </h3>
                          <p className="text-sm text-gray-500">5,432 members</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={16} className="mr-1" />
                        <span>Active: 320</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        Join Now
                      </button>
                    </div>

                    {/* Club 2 */}
                    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center mb-3">
                        <div className="bg-pink-100 p-2 rounded-full mr-3">
                          <svg
                            className="h-6 w-6 text-pink-600"
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
                          <h3 className="font-semibold text-gray-800">
                            Volleyball League
                          </h3>
                          <p className="text-sm text-gray-500">7,890 members</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={16} className="mr-1" />
                        <span>Active: 450</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        Join Now
                      </button>
                    </div>

                    {/* Club 3 */}
                    <div className="bg-white rounded-lg shadow-md p-5 border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center mb-3">
                        <div className="bg-gray-100 p-2 rounded-full mr-3">
                          <svg
                            className="h-6 w-6 text-gray-600"
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
                          <h3 className="font-semibold text-gray-800">
                            Golf Masters Club
                          </h3>
                          <p className="text-sm text-gray-500">3,210 members</p>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Users size={16} className="mr-1" />
                        <span>Active: 200</span>
                      </div>
                      <button className="w-full py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        Join Now
                      </button>
                    </div>
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