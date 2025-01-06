import { useNavigate } from 'react-router-dom';
import React from 'react';
import './NotFound.css';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const handleHomePageRedirect = () => {
    navigate('/');
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 text-danger fw-bold">404</h1>
        <p className="lead text-muted mb-4">
          Oops! The page you're looking for can't be found.
        </p>

        <a
          className="btn btn-danger btn-lg mt-3"
          onClick={handleHomePageRedirect}
        >
          Go Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
