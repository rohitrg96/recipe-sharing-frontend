import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentInput from './CommentInput';

describe('CommentInput Component', () => {
  const mockOnChange = jest.fn();
  const mockOnSubmit = jest.fn();

  const defaultProps = {
    label: 'Add a comment:',
    comment: '',
    onChange: mockOnChange,
    onSubmit: mockOnSubmit,
  };

  it('renders with default props', () => {
    render(<CommentInput {...defaultProps} />);

    const labelElement = screen.getByText('Add a comment:');
    const textareaElement = screen.getByRole('textbox');
    const buttonElement = screen.getByRole('button', { name: /submit/i });

    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toHaveAttribute('for', 'commentInput');
    expect(textareaElement).toBeInTheDocument();
    expect(textareaElement).toHaveValue('');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Submit');
  });

  it('calls onChange when typing in the textarea', () => {
    render(<CommentInput {...defaultProps} />);

    const textareaElement = screen.getByRole('textbox');

    fireEvent.change(textareaElement, { target: { value: 'Great post!' } });

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith('Great post!');
  });

  it('calls onSubmit when the button is clicked', () => {
    render(<CommentInput {...defaultProps} />);

    const buttonElement = screen.getByRole('button', { name: /submit/i });

    fireEvent.click(buttonElement);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it('displays the correct comment value', () => {
    const propsWithComment = {
      ...defaultProps,
      comment: 'Existing comment',
    };

    render(<CommentInput {...propsWithComment} />);

    const textareaElement = screen.getByRole('textbox');
    expect(textareaElement).toHaveValue('Existing comment');
  });
});
