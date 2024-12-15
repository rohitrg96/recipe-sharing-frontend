import { useFetchRecipes } from '../hooks/useFetchRecipes';
import Card from '../components/Card';
import React, { useState } from 'react';
import { Recipe } from '../types/Recipe';
import HeaderSection from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Pagination from '../components/pagination';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (currentPage: number) => {
    console.log(`Navigated to page: ${currentPage}`);
    setCurrentPage(currentPage);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term); // Update the search term state
  };

  const { recipes, error, totalpages } = useFetchRecipes(searchTerm, currentPage);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* Navbar */}
      <Navbar />

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
      <Pagination currentPage={currentPage} totalPages={totalpages} onPageChange={handlePageChange} />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
