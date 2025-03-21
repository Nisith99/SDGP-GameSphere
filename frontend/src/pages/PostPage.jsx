import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import Post from "../components/Post";

const PostPage = () => {
  const { postId } = useParams();
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => axiosInstance.get(`/posts/${postId}`),
  });

  if (isLoading)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full animate-pulse">
          <div className="flex justify-center">
            <svg
              className="animate-spin h-12 w-12 text-indigo-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-80"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <p className="text-center mt-4 text-gray-700 font-semibold tracking-tight">
            Loading your post...
          </p>
        </div>
      </div>
    );

  if (!post?.data)
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full transition-all duration-300 hover:shadow-2xl">
          <div className="flex justify-center mb-6">
            <svg
              className="h-16 w-16 text-gray-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3 tracking-tight">
            Post Not Found
          </h2>
          <p className="text-center text-gray-600 leading-relaxed">
            The post you're looking for might have been removed or doesn't
            exist.
          </p>
          <button className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
            Return Home
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-12">
              <Sidebar user={authUser} />
            </div>
          </div>

          <div className="col-span-1 lg:col-span-3">
            <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <Post post={post.data} />
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 pb-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <div className="flex justify-center space-x-6 mb-4">
            <a
              href="#"
              className="hover:text-indigo-600 transition-colors duration-200 font-medium"
            >
              Help Center
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition-colors duration-200 font-medium"
            >
              Privacy & Terms
            </a>
            <a
              href="#"
              className="hover:text-indigo-600 transition-colors duration-200 font-medium"
            >
              Accessibility
            </a>
          </div>
          <p className="text-gray-500">
            GameSphere © {new Date().getFullYear()} | The Ultimate Sports Gaming
            Platform
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PostPage;
