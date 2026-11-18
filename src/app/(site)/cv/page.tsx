'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { getLocalizedData } from '@/lib/localizedData';

const CvPage = () => {
    const { locale, t } = useI18n();
    const { work, education, courses } = getLocalizedData(locale);
    const [showAllCourses, setShowAllCourses] = useState(false);
    const visibleCourses = showAllCourses ? courses : courses.slice(0, 5);
    const practical = [
        [t.skills.languages, t.skills.languagesValue],
        [t.skills.licences, t.skills.licencesValue],
        [t.skills.driving, t.skills.drivingValue],
        [t.skills.availability, t.skills.availabilityValue],
        [t.skills.references, t.skills.referencesValue],
    ];
    return (
        <div className="bg-[#080b14] py-20 md:py-28">
            <div className="max-w-4xl mx-auto px-6">

                {/* Rubrik */}
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold tracking-[0.24em] text-sky-300 uppercase">{t.cv.eyebrow}</span>
                    <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mt-2">
                        Georgia Chalkia
                    </h1>
                    <p className="text-slate-300 mt-2">{t.cv.profession}</p>
                    <p className="text-slate-300 mt-4 max-w-2xl mx-auto leading-relaxed">
                        {t.cv.intro}
                    </p>
                    <a
                        href="/cv-georgia-chalkia.pdf"
                        download
                        className="mt-6 inline-block rounded-full bg-sky-300 px-7 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200/60"
                    >
                        {t.cv.download}
                    </a>
                </div>

                {t.cv.profileTitle && t.cv.profileBody && (
                    <section className="mb-14 rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl shadow-black/15">
                        <span className="text-sm font-semibold tracking-[0.24em] text-sky-300 uppercase">
                            {t.cv.profileTitle}
                        </span>
                        <p className="mt-3 text-slate-300 leading-relaxed">
                            {t.cv.profileBody}
                        </p>
                    </section>
                )}

                {/* Arbetslivserfarenhet */}
                <section className="mb-14">
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                        {t.cv.work}
                    </h2>
                    <div className="space-y-8">
                        {work.map((job, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 md:gap-8">
                                <div>
                                    <p className="text-xs font-semibold text-sky-300 uppercase tracking-wide">{job.period}</p>
                                    <p className="text-sm text-slate-400 mt-0.5">{job.location}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">{job.title}</h3>
                                    <ul className="space-y-1.5">
                                        {job.description.map((desc, i) => (
                                            <li key={i} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-300 flex-shrink-0" />
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Utbildning */}
                <section className="mb-14">
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                        {t.cv.education}
                    </h2>
                    <div className="space-y-8">
                        {education.map((edu, index) => (
                            <div key={index} className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-2 md:gap-8">
                                <div>
                                    <p className="text-xs font-semibold text-sky-300 uppercase tracking-wide">{edu.period}</p>
                                    <p className="text-sm text-slate-400 mt-0.5">{edu.location}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white mb-2">{edu.title}</h3>
                                    <ul className="space-y-1.5">
                                        {edu.description.map((desc, i) => (
                                            <li key={i} className="text-sm text-slate-300 leading-relaxed flex gap-2">
                                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-300 flex-shrink-0" />
                                                {desc}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Färdigheter */}
                <section className="mb-14">
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                        {t.cv.skills}
                    </h2>
                    <div className="space-y-6">
                        {t.skills.groups.map((group) => (
                            <div key={group.title}>
                                <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{group.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {group.items.map((skill) => (
                                        <span key={skill} className="rounded-full border border-sky-300/25 bg-sky-300/10 px-4 py-1.5 text-sm font-medium text-sky-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/10">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Praktisk information */}
                <section className="mb-14">
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                        {t.skills.practical}
                    </h2>
                    <dl className="grid grid-cols-1 gap-4 text-sm text-slate-300 sm:grid-cols-[12rem_1fr]">
                        {practical.map(([label, value]) => (
                            <React.Fragment key={label}>
                                <dt className="font-semibold text-white">{label}</dt>
                                <dd>{value}</dd>
                            </React.Fragment>
                        ))}
                    </dl>
                </section>

                {/* Kurser */}
                <section>
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                        {t.cv.courses}
                    </h2>
                    <ul className="space-y-2">
                        {visibleCourses.map((course) => (
                            <li key={course} className="text-sm text-slate-300 flex gap-2">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-300 flex-shrink-0" />
                                {course}
                            </li>
                        ))}
                    </ul>
                    {courses.length > 5 && (
                        <button
                            type="button"
                            onClick={() => setShowAllCourses((value) => !value)}
                            className="mt-6 rounded-full border border-white/15 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
                        >
                            {showAllCourses ? t.courses.less : t.courses.all}
                        </button>
                    )}
                </section>

            </div>
        </div>
    );
};

export default CvPage;
