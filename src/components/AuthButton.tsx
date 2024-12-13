import React from 'react';

interface AuthButtonProps {
  text: string;
  onClick: (e: React.FormEvent) => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({ text, onClick }) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <button
        type="submit"
        onClick={onClick}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#007BFF',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        {text}
      </button>
    </div>
  );
};

export default AuthButton;
