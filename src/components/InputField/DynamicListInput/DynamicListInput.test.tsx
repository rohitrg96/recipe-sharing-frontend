import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DynamicList from './DynamicListInput';

describe('DynamicList Component', () => {
  const mockOnAdd = jest.fn();
  const mockOnChange = jest.fn();
  const mockOnRemove = jest.fn();
  const mockOnBlur = jest.fn();

  const defaultProps = {
    label: 'Dynamic List',
    items: ['Item 1', 'Item 2'],
    onAdd: mockOnAdd,
    onChange: mockOnChange,
    onRemove: mockOnRemove,
    onBlur: mockOnBlur,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with initial props', () => {
    render(<DynamicList {...defaultProps} />);

    const labelElement = screen.getByText('Dynamic List');
    expect(labelElement).toBeInTheDocument();

    const inputElements = screen.getAllByRole('textbox');
    expect(inputElements).toHaveLength(defaultProps.items.length);
    expect(inputElements[0]).toHaveValue('Item 1');
    expect(inputElements[1]).toHaveValue('Item 2');

    const addButton = screen.getByRole('button', { name: /add/i });
    expect(addButton).toBeInTheDocument();

    const removeButtons = screen.getAllByRole('button', {
      name: /remove dynamic list/i,
    });
    expect(removeButtons).toHaveLength(defaultProps.items.length);
  });

  it('calls onAdd when the "Add" button is clicked', () => {
    render(<DynamicList {...defaultProps} />);

    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);

    expect(mockOnAdd).toHaveBeenCalled();
  });

  it('calls onChange when an input value is changed', () => {
    render(<DynamicList {...defaultProps} />);

    const inputElements = screen.getAllByRole('textbox');
    fireEvent.change(inputElements[0], { target: { value: 'Updated Item 1' } });

    expect(mockOnChange).toHaveBeenCalledWith(0, 'Updated Item 1');
  });

  it('calls onRemove when the "Remove" button is clicked', () => {
    render(<DynamicList {...defaultProps} />);

    const removeButtons = screen.getAllByRole('button', {
      name: /remove dynamic list/i,
    });
    fireEvent.click(removeButtons[0]);

    expect(mockOnRemove).toHaveBeenCalledWith(0);
  });

  it('renders the "Add" button only for the last item', () => {
    render(<DynamicList {...defaultProps} />);

    const addButtons = screen.getAllByRole('button', { name: /add/i });
    expect(addButtons).toHaveLength(1);
  });

  it('renders "Remove" buttons for all items when more than one item exists', () => {
    render(<DynamicList {...defaultProps} />);

    const removeButtons = screen.getAllByRole('button', {
      name: /remove dynamic list/i,
    });
    expect(removeButtons).toHaveLength(defaultProps.items.length);
  });

  it('does not render "Remove" button for a single item in the list', () => {
    const singleItemProps = {
      ...defaultProps,
      items: ['Item 1'],
    };

    render(<DynamicList {...singleItemProps} />);

    const removeButtons = screen.queryByRole('button', {
      name: /remove dynamic list/i,
    });
    expect(removeButtons).not.toBeInTheDocument();
  });
});
