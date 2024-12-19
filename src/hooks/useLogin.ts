import { useState } from 'react';
import { loginUser } from '../services/authService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = { userName, password };
    const response = await loginUser(loginData);

    if (response.success) {
      setSuccess(response.data.message); // Successfully logged in
      setError('');
      const token = response.data.data.token;
      const expiryTime = getTokenExpiry(token);
      Cookies.set('authToken', token, { expires: new Date(expiryTime), secure: false, sameSite: 'Strict' });
      navigate('/'); // Redirect to home page after login
    } else {
      setError(response.error);
      setSuccess('');
    }
  };

  function getTokenExpiry(token: string) {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode the JWT
    return decoded.exp * 1000; // Convert expiry from seconds to milliseconds
  }

  const handleSignupRedirect = () => {
    navigate('/signup');
  };
  const handleHomeRedirect = () => {
    navigate('/');
  };

  return {
    userName,
    setUserName,
    password,
    setPassword,
    error,
    success,
    handleLogin,
    handleSignupRedirect,
    handleHomeRedirect,
  };
};

export default useLogin;
