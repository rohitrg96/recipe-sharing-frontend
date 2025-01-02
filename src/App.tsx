import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/Signup/Signup';
import AddRecipe from './pages/AddRecipe/AddRecipe';
import ViewRecipe from './pages/ViewRecipe/ViewRecipe';
import About from './pages/About/About';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import './assets/css/global.css';
import { NotFound } from './components/NotFound/NotFound';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/" element={<HomePage />} />
      <Route
        path="/add-recipe"
        element={
          <ProtectedRoute>
            <AddRecipe />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipe/:recipeId"
        element={
          <ProtectedRoute>
            <ViewRecipe />
          </ProtectedRoute>
        }
      />
      <Route path="/about" element={<About />} />

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
