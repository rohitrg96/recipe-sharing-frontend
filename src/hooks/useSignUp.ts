import { useState } from 'react';
import { signUpUser } from '../services/authservice';

const useSignUp = () => {
  // State variables for form inputs and messages
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle the form submission and API call
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestBody = {
      firstName: firstname,
      lastName: lastname,
      email,
      password,
    };

    // Make the API call via the signUpUser function
    const response = await signUpUser(requestBody);

    // If the response indicates success
    if (response.success) {
      setSuccess('User registered successfully!');
      setError(''); // Clear any previous error message
      console.log('API Response:', response.data);

      // Clear form fields after successful registration
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
    } else {
      // Handle the error based on the response error message
      setError(response.error || "We couldn't create your account. Double-check your information and try again.");
      setSuccess('');
    }
  };

  // Return state values and handlers to be used in the component
  return {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    handleSignUp,
  };
};

export default useSignUp;
