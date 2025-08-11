import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaPaw, FaWheelchair, FaAddressBook, FaIdBadge } from 'react-icons/fa';
import RescuerLayout from '../layouts/RescuerLayout';
import api from '../api/api';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const RequestList = () => {
  const [rescues, setRescues] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchAvailableRescues = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('rescue_token');
      const response = await api.get('/rescuer/available-rescues', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRescues(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error('Failed to fetch rescues:', error);
    }finally {
      setLoading(false);
    }
  };

  const handleAssign = async (id) => {
    try {
      const token = localStorage.getItem('rescue_token');
      await api.post(`/rescuer/assign/${id}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Rescue assigned successfully!');
      fetchAvailableRescues(); // Refresh list
    } catch (error) {
      toast.error('Could not assign rescue. It may already be taken.');
    }
  };

  useEffect(() => {
    fetchAvailableRescues();
  }, [page, search]);

  return (
    <RescuerLayout>
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Available Rescues</h1>
          {
            loading ? (
              Loader
            ):(
              <>
                {rescues.length === 0 ? (
                  <p>No available rescue requests right now.</p>
                ) : (
                  rescues.map((req) => (
                    <div key={req.id} className="bg-white rounded-lg shadow p-4 mb-4 bordered-orange">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                          {new Date(req.created_at).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleAssign(req.id)}
                          className="bg-orange-500 text-white text-sm px-3 py-1 rounded hover:bg-orange-600"
                        >
                          Assign to Me
                        </button>
                      </div>
                      {/* <div className="mb-2 text-sm flex items-center gap-2">
                        <FaIdBadge className="text-gray-500" />
                        Req ID : {req.id}
                      </div> */}
                      <div className="mb-2 text-sm flex items-center gap-2 text-blue-600">
                        <FaPhoneAlt className="text-gray-500" />
                        <a href={`tel:${req.phone}`}>{req.phone}</a>
                      </div>
                      {req.address && (
                          <div className="mb-2 text-sm flex items-center gap-2 text-blue-600">
                              <FaAddressBook className="text-gray-500" />
                              {req.address}
                          </div>
                      )}

                      <div className="text-sm mb-1">
                        <strong>People:</strong> {req.people_count}
                      </div>
                      <div className="text-sm mb-1">
                        <strong>Situation:</strong> {req.situation}
                      </div>

                      <div className="flex gap-2 mt-2">
                        {req.needs_pet === 1 && (
                          <span className="inline-flex items-center bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                            <FaPaw className="mr-1" /> Pet
                          </span>
                        )}
                        {req.needs_disabled === 1 && (
                          <span className="inline-flex items-center bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">
                            <FaWheelchair className="mr-1" /> Disabled
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </>
            )
          }
          
          {/* Pagination */}
          {/* <div className="flex gap-2 mt-4 justify-center">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-orange-600 text-white' : 'bg-gray-300'}`}
              >
                {i + 1}
              </button>
            ))}
          </div> */}
        </div>
      </div>
    </RescuerLayout>
  );
};

export default RequestList;