import api from '../api/axiosInstance'; // Import centralized Axios instance

export const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await api.post('/recipes/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Axios instance won't handle this automatically
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload image');
  }
};
