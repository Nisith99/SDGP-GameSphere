import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import { Bell, Home, LogOut, User, Users, Trophy, Activity, Search, MessageSquare } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => axiosInstance.get("/notifications").then((res) => res.data),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => axiosInstance.get("/connections/requests").then((res) => res.data),
    enabled: !!authUser,
  });

  const { mutate: logout } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchResults, isFetching: isSearching } = useQuery({
    queryKey: ["searchUsers", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      const response = await axiosInstance.get(`/users/search?q=${searchQuery}`);
      return response.data.users;
    },
    enabled: !!searchQuery.trim(),
    placeholderData: [],
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const unreadNotificationCount = notifications?.filter((notif) => !notif.read).length || 0;
  const unreadConnectionRequestsCount = connectionRequests?.length || 0;

  const networkConnections = authUser?.connections || [];
  const suggestedPlayers = searchResults
    ?.filter((user) => user._id !== authUser?._id)
    .sort((a, b) => {
      const aIsConnected = networkConnections.some((conn) => conn.userId === a._id);
      const bIsConnected = networkConnections.some((conn) => conn.userId === b._id);
      return bIsConnected - aIsConnected;
    });

  return (
    <nav className="bg-white text-gray-800 shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center group">
              <img
                className="h-10 rounded-md transition-transform duration-200 group-hover:scale-105"
                src="/gameSphere_logo.png"
                alt="GameSphere"
              />
              <span className="ml-2 text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors duration-200 hidden md:block">
                GameSphere
              </span>
            </Link>
          </div>

          {/* Search Bar (Authenticated Users) */}
          {authUser && (
            <div className="flex-1 mx-4 md:mx-6 relative">
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search people..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="w-full py-2 px-4 pl-10 bg-gray-100 text-gray-800 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-sm shadow-sm transition-all duration-300 hover:bg-gray-200"
                  />
                  <Search
                    size={18}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>
                {searchQuery.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-72 overflow-y-auto z-20">
                    {isSearching ? (
                      <div className="px-4 py-3 text-gray-600 text-sm">Searching...</div>
                    ) : suggestedPlayers?.length > 0 ? (
                      suggestedPlayers.map((user) => (
                        <Link
                          key={user._id || user.username}
                          to={`/profile/${user.username}`}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors duration-150 border-b border-gray-200 last:border-b-0"
                          onClick={() => setSearchQuery("")}
                        >
                          <img
                            src={user.profilePicture || "https://via.placeholder.com/40"}
                            alt={user.name}
                            className="w-10 h-10 rounded-full mr-3 object-cover border border-gray-300"
                          />
                          <div>
                            <div className="font-medium text-gray-800">{user.name}</div>
                            <div className="text-xs text-gray-500">@{user.username}</div>
                            {user.sport && (
                              <div className="text-xs text-blue-500">{user.sport}</div>
                            )}
                            {networkConnections.some((conn) => conn.userId === user._id) && (
                              <div className="text-xs text-green-600">In your network</div>
                            )}
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500 text-sm">No users found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            {authUser ? (
              <>
                <Link
                  to="/"
                  className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition-all duration-200 hover:scale-105"
                >
                  <Home size={22} />
                  <span className="text-xs mt-1 hidden md:block">Home</span>
                </Link>
                <Link
                  to="/leagues"
                  className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition-all duration-200 hover:scale-105"
                >
                  <Trophy size={22} />
                  <span className="text-xs mt-1 hidden md:block">Clubs</span>
                </Link>
                <Link
                  to="/stats"
                  className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition-all duration-200 hover:scale-105"
                >
                  <Activity size={22} />
                  <span className="text-xs mt-1 hidden md:block">Live Stats</span>
                </Link>
                <Link
                  to="/network"
                  className="text-gray-600 hover:text-blue-600 flex flex-col items-center relative transition-all duration-200 hover:scale-105"
                >
                  <Users size={22} />
                  <span className="text-xs mt-1 hidden md:block">Connections</span>
                  {unreadConnectionRequestsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/notifications"
                  className="text-gray-600 hover:text-blue-600 flex flex-col items-center relative transition-all duration-200 hover:scale-105"
                >
                  <Bell size={22} />
                  <span className="text-xs mt-1 hidden md:block">Alerts</span>
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/chat"
                  className="text-gray-600 hover:text-blue-600 flex flex-col items-center relative transition-all duration-200 hover:scale-105"
                >
                  <MessageSquare size={22} />
                  <span className="text-xs mt-1 hidden md:block">Messenger</span>
                </Link>
                <Link
                  to={`/profile/${authUser.username}`}
                  className="text-gray-600 hover:text-blue-600 flex flex-col items-center transition-all duration-200 hover:scale-105"
                >
                  <User size={22} />
                  <span className="text-xs mt-1 hidden md:block">Profile</span>
                </Link>
                <button
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-all duration-200 hover:scale-105"
                  onClick={() => logout()}
                >
                  <LogOut size={22} />
                  <span className="text-xs hidden md:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 hover:text-gray-800 transition-all duration-200 shadow-sm"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all duration-200 shadow-sm"
                >
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