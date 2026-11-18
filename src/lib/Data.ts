// src/lib/data.ts
import { CvEntryData } from '@/types';

// Lista din arbetslivserfarenhet här, den senaste först.
export const workExperience: CvEntryData[] = [
    {
        title: 'Distriktssköterska',
        location: 'Capio Go och Meliva vårdcentral Masthuggskajen',
        period: 'Januari 2026 - 2026 · Avslutade uppdrag',
        description: [
            'Bedömning, triage och egenvårdsråd på mottagning, i telefon och via chatt och video.',
            'Vaccinationer, hälsokontroller och hänvisning till rätt vårdnivå.',
        ],
    },
    {
        title: 'Distriktssköterska',
        location: 'ECT- och rTMS-mottagningen, Sahlgrenska Universitetssjukhuset',
        period: 'Januari 2025 - Januari 2026',
        description: [
            'Samordnade behandlingar mellan remitterande psykiatriska enheter, läkare och mottagningen.',
            'Såg hur remisserna fastnade mellan två IT-system. Tog initiativ till ett koncept för en digital remiss- och prioriteringslösning, och drev införandet av taligenkänning.',
        ],
    },
    {
        title: 'Klinikansvarig vaccinationssjuksköterska',
        location: 'Min Doktor',
        period: 'Mars 2022 - Januari 2025',
        description: [
            'Ansvarig för mottagningens drift, försäljning och planering.',
            'Arbetade på Min Doktors mottagningar i hela VGR och samarbetade med Apotek Hjärtat på varje ort.',
            'Byggde arbetsflöden som kortade väntetiderna och utbildade personalen.',
            'Planerade och genomförde aktiviteter för att öka vaccinationstäckningen inom HPV-projektet i VGR.',
        ],
    },
    {
        title: 'Legitimerad sjuksköterska',
        location: 'Vacant Vårdbemanning',
        period: '2022 - 2023 · Extrauppdrag, timanställning',
        description: [
            'Uppdrag inom hemsjukvård och äldreboende, bland annat i Halland och i Norge.',
        ],
    },
    {
        title: 'Sjuksköterska och samordnande forskningssjuksköterska',
        location: 'Beroendemedicin, Sahlgrenska Universitetssjukhuset',
        period: 'Mars 2021 - Mars 2022 · Delad tjänst, klinik och forskning',
        description: [
            'Klinik: abstinensbehandling, läkemedelshantering och omvårdnad vid alkoholavgiftning.',
            'Forskning: del av forskarteamet i NordAlc-projektet om alkoholavgiftning.',
            'Patientinklusion, informerat samtycke och datainsamling enligt GCP, nära huvudprövare och forskarteam.',
            'Samordnade registerdata mellan klinik och forskningsenhet.',
        ],
    },
    {
        title: 'Sjuksköterska',
        location: 'Psykiatri och beroendevård, Sahlgrenska Universitetssjukhuset',
        period: 'Juni 2017 - Februari 2022',
        description: [
            'Allmänpsykiatri och akut beroendevård för unga vuxna och vuxna.',
            'Läkemedelshantering inom CNS-området och akuta medicinska bedömningar.',
            'Arbetsledande ansvar i team med läkare, psykologer, socialtjänst och behandlingshem.',
            'Språkombud för utlandsutbildade läkare och sjuksköterskor.',
        ],
    },
    {
        title: 'Legitimerad sjuksköterska',
        location: 'Euromedica Arogi, Larisa, Grekland',
        period: 'Maj 2014 - December 2016',
        description: [
            'Ortopedi, stroke- och rehabiliteringsvård, med läkemedelshantering.',
            'Rehabiliteringsplaner tillsammans med fysioterapeuter, arbetsterapeuter och läkare.',
        ],
    },
];

// Lista din utbildning här, den senaste först.
export const education: CvEntryData[] = [
    {
        title: 'Specialistsjuksköterskeprogrammet, distriktssköterska, 75 hp',
        location: 'Karlstads universitet',
        period: 'Augusti 2023 - Oktober 2024',
        description: [
            'Hälsofrämjande arbete, digital vård och triage, ledarskap, förskrivningsrätt.',
        ],
    },
    {
        title: 'Masterexamen i arbetsfysiologi, träning och rehabilitering, 120 hp',
        location: 'University of Thessaly',
        period: 'Januari 2014 - Januari 2016',
        description: [
            'Spirometri, ergospirometri och rehabilitering av patienter med KOL.',
        ],
    },
    {
        title: 'Specialisering i psykisk hälsa och specialpedagogik',
        location: 'TEI of Thessaly',
        period: 'December 2013 - Maj 2014',
        description: [],
    },
    {
        title: 'Sjuksköterskeexamen, 240 hp',
        location: 'Cyprus University of Technology',
        period: 'September 2009 - Juni 2013',
        description: [],
    },
];

// Denna ska ligga härefter, utanför den andra listan.
export const skills: string[] = [
    'Affärsmässigt och konsultativt förhållningssätt',
    'Självständig och flexibel',
    'God lagspelare och samarbetsinriktad',
    'Goda IT-kunskaper',
    'GCP-utbildning',
    'Strukturerad och planerad',
];

export const coursesAndCertifications: string[] = [
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
