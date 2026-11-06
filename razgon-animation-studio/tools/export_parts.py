"""tools/export_parts.py — cut a finished video into separate parts for editing (only when the user asks for parts).

  python tools/export_parts.py --project projects/<slug> --by scene          # a new part at every change of set/location
  python tools/export_parts.py --project projects/<slug> --by act            # one part per music section (story acts)
  python tools/export_parts.py --project projects/<slug> --by shot           # every shot as its own clip
  python tools/export_parts.py --project projects/<slug> --every 60          # ~60 s parts, cut on the nearest shot boundary
  python tools/export_parts.py --project projects/<slug> --shots s010-s024   # one part from a shot range
Options: --video FILE (default: out/<title>.mp4, else build/video_silent.mp4)  --silent (drop audio)  --crf 18

Each run replaces the previous out/parts/. Cuts are re-encoded so they are frame-accurate and every part starts on a keyframe. Parts go to out/parts/ with
parts.json (id, file, start, end, shots). Pair with `python audio/mix.py --project … --stems` for separate
voice / music / sfx / ambience tracks.
"""
import argparse, json, os, re, subprocess, sys

ap = argparse.ArgumentParser()
ap.add_argument("--project", required=True)
g = ap.add_mutually_exclusive_group(required=True)
g.add_argument("--by", choices=["scene", "act", "shot"]); g.add_argument("--every", type=float); g.add_argument("--shots")
ap.add_argument("--video"); ap.add_argument("--silent", action="store_true"); ap.add_argument("--crf", default="18")
a = ap.parse_args()
P = a.project
cfg = json.load(open(os.path.join(P, "config.json"), encoding="utf-8"))
story = json.load(open(os.path.join(P, "story", "shots.json"), encoding="utf-8"))
shots = story["shots"]
safe = re.sub(r"[^\w\- ]+", "", cfg.get("title") or "video").strip().replace(" ", "_") or "video"
video = a.video or next((v for v in [os.path.join(P, "out", f"{safe}.mp4"), os.path.join(P, "build", "video_silent.mp4")] if os.path.exists(v)), None)
if not video: sys.exit("no rendered video found — render first (or pass --video)")

def label(s): return re.sub(r"[^\w-]+", "_", s)[:40].strip("_")
parts = []  # (label, start, end, [shot ids])
if a.by == "shot":
    parts = [(s["id"], s["start"], s["end"], [s["id"]]) for s in shots]
elif a.by == "scene" and not any(s.get("set") for s in shots):
    print("shots.json has no \"set\" on its shots, so scenes can't be detected — splitting by act instead")
    a.by = "act"
if a.by == "scene":
    cur = None
    for s in shots:
        key = s.get("set") or s.get("scene", "").split(",")[0].split(":")[0][:24] or "scene"
        if cur and cur[0] == key: cur[2] = s["end"]; cur[3].append(s["id"])
        else:
            if cur: parts.append(tuple(cur))
            cur = [key, s["start"], s["end"], [s["id"]]]
    parts.append(tuple(cur))
if a.by == "act":
    plan = story.get("music") or [{"start": 0, "end": shots[-1]["end"], "mood": "all"}]
    bounds = [shots[0]["start"]] + [min((s["start"] for s in shots), key=lambda x: abs(x - m["start"])) for m in plan[1:]] + [shots[-1]["end"]]
    for i, m in enumerate(plan):
        ids = [s["id"] for s in shots if bounds[i] <= s["start"] < bounds[i + 1]]
        if ids: parts.append((f"act{i + 1}_{m.get('mood', '')}", bounds[i], bounds[i + 1], ids))
if a.every:
    start, ids = shots[0]["start"], []
    for s in shots:
        ids.append(s["id"])
        if s["end"] - start >= a.every: parts.append((f"part", start, s["end"], ids)); start, ids = s["end"], []
    if ids: parts.append(("part", start, shots[-1]["end"], ids))
if a.shots:
    m = re.match(r"^(\w+)-(\w+)$", a.shots) or re.match(r"^(\w+)$", a.shots)
    first, last = m.group(1), m.group(m.lastindex)
    idx = {s["id"]: i for i, s in enumerate(shots)}
    if first not in idx or last not in idx: sys.exit(f"unknown shot id in {a.shots}")
    sel = shots[idx[first]: idx[last] + 1]
    parts = [(f"{first}-{last}", sel[0]["start"], sel[-1]["end"], [s["id"] for s in sel])]

outd = os.path.join(P, "out", "parts"); os.makedirs(outd, exist_ok=True)
for f in os.listdir(outd):   # a new export replaces the previous one
    if f.endswith(".mp4") or f == "parts.json": os.remove(os.path.join(outd, f))
manifest = []
for i, (lb, t0, t1, ids) in enumerate(parts, 1):
    f = os.path.join(outd, f"{i:02d}_{label(lb)}.mp4")
    cmd = ["ffmpeg", "-y", "-v", "error", "-ss", f"{t0:.3f}", "-i", video, "-t", f"{t1 - t0:.3f}", "-c:v", "libx264", "-crf", str(a.crf), "-preset", "medium", "-pix_fmt", "yuv420p"]
    cmd += ["-an"] if a.silent else ["-c:a", "aac", "-b:a", "192k"]
    subprocess.run(cmd + ["-movflags", "+faststart", f], check=True)
    manifest.append({"part": i, "file": os.path.basename(f), "start": round(t0, 3), "end": round(t1, 3), "shots": ids})
    print(f"  {os.path.basename(f)}  {t0:7.2f}–{t1:7.2f}s  ({len(ids)} shot(s))")
json.dump(manifest, open(os.path.join(outd, "parts.json"), "w", encoding="utf-8"), indent=1)
print(f"{len(manifest)} part(s) -> {outd}")
