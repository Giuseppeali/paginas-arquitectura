import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projects } from '../data/projects';
import { brandConfig } from '../config/brand';
import { useTranslation } from '../utils/translations';

export default function Projects() {
    const { t, lang } = useTranslation(brandConfig.language);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans selection:bg-white selection:text-black pt-32">
            <Navbar />

            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-display font-light tracking-tighter uppercase whitespace-pre-line"
                    >
                        {t.projects.title}
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8 max-w-[1600px] mx-auto">
                    {projects.map((project, index) => (
                        <Link to={`/projects/${project.id}`} key={project.id}>
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
                                    <p className="text-xs tracking-[0.2em] uppercase mb-2 text-gray-300">{project.year} — {project.location[lang]}</p>
                                    <h3 className="text-2xl md:text-3xl font-display uppercase tracking-tight">{project.title[lang]}</h3>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
}
