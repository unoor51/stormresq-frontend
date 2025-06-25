import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminAuthRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');

  if (token) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

export default AdminAuthRoute;