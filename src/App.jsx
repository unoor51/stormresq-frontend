import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EvacueeForm from './components/EvacueeForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import MapView from './pages/MapView';
import RequestList from './pages/RequestList';
import AssignedList from './pages/AssignedList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EvacueeForm />} />
        <Route path="/rescuer/login" element={<Login />} />
        <Route path="/rescuer/signup" element={<Register />} />
        <Route path="/rescuer/dashboard" element={<Dashboard />} />
        <Route path="/rescuer/map" element={<MapView />} />
        <Route path="/rescuer/requests" element={<RequestList />} />
        <Route path="/rescuer/assigned" element={<AssignedList />} />
      </Routes>
    </Router>
  );
}

export default App;