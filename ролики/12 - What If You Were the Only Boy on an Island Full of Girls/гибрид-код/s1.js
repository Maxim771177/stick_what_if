// Сцены 1–39
import { S, L, LC, LW, Hz, Iv, Pp, Dn, G, GS, hang } from "/hybrid12/sckit.js";
const B = (o = {}) => ({ x: 0, y: -120, s: 1, ...o });                // катер: палуба на мировой y=-120
const crowd = (o = {}) => [GS(16, -1010, -520, { ob: true, f: 1, ...o }), Hz(-420, { ob: true, f: 1, ...o }), Pp(-340, { ob: true, f: 1, ...o }), Iv(-260, { ob: true, f: 1, ...o })];
const cough = [[0, 0], [.95, 0], [1.02, -.018], [1.14, .014], [1.3, 0], [1.75, 0], [1.82, -.02], [1.96, .016], [2.2, 0]];
// ---- палуба ----
S(1, { pl: 'DECK', c: [-150, -330, .72], boat: B({ tilt: cough, smoke: true }), act: [crowd({ e: 'worried' }), LC(-150, { ob: true, f: 1, e: 'worried' })] });
S(2, { pl: 'DECK', c: [-250, -300, .72], boat: B({ tilt: [[0, 0], [.55, 0], [.8, .2], [4, .21]] }), pr: [{ k: 'rock', x: 760, y: [[0, 300], [.65, 95]], s: .65 }],
  act: [GS(16, -1010, -520, { ob: true, f: 1, p: [[0, 'stand'], [.6, 'handsOnHead']], e: 'scared' }), Hz(-420, { ob: true, f: 1, p: 'handsOnHead', e: 'angry' }), Pp(-340, { ob: true, f: 1, p: 'handsOnHead', e: 'scared' }), Iv(-260, { ob: true, f: 1, p: 'handsOnHead', e: 'scared' }), LC(-150, { ob: true, f: 1, p: [[0, 'stand'], [.6, 'handsOnHead']], e: 'shocked' })] });
S(3, { pl: 'DECK', c: [[-950, -150, 1.0], [-450, -150, 1.1]], boat: B({ tilt: .2 }), act: [hang(16, -1060, -470, { f: 1, e: 'scared' }), Hz(-420, { ob: true, f: 1, p: 'hang', y: 210, e: 'angry' }), Pp(-340, { ob: true, f: 1, p: 'hang', y: 210, e: 'scared' }), Iv(-260, { ob: true, f: 1, p: 'hang', y: 210, e: 'scared' })] });
S(4, { pl: 'DECK', c: [-480, -230, 1.0], boat: B({ tilt: .12 }), pr: [{ k: 'ring', ob: true, att: 'LEON.head', r: 150, fr: true }, { k: 'ticket', ob: true, att: 'LEON.hF', fr: true, dy: 40 }],
  act: [hang(16, -1060, -540, { f: 1, e: 'scared', lk: [.6, -.2] }), Hz(-480, { ob: true, f: 1, p: 'hang', y: 210, e: 'angry' }), Iv(-420, { ob: true, f: 1, p: 'hang', y: 210, e: 'scared' }), LC(-250, { ob: true, f: 1, p: [[0, 'stand'], [.8, 'wave'], [3, 'shrug']], e: 'worried' })] });
S(5, { pl: 'DECK', c: [450, -250, .85], boat: B({ tilt: .1 }), pr: [{ k: 'dunnBoat', x: 1300, y: 50, s: 1.3 }], act: [crowd({ e: 'worried' }), LC(-150, { ob: true, f: 1, e: 'worried' }), Dn(330, { x: 330, y: -85, go: [[0, .5, 780, -330], [.5, 1.0, 1290, -20]], p: [[0, 'jump'], [1.0, 'stand']], nowalk: true, e: 'determined' })] });
S(6, { pl: 'SEA', c: [-450, -260, .78], boat: { x: -950, y: -45, s: .45, tilt: .06 }, wy: 20, pr: [{ k: 'dunnBoat', x: [[0, -200], [3.5, 1100]], y: 28, s: 1.3 }, { k: 'paddle', att: 'D.hF', rot: [[0, .5], [.4, -.4], [.8, .5], [1.2, -.4], [1.6, .5], [2, -.4], [2.4, .5], [2.8, -.4], [3.2, .5]], fr: true }],
  act: [GS(16, -1380, -1130, { ob: true, f: 1, p: 'wave' }), LC(-1000, { ob: true, f: 1, p: 'wave', e: 'worried' }), Dn(-200, { x: [[0, -200], [3.5, 1100]], y: -20, p: 'pull', f: 1, e: 'joy', tk: [0, 3.5] })], sp: 'D' });
S(7, { pl: 'DECK', c: [[-250, -250, 1.1], [-170, -230, 1.45]], boat: B({ tilt: .03 }), pr: [{ k: 'bag', ob: true, x: -90, y: -40, glow: .3, a1: 1.05 }, { k: 'bag', att: 'LEON.hF', at0: 1.05, glow: [[0, .3], [3, 1]], ob: true, fr: true, dy: -30, s: 1.3 }],
  act: [GS(6, -980, -620, { ob: true, f: 1, p: 'handsOnHead', e: 'worried', s: .9 }), LC(-250, { ob: true, f: 1, p: [[0, 'stand'], [.7, 'reach'], [1.3, 'holdFront']], e: [[0, 'neutral'], [1.3, 'smile']] })] });
S(8, { pl: 'DECK', c: [[-250, -280, 1.2], [-420, -80, 1.15]], boat: B({ tilt: .03 }), pr: [{ k: 'cap', s: 2.0, x: [[0, -230], [.45, -330], [1.0, -520], [1.4, -700]], y: [[0, -340], [.5, -420], [1.2, -150], [1.5, 12]], rot: [[0, 0], [1.4, 5]] }],
  act: [LC(-250, { ob: true, f: 1, p: 'stand', e: 'surprised', a1: .01 }), L(-250, { ob: true, f: 1, p: 'stand', e: 'surprised', a0: .01 })] });
S(9, { pl: 'DECK', c: [-600, -80, 1.3], boat: B({ tilt: .02 }), pr: [{ k: 'cap', x: -640, y: [[0, 18], [1.2, 18], [2, -150]], s: 2.0 }, { k: 'paddle', x: [[0, -900], [1.2, -690]], y: [[0, -120], [1.2, 0], [2, -120]], rot: .5 }],
  act: [L(-250, { ob: true, f: 1, p: 'stand', e: 'worried', lk: [-.8, .5] })] });
S(10, { pl: 'DECK', c: [-350, -250, 1.35], boat: B({ tilt: .02 }), pr: [{ k: 'paddle', ob: true, att: 'I.hB', rot: 1.4 }, { k: 'cap', att: 'I.hF', fr: true, ob: true, s: 1.2 }], sp: '',
  act: [Iv(-400, { ob: true, f: 1, p: 'holdFront', e: 'neutral' }), L(-150, { ob: true, f: -1, p: 'stand', e: [[0, 'neutral'], [2.5, 'nervous']] })] });
S(11, { pl: 'DECK', c: [[-280, -230, 1.7], [-280, -230, 1.95]], boat: B({ tilt: .02 }), pr: [{ k: 'cap', att: 'I.hF', fr: true, ob: true, s: 1.2 }],
  act: [Iv(-400, { ob: true, f: 1, p: 'holdFront', e: 'neutral' }), L(-170, { ob: true, f: -1, p: 'stand', e: 'nervous' })] });
// ---- инфо-плашки ----
const V = (col, icon, act = [], c = [100, -330, 1.0], extra = {}) => ({ pl: 'VOID', col, icon, act, c, ...extra });
S(12, V('#ffe08a', 'island', [L(-380, { s: 1.35, e: 'worried', p: 'stand' }), GS(16, 330, 760, { s: .5, y: -48, f: -1, e: 'smile' })], [150, -330, 1.0]));
S(13, V('#ffd9a8', 'hourglass', [L(-440, { s: 1.35, e: 'worried', f: 1, lk: [.8, -.3] })]));
S(14, V('#ffe9b8', 'cards3', [], [0, -300, 1.0]));
S(15, { pl: 'BEACH', c: [-420, -250, 1.3], act: [L(-250, { f: -1, p: 'stand', e: 'sad' })] });
S(16, { pl: 'BEACH', c: [-780, -170, 1.15], pr: [{ k: 'radio', under: true, x: -1040, y: [[0, -230], [1.0, -70], [2.8, 420]], rot: [[0, .3], [3, 1.6]], s: 1.4 }], act: [L(-480, { f: -1, p: 'sad', e: 'worried' })] });
S(17, { pl: 'BEACH', c: [100, -240, 1.0], act: [L(-250, { f: 1, p: [[0, 'relaxed'], [1.4, 'shrug']], e: 'worried', lk: [[0, [.8, 0]], [1.2, [-.8, 0]]] }), GS(16, 650, 1150, { s: .55, f: -1 })] });
S(18, V('#ffe9a8', 'threes', [], [0, -300, 1.0]));
S(19, V('#cdeeff', 'balloon', [L(-400, { s: 1.35, f: 1, e: [[0, 'neutral'], [1.2, 'angry']], p: 'stand' })], [100, -330, 1.0]));
S(20, V('#ffe9b8', 'bottleSand', [L(-420, { s: 1.35, e: 'sad', f: 1 })]));
S(21, V('#ffe0e0', 'plateFork', [L(-440, { s: 1.35, e: 'sad', f: 1, p: 'stand' })]));
S(22, V('#9aa8c4', 'storm', [LW(-320, { s: 1.35, e: 'scared', f: 1, p: 'crossArms' })], [100, -330, 1.0], { fx: ['rain'] }));
S(23, V('#d6f0d8', 'thumb', [L(-420, { s: 1.35, e: 'smile', f: 1, p: 'shrug' })]));
S(24, V('#ffe9b8', 'shelterWater', [], [320, -300, 1.0]));
// ---- пляж: правила Hazel ----
const camp = (o = {}) => GS(10, 380, 980, { f: -1, ...o });
S(25, { pl: 'BEACH', c: [250, -260, 1.0], pr: [{ k: 'shelter', x: 1150, y: 0, build: [[0, .15], [5.5, 1]], s: .9 }, ...[1, 2, 3, 4].map(i => ({ k: 'branch', att: 'G' + i + '.hF', fr: true, dy: -10 })), { k: 'bag', att: 'LEON_NC.hF', glow: .3, fr: true, dy: -20, dx: [[0, 0], [1, 10], [2, -8], [3, 10]], s: 1.3 }],
  act: [L(-300, { f: 1, p: 'holdFront', e: 'worried' }), ...[1, 2, 3, 4].map(i => G(i, 420 + i * 70, { f: 1, p: 'holdFront', go: [[0, 2.5, 1060], [2.5, 3.2, 1060], [3.2, 5.6, 460 + i * 70]], e: 'smile' })), ...GS(4, 500, 800, { from: 5, f: -1, p: 'sitG' })] });
S(26, V('#ffd0d0', 'cards1', [], [0, -300, 1.0]));
S(27, { pl: 'BEACH', c: [110, -270, 1.25], pr: [{ k: 'sonic', att: 'H.head', dx: 80, dy: 20, u0: 0.1 }], act: [Hz(300, { f: -1, s: 1.1, p: 'talk', e: 'shocked', tk: [0, 4.2] }), L(-120, { s: 1.0, f: 1, e: 'worried', p: 'stand' })] });
S(28, { pl: 'BEACH', c: [250, -250, 1.2], act: [Hz(450, { f: -1, p: 'point', e: 'angry', tk: [0, 2], lk: [-.6, .3] }), L(-120, { f: 1, p: 'stand', e: [[0, 'neutral'], [1.2, 'worried']] }), ...GS(6, 650, 950, { f: -1 })] });
S(29, { pl: 'BEACH', c: [[100, -250, 1.1], [500, -250, 1.1]], act: [Hz(300, { f: 1, p: 'point', e: 'determined', tk: [0, 2.3] }), ...GS(8, 600, 1000, { f: -1 })] });
S(30, { pl: 'BEACH', c: [450, -270, 1.1], act: [Hz(400, { f: -1, p: 'pointUpF', e: 'angry', tk: [0, 2.3] }), ...GS(8, 620, 1050, { f: -1, each: (i, a) => i < 2 ? { p: [[0, 'stand'], [1 + i * .3, 'wave']] } : {} })] });
S(31, { pl: 'BEACH', c: [100, -250, 1.5], pr: [{ k: 'bag', att: 'LEON_NC.hF', a1: .9, glow: .3, fr: true, dy: -20, s: 1.3 }, { k: 'bag', att: 'LEON_NC.hB', at0: .9, glow: .3, fr: false, dx: -34, dy: -12, s: 1.2 }],
  act: [L(-120, { f: 1, p: [[0, 'holdFront'], [.9, 'stand']], e: [[0, 'neutral'], [.9, 'nervous']] }), Hz(180, { f: -1, p: 'crossArms', e: 'angry', lk: [[0, [-.8, .3]], [.9, [-.8, .4]]] })] });
S(32, { pl: 'BEACH', c: [130, -250, 1.3], pr: [{ k: 'bag', att: 'LEON_NC.hF', glow: .3, fr: true, dy: -20, s: 1.3 }], sp: 'H',
  act: [L(-190, { f: 1, p: 'holdFront', e: 'sad' }), Hz(100, { f: -1, p: 'point', e: 'angry', tk: [0, 3.8] }), Pp(420, { f: -1, p: 'stand', pr: 'cracker', e: 'happy' })] });
S(33, { pl: 'BEACH', c: [250, -330, 1.0], pr: [{ k: 'sun', x: 520, y: -760 }], act: [Hz(350, { f: 1, p: 'pointUpF', e: 'determined', tk: [0, 2], lk: [.4, -.9] }), L(-150, { f: 1, p: 'stand', e: [[0, 'neutral'], [1.6, 'nervous']] })] });
const log = { k: 'log', x: 260, y: 0, len: 340 };
S(34, { apr: 0, pl: 'BEACH', c: [550, -250, 1.1], pr: [log], act: [Hz(260, { f: 1, y: -64, p: [[0, 'crouch'], [.4, 'jump'], [.7, 'stand']], e: 'determined' }), ...GS(14, 480, 980, { f: -1 }), L(1120, { f: -1, e: 'worried' })] });
S(35, { apr: 0, pl: 'BEACH', c: [550, -250, 1.1], pr: [log], act: [Hz(260, { f: 1, y: -64, p: 'reach', e: 'determined', tk: [0, 2.5] }), ...GS(14, 480, 980, { f: -1 }), L(1120, { f: -1, e: 'worried' })] });
S(36, { apr: 0, pl: 'BEACH', c: [500, -270, 0.98], pr: [log], act: [Hz(260, { f: 1, y: -64, p: [[0, 'reach'], [.4, 'vote']], e: 'joy' }), ...GS(16, 430, 1000, { f: -1, rx: .4 }), Pp(1060, { f: -1, e: 'happy', pr: 'cracker' }), L(1250, { f: -1, p: 'sad', e: 'sad' })] });
S(37, { apr: 0, pl: 'BEACH', c: [300, -240, 1.35], pr: [{ k: 'crackers', x: 420, y: 0, a0: 0 }], act: [Pp(300, { f: 1, s: 1.4, p: 'holdFront', pr: 'cracker', e: 'happy', tk: [0, 3] })] });
S(38, { apr: 0, pl: 'BEACH', c: [100, -250, 1.4], act: [Iv(330, { f: -1, p: [[0, 'stand'], [2.4, 'vote']], e: 'worried', lk: [-.1, .9], z: 0 }), L(-50, { f: 1, p: 'stand', e: 'worried', lk: [.9, 0] })] });
S(39, { pl: 'BEACH', c: [-150, -250, 1.4], pr: [{ k: 'cloud', x: -330, y: -560, s: 1.1, col: '#6a7488' }], act: [L(-150, { f: 1, p: 'sad', e: 'sad' })] });
