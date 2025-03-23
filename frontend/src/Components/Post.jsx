import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { Loader, MessageCircle, Send, Share2, ThumbsUp, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

import PostAction from "./PostAction";

const Post = ({ post }) => {
  const { postId } = useParams();

  const { data: authUser, isLoading: authLoading } = useQuery({ queryKey: ["authUser"] });
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const queryClient = useQueryClient();

  if (authLoading || !authUser || !post) {
    return <div style={{ textAlign: "center", padding: "1rem", color: "#302F4D" }}>Loading...</div>;
  }

  const isOwner = authUser?._id === post?.author?._id;
  const isLiked = post?.likes?.includes(authUser?._id);

  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.delete(`/posts/delete/${post._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete post");
    },
  });

  const { mutate: createComment, isPending: isAddingComment } = useMutation({
    mutationFn: async (newComment) => {
      await axiosInstance.post(`/posts/${post._id}/comment`, { content: newComment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Comment added successfully");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to add comment");
    },
  });

  const { mutate: likePost, isPending: isLikingPost } = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/posts/${post._id}/like`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to like post");
    },
  });

  const handleDeletePost = () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    deletePost();
  };

  const handleLikePost = () => {
    if (isLikingPost) return;
    likePost();
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    createComment(newComment);
    setNewComment("");
    setComments([
      ...comments,
      {
        content: newComment,
        user: {
          _id: authUser._id,
          name: authUser.name,
          profilePicture: authUser.profilePicture,
        },
        createdAt: new Date(),
      },
    ]);
  };

  return (
    <div style={{ backgroundColor: "#F0D3F7", borderRadius: "0.5rem", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", marginBottom: "1rem" }}>
      <div style={{ padding: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link to={`/profile/${post?.author?.username || ""}`}>
              <img
                src={post?.author?.profilePicture || "/avatar.png"}
                alt={post?.author?.name || "User"}
                style={{ width: "2.5rem", height: "2.5rem", borderRadius: "50%", marginRight: "0.75rem" }}
              />
            </Link>
            <div>
              <Link to={`/profile/${post?.author?.username || ""}`}>
                <h3 style={{ fontWeight: "600", color: "#120D31" }}>{post?.author?.name || "Unknown User"}</h3>
              </Link>
              <p style={{ fontSize: "0.75rem", color: "#302F4D" }}>{post?.author?.headline || ""}</p>
              <p style={{ fontSize: "0.75rem", color: "#302F4D" }}>
                {post?.createdAt
                  ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
                  : "Unknown date"}
              </p>
            </div>
          </div>
          {isOwner && (
            <button
              onClick={handleDeletePost}
              style={{ color: "#A57982", transition: "color 0.2s" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#120D31")}
              onMouseOut={(e) => (e.currentTarget.style.color = "#A57982")}
            >
              {isDeletingPost ? <Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Trash2 size={18} />}
            </button>
          )}
        </div>
        <p style={{ marginBottom: "1rem", color: "#302F4D" }}>{post?.content || ""}</p>
        {post?.image && (
          <img src={post.image} alt="Post content" style={{ borderRadius: "0.5rem", width: "100%", marginBottom: "1rem" }} />
        )}

        <div style={{ display: "flex", justifyContent: "space-between", color: "#302F4D" }}>
          <PostAction
            icon={<ThumbsUp size={18} style={{ color: isLiked ? "#302F4D" : "#302F4D", fill: isLiked ? "#B98EA7" : "none" }} />}
            text={`Like (${post?.likes?.length || 0})`}
            onClick={handleLikePost}
          />
          <PostAction
            icon={<MessageCircle size={18} />}
            text={`Comment (${comments.length})`}
            onClick={() => setShowComments(!showComments)}
          />
          <PostAction icon={<Share2 size={18} />} text="Share" />
        </div>
      </div>

      {showComments && (
        <div style={{ padding: "0 1rem 1rem 1rem" }}>
          <div style={{ marginBottom: "1rem", maxHeight: "15rem", overflowY: "auto" }}>
            {comments.map((comment) => (
              <div
                key={comment._id}
                style={{
                  marginBottom: "0.5rem",
                  backgroundColor: "#B98EA7",
                  padding: "0.5rem",
                  borderRadius: "0.25rem",
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <img
                  src={comment?.user?.profilePicture || "/avatar.png"}
                  alt={comment?.user?.name || "User"}
                  style={{ width: "2rem", height: "2rem", borderRadius: "50%", marginRight: "0.5rem", flexShrink: 0 }}
                />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", marginBottom: "0.25rem" }}>
                    <span style={{ fontWeight: "600", marginRight: "0.5rem", color: "#120D31" }}>
                      {comment?.user?.name || "Unknown User"}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "#302F4D" }}>
                      {comment?.createdAt
                        ? formatDistanceToNow(new Date(comment.createdAt))
                        : "Unknown time"}
                    </span>
                  </div>
                  <p style={{ color: "#302F4D" }}>{comment?.content || ""}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              style={{
                flexGrow: 1,
                padding: "0.5rem",
                borderRadius: "2rem 0 0 2rem",
                backgroundColor: "#B98EA7",
                color: "#120D31",
                border: "none",
                outline: "none",
                transition: "all 0.2s",
              }}
              onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #302F4D")}
              onBlur={(e) => (e.target.style.boxShadow = "none")}
            />
            <button
              type="submit"
              style={{
                backgroundColor: "#302F4D",
                color: "#F0D3F7",
                padding: "0.5rem",
                borderRadius: "0 2rem 2rem 0",
                transition: "background-color 0.3s",
              }}
              disabled={isAddingComment}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#120D31")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#302F4D")}
            >
              {isAddingComment ? <Loader size={18} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={18} />}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;