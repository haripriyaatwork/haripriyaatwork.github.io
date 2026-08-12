from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import urljoin

html_path = Path('/home/ubuntu/browser_html/arclantic_com_haripriya-mishra_1786548459091.html')
base = 'https://www.arclantic.com'
soup = BeautifulSoup(html_path.read_text(errors='ignore'), 'html.parser')
rows = []
seen = set()
for a in soup.find_all('a', href=True):
    title = ' '.join(a.get_text(' ', strip=True).split())
    href = urljoin(base, a['href'])
    if not title or href in seen:
        continue
    if href.startswith(base + '/') and '/author/' not in href and href.rstrip('/') != base:
        if title not in {'About Us', 'Contact Us', 'Apply Now', 'World', 'Business', 'Technology', 'Sports', 'Future', 'Entertainment', 'Culture', 'Society', 'More', 'Privacy Policy', 'Terms of Use', 'Refund Policy', 'Cookies Policy', 'Advertise With Us', 'Accessibility'}:
            rows.append((title, href))
            seen.add(href)
for title, href in rows:
    print(f'{title}\t{href}')
