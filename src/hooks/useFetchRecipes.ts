import { useState, useEffect } from 'react';
import { fetchRecipes } from '../services/searchRecipes';
import { Recipe } from '../types/Recipe';

export const useFetchRecipes = (searchTerm: string, page: number) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalpages, setTotalPages] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      setError(null);
      try {
        const data = await fetchRecipes({ ingredients: searchTerm, page: page, limit: 12 });
        setRecipes(data.data);
        console.log(data.pagination.totalPages);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        setError('Failed to fetch recipes');
      }
    };

    fetchData();
  }, [searchTerm, page]);

  return { recipes, error, totalpages };
};
