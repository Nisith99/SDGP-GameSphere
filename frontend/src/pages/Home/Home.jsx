import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Feed from "../../Components/Feed";
import CreatePost from "../../Components/CreatePost";
import { getPosts, likePost, addComment, addReply, likeComment } from "../../api/posts";
import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handleLikePost = async (postId) => {
    try {
      const updatedPost = await likePost(postId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, likes: updatedPost.likes } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      const newComment = await addComment(postId, comment);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleAddReply = async (postId, commentId, reply) => {
    try {
      const newReply = await addReply(postId, commentId, reply);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment._id === commentId
                    ? { ...comment, replies: [...comment.replies, newReply] }
                    : comment
                ),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  const handleLikeComment = async (postId, commentId) => {
    try {
      const updatedComment = await likeComment(postId, commentId);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: post.comments.map((comment) =>
                  comment._id === commentId
                    ? { ...comment, likes: updatedComment.likes }
                    : comment
                ),
              }
            : post
        )
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <CreatePost onAddPost={handleAddPost} />
        {loading ? (
          <div className="loading-message">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="empty-message">No posts yet. Be the first to post!</div>
        ) : (
          <Feed
            posts={posts}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
            onAddReply={handleAddReply}
            onLikeComment={handleLikeComment}
          />
        )}
      </div>
    </div>
  );
}
