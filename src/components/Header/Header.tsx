import React, { useState } from 'react';
import './Header.css';

interface HeaderSectionProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filters: {
    minRating?: string;
    maxPreparationTime?: string;
  }) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
  onSearch,
  onFilterChange,
}) => {
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

  const handleMaxPreparationTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value ? e.target.value : '';
    setMaxPreparationTime(value);
    onFilterChange({ minRating, maxPreparationTime: value });
  };

  return (
    <div className="mb-5">
      <div className="text-center">
        {/* Title */}
        <h1 className="header-title text-center fw-bold display-4 my-4">
          Recipes
        </h1>

        <p className="header-description mb-5 fw-bold">
          Explore thousands of mouthwatering recipes from every corner of the
          globe! 🍲
        </p>

        {/* Search Bar */}
        <div className="d-flex justify-content-center mb-3">
          <input
            type="search"
            className="w-50 form-control"
            placeholder="Your Ingredients, Our Recipe Ideas"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Filters */}
        <div className="header-filters">
          {/* Min Rating */}
          <div className="filter-container">
            <label htmlFor="minRating" className="form-label filter-label">
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
          <div className="filter-container">
            <label
              htmlFor="maxPreparationTime"
              className="form-label filter-label"
            >
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
