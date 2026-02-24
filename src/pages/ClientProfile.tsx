import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabaseClient';
import Home from './Home';
import { brandConfig } from '../config/brand';

// We wrap the Home component, injecting the fetched client data.
// Based on the original Generator, it expected: name, logo, invertLogo, email

export default function ClientProfile() {
    const { slug } = useParams();
    const [clientData, setClientData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchClientData = async () => {
            if (!slug) return;

            setLoading(true);
            const { data, error } = await supabase
                .from('clients')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !data) {
                console.error("Error fetching client data:", error);
                setError(true);
            } else {
                setClientData(data);

                // Mutate the global brandConfig so Logo, Footer, and Home read the new data
                brandConfig.name = data.name;
                brandConfig.fullName = data.name;
                brandConfig.logoUrl = data.logo;
                brandConfig.email = data.email;
                brandConfig.invertLogo = data.invert_logo;

                // Store in session storage so it persists if the user navigates to /projects
                sessionStorage.setItem('brandName', data.name);
                sessionStorage.setItem('brandLogo', data.logo || '');
                sessionStorage.setItem('brandEmail', data.email || '');
                sessionStorage.setItem('brandInvertLogo', data.invert_logo ? 'true' : 'false');

                // Update the document title
                document.title = data.name;
            }
            setLoading(false);
        };

        fetchClientData();
    }, [slug]);

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
        return <Navigate to="/" replace />;
    }

    return <Home />;
}
