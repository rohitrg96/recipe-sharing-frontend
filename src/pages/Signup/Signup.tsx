import React from 'react';
import './Signup.css';
import InputField from '../../components/InputField/AuthInputFeild/AuthInputField';
import AuthButton from '../../components/AuthButton/AuthButton';
import PasswordInput from '../../components/InputField/AuthInputFeild/passwordInputFeild/PasswordInput';
import useSignUp from '../../hooks/useSignUp';

const SignUp: React.FC = () => {
  const { formik, handleLoginRedirect, handleHomeRedirect } = useSignUp();

  return (
    <div className="signup-container">
      <div className="signup-content">
        <form onSubmit={formik.handleSubmit} className="signup-form">
          {/* Title */}
          <h4 className="signup-title">Welcome to the Recipe World! 🍳</h4>

          {/* Firstname and Lastname */}
          <div className="signup-name-fields">
            <InputField
              type="text"
              placeholder="First Name"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />

            <InputField
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
          </div>

          <div className="signup-errors"></div>

          {/* Email Input */}
          <InputField
            type="email"
            placeholder="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />

          {/* Password Input */}
          <PasswordInput
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter your password"
            required
          />

          {/* Display all errors in a compact format */}
          <div className="signup-errors mb-2">
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="signup-error">{formik.errors.firstName}</p>
            )}
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="signup-error">{formik.errors.lastName}</p>
            )}
            {formik.touched.email && formik.errors.email && (
              <p className="signup-error">{formik.errors.email}</p>
            )}
            {formik.touched.password && formik.errors.password && (
              <p className="signup-error">{formik.errors.password}</p>
            )}
          </div>

          {/* Display status messages */}
          {formik.status?.error && (
            <p className="signup-error">{formik.status.error}</p>
          )}
          {formik.status?.success && (
            <p className="signup-success">{formik.status.success}</p>
          )}

          {/* Sign Up Button */}
          <AuthButton
            text={formik.isSubmitting ? 'Signing Up...' : 'Sign Up'}
            type="submit"
            disabled={formik.isSubmitting}
          />

          {/* Sign In and Home Links */}
          <p className="signup-links">
            <button
              onClick={handleLoginRedirect}
              className="signup-link-button"
              type="button"
            >
              Already have an account? Click here to login!
            </button>
            <button
              onClick={handleHomeRedirect}
              className="signup-link-button"
              type="button"
            >
              Not signing up? Explore more on the home page!
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
