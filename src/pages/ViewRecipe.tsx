import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface RecipeData {
  _id: string;
  title: string;
  ingredients: string[];
  steps: string[];
  image: string | null;
  preparationTime: number;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  stars: {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    rating: number;
    _id: string;
  }[];
  comments: {
    user: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    comment: string;
    _id: string;
    createdAt: string;
  }[];
}

const ViewRecipe: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const fetchRecipe = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      throw new Error('Authentication token not found');
    }
    try {
      const response = await axios.get(`http://localhost:5000/api/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.data);
      setRecipe(response.data.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, [recipeId]);

  const handleAddComment = async () => {
    if (comment.trim()) {
      try {
        await axios.put(
          `http://localhost:5080/api/recipes/comment/${recipeId}`,
          { comment },
          {
            headers: {
              Authorization: `Bearer ${Cookies.get('authToken')}`,
            },
          },
        );

        setComment('');
        fetchRecipe();
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleRate = async (newRating: number) => {
    try {
      await axios.put(
        `http://localhost:5080/api/recipes/rating/${recipeId}`,
        { rating: newRating },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        },
      );

      setRating(newRating);
      fetchRecipe();

      console.log('Rated:', newRating);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

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
                className="d-flex justify-content-center align-items-center bg-light border rounded  shadow"
                style={{ height: '500px', fontSize: '1.2rem', color: '#6c757d' }}
              >
                No Image Available
              </div>
            )}
          </div>

          {/* Right Side: Details */}
          <div className="col-md-6">
            <h2 className="fw-bold">{recipe.title}</h2>
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
        {recipe.comments.map((c) => (
          <div className="border rounded p-3 mb-3 shadow-sm" key={c._id}>
            <h6 className="fw-bold">
              {c.user.firstName} {c.user.lastName}
            </h6>
            <p className="mb-1">{c.comment}</p>
            <small className="text-muted">Posted on {new Date(c.createdAt).toLocaleDateString()}</small>
          </div>
        ))}

        {/* Add Comment Section */}
        <div className="mt-4">
          <label htmlFor="commentInput" className="form-label fw-bold">
            Add a Comment
          </label>
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
        <h4>Rate This Recipe</h4>
        <div className="mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="me-1 fs-3"
              onClick={() => handleRate(star)}
              style={{
                cursor: 'pointer',
                color: star <= rating ? '#ffc107' : '#e4e5e9',
                border: '1px solid black',
                backgroundColor: 'black',
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
