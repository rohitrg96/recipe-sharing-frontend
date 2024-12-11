import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

interface SignUpRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface LoginRequest {
  userName: string;
  password: string;
}

export const signUpUser = async (userData: SignUpRequest) => {
  try {
    // Make API call using axios
    const response = await axios.post(`${API_BASE_URL}/users`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Return success response
    return { success: true, data: response.data };
  } catch (error: any) {
    // Error handling
    console.error('SignUp Error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    return { success: false, error: errorMessage };
  }
};

export const loginUser = async (loginData: LoginRequest) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, loginData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Handle success response
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data.message };
    }
  } catch (error: any) {
    console.error('Login Error:', error);
    return { success: false, error: error.message || 'Something went wrong' };
  }
};
