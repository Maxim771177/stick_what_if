import { def, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, texts, who, POSES, SETS } from '../lib.js';
import * as X from '../gfx.js';
import * as Y from '../gfx3.js';
import * as Z from '../gfx4.js';
import { OUT, drawCharacter, characterHead } from '../lib.js';
import { W, H, UP, c, LEON, kids, chair, table, desk, hs, seat, deskAt, trayAt, heldTray, inHand, hand, joint, sc } from '../cast.js';
export { Z, OUT, drawCharacter, characterHead, def, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, texts, who, POSES, SETS, X, Y, W, H, UP, c, LEON, kids, chair, table, desk, hs, seat, deskAt, trayAt, heldTray, inHand, hand, joint, sc };
// Leon всегда s 1.5 (эталон), остальные s 1.5 по умолчанию; f: 1 вправо, -1 влево
export const L = (x, o = {}) => LEON(x, { f: 1, s: 1.5, ...o });
export const P = (w, x, o = {}) => c(w, x, { tag: w, f: -1, s: 1.5, ...o });
export const SIT_Y = (w, s = 1.5) => 72 * sc({ s: s * ({ LEON: 0.86, OWEN: 1.12, ZOE: 1.15 }[w] ?? 1.15), outfit: { kid: ['LEON', 'OWEN', 'ZOE'].includes(w) ? false : true } });
// сидящие за столом: list [[w,x,f,opts]] -> {chars, pre} (стул под бёдрами); стол рисуется в mid через tableAt
export const sitters = (list, s = 1.5) => ({ chars: list.map(([w, x, f = 1, o = {}]) => c(w, x, { f, pose: 'sit', expr: 'neutral', s, tag: w, ...o })), pre: (g, t, i, ctx) => list.forEach(([w, x, f = 1]) => seat(g, x * W(), ctx.GY, w, f, s)) });
export const tableAt = (g, x, GY, wd = 360, topH = 150) => Y.mess(g, x, GY, wd, topH);
// склейка нескольких подсцен: merge({chars,pre,mid,fx,top}, ...)
export const merge = (...parts) => { const out = {}; const chars = []; for (const p of parts) { if (!p) continue; const { chars: pc, pre, mid, fx, top, ...rest } = p; Object.assign(out, rest); chars.push(...(pc || [])); } out.chars = chars; for (const k of ['pre', 'mid', 'fx', 'top']) { const fs = parts.filter((p) => p && p[k]).map((p) => p[k]); if (fs.length) out[k] = (g, t, i, ctx) => fs.forEach((f) => f(g, t, i, ctx)); } return out; };
export const hold = (fn) => ({ after: (g, o, t) => inHand(g, o, 'F', fn) });
// бумага в руке: лист вертикально
export const sheetHand = (w = 70, h = 90, o = {}) => (g, x, y, e) => Y.sheet(g, x + 6 * e, y - 40 * e, w * e, h * e, { lines: 3, ...o });
export const BG = (g, set, o) => SETS[set](g, o);

export const ev = (info, name) => { const r = texts(info, 'ev').find((q) => q.s === name); return r ? r.lt : null; };

// ---- ролик 09: помощники ----
export const GLASS = { expr: 'glassy' };
// миниатюра героя внутри облака-видения: drawCharacter по OUT
export const mini = (g, id, x, y, s = 0.9, f = 1, pose = 'stand', expr = 'neutral', o = {}) => drawCharacter(g, { x, y, s, facing: f, outfit: { ...OUT[id], ...(o.of || {}) }, expr, blink: false, talk: 0, look: o.look, pose: POSES[pose] || POSES.stand });
// видение: тёмное облако справа от застывшего Leon; fn(g,cx,cy,w,h,t) рисует внутри; ring = секунд осталось (по умолчанию бежит 10→0 за rate секунд)
export const vis = (fn, o = {}) => ({ set: 'voidDark', cam: o.cam || 'still', chars: o.chars || [L(0.1, { s: 1.4, expr: 'glassy', pose: 'stand' })], mid: (g, t, i, ctx) => { const ring = o.ring != null ? o.ring : Math.max(0, Math.ceil(10 - t * (o.rate ?? 1.6))); Z.vision(g, t, W() * 0.57, H() * 0.46, W() * 0.8, H() * 0.74, fn, { ring, lost: o.lost, flash: o.flash, tail: [-W() * 0.41, H() * 0.14] }); } });
// земля внутри облака (линия горизонта) для мини-сцен: рисуем полосу пола
export const vfloor = (g, cx, cy, w, h, col = '#3a4d78') => { g.fillStyle = col; g.fillRect(cx - w / 2, cy + h * 0.2, w, h * 0.4); };
// пол/линия земли уровня героя
export const GYF = (ctx) => ctx.GY;
// Leon в зависании: глаза-кольца видны, поза стоя
export const FZ = (x, o = {}) => L(x, { expr: 'glassy', pose: 'stand', ...o });
// суп на подносе в руках
export const soupTray = () => ({ after: (g, o) => { const a = hand(o, 'F'), b = hand(o, 'B'), e = sc(o), x = (a[0] + b[0]) / 2, y = (a[1] + b[1]) / 2; g.save(); g.translate(x, y - 12 * e); g.scale(1, 0.62); prop(g, 'tray', 0, 0, 76 * e); g.restore(); X.bowl(g, x, y - 34 * e, 22 * e); } });
export const blank = (n) => Array.from({ length: n }, (_, i) => i);
// улица (вид сбоку): тротуар и дорога; фон из кода, а не из картинки перспективы
SETS.streetWalk = (g) => { const GY = E.H * 0.78; const gr = g.createLinearGradient(0, 0, 0, E.H * 0.5); gr.addColorStop(0, '#78cdfa'); gr.addColorStop(1, '#d6efff'); g.fillStyle = gr; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 2);
  D.cloud(g, 320, 170, 1.3); D.cloud(g, 1450, 120, 1.1);
  [[160, '#e8b88a'], [720, '#a8c8e8'], [1280, '#e8d88a'], [1780, '#c8a8d8']].forEach(([x, col], i) => { inkRect(g, x - 160, E.H * 0.22, 320, E.H * 0.34, { fill: col, r: 6, w: 5 }); inkShape(g, [[x - 180, E.H * 0.22], [x, E.H * 0.1], [x + 180, E.H * 0.22]], { fill: '#b8603e', w: 5 }); inkRect(g, x - 60, E.H * 0.32, 70, 70, { fill: '#cfe6f5', r: 4, w: 4 }); inkRect(g, x + 40, E.H * 0.4, 56, E.H * 0.16, { fill: '#7a4a2a', r: 4, w: 4 }); });
  g.fillStyle = '#7da55a'; g.fillRect(-E.W, E.H * 0.56, E.W * 3, E.H * 0.1);
  g.fillStyle = '#d4d1c8'; g.fillRect(-E.W, E.H * 0.66, E.W * 3, E.H * 0.16); inkLine(g, [[-E.W, E.H * 0.66], [E.W * 2, E.H * 0.66]], { w: 5 }); inkLine(g, [[-E.W, E.H * 0.82], [E.W * 2, E.H * 0.82]], { w: 7 });
  for (let x = -E.W; x < E.W * 2; x += 220) inkLine(g, [[x, E.H * 0.66], [x, E.H * 0.82]], { w: 3, stroke: 'rgba(0,0,0,.25)' });
  g.fillStyle = '#585d66'; g.fillRect(-E.W, E.H * 0.82, E.W * 3, E.H); for (let x = 0; x < E.W; x += 260) inkLine(g, [[x, E.H * 0.935], [x + 130, E.H * 0.935]], { w: 8, stroke: '#f1ead9' });
  return { GY }; };
export const ROAD = () => H() * 0.94;  // колёса скутера на проезжей части
