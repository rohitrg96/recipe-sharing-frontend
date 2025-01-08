import api from '../api/axiosInstance';
import { FetchRecipesResponse, RecipeSearchParams } from '../types/Recipe';

// API function to fetch recipes
export const fetchRecipes = async (
  params: RecipeSearchParams = {},
): Promise<FetchRecipesResponse> => {
  try {
    const response = await api.get('/recipes', { params }); // Using the `api` instance
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching recipes:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch recipes');
  }
};
