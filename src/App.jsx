import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EvacueeForm from './components/EvacueeForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import RequestList from './pages/RequestList';
import AssignedList from './pages/AssignedList';
import PrivateRoute from './components/PrivateRoute';
import AuthRoute from './components/AuthRoute';
import CompletedRescues from './pages/CompletedRescues';
import CancelledRescues from './pages/CancelledRescues';
import { LoadScript } from '@react-google-maps/api';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAuthRoute from './components/AdminAuthRoute';
import AdminPrivateRoute from './components/AdminPrivateRoute';
import AdminRescuers from './pages/admin/AdminRescuers';
import AdminAvailableRescues from './pages/admin/AdminAvailableRescues';
import AdminAssignedRescues from './pages/admin/AdminAssignedRescues';
import AdminCompletedRescues from './pages/admin/AdminCompletedRescues';
import AdminCancelledRescues from './pages/admin/AdminCancelledRescues';
import EditProfile from './pages/EditProfile';
import AdminSettings from './pages/admin/AdminSettings';

function App() {
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const libraries = ['places']; // or ['places', 'geometry', etc.]
  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY} libraries={libraries}>
      <Router>
        <Routes>
          <Route path="/" element={<EvacueeForm />} />
          {/* Rescuer Routes */}
          <Route path="/rescuer/login" element={
            <AuthRoute>
              <Login />
            </AuthRoute>          
            } />
          <Route path="/rescuer/signup" element={
            <AuthRoute>
            <Register />
            </AuthRoute>
          } />
          <Route
            path="/rescuer/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/rescuer/edit-profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/rescuer/requests"
            element={
              <PrivateRoute>
                <RequestList />
              </PrivateRoute>
            }
          />

          <Route
            path="/rescuer/map"
            element={
              <PrivateRoute>
                <MapView />
              </PrivateRoute>
            }
          />
          <Route path="/rescuer/assigned" element={
            <PrivateRoute>
              <AssignedList />
            </PrivateRoute>
            } />
          <Route path="/rescuer/completed-rescues" element={
            <PrivateRoute>
              <CompletedRescues />
            </PrivateRoute>
          } />
          <Route path="/rescuer/cancelled-rescues" element={
            <PrivateRoute>
              <CancelledRescues />
            </PrivateRoute>
          } />
          {/* Admiin Routes Start */}
            <Route path="/admin/login" element={
              <AdminAuthRoute>
                <AdminLogin />
              </AdminAuthRoute>
            } />
            <Route
              path="/admin/dashboard"
              element={
                <AdminPrivateRoute>
                  <AdminDashboard />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/rescuers"
              element={
                <AdminPrivateRoute>
                  <AdminRescuers />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/rescues/available"
              element={
                <AdminPrivateRoute>
                  <AdminAvailableRescues />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/rescues/assigned"
              element={
                <AdminPrivateRoute>
                  <AdminAssignedRescues />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/rescues/completed"
              element={
                <AdminPrivateRoute>
                  <AdminCompletedRescues />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/rescues/cancelled"
              element={
                <AdminPrivateRoute>
                  <AdminCancelledRescues />
                </AdminPrivateRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <AdminPrivateRoute>
                  <AdminSettings />
                </AdminPrivateRoute>
              }
            />
          {/* Admin Routes End */}
        </Routes>
      </Router>
    </LoadScript>
  );
}

export default App;