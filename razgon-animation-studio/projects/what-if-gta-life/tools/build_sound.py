#!/usr/bin/env python3
"""Ролик 07: звуковой план. Дописывает в story/shots.json music, sfx (по надписям и событиям), amb (по месту).
Запуск ПОСЛЕ build_storyboard.py:  python3 projects/what-if-gta-life/tools/build_sound.py"""
import json, os
PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
st = json.load(open(os.path.join(PROJ, "story", "shots.json"), encoding="utf-8"))
tx = json.load(open(os.path.join(PROJ, "story", "texts.json"), encoding="utf-8"))
shots = st["shots"]; END = shots[-1]["end"]
T = {s["id"]: s for s in shots}
def at(i): return T[i]["start"]
st["music"] = [
    {"start": 0, "end": at("s013"), "mood": "playful", "intensity": 0.45},
    {"start": at("s013"), "end": at("s026"), "mood": "playful", "intensity": 0.5},
    {"start": at("s026"), "end": at("s044"), "mood": "hopeful", "intensity": 0.5},
    {"start": at("s044"), "end": at("s056"), "mood": "triumph", "intensity": 0.5},
    {"start": at("s056"), "end": at("s069"), "mood": "action", "intensity": 0.55},
    {"start": at("s069"), "end": at("s075"), "mood": "tension", "intensity": 0.4},
    {"start": at("s075"), "end": at("s085"), "mood": "playful", "intensity": 0.45},
    {"start": at("s085"), "end": at("s097"), "mood": "tension", "intensity": 0.45},
    {"start": at("s097"), "end": at("s113"), "mood": "epic", "intensity": 0.55},
    {"start": at("s113"), "end": at("s121"), "mood": "triumph", "intensity": 0.5},
    {"start": at("s121"), "end": END, "mood": "wonder", "intensity": 0.4},
]
AMB = {"CLASS": ("roomtone", -32), "KITCHEN": ("roomtone", -31), "LIVING": ("roomtone", -32), "NIGHT": ("roomtone", -32), "YARD": ("murmur", -36), "STREET": ("city", -33),
       "DOCK": ("wind", -34), "GARAGE": ("roomtone", -33), "DRIVE": ("murmur", -36), "SCHOOL": ("murmur", -33), "WASH": ("rain", -30), "ROOF": ("wind", -31), "SKYFALL": ("wind", -24),
       "WARD": ("roomtone", -32), "PARK": ("wind", -31), "COASTER": ("wind", -30)}
EV = {
    "s002": [(0.3, "powerup", -12, 1.0)], "s003": [(0.1, "hit", -12, 1.0), (1.0, "hit", -14, 1.0), (1.9, "hit", -14, 1.2)], "s007": [(3.4, "ding", -10, 1.1), (3.5, "cheer", -20, 1.0)],
    "s008": [(0.0, "phonebuzz", -14, 1.0)], "s010": [(0.3, "pop", -14, 1.0)], "s013": [(0.2, "ding", -12, 1.1)], "s019": [(0.3, "ding", -12, 1.0), (2.2, "ding", -12, 1.3)],
    "s022": [(1.0, "hit", -14, 0.8), (2.4, "ding", -12, 1.2)], "s033": [(0.3, "counter", -14, 1.0)], "s036": [(0.1, "ding", -12, 1.0)], "s040": [(0.1, "powerup", -14, 1.0)],
    "s043": [(0.0, "whoosh", -14, 1.0)], "s044": [(2.0, "impact", -12, 1.0), (2.2, "shimmer", -16, 1.0)], "s049": [(0.0, "carpass", -14, 1.0)], "s055": [(1.0, "carpass", -12, 1.1)],
    "s056": [(0.0, "stinger", -14, 1.0)], "s057": [(0.0, "hit", -14, 1.0)], "s058": [(0.2, "stinger", -14, 1.0)], "s060": [(0.5, "swish", -14, 1.0), (2.0, "swish", -14, 1.2)],
    "s061": [(0.8, "pop", -12, 1.1), (1.9, "glitch", -16, 1.0)], "s063": [(0.5, "cheer", -18, 1.0)], "s064": [(0.0, "phonering", -12, 1.0)], "s066": [(0.3, "stinger", -12, 1.0), (0.4, "heartbeat", -20, 1.0)],
    "s072": [(0.5, "whoosh", -14, 1.0)], "s073": [(0.0, "riser", -16, 1.0)], "s074": [(0.3, "impact", -10, 1.0)], "s075": [(0.0, "heartbeat", -20, 1.0), (0.5, "tick", -14, 1.0)],
    "s076": [(0.3, "powerup", -14, 1.0)], "s081": [(0.3, "counter", -16, 1.0)], "s082": [(0.3, "applause", -22, 1.0)], "s088": [(0.0, "riser", -18, 1.0)],
    "s089": [(0.1, "hit", -12, 1.0), (1.2, "hit", -12, 1.0), (2.3, "hit", -12, 0.8)], "s095": [(0.5, "powerup", -12, 1.0)], "s096": [(1.2, "whoosh", -12, 1.0)],
    "s102": [(2.5, "impact", -12, 1.0)], "s103": [(0.1, "impact", -10, 1.0)], "s105": [(1.0, "impact", -12, 1.0), (1.6, "impact", -10, 1.0)], "s106": [(0.2, "heartbeat", -22, 1.0)],
    "s109": [(0.3, "swish", -14, 1.0)], "s110": [(0.5, "pop", -12, 1.0)], "s112": [(2.6, "glitch", -12, 1.0), (2.7, "whoosh", -14, 1.0)], "s113": [(0.1, "powerup", -10, 1.0), (0.3, "ding", -10, 1.2), (0.6, "cheer", -18, 1.0)],
    "s114": [(0.3, "pop", -14, 1.0)], "s116": [(2.4, "hit", -14, 0.8)], "s121": [(1.0, "swish", -16, 1.0)], "s122": [(2.8, "stinger", -14, 1.0)], "s123": [(3.5, "pop", -10, 1.0), (4.2, "ding", -12, 1.3)],
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
