# -*- coding: utf-8 -*-
# Данные раскадровки ролика 10. Сцена = ПЕРВЫЕ СЛОВА (start) до начала следующей сцены (из сценарий-сокращённый.txt).
# S(start, place, visual, texts=(), motion='', assets='', passport=None)
# texts = [(слово-якорь#n, "строка", тип, кто)]; тип: plate | cap | say | card | ev | numon | cloud
SC = []
def S(start, place, visual, texts=(), motion='', assets='', passport=None):
    SC.append(dict(start=start, place=place, visual=visual, texts=list(texts), motion=motion, assets=assets, passport=passport))

# ===== открытие: класс =====
S('Tuesday, second period', 'CLASS', 'Класс Ms. Park: ряды парт, Ms. Park идёт между рядами с пачкой тестов; плашка TUESDAY · 2ND PERIOD. Чисел над головами пока нет.', [('Tuesday,', 'TUESDAY · 2ND PERIOD', 'plate', None)], 'Park идёт, раздаёт листы', 'BG classroom; PARK; CALEB; LEON; OWEN; KIDS×4; desks')
S('She stops at', 'CLASS', 'Park стоит у парты Caleb и улыбается; Caleb сидит ровно, ученики оборачиваются.', [('Perfect', 'Perfect again, Caleb.', 'say', 'PARK'), ('Everyone,', 'Everyone, this is what talent looks like.', 'say', 'PARK')], 'Park жестом хвалит', 'BG classroom; PARK; CALEB; desks')
S('Caleb holds up', 'CLASS', 'Caleb поднимает лист с огромной красной A+; рядом врезка-лист крупно: A+ красным.', [], 'лист поднимается', 'BG classroom; CALEB; sheet A+')
S('Then she reaches', 'CLASS', 'Park молча кладёт лист перед Leon, Leon смотрит на него.', [], 'лист падает на парту', 'BG classroom; PARK; LEON; sheet')
S('A giant red', 'CLASS', 'Leon смотрит вниз: на листе огромная красная F; врезка-лист крупно.', [], 'лист F, Leon мрачнеет', 'BG classroom; LEON; sheet F')
S('Somebody in the', 'CLASS', 'Задняя парта: ученик шепчет, остальные оборачиваются на Leon.', [('Ouch.', 'Ouch.', 'say', 'KID2')], 'шёпот', 'BG classroom; KIDS×3; LEON')
S('Leon looks at', 'CLASS', 'Leon поворачивает голову к Caleb; над Caleb загорается красное «70», как неоновая вывеска; числа появляются над всеми.', [('Floating', '', 'numon', None)], 'число 70 вспыхивает', 'BG classroom; LEON; CALEB; numbers',
  passport='число над Caleb | над макушкой, центр над головой, не закрывает глаза | к зрителю | светится красным | Leon смотрит | ≈ 1/3 роста человека')
S('Leon turns to', 'CLASS', 'Leon подходит к окну класса; в стекле его отражение, над отражением зелёное «160» (читается не зеркально).', [], 'Leon поворачивается к окну', 'BG classroom; window pane; LEON; reflection',
  passport='окно | стеклянная панель в классе, Leon стоит у окна лицом к стеклу | к зрителю | отражение Leon с числом | Owen смотрит | выше головы Leon\nотражение | в стекле, число не отзеркалено | к зрителю | — | зритель | 1:1 с Leon')
S('One hundred and', 'CLASS', 'Крупно окно: отражение Leon и большое зелёное «160».', [], 'число пульсирует', 'BG classroom; window reflection; numText 160')
S('Owen leans over', 'CLASS', 'Owen наклоняется к Leon, Leon стоит у окна и смотрит в стекло.', [('"Why', 'Why are you staring at the window?', 'say', 'OWEN')], 'Owen наклоняется', 'BG classroom; OWEN; LEON; numbers')
S('"Owen," says Leon', 'CLASS', 'Leon поворачивается к Owen и говорит с важным видом.', [('"Owen,"', 'Owen, I\'m a genius.', 'say', 'LEON')], 'Leon выпрямляется', 'BG classroom; OWEN; LEON; numbers')
S('Owen glances at', 'CLASS', 'Owen смотрит на лист с F на парте Leon, скептически.', [('"Sure', 'Sure you are.', 'say', 'OWEN')], 'взгляд на лист F', 'BG classroom; OWEN; LEON; sheet F')
S('So, what if', 'CLASS', 'Класс целиком: у каждого над головой число; плашка WHAT IF YOU COULD SEE EVERYONE\'S IQ?', [('IQ?', 'WHAT IF YOU COULD SEE EVERYONE\'S IQ?', 'plate', None)], 'камера отъезжает, числа мерцают', 'BG classroom; KIDS×8; LEON; numbers')
S('And what happens', 'VOID', 'Схема «против»: слева Leon, над ним 160 (зелёное) и красная F; справа Caleb, над ним 70 (красное) и красная A+; между ними VS.', [('refuse', 'DON\'T AGREE', 'plate', None)], 'листы и числа въезжают', 'BG void; LEON; CALEB; sheets; numbers')

# ===== правила =====
S("Here's how it", 'CLASS', 'Класс: Leon сидит за партой, вокруг у всех числа; плашка RULE 1.', [('one.', 'RULE 1 · ONLY YOU CAN SEE IT', 'plate', None)], 'Leon оглядывается, числа вокруг', 'BG classroom; LEON; KIDS×4; numbers; eye')
S('Rule two.', 'VOID', 'Колокол нормального распределения: центр 100, закрашена полоса 85–115; подпись AVERAGE = 100.', [('two.', 'RULE 2 · A REAL IQ SCORE', 'plate', None), ('hundred', 'AVERAGE = 100', 'cap', None), ('eighty-five', '85–115 · MOST PEOPLE', 'cap', None)], 'кривая рисуется, полоса заливается', 'BG void; bell curve')
S('Rule three.', 'VOID', 'Мозг, секундомер и головоломка-пазл: измеряется только скорость на новой головоломке.', [('three.', 'RULE 3 · ONE THING ONLY', 'plate', None), ('brand-new', 'BRAND-NEW PUZZLES', 'cap', None)], 'пазл вставляется, секундомер тикает', 'BG void; brain; stopwatch; puzzle')
S("It doesn't measure effort.", 'VOID', 'Две карточки: EFFORT и HOMEWORK, поверх каждой красный крест.', [('effort.', 'EFFORT', 'card', None), ('homework.', 'HOMEWORK', 'card', None)], 'крест перечёркивает карточку', 'BG void; cards; red X')
S('And Leon, who', 'CLASS', 'Leon за партой смахивает толстый «MANUAL» в мусорную корзину, довольный.', [], 'книга летит в корзину', 'BG classroom; LEON; manual; bin')
S('All he hears', 'VOID', 'Сетка из тысяч точек-людей: одна светится зелёным «160»; подпись 1 IN 30,000.', [('thirty', '1 IN 30,000', 'plate', None)], 'сетка заполняется, одна точка загорается', 'BG void; personDots; numText 160')
S('Finally, an explanation', 'CLASS', 'Park вздыхает над стопкой тестов, Leon за партой самодовольно кивает.', [], 'Park вздыхает', 'BG classroom; PARK; LEON; numbers')

# ===== утро =====
S('Mom is flipping', 'KITCHEN', 'Кухня: Mom у плиты подбрасывает блин, над ней 104; Leon за столом; плашка THAT MORNING.', [('Mom', 'THAT MORNING', 'plate', None)], 'блин взлетает и падает в сковороду', 'BG kitchen; MOM; LEON; pancake; numbers')
S('Dad is asleep', 'HOME', 'Гостиная: Dad спит на диване под газетой, над ним 109.', [], 'газета поднимается от дыхания', 'BG livingRoom; DAD; sofa; newspaper; numbers')
S('The bus driver', 'BUS', 'Салон автобуса: водитель 101 резко поворачивает, три ребёнка кричат и наклоняются, Leon держится за поручень.', [], 'автобус качается, дети кричат', 'BG bus; DRIVER; KIDS×3; LEON; numbers')
S('In the park', 'PARK', 'Парк: мужчина воюет с огромной бумажной картой, над ним 133; карта побеждает и накрывает его.', [('wins.', 'THE MAP WINS', 'cap', None)], 'карта складывается и накрывает голову', 'BG park; MAPMAN; map; numbers')
S('A street magician', 'PARK', 'Фокусник достаёт монету из уха мальчика, над ним 152, затем роняет колоду, карты разлетаются.', [], 'монета в руке, карты сыплются', 'BG park; MAGICIAN; KID; coin; cards; numbers')
S('And the pizza', 'SHOP', 'Улица: пиццмейкер вешает вывеску, над ним 87; Leon с куском пиццы, довольный.', [], 'вывеска вешается, Leon жуёт', 'BG street; PIZZA; LEON; sign; slice; numbers')
S('So Leon starts', 'VOID', 'Табло очков: BUS DRIVER 101, DAD 109, PIZZA GUY 87 против LEON 160; галочки.', [('score.', 'KEEPING SCORE', 'plate', None)], 'строки табло появляются, Leon выигрывает', 'BG void; scoreboard')
S('Smarter than the pizza', 'SHOP', 'Leon стоит над куском пиццы и качает пальцем: умнее парня, но не умнее пиццы.', [], 'палец качается, пицца сияет', 'BG street; LEON; PIZZA; pizza')
S('Then the bus', 'SHOP', 'Жёлтый автобус подъезжает к школе, Leon выходит; плашка NUMBERS DON\'T TAKE TESTS.', [('tests.', 'NUMBERS DON\'T TAKE TESTS', 'plate', None)], 'автобус подъезжает, двери', 'BG street; bus; LEON; school')

# ===== проблема 1: снобизм =====
S('Problem one.', 'CAFE', 'Столовая: Leon задрал нос, руки скрещены, вокруг дети с числами.', [('one.', 'PROBLEM 1 · THE SNOB', 'plate', None)], 'Leon выпячивает грудь', 'BG cafeteria; LEON; KIDS×4; numbers')
S('At lunch, he', 'CAFE', 'Столовая заполнена: много учеников, у каждого число; один из них выделен кольцом «131»; Leon осматривает зал.', [('Nine', '900 STUDENTS', 'cap', None), ('thirty-one.', 'HIGHEST: 131', 'cap', None)], 'камера плывёт по залу', 'BG cafeteria; KIDS×14; LEON; numbers; ring 131')
S('He is the', 'CAFE', 'Leon шагает с гордо поднятой головой, дети расступаются и смотрят на него.', [], 'шаг с важным видом', 'BG cafeteria; LEON; KIDS×5')
S('Owen says', 'CAFE', 'Owen с учебником показывает на страницу: глава седьмая; Leon на него не смотрит.', [('"Hey,', 'Hey, the test covers chapter seven.', 'say', 'OWEN')], 'Owen тычет в книгу', 'BG cafeteria; OWEN; LEON; book')
S('Leon checks the', 'CAFE', 'Leon поднимает взгляд на число Owen: 97; пренебрежительно отмахивается.', [('"I\'ll', 'I\'ll be fine.', 'say', 'LEON'), ('Ninety-seven.', '97', 'cap', None)], 'взгляд вверх, отмашка', 'BG cafeteria; OWEN; LEON; numbers')
S('A girl asks', 'HALL', 'Коридор: девочка с листом дробей просит помощи; Leon сначала смотрит на её число, потом медленно и покровительственно объясняет, жестикулируя.', [], 'Leon объясняет жестами', 'BG hall; FRACGIRL; LEON; fraction sheet; numbers')
S('Owen notices.', 'HALL', 'Owen стоит сбоку и хмурится, Leon ничего не замечает.', [], 'Owen хмурится', 'BG hall; OWEN; LEON; FRACGIRL')
S('Two weeks later', 'CLASS', 'Leon держит тест с красной F; над ним 160, рядом F; плашка TWO WEEKS LATER.', [('weeks', 'TWO WEEKS LATER', 'plate', None), ('perfect,', '160 · F', 'cap', None)], 'лист дрожит в руках', 'BG classroom; LEON; sheet F; numbers')
S('Meanwhile, every single', 'CLASS', 'Caleb с листом A+ и числом 70; на заднем плане календарь недель, каждая отмечена A+.', [('week,', 'EVERY WEEK · A+', 'cap', None)], 'недели листаются, A+ повторяется', 'BG classroom; CALEB; calendar; numbers')
S("That isn't possible.", 'CLASS', 'Leon щурится на Caleb с лупой-прищуром; облако мысли «CHEATING?».', [('cheating.', 'UNLESS CALEB IS CHEATING', 'cap', None)], 'лупа качается, облако растёт', 'BG classroom; LEON; CALEB; magnifier; cloud')

# ===== проблема 2: тетрадь =====
S('Problem two.', 'HALL', 'Коридор: Leon решительно шагает, плашка PROBLEM 2 · THE NOTEBOOK.', [('two.', 'PROBLEM 2 · THE NOTEBOOK', 'plate', None)], 'Leon идёт решительно', 'BG hall; LEON; numbers')
S('Monday, six-forty', 'HALL', 'Пустой коридор школы: часы показывают 6:40, из двери библиотеки льётся свет; плашка MONDAY · 6:40 AM.', [('Monday,', 'MONDAY · 6:40 AM', 'plate', None)], 'камера к двери библиотеки', 'BG hall; wall clock 6:40; door light')
S('Caleb sits alone', 'LIB', 'Библиотека: Caleb один за столом, стопка карточек и толстая зелёная тетрадь, над ним 70.', [], 'Caleb пишет карточку', 'BG library; CALEB; cards; green notebook; numbers',
  passport='зелёная тетрадь | на столе перед Caleb, открыта | к Caleb | Caleb пишет | Leon позже | ≈ 1/3 роста Caleb\nкарточки | стопкой на столе | вверх | — | — | 1/8 роста Caleb')
S('Leon steps out', 'LIB', 'Leon выходит из-за книжной полки и показывает пальцем на Caleb.', [('"Okay.', 'Okay. How are you cheating?', 'say', 'LEON')], 'Leon выходит из-за полки', 'BG library; shelf; LEON; CALEB')
S("Caleb doesn't even", 'LIB', 'Caleb спокойно смотрит на Leon, не удивлён, говорит ровно.', [('"I\'m', 'I\'m not. And I know my number.', 'say', 'CALEB'), ('They', 'They tested me in third grade. Seventy.', 'say', 'CALEB')], 'Caleb спокойно разводит руками', 'BG library; CALEB; LEON; numbers')
S('Leon opens his', 'LIB', 'Leon открывает рот, из него ничего не выходит: пустой пузырь с точками.', [], 'рот открыт, пузырь «…»', 'BG library; LEON; CALEB; bubble ...')
S('"About two kids', 'VOID', 'Сто точек-детей: две красным, подпись ABOUT 2 IN 100.', [('two', '2 IN 100', 'plate', None)], 'сетка и две красные точки', 'BG void; personDots 100; red 2')
S('"Mom sat quiet', 'LIB', 'Caleb говорит; над ним облако-воспоминание: Mom вручает мальчику зелёную тетрадь.', [], 'облако с Mom и тетрадью', 'BG library; CALEB; cloud MOM notebook')
S('He opens it.', 'VOID', 'Раскрытая зелёная тетрадь крупно: строки с датой, WRONG, RIGHT и WHY; строки подсвечиваются по очереди.', [('date,', 'DATE', 'cap', None), ('wrong', 'WRONG', 'cap', None), ('right', 'RIGHT', 'cap', None), ('why.', 'WHY', 'cap', None)], 'страница листается, строки загораются', 'BG void; notebook open')
S('"Everybody thinks I\'m', 'LIB', 'Caleb говорит; за ним на стене часы 6:40; он уже в школе раньше всех.', [('"Everybody', 'Everybody thinks I\'m gifted. I\'m not.', 'say', 'CALEB'), ('I', 'I just leave earlier.', 'say', 'CALEB')], 'Caleb пожимает плечами', 'BG library; CALEB; clock 6:40; LEON')
S("And here's the", 'VOID', 'Карточка-исследование: 2005, DUCKWORTH & SELIGMAN, 140 восьмиклассников (точки).', [('two', '2005', 'plate', None), ('eighth', '140 EIGHTH GRADERS', 'cap', None)], 'точки заполняют экран', 'BG void; card; personDots 140')
S('Self-discipline predicted', 'VOID', 'Столбчатая диаграмма: высокий столбец SELF-DISCIPLINE, низкий IQ; «>2×».', [('twice', '2×', 'plate', None)], 'столбцы растут', 'BG void; bar chart')

# ===== проблема 3 =====
S('Problem three', 'VOID', 'Лестница: часть ступеней нарисована, остальные пропущены; Leon перепрыгивает через пропуски; плашка PROBLEM 3 · SKIPPED STEPS.', [('three,', 'PROBLEM 3 · SKIPPED STEPS', 'plate', None), ('grade', 'TEACHERS GRADE STEPS', 'cap', None)], 'Leon прыгает через пустые ступени', 'BG void; stairs; LEON; numbers')
S('Leon starts copying', 'CLASS', 'Leon за партой переписывает карточки, как Caleb; рядом стопка.', [], 'рука пишет карточку', 'BG classroom; LEON; cards')
S('A notebook of', 'CLASS', 'Leon открывает тонкую тетрадь: в ней единственная страница с одной строкой.', [('page.', 'ONE PAGE', 'cap', None)], 'тетрадь листается пустыми листами', 'BG classroom; LEON; notebook thin')
S('On the next', 'CLASS', 'Тест крупно: все ответы зелёными галочками, но сверху красная C; Leon сияет, затем замирает.', [('paper', 'C', 'plate', None)], 'галочки вспыхивают, C шлёпается', 'BG classroom; LEON; test sheet C')
S('Park has circled', 'CLASS', 'Крупно лист: «Show work.» обведено красным; Park стоит рядом с красным маркером.', [('"Show', 'SHOW WORK.', 'plate', None)], 'красный круг обводит надпись', 'BG classroom; sheet; PARK; LEON')
S('"It\'s obvious," says', 'CLASS', 'Leon разводит руками: очевидно; Park спокойно отвечает.', [('"It\'s', 'It\'s obvious.', 'say', 'LEON'), ('"Obvious', 'Obvious is not a step.', 'say', 'PARK')], 'Leon разводит руками', 'BG classroom; LEON; PARK')
S('Half credit.', 'CLASS', 'Печать HALF CREDIT на листе Leon.', [('Half', 'HALF CREDIT', 'plate', None)], 'печать бьёт по листу', 'BG classroom; sheet; stamp')
S('Across the aisle,', 'CLASS', 'Caleb выписывает каждую строку, затем проверяет страницу дважды: две галочки.', [('twice.', '✓ ✓', 'cap', None)], 'ручка бежит, две галочки', 'BG classroom; CALEB; LEON; sheet')
S('Leon watches him', 'CLASS', 'Leon смотрит на Caleb; число 70 над Caleb гаснет и исчезает.', [('number', '', 'ev', None)], 'число тускнеет и исчезает', 'BG classroom; LEON; CALEB')
S('He sees a', 'CLASS', 'Caleb сидит один за первой партой, над ним нет числа; часы на стене 6:40.', [], 'часы тикают', 'BG classroom; CALEB; wall clock; desk')
S('Then comes the', 'VOID', 'Плашка THE TERMAN STUDY; на тёмном фоне старая газета «GENIUS STUDY».', [('Then', 'THE TERMAN STUDY', 'plate', None)], 'газета въезжает', 'BG void; newspaper')
S('In nineteen twenty-one', 'VOID', 'Полторы тысячи точек-детей; подпись 1921 · 1,500 CHILDREN WITH HUGE IQS.', [('nineteen', '1921', 'plate', None), ('fifteen', '1,500 KIDS', 'cap', None)], 'точки заполняют экран', 'BG void; personDots 1500')
S('Two kids were', 'VOID', 'Два портрета-стикмена: WILLIAM SHOCKLEY и LUIS ALVAREZ; печать NOT SELECTED.', [('Two', 'NOT SELECTED', 'plate', None)], 'печать на портретах', 'BG void; 2 portraits; stamp')
S('Both of them', 'VOID', 'Две золотые медали NOBEL PRIZE · PHYSICS у тех же портретов.', [('Nobel', 'NOBEL PRIZE · PHYSICS', 'plate', None)], 'медали сияют', 'BG void; 2 portraits; medals')
S('Not one of', 'VOID', 'Полторы тысячи точек без медали, надпись 0 / 1,500.', [('one', '0 / 1,500', 'plate', None)], 'точки гаснут', 'BG void; personDots 1500; 0')
S('Scientists still argue', 'VOID', 'Два стик-учёных спорят у доски со знаком вопроса.', [('proves', '?', 'cap', None)], 'руки спорят', 'BG void; board; 2 scientists')
S('A number can', 'VOID', 'IQ-линейка, которая не достаёт до сердца: число предсказывает многое, но не главное.', [('matters.', 'WHAT MATTERS', 'cap', None)], 'линейка не достаёт', 'BG void; iqRuler; heart')
S("And that's when", 'CLASS', 'Park встаёт у доски и звонит в колокольчик: объявление; Leon и Caleb поднимают головы.', [], 'колокольчик звенит', 'BG classroom; PARK; LEON; CALEB; bell')

# ===== ярмарка =====
S('The science fair.', 'CLASS', 'Park пишет на доске SCIENCE FAIR; плашка.', [('fair.', 'THE SCIENCE FAIR', 'plate', None)], 'мел бежит по доске', 'BG classroom; PARK; board')
S('Every team builds', 'VOID', 'Схема машины Руба Голдберга слева направо: 20 шагов, на конце воздушный шар; подписи 20 STEPS и 1 BALLOON.', [('twenty', '20 STEPS', 'cap', None), ('balloon', '1 BALLOON', 'cap', None)], 'схема рисуется слева направо', 'BG void; machine 20 steps',
  passport='схема машины | вид сбоку, слева направо, 20 ячеек в ряд, шарик справа | вправо | — | зритель | ширина ≈ 90% кадра\nшарик | в правой ячейке, над иглой | вверх | — | — | ≈ 1/5 высоты схемы')
S('It counts for', 'CLASS', 'Круговая диаграмма: 1/3 закрашена, подпись ONE THIRD OF THE GRADE; Leon с листом F потеет.', [('third', 'ONE THIRD OF THE GRADE', 'plate', None)], 'сектор заливается', 'BG classroom; LEON; pie')
S('Ms. Park reads the', 'CLASS', 'Park читает список, Leon и Caleb стоят рядом, переглядываются; над ними числа 160 и 70.', [('"Leon', 'Leon and Caleb.', 'say', 'PARK'), ('"What', 'What could go wrong?', 'say', 'PARK')], 'Park читает вслух', 'BG classroom; PARK; LEON; CALEB; numbers')
S('Leon sketches a', 'CLASS', 'Leon лихорадочно рисует эскиз; на часах бегут 10 минут.', [('ten', '10 MIN', 'cap', None)], 'карандаш рисует, стрелки бегут', 'BG classroom; LEON; desk; sketch; clock')
S('Dominoes, a toy', 'VOID', 'Эскиз: пять значков появляются по очереди: домино, поезд, мышеловка, ведро, вентилятор.', [('Dominoes,', 'DOMINOES', 'cap', None)], 'значки по очереди', 'BG void; sketch; icons×5')
S('"Perfect," he says.', 'CLASS', 'Leon любуется эскизом, большой палец вверх; Caleb держит блокнот.', [], 'Leon показывает большой палец', 'BG classroom; LEON; CALEB; sketch')
S('They test it.', 'CLASS', 'Машина на парте: домино падают, поезд идёт; на шаге 6 всё встаёт; метка STEP 6.', [('six.', 'STEP 6 ✗', 'plate', None)], 'домино падают, мышеловка не срабатывает', 'BG classroom; machine; LEON; CALEB')
S('Caleb writes it', 'CLASS', 'Caleb записывает в зелёную тетрадь RUN 1 · STEP 6.', [], 'ручка пишет строку', 'BG classroom; CALEB; notebook')
S('They test it again', 'CLASS', 'Второй запуск: снова шаг 6; Leon закатывает глаза.', [('again.', 'STEP 6 ✗', 'plate', None)], 'домино падают, снова стоп', 'BG classroom; machine; LEON; CALEB')
S('Third time,', 'CLASS', 'Третий запуск: теперь ломается шаг 9; Leon хватается за голову.', [('nine.', 'STEP 9 ✗', 'plate', None)], 'вентилятор не крутится', 'BG classroom; machine; LEON; CALEB')
S('"This is a', 'CLASS', 'Leon раздражённо отмахивается: пустая трата времени.', [('"This', 'This is a waste of time.', 'say', 'LEON')], 'Leon всплёскивает руками', 'BG classroom; LEON; CALEB')
S('By Thursday,', 'VOID', 'Счётчик запусков растёт до 41, все красные; календарь до четверга; стопка исписанных страниц; подпись 30 DIFFERENT WAYS.', [('forty-one', '41 / 41 FAILED', 'plate', None), ('thirty', '30 DIFFERENT WAYS', 'cap', None)], 'счётчик бежит, стопка растёт', 'BG void; counter; notebook pile')
S('"You\'re not even', 'CLASS', 'Leon возмущённо показывает на машину: вы даже не чините.', [('"You\'re', 'You\'re not even fixing it.', 'say', 'LEON')], 'Leon жестикулирует', 'BG classroom; LEON; CALEB; machine')
S('"I\'m finding where', 'CLASS', 'Caleb спокойно показывает в тетради: находит, где ломается.', [('"I\'m', 'I\'m finding where it breaks.', 'say', 'CALEB'), ('"You', 'You can\'t fix what you haven\'t found.', 'say', 'CALEB')], 'Caleb листает тетрадь', 'BG classroom; CALEB; LEON; notebook')
S('Run forty-two', 'VOID', 'Табло RUN 42; машина готова к запуску.', [('forty-two.', 'RUN 42', 'plate', None)], 'табло загорается', 'BG void; machine; counter')
S('Twenty steps, one', 'CLASS', 'Машина работает целиком: все 20 ячеек по очереди зажигаются, шарик лопается.', [('pop.', 'POP!', 'cap', None)], 'ячейки загораются слева направо, шарик лопается', 'BG classroom; machine; balloon pop')
S('Owen cheers so', 'CLASS', 'Owen радостно вопит; в дверях класса появляется уборщик со шваброй.', [], 'Owen прыгает, уборщик заглядывает', 'BG classroom; OWEN; JANITOR; door')
S('Leon grins.', 'CLASS', 'Leon ухмыляется; над ним мысль: «NEVER BAD · UNTESTED».', [('untested.', 'UNTESTED', 'plate', None)], 'Leon ухмыляется', 'BG classroom; LEON; CALEB')
S('The show is', 'GYM', 'Пустой спортзал: дверь у стены, к двери подходит облако вопроса; плашка NOBODY TESTED THE GYM.', [('gym.', 'NOBODY TESTED THE GYM', 'plate', None)], 'камера к двери, ветер шевелит флаги', 'BG gym; door; ?')

# ===== кульминация: спортзал =====
S('Friday, the school', 'GYM', 'Спортзал: девятьсот зрителей на складных стульях рядами; на переднем плане стол; плашка FRIDAY.', [('Friday,', 'FRIDAY', 'plate', None), ('hundred', '900', 'cap', None)], 'камера плывёт над рядами', 'BG gym; folding chairs; KIDS×20',
  passport='складные стулья | на полу зала рядами, лицом к столу | вправо к столу | зрители сидят | зрители смотрят на стол | сиденье на 65 ед. от пола\nзрители | на стульях, таз над сиденьем | к столу | смотрят | на машину | рост ≈ 0,72 Leon')
S('Owen holds the', 'GYM', 'Длинный стол с машиной (20 шагов) и шариком на дальнем конце; Owen с секундомером, Ms. Park говорит Begin.', [('"Begin."', 'Begin.', 'say', 'PARK')], 'Park поднимает руку', 'BG gym; table; machine; OWEN; PARK; LEON; CALEB; stopwatch',
  passport='стол | на полу, длинный, вдоль кадра | — | на нём машина | зал | ≈ 5 ростов Leon\nмашина | на столе, шаги 1–20 слева направо | вправо | работает | зал, Leon, Caleb | высота ≈ 1/2 роста Leon\nсекундомер | в руке Owen | к Owen | Owen смотрит на него | — | 1/6 роста')
S('Dominoes fall.', 'GYM', 'Машина: домино падают, поезд катится (шаги 1–5 загораются).', [], 'шаги 1–5 по очереди', 'BG gym; table; machine; LEON; CALEB; OWEN')
S('The mousetrap snaps,', 'GYM', 'Мышеловка щёлкает, ведро опрокидывается, вентилятор крутится: шаги 6–11; счётчик 11 OK.', [('eleven', '11 STEPS ✓', 'plate', None)], 'шаги 6–11', 'BG gym; table; machine; LEON; CALEB; OWEN')
S('Then someone opens', 'GYM', 'Боковая дверь зала открывается, в проёме силуэт опоздавшего.', [], 'дверь распахивается', 'BG gym; door open; silhouette',
  passport='дверь | в стене зала справа, на уровне пола, створка открывается внутрь | к залу | человек входит | зрители, Leon | ≈ 2 роста Leon')
S('A draft rolls', 'GYM', 'Линии сквозняка идут от двери через стол; бумажный парус на шаге 12 разворачивается не в ту сторону (красная стрелка).', [('twelve', 'STEP 12', 'plate', None)], 'стрелки сквозняка, парус поворачивается', 'BG gym; table; machine; draft; sail',
  passport='сквозняк | линии/стрелки слева-справа от двери к столу, над столом | к машине | — | — | поперёк кадра\nпарус | на шаге 12, на тележке, поворачивается против цели (красная стрелка вниз-влево) | не к горке | — | Leon | 1/6 роста Leon')
S('Leon sees it', 'GYM', 'Leon в центре кадра, глаза широко; над ним светится зелёное 160; пунктир траектории шарика уходит мимо горки (красный).', [], 'пунктир рисуется мимо горки', 'BG gym; LEON; dotted path miss; numbers')
S('The marble is', 'GYM', 'Крупно машина: шарик скатывается по пунктиру мимо горки; в углу кольцо-таймер 10.', [('ramp.', 'MISS', 'plate', None)], 'таймер 10 бежит', 'BG gym; machine; marble; ring 10')
S('"Caleb! The notebook!', 'GYM', 'Leon кричит Caleb, показывая на тетрадь; Caleb хватает её.', [('"Caleb!', 'Caleb! The notebook! Draft!', 'say', 'LEON')], 'Leon тычет в тетрадь', 'BG gym; LEON; CALEB; notebook')
S('Caleb flips pages', 'GYM', 'Caleb лихорадочно листает зелёную тетрадь, страницы летят.', [], 'страницы мелькают', 'BG gym; CALEB; notebook')
S('"Run nineteen.', 'GYM', 'Caleb показывает Leon страницу; врезка-страница: RUN 19 · DOOR OPEN · STEP 12 FAILS · FIX: COIN ON RAMP.', [('"Run', 'Run nineteen. Door open, step twelve fails.', 'say', 'CALEB'), ('Fix,', 'Fix: a coin on the ramp.', 'say', 'CALEB')], 'страница крупно', 'BG gym; CALEB; LEON; notebook page')
S('"A coin?"', 'GYM', 'Leon недоумевает, Caleb настаивает: монета!', [('"A', 'A coin?', 'say', 'LEON'), ('"A#2', 'A coin!', 'say', 'CALEB')], 'Leon и Caleb жестикулируют', 'BG gym; LEON; CALEB')
S('Owen digs in', 'GYM', 'Owen достаёт четвертак из кармана и бросает через стол; монета летит дугой к Leon.', [], 'монета летит по дуге', 'BG gym; OWEN; LEON; coin arc')
S('Leon catches it,', 'GYM', 'Leon ловит монету и кладёт её на горку; шарик перекатывается через неё в шаг 13.', [], 'монета ложится, шарик катится', 'BG gym; LEON; machine; coin; marble')
S('Fourteen.', 'GYM', 'Шаги 14, 15, 17, 19, 20 загораются один за другим; шарик подбегает к иголке.', [('Fourteen.', '14', 'cap', None), ('Nineteen.', '19', 'cap', None)], 'ячейки загораются', 'BG gym; machine; counter')
S('The balloon explodes,', 'GYM', 'Шарик лопается; весь зал вскакивает со стульев, конфетти и крики.', [('erupts.', '', 'ev', None)], 'шарик лопается, зал вскакивает', 'BG gym; balloon pop; KIDS×20; confetti')
S('Leon turns to', 'GYM', 'Leon поворачивается к Caleb: тот уже пишет в тетради, зал ликует.', [], 'Caleb пишет посреди толпы', 'BG gym; LEON; CALEB; notebook')
S('"What are you', 'GYM', 'Leon спрашивает; Caleb отвечает, не поднимая глаз.', [('"What', 'What are you writing?', 'say', 'LEON'), ('"Run', 'Run forty-three. It worked.', 'say', 'CALEB')], 'Caleb пишет', 'BG gym; LEON; CALEB; notebook')

# ===== развязка и финал =====
S('Ms. Park gives', 'CLASS', 'Park вручает Leon и Caleb лист с оценкой A (не A+); на схеме Leon нет подписей.', [('gives', 'A', 'plate', None)], 'лист передаётся', 'BG classroom; PARK; LEON; CALEB; sheet A; sketch no labels')
S('He says it\'s', 'CLASS', 'Leon говорит «очевидно», затем осознаёт, закрывает рот рукой, глаза видны.', [('"obvious', '', 'ev', None)], 'Leon замирает, понимает', 'BG classroom; LEON; PARK')
S('Afterward, he finds', 'HALL', 'Коридор: Leon подходит к Caleb, смущённо.', [('"I\'m', 'I\'m sorry I called you a cheater.', 'say', 'LEON')], 'Leon подходит', 'BG hall; LEON; CALEB; numbers')
S('"You were wrong.', 'HALL', 'Caleb пожимает плечами, говорит спокойно.', [('"You', 'You were wrong. But you checked. That\'s a start.', 'say', 'CALEB')], 'Caleb спокойно говорит', 'BG hall; CALEB; LEON')
S('Leon looks up', 'HALL', 'Leon смотрит на 70 над Caleb, затем на лист A в своей руке.', [], 'взгляд вверх и вниз', 'BG hall; LEON; CALEB; sheet A; numbers')
S('"Seventy and an', 'HALL', 'Leon говорит; над схемой две пары: 70 + A+, 160 + C.', [('"Seventy', '70 → A+', 'cap', None), ('hundred', '160 → C', 'cap', None)], 'пары чисел и оценок', 'BG hall; LEON; CALEB; tags')
S('"A number tells', 'HALL', 'Leon и Caleb: линия старта и линия «куда придёшь»; Caleb отвечает.', [('"A', 'A number tells you where you start.', 'say', 'LEON'), ('"And', 'And the notebook tells you where you end up.', 'say', 'CALEB')], 'линия старта, линия финиша', 'BG hall; LEON; CALEB; lines')
S('Then something strange', 'CLASS', 'Утро понедельника: Leon входит в класс, смотрит на Caleb и замирает; плашка MONDAY.', [('Monday', 'MONDAY MORNING', 'plate', None)], 'Leon входит и замирает', 'BG classroom; LEON; CALEB; numbers')
S('Seventy-one.', 'CLASS', 'Крупно над Caleb красное «71», мигает; Leon в шоке.', [], 'число 70 меняется на 71', 'BG classroom; LEON; CALEB; numText 71')
S('He checks the', 'CLASS', 'Leon смотрит в окно: отражение с зелёным «159».', [('hundred', '', 'ev', None)], 'число в отражении меняется на 159', 'BG classroom; window reflection; LEON')
S('Numbers are not', 'CLASS', 'Leon в шоке между окном и Caleb; числа над обоими дрожат.', [('move.', 'NUMBERS MOVE', 'plate', None)], 'числа дрожат', 'BG classroom; LEON; CALEB; numbers')
S('So, what would', 'VOID', 'Вопрос зрителю: толпа точек с числами, плашка WHOSE NUMBER WOULD YOU CHECK FIRST?', [('check', 'WHOSE WOULD YOU CHECK FIRST?', 'plate', None)], 'числа мерцают над толпой', 'BG void; crowd; numbers')
S('Tell us in', 'CLASS', 'Leon и Caleb машут зрителю, над обоими числа; подписи COMMENT и SUBSCRIBE.', [('comments,', 'COMMENT', 'cap', None), ('subscribe,', 'SUBSCRIBE', 'cap', None)], 'Leon и Caleb машут', 'BG classroom; LEON; CALEB; numbers')
