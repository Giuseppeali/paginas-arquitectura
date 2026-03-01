import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Loader2, Edit3 } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { supabase } from '../lib/supabaseClient';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from '../utils/translations';
import { cropTransparentPixels } from '../utils/imageCropper';

export default function Generator() {
    const { t } = useTranslation('es'); // Admin pages default to Spanish
    const [name, setName] = useState('');
    const [logo, setLogo] = useState('');
    const [logoScale, setLogoScale] = useState(100);
    const [invertLogo, setInvertLogo] = useState(false);
    const [email, setEmail] = useState('');
    const [language, setLanguage] = useState<'en' | 'es'>('es');
    const [generatedUrl, setGeneratedUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [slug, setSlug] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

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
                    setLogoScale(data.logo_scale ?? 100);
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

    const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setGenerationError('');

        // Si es un SVG puro, lo leemos como texto y lo subimos igual o extraemos el data url
        if (file.type === 'image/svg+xml') {
            const reader = new FileReader();
            reader.onload = async (event) => {
                try {
                    let result = event.target?.result as string;
                    if (result.startsWith('data:application/octet-stream;')) {
                        result = result.replace('data:application/octet-stream;', 'data:image/svg+xml;');
                    }

                    // Podemos guardarlo crudo en estado primero para preview local
                    setLogo(result);
                } catch (err) {
                    console.error("Error setting SVG:", err);
                    setGenerationError('Error procesando SVG.');
                } finally {
                    setIsUploading(false);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                }
            };
            reader.onerror = () => {
                alert('Hubo un error al leer el archivo SVG.');
                setIsUploading(false);
                if (fileInputRef.current) fileInputRef.current.value = '';
            };
            reader.readAsDataURL(file);
            return;
        }

        try {
            // Recorta bordes transparentes y devuelve Data URL (PNG Base 64 local)
            const croppedDataUrl = await cropTransparentPixels(file);

            // Simplemente guardamos para preview local primero, el bucket se sube al "Generar"
            setLogo(croppedDataUrl);
        } catch (err) {
            console.error("Cropping failed:", err);
            setGenerationError('Error al subir. Intente usar un archivo más pequeño o un SVG vector.');
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const handleCropUrl = async () => {
        if (!logo || logo.startsWith('data:image')) return;
        setIsUploading(true);
        try {
            const croppedDataUrl = await cropTransparentPixels(logo);
            setLogo(croppedDataUrl);
        } catch (err) {
            console.error("Cropping from URL failed:", err);
            alert('Falló el recorte desde URL (probablemente por restricciones CORS de ese dominio). Sugerencia: descargue la imagen y súbala como archivo.');
        } finally {
            setIsUploading(false);
        }
    };

    const generateLink = async () => {
        if (!name || !slug) {
            setGenerationError('Client Name and URL Slug are required.');
            return;
        }

        setGenerationError('');
        setIsGenerating(true);

        let finalLogoUrl = logo;

        try {
            // SI el logo actual es un string en base64 (subido localmente o crop locally) y no una URL remota
            if (logo.startsWith('data:image')) {
                // Generar file a partir del base64 para subir a Supabase Bucket
                const response = await fetch(logo);
                const blob = await response.blob();
                const fileExt = blob.type.split('/')[1] || 'png';
                const fileName = `${slug}-${Date.now()}.${fileExt === 'svg+xml' ? 'svg' : fileExt}`;
                const filePath = `client-logos/${fileName}`;

                // Usando un bucket publico llamado 'public_assets'
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('public_assets')
                    .upload(filePath, blob, {
                        cacheControl: '3600',
                        upsert: true
                    });

                if (uploadError) {
                    throw new Error(`Error subiendo imagen: ${uploadError.message}`);
                }

                const { data: publicUrlData } = supabase.storage
                    .from('public_assets')
                    .getPublicUrl(filePath);

                finalLogoUrl = publicUrlData.publicUrl;
            }

            const clientData = {
                slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                name,
                logo: finalLogoUrl,
                logo_scale: logoScale,
                invert_logo: invertLogo,
                email,
                language
            };

            const { data, error } = await supabase
                .from('clients')
                .upsert(clientData, { onConflict: 'slug' })
                .select()
                .single();

            if (error) {
                console.error("Error saving to Supabase:", error);
                throw new Error('Falló al guardar cliente (Error DB / Permisos).');
            } else {
                const baseUrl = window.location.origin;
                setGeneratedUrl(`${baseUrl}/${data.slug}?token=${data.id}`);
            }
        } catch (e: any) {
            console.error(e);
            setGenerationError(e.message || 'Error general al generar el enlace.');
        } finally {
            setIsGenerating(false);
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
                                <div className="flex flex-col gap-3">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={logo}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val.trim().startsWith('<svg')) {
                                                    setLogo(`data:image/svg+xml;utf8,${encodeURIComponent(val)}`);
                                                } else {
                                                    setLogo(val);
                                                }
                                            }}
                                            placeholder="https://example.com/logo.png o pegar <svg..."
                                            className="flex-1 bg-transparent border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                                        />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            ref={fileInputRef}
                                            onChange={handleLogoUpload}
                                        />
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            disabled={isUploading || isGenerating}
                                            className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 whitespace-nowrap text-sm"
                                        >
                                            {isUploading ? <Loader2 size={16} className="animate-spin" /> : t.generator.logoUpload}
                                        </button>
                                    </div>

                                    {logo && !logo.startsWith('data:image') && !logo.includes('supabase.co') && (
                                        <button
                                            onClick={handleCropUrl}
                                            disabled={isUploading || isGenerating}
                                            className="flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-lg text-sm transition-colors disabled:opacity-50"
                                        >
                                            {isUploading ? <Loader2 size={16} className="animate-spin" /> : t.generator.logoRemoveMargins}
                                        </button>
                                    )}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">Leave blank to use the default text logo.</p>

                                {logo && (
                                    <div className="mt-4 p-4 border border-white/10 rounded-lg bg-black/30">
                                        <div className="flex justify-between items-center mb-4">
                                            <label className="text-sm tracking-[0.1em] uppercase text-gray-400">{t.generator.logoScale}: {logoScale}%</label>
                                        </div>
                                        <input
                                            type="range"
                                            min="30"
                                            max="200"
                                            value={logoScale}
                                            onChange={(e) => setLogoScale(parseInt(e.target.value))}
                                            className="w-full accent-white h-1 outline-none mt-1"
                                        />
                                        <div className="mt-6 border border-white/20 rounded-md overflow-hidden relative">
                                            <div className="bg-gray-900/50 p-2 text-[10px] text-gray-500 uppercase tracking-widest border-b border-white/10">
                                                {t.generator.preview} (1:1 Navbar Desktop)
                                            </div>
                                            {/* Fake Navbar - Scrollable to simulate true desktop widths */}
                                            <div
                                                className="w-full transition-colors overflow-x-auto"
                                                style={{ background: invertLogo ? '#fff' : '#050505' }}
                                            >
                                                {/* Inner Container simulating max-w-7xl px-6 md:px-12 but with a min-width to prevent squishing */}
                                                <div className="min-w-[900px] w-full px-8 md:px-12 py-6 flex justify-between items-center">
                                                    {/* Real Logo Component for accurate 1:1 preview */}
                                                    <Logo
                                                        className="h-8 md:h-12 text-white"
                                                        overrideUrl={logo}
                                                        overrideScale={logoScale}
                                                        overrideInvert={invertLogo}
                                                        overrideName={name || 'Preview'}
                                                    />

                                                    {/* Fake Menu Items (visual only) */}
                                                    <div className={`flex space-x-12 text-sm tracking-[0.2em] uppercase font-medium ${invertLogo ? 'text-black/50' : 'text-white/50'}`}>
                                                        <span>ESTUDIO</span>
                                                        <span>PROYECTOS</span>
                                                        <span>CONTACTO</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

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
