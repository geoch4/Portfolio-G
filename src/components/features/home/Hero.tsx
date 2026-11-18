'use client';

import Image from 'next/image';
import React from 'react';
import { useI18n } from '@/lib/i18n';
import SkillChip from '@/components/ui/SkillChip';

const Hero = () => {
    const { t } = useI18n();
    return (
        <section id="hem" className="relative scroll-mt-28 overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_34%),radial-gradient(circle_at_75%_20%,rgba(167,139,250,0.18),transparent_30%),linear-gradient(135deg,#080b14_0%,#0b1020_45%,#101525_100%)] py-20 md:py-32">
            <div className="hero-medical-pattern absolute inset-0" aria-hidden="true" />
            <div className="hero-pulse absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-20" aria-hidden="true">
                <svg viewBox="0 0 1200 180" className="h-44 w-[200%] max-w-none" preserveAspectRatio="none">
                    <path
                        className="hero-pulse-line"
                        d="M0 95 H120 L145 95 L165 65 L185 125 L210 20 L240 155 L270 95 H390 L415 95 L435 65 L455 125 L480 20 L510 155 L540 95 H660 L685 95 L705 65 L725 125 L750 20 L780 155 L810 95 H930 L955 95 L975 65 L995 125 L1020 20 L1050 155 L1080 95 H1200"
                    />
                </svg>
            </div>

            <div className="relative mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-[1.08fr_0.92fr]">
                    <div className="text-center md:text-left">
                        <span className="mb-5 inline-flex rounded-full border border-sky-300/20 bg-sky-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
                            {t.hero.eyebrow}
                        </span>
                        <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-white md:text-5xl">
                            Georgia Chalkia
                        </p>
                        <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-playfair)] text-5xl font-bold leading-[0.98] tracking-tight text-white md:text-7xl">
                            {t.hero.headline}
                        </h1>
                        {t.hero.positioning && (
                            <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-sky-100 md:mx-0">
                                {t.hero.positioning}
                            </p>
                        )}
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:mx-0 md:text-lg">
                            {t.hero.body}
                        </p>
                        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
                            <a
                                href="#projects"
                                className="rounded-full bg-sky-300 px-7 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-sky-400/30 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200/60"
                            >
                                {t.hero.cv}
                            </a>
                            <a
                                href="#expertise"
                                className="rounded-full border border-white/20 px-7 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/60 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet-200/40"
                            >
                                {t.hero.contact}
                            </a>
                            <a
                                href="/cv-georgia-chalkia.pdf"
                                download
                                className="rounded-full border border-slate-600 px-7 py-3 font-semibold text-slate-200 transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200/40"
                            >
                                Download CV
                            </a>
                        </div>
                        {t.hero.highlights && (
                            <div className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-2 md:mx-0 md:justify-start">
                                {t.hero.highlights.map((highlight) => (
                                    <SkillChip key={highlight.title} tone="slate">{highlight.title}</SkillChip>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center">
                        <div className="group relative w-full max-w-sm">
                            <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-sky-400/25 via-indigo-400/20 to-violet-400/25 blur-2xl transition-all duration-500 group-hover:scale-105" />
                            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 p-3 shadow-2xl shadow-black/30 backdrop-blur">
                                <div className="relative h-[420px] overflow-hidden rounded-[1.5rem]">
                                <Image
                                    src="/image/imgGeorgia.jpg"
                                    alt={t.hero.imageAlt}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                                    priority
                                />
                                </div>
                                <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-[#080b14]/80 p-4 backdrop-blur">
                                    <p className="text-sm font-semibold text-white">Healthcare × Technology</p>
                                    <p className="mt-1 text-xs text-slate-300">Clinical credibility with digital delivery mindset.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
