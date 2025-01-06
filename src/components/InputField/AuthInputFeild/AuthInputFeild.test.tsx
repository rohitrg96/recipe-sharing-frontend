import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './AuthInputField';
import '@testing-library/jest-dom';
import React from 'react';

describe('InputField Component', () => {
  const mockOnChange = jest.fn();

  const defaultProps = {
    type: 'text',
    placeholder: 'Enter text',
    value: '',
    onChange: mockOnChange,
    required: true,
    name: 'testInput',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders and behaves correctly based on props', () => {
    const TestWrapper = () => {
      const [value, setValue] = React.useState('');

      return (
        <InputField
          {...defaultProps}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            mockOnChange(e);
          }}
        />
      );
    };

    render(<TestWrapper />);

    const inputElement = screen.getByPlaceholderText('Enter text');

    // Check placeholder
    expect(inputElement).toBeInTheDocument();

    // Check type
    expect(inputElement).toHaveAttribute('type', 'text');

    // Check name
    expect(inputElement).toHaveAttribute('name', 'testInput');

    // Check default value
    expect(inputElement).toHaveValue('');

    // Simulate change event
    fireEvent.change(inputElement, { target: { value: 'Hello' } });

    // Assert that the input value is updated
    expect(inputElement).toHaveValue('Hello');

    // Assert that the mock function was called
    expect(mockOnChange).toHaveBeenCalled();

    // Assert that the mock function was called with the correct value
    expect(mockOnChange.mock.calls[0][0].target.value).toBe('Hello');
  });

  it('renders without required attribute when not specified', () => {
    render(<InputField {...defaultProps} required={false} />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).not.toBeRequired();
  });
});
