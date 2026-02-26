import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Copy, Check, Trash2, Loader2, Plus, Edit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useTranslation } from '../utils/translations';

interface Client {
    id: string;
    slug: string;
    name: string;
    email: string;
    logo: string;
    created_at: string;
}

export default function Admin() {
    const { signOut } = useAuth();
    const { t } = useTranslation('es'); // Admin defaults to Spanish
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('clients')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) {
            setClients(data);
        }
        setLoading(false);
    };

    const handleDelete = async (slug: string) => {
        if (!window.confirm(`${t.admin.deleteConfirm} "${slug}"?`)) return;

        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('slug', slug);

        if (!error) {
            setClients(clients.filter(c => c.slug !== slug));
        } else {
            alert('Failed to delete client');
        }
    };

    const handleCopy = (slug: string) => {
        const url = `${window.location.origin}/${slug}`;
        navigator.clipboard.writeText(url);
        setCopiedSlug(slug);
        setTimeout(() => setCopiedSlug(null), 2000);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans">
            <Navbar />
            <section className="py-32 px-6 md:px-12 max-w-6xl mx-auto min-h-[80vh]">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-display uppercase tracking-tight mb-2">{t.admin.title}</h1>
                        <p className="text-gray-400 font-light">{t.admin.subtitle}</p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/generator" className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                            <Plus size={18} /> {t.admin.newLink}
                        </Link>
                        <button onClick={signOut} className="px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors">
                            {t.admin.signOut}
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 size={32} className="animate-spin text-gray-500" />
                    </div>
                ) : clients.length === 0 ? (
                    <div className="text-center py-20 border border-white/10 border-dashed rounded-2xl">
                        <p className="text-gray-500 mb-4">{t.admin.empty}</p>
                        <Link to="/generator" className="text-white border-b border-white/30 pb-1 hover:border-white transition-colors">{t.admin.createFirst}</Link>
                    </div>
                ) : (
                    <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-xs tracking-[0.2em] uppercase text-gray-500">
                                    <th className="p-6 font-normal">{t.admin.colName}</th>
                                    <th className="p-6 font-normal">{t.admin.colSlug}</th>
                                    <th className="p-6 font-normal">{t.admin.colLanguage}</th>
                                    <th className="p-6 font-normal">{t.admin.colCreated}</th>
                                    <th className="p-6 font-normal text-right">{t.admin.colActions}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map(client => (
                                    <tr key={client.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                        <td className="p-6">
                                            <div className="font-medium text-white">{client.name}</div>
                                            {client.email && <div className="text-sm text-gray-500">{client.email}</div>}
                                        </td>
                                        <td className="p-6">
                                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs font-mono text-gray-300">
                                                /{client.slug}
                                            </span>
                                        </td>
                                        <td className="p-6">
                                            <span className="uppercase text-xs font-semibold tracking-widest text-gray-400">
                                                {((client as any).language || 'es') === 'en' ? 'English' : 'Español'}
                                            </span>
                                        </td>
                                        <td className="p-6 text-sm text-gray-400">
                                            {new Date(client.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="p-6 text-right">
                                            <div className="flex justify-end gap-3">
                                                <Link
                                                    to={`/generator?edit=${client.slug}`}
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white"
                                                    title="Edit Link"
                                                >
                                                    <Edit2 size={18} />
                                                </Link>
                                                <button
                                                    onClick={() => handleCopy(client.slug)}
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white"
                                                    title="Copy Link"
                                                >
                                                    {copiedSlug === client.slug ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(client.slug)}
                                                    className="p-2 bg-white/5 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors text-gray-400"
                                                    title="Delete Link"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
            <Footer />
        </div>
    );
}
