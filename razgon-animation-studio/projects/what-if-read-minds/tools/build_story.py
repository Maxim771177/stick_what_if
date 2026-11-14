#!/usr/bin/env python3
"""Ролик 04: storyboard.md + text_elements.md + тайминги-слов-сокращённые.json -> story/shots.json, story/texts.json, timeline/words.json.
Запуск из razgon-animation-studio:  python3 projects/what-if-read-minds/tools/build_story.py"""
import json, os, re, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); PROJ = os.path.dirname(HERE)
VID = os.path.abspath(os.path.join(PROJ, "..", "..", "..", "ролики", "04 - What If You Could Read Minds for 7 Days"))
SPEED = 1.2
def tsec(s):
    m, r = s.strip().split(":"); return round(int(m) * 60 + float(r), 3)
shots = []
for line in open(os.path.join(VID, "storyboard.md"), encoding="utf-8"):
    if not re.match(r"\| S\d{3} \|", line): continue
    c = [x.strip() for x in line.strip().strip("|").split("|")]
    if len(c) < 9: continue
    sid, rng = c[0], c[1]; hud, assets, motion, place, visual = c[-1], c[-2], c[-3], c[-6], c[-5]; vo = " ".join(c[2:-6])
    a, b = [tsec(x) for x in rng.replace("–", "-").split("-")]
    shots.append({"id": sid.lower(), "start": a, "end": b, "line": vo, "scene": visual, "set": place, "hud": hud, "notes": motion, "assets": assets, "in": {"type": "cut"}, "sfx": []})
texts = []
for line in open(os.path.join(VID, "text_elements.md"), encoding="utf-8"):
    m = re.match(r"\| (S\d{3}) \| (\d\d:\d\d\.\d) \| (.*) \| (.*) \|\s*$", line)
    if not m: continue
    sid, t, s, k = m.groups(); s = s.strip(); k = k.strip(); r = {"t": tsec(t), "s": s, "sc": int(sid[1:]), "raw": k}
    mm = re.match(r"облако (\w+), ярус (\d)", k); mc = re.match(r"облака (\w+), ярусы", k); mr = re.match(r"реплика (\w+)", k)
    if mm: r.update(k="cloud", who=mm.group(1), tier=int(mm.group(2)))
    elif mc: r.update(k="clouds")
    elif mr: r.update(k="say", who=mr.group(1))
    elif k.startswith("плашка"): r["k"] = "plate"
    elif k == "карточка": r["k"] = "card"
    elif k == "HUD день": r["k"] = "day"
    elif k in ("подпись", "подпись в углу", "подпись времени", "надпись крупно"): r["k"] = "cap"
    else: r["k"] = "lbl"
    texts.append(r)
texts.sort(key=lambda r: r["t"])
dur = float(subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", os.path.join(PROJ, "input", "voiceover.mp3")]).decode().strip())
T = "What If You Could Read Minds for 7 Days"
json.dump({"title": T, "duration": round(dur, 3), "shots": shots, "music": []}, open(os.path.join(PROJ, "story", "shots.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
json.dump(texts, open(os.path.join(PROJ, "story", "texts.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
w = json.load(open(os.path.join(VID, "тайминги-слов-сокращённые.json"), encoding="utf-8"))
words = [{"word": x["word"], "start": round(x["start"] / SPEED, 3), "end": round(x["end"] / SPEED, 3)} for x in w["words"]]
json.dump({"source": "тайминги-слов-сокращённые.json /1.2", "words": words}, open(os.path.join(PROJ, "timeline", "words.json"), "w", encoding="utf-8"), ensure_ascii=False)
open(os.path.join(PROJ, "timeline", "transcript.txt"), "w", encoding="utf-8").write(open(os.path.join(PROJ, "input", "script.txt"), encoding="utf-8").read())
print("shots", len(shots), "texts", len(texts), "words", len(words), "dur", dur, "last end", shots[-1]["end"])
