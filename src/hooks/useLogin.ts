import { useState } from 'react';
import { loginUser } from '../services/authService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  // State for form inputs
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
    // console.log(response);

    if (response.success) {
      setSuccess(response.data.message); // Successfully logged in
      setError('');
      navigate('/');

      function getTokenExpiry(token: string) {
        const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
        console.log(decoded, 'decoded');
        return decoded.exp * 1000; // Convert expiry from seconds to milliseconds
      }
      const token: string = response.data.data.token;
      const expiryTime = getTokenExpiry(token);
      console.log(new Date(expiryTime));
      Cookies.set('authToken', token, { expires: new Date(expiryTime), secure: false, sameSite: 'Strict' });
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
