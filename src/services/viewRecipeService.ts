// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '../utils/constants';
import api from '../api/axiosInstance';

// Fetch a single recipe by ID
export const fetchRecipeById = async (recipeId: string) => {
  // const token = Cookies.get('authToken');
  // if (!token) {
  //   throw new Error('Authentication token not found');
  // }
  // const response = await axios.get(`${API_BASE_URL}/recipes/${recipeId}`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  const response = await api.get(`/recipes/${recipeId}`);
  return response.data.data;
};

// Add a comment to a recipe
export const addComment = async (recipeId: string, comment: string) => {
  await api.put(`/recipes/comment/${recipeId}`, { comment });
};

// Add a rating to a recipe
export const addRating = async (recipeId: string, rating: number) => {
  await api.put(`/recipes/rating/${recipeId}`, { rating });
};

// Fetch user feedback on a recipe
export const fetchUserFeedback = async (recipeId: string) => {
  const response = await api.get(`/recipes/user-feedback/${recipeId}`);
  return response.data; // Assuming the response has a `data` object
};
