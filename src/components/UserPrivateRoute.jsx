import React from 'react';
import { Navigate } from 'react-router-dom';

const UserPrivateRoute = ({ children }) => {
  const token = localStorage.getItem('user_token');
  return token ? children : <Navigate to="/user/login" />;
};

export default UserPrivateRoute;