import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useViewRecipe } from '../hooks/useViewrecipe';

const ViewRecipe: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  if (!recipeId) {
    return <div className="text-center mt-5 text-danger">Recipe not found!</div>;
  }

  const { recipe, rating, comment, setComment, handleAddComment, handleRate, userComment, userRating } =
    useViewRecipe(recipeId);

  if (!recipe) {
    return <div className="text-center mt-5 text-danger">Recipe not found!</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row g-4">
          {/* Left Side: Image */}
          <div className="col-md-6">
            {recipe.image ? (
              <img
                src={recipe.image}
                alt={recipe.title}
                className="img-fluid rounded shadow"
                style={{ objectFit: 'cover', maxHeight: '500px' }}
              />
            ) : (
              <div
                className="d-flex justify-content-center align-items-center bg-light border rounded shadow"
                style={{ height: '500px', fontSize: '1.2rem', color: '#6c757d' }}
              >
                No Image Available
              </div>
            )}
          </div>

          {/* Right Side: Details */}
          <div className="col-md-6">
            <h2 className="fw-bold text-capitalize">{recipe.title}</h2>
            <p>
              <strong>Preparation Time:</strong> {recipe.preparationTime} minutes
            </p>
            <h5 className="mt-4">Ingredients:</h5>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h5 className="mt-4">Steps:</h5>
            <ol>
              {recipe.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>

        <hr className="my-5" />

        {/* Comments Section */}
        <h4>Comments</h4>
        {recipe.comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          recipe.comments.map((c) => (
            <div className="border rounded p-3 mb-3 shadow-sm" key={c._id}>
              <h6 className="fw-bold">
                {c.user.firstName} {c.user.lastName}
              </h6>
              <p className="mb-1">{c.comment}</p>
              <small className="text-muted">Posted on {new Date(c.createdAt).toLocaleDateString()}</small>
            </div>
          ))
        )}

        {/* Add Comment Section */}

        <div className="mt-4">
          {userComment ? (
            <label htmlFor="commentInput" className="form-label fw-bold">
              Already commented? Edit below!
            </label>
          ) : (
            <label htmlFor="commentInput" className="form-label fw-bold">
              Add a Comment
            </label>
          )}
          <textarea
            id="commentInput"
            className="form-control mb-3"
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
          <button className="btn btn-primary" onClick={handleAddComment}>
            Submit
          </button>
        </div>

        <hr className="my-5" />

        {/* Rating Section */}
        {userRating ? <h4>Already rated? Edit below!</h4> : <h4>Rate This Recipe</h4>}
        <div className="mt-2 ">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="me-1 fs-3 bg-black"
              onClick={() => handleRate(star)}
              style={{
                cursor: 'pointer',
                color: star <= rating ? '#ffc107' : '#e4e5e9',
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewRecipe;
