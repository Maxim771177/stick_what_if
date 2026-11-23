#!/usr/bin/env python3
"""Ролик 10: звуковой план. Дописывает в story/shots.json music, sfx (по надписям и событиям), amb (по месту).
Запуск ПОСЛЕ build_storyboard.py:  python3 projects/what-if-see-everyones-iq/tools/build_sound.py"""
import json, os
PROJ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
st = json.load(open(os.path.join(PROJ, "story", "shots.json"), encoding="utf-8"))
tx = json.load(open(os.path.join(PROJ, "story", "texts.json"), encoding="utf-8"))
shots = st["shots"]; END = shots[-1]["end"]
T = {s["id"]: s for s in shots}
def at(i): return T[i]["start"]
MU = [("s001", "s007", "playful", 0.4), ("s007", "s014", "wonder", 0.5), ("s014", "s022", "playful", 0.5), ("s022", "s031", "playful", 0.55), ("s031", "s041", "tension", 0.45),
      ("s041", "s053", "mystery", 0.5), ("s053", "s063", "tension", 0.55), ("s063", "s070", "mystery", 0.45), ("s070", "s078", "playful", 0.5), ("s078", "s090", "hopeful", 0.5),
      ("s090", "s102", "epic", 0.6), ("s102", "s109", "triumph", 0.65), ("s109", "s116", "hopeful", 0.5), ("s116", None, "wonder", 0.5)]
st["music"] = [{"start": at(a), "end": (at(b) if b else END), "mood": m, "intensity": i} for a, b, m, i in MU]
AMB = {"CLASS": ("roomtone", -32), "HALL": ("murmur", -34), "CAFE": ("murmur", -33), "KITCHEN": ("roomtone", -31), "HOME": ("roomtone", -32), "BUS": ("roomtone", -30), "PARK": ("wind", -34), "SHOP": ("city", -33), "LIB": ("roomtone", -34), "GYM": ("murmur", -33)}
def ticks(*ts, g=-14): return [(x, "tick", g, 1.0) for x in ts]
EV = {
    "s003": [(0.6, "pop", -12, 1.0)], "s004": [(0.6, "swish", -14, 1.0)], "s005": [(0.6, "buzz", -16, 1.0)], "s006": [(0.3, "blip", -18, 1.0)],
    "s008": [(0.4, "shimmer", -14, 1.0)], "s009": [(0.2, "powerup", -12, 1.0)], "s014": [(0.5, "swish", -14, 1.0), (1.1, "swish", -14, 1.2)],
    "s016": [(0.5, "counter", -14, 1.0)], "s018": [(1.4, "buzz", -18, 1.0), (2.2, "buzz", -18, 1.0)], "s019": [(0.8, "swish", -14, 1.0), (1.9, "hit", -14, 1.0)],
    "s020": [(0.5, "counter", -14, 1.0), (4.6, "ding", -12, 1.2)], "s022": [(1.4, "swish", -14, 1.0)], "s024": [(0.4, "whoosh", -14, 1.0)], "s026": [(1.4, "ding", -12, 1.0), (3.1, "swish", -14, 1.0)],
    "s028": [(0.3, "swish", -14, 1.0)], "s030": [(0.2, "carpass", -10, 1.0), (2.5, "hit", -14, 0.8)], "s035": [(0.6, "ding", -14, 0.8)], "s038": [(0.3, "buzz", -16, 1.0)],
    "s040": [(0.9, "pop", -14, 1.0)], "s044": [(0.6, "swish", -14, 1.0)], "s046": ticks(0.5, 1.0, 1.5, 2.0, g=-16), "s047": [(1.9, "ding", -12, 1.0)], "s052": [(0.4, "counter", -14, 1.0), (1.3, "ding", -12, 1.2)],
    "s053": [(0.6, "swish", -14, 1.0), (1.8, "swish", -14, 1.0), (3.0, "swish", -14, 1.0)], "s056": [(0.5, "pop", -12, 1.0), (3.5, "buzz", -14, 1.0)], "s057": [(1.2, "whoosh", -16, 1.0)],
    "s059": [(0.4, "impact", -10, 0.9)], "s061": [(0.8, "glitch", -16, 1.0)], "s063": [(0.3, "swish", -14, 1.0)], "s064": [(0.6, "counter", -14, 1.0)], "s065": [(1.3, "impact", -10, 0.9), (1.9, "impact", -10, 0.8)],
    "s066": [(0.5, "ding", -12, 1.0), (0.6, "shimmer", -12, 1.0)], "s067": [(0.6, "buzz", -14, 1.0)], "s070": [(0.2, "ding", -14, 1.0), (0.5, "ding", -14, 1.0), (0.8, "ding", -14, 1.0)],
    "s072": [(0.6, "counter", -14, 1.0)], "s076": ticks(0.5, 1.1, 1.7, 2.3, 2.9, g=-14), "s078": ticks(0.4, 0.6, 0.8, 1.0, 1.2, g=-16) + [(1.7, "buzz", -14, 1.0)], "s080": ticks(0.4, 0.6, 0.8, 1.0, 1.2, g=-16) + [(1.7, "buzz", -14, 1.0)],
    "s081": ticks(0.3, 0.5, 0.7, 0.9, 1.1, g=-16) + [(1.6, "buzz", -14, 1.2)], "s083": [(0.3, "counter", -14, 1.0), (7.6, "buzz", -14, 1.0)], "s087": [(0.2, "powerup", -14, 1.0), (1.3, "pop", -8, 1.0), (1.35, "impact", -12, 0.8)],
    "s088": [(0.1, "cheer", -14, 1.0)], "s093": ticks(0.4, 0.8, 1.2, 1.6, 2.0, g=-14), "s094": ticks(0.5, 1.2, 1.9, 2.6, 3.3, 4.0, g=-14), "s095": [(0.5, "whoosh", -12, 1.0)], "s096": [(0.2, "whoosh", -14, 1.0)],
    "s097": [(0.3, "glitch", -14, 1.0)], "s098": ticks(0.5, 0.9, 1.3, 1.7, 2.1, g=-12), "s099": [(0.2, "whoosh", -12, 1.0)], "s100": [(0.2, "whoosh", -14, 1.0), (1.4, "swish", -14, 1.0)],
    "s101": [(0.3, "impact", -8, 0.6), (0.4, "shimmer", -10, 1.0)], "s103": [(0.9, "swish", -14, 1.0)], "s104": [(1.6, "ding", -12, 1.2), (3.6, "tick", -14, 1.0)], "s105": ticks(0.6, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, g=-12),
    "s106": [(0.3, "pop", -8, 1.0), (0.35, "impact", -12, 0.8), (1.0, "cheer", -12, 1.0), (1.1, "applause", -12, 1.0)], "s107": [(0.1, "applause", -14, 1.0)], "s109": [(0.5, "ding", -12, 1.0)], "s110": [(2.4, "glitch", -16, 1.0)],
    "s114": [(1.0, "ding", -12, 1.0), (1.8, "ding", -12, 1.2)], "s115": [(0.9, "ding", -12, 1.0), (1.7, "ding", -12, 1.1), (3.4, "shimmer", -12, 1.0)], "s117": [(0.3, "glitch", -14, 1.0)], "s118": [(0.9, "ding", -12, 1.0)], "s119": [(0.5, "shimmer", -12, 1.0)], "s120": [(0.3, "powerup", -14, 1.0)],
}
NUMEV = {"numon": ("powerup", -10, 1.0), "leonon": ("shimmer", -12, 1.0)}
KIND = {"cap": ("pop", -16, 1.0), "plate": ("hit", -11, 1.0), "say": ("blip", -20, 1.0), "card": ("pop", -14, 0.9)}
for sh in shots:
    sh["sfx"] = []
    a = AMB.get(sh["set"])
    if a: sh["amb"] = {"name": a[0], "gain": a[1]}
    else: sh.pop("amb", None)
    for r in tx:
        if sh["start"] - 0.02 <= r["t"] < sh["end"] - 0.05 and r["k"] in NUMEV:
            n, g, p = NUMEV[r["k"]]; sh["sfx"].append({"at": round(r["t"] - sh["start"], 2), "name": n, "gain": g, "pitch": p})
        if sh["start"] - 0.02 <= r["t"] < sh["end"] - 0.05 and r["k"] in KIND:
            n, g, p = KIND[r["k"]]
            sh["sfx"].append({"at": round(r["t"] - sh["start"], 2), "name": n, "gain": g, "pitch": p})
    for atx, n, g, p in EV.get(sh["id"], []):
        sh["sfx"].append({"at": atx, "name": n, "gain": g, "pitch": p})
    sh["sfx"].sort(key=lambda x: x["at"])
json.dump(st, open(os.path.join(PROJ, "story", "shots.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("music sections", len(st["music"]), "sfx total", sum(len(s["sfx"]) for s in shots))
