// src/app/(site)/kontakt/page.tsx
import React from 'react';
import { FiMail, FiLinkedin, FiPhone } from 'react-icons/fi';

// STEG 1: Vi definierar en mall för våra props
interface ContactCardProps {
    icon: React.ReactNode; // React.ReactNode är typen för ett JSX-element (våra ikoner)
    title: string;
    text: string;
    href: string;
}

// Ett "kort" för varje kontaktmetod
// STEG 2: Vi talar om för komponenten att den ska följa mallen
const ContactCard = ({ icon, title, text, href }: ContactCardProps) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:border-teal-500 transition-all duration-300 flex flex-col items-center text-center"
        >
            <div className="text-4xl text-teal-600 mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-gray-600">{text}</p>
        </a>
    );
};


const KontaktPage = () => {
    return (
        <section className="container mx-auto py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-5xl font-bold mb-4">Kontakta Mig</h1>
                <p className="text-lg text-gray-600 mb-16">
                    Jag ser fram emot att höra från dig. Välj det sätt som passar dig bäst nedan för att komma i kontakt.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <ContactCard
                    icon={<FiMail />}
                    title="Skicka e-post"
                    text="grchalkia@gmail.com"
                    href="mailto:grchalkia@gmail.com"
                />
                <ContactCard
                    icon={<FiLinkedin />}
                    title="Anslut på LinkedIn"
                    text="linkedin.com/in/georgia-chalkia"
                    href="https://www.linkedin.com/in/georgia-chalkia-8106a724a"
                />
                <ContactCard
                    icon={<FiPhone />}
                    title="Ring mig"
                    text="070-488 49 50"
                    href="tel:+46704884950"
                />
            </div>
        </section>
    );
};

export default KontaktPage;