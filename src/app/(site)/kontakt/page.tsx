'use client';

import React from 'react';
import { FiMail, FiLinkedin, FiPhone } from 'react-icons/fi';
import ContactForm from '@/components/features/contact/ContactForm';
import { useI18n } from '@/lib/i18n';

interface ContactCardProps {
    icon: React.ReactNode;
    title: string;
    text: string;
    href: string;
}

const ContactCard = ({ icon, title, text, href }: ContactCardProps) => {
    const isExternalLink = href.startsWith('http');

    return (
        <a
            href={href}
            target={isExternalLink ? '_blank' : undefined}
            rel={isExternalLink ? 'noopener noreferrer' : undefined}
            className="group flex flex-col items-center rounded-3xl border border-white/10 bg-[#111827] p-8 text-center shadow-2xl shadow-black/15 transition-all duration-300 hover:-translate-y-2 hover:border-sky-300/30 hover:bg-[#131a2a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/30"
        >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-sky-300/25 bg-sky-300/10 text-2xl text-sky-200 transition-all duration-300 group-hover:bg-sky-300 group-hover:text-slate-950 group-hover:shadow-lg group-hover:shadow-sky-500/20">
                {icon}
            </div>
            <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-slate-300 text-sm">{text}</p>
        </a>
    );
};

const KontaktPage = () => {
    const { t } = useI18n();
    return (
        <section className="bg-[#080b14] py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-sm font-semibold tracking-[0.24em] text-sky-300 uppercase">{t.contact.eyebrow}</span>
                    <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-white mt-2">
                        {t.contact.title}
                    </h1>
                    <p className="text-slate-300 mt-4 max-w-md mx-auto text-lg leading-relaxed">
                        {t.contact.intro}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <ContactCard
                        icon={<FiMail />}
                        title={t.contact.email}
                        text="grchalkia@gmail.com"
                        href={`mailto:grchalkia@gmail.com?subject=${encodeURIComponent(t.contact.formEyebrow)}`}
                    />
                    <ContactCard
                        icon={<FiLinkedin />}
                        title={t.contact.linkedin}
                        text={t.contact.linkedinProfile}
                        href="https://www.linkedin.com/in/georgia-chalkia-72035317b/"
                    />
                    <ContactCard
                        icon={<FiPhone />}
                        title={t.contact.phone}
                        text="070-488 49 50"
                        href="tel:+46704884950"
                    />
                </div>

                <ContactForm />
            </div>
        </section>
    );
};

export default KontaktPage;
