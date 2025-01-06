import { render, screen, fireEvent } from '@testing-library/react';
import HeaderSection from './Header';
import '@testing-library/jest-dom';

describe('HeaderSection', () => {
  const mockOnSearch = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
    mockOnFilterChange.mockClear();
  });

  it('renders all elements correctly', () => {
    render(
      <HeaderSection
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
      />,
    );

    // Verify title and description
    expect(screen.getByText('Recipes')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Explore thousands of mouthwatering recipes from every corner of the globe! 🍲',
      ),
    ).toBeInTheDocument();

    // Verify search bar
    expect(
      screen.getByPlaceholderText('Your Ingredients, Our Recipe Ideas'),
    ).toBeInTheDocument();

    // Verify filter labels and inputs
    expect(screen.getByLabelText('Min Rating')).toBeInTheDocument();
    expect(screen.getByLabelText('Max Prep Time (mins)')).toBeInTheDocument();
  });

  it('handles search input changes', () => {
    render(
      <HeaderSection
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const searchInput = screen.getByPlaceholderText(
      'Your Ingredients, Our Recipe Ideas',
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'chicken' } });

    // Verify input value and callback
    expect(searchInput.value).toBe('chicken');
    expect(mockOnSearch).toHaveBeenCalledWith('chicken');
  });

  it('handles min rating filter changes', () => {
    render(
      <HeaderSection
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const minRatingInput = screen.getByLabelText(
      'Min Rating',
    ) as HTMLInputElement;

    fireEvent.change(minRatingInput, { target: { value: '3' } });

    // Verify input value and callback
    expect(minRatingInput.value).toBe('3');
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      minRating: '3',
      maxPreparationTime: '',
    });
  });

  it('handles max preparation time filter changes', () => {
    render(
      <HeaderSection
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const maxPrepTimeInput = screen.getByLabelText(
      'Max Prep Time (mins)',
    ) as HTMLInputElement;

    fireEvent.change(maxPrepTimeInput, { target: { value: '20' } });

    // Verify input value and callback
    expect(maxPrepTimeInput.value).toBe('20');
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      minRating: '',
      maxPreparationTime: '20',
    });
  });

  it('calls onFilterChange with both filters', () => {
    render(
      <HeaderSection
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
      />,
    );

    const minRatingInput = screen.getByLabelText(
      'Min Rating',
    ) as HTMLInputElement;
    const maxPrepTimeInput = screen.getByLabelText(
      'Max Prep Time (mins)',
    ) as HTMLInputElement;

    fireEvent.change(minRatingInput, { target: { value: '4' } });
    fireEvent.change(maxPrepTimeInput, { target: { value: '30' } });

    // Verify onFilterChange is called with both values
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      minRating: '4',
      maxPreparationTime: '30',
    });
  });
});
