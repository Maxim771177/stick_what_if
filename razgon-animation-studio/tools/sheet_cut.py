"""tools/sheet_cut.py — cut a character / prop sheet (e.g. from an AI image service) into separate transparent PNGs.

  python tools/sheet_cut.py sheet.png --out projects/<slug>/assets/ray --auto --names head,torso,arm_upper,arm_lower,hand,leg_upper,leg_lower,foot
  python tools/sheet_cut.py poses.png --out projects/<slug>/assets/boss --grid 3x1 --names idle,point,angry

  --auto        find each separate object on the sheet (pieces separated by background); names are given in reading order
                (top-to-bottom rows, then left-to-right)
  --grid CxR    cut into C columns x R rows of equal cells instead
  --bg auto|#rrggbb|none   background colour to remove (auto = the colour of the sheet corners)   --tol 32   colour tolerance
  --pad 6       transparent margin kept around each piece      --min 0.002   ignore specks smaller than this share of the sheet

Background removal keys out the background colour connected to each piece's border, so ask the image service for a
plain flat background (pure white or a flat grey/green that the character doesn't use). Check the PNGs after cutting.
"""
import argparse, os, sys
import numpy as np
try:
    from PIL import Image
except ImportError:
    sys.exit("Pillow is missing: python -m pip install pillow")

ap = argparse.ArgumentParser()
ap.add_argument("sheet"); ap.add_argument("--out", required=True); ap.add_argument("--names", default="")
g = ap.add_mutually_exclusive_group(required=True); g.add_argument("--auto", action="store_true"); g.add_argument("--grid")
ap.add_argument("--bg", default="auto"); ap.add_argument("--tol", type=float, default=32); ap.add_argument("--pad", type=int, default=6); ap.add_argument("--min", type=float, default=0.002)
a = ap.parse_args()

im = Image.open(a.sheet).convert("RGBA"); A = np.asarray(im).astype(np.int16); H, W = A.shape[:2]
names = [n.strip() for n in a.names.split(",") if n.strip()]
if a.bg == "none": bg = None
elif a.bg == "auto":
    corners = np.array([A[2, 2, :3], A[2, W - 3, :3], A[H - 3, 2, :3], A[H - 3, W - 3, :3]]); bg = np.median(corners, axis=0)
else:
    h = a.bg.lstrip("#"); bg = np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)])
alpha_in = A[:, :, 3] > 8
is_bg = (np.abs(A[:, :, :3] - bg).max(axis=2) <= a.tol) if bg is not None else ~alpha_in
is_bg |= ~alpha_in

# background = bg-coloured pixels connected to the image border (so white eyes inside a character stay)
from collections import deque
def border_flood(mask):
    seen = np.zeros_like(mask); q = deque()
    for x in range(mask.shape[1]):
        for y in (0, mask.shape[0] - 1):
            if mask[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
    for y in range(mask.shape[0]):
        for x in (0, mask.shape[1] - 1):
            if mask[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < mask.shape[0] and 0 <= nx < mask.shape[1] and mask[ny, nx] and not seen[ny, nx]: seen[ny, nx] = True; q.append((ny, nx))
    return seen
try:
    from scipy import ndimage
    lab, _ = ndimage.label(is_bg); edge = np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])); bgmask = np.isin(lab, edge[edge > 0])
except ImportError:
    bgmask = border_flood(is_bg)
fg = ~bgmask

def save(box, name):
    y0, y1, x0, x1 = box; sub = A[y0:y1, x0:x1].copy(); m = fg[y0:y1, x0:x1]
    ys, xs = np.where(m)
    if len(ys) < a.min * W * H: return None   # empty cell or a speck
    yy0, yy1, xx0, xx1 = max(0, ys.min() - a.pad), min(m.shape[0], ys.max() + 1 + a.pad), max(0, xs.min() - a.pad), min(m.shape[1], xs.max() + 1 + a.pad)
    sub[:, :, 3] = np.where(m, sub[:, :, 3], 0); sub = sub[yy0:yy1, xx0:xx1]
    os.makedirs(a.out, exist_ok=True); p = os.path.join(a.out, f"{name}.png"); Image.fromarray(sub.astype(np.uint8), "RGBA").save(p)
    return p, sub.shape[1], sub.shape[0]

out = []
if a.grid:
    c, r = (int(v) for v in a.grid.lower().split("x")); cw, rh = W / c, H / r
    for j in range(r):
        for i in range(c):
            k = j * c + i; name = names[k] if k < len(names) else f"part_{k + 1:02d}"
            res = save((int(j * rh), int((j + 1) * rh), int(i * cw), int((i + 1) * cw)), name)
            if res: out.append((name, *res))
else:
    try:
        from scipy import ndimage
    except ImportError:
        sys.exit("--auto needs scipy: python -m pip install scipy")
    # pieces = connected foreground regions (slightly dilated so thin gaps inside one piece don't split it)
    lab, n = ndimage.label(ndimage.binary_dilation(fg, iterations=3))
    objs = [(sl, int((lab[sl] == i + 1).sum())) for i, sl in enumerate(ndimage.find_objects(lab))]
    objs = [(sl, s) for sl, s in objs if s >= a.min * W * H]
    rows = sorted(objs, key=lambda o: o[0][0].start); ordered, line = [], []
    for o in rows:   # group into rows by vertical overlap, then left-to-right
        if line and o[0][0].start > max(l[0][0].stop for l in line) - 0.3 * (o[0][0].stop - o[0][0].start): ordered += sorted(line, key=lambda l: l[0][1].start); line = []
        line.append(o)
    ordered += sorted(line, key=lambda l: l[0][1].start)
    for k, (sl, s) in enumerate(ordered):
        name = names[k] if k < len(names) else f"part_{k + 1:02d}"
        res = save((sl[0].start, sl[0].stop, sl[1].start, sl[1].stop), name)
        if res: out.append((name, *res))
for name, p, w, h in out: print(f"  {name:14s} {w:5d}x{h:<5d} {p}")
print(f"{len(out)} piece(s) written to {a.out}" + ("" if len(names) in (0, len(out)) else f"  (WARNING: {len(names)} names for {len(out)} pieces — check the order)"))
