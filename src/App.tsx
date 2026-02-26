import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Generator from './pages/Generator';
import ClientProfile from './pages/ClientProfile';
import Login from './pages/Login';
import Admin from './pages/Admin';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import ClientGuard from './components/ClientGuard';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Client Guarded Routes */}
          <Route element={<ClientGuard />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/generator" element={<Generator />} />
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* Entry point for clients via custom link */}
          <Route path="/:slug" element={<ClientProfile />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
