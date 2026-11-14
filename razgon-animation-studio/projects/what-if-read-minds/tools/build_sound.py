#!/usr/bin/env python3
"""Ролик 04: звуковой план (/video-sound). Дописывает в story/shots.json: music (настроение по дням), sfx (по надписям и событиям), amb (атмосфера по месту).
Запуск ПОСЛЕ build_story.py (тот пересоздаёт shots.json без звука):  python3 projects/what-if-read-minds/tools/build_sound.py
Музыки немного: интенсивность низкая, общий уровень в config.json (music.gainDb)."""
import json, os

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
st = json.load(open(os.path.join(PROJ, "story", "shots.json"), encoding="utf-8"))
tx = json.load(open(os.path.join(PROJ, "story", "texts.json"), encoding="utf-8"))
shots = st["shots"]; END = shots[-1]["end"]

st["music"] = [
    {"start": 0, "end": 30.2, "mood": "playful", "intensity": 0.35},
    {"start": 30.2, "end": 73.6, "mood": "mystery", "intensity": 0.3},
    {"start": 73.6, "end": 128.6, "mood": "playful", "intensity": 0.4},
    {"start": 128.6, "end": 168.4, "mood": "wonder", "intensity": 0.35},
    {"start": 168.4, "end": 227.5, "mood": "playful", "intensity": 0.35},
    {"start": 227.5, "end": 296.7, "mood": "sad", "intensity": 0.35},
    {"start": 296.7, "end": 355.9, "mood": "tension", "intensity": 0.45},
    {"start": 355.9, "end": 396.8, "mood": "hopeful", "intensity": 0.4},
    {"start": 396.8, "end": 436.6, "mood": "playful", "intensity": 0.45},
    {"start": 436.6, "end": 467.7, "mood": "sad", "intensity": 0.3},
    {"start": 467.7, "end": END, "mood": "wonder", "intensity": 0.35},
]

AMB = {"HALL": ("murmur", -33), "CAFE": ("murmur", -31), "GYM": ("murmur", -33), "CLASS": ("roomtone", -32), "KITCHEN": ("roomtone", -31),
       "NIGHT": ("roomtone", -32), "KITCHENNIGHT": ("roomtone", -32), "LIVING": ("roomtone", -32), "GYMDANCE": ("murmur", -32)}
EV = {  # id -> [(секунда от начала кадра, имя, gain, pitch)]
    "s001": [(0.3, "ding", -14, 1.0)], "s010": [(0.0, "riser", -18, 1.0)], "s015": [(1.0, "shimmer", -16, 1.0)],
    "s028": [(0.0, "whoosh", -14, 0.9)], "s044": [(0.3, "whistle", -18, 1.0)], "s045": [(0.4, "cheer", -20, 1.0)],
    "s048": [(0.3, "hit", -10, 0.8)], "s053": [(0.0, "whoosh", -14, 0.9)], "s055": [(1.0, "powerup", -16, 1.0)],
    "s063": [(2.7, "pop", -12, 0.9)], "s069": [(0.0, "clock", -22, 1.0)], "s070": [(0.0, "riser", -16, 0.8)],
    "s073": [(2.3, "pop", -12, 0.8)], "s086": [(2.4, "pop", -12, 0.9)], "s088": [(0.2, "clock", -22, 1.0)],
    "s089": [(0.5, "stinger", -14, 1.0)], "s090": [(0.0, "heartbeat", -16, 1.0)], "s091": [(0.3, "shimmer", -15, 1.0)],
    "s106": [(0.0, "whoosh", -14, 1.0)], "s113": [(0.0, "applause", -26, 1.0)], "s125": [(0.0, "clock", -22, 0.9)],
    "s132": [(0.0, "whoosh", -16, 0.8)], "s137": [(3.0, "ding", -12, 1.1)], "s139": [(3.0, "pop", -10, 0.9)],
}
KIND = {"cap": ("pop", -16, 1.0), "plate": ("hit", -11, 1.0), "say": ("blip", -20, 1.0), "day": ("ding", -14, 1.2), "card": ("pop", -14, 0.9)}

for sh in shots:
    sh["sfx"] = []
    a = AMB.get(sh["set"])
    if a: sh["amb"] = {"name": a[0], "gain": a[1]}
    else: sh.pop("amb", None)
    for r in tx:
        if sh["start"] - 0.02 <= r["t"] < sh["end"] - 0.05 and r["k"] in KIND:
            n, g, p = KIND[r["k"]]
            sh["sfx"].append({"at": round(r["t"] - sh["start"], 2), "name": n, "gain": g, "pitch": p})
    for at, n, g, p in EV.get(sh["id"], []):
        sh["sfx"].append({"at": at, "name": n, "gain": g, "pitch": p})
    sh["sfx"].sort(key=lambda x: x["at"])
json.dump(st, open(os.path.join(PROJ, "story", "shots.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("music sections", len(st["music"]), "sfx total", sum(len(s["sfx"]) for s in shots))
