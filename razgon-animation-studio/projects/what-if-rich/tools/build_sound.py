#!/usr/bin/env python3
"""Ролик 05: звуковой план. Дописывает в story/shots.json music (настроение по блокам), sfx (по надписям и событиям), amb (по месту).
Запуск ПОСЛЕ build_storyboard.py (он пересоздаёт shots.json без звука):  python3 projects/what-if-reflexes/tools/build_sound.py"""
import json, os
PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
st = json.load(open(os.path.join(PROJ, "story", "shots.json"), encoding="utf-8"))
tx = json.load(open(os.path.join(PROJ, "story", "texts.json"), encoding="utf-8"))
shots = st["shots"]; END = shots[-1]["end"]
T = {s["id"]: s for s in shots}
def at(i): return T[i]["start"]
st["music"] = [
    {"start": 0, "end": at("s014"), "mood": "tension", "intensity": 0.4},
    {"start": at("s014"), "end": at("s031"), "mood": "wonder", "intensity": 0.35},
    {"start": at("s031"), "end": at("s050"), "mood": "playful", "intensity": 0.45},
    {"start": at("s050"), "end": at("s069"), "mood": "mystery", "intensity": 0.35},
    {"start": at("s069"), "end": at("s080"), "mood": "tension", "intensity": 0.4},
    {"start": at("s080"), "end": at("s093"), "mood": "playful", "intensity": 0.4},
    {"start": at("s093"), "end": at("s099"), "mood": "mystery", "intensity": 0.4},
    {"start": at("s099"), "end": at("s111"), "mood": "tension", "intensity": 0.55},
    {"start": at("s111"), "end": at("s120"), "mood": "hopeful", "intensity": 0.4},
    {"start": at("s120"), "end": END, "mood": "wonder", "intensity": 0.35},
]
AMB = {"GYM": ("murmur", -33), "CAFE": ("murmur", -31), "CLASS": ("roomtone", -32), "KITCHEN": ("roomtone", -31), "LIVING": ("roomtone", -32),
       "FAIR": ("murmur", -31), "NIGHT": ("roomtone", -32)}
EV = {
    "s004": [(0.0, "whistle", -14, 1.0), (0.3, "whoosh", -12, 0.9)], "s008": [(1.1, "pop", -10, 0.9)], "s009": [(0.2, "hit", -10, 0.8), (0.4, "hit", -12, 0.9), (0.6, "hit", -12, 1.0)],
    "s011": [(0.0, "heartbeat", -24, 1.0)], "s014": [(0.0, "slowmo", -14, 1.0)], "s018": [(0.3, "powerup", -14, 1.0)], "s021": [(0.2, "tick", -18, 1.0), (0.7, "tick", -18, 1.1), (1.2, "tick", -18, 1.2), (1.7, "tick", -18, 1.3)],
    "s027": [(0.7, "swish", -14, 1.0)], "s029": [(0.5, "pop", -10, 1.2)], "s032": [(0.5, "whoosh", -14, 1.0)], "s035": [(0.2, "swish", -14, 1.0), (0.9, "pop", -12, 1.0)],
    "s038": [(0.2, "pop", -18, 1.2), (0.8, "pop", -18, 1.0)], "s039": [(0.2, "hit", -14, 1.2), (0.6, "hit", -14, 1.1), (1.0, "hit", -14, 1.0)], "s040": [(1.0, "powerup", -14, 1.0)],
    "s042": [(1.0, "hit", -12, 0.8)], "s046": [(0.5, "swish", -14, 1.0), (1.0, "swish", -14, 1.1)], "s055": [(0.0, "tick", -20, 1.0)],
    "s057": [(0.8, "riser", -16, 1.0)], "s060": [(0.0, "stinger", -16, 1.0)], "s061": [(1.2, "stinger", -16, 0.9)], "s063": [(0.0, "clock", -22, 1.0)], "s067": [(0.0, "clock", -22, 1.2)],
    "s072": [(0.8, "slowmo", -16, 1.0)], "s073": [(1.2, "heartbeat", -18, 0.8)], "s082": [(0.1, "hit", -8, 1.3), (0.2, "whoosh", -12, 1.2)], "s084": [(0.2, "whistle", -12, 1.0)],
    "s087": [(5.2, "stinger", -14, 1.0), (8.2, "hit", -10, 0.9)], "s090": [(1.6, "whoosh", -14, 0.9)], "s095": [(1.5, "pop", -12, 1.0)], "s097": [(0.5, "whoosh", -14, 0.8)],
    "s099": [(0.0, "riser", -16, 0.9)], "s105": [(0.9, "whoosh", -10, 1.2)], "s106": [(0.0, "whoosh", -12, 1.1), (0.6, "hit", -10, 1.0), (1.15, "hit", -10, 0.9)], "s107": [(0.0, "impact", -8, 0.9)],
    "s111": [(2.2, "pop", -14, 1.0)], "s114": [(2.6, "stinger", -14, 1.0)], "s115": [(1.7, "stinger", -14, 0.9)], "s119": [(1.0, "ding", -12, 1.0), (4.6, "powerup", -14, 1.0)],
    "s121": [(0.6, "swish", -14, 1.1), (3.4, "swish", -14, 1.2), (6.2, "swish", -14, 1.3)], "s123": [(3.0, "ding", -12, 1.1)], "s126": [(3.4, "ding", -10, 1.2), (3.5, "applause", -24, 1.0)],
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
