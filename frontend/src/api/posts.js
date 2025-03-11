import axios from 'axios';
import { API_BASE_URL } from './config';

const api = axios.create({
  baseURL: `${API_BASE_URL}/post`,
  withCredentials: true
});

export const createPost = async (postData) => {
  try {
    const response = await api.post('/', postData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllPosts = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const likePost = async (postId) => {
  try {
    const response = await api.post(`/${postId}/like`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addComment = async (postId, comment) => {
  try {
    const response = await api.post(`/${postId}/comment`, { content: comment });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
