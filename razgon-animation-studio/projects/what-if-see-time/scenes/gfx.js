// gfx.js: предметы и животные ролика 02 кодом (ink-линии, плоские цвета).
import { E, S, ui, C, D, ease, prog, clamp, lerp, text, FONTS, inkLine, inkRect, inkCircle, inkShape, inkEllipse, inkBlob, alpha, shade, bar, kf } from './lib.js';

export const W = () => E.W, H = () => E.H;
export const pop = (t, s, d = 0.35) => ease.outBack(prog(t, s, s + d));
export const fade = (t, s, d = 0.3) => ease.out(prog(t, s, s + d));
const INK = () => S().ink;
export const lab = (g, str, x, y, size = 46, color) => text(g, str, x, y, { size, font: FONTS.ui, weight: 900, color: color || INK() });
export const big = (g, str, x, y, size = 150, color) => text(g, str, x, y, { size, font: FONTS.title, weight: 400, color: color || INK() });

// ---------- животные (x,y = точка земли под животным) ----------
// Biscuit: рыжая собака. pose: 'sit' | 'stand' | 'lie' | 'tilt' | 'beg'; wag — частота хвоста; f = направление (1 вправо)
export function dog(g, x, y, s = 1, o = {}) {
  const t = o.t ?? 0, f = o.f ?? 1, pose = o.pose || 'sit', col = o.fill || '#d99a55', dark = shade(col, -0.2), wag = o.wag ?? 9;
  g.save(); g.translate(x, y); g.scale(f * s, s);
  const lie = pose === 'lie', sit = pose === 'sit' || pose === 'tilt' || pose === 'beg', by = lie ? -34 : sit ? -66 : -90;
  const tw = Math.sin(t * wag) * (lie ? 0.15 : 0.5);
  g.save(); g.translate(lie ? -96 : -78, by + 6); g.rotate(-0.9 + tw); inkShape(g, [[0, -10], [-62, -4], [-62, 12], [0, 10]], { fill: col, smooth: true, w: 5 }); g.restore();   // хвост
  if (lie) { inkEllipse(g, 0, -40, 98, 38, { fill: col, w: 5 }); inkEllipse(g, 56, -14, 46, 14, { fill: col, w: 4 }); inkEllipse(g, -30, -12, 40, 14, { fill: col, w: 4 }); }
  else if (sit) { inkEllipse(g, -10, -58, 62, 56, { fill: col, w: 5 }); inkEllipse(g, -44, -8, 40, 18, { fill: dark, w: 4 }); inkRect(g, 28, -78, 28, 76, { fill: col, r: 12, w: 5 }); inkEllipse(g, 44, -6, 34, 14, { fill: dark, w: 4 }); }
  else { inkEllipse(g, 0, -92, 98, 42, { fill: col, w: 5 }); [-62, -36, 40, 66].forEach((lx, i) => { inkRect(g, lx - 12, -80, 24, 78, { fill: i % 2 ? dark : col, r: 10, w: 4 }); }); }
  const hx = lie ? 112 : sit ? 56 : 112, hy = lie ? -52 : sit ? -132 : -134, tilt = pose === 'tilt' ? 0.4 : 0;
  g.save(); g.translate(hx, hy); g.rotate(tilt);
  inkCircle(g, 0, 0, 44, { fill: col, w: 5 }); inkEllipse(g, 34, 14, 30, 22, { fill: shade(col, 0.2), w: 4 }); inkCircle(g, 56, 8, 8, { fill: INK(), stroke: false });
  inkShape(g, [[-24, -30], [-52, -14 + (pose === 'beg' ? 0 : 14)], [-40, 20], [-18, 2]], { fill: dark, smooth: true, w: 4 });
  const bl = ((t + 1.3) % 3.4) > 3.25; inkCircle(g, 12, -8, 6, { fill: INK(), stroke: false }); if (bl) inkLine(g, [[4, -8], [20, -8]], { w: 4 });
  g.restore(); g.restore();
}
export function cat(g, x, y, s = 1, o = {}) {
  const t = o.t ?? 0, f = o.f ?? 1, col = o.fill || '#8a8a96'; g.save(); g.translate(x, y); g.scale(f * s, s);
  const tw = Math.sin(t * 2.4) * 0.3; g.save(); g.translate(-60, -50); g.rotate(-1.1 + tw); inkShape(g, [[0, -8], [-70, -4], [-72, 10], [0, 8]], { fill: col, smooth: true, w: 5 }); g.restore();
  inkEllipse(g, -6, -52, 62, 50, { fill: col, w: 5 }); inkEllipse(g, 20, -6, 34, 12, { fill: shade(col, -0.15), w: 4 });
  g.save(); g.translate(40, -108); inkCircle(g, 0, 0, 38, { fill: col, w: 5 }); inkShape(g, [[-34, -14], [-30, -58], [-6, -32]], { fill: col, w: 4 }); inkShape(g, [[34, -14], [30, -58], [6, -32]], { fill: col, w: 4 });
  const sq = o.squint; inkLine(g, [[-20, -4], [-6, sq ? -2 : -6]], { w: 5 }); inkLine(g, [[6, sq ? -2 : -6], [20, -4]], { w: 5 }); inkCircle(g, 0, 10, 5, { fill: '#f29ac0', w: 3 }); g.restore(); g.restore();
}
export function bird(g, x, y, s = 1, o = {}) { const t = o.t ?? 0; g.save(); g.translate(x, y); g.scale(s, s); inkEllipse(g, 0, -30, 40, 30, { fill: '#4aa3df', w: 4 }); inkCircle(g, 30, -56, 20, { fill: '#4aa3df', w: 4 }); inkShape(g, [[48, -58], [72, -52], [48, -48]], { fill: '#f6b93b', w: 3 }); inkCircle(g, 36, -60, 4, { fill: INK(), stroke: false }); inkLine(g, [[-30, -34], [-70, -50 + Math.sin(t * 6) * 8]], { w: 6 }); inkLine(g, [[-6, 0], [-6, 22]], { w: 4 }); inkLine(g, [[10, 0], [10, 22]], { w: 4 }); g.restore(); }
export function squirrel(g, x, y, s = 1, o = {}) { const t = o.t ?? 0; g.save(); g.translate(x, y); g.scale(s, s); inkShape(g, [[-30, -20], [-80, -40], [-90, -110], [-50, -150], [-26, -100], [-20, -50]], { fill: '#c98b4a', smooth: true, w: 5 }); inkEllipse(g, 0, -42, 38, 46, { fill: '#c98b4a', w: 5 }); inkCircle(g, 20, -100, 24, { fill: '#c98b4a', w: 5 }); inkShape(g, [[8, -118], [4, -140], [22, -122]], { fill: '#c98b4a', w: 3 }); inkCircle(g, 28, -104, 4, { fill: INK(), stroke: false }); inkCircle(g, 44, -96, 5, { fill: INK(), stroke: false }); inkEllipse(g, 14, -60 + Math.sin(t * 5) * 3, 10, 14, { fill: '#8a5a2e', w: 3 }); g.restore(); }
export function fish(g, x, y, s = 1, o = {}) { const t = o.t ?? 0; g.save(); g.translate(x, y + Math.sin(t * 2) * 6); g.scale(s, s); inkEllipse(g, 0, 0, 60, 36, { fill: '#f08a24', w: 5 }); inkShape(g, [[-52, 0], [-96, -30 + Math.sin(t * 7) * 6], [-96, 30 - Math.sin(t * 7) * 6]], { fill: '#f08a24', w: 5 }); inkCircle(g, 32, -8, 6, { fill: INK(), stroke: false }); g.restore(); }

// ---------- предметы ----------
export function earth(g, x, y, r) { inkCircle(g, x, y, r, { fill: '#6fb7e8' }); inkShape(g, [[x - r * 0.6, y - r * 0.3], [x - r * 0.2, y - r * 0.65], [x + r * 0.1, y - r * 0.3], [x - r * 0.2, y + r * 0.1], [x - r * 0.5, y + r * 0.1]], { fill: '#7da55a', smooth: true, w: 4 }); inkShape(g, [[x + r * 0.2, y + r * 0.2], [x + r * 0.6, y + r * 0.05], [x + r * 0.5, y + r * 0.6], [x + r * 0.25, y + r * 0.55]], { fill: '#7da55a', smooth: true, w: 4 }); }
export function clock(g, x, y, r, a = 0, o = {}) { inkCircle(g, x, y, r, { fill: '#fff' }); for (let i = 0; i < 12; i++) { const q = (i / 12) * 6.283; inkLine(g, [[x + Math.sin(q) * r * 0.82, y - Math.cos(q) * r * 0.82], [x + Math.sin(q) * r * 0.94, y - Math.cos(q) * r * 0.94]], { w: 3 }); } const ha = a / 12 * 6.283, ma = a * 6.283; inkLine(g, [[x, y], [x + Math.sin(ha) * r * 0.5, y - Math.cos(ha) * r * 0.5]], { w: 7 }); inkLine(g, [[x, y], [x + Math.sin(ma) * r * 0.78, y - Math.cos(ma) * r * 0.78]], { w: 5, stroke: o.hand || INK() }); }
export function snail(g, x, y, s = 1) { inkEllipse(g, x, y - 20 * s, 70 * s, 22 * s, { fill: '#e8c9a0' }); inkCircle(g, x - 10 * s, y - 52 * s, 40 * s, { fill: '#c98b4a' }); inkCircle(g, x - 10 * s, y - 52 * s, 20 * s, { fill: '#b07338', w: 4 }); inkLine(g, [[x + 60 * s, y - 36 * s], [x + 70 * s, y - 72 * s]], { w: 4 }); inkLine(g, [[x + 72 * s, y - 34 * s], [x + 90 * s, y - 66 * s]], { w: 4 }); }
export function heart(g, x, y, s = 1, t = 0, fill = '#e4572e') { const k = 1 + 0.12 * Math.max(0, Math.sin(t * 7)) ** 2; g.save(); g.translate(x, y); g.scale(s * k, s * k); inkShape(g, [[0, 70], [-76, 0], [-62, -62], [-14, -66], [0, -30], [14, -66], [62, -62], [76, 0]], { fill, smooth: true }); g.restore(); }
export function bag(g, x, y, s = 1) { inkRect(g, x - 70 * s, y - 100 * s, 140 * s, 100 * s, { fill: '#6b4e9b', r: 12 }); inkLine(g, [[x - 40 * s, y - 100 * s], [x - 36 * s, y - 130 * s], [x + 36 * s, y - 130 * s], [x + 40 * s, y - 100 * s]], { w: 8 }); inkRect(g, x - 30 * s, y - 70 * s, 60 * s, 18 * s, { fill: '#d8c04a', r: 4, w: 3 }); }
export function waterHeater(g, x, y, s = 1) { inkRect(g, x - 70 * s, y - 300 * s, 140 * s, 300 * s, { fill: '#dfe6ec', r: 40 * s }); inkRect(g, x - 36 * s, y - 220 * s, 72 * s, 34 * s, { fill: '#f08a24', r: 6, w: 4 }); inkLine(g, [[x - 20 * s, y - 300 * s], [x - 20 * s, y - 360 * s]], { w: 8 }); inkLine(g, [[x + 20 * s, y - 300 * s], [x + 20 * s, y - 360 * s]], { w: 8 }); }
export function house(g, x, y, s = 1, glow = 0, t = 0) { inkRect(g, x - 220 * s, y - 220 * s, 440 * s, 220 * s, { fill: '#f1d8a6', r: 4 }); inkShape(g, [[x - 250 * s, y - 220 * s], [x, y - 360 * s], [x + 250 * s, y - 220 * s]], { fill: '#c0504d' }); inkRect(g, x - 36 * s, y - 130 * s, 72 * s, 130 * s, { fill: C.woodD, r: 4 }); [-150, 90].forEach((dx) => { inkRect(g, x + dx * s, y - 170 * s, 70 * s, 70 * s, { fill: glow ? '#ffb3d1' : '#cfe6f5', r: 3 }); }); if (glow) { for (let i = 0; i < 3; i++) { g.save(); g.globalAlpha = (0.25 - i * 0.06) * (0.6 + 0.4 * Math.sin(t * 4)); inkCircle(g, x, y - 140 * s, (260 + i * 60) * s, { fill: '#ff5fa2', stroke: false }); g.restore(); } } }
export function qmarks(g, t, pts, start = 0) { pts.forEach(([x, y], i) => { const k = pop(t, start + i * 0.12); if (k > 0) { g.save(); g.translate(x, y + Math.sin(t * 3 + i) * 6); g.scale(k, k); text(g, '?', 0, 0, { size: 110, font: FONTS.title, weight: 400, color: ui().accent, stroke: 10, strokeColor: '#fff' }); g.restore(); } }); }
export function cross(g, x0, y0, x1, y1, t, start, w = 14) { const p = ease.out(prog(t, start, start + 0.3)); if (p <= 0) return; inkLine(g, [[x0, y0], [lerp(x0, x1, p), lerp(y0, y1, p)]], { w, stroke: '#e03b3b' }); const p2 = ease.out(prog(t, start + 0.15, start + 0.45)); if (p2 > 0) inkLine(g, [[x1, y0], [lerp(x1, x0, p2), lerp(y0, y1, p2)]], { w, stroke: '#e03b3b' }); }
export function book(g, x, y, w, h, locked = false) { inkRect(g, x - w / 2, y - h / 2, w, h, { fill: '#7a4a3a', r: 10 }); inkRect(g, x - w / 2 + 14, y - h / 2 + 14, w - 28, h - 28, { fill: '#a96a52', r: 6, w: 3 }); if (locked) { inkRect(g, x - 26, y - 10, 52, 44, { fill: ui().gold, r: 6 }); inkLine(g, [[x - 16, y - 10], [x - 16, y - 34], [x + 16, y - 34], [x + 16, y - 10]], { w: 7, smooth: true }); } }
export function paper(g, x, y, w, h, o = {}) { g.save(); g.translate(x, y); if (o.rot) g.rotate(o.rot); inkRect(g, -w / 2, -h / 2, w, h, { fill: C.paper, r: 6 }); g.restore(); }
export function pill(g, x, y, str, fill, size = 56, tc = '#fff') { const w = Math.max(160, str.length * size * 0.62 + 60); inkRect(g, x - w / 2, y - size * 0.8, w, size * 1.6, { fill, r: size * 0.8 }); text(g, str, x, y + size * 0.22, { size, font: FONTS.title, weight: 400, color: tc }); }
export function icn(g, kind, x, y, s = 1, t = 9, start = 0) { // быстрые иконки: head / dizzy / tummy / bug / flu / banana / stairs
  const k = pop(t, start); if (k <= 0) return; g.save(); g.translate(x, y); g.scale(k * s, k * s);
  if (kind === 'head') { inkCircle(g, 0, 0, 64, { fill: '#ffe0c0' }); inkLine(g, [[-30, -56], [-12, -76], [4, -50], [22, -80]], { w: 8, stroke: '#e03b3b' }); inkCircle(g, -22, -6, 6, { fill: INK(), stroke: false }); inkCircle(g, 22, -6, 6, { fill: INK(), stroke: false }); inkLine(g, [[-20, 26], [20, 20]], { w: 6 }); }
  if (kind === 'dizzy') { inkCircle(g, 0, 0, 64, { fill: '#ffe0c0' }); for (const d of [-22, 22]) { inkLine(g, [[d - 12, -10], [d + 12, 10]], { w: 6 }); inkLine(g, [[d + 12, -10], [d - 12, 10]], { w: 6 }); } inkLine(g, [[-18, 30], [-6, 24], [6, 32], [18, 26]], { w: 6, smooth: false }); inkEllipse(g, 0, -78, 56, 16, { fill: 'transparent', w: 5, stroke: ui().gold }); }
  if (kind === 'tummy') { inkEllipse(g, 0, 0, 62, 70, { fill: '#ffe0c0' }); inkLine(g, [[-34, -14], [-12, 10], [10, -14], [34, 10]], { w: 7, stroke: '#7da55a', smooth: false }); inkCircle(g, 0, 8, 6, { fill: INK(), stroke: false }); }
  if (kind === 'bug') { inkEllipse(g, 0, 8, 52, 40, { fill: '#7da55a' }); inkCircle(g, 46, 6, 24, { fill: '#5d8a40' }); for (let i = -1; i <= 1; i++) { inkLine(g, [[i * 24, 30], [i * 30, 62]], { w: 5 }); inkLine(g, [[i * 24, -14], [i * 30, -44]], { w: 5 }); } inkCircle(g, 54, 0, 4, { fill: '#fff', stroke: false }); }
  if (kind === 'flu') { inkCircle(g, 0, 0, 64, { fill: '#c8e6c0' }); inkLine(g, [[-30, 24], [-10, 14], [10, 24], [30, 14]], { w: 6, smooth: false }); inkCircle(g, -22, -10, 6, { fill: INK(), stroke: false }); inkCircle(g, 22, -10, 6, { fill: INK(), stroke: false }); inkRect(g, 36, -50, 16, 80, { fill: '#e8e8e8', r: 6, w: 4 }); inkRect(g, 36, -4, 16, 34, { fill: '#e03b3b', r: 4, w: 3 }); }
  if (kind === 'banana') { inkShape(g, [[-80, -20], [-20, 40], [70, -10], [60, -40], [-10, 10], [-70, -40]], { fill: '#f6d84a', smooth: true }); }
  if (kind === 'stairs') { for (let i = 0; i < 4; i++) inkRect(g, -70 + i * 36, 50 - (i + 1) * 34, 36, (i + 1) * 34, { fill: '#e3d6b8', r: 3 }); }
  g.restore();
}
// пульсирующая подсветка кадра цветом
export function tint(g, col, a) { g.save(); g.globalAlpha = a; g.fillStyle = col; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.restore(); }
export function vignette(g, col, a) { const gr = g.createRadialGradient(E.W / 2, E.H / 2, E.H * 0.35, E.W / 2, E.H / 2, E.H * 0.95); gr.addColorStop(0, 'rgba(0,0,0,0)'); gr.addColorStop(1, col); g.save(); g.globalAlpha = a; g.fillStyle = gr; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.restore(); }
export function table(g, x, GY, w = 520, h = 130) { inkRect(g, x - w / 2, GY - h, w, 22, { fill: C.wood, r: 6 }); inkLine(g, [[x - w / 2 + 40, GY - h + 22], [x - w / 2 + 40, GY]], { w: 10 }); inkLine(g, [[x + w / 2 - 40, GY - h + 22], [x + w / 2 - 40, GY]], { w: 10 }); return GY - h; }
export function scarf(g, o, col = '#2f9e4a') { if (!o || o.hidden) return; const R = 55 * o.s / 1.55; inkEllipse(g, o.x, o.hy + R * 1.0, R * 0.78, R * 0.2, { fill: col, w: 4 }); }
export const deskK = (g, x, GY, s = 1) => { inkRect(g, x - 120 * s, GY - 150 * s, 240 * s, 18 * s, { fill: C.wood, r: 5 }); inkRect(g, x - 110 * s, GY - 132 * s, 220 * s, 60 * s, { fill: '#e3b478', r: 5 }); inkLine(g, [[x - 100 * s, GY - 72 * s], [x - 100 * s, GY]], { w: 7 }); inkLine(g, [[x + 100 * s, GY - 72 * s], [x + 100 * s, GY]], { w: 7 }); };
// скамейка в профиль: f = куда смотрит сидящий (−1 влево); сиденье на высоте бёдер позы sit при масштабе s
export function bench(g, x, GY, f, s) { const sy = GY + (-72 + 6) * s, bx = x - f * 70; inkRect(g, bx - f * 10, sy - 150, 16, 150, { fill: '#b98a54', r: 4 }); inkRect(g, x - 85, sy, 170, 20, { fill: C.wood, r: 5 }); inkLine(g, [[x - 70, sy + 20], [x - 70, GY]], { w: 9 }); inkLine(g, [[x + 70, sy + 20], [x + 70, GY]], { w: 9 }); }
export function nose(g, o) { if (!o || o.hidden) return; inkCircle(g, o.x + 6 * o.facing, o.hy + 8 * (o.s / 1.55), 11 * (o.s / 1.55), { fill: '#e03b3b', w: 3 }); }
export { bar };
