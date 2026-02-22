import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <>
            <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md py-4 border-b border-white/5' : 'py-8'}`}>
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    <Link to="/" className="z-50 relative">
                        <Logo className="h-6 md:h-8 text-white" />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-12 text-sm tracking-[0.2em] uppercase font-medium">
                        {isHome ? (
                            <>
                                <a href="#studio" className="hover:text-gray-400 transition-colors">Studio</a>
                                <Link to="/projects" className="hover:text-gray-400 transition-colors">Projects</Link>
                            </>
                        ) : (
                            <>
                                <a href="/#studio" className="hover:text-gray-400 transition-colors">Studio</a>
                                <Link to="/projects" className="hover:text-gray-400 transition-colors">Projects</Link>
                            </>
                        )}
                        <Link to="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
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
                        <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display tracking-widest uppercase hover:text-gray-400 transition-colors">Home</Link>
                        <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-3xl font-display tracking-widest uppercase hover:text-gray-400 transition-colors">Contact</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
