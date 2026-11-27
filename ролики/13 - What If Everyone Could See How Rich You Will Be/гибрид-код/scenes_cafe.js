// Столовая S026–S037, S042, S043, S088, S089; коридор S081–S083; улица S044–S047
import { def } from "/hybrid13/reg13.js";
import { clamp, lerp, sm, eo, back, prog, rnd, rect, circ, line, poly, rr, outline, stext, ptext, POSES } from "/hybrid13/engine13.js";
import { windowFrame } from "/hybrid13/places13.js";

// фон-очередь: дети чуть дальше от камеры (y=-36, мельче), смотрят вверх на число
const bgKids = (k, ids, x0, dx, o = {}) => ids.forEach((id, i) => k.a(id, x0 + i * dx, { y: -36, s: .92, face: o.face ?? -1, pose: o.pose || 'stand', expr: o.expr || 'surprised', look: o.look || 'up', z: 6 + i * .01 }));
const counterFront = (k) => k.p('counterFront', 0, 0, { z: 14 });

def('S026', { cam: [[-100, .95, 884], [200, .98, 884]], fn(k) {
  bgKids(k, ['K0', 'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11'], 260, 82, { face: 1, expr: 'smile', look: [.5, 0] });
  k.a('LEON', [[0, -1000], [1.7, -120]], { face: 1 });
} });
def('S027', { cam: [[150, .98, 884], [650, 1.0, 884]], fn(k) {
  const Lx = lerp(-250, 720, sm(prog(k.lt, 0, 3.4)));
  ['K0', 'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11'].forEach((id, i) => {
    const base = 260 + i * 82, d = base - Lx, dir = Math.sign(d) || 1, off = dir * 230 * sm(prog(k.lt, 0, 1.4)) * Math.exp(-Math.abs(d) / 300) * (d < 0 && k.lt < .5 ? 0 : 1);
    const near = Math.abs(d) < 330;
    k.a(id, base + off, { y: -6 + (i % 2) * 10, s: .92, face: dir > 0 ? 1 : -1, pose: near ? 'handsOnHead' : 'stand', expr: 'surprised', look: 'up', bob: near ? 11 : 0, z: 6 + i * .01 });
  });
  k.a('LEON', [[0, -250], [3.4, 720]], { face: 1 });
} });
def('S028', { cam: [[260, 1.3, 890], [300, 1.38, 890]], fn(k) {
  bgKids(k, ['K0', 'K1', 'K2'], 700, 110);
  const give = k.ph(.8, 1.6);
  k.a('TESS', 520, { face: -1, pose: [[0, 'stand'], [.5, 'reach']], expr: 'smile', look: [-.6, 0] });
  k.a('NIA', 660, { face: -1, pose: [[0, 'stand'], [1.4, 'reach']], expr: 'happy', look: [-.6, 0], y: 14 });
  const L = k.a('LEON', 300, { face: 1, pose: [[0, 'stand'], [1.2, 'holdFront']], expr: 'smile', look: 'up' });
  const T = k.heads.TESS, N = k.heads.NIA;
  if (give < 1) { k.p('cookie', lerp(T.hand[0], L.hand[0], eo(give)), lerp(T.hand[1], L.hand[1], eo(give)) - 8, { z: 70 }); k.p('chips', lerp(N.hand[0], L.hand[0] + 24, eo(prog(k.lt, 1.4, 2.2))), lerp(N.hand[1], L.hand[1], eo(prog(k.lt, 1.4, 2.2))) - 26, { z: 70, rot: .2 }); }
  else { k.p('cookie', L.hand[0], L.hand[1] - 8, { z: 70 }); k.p('chips', L.handB[0] + 10, L.handB[1] - 26, { z: 70, rot: .1 }); }
} });
def('S029', { cam: [[260, 1.4, 892], [290, 1.5, 892]], fn(k) {
  bgKids(k, ['K0', 'K1'], 760, 110);
  const J = k.a('JUNE', 470, { face: -1, pose: 'holdFront', expr: 'smile', look: [-.6, -.3] });
  k.a('LEON', 250, { face: 1, pose: 'sit' === 'x' ? 'stand' : 'stand', expr: 'smile', look: [.5, .2] });
  k.p('swan', J.hand[0] - 6, J.hand[1] + 6, { z: 70, s: .8 + .04 * Math.sin(k.t * 4) });
} });
def('S030', { cam: [[300, 1.3, 890], [260, 1.36, 890]], fn(k) {
  bgKids(k, ['K3', 'K4'], 760, 120);
  const C = k.a('CHASE', [[0, 900], [1.6, 420]], { face: -1, expr: 'worried', look: [[0, [-.5, -.8]], [2, [-.2, -1.4]]], pose: k.lt > 2.2 ? 'shrug' : 'stand' });
  k.p('backpack', C.x - C.f * 36 * C.se, C.y - 44 * C.se, { z: C.moving ? 9.9 : 9.9, s: C.se * .95, f: C.f, color: '#2f5db0' });
  k.a('LEON', 150, { face: 1, expr: 'smile', look: 'up' });
} });
def('S031', { cam: [[200, 1.1, 886], [380, 1.12, 886]], fn(k) {
  const lx = [[0, -250], [4.3, 600]], cx = [[0, -520], [4.3, 330]];
  const C = k.a('CHASE', cx, { face: 1, carry: 'holdTray', pose: 'holdTray', expr: 'smile', look: [.5, -.7] });
  k.p('backpack', C.x - C.f * 36 * C.se, C.y - 44 * C.se, { z: 9.9, s: C.se * .95, f: C.f });
  k.p('tray', C.hand[0] + 10 * C.f, C.hand[1] - 2, { z: 70, s: .7 });
  k.a('LEON', lx, { face: 1, expr: 'smile', look: 'up' });
  bgKids(k, ['K5', 'K6', 'K7'], 760, 110);
} });
def('S032', { cam: [[160, 1.32, 890], [190, 1.4, 890]], fn(k) {
  const E8 = k.a('EIGHTH', 400, { face: -1, pose: 'reach', expr: 'smile', look: [-.5, -.2] });
  const L = k.a('LEON', 90, { face: 1, pose: 'reach', expr: k.lt > 2 ? 'worried' : 'smile', look: [.4, .3] });
  k.p('paper', E8.hand[0] - 16, E8.hand[1] - 30, { z: 70, w: 100, h: 130, s: .75, rot: -.1, lines: 3 });
  k.p('pen', L.hand[0] + 14, L.hand[1] - 10, { z: 71, rot: .6 });
  bgKids(k, ['K0', 'K1'], 640, 110);
} });
def('S033', { cam: [[520, 1.2, 890], [560, 1.28, 890]], fn(k) {
  const LL = k.a('LUNCHLADY', 960, { face: -1, pose: [[0, 'stand'], [.6, 'point'], [1.6, 'stand']], expr: 'smirk', look: [-.5, .3] });
  k.p('counterFront', 0, 0, { z: 14 });
  const L = k.a('LEON', 520, { face: 1, pose: 'holdTray', expr: 'smile', look: [.4, .2] });
  k.p('tray', L.hand[0] + 6, L.hand[1] - 2, { z: 70, s: .75, food: false });
  const drop = k.at([[.9, 0], [1.4, 1]]), drop2 = k.at([[1.7, 0], [2.2, 1]]);
  if (k.lt > .9) k.p('pudding', L.hand[0] - 22, lerp(L.hand[1] - 280, L.hand[1] - 16, drop * drop), { z: 72, s: .8 });
  if (k.lt > 1.7) k.p('pudding', L.hand[0] + 24, lerp(L.hand[1] - 280, L.hand[1] - 16, drop2 * drop2), { z: 72, s: .8 });
  k.a('K0', 230, { face: 1, pose: 'holdTray', expr: 'surprised', look: [.4, 0] }); k.p('pudding', 262, -92, { z: 12, s: .6 });
  k.a('K1', 130, { face: 1, expr: 'surprised', look: 'up', pose: 'stand' });
} });
def('S034', { cam: [[180, 1.35, 892], [210, 1.45, 892]], fn(k) {
  const T = k.a('TESS', 360, { face: -1, pose: [[0, 'stand'], [.6, 'lean']], expr: 'worried', look: [-.6, 0], talk: k.lt > 1 && k.lt < 3 });
  k.p('paperStack', T.hand[0] - 14, T.hand[1] + 6, { z: 70, n: 3 });
  k.a('LEON', 80, { face: 1, expr: 'smile', look: [.5, .1] });
  bgKids(k, ['K0', 'K1'], 640, 110);
} });
def('S035', { cam: [[130, 1.3, 892], [150, 1.4, 892]], fn(k) {
  const T = k.a('TESS', 370, { face: -1, pose: 'reach', expr: 'smile', look: [-.6, 0] });
  const L = k.a('LEON', 80, { face: 1, pose: [[0, 'stand'], [.8, 'holdFront']], expr: 'surprised', look: 'up' });
  const u = k.ph(.2, 1.1); k.p('paperStack', lerp(T.hand[0] - 14, L.hand[0] + 14, u), lerp(T.hand[1] + 6, L.hand[1] + 6, u), { z: 70, n: 3 });
} });
def('S036', { cam: [[170, 1.25, 890], [190, 1.33, 890]], fn(k) {
  k.p('table', 90, 0, { w: 380, h: 150, z: 8 });
  const O = k.a('OWEN', -130, { face: 1, pose: 'sit', expr: 'smirk', look: [.6, -.1], z: 7, out: { face: 'glasses' } });
  k.p('plate', -10, -150, { z: 9 }); k.p('fork', -10 + (k.lt < .8 ? 30 : 60), -150 + (k.lt < .8 ? -50 : 0), { z: 10, rot: k.lt < .8 ? .3 : 1.4 });
  k.a('LEON', 440, { face: -1, pose: 'holdFront', expr: 'smile', look: [-.5, .2] });
  const L = k.heads.LEON; k.p('paperStack', L.hand[0] + 4, L.hand[1] + 6, { z: 70, n: 3 });
} });
def('S037', { cam: [[170, 1.25, 890], [190, 1.33, 890]], fn(k) {
  k.p('table', 90, 0, { w: 380, h: 150, z: 8 });
  const O = k.a('OWEN', -130, { face: 1, pose: [[0, 'sit'], [.5, 'sitPoint']], expr: 'smirk', look: [.6, -.1], z: 7, talk: k.lt > .4 && k.lt < 3 });
  k.a('LEON', 440, { face: -1, pose: 'holdFront', expr: 'worried', look: [-.5, .4] });
  const L = k.heads.LEON; k.p('paper', L.hand[0] + 10, L.hand[1] - 6, { z: 70, w: 100, h: 130, s: .8, text: 'WORKSHEET', ts: 14, lines: 3 });
  k.num(O, '$1,000,000,000', { fs: 44, dx: 70, up: 40 });
} });
def('S042', { cam: [[170, 1.4, 890], [200, 1.5, 890]], fn(k) {
  const g = { face: 1, look: 'up', expr: 'happy', pose: 'stand' };
  const r1 = k.a('TESS', -60, g), r2 = k.a('NIA', 70, { ...g, y: 14 }), r3 = k.a('JUNE', 200, { ...g, y: 28 });
  const L = k.a('LEON', 520, { face: -1, pose: [[0, 'stand'], [1.6, 'sad']], expr: k.lt > 1.8 ? 'sad' : 'smile', look: [-.4, .3] });
  for (const r of [r1, r2, r3]) k.heartEyes(r);
} });
def('S043', { van: true, numUp: 130, boom: [1640, 250], cam: [[-120, 1.0, 890], [-60, 1.06, 890]], fn(k) {
  k.a('LEON', -40, { face: -1, pose: 'point', expr: 'surprised', look: [-.8, -.1] });
  k.a('K0', 220, { face: -1, expr: 'surprised', look: [-.6, 0] }); k.a('K1', 330, { face: -1, expr: 'surprised', look: [-.6, 0] });
} });
def('S088', { dim: .3, cam: [[60, 1.2, 890], [90, 1.26, 890]], fn(k) {
  k.p('table', 90, 0, { w: 400, h: 150, z: 8 }); k.p('chair', -130, 0, { f: 1, z: 6 }); k.p('chair', 340, 0, { f: -1, z: 6 });
  k.a('LEON', -130, { face: 1, pose: 'sitHand', expr: 'sad', look: [.7, .4], z: 7 });
  k.p('tray', 100, -150, { z: 9, s: 1 });
} });
def('S089', { dim: .25, cam: [[420, 1.0, 890], [520, 1.1, 890]], fn(k) {
  k.p('table', 650, 0, { w: 320, h: 150, z: 4 }); k.p('chair', 860, 0, { f: -1, z: 3 });
  const C = k.a('CHASE', 860, { y: -30, s: .86, face: -1, pose: 'sit', expr: 'smirk', look: [-.8, -.2], z: 5, noCheck: true });
  k.p('notebookOpen', 650, -150, { z: 6, p: 1, s: .8 });
  k.p('table', 90, 0, { w: 400, h: 150, z: 8 }); k.a('LEON', -130, { face: 1, pose: 'sitHand', expr: 'sad', look: [.7, .4], z: 7 });
  k.p('tray', 100, -150, { z: 9 });
} });
// коридор
def('S081', { cam: [[300, 1.0, 886], [650, 1.02, 886]], fn(k) { k.a('LEON', [[0, -200], [2.4, 900]], { face: 1, expr: 'sad' }); } });
def('S082', { camFn: (lt) => lt < 1.85 ? [1000, 1.2, 890, 0] : [-200, 1.2, 890, 0], fn(k) {
  if (k.lt < 1.85) { k.p('bench', 1000, 0, { w: 300, z: 6 }); k.a('LEON', 1000, { face: -1, pose: 'sitBack', expr: 'sad', look: [-.4, .5], z: 7 }); }
  else { k.a('LEON', -120, { face: 1, pose: 'lean', expr: 'sad', look: [.3, .4] }); }
} });
def('S083', { mid(c, t, k) { windowFrame(c, 520, -820, 900, 700, '#f6e9b8', t, false); c.save(); rr(c, 520, -820, 900, 700, 10); c.clip(); c.fillStyle = '#e7dcc3'; c.fillRect(520, -240, 900, 140); c.restore(); rect(c, 700, -300, 420, 28, '#d8a05a', 6, 8); line(c, [[740, -272], [740, -120]], 8); line(c, [[1080, -272], [1080, -120]], 8); },
  cam: [[420, 1.0, 890], [470, 1.05, 890]], fn(k) {
  k.a('OWEN', 840, { y: -100, s: .8, face: -1, pose: 'sit', expr: 'sad', look: [-.4, .4], z: 4, noCheck: true, clip: [530, -810, 880, 690], out: { face: 'glasses' } });
  k.p('sandwich', 900, -300, { z: 5 });
  k.a('LEON', 150, { face: 1, pose: 'stand', expr: 'sad', look: [.7, .1] });
} });
// улица
const street = (k) => { };
def('S044', { cam: [[-120, .98, 880], [-60, 1.02, 880]], fn(k) {
  k.p('van', -700, 110, { f: 1, z: 3, t: k.t });
  k.a('REPORTER', -140, { y: 56, face: 1, pose: 'stand', expr: 'smile', look: [.6, .1], prop: 'mic' });
  k.a('CAMERAMAN', -380, { y: 56, face: 1, pose: 'hold2', expr: 'neutral', look: [.6, 0], prop: 'camera' });
  k.a('LEON', 300, { y: 40, face: -1, pose: 'stand', expr: 'neutral', look: [-.5, .1] });
} });
def('S045', { cam: [[-30, 1.25, 890], [-10, 1.38, 890]], fn(k) {
  k.a('REPORTER', -200, { y: 56, face: 1, pose: [[0, 'stand'], [.6, 'point']], expr: 'smile', look: [.6, .1], prop: 'mic', talk: k.lt > 4 && k.lt < 5.2 });
  k.a('CAMERAMAN', -480, { y: 56, face: 1, pose: 'hold2', expr: 'neutral', look: [.6, 0], prop: 'camera' });
  k.a('LEON', 160, { y: 40, face: -1, pose: 'stand', expr: 'surprised', look: [-.6, .2] });
} });
def('S046', { cam: [[-30, 1.25, 890], [-10, 1.38, 890]], fn(k) {
  k.a('REPORTER', -200, { y: 56, face: 1, pose: 'stand', expr: 'smile', look: [.6, .1], prop: 'mic' });
  k.a('CAMERAMAN', -480, { y: 56, face: 1, pose: 'hold2', expr: 'neutral', look: [.6, 0], prop: 'camera' });
  k.a('LEON', 160, { y: 40, face: -1, pose: k.lt < 1.2 ? 'handsOnHead' : 'cheer', expr: 'surprised', look: k.lt < 1.2 ? [[0, [-.9, -.4]], [.4, [-.2, .6]], [.8, [-.9, -.4]]] : [-.6, 0], talk: k.lt > 1.2 && k.lt < 2.2, bob: k.lt < 1.2 ? 10 : 0 });
} });
def('S047', { cam: [[-420, .95, 880], [-300, 1.0, 880]], fn(k) {
  k.a('A0', -1000, { y: 60, face: 1, pose: 'thumb', expr: 'smile', look: [.6, 0], bob: 3 }); k.a('A1', -870, { y: 60, face: 1, pose: 'thumb', expr: 'happy', look: [.6, 0] }); k.a('A3', -740, { y: 60, face: 1, pose: 'thumb', expr: 'smile', look: [.6, 0] });
  k.a('LEON', -280, { y: 40, face: -1, pose: 'stand', expr: 'smile', look: 'up' });
  k.a('REPORTER', -80, { y: 56, face: -1, pose: 'stand', expr: 'smile', look: [-.6, 0], prop: 'mic' });
} });
