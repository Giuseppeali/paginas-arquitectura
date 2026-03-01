import React, { createContext, useContext, useEffect, useState } from 'react';

interface BrandConfig {
    name: string;
    fullName: string;
    logoUrl: string | null;
    email: string | null;
    invertLogo: boolean;
    language: 'en' | 'es';
    logoScale: number;
}

interface BrandContextType {
    brand: BrandConfig;
    setBrand: (config: Partial<BrandConfig>) => void;
}

const getInitialBrandState = (): BrandConfig => {
    if (typeof window === 'undefined') {
        return { name: 'Panel de Control', fullName: 'Panel de Control', logoUrl: null, email: null, invertLogo: false, language: 'es', logoScale: 100 };
    }

    return {
        name: localStorage.getItem('brandName') || import.meta.env.VITE_CLIENT_NAME || 'Panel de Control',
        fullName: localStorage.getItem('brandName') || import.meta.env.VITE_CLIENT_NAME || 'Panel de Control',
        logoUrl: localStorage.getItem('brandLogo') || import.meta.env.VITE_CLIENT_LOGO || '',
        email: localStorage.getItem('brandEmail') || import.meta.env.VITE_CLIENT_EMAIL || '',
        invertLogo: localStorage.getItem('brandInvertLogo') === 'true' || import.meta.env.VITE_CLIENT_INVERT_LOGO === 'true',
        language: (localStorage.getItem('brandLang') as 'en' | 'es') || 'es',
        logoScale: localStorage.getItem('brandLogoScale') ? parseInt(localStorage.getItem('brandLogoScale')!) : parseInt(import.meta.env.VITE_CLIENT_LOGO_SCALE || '100')
    };
};

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export const BrandProvider = ({ children }: { children: React.ReactNode }) => {
    const [brand, setBrandState] = useState<BrandConfig>(getInitialBrandState());

    const setBrand = (newConfig: Partial<BrandConfig>) => {
        setBrandState(prev => {
            const updated = { ...prev, ...newConfig };

            // Sync with local storage
            if (newConfig.name !== undefined) localStorage.setItem('brandName', newConfig.name);
            if (newConfig.logoUrl !== undefined) localStorage.setItem('brandLogo', newConfig.logoUrl || '');
            if (newConfig.email !== undefined) localStorage.setItem('brandEmail', newConfig.email || '');
            if (newConfig.invertLogo !== undefined) localStorage.setItem('brandInvertLogo', newConfig.invertLogo ? 'true' : 'false');
            if (newConfig.language !== undefined) localStorage.setItem('brandLang', newConfig.language);
            if (newConfig.logoScale !== undefined) localStorage.setItem('brandLogoScale', newConfig.logoScale.toString());

            return updated;
        });
    };

    return (
        <BrandContext.Provider value={{ brand, setBrand }}>
            {children}
        </BrandContext.Provider>
    );
};

export const useBrand = () => {
    const context = useContext(BrandContext);
    if (!context) {
        throw new Error("useBrand must be used within a BrandProvider");
    }
    return context;
};
