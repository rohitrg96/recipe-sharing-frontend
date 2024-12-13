// import React, { useState } from 'react';
interface HeaderSectionProps {
  onSearch: (searchTerm: string) => void; // Simpler API
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ onSearch }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value); // Emit the updated value to the parent
  };
  return (
    <div className="mb-5 ">
      <div className="text-center ">
        {/* Title */}
        <h1 className="mb-3">Recipes</h1>

        {/* Random Text */}
        <p className="mb-5">Discover thousands of delicious recipes from around the world!</p>

        {/* Search Bar */}
        <div className="d-flex justify-content-center">
          <input
            type="search"
            className="form-control w-50 me-2"
            placeholder="Your Ingredients, Our Recipe Ideas"
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
