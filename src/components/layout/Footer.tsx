'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const { t } = useI18n();

    return (
        <footer className="border-t border-white/10 bg-[#080b14] text-slate-300">
            <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="font-[family-name:var(--font-playfair)] text-lg font-semibold text-white">
                    Georgia Chalkia
                </p>
                <p className="text-sm text-teal-300">
                    &copy; {currentYear} Georgia Chalkia — {t.footer}
                </p>
                <a
                    href="https://www.linkedin.com/in/georgia-chalkia-72035317b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sky-300 underline-offset-4 transition-all duration-300 hover:text-white hover:underline motion-safe:hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-200 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080b14] rounded-sm"
                >
                    LinkedIn
                </a>
            </div>
        </footer>
    );
};

export default Footer;
