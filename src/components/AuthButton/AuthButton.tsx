import React from 'react';
import './AuthButton.css'; // Import the CSS file

interface AuthButtonProps {
  text: string;
  onClick: (e: React.FormEvent) => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ text, onClick }) => {
  return (
    <div className="auth-button-container">
      <button
        type="submit"
        onClick={onClick}
        className="auth-button" // Use the CSS class here
      >
        {text}
      </button>
    </div>
  );
};

export default AuthButton;
