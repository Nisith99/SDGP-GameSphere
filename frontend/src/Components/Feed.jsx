import React, { useEffect, useState } from "react";

const Feed = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://13.1."); // Update with your actual API URL
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      }
    };
    
    fetchPost();
  }, []);

  if (!post) {
    return <p className="text-center mt-6">Loading...</p>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Profile Info */}
      <div className="flex items-center space-x-3">
        <img
          src={post.profileImage}
          alt="profile"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h2 className="font-semibold">{post.name}</h2>
          <p className="text-green-600 text-sm">{post.profession}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="mt-3 text-gray-700">{post.content}</p>

      {/* Player Stats Box */}
      <div className="bg-green-50 p-3 rounded-lg mt-3">
        <h3 className="font-medium text-green-700 mb-2 flex items-center">🏆 Player Stats</h3>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-lg font-bold">{post.stats.points}</p>
            <p className="text-gray-500 text-sm">Points</p>
          </div>
          <div>
            <p className="text-lg font-bold">{post.stats.assists}</p>
            <p className="text-gray-500 text-sm">Assists</p>
          </div>
          <div>
            <p className="text-lg font-bold">{post.stats.games}</p>
            <p className="text-gray-500 text-sm">Games</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex space-x-2 mt-3">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
            #{tag}
          </span>
        ))}
      </div>

      {/* Post Image */}
      <div className="mt-3">
        <img
          src={post.image}
          alt="post"
          className="rounded-lg"
        />
      </div>
    </div>
  );
};

export default Feed;
