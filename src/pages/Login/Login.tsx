import React from 'react';
import InputField from '../../components/InputField/AuthInputFeild/AuthInputField';
import AuthButton from '../../components/AuthButton/AuthButton';
import './Login.css';
import useLogin from '../../hooks/useLogin';

const Login: React.FC = () => {
  const { handleSignupRedirect, handleHomeRedirect, formik } = useLogin();

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form onSubmit={formik.handleSubmit} className="login-form">
          <h2 className="login-title">Welcome Back! 👋</h2>

          {/* Error and Success Messages */}
          {formik.status?.error && (
            <p className="login-message login-message--error">
              {formik.status.error}
            </p>
          )}
          {formik.status?.success && (
            <p className="login-message login-message--success">
              {formik.status.success}
            </p>
          )}

          {/* Username Input */}
          <InputField
            type="text"
            placeholder="Username"
            name="userName"
            value={formik.values.userName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />

          {/* Password Input */}
          <InputField
            type="password"
            placeholder="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <div className="signup-errors mb-2">
            {formik.touched.userName && formik.errors.userName && (
              <p className="signup-error">{formik.errors.userName}</p>
            )}
            {formik.touched.password && formik.errors.password && (
              <p className="signup-error">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <AuthButton
            text={formik.isSubmitting ? 'Signing In...' : 'Sign In'}
            type="submit"
            disabled={formik.isSubmitting}
          />

          {/* Links */}
          <button
            className="login-button-link"
            data-testid="signup-link"
            type="button"
            onClick={handleSignupRedirect}
          >
            Don't have an account? Click here to sign up!
          </button>

          <button
            className="login-button-link"
            type="button"
            onClick={handleHomeRedirect}
          >
            Not logging in? Head back to the home page!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
