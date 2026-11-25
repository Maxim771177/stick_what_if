// Сцены 40–78
import { S, L, LC, LW, Hz, Iv, Pp, Dn, G, GS, hang } from "/hybrid12/sckit.js";
const V = (col, icon, act = [], c = [100, -330, 1.0], extra = {}) => ({ pl: 'VOID', col, icon, act, c, ...extra });
const lieL = (x, o = {}) => L(x + 125, { f: 1, y: -46, p: 'lie', rot: -1.5708, ...o });
const far = (o = {}) => GS(6, -1700, -1250, { s: .42, f: 1, ...o });
// ---- лагерь Leon (за камнем) ----
S(40, { pl: 'BOYCAMP', c: [-80, -250, 1.0], pr: [{ k: 'bag', att: 'LEON_NC.hF', glow: .3, fr: true, dy: -20 }], act: [L(-650, { go: [[0, 2.6, 60]], p: 'pull', e: 'worried' }), far()] });
S(41, { pl: 'BOYCAMP', c: [[-50, -250, 1.25], [-50, -260, 1.4]], pr: [{ k: 'bed', x: -250, y: 0 }, { k: 'flag', x: -420, y: 0, col: '#4aa6d8' }], act: [L(-60, { f: 1, p: 'wave', e: [[0, 'smile'], [1.2, 'nervous']] })] });
S(42, { pl: 'BOYCAMP', c: [-120, -200, 1.45], pr: [{ k: 'bed', x: -120, y: 0, s: 1.5 }], act: [lieL(-120, { e: 'smile', p: 'lie' })] });
S(43, { pl: 'BOYCAMP', c: [-100, -250, 1.2], pr: [{ k: 'bed', x: -250, y: 0 }, { k: 'branch', x: 80, y: 0 }, { k: 'branch', x: -430, y: 0, rot: .5 }, { k: 'bag', x: 160, y: -30, glow: .2, s: 1.2, rot: 1.2 }, { k: 'branch', x: [[1, -120], [1.7, 120]], y: [[1, -150], [1.35, -330], [1.7, -20]], rot: [[1, 0], [1.7, 6]], a0: 1, a1: 1.8 }], act: [L(-120, { f: 1, p: [[0, 'stand'], [.9, 'cheer']], e: 'joy' })] });
S(44, { pl: 'BOYCAMP', c: [300, -240, 1.1], pr: [{ k: 'crackers', att: 'P.hB', fr: true, dy: 20, s: 1.5 }], sp: '', act: [Pp(850, { f: -1, s: .8, p: 'holdFront', pr: 'cracker', e: 'happy' }), L(-100, { f: 1, p: 'stand', e: 'sad', lk: [.95, 0] })] });
S(45, { pl: 'BOYCAMP', c: [900, -340, 0.98], pr: [{ k: 'sign', x: 1180, y: 0, t: 'MINE' }], act: [L(780, { f: 1, p: 'pointUpF', e: 'joy', lk: [.5, -.9] })] });
S(46, { pl: 'BOYCAMP', c: [950, -300, 1.1], pr: [{ k: 'coconut', x: 1048, y: [[0, -650], [1.9, -650], [2.15, -300], [2.3, -250], [2.55, -20]], s: 1.6 }, { k: 'stars', att: 'LEON_NC.head', fr: true, a0: 2.2, dy: -60 }, { k: 'sign', x: 1200, y: 0, t: 'MINE' }],
  act: [L(1020, { f: 1, p: [[0, 'pointUpF'], [2.0, 'stand'], [2.3, 'fall']], rot: [[0, 0], [2.3, 0], [2.9, -1.3]], e: [[0, 'joy'], [2.2, 'shocked']], lk: [.5, -.9] })] });
S(47, { pl: 'BOYCAMP', tone: 'night', c: [-120, -230, 1.3], tide: [[0, -1300], [2.6, -60]], pr: [{ k: 'bed', x: -120, y: 0 }, { k: 'moon', x: 100, y: -700, glow: true }, { k: 'zzz', att: 'LEON_NC.head', fr: true, a1: 1.5, dy: -40 }], act: [lieL(-120, { e: [[0, 'sleepy'], [1.6, 'shocked']], p: [[0, 'lie'], [1.6, 'lie']] })] });
S(48, { pl: 'BOYCAMP', tone: 'night', c: [-40, -230, 1.2], tide: 700, pr: [{ k: 'bed', under: true, x: -120, y: 16, rot: [[0, -.03], [1, .03], [2, -.03]] }, { k: 'moon', x: 100, y: -700, glow: true }, { k: 'foam', x: -330, y: 6, w: 240 }], act: [L(-120, { f: 1, y: -72, p: 'sitG', e: 'shocked', z: 99 })] });
S(49, V('#9fd8ff', 'waves', [], [0, -300, 1.0]));
S(50, { pl: 'BOYCAMP', c: [-420, -230, 1.2], tide: -650, pr: [{ k: 'bed', x: -700, y: -10 }, { k: 'wave', x: [[0, -830], [2.0, -560]], y: 6, s: .9, eyes: 1, a0: .4 }], act: [L(-450, { f: -1, p: 'stand', e: 'confused', lk: [-.9, .3] })] });
S(51, V('#fff0b8', 'real', [], [0, -300, 1.0]));
// ---- прилив (план) ----
S(52, { pl: 'TIDEL', c: [0, 0, 1.0], act: [] });
S(53, { pl: 'TIDEL', c: [-200, -60, 1.0], act: [L(-760, { s: .75, go: [[0, 2.2, -520, 40], [2.2, 3.2, -420, -120]], p: 'pull', e: 'worried' })], pr: [{ k: 'bed', att: 'LEON_NC.hF', s: .6, dx: -70, dy: 20 }, { k: 'excl', x: -420, y: -250, a: 3.0, a0: 3.0 }] });
S(54, { pl: 'TIDEL', c: [[0, 140, 1.0], [0, -330, 1.0]], act: [] });
S(55, { pl: 'TIDEL', c: [0, -60, 1.0], act: [], fgx: (c, u) => { const k = Math.min(1, u / 2.4); c.save(); c.strokeStyle = '#e0242b'; c.lineWidth = 22; c.lineCap = 'round'; c.beginPath(); c.moveTo(-200, 230); c.lineTo(-200, 230 - 560 * k); c.stroke(); c.restore(); } });
// ---- пляж: Hazel не слушает ----
S(56, { pl: 'BEACH', c: [100, -250, 1.2], act: [LW(-500, { go: [[0, 2.4, 160]], run: true, e: 'scared' }), ...GS(8, 450, 980, { f: -1, each: (i, a) => ({ e: [[0, 'smile'], [1.7, 'surprised']], lk: [[0, [-.5, 0]], [1.7, [-.9, -.3]]] }) })] });
S(57, { pl: 'BEACH', c: [450, -260, 1.15], sp: 'LEON_NCW', act: [LW(250, { f: 1, p: 'point', e: 'worried', tk: [0, 3.2] }), Hz(560, { f: -1, e: 'neutral', lk: [-.1, 0] }), ...GS(8, 700, 1000, { f: -1, each: (i, a) => ({ lk: [-.5 * (i % 2 ? 1 : -1), .0] }) })] });
S(58, { pl: 'BEACH', c: [560, -200, 1.4], pr: [{ k: 'rock', x: 700, y: 0, s: .34, col: '#9a9aa6' }, { k: 'map', x: 700, y: -126, s: .5, draw: [[0, .1], [4.5, 1]], rot: -.05 }], act: [Hz(510, { f: 1, p: 'sitG', e: 'neutral', lk: [.6, .6] }), L(80, { f: 1, p: 'stand', e: 'worried' })] });
S(59, { pl: 'BEACH', c: [680, -150, 2.2], sp: 'H', pr: [{ k: 'rock', x: 700, y: 0, s: .34, col: '#9a9aa6' }, { k: 'map', x: 700, y: -126, s: .5, boy: 1, draw: 1, rot: -.05 }], act: [Hz(510, { f: 1, p: 'sitG', e: 'neutral', lk: [.6, .6] })] });
S(60, { pl: 'BEACH', c: [-100, -250, 1.2], act: [L(-120, { f: -1, go: [[0, 1.8, -520]], p: 'sad', e: 'sad' })] });
S(61, { pl: 'BEACH', c: [-350, -240, 1.25], dark: [[0, 0], [4.5, .55]], act: [L(-250, { f: -1, p: 'stand', e: [[0, 'neutral'], [2, 'worried']], lk: [-.9, -.1] })] });
S(62, { pl: 'BEACH', c: [300, -270, 1.1], pr: [{ k: 'cloud', x: 560, y: -720, s: 1.2, col: '#7a8498' }], act: [L(-120, { f: 1, p: 'pointUpF', e: 'worried', lk: [.4, -.8] }), ...GS(8, 380, 980, { f: -1, p: 'sitG', e: 'happy' })] });
S(63, { pl: 'TIDEL', c: [0, -90, 1.0], act: [L(-780, { s: .75, f: 1, p: 'pointUpF', y: -270, e: 'worried' })], fgx: (c, u) => { const k = Math.min(1, u / 2.8); c.save(); c.strokeStyle = '#e0242b'; c.lineWidth = 22; c.lineCap = 'round'; c.beginPath(); c.moveTo(-20, 230); c.lineTo(-20, 230 - 340 * k); c.stroke(); c.restore(); } });
S(64, V('#b9e6ff', 'drop', [], [0, -300, 1.0]));
S(65, { pl: 'BEACH', c: [60, -270, 1.35], pr: [{ k: 'bottle', att: 'P.hF', fr: true, s: 1.5, dy: -10, lv: .9 }], act: [Pp(300, { f: -1, p: 'wave', e: 'joy' }), L(-170, { f: 1, p: 'stand', e: 'worried', lk: [.9, -.3] })] });
S(66, { pl: 'BEACH', c: [-250, -260, 1.25], sp: 'P', act: [Pp(-80, { f: -1, p: 'point', e: 'joy', tk: [0, 2.2] }), L(220, { f: -1, p: 'stand', e: 'worried' })] });
S(67, { pl: 'BEACH', c: [-30, -260, 1.3], pr: [{ k: 'bottle', att: 'P.hF', fr: true, s: 1.5, a1: 1.75, dy: -10, lv: .9 }, { k: 'bottle', a0: 1.75, s: 1.5, lv: .9, x: [[1.75, 90], [2.7, -520]], y: [[1.75, -220], [2.15, -420], [2.7, 0]], rot: [[1.75, 0], [2.7, -9]] }],
  act: [Pp(200, { f: -1, p: [[0, 'stand'], [.6, 'holdFront']], e: 'happy' }), L(-380, { f: 1, go: [[.3, 1.6, 80]], p: [[0, 'stand'], [1.6, 'reach']], e: 'determined', lk: [1, 0] })] });
S(68, V('#ffe8a8', 'puddle', [], [380, -300, 1.0]));
S(69, V('#ffe9a8', 'kidney', [], [300, -300, 1.0]));
S(70, V('#cfeeff', 'glass', [L(-440, { s: 1.3, f: 1, e: [[0, 'smile'], [2, 'sad']] })], [300, -300, 1.0]));
S(71, V('#ffe0b0', 'real', [Pp(380, { s: 1.8, f: 1, e: 'sad', p: 'sad', tk: [0, 2] })], [380, -300, 1.0], { icon: null }));
S(72, { pl: 'BEACH', c: [250, -260, 1.25], sp: 'H', pr: [{ k: 'bottle', att: 'P.hB', dx: -22, dy: -6, fr: false, s: 1.3, lv: .9 }], act: [L(-100, { f: 1, p: 'explain', e: 'worried', tk: [0, 1.8] }), Hz(180, { f: -1, p: 'relaxed', e: 'angry', tk: [.9, 2.4] }), Pp(520, { f: -1, p: 'stand', e: 'nervous' })] });
// ---- лагерь ночью/утром ----
S(73, { pl: 'CAMPN', tone: 'night', fx: ['rain'], c: [-250, -250, 1.15], pr: [{ k: 'tarp', x: -250, y: 0, drips: 1, sag: 60 }, { k: 'bottles', x: -330, y: 0, n: 4, lv: [[0, .05], [4, .8]] }], act: [L(-60, { f: -1, p: 'reach', e: 'determined' })] });
S(74, { pl: 'CAMPN', tone: 'morning', c: [-220, -200, 1.35], pr: [{ k: 'bottles', x: -420, y: 0, n: 6, lv: .9 }, { k: 'sun', x: -100, y: -640 }, { k: 'tarp', x: -300, y: 0, sag: 40 }], act: [] });
S(75, { pl: 'CAMPN', tone: 'morning', c: [-200, -250, 1.3], pr: [{ k: 'bottle', att: 'H.hF', fr: true, s: 1.4, dy: -14, lv: [[0, .8], [1.2, .3]] }], act: [Hz(-60, { f: -1, p: [[0, 'holdFront'], [.8, 'holdFront']], e: 'neutral' }), L(-420, { f: 1, p: 'stand', e: [[0, 'smile'], [2, 'sad']], lk: [.9, 0] })] });
S(76, { pl: 'CAMPN', tone: 'morning', c: [-200, -250, 1.3], sp: 'P', pr: [{ k: 'bottle', att: 'P.hF', fr: true, s: 1.4, dy: -14, lv: [[0, .8], [1.2, .3]] }], act: [Pp(-60, { f: 1, p: [[0, 'holdFront'], [1.6, 'cheer']], e: [[0, 'smile'], [1.6, 'joy']], tk: [1.5, 3.6] })] });
S(77, { pl: 'CAMPN', tone: 'morning', c: [-230, -250, 1.4], pr: [{ k: 'bottle', att: 'I.hF', fr: true, s: 1.4, dy: -14, lv: [[0, .8], [1.5, .4]] }], act: [Iv(-80, { f: -1, p: [[0, 'holdFront'], [2, 'holdFront']], e: [[0, 'neutral'], [2.4, 'smile']], lk: [-.9, 0] }), L(-400, { f: 1, p: 'stand', e: [[0, 'neutral'], [2.8, 'smile']], lk: [.9, 0] })] });
S(78, { pl: 'CAMPN', tone: 'morning', c: [-230, -250, 1.35], pr: [{ k: 'bubble', att: 'LEON_NC.head', dx: -30, dy: -270, s: .8, a: .4, w: 130, h: 80 }, { k: 'heart', att: 'LEON_NC.head', dx: -30, dy: -270, s: 1, a: .6 }], act: [Iv(-80, { f: -1, p: 'stand', e: 'smile' }), L(-400, { f: 1, p: 'stand', e: 'smile', lk: [.9, 0] })] });
