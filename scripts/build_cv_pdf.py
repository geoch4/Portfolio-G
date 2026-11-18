from pathlib import Path

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "tmp" / "cv-pdf"
DOCX_PATH = OUTPUT / "cv-georgia-chalkia.docx"

NAVY = RGBColor(30, 41, 59)
TEAL = RGBColor(15, 118, 110)
MUTED = RGBColor(71, 85, 105)
LIGHT_TEAL = "E6F4F1"


def set_cell_fill(cell, color):
    tc_pr = cell._tc.get_or_add_tcPr()
    shading = tc_pr.find(qn("w:shd"))
    if shading is None:
        shading = OxmlElement("w:shd")
        tc_pr.append(shading)
    shading.set(qn("w:fill"), color)


def set_cell_margins(cell, top=100, start=140, bottom=100, end=140):
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for margin, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tc_mar.find(qn(f"w:{margin}"))
        if node is None:
            node = OxmlElement(f"w:{margin}")
            tc_mar.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def set_run(run, size=10.2, color=MUTED, bold=False, italic=False, font="Aptos"):
    run.font.name = font
    run._element.get_or_add_rPr().rFonts.set(qn("w:ascii"), font)
    run._element.get_or_add_rPr().rFonts.set(qn("w:hAnsi"), font)
    run.font.size = Pt(size)
    run.font.color.rgb = color
    run.bold = bold
    run.italic = italic


def configure_paragraph(paragraph, before=0, after=4, line=1.08, keep=False):
    fmt = paragraph.paragraph_format
    fmt.space_before = Pt(before)
    fmt.space_after = Pt(after)
    fmt.line_spacing = line
    fmt.keep_with_next = keep


def add_text(doc, text, size=10.2, color=MUTED, bold=False, italic=False, after=4, align=None):
    p = doc.add_paragraph()
    configure_paragraph(p, after=after)
    if align is not None:
        p.alignment = align
    set_run(p.add_run(text), size=size, color=color, bold=bold, italic=italic)
    return p


def add_heading(doc, text):
    p = doc.add_paragraph()
    configure_paragraph(p, before=9, after=5, keep=True)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(text)
    set_run(run, size=14, color=NAVY, bold=True, font="Georgia")
    p_pr = p._p.get_or_add_pPr()
    border = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), "8")
    bottom.set(qn("w:space"), "4")
    bottom.set(qn("w:color"), "5EEAD4")
    border.append(bottom)
    p_pr.append(border)


def add_bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    configure_paragraph(p, after=2.5, line=1.08)
    p.paragraph_format.left_indent = Inches(0.23)
    p.paragraph_format.first_line_indent = Inches(-0.15)
    set_run(p.add_run(text), size=9.4, color=MUTED)
    return p


def add_entry(doc, title, organization, period, bullets):
    p = doc.add_paragraph()
    configure_paragraph(p, before=4, after=1, keep=True)
    set_run(p.add_run(title), size=10.4, color=NAVY, bold=True)
    if organization:
        set_run(p.add_run(f" | {organization}"), size=9.6, color=MUTED)
    period_p = doc.add_paragraph()
    configure_paragraph(period_p, after=2, keep=True)
    set_run(period_p.add_run(period), size=8.6, color=TEAL, bold=True)
    for bullet in bullets:
        add_bullet(doc, bullet)


def configure_styles(doc):
    normal = doc.styles["Normal"]
    normal.font.name = "Aptos"
    normal._element.rPr.rFonts.set(qn("w:ascii"), "Aptos")
    normal._element.rPr.rFonts.set(qn("w:hAnsi"), "Aptos")
    normal.font.size = Pt(10.2)
    normal.font.color.rgb = MUTED
    normal.paragraph_format.space_after = Pt(4)
    normal.paragraph_format.line_spacing = 1.08

    list_style = doc.styles["List Bullet"]
    list_style.font.name = "Aptos"
    list_style._element.rPr.rFonts.set(qn("w:ascii"), "Aptos")
    list_style._element.rPr.rFonts.set(qn("w:hAnsi"), "Aptos")
    list_style.font.size = Pt(9.4)


def build_document():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    doc = Document()
    configure_styles(doc)

    section = doc.sections[0]
    section.page_width = Inches(8.5)
    section.page_height = Inches(11)
    section.top_margin = Inches(0.55)
    section.bottom_margin = Inches(0.55)
    section.left_margin = Inches(0.68)
    section.right_margin = Inches(0.68)
    section.header_distance = Inches(0.25)
    section.footer_distance = Inches(0.28)

    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    configure_paragraph(title, after=1)
    set_run(title.add_run("GEORGIA CHALKIA"), size=25, color=NAVY, bold=True, font="Georgia")

    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    configure_paragraph(subtitle, after=5)
    set_run(subtitle.add_run("LEGITIMERAD DISTRIKTSKÖTERSKA"), size=10.5, color=TEAL, bold=True)

    contact = doc.add_paragraph()
    contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    configure_paragraph(contact, after=7)
    set_run(
        contact.add_run(
            "070-488 49 50  |  grchalkia@gmail.com  |  linkedin.com/in/georgia-chalkia-72035317b"
        ),
        size=8.8,
        color=MUTED,
    )

    profile_table = doc.add_table(rows=1, cols=1)
    profile_table.autofit = False
    profile_table.columns[0].width = Inches(7.14)
    cell = profile_table.cell(0, 0)
    set_cell_fill(cell, LIGHT_TEAL)
    set_cell_margins(cell, top=150, start=190, bottom=150, end=190)
    profile = cell.paragraphs[0]
    configure_paragraph(profile, after=0, line=1.12)
    set_run(
        profile.add_run(
            "Distriktsköterska med erfarenhet av klinisk forskning, GCP, läkemedelshantering, "
            "vaccination och patientnära behandling. Kombinerar medicinsk trovärdighet med ett "
            "relationsskapande och affärsmässigt arbetssätt. Söker läkemedelsnära försäljningsroller "
            "där behovsanalys, tydlig produktkommunikation och långsiktiga relationer med vårdens "
            "aktörer står i centrum."
        ),
        size=9.5,
        color=NAVY,
    )

    add_heading(doc, "Nyckelkompetenser")
    skills = [
        "GCP och klinisk forskning",
        "Läkemedelshantering och patientsäkerhet",
        "Medicinsk rådgivning och patientkommunikation",
        "Vaccination, prevention och kundbehov",
        "Relationsbyggande och tvärprofessionellt samarbete",
        "Strukturerad dokumentation och datakvalitet",
    ]
    skill_table = doc.add_table(rows=3, cols=2)
    skill_table.autofit = False
    for index, skill in enumerate(skills):
        skill_cell = skill_table.cell(index // 2, index % 2)
        skill_cell.width = Inches(3.55)
        set_cell_margins(skill_cell, top=55, start=100, bottom=55, end=100)
        p = skill_cell.paragraphs[0]
        configure_paragraph(p, after=0)
        set_run(p.add_run(f"•  {skill}"), size=8.9, color=NAVY, bold=True)

    add_heading(doc, "Arbetslivserfarenhet")
    jobs = [
        (
            "Distriktsköterska, ECT- och rTMS-mottagning",
            "Sahlgrenska Universitetssjukhus",
            "Januari 2025 - nuvarande",
            [
                "Ansvar för förberedelse, genomförande och uppföljning av ECT- och rTMS-behandlingar.",
                "Kliniska bedömningar, läkemedelshantering, dokumentation och säker vård i nära samarbete med psykiater och anestesipersonal.",
                "Följer behandlingsprotokoll och kommunicerar klinisk information tydligt till patienter och tvärprofessionella team.",
            ],
        ),
        (
            "Klinik- och vaccinationsansvarig sjuksköterska",
            "Min Doktor International",
            "Mars 2022 - januari 2025",
            [
                "Ansvarade för daglig drift, medicinsk rådgivning, vaccinationer, kvalitetssäkrade arbetssätt och introduktion av kollegor.",
                "Samarbetade med läkemedelsföretag och deltog i ett regionalt HPV-projekt med fokus på ökad vaccinationstäckning.",
                "Arbetade med målgruppsanpassad patientkommunikation, behovsorienterad rådgivning och verksamhetsutveckling.",
            ],
        ),
        (
            "Samordnande forskningssköterska",
            "Nordhemskliniken",
            "Maj 2021 - mars 2022",
            [
                "Medverkade i NordAlc-projektet, klinisk forskning om alkoholavgiftning inom Beroendemedicin.",
                "Arbetade med patientnära forskning, strukturerad dokumentation, läkemedelshantering och tvärprofessionell samverkan.",
                "Utvecklade förståelse för kvalitet, patientsäkerhet och följsamhet till strukturerade arbetssätt i kliniska studier.",
            ],
        ),
        (
            "Legitimerad sjuksköterska inom psykiatri",
            "Sahlgrenska Universitetssjukhus",
            "April 2019 - september 2022",
            [
                "Akuta medicinska bedömningar, abstinensbehandling, läkemedelshantering och suicidriskbedömning.",
                "Samverkan med läkare, psykologer och socialtjänst samt motiverande samtal som del av patientstödet.",
            ],
        ),
        (
            "Legitimerad sjuksköterska",
            "Euromedica klinik",
            "Maj 2015 - december 2016",
            [
                "Medicinsk omvårdnad inom avancerad äldrevård, ortopedi, strokevård och rehabilitering.",
                "Läkemedelshantering och tvärprofessionell planering av individanpassade rehabiliteringsinsatser.",
            ],
        ),
    ]
    for job in jobs:
        add_entry(doc, *job)

    doc.add_section(WD_SECTION.NEW_PAGE)
    add_heading(doc, "Utbildning")
    education = [
        (
            "Specialistsjuksköterskeexamen - distriktssköterska, 75 hp",
            "Karlstads Universitet",
            "Augusti 2023 - januari 2025",
            [
                "Inriktning mot folkhälsa, hälsofrämjande och förebyggande vård.",
                "Förskrivningsrätt, ledarskap, primärvård, hemsjukvård, barnhälsovård och elevhälsa.",
                "Examensarbete om digitala vårdtjänster för äldre.",
            ],
        ),
        (
            "Masterexamen i arbetsfysiologi, träning och rehabilitering, 120 hp",
            "Medicinska Skolan",
            "Januari 2014 - januari 2016",
            [
                "Kliniska tester, fysisk aktivitet, kroniska sjukdomar och individanpassad rehabilitering.",
            ],
        ),
        (
            "Certifikat i psykisk hälsa och specialpedagogik, 400 timmar",
            "Tekniska utbildningsinstitutet (TEI)",
            "December 2013 - maj 2014",
            [
                "Psykisk ohälsa, neuropsykiatriska tillstånd, krishantering och psykosocialt stöd.",
            ],
        ),
        (
            "Sjuksköterskeexamen, 240 hp",
            "Teknologiska Universitet",
            "September 2009 - juni 2013",
            [
                "Klinisk praktik inom akutvård, medicin, kirurgi, psykiatri och primärvård.",
            ],
        ),
    ]
    for item in education:
        add_entry(doc, *item)

    add_heading(doc, "Kompetensutveckling och kurser")
    courses = [
        "GCP-utbildning för framtida forskare",
        "Digitalisering i vården - utmaningar och möjligheter, 7,5 hp",
        "Hållbar organisering och styrning inom vård och omsorg, 7,5 hp",
        "Strategier för personalutveckling, 15 hp",
        "Handledareutbildning, 7,5 hp",
        "MI-samtal, återfallsprevention, känsloreglering och DBT",
        "Omvårdnadsvetenskap, handledning och bedömning i verksamhetsförlagd utbildning",
    ]
    for course in courses:
        add_bullet(doc, course)

    add_heading(doc, "Praktisk information")
    practical = doc.add_table(rows=2, cols=2)
    practical.autofit = False
    values = [
        ("Språk", "Svenska, engelska, grekiska och tyska (B2)"),
        ("Körkort", "Ja"),
        ("Tillgänglighet", "Enligt överenskommelse"),
        ("Referenser", "Lämnas på begäran"),
    ]
    for index, (label, value) in enumerate(values):
        info_cell = practical.cell(index // 2, index % 2)
        info_cell.width = Inches(3.55)
        set_cell_margins(info_cell, top=80, start=110, bottom=80, end=110)
        p = info_cell.paragraphs[0]
        configure_paragraph(p, after=0)
        set_run(p.add_run(f"{label}: "), size=9.1, color=NAVY, bold=True)
        set_run(p.add_run(value), size=9.1, color=MUTED)

    footer = section.footer.paragraphs[0]
    footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
    set_run(
        footer.add_run("Georgia Chalkia | Legitimerad distriktsköterska"),
        size=8,
        color=MUTED,
    )

    doc.save(DOCX_PATH)
    print(DOCX_PATH)


if __name__ == "__main__":
    build_document()
