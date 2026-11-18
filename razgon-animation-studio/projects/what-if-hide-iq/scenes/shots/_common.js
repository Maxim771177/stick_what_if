import { def, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, texts, who, POSES, SETS } from '../lib.js';
import * as X from '../gfx.js';
import * as Y from '../gfx3.js';
import { W, H, UP, c, LEON, kids, chair, table, desk, hs, seat, deskAt, trayAt, heldTray, inHand, hand, joint, sc } from '../cast.js';
export { def, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, texts, who, POSES, SETS, X, Y, W, H, UP, c, LEON, kids, chair, table, desk, hs, seat, deskAt, trayAt, heldTray, inHand, hand, joint, sc };
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
