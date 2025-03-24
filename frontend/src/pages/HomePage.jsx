import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Trophy } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";

const HomePage = () => {
  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data?.suggestedUsers || [];
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  // Mutation to send a connection request
  const connectMutation = useMutation({
    mutationFn: (userId) => axiosInstance.post(`/users/connect/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["recommendedUsers"]);
    },
  });

  // Mutation to cancel a connection request
  const cancelMutation = useMutation({
    mutationFn: (userId) => axiosInstance.post(`/users/cancel-connect/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["recommendedUsers"]);
    },
  });

  const handleConnectToggle = (userId, isPending) => {
    if (isPending) {
      cancelMutation.mutate(userId);
    } else {
      connectMutation.mutate(userId);
    }
  };

  const displayedUsers = recommendedUsers?.slice(0, Math.max(4, recommendedUsers?.length)) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffff] via-[#ffff] to-[#B98EA7]">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <Sidebar user={authUser} />
          </div>

          {/* Main Content */}
          <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
            <div className="bg-[#E5D9F2] rounded-lg shadow-lg border border-[#A57982] p-4 mb-6">
              <PostCreation user={authUser} />
            </div>

            {posts?.map((post) => (
              <div
                key={post._id}
                className="bg-[#E5D9F2] rounded-lg shadow-lg border border-[#A57982] mb-6"
              >
                <Post post={post} />
              </div>
            ))}

            {posts?.length === 0 && (
              <div className="bg-[#F0D3F7] rounded-lg shadow-lg border border-[#A57982] p-8 text-center">
                <div className="mb-6">
                  <Trophy size={64} className="mx-auto text-[#302F4D]" />
                </div>
                <h2 className="text-2xl font-extrabold mb-4 text-[#120D31]">
                  No Game Updates Yet
                </h2>
                <p className="text-[#302F4D] mb-6">
                  Join teams and connect with other sports fans to start seeing
                  updates in your feed!
                </p>
                <button className="inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-[#F0D3F7] bg-[#302F4D] hover:bg-[#120D31] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A57982]">
                  Discover Teams
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1 lg:col-span-1 hidden lg:block">
            {recommendedUsers?.length > 0 && (
              <div className="bg-[#E5D9F2] rounded-lg shadow-lg border border-[#A57982] p-4 mb-6">
                <h2 className="font-semibold mb-4 text-[#120D31]">
                  Players You May Know
                </h2>
                {displayedUsers.map((user) => (
                  <RecommendedUser
                    key={user._id}
                    user={user}
                    onConnectToggle={handleConnectToggle}
                  />
                ))}
              </div>
            )}

            <div className="bg-[#E5D9F2] rounded-lg shadow-lg border border-[#A57982] p-4">
              <h2 className="font-semibold mb-4 text-[#120D31]">
                Upcoming Games
              </h2>
              <div className="space-y-4">
                <div className="p-3 bg-[#302f4D] rounded-lg hover:bg-[#A57982] transition-colors cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#ffff]">Lakers vs. Warriors</span>
                    <span className="text-sm text-[#ffff]">Today</span>
                  </div>
                  <div className="text-xs text-[#ffff] mt-1">7:30 PM ET</div>
                </div>
                <div className="p-3 bg-[#302f4D] rounded-lg hover:bg-[#A57982] transition-colors cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#ffff]">Cowboys vs. Eagles</span>
                    <span className="text-sm text-[#ffff]">Tomorrow</span>
                  </div>
                  <div className="text-xs text-[#ffff] mt-1">4:15 PM ET</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 pb-6">
        <div className="max-w-md mx-auto px-4 text-center text-xs text-[#302F4D]">
          <div className="mt-3 space-x-4">
            <a href="#" className="hover:text-[#A57982]">
              Help Center
            </a>
            <a href="#" className="hover:text-[#A57982]">
              Privacy & Terms
            </a>
            <a href="#" className="hover:text-[#A57982]">
              Accessibility
            </a>
          </div>
          <p className="mt-4">
            GameSphere © {new Date().getFullYear()} | The Ultimate Sports Gaming
            Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;