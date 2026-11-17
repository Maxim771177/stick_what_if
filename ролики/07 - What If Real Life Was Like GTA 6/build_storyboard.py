# -*- coding: utf-8 -*-
"""Раскадровка ролика 07 из scenes_data.py + тайминги-слов.json (+ сборка story/shots.json, story/texts.json, timeline/words.json проекта).
Запуск:  python3 build_storyboard.py
Правка раскадровки = правка scenes_data.py и повторный запуск: тайминги пересчитываются сами."""
import json, os, re, subprocess, csv, collections
HERE = os.path.dirname(os.path.abspath(__file__))
PROJ = os.path.abspath(os.path.join(HERE, '..', '..', 'razgon-animation-studio', 'projects', 'what-if-gta-life'))
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
P('# Раскадровка: ролик 07, «What If Your Life Was Like GTA 6?»')
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
for r in [('LEON', 'эталон канала (кепка capBack, красная футболка с молнией, серые шорты, оранжевые кроссовки); в погоне синяя кепка', 'ролики 01–06'),
          ('RIVAL', 'мальчик в золотой куртке, тёмные волосы, глаза видны; золотой вертолёт, полоска здоровья', 'новый, кодом'),
          ('NURSE', 'медсестра: белая форма, шапочка, какао в руке', 'новая, кодом'), ('DOCTOR', 'врач в белом халате, очки', 'ролики 02–05'),
          ('OWEN, CHASE, ZOE', 'как в роликах 04–06', 'ролики 04–06'), ('MS. PARK', 'фиолетовый костюм, пучок, очки', 'ролики 02–06'),
          ('DAD, MOM', 'как в ролике 02', 'ролики 02–06'), ('BISCUIT', 'собака (картинки OpenAI из ролика 02), один размер', 'ролики 02–06'),
          ('PRINCIPAL, POLICE, прохожие, соседи', 'второстепенные взрослые и дети из `lib.js`, глаза видны', 'кодом')]: P(row(*r))
P('')
P('## Места')
P('Фоны класса, кухни, гостиной из роликов 01–06. Новые места: заброшенный парк аттракционов вечером, крыша, палата, гараж с машинами; фоны OpenAI по «ок» владельца (смета в `паспорта-сцен.md`), до «ок» стоят кодовые заглушки. Двор, улица, мойка, причал, дорожка, бассейн сверху, небо, карта: код.')
P('')
P('| Код | Место | Сцен |'); P('|---|---|---|')
cnt = collections.Counter(sc['place'] for sc in SC)
PL = {'CLASS': 'класс 114 (фон OpenAI из ролика 01)', 'VOID': 'абстрактный фон: HUD, доски, телефон, карточки', 'KITCHEN': 'кухня', 'LIVING': 'гостиная', 'NIGHT': 'комната ночью', 'YARD': 'двор дома (код)', 'STREET': 'городская улица (код)', 'DOCK': 'причал (код)', 'GARAGE': 'гараж с машинами (OpenAI)', 'DRIVE': 'подъездная дорожка (код)', 'SCHOOL': 'школьный двор (код)', 'WASH': 'автомойка (код)', 'ROOF': 'крыша школы (OpenAI)', 'POOL': 'бассейн сверху (код)', 'SKYFALL': 'небо при падении (код)', 'WARD': 'палата (OpenAI)', 'PARK': 'заброшенный парк вечером (OpenAI)', 'COASTER': 'горки в парке вечером (тот же фон)', 'MAPZOOM': 'мини-карта отъезжает (код)'}
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
P('- Гэги без звука: жёлтый круг и «+$20,000», 4 месяца зарплаты конвертами, 17 лет чеков, золотая миска и Biscuit, Owen замер с $10,000, звёзды в углу 1→2→3→4, смена кепки в мойке, полоска здоровья 90→40→3 % и WASTED, какао в палате, Dad: «Worth it», красная метка без награды, Biscuit на колесе, лестница с вертолёта, мини-карта отъезжает.')
P('- Логика: понедельник (тест +$20 тыс.) → неделя денег до $1 090 000 (пятница) → суббота машина → воскресенье катер и вертолёт → понедельник школа и погоня (4 звезды) → вторник крыша и палата → среда Biscuit пропал, большая миссия → финал. Деньги Leon: 20 тыс. → 1,09 млн; звёзды: 1, 2, 3, 4 (последнюю не потерять).')
open(os.path.join(HERE, 'storyboard.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
tt = ['# Текст на экране: ролик 07', 'Время от начала итогового ролика (после ×1,2). cap — подпись маркером; plate — жёлтая плашка; say — реплика пузырём (кто); card — карточка.', '', '| № сцены | Время | Текст | Тип | Кто |', '|---|---|---|---|---|']
for sc in SC:
    for t, x, ty, w in sc['tx']: tt.append(row(sc['id'], mmss(t), x, ty, w or '—'))
open(os.path.join(HERE, 'text_elements.md'), 'w', encoding='utf-8').write('\n'.join(tt) + '\n')
with open(os.path.join(HERE, 'manifest.csv'), 'w', encoding='utf-8', newline='') as f:
    wr = csv.writer(f); wr.writerow(['scene', 'start', 'end', 'dur', 'vo', 'place', 'visual', 'onscreen_text', 'motion', 'assets'])
    for sc in SC:
        s, e = fin(sc['vs']), fin(sc['ve']); wr.writerow([sc['id'], mmss(s), mmss(e), f'{e - s:.1f}', sc['text'], sc['place'], sc['visual'], '; '.join(f'{mmss(t)} {x}' for t, x, ty, w in sc['tx']), sc['motion'], sc['assets']])
pp = ['# Паспорта сложных сцен: ролик 07', 'Правило `логика-кадров.md`: объект | опора | куда направлен | что делает герой | кто смотрит | размер.', '']
for sc in SC:
    if sc['passport']: pp += [f'## {sc["id"]} ({sc["place"]}): {sc["text"][:70]}', sc['passport'], '']
pp += ['## Общие правила ролика',
 '- HUD (круги, надписи, звёзды, мини-карта, полоска, WASTED, MISSION PASSED) только кодом; звёзды и мини-карта в углах, полоска над кепкой, надписи выше головы; глаза не закрывать.',
 '- Транспорт: машина вдоль дороги носом по ходу, колёса на земле, водитель виден в окне (глаза видны); вертолёт носом по ходу, лопасти над кабиной; катер на прицепе; масштаб: гиперкар ≈ 3 роста Leon, вертолёт ≈ 4.',
 '- Leon целиком в кадре в каждой сцене (кроме кадров в кабине: голова и плечи в окне, глаза видны). В погоне кепка синяя, до и после мойки бирюзовая.',
 '- Biscuit один размер; золотая миска одного вида; соперник в золотой куртке один и тот же во всех кадрах.',
 '- Пожар, взрыв, ранения не показываем; «WASTED» серым и палата; «Don\'t try this at home» карточкой.']
open(os.path.join(HERE, 'паспорта-сцен.md'), 'w', encoding='utf-8').write('\n'.join(pp) + '\n')
ac = collections.Counter()
for sc in SC:
    for a in [x.strip() for x in sc['assets'].split(';') if x.strip()]: ac[a] += 1
oo = ['# Список картинок и предметов: ролик 07', 'Все герои, диаграммы, подписи и действие кодом; готовые фоны из роликов 01–04. Новых картинок OpenAI нет (0 центов).', '', '| Ассет | Сцен |', '|---|---|']
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
json.dump({'title': 'What If Your Life Was Like GTA 6', 'duration': round(dur, 3), 'shots': shots, 'music': []}, open(os.path.join(PROJ, 'story', 'shots.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
json.dump(texts, open(os.path.join(PROJ, 'story', 'texts.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
words = [{'word': x['word'], 'start': round(x['start'] / SPEED, 3), 'end': round(x['end'] / SPEED, 3)} for x in W]
json.dump({'source': 'тайминги-слов.json /1.2', 'words': words}, open(os.path.join(PROJ, 'timeline', 'words.json'), 'w', encoding='utf-8'), ensure_ascii=False)
print(f'сцен {len(SC)}, озвучка {mmss(AUDIO)} → итог {mmss(FINAL)} = {FINAL:.1f} с; текстов {len(texts)}; средняя {sum(d for d, _ in durs) / len(durs):.1f} с, макс {max(durs)[0]:.1f} ({max(durs)[1]})')
print(' '.join(f'{i}:{d:.1f}' for d, i in durs if d > 8))
