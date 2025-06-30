import React, { useEffect ,useState} from 'react';
import RescuerLayout from '../layouts/RescuerLayout';
import api from '../api/api';
import Loader from '../components/Loader';

const Dashboard = () => {
  const [stats, setStats] = useState({
    user_name: "",
    assigned_rescues: 0,
    completed_rescues: 0,
    cancelled_rescues: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('rescue_token');
        const response = await api.get('/rescuer/dashboard-stats', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
      } catch (error) {
        console.error('Failed to load dashboard stats', error);
        setLoading(false);
      }finally{
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <RescuerLayout>
      {
        loading ? (
          <Loader />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Welcome {stats.user_name} to Your Dashboard</h1>
            <p className="text-gray-600">Choose a section from the sidebar to begin.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-sm font-semibold text-gray-600 mb-2">Assigned Rescues</h2>
                <p className="text-3xl font-bold text-orange-500">{stats.assigned_rescues}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-sm font-semibold text-gray-600 mb-2">Completed Rescues</h2>
                <p className="text-3xl font-bold text-orange-500">{stats.completed_rescues}</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h2 className="text-sm font-semibold text-gray-600 mb-2">Cancelled Rescues</h2>
                <p className="text-3xl font-bold text-orange-500">{stats.cancelled_rescues}</p>
              </div>
            </div>
          </>
        )
      }      
    </RescuerLayout>
  );
};

export default Dashboard;