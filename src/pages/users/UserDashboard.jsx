import React, { useEffect ,useState} from 'react';
import UserLayout from '../../layouts/UserLayout';
import Loader from '../../components/Loader';

const UserDashboard = () => {
  const [stats, setStats] = useState({
    user_name: "",
    assigned_rescues: 0,
    completed_rescues: 0,
    cancelled_rescues: 0,
  });
  const [loading, setLoading] = useState(false);

  return (
    <UserLayout>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h1>
            <p className="text-gray-600">Choose a section from the sidebar to begin.</p>
          </>
        )
      }      
    </UserLayout>
  );
};

export default UserDashboard;