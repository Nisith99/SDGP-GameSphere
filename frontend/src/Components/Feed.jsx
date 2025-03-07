import React, { useEffect, useState } from "react";
import "./Feed.css"; 

const Feed = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/feed"); // Update actual API URL
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      }
    };
    
    fetchPost();
  }, []);

  if (!post) {
    return <p className="loading-text">Loading...</p>;
  }

  return (
    <div className="feed-container">
      {/* Profile */}
      <div className="profile">
        <img src={post.profileImage} alt="profile" className="profile-img" />
        <div>
          <h2 className="profile-name">{post.name}</h2>
          <p className="profile-profession">{post.profession}</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="post-content">{post.content}</p>

      {/* Player Stats Box */}
      <div className="stats-box">
        <h3 className="stats-title">🏆 Player Stats</h3>
        <div className="stats-grid">
          <div>
            <p className="stats-value">{post.stats.points}</p>
            <p className="stats-label">Points</p>
          </div>
          <div>
            <p className="stats-value">{post.stats.assists}</p>
            <p className="stats-label">Assists</p>
          </div>
          <div>
            <p className="stats-value">{post.stats.games}</p>
            <p className="stats-label">Games</p>
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="tags">
        {post.tags.map((tag, index) => (
          <span key={index} className="tag">#{tag}</span>
        ))}
      </div>

      {/* Post Image */}
      <div className="post-image">
        <img src={post.image} alt="post" />
      </div>
    </div>
  );
};

export default Feed;
