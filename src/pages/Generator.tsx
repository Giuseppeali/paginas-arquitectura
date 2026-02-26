import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Loader2, Edit3 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from '../utils/translations';

export default function Generator() {
    const { t } = useTranslation('es'); // Admin pages default to Spanish
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [invertLogo, setInvertLogo] = useState(false);
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState<'en' | 'es'>('es');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [slug, setSlug] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState('');

    // Edit mode states
    const [searchParams] = useSearchParams();
    const editSlug = searchParams.get('edit');
    const isEditMode = !!editSlug;
    const [isLoadingEdit, setIsLoadingEdit] = useState(isEditMode);

    useEffect(() => {
        if (isEditMode && editSlug) {
            // Fetch existing data for the slug
            const fetchClientForEdit = async () => {
                const { data, error } = await supabase
                    .from('clients')
                    .select('*')
                    .eq('slug', editSlug)
                    .single();

                if (data && !error) {
                    setName(data.name || '');
                    setSlug(data.slug || '');
                    setLogo(data.logo || '');
                    setInvertLogo(data.invert_logo || false);
                    setEmail(data.email || '');
                    setLanguage(data.language || 'es');
                } else {
                    setGenerationError('Failed to load client data for editing.');
                }
                setIsLoadingEdit(false);
            };

            fetchClientForEdit();
        }
    }, [editSlug, isEditMode]);

    useEffect(() => {
        // Auto-generate a slug from the name if the slug hasn't been manually edited.
        // If we are in edit mode, do not auto-generate the slug to avoid shifting it
        if (isEditMode) return;

        if (name) {
            setSlug(name.toLowerCase().replace(/[^a-z0-9-]/g, '-'));
        } else {
            setSlug('');
        }
    }, [name, isEditMode]);

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
            email,
            language
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
            setGeneratedUrl(`${baseUrl}/${data.slug}?token=${data.id}`);
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
                    <div className="flex items-center gap-4 mb-4">
                        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight">{isEditMode ? t.generator.editTitle : t.generator.title}</h1>
                        {isEditMode && <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase border border-white/20">{t.generator.editMode}</span>}
                    </div>
                    <p className="text-gray-400 font-light mb-12">
                        {isEditMode ? t.generator.editDescription : t.generator.description}
                    </p>

                    {isLoadingEdit ? (
                        <div className="flex justify-center items-center py-20 bg-[#0a0a0a] rounded-2xl border border-white/10">
                            <Loader2 size={32} className="animate-spin text-gray-400" />
                        </div>
                    ) : (
                        <div className="space-y-8 bg-[#0a0a0a] p-8 rounded-2xl border border-white/10">
                            <div>
                                <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">{t.generator.name}</label>
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
                                <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">{t.generator.slug} <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                                    placeholder="e.g. acme-architects"
                                    disabled={isEditMode}
                                    className={`w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors ${isEditMode ? 'opacity-50 cursor-not-allowed bg-black/50' : ''}`}
                                />
                                <p className="text-xs text-gray-500 mt-2">
                                    {isEditMode ? t.generator.slugEditHint : <>{t.generator.slugHint}<strong>{slug || 'acme-architects'}</strong></>}
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">{t.generator.logo}</label>
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
                                        {t.generator.invertLogo}
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">{t.generator.email}</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="hola@acme.com"
                                    className="w-full bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-3">{t.generator.language}</label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value as 'en' | 'es')}
                                    className="w-full bg-[#0a0a0a] border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                >
                                    <option value="es">Español</option>
                                    <option value="en">English</option>
                                </select>
                            </div>

                            <div className="pt-8 border-t border-white/10">
                                <button
                                    onClick={generateLink}
                                    disabled={isGenerating || !name || !slug}
                                    className="w-full mb-6 flex items-center justify-center gap-2 bg-white text-black px-6 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isGenerating ? <><Loader2 size={18} className="animate-spin" /> {isEditMode ? t.generator.updating : t.generator.generating}</> : (isEditMode ? <><Edit3 size={18} /> {t.generator.btnUpdate}</> : t.generator.btnGenerate)}
                                </button>

                                {generationError && (
                                    <p className="text-red-400 text-sm mb-4">{generationError}</p>
                                )}

                                {generatedUrl && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2">
                                        <label className="block text-xs tracking-[0.2em] uppercase text-emerald-500 font-medium mb-3">{isEditMode ? t.generator.successUpdate : t.generator.successGenerate}</label>
                                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                            <div className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3 overflow-x-auto whitespace-nowrap text-emerald-400 font-mono text-sm">
                                                {generatedUrl}
                                            </div>
                                            <button
                                                onClick={handleCopy}
                                                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors sm:w-32"
                                            >
                                                {copied ? <><Check size={18} /> {t.generator.copied}</> : <><Copy size={18} /> {t.generator.copy}</>}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
