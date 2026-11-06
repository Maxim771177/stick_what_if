// engine/flat.js — flat-vector sets, props, charts and effects for flat explainer packs (family "flat").
// Shapes use the variant's outline width (S().outline, 0 = none) and cel-shade strength (S().shade), so the
// same set works for "no outline" and "thick outline" variants. Colours: pass them, or take them from mood().
import { E, S, V, rng, lerp, clamp, ease, prog, alpha, shade, linGrad, text, FONTS, circle } from './core.js';
import { inkShape, inkEllipse } from './ink.js';

const OW = () => S().outline ?? 0, SH = () => S().shade ?? 0.18, INK = () => S().ink;
const rect = (g, x, y, w, h, fill, o = {}) => inkShape(g, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], { fill, w: o.w ?? OW(), wobble: 0, stroke: INK() });
const poly = (g, pts, fill, o = {}) => inkShape(g, pts, { fill, w: o.w ?? OW(), wobble: 0, smooth: o.smooth, stroke: INK() });
const ell = (g, x, y, rx, ry, fill) => inkEllipse(g, x, y, rx, ry, { fill, w: OW(), wobble: 0 });
const shadeSide = (g, x, y, w, h, k = SH()) => { if (k > 0) { g.fillStyle = alpha('#000000', k); g.fillRect(x, y, w, h); } };

// ---------- skies & ground ----------
export function sky(g, colors = ['#8ec9f0', '#d9effa']) { g.fillStyle = linGrad(g, 0, -E.H * 0.2, 0, E.H, colors); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); }
export function ground(g, y, color = '#9bc46a', o = {}) { g.fillStyle = color; g.fillRect(-E.W, y, E.W * 3, E.H * 2); if (o.edge !== false) { g.fillStyle = shade(color, -0.12); g.fillRect(-E.W, y, E.W * 3, 10); } }
export const sun = (g, x, y, r, color = '#ffd34d') => { g.save(); g.fillStyle = alpha(color, 0.25); g.beginPath(); g.arc(x, y, r * 1.6, 0, Math.PI * 2); g.fill(); g.restore(); ell(g, x, y, r, r, color); };
export const cloud = (g, x, y, s = 1, color = '#ffffff') => poly(g, [[x - 80 * s, y + 18 * s], [x - 70 * s, y - 10 * s], [x - 30 * s, y - 34 * s], [x + 20 * s, y - 30 * s], [x + 60 * s, y - 6 * s], [x + 82 * s, y + 18 * s]], color, { smooth: true });

// ---------- city & buildings ----------
export function building(g, x, y, w, h, o = {}) {
  const c = o.color || '#7d8db0', win = o.win || '#ffe9a6', off = o.winOff || shade(c, -0.25), r = rng(o.seed ?? 3);
  rect(g, x, y - h, w, h, c); shadeSide(g, x + w * 0.72, y - h, w * 0.28, h);
  const cols = Math.max(2, Math.round(w / 34)), rows = Math.max(2, Math.round(h / 46)), cw = w / cols, rh = (h - 20) / rows;
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) { g.fillStyle = r() < (o.lit ?? 0.55) ? win : off; g.fillRect(x + i * cw + cw * 0.22, y - h + 14 + j * rh + rh * 0.2, cw * 0.56, rh * 0.55); }
  if (o.roof) rect(g, x - 6, y - h - 10, w + 12, 12, shade(c, -0.2));
}
export function city(g, y, o = {}) {
  const r = rng(o.seed ?? 7), cols = o.colors || ['#6f7fa6', '#8394bb', '#5d6c92', '#7a8bb0'];
  let x = -E.W * 0.3; while (x < E.W * 1.3) { const w = 90 + r() * 140, h = (o.h ?? 260) * (0.5 + r()); building(g, x, y, w, h, { color: cols[Math.floor(r() * cols.length)], seed: Math.floor(r() * 1e6), lit: o.lit, win: o.win, roof: r() > 0.6 }); x += w + 6 + r() * 30; }
}
export function house(g, x, y, s = 1, o = {}) {
  const c = o.color || '#e8c9a0', roof = o.roof || '#b5533c', w = 220 * s, h = 150 * s;
  rect(g, x - w / 2, y - h, w, h, c); shadeSide(g, x + w * 0.2, y - h, w * 0.3, h);
  poly(g, [[x - w * 0.6, y - h], [x, y - h - 110 * s], [x + w * 0.6, y - h]], roof);
  rect(g, x - 28 * s, y - 86 * s, 56 * s, 86 * s, o.door || '#7a4b2e'); rect(g, x - w * 0.4, y - h * 0.75, 50 * s, 46 * s, '#bfe4f7'); rect(g, x + w * 0.4 - 50 * s, y - h * 0.75, 50 * s, 46 * s, '#bfe4f7');
}
export function road(g, y, o = {}) { g.fillStyle = o.color || '#5a5f6b'; g.fillRect(-E.W, y, E.W * 3, o.h ?? 120); g.fillStyle = o.line || '#f2f2f2'; for (let x = -E.W; x < E.W * 2; x += 140) g.fillRect(x + (o.offset || 0) % 140, y + (o.h ?? 120) / 2 - 4, 70, 8); }
export function car(g, x, y, s = 1, o = {}) {
  const c = o.color || '#d94b3b', f = o.facing ?? 1; g.save(); g.translate(x, y); g.scale(f * s, s);
  poly(g, [[-120, -24], [-112, -64], [-60, -70], [-30, -110], [50, -110], [86, -70], [122, -60], [126, -24]], c, { smooth: false });
  poly(g, [[-22, -102], [40, -102], [70, -72], [-48, -72]], '#bfe4f7'); shadeSide(g, -120, -40, 246, 16, SH() * 0.8);
  [-70, 76].forEach(wx => { ell(g, wx, -22, 26, 26, '#2b2b30'); ell(g, wx, -22, 11, 11, '#b8bcc6'); });
  g.restore();
}
export function truck(g, x, y, s = 1, o = {}) {
  const c = o.color || '#3b6fd9', f = o.facing ?? 1; g.save(); g.translate(x, y); g.scale(f * s, s);
  poly(g, [[-170, -30], [-170, -120], [40, -120], [40, -30]], o.box || '#e8e8ec'); poly(g, [[40, -30], [40, -110], [110, -110], [140, -70], [150, -30]], c); poly(g, [[52, -100], [104, -100], [126, -72], [52, -72]], '#bfe4f7');
  [-120, -60, 100].forEach(wx => { ell(g, wx, -22, 26, 26, '#2b2b30'); ell(g, wx, -22, 10, 10, '#b8bcc6'); });
  g.restore();
}
export function tree(g, x, y, s = 1, o = {}) { rect(g, x - 10 * s, y - 110 * s, 20 * s, 110 * s, o.trunk || '#8a5a34'); ell(g, x, y - 170 * s, 80 * s, 90 * s, o.color || '#5ea34a'); g.save(); g.beginPath(); g.ellipse(x, y - 170 * s, 80 * s, 90 * s, 0, 0, Math.PI * 2); g.clip(); shadeSide(g, x + 20 * s, y - 280 * s, 80 * s, 200 * s); g.restore(); }
export const bush = (g, x, y, s = 1, color = '#6db352') => poly(g, [[x - 60 * s, y], [x - 62 * s, y - 34 * s], [x - 24 * s, y - 62 * s], [x + 26 * s, y - 64 * s], [x + 62 * s, y - 32 * s], [x + 60 * s, y]], color, { smooth: true });

// ---------- interiors ----------
// room(g, { wall, floor, y, trim }) → { GY } — back wall + floor + skirting
export function room(g, o = {}) { const GY = o.y ?? E.H * V(0.8, 0.7); g.fillStyle = o.wall || '#d9d3e8'; g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H); g.fillStyle = o.floor || '#a98a6e'; g.fillRect(-E.W, GY, E.W * 3, E.H * 2); g.fillStyle = o.trim || shade(o.wall || '#d9d3e8', -0.15); g.fillRect(-E.W, GY - 16, E.W * 3, 16); return { GY }; }
export function windowPane(g, x, y, w, h, o = {}) { rect(g, x - 10, y - 10, w + 20, h + 20, o.frame || '#ffffff'); g.fillStyle = linGrad(g, 0, y, 0, y + h, o.sky || ['#8ec9f0', '#d9effa']); g.fillRect(x, y, w, h); if (o.fn) { g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); o.fn(g, x, y, w, h); g.restore(); } g.fillStyle = o.frame || '#ffffff'; g.fillRect(x + w / 2 - 5, y, 10, h); g.fillRect(x, y + h / 2 - 5, w, 10); }
export function door(g, x, y, s = 1, color = '#8a5a3c') { rect(g, x - 55 * s, y - 230 * s, 110 * s, 230 * s, color); ell(g, x + 36 * s, y - 115 * s, 7 * s, 7 * s, '#f2c94c'); }
export function picture(g, x, y, w, h, o = {}) { rect(g, x, y, w, h, o.frame || '#6b4a2e'); g.fillStyle = o.art || '#9ecbe8'; g.fillRect(x + 10, y + 10, w - 20, h - 20); poly(g, [[x + 10, y + h - 10], [x + w * 0.4, y + h * 0.45], [x + w * 0.6, y + h * 0.65], [x + w * 0.75, y + h * 0.5], [x + w - 10, y + h - 10]], o.hill || '#6db352', { w: 0 }); }
export function desk(g, x, y, s = 1, o = {}) { const c = o.color || '#9b6b45'; rect(g, x - 160 * s, y - 120 * s, 320 * s, 22 * s, c); rect(g, x - 150 * s, y - 98 * s, 24 * s, 98 * s, shade(c, -0.15)); rect(g, x + 126 * s, y - 98 * s, 24 * s, 98 * s, shade(c, -0.15)); }
export function chair(g, x, y, s = 1, o = {}) { const c = o.color || '#3d4a66', f = o.facing ?? 1, bx = f > 0 ? x - 40 * s : x + 26 * s; rect(g, bx, y - 170 * s, 14 * s, 104 * s, shade(c, -0.1)); rect(g, x - 40 * s, y - 80 * s, 80 * s, 14 * s, c); rect(g, x - 4 * s, y - 66 * s, 8 * s, 50 * s, '#2b2b30'); rect(g, x - 34 * s, y - 16 * s, 68 * s, 8 * s, '#2b2b30'); }
export function monitor(g, x, y, s = 1, o = {}) { rect(g, x - 90 * s, y - 130 * s, 180 * s, 110 * s, '#2b2f3a'); g.fillStyle = o.screen || '#7fc6e8'; g.fillRect(x - 80 * s, y - 120 * s, 160 * s, 90 * s); if (o.fn) { g.save(); g.beginPath(); g.rect(x - 80 * s, y - 120 * s, 160 * s, 90 * s); g.clip(); o.fn(g, x - 80 * s, y - 120 * s, 160 * s, 90 * s); g.restore(); } rect(g, x - 10 * s, y - 20 * s, 20 * s, 20 * s, '#2b2f3a'); rect(g, x - 40 * s, y - 4 * s, 80 * s, 6 * s, '#2b2f3a'); }
export function sofa(g, x, y, s = 1, color = '#c75b5b') { rect(g, x - 170 * s, y - 120 * s, 340 * s, 70 * s, shade(color, -0.1)); rect(g, x - 170 * s, y - 60 * s, 340 * s, 50 * s, color); rect(g, x - 190 * s, y - 90 * s, 40 * s, 80 * s, shade(color, -0.05)); rect(g, x + 150 * s, y - 90 * s, 40 * s, 80 * s, shade(color, -0.05)); }
export function plant(g, x, y, s = 1) { poly(g, [[x - 30 * s, y - 60 * s], [x + 30 * s, y - 60 * s], [x + 22 * s, y], [x - 22 * s, y]], '#c46a3e'); [-1, 0, 1].forEach(i => poly(g, [[x, y - 60 * s], [x + i * 50 * s - 16 * s, y - 150 * s + Math.abs(i) * 30 * s], [x + i * 50 * s + 16 * s, y - 150 * s + Math.abs(i) * 30 * s]], '#4f9a45', { smooth: true })); }

// ---------- presentation & charts ----------
// board(g, x, y, w, h, fn) — whiteboard / presentation screen on a stand; fn draws the content inside
export function board(g, x, y, w, h, fn, o = {}) { rect(g, x - 8, y - 8, w + 16, h + 16, o.frame || '#5b6070'); g.fillStyle = o.bg || '#fbfbfd'; g.fillRect(x, y, w, h); if (fn) { g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); fn(g, x, y, w, h); g.restore(); } if (o.stand !== false) { rect(g, x + w * 0.2, y + h + 8, 12, E.H, o.frame || '#5b6070'); rect(g, x + w * 0.8 - 12, y + h + 8, 12, E.H, o.frame || '#5b6070'); } }
// lineChart(g, x, y, w, h, values, { t, start, dur, color, axis, fill }) — draws on
export function lineChart(g, x, y, w, h, vals, o = {}) {
  const p = o.t == null ? 1 : ease.inOut(prog(o.t, o.start ?? 0, (o.start ?? 0) + (o.dur ?? 1.2))), mn = o.min ?? Math.min(...vals), mx = o.max ?? Math.max(...vals), c = o.color || S().ui.accent;
  const P = vals.map((v, i) => [x + (i / (vals.length - 1)) * w, y + h - ((v - mn) / (mx - mn || 1)) * h]);
  if (o.axis !== false) { g.strokeStyle = alpha(INK(), 0.5); g.lineWidth = 3; g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + h); g.lineTo(x + w, y + h); g.stroke(); }
  const n = (P.length - 1) * p, k = Math.floor(n), last = k < P.length - 1 ? [lerp(P[k][0], P[k + 1][0], n - k), lerp(P[k][1], P[k + 1][1], n - k)] : P[P.length - 1];
  const pts = [...P.slice(0, k + 1), last]; if (o.fill !== false) { g.fillStyle = alpha(c, 0.18); g.beginPath(); g.moveTo(x, y + h); pts.forEach(q => g.lineTo(...q)); g.lineTo(last[0], y + h); g.closePath(); g.fill(); }
  g.strokeStyle = c; g.lineWidth = o.w ?? 7; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); pts.forEach((q, i) => (i ? g.lineTo(...q) : g.moveTo(...q))); g.stroke(); circle(g, last[0], last[1], (o.w ?? 7) * 1.4, c); return last;
}
// barChart(g, x, y, w, h, values, { labels, colors, t, start, stagger }) — bars grow in
export function barChart(g, x, y, w, h, vals, o = {}) {
  const mx = o.max ?? Math.max(...vals), n = vals.length, bw = (w / n) * 0.62, cols = o.colors || [S().ui.accent, S().ui.gold, S().ui.blueprint, S().ui.good];
  vals.forEach((v, i) => { const p = o.t == null ? 1 : ease.outBack(prog(o.t, (o.start ?? 0) + i * (o.stagger ?? 0.15), (o.start ?? 0) + i * (o.stagger ?? 0.15) + 0.6)), bh = (v / mx) * h * Math.max(0, p), bx = x + (i + 0.19) * (w / n); if (bh > 1) { rect(g, bx, y + h - bh, bw, bh, cols[i % cols.length]); shadeSide(g, bx + bw * 0.7, y + h - bh, bw * 0.3, bh); } if (o.labels) text(g, o.labels[i], bx + bw / 2, y + h + 34, { size: 30, color: INK(), font: FONTS.ui, weight: 800 }); if (o.values && p > 0.6) text(g, o.values[i], bx + bw / 2, y + h - bh - 26, { size: 32, color: INK(), font: FONTS.ui, weight: 900 }); });
}
// highlight(g, fn, { color, blur, t, start }) — draw something with a coloured glow around it (to point at "this one")
export function highlight(g, fn, o = {}) { const k = o.t == null ? 1 : ease.out(prog(o.t, o.start ?? 0, (o.start ?? 0) + 0.4)); g.save(); g.shadowColor = alpha(o.color || '#5bff7a', 0.9 * k); g.shadowBlur = (o.blur ?? 40) * k * E.PX; fn(g); fn(g); g.restore(); }
// icon(g, name, x, y, size, { t, start, color }) — flat icons: coin pin warning check cross clock heart star up down house
export function icon(g, name, x, y, size = 80, o = {}) {
  const k = o.t == null ? 1 : ease.outBack(prog(o.t, o.start ?? 0, (o.start ?? 0) + 0.35)); if (k <= 0) return; const ui = S().ui, s = size / 80;
  g.save(); g.translate(x, y); g.scale(k * s, k * s);
  switch (name) {
    case 'coin': ell(g, 0, 0, 36, 36, o.color || '#f2c94c'); ell(g, 0, 0, 26, 26, shade(o.color || '#f2c94c', -0.1)); text(g, '$', 0, 3, { size: 40, font: FONTS.ui, weight: 900, color: shade(o.color || '#f2c94c', -0.45) }); break;
    case 'pin': poly(g, [[0, 40], [-28, -6], [-26, -30], [0, -44], [26, -30], [28, -6]], o.color || ui.accent, { smooth: true }); ell(g, 0, -16, 11, 11, '#ffffff'); break;
    case 'warning': poly(g, [[0, -40], [42, 34], [-42, 34]], o.color || '#f2c94c'); text(g, '!', 0, 8, { size: 50, font: FONTS.ui, weight: 900, color: '#2b2b30' }); break;
    case 'check': ell(g, 0, 0, 38, 38, o.color || ui.good); g.save(); g.strokeStyle = '#ffffff'; g.lineWidth = 9; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-16, 0); g.lineTo(-4, 13); g.lineTo(18, -12); g.stroke(); g.restore(); break;
    case 'cross': ell(g, 0, 0, 38, 38, o.color || ui.accent); g.save(); g.strokeStyle = '#ffffff'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(-14, -14); g.lineTo(14, 14); g.moveTo(14, -14); g.lineTo(-14, 14); g.stroke(); g.restore(); break;
    case 'clock': ell(g, 0, 0, 38, 38, '#ffffff'); g.save(); g.strokeStyle = '#2b2b30'; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.lineTo(0, -24); g.moveTo(0, 0); g.lineTo(16, 6); g.stroke(); g.restore(); break;
    case 'heart': poly(g, [[0, 34], [-36, -2], [-30, -26], [-8, -30], [0, -16], [8, -30], [30, -26], [36, -2]], o.color || '#e5484d', { smooth: true }); break;
    case 'star': poly(g, [...Array(10)].map((_, i) => { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 16 : 38; return [Math.cos(a) * r, Math.sin(a) * r]; }), o.color || '#f2c94c'); break;
    case 'up': case 'down': { const d = name === 'up' ? 1 : -1; poly(g, [[0, -38], [34, 0], [14, 0], [14, 36], [-14, 36], [-14, 0], [-34, 0]].map(([a, b]) => [a, b * d]), o.color || (name === 'up' ? ui.good : ui.accent)); break; }
    case 'house': poly(g, [[-34, 34], [-34, -4], [0, -36], [34, -4], [34, 34]], o.color || '#e8c9a0'); rect(g, -10, 8, 20, 26, '#7a4b2e'); break;
  }
  g.restore();
}
