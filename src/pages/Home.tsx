import React from 'react';
import { useFetchRecipes } from '../hooks/useFetchRecipes';
import Card from '../components/Card/Card';
import { Recipe } from '../types/Recipe';
import HeaderSection from '../components/Header/Header';
import Navbar from '../components/InputField/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Pagination from '../components/Pagination/Pagination';
import LazyLoad from 'react-lazyload'; // Import LazyLoad from react-lazyload
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

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

  const loading = useSelector((state: RootState) => state.loading.loading); // Get loading state from Redux store

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

      {/* Loading Indicator */}
      {loading && (
        <h3 className="loading-spinner text-center mt-5 text-danger">
          Loading...
        </h3>
      )}

      {/* Cards Section */}
      <div className="container">
        <div className="row">
          {!loading && recipes.length === 0 ? (
            <h5 className="text-center text-danger mb-5">
              Oops! No Recipes found, try rephrasing the query.
            </h5>
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
