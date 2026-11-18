// src/components/features/home/WorkExperienceSection.tsx
import { workExperience } from '@/lib/Data';
import Link from 'next/link';
import React from 'react';

const WorkExperienceSection = () => {
    // .slice(0, 4) tar de fyra första (senaste) posterna från din lista
    const latestWork = workExperience.slice(0, 4);

    return (
        <section id="arbete" className="bg-white py-16 md:py-24">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-10">Arbetslivserfarenhet</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
                    {latestWork.map((job, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">                            <p className="text-sm text-gray-500">{job.period}</p>
                            <h3 className="font-bold text-lg text-gray-800 mt-1">{job.title}</h3>
                            <p className="text-gray-600">{job.location}</p>
                        </div>
                    ))}
                </div>
                <Link href="/cv" className="mt-12 inline-block bg-gray-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-black transition-colors">
                    Se Hela Mitt CV
                </Link>
            </div>
        </section>
    );
};

export default WorkExperienceSection;