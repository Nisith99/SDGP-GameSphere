import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link } from "react-router-dom";
import {
  Bell,
  Home,
  LogOut,
  User,
  Users,
  Trophy,
  Activity,
} from "lucide-react";

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const unreadNotificationCount = notifications?.data.filter(
    (notif) => !notif.read
  ).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img
                className="h-10 rounded"
                src="../../../public/gameSphere_logo.png"
                alt="GameSphere"
              />
              <span className="ml-2 text-gray-100 font-bold text-xl hidden md:block">
                GameSphere
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            {authUser ? (
              <>
                <Link
                  to={"/"}
                  className="text-gray-300 hover:text-white flex flex-col items-center transition-colors duration-200"
                >
                  <Home size={20} />
                  <span className="text-xs hidden md:block">Home</span>
                </Link>
                <Link
                  to="/leagues"
                  className="text-gray-300 hover:text-white flex flex-col items-center transition-colors duration-200"
                >
                  <Trophy size={20} />
                  <span className="text-xs hidden md:block">Clubs</span>
                </Link>
                <Link
                  to="/stats"
                  className="text-gray-300 hover:text-white flex flex-col items-center transition-colors duration-200"
                >
                  <Activity size={20} />
                  <span className="text-xs hidden md:block">Live Stats</span>
                </Link>
                <Link
                  to="/network"
                  className="text-gray-300 hover:text-white flex flex-col items-center relative transition-colors duration-200"
                >
                  <Users size={20} />
                  <span className="text-xs hidden md:block">Teams</span>
                  {unreadConnectionRequestsCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 md:right-4 bg-yellow-400 text-gray-900 text-xs 
                      font-bold rounded-full size-3 md:size-4 flex items-center justify-center"
                    >
                      {unreadConnectionRequestsCount}
                    </span>
                  )}
                </Link>
                <Link
                  to="/notifications"
                  className="text-gray-300 hover:text-white flex flex-col items-center relative transition-colors duration-200"
                >
                  <Bell size={20} />
                  <span className="text-xs hidden md:block">Alerts</span>
                  {unreadNotificationCount > 0 && (
                    <span
                      className="absolute -top-1 -right-1 md:right-4 bg-yellow-400 text-gray-900 text-xs 
                      font-bold rounded-full size-3 md:size-4 flex items-center justify-center"
                    >
                      {unreadNotificationCount}
                    </span>
                  )}
                </Link>
                <Link
                  to={`/profile/${authUser.username}`}
                  className="text-gray-300 hover:text-white flex flex-col items-center transition-colors duration-200"
                >
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
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-200 border border-gray-400 rounded-md hover:bg-gray-700 hover:text-white transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 rounded-md hover:bg-yellow-400 transition-colors duration-200"
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