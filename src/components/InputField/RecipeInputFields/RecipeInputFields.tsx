import React from 'react';

interface RecipeInputFieldProps {
  label: string;
  id: string;
  type: 'text' | 'number';
  value: string | number;
  onChange: (value: string | number) => void;
  required?: boolean;
}

const RecipeInputField: React.FC<RecipeInputFieldProps> = ({
  label,
  id,
  type,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-bold">
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="form-control"
        value={value}
        onChange={(e) =>
          onChange(type === 'number' ? +e.target.value : e.target.value)
        }
        required={required}
      />
    </div>
  );
};

export default RecipeInputField;
