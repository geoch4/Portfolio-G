// src/components/features/home/Hero.tsx
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <section className="flex items-center justify-center py-16 md:py-24">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Vänsterkolumn: Textinnehåll */}
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
                            Legitimerad Sjuksköterska
                            <span className="block text-teal-600 mt-2">Georgia Chalkia</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-gray-600">
                            En engagerad och patientfokuserad sjuksköterska med erfarenhet från [din specialitet, t.ex. akutsjukvård eller primärvård]. Jag brinner för att erbjuda högkvalitativ och empatisk omvårdnad.
                        </p>
                        {/* Knappar */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/cv"
                                className="bg-teal-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-teal-700 transition-colors duration-300 shadow-lg"
                            >
                                Se mitt CV
                            </Link>
                            <Link
                                href="/contact"
                                className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                            >
                                Kontakta mig
                            </Link>
                        </div>
                    </div>
                    {/* Högerkolumn: Bild */}
                    <div className="flex justify-center">
                        <div className="relative w-72 h-72 md:w-96 md:h-96">
                            <Image
                                src="/image/imgGeorgia.jpg"
                                alt="Professionellt porträtt av [Georgia Chalkia]"
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;