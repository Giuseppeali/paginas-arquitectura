import React from 'react';
import { brandConfig } from '../config/brand';

const Logo = ({ className = "" }: { className?: string }) => {
    if (brandConfig.logoUrl) {
        const imageClasses = className.replace(/\b(h|w)-\d+\b/g, '').replace(/\bmd:(h|w)-\d+\b/g, '').trim();
        return <img src={brandConfig.logoUrl} alt={brandConfig.name} className={`max-h-12 md:max-h-16 w-auto object-contain ${imageClasses}`} />;
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
