import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useSearchParams, useNavigate, Outlet } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabaseClient';
import { useBrand } from '../context/BrandContext';
import Logo from '../components/Logo';

interface ClientData {
    id: string;
    slug: string;
    name: string;
    logo: string;
    logo_scale: number;
    invert_logo: boolean;
    email: string;
    language: 'en' | 'es';
    created_at: string;
}

// We wrap the sub-routes via an Outlet, injecting the fetched client data.
// Based on the original Generator, it expected: name, logo, invertLogo, email

export default function ClientProfile() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { setBrand } = useBrand();
    const [clientData, setClientData] = useState<ClientData | null>(null);
    const [searchParams] = useSearchParams();

    // We get the token from the URL, or fallback to the local storage if they've already authenticated
    const urlToken = searchParams.get('token');
    const sessionToken = localStorage.getItem('client_token');
    const token = urlToken || sessionToken;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchClientData = async () => {
            if (!slug) {
                const storedSlug = localStorage.getItem('clientSlug');
                if (storedSlug) {
                    navigate(`/${storedSlug}`, { replace: true });
                    return;
                }
                setLoading(false);
                return;
            }
            if (!token) {
                setError(true);
                setLoading(false);
                return;
            }

            setLoading(true);
            const { data, error: fetchError } = await supabase
                .from('clients')
                .select('*')
                .eq('slug', slug)
                .eq('id', token)
                .single();

            if (fetchError || !data) {
                console.error("Error fetching client data:", fetchError);
                setError(true);

                // Clear invalid token
                if (sessionToken === token) {
                    localStorage.removeItem('client_token');
                }
            } else {
                setClientData(data as ClientData);

                // Update the global brand context state
                setBrand({
                    name: data.name,
                    fullName: data.name,
                    logoUrl: data.logo,
                    email: data.email,
                    invertLogo: data.invert_logo,
                    language: data.language || 'es',
                    logoScale: data.logo_scale || 100
                });

                // Save token to authenticate further access across guarded routes
                localStorage.setItem('client_token', token);
                localStorage.setItem('clientSlug', slug);

                // Update the document title
                document.title = data.name;

                // Clean up the URL if the token was in the search params
                if (urlToken) {
                    window.history.replaceState({}, '', window.location.pathname);
                }
            }
            setLoading(false);
        };

        fetchClientData();
    }, [slug, token, urlToken, sessionToken]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-12 h-12 border-2 border-white/20 border-t-white rounded-full"
                />
            </div>
        );
    }

    if (error) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
}
