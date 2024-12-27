import { render, screen, fireEvent } from '@testing-library/react';
import AuthButton from './AuthButton';
import '@testing-library/jest-dom';

describe('AuthButton', () => {
  it('renders the button with the correct text', () => {
    render(<AuthButton text="Submit" onClick={() => {}} />);

    // Check if the button text is rendered correctly
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Submit');
  });

  it('calls the onClick handler when clicked', () => {
    const mockOnClick = jest.fn();
    render(<AuthButton text="Submit" onClick={mockOnClick} />);

    // Fire click event
    const button = screen.getByRole('button');
    fireEvent.click(button);

    // Ensure the mock function is called
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
