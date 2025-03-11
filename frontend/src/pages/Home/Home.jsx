import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Feed from "../../Components/Feed";
import { getAllPosts, createPost, likePost, addComment } from "../../api/posts";
import "./Home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPosts();
      setPosts(data || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (postData) => {
    try {
      const newPost = await createPost(postData);
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const updatedPost = await likePost(postId);
      setPosts(prevPosts =>
        prevPosts.map(post =>
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
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="home">
      <Navbar />
      <div className="home-content">
        <Feed 
          posts={posts}
          loading={loading}
          error={error}
          onAddPost={handleAddPost}
          onLikePost={handleLikePost}
          onAddComment={handleAddComment}
          />
      </div>
    </div>
  );
}
