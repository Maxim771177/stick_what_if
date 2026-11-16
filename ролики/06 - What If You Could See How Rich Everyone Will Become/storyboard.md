# Раскадровка: ролик 06, «What If You Could See How Rich Everyone Will Become?»
Основа: `озвучка.mp3` (590.1 с = 09:50.1, ElevenLabs 1.2) и тайминги слов (`тайминги-слов.json`: Whisper small, выровнено по `сценарий.txt`, 97% слов совпало). Ролик ускоряется ещё ×1,2.

## Хронометраж (лимит владельца: итог 8:00–8:20)
- Озвучка целиком 09:50.1, после ×1,2: **08:11.7**: на 00:00.0 короче 8:00. Сокращать не нужно, наоборот: в конец добавлено 2.5 с тишины (финальный кадр держится), **итог 08:14.2**, в окне 8:00–8:20: да. Исходный `озвучка.mp3` не тронут; проектный `input/voiceover.mp3` = озвучка ×1,2 + хвост.
- Времена `мм:сс.с` от начала итогового ролика; конец сцены = начало следующей.

## Герои
Все герои кодовые куклы Razgon, внешность одинаковая во всех сценах. Новые: Walt (бездомный) и девочка из крючка (GIRL); остальные из роликов 02–05.

| Герой | Как выглядит | Откуда |
|---|---|---|
| LEON | эталон канала (кепка capBack, красная футболка с молнией, серые шорты, оранжевые кроссовки); число над головой синее | ролики 01–05 |
| WALT | бездомный: рваная оливковая куртка с капюшоном, шапка-бини, седая борода, ботинки в скотче, глаза видны; число над головой зелёное крупное | новый, кодом |
| GIRL | девочка с остановки: жёлтая куртка, длинные тёмные волосы, ручка; крючок | новая, кодом |
| OWEN | зелёная толстовка, круглые очки, рыжеватые волосы | ролики 04–05 |
| CHASE, ZOE | как в роликах 04–05 | ролики 04–05 |
| MS. PARK | фиолетовый костюм, пучок, очки | ролики 02–05 |
| DAD, MOM | как в ролике 02 | ролики 02–05 |
| BISCUIT | собака (картинки OpenAI из ролика 02), один размер | ролики 02–05 |
| MAN, GUARD, MAILMAN, OLDMAN, SKATER, прохожие | второстепенные взрослые и дети из `lib.js`, глаза видны | кодом |

## Места
Фоны OpenAI не нужны (0 центов): kitchen, livingRoom, classroom, gym из роликов 01–05; парк, поле — код ролика 05; новые места кодом: магазин (Maple Street, витрина), переулок с мусорным баком, гараж Owen, остановка, комната ночью (= kitchenNight). Числа над головами, чертежи, карточки, дорога с флажком — код.

| Код | Место | Сцен |
|---|---|---|
| STREET | улица у хозяйственного магазина (витрина, стена, дождь) | 26 |
| VOID | абстрактный фон: схемы, карточки, доска, дорога | 28 |
| KITCHEN | кухня | 8 |
| LIVING | гостиная | 2 |
| PARK | парк (код ролика 05) | 11 |
| CLASS | класс | 6 |
| GARAGE | гараж Owen (код) | 13 |
| ALLEY | переулок с мусорным баком в дождь (код) | 10 |
| GYM | школьный зал: кружок робототехники | 18 |
| BUSSTOP | остановка (код) | 4 |
| NIGHT | ночная комната (kitchenNight) | 1 |

## Сцены

| № | Время | Озвучка | Место | Кадр | Текст на экране | Анимация | Ассеты |
|---|---|---|---|---|---|---|---|
| S001 | 00:00.0–00:03.3 | Tuesday, seven fifty-two in the morning, Maple Street. | STREET | Хозяйственный магазин на Maple Street, табличка улицы, утро. Leon бежит к автобусу с рюкзаком. | `00:00.0` TUESDAY · 7:52 AM | Leon бежит слева направо | BG код: магазин; LEON |
| S002 | 00:03.3–00:06.4 | Leon is running for the bus, but he stops at the hardware store, | STREET | Leon тормозит у стены магазина: у стены сидит Walt с картонкой и бумажным стаканчиком. | — | Leon тормозит | LEON; WALT; sign; cup |
| S003 | 00:06.4–00:10.6 | because a man is sitting against the wall with a paper cup and a cardboard sign. | STREET | Крупнее: Walt, картонка «HUNGRY», стаканчик с мелочью, рваная куртка. | — | камера наезжает | WALT; sign; cup |
| S004 | 00:10.6–00:13.9 | Leon has exactly two dollars, his bus money. | STREET | Leon достаёт две бумажки по доллару, смотрит на них; над ними «$2». | `00:12.2` $2 · BUS MONEY | Leon достаёт деньги | LEON; dollars |
| S005 | 00:13.9–00:15.4 | He drops it in the cup. | STREET | Две бумажки падают в стаканчик Walt. | — | бумажки летят в стаканчик | LEON; WALT; cup; dollars |
| S006 | 00:15.4–00:18.5 | "Thanks, kid," the man says, and looks up. | STREET | Walt поднимает глаза на Leon и благодарит, улыбается. | `00:15.8` THANKS, KID. | Walt поднимает голову | WALT; LEON |
| S007 | 00:18.5–00:24.0 | And that's when Leon sees it. A glowing number, hanging in the air above the man's head. | STREET | Leon застыл, глаза вверх: над Walt проявляется светящееся число. | — | число проявляется со вспышкой | LEON; WALT; number |
| S008 | 00:24.0–00:29.8 | Six billion, three hundred and ten million dollars. | STREET | Крупно: Walt и над ним зелёное светящееся число $6,310,000,000. Leon снизу, смотрит вверх. | — | число пульсирует | WALT; LEON; number |
| S009 | 00:29.8–00:31.4 | Leon looks at the torn jacket. | STREET | Рваная куртка Walt: дыра на рукаве, заплатка. | — | камера по куртке вниз | WALT; jacket |
| S010 | 00:31.4–00:33.4 | The shoes held together with tape. | STREET | Ботинки Walt, обмотанные скотчем. | — | крупно ботинки | WALT; shoes; tape |
| S011 | 00:33.4–00:35.1 | Then back at the number. | STREET | Leon резко смотрит снова вверх, на число, глаза круглые. | — | Leon вздрагивает | LEON; WALT; number |
| S012 | 00:35.1–00:37.6 | Then at his own reflection in the shop window. | STREET | Витрина магазина, в стекле отражение Leon; над его отражением синее число. | — | Leon у витрины | LEON; window; reflection |
| S013 | 00:37.6–00:41.8 | Sixty-one thousand, four hundred dollars. | STREET | Крупно отражение Leon и число $61,400 синим. | — | число появляется | LEON; number |
| S014 | 00:41.8–00:50.5 | Leon is ten years old, he is about to walk to school, and he has just lost a money contest to a man with a paper cup. | VOID | Табло «MONEY CONTEST»: слева Leon с $61,400, справа Walt с $6,310,000,000 и бумажным стаканчиком; Walt побеждает. | `00:42.5` MONEY CONTEST | шкалы растут, у Walt гигантская | LEON; WALT; scoreboard |
| S015 | 00:50.5–00:53.8 | How? Leon has no idea. | STREET | Leon пожимает плечами, над головой знак вопроса, Walt позади. | — | Leon пожимает плечами | LEON; WALT; qmark |
| S016 | 00:53.8–00:59.1 | But by Saturday, he'll know exactly how, and what it costs to find out. | VOID | Календарь: вторник зачёркнут, обведена суббота; рядом ценник «?». | `00:54.4` BY SATURDAY | календарь листается | calendar; price tag |
| S017 | 00:59.1–01:03.3 | So, what if you could see how rich everyone will become? | VOID | Leon радуется, над ним название ролика. | `00:59.5` WHAT IF YOU COULD SEE HOW RICH EVERYONE WILL BECOME? | название, искры | LEON |
| S018 | 01:03.3–01:04.6 | Here's how it works. | VOID | Доска, Leon показывает на неё указкой; на доске «HOW IT WORKS». | — | Leon у доски | LEON; board |
| S019 | 01:04.6–01:10.3 | Rule one. The number above a head is the most money that person will ever have, if nothing changes. | VOID | Доска «RULE 1»: человек со светящимся числом, подпись «MOST MONEY EVER» со стрелкой на число. | `01:04.8` RULE 1 · THE MOST YOU’LL EVER HAVE | число над человеком, стрелка | LEON; board; person |
| S020 | 01:10.3–01:14.1 | Rule two. The number changes the second something else does. | VOID | Доска «RULE 2»: число над человеком меняется (старое зачёркнуто, новое выше). | `01:10.9` RULE 2 · IT CHANGES | число меняется | LEON; board |
| S021 | 01:14.1–01:17.9 | A new job, a big choice, one bad day. | VOID | Три значка один за другим: портфель (NEW JOB), развилка (BIG CHOICE), тучка (BAD DAY), над каждым число прыгает. | `01:14.5` NEW JOB; `01:15.3` BIG CHOICE; `01:16.9` ONE BAD DAY | значки по очереди | icons |
| S022 | 01:17.9–01:25.1 | Rule three. It shows money and nothing else. Not how, not when, and not whether anyone is happy. | VOID | Доска «RULE 3»: число, рядом три зачёркнутых слова HOW · WHEN · HAPPY? | `01:18.6` RULE 3 · MONEY, NOTHING ELSE | слова зачёркиваются по очереди | board; number |
| S023 | 01:25.1–01:26.8 | You can't turn it off. | VOID | Leon трёт глаза, закрывает ладонями: число над соседом всё равно светится. | — | Leon жмурится, число светится | LEON; person; number |
| S024 | 01:26.8–01:29.7 | Leon sprints home to check his family. | KITCHEN | Leon влетает на кухню, на ходу смотрит на семью. | — | Leon вбегает | BG kitchen; LEON; MOM; DAD |
| S025 | 01:29.7–01:33.0 | Mom, two million, three hundred thousand dollars. | KITCHEN | Mom у плиты, над ней зелёное число $2,300,000. | — | число появляется | BG kitchen; MOM; LEON; number |
| S026 | 01:33.0–01:35.6 | Mom drives a car with one working window. | VOID | Старая машина сбоку, окна: три разбиты (заклеены картоном), одно целое с зелёной галочкой. | `01:34.1` ONE WORKING WINDOW | машина слегка трясётся | car |
| S027 | 01:35.6–01:38.5 | Dad, four hundred and eighty thousand. | KITCHEN | Dad за столом с газетой, над ним $480,000. | — | число появляется | BG kitchen; DAD; LEON; number |
| S028 | 01:38.5–01:41.2 | And Biscuit, the dog, seven dollars. | KITCHEN | Biscuit сидит, виляет хвостом, над ним зелёное число $7. | — | хвост виляет | BG kitchen; BISCUIT; LEON; number |
| S029 | 01:41.2–01:44.8 | Leon is fairly sure that's one large sausage. | KITCHEN | Над Biscuit облачко с большой сосиской, Leon кивает. | — | сосиска в облачке | BISCUIT; LEON; sausage |
| S030 | 01:44.8–01:48.3 | Day one. Let's start with power. | VOID | Leon со скрещёнными руками, весёлый, плашка DAY 1. | `01:46.0` DAY 1 · POWER | плашка | LEON |
| S031 | 01:48.3–01:50.8 | Plus number one, allowance. | KITCHEN | Leon и Mom на кухне. | `01:49.0` PLUS #1 · ALLOWANCE | плашка | BG kitchen; LEON; MOM |
| S032 | 01:50.8–01:58.9 | Leon looks at Mom's number, looks at Mom, and says, "Technically, you'll have two million dollars, so five of them won't matter." | KITCHEN | Leon смотрит на число Mom, потом на неё; говорит. Mom скрестила руки. | `01:54.8` TECHNICALLY, YOU’LL HAVE TWO MILLION DOLLARS, SO FIVE WON’T MATTER. | Leon объясняет | MOM; LEON; number |
| S033 | 01:58.9–02:02.9 | Mom hands him five dollars and a very long look. | KITCHEN | Mom протягивает пять долларов и смотрит долгим взглядом (брови вниз, глаза на Leon). | `02:00.0` $5 | Mom протягивает бумажку | MOM; LEON; dollars |
| S034 | 02:02.9–02:05.7 | Plus number two, the lemonade stand. | PARK | Парк, ларёк с лимонадом, Leon за прилавком. | `02:03.8` PLUS #2 · LEMONADE | плашка | BG park; LEON; stand |
| S035 | 02:05.7–02:09.7 | In the park, Leon only serves people with at least seven digits. | PARK | Очередь из четырёх людей, над каждым число; Leon показывает пальцем на тех, у кого длинное число; у коротких стоит значок «NO». | `02:08.7` 7+ DIGITS ONLY | очередь, значки | LEON; stand; KIDS×4; numbers |
| S036 | 02:09.7–02:11.0 | They all tip. | PARK | В банку Leon летят монеты и купюры, покупатели довольны. | — | монеты летят | LEON; stand; coins; jar |
| S037 | 02:11.0–02:15.7 | One man gives him a twenty and says, "Keep it. I have a good feeling about this stand." | PARK | Мужчина в пиджаке протягивает двадцать и говорит. | `02:13.2` KEEP IT. I HAVE A GOOD FEELING ABOUT THIS STAND. | мужчина кладёт $20 | MAN; LEON; stand; $20 |
| S038 | 02:15.7–02:18.3 | Plus number three, the group project. | CLASS | Класс, Leon у парты, ребята спорят. | `02:16.3` PLUS #3 · GROUP PROJECT | плашка | BG classroom; LEON; KIDS |
| S039 | 02:18.3–02:24.3 | Everybody fights over Chase and Zoe, and Leon walks straight to Owen, the quiet kid building a robot in his garage. | CLASS | Двое тянут к себе Chase и Zoe, за руки; Leon уходит вправо к Owen. | — | Chase и Zoe тянут, Leon идёт к Owen | CHASE; ZOE; KIDS; LEON; OWEN |
| S040 | 02:24.3–02:28.1 | Owen's number is eighteen million, four hundred thousand dollars. | GARAGE | Гараж: стол с роботом, Owen с отвёрткой, над ним зелёное число $18,400,000; Leon смотрит. | — | число появляется, Owen паяет | BG код: гараж; OWEN; LEON; robot; number |
| S041 | 02:28.1–02:31.5 | Owen's only question is, "Why are you staring at my forehead?" | GARAGE | Owen хмурится, Leon смотрит на его лоб. | `02:29.6` WHY ARE YOU STARING AT MY FOREHEAD? | Owen отодвигается | OWEN; LEON; robot |
| S042 | 02:31.5–02:34.2 | Plus number four, the class election. | CLASS | Класс, на доске «PRESIDENT». | `02:32.3` PLUS #4 · CLASS ELECTION | плашка | BG classroom; LEON; board |
| S043 | 02:34.2–02:36.0 | Two kids run for president. | CLASS | Двое кандидатов с плакатами «A» и «B», над ними числа; Leon в зале. | — | кандидаты, числа | KIDS×2; posters; LEON; numbers |
| S044 | 02:36.0–02:40.8 | Leon checks their numbers, votes for the bigger one, and gets longer recess for the whole school. | CLASS | Leon опускает бюллетень в ящик, на листе обведено большее число. | `02:39.2` LONGER RECESS | бюллетень падает в ящик | LEON; box; ballot |
| S045 | 02:40.8–02:42.4 | Nobody knows who to thank. | PARK | Школьный двор: дети радуются длинной перемене, подпись над толпой. | — | дети прыгают | BG park; KIDS; LEON |
| S046 | 02:42.4–02:47.5 | But this is money, not magic. Leon still fails the history quiz. | CLASS | Leon за партой, перед ним тест с большой красной F, рядом число и вздох. | `02:47.0` HISTORY QUIZ: F | Leon опускает голову | LEON; paper |
| S047 | 02:47.5–02:50.2 | But then you start noticing the problems. | PARK | Leon идёт по улице, хмурится, смотрит на людей. | `02:49.3` PROBLEMS | плашка | BG park; LEON |
| S048 | 02:50.2–02:55.7 | Problem one. The number is the end of a very long road, and you only see the finish line. | VOID | Длинная дорога уходит вдаль, на конце флажок финиша; над флажком светится число. | `02:50.7` PROBLEM 1 · THE FINISH LINE | дорога | road; flag; number |
| S049 | 02:55.7–03:02.1 | Warren Buffett built about ninety-nine percent of his fortune after his fiftieth birthday, according to the writer Morgan Housel. | VOID | Шкала жизни: от 0 до 50 лет маленькая полоска, после 50 длинный столбик; карточка «BUFFETT: 99% AFTER 50». | `02:56.9` 99% AFTER HIS 50TH BIRTHDAY; `03:01.1` MORGAN HOUSEL; `02:56.1` WARREN BUFFETT | столбик растёт | chart; card |
| S050 | 03:02.1–03:06.0 | So Leon watches an old man feeding pigeons and sees nine million, | PARK | Старик на скамейке кормит голубей, над ним $9,000,000. | — | голуби клюют | BG park; OLDMAN; pigeons; LEON; number |
| S051 | 03:06.0–03:09.8 | then a girl on a skateboard and sees two thousand. | PARK | Девочка на скейтборде едет мимо, над ней $2,000. | — | девочка проезжает | SKATER; LEON; number |
| S052 | 03:09.8–03:12.1 | The mailman has eight hundred thousand. | PARK | Почтальон с сумкой, над ним $800,000. | — | почтальон идёт | MAILMAN; LEON; number |
| S053 | 03:12.1–03:15.8 | The crossing guard has forty dollars and a very good whistle. | PARK | Регулировщик со свистком у перехода, над ним $40. | — | свисток | GUARD; LEON; number |
| S054 | 03:15.8–03:20.0 | Is the skateboard girl doomed? Or is she just at the start? | PARK | Девочка со скейтом, над ней вопросительные знаки; Leon чешет голову. | — | знаки вопроса | SKATER; LEON; qmark |
| S055 | 03:20.0–03:26.7 | The number never says where anyone is on the road. Only where it ends, if nobody gets in the way. | VOID | Дорога: человечек стоит на середине, над ним «YOU ARE HERE?», число только на дальнем конце. | `03:21.4` YOU ARE HERE? | человечек шагает | road; person; flag |
| S056 | 03:26.7–03:28.4 | Problem two. | VOID | Leon тащит огромный тяжёлый мешок с надписью SECRET. | `03:27.7` PROBLEM 2 · THE SECRET | мешок тянет вниз | LEON; sack |
| S057 | 03:28.4–03:32.5 | Secrets are heavy, and Leon is terrible at carrying them. | VOID | Leon сутулится под мешком, пот, ноги подгибаются. | — | Leon кряхтит | LEON; sack |
| S058 | 03:32.5–03:34.3 | On Thursday, he tells Owen. | GARAGE | Гараж: Owen с отвёрткой, Leon шепчет ему; подпись THURSDAY. | `03:33.0` THURSDAY | Leon шепчет | BG гараж; OWEN; LEON; robot |
| S059 | 03:34.3–03:37.7 | "You're going to be rich. Eighteen million." | GARAGE | Leon говорит с улыбкой, Owen слушает. | `03:34.6` YOU’RE GOING TO BE RICH. EIGHTEEN MILLION. | Leon говорит | OWEN; LEON; robot; number |
| S060 | 03:37.7–03:39.8 | Owen puts down his screwdriver. | GARAGE | Owen кладёт отвёртку на стол, поднимает глаза. | — | отвёртка ложится | OWEN; LEON; robot; screwdriver |
| S061 | 03:39.8–03:43.4 | "So it's already decided? Then why am I building this?" | GARAGE | Owen разводит руками и спрашивает. | `03:40.1` SO IT’S ALREADY DECIDED? THEN WHY AM I BUILDING THIS? | Owen разводит руками | OWEN; LEON; robot |
| S062 | 03:43.4–03:48.4 | He walks home. The robot stays on the table, and above Owen's head, the number drops. | GARAGE | Owen уходит влево, робот остался на столе; Leon смотрит вслед. | — | Owen уходит | OWEN; LEON; robot |
| S063 | 03:48.4–03:53.8 | Eighteen million. Six million. Nine hundred thousand. | GARAGE | Крупно Owen, над головой число падает: $18,400,000 → $6,000,000 → $900,000, оно тускнеет. | — | число падает | OWEN; number |
| S064 | 03:53.8–03:55.4 | And this part is real. | VOID | Плашка THIS PART IS REAL, Leon показывает на неё. | `03:54.8` THIS PART IS REAL | плашка | LEON |
| S065 | 03:55.4–04:02.8 | In nineteen ninety-eight, psychologists Claudia Mueller and Carol Dweck gave fifth graders puzzles and praised some of them for being smart. | VOID | Карточка исследования: два ряда детей с головоломками, над первым рядом «SMART!», над вторым «HARD WORK!». | `03:56.2` MUELLER & DWECK · 1998 | дети решают | card; KIDS; puzzles |
| S066 | 04:02.8–04:07.4 | Those kids did worse on the next round than kids praised for working hard. | VOID | Два столбика: «SMART!» ниже, «HARD WORK!» выше. | — | столбики растут | chart |
| S067 | 04:07.4–04:11.7 | Tell somebody they've already won, and they stop playing. | GARAGE | Owen с кубком в руках и значком стоп: «STOPS PLAYING». | — | Owen сидит | OWEN; cup; robot |
| S068 | 04:11.7–04:14.1 | Leon fixes it the only way he can. | GARAGE | Leon догоняет Owen, руки к нему. | — | Leon идёт | LEON; OWEN |
| S069 | 04:14.1–04:15.8 | "I made it up, Owen. Forget it." | GARAGE | Leon извиняется, Owen слушает. | `04:14.2` I MADE IT UP, OWEN. FORGET IT. | Leon говорит | LEON; OWEN |
| S070 | 04:15.8–04:21.4 | Then he spends two days handing him screws, until the number crawls back to fourteen million. | GARAGE | Leon подаёт Owen винты; над Owen число ползёт вверх до $14,000,000. | `04:16.9` 2 DAYS | число ползёт вверх | LEON; OWEN; screws; number |
| S071 | 04:21.4–04:26.8 | Not all the way. Some things you can't un-say, even with a screwdriver. | GARAGE | Число Owen $14,000,000; призрак старого числа $18,400,000 бледный над ним. | — | число замирает | OWEN; LEON; number |
| S072 | 04:26.8–04:30.2 | Problem three is the one that keeps Leon awake. | NIGHT | Ночная комната, Leon сидит на кровати/у стола и не спит, подпись PROBLEM 3. | `04:27.7` PROBLEM 3 · THE MAN BY THE STORE | плашка | BG kitchenNight; LEON |
| S073 | 04:30.2–04:32.2 | The man by the hardware store. | STREET | Walt сидит у стены, прохожие идут мимо. | — | прохожие проходят | BG магазин; WALT; PEOPLE |
| S074 | 04:32.2–04:37.2 | All week, his number never moves, and everyone walks around him like he's a mailbox. | STREET | Walt у стены, рядом почтовый ящик; прохожие огибают их обоих; над Walt число не меняется. | — | прохожие огибают | WALT; mailbox; PEOPLE; number |
| S075 | 04:37.2–04:44.1 | On one night in January twenty twenty-four, about seven hundred and seventy thousand people in America had no home. | VOID | Карточка «JAN 2024 · 770,000 PEOPLE WITHOUT A HOME (USA)»: россыпь точек-человечков. | `04:39.8` 770,000 PEOPLE · ONE NIGHT · USA | точки заполняют кадр | card; dots |
| S076 | 04:44.1–04:46.9 | On Friday, Leon sits down next to him. | STREET | Leon садится рядом с Walt у стены, подпись FRIDAY. | `04:44.6` FRIDAY | Leon садится | WALT; LEON; wall |
| S077 | 04:46.9–04:47.9 | His name is Walt. | STREET | Крупно лицо Walt с бородой, добрые глаза. | `04:47.4` WALT | камера на лицо | WALT |
| S078 | 04:47.9–04:53.3 | He used to repair elevators, until his back gave out, then his job, then his apartment. | VOID | Четыре значка по очереди зачёркиваются: лифт, спина, работа, дом. | `04:48.7` ELEVATORS; `04:49.9` HIS BACK; `04:51.4` HIS JOB; `04:52.6` HIS HOME | значки зачёркиваются | icons |
| S079 | 04:53.3–04:56.9 | From his jacket, Walt pulls a wet notebook full of drawings. | STREET | Walt достаёт из куртки мокрый блокнот; Leon смотрит. | — | блокнот появляется | WALT; LEON; notebook |
| S080 | 04:56.9–05:01.1 | A machine that cleans dirty water with a bucket, sand, and a car part. | VOID | Страница блокнота: ведро, песок, деталь машины, из ведра течёт чистая вода (чертёж). | — | чертёж рисуется линиями | notebook page |
| S081 | 05:01.1–05:05.6 | "Works on paper," Walt says. "Nobody ever read past page two." | STREET | Walt показывает страницу и говорит, Leon слушает. | `05:01.3` WORKS ON PAPER.; `05:03.6` NOBODY EVER READ PAST PAGE TWO. | Walt показывает блокнот | WALT; LEON; notebook |
| S082 | 05:05.6–05:08.9 | Leon asks why he never built it. Walt laughs. | STREET | Leon спрашивает, Walt смеётся. | — | Walt смеётся | WALT; LEON |
| S083 | 05:08.9–05:12.4 | "Nobody gives a workshop to a man with a cardboard sign." | STREET | Walt показывает на картонку. | `05:09.1` NOBODY GIVES A WORKSHOP TO A MAN WITH A CARDBOARD SIGN. | Walt указывает на табличку | WALT; LEON; sign |
| S084 | 05:12.4–05:14.6 | Leon looks up at the number. | STREET | Leon смотрит на число над Walt, Walt прижимает блокнот к груди. | — | число светится | LEON; WALT; number |
| S085 | 05:14.6–05:18.0 | It was never about Walt. It's about the notebook. | STREET | Число над Walt и от него светящаяся нить к блокноту; блокнот светится. | `05:17.2` THE NUMBER LIVES IN THE NOTEBOOK | нить пульсирует | WALT; notebook; number |
| S086 | 05:18.0–05:19.8 | Saturday morning, it rains. | STREET | Идёт дождь, улица мокрая, подпись SATURDAY · RAIN. | `05:18.4` SATURDAY · RAIN | дождь | BG магазин в дождь; LEON |
| S087 | 05:19.8–05:24.1 | Leon is carrying a pitcher to the park to open the biggest lemonade stand in town, | STREET | Leon бежит под дождём с кувшином лимонада, капли. | — | Leon бежит | LEON; pitcher; rain |
| S088 | 05:24.1–05:28.7 | when he spots Walt behind the hardware store, holding the notebook over the dumpster. | ALLEY | Переулок за магазином: Walt у мусорного бака, держит блокнот над баком; Leon далеко слева на углу. | — | камера на Walt | BG переулок; WALT; dumpster; LEON; notebook; rain |
| S089 | 05:28.7–05:32.1 | Above Walt's head, the number starts to fall. | ALLEY | Над Walt число начинает мигать и трясётся. | — | число трясётся | WALT; number |
| S090 | 05:32.1–05:36.5 | Six billion. Four billion. Nine hundred million. | ALLEY | Число падает: $6,310,000,000 → $4,000,000,000 → $900,000,000. | — | число падает ступенями | WALT; number |
| S091 | 05:36.5–05:40.1 | Every step toward the bin, a zero disappears. | ALLEY | Walt идёт к баку, на каждый шаг справа от числа отваливается нуль и падает вниз. | — | нули падают с каждым шагом | WALT; dumpster; zeros |
| S092 | 05:40.1–05:47.4 | Leon drops the pitcher and runs, sneakers sliding, rain in his eyes, the notebook the only thing on the street he can see. | ALLEY | Кувшин падает и разбивается, лимонад брызгает; Leon бросается вперёд. | — | кувшин падает | LEON; pitcher; WALT |
| S093 | 05:47.4–05:49.9 | "Walt, wait! Give me one day!" | ALLEY | Leon бежит с вытянутой рукой, кричит. | `05:47.8` WALT, WAIT! GIVE ME ONE DAY! | Leon бежит, брызги | LEON; WALT; dumpster; rain |
| S094 | 05:49.9–05:53.3 | He snatches the notebook one second before it hits the trash. | ALLEY | Рука Leon выхватывает блокнот, Walt ошарашен, блокнот не долетел до бака. | — | рывок | LEON; WALT; notebook; dumpster |
| S095 | 05:53.3–05:56.0 | The number stops at three hundred million. | ALLEY | Число над Walt замирает на $300,000,000. | — | число замирает | WALT; LEON; number |
| S096 | 05:56.0–06:01.5 | Then Leon sees his own reflection in a puddle. Fifty-two thousand. | ALLEY | Leon смотрит в лужу: там отражение, над ним $52,000. | `06:00.6` $61,400 → $52,000 | число меняется | LEON; puddle; number |
| S097 | 06:01.5–06:06.6 | The future where he sold lemonade all Saturday was a little richer than this one. | VOID | Слева лимонадный ларёк с $61,400, справа лужа и блокнот с $52,000 (меньше). | — | две чаши | stand; notebook; numbers |
| S098 | 06:06.6–06:09.2 | Leon decides it's a fair price. | ALLEY | Leon мокрый, улыбается и показывает большой палец; Walt растерян. | `06:08.3` A FAIR PRICE | Leon поднимает палец | LEON; WALT; notebook; rain |
| S099 | 06:09.2–06:15.2 | The only open door on a rainy Saturday is the school gym, where Ms. Park runs the robotics club. | GYM | Школьный зал, на столах детали роботов, на стене плакат ROBOTICS; Ms. Park с планшетом. | `06:13.0` ROBOTICS CLUB | камера по залу | BG gym; PARK; tables |
| S100 | 06:15.2–06:18.5 | Owen is there, because Owen is always there. | GYM | Owen у стола с роботом; Leon, Walt вошли в дверь с блокнотом. | — | входят | OWEN; LEON; WALT; PARK; robot |
| S101 | 06:18.5–06:21.7 | Ms. Park flips to page three. Then page four. | GYM | Ms. Park листает блокнот, глаза бегут по строкам. | — | страницы листаются | PARK; notebook; LEON; WALT |
| S102 | 06:21.7–06:26.9 | Then she sits down, which Ms. Park never does. She stops talking. | GYM | Ms. Park садится на стул, замолкает; остальные притихли. | — | Ms. Park садится | PARK; chair; notebook; OWEN; LEON; WALT |
| S103 | 06:26.9–06:32.9 | "Page nine is wrong," she says finally, "but it's the best wrong I've seen in years." | GYM | Ms. Park поднимает палец и говорит. | `06:27.2` PAGE NINE IS WRONG, BUT IT’S THE BEST WRONG I’VE SEEN IN YEARS. | Ms. Park указывает | PARK; notebook; WALT |
| S104 | 06:32.9–06:36.6 | Owen finds a bottle, a bucket, sand, and a coffee filter. | GYM | На столе бутылка, ведро, песок, кофейный фильтр. | — | предметы появляются по одному | OWEN; table; bottle; bucket; sand; filter |
| S105 | 06:36.6–06:39.4 | Walt pours in muddy water from the parking lot. | GYM | Walt льёт мутную воду из банки в ведро-фильтр. | — | вода льётся | WALT; OWEN; PARK; bucket; jar |
| S106 | 06:39.4–06:43.6 | Out comes water so clear that Owen forgets to breathe. | GYM | В стакан течёт прозрачная вода, Owen раздул щёки (забыл дышать). | — | вода стекает, Owen щёки | OWEN; glass; filter; LEON; PARK; WALT |
| S107 | 06:43.6–06:46.4 | Walt stares at it for a long time. | GYM | Walt смотрит на стакан, глаза блестят. | — | Walt не двигается | WALT; glass |
| S108 | 06:46.4–06:50.2 | "Eleven years I carried that notebook," he says. | GYM | Walt прижимает блокнот к груди и говорит. | `06:46.8` ELEVEN YEARS I CARRIED THAT NOTEBOOK. | Walt говорит | WALT; notebook; LEON |
| S109 | 06:50.2–06:53.6 | Leon doesn't tell him the number. He's learned that lesson. | GYM | Leon молча застёгивает на губах «молнию»; над Walt число видно только Leon. | — | Leon застёгивает рот | LEON; WALT; number |
| S110 | 06:53.6–06:56.9 | He just says, "So, what's on page ten?" | GYM | Leon улыбается и спрашивает. | `06:54.9` SO, WHAT’S ON PAGE TEN? | Leon говорит | LEON; WALT |
| S111 | 06:56.9–06:60.0 | And above Walt's head, the number climbs. | GYM | Крупно Walt, над ним число поднимается с $300,000,000 вверх. | — | число растёт | WALT; number |
| S112 | 06:60.0–07:05.6 | Six billion, three hundred and ten million dollars. Exactly the same number. | GYM | Walt, число $6,310,000,000 горит, вокруг искры. | — | искры, число пульсирует | WALT; number; sparks |
| S113 | 07:05.6–07:10.6 | The only thing that changed was somebody reading past page two. | GYM | Блокнот лежит открытым на странице три, над ним свет; рядом руки читают. | `07:09.2` READ PAST PAGE TWO | свет от блокнота | notebook; hands |
| S114 | 07:10.6–07:13.6 | Leon finally understands what the numbers are. | GYM | Leon задумчиво смотрит на группу, улыбается. | — | камера мягко наезжает | LEON; WALT; OWEN; PARK |
| S115 | 07:13.6–07:20.2 | Not a promise. A road nobody has walked yet, and it only stays open if somebody walks it with you. | VOID | Дорога без следов; затем на ней следы одной пары ног, затем второй: «NOBODY WALKED IT YET» → «WALK IT WITH SOMEONE». | `07:15.0` A ROAD NOBODY HAS WALKED YET; `07:19.0` WALK IT WITH SOMEONE | следы появляются | road; footprints |
| S116 | 07:20.2–07:26.4 | Walt gets a table in the robotics room and a hot lunch from Ms. Park, who says it's not charity, it's an investment. | GYM | Walt за столом кружка, перед ним горячий обед на подносе, Ms. Park рядом говорит. | `07:24.5` IT’S NOT CHARITY. IT’S AN INVESTMENT. | Ms. Park ставит поднос | WALT; PARK; tray; table |
| S117 | 07:26.4–07:31.3 | Owen's number is twenty-one million, and he hasn't put the screwdriver down all day. | GYM | Owen с отвёрткой, над ним $21,000,000; он не отрывается от робота. | — | Owen работает | OWEN; robot; number |
| S118 | 07:31.3–07:36.4 | Biscuit's number, by the way, is eight dollars. Somebody dropped a second sausage. | LIVING | Biscuit с вторым куском сосиски, над ним число $8. | — | Biscuit жуёт | BG livingRoom; BISCUIT; sausage; number |
| S119 | 07:36.4–07:45.0 | Leon's own number is still fifty-two thousand. It's the worst week of his financial life, and he has never been happier. | LIVING | Leon у зеркала в гостиной, над головой синее $52,000, он улыбается. | — | число в зеркале | LEON; mirror; number |
| S120 | 07:45.0–07:49.3 | Sunday morning, at the bus stop, a girl is staring at the air above his head. | BUSSTOP | Остановка, на скамейке девочка, Leon подходит; подпись SUNDAY. | `07:45.6` SUNDAY MORNING | Leon подходит | BG остановка; LEON; GIRL |
| S121 | 07:49.3–07:53.9 | She takes out a pen, writes a number on her hand, then looks straight at Leon. | BUSSTOP | Девочка достаёт ручку, пишет число на руке, смотрит на воздух над Leon. | — | ручка пишет | GIRL; LEON; pen |
| S122 | 07:53.9–07:58.1 | "You can see them too," she whispers. "Can't you?" | BUSSTOP | Крупно девочка шепчет, Leon поражён. | `07:54.3` YOU CAN SEE THEM TOO. CAN’T YOU? | девочка шепчет | GIRL; LEON |
| S123 | 07:58.1–08:00.2 | So, what would you do? | VOID | Leon обращается к зрителю: над ним знак вопроса; рядом Walt с числом. | `07:59.7` WHAT WOULD YOU DO? | вопрос | LEON; WALT; number |
| S124 | 08:00.2–08:04.0 | If you saw a number like Walt's above a stranger, would you walk past? | VOID | Силуэт прохожего с числом, мимо идёт тень. | `08:03.4` WOULD YOU WALK PAST? | тень проходит мимо | figure; number |
| S125 | 08:04.0–08:05.1 | Tell us in the comments. | VOID | Значок комментариев, Leon указывает на него. | `08:04.9` TELL US IN THE COMMENTS | Leon указывает | LEON; comment icon |
| S126 | 08:05.1–08:07.2 | And subscribe for part two, | VOID | Кнопка SUBSCRIBE нажимается; рядом девочка с числом на руке. | `08:05.9` SUBSCRIBE · PART 2 | кнопка нажимается | LEON; button |
| S127 | 08:07.2–08:14.2 | because that girl knows something about Leon's number that Leon doesn't. | BUSSTOP | Девочка смотрит на камеру, Leon не замечает; над Leon число мерцает. | — | число Leon мерцает | GIRL; LEON; number |

## Итоги
- Сцен: 127. Средняя длина 3.9 с, самая длинная 8.8 с (S014), самая короткая 1.0 с (S077). Итог 08:14.2.
- Строк текста на экране: 69.
- Гэги без звука: число над головой Walt против числа Leon (табло MONEY CONTEST), одно целое окно у машины Mom, сосиска вместо Biscuit, 7 цифр — только им лимонад, Owen и число падает, мешок SECRET, прохожие огибают Walt как почтовый ящик, нули отваливаются от числа на каждом шаге Walt к баку, вода из ведра, число Leon $61,400 → $52,000, девочка пишет число на руке.
- Логика: вторник (откровение) → день 1 (плюсы) → четверг (Owen) → пятница (Walt) → суббота (дождь, зал кружка) → воскресенье (остановка). Число Leon: 61 400 до субботы, потом 52 000 до конца. Число Walt падает ступенями: 6,31 млрд → 4 млрд → 900 млн → 300 млн, после зала возвращается к 6 310 000 000.
