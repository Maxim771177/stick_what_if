# -*- coding: utf-8 -*-
"""Раскадровка ролика 13 из scenes_data.py + тайминги-слов.json.
Выход: storyboard.md, manifest.csv, text_elements.md, паспорта-сцен.md, ассеты.md, сцены.json (данные для гибрид-шаблона).
Запуск:  python3 build_storyboard.py
Правка раскадровки = правка scenes_data.py и повторный запуск: тайминги пересчитываются сами."""
import json, os, re, subprocess, csv, collections
HERE = os.path.dirname(os.path.abspath(__file__))
SPEED, TAIL = 1.2, 2.5
LIMIT_LO, LIMIT_HI = 480.0, 540.0
def norm(t): return re.sub(r'[^a-z0-9]', '', t.lower().replace('’', "'"))
def mmss(t): m, s = divmod(max(0, t), 60); return f'{int(m):02d}:{s:04.1f}'
W = json.load(open(os.path.join(HERE, 'тайминги-слов.json'), encoding='utf-8'))['words']
AUDIO = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(HERE, 'озвучка.mp3')]).decode().strip())
script_text = open(os.path.join(HERE, 'сценарий.txt'), encoding='utf-8').read()
stoks = script_text.split(); assert len(stoks) == len(W), (len(stoks), len(W))
from scenes_data import SC, TITLE, HEROES, PLACES, HOOKS, RULES, LOGIC, FUN
pos = 0; starts = []
for i, sc in enumerate(SC):
    st = [norm(x) for x in sc['start'].split()]; found = None
    for p in range(pos + (1 if i else 0), len(stoks) - len(st) + 1):
        seg = [norm(x) for x in stoks[p:p + len(st)]]
        if seg[:-1] == st[:-1] and seg and seg[-1].startswith(st[-1]): found = p; break
    if found is None or (i == 0 and found != 0):
        raise SystemExit(f'Сцена {i + 1}: «{sc["start"]}» не найдена на позиции {pos} (нашлась {found}): …{" ".join(stoks[pos:pos + 8])}')
    starts.append(found); pos = found
for i, sc in enumerate(SC):
    sc['w0'] = starts[i]; sc['w1'] = starts[i + 1] if i + 1 < len(SC) else len(stoks)
    sc['text'] = ' '.join(stoks[sc['w0']:sc['w1']])
    sc['id'] = f'S{i + 1:03d}'
for i, sc in enumerate(SC):
    f = sc['w0']; sc['vs'] = 0.0 if i == 0 else (W[f - 1]['end'] + W[f]['start']) / 2
for i, sc in enumerate(SC): sc['ve'] = SC[i + 1]['vs'] if i + 1 < len(SC) else AUDIO + TAIL * SPEED
fin = lambda t: t / SPEED
FINAL = fin(AUDIO + TAIL * SPEED)
def anchor_time(sc, anchor):
    n = 1
    if '#' in anchor: anchor, n = anchor.rsplit('#', 1); n = int(n)
    a = norm(anchor); c = 0
    for k in range(sc['w0'], sc['w1']):
        if norm(W[k]['word']) == a:
            c += 1
            if c == n: return W[k]['start']
    raise SystemExit(f'{sc["id"]}: якорь «{anchor}#{n}» не найден в «{sc["text"][:70]}»')
for sc in SC: sc['tx'] = [(fin(anchor_time(sc, a)), txt, typ, who) for a, txt, typ, who in sc['texts']]

def row(*c): return '| ' + ' | '.join(str(x).replace('|', '/').replace('\n', ' ') for x in c) + ' |'
o = []; P = o.append
P(f'# Раскадровка: ролик 13, «{TITLE}»')
P(f'Основа: `озвучка.mp3` ({AUDIO:.1f} с = {mmss(AUDIO)}, ElevenLabs 1.2, без сокращений) и тайминги слов (`тайминги-слов.json`: faster-whisper small.en, выровнено по `сценарий.txt`, 96% слов совпало). Ролик ускоряется ещё ×1,2. Стиль: гибрид Razgon + vizavi (`скилы/hybrid-razgon-vizavi/SKILL.md`): герои и движение Razgon, камера, глубина, стикеры и звук vizavi.')
P('')
P('## Хронометраж (лимит владельца: итог 8:00–9:00)')
P(f'- Озвучка {mmss(AUDIO)}, после ×1,2: **{mmss(AUDIO / SPEED)}**, плюс хвост {TAIL:.1f} с тишины, **итог {mmss(FINAL)}**, в окне 8:00–9:00: {"да" if LIMIT_LO <= FINAL <= LIMIT_HI else "НЕТ"}. Сокращений нет.')
P('- Времена `мм:сс.с` от начала итогового ролика (после ×1,2); конец сцены = начало следующей.')
P('')
P('## Герои (все кодовые куклы Razgon, одинаковые во всех сценах, глаза всегда видны)')
P('Новые герои (Tess, Nia, June, Mr. Hale, репортёр, оператор, повариха, восьмиклассник, почтальон, массовка) собираются в коде, **один кадр-сравнение уходит владельцу на «утверждён» до сборки сцен** (правило «новый герой»). Все кепки Leon только `capBack`.')
P(''); P('| Герой | Как выглядит | Откуда | Рост |'); P('|---|---|---|---|')
for r in HEROES: P(row(*r))
P(''); P('## Места')
P('Богатые фоны (класс, столовая, спортзал, гараж, улица) — код как основа, OpenAI-фоны подключаются позже по цене и «ок» владельца (в этой раскадровке OpenAI не запускался). Абстрактные места (плашки, схемы фактов) кодом.')
P(''); P('| Код | Место | Сцен |'); P('|---|---|---|')
cnt = collections.Counter(sc['place'] for sc in SC)
for k, v in PLACES.items(): P(row(k, v, cnt.get(k, 0)))
for k in cnt:
    assert k in PLACES, f'место {k} не описано'
P(''); P('## Сквозные крючки (где они в кадре)')
for h in HOOKS: P('- ' + h)
P(''); P('## Сцены')
P(''); P('| № | Время | Озвучка | Место | Кадр | Текст на экране | Анимация | Камера (гибрид) | Ассеты |'); P('|---|---|---|---|---|---|---|---|---|')
durs = []; tx_total = 0
for sc in SC:
    s, e = fin(sc['vs']), fin(sc['ve']); durs.append((e - s, sc['id']))
    txs = '; '.join(f'`{mmss(t)}` {x}' for t, x, ty, w in sc['tx']) or '—'; tx_total += len(sc['tx'])
    P(row(sc['id'], f'{mmss(s)}–{mmss(e)}', sc['text'], sc['place'], sc['visual'], txs, sc['motion'], sc['cam'] or '—', sc['assets']))
P(''); P('## Итоги')
P(f'- Сцен: {len(SC)}. Средняя длина {sum(d for d, _ in durs) / len(durs):.1f} с, самая длинная {max(durs)[0]:.1f} с ({max(durs)[1]}), самая короткая {min(durs)[0]:.1f} с ({min(durs)[1]}). Итог {mmss(FINAL)}.')
P(f'- Строк текста на экране: {tx_total}.')
P(FUN); P(LOGIC)
open(os.path.join(HERE, 'storyboard.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
tt = ['# Текст на экране: ролик 13', 'Время от начала итогового ролика (после ×1,2). cap — подпись; plate — плашка; say — реплика (кто); card — карточка факта; hud — часы дня; num — число над головой Leon; boom — взрыв-стикер.', '', '| № сцены | Время | Текст | Тип | Кто |', '|---|---|---|---|---|']
for sc in SC:
    for t, x, ty, w in sc['tx']: tt.append(row(sc['id'], mmss(t), x, ty, w or '—'))
open(os.path.join(HERE, 'text_elements.md'), 'w', encoding='utf-8').write('\n'.join(tt) + '\n')
with open(os.path.join(HERE, 'manifest.csv'), 'w', encoding='utf-8', newline='') as f:
    wr = csv.writer(f); wr.writerow(['scene', 'start', 'end', 'dur', 'vo', 'place', 'visual', 'onscreen_text', 'motion', 'camera', 'assets'])
    for sc in SC:
        s, e = fin(sc['vs']), fin(sc['ve']); wr.writerow([sc['id'], mmss(s), mmss(e), f'{e - s:.1f}', sc['text'], sc['place'], sc['visual'], '; '.join(f'{mmss(t)} {x}' for t, x, ty, w in sc['tx']), sc['motion'], sc['cam'], sc['assets']])
pp = ['# Паспорта сложных сцен: ролик 13', 'Правило `логика-кадров.md`: объект | опора | куда направлен | что делает герой | кто смотрит | размер.', '']
seen = {}
for sc in SC:
    if sc['passport']:
        key = sc['passport']
        if key in seen: pp += [f'## {sc["id"]} ({sc["place"]}): {sc["text"][:70]}', f'то же, что в {seen[key]}', '']
        else: seen[key] = sc['id']; pp += [f'## {sc["id"]} ({sc["place"]}): {sc["text"][:70]}', sc['passport'], '']
pp += ['## Общие правила ролика'] + ['- ' + r for r in RULES]
pp += ['', '## Смета', '- OpenAI в раскадровке не запускался. Фоны от OpenAI (по правилу «гибрид») запрашиваются отдельно с ценой и «ок» владельца.', '- Всё остальное (герои, надписи, числа, стикеры, камера) кодом, без генерации.']
open(os.path.join(HERE, 'паспорта-сцен.md'), 'w', encoding='utf-8').write('\n'.join(pp) + '\n')
ac = collections.Counter()
for sc in SC:
    for a in [x.strip() for x in sc['assets'].split(';') if x.strip()]: ac[a] += 1
oo = ['# Список картинок и предметов: ролик 13', 'Все герои, схемы, подписи и действие кодом.', '', '| Ассет | Сцен |', '|---|---|']
for a, n in ac.most_common(): oo.append(f'| {a} | {n} |')
open(os.path.join(HERE, 'ассеты.md'), 'w', encoding='utf-8').write('\n'.join(oo) + '\n')
data = {'title': TITLE, 'speed': SPEED, 'duration': round(FINAL, 3),
        'scenes': [{'id': sc['id'], 'start': round(fin(sc['vs']), 3), 'end': round(fin(sc['ve']), 3), 'place': sc['place'], 'line': sc['text'],
                    'visual': sc['visual'], 'motion': sc['motion'], 'camera': sc['cam'], 'assets': sc['assets'],
                    'texts': [{'t': round(t, 3), 's': x, 'k': ty, **({'who': w} if w else {})} for t, x, ty, w in sc['tx']]} for sc in SC],
        'words': [{'word': x['word'], 'start': round(x['start'] / SPEED, 3), 'end': round(x['end'] / SPEED, 3)} for x in W]}
json.dump(data, open(os.path.join(HERE, 'сцены.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'сцен {len(SC)}, озвучка {mmss(AUDIO)} → итог {mmss(FINAL)} = {FINAL:.1f} с; текстов {tx_total}; средняя {sum(d for d, _ in durs) / len(durs):.1f} с, макс {max(durs)[0]:.1f} ({max(durs)[1]})')
print('длинные >7 с:', ' '.join(f'{i}:{d:.1f}' for d, i in durs if d > 7))
print('короткие <1,2 с:', ' '.join(f'{i}:{d:.1f}' for d, i in durs if d < 1.2))
