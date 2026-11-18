# -*- coding: utf-8 -*-
# Данные раскадровки ролика 08. Сцена = ПЕРВЫЕ СЛОВА (start) до начала следующей сцены (из сценарий-сокращённый.txt).
# S(start, place, visual, texts=(), motion='', assets='', passport=None)
# texts = [(слово-якорь#n, "строка", тип, кто)]; тип: plate | cap | say | card | day | ev (событие для кода, не рисуется само)
SC = []
def S(start, place, visual, texts=(), motion='', assets='', passport=None):
    SC.append(dict(start=start, place=place, visual=visual, texts=list(texts), motion=motion, assets=assets, passport=passport))

# ===== блок 0: кубик в столовой =====
S('Monday, lunch', 'CAFE', 'Столовая в обед: столы, дети с подносами, мусорные баки у стены, над ними полка. Над кадром надпись дня.', [('Monday,', 'DAY 1', 'day', None), ('cafeteria.', 'MONDAY · LUNCH', 'cap', None)], 'дети ходят, камера чуть наезжает', 'BG cafeteria; KIDS×5; trash cans', None)
S('On a shelf', 'CAFE', 'Крупно полка над баками: перемешанный кубик Рубика, три члена клуба смотрят на него снизу.', [('Rubik\'s', 'CUBE CLUB', 'cap', None)], 'кубик качается и блестит', 'BG cafeteria; shelf; cube scrambled; KIDS×3',
  passport='кубик | на полке над мусорными баками, на самой полке (опора) | гранями к зрителю | стоит | члены клуба, Owen | ≈ 1/3 головы Leon\nполка | на стене над баками, ниже верха кадра | вдоль стены | держит кубик | — | ширина ≈ 2 роста')
S('Owen, the club', 'CAFE', 'Owen в очках смотрит на полку и вздыхает облачком; рядом стол клуба.', [], 'Owen вздыхает, облачко', 'BG cafeteria; OWEN; shelf; cube')
S('Two tables away', 'CAFE', 'Leon за столом с подносом: ест тайеры-тоты, бросает один взгляд на кубик и снова на поднос.', [], 'Leon ест, глаза вбок', 'BG cafeteria; LEON; tray; tots; table')
S('He solved it', 'CAFE', 'Облачко-мысль над Leon: собранный кубик с галочкой; Leon смотрит в сторону с невинным лицом.', [], 'облачко с кубиком', 'BG cafeteria; LEON; cloud solved cube')
S('But he can', 'CAFE', 'Leon тянется к кубику рукой по столу и убирает руку: Owen идёт мимо.', [], 'рука тянется и прячется', 'BG cafeteria; LEON; OWEN; tray')
S('"Waiting," Leon', 'CAFE', 'Крупно Leon с одним тайер-тотом у лица, шепчет ему.', [('Waiting,', 'Waiting is the hardest part of being a genius.', 'say', 'LEON')], 'шепчет тоту', 'BG cafeteria; LEON; tater tot')
S('And by Friday', 'VOIDD', 'Тёмный фон, на стене тень мужчины с планшетом; красная плашка FRIDAY; Leon снизу замер.', [('Friday,', 'FRIDAY', 'plate', None)], 'тень растёт', 'BG dark; HALE shadow; LEON')
# ===== блок 1: название =====
S('So, what if', 'VOID', 'Leon по центру, над ним светящаяся бесконечность ∞ с надписью IQ.', [('infinite', 'INFINITE IQ', 'plate', None)], '∞ вращается над головой', 'BG void; LEON; infinity')
S('Quick reality check.', 'VOID', 'Шкала IQ как линейка: от 70 до 160 и красный обрыв; отметка 130 и «TOP 2%».', [('Quick', 'QUICK REALITY CHECK', 'cap', None), ('hundred', 'REAL TESTS END ≈ 160', 'cap', None), ('thirty', '130 = TOP 2 %', 'cap', None)], 'маркер ползёт по шкале', 'BG void; IQ ruler',
  passport='шкала IQ | в плоскости кадра по центру, слева направо | от малого к большому | обрывается на 160 | зритель | ширина ≈ 70 % кадра')
S("Infinite isn't", 'VOID', 'Знак ∞ вылезает за обрыв шкалы и ломает её; Leon смотрит снизу.', [], '∞ пробивает шкалу', 'BG void; IQ ruler broken; infinity; LEON')
S("It's a problem.", 'VOID', 'Leon нервничает, ∞ тяжело висит над головой, пот.', [("problem.", 'IT\'S A PROBLEM', 'cap', None)], 'капля пота', 'BG void; LEON; infinity')
# ===== блок 2: правила =====
S("Here's how it works.", 'CLASS', 'Класс: Leon у парты, перед ним лист, сверху плашка HOW IT WORKS.', [('works.', 'HOW IT WORKS', 'plate', None)], '', 'BG classroom; LEON; desk; paper')
S('Rule one.', 'CLASS', 'Leon зачёркивает свою подпись внизу листа, плашка RULE 1.', [('one.', 'RULE 1 · NEVER SIGN ANYTHING', 'plate', None)], 'ручка зачёркивает подпись', 'BG classroom; LEON; paper; pen')
S('Rule two.', 'CLASS', 'Leon прикрывает лист рукой и локтем, трое ребят вытягивают шеи, плашка RULE 2.', [('two.', 'RULE 2 · NOBODY WATCHES YOU SOLVE', 'plate', None)], 'дети косятся', 'BG classroom; LEON; KIDS×3; paper')
S('Rule three.', 'CLASS', 'Лист в каракулях и зачёркнутых цифрах; Leon нарочно мажет; плашка RULE 3.', [('three.', 'RULE 3 · SOLVE IT UGLY', 'plate', None)], 'каракули растут', 'BG classroom; LEON; paper scribbles')
S('Take the long', 'VOID', 'Схема: прямая линия против кривой зигзага; прямая зачёркнута, зигзаг подписан «LONG WAY».', [('long', 'LONG WAY', 'cap', None)], 'зигзаг рисуется', 'BG void; zigzag path')
S('That last rule', 'VOID', 'Голова Leon сбоку с мозгом; у мозга рычаг «UGLY MODE» стоит на нуле, Leon дёргает безрезультатно.', [('ugly', 'UGLY MODE: NONE', 'cap', None)], 'рычаг не двигается', 'BG void; LEON; brain; lever')
S('It finds the', 'VOID', 'Лабиринт: шарик катится по кратчайшей прямой, как вода в слив; сток в конце.', [], 'шарик летит по прямой', 'BG void; maze; ball; drain')
S("That's your one", 'VOID', 'Leon смотрит с грустью, над ним табличка «ONE FLAW».', [('flaw,', 'ONE FLAW', 'plate', None)], '', 'BG void; LEON')
# ===== блок 3: плюсы и минусы =====
S('Plus, you know', 'CLASS', 'Ms. Park у доски; Leon шевелит губами заранее, Park говорит те же слова позже.', [('Plus,', 'PLUS', 'plate', None), ('early.', 'Open your books.', 'say', 'LEON')], 'Leon опережает на три слова', 'BG classroom; PARK; LEON; board')
S('You win every', 'CLASS', 'Leon и Owen спорят, Leon держит кубок «победитель спора», потом молча отдаёт кубок Owen.', [], 'кубок переходит из рук в руки', 'BG classroom; LEON; OWEN; trophy')
S('Homework takes exactly', 'CLASS', 'Leon за партой одним росчерком закрыл тетрадь; рядом он же завязывает шнурок; плашка «2 SEC».', [('Homework', 'HOMEWORK: 2 SEC', 'cap', None)], 'тетрадь закрывается', 'BG classroom; LEON; desk; notebook')
S('Minus, this semester', 'VOID', 'Три карточки FIXED вылетают друг за другом: таблица, шифр, задача; плашка MINUS.', [('Minus,', 'MINUS', 'plate', None)], 'карточки вылетают', 'BG void; 3 cards')
S('A broken spreadsheet', 'HALL', 'Таблица на экране с красными ячейками; копилка школьного сбора плачет.', [('spreadsheet', 'FUNDRAISER', 'cap', None)], 'ячейки краснеют, потом зеленеют', 'BG hall; spreadsheet; jar')
S('A cipher hidden', 'HALL', 'Библиотечная полка; из книги торчит карточка с шифром; Leon издалека.', [('cipher', 'LIBRARY', 'cap', None)], '', 'BG hall; shelf; cipher card')
S('A math puzzle', 'CLASS', 'Доска с огромной задачей; три учителя чешут головы; ответ написан кем-то под ней.', [], 'учителя чешут головы', 'BG classroom; board; PARK; teachers')
S('No signatures.', 'VOID', 'Три листа в ряд, подписи внизу пустые, над каждым зелёная галочка.', [('signatures.', 'NO SIGNATURES', 'cap', None)], 'листы по очереди', 'BG void; 3 papers')
S('The school paper', 'HALL', 'Zoe с блокнотом ставит на стенд газету с большим заголовком и призраком.', [('Zoe', 'ZOE · SCHOOL PAPER', 'cap', None)], 'газета приклеивается', 'BG hall; ZOE; newspaper stand',
  passport='газета | на стенде у стены, на уровне глаз | лицом к зрителю | приклеивается | Zoe и ребята | ≈ 1,5 головы')
S('Who is the', 'HALL', 'Крупно заголовок газеты «WHO IS THE GHOST?»; Leon у края кадра читает и тихо уходит.', [('Ghost?', 'WHO IS THE GHOST?', 'plate', None)], 'газета трясётся', 'BG hall; newspaper; LEON')
# ===== блок 4: инспектор =====
S('Then this morning', 'OFFICE', 'Кабинет директора: за столом директор, в дверь входит Hale в твидовом пиджаке с планшетом.', [('morning,', 'THIS MORNING', 'cap', None)], 'Hale входит', 'BG principal; PRINCIPAL; HALE; clipboard')
S('Mr. Hale, from', 'OFFICE', 'Hale показывает значок; карточка с его именем.', [('Hale,', 'MR. HALE · STATE TESTING BUREAU', 'plate', None)], '', 'BG principal; HALE; badge')
S('He laid three', 'OFFICE', 'Hale кладёт три листа на стол директора и говорит.', [('said,', 'Whoever did this found the shortest possible way every time. Humans never do.', 'say', 'HALE')], 'листы ложатся', 'BG principal; HALE; PRINCIPAL; 3 papers')
S('He turned to', 'OFFICE', 'Hale поворачивается к директору; директор сглатывает; над Hale два значка-облака: робот и мальчик-прячущийся.', [('machine,', 'It takes either a machine, or a kid who has spent years hiding.', 'say', 'HALE')], 'директор сглатывает', 'BG principal; HALE; PRINCIPAL; robot; hiding kid')
S('He stared at', 'OFFICE', 'Hale крупно смотрит на планшет.', [], 'планшет подрагивает', 'BG principal; HALE; clipboard')
S('"I only know', 'OFFICE', 'Hale поднимает глаза и смотрит прямо вперёд.', [('"I', 'I only know one person who solves like that.', 'say', 'HALE')], 'взгляд на зрителя', 'BG principal; HALE')
S('Five days.', 'VOID', 'Календарь на пять дней, пятница обведена красным.', [('days.', 'FIVE DAYS', 'plate', None)], 'числа зачёркиваются', 'BG void; calendar')
S("And he's not leaving", 'OFFICE', 'Hale садится на стул, ставит планшет на колени; директор вздыхает.', [], 'Hale садится', 'BG principal; HALE; PRINCIPAL; chair')
# ===== блок 5: кубик =====
S('Back to lunch.', 'CAFE', 'Столовая, Leon с подносом идёт к столу.', [('lunch.', 'BACK TO LUNCH', 'cap', None)], 'Leon идёт', 'BG cafeteria; LEON; tray')
S("The cube isn't", 'VOID', 'Кубик на весь кадр, поворачивается; цветные грани перемешаны.', [], 'кубик вращается', 'BG void; cube big')
S("It's the superflip", 'VOID', 'Кубик с развёрткой: все рёбра перевёрнуты стрелками; плашка SUPERFLIP.', [('superflip,', 'SUPERFLIP', 'plate', None), ('move.', 'EVERY SINGLE MOVE', 'cap', None)], 'стрелки на рёбрах', 'BG void; cube; arrows')
S('In twenty ten', 'VOID', 'Календарь 2010 и цифра 20 на фоне кубика; три исследователя с ноутбуком.', [('ten,', '2010', 'plate', None), ('twenty', '20 MOVES OR FEWER', 'cap', None)], 'цифра 20 вырастает', 'BG void; 20; researchers')
S('and Google gave', 'VOID', 'Календарь-лист страниц летит, как лента: годы пролетают; плашка ≈ 35 YEARS OF COMPUTER TIME.', [('thirty-five', '≈ 35 YEARS OF COMPUTER TIME', 'plate', None)], 'листы календаря летят', 'BG void; calendar; computer')
S('The superflip needs', 'VOID', 'Счётчик 20/20 на кубике, замок защёлкивается.', [('twenty.', '20 / 20', 'cap', None)], '', 'BG void; cube; counter')
S('The cafeteria empties.', 'CAFE', 'Столовая пустеет: дети с подносами уходят вправо, остаются Leon и кубик на полке.', [], 'толпа уходит', 'BG cafeteria; KIDS×6; LEON; shelf; cube')
S('Leon picks up', 'CAFE', 'Leon держит поднос перед грудью как щит; кубик спрятан за подносом; справа круглая врезка: пальцы крутят грани.', [('fly.', 'TWENTY TURNS', 'cap', None)], 'грани мелькают во врезке', 'BG cafeteria; LEON; tray; cube; inset',
  passport='кубик | в руках Leon за подносом (виден верхний край), во врезке крупно | гранями к врезке | крутится | никто (столовая пуста) | ≈ 1/3 головы\nподнос | в руках у груди Leon, поднят как щит | широкой стороной к залу | держит двумя руками | зал | ширина ≈ 0,7 роста\nврезка | круг справа сверху от головы, с белой окантовкой | — | — | зритель | диаметр ≈ 1,6 головы\nSuperflip: все 12 рёбер перевёрнуты; собранный кубик — шесть цветных сторон')
S('Twenty turns, in', 'VOID', 'Двойной счётчик: ходы 0→20 и секундомер 0→9,9; плашка.', [('Twenty', '20 TURNS · 9.9 SEC', 'plate', None)], 'счётчики бегут', 'BG void; counter; stopwatch')
S('He sets the solved', 'CAFE', 'Leon кладёт собранный кубик на стул Owen и ставит сверху одного тайер-тота; быстро уходит.', [], 'кубик и тот', 'BG cafeteria; LEON; OWEN chair; cube solved; tot')
S('Owen comes back', 'CAFE', 'Owen возвращается, видит кубик, замирает.', [], 'Owen замирает', 'BG cafeteria; OWEN; chair; cube')
S('He picks it', 'CAFE', 'Owen берёт кубик двумя руками на вытянутых, отклонившись назад, как бомбу.', [], 'Owen отклоняется', 'BG cafeteria; OWEN; cube')
S('"Somebody solved', 'CAFE', 'Owen кричит шёпотом, поднимая кубик над головой.', [('"Somebody', 'Somebody solved the superflip. We tried for four months!', 'say', 'OWEN')], 'кубик над головой', 'BG cafeteria; OWEN; cube')
S('Then he screams', 'CAFE', 'Owen орёт; за ним половина столовой тоже орёт, рты открыты.', [], 'крик, камера трясётся', 'BG cafeteria; OWEN; KIDS×6')
S('Everyone is looking', 'CAFE', 'Все смотрят на кубик в руке Owen: толпа лицом к нему, глаза направлены.', [], 'взгляды на кубик', 'BG cafeteria; OWEN; KIDS×5; cube')
S('Zoe is looking', 'CAFE', 'Zoe одна смотрит на пустой стул Leon с оставленным подносом; все остальные заняты кубиком.', [], 'Zoe поворачивает голову', 'BG cafeteria; ZOE; Leon chair; tray; KIDS far',
  passport='пустой стул | у стола Leon, на полу | к столу | пуст, поднос на столе | Zoe (глаза на него) | размер стула ≈ 0,5 роста')
# ===== блок 6: спортзал =====
S('Tuesday, the gym.', 'GYM', 'Спортзал, класс в ряд, Coach Burke перед ними.', [('Tuesday,', 'DAY 2', 'day', None), ('gym.', 'TUESDAY · GYM', 'cap', None)], '', 'BG gym; BURKE; KIDS×5; LEON')
S('Coach Burke holds', 'GYM', 'Burke поднимает над головой один лист бумаги.', [('Burke', 'Nobody can fold this more than seven times. Go ahead, try.', 'say', 'BURKE')], 'лист в поднятой руке', 'BG gym; BURKE; paper')
S('The whole class', 'GYM', 'Класс мнёт и складывает бумагу, листы летят, дети пыхтят.', [], 'складывают', 'BG gym; KIDS×5; LEON; papers')
S('Fold, fold, fold', 'VOID', 'Стопка бумаги: счётчик сгибов 1…7, на седьмом она становится кирпичом и не гнётся.', [('Fold,', 'FOLD 1', 'cap', None), ('seventh', 'FOLD 7', 'plate', None)], 'стопка растёт в толщину', 'BG void; paper stack; counter',
  passport='стопка бумаги | на столе, толщина растёт от 1 до 7 сгибов | — | сгибается | зритель | кирпич ≈ 1/3 роста Leon')
S('"Told you."', 'GYM', 'Burke скрестил руки, самодовольно.', [('"Told', 'Told you.', 'say', 'BURKE')], 'качает головой', 'BG gym; BURKE; KIDS')
S('That\'s what everyone', 'GYM', 'Все кивают; над классом табличка «7 MAX».', [('believed', '"7 MAX"', 'cap', None)], 'кивают хором', 'BG gym; KIDS×6; BURKE')
S('Until two thousand', 'VOID', 'Девочка-школьница с листом бумаги в руках; рядом календарь 2002 и счётчик сгибов до 12.', [('thousand', '2002', 'plate', None), ('Gallivan,', 'BRITNEY GALLIVAN', 'cap', None), ('twelve', '12 FOLDS', 'plate', None)], 'девочка складывает лист', 'BG void; GIRL; paper; counter')
S('Her answer was', 'STREET', 'Бумажная лента уходит по дороге к горизонту; надпись 1.2 KM; рядом три четверти мили.', [('kilometres', '1.2 KM · ¾ MILE', 'plate', None)], 'лента разворачивается', 'BG street; paper ribbon; GIRL',
  passport='лента бумаги | лежит на дороге вдоль полос, уходит к горизонту | от зрителя вдаль | разворачивается | девочка рядом | ширина узкая, длина до горизонта')
S("Leon doesn't say", 'GYM', 'Leon прикладывает палец к губам: молчит, остальные у мяча.', [], 'палец к губам', 'BG gym; LEON; KIDS far')
S('He just slips', 'GYM', 'Leon засовывает записку в спортивную сумку Owen; Owen стоит спиной.', [], 'записка в сумку', 'BG gym; LEON; OWEN; bag; note',
  passport='сумка | на полу у стены спортзала | — | Leon кладёт записку | Owen спиной | ≈ 0,3 роста')
S('"One point two', 'VOID', 'Крупно записка карандашом: ONE POINT TWO KILOMETRES. ONE DIRECTION ONLY.', [('"One', '1.2 KM · ONE DIRECTION ONLY', 'card', None)], 'записка', 'BG void; note')
S('Owen reads it', 'GYM', 'Owen читает записку, перечитывает и вопит с запиской над головой.', [('"Toilet', 'Toilet paper!', 'say', 'OWEN')], 'Owen вопит', 'BG gym; OWEN; note')
S('By lunch the class', 'GYM', 'Дети тащат рулоны туалетной бумаги, клеят скотчем в длинную полосу вдоль зала.', [('lunch', 'BY LUNCH', 'cap', None)], 'полоса клеится', 'BG gym; KIDS×5; rolls; tape',
  passport='рулон | в руках детей, нижний край на уровне пояса | цилиндр в профиль | тащат | зритель | высота ≈ 1/6 роста\nполоса | на полу зала вдоль, от рулонов к дальней стене | — | клеят скотчем | дети | узкая, длина через весь кадр')
S('The whole school runs', 'HALL', 'Школьный туалет: пустой диспенсер, ребёнок у двери в панике.', [], 'ребёнок мнётся', 'BG hall; KID; dispenser')
S('Three hours later', 'GYM', 'В центре зала огромный бумажный кирпич от рулонов, на нём цифра 12; класс стоит вокруг.', [('twelve', '12 FOLDS', 'plate', None)], 'кирпич', 'BG gym; KIDS×6; giant brick; LEON',
  passport='кирпич | на полу зала по центру | — | сложен 12 раз из склеенных рулонов | класс и Burke | высота ≈ 1,2 роста Leon, ширина 1,8')
S('The gym erupts.', 'GYM', 'Зал ликует: руки вверх, конфетти.', [], 'ликование', 'BG gym; KIDS×6; confetti')
S('Someone hugs', 'GYM', 'Ребёнок обнимает бумажный кирпич, остальные хлопают.', [], 'объятия', 'BG gym; KID; brick')
S('Coach Burke sits', 'GYM', 'Burke садится прямо на пол и качает головой.', [], 'Burke садится', 'BG gym; BURKE sit; brick')
S('The note falls', 'GYM', 'Из кармана Owen выпадает записка; Hale поднимает её двумя пальцами.', [], 'записка падает, Hale поднимает', 'BG gym; OWEN; HALE; note')
S('Pencil, no mistakes', 'VOID', 'Записка крупно: чистые цифры карандашом; на семёрке перекладинка; ни зачёркнутого.', [('mistakes,', 'NO MISTAKES', 'cap', None)], 'цифры загораются по очереди', 'BG void; note')
S('"Whoever wrote this,"', 'GYM', 'Hale тихо говорит, смотрит на записку; сзади класс ликует вдали.', [('"Whoever', 'Whoever wrote this didn\'t try things. They knew.', 'say', 'HALE')], 'тихо', 'BG gym; HALE; note; KIDS far')
# ===== блок 7: город =====
S('Wednesday, the town.', 'STREET', 'Утренняя улица у школы, школа вдали.', [('Wednesday,', 'DAY 3', 'day', None), ('town.', 'WEDNESDAY · THE TOWN', 'cap', None)], '', 'BG street')
S('For ten years', 'STREET', 'Пробка: десятки машин в ряд, водители жмут на гудки.', [('years,', '10 YEARS', 'cap', None)], 'гудки, машины дёргаются', 'BG street; cars×6; DRIVERs',
  passport='машины | на проезжей части, вдоль полос, носом вправо | колёса на асфальте | стоят в пробке | — | длина ≈ 2,5 роста человека\nлюди | водители в окнах, головы целиком внутри окна | — | — | — | —')
S('Four hundred cars', 'STREET', 'Два светофора лицом к лицу «спорят»: нахмуренные лица и красные огни; плашка 400 CARS.', [('Four', '400 CARS', 'plate', None)], 'огни мигают в спор', 'BG street; traffic lights×2; cars')
S('City engineers tried', 'VOID', 'Три чертежа с красными крестами; два инженера в касках пожимают плечами.', [('tried', 'TRY 1  TRY 2  TRY 3', 'cap', None)], 'кресты ставятся', 'BG void; ENG×2; blueprints')
S("Leon's bus", 'BUS', 'Автобус внутри: Leon у окна, за окном стоит пробка; часы показывают +20 MIN.', [('twenty', '+20 MIN', 'cap', None)], 'часы тикают', 'BG bus; LEON; clock; window cars',
  passport='окно автобуса | на стене слева от Leon | — | за ним застывшие машины | Leon | высота ≈ 1,3 роста')
S('So he takes', 'BUS', 'Leon достаёт салфетку и рисует на ней карандашом; лицо сосредоточено.', [], 'карандаш бегает', 'BG bus; LEON; napkin; pencil',
  passport='салфетка | в левой руке Leon на уровне груди, плашмя | рисунком к Leon | рисует карандашом | — | ≈ 0,3 роста')
S('Every light is', 'VOID', 'Вид сверху на дорогу: пять светофоров загораются зелёным по очереди, и точка-машина проезжает без остановок.', [('green', 'GREEN WAVE', 'plate', None)], 'зелёная волна бежит', 'BG void; road top; lights×5; car dot',
  passport='дорога | вид сверху по центру кадра слева направо | — | пять светофоров через равные промежутки | зритель | ширина ≈ 90 % кадра\nмашина-точка | на дороге | вправо | едет с постоянной скоростью в зелёной волне | — | ≈ 1/10 дороги')
S('He folds the', 'HALL', 'Библиотека: Leon опускает сложенную салфетку в ящик с надписью «MAYOR · SUGGESTIONS», оглядывается.', [], 'салфетка в ящик', 'BG hall; LEON; box; napkin',
  passport='ящик | на тумбе у стены библиотеки | щелью к зрителю | принимает салфетку | Leon оглядывается | ≈ 0,5 роста')
S('The mayor reads', 'KITCHEN', 'Мэр за столом на кухне читает салфетку, чашка в руке, брови вверх.', [], 'брови, кофе', 'BG kitchen; MAYOR; napkin; coffee')
S('An engineer checks', 'VOID', 'Инженер у доски с формулами: большая зелёная галочка.', [], 'галочка', 'BG void; ENG; board; check')
S('The city reprograms', 'STREETN', 'Ночью рабочий на лестнице у столба с коробкой светофора; огни последовательно переключаются на зелёный.', [], 'огни бегут', 'BG street night; ENG; ladder; pole; lights',
  passport='столб | на тротуаре у дороги, вертикально | — | на нём коробка светофора | рабочий | высота ≈ 2,8 роста\nлестница | прислонена к столбу, ступни на тротуаре | — | рабочий наверху | — | ≈ 2 роста')
S('Thursday morning, Dad', 'STREET', 'Машина Dad едет по дороге: в переднем окне Dad, в заднем Leon; на каждом перекрёстке загорается зелёный.', [('Thursday', 'DAY 4', 'day', None), ('morning,', 'THURSDAY MORNING', 'cap', None)], 'машина едет вправо', 'BG street; car; DAD; LEON; lights',
  passport='машина | на дороге, носом вправо | вдоль полосы | едет, Dad за рулём, Leon сзади | — | длина ≈ 2,5 роста; головы целиком в окнах')
S('Not once, in', 'STREET', 'Над машиной счётчик STOPS: 0; перекрёсток с зелёным огнём.', [('Not', 'STOPS: 0', 'plate', None)], 'счётчик', 'BG street; car; counter')
S('"It\'s a miracle,"', 'STREET', 'Крупно окно машины: Dad с руками на руле и широко открытыми глазами шепчет.', [('"It\'s', 'It\'s a miracle.', 'say', 'DAD')], 'Dad шепчет', 'BG street; car; DAD')
S('In the back seat', 'STREET', 'Заднее окно: Leon смотрит в сторону с каменным лицом.', [], 'Leon смотрит в окно', 'BG street; car; LEON')
S('By noon, the mayor', 'HALL', 'Мэр за трибуной перед людьми; над ним баннер; он говорит в микрофон.', [('citizen', 'an anonymous citizen with a pencil', 'say', 'MAYOR')], 'аплодисменты', 'BG hall; MAYOR; podium; crowd',
  passport='трибуна | на полу перед людьми | лицом к зрителю | мэр за ней | толпа | ≈ 0,8 роста\nмикрофон | на трибуне, перед ртом мэра | к рту | — | — | ≈ 0,15 роста')
S('Meanwhile, Zoe lays', 'CLASS', 'У Zoe в школьной редакции стол: она кладёт рядом два фото, салфетка и записка.', [], 'фото ложатся', 'BG classroom; ZOE; desk; photos×2')
S('"Same pencil,"', 'CLASS', 'Zoe щурится на оба фото и бормочет.', [('"Same', 'Same pencil.', 'say', 'ZOE')], '', 'BG classroom; ZOE; photos')
S('"Same crossed seven."', 'CLASS', 'Zoe тычет пальцем в семёрку на обоих фото; над семёрками светится одинаковая перекладинка.', [('"Same', 'Same crossed seven.', 'say', 'ZOE')], 'перекладинки светятся', 'BG classroom; ZOE; photos; crossed 7×2')
S('Rule one was', 'CLASS', 'Слева в углу плашка «RULE 1: NEVER SIGN» с галочкой; Zoe в центре.', [('Rule', 'RULE 1: NEVER SIGN', 'cap', None)], '', 'BG classroom; ZOE; photos')
S('But a crossed seven', 'VOIDD', 'Zoe рядом, справа крупная врезка: отпечаток пальца, вместо завитков перечёркнутая семёрка.', [('fingerprint.', 'A FINGERPRINT', 'plate', None)], 'отпечаток светится', 'BG dark; ZOE; fingerprint inset; crossed 7',
  passport='отпечаток | круглая врезка справа сверху, окантовка белая | — | завитки образуют перечёркнутую семёрку | Zoe | диаметр ≈ 2,5 головы\nобщий план | Zoe слева целиком в кадре у стола | к врезке | смотрит | — | ≈ 1,5 s')
# ===== блок 8: башня =====
S('Thursday, midnight', 'TOWERN', 'Старая часовая башня ночью, стрелки на двенадцати, луна. Leon снизу идёт к двери башни.', [('midnight,', 'THURSDAY · MIDNIGHT', 'cap', None)], 'Leon идёт к башне', 'BG tower night; LEON')
S('At the top is', 'TROOM', 'Дверь наверху башни: на раме вырезаны символы шифра; Leon смотрит снизу.', [('cipher', 'CIPHER', 'cap', None)], 'символы мерцают', 'BG tower room; door; cipher frame',
  passport='дверь | в стене справа, ступни на полу | — | рама с вырезанными символами | Leon смотрит | высота ≈ 1,6 роста Leon\nсимволы | вырезаны на раме двери по периметру | — | мерцают | — | ≈ 0,12 роста')
S('Thirty-seven years.', 'TROOM', 'Календарь 1989 переходит в 2026; над ним «37 YEARS».', [('Thirty-seven', '37 YEARS', 'plate', None)], 'календарь листается', 'BG tower room; calendar')
S('A university team', 'TOWERN', 'Три профессора с чемоданами уходят от башни, один роняет блокнот.', [], 'профессоры уходят', 'BG tower night; P1; P3; CTRL; notebook')
S("Leon knows the night", 'VOIDD', 'План башни сверху: пунктирный маршрут сторожа по кругу и секундомер.', [], 'маршрут рисуется', 'BG dark; tower plan; route; stopwatch')
S('Mr. Pike walks', 'TOWERN', 'Pike с фонариком идёт вдоль стены башни; секундомер 3:40 над ним.', [('forty', '3:40', 'plate', None)], 'Pike идёт, таймер', 'BG tower night; PIKE; flashlight; timer',
  passport='фонарик | в руке Pike, на уровне пояса | луч вперёд по ходу | светит | — | ≈ 0,25 роста')
S('Leon slips through', 'CLOCK', 'Leon идёт по балке над часовым залом, руки в стороны; внизу шестерни.', [], 'идёт по балке', 'BG clock inside; LEON; beam',
  passport='балка | горизонтально на уровне 55 % высоты кадра, концы на опорах | вдоль кадра | Leon идёт по ней, ступни на балке | — | толщина ≈ 0,25 роста')
S('He reaches the door', 'TROOM', 'Leon у двери; слева щёлкает фонарик, луч падает на него.', [('clicks', 'CLICK', 'cap', None)], 'луч попадает на Leon', 'BG tower room; LEON; flashlight beam')
S('"Took you long', 'TROOM', 'Zoe выходит из темноты с фонариком и шепчет.', [('"Took', 'Took you long enough.', 'say', 'ZOE')], '', 'BG tower room; ZOE; flashlight; LEON')
S('"I figured the', 'TROOM', 'Zoe продолжает с улыбкой; Leon молчит с вытаращенными глазами.', [('"I', 'I figured the Ghost wouldn\'t miss this.', 'say', 'ZOE')], '', 'BG tower room; ZOE; LEON')
S('"How did you', 'TROOM', 'Leon спрашивает шёпотом.', [('"How', 'How did you find me?', 'say', 'LEON')], '', 'BG tower room; ZOE; LEON')
S('"You cross', 'TROOM', 'Zoe самодовольно; над ней светится перечёркнутая семёрка.', [('"You', 'You cross your sevens.', 'say', 'ZOE')], '', 'BG tower room; ZOE; LEON; crossed 7')
S('Below them, keys', 'TROOM', 'Zoe и Leon прислушиваются, ладонь к уху; внизу слабый звон ключей и тень.', [], 'звон, тени', 'BG tower room; ZOE; LEON')
S('Mr. Pike is early', 'TROOM', 'Луч фонарика Zoe выбивается в проём лестницы; снизу светит луч Pike.', [], 'лучи тянутся', 'BG tower room; ZOE; LEON; beams')
S('She clicks it', 'TROOM', 'Крупно фонарик в руке Zoe: дрожит; палец щёлкает; свет гаснет.', [], 'дрожь, гаснет', 'BG tower room; flashlight; hand; ZOE')
S('They dive into', 'CLOCK', 'Leon и Zoe втискиваются между двумя огромными шестернями; над ними колокол бьёт, звуковые кольца и тряска; они зажимают уши.', [('bell', 'BONG', 'cap', None)], 'колокол бьёт, кольца, тряска', 'BG clock inside; LEON; ZOE; gears×2; bell rings',
  passport='шестерни | две большие в переднем плане, на оси к стене, касаются пола | вращаются | между ними щель по ширине двух героев | Leon, Zoe | диаметр ≈ 2,5 роста героя\nколокол | на балке над головами, подвешен | качается | бьёт | Leon, Zoe зажимают уши | диаметр ≈ 1,6 роста\nLeon и Zoe | в щели между шестернями, ступни на полу, головы целиком | лицом к зрителю | руки на ушах, глаза зажмурены не полностью | — | s≈1.3')
S('Their ears ring', 'CLOCK', 'Герои стоят, у ушей волнистые линии звона; лица обескуражены.', [], 'линии звона', 'BG clock inside; LEON; ZOE; ringing')
S('When the guard', 'TROOM', 'Leon выползает из-за угла, подходит к шифру на раме, считает секунды: 40.', [('forty', '40 SEC', 'plate', None)], 'таймер 0→40', 'BG tower room; LEON; cipher; timer')
S('Zoe writes it', 'TROOM', 'Zoe записывает в блокнот, руки трясутся; Leon шепчет рядом.', [], 'ручка дрожит', 'BG tower room; ZOE; LEON; notebook')
S('The door swings', 'TROOM', 'Дверь открывается наружу с щелчком; свет льётся на героев.', [], 'дверь открывается', 'BG tower room; door; light beam; ZOE; LEON')
S('She turns around.', 'TROOM', 'Zoe поворачивается к Leon, прищурившись.', [], '', 'BG tower room; ZOE; LEON')
S('"You\'re the Ghost."', 'TROOM', 'Zoe указывает на Leon.', [('"You\'re', 'You\'re the Ghost.', 'say', 'ZOE')], 'палец вперёд', 'BG tower room; ZOE; LEON')
S('Leon sighs.', 'TROOM', 'Leon вздыхает, пожимает плечами.', [('"I', 'I prefer guy who really likes puzzles.', 'say', 'LEON')], 'плечи вверх', 'BG tower room; LEON; ZOE')
# ===== блок 9: письмо =====
S('Friday morning, inside', 'TROOM', 'Комната в башне утром: лучи в окне; Leon и Zoe стоят у стола.', [('Friday', 'DAY 5', 'day', None), ('morning,', 'FRIDAY MORNING', 'cap', None)], '', 'BG tower room; LEON; ZOE')
S('A small desk', 'TROOM', 'Крупно стол: пыльная лампа, конверт с надписью 1989.', [('envelope,', '1989', 'cap', None)], 'пыль в луче', 'BG tower room; desk; lamp; envelope',
  passport='конверт | на столе, плашмя | надписью к зрителю | лежит | Leon и Zoe | ≈ 0,25 роста\nстол | в левой части комнаты, ножки на полу | — | на нём лампа и конверт | — | ≈ 0,6 роста')
S('Zoe reads it', 'TROOM', 'Zoe держит открытое письмо двумя руками перед собой, Leon заглядывает.', [], '', 'BG tower room; ZOE; LEON; letter')
S('"To whoever opens', 'VOID', 'Письмо крупно: строки печатаются по очереди.', [('"To', 'To whoever opens this door. I built this lock when I was fourteen, because I was the smartest kid in town, and I was terrified of anyone finding out.', 'card', None)], 'строки печатаются', 'BG void; letter')
S('I figured the', 'VOID', 'Продолжение письма; внизу подпись «Hale».', [('Hale."', 'Hale', 'cap', None)], 'подпись', 'BG void; letter')
S('Behind them, the door', 'TROOM', 'Дверь скрипит; в проёме тёмный силуэт.', [], 'дверь скрипит', 'BG tower room; door; HALE shadow; ZOE; LEON')
S('Mr. Hale stands', 'TROOM', 'Hale стоит в проёме, держит планшет, будто забыл, зачем он.', [], '', 'BG tower room; HALE; clipboard; ZOE; LEON')
S('"Thirty-seven years,"', 'TROOM', 'Hale говорит тихо.', [('"Thirty-seven', 'Thirty-seven years.', 'say', 'HALE')], '', 'BG tower room; HALE')
S('"I\'ve waited thirty-seven', 'TROOM', 'Hale делает шаг; глаза влажные.', [('"I\'ve', 'I\'ve waited thirty-seven years for someone to open that door.', 'say', 'HALE')], 'шаг вперёд', 'BG tower room; HALE; ZOE; LEON')
S("Leon doesn't move.", 'TROOM', 'Leon и Zoe замерли столбом, глаза широко.', [], '', 'BG tower room; ZOE; LEON; HALE')
S('Hale looks at', 'TROOM', 'Hale смотрит на письмо, на Leon; улыбается и рвёт верхний лист планшета.', [], 'лист рвётся', 'BG tower room; HALE; clipboard; page')
S('"I carved that door', 'TROOM', 'Hale с мягкой улыбкой; в облаке над ним молоток и дверь.', [('"I', 'I carved that door myself, one summer, with a hammer and a lot of guilt.', 'say', 'HALE')], '', 'BG tower room; HALE; cloud hammer')
S('"Case closed.', 'TROOM', 'Hale комкает лист и убирает в карман, говорит.', [('"Case', 'Case closed. I\'ll report that there is no Ghost, only a very tired inspector.', 'say', 'HALE')], 'комок в карман', 'BG tower room; HALE; page crumple')
S('He hands Leon', 'TROOM', 'Hale протягивает Leon визитку; Leon берёт двумя руками.', [], 'визитка', 'BG tower room; HALE; LEON; card')
S('"Studies of gifted', 'VOID', 'Диаграмма: ряд подростков, у многих над головой маска «FIT IN».', [('"Studies', 'MANY GIFTED TEENS HIDE IT TO FIT IN', 'plate', None)], 'маски появляются', 'BG void; teens; masks')
S("You're not strange.", 'TROOM', 'Hale тепло говорит Leon; Leon выпрямляется.', [('strange.', "YOU'RE JUST EARLY", 'cap', None)], '', 'BG tower room; HALE; LEON; ZOE')
S("When you're ready", 'TROOM', 'Hale показывает на визитку в руке Leon; в углу плашка CALL.', [('call."', 'CALL', 'cap', None)], '', 'BG tower room; HALE; LEON; card')
S('He walks down', 'TROOM', 'Hale уходит к лестнице за дверью и исчезает; Leon смотрит ему вслед.', [], 'Hale уходит', 'BG tower room; HALE; LEON; ZOE')
S('Zoe gives Leon', 'TROOM', 'Zoe показывает Leon два больших пальца.', [], 'пальцы вверх', 'BG tower room; ZOE; LEON')
S('"Rule two, broken,"', 'TROOM', 'Zoe шепчет с улыбкой, приложив палец к губам.', [('"Rule', 'Rule two, broken, but I\'m keeping the secret.', 'say', 'ZOE')], 'палец к губам', 'BG tower room; ZOE; LEON')
S('Rule one, broken.', 'VOID', 'Три плашки правил вычёркиваются по очереди; третья остаётся, как «NEVER GOT IT RIGHT».', [('one,', 'RULE 1 ✗', 'plate', None), ('two,', 'RULE 2 ✗', 'plate', None), ('three,', 'RULE 3 ?', 'plate', None)], 'вычёркивания', 'BG void; 3 rule plates')
S('So, would you call', 'TROOM', 'Leon с визиткой, телефон в другой руке, палец над кнопкой.', [], 'палец над кнопкой', 'BG tower room; LEON; card; phone')
S('Or would you stay', 'TROOM', 'Leon в простыне-призраке с прорезями для глаз (глаза видны), визитка в руке.', [('Ghost?', 'GHOST?', 'cap', None)], 'простыня колышется', 'BG tower room; LEON ghost sheet; card')
S('Tell us in', 'VOID', 'Облачко комментария с пустым текстом растёт, в углу значок «COMMENTS».', [('comments.', 'COMMENTS', 'cap', None)], '', 'BG void; comment bubble')
S('And if you want', 'VOID', 'Звонящий телефон качается; пальцы-палец лайк и колокольчик подписки.', [('like', 'LIKE', 'cap', None), ('subscribe.', 'SUBSCRIBE', 'cap', None)], 'телефон звонит', 'BG void; phone ring; like; bell')
