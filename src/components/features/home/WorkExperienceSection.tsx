'use client';

import Link from 'next/link';
import React from 'react';
import { useI18n } from '@/lib/i18n';
import { getLocalizedData } from '@/lib/localizedData';
import SectionHeader from '@/components/ui/SectionHeader';
import SkillChip from '@/components/ui/SkillChip';

const getWorkTags = (title: string, description: string[]) => {
    const text = `${title} ${description.join(' ')}`.toLowerCase();
    const tags: string[] = ['Healthcare'];

    if (text.includes('forsk') || text.includes('research') || text.includes('gcp')) tags.push('Research');
    if (text.includes('vaccin') || text.includes('hpv')) tags.push('Life Science');
    if (text.includes('samord') || text.includes('ansvar') || text.includes('drift') || text.includes('introduktion')) tags.push('Leadership');
    if (text.includes('kommunikation') || text.includes('rådgivning') || text.includes('collaborat') || text.includes('samarbet')) tags.push('Communication');
    if (text.includes('dokumentation') || text.includes('digital')) tags.push('Digitalisation');

    return [...new Set(tags)].slice(0, 4);
};

const WorkExperienceSection = () => {
    const { locale, t } = useI18n();
    const { work } = getLocalizedData(locale);
    const latestWork = work.slice(0, 4);

    return (
        <section id="arbete" className="scroll-mt-28 bg-[#080b14] py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-14">
                    <SectionHeader eyebrow={t.work.eyebrow} title={t.work.title} />
                </div>

                <div className="relative mx-auto max-w-5xl">
                    <div className="absolute left-4 top-0 hidden h-full w-px bg-gradient-to-b from-sky-300/50 via-violet-300/20 to-transparent md:block" />
                    <div className="grid gap-5">
                    {latestWork.map((job, index) => (
                        <div
                            key={index}
                            className="group relative rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl shadow-black/15 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-[#131a2a] md:ml-12"
                        >
                            <div className="flex items-start gap-4">
                                <div className="absolute -left-[3.25rem] top-7 hidden h-8 w-8 items-center justify-center rounded-full border border-sky-300/30 bg-[#0b1020] text-xs font-bold text-sky-200 shadow-lg shadow-sky-500/10 md:flex">
                                    {index + 1}
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-sky-300 uppercase tracking-[0.2em]">{job.period}</p>
                                    <h3 className="font-[family-name:var(--font-playfair)] font-bold text-2xl text-white mt-2 leading-snug">{job.title}</h3>
                                    <p className="text-sm text-slate-400 mt-1">{job.location}</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {getWorkTags(job.title, job.description).map((tag) => (
                                            <SkillChip key={tag} tone={tag === 'Research' ? 'violet' : tag === 'Digitalisation' ? 'blue' : 'slate'}>
                                                {tag}
                                            </SkillChip>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/cv"
                        className="inline-block rounded-full border border-white/15 bg-white/5 px-8 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
                    >
                        {t.work.fullCv}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default WorkExperienceSection;
