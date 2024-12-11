import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import SignUp from './pages/Signup';

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main Content */}
      <div className="flex-grow-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
