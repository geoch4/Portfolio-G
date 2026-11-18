from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "cv-georgia-chalkia.pdf"

NAVY = colors.HexColor("#1E293B")
TEAL = colors.HexColor("#0F766E")
TEAL_LIGHT = colors.HexColor("#E6F4F1")
MUTED = colors.HexColor("#475569")
RULE = colors.HexColor("#99F6E4")


def page_footer(canvas, doc):
    canvas.saveState()
    canvas.setStrokeColor(colors.HexColor("#CCFBF1"))
    canvas.setLineWidth(0.6)
    canvas.line(18 * mm, 13 * mm, 192 * mm, 13 * mm)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(18 * mm, 8.5 * mm, "Georgia Chalkia | Legitimerad distriktsköterska")
    canvas.drawRightString(192 * mm, 8.5 * mm, f"Sida {doc.page}")
    canvas.restoreState()


styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    "CvTitle",
    parent=styles["Title"],
    fontName="Times-Bold",
    fontSize=25,
    leading=28,
    textColor=NAVY,
    alignment=TA_CENTER,
    spaceAfter=2 * mm,
)
subtitle_style = ParagraphStyle(
    "CvSubtitle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10.5,
    leading=13,
    textColor=TEAL,
    alignment=TA_CENTER,
    spaceAfter=2.5 * mm,
)
contact_style = ParagraphStyle(
    "Contact",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.2,
    leading=10.5,
    textColor=MUTED,
    alignment=TA_CENTER,
    spaceAfter=4 * mm,
)
profile_style = ParagraphStyle(
    "Profile",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.4,
    leading=13,
    textColor=NAVY,
)
heading_style = ParagraphStyle(
    "SectionHeading",
    parent=styles["Heading2"],
    fontName="Times-Bold",
    fontSize=14,
    leading=17,
    textColor=NAVY,
    spaceBefore=4 * mm,
    spaceAfter=2.5 * mm,
    borderColor=RULE,
    borderWidth=0,
    borderPadding=0,
)
job_title_style = ParagraphStyle(
    "JobTitle",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=10,
    leading=12,
    textColor=NAVY,
    spaceAfter=0.8 * mm,
)
period_style = ParagraphStyle(
    "Period",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.1,
    leading=10,
    textColor=TEAL,
    spaceAfter=1.2 * mm,
)
body_style = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.8,
    leading=11.5,
    textColor=MUTED,
)
skill_style = ParagraphStyle(
    "Skill",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=8.4,
    leading=10.5,
    textColor=NAVY,
)
info_style = ParagraphStyle(
    "Info",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.6,
    leading=11,
    textColor=MUTED,
)


def section_heading(text):
    return [
        Paragraph(text, heading_style),
        Table(
            [[""]],
            colWidths=[174 * mm],
            rowHeights=[0.7 * mm],
            style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), RULE)]),
        ),
        Spacer(1, 1.5 * mm),
    ]


def bullets(items):
    return ListFlowable(
        [ListItem(Paragraph(item, body_style), leftIndent=0) for item in items],
        bulletType="bullet",
        bulletFontName="Helvetica",
        bulletFontSize=6,
        bulletColor=TEAL,
        leftIndent=4 * mm,
        bulletOffsetY=1.5,
        spaceAfter=1.5 * mm,
    )


def experience(title, organization, period, items):
    return KeepTogether(
        [
            Paragraph(f"{title} <font color='#64748B'>| {organization}</font>", job_title_style),
            Paragraph(period, period_style),
            bullets(items),
            Spacer(1, 1.3 * mm),
        ]
    )


def build():
    doc = BaseDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=15 * mm,
        bottomMargin=18 * mm,
        title="CV Georgia Chalkia",
        author="Georgia Chalkia",
        subject="Curriculum Vitae",
    )
    frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
    doc.addPageTemplates([PageTemplate(id="cv", frames=[frame], onPage=page_footer)])

    story = [
        Paragraph("GEORGIA CHALKIA", title_style),
        Paragraph("LEGITIMERAD DISTRIKTSKÖTERSKA", subtitle_style),
        Paragraph(
            "070-488 49 50 &nbsp;&nbsp;|&nbsp;&nbsp; grchalkia@gmail.com "
            "&nbsp;&nbsp;|&nbsp;&nbsp; linkedin.com/in/georgia-chalkia-72035317b",
            contact_style,
        ),
    ]

    profile = Table(
        [[Paragraph(
            "Distriktsköterska med erfarenhet av klinisk forskning, GCP, läkemedelshantering, "
            "vaccination och patientnära behandling. Kombinerar medicinsk trovärdighet med ett "
            "relationsskapande och affärsmässigt arbetssätt. Söker läkemedelsnära försäljningsroller "
            "där behovsanalys, tydlig produktkommunikation och långsiktiga relationer med vårdens "
            "aktörer står i centrum.",
            profile_style,
        )]],
        colWidths=[174 * mm],
        style=TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), TEAL_LIGHT),
            ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#99D8D1")),
            ("LEFTPADDING", (0, 0), (-1, -1), 6 * mm),
            ("RIGHTPADDING", (0, 0), (-1, -1), 6 * mm),
            ("TOPPADDING", (0, 0), (-1, -1), 4 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 4 * mm),
        ]),
    )
    story.extend([profile, Spacer(1, 1 * mm)])
    story.extend(section_heading("Nyckelkompetenser"))

    skill_values = [
        "GCP och klinisk forskning",
        "Läkemedelshantering och patientsäkerhet",
        "Medicinsk rådgivning och patientkommunikation",
        "Vaccination, prevention och kundbehov",
        "Relationsbyggande och tvärprofessionellt samarbete",
        "Strukturerad dokumentation och datakvalitet",
    ]
    skill_rows = []
    for index in range(0, len(skill_values), 2):
        skill_rows.append([
            Paragraph(f"•&nbsp; {skill_values[index]}", skill_style),
            Paragraph(f"•&nbsp; {skill_values[index + 1]}", skill_style),
        ])
    story.append(Table(
        skill_rows,
        colWidths=[87 * mm, 87 * mm],
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 1.5 * mm),
            ("RIGHTPADDING", (0, 0), (-1, -1), 1.5 * mm),
            ("TOPPADDING", (0, 0), (-1, -1), 1.2 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2 * mm),
        ]),
    ))

    story.extend(section_heading("Arbetslivserfarenhet"))
    story.extend([
        experience(
            "Distriktsköterska, ECT- och rTMS-mottagning",
            "Sahlgrenska Universitetssjukhus",
            "Januari 2025 - nuvarande",
            [
                "Ansvar för förberedelse, genomförande och uppföljning av ECT- och rTMS-behandlingar.",
                "Kliniska bedömningar, läkemedelshantering, dokumentation och säker vård i nära samarbete med psykiater och anestesipersonal.",
                "Följer behandlingsprotokoll och kommunicerar klinisk information tydligt till patienter och tvärprofessionella team.",
            ],
        ),
        experience(
            "Klinik- och vaccinationsansvarig sjuksköterska",
            "Min Doktor International",
            "Mars 2022 - januari 2025",
            [
                "Ansvarade för daglig drift, medicinsk rådgivning, vaccinationer, kvalitetssäkrade arbetssätt och introduktion av kollegor.",
                "Samarbetade med läkemedelsföretag och deltog i ett regionalt HPV-projekt med fokus på ökad vaccinationstäckning.",
                "Arbetade med målgruppsanpassad patientkommunikation, behovsorienterad rådgivning och verksamhetsutveckling.",
            ],
        ),
        experience(
            "Samordnande forskningssköterska",
            "Nordhemskliniken",
            "Maj 2021 - mars 2022",
            [
                "Medverkade i NordAlc-projektet, klinisk forskning om alkoholavgiftning inom Beroendemedicin.",
                "Patientnära forskning, strukturerad dokumentation, läkemedelshantering och tvärprofessionell samverkan.",
                "Förståelse för kvalitet, patientsäkerhet och följsamhet till strukturerade arbetssätt i kliniska studier.",
            ],
        ),
        experience(
            "Legitimerad sjuksköterska inom psykiatri",
            "Sahlgrenska Universitetssjukhus",
            "April 2019 - september 2022",
            [
                "Akuta medicinska bedömningar, abstinensbehandling, läkemedelshantering och suicidriskbedömning.",
                "Samverkan med läkare, psykologer och socialtjänst samt motiverande samtal som del av patientstödet.",
            ],
        ),
        experience(
            "Legitimerad sjuksköterska",
            "Euromedica klinik",
            "Maj 2015 - december 2016",
            [
                "Medicinsk omvårdnad inom avancerad äldrevård, ortopedi, strokevård och rehabilitering.",
                "Läkemedelshantering och tvärprofessionell planering av individanpassade rehabiliteringsinsatser.",
            ],
        ),
        PageBreak(),
    ])

    story.extend(section_heading("Utbildning"))
    story.extend([
        experience(
            "Specialistsjuksköterskeexamen - distriktssköterska, 75 hp",
            "Karlstads Universitet",
            "Augusti 2023 - januari 2025",
            [
                "Folkhälsa, hälsofrämjande och förebyggande vård, förskrivningsrätt och ledarskap.",
                "Examensarbete om digitala vårdtjänster för äldre.",
            ],
        ),
        experience(
            "Masterexamen i arbetsfysiologi, träning och rehabilitering, 120 hp",
            "Medicinska Skolan",
            "Januari 2014 - januari 2016",
            ["Kliniska tester, fysisk aktivitet, kroniska sjukdomar och individanpassad rehabilitering."],
        ),
        experience(
            "Certifikat i psykisk hälsa och specialpedagogik, 400 timmar",
            "Tekniska utbildningsinstitutet (TEI)",
            "December 2013 - maj 2014",
            ["Psykisk ohälsa, neuropsykiatriska tillstånd, krishantering och psykosocialt stöd."],
        ),
        experience(
            "Sjuksköterskeexamen, 240 hp",
            "Teknologiska Universitet",
            "September 2009 - juni 2013",
            ["Klinisk praktik inom akutvård, medicin, kirurgi, psykiatri och primärvård."],
        ),
    ])

    story.extend(section_heading("Kompetensutveckling och kurser"))
    story.append(bullets([
        "GCP-utbildning för framtida forskare",
        "Digitalisering i vården - utmaningar och möjligheter, 7,5 hp",
        "Hållbar organisering och styrning inom vård och omsorg, 7,5 hp",
        "Strategier för personalutveckling, 15 hp",
        "Handledareutbildning, 7,5 hp",
        "MI-samtal, återfallsprevention, känsloreglering och DBT",
        "Omvårdnadsvetenskap, handledning och bedömning i verksamhetsförlagd utbildning",
    ]))

    story.extend(section_heading("Praktisk information"))
    practical = [
        [Paragraph("<b>Språk:</b> Svenska, engelska, grekiska och tyska (B2)", info_style),
         Paragraph("<b>Körkort:</b> Ja", info_style)],
        [Paragraph("<b>Tillgänglighet:</b> Enligt överenskommelse", info_style),
         Paragraph("<b>Referenser:</b> Lämnas på begäran", info_style)],
    ]
    story.append(Table(
        practical,
        colWidths=[110 * mm, 64 * mm],
        style=TableStyle([
            ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ("LEFTPADDING", (0, 0), (-1, -1), 1.5 * mm),
            ("RIGHTPADDING", (0, 0), (-1, -1), 1.5 * mm),
            ("TOPPADDING", (0, 0), (-1, -1), 1.8 * mm),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 1.8 * mm),
        ]),
    ))

    doc.build(story)
    print(OUTPUT)


if __name__ == "__main__":
    build()
