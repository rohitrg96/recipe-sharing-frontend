import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Replace with your Navbar component import

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/');
  };

  return (
    <div className="d-flex flex-column bg-light text-dark vh-100">
      <Navbar />

      <div className="container my-auto mb-5 mt-5">
        <div className="row align-items-center">
          <h1
            className="display-4 fw-bold mb-4 text-center"
            style={{
              color: '#007bff',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            Welcome to Tasty Tales
          </h1>
          <p
            className="lead text-center"
            style={{
              fontSize: '1.25rem',
              color: '#333',
            }}
          >
            Tasty Tales is your go-to destination for exploring and sharing delicious recipes. From quick bites to
            gourmet dishes, you can find it all here. Join us in discovering culinary magic and sharing the joy of
            cooking.
          </p>
          <blockquote className="blockquote text-center my-4" style={{ fontStyle: 'italic', color: '#007bff' }}>
            <p
              style={{
                fontSize: '1.5rem',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
              }}
            >
              "Cooking is the art of turning ingredients into memories."
            </p>
          </blockquote>
          <div className="text-center">
            <button
              onClick={handleExploreClick}
              className="btn btn-warning btn-lg shadow-sm px-5 py-2"
              style={{
                background: 'linear-gradient(45deg, #ff6f61, #ffc107)',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
              }}
            >
              Start Exploring Recipes
            </button>
          </div>
        </div>

        <hr className="my-5" />

        {/* Features Section */}
        <div className="row text-center">
          <div className="col-md-4">
            <i className="bi bi-heart-fill fs-1" style={{ color: '#e63946' }}></i>
            <h3 className="mt-3" style={{ color: '#333' }}>
              Passionate Cooking
            </h3>
            <p style={{ color: '#444' }}>Discover recipes created with love and attention to detail.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-people-fill fs-1" style={{ color: '#007bff' }}></i>
            <h3 className="mt-3" style={{ color: '#333' }}>
              Vibrant Community
            </h3>
            <p style={{ color: '#444' }}>Share your stories and recipes with food lovers worldwide.</p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-globe2 fs-1" style={{ color: '#ff6f61' }}></i>
            <h3 className="mt-3" style={{ color: '#333' }}>
              Global Cuisine
            </h3>
            <p style={{ color: '#444' }}>Experience diverse flavors and techniques from around the world.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
