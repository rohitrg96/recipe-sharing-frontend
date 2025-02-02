import { useFormik } from 'formik';
import * as Yup from 'yup'; // For validation schema
import { signUpUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useSignUp = () => {
  const navigate = useNavigate();

  // Handle the form submission
  const handleSignUp = async (
    values: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    },
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    setSubmitting(true); // Disable the form while submitting

    try {
      const response = await signUpUser(values);

      if (response.success) {
        // Success toast
        toast.success('User registered successfully!');
        navigate('/login');
      } else {
        // Error toast for API errors
        toast.error(
          response.error || 'Unable to create an account. Please try again.',
        );
      }
    } catch (error) {
      // Error toast for unexpected errors
      toast.error('An unexpected error occurred. Please try again later.');
    } finally {
      setSubmitting(false); // Re-enable the form
    }
  };

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .matches(
          /^(?=.*[A-Z]).*$/, // Regex to ensure at least one uppercase letter
          'Password must contain at least one uppercase letter',
        )
        .required('Password is required'),
    }),
    onSubmit: (values, { setSubmitting }) => {
      handleSignUp(values, setSubmitting);
    },
  });

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return {
    formik,
    handleLoginRedirect,
    handleHomeRedirect,
  };
};

export default useSignUp;
