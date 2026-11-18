'use client';

import Link from 'next/link';
import React from 'react';
import { useI18n } from '@/lib/i18n';
import SectionHeader from '@/components/ui/SectionHeader';
import SkillChip from '@/components/ui/SkillChip';

const tones = ['emerald', 'blue', 'violet'] as const;

const ProfileSection = () => {
    const { t } = useI18n();
    const { profile } = t;

    return (
        <section id="profil" className="scroll-mt-28 bg-[#080b14] py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-14">
                    <SectionHeader eyebrow={profile.eyebrow} title={profile.title} />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {profile.cards.map((card, index) => (
                        <Link
                            key={card.title}
                            href={card.href}
                            className="group rounded-3xl border border-white/10 bg-[#111827] p-7 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:border-sky-300/30 hover:bg-[#131a2a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
                        >
                            <span className="text-xs font-semibold tracking-[0.24em] text-sky-300 uppercase">
                                {card.label}
                            </span>
                            <h3 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-bold text-white">
                                {card.title}
                            </h3>
                            <p className="mt-4 leading-relaxed text-slate-300">
                                {card.body}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {card.items.map((item) => (
                                    <SkillChip key={item} tone={tones[index % tones.length]}>
                                        {item}
                                    </SkillChip>
                                ))}
                            </div>
                            <span className="mt-7 inline-block font-semibold text-sky-200 transition-transform duration-300 group-hover:translate-x-1">
                                {card.link} →
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="font-semibold text-slate-200 mb-4">{profile.rolesTitle}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {profile.roles.map((role) => (
                            <SkillChip key={role} tone="slate">
                                {role}
                            </SkillChip>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileSection;
