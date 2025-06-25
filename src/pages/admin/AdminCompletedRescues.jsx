import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import RescueList from './RescueList';

const AdminCompletedRescues = () => (
  <AdminLayout>
    <RescueList status="completed" />
  </AdminLayout>
);

export default AdminCompletedRescues;
