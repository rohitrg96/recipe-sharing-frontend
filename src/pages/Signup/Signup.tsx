import React from 'react';
import './Signup.css';
import InputField from '../../components/InputField/AuthInputFeild/AuthInputField';
import AuthButton from '../../components/AuthButton/AuthButton';
import useSignUp from '../../hooks/useSignUp';

const SignUp: React.FC = () => {
  const {
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
    handleLoginRedirect,
    handleHomeRedirect,
  } = useSignUp();

  return (
    <div className="signup-container">
      <div className="signup-content">
        <form onSubmit={handleSignUp} className="signup-form">
          {/* Title */}
          <h4 className="signup-title">Welcome to the Recipe World! 🍳</h4>

          {/* Error/Success Messages */}
          {error && <p className="signup-error">{error}</p>}
          {success && <p className="signup-success">{success}</p>}

          {/* Firstname and Lastname */}
          <div className="signup-name-fields">
            <InputField
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              name="firstname"
            />
            <InputField
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              name="lastname"
            />
          </div>

          {/* Email Input */}
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
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

          {/* Sign Up Button */}
          <AuthButton text="Sign Up" onClick={handleSignUp} />

          {/* Sign In Link */}
          <p className="signup-links">
            <button
              onClick={handleLoginRedirect}
              className="signup-link-button"
            >
              Already have an account? Click here to login!
            </button>
            <button onClick={handleHomeRedirect} className="signup-link-button">
              Not signing up? Explore more on the home page!
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
