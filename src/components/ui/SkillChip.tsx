import React from 'react';

type SkillChipProps = {
    children: React.ReactNode;
    tone?: 'blue' | 'violet' | 'emerald' | 'slate';
};

const toneClasses: Record<NonNullable<SkillChipProps['tone']>, string> = {
    blue: 'border-sky-400/25 bg-sky-400/10 text-sky-100',
    violet: 'border-violet-400/25 bg-violet-400/10 text-violet-100',
    emerald: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100',
    slate: 'border-white/10 bg-white/5 text-slate-200',
};

const SkillChip = ({ children, tone = 'slate' }: SkillChipProps) => {
    return (
        <span className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${toneClasses[tone]}`}>
            {children}
        </span>
    );
};

export default SkillChip;
