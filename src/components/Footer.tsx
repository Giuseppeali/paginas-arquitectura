import React from 'react';
import { Instagram, Linkedin } from 'lucide-react';
import Logo from './Logo';
import { brandConfig } from '../config/brand';

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#0a0a0a] pt-32 pb-12 border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
                    <div className="lg:col-span-2">
                        <Logo className="h-8 text-white mb-8" />
                        <p className="text-2xl md:text-4xl font-display font-light tracking-tighter leading-tight mb-8 max-w-md">
                            Have a project in mind? Let's talk.
                        </p>
                        <a href={`mailto:${brandConfig.email}`} className="text-lg border-b border-white/30 pb-1 hover:border-white transition-colors">
                            {brandConfig.email}
                        </a>
                    </div>

                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-6">Office</h4>
                        <address className="not-italic text-sm leading-relaxed text-gray-300">
                            Avenida Paseo de la Reforma, 45<br />
                            06600 Mexico City<br />
                            Mexico<br />
                            <br />
                            +52 55 1234 5678
                        </address>
                    </div>

                    <div>
                        <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-6">Social</h4>
                        <div className="flex flex-col space-y-4 text-sm text-gray-300">
                            <a href="#" className="hover:text-white transition-colors flex items-center space-x-2">
                                <Instagram size={16} />
                                <span>Instagram</span>
                            </a>
                            <a href="#" className="hover:text-white transition-colors flex items-center space-x-2">
                                <Linkedin size={16} />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-500 tracking-widest uppercase">
                    <p>&copy; {new Date().getFullYear()} {brandConfig.fullName}.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Legal Notice</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
