// cast.js ролика 04: общие кирпичики сцен (герои, мебель, картинки для облаков).
import { OUT, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, NOW } from './lib.js';
import * as X from './gfx.js';
export const W = () => E.W, H = () => E.H;
export const UP = [0.3, -2.2];
export const c = (w, x, o = {}) => ({ w, x, noin: 1, ...o });
export const LEON = (x, o) => c('LEON', x, { tag: 'LEON', ...o });
export const hair = (h, col) => ({ hair: h, hairColor: col });
// толпа: n детей по x-списку; разные причёски и цвета. o.tags — {индекс: 'TAG'}, o.f — направление
const KID_IDS = ['KID', 'KID2', 'KID3', 'KID4', 'KID5', 'KID6'];
const HAIR = [['short', '#2b2420'], ['ponytail', '#6b3a1e'], ['curly', '#2b2420'], ['messy', '#8a5a2e'], ['bun', '#2b2420'], ['long', '#c8923a'], ['short', '#c8923a'], ['curly', '#6b3a1e']];
const COL = ['#3fb950', '#3a6ea5', '#f29ac0', '#8a6ab0', '#f2a03a', '#c0504d', '#17a2b8', '#e4872b', '#5a7fb0', '#9aa84a'];
export const kids = (xs, o = {}) => xs.map((x, i) => { const j = (i + (o.off || 0)); const q = Array.isArray(x) ? x : [x, 0]; return c(KID_IDS[j % 6], q[0], { dy: q[1] || 0, f: o.f ?? (i % 2 ? -1 : 1), of: { hair: HAIR[j % 8][0], hairColor: HAIR[j % 8][1], color: COL[j % 10] }, pose: o.pose || 'stand', expr: o.expr || 'neutral', look: o.look, s: o.s, tag: o.tags && o.tags[i], ...(o.each ? o.each(i) : {}) }); });
// ---- мебель ----
export const chair = (g, x, GY, s = 1.78, f = 1, col = '#9a6a3a') => { const sy = GY - 70 * s; inkRect(g, x - 40 * s * 0.6, sy, 80 * s * 0.6, 14, { fill: col, r: 4, w: 4 }); inkLine(g, [[x - 28 * s * 0.6, sy + 14], [x - 28 * s * 0.6, GY]], { w: 6 }); inkLine(g, [[x + 28 * s * 0.6, sy + 14], [x + 28 * s * 0.6, GY]], { w: 6 }); inkLine(g, [[x - f * 28 * s * 0.6, sy], [x - f * 28 * s * 0.6, sy - 90]], { w: 8, stroke: col }); };
export const table = (g, x, GY, w = 560, topH = 200, fill = '#c98b4a') => { const y = GY - topH; inkRect(g, x - w / 2, y, w, 24, { fill, r: 6, w: 5 }); inkRect(g, x - w / 2 + 14, y + 24, w - 28, topH - 40, { fill: '#b57a3d', r: 4, w: 4 }); };
export const desk = (g, x, GY, w = 260, topH = 170) => { const y = GY - topH; inkRect(g, x - w / 2, y, w, 18, { fill: '#c98b4a', r: 5, w: 5 }); inkLine(g, [[x - w / 2 + 16, y + 18], [x - w / 2 + 16, GY]], { w: 6 }); inkLine(g, [[x + w / 2 - 16, y + 18], [x + w / 2 - 16, GY]], { w: 6 }); };
export const lockerWall = (g, x0, x1, y0, y1) => { };
// ---- картинки для облаков: (g, cx, cy, w, h, t) ----
export const pic = {
  pizza: (g, x, y) => X.pizza(g, x, y, 62), heart: (g, x, y) => X.heart(g, x, y, 70), note: (g, x, y) => X.musicNote(g, x, y, 62), q: (g, x, y) => X.qmark(g, x, y + 6, 120), soccer: (g, x, y) => X.soccer(g, x, y, 62), book: (g, x, y) => X.book(g, x, y, 62), burger: (g, x, y) => X.burger(g, x, y, 62), ice: (g, x, y) => X.icecream(g, x, y - 10, 56), star: (g, x, y) => X.star(g, x, y, 66),
  sock: (g, x, y, w, h, t) => { prop(g, 'sock', x, y, h * 0.86, { rot: Math.sin(t * 3) * 0.04 }); },
  leon: (aim) => (g, x, y) => X.miniLeon(g, x, y - 4, 62, aim),
  beach: (g, x, y, w, h, t) => { inkEllipse(g, x, y + 55, 90, 22, { fill: '#f2d08a', w: 4 }); inkLine(g, [[x + 10, y + 50], [x + 22, y - 25]], { w: 7, stroke: '#7a4a1e' }); [[-0.9, -0.2], [0, -0.7], [0.9, -0.2], [-0.5, -0.55], [0.5, -0.55]].forEach(([a, b]) => inkLine(g, [[x + 22, y - 25], [x + 22 + a * 48, y - 25 + b * 38 + 22]], { w: 7, stroke: '#3fa34d' })); X.sun(g, x - 60, y - 40, 20, t); },
};
export const pics = (...n) => n.map((k) => pic[k]);
// ---- сидящие: стул под бёдрами (s = эффективный масштаб героя), парта впереди ----
export const effS = (w, s = 1.55) => s * ({ LEON: 0.86, OWEN: 1.12, KID: 1.15, KID2: 1.15, KID3: 1.15, KID4: 1.15, KID5: 1.15, KID6: 1.15, CHASE: 1.2, ZOE: 1.15, COOL1: 1.18, COOL2: 1.15, COOL3: 1.18, COOL4: 1.15, ROCCO: 1.42, LEO: 1.15, DAD: 1.22, MOM: 1.14, PARK: 1.2 }[w] ?? 1);
export const seat = (g, x, GY, w, f = 1, s) => chair(g, x, GY, effS(w, s), f);
export const deskAt = (g, x, GY, w, f = 1, s, wd = 200) => { const e = effS(w, s), top = GY - 112 * e, cx = x + f * 80 * e; inkRect(g, cx - wd / 2, top, wd, 16, { fill: '#c98b4a', r: 5, w: 5 }); inkLine(g, [[cx - wd / 2 + 14, top + 16], [cx - wd / 2 + 14, GY]], { w: 6 }); inkLine(g, [[cx + wd / 2 - 14, top + 16], [cx + wd / 2 - 14, GY]], { w: 6 }); };
// реальный масштаб героя (детские куклы ×0.72): по нему ставим предметы в руки
export const hs = (w, s) => effS(w, s) * (OUT[w]?.kid ? 0.72 : 1);
// поднос в руках: руки (holdTray) снизу под подносом, поднос смотрит сверху (сплюснут по высоте)
export const trayAt = (g, x, GY, w, f = 1, s, k = 1) => { const e = hs(w, s); g.save(); g.translate(x + f * 40 * e, GY - 139 * e); g.scale(1, 0.62); prop(g, 'tray', 0, 0, 72 * e * k); g.restore(); };
// поднос на столе: лежит плашмя на столешнице (низ подноса на плоскости стола)
export const trayFlat = (g, x, topY, wd = 150) => { const h = wd * 0.747 * 0.42; g.save(); g.translate(x, topY + 14 - h / 2); g.scale(1, 0.42); prop(g, 'tray', 0, 0, wd * 0.747); g.restore(); };
// мяч в руках (holdBall): центр перед грудью, руки снизу
export const ballAt = (g, x, GY, w, f = 1, s) => { const e = hs(w, s); prop(g, 'dodgeball', x + f * 34 * e, GY - 136 * e, 49 * e); };
// бумага плашмя на столешнице
export const paperFlat = (g, x, topY, wd = 110) => { const h = wd * 0.2; g.save(); g.translate(x, topY + 12); inkShape(g, [[-wd / 2, h / 2], [wd / 2 - 8, h / 2], [wd / 2 + 6, -h / 2], [-wd / 2 + 14, -h / 2]], { fill: '#fffdf6', w: 4 }); for (let i = 0; i < 3; i++) inkLine(g, [[-wd * 0.28 + i * 4, h * 0.3 - i * h * 0.3], [wd * 0.3 + i * 3, h * 0.3 - i * h * 0.3]], { w: 2, stroke: '#888' }); g.restore(); };
// столовая: стол крутых по центру, стулья по бокам (стол рисуется в mid поверх ног)
export const cafeTable = (g, x, GY, w = 560) => { table(g, x, GY, w, 180, '#c98b4a'); };
// проверка на перекрытие облаков не нужна: ярусы задаются в сценах
export const seated = (w, x, f, o = {}) => c(w, x, { f, pose: 'sit', ...o });
