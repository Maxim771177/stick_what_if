# -*- coding: utf-8 -*-
"""Раскадровка ролика 12 из scenes_data.py + тайминги-слов.json.
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
from scenes_data import SC
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
P('# Раскадровка: ролик 12, «What If You Were the Only Boy on an Island Full of Girls?»')
P(f'Основа: `озвучка.mp3` ({AUDIO:.1f} с = {mmss(AUDIO)}, ElevenLabs 1.2, без сокращений) и тайминги слов (`тайминги-слов.json`: Whisper small.en, выровнено по `сценарий.txt`, 99% слов совпало). Ролик ускоряется ещё ×1,2. Стиль: гибрид Razgon + vizavi (`скилы/hybrid-razgon-vizavi/SKILL.md`): герои и движение Razgon, камера, глубина, стикеры и звук vizavi.')
P('')
P('## Хронометраж (лимит владельца: итог 8:00–9:00)')
P(f'- Озвучка {mmss(AUDIO)}, после ×1,2: **{mmss(AUDIO / SPEED)}**, плюс хвост {TAIL:.1f} с тишины, **итог {mmss(FINAL)}**, в окне 8:00–9:00: {"да" if LIMIT_LO <= FINAL <= LIMIT_HI else "НЕТ"}. Сокращений нет.')
P('- Времена `мм:сс.с` от начала итогового ролика (после ×1,2); конец сцены = начало следующей.')
P('')
P('## Герои (все кодовые куклы Razgon, одинаковые во всех сценах, глаза всегда видны)')
P('Новые девочки собираются в коде и **один кадр-сравнение уходит владельцу на «утверждён» до сборки сцен** (правило «новый герой»). Все кепки Leon только `capBack`.')
P('')
P('| Герой | Как выглядит | Откуда | Рост |'); P('|---|---|---|---|')
for r in [
    ('LEON', 'эталон канала: кепка capBack, красная футболка с молнией, серые шорты, оранжевые кроссовки (в море мокрый: тёмнее футболка)', 'ролики 01–11', '1,0'),
    ('HAZEL', 'капитан: огромные кудрявые рыжие волосы, жёлтая спортивная куртка, синие шорты, бело-синий свисток на шнурке, брови строгие (дугой вниз), широкий рот', 'новая, кодом', '1,05'),
    ('IVY', 'тихая брюнетка: тёмно-каштановый хвост, красный ободок, бирюзовая толстовка, юбка-шорты, сапоги (ночью), брови мягкие, глаза большие; в сцене 1 в жилете спасательном', 'новая, кодом', '1,0'),
    ('POPPY', 'блондинка с двумя пучками, розовая футболка с ананасом, вечно жуёт крекер (в руке или во рту), круглые щёки', 'новая, кодом', '0,95'),
    ('GIRLS ×16', 'массовка: 16 девочек в одинаковых сине-белых куртках команды по парусному спорту, разные причёски и цвета волос (хвост, косы, каре, пучок, афро, очки без закрытия глаз); при реакции лицо «удивлён», руки вверх', 'новые, кодом (вариации одной заготовки)', '0,9–1,05'),
    ('COACH DUNN', 'как в роликах 04–11 (тренер: свисток, красная куртка), на катере в штурмовке капитана', 'прошлые ролики', '1,2'),
    ('BOYS ×12', 'в финале только силуэты на причале вдали (без лиц)', 'кодом, силуэты', '1,0'),
]: P(row(*r))
P('')
P('## Места')
P('Богатые фоны (пляж, джунгли, скалы, туман) делаются как в ролике 11: код как основа, OpenAI-фоны подключаются позже по цене и «ок» владельца (в этой раскадровке OpenAI не запускался). Абстрактные места (схемы, плашки) кодом.')
P('')
P('| Код | Место | Сцен |'); P('|---|---|---|')
cnt = collections.Counter(sc['place'] for sc in SC)
PL = {'DECK': 'палуба школьного катера на рифе в тумане', 'SEA': 'открытое море, шлюпка уходит в туман',
      'BEACH': 'пляж с лагерем девочек: шалаш, 6–7 палаток, брёвна у кромки джунглей', 'BOYCAMP': 'лагерь Leon за большим камнем у пальм',
      'TIDEL': 'вид на пляж с линией водорослей и линией брёвен', 'CAMPN': 'лагерь ночью/утром (воронка из брезента, бутылки)',
      'CAMP_N': 'лагерь ночью в шторм', 'CHAN': 'пролив с течением, плот, островок с водопадом в дальнем плане',
      'ROCKS_N': 'скалы ночью под ливнем', 'DAWN': 'скалы на рассвете в тумане, SOS из палочек', 'BOAT': 'катер Dunn на воде, причал вдали',
      'VOID': 'абстрактный фон: схемы, плашки, карточки'}
for k, v in PL.items(): P(row(k, v, cnt.get(k, 0)))
P('')
P('## Сквозные крючки (где они в кадре)')
P('- **Таймер** HUD в правом верхнем углу (стикер): 72:00:00 → 69 (голосование) → 60 (кровать) → 56 (прилив) → 46 (вода) → 34 (плот) → 30 (после плота) → 04, 03, 02 (шторм) → 00:00:00 (катер). В тексте озвучки сказано «thirty hours left», «four hours to go», «Four. Three. Two»; остальные значения наши, не противоречат речи.')
P('- **Табло одобрения**: 0 % → 5 → 15 → 0 → 100; плашка в углу кадра, не на головах.')
P('- **Кепка Leon**: слетает (S008) → Ivy вылавливает (S009–S011) → у Ivy на пляже (S094) → Ivy надевает на Leon (S138, рассвет). На всех кадрах между S008 и S138 голова Leon без кепки (волосы: коричневый чуб-волна), кепка у Ivy в руке или на поясе.')
P('- **Пакет светящихся палочек**: у Leon в руках в каждой сцене от S007, кроме сцен плота (S082–S093): там пакет остался у палатки, поставить рядом с палаткой Leon.')
P('- **Две линии на песке**: водоросли ближе к воде, брёвна выше лагеря; порядок с моря: вода → линия водорослей → лагерь → линия брёвен → джунгли, одинаково во всех кадрах пляжа.')
P('')
P('## Сцены')
P(''); P('| № | Время | Озвучка | Место | Кадр | Текст на экране | Анимация | Камера (гибрид) | Ассеты |'); P('|---|---|---|---|---|---|---|---|---|')
durs = []; tx_total = 0
for sc in SC:
    s, e = fin(sc['vs']), fin(sc['ve']); durs.append((e - s, sc['id']))
    txs = '; '.join(f'`{mmss(t)}` {x}' for t, x, ty, w in sc['tx']) or '—'; tx_total += len(sc['tx'])
    P(row(sc['id'], f'{mmss(s)}–{mmss(e)}', sc['text'], sc['place'], sc['visual'], txs, sc['motion'], sc['cam'] or '—', sc['assets']))
P('')
P('## Итоги')
P(f'- Сцен: {len(SC)}. Средняя длина {sum(d for d, _ in durs) / len(durs):.1f} с, самая длинная {max(durs)[0]:.1f} с ({max(durs)[1]}), самая короткая {min(durs)[0]:.1f} с ({min(durs)[1]}). Итог {mmss(FINAL)}.')
P(f'- Строк текста на экране: {tx_total}.')
P('- Гэги без звука: Leon среди девочек с кружком «ONLY BOY», Poppy жуёт при голосовании, кокос на голову, кровать плывёт как лодка, карта Hazel без Leon, плот разваливается на бочки, Ivy забирает бутылку обратно, Hazel в одном башмаке, Poppy обнимает скалу, SOS из света, кепка на голове Leon, девочки смотрят на причал как на должника.')
P('- Логика: катер (рифы) → правила (тройки, Hazel) → голосование 0 % → проблема 1 (прилив, две линии) → проблема 2 (вода) → проблема 3 (плот, течение) → шторм (линии сработали, «Please») → SOS → голосование 100 % → кепка → крючок про мальчиков.')
open(os.path.join(HERE, 'storyboard.md'), 'w', encoding='utf-8').write('\n'.join(o) + '\n')
tt = ['# Текст на экране: ролик 12', 'Время от начала итогового ролика (после ×1,2). cap — подпись; plate — плашка; say — реплика (кто); card — карточка; hud — таймер; boom — взрыв-стикер.', '', '| № сцены | Время | Текст | Тип | Кто |', '|---|---|---|---|---|']
for sc in SC:
    for t, x, ty, w in sc['tx']: tt.append(row(sc['id'], mmss(t), x, ty, w or '—'))
open(os.path.join(HERE, 'text_elements.md'), 'w', encoding='utf-8').write('\n'.join(tt) + '\n')
with open(os.path.join(HERE, 'manifest.csv'), 'w', encoding='utf-8', newline='') as f:
    wr = csv.writer(f); wr.writerow(['scene', 'start', 'end', 'dur', 'vo', 'place', 'visual', 'onscreen_text', 'motion', 'camera', 'assets'])
    for sc in SC:
        s, e = fin(sc['vs']), fin(sc['ve']); wr.writerow([sc['id'], mmss(s), mmss(e), f'{e - s:.1f}', sc['text'], sc['place'], sc['visual'], '; '.join(f'{mmss(t)} {x}' for t, x, ty, w in sc['tx']), sc['motion'], sc['cam'], sc['assets']])
pp = ['# Паспорта сложных сцен: ролик 12', 'Правило `логика-кадров.md`: объект | опора | куда направлен | что делает герой | кто смотрит | размер.', '']
seen = {}
for sc in SC:
    if sc['passport']:
        key = sc['passport']
        if key in seen: pp += [f'## {sc["id"]} ({sc["place"]}): {sc["text"][:70]}', f'то же, что в {seen[key]}', '']
        else: seen[key] = sc['id']; pp += [f'## {sc["id"]} ({sc["place"]}): {sc["text"][:70]}', sc['passport'], '']
pp += ['## Общие правила ролика',
 '- Leon целиком в кадре в каждой сцене (кроме врезок), глаза у всех видны, кепка только capBack. Кепки нет на голове Leon между S008 и S138: она у Ivy.',
 '- Порядок на пляже с моря: вода → линия водорослей → лагерь → линия брёвен → джунгли. Не нарушать ни в одном кадре.',
 '- Катер: нос вправо на рифе в сцене 1; у Dunn на рассвете нос влево к буквам; в финале нос вправо к причалу.',
 '- Девочек всегда 19 (Hazel, Ivy, Poppy и 16): в групповых кадрах считать; лица реагируют на событие.',
 '- Таймер и табло одобрения в углу (стикер), не на головах; подписи уходят от головы (`freeX`).',
 '- Масштаб: палатка ≈ 1,3 роста Leon, бревно ≈ 1,5, катер ≈ 8, плот ≈ 2, буквы SOS ≈ 3 роста каждая.',
 '- Туман: дальний план, размытие DOF; ближний план размывается.',
 '', '## Смета', '- OpenAI в раскадровке не запускался. Фоны от OpenAI (по правилу «гибрид») запрашиваются отдельно с ценой и «ок» владельца.', f'- Всё остальное кодом: {len(SC)} сцен; рендер на этом Mac.']
open(os.path.join(HERE, 'паспорта-сцен.md'), 'w', encoding='utf-8').write('\n'.join(pp) + '\n')
ac = collections.Counter()
for sc in SC:
    for a in [x.strip() for x in sc['assets'].split(';') if x.strip()]: ac[a] += 1
oo = ['# Список картинок и предметов: ролик 12', 'Все герои, схемы, подписи и действие кодом.', '', '| Ассет | Сцен |', '|---|---|']
for a, n in ac.most_common(): oo.append(f'| {a} | {n} |')
open(os.path.join(HERE, 'ассеты.md'), 'w', encoding='utf-8').write('\n'.join(oo) + '\n')
data = {'title': 'What If You Were the Only Boy on an Island Full of Girls?', 'speed': SPEED, 'duration': round(FINAL, 3),
        'scenes': [{'id': sc['id'], 'start': round(fin(sc['vs']), 3), 'end': round(fin(sc['ve']), 3), 'place': sc['place'], 'line': sc['text'],
                    'visual': sc['visual'], 'motion': sc['motion'], 'camera': sc['cam'], 'assets': sc['assets'],
                    'texts': [{'t': round(t, 3), 's': x, 'k': ty, **({'who': w} if w else {})} for t, x, ty, w in sc['tx']]} for sc in SC],
        'words': [{'word': x['word'], 'start': round(x['start'] / SPEED, 3), 'end': round(x['end'] / SPEED, 3)} for x in W]}
json.dump(data, open(os.path.join(HERE, 'сцены.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'сцен {len(SC)}, озвучка {mmss(AUDIO)} → итог {mmss(FINAL)} = {FINAL:.1f} с; текстов {tx_total}; средняя {sum(d for d, _ in durs) / len(durs):.1f} с, макс {max(durs)[0]:.1f} ({max(durs)[1]})')
print('длинные >7 с:', ' '.join(f'{i}:{d:.1f}' for d, i in durs if d > 7))
print('короткие <1,2 с:', ' '.join(f'{i}:{d:.1f}' for d, i in durs if d < 1.2))
