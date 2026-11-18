'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'sv' | 'en' | 'el';

export const localeNames: Record<Locale, string> = {
    sv: '🇸🇪',
    en: '🇬🇧',
    el: '🇬🇷',
};

type Messages = {
    nav: { home: string; about: string; expertise: string; projects: string; work: string; education: string; skills: string; courses: string; cv: string; contact: string; language: string; downloadCv: string; menu: string };
    hero: { eyebrow: string; headline?: string; positioning?: string; body: string; cv: string; contact: string; imageAlt: string; highlights?: { title: string; body: string }[] };
    about: { eyebrow: string; title: string; intro: string; pillars: { title: string; body: string }[] };
    hybrid?: {
        eyebrow: string; title: string; intro: string;
        tracks: { label: string; title: string; body: string; items: string[]; href: string; link: string }[];
        synergyEyebrow: string; synergyTitle: string; synergyBody: string;
        synergyCards: { title: string; body: string }[];
        rolesTitle: string; roles: string[];
    };
    skills: {
        eyebrow: string; title: string; intro: string; items: string[];
        groups?: { title: string; items: string[] }[];
        practical: string; languages: string; languagesValue: string; driving: string; yes: string; licences: string; licencesValue: string;
        availability: string; availabilityValue: string; references: string; referencesValue: string;
        digitalEyebrow: string; digitalTitle: string; digitalBody: string; digitalItems: string[];
    };
    projects: { eyebrow: string; title: string; intro: string; status: string; focus: string; tech: string; code: string; frontend: string; backend: string; demo: string };
    work: { eyebrow: string; title: string; fullCv: string };
    education: { eyebrow: string; title: string };
    courses: { eyebrow: string; title: string; all: string; less: string };
    cta: { title: string; body: string; download: string; contact: string };
    contact: {
        eyebrow: string; title: string; intro: string; email: string; linkedin: string;
        linkedinProfile: string; phone: string; formEyebrow: string; formTitle: string;
        name: string; namePlaceholder: string; emailPlaceholder: string; message: string;
        messagePlaceholder: string; send: string; mailSubject: string; mailName: string;
        mailEmail: string; mailMessage: string;
    };
    cv: { eyebrow: string; profession: string; intro: string; download: string; work: string; education: string; skills: string; courses: string; profileTitle?: string; profileBody?: string };
    footer: string;
};

const messages: Record<Locale, Messages> = {
    sv: {
        nav: { home: 'Home', about: 'About', expertise: 'Expertise', projects: 'Projects', work: 'Experience', education: 'Education', skills: 'Skills', courses: 'Courses', cv: 'CV', contact: 'Contact', language: 'Språk', downloadCv: 'Download CV', menu: 'Öppna meny' },
        hero: {
            eyebrow: 'HealthTech · Vård × Teknik',
            headline: 'Distriktssköterska som bygger digitala vårdflöden.',
            positioning: 'Legitimerad distriktssköterska med klinisk erfarenhet från psykiatri, ECT/rTMS, vaccination och klinisk forskning – och kunskap i systemutveckling.',
            body: 'Jag vet hur vården fungerar i praktiken: dokumentation, prioritering, uppföljning och patientsäkerhet. Med kunskap i systemutveckling kan jag översätta de behoven till digitala lösningar som fungerar i vardagen – och vara bryggan mellan vårdpersonal och utvecklingsteam.',
            cv: 'Se projekt', contact: 'Se min profil', imageAlt: 'Georgia Chalkia, legitimerad distriktssköterska',
            highlights: [
                { title: 'Vård', body: 'Distriktssköterska med erfarenhet från psykiatri, ECT/rTMS, vaccination och klinisk forskning.' },
                { title: 'Teknik', body: 'Systemutveckling, digitala vårdflöden, data och API:er.' },
                { title: 'Implementation', body: 'Att få nya arbetssätt och system att fungera i vårdens vardag.' },
            ],
        },
        about: {
            eyebrow: 'About',
            title: 'En profil där vård och teknik hänger ihop.',
            intro: 'Vården är grunden: jag förstår patienter, vårdflöden, dokumentation och klinisk säkerhet. Tekniken ger mig verktyg att förstå och bygga digitala lösningar. Tillsammans gör det att jag kan bidra där vårdens behov ska bli fungerande system – från behov och krav till implementation och förvaltning.',
            pillars: [
                { title: 'Klinisk trovärdighet', body: 'Jag har arbetat nära patienter, behandlingar och tvärprofessionella team i vårdens vardag.' },
                { title: 'Teknisk förståelse', body: 'Mina IT-projekt ger mig språk för system, dataflöden, API:er och digital produktutveckling.' },
                { title: 'Implementation i praktiken', body: 'Jag har introducerat nya kollegor och omsatt riktlinjer i praktiskt arbete – samma förmåga som krävs när nya system ska börja användas på riktigt.' },
            ],
        },
        hybrid: {
            eyebrow: 'Expertise',
            title: 'Vård × Teknik × Implementation',
            intro: 'Tre kompetensområden, en sammanhållen profil: klinisk förståelse, teknisk genomförandekraft och förmåga att få digitala lösningar att fungera i vården.',
            tracks: [
                {
                    label: '01 Healthcare',
                    title: 'Klinisk erfarenhet',
                    body: 'Distriktssköterska med erfarenhet från psykiatri, primärvårdsnära arbete, vaccination, ECT/rTMS, klinisk forskning och GCP-relaterade arbetssätt.',
                    items: ['District nursing', 'Psychiatry', 'Vaccination', 'ECT / rTMS', 'Clinical research', 'GCP', 'Patient safety', 'Medical communication'],
                    href: '/#arbete',
                    link: 'Se erfarenhet',
                },
                {
                    label: '02 Technology',
                    title: 'Systemutveckling',
                    body: 'Projekt och utbildning inom modern utveckling, frontend, backend, databaser, API:er och digitala vårdnära lösningar.',
                    items: ['C#', '.NET', 'ASP.NET Core', 'React', 'TypeScript', 'SQL', 'EF Core', 'REST APIs', 'FHIR R4', 'Git / GitHub', 'AI integrations'],
                    href: '/#projects',
                    link: 'Se projekt',
                },
                {
                    label: '03 Implementation',
                    title: 'Från behov till fungerande vardag',
                    body: 'Erfarenhet av verksamhetsutveckling, introduktion av kollegor och att omsätta riktlinjer i praktiskt arbete. Jag förstår vad som krävs för att nya system ska användas på riktigt.',
                    items: ['Behovsanalys', 'Användarperspektiv', 'Verksamhetsutveckling', 'Introduktion & utbildning', 'Medicinsk kommunikation', 'Tvärprofessionell samverkan'],
                    href: '/kontakt',
                    link: 'Ta kontakt',
                },
            ],
            synergyEyebrow: 'HealthTech-fokus',
            synergyTitle: 'Där klinik och teknik möts',
            synergyBody: 'Digitala vårdlösningar lyckas när de passar vårdens verklighet. Min bakgrund gör att jag förstår både hur arbetet ser ut i vården och hur systemen byggs – och kan översätta mellan vårdpersonal, patienter och utvecklingsteam.',
            synergyCards: [
                { title: 'Klinisk verklighetsförankring', body: 'Jag förstår vårdens tempo, patienternas behov och de praktiska utmaningar som avgör om ett system faktiskt används.' },
                { title: 'Digital översättare', body: 'Jag kan bidra när vårdens behov ska översättas till krav, digitala lösningar, implementation och systemstöd.' },
                { title: 'Användarnära kommunikation', body: 'Min erfarenhet av patientkommunikation och tvärprofessionellt samarbete gör mig trygg i att utbilda, ge stöd och fånga upp användarnas behov.' },
            ],
            rolesTitle: 'Roller där min profil passar',
            roles: ['E-hälsa', 'Implementation', 'Systemförvaltning', 'Systemägare', 'Klinisk applikationsspecialist', 'Produktspecialist inom HealthTech', 'Kliniska prövningar'],
        },
        projects: { eyebrow: 'Projekt', title: 'Projekt där vård och teknik möts', intro: 'Ett urval av projekt som visar hur jag arbetar med system, användarflöden och digitala lösningar – flera med direkt koppling till vården.', status: 'Status', focus: 'Fokus', tech: 'Teknik', code: 'Kod på GitHub', frontend: 'Frontend på GitHub', backend: 'Backend på GitHub', demo: 'Demo' },
        skills: {
            eyebrow: 'Styrkor', title: 'Kompetens för digital vård',
            intro: 'Klinisk erfarenhet kombinerad med förståelse för hur vårdens system, data och arbetsflöden används i praktiken.',
            items: ['GCP och klinisk forskning', 'Läkemedelshantering', 'Kliniska bedömningar', 'Patientsäkerhet', 'Medicinsk patientkommunikation', 'Vaccination och prevention', 'Strukturerad dokumentation', 'Tvärprofessionellt samarbete'],
            groups: [
                { title: 'Klinisk grund', items: ['GCP och klinisk forskning', 'Läkemedelshantering', 'Kliniska bedömningar'] },
                { title: 'Digital vårdförståelse', items: ['Strukturerad dokumentation', 'Datakvalitet', 'Digitala vårdflöden'] },
                { title: 'Samverkan & kommunikation', items: ['Medicinsk patientkommunikation', 'Tvärprofessionellt samarbete', 'Introduktion av kollegor'] },
            ],
            practical: 'Praktisk information', languages: 'Språk', languagesValue: 'Grekiska (modersmål), svenska (flytande), engelska (flytande), tyska (goda, B2)', driving: 'Körkort', yes: 'B-körkort',
            licences: 'Legitimationer', licencesValue: 'Legitimerad sjuksköterska (Socialstyrelsen), specialistsjuksköterska – distriktssköterska, förskrivningsrätt, GCP-certifierad, LIF-certifierad',
            availability: 'Tillgänglighet', availabilityValue: 'Enligt överenskommelse', references: 'Referenser', referencesValue: 'Lämnas på begäran',
            digitalEyebrow: 'Digital kompetens', digitalTitle: 'Systemförståelse i vården',
            digitalBody: 'Min kliniska bakgrund gör att jag förstår hur vårdens digitala system påverkar det dagliga arbetet: dokumentation, prioritering, uppföljning och kommunikation mellan aktörer. Tillsammans med mina IT-studier ger det mig en brygga mellan vårdens verklighet och de team som bygger systemen.',
            digitalItems: ['Journalsystem och digitala vårdplattformar', 'Dataanalys och uppföljning', 'Vårdflöden', 'Datakvalitet', 'Patientnära digitalisering'],
        },
        work: { eyebrow: 'Karriär', title: 'Arbetslivserfarenhet', fullCv: 'Se hela mitt CV' },
        education: { eyebrow: 'Bakgrund', title: 'Utbildning' },
        courses: { eyebrow: 'Lärande', title: 'Kompetensutveckling & Kurser', all: 'Visa alla kurser', less: 'Visa färre' },
        cta: { title: 'Interested in working together?', body: 'Jag är öppen för roller inom HealthTech och digital vård där klinisk förståelse och teknisk kompetens skapar värde.', download: 'Download CV', contact: 'Contact me' },
        contact: {
            eyebrow: 'Kontakt', title: 'Kontakta mig', intro: 'Jag är öppen för roller inom HealthTech, e-hälsa och implementation där klinisk erfarenhet och teknisk förståelse behövs.',
            email: 'E-post', linkedin: 'LinkedIn', linkedinProfile: 'LinkedIn-profil', phone: 'Telefon',
            formEyebrow: 'Skicka ett meddelande', formTitle: 'Skriv till mig', name: 'Namn', namePlaceholder: 'Ditt namn',
            emailPlaceholder: 'din@email.se', message: 'Personligt meddelande', messagePlaceholder: 'Skriv ditt meddelande här...', send: 'Skicka meddelande',
            mailSubject: 'Kontakt via portfolio från', mailName: 'Namn', mailEmail: 'E-post', mailMessage: 'Meddelande',
        },
        cv: { eyebrow: 'Curriculum Vitae', profession: 'Legitimerad distriktssköterska', intro: 'Legitimerad distriktssköterska med erfarenhet från psykiatri, ECT/rTMS, vaccination och klinisk forskning, samt kunskap i systemutveckling. Söker roller inom HealthTech och digital vård där jag kan bidra med klinisk förståelse, patientsäkerhet och förmågan att översätta vårdens behov till fungerande system.', download: 'Ladda ner som PDF', work: 'Arbetslivserfarenhet', education: 'Utbildning', skills: 'Kompetensprofil', courses: 'Kompetensutveckling & Kurser', profileTitle: 'Profil för HealthTech', profileBody: 'Jag kombinerar klinisk trovärdighet, forskningsförståelse och teknisk kunskap. Det gör mig relevant för roller där vårdens behov ska bli digitala lösningar som fungerar i vardagen.' },
        footer: 'Legitimerad distriktssköterska',
    },
    en: {
        nav: { home: 'Home', about: 'About', expertise: 'Expertise', projects: 'Projects', work: 'Experience', education: 'Education', skills: 'Skills', courses: 'Courses', cv: 'CV', contact: 'Contact', language: 'Language', downloadCv: 'Download CV', menu: 'Open menu' },
        hero: {
            eyebrow: 'HealthTech · Healthcare × Technology',
            headline: 'District nurse building digital care workflows.',
            positioning: 'Registered district nurse with clinical experience in psychiatry, ECT/rTMS, vaccination and clinical research – and software development skills.',
            body: 'I know how healthcare works in practice: documentation, prioritisation, follow-up and patient safety. With software development skills, I can translate those needs into digital solutions that work in everyday care – and bridge the gap between clinicians and development teams.',
            cv: 'View projects', contact: 'View my profile', imageAlt: 'Georgia Chalkia, registered district nurse',
            highlights: [
                { title: 'Healthcare', body: 'Experience from district nursing, psychiatry, ECT/rTMS, vaccination and clinical research.' },
                { title: 'Technology', body: 'Software development, digital care workflows, data and APIs.' },
                { title: 'Implementation', body: 'Making new ways of working and systems work in everyday care.' },
            ],
        },
        about: {
            eyebrow: 'About',
            title: 'One profile where healthcare and technology connect.',
            intro: 'Healthcare is the foundation: I understand patients, care workflows, documentation and clinical safety. Technology gives me the tools to understand and build digital solutions. Together, they let me contribute where healthcare needs must become working systems – from needs and requirements to implementation and maintenance.',
            pillars: [
                { title: 'Clinical credibility', body: 'I have worked close to patients, treatments and multidisciplinary teams in real healthcare settings.' },
                { title: 'Technical understanding', body: 'My IT projects give me language for systems, data flows, APIs and digital product development.' },
                { title: 'Implementation in practice', body: 'I have onboarded new colleagues and turned guidelines into everyday practice – the same skills needed when new systems are introduced for real.' },
            ],
        },
        hybrid: {
            eyebrow: 'Expertise',
            title: 'Healthcare × Technology × Implementation',
            intro: 'Three competence areas, one coherent profile: clinical understanding, technical delivery and the ability to make digital solutions work in healthcare.',
            tracks: [
                { label: '01 Healthcare', title: 'Clinical experience', body: 'District nurse with experience from psychiatry, primary-care-adjacent work, vaccination, ECT/rTMS, clinical research and GCP-related ways of working.', items: ['District nursing', 'Psychiatry', 'Vaccination', 'ECT / rTMS', 'Clinical research', 'GCP', 'Patient safety', 'Medical communication'], href: '/#arbete', link: 'View experience' },
                { label: '02 Technology', title: 'Software development', body: 'Projects and training in modern frontend, backend, databases, APIs and digital healthcare-adjacent solutions.', items: ['C#', '.NET', 'ASP.NET Core', 'React', 'TypeScript', 'SQL', 'EF Core', 'REST APIs', 'FHIR R4', 'Git / GitHub', 'AI integrations'], href: '/#projects', link: 'View projects' },
                { label: '03 Implementation', title: 'From needs to everyday use', body: 'Experience in service development, onboarding colleagues and turning guidelines into everyday practice. I understand what it takes for new systems to be used for real.', items: ['Needs analysis', 'User perspective', 'Service development', 'Onboarding & training', 'Medical communication', 'Cross-functional collaboration'], href: '/kontakt', link: 'Contact me' },
            ],
            synergyEyebrow: 'HealthTech focus',
            synergyTitle: 'Where clinical reality and technology meet',
            synergyBody: 'Digital healthcare solutions succeed when they fit clinical reality. My background means I understand both how care is delivered and how systems are built – and I can translate between clinicians, patients and development teams.',
            synergyCards: [
                { title: 'Clinical grounding', body: 'I understand the pace of care, patient needs and the practical constraints that decide whether a system is actually used.' },
                { title: 'Digital translator', body: 'I can contribute when healthcare needs must become requirements, digital solutions, implementation and system support.' },
                { title: 'User-facing communication', body: 'My experience in patient communication and cross-functional teamwork makes me confident in training users, supporting them and capturing their needs.' },
            ],
            rolesTitle: 'Roles where this profile fits',
            roles: ['eHealth', 'Implementation', 'System management', 'System owner', 'Clinical application specialist', 'HealthTech product specialist', 'Clinical trials'],
        },
        projects: { eyebrow: 'Projects', title: 'Projects where healthcare and technology meet', intro: 'Selected projects showing how I work with systems, user flows and digital solutions – several directly connected to healthcare.', status: 'Status', focus: 'Focus', tech: 'Tech stack', code: 'Code on GitHub', frontend: 'Frontend on GitHub', backend: 'Backend on GitHub', demo: 'Demo' },
        skills: {
            eyebrow: 'Strengths', title: 'Skills for digital healthcare', intro: 'Clinical experience combined with an understanding of how healthcare systems, data and workflows are used in practice.',
            items: ['GCP and clinical research', 'Medication management', 'Clinical assessments', 'Patient safety', 'Medical patient communication', 'Vaccination and prevention', 'Structured documentation', 'Cross-functional collaboration'],
            groups: [
                { title: 'Clinical foundation', items: ['GCP and clinical research', 'Medication management', 'Clinical assessments'] },
                { title: 'Digital care insight', items: ['Structured documentation', 'Data quality', 'Digital care pathways'] },
                { title: 'Collaboration & communication', items: ['Medical patient communication', 'Cross-functional collaboration', 'Onboarding colleagues'] },
            ],
            practical: 'Practical information', languages: 'Languages', languagesValue: 'Greek (native), Swedish (fluent), English (fluent), German (good, B2)', driving: 'Driving licence', yes: 'Category B',
            licences: 'Licences & certifications', licencesValue: 'Registered nurse (National Board of Health and Welfare, Sweden), specialist nurse – district nursing, prescribing rights, GCP certified, LIF certified',
            availability: 'Availability', availabilityValue: 'By agreement', references: 'References', referencesValue: 'Available upon request',
            digitalEyebrow: 'Digital competence', digitalTitle: 'Understanding healthcare systems',
            digitalBody: 'My clinical background helps me understand how digital healthcare systems affect daily work: documentation, prioritisation, follow-up and communication between stakeholders. Together with my IT studies, this gives me a bridge between real healthcare practice and the teams that build the systems.',
            digitalItems: ['Electronic health records and digital care platforms', 'Data analysis and follow-up', 'Care pathways', 'Data quality', 'Patient-centred digitalisation'],
        },
        work: { eyebrow: 'Career', title: 'Work experience', fullCv: 'View my full CV' },
        education: { eyebrow: 'Background', title: 'Education' },
        courses: { eyebrow: 'Learning', title: 'Professional development & Courses', all: 'Show all courses', less: 'Show less' },
        cta: { title: 'Interested in working together?', body: 'I am open to roles in HealthTech and digital healthcare where clinical understanding and technical competence create value.', download: 'Download CV', contact: 'Contact me' },
        contact: {
            eyebrow: 'Contact', title: 'Contact me', intro: 'I am open to roles in HealthTech, eHealth and implementation where clinical experience and technical understanding are needed.',
            email: 'Email', linkedin: 'LinkedIn', linkedinProfile: 'LinkedIn profile', phone: 'Phone',
            formEyebrow: 'Send a message', formTitle: 'Write to me', name: 'Name', namePlaceholder: 'Your name',
            emailPlaceholder: 'your@email.com', message: 'Personal message', messagePlaceholder: 'Write your message here...', send: 'Send message',
            mailSubject: 'Portfolio enquiry from', mailName: 'Name', mailEmail: 'Email', mailMessage: 'Message',
        },
        cv: { eyebrow: 'Curriculum Vitae', profession: 'Registered district nurse', intro: 'Registered district nurse with experience in psychiatry, ECT/rTMS, vaccination and clinical research, plus software development skills. Seeking roles in HealthTech and digital healthcare where I can contribute clinical understanding, patient safety and the ability to translate healthcare needs into working systems.', download: 'Download as PDF', work: 'Work experience', education: 'Education', skills: 'Skills profile', courses: 'Professional development & Courses', profileTitle: 'Profile for HealthTech', profileBody: 'I combine clinical credibility, research understanding and technical knowledge. This makes me relevant for roles where healthcare needs must become digital solutions that work in everyday care.' },
        footer: 'Registered district nurse',
    },
    el: {
        nav: { home: 'Αρχική', about: 'About', expertise: 'Expertise', projects: 'Projects', work: 'Εμπειρία', education: 'Εκπαίδευση', skills: 'Δεξιότητες', courses: 'Μαθήματα', cv: 'Βιογραφικό', contact: 'Επικοινωνία', language: 'Γλώσσα', downloadCv: 'Download CV', menu: 'Άνοιγμα μενού' },
        hero: {
            eyebrow: 'Πτυχιούχος νοσηλεύτρια κοινοτικής υγείας',
            headline: 'Connecting healthcare, technology and people.',
            body: 'Πτυχιούχος νοσηλεύτρια κοινοτικής υγείας με κλινική εμπειρία, γνώση κλινικής έρευνας και ισχυρή επικοινωνία με ασθενείς. Αναζητώ ρόλους στη pharma όπου η ιατρική κατανόηση, οι σχέσεις εμπιστοσύνης και η σαφής συμβουλευτική επικοινωνία δημιουργούν αξία.',
            cv: 'Δείτε το βιογραφικό μου', contact: 'Επικοινωνήστε μαζί μου', imageAlt: 'Georgia Chalkia, νοσηλεύτρια κοινοτικής υγείας',
            highlights: [
                { title: 'Κλινική αξιοπιστία', body: 'Εμπειρία από θεραπεία, εμβολιασμούς, ψυχιατρική και κλινική έρευνα.' },
                { title: 'Ιατρική επικοινωνία', body: 'Άνεση στην εξήγηση θεραπείας, κινδύνου, παρακολούθησης και αξίας για τον ασθενή.' },
                { title: 'Δημιουργία σχέσεων', body: 'Σιγουριά στην επικοινωνία με ασθενείς, ομάδες φροντίδας και εξωτερικούς συνεργάτες.' },
            ],
        },
        about: {
            eyebrow: 'About', title: 'Healthcare, Technology και Commercial σε ένα ενιαίο προφίλ.',
            intro: 'Η κλινική εμπειρία είναι η βάση. Η τεχνολογία μου δίνει κατανόηση συστημάτων και η κατεύθυνση Life Science συνδέει την ιατρική επικοινωνία με ανάγκες χρηστών και συνεργατών.',
            pillars: [
                { title: 'Κλινική αξιοπιστία', body: 'Εμπειρία με ασθενείς, θεραπείες και διεπιστημονικές ομάδες.' },
                { title: 'Τεχνική κατανόηση', body: 'Κατανόηση συστημάτων, δεδομένων, APIs και ψηφιακής ανάπτυξης.' },
                { title: 'Life Science', body: 'Προσανατολισμός σε ρόλους όπου η κλινική γνώση δημιουργεί αξία.' },
            ],
        },
        hybrid: {
            eyebrow: 'Expertise', title: 'Healthcare × Technology × Commercial', intro: 'Τρεις περιοχές δεξιοτήτων σε ένα ενιαίο επαγγελματικό προφίλ.',
            tracks: [
                { label: '01 Healthcare', title: 'Κλινική εμπειρία', body: 'Εμπειρία από νοσηλευτική, ψυχιατρική, εμβολιασμό, ECT/rTMS, κλινική έρευνα και GCP.', items: ['District nursing', 'Psychiatry', 'Vaccination', 'ECT / rTMS', 'Clinical research', 'GCP', 'Patient safety', 'Medical communication'], href: '/#arbete', link: 'Δείτε εμπειρία' },
                { label: '02 Technology', title: 'Software development', body: 'Projects σε frontend, backend, βάσεις δεδομένων, APIs και ψηφιακές λύσεις υγείας.', items: ['C#', '.NET', 'ASP.NET Core', 'React', 'TypeScript', 'SQL', 'EF Core', 'REST APIs', 'FHIR R4', 'Git / GitHub', 'Azure', 'AI integrations'], href: '/#projects', link: 'Δείτε projects' },
                { label: '03 Commercial', title: 'Life Science & επικοινωνία', body: 'Κατανόηση αναγκών, επικοινωνία υγείας, συνεργασία με stakeholders και πελατοκεντρική κατεύθυνση.', items: ['Needs analysis', 'Relationship building', 'Healthcare communication', 'Stakeholder collaboration'], href: '/#contact', link: 'Επικοινωνία' },
            ],
            synergyEyebrow: 'Life Science', synergyTitle: 'Όπου η κλινική πράξη, η τεχνολογία και η αξία συναντιούνται', synergyBody: 'Μπορώ να μεταφράζω ανάμεσα στην υγεία, την τεχνολογία και την επικοινωνία με stakeholders.',
            synergyCards: [
                { title: 'Κλινική βάση', body: 'Κατανόηση ασθενών, ροών εργασίας και θεραπείας.' },
                { title: 'Ψηφιακή μετάφραση', body: 'Κατανόηση συστημάτων και ψηφιακών λύσεων.' },
                { title: 'Επικοινωνία', body: 'Ιατρική επικοινωνία με διαφορετικές ομάδες.' },
            ],
            rolesTitle: 'Κατάλληλοι ρόλοι', roles: ['Clinical trials', 'HealthTech', 'Product Specialist', 'Implementation', 'Customer Success'],
        },
        projects: { eyebrow: 'Έργα', title: 'Έργα όπου η υγεία συναντά την τεχνολογία', intro: 'Επιλεγμένα έργα που δείχνουν πώς δουλεύω με συστήματα, ροές χρηστών και ψηφιακές λύσεις – αρκετά με άμεση σύνδεση με την υγεία.', status: 'Κατάσταση', focus: 'Εστίαση', tech: 'Τεχνολογίες', code: 'Κώδικας στο GitHub', frontend: 'Frontend στο GitHub', backend: 'Backend στο GitHub', demo: 'Demo' },
        skills: {
            eyebrow: 'Δυνατά σημεία', title: 'Σχετικές δεξιότητες για τη φαρμακοβιομηχανία', intro: 'Κλινική εμπειρία οργανωμένη για φαρμακευτικούς ρόλους με έμφαση στη συμβουλευτική επικοινωνία, την ασφάλεια ασθενών και τις σχέσεις.',
            items: ['GCP και κλινική έρευνα', 'Διαχείριση φαρμάκων', 'Κλινική αξιολόγηση', 'Ασφάλεια ασθενών', 'Ιατρική επικοινωνία με ασθενείς', 'Εμβολιασμός και πρόληψη', 'Δομημένη τεκμηρίωση', 'Διεπιστημονική συνεργασία'],
            groups: [
                { title: 'Pharma & έρευνα', items: ['GCP και κλινική έρευνα', 'Διαχείριση φαρμάκων', 'Εμβολιασμός και πρόληψη'] },
                { title: 'Επικοινωνία & σχέσεις', items: ['Ιατρική επικοινωνία με ασθενείς', 'Διεπιστημονική συνεργασία', 'Συμβουλευτική προσέγγιση'] },
                { title: 'Κλινική ασφάλεια', items: ['Κλινική αξιολόγηση', 'Ασφάλεια ασθενών', 'Δομημένη τεκμηρίωση'] },
            ],
            practical: 'Πρακτικές πληροφορίες', languages: 'Γλώσσες', languagesValue: 'Ελληνικά (μητρική), σουηδικά (άριστα), αγγλικά (άριστα), γερμανικά (καλά, B2)', driving: 'Άδεια οδήγησης', yes: 'Κατηγορίας Β',
            licences: 'Άδειες και πιστοποιήσεις', licencesValue: 'Άδεια άσκησης επαγγέλματος νοσηλεύτριας (Socialstyrelsen, Σουηδία), ειδικευμένη νοσηλεύτρια κοινοτικής υγείας, δικαίωμα συνταγογράφησης, πιστοποίηση GCP, πιστοποίηση LIF',
            availability: 'Διαθεσιμότητα', availabilityValue: 'Κατόπιν συμφωνίας', references: 'Συστάσεις', referencesValue: 'Διαθέσιμες κατόπιν αιτήματος',
            digitalEyebrow: 'Ψηφιακή επάρκεια', digitalTitle: 'Κατανόηση συστημάτων υγείας',
            digitalBody: 'Παράλληλα με το κλινικό μου υπόβαθρο σπουδάζω ανάπτυξη συστημάτων και δημιουργώ ψηφιακές λύσεις συντονισμού φροντίδας. Έτσι κατανοώ τη δομημένη τεκμηρίωση, την ποιότητα δεδομένων και την επίδραση των ψηφιακών ροών στην ασφάλεια και την παρακολούθηση.',
            digitalItems: ['Ηλεκτρονικοί φάκελοι υγείας και ψηφιακές πλατφόρμες φροντίδας', 'Ανάλυση δεδομένων και παρακολούθηση', 'Κλινική τεκμηρίωση', 'Ποιότητα δεδομένων', 'Ψηφιακές ροές φροντίδας'],
        },
        work: { eyebrow: 'Σταδιοδρομία', title: 'Επαγγελματική εμπειρία', fullCv: 'Δείτε ολόκληρο το βιογραφικό' },
        education: { eyebrow: 'Υπόβαθρο', title: 'Εκπαίδευση' },
        courses: { eyebrow: 'Μάθηση', title: 'Επαγγελματική ανάπτυξη & Μαθήματα', all: 'Δείτε όλα τα μαθήματα', less: 'Λιγότερα' },
        cta: { title: 'Θέλετε να συζητήσουμε έναν pharma ρόλο όπου η κλινική εμπειρία κάνει διαφορά;', body: 'Ενδιαφέρομαι για φαρμακευτικούς ρόλους στη συμβουλευτική, τις πωλήσεις και την επικοινωνία με πελάτες, όπου η κατανόηση της υγείας, η ιατρική επικοινωνία και η εμπιστοσύνη είναι κεντρικές.', download: 'Λήψη βιογραφικού (PDF)', contact: 'Επικοινωνία' },
        contact: {
            eyebrow: 'Επικοινωνία', title: 'Επικοινωνήστε μαζί μου', intro: 'Είμαι ανοιχτή σε pharma ρόλους με επαφή με πελάτες, συμβουλευτική επικοινωνία και δημιουργία σχέσεων, όπου η κλινική εμπειρία και η οπτική του ασθενούς έχουν αξία.',
            email: 'Email', linkedin: 'LinkedIn', linkedinProfile: 'Προφίλ LinkedIn', phone: 'Τηλέφωνο',
            formEyebrow: 'Στείλτε μήνυμα', formTitle: 'Γράψτε μου', name: 'Όνομα', namePlaceholder: 'Το όνομά σας',
            emailPlaceholder: 'email@example.com', message: 'Προσωπικό μήνυμα', messagePlaceholder: 'Γράψτε το μήνυμά σας εδώ...', send: 'Αποστολή μηνύματος',
            mailSubject: 'Επικοινωνία μέσω portfolio από', mailName: 'Όνομα', mailEmail: 'Email', mailMessage: 'Μήνυμα',
        },
        cv: { eyebrow: 'Βιογραφικό σημείωμα', profession: 'Πτυχιούχος νοσηλεύτρια κοινοτικής υγείας', intro: 'Νοσηλεύτρια με κλινική εμπειρία στην ψυχιατρική, την κλινική έρευνα, τους εμβολιασμούς και τις προηγμένες θεραπείες. Αναζητώ φαρμακευτικούς ρόλους όπου μπορώ να αξιοποιήσω γνώσεις GCP, ασφάλεια ασθενών και ιατρική επικοινωνία.', download: 'Λήψη PDF', work: 'Επαγγελματική εμπειρία', education: 'Εκπαίδευση', skills: 'Προφίλ δεξιοτήτων', courses: 'Επαγγελματική ανάπτυξη & Μαθήματα', profileTitle: 'Προφίλ για pharma', profileBody: 'Συνδυάζω κλινική αξιοπιστία, κατανόηση της έρευνας και σίγουρη επικοινωνία με ασθενείς και επαγγελματίες υγείας. Αυτό με κάνει κατάλληλη για pharma ρόλους όπου η εμπιστοσύνη, η συμβουλευτική επικοινωνία και η ιατρική εφαρμογή είναι ουσιαστικές.' },
        footer: 'Νοσηλεύτρια κοινοτικής υγείας',
    },
};

type I18nContextValue = {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export const I18nProvider = ({ children }: { children: React.ReactNode }) => {
    const [locale, setLocaleState] = useState<Locale>('sv');

    useEffect(() => {
        const saved = window.localStorage.getItem('portfolio-locale') as Locale | null;
        if (saved && saved in localeNames) {
            setLocaleState(saved);
        } else if (saved) {
            window.localStorage.setItem('portfolio-locale', 'sv');
        }
    }, []);

    const setLocale = (nextLocale: Locale) => {
        setLocaleState(nextLocale);
        window.localStorage.setItem('portfolio-locale', nextLocale);
    };

    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);

    const value = useMemo(() => ({ locale, setLocale, t: messages[locale] }), [locale]);

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) throw new Error('useI18n must be used inside I18nProvider');
    return context;
};
