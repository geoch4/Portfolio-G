// src/app/(site)/layout.tsx
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import React from 'react';
import { I18nProvider } from '@/lib/i18n';

// Denna layout omsluter alla dina sidor (startsida, CV, etc.)
export default function SiteLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        // Vi lägger stylingen för temat HÄR!
        <I18nProvider>
            <div className="flex flex-col min-h-screen bg-stone-50 text-slate-700">
                <Navbar />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
        </I18nProvider>
    );
}
