import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/InputField/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useViewRecipe } from '../../hooks/useViewRecipe';
import CommentInput from '../../components/InputField/CommentInput/CommentInput';
import './ViewRecipe.css';

const ViewRecipe: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  if (!recipeId) {
    return (
      <div className="text-center mt-5 text-danger">Recipe not found!</div>
    );
  }

  const {
    recipe,
    rating,
    comment,
    setComment,
    handleAddComment,
    handleRate,
    userComment,
    userRating,
    showModal,
    setShowModal,
  } = useViewRecipe(recipeId);

  if (!recipe) {
    return <h1 className="text-center mt-5 text-danger">Loading.....</h1>;
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row g-4">
          <div className="col-md-6">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="recipe-image"
              />
            ) : (
              <div className="no-image">No Image Available</div>
            )}
          </div>

          <div className="col-md-6">
            <h2 className="recipe-title">{recipe.title}</h2>
            <p>
              <strong>Preparation Time:</strong> {recipe.preparationTime}{' '}
              minutes
            </p>
            <h5 className="section-heading">Ingredients:</h5>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h5 className="section-heading">Steps:</h5>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <hr className="my-5" />

        <h4>Comments</h4>
        {recipe.comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          recipe.comments.map((c) => (
            <div className="comments-list">
              <div className="comment-box comment-item" key={c._id}>
                <h6 className="comment-author">
                  {c.user.firstName} {c.user.lastName}
                </h6>
                <p className="comment-text">{c.comment}</p>
                <small className="comment-date">
                  Posted on {new Date(c.createdAt).toLocaleDateString()}
                </small>
                {c._id === userComment?._id && (
                  <>
                    <button
                      className="edit-button p-2 m-1 "
                      onClick={() => setShowModal(true)}
                      data-testid="edit-comment"
                    >
                      Edit
                    </button>

                    {showModal && (
                      <div className="modal-overlay">
                        <div className="modal-dialog">
                          <div className="modal-content p-1">
                            <div className="modal-header position-relative">
                              <button
                                type="button"
                                className="btn-close top-right-close"
                                onClick={() => setShowModal(false)}
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <CommentInput
                                label="Edit your Comment"
                                comment={comment}
                                onChange={setComment}
                                onSubmit={handleAddComment}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}

        <div className="mt-4">
          {!userComment && (
            <CommentInput
              label="Add a Comment"
              onChange={setComment}
              onSubmit={handleAddComment}
              comment={comment}
            />
          )}
        </div>

        <hr className="my-5" />

        {userRating ? (
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                data-testid="star"
                className={`star ${star <= Number(userRating.rating) ? 'active' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
        ) : (
          <>
            <h4>Rate This Recipe</h4>
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  data-testid="star"
                  className={`star ${star <= rating ? 'active' : ''}`}
                  onClick={() => handleRate(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
};

export default ViewRecipe;
