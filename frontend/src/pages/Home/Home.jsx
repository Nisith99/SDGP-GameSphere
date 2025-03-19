import { useState, useEffect } from "react";
import Navbar from "../../Components/Navbar";
import Feed from "../../Components/Feed";
import { getAllPosts, createPost, likePost, addComment, deletePost } from "../../api/posts";
import "./Home.css";
import Feed from "../../Components/Feed"
import { Footer } from "../../Components/footer";

const defaultAuthor = {
  name: 'User',
  image: 'https://via.placeholder.com/40',
  profession: 'Gamer'
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPosts();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format');
      }
      // Create a map of posts by ID to remove duplicates
      const postsMap = new Map();
      data.forEach(post => {
        postsMap.set(post._id, {
          ...post,
          author: {
            name: post.name || defaultAuthor.name,
            image: post.profileImage || defaultAuthor.image,
            profession: post.profession || defaultAuthor.profession
          },
          likes: post.likes || [],
          comments: post.comments || []
        });
      });
      setPosts(Array.from(postsMap.values()));
    } catch (error) {
      setError("Failed to load posts");
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    
    const loadPosts = async () => {
      if (mounted) {
        await fetchPosts();
      }
    };
    
    loadPosts();
    
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddPost = async (postData) => {
    try {
      const newPost = await createPost({
        ...postData,
        author: defaultAuthor
      });
      
      // Format the new post to match our data structure
      const formattedPost = {
        ...newPost,
        author: {
          name: newPost.name || defaultAuthor.name,
          image: newPost.profileImage || defaultAuthor.image,
          profession: newPost.profession || defaultAuthor.profession
        },
        likes: [],
        comments: []
      };
      
      // Update state with the new post at the beginning
      setPosts(prevPosts => {
        const newPosts = [formattedPost, ...prevPosts];
        // Remove any duplicates based on _id
        const uniquePosts = new Map();
        newPosts.forEach(post => uniquePosts.set(post._id, post));
        return Array.from(uniquePosts.values());
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
 
  const handleLikePost = async (postId) => {
    try {
      const response = await likePost(postId);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId ? { ...post, likes: response.likes, isLiked: response.isLiked } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      const response = await addComment(postId, comment);
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post._id === postId
            ? { ...post, comments: [...(post.comments || []), response.comment] }
            : post
        )
      );
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
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
          onDeletePost={handleDeletePost}
        />
      </div>
      <Footer />
    </div>
  );
}
