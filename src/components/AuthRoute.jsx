import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem('rescue_token');

  if (token) {
    return <Navigate to="/rescuer/dashboard" replace />;
  }

  return children;
};

export default AuthRoute;