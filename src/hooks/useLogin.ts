import { loginUser } from '../services/authService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/authSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (
    values: { userName: string; password: string },
    setStatus: (status: { success?: string; error?: string }) => void,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true); // Set the form as "submitting"

    try {
      const response = await loginUser(values);

      if (response.success) {
        const token = response.data.data.token;
        const expiryTime = getTokenExpiry(token);

        // Set success message
        setStatus({ success: response.data.message });

        // Store token in cookies
        Cookies.set('authToken', token, {
          expires: new Date(expiryTime),
          secure: false,
          sameSite: 'Strict',
        });

        // Update Redux state
        dispatch(login());

        // Redirect to home
        navigate('/');
      } else {
        // Set error message
        setStatus({ error: response.error });
      }
    } catch (error: any) {
      // Handle unexpected errors
      setStatus({
        error: 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setSubmitting(false); // Stop the form from "submitting"
    }
  };

  const getTokenExpiry = (token: string) => {
    const decoded = JSON.parse(atob(token.split('.')[1]));
    return decoded.exp * 1000;
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .email('Invalid email address') // Ensures the input is a valid email format
        .required('Username is required'), // Keeps the required validation
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[A-Z]).*$/, // Regex to ensure at least one uppercase letter
          'Password must contain at least one uppercase letter',
        )
        .required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting, setStatus }) => {
      handleLogin(values, setStatus, setSubmitting);
    },
  });

  return {
    handleSignupRedirect,
    handleHomeRedirect,
    formik,
  };
};

export default useLogin;
