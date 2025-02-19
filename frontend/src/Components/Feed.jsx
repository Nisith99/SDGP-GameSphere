import { FaThumbsUp, FaComment } from "react-icons/fa";

export default function Feed() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      {/* Post Header */}
      <h2 className="text-lg font-semibold">John Doe</h2>
      <p className="text-gray-500 text-sm">Software Engineer at Google</p>

      {/* Post Content */}
      <p className="mt-2">Excited to share my new project! 🚀</p>

      {/* Image */}
      <img
        src="https://source.unsplash.com/500x300/?technology"
        alt="post"
        className="w-full h-48 object-cover rounded-lg my-3"
      />

      {/* Post Actions */}
      <div className="flex justify-between text-gray-500">
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaThumbsUp />
          <span>Like</span>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaComment />
          <span>Comment</span>
        </div>
      </div>
    </div>
  );
}
