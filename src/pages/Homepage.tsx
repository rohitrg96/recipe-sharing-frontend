// import Card from '../components/card';
import { useFetchRecipes } from '../hooks/useFetchRecipes';
import Card from '../components/Card';
import React, { useState } from 'react';
import { Recipe } from '../types/Recipe';
import HeaderSection from '../components/Header';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { recipes, error } = useFetchRecipes(searchTerm);

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update the search term state
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Title Section */}
      <HeaderSection onSearch={handleSearch} />

      {/* Cards Section */}
      <div className="container  ">
        <div className="row ">
          {recipes.length === 0 ? (
            <div className="text-center">No recipes found</div> // Display the message if no recipes are found
          ) : (
            recipes.map((recipe: Recipe) => (
              <div key={recipe._id} className="col-12 col-sm-6 col-md-3">
                <Card recipe={recipe} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
