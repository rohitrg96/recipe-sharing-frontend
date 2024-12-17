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
    const errorMessages =
      error.response?.data?.errors?.map((err: { message: string }) => err.message).join('\n') || 'Something went wrong';

    return { success: false, error: errorMessages };
  }
};

export const loginUser = async (loginData: LoginRequest) => {
  try {
    const response = await api.post(`/auth/login`, loginData, {
      headers: {
        'Content-Type': 'application/json', // This header remains for JSON content
      },
    });

    // Manually check for error status (like 400) and handle accordingly
    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      return { success: false, error: response.data?.message || 'Invalid credentials' };
    }
  } catch (error: any) {
    console.error('Login Error:', error);
    let errorMessages;
    if (error.response.data.errors) {
      errorMessages =
        error.response?.data?.errors?.map((err: { message: string }) => err.message).join('\n') ||
        'Something went wrong';
    } else {
      errorMessages = error.response.data.message;
    }

    return { success: false, error: errorMessages };
  }
};
