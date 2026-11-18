// src/types/index.ts

export interface CvEntryData {
    title: string;
    location: string; // T.ex. arbetsgivare eller skola
    period: string;
    description: string[]; // En lista med punkter
}