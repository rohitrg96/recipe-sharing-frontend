import { useState, useEffect } from 'react';
import { fetchRecipes } from '../services/searchRecipes';
import { Recipe } from '../types/Recipe';

export const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalpages, setTotalPages] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      setError(null);
      try {
        const data = await fetchRecipes({ ingredients: searchTerm, page: currentPage, limit: 12 });
        setRecipes(data.data);
        console.log(data.pagination.totalPages);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        setError('Failed to fetch recipes');
      }
    };

    fetchData();
  }, [searchTerm, currentPage]);

  const handlePageChange = (currentPage: number) => {
    console.log(`Navigated to page: ${currentPage}`);
    setCurrentPage(currentPage);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm); // Update the search term state
  };

  return { recipes, error, totalpages, currentPage, setSearchTerm, handlePageChange, handleSearch };
};
