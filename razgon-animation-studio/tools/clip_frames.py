"""tools/clip_frames.py — prepare a ready video clip (AI video, stock without attribution, the user's footage) for engine/clips.js.

  python tools/clip_frames.py input/clips/ocean.mp4 --project projects/<slug> --name ocean [--from 2.5 --to 8] [--height 1080] [--fps 24]

Writes projects/<slug>/assets/clips/<name>/000001.jpg … + clip.json {fps, frames, w, h, dur, ext, source}.
The frame rate defaults to the project's fps, so one clip frame = one video frame at speed 1. The clip's own audio is
not used (put sounds in the shot's sfx/amb cues). Height defaults to the project resolution (max 1080 keeps files small).
"""
import argparse, json, os, shutil, subprocess, sys

ap = argparse.ArgumentParser()
ap.add_argument("video"); ap.add_argument("--project", required=True); ap.add_argument("--name", required=True)
ap.add_argument("--from", dest="t0", type=float); ap.add_argument("--to", dest="t1", type=float)
ap.add_argument("--height", type=int); ap.add_argument("--fps", type=float); ap.add_argument("--quality", type=int, default=3, help="JPEG q 2 (best) … 8")
a = ap.parse_args()
if not shutil.which("ffmpeg"): sys.exit("ffmpeg is missing (see references/install.md)")
cfg = json.load(open(os.path.join(a.project, "config.json"), encoding="utf-8"))
fps = a.fps or cfg.get("fps", 24)
res = {"720p": 720, "1080p": 1080, "1440p": 1440, "2160p": 2160, "4k": 2160}.get(str(cfg.get("resolution", "1080p")).lower(), 1080)
height = a.height or res
out = os.path.join(a.project, "assets", "clips", a.name); shutil.rmtree(out, ignore_errors=True); os.makedirs(out)
cmd = ["ffmpeg", "-v", "error", "-y"]
if a.t0 is not None: cmd += ["-ss", str(a.t0)]
cmd += ["-i", a.video]
if a.t1 is not None: cmd += ["-t", str(a.t1 - (a.t0 or 0))]
cmd += ["-an", "-vf", f"fps={fps},scale=-2:'min({height},ih)':flags=lanczos", "-q:v", str(a.quality), os.path.join(out, "%06d.jpg")]
subprocess.run(cmd, check=True)
frames = sorted(f for f in os.listdir(out) if f.endswith(".jpg"))
if not frames: sys.exit("no frames extracted — check the file and the --from/--to range")
try:
    from PIL import Image; w, h = Image.open(os.path.join(out, frames[0])).size
except Exception:
    p = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", os.path.join(out, frames[0])], capture_output=True, text=True); w, h = (int(v) for v in p.stdout.strip().split(","))
meta = {"fps": fps, "frames": len(frames), "w": w, "h": h, "dur": round(len(frames) / fps, 3), "ext": "jpg", "source": os.path.basename(a.video)}
json.dump(meta, open(os.path.join(out, "clip.json"), "w"), indent=1)
mb = sum(os.path.getsize(os.path.join(out, f)) for f in frames) / 1e6
print(f"{a.name}: {len(frames)} frames {w}x{h} @ {fps} fps ({meta['dur']} s, {mb:.0f} MB) -> {out}")
print(f"use: const CLIP = await loadClip(project('assets/clips/{a.name}'));  clip(g, CLIP, t)")
