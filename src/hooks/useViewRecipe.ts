import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchRecipeById,
  addComment,
  addRating,
  fetchUserFeedback,
} from '../services/viewRecipeService';
import { RecipeData, UserFeedback } from '../types/Recipe';
import { useCallback, useMemo } from 'react';

export const useViewRecipe = (recipeId: string) => {
  const queryClient = useQueryClient();

  /**
   * Fetch recipe data using React Query.
   * The queryKey and query function are memoized using `useMemo`.
   */
  const recipeQueryKey = useMemo(() => ['recipe', recipeId], [recipeId]);
  const { data: recipe, isLoading: isRecipeLoading } = useQuery<RecipeData>({
    queryKey: recipeQueryKey,
    queryFn: () => fetchRecipeById(recipeId),
  });

  /**
   * Fetch user feedback using React Query.
   * Memoizing the queryKey to ensure stability across renders.
   */
  const userFeedbackQueryKey = useMemo(
    () => ['userFeedback', recipeId],
    [recipeId],
  );
  const { data: userFeedback, isLoading: isFeedbackLoading } =
    useQuery<UserFeedback>({
      queryKey: userFeedbackQueryKey,
      queryFn: () => fetchUserFeedback(recipeId),
    });

  /**
   * Memoized userComment and userRating to avoid recalculating them unnecessarily.
   */
  const userComment = useMemo(
    () => userFeedback?.data.checkIfUserhasCommented || null,
    [userFeedback],
  );
  const userRating = useMemo(
    () => userFeedback?.data.checkIfUserhasRated || null,
    [userFeedback],
  );

  /**
   * Mutation to add a comment.
   * The mutation function and invalidation logic are memoized using `useCallback`.
   */
  const addCommentMutation = useMutation({
    mutationFn: useCallback(
      (comment: string) => addComment(recipeId, comment),
      [recipeId],
    ),
    onSuccess: useCallback(() => {
      queryClient.invalidateQueries({ queryKey: recipeQueryKey });
      queryClient.invalidateQueries({ queryKey: userFeedbackQueryKey });
    }, [queryClient, recipeQueryKey, userFeedbackQueryKey]),
  });

  /**
   * Mutation to add a rating.
   * The mutation function and invalidation logic are memoized using `useCallback`.
   */
  const addRatingMutation = useMutation({
    mutationFn: useCallback(
      (newRating: number) => addRating(recipeId, newRating),
      [recipeId],
    ),
    onSuccess: useCallback(() => {
      queryClient.invalidateQueries({ queryKey: recipeQueryKey });
      queryClient.invalidateQueries({ queryKey: userFeedbackQueryKey });
    }, [queryClient, recipeQueryKey, userFeedbackQueryKey]),
  });

  /**
   * Return all values and functions in a single object.
   * `useMemo` is used to ensure the returned object reference doesn't change unnecessarily.
   */
  return useMemo(
    () => ({
      recipe,
      isRecipeLoading,
      isFeedbackLoading,
      userComment,
      userRating,
      addCommentMutation,
      addRatingMutation,
    }),
    [
      recipe,
      isRecipeLoading,
      isFeedbackLoading,
      userComment,
      userRating,
      addCommentMutation,
      addRatingMutation,
    ],
  );
};
