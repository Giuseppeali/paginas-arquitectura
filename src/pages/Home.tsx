import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { brandConfig } from '../config/brand';
import { projects } from '../data/projects';
import { useTranslation } from '../utils/translations';

export default function Home() {
    const { t, lang } = useTranslation(brandConfig.language);
    const { slug } = useParams();
    const prefix = slug ? `/${slug}` : '';
    return (
        <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans selection:bg-white selection:text-black">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Minimalist architecture"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505]"></div>
                </div>

                <div className="relative z-10 text-center px-6 w-full max-w-5xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="font-display text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.9] uppercase"
                    >
                        {t.home.hero.line1}<br />
                        <span className="font-medium">{t.home.hero.line2}</span><br />
                        {t.home.hero.line3}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="mt-12 flex justify-center"
                    >
                        <Link to={`${prefix}/projects`} className="group flex items-center space-x-4 text-sm tracking-[0.2em] uppercase border border-white/30 px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                            <span>{t.home.hero.btn}</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="studio" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
                    <div className="md:col-span-4">
                        <h2 className="text-sm tracking-[0.2em] uppercase text-gray-400 mb-4">{t.home.about.subtitle}</h2>
                        <Logo className="h-10 text-white opacity-80" />
                    </div>
                    <div className="md:col-span-8 md:col-start-6">
                        <p className="text-2xl md:text-4xl font-light leading-snug tracking-tight">
                            {brandConfig.name} {t.home.about.description}
                        </p>
                        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
                            <div>
                                <h3 className="text-4xl font-display mb-2">15+</h3>
                                <p className="text-sm tracking-widest uppercase text-gray-400">{t.home.about.stats.years}</p>
                            </div>
                            <div>
                                <h3 className="text-4xl font-display mb-2">40+</h3>
                                <p className="text-sm tracking-widest uppercase text-gray-400">{t.home.about.stats.projects}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 flex justify-between items-end">
                    <h2 className="text-4xl md:text-6xl font-display font-light tracking-tighter uppercase whitespace-pre-line">{t.home.projects.title}</h2>
                    <Link to={`${prefix}/projects`} className="hidden md:flex items-center space-x-2 text-sm tracking-[0.2em] uppercase hover:text-gray-400 transition-colors">
                        <span>{t.home.projects.viewAll}</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8">
                    {projects.map((project, index) => (
                        <Link to={`${prefix}/projects/${project.id}`} key={project.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-0 left-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-xs tracking-[0.2em] uppercase mb-4 text-gray-300">{project.year} — {project.location[lang]}</p>
                                    <h3 className="text-3xl md:text-5xl font-display uppercase tracking-tight">{project.title[lang]}</h3>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
                <div className="mt-12 flex justify-center md:hidden">
                    <Link to={`${prefix}/projects`} className="flex items-center space-x-2 text-sm tracking-[0.2em] uppercase border border-white/30 px-8 py-4 rounded-full">
                        <span>{t.home.projects.viewAll}</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
