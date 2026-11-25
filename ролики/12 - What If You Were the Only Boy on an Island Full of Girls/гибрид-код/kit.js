// Набор: ключи времени, предметы мира (рисуются кодом в стиле «комикс и стикеры»).
import { W, H, FONT, clamp, lerp, sm, eo, back, prog, rnd, rr, outline, dots, stext, burst } from "/hybrid12/lib.js";
export const INK = '#111';
// ключи: число/строка = константа; [[u,v],...] = ключи (числа плавно, строки/объекты ступенькой)
export function K(v, u, def = 0) {
  if (v === undefined) return def; if (!Array.isArray(v) || !Array.isArray(v[0])) return v;
  if (u <= v[0][0]) return v[0][1]; const last = v[v.length - 1]; if (u >= last[0]) return last[1];
  for (let i = 0; i < v.length - 1; i++) { const a = v[i], b = v[i + 1]; if (u >= a[0] && u < b[0]) { if (typeof a[1] !== 'number') return a[1]; const k = sm((u - a[0]) / (b[0] - a[0] || 1)); return lerp(a[1], b[1], k); } }
  return last[1];
}
export const poly = (c, pts, fill, lw = 8) => { c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath(); outline(c, fill, lw); };
export const circ = (c, x, y, r, fill, lw = 8) => { c.beginPath(); c.arc(x, y, r, 0, 7); outline(c, fill, lw); };
export const ell = (c, x, y, rx, ry, fill, lw = 8, rot = 0) => { c.beginPath(); c.ellipse(x, y, rx, ry, rot, 0, 7); outline(c, fill, lw); };
export const line = (c, pts, lw = 8, col = INK) => { c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.lineWidth = lw; c.strokeStyle = col; c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke(); };
const wob = (t, a, f = 1, ph = 0) => Math.sin(t * f * 6.283 + ph) * a;
// ---------- предметы ----------
export const PR = {};
PR.bag = (c, p, u) => { // прозрачный пакет с зелёными палочками
  const g = p.glow ?? 0.5; c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); c.rotate(p.rot || 0);
  c.beginPath(); c.moveTo(-34, -48); c.quadraticCurveTo(-48, 0, -36, 40); c.lineTo(36, 40); c.quadraticCurveTo(48, 0, 34, -48); c.closePath(); c.fillStyle = 'rgba(220,245,255,.55)'; c.fill(); c.lineWidth = 6; c.strokeStyle = INK; c.stroke();
  for (let i = 0; i < 6; i++) { const a = -0.9 + i * 0.35, x = (i - 2.5) * 11; c.save(); c.shadowColor = '#5dff8a'; c.shadowBlur = 16 * g; line(c, [[x - 10 * Math.sin(a), 30], [x + 14 * Math.sin(a), -30]], 7, `rgb(${70 + 60 * g | 0},${200 + 40 * g | 0},110)`); c.restore(); }
  c.beginPath(); c.moveTo(-34, -48); c.lineTo(-18, -62); c.lineTo(0, -48); c.lineTo(18, -62); c.lineTo(34, -48); c.lineWidth = 6; c.strokeStyle = INK; c.stroke(); c.restore();
};
PR.cap = (c, p) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); c.rotate(p.rot || 0);
  c.beginPath(); c.arc(0, 0, 36, Math.PI, 0); c.closePath(); outline(c, '#17c3b2', 7); c.beginPath(); c.moveTo(-34, 0); c.quadraticCurveTo(-72, 2, -66, 12); c.lineTo(-30, 8); c.closePath(); outline(c, '#17c3b2', 7); c.restore(); };
PR.bed = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); c.rotate(p.rot || 0);
  for (const x of [-100, 100]) line(c, [[x, 0], [x, 52]], 12, '#5e3b1c'); poly(c, [[-130, -24], [130, -24], [130, 4], [-130, 4]], '#9a6a38', 8);
  for (let i = 0; i < 6; i++) { ell(c, -100 + i * 40, -34 - (i % 2) * 6, 26, 12, ['#4fb860', '#3fa04e'][i % 2], 6, (i - 3) * 0.12); }
  c.restore(); };
PR.tent = (c, p, u) => { c.save(); c.translate(p.x, p.y); const s = p.s || 1; c.scale(s, s);
  poly(c, [[-170, 0], [0, -330], [170, 0]], p.col || '#e8a23a', 9); poly(c, [[-50, 0], [0, -150], [50, 0]], '#3a2a1e', 7);
  line(c, [[0, -330], [0, -350]], 8); poly(c, [[0, -350], [44, -338], [0, -326]], p.flag || '#ef4b5a', 5);
  dots(c, -90, -250, 180, 240, 'rgba(0,0,0,.08)', 18, 3, () => 1); c.restore(); };
PR.log = (c, p) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); const L = p.len || 420;
  c.beginPath(); rr(c, -L / 2, -64, L, 64, 28); outline(c, '#8a5a2e', 9); line(c, [[-L / 2 + 40, -40], [L / 2 - 90, -40]], 5, '#5e3b1c'); line(c, [[-L / 2 + 90, -20], [L / 2 - 40, -22]], 5, '#5e3b1c');
  ell(c, L / 2, -32, 20, 32, '#c89a60', 8); c.beginPath(); c.arc(L / 2, -32, 9, 0, 7); c.lineWidth = 4; c.strokeStyle = '#8a5a2e'; c.stroke(); c.restore(); };
PR.palm = (c, p, u) => { c.save(); c.translate(p.x, p.y); const s = p.s || 1; c.scale(s * (p.f || 1), s); const sw = wob(u, 7, .25, p.x * .01);
  c.beginPath(); c.moveTo(-22, 0); c.quadraticCurveTo(10 + sw, -300, 40 + sw, -640); c.lineTo(66 + sw, -636); c.quadraticCurveTo(40 + sw, -300, 24, 0); c.closePath(); outline(c, '#a06a34', 9);
  for (let i = 0; i < 7; i++) { c.save(); c.translate(52 + sw, -640); c.rotate(-1.2 + i * 0.42 + wob(u, .05, .4, i)); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(110, -64, 250, 20); c.quadraticCurveTo(120, -20, 0, 14); c.closePath(); outline(c, ['#3fa04e', '#52b85e'][i % 2], 8); c.restore(); }
  for (const [dx, dy] of [[38, -620], [70, -616]]) circ(c, dx + sw, dy, 16, '#7a4a22', 6); c.restore(); };
PR.coconut = (c, p) => { circ(c, p.x, p.y, 22 * (p.s || 1), '#7a4a22', 7); circ(c, p.x - 6, p.y - 5, 3, INK, 0); circ(c, p.x + 5, p.y - 8, 3, INK, 0); };
PR.rock = (c, p) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); poly(c, [[-220, 0], [-190, -150], [-90, -260], [60, -300], [180, -210], [240, 0]], p.col || '#8e8e98', 10);
  dots(c, -150, -230, 260, 200, 'rgba(0,0,0,.14)', 20, 4, () => 1); line(c, [[-60, -240], [-20, -130], [-70, -50]], 5, '#5a5a64'); c.restore(); };
PR.flag = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.scale(p.f ?? 1, 1); line(c, [[0, 0], [0, -220]], 10, '#5e3b1c'); const w = wob(u, 10, .8); poly(c, [[0, -220], [90, -205 + w], [70, -180], [92, -150 - w], [0, -140]], p.col || '#ef4b5a', 7); c.restore(); };
PR.sign = (c, p) => { c.save(); c.translate(p.x, p.y); line(c, [[0, 0], [0, -170]], 10, '#5e3b1c'); c.beginPath(); rr(c, -70, -250, 140, 80, 10); outline(c, '#f4e3b0', 8); c.font = `46px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = INK; c.fillText(p.t || '', 0, -208); c.restore(); };
PR.barrel = (c, p) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); c.rotate(p.rot || 0); c.beginPath(); rr(c, -42, -100, 84, 100, 18); outline(c, p.col || '#2e86c1', 8); line(c, [[-42, -70], [42, -70]], 6); line(c, [[-42, -30], [42, -30]], 6); c.restore(); };
PR.plank = (c, p) => { c.save(); c.translate(p.x, p.y); c.rotate(p.rot || 0); c.scale(p.s || 1, p.s || 1); poly(c, [[-170, -14], [160, -22], [170, 8], [-160, 14]], '#b98a52', 7); line(c, [[-100, -4], [60, -8]], 3, '#7a5a30'); c.restore(); };
PR.rope = (c, p) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); c.beginPath(); c.arc(0, 0, 34, 0, 7); c.lineWidth = 12; c.strokeStyle = INK; c.stroke(); c.lineWidth = 7; c.strokeStyle = '#d9b97a'; c.stroke(); c.restore(); };
PR.raft = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); c.rotate((p.rot || 0) + wob(u, .025, .5)); const n = p.broken ?? 0;
  if (!n) { PR.barrel(c, { x: -170, y: 40 }); PR.barrel(c, { x: 0, y: 40 }); PR.barrel(c, { x: 170, y: 40 }); poly(c, [[-250, -66], [250, -74], [250, -34], [-250, -26]], '#b98a52', 9); line(c, [[-120, -52], [100, -56]], 4, '#7a5a30'); line(c, [[-170, -70], [-170, -26]], 8, '#d9b97a'); line(c, [[170, -70], [170, -26]], 8, '#d9b97a'); }
  else { for (let i = 0; i < 3; i++) { c.save(); c.translate(-170 + i * 170 + (i - 1) * n * 80, 40 - n * 10 * i); c.rotate((i - 1) * n * .5); PR.barrel(c, { x: 0, y: 0 }); c.restore(); } PR.plank(c, { x: -n * 90, y: -60 + n * 40, rot: -n * .5 }); }
  c.restore(); };
PR.bottle = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); c.rotate(p.rot || 0); const lv = p.lv ?? 0.8;
  c.beginPath(); c.moveTo(-16, 0); c.lineTo(-16, -52); c.lineTo(-8, -66); c.lineTo(-8, -84); c.lineTo(8, -84); c.lineTo(8, -66); c.lineTo(16, -52); c.lineTo(16, 0); c.closePath(); c.fillStyle = 'rgba(210,240,255,.6)'; c.fill();
  if (lv > 0) { c.save(); c.clip(); c.fillStyle = p.liq || 'rgba(60,150,230,.85)'; c.fillRect(-20, -lv * 60, 40, lv * 60 + 4); c.restore(); }
  c.lineWidth = 5; c.strokeStyle = INK; c.stroke(); poly(c, [[-9, -84], [9, -84], [9, -92], [-9, -92]], '#e8e8e8', 4); c.restore(); };
PR.bottles = (c, p, u) => { const n = p.n || 6; for (let i = 0; i < n; i++) PR.bottle(c, { x: p.x + i * 46, y: p.y, s: p.s || 1.3, lv: p.lv ?? .9 }); };
PR.tarp = (c, p, u) => { c.save(); c.translate(p.x, p.y); const sw = p.sag ?? 40; poly(c, [[-260, -330], [260, -330], [190, -300 + sw], [-190, -300 + sw]], '#3a7ca5', 8); line(c, [[-250, -330], [-250, 0]], 12, '#5e3b1c'); line(c, [[250, -330], [250, 0]], 12, '#5e3b1c');
  if (p.drips) for (let i = 0; i < 6; i++) { const d = (u * 1.4 + i * .37) % 1; circ(c, -120 + i * 50, -300 + sw + d * 250, 6, '#8fd0ff', 3); } c.restore(); };
PR.stick = (c, p) => { c.save(); c.translate(p.x, p.y); c.rotate(p.rot || 0); c.scale(p.s || 1, p.s || 1); c.shadowColor = '#5dff8a'; c.shadowBlur = 24 * (p.g ?? 1); line(c, [[-30, 0], [30, 0]], 14, '#1c6b3a'); line(c, [[-30, 0], [30, 0]], 8, `rgb(120,255,150)`); c.restore(); };
PR.crackers = (c, p) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); c.beginPath(); rr(c, -50, -70, 100, 70, 8); outline(c, '#d8a43a', 8); stext(c, 'CRACKERS', 0, -34, 22, '#fff', 0, 1, INK, false); c.restore(); };
PR.bubble = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); const k = back(prog(u, p.a || 0, (p.a || 0) + .3)); c.scale(k, k);
  circ(c, -70, 120, 12, '#fff', 5); circ(c, -40, 80, 20, '#fff', 5); ell(c, 0, 0, p.w || 190, p.h || 110, '#fff', 8); c.restore(); };
PR.lamp = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); const k = back(prog(u, p.a || 0, (p.a || 0) + .25)); c.scale(k, k);
  for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; line(c, [[Math.cos(a) * 52, Math.sin(a) * 52], [Math.cos(a) * 76, Math.sin(a) * 76]], 6, '#ffb400'); }
  circ(c, 0, 0, 36, '#ffe14a', 8); poly(c, [[-14, 32], [14, 32], [12, 52], [-12, 52]], '#bbb', 6); c.restore(); };
PR.excl = (c, p, u) => { c.save(); c.translate(p.x, p.y); const k = back(prog(u, p.a || 0, (p.a || 0) + .25)); c.scale(k * (p.s || 1), k * (p.s || 1)); poly(c, [[-48, 30], [0, -66], [48, 30]], '#ffd23f', 9); c.fillStyle = INK; c.fillRect(-5, -30, 10, 36); circ(c, 0, 18, 6, INK, 0); c.restore(); };
PR.zzz = (c, p, u) => { for (let i = 0; i < 3; i++) { const d = (u * .6 + i * .33) % 1; c.save(); c.globalAlpha = 1 - d; stext(c, 'Z', p.x + d * 40 + i * 20, p.y - d * 90 - i * 30, 40 + i * 14, '#fff', .2, 1); c.restore(); } };
PR.stars = (c, p, u) => { for (let i = 0; i < 4; i++) { const a = u * 5 + i * 1.57; c.save(); c.translate(p.x + Math.cos(a) * 60, p.y + Math.sin(a) * 18); poly(c, [[0, -14], [4, -4], [14, -4], [6, 3], [9, 13], [0, 7], [-9, 13], [-6, 3], [-14, -4], [-4, -4]], '#ffd23f', 3); c.restore(); } };
PR.sun = (c, p, u) => { c.save(); c.translate(p.x, p.y); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + u * .3; line(c, [[Math.cos(a) * 90, Math.sin(a) * 90], [Math.cos(a) * 130, Math.sin(a) * 130]], 9, '#ffb400'); } circ(c, 0, 0, 70, '#ffe14a', 9); c.restore(); };
PR.moon = (c, p) => { c.save(); c.translate(p.x, p.y); c.beginPath(); c.arc(0, 0, 80, 0, 7); c.fillStyle = '#f4efd0'; c.fill(); c.lineWidth = 9; c.strokeStyle = INK; c.stroke(); circ(c, 25, -20, 14, '#dcd6b0', 0); circ(c, -30, 24, 10, '#dcd6b0', 0); c.restore(); };
PR.cloud = (c, p, u) => { c.save(); c.translate(p.x + wob(u, 20, .05), p.y); c.scale(p.s || 1, p.s || 1); const sh = () => { c.beginPath(); c.arc(0, 0, 60, 0, 7); c.moveTo(145, -20); c.arc(70, -20, 75, 0, 7); c.moveTo(208, 6); c.arc(150, 6, 58, 0, 7); c.rect(0, 0, 150, 58); }; sh(); c.lineWidth = 20; c.strokeStyle = INK; c.lineJoin = 'round'; c.stroke(); sh(); c.fillStyle = p.col || '#fff'; c.fill(); c.restore(); };
PR.foam = (c, p, u) => { c.save(); c.translate(p.x, p.y); const w = p.w || 300; c.beginPath(); c.moveTo(-w / 2, 0); for (let i = 0; i <= 12; i++) c.lineTo(-w / 2 + w * i / 12, -14 - (i % 2) * 14 + wob(u, 4, 1, i)); c.lineTo(w / 2, 0); c.closePath(); outline(c, '#fff', 7); c.restore(); };
PR.seaweed = (c, p) => { c.save(); c.translate(p.x, p.y); for (let i = 0; i < 5; i++) ell(c, -70 + i * 36, -10 - (i % 2) * 8, 34, 14, ['#3a5a2a', '#4a6a30', '#6a5a2a'][i % 3], 6, (i - 2) * .12); line(c, [[-100, -6], [-20, -26], [60, -10]], 8, '#6a4a28'); c.restore(); };
PR.wave = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); c.beginPath(); c.moveTo(-200, 0); c.quadraticCurveTo(-120, -190, 60, -170); c.quadraticCurveTo(190, -150, 150, -60); c.quadraticCurveTo(110, -90, 70, -50); c.quadraticCurveTo(190, -20, 200, 0); c.closePath(); outline(c, '#4fb3e8', 9); dots(c, -120, -150, 200, 120, 'rgba(255,255,255,.5)', 16, 3, () => 1); if (p.eyes) { circ(c, -10, -100, 22, '#fff', 5); circ(c, 50, -104, 22, '#fff', 5); circ(c, -18, -98, 8, INK, 0); circ(c, 42, -102, 8, INK, 0); } c.restore(); };
PR.paddle = (c, p) => { c.save(); c.translate(p.x, p.y); c.rotate(p.rot || 0); line(c, [[-120, 0], [100, 0]], 10, '#8a5a2e'); ell(c, 120, 0, 40, 20, '#c89a60', 7); c.restore(); };
PR.pole = (c, p) => { c.save(); c.translate(p.x, p.y); c.rotate(p.rot || 0); line(c, [[0, 40], [0, -300]], 12, '#8a5a2e'); c.restore(); };
PR.map = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.rotate(p.rot || -.05); c.scale(p.s || 1, p.s || 1); c.beginPath(); rr(c, -160, -110, 320, 220, 14); outline(c, '#cfcfd6', 10); const dd = p.draw ?? 1;
  for (let i = 0; i < 6; i++) { if (i / 6 > dd) break; poly(c, [[-120 + i * 42, -40], [-100 + i * 42, -80], [-80 + i * 42, -40]], '#ef4b5a', 4); }
  if (p.boy) { c.font = `48px ${FONT}`; c.fillStyle = '#e0242b'; c.textAlign = 'center'; c.fillText('x ?', 110, 80); } c.restore(); };
PR.radio = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.scale(p.s || 1, p.s || 1); c.rotate(p.rot || 0); c.beginPath(); rr(c, -34, -56, 68, 112, 12); outline(c, '#3a3a44', 8); line(c, [[18, -56], [34, -120]], 6); circ(c, 0, -20, 14, '#888', 5); c.fillStyle = '#7bff9a'; c.fillRect(-20, 10, 40, 22); c.restore(); };
PR.ticket = (c, p) => { c.save(); c.translate(p.x, p.y); c.rotate(p.rot || .2); c.beginPath(); rr(c, -60, -30, 120, 60, 8); outline(c, '#ffe08a', 7); c.font = `22px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = INK; c.fillText('LAST SEAT', 0, 0); c.restore(); };
PR.stickbunch = (c, p) => { for (let i = 0; i < (p.n || 4); i++) PR.stick(c, { x: p.x + i * 12, y: p.y - i * 14, rot: .4 * i, g: p.g ?? 1 }); };
PR.branch = (c, p) => { c.save(); c.translate(p.x, p.y); c.rotate(p.rot || 0); line(c, [[-50, 0], [50, -8]], 10, '#7a5a30'); line(c, [[0, -4], [24, -34]], 6, '#7a5a30'); ell(c, 34, -40, 20, 10, '#4fb860', 5, -.5); c.restore(); };
PR.shelter = (c, p, u) => { c.save(); c.translate(p.x, p.y); const b = p.build ?? 1; poly(c, [[-220, 0], [-160, -250], [200, -270], [260, 0]], '#7a5a30', 9);
  for (let i = 0; i < 8 * b; i++) ell(c, -170 + i * 48, -200 + (i % 3) * 30, 40, 16, ['#4fb860', '#3fa04e'][i % 2], 6, (i % 4 - 1.5) * .3); poly(c, [[-80, 0], [-60, -150], [120, -160], [140, 0]], '#2e2418', 7); c.restore(); };
PR.card = (c, p, u) => {};
PR.dunnBoat = (c, p, u) => { c.save(); c.translate(p.x, p.y + wob(u, 6, .7)); c.scale(p.s || 1, p.s || 1); c.rotate(wob(u, .05, .7)); poly(c, [[-210, -50], [210, -50], [160, 40], [-160, 40]], '#e8e8ec', 9); poly(c, [[-210, -50], [210, -50], [200, -36], [-200, -36]], '#ef4b5a', 6); c.restore(); };
PR.boat = (c, p, u) => boat(c, p, u);
// большой катер: локальные координаты, палуба y=0, нос вправо
export function boat(c, p, u) {
  c.save(); c.translate(p.x, p.y); c.scale((p.s || 1) * (p.flip ? -1 : 1), p.s || 1); c.rotate(p.tilt || 0);
  poly(c, [[-1100, 0], [900, 0], [1180, -70], [1050, 160], [-1000, 160]], '#e9edf2', 11); poly(c, [[-1060, 60], [1100, 60], [1080, 100], [-1040, 100]], '#2e6fb5', 7);
  poly(c, [[160, 0], [160, -300], [760, -300], [820, 0]], '#f4f6f8', 10); for (const x of [260, 460, 660]) { c.beginPath(); rr(c, x - 50, -240, 100, 110, 16); outline(c, '#8fd0ff', 7); }
  poly(c, [[300, -300], [300, -370], [620, -370], [620, -300]], '#2e6fb5', 9); line(c, [[600, -370], [600, -520]], 10); poly(c, [[600, -520], [700, -500], [600, -470]], '#ef4b5a', 5);
  if (p.rail !== false) { line(c, [[-1060, -150], [140, -150]], 10); for (let x = -1060; x <= 140; x += 120) line(c, [[x, 0], [x, -150]], 8); }
  if (p.smoke) for (let i = 0; i < 5; i++) { const d = (u * .5 + i * .2) % 1; c.save(); c.globalAlpha = (1 - d) * .8; circ(c, 460 + d * 80 - i * 6, -400 - d * 260, 26 + d * 50, '#9a9aa4', 0); c.restore(); }
  c.restore();
}
// спасательный круг-метка, плот и т. п. — по месту
export function deckBg(c, u) { }
export { wob };

PR.ring = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.setLineDash([22, 14]); c.lineDashOffset = -u * 30; c.lineWidth = 12; c.strokeStyle = '#fff'; c.beginPath(); c.arc(0, 0, p.r || 130, 0, 7); c.stroke(); c.lineWidth = 6; c.strokeStyle = '#ffd23f'; c.stroke(); c.restore(); };
PR.sonic = (c, p, u) => { c.save(); c.translate(p.x, p.y); c.scale(p.dir || 1, 1); for (let i = 0; i < 3; i++) { const d = (u * 1.3 + i * .33) % 1; c.globalAlpha = 1 - d; c.beginPath(); c.arc(0, 0, 60 + d * 220, -.7, .7); c.lineWidth = 14; c.strokeStyle = INK; c.stroke(); c.lineWidth = 7; c.strokeStyle = '#fff'; c.stroke(); } c.restore(); };
PR.heart = (c, p, u) => { c.save(); c.translate(p.x, p.y); const k = back(prog(u, p.a || 0, (p.a || 0) + .3)) * (1 + .06 * Math.sin(u * 8)); c.scale(k * (p.s || 1), k * (p.s || 1)); c.beginPath(); c.moveTo(0, 30); c.bezierCurveTo(-60, -10, -40, -50, 0, -20); c.bezierCurveTo(40, -50, 60, -10, 0, 30); outline(c, '#ef4b5a', 6); c.restore(); };
PR.pillow = (c, p, u) => { c.save(); c.translate(p.x, p.y + wob(u, 6, .8)); c.rotate(wob(u, .08, .6)); c.beginPath(); rr(c, -60, -26, 120, 52, 22); outline(c, '#fff', 8); line(c, [[-30, -8], [30, -8]], 4, '#bbb'); c.restore(); };
PR.confetti = (c, p, u) => { for (let i = 0; i < 70; i++) { const d = (u * .5 + rnd(i)) % 1, x = p.x + (rnd(i + 9) - .5) * 1500 + Math.sin(u * 3 + i) * 40, y = p.y + d * 900; c.save(); c.translate(x, y); c.rotate(u * 4 + i); c.fillStyle = ['#5dff8a', '#ffd23f', '#ff5fa2', '#4fb3e8'][i % 4]; c.fillRect(-8, -4, 16, 8); c.restore(); } };
PR.rays = (c, p, u) => { c.save(); c.translate(p.x, p.y); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283; line(c, [[Math.cos(a) * 110, Math.sin(a) * 110], [Math.cos(a) * 170, Math.sin(a) * 170]], 8, '#ffe14a'); } c.restore(); };
const SOSL = { S: [[.9, .08], [.1, .08], [.1, .5], [.9, .5], [.9, .92], [.1, .92]], O: [[.1, .08], [.9, .08], [.9, .92], [.1, .92], [.1, .08]] };
export function sosDraw(c, xs, y0, h, keys, u) { // светящиеся буквы S O S на стене: keys=[[u,progress]...]
  const kk = K(keys, u, 0); c.save(); c.shadowColor = '#5dff8a'; c.shadowBlur = 28; ['S', 'O', 'S'].forEach((L, i) => { const k = clamp(kk * 3 - i); if (k <= 0) return; const pts = SOSL[L].map(([a, b]) => [xs[i] + (a - .5) * h * .62, y0 - h + b * h]); let tot = 0; const seg = []; for (let j = 1; j < pts.length; j++) { const l = Math.hypot(pts[j][0] - pts[j - 1][0], pts[j][1] - pts[j - 1][1]); seg.push(l); tot += l; } let rem = tot * k; c.beginPath(); c.moveTo(pts[0][0], pts[0][1]); for (let j = 1; j < pts.length && rem > 0; j++) { const f = Math.min(1, rem / seg[j - 1]); c.lineTo(pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * f, pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * f); rem -= seg[j - 1]; } c.lineWidth = 34; c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = '#1c6b3a'; c.stroke(); c.lineWidth = 20; c.strokeStyle = '#7dff9a'; c.stroke(); }); c.restore(); }
