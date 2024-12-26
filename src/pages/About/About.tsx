import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/InputField/Navbar/Navbar';
import './About.css';

const About: React.FC = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/');
  };

  return (
    <div className="about-container">
      <Navbar />

      <div className="container my-auto mb-5 mt-5">
        <div className="row align-items-center">
          <h1 className="display-4 fw-bold mb-4 text-center about-header">
            Welcome to Tasty Tales
          </h1>
          <p className="lead text-center about-lead">
            Tasty Tales is your go-to destination for exploring and sharing
            delicious recipes. From quick bites to gourmet dishes, you can find
            it all here. Join us in discovering culinary magic and sharing the
            joy of cooking.
          </p>
          <blockquote className="blockquote text-center my-4 about-quote">
            <p>"Cooking is the art of turning ingredients into memories."</p>
          </blockquote>
          <div className="text-center">
            <button onClick={handleExploreClick} className="btn about-button">
              Start Exploring Recipes
            </button>
          </div>
        </div>

        <hr className="my-5 about-divider" />

        <div className="row about-features">
          <div className="col-md-4">
            <i className="bi bi-heart-fill about-feature-icon"></i>
            <h3 className="about-feature-title">Passionate Cooking</h3>
            <p className="about-feature-text">
              Discover recipes created with love and attention to detail.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-people-fill about-feature-icon"></i>
            <h3 className="about-feature-title">Vibrant Community</h3>
            <p className="about-feature-text">
              Share your stories and recipes with food lovers worldwide.
            </p>
          </div>
          <div className="col-md-4">
            <i className="bi bi-globe2 about-feature-icon"></i>
            <h3 className="about-feature-title">Global Cuisine</h3>
            <p className="about-feature-text">
              Experience diverse flavors and techniques from around the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
