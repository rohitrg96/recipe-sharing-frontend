import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import AddRecipe from './pages/AddRecipe';
import ViewRecipe from './pages/ViewRecipe';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import './assets/css/global.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1 main-content">
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
          </Routes>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
{
  /* <Routes>
{/* Public Routes */
}
{
  /* <Route path="/" element={<HomePage />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<SignUp />} />

{/* Protected Routes */
}
{
  /* <Route
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
<Route
  path="/my-recipes"
  element={
    <ProtectedRoute>
      <MyRecipes />
    </ProtectedRoute>
  }
/>
</Routes> */
}
