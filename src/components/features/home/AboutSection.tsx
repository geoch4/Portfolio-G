'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import SectionHeader from '@/components/ui/SectionHeader';

const AboutSection = () => {
    const { t } = useI18n();

    return (
        <section id="about" className="scroll-mt-28 bg-[#0b1020] py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <SectionHeader
                        eyebrow={t.about.eyebrow}
                        title={t.about.title}
                        intro={t.about.intro}
                        align="left"
                    />

                    <div className="grid gap-4">
                        {t.about.pillars.map((pillar, index) => (
                            <article
                                key={pillar.title}
                                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/35 hover:bg-white/[0.07]"
                            >
                                <div className="flex items-start gap-4">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-sky-300/25 bg-sky-300/10 text-sm font-bold text-sky-200">
                                        0{index + 1}
                                    </span>
                                    <div>
                                        <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white">
                                            {pillar.title}
                                        </h3>
                                        <p className="mt-2 leading-relaxed text-slate-300">
                                            {pillar.body}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
