import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Trophy, Users } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";

const HomePage = () => {
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: recommendedUsers } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions");
      return res.data;
    },
  });

  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block lg:col-span-1">
            <Sidebar user={authUser} />
          </div>

          <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mb-6">
              <PostCreation user={authUser} />
            </div>

            {posts?.map((post) => (
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 mb-6">
                <Post key={post._id} post={post} />
              </div>
            ))}

            {posts?.length === 0 && (
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8 text-center">
                <div className="mb-6">
                  <Trophy size={64} className="mx-auto text-green-500" />
                </div>
                <h2 className="text-2xl font-extrabold mb-4 text-gray-800">
                  No Game Updates Yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Join teams and connect with other sports fans to start seeing
                  updates in your feed!
                </p>
                <button className="inline-flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Discover Teams
                </button>
              </div>
            )}
          </div>

          {recommendedUsers?.length > 0 && (
            <div className="col-span-1 lg:col-span-1 hidden lg:block">
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                <h2 className="font-semibold mb-4 text-gray-900">
                  Players you may know
                </h2>
                {recommendedUsers?.map((user) => (
                  <RecommendedUser key={user._id} user={user} />
                ))}
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mt-6">
                <h2 className="font-semibold mb-4 text-gray-900">
                  Upcoming Games
                </h2>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Lakers vs. Warriors</span>
                      <span className="text-sm text-gray-500">Today</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">7:30 PM ET</div>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Cowboys vs. Eagles</span>
                      <span className="text-sm text-gray-500">Tomorrow</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">4:15 PM ET</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-8 pb-6">
        <div className="max-w-md mx-auto px-4 text-center text-xs text-gray-500">
          <div className="mt-3 space-x-4">
            <a href="#" className="hover:text-gray-700">
              Help Center
            </a>
            <a href="#" className="hover:text-gray-700">
              Privacy & Terms
            </a>
            <a href="#" className="hover:text-gray-700">
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
