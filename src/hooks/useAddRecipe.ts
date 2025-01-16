import { useState, useRef } from 'react';
import { addRecipe } from '../services/addrecipeService';
import { uploadImage } from '../services/uploadService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export const useAddRecipe = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      title: '',
      ingredients: [''],
      steps: [''],
      preparationTime: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Recipe title is required'),
      ingredients: Yup.array().of(
        Yup.string().required('Ingredient is required'),
      ),
      steps: Yup.array().of(Yup.string().required('Step is required')),
      preparationTime: Yup.number()
        .typeError('Preparation time must be a valid number')
        .required('Preparation time is required'),
    }),
    onSubmit: async (values) => {
      if (!uploadedImageUrl) {
        toast.error('Please upload an image.');
        return;
      }

      const recipeData = {
        title: values.title,
        ingredients: values.ingredients,
        steps: values.steps,
        preparationTime: values.preparationTime,
        image: uploadedImageUrl || null,
      };

      try {
        const result = await addRecipe(recipeData);
        if (result.success) {
          toast.success('Recipe added successfully!');
          formik.resetForm();
          setImagePreview(null);
          setUploadedImageUrl('');
          navigate('/');
        } else {
          toast.error(result.error || 'Failed to add recipe.');
        }
      } catch (error) {
        toast.error('An unexpected error occurred. Please try again.');
      }
    },
  });

  // Handle image selection
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
      toast.warn('Please select an image to upload.');
      return;
    }

    try {
      const response = await uploadImage(selectedFile);
      if (response.statusMessage === 'Success') {
        setUploadedImageUrl(response.data.url); // Set the URL returned by the backend
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(response.data.message || 'Failed to upload image.');
      }
    } catch (error) {
      toast.error('Failed to upload image.');
      console.error('Upload error:', error);
    }
  };

  return {
    formik,
    imagePreview,
    fileInputRef,
    handleImageChange,
    handleRemoveImage,
    handleUpload,
  };
};
