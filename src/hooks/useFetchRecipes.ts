import { useState, useEffect } from 'react';
import { fetchRecipes } from '../services/searchRecipes';
import { Recipe } from '../types/Recipe';

export const useFetchRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [totalpages, setTotalPages] = useState<number>(10);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(''); // For debouncing
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{ minRating?: string; maxPreparationTime?: string }>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay

    return () => {
      clearTimeout(handler); // Clear timeout on every change
    };
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      try {
        const data = await fetchRecipes({
          ingredients: debouncedSearchTerm,
          minRating: filters.minRating,
          maxPreparationTime: filters.maxPreparationTime,
          page: currentPage,
          limit: 12,
        });
        setRecipes(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (error) {
        setError('Failed to fetch recipes');
      }
    };

    fetchData();
  }, [debouncedSearchTerm, filters, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleFilterChange = (newFilters: { minRating?: string; maxPreparationTime?: string }) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  return { recipes, error, totalpages, currentPage, handleSearch, handlePageChange, handleFilterChange };
};
