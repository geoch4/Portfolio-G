'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Locale = 'sv' | 'en' | 'el';

// Text i stället för flagg-emoji: Windows visar inte flaggor, bara bokstäverna "SE", "GB", "GR".
export const localeNames: Record<Locale, string> = {
    sv: 'SV',
    en: 'EN',
    el: 'EL',
};

type Messages = {
    nav: { home: string; about: string; work: string; projects: string; education: string; contact: string; language: string; downloadCv: string; menu: string; menuClose: string };
    hero: { eyebrow: string; headline: string; proof: string; stats: string[]; projectsButton: string; cvButton: string; imageAlt: string; cardTitle: string; cardBody: string };
    profile: {
        eyebrow: string; title: string;
        cards: { label: string; title: string; body: string; items: string[]; href: string; link: string }[];
        rolesTitle: string; roles: string[];
    };
    projects: { eyebrow: string; title: string; intro: string; status: string; focus: string; tech: string; code: string; frontend: string; backend: string; demo: string };
    work: { eyebrow: string; title: string; fullCv: string };
    education: { eyebrow: string; title: string };
    skills: {
        groups: { title: string; items: string[] }[];
        practical: string; languages: string; languagesValue: string; driving: string; drivingValue: string;
        licences: string; licencesValue: string;
        availability: string; availabilityValue: string; references: string; referencesValue: string;
    };
    courses: { all: string; less: string };
    cta: { title: string; body: string; download: string; contact: string };
    contact: {
        eyebrow: string; title: string; intro: string; email: string; linkedin: string;
        linkedinProfile: string; phone: string; formEyebrow: string; formTitle: string;
        name: string; namePlaceholder: string; emailPlaceholder: string; message: string;
        messagePlaceholder: string; send: string; mailSubject: string; mailName: string;
        mailEmail: string; mailMessage: string;
    };
    cv: { eyebrow: string; profession: string; intro: string; download: string; work: string; education: string; skills: string; courses: string; profileTitle: string; profileBody: string };
    footer: string;
};

const techStack = ['C#', '.NET', 'ASP.NET Core', 'EF Core', 'SQL Server', 'React', 'TypeScript', 'TanStack Query', 'Clean Architecture / CQRS', 'REST', 'JWT', 'FHIR R4', 'Git / GitHub'];

const messages: Record<Locale, Messages> = {
    sv: {
        nav: { home: 'Hem', about: 'Om mig', work: 'Erfarenhet', projects: 'Projekt', education: 'Utbildning', contact: 'Kontakt', language: 'Språk', downloadCv: 'Ladda ner CV', menu: 'Meny', menuClose: 'Stäng meny' },
        hero: {
            eyebrow: 'HealthTech · Vård × Teknik',
            headline: 'Distriktssköterska som bygger digitala vårdflöden.',
            proof: 'På Sahlgrenska såg jag hur remisserna fastnade mellan två IT-system – och tog initiativ till en digital remiss- och prioriteringslösning.',
            stats: ['12 års klinisk erfarenhet', 'GCP-certifierad', '4 språk', '.NET-utvecklare'],
            projectsButton: 'Se projekt', cvButton: 'Ladda ner CV',
            imageAlt: 'Georgia Chalkia, legitimerad distriktssköterska',
            cardTitle: 'Vård × Teknik', cardBody: 'Legitimerad distriktssköterska och .NET-utvecklare.',
        },
        profile: {
            eyebrow: 'Om mig',
            title: 'Vård, teknik och implementation',
            cards: [
                { label: '01 Vård', title: 'Klinisk erfarenhet', body: 'Tolv års klinisk erfarenhet från psykiatri, beroendevård, ECT/rTMS, primärvård och digital vård, samt klinisk forskning enligt GCP.', items: ['Distriktssköterska', 'Psykiatri', 'ECT/rTMS', 'Klinisk forskning', 'GCP', 'Förskrivningsrätt'], href: '/#arbete', link: 'Se erfarenhet' },
                { label: '02 Teknik', title: 'Systemutveckling', body: 'Systemutvecklare inom .NET (NBI Handelsakademin) med egna fullstack-projekt, bland annat ett remissystem för ECT/rTMS med FHIR R4.', items: ['C# / .NET', 'ASP.NET Core', 'React', 'TypeScript', 'SQL Server', 'FHIR R4'], href: '/#projects', link: 'Se projekt' },
                { label: '03 Implementation', title: 'Från behov till vardag', body: 'Har byggt arbetsflöden som kortade väntetider, utbildat personal och drivit införandet av taligenkänning.', items: ['Arbetsflöden', 'Införande', 'Utbildning av personal', 'Behovsanalys', 'GDPR & patientdatalagen'], href: '/kontakt', link: 'Ta kontakt' },
            ],
            rolesTitle: 'Roller där min profil passar',
            roles: ['Klinisk applikationsspecialist', 'Implementationsansvarig', 'Produktspecialist inom HealthTech', 'Systemförvaltare / systemägare inom vården', 'Clinical Impact Manager'],
        },
        projects: { eyebrow: 'Projekt', title: 'Projekt där vård och teknik möts', intro: 'Ett urval av projekt som visar hur jag arbetar med system, användarflöden och digitala lösningar – flera med direkt koppling till vården.', status: 'Status', focus: 'Fokus', tech: 'Teknik', code: 'Kod på GitHub', frontend: 'Frontend på GitHub', backend: 'Backend på GitHub', demo: 'Demo' },
        work: { eyebrow: 'Karriär', title: 'Arbetslivserfarenhet', fullCv: 'Se hela mitt CV' },
        education: { eyebrow: 'Bakgrund', title: 'Utbildning' },
        skills: {
            groups: [
                { title: 'Klinisk grund', items: ['GCP och klinisk forskning', 'Läkemedelshantering', 'Kliniska bedömningar', 'Patientsäkerhet', 'Triage'] },
                { title: 'Digital vård', items: ['Journalsystem och digitala vårdplattformar', 'Dataanalys och uppföljning', 'Strukturerad dokumentation', 'Digitala vårdflöden'] },
                { title: 'Samverkan & kommunikation', items: ['Medicinsk patientkommunikation', 'Motiverande samtal (MI)', 'Tvärprofessionellt samarbete', 'Introduktion och utbildning av personal'] },
                { title: 'Teknik', items: [...techStack, 'AI-integrationer (lokal LLM via Ollama)'] },
            ],
            practical: 'Praktisk information', languages: 'Språk', languagesValue: 'Grekiska (modersmål), svenska (flytande), engelska (flytande), tyska (goda, B2)', driving: 'Körkort', drivingValue: 'B-körkort',
            licences: 'Legitimationer', licencesValue: 'Legitimerad sjuksköterska (Socialstyrelsen), specialistsjuksköterska – distriktssköterska, förskrivningsrätt, GCP-certifierad, LIF-certifierad',
            availability: 'Tillgänglighet', availabilityValue: 'Enligt överenskommelse', references: 'Referenser', referencesValue: 'Lämnas på begäran',
        },
        courses: { all: 'Visa alla kurser', less: 'Visa färre' },
        cta: { title: 'Vill du jobba tillsammans?', body: 'Jag är öppen för roller inom HealthTech, e-hälsa och vård-IT där klinisk förståelse och teknisk kompetens skapar värde.', download: 'Ladda ner CV', contact: 'Kontakta mig' },
        contact: {
            eyebrow: 'Kontakt', title: 'Kontakta mig', intro: 'Jag är öppen för roller som klinisk applikationsspecialist, implementationsansvarig eller produktspecialist inom HealthTech.',
            email: 'E-post', linkedin: 'LinkedIn', linkedinProfile: 'LinkedIn-profil', phone: 'Telefon',
            formEyebrow: 'Skicka ett meddelande', formTitle: 'Skriv till mig', name: 'Namn', namePlaceholder: 'Ditt namn',
            emailPlaceholder: 'din@email.se', message: 'Personligt meddelande', messagePlaceholder: 'Skriv ditt meddelande här...', send: 'Skicka meddelande',
            mailSubject: 'Kontakt via portfolio från', mailName: 'Namn', mailEmail: 'E-post', mailMessage: 'Meddelande',
        },
        cv: {
            eyebrow: 'Curriculum Vitae', profession: 'Legitimerad distriktssköterska · Systemutvecklare .NET',
            intro: 'Legitimerad distriktssköterska och systemutvecklare inom .NET, med erfarenhet från psykiatri, ECT/rTMS, primärvård, vaccination och klinisk forskning. Söker roller inom HealthTech, e-hälsa och vård-IT där jag kan översätta vårdens behov till fungerande system.',
            download: 'Ladda ner som PDF', work: 'Arbetslivserfarenhet', education: 'Utbildning', skills: 'Kompetensprofil', courses: 'Kompetensutveckling & kurser',
            profileTitle: 'Profil för HealthTech', profileBody: 'Jag kombinerar klinisk trovärdighet, forskningserfarenhet enligt GCP och teknisk kunskap. Det gör mig relevant för roller där vårdens behov ska bli digitala lösningar som fungerar i vardagen.',
        },
        footer: 'Legitimerad distriktssköterska',
    },
    en: {
        nav: { home: 'Home', about: 'About', work: 'Experience', projects: 'Projects', education: 'Education', contact: 'Contact', language: 'Language', downloadCv: 'Download CV', menu: 'Menu', menuClose: 'Close menu' },
        hero: {
            eyebrow: 'HealthTech · Healthcare × Technology',
            headline: 'District nurse building digital care workflows.',
            proof: 'At Sahlgrenska I saw referrals getting stuck between two IT systems – and initiated a digital referral and prioritisation solution.',
            stats: ['12 years of clinical experience', 'GCP certified', '4 languages', '.NET developer'],
            projectsButton: 'View projects', cvButton: 'Download CV',
            imageAlt: 'Georgia Chalkia, registered district nurse',
            cardTitle: 'Healthcare × Technology', cardBody: 'Registered district nurse and .NET developer.',
        },
        profile: {
            eyebrow: 'About',
            title: 'Healthcare, technology and implementation',
            cards: [
                { label: '01 Healthcare', title: 'Clinical experience', body: 'Twelve years of clinical experience in psychiatry, addiction care, ECT/rTMS, primary care and digital care, plus clinical research under GCP.', items: ['District nurse', 'Psychiatry', 'ECT/rTMS', 'Clinical research', 'GCP', 'Prescribing rights'], href: '/#arbete', link: 'View experience' },
                { label: '02 Technology', title: 'Software development', body: '.NET software developer (NBI Handelsakademin) with my own full-stack projects, including a referral system for ECT/rTMS using FHIR R4.', items: ['C# / .NET', 'ASP.NET Core', 'React', 'TypeScript', 'SQL Server', 'FHIR R4'], href: '/#projects', link: 'View projects' },
                { label: '03 Implementation', title: 'From needs to everyday use', body: 'Built workflows that shortened waiting times, trained staff and led the introduction of speech recognition.', items: ['Workflows', 'Rollout', 'Staff training', 'Needs analysis', 'GDPR & patient data law'], href: '/kontakt', link: 'Get in touch' },
            ],
            rolesTitle: 'Roles where this profile fits',
            roles: ['Clinical application specialist', 'Implementation lead', 'HealthTech product specialist', 'System manager / system owner in healthcare', 'Clinical Impact Manager'],
        },
        projects: { eyebrow: 'Projects', title: 'Projects where healthcare and technology meet', intro: 'Selected projects showing how I work with systems, user flows and digital solutions – several directly connected to healthcare.', status: 'Status', focus: 'Focus', tech: 'Tech stack', code: 'Code on GitHub', frontend: 'Frontend on GitHub', backend: 'Backend on GitHub', demo: 'Demo' },
        work: { eyebrow: 'Career', title: 'Work experience', fullCv: 'View my full CV' },
        education: { eyebrow: 'Background', title: 'Education' },
        skills: {
            groups: [
                { title: 'Clinical foundation', items: ['GCP and clinical research', 'Medication management', 'Clinical assessments', 'Patient safety', 'Triage'] },
                { title: 'Digital care', items: ['Electronic health records and digital care platforms', 'Data analysis and follow-up', 'Structured documentation', 'Digital care pathways'] },
                { title: 'Collaboration & communication', items: ['Medical patient communication', 'Motivational interviewing (MI)', 'Cross-functional collaboration', 'Onboarding and training staff'] },
                { title: 'Technology', items: [...techStack, 'AI integrations (local LLM via Ollama)'] },
            ],
            practical: 'Practical information', languages: 'Languages', languagesValue: 'Greek (native), Swedish (fluent), English (fluent), German (good, B2)', driving: 'Driving licence', drivingValue: 'Category B',
            licences: 'Licences & certifications', licencesValue: 'Registered nurse (National Board of Health and Welfare, Sweden), specialist nurse – district nursing, prescribing rights, GCP certified, LIF certified',
            availability: 'Availability', availabilityValue: 'By agreement', references: 'References', referencesValue: 'Available upon request',
        },
        courses: { all: 'Show all courses', less: 'Show fewer' },
        cta: { title: 'Interested in working together?', body: 'I am open to roles in HealthTech, eHealth and health IT where clinical understanding and technical competence create value.', download: 'Download CV', contact: 'Contact me' },
        contact: {
            eyebrow: 'Contact', title: 'Contact me', intro: 'I am open to roles such as clinical application specialist, implementation lead or HealthTech product specialist.',
            email: 'Email', linkedin: 'LinkedIn', linkedinProfile: 'LinkedIn profile', phone: 'Phone',
            formEyebrow: 'Send a message', formTitle: 'Write to me', name: 'Name', namePlaceholder: 'Your name',
            emailPlaceholder: 'your@email.com', message: 'Personal message', messagePlaceholder: 'Write your message here...', send: 'Send message',
            mailSubject: 'Portfolio enquiry from', mailName: 'Name', mailEmail: 'Email', mailMessage: 'Message',
        },
        cv: {
            eyebrow: 'Curriculum Vitae', profession: 'Registered district nurse · .NET developer',
            intro: 'Registered district nurse and .NET software developer with experience in psychiatry, ECT/rTMS, primary care, vaccination and clinical research. Seeking roles in HealthTech, eHealth and health IT where I can translate healthcare needs into working systems.',
            download: 'Download as PDF', work: 'Work experience', education: 'Education', skills: 'Skills profile', courses: 'Professional development & courses',
            profileTitle: 'Profile for HealthTech', profileBody: 'I combine clinical credibility, research experience under GCP and technical knowledge. This makes me relevant for roles where healthcare needs must become digital solutions that work in everyday care.',
        },
        footer: 'Registered district nurse',
    },
    el: {
        nav: { home: 'Αρχική', about: 'Σχετικά', work: 'Εμπειρία', projects: 'Έργα', education: 'Εκπαίδευση', contact: 'Επικοινωνία', language: 'Γλώσσα', downloadCv: 'Λήψη βιογραφικού', menu: 'Μενού', menuClose: 'Κλείσιμο μενού' },
        hero: {
            eyebrow: 'HealthTech · Υγεία × Τεχνολογία',
            headline: 'Νοσηλεύτρια που χτίζει ψηφιακές ροές φροντίδας.',
            proof: 'Στο Sahlgrenska είδα τα παραπεμπτικά να κολλάνε ανάμεσα σε δύο πληροφοριακά συστήματα – και ανέλαβα πρωτοβουλία για μια ψηφιακή λύση παραπομπής και ιεράρχησης.',
            stats: ['12 χρόνια κλινικής εμπειρίας', 'Πιστοποίηση GCP', '4 γλώσσες', 'Προγραμματίστρια .NET'],
            projectsButton: 'Δείτε τα έργα', cvButton: 'Λήψη βιογραφικού',
            imageAlt: 'Georgia Chalkia, νοσηλεύτρια κοινοτικής υγείας',
            cardTitle: 'Υγεία × Τεχνολογία', cardBody: 'Νοσηλεύτρια κοινοτικής υγείας και προγραμματίστρια .NET.',
        },
        profile: {
            eyebrow: 'Σχετικά με εμένα',
            title: 'Υγεία, τεχνολογία και υλοποίηση',
            cards: [
                { label: '01 Υγεία', title: 'Κλινική εμπειρία', body: 'Δώδεκα χρόνια κλινικής εμπειρίας στην ψυχιατρική, τη φροντίδα εξαρτήσεων, τις θεραπείες ECT/rTMS, την πρωτοβάθμια και την ψηφιακή φροντίδα, καθώς και κλινική έρευνα σύμφωνα με την GCP.', items: ['Νοσηλεύτρια κοινοτικής υγείας', 'Ψυχιατρική', 'ECT/rTMS', 'Κλινική έρευνα', 'GCP', 'Δικαίωμα συνταγογράφησης'], href: '/#arbete', link: 'Δείτε την εμπειρία' },
                { label: '02 Τεχνολογία', title: 'Ανάπτυξη συστημάτων', body: 'Προγραμματίστρια συστημάτων .NET (NBI Handelsakademin) με δικά μου έργα full stack, μεταξύ άλλων ένα σύστημα παραπομπών για ECT/rTMS με FHIR R4.', items: ['C# / .NET', 'ASP.NET Core', 'React', 'TypeScript', 'SQL Server', 'FHIR R4'], href: '/#projects', link: 'Δείτε τα έργα' },
                { label: '03 Υλοποίηση', title: 'Από την ανάγκη στην καθημερινή χρήση', body: 'Δημιούργησα ροές εργασίας που μείωσαν τους χρόνους αναμονής, εκπαίδευσα προσωπικό και ηγήθηκα της εισαγωγής της αναγνώρισης ομιλίας.', items: ['Ροές εργασίας', 'Εισαγωγή συστημάτων', 'Εκπαίδευση προσωπικού', 'Ανάλυση αναγκών', 'GDPR & δεδομένα ασθενών'], href: '/kontakt', link: 'Επικοινωνία' },
            ],
            rolesTitle: 'Ρόλοι που ταιριάζουν στο προφίλ μου',
            roles: ['Κλινική ειδικός εφαρμογών', 'Υπεύθυνη υλοποίησης', 'Ειδικός προϊόντων HealthTech', 'Διαχειρίστρια / υπεύθυνη συστημάτων υγείας', 'Clinical Impact Manager'],
        },
        projects: { eyebrow: 'Έργα', title: 'Έργα όπου η υγεία συναντά την τεχνολογία', intro: 'Επιλεγμένα έργα που δείχνουν πώς δουλεύω με συστήματα, ροές χρηστών και ψηφιακές λύσεις – αρκετά με άμεση σύνδεση με την υγεία.', status: 'Κατάσταση', focus: 'Εστίαση', tech: 'Τεχνολογίες', code: 'Κώδικας στο GitHub', frontend: 'Frontend στο GitHub', backend: 'Backend στο GitHub', demo: 'Demo' },
        work: { eyebrow: 'Σταδιοδρομία', title: 'Επαγγελματική εμπειρία', fullCv: 'Δείτε ολόκληρο το βιογραφικό' },
        education: { eyebrow: 'Υπόβαθρο', title: 'Εκπαίδευση' },
        skills: {
            groups: [
                { title: 'Κλινική βάση', items: ['GCP και κλινική έρευνα', 'Διαχείριση φαρμάκων', 'Κλινικές αξιολογήσεις', 'Ασφάλεια ασθενών', 'Triage'] },
                { title: 'Ψηφιακή φροντίδα', items: ['Ηλεκτρονικοί φάκελοι υγείας και ψηφιακές πλατφόρμες φροντίδας', 'Ανάλυση δεδομένων και παρακολούθηση', 'Δομημένη τεκμηρίωση', 'Ψηφιακές ροές φροντίδας'] },
                { title: 'Συνεργασία & επικοινωνία', items: ['Ιατρική επικοινωνία με ασθενείς', 'Παρακινητική συνέντευξη (MI)', 'Διεπιστημονική συνεργασία', 'Ένταξη και εκπαίδευση προσωπικού'] },
                { title: 'Τεχνολογία', items: [...techStack, 'Ενσωματώσεις AI (τοπικό LLM μέσω Ollama)'] },
            ],
            practical: 'Πρακτικές πληροφορίες', languages: 'Γλώσσες', languagesValue: 'Ελληνικά (μητρική), σουηδικά (άριστα), αγγλικά (άριστα), γερμανικά (καλά, B2)', driving: 'Άδεια οδήγησης', drivingValue: 'Κατηγορίας Β',
            licences: 'Άδειες και πιστοποιήσεις', licencesValue: 'Άδεια άσκησης επαγγέλματος νοσηλεύτριας (Socialstyrelsen, Σουηδία), ειδικευμένη νοσηλεύτρια κοινοτικής υγείας, δικαίωμα συνταγογράφησης, πιστοποίηση GCP, πιστοποίηση LIF',
            availability: 'Διαθεσιμότητα', availabilityValue: 'Κατόπιν συμφωνίας', references: 'Συστάσεις', referencesValue: 'Διαθέσιμες κατόπιν αιτήματος',
        },
        courses: { all: 'Δείτε όλα τα μαθήματα', less: 'Λιγότερα' },
        cta: { title: 'Θέλετε να συνεργαστούμε;', body: 'Είμαι ανοιχτή σε ρόλους στο HealthTech, την ηλεκτρονική υγεία και την πληροφορική υγείας, όπου η κλινική κατανόηση και η τεχνική γνώση δημιουργούν αξία.', download: 'Λήψη βιογραφικού', contact: 'Επικοινωνήστε μαζί μου' },
        contact: {
            eyebrow: 'Επικοινωνία', title: 'Επικοινωνήστε μαζί μου', intro: 'Είμαι ανοιχτή σε ρόλους όπως κλινική ειδικός εφαρμογών, υπεύθυνη υλοποίησης ή ειδικός προϊόντων στο HealthTech.',
            email: 'Email', linkedin: 'LinkedIn', linkedinProfile: 'Προφίλ LinkedIn', phone: 'Τηλέφωνο',
            formEyebrow: 'Στείλτε μήνυμα', formTitle: 'Γράψτε μου', name: 'Όνομα', namePlaceholder: 'Το όνομά σας',
            emailPlaceholder: 'email@example.com', message: 'Προσωπικό μήνυμα', messagePlaceholder: 'Γράψτε το μήνυμά σας εδώ...', send: 'Αποστολή μηνύματος',
            mailSubject: 'Επικοινωνία μέσω portfolio από', mailName: 'Όνομα', mailEmail: 'Email', mailMessage: 'Μήνυμα',
        },
        cv: {
            eyebrow: 'Βιογραφικό σημείωμα', profession: 'Νοσηλεύτρια κοινοτικής υγείας · Προγραμματίστρια .NET',
            intro: 'Νοσηλεύτρια κοινοτικής υγείας και προγραμματίστρια συστημάτων .NET, με εμπειρία στην ψυχιατρική, τις θεραπείες ECT/rTMS, την πρωτοβάθμια φροντίδα, τους εμβολιασμούς και την κλινική έρευνα. Αναζητώ ρόλους στο HealthTech, την ηλεκτρονική υγεία και την πληροφορική υγείας, όπου μπορώ να μετατρέπω τις ανάγκες της φροντίδας σε λειτουργικά συστήματα.',
            download: 'Λήψη PDF', work: 'Επαγγελματική εμπειρία', education: 'Εκπαίδευση', skills: 'Προφίλ δεξιοτήτων', courses: 'Επαγγελματική ανάπτυξη & μαθήματα',
            profileTitle: 'Προφίλ για το HealthTech', profileBody: 'Συνδυάζω κλινική αξιοπιστία, ερευνητική εμπειρία σύμφωνα με την GCP και τεχνική γνώση. Αυτό με κάνει κατάλληλη για ρόλους όπου οι ανάγκες της φροντίδας πρέπει να γίνουν ψηφιακές λύσεις που λειτουργούν στην καθημερινότητα.',
        },
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
