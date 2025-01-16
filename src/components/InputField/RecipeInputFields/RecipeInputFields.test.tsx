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
        name="data"
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
        name="data"
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
        name="data"
      />,
    );

    const inputElement = screen.getByLabelText(
      'Recipe Name',
    ) as HTMLInputElement;

    // Ensure input is not required
    expect(inputElement).not.toBeRequired();
  });
});
