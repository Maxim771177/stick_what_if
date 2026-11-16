#!/usr/bin/env python3
"""Ролик 06: звуковой план. Дописывает в story/shots.json music (настроение по блокам), sfx (по надписям и событиям), amb (по месту).
Запуск ПОСЛЕ build_storyboard.py (он пересоздаёт shots.json без звука):  python3 projects/what-if-reflexes/tools/build_sound.py"""
import json, os
PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
st = json.load(open(os.path.join(PROJ, "story", "shots.json"), encoding="utf-8"))
tx = json.load(open(os.path.join(PROJ, "story", "texts.json"), encoding="utf-8"))
shots = st["shots"]; END = shots[-1]["end"]
T = {s["id"]: s for s in shots}
def at(i): return T[i]["start"]
st["music"] = [
    {"start": 0, "end": at("s017"), "mood": "mystery", "intensity": 0.4},
    {"start": at("s017"), "end": at("s031"), "mood": "wonder", "intensity": 0.35},
    {"start": at("s031"), "end": at("s047"), "mood": "playful", "intensity": 0.45},
    {"start": at("s047"), "end": at("s072"), "mood": "mystery", "intensity": 0.4},
    {"start": at("s072"), "end": at("s086"), "mood": "tension", "intensity": 0.35},
    {"start": at("s086"), "end": at("s099"), "mood": "tension", "intensity": 0.55},
    {"start": at("s099"), "end": at("s114"), "mood": "hopeful", "intensity": 0.45},
    {"start": at("s114"), "end": at("s120"), "mood": "wonder", "intensity": 0.4},
    {"start": at("s120"), "end": END, "mood": "mystery", "intensity": 0.4},
]
AMB = {"STREET": ("murmur", -34), "KITCHEN": ("roomtone", -31), "LIVING": ("roomtone", -32), "PARK": ("murmur", -33), "CLASS": ("roomtone", -32),
       "GARAGE": ("roomtone", -33), "GYM": ("murmur", -32), "NIGHT": ("roomtone", -32), "BUSSTOP": ("murmur", -34), "ALLEY": ("rain", -26)}
EV = {
    "s001": [(0.0, "whoosh", -16, 0.9)], "s005": [(0.5, "pop", -12, 1.0), (1.0, "ding", -14, 1.0)], "s007": [(3.0, "powerup", -12, 1.0)], "s008": [(0.0, "stinger", -14, 0.9)],
    "s013": [(0.2, "ding", -12, 1.1)], "s014": [(5.0, "riser", -16, 1.0), (6.4, "hit", -12, 0.9)], "s017": [(0.3, "powerup", -14, 1.0)], "s022": [(1.4, "hit", -16, 1.0), (2.6, "hit", -16, 1.0), (3.8, "hit", -16, 1.0)],
    "s033": [(1.0, "swish", -14, 1.0)], "s036": [(0.1, "ding", -12, 1.0), (0.4, "ding", -12, 1.1), (0.7, "ding", -12, 1.2)], "s044": [(1.8, "pop", -12, 1.0)],
    "s057": [(0.0, "heartbeat", -22, 1.0)], "s062": [(2.5, "swish", -16, 1.0)], "s063": [(0.0, "stinger", -14, 1.0), (1.4, "hit", -14, 0.8), (3.0, "hit", -14, 0.7)],
    "s070": [(4.5, "powerup", -16, 1.0)], "s075": [(0.5, "riser", -18, 1.0), (4.2, "stinger", -14, 1.0)], "s085": [(0.5, "heartbeat", -22, 1.0)],
    "s088": [(0.0, "riser", -18, 0.9)], "s090": [(0.0, "stinger", -14, 1.0), (1.2, "hit", -12, 0.9), (2.6, "hit", -12, 0.8)], "s091": [(0.9, "hit", -14, 0.8), (1.8, "hit", -14, 0.7)],
    "s092": [(0.9, "pop", -10, 1.0), (1.0, "swish", -12, 1.0)], "s094": [(0.4, "whoosh", -10, 1.2)], "s095": [(0.5, "stinger", -14, 1.0)], "s096": [(2.4, "hit", -14, 0.8)],
    "s105": [(0.6, "swish", -16, 1.0)], "s106": [(2.0, "ding", -12, 1.1)], "s111": [(0.6, "riser", -16, 1.0)], "s112": [(0.0, "powerup", -12, 1.0), (0.3, "ding", -10, 1.2)],
    "s121": [(1.4, "swish", -16, 1.0)], "s122": [(0.2, "stinger", -14, 1.0)], "s126": [(1.2, "pop", -10, 1.0)], "s127": [(0.0, "heartbeat", -24, 1.0)],
}
KIND = {"cap": ("pop", -16, 1.0), "plate": ("hit", -11, 1.0), "say": ("blip", -20, 1.0), "card": ("pop", -14, 0.9)}
for sh in shots:
    sh["sfx"] = []
    a = AMB.get(sh["set"])
    if a: sh["amb"] = {"name": a[0], "gain": a[1]}
    else: sh.pop("amb", None)
    if sh["id"] in ("s086", "s087"): sh["amb"] = {"name": "rain", "gain": -26}
    for r in tx:
        if sh["start"] - 0.02 <= r["t"] < sh["end"] - 0.05 and r["k"] in KIND:
            n, g, p = KIND[r["k"]]
            sh["sfx"].append({"at": round(r["t"] - sh["start"], 2), "name": n, "gain": g, "pitch": p})
    for atx, n, g, p in EV.get(sh["id"], []):
        sh["sfx"].append({"at": atx, "name": n, "gain": g, "pitch": p})
    sh["sfx"].sort(key=lambda x: x["at"])
json.dump(st, open(os.path.join(PROJ, "story", "shots.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("music sections", len(st["music"]), "sfx total", sum(len(s["sfx"]) for s in shots))
