# -*- coding: utf-8 -*-
# Данные раскадровки ролика 07. Сцена = ПЕРВЫЕ СЛОВА (start) до начала следующей сцены (из сценарий.txt, после сокращений).
# S(start, place, visual, texts=(), motion='', assets='', passport=None)
# texts = [(слово-якорь#n, "строка", тип, кто)]; тип: plate | cap | say | card | ev (событие HUD для кода, не рисуется само)
SC = []
def S(start, place, visual, texts=(), motion='', assets='', passport=None):
    SC.append(dict(start=start, place=place, visual=visual, texts=list(texts), motion=motion, assets=assets, passport=passport))

# ===== блок 0: задание в классе =====
S('Monday, eight ten', 'CLASS', 'Класс 114, утро. Leon входит с рюкзаком, табличка «ROOM 114» у двери, другие дети за партами.', [('Monday,', 'MONDAY · 8:10 AM', 'cap', None)], 'Leon идёт слева направо', 'BG classroom; LEON; KIDS')
S('A yellow circle', 'CLASS', 'Жёлтый светящийся круг на полу у парты Leon; Leon замер и смотрит на него.', [('circle', 'yellow', 'ev', None)], 'круг пульсирует', 'BG classroom; LEON; ring',
  passport='жёлтый круг | на полу в плоскости пола, овал в перспективе, у парты Leon | — | светится | Leon | диаметр ≈ 1,2 роста Leon')
S('Mission. Pass', 'CLASS', 'Над кругом в воздухе белая надпись: MISSION · PASS THE MATH TEST · REWARD $20,000 (надпись кодом, выше головы Leon, глаза не закрыты).', [('Mission.', 'label', 'ev', None)], 'буквы появляются построчно', 'BG classroom; LEON; ring; label',
  passport='надпись | в воздухе над кругом, выше головы Leon | читается слева направо | белая с тёмной обводкой | Leon | ширина ≈ 2,5 головы')
S('Leon looks around', 'CLASS', 'Leon оглядывается; дети за партами пишут и не видят метки.', [], 'Leon крутит головой', 'BG classroom; LEON; KIDS×3; ring')
S('Ms. Park hands', 'CLASS', 'Ms. Park раздаёт листы с тестом, бумага летит на парты.', [], 'листы на парты', 'BG classroom; PARK; LEON; KIDS; papers')
S('Leon writes', 'CLASS', 'Leon за партой пишет с уверенным лицом, лампочка над головой.', [], 'Leon пишет, лампочка', 'BG classroom; LEON; desk; paper')
S('Forty-five minutes', 'CLASS', 'Часы показывают 8:55 → над головой Leon зелёный «+$20,000» всплывает вверх.', [('Plus', 'plus', 'ev', None)], 'зелёное число всплывает', 'BG classroom; LEON; wallClock; plus',
  passport='зелёное число | над головой Leon, поднимается вверх и гаснет | слева направо | зелёное со светом | класс | ≈ 2 головы в ширину')
S('His phone buzzes', 'VOID', 'Телефон крупно: банк «ALERT +$20,000».', [('Bank', 'BANK ALERT', 'cap', None)], 'телефон вибрирует', 'phone')
S("That's almost", 'VOID', 'Телефон слева, справа кубики «4 MONTHS OF PAY» (4 зарплатных конверта), стрелка.', [('four', '≈ 4 MONTHS OF A NORMAL PAYCHECK', 'plate', None)], 'конверты по одному', 'phone; envelopes')
S('Chase leans', 'CLASS', 'Chase перегнулся через проход к Leon, говорит шёпотом.', [('"Did', 'DID YOU JUST WIN THE LOTTERY?', 'say', 'CHASE')], 'Chase наклоняется', 'BG classroom; CHASE; LEON; desks')
S('Leon is ten', 'CLASS', 'Leon растерянно смотрит на зрителя, плечи вверх, вопросительный знак.', [], 'Leon пожимает плечами', 'BG classroom; LEON; qmark')
S('But by Friday', 'VOID', 'Три значка один за другим: гараж, вертолёт, толпа детей с сердечками.', [('Friday,', 'BY FRIDAY', 'cap', None)], 'значки по очереди', 'icons: garage, helicopter, crowd')

# ===== блок 1: правила =====
S('So, what if', 'VOID', 'Leon радуется, над ним название ролика.', [('So,', 'WHAT IF YOUR LIFE WAS LIKE GTA 6?', 'plate', None)], 'название, искры', 'LEON')
S("Here's how it works", 'VOID', 'Доска, Leon показывает указкой; на доске «HOW IT WORKS».', [], 'Leon у доски', 'LEON; board')
S('Rule one', 'VOID', 'Доска «RULE 1»: жёлтый круг с монетой и «MISSION = REAL MONEY».', [('one.', 'RULE 1 · EVERY TASK PAYS', 'plate', None)], 'круг, монеты', 'LEON; board; ring; coins')
S('Rule two', 'VOID', 'Доска «RULE 2»: корзина и стрелка в гараж; из гаража выкатываются машина, лодка, вертолёт значками.', [('two.', 'RULE 2 · BUY IT, GARAGE GETS IT', 'plate', None)], 'значки выезжают', 'LEON; board; icons car/boat/heli')
S('Cars, boats', 'VOID', 'Три значка крупнее: машина, катер, вертолёт.', [], 'значки подпрыгивают', 'icons')
S('Rule three', 'VOID', 'Доска «RULE 3»: полицейская мигалка и звезда.', [('three.', 'RULE 3 · BREAK THE RULES, GET STARS', 'plate', None)], 'мигалка', 'LEON; board; siren; star')
S('Stars appear', 'VOID', 'Leon смотрит в угол, в правом верхнем углу кадра загораются звёзды (1, потом 3).', [('one', 'stars1', 'ev', None), ('more', 'stars3', 'ev', None)], 'звёзды загораются', 'LEON; HUD stars')
S('But you can always', 'VOID', 'Звёзды гаснут по одной, Leon показывает «ok».', [], 'звёзды гаснут', 'LEON; HUD stars')
S('Rule four', 'VOID', 'Доска «RULE 4»: сердце и полоска здоровья над головой человечка.', [('four.', 'RULE 4 · HEALTH BAR', 'plate', None)], 'полоска', 'LEON; board; bar')
S('Drop to zero', 'VOID', 'Полоска падает до нуля, человечек падает; стрелка к больничной кровати, потом кровать с зелёным «100%».', [], 'полоска вниз, кровать', 'bar; bed')
S('Only Leon sees', 'CLASS', 'Leon с HUD (мини-карта в углу, полоска над головой), позади дети ничего не видят.', [], 'Leon оглядывает HUD', 'BG classroom; LEON; KIDS; HUD')
S('Everyone else', 'CLASS', 'Дети смотрят на Leon, над ними облачко-мысль «HE NEVER LOSES».', [('loses.', 'HE NEVER LOSES', 'cap', None)], 'мысли над детьми', 'BG classroom; KIDS×3; LEON; clouds')
S('Day one is done', 'CLASS', 'Leon складывает руки на затылок, довольный, плашка DAY ONE: DONE.', [('Day', 'DAY ONE · DONE', 'cap', None)], 'Leon откидывается', 'BG classroom; LEON')

# ===== блок 2: деньги =====
S('Monday night', 'NIGHT', 'Комната ночью: Leon сидит на кровати с телефоном, на экране $20,000.', [('night,', 'MONDAY NIGHT', 'cap', None)], 'Leon с телефоном', 'BG kitchenNight; LEON; phone')
S('The markers', 'VOID', 'Мини-карта города: десятки жёлтых кружков вспыхивают один за другим.', [], 'кружки на карте', 'minimap; markers')
S('Tuesday, a yellow', 'YARD', 'Газон соседа: жёлтый круг на траве, над ним «MOW IT · $50,000», у Leon газонокосилка.', [('Tuesday,', 'TUESDAY', 'cap', None), ('fifty', '$50,000', 'cap', None)], 'Leon косит, плюс над головой', 'BG yard; LEON; mower; ring; label',
  passport='газонокосилка | на траве, перед Leon | колёса вдоль движения, корпус вперёд | Leon толкает за ручку | — | ≈ 0,5 роста Leon')
S('Wednesday, a package', 'STREET', 'Улица: Leon на велосипеде с коробкой в руках на багажнике; «DELIVER · $120,000» над дорогой впереди.', [('Wednesday,', 'WEDNESDAY', 'cap', None), ('hundred', '$120,000', 'cap', None)], 'велосипед едет слева направо', 'BG street; LEON; bike; box; label')
S("Thursday, a stranger's", 'DOCK', 'Причал, большая белая яхта у борта; Leon со шваброй на палубе; метка «WASH · $300,000».', [('Thursday,', 'THURSDAY', 'cap', None), ('Three', '$300,000', 'cap', None)], 'Leon моет борт', 'BG dock (код); LEON; yacht; mop; label')
S('And Friday, a marker', 'YARD', 'Leon держит поводок; рядом Biscuit; над собакой жёлтый круг с «WALK · 10 MIN · $600,000».', [('Friday,', 'FRIDAY', 'cap', None), ('six', '$600,000', 'cap', None)], 'Leon и Biscuit идут', 'BG yard; LEON; BISCUIT; leash; label',
  passport='Biscuit | на траве слева от Leon, на поводке | вперёд по ходу | идёт | Leon | один размер DOG_S')
S('Nobody asks why', 'STREET', 'Прохожие кивают, у владельцев довольные лица, никто не удивляется.', [], 'прохожие машут', 'BG street; P1; P2; LEON')
S("By Friday night", 'VOID', 'Телефон: приложение банка, цифры бегут до $1,090,000; confetti.', [('million', '$1,090,000', 'plate', None)], 'счёт растёт', 'phone; confetti')
S('A typical full-time', 'VOID', 'Шкала: 1 рабочий человечек с чеками, рядом цифра «≈ 17 YEARS OF PAYCHECKS».', [('seventeen', '≈ 17 YEARS OF PAYCHECKS', 'plate', None)], 'календарные листы летят', 'worker; calendar pages')
S('Leon needed five', 'YARD', 'Leon и Biscuit рядом, оба довольные; плашка «5 DAYS».', [('five', '5 DAYS · 1 VERY GOOD DOG', 'cap', None)], 'Leon гладит Biscuit', 'BG yard; LEON; BISCUIT')
S('He pays off', 'KITCHEN', 'Кухня: Mom сидит на полу с полотенцем, плачет; на столе бумага «MORTGAGE PAID».', [], 'Mom вытирает слёзы', 'BG kitchen; MOM; LEON; paper')
S('Dad gets', 'YARD', 'Перед домом новый пикап, Dad рядом с ключами, сияет.', [], 'Dad крутит ключи', 'BG yard; DAD; truck; LEON',
  passport='пикап | на подъездной дорожке перед домом, носом вправо | носом по дороге | Dad рядом | Leon | пикап больше человека, колёса на земле')
S('Biscuit gets', 'LIVING', 'Гостиная: золотая миска с едой; Biscuit смотрит на неё, наклонив голову.', [], 'Biscuit наклоняет голову', 'BG livingRoom; BISCUIT; gold bowl')
S('Owen asks', 'YARD', 'Owen просит у Leon, Leon достаёт телефон.', [('"hundred', '$100?', 'cap', None)], 'Leon жмёт на телефоне', 'BG yard; OWEN; LEON; phone')
S("Owen doesn't speak", 'YARD', 'Owen застыл с телефоном, над ним «+$10,000»; глаза огромные.', [('minute.', '+$10,000', 'cap', None)], 'Owen замирает', 'BG yard; OWEN; LEON; phone')
S('Money is nice', 'VOID', 'Leon с чемоданом денег пожимает плечами.', [], 'Leon пожимает плечами', 'LEON; cash')
S("But money isn't", 'YARD', 'Забор школы; за забором ребята прижались к сетке и смотрят в сторону дома Leon.', [], 'дети у забора', 'BG yard; KIDS×6; fence')
S('The garage is', 'GARAGE', 'Гараж Leon: ворота открыты, внутри силуэты машин, свет изнутри.', [], 'свет из ворот', 'BG garage; LEON')

# ===== блок 3: машины =====
S('Saturday morning', 'DRIVE', 'Подъездная дорожка: утро; Leon у дома; облачко воздуха «PSSSH», появляется матово-чёрный гиперкар с бантом на крыше.', [('Saturday', 'SATURDAY · 7:00 AM', 'cap', None)], 'гиперкар появляется со вспышкой', 'BG driveway; hypercar; LEON; bow',
  passport='гиперкар | на асфальте подъездной дорожки, носом вправо | колёса вниз | Leon рядом с дверью | Leon, соседи | длина ≈ 3 роста Leon, высота ≈ 0,9 Leon')
S("Leon doesn't read", 'DRIVE', 'Leon бросает инструкцию через плечо и садится в машину.', [], 'бумага летит', 'BG driveway; hypercar; LEON; manual')
S('For scale', 'VOID', 'Спидометр до отметки 304 MPH; подпись «BUGATTI CHIRON · 2019 · 304 MPH».', [('three', '2019 · MODIFIED BUGATTI CHIRON · 304 MPH', 'plate', None)], 'стрелка спидометра идёт', 'gauge')
S("Leon's is not", 'DRIVE', 'Leon хлопает по капоту, с улыбкой смотрит на камеру.', [], 'Leon гладит капот', 'BG driveway; hypercar; LEON')
S('By Sunday', 'DRIVE', 'Дорожка: гиперкар, катер на прицепе рядом, красный вертолёт на лужайке; Leon стоит перед всем.', [('Sunday', 'SUNDAY', 'cap', None)], 'камера отъезжает', 'BG driveway; hypercar; speedboat+trailer; helicopter; LEON; house',
  passport='катер | на прицепе на дорожке, носом вправо | колёса прицепа на асфальте | — | — | длина ≈ 3,5 роста Leon; вертолёт | на лужайке на полозьях, носом влево | лопасти над ним | — | длина ≈ 4 роста Leon')
S('Monday, Leon pulls', 'SCHOOL', 'Школьный двор: гиперкар подъезжает слева направо, Leon в окне с рукой, ребята оборачиваются.', [('Monday,', 'MONDAY', 'cap', None)], 'машина въезжает в кадр', 'BG yard school; hypercar; LEON; KIDS',
  passport='гиперкар | на асфальте двора, носом вправо | вдоль двора | Leon за рулём (окно открыто) | ребята | длина ≈ 3 Leon; ребята на тротуаре')
S('Owen drops', 'SCHOOL', 'Owen роняет рюкзак, Chase роняет бутерброд; оба смотрят на машину.', [], 'рюкзак и бутерброд падают', 'BG yard school; OWEN; CHASE; backpack; sandwich; hypercar')
S('Zoe walks over', 'SCHOOL', 'Zoe подходит к машине, смотрит на неё, потом на Leon; говорит.', [('"Is', 'IS THAT A BUGATTI?', 'say', 'ZOE')], 'Zoe подходит', 'BG yard school; ZOE; LEON; hypercar')
S('"It\'s a gift,"', 'SCHOOL', 'Leon у двери машины говорит, Zoe моргает.', [('"It\'s', 'IT’S A GIFT. FROM ME.', 'say', 'LEON')], 'Leon жестикулирует', 'BG yard school; LEON; ZOE; hypercar')
S('Ms. Park takes', 'SCHOOL', 'Ms. Park снимает машину на телефон; рядом директор в галстуке показывает пальцем на пассажирское сиденье.', [], 'Ms. Park фотографирует', 'BG yard school; PARK; PRINCIPAL; hypercar; phone')
S('And then Leon', 'SCHOOL', 'Leon за рулём, косой взгляд, брови вверх; кадр на ногу не нужен.', [], 'Leon хитро улыбается', 'BG yard school; LEON; hypercar')
S('He presses the gas', 'SCHOOL', 'Машина срывается с места вправо, дым из-под колёс, ребята отшатываются.', [], 'машина уезжает вправо', 'BG yard school; hypercar; KIDS; smoke')

# ===== блок 4: звёзды и погони =====
S('Sirens.', 'SCHOOL', 'Школьный двор; слева въезжает патрульная машина с мигалками; в углу кадра загорается 1 звезда.', [('One', 'stars1', 'ev', None)], 'патруль въезжает, звезда', 'BG yard school; police car; HUD stars=1; hypercar; LEON',
  passport='патрульная машина | на дороге двора, носом вправо | колёса вниз | полицейский за рулём | Leon | длина ≈ 2,5 Leon')
S('Two stars.', 'SCHOOL', 'Вторая патрульная машина присоединяется, 2 звезды.', [('Two', 'stars2', 'ev', None)], 'вторая машина', 'BG yard school; 2 police cars; HUD stars=2')
S('Three stars', 'SCHOOL', 'Над школой кружит полицейский вертолёт; 3 звезды; ребята на крыльце снимают на телефоны.', [('Three', 'stars3', 'ev', None)], 'вертолёт кружит', 'BG yard school; police helicopter; KIDS×5; phones; HUD stars=3',
  passport='полицейский вертолёт | в воздухе над школой, носом влево, лопасти крутятся | — | — | ребята смотрят вверх | длина ≈ 3 Leon')
S('Leon grins', 'SCHOOL', 'Leon в машине ухмыляется, в углу 3 звезды.', [], 'Leon ухмыляется', 'BG yard school; hypercar; LEON; HUD stars=3')
S('He cuts through', 'WASH', 'Автомойка: туннель с щётками и пеной; гиперкар заезжает слева и выезжает справа в пене.', [], 'машина проезжает сквозь щётки', 'BG car wash (код); hypercar; LEON; foam; HUD stars=3',
  passport='гиперкар | внутри мойки на полу, носом вправо | колёса вниз | Leon за рулём | — | щётки по бокам, пена')
S('The stars blink', 'WASH', 'Leon в машине надевает синюю кепку (вместо бирюзовой), звёзды мигают.', [], 'кепка меняется', 'BG car wash; LEON; blue cap; HUD stars blink')
S('The cops drive past', 'STREET', 'Патрульная машина медленно едет мимо гиперкара; полицейский смотрит в сторону, Leon в синей кепке смотрит прямо перед собой.', [], 'полиция проезжает', 'BG street; police car; hypercar; LEON blue cap; POLICE')
S('The whole playground', 'SCHOOL', 'Весь двор ликует: ребята прыгают, руки вверх; Leon кланяется на капоте.', [], 'толпа ликует', 'BG yard school; KIDS×8; LEON; hypercar')
S("And that's when", 'SCHOOL', 'Leon достаёт звонящий телефон; на экране «MOM».', [], 'телефон звонит', 'BG yard school; LEON; phone MOM')
S('"Leon. Why is', 'SCHOOL', 'Крупно Leon с телефоном у уха, глаза огромные; над ним пузырь с репликой Mom.', [('"Leon.', 'WHY IS THERE A POLICE HELICOPTER ON OUR STREET, AND WHERE IS DAD’S OTHER CAR?', 'say', 'MOM')], 'Leon морщится', 'BG yard school; LEON; phone')
S('One more star', 'SCHOOL', 'В углу загорается ещё одна звезда, гирлянда из 4 (последняя пульсирует красным).', [('star', 'stars4', 'ev', None)], 'четвёртая звезда', 'BG yard school; LEON; HUD stars=4 pulse')
S('Quick note', 'VOID', 'Карточка «THIS IS A CARTOON. DON’T TRY THIS AT HOME.» на жёлтом фоне.', [('note,', 'THIS IS A CARTOON · DON’T TRY THIS AT HOME', 'plate', None)], 'карточка', 'card')
S('But Leon feels', 'SCHOOL', 'Leon на крыше машины, руки в стороны, ветер; в углу 4 звезды.', [], 'Leon красуется', 'BG yard school; LEON; hypercar')

# ===== блок 5: здоровье и респаун =====
S('Tuesday, the school roof', 'ROOF', 'Школьная крыша, утро; Leon и Owen стоят у парапета.', [('Tuesday,', 'TUESDAY · THE ROOF', 'cap', None)], 'камера панорамой', 'BG roof; LEON; OWEN')
S('Owen leans', 'ROOF', 'Owen перегнулся через парапет спиной к камере говорит Leon.', [('"Bet', 'BET YOU WON’T JUMP.', 'say', 'OWEN')], 'Owen наклоняется', 'BG roof; OWEN; LEON')
S('Leon looks down', 'POOL', 'Вид сверху: пустой осушенный бассейн в голубом кафеле, на дне стрелка вниз.', [], 'камера вниз', 'top view pool (код)')
S('He jumps anyway', 'ROOF', 'Leon прыгает с парапета, Owen охает.', [], 'Leon прыгает', 'BG roof; LEON; OWEN')
S('A bar floats', 'SKYFALL', 'Leon падает в пустой бассейн на фоне неба; над головой полоска здоровья падает 90 → 40 → 3%.', [('ninety,', 'hp90', 'ev', None), ('forty,', 'hp40', 'ev', None), ('three', 'hp3', 'ev', None)], 'полоска падает', 'BG sky; LEON; HUD bar',
  passport='полоска здоровья | над головой Leon (выше кепки, но ниже верха кадра) | растёт слева направо | красная, число % | зритель | ширина ≈ 2,5 головы')
S('Then gray letters', 'SKYFALL', 'Серыми буквами на всё небо: WASTED; экран обесцвечен.', [('Wasted.', 'wasted', 'ev', None)], 'WASTED наезжает', 'BG sky; WASTED')
S('And then, a beeping', 'WARD', 'Палата: белый потолок, кровать, монитор пикает; Leon лежит под одеялом.', [], 'монитор пикает', 'BG ward; LEON; bed; monitor',
  passport='кровать | у стены палаты на полу, изголовье слева | Leon лежит головой на подушке, лицо видно | медсестра справа | Leon | длина ≈ 1,5 роста Leon')
S('His bar is back', 'WARD', 'Над головой Leon полоска снова 100%, зелёная; он садится.', [], 'полоска заполняется', 'BG ward; LEON; bed; HUD bar')
S('The doctor flips', 'WARD', 'Врач листает карту; говорит.', [('"Zero', 'ZERO BROKEN BONES. ZERO. I CHECKED TWICE.', 'say', 'DOCTOR')], 'врач листает', 'BG ward; DOCTOR; LEON; bed; chart')
S('Four minutes.', 'WARD', 'Таймер 4:00 на стене; Leon показывает палец вверх.', [('Four', '4 MINUTES', 'cap', None)], 'таймер', 'BG ward; LEON; wallClock')
S('The bill goes', 'KITCHEN', 'Dad держит счёт на $18,000 за столом, Mom смотрит из-за спины.', [('eighteen', '$18,000', 'cap', None)], 'Dad разворачивает счёт', 'BG kitchen; DAD; MOM; bill')
S('Dad stares', 'KITCHEN', 'Dad смотрит на счёт, потом в окно на новый пикап; говорит.', [('"Worth', 'WORTH IT.', 'say', 'DAD')], 'Dad смотрит в окно', 'BG kitchen; DAD; window; truck')
S('By evening', 'VOID', 'Экран телефона с видео прыжка и счётчиком «7,000,000 VIEWS».', [('million', '7,000,000 VIEWS', 'plate', None)], 'счётчик растёт', 'phone; counter')
S('Leon is the most', 'SCHOOL', 'Leon идёт по двору, ребята расступаются и хлопают.', [], 'Leon шагает, ребята хлопают', 'BG yard school; LEON; KIDS×6')
S('Everybody wants', 'SCHOOL', 'Вокруг Leon дети с блокнотами, некоторые копируют его позу.', [], 'дети копируют позу', 'BG yard school; LEON; KIDS×5; notebooks')
S('Wednesday morning', 'LIVING', 'Гостиная: золотая миска полная; рядом пусто; Leon входит.', [('Wednesday', 'WEDNESDAY MORNING', 'cap', None)], 'Leon оглядывается', 'BG livingRoom; gold bowl; LEON')

# ===== блок 6: поворот =====
S('The back door', 'KITCHEN', 'Задняя дверь приоткрыта, на крючке висит поводок.', [], 'дверь скрипит', 'BG kitchen; door; leash hook')
S('Mom is in', 'KITCHEN', 'Mom с телефоном у уха, Dad за ней с фонариком ищет по углам.', [], 'Mom звонит, Dad ищет', 'BG kitchen; MOM; DAD; phone; flashlight')
S('Leon looks at his bank', 'KITCHEN', 'Leon смотрит на телефон с суммой, потом на пустую миску; над ним облачко «$$$ ≠ BISCUIT».', [('dog.', 'NONE OF IT CAN FIND ONE SMALL DOG', 'plate', None)], 'Leon сникает', 'BG kitchen; LEON; phone; bowl')
S("And on Leon's map", 'VOID', 'Мини-карта на весь кадр: красная метка пульсирует далеко за городом.', [], 'метка пульсирует', 'minimap big; red marker')
S('Mission. Rescue', 'VOID', 'Белая надпись: MISSION · RESCUE BISCUIT · REWARD: NONE, красная метка рядом.', [('Mission.', 'label2', 'ev', None)], 'буквы по строкам', 'label; red marker')
S('Leon reads that', 'KITCHEN', 'Leon читает метку над миской, брови вверх.', [], 'Leon читает', 'BG kitchen; LEON; label')
S('Under the marker', 'VOID', 'Под красной меткой слово «RIVAL» красным; метка вздрагивает.', [('Rival.', 'RIVAL', 'cap', None)], 'RIVAL мигает', 'red marker; label rival')
S("Leon doesn't say", 'LIVING', 'Leon без слов хватает кепку с крючка.', [], 'Leon хватает кепку', 'BG livingRoom; LEON')
S('"Leon, where are', 'YARD', 'Mom на крыльце машет, Leon идёт по газону к красному вертолёту.', [('"Leon,', 'LEON, WHERE ARE YOU GOING?', 'say', 'MOM')], 'Leon идёт к вертолёту', 'BG yard; MOM; LEON; helicopter; porch')
S('"To work,"', 'YARD', 'Leon на ходу оборачивается, говорит; вертолёт позади.', [('"To', 'TO WORK.', 'say', 'LEON')], 'Leon оборачивается', 'BG yard; LEON; helicopter; MOM')

# ===== блок 7: большая миссия =====
S('A vest of body armor', 'YARD', 'В руках Leon появляется бронежилет со вспышкой; над полоской здоровья вторая синяя полоска.', [], 'броня появляется', 'BG yard; LEON; vest; HUD armor')
S('The helicopter lifts', 'YARD', 'Вертолёт поднимается над газоном, Leon в кабине, Mom и Dad на крыльце смотрят вверх.', [], 'вертолёт набирает высоту', 'BG yard; helicopter; MOM; DAD',
  passport='вертолёт | сначала на лужайке, потом поднимается | носом вправо | Leon в кабине | Mom, Dad смотрят вверх | длина ≈ 4 Leon')
S('The amusement park', 'PARK', 'Заброшенный парк вечером: колесо обозрения с одним горящим фонарём, ржавые горки; вертолёт Leon подлетает слева.', [], 'камера по парку, вертолёт въезжает', 'BG park evening; helicopter; Ferris wheel; coaster',
  passport='колесо | на земле парка, диаметр ≈ 3,5 роста вертолёта | вертикально | горит один фонарь | Leon смотрит | у подножия ларёк для масштаба')
S('At the very top', 'PARK', 'Крупно колесо: наверху кабинка, в ней мальчик в золотой куртке с Biscuit на коленях.', [], 'камера поднимается к верху колеса', 'BG park; wheel; RIVAL; BISCUIT',
  passport='RIVAL | сидит в кабинке на самом верху, лицо видно | к Leon | держит Biscuit на коленях | Leon | ≈ рост Leon')
S('He has his own', 'PARK', 'Рядом с колесом висит золотой вертолёт соперника, над ним полоска здоровья.', [], 'вертолёт качается', 'BG park; RIVAL; golden helicopter; HUD bar')
S('And he waves', 'PARK', 'RIVAL машет рукой Leon.', [], 'машет', 'BG park; RIVAL; BISCUIT')
S('The chase takes', 'COASTER', 'Горки: вертолёты (красный и золотой) летят между рельсами, золотой впереди.', [], 'погоня между рельсами', 'BG coaster; helicopter red; helicopter gold; rails')
S('Leon dodges', 'COASTER', 'Красный вертолёт уворачивается от рельсов, зацепляет башню и падает.', [], 'вертолёт цепляет и падает', 'BG coaster; helicopter red; tower')
S('Wasted. A white', 'WARD', 'WASTED серым на кадре, потом белый потолок палаты и таймер 4:00.', [('Wasted.', 'wasted', 'ev', None)], 'WASTED → палата', 'BG ward; WASTED; LEON; bed')
S("He's back", 'COASTER', 'Leon снова в вертолёте позади мальчика, тот смотрит назад через плечо.', [], 'Leon догоняет', 'BG coaster; helicopter red; helicopter gold')
S('A second hit', 'COASTER', 'Золотой вертолёт сбивает красный; тот падает; потом снова палата и потолок; Biscuit на заднем плане всё дальше.', [('wasted,', 'wasted', 'ev', None)], 'удар, падение, палата', 'BG coaster; ward; WASTED')
S('On the third try', 'COASTER', 'Leon летит прямо, не уклоняясь, глаза решительные.', [], 'прямой полёт', 'BG coaster; helicopter red; LEON')
S('He hovers', 'PARK', 'Красный вертолёт зависает над колесом, Leon хватает лестницу.', [], 'Leon хватает лестницу', 'BG park; helicopter red; ladder; wheel',
  passport='лестница | свисает с вертолёта вертикально | вниз к кабинке | Leon держится двумя руками | RIVAL смотрит вверх | длина ≈ 2 роста Leon')
S('He lands in the car', 'PARK', 'Leon прыгает в кабинку, забирает Biscuit; соперник сидит напротив и смотрит.', [], 'Leon хватает Biscuit', 'BG park; wheel car; LEON; BISCUIT; RIVAL')
S('"Nice run,"', 'PARK', 'RIVAL улыбается и говорит; Leon держит Biscuit.', [('"Nice', 'NICE RUN. SEE YOU ON THE NEXT MAP.', 'say', 'RIVAL')], 'RIVAL подмигивает', 'BG park; wheel car; RIVAL; LEON; BISCUIT')
S('Then his bar', 'PARK', 'Полоска RIVAL падает в ноль, он рассыпается серыми частицами; колесо замирает.', [], 'RIVAL исчезает', 'BG park; RIVAL; particles; wheel')

# ===== блок 8: финал =====
S('Green letters', 'PARK', 'Зелёные буквы на всё небо: MISSION PASSED · RESPECT +1; Leon держит Biscuit.', [('Green', 'passed', 'ev', None)], 'буквы, искры', 'BG park; LEON; BISCUIT; label passed')
S('Biscuit licks', 'PARK', 'Biscuit лижет Leon в лицо, Leon жмурится от смеха.', [], 'Biscuit лижет', 'BG park; LEON; BISCUIT')
S('Owen asks', 'YARD', 'В кабине вертолёта Owen открывает ящик со снеками, у него глаза-звёзды.', [], 'ящик открывается', 'BG yard; helicopter; OWEN; snacks')
S('The helicopter lands', 'YARD', 'Вертолёт садится на газон; на крыльце Mom со скрещёнными руками.', [], 'вертолёт садится', 'BG yard; helicopter; MOM; LEON; BISCUIT')
S('"Where did you', 'YARD', 'Mom говорит, Leon держит Biscuit.', [('"Where', 'WHERE DID YOU GET A HELICOPTER?', 'say', 'MOM')], 'Mom хмурится', 'BG yard; MOM; LEON; BISCUIT')
S('"A mission, Mom."', 'YARD', 'Leon пожимает плечами.', [('"A', 'A MISSION, MOM.', 'say', 'LEON')], 'Leon пожимает плечами', 'BG yard; LEON; MOM')
S('Dad checks', 'YARD', 'Dad смотрит на новый счёт на телефоне, вздыхает.', [('"Next', 'NEXT TIME, USE THE STAIRS.', 'say', 'DAD')], 'Dad вздыхает', 'BG yard; DAD; phone; LEON')
S('Leon laughs', 'YARD', 'Leon смеётся; вокруг семья, Biscuit, Owen.', [], 'Leon смеётся', 'BG yard; LEON; MOM; DAD; BISCUIT; OWEN')
S('Then the minimap', 'MAPZOOM', 'Мини-карта в круге отъезжает: дом Leon всё меньше, видны другие кварталы.', [], 'карта отъезжает', 'minimap zoom out')
S('And far away', 'MAPZOOM', 'Далеко за горами и океаном мигает новая метка с «???».', [('Three', 'MISSION · ???', 'plate', None)], 'метка мигает', 'minimap; marker ???')
S('So, what would', 'VOID', 'Leon смотрит на зрителя, рядом кнопка SUBSCRIBE и колокольчик; на заднем плане метка.', [('comments,', 'COMMENT BELOW', 'cap', None), ('subscribe,', 'PART 2 IS ON THE MAP', 'plate', None)], 'Leon показывает вниз', 'LEON; subscribe; bell')
