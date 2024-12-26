import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import AddRecipe from './pages/AddRecipe/AddRecipe';
import ViewRecipe from './pages/ViewRecipe/ViewRecipe';
import About from './pages/About/About';

import './assets/css/global.css';

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1 main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipe/:recipeId" element={<ViewRecipe />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
