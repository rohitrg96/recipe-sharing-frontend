import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../utils/constants';

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL, // Use your API base URL
});

// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  },
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response, // Pass successful responses
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Handle unauthorized or missing token errors
      alert('Your session may have expired, or you might need to log in first to continue.');
      Cookies.remove('authToken'); // Clear the invalid token
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  },
);

export default api;
