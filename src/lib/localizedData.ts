import { education, coursesAndCertifications, workExperience } from '@/lib/Data';
import { Locale } from '@/lib/i18n';
import { CvEntryData } from '@/types';

type LocalizedData = {
    work: CvEntryData[];
    education: CvEntryData[];
    courses: string[];
};

const english: LocalizedData = {
    work: [
        { title: 'District nurse', location: 'Capio Go and Meliva primary care centre Masthuggskajen', period: 'January 2026 - 2026 · Completed assignments', description: ['Assessment, triage and self-care advice in clinic, by phone, chat and video.', 'Vaccinations, health checks and referral to the right level of care.'] },
        { title: 'District nurse', location: 'ECT and rTMS clinic, Sahlgrenska University Hospital', period: 'January 2025 - January 2026', description: ['Coordinated treatments between referring psychiatric units, physicians and the clinic.', 'Noticed referrals getting stuck between two IT systems. Initiated a concept for a digital referral and prioritisation solution, and led the introduction of speech recognition.'] },
        { title: 'Clinic lead and vaccination nurse', location: 'Min Doktor', period: 'March 2022 - January 2025', description: ['Responsible for clinic operations, sales and planning.', 'Worked at Min Doktor clinics across Västra Götaland in partnership with Apotek Hjärtat at each location.', 'Built workflows that shortened waiting times and trained staff.', 'Planned and ran activities to increase vaccination coverage in the regional HPV project.'] },
        { title: 'Registered nurse', location: 'Vacant Vårdbemanning', period: '2022 - 2023 · Additional assignments, hourly', description: ['Assignments in home healthcare and nursing homes, including in Halland and Norway.'] },
        { title: 'Nurse and coordinating research nurse', location: 'Addiction Medicine, Sahlgrenska University Hospital', period: 'March 2021 - March 2022 · Split role, clinical and research', description: ['Clinical: withdrawal treatment, medication management and nursing care during alcohol detoxification.', 'Research: member of the research team in the NordAlc project on alcohol detoxification.', 'Patient inclusion, informed consent and data collection according to GCP, working closely with the principal investigator and research team.', 'Coordinated registry data between the clinic and the research unit.'] },
        { title: 'Nurse', location: 'Psychiatry and addiction care, Sahlgrenska University Hospital', period: 'June 2017 - February 2022', description: ['General psychiatry and acute addiction care for young adults and adults.', 'Medication management in the CNS area and acute medical assessments.', 'Supervisory responsibility in teams with physicians, psychologists, social services and treatment homes.', 'Language mentor for internationally trained physicians and nurses.'] },
        { title: 'Registered nurse', location: 'Euromedica Arogi, Larisa, Greece', period: 'May 2014 - December 2016', description: ['Orthopaedics, stroke and rehabilitation care, including medication management.', 'Rehabilitation plans together with physiotherapists, occupational therapists and physicians.'] },
    ],
    education: [
        { title: 'Specialist nursing programme, district nursing, 75 credits', location: 'Karlstad University', period: 'August 2023 - October 2024', description: ['Health promotion, digital care and triage, leadership, prescribing rights.'] },
        { title: 'Master’s degree in Exercise Physiology, Training and Rehabilitation, 120 credits', location: 'University of Thessaly', period: 'January 2014 - January 2016', description: ['Spirometry, cardiopulmonary exercise testing and rehabilitation of patients with COPD.'] },
        { title: 'Specialisation in Mental Health and Special Education', location: 'TEI of Thessaly', period: 'December 2013 - May 2014', description: [] },
        { title: 'Nursing degree, 240 credits', location: 'Cyprus University of Technology', period: 'September 2009 - June 2013', description: [] },
    ],
    courses: ['GCP training for future researchers', 'Digitalisation in healthcare - challenges and opportunities, 7.5 credits', 'Sustainable organisation and governance in health and social care, 7.5 credits', 'Strategies for staff development, 15 credits', 'Clinical supervision and assessment in workplace learning', 'Supervisor training, 7.5 credits', 'Motivational interviewing, relapse prevention, emotional regulation and DBT', 'Physical activity and health for KRAFT instructors, 7.5 credits', 'Physical activity and health for KRAFT strategists, 7.5 credits', 'Systematic work environment management'],
};

const greek: LocalizedData = {
    work: [
        { title: 'Νοσηλεύτρια κοινοτικής υγείας', location: 'Capio Go και Meliva, κέντρο υγείας Masthuggskajen', period: 'Ιανουάριος 2026 - 2026 · Ολοκληρωμένες αναθέσεις', description: ['Αξιολόγηση, διαλογή (triage) και συμβουλές αυτοφροντίδας στο ιατρείο, τηλεφωνικά, μέσω chat και βίντεο.', 'Εμβολιασμοί, προληπτικοί έλεγχοι υγείας και παραπομπή στο κατάλληλο επίπεδο φροντίδας.'] },
        { title: 'Νοσηλεύτρια κοινοτικής υγείας', location: 'Μονάδα ECT και rTMS, Πανεπιστημιακό Νοσοκομείο Sahlgrenska', period: 'Ιανουάριος 2025 - Ιανουάριος 2026', description: ['Συντονισμός θεραπειών μεταξύ των ψυχιατρικών μονάδων που παραπέμπουν, των ιατρών και της μονάδας.', 'Παρατήρησα ότι τα παραπεμπτικά καθυστερούσαν ανάμεσα σε δύο πληροφοριακά συστήματα. Ανέλαβα πρωτοβουλία για μια ψηφιακή λύση παραπομπής και ιεράρχησης και ηγήθηκα της εισαγωγής της αναγνώρισης ομιλίας.'] },
        { title: 'Υπεύθυνη κλινικής και νοσηλεύτρια εμβολιασμών', location: 'Min Doktor', period: 'Μάρτιος 2022 - Ιανουάριος 2025', description: ['Υπεύθυνη για τη λειτουργία, τις πωλήσεις και τον προγραμματισμό της κλινικής.', 'Εργάστηκα στις κλινικές της Min Doktor σε όλη την περιφέρεια Västra Götaland, σε συνεργασία με τα φαρμακεία Apotek Hjärtat σε κάθε πόλη.', 'Δημιούργησα ροές εργασίας που μείωσαν τους χρόνους αναμονής και εκπαίδευσα το προσωπικό.', 'Σχεδίασα και υλοποίησα δράσεις για την αύξηση της εμβολιαστικής κάλυψης στο περιφερειακό πρόγραμμα HPV.'] },
        { title: 'Νοσηλεύτρια', location: 'Vacant Vårdbemanning', period: '2022 - 2023 · Πρόσθετες αναθέσεις, ωριαία απασχόληση', description: ['Αναθέσεις στην κατ’ οίκον νοσηλεία και σε οίκους ευγηρίας, μεταξύ άλλων στο Halland και στη Νορβηγία.'] },
        { title: 'Νοσηλεύτρια και συντονίστρια νοσηλεύτρια έρευνας', location: 'Ιατρική Εξαρτήσεων, Πανεπιστημιακό Νοσοκομείο Sahlgrenska', period: 'Μάρτιος 2021 - Μάρτιος 2022 · Μικτή θέση, κλινική και έρευνα', description: ['Κλινική: θεραπεία στερητικού συνδρόμου, διαχείριση φαρμάκων και νοσηλευτική φροντίδα κατά την αποτοξίνωση από αλκοόλ.', 'Έρευνα: μέλος της ερευνητικής ομάδας του προγράμματος NordAlc για την αποτοξίνωση από αλκοόλ.', 'Ένταξη ασθενών, ενημερωμένη συγκατάθεση και συλλογή δεδομένων σύμφωνα με την GCP, σε στενή συνεργασία με τον κύριο ερευνητή και την ερευνητική ομάδα.', 'Συντονισμός δεδομένων μητρώου μεταξύ κλινικής και ερευνητικής μονάδας.'] },
        { title: 'Νοσηλεύτρια', location: 'Ψυχιατρική και φροντίδα εξαρτήσεων, Πανεπιστημιακό Νοσοκομείο Sahlgrenska', period: 'Ιούνιος 2017 - Φεβρουάριος 2022', description: ['Γενική ψυχιατρική και επείγουσα φροντίδα εξαρτήσεων για νεαρούς ενήλικες και ενήλικες.', 'Διαχείριση φαρμάκων του ΚΝΣ και επείγουσες κλινικές αξιολογήσεις.', 'Ευθύνη συντονισμού σε ομάδες με ιατρούς, ψυχολόγους, κοινωνικές υπηρεσίες και θεραπευτικά κέντρα.', 'Γλωσσική μέντορας για ιατρούς και νοσηλευτές που εκπαιδεύτηκαν στο εξωτερικό.'] },
        { title: 'Νοσηλεύτρια', location: 'Euromedica Αρωγή, Λάρισα', period: 'Μάιος 2014 - Δεκέμβριος 2016', description: ['Ορθοπεδική, φροντίδα εγκεφαλικών επεισοδίων και αποκατάσταση, με διαχείριση φαρμάκων.', 'Προγράμματα αποκατάστασης σε συνεργασία με φυσικοθεραπευτές, εργοθεραπευτές και ιατρούς.'] },
    ],
    education: [
        { title: 'Πρόγραμμα ειδίκευσης νοσηλευτικής κοινοτικής υγείας, 75 ECTS', location: 'Karlstad University', period: 'Αύγουστος 2023 - Οκτώβριος 2024', description: ['Προαγωγή υγείας, ψηφιακή φροντίδα και διαλογή (triage), ηγεσία, δικαίωμα συνταγογράφησης.'] },
        { title: 'Μεταπτυχιακό στην Εργοφυσιολογία, Άσκηση και Αποκατάσταση, 120 ECTS', location: 'Πανεπιστήμιο Θεσσαλίας', period: 'Ιανουάριος 2014 - Ιανουάριος 2016', description: ['Σπιρομέτρηση, εργοσπιρομέτρηση και αποκατάσταση ασθενών με ΧΑΠ.'] },
        { title: 'Ειδίκευση στην ψυχική υγεία και την ειδική αγωγή', location: 'ΤΕΙ Θεσσαλίας', period: 'Δεκέμβριος 2013 - Μάιος 2014', description: [] },
        { title: 'Πτυχίο Νοσηλευτικής, 240 ECTS', location: 'Τεχνολογικό Πανεπιστήμιο Κύπρου', period: 'Σεπτέμβριος 2009 - Ιούνιος 2013', description: [] },
    ],
    courses: ['Εκπαίδευση GCP για μελλοντικούς ερευνητές', 'Ψηφιοποίηση στην υγεία, 7,5 ECTS', 'Βιώσιμη οργάνωση και διοίκηση στην υγεία, 7,5 ECTS', 'Στρατηγικές ανάπτυξης προσωπικού, 15 ECTS', 'Κλινική επίβλεψη και αξιολόγηση', 'Εκπαίδευση επόπτη, 7,5 ECTS', 'Παρακινητική συνέντευξη, πρόληψη υποτροπής και DBT', 'Φυσική δραστηριότητα και υγεία, 7,5 ECTS', 'Στρατηγική φυσικής δραστηριότητας, 7,5 ECTS', 'Συστηματική διαχείριση εργασιακού περιβάλλοντος'],
};

export const getLocalizedData = (locale: Locale): LocalizedData => {
    if (locale === 'sv') return { work: workExperience, education, courses: coursesAndCertifications };
    if (locale === 'en') return english;
    return greek;
};
