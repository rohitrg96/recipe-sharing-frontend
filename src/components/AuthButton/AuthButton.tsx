import React from 'react';
import './AuthButton.css'; // Import the CSS file

interface AuthButtonProps {
  text: string;
  onClick?: (e: React.FormEvent) => void; // Made optional, as `onClick` might not always be used
  type?: 'button' | 'submit' | 'reset'; // Add `type` with appropriate HTML button types
  disabled?: boolean; // Add `disabled` prop for button states
}

const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  return (
    <div className="auth-button-container">
      <button
        type={type} // Use the provided button type
        onClick={onClick} // Attach the onClick handler if provided
        className="auth-button" // Use the CSS class here
        disabled={disabled} // Add the disabled attribute
      >
        {text}
      </button>
    </div>
  );
};

export default AuthButton;
