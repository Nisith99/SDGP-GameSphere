import React from "react";
import Post from "./Post";
import CreatePost from "./CreatePost";
import "./Feed.css";

const Feed = ({ 
  posts, 
  loading, 
  error, 
  onAddPost,
  onLikePost,
  onAddComment,
  onDeletePost
}) => {
  if (loading) {
    return <div className="feed-status">Loading posts...</div>;
  }

  if (error) {
    return <div className="feed-status error">{error}</div>;
  }

  return (
    <div className="feed">
      <CreatePost onAddPost={onAddPost} />
      
      {!posts?.length ? (
        <div className="feed-status">No posts available. Be the first to post!</div>
      ) : (
        <div className="posts-list">
          {posts.map((post) => (
            <Post 
              key={post._id} 
              post={post}
              onLike={() => onLikePost(post._id)}
              onAddComment={(comment) => onAddComment(post._id, comment)}
              onDelete={() => onDeletePost(post._id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
