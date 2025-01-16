import React from 'react';
import './InputField.css';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Add onBlur prop
  required?: boolean;
  name: string;
  style?: React.CSSProperties;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  onBlur, // Add onBlur to the destructured props
  required,
  name,
}) => {
  return (
    <div className="input-container">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Attach onBlur handler
        name={name}
        className="input-field"
        required={required}
      />
    </div>
  );
};

export default InputField;
