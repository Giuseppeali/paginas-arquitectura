import React from 'react';
import { useBrand } from '../context/BrandContext';

interface LogoProps {
    className?: string;
    align?: 'left' | 'center' | 'right';
    overrideUrl?: string;
    overrideScale?: number;
    overrideInvert?: boolean;
    overrideName?: string;
}

const Logo = ({ className = "", align = "left", overrideUrl, overrideScale, overrideInvert, overrideName }: LogoProps) => {
    const { brand } = useBrand();

    const finalUrl = overrideUrl !== undefined ? overrideUrl : brand.logoUrl;
    const finalScale = overrideScale !== undefined ? overrideScale : (brand.logoScale || 100);
    const finalInvert = overrideInvert !== undefined ? overrideInvert : brand.invertLogo;
    const finalName = overrideName !== undefined ? overrideName : brand.name;

    let displayUrl = finalUrl;
    if (displayUrl && displayUrl.trim().startsWith('<svg')) {
        // Encode raw SVG text to data URI making it safe for the img src
        displayUrl = `data:image/svg+xml;utf8,${encodeURIComponent(displayUrl)}`;
    }

    // Alignment styles
    const justifyClass = align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center';
    const objectPosition = align === 'left' ? 'object-left' : align === 'right' ? 'object-right' : 'object-center';

    // Si el usuario nos pasa una altura explícita (p.ej en Navbar h-6, h-8, etc), la usamos, sino ponemos una por defecto
    const hasHeight = /\bh-\d+/.test(className) || /\bmd:h-\d+/.test(className) || /\bh-full/.test(className);
    const defaultHeight = hasHeight ? '' : 'h-8 md:h-10';

    if (displayUrl) {
        const filterClass = finalInvert ? "brightness-0 invert" : "";

        return (
            <div className={`flex items-center ${justifyClass} overflow-visible ${defaultHeight} ${className}`}>
                <img
                    src={displayUrl}
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


    // Generic fallback: Render text
    return (
        <div className={`flex items-center ${justifyClass} overflow-visible ${defaultHeight} ${className}`}>
            <span
                className={`font-display font-medium tracking-widest uppercase truncate whitespace-nowrap transition-transform duration-300`}
                style={{
                    transform: `scale(${finalScale / 100})`,
                    transformOrigin: align === 'left' ? 'left center' : align === 'right' ? 'right center' : 'center center'
                }}
            >
                {finalName || 'Panel de Control'}
            </span>
        </div>
    );
};

export default Logo;
