import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import Cookies from 'js-cookie';

export const uploadImage = async (file: File) => {
  const token = Cookies.get('authToken');
  console.log(token);
  if (!token) {
    throw new Error('Authentication token not found');
  }
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(`${API_BASE_URL}/recipes/upload-image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach the auth token
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Upload error:', error);
    throw new Error(error.response?.data?.message || 'Failed to upload image');
  }
};
