import { def, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, texts, who, POSES, SETS } from '../lib.js';
import * as X from '../gfx.js';
import * as Y from '../gfx3.js';
import * as Z from '../gfx4.js';
import * as G from '../gfx5.js';
import { OUT, drawCharacter, characterHead, NOW } from '../lib.js';
import { W, H, UP, c, LEON, kids, chair, table, desk, hs, seat, deskAt, trayAt, heldTray, inHand, hand, joint, sc } from '../cast.js';
export { NOW } from '../lib.js';
export { G, Z, OUT, drawCharacter, characterHead, def, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, texts, who, POSES, SETS, X, Y, W, H, UP, c, LEON, kids, chair, table, desk, hs, seat, deskAt, trayAt, heldTray, inHand, hand, joint, sc };
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

// ---- зал (с 20.11.2026): стулья профильные, под каждым зрителем, ряд пустых стульев между ними; зрители смотрят к центру ----
export const audChairs = (g, ctx, chars = []) => {
  const GY = ctx.GY, seatsAt = [];
  for (const ch of chars) { if (ch.xK || ch.walk) continue; if (ch.pose === 'sit' || String(ch.tag || '').startsWith('AUD') || ch.seat) seatsAt.push(ch); }
  const occ = seatsAt.map((ch) => ch.x);
  for (let x = 0.05; x < 1; x += 0.1) { if (occ.some((o) => Math.abs(o - x) < 0.075)) continue; seat(g, x * W(), GY, 'KID', x < 0.5 ? 1 : -1, 1.5); }
  for (const ch of seatsAt) seat(g, ch.x * W(), GY + (ch.dy || 0), ch.w, ch.f ?? 1, ch.s);
};
export const defS = (id, spec) => def(id, spec);
import { SMX } from '../lib.js';
// зал: стулья нарисованы в фоне stage2.png (8 профильных стульев, лицом вправо); SLOT(i) = x таза сидящего на стуле i (0..7)
export const SLOT = (i, dx = 0) => 0.0517 + 0.1272 * i + dx;
export const bigS = (w) => 2.1 / ((SMX[w] ?? 1) * (OUT[w]?.kid ? 0.72 : 1));
export const ONSTAGE = () => (E.H * 0.444 - E.H * 0.9);

// ================= ролик 10: класс, парты, числа =================
export const SITW = { head: [8, -178], sh: [3, -146], hip: [0, -72], eF: [22, -122], hF: [50, -114], eB: [12, -118], hB: [34, -110], kF: [44, -74], fF: [46, 0], kB: [40, -72], fB: [38, 0] };
export const SITUP = { ...SITW, eF: [26, -176], hF: [38, -226] };   // сидит, правая рука поднята вверх (держит лист)
export const sitAt = (w, x, o = {}) => c(w, x, { f: 1, pose: 'sit', poseObj: SITW, expr: 'neutral', s: 1.5, tag: w, ...o });
const dyOf = (op) => (op || {}).dy || 0;
// передний ряд: [[w, x, opts]] -> {chars, pre (стулья), mid (парты)}; opts: f, dy, s, expr, num, poseObj...
export const row = (list, wd = 260) => ({
  chars: list.map(([w, x, op]) => sitAt(w, x, op)),
  pre: (g, t, i, ctx) => list.forEach(([w, x, op]) => seat(g, x * W(), ctx.GY + dyOf(op), w, (op || {}).f ?? 1, (op || {}).s ?? 1.5)),
  mid: (g, t, i, ctx) => list.forEach(([w, x, op]) => deskAt(g, x * W(), ctx.GY + dyOf(op), w, (op || {}).f ?? 1, (op || {}).s ?? 1.5, wd)),
});
// задний ряд: ученики и парты рисуются в pre (за героями); dy < 0 = дальше от зрителя
const BACK_IDS = ['KID', 'KID2', 'KID3', 'KID4', 'KID5', 'KID6'];
const BACK_HAIR = [['short', '#2b2420'], ['ponytail', '#6b3a1e'], ['curly', '#2b2420'], ['messy', '#8a5a2e'], ['bun', '#2b2420'], ['long', '#c8923a'], ['short', '#c8923a'], ['curly', '#6b3a1e']];
const BACK_COL = ['#3fb950', '#3a6ea5', '#f29ac0', '#8a6ab0', '#f2a03a', '#c0504d', '#17a2b8', '#e4872b', '#5a7fb0', '#9aa84a'];
export const backRow = (xs, o = {}) => (g, t, info, ctx) => xs.forEach((x, i) => {
  const j = i + (o.off || 0), w = BACK_IDS[j % 6], s = o.s ?? 1.3, dy = o.dy ?? -95, GYb = ctx.GY + dy;
  seat(g, x * W(), GYb, w, 1, s);
  who(g, c(w, x, { f: o.f ?? 1, pose: 'sit', poseObj: SITW, s, dy, noin: 1, of: { hair: BACK_HAIR[j % 8][0], hairColor: BACK_HAIR[j % 8][1], color: BACK_COL[j % 10] }, expr: (o.expr && o.expr(i)) || 'neutral', look: o.look, num: o.num === false ? false : undefined, numSize: o.numSize ?? 52 }), t, info, ctx.GY, undefined);
  deskAt(g, x * W(), GYb, w, 1, s, 230);
});
// пачка листов в руке Park
export const stack = (g, x, y, e) => { Y.sheet(g, x + 8 * e, y - 24 * e, 60 * e, 78 * e, { lines: 2, rot: 0.1 }); Y.sheet(g, x + 5 * e, y - 22 * e, 60 * e, 78 * e, { lines: 2, rot: -0.04 }); };
// Park с листами: front = ходит перед партами
export const parkWith = (x, o = {}) => P('PARK', x, { f: 1, front: true, dy: 70, pose: 'stand', after: hold2(stack), ...o });
// окно-зеркало с отражением Leon и числом (число не отзеркаливается); num = строка
export const mirrorWin = (g, x, y, w, h, num = '160', pulse = 0, f = -1) => G.windowPane(g, x, y, w, h, (g2, cx, bottom, hh) => { g2.save(); g2.globalAlpha = 0.62; mini(g2, 'LEON', cx, bottom - 14, hh / 520, f, 'stand', 'neutral'); g2.restore(); g2.save(); g2.globalAlpha = 1; X.numText(g2, num, cx, bottom - hh * 0.62 - 90, hh * 0.17 * (1 + pulse * Math.sin(NOW * 6) * 0.08), 'green'); g2.restore(); });
// лист с оценкой в руке героя
export const gradeHand = (grade, col, o = {}) => (g, x, y, e) => G.gradePaper(g, x + 14 * e, y - 46 * e, (o.w ?? 88) * e, (o.h ?? 112) * e, grade, { col, lines: 3, ...o });
// стопка карточек, головоломка, секундомер
export const puzzle = (g, x, y, r = 60) => { inkRect(g, x - r, y - r, r * 2, r * 2, { fill: '#f2a03a', r: 8, w: 6 }); inkCircle(g, x + r, y, r * 0.34, { fill: '#f2a03a', w: 6 }); inkCircle(g, x, y - r, r * 0.34, { fill: '#f2a03a', w: 6 }); inkRect(g, x - r + 4, y - r + 4, r * 2 - 8, r * 2 - 8, { fill: '#f2a03a', r: 6, w: 0 }); X.qmark(g, x, y + r * 0.2, r * 1.2, '#fffdf6'); };
export const stopwatch = (g, x, y, r = 60, t = 0) => { inkCircle(g, x, y, r, { fill: '#fffdf6', w: 7 }); inkRect(g, x - 9, y - r - 22, 18, 22, { fill: '#8a8f98', r: 3, w: 4 }); for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; inkLine(g, [[x + Math.sin(a) * r * 0.78, y - Math.cos(a) * r * 0.78], [x + Math.sin(a) * r * 0.9, y - Math.cos(a) * r * 0.9]], { w: 3 }); } const a = t * 5; inkLine(g, [[x, y], [x + Math.sin(a) * r * 0.65, y - Math.cos(a) * r * 0.65]], { w: 5, stroke: '#d8232a' }); inkCircle(g, x, y, 5, { fill: S().ink, w: 0 }); };

// предмет в правой руке: after: hold2((g,x,y,e)=>...)
export const hold2 = (fn, k = 'F') => (g, o) => inHand(g, o, k, (x, y, e) => fn(g, x, y, e, o));

// реплика-плашка вручную: (g, x, y, строка, хвост к (tx,ty)); не клипается
export const speech = (g, x, y, str, tx, ty, size = 46) => { const w = measure(g, str, size) + 70, h = size * 1.7; g.save(); g.fillStyle = '#fff'; g.strokeStyle = S().ink; g.lineWidth = 6; g.beginPath(); g.roundRect(x - w / 2, y - h / 2, w, h, 26); g.fill(); g.stroke(); g.beginPath(); g.moveTo(x - 24, y + h / 2 - 3); g.lineTo(tx, ty); g.lineTo(x + 24, y + h / 2 - 3); g.closePath(); g.fill(); g.stroke(); g.fillStyle = '#fff'; g.fillRect(x - 22, y + h / 2 - 8, 44, 10); text(g, str, x, y + size * 0.14, { size, font: FONTS.ui, weight: 900, color: S().ink }); g.restore(); };
// фасад пиццерии (рисуется поверх фона улицы): вывеска с качанием
export const shopFront = (g, x, GY, t = 0, sign = 'MAPLE ST PIZZA') => { const w = 620, h = 520; inkRect(g, x - w / 2, GY - h, w, h, { fill: '#e8c8a0', r: 6, w: 6 }); inkRect(g, x - w / 2 + 40, GY - h + 200, 250, 230, { fill: '#cfe6f5', r: 6, w: 5 }); inkRect(g, x + 70, GY - 270, 150, 270, { fill: '#8a5a2e', r: 6, w: 5 }); for (let i = 0; i < 8; i++) inkRect(g, x - w / 2 + i * (w / 8), GY - h + 120, w / 8, 70, { fill: i % 2 ? '#fff' : '#d8232a', r: 0, w: 4 }); g.save(); g.translate(x, GY - h - 20); g.rotate(Math.sin(t * 3) * 0.02); inkRect(g, -240, -70, 480, 100, { fill: '#2f5d8a', r: 14, w: 6 }); text(g, sign, 0, 0, { size: 56, font: FONTS.title, weight: 400, color: '#fff' }); g.restore(); };
// ложка-кулинарная сковородка в руке: ручка и круг
export const pan = (g, x, y, e, o) => { const f = o ? o.facing : 1; inkLine(g, [[x, y], [x - f * 70 * e, y + 4 * e]], { w: 9 * e, stroke: '#5a4a3a' }); inkEllipse(g, x + f * 34 * e, y - 4 * e, 52 * e, 12 * e, { fill: '#4a4f58', w: 5 }); };
// открытая книга/учебник в руке
export const openBook = (g, x, y, e) => { inkShape(g, [[x - 50 * e, y - 6 * e], [x, y - 22 * e], [x, y + 24 * e], [x - 50 * e, y + 36 * e]], { fill: '#fffdf6', w: 4 }); inkShape(g, [[x, y - 22 * e], [x + 50 * e, y - 6 * e], [x + 50 * e, y + 36 * e], [x, y + 24 * e]], { fill: '#fffdf6', w: 4 }); inkLine(g, [[x - 38 * e, y + 2 * e], [x - 8 * e, y - 8 * e]], { w: 2, stroke: '#8896b0' }); inkLine(g, [[x + 8 * e, y - 8 * e], [x + 38 * e, y + 2 * e]], { w: 2, stroke: '#8896b0' }); };
// кольцо-выделение вокруг числа над головой (после who): ring(g, o, size)
export const numRing = (g, o, a = 1, r = 74) => { const e = o.s * (o.outfit?.kid ? 0.72 : 1), top = o.hy - 104 * e - 86 * 0.6 - 2; g.save(); g.globalAlpha = a; g.lineWidth = 9; g.strokeStyle = '#ffd23a'; g.shadowColor = '#ffd23a'; g.shadowBlur = 16; g.beginPath(); g.ellipse(o.x, top, r * 1.5, r * 0.9, 0, 0, 7); g.stroke(); g.restore(); };

// ===== класс Ms. Park: передний ряд (Owen, Leon, Caleb) + задний ряд =====
const BK = [0.07, 0.27, 0.47, 0.7, 0.9];
export const FR = (o = {}) => [['OWEN', 0.18, { expr: 'neutral', ...(o.OWEN || {}) }], ['LEON', 0.36, { expr: 'neutral', ...(o.LEON || {}) }], ['CALEB', 0.6, { expr: 'neutral', ...(o.CALEB || {}) }]];
export const CLS = (o = {}, ...extra) => merge({ pre: backRow(o.back ?? BK, o.bo) }, row(o.front ?? FR(o.of || {})), ...extra);


// зелёная тетрадь плашмя на столе (центр x, верх стола topY)
export const greenBook = (g, x, topY, wd = 150, open = false) => { const h = wd * 0.3; g.save(); g.translate(x, topY + 10 - h / 2); inkShape(g, [[-wd / 2, h / 2], [wd / 2 - 12, h / 2], [wd / 2 + 10, -h / 2], [-wd / 2 + 16, -h / 2]], { fill: '#2f8f5a', w: 4 }); inkShape(g, [[-wd / 2 + 10, h / 2 - 5], [wd / 2 - 18, h / 2 - 5], [wd / 2 + 2, -h / 2 + 5], [-wd / 2 + 22, -h / 2 + 5]], { fill: open ? '#fffdf6' : '#46a874', w: 0 }); if (!open) text(g, 'MISTAKES', 0, h * 0.12, { size: h * 0.5, font: FONTS.title, weight: 400, color: '#fff' }); g.restore(); };
// стеллаж с книгами (спереди, от пола): x центр, w ширина, h высота
export const bookcase = (g, x, GY, w = 380, h = 620) => { inkRect(g, x - w / 2, GY - h, w, h, { fill: '#8a5a2e', r: 6, w: 6 }); const cols = ['#d8232a', '#3d7ea6', '#2fb344', '#f6b93b', '#8a6ab0', '#e4872b', '#17a2b8', '#c0504d']; const rows = 5, rh = (h - 30) / rows; for (let r = 0; r < rows; r++) { const y = GY - h + 20 + (r + 1) * rh - 6; inkLine(g, [[x - w / 2 + 8, y], [x + w / 2 - 8, y]], { w: 5 }); let bx = x - w / 2 + 14; for (let b = 0; b < 12; b++) { const bw = 20 + ((b * 7 + r * 3) % 4) * 6, bh = rh * (0.62 + ((b * 5 + r) % 3) * 0.1); inkRect(g, bx, y - bh, bw, bh, { fill: cols[(b + r) % 8], r: 3, w: 3 }); bx += bw + 2; if (bx > x + w / 2 - 30) break; } } };
// дверь библиотеки с тёплым светом (коридор)
export const libDoor = (g, x, GY, a = 1) => { const w = 200, h = 430; inkRect(g, x - w / 2 - 12, GY - h - 12, w + 24, h + 12, { fill: '#6b4a2a', r: 6, w: 6 }); g.save(); const gr = g.createLinearGradient(0, GY - h, 0, GY); gr.addColorStop(0, '#fff2b0'); gr.addColorStop(1, '#ffd76a'); g.fillStyle = gr; g.fillRect(x - w / 2, GY - h, w, h); g.restore(); g.save(); g.globalAlpha = 0.28 * a; g.fillStyle = '#ffe48a'; g.beginPath(); g.moveTo(x - w / 2, GY); g.lineTo(x + w / 2, GY); g.lineTo(x + w / 2 + 220, GY + 90); g.lineTo(x - w / 2 - 220, GY + 90); g.closePath(); g.fill(); g.restore(); inkRect(g, x - 120, GY - h - 80, 240, 56, { fill: '#2f5d8a', r: 8, w: 5 }); text(g, 'LIBRARY', x, GY - h - 50, { size: 36, font: FONTS.title, weight: 400, color: '#fff' }); };
// подсветка колонки тетради по времени подписей cap: hi
export const capIdx = (info, t, k = 'cap') => { let hi = -1; texts(info, k).forEach((r, i) => { if (t >= r.lt) hi = i; }); return hi; };

// ================= ролик 10: стол с машиной и зал на складных стульях =================
export const BENCH_TOP = 135;
// стол с машиной: герои стоят позади (их ноги скрыты столом); st — состояние машины; o.dy — сдвиг стола вниз, o.top — высота стола
export const bench = (st = () => ({}), o = {}) => (g, t, info, ctx) => { const dy = o.dy ?? 40, top = o.top ?? BENCH_TOP; Y.mess(g, (o.x ?? 0.5) * W(), ctx.GY + dy, o.wd ?? 1840, top); const w = o.w ?? 1760; G.machine(g, (o.x ?? 0.5) * W() - w / 2, ctx.GY + dy - top, w, { t, ...st(t, info) }); };
export const MX = (i, o = {}) => (o.x ?? 0.5) * W() - (o.w ?? 1760) / 2 + (i - 0.5) * ((o.w ?? 1760) / 20);   // x центра шага i (1..20)
// зрители в зале: складные стулья и дети на них; rows = [[dy, s, [x...], off]]; stand(t) → встали ли
export const gymCrowd = (o = {}) => (g, t, info, ctx) => {
  const rows = o.rows ?? [[-262, 0.8, [0.03, 0.095, 0.16, 0.225, 0.29, 0.355, 0.42, 0.485, 0.55, 0.615, 0.68, 0.745, 0.81, 0.875, 0.94], 0], [-176, 0.92, [0.06, 0.13, 0.2, 0.27, 0.34, 0.41, 0.48, 0.55, 0.62, 0.69, 0.76, 0.83, 0.9, 0.97], 3]];
  const up = o.stand ? o.stand(t, info) : 0;
  for (const [dy, s, xs, off] of rows) xs.forEach((x, i) => {
    const j = i + off, w = BACK_IDS[j % 6], GYb = ctx.GY + dy, e = Q_effS(w, s);
    foldChair(g, x * W(), GYb, e, x < 0.5 ? 1 : -1);
    if (o.chairsOnly) return;
    const stood = up > 0.01;
    who(g, c(w, x, { f: x < 0.5 ? 1 : -1, pose: stood ? 'cheer' : 'sit', poseObj: stood ? null : SITW, s, dy, noin: 1, of: { hair: BACK_HAIR[j % 8][0], hairColor: BACK_HAIR[j % 8][1], color: BACK_COL[j % 10] }, expr: stood ? 'joy' : ((o.expr && o.expr(i, t)) || 'neutral'), look: o.look, bob: stood ? 8 + (i % 3) : 0, numSize: o.numSize ?? 34, num: dy < -220 ? false : undefined }), t, info, ctx.GY, undefined);
  });
};
const Q_effS = (w, s = 1.5) => s * 0.72 * ({ KID: 1.15, KID2: 1.15, KID3: 1.15, KID4: 1.15, KID5: 1.15, KID6: 1.15 }[w] ?? 1);
const foldChair = (g, x, GY, e, f) => G.foldChair(g, x, GY, e, f);

// коридор: пересчёт координат картинки hall.png (1536x1024, кроп 80..-80 на кадр) в экранные
export const hx = (ix) => -0.05 * W() + (ix / 1536) * 1.1 * W();
export const hy = (iy) => ((iy - 80) / 864) * 1.06 * H() - 0.03 * H();
// правая дверь коридора = дверь библиотеки: тёплый свет в стекле и на полу, вывеска над дверью
export const libraryDoorHall = (g) => { const x0 = hx(1245), x1 = hx(1352), y0 = hy(250), y1 = hy(385); g.save(); g.fillStyle = '#ffe48a'; g.fillRect(x0, y0, x1 - x0, y1 - y0); g.globalAlpha = 0.3; g.beginPath(); g.moveTo(hx(1215), hy(565)); g.lineTo(hx(1380), hy(565)); g.lineTo(hx(1480), hy(700)); g.lineTo(hx(1130), hy(700)); g.closePath(); g.fill(); g.restore(); const cx = (hx(1205) + hx(1390)) / 2, cy = hy(170); inkRect(g, cx - 110, cy - 28, 220, 56, { fill: '#2f5d8a', r: 8, w: 5 }); text(g, 'LIBRARY', cx, cy + 12, { size: 34, font: FONTS.title, weight: 400, color: '#fff' }); };
