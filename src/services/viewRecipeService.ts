import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../utils/constants';

// Fetch a single recipe by ID
export const fetchRecipeById = async (recipeId: string) => {
  const token = Cookies.get('authToken');
  if (!token) {
    throw new Error('Authentication token not found');
  }
  const response = await axios.get(`${API_BASE_URL}/recipes/${recipeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

// Add a comment to a recipe
export const addComment = async (recipeId: string, comment: string) => {
  const token = Cookies.get('authToken');
  if (!token) {
    throw new Error('Authentication token not found');
  }
  await axios.put(
    `${API_BASE_URL}/recipes/comment/${recipeId}`,
    { comment },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

// Add a rating to a recipe
export const addRating = async (recipeId: string, rating: number) => {
  const token = Cookies.get('authToken');
  if (!token) {
    throw new Error('Authentication token not found');
  }
  await axios.put(
    `${API_BASE_URL}/recipes/rating/${recipeId}`,
    { rating },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

export const fetchUserFeedback = async (recipeId: string) => {
  const token = Cookies.get('authToken');
  if (!token) {
    throw new Error('Authentication token not found');
  }
  const response = await axios.get(`${API_BASE_URL}/recipes//user-feedback/${recipeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
