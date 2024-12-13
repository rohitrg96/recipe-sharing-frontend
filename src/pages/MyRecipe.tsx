import React from 'react';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
  id: string;
  image: string;
  title: string;
  prepTime: number;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ id, image, title, prepTime, onEdit, onDelete }) => {
  return (
    <div className="d-flex mb-4" style={{ width: '50%', border: '1px solid #ccc', borderRadius: '5px' }}>
      {/* Image Section */}
      <div style={{ flex: '0 0 20%' }}>
        <img
          src={image}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '5px 0 0 5px' }}
        />
      </div>

      {/* Content Section */}
      <div
        style={{ flex: '0 0 60%', padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <h5 style={{ margin: '0 0 5px' }}>{title}</h5>
        <p style={{ margin: 0, color: '#666' }}>Preparation Time: {prepTime} mins</p>
      </div>

      {/* Actions Section */}
      <div
        style={{
          flex: '0 0 20%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <button className="btn btn-primary mb-2" style={{ width: '80%' }} onClick={() => onEdit(id)}>
          Edit
        </button>
        <button className="btn btn-danger" style={{ width: '80%' }} onClick={() => onDelete(id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

const MyRecipes: React.FC = () => {
  // Sample data
  const recipes = [
    {
      id: '1',
      image: '/images/recipe1.jpg',
      title: 'Spaghetti Carbonara',
      prepTime: 30,
    },
    {
      id: '2',
      image: '/images/recipe2.jpg',
      title: 'Chicken Alfredo',
      prepTime: 45,
    },
    // Add more recipes as needed
  ];

  const handleEdit = (id: string) => {
    console.log(`Edit recipe with ID: ${id}`);
    // Redirect to edit recipe page
  };

  const handleDelete = (id: string) => {
    console.log(`Delete recipe with ID: ${id}`);
    // Implement delete logic here
  };

  return (
    <div
      className="d-flex flex-column align-items-center py-4"
      style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}
    >
      {/* Add New Recipe Button */}
      <Link to="/add-recipe" className="btn btn-success mb-4">
        Add New Recipe
      </Link>

      {/* Recipes List */}
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          image={recipe.image}
          title={recipe.title}
          prepTime={recipe.prepTime}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default MyRecipes;
