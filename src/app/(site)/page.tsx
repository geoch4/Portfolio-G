// src/app/(site)/page.tsx
import CtaSection from '@/components/features/home/CtaSection';
import Hero from '@/components/features/home/Hero';
import ProfileSection from '@/components/features/home/ProfileSection';
import ProjectsSection from '@/components/features/home/ProjectsSection';
import WorkExperienceSection from '@/components/features/home/WorkExperienceSection';
import EducationSection from '@/components/features/home/EducationSection';
import React from 'react';

// Kompetenser, praktisk information och kurser ligger på /cv.
const HomePage = () => {
    return (
        <>
            <Hero />
            <WorkExperienceSection />
            <ProjectsSection />
            <ProfileSection />
            <EducationSection />
            <CtaSection />
        </>
    );
};

export default HomePage;
