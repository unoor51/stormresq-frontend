import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import RescueList from './RescueList';

const AdminAvailableRescues = () => (
  <AdminLayout>
    <RescueList status="available" />
  </AdminLayout>
);

export default AdminAvailableRescues;