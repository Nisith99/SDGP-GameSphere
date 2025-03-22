import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users, Trophy, Activity, Search } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications"),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests"),
    enabled: !!authUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchData, refetch: searchRefetch } = useQuery({
    queryKey: ["searchUsers", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const response = await axiosInstance.get(`users/search?q=${searchQuery}`);
      return response.data;
    },
    enabled: false,
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length > 0) searchRefetch();
  };

  const unreadNotificationCount = notifications?.data.filter((notif) => !notif.read).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img
                className="h-10 rounded"
                src="/gameSphere_logo.png"
                alt="GameSphere"
              />
              <span className="ml-2 text-gray-100 font-bold text-xl hidden md:block">
                GameSphere
              </span>
            </Link>
          </div>

          {authUser && (
            <div className="flex-1 mx-6 relative">
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search people..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full py-2 px-4 pl-10 bg-gray-700 text-gray-100 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent placeholder-gray-400 text-sm shadow-md transition-all duration-200"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                </div>
                {searchData?.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl max-h-72 overflow-y-auto z-20">
                    {searchData.map((user) => (
                      <Link
                        key={user._id || user.username}
                        to={`/profile/${user.username}`}
                        className="flex items-center px-4 py-3 text-gray-200 hover:bg-gray-700 transition-colors duration-150 border-b border-gray-700 last:border-b-0"
                        onClick={() => setSearchQuery("")}
                      >
                        <img
                          src={user.profilePicture || "https://via.placeholder.com/40"}
                          alt={user.name}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-xs text-gray-400">@{user.username}</div>
                          {user.sport && (
                            <div className="text-xs text-yellow-400">{user.sport}</div>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 md:gap-6">
            {authUser ? (
              <>
                <Link to="/" className="text-gray-300 hover:text-white flex flex-col items-center transition-colors duration-200">
                  <Home size={20} />
                  <span className="text-xs hidden md:block">Home</span>
                </Link>
                <Link to="/leagues" className="text-gray-300 hover:text-white flex flex-col items-center transition-colors duration-200">
                  <Trophy size={20} />
                  <span className="text-xs hidden md:block">Clubs</span>
                </Link>
                <Link to="/stats" className="text-gray-300 hover:text-white flex flex-col items-center transition-colors duration-200">
                  <Activity size={20} />
                  <span className="text-xs hidden md:block">Live Stats</span>
                </Link>
                <Link to="/network" className="text-gray-300 hover:text-white flex flex-col items-center relative transition-colors duration-200">
                  <Users size={20} />
                  <span className="text-xs hidden md:block">Teams</span>
                  {unreadConnectionRequestsCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-4 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full size-3 md:size-4 flex items-center justify-center">
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </Link>
                <Link to="/notifications" className="text-gray-300 hover:text-white flex flex-col items-center relative transition-colors duration-200">
                  <Bell size={20} />
                  <span className="text-xs hidden md:block">Alerts</span>
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 md:right-4 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full size-3 md:size-4 flex items-center justify-center">
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>
                <Link to={`/profile/${authUser.username}`} className="text-gray-300 hover:text-white flex flex-col items-center transition-colors duration-200">
                  <User size={20} />
                  <span className="text-xs hidden md:block">Profile</span>
                </Link>
                <button
                  className="flex items-center space-x-1 text-sm text-gray-300 hover:text-white transition-colors duration-200"
                  onClick={() => logout()}
                >
                  <LogOut size={20} />
                  <span className="hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-200 border border-gray-400 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200">
                  Sign In
                </Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md hover:bg-yellow-400 transition-colors duration-200">
                  Join Team
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;