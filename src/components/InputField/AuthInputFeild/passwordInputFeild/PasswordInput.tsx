import React from 'react';
import './PasswordInput.css';

interface PasswordInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Add onBlur prop
  name: string;
  required?: boolean;
  style?: React.CSSProperties;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  placeholder = 'Enter your password',
  value,
  onChange,
  onBlur,
  name,
  required = false,
  style,
}) => {
  return (
    <div className="password-input-container" style={style}>
      <input
        type="password"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Validate on blur
        name={name}
        className="password-input"
        required={required}
      />
    </div>
  );
};

export default PasswordInput;
