import api from '../api/axiosInstance';

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

// Sign up user
export const signUpUser = async (userData: SignUpRequest) => {
  try {
    const response = await api.post('/users', userData, {
      headers: {
        'Content-Type': 'application/json', // This header remains for JSON content
      },
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    console.error('SignUp Error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Something went wrong';
    return { success: false, error: errorMessage };
  }
};

// Login user
export const loginUser = async (loginData: LoginRequest) => {
  try {
    const response = await api.post('/auth/login', loginData, {
      headers: {
        'Content-Type': 'application/json', // This header remains for JSON content
      },
    });

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
