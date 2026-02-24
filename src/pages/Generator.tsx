import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Loader2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';

export default function Generator() {
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [invertLogo, setInvertLogo] = useState(false);
    const [email, setEmail] = useState('');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [slug, setSlug] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState('');

    useEffect(() => {
        // Auto-generate a slug from the name if the slug hasn't been manually edited.
        // If they clear the name, we clear the slug too.
        if (name) {
            setSlug(name.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
        } else {
            setSlug('');
        }
    }, [name]);

    const generateLink = async () => {
        if (!name || !slug) {
            setGenerationError('Client Name and URL Slug are required.');
            return;
        }

        setGenerationError('');
        setIsGenerating(true);

        const clientData = {
            slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
            name,
            logo,
            invert_logo: invertLogo,
            email
        };

        const { data, error } = await supabase
            .from('clients')
            .upsert(clientData, { onConflict: 'slug' })
            .select()
            .single();

        setIsGenerating(false);

        if (error) {
            console.error("Error saving to Supabase:", error);
            setGenerationError('Failed to generate link. Check your Supabase configuration.');
        } else {
            const baseUrl = window.location.origin;
            setGeneratedUrl(`${baseUrl}/${clientData.slug}`);
        }
    };

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
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                placeholder="e.g. Acme Architects"
                                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">Custom URL Slug <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                                placeholder="e.g. acme-architects"
                                className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                            />
                            <p className="text-xs text-gray-500 mt-2">This will create a link like: yourwebsite.com/<strong>acme-architects</strong></p>
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

                            <div className="mt-4 flex items-center">
                                <input
                                    type="checkbox"
                                    id="invertLogo"
                                    checked={invertLogo}
                                    onChange={(e) => setInvertLogo(e.target.checked)}
                                    className="w-4 h-4 rounded border-white/20 bg-transparent text-white focus:ring-1 focus:ring-white focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer"
                                />
                                <label htmlFor="invertLogo" className="ml-2 text-sm text-gray-300 cursor-pointer">
                                    Force logo to be pure white (useful for colored logos on dark backgrounds)
                                </label>
                            </div>
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
                            <button
                                onClick={generateLink}
                                disabled={isGenerating || !name || !slug}
                                className="w-full mb-6 flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isGenerating ? <><Loader2 size={18} className="animate-spin" /> Generating...</> : 'Generate Short Link'}
                            </button>

                            {generationError && (
                                <p className="text-red-400 text-sm mb-4">{generationError}</p>
                            )}

                            {generatedUrl && (
                                <div>
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
                            )}
                        </div>
                    </div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
