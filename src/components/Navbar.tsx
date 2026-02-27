import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useTranslation } from '../utils/translations';
import { brandConfig } from '../config/brand';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { t } = useTranslation(brandConfig.language);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Get client slug from current URL for routing back to white-label home instead of root
    const pathParts = location.pathname.split('/').filter(Boolean);
    const clientToken = sessionStorage.getItem('client_token');
    // If no client token, we are an admin, default to root. Otherwise, use the first path part as the client slug.
    const clientSlug = clientToken ? pathParts[0] || '' : '';
    
    // The "Home" for a client is /:slug, but for an admin it could be /
    const homePath = clientSlug ? `/${clientSlug}` : '/';
    const isHome = location.pathname === homePath || location.pathname === '/';

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md py-4 border-white/5' : 'py-8 border-transparent'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    <Link to={homePath} className="z-50 relative">
                        <Logo className="h-6 md:h-8 text-white" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-12 text-sm tracking-[0.2em] uppercase font-medium">
                        {isHome ? (
                            <>
                                <a href="#studio" className="hover:text-gray-400 transition-colors">{t.nav.studio}</a>
                                <Link to="/projects" className="hover:text-gray-400 transition-colors">{t.nav.projects}</Link>
                            </>
                        ) : (
                            <>
                                <Link to={`${homePath}#studio`} className="hover:text-gray-400 transition-colors">{t.nav.studio}</Link>
                                <Link to="/projects" className="hover:text-gray-400 transition-colors">{t.nav.projects}</Link>
                            </>
                        )}
                        <Link to="/contact" className="hover:text-gray-400 transition-colors">{t.nav.contact}</Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 relative text-white"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-[#050505] z-40 flex flex-col justify-center items-center space-y-8"
                    >
                        <Link to={homePath} onClick={() => setIsMenuOpen(false)} className="text-3xl font-display tracking-widest uppercase hover:text-gray-400 transition-colors">Home</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display tracking-widest uppercase hover:text-gray-400 transition-colors">{t.nav.contact}</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
