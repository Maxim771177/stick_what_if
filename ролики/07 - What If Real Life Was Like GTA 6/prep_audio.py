# -*- coding: utf-8 -*-
"""Сокращение озвучки ролика 07 до 9:00 итога: режет 4 фразы по паузам (озвучка.mp3 не трогаем).
Пишет озвучка-сокращённая.mp3, сценарий-сокращённый.txt, тайминги-слов-сокращённые.json, проектный input/voiceover.mp3 (×1,2 + хвост 2,5 с)."""
import json, os, subprocess, re
HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.abspath(os.path.join(HERE, '..', '..', 'razgon-animation-studio', 'projects', 'what-if-gta-life'))
W = json.load(open(os.path.join(PROJ, 'timeline', 'words.json'), encoding='utf-8'))['words']
nrm = lambda t: t.lower().strip('.,"“”')
toks = [nrm(w['word']) for w in W]
def find(ph):
    p = [nrm(x) for x in ph.split()]
    for i in range(len(toks) - len(p)):
        if toks[i:i + len(p)] == p: return i, len(p)
CUTS = [('The neighbors\' sprinklers are now pointed at it, just in case.', None), ('Kids line up at the gate with notebooks.', "Someone has already printed shirts that say, Leon, level one."),
        ('Rusted signs creak.', "playing a slow, broken version of the park's song."), ('The rival drops flares.', None)]
segs = []
for a, b in CUTS:
    i, n = find(a); j = i + n
    if b: k, m = find(b); j = k + m
    segs.append((i, j))
segs.sort()
def mid(i): return (W[i - 1]['end'] + W[i]['start']) / 2
keep = []; prev_t = 0.0; prev_i = 0; cum = 0.0; words = []
cutT = [(mid(i), mid(j)) for i, j in segs]
total = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(HERE, 'озвучка.mp3')]).decode())
pieces = []; t0 = 0.0
for s, e in cutT: pieces.append((t0, s)); t0 = e
pieces.append((t0, total))
fc = ''.join(f'[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={max(0, b - a - 0.02):.3f}:d=0.02[p{i}];' for i, (a, b) in enumerate(pieces))
fc += ''.join(f'[p{i}]' for i in range(len(pieces))) + f'concat=n={len(pieces)}:v=0:a=1[o]'
short = os.path.join(HERE, 'озвучка-сокращённая.mp3')
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', '-i', os.path.join(HERE, 'озвучка.mp3'), '-filter_complex', fc, '-map', '[o]', '-b:a', '192k', short])
# слова: убрать вырезанные, сдвинуть
out = []; shift = 0.0; ci = 0
kept_tokens = []
orig = open(os.path.join(HERE, 'сценарий.txt'), encoding='utf-8').read().split()
assert len(orig) == len(W)
for idx, w in enumerate(W):
    cut = next((c for c, (i, j) in enumerate(segs) if i <= idx < j), None)
    if cut is not None: continue
    sh = sum(cutT[c][1] - cutT[c][0] for c, (i, j) in enumerate(segs) if j <= idx)
    out.append({'word': w['word'], 'start': round(w['start'] - sh, 3), 'end': round(w['end'] - sh, 3)}); kept_tokens.append(orig[idx])
json.dump({'source': 'whisper:small.en+script, после сокращений', 'words': out}, open(os.path.join(HERE, 'тайминги-слов-сокращённые.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
# сценарий-сокращённый по абзацам оригинала
paras = open(os.path.join(HERE, 'сценарий.txt'), encoding='utf-8').read().split('\n\n'); res = []; idx = 0; dropped = set(k for i, j in segs for k in range(i, j))
for p in paras:
    n = len(p.split()); res.append(' '.join(orig[k] for k in range(idx, idx + n) if k not in dropped)); idx += n
open(os.path.join(HERE, 'сценарий-сокращённый.txt'), 'w', encoding='utf-8').write('\n\n'.join(res) + '\n')
d = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', short]).decode())
vo = os.path.join(PROJ, 'input', 'voiceover.mp3')
subprocess.check_call(['ffmpeg', '-y', '-loglevel', 'error', '-i', short, '-filter:a', 'atempo=1.2,apad=pad_dur=2.5', '-b:a', '192k', vo])
print(f'озвучка {total:.1f} -> {d:.1f} с; итог {d / 1.2 + 2.5:.1f} с; слов {len(out)}')
