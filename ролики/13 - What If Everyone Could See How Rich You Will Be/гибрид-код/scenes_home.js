// Кухня S048–S052, S135–S140, S142; двор S023, S053–S055; гараж S056–S059; дорога S060–S064, S068–S070
import { def } from "/hybrid13/reg13.js";
import { clamp, lerp, sm, eo, back, prog, rnd, rect, circ, line, poly, rr, outline, stext, ptext, POSES, dog, burst } from "/hybrid13/engine13.js";
import { windowFrame } from "/hybrid13/places13.js";
import { heart } from "/hybrid13/props13.js";

// ---------- кухня ----------
const kitchen = (k) => { k.p('table', 250, 0, { w: 560, h: 150, z: 8 }); };
const sceneK = (cam, fn, extra = {}) => ({ cam, fn(k) { kitchen(k); fn(k); }, ...extra });
def('S048', sceneK([[-500, .95, 884], [-250, .98, 884]], (k) => {
  const open = k.ph(.3, 1.1); k.p('doorFrame', -1520, 0, { z: 3, open: 1 - 0, col: '#a4693a' });
  k.p('doorbell', -1380, -330, { z: 4, t: k.lt });
  k.a('MOM', 560, { face: -1, pose: 'stand', expr: 'surprised', look: [-.6, 0] });
  k.a('HALE', [[1.0, -1500], [3.6, -120]], { face: 1, expr: 'smirk', look: [.6, 0], prop: 'folder' });
  k.a('LEON', 380, { face: -1, pose: 'sit', y: 0, expr: 'surprised', look: [-.7, .1], noCheck: false });
  k.p('chair', 380, 0, { f: 1, z: 6 });
}));
def('S049', sceneK([[150, 1.2, 886], [180, 1.28, 886]], (k) => {
  const H = k.a('HALE', -120, { face: 1, pose: [[0, 'stand'], [.5, 'reach']], expr: 'smirk', look: [.6, 0], prop: k.lt < .9 ? 'folder' : undefined });
  if (k.lt >= .9) k.p('folderW', 180, -150, { z: 9, s: 1.1 });
  k.a('MOM', 600, { face: -1, pose: 'stand', expr: 'neutral', look: [-.6, 0] });
  k.a('LEON', 440, { face: -1, pose: 'sit', expr: 'neutral', look: [-.6, .1] }); k.p('chair', 440, 0, { f: 1, z: 6 });
}));
def('S050', sceneK([[170, 1.25, 886], [200, 1.32, 886]], (k) => {
  const H = k.a('HALE', -110, { face: 1, pose: [[0, 'reach'], [1.5, 'talk']], expr: 'smirk', look: [.6, 0], talk: k.lt > 1.6 && k.lt < 4 });
  k.p('contract', 200, -166, { z: 9, rot: -.05, title: 'CONTRACT', s: .9 });
  k.p('cash', 360, -156, { z: 9, n: 4 });
  k.a('LEON', 520, { face: -1, pose: 'sit', expr: 'neutral', look: [-.7, .2] }); k.p('chair', 520, 0, { f: 1, z: 6 });
  k.a('MOM', 740, { face: -1, pose: 'stand', expr: 'neutral', look: [-.6, 0] });
}));
def('S051', sceneK([[420, 1.3, 886], [470, 1.4, 886]], (k) => {
  const M = k.a('MOM', 660, { face: -1, pose: 'holdFront', expr: 'worried', look: [-.6, .5], out: { face: 'glasses' }, talk: k.lt > 3.2 });
  k.p('contract', M.hand[0] - 20, M.hand[1] - 10, { z: 70, hl: k.at([[.8, 0], [3, 4]]), s: .78, rot: -.04 });
  k.a('LEON', 380, { face: -1, pose: 'sit', expr: 'worried', look: [-.4, .1] }); k.p('chair', 380, 0, { f: 1, z: 6 });
  k.a('HALE', 60, { face: 1, pose: 'stand', expr: 'smirk', look: [.5, 0] });
}));
def('S052', sceneK([[600, 1.0, 884], [900, 1.02, 884]], (k) => {
  const jump = k.ph(.5, 1.1), run = k.ph(1.1, 2.9); const bx = lerp(780, 1420, eo(run)); const by = -Math.sin(jump * Math.PI) * 140 * (run > 0 ? 0 : 1);
  k.push(20, (c) => { const x = k.lt < 1.1 ? lerp(420, 350, jump) : bx; dog(c, x, k.lt < 1.1 ? by : 0, { pose: 'stand', f: 1, t: k.t, wag: 0, k: 1 }); if (k.lt >= 1.05) { c.save(); c.translate(x + 82, -100); c.rotate(-.5); rr(c, -40, -52, 80, 100, 6); outline(c, '#fffdf2', 6); c.restore(); } });
  if (k.lt < 1.05) k.p('contract', 250, -166, { z: 9, s: .9 });
  k.a('HALE', 40, { face: 1, pose: k.lt > 1.2 ? 'reach' : 'stand', expr: k.lt > 1.2 ? 'surprised' : 'smirk', look: [.8, 0] });
  k.a('MOM', 700, { face: -1, pose: k.lt > 1.2 ? 'handsOnHead' : 'stand', expr: 'surprised', look: [.6, 0] });
  k.a('LEON', 540, { face: -1, pose: 'sit', expr: 'surprised', look: [.6, 0], z: 7 }); k.p('chair', 540, 0, { f: 1, z: 6 });
}));
// Saturday
const street = (k) => (c, x, y, w, h) => { };
def('S135', { clock: [8, 40], cam: [[-700, 1.0, 884], [-620, 1.06, 884]], fn(k) { kitchen(k); k.a('LEON', [[0, -200], [1.6, -690]], { face: -1, expr: 'neutral', look: [-.6, 0] }); } });
def('S136', { cam: [[-690, 1.2, 890], [-700, 1.34, 890]], fn(k) { kitchen(k); k.a('LEON', -700, { face: -1, pose: 'stand', expr: 'shocked', look: [-.9, -.2] }); } });
const passers = (k, nums) => nums.forEach((n, i) => { const x = -900 + i * 130, r = k.a('A' + (i % 6), x, { y: -410, s: .55, face: i % 2 ? 1 : -1, pose: 'stand', expr: 'neutral', look: [i % 2 ? .4 : -.4, 0], clip: [-990, -840, 540, 470], z: 3, noCheck: true }); k.num(r, n, { fs: 28, up: 6, k: sm(prog(k.lt, .4 + i * .25, .9 + i * .25)) }); });
def('S137', { cam: [[-420, 1.0, 884], [-280, 1.05, 884]], fn(k) {
  kitchen(k); passers(k, ['$4,800,000', '$12,000,000', '$900,000', '$31,000,000']);
  const M = k.a('MOM', 120, { face: -1, expr: 'smile', look: [-.5, 0] }), D = k.a('DAD', 380, { face: -1, expr: 'smile', look: [-.5, 0] });
  k.num(M, '$2,100,000', { fs: 40, k: sm(prog(k.lt, 2.2, 2.8)) }); k.num(D, '$800,000', { fs: 40, k: sm(prog(k.lt, 2.8, 3.4)) });
  k.a('LEON', -560, { face: -1, pose: 'stand', expr: 'shocked', look: [-.9, -.2] });
} });
def('S138', { cam: [[560, 1.0, 884], [720, 1.04, 884]], fn(k) {
  kitchen(k); k.p('doorFrame', 1390, 0, { z: 3, col: '#7aa0c8', open: 1 });
  const pu = back(prog(k.lt, .5, 1.1)); k.push(60, (c) => { c.save(); c.translate(1390, -700); c.scale(pu, pu); c.save(); c.globalAlpha = .6; const g = c.createRadialGradient(0, 0, 10, 0, 0, 380); g.addColorStop(0, 'rgba(255,225,90,.9)'); g.addColorStop(1, 'rgba(255,225,90,0)'); c.fillStyle = g; c.fillRect(-420, -200, 840, 400); c.restore(); stext(c, '$999,000,000,000', 0, 0, 92, '#ffd23f', 0, 1); c.restore(); });
  k.push(30, (c) => { c.save(); c.globalAlpha = .55; c.fillStyle = '#000'; c.beginPath(); c.ellipse(1390, -4, 90, 14, 0, 0, 7); c.fill(); c.restore(); ptext(c, '?', 1390, -150, 150, 'rgba(255,255,255,.8)'); });
  k.a('MOM', 140, { face: 1, expr: 'neutral', look: [.7, -.5] }); k.a('DAD', 380, { face: 1, expr: 'neutral', look: [.7, -.5] });
} });
def('S139', { cam: [[600, 1.0, 884], [820, 1.06, 884]], fn(k) {
  kitchen(k); k.p('doorFrame', 1390, 0, { z: 3, col: '#7aa0c8', open: 1 });
  const x = lerp(1400, 960, eo(prog(k.lt, 0, 2.4))), wob = Math.sin(k.t * 12) * 3;
  k.push(20, (c) => { const r = dog(c, x, 0, { pose: 'stand', f: -1, t: k.t, wag: 0, k: 1 }); c.save(); c.translate(x - 74, -118); c.rotate(.3); rr(c, -26, -42, 52, 84, 4); outline(c, '#fffdf2', 5); c.restore(); });
  const hdx = x, hdy = -190; k.push(60, (c) => { c.save(); c.translate(hdx, hdy - 130 + wob); c.save(); c.globalAlpha = .6; const g = c.createRadialGradient(0, 0, 10, 0, 0, 340); g.addColorStop(0, 'rgba(255,225,90,.9)'); g.addColorStop(1, 'rgba(255,225,90,0)'); c.fillStyle = g; c.fillRect(-380, -170, 760, 340); c.restore(); stext(c, '$999,000,000,000', 0, 0, 78, '#ffd23f', 0, 1 + .04 * Math.sin(k.t * 7)); c.restore(); });
  const M = k.a('MOM', 120, { face: 1, expr: 'surprised', look: 'up' }), D = k.a('DAD', 330, { face: 1, expr: 'surprised', look: 'up' });
  k.num(M, '$2,100,000', { fs: 36 }); k.num(D, '$800,000', { fs: 36 });
  k.a('LEON', 560, { face: 1, expr: 'shocked', look: [.8, -.6] });
} });
def('S140', { cam: [[-100, 1.0, 884], [100, 1.05, 884]], fn(k) {
  kitchen(k); const MM = k.a('MAILMAN', -720, { y: -410, s: .6, face: 1, pose: 'phone', expr: 'smile', look: [.6, 0], prop: 'phone', clip: [-990, -840, 540, 470], z: 3, noCheck: true });
  k.p('flash', -690, -560, { z: 90, i: 1 }); k.p('flash', -650, -500, { z: 90, i: 3 });
  k.push(20, (c) => dog(c, 200, 0, { pose: 'sit', f: -1, t: k.t, k: 1 }));
  k.num({ head: [200, -150], top: [200, -190], se: 1 }, '$999,000,000,000', { fs: 56, up: 20 });
  k.a('LEON', 480, { face: -1, expr: 'smile', look: [-.7, -.2] });
} });
def('S142', { cam: [[300, 1.15, 892], [330, 1.25, 892]], fn(k) {
  kitchen(k); k.push(20, (c) => { dog(c, 300, 0, { pose: 'sit', f: -1, t: k.t, k: 1.3 }); c.save(); c.translate(236, -74); circ(c, 0, 0, 22, '#ffd23f', 6); ptext(c, '$', 0, 2, 26, '#9a6a00'); c.restore(); });
  k.num({ head: [300, -220], top: [300, -260], se: 1 }, '$999,000,000,000', { fs: 64, up: 10 });
  const pulse = 1 + .05 * Math.sin(k.t * 9); k.push(70, (c) => { c.save(); c.translate(760, -330); c.scale(pulse, pulse); rect(c, -190, -50, 380, 100, '#e0242b', 22, 10); c.beginPath(); c.moveTo(-130, -20); c.lineTo(-130, 20); c.lineTo(-100, 0); c.closePath(); outline(c, '#fff', 4); stext(c, 'SUBSCRIBE', 28, 4, 46, '#fff', 0, 1, '#111', false); c.restore(); });
  k.a('LEON', 560, { face: -1, expr: 'smile', look: [-.6, .1] });
} });

// ---------- двор ----------
def('S023', { cam: [[-100, 1.0, 886], [-60, 1.04, 886]], fn(k) {
  const L = k.a('LEON', -350, { face: 1, pose: 'stand', expr: 'happy', look: [.5, -.8] });
  k.p('bucketHead', L.head[0], L.head[1] - .58 * L.hr, { z: 75, hr: L.hr });
  const u = back(prog(k.lt, .4, 1.1)); k.push(55, (c) => { c.save(); c.translate(260, -640); c.scale(u, u);
    for (const [x, y, r] of [[-260, 40, 120], [-130, -90, 150], [60, -130, 170], [230, -40, 150], [320, 80, 110], [60, 110, 170], [-110, 110, 130]]) circ(c, x, y, r, '#fff', 9);
    c.save(); c.beginPath(); c.ellipse(30, 0, 360, 200, 0, 0, 7); c.clip(); c.fillStyle = '#9bdcff'; c.fillRect(-400, -250, 800, 500); c.fillStyle = '#7bd35a'; c.fillRect(-400, 90, 800, 120);
    rect(c, -80, 40, 220, 40, '#d8d2c8', 10, 8); rect(c, -20, -20, 100, 62, '#c9c3b4', 10, 8); const t = k.t;
    for (let i = 0; i < 8; i++) { const ph = ((t * .9 + i / 8) % 1), a = -1.9 + i * .38, px = 30 + Math.cos(a) * ph * 210, py = -20 - Math.sin(ph * Math.PI) * 190 + ph * 60; c.save(); c.translate(px, py); c.rotate(ph * 6 + i); poly(c, [[-22, -16], [22, -16], [0, 26]], '#ffcf5a', 5); circ(c, 0, -2, 6, '#d8232a', 2); c.restore(); }
    c.restore(); c.restore();
    for (let i = 0; i < 3; i++) circ(c, -280 + i * -40 + 0, -150 + i * 90 + 100, 12 - i * 3, '#fff', 6);
  });
} });
def('S053', { cam: [[-60, 1.3, 890], [-30, 1.38, 890]], fn(k) {
  const L = k.a('LEON', -260, { face: 1, pose: [[0, 'stand'], [.4, 'reach']], expr: 'smile', look: [.6, .3] });
  const eat = k.lt > 1.2; const dx = 120;
  k.push(20, (c) => { dog(c, 120, 0, { pose: 'sit', f: -1, t: k.t, k: 1 }); });
  if (!eat) k.p('cookie', lerp(L.hand[0], 40, eo(prog(k.lt, .4, 1.2))), lerp(L.hand[1], -140, eo(prog(k.lt, .4, 1.2))), { z: 70, r: 20 });
} });
def('S054', { cam: [[0, 1.3, 890], [30, 1.38, 890]], fn(k) {
  const L = k.a('LEON', -190, { face: 1, pose: 'lean', expr: 'neutral', look: 'up' });
  k.push(20, (c) => { dog(c, 110, 0, { pose: 'sit', f: -1, t: k.t, k: 1 }); });
  const u = back(prog(k.lt, 1.5, 2.0)); k.push(80, (c) => { c.save(); c.translate(L.head[0] + 200, L.top[1] - 190); c.scale(u, u); c.save(); c.scale(1.3, 1.3); circ(c, 0, 0, 36, '#ffe14a', 7); rect(c, -16, 32, 32, 22, '#9aa6b5', 4, 6); for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; line(c, [[Math.cos(a) * 52, Math.sin(a) * 52], [Math.cos(a) * 74, Math.sin(a) * 74]], 6, '#ffd23f'); } c.restore(); stext(c, '?', 0, 6, 70, '#e0242b', 0, 1, '#111', false); c.restore(); });
} });
def('S055', { cam: [[100, .95, 884], [180, 1.0, 884]], fn(k) {
  const peek = back(prog(k.lt, .8, 1.6)); const C = k.a('CHASE', 760, { y: lerp(40, -118, peek), face: -1, pose: 'stand', expr: 'smirk', look: [-.9, 0], z: 6, noCheck: true });
  k.p('fenceFront', 0, 0, { z: 8, x0: 560, x1: 980 });
  k.a('LEON', -520, { face: -1, pose: 'lean', expr: 'smile', look: [-.2, .4] }); k.push(20, (c) => { dog(c, -700, 0, { pose: 'sit', f: 1, t: k.t, k: 1 }); });
} });

// ---------- гараж ----------
const garage = (k, o = {}) => { k.p('tandem', 140, 0, { f: -1, z: 5, L: 230, rot: o.rot || 0, on: o.on, t: k.t }); };
def('S056', { cam: [[-100, .95, 884], [60, 1.0, 884]], fn(k) {
  garage(k); k.a('OWEN', 40, { face: 1, pose: 'reach', expr: 'neutral', look: [.5, -.4], prop: 'wrench' });
  k.a('LEON', [[0, -900], [2.0, -330]], { face: 1, expr: 'smile', look: [.6, 0] });
} });
def('S057', { cam: [[80, 1.2, 890], [100, 1.3, 890]], fn(k) {
  garage(k); const O = k.a('OWEN', 24, { face: 1, pose: 'reach', expr: 'worried', look: [.6, -.3], bob: 0 });
  k.p('wrench', O.hand[0], O.hand[1] + 10, { z: 70, rot: -.8 + Math.sin(k.t * 8) * .3 });
  k.a('LEON', -280, { face: 1, expr: 'smile', look: [.6, -.2] });
} });
def('S058', { cam: [[40, 1.25, 890], [60, 1.34, 890]], fn(k) {
  garage(k); k.a('OWEN', 24, { face: 1, pose: 'stand', expr: 'neutral', look: [[0, [.5, -.4]], [1, [-.8, .1]]] });
  const L = k.a('LEON', -210, { face: 1, pose: 'holdFront', expr: 'neutral', look: [.7, -.2] });
  k.p('wrench', L.hand[0] + 4, L.hand[1] + 4, { z: 70, rot: -.8 });
} });
def('S059', { cam: [[40, 1.2, 890], [60, 1.3, 890]], fn(k) {
  garage(k); k.a('OWEN', 24, { face: 1, pose: 'stand', expr: 'surprised', look: [-.8, -.8] }); k.a('LEON', -210, { face: 1, pose: 'cheer', expr: 'surprised', look: 'up', bob: 6 });
  k.push(40, (c) => { if (k.lt > .5) burst(c, -200, -520, 120 * (1 - sm(prog(k.lt, 1.6, 2.4))), 10, '#ffd23f', k.t, back(prog(k.lt, .5, .9))); });
} });

// ---------- дорога ----------
const road = [[-400, 900]];
def('S060', { cam: [[300, 1.15, 890], [520, 1.15, 890]], fn(k) {
  const lx = [[0, -300], [4.2, 700]], ox = [[0, -120], [4.2, 880]], tx = [[0, -1000], [2.4, 300], [4.2, 560]];
  const T = k.a('TESS', [[0, -1000], [2.4, 330], [4.2, 590]], { face: 1, expr: 'smile', look: [.6, 0], prop: 'cup' });
  const L = k.a('LEON', lx, { face: 1, expr: 'smile', look: [.6, 0] });
  k.a('OWEN', ox, { face: 1, expr: 'smile', look: [.6, 0] });
  if (k.lt > 2.4) { k.p('cup', L.hand[0] + 4, L.hand[1], { z: 70, s: 1 }); k.p('cash', L.handB[0], L.handB[1] - 16, { z: 70, n: 1 }); }
} });
def('S061', { cam: [[500, 1.15, 890], [700, 1.15, 890]], fn(k) {
  const lx = [[0, 380], [1.2, 760]]; k.a('LEON', lx, { face: 1, expr: 'sad' }); k.a('OWEN', [[0, 600], [1.2, 980]], { face: 1, expr: 'smile' });
} });
def('S062', { cam: [[260, 1.25, 890], [290, 1.35, 890]], fn(k) {
  const O = k.a('OWEN', 300, { face: 1, pose: 'stand', expr: k.lt > 1 ? 'surprised' : 'smile', look: [.1, .9] });
  k.p('shoelace', O.x + 12, 0, { z: 71 });
  k.a('LEON', 240, { face: 1, pose: 'tie', expr: 'smile', look: [.4, .9] });
} });
def('S063', { cam: [[300, 1.2, 890], [330, 1.25, 890]], fn(k) { k.a('LEON', 200, { face: 1, expr: 'happy', look: 'up' }); k.a('OWEN', 440, { face: 1, expr: 'smile', look: [.6, .0] }); } });
def('S064', { cam: [[200, 1.2, 890], [380, 1.3, 890], [200, 1.2, 890]], fn(k) {
  const lk = k.lt < 1.3 ? 'up' : k.lt < 2.6 ? [.9, 0] : k.lt < 3.7 ? 'up' : [.9, 0];
  k.a('LEON', 200, { face: 1, pose: 'think', expr: 'neutral', look: lk === 'up' ? 'up' : lk }); k.a('OWEN', 560, { face: -1, expr: 'smile', look: [-.6, 0] });
  const u = back(prog(k.lt, 3.4, 3.9)); if (k.lt > 3.4) k.push(80, (c) => { c.save(); c.translate(200, -560); c.scale(u * 1.1, u * 1.1); circ(c, 0, 0, 36, k.t % .5 < .25 ? '#ffe14a' : '#fff3a0', 7); rect(c, -16, 32, 32, 22, '#9aa6b5', 4, 6); c.restore(); });
} });
def('S068', { cam: [[100, .95, 884], [260, 1.0, 884]], fn(k) {
  k.a('LEON', [[0, -200], [3.6, 460]], { face: 1, expr: 'neutral' });
  const C = k.a('CHASE', 760, { y: -80, s: .8, face: -1, pose: 'holdFront', expr: 'smirk', look: [-.6, .3], prop: 'book', z: 4, noCheck: true });
  k.p('pencil', C.hand[0] - 20, C.hand[1] - 10, { z: 70, rot: -.4 + Math.sin(k.t * 20) * .2 });
} });
def('S069', { cam: [[300, 1.25, 890], [330, 1.32, 890]], fn(k) {
  k.a('LEON', 300, { face: 1, pose: 'phone', expr: 'worried', look: [.2, .8] });
} });
def('S070', { cam: [[300, 1.0, 884], [320, 1.0, 884]], fn(k) {
  k.p('calendar', 300, -600, { z: 70, s: 1.45 * back(prog(k.lt, .1, .8)), hi: true, rot: -.04 });
  const sil = (id, x) => k.a(id, x, { y: -30, s: .6, face: 1, pose: 'stand', sil: true, z: 5, noCheck: true });
  sil('LEON', -500); sil('OWEN', -380); sil('TESS', -260); sil('NIA', -160); sil('JUNE', -60);
} });
