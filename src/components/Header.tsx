import React, { useState } from 'react';

interface HeaderSectionProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: { minRating?: string; maxPreparationTime?: string }) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ onSearch, onFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minRating, setMinRating] = useState<string | ''>('');
  const [maxPreparationTime, setMaxPreparationTime] = useState<string | ''>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the search term to the parent
  };

  const handleMinRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? e.target.value : '';
    setMinRating(value);
    onFilterChange({ minRating: value, maxPreparationTime });
  };

  const handleMaxPreparationTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? e.target.value : '';
    setMaxPreparationTime(value);
    onFilterChange({ minRating, maxPreparationTime: value });
  };

  return (
    <div className="mb-5">
      <div className="text-center">
        {/* Title */}
        <h1
          className="text-center fw-bold display-4 my-4"
          style={{
            fontStyle: 'italic',
            // color: 'red',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          Recipes
        </h1>

        <p
          className="mb-5 fw-bold"
          style={{
            fontStyle: 'italic',
          }}
        >
          Explore thousands of mouthwatering recipes from every corner of the globe! 🍲
        </p>

        {/* Search Bar */}
        <div className="d-flex justify-content-center mb-3">
          <input
            type="search"
            className="form-control w-50 me-2"
            placeholder="Your Ingredients, Our Recipe Ideas"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Filters */}
        <div className="d-flex justify-content-center gap-3">
          {/* Min Rating */}
          <div>
            <label htmlFor="minRating" className="form-label fw-bold">
              Min Rating
            </label>
            <input
              type="number"
              id="minRating"
              className="form-control"
              placeholder="1 to 5"
              min={1}
              max={5}
              value={minRating}
              onChange={handleMinRatingChange}
            />
          </div>

          {/* Max Preparation Time */}
          <div>
            <label htmlFor="maxPreparationTime" className="form-label fw-bold">
              Max Prep Time (mins)
            </label>
            <input
              type="number"
              id="maxPreparationTime"
              className="form-control"
              placeholder="e.g., 30"
              min={1}
              value={maxPreparationTime}
              onChange={handleMaxPreparationTimeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
