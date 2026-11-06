"""tools/refs.py — measure reference screenshots (competitor channels, the user's own art) to build a style pack from them.

  python tools/refs.py <folder or images…> [--out build/refs] [--groups auto|N] [--k 6]

For every image: the main colours (k-means palette), brightness, saturation, how much dark line work there is, how
flat the fills are, detail level. Then it groups the images that look alike, so screenshots of very different styles
are noticed before a pack is built. Writes:
  <out>/refs_sheet.png   one row per group: thumbnails with their palettes, plus the merged group palette
  <out>/refs.json        per-image numbers, the groups, and per group a merged palette with suggested roles
                         (bg, ink, skin-ish, accents) to copy into style.json
No connectors or internet needed. The numbers group by colour and texture, not by meaning, and lean towards splitting:
look at the sheet yourself, merge groups that are clearly one style (or re-run with --groups N), split ones that are not.
"""
import argparse, colorsys, json, os, sys
import numpy as np
try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    sys.exit("Pillow is missing: python -m pip install pillow")

ap = argparse.ArgumentParser(); ap.add_argument("inputs", nargs="+"); ap.add_argument("--out", default="build/refs")
ap.add_argument("--groups", default="auto"); ap.add_argument("--k", type=int, default=6)
a = ap.parse_args()
EXT = (".png", ".jpg", ".jpeg", ".webp", ".bmp")
files = []
for p in a.inputs:
    if os.path.isdir(p): files += [os.path.join(p, f) for f in sorted(os.listdir(p)) if f.lower().endswith(EXT)]
    elif p.lower().endswith(EXT): files.append(p)
if not files: sys.exit("no images found")
os.makedirs(a.out, exist_ok=True)

def kmeans(px, k, iters=12):
    """deterministic k-means in RGB; returns centres sorted by weight, weights"""
    px = px.astype(np.float32); n = len(px)
    lum = px @ np.array([0.299, 0.587, 0.114], np.float32); order = np.argsort(lum)
    C = px[order[np.linspace(0, n - 1, k).astype(int)]].copy()     # init spread over brightness
    for _ in range(iters):
        d = ((px[:, None, :] - C[None]) ** 2).sum(2); lab = d.argmin(1)
        for j in range(k):
            m = lab == j
            if m.any(): C[j] = px[m].mean(0)
    d = ((px[:, None, :] - C[None]) ** 2).sum(2); lab = d.argmin(1); w = np.bincount(lab, minlength=k) / n
    o = np.argsort(-w); return C[o], w[o]
hexc = lambda c: "#%02x%02x%02x" % tuple(int(round(v)) for v in c)

def measure(path):
    im = Image.open(path).convert("RGB"); W0, H0 = im.size
    sm = im.resize((200, max(1, round(200 * H0 / W0))), Image.LANCZOS); A = np.asarray(sm).astype(np.float32)
    px = A.reshape(-1, 3); C, w = kmeans(px, a.k)
    L = A @ np.array([0.299, 0.587, 0.114], np.float32)
    mx, mn = A.max(2), A.min(2); sat = np.where(mx > 0, (mx - mn) / np.maximum(mx, 1), 0)
    gx = np.abs(np.diff(L, axis=1))[:-1, :]; gy = np.abs(np.diff(L, axis=0))[:, :-1]; grad = np.hypot(gx, gy)
    dark = L < 45
    # dark line work: dark pixels that sit next to clearly lighter ones (outlines), vs big dark areas
    k = 3; P = np.pad(L, k, mode="edge"); I = P.cumsum(0).cumsum(1); I = np.pad(I, ((1, 0), (1, 0)))
    n = 2 * k + 1; loc = (I[n:, n:] - I[:-n, n:] - I[n:, :-n] + I[:-n, :-n]) / (n * n)
    dl = ((loc - L) > 40) & (L < 120)          # line pixels: clearly darker than their neighbourhood (outlines, strokes)
    q = (A // 32).astype(int); uniq = len(np.unique(q[..., 0] * 64 + q[..., 1] * 8 + q[..., 2]))
    hue = np.zeros(12)
    for c, ww in zip(C, w):
        h, l, s = colorsys.rgb_to_hls(*(c / 255)); hue[int(h * 12) % 12] += ww * s
    f = {"brightness": float(L.mean() / 255), "saturation": float(sat.mean()), "dark_area": float(dark.mean()),
         "outline": float(dl.mean()), "edges": float((grad > 25).mean()), "flat": float((grad < 4).mean()),
         "colours": uniq, "contrast": float(L.std() / 128)}
    return {"file": path, "size": [W0, H0], "palette": [hexc(c) for c in C], "weights": [round(float(v), 3) for v in w], **{k: round(v, 3) if isinstance(v, float) else v for k, v in f.items()}, "_hue": hue, "_px": px}

R = [measure(p) for p in files]
def vec(r):
    return np.concatenate([[r["brightness"] * 2, r["saturation"] * 2.5, r["outline"] * 45, r["edges"] * 4, r["flat"] * 2.5, min(r["colours"], 200) / 100, r["contrast"]], r["_hue"] * 2.5])
X = np.array([vec(r) for r in R])

# agglomerative clustering (average link); auto = merge while the average distance is under a threshold
def cluster(X, n_groups=None, thr=1.15):
    groups = [[i] for i in range(len(X))]
    D = lambda g, h: np.mean([np.linalg.norm(X[i] - X[j]) for i in g for j in h])
    while len(groups) > 1:
        best = min(((D(groups[i], groups[j]), i, j) for i in range(len(groups)) for j in range(i + 1, len(groups))))
        if n_groups is None and best[0] > thr: break
        if n_groups is not None and len(groups) <= n_groups: break
        _, i, j = best; groups[i] += groups[j]; del groups[j]
    return groups
groups = cluster(X, None if a.groups == "auto" else int(a.groups))
groups.sort(key=lambda g: -len(g))

def roles(C, w):
    info = []
    for c, ww in zip(C, w):
        h, l, s = colorsys.rgb_to_hls(*(c / 255)); info.append((hexc(c), float(ww), h, l, s))
    by_w = sorted(info, key=lambda t: -t[1]); bg = by_w[0][0]
    ink = min(info, key=lambda t: t[3])[0]
    skin = [t[0] for t in info if 0.02 < t[2] < 0.12 and 0.45 < t[3] < 0.85 and 0.2 < t[4] < 0.75]
    acc = [t[0] for t in sorted(info, key=lambda t: -(t[4] * (1 - abs(t[3] - 0.5) * 1.4))) if t[0] not in (bg, ink)][:3]
    return {"bg": bg, "ink": ink, "skinLike": skin[:2], "accents": acc}

out = {"images": [], "groups": []}
for gi, g in enumerate(groups):
    px = np.concatenate([R[i]["_px"][:: max(1, len(R[i]["_px"]) // 6000)] for i in g]); C, w = kmeans(px, 8)
    mean = {k: round(float(np.mean([R[i][k] for i in g])), 3) for k in ("brightness", "saturation", "outline", "edges", "flat", "contrast")}
    look = []
    look.append("clear dark outlines" if mean["outline"] > 0.026 else "thin lines or some outlines" if mean["outline"] > 0.014 else "few or no outlines")
    look.append("flat fills" if mean["flat"] > 0.6 else "some texture/gradients" if mean["flat"] > 0.4 else "textured/detailed")
    look.append("dark" if mean["brightness"] < 0.35 else "light" if mean["brightness"] > 0.65 else "mid-tone")
    look.append("saturated" if mean["saturation"] > 0.45 else "muted" if mean["saturation"] < 0.22 else "moderate colour")
    out["groups"].append({"group": gi + 1, "images": [R[i]["file"] for i in g], "palette": [hexc(c) for c in C], "weights": [round(float(v), 3) for v in w], "roles": roles(C, w), "mean": mean, "reads_as": ", ".join(look)})
for r in R: out["images"].append({k: v for k, v in r.items() if not k.startswith("_")})
json.dump(out, open(os.path.join(a.out, "refs.json"), "w"), indent=1)

# contact sheet: one row per group
TW, TH, SW = 300, 169, 300
try: font = ImageFont.truetype("DejaVuSans.ttf", 15)
except Exception: font = ImageFont.load_default()
cols = max(len(g) for g in groups) + 1; rowh = TH + 64
sheet = Image.new("RGB", (12 + cols * (TW + 12), 12 + len(groups) * (rowh + 30)), (24, 24, 28)); d = ImageDraw.Draw(sheet)
for gi, g in enumerate(groups):
    y = 12 + gi * (rowh + 30); G = out["groups"][gi]
    d.text((12, y), f"Group {gi + 1}: {len(g)} image(s) — {G['reads_as']}", fill=(235, 235, 235), font=font); y += 24
    for k, i in enumerate(g):
        x = 12 + k * (TW + 12); im = Image.open(R[i]["file"]).convert("RGB"); im.thumbnail((TW, TH)); sheet.paste(im, (x, y))
        pw = TW / len(R[i]["palette"])
        for j, c in enumerate(R[i]["palette"]): d.rectangle([x + j * pw, y + TH + 4, x + (j + 1) * pw - 2, y + TH + 22], fill=c)
        d.text((x, y + TH + 26), os.path.basename(R[i]["file"])[:38], fill=(170, 170, 170), font=font)
    x = 12 + (cols - 1) * (TW + 12); d.text((x, y), "merged palette", fill=(200, 200, 200), font=font)
    for j, (c, ww) in enumerate(zip(G["palette"], G["weights"])):
        yy = y + 20 + j * 24; d.rectangle([x, yy, x + 40, yy + 20], fill=c); d.text((x + 50, yy + 2), f"{c}  {ww * 100:.0f}%", fill=(220, 220, 220), font=font)
sheet.save(os.path.join(a.out, "refs_sheet.png"))
print(f"{len(R)} image(s) -> {len(groups)} group(s)")
for G in out["groups"]: print(f"  group {G['group']}: {len(G['images'])} img — {G['reads_as']} — bg {G['roles']['bg']} ink {G['roles']['ink']} accents {', '.join(G['roles']['accents'])}")
print(f"wrote {a.out}/refs_sheet.png and refs.json")
