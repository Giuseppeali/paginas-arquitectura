import React from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ClientGuard() {
    const { session, loading } = useAuth();
    const [searchParams] = useSearchParams();

    // While checking initial auth state, we can show a loader or nothing
    if (loading) {
        return <div className="min-h-screen bg-[#050505]"></div>;
    }

    // Admins (authenticated users) can see everything
    if (session) {
        return <Outlet />;
    }

    // Check if there is an active valid client session token
    const clientToken = localStorage.getItem('client_token');
    const urlToken = searchParams.get('token');

    // If not admin and no client token or url token, deny access
    if (!clientToken && !urlToken) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
