// Класс: S001–S015, S022, S024, S025
import { def } from "/hybrid13/reg13.js";
import { clamp, lerp, sm, eo, back, prog, rnd, circ } from "/hybrid13/engine13.js";
import { cls } from "/hybrid13/helpers13.js";

const DEF = { expr: 'neutral' };
const surprised = (id, k, lag = 0) => k.lt > lag ? 'surprised' : 'neutral';
const allUp = (k, who = {}, lagStep = .12) => (id) => (id === 'LEON' ? { pose: 'sitUp', expr: 'neutral', look: [[0, [0.5, -1.5]], [.5, [-0.5, -1.5]], [1, [0.5, -1.5]], [1.5, [-0.5, -1.5]]] } : { expr: surprised(id, k, ((parseInt(id.replace(/\D/g, '')) || 3) % 7) * lagStep), look: 'up', pose: 'sit' });

def('S001', { cam: [[-330, .92, 884], [-150, .96, 884]], fn(k) {
  cls(k, { def: () => ({ expr: 'smile' }), who: { OWEN: { x: [[0, 1500], [1.5, 520]], expr: 'smile' }, K9: { x: [[0, 1700], [1.3, 880]] }, LEON: { pose: 'sitWrite', look: [-.3, .8] } }, park: { pose: 'stand', expr: 'smile' } });
} });
def('S002', { cam: [[-760, 1.0, 884], [-640, 1.12, 884]], fn(k) {
  const pk = k.a('PARK', -900, { face: 1, pose: [[0, 'explain'], [1.2, 'talk']], prop: 'book', talk: true, expr: 'smile' });
  cls(k, { noPark: true, def: (id) => ({ expr: 'smile', talk: id === 'K' + Math.min(3, Math.floor(k.lt / .45)) && false }), who: { LEON: { pose: 'sitWrite', look: [-.2, .8] } } });
} });
def('S003', { cam: [[260, 1.4, 905], [340, 1.52, 905]], fn(k) {
  const r = cls(k, { who: { LEON: { pose: 'sitWrite', prop: 'pencil', look: [-.3, 1] }, OWEN: { pose: 'sitWrite', look: [-.3, 1] }, K5: { hide: true }, K6: { hide: true }, K3: { hide: true }, K4: { hide: true } }, noPark: true });
  const p = k.at([[.4, 0], [3.2, 1]]);
  k.p('notebookOpen', 40, 24 - 128, { p, z: 20, s: 1.05 }); k.p('notebookOpen', 400, 24 - 128, { p: 0, z: 20, s: 1.05 });
} });
def('S004', { cam: [[200, 1.42, 905], [220, 1.55, 905]], fn(k) {
  const itch = k.lt > 1.2; k.p('desk', 150, 24, { f: -1, z: 10.0 }); k.p('chair', 150, 24, { f: -1, z: 9.9 });
  const L = k.a('LEON', 150, { y: 24, face: -1, pose: itch ? 'sitScratch' : 'sitWrite', expr: k.lt > 1.6 ? 'surprised' : 'neutral', look: itch ? 'up' : [-.3, .8] });
  cls(k, { skip: ['LEON'], noPark: true, who: { OWEN: { pose: 'sitWrite', look: [.3, .5] }, K5: { hide: true }, K6: { hide: true }, K3: { hide: true }, K4: { hide: true } } });
  if (k.lt > 1.2) k.p('sparks', L.head[0], L.head[1] - 40 * L.se, { z: 70, r: 100 });
  if (k.lt > 2.2) { const kk = back(prog(k.lt, 2.2, 2.7)); k.push(70, (c) => { c.save(); c.translate(L.head[0], L.top[1] - 70); c.scale(kk, kk); circ(c, 0, 0, 22 + 4 * Math.sin(k.t * 8), '#ffd23f', 8); c.restore(); }); }
} });
const seatedStd = (id) => ({ pose: 'sit' });
const wide = (cx, z = .95) => [[cx, z, 884], [cx + 60, z + .04, 884]];
def('S005', { cam: [[-120, 1.1, 890], [-60, 1.18, 890]], fn(k) {
  cls(k, { def: (id) => ({}), who: { LEON: { look: 'up', pose: 'sit' } }, park: { pose: 'stand' } });
} });
def('S006', { cam: [[-330, .95, 884], [-280, .98, 884]], fn(k) {
  const drop = k.lt > .6; const fall = k.at([[.6, 0], [1.1, 1]]);
  const pk = k.a('PARK', -900, { face: 1, pose: drop ? 'handsOnHead' : 'stand', expr: drop ? 'surprised' : 'neutral', look: drop ? [[0, [0.9, -.8]]] : [.5, 0], prop: undefined });
  cls(k, { noPark: true, who: { LEON: { look: 'up' } }, def: (id) => ({}) });
  if (!drop) k.p('chalk', pk.hand[0], pk.hand[1], { z: 40 }); else { const y = lerp(pk.hand[1], 0, fall * fall); k.p('chalk', lerp(pk.hand[0], -780, fall), fall < 1 ? y : 0, { z: 40, rot: fall * 5, broken: fall >= 1 }); }
} });
def('S007', { cam: [[-60, 1.12, 884], [-20, 1.2, 884]], fn(k) {
  const turn = k.lt > 1.3;
  const g = (id) => ({ face: turn ? 1 : -1, look: turn ? 'up' : [-.5, 0], expr: turn ? 'smile' : 'neutral', pose: 'sit' });
  cls(k, { noPark: true, who: { TESS: g(), NIA: g(), JUNE: g(), LEON: { look: 'up' } }, def: () => ({}) });
} });
def('S008', { capTop: false, cam: [[-130, 1.45, 850], [-110, 1.55, 850]], fn(k) {
  const g = { face: 1, look: [.6, -.9], expr: 'happy', pose: 'sitHand' };
  const r = cls(k, { noPark: true, skip: ['K0', 'K1', 'K2', 'K3', 'K4', 'OWEN', 'K5', 'K6'], who: { TESS: g, NIA: g, JUNE: g, LEON: { look: 'up' } }, def: () => ({}) });
  for (const id of ['TESS', 'NIA', 'JUNE']) { const h = r[id]; k.heartEyes(h); k.p('hearts', h.head[0] + 10, h.top[1] - 10, { z: 80, n: 3 }); }
} });
def('S009', { cam: [[330, 1.38, 900], [350, 1.46, 900]], fn(k) {
  cls(k, { noPark: true, skip: ['K3', 'K4', 'K5', 'K6', 'K0', 'K1', 'K2'], who: { OWEN: { pose: 'sitLean', face: -1, look: [-.6, 0], expr: 'smirk' }, LEON: { face: 1, look: [.6, 0], pose: 'sit' } }, def: () => ({}) });
} });
def('S010', { cam: [[330, 1.38, 900], [350, 1.48, 900]], fn(k) {
  const empty = k.lt > 1.2;
  const r = cls(k, { noPark: true, skip: ['K3', 'K4', 'K5', 'K6', 'K0', 'K1', 'K2'], who: { OWEN: { pose: [[0, 'sitLean'], [1, 'sitPoint']], face: -1, look: [-.5, -.6], expr: 'smirk', talk: k.lt < 3 }, LEON: { face: 1, look: [.5, .3], pose: empty ? 'sitShrug' : 'sit', expr: empty ? 'sad' : 'neutral' } }, def: () => ({}) });
  if (empty) k.p('emptyWallet', r.LEON.hand[0] + 14, r.LEON.hand[1] + 40, { z: 70, s: .7, rot: .3 });
} });
def('S011', { cam: [[150, 1.45, 905], [150, 1.58, 905]], fn(k) {
  const r = cls(k, { noPark: true, skip: ['K3', 'K4', 'K5', 'K6', 'K0', 'K1', 'K2', 'K7', 'K8', 'K9'], who: { LEON: { pose: 'sitUp', face: -1, look: [[0, [.4, -1.6]], [.6, [-.5, -1.6]], [1.2, [.4, -1.6]], [1.8, [-.5, -1.6]], [2.4, [0, -1.7]]], expr: 'neutral' }, OWEN: { look: 'up', expr: 'surprised', pose: 'sit' }, TESS: { hide: true }, NIA: { hide: true }, JUNE: { hide: true } }, def: () => ({}) });
} });
def('S012', { cam: [[-300, .92, 884], [-200, .98, 884]], fn(k) {
  cls(k, { park: { look: 'up', expr: 'surprised' }, def: allUp(k) });
} });
def('S013', { cam: [[-150, .96, 905], [-100, 1.0, 905]], clock: [8, 12], fn(k) {
  cls(k, { park: { look: 'up', expr: 'surprised' }, def: allUp(k) });
} });
def('S014', { cam: [[300, .95, 884], [200, .98, 884]], fn(k) {
  const g = { face: 1, look: 'up', expr: 'happy', pose: 'sit' };
  const r = cls(k, { who: { TESS: g, NIA: g, JUNE: g, LEON: { look: 'up', pose: 'sit' } }, def: (id) => ({ expr: 'surprised', look: 'up' }), park: { look: 'up', expr: 'surprised' } });
  k.a('CHASE', 1460, { face: -1, pose: 'stand', look: 'up', expr: 'surprised' });
  for (const id of ['TESS', 'NIA', 'JUNE']) k.heartEyes(r[id]);
} });
def('S015', { cam: [[-320, .88, 884], [-300, .92, 884]], clock: [3, 58], fn(k) {
  k.sc.clock = [3, 58 + Math.floor(k.lt * 1)];
  cls(k, { park: { look: 'up', expr: 'smile' }, def: (id) => ({ look: 'up', expr: 'neutral' }) });
} });
def('S022', { cam: [[170, 1.3, 902], [190, 1.42, 902]], fn(k) {
  const put = k.at([[.5, 0], [1.4, 1]], eo); const r = cls(k, { noPark: true, skip: ['K3', 'K4', 'K5', 'K6', 'K0', 'K1', 'K2'], who: { LEON: { pose: put < 1 ? 'sitHands' : 'sitHand', look: put < 1 ? 'up' : [-.3, .3], expr: put < 1 ? 'neutral' : 'sad' }, OWEN: { pose: 'sit', look: 'up' } }, def: () => ({}) });
  const L = r.LEON; const by = lerp(L.head[1] - 360, L.head[1] - .58 * L.hr, put); k.p('bucketHead', L.head[0], by, { z: 75, hr: L.hr });
  k.sc.numUp = 0;
} , numUp: 60 });
def('S024', { cam: [[330, 1.35, 900], [350, 1.45, 900]], fn(k) {
  const r = cls(k, { noPark: true, skip: ['K3', 'K4', 'K5', 'K6', 'K0', 'K1', 'K2'], who: { OWEN: { pose: 'sit', face: -1, look: [-.3, -1.2], expr: 'smirk', talk: false }, LEON: { pose: 'sitHand', face: -1, look: [-.2, .3], expr: 'sad' } }, def: () => ({}) });
  const L = r.LEON; k.p('bucketHead', L.head[0], L.head[1] - .58 * L.hr, { z: 75, hr: L.hr });
}, numUp: 60 });
def('S025', { cam: [[300, .95, 884], [500, .98, 884]], fn(k) {
  const lag = (id) => (parseInt(id.replace(/\D/g, '')) || 5) * .22;
  const r = cls(k, { park: { look: [.8, 0] }, def: (id) => ({ look: 'upL', expr: 'surprised' }),
    who: Object.fromEntries(['TESS', 'NIA', 'JUNE', 'OWEN', 'K0', 'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9'].map((id) => [id, { x: [[0, null], [1.2 + lag(id) * .5, null], [3.0 + lag(id) * .3, 1800]], expr: 'neutral', look: 'upL' }])) });
} });
