/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLIENT_NAME: string;
    readonly VITE_CLIENT_FULLNAME: string;
    readonly VITE_CLIENT_LOGO: string;
    readonly VITE_CLIENT_EMAIL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
