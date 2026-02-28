import React from 'react';
import { brandConfig } from '../config/brand';

interface LogoProps {
    className?: string;
    align?: 'left' | 'center' | 'right';
    overrideUrl?: string;
    overrideScale?: number;
    overrideInvert?: boolean;
    overrideName?: string;
}

const Logo = ({ className = "", align = "left", overrideUrl, overrideScale, overrideInvert, overrideName }: LogoProps) => {
    const finalUrl = overrideUrl !== undefined ? overrideUrl : brandConfig.logoUrl;
    const finalScale = overrideScale !== undefined ? overrideScale : (brandConfig.logoScale || 100);
    const finalInvert = overrideInvert !== undefined ? overrideInvert : brandConfig.invertLogo;
    const finalName = overrideName !== undefined ? overrideName : brandConfig.name;

    if (finalUrl) {
        const filterClass = finalInvert ? "brightness-0 invert" : "";
        // Alignment styles
        const justifyClass = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';
        const objectPosition = align === 'left' ? 'object-left' : align === 'right' ? 'object-right' : 'object-center';

        // Si el usuario nos pasa una altura explícita (p.ej en Navbar h-6, h-8, etc), la usamos, sino ponemos una por defecto
        const hasHeight = /\bh-\d+/.test(className) || /\bmd:h-\d+/.test(className) || /\bh-full/.test(className);
        const defaultHeight = hasHeight ? '' : 'h-8 md:h-10';

        return (
            <div className={`flex items-center ${justifyClass} overflow-visible ${defaultHeight} ${className}`}>
                <img
                    src={finalUrl}
                    alt={finalName}
                    /* Al fijar un max-width relativo a ems o rems estrictos, evitamos que los logos cuadrados se vean gigantes 
                       mientras permitimos que los logos horizontales tengan suficiente espacio visual. */
                    className={`h-[90%] md:h-full w-auto max-w-[140px] sm:max-w-[170px] md:max-w-[200px] lg:max-w-[280px] object-contain ${objectPosition} ${filterClass} transition-transform duration-300`}
                    style={{
                        transform: `scale(${finalScale / 100})`,
                        transformOrigin: align === 'left' ? 'left center' : align === 'right' ? 'right center' : 'center center'
                    }}
                />
            </div>
        );
    }

    return (
        <svg viewBox="0 0 180 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
            <rect x="0" y="0" width="160" height="12" />
            <rect x="25" y="12" width="12" height="48" />
            <rect x="65" y="12" width="12" height="48" />
            <rect x="105" y="12" width="12" height="48" />
            <rect x="105" y="48" width="55" height="12" />
            <rect x="148" y="12" width="12" height="48" />
            <circle cx="170" cy="54" r="4" stroke="currentColor" strokeWidth="1" fill="none" />
            <text x="170" y="56" fontSize="5" fontFamily="sans-serif" textAnchor="middle" fill="currentColor">R</text>
        </svg>
    );
};

export default Logo;
