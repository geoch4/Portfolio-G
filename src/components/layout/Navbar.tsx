// src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();

    return (
        <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-slate-900 hover:text-teal-600">
                    Georgia Chalkia
                </Link>

                <div className="flex space-x-6">
                    {/* Nya länkar som scrollar till sektioner på startsidan */}
                    <Link href="/#arbete" className="font-medium text-slate-600 hover:text-teal-600">
                        Arbete
                    </Link>
                    <Link href="/#utbildning" className="font-medium text-slate-600 hover:text-teal-600">
                        Utbildning
                    </Link>
                    <Link href="/#kompetenser" className="font-medium text-slate-600 hover:text-teal-600">
                        Kompetenser
                    </Link>

                    {/* Behåll länken till den separata CV-sidan */}
                    <Link
                        href="/cv"
                        className={`font-medium transition-colors ${pathname === '/cv' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'}`}
                    >
                        CV
                    </Link>
                    <Link
                        href="/kontakt"
                        className={`font-medium transition-colors ${pathname === '/kontakt' ? 'text-teal-600' : 'text-slate-600 hover:text-teal-600'}`}
                    >
                        Kontakt
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;