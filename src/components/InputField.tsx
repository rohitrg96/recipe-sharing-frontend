import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  name: string;
  style?: React.CSSProperties;
}

const InputField: React.FC<InputFieldProps> = ({ type, placeholder, value, onChange, required, name }) => {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        style={{
          width: '100%',
          padding: '0.75rem',
          fontSize: '1rem',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
        required={required}
      />
    </div>
  );
};

export default InputField;
