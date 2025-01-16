import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy load the components
const HomePage = React.lazy(() => import('./pages/Home'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const SignUp = React.lazy(() => import('./pages/Signup/Signup'));
const AddRecipe = React.lazy(() => import('./pages/AddRecipe/AddRecipe'));
const ViewRecipe = React.lazy(() => import('./pages/ViewRecipe/ViewRecipe'));
const About = React.lazy(() => import('./pages/About/About'));
const NotFound = React.lazy(() => import('./components/NotFound/NotFound'));
const ProtectedRoute = React.lazy(
  () => import('./components/ProtectedRoute/ProtectedRoute'),
);
import ToastConfig from './utils/ToastConfig';

// Import global styles
import './assets/css/global.css';

const LoadingSpinner = () => <div>Loading...</div>;

const App: React.FC = () => {
  return (
    <>
      {/* ToastContainer for global toast notifications */}
      <ToastConfig />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
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
      </Suspense>
    </>
  );
};

export default App;
