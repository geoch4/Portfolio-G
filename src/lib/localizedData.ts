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
        { title: 'District nurse, ECT & rTMS clinic', location: 'Sahlgrenska University Hospital, Gothenburg', period: 'January 2025 - Present', description: ['Responsible for preparing, delivering and following up ECT and rTMS treatments.', 'Conduct clinical assessments, manage medication and documentation, and provide safe care with psychiatrists and anaesthesia teams.', 'Follow treatment protocols and communicate clinical changes clearly to patients and multidisciplinary teams.'] },
        { title: 'Nurse responsible for vaccination services', location: 'Min Doktor International, Västra Götaland', period: 'March 2022 - January 2025', description: ['Managed daily clinic operations, medical advice, vaccinations, quality-assured procedures and staff onboarding.', 'Collaborated with pharmaceutical companies and participated in a regional HPV project to improve vaccination coverage.', 'Worked with audience-adapted patient communication, needs-based advice and service development.'] },
        { title: 'Coordinating research nurse', location: 'Nordhemskliniken, Gothenburg', period: 'May 2021 - March 2022', description: ['Participated in the NordAlc clinical research project on alcohol detoxification.', 'Worked with patient-facing research, structured documentation, medication management and multidisciplinary collaboration.', 'Developed an understanding of quality, patient safety and protocol-based work in clinical studies.'] },
        { title: 'Registered nurse in psychiatry', location: 'Sahlgrenska University Hospital, Gothenburg', period: 'April 2019 - September 2022', description: ['Performed acute medical assessments, withdrawal treatment, medication management and suicide-risk assessments.', 'Collaborated with physicians, psychologists and social services and used motivational interviewing in patient support.', 'Gained extensive knowledge of specialist medicines, crisis management and holistic care.'] },
        { title: 'Registered nurse', location: 'Euromedica clinic, Greece', period: 'May 2015 - December 2016', description: ['Worked in advanced elderly care, orthopaedics, stroke care and rehabilitation.', 'Responsible for nursing care, wound care and medication management.', 'Collaborated on individual rehabilitation plans focused on recovery and independence.'] },
    ],
    education: [
        { title: 'Postgraduate specialist nursing degree - district nursing, 75 credits', location: 'Karlstad University', period: 'August 2023 - January 2025', description: ['Focus on public health, health promotion and preventive care.', 'Training in prescribing, leadership, primary care, home healthcare, child health and school health.', 'Thesis on digital healthcare services for older adults.'] },
        { title: 'Master’s degree in Exercise Physiology, Training and Rehabilitation, 120 credits', location: 'Medical School', period: 'January 2014 - January 2016', description: ['Clinical testing, physical activity, chronic disease and individual rehabilitation.', 'Advanced knowledge of health coaching, lifestyle change and preventive health.'] },
        { title: 'Certificate in Mental Health and Special Education, 400 hours', location: 'Technical Educational Institute', period: 'December 2013 - May 2014', description: ['Mental health, neurodevelopmental conditions, crisis management and psychosocial support.'] },
        { title: 'Bachelor of Science in Nursing, 240 credits', location: 'University of Technology', period: 'September 2009 - June 2013', description: ['Clinical placements in emergency care, medicine, surgery, psychiatry and primary care.', 'Training in clinical assessment, medication management, health promotion and evidence-based care.'] },
    ],
    courses: ['GCP training for future researchers', 'Digitalisation in healthcare - challenges and opportunities, 7.5 credits', 'Sustainable organisation and governance in health and social care, 7.5 credits', 'Strategies for staff development, 15 credits', 'Clinical supervision and assessment in workplace learning', 'Supervisor training, 7.5 credits', 'Motivational interviewing, relapse prevention, emotional regulation and DBT', 'Physical activity and health for KRAFT instructors, 7.5 credits', 'Physical activity and health for KRAFT strategists, 7.5 credits', 'Systematic work environment management', 'Certificate in mental health and special education, 400 hours'],
};

const greek: LocalizedData = {
    work: english.work.map((item, index) => ({
        ...item,
        title: ['Νοσηλεύτρια κοινοτικής υγείας, μονάδα ECT & rTMS', 'Υπεύθυνη νοσηλεύτρια εμβολιασμών', 'Συντονίστρια νοσηλεύτρια έρευνας', 'Νοσηλεύτρια ψυχιατρικής', 'Νοσηλεύτρια'][index],
        period: ['Ιανουάριος 2025 - σήμερα', 'Μάρτιος 2022 - Ιανουάριος 2025', 'Μάιος 2021 - Μάρτιος 2022', 'Απρίλιος 2019 - Σεπτέμβριος 2022', 'Μάιος 2015 - Δεκέμβριος 2016'][index],
        description: item.description.map((_, i) => [
            ['Προετοιμασία, εφαρμογή και παρακολούθηση θεραπειών ECT και rTMS.', 'Κλινικές αξιολογήσεις, διαχείριση φαρμάκων, τεκμηρίωση και ασφαλής φροντίδα.', 'Τήρηση θεραπευτικών πρωτοκόλλων και σαφής επικοινωνία κλινικών αλλαγών.'],
            ['Ευθύνη καθημερινής λειτουργίας, ιατρικών συμβουλών, εμβολιασμών και ποιότητας.', 'Συνεργασία με φαρμακευτικές εταιρείες και συμμετοχή σε περιφερειακό πρόγραμμα HPV.', 'Επικοινωνία με ασθενείς, συμβουλευτική αναγκών και ανάπτυξη υπηρεσιών.'],
            ['Συμμετοχή στο κλινικό ερευνητικό πρόγραμμα NordAlc για την αποτοξίνωση από αλκοόλ.', 'Έρευνα με ασθενείς, δομημένη τεκμηρίωση και διαχείριση φαρμάκων.', 'Εμπειρία σε ποιότητα, ασφάλεια ασθενών και εργασία βάσει πρωτοκόλλων.'],
            ['Επείγουσες κλινικές αξιολογήσεις, θεραπεία στερητικού συνδρόμου και διαχείριση φαρμάκων.', 'Διεπιστημονική συνεργασία και παρακινητική συνέντευξη.', 'Γνώση ειδικών φαρμάκων, διαχείρισης κρίσεων και ολιστικής φροντίδας.'],
            ['Φροντίδα ηλικιωμένων, ορθοπεδική, αγγειακά εγκεφαλικά και αποκατάσταση.', 'Περιποίηση τραυμάτων και διαχείριση φαρμάκων.', 'Σχεδιασμός εξατομικευμένων προγραμμάτων αποκατάστασης.'],
        ][index][i]),
    })),
    education: english.education.map((item, index) => ({ ...item, title: ['Μεταπτυχιακή ειδίκευση νοσηλευτικής κοινοτικής υγείας, 75 ECTS', 'Μεταπτυχιακό στην Εργοφυσιολογία, Άσκηση και Αποκατάσταση, 120 ECTS', 'Πιστοποιητικό Ψυχικής Υγείας και Ειδικής Αγωγής, 400 ώρες', 'Πτυχίο Νοσηλευτικής, 240 ECTS'][index], period: ['Αύγουστος 2023 - Ιανουάριος 2025', 'Ιανουάριος 2014 - Ιανουάριος 2016', 'Δεκέμβριος 2013 - Μάιος 2014', 'Σεπτέμβριος 2009 - Ιούνιος 2013'][index] })),
    courses: ['Εκπαίδευση GCP για μελλοντικούς ερευνητές', 'Ψηφιοποίηση στην υγεία, 7,5 ECTS', 'Βιώσιμη οργάνωση και διοίκηση στην υγεία, 7,5 ECTS', 'Στρατηγικές ανάπτυξης προσωπικού, 15 ECTS', 'Κλινική επίβλεψη και αξιολόγηση', 'Εκπαίδευση επόπτη, 7,5 ECTS', 'Παρακινητική συνέντευξη, πρόληψη υποτροπής και DBT', 'Φυσική δραστηριότητα και υγεία, 7,5 ECTS', 'Στρατηγική φυσικής δραστηριότητας, 7,5 ECTS', 'Συστηματική διαχείριση εργασιακού περιβάλλοντος', 'Πιστοποιητικό ψυχικής υγείας και ειδικής αγωγής, 400 ώρες'],
};

export const getLocalizedData = (locale: Locale): LocalizedData => {
    if (locale === 'sv') return { work: workExperience, education, courses: coursesAndCertifications };
    if (locale === 'en') return english;
    return greek;
};
