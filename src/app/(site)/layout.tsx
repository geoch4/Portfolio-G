// src/app/(site)/layout.tsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import React from 'react';

// Denna layout omsluter alla dina sidor (startsida, CV, etc.)
export default function SiteLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        // Vi lägger stylingen för temat HÄR!
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-700">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}