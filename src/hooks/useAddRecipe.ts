import { useState, useRef } from 'react';
import { addRecipe } from '../services/addrecipeService';

export const useAddRecipe = () => {
  const [title, setTitle] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>(['']); // Start with a single empty ingredient
  const [steps, setSteps] = useState<string[]>(['']); // Start with a single empty step
  const [preparationTime, setPreparationTime] = useState<string | ''>(''); // Allow empty initially
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle adding, updating, and removing ingredients
  const handleAddIngredient = () => setIngredients([...ingredients, '']);
  const handleIngredientChange = (index: number, value: string) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);
  };
  const handleRemoveIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Handle adding, updating, and removing steps
  const handleAddStep = () => setSteps([...steps, '']);
  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = [...steps];
    updatedSteps[index] = value;
    setSteps(updatedSteps);
  };
  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  // Handle image upload and preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (preparationTime === '' || isNaN(Number(preparationTime))) {
      setError('Preparation time must be a valid number.');
      return;
    }

    const recipeData = {
      title,
      ingredients,
      steps,
      preparationTime: Number(preparationTime),
      image: imagePreview || null, // Send the image as a base64 string or null
    };

    const result = await addRecipe(recipeData);

    if (result.success) {
      setSuccess('Recipe added successfully!');
      setTitle('');
      setIngredients(['']);
      setSteps(['']);
      setPreparationTime('');
      setImagePreview(null);
    } else {
      setError(result.error || 'Failed to add recipe.');
    }
  };

  return {
    title,
    ingredients,
    steps,
    preparationTime,
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
    setPreparationTime,
  };
};
