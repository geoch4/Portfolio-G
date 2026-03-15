// src/components/features/home/CtaSection.tsx
import Link from 'next/link';
import React from 'react';

const CtaSection = () => {
    return (
        <section className="bg-teal-600 text-white">
            <div className="container mx-auto py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">Intresserad av att veta mer?</h2>
                <p className="max-w-2xl mx-auto mb-8">
                    Ladda ner mitt fullständiga CV för en detaljerad översikt, eller kontakta mig direkt för att diskutera eventuella möjligheter.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {/* Länken nedan antar att du döpt om din PDF till cv-georgia-chalkia.pdf */}
                    <a
                        href="/cv-georgia-chalkia.pdf"
                        download
                        className="bg-white text-teal-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Ladda Ner CV (PDF)
                    </a>
                    <Link
                        href="/contact"
                        className="border border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white hover:text-teal-700 transition-colors"
                    >
                        Kontakta Mig
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default CtaSection;