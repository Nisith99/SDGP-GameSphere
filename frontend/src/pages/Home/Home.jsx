import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Feed from "../../Components/Feed";
import { getAllPosts, createPost, likePost, addComment } from "../../api/posts";
import "./Home.css";

const defaultAuthor = {
  name: 'User',
  image: 'https://via.placeholder.com/40',
  profession: 'Gamer'
};

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
      setPosts(prevPosts => {
        const uniquePosts = new Map(prevPosts.map(post => [post._id, post]));
        data.forEach(post => {
          uniquePosts.set(post._id, {
            ...post,
            author: post.author || defaultAuthor,
            likes: post.likes || [],
            comments: post.comments || []
          });
        });
        return Array.from(uniquePosts.values());
      });
    } catch (error) {
      setError("Failed to load posts");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPost = async (postData) => {
    try {
      const newPost = await createPost({
        ...postData,
        author: defaultAuthor  
      });
      setPosts(prevPosts => [newPost, ...prevPosts.filter(post._id !== newPost._id)]);
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
            ? { ...post, comments: [...(post.comments || []), newComment] }
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
