// gfx.js: картинки-схемы и предметы в стиле doodle (все линии через ink, цвета из S().ui и плоские цвета предметов).
import { E, S, ui, C, D, ease, prog, clamp, lerp, text, FONTS, inkLine, inkRect, inkCircle, inkShape, inkEllipse, inkBlob, drawCharacter, alpha, shade } from './lib.js';

export const pop = (t, s, d = 0.35) => ease.outBack(prog(t, s, s + d));
export const fade = (t, s, d = 0.3) => ease.out(prog(t, s, s + d));
export const W = () => E.W, H = () => E.H;
const INK = () => S().ink;
const lab = (g, str, x, y, size = 46, color) => text(g, str, x, y, { size, font: FONTS.ui, weight: 900, color: color || INK() });
export { lab };

// линейка IQ: от 0 до upto (доля), метки [[доля, текст]]
export function ruler(g, t, o = {}) {
  const { x0 = 160, x1 = 1760, y = 560, upto = 1, start = 0, marks = [], snap = 0, split = 0 } = o;
  const p = ease.inOut(prog(t, start, start + 1.4)) * upto, xe = lerp(x0, x1, p);
  g.save(); if (snap) { const s = ease.in(clamp(snap)); g.translate(0, s * 60); }
  inkRect(g, x0, y - 40, xe - x0, 80, { fill: '#fff6d8', r: 6 });
  for (let i = 0; i <= 40; i++) { const x = lerp(x0, x1, i / 40); if (x > xe) break; inkLine(g, [[x, y - 40], [x, y - (i % 5 ? 20 : 4)]], { w: 3 }); }
  g.restore();
  for (const [f, s] of marks) { const x = lerp(x0, x1, f); if (x > xe) continue; inkLine(g, [[x, y + 40], [x, y + 110]], { w: 5, stroke: ui().accent }); lab(g, s, x, y + 150, 50, ui().accent); }
}
export function stairs(g, t, o = {}) {
  const { x0 = 260, y0 = 900, n = 6, sw = 250, sh = 118, hi = [], hiAt = 99, start = 0 } = o;
  for (let i = 0; i < n; i++) { const on = prog(t, start + i * 0.3, start + i * 0.3 + 0.3); if (on <= 0) continue; const h = (i + 1) * sh * ease.out(on); inkRect(g, x0 + i * sw, y0 - h, sw, h, { fill: hi.includes(i) && t > hiAt ? ui().gold : '#e3d6b8', r: 4 }); }
  return { top: (i) => [x0 + i * sw + sw / 2, y0 - (i + 1) * sh] };
}
export function pie(g, x, y, r, slices, t = 9, start = 0) {
  const k = ease.out(prog(t, start, start + 0.8)); let a = -Math.PI / 2; const tot = slices.reduce((s, q) => s + q.v, 0);
  slices.forEach((q, i) => { const a1 = a + (q.v / tot) * 2 * Math.PI * k; const pts = [[x, y]]; for (let j = 0; j <= 24; j++) pts.push([x + Math.cos(lerp(a, a1, j / 24)) * (r + (q.pull || 0)), y + Math.sin(lerp(a, a1, j / 24)) * (r + (q.pull || 0))]); inkShape(g, pts, { fill: q.fill, seed: 70 + i }); a = a1; });
}
export function bar(g, x, y, w, h, frac, fill, back = '#fff') { inkRect(g, x, y, w, h, { fill: back, r: 8 }); if (frac > 0) inkRect(g, x, y, Math.max(16, w * frac), h, { fill, r: 8 }); }
export function brain(g, x, y, s = 1, o = {}) {
  const f = o.fill || '#f2b8c6', pts = [[-120, 10], [-130, -40], [-90, -90], [-30, -105], [30, -100], [95, -85], [130, -35], [120, 20], [80, 60], [20, 70], [-50, 65]].map(([a, b]) => [x + a * s, y + b * s]);
  if (o.glow) inkCircle(g, x, y - 10 * s, 190 * s, { fill: alpha(o.glow, 0.35), stroke: false });
  inkBlob(g, pts, { fill: f, seed: 81 });
  [[-60, -40], [-10, -60], [50, -50], [90, -10], [-70, 10], [0, 10], [50, 25]].forEach(([a, b], i) => inkLine(g, [[x + a * s, y + b * s], [x + (a + 26) * s, y + (b + 14) * s], [x + (a + 8) * s, y + (b + 34) * s]], { w: 4, seed: 82 + i }));
}
export function battery(g, x, y, s = 1, cross = false, t = 9, start = 0) { inkRect(g, x - 110 * s, y - 70 * s, 220 * s, 140 * s, { fill: '#e9efe6', r: 14 }); inkRect(g, x + 110 * s, y - 24 * s, 24 * s, 48 * s, { fill: '#9aa3ad', r: 6 }); inkRect(g, x - 96 * s, y - 56 * s, 36 * s, 112 * s, { fill: ui().accent, r: 6 }); if (cross) D.icon(g, 'cross', x, y, 150 * s, { t, start }); }
export function screenBox(g, x, y, w, h, o = {}) { inkRect(g, x - w / 2, y - h / 2, w, h, { fill: '#22303c', r: 14 }); for (let i = 0; i < 6; i++) inkLine(g, [[x - w / 2 + 30, y - h / 2 + 34 + i * (h - 70) / 6], [x - w / 2 + 30 + (w - 90) * (0.4 + (i * 37 % 50) / 100), y - h / 2 + 34 + i * (h - 70) / 6]], { w: 7, stroke: '#7fe0a0' }); if (o.check) D.icon(g, 'check', x + w / 2 - 10, y + h / 2 - 10, 120, { t: o.t ?? 9, start: o.start ?? 0 }); }
export function bolt(g, x, y, s = 1, fill) { inkShape(g, [[x + 20 * s, y - 100 * s], [x - 50 * s, y + 10 * s], [x - 5 * s, y + 10 * s], [x - 25 * s, y + 100 * s], [x + 55 * s, y - 20 * s], [x + 8 * s, y - 20 * s]], { fill: fill || ui().gold }); }
export function snail(g, x, y, s = 1) { inkEllipse(g, x, y - 20 * s, 70 * s, 22 * s, { fill: '#e8c9a0' }); inkCircle(g, x - 10 * s, y - 52 * s, 40 * s, { fill: '#c98b4a' }); inkCircle(g, x - 10 * s, y - 52 * s, 20 * s, { fill: '#b07338', w: 4 }); inkLine(g, [[x + 60 * s, y - 36 * s], [x + 70 * s, y - 72 * s]], { w: 4 }); inkLine(g, [[x + 72 * s, y - 34 * s], [x + 90 * s, y - 66 * s]], { w: 4 }); }
export function speedo(g, x, y, r, frac, lbl) { inkCircle(g, x, y, r, { fill: '#fff' }); for (let i = 0; i <= 10; i++) { const a = Math.PI * (0.8 + i * 0.14); inkLine(g, [[x + Math.cos(a) * r * 0.78, y + Math.sin(a) * r * 0.78], [x + Math.cos(a) * r * 0.92, y + Math.sin(a) * r * 0.92]], { w: 5, stroke: i > 8 ? ui().accent : INK() }); } const a = Math.PI * (0.8 + frac * 1.4); inkLine(g, [[x, y], [x + Math.cos(a) * r * 0.75, y + Math.sin(a) * r * 0.75]], { w: 9, stroke: ui().accent }); inkCircle(g, x, y, 16, { fill: INK() }); if (lbl) lab(g, lbl, x, y + r * 0.45, 44); }
export function jet(g, x, y, s = 1) { inkShape(g, [[x - 160 * s, y], [x + 120 * s, y - 24 * s], [x + 190 * s, y], [x + 120 * s, y + 24 * s]], { fill: '#e9efe6', smooth: true }); inkShape(g, [[x - 20 * s, y - 6 * s], [x - 90 * s, y - 86 * s], [x - 50 * s, y - 86 * s], [x + 50 * s, y - 10 * s]], { fill: '#c9d3da' }); inkShape(g, [[x - 20 * s, y + 6 * s], [x - 90 * s, y + 86 * s], [x - 50 * s, y + 86 * s], [x + 50 * s, y + 10 * s]], { fill: '#c9d3da' }); }
export function door(g, x, y, w, h, light) { inkRect(g, x, y - h, w, h, { fill: C.woodD, r: 6 }); inkCircle(g, x + w - 24, y - h * 0.5, 9, { fill: C.gold, w: 3 }); if (light) inkRect(g, x + 8, y - 8, w - 16, 8, { fill: '#fff6a8', stroke: false }); }
export function cup(g, x, y, s = 1, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); inkShape(g, [[-34, -64], [34, -64], [28, 0], [-28, 0]], { fill: '#fff' }); inkLine(g, [[34, -48], [60, -40], [56, -16], [30, -12]], { w: 7 }); g.restore(); }
export function dots(g, pts, o = {}) { pts.forEach(([x, y], i) => { if (o.upto != null && i > o.upto) return; inkCircle(g, x, y, o.r || 7, { fill: o.fill || ui().accent, w: 2 }); }); }
export function ball(g, x, y, r) { inkCircle(g, x, y, r, { fill: '#f08a24' }); inkLine(g, [[x - r, y], [x + r, y]], { w: 4 }); inkLine(g, [[x, y - r], [x, y + r]], { w: 4 }); }
export function sandwich(g, x, y, s = 1) { inkRect(g, x - 90 * s, y - 40 * s, 180 * s, 26 * s, { fill: '#e8c27a', r: 12 }); inkRect(g, x - 96 * s, y - 14 * s, 192 * s, 14 * s, { fill: '#7da55a', r: 6 }); inkRect(g, x - 90 * s, y, 180 * s, 18 * s, { fill: '#e4572e', r: 6 }); inkRect(g, x - 90 * s, y + 18 * s, 180 * s, 26 * s, { fill: '#e8c27a', r: 12 }); }
export function apple(g, x, y, s = 1) { inkCircle(g, x, y, 50 * s, { fill: '#d8232a' }); inkLine(g, [[x, y - 50 * s], [x + 6 * s, y - 80 * s]], { w: 6 }); inkShape(g, [[x + 8 * s, y - 68 * s], [x + 42 * s, y - 88 * s], [x + 30 * s, y - 60 * s]], { fill: '#4caf50' }); }
export function peanuts(g, x, y, s = 1) { [[-24, 0], [14, -8], [4, 18]].forEach(([a, b], i) => inkEllipse(g, x + a * s, y + b * s, 22 * s, 13 * s, { fill: '#d9b27a', rot: i })); }
export function banana(g, x, y, s = 1) { inkShape(g, [[x - 80 * s, y - 20 * s], [x - 20 * s, y + 30 * s], [x + 70 * s, y - 10 * s], [x + 60 * s, y - 40 * s], [x - 10 * s, y + 6 * s], [x - 70 * s, y - 40 * s]], { fill: '#f6d84a', smooth: true }); }
export function granola(g, x, y, s = 1) { inkRect(g, x - 50 * s, y - 20 * s, 100 * s, 40 * s, { fill: '#c9904a', r: 6 }); for (let i = 0; i < 5; i++) inkCircle(g, x - 36 * s + i * 18 * s, y - 4 * s + (i % 2) * 8 * s, 4 * s, { fill: '#8a5a34', w: 2 }); }
export function moon(g, x, y, r) { inkCircle(g, x, y, r, { fill: '#fff6c8' }); inkCircle(g, x - r * 0.3, y - r * 0.2, r * 0.18, { fill: '#e8dca0', w: 3 }); inkCircle(g, x + r * 0.35, y + r * 0.3, r * 0.12, { fill: '#e8dca0', w: 3 }); }
export function page(g, x, y, w, h, lines = [], o = {}) { g.save(); g.translate(x, y); if (o.rot) g.rotate(o.rot); inkRect(g, -w / 2, -h / 2, w, h, { fill: C.paper, r: 4 }); lines.forEach((l, i) => text(g, l, 0, -h / 2 + 70 + i * (o.lh || 80), { size: o.size || 54, font: FONTS.serif, weight: 400, color: o.color || INK() })); g.restore(); }
export function mouse(g, x, y, s = 1) { inkEllipse(g, x, y, 70 * s, 40 * s, { fill: '#d9d4cc' }); inkCircle(g, x + 62 * s, y - 6 * s, 24 * s, { fill: '#d9d4cc' }); inkCircle(g, x + 54 * s, y - 28 * s, 12 * s, { fill: '#f2b8c6', w: 3 }); inkLine(g, [[x - 70 * s, y + 6 * s], [x - 120 * s, y + 30 * s]], { w: 4 }); }
export function book(g, x, y, w, h, o = {}) { inkRect(g, x - w / 2 - 22, y - h / 2 + 18, w + 44, h + 10, { fill: '#3d7ea6', r: 14 }); inkRect(g, x - w / 2, y - h / 2,w, h, { fill: o.fill || '#fffdf6', r: 8 }); inkLine(g, [[x, y - h / 2], [x, y + h / 2]], { w: 6 }); for (let i = 0; i < 5; i++) { inkLine(g, [[x - w / 2 + 40, y - h / 2 + 60 + i * 50], [x - 40, y - h / 2 + 60 + i * 50]], { w: 3 }); inkLine(g, [[x + 40, y - h / 2 + 60 + i * 50], [x + w / 2 - 40, y - h / 2 + 60 + i * 50]], { w: 3 }); } }
export function car(g, x, y, s = 1, fill = '#e4572e', f = 1, o = {}) {
  // y = линия центров колёс (колесо радиусом 34*s, земля на y + 34*s). Передок справа при f=1, зеркалится при f=-1.
  g.save(); g.translate(x, y); g.scale(f * s, s);
  const dark = shade(fill, -0.25), W = 3.5;
  inkRect(g, -172, -84, 346, 70, { fill, r: 28 });                                     // кузов
  inkShape(g, [[-108, -82], [-66, -146], [84, -146], [128, -82]], { fill });           // салон
  inkShape(g, [[-92, -86], [-60, -136], [-8, -136], [-8, -86]], { fill: '#cfe6f5', w: W });   // заднее стекло
  inkShape(g, [[6, -86], [6, -136], [76, -136], [110, -86]], { fill: '#cfe6f5', w: W });      // переднее стекло
  inkLine(g, [[-2, -146], [-2, -22]], { w: 4 });                                        // стойка / стык дверей
  inkLine(g, [[10, -64], [34, -64]], { w: 5 });                                         // ручка
  inkRect(g, -176, -58, 14, 22, { fill: '#e03b3b', r: 5, w: W });                       // задний фонарь
  inkEllipse(g, 166, -60, 12, 15, { fill: '#fff3b0', w: W });                           // фара
  inkRect(g, 150, -34, 30, 14, { fill: '#b8b3a8', r: 5, w: W });                        // бампер
  inkLine(g, [[-172, -50], [168, -50]], { w: 3, stroke: dark });                         // молдинг
  if (o.driver) { inkCircle(g, 40, -116, 17, { fill: '#fff', w: W }); inkShape(g, [[22, -118], [30, -136], [56, -134], [60, -116], [48, -124]], { fill: o.driver, w: W }); }
  [-100, 106].forEach((a) => { inkCircle(g, a, 0, 46, { fill: dark, w: W }); inkCircle(g, a, 0, 34, { fill: '#3b3b44' }); inkCircle(g, a, 0, 13, { fill: '#d4cfc3', w: 3 }); });   // колёса в арках
  g.restore();
}
export function mitten(g, x, y, s = 1, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); inkShape(g, [[-34, 40], [-38, -20], [-20, -56], [20, -56], [38, -20], [34, 40]], { fill: '#e4572e', smooth: true }); inkEllipse(g, -36, -4, 14, 22, { fill: '#e4572e', rot: -0.5 }); inkRect(g, -36, 22, 72, 22, { fill: '#fff', r: 5 }); inkCircle(g, 0, -14, 14, { fill: '#2b2b33', w: 3 }); inkCircle(g, 0, -4, 8, { fill: '#fff', w: 2 }); g.restore(); }
export function crack(g, x, y, len, prog01, seed = 1) { const n = Math.floor(10 * prog01), pts = [[x, y]]; for (let i = 1; i <= n; i++) pts.push([x + (i / 10) * len, y + Math.sin(i * 1.9 + seed) * 26 * ((i % 3) + 1) / 2]); if (pts.length > 1) inkLine(g, pts, { w: 5, stroke: '#3d7ea6', smooth: false }); }
export function rope(g, a, b, sag = 40) { inkLine(g, [a, [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + sag], b], { w: 9, stroke: '#a98050' }); }
export function arrowUp(g, x, y, h) { inkLine(g, [[x, y], [x, y - h]], { w: 10, stroke: ui().accent }); inkLine(g, [[x - 28, y - h + 34], [x, y - h], [x + 28, y - h + 34]], { w: 10, stroke: ui().accent }); }
export function sparkle(g, x, y, r, c) { inkShape(g, [[x, y - r], [x + r * 0.28, y - r * 0.28], [x + r, y], [x + r * 0.28, y + r * 0.28], [x, y + r], [x - r * 0.28, y + r * 0.28], [x - r, y], [x - r * 0.28, y - r * 0.28]], { fill: c || ui().gold, w: 4 }); }
export function formula(g, x, y, w, rows, t = 9, start = 0) { for (let i = 0; i < rows; i++) { const k = prog(t, start + i * 0.12, start + i * 0.12 + 0.4); if (k <= 0) continue; const pts = []; for (let j = 0; j <= 14 * k; j++) pts.push([x + (j / 14) * w * (0.7 + (i * 31 % 30) / 100), y + i * 54 + Math.sin(j * 1.7 + i) * 9]); if (pts.length > 1) inkLine(g, pts, { w: 4, stroke: '#f3e8d6', seed: i }); } }
export function nerve(g, x0, y0, x1, y1, o = {}) { const p = o.p ?? 1; inkLine(g, [[x0, y0], [(x0 + x1) / 2, y0 + 70], [x1, y1]], { w: 8, stroke: '#3d7ea6' }); if (o.spark != null) { const u = o.spark, sx = lerp(x0, x1, u), sy = lerp(y0, y1, u) + Math.sin(u * 3.14) * 70; sparkle(g, sx, sy, 34, ui().gold); } }
export function houseSm(g, x, y, s = 1) { inkRect(g, x - 70 * s, y - 80 * s, 140 * s, 80 * s, { fill: '#c8a27c', r: 2 }); inkShape(g, [[x - 85 * s, y - 80 * s], [x, y - 140 * s], [x + 85 * s, y - 80 * s]], { fill: '#7a4a3a' }); inkRect(g, x - 20 * s, y - 50 * s, 40 * s, 50 * s, { fill: C.woodD, r: 2 }); }
export function cart(g, x, y, s = 1) { inkLine(g, [[x - 50 * s, y - 70 * s], [x - 30 * s, y - 70 * s], [x - 10 * s, y], [x + 70 * s, y], [x + 90 * s, y - 60 * s], [x - 30 * s, y - 60 * s]], { w: 6, smooth: false }); inkCircle(g, x, y + 22 * s, 12 * s, { fill: INK() }); inkCircle(g, x + 62 * s, y + 22 * s, 12 * s, { fill: INK() }); }
export function sheet(g, x, y, w, h, items) { /* список строк с зачёркиванием: [[str, crossedAt]] */ }
export function crowd(g, pts, r = 9, fill = '#8a8a90') { pts.forEach(([x, y]) => inkCircle(g, x, y, r, { fill, w: 2 })); }
export function stick(g, x, y, s = 1, fill) { inkCircle(g, x, y - 70 * s, 22 * s, { fill: fill || '#fff', w: 4 }); inkLine(g, [[x, y - 48 * s], [x, y - 10 * s]], { w: 5 }); inkLine(g, [[x - 18 * s, y - 36 * s], [x + 18 * s, y - 36 * s]], { w: 5 }); inkLine(g, [[x, y - 10 * s], [x - 14 * s, y + 24 * s]], { w: 5 }); inkLine(g, [[x, y - 10 * s], [x + 14 * s, y + 24 * s]], { w: 5 }); }
export function desk(g, x, GY, s = 1) { const top = GY - 118 * s; inkRect(g, x - 70 * s, top, 140 * s, 14 * s, { fill: C.wood, r: 4 }); inkLine(g, [[x - 58 * s, top + 14 * s], [x - 58 * s, GY]], { w: 6 }); inkLine(g, [[x + 58 * s, top + 14 * s], [x + 58 * s, GY]], { w: 6 }); }
export function table(g, x, GY, w = 520, h = 130) { inkRect(g, x - w / 2, GY - h, w, 22, { fill: C.wood, r: 6 }); inkLine(g, [[x - w / 2 + 40, GY - h + 22], [x - w / 2 + 40, GY]], { w: 10 }); inkLine(g, [[x + w / 2 - 40, GY - h + 22], [x + w / 2 - 40, GY]], { w: 10 }); return GY - h; }
export function checker(g, x, y, w, n = 8) { const c = w / n; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) { g.fillStyle = (i + j) % 2 ? '#3b3632' : '#f3e8d6'; g.fillRect(x - w / 2 + i * c, y - w / 2 + j * c, c, c); } inkRect(g, x - w / 2, y - w / 2, w, w, { fill: 'transparent', r: 0 }); }
export function piece(g, x, y, h, kind, fill) {
  const w = 3; inkEllipse(g, x, y, h * 0.27, h * 0.07, { fill, w });
  if (kind === 'r') { inkRect(g, x - h * 0.2, y - h * 0.72, h * 0.4, h * 0.7, { fill, r: 2, w }); inkRect(g, x - h * 0.26, y - h * 0.86, h * 0.52, h * 0.16, { fill, r: 2, w }); return; }
  inkShape(g, [[x - h * 0.22, y], [x - h * 0.1, y - h * 0.58], [x + h * 0.1, y - h * 0.58], [x + h * 0.22, y]], { fill, w });
  if (kind === 'k' || kind === 'q') { inkCircle(g, x, y - h * 0.7, h * 0.14, { fill, w }); if (kind === 'k') { inkLine(g, [[x, y - h * 0.98], [x, y - h * 1.2]], { w: 3 }); inkLine(g, [[x - h * 0.09, y - h * 1.1], [x + h * 0.09, y - h * 1.1]], { w: 3 }); } else { inkLine(g, [[x - h * 0.16, y - h * 0.86], [x + h * 0.16, y - h * 0.86]], { w: 3 }); } return; }
  if (kind === 'b') { inkEllipse(g, x, y - h * 0.72, h * 0.12, h * 0.2, { fill, w }); return; }
  inkCircle(g, x, y - h * 0.7, h * 0.14, { fill, w });
}
// шахматная доска ЛЕЖИТ на столе (вид сбоку-сверху в перспективе), фигуры СТОЯТ на клетках. topY = линия столешницы, w = ширина доски спереди.
export function chessOn(g, x, topY, w = 300, o = {}) {
  const d = w * 0.3, wb = w * 0.7, P = (u, v) => [x + (u - 0.5) * (w + (wb - w) * v), topY - v * d];
  inkRect(g, x - w / 2 - 8, topY - 2, w + 16, 14, { fill: C.woodD, r: 3 });
  for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) { const a = P(i / 8, j / 8), b = P((i + 1) / 8, j / 8), c2 = P((i + 1) / 8, (j + 1) / 8), e = P(i / 8, (j + 1) / 8); g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.lineTo(...c2); g.lineTo(...e); g.closePath(); g.fillStyle = (i + j) % 2 ? '#a0693f' : '#f3e8d6'; g.fill(); }
  inkLine(g, [P(0, 0), P(1, 0), P(1, 1), P(0, 1), P(0, 0)], { w: 5 });
  const back = ['r', 'b', 'q', 'k', 'q', 'b', 'r', 'r'], few = new Set(o.few || []);
  for (let j = 7; j >= 0; j--) for (let i = 0; i < 8; i++) {
    let kind = null, fill = '#fff';
    if (j === 0) { kind = back[i]; } else if (j === 1) kind = 'p'; else if (j === 6) { kind = 'p'; fill = '#2b2b30'; } else if (j === 7) { kind = back[i]; fill = '#2b2b30'; }
    if (!kind) continue; if (o.few && !few.has(i + ',' + j)) continue;
    const [px, py] = P((i + 0.5) / 8, (j + 0.5) / 8), h = w * 0.17 * (1 - 0.25 * (j / 7)); piece(g, px, py, h, kind, fill);
  }
}
export function magnifier(g, x, y, s = 1) { inkCircle(g, x, y, 50 * s, { fill: 'rgba(207,230,245,.6)' }); inkLine(g, [[x + 36 * s, y + 36 * s], [x + 90 * s, y + 90 * s]], { w: 14, stroke: C.woodD }); }
export function paw(g, x, y, s = 1) { inkEllipse(g, x, y + 14 * s, 34 * s, 28 * s, { fill: '#8a6a45' }); [[-34, -20], [-12, -40], [14, -40], [36, -20]].forEach(([a, b]) => inkEllipse(g, x + a * s, y + b * s, 11 * s, 15 * s, { fill: '#8a6a45', w: 3 })); }
export function sneaker(g, x, y, s = 1, rot = 0, flip = 1) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(flip * s, s); inkShape(g, [[-90, 0], [-90, -70], [-30, -90], [10, -60], [100, -40], [110, 0]], { fill: '#f28a1e', smooth: false }); inkRect(g, -96, -6, 214, 24, { fill: '#fff', r: 10 }); inkLine(g, [[-20, -70], [10, -40]], { w: 5, stroke: '#fff' }); inkLine(g, [[0, -80], [30, -50]], { w: 5, stroke: '#fff' }); g.restore(); }
export function floppy(g, x, y, s = 1) { inkRect(g, x - 60 * s, y - 60 * s, 120 * s, 120 * s, { fill: '#3d7ea6', r: 8 }); inkRect(g, x - 36 * s, y - 56 * s, 72 * s, 40 * s, { fill: '#fff', r: 4, w: 3 }); inkRect(g, x - 38 * s, y + 6 * s, 76 * s, 50 * s, { fill: '#dfe9f0', r: 4, w: 3 }); }
export function seahorse(g, x, y, s = 1, fill = '#f6b93b') { inkShape(g, [[x, y - 90 * s], [x + 40 * s, y - 70 * s], [x + 50 * s, y - 20 * s], [x + 20 * s, y + 30 * s], [x + 30 * s, y + 80 * s], [x - 10 * s, y + 100 * s], [x - 30 * s, y + 60 * s], [x - 10 * s, y + 20 * s], [x - 40 * s, y - 30 * s], [x - 30 * s, y - 70 * s]], { fill, smooth: true }); inkCircle(g, x + 10 * s, y - 60 * s, 6 * s, { fill: '#161616' }); }
export function lock(g, x, y, s = 1) { inkRect(g, x - 20 * s, y - 4 * s, 40 * s, 32 * s, { fill: ui().gold, r: 4, w: 3 }); inkLine(g, [[x - 12 * s, y - 4 * s], [x - 12 * s, y - 24 * s], [x + 12 * s, y - 24 * s], [x + 12 * s, y - 4 * s]], { w: 4, smooth: true }); }
export function notepage(g, x, y, w, h, o = {}) { g.save(); g.translate(x, y); if (o.rot) g.rotate(o.rot); inkShape(g, [[-w / 2, -h / 2], [w / 2, -h / 2 + 10], [w / 2 - 12, h / 2], [-w / 2 + 8, h / 2 - 8]], { fill: o.fill || '#fffdf6' }); g.restore(); }
