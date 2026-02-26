import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute() {
    const { session, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-white" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    // Render child routes if authenticated
    return <Outlet />;
}
