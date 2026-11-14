# -*- coding: utf-8 -*-
"""Собирает раскадровку ролика 04 из scenes_data.py + тайминги-слов.json.
Запуск:  python3 build_storyboard.py [--cuts ABCDEFHIK|none] [--audio-cut]
  --cuts      какие сокращения применить (по умолчанию все предложенные). none = полный текст, итог 9:20.
  --audio-cut собрать озвучка-сокращённая.mp3 из озвучка.mp3 (нужен ffmpeg).
Правка раскадровки = правка scenes_data.py и повторный запуск: тайминги пересчитаются сами."""
import json, os, re, sys, subprocess, csv, collections
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
SPEED = 1.2
LIMIT_LO, LIMIT_HI = 480.0, 500.0     # итог 8:00–8:20
args = sys.argv[1:]
CUTS_ALL = 'ABCDEFHIK'
cuts_on = set(CUTS_ALL)
if '--cuts' in args:
    v = args[args.index('--cuts') + 1]
    cuts_on = set() if v == 'none' else set(v)
CUT_INFO = {
    'A': 'Блок «Texas 2023»: сканер мозга, 16 часов, «и вот лучшее» (оставляем «Kind of» и 1998)',
    'B': 'День 5: Queen\'s University, 6 000 мыслей в день и «Leon is reading two hundred people\'s worth» (оставляем Harvard и «half the clouds are about lunch»)',
    'C': 'День 5: исследование 13 стран и «Having them is normal» (оставляем «A thought isn\'t a decision. It\'s weather.»)',
    'D': 'День 3: «From that day, the scariest kid... Nobody does.» (оставляем «Leon has a bodyguard...»)',
    'E': 'День 7: «Did I water the plants? Why is the lawn so green?» (оставляем «It never says the thing.»)',
    'F': 'День 4: телефон Dad, «Long day», вторая морковка (оставляем «Then Dad glances at the empty plate»)',
    'H': 'Правила: «The clouds float at different heights...» (эту логику показывает картинка: облака на разных ярусах в каждой сцене)',
    'I': 'День 2: «Leon does it again with the next boy, and the next.»',
    'K': 'Хук: «Not a thought, not a plan, just a sock.» (шутка про носок остаётся в предыдущей фразе и в финале)',
}

def norm(t): return re.sub(r'[^a-z0-9]', '', t.lower().replace('’', "'"))
def mmss(t): m, s = divmod(max(0, t), 60); return f'{int(m):02d}:{s:04.1f}'

tim = json.load(open(os.path.join(HERE, 'тайминги-слов.json'), encoding='utf-8'))
W = tim['words']
AUDIO = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(HERE, 'озвучка.mp3')]).decode().strip())
script_text = open(os.path.join(HERE, 'сценарий.txt'), encoding='utf-8').read()
stoks = script_text.split()
assert len(stoks) == len(W), (len(stoks), len(W))

from scenes_data import SC
# --- раскладываем слова по сценам
pos = 0
for i, sc in enumerate(SC):
    toks = sc['text'].split()
    for k, t in enumerate(toks):
        if pos + k >= len(stoks) or stoks[pos + k] != t:
            ctx = ' '.join(stoks[max(0, pos + k - 3):pos + k + 4])
            raise SystemExit(f'Сцена {i + 1}: слово {k} «{t}» не совпало со сценарием около: «{ctx}»')
    sc['w0'], sc['w1'] = pos, pos + len(toks)
    pos += len(toks)
assert pos == len(stoks), f'не вся озвучка раскадрована: {pos}/{len(stoks)}'
for i, sc in enumerate(SC):
    f = sc['w0']
    sc['vs'] = 0.0 if i == 0 else (W[f - 1]['end'] + W[f]['start']) / 2
for i, sc in enumerate(SC):
    sc['ve'] = SC[i + 1]['vs'] if i + 1 < len(SC) else AUDIO
    sc['on'] = (sc['cut'] is None) or (sc['cut'] not in cuts_on)

# --- вырезаемые интервалы озвучки и пересчёт времени
removed = [(sc['vs'], sc['ve']) for sc in SC if not sc['on']]
merged = []
for a, b in removed:
    if merged and abs(merged[-1][1] - a) < 1e-6: merged[-1] = (merged[-1][0], b)
    else: merged.append((a, b))
def rem_before(t): return sum(min(b, t) - a for a, b in merged if t > a)
def fin(t): return (t - rem_before(t)) / SPEED
VOICE_KEPT = AUDIO - sum(b - a for a, b in merged)
FINAL = VOICE_KEPT / SPEED
kept = [sc for sc in SC if sc['on']]
for n, sc in enumerate(SC, 1): sc['id'] = f'S{n:03d}'
day = None
for sc in SC:
    if sc['day'] is not None: day = sc['day'] or None
    sc['hud'] = f'DAY {day}' if day else '—'
    if sc['id'] and sc['place'] == 'GYMDANCE': sc['hud'] = 'DAY 6 · SAT NIGHT'

# --- время якорей
def anchor_time(sc, anchor):
    n = 1
    if '#' in anchor: anchor, n = anchor.split('#'); n = int(n)
    a = norm(anchor); c = 0
    for k in range(sc['w0'], sc['w1']):
        if norm(W[k]['word']) == a:
            c += 1
            if c == n: return W[k]['start']
    raise SystemExit(f'{sc["id"]}: якорь «{anchor}#{n}» не найден в «{sc["text"][:60]}»')
for sc in SC:
    sc['tx'] = [(fin(anchor_time(sc, a)), txt, typ) for a, txt, typ in sc['texts']]

# --- файлы
def row_cells(*c): return '| ' + ' | '.join(str(x).replace('|', '/') .replace('\n', ' ') for x in c) + ' |'
out = []
P = out.append
total_voice_full = AUDIO
cut_len = AUDIO - VOICE_KEPT
P('# Раскадровка: ролик 04, «What If You Could Read Minds for 7 Days?»')
P(f'Этап 2. Основа: `озвучка.mp3` ({AUDIO:.1f} с = {mmss(AUDIO)}, ElevenLabs 1.2) и тайминги слов (`тайминги-слов.json`: Whisper small, текст выровнен по `сценарий.txt`, 98% слов совпало без правок). Владелец ускоряет ролик ещё в 1,2 раза.')
P('')
P('## Хронометраж и лимит владельца (итог 8:00–8:20)')
P(f'- **Озвучка целиком: {mmss(AUDIO)}. Итог после ×1,2 без сокращений: {mmss(AUDIO / SPEED)}.** Лимит 8:20 превышен на {mmss(AUDIO / SPEED - LIMIT_HI)}: **целиком не влезает**.')
P(f'- Нужно срезать не меньше {mmss(AUDIO - LIMIT_HI * SPEED)} озвучки (≈ 160 слов). Предложены 9 сокращений целыми фразами (таблица в `сокращение.md`), срезается {mmss(cut_len)} озвучки.')
if cuts_on:
    P(f'- **В этой раскадровке применены сокращения: {"".join(sorted(cuts_on))}.** Озвучка после сокращений {mmss(VOICE_KEPT)} (в пределах 9:36–10:00: {"да" if 576 <= VOICE_KEPT <= 600 else "нет"}), **итог {mmss(FINAL)}** ({"влезает" if LIMIT_LO <= FINAL <= LIMIT_HI else "НЕ ВЛЕЗАЕТ"} в 8:00–8:20). Если владелец не согласен с каким-то сокращением, достаточно перезапустить `build_storyboard.py --cuts <буквы>`: тайминги и файлы пересчитаются.')
else:
    P(f'- Сокращения НЕ применены (полный текст): итог {mmss(FINAL)}.')
P('- Времена в таблице уже пересчитаны под сокращения и ускорение ×1,2 (`мм:сс.с` от начала итогового ролика); сцены, вырезанные сокращением, перечислены отдельно в конце.')
P('')
P('## Стиль и герои')
P('Стикмены 2D (кодовая кукла Razgon, пак doodle), 16:9, светлый фон, толстый чёрный контур. Герой Leon строго по CLAUDE.md (кепка capBack, красная футболка с молнией, серые шорты, оранжевые кроссовки), рисуется только кодом, позы только `stand/walk/talk/point/sit/…` без `ready/kick/crouch`. Все остальные люди тоже кодом, внешность одинаковая во всех сценах. Новых утверждений владельца не требуется: это обычные дети.')
P('')
P('| Герой | Как выглядит (код Razgon) | Размер | Откуда |')
P('|---|---|---|---|')
for r in [
    ('LEON', 'эталон канала (кепка capBack, брови дугами, красная футболка с молнией, серые шорты, оранжевые кроссовки)', '0.86', 'ролики 01–03'),
    ('ZOE', 'длинные тёмные волосы, жёлтый свитер, сумка через плечо; на танцах жёлтое платье', '1.15 (как KID)', 'новая'),
    ('ROCCO', 'пурпурная худи, поверх потёртая коричневая куртка с заплаткой на рукаве, самый большой в школе (масштаб 1.42), короткие тёмные волосы, мрачное лицо, глаза видны', '1.42', 'из ролика 02 (там взрослый), здесь ребёнок'),
    ('CHASE', 'синяя форма с номером 7, мяч под мышкой, гладкая причёска, уверенная поза', '1.2', 'новая'),
    ('OWEN', 'зелёная толстовка, круглые очки, рыжеватые волосы', '1.12', 'новая (в ролике 02 Omar другой)'),
    ('MS. PARK', 'фиолетовый костюм, пучок, очки (как PARK в ролике 02)', '1.0 (взрослая)', 'из ролика 02'),
    ('LEO', 'новенький: жёлтая куртка, лохматые тёмные волосы, гитара за спиной', '1.15', 'новая'),
    ('MOM, DAD', 'как в ролике 02 (розовое платье и хвост; синяя футболка и короткие волосы)', 'MOM 0.55 / DAD 0.53 относительно роста взрослого', 'из ролика 02'),
    ('BISCUIT', 'собака (картинки OpenAI `assets/animals`, ролик 02), один размер во всех сценах', '—', 'из ролика 02'),
    ('COOL (3 шт.)', 'крутые: куртки разных цветов, причёски разные, поза расслабленная', '1.15–1.2', 'новые'),
    ('KIDS / CROWD', 'дети толпы: разные причёски и цвета (KID…KID6 из `lib.js`), поз `stand/walk/cheer`', '1.15', 'из ролика 02'),
]: P(row_cells(*r))
P('')
P('## Облака-мысли (правило владельца 14.11.2026)')
P('- **Ярусы.** Облака над соседними людьми стоят на разной высоте: ярус 1 (низко, чуть выше макушки), ярус 2, ярус 3, дальше «этажами» (до 8 в толпе). В таблице у каждого облака указан ярус. Облака не перекрывают друг друга, лица и глаза чужих героев, целиком в кадре.')
P('- **Облако ≠ реплика.** Мысль: белое облако с цепочкой кружков от головы, чуть синеватый контур. Сказанные вслух слова: обычный речевой пузырь с хвостом ко рту (`реплика`). Над Leon облака нет никогда; над Dad в финале после полуночи облака нет.')
P('- **Облака живые.** Появляются «хлопком» в момент слов диктора, меняют текст в момент смены мысли, исчезают лопаясь. Облако Biscuit — картинка носка без слов. Текст до 6–8 слов (кроме коротких двустрочных), читается 2–3 секунды, без грубости.')
P('- **Тест без звука.** Облако читается по тексту без озвучки (текст в облаке = цитата диктора).')
P('')
P('## Счётчик DAY (HUD)')
P('Плашка в углу кадра (слева сверху, чтобы не мешать облакам справа): «DAY 1» … «DAY 7», тёмная со скруглёнными углами, жёлтые цифры. На смене дня вылетает с отскоком и мигает один раз. В хуке (понедельник) счётчика ещё нет, он появляется на «Day one». HUD пропадает в «объясняющих» void-вставках без места действия (наука) и в финале. Дни: 1 «Day one» · 2 «And then there are the cool kids» (обед и додж у Chase) · 3 «Day three» · 4 «Day four, dinner» · 5 «And then comes day five» · 6 «Day six» (+ «Saturday night» на танцах) · 7 «All day Sunday».')
P('')
P('## Места (по принципу «гибрид»)')
P('Новые фоны от OpenAI не нужны: подходящие уже нарисованы в роликах 01–03 и лежат в `projects/*/assets/bg/`. Ночные и танцевальные варианты делаются кодом (затемнение, цветные лучи).')
P('')
P('| Код | Место | Фон | Сцен |')
P('|---|---|---|---|')
placecnt = collections.Counter(sc['place'] for sc in kept)
PL = {
    'HALL': ('школьный коридор, шкафчики, двери', '`hall.png` из ролика 02 (OpenAI), берём без трат'),
    'GYM': ('спортзал, дождь мячей, баскетбольные кольца', '`gym.png` из ролика 01 (OpenAI), без трат'),
    'GYMDANCE': ('тот же зал ночью: дискошар, цветные лучи, гирлянды, колонки', '`gym.png` + затемнение и огни кодом'),
    'CLASS': ('класс, доска, парты', '`classroom.png` (ролики 01/02), без трат'),
    'CAFE': ('столовая; крутой стол и обычные столы ставит код', '`cafeteria.png` (ролики 01/02), без трат'),
    'KITCHEN': ('кухня и обеденный стол (утро, ужин)', '`kitchen.png` из ролика 02, без трат'),
    'KITCHENNIGHT': ('та же кухня ночью, тёплая лампа, часы 11:59', '`kitchen.png` + затемнение кодом'),
    'LIVING': ('гостиная, кресло, воскресный день', '`livingRoom.png` (ролики 01/02), без трат'),
    'NIGHT': ('ночная улица перед домом', '`street_night.png` из ролика 02, без трат'),
    'VOID': ('светлый абстрактный фон для правил, списков, науки', 'код'),
}
for k, (a, b) in PL.items():
    P(row_cells(k, a, b, placecnt.get(k, 0)))
P('')
P('## Сцены')
P('Время: `мм:сс.с` от начала итогового ролика (после сокращений и ×1,2); конец сцены = начало следующей.')
P('')
P('| № | Время | Озвучка | Место | Кадр | Текст на экране | Анимация | Ассеты | HUD |')
P('|---|---|---|---|---|---|---|---|---|')
durs = []
tx_total = 0
for sc in kept:
    s, e = fin(sc['vs']), fin(sc['ve'])
    durs.append((e - s, sc['id']))
    txs = '; '.join(f'`{mmss(t)}` {x}' for t, x, ty in sc['tx']) or '—'
    tx_total += len(sc['tx'])
    P(row_cells(sc['id'], f'{mmss(s)}–{mmss(e)}', sc['text'], sc['place'], sc['visual'], txs, sc['motion'], sc['assets'], sc['hud']))
P('')
if removed:
    P('## Сцены, вырезанные сокращениями (в таблице выше их нет)')
    P('| № | Сокращение | Озвучка |')
    P('|---|---|---|')
    for sc in SC:
        if not sc['on']: P(row_cells(sc['id'], sc['cut'], sc['text']))
    P('')
P('## Итоги')
P(f'- Сцен в ролике: {len(kept)}. Средняя длина {sum(d for d, _ in durs) / len(durs):.1f} с, самая длинная {max(durs)[0]:.1f} с ({max(durs)[1]}), самая короткая {min(durs)[0]:.1f} с ({min(durs)[1]}). Длинные сцены оживляются сменой позы и плана внутри сцены.')
P(f'- Итог ролика {mmss(FINAL)} (озвучка {mmss(VOICE_KEPT)}).')
P(f'- Строк текста на экране (облака, реплики, плашки, подписи): {tx_total}.')
P('- Слотов (поиск картинок): 0. Всё кодом из готовых фонов и листов предметов; новых фонов нет.')
P('- Ключевые гэги без звука: хук (облака Rocco, Chase, Zoe на разных ярусах), носок Biscuit, «LEO / LEON», Dad «SAY NO → OKAY», шум из двух сотен облаков, «LEON» в облаках на дне 6, кухня после полуночи без облака.')
P('- Логика и числа: «Monday morning, five past eight» — подпись 8:05 AM; «Saturday night» = вечер 6-го дня (в сценарии «Day six» — дневной коридор, потом «Saturday night» — танцы: HUD «DAY 6 · SAT NIGHT»); «Sunday» = день 7; «Eleven fifty-nine» — часы 11:59 PM на стене кухни. Облако над Leon нет нигде.')
open(os.path.join(HERE, 'storyboard.md'), 'w', encoding='utf-8').write('\n'.join(out) + '\n')

# text_elements.md
o = ['# Текст на экране: ролик 04', 'Готовые строки: время от начала итогового ролика (после сокращений и ×1,2), текст копируется как есть. Облака — белые с цепочкой кружков от головы, чёрный жирный текст; реплики — речевые пузыри; плашки — тёмные; счётчик DAY — в левом верхнем углу.', '',
     '| № сцены | Время | Текст | Тип |', '|---|---|---|---|']
for sc in kept:
    if sc['day']:
        o.append(row_cells(sc['id'], mmss(fin(W[sc['w0']]['start'])), f'DAY {sc["day"]}', 'HUD день'))
    for t, x, ty in sc['tx']:
        if ty == 'счётчик дня': continue
        o.append(row_cells(sc['id'], mmss(t), x, ty))
open(os.path.join(HERE, 'text_elements.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')

# manifest.csv
with open(os.path.join(HERE, 'manifest.csv'), 'w', encoding='utf-8', newline='') as f:
    wr = csv.writer(f)
    wr.writerow(['scene', 'start', 'end', 'dur', 'vo', 'place', 'visual', 'onscreen_text', 'motion', 'assets', 'hud'])
    for sc in kept:
        s, e = fin(sc['vs']), fin(sc['ve'])
        wr.writerow([sc['id'], mmss(s), mmss(e), f'{e - s:.1f}', sc['text'], sc['place'], sc['visual'], '; '.join(f'{mmss(t)} {x}' for t, x, ty in sc['tx']), sc['motion'], sc['assets'], sc['hud']])

# паспорта-сцен.md
o = ['# Паспорта сцен: ролик 04', 'Правило `логика-кадров.md`: до кода записать, где стоит каждый объект, куда направлен, кто смотрит и какой размер. Паспорта идут только для сложных сцен (толпа, облака ярусами, предметы, действие).', '']
for sc in SC:
    if sc['passport'] and sc['on']:
        o += [f'## {sc["id"]} ({sc["place"]}): {sc["text"][:70]}', sc['passport'], '']
open(os.path.join(HERE, 'паспорта-сцен.md'), 'w', encoding='utf-8').write('\n'.join(o))

# ассеты.md
cnt = collections.Counter()
for sc in kept:
    for a in [x.strip() for x in sc['assets'].split(';') if x.strip()]:
        cnt[a.split('(')[0].strip()] += 1
o = ['# Список картинок и предметов: ролик 04', 'Из раскадровки. Число = в скольких сценах нужен ассет. Герои, облака, счётчик, надписи, действие — кодом; картинки OpenAI только для фонов и сложных предметов (гибрид).', '', '| Ассет | Сцен |', '|---|---|']
for a, n in cnt.most_common(): o.append(f'| {a} | {n} |')
open(os.path.join(HERE, 'ассеты.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')

# сокращение.md + сценарий-сокращённый.txt + тайминги после сокращений
o = ['# Сокращение озвучки под лимит 8:20 (ролик 04)', '',
     f'Озвучка целиком {mmss(AUDIO)}, при ×1,2 это **{mmss(AUDIO / SPEED)}** — на {mmss(AUDIO / SPEED - LIMIT_HI)} длиннее лимита владельца (итог 8:00–8:20, озвучка 9:36–10:00). Причина: диктор читает медленнее нормы (≈ 130 слов в минуту вместо 150), в тексте 1 463 слова.', '',
     'Предложение: убрать целые фразы (резать можно прямо в mp3 по паузам, без переозвучки). Резы ставятся по середине паузы между фразами. Все фразы взяты так, чтобы смысл и крючки не терялись.', '',
     '| Буква | Что срезаем | Озвучка (мм:сс в исходнике) | Сколько секунд озвучки |', '|---|---|---|---|']
tot = 0
for L in CUTS_ALL:
    seg = [(sc['vs'], sc['ve'], sc['text']) for sc in SC if sc['cut'] == L]
    a, b = seg[0][0], seg[-1][1]
    ln = sum(y - x for x, y, _ in seg); tot += ln
    o.append(row_cells(L, CUT_INFO[L], f'{mmss(a)}–{mmss(b)}', f'{ln:.1f}'))
o += ['', f'**Итого срезается {tot:.1f} с озвучки.** Озвучка после сокращений {mmss(AUDIO - tot)}, итог после ×1,2 = **{mmss((AUDIO - tot) / SPEED)}** (лимит 8:00–8:20: {"влезает" if LIMIT_LO <= (AUDIO - tot) / SPEED <= LIMIT_HI else "не влезает"}). Запас до 8:20: {(LIMIT_HI - (AUDIO - tot) / SPEED):.0f} с.', '',
      'Что получилось читаться плавно (проверено по тексту): хук и правила без изменений (кроме строки про носок и про «разные высоты»: её показывает картинка), дни 1–4 теряют по одной проходной фразе, день 5 теряет две научные справки, наука в конце теряет Texas 2023 и оставляет «illusion of transparency» (главная мысль).',
      '', 'Если какое-то сокращение владельцу жаль, можно взять другое из запасных (если нужно, сказать): «Zoe, the girl Leon has been trying not to look at since September.» (4,0 с), «Leon stares at that cloud for a very long minute.» (3,6 с), «Leon is basically running the house.» (2,3 с).', '',
      'Файлы: `сценарий-сокращённый.txt` (текст после сокращений, для сверки), `озвучка-сокращённая.mp3` (если запущено `--audio-cut`), `тайминги-слов-сокращённые.json` (времена слов в озвучке после сокращений, до ×1,2).']
open(os.path.join(HERE, 'сокращение.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
# сокращённый текст по абзацам
cut_idx = set()
for sc in SC:
    if not sc['on']: cut_idx.update(range(sc['w0'], sc['w1']))
paras, idx = [], 0
for para in re.split(r'\n\s*\n', script_text.strip()):
    n = len(para.split()); toks = [t for k, t in enumerate(para.split()) if idx + k not in cut_idx]; idx += n
    if toks: paras.append(' '.join(toks))
open(os.path.join(HERE, 'сценарий-сокращённый.txt'), 'w', encoding='utf-8').write('\n\n'.join(paras) + '\n')
# слова после сокращений (время озвучки без ×1,2)
nw = []
for k, w in enumerate(W):
    if k in cut_idx: continue
    nw.append({'word': w['word'], 'start': round(w['start'] - rem_before(w['start']), 3), 'end': round(w['end'] - rem_before(w['end']), 3)})
json.dump({'audio': 'озвучка-сокращённая.mp3', 'audio_sec': round(VOICE_KEPT, 2), 'speedup': SPEED, 'cuts': ''.join(sorted(cuts_on)), 'note': 'секунды озвучки после сокращений, до ускорения ×1,2', 'words': nw}, open(os.path.join(HERE, 'тайминги-слов-сокращённые.json'), 'w', encoding='utf-8'), ensure_ascii=False)

# смета
open(os.path.join(HERE, 'смета.md'), 'w', encoding='utf-8').write('''# Смета на картинки: ролик 04 (оценка, не списание; ждёт «ок» владельца)
Принцип «гибрид» (CLAUDE.md): богатые фоны и сложные предметы можно делать в OpenAI, героев, облака, счётчик DAY, надписи и действие рисует код Razgon. **Генерация НЕ запущена, перед стартом нужен явный «ок».**

## Фоны мест: 0 новых картинок, 0 центов
Все нужные места уже есть в готовом виде (OpenAI, оплачено в роликах 01–03) и проверены на ролике 02: коридор со шкафчиками (`hall.png`), спортзал (`gym.png`), класс (`classroom.png`), столовая (`cafeteria.png`), кухня (`kitchen.png`), гостиная (`livingRoom.png`), ночная улица (`street_night.png`). Они одного стиля с этим роликом (тот же пак doodle), поэтому новые фоны только повторяли бы то, что есть. Ночная кухня и танцевальный зал делаются кодом: затемнение, тёплый свет лампы, цветные лучи и дискошар. Столы столовой и крутой стол ставит код.

Если владелец хочет всё-таки новые фоны «под этот ролик» (например, коридор с другим освещением): `gpt-image-2.5-sunburst`, medium, референс — готовый фон, ≈ 2,3 цента за картинку; на 6 фонов ≈ 14 центов, потолок с пересъёмкой ≈ 28 центов. Рекомендация: не тратить.

## Листы предметов (по желанию, один лист ровно по 8 предметов, сетка 4×2, зелёный #00FF00, без `--ref`)
Нужны предметы, которые кодом выглядят беднее (сложные формы): 1 лист «школа и дом»: гитара, поднос с едой, носок в полоску (для облака Biscuit), коробка игры с ценником, чашка чая с паром, красный мяч, колонки, брокколи. Остальное (мел, записка, морковка, телефон, вилка, часы, календарь, иконки) рисует код.
| Что | Кол-во | Модель, качество | Итого |
|---|---|---|---|
| Лист предметов, поиск | 1 | `gpt-image-2.5-flare`, low | ≈ 0,5 цента |
| Лист предметов, финал | 1 | `gpt-image-2.5-sunburst`, medium | ≈ 1,1 цента |
| **Итого одна попытка** | | | **≈ 1,6 цента** |

Правило владельца: одна попытка за запуск, результат сразу показывается, правка только по слову владельца. Потолок без нового «ок»: ≈ 2 цента. Вся стоимость расчёта по токенам (выход $30 за 1 млн, текст $5, референс $8).

**Итого всего ролика: от 0 до ≈ 2 центов. Рекомендация: один лист предметов (≈ 1,6 цента) или вообще без OpenAI, если носок и гитару нарисует код.**
''')

# озвучка-сокращённая
if '--audio-cut' in args:
    keep = []; last = 0.0
    for a, b in merged:
        if a > last: keep.append((last, a))
        last = b
    if last < AUDIO: keep.append((last, AUDIO))
    fc = ';'.join(f'[0:a]atrim={a:.3f}:{b:.3f},asetpts=PTS-STARTPTS,afade=t=in:d=0.02,afade=t=out:st={max(0, b - a - 0.04):.3f}:d=0.04[a{i}]' for i, (a, b) in enumerate(keep))
    fc += ';' + ''.join(f'[a{i}]' for i in range(len(keep))) + f'concat=n={len(keep)}:v=0:a=1[o]'
    subprocess.check_call(['ffmpeg', '-y', '-v', 'error', '-i', os.path.join(HERE, 'озвучка.mp3'), '-filter_complex', fc, '-map', '[o]', '-c:a', 'libmp3lame', '-q:a', '2', os.path.join(HERE, 'озвучка-сокращённая.mp3')])
    print('озвучка-сокращённая.mp3 собрана, вырезов:', len(merged))
print(f'сцен {len(kept)} (всего {len(SC)}), озвучка {mmss(AUDIO)} → {mmss(VOICE_KEPT)}, итог {mmss(FINAL)} = {FINAL:.1f} с')
