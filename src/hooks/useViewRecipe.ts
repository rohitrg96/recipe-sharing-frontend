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

interface UserComment {
  user: string;
  _id: string;
  createdAt?: string;
  comment: string;
}

interface UserRating {
  user: string;
  _id: string;
  createdAt?: string;
  rating: string;
}

export const useViewRecipe = (recipeId: string) => {
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [userRating, setUserRating] = useState<UserRating | null>(null);
  const [userComment, setUserComment] = useState<UserComment | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const fetchedRecipe = await fetchRecipeById(recipeId);
        const userFeedback = await fetchUserFeedback(recipeId);
        console.log(userFeedback.data, 12);
        setRecipe(fetchedRecipe);
        setUserComment(userFeedback.data.checkIfUserhasCommented);
        setUserRating(userFeedback.data.checkIfUserhasRated);
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
        setUserComment(userFeedback.data.checkIfUserhasCommented);
        setUserRating(userFeedback.data.checkIfUserhasRated);
        setShowModal(false);
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
      setUserRating(userFeedback.data.checkIfUserhasRated);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return {
    recipe,
    rating,
    userRating,
    userComment,
    showModal,
    setShowModal,
    setUserComment,
    setUserRating,
    setRating,
    comment,
    setComment,
    handleAddComment,
    handleRate,
  };
};
