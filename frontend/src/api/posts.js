import { API_BASE_URL } from './config';

// Create a new post
export const createPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: postData.content,
        name: postData.author.name,
        profileImage: postData.author.image,
        profession: postData.author.profession
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};

// Get all posts
export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/post`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

// Like/Unlike a post
export const likePost = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/post/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: 'temp_user_id' })
    });

    if (!response.ok) {
      throw new Error('Failed to like post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error liking post:', error);
    throw new Error('Failed to like post');
  }
};

// Delete a post
export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/post/${postId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete post');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
};

// Add a comment to a post
export const addComment = async (postId, comment) => {
  try {
    const response = await fetch(`${API_BASE_URL}/post/${postId}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: comment,
        userId: 'temp_user_id',
        userName: 'Temporary User',
        userAvatar: 'https://via.placeholder.com/40'
      })
    });

    if (!response.ok) {
      throw new Error('Failed to add comment');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding comment:', error);
    throw new Error('Failed to add comment');
  }
};