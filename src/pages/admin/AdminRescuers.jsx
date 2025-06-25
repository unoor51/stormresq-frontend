import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../api/api';
import Loader from '../../components/Loader';

const AdminRescuers = () => {
    const [rescuers, setRescuers] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleAction = async (id, type) => {
        setLoading(true)
        const endpoint =
            type === 'approve'
            ? `/admin/rescuers/${id}/approve`
            : `/admin/rescuers/${id}/reject`;

        try {
            const token = localStorage.getItem('admin_token');
            const respose = await api.put(endpoint, {}, {
            headers: { Authorization: `Bearer ${token}` },
            });

            // Refresh list after update
            setRescuers((prev) =>
                prev.map((r) =>
                    r.id === id ? { ...r, status: type === 'approve' ? 'approved' : 'rejected' } : r
                )
            );

            alert(respose.data.message);
        } catch (error) {
            console.error(`Failed to ${type} rescuer:`, error);
            alert(`Failed to ${type} rescuer`);
        }finally{
            setLoading(false)
        }
    };

    useEffect(() => {
        const fetchRescuers = async () => {
            try {
                const token = localStorage.getItem('admin_token');
                const response = await api.get('/admin/rescuers', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                });
                setRescuers(response.data.rescuers);
            } catch (error) {
                console.error('Error fetching rescuers:', error);
            }finally {
                setLoading(false);
            }
        };

        fetchRescuers();
    }, []);

    if (loading) return <Loader />;
    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6">Rescuers List</h1>
            <div className="overflow-x-auto">
                <table className="w-full bg-white shadow rounded">
                <thead className="bg-gray-100 text-sm text-left">
                    <tr>
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Registered</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rescuers.map((rescuer) => (
                    <tr key={rescuer.id} className="border-b text-sm hover:bg-gray-50">
                        <td className="p-3">{rescuer.first_name} {rescuer.last_name}</td>
                        <td className="p-3">{rescuer.email}</td>
                        <td className="p-3">{rescuer.phone}</td>
                        <td className="p-3">{new Date(rescuer.created_at).toLocaleDateString()}</td>
                        <td className='p-3 capitalize'>
                            <span className={`inline-block px-2 py-1 text-xs rounded font-semibold ${
                            rescuer.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : rescuer.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                            }`}>
                                {rescuer.status}
                            </span>
                        </td>
                        <td className="p-3">
                            {rescuer.status === 'pending' && (
                            <div className="flex gap-2">
                                <button
                                onClick={() => handleAction(rescuer.id, 'approve')}
                                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded hover:bg-green-200"
                                >
                                Approved
                                </button>
                                <button
                                onClick={() => handleAction(rescuer.id, 'reject')}
                                className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded hover:bg-red-200"
                                >
                                Rejected
                                </button>
                            </div>
                            )}
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default AdminRescuers;