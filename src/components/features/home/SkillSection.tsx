'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import SectionHeader from '@/components/ui/SectionHeader';
import SkillChip from '@/components/ui/SkillChip';

const SkillsSection = () => {
    const { t } = useI18n();
    const skillGroups = t.skills.groups ?? [{ title: t.skills.title, items: t.skills.items }];

    return (
        <>
            <section id="skills" className="scroll-mt-28 bg-[#080b14] py-20 md:py-28">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-14">
                        <SectionHeader eyebrow={t.skills.eyebrow} title={t.skills.title} intro={t.skills.intro} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {skillGroups.map((group) => (
                            <div
                                key={group.title}
                                className="rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-[#131a2a]"
                            >
                                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white">
                                    {group.title}
                                </h3>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <SkillChip key={skill} tone="slate">
                                            {skill}
                                        </SkillChip>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-14 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/15">
                        <span className="text-sm font-semibold tracking-[0.24em] text-sky-300 uppercase">{t.skills.practical}</span>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                            <p><span className="font-semibold text-white">{t.skills.languages}:</span> {t.skills.languagesValue}</p>
                            <p><span className="font-semibold text-white">{t.skills.driving}:</span> {t.skills.yes}</p>
                            <p><span className="font-semibold text-white">{t.skills.availability}:</span> {t.skills.availabilityValue}</p>
                            <p><span className="font-semibold text-white">{t.skills.references}:</span> {t.skills.referencesValue}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#0b1020] py-20 md:py-28">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-[#111827] to-[#1a1230] p-8 shadow-2xl shadow-black/20 md:p-10">
                        <div className="text-center">
                            <span className="text-sm font-semibold tracking-[0.24em] text-violet-200 uppercase">{t.skills.digitalEyebrow}</span>
                            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-white mt-2">
                                {t.skills.digitalTitle}
                            </h2>
                            <p className="text-slate-300 mt-4 max-w-3xl mx-auto leading-relaxed">
                                {t.skills.digitalBody}
                            </p>
                        </div>

                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            {t.skills.digitalItems.map((skill) => (
                                <SkillChip key={skill} tone="violet">
                                    {skill}
                                </SkillChip>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SkillsSection;
