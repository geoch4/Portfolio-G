import React from 'react';

type SectionHeaderProps = {
    eyebrow: string;
    title: string;
    intro?: string;
    align?: 'left' | 'center';
};

const SectionHeader = ({ eyebrow, title, intro, align = 'center' }: SectionHeaderProps) => {
    const alignment = align === 'left' ? 'text-left' : 'text-center mx-auto';

    return (
        <div className={`max-w-3xl ${alignment}`}>
            <span className="text-xs font-semibold tracking-[0.28em] text-sky-300 uppercase">
                {eyebrow}
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight text-white md:text-5xl">
                {title}
            </h2>
            {intro && (
                <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
                    {intro}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;
