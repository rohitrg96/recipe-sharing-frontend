import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchRecipeById,
  addComment,
  addRating,
  fetchUserFeedback,
} from '../services/viewRecipeService';
import { RecipeData, UserFeedback } from '../types/Recipe';

export const useViewRecipe = (recipeId: string) => {
  const queryClient = useQueryClient();

  // Fetch recipe data
  const { data: recipe, isLoading: isRecipeLoading } = useQuery<RecipeData>({
    queryKey: ['recipe', recipeId],
    queryFn: () => fetchRecipeById(recipeId),
  });

  // Fetch user feedback
  const { data: userFeedback, isLoading: isFeedbackLoading } =
    useQuery<UserFeedback>({
      queryKey: ['userFeedback', recipeId],
      queryFn: () => fetchUserFeedback(recipeId),
    });

  const userComment = userFeedback?.data.checkIfUserhasCommented || null;
  const userRating = userFeedback?.data.checkIfUserhasRated || null;

  // Add a comment mutation
  const addCommentMutation = useMutation({
    mutationFn: (comment: string) => addComment(recipeId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe', recipeId] });
      queryClient.invalidateQueries({ queryKey: ['userFeedback', recipeId] });
    },
  });

  // Add a rating mutation
  const addRatingMutation = useMutation({
    mutationFn: (newRating: number) => addRating(recipeId, newRating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipe', recipeId] });
      queryClient.invalidateQueries({ queryKey: ['userFeedback', recipeId] });
    },
  });

  return {
    recipe,
    isRecipeLoading,
    isFeedbackLoading,
    userComment,
    userRating,
    addCommentMutation,
    addRatingMutation,
  };
};
