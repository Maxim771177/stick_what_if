// gfx5.js ролика 10: листы с оценками, колокол IQ, машина Руба Голдберга (20 шагов), тетради, окно с отражением, складные стулья, диван, автобус, карта, точки-люди и мелочи.
import { E, S, C, D, ease, prog, clamp, lerp, text, measure, FONTS, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, SETS } from './lib.js';
import * as X from './gfx.js';
import * as Y from './gfx3.js';
const ink = () => S().ink;
const W = () => E.W, H = () => E.H;
const T = (g, s, x, y, o = {}) => text(g, s, x, y, { font: FONTS.title, weight: 400, color: ink(), ...o });

// ---- лист с огромной оценкой. o: {col, checks, rot, lines, label} ----
export function gradePaper(g, x, y, w, h, grade, o = {}) {
  g.save(); g.translate(x, y); g.rotate(o.rot || 0);
  inkRect(g, -w / 2, -h / 2, w, h, { fill: '#fffdf6', r: 6, w: 5 });
  const n = o.lines ?? 5;
  for (let i = 0; i < n; i++) inkLine(g, [[-w * 0.38, -h * 0.2 + i * h * 0.12], [-w * 0.38 + w * (0.3 + 0.12 * ((i * 37) % 5) / 5 * 2), -h * 0.2 + i * h * 0.12]], { w: 3, stroke: '#9aa3b5' });
  for (let i = 0; i < (o.checks || 0); i++) { const cx = w * 0.4, cy = -h * 0.2 + i * h * 0.12; inkLine(g, [[cx - 12, cy], [cx - 3, cy + 9], [cx + 14, cy - 12]], { w: 6, stroke: '#2fb344' }); }
  T(g, o.label || 'MATH TEST', 0, -h * 0.4, { size: h * 0.075, color: '#6b7388' });
  g.save(); g.translate(w * 0.14, h * 0.22); g.rotate(-0.12);
  T(g, grade, 0, 0, { size: h * 0.46, color: o.col || '#d8232a', stroke: 7, strokeColor: '#fffdf6' });
  g.restore(); g.restore();
}

// ---- колокол нормального распределения (низ по центру cx,cy), k = доля нарисованного, band = прозрачность полосы 85–115
export function bellCurve(g, cx, cy, w, h, k = 1, band = 1) {
  const sx = w / 7, pts = [];
  for (let i = 0; i <= 70; i++) { const z = -3.5 + (7 * i) / 70; pts.push([cx + z * sx, cy - h * Math.exp(-z * z / 2)]); }
  const n = Math.max(2, Math.floor(pts.length * clamp(k)));
  g.save(); g.beginPath(); g.moveTo(pts[0][0], cy); pts.slice(0, n).forEach((p) => g.lineTo(p[0], p[1])); g.lineTo(pts[n - 1][0], cy); g.closePath(); g.fillStyle = '#cfe6f5'; g.fill(); g.restore();
  if (band > 0 && k >= 0.99) { g.save(); g.beginPath(); const a = []; for (let i = 0; i <= 28; i++) { const z = -1 + (2 * i) / 28; a.push([cx + z * sx, cy - h * Math.exp(-z * z / 2)]); } g.moveTo(a[0][0], cy); a.forEach((p) => g.lineTo(p[0], p[1])); g.lineTo(a[a.length - 1][0], cy); g.closePath(); g.globalAlpha = band; g.fillStyle = '#42d98c'; g.fill(); g.restore(); }
  inkLine(g, pts.slice(0, n), { w: 7 }); inkLine(g, [[cx - w / 2 - 30, cy], [cx + w / 2 + 30, cy]], { w: 6 });
  [[-3, '55'], [-2, '70'], [-1, '85'], [0, '100'], [1, '115'], [2, '130'], [3, '145']].forEach(([z, l]) => T(g, l, cx + z * sx, cy + 50, { size: 42 }));
}

// ---- сетка маленьких людей: n точек в прямоугольнике, hi = индексы подсвеченных (цвет col) ----
export function dotsGrid(g, cx, cy, w, h, cols, rows, k = 1, hi = [], col = '#2fb344', o = {}) {
  const total = cols * rows, m = Math.floor(total * clamp(k)), dx = w / cols, dy = h / rows, r = Math.min(dx, dy) * 0.3;
  for (let i = 0; i < m; i++) {
    if (hi.includes(i)) continue;
    const x = cx - w / 2 + (i % cols + 0.5) * dx, y = cy - h / 2 + (Math.floor(i / cols) + 0.5) * dy;
    g.fillStyle = o.base || '#4a5470'; g.beginPath(); g.arc(x, y - r * 0.9, r * 0.85, 0, 7); g.fill(); g.fillRect(x - r * 0.9, y - r * 0.1, r * 1.8, r * 1.5);
  }
  for (const i of hi) if (i < m) {
    const x = cx - w / 2 + (i % cols + 0.5) * dx, y = cy - h / 2 + (Math.floor(i / cols) + 0.5) * dy, R = (o.hiR || r * 3.2);
    g.save(); g.shadowColor = col; g.shadowBlur = 16; g.fillStyle = col; g.beginPath(); g.arc(x, y - R * 0.5, R * 0.55, 0, 7); g.fill(); g.fillRect(x - R * 0.5, y, R, R * 0.9); g.restore();
  }
}

// ---- открытая зелёная тетрадь: колонки DATE | WRONG | RIGHT | WHY; hi = номер подсвеченной колонки (0..3), -1 нет ----
export function notebookOpen(g, cx, cy, w, h, hi = -1, o = {}) {
  g.save(); g.translate(cx, cy);
  inkRect(g, -w / 2 - 14, -h / 2 - 14, w + 28, h + 28, { fill: '#2f8f5a', r: 14, w: 6 });
  inkRect(g, -w / 2, -h / 2, w / 2 - 4, h, { fill: '#fffdf6', r: 6, w: 4 }); inkRect(g, 4, -h / 2, w / 2 - 4, h, { fill: '#fffdf6', r: 6, w: 4 });
  const cols = ['DATE', 'WRONG', 'RIGHT', 'WHY'], cw = w / 4;
  cols.forEach((c, i) => {
    const x = -w / 2 + cw * i + cw / 2;
    if (hi === i) { g.save(); g.globalAlpha = 0.35; g.fillStyle = '#ffd23a'; g.fillRect(x - cw / 2 + 6, -h / 2 + 8, cw - 12, h - 16); g.restore(); }
    T(g, c, x, -h / 2 + 46, { size: Math.min(46, w * 0.055), color: hi === i ? '#b54a00' : '#6b7388' });
    for (let r2 = 0; r2 < 6; r2++) inkLine(g, [[x - cw * 0.36, -h / 2 + 100 + r2 * (h - 130) / 6], [x + cw * (0.2 + 0.12 * ((r2 * 3 + i) % 3)), -h / 2 + 100 + r2 * (h - 130) / 6]], { w: 4, stroke: i === 1 ? '#d8232a' : i === 2 ? '#2fb344' : '#6b7388' });
  });
  inkLine(g, [[0, -h / 2], [0, h / 2]], { w: 5 });
  g.restore();
}

// ---- стопка индексных карточек (плашмя на столе: сплюснутые параллелограммы) ----
export function cardsStack(g, x, topY, n = 5, wd = 120) {
  for (let i = 0; i < n; i++) { const y = topY - i * 7, jx = ((i * 53) % 9) - 4; inkShape(g, [[x - wd / 2 + jx, y + 8], [x + wd / 2 - 10 + jx, y + 8], [x + wd / 2 + jx, y - 8], [x - wd / 2 + 12 + jx, y - 8]], { fill: '#fffdf6', w: 3 }); }
  inkLine(g, [[x - wd * 0.3, topY - n * 7 + 8], [x + wd * 0.25, topY - n * 7 + 8]], { w: 2, stroke: '#8896b0' });
}

// ---- штамп: рамка с текстом, наклон ----
export function stamp(g, x, y, str, col = '#d8232a', o = {}) {
  const k = o.k ?? 1; if (k <= 0.01) return;
  g.save(); g.translate(x, y); g.rotate(o.rot ?? -0.12); g.scale(k, k);
  const sz = o.size ?? 64, w = measure(g, str, sz) + 56, h = sz * 1.5;
  g.lineWidth = 9; g.strokeStyle = col; g.fillStyle = 'rgba(255,253,246,.88)'; g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, 14); g.fill(); g.stroke();
  T(g, str, 0, sz * 0.06, { size: sz, color: col });
  g.restore();
}

// ---- большое окно класса с отражением: reflect(g, cx, cy, h) рисует отражение внутри стекла ----
export function windowPane(g, x, y, w, h, reflect) {
  inkRect(g, x - w / 2 - 14, y - h / 2 - 14, w + 28, h + 28, { fill: '#8a6a3a', r: 8, w: 6 });
  g.save(); g.beginPath(); g.rect(x - w / 2, y - h / 2, w, h); g.clip();
  const gr = g.createLinearGradient(0, y - h / 2, 0, y + h / 2); gr.addColorStop(0, '#9ed4f5'); gr.addColorStop(1, '#d9f0ff'); g.fillStyle = gr; g.fillRect(x - w / 2, y - h / 2, w, h);
  D.cloud(g, x - w * 0.25, y - h * 0.22, 0.7); D.cloud(g, x + w * 0.28, y - h * 0.3, 0.55);
  if (reflect) reflect(g, x, y + h * 0.5, h);
  g.globalAlpha = 0.35; g.fillStyle = '#fff'; g.beginPath(); g.moveTo(x + w * 0.1, y - h / 2); g.lineTo(x + w * 0.3, y - h / 2); g.lineTo(x - w * 0.05, y + h / 2); g.lineTo(x - w * 0.25, y + h / 2); g.closePath(); g.fill(); g.restore();
  inkLine(g, [[x - w / 2, y + h * 0.36], [x + w / 2, y + h * 0.36]], { w: 7 });
}

// ---- диван (вид сбоку/спереди): сиденье, спинка, подлокотники ----
export function sofa(g, x, GY, w = 620, o = {}) {
  const col = o.col || '#8a5a3a', dk = '#6e4528', h = 150;
  inkRect(g, x - w / 2, GY - h - 80, w, 110, { fill: col, r: 22, w: 6 });
  inkRect(g, x - w / 2 - 28, GY - h - 20, 60, 130, { fill: dk, r: 20, w: 6 });
  inkRect(g, x + w / 2 - 32, GY - h - 20, 60, 130, { fill: dk, r: 20, w: 6 });
  inkRect(g, x - w / 2 + 28, GY - 100, w - 56, 70, { fill: col, r: 14, w: 6 });
  inkLine(g, [[x - w / 2 + 10, GY - 30], [x - w / 2 + 10, GY]], { w: 10 }); inkLine(g, [[x + w / 2 - 10, GY - 30], [x + w / 2 - 10, GY]], { w: 10 });
}

// ---- жёлтый школьный автобус сбоку (нос вправо). x,y = низ посередине; k масштаб ----
export function schoolBus(g, x, GY, k = 1, o = {}) {
  g.save(); g.translate(x, GY); g.scale(k, k);
  inkRect(g, -330, -250, 640, 190, { fill: '#f7c61c', r: 24, w: 7 });
  inkRect(g, 250, -190, 110, 130, { fill: '#f7c61c', r: 18, w: 7 });
  for (let i = 0; i < 5; i++) inkRect(g, -300 + i * 100, -226, 82, 70, { fill: '#cfe6f5', r: 8, w: 5 });
  inkRect(g, 262, -228, 80, 60, { fill: '#cfe6f5', r: 8, w: 5 });
  inkLine(g, [[-330, -122], [360, -122]], { w: 6, stroke: '#1b2230' });
  T(g, 'SCHOOL BUS', 30, -84, { size: 40, color: '#1b2230' });
  for (const wx of [-200, 220]) { inkCircle(g, wx, -50, 52, { fill: '#2b2f36', w: 7 }); inkCircle(g, wx, -50, 22, { fill: '#cfd4dc', w: 4 }); }
  inkRect(g, 340, -90, 26, 22, { fill: '#fff4b0', r: 6, w: 4 });
  g.restore();
}

// ---- бумажная карта: сложена гармошкой, полоски дорог и крестик; fold 0..1 (0 раскрыта) ----
export function mapSheet(g, x, y, w, h, o = {}) {
  g.save(); g.translate(x, y); g.rotate(o.rot || 0);
  const cols = 5, cw = w / cols;
  for (let i = 0; i < cols; i++) { const sk = ((i % 2) ? 1 : -1) * (o.crumple ?? 0.12); inkShape(g, [[-w / 2 + i * cw, -h / 2 + sk * h * 0.2], [-w / 2 + (i + 1) * cw, -h / 2 - sk * h * 0.2], [-w / 2 + (i + 1) * cw, h / 2 - sk * h * 0.2], [-w / 2 + i * cw, h / 2 + sk * h * 0.2]], { fill: i % 2 ? '#f3e8c0' : '#e8dcae', w: 4 }); }
  inkLine(g, [[-w * 0.4, h * 0.2], [-w * 0.1, -h * 0.1], [w * 0.15, h * 0.1], [w * 0.4, -h * 0.25]], { w: 6, stroke: '#d8232a' });
  inkLine(g, [[-w * 0.3, -h * 0.3], [w * 0.2, h * 0.3]], { w: 4, stroke: '#3d7ea6' });
  inkLine(g, [[w * 0.3, h * 0.05], [w * 0.38, h * 0.18]], { w: 8, stroke: '#d8232a' }); inkLine(g, [[w * 0.38, h * 0.05], [w * 0.3, h * 0.18]], { w: 8, stroke: '#d8232a' });
  g.restore();
}

// ---- игральная карта, падающая ----
export function playCard(g, x, y, rot, k = 1, red = false) { g.save(); g.translate(x, y); g.rotate(rot); inkRect(g, -22 * k, -32 * k, 44 * k, 64 * k, { fill: '#fffdf6', r: 5, w: 3 }); inkCircle(g, 0, 0, 9 * k, { fill: red ? '#d8232a' : '#2b2f36', w: 0 }); g.restore(); }

// ---- складной стул профилем (лицом вправо при f=1): сиденье под бёдрами, X-ножки, спинка. e = эффективный масштаб сидящего ----
export function foldChair(g, x, GY, e, f = 1) {
  const sy = GY - 66 * e, w = 52 * e, col = '#6e7a8a';
  inkLine(g, [[x - f * w * 0.5, sy], [x + f * w * 0.45, GY]], { w: 6, stroke: col }); inkLine(g, [[x + f * w * 0.5, sy], [x - f * w * 0.45, GY]], { w: 6, stroke: col });
  inkRect(g, x - w * 0.62, sy - 8, w * 1.24, 12, { fill: '#9aa6b5', r: 4, w: 4 });
  inkLine(g, [[x - f * w * 0.58, sy - 4], [x - f * w * 0.62, sy - 78 * e]], { w: 7, stroke: col });
  inkRect(g, x - f * w * 0.62 - 6 * e, sy - 86 * e, 12 * e, 46 * e, { fill: '#9aa6b5', r: 4, w: 3 });
}

// ---- дверь спортзала (двустворчатая) в стене; open 0..1; свет и силуэт ----
export function gymDoor(g, x, GY, open = 0, o = {}) {
  const w = o.w ?? 190, h = o.h ?? 400;
  inkRect(g, x - w / 2 - 10, GY - h - 10, w + 20, h + 10, { fill: '#6b4a2a', r: 6, w: 6 });
  if (open > 0.02) { g.save(); const gr = g.createLinearGradient(0, GY - h, 0, GY); gr.addColorStop(0, '#fff6c8'); gr.addColorStop(1, '#ffe48a'); g.fillStyle = gr; g.fillRect(x - w / 2, GY - h, w, h); g.restore(); if (o.person) o.person(g, x, GY); }
  const dw = w / 2 * (1 - open * 0.92);
  inkRect(g, x - w / 2, GY - h, dw, h, { fill: '#c98b4a', r: 4, w: 5 }); inkRect(g, x + w / 2 - dw, GY - h, dw, h, { fill: '#c98b4a', r: 4, w: 5 });
  inkRect(g, x - w / 2 + 14, GY - h + 40, Math.max(0, dw - 28), 80, { fill: '#cfe6f5', r: 4, w: 4 }); inkRect(g, x + w / 2 - dw + 14, GY - h + 40, Math.max(0, dw - 28), 80, { fill: '#cfe6f5', r: 4, w: 4 });
  inkCircle(g, x - 14, GY - h * 0.45, 6, { fill: '#f6b93b', w: 3 }); inkCircle(g, x + 14, GY - h * 0.45, 6, { fill: '#f6b93b', w: 3 });
}

// ---- линии сквозняка: от (x0,y) вправо к x1, бегут со временем ----
export function draftLines(g, t, x0, x1, y, n = 5, o = {}) {
  g.save(); g.lineCap = 'round';
  for (let i = 0; i < n; i++) {
    const yy = y + (i - (n - 1) / 2) * 38, ph = ((t * 0.7 + i * 0.23) % 1), len = 240, xa = lerp(x0, x1, ph) - len / 2, a = Math.sin(ph * Math.PI);
    g.globalAlpha = 0.85 * a; g.strokeStyle = o.col || '#8fd0ff'; g.lineWidth = 8;
    g.beginPath(); g.moveTo(xa, yy); g.bezierCurveTo(xa + len * 0.3, yy - 18, xa + len * 0.6, yy + 18, xa + len, yy); g.stroke();
  }
  g.restore();
}

// ================= машина Руба Голдберга: 20 шагов слева направо (порядок один на весь ролик) =================
// cell i = 0..19; st: {lit (сколько шагов загорелось, 0..20), fail (1-based номер сломанного), t, sail ('wrong'|'ok'), coin (монета лежит на горке), marble (доля 0..1 пути по горке), pop (0..1), numbers: показывать номера}
export const STEPS = ['domino', 'domino', 'domino', 'train', 'train', 'mousetrap', 'bucket', 'bucket', 'fan', 'fan', 'lever', 'sail', 'ramp', 'cup', 'cup', 'chute', 'chute', 'domino', 'domino', 'balloon'];
export function machine(g, x0, yb, w, st = {}) {
  const cw = w / 20, lit = st.lit ?? 0, t = st.t ?? 0, k = cw / 78;
  inkRect(g, x0 - 8, yb, w + 16, 16 * Math.max(0.7, k), { fill: '#a87636', r: 5, w: 5 });
  const on = (i) => lit > i;
  for (let i = 0; i < 20; i++) {
    const cx = x0 + (i + 0.5) * cw, kind = STEPS[i];
    if (on(i)) { g.save(); g.globalAlpha = 0.3; g.fillStyle = '#42ff8c'; g.fillRect(x0 + i * cw + 2, yb - 16 * k, cw - 4, 16 * k); g.restore(); }
    if (st.fail === i + 1) { g.save(); g.globalAlpha = 0.45; g.fillStyle = '#e5383b'; g.fillRect(x0 + i * cw + 2, yb - 16 * k, cw - 4, 16 * k); g.restore(); }
    g.save(); g.translate(cx, yb);
    const s = k;
    if (kind === 'domino') { const fall = on(i) ? 1 : 0; g.save(); g.translate(cw * 0.3, 0); g.rotate(fall * 1.1); inkRect(g, -9 * s, -60 * s, 18 * s, 60 * s, { fill: '#fffdf6', r: 3, w: 3 }); inkCircle(g, 0, -42 * s, 4 * s, { fill: ink(), w: 0 }); inkCircle(g, 0, -22 * s, 4 * s, { fill: ink(), w: 0 }); g.restore(); }
    else if (kind === 'train') { const sl = on(i) ? (i === 3 ? 0.35 : 0.1) * cw : -cw * 0.25; g.save(); g.translate(sl, 0); inkRect(g, -30 * s, -34 * s, 56 * s, 26 * s, { fill: '#d8232a', r: 5, w: 4 }); inkRect(g, 8 * s, -52 * s, 20 * s, 18 * s, { fill: '#2f5d8a', r: 3, w: 3 }); inkCircle(g, -16 * s, -8 * s, 9 * s, { fill: '#2b2f36', w: 3 }); inkCircle(g, 14 * s, -8 * s, 9 * s, { fill: '#2b2f36', w: 3 }); g.restore(); inkLine(g, [[-cw / 2, -2], [cw / 2, -2]], { w: 3 }); }
    else if (kind === 'mousetrap') { inkRect(g, -34 * s, -14 * s, 68 * s, 14 * s, { fill: '#c98b4a', r: 3, w: 4 }); const snap = on(i); inkLine(g, [[-26 * s, -14 * s], snap ? [26 * s, -16 * s] : [-26 * s, -52 * s]], { w: 5 * s + 2 }); inkCircle(g, 26 * s, -14 * s, 5 * s, { fill: '#f6b93b', w: 2 }); }
    else if (kind === 'bucket') { const tilt = on(i) ? 0.9 : 0; g.save(); g.translate(0, -70 * s); g.rotate(tilt); inkShape(g, [[-26 * s, -22 * s], [26 * s, -22 * s], [20 * s, 24 * s], [-20 * s, 24 * s]], { fill: '#5a7fb0', w: 4 }); g.restore(); inkLine(g, [[-34 * s, -94 * s], [34 * s, -94 * s]], { w: 4 }); inkLine(g, [[0, -94 * s], [0, 0]], { w: 3 }); }
    else if (kind === 'fan') { inkRect(g, -6 * s, -46 * s, 12 * s, 46 * s, { fill: '#8a8f98', r: 2, w: 3 }); g.save(); g.translate(0, -62 * s); g.rotate(on(i) ? t * 14 : 0.3); for (let b = 0; b < 3; b++) { g.rotate((Math.PI * 2) / 3); inkEllipse(g, 0, -20 * s, 9 * s, 22 * s, { fill: '#9fd8ff', w: 3 }); } inkCircle(g, 0, 0, 6 * s, { fill: '#fff', w: 3 }); g.restore(); }
    else if (kind === 'lever') { const tilt = on(i) ? -0.28 : 0.28; g.save(); g.translate(0, -22 * s); g.rotate(tilt); inkRect(g, -38 * s, -6 * s, 76 * s, 12 * s, { fill: '#c98b4a', r: 3, w: 4 }); g.restore(); inkShape(g, [[0, -24 * s], [-14 * s, 0], [14 * s, 0]], { fill: '#8a8f98', w: 3 }); }
    else if (kind === 'sail') { const wrong = st.sail === 'wrong'; g.save(); if (wrong) g.rotate(-0.5 + Math.sin(t * 5) * 0.06); else if (st.sail === 'ok') g.rotate(0.12); inkRect(g, -26 * s, -18 * s, 52 * s, 12 * s, { fill: '#c98b4a', r: 3, w: 3 }); inkCircle(g, -14 * s, -8 * s, 7 * s, { fill: '#2b2f36', w: 3 }); inkCircle(g, 14 * s, -8 * s, 7 * s, { fill: '#2b2f36', w: 3 }); inkLine(g, [[0, -18 * s], [0, -78 * s]], { w: 4 }); inkShape(g, [[0, -76 * s], [0, -26 * s], [(wrong ? -34 : 34) * s, -34 * s]], { fill: '#fffdf6', w: 3 }); g.restore(); if (wrong) { g.save(); g.strokeStyle = '#e5383b'; g.lineWidth = 7; g.beginPath(); g.moveTo(8 * s, -96 * s); g.lineTo(-34 * s, -96 * s); g.stroke(); g.beginPath(); g.moveTo(-34 * s, -96 * s); g.lineTo(-22 * s, -106 * s); g.lineTo(-22 * s, -86 * s); g.closePath(); g.fillStyle = '#e5383b'; g.fill(); g.restore(); } }
    else if (kind === 'ramp') { inkShape(g, [[-cw * 0.46, -78 * s], [cw * 0.46, -6 * s], [-cw * 0.46, -6 * s]], { fill: '#d8a86a', w: 4 }); if (st.coin) { g.save(); g.translate(-cw * 0.02, -44 * s); g.rotate(0.62); X.coin(g, 0, -10 * s, 15 * s); g.restore(); } if (st.marble != null) { const u = clamp(st.marble); const mx = lerp(-cw * 0.42, cw * 0.4, u), my = lerp(-92 * s, -16 * s, u); inkCircle(g, mx, my, 9 * s, { fill: '#3d7ea6', w: 3 }); } }
    else if (kind === 'cup') { const tl = on(i) ? 0.8 : 0; g.save(); g.translate(0, -30 * s); g.rotate(tl); inkShape(g, [[-18 * s, -26 * s], [18 * s, -26 * s], [13 * s, 14 * s], [-13 * s, 14 * s]], { fill: '#f29ac0', w: 3 }); g.restore(); }
    else if (kind === 'chute') { inkShape(g, [[-cw * 0.5, -62 * s], [cw * 0.5, -26 * s], [cw * 0.5, -14 * s], [-cw * 0.5, -50 * s]], { fill: '#9aa6b5', w: 3 }); }
    else if (kind === 'balloon') { const pop = st.pop ?? 0; inkLine(g, [[-4 * s, 0], [-4 * s, -34 * s]], { w: 4 }); inkShape(g, [[-9 * s, -34 * s], [3 * s, -34 * s], [-3 * s, -52 * s]], { fill: '#8a8f98', w: 3 }); if (pop <= 0.02) { inkCircle(g, 4 * s, -96 * s, 30 * s, { fill: '#e5383b', w: 4 }); inkLine(g, [[4 * s, -66 * s], [-2 * s, -56 * s]], { w: 2 }); } else { X.sparks(g, st.t ?? 0, 4 * s, -96 * s, 70 * s * pop, 10); inkShape(g, [[-40 * s, -110 * s], [0, -150 * s], [40 * s, -110 * s], [20 * s, -70 * s], [-20 * s, -70 * s]], { fill: 'rgba(229,56,59,.35)', w: 3 }); } }
    g.restore();
    if (st.numbers !== false) T(g, String(i + 1), cx, yb + 40 * Math.max(0.8, k), { size: Math.max(20, 30 * k), color: st.fail === i + 1 ? '#e5383b' : on(i) ? '#1d8a4a' : '#6b7388' });
  }
  if (st.fail) T(g, '✗', x0 + (st.fail - 0.5) * cw, yb - 130 * k, { size: 66 * Math.max(0.8, k), color: '#e5383b', stroke: 7, strokeColor: '#fff' });
}

// ---- лестница с пропущенными ступенями: gaps = индексы пропусков ----
export function stairsGaps(g, x, GY, w, gaps = [1, 3], n = 7) {
  const sw = w / n;
  for (let i = 0; i < n; i++) { if (gaps.includes(i)) { g.save(); g.globalAlpha = 0.35; inkRect(g, x + i * sw, GY - 40 - i * 40, sw + 2, 40 + i * 40, { fill: '#c0b49a', r: 0, w: 3 }); g.restore(); continue; } inkRect(g, x + i * sw, GY - 40 - i * 40, sw + 2, 40 + i * 40, { fill: i % 2 ? '#9a7a56' : '#b08a62', r: 0, w: 4 }); }
}

// ---- столбчатая диаграмма из двух столбцов: values 0..1, labels ----
export function barPair(g, cx, GY, hMax, bars, k = 1) {
  const bw = 230, gap = 130; bars.forEach((b, i) => { const x = cx + (i - (bars.length - 1) / 2) * (bw + gap), h = hMax * b.v * ease.outBack(clamp(k)); inkRect(g, x - bw / 2, GY - h, bw, h, { fill: b.col, r: 12, w: 7 }); T(g, b.lab, x, GY + 60, { size: 46 }); if (b.top) T(g, b.top, x, GY - h - 26, { size: 70, color: b.col, stroke: 8, strokeColor: '#fff' }); });
  inkLine(g, [[cx - 400, GY], [cx + 400, GY]], { w: 7 });
}

// ---- медаль ----
export function medal(g, x, y, r = 54, o = {}) { inkLine(g, [[x - r * 0.5, y - r * 1.6], [x, y - r * 0.5]], { w: 12, stroke: '#2f5d8a' }); inkLine(g, [[x + r * 0.5, y - r * 1.6], [x, y - r * 0.5]], { w: 12, stroke: '#d8232a' }); g.save(); g.shadowColor = '#ffd23a'; g.shadowBlur = o.glow ?? 14; inkCircle(g, x, y, r, { fill: '#f6c53b', w: 6 }); g.restore(); inkCircle(g, x, y, r * 0.66, { fill: '#ffe07a', w: 3 }); T(g, o.mark || '★', x, y + r * 0.12, { size: r * 0.8, color: '#b87a00' }); }

// ---- портрет-стикмен для научных врезок: круг-голова, имя ----
export function portrait(g, x, y, name, o = {}) { inkRect(g, x - 130, y - 150, 260, 300, { fill: '#fffdf6', r: 14, w: 7 }); inkCircle(g, x, y - 50, 52, { fill: '#f1c9a0', w: 6 }); inkLine(g, [[x, y + 2], [x, y + 70]], { w: 7 }); inkLine(g, [[x - 40, y + 30], [x + 40, y + 30]], { w: 7 }); inkCircle(g, x - 17, y - 56, 5, { fill: ink(), w: 0 }); inkCircle(g, x + 17, y - 56, 5, { fill: ink(), w: 0 }); inkLine(g, [[x - 16, y - 28], [x + 16, y - 28]], { w: 4 }); T(g, name, x, y + 118, { size: o.size ?? 30 }); }

// ---- библиотека (код-фон, пока нет картинки OpenAI): стеллажи с книгами, окно, пол ----
SETS.library = (g) => {
  const GY = E.H * 0.84; D.plain(g, '#e8d9bd'); g.fillStyle = '#c9a56a'; g.fillRect(-E.W, GY, E.W * 3, E.H);
  inkLine(g, [[-E.W, GY], [E.W * 2, GY]], { w: 6, step: 40 });
  const cols = ['#d8232a', '#3d7ea6', '#2fb344', '#f6b93b', '#8a6ab0', '#e4872b', '#17a2b8', '#c0504d'];
  [[0.06, 0.16], [0.58, 0.16], [0.80, 0.16]].forEach(([fx, fw], si) => { const x = E.W * fx, w = E.W * 0.17; inkRect(g, x, E.H * 0.12, w, GY - E.H * 0.12, { fill: '#8a5a2e', r: 6, w: 6 });
    for (let r = 0; r < 5; r++) { const y = E.H * 0.14 + r * ((GY - E.H * 0.2) / 5); inkLine(g, [[x + 6, y + 120], [x + w - 6, y + 120]], { w: 5 });
      let bx = x + 12; for (let b = 0; b < 9; b++) { const bw2 = 20 + ((b * 7 + r * 3 + si) % 4) * 6, bh = 80 + ((b * 5 + r) % 3) * 12; inkRect(g, bx, y + 120 - bh, bw2, bh, { fill: cols[(b + r + si) % 8], r: 3, w: 3 }); bx += bw2 + 2; if (bx > x + w - 30) break; } } });
  inkRect(g, E.W * 0.34, E.H * 0.16, E.W * 0.2, E.H * 0.34, { fill: '#cfe6f5', r: 8, w: 7 }); inkLine(g, [[E.W * 0.44, E.H * 0.16], [E.W * 0.44, E.H * 0.5]], { w: 6 });
  return { GY };
};

// ---- газетная вырезка: заголовок, подзаголовок, ряд маленьких детей ----
export function newsClip(g, x, y, w, h, head = 'GENIUS STUDY', sub = 'THE DAILY TIMES') {
  inkRect(g, x - w / 2, y - h / 2, w, h, { fill: '#f1ead9', r: 4, w: 6 });
  T(g, sub, x, y - h / 2 + h * 0.09, { size: h * 0.08, color: '#2b2420' });
  inkLine(g, [[x - w * 0.44, y - h * 0.34], [x + w * 0.44, y - h * 0.34]], { w: 4 });
  T(g, head, x, y - h * 0.18, { size: h * 0.15, color: '#b01e24' });
  for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) { const px = x - w * 0.36 + i * (w * 0.09), py = y + h * 0.06 + r * h * 0.15; inkCircle(g, px, py, h * 0.03, { fill: '#f1c9a0', w: 3 }); inkLine(g, [[px, py + h * 0.03], [px, py + h * 0.08]], { w: 3 }); }
  for (let i = 0; i < 3; i++) inkLine(g, [[x - w * 0.42, y + h * 0.33 + i * 14], [x + w * 0.4 - i * 60, y + h * 0.33 + i * 14]], { w: 3, stroke: '#9aa3b5' });
}
