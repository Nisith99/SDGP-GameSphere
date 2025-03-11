import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaShare } from 'react-icons/fa';
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Post by ${post.author?.name || 'User'}`,
        text: post.content,
        url: window.location.href
      }).catch(error => console.log('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support Web Share API
      const shareText = `${post.content}\n\nPosted by ${post.author?.name || 'User'}`;
      navigator.clipboard.writeText(shareText)
        .then(() => alert('Post content copied to clipboard!'))
        .catch(error => console.log('Error copying to clipboard:', error));
    }
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
        <img 
          src={post.author?.image || "https://via.placeholder.com/40"} 
          alt={post.author?.name || "User"} 
          className="profile-pic" 
        />
        <div className="post-info">
          <h3 className="author-name">{post.author?.name || "User"}</h3>
          <p className="profession">{post.author?.profession || "Gamer"}</p>
          <p className="timestamp">{formatDate(post.createdAt)}</p>
        </div>
      </div>

      <div className="post-content">
        <p>{post.content}</p>
      </div>

      <div className="post-actions">
        <button 
          className={`action-button ${post.likes?.includes('current_user') ? 'liked' : ''}`} 
          onClick={onLike}
        >
          {post.likes?.includes('current_user') ? <FaHeart /> : <FaRegHeart />}
          <span>{post.likes?.length || 0} Likes</span>
        </button>
        <button 
          className="action-button"
          onClick={() => setShowComments(!showComments)}
        >
          <FaComment />
          <span>{post.comments?.length || 0} Comments</span>
        </button>
        <button 
          className="action-button"
          onClick={handleShare}
        >
          <FaShare />
          <span>Share</span>
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
                  src={comment.author?.image || "https://via.placeholder.com/32"} 
                  alt={comment.author?.name || "User"} 
                  className="comment-profile-pic" 
                />
                <div className="comment-content">
                  <div className="comment-header">
                    <h4>{comment.author?.name || "User"}</h4>
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