import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  const navigate = useNavigate();
  const authToken = Cookies.get('authToken');
  const handleLogout = async () => {
    await axios.post('http://localhost:5000/api/auth/logout', null, {
      headers: {
        Authorization: `Bearer ${Cookies.get('authToken')}`,
      },
    });
    console.log(authToken);
    Cookies.remove('authToken'); // Remove the authToken cookie
    logout();
    navigate('/login'); // Redirect to login page
  };
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Brand Logo */}
        <Link className="navbar-brand gradient-bg display-3 fs-2 fw-bold" to="/">
          Tasty Tales
        </Link>

        {/* Right Side Link */}
        <div className="d-flex">
          {authToken ? (
            <div className="dropdown">
              <button
                className="btn btn-outline-success dropdown-toggle"
                type="button"
                id="accountDropdown"
                onClick={() => setShowDropdown((prev) => !prev)}
                aria-expanded={showDropdown}
              >
                <FaUser className="me-2" /> My Account
              </button>
              {showDropdown && (
                <ul className="dropdown-menu show" aria-labelledby="accountDropdown">
                  <li>
                    <Link className="dropdown-item" to="/add-recipe">
                      Add Recipe
                    </Link>
                  </li>
                  {/* <li>
                    <Link className="dropdown-item" to="/my-recipes">
                      My Recipes
                    </Link>
                  </li> */}
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Log Out
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-outline-success d-flex align-items-center">
              <FaSignInAlt className="me-2" /> Log In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
