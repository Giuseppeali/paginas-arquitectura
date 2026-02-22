import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Generator() {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [email, setEmail] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const baseUrl = window.location.origin;
        const params = new URLSearchParams();

        if (name) params.append('name', name);
        if (logo) params.append('logo', logo);
        if (email) params.append('email', email);

        const queryString = params.toString();
        setGeneratedUrl(queryString ? `${baseUrl}/?${queryString}` : baseUrl);
    }, [name, logo, email]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans">
            <Navbar />

            <section className="py-32 px-6 md:px-12 max-w-4xl mx-auto min-h-[80vh] flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight mb-4">Link Generator</h1>
                    <p className="text-gray-400 font-light mb-12">Create a custom shareable link to present the portfolio with a client's branding.</p>

                    <div className="space-y-8 bg-[#0a0a0a] p-8 rounded-2xl border border-white/10">
                        <div>
                            <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Client Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Acme Architects"
                                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Logo URL (Optional)</label>
                            <input
                                type="text"
                                value={logo}
                                onChange={(e) => setLogo(e.target.value)}
                                placeholder="https://example.com/logo.png"
                                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                            />
                            <p className="text-xs text-gray-500 mt-2">Leave blank to use the default text logo.</p>
                        </div>

                        <div>
                            <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Email (Optional)</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="hola@acme.com"
                                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>

                        <div className="pt-8 border-t border-white/10">
                            <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Generated Link</label>
                            <div className="flex items-center gap-4">
                                <div className="flex-1 bg-black border border-white/20 rounded-lg px-4 py-3 overflow-x-auto whitespace-nowrap text-gray-300 font-mono text-sm">
                                    {generatedUrl}
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors w-32"
                                >
                                    {copied ? <><Check size={18} /> Copied!</> : <><Copy size={18} /> Copy</>}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
