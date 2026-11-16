# -*- coding: utf-8 -*-
# Данные раскадровки ролика 06. Сцена задаётся ПЕРВЫМИ СЛОВАМИ (start): текст сцены = от них до начала следующей сцены (берётся из сценарий.txt).
# S(start, place, visual, texts=(), motion='', assets='', passport=None)
#   texts = [(слово-якорь#n, "строка на экране", тип, кто), ...]  тип: plate | cap | say | card | lbl ; кто — тег говорящего для say
# Числа над головами рисуются кодом (синее у Leon, зелёное у остальных, у Walt крупнее), в texts их нет.
SC = []
def S(start, place, visual, texts=(), motion='', assets='', passport=None):
    SC.append(dict(start=start, place=place, visual=visual, texts=list(texts), motion=motion, assets=assets, passport=passport))

# ===== блок 0: крючок =====
S('Tuesday, seven fifty-two', 'STREET', 'Хозяйственный магазин на Maple Street, табличка улицы, утро. Leon бежит к автобусу с рюкзаком.', [('Tuesday,', 'TUESDAY · 7:52 AM', 'cap', None)], 'Leon бежит слева направо', 'BG код: магазин; LEON')
S('Leon is running', 'STREET', 'Leon тормозит у стены магазина: у стены сидит Walt с картонкой и бумажным стаканчиком.', [], 'Leon тормозит', 'LEON; WALT; sign; cup',
  passport='Walt | сидит на тротуаре спиной к стене магазина | лицом к улице | сидит | Leon | взрослый, выше Leon на голову')
S('because a man', 'STREET', 'Крупнее: Walt, картонка «HUNGRY», стаканчик с мелочью, рваная куртка.', [], 'камера наезжает', 'WALT; sign; cup')
S('Leon has exactly', 'STREET', 'Leon достаёт две бумажки по доллару, смотрит на них; над ними «$2».', [('two', '$2 · BUS MONEY', 'cap', None)], 'Leon достаёт деньги', 'LEON; dollars')
S('He drops it', 'STREET', 'Две бумажки падают в стаканчик Walt.', [], 'бумажки летят в стаканчик', 'LEON; WALT; cup; dollars')
S('"Thanks, kid,"', 'STREET', 'Walt поднимает глаза на Leon и благодарит, улыбается.', [('"Thanks,', 'THANKS, KID.', 'say', 'WALT')], 'Walt поднимает голову', 'WALT; LEON')
S("And that's when", 'STREET', 'Leon застыл, глаза вверх: над Walt проявляется светящееся число.', [], 'число проявляется со вспышкой', 'LEON; WALT; number')
S('Six billion, three', 'STREET', 'Крупно: Walt и над ним зелёное светящееся число $6,310,000,000. Leon снизу, смотрит вверх.', [], 'число пульсирует', 'WALT; LEON; number',
  passport='число | в воздухе над головой Walt, не закрывает глаза | читается слева направо | светится зелёным | Leon | крупно, ширина ≈ 2 головы')
S('Leon looks at the torn', 'STREET', 'Рваная куртка Walt: дыра на рукаве, заплатка.', [], 'камера по куртке вниз', 'WALT; jacket')
S('The shoes held', 'STREET', 'Ботинки Walt, обмотанные скотчем.', [], 'крупно ботинки', 'WALT; shoes; tape')
S('Then back at', 'STREET', 'Leon резко смотрит снова вверх, на число, глаза круглые.', [], 'Leon вздрагивает', 'LEON; WALT; number')
S('Then at his own', 'STREET', 'Витрина магазина, в стекле отражение Leon; над его отражением синее число.', [], 'Leon у витрины', 'LEON; window; reflection')
S('Sixty-one thousand', 'STREET', 'Крупно отражение Leon и число $61,400 синим.', [], 'число появляется', 'LEON; number',
  passport='число | над отражением головы Leon | читается слева направо | светится синим | Leon | ≈ 2 головы в ширину')
S('Leon is ten years', 'VOID', 'Табло «MONEY CONTEST»: слева Leon с $61,400, справа Walt с $6,310,000,000 и бумажным стаканчиком; Walt побеждает.', [('ten', 'MONEY CONTEST', 'plate', None)], 'шкалы растут, у Walt гигантская', 'LEON; WALT; scoreboard')
S('How? Leon has', 'STREET', 'Leon пожимает плечами, над головой знак вопроса, Walt позади.', [], 'Leon пожимает плечами', 'LEON; WALT; qmark')
S("But by Saturday", 'VOID', 'Календарь: вторник зачёркнут, обведена суббота; рядом ценник «?».', [('Saturday,', 'BY SATURDAY', 'cap', None)], 'календарь листается', 'calendar; price tag')

# ===== блок 1: правила =====
S('So, what if you', 'VOID', 'Leon радуется, над ним название ролика.', [('So,', 'WHAT IF YOU COULD SEE HOW RICH EVERYONE WILL BECOME?', 'plate', None)], 'название, искры', 'LEON')
S("Here's how it works", 'VOID', 'Доска, Leon показывает на неё указкой; на доске «HOW IT WORKS».', [], 'Leon у доски', 'LEON; board')
S('Rule one', 'VOID', 'Доска «RULE 1»: человек со светящимся числом, подпись «MOST MONEY EVER» со стрелкой на число.', [('one.', 'RULE 1 · THE MOST YOU’LL EVER HAVE', 'plate', None)], 'число над человеком, стрелка', 'LEON; board; person')
S('Rule two', 'VOID', 'Доска «RULE 2»: число над человеком меняется (старое зачёркнуто, новое выше).', [('two.', 'RULE 2 · IT CHANGES', 'plate', None)], 'число меняется', 'LEON; board')
S('A new job', 'VOID', 'Три значка один за другим: портфель (NEW JOB), развилка (BIG CHOICE), тучка (BAD DAY), над каждым число прыгает.', [('job,', 'NEW JOB', 'cap', None), ('choice,', 'BIG CHOICE', 'cap', None), ('day.', 'ONE BAD DAY', 'cap', None)], 'значки по очереди', 'icons')
S('Rule three', 'VOID', 'Доска «RULE 3»: число, рядом три зачёркнутых слова HOW · WHEN · HAPPY?', [('three.', 'RULE 3 · MONEY, NOTHING ELSE', 'plate', None)], 'слова зачёркиваются по очереди', 'board; number')
S("You can't turn it off", 'VOID', 'Leon трёт глаза, закрывает ладонями: число над соседом всё равно светится.', [], 'Leon жмурится, число светится', 'LEON; person; number')
S('Leon sprints home', 'KITCHEN', 'Leon влетает на кухню, на ходу смотрит на семью.', [], 'Leon вбегает', 'BG kitchen; LEON; MOM; DAD')
S('Mom, two million', 'KITCHEN', 'Mom у плиты, над ней зелёное число $2,300,000.', [], 'число появляется', 'BG kitchen; MOM; LEON; number')
S('Mom drives', 'VOID', 'Старая машина сбоку, окна: три разбиты (заклеены картоном), одно целое с зелёной галочкой.', [('one', 'ONE WORKING WINDOW', 'cap', None)], 'машина слегка трясётся', 'car')
S('Dad, four hundred', 'KITCHEN', 'Dad за столом с газетой, над ним $480,000.', [], 'число появляется', 'BG kitchen; DAD; LEON; number')
S('And Biscuit', 'KITCHEN', 'Biscuit сидит, виляет хвостом, над ним зелёное число $7.', [], 'хвост виляет', 'BG kitchen; BISCUIT; LEON; number')
S('Leon is fairly sure', 'KITCHEN', 'Над Biscuit облачко с большой сосиской, Leon кивает.', [], 'сосиска в облачке', 'BISCUIT; LEON; sausage')
S('Day one.', 'VOID', 'Leon со скрещёнными руками, весёлый, плашка DAY 1.', [('one.', 'DAY 1 · POWER', 'plate', None)], 'плашка', 'LEON')

# ===== блок 2: плюсы =====
S('Plus number one', 'KITCHEN', 'Leon и Mom на кухне.', [('one,', 'PLUS #1 · ALLOWANCE', 'plate', None)], 'плашка', 'BG kitchen; LEON; MOM')
S('Leon looks at', 'KITCHEN', 'Leon смотрит на число Mom, потом на неё; говорит. Mom скрестила руки.', [('"Technically,', 'TECHNICALLY, YOU’LL HAVE TWO MILLION DOLLARS, SO FIVE WON’T MATTER.', 'say', 'LEON')], 'Leon объясняет', 'MOM; LEON; number')
S('Mom hands him', 'KITCHEN', 'Mom протягивает пять долларов и смотрит долгим взглядом (брови вниз, глаза на Leon).', [('five', '$5', 'cap', None)], 'Mom протягивает бумажку', 'MOM; LEON; dollars')
S('Plus number two', 'PARK', 'Парк, ларёк с лимонадом, Leon за прилавком.', [('two,', 'PLUS #2 · LEMONADE', 'plate', None)], 'плашка', 'BG park; LEON; stand')
S('In the park, Leon', 'PARK', 'Очередь из четырёх людей, над каждым число; Leon показывает пальцем на тех, у кого длинное число; у коротких стоит значок «NO».', [('seven', '7+ DIGITS ONLY', 'cap', None)], 'очередь, значки', 'LEON; stand; KIDS×4; numbers')
S('They all tip', 'PARK', 'В банку Leon летят монеты и купюры, покупатели довольны.', [], 'монеты летят', 'LEON; stand; coins; jar')
S('One man gives', 'PARK', 'Мужчина в пиджаке протягивает двадцать и говорит.', [('"Keep', 'KEEP IT. I HAVE A GOOD FEELING ABOUT THIS STAND.', 'say', 'MAN')], 'мужчина кладёт $20', 'MAN; LEON; stand; $20')
S('Plus number three', 'CLASS', 'Класс, Leon у парты, ребята спорят.', [('three,', 'PLUS #3 · GROUP PROJECT', 'plate', None)], 'плашка', 'BG classroom; LEON; KIDS')
S('Everybody fights', 'CLASS', 'Двое тянут к себе Chase и Zoe, за руки; Leon уходит вправо к Owen.', [], 'Chase и Zoe тянут, Leon идёт к Owen', 'CHASE; ZOE; KIDS; LEON; OWEN')
S("Owen's number is", 'GARAGE', 'Гараж: стол с роботом, Owen с отвёрткой, над ним зелёное число $18,400,000; Leon смотрит.', [], 'число появляется, Owen паяет', 'BG код: гараж; OWEN; LEON; robot; number')
S('Owen\'s only question', 'GARAGE', 'Owen хмурится, Leon смотрит на его лоб.', [('"Why', 'WHY ARE YOU STARING AT MY FOREHEAD?', 'say', 'OWEN')], 'Owen отодвигается', 'OWEN; LEON; robot')
S('Plus number four', 'CLASS', 'Класс, на доске «PRESIDENT».', [('four,', 'PLUS #4 · CLASS ELECTION', 'plate', None)], 'плашка', 'BG classroom; LEON; board')
S('Two kids run', 'CLASS', 'Двое кандидатов с плакатами «A» и «B», над ними числа; Leon в зале.', [], 'кандидаты, числа', 'KIDS×2; posters; LEON; numbers')
S('Leon checks', 'CLASS', 'Leon опускает бюллетень в ящик, на листе обведено большее число.', [('recess', 'LONGER RECESS', 'cap', None)], 'бюллетень падает в ящик', 'LEON; box; ballot')
S('Nobody knows', 'PARK', 'Школьный двор: дети радуются длинной перемене, подпись над толпой.', [], 'дети прыгают', 'BG park; KIDS; LEON')
S('But this is money', 'CLASS', 'Leon за партой, перед ним тест с большой красной F, рядом число и вздох.', [('quiz.', 'HISTORY QUIZ: F', 'cap', None)], 'Leon опускает голову', 'LEON; paper')

# ===== блок 3: проблема 1 =====
S('But then you start', 'PARK', 'Leon идёт по улице, хмурится, смотрит на людей.', [('problems.', 'PROBLEMS', 'plate', None)], 'плашка', 'BG park; LEON')
S('Problem one', 'VOID', 'Длинная дорога уходит вдаль, на конце флажок финиша; над флажком светится число.', [('one.', 'PROBLEM 1 · THE FINISH LINE', 'plate', None)], 'дорога', 'road; flag; number')
S('Warren Buffett built', 'VOID', 'Шкала жизни: от 0 до 50 лет маленькая полоска, после 50 длинный столбик; карточка «BUFFETT: 99% AFTER 50».', [('ninety-nine', '99% AFTER HIS 50TH BIRTHDAY', 'card', None), ('Housel,', 'MORGAN HOUSEL', 'lbl', None)], 'столбик растёт', 'chart; card')
S('So Leon watches', 'PARK', 'Старик на скамейке кормит голубей, над ним $9,000,000.', [], 'голуби клюют', 'BG park; OLDMAN; pigeons; LEON; number')
S('then a girl on a skateboard', 'PARK', 'Девочка на скейтборде едет мимо, над ней $2,000.', [], 'девочка проезжает', 'SKATER; LEON; number')
S('The mailman has', 'PARK', 'Почтальон с сумкой, над ним $800,000.', [], 'почтальон идёт', 'MAILMAN; LEON; number')
S('The crossing guard', 'PARK', 'Регулировщик со свистком у перехода, над ним $40.', [], 'свисток', 'GUARD; LEON; number')
S('Is the skateboard', 'PARK', 'Девочка со скейтом, над ней вопросительные знаки; Leon чешет голову.', [], 'знаки вопроса', 'SKATER; LEON; qmark')
S('The number never says', 'VOID', 'Дорога: человечек стоит на середине, над ним «YOU ARE HERE?», число только на дальнем конце.', [('where', 'YOU ARE HERE?', 'cap', None)], 'человечек шагает', 'road; person; flag')

# ===== блок 4: проблема 2 =====
S('Problem two', 'VOID', 'Leon тащит огромный тяжёлый мешок с надписью SECRET.', [('two.', 'PROBLEM 2 · THE SECRET', 'plate', None)], 'мешок тянет вниз', 'LEON; sack')
S('Secrets are heavy', 'VOID', 'Leon сутулится под мешком, пот, ноги подгибаются.', [], 'Leon кряхтит', 'LEON; sack')
S('On Thursday, he tells', 'GARAGE', 'Гараж: Owen с отвёрткой, Leon шепчет ему; подпись THURSDAY.', [('Thursday,', 'THURSDAY', 'cap', None)], 'Leon шепчет', 'BG гараж; OWEN; LEON; robot')
S('"You\'re going to be', 'GARAGE', 'Leon говорит с улыбкой, Owen слушает.', [('"You\'re', 'YOU’RE GOING TO BE RICH. EIGHTEEN MILLION.', 'say', 'LEON')], 'Leon говорит', 'OWEN; LEON; robot; number')
S('Owen puts down', 'GARAGE', 'Owen кладёт отвёртку на стол, поднимает глаза.', [], 'отвёртка ложится', 'OWEN; LEON; robot; screwdriver')
S('"So it\'s already', 'GARAGE', 'Owen разводит руками и спрашивает.', [('"So', 'SO IT’S ALREADY DECIDED? THEN WHY AM I BUILDING THIS?', 'say', 'OWEN')], 'Owen разводит руками', 'OWEN; LEON; robot')
S('He walks home', 'GARAGE', 'Owen уходит влево, робот остался на столе; Leon смотрит вслед.', [], 'Owen уходит', 'OWEN; LEON; robot')
S('Eighteen million. Six', 'GARAGE', 'Крупно Owen, над головой число падает: $18,400,000 → $6,000,000 → $900,000, оно тускнеет.', [], 'число падает', 'OWEN; number',
  passport='число | над головой Owen | падает по этапам | зелёное тускнеет | Leon и зритель | крупно')
S('And this part', 'VOID', 'Плашка THIS PART IS REAL, Leon показывает на неё.', [('real.', 'THIS PART IS REAL', 'plate', None)], 'плашка', 'LEON')
S('In nineteen ninety-eight', 'VOID', 'Карточка исследования: два ряда детей с головоломками, над первым рядом «SMART!», над вторым «HARD WORK!».', [('ninety-eight,', 'MUELLER & DWECK · 1998', 'card', None)], 'дети решают', 'card; KIDS; puzzles')
S('Those kids did worse', 'VOID', 'Два столбика: «SMART!» ниже, «HARD WORK!» выше.', [], 'столбики растут', 'chart')
S("Tell somebody they've", 'GARAGE', 'Owen с кубком в руках и значком стоп: «STOPS PLAYING».', [], 'Owen сидит', 'OWEN; cup; robot')
S('Leon fixes it', 'GARAGE', 'Leon догоняет Owen, руки к нему.', [], 'Leon идёт', 'LEON; OWEN')
S('"I made it up', 'GARAGE', 'Leon извиняется, Owen слушает.', [('"I', 'I MADE IT UP, OWEN. FORGET IT.', 'say', 'LEON')], 'Leon говорит', 'LEON; OWEN')
S('Then he spends two days', 'GARAGE', 'Leon подаёт Owen винты; над Owen число ползёт вверх до $14,000,000.', [('days', '2 DAYS', 'cap', None)], 'число ползёт вверх', 'LEON; OWEN; screws; number')
S('Not all the way', 'GARAGE', 'Число Owen $14,000,000; призрак старого числа $18,400,000 бледный над ним.', [], 'число замирает', 'OWEN; LEON; number')

# ===== блок 5: проблема 3 =====
S('Problem three is', 'NIGHT', 'Ночная комната, Leon сидит на кровати/у стола и не спит, подпись PROBLEM 3.', [('three', 'PROBLEM 3 · THE MAN BY THE STORE', 'plate', None)], 'плашка', 'BG kitchenNight; LEON')
S('The man by the hardware', 'STREET', 'Walt сидит у стены, прохожие идут мимо.', [], 'прохожие проходят', 'BG магазин; WALT; PEOPLE')
S('All week, his number', 'STREET', 'Walt у стены, рядом почтовый ящик; прохожие огибают их обоих; над Walt число не меняется.', [], 'прохожие огибают', 'WALT; mailbox; PEOPLE; number')
S('On one night in January', 'VOID', 'Карточка «JAN 2024 · 770,000 PEOPLE WITHOUT A HOME (USA)»: россыпь точек-человечков.', [('twenty-four,', '770,000 PEOPLE · ONE NIGHT · USA', 'card', None)], 'точки заполняют кадр', 'card; dots')
S('On Friday, Leon sits', 'STREET', 'Leon садится рядом с Walt у стены, подпись FRIDAY.', [('Friday,', 'FRIDAY', 'cap', None)], 'Leon садится', 'WALT; LEON; wall')
S('His name is Walt', 'STREET', 'Крупно лицо Walt с бородой, добрые глаза.', [('Walt.', 'WALT', 'plate', None)], 'камера на лицо', 'WALT')
S('He used to repair', 'VOID', 'Четыре значка по очереди зачёркиваются: лифт, спина, работа, дом.', [('elevators,', 'ELEVATORS', 'cap', None), ('back', 'HIS BACK', 'cap', None), ('job,', 'HIS JOB', 'cap', None), ('apartment.', 'HIS HOME', 'cap', None)], 'значки зачёркиваются', 'icons')
S('From his jacket', 'STREET', 'Walt достаёт из куртки мокрый блокнот; Leon смотрит.', [], 'блокнот появляется', 'WALT; LEON; notebook')
S('A machine that cleans', 'VOID', 'Страница блокнота: ведро, песок, деталь машины, из ведра течёт чистая вода (чертёж).', [], 'чертёж рисуется линиями', 'notebook page')
S('"Works on paper', 'STREET', 'Walt показывает страницу и говорит, Leon слушает.', [('"Works', 'WORKS ON PAPER.', 'say', 'WALT'), ('"Nobody', 'NOBODY EVER READ PAST PAGE TWO.', 'say', 'WALT')], 'Walt показывает блокнот', 'WALT; LEON; notebook')
S('Leon asks why', 'STREET', 'Leon спрашивает, Walt смеётся.', [], 'Walt смеётся', 'WALT; LEON')
S('"Nobody gives a workshop', 'STREET', 'Walt показывает на картонку.', [('"Nobody', 'NOBODY GIVES A WORKSHOP TO A MAN WITH A CARDBOARD SIGN.', 'say', 'WALT')], 'Walt указывает на табличку', 'WALT; LEON; sign')
S('Leon looks up at', 'STREET', 'Leon смотрит на число над Walt, Walt прижимает блокнот к груди.', [], 'число светится', 'LEON; WALT; number')
S("It was never about Walt", 'STREET', 'Число над Walt и от него светящаяся нить к блокноту; блокнот светится.', [('notebook.', 'THE NUMBER LIVES IN THE NOTEBOOK', 'cap', None)], 'нить пульсирует', 'WALT; notebook; number')

# ===== блок 6: поворот, суббота, дождь =====
S('Saturday morning', 'STREET', 'Идёт дождь, улица мокрая, подпись SATURDAY · RAIN.', [('Saturday', 'SATURDAY · RAIN', 'cap', None)], 'дождь', 'BG магазин в дождь; LEON')
S('Leon is carrying', 'STREET', 'Leon бежит под дождём с кувшином лимонада, капли.', [], 'Leon бежит', 'LEON; pitcher; rain')
S('when he spots Walt', 'ALLEY', 'Переулок за магазином: Walt у мусорного бака, держит блокнот над баком; Leon далеко слева на углу.', [], 'камера на Walt', 'BG переулок; WALT; dumpster; LEON; notebook; rain',
  passport='мусорный бак | у стены переулка, на земле | крышка открыта, повёрнута к Walt | Walt держит блокнот над ним | Leon издалека | выше пояса Walt')
S("Above Walt's head", 'ALLEY', 'Над Walt число начинает мигать и трясётся.', [], 'число трясётся', 'WALT; number')
S('Six billion. Four', 'ALLEY', 'Число падает: $6,310,000,000 → $4,000,000,000 → $900,000,000.', [], 'число падает ступенями', 'WALT; number',
  passport='число | над Walt | падает ступенями | зелёное тускнеет | Leon | крупно')
S('Every step toward', 'ALLEY', 'Walt идёт к баку, на каждый шаг справа от числа отваливается нуль и падает вниз.', [], 'нули падают с каждым шагом', 'WALT; dumpster; zeros',
  passport='нули | отрываются от числа и падают на землю | вниз | на каждый шаг Walt | Leon | цифры размером с кулак')
S('Leon drops the pitcher', 'ALLEY', 'Кувшин падает и разбивается, лимонад брызгает; Leon бросается вперёд.', [], 'кувшин падает', 'LEON; pitcher; WALT')
S('"Walt, wait!', 'ALLEY', 'Leon бежит с вытянутой рукой, кричит.', [('"Walt,', 'WALT, WAIT! GIVE ME ONE DAY!', 'say', 'LEON')], 'Leon бежит, брызги', 'LEON; WALT; dumpster; rain')
S('He snatches the notebook', 'ALLEY', 'Рука Leon выхватывает блокнот, Walt ошарашен, блокнот не долетел до бака.', [], 'рывок', 'LEON; WALT; notebook; dumpster')
S('The number stops', 'ALLEY', 'Число над Walt замирает на $300,000,000.', [], 'число замирает', 'WALT; LEON; number')
S('Then Leon sees', 'ALLEY', 'Leon смотрит в лужу: там отражение, над ним $52,000.', [('thousand.', '$61,400 → $52,000', 'cap', None)], 'число меняется', 'LEON; puddle; number')
S('The future where', 'VOID', 'Слева лимонадный ларёк с $61,400, справа лужа и блокнот с $52,000 (меньше).', [], 'две чаши', 'stand; notebook; numbers')
S('Leon decides', 'ALLEY', 'Leon мокрый, улыбается и показывает большой палец; Walt растерян.', [('price.', 'A FAIR PRICE', 'cap', None)], 'Leon поднимает палец', 'LEON; WALT; notebook; rain')

# ===== блок 7: зал кружка =====
S('The only open door', 'GYM', 'Школьный зал, на столах детали роботов, на стене плакат ROBOTICS; Ms. Park с планшетом.', [('Ms.', 'ROBOTICS CLUB', 'cap', None)], 'камера по залу', 'BG gym; PARK; tables')
S('Owen is there', 'GYM', 'Owen у стола с роботом; Leon, Walt вошли в дверь с блокнотом.', [], 'входят', 'OWEN; LEON; WALT; PARK; robot')
S('Ms. Park flips', 'GYM', 'Ms. Park листает блокнот, глаза бегут по строкам.', [], 'страницы листаются', 'PARK; notebook; LEON; WALT')
S('Then she sits down', 'GYM', 'Ms. Park садится на стул, замолкает; остальные притихли.', [], 'Ms. Park садится', 'PARK; chair; notebook; OWEN; LEON; WALT')
S('"Page nine is wrong', 'GYM', 'Ms. Park поднимает палец и говорит.', [('"Page', 'PAGE NINE IS WRONG, BUT IT’S THE BEST WRONG I’VE SEEN IN YEARS.', 'say', 'PARK')], 'Ms. Park указывает', 'PARK; notebook; WALT')
S('Owen finds a bottle', 'GYM', 'На столе бутылка, ведро, песок, кофейный фильтр.', [], 'предметы появляются по одному', 'OWEN; table; bottle; bucket; sand; filter')
S('Walt pours in muddy', 'GYM', 'Walt льёт мутную воду из банки в ведро-фильтр.', [], 'вода льётся', 'WALT; OWEN; PARK; bucket; jar',
  passport='ведро | на столе | отверстие сверху, фильтр внизу | Walt льёт воду сверху, чистая стекает в стакан снизу | Owen, Leon, Park | 1/4 роста человека')
S('Out comes water', 'GYM', 'В стакан течёт прозрачная вода, Owen раздул щёки (забыл дышать).', [], 'вода стекает, Owen щёки', 'OWEN; glass; filter; LEON; PARK; WALT')
S('Walt stares at it', 'GYM', 'Walt смотрит на стакан, глаза блестят.', [], 'Walt не двигается', 'WALT; glass')
S('"Eleven years I carried', 'GYM', 'Walt прижимает блокнот к груди и говорит.', [('"Eleven', 'ELEVEN YEARS I CARRIED THAT NOTEBOOK.', 'say', 'WALT')], 'Walt говорит', 'WALT; notebook; LEON')
S("Leon doesn't tell him", 'GYM', 'Leon молча застёгивает на губах «молнию»; над Walt число видно только Leon.', [], 'Leon застёгивает рот', 'LEON; WALT; number')
S('He just says', 'GYM', 'Leon улыбается и спрашивает.', [('"So,', 'SO, WHAT’S ON PAGE TEN?', 'say', 'LEON')], 'Leon говорит', 'LEON; WALT')
S("And above Walt's head", 'GYM', 'Крупно Walt, над ним число поднимается с $300,000,000 вверх.', [], 'число растёт', 'WALT; number')
S('Six billion, three hundred and', 'GYM', 'Walt, число $6,310,000,000 горит, вокруг искры.', [], 'искры, число пульсирует', 'WALT; number; sparks')
S('The only thing that changed', 'GYM', 'Блокнот лежит открытым на странице три, над ним свет; рядом руки читают.', [('two.', 'READ PAST PAGE TWO', 'plate', None)], 'свет от блокнота', 'notebook; hands')

# ===== блок 8: развязка и крючок =====
S('Leon finally understands', 'GYM', 'Leon задумчиво смотрит на группу, улыбается.', [], 'камера мягко наезжает', 'LEON; WALT; OWEN; PARK')
S('Not a promise', 'VOID', 'Дорога без следов; затем на ней следы одной пары ног, затем второй: «NOBODY WALKED IT YET» → «WALK IT WITH SOMEONE».', [('road', 'A ROAD NOBODY HAS WALKED YET', 'cap', None)], 'следы появляются', 'road; footprints')
S('Walt gets a table', 'GYM', 'Walt за столом кружка, перед ним горячий обед на подносе, Ms. Park рядом говорит.', [('"charity,', 'IT’S NOT CHARITY. IT’S AN INVESTMENT.', 'say', 'PARK')], 'Ms. Park ставит поднос', 'WALT; PARK; tray; table')
S("Owen's number is", 'GYM', 'Owen с отвёрткой, над ним $21,000,000; он не отрывается от робота.', [], 'Owen работает', 'OWEN; robot; number')
S("Biscuit's number", 'LIVING', 'Biscuit с вторым куском сосиски, над ним число $8.', [], 'Biscuit жуёт', 'BG livingRoom; BISCUIT; sausage; number')
S("Leon's own number", 'LIVING', 'Leon у зеркала в гостиной, над головой синее $52,000, он улыбается.', [], 'число в зеркале', 'LEON; mirror; number')
S('Sunday morning', 'BUSSTOP', 'Остановка, на скамейке девочка, Leon подходит; подпись SUNDAY.', [('Sunday', 'SUNDAY MORNING', 'cap', None)], 'Leon подходит', 'BG остановка; LEON; GIRL')
S('She takes out a pen', 'BUSSTOP', 'Девочка достаёт ручку, пишет число на руке, смотрит на воздух над Leon.', [], 'ручка пишет', 'GIRL; LEON; pen')
S('"You can see them', 'BUSSTOP', 'Крупно девочка шепчет, Leon поражён.', [('"You', 'YOU CAN SEE THEM TOO. CAN’T YOU?', 'say', 'GIRL')], 'девочка шепчет', 'GIRL; LEON')
S('So, what would you do', 'VOID', 'Leon обращается к зрителю: над ним знак вопроса; рядом Walt с числом.', [('do?', 'WHAT WOULD YOU DO?', 'plate', None)], 'вопрос', 'LEON; WALT; number')
S('If you saw a number', 'VOID', 'Силуэт прохожего с числом, мимо идёт тень.', [('past?', 'WOULD YOU WALK PAST?', 'cap', None)], 'тень проходит мимо', 'figure; number')
S('Tell us in', 'VOID', 'Значок комментариев, Leon указывает на него.', [('comments.', 'TELL US IN THE COMMENTS', 'cap', None)], 'Leon указывает', 'LEON; comment icon')
S('And subscribe', 'VOID', 'Кнопка SUBSCRIBE нажимается; рядом девочка с числом на руке.', [('subscribe', 'SUBSCRIBE · PART 2', 'plate', None)], 'кнопка нажимается', 'LEON; button')
S('because that girl', 'BUSSTOP', 'Девочка смотрит на камеру, Leon не замечает; над Leon число мерцает.', [], 'число Leon мерцает', 'GIRL; LEON; number')
