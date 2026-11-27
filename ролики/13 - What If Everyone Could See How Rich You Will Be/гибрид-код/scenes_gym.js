// Спортзал S071–S080, S104–S120, S123–S126, S129–S134
import { def } from "/hybrid13/reg13.js";
import { tandemPts } from "/hybrid13/props13.js";
import { clamp, lerp, sm, eo, back, prog, rnd, rect, circ, line, poly, rr, outline, stext, ptext, POSES, dog, burst, drawNum, fmtVal } from "/hybrid13/engine13.js";

const STAGE_Y = -190;
const gyS = (z) => 880 + 190 * z;                // камера, у которой пол сцены на y=880
const ik = (a, b, L1, L2, dir) => { const dx = b[0] - a[0], dy = b[1] - a[1]; const d = Math.min(Math.hypot(dx, dy), L1 + L2 - .5); const ang = Math.atan2(dy, dx) - dir * Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1)); return [a[0] + Math.cos(ang) * L1, a[1] + Math.sin(ang) * L1]; };
// тандем в спортзале: стол Owen у дальней стены справа, передним колесом влево
const BIKE = { x: 1400 };
const owenTable = (k, o = {}) => { k.p('table', 1400, 0, { w: 760, h: 200, z: 3 }); k.p('tandem', BIKE.x, 0, { f: -1, z: 5, ph: o.ph || 0, on: o.on, t: k.t }); if (o.sign !== false) k.p('sign', 1650, -200, { z: 6, text: o.signText || 'OWEN · TABLE 12', w: 190, h: 120, rot: .04 }); };
// велопоза: rider на седле (front: переднее, f=-1 едем влево), фаза педалей
function ride(k, id, front, phase, o = {}) {
  const se = (id === 'LEON' ? 1.55 * .86 : 1.55 * 1.12 * .72), f = -1, B = tandemPts(BIKE.x, f, phase), sad = front ? B.sadF : B.sadR, X = sad[0], Y = sad[1] + 72 * se;
  const base = { ...POSES.ride }, loc = (w) => [(w[0] - X) / (f * se), (w[1] - Y) / se];
  const hip = [0, -72], SEG = 80, pa = loc(front ? B.pedF : B.pedR), pb = loc(front ? B.pedF2 : B.pedR2);
  const kF = ik(hip, pa, SEG, SEG, 1), kB = ik(hip, pb, SEG, SEG, 1);
  const grip = loc(front ? B.gripF : B.gripR), sh = [34, -136], hF = grip, hB = [grip[0] + 5, grip[1] - 2];
  const eF = ik(sh, hF, 44, 44, -1), eB = ik(sh, hB, 44, 44, -1);
  return { pose: { ...base, head: [42, -171], sh, hip, eF, hF, eB, hB, kF, fF: pa, kB, fB: pb }, X, Y };
}
const crowd = (k, o = {}) => { // зрители на трибунах: sit/standing
  const rows = o.rows || [8, 8, 8, 8]; let n = 0; const res = [];
  rows.forEach((cnt, r) => { for (let i = 0; i < cnt; i++) { const id = 'K' + ((n * 5 + r * 3) % 12); const x = 660 + 90 * r + i * (o.dx || 96) + (rnd(n) - .5) * 18; if (o.skip && o.skip(r, i)) { n++; continue; }
    const st = o.stand ? o.stand(r, i, n) : false; const y = st ? -80 - 90 * r : 10 - 90 * r;
    const ov = o.def ? o.def(r, i, n) : {}; res.push(k.a(id, x, { y, s: .88, face: -1, pose: st ? (ov.pose || 'clap') : (ov.pose || 'sit'), expr: ov.expr || 'smile', look: ov.look || [-.5, 0], plain: true, z: 1.5 - r * .1 + i * .001, noCheck: true, bob: ov.bob || 0, ...ov.extra })); n++; } });
  return res;
};
const floorKids = (k, ids, x0, dx, o = {}) => ids.map((id, i) => k.a(id, x0 + i * dx + (rnd(i + 2) - .5) * 20, { y: (i % 3) * 14, face: o.face ?? -1, pose: o.pose || 'stand', expr: o.expr || 'smile', look: o.look || [-.5, 0], z: 10 + (i % 3) * .3, plain: o.plain, ...(o.each ? o.each(i) : {}) }));
const ALLK = ['K0', 'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'K0', 'K3', 'K6', 'K9', 'K1', 'K4', 'K7', 'K10'];
const PARKX = -620;
const parkAt = (k, o = {}) => k.a('PARK', PARKX, { face: 1, expr: 'neutral', look: [.6, 0], ...o });

def('S071', { cam: [[-100, .85, 884], [140, .9, 884]], fn(k) {
  parkAt(k, { pose: [[0, 'stand'], [2.6, 'holdFront']], prop: undefined });
  floorKids(k, ALLK.slice(0, 16), -480, 56, { each: (i) => ({ x: undefined }) });
  k.a('LEON', 420, { face: -1, expr: 'neutral' }); k.a('OWEN', 1000, { face: -1, expr: 'neutral', look: [-.6, .2] }); owenTable(k, { sign: true });
} });
def('S072', { cam: [[-420, 1.1, 884], [-360, 1.2, 884]], fn(k) {
  const P = parkAt(k, { pose: 'holdFront', expr: 'smile', talk: k.lt > .3 && k.lt < 3.4 }); k.p('tablet', P.hand[0] + 10, P.hand[1] - 10, { z: 70 });
  floorKids(k, ALLK.slice(0, 10), -400, 80); k.a('LEON', 380, { face: -1, expr: 'neutral' });
} });
def('S073', { cam: [[220, 1.0, 884], [260, 1.05, 884]], fn(k) {
  const jump = 1 - Math.abs(Math.sin(Math.min(k.lt, 1.2) * 4));
  const pop = (id, x, d) => k.a(id, lerp(x - 160, x, eo(prog(k.lt, d, d + .6))), { y: (['TESS', 'NIA', 'JUNE'].indexOf(id)) * 14, face: 1, pose: 'cheer', expr: 'happy', look: [.7, -.2], bob: 10, talk: k.lt > 3 });
  pop('TESS', 90, 0), pop('NIA', 190, .15), pop('JUNE', 290, .3);
  floorKids(k, ALLK.slice(0, 8), -420, 80, { face: 1 }); k.a('LEON', 520, { face: -1, expr: 'surprised', look: [-.7, -.2] }); parkAt(k);
} });
def('S074', { cam: [[100, 1.0, 884], [160, 1.04, 884]], fn(k) {
  const look = (i) => ({ look: k.lt % 1.6 < .8 ? [.7, 0] : [-.2, 0] });
  floorKids(k, ALLK.slice(0, 14), -420, 62, { face: 1, expr: 'neutral', each: look });
  ['TESS', 'NIA', 'JUNE'].forEach((id, i) => k.a(id, 90 + i * 100, { y: i * 14, face: 1, pose: 'handsOnHead' === 'x' ? 'stand' : 'cheer', expr: 'smile', look: [.7, -.1] }));
  k.a('LEON', 520, { face: -1, expr: 'worried', look: [-.5, .1] }); parkAt(k);
  k.push(60, (c) => { for (let i = 0; i < 26; i++) { const x = -400 + rnd(i) * 1200, y = -150 - rnd(i + 4) * 550 + Math.sin(k.t * .8 + i) * 30; c.fillStyle = 'rgba(255,248,210,.6)'; c.beginPath(); c.arc(x, y, 3 + rnd(i + 2) * 3, 0, 7); c.fill(); } });
} });
def('S075', { cam: [[900, .95, 884], [980, .98, 884]], fn(k) {
  owenTable(k, { sign: false }); k.p('sign', 1000, -4, { z: 6, text: '', w: 1, h: 1 });
  k.a('OWEN', 1000, { face: -1, pose: 'sad', expr: 'sad', look: [-.2, .9] }); k.a('LEON', 560, { face: 1, expr: 'neutral', look: [.7, 0] });
  floorKids(k, ALLK.slice(0, 5), 120, 60, { face: 1, expr: 'neutral' });
} });
def('S076', { cam: [[470, .95, 884], [500, .98, 884]], fn(k) {
  const lk = k.lt < 1 ? [-.8, 0] : k.lt < 2 ? [.8, 0] : [-.8, 0]; const f = k.lt < 1 ? -1 : k.lt < 2 ? 1 : -1;
  const L = k.a('LEON', 440, { face: f, pose: k.lt > 2.8 ? 'point' : 'stand', expr: 'smile', look: lk });
  ['TESS', 'NIA', 'JUNE'].forEach((id, i) => k.a(id, 80 + i * 100, { y: i * 14, face: 1, pose: 'cheer', expr: 'happy', look: [.7, 0], bob: 6 }));
  k.a('OWEN', 960, { face: -1, expr: 'sad', look: [-.3, .6] }); owenTable(k, { sign: false });
  floorKids(k, ALLK.slice(0, 5), -300, 60, { face: 1 });
} });
def('S077', { cam: [[-420, 1.15, 884], [-380, 1.22, 884]], fn(k) {
  const P = parkAt(k, { pose: [[0, 'holdFront'], [1.6, 'shrug']], expr: 'smile' }); if (k.lt < 1.6) k.p('tablet', P.hand[0] + 10, P.hand[1] - 10, { z: 70 });
  ['TESS', 'NIA', 'JUNE'].forEach((id, i) => k.a(id, -200 + i * 90, { y: i * 14, face: -1, pose: 'cheer', expr: 'happy', look: [-.6, 0] })); k.a('LEON', 260, { face: -1, expr: 'neutral' });
} });
def('S078', { cam: [[200, .98, 884], [260, 1.02, 884]], fn(k) {
  floorKids(k, ALLK, -380, 62, { face: 1, pose: 'handsOnHead', expr: 'surprised', look: 'up', each: (i) => ({ bob: k.lt > .8 ? 5 : 0 }) });
  k.a('LEON', 460, { face: -1, expr: 'sad', look: [-.5, .6] }); parkAt(k, { expr: 'surprised', look: [.6, -.6] }); k.a('OWEN', 960, { face: -1, expr: 'sad' }); owenTable(k, { sign: true });
} });
def('S079', { cam: [[1100, .9, 884], [1500, .92, 884]], fn(k) {
  const u = eo(prog(k.lt, 1.5, 3.9)), px = lerp(1420, 2150, u), flipped = k.lt >= 1.5;
  k.p('table', 1400, 0, { w: 760, h: 200, z: 3 });
  k.p('tandem', px, 0, { f: flipped ? 1 : -1, z: 5, rot: (px - 1420) / 108, on: flipped, t: k.t });
  k.a('OWEN', [[0, 1000], [.8, 1000], [1.5, 1420 - 228], [3.9, 2150 - 228]], { pose: 'pushBike', carry: 'pushBike', expr: 'neutral', look: [.7, 0] });
  k.a('LEON', 520, { face: 1, expr: 'sad', look: [.7, .1] });
  k.p('door', 2090, 0, { z: 3 });
} });
def('S080', { cam: [[1400, 1.0, 884], [1500, 1.04, 884]], fn(k) {
  k.a('LEON', 1260, { face: 1, pose: [[0, 'stand'], [.8, 'wave']], expr: k.lt > .8 ? 'sad' : 'surprised', look: [.8, 0], talk: k.lt > .8 && k.lt < 2.0 });
  k.p('doorShut', 2090, 0, { z: 3, open: 1 - sm(prog(k.lt, 1.4, 3.2)) });
} });
// ---------- вечер: зал полон ----------
def('S104', { cam: [[300, .78, 884], [380, .8, 884]], fn(k) {
  crowd(k, { def: (r, i, n) => ({ bob: 3, look: [-.6, 0] }) });
  floorKids(k, ALLK.slice(0, 6), -300, 80, { face: 1, expr: 'smile' }); k.a('LEON', -240, { face: 1, expr: 'neutral' });
  for (let i = 0; i < 6; i++) k.p('flash', 700 + rnd(i) * 900, -200 - rnd(i + 3) * 400, { z: 90, i });
  owenTable(k, { sign: true }); k.a('OWEN', 1020, { face: -1, expr: 'neutral' });
} });
def('S105', { cam: [[620, .85, 884], [700, .9, 884]], fn(k) {
  crowd(k, { def: (r, i, n) => ({ look: 'up', expr: 'surprised', pose: n % 3 ? 'phone' : 'sit' }) });
  const L = k.a('LEON', 100, { face: 1, expr: 'neutral', look: [.5, 0] });
  k.push(65, (c) => { c.save(); c.translate(300, -860); rect(c, -520, -90, 1040, 180, '#10233f', 22, 12); stext(c, '$17,250,000,000', 0, 4, 96, '#ffd23f', 0, 1); c.restore(); });
  for (let i = 0; i < 5; i++) k.p('flash', 700 + rnd(i) * 900, -200 - rnd(i + 3) * 400, { z: 90, i });
} });
def('S106', { cam: [[1250, 1.05, 884], [1230, 1.12, 884]], fn(k) {
  owenTable(k, { signText: 'OWEN · TABLE 12' }); k.a('OWEN', 1130, { face: -1, pose: 'stand', expr: 'sad', look: [-.5, .5] });
  k.a('A0', [[0, 600], [4, 1000]], { face: 1, expr: 'joy', look: [.8, 0], pose: 'stand' }); k.a('A1', [[0, 480], [4, 880]], { face: 1, expr: 'joy', look: [.8, 0] });
} });
def('S107', { cam: [[1000, 1.25, 884], [980, 1.32, 884]], fn(k) {
  owenTable(k, {}); const O = k.a('OWEN', 1250, { face: -1, pose: 'reach', expr: 'sad', look: [-.2, .9] });
  [['A0', 820], ['A1', 910], ['A3', 1000], ['K2', 1090]].forEach(([id, x], i) => k.a(id, x, { face: 1, pose: i % 2 ? 'handsOnHead' : 'stand', expr: 'joy', look: [.8, -.1], bob: 9 }));
} });
def('S108', { cam: [[-450, .72, 884], [-430, .73, 884]], fn(k) {
  crowd(k, { def: () => ({ look: [-.7, 0] }) });
  const x = lerp(-1850, -1380, eo(prog(k.lt, .2, 3.4))); const yy = -clamp((x + 1850) / 190, 0, 1) * 190 + 0;
  k.a('LEON', [[0, -1740], [1.2, -1650], [3.6, -1380]], { face: 1, y: [[0, 0], [1.2, -190], [3.6, -190]], expr: 'neutral' });
  k.a('HALE', 700, { y: 10, face: -1, pose: 'sit', expr: 'smile', look: [-.6, 0], z: 4, plain: false });
} });
def('S109', { cam: [[-450, .72, 884], [-430, .73, 884]], fn(k) {
  crowd(k, { def: () => ({ look: [-.7, 0] }) });
  const L = k.a('LEON', -1300, { y: STAGE_Y, face: 1, pose: [[0, 'stand'], [.6, 'holdFront']], expr: 'neutral', look: [.6, .3] }); k.p('contract', L.hand[0] + 8, L.hand[1] - 10, { z: 70, s: .75, rot: -.05, sign: false });
  k.a('HALE', 700, { y: 10, face: -1, pose: 'sit', expr: 'smile', look: [-.6, 0], z: 4 });
} });
def('S110', { cam: [[-450, .72, 884], [-430, .73, 884]], fn(k) {
  crowd(k, { skip: (r, i) => r === 0 && i < 2, def: () => ({ look: [-.7, 0] }) });
  const L = k.a('LEON', -1300, { y: STAGE_Y, face: 1, pose: 'holdFront', expr: 'worried', look: [.6, .3] }); k.p('contract', L.hand[0] + 8, L.hand[1] - 10, { z: 70, s: .75, rot: -.05 });
  k.a('HALE', 560, { y: 0, face: -1, pose: 'point', expr: 'smirk', look: [-.8, 0], talk: k.lt > .4 && k.lt < 1.7 });
} });
def('S111', { camFn: (lt) => [-1300, 1.55, gyS(1.55)], fn(k) {
  const L = k.a('LEON', -1300, { y: STAGE_Y, face: 1, pose: 'holdFront', expr: 'worried', look: [.5, .9] }); k.p('contract', L.hand[0] + 8, L.hand[1] - 10, { z: 70, s: .85, rot: -.05 });
  const dip = k.at([[0, 40], [1.6, 40], [2.6, 0]]); k.p('pen', L.hand[0] + 70 - dip * .5, L.hand[1] - 40 + dip * .6, { z: 72, rot: -.5 });
} });
def('S112', { cam: [[-1100, 1.05, gyS(1.05)], [-1000, 1.1, gyS(1.1)]], fn(k) {
  const L = k.a('LEON', -1300, { y: STAGE_Y, face: 1, pose: 'cheer', expr: 'surprised', look: 'up', bob: 5 }); k.p('contract', L.hand[0], L.hand[1] - 20, { z: 70, s: .75 });
  k.push(40, (c) => { for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + k.t * .4; line(c, [[-1300 + Math.cos(a) * 150, -480 + Math.sin(a) * 150], [-1300 + Math.cos(a) * 420, -480 + Math.sin(a) * 420]], 10, 'rgba(255,215,60,.65)'); } });
} });
def('S113', { cam: [[680, .9, 884], [740, .94, 884]], fn(k) {
  crowd(k, { stand: () => true, def: (r, i, n) => ({ pose: n % 2 ? 'cheer' : 'clap', expr: 'joy', look: [-.5, -.2], bob: 7 }) });
  k.a('HALE', 700, { y: -10, face: -1, pose: 'clap', expr: 'smile', look: [-.6, 0], z: 4 }); k.a('MOM', 1100, { y: -260, face: -1, pose: 'clap', expr: 'joy', look: [-.6, 0], z: 3.5 }); k.a('DAD', 1230, { y: -260, face: -1, pose: 'clap', expr: 'joy', look: [-.6, 0], z: 3.5 });
  k.push(3.4, (c) => dog(c, 1360, -260, { pose: 'sit', f: -1, t: k.t, k: 1 }));
  for (let i = 0; i < 7; i++) k.p('flash', 700 + rnd(i) * 900, -200 - rnd(i + 3) * 400, { z: 90, i });
} });
def('S114', { numUp: -10, cam: [[-1260, 1.45, gyS(1.45)], [-1220, 1.5, gyS(1.5)]], fn(k) {
  const look = k.lt < 2 ? [.3, .9] : [.9, -.1]; const L = k.a('LEON', -1300, { y: STAGE_Y, face: 1, pose: 'holdFront', expr: k.lt < 2 ? 'worried' : 'neutral', look }); k.p('contract', L.hand[0] + 8, L.hand[1] - 10, { z: 70, s: .85, rot: -.05, sign: false });
} });
def('S115', { cam: [[-450, .72, 884], [-430, .73, 884]], fn(k) {
  crowd(k, { def: () => ({ look: [-.7, 0] }) }); const tear = k.ph(.6, 1.0);
  const L = k.a('LEON', -1250, { y: STAGE_Y, face: 1, pose: k.lt < .6 ? 'holdFront' : 'tear', expr: k.lt < .6 ? 'neutral' : 'angry', look: [.6, 0] });
  if (tear < 1) k.p('contract', L.hand[0] - 20, L.hand[1], { z: 70, s: .8 }); else { const u = prog(k.lt, 1.0, 2.8); k.p('contractHalf', lerp(L.hand[0], L.hand[0] + 140, eo(u)), lerp(L.hand[1], 0, u * u) - 0, { z: 70, s: .7, rot: u * 4 }); k.p('contractHalf', L.hand[0] - 20, L.hand[1] + 20, { z: 70, s: .7, rot: .15 }); }
  k.push(3.4, (c) => dog(c, 1160, -260, { pose: k.lt > 2.6 ? 'wag' === 'x' : 'stand', f: -1, t: k.t, k: 1 }));
  k.a('HALE', 700, { y: 10, face: -1, pose: 'sit', expr: 'surprised', look: [-.6, 0], z: 4 });
} });
def('S116', { cam: [[-1260, 1.4, gyS(1.4)], [-1230, 1.46, gyS(1.46)]], fn(k) {
  const L = k.a('LEON', -1300, { y: STAGE_Y, face: 1, pose: 'tear', expr: 'sad', look: [.4, .3] }); k.p('contractHalf', L.hand[0] - 30, L.hand[1] + 30, { z: 70, s: .7, rot: .2 }); k.p('contractHalf', L.handB[0] - 6, L.handB[1] + 40, { z: 70, s: .7, rot: -.1 });
} });
def('S117', { cam: [[-100, .85, 884], [-60, .88, 884]], fn(k) {
  crowd(k, { def: () => ({ look: 'up', expr: 'surprised', pose: 'sit' }) }); floorKids(k, ALLK.slice(0, 8), -460, 80, { face: 1, expr: 'surprised', look: 'up' });
  k.a('LEON', -240, { face: 1, expr: 'sad', look: [.4, .3] });
} });
def('S118', { cam: [[1000, 1.0, 960], [1040, 1.1, 960]], fn(k) {
  crowd(k, { rows: [0, 0, 6, 6], def: (r, i, n) => ({ expr: 'surprised', look: 'up' }) });
  k.a('A1', 1020, { y: 10 - 90 * 2, s: 1, face: -1, pose: 'phone', expr: 'surprised', look: 'up', z: 3.9 });
  k.a('A3', 1130, { y: 10 - 90 * 2, s: 1, face: -1, pose: 'sit', expr: 'surprised', look: [-.8, -.2], z: 3.9, bob: 4 }); k.a('A0', 900, { y: 10 - 90 * 2, s: 1, face: 1, pose: 'sit', expr: 'surprised', look: [.8, -.2], z: 3.9 });
} });
// Leon прыгает со сцены и бежит к столу Owen
def('S119', { camFn: (lt) => [lerp(-1200, 1150, sm(prog(lt, .3, 2.4))), .9, 884, 0], fn(k) {
  owenTable(k, {}); const riding = k.lt > 2.6;
  const O = k.a('OWEN', riding ? 1400 : 1130, { face: -1, expr: 'surprised', look: [-.8, 0], hide: riding });
  if (!riding) k.a('LEON', [[0, -1260], [.35, -1000], [.6, -760], [2.4, 1180]], { run: true, face: 1, y: [[0, -190], [.2, -190], [.55, 0]], expr: 'happy', look: [.8, 0], pose: 'stand', carry: undefined });
  else { const r = ride(k, 'LEON', true, 0); k.a('LEON', r.X, { y: r.Y, face: -1, pose: r.pose, expr: 'smile', look: [-.8, 0], still: true }); const r2 = ride(k, 'OWEN', false, 0); k.a('OWEN', r2.X, { y: r2.Y, face: -1, pose: r2.pose, expr: 'surprised', look: [-.5, 0], still: true }); }
  crowd(k, { def: () => ({ look: [-.7, 0] }) });
} });
def('S120', { cam: [[1160, 1.15, 884], [1180, 1.25, 884]], fn(k) {
  const ph = k.lt * 7; owenTable(k, { on: k.lt > 3.2, ph: ph });
  const r = ride(k, 'LEON', true, ph); k.a('LEON', r.X, { y: r.Y, face: -1, pose: r.pose, expr: 'happy', look: [-.8, 0], still: true });
  const owenIn = k.lt > 1.0; const r2 = ride(k, 'OWEN', false, ph); if (owenIn) k.a('OWEN', r2.X, { y: r2.Y, face: -1, pose: r2.pose, expr: 'smirk', look: [-.8, 0], still: true }); else k.a('OWEN', 1560, { face: -1, expr: 'smirk', look: [-.8, 0] });
  crowd(k, { def: () => ({ look: [-.6, 0] }) });
} });
def('S123', { cam: [[1000, .95, 884], [1100, 1.0, 884]], fn(k) {
  owenTable(k, { on: true, ph: k.lt * 7 });
  const rs = crowd(k, { stand: (r, i, n) => n % 2 === 0, def: (r, i, n) => ({ pose: n % 2 === 0 ? 'reach' : 'phone', expr: 'worried', look: [-.5, 0] }) });
  k.push(80, (c) => { rs.forEach((r, i) => { c.save(); c.beginPath(); c.moveTo(r.hand[0], r.hand[1]); c.quadraticCurveTo((r.hand[0] + BIKE.x) / 2, r.hand[1] + 220 + rnd(i) * 80, BIKE.x, -170); c.lineWidth = 6; c.strokeStyle = '#111'; c.stroke(); c.lineWidth = 2.5; c.strokeStyle = '#ffd23f'; c.stroke(); c.restore(); }); });
  rs.forEach((r, i) => { if (i % 3 === 0) k.p('phone', r.hand[0], r.hand[1] - 30, { z: 75, pct: '1%', s: 1 }); });
  const ph = k.lt * 7, r = ride(k, 'LEON', true, ph); k.a('LEON', r.X, { y: r.Y, face: -1, pose: r.pose, expr: 'happy', look: [-.8, 0], still: true }); const r2 = ride(k, 'OWEN', false, ph); k.a('OWEN', r2.X, { y: r2.Y, face: -1, pose: r2.pose, expr: 'smirk', look: [-.8, 0], still: true });
} });
def('S124', { cam: [[1180, 1.1, 884], [1160, 1.2, 884]], fn(k) {
  const ph = k.lt * 8; owenTable(k, { on: true, ph: ph });
  const r = ride(k, 'LEON', true, ph); const L = k.a('LEON', r.X, { y: r.Y, face: -1, pose: r.pose, expr: 'happy', look: 'up', still: true }); const r2 = ride(k, 'OWEN', false, ph); k.a('OWEN', r2.X, { y: r2.Y, face: -1, pose: r2.pose, expr: 'happy', look: 'up', still: true });
  k.push(40, (c) => { for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + k.t * .5; line(c, [[L.head[0] + Math.cos(a) * 200, -620 + Math.sin(a) * 200], [L.head[0] + Math.cos(a) * 520, -620 + Math.sin(a) * 520]], 10, 'rgba(255,215,60,.55)'); } });
  crowd(k, { def: () => ({ expr: 'surprised', look: 'up' }) });
} , numUp: 40 });
def('S125', { clock: [4, 0], cam: [[1000, 1.0, 884], [1040, 1.05, 884]], fn(k) {
  owenTable(k, { signText: 'TABLE 12' });
  const L = k.a('LEON', 760, { face: 1, expr: 'smile', look: 'up' }), O = k.a('OWEN', 1060, { face: -1, expr: 'smile', look: 'up' });
  const nv = (t) => fmtVal(61e9);
}, mirror: true, numFs: 50, numDx: -40, deltaDx: -330 });
def('S126', { cam: [[960, 1.0, 884], [980, 1.05, 884]], fn(k) {
  owenTable(k, { signText: 'TABLE 12' });
  const L = k.a('LEON', 760, { face: 1, expr: 'happy', look: 'up' }), O = k.a('OWEN', 1060, { face: -1, expr: 'happy', look: 'up' });
  k.push(61, (c) => { for (const r of [O]) { c.save(); c.translate(r.head[0] + 330, r.top[1] - 100); const s = 1 + .1 * Math.sin(k.t * 8); c.scale(s, s); poly(c, [[0, -34], [28, 4], [10, 4], [10, 34], [-10, 34], [-10, 4], [-28, 4]], '#3fdc55', 6); c.restore(); } });
}, mirror: true, numFs: 50, numDx: -40, deltaDx: -330 });
def('S129', { cam: [[620, 1.1, 884], [660, 1.18, 884]], fn(k) {
  const C = k.a('CHASE', 460, { face: 1, pose: [[0, 'stand'], [.7, 'reach']], expr: 'sad', look: [.6, .3], talk: k.lt > 1.2 && k.lt < 3.8 }); k.p('notebookOpen', C.hand[0] + 6, C.hand[1] + 6, { z: 70, p: 1, s: .8 });
  k.a('LEON', 780, { face: -1, expr: 'neutral', look: [-.5, 0] }); k.a('OWEN', 960, { face: -1, expr: 'neutral', look: [-.5, 0] });
} });
def('S130', { cam: [[1180, 1.05, 884], [1200, 1.12, 884]], fn(k) {
  owenTable(k, { sign: false }); const P = k.a('PARK', 1340, { face: -1, pose: 'holdFront', expr: 'smile', look: [-.6, .3] });
  const drop = k.ph(.5, 1.2); k.p('sign', lerp(1310, 1480, eo(drop)) , lerp(-300, -203, eo(drop)), { z: 70, text: 'TABLE 12 · LEON & OWEN', w: 270, h: 120, rot: .02 });
  k.a('LEON', 800, { face: 1, expr: 'smile', look: [.7, 0] }); k.a('OWEN', 960, { face: -1, expr: 'smile', look: [-.6, 0] });
} });
def('S131', { cam: [[900, 1.3, 884], [920, 1.38, 884]], fn(k) {
  k.a('OWEN', 1010, { face: -1, pose: [[0, 'stand'], [.6, 'lean']], expr: 'smirk', look: [-.7, -.1], talk: k.lt > 3 && k.lt < 4 }); k.a('LEON', 800, { face: 1, expr: 'neutral', look: [.7, 0] });
} });
def('S132', { cam: [[900, 1.3, 884], [920, 1.38, 884]], fn(k) {
  k.a('OWEN', 1010, { face: -1, pose: 'lean', expr: 'surprised', look: [-.7, -.1] }); k.a('LEON', 800, { face: 1, pose: 'stand', expr: 'smile', look: [.7, 0], talk: k.lt < 1.2 });
} });
def('S133', { cam: [[1500, 1.0, 884], [1540, 1.06, 884]], fn(k) {
  crowd(k, { rows: [0, 0, 0, 0] }); k.p('chair', 700, 0, { f: -1, z: 5 }); k.p('folderW', 700, -90, { z: 9, s: .9 });
  k.p('doorShut', 2090, 0, { z: 3, open: 1 - sm(prog(k.lt, .3, 2.0)) });
} });
def('S134', { cam: [[300, 1.2, 884], [320, 1.28, 884]], fn(k) {
  ['TESS', 'NIA', 'JUNE'].forEach((id, i) => { const r = k.a(id, -20 + i * 110, { y: i * 14, face: 1, pose: 'wave', expr: 'happy', look: [.7, 0], bob: 2 }); k.heartEyes(r); });
  k.a('LEON', 520, { face: -1, pose: 'wave', expr: 'smile', look: [-.7, 0] });
} });
