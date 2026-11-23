# -*- coding: utf-8 -*-
"""Раскадровка ролика 10 из scenes_data.py + тайминги-слов.json (+ сборка story/shots.json, story/texts.json, timeline/words.json проекта).
Запуск:  python3 build_storyboard.py
Правка раскадровки = правка scenes_data.py и повторный запуск: тайминги пересчитываются сами."""
import json, os, re, subprocess, csv, collections
HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.abspath(os.path.join(HERE, '..', '..', 'razgon-animation-studio', 'projects', 'what-if-see-everyones-iq'))
SPEED, TAIL = 1.2, 2.5
LIMIT_LO, LIMIT_HI = 480.0, 540.0
def norm(t): return re.sub(r'[^a-z0-9]', '', t.lower().replace('’', "'"))
def mmss(t): m, s = divmod(max(0, t), 60); return f'{int(m):02d}:{s:04.1f}'
W = json.load(open(os.path.join(HERE, 'тайминги-слов-сокращённые.json'), encoding='utf-8'))['words']
AUDIO = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(HERE, 'озвучка-сокращённая.mp3')]).decode().strip())
script_text = open(os.path.join(HERE, 'сценарий-сокращённый.txt'), encoding='utf-8').read()
stoks = script_text.split(); assert len(stoks) == len(W), (len(stoks), len(W))
from scenes_data import SC
# --- границы сцен по началу фразы
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
    if '#' in anchor: anchor, n = anchor.split('#'); n = int(n)
    a = norm(anchor); c = 0
    for k in range(sc['w0'], sc['w1']):
        if norm(W[k]['word']) == a:
            c += 1
            if c == n: return W[k]['start']
    raise SystemExit(f'{sc["id"]}: якорь «{anchor}#{n}» не найден в «{sc["text"][:70]}»')
for sc in SC: sc['tx'] = [(fin(anchor_time(sc, a)), txt, typ, who) for a, txt, typ, who in sc['texts']]

def row(*c): return '| ' + ' | '.join(str(x).replace('|', '/').replace('\n', ' ') for x in c) + ' |'
o = []; P = o.append
P('# Раскадровка: ролик 10, «What If You Could See Everyone\'s IQ?»')
P(f'Основа: `озвучка-сокращённая.mp3` ({AUDIO:.1f} с = {mmss(AUDIO)}, из `озвучка.mp3` 11:08,0 после вырезания 9 фраз, ElevenLabs 1.2) и тайминги слов (`тайминги-слов-сокращённые.json`: Whisper small, выровнено по `сценарий.txt`, 98% слов совпало). Ролик ускоряется ещё ×1,2.')
P('')
P('## Хронометраж (лимит владельца: итог 8:00–9:00)')
P(f'- Озвучка после сокращения {mmss(AUDIO)}, после ×1,2: **{mmss(AUDIO / SPEED)}**, плюс хвост {TAIL:.1f} с тишины, **итог {mmss(FINAL)}**, в окне 8:00–9:00: {"да" if LIMIT_LO <= FINAL <= LIMIT_HI else "НЕТ"}. Исходный `озвучка.mp3` не тронут; проектный `input/voiceover.mp3` = сокращённая озвучка ×1,2 + хвост.')
P('- Времена `мм:сс.с` от начала итогового ролика; конец сцены = начало следующей.')
P('')
P('## Герои')
P('Все герои кодовые куклы Razgon, внешность одинаковая во всех сценах. Из прошлых роликов: Leon, Owen, Ms. Park, Mom, Dad, водитель автобуса. Новые (сначала собираются кодом и сверяются кадром, Caleb утверждает владелец): CALEB, PIZZA, MAGICIAN, MAPMAN, FRACGIRL, JANITOR.')
P('')
P('| Герой | Как выглядит | Откуда |'); P('|---|---|---|')
for r in [('LEON', 'эталон канала (кепка capBack, красная футболка с молнией, серые шорты, оранжевые кроссовки); число 160 зелёное', 'ролики 01–09'),
          ('OWEN, MS. PARK, MOM, DAD, DRIVER', 'как в прошлых роликах (Owen в очках и зелёной толстовке, Park в фиолетовом костюме, Mom в розовом платье, Dad в синей футболке, водитель в синей форме)', 'ролики 02–09'),
          ('CALEB', 'кудрявые каштановые волосы, школьная форма: тёмный пиджак с гербом, белая рубашка; число 70/71 красное', 'новый, кодом'),
          ('PIZZA', 'пиццмейкер: белый колпак, белый фартук', 'новый, кодом'),
          ('MAGICIAN', 'фокусник: чёрная кепка capBack, красная бабочка, чёрный плащ', 'новый, кодом'),
          ('MAPMAN', 'мужчина с огромной бумажной картой: куртка и кепка capBack', 'новый, кодом'),
          ('FRACGIRL', 'девочка с листом дробей: свитер, хвостик', 'новая, кодом'),
          ('JANITOR', 'уборщик: серый комбинезон, швабра', 'новый, кодом'),
          ('KIDS, FANS', 'ученики и зрители, глаза видны, разные причёски, у каждого число', 'кодом')]: P(row(*r))
P('')
P('## Места')
P('Фоны класса, столовой, спортзала, коридора, улицы, кухни, гостиной, автобуса из роликов 01–09. Новое место (OpenAI, одним фоном, цену и «ок» согласовать до запуска): школьная библиотека (library). Парк, схемы, графики, плашки, врезки кодом.')
P('')
P('| Код | Место | Сцен |'); P('|---|---|---|')
cnt = collections.Counter(sc['place'] for sc in SC)
PL = {'CLASS': 'класс Ms. Park', 'HALL': 'коридор', 'CAFE': 'столовая', 'KITCHEN': 'кухня', 'HOME': 'гостиная', 'BUS': 'салон автобуса', 'PARK': 'парк (код)', 'SHOP': 'улица у пиццерии', 'LIB': 'библиотека (OpenAI, новый)', 'GYM': 'спортзал со складными стульями', 'VOID': 'абстрактный фон: схемы, графики, плашки'}
for k, v in PL.items(): P(row(k, v, cnt.get(k, 0)))
P('')
P('## Сцены')
P(''); P('| № | Время | Озвучка | Место | Кадр | Текст на экране | Анимация | Ассеты |'); P('|---|---|---|---|---|---|---|---|')
durs = []; tx_total = 0
for sc in SC:
    s, e = fin(sc['vs']), fin(sc['ve']); durs.append((e - s, sc['id']))
    txs = '; '.join(f'`{mmss(t)}` {x}' for t, x, ty, w in sc['tx']) or '—'; tx_total += len(sc['tx'])
    P(row(sc['id'], f'{mmss(s)}–{mmss(e)}', sc['text'], sc['place'], sc['visual'], txs, sc['motion'], sc['assets']))
P('')
P('## Итоги')
P(f'- Сцен: {len(SC)}. Средняя длина {sum(d for d, _ in durs) / len(durs):.1f} с, самая длинная {max(durs)[0]:.1f} с ({max(durs)[1]}), самая короткая {min(durs)[0]:.1f} с ({min(durs)[1]}). Итог {mmss(FINAL)}.')
P(f'- Строк текста на экране: {tx_total}.')
P('- Гэги без звука: числа над головами (70 красное у Caleb, 160 зелёное у Leon), листы A+ и F, отражение в окне, водитель на повороте, мужчина под картой, фокусник роняет колоду, вердикт «C» при всех правильных ответах, 41 провал в счётчике, монета на горку, шарик лопается и зал вскакивает, числа 71 и 159.')
P('- Логика: вторник (класс) → правила → утро (числа у всех) → снобизм (столовая) → библиотека 6:40 → C за «Show work» → ярмарка (парта, 41 запуск) → пятница (спортзал, сквозняк, монета) → A → числа двигаются. Порядок 20 шагов машины одинаков во всех кадрах.')
open(os.path.join(HERE, 'storyboard.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
tt = ['# Текст на экране: ролик 10', 'Время от начала итогового ролика (после ×1,2). cap — подпись маркером; plate — жёлтая плашка; say — реплика пузырём (кто); card — карточка.', '', '| № сцены | Время | Текст | Тип | Кто |', '|---|---|---|---|---|']
for sc in SC:
    for t, x, ty, w in sc['tx']: tt.append(row(sc['id'], mmss(t), x, ty, w or '—'))
open(os.path.join(HERE, 'text_elements.md'), 'w', encoding='utf-8').write('\n'.join(tt) + '\n')
with open(os.path.join(HERE, 'manifest.csv'), 'w', encoding='utf-8', newline='') as f:
    wr = csv.writer(f); wr.writerow(['scene', 'start', 'end', 'dur', 'vo', 'place', 'visual', 'onscreen_text', 'motion', 'assets'])
    for sc in SC:
        s, e = fin(sc['vs']), fin(sc['ve']); wr.writerow([sc['id'], mmss(s), mmss(e), f'{e - s:.1f}', sc['text'], sc['place'], sc['visual'], '; '.join(f'{mmss(t)} {x}' for t, x, ty, w in sc['tx']), sc['motion'], sc['assets']])
pp = ['# Паспорта сложных сцен: ролик 10', 'Правило `логика-кадров.md`: объект | опора | куда направлен | что делает герой | кто смотрит | размер.', '']
for sc in SC:
    if sc['passport']: pp += [f'## {sc["id"]} ({sc["place"]}): {sc["text"][:70]}', sc['passport'], '']
pp += ['## Общие правила ролика',
 '- Leon целиком в кадре в каждой сцене (кроме врезок), глаза у всех видны, кепки только capBack.',
 '- Числа: одинаковый шрифт над головой каждого человека (кроме животных); зелёные у всех, красные только у Caleb (70, затем 71); появляются на слове «Floating»; в отражении окна число читается не зеркально.',
 '- Машина Руба Голдберга: 20 шагов слева направо, порядок во всех кадрах один (см. кейсы.md); шарик справа; парус на шаге 12, горка на шаге 13.',
 '- Спортзал: складные стулья рядами лицом к столу, зрители сидят на сиденьях, дверь сбоку, сквозняк поперёк стола.',
 '- Библиотека: полки, стол, карточки и зелёная тетрадь лежат плашмя на столе.',
 '- Масштаб: стол ≈ 5 ростов Leon, машина ≈ 1/2 роста Leon в высоту, лист/тетрадь ≈ 1/3 роста.']
pp += ['', '## Смета', '- OpenAI Images (одна попытка, `gpt-image-2.5-sunburst`, medium, референс кодовый кадр места): library ≈ 2,3 цента. Запуск только после «ок» владельца.',
 '- Превью (утверждённый стиль, одна попытка): ≈ 6 центов, согласовать отдельно.',
 f'- Остальное кодом: герои, предметы, схемы, врезки, эффекты, {len(SC)} сцен; рендер на этом Mac.']
open(os.path.join(HERE, 'паспорта-сцен.md'), 'w', encoding='utf-8').write('\n'.join(pp) + '\n')
ac = collections.Counter()
for sc in SC:
    for a in [x.strip() for x in sc['assets'].split(';') if x.strip()]: ac[a] += 1
oo = ['# Список картинок и предметов: ролик 10', 'Все герои, схемы, подписи и действие кодом. Новый фон OpenAI: library (≈ 2,3 цента, одна попытка). Остальные фоны из роликов 01–09.', '', '| Ассет | Сцен |', '|---|---|']
for a, n in ac.most_common(): pass
for a, n in ac.most_common(): oo.append(f'| {a} | {n} |')
open(os.path.join(HERE, 'ассеты.md'), 'w', encoding='utf-8').write('\n'.join(oo) + '\n')
# --- проект
os.makedirs(os.path.join(PROJ, 'story'), exist_ok=True); os.makedirs(os.path.join(PROJ, 'timeline'), exist_ok=True)
shots = []
for sc in SC:
    shots.append({'id': sc['id'].lower(), 'start': round(fin(sc['vs']), 3), 'end': round(fin(sc['ve']), 3), 'line': sc['text'], 'scene': sc['visual'], 'set': sc['place'], 'hud': '—', 'notes': sc['motion'], 'assets': sc['assets'], 'in': {'type': 'cut'}, 'sfx': []})
texts = []
for n, sc in enumerate(SC, 1):
    for t, x, ty, w in sc['tx']:
        r = {'t': round(t, 3), 's': x, 'sc': n, 'k': ty, 'raw': ty}
        if w: r['who'] = w
        texts.append(r)
texts.sort(key=lambda r: r['t'])
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(PROJ, 'input', 'voiceover.mp3')]).decode().strip())
json.dump({'title': 'What If You Could See Everyone\'s IQ?', 'duration': round(dur, 3), 'shots': shots, 'music': []}, open(os.path.join(PROJ, 'story', 'shots.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(texts, open(os.path.join(PROJ, 'story', 'texts.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
words = [{'word': x['word'], 'start': round(x['start'] / SPEED, 3), 'end': round(x['end'] / SPEED, 3)} for x in W]
json.dump({'source': 'тайминги-слов.json /1.2', 'words': words}, open(os.path.join(PROJ, 'timeline', 'words.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(f'сцен {len(SC)}, озвучка {mmss(AUDIO)} → итог {mmss(FINAL)} = {FINAL:.1f} с; текстов {len(texts)}; средняя {sum(d for d, _ in durs) / len(durs):.1f} с, макс {max(durs)[0]:.1f} ({max(durs)[1]})')
print(' '.join(f'{i}:{d:.1f}' for d, i in durs if d > 8))
