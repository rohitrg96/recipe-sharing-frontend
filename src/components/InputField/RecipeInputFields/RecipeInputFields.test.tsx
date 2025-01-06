import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecipeInputField from './RecipeInputFields';

describe('RecipeInputField Component', () => {
  it('renders with the correct label and input type', () => {
    const mockOnChange = jest.fn();

    render(
      <RecipeInputField
        label="Recipe Name"
        id="recipeName"
        type="text"
        value=""
        onChange={mockOnChange}
      />,
    );

    // Check that the label is rendered
    expect(screen.getByLabelText('Recipe Name')).toBeInTheDocument();

    // Check that the input type is "text"
    expect(screen.getByLabelText('Recipe Name')).toHaveAttribute(
      'type',
      'text',
    );
  });

  it('calls onChange with the correct value for text input', () => {
    const mockOnChange = jest.fn();

    render(
      <RecipeInputField
        label="Recipe Name"
        id="recipeName"
        type="text"
        value=""
        onChange={mockOnChange}
      />,
    );

    const inputElement = screen.getByLabelText(
      'Recipe Name',
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'Delicious Recipe' } });

    // Ensure onChange is called with the correct value
    expect(mockOnChange).toHaveBeenCalledWith('Delicious Recipe');
  });

  it('calls onChange with the correct value for number input', () => {
    const mockOnChange = jest.fn();

    render(
      <RecipeInputField
        label="Recipe Quantity"
        id="recipeQuantity"
        type="number"
        value={0}
        onChange={mockOnChange}
      />,
    );

    const inputElement = screen.getByLabelText(
      'Recipe Quantity',
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: '10' } });

    // Ensure onChange is called with the correct numeric value
    expect(mockOnChange).toHaveBeenCalledWith(10);
  });

  it('passes the required attribute when specified', () => {
    const mockOnChange = jest.fn();

    render(
      <RecipeInputField
        label="Recipe Name"
        id="recipeName"
        type="text"
        value=""
        onChange={mockOnChange}
        required
      />,
    );

    const inputElement = screen.getByLabelText(
      'Recipe Name',
    ) as HTMLInputElement;

    // Ensure input is required
    expect(inputElement).toBeRequired();
  });

  it('does not mark input as required when required is not passed', () => {
    const mockOnChange = jest.fn();

    render(
      <RecipeInputField
        label="Recipe Name"
        id="recipeName"
        type="text"
        value=""
        onChange={mockOnChange}
      />,
    );

    const inputElement = screen.getByLabelText(
      'Recipe Name',
    ) as HTMLInputElement;

    // Ensure input is not required
    expect(inputElement).not.toBeRequired();
  });
});
