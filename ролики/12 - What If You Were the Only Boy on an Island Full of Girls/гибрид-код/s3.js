// Сцены 79–122
import { S, L, LC, LW, Hz, Iv, Pp, Dn, G, GS, hang } from "/hybrid12/sckit.js";
const V = (col, icon, act = [], c = [100, -330, 1.0], extra = {}) => ({ pl: 'VOID', col, icon, act, c, ...extra });
const sand = x => x;
S(79, V('#ffd9a8', 'raftIcon', [], [380, -300, 1.0]));
// ---- плот и течение ----
S(80, { pl: 'CHAN', c: [-500, -300, 1.1], act: [L(-900, { f: 1, p: 'stand', e: 'worried', lk: [.9, -.1] })] });
S(81, { pl: 'BEACH', c: [100, -250, 1.15], pr: [{ k: 'lamp', att: 'LEON_NC.head', dy: -230, a: 2.0, a0: 2.0, s: 1.1 }], act: [L(-300, { f: 1, p: [[0, 'stand'], [1.6, 'crossArms'], [2.1, 'point']], e: [[0, 'neutral'], [1.6, 'angry']], lk: [[0, [.9, 0]], [1.4, [-.2, 0]]] }), Hz(950, { f: -1, s: .55, p: 'stand' })] });
S(82, { pl: 'CHAN', c: [-600, -220, 1.2], pr: [{ k: 'barrel', x: -640, y: 44, a0: .7 }, { k: 'barrel', x: -490, y: 44, a0: 1.0 }, { k: 'barrel', x: -340, y: 44, a0: 1.3 }, { k: 'rope', x: -620, y: -4, a0: 1.8, s: 1.2 }, { k: 'rope', x: -380, y: -4, a0: 2.2, s: 1.2 }, { k: 'plank', x: -490, y: -60, a0: 3.8, rot: [[3.8, -.4], [4.2, 0]], s: 1.0 }],
  act: [L(-900, { f: 1, p: [[0, 'holdFront'], [1.5, 'reach'], [3, 'holdFront']], e: 'determined' })] });
S(83, { pl: 'CHAN', c: [[-500, -230, 1.1], [100, -230, 1.1]], pr: [{ k: 'raft', x: [[0, -500], [4.5, 400]], y: 28, s: 1 }, { k: 'pole', att: 'LEON_NC.hF', fr: true, rot: .4 }], act: [L(-500, { x: [[0, -500], [4.5, 400]], y: -42, f: 1, p: 'point', e: 'determined' })] });
S(84, { pl: 'CHAN', c: [320, -230, 1.1], pr: [{ k: 'raft', x: 400, y: 28, rot: [[0, 0], [2.6, .22]] }, { k: 'pole', att: 'LEON_NC.hF', fr: true, rot: .2 }], act: [L(400, { y: -44, f: 1, p: 'point', e: 'surprised' })] });
S(85, { pl: 'CHAN', c: [[420, -230, 1.0], [1000, -230, 1.0]], pr: [{ k: 'raft', x: [[0, 480], [2.4, 1100]], y: 28 }], act: [L(480, { x: [[0, 480], [2.4, 1100]], y: -44, f: 1, p: 'stand', e: 'worried' })] });
S(86, V('#9fd8ff', 'arrowsOut', [], [-100, -300, 1.0]));
S(87, V('#fff0b8', 'real', [], [0, -300, 1.0]));
S(88, V('#d6f0ff', 'pie', [], [200, -300, 1.0]));
S(89, V('#ffe9b8', 'xcheck', [], [350, -300, 1.0]));
S(90, { pl: 'CHAN', c: [[800, -230, .95], [1700, -230, .95]], pr: [{ k: 'raft', x: [[0, 1000], [4.8, 1900]], y: 28 }, { k: 'pole', att: 'LEON_NC.hF', fr: true, rot: -.5 }], act: [L(1000, { x: [[0, 1000], [4.8, 1900]], y: -44, f: -1, p: 'pull', e: 'determined' })],
  fgx: (c, u, ST) => { c.save(); c.translate(0, -420); const x0 = 1300 + u * 150; c.strokeStyle = '#2fb74a'; c.lineWidth = 16; c.beginPath(); c.moveTo(x0, 0); c.lineTo(x0 - 160, 0); c.stroke(); c.fillStyle = '#2fb74a'; c.beginPath(); c.moveTo(x0 - 160, -30); c.lineTo(x0 - 220, 0); c.lineTo(x0 - 160, 30); c.fill(); c.strokeStyle = '#e0242b'; c.lineWidth = 26; c.beginPath(); c.moveTo(x0 + 140, 60); c.lineTo(x0 + 520, 60); c.stroke(); c.fillStyle = '#e0242b'; c.beginPath(); c.moveTo(x0 + 520, 20); c.lineTo(x0 + 600, 60); c.lineTo(x0 + 520, 100); c.fill(); c.restore(); } });
S(91, { pl: 'CHAN', c: [1700, -260, 1.1], pr: [{ k: 'raft', x: [[0, 1560], [4.6, 1720]], y: 28 }, { k: 'lamp', att: 'LEON_NC.head', dy: -230, a: .5, a0: .5 }, { k: 'bubble', att: 'LEON_NC.head', dx: 260, dy: -240, s: .7, a: 1.6, w: 150, h: 90, a0: 1.6 }], act: [L(1600, { x: [[0, 1560], [4.6, 1720]], y: -44, f: -1, p: 'stand', e: [[0, 'worried'], [.5, 'surprised'], [1.6, 'smile']] })] });
S(92, { pl: 'CHAN', c: [[1600, -200, .95], [0, -200, .95]], pr: [{ k: 'raft', x: [[0, 1700], [4.8, 2100]], y: 28 }], act: [L(1700, { x: [[0, 1700], [.8, 1560], [4.6, -400]], y: [[0, -44], [.8, -110], [1.1, 30]], f: -1, p: [[0, 'stand'], [.5, 'jump'], [1.1, 'dive']], rot: [[1.05, 0], [1.3, 1.5708]], e: 'determined', nowalk: true })] });
S(93, { pl: 'CHAN', c: [500, -190, .56], pr: [{ k: 'raft', x: [[0, 1600], [4.7, 2300]], y: 28, broken: [[0, 0], [1.3, .1], [4.7, 1]] }], act: [L(-950, { f: 1, p: 'stand', e: 'sad', lk: [.9, 0] })] });
S(94, { pl: 'BEACH', c: [-450, -200, 1.25], pr: [{ k: 'cap', att: 'I.hF', fr: true, s: 1.2 }], act: [LW(-1000, { x: [[0, -1000], [3, -500]], y: -30, f: 1, p: 'crawl', nowalk: true, e: 'sad', z: 5 }), Iv(-130, { f: -1, p: [[0, 'sit'], [2.7, 'holdFront']], e: [[0, 'neutral'], [2.7, 'surprised']], lk: [-.9, 0] })] });
S(95, { pl: 'BEACH', c: [-170, -230, 1.45], sp: 'I', pr: [{ k: 'cap', att: 'I.hF', fr: true, s: 1.2 }], act: [Iv(-80, { f: -1, p: 'holdFront', e: 'cry', tk: [0, 3] }), LW(-420, { f: 1, p: 'sit', e: 'sad' })] });
S(96, { pl: 'BEACH', c: [150, -250, 1.15], sp: 'H', act: [Hz(900, { go: [[0, 2.2, 200]], f: -1, p: 'crossArms', e: 'angry', tk: [2.2, 3.5] }), LW(-280, { f: 1, p: 'sit', e: 'worried', lk: [.9, 0] }), Iv(-160, { f: -1, p: 'sit', e: 'worried', lk: [.9, 0] }), ...GS(6, 700, 1050, { f: -1, e: 'neutral' })] });
S(97, { pl: 'BEACH', c: [50, -250, 1.3], pr: [{ k: 'bottle', att: 'I.hF', fr: true, s: 1.4, dy: -12, lv: .5 }], act: [Iv(60, { f: -1, p: [[0, 'holdFront'], [1.2, 'reach'], [2.6, 'stand'], [3.4, 'holdFront']], e: [[0, 'smile'], [2.4, 'nervous']] }), LW(-220, { f: 1, p: [[0, 'sit'], [1.2, 'reach']], e: [[0, 'sad'], [1.4, 'confused']] }), Hz(750, { f: -1, p: 'crossArms', e: 'angry', a0: 2.3 })] });
S(98, { pl: 'BEACH', c: [-210, -220, 1.45], act: [LW(-200, { f: 1, p: 'sit', e: 'sad' })] });
S(99, V('#ffe9b8', 'three', [], [200, -300, 1.0]));
S(100, { pl: 'BEACH', tone: 'dusk', c: [350, -330, 1.05], pr: [{ k: 'flag', x: 360, y: -330, col: '#ffd23f', f: [[0, 1], [2.2, -1]] }, { k: 'flag', x: 600, y: -330, col: '#ef4b5a', f: [[0, 1], [2.2, -1]] }], act: [L(-50, { f: 1, p: 'stand', e: 'worried', lk: [.9, -.3] })] });
// ---- ночь на скалах ----
const rk = (o = {}) => ({ pl: 'ROCKS_N', ...o });
S(101, rk({ c: [200, -250, .95], act: [] }));
S(102, rk({ c: [150, -250, 1.1], pr: [{ k: 'tarp', x: 150, y: 0, sag: 50, drips: 1 }], act: [] }));
S(103, rk({ c: [[-100, -250, 1.1], [500, -250, 1.1]], pr: [{ k: 'bag', att: 'LEON_NC.hF', glow: .5, fr: true, dy: -10, s: 1.3 }], act: [L(-150, { go: [[0, 4, 560]], p: 'pull', e: 'determined' })] }));
S(104, rk({ c: [200, -300, 1.0], pr: [{ k: 'bubble', att: 'LEON_NC.head', dx: 240, dy: -260, s: 1.3, a: .2, w: 250, h: 150, glow: false }], fgx: (c, u, ST) => { const s = ST['LEON_NC']; if (!s || u < .8) return; const x0 = s.x + 240, y0 = s.y - s.scale * 208 - 260; c.save(); c.shadowColor = '#5dff8a'; c.shadowBlur = 20; c.font = '120px Impact'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.setLineDash([14, 10]); c.lineWidth = 6; c.strokeStyle = '#2fd964'; c.strokeText('SOS', x0, y0); c.restore(); }, act: [L(100, { f: 1, p: 'think', e: 'thinking' })] }));
S(105, rk({ c: [400, -350, 1.0], act: [], fgx: (c, u) => { c.save(); c.translate(350, -350); c.beginPath(); c.roundRect(-380, -240, 760, 480, 24); c.fillStyle = '#0d1b17'; c.fill(); c.lineWidth = 10; c.strokeStyle = '#fff'; c.stroke(); c.strokeStyle = '#38ff9c'; c.lineWidth = 12; c.beginPath(); const k = Math.min(1, u / 3); for (let i = 0; i <= 40 * k; i++) { const x = -330 + i * 16.5, y = -180 + 340 * (1 - Math.exp(-i / 14)); i ? c.lineTo(x, y) : c.moveTo(x, y); } c.stroke(); c.font = '40px Impact'; c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText('HOURS', 0, 215); c.save(); c.rotate(-1.57); c.fillText('BRIGHTNESS', 0, -345); c.restore(); c.restore(); } }));
S(106, rk({ c: [100, -250, 1.5], pr: [{ k: 'bag', att: 'LEON_NC.hF', glow: .6, fr: true, dx: -6, dy: -5, s: 1.3 }], act: [L(80, { f: 1, p: 'hug', e: 'worried', lk: [.9, 0] })] }));
S(107, rk({ c: [-230, -230, 1.0], pr: [{ k: 'excl', att: 'LEON_NC.head', dy: -150, a: 2.5, a0: 2.5, s: 1.1 }], act: [L(-120, { f: -1, p: 'stand', e: [[0, 'neutral'], [2.5, 'shocked']], lk: [-.8, .7] })] }));
const plan = (o = {}) => ({ pl: 'TIDEL', c: [0, -90, 1.0], act: [], ...o });
const foamLine = (k0, k1, dur) => (c, u) => { const k = Math.min(1, u / dur), y = k0 + (k1 - k0) * k; c.save(); c.strokeStyle = '#fff'; c.lineWidth = 26; c.lineCap = 'round'; c.beginPath(); for (let x = -1250; x <= 1250; x += 50) { const yy = y + Math.sin(x * .02 + u * 4) * 12; x === -1250 ? c.moveTo(x, yy) : c.lineTo(x, yy); } c.stroke(); c.strokeStyle = '#111'; c.lineWidth = 6; c.stroke(); c.restore(); };
S(108, plan({ fgx: foamLine(240, 70, 3.2) }));
S(109, plan({ fgx: foamLine(70, -260, 1.6) }));
S(110, plan({ pr: [-800, -540, -280, -20, 240, 500, 760].map((x, i) => ({ k: 'zzz', x: x, y: -170 + (i % 2) * 70 })), fgx: foamLine(120, -40, 4) }));
S(111, rk({ c: [-30, -250, 1.1], pr: [{ k: 'bag', att: 'LEON_NC.hF', glow: .6, fr: true, dy: -10, s: 1.3 }], act: [L(-20, { f: 1, p: 'holdFront', e: 'worried', lk: [[0, [.9, 0]], [1.2, [-.9, .4]], [2.4, [.9, 0]], [3.6, [-.9, .4]]] })] }));
// ---- шторм в лагере ----
const cn = (o = {}) => ({ pl: 'CAMP_N', ...o });
S(112, cn({ c: [60, -250, 1.2], act: [L(0, { f: 1, p: [[0, 'knock'], [.4, 'stand'], [.6, 'knock'], [1.0, 'stand'], [1.2, 'knock']], e: 'scared' })] }));
S(113, cn({ notents: true, c: [250, -230, 1.3], pr: [{ k: 'tent', x: 250, y: 0, s: 1.6 }, { k: 'zzz', att: 'H.head', fr: true, dy: -80 }], act: [Hz(310, { f: 1, y: -46, p: 'lie', rot: -1.5708, e: 'sleepy', s: 1.0 })] }));
S(114, cn({ c: [150, -240, 1.25], sp: ['LEON_NC', 'H'], pr: [], act: [L(-90, { f: 1, p: 'point', e: 'shocked', tk: [0, 1.8] }), Hz(150, { f: -1, p: [[0, 'stand'], [1.8, 'wave']], e: 'angry', tk: [2.4, 3.8] })] }));
S(115, cn({ c: [200, -300, 1.0], act: [L(200, { s: 1.8, f: 1, p: 'stand', e: [[0, 'neutral'], [1.5, 'sad']] })] }));
S(116, cn({ c: [350, -250, 1.0], sp: 'LEON_NC', pr: [1, 2, 3, 4].map(i => ({ k: 'excl', x: 300 + i * 150, y: -400, a: .8 + i * .4, a0: .8 + i * .4, s: .8 })), act: [L(-50, { f: 1, p: 'reach', e: 'sad' })] }));
S(117, cn({ c: [350, -250, 1.0], act: [L(-100, { f: 1, p: 'reach', e: 'worried' }), ...GS(14, 250, 950, { f: -1, e: 'neutral' })] }));
S(118, cn({ c: [100, -250, 1.2], sp: 'I', act: [Iv(380, { go: [[0, 1.4, 150]], f: -1, p: [[0, 'stand'], [1.5, 'point']], e: 'determined', tk: [2, 3.5] }), L(-220, { f: 1, p: 'stand', e: 'happy', lk: [.9, 0] })] }));
S(119, cn({ c: [[350, -250, .95], [1100, -250, .95]], pr: [{ k: 'crackers', att: 'P.hF', fr: true, s: 1.2 }], act: [Pp(250, { go: [[.4, 6.5, 2300]], f: 1, p: 'holdFront', e: 'happy' }), ...GS(16, 300, 800, { f: 1, p: 'holdFront', each: (i) => ({ go: [[1.4 + i * .28, 6.9 + i * .28, 2300]] }) })] }));
S(120, cn({ c: [[350, -250, 1.0], [900, -250, 1.0]], pr: [{ k: 'wave', x: [[0, -400], [5.5, 1100]], y: 0, s: 2.0, a0: 0 }], act: [Hz(200, { go: [[.6, 3.2, 1500]], run: true, f: 1, e: 'scared' }), ...GS(6, 1000, 1500, { f: -1, e: 'surprised' })] }));
S(121, cn({ tide: 640, c: [450, -220, 1.3], pr: [{ k: 'pillow', x: [[0, 180], [4, 330]], y: -8 }], act: [Hz(800, { f: -1, p: 'stand', e: 'sad', lk: [-.9, .4] })] }));
S(122, rk({ c: [250, -250, .9], act: [L(60, { f: -1, p: 'stand', e: 'worried' }), ...GS(16, 200, 900, { f: -1, p: 'sit', e: 'neutral' })] }));
