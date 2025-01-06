import React from 'react';
import InputField from '../../components/InputField/AuthInputFeild/AuthInputField';
import AuthButton from '../../components/AuthButton/AuthButton';
import useLogin from '../../hooks/useLogin';
import './Login.css';

const Login: React.FC = () => {
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
    <div className="login-container">
      <div className="login-form-wrapper">
        <form onSubmit={handleLogin} className="login-form">
          <h2 className="login-title">Welcome Back! 👋</h2>
          {error && (
            <p className="login-message login-message--error">{error}</p>
          )}
          {success && (
            <p className="login-message login-message--success">{success}</p>
          )}
          <InputField
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            name="username"
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            name="password"
          />
          <AuthButton text="Sign In" onClick={handleLogin} />

          <button
            className="login-button-link"
            data-testid="signup-link"
            onClick={handleSignupRedirect}
          >
            Don't have an account? Click here to sign up!
          </button>

          <button className="login-button-link" onClick={handleHomeRedirect}>
            Not logging in? Head back to the home page!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
