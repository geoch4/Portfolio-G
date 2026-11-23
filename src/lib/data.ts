/**
 * Single source of content. Every string here comes from Georgia's developer CV
 * (CV_Georgia_Developer_EN, translated faithfully into Swedish). The extra courses
 * under CERTIFICATIONS come from her Swedish CV (CV Georgia Chalkia, section
 * "Kompetensutveckling och kurser"). Years and school names that the developer CV left as
 * placeholders are filled in from the Swedish CV (approved by Georgia, Nov 2026).
 * Components only read from this file.
 */

export type LogoKey = string;

export const PROFILE = {
  name: "Georgia Chalkia",
  firstName: "Georgia",
  initials: "GC",
  role: "Fullstackutvecklare",
  roleSecond: "Specialistsjuksköterska",
  roleLine: "Fullstackutvecklare · Specialistsjuksköterska i distriktsvård",
  email: "grchalkia@gmail.com",
  phone: "+46 70 488 49 50",
  phoneHref: "tel:+46704884950",
  location: "Göteborg, Sverige",
  github: "https://github.com/geoch4",
  githubLabel: "github.com/geoch4",
  linkedin: "https://www.linkedin.com/in/georgia-chalkia-72035317b/",
  linkedinLabel: "linkedin.com/in/georgia-chalkia-72035317b",
  resume: "/CV-Georgia-Chalkia.pdf",
  /** Profile paragraph, verbatim (translated). */
  resumeSummary:
    "Fullstackutvecklare inom .NET och React med över 12 års erfarenhet som legitimerad sjuksköterska och specialistsjuksköterska i distriktsvård – bland annat inom psykiatri, beroendevård och digital triage, där hela bedömningen vilar på språket. Jag bygger applikationer från början till slut, från databasdesign och säkra API:er till användargränssnitt, och arbetar med Clean Architecture, validering och säkerhet. Det jag tillför utöver koden är kliniskt omdöme: jag ser när ett systems utdata är medicinskt rimlig och när en subtil förändring i formuleringen ändrar den kliniska innebörden, och jag vet hur ett besök faktiskt går till när kliniker och patient inte delar språk. Själv flerspråkig (grekiska, svenska, engelska, tyska), GCP-certifierad och van vid de krav på dokumentation och spårbarhet som reglerad medicinteknisk mjukvara ställer.",
  /** Second short line, from the CV ("Other"). */
  extraLine: "Intressen: hälsoteknik, interoperabilitet och produktutveckling.",
  /** Paraphrase of the CV's own wording (profile + "Clinical background as engineering capability"). */
  quote:
    "Jag kan avgöra om ett systems kliniska utdata är säker, korrekt och användbar i sitt sammanhang – och märka när en enda formulering ändrar innebörden.",
  languages: [
    { name: "Grekiska", level: "Modersmål" },
    { name: "Svenska", level: "Flytande" },
    { name: "Engelska", level: "Flytande" },
    { name: "Tyska", level: "B2" },
  ],
  graduation: "2026",
  city: "Göteborg",
  currentRole: "Grundare, GMed Consulting AB",
  education: ".NET-systemutveckling, NBI-Handelsakademin (examen 2026)",
  /** ID-card back: "What I am" — every line from the CV. */
  idBack: [
    "Fullstackutvecklare inom .NET och React",
    "Specialistsjuksköterska i distriktsvård, 12+ år",
    ".NET-systemutveckling, NBI-Handelsakademin · examen 2026",
    "Byggt MedQuick, FLUX / VOLT och CatFinder",
    "GCP-certifierad · legitimerad sjuksköterska",
  ],
} as const;

export type NavItem = { id: string; label: string };
export const NAV: NavItem[] = [
  { id: "om", label: "Om" },
  { id: "kompetenser", label: "Kompetenser" },
  { id: "projekt", label: "Projekt" },
  { id: "erfarenhet", label: "Erfarenhet" },
  { id: "meriter", label: "Meriter" },
  { id: "kontakt", label: "Kontakt" },
];

/** Section tags, numbered in page order. */
export const SECTIONS = {
  om: { index: "01", label: "Om mig" },
  kompetenser: { index: "02", label: "Kompetenser" },
  projekt: { index: "03", label: "Utvalda projekt" },
  certifieringar: { index: "04", label: "Certifieringar & kurser" },
  erfarenhet: { index: "05", label: "Erfarenhet & utbildning" },
  meriter: { index: "06", label: "Meriter" },
  kontakt: { index: "07", label: "Kontakt" },
} as const;

export type Skill = {
  id: string;
  name: string;
  symbol: string;
  /** brand logo key (public/logos/devicon) or concept icon key */
  logo: LogoKey;
};
export type SkillGroup = { family: string; short: string; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    family: "Backend & .NET",
    short: "Backend",
    skills: [
      { id: "csharp", name: "C#", symbol: "Cs", logo: "csharp" },
      { id: "dotnet", name: ".NET 8", symbol: "Nt", logo: "dotnetcore" },
      { id: "aspnet", name: "ASP.NET Core", symbol: "As", logo: "dotnetcore" },
      { id: "webapi", name: "Web API", symbol: "Wa", logo: "api" },
      { id: "efcore", name: "EF Core", symbol: "Ef", logo: "orm" },
      { id: "linq", name: "LINQ", symbol: "Lq", logo: "query" },
      { id: "minimalapi", name: "Minimal API", symbol: "Ma", logo: "api" },
    ],
  },
  {
    family: "Arkitektur & mönster",
    short: "Arkitektur",
    skills: [
      { id: "clean", name: "Clean Architecture", symbol: "Ca", logo: "rings" },
      { id: "layered", name: "Lagerindelad design", symbol: "Ld", logo: "layers" },
      { id: "repo", name: "Repository Pattern", symbol: "Rp", logo: "repo" },
      { id: "dto", name: "DTO:er", symbol: "Dt", logo: "transfer" },
      { id: "rest", name: "REST", symbol: "Re", logo: "api" },
    ],
  },
  {
    family: "Hälsodata & interoperabilitet",
    short: "Hälsodata",
    skills: [
      { id: "fhir", name: "FHIR R4", symbol: "Fh", logo: "fhir" },
      { id: "hl7", name: "HL7", symbol: "Hl", logo: "exchange" },
      { id: "ehr", name: "Journalsystem (EHR)", symbol: "Eh", logo: "record" },
      { id: "gdpr", name: "GDPR", symbol: "Gd", logo: "shield" },
      { id: "pdl", name: "Patientdatalagen", symbol: "Pd", logo: "law" },
      { id: "infosec", name: "Informationssäkerhet", symbol: "Is", logo: "lock" },
    ],
  },
  {
    family: "Frontend",
    short: "Frontend",
    skills: [
      { id: "react", name: "React", symbol: "Rc", logo: "react" },
      { id: "typescript", name: "TypeScript", symbol: "Ts", logo: "typescript" },
      { id: "vite", name: "Vite", symbol: "Vi", logo: "vitejs" },
      { id: "htmlcss", name: "HTML/CSS", symbol: "Hc", logo: "html5" },
      { id: "tailwind", name: "Tailwind CSS", symbol: "Tw", logo: "tailwindcss" },
      { id: "restint", name: "REST-integration", symbol: "Ri", logo: "plug" },
    ],
  },
  {
    family: "Databaser",
    short: "Databaser",
    skills: [
      { id: "sqlserver", name: "SQL Server", symbol: "Sq", logo: "microsoftsqlserver" },
      { id: "tsql", name: "T-SQL", symbol: "Tq", logo: "query" },
      { id: "migrations", name: "EF Migrations", symbol: "Em", logo: "migrate" },
      { id: "er", name: "ER-modellering", symbol: "Er", logo: "er" },
    ],
  },
  {
    family: "DevOps & driftsättning",
    short: "DevOps",
    skills: [
      { id: "github", name: "Git/GitHub", symbol: "Gh", logo: "github" },
      { id: "actions", name: "GitHub Actions", symbol: "Ga", logo: "githubactions" },
      { id: "cicd", name: "CI/CD", symbol: "Ci", logo: "loop" },
      { id: "azure", name: "Azure", symbol: "Az", logo: "azure" },
      { id: "docker", name: "Docker", symbol: "Dk", logo: "docker" },
    ],
  },
  {
    family: "Arbetssätt",
    short: "Arbetssätt",
    skills: [
      { id: "scrum", name: "Scrum", symbol: "Sc", logo: "sprint" },
      { id: "kanban", name: "Kanban", symbol: "Kb", logo: "kanban" },
      { id: "agile", name: "Agilt", symbol: "Ag", logo: "loop" },
      { id: "oop", name: "OOP", symbol: "Op", logo: "objects" },
      { id: "review", name: "Kodgranskning", symbol: "Kg", logo: "review" },
      { id: "flow", name: "GitHub Flow", symbol: "Gf", logo: "branch" },
    ],
  },
  {
    family: "Klinisk expertis",
    short: "Kliniskt",
    skills: [
      { id: "district", name: "Distriktsvård", symbol: "Dv", logo: "home" },
      { id: "psych", name: "Psykiatri", symbol: "Py", logo: "mind" },
      { id: "addiction", name: "Beroendevård", symbol: "Bv", logo: "care" },
      { id: "ect", name: "ECT / rTMS", symbol: "Ec", logo: "pulse" },
      { id: "research", name: "Klinisk forskning", symbol: "Kf", logo: "flask" },
      { id: "gcp", name: "GCP", symbol: "Gc", logo: "check" },
      { id: "digitalcare", name: "Digital vård", symbol: "Dg", logo: "screen" },
      { id: "triage", name: "Triage", symbol: "Tr", logo: "triage" },
      { id: "safety", name: "Patientsäkerhet", symbol: "Ps", logo: "shield" },
      { id: "interpreter", name: "Tolkmedierad vård", symbol: "Tm", logo: "speech" },
      { id: "terminology", name: "Medicinsk terminologi", symbol: "Mt", logo: "book" },
      { id: "requirements", name: "Kravinsamling", symbol: "Ki", logo: "list" },
    ],
  },
];

export type Project = {
  id: string;
  index: string;
  title: string;
  kicker: string;
  status?: string;
  description: string;
  features: string[];
  /** label as written in the CV + logo key */
  tech: { label: string; logo: LogoKey }[];
  /** skill ids from SKILL_GROUPS used by this project (from the CV stack line + description) */
  uses: string[];
  github?: string;
  ui: "cpr" | "referral" | "crud";
};

export const PROJECTS: Project[] = [
  {
    id: "medquick",
    index: "01",
    title: "MedQuick",
    kicker: "HLR-beslutsstöd · Fullstack",
    description:
      "Webbapplikation som guidar klinikern steg för steg genom HLR-algoritmen, med tidtagning och åtgärdslogg. Byggd utifrån aktuella riktlinjer för hjärt-lungräddning, med ett gränssnitt designat för snabb interaktion med låg felrisk under tidspress – där formuleringen i varje uppmaning måste vara entydig.",
    features: [
      "Steg-för-steg genom HLR-algoritmen",
      "Tidtagning",
      "Åtgärdslogg",
      "Byggd på aktuella riktlinjer",
      "Snabb interaktion under tidspress",
      "Entydiga uppmaningar",
    ],
    tech: [
      { label: "React", logo: "react" },
      { label: "TypeScript", logo: "typescript" },
      { label: ".NET Web API", logo: "dotnetcore" },
    ],
    uses: ["react", "typescript", "dotnet", "webapi"],
    ui: "cpr",
  },
  {
    id: "flux-volt",
    index: "02",
    title: "FLUX / VOLT",
    kicker: "Digitalt remiss- och prioriteringssystem",
    status: "Pågående",
    description:
      "Remiss- och prioriteringsplattform för ECT- och rTMS-verksamheter, utformad kring verkliga flaskhalsar i koordineringen vid Sahlgrenska Universitetssjukhuset / Västra Götalandsregionen. Innehåller en FHIR R4-datamodell, rollbaserad åtkomst, prioriteringslogik och en koordinatordashboard. Egen kravställning, arkitektur och utveckling i ett team på två personer.",
    features: [
      "FHIR R4-datamodell",
      "Rollbaserad åtkomst",
      "Prioriteringslogik",
      "Koordinatordashboard",
      "Egen kravställning & arkitektur",
      "Team på två personer",
    ],
    tech: [
      { label: "React", logo: "react" },
      { label: "TypeScript", logo: "typescript" },
      { label: "C#/.NET", logo: "csharp" },
      { label: "FHIR R4", logo: "fhir" },
      { label: "SQL Server", logo: "microsoftsqlserver" },
    ],
    uses: ["react", "typescript", "csharp", "dotnet", "fhir", "sqlserver"],
    ui: "referral",
  },
  {
    id: "catfinder",
    index: "03",
    title: "CatFinder",
    kicker: "Fullstack-applikation",
    description:
      "Fullstack-applikation med separat frontend och backend, REST API, relationsdatabas via EF Core, autentisering och kompletta CRUD-flöden. Versionshantering och driftsättning via GitHub.",
    features: [
      "Separat frontend och backend",
      "REST API",
      "Relationsdatabas via EF Core",
      "Autentisering",
      "Kompletta CRUD-flöden",
      "Versionshantering & driftsättning via GitHub",
    ],
    tech: [
      { label: "React", logo: "react" },
      { label: "Vite", logo: "vitejs" },
      { label: "ASP.NET Core", logo: "dotnetcore" },
      { label: "EF Core", logo: "orm" },
      { label: "SQL Server", logo: "microsoftsqlserver" },
    ],
    uses: ["react", "vite", "aspnet", "efcore", "sqlserver", "rest", "github"],
    ui: "crud",
  },
];

/** Projects that use a given skill id (derived from PROJECTS). */
export function projectsForSkill(id: string): string[] {
  return PROJECTS.filter((p) => p.uses.includes(id)).map((p) => p.title);
}

export type TimelineStop = {
  kind: "Utbildning" | "Erfarenhet";
  when?: string; // only where the CV states it
  title: string;
  place: string;
  detail: string;
  bullets?: string[];
};

/** Combined path, oldest → newest. Years from the Swedish CV; GMed's start year is not stated. */
export const EDUCATION: TimelineStop[] = [
  {
    kind: "Utbildning",
    when: "2009 – 2013",
    title: "Sjuksköterskeexamen (BSc)",
    place: "Teknologiska Universitet, Cypern",
    detail: "Svensk sjuksköterskelegitimation utfärdad av Socialstyrelsen.",
  },
  {
    kind: "Utbildning",
    title: "MSc – Ergospirometri, träning och rehabilitering",
    when: "2014 – 2016",
    place: "Medicinska Skolan, Grekland",
    detail: "Masterexamen.",
  },
  {
    kind: "Utbildning",
    title: "Specialistsjuksköterska – distriktsvård",
    when: "2023 – 2025",
    place: "Karlstads universitet",
    detail: "Specialistsjuksköterskeexamen med inriktning distriktsvård.",
  },
  {
    kind: "Utbildning",
    when: "Pågående · examen 2026",
    title: ".NET-systemutveckling",
    place: "NBI-Handelsakademin, Göteborg",
    detail:
      "C#, .NET, Clean Architecture, databasdesign, Azure, agil metodik och fullstackutveckling med .NET och React.",
  },
];

export const EXPERIENCE: TimelineStop[] = [
  {
    kind: "Erfarenhet",
    when: "2019 – 2022",
    title: "Legitimerad sjuksköterska",
    place: "Psykiatri & beroendevård",
    detail: "Allmänpsykiatrisk slutenvård och beroendevård. Handledning av kollegor och sjuksköterskestudenter.",
  },
  {
    kind: "Erfarenhet",
    when: "2021 – 2022",
    title: "Forskningssjuksköterska (GCP)",
    place: "Klinisk forskning",
    detail:
      "Genomförande av studier enligt Good Clinical Practice: datainsamling, källdokumentation, protokollföljsamhet och kvalitetssäkring av studiedata.",
  },
  {
    kind: "Erfarenhet",
    when: "2022 – 2025",
    title: "Distriktssköterska",
    place: "Min Doktor / digital vård",
    detail:
      "Digital triage och patientbedömning i journal- och beslutsstödssystem. Praktisk insikt i hur digitala vårdflöden fungerar i verkligheten – och var de brister.",
  },
  {
    kind: "Erfarenhet",
    when: "2025 – nu",
    title: "Sjuksköterska, ECT & neuromodulering",
    place: "Sahlgrenska Universitetssjukhuset",
    detail:
      "Koordinering av ECT- och rTMS-behandlingar: remissflöde, prioritering, patientinformation och uppföljning. Medlem i enhetens digitaliseringsgrupp och van användare av digitala system som TIK.",
  },
  {
    kind: "Erfarenhet",
    when: "– nu",
    title: "Grundare & distriktssköterska",
    place: "GMed Consulting AB",
    detail:
      "Eget bolag med konsultuppdrag inom vård och hälsoteknik, parallellt med utveckling av egna digitala vårdlösningar.",
    bullets: [
      "Meliva vårdcentral – distriktsvård",
      "Kommunal primärvård och hemsjukvård",
      "Digital vård och patienthantering på Capio Go",
      "Psykiatri, Norge",
    ],
  },
];

/** Display order of the combined path (oldest → newest, per CV order). */
export const PATH: TimelineStop[] = [
  EDUCATION[0],
  EDUCATION[1],
  EXPERIENCE[0],
  EXPERIENCE[1],
  EXPERIENCE[2],
  EDUCATION[2],
  EXPERIENCE[3],
  EXPERIENCE[4],
  EDUCATION[3],
];

export type Certification = { title: string; issuer: string };
export const CERTIFICATIONS: Certification[] = [
  { title: "GCP-certifierad", issuer: "Good Clinical Practice" },
  { title: "Legitimerad sjuksköterska", issuer: "Socialstyrelsen" },
  { title: "GCP-utbildning för framtida forskare", issuer: "Kurs" },
  { title: "Digitalisering i vården – utmaningar och möjligheter", issuer: "7,5 hp" },
  { title: "Hållbar organisering och styrning inom vård och omsorg", issuer: "7,5 hp" },
  { title: "Strategier för personalutveckling", issuer: "15 hp" },
  { title: "Handledareutbildning", issuer: "7,5 hp" },
  { title: "MI-samtal, återfallsprevention, känsloreglering och DBT", issuer: "Kurs" },
  { title: "Omvårdnadsvetenskap, handledning och bedömning i verksamhetsförlagd utbildning", issuer: "Kurs" },
];

export type Achievement = {
  value: number;
  suffix?: string;
  label: string;
  caption: string;
  detail: string;
  logo: LogoKey;
};

/** Only figures stated in the CVs: "12+ years", four languages, nine certifications/courses. */
export const ACHIEVEMENTS: Achievement[] = [
  {
    value: 12,
    suffix: "+",
    label: "År i vården",
    caption: "Legitimerad sjuksköterska och specialistsjuksköterska i distriktsvård.",
    detail: "Psykiatri · beroendevård · digital triage · ECT/rTMS",
    logo: "care",
  },
  {
    value: 4,
    label: "Språk",
    caption: "Grekiska, svenska, engelska och tyska.",
    detail: "Grekiska modersmål · tyska B2",
    logo: "speech",
  },
  {
    value: CERTIFICATIONS.length,
    label: "Certifieringar & kurser",
    caption: "Bland annat GCP och Digitalisering i vården.",
    detail: "Legitimation från Socialstyrelsen",
    logo: "check",
  },
];
