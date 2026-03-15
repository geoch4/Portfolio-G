// src/components/features/home/SkillsSection.tsx
import { skills } from '@/lib/Data';
import React from 'react';

const SkillsSection = () => {
    return (
        <section id="kompetenser" className="bg-white py-16 md:py-24">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-2">Mina Färdigheter</h2>
                <p className="text-gray-600 mb-10">Några av de kompetenser jag tar med mig.</p>
                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                    {skills.map((skill, index) => (
                        <div key={index} className="bg-teal-100 text-teal-800 font-medium py-2 px-4 rounded-full hover:bg-teal-200 transition-colors">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;