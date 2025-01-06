import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Wrapping component in BrowserRouter for navigation
import RecipeCard from './Card';
import Cookies from 'js-cookie';
import '@testing-library/jest-dom';

jest.mock('js-cookie', () => ({
  get: jest.fn(),
  set: jest.fn(),
  remove: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn(); // Define the mock function

// Provide the mock implementation before tests
require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);

describe('RecipeCard Component', () => {
  const recipe = {
    _id: '1',
    title: 'Delicious Recipe',
    image: 'recipe-image.jpg',
    starsCount: 10,
    averageStars: 4.5,
  };

  beforeEach(() => {
    // Reset the mock functions before each test
    jest.clearAllMocks(); // Reset all mocks globally
  });

  it('should render the recipe card correctly', () => {
    render(<RecipeCard recipe={recipe} />);

    // Check if the recipe title and stars are displayed
    expect(screen.getByText('Delicious Recipe')).toBeInTheDocument();
    expect(screen.getByText(/10 Reviews \/ 4.5 Average/)).toBeInTheDocument();
  });

  it('should show the modal when the user is not logged in (no authToken)', () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined); // Simulate no authToken

    render(
      <BrowserRouter>
        <RecipeCard recipe={recipe} />
      </BrowserRouter>,
    );

    // Check if the modal shows up
    expect(screen.getByText(/Login Required/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /You need to log in first to view the details of this recipe./,
      ),
    ).toBeInTheDocument();
  });

  it('should navigate to recipe details when user is logged in', () => {
    (Cookies.get as jest.Mock).mockReturnValue('fakeAuthToken'); // Simulate user is logged in

    render(
      <BrowserRouter>
        <RecipeCard recipe={recipe} />
      </BrowserRouter>,
    );

    // Click on the card to trigger navigation
    //   fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByRole('heading', { name: /Delicious Recipe/i }));

    // Check if the navigate function is called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/recipe/1');
  });

  it('should show "No Image Available" if the recipe has no image', () => {
    const noImageRecipe = { ...recipe, image: null };

    render(
      <BrowserRouter>
        <RecipeCard recipe={noImageRecipe} />
      </BrowserRouter>,
    );

    // Check if the fallback text is displayed when no image is provided
    expect(screen.getByText('No Image Available')).toBeInTheDocument();
  });

  // it('should close the modal when clicking close button', async () => {
  //   (Cookies.get as jest.Mock).mockReturnValue(undefined); // Simulate no authToken

  //   render(
  //     <BrowserRouter>
  //       <RecipeCard recipe={recipe} />
  //     </BrowserRouter>,
  //   );

  //   // Open the modal by clicking the card
  //   fireEvent.click(screen.getByRole('heading', { name: /Delicious Recipe/i }));

  //   // Check that the modal is initially shown
  //   expect(screen.getByText('Login Required')).toBeInTheDocument();

  //   // Test closing via the `btn-close` button (X button)
  //   const closeButton = screen.getAllByRole('button', { name: 'Close' })[0]; // Header close button
  //   fireEvent.click(closeButton);

  //   // Wait for the modal to disappear
  //   await waitFor(() => {
  //     expect(screen.queryByText('Login Required')).not.toBeInTheDocument();
  //   });

  //   // Re-open the modal for testing the footer button
  //   fireEvent.click(screen.getByRole('heading', { name: /Delicious Recipe/i }));
  //   expect(screen.getByText('Login Required')).toBeInTheDocument();

  //   // Test closing via the footer "Close" button
  //   const footerCloseButton = screen.getAllByRole('button', {
  //     name: 'Close',
  //   })[1]; // Footer close button
  //   fireEvent.click(footerCloseButton);

  //   // Wait for the modal to disappear again
  //   await waitFor(() => {
  //     expect(screen.queryByText('Login Required')).not.toBeInTheDocument();
  //   });
  // });

  it('should navigate to login page when "Login" button is clicked in the modal', () => {
    (Cookies.get as jest.Mock).mockReturnValue(undefined); // Simulate no authToken

    render(
      <BrowserRouter>
        <RecipeCard recipe={recipe} />
      </BrowserRouter>,
    );

    // Open the modal by clicking the card
    fireEvent.click(screen.getByRole('heading', { name: /Delicious Recipe/i }));

    // Click the "Login" button in the modal
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // Check if navigate was called with the login path
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
