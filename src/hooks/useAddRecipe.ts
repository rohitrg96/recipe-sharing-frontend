import { useState, useRef } from 'react';
import { addRecipe } from '../services/recipeService';

interface RecipeData {
  title: string;
  ingredients: string[];
  steps: string[];
  preparationTime: string;
  image: string | null;
}

export const useAddRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  const [prepTime, setPrepTime] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddIngredient = () => setIngredients([...ingredients, '']);
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };
  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(updatedIngredients);
  };

  const handleAddStep = () => setSteps([...steps, '']);
  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };
  const handleRemoveStep = (index: number) => {
    const updatedSteps = steps.filter((_, i) => i !== index);
    setSteps(updatedSteps);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Prepare the image as base64 (optional, depending on API)
      const file = fileInputRef.current?.files?.[0];
      let image = null;
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        image = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = () => reject('Failed to read file');
        });
      }

      const recipeData: RecipeData = {
        title,
        ingredients,
        steps,
        preparationTime: prepTime,
        image: image || null, // Base64 image or null
      };

      // Call the service function to add the recipe
      const response = await addRecipe(recipeData);

      if (response.success) {
        setSuccess('Recipe added successfully!');
        setTitle('');
        setIngredients(['']);
        setSteps(['']);
        setPrepTime('');
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setError(response.error || 'Failed to add recipe.');
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred.');
    }
  };

  return {
    title,
    ingredients,
    steps,
    prepTime,
    imagePreview,
    fileInputRef,
    error,
    success,
    handleAddIngredient,
    handleIngredientChange,
    handleRemoveIngredient,
    handleAddStep,
    handleStepChange,
    handleRemoveStep,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    setTitle,
    setPrepTime,
  };
};
