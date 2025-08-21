import React from 'react';
import { Navigate } from 'react-router-dom';

const UserAuthRoute = ({ children }) => {
  const token = localStorage.getItem('user_token');

  if (token) {
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default UserAuthRoute;