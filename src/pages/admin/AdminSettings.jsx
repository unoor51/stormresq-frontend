import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import api from '../../api/api';

const AdminSettings = () => {
  const [form, setForm] = useState({
    evacuee_success_message: '',
    rescuer_success_message: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing settings
  useEffect(() => {
    const fetchSettings = async () => {
      const token = localStorage.getItem('admin_token');
      const res = await api.get('/admin/settings', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const settings = {};
      res.data.settings.forEach((s) => {
        settings[s.key] = s.value;
      });

      setForm((prev) => ({ ...prev, ...settings }));
      setLoading(false);
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);

    const token = localStorage.getItem('admin_token');

    try {
      await api.post(
        '/admin/settings',
        {
          settings: [
            { key: 'evacuee_success_message', value: form.evacuee_success_message },
            { key: 'rescuer_success_message', value: form.rescuer_success_message }
          ]
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Settings saved!');
    } catch (err) {
      alert('Error saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Site Settings</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="mb-4">
              <label className="block font-medium mb-1">Evacuee Success Message</label>
              <textarea
                name="evacuee_success_message"
                value={form.evacuee_success_message}
                onChange={handleChange}
                rows={4}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Rescuer Success Message</label>
              <textarea
                name="rescuer_success_message"
                value={form.rescuer_success_message}
                onChange={handleChange}
                rows={4}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;