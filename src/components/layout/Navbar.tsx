'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { localeNames, Locale, useI18n } from '@/lib/i18n';

const Navbar = () => {
    const pathname = usePathname();
    const { locale, setLocale, t } = useI18n();
    const [activeSection, setActiveSection] = useState('hem');
    const [isOpen, setIsOpen] = useState(false);

    const sectionLinks = useMemo(() => [
        { id: 'hem', href: '/', label: t.nav.home },
        { id: 'about', href: '/#about', label: t.nav.about },
        { id: 'expertise', href: '/#expertise', label: t.nav.expertise },
        { id: 'projects', href: '/#projects', label: t.nav.projects },
        { id: 'arbete', href: '/#arbete', label: t.nav.work },
        { id: 'utbildning', href: '/#utbildning', label: t.nav.education },
    ], [t.nav]);

    const scrollToSection = (sectionId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname !== '/') return;

        event.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', sectionId === 'hem' ? '/' : `#${sectionId}`);
        setActiveSection(sectionId);
        setIsOpen(false);
    };

    useEffect(() => {
        if (pathname !== '/') return;

        const sections = sectionLinks
            .map((link) => document.getElementById(link.id))
            .filter((section): section is HTMLElement => Boolean(section));

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

                if (visible?.target.id) {
                    setActiveSection(visible.target.id);
                }
            },
            { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.25, 0.5] }
        );

        sections.forEach((section) => observer.observe(section));

        const hash = window.location.hash.replace('#', '');
        if (hash && sectionLinks.some((link) => link.id === hash)) {
            setActiveSection(hash);
        } else {
            setActiveSection('hem');
        }

        return () => observer.disconnect();
    }, [pathname, sectionLinks]);

    const sectionLinkClass = (sectionId: string) => {
        const isActive = pathname === '/' && activeSection === sectionId;

        return [
            'inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40',
            isActive
                ? 'bg-white/10 text-white ring-1 ring-sky-300/30'
                : 'text-slate-300 hover:bg-white/5 hover:text-white',
        ].join(' ');
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#080b14]/82 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
                <div className="flex items-center justify-between gap-4">
                    <Link
                        href="/"
                        className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white transition-all duration-300 hover:text-sky-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40 rounded-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        Georgia Chalkia
                    </Link>

                    <div className="hidden items-center gap-1 lg:flex">
                        {sectionLinks.map((link) => (
                            <Link
                                key={link.id}
                                href={link.href}
                                onClick={scrollToSection(link.id)}
                                className={sectionLinkClass(link.id)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        <Link
                            href="/kontakt"
                            className={`text-sm font-semibold transition-all duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/40 rounded-sm ${pathname === '/kontakt' ? 'text-white' : 'text-slate-300'}`}
                        >
                            {t.nav.contact}
                        </Link>
                        {/* TODO: Add separate Software/HealthTech and Life Science/Commercial CV PDFs when the files exist in public/. */}
                        <a
                            href="/cv-georgia-chalkia.pdf"
                            download
                            className="rounded-full bg-sky-300 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200/60"
                        >
                            {t.nav.downloadCv}
                        </a>
                        <select
                            id="locale-select"
                            value={locale}
                            onChange={(event) => setLocale(event.target.value as Locale)}
                            aria-label={t.nav.language}
                            className="w-16 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-base font-semibold text-white outline-none transition-all hover:border-sky-300/50 focus:ring-4 focus:ring-sky-300/20"
                        >
                            {Object.entries(localeNames).map(([code, name]) => (
                                <option key={code} value={code}>{name}</option>
                            ))}
                        </select>

                    </div>

                    <button
                        type="button"
                        className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white lg:hidden"
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                        onClick={() => setIsOpen((value) => !value)}
                    >
                        {t.nav.menu}
                    </button>
                </div>

                {isOpen && (
                    <div id="mobile-navigation" className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 lg:hidden">
                        <div className="grid gap-2">
                            {sectionLinks.map((link) => (
                                <Link
                                    key={link.id}
                                    href={link.href}
                                    onClick={scrollToSection(link.id)}
                                    className={sectionLinkClass(link.id)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Link href="/kontakt" onClick={() => setIsOpen(false)} className="rounded-full px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white">
                                {t.nav.contact}
                            </Link>
                            <a href="/cv-georgia-chalkia.pdf" download className="mt-2 rounded-full bg-sky-300 px-4 py-2 text-center text-sm font-bold text-slate-950">
                                {t.nav.downloadCv}
                            </a>
                            <select
                                value={locale}
                                onChange={(event) => setLocale(event.target.value as Locale)}
                                aria-label={t.nav.language}
                                className="mt-2 w-20 rounded-full border border-white/15 bg-[#0b1020] px-3 py-2 text-base font-semibold text-white outline-none"
                            >
                                {Object.entries(localeNames).map(([code, name]) => (
                                    <option key={code} value={code}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
