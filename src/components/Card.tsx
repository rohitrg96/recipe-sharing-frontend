import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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
      <div className="card shadow-sm mb-4" style={{ cursor: 'pointer' }} onClick={handleCardClick}>
        {recipe.image ? (
          <img
            src={recipe.image}
            className="card-img-top"
            alt={recipe.title}
            style={{ objectFit: 'cover', height: '12rem' }}
          />
        ) : (
          <div
            className="d-flex justify-content-center align-items-center bg-light"
            style={{ height: '12rem', color: '#6c757d' }}
          >
            No Image Available
          </div>
        )}
        <div className="card-body d-flex flex-column justify-content-between">
          <h4 className="card-title text-center text-truncate">
            <span style={{ color: 'gold' }}>★ ★ ★ ★ ★</span>
          </h4>

          <p className="card-title text-center text-truncate fw-bold">
            {recipe.starsCount > 0
              ? `${recipe.starsCount} Reviews / ${recipe.averageStars.toFixed(1)} Average`
              : 'Be the first to review!'}
          </p>

          <h4
            className="card-title text-center text-truncate fw-bolder text-capitalize"
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {recipe.title}
          </h4>
        </div>
      </div>

      {/* Modal for Authentication Alert */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        tabIndex={-1}
        aria-labelledby="loginRequiredModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
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
              <p>You need to log in first to view the details of this recipe.</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={() => navigate('/login')}>
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
