// gfx4.js ролика 09: кольцо-таймер, облако-видение, ворота, скутер, рама с прожекторами, сцена, мелкие предметы.
import { E, S, C, D, ease, prog, clamp, lerp, text, measure, FONTS, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, SETS, characterHead } from './lib.js';
import * as X from './gfx.js';
import * as Y from './gfx3.js';
const ink = () => S().ink;
const W = () => E.W, H = () => E.H;

// ---- кольцо-таймер: val = сколько секунд осталось, lost = сколько из них «съедено» (красные деления), max = всего делений
export function ring(g, x, y, r, val, o = {}) {
  const max = o.max ?? 10, lost = o.lost ?? 0, col = o.col ?? '#2fb3d8';
  g.save(); g.translate(x, y);
  inkCircle(g, 0, 0, r + 10, { fill: '#10182b', w: 6 });
  for (let i = 0; i < max; i++) {
    const a0 = -Math.PI / 2 + (i / max) * Math.PI * 2 + 0.05, a1 = -Math.PI / 2 + ((i + 1) / max) * Math.PI * 2 - 0.05;
    const on = i < val, red = i >= val && i < val + lost;
    g.beginPath(); g.arc(0, 0, r * 0.82, a0, a1); g.lineWidth = r * 0.2; g.lineCap = 'butt';
    g.strokeStyle = red ? '#e5383b' : on ? col : '#2a3550'; g.stroke();
  }
  text(g, o.label ?? String(val), 0, r * 0.06, { size: r * (String(o.label ?? val).length > 2 ? 0.62 : 0.9), color: '#fff', font: FONTS.title, weight: 400, stroke: 6, strokeColor: '#10182b' });
  g.restore();
}
// ---- облако-видение: тёмное «кино» внутри мысленного облака, fn(g,cx,cy,w,h,t) рисует внутри (clip), кольцо в углу
export function vision(g, t, x, y, w, h, fn, o = {}) {
  const k = o.k ?? 1; g.save(); g.translate(x, y); g.scale(k, k);
  const N = 14; for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2; inkCircle(g, Math.cos(a) * (w / 2 - 24), Math.sin(a) * (h / 2 - 20), 44, { fill: '#10182b', w: 5 }); }
  inkEllipse(g, 0, 0, w / 2 - 16, h / 2 - 12, { fill: '#10182b', w: 0 });
  const [tx, ty] = o.tail || [-w * 0.34, h * 0.78]; [[0.3, 24], [0.62, 16], [0.9, 10]].forEach(([u, rr]) => inkCircle(g, lerp(-w * 0.2, tx, u), lerp(h * 0.45, ty, u), rr, { fill: '#10182b', w: 4 }));
  g.save(); g.beginPath(); g.ellipse(0, 0, w / 2 - 22, h / 2 - 18, 0, 0, 7); g.clip();
  g.fillStyle = '#1b2a4d'; g.fillRect(-w / 2, -h / 2, w, h);
  g.strokeStyle = 'rgba(120,180,255,.10)'; g.lineWidth = 3; for (let yy = -h / 2; yy < h / 2; yy += 22) { g.beginPath(); g.moveTo(-w / 2, yy + ((t * 40) % 22)); g.lineTo(w / 2, yy + ((t * 40) % 22)); g.stroke(); }
  fn && fn(g, 0, 0, w, h, t);
  if (o.flash) { g.fillStyle = `rgba(229,56,59,${0.18 * (0.5 + 0.5 * Math.sin(t * 14))})`; g.fillRect(-w / 2, -h / 2, w, h); }
  g.restore();
  if (o.ring != null) ring(g, w / 2 - 92, -h / 2 + 84, 74, o.ring, { lost: o.lost });
  g.restore();
}
// ---- ворота (вид спереди): x центр, GY земля, w ширина, h высота; сетка сзади
export function goal(g, x, GY, w = 640, h = 300, o = {}) {
  const d = 60, l = x - w / 2, r = x + w / 2, top = GY - h;
  g.save(); g.globalAlpha = 0.55; g.strokeStyle = '#6b7280'; g.lineWidth = 2;
  for (let xx = l + 20; xx < r; xx += 28) { g.beginPath(); g.moveTo(xx, top - d * 0.5); g.lineTo(xx, GY - d * 0.5); g.stroke(); }
  for (let yy = top - d * 0.5 + 24; yy < GY - d * 0.5; yy += 28) { g.beginPath(); g.moveTo(l - d * 0.3, yy); g.lineTo(r + d * 0.3, yy); g.stroke(); }
  g.restore();
  inkLine(g, [[l, top], [l - d * 0.3, top - d * 0.5], [l - d * 0.3, GY - d * 0.5]], { w: 4, stroke: '#6b7280' });
  inkLine(g, [[r, top], [r + d * 0.3, top - d * 0.5], [r + d * 0.3, GY - d * 0.5]], { w: 4, stroke: '#6b7280' });
  inkLine(g, [[l - d * 0.3, top - d * 0.5], [r + d * 0.3, top - d * 0.5]], { w: 4, stroke: '#6b7280' });
  inkLine(g, [[l, GY], [l, top], [r, top], [r, GY]], { w: 12, stroke: '#fff' });
  inkLine(g, [[l, GY], [l, top], [r, top], [r, GY]], { w: 4 });
}
// ---- мяч-футбольный с тенью: X.soccer(g,x,y,r)
export const ball = (g, x, y, r, rot = 0) => { g.save(); g.translate(x, y); g.rotate(rot); X.soccer(g, 0, 0, r); g.restore(); };
// ---- перчатка вратаря на руке: x,y центр ладони, k масштаб, rot
export function glove(g, x, y, k = 1, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k);
  inkRect(g, -20, 10, 40, 22, { fill: '#2f6dd8', r: 6, w: 4 });
  inkRect(g, -28, -34, 56, 50, { fill: '#9be564', r: 14, w: 5 });
  for (let i = 0; i < 4; i++) inkRect(g, -26 + i * 14, -62 + (i % 2 ? 6 : 0), 12, 36, { fill: '#9be564', r: 6, w: 4 });
  inkRect(g, 22, -22, 14, 30, { fill: '#9be564', r: 6, w: 4 });
  g.restore();
}
// ---- скутер сбоку: x центр, GY земля, k масштаб, f направление (1 вправо)
export function scooter(g, x, GY, k = 1, f = 1, t = 0) {
  g.save(); g.translate(x, GY); g.scale(f * k, k);
  const wr = 36;
  inkCircle(g, -86, -wr, wr, { fill: '#2b2f36', w: 6 }); inkCircle(g, -86, -wr, 14, { fill: '#cfd6dd', w: 4 });
  inkCircle(g, 96, -wr, wr, { fill: '#2b2f36', w: 6 }); inkCircle(g, 96, -wr, 14, { fill: '#cfd6dd', w: 4 });
  inkRect(g, -80, -wr - 28, 160, 22, { fill: '#e4872b', r: 10, w: 5 });
  inkLine(g, [[96, -wr], [70, -wr - 130]], { w: 9, stroke: '#cfd6dd' });
  inkLine(g, [[70, -wr - 130], [46, -wr - 140]], { w: 8 });
  inkRect(g, -70, -wr - 48, 56, 22, { fill: '#2b2f36', r: 8, w: 4 });
  g.restore();
}
// ---- забор с калиткой: x0..x1, GY; gate = x калитки (центр), открыта наружу
export function fence(g, x0, x1, GY, gate = null, open = 1) {
  const h = 150; for (let xx = x0; xx < x1; xx += 46) { if (gate != null && Math.abs(xx - gate) < 70) continue; inkRect(g, xx, GY - h, 34, h, { fill: '#f1ead9', r: 4, w: 4 }); }
  inkLine(g, [[x0, GY - h * 0.7], [x1, GY - h * 0.7]], { w: 6 }); inkLine(g, [[x0, GY - h * 0.25], [x1, GY - h * 0.25]], { w: 6 });
  if (gate != null) { inkRect(g, gate - 80, GY - h - 10, 14, h + 10, { fill: '#9a6a3a', r: 3, w: 4 }); inkRect(g, gate + 66, GY - h - 10, 14, h + 10, { fill: '#9a6a3a', r: 3, w: 4 }); const ang = open * 1.2; g.save(); g.translate(gate + 66, GY); g.scale(1, 1); inkShape(g, [[0, -h * 0.9], [-120 * Math.cos(ang), -h * 0.9 + 18 * Math.sin(ang)], [-120 * Math.cos(ang), -h * 0.15 + 18 * Math.sin(ang)], [0, -h * 0.1]], { fill: '#f1ead9', w: 4 }); g.restore(); }
}
// ---- стальная рама с прожекторами на четырёх тросах. cx центр по x, y центр рамы, w ширина; snap: 0..1 (правый трос порван), ang наклон
export function frame(g, cx, y, w = 640, o = {}) {
  const ang = o.ang ?? 0, h = 46, top = o.top ?? -60, snap = o.snap ?? 0, cabs = [-0.46, -0.16, 0.16, 0.46];
  g.save(); g.translate(cx, y); g.rotate(ang);
  cabs.forEach((u, i) => { const x = u * w, last = i === 3; const ty = (top - y); if (last && snap > 0) { inkLine(g, [[x, -h / 2], [x + 14 * snap, -h / 2 - (y - top) * 0.2]], { w: 5, stroke: '#9aa3ad' }); } else inkLine(g, [[x, -h / 2], [x * Math.cos(-ang) - 0, ty - 0]], { w: 5, stroke: '#9aa3ad' }); });
  inkRect(g, -w / 2, -h / 2, w, h, { fill: '#8a949f', r: 6, w: 6 });
  for (let xx = -w / 2 + 20; xx < w / 2 - 10; xx += 40) inkLine(g, [[xx, -h / 2 + 4], [xx + 20, h / 2 - 4], [xx + 40, -h / 2 + 4]], { w: 3, stroke: '#5b6670' });
  for (let i = 0; i < 4; i++) { const lx = (-0.36 + i * 0.24) * w; inkRect(g, lx - 20, h / 2, 40, 34, { fill: '#2b2f36', r: 6, w: 4 }); inkCircle(g, lx, h / 2 + 40, 11, { fill: o.on ? '#fff59d' : '#f2f2f2', w: 3 }); }
  g.restore();
}
// ---- зал/сцена: платформа сцены (x0..x1 по x, topY верх настила) + занавес
export function stagePlatform(g, x0, x1, topY, GY) {
  inkRect(g, x0, topY, x1 - x0, 26, { fill: '#b57a3d', r: 4, w: 5 });
  inkRect(g, x0 + 10, topY + 26, x1 - x0 - 20, GY - topY - 26, { fill: '#8a5a2e', r: 0, w: 4 });
  for (let xx = x0 + 60; xx < x1; xx += 120) inkLine(g, [[xx, topY + 30], [xx, GY - 4]], { w: 3, stroke: alpha('#000', 0.25) });
}
export function curtain(g, x0, x1, top, bot, col = '#a62b3a') {
  inkRect(g, x0, top, x1 - x0, bot - top, { fill: col, r: 0, w: 5 });
  for (let xx = x0 + 40; xx < x1; xx += 70) inkLine(g, [[xx, top + 8], [xx - 10, bot - 6]], { w: 4, stroke: alpha('#000', 0.28) });
}
// ---- мелкие предметы
export function popcorn(g, x, y, k = 1) { inkShape(g, [[x - 34 * k, y - 20 * k], [x + 34 * k, y - 20 * k], [x + 26 * k, y + 40 * k], [x - 26 * k, y + 40 * k]], { fill: '#e5383b', w: 4 }); [-18, -6, 8, 20].forEach((dx, i) => inkCircle(g, x + dx * k, y - 26 * k - (i % 2) * 8 * k, 13 * k, { fill: '#fff6d6', w: 3 })); inkLine(g, [[x - 12 * k, y - 18 * k], [x - 10 * k, y + 38 * k]], { w: 3, stroke: '#fff' }); inkLine(g, [[x + 12 * k, y - 18 * k], [x + 10 * k, y + 38 * k]], { w: 3, stroke: '#fff' }); }
export function plug(g, x, y, k = 1, cordTo = null) { if (cordTo) { g.save(); g.strokeStyle = ink(); g.lineWidth = 7; g.beginPath(); g.moveTo(x, y + 20 * k); g.quadraticCurveTo((x + cordTo[0]) / 2, Math.max(y, cordTo[1]) + 60, cordTo[0], cordTo[1]); g.stroke(); g.restore(); } inkRect(g, x - 18 * k, y - 22 * k, 36 * k, 40 * k, { fill: '#2b2f36', r: 6 * k, w: 4 }); inkLine(g, [[x - 8 * k, y - 22 * k], [x - 8 * k, y - 40 * k]], { w: 6 * k, stroke: '#cfd6dd' }); inkLine(g, [[x + 8 * k, y - 22 * k], [x + 8 * k, y - 40 * k]], { w: 6 * k, stroke: '#cfd6dd' }); }
export function bigCheck(g, x, y, w = 420, rot = 0, lab = '$10,000') { g.save(); g.translate(x, y); g.rotate(rot); inkRect(g, -w / 2, -w * 0.22, w, w * 0.44, { fill: '#fffdf6', r: 6, w: 6 }); text(g, 'PAY TO LEON', -w * 0.1, -w * 0.1, { size: w * 0.07, font: FONTS.title, weight: 400, color: '#3d7ea6' }); text(g, lab, 0, w * 0.06, { size: w * 0.2, font: FONTS.title, weight: 400, color: '#1f7a3a', stroke: 5, strokeColor: '#fff' }); inkLine(g, [[-w * 0.4, w * 0.17], [w * 0.1, w * 0.17]], { w: 3, stroke: '#777' }); g.restore(); }
export function thermometer(g, x, y, k = 1, lvl = 0.6) { inkRect(g, x - 9 * k, y - 80 * k, 18 * k, 120 * k, { fill: '#e8f1f7', r: 9 * k, w: 4 }); inkCircle(g, x, y + 42 * k, 16 * k, { fill: '#e5383b', w: 4 }); inkRect(g, x - 4 * k, y + 40 * k - 118 * k * lvl, 8 * k, 118 * k * lvl, { fill: '#e5383b', r: 3, w: 0 }); }
export function eraser(g, x, y, k = 1, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); inkRect(g, -40 * k, -18 * k, 80 * k, 36 * k, { fill: '#f29ac0', r: 8 * k, w: 5 }); inkRect(g, -40 * k, -18 * k, 34 * k, 36 * k, { fill: '#cfd6dd', r: 8 * k, w: 5 }); g.restore(); }
export function magnifier(g, x, y, k = 1) { inkCircle(g, x, y, 40 * k, { fill: 'rgba(200,230,255,.5)', w: 7 }); inkLine(g, [[x + 28 * k, y + 28 * k], [x + 70 * k, y + 70 * k]], { w: 12 * k }); }
export function hourglass(g, x, y, k = 1, t = 0) { inkRect(g, x - 30 * k, y - 60 * k, 60 * k, 10 * k, { fill: '#a87636', r: 4, w: 4 }); inkRect(g, x - 30 * k, y + 50 * k, 60 * k, 10 * k, { fill: '#a87636', r: 4, w: 4 }); inkShape(g, [[x - 26 * k, y - 50 * k], [x + 26 * k, y - 50 * k], [x + 3 * k, y], [x + 26 * k, y + 50 * k], [x - 26 * k, y + 50 * k], [x - 3 * k, y]], { fill: '#e8f1f7', w: 5 }); const u = (t * 0.3) % 1; inkShape(g, [[x - 20 * k, y + 50 * k], [x + 20 * k, y + 50 * k], [x, y + (50 - 36 * u) * k]], { fill: '#f2c21a', w: 0 }); }
export function scales(g, x, y, k = 1, tilt = 0) { inkLine(g, [[x, y + 120 * k], [x, y - 70 * k]], { w: 8 }); inkRect(g, x - 50 * k, y + 116 * k, 100 * k, 16 * k, { fill: '#a87636', r: 5, w: 4 }); g.save(); g.translate(x, y - 70 * k); g.rotate(tilt); inkLine(g, [[-130 * k, 0], [130 * k, 0]], { w: 8 }); [[-130, 1], [130, 1]].forEach(([dx]) => { inkLine(g, [[dx * k, 0], [dx * k, 80 * k]], { w: 3 }); inkShape(g, [[(dx - 46) * k, 80 * k], [(dx + 46) * k, 80 * k], [(dx + 30) * k, 106 * k], [(dx - 30) * k, 106 * k]], { fill: '#cfd6dd', w: 5 }); }); g.restore(); }
export function filmStrip(g, x, y, w, h, n = 5, t = 0, hi = -1) { inkRect(g, x - w / 2, y - h / 2, w, h, { fill: '#2b2f36', r: 8, w: 5 }); const cw = (w - 20) / n; for (let i = 0; i < n; i++) { inkRect(g, x - w / 2 + 10 + i * cw + 4, y - h / 2 + 12, cw - 8, h - 24, { fill: i === hi ? '#ffd23a' : (i % 2 ? '#cfe6f5' : '#fffdf6'), r: 4, w: 3 }); } }
export function helmetDummy(g, x, GY, k = 1) { inkRect(g, x - 28 * k, GY - 190 * k, 56 * k, 190 * k, { fill: '#8a949f', r: 14, w: 5 }); inkCircle(g, x, GY - 210 * k, 28 * k, { fill: '#cfd6dd', w: 5 }); inkLine(g, [[x - 28 * k, GY - 130 * k], [x - 80 * k, GY - 90 * k]], { w: 9 }); inkLine(g, [[x + 28 * k, GY - 130 * k], [x + 80 * k, GY - 90 * k]], { w: 9 }); }
// наушники на голове куклы o (после drawCharacter)
export function headphones(g, o) { const h = characterHead(o); const hx = h[0], hy = h[1], R = 44 * o.s * (o.outfit?.kid ? 0.72 * 1.12 : 1), f = o.facing ?? 1; g.save(); g.strokeStyle = '#2b2f36'; g.lineWidth = 10; g.beginPath(); g.arc(hx - f * R * 0.08, hy, R * 1.06, Math.PI * 1.02, Math.PI * 1.98); g.stroke(); inkRect(g, hx - f * R * 0.08 - R * 0.2, hy - R * 0.28, R * 0.4, R * 0.56, { fill: '#e5383b', r: 8, w: 4 }); g.restore(); }
export function bagOn(g, o) { const f = o.facing ?? 1, e = o.s * (o.outfit?.kid ? 0.72 : 1); inkLine(g, [[o.x - f * 6 * e, o.y - 170 * e], [o.x - f * 30 * e, o.y - 98 * e]], { w: 7, stroke: '#6b3a1e' }); inkRect(g, o.x - f * 30 * e - 28 * e, o.y - 100 * e, 56 * e, 62 * e, { fill: '#8a5a2e', r: 8, w: 4 }); }
export const sign = (g, x, y, w, h, lines, col = '#fffdf6') => { inkRect(g, x - w / 2, y - h / 2, w, h, { fill: col, r: 10, w: 6 }); lines.forEach(([s, sz, c], i) => text(g, s, x, y - h / 2 + h * (0.22 + 0.3 * i), { size: sz, font: FONTS.title, weight: 400, color: c || ink() })); };
export function bed(g, x, gy, w = 640, f = 1) { inkLine(g, [[x - w / 2, gy], [x - w / 2, gy - 150]], { w: 9 }); inkLine(g, [[x + w / 2, gy], [x + w / 2, gy - 90]], { w: 9 }); inkRect(g, x - w / 2, gy - 120, w, 40, { fill: '#e8f4f2', r: 10, w: 6 }); inkRect(g, x - w / 2 - 10, gy - 200, 24, 120, { fill: '#9aa8b0', r: 6, w: 5 }); inkRect(g, x - w / 2 + 14, gy - 150, 150, 40, { fill: '#fff', r: 18, w: 5 }); }
export function blanketTo(g, x0, x1, topY, botY) { inkRect(g, x0, topY, x1 - x0, botY - topY, { fill: '#7ab8e0', r: 22, w: 6 }); inkLine(g, [[x0 + 24, topY + 26], [x1 - 24, topY + 26]], { w: 4, stroke: '#cfe6f5' }); inkLine(g, [[x0 + 24, topY + 54], [x1 - 24, topY + 54]], { w: 3, stroke: '#a6d0ec' }); }
