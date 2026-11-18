// src/app/(site)/fortbildning/page.tsx
import React from 'react';

const courses = [
    'Strategier för personalutveckling, Göteborgs Universitet 15hp',
    'Fysisk aktivitet och hälsa för KRAFT-instruktörer, 7,5 hp',
    'Fysisk aktivitet och hälsa för KRAFT-strateger, 7,5 hp',
    'Digitalisering i vården - utmaningar och möjligheter, Göteborgs Universitet 7,5hp',
    'Hållbar organisering och styrning inom vård och omsorg, Göteborgs Universitet 7,5hp',
    'Omvårdnadsvetenskap, Handledning och bedömning i verksamhetsförlagd utbildning, Örebro Universitet',
    'MI-samtal Återfallsprevention/känsloreglering/DBT',
    'Systematisk arbetsmiljöarbete Miljöarbete',
    'Handledareutbildning, Göteborgs Universitet, 7,5 hp',
    'GCP-utbildning för framtida forskare',
];

const FortbildningPage = () => {
    return (
        <section className="container mx-auto py-12">
            <h1 className="text-5xl font-bold text-center mb-12">Kurser & Fortbildning</h1>
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <ul className="space-y-4 list-disc list-inside">
                    {courses.map((course, index) => (
                        <li key={index} className="text-lg text-gray-700">
                            {course}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default FortbildningPage;