// Temporary local storage keys
const POSTS_STORAGE_KEY = 'gameSphere_posts';

// Helper functions for local storage
const getStoredPosts = () => {
  const posts = localStorage.getItem(POSTS_STORAGE_KEY);
  return posts ? JSON.parse(posts) : [];
};

const savePostsToStorage = (posts) => {
  localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
};

// Create a new post
export const createPost = async (postData) => {
  try {
    const posts = getStoredPosts();
    const newPost = {
      _id: Date.now().toString(),
      ...postData,
      likes: [],
      comments: []
    };
    posts.unshift(newPost);
    savePostsToStorage(posts);
    return newPost;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};

// Get all posts
export const getAllPosts = async () => {
  try {
    return getStoredPosts();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

// Like/Unlike a post
export const likePost = async (postId) => {
  try {
    const posts = getStoredPosts();
    const postIndex = posts.findIndex(post => post._id === postId);
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    // Toggle like
    const userId = 'current_user'; // Temporary user ID
    const likes = posts[postIndex].likes || [];
    const likeIndex = likes.indexOf(userId);

    if (likeIndex === -1) {
      likes.push(userId);
    } else {
      likes.splice(likeIndex, 1);
    }

    posts[postIndex].likes = likes;
    savePostsToStorage(posts);
    return posts[postIndex];
  } catch (error) {
    console.error('Error liking post:', error);
    throw new Error('Failed to like post');
  }
};

// Add a comment to a post
export const addComment = async (postId, comment) => {
  try {
    const posts = getStoredPosts();
    const postIndex = posts.findIndex(post => post._id === postId);
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const newComment = {
      _id: Date.now().toString(),
      content: comment,
      author: {
        name: 'User',
        image: 'https://via.placeholder.com/40',
        profession: 'Gamer'
      },
      createdAt: new Date().toISOString()
    };

    posts[postIndex].comments = [...(posts[postIndex].comments || []), newComment];
    savePostsToStorage(posts);
    return newComment;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
};
