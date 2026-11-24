# Раскадровка: ролик 11, «What If Your Punch Hit With 3 Tons of Force?»
Основа: `озвучка.mp3` (639.6 с = 10:39.6, ElevenLabs 1.2, без сокращений) и тайминги слов (`тайминги-слов.json`: Whisper small, выровнено по `сценарий.txt`). Ролик ускоряется ещё ×1,2.

## Хронометраж (лимит владельца: итог 8:00–9:00)
- Озвучка 10:39.6, после ×1,2: **08:53.0**, плюс хвост 2.5 с тишины, **итог 08:55.5**, в окне 8:00–9:00: да. Сокращений нет; проектный `input/voiceover.mp3` = озвучка ×1,2 + хвост.
- Времена `мм:сс.с` от начала итогового ролика; конец сцены = начало следующей.

## Герои
Все герои кодовые куклы Razgon, внешность одинаковая во всех сценах. Из прошлых роликов: Leon, Owen, Ms. Park, Coach Dunn, Mom, Dad. Новые (кодом): POPPY (6 лет, жёлтое платье, на утверждение владельцу), DADFAIR (папа в бандане), CAPTAIN, JANITOR.

| Герой | Как выглядит | Откуда |
|---|---|---|
| LEON | эталон канала (кепка capBack, красная футболка с молнией, серые шорты, оранжевые кроссовки) | ролики 01–10 |
| OWEN, MS. PARK, COACH DUNN, MOM, DAD | как в прошлых роликах | ролики 02–10 |
| POPPY | девочка 6 лет, жёлтое платье, два хвостика, ростом 0,6 Leon | новая, кодом |
| DADFAIR | папа в красной бандане и синей футболке | новый, кодом |
| KIDS, CAPTAIN | дети на ярмарке и в спортзале, глаза видны | кодом |

## Места
Фоны ярмарки (ролик 08), двора, кухни, спортзала, коридора из роликов 01–10; контейнер, силомер, аквагорка, гараж, дверь сарая, столб и прочее кодом. Новых картинок от OpenAI в сценах нет (только превью).

| Код | Место | Сцен |
|---|---|---|
| FAIR | ярмарка (фон fair) | 68 |
| YARD | двор с гаражом (фон front_yard) | 13 |
| KITCHEN | кухня | 4 |
| KITCHEN_N | кухня ночью | 6 |
| ROOM | комната Leon | 6 |
| HALL | школьный коридор | 7 |
| GYM | спортзал | 4 |
| SHED | за спортзалом: сарай (фон schoolyard) | 12 |
| CAMP | лагерь с палаткой | 2 |
| ARCADE | аркада | 1 |
| LAB | лаборатория | 1 |
| VOID | абстрактный фон: схемы, графики, плашки | 32 |

## Сцены

| № | Время | Озвучка | Место | Кадр | Текст на экране | Анимация | Ассеты |
|---|---|---|---|---|---|---|---|
| S001 | 00:00.0–00:02.2 | Saturday afternoon, the spring fair. | FAIR | Ярмарка: колесо обозрения, гирлянды, палатки, люди гуляют; плашка SATURDAY · SPRING FAIR. | `00:00.0` SATURDAY · SPRING FAIR | камера медленно наезжает | BG fair; палатки; KIDS |
| S002 | 00:02.2–00:08.0 | A red strength tester stands behind the cotton candy stand: a leather bag on a spring, a glowing screen, | FAIR | Красный силомер за палаткой сладкой ваты: стойка, кожаная груша на пружине, экран слева-сверху от груши. | — | пружина качается | силомер; cotton candy stand |
| S003 | 00:08.0–00:12.2 | and a sign that says, "Scale tops out at two thousand pounds." | FAIR | Табличка рядом с силомером крупно: SCALE TOPS OUT AT 2000 LBS; экран светится 0. | `00:08.5` SCALE TOPS OUT AT 2000 LBS | табличка и экран | силомер; табличка |
| S004 | 00:12.2–00:17.5 | Owen goes first. He swings, and the screen says three hundred and ten. | FAIR | Owen бьёт по груше, груша качнулась, экран показывает 310. | `00:15.6` 310 | удар, качание, число бежит | силомер; OWEN |
| S005 | 00:17.5–00:22.1 | A dad in a bandana hits six hundred and forty and wins a plush shark. | FAIR | Папа в бандане бьёт, экран 640, Coach Dunn вручает плюшевую акулу. | `00:18.9` 640 | удар, число, акула | силомер; DADFAIR; DUNN; plush shark |
| S006 | 00:22.1–00:27.8 | Then Leon walks up. Ninety pounds, backwards cap. "I've got this." | FAIR | Leon подходит к силомеру слева, Owen и толпа смотрят; Leon в эталонной кепке; плашка 90 LBS. | `00:23.6` 90 LBS; `00:26.6` I've got this. | Leon идёт, поднимает кулак | силомер; LEON; OWEN; KIDS |
| S007 | 00:27.8–00:31.2 | Coach Dunn, who runs the booth, doesn't even look up. | FAIR | Dunn за стойкой читает газету и не смотрит на Leon. | — | Dunn листает газету | DUNN; stand |
| S008 | 00:31.2–00:34.5 | Leon punches. The bag doesn't swing. | FAIR | Leon бьёт кулаком по груше; груша на мгновение остаётся на месте, пружина сжата, экран мигает. | — | удар, пауза | силомер; LEON; DUNN |
| S009 | 00:34.5–00:35.8 | It leaves. | FAIR | Груша срывается с пружины и улетает вправо; у пружины остаётся обрывок. | — | груша летит вправо | силомер; LEON; bag |
| S010 | 00:35.8–00:37.8 | It clears the lemonade stand and | FAIR | Общий план слева направо: Leon, силомер, лимонадная палатка, аквагорка; груша перелетает палатку. | — | груша летит над палаткой | fair wide; lemonade stand; dunk tank; Park; bag |
| S011 | 00:37.8–00:42.9 | slams into the dunk tank target, and Ms. Park drops into the water in her best sweater. | FAIR | Крупно аквагорка: груша бьёт в красную мишень, сиденье складывается, Ms. Park падает в воду, брызги. | — | удар, падение, брызги | dunk tank; PARK; bag |
| S012 | 00:42.9–00:49.8 | The screen counts past two thousand, flashes E, R, R, and goes dark. | FAIR | Экран силомера: цифры бегут за 2000, гаснет, мигает E R R, тёмный экран; Dunn смотрит на экран. | — | число бежит, ERR, чёрный экран | силомер; screen; DUNN |
| S013 | 00:49.8–00:52.7 | "Dude," says Owen, "you broke it." | FAIR | Owen смотрит на Leon, Leon смотрит на кулак; на заднем плане Ms. Park мокрая в баке. | `00:50.2` Dude, you broke it. | Owen показывает на силомер | OWEN; LEON; dunk tank; PARK |
| S014 | 00:52.7–00:56.3 | So, what if your punch hit with three tons of force? | VOID | Плашка названия: Leon с кулаком крупно, над кулаком 3 TONS. | `00:53.2` WHAT IF YOUR PUNCH HIT WITH 3 TONS OF FORCE? | кулак пульсирует | LEON; fist; plate |
| S015 | 00:56.3–00:59.8 | And what happens when nothing around you is built for it? | FAIR | Ярмарка с хрупкими вещами: шарики, стаканы, торт, стекло; камера панорамирует; все хрупкое. | — | панорама | fair; balloons; cups; cake |
| S016 | 00:59.8–01:01.4 | Here's how it works. | VOID | Плашка HOW IT WORKS на фоне; три карточки правил. | `01:00.3` HOW IT WORKS | карточки появляются | plate |
| S017 | 01:01.4–01:04.5 | Rule one. It only works when you throw a punch. | VOID | Карточка RULE 1: ONLY WHEN YOU THROW A PUNCH; Leon с кулаком. | `01:01.8` RULE 1: ONLY A PUNCH | карточка и кулак | plate; LEON |
| S018 | 01:04.5–01:08.5 | Handshakes, high fives and holding a fork are totally normal. | VOID | Leon жмёт руку Owen, даёт пять, держит вилку: всё нормально, галочки. | `01:04.5` HANDSHAKE ✓; `01:05.5` HIGH FIVE ✓; `01:06.5` FORK ✓ | три мини-картинки с галочками | LEON; OWEN; fork |
| S019 | 01:08.5–01:09.8 | Rule two. | VOID | Карточка RULE 2: A FULL SWING = 3 TONS. | `01:09.2` RULE 2: FULL SWING | карточка | plate |
| S020 | 01:09.8–01:12.8 | A full swing hits with three tons of force. | VOID | Кулак Leon со стрелкой удара и надписью 3 TONS; рядом гиря «3 TONS». | `01:11.4` 3 TONS | кулак бьёт вперёд | LEON; fist; weight |
| S021 | 01:12.8–01:18.4 | That's six thousand pounds, about two small cars standing on a spot the size of your knuckles. | VOID | 6000 LBS: на кулак Leon сверху опускаются два маленьких автомобиля; кулак упирается в пятно размером с костяшки. | `01:13.4` 6,000 LBS; `01:15.0` 2 SMALL CARS | машины опускаются на кулак | fist; 2 cars |
| S022 | 01:18.4–01:24.8 | For scale, in a study published in two thousand and five, seven Olympic boxers punched a crash test dummy. | LAB | Лаборатория: олимпийский боксёр бьёт манекен для краш-теста, на манекене датчик; плашка STUDY · 2005. | `01:19.8` STUDY · 2005 | удар по манекену | boxer; dummy; sensor |
| S023 | 01:24.8–01:28.5 | The average punch landed with about seven hundred and seventy pounds. | VOID | Столбик «Olympic boxers 770 LBS». | — | столбик растёт | bar chart |
| S024 | 01:28.5–01:31.9 | Leon hits eight times harder. | VOID | Два столбика: Olympic boxer 770 и Leon 6000, надпись 8×. | `01:29.6` 8× | второй столбик выстреливает | bar chart; LEON |
| S025 | 01:31.9–01:33.2 | Rule three. | VOID | Карточка RULE 3: FORCE FOLLOWS EFFORT. | `01:32.5` RULE 3: EFFORT | карточка | plate |
| S026 | 01:33.2–01:35.5 | The force follows effort. | VOID | Рычажок усилия 0–100% и шкала силы 0–6000. | — | ползунок двигается | slider |
| S027 | 01:35.5–01:39.8 | Even a tap at a tenth of your strength lands with six hundred pounds. | VOID | Leon слегка касается кулаком: ползунок на 10%, 600 LBS. | `01:37.0` 10% = 600 LBS | касание, число | LEON; slider |
| S028 | 01:39.8–01:42.9 | Your bones and your skin can take all of it. | VOID | Кулак Leon в рентгене: кости целы, кожа цела, зелёная галочка. | `01:40.3` BONES OK ✓ | рентген мигает | fist xray |
| S029 | 01:42.9–01:47.1 | The rest of you stays exactly as big and as heavy as yesterday. | VOID | Leon на весах: 90 LBS, рост тот же; надпись «SAME SIZE · SAME WEIGHT». | `01:43.2` SAME SIZE · SAME WEIGHT | весы показывают 90 | LEON; scales |
| S030 | 01:47.1–01:49.5 | That last part is going to matter. | VOID | Leon с вопросительным лицом, плашка REMEMBER THIS. | `01:49.0` REMEMBER THIS | плашка | plate; LEON |
| S031 | 01:49.5–01:51.0 | But first, the fun part. | VOID | Плашка THE FUN PART, Leon подпрыгивает. | `01:50.5` THE FUN PART | плашка | plate; LEON |
| S032 | 01:51.0–01:55.2 | Dad spends ten minutes fighting a tent stake in rock hard ground. | CAMP | Лагерь на траве: Dad с киянкой сидит на корточках над колышком палатки, пот, колышек торчит. | `01:52.0` 10 MIN | Dad бьёт, колышек не лезет | DAD; tent stake; mallet; tent |
| S033 | 01:55.2–01:59.0 | Leon taps it once, and it disappears up to the cap. | CAMP | Leon касается колышка кулаком: колышек уходит в землю по шляпку, остаётся шляпка на траве. | — | тап, колышек исчезает | LEON; DAD; stake |
| S034 | 01:59.0–02:01.9 | Owen's locker has been stuck since October. | HALL | Коридор школы: Owen дёргает дверцу шкафчика, не открывается. | `02:01.2` STUCK SINCE OCTOBER | Owen тянет | OWEN; locker; HALL |
| S035 | 02:01.9–02:06.4 | Leon taps it, and the door comes off in Owen's hands like a pizza box lid. | HALL | Leon касается шкафчика, дверца отлетает и остаётся в руках Owen, как крышка от коробки. | — | тап, дверца в руках Owen | LEON; OWEN; locker door |
| S036 | 02:06.4–02:09.0 | The vending machine that swallowed Owen's dollar gives it back, | HALL | Автомат: Owen смотрит, Leon касается стекла, автомат отдаёт доллар. | `02:08.1` $1 | тап, доллар выпадает | vending machine; LEON; OWEN |
| S037 | 02:09.0–02:12.6 | plus nine bags of chips and a very confused look. | HALL | Из автомата сыплются пачки чипсов, Owen стоит по колено в чипсах с растерянным лицом. | `02:09.4` 9 BAGS | чипсы сыплются | chips; OWEN; LEON |
| S038 | 02:12.6–02:19.2 | At the arcade, Leon hits the sledgehammer game so hard the bell flies off and rings in the parking lot. | ARCADE | Аркада: Leon бьёт кулаком по игре с кувалдой, звонок вылетает вверх, в окне парковка. | — | удар, звонок летит | arcade game; bell; LEON |
| S039 | 02:19.2–02:23.6 | In gym class, he gets picked first for the first time in his life. | GYM | Спортзал: капитаны выбирают игроков, Leon первый, все смотрят на Leon. | `02:20.8` PICKED FIRST | выбор | LEON; KIDS; CAPTAIN |
| S040 | 02:23.6–02:27.4 | By Wednesday, kids are lining up to ask him for favors. | HALL | Очередь детей к Leon, у каждого бумажка «favor». | `02:24.3` WEDNESDAY | очередь растёт | LEON; KIDS×6 |
| S041 | 02:27.4–02:30.0 | Leon has never been this popular. | HALL | Leon доволен, руки на поясе, дети толпятся. | — | Leon красуется | LEON; KIDS |
| S042 | 02:30.0–02:33.4 | Then he tries to punch something that doesn't move. | HALL | Leon смотрит на стену, прищурился; плашка «something that doesn't move». | — | взгляд на стену | LEON |
| S043 | 02:33.4–02:34.7 | Problem one. | VOID | Плашка PROBLEM 1: RECOIL. | `02:34.0` PROBLEM 1: RECOIL | плашка | plate |
| S044 | 02:34.7–02:37.4 | Isaac Newton wrote it down in sixteen eighty-seven. | VOID | Портрет Ньютона, год 1687. | `02:36.2` 1687 | портрет | portrait Newton |
| S045 | 02:37.4–02:40.2 | Every push comes with an equal push back. | VOID | Две руки толкают друг друга, две равные стрелки. | `02:37.4` EVERY PUSH = EQUAL PUSH BACK | стрелки | arrows |
| S046 | 02:40.2–02:43.6 | In the backyard, Leon throws a punch at the garage wall. | YARD | Двор: гараж справа (стена с воротами), Leon слева лицом вправо готовится ударить по стене гаража. | — | замах | LEON; garage; hedge |
| S047 | 02:43.6–02:45.6 | Three tons go into the wall. | YARD | Кулак в стене: стрелка 3 TONS вправо, трещины. | `02:43.9` 3 TONS → | удар по стене | LEON; wall |
| S048 | 02:45.6–02:47.9 | Three tons also go into Leon. | YARD | Стрелка 3 TONS влево в Leon; Leon вздрагивает. | `02:46.3` ← 3 TONS | стрелка в Leon | LEON; arrow |
| S049 | 02:47.9–02:53.4 | He lifts off the grass and flies backward across the yard, about as fast as a kid on a bike. | YARD | Leon отрывается от травы и летит влево горизонтально, линии скорости; в кадре целиком. | `02:52.9` LIKE A KID ON A BIKE | полёт влево | LEON; speed lines |
| S050 | 02:53.4–02:56.8 | He lands in the neighbor's hedge, upside down. | YARD | Изгородь слева: из неё торчат ноги Leon вверх, листья сыплются. | — | приземление | hedge; LEON |
| S051 | 02:56.8–02:59.7 | The wall has a fist-sized hole in it. | YARD | Стена гаража с дырой размером с кулак, кирпичная пыль. | — | пыль оседает | garage wall hole |
| S052 | 02:59.7–03:02.6 | The hedge has a Leon-sized one. | YARD | Изгородь с дырой по силуэту Leon, ноги торчат. | — | листья | hedge hole; LEON |
| S053 | 03:02.6–03:05.5 | At practice, Coach Dunn just shrugs. | GYM | Тренировка: Dunn пожимает плечами, Leon растерянно стоит рядом. | — | Dunn пожимает плечами | DUNN; LEON; gym |
| S054 | 03:05.5–03:07.1 | "Boxers punch with their legs. | GYM | Dunn показывает на ноги, рядом боксёр бьёт мешок; плашка. | `03:05.8` Boxers punch with their legs. | Dunn показывает | DUNN; bag; boxer |
| S055 | 03:07.1–03:10.8 | The force goes into the floor, and the floor pushes back." | GYM | Боксёр бьёт мешок: стрелка от кулака, стрелка вниз в пол, стрелка пола обратно вверх в ноги. | `03:08.6` FLOOR PUSHES BACK | стрелки по цепочке | boxer; arrows |
| S056 | 03:10.8–03:13.6 | So Leon finds a post at the end of the yard. | YARD | Leon идёт по двору вправо к бетонному столбу в конце двора. | — | Leon идёт | LEON; post |
| S057 | 03:13.6–03:16.1 | He puts his back against it and tries again. | YARD | Leon спиной к столбу, лицом влево, поднимает кулак, мишень слева: ящик. | — | Leon встаёт, замах | LEON; post; box |
| S058 | 03:16.1–03:22.1 | The punch goes forward, the shove goes into the post, and Leon doesn't move an inch. | YARD | Удар влево: ящик разлетается, стрелка в столб, Leon не двигается, столб держится. | — | удар, Leon на месте | LEON; post; box |
| S059 | 03:22.1–03:24.0 | Problem two. | VOID | Плашка PROBLEM 2: TOUCH. | `03:23.1` PROBLEM 2: TOUCH | плашка | plate |
| S060 | 03:24.0–03:26.2 | Owen offers a fist bump. | YARD | Owen протягивает кулак для приветствия, Leon улыбается. | — | Owen тянет кулак | OWEN; LEON |
| S061 | 03:26.2–03:28.3 | Leon thinks he's barely touching it. | YARD | Лёгкий кулак Leon касается кулака Owen. | — | касание | OWEN; LEON |
| S062 | 03:28.3–03:34.3 | Owen's arm swings back like a gate in the wind, and he says, in a very small voice, that he's fine. | YARD | Рука Owen болтается как калитка; Owen с бледной улыбкой «I'm fine». | `03:33.5` I'm fine. | рука качается | OWEN arm; LEON |
| S063 | 03:34.3–03:37.3 | Leon realizes he can't touch anything. | ROOM | Leon смотрит на свои руки, комната, кровать. | — | Leon смотрит на руки | LEON; ROOM |
| S064 | 03:37.3–03:42.6 | He tries a pillow, and the pillow explodes into a cloud of feathers while the cat leaves the house. | ROOM | Leon касается подушки: она взрывается облаком перьев; кошка убегает. | — | взрыв перьев, кошка | pillow; feathers; cat; LEON |
| S065 | 03:42.6–03:44.8 | So he does what any kid would do. | ROOM | Leon идёт по комнате решительно. | — | Leon идёт | LEON |
| S066 | 03:44.8–03:47.1 | He borrows a carton of eggs. | KITCHEN | Кухня: Leon берёт упаковку яиц у Mom. | — | берёт яйца | LEON; MOM; egg carton |
| S067 | 03:47.1–03:50.5 | An egg can crack with just a few pounds if you hit it right. | VOID | Яйцо: стрелка лёгкого касания, надпись «A FEW POUNDS». | `03:49.0` A FEW POUNDS | яйцо трескается | egg |
| S068 | 03:50.5–03:53.9 | Out of six thousand, that's about one part in a thousand. | VOID | 6000 LBS: одна точка из тысячи выделена; «1 / 1,000». | `03:51.4` 1 / 1000 | точки | dots grid |
| S069 | 03:53.9–03:56.1 | His first punch makes an omelet. | KITCHEN | Leon бьёт яйцо на столе: омлет на сковороде и стол. | — | удар, омлет | LEON; egg; pan |
| S070 | 03:56.1–03:57.2 | So does the second. | KITCHEN | Второй омлет, брызги. | — | удар | LEON; eggs |
| S071 | 03:57.2–04:01.8 | By the twelfth, Mom stares into the pan. "Eggs again?" | KITCHEN | Mom смотрит на сковороду, рядом 12 омлетов; Leon виновато. | `04:00.6` Eggs again? | Mom смотрит | MOM; LEON; pan; omelets |
| S072 | 04:01.8–04:08.1 | Every night after that, Leon practices tapping with just his wrist, like flicking a crumb off the table. | ROOM | Ночь, Leon у стола, одним запястьем касается яйца; календарь. | `04:02.4` EVERY NIGHT | касание запястьем | LEON; egg; night |
| S073 | 04:08.1–04:12.0 | By Thursday, he can tap an egg, and the egg only wobbles. | ROOM | Яйцо только покачивается; Leon улыбается. | `04:08.4` THURSDAY | яйцо качается | LEON; egg |
| S074 | 04:12.0–04:17.8 | It's the hardest thing he's ever learned, and nobody will ever see him do it. | ROOM | Leon один у окна, ночь; никто не видит; крупный план Leon, уставший и гордый. | — | камера отъезжает | LEON; window |
| S075 | 04:17.8–04:19.0 | Problem three. | VOID | Плашка PROBLEM 3: PRESSURE. | `04:18.1` PROBLEM 3: PRESSURE | плашка | plate |
| S076 | 04:19.0–04:21.7 | Three tons sounds unstoppable. | SHED | Leon с гордой позой, кулак вверх. | — | Leon красуется | LEON |
| S077 | 04:21.7–04:23.0 | It isn't. | SHED | Крупно стальная дверь сарая; «It isn't». | — | дверь | steel door |
| S078 | 04:23.0–04:29.3 | On Monday, Leon is mad about a bad quiz grade, and he walks past the steel door of the equipment shed behind the gym. | SHED | За спортзалом: Leon идёт мрачный с листом теста D, справа стена спортзала и стальная дверь сарая. | `04:23.3` MONDAY | Leon идёт к двери | LEON; shed door; quiz |
| S079 | 04:29.3–04:30.6 | He punches it. | SHED | Leon бьёт стальную дверь. | — | удар | LEON; steel door |
| S080 | 04:30.6–04:32.5 | The door rings like a bell. | SHED | Дверь дрожит, кольца звука. | — | звон | steel door; rings |
| S081 | 04:32.5–04:37.9 | Leon yelps and shakes his hand, and the door has a dent no bigger than a coin. | SHED | Leon трясёт рукой, на двери вмятина с монету. | `04:37.1` DENT: SIZE OF A COIN | Leon трясёт рукой | LEON; dent |
| S082 | 04:37.9–04:39.1 | Here's why. | VOID | Плашка HERE'S WHY. | `04:38.3` HERE'S WHY | плашка | plate |
| S083 | 04:39.1–04:44.4 | What matters is how much force you use, and also how small a spot it lands on. | VOID | Формула: FORCE ÷ AREA = PRESSURE; кулак и острие. | — | формула | formula |
| S084 | 04:44.4–04:52.5 | Six thousand pounds on a fist-sized spot, about three square inches, is roughly two thousand pounds on every square inch. | VOID | 6000 LBS ÷ 3 SQ IN = 2000 PSI. | — | цифры | formula |
| S085 | 04:52.5–04:55.4 | A wooden door gives up long before that. | VOID | Деревянная дверь ломается под шкалой 2000 PSI. | — | дверь ломается | wood door; gauge |
| S086 | 04:55.4–05:04.0 | Ordinary structural steel doesn't start to bend until about thirty-six thousand pounds on every square inch, eighteen times more. | VOID | Два столбика: 2000 PSI и 36,000 PSI стали, 18×. | `05:01.5` 18× | столбик стали | bar chart |
| S087 | 05:04.0–05:10.3 | So Leon can wreck a fence, a dumpster and a brick mailbox, but a steel door just laughs at him. | VOID | Четыре картинки: забор, мусорный бак, кирпичный почтовый ящик сломаны; стальная дверь цела и смеётся. | — | картинки | fence; dumpster; mailbox; door |
| S088 | 05:10.3–05:17.1 | A kid who felt like a god for one weekend now has a sore hand and a dent he'll have to explain to the custodian. | SHED | Leon сидит у двери, рука в повязке, рядом уборщик. | — | Leon вздыхает | LEON; JANITOR; dent |
| S089 | 05:17.1–05:20.7 | Coach Dunn looks at the door and tells him something that sticks. | SHED | Dunn стоит у двери, смотрит на вмятину, Leon рядом. | — | Dunn показывает | DUNN; LEON; door |
| S090 | 05:20.7–05:24.3 | "Never fight the whole door. Find what's holding it. | SHED | Dunn поднимает палец; Leon слушает. | `05:21.2` Never fight the whole door. | Dunn говорит | DUNN; LEON |
| S091 | 05:24.3–05:26.1 | A latch, a hinge, a bolt. | SHED | Dunn показывает на петлю, засов и болты двери. | `05:24.4` LATCH · HINGE · BOLT | Dunn показывает | DUNN; hinge; bolt |
| S092 | 05:26.1–05:30.5 | Something small is always weaker than the whole." | SHED | Маленький болт на большой двери, подсветка. | `05:26.7` SMALL < WHOLE | подсветка болта | bolt |
| S093 | 05:30.5–05:34.9 | Leon nods. He doesn't know yet how soon he'll need it. | SHED | Leon кивает. | — | кивок | LEON; DUNN |
| S094 | 05:34.9–05:38.8 | The next Saturday is the fair again, and it's ninety degrees. | FAIR | Ярмарка в жару: термометр 90°, солнце, дети с мороженым; плашка NEXT SATURDAY. | `05:35.8` NEXT SATURDAY · 90° | солнце, термометр | fair; thermometer; sun |
| S095 | 05:38.8–05:43.3 | Owen's little cousin Poppy, six years old, is playing hide-and-seek behind the booths. | FAIR | Poppy (6 лет, жёлтое платье) бежит за палатками, Owen считает вслух, закрыв глаза. | — | Poppy бежит | POPPY; OWEN; fair |
| S096 | 05:43.3–05:46.0 | She finds the best hiding spot of all. | FAIR | Poppy останавливается у большого стального контейнера с призами за палатками. | — | Poppy замечает | POPPY; container |
| S097 | 05:46.0–05:51.6 | It's the big steel storage container where the fair keeps its prizes, and she climbs inside. | FAIR | Poppy залезает в контейнер: открытая дверь, внутри плюшевые акулы; она пролезает внутрь. | — | Poppy залезает | POPPY; container; sharks |
| S098 | 05:51.6–05:53.4 | The heavy door swings shut. | FAIR | Дверь контейнера захлопывается. | — | дверь захлопывается | container door |
| S099 | 05:53.4–05:55.9 | The latch drops with a clunk. | FAIR | Крупно: планка замка падает в кронштейн, звук, ЩЁЛК. | `05:55.0` CLUNK | планка падает | bracket; bar; padlock |
| S100 | 05:55.9–05:58.5 | Owen knocks. "Poppy?" | FAIR | Owen стучит в дверь контейнера, зовёт. | `05:57.8` Poppy? | Owen стучит | OWEN; container |
| S101 | 05:58.5–06:02.6 | A tiny voice says, "It's really hot in here." | FAIR | Из контейнера тонкая реплика; Owen замирает; пузырь из контейнера. | `06:01.3` It's really hot in here. | реплика из контейнера | container; OWEN |
| S102 | 06:02.6–06:05.5 | The container has baked in the sun since morning. | FAIR | Контейнер на солнце: волны жара, термометр растёт до 110°. | `06:03.8` 110° | жара растёт | container; sun; thermometer |
| S103 | 06:05.5–06:09.4 | The manager has the only key, and he's an hour away. | FAIR | Управляющий далеко: телефон, иконка «1 HOUR»; Owen и Dunn смотрят на часы. | `06:08.1` 1 HOUR AWAY | часы | phone; map; clock |
| S104 | 06:09.4–06:11.4 | Coach Dunn calls the fire department. | FAIR | Dunn прижимает телефон к уху. | — | Dunn звонит | DUNN; phone |
| S105 | 06:11.4–06:15.2 | "Twenty minutes," he says, and everyone knows that's too long. | FAIR | Dunn говорит «Twenty minutes»; толпа переглядывается; часы. | `06:11.4` 20 MIN | тревога | DUNN; KIDS; clock |
| S106 | 06:15.2–06:21.1 | The lock is a thick old padlock on a rusty bar, and the bolt cutters are in a van across town. | FAIR | Крупно замок на ржавой планке и болторез в машине вдали (картинка вдали). | — | замок, фургон вдали | padlock; bar; van |
| S107 | 06:21.1–06:23.4 | People start to turn and look at Leon. | FAIR | Все поворачиваются на Leon; Leon смотрит на кулак. | — | головы поворачиваются | LEON; KIDS; OWEN; DUNN |
| S108 | 06:23.4–06:24.8 | A steel door. | FAIR | Крупно стальная дверь контейнера. | — | дверь | container door |
| S109 | 06:24.8–06:27.0 | Three tons in his fist. | FAIR | Кулак Leon, рядом цифра 3 TONS. | — | кулак | LEON; fist |
| S110 | 06:27.0–06:30.1 | And exactly one chance to get it right. | FAIR | Leon с серьёзным лицом, у него одна попытка; плашка ONE CHANCE. | `06:28.0` ONE CHANCE | Leon смотрит на контейнер | LEON; container |
| S111 | 06:30.1–06:32.4 | Leon walks around the container. | FAIR | Leon обходит контейнер, вид сверху на кольцо вокруг контейнера. | — | Leon обходит | LEON; container |
| S112 | 06:32.4–06:33.8 | He doesn't look at the door. | FAIR | Leon пропускает взглядом дверь. | — | взгляд мимо | LEON; container |
| S113 | 06:33.8–06:36.3 | He looks at the thing holding it shut. | FAIR | Leon смотрит на кронштейн; кронштейн подсвечен. | — | подсветка | LEON; bracket |
| S114 | 06:36.3–06:42.6 | The padlock bar sits in an old iron bracket, and the bracket is held to the door by four rusty bolts. | FAIR | Крупно кронштейн с четырьмя ржавыми болтами и планкой замка. | `06:41.0` 4 BOLTS | болты пронумерованы | bracket; 4 bolts; bar |
| S115 | 06:42.6–06:46.1 | Something small, holding something huge. | FAIR | Маленький кронштейн на огромной двери, камера отъезжает. | — | камера отъезжает | bracket; container door |
| S116 | 06:46.1–06:50.3 | He backs up against the concrete post of the ticket booth, the way he practiced. | FAIR | Leon встаёт спиной к бетонному столбу билетной кассы рядом с контейнером. | — | Leon встаёт спиной | LEON; post; ticket booth; container |
| S117 | 06:50.3–06:52.3 | Coach Dunn kneels beside him. | FAIR | Dunn присаживается рядом на колено, шепчет. | — | Dunn присел | DUNN; LEON; post |
| S118 | 06:52.3–06:53.6 | "Not full power. | FAIR | Dunn поднимает ладонь «стоп»; пузырь. | `06:52.6` Not full power. | ладонь | DUNN; LEON |
| S119 | 06:53.6–06:57.7 | Hit that bracket with three tons, and the whole door could buckle inward. | FAIR | Врезка-фантазия: дверь выгибается внутрь, Poppy внутри испугана. | — | дверь выгибается | container; bubble |
| S120 | 06:57.7–07:00.3 | Give it a tenth." Leon nods. | FAIR | Dunn показывает 10%; Leon кивает; ползунок на 10%. | `06:58.3` GIVE IT 10% | ползунок | DUNN; LEON; slider |
| S121 | 07:00.3–07:02.8 | A tenth, just like the eggs. | FAIR | Leon вспоминает яйцо: облачко с яйцом. | — | облако-яйцо | LEON; cloud egg |
| S122 | 07:02.8–07:04.5 | He taps the first bolt. | FAIR | Leon касается первого болта. | — | тап | LEON; bracket |
| S123 | 07:04.5–07:05.6 | It rings. | FAIR | Болт звенит, не двигается; лупа на болте. | `07:04.9` DING | звон | bracket |
| S124 | 07:05.6–07:06.6 | Nothing. | FAIR | Ничего: все смотрят, тишина. | — | тишина | LEON; bracket |
| S125 | 07:06.6–07:11.0 | He taps again, and the bolt pops off and pings against a crate. | FAIR | Второй тап: болт вылетает и звенит о ящик. | — | болт летит | LEON; bolt; crate |
| S126 | 07:11.0–07:13.0 | Poppy coughs inside. | FAIR | Кашель Poppy: пузырь из контейнера, Leon оборачивается. | `07:11.6` cough cough | кашель | container; LEON |
| S127 | 07:13.0–07:15.6 | Leon taps the second bolt, then the third. | FAIR | Leon касается второго и третьего болтов; спиной в столб. | `07:14.2` 2; `07:15.2` 3 | тап, тап | LEON; post; bracket |
| S128 | 07:15.6–07:22.0 | His back hits the post every time, and the post holds, just like Isaac Newton said it would. | FAIR | Спина Leon бьёт в столб, столб держится; стрелки; Dunn кивает. | — | столб держится | LEON; post; arrows |
| S129 | 07:22.0–07:23.8 | The fourth bolt flies. | FAIR | Четвёртый болт вылетает. | `07:22.5` 4 | болт летит | LEON; bolt |
| S130 | 07:23.8–07:25.5 | The bracket drops off the door. | FAIR | Кронштейн падает с двери. | — | кронштейн падает | bracket |
| S131 | 07:25.5–07:32.1 | The bar slides out, the door swings open, and heat rolls out like the breath of an oven. | FAIR | Планка выскальзывает, дверь открывается, жар вылетает облаком. | — | дверь открывается, жар | container; heat |
| S132 | 07:32.1–07:36.8 | Poppy is sitting on a pile of plush sharks, hugging the biggest one. | FAIR | Poppy сидит на куче плюшевых акул, обнимает самую большую. | — | Poppy обнимает акулу | POPPY; sharks |
| S133 | 07:36.8–07:39.2 | "I found the best spot," she says. | FAIR | Poppy довольно: «I found the best spot». | `07:37.2` I found the best spot. | реплика | POPPY; sharks |
| S134 | 07:39.2–07:40.9 | Leon sits down in the dirt. | FAIR | Leon садится в пыль, выдыхает. | — | Leon садится | LEON; post |
| S135 | 07:40.9–07:43.2 | His hand doesn't even hurt. | FAIR | Рука Leon: ни царапины, зелёная галочка. | `07:42.5` NO PAIN ✓ | рука | LEON; fist |
| S136 | 07:43.2–07:47.7 | Ms. Park, still damp from the dunk tank, wraps Poppy in a towel. | FAIR | Ms. Park мокрая оборачивает Poppy полотенцем; Owen рядом. | — | Park накрывает | PARK; POPPY; OWEN; towel |
| S137 | 07:47.7–07:52.1 | The fire truck arrives six minutes later and finds the whole thing finished. | FAIR | Пожарная машина подъезжает к закрытой работе: всё готово. | `07:49.0` 6 MIN LATER | машина подъезжает | fire truck; KIDS |
| S138 | 07:52.1–08:00.8 | Nobody asks Leon how he did it, because nobody saw a punch, just a kid tapping bolts like he was knocking on doors. | FAIR | Leon тихо стоит, все заняты Poppy; он как стучащий в дверь. | — | взгляд Leon | LEON; KIDS |
| S139 | 08:00.8–08:05.7 | Coach Dunn wheels the old strength tester out from behind the booth and plugs it back in. | FAIR | Dunn выкатывает старый силомер из-за палатки, включает в розетку. | — | Dunn катит силомер | DUNN; tester; Leon |
| S140 | 08:05.7–08:08.0 | "I think it saved your last number." | FAIR | Dunn говорит, Leon подходит к силомеру. | `08:06.4` I think it saved your last number. | реплика | DUNN; LEON; tester |
| S141 | 08:08.0–08:09.5 | The screen glows. | FAIR | Экран силомера загорается. | — | экран загорается | tester screen |
| S142 | 08:09.5–08:11.8 | Six thousand. | FAIR | Экран показывает 6000, Leon и Dunn смотрят. | — | число | tester screen |
| S143 | 08:11.8–08:13.5 | Then Coach Dunn smiles. | FAIR | Dunn улыбается Leon. | — | улыбка | DUNN; LEON |
| S144 | 08:13.5–08:16.9 | "Now try it again, nice and gently." | FAIR | Dunn: «Now try it again, nice and gently». | `08:13.8` Now try it again, nice and gently. | реплика | DUNN; LEON |
| S145 | 08:16.9–08:19.5 | Leon taps the bag with one finger. | FAIR | Leon касается груши пальцем, груша качнулась чуть-чуть. | — | касание | LEON; tester |
| S146 | 08:19.5–08:21.7 | The screen says two. | FAIR | Экран показывает 2. | `08:20.6` 2 | число | tester screen |
| S147 | 08:21.7–08:24.2 | "Two pounds. Perfect." | FAIR | Dunn показывает большой палец, Leon улыбается. | `08:22.2` Two pounds. Perfect. | реплика | DUNN; LEON |
| S148 | 08:24.2–08:29.1 | That night, Leon sits at the kitchen table, tapping an egg with his wrist the way he always does. | KITCHEN_N | Ночная кухня: Leon за столом, касается яйца запястьем. | `08:24.6` THAT NIGHT | касание | LEON; egg; kitchen |
| S149 | 08:29.1–08:30.3 | The egg wobbles. | KITCHEN_N | Яйцо покачивается. | — | яйцо | egg |
| S150 | 08:30.3–08:33.3 | Then a thin crack runs across the table. | KITCHEN_N | По столу бежит тонкая трещина. | — | трещина | table crack |
| S151 | 08:33.3–08:35.1 | He looks at his fist. | KITCHEN_N | Leon смотрит на кулак. | — | взгляд | LEON; fist |
| S152 | 08:35.1–08:37.8 | Same tap. Same egg. | KITCHEN_N | Leon и трещина на столе. | — | трещина шире | LEON; table |
| S153 | 08:37.8–08:40.4 | Something is still growing. | KITCHEN_N | Кулак Leon крупно, вокруг лёгкое свечение; плашка STILL GROWING. | `08:39.4` STILL GROWING… | свечение | LEON; fist |
| S154 | 08:40.4–08:46.3 | So, what would you hit first with three tons of force, and would you ever dare to use it? | VOID | Leon с кулаком и вопросительный знак: что бы вы ударили первым. | `08:40.9` WHAT WOULD YOU HIT FIRST? | плашка | LEON; plate |
| S155 | 08:46.3–08:47.6 | Tell us in the comments. | VOID | Иконка комментариев. | `08:47.0` COMMENT BELOW | иконка | comment icon |
| S156 | 08:47.6–08:55.5 | And if you want to see how big it can get, subscribe, because part two is next. | VOID | Кнопка Subscribe, PART 2 NEXT. | `08:49.9` SUBSCRIBE · PART 2 | кнопка | subscribe button |

## Итоги
- Сцен: 156. Средняя длина 3.4 с, самая длинная 8.6 с (S138), самая короткая 1.0 с (S124). Итог 08:55.5.
- Строк текста на экране: 82.
- Гэги без звука: груша улетает слева направо и сбивает Ms. Park в бак, ERR на экране, шкафчик «как крышка от коробки», Leon в изгороди ногами вверх, омлеты, дверь с вмятиной с монету, четыре болта, Poppy на куче акул, трещина по столу.
- Логика: силомер (ERR) → правила → плюсы → проблема 1 (отдача, столб) → проблема 2 (яйца, касание) → проблема 3 (давление, стальная дверь) → контейнер (три урока в кульминации) → тап 2 фунта и трещина на столе. Порядок слева направо у силомера один во всех кадрах.
