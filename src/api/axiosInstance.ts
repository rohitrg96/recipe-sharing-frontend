import axios from 'axios';
import Cookies from 'js-cookie';
import HTTP_CODES from '../utils/httpCodes';

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Use your API base URL
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
    if (
      error.response?.status === HTTP_CODES.UNAUTHORIZED ||
      error.response?.status === HTTP_CODES.FORBIDDEN
    ) {
      // Handle unauthorized or missing token errors
      alert(
        'Your session may have expired, or you might need to log in first to continue.',
      );
      Cookies.remove('authToken'); // Clear the invalid token
      window.location.href = '/login'; // Redirect to login page
    } else if (error.response?.status === HTTP_CODES.TOO_MANY_REQUESTS) {
      // Handle rate-limiting errors (HTTP 429)
      alert('You have made too many requests. Please try again later.');
      // Optionally, you can also reset the request counter or redirect to another page if needed.
    }
    return Promise.reject(error);
  },
);

export default api;
