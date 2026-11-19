# -*- coding: utf-8 -*-
# Данные раскадровки ролика 09. Сцена = ПЕРВЫЕ СЛОВА (start) до начала следующей сцены (из сценарий-сокращённый.txt).
# S(start, place, visual, texts=(), motion='', assets='', passport=None)
# texts = [(слово-якорь#n, "строка", тип, кто)]; тип: plate | cap | say | card | ev (событие для кода)
SC = []
def S(start, place, visual, texts=(), motion='', assets='', passport=None):
    SC.append(dict(start=start, place=place, visual=visual, texts=list(texts), motion=motion, assets=assets, passport=passport))

# ===== открытие: столовая =====
S('Lunch line, Tuesday', 'CAFE', 'Очередь за обедом: дети с подносами, Leon и Owen стоят вместе; плашка TUESDAY 12:05.', [('Lunch', 'TUESDAY · 12:05', 'plate', None)], 'очередь двигается, камера наезжает', 'BG cafeteria; LEON; OWEN; KIDS×4; trays')
S('Leon is holding', 'CAFE', 'Leon с подносом томатного супа у раздачи; вдруг замирает (поза держит поднос, не двигается).', [], 'Leon идёт и вдруг останавливается', 'BG cafeteria; LEON; tray+soup')
S('His eyes go', 'CAFE', 'Общий план: Leon замер с подносом; рядом врезка-круг крупно: лицо с широкими глазами-кольцами, рот открыт (глаза видны, взгляд пустой).', [], 'врезка появляется, рябь у глаз', 'BG cafeteria; LEON; inset face glassy',
  passport='врезка лица | справа сверху рядом с общим планом, не закрывает героя | лицом к зрителю | глаза-кольца видны | Owen | ≈ 1/3 кадра\nподнос | в руках Leon, ладони снизу | горизонтально | держит | Owen | 1/3 роста Leon')
S('Owen waves', 'CAFE', 'Owen машет рукой перед лицом Leon; Leon не реагирует.', [('Dude?', 'Dude? Hello?', 'say', 'OWEN')], 'рука Owen перед глазами', 'BG cafeteria; LEON; OWEN')
S("Three seconds later", 'CAFE', 'Стол: поднос Owen с мисками скользит к краю стола, прямо к его коленям; Owen сидит, не видит.', [('Three', '3 SEC', 'plate', None)], 'поднос ползёт к краю', 'BG cafeteria; table; OWEN seated; tray slides',
  passport='поднос Owen | на столешнице, скользит к краю стола, где сидит Owen | вдоль стола к краю | Leon смотрит | Owen и Leon | ≈ 1/3 роста Owen')
S("Leon's hand is", 'CAFE', 'Рука Leon ловит поднос у самого края; суп в миске не пролился; Owen в шоке.', [], 'рука ловит, суп качается', 'BG cafeteria; LEON; OWEN; tray')
S('"How did you', 'CAFE', 'Owen в очках поворачивается к Leon, недоумение.', [('How', 'How did you do that?', 'say', 'OWEN')], '', 'BG cafeteria; OWEN; LEON')
S("Leon doesn't answer", 'CAFE', 'Leon смотрит в сторону, облачко-мысль со знаком вопроса.', [], 'облачко с ?', 'BG cafeteria; LEON; cloud ?')
S('Ten seconds ago', 'VOIDD', 'Врезка-видение: тёмное поле, кольцо-таймер 10, внутри Owen открывает рот и говорит те же слова.', [('Ten', '10', 'plate', None)], 'кольцо тикает 10→0', 'BG voidDark; ring 10; OWEN mini')
S('So, what if', 'VOID', 'Leon по центру, над ним светящееся кольцо-часы «10s»; плашка названия.', [('exactly', 'WHAT IF YOU COULD SEE 10 SECONDS AHEAD', 'plate', None)], 'кольцо вращается', 'BG void; LEON; ring 10s')
S('And what happens', 'VOID', 'Leon смотрит вверх на обратный отсчёт 10…1; рядом силуэт беды (знак «!»).', [], 'отсчёт бежит', 'BG void; LEON; countdown; !')

# ===== блок 2: правила =====
S("Here's how it", 'CLASS', 'Класс Ms. Park: Leon за партой, плашка HOW IT WORKS.', [('works.', 'HOW IT WORKS', 'plate', None)], '', 'BG classroom; LEON; desk')
S('Rule one.', 'CLASS', 'Leon сидит, над ним облачко: короткий фильм (кадр с отсчётом 10), стрелка «назад».', [('one.', 'RULE 1 · TEN SECONDS AHEAD', 'plate', None)], 'облачко-кино и стрелка снап-бэк', 'BG classroom; LEON; cloud movie')
S('Rule two.', 'CLASS', 'Leon за партой тянется к ручке, медленно; рядом спидометр на «normal».', [('two.', 'RULE 2 · BODY STAYS NORMAL', 'plate', None)], 'стрелка спидометра на NORMAL', 'BG classroom; LEON; gauge normal')
S('Rule three.', 'CLASS', 'Схема: лента-фильм, одна картинка меняется, остальные кадры перерисовываются.', [('three.', 'RULE 3 · THE FUTURE ISN\'T WRITTEN', 'plate', None)], 'кадры ленты мигают и меняются', 'BG void; film strip')
S('Rule four, the one', 'CLASS', 'Leon за партой; перед ним на часах стрелка уходит, плашка RULE 4: LOOKING COSTS TIME.', [('four,', 'RULE 4 · LOOKING COSTS TIME', 'plate', None)], 'часы щёлкают', 'BG classroom; LEON; wall clock')
S('Every glimpse freezes', 'VOID', 'Таймер-кольцо из десяти делений: три деления закрашиваются красным «3 SEC», остаются семь.', [('three', '3 SEC', 'plate', None), ('ten.', '10 − 3 = 7', 'cap', None)], 'три сектора краснеют', 'BG void; ring 10 split')
S('"Leon," says Ms.', 'CLASS', 'Ms. Park у доски с маркером, Leon за партой с застывшим лицом (зависание).', [('Leon,', 'Leon, are you asleep?', 'say', 'PARK')], 'Leon замер, Park смотрит на него', 'BG classroom; PARK; LEON; board; marker')
S('"No, ma\'am.', 'CLASS', 'Leon очнулся, показывает на маркер; у Ms. Park маркер в руке, кончик чернил бледнеет.', [('No,', 'Your marker is about to die.', 'say', 'LEON')], 'Leon указывает', 'BG classroom; PARK; LEON; marker')
S('The marker dies.', 'CLASS', 'Маркер чертит и гаснет, Ms. Park смотрит на маркер, потом на Leon, класс смотрит.', [], 'линия на доске бледнеет и кончается', 'BG classroom; PARK; LEON; KIDS×3; board',
  passport='маркер | в руке Ms. Park, кончик у доски | к доске | чертит и гаснет | Ms. Park, класс | 1/4 роста человека')
S('So Leon has a choice', 'VOID', 'Две двери: слева «LOOK A LOT» (человек в тумане), справа «LOOK RARELY» (человек с завязанными глазами).', [('daze,', 'LIVE IN A DAZE', 'cap', None), ('blind.', 'STAY BLIND', 'cap', None)], 'Leon выбирает, обе двери зачёркнуты', 'BG void; two doors; LEON')
S('And being ten', 'VOID', 'Leon поднимает палец, над ним мешок с долларами.', [('money.', 'THE MONEY', 'plate', None)], 'мешок покачивается', 'BG void; LEON; money sack')

# ===== блок 3: пенальти =====
S('Saturday, Hat Trick', 'STORE', 'Спортивный магазин Hat Trick Sports снаружи: вход, витрина, ворота у двери; плашка SATURDAY.', [('Saturday,', 'SATURDAY', 'plate', None), ('Hat', 'HAT TRICK SPORTS', 'cap', None)], 'камера наезжает', 'BG sportStore; LEON small; sign')
S('A sign by the', 'STORE', 'Плакат у двери: KIDS PENALTY CHALLENGE, 4 из 5, $10 000; Leon читает, глаза вверх.', [('sign', 'KIDS PENALTY CHALLENGE', 'cap', None), ('ten', 'STOP 4 OF 5 → $10,000', 'plate', None)], 'плакат трясётся', 'BG sportStore; LEON; poster',
  passport='плакат | на стене рядом с дверью магазина, на уровне глаз | к зрителю | висит | Leon | ≈ 1,5 роста Leon')
S('Leon pulls on', 'STORE', 'Leon натягивает огромные перчатки, пальцы болтаются; на заднем плане ворота с сеткой.', [], 'пальцы перчаток болтаются', 'BG sportStore; LEON; gloves; goal')
S("Here's the problem", 'STORE', 'Схема сверху: точка пенальти и ворота, линия 11 m; мяч едет.', [('eleven', '11 m', 'cap', None), ('half', '≈ 0.5 s', 'plate', None)], 'мяч летит по линии, таймер ≈0.5', 'BG void; penalty diagram; ball',
  passport='схема пенальти | вид сверху в плоскости кадра: слева точка, справа ворота | мяч к воротам | — | зритель | ширина ≈ 70% кадра')
S('A goalkeeper needs', 'STORE', 'Вратарь-манекен в воротах, мяч уже в сетке; облачко с часами 0.5 s.', [], 'мяч в сетке, манекен стоит', 'BG sportStore; goal; keeper dummy; ball')
S('They guess, and', 'STORE', 'Вратарь-манекен прыгает влево заранее, мяч летит вправо в сетку; надпись GUESS.', [('guess,', 'THEY GUESS', 'cap', None)], 'манекен прыгает не туда', 'BG sportStore; goal; keeper dummy; ball')
S("Leon doesn't have", 'STORE', 'Leon стоит в воротах, перчатки до колен, самодовольно улыбается; перед ним судья со свистком.', [], '', 'BG sportStore; LEON; goal; REF')
S('Shot one.', 'STORE', 'Общий план: Leon в воротах замирает на три секунды (3 SEC), судья с нахмуренным лицом, толпа (FAN1/FAN2, дети).', [('Shot', 'SHOT 1', 'plate', None), ('okay?', 'Is he okay?', 'say', 'REF')], 'Leon стоит без движения, судья наклоняется', 'BG sportStore; LEON; REF; KIDS×4; goal',
  passport='ворота | на траве/площадке, стойки на земле, сетка сзади | открыты к кикеру | Leon внутри | зрители и судья | ≈ 3 роста Leon в ширину\nвратарь Leon | на линии ворот лицом к кикеру | поза ready не используется (stand/dive) | глаза видны | зрители | s 1.5, весь в кадре')
S('Then Leon dives', 'STORE', 'Leon ныряет влево в прыжке (поза dive), мяч летит от кикера по дуге; судья, толпа реагируют.', [], 'прыжок и мяч по траектории', 'BG sportStore; LEON dive; ball path; goal; KICKER')
S('Shot two, right.', 'STORE', 'Прыжок вправо, мяч пойман, толпа радуется.', [('Shot', 'SHOT 2', 'plate', None)], 'прыжок вправо', 'BG sportStore; LEON dive; ball; KIDS×4')
S('Shot three,', 'STORE', 'Leon влево снова, мяч на перчатках; толпа скандирует, у них флаги/руки вверх.', [('Shot', 'SHOT 3', 'plate', None), ('chanting.', 'LE-ON! LE-ON!', 'cap', None)], 'толпа прыгает', 'BG sportStore; LEON; ball; KIDS×5; FAN1; FAN2')
S('Shot four.', 'STORE', 'Здоровенный кикер (вдвое больше Leon) бьёт; мяч летит к верхнему углу ворот; Leon смотрит на него.', [('Shot', 'SHOT 4', 'plate', None)], 'мяч-ракета летит в угол', 'BG sportStore; LEON; BIG KICKER; ball; goal',
  passport='мяч | летит от точки пенальти к верхнему углу ворот, по дуге | к воротам | бьёт кикер | Leon, зрители | ≈ 1/6 роста Leon\nкикер | у точки пенальти, нога после удара, лицом к воротам | к воротам | бьёт | толпа | ≈ 2 роста Leon')
S('He knows exactly', 'STORE', 'Leon в прыжке (dive) тянет перчатку к мячу, пальцы в дюйме от мяча; крупная врезка «1 INCH» рядом.', [('inch.', '1 INCH', 'plate', None)], 'мяч пролетает над перчаткой', 'BG sportStore; LEON dive; ball; goal; inset glove',
  passport='перчатка | на руке Leon, вытянута к мячу; мяч выше на дюйм | к мячу | тянется | зрители | перчатка ≈ 1/4 роста Leon\nврезка | справа сверху рядом с общим планом: перчатка и мяч, зазор 1 INCH | к зрителю | — | зритель | 1/4 кадра')
S("Knowing where a", 'STORE', 'Leon лежит на земле, смотрит на свои руки, рядом короткая линейка «ARMS: SAME LENGTH».', [('longer.', 'ARMS: SAME LENGTH', 'cap', None)], 'Leon смотрит на руки', 'BG sportStore; LEON lying; goal; ruler')
S('Shot five.', 'STORE', 'Пятый удар: Leon замер (3 SEC), потом ныряет, перчатки ловят мяч.', [('Shot', 'SHOT 5', 'plate', None)], 'замер, прыжок, ловит', 'BG sportStore; LEON; ball; REF; goal')
S('Four out of five.', 'STORE', 'Leon на плечах у толпы, поднимает гигантский чек $10 000; судья вручает.', [('thousand', '$10,000', 'plate', None)], 'подбрасывают, конфетти', 'BG sportStore; LEON; KIDS×4; REF; big check; confetti')
S('That night, Mom', 'KITCHEN', 'Кухня вечером: Mom держит конверт с купюрами, Leon за столом; Mom спрашивает.', [('Where', 'Where did you get this?', 'say', 'MOM')], 'Mom трясёт конвертом', 'BG kitchen; MOM; LEON; table; envelope')
S('"Luck," says Leon', 'KITCHEN', 'Leon пожимает плечами, Mom щурится, смотрит на него долго.', [('Luck,', 'Luck.', 'say', 'LEON')], 'Mom скрестила руки', 'BG kitchen; MOM; LEON; envelope')
S('But money was', 'VOID', 'Leon один у окна, держит конверт не глядя, думает о другом; над ним сердце.', [], 'сердце проявляется', 'BG void; LEON; envelope; heart')

# ===== блок 4: скутер =====
S('Monday after school', 'STREET', 'Улица после школы: Zoe идёт по тротуару впереди, Leon сзади; плашка MONDAY, подпись «20 STEPS».', [('Monday', 'MONDAY · AFTER SCHOOL', 'plate', None), ('twenty', '20 STEPS BEHIND', 'cap', None)], 'идут по тротуару', 'BG street; ZOE; LEON; sidewalk; garden gate',
  passport='тротуар | вдоль нижней трети кадра, слева направо | — | по нему идут | — | ширина кадра\nZoe | впереди Leon на ≈20 шагов, спиной к камере/идёт вправо | вправо | идёт | Leon | s 1.5\nсадовая калитка | справа на тротуаре за забором сада, открыта наружу | к тротуару | — | — | ≈ 1,2 роста Zoe')
S('She has headphones', 'STREET', 'Крупно (общим планом) Zoe: наушники на голове, сумка через плечо с ремнём.', [], 'Zoe покачивает головой под музыку', 'BG street; ZOE; headphones; bag')
S('Then he looks', 'VOIDD', 'Врезка-видение: обратный отсчёт 10; в облачке скутер с мальчиком в сером капюшоне, рука тянется к ремню сумки.', [('looks', '10', 'plate', None)], 'облачко-видение, отсчёт', 'BG voidDark; vision cloud; scooter; ring 10',
  passport='облачко-видение | над Leon, не закрывает глаза | к зрителю | — | зритель | ≈ 40% кадра\nскутер | в облачке на дороге, колёса на земле, нос вправо | вправо | едет к Zoe | — | ≈ 1,3 роста человека\nремень сумки | на плече Zoe, рука мальчика тянется к нему | — | — | — | ≈ 1/3 роста Zoe')
S('A hand grabbing', 'VOIDD', 'Врезка-видение: рука хватает ремень, Zoe падает на тротуар (кадр в облачке мерцает красным).', [], 'облачко мигает', 'BG voidDark; vision cloud; ZOE falling')
S('Leon freezes for', 'STREET', 'Leon застыл с остекленевшими глазами (3 SEC), Zoe продолжает идти; на заднем плане вдали едет скутер.', [('three', '3 SEC', 'plate', None), ('seven', '7', 'plate', None)], 'таймер показывает 7', 'BG street; LEON; ZOE; ring 7; scooter far')
S('He sprints.', 'STREET', 'Leon бежит к Zoe по тротуару; скутер приближается слева по дороге; плашки 6, 5.', [('Six', '6', 'plate', None), ('Five.', '5', 'plate', None)], 'бег, отсчёт 6→5', 'BG street; LEON run; ZOE; scooter; ring 5')
S('He grabs her sleeve', 'STREET', 'Leon хватает рукав Zoe и тянет её назад в открытую садовую калитку; она удивлена, наушники слетают.', [], 'Zoe втянута в калитку', 'BG street; LEON; ZOE; garden gate; fence',
  passport='калитка | в заборе сада справа, на тротуаре, створка открыта в сад | наружу к тротуару | проходят | — | ≈ 1,2 роста Zoe\nрукав Zoe | в руке Leon | назад к калитке | тянет | Zoe | —')
S('The scooter shoots', 'STREET', 'Скутер с мальчиком в сером капюшоне проносится по дороге мимо калитки, рука пустая; сумка висит у Zoe на плече.', [('empty-handed.', 'EMPTY-HANDED', 'cap', None)], 'скутер проезжает слева направо', 'BG street; SCOOTER BOY; scooter; ZOE; LEON; gate',
  passport='скутер | на проезжей части, колёса на асфальте, нос по ходу вправо | вправо | проезжает | Zoe, Leon, мальчик смотрит вперёд | ≈ 1,3 роста человека; мальчик на нём целиком\nремень сумки | остаётся на плече Zoe, сумка за калиткой | — | — | — | —')
S('Zoe pulls out', 'STREET', 'Zoe в калитке снимает один наушник, удивлена; Leon рядом запыхался.', [('What', 'What was that?', 'say', 'ZOE')], '', 'BG street; ZOE; LEON; gate')
S('"You looked like', 'STREET', 'Leon разводит руками, пот на лбу; Zoe смотрит на него.', [('You', 'You looked like you were about to trip.', 'say', 'LEON')], 'капля пота', 'BG street; LEON; ZOE')
S('She laughs anyway.', 'STREET', 'Zoe смеётся, у Leon краснеют щёки, сердечко над ним.', [], 'сердце', 'BG street; ZOE; LEON; heart')
S('From that day', 'STREET', 'Закатное небо, Leon и Zoe идут вместе по тротуару; дни: вторая пара ног-тень.', [('Every', 'EVERY DAY', 'cap', None)], 'идут медленно вправо', 'BG street; LEON; ZOE; walking')
S('He is the happiest', 'STREET', 'Leon подпрыгивает от радости; над ним тень вопроса, чёрное облачко вдали.', [], 'подпрыгивает, тучка вдали', 'BG street; LEON; cloud')

# ===== блок 5: школа =====
S('Then school gets', 'CLASS', 'Класс: Leon у экрана с презентацией, над слайдами ряд маленьких «10s».', [('presentation,', 'SCIENCE PRESENTATION', 'plate', None)], 'слайды листаются', 'BG classroom; LEON; screen slides')
S('A fact that', 'CLASS', 'Ms. Park кивает, Leon повторяет жест, большой палец вверх на экране «A+».', [('highest', 'HIGHEST SCORE OF THE YEAR', 'plate', None)], 'A+ вспыхивает', 'BG classroom; PARK; LEON; screen A+')
S('In gym class', 'GYM', 'Спортзал: Leon посреди площадки, вокруг ряд ребят кидает мячи, Leon уворачивается; мячи пролетают мимо.', [('gym', 'GYM CLASS · DODGEBALL', 'plate', None), ('nine', '9 MISSES', 'cap', None)], 'уклоняется, мячи летят мимо', 'BG gym; LEON; KIDS×6; dodgeballs',
  passport='мячи | в воздухе, летят от бросающих к Leon и мимо | к Leon, пролетают | бросают дети | Leon уворачивается | ≈ 1/5 роста Leon\nLeon | в центре площадки, ноги на полу, поза dodge (stand/walk) | к бросающим | уклоняется | дети и Burke | s 1.5')
S('Coach Burke calls', 'GYM', 'Coach Burke со свистком показывает на Leon большим пальцем, руки на бёдрах; Leon смущён.', [('hit.', 'NOBODY CAN HIT HIM', 'cap', None)], 'Burke свистит', 'BG gym; BURKE; LEON; whistle')
S('By Friday, half', 'HALL', 'Коридор: толпа детей показывает на Leon, над ними пузыри «LUCKY LEON»; Leon идёт, неловко.', [('Lucky', 'LUCKY LEON', 'plate', None)], 'толпа скандирует', 'BG hall; LEON; KIDS×6; bubbles')
S('And lucky people', 'HALL', 'Leon один у шкафчиков, над ним табличка «NO BAD DAYS ALLOWED».', [('bad', 'NO BAD DAYS ALLOWED', 'cap', None)], 'табличка падает вниз', 'BG hall; LEON; lockers; sign')

# ===== блок 6: танцы =====
S('Then comes the', 'HALL', 'Коридор: на стене афиша FRIDAY DANCE; Leon смотрит на Zoe вдали у шкафчика и поднимает глаза вверх.', [('dance.', 'FRIDAY DANCE', 'plate', None)], 'афиша колышется', 'BG hall; LEON; ZOE far; poster')
S('In the vision', 'VOIDD', 'Врезка-видение: ring 10; Leon и Zoe у шкафчика; Leon говорит, Zoe качает головой.', [('Do', 'Do you want to go with me?', 'say', 'LEON')], 'отсчёт, Zoe качает головой', 'BG voidDark; vision cloud; LEON mini; ZOE mini')
S('Leon changes it.', 'VOIDD', 'Врезка-видение: Leon стирает фразу и переписывает; ластик и новый пузырь.', [], 'ластик стирает фразу', 'BG voidDark; LEON; eraser; bubble')
S('Look, freeze, three', 'HALL', 'Leon замирает (3 SEC), Zoe ждёт, чуть наклонив голову.', [], 'Leon застыл', 'BG hall; LEON; ZOE; ring 3')
S('"Would you like', 'HALL', 'Leon задаёт новую фразу, Zoe виновато качает головой.', [('Would', 'Would you like to go to the dance?', 'say', 'LEON'), ('thing."', 'Sorry, I have a thing.', 'say', 'ZOE')], 'Zoe отводит взгляд', 'BG hall; LEON; ZOE')
S('Look, freeze. Zoe', 'HALL', 'Leon снова замер, Zoe машет рукой у него перед лицом.', [('Leon?', 'Leon? Are you okay?', 'say', 'ZOE')], 'рука Zoe', 'BG hall; LEON; ZOE')
S('Third try.', 'VOIDD', 'Врезка-видение: Zoe улыбается и кивает, над ней галочка YES.', [], 'галочка вспыхивает', 'BG voidDark; vision cloud; ZOE; YES tick')
S('So he says exactly', 'HALL', 'Leon произносит фразу, Zoe улыбается; над ними сердце.', [('"Yes."', 'Yes.', 'say', 'ZOE')], 'сердце', 'BG hall; LEON; ZOE; heart')
S('But on the walk', 'STREET', 'Дорога домой: Zoe останавливается и поворачивается к Leon, сдвинув бровь.', [('weird.', 'That was weird.', 'say', 'ZOE')], 'Zoe останавливается', 'BG street; LEON; ZOE')
S('Leon opens his', 'STREET', 'Leon открывает рот и ничего не выходит, над ним троеточие.', [], 'троеточие', 'BG street; LEON; ZOE; dots')
S('He never heard', 'VOID', 'Схема: два облачка: «WHAT SHE WANTED» (пустое с ?) и «WHAT SHE\'D SAY TO A SCRIPT» (заполнено).', [('script.', 'SCRIPT', 'plate', None)], 'левое пустое, правое заполняется', 'BG void; two clouds')
S("And here's the real", 'VOID', 'Leon с лупой и плашкой THE REAL PART, над ним облачко с вопросом.', [('real', 'THE REAL PART', 'plate', None)], 'лупа качается', 'BG void; LEON; magnifier')
S('In nineteen eighty-three', 'VOID', 'Календарь 1983, значок мозга и журнал BRAIN; рядом силуэт учёного с лупой.', [('eighty-three,', '1983', 'plate', None), ('Libet', 'BENJAMIN LIBET', 'cap', None), ('Brain.', 'JOURNAL: BRAIN', 'cap', None)], 'книга листается', 'BG void; brain; journal; scientist')
S('They found that', 'VOID', 'Шкала времени: сигнал мозга вспыхивает, через полсекунды рука нажимает кнопку.', [('half', '≈ 0.5 s EARLIER', 'plate', None)], 'сигнал на шкале и затем кнопка', 'BG void; timeline; brain; button')
S('Scientists still argue', 'VOID', 'Двое учёных спорят, над ними знаки ? и !, между ними мозг.', [('argue', 'SCIENTISTS STILL ARGUE', 'cap', None)], 'знаки вопроса прыгают', 'BG void; scientists×2; brain')
S('But if brains', 'VOID', 'Leon смотрит вперёд, перед ним мозг и ряд будущих кадров; надпись «BEFORE WE NOTICE».', [('notice,', 'BEFORE WE NOTICE', 'cap', None)], 'кадры будущего пробегают', 'BG void; LEON; brain; film')
S('Their choice, or', 'VOID', 'Leon с вопросом над головой и двумя вариантами: THEIR CHOICE / HIS SCRIPT.', [('choice,', 'THEIR CHOICE?', 'cap', None), ('script?', 'HIS OWN SCRIPT?', 'cap', None)], 'варианты мигают', 'BG void; LEON; two options')
S('And that was the', 'VOID', 'Leon вздыхает, над ним табличка «EASY PROBLEM»; вдали проступает большой часовой циферблат.', [('easy', 'THE EASY PROBLEM', 'plate', None)], 'циферблат растёт вдали', 'BG void; LEON; big clock')

# ===== блок 7: лаг =====
S('The hard problem', 'CLASS', 'Часы на стене, Leon за партой замирает; над ним значок песочных часов.', [], 'часы тикают', 'BG classroom; LEON; wall clock; hourglass')
S("Leon's day now", 'CLASS', 'Leon замирает снова и снова; над ним счётчик 40 GLIMPSES растёт.', [('forty', '40 GLIMPSES / DAY', 'plate', None)], 'счётчик растёт', 'BG classroom; LEON; counter')
S('The school nurse', 'HALL', 'Школьная медсестра ставит Leon градусник, термометр уже второй; Leon покорно.', [('twice.', 'TEMPERATURE: TWICE', 'cap', None)], 'градусник пищит', 'BG hall; NURSE; LEON; thermometer')
S('In the cafeteria', 'CAFE', 'Столовая: Leon и Owen за столом; Leon замер на полуслове; Owen просит закончить.', [('That\'s', 'That\'s the third time today. Just finish it.', 'say', 'OWEN')], 'Leon замирает, Owen жестикулирует', 'BG cafeteria; LEON; OWEN; table')
S('Worst of all', 'CAFE', 'Owen и Zoe говорят, из их ртов линии слов; Leon смотрит поверх них вперёд, уши зажаты ладонями.', [], 'слова пролетают мимо Leon', 'BG cafeteria; LEON; OWEN; ZOE; word bubbles')
S('The more he looks', 'VOID', 'Весы: на одной чаше глаз LOOK, на другой тонкая полоска LIFE и она взлетает.', [('looks,', 'THE MORE HE LOOKS, THE LESS HE LIVES', 'plate', None)], 'весы перевешивают', 'BG void; scales; eye; life bar')
S('A week later', 'VOID', 'Календарь: страница переворачивается, плашка WINTER CONCERT.', [('concert.', 'WINTER CONCERT', 'plate', None)], 'листок переворачивается', 'BG void; calendar')

# ===== блок 8: концерт =====
S('Friday, the school', 'STAGE', 'Зал концерта: ряды стульев, сцена с занавесом; плашка FRIDAY · 7 PM; общий план.', [('Friday,', 'FRIDAY · 7 PM', 'plate', None)], 'камера наезжает на сцену', 'BG stage; chairs; curtain')
S('Above the stage', 'STAGE', 'Над сценой стальная рама с четырьмя прожекторами на четырёх тросах; тросы натянуты к потолку.', [('four', '4 CABLES', 'cap', None)], 'рама слегка покачивается', 'BG stage; steel frame; 4 cables; spotlights',
  passport='стальная рама | висит над сценой, высоко, на четырёх тросах к потолку по углам | горизонтально | висит | зал | ≈ 2,5 роста человека в ширину, раме ≈ 0,4 роста по высоте\nтросы | четыре вертикальные линии от углов рамы к потолку | вверх | держат | — | высота ≈ 2 роста\nпрожекторы | на раме снизу, светят вниз на сцену | вниз | — | зал | ≈ 0,3 роста')
S('Owen stands right', 'STAGE', 'Owen с роботом-самоделкой стоит на краю сцены прямо под рамой; рядом Zoe держит вилку шнура.', [], 'Owen поправляет робота', 'BG stage; OWEN; ZOE; robot; plug; frame above',
  passport='Owen | на краю сцены под рамой, лицом в зал | к залу | держит робота | зал | s 1.5\nробот | в руках Owen, спереди | вперёд | — | зал | 1/3 роста Owen\nZoe | справа от Owen, в руке вилка с шнуром к розетке на стене | к залу | держит вилку | Owen | s 1.5\nрама | прямо над ними, выше голов, не касается | — | висит | — | выше голов')
S('Leon sits in', 'STAGE', 'Leon в третьем ряду среди зрителей, в руках ведёрко попкорна, смотрит на сцену.', [], 'ест попкорн', 'BG stage; chairs; LEON seated; popcorn; AUDIENCE×5',
  passport='Leon | сидит на стуле третьего ряда, бёдра на сиденье | к сцене | ест попкорн | зал | s 1.5\nпопкорн | ведёрко у Leon в руке | вверх | — | — | 1/3 роста')
S('Out of habit', 'VOIDD', 'Врезка-видение: ring 10; сцена, рама, мигание красным; в уголке Leon замирает (3 SEC).', [('Three', '3 SEC', 'plate', None)], 'облачко-видение', 'BG voidDark; vision cloud; frame; ring 10')
S('Then he sees it.', 'VOIDD', 'Врезка-видение: один трос рвётся, рама наклоняется.', [], 'трос рвётся', 'BG voidDark; vision cloud; frame; broken cable')
S('It falls straight', 'VOIDD', 'Врезка-видение: рама падает на Owen и Zoe, кадр краснеет.', [], 'рама падает', 'BG voidDark; vision cloud; frame; Owen; Zoe')
S('Leon snaps back.', 'STAGE', 'Leon вскочил, глаза широкие; над ним огромная цифра 7 в кольце.', [('Seven', '7', 'plate', None)], 'цифра 7 пульсирует', 'BG stage; LEON; ring 7; frame')
S('Now he has a', 'VOID', 'Развилка: две стрелки RUN BLIND (остаётся 7) и LOOK AGAIN (остаётся 4), у второй три красных деления.', [('blind', 'RUN BLIND: 7 LEFT', 'cap', None), ('again', 'LOOK AGAIN: 4 LEFT', 'cap', None)], 'стрелки мигают', 'BG void; fork; ring')
S('Leon does the math', 'STAGE', 'Leon с попкорном считает на пальцах вслух; над ним формула 7 − 4 = 3.', [('Seven.', 'Seven. If I run, I get there at three.', 'say', 'LEON')], 'пальцы', 'BG stage; LEON; math cloud')
S('He runs.', 'STAGE', 'Leon бежит по проходу между рядами к сцене, стаканчик попкорна летит в воздухе; цифры 7→5.', [('five', '5', 'plate', None)], 'бег по проходу, стаканчик в воздухе', 'BG stage; LEON run; aisle; chairs; frame',
  passport='проход | между рядами стульев по центру к сцене | вперёд | по нему бежит Leon | зрители | —\nLeon | в проходе, бежит к сцене, весь в кадре | к сцене | бежит | зал | s 1.5\nрама | над сценой, видна вдали выше голов | — | покачивается | — | —')
S('He looks once', 'VOIDD', 'Врезка-видение: Owen и Zoe под рамой; две стрелки толчка: влево (Zoe под рамой) и вправо (Leon под рамой).', [('Three', '3 SEC', 'plate', None), ('Two', '2', 'plate', None)], 'оба варианта мигают', 'BG voidDark; vision cloud; OWEN; ZOE; LEON; frame')
S('Shove Owen left', 'VOID', 'Схема сверху: сцена, три фигурки, рама-прямоугольник; при толчке влево рама накрывает Zoe, вправо накрывает Leon.', [('left,', 'LEFT: ZOE', 'cap', None), ('right,', 'RIGHT: LEON', 'cap', None)], 'рама-тень двигается', 'BG void; diagram top view; frame',
  passport='диаграмма сверху | в плоскости кадра: сцена и три фигурки | — | — | зритель | ширина ≈ 70% кадра')
S("So he doesn't", 'STAGE', 'Leon прыгает на сцену, раскинув руки, и обхватывает Owen и Zoe; выкрик «Everybody move!»; зал оборачивается.', [('move!', 'Everybody move!', 'say', 'LEON')], 'прыжок на сцену, объятие', 'BG stage; LEON; OWEN; ZOE; frame; AUDIENCE',
  passport='Leon | на сцене между Owen и Zoe, руками обхватывает обоих, лицом в зал | к залу | обнимает и тащит | зал | s 1.5\nрама | над сценой чуть качается | вниз | — | зал | выше голов')
S('and drags them', 'STAGE', 'Трое катятся с края сцены в проход; у них в руках робот и вилка; зрители шарахаются.', [], 'трое падают в проход', 'BG stage; LEON; OWEN; ZOE; AUDIENCE')
S('The frame hits', 'STAGE', 'Рама падает на пустую сцену с грохотом, пыль и искры, прожекторы разлетаются; сцена пуста.', [('bang', 'BANG!', 'plate', None)], 'удар, тряска камеры, пыль', 'BG stage; frame crash; dust; sparks',
  passport='рама | падает вертикально на сцену, четыре стойки, на настил; на сцене никого | вниз | падает | зал | ≈ 2,5 роста в ширину\nсцена | настил на ножках, пустой в момент удара | — | — | — | —')
S('Silence. Then', 'STAGE', 'Зал в тишине, трое в проходе на полу, рама лежит на сцене.', [], 'пыль оседает', 'BG stage; AUDIENCE×8; LEON; OWEN; ZOE; frame wreck')
S('Then somebody laughs', 'STAGE', 'Один хлопает, затем весь зал встаёт и аплодирует; трое в проходе удивлённо озираются.', [], 'аплодисменты нарастают', 'BG stage; AUDIENCE×8 standing; LEON; OWEN; ZOE; frame wreck')

# ===== блок 9: развязка =====
S('Afterward, Zoe holds', 'HALL', 'Zoe держит Leon за рукав в коридоре, дрожит; у Leon виноватое лицо.', [], 'Zoe дрожит', 'BG hall; ZOE; LEON')
S('"You froze right', 'HALL', 'Zoe смотрит Leon в глаза и спрашивает.', [('You', 'You froze right before it happened. What do you see?', 'say', 'ZOE')], 'Zoe наклоняется к Leon', 'BG hall; ZOE; LEON')
S('Leon thinks about', 'HALL', 'Leon за секунду думает: облачко с ложью зачёркнуто; затем рассказывает, жестикулируя.', [], 'облачко зачёркивается', 'BG hall; LEON; ZOE; cloud crossed')
S('Zoe is quiet', 'HALL', 'Zoe молчит, потом улыбается и поднимает палец.', [('So', 'So ask me something else. Without looking.', 'say', 'ZOE')], 'пауза, улыбка', 'BG hall; ZOE; LEON')
S('Leon swallows.', 'HALL', 'Leon сглатывает, закрывает глаза ладонью (глаза видны между пальцами), потом открывает.', [], 'Leon не смотрит вперёд', 'BG hall; LEON; ZOE')
S('He says something', 'HALL', 'Leon бормочет, над ним пузырь с каракулями; Zoe хохочет и отвечает такими же.', [], 'пузыри «blah» от обоих', 'BG hall; LEON; ZOE; bubbles')
S('and neither of them', 'HALL', 'Leon и Zoe смотрят друг на друга и вдаль; над ними пустое облачко со знаком вопроса.', [], 'облачко пустеет', 'BG hall; LEON; ZOE; empty cloud')
S('A plan is only', 'VOID', 'Крупно плашка: «A PLAN IS ONLY WORTH THE SECONDS YOU HAVE LEFT TO USE IT»; снизу кольцо-таймер.', [('plan', 'A PLAN IS ONLY WORTH THE SECONDS YOU HAVE LEFT', 'plate', None)], 'таймер тикает', 'BG void; ring; plate')
S('And these are the', 'STREET', 'Закат: Leon и Zoe идут рядом, держась за руки, вдали сцена школы; над ними нет никакого облачка.', [], 'идут вправо в закат', 'BG street; LEON; ZOE')

# ===== финал =====
S('Spring comes.', 'STREET', 'Весна: цветущее дерево, Leon идёт с Zoe, на ходу считает пальцами.', [('Spring', 'SPRING', 'plate', None)], 'лепестки', 'BG street; LEON; ZOE; blossoms')
S('Then one night', 'ROOM', 'Ночью Leon лежит в кровати (поза lie, голова на подушке, одеяло), над ним облачко-видение с отсчётом.', [], 'отсчёт идёт', 'BG livingRoom dark; LEON in bed; vision cloud')
S('He counts.', 'VOIDD', 'Кольцо-таймер: цифры 8, 9, 10, затем кольцо раскрывается до 11, красная цифра 11.', [('Eight.', '8', 'plate', None), ('Eleven.', '11', 'plate', None)], 'цифры загораются по очереди', 'BG voidDark; ring 11')
S('The vision is growing', 'ROOM', 'Leon сидит в кровати, широко раскрыв глаза; над ним кольцо 11 с вопросительным знаком.', [('second', '+1', 'plate', None)], 'кольцо с ? пульсирует', 'BG livingRoom dark; LEON; ring 11; ?')
S('So, what would you', 'VOID', 'Три плашки-иконки: MONEY (мешок), LOVE (сердце), A FRIEND (рука); Leon смотрит на них.', [('money,', 'MONEY', 'cap', None), ('love,', 'LOVE', 'cap', None), ('friend?', 'A FRIEND', 'cap', None)], 'иконки подпрыгивают по очереди', 'BG void; LEON; money; heart; hand')
S('Tell us in the', 'VOID', 'Плашка COMMENTS с пузырями-ответами; Leon показывает вниз.', [('comments,', 'TELL US IN THE COMMENTS', 'plate', None)], 'пузыри всплывают', 'BG void; LEON; comments')
S('and subscribe, because', 'VOID', 'Плашка SUBSCRIBE с колокольчиком, над ней кольцо с цифрой 11.', [('subscribe,', 'SUBSCRIBE', 'plate', None)], 'колокольчик звенит', 'BG void; subscribe; bell; ring 11')
