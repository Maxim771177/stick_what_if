import { def, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, texts } from '../lib.js';
import * as X from '../gfx.js';
import { W, H, UP, c, LEON, kids, chair, table, desk, hs, trayAt, ballAt, sc, joint, hand, ballHeld, inHand, heldTray } from '../cast.js';
export { def, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, texts, X, W, H, UP, c, LEON, kids, chair, table, desk, hs, trayAt, ballAt, sc, joint, hand, ballHeld, inHand, heldTray };
export const GYH = () => E.H * 0.82;
// мяч: центр (x,y), r = радиус в пикселях
export const ball = (g, x, y, r, rot = 0) => prop(g, 'dodgeball', x, y, r * 2, { rot });
// траектория: от (x0,y0) к (x1,y1) за [t0,t0+d] с дугой arc (px вверх)
export const fly = (t, t0, d, x0, y0, x1, y1, arc = 80) => { const u = clamp((t - t0) / d); return [lerp(x0, x1, u), lerp(y0, y1, u) - Math.sin(u * Math.PI) * arc, u]; };
export const tag = (id, x, o = {}) => c(id, x, { tag: id, ...o });
// команда Chase: 4 ребёнка в ряд лицом вправо (f=1)
export const TEAM = (xs, o = {}) => kids(xs, { f: 1, off: 2, pose: 'stand', ...o });
// зрители на скамейке
export const bench = (g, x, GY, w = 520) => { inkRect(g, x - w / 2, GY - 120, w, 22, { fill: '#c98b4a', r: 6, w: 5 }); inkLine(g, [[x - w / 2 + 30, GY - 98], [x - w / 2 + 30, GY]], { w: 6 }); inkLine(g, [[x + w / 2 - 30, GY - 98], [x + w / 2 - 30, GY]], { w: 6 }); };
// подпись-метка со стрелкой (кодом поверх)
export const arrow = (g, x0, y0, x1, y1, col = '#e5383b') => { g.save(); g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); const a = Math.atan2(y1 - y0, x1 - x0); g.beginPath(); g.moveTo(x1, y1); g.lineTo(x1 - 30 * Math.cos(a - 0.5), y1 - 30 * Math.sin(a - 0.5)); g.lineTo(x1 - 30 * Math.cos(a + 0.5), y1 - 30 * Math.sin(a + 0.5)); g.closePath(); g.fill(); g.restore(); };

// кисть из именованной позы (для вылета предмета из ладони без привязки к текущей позе)
import { POSES } from '../lib.js';
export const poseHand = (o, name, k = 'F') => { const h = POSES[name][k === 'B' ? 'hB' : 'hF'], e = sc(o); return [o.x + o.facing * e * h[0], o.y + e * h[1]]; };

// ===== ролик 06 =====
import { who } from '../lib.js';
export { who };
export const WALT_SIT = { head: [4, -108], sh: [1, -74], hip: [0, -4], eF: [20, -42], hF: [44, -24], eB: [12, -42], hB: [36, -20], kF: [52, -48], fF: [86, 0], kB: [46, -44], fB: [76, 0] };
export const WALT_SIT_CUP = { ...WALT_SIT, eF: [26, -64], hF: [56, -74] };
export const WALT_SIT_UP = { ...WALT_SIT, eF: [30, -84], hF: [44, -122] };
// Walt: сидит на земле (по умолчанию), tag WALT
export const WALT = (x, o = {}) => c('WALT', x, { tag: 'WALT', poseObj: WALT_SIT, f: -1, ...o });
export const WALTS = (x, o = {}) => c('WALT', x, { tag: 'WALT', pose: 'stand', f: -1, ...o });
// число над головой: nt('$6,310,000,000','green',{size, t0, dy}) -> after для персонажа; str может быть функцией от времени
export const nt = (str, col = 'green', opt = {}) => (g, o, t) => { if (o.hidden) return; const t0 = opt.t0 ?? 0, t1 = opt.t1 ?? 1e9; if (t > t1) return; const a = ease.out(prog(t, t0, t0 + 0.4)) * (opt.fade ? 1 - ease.out(prog(t, opt.fade, opt.fade + 0.4)) : 1); if (a <= 0.01) return; const s = typeof str === 'function' ? str(t) : str; X.numTag(g, o, s, typeof col === 'function' ? col(t) : col, { ...opt, a: (opt.a ?? 1) * a, k: (opt.k ?? 1) * (0.86 + 0.14 * ease.outBack(prog(t, t0, t0 + 0.5))) }); };
export const LN = (str, opt) => nt(str, 'blue', opt);
export const GN = (str, opt) => nt(str, 'green', opt);
export const GYS = (ctx) => ctx.GY;
export const $ = (n) => X.money(n);
// число, меняющееся по ступеням: seq = [[t, значение], ...]
export const stepVal = (seq) => (t) => { let v = seq[0][1]; for (const [tt, x] of seq) if (t >= tt) v = x; return $(v); };
// плавное число (interp по ключам)
export const tweenVal = (seq) => (t) => $(kf(seq, t, seq[0][1]));
// подпись-строка под героем
export const person = (w, x, o = {}) => c(w, x, { tag: w, ...o });

export const all = (...fs) => (g, o, t) => fs.forEach((f) => f(g, o, t));
// дорога к горизонту с флажком на конце (схема)
export const roadFlag = (g, t, o = {}) => { const hy = H() * 0.44; inkShape(g, [[W() * 0.3, H()], [W() * 0.7, H()], [W() * 0.53, hy], [W() * 0.47, hy]], { fill: '#8c8c93', w: 6 }); for (let i = 0; i < 6; i++) { const u0 = i / 6 + 0.04, u1 = u0 + 0.06; const y0 = lerp(H(), hy, u0), y1 = lerp(H(), hy, u1); inkLine(g, [[W() * 0.5, y0], [W() * 0.5, y1]], { w: lerp(8, 3, u0), stroke: '#f6e27a' }); } X.flag(g, W() * 0.5, hy, 130, t); };

// ===== ролик 07 (GTA-жизнь) =====
import '../sets2.js';
import * as X2 from '../gfx2.js';
export { X2 };
// события из раскадровки: ev(info,'yellow') -> локальное время или null
export const ev = (info, name) => { const r = texts(info, 'ev').find((q) => q.s === name); return r ? r.lt : null; };
export const evs = (info, name) => texts(info, 'ev').filter((q) => q.s === name).map((q) => q.lt);
// HUD поверх сцены: o.stars {n,t0,pulse,blink}, o.mini {zoom,marks}, o.hp (число или функция t), o.armor
export function hud(g, t, o) { if (!o) return; if (o.stars) X2.hudStars(g, o.stars.n, t, o.stars); if (o.mini) { const m = o.mini === true ? {} : o.mini; X2.minimap(g, 150, E.H - 150, 108, t, { marks: [[0.5, -0.4, '#ffd23a'], [-0.6, 0.2, '#ffd23a'], [0.2, 0.6, '#ffd23a']], ...m }); } }
const _def = def;
// def7: как def, плюс spec.hud (рисуется поверх) и spec.tops
export const def7 = (id, spec) => _def(id, { ...spec, top: (g, t, info, ctx) => { if (spec.top) spec.top(g, t, info, ctx); const h = typeof spec.hud === 'function' ? spec.hud(t, info) : spec.hud; hud(g, t, h); } });
export const GYF = (k = 0.86) => E.H * k;
// пилот/водитель: персонаж сидит за стеклом; машина рисуется в mid поверх (окно с вырезом)
export const DRV = (who, x, hy, o = {}) => c(who, x, { pose: 'sit', f: 1, ...o });
export const CAPB = { hatColor: '#2f6dd8' };
