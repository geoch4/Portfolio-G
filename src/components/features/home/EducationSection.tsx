'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { getLocalizedData } from '@/lib/localizedData';
import SectionHeader from '@/components/ui/SectionHeader';

const EducationSection = () => {
    const { locale, t } = useI18n();
    const { education } = getLocalizedData(locale);
    const mainEducation = education.filter((_, index) => index !== 2);

    return (
        <section id="utbildning" className="scroll-mt-28 bg-[#0b1020] py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-14">
                    <SectionHeader eyebrow={t.education.eyebrow} title={t.education.title} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {mainEducation.map((edu, index) => (
                        <div
                            key={index}
                            className="group rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl shadow-black/15 transition-all duration-300 hover:-translate-y-2 hover:border-sky-300/30 hover:bg-[#131a2a]"
                        >
                            <div className="w-10 h-10 rounded-2xl border border-sky-300/25 bg-sky-300/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:bg-sky-300 group-hover:shadow-lg group-hover:shadow-sky-500/20">
                                <span className="text-sky-200 font-bold text-sm transition-colors group-hover:text-slate-950">{index + 1}</span>
                            </div>
                            <p className="text-xs font-semibold text-sky-300 uppercase tracking-[0.2em]">{edu.period}</p>
                            <h3 className="font-[family-name:var(--font-playfair)] font-bold text-xl text-white mt-3 leading-snug break-words [overflow-wrap:anywhere]">
                                {edu.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
