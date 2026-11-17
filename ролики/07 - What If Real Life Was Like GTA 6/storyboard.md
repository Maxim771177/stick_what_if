# Раскадровка: ролик 07, «What If Your Life Was Like GTA 6?»
Основа: `озвучка.mp3` (639.5 с = 10:39.5, ElevenLabs 1.2) и тайминги слов (`тайминги-слов.json`: Whisper small, выровнено по `сценарий.txt`, 97% слов совпало). Ролик ускоряется ещё ×1,2.

## Хронометраж (лимит владельца: итог 8:00–8:20)
- Озвучка целиком 10:39.5, после ×1,2: **08:52.9**: на 00:00.0 короче 8:00. Сокращать не нужно, наоборот: в конец добавлено 2.5 с тишины (финальный кадр держится), **итог 08:55.4**, в окне 8:00–8:20: да. Исходный `озвучка.mp3` не тронут; проектный `input/voiceover.mp3` = озвучка ×1,2 + хвост.
- Времена `мм:сс.с` от начала итогового ролика; конец сцены = начало следующей.

## Герои
Все герои кодовые куклы Razgon, внешность одинаковая во всех сценах. Новые: Walt (бездомный) и девочка из крючка (GIRL); остальные из роликов 02–05.

| Герой | Как выглядит | Откуда |
|---|---|---|
| LEON | эталон канала (кепка capBack, красная футболка с молнией, серые шорты, оранжевые кроссовки); в погоне синяя кепка | ролики 01–06 |
| RIVAL | мальчик в золотой куртке, тёмные волосы, глаза видны; золотой вертолёт, полоска здоровья | новый, кодом |
| NURSE | медсестра: белая форма, шапочка, какао в руке | новая, кодом |
| DOCTOR | врач в белом халате, очки | ролики 02–05 |
| OWEN, CHASE, ZOE | как в роликах 04–06 | ролики 04–06 |
| MS. PARK | фиолетовый костюм, пучок, очки | ролики 02–06 |
| DAD, MOM | как в ролике 02 | ролики 02–06 |
| BISCUIT | собака (картинки OpenAI из ролика 02), один размер | ролики 02–06 |
| PRINCIPAL, POLICE, прохожие, соседи | второстепенные взрослые и дети из `lib.js`, глаза видны | кодом |

## Места
Фоны класса, кухни, гостиной из роликов 01–06. Новые места: заброшенный парк аттракционов вечером, крыша, палата, гараж с машинами; фоны OpenAI по «ок» владельца (смета в `паспорта-сцен.md`), до «ок» стоят кодовые заглушки. Двор, улица, мойка, причал, дорожка, бассейн сверху, небо, карта: код.

| Код | Место | Сцен |
|---|---|---|
| CLASS | класс 114 (фон OpenAI из ролика 01) | 12 |
| VOID | абстрактный фон: HUD, доски, телефон, карточки | 24 |
| KITCHEN | кухня | 7 |
| LIVING | гостиная | 3 |
| NIGHT | комната ночью | 1 |
| YARD | двор дома (код) | 17 |
| STREET | городская улица (код) | 3 |
| DOCK | причал (код) | 1 |
| GARAGE | гараж с машинами (OpenAI) | 1 |
| DRIVE | подъездная дорожка (код) | 4 |
| SCHOOL | школьный двор (код) | 18 |
| WASH | автомойка (код) | 2 |
| ROOF | крыша школы (OpenAI) | 3 |
| POOL | бассейн сверху (код) | 1 |
| SKYFALL | небо при падении (код) | 2 |
| WARD | палата (OpenAI) | 5 |
| PARK | заброшенный парк вечером (OpenAI) | 10 |
| COASTER | горки в парке вечером (тот же фон) | 5 |
| MAPZOOM | мини-карта отъезжает (код) | 2 |

## Сцены

| № | Время | Озвучка | Место | Кадр | Текст на экране | Анимация | Ассеты |
|---|---|---|---|---|---|---|---|
| S001 | 00:00.0–00:05.7 | Monday, eight ten in the morning, room one-fourteen. Leon walks in late, and something is wrong with the floor. | CLASS | Класс 114, утро. Leon входит с рюкзаком, табличка «ROOM 114» у двери, другие дети за партами. | `00:00.0` MONDAY · 8:10 AM | Leon идёт слева направо | BG classroom; LEON; KIDS |
| S002 | 00:05.7–00:10.9 | A yellow circle glows beside his desk, and above it, floating in the air, white letters. | CLASS | Жёлтый светящийся круг на полу у парты Leon; Leon замер и смотрит на него. | `00:06.4` yellow | круг пульсирует | BG classroom; LEON; ring |
| S003 | 00:10.9–00:16.8 | Mission. Pass the math test. Reward, twenty thousand dollars. | CLASS | Над кругом в воздухе белая надпись: MISSION · PASS THE MATH TEST · REWARD $20,000 (надпись кодом, выше головы Leon, глаза не закрыты). | `00:11.3` label | буквы появляются построчно | BG classroom; LEON; ring; label |
| S004 | 00:16.8–00:19.5 | Leon looks around. Nobody else sees it. | CLASS | Leon оглядывается; дети за партами пишут и не видят метки. | — | Leon крутит головой | BG classroom; LEON; KIDS×3; ring |
| S005 | 00:19.5–00:21.3 | Ms. Park hands out the papers. | CLASS | Ms. Park раздаёт листы с тестом, бумага летит на парты. | — | листы на парты | BG classroom; PARK; LEON; KIDS; papers |
| S006 | 00:21.3–00:25.2 | Leon writes his name, and for the first time in his life, he knows every answer. | CLASS | Leon за партой пишет с уверенным лицом, лампочка над головой. | — | Leon пишет, лампочка | BG classroom; LEON; desk; paper |
| S007 | 00:25.2–00:31.8 | Forty-five minutes later, a green number pops up over his head. Plus twenty thousand dollars. | CLASS | Часы показывают 8:55 → над головой Leon зелёный «+$20,000» всплывает вверх. | `00:29.9` plus | зелёное число всплывает | BG classroom; LEON; wallClock; plus |
| S008 | 00:31.8–00:34.2 | His phone buzzes. Bank alert. | VOID | Телефон крупно: банк «ALERT +$20,000». | `00:33.5` BANK ALERT | телефон вибрирует | phone |
| S009 | 00:34.2–00:38.3 | That's almost four months of a normal paycheck, for one test. | VOID | Телефон слева, справа кубики «4 MONTHS OF PAY» (4 зарплатных конверта), стрелка. | `00:35.0` ≈ 4 MONTHS OF A NORMAL PAYCHECK | конверты по одному | phone; envelopes |
| S010 | 00:38.3–00:41.7 | Chase leans over. "Did you just win the lottery?" | CLASS | Chase перегнулся через проход к Leon, говорит шёпотом. | `00:40.2` DID YOU JUST WIN THE LOTTERY? | Chase наклоняется | BG classroom; CHASE; LEON; desks |
| S011 | 00:41.7–00:45.5 | Leon is ten years old, and he has no idea what is happening. | CLASS | Leon растерянно смотрит на зрителя, плечи вверх, вопросительный знак. | — | Leon пожимает плечами | BG classroom; LEON; qmark |
| S012 | 00:45.5–00:51.1 | But by Friday, he'll own a garage, a helicopter, and the whole school's respect. | VOID | Три значка один за другим: гараж, вертолёт, толпа детей с сердечками. | `00:46.1` BY FRIDAY | значки по очереди | icons: garage, helicopter, crowd |
| S013 | 00:51.1–00:55.0 | So, what if your life was like GTA 6? | VOID | Leon радуется, над ним название ролика. | `00:51.7` WHAT IF YOUR LIFE WAS LIKE GTA 6? | название, искры | LEON |
| S014 | 00:55.0–00:56.6 | Here's how it works. | VOID | Доска, Leon показывает указкой; на доске «HOW IT WORKS». | — | Leon у доски | LEON; board |
| S015 | 00:56.6–01:02.4 | Rule one. Every task in your day is a mission, and every mission pays real money. | VOID | Доска «RULE 1»: жёлтый круг с монетой и «MISSION = REAL MONEY». | `00:57.1` RULE 1 · EVERY TASK PAYS | круг, монеты | LEON; board; ring; coins |
| S016 | 01:02.4–01:07.3 | Rule two. Whatever you buy shows up in seconds, delivered straight to your garage. | VOID | Доска «RULE 2»: корзина и стрелка в гараж; из гаража выкатываются машина, лодка, вертолёт значками. | `01:03.1` RULE 2 · BUY IT, GARAGE GETS IT | значки выезжают | LEON; board; icons car/boat/heli |
| S017 | 01:07.3–01:10.9 | Cars, boats, helicopters, anything. | VOID | Три значка крупнее: машина, катер, вертолёт. | — | значки подпрыгивают | icons |
| S018 | 01:10.9–01:15.4 | Rule three. Break the rules, and the police show up. | VOID | Доска «RULE 3»: полицейская мигалка и звезда. | `01:11.7` RULE 3 · BREAK THE RULES, GET STARS | мигалка | LEON; board; siren; star |
| S019 | 01:15.4–01:20.2 | Stars appear in the corner of your eye, one for small trouble, more for big trouble. | VOID | Leon смотрит в угол, в правом верхнем углу кадра загораются звёзды (1, потом 3). | `01:17.4` stars1; `01:18.7` stars3 | звёзды загораются | LEON; HUD stars |
| S020 | 01:20.2–01:22.5 | But you can always lose them. | VOID | Звёзды гаснут по одной, Leon показывает «ok». | — | звёзды гаснут | LEON; HUD stars |
| S021 | 01:22.5–01:26.0 | Rule four. A health bar floats over your head. | VOID | Доска «RULE 4»: сердце и полоска здоровья над головой человечка. | `01:23.3` RULE 4 · HEALTH BAR | полоска | LEON; board; bar |
| S022 | 01:26.0–01:31.0 | Drop to zero, and you wake up in a hospital, fully healed, a few minutes later. | VOID | Полоска падает до нуля, человечек падает; стрелка к больничной кровати, потом кровать с зелёным «100%». | — | полоска вниз, кровать | bar; bed |
| S023 | 01:31.0–01:33.5 | Only Leon sees any of it. | CLASS | Leon с HUD (мини-карта в углу, полоска над головой), позади дети ничего не видят. | — | Leon оглядывает HUD | BG classroom; LEON; KIDS; HUD |
| S024 | 01:33.5–01:37.8 | Everyone else just sees a kid who suddenly never loses. | CLASS | Дети смотрят на Leon, над ними облачко-мысль «HE NEVER LOSES». | `01:36.7` HE NEVER LOSES | мысли над детьми | BG classroom; KIDS×3; LEON; clouds |
| S025 | 01:37.8–01:42.0 | Day one is done. Let's see how fast he gets rich. | CLASS | Leon складывает руки на затылок, довольный, плашка DAY ONE: DONE. | `01:38.5` DAY ONE · DONE | Leon откидывается | BG classroom; LEON |
| S026 | 01:42.0–01:46.1 | Monday night, Leon has twenty thousand dollars and a problem. | NIGHT | Комната ночью: Leon сидит на кровати с телефоном, на экране $20,000. | `01:42.6` MONDAY NIGHT | Leon с телефоном | BG kitchenNight; LEON; phone |
| S027 | 01:46.1–01:48.6 | The markers don't stop. | VOID | Мини-карта города: десятки жёлтых кружков вспыхивают один за другим. | — | кружки на карте | minimap; markers |
| S028 | 01:48.6–01:54.6 | Tuesday, a yellow circle appears on the neighbor's lawn. Mow it, fifty thousand. | YARD | Газон соседа: жёлтый круг на траве, над ним «MOW IT · $50,000», у Leon газонокосилка. | `01:49.2` TUESDAY; `01:52.4` $50,000 | Leon косит, плюс над головой | BG yard; LEON; mower; ring; label |
| S029 | 01:54.6–01:59.9 | Wednesday, a package for a man across town. Deliver it, one hundred and twenty thousand. | STREET | Улица: Leon на велосипеде с коробкой в руках на багажнике; «DELIVER · $120,000» над дорогой впереди. | `01:54.6` WEDNESDAY; `01:58.0` $120,000 | велосипед едет слева направо | BG street; LEON; bike; box; label |
| S030 | 01:59.9–02:05.3 | Thursday, a stranger's yacht needs washing. Three hundred thousand. | DOCK | Причал, большая белая яхта у борта; Leon со шваброй на палубе; метка «WASH · $300,000». | `01:59.9` THURSDAY; `02:02.7` $300,000 | Leon моет борт | BG dock (код); LEON; yacht; mop; label |
| S031 | 02:05.3–02:11.2 | And Friday, a marker over a neighbor's dog. Walk it for ten minutes, and the number says six hundred thousand. | YARD | Leon держит поводок; рядом Biscuit; над собакой жёлтый круг с «WALK · 10 MIN · $600,000». | `02:05.6` FRIDAY; `02:09.6` $600,000 | Leon и Biscuit идут | BG yard; LEON; BISCUIT; leash; label |
| S032 | 02:11.2–02:12.3 | Nobody asks why. | STREET | Прохожие кивают, у владельцев довольные лица, никто не удивляется. | — | прохожие машут | BG street; P1; P2; LEON |
| S033 | 02:12.3–02:17.0 | By Friday night, Leon's bank app shows one million and ninety thousand dollars. | VOID | Телефон: приложение банка, цифры бегут до $1,090,000; confetti. | `02:15.1` $1,090,000 | счёт растёт | phone; confetti |
| S034 | 02:17.0–02:22.0 | A typical full-time worker in America would need about seventeen years of paychecks to get there. | VOID | Шкала: 1 рабочий человечек с чеками, рядом цифра «≈ 17 YEARS OF PAYCHECKS». | `02:19.4` ≈ 17 YEARS OF PAYCHECKS | календарные листы летят | worker; calendar pages |
| S035 | 02:22.0–02:26.0 | Leon needed five days and one very good dog. | YARD | Leon и Biscuit рядом, оба довольные; плашка «5 DAYS». | `02:23.0` 5 DAYS · 1 VERY GOOD DOG | Leon гладит Biscuit | BG yard; LEON; BISCUIT |
| S036 | 02:26.0–02:31.3 | He pays off Mom's mortgage. Mom sits down on the kitchen floor and cries into a dish towel. | KITCHEN | Кухня: Mom сидит на полу с полотенцем, плачет; на столе бумага «MORTGAGE PAID». | — | Mom вытирает слёзы | BG kitchen; MOM; LEON; paper |
| S037 | 02:31.3–02:34.9 | Dad gets the pickup truck he's been staring at for six years. | YARD | Перед домом новый пикап, Dad рядом с ключами, сияет. | — | Dad крутит ключи | BG yard; DAD; truck; LEON |
| S038 | 02:34.9–02:41.3 | Biscuit gets a golden bowl. Biscuit does not understand the bowl, but he is extremely loyal to it. | LIVING | Гостиная: золотая миска с едой; Biscuit смотрит на неё, наклонив голову. | — | Biscuit наклоняет голову | BG livingRoom; BISCUIT; gold bowl |
| S039 | 02:41.3–02:46.3 | Owen asks if he can borrow a hundred dollars. Leon sends him ten thousand by mistake. | YARD | Owen просит у Leon, Leon достаёт телефон. | `02:43.0` $100? | Leon жмёт на телефоне | BG yard; OWEN; LEON; phone |
| S040 | 02:46.3–02:49.3 | Owen doesn't speak for a full minute. | YARD | Owen застыл с телефоном, над ним «+$10,000»; глаза огромные. | `02:48.2` +$10,000 | Owen замирает | BG yard; OWEN; LEON; phone |
| S041 | 02:49.3–02:50.9 | Money is nice. | VOID | Leon с чемоданом денег пожимает плечами. | — | Leon пожимает плечами | LEON; cash |
| S042 | 02:50.9–02:54.1 | But money isn't why the whole school stops at the fence. | YARD | Забор школы; за забором ребята прижались к сетке и смотрят в сторону дома Leon. | — | дети у забора | BG yard; KIDS×6; fence |
| S043 | 02:54.1–02:55.9 | The garage is. | GARAGE | Гараж Leon: ворота открыты, внутри силуэты машин, свет изнутри. | — | свет из ворот | BG garage; LEON |
| S044 | 02:55.9–03:03.7 | Saturday morning, Leon hears a hiss of air, and a matte-black hypercar appears in the driveway, still warm, with a bow on the roof. | DRIVE | Подъездная дорожка: утро; Leon у дома; облачко воздуха «PSSSH», появляется матово-чёрный гиперкар с бантом на крыше. | `02:56.3` SATURDAY · 7:00 AM | гиперкар появляется со вспышкой | BG driveway; hypercar; LEON; bow |
| S045 | 03:03.7–03:07.4 | Leon doesn't read the manual, because the game already told him how to drive it. | DRIVE | Leon бросает инструкцию через плечо и садится в машину. | — | бумага летит | BG driveway; hypercar; LEON; manual |
| S046 | 03:07.4–03:14.7 | For scale, in two thousand nineteen, a modified Bugatti Chiron hit three hundred and four miles per hour on a German test track. | VOID | Спидометр до отметки 304 MPH; подпись «BUGATTI CHIRON · 2019 · 304 MPH». | `03:11.2` 2019 · MODIFIED BUGATTI CHIRON · 304 MPH | стрелка спидометра идёт | gauge |
| S047 | 03:14.7–03:19.6 | Leon's is not that one. It's close enough, and it's his. | DRIVE | Leon хлопает по капоту, с улыбкой смотрит на камеру. | — | Leon гладит капот | BG driveway; hypercar; LEON |
| S048 | 03:19.6–03:25.7 | By Sunday, the driveway also holds a speedboat on a trailer and a red helicopter on the lawn. | DRIVE | Дорожка: гиперкар, катер на прицепе рядом, красный вертолёт на лужайке; Leon стоит перед всем. | `03:20.3` SUNDAY | камера отъезжает | BG driveway; hypercar; speedboat+trailer; helicopter; LEON; house |
| S049 | 03:25.7–03:28.6 | Monday, Leon pulls up to school with the windows down. | SCHOOL | Школьный двор: гиперкар подъезжает слева направо, Leon в окне с рукой, ребята оборачиваются. | `03:26.2` MONDAY | машина въезжает в кадр | BG yard school; hypercar; LEON; KIDS |
| S050 | 03:28.6–03:31.7 | Owen drops his backpack. Chase drops his sandwich. | SCHOOL | Owen роняет рюкзак, Chase роняет бутерброд; оба смотрят на машину. | — | рюкзак и бутерброд падают | BG yard school; OWEN; CHASE; backpack; sandwich; hypercar |
| S051 | 03:31.7–03:36.8 | Zoe walks over, looks at the car, then at Leon. "Is that a Bugatti?" | SCHOOL | Zoe подходит к машине, смотрит на неё, потом на Leon; говорит. | `03:35.0` IS THAT A BUGATTI? | Zoe подходит | BG yard school; ZOE; LEON; hypercar |
| S052 | 03:36.8–03:40.0 | "It's a gift," Leon says. "From me." | SCHOOL | Leon у двери машины говорит, Zoe моргает. | `03:37.2` IT’S A GIFT. FROM ME. | Leon жестикулирует | BG yard school; LEON; ZOE; hypercar |
| S053 | 03:40.0–03:43.6 | Ms. Park takes a photo. The principal asks for a ride. | SCHOOL | Ms. Park снимает машину на телефон; рядом директор в галстуке показывает пальцем на пассажирское сиденье. | — | Ms. Park фотографирует | BG yard school; PARK; PRINCIPAL; hypercar; phone |
| S054 | 03:43.6–03:46.2 | And then Leon makes one mistake. | SCHOOL | Leon за рулём, косой взгляд, брови вверх; кадр на ногу не нужен. | — | Leon хитро улыбается | BG yard school; LEON; hypercar |
| S055 | 03:46.2–03:49.5 | He presses the gas a little too hard. | SCHOOL | Машина срывается с места вправо, дым из-под колёс, ребята отшатываются. | — | машина уезжает вправо | BG yard school; hypercar; KIDS; smoke |
| S056 | 03:49.5–03:54.3 | Sirens. One star lights up in the corner of Leon's eye. He ignores it. | SCHOOL | Школьный двор; слева въезжает патрульная машина с мигалками; в углу кадра загорается 1 звезда. | `03:50.5` stars1 | патруль въезжает, звезда | BG yard school; police car; HUD stars=1; hypercar; LEON |
| S057 | 03:54.3–03:57.3 | Two stars. A second patrol car joins in. | SCHOOL | Вторая патрульная машина присоединяется, 2 звезды. | `03:54.6` stars2 | вторая машина | BG yard school; 2 police cars; HUD stars=2 |
| S058 | 03:57.3–04:03.1 | Three stars, and now there's a police helicopter circling the school, and every kid in the yard is filming. | SCHOOL | Над школой кружит полицейский вертолёт; 3 звезды; ребята на крыльце снимают на телефоны. | `03:57.4` stars3 | вертолёт кружит | BG yard school; police helicopter; KIDS×5; phones; HUD stars=3 |
| S059 | 04:03.1–04:08.0 | Leon grins. Rule three. You can always lose them. | SCHOOL | Leon в машине ухмыляется, в углу 3 звезды. | — | Leon ухмыляется | BG yard school; hypercar; LEON; HUD stars=3 |
| S060 | 04:08.0–04:12.3 | He cuts through the car wash, comes out the other side, and puts on a different cap. | WASH | Автомойка: туннель с щётками и пеной; гиперкар заезжает слева и выезжает справа в пене. | — | машина проезжает сквозь щётки | BG car wash (код); hypercar; LEON; foam; HUD stars=3 |
| S061 | 04:12.3–04:15.1 | The stars blink. Then they vanish. | WASH | Leon в машине надевает синюю кепку (вместо бирюзовой), звёзды мигают. | — | кепка меняется | BG car wash; LEON; blue cap; HUD stars blink |
| S062 | 04:15.1–04:19.3 | The cops drive past him, slowly, looking for a boy in a blue cap. | STREET | Патрульная машина медленно едет мимо гиперкара; полицейский смотрит в сторону, Leon в синей кепке смотрит прямо перед собой. | — | полиция проезжает | BG street; police car; hypercar; LEON blue cap; POLICE |
| S063 | 04:19.3–04:23.3 | The whole playground erupts. Leon takes a bow. | SCHOOL | Весь двор ликует: ребята прыгают, руки вверх; Leon кланяется на капоте. | — | толпа ликует | BG yard school; KIDS×8; LEON; hypercar |
| S064 | 04:23.3–04:27.2 | And that's when his phone rings. Mom. | SCHOOL | Leon достаёт звонящий телефон; на экране «MOM». | — | телефон звонит | BG yard school; LEON; phone MOM |
| S065 | 04:27.2–04:32.3 | "Leon. Why is there a police helicopter on our street, and where is Dad's other car?" | SCHOOL | Крупно Leon с телефоном у уха, глаза огромные; над ним пузырь с репликой Mom. | `04:27.7` WHY IS THERE A POLICE HELICOPTER ON OUR STREET, AND WHERE IS DAD’S OTHER CAR? | Leon морщится | BG yard school; LEON; phone |
| S066 | 04:32.3–04:38.0 | One more star lights up. It's the only one he can't lose. | SCHOOL | В углу загорается ещё одна звезда, гирлянда из 4 (последняя пульсирует красным). | `04:33.4` stars4 | четвёртая звезда | BG yard school; LEON; HUD stars=4 pulse |
| S067 | 04:38.0–04:41.9 | Quick note, this is a cartoon. Don't try any of this at home. | VOID | Карточка «THIS IS A CARTOON. DON’T TRY THIS AT HOME.» на жёлтом фоне. | `04:38.7` THIS IS A CARTOON · DON’T TRY THIS AT HOME | карточка | card |
| S068 | 04:41.9–04:47.0 | But Leon feels unstoppable. And he hasn't even found out about rule four. | SCHOOL | Leon на крыше машины, руки в стороны, ветер; в углу 4 звезды. | — | Leon красуется | BG yard school; LEON; hypercar |
| S069 | 04:47.0–04:49.3 | Tuesday, the school roof. | ROOF | Школьная крыша, утро; Leon и Owen стоят у парапета. | `04:47.8` TUESDAY · THE ROOF | камера панорамой | BG roof; LEON; OWEN |
| S070 | 04:49.3–04:52.6 | Owen leans over the edge. "Bet you won't jump." | ROOF | Owen перегнулся через парапет спиной к камере говорит Leon. | `04:51.5` BET YOU WON’T JUMP. | Owen наклоняется | BG roof; OWEN; LEON |
| S071 | 04:52.6–04:55.9 | Leon looks down at the pool. It's drained for repairs. | POOL | Вид сверху: пустой осушенный бассейн в голубом кафеле, на дне стрелка вниз. | — | камера вниз | top view pool (код) |
| S072 | 04:55.9–04:57.8 | He jumps anyway. | ROOF | Leon прыгает с парапета, Owen охает. | — | Leon прыгает | BG roof; LEON; OWEN |
| S073 | 04:57.8–05:02.9 | A bar floats over his head and drops fast, ninety, forty, three percent. | SKYFALL | Leon падает в пустой бассейн на фоне неба; над головой полоска здоровья падает 90 → 40 → 3%. | `05:00.5` hp90; `05:01.1` hp40; `05:01.7` hp3 | полоска падает | BG sky; LEON; HUD bar |
| S074 | 05:02.9–05:06.4 | Then gray letters across the whole sky. Wasted. | SKYFALL | Серыми буквами на всё небо: WASTED; экран обесцвечен. | `05:05.8` wasted | WASTED наезжает | BG sky; WASTED |
| S075 | 05:06.4–05:12.2 | And then, a beeping machine, a white ceiling, a nurse with a cup of hot chocolate. | WARD | Палата: белый потолок, кровать, монитор пикает; Leon лежит под одеялом. | — | монитор пикает | BG ward; LEON; bed; monitor |
| S076 | 05:12.2–05:15.3 | His bar is back at one hundred percent. | WARD | Над головой Leon полоска снова 100%, зелёная; он садится. | — | полоска заполняется | BG ward; LEON; bed; HUD bar |
| S077 | 05:15.3–05:20.9 | The doctor flips through the chart. "Zero broken bones. Zero. I checked twice." | WARD | Врач листает карту; говорит. | `05:17.9` ZERO BROKEN BONES. ZERO. I CHECKED TWICE. | врач листает | BG ward; DOCTOR; LEON; bed; chart |
| S078 | 05:20.9–05:23.9 | Four minutes. That's all it cost him. | WARD | Таймер 4:00 на стене; Leon показывает палец вверх. | `05:21.3` 4 MINUTES | таймер | BG ward; LEON; wallClock |
| S079 | 05:23.9–05:27.4 | The bill goes to Dad, eighteen thousand dollars. | KITCHEN | Dad держит счёт на $18,000 за столом, Mom смотрит из-за спины. | `05:25.2` $18,000 | Dad разворачивает счёт | BG kitchen; DAD; MOM; bill |
| S080 | 05:27.4–05:33.0 | Dad stares at it, then looks out the window at his new truck, and says, "Worth it." | KITCHEN | Dad смотрит на счёт, потом в окно на новый пикап; говорит. | `05:32.1` WORTH IT. | Dad смотрит в окно | BG kitchen; DAD; window; truck |
| S081 | 05:33.0–05:37.2 | By evening, the video of the jump has seven million views. | VOID | Экран телефона с видео прыжка и счётчиком «7,000,000 VIEWS». | `05:35.9` 7,000,000 VIEWS | счётчик растёт | phone; counter |
| S082 | 05:37.2–05:40.9 | Leon is the most wanted kid in town, and in a good way. | SCHOOL | Leon идёт по двору, ребята расступаются и хлопают. | — | Leon шагает, ребята хлопают | BG yard school; LEON; KIDS×6 |
| S083 | 05:40.9–05:43.1 | Everybody wants to be him. | SCHOOL | Вокруг Leon дети с блокнотами, некоторые копируют его позу. | — | дети копируют позу | BG yard school; LEON; KIDS×5; notebooks |
| S084 | 05:43.1–05:48.6 | Wednesday morning, Biscuit's golden bowl is full. Biscuit is gone. | LIVING | Гостиная: золотая миска полная; рядом пусто; Leon входит. | `05:43.8` WEDNESDAY MORNING | Leon оглядывается | BG livingRoom; gold bowl; LEON |
| S085 | 05:48.6–05:52.0 | The back door is open, and the leash is still on its hook. | KITCHEN | Задняя дверь приоткрыта, на крючке висит поводок. | — | дверь скрипит | BG kitchen; door; leash hook |
| S086 | 05:52.0–05:57.9 | Mom is in the kitchen, calling the neighbors, her voice shaking. Dad is searching the garage. | KITCHEN | Mom с телефоном у уха, Dad за ней с фонариком ищет по углам. | — | Mom звонит, Dad ищет | BG kitchen; MOM; DAD; phone; flashlight |
| S087 | 05:57.9–06:04.7 | Leon looks at his bank app, more than a million dollars, and understands that none of it can find one small dog. | KITCHEN | Leon смотрит на телефон с суммой, потом на пустую миску; над ним облачко «$$$ ≠ BISCUIT». | `06:03.8` NONE OF IT CAN FIND ONE SMALL DOG | Leon сникает | BG kitchen; LEON; phone; bowl |
| S088 | 06:04.7–06:11.2 | And on Leon's map, a red marker pulses, far outside town, at the old amusement park. | VOID | Мини-карта на весь кадр: красная метка пульсирует далеко за городом. | — | метка пульсирует | minimap big; red marker |
| S089 | 06:11.2–06:16.0 | Mission. Rescue Biscuit. Reward, none. | VOID | Белая надпись: MISSION · RESCUE BISCUIT · REWARD: NONE, красная метка рядом. | `06:11.5` label2 | буквы по строкам | label; red marker |
| S090 | 06:16.0–06:24.1 | Leon reads that twice. It's the first mission in his life that pays nothing, and the only one he has ever wanted this much. | KITCHEN | Leon читает метку над миской, брови вверх. | — | Leon читает | BG kitchen; LEON; label |
| S091 | 06:24.1–06:28.0 | Under the marker, one more word. Rival. | VOID | Под красной меткой слово «RIVAL» красным; метка вздрагивает. | `06:27.3` RIVAL | RIVAL мигает | red marker; label rival |
| S092 | 06:28.0–06:34.5 | Leon doesn't say a word. He grabs his cap and walks out onto the lawn, where the red helicopter is waiting. | LIVING | Leon без слов хватает кепку с крючка. | — | Leon хватает кепку | BG livingRoom; LEON |
| S093 | 06:34.5–06:37.8 | "Leon, where are you going?" Mom calls from the porch. | YARD | Mom на крыльце машет, Leon идёт по газону к красному вертолёту. | `06:34.9` LEON, WHERE ARE YOU GOING? | Leon идёт к вертолёту | BG yard; MOM; LEON; helicopter; porch |
| S094 | 06:37.8–06:42.3 | "To work," he says, and for once, it isn't about the money. | YARD | Leon на ходу оборачивается, говорит; вертолёт позади. | `06:38.0` TO WORK. | Leon оборачивается | BG yard; LEON; helicopter; MOM |
| S095 | 06:42.3–06:48.6 | A vest of body armor appears in his hands out of thin air, and a second bar slides in above his health bar. | YARD | В руках Leon появляется бронежилет со вспышкой; над полоской здоровья вторая синяя полоска. | — | броня появляется | BG yard; LEON; vest; HUD armor |
| S096 | 06:48.6–06:52.5 | The helicopter lifts off, and the whole street watches it climb. | YARD | Вертолёт поднимается над газоном, Leon в кабине, Mom и Dad на крыльце смотрят вверх. | — | вертолёт набирает высоту | BG yard; helicopter; MOM; DAD |
| S097 | 06:52.5–06:58.0 | The amusement park is a gray skeleton in the evening light, with one wheel still lit. | PARK | Заброшенный парк вечером: колесо обозрения с одним горящим фонарём, ржавые горки; вертолёт Leon подлетает слева. | — | камера по парку, вертолёт въезжает | BG park evening; helicopter; Ferris wheel; coaster |
| S098 | 06:58.0–07:03.4 | At the very top of the Ferris wheel, a boy in a gold jacket sits with Biscuit on his lap. | PARK | Крупно колесо: наверху кабинка, в ней мальчик в золотой куртке с Biscuit на коленях. | — | камера поднимается к верху колеса | BG park; wheel; RIVAL; BISCUIT |
| S099 | 07:03.4–07:07.1 | He has his own helicopter. He has his own health bar. | PARK | Рядом с колесом висит золотой вертолёт соперника, над ним полоска здоровья. | — | вертолёт качается | BG park; RIVAL; golden helicopter; HUD bar |
| S100 | 07:07.1–07:08.9 | And he waves. | PARK | RIVAL машет рукой Leon. | — | машет | BG park; RIVAL; BISCUIT |
| S101 | 07:08.9–07:11.5 | The chase takes the roller coaster. | COASTER | Горки: вертолёты (красный и золотой) летят между рельсами, золотой впереди. | — | погоня между рельсами | BG coaster; helicopter red; helicopter gold; rails |
| S102 | 07:11.5–07:16.0 | Leon dodges the rails at full speed, clips a tower, and falls. | COASTER | Красный вертолёт уворачивается от рельсов, зацепляет башню и падает. | — | вертолёт цепляет и падает | BG coaster; helicopter red; tower |
| S103 | 07:16.0–07:20.0 | Wasted. A white ceiling. Four minutes. | WARD | WASTED серым на кадре, потом белый потолок палаты и таймер 4:00. | `07:16.5` wasted | WASTED → палата | BG ward; WASTED; LEON; bed |
| S104 | 07:20.0–07:22.5 | He's back, in the air, behind the boy. | COASTER | Leon снова в вертолёте позади мальчика, тот смотрит назад через плечо. | — | Leon догоняет | BG coaster; helicopter red; helicopter gold |
| S105 | 07:22.5–07:31.6 | A second hit, and again, wasted, again white ceiling, again four minutes, and Biscuit is a little farther away every time. | COASTER | Золотой вертолёт сбивает красный; тот падает; потом снова палата и потолок; Biscuit на заднем плане всё дальше. | `07:24.4` wasted | удар, падение, палата | BG coaster; ward; WASTED |
| S106 | 07:31.6–07:34.5 | On the third try, Leon doesn't dodge. | COASTER | Leon летит прямо, не уклоняясь, глаза решительные. | — | прямой полёт | BG coaster; helicopter red; LEON |
| S107 | 07:34.5–07:37.8 | He hovers over the wheel, grabs the ladder, and jumps. | PARK | Красный вертолёт зависает над колесом, Leon хватает лестницу. | — | Leon хватает лестницу | BG park; helicopter red; ladder; wheel |
| S108 | 07:37.8–07:44.4 | He lands in the car, grabs Biscuit, and stares at the boy in the gold jacket, who just smiles. | PARK | Leon прыгает в кабинку, забирает Biscuit; соперник сидит напротив и смотрит. | — | Leon хватает Biscuit | BG park; wheel car; LEON; BISCUIT; RIVAL |
| S109 | 07:44.4–07:48.5 | "Nice run," the rival says. "See you on the next map." | PARK | RIVAL улыбается и говорит; Leon держит Biscuit. | `07:45.0` NICE RUN. SEE YOU ON THE NEXT MAP. | RIVAL подмигивает | BG park; wheel car; RIVAL; LEON; BISCUIT |
| S110 | 07:48.5–07:55.2 | Then his bar drops to zero, he disappears in a burst of gray, and the wheel goes quiet. | PARK | Полоска RIVAL падает в ноль, он рассыпается серыми частицами; колесо замирает. | — | RIVAL исчезает | BG park; RIVAL; particles; wheel |
| S111 | 07:55.2–08:00.9 | Green letters across the sky. Mission passed. Respect, plus one. | PARK | Зелёные буквы на всё небо: MISSION PASSED · RESPECT +1; Leon держит Biscuit. | `07:55.7` passed | буквы, искры | BG park; LEON; BISCUIT; label passed |
| S112 | 08:00.9–08:03.7 | Biscuit licks Leon's face for about a minute. | PARK | Biscuit лижет Leon в лицо, Leon жмурится от смеха. | — | Biscuit лижет | BG park; LEON; BISCUIT |
| S113 | 08:03.7–08:07.7 | Owen asks if the helicopter has a snack drawer. It does. | YARD | В кабине вертолёта Owen открывает ящик со снеками, у него глаза-звёзды. | — | ящик открывается | BG yard; helicopter; OWEN; snacks |
| S114 | 08:07.7–08:11.9 | The helicopter lands on the front lawn, and Mom stands there with her arms crossed. | YARD | Вертолёт садится на газон; на крыльце Mom со скрещёнными руками. | — | вертолёт садится | BG yard; helicopter; MOM; LEON; BISCUIT |
| S115 | 08:11.9–08:14.1 | "Where did you get a helicopter?" | YARD | Mom говорит, Leon держит Biscuit. | `08:12.3` WHERE DID YOU GET A HELICOPTER? | Mom хмурится | BG yard; MOM; LEON; BISCUIT |
| S116 | 08:14.1–08:16.0 | "A mission, Mom." | YARD | Leon пожимает плечами. | `08:14.5` A MISSION, MOM. | Leon пожимает плечами | BG yard; LEON; MOM |
| S117 | 08:16.0–08:21.4 | Dad checks the new bill and sighs. "Next time, use the stairs." | YARD | Dad смотрит на новый счёт на телефоне, вздыхает. | `08:19.3` NEXT TIME, USE THE STAIRS. | Dad вздыхает | BG yard; DAD; phone; LEON |
| S118 | 08:21.4–08:25.6 | Leon laughs, and for a second, the whole map seems to hold its breath. | YARD | Leon смеётся; вокруг семья, Biscuit, Owen. | — | Leon смеётся | BG yard; LEON; MOM; DAD; BISCUIT; OWEN |
| S119 | 08:25.6–08:35.3 | Then the minimap zooms out, slowly, and Leon sees how small his town really is, just one tiny corner of something huge. | MAPZOOM | Мини-карта в круге отъезжает: дом Leon всё меньше, видны другие кварталы. | — | карта отъезжает | minimap zoom out |
| S120 | 08:35.3–08:44.4 | And far away, past the hills and the ocean, one new marker is blinking. Mission. Three question marks. | MAPZOOM | Далеко за горами и океаном мигает новая метка с «???». | `08:42.9` MISSION · ??? | метка мигает | minimap; marker ??? |
| S121 | 08:44.4–08:55.4 | So, what would you do with a life like this? Tell us in the comments, and subscribe, because part two is already on the map. | VOID | Leon смотрит на зрителя, рядом кнопка SUBSCRIBE и колокольчик; на заднем плане метка. | `08:48.7` COMMENT BELOW; `08:49.6` PART 2 IS ON THE MAP | Leon показывает вниз | LEON; subscribe; bell |

## Итоги
- Сцен: 121. Средняя длина 4.4 с, самая длинная 11.0 с (S121), самая короткая 1.1 с (S032). Итог 08:55.4.
- Строк текста на экране: 70.
- Гэги без звука: жёлтый круг и «+$20,000», 4 месяца зарплаты конвертами, 17 лет чеков, золотая миска и Biscuit, Owen замер с $10,000, звёзды в углу 1→2→3→4, смена кепки в мойке, полоска здоровья 90→40→3 % и WASTED, какао в палате, Dad: «Worth it», красная метка без награды, Biscuit на колесе, лестница с вертолёта, мини-карта отъезжает.
- Логика: понедельник (тест +$20 тыс.) → неделя денег до $1 090 000 (пятница) → суббота машина → воскресенье катер и вертолёт → понедельник школа и погоня (4 звезды) → вторник крыша и палата → среда Biscuit пропал, большая миссия → финал. Деньги Leon: 20 тыс. → 1,09 млн; звёзды: 1, 2, 3, 4 (последнюю не потерять).
