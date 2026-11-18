'use client';

import React, { FormEvent } from 'react';
import { useI18n } from '@/lib/i18n';

const ContactForm = () => {
    const { t } = useI18n();
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get('name') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();
        const message = String(formData.get('message') ?? '').trim();
        const subject = encodeURIComponent(`${t.contact.mailSubject} ${name}`);
        const body = encodeURIComponent(
            `${t.contact.mailName}: ${name}\n${t.contact.mailEmail}: ${email}\n\n${t.contact.mailMessage}:\n${message}`
        );

        window.location.href = `mailto:grchalkia@gmail.com?subject=${subject}&body=${body}`;
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mt-10 max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/15"
        >
            <span className="text-sm font-semibold tracking-[0.24em] text-sky-300 uppercase">{t.contact.formEyebrow}</span>
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mt-2">
                {t.contact.formTitle}
            </h2>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <label className="text-sm font-semibold text-slate-200">
                    {t.contact.name}
                    <input
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 font-normal text-white outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-sky-300/40 focus:border-sky-300 focus:ring-4 focus:ring-sky-300/20"
                        placeholder={t.contact.namePlaceholder}
                    />
                </label>

                <label className="text-sm font-semibold text-slate-200">
                    {t.contact.email}
                    <input
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 font-normal text-white outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-sky-300/40 focus:border-sky-300 focus:ring-4 focus:ring-sky-300/20"
                        placeholder={t.contact.emailPlaceholder}
                    />
                </label>
            </div>

            <label className="mt-5 block text-sm font-semibold text-slate-200">
                {t.contact.message}
                <textarea
                    name="message"
                    required
                    rows={6}
                    className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#0b1020] px-4 py-3 font-normal text-white outline-none transition-all duration-300 placeholder:text-slate-500 hover:border-sky-300/40 focus:border-sky-300 focus:ring-4 focus:ring-sky-300/20"
                    placeholder={t.contact.messagePlaceholder}
                />
            </label>

            <button
                type="submit"
                className="mt-6 rounded-full bg-sky-300 px-8 py-3 font-semibold text-slate-950 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:-translate-y-1 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-200/60"
            >
                {t.contact.send}
            </button>
        </form>
    );
};

export default ContactForm;
