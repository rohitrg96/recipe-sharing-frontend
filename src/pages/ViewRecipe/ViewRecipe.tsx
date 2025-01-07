import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/InputField/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { useViewRecipe } from '../../hooks/useViewRecipe';
import CommentInput from '../../components/InputField/CommentInput/CommentInput';
import './ViewRecipe.css';

const ViewRecipe: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState<number>(0);

  if (!recipeId) {
    return (
      <div className="text-center mt-5 text-danger">Recipe not found!</div>
    );
  }

  const {
    recipe,
    isRecipeLoading,
    isFeedbackLoading,
    userComment,
    userRating,
    addCommentMutation,
    addRatingMutation,
  } = useViewRecipe(recipeId);

  if (isRecipeLoading || isFeedbackLoading) {
    return <h1 className="text-center mt-5 text-danger">Loading.....</h1>;
  }

  const handleAddComment = () => {
    if (comment.trim()) {
      addCommentMutation.mutate(comment, {
        onSuccess: () => {
          setComment('');
          setShowModal(false);
        },
        onError: (error) => {
          console.error('Error adding comment:', error);
        },
      });
    }
  };

  const handleRate = (newRating: number) => {
    setRating(newRating); // Update UI
    addRatingMutation.mutate(newRating, {
      onError: (error) => {
        console.error('Error submitting rating:', error);
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container my-5">
        {/* Recipe Details */}
        <div className="row g-4">
          <div className="col-md-6">
            {recipe?.image ? (
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
            <h2 className="recipe-title">{recipe?.title}</h2>
            <p>
              <strong>Preparation Time:</strong> {recipe?.preparationTime}{' '}
              minutes
            </p>
            <h5 className="section-heading">Ingredients:</h5>
            <ul>
              {recipe?.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h5 className="section-heading">Steps:</h5>
            <ol>
              {recipe?.steps.map((step, index) => <li key={index}>{step}</li>)}
            </ol>
          </div>
        </div>

        {/* Comments Section */}
        <hr className="my-5" />
        <h4>Comments</h4>
        {recipe?.comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          recipe?.comments.map((c) => (
            <div className="comments-list" key={c._id}>
              <div className="comment-box comment-item">
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
                      className="edit-button p-2 m-1"
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

        {/* Add Comment */}
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

        {/* Rating Section */}
        <hr className="my-5" />
        {userRating ? (
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                data-testid="star"
                className={`star ${
                  star <= Number(userRating.rating) ? 'active' : ''
                }`}
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
