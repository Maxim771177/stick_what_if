#!/usr/bin/env python3
"""Ролик 09: звуковой план. Дописывает в story/shots.json music, sfx (по надписям и событиям), amb (по месту).
Запуск ПОСЛЕ build_storyboard.py:  python3 projects/what-if-see-10s/tools/build_sound.py"""
import json, os
PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
st = json.load(open(os.path.join(PROJ, "story", "shots.json"), encoding="utf-8"))
tx = json.load(open(os.path.join(PROJ, "story", "texts.json"), encoding="utf-8"))
shots = st["shots"]; END = shots[-1]["end"]
T = {s["id"]: s for s in shots}
def at(i): return T[i]["start"]
st["music"] = [
    {"start": 0, "end": at("s009"), "mood": "playful", "intensity": 0.45},
    {"start": at("s009"), "end": at("s010"), "mood": "tension", "intensity": 0.4},
    {"start": at("s010"), "end": at("s023"), "mood": "playful", "intensity": 0.5},
    {"start": at("s023"), "end": at("s039"), "mood": "triumph", "intensity": 0.5},
    {"start": at("s039"), "end": at("s042"), "mood": "mystery", "intensity": 0.45},
    {"start": at("s042"), "end": at("s050"), "mood": "tension", "intensity": 0.6},
    {"start": at("s050"), "end": at("s055"), "mood": "hopeful", "intensity": 0.5},
    {"start": at("s055"), "end": at("s061"), "mood": "playful", "intensity": 0.5},
    {"start": at("s061"), "end": at("s069"), "mood": "hopeful", "intensity": 0.5},
    {"start": at("s069"), "end": at("s079"), "mood": "mystery", "intensity": 0.45},
    {"start": at("s079"), "end": at("s086"), "mood": "tension", "intensity": 0.5},
    {"start": at("s086"), "end": at("s090"), "mood": "mystery", "intensity": 0.4},
    {"start": at("s090"), "end": at("s102"), "mood": "epic", "intensity": 0.65},
    {"start": at("s102"), "end": at("s104"), "mood": "triumph", "intensity": 0.55},
    {"start": at("s104"), "end": at("s113"), "mood": "hopeful", "intensity": 0.5},
    {"start": at("s113"), "end": at("s117"), "mood": "mystery", "intensity": 0.5},
    {"start": at("s117"), "end": END, "mood": "wonder", "intensity": 0.45},
]
AMB = {"CAFE": ("murmur", -33), "CLASS": ("roomtone", -32), "GYM": ("murmur", -34), "HALL": ("murmur", -34), "STREET": ("city", -33), "STORE": ("wind", -34), "STAGE": ("murmur", -34), "KITCHEN": ("roomtone", -31), "ROOM": ("roomtone", -32)}
def ticks(*ts, g=-14): return [(x, "tick", g, 1.0) for x in ts]
EV = {
    "s003": [(0.3, "glitch", -14, 1.0)], "s005": [(1.4, "swish", -14, 1.0)], "s006": [(0.4, "hit", -14, 1.0)], "s009": [(0.4, "powerup", -14, 1.0)], "s010": [(0.4, "powerup", -14, 1.0)],
    "s017": ticks(0.6, 1.2, 1.8), "s019": [(1.0, "buzz", -20, 1.0), (2.0, "buzz", -20, 1.0)], "s020": [(0.6, "buzz", -18, 0.8)], "s024": [(0.9, "ding", -12, 1.0)],
    "s026": [(1.6, "swish", -14, 1.0)], "s028": [(0.3, "swish", -14, 1.0)], "s031": [(0.6, "swish", -14, 1.0), (1.2, "hit", -14, 1.0)], "s032": [(0.6, "swish", -14, 1.0), (1.1, "hit", -14, 1.0)],
    "s033": [(0.3, "swish", -14, 1.0), (0.9, "hit", -14, 1.0)], "s034": [(2.3, "whoosh", -12, 1.0)], "s035": [(0.5, "whoosh", -12, 1.0), (1.2, "swish", -14, 1.0), (2.7, "ding", -14, 0.8)],
    "s037": [(2.0, "swish", -14, 1.0), (2.6, "hit", -14, 1.0)], "s038": [(0.2, "cheer", -14, 1.0), (0.3, "applause", -18, 1.0)], "s044": [(0.3, "powerup", -14, 1.0)], "s045": [(1.6, "impact", -12, 1.0)],
    "s046": ticks(0.5, 1.0, 1.5, 2.0, g=-16), "s047": [(0.3, "counter", -14, 1.0)], "s049": [(0.5, "carpass", -10, 1.0)], "s052": [(0.3, "pop", -14, 1.0)],
    "s056": [(3.3, "ding", -12, 1.2)], "s057": [(0.5, "whoosh", -16, 1.0), (1.4, "whoosh", -16, 1.1), (2.4, "whoosh", -16, 1.0), (3.4, "whoosh", -16, 1.1)], "s058": [(0.5, "whistle", -16, 1.0)],
    "s062": [(3.0, "buzz", -18, 1.0)], "s063": [(0.8, "swish", -16, 1.0)], "s067": [(2.1, "ding", -12, 1.2)], "s074": [(1.0, "pop", -14, 1.0), (3.3, "hit", -12, 1.0)],
    "s080": ticks(0.8, 2.8, 4.8, g=-14), "s081": [(1.0, "ding", -16, 1.4)], "s091": [(2.2, "buzz", -16, 1.0), (2.5, "impact", -14, 0.8)], "s092": [(0.4, "whoosh", -14, 1.0), (1.8, "impact", -10, 0.8)],
    "s093": [(0.3, "powerup", -14, 1.0)], "s096": ticks(2.0, g=-12), "s099": [(0.9, "whoosh", -12, 1.0)], "s100": [(0.2, "whoosh", -14, 1.0), (1.4, "impact", -14, 0.9)],
    "s101": [(1.0, "impact", -6, 0.6), (1.1, "shimmer", -10, 1.0)], "s103": [(0.2, "cheer", -14, 1.0), (0.4, "applause", -12, 1.0)],
    "s115": [(0.8, "ding", -12, 1.0), (1.6, "ding", -12, 1.1), (2.4, "ding", -12, 1.2), (3.6, "ding", -10, 1.5), (3.7, "shimmer", -12, 1.0)], "s119": [(0.3, "ding", -12, 1.0), (3.0, "ding", -12, 1.2)],
}
KIND = {"cap": ("pop", -16, 1.0), "plate": ("hit", -11, 1.0), "say": ("blip", -20, 1.0), "card": ("pop", -14, 0.9)}
for sh in shots:
    sh["sfx"] = []
    a = AMB.get(sh["set"])
    if a: sh["amb"] = {"name": a[0], "gain": a[1]}
    else: sh.pop("amb", None)
    for r in tx:
        if sh["start"] - 0.02 <= r["t"] < sh["end"] - 0.05 and r["k"] in KIND:
            n, g, p = KIND[r["k"]]
            sh["sfx"].append({"at": round(r["t"] - sh["start"], 2), "name": n, "gain": g, "pitch": p})
    for atx, n, g, p in EV.get(sh["id"], []):
        sh["sfx"].append({"at": atx, "name": n, "gain": g, "pitch": p})
    sh["sfx"].sort(key=lambda x: x["at"])
json.dump(st, open(os.path.join(PROJ, "story", "shots.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("music sections", len(st["music"]), "sfx total", sum(len(s["sfx"]) for s in shots))
