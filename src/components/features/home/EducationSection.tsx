// src/components/features/home/EducationSection.tsx
import { education } from '@/lib/Data';
import Link from 'next/link';
import React from 'react';

const EducationSection = () => {
    // .filter() letar upp exakt de utbildningar du vill visa
    const mainEducation = education.filter(edu =>
        edu.title.includes('Magisterexamen') ||
        edu.title.includes('Masterexamen') ||
        edu.title.includes('Sjuksköterskeexamen')
    );

    return (
        <section id="utbildning" className="py-16 md:py-24">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-10">Utbildning</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
                    {mainEducation.map((edu, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                            <p className="text-sm text-gray-500">{edu.period}</p>
                            <h3 className="font-bold text-lg text-gray-800 mt-1">{edu.title}</h3>
                            <p className="text-gray-600">{edu.location}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;