"""tools/new_project.py — create a project folder for one video.

  python tools/new_project.py --name my-video --voice "C:/path/voiceover.mp3" [--script path] \
      --aspect 16:9|9:16 --resolution 720p|1080p|1440p|2160p [--pack razgon-stickman] [--style <variant>] [--fps 24] [--captions]
"""
import argparse, json, os, shutil, sys
sys.path.insert(0, os.path.dirname(__file__))
from common import probe_duration, save_json

ap = argparse.ArgumentParser()
ap.add_argument("--name", required=True)
ap.add_argument("--voice", required=True)
ap.add_argument("--script")
ap.add_argument("--aspect", default="16:9", choices=["16:9", "9:16"])
ap.add_argument("--resolution", default="1080p", choices=["720p", "1080p", "1440p", "2160p", "4k"])
ap.add_argument("--pack", default="razgon-stickman", help="style pack id (folder in stylepacks/)")
ap.add_argument("--style", default=None, help="colour variant inside the pack (default: the pack's defaultVariant)")
ap.add_argument("--fps", type=int, default=24)
ap.add_argument("--title", default="")
ap.add_argument("--captions", action="store_true", help="burn word-by-word captions (recommended for 9:16)")
a = ap.parse_args()
pack_file = os.path.join("stylepacks", a.pack, "style.json")
if not os.path.exists(pack_file):
    have = sorted(d for d in os.listdir("stylepacks") if os.path.exists(os.path.join("stylepacks", d, "style.json"))) if os.path.isdir("stylepacks") else []
    sys.exit(f"style pack '{a.pack}' not found. Available: {', '.join(have) or 'none'}")
pack = json.load(open(pack_file, encoding="utf-8"))
if a.style and a.style not in pack["variants"]:
    sys.exit(f"variant '{a.style}' not in pack '{a.pack}'. Available: {', '.join(pack['variants'])}")
style = a.style or pack.get("defaultVariant") or next(iter(pack["variants"]))

root = os.path.join("projects", a.name)
for d in ["input", "timeline", "story", "scenes/sets", "scenes/shots", "build", "out", "audio"]:
    os.makedirs(os.path.join(root, d), exist_ok=True)
voice_dst = os.path.join("input", "voiceover" + os.path.splitext(a.voice)[1].lower())
shutil.copy2(a.voice, os.path.join(root, voice_dst))
script_dst = None
if a.script:
    script_dst = os.path.join("input", "script" + os.path.splitext(a.script)[1].lower())
    shutil.copy2(a.script, os.path.join(root, script_dst))
dur = probe_duration(os.path.join(root, voice_dst))
cfg = {"title": a.title or a.name, "aspect": a.aspect, "resolution": a.resolution, "fps": a.fps, "stylePack": a.pack, "style": style,
       "voiceover": voice_dst.replace("\\", "/"), "script": script_dst.replace("\\", "/") if script_dst else None,
       "duration": round(dur, 3), "captions": bool(a.captions), "bars": None, "fadeIn": 0.5, "fadeOut": 0.8,
       "music": {"enabled": True, "gainDb": -17}, "sfx": {"enabled": True, "gainDb": -6}, "loudness": -14}
save_json(os.path.join(root, "config.json"), cfg)
print(f"created {root}  (voiceover {dur:.1f}s, {a.aspect} {a.resolution} @ {a.fps}fps, pack {a.pack}, variant {style})")
