import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Footer Component', () => {
  it('should navigate to the correct page when clicking "About Us" link', () => {
    const mockNavigate = jest.fn();
    jest
      .mocked(require('react-router-dom').useNavigate)
      .mockReturnValue(mockNavigate);

    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );

    // Click the "About Us" button
    fireEvent.click(screen.getByText(/About Us/i));

    // Check if navigation was triggered
    expect(mockNavigate).toHaveBeenCalledWith('/about');
  });
});
