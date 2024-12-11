import React, { useState } from 'react';
import InputField from '../components/InputField';
import AuthButton from '../components/AuthButton';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging in with:', { username, password });
    // Add your login logic here
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Section: Image */}
      <div
        style={{
          flex: 1,
          backgroundImage: 'url(../public/images/Tofu-Burgers-1-2-400x400.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Right Section: Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <form onSubmit={handleLogin} style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          {/* Title */}
          <h2 style={{ marginBottom: '2rem' }}>Tasty Tales</h2>

          {/* Username Input */}
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            name="username"
          />

          {/* Password Input */}
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            name="password"
          />

          {/* Sign In Button */}
          <AuthButton text="Sign In" onClick={handleLogin} />

          {/* Sign Up Link */}
          <p>
            Don’t have an account?{' '}
            <a href="/signup" style={{ color: '#007BFF', textDecoration: 'none' }}>
              Click here to sign up.
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
