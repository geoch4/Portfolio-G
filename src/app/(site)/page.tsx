// src/app/(site)/page.tsx
import CtaSection from '@/components/features/home/CtaSection';
import Hero from '@/components/features/home/Hero';
import SkillsSection from '@/components/features/home/SkillSection';
import WorkExperienceSection from '@/components/features/home/WorkExperienceSection';
import EducationSection from '@/components/features/home/EducationSection';
import CoursesSection from '@/components/features/home/CourseSection';
import React from 'react';

const HomePage = () => {
    return (
        <>
            <Hero />
            <SkillsSection />
            <WorkExperienceSection />
            <EducationSection />
            <CoursesSection />
            <CtaSection />
        </>
    );
};

export default HomePage;