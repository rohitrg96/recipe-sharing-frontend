import { useState } from 'react';
import { loginUser } from '../services/authService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/authSlice';

const useLogin = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = { userName, password };
    const response = await loginUser(loginData);

    if (response.success) {
      setSuccess(response.data.message);
      setError('');
      const token = response.data.data.token;
      const expiryTime = getTokenExpiry(token);
      Cookies.set('authToken', token, {
        expires: new Date(expiryTime),
        secure: false,
        sameSite: 'Strict',
      });

      // Update Redux state
      dispatch(login());
      navigate('/');
    } else {
      setError(response.error);
      setSuccess('');
    }
  };

  function getTokenExpiry(token: string) {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp * 1000;
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
