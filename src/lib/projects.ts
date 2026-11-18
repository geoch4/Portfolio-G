export type ProjectData = {
    title: string;
    category: string;
    status?: string;
    description: string;
    focus: string[];
    tech: string[];
};

export const projects: ProjectData[] = [
    {
        title: 'MedQuick',
        category: 'HealthTech / AI',
        status: 'In progress',
        description: 'AI-assisted emergency guidance with patient-centred flows for urgent situations.',
        focus: ['CPR flow', 'AED map', 'Offline/PWA', 'Swedish/English'],
        tech: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'PWA', 'i18next', 'Ollama / local LLM'],
    },
    {
        title: 'ECT / rTMS Digital Referral & Prioritisation System',
        category: 'HealthTech',
        status: 'In progress',
        description: 'Digital referral and prioritisation workflow for ECT/rTMS coordination and clinical follow-up.',
        focus: ['Digital referral', 'Prioritisation', 'Coordinator dashboard', 'Healthcare workflows'],
        tech: ['React', 'TypeScript', 'TanStack Query', 'Axios', 'JWT', 'C#/.NET', 'FHIR R4', 'SQL Server'],
    },
    {
        title: 'MOVE',
        category: 'Full Stack',
        description: 'E-commerce platform built with a structured backend and modern frontend architecture.',
        focus: ['E-commerce', 'Authentication', 'Structured backend', 'Frontend integration'],
        tech: ['C#', '.NET', 'Clean Architecture', 'CQRS / MediatR', 'EF Core', 'SQL Server', 'JWT', 'React'],
    },
    {
        title: 'CatFinder',
        category: 'Full Stack',
        description: 'Full-stack application connecting a React frontend with an ASP.NET Core backend.',
        focus: ['Full-stack flows', 'Database persistence', 'API integration'],
        tech: ['React', 'Vite', 'ASP.NET Core', 'EF Core', 'SQL Server'],
    },
    {
        title: 'OnePark',
        category: 'AI / Maps',
        description: 'Parking availability and booking concept with map interaction and AI assistant support.',
        focus: ['Parking availability', 'Booking flow', 'Map UI', 'AI assistant'],
        tech: ['React', 'MapTiler SDK', 'REST API', 'AI assistant'],
    },
];
