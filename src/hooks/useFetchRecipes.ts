import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes } from '../services/searchRecipes';
import { FetchRecipesResponse } from '../types/Recipe';

/**
 * Custom hook to fetch recipes with search, filter, and pagination functionality.
 * Implements debouncing, state management, and optimization using React hooks.
 */
export const useFetchRecipes = () => {
  // State for debounced search term, raw search term, filters, and current page
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    minRating?: string;
    maxPreparationTime?: string;
  }>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Ref to store the timeout ID for debouncing
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Debouncing logic to reduce the frequency of search term updates.
   * Updates the `debouncedSearchTerm` only after 500ms of inactivity.
   */
  useEffect(() => {
    // Clear any existing timeout to reset the debounce timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to update the debounced search term
    timeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    // Cleanup function to clear the timeout on unmount or on `searchTerm` change
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm]);

  /**
   * Memoize the query key to avoid unnecessary re-computation on every render.
   * This ensures React Query detects changes only when dependencies change.
   */
  const queryKey = useMemo(
    () => ['recipes', debouncedSearchTerm, filters, currentPage],
    [debouncedSearchTerm, filters, currentPage],
  );

  /**
   * Fetch recipes using React Query with the memoized query key and function.
   */
  const { data, error, isLoading, isError } = useQuery<FetchRecipesResponse>({
    queryKey, // Unique key to cache and track this query
    queryFn: () =>
      fetchRecipes({
        ingredients: debouncedSearchTerm,
        minRating: filters.minRating,
        maxPreparationTime: filters.maxPreparationTime,
        page: currentPage,
        limit: 12,
      }),
  });

  /**
   * Handles page change by updating the `currentPage` state.
   * This function is memoized using `useCallback` to avoid unnecessary re-creations.
   */
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  /**
   * Handles search term changes by updating the `searchTerm` state.
   * This function is memoized using `useCallback` for better performance.
   */
  const handleSearch = useCallback((searchTerm: string) => {
    setSearchTerm(searchTerm);
  }, []);

  /**
   * Handles filter changes by updating the `filters` state and resetting the page to 1.
   * This function is memoized using `useCallback` to prevent unnecessary re-renders.
   */
  const handleFilterChange = useCallback(
    (newFilters: { minRating?: string; maxPreparationTime?: string }) => {
      setFilters(newFilters);
      setCurrentPage(1); // Reset to the first page when filters are updated
    },
    [],
  );

  /**
   * Returns the recipes, error state, pagination details, and handler functions.
   */
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
