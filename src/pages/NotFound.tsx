import React from 'react';
import { motion } from 'motion/react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex flex-col items-center justify-center font-sans relative overflow-hidden px-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 text-center flex flex-col items-center max-w-lg"
            >
                <h1 className="text-7xl md:text-9xl font-display font-light tracking-tighter mb-6">
                    404
                </h1>

                <h2 className="text-sm md:text-base tracking-[0.3em] uppercase text-gray-400 mb-8 font-medium leading-relaxed">
                    ENLACE INVÁLIDO O<br />PÁGINA NO ENCONTRADA
                </h2>

                <p className="text-gray-500 font-light mb-12 text-center text-sm md:text-base">
                    Este enlace de portafolio ha expirado, no tienes permisos para verlo, o la ruta que buscas no existe.
                </p>
            </motion.div>
        </div>
    );
}
