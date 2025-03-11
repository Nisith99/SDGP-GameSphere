import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import './Post.css';

const Post = ({ post, onLike, onAddComment }) => {
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onAddComment(comment);
    setComment('');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.profileImage} alt={post.name} className="profile-pic" />
        <div className="post-info">
          <h3 className="author-name">{post.name}</h3>
          <p className="profession">{post.profession}</p>
          <p className="timestamp">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-actions">
        <button 
          className={`action-button ${post.isLiked ? 'liked' : ''}`} 
          onClick={onLike}
        >
          {post.isLiked ? <FaHeart /> : <FaRegHeart />}
          <span>{post.likes?.length || 0}</span>
        </button>
        <button 
          className="action-button"
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment />
          <span>{post.comments?.length || 0}</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <form onSubmit={handleSubmitComment} className="comment-form">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
            />
            <button 
              type="submit" 
              disabled={!comment.trim()}
              className="comment-submit"
            >
              Comment
            </button>
          </form>

          <div className="comments-list">
            {post.comments?.map((comment) => (
              <div key={comment._id} className="comment">
                <img 
                  src={comment.profileImage || "https://via.placeholder.com/32"} 
                  alt={comment.name} 
                  className="comment-profile-pic" 
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <h4>{comment.name}</h4>
                    <span className="comment-timestamp">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;