'use client';

import React, { useState } from 'react';
import { useI18n } from '@/lib/i18n';
import { getLocalizedData } from '@/lib/localizedData';
import SectionHeader from '@/components/ui/SectionHeader';

const CoursesSection = () => {
    const { locale, t } = useI18n();
    const [showAll, setShowAll] = useState(false);
    const { courses } = getLocalizedData(locale);
    const sortedCourses = [...courses].sort((a, b) => a.localeCompare(b, locale));
    const visibleCourses = showAll ? sortedCourses : sortedCourses.slice(0, 6);

    return (
        <section id="kurser" className="scroll-mt-28 bg-[#080b14] py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-6">
                <div className="mb-14">
                    <SectionHeader eyebrow={t.courses.eyebrow} title={t.courses.title} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
                    {visibleCourses.map((course) => (
                        <div
                            key={course}
                            className="flex min-h-20 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-medium leading-relaxed text-slate-300 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/30 hover:bg-white/[0.07] hover:text-white"
                        >
                            <span>{course}</span>
                        </div>
                    ))}
                </div>
                {sortedCourses.length > 6 && (
                    <div className="mt-10 text-center">
                        <button
                            type="button"
                            onClick={() => setShowAll((value) => !value)}
                            className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-sky-300/50 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
                        >
                            {showAll ? t.courses.less : t.courses.all}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CoursesSection;
