import { useState } from 'react';

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

    try {
      // Make API call to the backend for user registration
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      // Check if the response is OK
      if (response.ok) {
        const data = await response.json();
        setSuccess('User registered successfully!');
        setError('');
        console.log('API Response:', data);

        // Clear form fields after successful registration
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
      } else {
        setError("We couldn't create your account. Double-check your information and try again.");
        setSuccess('');
      }
    } catch (err) {
      setError('An error occurred while signing up.');
      setSuccess('');
      console.error('SignUp Error:', err);
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
