import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../api/api';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';

const AdminRescuers = () => {
    const [rescuers, setRescuers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all'); // NEW STATE

    const handleAction = async (id, type) => {
        setLoading(true);
        let endpoint = '';
        if(type === 'approve'){
            endpoint = `/admin/rescuers/${id}/approve`;
        }else if(type === 'reject'){
            endpoint = `/admin/rescuers/${id}/reject`;
        }else if(type === 'deactivate'){
            endpoint = `/admin/rescuer/${id}/deactivate`;
        }

        try {
            const token = localStorage.getItem('admin_token');
            const respose = await api.put(endpoint, {}, {
            headers: { Authorization: `Bearer ${token}` },
            });
            toast.success(respose.data.message);
            // Refresh list after update
            setStatusFilter('all');
            fetchRescuers();
        } catch (error) {
            toast.error(`Failed to ${type} rescuer`);
        }finally{
            setLoading(false)
        }
    };

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

    useEffect(() => {
        fetchRescuers();
    }, []);

    // FILTER LOGIC
    const filteredRescuers =
        statusFilter === 'all'
            ? rescuers
            : rescuers.filter((rescuer) => rescuer.status === statusFilter);

    return (
        <AdminLayout>
            <div className='flex justify-between mb-3'>
                <h1 className="text-2xl font-bold">Rescuers List</h1>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded px-3"
                >
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                    <option value="deactivated">Deactivated</option>
                </select>
            </div>
            {
                loading ? (
                    <Loader />
                ):(
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white shadow rounded border">
                        <thead className="bg-gray-100 text-sm text-left">
                            <tr className='table-header'>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Registered</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            { filteredRescuers.length > 0 ? (
                                filteredRescuers.map((rescuer) => (
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
                                            <div className="flex gap-2">
                                                {rescuer.status === 'pending' && (
                                                    <>
                                                        <button
                                                    onClick={() => handleAction(rescuer.id, 'approve')}
                                                    className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded hover:bg-green-200"
                                                    >
                                                    Approved
                                                    </button>
                                                    <button
                                                    onClick={() => handleAction(rescuer.id, 'reject')}
                                                    className="bg-yellow-100 text-red-800 text-xs px-2 py-1 rounded hover:bg-red-200"
                                                    >
                                                    Rejected
                                                    </button>
                                                    </>
                                                )}
                                                {rescuer.status == 'approved' && (
                                                <button  onClick={() => handleAction(rescuer.id, 'deactivate')} className='bg-red-100 text-red-800 text-xs px-2 py-1 rounded hover:bg-red-200'>
                                                    Deactivate
                                                </button>
                                                )}
                                                {rescuer.status == 'deactivated' && (
                                                <button  onClick={() => handleAction(rescuer.id, 'approve')} className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded hover:bg-green-200'>
                                                    Reactivate
                                                </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                               ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center p-4">
                                            No rescuers found.
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                        </table>
                    </div>
                )
            }
        </AdminLayout>
    );
};

export default AdminRescuers;