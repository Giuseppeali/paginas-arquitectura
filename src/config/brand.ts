const getUrlOrSessionData = () => {
    if (typeof window === 'undefined') {
        return { name: null, logoUrl: null, email: null, invertLogo: null, language: null, logoScale: null };
    }

    const urlParams = new URLSearchParams(window.location.search);
    const urlName = urlParams.get('name');
    const urlLogo = urlParams.get('logo');
    const urlEmail = urlParams.get('email');
    const urlInvert = urlParams.get('invertLogo');
    const urlLang = urlParams.get('language');
    const urlScale = urlParams.get('logoScale');

    // If URL parameters are present, save them to local storage
    if (urlName !== null) localStorage.setItem('brandName', urlName || ''); // empty string to allow clearing
    if (urlLogo !== null) localStorage.setItem('brandLogo', urlLogo || '');
    if (urlEmail !== null) localStorage.setItem('brandEmail', urlEmail || '');
    if (urlInvert !== null) localStorage.setItem('brandInvertLogo', urlInvert || 'false');
    if (urlLang !== null) localStorage.setItem('brandLang', urlLang || 'es');
    if (urlScale !== null) localStorage.setItem('brandLogoScale', urlScale || '100');

    return {
        name: localStorage.getItem('brandName'),
        logoUrl: localStorage.getItem('brandLogo'),
        email: localStorage.getItem('brandEmail'),
        invertLogo: localStorage.getItem('brandInvertLogo') === 'true',
        language: localStorage.getItem('brandLang') as 'en' | 'es' | null,
        logoScale: localStorage.getItem('brandLogoScale') ? parseInt(localStorage.getItem('brandLogoScale')!) : null
    };
};

const dynamicData = getUrlOrSessionData();

export const brandConfig = {
    // Priority: 1. URL/Session parameter -> 2. Environment variable -> 3. Default fallback
    name: dynamicData.name || import.meta.env.VITE_CLIENT_NAME || 'Panel de Control',
    fullName: dynamicData.name || import.meta.env.VITE_CLIENT_NAME || 'Panel de Control',
    logoUrl: dynamicData.logoUrl || import.meta.env.VITE_CLIENT_LOGO || '',
    email: dynamicData.email || import.meta.env.VITE_CLIENT_EMAIL || '',
    invertLogo: dynamicData.invertLogo || import.meta.env.VITE_CLIENT_INVERT_LOGO === 'true',
    language: dynamicData.language || 'es' as 'en' | 'es',
    logoScale: dynamicData.logoScale || parseInt(import.meta.env.VITE_CLIENT_LOGO_SCALE || '100')
};

