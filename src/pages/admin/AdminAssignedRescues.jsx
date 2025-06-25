import React from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import RescueList from './RescueList';

const AdminAssignedRescues = () => (
  <AdminLayout>
    <RescueList status="assigned" />
  </AdminLayout>
);

export default AdminAssignedRescues;