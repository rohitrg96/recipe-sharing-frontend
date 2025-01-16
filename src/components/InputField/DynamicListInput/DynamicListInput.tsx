import React from 'react';

interface DynamicListProps {
  label: string;
  items: string[];
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | boolean | string[];
}

const DynamicList: React.FC<DynamicListProps> = ({
  label,
  items,
  onAdd,
  onChange,
  onRemove,
  onBlur,
  error,
}) => {
  return (
    <div className="mb-3">
      <label className="form-label fw-bold">{label}</label>
      {items.map((item, index) => (
        <div key={index} className="d-flex mb-2">
          <input
            type="text"
            className="form-control me-2"
            value={item}
            onChange={(e) => onChange(index, e.target.value)}
            onBlur={onBlur}
            name={
              label === 'Ingredients'
                ? `ingredients[${index}]`
                : `steps[${index}]`
            } // Conditional name
            required
          />
          {index === items.length - 1 && (
            <button type="button" className="btn btn-primary" onClick={onAdd}>
              Add
            </button>
          )}
          {items.length > 1 && (
            <button
              type="button"
              className="btn-close ms-2"
              onClick={() => onRemove(index)}
              aria-label={`Remove ${label}`}
            />
          )}
        </div>
      ))}
      {/* Show error message if there's one */}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
};

export default DynamicList;
