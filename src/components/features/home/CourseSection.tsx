// src/components/features/home/CoursesSection.tsx
import { coursesAndCertifications } from '@/lib/Data';
import Link from 'next/link';
import React from 'react';

const CoursesSection = () => {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-10">Kompetensutveckling & Kurser</h2>
                <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                    {coursesAndCertifications.map((course, index) => (
                        <div key={index} className="bg-teal-100 text-teal-800 font-medium py-2 px-4 rounded-full text-sm">
                            {course}
                        </div>
                    ))}
                </div>
                <Link href="/fortbildning" className="mt-12 inline-block text-teal-600 font-semibold hover:underline">
                    Se Alla Kurser
                </Link>
            </div>
        </section>
    );
};

export default CoursesSection;