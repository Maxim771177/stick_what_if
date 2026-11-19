# -*- coding: utf-8 -*-
"""Раскадровка ролика 09 из scenes_data.py + тайминги-слов.json (+ сборка story/shots.json, story/texts.json, timeline/words.json проекта).
Запуск:  python3 build_storyboard.py
Правка раскадровки = правка scenes_data.py и повторный запуск: тайминги пересчитываются сами."""
import json, os, re, subprocess, csv, collections
HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.abspath(os.path.join(HERE, '..', '..', 'razgon-animation-studio', 'projects', 'what-if-see-10s'))
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
P('# Раскадровка: ролик 09, «What If You Could See 10 Seconds Into the Future?»')
P(f'Основа: `озвучка-сокращённая.mp3` ({AUDIO:.1f} с = {mmss(AUDIO)}, из `озвучка.mp3` 11:09,3 после вырезания 10 фраз, ElevenLabs 1.2) и тайминги слов (`тайминги-слов-сокращённые.json`: Whisper small, выровнено по `сценарий.txt`, 98% слов совпало). Ролик ускоряется ещё ×1,2.')
P('')
P('## Хронометраж (лимит владельца: итог 8:00–9:00)')
P(f'- Озвучка после сокращения {mmss(AUDIO)}, после ×1,2: **{mmss(AUDIO / SPEED)}**, плюс хвост {TAIL:.1f} с тишины, **итог {mmss(FINAL)}**, в окне 8:00–9:00: {"да" if LIMIT_LO <= FINAL <= LIMIT_HI else "НЕТ"}. Исходный `озвучка.mp3` не тронут; проектный `input/voiceover.mp3` = сокращённая озвучка ×1,2 + хвост.')
P('- Времена `мм:сс.с` от начала итогового ролика; конец сцены = начало следующей.')
P('')
P('## Герои')
P('Все герои кодовые куклы Razgon, внешность одинаковая во всех сценах. Из роликов 01–08: Leon, Owen, Zoe, Ms. Park, Mom, Coach Burke. Новые (сначала собираются кодом и сверяются кадром): REF (судья пенальти), KICKER и BIG KICKER (кикеры), FAN1/FAN2 (пара зрителей), SCOOTER BOY (мальчик в сером капюшоне на скутере), NURSE (школьная медсестра).')
P('')
P('| Герой | Как выглядит | Откуда |'); P('|---|---|---|')
for r in [('LEON', 'эталон канала (кепка capBack, красная футболка с молнией, серые шорты, оранжевые кроссовки); в роликe 09 на пенальти в больших перчатках', 'ролики 01–08'),
          ('OWEN, ZOE, MS. PARK, MOM, COACH BURKE', 'как в роликах 02–08 (Owen в очках и зелёной толстовке с роботом, Zoe в жёлтом свитере с наушниками, Park в фиолетовом костюме, Mom в розовом платье, Burke в зелёной футболке со свистком)', 'ролики 02–08'),
          ('REF', 'судья: чёрная футболка, свисток, кепка capBack', 'новый, кодом'),
          ('BIG KICKER, KICKER', 'школьники-кикеры в красной и синей футболках, big = вдвое выше Leon', 'новые, кодом'),
          ('FAN1, FAN2, KIDS', 'зрители и дети, глаза видны, разные причёски', 'кодом'),
          ('SCOOTER BOY', 'мальчик в сером капюшоне, на скутере (скутер кодом: колёса, руль, подножка)', 'новый, кодом'),
          ('NURSE', 'медсестра: белый халат, шапочка', 'новый, кодом')]: P(row(*r))
P('')
P('## Места')
P('Фоны столовой, класса, спортзала, улицы, коридора, кухни, комнаты из роликов 01–08. Новые места (OpenAI, одним фоном на место, цену согласовать до запуска): спортивный магазин с воротами (sportStore), школьный зал со сценой (stage). Абстрактные места, схемы, врезки-видения, плашки кодом.')
P('')
P('| Код | Место | Сцен |'); P('|---|---|---|')
cnt = collections.Counter(sc['place'] for sc in SC)
PL = {'CAFE': 'столовая (ролик 01)', 'CLASS': 'класс', 'STORE': 'спортивный магазин с воротами (OpenAI, новый)', 'STREET': 'улица, тротуар, садовая калитка', 'GYM': 'спортзал', 'STAGE': 'школьный зал со сценой и рамой (OpenAI, новый)', 'KITCHEN': 'кухня', 'ROOM': 'комната Leon, ночь', 'HALL': 'коридор', 'VOID': 'абстрактный фон: схемы, плашки, врезки', 'VOIDD': 'тёмный абстрактный фон (врезки-видения)'}
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
P('- Гэги без звука: Leon замирает с подносом а суп не пролит, поднос Owen ползёт к краю стола, маркер Ms. Park гаснет, перчатки Leon до колен, мяч в дюйме от перчатки, Leon на плечах толпы с чеком, скутер проезжает мимо пустым, мячи мимо Leon девять раз, цифра 11 в кольце, рама падает на пустую сцену, зал встаёт.')
P('- Логика: вторник (столовая) → правила (класс) → суббота (пенальти, Mom) → понедельник (скутер) → школа и dodgeball → пятница (танцы) → лаг → пятница вечер (концерт) → весна. Отсчёт в кольце 10 → 0 в каждом видении.')
open(os.path.join(HERE, 'storyboard.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
tt = ['# Текст на экране: ролик 09', 'Время от начала итогового ролика (после ×1,2). cap — подпись маркером; plate — жёлтая плашка; say — реплика пузырём (кто); card — карточка.', '', '| № сцены | Время | Текст | Тип | Кто |', '|---|---|---|---|---|']
for sc in SC:
    for t, x, ty, w in sc['tx']: tt.append(row(sc['id'], mmss(t), x, ty, w or '—'))
open(os.path.join(HERE, 'text_elements.md'), 'w', encoding='utf-8').write('\n'.join(tt) + '\n')
with open(os.path.join(HERE, 'manifest.csv'), 'w', encoding='utf-8', newline='') as f:
    wr = csv.writer(f); wr.writerow(['scene', 'start', 'end', 'dur', 'vo', 'place', 'visual', 'onscreen_text', 'motion', 'assets'])
    for sc in SC:
        s, e = fin(sc['vs']), fin(sc['ve']); wr.writerow([sc['id'], mmss(s), mmss(e), f'{e - s:.1f}', sc['text'], sc['place'], sc['visual'], '; '.join(f'{mmss(t)} {x}' for t, x, ty, w in sc['tx']), sc['motion'], sc['assets']])
pp = ['# Паспорта сложных сцен: ролик 09', 'Правило `логика-кадров.md`: объект | опора | куда направлен | что делает герой | кто смотрит | размер.', '']
for sc in SC:
    if sc['passport']: pp += [f'## {sc["id"]} ({sc["place"]}): {sc["text"][:70]}', sc['passport'], '']
pp += ['## Общие правила ролика',
 '- Leon целиком в кадре в каждой сцене (кроме кровати и врезок: голова и плечи, глаза видны); глаза у всех видны, кепки только capBack; в «зависании» глаза-кольца видны, зрачков нет (стеклянный взгляд), не закрыты.',
 '- Врезка-видение: облачко/круг рядом с общим планом, не вместо него; в углу кольцо-таймер с цифрой; крупные лица только врезкой.',
 '- Ворота: стойки на земле, сетка сзади, Leon внутри; мяч летит по дуге от кикера к воротам, перчатки на руках Leon (ладонь вперёд).',
 '- Скутер: на проезжей части, колёса на асфальте, нос по ходу, мальчик на нём целиком; сумка Zoe остаётся на плече, ремень цел.',
 '- Рама с прожекторами: стальная, четыре троса к потолку по углам, висит выше голов; падает на пустую сцену, где никого нет; Owen с роботом, Zoe с вилкой шнура.',
 '- Масштаб: ворота ≈ 3 роста Leon в ширину, скутер ≈ 1,3 роста человека, рама ≈ 2,5 роста в ширину, робот ≈ 1/3 роста Owen.']
pp += ['', '## Смета', '- OpenAI Images (одна попытка на картинку, `gpt-image-2.5-sunburst`, medium, референс кодовый кадр места): sportStore, stage; 2 × ≈ 2,3 цента ≈ 5 центов. Запуск только после «ок» владельца.',
 '- Превью (утверждённый стиль, одна попытка): ≈ 6 центов, согласовать отдельно.',
 f'- Остальное кодом: герои, предметы, схемы, врезки, эффекты, {len(SC)} сцен; рендер на этом Mac.']
open(os.path.join(HERE, 'паспорта-сцен.md'), 'w', encoding='utf-8').write('\n'.join(pp) + '\n')
ac = collections.Counter()
for sc in SC:
    for a in [x.strip() for x in sc['assets'].split(';') if x.strip()]: ac[a] += 1
oo = ['# Список картинок и предметов: ролик 09', 'Все герои, схемы, подписи и действие кодом. Новые фоны OpenAI: sportStore, stage (≈ 5 центов, одна попытка). Остальные фоны из роликов 01–08.', '', '| Ассет | Сцен |', '|---|---|']
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
json.dump({'title': 'What If You Could See 10 Seconds Into the Future', 'duration': round(dur, 3), 'shots': shots, 'music': []}, open(os.path.join(PROJ, 'story', 'shots.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(texts, open(os.path.join(PROJ, 'story', 'texts.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
words = [{'word': x['word'], 'start': round(x['start'] / SPEED, 3), 'end': round(x['end'] / SPEED, 3)} for x in W]
json.dump({'source': 'тайминги-слов.json /1.2', 'words': words}, open(os.path.join(PROJ, 'timeline', 'words.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(f'сцен {len(SC)}, озвучка {mmss(AUDIO)} → итог {mmss(FINAL)} = {FINAL:.1f} с; текстов {len(texts)}; средняя {sum(d for d, _ in durs) / len(durs):.1f} с, макс {max(durs)[0]:.1f} ({max(durs)[1]})')
print(' '.join(f'{i}:{d:.1f}' for d, i in durs if d > 8))
