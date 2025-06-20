import React from 'react';
import RescuerLayout from '../layouts/RescuerLayout';

const Dashboard = () => {
  return (
    <RescuerLayout>
      <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
      <p className="text-gray-600">Choose a section from the sidebar to begin.</p>
    </RescuerLayout>
  );
};

export default Dashboard;