import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('rescue_token');

  if (!token) {
    return <Navigate to="/rescuer/login" replace />;
  }

  return children;
};

export default PrivateRoute;