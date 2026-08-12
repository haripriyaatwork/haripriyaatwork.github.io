from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak

out = "/home/ubuntu/webdev-static-assets/haripriya-mishra-resume.pdf"
pink = colors.HexColor("#d95b79")
ink = colors.HexColor("#111114")
muted = colors.HexColor("#5f5a5a")
cream = colors.HexColor("#f8f3ee")
doc = SimpleDocTemplate(out, pagesize=A4, rightMargin=17*mm, leftMargin=17*mm, topMargin=15*mm, bottomMargin=15*mm)
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="Name", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=24, leading=26, textColor=ink, spaceAfter=2))
styles.add(ParagraphStyle(name="Role", parent=styles["Normal"], fontName="Helvetica", fontSize=10, leading=13, textColor=pink, spaceAfter=4))
styles.add(ParagraphStyle(name="Contact", parent=styles["Normal"], fontName="Helvetica", fontSize=8, leading=11, textColor=muted))
styles.add(ParagraphStyle(name="Section", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=pink, spaceBefore=12, spaceAfter=5, uppercase=True))
styles.add(ParagraphStyle(name="Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.4, leading=11, textColor=ink, spaceAfter=4))
styles.add(ParagraphStyle(name="Job", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=9, leading=11, textColor=ink, spaceBefore=6, spaceAfter=1))
styles.add(ParagraphStyle(name="Meta", parent=styles["BodyText"], fontName="Helvetica-Oblique", fontSize=8, leading=10, textColor=muted, spaceAfter=2))
styles.add(ParagraphStyle(name="ResumeBullet", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.1, leading=10.5, leftIndent=9, firstLineIndent=-6, textColor=ink, spaceAfter=1))

story = []
story += [Paragraph("HARIPRIYA MISHRA", styles["Name"]), Paragraph("Communication Strategist | Brand Marketing | Content & Digital Communications", styles["Role"]), Paragraph("Vadodara, Gujarat &nbsp;|&nbsp; (+91) 7874585372 &nbsp;|&nbsp; Haripriyaatwork@gmail.com &nbsp;|&nbsp; linkedin.com/in/haripriyamishra2301", styles["Contact"]), Spacer(1, 7)]
story += [Paragraph("SUMMARY", styles["Section"]), Paragraph("Communication and Brand Marketing professional with experience developing communication strategies, digital campaigns, and brand positioning for B2B, B2C, D2C, and founder-led businesses. Skilled in client management, account handling, content strategy, LinkedIn marketing, website communication, SEO copywriting, and integrated marketing campaigns. Passionate about building brands through strategic storytelling, data-backed communication, and audience-first marketing.", styles["Body"])]
story += [Paragraph("EXPERIENCE", styles["Section"])]
experience = [
("Buzz Up Marketing", "Social Media Executive & Junior Content Writer", "Vadodara · Jul 2025 – Present", ["Manage communication and digital marketing strategies for 10+ client accounts across diverse industries.", "Lead client discovery calls, requirement gathering, strategic planning, and stakeholder communication.", "Develop brand positioning, messaging frameworks, tone of voice, and content strategies.", "Execute integrated campaigns across LinkedIn, Instagram, Facebook, X, YouTube, Reddit, and WhatsApp Communities.", "Lead founder branding and LinkedIn thought leadership initiatives.", "Create website copy, landing pages, SEO articles, newsletters, campaign assets, and presentations.", "Coordinate with designers, SEO specialists, writers, and video editors to deliver campaigns.", "Design marketing creatives and edit short-form videos using Canva.", "Generated 10+ lakh impressions and 6+ lakh content views through strategic digital campaigns."]),
("Adwise", "Social Media Manager Intern", "Vadodara · Mar 2025 – Jun 2025", ["Developed social media strategy for a premium menswear brand.", "Conducted competitor and market research to strengthen brand positioning.", "Created captions, reel scripts, carousel content, and campaign copy.", "Designed social media creatives using Canva and contributed to website communication strategy.", "Coordinated directly with clients for creative approvals and campaign execution."]),
("Arclantic", "Journalist Intern", "Remote · Jan 2025 – Mar 2025", ["Wrote analytical articles covering politics, world affairs, lifestyle, entertainment, and social issues.", "Covered live events and election-related developments.", "Collaborated with editors to ensure factual accuracy and engaging storytelling."]),
("Kaafila — Faculty of Journalism & Communication, MSU", "Communication Head", "Jan 2025 – Mar 2025", ["Led the communications team for the university cultural festival.", "Planned communication strategy and publicity campaigns.", "Coordinated with media partners and stakeholders.", "Prepared sponsorship reports and post-event documentation."]),
("Sportskeeda", "Reality TV Writer", "Remote · Aug 2023 – Oct 2023", ["Produced SEO-driven articles on American reality television and entertainment.", "Delivered high-quality content within strict editorial deadlines.", "Worked closely with editors to maximize engagement and search performance."]),
("INPAC Times", "Journalism Intern", "Remote · May 2023 – Jun 2023", ["Reported on geopolitics, national affairs, crime, and entertainment.", "Applied SEO practices to improve article discoverability."]),
("InPHinity Education", "Science Tutor", "Vadodara · Jan 2023 – Mar 2024", ["Conducted science classes for primary students.", "Simplified complex concepts through activity-based learning.", "Strengthened communication, leadership, and lesson-planning skills."]),
]
for company, role, meta, bullets in experience:
    story += [Paragraph(f"{company} — {role}", styles["Job"]), Paragraph(meta, styles["Meta"])] + [Paragraph(f"• {b}", styles["ResumeBullet"]) for b in bullets]
story += [Paragraph("EDUCATION", styles["Section"])]
edu = [
("Master of Journalism & Mass Communication", "Faculty of Journalism & Communication, The Maharaja Sayajirao University of Baroda", "2024 – 2026 · CGPA: 7.30/10"),
("Bachelor of Arts (Honours), Archaeology & Ancient History", "The Maharaja Sayajirao University of Baroda", "2021 – 2024"),
("Higher Secondary (HSC)", "Narayan Vidyalaya, Vadodara", "2021 · 75.57%"),
("Secondary School (SSC)", "Shree Kavant English High School", "2019 · 72%"),
]
for title, school, meta in edu: story += [Paragraph(title, styles["Job"]), Paragraph(f"{school} · {meta}", styles["Meta"])]
story += [Paragraph("SKILLS", styles["Section"]), Paragraph("Brand Strategy & Positioning · Communication Strategy · Digital Marketing · Account Management · Client Communication · LinkedIn Personal Branding · Founder Branding · Content Strategy · Website Copywriting · SEO Content Writing · Campaign Planning · Community Management · Canva & Creative Design · Video Editing · AI-assisted Marketing · Meta Business Suite · Google Analytics · Google Search Console · LinkedIn Analytics · Instagram Insights · X Analytics · SEO Optimization · Grammarly · ChatGPT · Gemini · Claude · Perplexity · Microsoft Office · Google Workspace · Strategic Thinking · Leadership · Critical Thinking · Project Management · Collaboration · Time Management · Adaptability · Professional Networking · English (Professional) · Hindi (Native) · Gujarati (Native)", styles["Body"]), Paragraph("SELECTED PROJECTS", styles["Section"]), Paragraph("• Led end-to-end communication strategy for 10+ B2B and D2C clients across manufacturing, fintech, sustainability, and life sciences, delivering 10+ lakh impressions and 6+ lakh views. Developed brand positioning frameworks, messaging architecture, and multi-platform campaigns.", styles["ResumeBullet"]), Paragraph("• Designed and executed communication strategy for Kaafila, MSU's university-wide cultural festival, coordinating media partnerships and stakeholder communication.", styles["ResumeBullet"]), Paragraph("• Published articles on Sportskeeda, Arclantic, and INPAC Times.", styles["ResumeBullet"]), Paragraph("• Winner, Creative Writing Competition — Kaafila 2024, Faculty of Journalism & Communication, MSU.", styles["ResumeBullet"])]

def footer(canvas, doc):
    canvas.saveState(); canvas.setStrokeColor(pink); canvas.setLineWidth(0.6); canvas.line(17*mm, 10*mm, 193*mm, 10*mm); canvas.setFillColor(muted); canvas.setFont("Helvetica", 7); canvas.drawString(17*mm, 6*mm, "Haripriya Mishra · Resume"); canvas.drawRightString(193*mm, 6*mm, f"Page {doc.page}"); canvas.restoreState()

doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(out)
