import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BrandProvider } from './context/BrandContext';
import ProtectedRoute from './components/ProtectedRoute';
import ClientGuard from './components/ClientGuard';

// Eagerly loaded components (Critical for initial render)
import ClientProfile from './pages/ClientProfile';
// A simple fallback for Suspense matching the dark theme
const PageFallback = () => (
  <div className="min-h-screen bg-[#050505] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
  </div>
);

// Lazy Loaded Routes
const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Generator = lazy(() => import('./pages/Generator'));
const Login = lazy(() => import('./pages/Login'));
const Admin = lazy(() => import('./pages/Admin'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  return (
    <AuthProvider>
      <BrandProvider>
        <Router>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/unauthorized" element={<NotFound />} />

              {/* Client Guarded Routes (Support optional /:slug prefix for white-labeling) */}
              <Route element={<ClientGuard />}>
                <Route path="/:slug?" element={<ClientProfile />}>
                  <Route index element={<Home />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="projects" element={<Projects />} />
                  <Route path="projects/:id" element={<ProjectDetails />} />
                </Route>
              </Route>

              {/* Protected Admin Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/generator" element={<Generator />} />
                <Route path="/admin" element={<Admin />} />
              </Route>

              {/* Catch-all 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </BrandProvider>
    </AuthProvider>
  );
}
