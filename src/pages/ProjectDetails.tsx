import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { projects, Project } from '../data/projects';

export default function ProjectDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (id) {
            const foundProject = projects.find(p => p.id === parseInt(id));
            if (foundProject) {
                setProject(foundProject);
            } else {
                navigate('/projects');
            }
        }
    }, [id, navigate]);

    if (!project) return null;

    return (
        <div className="min-h-screen bg-[#050505] text-[#f5f5f5] font-sans selection:bg-white selection:text-black">
            <Navbar />

            {/* Hero Image */}
            <div className="relative h-[70vh] md:h-screen w-full mt-20 md:mt-0">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 max-w-7xl mx-auto z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-sm tracking-[0.2em] uppercase mb-4 text-gray-300">
                            {project.year} — {project.location}
                        </p>
                        <h1 className="text-5xl md:text-8xl font-display uppercase tracking-tighter leading-[0.9]">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content Segment */}
            <section className="py-20 md:py-32 px-6 md:px-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
                    {/* Details Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="md:col-span-4"
                    >
                        <Link
                            to="/projects"
                            className="inline-flex items-center space-x-2 text-sm tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors mb-16"
                        >
                            <ArrowLeft size={16} />
                            <span>Back to Projects</span>
                        </Link>

                        <div className="space-y-8 border-t border-white/10 pt-8">
                            <div>
                                <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">Typology</h4>
                                <p className="text-lg font-light">{project.details.typology}</p>
                            </div>
                            <div>
                                <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">Area</h4>
                                <p className="text-lg font-light">{project.details.area}</p>
                            </div>
                            <div>
                                <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">Status</h4>
                                <p className="text-lg font-light">{project.details.status}</p>
                            </div>
                            <div>
                                <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">Year</h4>
                                <p className="text-lg font-light">{project.year}</p>
                            </div>
                            <div>
                                <h4 className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-2">Location</h4>
                                <p className="text-lg font-light">{project.location}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Description Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:col-span-8"
                    >
                        <h3 className="text-2xl font-light mb-8 text-gray-400">Project Overview</h3>
                        <p className="text-2xl md:text-3xl font-light leading-snug tracking-tight">
                            {project.description}
                        </p>

                        <div className="mt-24">
                            <img
                                src={project.image}
                                alt={`${project.title} detail view 1`}
                                className="w-full aspect-[16/9] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
