import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

interface RecipeSearchParams {
  ingredients?: string;
  title?: string;
  minRating?: number;
  maxPreparationTime?: number;
  page?: number;
  limit?: number;
}

// API function to fetch recipes
export const fetchRecipes = async (params: RecipeSearchParams = {}) => {
  try {
    console.log(params, 'params');
    const response = await axios.get(`${API_BASE_URL}/recipes`, { params });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
};
