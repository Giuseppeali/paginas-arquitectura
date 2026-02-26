import React from 'react';

export default function Unauthorized() {
    return (
        <div className="min-h-screen bg-[#050505] text-[#f5f5f5] flex items-center justify-center font-sans">
            <div className="text-center">
                <h1 className="text-sm tracking-[0.3em] uppercase text-red-500 mb-4 font-medium">Access Denied</h1>
                <p className="text-xs tracking-widest text-gray-500 uppercase">This portfolio link is invalid or requires permission.</p>
            </div>
        </div>
    );
}
