// engine/doodle.js — set pieces, props and on-screen graphics for line-art packs (the "doodle" family and similar).
// Everything is outlined with the variant's ink and follows its line wobble (ink.js), takes colours from mood()/S(),
// and is deterministic (pass seeds, not Math.random).
import { E, V, S, ease, prog, clamp, lerp, alpha, shade, text, measure, FONTS, rng } from './core.js';
import { LINE, inkShape, inkCircle, inkEllipse, inkRect, inkLine, inkTube, inkBlob, contact } from './ink.js';

const ink = () => S().ink;
const pop = (t, start, d = 0.35) => ease.outBack(prog(t, start, start + d));

// ---------- backgrounds ----------
// plain(g, color): fill the whole (camera-safe) stage with one flat colour — the default doodle backdrop
export function plain(g, color) { g.fillStyle = color; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); }
// horizon(g, y, { sky, ground, line }) — flat sky + ground split by one hand-drawn line
export function horizon(g, y, o = {}) {
  if (o.sky) plain(g, o.sky);
  g.fillStyle = o.ground || '#d9c49a'; g.fillRect(-E.W, y, E.W * 3, E.H * 2);
  inkLine(g, [[-E.W, y], [E.W * 2, y]], { w: o.w ?? LINE().width, seed: o.seed ?? 5, step: 40 });
}
export const sun = (g, x, y, r, o = {}) => { inkCircle(g, x, y, r, { fill: o.color || '#f6c445', seed: 7 }); if (o.rays !== false) for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2 + (o.spin || 0); inkLine(g, [[x + Math.cos(a) * r * 1.3, y + Math.sin(a) * r * 1.3], [x + Math.cos(a) * r * 1.65, y + Math.sin(a) * r * 1.65]], { w: LINE().width * 0.8, seed: 8 + i }); } };
export const cloud = (g, x, y, s = 1, o = {}) => inkBlob(g, [[x - 90 * s, y + 20 * s], [x - 70 * s, y - 20 * s], [x - 20 * s, y - 40 * s], [x + 40 * s, y - 34 * s], [x + 90 * s, y], [x + 60 * s, y + 26 * s]], { fill: o.color || '#ffffff', seed: o.seed ?? 11 });
export const bush = (g, x, y, s = 1, o = {}) => inkBlob(g, [[x - 60 * s, y], [x - 64 * s, y - 34 * s], [x - 26 * s, y - 66 * s], [x + 22 * s, y - 70 * s], [x + 62 * s, y - 36 * s], [x + 58 * s, y]], { fill: o.color || '#7da55a', seed: o.seed ?? 12 });
export function tree(g, x, y, s = 1, o = {}) {
  inkShape(g, [[x - 12 * s, y], [x - 9 * s, y - 120 * s], [x + 9 * s, y - 120 * s], [x + 13 * s, y]], { fill: o.trunk || '#8a5a34', seed: (o.seed ?? 13) + 1 });
  inkBlob(g, [[x - 80 * s, y - 120 * s], [x - 90 * s, y - 180 * s], [x - 40 * s, y - 240 * s], [x + 30 * s, y - 246 * s], [x + 88 * s, y - 190 * s], [x + 76 * s, y - 120 * s]], { fill: o.color || '#6e9b4c', seed: o.seed ?? 13 });
}
export const rock = (g, x, y, s = 1, o = {}) => inkShape(g, [[x - 50 * s, y], [x - 40 * s, y - 36 * s], [x - 6 * s, y - 52 * s], [x + 38 * s, y - 40 * s], [x + 54 * s, y]], { fill: o.color || '#a39e94', seed: o.seed ?? 14 });
export const mountain = (g, x, y, w, h, o = {}) => inkShape(g, [[x - w / 2, y], [x - w * 0.08, y - h], [x + w * 0.06, y - h * 0.92], [x + w / 2, y]], { fill: o.color || '#b7a58a', seed: o.seed ?? 15 });
export function grass(g, x0, x1, y, o = {}) { const r = rng(o.seed ?? 16); for (let x = x0; x < x1; x += 60 + r() * 90) { const h = 14 + r() * 14; inkLine(g, [[x - 8, y], [x - 2, y - h], [x + 2, y], [x + 8, y - h * 0.8], [x + 12, y]], { w: LINE().width * 0.6, smooth: false, seed: x | 0, stroke: o.color || ink() }); } }
// campfire(g, x, y, s, t) — logs + flickering flame (flame redrawn on a few fixed shapes, so it reads as hand animation)
export function campfire(g, x, y, s = 1, t = E.t || 0) {
  inkTube(g, [[x - 50 * s, y - 4 * s], [x + 44 * s, y - 16 * s]], 14 * s, '#8a5a34', { seed: 17 });
  inkTube(g, [[x - 44 * s, y - 16 * s], [x + 50 * s, y - 4 * s]], 14 * s, '#7a4c2a', { seed: 18 });
  const k = Math.floor(t * 8) % 4, fl = [1, 1.12, 0.94, 1.06][k], lean = [0, 6, -4, 3][k] * s;
  inkShape(g, [[x - 34 * s, y - 14 * s], [x - 20 * s, y - 70 * s * fl], [x + lean, y - 110 * s * fl], [x + 18 * s, y - 64 * s * fl], [x + 34 * s, y - 14 * s]], { fill: '#f08a24', smooth: true, seed: 19 + k });
  inkShape(g, [[x - 16 * s, y - 14 * s], [x - 6 * s, y - 50 * s * fl], [x + lean * 0.6, y - 70 * s * fl], [x + 12 * s, y - 44 * s * fl], [x + 16 * s, y - 14 * s]], { fill: '#f8d34a', smooth: true, seed: 29 + k, w: LINE().width * 0.6 });
}
// cave(g, { wall, floor, opening }) — interior: rock wall all around with an arched opening to the outside
export function cave(g, o = {}) {
  plain(g, o.outside || '#f3d9a4');
  const wall = o.wall || '#6b5a4c', W = E.W, H = E.H, oy = H * 0.78;
  const outer = [[-W, -H], [W * 2, -H], [W * 2, H * 2], [-W, H * 2]];
  g.save(); g.fillStyle = wall; g.beginPath(); outer.forEach((p, i) => (i ? g.lineTo(...p) : g.moveTo(...p))); g.closePath();
  const cx = o.x ?? W * 0.72, rw = o.w ?? W * 0.16, rh = o.h ?? H * 0.42;
  g.moveTo(cx - rw, oy); g.quadraticCurveTo(cx - rw, oy - rh * 1.3, cx, oy - rh); g.quadraticCurveTo(cx + rw, oy - rh * 1.3, cx + rw, oy); g.closePath(); g.fill('evenodd'); g.restore();
  inkShape(g, [[cx - rw, oy], [cx - rw * 0.95, oy - rh * 0.8], [cx - rw * 0.5, oy - rh * 1.12], [cx, oy - rh * 1.02], [cx + rw * 0.55, oy - rh * 1.1], [cx + rw * 0.96, oy - rh * 0.75], [cx + rw, oy]], { closed: false, smooth: true, seed: 21 });
  g.fillStyle = o.floor || shade(wall, -0.25); g.fillRect(-W, oy, W * 3, H * 2);
  inkLine(g, [[-W, oy], [W * 2, oy]], { seed: 22, step: 40 });
  return { GY: oy, door: [cx, oy] };
}

// ---------- graphics ----------
// marker(g, str, x, y, { size, color, rot, t, start, align, outline }) — marker-pen text that pops in
export function marker(g, str, x, y, o = {}) {
  const { size = V(84, 76), color = ink(), rot = -0.02, t = 0, start = 0, align = 'center', outline = 0, font = FONTS.title } = o;
  const k = o.t == null ? 1 : pop(t, start); if (k <= 0) return;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k);
  text(g, str, 0, 0, { size, color, font, weight: 400, align, stroke: outline, strokeColor: o.strokeColor || '#ffffff' });
  g.restore();
}
// scribble underline under a word (draws on)
export function underline(g, x0, x1, y, o = {}) { const p = o.t == null ? 1 : ease.out(prog(o.t, o.start ?? 0, (o.start ?? 0) + 0.4)); if (p <= 0) return; inkLine(g, [[x0, y], [lerp(x0, x1, 0.5), y + 6], [lerp(x0, x1, p), y - 2]], { w: o.w ?? LINE().width * 1.2, stroke: o.color || S().ui.accent, seed: 23 }); }
// arrow(g, from, to, { bend, color, t, start }) — hand-drawn arrow that draws on
export function arrow(g, a, b, o = {}) {
  const p = o.t == null ? 1 : ease.out(prog(o.t, o.start ?? 0, (o.start ?? 0) + 0.45)); if (p <= 0) return;
  const bend = o.bend ?? 0.15, mx = (a[0] + b[0]) / 2 - (b[1] - a[1]) * bend, my = (a[1] + b[1]) / 2 + (b[0] - a[0]) * bend;
  const pts = []; for (let i = 0; i <= 12 * p; i++) { const u = i / 12; pts.push([(1 - u) ** 2 * a[0] + 2 * (1 - u) * u * mx + u * u * b[0], (1 - u) ** 2 * a[1] + 2 * (1 - u) * u * my + u * u * b[1]]); }
  if (pts.length < 2) return; const c = o.color || ink(), w = o.w ?? LINE().width; inkLine(g, pts, { w, stroke: c, seed: 24 });
  if (p > 0.95) { const e = pts[pts.length - 1], q = pts[pts.length - 3] || pts[0], ang = Math.atan2(e[1] - q[1], e[0] - q[0]), L = 24 + w; inkLine(g, [[e[0] - Math.cos(ang - 0.5) * L, e[1] - Math.sin(ang - 0.5) * L], e, [e[0] - Math.cos(ang + 0.5) * L, e[1] - Math.sin(ang + 0.5) * L]], { w, stroke: c, smooth: false, seed: 25 }); }
}
// bubble(g, x, y, w, h, { tail:[x,y], thought, t, start, fill }, inner(g)) — speech or thought bubble; inner draws its content
export function bubble(g, x, y, w, h, o = {}, inner) {
  const k = o.t == null ? 1 : pop(o.t, o.start ?? 0, 0.4); if (k <= 0) return;
  g.save(); g.translate(x, y); g.scale(k, k); const fill = o.fill || '#ffffff';
  if (o.thought) {
    const tl = o.tail ? [o.tail[0] - x, o.tail[1] - y] : [-w * 0.4, h * 0.9];
    [0.28, 0.5, 0.72].forEach((u, i) => inkCircle(g, tl[0] * (1 - u), tl[1] * (1 - u) + (h / 2) * u * 0, 9 + i * 7, { fill, seed: 26 + i }));
    const pts = []; const n = 14; for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2, rr = i % 2 ? 1.0 : 1.12; pts.push([Math.cos(a) * w / 2 * rr, Math.sin(a) * h / 2 * rr]); }
    inkShape(g, pts, { fill, smooth: true, seed: 30 });
  } else {
    inkRect(g, -w / 2, -h / 2, w, h, { fill, r: Math.min(w, h) * 0.35, seed: 31 });
    const tl = o.tail ? [o.tail[0] - x, o.tail[1] - y] : [-w * 0.25, h];
    inkShape(g, [[-w * 0.12, h / 2 - 4], [tl[0], tl[1]], [w * 0.08, h / 2 - 4]], { fill, seed: 32, stroke: false });
    inkLine(g, [[-w * 0.12, h / 2 - 2], [tl[0], tl[1]], [w * 0.08, h / 2 - 2]], { smooth: false, seed: 32 });
  }
  if (inner) { g.save(); inner(g); g.restore(); }
  g.restore();
}
// tally(g, x, y, n, { h, t, start, per, stroke, color })   stroke = the marks, color = the fifth (crossing) mark — tally marks in groups of five, appearing one by one
export function tally(g, x, y, n, o = {}) {
  const h = o.h ?? 70, gap = h * 0.28, per = o.per ?? 0.12, shown = o.t == null ? n : Math.floor(clamp((o.t - (o.start ?? 0)) / per, 0, n));
  for (let i = 0; i < shown; i++) {
    const grp = Math.floor(i / 5), j = i % 5, gx = x + grp * (gap * 4 + h * 0.7);
    if (j < 4) inkLine(g, [[gx + j * gap, y], [gx + j * gap + 3, y - h]], { w: o.w ?? LINE().width, seed: 40 + i, stroke: o.stroke || ink() });
    else inkLine(g, [[gx - gap * 0.6, y - h * 0.25], [gx + gap * 3.6, y - h * 0.8]], { w: o.w ?? LINE().width, seed: 40 + i, stroke: o.color || S().ui.accent });
  }
}
// icon(g, name, x, y, size, { t, start, color }) — small doodle icons: bulb clock fire check cross heart star question coin
export function icon(g, name, x, y, size = 80, o = {}) {
  const k = o.t == null ? 1 : pop(o.t, o.start ?? 0); if (k <= 0) return;
  const s = size / 80, ui = S().ui; g.save(); g.translate(x, y); g.scale(k * s, k * s);
  const W = LINE().width;
  switch (name) {
    case 'bulb': inkCircle(g, 0, -10, 28, { fill: o.color || ui.gold, seed: 50 }); inkRect(g, -14, 16, 28, 18, { fill: '#9aa3ad', r: 4, seed: 51 }); for (let i = 0; i < 5; i++) { const a = -Math.PI * (0.15 + i * 0.175); inkLine(g, [[Math.cos(a) * 40, -10 + Math.sin(a) * 40], [Math.cos(a) * 54, -10 + Math.sin(a) * 54]], { seed: 52 + i }); } break;
    case 'clock': inkCircle(g, 0, 0, 34, { fill: '#ffffff', seed: 53 }); inkLine(g, [[0, 0], [0, -22]], { seed: 54 }); inkLine(g, [[0, 0], [16, 6]], { seed: 55 }); break;
    case 'fire': inkShape(g, [[-22, 30], [-28, -2], [-8, -36], [0, -14], [12, -40], [28, 0], [22, 30]], { fill: o.color || '#f08a24', smooth: true, seed: 56 }); break;
    case 'check': inkLine(g, [[-26, 0], [-8, 22], [28, -26]], { w: W * 2, stroke: o.color || '#4caf50', smooth: false, seed: 57 }); break;
    case 'cross': inkLine(g, [[-24, -24], [24, 24]], { w: W * 2, stroke: o.color || ui.accent, seed: 58 }); inkLine(g, [[24, -24], [-24, 24]], { w: W * 2, stroke: o.color || ui.accent, seed: 59 }); break;
    case 'heart': inkShape(g, [[0, 30], [-32, -2], [-26, -26], [-6, -28], [0, -14], [6, -28], [26, -26], [32, -2]], { fill: o.color || '#e4572e', smooth: true, seed: 60 }); break;
    case 'star': { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 14 : 34; p.push([Math.cos(a) * r, Math.sin(a) * r]); } inkShape(g, p, { fill: o.color || ui.gold, seed: 61 }); break; }
    case 'question': text(g, '?', 0, 4, { size: 96, font: FONTS.title, weight: 400, color: o.color || ink() }); break;
    case 'coin': inkCircle(g, 0, 0, 30, { fill: o.color || ui.gold, seed: 62 }); text(g, '$', 0, 3, { size: 40, font: FONTS.title, weight: 400, color: ink() }); break;
  }
  g.restore();
}
export { contact };
