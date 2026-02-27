import React, { useState, useEffect } from 'react';
import { useParams, Navigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabaseClient';
import { Outlet } from 'react-router-dom';
import { brandConfig } from '../config/brand';

// We wrap the sub-routes via an Outlet, injecting the fetched client data.
// Based on the original Generator, it expected: name, logo, invertLogo, email

export default function ClientProfile() {
    const { slug } = useParams();
    const [clientData, setClientData] = useState<any>(null);
    const [searchParams] = useSearchParams();

    // We get the token from the URL, or fallback to the session storage if they've already authenticated
    const urlToken = searchParams.get('token');
    const sessionToken = sessionStorage.getItem('client_token');
    const token = urlToken || sessionToken;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchClientData = async () => {
            if (!slug) {
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
                    sessionStorage.removeItem('client_token');
                }
            } else {
                setClientData(data);

                // Mutate the global brandConfig so Logo, Footer, and Home read the new data
                brandConfig.name = data.name;
                brandConfig.fullName = data.name;
                brandConfig.logoUrl = data.logo;
                brandConfig.email = data.email;
                brandConfig.invertLogo = data.invert_logo;
                brandConfig.language = data.language || 'es';

                // Store in session storage so it persists if the user navigates to /projects
                sessionStorage.setItem('brandName', data.name);
                sessionStorage.setItem('brandLogo', data.logo || '');
                sessionStorage.setItem('brandEmail', data.email || '');
                sessionStorage.setItem('brandInvertLogo', data.invert_logo ? 'true' : 'false');
                sessionStorage.setItem('brandLang', data.language || 'es');

                // Save token to authenticate further access across guarded routes
                sessionStorage.setItem('client_token', token);

                // Update the document title
                document.title = data.name;

                // Clean up the URL if the token was in the search params
                if (urlToken) {
                    window.history.replaceState({}, '', `/${slug}`);
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
