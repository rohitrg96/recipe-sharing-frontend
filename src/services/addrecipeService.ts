import api from '../api/axiosInstance';

export const addRecipe = async (recipeData: any) => {
  try {
    const response = await api.post('/recipes', recipeData, {
      headers: {
        'Content-Type': 'application/json', // This header remains for JSON content
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
