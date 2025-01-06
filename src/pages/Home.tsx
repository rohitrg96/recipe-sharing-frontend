import React from 'react';
import { useFetchRecipes } from '../hooks/useFetchRecipes';
import Card from '../components/Card/Card';
import { Recipe } from '../types/Recipe';
import HeaderSection from '../components/Header/Header';
import Navbar from '../components/InputField/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Pagination from '../components/Pagination/Pagination';
import LazyLoad from 'react-lazyload'; // Import LazyLoad from react-lazyload

const HomePage: React.FC = () => {
  const {
    recipes,
    error,
    totalpages,
    handleSearch,
    handlePageChange,
    currentPage,
    handleFilterChange,
  } = useFetchRecipes();

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Title Section */}
      <HeaderSection
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
      />

      {/* Cards Section */}
      <div className="container">
        <div className="row">
          {recipes.length === 0 ? (
            <div className="text-center">No recipes found</div>
          ) : (
            recipes.map((recipe: Recipe) => (
              <div
                data-testid="recipe-card"
                data-id={recipe._id}
                key={recipe._id}
                className="col-12 col-sm-6 col-md-3"
              >
                {/* Wrap each Card component in LazyLoad */}
                <LazyLoad height={200} offset={100}>
                  <Card recipe={recipe} />
                </LazyLoad>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination Section */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalpages}
        onPageChange={handlePageChange}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
