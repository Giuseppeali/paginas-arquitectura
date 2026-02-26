import React, { useState } from 'react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        setLoading(false);

        if (error) {
            setError(error.message);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans">
            <Navbar />
            <section className="py-32 px-6 md:px-12 max-w-md mx-auto min-h-[80vh] flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight mb-4">Admin Login</h1>
                    <p className="text-gray-400 font-light mb-12">Sign in to manage client links.</p>

                    <form onSubmit={handleLogin} className="space-y-6 bg-[#0a0a0a] p-8 rounded-2xl border border-white/10">
                        <div>
                            <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>

                        {error && <p className="text-red-400 text-sm">{error}</p>}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? <><Loader2 size={18} className="animate-spin" /> Signing in...</> : 'Sign In'}
                        </button>
                    </form>
                </motion.div>
            </section>
            <Footer />
        </div>
    );
}
