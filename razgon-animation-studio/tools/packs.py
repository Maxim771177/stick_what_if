"""tools/packs.py — list and check style packs (stylepacks/<id>/).

  python tools/packs.py                 # list packs with their variants and character family
  python tools/packs.py --check <id>    # validate one pack (schema, colours, fonts, bible) before using it
  python tools/packs.py --new <id> [--from blank]   # start a new pack as a copy of another (default: blank)

A pack = style.json (the look as data the engine reads) + bible.md (the look in words, for Claude) + optional
refs/ (reference screenshots it was built from), fonts/ and assets/.
"""
import argparse, json, os, re, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PACKS = os.path.join(ROOT, "stylepacks")
COLOR = re.compile(r"^(#[0-9a-fA-F]{3,8}|rgba?\([\d\s.,%]+\))$")
REQUIRED = ["id", "name", "description", "characters", "fonts", "moods", "variants", "defaultVariant"]
GRADE_KEYS = ["contrast", "sat", "lift", "gamma", "gain", "vignette", "grain"]


def families():
    src = open(os.path.join(ROOT, "engine", "characters.js"), encoding="utf-8").read()
    block = src[src.index("const FAMILIES"):src.index("};", src.index("const FAMILIES"))]
    return re.findall(r"^\s+(\w+):\s*\{", block, re.M)


def load(pid):
    p = os.path.join(PACKS, pid, "style.json")
    if not os.path.exists(p): sys.exit(f"no pack '{pid}' (expected {p})")
    return json.load(open(p, encoding="utf-8"))


def colours(obj, where, errs):
    if isinstance(obj, str):
        if obj.startswith(("#", "rgb")) and not COLOR.match(obj): errs.append(f"bad colour {obj!r} at {where}")
    elif isinstance(obj, list):
        for i, v in enumerate(obj): colours(v, f"{where}[{i}]", errs)
    elif isinstance(obj, dict):
        for k, v in obj.items(): colours(v, f"{where}.{k}", errs)


def check(pid):
    errs, warns = [], []
    try: d = load(pid)
    except json.JSONDecodeError as e: print(f"style.json is not valid JSON: {e}"); return 1
    for k in REQUIRED:
        if k not in d: errs.append(f"missing key: {k}")
    fam = (d.get("characters") or {}).get("family")
    if fam not in families(): errs.append(f"characters.family {fam!r} is not an engine family ({', '.join(families())})")
    moods = d.get("moods") or {}
    if not moods: errs.append("moods is empty")
    keys = set(next(iter(moods.values()), {}).keys())
    for m, v in moods.items():
        if set(v) != keys: warns.append(f"mood {m!r} keys differ from the first mood: {sorted(set(v) ^ keys)}")
    if d.get("defaultMood") and d["defaultMood"] not in moods: errs.append(f"defaultMood {d['defaultMood']!r} not in moods")
    vs = d.get("variants") or {}
    if d.get("defaultVariant") not in vs: errs.append(f"defaultVariant {d.get('defaultVariant')!r} not in variants")
    for vid, v in vs.items():
        for k in ["name", "ink", "grade"]:
            if k not in v: errs.append(f"variant {vid}: missing {k}")
        for k in GRADE_KEYS:
            if k not in (v.get("grade") or {}): warns.append(f"variant {vid}: grade.{k} not set (engine default used)")
        for m in (v.get("moods") or {}):
            if m not in moods: errs.append(f"variant {vid} overrides unknown mood {m!r}")
    colours(d, "style", errs)
    for role, f in (d.get("fonts") or {}).items():
        for face in f.get("faces", []):
            src = face.get("src", "")
            path = os.path.join(ROOT, "node_modules", src) if src.startswith("@fontsource/") else os.path.join(PACKS, pid, src)
            if not os.path.exists(path):
                (warns if src.startswith("@fontsource/") else errs).append(f"font {role} {face.get('weight')}: file not found ({src})" + (" — add the @fontsource package to package.json and npm install" if src.startswith("@fontsource/") else ""))
    if not os.path.exists(os.path.join(PACKS, pid, "bible.md")): errs.append("bible.md missing (the look in words)")
    for w in warns: print("  warn ", w)
    for e in errs: print("  ERROR", e)
    print(f"{pid}: {'OK' if not errs else f'{len(errs)} error(s)'}" + (f", {len(warns)} warning(s)" if warns else ""))
    return 1 if errs else 0


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--check"); ap.add_argument("--new"); ap.add_argument("--from", dest="src", default="blank")
    a = ap.parse_args()
    if a.check: sys.exit(check(a.check))
    if a.new:
        dst = os.path.join(PACKS, a.new)
        if os.path.exists(os.path.join(dst, "style.json")): sys.exit(f"pack '{a.new}' already exists")
        if not re.match(r"^[a-z0-9][a-z0-9-]*$", a.new): sys.exit("pack id: lowercase letters, digits and dashes only")
        shutil.copytree(os.path.join(PACKS, a.src), dst, ignore=shutil.ignore_patterns("refs"), dirs_exist_ok=True)   # keeps a refs/ folder made earlier
        p = os.path.join(dst, "style.json"); d = json.load(open(p, encoding="utf-8")); d["id"] = a.new
        json.dump(d, open(p, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
        os.makedirs(os.path.join(dst, "refs"), exist_ok=True)
        print(f"created stylepacks/{a.new}/ from '{a.src}' — edit style.json and bible.md, then: python tools/packs.py --check {a.new}")
        return
    print("Style packs:")
    for pid in sorted(os.listdir(PACKS)):
        if not os.path.exists(os.path.join(PACKS, pid, "style.json")): continue
        d = load(pid)
        print(f"  {pid:22s} {d.get('name', ''):24s} family={d.get('characters', {}).get('family')}  variants: {', '.join(d.get('variants', {}))}  (default {d.get('defaultVariant')})")
        print(f"  {'':22s} {d.get('description', '')[:110]}")


if __name__ == "__main__":
    main()
