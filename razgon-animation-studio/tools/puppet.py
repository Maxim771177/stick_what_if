"""tools/puppet.py — make and check cutout puppets (rig.json) for the "cutout" character family.

  python tools/puppet.py init  projects/<slug>/assets/ray [--height 600]   # write rig.json from the images in the folder
  python tools/puppet.py check projects/<slug>/assets/ray/rig.json          # validate files, bones, face sets

File names it understands (PNG, WebP or SVG):
  parts mode   head, torso, arm_upper, arm_lower, hand, leg_upper, leg_lower, foot   (+ optional *_back versions;
               without them the front image is reused darker for the far limb)
  faces        eyes_open, eyes_closed, eyes_happy, eyes_angry, eyes_sad, eyes_wide; mouth_closed, mouth_open, mouth_mid,
               mouth_smile, mouth_frown, mouth_o   (drawn on top of the head; leave the head image without eyes/mouth)
  sprites mode any other names = whole-body poses/emotions (idle, point, angry, happy, closeup …); "idle" is required

Joint guesses: for each part, "from" = the joint it hangs from (top centre; the neck = bottom centre of the head) and
"to" = the other end. They are guesses from the image bounds: open a test shot, look, and fix the numbers in rig.json
(pixel coordinates inside each image). Face anchors eyesAt / mouthAt are guesses too.
"""
import json, os, re, sys

PARTS = ["head", "torso", "arm_upper", "arm_lower", "hand", "leg_upper", "leg_lower", "foot"]
KEY = {"torso": "torso", "head": "head", "arm_upper": "armUpper", "arm_lower": "armLower", "hand": "hand", "leg_upper": "legUpper", "leg_lower": "legLower", "foot": "foot"}
EXT = (".png", ".webp", ".svg", ".jpg")

def bounds(path):
    """(w, h, x0, y0, x1, y1) of the visible content."""
    if path.endswith(".svg"):
        s = open(path, encoding="utf-8").read(); w = re.search(r'width="([\d.]+)', s); h = re.search(r'height="([\d.]+)', s)
        if not (w and h): vb = re.search(r'viewBox="[\d.\s-]+?([\d.]+)\s+([\d.]+)"', s); w, h = (vb.group(1), vb.group(2)) if vb else ("100", "100")
        else: w, h = w.group(1), h.group(1)
        W, H = float(w), float(h); return W, H, 0, 0, W, H
    from PIL import Image
    im = Image.open(path).convert("RGBA"); bb = im.getchannel("A").getbbox() or (0, 0, *im.size); return (*im.size, *bb)

def init(folder, height):
    files = {os.path.splitext(f)[0].lower(): f for f in os.listdir(folder) if f.lower().endswith(EXT)}
    rig = {"name": os.path.basename(os.path.normpath(folder)).title(), "height": height}
    face = {"eyes": {}, "mouth": {}}
    for n, f in files.items():
        if n.startswith("eyes_"): face["eyes"][n[5:]] = f
        if n.startswith("mouth_"): face["mouth"][n[6:]] = f
    if "torso" in files and "head" in files:
        rig["mode"] = "parts"; parts = {}
        for p in PARTS:
            for side in ("F", "B"):
                f = files.get(f"{p}_back") if side == "B" and f"{p}_back" in files else files.get(p)
                if not f: continue
                W, H, x0, y0, x1, y1 = bounds(os.path.join(folder, f)); cx = round((x0 + x1) / 2)
                d = {"file": f, "from": [cx, round(y0 + (y1 - y0) * 0.06)], "to": [cx, round(y1 - (y1 - y0) * 0.06)]}
                if p == "head": d["from"], d["to"] = [cx, round(y1 - (y1 - y0) * 0.04)], [cx, round(y0 + (y1 - y0) * 0.04)]
                if side == "B" and f"{p}_back" not in files: d["dark"] = 0.18
                key = KEY[p] if p in ("torso", "head") else KEY[p] + side
                if p in ("torso", "head") and side == "B": continue
                parts[key] = d
        rig["parts"] = parts
        if face["eyes"] or face["mouth"]:
            W, H, x0, y0, x1, y1 = bounds(os.path.join(folder, files["head"]))
            face["eyesAt"] = [round(x0 + (x1 - x0) * 0.6), round(y0 + (y1 - y0) * 0.45)]; face["mouthAt"] = [round(x0 + (x1 - x0) * 0.62), round(y0 + (y1 - y0) * 0.7)]
            rig["face"] = face
    else:
        rig["mode"] = "sprites"; sp = {}
        for n, f in files.items():
            if n.startswith(("eyes_", "mouth_")): continue
            W, H, x0, y0, x1, y1 = bounds(os.path.join(folder, f)); sp[n] = {"file": f, "anchor": [round(((x0 + x1) / 2) / W, 3), round(y1 / H, 3)]}
        rig["sprites"] = sp
        if "idle" not in sp and sp: print("  note: no 'idle' image — the first sprite will be the default")
        if face["eyes"] or face["mouth"]: rig["face"] = face; print("  note: face overlays found; add faceAt (and faceScale) to each sprite where they should go")
    out = os.path.join(folder, "rig.json"); json.dump(rig, open(out, "w", encoding="utf-8"), indent=1)
    print(f"wrote {out}  (mode {rig['mode']}; joints and face anchors are guesses — check them in a test shot)")

def check(path):
    m = json.load(open(path, encoding="utf-8")); base = os.path.dirname(path); errs, warns = [], []
    def exists(f, where):
        if not f: errs.append(f"{where}: no file"); return
        if not os.path.exists(os.path.join(base, f)): errs.append(f"{where}: missing file {f}")
    if m.get("mode") == "sprites":
        for k, s in (m.get("sprites") or {}).items(): exists(s.get("file"), f"sprite {k}")
        if "idle" not in (m.get("sprites") or {}): warns.append("no 'idle' sprite")
    else:
        for need in ["torso", "head", "armUpperF", "armLowerF", "legUpperF", "legLowerF"]:
            if need not in (m.get("parts") or {}): errs.append(f"part {need} missing")
        for k, d in (m.get("parts") or {}).items():
            exists(d.get("file"), f"part {k}")
            if not (isinstance(d.get("from"), list) and isinstance(d.get("to"), list)): errs.append(f"part {k}: needs from/to joint points")
    for kind in ("eyes", "mouth"):
        for k, f in ((m.get("face") or {}).get(kind) or {}).items(): exists(f, f"{kind} {k}")
    if m.get("face"):
        if "closed" not in (m["face"].get("mouth") or {}): warns.append("no mouth_closed (talking falls back to other mouths)")
        if "open" not in (m["face"].get("mouth") or {}): warns.append("no mouth_open: no lip flap")
        if "closed" not in (m["face"].get("eyes") or {}): warns.append("no eyes_closed: no blinking")
    if not m.get("height"): warns.append("height not set (pixel height of the standing character in the art) — default 600")
    for w in warns: print("  warn ", w)
    for e in errs: print("  ERROR", e)
    print(f"{path}: {'OK' if not errs else f'{len(errs)} error(s)'}"); return 1 if errs else 0

if __name__ == "__main__":
    if len(sys.argv) < 3 or sys.argv[1] not in ("init", "check"): print(__doc__); sys.exit(1)
    if sys.argv[1] == "init":
        h = int(sys.argv[sys.argv.index("--height") + 1]) if "--height" in sys.argv else 600; init(sys.argv[2], h)
    else: sys.exit(check(sys.argv[2]))
