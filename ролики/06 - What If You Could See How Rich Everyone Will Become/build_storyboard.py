# -*- coding: utf-8 -*-
"""Раскадровка ролика 06 из scenes_data.py + тайминги-слов.json (+ сборка story/shots.json, story/texts.json, timeline/words.json проекта).
Запуск:  python3 build_storyboard.py
Правка раскадровки = правка scenes_data.py и повторный запуск: тайминги пересчитываются сами."""
import json, os, re, subprocess, csv, collections
HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.abspath(os.path.join(HERE, '..', '..', 'razgon-animation-studio', 'projects', 'what-if-rich'))
SPEED, TAIL = 1.2, 2.5
LIMIT_LO, LIMIT_HI = 480.0, 500.0
def norm(t): return re.sub(r'[^a-z0-9]', '', t.lower().replace('’', "'"))
def mmss(t): m, s = divmod(max(0, t), 60); return f'{int(m):02d}:{s:04.1f}'
W = json.load(open(os.path.join(HERE, 'тайминги-слов.json'), encoding='utf-8'))['words']
AUDIO = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(HERE, 'озвучка.mp3')]).decode().strip())
script_text = open(os.path.join(HERE, 'сценарий.txt'), encoding='utf-8').read()
stoks = script_text.split(); assert len(stoks) == len(W), (len(stoks), len(W))
from scenes_data import SC
# --- границы сцен по началу фразы
pos = 0; starts = []
for i, sc in enumerate(SC):
    st = [norm(x) for x in sc['start'].split()]; found = None
    for p in range(pos + (1 if i else 0), len(stoks) - len(st) + 1):
        if [norm(x) for x in stoks[p:p + len(st)]] == st: found = p; break
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
P('# Раскадровка: ролик 06, «What If You Could See How Rich Everyone Will Become?»')
P(f'Основа: `озвучка.mp3` ({AUDIO:.1f} с = {mmss(AUDIO)}, ElevenLabs 1.2) и тайминги слов (`тайминги-слов.json`: Whisper small, выровнено по `сценарий.txt`, 97% слов совпало). Ролик ускоряется ещё ×1,2.')
P('')
P('## Хронометраж (лимит владельца: итог 8:00–8:20)')
P(f'- Озвучка целиком {mmss(AUDIO)}, после ×1,2: **{mmss(AUDIO / SPEED)}**: на {mmss(LIMIT_LO - AUDIO / SPEED)} короче 8:00. Сокращать не нужно, наоборот: в конец добавлено {TAIL:.1f} с тишины (финальный кадр держится), **итог {mmss(FINAL)}**, в окне 8:00–8:20: {"да" if LIMIT_LO <= FINAL <= LIMIT_HI else "НЕТ"}. Исходный `озвучка.mp3` не тронут; проектный `input/voiceover.mp3` = озвучка ×1,2 + хвост.')
P('- Времена `мм:сс.с` от начала итогового ролика; конец сцены = начало следующей.')
P('')
P('## Герои')
P('Все герои кодовые куклы Razgon, внешность одинаковая во всех сценах. Новые: Walt (бездомный) и девочка из крючка (GIRL); остальные из роликов 02–05.')
P('')
P('| Герой | Как выглядит | Откуда |'); P('|---|---|---|')
for r in [('LEON', 'эталон канала (кепка capBack, красная футболка с молнией, серые шорты, оранжевые кроссовки); число над головой синее', 'ролики 01–05'),
          ('WALT', 'бездомный: рваная оливковая куртка с капюшоном, шапка-бини, седая борода, ботинки в скотче, глаза видны; число над головой зелёное крупное', 'новый, кодом'),
          ('GIRL', 'девочка с остановки: жёлтая куртка, длинные тёмные волосы, ручка; крючок', 'новая, кодом'),
          ('OWEN', 'зелёная толстовка, круглые очки, рыжеватые волосы', 'ролики 04–05'), ('CHASE, ZOE', 'как в роликах 04–05', 'ролики 04–05'),
          ('MS. PARK', 'фиолетовый костюм, пучок, очки', 'ролики 02–05'), ('DAD, MOM', 'как в ролике 02', 'ролики 02–05'),
          ('BISCUIT', 'собака (картинки OpenAI из ролика 02), один размер', 'ролики 02–05'),
          ('MAN, GUARD, MAILMAN, OLDMAN, SKATER, прохожие', 'второстепенные взрослые и дети из `lib.js`, глаза видны', 'кодом')]: P(row(*r))
P('')
P('## Места')
P('Фоны OpenAI не нужны (0 центов): kitchen, livingRoom, classroom, gym из роликов 01–05; парк, поле — код ролика 05; новые места кодом: магазин (Maple Street, витрина), переулок с мусорным баком, гараж Owen, остановка, комната ночью (= kitchenNight). Числа над головами, чертежи, карточки, дорога с флажком — код.')
P('')
P('| Код | Место | Сцен |'); P('|---|---|---|')
cnt = collections.Counter(sc['place'] for sc in SC)
PL = {'STREET': 'улица у хозяйственного магазина (витрина, стена, дождь)', 'VOID': 'абстрактный фон: схемы, карточки, доска, дорога', 'KITCHEN': 'кухня', 'LIVING': 'гостиная', 'PARK': 'парк (код ролика 05)', 'CLASS': 'класс', 'GARAGE': 'гараж Owen (код)', 'ALLEY': 'переулок с мусорным баком в дождь (код)', 'GYM': 'школьный зал: кружок робототехники', 'BUSSTOP': 'остановка (код)', 'NIGHT': 'ночная комната (kitchenNight)'}
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
P('- Гэги без звука: число над головой Walt против числа Leon (табло MONEY CONTEST), одно целое окно у машины Mom, сосиска вместо Biscuit, 7 цифр — только им лимонад, Owen и число падает, мешок SECRET, прохожие огибают Walt как почтовый ящик, нули отваливаются от числа на каждом шаге Walt к баку, вода из ведра, число Leon $61,400 → $52,000, девочка пишет число на руке.')
P('- Логика: вторник (откровение) → день 1 (плюсы) → четверг (Owen) → пятница (Walt) → суббота (дождь, зал кружка) → воскресенье (остановка). Число Leon: 61 400 до субботы, потом 52 000 до конца. Число Walt падает ступенями: 6,31 млрд → 4 млрд → 900 млн → 300 млн, после зала возвращается к 6 310 000 000.')
open(os.path.join(HERE, 'storyboard.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
tt = ['# Текст на экране: ролик 06', 'Время от начала итогового ролика (после ×1,2). cap — подпись маркером; plate — жёлтая плашка; say — реплика пузырём (кто); card — карточка.', '', '| № сцены | Время | Текст | Тип | Кто |', '|---|---|---|---|---|']
for sc in SC:
    for t, x, ty, w in sc['tx']: tt.append(row(sc['id'], mmss(t), x, ty, w or '—'))
open(os.path.join(HERE, 'text_elements.md'), 'w', encoding='utf-8').write('\n'.join(tt) + '\n')
with open(os.path.join(HERE, 'manifest.csv'), 'w', encoding='utf-8', newline='') as f:
    wr = csv.writer(f); wr.writerow(['scene', 'start', 'end', 'dur', 'vo', 'place', 'visual', 'onscreen_text', 'motion', 'assets'])
    for sc in SC:
        s, e = fin(sc['vs']), fin(sc['ve']); wr.writerow([sc['id'], mmss(s), mmss(e), f'{e - s:.1f}', sc['text'], sc['place'], sc['visual'], '; '.join(f'{mmss(t)} {x}' for t, x, ty, w in sc['tx']), sc['motion'], sc['assets']])
pp = ['# Паспорта сложных сцен: ролик 06', 'Правило `логика-кадров.md`: объект | опора | куда направлен | что делает герой | кто смотрит | размер.', '']
for sc in SC:
    if sc['passport']: pp += [f'## {sc["id"]} ({sc["place"]}): {sc["text"][:70]}', sc['passport'], '']
pp += ['## Общие правила ролика',
 '- Числа над головами: рисуются кодом (`X.numTag`), над макушкой (верх кепки/шапки), не закрывают глаза и лицо; Leon синее, остальные зелёное, Walt крупнее. Число не выходит за кадр (зажимается).',
 '- Падение числа Walt читается без звука: после каждого шага отваливается нуль и падает; цифры не мельче 60 px.',
 '- Предметы в руках: поза с руками под предметом; бумага и блокнот не торчат в воздухе без руки.',
 '- Дождь: только линии и капли кодом, без сплошных заливок; Leon и Walt всегда целиком в кадре, глаза видны.',
 '- Биcкит один размер; мусорный бак в переулке стоит на земле у стены, крышка к Walt.']
open(os.path.join(HERE, 'паспорта-сцен.md'), 'w', encoding='utf-8').write('\n'.join(pp) + '\n')
ac = collections.Counter()
for sc in SC:
    for a in [x.strip() for x in sc['assets'].split(';') if x.strip()]: ac[a] += 1
oo = ['# Список картинок и предметов: ролик 06', 'Все герои, диаграммы, подписи и действие кодом; готовые фоны из роликов 01–04. Новых картинок OpenAI нет (0 центов).', '', '| Ассет | Сцен |', '|---|---|']
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
json.dump({'title': 'What If You Could See How Rich Everyone Will Become', 'duration': round(dur, 3), 'shots': shots, 'music': []}, open(os.path.join(PROJ, 'story', 'shots.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(texts, open(os.path.join(PROJ, 'story', 'texts.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
words = [{'word': x['word'], 'start': round(x['start'] / SPEED, 3), 'end': round(x['end'] / SPEED, 3)} for x in W]
json.dump({'source': 'тайминги-слов.json /1.2', 'words': words}, open(os.path.join(PROJ, 'timeline', 'words.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(f'сцен {len(SC)}, озвучка {mmss(AUDIO)} → итог {mmss(FINAL)} = {FINAL:.1f} с; текстов {len(texts)}; средняя {sum(d for d, _ in durs) / len(durs):.1f} с, макс {max(durs)[0]:.1f} ({max(durs)[1]})')
print(' '.join(f'{i}:{d:.1f}' for d, i in durs if d > 8))
