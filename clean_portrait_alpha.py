from PIL import Image
from collections import deque

src = "/home/ubuntu/webdev-static-assets/haripriya-portrait-final-cutout.png"
out = "/home/ubuntu/webdev-static-assets/haripriya-portrait-alpha.png"
img = Image.open(src).convert("RGBA")
p = img.load()
w, h = img.size

def bg_like(r, g, b):
    # Generated transparency previews are near-neutral white/grey squares.
    return max(r, g, b) - min(r, g, b) <= 9 and min(r, g, b) >= 205

seen = bytearray(w * h)
q = deque()
for x in range(w):
    q.append((x, 0)); q.append((x, h - 1))
for y in range(h):
    q.append((0, y)); q.append((w - 1, y))
while q:
    x, y = q.popleft()
    i = y * w + x
    if seen[i]:
        continue
    seen[i] = 1
    r, g, b, a = p[x, y]
    if not bg_like(r, g, b):
        continue
    p[x, y] = (r, g, b, 0)
    if x > 0: q.append((x - 1, y))
    if x < w - 1: q.append((x + 1, y))
    if y > 0: q.append((x, y - 1))
    if y < h - 1: q.append((x, y + 1))
img.save(out, "PNG", optimize=True)
print(out)
