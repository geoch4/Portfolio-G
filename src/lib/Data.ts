// src/lib/data.ts
import { CvEntryData } from '@/types';

// Lista din arbetslivserfarenhet här, den senaste först.
export const workExperience: CvEntryData[] = [
    {
        title: 'Distriktsköterska i ECT & rTMS mottagning',
        location: 'Sahlgrenska Universitessjukhus, Göteborg',
        period: 'Januari 2025 - Nuvarande',
        description: [
            'På ECT & rTMS-mottagningen vid Sahlgrenska arbetar jag som distriktssköterska med ansvar för förberedelse, genomförande och uppföljning av ECT- och rTMS-behandlingar.',
            'Jag ansvarar för kliniska patientbedömningar, läkemedelshantering, dokumentation och säker vård i nära samarbete med psykiater och anestesipersonal.',
            'Rollen har stärkt min förmåga att följa behandlingsprotokoll, uppmärksamma kliniska förändringar och kommunicera tydligt med patienter och tvärprofessionella team.',
        ],
    },
    // TODO: Dubbelkolla de överlappande perioderna mars 2022–januari 2025,
    // april 2019–september 2022 och maj 2021–mars 2022. Förtydliga vilka roller
    // som eventuellt pågick parallellt eller var deltidsroller.
    {
        title: 'Vaccinationsansvarig sjuksköterska',
        location: 'Min Doktor International, Västra Götaland',
        period: 'Mars 2022-Januari 2025',
        description: [
            'Som klinik- och vaccinationsansvarig sjuksköterska ansvarade jag för daglig drift, medicinsk rådgivning, vaccinationer, kvalitetssäkra arbetssätt och introduktion av nya kollegor.',
            'Jag samarbetade med läkemedelsföretag och deltog i det regionala HPV-projektet, där jag utvecklade patientfokuserade arbetsflöden för att öka vaccinationstäckningen.',
            'Jag bidrog även med målgruppsanpassad patientkommunikation och verksamhetsutveckling, vilket gav erfarenhet av att förmedla medicinsk information tydligt och omsätta riktlinjer i praktiskt arbete.',
        ],
    },
    {
        title: 'Samordnande forskningssköterska',
        location: 'Nordhemskliniken, Göteborg',
        period: 'Maj 2021-Mars 2022',
        description: [
            'Som forskningssköterska i NordAlc-projektet medverkade jag i klinisk forskning om alkoholavgiftning inom Beroendemedicin.',
            'Arbetet omfattade patientnära forskningsarbete, strukturerad dokumentation, läkemedelshantering och tvärprofessionell samverkan i specialistvård.',
            'Erfarenheten gav mig förståelse för kvalitet, patientsäkerhet och följsamhet till strukturerade arbetssätt i kliniska studier.',
        ],
    },
    {
        title: 'Legitimerad sjuksköterska inom Psykiatrin',
        location: 'Sahlgrenska Universitessjukhus, Göteborg',
        period: 'April 2019-September 2022',
        description: [
            'På Sahlgrenska Universitetssjukhuset arbetade jag inom både beroendevård och allmän psykiatri, med fokus på akuta medicinska bedömningar, abstinensbehandling, läkemedelshantering och suicidriskbedömning.',
            'Jag samarbetade tvärprofessionellt med läkare, psykologer och socialtjänst för att skapa individanpassade vårdplaner, och använde motiverande samtal (MI) som en del av patientstödet.',
            'Denna erfarenhet har gett mig en djup förståelse för specialistläkemedel, krishantering och helhetsinriktad vård.',
        ],
    },
    {
        title: 'Legitimerad sjuksköterska',
        location: 'Euromedica klinik, Larisa, Grekland',
        period: 'Maj 2015 December 2016',
        description: [
            'På Arogi Euromedica-kliniken arbetade jag inom avancerad äldrevård, ortopedi, strokevård och rehabilitering.',
            'Jag ansvarade för medicinsk omvårdnad, sårvård, läkemedelshantering.',
            'Samarbetade med fysioterapeuter, arbetsterapeuter och läkare för att utforma individanpassade rehabiliteringsplaner med fokus på funktionell återhämtning, delaktighet och självständighet i vardagen.',
        ],
    },
];

// Lista din utbildning här, den senaste först.
export const education: CvEntryData[] = [
    {
        title: 'Specialistsjuksköterskeexamen – distriktssköterska, 75 hp',
        location: 'Karlstads Universitet',
        period: 'Augusti 2023- Januari 2025',
        description: [
            'Genomförde distriktsköterskeutbildning med inriktning mot folkhälsa vid Karlstads universitet och fokus på hälsofrämjande och förebyggande vårdinsatser.',
            'Fick bred erfarenhet inom barnhälsovård, elevhälsa, primärvård och hemsjukvård samt utbildning i ledarskap och förskrivningsrätt.',
            'Examensarbetet fokuserade på digitala vårdtjänster för äldre, vilket stärkte min kompetens inom digitalisering, telefonrådgivning, motiverande samtal och triagering.',
            'Praktik inom BVC, skolor, vårdcentral och avancerad hemsjukvård ingick.',
        ],
    },
    {
        title: 'Masterexamen i Arbetsfysiologi, träning och rehabilitering, 120hp',
        location: 'Medicinska Skolan',
        period: 'Januari 2014-Januari 2016',
        description: [
            'Två-årig masterexamen med inriktning på fysisk aktivitet, rehabilitering och arbetsfysiologi, med fokus på kliniska tester, spirometrier, konditionstester, behandling av kroniska sjukdomar och rehabilitering.',
            'Utbildningen gav mig fördjupade kunskaper och strategier i att utforma individanpassade rehabiliteringsplaner samt strategier för hälsofrämjande och förebyggande arbete inom livsstilsförändring, förbättring av livskvalitet, hälsopedagogik/coaching och kostrådgivning- kompetenser som är mycket tillämpbara och direkt kopplade till företagshälsovården.',
        ],
    },
    {
        title: 'Cerifikat, University of Thessaly, Larisa, Greece',
        location: 'Tekniska utbildningsinstitutet (TEI)',
        period: 'December 2013 - Maj 2014',
        description: [
            'Genomförde en 400-timmars utbildning i psykisk hälsa och specialpedagogik vid Tekniska utbildningsinstitutet (TEI) i Thessalien.',
            'Fick kunskaper inom klassificering av psykiska sjukdomar, ADHD, autism, krishantering, psykosocialt stöd och rehabilitering, med fokus på att stödja utsatta grupper och individer med särskilda behov.',
        ],
    },
    {
        title: 'Sjuksköterskeexamen, 240 hp',
        location: 'Teknologiska Universitet',
        period: 'September 2009 - Juni 2013',
        description: [
            'Jag har en sjuksköterskeexamen från Teknologiska Universitetet i Cypern (TEPAK), där jag kombinerade teoretiska studier med omfattande praktik inom akutvård, medicin, kirurgi, psykiatri och primärvård.',
            'Utbildningen gav mig bred erfarenhet av patientvård och utvecklade mina färdigheter i medicinsk bedömning, läkemedelshantering, hälsofrämjande arbete och evidensbaserad vård med patienten i fokus.',
        ],
    },
];

// Denna ska ligga härefter, utanför den andra listan.
export const skills: string[] = [
    'GCP och klinisk forskning',
    'Läkemedelshantering',
    'Kliniska bedömningar',
    'Patientsäkerhet',
    'Medicinsk patientkommunikation',
    'Vaccination och prevention',
    'Strukturerad dokumentation',
    'Tvärprofessionellt samarbete',
];

export const coursesAndCertifications: string[] = [
    'GCP-utbildning för framtida forskare',
    'Digitalisering i vården - utmaningar och möjligheter, Göteborgs Universitet 7,5hp',
    'Hållbar organisering och styrning inom vård och omsorg, Göteborgs Universitet 7,5hp',
    'Strategier för personalutveckling, Göteborgs Universitet 15hp',
    'Omvårdnadsvetenskap, Handledning och bedömning i verksamhetsförlagd utbildning, Örebro Universitet',
    'Handledareutbildning, Göteborgs Universitet, 7,5 hp',
    'MI-samtal Återfallsprevention/känsloreglering/DBT',
    'Fysisk aktivitet och hälsa för KRAFT-instruktörer, 7,5 hp',
    'Fysisk aktivitet och hälsa för KRAFT-strateger, 7,5 hp',
    'Systematisk arbetsmiljöarbete Miljöarbete',
    'Certifikat i psykisk hälsa och specialpedagogik, 400 timmar'
];
