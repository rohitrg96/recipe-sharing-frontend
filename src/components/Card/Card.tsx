import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Card.css';

export interface RecipeCardProps {
  recipe: {
    _id: string;
    title: string;
    image: string | null;
    starsCount: number;
    averageStars: number;
  };
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = () => {
    const authToken = Cookies.get('authToken');
    if (!authToken) {
      setShowModal(true);
    } else {
      navigate(`/recipe/${recipe._id}`);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div
        className="card shadow-sm mb-4 card-container"
        onClick={handleCardClick}
      >
        {recipe.image ? (
          <img
            src={recipe.image}
            className="card-img-top card-img"
            alt={recipe.title}
          />
        ) : (
          <div className="d-flex justify-content-center align-items-center bg-light card-no-image">
            No Image Available
          </div>
        )}
        <div className="card-body card-body-content">
          <h4 className="card-title">
            <span className="star-color">★ ★ ★ ★ ★</span>
          </h4>

          <p className="card-title card-reviews">
            {recipe.starsCount > 0
              ? `${recipe.starsCount} Reviews / ${recipe.averageStars.toFixed(1)} Average`
              : 'Be the first to review!'}
          </p>

          <h4
            className="card-title card-title text-capitalize fw-bolder"
            title={recipe.title}
          >
            {recipe.title}
          </h4>
        </div>
      </div>

      {/* Modal for Authentication Alert */}
      <div
        className={`modal fade card-modal ${showModal ? 'show' : ''}`}
        tabIndex={-1}
        aria-labelledby="loginRequiredModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog card-modal-dialog">
          <div className="modal-content card-modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginRequiredModalLabel">
                Login Required
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                You need to log in first to view the details of this recipe.
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
