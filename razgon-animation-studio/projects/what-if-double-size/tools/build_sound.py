#!/usr/bin/env python3
"""Ролик 03: звуковой план (/video-sound). Дописывает в story/shots.json: music (настроение по главам), sfx (по строкам текста на экране
и по событиям), amb (атмосфера по месту). Запуск ПОСЛЕ build_story.py (тот пересоздаёт shots.json без звука):
  python3 projects/what-if-double-size/tools/build_sound.py
Космос (S102–S137): воздуха нет, атмосферы нет; тишина здесь — смысл сцены."""
import json, os

PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
st = json.load(open(os.path.join(PROJ, "story", "shots.json"), encoding="utf-8"))
tx = json.load(open(os.path.join(PROJ, "story", "texts.json"), encoding="utf-8"))
shots = st["shots"]
END = shots[-1]["end"]

# музыка по главам (секунды итогового ролика)
st["music"] = [
    {"start": 0, "end": 43.5, "mood": "playful", "intensity": 0.45},
    {"start": 43.5, "end": 117.7, "mood": "wonder", "intensity": 0.45},
    {"start": 117.7, "end": 209.0, "mood": "playful", "intensity": 0.5},
    {"start": 209.0, "end": 335.4, "mood": "tension", "intensity": 0.6},
    {"start": 335.4, "end": 392.2, "mood": "wonder", "intensity": 0.5},
    {"start": 392.2, "end": 450.0, "mood": "mystery", "intensity": 0.4},
    {"start": 450.0, "end": 520.0, "mood": "hopeful", "intensity": 0.5},
    {"start": 520.0, "end": END, "mood": "mystery", "intensity": 0.42},
]

AMB = {"PARK": ("murmur", -30), "STREET": ("city", -31), "FIELD": ("wind", -32), "SKY": ("wind", -27), "AERIAL": ("wind", -30), "COURT": ("murmur", -30),
       "ROOF": ("wind", -32), "KITCHEN": ("roomtone", -28), "YARD": ("wind", -34), "NIGHT": ("city", -31), "COCKPIT": ("hum", -27)}
# событийные звуки: id -> [(секунда от начала кадра, имя, gain, pitch)]
EV = {
    "s001": [(0.3, "ding", -12, 0.8), (0.3, "ding", -14, 1.0)], "s004": [(1.2, "whoosh", -12, 1.0), (1.5, "powerup", -10, 1.0)],
    "s008": [(0.2, "riser", -16, 1.0)], "s010": [(0.0, "clock", -18, 1.0), (4.5, "whoosh", -14, 0.8)], "s011": [(2.2, "impact", -14, 1.0)],
    "s013": [(0.4, "swish", -12, 1.0)], "s020": [(3.0, "glitch", -12, 1.0)], "s021": [(3.0, "hit", -8, 1.0)], "s027": [(1.3, "swish", -10, 1.0), (1.3, "hit", -14, 1.0)],
    "s032": [(2.4, "pop", -12, 0.8)], "s034": [(0.0, "footstep", -14, 0.8)], "s038": [(0.5, "footstep", -10, 0.7), (2.3, "footstep", -10, 0.7)],
    "s040": [(2.0, "whoosh", -16, 0.8)], "s055": [(1.0, "footstep", -9, 0.6), (2.4, "whoosh", -14, 0.7)], "s062": [(1.0, "hit", -8, 0.6)],
    "s063": [(2.2, "hit", -9, 0.8)], "s065": [(1.6, "footstep", -10, 0.6), (2.6, "hit", -12, 0.7)], "s070": [(0.0, "riser", -12, 1.0)],
    "s073": [(0.2, "counter", -16, 1.0)], "s078": [(0.2, "counter", -16, 0.9)], "s083": [(0.0, "riser", -18, 0.7)], "s087": [(0.0, "riser", -14, 1.0), (4.1, "whoosh", -16, 0.8)],
    "s090": [(3.0, "whoosh", -16, 1.0)], "s096": [(0.5, "carpass", -16, 1.0)], "s099": [(1.4, "whoosh", -12, 1.0)],
    "s102": [(0.0, "stinger", -12, 1.0)], "s107": [(1.2, "hit", -9, 0.6)], "s111": [(0.0, "shimmer", -14, 1.0)],
    "s116": [(1.4, "blip", -12, 0.7), (1.75, "blip", -12, 1.0)], "s117": [(0.0, "blip", -12, 0.7), (0.8, "blip", -12, 1.1), (1.6, "blip", -12, 0.7), (2.4, "blip", -12, 1.1)],
    "s118": [(0.9, "blip", -12, 1.0), (1.7, "blip", -12, 1.2), (2.5, "blip", -12, 1.4)], "s119": [(1.0, "pop", -10, 0.8), (1.8, "whoosh", -16, 1.0)],
    "s121": [(0.4, "whoosh", -16, 0.7)], "s122": [(0.4, "whoosh", -18, 0.6)], "s125": [(0.4, "applause", -18, 1.0), (2.0, "whoosh", -14, 0.8)],
    "s127": [(1.1, "ding", -12, 1.0)], "s134": [(0.3, "whoosh", -16, 0.6)], "s137": [(3.0, "pop", -8, 1.0), (3.1, "ding", -10, 1.2)],
}
KIND = {"cap": ("pop", -14, 1.0), "plate": ("hit", -9, 1.0), "say": ("blip", -17, 1.0), "hudtick": ("ding", -13, 1.3), "hud": ("tick", -22, 1.0)}

for sh in shots:
    sh["sfx"] = []
    a = AMB.get(sh["set"])
    if a:
        sh["amb"] = {"name": a[0], "gain": a[1]}
    else:
        sh.pop("amb", None)
    for r in tx:
        if sh["start"] - 0.02 <= r["t"] < sh["end"] - 0.05 and r["k"] in KIND:
            n, g, p = KIND[r["k"]]
            sh["sfx"].append({"at": round(r["t"] - sh["start"], 2), "name": n, "gain": g, "pitch": p})
    for at, n, g, p in EV.get(sh["id"], []):
        sh["sfx"].append({"at": at, "name": n, "gain": g, "pitch": p})
    sh["sfx"].sort(key=lambda x: x["at"])
json.dump(st, open(os.path.join(PROJ, "story", "shots.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("sfx cues", sum(len(s["sfx"]) for s in shots), "amb shots", sum(1 for s in shots if s.get("amb")))
