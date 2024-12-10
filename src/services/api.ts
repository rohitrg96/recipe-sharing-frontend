import axios from 'axios';

// API function to fetch recipes
export const fetchRecipes = async () => {
  try {
    const response = await axios.get(
      'http://localhost:5080/api/recipes?ingredients=&page=1&limit=10&title='
    );
    return response.data.data.data;
  } catch (error) {
    throw new Error('Failed to fetch recipes');
  }
};
