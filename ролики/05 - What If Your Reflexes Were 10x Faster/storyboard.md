# Раскадровка: ролик 05, «What If Your Reflexes Were 10x Faster?»
Основа: `озвучка.mp3` (573.6 с = 09:33.6, ElevenLabs 1.2) и тайминги слов (`тайминги-слов.json`: Whisper small, выровнено по `сценарий.txt`, 97% слов совпало). Ролик ускоряется ещё ×1,2.

## Хронометраж (лимит владельца: итог 8:00–8:20)
- Озвучка целиком 09:33.6, после ×1,2: **07:58.0**: на 00:02.0 короче 8:00. Сокращать не нужно, наоборот: в конец добавлено 2.5 с тишины (финальный кадр держится), **итог 08:00.5**, в окне 8:00–8:20: да. Исходный `озвучка.mp3` не тронут; проектный `input/voiceover.mp3` = озвучка ×1,2 + хвост.
- Времена `мм:сс.с` от начала итогового ролика; конец сцены = начало следующей.

## Герои
Все герои кодовые куклы Razgon, внешность одинаковая во всех сценах. Новый только Dunn (тренер) и безымянные Attendant, Doctor, Driver.

| Герой | Как выглядит | Откуда |
|---|---|---|
| LEON | эталон канала (кепка capBack, красная футболка с молнией, серые шорты, оранжевые кроссовки) | ролики 01–04 |
| OWEN | зелёная толстовка, круглые очки, рыжеватые волосы | ролик 04 |
| CHASE | синяя форма с номером 7 | ролик 04 |
| MS. PARK | фиолетовый костюм, пучок, очки | ролики 02–04 |
| DAD, MOM | как в ролике 02 | ролики 02–04 |
| BISCUIT | собака (картинки OpenAI из ролика 02), один размер | ролики 02–04 |
| DUNN | тренер: красная куртка, кепка capBack, свисток, короткие тёмные волосы, глаза видны | новый, кодом |
| ATTENDANT, DOCTOR, DRIVER | взрослые из `lib.js`: палаточник (жёлтая жилетка), врач (белый халат, очки), водитель фургона (синяя форма) | кодом |

## Места
Новых фонов нет, 0 центов. Берём из роликов 01–04: gym, cafeteria, classroom, kitchen, livingRoom; `field.png` (поле, одинаково для забега и парка) и `street.png` (дорога для фургона) из ролика 03. Ярмарка (палатки, флажки, автомат с кротами) и кабинет врача, лампы, диаграммы — код.

| Код | Место | Сцен |
|---|---|---|
| GYM | спортзал | 16 |
| VOID | абстрактный фон: схемы, шкалы, доска | 23 |
| FIELD | поле (старт забега, пятнашки, парк) | 15 |
| PARK | парк (поле + деревья кодом) | 10 |
| ROAD | улица для фургона | 9 |
| CLASS | класс (и кабинет врача кодом) | 17 |
| KITCHEN | кухня (день и ночь) | 20 |
| CAFE | столовая | 6 |
| FAIR | ярмарка (кодом) | 4 |
| LIVING | гостиная | 5 |
| NIGHT | вечерняя улица | 1 |

## Сцены

| № | Время | Озвучка | Место | Кадр | Текст на экране | Анимация | Ассеты |
|---|---|---|---|---|---|---|---|
| S001 | 00:00.0–00:02.2 | Monday, third period, the gym. | GYM | Общий план спортзала, на скамейках зрители, команда Chase слева, Leon один справа у стены. | `00:00.0` MONDAY · 3RD PERIOD | камера медленно наезжает | BG gym; CHASE; TEAM; LEON |
| S002 | 00:02.2–00:03.9 | Chase holds two dodgeballs, | GYM | Chase крупнее, в каждой руке по мячу, самоуверенная поза. Leon вдали. | — | лёгкий наезд | BG gym; CHASE; ball×2 |
| S003 | 00:03.9–00:05.6 | and his whole team holds eight more. | GYM | Четверо ребят из команды в ряд, у каждого по два мяча. Над ними счётчик: 10 мячей. | `00:04.8` 10 BALLS | ряд ребят, мячи в руках | BG gym; TEAM×4; balls×8 |
| S004 | 00:05.6–00:07.9 | On the whistle, all ten fly at once, | GYM | Свисток, десять мячей летят дугой слева направо в одного Leon. Leon стоит справа у стены. | `00:06.0` TWEET! | мячи по траектории, камера держит всех | BG gym; TEAM; LEON; balls×10 |
| S005 | 00:07.9–00:10.3 | aimed at one kid. Leon. | GYM | Крупный Leon в прицеле, мячи близко. Подпись LEON со стрелкой. | `00:09.7` LEON | прицел сжимается | LEON; crosshair; balls |
| S006 | 00:10.3–00:11.5 | He doesn't run. | GYM | Leon стоит спокойно, руки расслаблены, мячи почти рядом. | — | мячи подлетают, Leon не двигается | LEON; balls |
| S007 | 00:11.5–00:14.5 | He leans left, ducks under one, steps back from another, | GYM | Leon наклоняется влево, один мяч над головой, другой отлетает от шага назад. | — | пара поз: наклон, шаг назад | LEON; balls |
| S008 | 00:14.5–00:16.9 | and plucks a third out of the air like a grape. | GYM | Leon ловит мяч одной рукой на лету, остальные мячи проносятся мимо. | `00:16.4` CATCH! | рука смыкается на мяче | LEON; ball |
| S009 | 00:16.9–00:18.8 | The other seven hit the wall behind him. | GYM | Семь мячей бьются в стену за Leon, отскакивают; Leon с пойманным мячом. | — | мячи ударяются о стену, пыль | LEON; wall; balls×7 |
| S010 | 00:18.8–00:21.1 | Ten balls, zero hits. | GYM | Табло на стене: 10 МЯЧЕЙ, 0 ПОПАДАНИЙ. | `00:19.1` 10 BALLS · 0 HITS | плашка вылетает | LEON; plate |
| S011 | 00:21.1–00:23.6 | The gym goes dead silent. | GYM | Зал замер: команда с открытыми ртами, на скамейке зрители в шоке; над залом «…». | — | все застыли, тишина | TEAM; CROWD; LEON |
| S012 | 00:23.6–00:27.7 | Owen whispers from the bench, "Dude. How?" | GYM | Owen на скамейке шепчет Leon, глаза широко открыты. | `00:26.0` DUDE. HOW? | Owen наклонился вперёд | OWEN; LEON; bench |
| S013 | 00:27.7–00:31.4 | Leon shrugs. "They were just really slow." | GYM | Leon пожимает плечами, мяч в руке, небрежно. | `00:29.4` THEY WERE JUST REALLY SLOW. | плечи вверх | LEON; ball |
| S014 | 00:31.4–00:33.1 | But they weren't slow. | GYM | Замедленный кадр: мячи застыли в воздухе, перед ними Leon. Подпись «BUT THEY WEREN’T SLOW». | `00:32.6` BUT THEY WEREN’T SLOW | мячи замедляются и замирают | LEON; balls |
| S015 | 00:33.1–00:37.5 | A normal kid needs about a quarter of a second between seeing a ball and starting to move. | VOID | Таймлайн: ребёнок видит мяч (глаз), полоса 0,25 с до начала движения, нога. Подписи 0,25 s. | `00:34.6` 0.25 SECONDS | полоса наполняется слева направо | KID; ball; bar |
| S016 | 00:37.5–00:40.3 | By then, the ball has already crossed a good part of the gym. | GYM | Спортзал сбоку: мяч уже пролетел половину зала, ребёнок только начал двигаться. Линия «ПРОЛЕТЕЛ». | — | мяч летит, ребёнок стоит | BG gym; KID; ball |
| S017 | 00:40.3–00:43.0 | Leon needs one fortieth of a second. | VOID | Таймлайн Leon: короткая полоска 1/40 s, ребёнок для сравнения рядом с длинной полосой. | `00:41.5` 1/40 SECOND | полоска Leon вспыхивает | LEON; bar |
| S018 | 00:43.0–00:47.0 | So, what if your reflexes were ten times faster? | VOID | Название ролика большими буквами, Leon с кепкой и стрелкой «×10». | `00:43.4` WHAT IF YOUR REFLEXES WERE 10X FASTER? | название влетает | LEON; title |
| S019 | 00:47.0–00:48.5 | Here's how it works. | VOID | Доска с тремя пустыми карточками, Leon показывает на доску. | — | карточки выезжают | LEON; board |
| S020 | 00:48.5–00:54.6 | Rule one. The gap between seeing something and starting to move shrinks from a quarter of a second to a fortieth. | VOID | Доска: RULE 1, шкала 0,25 с сжимается до 1/40. | `00:48.8` RULE 1 | шкала сжимается | LEON; board; bar |
| S021 | 00:54.6–00:57.3 | Eyes, brain, nerves, all of it. | VOID | Схема: глаз → мозг → нерв → нога, у каждого значок вспыхивает по очереди. | — | вспышки по цепочке | icons eye brain nerve leg |
| S022 | 00:57.3–01:00.6 | Rule two. You start sooner, but you don't move faster. | VOID | Доска: RULE 2, надпись «START SOONER ≠ MOVE FASTER». | `00:57.7` RULE 2 | карточка появляется | LEON; board |
| S023 | 01:00.6–01:03.8 | Your legs run exactly as fast as they did yesterday. | FIELD | Leon и обычный Owen бегут рядом по дорожке с одинаковой скоростью, спидометр SAME SPEED. | `01:01.3` SAME SPEED | оба бегут вровень | BG field; LEON; OWEN |
| S024 | 01:03.8–01:08.2 | Rule three. The world isn't in slow motion. | VOID | Доска: RULE 3, мир рядом с Leon не замедлен: маятник и ребята идут нормально. | `01:05.0` RULE 3 | карточка появляется | LEON; board |
| S025 | 01:08.2–01:11.8 | It's just that everybody else seems to be loading. | GYM | Над головами у ребят крутятся «загрузки» (круги прогресса), Leon ждёт скучая. | `01:10.8` LOADING… | круги загрузки крутятся | BG gym; KIDS; LEON; spinners |
| S026 | 01:11.8–01:13.2 | Want proof? | CLASS | Owen держит линейку вертикально, рядом Leon с раскрытой ладонью, подпись PROOF. | `01:12.4` PROOF | Owen поднимает линейку | BG classroom; OWEN; LEON; ruler |
| S027 | 01:13.2–01:15.5 | Owen holds a ruler and lets go. | CLASS | Owen отпускает линейку, она падает между пальцев ребёнка (KID). | — | линейка падает | OWEN; KID; ruler |
| S028 | 01:15.5–01:19.7 | A normal kid catches it about twenty-five centimeters down, ten inches. | CLASS | Линейка упала, кид ловит у отметки 25 см (10 inches), подпись. | `01:17.2` 25 CM · 10 INCHES | линейка проскальзывает, кид хватает | OWEN; KID; ruler |
| S029 | 01:19.7–01:22.5 | Leon catches it at three millimeters. | CLASS | Leon ловит линейку почти сразу, пальцы у самой отметки 3 мм. | `01:21.2` 3 MM | мгновенный хват | OWEN; LEON; ruler |
| S030 | 01:22.5–01:26.0 | That's not catching. That's practically a handshake. | CLASS | Leon и Owen пожимают руки через линейку: «HANDSHAKE». | `01:25.2` HANDSHAKE | рукопожатие | OWEN; LEON |
| S031 | 01:26.0–01:28.5 | Plus number one, breakfast. | KITCHEN | Кухня утром, Leon за столом с хлопьями, Dad у плиты. | `01:27.0` PLUS #1 · BREAKFAST | плашка | BG kitchen; LEON; DAD |
| S032 | 01:28.5–01:32.5 | Dad flips a pancake, and it sails toward the ceiling fan. | KITCHEN | Dad подбрасывает блин, тот летит к потолочному вентилятору. | — | блин взлетает по дуге | DAD; LEON; pancake; fan |
| S033 | 01:32.5–01:35.6 | Leon slides a plate under it without looking up from his cereal. | KITCHEN | Leon, не глядя от хлопьев, подставляет тарелку, блин падает точно на неё. | — | тарелка подъезжает | LEON; plate; pancake |
| S034 | 01:35.6–01:39.6 | Dad stares at the plate, then the ceiling, then Leon. | KITCHEN | Dad смотрит на тарелку, потом вверх на потолок, потом на Leon; три позы. | — | взгляд Dad меняет направление | DAD; LEON; plate |
| S035 | 01:39.6–01:45.0 | Then Biscuit, the dog, grabs a sausage off the counter, and Leon beats him to it. | KITCHEN | На столешнице сосиска, Biscuit прыгает за ней, Leon уже держит сосиску в руке. | — | прыжок и перехват | DAD; LEON; BISCUIT; sausage |
| S036 | 01:45.0–01:49.8 | Biscuit has never lost a race to food. He does not take it well. | KITCHEN | Biscuit лежит, оскорблённо отвернувшись, Leon с сосиской. | `01:45.8` BISCUIT: 0 WINS | Biscuit фыркает | BISCUIT; LEON |
| S037 | 01:49.8–01:53.0 | Plus number two, the town fair. | FAIR | Ярмарка: палатки, флажки, гирлянда. | `01:50.9` PLUS #2 · THE TOWN FAIR | флажки колышутся | BG fair code; LEON |
| S038 | 01:53.0–01:57.1 | The whack-a-mole machine shows each mole for less than half a second. | FAIR | Автомат с дырами, кроты высовываются по очереди, таймер 0,5 s. | `01:55.9` < 0.5 SECOND | кроты выскакивают | machine; moles |
| S039 | 01:57.1–01:59.9 | Leon's mallet is waiting at every hole. | FAIR | Leon с молотком у автомата, молоток уже над каждой дырой, кроты бьются. | — | удары молотком по очереди | LEON; mallet; machine |
| S040 | 01:59.9–02:05.6 | The attendant hands over the biggest stuffed bear in the booth, and the bear is bigger than Leon. | FAIR | Работник палатки вручает огромного плюшевого медведя, медведь больше Leon. | — | медведь вручается | LEON; ATTENDANT; bear |
| S041 | 02:05.6–02:08.0 | Plus number three, the cafeteria. | CAFE | Столовая, дети с подносами в очереди. | `02:06.3` PLUS #3 · THE CAFETERIA | плашка | BG cafeteria; LEON; KIDS |
| S042 | 02:08.0–02:09.8 | A kid trips with a full tray, | CAFE | Мальчик с подносом споткнулся, поднос с едой летит вверх. | — | падает, поднос вылетает | KID; tray; food |
| S043 | 02:09.8–02:14.4 | and Leon catches the milk, the apple, and the pudding before any of them reach the floor. | CAFE | Leon на лету ловит молоко, яблоко и пудинг, поднос в другой руке, три предмета в руках. | — | три предмета у Leon | LEON; milk; apple; pudding |
| S044 | 02:14.4–02:17.1 | The kid doesn't even realize he tripped. | CAFE | Мальчик лежит на полу и недоумевает, Leon ставит поднос ему на стол. | — | мальчик моргает | KID; LEON; tray |
| S045 | 02:17.1–02:19.6 | Plus number four, tag. | FIELD | Площадка, дети играют в пятнашки. | `02:18.1` PLUS #4 · TAG | плашка | BG field; KIDS; LEON |
| S046 | 02:19.6–02:21.7 | Nobody can tag him, ever. | FIELD | Три водящих тянутся к Leon, он уходит от каждой руки. | — | руки хватают воздух | KIDS; LEON |
| S047 | 02:21.7–02:25.3 | He plays the whole game at a walk, with his hands in his pockets. | FIELD | Leon идёт шагом, руки в карманах, водящие кучей запыхались. | — | Leon идёт, водящие падают | KIDS; LEON |
| S048 | 02:25.3–02:30.6 | But before you get too excited, this is reflexes, not brains. | CLASS | Класс, на доске «REFLEXES ≠ BRAINS», Leon задумался. | `02:28.4` REFLEXES ≠ BRAINS | плашка | BG classroom; LEON |
| S049 | 02:30.6–02:34.4 | Question seven on the math quiz is still question seven. | CLASS | Листок теста, вопрос 7 с большим вопросом, Leon смотрит в растерянности. | `02:31.3` QUESTION 7 | ручка зависла | LEON; paper |
| S050 | 02:34.4–02:36.7 | But then you start noticing the problems. | CLASS | Leon хмурится, на заднем плане мигает свет. | `02:36.0` PROBLEMS | свет мигает | BG classroom; LEON |
| S051 | 02:36.7–02:38.9 | Problem one, the lights. | CLASS | Лампа под потолком, подпись PROBLEM 1 · THE LIGHTS. | `02:37.3` PROBLEM 1 · THE LIGHTS | плашка | lamp; LEON |
| S052 | 02:38.9–02:44.2 | Small animals with fast metabolisms, like flies, see the world at a higher refresh rate. | VOID | Муха с крупными глазами, рядом мелкие значки; подпись «FASTER BRAIN = HIGHER REFRESH RATE». | — | муха парит | fly; icons |
| S053 | 02:44.2–02:51.6 | A 2013 study in the journal Animal Behaviour found that link, and it's one reason a fly dodges your hand so easily. | VOID | Карточка исследования: журнал Animal Behaviour 2013, рука взмахивает, муха уворачивается. | `02:44.7` ANIMAL BEHAVIOUR · 2013 | карточка, муха улетает от руки | card; fly; hand |
| S054 | 02:51.6–02:55.8 | Leon is now the fly, and flies live in a flickering world. | CLASS | Leon с мушиными глазами-фасетами, вокруг мерцает свет. | — | свет мерцает | LEON; flicker |
| S055 | 02:55.8–03:01.3 | A human eye stops seeing a flickering light as flicker at around sixty flashes a second. | VOID | Лампа мигает, шкала 60 вспышек в секунду, надпись «60 FLASHES / SEC». | `02:59.7` 60 FLASHES / SEC | мигание, шкала | lamp; gauge |
| S056 | 03:01.3–03:02.8 | Above that, it looks steady. | VOID | Лампа горит ровно, надпись «LOOKS STEADY». | `03:02.5` LOOKS STEADY | свет ровный | lamp |
| S057 | 03:02.8–03:07.3 | Ten times faster, and that limit moves to six hundred. | VOID | Шкала растёт с 60 до 600, стрелка прыгает. | `03:05.9` 60 → 600 | стрелка прыгает | gauge |
| S058 | 03:07.3–03:13.1 | Now look at the lights in your school. They run on the power grid, and they flicker a hundred and twenty times a second. | CLASS | Лампы в классе мигают очень часто, надпись «120 FLICKERS / SEC». | `03:11.4` 120 FLICKERS / SEC | лампы мерцают (без быстрых стробов) | BG classroom; lamps |
| S059 | 03:13.1–03:16.4 | Almost nobody notices. Leon notices. | CLASS | Дети сидят спокойно, один Leon прищурился и держится за лоб. | `03:15.5` LEON NOTICES | Leon щурится | KIDS; LEON |
| S060 | 03:16.4–03:18.8 | His classroom looks like a bad disco, | CLASS | Класс как дискотека: цветные вспышки, Leon за партой в очках-звёздах. | `03:18.2` BAD DISCO | цветные лучи | BG classroom; LEON; disco |
| S061 | 03:18.8–03:24.3 | every screen looks like a slideshow, and by Wednesday he has a headache that won't leave. | CLASS | Экран компьютера показывает слайды вместо видео, Leon держится за голову, над головой молнии боли. | `03:21.3` WEDNESDAY | слайды переключаются | LEON; screen |
| S062 | 03:24.3–03:26.8 | Problem two, the waiting. | KITCHEN | Кухня, подпись PROBLEM 2 · THE WAITING. | `03:25.0` PROBLEM 2 · THE WAITING | плашка | BG kitchen; LEON; DAD |
| S063 | 03:26.8–03:34.0 | People still talk at the same speed. But Leon's brain now gets ten times more thinking between every word. | KITCHEN | Dad говорит, у каждого слова над ним медленно ползёт полоска; Leon уже заскучал. | — | слова ползут | DAD; LEON |
| S064 | 03:34.0–03:38.7 | Dad asks, "How was school?" and before he reaches the word school, | KITCHEN | Dad спрашивает, Leon уже ответил и мысли про 50 ответов в облаках-пузырях. | `03:35.5` HOW WAS SCHOOL? | пузыри мыслей множатся | DAD; LEON |
| S065 | 03:38.7–03:43.6 | Leon has answered, thought of fifty better answers, and counted the kitchen tiles. | KITCHEN | Leon считает плитки на полу, на каждой цифра. | `03:40.6` 50 BETTER ANSWERS | цифры на плитках | LEON; tiles |
| S066 | 03:43.6–03:48.2 | Ms. Park says, "Good morning, class," and Leon ages a little. | CLASS | Ms. Park у доски говорит, Leon за партой стареет: борода и седые волосы. | `03:45.1` GOOD MORNING, CLASS. | Leon седеет | PARK; LEON |
| S067 | 03:48.2–03:52.3 | Waiting two minutes for the microwave feels like twenty. | KITCHEN | Микроволновка с таймером 2:00, Leon смотрит на неё, часы показывают 20 минут. | `03:51.0` 2 MIN = 20 | таймер идёт медленно | microwave; LEON |
| S068 | 03:52.3–03:55.6 | Waiting for Owen to finish a joke is a tragedy. | CAFE | Owen рассказывает шутку, Leon в позе facepalm/ждёт, над Owen пузырь с шуткой. | `03:54.5` A TRAGEDY | Leon вздыхает | OWEN; LEON |
| S069 | 03:55.6–03:58.0 | Problem three, the bill. | VOID | Чек со счётом, подпись PROBLEM 3 · THE BILL. | `03:56.2` PROBLEM 3 · THE BILL | плашка | receipt |
| S070 | 03:58.0–04:04.2 | Your brain is only about two percent of your body weight, but it burns about twenty percent of your energy. | VOID | Два круга: 2% тела (мозг), 20% энергии (заполненная диаграмма). | `03:59.8` 2% OF YOUR BODY; `04:02.5` 20% OF YOUR ENERGY | круги заполняются | pie×2; brain |
| S071 | 04:04.2–04:08.6 | That comes from a 2002 paper by Marcus Raichle and Debra Gusnard. | VOID | Карточка статьи: Raichle & Gusnard, 2002. | `04:05.4` RAICHLE & GUSNARD · 2002 | карточка | card |
| S072 | 04:08.6–04:13.2 | So a brain running ten times faster is not going to run for free. | VOID | Мозг с шестерёнками и кошельком, шкала батареи быстро падает. | — | батарея падает | brain; battery |
| S073 | 04:13.2–04:19.4 | Nobody knows exactly how much extra it costs, so that part is a guess, but Leon's stomach has already voted. | KITCHEN | Leon держится за живот, над головой «?», желудок урчит. | `04:16.7` THIS PART IS A GUESS | желудок урчит | LEON; qmark |
| S074 | 04:19.4–04:22.4 | Breakfast number one. Breakfast number two. | KITCHEN | Leon съедает один завтрак, потом второй: две пустые тарелки и Dad удивлённо. | `04:20.1` BREAKFAST #1; `04:21.6` BREAKFAST #2 | тарелки множатся | LEON; DAD; plates |
| S075 | 04:22.4–04:28.6 | At lunch, he finishes his tray, then Owen's tray, then half of Chase's, and Chase doesn't dare argue. | CAFE | Leon за столом, три пустых подноса стопкой, Owen и Chase смотрят испуганно. | — | подносы растут стопкой | LEON; OWEN; CHASE; trays |
| S076 | 04:28.6–04:30.6 | Mom starts counting the toast. | KITCHEN | Mom считает ломти тоста на тарелке, Leon тянется к тосту. | — | Mom считает пальцем | MOM; LEON; toast |
| S077 | 04:30.6–04:35.6 | By Thursday, Leon has eaten four sandwiches before first period, and he's still hungry. | KITCHEN | Четыре бутерброда на тарелках, Leon всё ещё голодный, живот пустой. | `04:31.0` THURSDAY | бутерброды исчезают | LEON; sandwiches |
| S078 | 04:35.6–04:38.0 | Biscuit starts guarding his own bowl from him. | KITCHEN | Biscuit закрывает миску собой и рычит на Leon. | — | Biscuit над миской | BISCUIT; LEON; bowl |
| S079 | 04:38.0–04:43.2 | A fast brain is an expensive brain, and nobody warned Leon's lunch money. | KITCHEN | Leon с пустым кошельком, из которого вылетает моль. | — | моль вылетает | LEON; wallet |
| S080 | 04:43.2–04:45.9 | Problem four, the rules. | FIELD | Школьное поле, подпись PROBLEM 4 · THE RULES. | `04:44.0` PROBLEM 4 · THE RULES | плашка | BG field; KIDS |
| S081 | 04:45.9–04:48.5 | Friday is field day, the fifty meter dash. | FIELD | Старт: шесть ребят в ряд на линии, тренер с пистолетом, лента на финише; подпись «FRIDAY · 50 M». | `04:46.5` FRIDAY · 50 M DASH | ребята встают на линию | BG field; LEON; KIDS; COACH |
| S082 | 04:48.5–04:51.6 | The starting gun goes off, and Leon is already gone. | FIELD | Выстрел, дымок, Leon уже у финиша, остальные ещё на старте. | — | Leon уносится | LEON; KIDS; COACH; gun |
| S083 | 04:51.6–04:54.5 | His legs left before the other kids even knew it was a gun. | FIELD | Leon на финише, остальные только начали шаг, над ними «?». | — | остальные стартуют | LEON; KIDS |
| S084 | 04:54.5–04:58.0 | Coach Dunn blows the whistle. "False start. Disqualified." | FIELD | Тренер Dunn со свистком, показывает красную карточку. | `04:56.4` FALSE START. DISQUALIFIED. | карточка вверх | COACH; LEON; card |
| S085 | 04:58.0–05:01.6 | Leon stares at him. "I started after the gun!" | FIELD | Leon возмущён, руки в стороны. | `05:00.1` I STARTED AFTER THE GUN! | Leon жестикулирует | LEON; COACH |
| S086 | 05:01.6–05:07.1 | "Son, anything under a tenth of a second means you must have guessed. It's an official rule." | FIELD | Dunn объясняет, показывает на табличку «0.1 s». | `05:02.0` SON, ANYTHING UNDER A TENTH OF A SECOND MEANS YOU MUST HAVE GUESSED. IT’S AN OFFICIAL RULE. | Dunn показывает табличку | COACH; LEON; sign |
| S087 | 05:07.1–05:18.1 | And it really is. World Athletics uses it, and in 2022 a sprinter named Devon Allen was thrown out of a World Championships final for reacting in ninety-nine thousandths of a second. | VOID | Карточка Devon Allen 2022, на ней время 0,099 с и красный крест. | `05:10.1` DEVON ALLEN · 2022 · 0.099 S | карточка, красный крест | card |
| S088 | 05:18.1–05:21.3 | Leon reacts four times faster than that limit. | VOID | Шкала 0,1 s и метка Leon на 0,025, стрелка ×4. | `05:19.1` ×4 FASTER THAN THE LIMIT | метка Leon у нуля | gauge |
| S089 | 05:21.3–05:24.8 | So next race, he waits. On purpose. | FIELD | Leon на старте, часы с обратным отсчётом, он ждёт, глаза на пистолет. | — | Leon стоит, остальные стартуют | LEON; KIDS; COACH |
| S090 | 05:24.8–05:29.0 | He counts one Mississippi in his head, runs, and finishes fourth. | FIELD | Leon над головой «ONE MISSISSIPPI», потом бежит и финиширует четвёртым: табло «4TH». | `05:26.0` ONE MISSISSIPPI… | Leon считает, бежит | LEON; KIDS; podium |
| S091 | 05:29.0–05:32.6 | For the first time all week, nobody suspects a thing. | FIELD | Зрители равнодушно хлопают, Leon доволен, никто ничего не подозревает. | — | аплодисменты | KIDS; LEON |
| S092 | 05:32.6–05:37.2 | He's the only kid in history who has to fake being slow. | FIELD | Leon изображает усталость: пыхтит и вытирает лоб, на заднем плане подпись. | `05:35.8` FAKING SLOW | Leon притворно пыхтит | LEON |
| S093 | 05:37.2–05:39.8 | Saturday afternoon, the park. | PARK | Парк, лавочка, дерево; подпись SATURDAY AFTERNOON. | `05:38.1` SATURDAY · THE PARK | камера плывёт | BG field/park; LEON; BISCUIT |
| S094 | 05:39.8–05:42.8 | Leon holds Biscuit's leash while Mom buys ice cream. | PARK | Leon держит поводок, Biscuit рядом, Mom уходит к киоску мороженого. | — | Mom уходит | LEON; BISCUIT; MOM; kiosk |
| S095 | 05:42.8–05:47.2 | A squirrel darts across the grass, and Biscuit's collar slips right over his head. | PARK | Белка бежит по траве, Biscuit вырывается, ошейник соскальзывает с головы. | — | ошейник слетает | BISCUIT; squirrel; LEON; leash |
| S096 | 05:47.2–05:50.9 | The squirrel runs for the road. Biscuit runs after the squirrel. | PARK | Белка и Biscuit бегут к дороге справа, Leon смотрит им вслед. | — | погоня вправо | BISCUIT; squirrel; LEON |
| S097 | 05:50.9–05:55.4 | Across the street, a delivery van turns the corner, and the driver is looking at his map. | ROAD | Улица: вдали поворачивает фургон, водитель смотрит в карту. | — | фургон выезжает | BG street; van; DRIVER |
| S098 | 05:55.4–05:58.4 | Leon sees all of it at once. | PARK | Крупный Leon, глаза расширены, три мини-кадра вокруг: пёс, белка, фургон. | `05:57.6` ALL AT ONCE | кадры вспыхивают | LEON; icons |
| S099 | 05:58.4–06:05.1 | The van is doing thirty kilometers an hour, about nineteen miles an hour, and Biscuit is two seconds from the road. | ROAD | Дорога: фургон слева (30 km/h), Biscuit у обочины справа, таймер 2 s. | `05:59.6` 30 KM/H · 19 MPH; `06:03.5` 2 SECONDS | фургон едет, Biscuit бежит | BG street; van; BISCUIT; LEON |
| S100 | 06:05.1–06:07.4 | And this is where rule two matters. | VOID | Доска: RULE 2, Leon показывает пальцем на неё. | `06:06.6` RULE 2 | карточка | LEON; board |
| S101 | 06:07.4–06:10.5 | He can't run faster than a ten year old, and he knows it. | PARK | Leon смотрит на свои ноги, они те же; подпись «SAME LEGS». | `06:08.1` SAME LEGS | Leon смотрит вниз | LEON |
| S102 | 06:10.5–06:15.0 | But a normal kid would have lost a quarter of a second just understanding what he's looking at. | PARK | Обычный ребёнок застыл, над ним шкала 0,25 с крутится. | `06:12.2` −0.25 S | ребёнок стоит | KID; bar |
| S103 | 06:15.0–06:18.7 | That quarter of a second is about one big step. | ROAD | След от одного большого шага на асфальте, Leon рядом. | `06:17.8` 1 STEP | след появляется | LEON; footprint |
| S104 | 06:18.7–06:23.1 | One step is the whole difference between a dog and a van. | ROAD | Весы: на одной чаше пёс, на другой фургон, между ними один шаг. | — | шаг между ними | BISCUIT; van; step |
| S105 | 06:23.1–06:25.6 | Leon doesn't think. He goes. | PARK | Leon срывается с места, пыль за ногами. | `06:24.8` GO! | рывок | LEON |
| S106 | 06:25.6–06:27.4 | Dive, grab, pull. | ROAD | Три кадра: прыжок, хват, рывок назад. | `06:26.1` DIVE; `06:26.4` GRAB; `06:26.9` PULL | три позы подряд | LEON; BISCUIT |
| S107 | 06:27.4–06:31.4 | The tires scream, and the bumper stops one hand away from Leon's shoes. | ROAD | Фургон тормозит с дымом, бампер в одной ладони от кроссовок Leon. | `06:28.0` SCREEEECH | фургон тормозит | van; LEON; BISCUIT |
| S108 | 06:31.4–06:36.7 | His knees are skinned, his elbow is bleeding, and the dog in his arms is licking his face. | ROAD | Leon сидит на асфальте, ссадины, пластыри, пёс лижет лицо. | — | пёс лижет | LEON; BISCUIT |
| S109 | 06:36.7–06:41.3 | The driver climbs out, shaking. "Kid, how did you even see me?" | ROAD | Водитель выходит из фургона, руки трясутся. | `06:39.1` KID, HOW DID YOU EVEN SEE ME? | водитель выходит | DRIVER; LEON; van |
| S110 | 06:41.3–06:44.5 | Leon looks up. "I just started early." | ROAD | Leon поднимает взгляд на водителя, пёс на руках. | `06:43.1` I JUST STARTED EARLY. | Leon поднимает голову | LEON; DRIVER; BISCUIT |
| S111 | 06:44.5–06:49.8 | Mom runs over, drops the ice cream, and hugs him so hard his elbow stops hurting. | PARK | Mom бежит, роняет мороженое, обнимает Leon. | — | мороженое падает | MOM; LEON; icecream |
| S112 | 06:49.8–06:52.5 | By dinner, the whole street knows. | NIGHT | Улица с домами, из окон смотрят соседи; подпись THE WHOLE STREET KNOWS. | `06:51.5` THE WHOLE STREET KNOWS | соседи выглядывают | BG street; KIDS |
| S113 | 06:52.5–06:54.5 | Mom books a doctor for Monday. | LIVING | Mom по телефону, на календаре «MONDAY · DOCTOR». | `06:54.1` MONDAY · DOCTOR | Mom звонит | MOM; phone; calendar |
| S114 | 06:54.5–07:00.5 | The doctor says every test is normal, except the reaction test, where the computer shows an error and the doctor says, | CLASS | Кабинет врача: Leon у компьютера, на экране «ERROR». | `06:59.1` ERROR | экран мигает | DOCTOR; LEON; computer |
| S115 | 07:00.5–07:02.7 | "Let's try the other computer." | CLASS | Врач переносит Leon к другому компьютеру, снова ERROR. | `07:00.8` LET’S TRY THE OTHER COMPUTER. | врач чешет затылок | DOCTOR; LEON; computers |
| S116 | 07:02.7–07:07.3 | Dad puts a Band-Aid on every scrape, and a second Band-Aid on top, for luck. | LIVING | Dad клеит Leon пластыри: на каждую царапину и ещё один сверху. | `07:07.0` +1 BAND-AID FOR LUCK | пластыри множатся | DAD; LEON |
| S117 | 07:07.3–07:11.4 | Biscuit forgives him for the sausage. Completely. Forever. | LIVING | Biscuit кладёт голову Leon на колени, виляет хвостом. | `07:10.7` FORGIVEN. FOREVER. | хвост виляет | BISCUIT; LEON |
| S118 | 07:11.4–07:16.1 | That's the thing about being ten times faster. It doesn't make you a superhero. | LIVING | Leon сидит с пластырями, на заднем плане силуэт с плащом перечёркнут «NOT A SUPERHERO». | `07:15.3` NOT A SUPERHERO | плашка | LEON; cape |
| S119 | 07:16.1–07:23.5 | It gives you one step. And sometimes one step is enough, if you take it. | LIVING | Один большой след шага светится, надпись «ONE STEP». | `07:17.4` ONE STEP | след светится | LEON; footprint |
| S120 | 07:23.5–07:27.6 | But that night, Owen holds the ruler again. | KITCHEN | Ночная кухня: Owen и Leon за столом, Owen держит линейку. | — | линейка вверх | BG kitchen; OWEN; LEON; ruler |
| S121 | 07:27.6–07:36.0 | Leon catches it. Three millimeters. Owen drops it again. Two. Again. One. | KITCHEN | Линейка падает три раза: 3 мм, 2 мм, 1 мм; на экране счётчик убывает. | `07:29.5` 3 MM; `07:32.9` 2 MM; `07:35.4` 1 MM | три падения подряд | OWEN; LEON; ruler |
| S122 | 07:36.0–07:40.1 | By morning, Leon's hand is closing before Owen's fingers even open. | KITCHEN | Утро, Leon ловит линейку до того, как пальцы Owen разжались. | — | линейка не падает | OWEN; LEON; ruler |
| S123 | 07:40.1–07:44.9 | His reflexes aren't ten times faster anymore. They're still going. | VOID | Спидометр с шкалой ×10, стрелка выходит за край и продолжает идти. | `07:43.8` STILL GOING… | стрелка за край | gauge |
| S124 | 07:44.9–07:48.0 | So, what if they never stop? | VOID | Leon смотрит на зрителя, надпись крупно. | `07:47.0` WHAT IF THEY NEVER STOP? | плашка | LEON |
| S125 | 07:48.0–07:53.6 | And what would you do with reflexes ten times faster? Tell us in the comments. | VOID | Leon показывает пальцем на зрителя, подпись COMMENT. | `07:53.0` TELL US IN THE COMMENTS | Leon указывает | LEON; comment icon |
| S126 | 07:53.6–08:00.5 | And if you would have run for Biscuit too, subscribe, because part two is coming. | PARK | Leon и Biscuit рядом, кнопка SUBSCRIBE нажимается; подпись PART 2 IS COMING. | `07:55.6` SUBSCRIBE | кнопка нажимается | LEON; BISCUIT; button |

## Итоги
- Сцен: 126. Средняя длина 3.8 с, самая длинная 11.0 с (S087), самая короткая 1.3 с (S006). Итог 08:00.5.
- Строк текста на экране: 92.
- Гэги без звука: десять мячей и «0 HITS», загрузка над головами, линейка 25 см против 3 мм, блин на тарелке, медведь больше Leon, дискотека в классе, стареющий Leon, «ERROR» у врача, «0.099 S» красным крестом, «FAKING SLOW».
- Логика: «Wednesday» и «Thursday» в подписях стоят в моменты слов диктора; пятница = field day (одна подпись), суббота = парк, воскресной сцены нет; ночь = кухня после парка.
