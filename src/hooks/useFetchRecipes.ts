import { useState, useEffect } from 'react';
import { fetchRecipes } from '../services/api';
import { Recipe } from '../types/Recipe';

export const useFetchRecipes = (searchTerm: string) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  // const [loading, setLoading] = useState<boolean>(tr/ue);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      setError(null);
      try {
        const data = await fetchRecipes({ ingredients: searchTerm });
        setRecipes(data);
      } catch (error) {
        setError('Failed to fetch recipes');
      }
    };

    fetchData();
  }, [searchTerm]);

  return { recipes, error };
};
