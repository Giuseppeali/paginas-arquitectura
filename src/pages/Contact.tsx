import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Instagram, Linkedin, Mail, ChevronDown } from 'lucide-react';
import Logo from '../components/Logo';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useBrand } from '../context/BrandContext';
import { useTranslation } from '../utils/translations';

export default function Contact() {
    const { brand } = useBrand();
    const { t } = useTranslation(brand.language);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans selection:bg-white selection:text-black flex flex-col">
            <Navbar />

            <main className="flex-grow pt-40 md:pt-48 pb-32 px-6 md:px-12 max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col justify-center"
                    >
                        <h1 className="text-5xl md:text-7xl font-display font-light tracking-tighter uppercase mb-8 whitespace-pre-line">
                            {t.contact.title}
                        </h1>

                        <p className="text-lg font-light leading-relaxed text-gray-300 mb-12 max-w-md">
                            {t.contact.subtitle}
                        </p>

                        <div className="space-y-10">
                            <div>
                                <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">Email Us</h4>
                                <a href={`mailto:${brand.email}`} className="text-xl md:text-2xl border-b border-white/30 pb-1 hover:border-white transition-colors inline-block">
                                    {brand.email}
                                </a>
                            </div>

                            <div>
                                <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">{t.contact.offices}</h4>
                                <address className="not-italic text-lg font-light leading-relaxed text-gray-300">
                                    Avenida Paseo de la Reforma, 45<br />
                                    06600 Mexico City<br />
                                    Mexico<br />
                                    <br />
                                    +52 55 1234 5678
                                </address>
                            </div>

                            <div>
                                <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-4">{t.footer.social}</h4>
                                <div className="flex space-x-6">
                                    <a href="#" className="hover:text-white transition-colors flex items-center space-x-2 text-gray-300">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className="hover:text-white transition-colors flex items-center space-x-2 text-gray-300">
                                        <Linkedin size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col justify-center bg-[#0a0a0a] p-8 md:p-12 border border-white/5 rounded-2xl"
                    >
                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-xs tracking-[0.2em] uppercase text-gray-500 block">{t.contact.form.name}</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs tracking-[0.2em] uppercase text-gray-500 block">{t.contact.form.email}</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div className="space-y-2 relative">
                                <label htmlFor="subject" className="text-xs tracking-[0.2em] uppercase text-gray-500 block">Subject</label>
                                <div className="relative">
                                    <select
                                        id="subject"
                                        defaultValue=""
                                        className="w-full bg-transparent border-b border-white/20 pb-2 text-gray-300 focus:outline-none focus:border-white transition-colors appearance-none cursor-pointer pr-8"
                                        required
                                    >
                                        <option value="" disabled className="bg-[#0a0a0a]">Select a subject</option>
                                        <option value="residential" className="bg-[#0a0a0a]">Residential Project</option>
                                        <option value="commercial" className="bg-[#0a0a0a]">Commercial Project</option>
                                        <option value="press" className="bg-[#0a0a0a]">Press & Media</option>
                                        <option value="other" className="bg-[#0a0a0a]">Other</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-xs tracking-[0.2em] uppercase text-gray-500 block">{t.contact.form.message}</label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="w-full bg-transparent border-b border-white/20 pb-2 text-white placeholder-gray-600 focus:outline-none focus:border-white transition-colors resize-none"
                                    placeholder="Tell us about your project..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="group w-full flex items-center justify-center space-x-4 text-sm tracking-[0.2em] uppercase bg-white text-black py-4 rounded-full hover:bg-gray-200 transition-colors mt-4"
                            >
                                <span>{t.contact.form.send}</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </main>

            <Footer />
        </div>
    );
}
