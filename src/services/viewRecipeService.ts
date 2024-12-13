import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../utils/constants';

export const getRecipe = async (recipeId: string) => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error('Authentication token not found');

  const response = await axios.get(`${API_BASE_URL}/${recipeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
};

export const addComment = async (recipeId: string, comment: string) => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error('Authentication token not found');

  await axios.put(
    `${API_BASE_URL}/comment/${recipeId}`,
    { comment },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

export const rateRecipe = async (recipeId: string, rating: number) => {
  const token = Cookies.get('authToken');
  if (!token) throw new Error('Authentication token not found');

  await axios.put(`${API_BASE_URL}/rating/${recipeId}`, { rating }, { headers: { Authorization: `Bearer ${token}` } });
};
