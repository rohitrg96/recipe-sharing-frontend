import { useState, useEffect } from 'react';
import { fetchRecipeById, addComment, addRating, fetchUserFeedback } from '../services/viewRecipeService';

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
  stars: {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    rating: number;
    _id: string;
  }[];
  comments: {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    comment: string;
    _id: string;
    createdAt: string;
  }[];
}

export const useViewRecipe = (recipeId: string) => {
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [userRating, setUserRating] = useState<boolean>(false);
  const [userComment, setUserComment] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await fetchRecipeById(recipeId);
        const userFeedback = await fetchUserFeedback(recipeId);
        console.log(userFeedback.data.userCommented, 12);
        setRecipe(fetchedRecipe);
        setUserComment(userFeedback.data.userCommented);
        setUserRating(userFeedback.data.userRated);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleAddComment = async () => {
    if (comment.trim()) {
      try {
        await addComment(recipeId, comment);
        setComment('');
        const updatedRecipe = await fetchRecipeById(recipeId);
        const userFeedback = await fetchUserFeedback(recipeId);
        setRecipe(updatedRecipe);
        setUserComment(userFeedback.data.userCommented);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleRate = async (newRating: number) => {
    try {
      await addRating(recipeId, newRating);
      setRating(newRating);
      const updatedRecipe = await fetchRecipeById(recipeId);
      const userFeedback = await fetchUserFeedback(recipeId);
      setRecipe(updatedRecipe);
      setUserRating(userFeedback.data.userRated);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return {
    recipe,
    rating,
    userRating,
    userComment,
    setUserComment,
    setUserRating,
    setRating,
    comment,
    setComment,
    handleAddComment,
    handleRate,
  };
};
