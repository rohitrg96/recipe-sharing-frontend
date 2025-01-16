import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastConfig: React.FC = () => {
  return (
    <ToastContainer
      position="top-center" // Position of the toast
      autoClose={3000} // Automatically close after 3 seconds
      hideProgressBar={false} // Show progress bar
      newestOnTop={true} // Newest toast on top
      closeOnClick // Close toast on click
      rtl={false} // Left-to-right text
      pauseOnFocusLoss // Pause auto-close on focus loss
      draggable // Allow drag to dismiss
      pauseOnHover // Pause auto-close on hover
      theme="colored" // Colored theme
    />
  );
};

export default ToastConfig;
