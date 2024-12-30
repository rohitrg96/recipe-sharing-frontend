import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

jest.mock('../../../api/axiosInstance', () => ({
  post: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

// const mockedApi = require('../../../api/axiosInstance').post;
const mockNavigate = jest.fn();
(useNavigate as jest.Mock).mockImplementation(() => mockNavigate);

describe('Navbar Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Navbar correctly', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    // Check brand logo
    expect(screen.getByText('Tasty Tales')).toBeInTheDocument();

    // Check Login button for unauthenticated users
    expect(screen.getByText(/log in/i)).toBeInTheDocument();
  });

  it('renders "Log In" button when no authToken is present', () => {
    Cookies.get = jest.fn().mockReturnValue(undefined);

    render(
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

    render(
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

    render(
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

  // it('handles logout correctly', async () => {
  //   // Mock the get and remove methods of Cookies
  //   Cookies.get = jest.fn().mockReturnValue('fakeAuthToken');
  //   Cookies.remove = jest.fn(); // Ensure remove is mocked

  //   mockedApi.mockResolvedValueOnce({});

  //   render(
  //     <MemoryRouter>
  //       <Navbar />
  //     </MemoryRouter>,
  //   );

  //   const accountButton = screen.getByText(/my account/i);
  //   fireEvent.click(accountButton);

  //   const logoutButton = screen.getByText(/log out/i);
  //   fireEvent.click(logoutButton);

  //   // Assert API call
  //   expect(mockedApi).toHaveBeenCalledWith('/auth/logout', null, {
  //     headers: { Authorization: 'Bearer fakeAuthToken' },
  //   });

  //   // Ensure the authToken cookie is removed
  //   expect(Cookies.remove).toHaveBeenCalledWith('authToken');

  //   // Ensure the token is not available after removal
  //   expect(Cookies.get('authToken')).toBeUndefined();

  //   // Ensure navigation to login page
  //   expect(mockNavigate).toHaveBeenCalledWith('/login');
  // });
});
