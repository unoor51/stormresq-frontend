import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import RescueList from './RescueList';

const AdminCancelledRescues = () => (
  <AdminLayout>
    <RescueList status="cancelled" />
  </AdminLayout>
);

export default AdminCancelledRescues;