#!/usr/bin/env python3
"""Ролик 11: звуковой план. Дописывает в story/shots.json music, sfx (по надписям и событиям), amb (по месту).
Запуск ПОСЛЕ build_storyboard.py:  python3 projects/what-if-3-tons-punch/tools/build_sound.py"""
import json, os
PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
st = json.load(open(os.path.join(PROJ, "story", "shots.json"), encoding="utf-8"))
tx = json.load(open(os.path.join(PROJ, "story", "texts.json"), encoding="utf-8"))
shots = st["shots"]; END = shots[-1]["end"]
T = {s["id"]: s for s in shots}
def at(i): return T[i]["start"]
MU = [("s001", "s008", "playful", 0.45), ("s008", "s014", "wonder", 0.55), ("s014", "s031", "playful", 0.45), ("s031", "s043", "playful", 0.55), ("s043", "s059", "wonder", 0.5),
      ("s059", "s075", "playful", 0.5), ("s075", "s094", "tension", 0.5), ("s094", "s111", "tension", 0.6), ("s111", "s131", "epic", 0.6), ("s131", "s136", "triumph", 0.65),
      ("s136", "s148", "hopeful", 0.5), ("s148", "s154", "mystery", 0.5), ("s154", None, "wonder", 0.5)]
st["music"] = [{"start": at(a), "end": (at(b) if b else END), "mood": m, "intensity": i} for a, b, m, i in MU]
AMB = {"FAIR": ("murmur", -33), "VOID": None, "KITCHEN": ("roomtone", -31), "KITCHEN_N": ("roomtone", -32), "ROOM": ("roomtone", -33), "HALL": ("murmur", -34), "GYM": ("murmur", -33),
       "SHED": ("wind", -34), "CAMP": ("wind", -34), "ARCADE": ("hum", -34), "LAB": ("hum", -35), "YARD": ("wind", -35)}
def ticks(*ts, g=-14): return [(x, "tick", g, 1.0) for x in ts]
EV = {
    "s004": [(1.35, "impact", -10, 0.9), (1.55, "counter", -14, 1.0)], "s005": [(1.2, "impact", -10, 0.9), (1.5, "counter", -14, 1.0), (3.1, "cheer", -16, 1.0)],
    "s008": [(1.35, "impact", -6, 0.6), (1.5, "counter", -13, 1.0)], "s009": [(0.1, "whoosh", -8, 1.0)], "s010": [(0.3, "whoosh", -10, 1.1)],
    "s011": [(0.4, "impact", -8, 0.9), (0.55, "swish", -12, 0.8), (1.0, "pop", -8, 0.7)], "s012": [(0.2, "counter", -14, 1.0), (3.2, "buzz", -12, 1.0), (5.4, "glitch", -14, 1.0)],
    "s014": [(0.3, "powerup", -12, 1.0)], "s020": [(1.2, "impact", -8, 0.7)], "s021": [(0.5, "impact", -12, 0.7), (1.4, "impact", -12, 0.8)], "s022": [(2.0, "impact", -10, 0.9), (4.8, "impact", -10, 0.9)],
    "s024": [(0.5, "powerup", -12, 1.0)], "s028": [(1.0, "ding", -12, 1.0), (1.6, "ding", -12, 1.2)], "s031": [(0.2, "stinger", -12, 1.0)],
    "s032": ticks(0.3, 0.9, 1.5, 2.1, 2.7, 3.3, g=-12), "s033": [(0.8, "pop", -10, 1.2), (0.85, "swish", -12, 1.0)], "s035": [(0.8, "impact", -10, 1.0)], "s036": [(1.0, "ding", -12, 1.0)],
    "s037": ticks(0.2, 0.5, 0.8, 1.1, 1.4, 1.7, 2.0, 2.3, 2.6, g=-14), "s038": [(1.3, "impact", -8, 0.8), (1.7, "whoosh", -10, 1.0), (3.6, "ding", -12, 1.5)], "s039": [(1.6, "cheer", -14, 1.0)],
    "s047": [(0.1, "impact", -8, 0.7)], "s049": [(0.4, "whoosh", -8, 1.0), (3.9, "impact", -10, 0.8)], "s050": [(0.1, "pop", -12, 1.0)],
    "s058": [(1.5, "impact", -8, 0.6), (2.6, "impact", -14, 1.2)], "s062": [(0.3, "impact", -14, 1.0), (0.6, "whoosh", -14, 1.0)], "s064": [(1.0, "pop", -8, 0.7)],
    "s069": [(1.0, "pop", -10, 0.8)], "s070": [(0.3, "pop", -10, 0.9), (0.7, "pop", -10, 0.8)], "s079": [(0.3, "impact", -6, 0.5)], "s080": [(0.3, "ding", -10, 0.7), (0.9, "ding", -12, 0.7)],
    "s085": [(1.5, "impact", -12, 0.9)], "s098": [(0.4, "impact", -6, 0.6)], "s099": [(0.5, "hit", -8, 1.0)], "s102": [(0.2, "riser", -16, 1.0)],
    "s122": [(0.5, "tick", -12, 1.0)], "s123": [(0.2, "ding", -12, 0.8)], "s125": [(1.0, "pop", -8, 1.3), (1.6, "ding", -12, 1.4)], "s127": [(0.5, "pop", -8, 1.3), (1.5, "pop", -8, 1.2)],
    "s129": [(0.5, "pop", -8, 1.3)], "s130": [(0.7, "impact", -10, 0.9)], "s131": [(1.3, "whoosh", -14, 0.6), (2.4, "riser", -16, 1.0)], "s133": [(0.1, "cheer", -18, 1.0)],
    "s137": [(0.2, "phonebuzz", -16, 1.0)], "s141": [(0.1, "powerup", -12, 1.0)], "s142": [(0.1, "counter", -14, 1.0)], "s145": [(1.0, "tick", -14, 1.0)], "s146": [(0.1, "ding", -12, 1.0)],
    "s149": ticks(0.2, 0.6, g=-16), "s150": [(0.3, "glitch", -14, 1.0)], "s153": [(0.2, "shimmer", -12, 1.0)], "s156": [(0.3, "pop", -10, 1.0)],
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
