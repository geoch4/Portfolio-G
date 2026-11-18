'use client';

import Link from 'next/link';
import React from 'react';
import { useI18n } from '@/lib/i18n';
import SectionHeader from '@/components/ui/SectionHeader';
import SkillChip from '@/components/ui/SkillChip';

const HybridProfileSection = () => {
    const { t } = useI18n();
    const hybrid = t.hybrid;

    if (!hybrid) return null;

    return (
        <section id="expertise" className="scroll-mt-28 bg-[#080b14] py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-14">
                    <SectionHeader eyebrow={hybrid.eyebrow} title={hybrid.title} intro={hybrid.intro} />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {hybrid.tracks.map((track, index) => (
                        <Link
                            key={track.title}
                            href={track.href}
                            className="group rounded-3xl border border-white/10 bg-[#111827] p-7 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:border-sky-300/30 hover:bg-[#131a2a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
                        >
                            <span className="text-xs font-semibold tracking-[0.24em] text-sky-300 uppercase">
                                {track.label}
                            </span>
                            <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-white">
                                {track.title}
                            </h3>
                            <p className="mt-4 leading-relaxed text-slate-300">
                                {track.body}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {track.items.map((item) => (
                                    <SkillChip key={item} tone={index === 0 ? 'emerald' : index === 1 ? 'blue' : 'violet'}>
                                        {item}
                                    </SkillChip>
                                ))}
                            </div>
                            <span className="mt-7 inline-block font-semibold text-sky-200 transition-transform duration-300 group-hover:translate-x-1">
                                {track.link} →
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] via-[#101a33] to-[#1a1230] p-8 text-white shadow-2xl shadow-black/25 md:p-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <span className="text-sm font-semibold tracking-[0.24em] text-violet-200 uppercase">
                            {hybrid.synergyEyebrow}
                        </span>
                        <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold mt-2">
                            {hybrid.synergyTitle}
                        </h2>
                        <p className="mt-4 text-slate-300 leading-relaxed">
                            {hybrid.synergyBody}
                        </p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {hybrid.synergyCards.map((card) => (
                            <div
                                key={card.title}
                                className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08]"
                            >
                                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold">
                                    {card.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                                    {card.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center">
                        <p className="font-semibold text-slate-200 mb-4">{hybrid.rolesTitle}</p>
                        <div className="flex flex-wrap justify-center gap-2">
                            {hybrid.roles.map((role) => (
                                <SkillChip key={role} tone="slate">
                                    {role}
                                </SkillChip>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HybridProfileSection;
