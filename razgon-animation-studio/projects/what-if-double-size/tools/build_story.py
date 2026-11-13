#!/usr/bin/env python3
"""Ролик 03: storyboard.md + text_elements.md + тайминги-слов.json -> story/shots.json, story/texts.json, timeline/words.json, config.json.
Запуск из razgon-animation-studio:  python3 projects/what-if-double-size/tools/build_story.py
Все времена в раскадровке уже под ускорение ×1,2; слова в тайминги-слов.json исходные (делим на 1,2)."""
import json, os, re, subprocess

HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.dirname(HERE)
VID = os.path.abspath(os.path.join(PROJ, "..", "..", "..", "ролики", "03 - What If You Doubled in Size Every 10 Minutes"))
SPEED = 1.2


def tsec(s):
    m, r = s.strip().split(":")
    return round(int(m) * 60 + float(r), 3)


shots = []
for line in open(os.path.join(VID, "storyboard.md"), encoding="utf-8"):
    if not re.match(r"\| S\d{3} \|", line):
        continue
    c = [x.strip() for x in line.strip().strip("|").split("|")]
    sid, rng, vo, place, visual, txt, motion, assets, hud = c[:9]
    a, b = [tsec(x) for x in rng.replace("–", "-").split("-")]
    shots.append({"id": sid.lower(), "start": a, "end": b, "line": vo, "scene": visual, "set": place, "hud": hud, "notes": motion,
                  "assets": assets, "in": {"type": "cut"}, "sfx": [], })
assert len(shots) == 137, len(shots)

KIND = {"подпись": "cap", "реплика": "say", "плашка": "plate", "плашка-раздел": "plate", "звук-надпись": "cap", "HUD рост": "hud",
        "HUD счётчик": "hudtick", "метка времени": "lbl", "знак в мире": "lbl", "метка роста": "lbl"}
texts = []
for line in open(os.path.join(VID, "text_elements.md"), encoding="utf-8"):
    m = re.match(r"\| (S\d{3}) \| (\d\d:\d\d\.\d) \| (.*) \| (.*) \|\s*$", line)
    if not m:
        continue
    sid, t, s, k = m.groups()
    s = s.strip()
    kk = KIND[k.strip()]
    if kk == "plate":
        s = re.sub(r"^PLUS$", "PLUS", s)
    texts.append({"t": tsec(t), "s": s, "k": kk, "sc": int(sid[1:])})
texts.sort(key=lambda r: r["t"])

dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", os.path.join(PROJ, "input", "voiceover.mp3")]).decode().strip())
json.dump({"title": "What If You Doubled in Size Every 10 Minutes", "duration": round(dur, 3), "shots": shots, "music": []},
          open(os.path.join(PROJ, "story", "shots.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(texts, open(os.path.join(PROJ, "story", "texts.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)

w = json.load(open(os.path.join(VID, "тайминги-слов.json"), encoding="utf-8"))
words = [{"word": x["word"], "start": round(x["start"] / SPEED, 3), "end": round(x["end"] / SPEED, 3)} for x in w["words"]]
json.dump({"source": "тайминги-слов.json /1.2", "words": words}, open(os.path.join(PROJ, "timeline", "words.json"), "w", encoding="utf-8"), ensure_ascii=False)
open(os.path.join(PROJ, "timeline", "transcript.txt"), "w", encoding="utf-8").write(open(os.path.join(PROJ, "input", "script.txt"), encoding="utf-8").read())

cfg = {"title": "What If You Doubled in Size Every 10 Minutes", "aspect": "16:9", "resolution": "1080p", "fps": 24, "stylePack": "doodle", "style": "clean",
       "voiceover": "input/voiceover.mp3", "script": "input/script.txt", "duration": round(dur, 3), "captions": False, "bars": None,
       "fadeIn": 0.5, "fadeOut": 0.8, "music": {"enabled": True, "gainDb": -17}, "sfx": {"enabled": True, "gainDb": -6}, "loudness": -14}
json.dump(cfg, open(os.path.join(PROJ, "config.json"), "w", encoding="utf-8"), indent=1)
print("shots", len(shots), "texts", len(texts), "words", len(words), "dur", dur, "last end", shots[-1]["end"])
