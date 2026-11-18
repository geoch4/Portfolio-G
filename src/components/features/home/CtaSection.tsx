'use client';

import Link from 'next/link';
import React from 'react';
import { useI18n } from '@/lib/i18n';

const CtaSection = () => {
    const { t } = useI18n();
    return (
        <section id="contact" className="scroll-mt-28 bg-[#0b1020] py-20 md:py-28 text-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <div className="rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(167,139,250,0.18),transparent_36%),#111827] px-6 py-14 shadow-2xl shadow-black/25 md:px-12">
                <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold mb-4">
                    {t.cta.title}
                </h2>
                <p className="max-w-2xl mx-auto mb-10 text-slate-300 text-lg leading-relaxed">
                    {t.cta.body}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/cv-georgia-chalkia.pdf"
                        download
                        className="rounded-full bg-sky-300 px-8 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200/60"
                    >
                        {t.cta.download}
                    </a>
                    <Link
                        href="/kontakt"
                        className="rounded-full border border-white/20 px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200/40"
                    >
                        {t.cta.contact}
                    </Link>
                </div>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;
