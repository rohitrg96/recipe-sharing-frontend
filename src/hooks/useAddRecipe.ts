import { useState, useRef } from 'react';
import { addRecipe } from '../services/addrecipeService';
import { uploadImage } from '../services/uploadService';
import { useNavigate } from 'react-router-dom';

export const useAddRecipe = () => {
  const [title, setTitle] = useState<string>('');
  const [ingredients, setIngredients] = useState<string[]>(['']); // Start with a single empty ingredient
  const [steps, setSteps] = useState<string[]>(['']); // Start with a single empty step
  const [preparationTime, setPreparationTime] = useState<string | ''>(''); // Allow empty initially
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

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

  //image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      // Show image preview
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select an image to upload.');
      return;
    }

    try {
      const response = await uploadImage(selectedFile);
      if (response.statusMessage == 'Success') {
        setUploadedImageUrl(response.data.url); // Set the URL returned by the backend

        setUploadStatus('Image uploaded successfully!');
      } else {
        setUploadStatus(response.data.message || 'Failed to upload image.');
      }
      console.log('Upload response:', response);
    } catch (error) {
      setUploadStatus('Failed to upload image.');
      console.error('Upload error:', error);
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
      image: uploadedImageUrl || null, // Send the image as a base64 string or null
    };

    const result = await addRecipe(recipeData);

    if (result.success) {
      setSuccess('Recipe added successfully!');
      setTitle('');
      setIngredients(['']);
      setSteps(['']);
      setPreparationTime('');
      setImagePreview(null);
      setUploadedImageUrl('');
      navigate('/');
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
    uploadStatus,
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
    handleUpload,
    uploadedImageUrl,
  };
};
