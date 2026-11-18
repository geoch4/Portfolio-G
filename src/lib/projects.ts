import { Locale } from '@/lib/i18n';

type ProjectText = {
    title: string;
    category: string;
    status?: string;
    description: string;
    focus: string[];
    /** Konkret bakgrund från klinisk erfarenhet som projektet bygger på. */
    caseStudy?: { label: string; body: string };
};

type ProjectBase = {
    id: string;
    tone: 'emerald' | 'violet' | 'blue';
    tech: string[];
    /** Huvudrepo, eller frontend-repo när backendRepoUrl finns. */
    repoUrl?: string;
    backendRepoUrl?: string;
    demoUrl?: string;
    text: Record<Locale, ProjectText>;
};

export type ProjectData = Omit<ProjectBase, 'text'> & ProjectText;

const github = (repo: string) => `https://github.com/geoch4/${repo}`;

const referralCase = {
    sv: 'Såg hur remisserna fastnade mellan två IT-system. Tog initiativ till ett koncept för en digital remiss- och prioriteringslösning och drev införandet av taligenkänning.',
    en: 'I saw referrals getting stuck between two IT systems. I initiated a concept for a digital referral and prioritisation solution and led the introduction of speech recognition.',
    el: 'Είδα τα παραπεμπτικά να κολλάνε ανάμεσα σε δύο πληροφοριακά συστήματα. Ανέλαβα πρωτοβουλία για μια ψηφιακή λύση παραπομπής και ιεράρχησης και ηγήθηκα της εισαγωγής της αναγνώρισης ομιλίας.',
};

const projectList: ProjectBase[] = [
    {
        id: 'ect-referral',
        tone: 'emerald',
        tech: ['React', 'TypeScript', 'TanStack Query', 'Axios', 'JWT', 'C#/.NET', 'FHIR R4', 'SQL Server'],
        repoUrl: github('BookingSystemECT-FE'),
        backendRepoUrl: github('BookingSystemECT-BE'),
        text: {
            sv: {
                title: 'Remiss- och prioriteringssystem för ECT/rTMS',
                category: 'HealthTech',
                status: 'Pågående',
                description: 'Digitalt remiss- och prioriteringsflöde för samordning och klinisk uppföljning av ECT/rTMS. Designat efter GDPR och patientdatalagen.',
                focus: ['Digital remiss', 'Prioritering', 'Koordinatorsvy', 'Vårdflöden'],
                caseStudy: { label: 'Case från Sahlgrenska', body: referralCase.sv },
            },
            en: {
                title: 'ECT/rTMS Digital Referral & Prioritisation System',
                category: 'HealthTech',
                status: 'In progress',
                description: 'Digital referral and prioritisation workflow for ECT/rTMS coordination and clinical follow-up. Designed around GDPR and the Swedish Patient Data Act.',
                focus: ['Digital referral', 'Prioritisation', 'Coordinator dashboard', 'Healthcare workflows'],
                caseStudy: { label: 'Case from Sahlgrenska', body: referralCase.en },
            },
            el: {
                title: 'Σύστημα ψηφιακής παραπομπής και ιεράρχησης για ECT/rTMS',
                category: 'HealthTech',
                status: 'Σε εξέλιξη',
                description: 'Ψηφιακή ροή παραπομπής και ιεράρχησης για τον συντονισμό και την κλινική παρακολούθηση θεραπειών ECT/rTMS. Σχεδιασμένο σύμφωνα με τον GDPR και τη σουηδική νομοθεσία για τα δεδομένα ασθενών.',
                focus: ['Ψηφιακή παραπομπή', 'Ιεράρχηση', 'Πίνακας συντονιστή', 'Ροές φροντίδας'],
                caseStudy: { label: 'Περίπτωση από το Sahlgrenska', body: referralCase.el },
            },
        },
    },
    {
        id: 'medquick',
        tone: 'violet',
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'PWA', 'i18next', 'Ollama / local LLM'],
        repoUrl: github('MedQuick'),
        text: {
            sv: {
                title: 'MedQuick',
                category: 'HealthTech / AI',
                status: 'Pågående',
                description: 'AI-stödd vägledning vid akuta situationer, med patientnära flöden.',
                focus: ['HLR-flöde', 'Hjärtstartarkarta', 'Offline/PWA', 'Svenska/engelska'],
            },
            en: {
                title: 'MedQuick',
                category: 'HealthTech / AI',
                status: 'In progress',
                description: 'AI-assisted emergency guidance with patient-centred flows for urgent situations.',
                focus: ['CPR flow', 'AED map', 'Offline/PWA', 'Swedish/English'],
            },
            el: {
                title: 'MedQuick',
                category: 'HealthTech / AI',
                status: 'Σε εξέλιξη',
                description: 'Καθοδήγηση με υποστήριξη τεχνητής νοημοσύνης σε επείγουσες καταστάσεις, με ροές εστιασμένες στον ασθενή.',
                focus: ['Ροή ΚΑΡΠΑ', 'Χάρτης απινιδωτών', 'Offline/PWA', 'Σουηδικά/αγγλικά'],
            },
        },
    },
    {
        id: 'move',
        tone: 'blue',
        tech: ['C#', '.NET', 'Clean Architecture', 'CQRS / MediatR', 'EF Core', 'SQL Server', 'JWT', 'React'],
        repoUrl: github('MOVE'),
        backendRepoUrl: github('MOVE.API.Backend'),
        text: {
            sv: {
                title: 'MOVE',
                category: 'Fullstack',
                description: 'E-handelsplattform med strukturerad backend och modern frontendarkitektur.',
                focus: ['E-handel', 'Autentisering', 'Strukturerad backend', 'Frontendintegration'],
            },
            en: {
                title: 'MOVE',
                category: 'Full Stack',
                description: 'E-commerce platform built with a structured backend and modern frontend architecture.',
                focus: ['E-commerce', 'Authentication', 'Structured backend', 'Frontend integration'],
            },
            el: {
                title: 'MOVE',
                category: 'Full Stack',
                description: 'Πλατφόρμα ηλεκτρονικού εμπορίου με δομημένο backend και σύγχρονη αρχιτεκτονική frontend.',
                focus: ['Ηλεκτρονικό εμπόριο', 'Αυθεντικοποίηση', 'Δομημένο backend', 'Ενσωμάτωση frontend'],
            },
        },
    },
    {
        id: 'catfinder',
        tone: 'blue',
        tech: ['React', 'Vite', 'ASP.NET Core', 'EF Core', 'SQL Server'],
        repoUrl: github('CatFinder-FE'),
        backendRepoUrl: github('CatFinder-BE'),
        text: {
            sv: {
                title: 'CatFinder',
                category: 'Fullstack',
                description: 'Fullstack-applikation som kopplar en React-frontend till en ASP.NET Core-backend.',
                focus: ['Fullstack-flöden', 'Databaslagring', 'API-integration'],
            },
            en: {
                title: 'CatFinder',
                category: 'Full Stack',
                description: 'Full-stack application connecting a React frontend with an ASP.NET Core backend.',
                focus: ['Full-stack flows', 'Database persistence', 'API integration'],
            },
            el: {
                title: 'CatFinder',
                category: 'Full Stack',
                description: 'Εφαρμογή full stack που συνδέει ένα frontend σε React με backend σε ASP.NET Core.',
                focus: ['Ροές full stack', 'Αποθήκευση σε βάση δεδομένων', 'Ενσωμάτωση API'],
            },
        },
    },
    {
        id: 'onepark',
        tone: 'violet',
        tech: ['React', 'MapTiler SDK', 'REST API', 'AI assistant'],
        // TODO: Lägg till repoUrl/demoUrl för OnePark när länken finns.
        text: {
            sv: {
                title: 'OnePark',
                category: 'AI / Kartor',
                description: 'Koncept för parkeringstillgänglighet och bokning med kartinteraktion och AI-assistent.',
                focus: ['Lediga platser', 'Bokningsflöde', 'Kartgränssnitt', 'AI-assistent'],
            },
            en: {
                title: 'OnePark',
                category: 'AI / Maps',
                description: 'Parking availability and booking concept with map interaction and AI assistant support.',
                focus: ['Parking availability', 'Booking flow', 'Map UI', 'AI assistant'],
            },
            el: {
                title: 'OnePark',
                category: 'AI / Χάρτες',
                description: 'Ιδέα για διαθεσιμότητα και κράτηση θέσεων στάθμευσης με διαδραστικό χάρτη και βοηθό τεχνητής νοημοσύνης.',
                focus: ['Διαθεσιμότητα θέσεων', 'Ροή κράτησης', 'Διεπαφή χάρτη', 'Βοηθός AI'],
            },
        },
    },
];

export const getProjects = (locale: Locale): ProjectData[] =>
    projectList.map(({ text, ...project }) => ({ ...project, ...text[locale] }));
