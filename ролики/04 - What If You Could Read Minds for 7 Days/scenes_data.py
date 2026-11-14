# -*- coding: utf-8 -*-
# Данные раскадровки ролика 04. Текст каждой сцены = подряд идущие слова сценарий.txt (проверяется build_storyboard.py).
# S(text, place, visual, texts, motion, assets, day=None, cut=None, passport=None)
#   texts  = [(слово-якорь, "строка на экране", "тип"), ...]  якорь: слово из текста сцены (#2 = второе вхождение)
#   cut    = буква сокращения (см. CUTS в build_storyboard.py); сцены с буквой выпадают, если сокращение включено
#   day    = номер дня, с этой сцены счётчик DAY меняется
SC = []
def S(text, place, visual, texts=(), motion='', assets='', day=None, cut=None, passport=None, hud=None):
    SC.append(dict(text=' '.join(text.split()), place=place, visual=visual, texts=list(texts), motion=motion,
                   assets=assets, day=day, cut=cut, passport=passport, hud=hud))

# ============================ ХУК (понедельник, коридор) ============================
S('''Monday morning, five past eight, the school hallway.''', 'HALL',
  'Школьный коридор, общий план в полную ширину: у шкафчиков, у окна и у двери кабинета 8–10 детей. Слева в кадр входит Leon с рюкзаком, идёт вправо. У всех детей над головой ничего нет, пока диктор не заговорит об облаках.',
  [('Monday', 'MONDAY · 8:05 AM', 'подпись в углу')], 'панорама слева направо за Leon, дети двигаются в толпе',
  'BG hall; LEON; CROWD; ROCCO; CHASE; ZOE (вдали)',
  passport='''Коридор (hall.png): пол плиточный, шкафчики синие по центру, двери с окнами по краям. Дети стоят на плитках, ничто не висит в воздухе. Leon идёт вдоль шкафчиков (спиной к ним нельзя, он идёт лицом по ходу). Rocco самый большой (масштаб 1.42 от обычного ребёнка), стоит справа у двери; Chase с мячом у шкафчиков в центре. Облака появляются позже, над головами, ярусами.''')
S('''Above the toughest kid in school, Rocco, floats a small cloud.''', 'HALL',
  'Rocco крупнее всех, широкие плечи, пурпурная худи, руки скрещены, мрачный взгляд (глаза видны). Над его головой с хлопком «пуф» вырастает маленькая облачко-мысль с цепочкой кружков от головы (пока пустое, три точки). Leon справа внизу смотрит на облако.',
  [('cloud', '· · ·', 'облако ROCCO, ярус 1')], 'облако надувается с пружинкой, три точки мигают', 'BG hall; ROCCO; LEON; CLOUD', hud=None)
S('''It says, "Please let Leon be my friend."''', 'HALL',
  'То же место, облако Rocco раскрылось на ширину текста. Rocco всё так же сердито стоит. Leon открывает рот от удивления («шок»), глаза направлены на облако.',
  [('Please', 'PLEASE LET LEON BE MY FRIEND.', 'облако ROCCO, ярус 1')], 'текст печатается по словам диктора; Leon: пауза, брови вверх', 'BG hall; ROCCO; LEON; CLOUD')
S('''Above Chase, the captain of the dodgeball team: "Does anyone actually like me?"''', 'HALL',
  'Кадр шире: слева Rocco с облаком (ярус 1), справа Chase (синяя форма с номером 7, мяч под мышкой, уверенная поза). Над Chase облако выше облака Rocco (ярус 2): «DOES ANYONE ACTUALLY LIKE ME?». Облака не перекрываются: одно ниже, другое выше и сдвинуто в сторону.',
  [('Does', 'DOES ANYONE ACTUALLY LIKE ME?', 'облако CHASE, ярус 2')], 'камера отъезжает, второе облако выпрыгивает на ярус выше', 'BG hall; ROCCO; CHASE; LEON; CLOUDS',
  passport='''Облака: Rocco ярус 1 (низко, над макушкой), Chase ярус 2 (выше и правее). Над Leon облака нет. Оба облака целиком в кадре, лица не закрывают.''')
S('''Then Zoe walks past.''', 'HALL',
  'Справа в кадр входит Zoe (длинные тёмные волосы, жёлтый свитер, сумка через плечо), идёт мимо шкафчиков вдоль коридора. Leon в центре поворачивает голову за ней.',
  [], 'Zoe проходит справа налево (лицом по ходу), Leon провожает взглядом', 'BG hall; ZOE; LEON; ROCCO; CHASE')
S('''Zoe, the girl Leon has been trying not to look at since September.''', 'HALL',
  'Leon изо всех сил смотрит на шкафчики, но глаза косятся на Zoe; на заднем плане календарь с листом «SEPTEMBER», который отлистывается к «MONDAY».',
  [('September', 'SINCE SEPTEMBER', 'подпись')], 'глаза Leon скользят туда-сюда, пот со лба', 'BG hall; LEON; ZOE; PROP calendar')
S('''Her cloud says, "Don't look at him. Look at him. Don't."''', 'HALL',
  'Крупный план Zoe по плечи, над ней облако (ярус 1), текст меняется три раза: DON\'T LOOK AT HIM. → LOOK AT HIM. → DON\'T. Zoe украдкой смотрит в сторону Leon (глаза видны).',
  [('Don\'t', 'DON\'T LOOK AT HIM.', 'облако ZOE, ярус 1'), ('look#2', 'LOOK AT HIM.', 'облако ZOE, ярус 1'), ('Don\'t."#2', 'DON\'T.', 'облако ZOE, ярус 1')],
  'облако дрожит и меняет текст ровно на словах диктора', 'BG hall; ZOE; CLOUD')
S('''Leon stops walking, and a kid crashes into his backpack. He doesn't even notice.''', 'HALL',
  'Leon замирает посреди коридора лицом к Zoe, малыш с портфелем врезается в рюкзак Leon сзади и отскакивает на пол (звёздочки). Leon не моргает.',
  [], 'удар в рюкзак, Leon чуть качнулся и всё равно смотрит вперёд', 'BG hall; LEON; KID; ZOE')
S('''That's Monday.''', 'HALL',
  'Leon по центру крупнее, по краям кадра виньетка; стрелка календаря: MON подчёркнуто.',
  [('Monday.', 'MONDAY', 'плашка')], 'виньетка сжимается', 'BG hall; LEON; PROP calendar', )
S('''By Sunday, he'll know three things:''', 'VOID',
  'Светлый void-фон. Leon справа смотрит на пустую доску слева, на доске появляется заголовок «BY SUNDAY».',
  [('Sunday,', 'BY SUNDAY', 'плашка')], 'доска выезжает слева', 'LEON; PROP board')
S('''whether Zoe likes him,''', 'VOID',
  'Карточка 1 выезжает на доску: большое сердце, Zoe в рамке с вопросительным знаком.',
  [('whether', '1  DOES ZOE LIKE HIM?', 'карточка')], 'карточка влетает с отскоком', 'LEON; ZOE; PROP card heart')
S('''how to become the coolest kid in school,''', 'VOID',
  'Карточка 2: корона и значок «COOL» над стулом во главе стола.',
  [('become', '2  THE COOLEST KID IN SCHOOL', 'карточка')], 'карточка влетает, корона качается', 'LEON; PROP card crown')
S('''and what his dad really thinks of him.''', 'VOID',
  'Карточка 3: силуэт Dad с пустой тёмной мысленной тучкой над головой и «?» внутри.',
  [('dad', '3  WHAT DAD REALLY THINKS', 'карточка')], 'карточка влетает, вопрос в облаке мигает', 'LEON; DAD; PROP card cloud')
S('''So, what if you could read minds for seven days?''', 'VOID',
  'Название ролика. Leon в центре смотрит прямо на зрителя, вокруг в воздухе плавают пустые облака разных размеров и ярусов (все лёгкие, как пузыри).',
  [('what', 'WHAT IF YOU COULD READ MINDS FOR 7 DAYS?', 'название')], 'облака лениво плывут вверх, название набирается по словам', 'LEON; PROP clouds')
S('''Every morning, a small cloud floats above every head, and inside it, whatever that person is thinking right now.''', 'HALL',
  'Тот же коридор утром, но теперь у каждого ребёнка (8–10 человек) над головой облако, облака на трёх ярусах («этажами»), внутри картинки без слов: пицца, сердечко, нота, вопрос, футбольный мяч, тетрадь. Над Leon облака нет, Leon поднимает голову и смотрит на других.',
  [('cloud', 'EVERY HEAD. EVERY MORNING.', 'подпись')], 'облака один за другим вырастают слева направо, камера медленно едет вдоль толпы', 'BG hall; CROWD; CLOUDS; LEON',
  passport='''Толпа 9 детей в линию вдоль коридора. Облака на трёх ярусах: ярус 1 у крайних детей (низко), ярус 2 у вторых, ярус 3 у третьих, затем снова 1. Картинки внутри облаков простые и читаются без слов. Над Leon облака нет и не будет.''')
S('''Here's how it works.''', 'VOID',
  'Void: крупная плашка «HOW IT WORKS» с лампочкой; Leon показывает на неё рукой.',
  [('how', 'HOW IT WORKS', 'плашка')], 'плашка вылетает с отскоком', 'LEON; PROP card')
S('''Rule one. The cloud changes the second the thought does.''', 'VOID',
  'Карточка «RULE 1». Ниже: ребёнок с облаком «PIZZA?»; облако мгновенно меняется на «NO. TACOS.» вместе с резким поворотом головы.',
  [('one.', 'RULE 1', 'плашка правила'), ('changes', 'PIZZA?', 'облако KID, ярус 1'), ('does.', 'NO. TACOS.', 'облако KID, ярус 1')],
  'тест-облако мигает при смене', 'LEON; KID; PROP card; CLOUD')
S('''Rule two. Only you can see them,''', 'VOID',
  'Карточка «RULE 2». Ниже Leon крупный план лица: глаза широко открыты, над ним значок «глаз»; позади тёмные силуэты зрителей без глаз.',
  [('two.', 'RULE 2', 'плашка правила'), ('Only', 'ONLY YOU', 'подпись')], 'значок-глаз загорается', 'LEON; PROP card; PROP eye')
S('''you can't see your own,''', 'VOID',
  'Leon задирает глаза вверх, над его собственной макушкой пустое место, «?»; рядом на кадре в зеркале тоже пусто.',
  [('own,', 'NOT YOUR OWN', 'подпись')], 'Leon косится вверх, ничего нет', 'LEON; PROP question mark')
S('''and you can't turn them off.''', 'VOID',
  'Leon жмёт на большую кнопку OFF на стене; облака у проходящих детей на заднем плане не исчезают.',
  [('off.', 'CAN\'T TURN OFF', 'подпись')], 'кнопка щёлкает, облака на фоне продолжают плыть', 'LEON; PROP switch; KIDS; CLOUDS')
S('''Rule three. On Sunday at midnight, every cloud disappears.''', 'VOID',
  'Карточка «RULE 3», рядом часы со стрелками на 12:00 и подпись «SUNDAY». Облака вокруг лопаются одно за другим как пузыри.',
  [('three.', 'RULE 3', 'плашка правила'), ('midnight,', 'SUNDAY · 12:00 AM', 'подпись')], 'часы бьют, облака лопаются с хлопками', 'LEON; PROP clock; PROP card; CLOUDS')
S('''The clouds float at different heights, so even in a crowd, nobody covers anybody else, and you can read all of them at once.''', 'HALL',
  'Толпа в коридоре крупнее: облака стоят «лесенкой» на трёх высотах; тонкая пунктирная линия показывает три уровня «1, 2, 3»; ни одно облако не закрывает другое.',
  [('heights,', 'THREE HEIGHTS', 'подпись')], 'уровни подсвечиваются по очереди', 'BG hall; CROWD; CLOUDS', cut='H')
S('''Leon has a list.''', 'VOID',
  'Leon с блокнотом в руке и карандашом за ухом, строго смотрит на зрителя.',
  [], 'поднимает блокнот', 'LEON; PROP notepad')
S('''One, find out if Zoe likes him. Two, become the coolest kid in school. Three, find out what his dad really thinks.''', 'VOID',
  'Блокнот крупно, три строки появляются по очереди с галочкой-пустым квадратиком: 1 сердце, 2 корона, 3 облачко с «?».',
  [('One,', '1. FIND OUT IF ZOE LIKES HIM', 'список'), ('Two,', '2. BECOME THE COOLEST KID', 'список'), ('Three,', '3. FIND OUT WHAT DAD REALLY THINKS', 'список')],
  'карандаш рисует квадратики на словах One / Two / Three', 'PROP notepad; LEON hand')
S('''At breakfast, he checks the dog first.''', 'KITCHEN',
  'Кухня (день): Leon за столом с миской хлопьев, под столом собака Biscuit сидит, смотрит на Leon, Leon опускает глаза на неё.',
  [], 'Leon наклоняется заглянуть под стол', 'BG kitchen; LEON; BISCUIT; PROP bowl')
S('''Biscuit's cloud is a drawing of one sock.''', 'KITCHEN',
  'Над головой Biscuit облако (ярус 1), внутри нарисованный носок (серый в полоску), не слова. Biscuit виляет хвостом.',
  [('cloud', '[КАРТИНКА: НОСОК]', 'облако BISCUIT, ярус 1')], 'облако вырастает, носок покачивается', 'BG kitchen; BISCUIT; LEON; PROP sock',
  passport='''Biscuit сидит на полу у ножки стола, размер как в ролике 02 (одинаковый во всех сценах). Облако над ним картинка носка, без слов; носок большой, читается сразу. Оно не закрывает морду собаки.''')
S('''Not a thought, not a plan, just a sock.''', 'KITCHEN',
  'Leon с невозмутимым лицом смотрит на облако с носком, потом переводит глаза на собаку, пожимает плечами.',
  [('sock.', 'JUST A SOCK', 'подпись')], 'носок в облаке вертится', 'BG kitchen; LEON; BISCUIT; PROP sock', cut='K')
S('''Day one. Let's start with power.''', 'VOID',
  'Плашка «DAY 1: POWER» с рукой-бицепсом, Leon показывает бицепс. В углу появляется счётчик DAY 1 и остаётся до конца дня.',
  [('Day', 'DAY 1', 'счётчик дня'), ('power.', 'POWER', 'плашка главы')], 'счётчик вылетает в угол на слове «Day»', 'LEON; HUD', day=1)

# ============================ ДЕНЬ 1: СИЛА ============================
S('''Plus. Gym class, dodgeball.''', 'GYM',
  'Спортзал: две команды выстроились друг напротив друга по разные стороны центральной линии, у каждого ребёнка в руках красный мяч. Leon на своей стороне. Сверху зелёная плашка «PLUS».',
  [('Plus.', '+ PLUS', 'плашка главы')], 'плашка выскакивает, дети разминаются', 'BG gym; LEON; KIDS; BALLS; CHASE')
S('''Every kid's cloud says exactly who they're aiming at.''', 'GYM',
  'Команда напротив, пять детей в ряд, у каждого над головой облако на своём ярусе (ступенями: 1-2-3-2-1), в каждом облаке прицел-перекрестие на фигурке Leon. Leon внизу слева смотрит вверх на облака.',
  [('aiming', '[ПРИЦЕЛ НА LEON ×5]', 'облака KIDS, ярусы 1–3')], 'облака вспыхивают по очереди слева направо, прицелы подрагивают', 'BG gym; KIDS; CLOUDS; LEON',
  passport='''Дети команды напротив стоят цепочкой на полу спортзала, лицами к Leon. Ярусы облаков 1-2-3-2-1. В облаках прицел на мини-Leon (кепка, красная футболка). Leon смотрит на них снизу вверх.''')
S('''"Leon, left. Leon, left."''', 'GYM',
  'Крупный план бросающего: мальчик замахивается, над ним облако (ярус 1): «LEON, LEFT. LEON, LEFT.» со стрелкой влево. На заднем плане Leon.',
  [('"Leon,', 'LEON, LEFT.', 'облако KID, ярус 1'), ('left.', 'LEON, LEFT.', 'облако KID, ярус 1')], 'стрелка пульсирует влево', 'BG gym; KID; CLOUD; LEON')
S('''Leon steps right, and the ball misses him.''', 'GYM',
  'Общий план: мяч летит влево от Leon (слева направо по кадру), Leon делает шаг вправо, мяч пролетает за его спиной и бьёт в стену, у стены остаются «полосы скорости». Leon спокоен.',
  [], 'шаг в сторону строго на «steps right», мяч «свиш» мимо', 'BG gym; LEON; BALL')
S('''It misses him all day.''', 'GYM',
  'Монтаж из трёх кадров подряд с часами в углу (9:00, 11:00, 2:00): Leon спокойно пьёт воду, читает, завязывает кроссовки, мячи пролетают мимо в разные стороны; дети-метатели в отчаянии.',
  [('misses', '9:00 → 11:00 → 2:00', 'подпись времени')], 'три быстрых смены плана, мячи мимо', 'BG gym; LEON; KIDS; BALLS; PROP clock')
S('''Plus. In math, Ms. Park is about to call someone to the board.''', 'CLASS',
  'Класс (доска слева): ребята за партами, Ms. Park (фиолетовый костюм, пучок, очки) стоит у доски с журналом, водит пальцем по списку. Над ней облако (ярус 2). Leon за партой слева. Плашка «PLUS».',
  [('Plus.', '+ PLUS', 'плашка главы')], 'палец Park бегает по списку', 'BG class; PARK; LEON; OWEN; KIDS; PROP roster',
  passport='''Класс (classroom.png): доска сзади у стены, парты на полу перед ней, дети сидят лицом к доске (виден профиль). Ms. Park стоит у доски на полу, рука с журналом. Облако над Park не закрывает доску целиком и очки.''')
S('''Her cloud says, "Leon next." Leon has eight seconds to learn the problem.''', 'CLASS',
  'Над Park облако «LEON NEXT.» Leon за партой в шоке (глаза на облако), потом перелистывает учебник; в углу таймер 8…0.',
  [('"Leon', 'LEON NEXT.', 'облако PARK, ярус 2'), ('eight', '0:08', 'таймер')], 'таймер идёт назад на «eight seconds», страницы листаются быстро', 'BG class; PARK; LEON; PROP textbook; PROP timer')
S('''He learns it, walks up, and solves it like he planned it since breakfast.''', 'CLASS',
  'Leon у доски, на доске решённый пример, он уверенно чертит ответ и стряхивает мел; класс смотрит.',
  [('solves', 'x = 7', 'доска')], 'решение дорисовывается, Leon разворачивается к классу', 'BG class; LEON; PARK; KIDS; PROP chalk')
S('''Her cloud says, "Huh."''', 'CLASS',
  'Крупно Ms. Park, брови подняты над очками; над ней облако «HUH.»',
  [('"Huh."', 'HUH.', 'облако PARK, ярус 1')], 'облако мигает один раз', 'BG class; PARK; CLOUD')
S('''Plus. Leon slides a note to his friend Owen while Ms. Park writes on the board.''', 'CLASS',
  'Ms. Park спиной к классу пишет мелом на доске. Leon тянет сложенную записку соседу по парте Owen (зелёная толстовка, круглые очки). Плашка «PLUS».',
  [('Plus.', '+ PLUS', 'плашка главы')], 'записка скользит по парте от Leon к Owen', 'BG class; PARK; LEON; OWEN; PROP note')
S('''Her cloud says, "Don't turn around. Turn around."''', 'CLASS',
  'Ms. Park пишет на доске, над ней облако (ярус 2) меняется: DON\'T TURN AROUND. → TURN AROUND. Park начинает поворачивать плечо.',
  [('"Don\'t', 'DON\'T TURN AROUND.', 'облако PARK, ярус 2'), ('Turn', 'TURN AROUND.', 'облако PARK, ярус 2')], 'облако дёргается, плечо Park поворачивается', 'BG class; PARK; LEON; OWEN')
S('''He hides the note one second before she turns.''', 'CLASS',
  'Park разворачивается лицом к классу, Leon уже спрятал записку под учебник и невинно смотрит на доску; Owen еле сдерживает улыбку. В углу «1 SEC».',
  [('second', '1 SEC', 'подпись')], 'записка исчезает под книгой за миг до поворота', 'BG class; PARK; LEON; OWEN; PROP note')
S('''Her cloud says, "I know somebody is passing notes. I'm just too tired."''', 'CLASS',
  'Ms. Park смотрит сонно, плечи опущены, над ней облако (ярус 2) на две строки. Класс сидит как ни в чём не бывало.',
  [('"I', 'I KNOW SOMEBODY IS PASSING NOTES. I\'M JUST TOO TIRED.', 'облако PARK, ярус 2')], 'облако набирается, Park вздыхает и трёт глаза', 'BG class; PARK; LEON; OWEN; CLOUD')

# ============================ ДЕНЬ 2: КРУТЫЕ ============================
S('''And then there are the cool kids.''', 'CAFE',
  'Столовая: у дальнего стола четыре крутых ученика (Chase и трое других) в куртках, позируют, у стола стулья. Остальные столы на заднем плане. Счётчик DAY 2.',
  [('cool', 'DAY 2', 'счётчик дня')], 'крутые разом поворачивают головы в кадр', 'BG cafe; CHASE; COOL; PROP table', day=2)
S('''Leon doesn't just hear what people say anymore. He knows what they hoped somebody would say.''', 'CAFE',
  'Leon со своим подносом стоит у стола крутых. Из ртов идут обычные слова (пустые речевые пузыри), а над головами облака поярусно показывают то, что они хотели бы услышать: «SAY SOMETHING NICE.», «NOTICE ME.»',
  [('hear', 'WHAT THEY SAY', 'подпись'), ('hoped', 'WHAT THEY HOPE', 'подпись'), ('somebody', 'NOTICE ME.', 'облако COOL1, ярус 2'), ('would', 'SAY SOMETHING NICE.', 'облако COOL2, ярус 3')], 'речевые пузыри исчезают, облака проявляются выше', 'BG cafe; LEON; COOL; CLOUDS; PROP trays')
S('''Chase scores in gym, and Leon says, "Nice captain move."''', 'GYM',
  'Спортзал: Chase попадает мячом в соперника, раскидывает руки; Leon с краю даёт большой палец вверх и говорит. Речевой пузырь Leon (не облако).',
  [('"Nice', 'NICE CAPTAIN MOVE.', 'реплика LEON')], 'мяч попадает, Leon показывает палец', 'BG gym; CHASE; LEON; BALL; KIDS')
S('''Chase's cloud lights up: "He noticed."''', 'GYM',
  'Крупно Chase: над ним облако светится жёлтым, вокруг искры: «HE NOTICED.» Chase пытается скрыть улыбку.',
  [('"He', 'HE NOTICED.', 'облако CHASE, ярус 1')], 'облако вспыхивает, искры', 'BG gym; CHASE; CLOUD')
S('''Leon does it again with the next boy, and the next.''', 'GYM',
  'Три коротких кадра подряд: Leon хлопает по плечу мальчика, у того над головой облако вспыхивает звёздочкой «!»; повторяется ещё с двумя мальчиками.',
  [], 'три вспышки подряд', 'BG gym; LEON; KIDS; CLOUDS', cut='I')
S('''By lunch, the coolest table in school pulls out a chair for him.''', 'CAFE',
  'Столовая: Leon идёт с подносом к крутому столу, Chase выдвигает для него стул.',
  [('lunch,', 'LUNCH', 'подпись времени')], 'стул отодвигается по полу, Leon подходит', 'BG cafe; LEON; CHASE; COOL; PROP chair; PROP tray')
S('''Nobody has ever pulled out a chair for Leon.''', 'CAFE',
  'Крупно Leon: тычет в себя пальцем «я?», на лице недоверие; над стулом блестит звёздочка.',
  [], 'Leon оглядывается назад, нет ли кого сзади', 'BG cafe; LEON; PROP chair')
S('''He sits down very carefully, in case it's a trap. It isn't.''', 'CAFE',
  'Leon медленно садится на край стула, одной рукой держится за стол, готов вскочить; стул держит, крутые кивают.',
  [('isn\'t.', 'IT ISN\'T', 'подпись')], 'медленное опускание, пауза, затем расслабление на «It isn\'t»', 'BG cafe; LEON; COOL; PROP chair')
S('''Chase leans over and says, "Dodgeball tomorrow. You're my first pick."''', 'CAFE',
  'Chase наклоняется к Leon через стол, говорит ему, пузырь реплики.',
  [('"Dodgeball', 'DODGEBALL TOMORROW. YOU\'RE MY FIRST PICK.', 'реплика CHASE')], 'Chase наклоняется ближе', 'BG cafe; CHASE; LEON; COOL')
S('''First. Not last.''', 'GYM',
  'Сплит-вставка: слева прошлое, серым: Leon один на скамейке, его выбирают последним; справа зелёным: Leon в кружке на первом месте. Надпись «LAST» перечёркнута, «FIRST» горит.',
  [('First.', 'FIRST', 'подпись'), ('last.', 'LAST', 'подпись')], 'галочка на FIRST, крест на LAST', 'LEON; PROP bench; PROP stars')
S('''But across the cafeteria, the scariest kid in school is still staring at him.''', 'CAFE',
  'Широкий план столовой: Leon и крутые на переднем плане, далеко у стены Rocco сидит один за пустым столом и тяжело смотрит на Leon (глаза видны). Над Rocco облака пока нет. Leon чувствует взгляд и косится.',
  [], 'камера медленно наезжает на Rocco, Leon нервно сглатывает', 'BG cafe; LEON; COOL; ROCCO; PROP table')

# ============================ ДЕНЬ 3: ROCCO ============================
S('''Day three.''', 'VOID',
  'Плашка «DAY 3», Leon уже в кадре, поправляет кепку.',
  [('Day', 'DAY 3', 'счётчик дня')], 'счётчик меняется 2 → 3 с отскоком', 'LEON; HUD', day=3)
S('''Rocco corners him by the lockers.''', 'HALL',
  'Коридор, шкафчики: Rocco нависает над Leon, одна рука на шкафчике рядом с головой Leon. Leon прижат к шкафчикам спиной, смотрит снизу вверх.',
  [], 'Rocco надвигается, тень падает на Leon', 'BG hall; ROCCO; LEON',
  passport='''Leon стоит на полу спиной к синим шкафчикам, Rocco перед ним лицом к лицу (профиль). Rocco на голову выше Leon. Рука Rocco упирается в шкафчик выше плеча Leon, не сквозь него.''')
S('''Rocco is the size of a refrigerator, and his knuckles crack like popcorn.''', 'HALL',
  'Рядом с Rocco проявляется силуэт холодильника такого же роста: сходство. Rocco хрустит пальцами; Leon крошечный в тени. Подпись «POP POP».',
  [('refrigerator,', 'FRIDGE-SIZED', 'подпись'), ('popcorn.', 'POP POP POP', 'звук')], 'контур холодильника рядом, пальцы хрустят', 'BG hall; ROCCO; LEON; PROP fridge outline')
S('''"Hey, Leon." The whole hallway steps back.''', 'HALL',
  'Rocco низким голосом (пузырь). Толпа детей позади отшатывается назад, освобождая круг вокруг двоих.',
  [('"Hey,', 'HEY, LEON.', 'реплика ROCCO')], 'толпа раздаётся шагами назад', 'BG hall; ROCCO; LEON; CROWD')
S('''But Leon looks up,''', 'HALL',
  'Leon поднимает глаза выше головы Rocco, на лице напряжение.',
  [], 'взгляд идёт вверх по кадру', 'BG hall; ROCCO; LEON')
S('''and Rocco's cloud says, "Please don't be scared of me. Please be my friend."''', 'HALL',
  'Над сердитым Rocco большое облако (ярус 2): «PLEASE DON\'T BE SCARED OF ME. PLEASE BE MY FRIEND.» Контраст: мрачное лицо и мягкие слова. Глаза Rocco виднее, грустные.',
  [('"Please', 'PLEASE DON\'T BE SCARED OF ME.', 'облако ROCCO, ярус 2'), ('Please#2', 'PLEASE BE MY FRIEND.', 'облако ROCCO, ярус 2')], 'облако раскрывается над Rocco, лицо Leon смягчается', 'BG hall; ROCCO; LEON; CLOUD')
S('''So Leon doesn't run. He says, "Nice jacket."''', 'HALL',
  'Leon выпрямляется, не убегает, улыбается и показывает на куртку Rocco (потёртая коричневая куртка поверх худи, на рукаве заплатка). Пузырь реплики Leon.',
  [('"Nice', 'NICE JACKET.', 'реплика LEON')], 'Leon делает шаг вперёд', 'BG hall; LEON; ROCCO')
S('''Rocco's cloud freezes. Then, very slowly, it says, "He talked to me."''', 'HALL',
  'Облако Rocco покрывается инеем и замирает на секунду; потом лёд трескается, текст появляется по буквам: «HE TALKED TO ME.»',
  [('freezes.', '❄', 'эффект'), ('"He', 'HE TALKED TO ME.', 'облако ROCCO, ярус 2')], 'иней на облаке, затем медленная печать букв', 'BG hall; ROCCO; LEON; CLOUD')
S('''Rocco looks at his sleeve. "Thanks. My brother gave it to me."''', 'HALL',
  'Rocco смущённо смотрит на рукав с заплаткой, трёт его, кивает. Пузырь реплики.',
  [('"Thanks.', 'THANKS. MY BROTHER GAVE IT TO ME.', 'реплика ROCCO')], 'Rocco застенчиво почёсывает затылок', 'BG hall; ROCCO; LEON')
S('''From that day, the scariest kid in school walks next to Leon everywhere and glares at anyone who even thinks about bumping into him. Nobody does.''', 'HALL',
  'Монтаж: Rocco идёт рядом с Leon по коридору, дети расступаются; один малыш хочет пройти, Rocco прищуривается, малыш разворачивается.',
  [], 'три плана ходьбы, дети расступаются', 'BG hall; ROCCO; LEON; KIDS', cut='D')
S('''Leon has a bodyguard, and he didn't pay a cent.''', 'HALL',
  'Leon идёт по коридору, Rocco как охранник за его плечом; рядом появляется чек с суммой $0.00.',
  [('cent.', '$0.00', 'чек')], 'чек выпрыгивает у Leon из кармана', 'BG hall; LEON; ROCCO; PROP receipt')
S('''At lunch, Zoe looks over.''', 'CAFE',
  'Столовая: Zoe за столом с подносом оглядывается через плечо, смотрит в сторону Leon (его силуэт на заднем плане).',
  [], 'Zoe поворачивает голову', 'BG cafe; ZOE; LEON; PROP tray')
S('''Her cloud says, "I hope Leo sits next to me."''', 'CAFE',
  'Над Zoe облако (ярус 1): «I HOPE LEO SITS NEXT TO ME.» Leon вдали замер с подносом.',
  [('"I', 'I HOPE LEO SITS NEXT TO ME.', 'облако ZOE, ярус 1')], 'облако раскрывается, у Leon подгибаются колени', 'BG cafe; ZOE; LEON; CLOUD')
S('''Leo. Not Leon. Leo.''', 'CAFE',
  'Крупно облако: слово «LEO» набрано жирно, рядом тусклая тень «N», которая стирается. Три удара по словам. Лицо Leon: «Leo? Или Leon?» брови вверх.',
  [('Leo.', 'LEO', 'надпись крупно'), ('Not', 'NOT LEON', 'надпись крупно'), ('Leo.#2', 'LEO', 'надпись крупно')], 'три удара слова, N стирается ластиком', 'BG cafe; LEON; PROP big text')
S('''There's a new kid named Leo, and he has a guitar.''', 'CAFE',
  'Рядом с Zoe стоит новенький Leo (жёлтая куртка, лохматые тёмные волосы), гитара за спиной, держит поднос. Над Leo подпись-стрелка «LEO».',
  [('Leo,', 'LEO (NEW KID)', 'подпись')], 'Leo подсаживается к столу Zoe, гитара качается', 'BG cafe; LEO; ZOE; PROP guitar; PROP tray')
S('''Leon sits very still. Leo or Leon?''', 'CAFE',
  'Leon застыл за дальним столом, ложка на полпути ко рту. Над кадром пинг-понг: слева крошечный Leo, справа крошечный Leon, между ними Zoe и вопросительные знаки.',
  [('Leo', 'LEO?', 'подпись'), ('Leon?', 'LEON?', 'подпись')], 'вопросы прыгают туда-сюда', 'BG cafe; LEON; ZOE; LEO; PROP question marks')
S('''He has four more days to find out, and it feels longer than his whole life.''', 'VOID',
  'Календарь: Thu, Fri, Sat, Sun ячейки пустые; растягиваются в длинную бесконечную ленту, Leon на фоне сутулится.',
  [('four', '4 MORE DAYS', 'подпись')], 'лента календаря удлиняется', 'LEON; PROP calendar')
S('''That night, he sees a very different thought.''', 'NIGHT',
  'Ночная улица, дом Leon со светящимся окном кухни; камера наезжает на окно.',
  [('night,', 'THAT NIGHT', 'подпись')], 'медленный наезд на окно', 'BG street night (ролик 02)')

# ============================ ДЕНЬ 4: УЖИН, ПАПА ============================
S('''Day four, dinner.''', 'KITCHEN',
  'Кухня вечером: за столом Mom (ставит кастрюлю), Dad (газета), Leon, под столом Biscuit. Счётчик DAY 4.',
  [('Day', 'DAY 4', 'счётчик дня'), ('dinner.', 'DINNER', 'подпись')], 'счётчик меняется на 4', 'BG kitchen; MOM; DAD; LEON; BISCUIT; PROP table', day=4,
  passport='''Кухня (kitchen.png): стол у левой стены, стулья по бокам. Mom стоит у плиты или у стола (ноги на полу), Dad сидит во главе с газетой (глаза над краем газеты видны), Leon сидит напротив, лицом к Dad. Biscuit под столом у ног Leon. Тарелки на столе, а не в воздухе.''')
S('''Mom's cloud says, "Did he eat anything green?"''', 'KITCHEN',
  'Mom (розовое платье, хвост) смотрит на тарелку Leon; над ней облако (ярус 1): «DID HE EAT ANYTHING GREEN?»',
  [('"Did', 'DID HE EAT ANYTHING GREEN?', 'облако MOM, ярус 1')], 'облако раскрывается', 'BG kitchen; MOM; LEON; CLOUD')
S('''He hasn't. Dad is reading the news.''', 'KITCHEN',
  'Leon прячет брокколи под салфетку; Dad читает газету, над краем газеты видны глаза.',
  [('hasn\'t.', 'NO GREEN', 'подпись')], 'Leon толкает брокколи Biscuit под стол', 'BG kitchen; LEON; DAD; BISCUIT; PROP broccoli; PROP newspaper')
S('''Leon wants the new game, the one that costs sixty dollars.''', 'KITCHEN',
  'Справа выезжает карточка-врезка (не мысль Leon): коробка игры с ценником «$60». Leon смотрит на неё краем глаза.',
  [('sixty', 'THE NEW GAME · $60', 'карточка')], 'карточка выезжает, ценник блестит', 'BG kitchen; LEON; PROP game box')
S('''Last time he asked, Dad said, "We'll see," which in dad means no.''', 'KITCHEN',
  'Вставка-воспоминание в сепии: Dad говорит «WE\'LL SEE.», подпись переводчик «= NO» поверх.',
  [('"We\'ll', 'WE\'LL SEE.', 'реплика DAD'), ('no.', '= NO', 'подпись')], 'сепия, слова-перевод печатаются', 'BG kitchen (сепия); DAD; LEON')
S('''This time, Leon waits.''', 'KITCHEN',
  'Leon складывает руки на столе, терпеливо ждёт, на стене тикают часы.',
  [], 'часы тикают, Leon не двигается', 'BG kitchen; LEON; DAD; PROP wall clock')
S('''Dad's cloud says, "Say no. No. Say no."''', 'KITCHEN',
  'Над Dad облако (ярус 2), текст повторяется три раза: SAY NO. / NO. / SAY NO. Dad невозмутимо читает.',
  [('"Say', 'SAY NO.', 'облако DAD, ярус 2'), ('No.', 'NO.', 'облако DAD, ярус 2'), ('Say#2', 'SAY NO.', 'облако DAD, ярус 2')], 'каждое слово ударом, облако дрожит', 'BG kitchen; DAD; LEON; CLOUD')
S('''Leon chews a carrot.''', 'KITCHEN',
  'Leon громко хрустит морковкой, смотрит прямо на Dad.',
  [('chews', 'CRUNCH', 'звук')], 'челюсть двигается, хруст', 'BG kitchen; LEON; DAD; PROP carrot')
S('''Dad's phone buzzes, work, and his cloud says, "Long day." Leon chews another carrot.''', 'KITCHEN',
  'Телефон на столе вибрирует (на экране «WORK»), Dad вздыхает, облако «LONG DAY.»; Leon берёт вторую морковку.',
  [('buzzes,', 'WORK', 'экран телефона'), ('"Long', 'LONG DAY.', 'облако DAD, ярус 2')], 'телефон дребезжит по столу', 'BG kitchen; DAD; LEON; PROP phone; PROP carrot', cut='F')
S('''Then Dad glances at the empty plate, and the cloud says, "He worked hard this week."''', 'KITCHEN',
  'Dad отводит газету, смотрит на пустую тарелку Leon, лицо добреет; облако меняется на «HE WORKED HARD THIS WEEK.»',
  [('"He', 'HE WORKED HARD THIS WEEK.', 'облако DAD, ярус 2')], 'облако стирает «SAY NO» и пишет новое', 'BG kitchen; DAD; LEON; CLOUD')
S('''"Dad, can I get the new game?" "Okay."''', 'KITCHEN',
  'Leon просит, Dad отвечает; две реплики по очереди (пузыри).',
  [('"Dad,', 'DAD, CAN I GET THE NEW GAME?', 'реплика LEON'), ('"Okay."', 'OKAY.', 'реплика DAD')], 'пузыри по очереди', 'BG kitchen; LEON; DAD')
S('''Mom drops her fork. Dad's cloud says, "Wait. Did I just say okay?"''', 'KITCHEN',
  'Mom роняет вилку (звон), глаза в шоке; над Dad облако (ярус 2): «WAIT. DID I JUST SAY OKAY?»',
  [('"Wait.', 'WAIT. DID I JUST SAY OKAY?', 'облако DAD, ярус 2')], 'вилка падает, Dad хватается за газету', 'BG kitchen; MOM; DAD; LEON; PROP fork; CLOUD')
S('''Leon is basically running the house.''', 'KITCHEN',
  'Leon откидывается на стуле, руки за головой, с победной улыбкой; над столом плашка «THE BOSS».',
  [('running', 'THE BOSS', 'подпись')], 'Leon качается на задних ножках', 'BG kitchen; LEON; DAD; MOM')
S('''But later, while Mom washes the dishes, Dad looks at Leon for a long time.''', 'KITCHEN',
  'Mom спиной у раковины моет посуду, Dad опускает газету, смотрит на Leon долгим взглядом; Leon доедает, замечает взгляд.',
  [('later,', 'LATER', 'подпись времени')], 'Dad медленно опускает газету', 'BG kitchen; MOM; DAD; LEON; PROP sink')
S('''His cloud says, "I should tell him I'm proud of him. I never say it."''', 'KITCHEN',
  'Крупно Dad, над ним облако (ярус 2) на две строки: «I SHOULD TELL HIM I\'M PROUD OF HIM. I NEVER SAY IT.» Leon справа на нижнем плане читает.',
  [('"I', 'I SHOULD TELL HIM I\'M PROUD OF HIM.', 'облако DAD, ярус 2'), ('never', 'I NEVER SAY IT.', 'облако DAD, ярус 2')], 'вторая строка появляется на «I never»', 'BG kitchen; DAD; LEON; CLOUD')
S('''Dad opens his mouth. Closes it. Picks up the news.''', 'KITCHEN',
  'Три быстрых кадра Dad: рот открывается; закрывается; газета поднимается заново перед лицом.',
  [], 'три смены позы ровно по словам', 'BG kitchen; DAD; PROP newspaper')
S('''The cloud says, "Next time."''', 'KITCHEN',
  'Над поднятой газетой облако: «NEXT TIME.» Leon смотрит на него снизу.',
  [('"Next', 'NEXT TIME.', 'облако DAD, ярус 2')], 'облако тускнеет', 'BG kitchen; DAD; LEON; CLOUD')
S('''Leon stares at that cloud for a very long minute.''', 'KITCHEN',
  'Leon неподвижно смотрит вверх на облако; часы на стене прокручиваются; облако медленно уменьшается.',
  [('minute.', '1 MIN', 'подпись')], 'стрелки часов крутятся, свет за окном темнеет', 'BG kitchen; LEON; PROP wall clock; CLOUD')
S('''And then comes day five, the day nobody warns you about.''', 'VOID',
  'Плашка «DAY 5», рядом знак предупреждения с восклицательным знаком, Leon настороженно оглядывается.',
  [('day', 'DAY 5', 'счётчик дня')], 'знак предупреждения мигает', 'LEON; HUD; PROP warning sign', day=5)

# ============================ ДЕНЬ 5: ШУМ И ЦЕНА ============================
S('''Problem one, the noise.''', 'VOID',
  'Плашка «PROBLEM 1: THE NOISE», фоном размытые гудящие облака.',
  [('Problem', 'PROBLEM 1: THE NOISE', 'плашка главы')], 'плашка вылетает, звук гула', 'LEON; PROP card; CLOUDS')
S('''Two hundred kids, two hundred clouds, stacked like floors in a skyscraper until the top ones touch the ceiling.''', 'HALL',
  'Коридор до отказа: толпа детей, над ними облака стопкой «как этажи небоскрёба» (8 ярусов), верхние упираются в потолок; в углу счётчик «200». Leon внизу у шкафчиков зажмурил один глаз.',
  [('Two', '200', 'счётчик'), ('stacked', '↑ FLOORS OF CLOUDS', 'подпись')], 'камера снизу вверх вдоль этажей облаков, счётчик растёт до 200', 'BG hall; CROWD; CLOUDS; LEON; PROP counter',
  passport='''Толпа на полу коридора лицом к камере. Ярусы облаков стопкой, у каждого ребёнка свой столбик из 2–4 облаков (разные мысли), всего ≈ 8 уровней. Облака мелкие, текст не читается (шум), глаза детей видны. Верх облаков не обрезан кадром.''')
S('''Researchers at Queen's University in Canada estimate that one person has about six thousand separate thoughts a day. Leon is reading two hundred people's worth.''', 'VOID',
  'Фигурка человека, из неё выплывают тысячи крошечных облачков (счётчик до 6,000), рядом «×200».',
  [('thousand', '≈ 6,000 THOUGHTS / DAY', 'подпись'), ('two', '× 200', 'подпись')], 'облака потоком из головы, счётчик растёт', 'PERSON; PROP counter; CLOUDS', cut='B')
S('''A Harvard study found that almost half the time, a mind is somewhere other than where its body is.''', 'VOID',
  'Ребёнок сидит на стуле, а его облако улетает вверх и показывает пляж с пальмой; круговая диаграмма почти пополам. Подпись «ALMOST HALF».',
  [('Harvard', 'HARVARD STUDY', 'подпись'), ('half', 'ALMOST HALF', 'подпись')], 'облако уплывает, диаграмма заполняется', 'KID; PROP pie chart; PROP beach cloud')
S('''In Ms. Park's class, half the clouds are about lunch.''', 'CLASS',
  'Класс: Ms. Park у доски, ряды детей, над каждой второй головой облако с едой (пицца, бургер, мороженое), на разных ярусах. Ms. Park сердито стучит указкой.',
  [('lunch.', 'LUNCH ×10', 'подпись')], 'облака с едой лопаются по очереди', 'BG class; PARK; KIDS; CLOUDS; PROP food icons')
S('''Later, he answers a question nobody asked, and everybody laughs.''', 'CLASS',
  'Leon вскакивает с места и громко отвечает, над головой сидящего рядом облако с вопросом «IS THIS ON THE TEST?», на самом деле другой вопрос; весь класс хохочет (облака «HA HA»).',
  [('laughs.', 'HA HA HA', 'звук')], 'класс смеётся, Leon краснеет', 'BG class; LEON; KIDS; PARK; CLOUDS')
S('''Problem two, the thoughts you wish you hadn't seen.''', 'VOID',
  'Плашка «PROBLEM 2: THOUGHTS YOU WISH YOU HADN\'T SEEN», Leon прикрывает глаза рукой, но смотрит между пальцев (глаза видны).',
  [('Problem', 'PROBLEM 2', 'плашка главы'), ('wish', 'THOUGHTS YOU WISH YOU HADN\'T SEEN', 'подпись')], 'плашка вылетает', 'LEON; PROP card')
S('''Owen laughs at Leon's joke, and for one second his cloud says, "I miss when it was just us." Then, "He doesn't even notice me now."''', 'CAFE',
  'Столовая: Leon и Owen у стола, Owen смеётся, но над ним облако (ярус 1) грустное: «I MISS WHEN IT WAS JUST US.» Затем облако меняется: «HE DOESN\'T EVEN NOTICE ME NOW.»',
  [('"I', 'I MISS WHEN IT WAS JUST US.', 'облако OWEN, ярус 1'), ('"He', 'HE DOESN\'T EVEN NOTICE ME NOW.', 'облако OWEN, ярус 1')], 'смех Owen и грустное облако расходятся, облако меняется', 'BG cafe; OWEN; LEON; CLOUD; PROP table')
S('''Leon realizes he hasn't talked to Owen since Monday.''', 'CAFE',
  'Календарь: MON–FRI, около Owen отметки «0 TALKS»; Leon со стыдом опускает глаза. Короткая вставка: записка из класса и тут же серый пустой стул Owen.',
  [('Monday.', 'LAST TALK: MONDAY', 'подпись')], 'отметки по дням проявляются и гаснут', 'LEON; OWEN; PROP calendar')
S('''At the cool table, Chase smiles at him, and his cloud says, "He's useful."''', 'CAFE',
  'Крутой стол: Chase широко улыбается Leon, над ним облако (ярус 2): «HE\'S USEFUL.» Улыбка и мысль не совпадают.',
  [('"He\'s', 'HE\'S USEFUL.', 'облако CHASE, ярус 2')], 'облако вспыхивает холодно, улыбка не меняется', 'BG cafe; CHASE; COOL; LEON; CLOUD')
S('''That one stings. But here's what surprises Leon most.''', 'CAFE',
  'Leon держится за грудь (укол, звёздочка боли), затем поднимает брови и оглядывается на других крутых: «!»',
  [('stings.', 'OUCH', 'звук')], 'укол, затем озарение', 'BG cafe; LEON; COOL')
S('''The coolest kids are the most scared.''', 'CAFE',
  'Крутые за столом дрожат, пот, глаза бегают, хотя позы расслабленные (по кругу штрихи дрожи).',
  [('scared.', 'SCARED', 'подпись')], 'пальцы стучат, пот капает', 'BG cafe; COOL; PROP sweat marks')
S('''Their clouds are full of "Do they like me?" and "Don't mess up."''', 'CAFE',
  'Над четырьмя крутыми облака на разных ярусах (1-3-2-4): «DO THEY LIKE ME?», «DON\'T MESS UP.», «DO THEY LIKE ME?», «DON\'T MESS UP.» Облака не накладываются.',
  [('"Do', 'DO THEY LIKE ME?', 'облако COOL1, ярус 1'), ('like', 'DO THEY LIKE ME?', 'облако COOL3, ярус 2'), ('"Don\'t', 'DON\'T MESS UP.', 'облако COOL2, ярус 3'), ('mess', 'DON\'T MESS UP.', 'облако COOL4, ярус 4')], 'облака вырастают ступенями', 'BG cafe; COOL; CLOUDS',
  passport='''Четверо крутых сидят за столом в ряд. Ярусы облаков: 1, 3, 2, 4 слева направо (ступеньки, ни одно не закрывает лицо или другое облако). Все облака целиком в кадре.''')
S('''In a study of students in thirteen countries, nearly all of them admitted to random, unwanted thoughts. Having them is normal.''', 'VOID',
  'Простая карта мира с 13 точками-метками, рядом «NEARLY ALL» и значок облака со знаком «?».',
  [('thirteen', '13 COUNTRIES', 'подпись'), ('normal.', 'NORMAL', 'подпись')], 'точки зажигаются по очереди', 'PROP world map; PROP clouds', cut='C')
S('''A thought isn't a decision. It's weather.''', 'VOID',
  'Карточка «THOUGHT ≠ DECISION»; затем облако-мысль превращается в дождевую тучку, она проплывает и выходит солнце.',
  [('thought', 'THOUGHT ≠ DECISION', 'карточка'), ('weather.', 'IT\'S WEATHER', 'подпись')], 'облако меняется на тучку и солнце', 'PROP card; PROP weather cloud; LEON')
S('''So Leon picks up his tray, walks past the cool table, and sits down next to Owen.''', 'CAFE',
  'Leon берёт поднос, идёт мимо крутого стола (Chase удивлён), садится рядом с Owen; Owen поворачивает голову, глаза расширены.',
  [], 'ходьба мимо стола, посадка рядом с Owen', 'BG cafe; LEON; OWEN; CHASE; COOL; PROP tray')

# ============================ ДЕНЬ 6: ОБЛАКА ПРО LEON ============================
S('''Day six is the best day of Leon's life, and it takes him a minute to understand why.''', 'HALL',
  'Коридор утром, Leon идёт один, дети смотрят на него и улыбаются; счётчик DAY 6. Leon недоумевает: почему все смотрят.',
  [('Day', 'DAY 6', 'счётчик дня')], 'счётчик меняется на 6, дети поворачиваются на Leon', 'BG hall; LEON; KIDS', day=6)
S('''Today, the clouds are about him.''', 'HALL',
  'Широкий план: у каждого ребёнка над головой облако с маленькой фигуркой Leon (кепка, красная футболка), на трёх ярусах.',
  [('about', '[LEON В КАЖДОМ ОБЛАКЕ]', 'облака KIDS, ярусы 1–3')], 'облака вспыхивают по очереди, в каждом мини-Leon', 'BG hall; KIDS; CLOUDS; LEON')
S('''"Leon is the funniest kid in class." "I wish Leon sat with us." "Leon's cap is actually cool."''', 'HALL',
  'Три ребёнка в ряд (по кадру слева направо), три облака на трёх ярусах (3-1-2). Текст читается по очереди: «LEON IS THE FUNNIEST KID IN CLASS.», «I WISH LEON SAT WITH US.», «LEON\'S CAP IS ACTUALLY COOL.» Leon внизу улыбается, поправляет кепку.',
  [('"Leon', 'LEON IS THE FUNNIEST KID IN CLASS.', 'облако KID1, ярус 3'), ('"I', 'I WISH LEON SAT WITH US.', 'облако KID2, ярус 1'), ('"Leon\'s', 'LEON\'S CAP IS ACTUALLY COOL.', 'облако KID3, ярус 2')], 'облака появляются по очереди ступеньками', 'BG hall; KID; KID2; KID3; LEON; CLOUDS',
  passport='''Три ребёнка стоят в ряд на полу, лицом к Leon. Облака на ярусах 3, 1, 2 (не перекрывают друг друга). Leon под ними, глаза направлены вверх, улыбка. Кепка Leon видна целиком.''')
S('''Even Rocco's cloud says, "That's my friend."''', 'HALL',
  'Rocco идёт позади Leon, над ним высокое облако (ярус 2): «THAT\'S MY FRIEND.» Он гордо скрещивает руки.',
  [('"That\'s', 'THAT\'S MY FRIEND.', 'облако ROCCO, ярус 2')], 'облако качается, Rocco кивает', 'BG hall; ROCCO; LEON; CLOUD')
S('''Then Owen walks up, and his cloud says, "Best friend."''', 'HALL',
  'Owen подходит с краю, улыбаясь, над ним облако (ярус 1): «BEST FRIEND.» с символом дружбы.',
  [('"Best', 'BEST FRIEND.', 'облако OWEN, ярус 1')], 'облако светится тёплым', 'BG hall; OWEN; LEON; CLOUD')
S('''That's the one that makes Leon stop in the middle of the hallway.''', 'HALL',
  'Leon замер посреди коридора, дети обтекают его с двух сторон; глаза блестят, улыбка дрожит.',
  [], 'толпа обтекает Leon, он остаётся на месте', 'BG hall; LEON; KIDS; OWEN')
S('''For the first time, he doesn't need to ask whether he matters. It's floating right there, in plain sight.''', 'HALL',
  'Рядом с Leon на мгновение появляется вопрос «DO I MATTER?», перечёркивается; камера отъезжает: в коридоре десятки светящихся облаков про Leon.',
  [('ask', 'DO I MATTER?', 'подпись'), ('floating', 'IN PLAIN SIGHT', 'подпись')], 'вопрос стирается, облака загораются тёплым', 'BG hall; LEON; KIDS; CLOUDS')

# ============================ ТАНЦЫ, ДЕНЬ 7 ============================
S('''Saturday night, the school dance.''', 'GYMDANCE',
  'Спортзал ночью: гирлянды, дискошар, цветные лучи, дети танцуют, у стены колонки. Подпись «SATURDAY NIGHT · SCHOOL DANCE».',
  [('Saturday', 'SATURDAY NIGHT', 'подпись'), ('dance.', 'SCHOOL DANCE', 'подпись')], 'лучи света бегают по залу', 'BG gym (ночной свет кодом); KIDS; LEON',
  passport='''Спортзал (gym.png), затемнён кодом, цветные пятна света. Дети танцуют на полу. Колонки стоят на полу у стены, Rocco будет за пультом у колонок. Leon у входа слева.''')
S('''Zoe stands by the wall, and her cloud says, "I hope Leon asks me to dance."''', 'GYMDANCE',
  'Zoe у стены в нарядной жёлтой юбке-платье, облако (ярус 1): «I HOPE LEON ASKS ME TO DANCE.» Leon вдали у двери читает.',
  [('"I', 'I HOPE LEON ASKS ME TO DANCE.', 'облако ZOE, ярус 1')], 'облако светится розовым', 'BG gym dance; ZOE; LEON; CLOUD')
S('''Leon. Not Leo. Leon.''', 'GYMDANCE',
  'Крупно облако Zoe: слово «LEON» со вспышкой, «N» подсвечено, три удара: LEON / NOT LEO / LEON; повторяет кадр S066 наоборот.',
  [('Leon.', 'LEON', 'надпись крупно'), ('Not', 'NOT LEO', 'надпись крупно'), ('Leon.#2', 'LEON', 'надпись крупно')], 'три удара слова, N загорается', 'BG gym dance; PROP big text')
S('''He reads it three times.''', 'GYMDANCE',
  'Leon крупно, глаза скользят по облаку слева направо три раза, рядом счётчик «×3».',
  [('three', '×3', 'подпись')], 'три прохода глаз по строке', 'BG gym dance; LEON; CLOUD')
S('''Behind the speakers, Rocco puts on a slow song, and his cloud says, "You're welcome."''', 'GYMDANCE',
  'У колонок за пультом стоит Rocco, ставит медленную песню (пластинка/кнопка play), над ним облако (ярус 2): «YOU\'RE WELCOME.» Ноты в воздухе.',
  [('"You\'re', 'YOU\'RE WELCOME.', 'облако ROCCO, ярус 2')], 'ноты плывут, облако мигает', 'BG gym dance; ROCCO; PROP speakers; PROP notes; CLOUD')
S('''Then he does something he hasn't done all week. He stops looking up.''', 'GYMDANCE',
  'Leon опускает глаза с облаков на уровень лица и больше не смотрит вверх; облака вокруг остаются, но он их не замечает.',
  [], 'взгляд опускается', 'BG gym dance; LEON; KIDS; CLOUDS')
S('''He crosses the whole gym and says, "Do you want to dance?"''', 'GYMDANCE',
  'Leon идёт через весь зал сквозь танцующих к Zoe, у неё лицо ему навстречу; пузырь реплики.',
  [('"Do', 'DO YOU WANT TO DANCE?', 'реплика LEON')], 'длинная ходьба, дети расступаются', 'BG gym dance; LEON; ZOE; KIDS')
S('''Zoe smiles. "Yes." Her cloud says, "Finally."''', 'GYMDANCE',
  'Zoe улыбается и кивает, говорит «YES.»; над ней облако (ярус 1): «FINALLY.»',
  [('"Yes."', 'YES.', 'реплика ZOE'), ('"Finally."', 'FINALLY.', 'облако ZOE, ярус 1')], 'облако светится, они берутся за руки', 'BG gym dance; ZOE; LEON; CLOUD')
S('''Leon doesn't read the rest.''', 'GYMDANCE',
  'Leon и Zoe медленно танцуют, облако над Zoe мелкими буквами продолжается, Leon смотрит ей в лицо и улыбается, не читает.',
  [], 'облако блёкнет, пара покачивается', 'BG gym dance; LEON; ZOE; CLOUD')
S('''All day Sunday, he watches Dad's cloud.''', 'LIVING',
  'Воскресенье, дом днём: Dad с газетой в кресле, Leon сидит рядом и украдкой смотрит на пустое место над его головой. Счётчик DAY 7.',
  [('Sunday,', 'DAY 7 · SUNDAY', 'счётчик дня')], 'Leon косится вверх, облако пока пустое', 'BG livingRoom; DAD; LEON; HUD', day=7)
S('''It says, "Did I water the plants?" It says, "Why is the lawn so green?"''', 'LIVING',
  'Над Dad облако (ярус 2): «DID I WATER THE PLANTS?» затем «WHY IS THE LAWN SO GREEN?» Leon поникает: не то.',
  [('"Did', 'DID I WATER THE PLANTS?', 'облако DAD, ярус 2'), ('"Why', 'WHY IS THE LAWN SO GREEN?', 'облако DAD, ярус 2')], 'облако меняет текст, Leon скучнеет', 'BG livingRoom; DAD; LEON; CLOUD', cut='E')
S('''It never says the thing.''', 'LIVING',
  'Часы на стене крутятся день к вечеру; облако над Dad со скучными мыслями «···»; Leon опускает голову на ладонь.',
  [], 'свет в окне меняется с дня на вечер', 'BG livingRoom; DAD; LEON; CLOUD; PROP wall clock')
S('''Eleven fifty-nine at night, the kitchen.''', 'KITCHENNIGHT',
  'Ночная кухня (темнее, тёплая лампа над столом), на стене часы 11:59 PM. Dad за столом с чашкой, Leon в дверях в пижаме.',
  [('fifty-nine', '11:59 PM', 'подпись времени')], 'свет приглушается, часы тикают', 'BG kitchen night; DAD; LEON; PROP wall clock; PROP tea',
  passport='''Кухня (kitchen.png) с затемнением и тёплым светом лампы. Dad сидит за столом на стуле, чашка стоит на столе. Leon стоит в дверях справа, босиком не рисуем, обычные кроссовки. Часы на стене показывают 11:59, видны.''')
S('''Dad sits with his tea. His cloud says, "Tell him. Tell him."''', 'KITCHENNIGHT',
  'Крупнее: Dad с чашкой, пар; над ним облако (ярус 2): «TELL HIM. TELL HIM.» Leon из дверей напряжённо смотрит на облако.',
  [('"Tell', 'TELL HIM.', 'облако DAD, ярус 2'), ('him.', 'TELL HIM.', 'облако DAD, ярус 2')], 'облако пульсирует, пар от чая', 'BG kitchen night; DAD; LEON; CLOUD; PROP tea')
S('''Leon watches the clock. Midnight.''', 'KITCHENNIGHT',
  'Крупно часы: секундная стрелка идёт к 12, потом колокольчик, стрелки сходятся на 12:00 AM; Leon смотрит на них.',
  [('Midnight.', '12:00 AM', 'подпись времени')], 'стрелка тикает, бой часов', 'BG kitchen night; LEON; PROP wall clock')
S('''Every cloud in the world disappears, and the kitchen is just a kitchen.''', 'KITCHENNIGHT',
  'Облако над Dad лопается тихими пузырьками; на полу у ног Biscuit тает её носок-облако; над Leon и так никогда ничего нет. Кадр успокаивается: просто кухня, просто двое.',
  [], 'облака лопаются с тихим хлопком, свет мягчает', 'BG kitchen night; DAD; LEON; BISCUIT; CLOUDS pop')
S('''Dad looks at his cup. Then he looks up.''', 'KITCHENNIGHT',
  'Dad смотрит в чашку, потом поднимает глаза на Leon.',
  [], 'взгляд из чашки на Leon', 'BG kitchen night; DAD; LEON')
S('''Out loud, with no cloud at all, he says, "Leon. I'm proud of you."''', 'KITCHENNIGHT',
  'Dad говорит вслух, над его головой нет облака. Пузырь реплики: «LEON. I\'M PROUD OF YOU.» (обычный речевой пузырь с хвостом ко рту).',
  [('"Leon.', 'LEON.', 'реплика DAD'), ('proud', 'I\'M PROUD OF YOU.', 'реплика DAD')], 'пузырь появляется без облака, мягкий свет', 'BG kitchen night; DAD; LEON',
  passport='''Над Dad нет облака (главное в кадре). Реплика только в виде речевого пузыря с хвостом к рту Dad. Лицо Leon видно, он смотрит на Dad.''')
S('''Leon grins. "I know." "How?" "Lucky guess."''', 'KITCHENNIGHT',
  'Leon улыбается: «I KNOW.»; Dad удивлённо: «HOW?»; Leon подмигивает зрителю: «LUCKY GUESS.»',
  [('"I', 'I KNOW.', 'реплика LEON'), ('"How?"', 'HOW?', 'реплика DAD'), ('"Lucky', 'LUCKY GUESS.', 'реплика LEON')], 'три реплики по очереди, подмигивание на «Lucky guess»', 'BG kitchen night; LEON; DAD')

# ============================ НАУКА, КОНЦОВКА ============================
S('''So, is any of this real? Kind of.''', 'VOID',
  'Void: Leon задумчиво поднимает палец, над ним большой вопросительный знак; затем «KIND OF» в плашке.',
  [('real?', 'IS ANY OF THIS REAL?', 'подпись'), ('Kind', 'KIND OF', 'подпись')], 'вопрос меняется на «KIND OF»', 'LEON; PROP card', day=0)
S('''In twenty twenty-three, researchers in Texas turned brain scans into rough sentences. But the person had to lie in a giant scanner for sixteen hours, and it only worked if they cooperated. Think about something else, and the machine fell apart. And here's the best part.''', 'VOID',
  'Мозг на сканере, из экрана выползают обрывки фраз; человек лежит в огромной трубе, часы «16 HOURS»; человек думает про уток, экран превращается в кашу.',
  [('twenty', '2023 · TEXAS', 'подпись'), ('sixteen', '16 HOURS', 'подпись'), ('cooperated.', 'MUST COOPERATE', 'подпись')], 'три короткие вставки', 'PROP brain scanner; PROP screen', cut='A')
S('''In nineteen ninety-eight, psychologists showed that people believe others can see their feelings far more than they really can.''', 'VOID',
  'Ребёнок краснеет, вокруг стрелки «все видят!» со стороны воображаемых зрителей; рядом реальный зал, где никто не смотрит. Подпись «1998».',
  [('ninety-eight,', '1998', 'подпись'), ('feelings', 'WHAT I THINK EVERYONE SEES', 'подпись')], 'стрелки прицеливаются на ребёнка, потом разворачиваются прочь', 'KID; PROP arrows; PROP eyes')
S('''It's called the illusion of transparency.''', 'VOID',
  'Ребёнок в стеклянной коробке, снаружи никто не смотрит; плашка «ILLUSION OF TRANSPARENCY».',
  [('illusion', 'THE ILLUSION OF TRANSPARENCY', 'плашка')], 'стекло исчезает, коробка не нужна', 'KID; PROP glass box; PROP card')
S('''Nobody is reading your mind. So say the thing out loud.''', 'HALL',
  'Коридор: дети без облаков, Leon стоит перед камерой, спокойный. На последних словах Leon подходит к зрителю и говорит вслух: речевой пузырь.',
  [('Nobody', 'NOBODY IS READING YOUR MIND', 'подпись'), ('say', 'SAY THE THING OUT LOUD.', 'реплика LEON')], 'облаков нет, Leon шагает к камере', 'BG hall; LEON; KIDS')
S('''So, what thought would you want to see above someone's head? Tell us in the comments.''', 'VOID',
  'Leon держит пустое облако над воображаемой головой и протягивает к зрителю; иконка комментария подпрыгивает.',
  [('thought', 'WHAT THOUGHT WOULD YOU WANT TO SEE?', 'подпись'), ('comments.', 'COMMENT BELOW', 'подпись')], 'иконка комментария подпрыгивает', 'LEON; PROP empty cloud; PROP comment icon')
S('''And if you want to see what everyone is thinking next week, hit subscribe.''', 'VOID',
  'Кнопка Subscribe и колокольчик; позади несколько детей, облака над ними с «SUBSCRIBE!»; Leon показывает на кнопку.',
  [('subscribe.', 'SUBSCRIBE', 'кнопка')], 'кнопка нажимается, колокольчик звенит', 'LEON; PROP subscribe; KIDS; CLOUDS')
S('''Biscuit's cloud, by the way, is still a sock.''', 'KITCHEN',
  'Кухня утром: Biscuit сидит, над ней облако с носком; Leon прикрывает лицо рукой (facepalm). Конец ролика.',
  [('sock.', 'STILL A SOCK', 'подпись')], 'носок качается, Biscuit виляет хвостом', 'BG kitchen; BISCUIT; LEON; PROP sock')
