import React from 'react';

interface RecipeInputFieldProps {
  label: string;
  id: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // Optional onBlur prop
  required?: boolean;
  error?: string | boolean; // Add error prop to display validation errors
  name: string; // Add name prop
}

const RecipeInputField: React.FC<RecipeInputFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  onBlur,
  required,
  error, // Destructure error
  name, // Destructure name
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name} // Ensure the name is added
        className="form-control"
        value={value}
        onChange={onChange}
        onBlur={onBlur} // Attach onBlur handler
        required={required}
      />
      {/* Display error message if it exists */}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default RecipeInputField;
