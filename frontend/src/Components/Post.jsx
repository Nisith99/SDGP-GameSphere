import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaComment, FaShare, FaEllipsisH, FaReply, FaPaperPlane } from "react-icons/fa";
import "./Post.css";

export default function Post({ post, onLike, onAddComment, onAddReply, onLikeComment }) {
  const [commentContent, setCommentContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [isSharing, setIsSharing] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m`;
    if (hours < 24) return `${hours}h`;
    if (days < 7) return `${days}d`;
    return date.toLocaleDateString();
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;
    onAddComment(commentContent);
    setCommentContent("");
  };

  const handleSubmitReply = (e, commentId) => {
    e.preventDefault();
    if (!replyContent.trim()) return;
    onAddReply(commentId, replyContent);
    setReplyContent("");
    setReplyingTo(null);
  };

  const handleShare = () => {
    setIsSharing(true);
    // Copy post URL to clipboard
    const postUrl = `${window.location.origin}/post/${post._id}`;
    navigator.clipboard.writeText(postUrl)
      .then(() => {
        setShowShareTooltip(true);
        setTimeout(() => {
          setShowShareTooltip(false);
          setIsSharing(false);
        }, 2000);
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        setIsSharing(false);
      });
  };

  return (
    <div className="post">
      {/* Post Header */}
      <div className="post-header">
        <div className="author-info">
          <div className="avatar">
            {post.author.avatar ? (
              <img src={post.author.avatar} alt="" />
            ) : (
              <span>{post.author.name[0]}</span>
            )}
          </div>
          <div>
            <div className="author-name">{post.author.name}</div>
            <div className="post-time">{formatTimestamp(post.createdAt)}</div>
          </div>
        </div>
        <button className="more-options">
          <FaEllipsisH />
        </button>
      </div>

      {/* Post Content */}
      <div className="post-content">
        <p>{post.content}</p>
        {post.image && (
          <img src={post.image} alt="" className="post-image" />
        )}
      </div>

      {/* Post Stats */}
      <div className="post-stats">
        <span>{post.likes?.length || 0} likes</span>
        <span>•</span>
        <span>{post.comments?.length || 0} comments</span>
      </div>

      {/* Post Actions */}
      <div className="post-actions">
        <button
          onClick={onLike}
          className={`action-button ${post.isLiked ? 'liked' : ''}`}
        >
          {post.isLiked ? <FaHeart /> : <FaRegHeart />}
          <span>Like</span>
        </button>
        <button className="action-button" onClick={() => document.querySelector('.comment-input').focus()}>
          <FaComment />
          <span>Comment</span>
        </button>
        <button className="action-button" onClick={handleShare}>
          <FaShare />
          <span>{isSharing ? 'Copying...' : 'Share'}</span>
          {showShareTooltip && <div className="share-tooltip">Link copied!</div>}
        </button>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        {/* Comment Form */}
        <form onSubmit={handleSubmitComment} className="comment-form">
          <div className="avatar">
            <span>U</span>
          </div>
          <div className="comment-input-wrapper">
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Write a comment..."
              className="comment-input"
            />
            <button type="submit" className="send-button" disabled={!commentContent.trim()}>
              <FaPaperPlane />
            </button>
          </div>
        </form>

        {/* Comments List */}
        {post.comments?.map((comment) => (
          <div key={comment._id} className="comment">
            <div className="author-info">
              <div className="avatar">
                {comment.author.avatar ? (
                  <img src={comment.author.avatar} alt="" />
                ) : (
                  <span>{comment.author.name[0]}</span>
                )}
              </div>
              <div className="comment-content">
                <div className="author-name">{comment.author.name}</div>
                <p>{comment.content}</p>
              </div>
            </div>

            <div className="comment-actions">
              <button
                onClick={() => onLikeComment(comment._id)}
                className={`comment-action ${comment.isLiked ? 'liked' : ''}`}
              >
                {comment.isLiked ? 'Unlike' : 'Like'}
              </button>
              <button
                onClick={() => setReplyingTo(comment._id)}
                className="comment-action"
              >
                Reply
              </button>
              <span className="comment-time">{formatTimestamp(comment.createdAt)}</span>
              <span>{comment.likes?.length || 0} likes</span>
            </div>

            {/* Reply Form */}
            {replyingTo === comment._id && (
              <form
                onSubmit={(e) => handleSubmitReply(e, comment._id)}
                className="reply-form"
              >
                <div className="avatar">
                  <span>U</span>
                </div>
                <div className="reply-input-wrapper">
                  <input
                    type="text"
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    className="comment-input"
                  />
                  <div className="reply-actions">
                    <button
                      type="button"
                      onClick={() => setReplyingTo(null)}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!replyContent.trim()}
                      className="submit-reply"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Nested Replies */}
            {comment.replies?.map((reply) => (
              <div key={reply._id} className="reply">
                <div className="author-info">
                  <div className="avatar">
                    {reply.author.avatar ? (
                      <img src={reply.author.avatar} alt="" />
                    ) : (
                      <span>{reply.author.name[0]}</span>
                    )}
                  </div>
                  <div className="comment-content">
                    <div className="author-name">{reply.author.name}</div>
                    <p>{reply.content}</p>
                  </div>
                </div>
                <div className="comment-actions">
                  <button className={`comment-action ${reply.isLiked ? 'liked' : ''}`}>
                    {reply.isLiked ? 'Unlike' : 'Like'}
                  </button>
                  <span className="comment-time">{formatTimestamp(reply.createdAt)}</span>
                  <span>{reply.likes?.length || 0} likes</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}