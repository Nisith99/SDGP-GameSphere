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

export const searchPosts = async (query) => {
  try {
    const response = await api.get(`/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await api.put(`/${id}`, postData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
