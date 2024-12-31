import React from 'react';

interface CommentInputProps {
  label: string;
  comment: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  label,
  comment,
  onChange,
  onSubmit,
}) => {
  return (
    <div>
      <label htmlFor="commentInput" className="form-label fw-bold ">
        {label}
      </label>
      <textarea
        id="commentInput"
        name="comment"
        className="form-control mb-3"
        rows={3}
        value={comment}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
      <button
        className="btn btn-primary "
        data-testid="add-comment"
        onClick={onSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default CommentInput;
