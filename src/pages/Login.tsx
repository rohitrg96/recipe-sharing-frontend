import React from 'react';
import InputField from '../components/InputField/AuthInputField';
import AuthButton from '../components/AuthButton';
import useLogin from '../hooks/useLogin';

const Login: React.FC = () => {
  // Destructure the hook to get the necessary variables and functions
  const {
    userName,
    setUserName,
    password,
    setPassword,
    error,
    success,
    handleLogin,
    handleSignupRedirect,
    handleHomeRedirect,
  } = useLogin();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
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
          <h2 className="fw-bold" style={{ marginBottom: '2rem' }}>
            Welcome Back! 👋
          </h2>
          {/* <h1 className="fw-bold" style={{ marginBottom: '2rem' }}>
            🍴 Tasty Tales
          </h1> */}
          {/* Success/Error Messages */}
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}
          {/* Username Input */}
          <InputField
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
          Don't have an account?{''}
          <button
            onClick={handleSignupRedirect}
            style={{ color: 'black', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            Click here to sign up!.
          </button>
          <button
            onClick={handleHomeRedirect}
            style={{ color: 'black', background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            Not logging in? Head back to the home page!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
