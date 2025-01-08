import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Provider } from 'react-redux';
import store from '../../../redux/store'; // Import store directly
import api from '../../../api/axiosInstance'; // Import the api instance

jest.mock('../../../api/axiosInstance', () => ({
  post: jest.fn(), // Mocking the post method
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper to render with Redux Provider
  const renderWithRedux = (ui: JSX.Element) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it('renders Navbar correctly', () => {
    renderWithRedux(
      <MemoryRouter>
        <Provider store={store}>
          <Navbar />
        </Provider>
      </MemoryRouter>,
    );

    // Check brand logo
    expect(screen.getByText('Tasty Tales')).toBeInTheDocument();

    // Check Login button for unauthenticated users
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
  });

  it('renders "Log In" button when no authToken is present', () => {
    Cookies.get = jest.fn().mockReturnValue(undefined);

    renderWithRedux(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Ensure "Log In" button is displayed
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
    // Ensure "My Account" dropdown is not displayed
    expect(screen.queryByText(/my account/i)).not.toBeInTheDocument();
  });

  it('renders dropdown menu when authToken is present', () => {
    Cookies.get = jest.fn().mockReturnValue('fakeAuthToken');

    renderWithRedux(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Ensure "My Account" button is displayed
    expect(screen.getByText(/my account/i)).toBeInTheDocument();
    // Ensure "Log In" button is not displayed
    expect(screen.queryByText(/log in/i)).not.toBeInTheDocument();
  });

  it('toggles dropdown menu visibility on button click', () => {
    Cookies.get = jest.fn().mockReturnValue('fakeAuthToken');

    renderWithRedux(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const accountButton = screen.getByText(/my account/i);
    fireEvent.click(accountButton);

    // Ensure dropdown menu becomes visible
    expect(screen.getByText(/add recipe/i)).toBeInTheDocument();

    fireEvent.click(accountButton);

    // Ensure dropdown menu is hidden again
    expect(screen.queryByText(/add recipe/i)).not.toBeInTheDocument();
  });

  it('handles logout correctly', async () => {
    // Mock the get and remove methods of Cookies
    Cookies.get = jest.fn().mockReturnValue('fakeAuthToken');
    Cookies.remove = jest.fn(); // Ensure remove is mocked

    // Use the mocked `post` method of axios
    (api.post as jest.Mock).mockResolvedValueOnce({});

    renderWithRedux(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const accountButton = screen.getByText(/my account/i);
    fireEvent.click(accountButton);

    const logoutButton = screen.getByText(/Log Out/i);
    fireEvent.click(logoutButton);

    // Assert API call
    expect(api.post).toHaveBeenCalledWith('/auth/logout', null, {
      headers: { Authorization: 'Bearer fakeAuthToken' },
    });

    // // Ensure the authToken cookie is removed
    // expect(Cookies.remove).toHaveBeenCalledWith('authToken');

    // // Ensure the token is not available after removal
    // expect(Cookies.get('authToken')).toBeUndefined();

    // // Ensure navigation to login page
    // expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});
