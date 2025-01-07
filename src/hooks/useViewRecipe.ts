import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchRecipeById,
  addComment,
  addRating,
  fetchUserFeedback,
} from '../services/viewRecipeService';

export const useViewRecipe = (recipeId: string) => {
  const queryClient = useQueryClient();

  // Define types for Recipe and UserFeedback
  interface RecipeData {
    _id: string;
    title: string;
    ingredients: string[];
    steps: string[];
    image: string | null;
    preparationTime: number;
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    stars: Array<{
      user: { _id: string; firstName: string; lastName: string; email: string };
      rating: number;
      _id: string;
    }>;
    comments: Array<{
      user: { _id: string; firstName: string; lastName: string; email: string };
      comment: string;
      _id: string;
      createdAt: string;
    }>;
  }

  interface UserFeedback {
    data: {
      checkIfUserhasCommented: {
        _id: string;
        comment: string;
        createdAt: string;
      } | null;
      checkIfUserhasRated: {
        _id: string;
        rating: string;
        createdAt: string;
      } | null;
    };
  }

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
