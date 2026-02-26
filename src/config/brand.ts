const getUrlOrSessionData = () => {
    if (typeof window === 'undefined') {
        return { name: null, logoUrl: null, email: null, invertLogo: null, language: null };
    }

    const urlParams = new URLSearchParams(window.location.search);
    const urlName = urlParams.get('name');
    const urlLogo = urlParams.get('logo');
    const urlEmail = urlParams.get('email');
    const urlInvert = urlParams.get('invertLogo');
    const urlLang = urlParams.get('language');

    // If URL parameters are present, save them to session storage
    if (urlName !== null) sessionStorage.setItem('brandName', urlName || ''); // empty string to allow clearing
    if (urlLogo !== null) sessionStorage.setItem('brandLogo', urlLogo || '');
    if (urlEmail !== null) sessionStorage.setItem('brandEmail', urlEmail || '');
    if (urlInvert !== null) sessionStorage.setItem('brandInvertLogo', urlInvert || 'false');
    if (urlLang !== null) sessionStorage.setItem('brandLang', urlLang || 'es');

    return {
        name: sessionStorage.getItem('brandName'),
        logoUrl: sessionStorage.getItem('brandLogo'),
        email: sessionStorage.getItem('brandEmail'),
        invertLogo: sessionStorage.getItem('brandInvertLogo') === 'true',
        language: sessionStorage.getItem('brandLang') as 'en' | 'es' | null
    };
};

const dynamicData = getUrlOrSessionData();

export const brandConfig = {
    // Priority: 1. URL/Session parameter -> 2. Environment variable -> 3. Default fallback
    name: dynamicData.name || import.meta.env.VITE_CLIENT_NAME || 'TTO Arquitectura',
    fullName: dynamicData.name || import.meta.env.VITE_CLIENT_NAME || 'TTO Arquitectura S.C.',
    logoUrl: dynamicData.logoUrl || import.meta.env.VITE_CLIENT_LOGO || '',
    email: dynamicData.email || import.meta.env.VITE_CLIENT_EMAIL || 'hola@ttoarquitectura.com',
    invertLogo: dynamicData.invertLogo || import.meta.env.VITE_CLIENT_INVERT_LOGO === 'true',
    language: dynamicData.language || 'es' as 'en' | 'es'
};
