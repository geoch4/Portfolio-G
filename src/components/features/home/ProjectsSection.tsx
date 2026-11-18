'use client';

import React from 'react';
import { projects } from '@/lib/projects';
import { useI18n } from '@/lib/i18n';
import SectionHeader from '@/components/ui/SectionHeader';
import SkillChip from '@/components/ui/SkillChip';

const ProjectsSection = () => {
    const { t } = useI18n();

    return (
        <section id="projects" className="scroll-mt-28 bg-[#0b1020] py-20 md:py-28">
            <div className="mx-auto max-w-6xl px-6">
                <div className="mb-14">
                    <SectionHeader eyebrow={t.projects.eyebrow} title={t.projects.title} intro={t.projects.intro} />
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                    {projects.map((project, index) => (
                        <article
                            key={project.title}
                            className={`group rounded-3xl border border-white/10 bg-[#111827] p-6 shadow-2xl shadow-black/20 transition-all duration-300 hover:-translate-y-2 hover:border-sky-300/30 hover:bg-[#131a2a] ${index === 0 ? 'lg:col-span-2' : ''}`}
                        >
                            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <SkillChip tone={project.category.includes('Health') ? 'emerald' : project.category.includes('AI') ? 'violet' : 'blue'}>
                                            {project.category}
                                        </SkillChip>
                                        {project.status && (
                                            <SkillChip tone="slate">
                                                {t.projects.status}: {project.status}
                                            </SkillChip>
                                        )}
                                    </div>
                                    <h3 className="mt-5 font-[family-name:var(--font-playfair)] text-3xl font-bold text-white">
                                        {project.title}
                                    </h3>
                                    <p className="mt-3 max-w-2xl leading-relaxed text-slate-300">
                                        {project.description}
                                    </p>
                                </div>
                                <span className="hidden h-12 w-12 shrink-0 rounded-2xl border border-sky-300/20 bg-sky-300/10 text-center text-sm font-bold leading-[3rem] text-sky-200 md:block">
                                    0{index + 1}
                                </span>
                            </div>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                        {t.projects.focus}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.focus.map((item) => (
                                            <SkillChip key={item} tone="slate">{item}</SkillChip>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                                        {t.projects.tech}
                                    </p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {project.tech.map((item) => (
                                            <SkillChip key={item} tone="blue">{item}</SkillChip>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
