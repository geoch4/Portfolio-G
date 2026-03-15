// src/lib/data.ts
import { CvEntryData } from '@/types';

// Lista din arbetslivserfarenhet här, den senaste först.
export const workExperience: CvEntryData[] = [
    {
        title: 'Distriktsköterska i ECT & rTMS mottagning',
        location: 'Sahlgrenska Universitessjukhus, Göteborg',
        period: 'Januari 2025 - Nuvarande',
        description: [
            'På Min Doktor arbetade jag både digitalt och på mottagning med vaccinationer för barn och vuxna.',
            'Jag ansvarade för rådgivning, försäljning och utbildningsmaterial samt genomförde målgruppsanpassade insatser för att öka vaccinationstäckningen. samt varit med på HPV-projektet.',
            'Genom interna utbildningar stärkte jag min kompetens och arbetade systematiskt enligt gällande riktlinjer.',
        ],
    },
    {
        title: 'Vaccinationsansvarig sjuksköterska',
        location: 'Min Doktor International, Västra Götaland',
        period: 'Mars 2022-Januari 2025',
        description: [
            'I rollen som klinikansvarig sjuksköterska hade jag ansvar för den dagliga driften, inklusive fysisk och digital rådgivning, försäljning av vaccinationer, samarbete med läkemedelsföretag, handledning av personal och nya kollegor samt primärvårds vårdtjänster.',
            'Jag deltog i det regionala HPV-projektet och utvecklade strukturerade arbetsflöden med patientfokus för att öka vaccinationstäckningen och stärka arbetsmiljön.',
            'Utöver det bidrog jag i marknadsföringsteamet med idéer kring patientkommunikation och synlighet, samt visat intresse att delta i OBM-teamet där samarbetar man med HR och chefer för att stödja förändringsarbete och effektivisera verksamheten.',
        ],
    },
    {
        title: 'Samordnande forskningssköterska',
        location: 'Nordhemskliniken, Göteborg',
        period: 'Maj 2021-Mars 2022',
        description: [
            'På Nordhemskliniken arbetade jag med abstinensbehandling, läkemedelshantering och tvärprofessionell samverkan och som forskningssköterska i NordAlc-projektet, där jag medverkade i forskning om alkoholavgiftning på Beroendemedicin.',
            'Dessa erfarenheter gav mig djup förståelse för specialistvård och läkemedelsanvändning',
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
        title: 'Magisterexamen 75hp',
        location: 'Karlstads Universitet, Karlstad',
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
        location: 'Medicinska Skolan, Larisa, Grekland',
        period: 'Januari 2014-Januari 2016',
        description: [
            'Två-årig masterexamen med inriktning på fysisk aktivitet, rehabilitering och arbetsfysiologi, med fokus på kliniska tester, spirometrier, konditionstester, behandling av kroniska sjukdomar och rehabilitering.',
            'Utbildningen gav mig fördjupade kunskaper och strategier i att utforma individanpassade rehabiliteringsplaner samt strategier för hälsofrämjande och förebyggande arbete inom livsstilsförändring, förbättring av livskvalitet, hälsopedagogik/coaching och kostrådgivning- kompetenser som är mycket tillämpbara och direkt kopplade till företagshälsovården.',
        ],
    },
    {
        title: 'Cerifikat, University of Thessaly, Larisa, Greece',
        location: 'Tekniska utbildningsinstitutet (TEI) i Thessalien',
        period: 'December 2013 - Maj 2014',
        description: [
            'Genomförde en 400-timmars utbildning i psykisk hälsa och specialpedagogik vid Tekniska utbildningsinstitutet (TEI) i Thessalien.',
            'Fick kunskaper inom klassificering av psykiska sjukdomar, ADHD, autism, krishantering, psykosocialt stöd och rehabilitering, med fokus på att stödja utsatta grupper och individer med särskilda behov.',
        ],
    },
    {
        title: 'Sjuksköterskeexamen, 240 hp',
        location: 'Teknologiska Universitet, Limassol, Cyprus',
        period: 'September 2009 - Juni 2013',
        description: [
            'Jag har en sjuksköterskeexamen från Teknologiska Universitetet i Cypern (TEPAK), där jag kombinerade teoretiska studier med omfattande praktik inom akutvård, medicin, kirurgi, psykiatri och primärvård.',
            'Utbildningen gav mig bred erfarenhet av patientvård och utvecklade mina färdigheter i medicinsk bedömning, läkemedelshantering, hälsofrämjande arbete och evidensbaserad vård med patienten i fokus.',
        ],
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
    'Cerifikat i psykisk hälsa och specialpedagogik, 400 timmar'
];
