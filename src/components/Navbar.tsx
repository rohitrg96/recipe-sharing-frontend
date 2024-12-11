// src/components/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Use React Router for navigation
import { FaSignInAlt } from 'react-icons/fa';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link
          className="navbar-brand gradient-bg display-3 fs-2 fw-bold"
          to="/signup"
        >
          Tasty Tales
        </Link>

        {/* Right Side Link */}
        <div className="d-flex">
          <Link
            to="/login"
            className="btn btn-outline-success d-flex align-items-center"
          >
            <FaSignInAlt className="me-2" /> Log In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
