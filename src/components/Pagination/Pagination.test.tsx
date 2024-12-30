import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from './Pagination';

describe('Pagination Component', () => {
  it('renders the correct page numbers', () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />,
    );

    // Check that the correct page numbers are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onPageChange with the correct page number when clicking a page button', () => {
    const mockOnPageChange = jest.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const pageButton = screen.getByText('3');
    fireEvent.click(pageButton);

    // Ensure onPageChange is called with the correct page number
    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('calls onPageChange with the correct page number when clicking the "Next" button', () => {
    const mockOnPageChange = jest.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Ensure onPageChange is called with the correct page number
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with the correct page number when clicking the "Previous" button', () => {
    const mockOnPageChange = jest.fn();

    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    // Ensure onPageChange is called with the correct page number
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('does not call onPageChange when clicking a disabled "Previous" button', () => {
    const mockOnPageChange = jest.fn();

    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);

    // Ensure onPageChange is not called when the "Previous" button is disabled
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('does not call onPageChange when clicking a disabled "Next" button', () => {
    const mockOnPageChange = jest.fn();

    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);

    // Ensure onPageChange is not called when the "Next" button is disabled
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });
});
