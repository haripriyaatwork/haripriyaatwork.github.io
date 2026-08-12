from pathlib import Path
import re
import json

source = Path('/home/ubuntu/upload/pasted_content_9.txt').read_text(encoding='utf-8')
blocks = re.split(r'(?=^\[[^\n]+\]\s+Tanvi Mistry:\s*)', source, flags=re.MULTILINE)
poems = []
for block in blocks:
    block = block.strip()
    if not block:
        continue
    block = re.sub(r'^\[[^\n]+\]\s+Tanvi Mistry:\s*', '', block, count=1)
    lines = block.splitlines()
    while lines and not lines[0].strip():
        lines.pop(0)
    if not lines:
        continue
    title = lines.pop(0).strip()
    title = re.sub(r'^[\u2060\s\d.]+', '', title).strip()
    title_note = ''
    while lines and not lines[0].strip():
        lines.pop(0)
    if lines and (lines[0].strip().lower().startswith('suggested title') or lines[0].strip().lower().startswith('original title')):
        title_note = lines.pop(0).strip()
        while lines and not lines[0].strip():
            lines.pop(0)
    body = '\n'.join(lines).strip('\n')
    if title in {'Bro will this work?'}:
        continue
    poems.append({'title': title, 'titleNote': title_note, 'body': body})
Path('/home/ubuntu/communicate-portfolio/client/src/data').mkdir(parents=True, exist_ok=True)
Path('/home/ubuntu/communicate-portfolio/client/src/data/poems.json').write_text(json.dumps(poems, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'parsed {len(poems)} poems')
for index, poem in enumerate(poems, 1):
    print(index, poem['title'])
