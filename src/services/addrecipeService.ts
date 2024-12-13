import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../utils/constants';

export const addRecipe = async (recipeData: any) => {
  try {
    const token = Cookies.get('authToken');
    console.log(token);
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await axios.post(`${API_BASE_URL}/recipes`, recipeData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the auth token
        'Content-Type': 'application/json',
      },
    });

    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('Add Recipe Error:', error);
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to add recipe.',
    };
  }
};
