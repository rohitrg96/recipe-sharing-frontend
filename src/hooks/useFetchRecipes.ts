import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../services/searchRecipes';
import { FetchRecipesResponse } from '../types/Recipe';

export const useFetchRecipes = () => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    minRating?: string;
    maxPreparationTime?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const { data, error, isLoading, isError } = useQuery<FetchRecipesResponse>({
    queryKey: ['recipes', debouncedSearchTerm, filters, currentPage],
    queryFn: () =>
      fetchRecipes({
        ingredients: debouncedSearchTerm,
        minRating: filters.minRating,
        maxPreparationTime: filters.maxPreparationTime,
        page: currentPage,
        limit: 12,
      }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  const handleFilterChange = (newFilters: {
    minRating?: string;
    maxPreparationTime?: string;
  }) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return {
    recipes: data?.data || [],
    error: isError && error instanceof Error ? error.message : null,
    totalpages: data?.pagination.totalPages || 10,
    currentPage,
    isLoading,
    isError,
    handleSearch,
    handlePageChange,
    handleFilterChange,
  };
};
