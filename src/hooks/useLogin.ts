import { useState } from 'react';
import { loginUser } from '../services/authService';
import Cookies from 'js-cookie';

const useLogin = () => {
  // State for form inputs
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // State for error and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      userName,
      password,
    };

    // Call the API service
    const response = await loginUser(loginData);
    console.log(response);

    if (response.success) {
      setSuccess(response.data.message); // Successfully logged in
      setError('');
      console.log(response.data.data);
      Cookies.set('authToken', response.data.data.token, { expires: 7, secure: false, sameSite: 'Strict' });
    } else {
      setError(response.error); // Display error message
      setSuccess('');
    }
  };

  return {
    userName,
    setUserName,
    password,
    setPassword,
    error,
    success,
    handleLogin,
  };
};

export default useLogin;
