import React, { useEffect, useState } from "react";
import { getAllPosts } from "../api/posts";
import "./Feed.css"; 

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getAllPosts();
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching feed data:", error);
        setError("Failed to load posts");
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading...</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!posts.length) {
    return <p className="no-posts-text">No posts available</p>;
  }

  return (
    <div className="feed-container space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="post-card bg-white rounded-lg shadow-md p-4">
          {/* Profile */}
          <div className="profile flex items-center gap-3 mb-4">
            <img 
              src={post.profileImage || '/default-avatar.png'} 
              alt="profile" 
              className="profile-img w-12 h-12 rounded-full object-cover" 
            />
            <div>
              <h2 className="profile-name font-semibold">{post.name}</h2>
              <p className="profile-profession text-gray-600 text-sm">{post.profession}</p>
            </div>
          </div>

          {/* Post Content */}
          <p className="post-content text-gray-800 mb-4">{post.content}</p>

          {/* Player Stats Box */}
          {post.stats && (
            <div className="stats-box bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="stats-title font-semibold mb-2">🏆 Player Stats</h3>
              <div className="stats-grid grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="stats-value font-bold">{post.stats.points}</p>
                  <p className="stats-label text-gray-600 text-sm">Points</p>
                </div>
                <div>
                  <p className="stats-value font-bold">{post.stats.assists}</p>
                  <p className="stats-label text-gray-600 text-sm">Assists</p>
                </div>
                <div>
                  <p className="stats-value font-bold">{post.stats.games}</p>
                  <p className="stats-label text-gray-600 text-sm">Games</p>
                </div>
              </div>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="tags flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="tag bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Post Image */}
          {post.image && (
            <div className="post-image">
              <img 
                src={post.image} 
                alt="post" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Feed;
