import React, { useState } from 'react';
import './PasswordInput.css';

interface PasswordInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  required?: boolean;
  style?: React.CSSProperties;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder = 'Enter your password',
  value,
  onChange,
  name,
  required = false,
  style,
}) => {
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number.';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return null; // Valid password
  };

  const handleBlur = () => {
    const validationError = validatePassword(value);
    setError(validationError);
  };

  return (
    <div className="password-input-container" style={style}>
      <input
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e);
          setError(validatePassword(e.target.value)); // Validate on input change
        }}
        onBlur={handleBlur} // Validate on blur
        name={name}
        className={`password-input ${error ? 'password-input-error' : ''}`}
        required={required}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default PasswordInput;
