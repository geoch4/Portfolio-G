// src/types/index.ts

export interface CvEntryData {
    title: string;
    location: string; // T.ex. arbetsgivare eller skola
    period: string;
    description: string[]; // En lista med punkter
    tags?: string[]; // Visas som chips på jobbkortet. Utelämna för att inte visa några taggar.
}
