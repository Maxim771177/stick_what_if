#!/usr/bin/env python3
"""Ролик 08: звуковой план. Дописывает в story/shots.json music, sfx (по надписям и событиям), amb (по месту).
Запуск ПОСЛЕ build_storyboard.py:  python3 projects/what-if-hide-iq/tools/build_sound.py"""
import json, os
PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
st = json.load(open(os.path.join(PROJ, "story", "shots.json"), encoding="utf-8"))
tx = json.load(open(os.path.join(PROJ, "story", "texts.json"), encoding="utf-8"))
shots = st["shots"]; END = shots[-1]["end"]
T = {s["id"]: s for s in shots}
def at(i): return T[i]["start"]
st["music"] = [
    {"start": 0, "end": at("s008"), "mood": "playful", "intensity": 0.45},
    {"start": at("s008"), "end": at("s009"), "mood": "tension", "intensity": 0.4},
    {"start": at("s009"), "end": at("s031"), "mood": "playful", "intensity": 0.5},
    {"start": at("s031"), "end": at("s039"), "mood": "mystery", "intensity": 0.45},
    {"start": at("s039"), "end": at("s052"), "mood": "tension", "intensity": 0.5},
    {"start": at("s052"), "end": at("s055"), "mood": "triumph", "intensity": 0.5},
    {"start": at("s055"), "end": at("s069"), "mood": "playful", "intensity": 0.55},
    {"start": at("s069"), "end": at("s073"), "mood": "triumph", "intensity": 0.5},
    {"start": at("s073"), "end": at("s076"), "mood": "mystery", "intensity": 0.45},
    {"start": at("s076"), "end": at("s092"), "mood": "hopeful", "intensity": 0.5},
    {"start": at("s092"), "end": at("s100"), "mood": "mystery", "intensity": 0.5},
    {"start": at("s100"), "end": at("s112"), "mood": "tension", "intensity": 0.55},
    {"start": at("s112"), "end": at("s114"), "mood": "epic", "intensity": 0.55},
    {"start": at("s114"), "end": at("s120"), "mood": "mystery", "intensity": 0.5},
    {"start": at("s120"), "end": at("s140"), "mood": "wonder", "intensity": 0.45},
    {"start": at("s140"), "end": END, "mood": "hopeful", "intensity": 0.45},
]
AMB = {"CAFE": ("murmur", -33), "CLASS": ("roomtone", -32), "GYM": ("murmur", -34), "HALL": ("murmur", -34), "STREET": ("city", -33), "STREETN": ("wind", -34), "BUS": ("roomtone", -30),
       "KITCHEN": ("roomtone", -31), "OFFICE": ("roomtone", -32), "TOWERN": ("wind", -32), "CLOCK": ("hum", -33), "TROOM": ("wind", -34)}
EV = {
    "s008": [(0.3, "stinger", -14, 1.0)], "s009": [(0.4, "powerup", -14, 1.0)], "s011": [(0.9, "glitch", -14, 1.0)], "s014": [(1.0, "swish", -14, 1.0)], "s018": [(0.8, "buzz", -20, 1.0), (1.8, "buzz", -20, 1.0)],
    "s024": [(0.9, "ding", -12, 1.0), (1.6, "ding", -12, 1.2), (2.3, "ding", -12, 1.4)], "s029": [(0.9, "pop", -14, 1.0)], "s033": [(1.1, "swish", -14, 1.0), (1.6, "swish", -14, 1.0)], "s037": [(1.5, "tick", -14, 1.0), (3.2, "hit", -12, 1.0)],
    "s040": [(0.1, "whoosh", -14, 1.0)], "s044": [(1.2, "impact", -12, 1.0)], "s046": [(0.5, "tick", -16, 1.0), (1.0, "tick", -16, 1.0), (1.5, "tick", -16, 1.0), (2.0, "tick", -16, 1.0)], "s047": [(0.3, "counter", -14, 1.0)],
    "s049": [(0.8, "heartbeat", -18, 1.0)], "s051": [(0.2, "stinger", -14, 1.0)], "s052": [(0.2, "cheer", -16, 1.2)], "s056": [(0.3, "whistle", -16, 1.0)], "s058": [(0.5, "tick", -14, 1.0), (1.2, "tick", -14, 1.0), (1.9, "tick", -14, 1.0), (2.6, "tick", -14, 1.0), (3.3, "tick", -14, 1.0), (4.0, "tick", -14, 1.0)],
    "s061": [(6.9, "ding", -10, 1.2)], "s065": [(0.2, "pop", -14, 1.0)], "s069": [(0.3, "impact", -12, 1.0)], "s070": [(0.1, "cheer", -14, 1.0), (0.2, "applause", -18, 1.0)], "s073": [(0.9, "pop", -14, 1.0)],
    "s077": [(0.5, "buzz", -18, 1.0), (1.6, "buzz", -18, 1.2)], "s082": [(1.0, "ding", -14, 1.0), (1.85, "ding", -14, 1.1), (2.7, "ding", -14, 1.2), (3.55, "ding", -14, 1.3), (4.4, "ding", -14, 1.4)],
    "s085": [(2.1, "ding", -12, 1.2)], "s086": [(0.7, "tick", -14, 1.0)], "s087": [(0.1, "carpass", -12, 1.0)], "s091": [(0.4, "applause", -18, 1.0)], "s094": [(0.4, "powerup", -14, 1.0)], "s096": [(0.6, "impact", -12, 1.0)],
    "s102": [(0.6, "footstep", -16, 1.0), (1.2, "footstep", -16, 1.0), (1.8, "footstep", -16, 1.0), (2.4, "footstep", -16, 1.0), (3.0, "footstep", -16, 1.0)], "s104": [(1.2, "tick", -10, 1.0)], "s109": [(0.3, "tick", -16, 1.4)],
    "s111": [(1.6, "tick", -10, 1.0)], "s112": [(6.7, "impact", -8, 0.7), (6.8, "shimmer", -12, 1.0)], "s116": [(0.5, "whoosh", -14, 1.0)], "s125": [(0.4, "whoosh", -16, 1.0)], "s130": [(2.8, "swish", -12, 1.0)],
    "s138": [(0.3, "cheer", -18, 1.0)], "s144": [(0.2, "phonering", -12, 1.0), (4.0, "ding", -12, 1.0)],
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
