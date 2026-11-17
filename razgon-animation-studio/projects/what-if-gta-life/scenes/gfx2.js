// gfx2.js ролика 07 (GTA-жизнь): HUD, транспорт, парк аттракционов. Всё кодом (ink-стиль).
import { E, S, C, D, ease, prog, clamp, lerp, text, measure, FONTS, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, gtaText, gtaMeasure, isMoney } from './lib.js';
const INK = () => S().ink;
const P = (pts, x, y, w, f = 1) => pts.map(([a, b]) => [x + f * a * w, y + b * w]);
// ---------- HUD ----------
export function ring(g, x, y, rx, t, col = '#ffd23a') { // жёлтый круг на полу (овал в перспективе)
  const ry = rx * 0.26, pu = 0.5 + 0.5 * Math.sin(t * 3);
  g.save(); g.globalAlpha = 0.28 + 0.18 * pu; g.fillStyle = col; g.beginPath(); g.ellipse(x, y, rx * (1.1 + 0.05 * pu), ry * (1.1 + 0.05 * pu), 0, 0, 7); g.fill(); g.globalAlpha = 1;
  g.strokeStyle = '#fff6c4'; g.lineWidth = 12; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.stroke(); g.strokeStyle = col; g.lineWidth = 6; g.stroke();
  g.globalAlpha = 0.5 * (1 - pu); g.strokeStyle = col; g.lineWidth = 5; g.beginPath(); g.ellipse(x, y - 4 - 40 * pu, rx * 0.9, ry * 0.9, 0, 0, 7); g.stroke(); g.restore(); }
export function label(g, x, y, lines, a = 1, size = 54, o = {}) { // подпись в воздухе в стиле GTA: тёмная панель, жирный курсив с чёрным контуром
  if (a <= 0.01) return; g.save(); g.globalAlpha = a; const col = o.col || '#ffffff', sizes = lines.map((l, i) => (i === 0 ? size * 1.0 : size * 0.9));
  const ws = lines.map((l, i) => gtaMeasure(g, l, sizes[i])), w = Math.max(...ws) + size * 0.9, h = sizes.reduce((q, z) => q + z * 1.05, 0) + size * 0.5;
  g.fillStyle = 'rgba(8,10,18,.6)'; g.beginPath(); g.roundRect(x - w / 2, y - sizes[0] * 0.75, w, h, size * 0.22); g.fill(); g.fillStyle = '#ffd23a'; g.fillRect(x - w / 2, y - sizes[0] * 0.75, size * 0.14, h);
  let yy = y; lines.forEach((l, i) => { gtaText(g, l, x + size * 0.05, yy, { size: sizes[i], col: i === lines.length - 1 && o.last ? o.last : (isMoney(l) ? '#6fe28a' : col), sw: 0.13, shadow: false }); yy += sizes[i] * 1.05; });
  g.restore(); }
export function plusPop(g, x, y, str, t, t0, col = '#6fe28a') { const u = prog(t, t0, t0 + 1.8); if (u <= 0 || u >= 1) return; const a = u < 0.15 ? u / 0.15 : 1 - Math.pow((u - 0.15) / 0.85, 2); g.save(); g.globalAlpha = clamp(a); const yy = y - 120 * ease.out(u), w = gtaMeasure(g, str, 96) + 50; g.fillStyle = 'rgba(8,10,18,.6)'; g.beginPath(); g.roundRect(x - w / 2, yy - 62, w, 124, 30); g.fill(); gtaText(g, str, x, yy, { size: 96, col, sw: 0.14, shadow: false }); g.restore(); }
export function hudStars(g, n, t, o = {}) { // звёзды в правом верхнем углу
  const x0 = E.W - 62, y0 = o.y ?? 140, sz = 26; g.save();
  for (let i = 0; i < 5; i++) { const on = i < n, x = x0 - i * 66; let k = 1, col = on ? '#ffd23a' : 'rgba(255,255,255,.34)';
    if (on && i === n - 1) k = 1 + 0.3 * Math.max(0, 1 - ((t - (o.t0 ?? 0)) * 2.5)) * (t > (o.t0 ?? 0) ? 1 : 0);
    if (on && o.pulse && i === n - 1) col = Math.sin(t * 9) > 0 ? '#ff5a4a' : '#ffd23a';
    if (on && o.blink && Math.sin(t * 14) > 0) col = 'rgba(255,255,255,.2)';
    g.save(); g.translate(x, y0); g.scale(k, k); g.fillStyle = col; g.strokeStyle = '#10182a'; g.lineWidth = 6; g.lineJoin = 'round'; g.beginPath(); for (let j = 0; j < 10; j++) { const a = -Math.PI / 2 + j * Math.PI / 5, r = j % 2 ? sz * 0.45 : sz; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); } g.closePath(); g.stroke(); g.fill(); g.restore(); }
  g.restore(); }
export function minimap(g, x, y, r, t, o = {}) { // круглая мини-карта; o.zoom 1..0.25 масштаб; o.marks [[dx,dy,col]]
  const z = o.zoom ?? 1; g.save(); g.translate(x, y); g.beginPath(); g.arc(0, 0, r, 0, 7); g.clip(); g.fillStyle = '#d7e6cf'; g.fillRect(-r, -r, 2 * r, 2 * r);
  g.save(); g.scale(z, z); g.strokeStyle = '#fff'; g.lineWidth = 16; for (let i = -4; i <= 4; i++) { g.beginPath(); g.moveTo(i * r * 0.5, -r * 3); g.lineTo(i * r * 0.5, r * 3); g.stroke(); g.beginPath(); g.moveTo(-r * 3, i * r * 0.5); g.lineTo(r * 3, i * r * 0.5); g.stroke(); }
  g.fillStyle = '#9ec4e8'; g.beginPath(); g.ellipse(r * 1.1, -r * 0.5, r * 0.5, r * 0.3, 0.3, 0, 7); g.fill();
  g.fillStyle = '#b9c9a8'; for (let i = 0; i < 18; i++) g.fillRect(((i * 37) % 11 - 5) * r * 0.22, ((i * 53) % 9 - 4) * r * 0.24, r * 0.12, r * 0.12);
  g.restore();
  for (const [dx, dy, col, big] of (o.marks || [])) { const a = 0.6 + 0.4 * Math.sin(t * 6 + dx); const px = dx * r * z, py = dy * r * z; if (Math.hypot(px, py) < r * 0.92) { g.fillStyle = col; g.strokeStyle = '#10182a'; g.lineWidth = 4; g.beginPath(); g.arc(px, py, (big ? 15 : 11) * (0.85 + 0.2 * a), 0, 7); g.fill(); g.stroke(); } }
  g.fillStyle = '#e5383b'; g.strokeStyle = '#10182a'; g.lineWidth = 4; g.beginPath(); g.moveTo(0, -16); g.lineTo(12, 12); g.lineTo(0, 6); g.lineTo(-12, 12); g.closePath(); g.fill(); g.stroke();
  g.restore(); g.save(); g.strokeStyle = '#10182a'; g.lineWidth = 10; g.beginPath(); g.arc(x, y, r, 0, 7); g.stroke(); g.strokeStyle = '#fff'; g.lineWidth = 4; g.stroke(); g.restore(); }
export function hpBar(g, x, y, w, pct, o = {}) { // полоска здоровья (x,y = центр), o.armor 0..1
  const h = 26, col = pct > 0.5 ? '#42d96b' : pct > 0.2 ? '#ffb02e' : '#ff4a3d';
  g.save(); g.translate(x - w / 2, y - h / 2);
  inkRect(g, 0, 0, w, h, { fill: '#2a2f3d', r: 10, w: 5 }); if (pct > 0.005) inkRect(g, 4, 4, (w - 8) * clamp(pct), h - 8, { fill: col, r: 6, w: 0, stroke: false });
  if (o.armor != null) { inkRect(g, 0, -h * 0.9, w, h * 0.7, { fill: '#2a2f3d', r: 8, w: 4 }); inkRect(g, 3, -h * 0.9 + 3, (w - 6) * clamp(o.armor), h * 0.7 - 6, { fill: '#4aa8ff', r: 5, w: 0, stroke: false }); }
  if (o.label !== false) text(g, Math.round(pct * 100) + '%', w + 52, h * 0.75, { size: 34, font: FONTS.title, weight: 400, color: '#fff', stroke: 6, strokeColor: '#10182a' });
  g.restore(); }

// ---------- сквозной GTA-HUD (ролик 07): деньги, звёзды, радар со здоровьем и бронёй, задача ----------
const MONEY = [[1, 0, 0], [7, 20000, 1.0], [28, 70000, 2.4], [29, 190000, 2.4], [30, 490000, 2.4], [31, 1090000, 2.4], [40, 1080000, 2.0], [79, 1062000, 2.0]];
export function moneyAt(n, t) { let prev = 0, val = 0; for (const [sn, v, d] of MONEY) { if (n > sn) { prev = v; val = v; } else if (n === sn) return Math.round(lerp(prev, v, ease.out(prog(t, d, d + 1.3)))); else break; } return val; }
const OBJ = [[1, 'Get to class'], [2, 'Step into the marker'], [3, 'Pass the math test'], [8, 'Check your bank app'], [10, 'Act normal'], [14, 'Learn the rules'], [23, 'Stay on the map'], [26, 'Earn $1,000,000'], [28, 'Mow the lawn'], [29, 'Deliver the package'], [30, 'Wash the yacht'], [31, 'Walk the dog'], [33, 'Check your balance'], [36, 'Treat the family'], [41, 'Open the garage'], [44, 'Drive the hypercar'], [49, 'Park at school'], [56, 'Lose the cops'], [60, 'Hide in the car wash'], [63, 'Stay low'], [69, 'Go to the roof'], [71, 'Take the jump'], [75, 'Recover'], [79, 'Pay the hospital bill'], [81, 'Enjoy the fame'], [85, 'Find Biscuit'], [89, 'Rescue Biscuit'], [95, 'Take off'], [97, 'Reach the amusement park'], [98, 'Save Biscuit'], [101, 'Catch the rival'], [103, 'Try again'], [107, 'Reach the Ferris wheel'], [109, 'Grab the ladder'], [113, 'Mission complete'], [115, 'Fly home'], [121, 'Zoom out'], [123, 'Subscribe']];
const objAt = (n) => { let r = ''; for (const [sn, q] of OBJ) if (n >= sn) r = q; return r; };
export function gtaHud(g, t, info, o = {}) {
  const n = +info.shot.id.slice(1); g.save();
  const m = moneyAt(n, t); gtaText(g, '$' + m.toLocaleString('en-US'), E.W - 52, 62, { size: 62, align: 'right', col: '#6fe28a', sw: 0.2, skew: -0.12 });
  hudStars(g, o.stars ? o.stars.n : 0, t, o.stars || {});
  if (!o.nomini) {
    const mx = 150, my = E.H - 150, r = 96, hp = clamp(o.hp ?? 1), ar = clamp(o.armor ?? (n >= 95 ? 1 : 0)), a0 = Math.PI * 0.56, a1 = Math.PI * 1.44;
    const arc = (rr, col, v) => { g.lineCap = 'round'; g.strokeStyle = '#0a0c12'; g.lineWidth = 17; g.beginPath(); g.arc(mx, my, rr, a0, a1); g.stroke(); if (v > 0.01) { g.strokeStyle = col; g.lineWidth = 10; g.beginPath(); g.arc(mx, my, rr, a1 - (a1 - a0) * v, a1); g.stroke(); } };
    arc(r + 20, hp > 0.5 ? '#4ee36a' : hp > 0.2 ? '#ffb02e' : '#ff4a3d', hp); if (ar > 0.01) arc(r + 38, '#4aa8ff', ar);
    const mm = o.mini === true || !o.mini ? {} : o.mini; minimap(g, mx, my, r, t, { marks: [[0.5, -0.4, '#ffd23a'], [-0.6, 0.2, '#ffd23a'], [0.2, 0.6, '#ffd23a']], ...mm });
    gtaText(g, 'N', mx, my - r + 20, { size: 22, col: '#fff', sw: 0.2, shadow: false, skew: 0 });
  }
  const ob = o.obj ?? objAt(n); if (ob) { const k = ease.out(prog(t, 0.2, 0.7)); g.globalAlpha = k; const w = gtaMeasure(g, 'OBJECTIVE', 26) + 36, x0 = 330, y0 = E.H - 74; g.fillStyle = '#ffd23a'; g.beginPath(); g.roundRect(x0, y0 - 22, w, 42, 8); g.fill(); gtaText(g, 'OBJECTIVE', x0 + 18, y0 - 1, { size: 26, align: 'left', col: '#10182a', sw: 0.0001, shadow: false, skew: -0.1 }); gtaText(g, ob, x0 + w + 16, y0 - 1, { size: 44, align: 'left', sw: 0.16 }); }
  if (n <= 2) { const T = t + (n === 2 ? 5.7 : 0), k = ease.out(prog(T, 0.15, 0.7)) * (1 - ease.out(prog(T, 4.6, 5.2))); if (k > 0.01) { g.save(); g.translate(-620 * (1 - k), E.H - 214); g.fillStyle = 'rgba(8,10,18,.88)'; g.beginPath(); g.roundRect(330, 0, 520, 88, 12); g.fill(); g.fillStyle = '#ffd23a'; g.fillRect(330, 0, 16, 88); gtaText(g, 'GTA 6 MODE: ON', 362, 28, { size: 40, align: 'left', col: '#ffd23a', sw: 0.1, shadow: false, skew: -0.12 }); gtaText(g, 'Every task is a mission', 362, 66, { size: 26, align: 'left', col: '#fff', sw: 0.1, shadow: false, skew: -0.1 }); g.restore(); } }
  g.restore();
}
export function wasted(g, t, t0, o = {}) { const u = ease.out(prog(t, t0, t0 + 0.5)) * (o.end != null ? 1 - ease.out(prog(t, o.end, o.end + 0.4)) : 1); if (u <= 0.01) return; g.save(); g.fillStyle = `rgba(20,20,24,${0.6 * u})`; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); const k = 1.5 - 0.5 * u; g.translate(E.W / 2, E.H * 0.26); g.scale(k, k); g.globalAlpha = u; gtaText(g, 'WASTED', 0, 0, { size: 260, col: '#e0262c', sw: 0.12, skew: -0.05 }); g.restore(); }
export function passed(g, t, t0, lines = ['MISSION PASSED', 'RESPECT +1']) { const u = ease.outBack(prog(t, t0, t0 + 0.6)); if (u <= 0.01) return; g.save(); g.translate(E.W / 2, E.H * 0.2); g.scale(u, u); gtaText(g, lines[0] + '!', 0, 0, { size: 150, col: '#f2d27a', sw: 0.12, skew: -0.08 }); gtaText(g, lines[1], 0, 125, { size: 84, col: '#ffffff', sw: 0.14, skew: -0.08 }); g.restore(); }
// ---------- транспорт ----------
export function hypercar(g, x, gy, w, o = {}) { // вид сбоку, нос вправо при f=1; открытая кабина: водитель (рисуется до машины) виден по грудь
  const f = o.f ?? 1, T = (pts) => P(pts, x, gy, w, f), col = o.col || '#2c2d33';
  const body = T([[0.5, -0.1], [0.49, -0.17], [0.34, -0.2], [0.2, -0.215], [0.14, -0.2], [0.11, -0.185], [-0.1, -0.185], [-0.14, -0.235], [-0.3, -0.25], [-0.5, -0.22], [-0.5, -0.08], [-0.42, -0.06], [0.42, -0.06]]);
  inkShape(g, body, { fill: col, w: 6 });
  inkLine(g, T([[-0.44, -0.12], [0.46, -0.12]]), { w: 4, stroke: '#4a4c55' });
  inkLine(g, T([[0.05, -0.185], [0.05, -0.1]]), { w: 3, stroke: '#17171b' });
  inkShape(g, T([[0.5, -0.15], [0.44, -0.165], [0.44, -0.13], [0.5, -0.125]]), { fill: '#ffe66b', w: 3 });
  inkShape(g, T([[-0.5, -0.19], [-0.46, -0.2], [-0.46, -0.17], [-0.5, -0.16]]), { fill: '#e5383b', w: 3 });
  g.save(); g.fillStyle = 'rgba(160,210,240,.30)'; g.strokeStyle = INK(); g.lineWidth = 5; g.lineJoin = 'round'; const ws = T([[0.14, -0.2], [0.075, -0.285], [0.105, -0.285], [0.185, -0.212]]); g.beginPath(); ws.forEach(([a, b], i) => i ? g.lineTo(a, b) : g.moveTo(a, b)); g.closePath(); g.fill(); g.stroke(); g.restore();
  for (const a of [0.29, -0.3]) { const cx = x + f * a * w, cy = gy - w * 0.075; inkCircle(g, cx, cy, w * 0.082, { fill: '#17171b', w: 5 }); inkCircle(g, cx, cy, w * 0.04, { fill: '#9aa0aa', w: 3 }); }
  if (o.bow) { const bx = x + f * -0.2 * w, by = gy - w * 0.255; inkShape(g, [[bx, by], [bx - 46, by - 30], [bx - 46, by + 4]], { fill: '#e5383b', w: 4 }); inkShape(g, [[bx, by], [bx + 46, by - 30], [bx + 46, by + 4]], { fill: '#e5383b', w: 4 }); inkCircle(g, bx, by - 6, 11, { fill: '#b01e26', w: 4 }); }
  return { hx: x + f * -0.02 * w, feetY: gy - w * 0.045 }; }
export function policeCar(g, x, gy, w, t, f = 1) { const T = (p) => P(p, x, gy, w, f);
  // кузов с «дырами» под окна: водитель, нарисованный до машины, виден сквозь стекло
  const body = T([[0.5, -0.1], [0.5, -0.17], [0.34, -0.2], [0.22, -0.215], [0.12, -0.37], [-0.2, -0.37], [-0.3, -0.22], [-0.5, -0.2], [-0.5, -0.08], [0.44, -0.06]]);
  const win1 = T([[0.2, -0.235], [0.125, -0.35], [0.0, -0.35], [0.0, -0.235]]), win2 = T([[-0.035, -0.235], [-0.035, -0.35], [-0.185, -0.35], [-0.255, -0.235]]);
  g.save(); g.lineJoin = 'round'; const path = (pts) => { pts.forEach(([a, b], i) => i ? g.lineTo(a, b) : g.moveTo(a, b)); g.closePath(); };
  g.beginPath(); path(body); path(win1); path(win2); g.fillStyle = '#f4f6f8'; g.fill('evenodd');
  g.strokeStyle = INK(); g.lineWidth = 6; g.beginPath(); path(body); g.stroke(); g.lineWidth = 4; g.beginPath(); path(win1); g.stroke(); g.beginPath(); path(win2); g.stroke();
  g.fillStyle = 'rgba(160,210,240,.2)'; g.beginPath(); path(win1); g.fill(); g.beginPath(); path(win2); g.fill(); g.restore();
  inkRect(g, Math.min(x - 0.5 * w, x + 0.5 * w), gy - w * 0.15, w, w * 0.04, { fill: '#2f5d8a', r: 2, w: 0, stroke: false });
  const on = Math.floor(t * 6) % 2; inkRect(g, x + f * -0.13 * w - w * 0.07, gy - w * 0.405, w * 0.07, w * 0.04, { fill: on ? '#ff3b3b' : '#7a2020', r: 3, w: 3 }); inkRect(g, x + f * -0.13 * w, gy - w * 0.405, w * 0.07, w * 0.04, { fill: on ? '#2b3a8a' : '#4aa8ff', r: 3, w: 3 });
  if (on) { g.save(); g.globalAlpha = 0.28; g.fillStyle = '#ff3b3b'; g.beginPath(); g.arc(x + f * -0.1 * w, gy - w * 0.39, w * 0.2, 0, 7); g.fill(); g.restore(); }
  for (const a of [0.29, -0.3]) { const cx = x + f * a * w, cy = gy - w * 0.075; inkCircle(g, cx, cy, w * 0.078, { fill: '#222', w: 5 }); inkCircle(g, cx, cy, w * 0.035, { fill: '#bbb', w: 3 }); }
  inkShape(g, T([[0.5, -0.15], [0.45, -0.165], [0.45, -0.13], [0.5, -0.125]]), { fill: '#ffe66b', w: 3 }); }
export function speedboat(g, x, gy, w, o = {}) { const f = o.f ?? 1, T = (p) => P(p, x, gy, w, f);
  for (const a of [-0.2, 0.15]) { const cx = x + f * a * w, cy = gy - w * 0.05; inkCircle(g, cx, cy, w * 0.05, { fill: '#17171b', w: 5 }); inkCircle(g, cx, cy, w * 0.02, { fill: '#9aa0aa', w: 3 }); }
  inkLine(g, T([[-0.34, -0.1], [0.3, -0.1]]), { w: 7 }); inkLine(g, T([[0.3, -0.1], [0.5, -0.12]]), { w: 6 });
  inkShape(g, T([[-0.45, -0.25], [0.46, -0.27], [0.5, -0.2], [0.2, -0.1], [-0.4, -0.1]]), { fill: '#e8eef5', w: 6 });
  inkShape(g, T([[-0.44, -0.21], [0.48, -0.225], [0.46, -0.2], [-0.43, -0.19]]), { fill: '#d8232a', w: 3 });
  inkShape(g, T([[0.05, -0.27], [0.22, -0.27], [0.12, -0.36]]), { fill: '#bfe3f5', w: 5 }); }
export function helicopter(g, x, y, w0, t, o = {}) { const w = w0 * 1.16; // y = полозья на земле; нос вправо при f=1; пилот (рисуется до вертолёта) виден через стеклянный колпак
  const f = o.f ?? 1, col = o.col || '#d8232a', T = (p) => P(p, x, y, w, f), sp = o.spin ?? 1;
  inkLine(g, T([[-0.2, -0.26], [-0.62, -0.31]]), { w: 12, stroke: col }); inkShape(g, T([[-0.58, -0.3], [-0.64, -0.4], [-0.6, -0.4], [-0.54, -0.3]]), { fill: col, w: 4 });
  const ta = t * 30 * sp; inkLine(g, [[x + f * -0.62 * w, y - 0.33 * w + Math.sin(ta) * 0.07 * w], [x + f * -0.62 * w, y - 0.33 * w - Math.sin(ta) * 0.07 * w]], { w: 5 });
  inkLine(g, T([[0.28, -0.12], [0.28, -0.03]]), { w: 6 }); inkLine(g, T([[-0.12, -0.12], [-0.12, -0.03]]), { w: 6 }); inkLine(g, T([[-0.2, -0.03], [0.4, -0.03]]), { w: 9 });
  inkShape(g, T([[0.34, -0.17], [0.3, -0.2], [-0.1, -0.2], [-0.2, -0.24], [-0.2, -0.12], [0.3, -0.1]]), { fill: col, w: 6 }); // нижний корпус
  g.save(); g.fillStyle = 'rgba(160,210,240,.26)'; g.strokeStyle = INK(); g.lineWidth = 6; g.lineJoin = 'round'; const dome = T([[0.3, -0.2], [0.27, -0.3], [0.16, -0.395], [0.0, -0.4], [-0.1, -0.3], [-0.1, -0.2]]); g.beginPath(); dome.forEach(([a, b], i) => i ? g.lineTo(a, b) : g.moveTo(a, b)); g.closePath(); g.fill(); g.stroke(); g.restore();
  inkLine(g, T([[0.08, -0.4], [0.08, -0.45]]), { w: 8 });
  const ra = t * 24 * sp, L = 0.55 * w * (0.6 + 0.4 * Math.abs(Math.cos(ra))); g.save(); g.globalAlpha = 0.3; g.fillStyle = '#556'; g.beginPath(); g.ellipse(x + f * 0.08 * w, y - 0.46 * w, 0.58 * w, 0.025 * w, 0, 0, 7); g.fill(); g.restore(); inkLine(g, [[x + f * 0.08 * w - L, y - 0.46 * w], [x + f * 0.08 * w + L, y - 0.46 * w]], { w: 7 });
  if (o.ladder) { const L2 = o.ladder, lx = x + f * 0.0 * w; inkLine(g, [[lx - 16, y - 0.03 * w], [lx - 16, y - 0.03 * w + L2]], { w: 6 }); inkLine(g, [[lx + 16, y - 0.03 * w], [lx + 16, y - 0.03 * w + L2]], { w: 6 }); for (let i = 1; i * 44 < L2; i++) inkLine(g, [[lx - 16, y - 0.03 * w + i * 44], [lx + 16, y - 0.03 * w + i * 44]], { w: 5 }); }
  return { hx: x + f * 0.1 * w, feetY: y - 0.04 * w }; }
// ---------- парк аттракционов ----------
export function ferris(g, x, y, r, t, o = {}) { // колесо: центр (x,y); o.k — размер кабинок; o.openTop — верхняя кабинка рисуется открытой (передняя стенка через cabFront)
  const gy = o.gy ?? y + r * 1.25, rot = (o.spin ?? 0) * t, k = o.k ?? 1;
  inkLine(g, [[x - r * 0.5, gy], [x, y]], { w: 14 * Math.max(1, k * 0.6) }); inkLine(g, [[x + r * 0.5, gy], [x, y]], { w: 14 * Math.max(1, k * 0.6) });
  inkCircle(g, x, y, r, { fill: 'rgba(0,0,0,0)', w: 10 }); inkCircle(g, x, y, r * 0.62, { fill: 'rgba(0,0,0,0)', w: 6 });
  for (let i = 0; i < 12; i++) { const a = rot + (i / 12) * Math.PI * 2; inkLine(g, [[x, y], [x + Math.cos(a) * r, y + Math.sin(a) * r]], { w: 5 }); }
  const cabs = []; for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + rot + (i / 12) * Math.PI * 2, cx = x + Math.cos(a) * r, cy = y + Math.sin(a) * r; cabs.push([cx, cy]); const top = i === 0 && o.openTop; const kk = i === 0 ? k : (o.k2 ?? k); const col = ['#a85a4a', '#7a8a9a', '#9a8a5a', '#6a8a7a'][i % 4];
    if (top) { // гондола висит на оси обода: крыша-колпак под осью, открытые стойки, передняя стенка — cabFront поверх героев
      const cyc = cy + 44 * kk;
      g.save(); g.globalAlpha = 0.3; inkRect(g, cx - 38 * kk, cyc - 24 * kk, 76 * kk, 86 * kk, { fill: '#efe3cb', r: 8 * kk, w: 0, stroke: false }); g.restore();
      for (const sx of [-1, 1]) inkLine(g, [[cx + sx * 36 * kk, cyc - 22 * kk], [cx + sx * 36 * kk, cyc + 60 * kk]], { w: 12, stroke: '#7a4a3a' });
      inkLine(g, [[cx - 44 * kk, cyc - 22 * kk], [cx - 6 * kk, cy + 4]], { w: 8, stroke: '#7a4a3a' }); inkLine(g, [[cx + 44 * kk, cyc - 22 * kk], [cx + 6 * kk, cy + 4]], { w: 8, stroke: '#7a4a3a' });
      inkShape(g, [[cx - 50 * kk, cyc - 20 * kk], [cx - 34 * kk, cyc - 40 * kk], [cx + 34 * kk, cyc - 40 * kk], [cx + 50 * kk, cyc - 20 * kk]], { fill: '#c0463a', w: 6 });
      inkCircle(g, cx, cy, 16 * Math.max(1, kk * 0.5), { fill: '#6a5a4a', w: 5 });
    } else {
      inkRect(g, cx - 38 * kk, cy, 76 * kk, 62 * kk, { fill: col, r: 10 * kk, w: 5 });
      inkRect(g, cx - 30 * kk, cy + 8 * kk, 60 * kk, 28 * kk, { fill: '#cfd8e0', r: 6 * kk, w: 3 });
      inkShape(g, [[cx - 44 * kk, cy + 2 * kk], [cx - 26 * kk, cy - 16 * kk], [cx + 26 * kk, cy - 16 * kk], [cx + 44 * kk, cy + 2 * kk]], { fill: '#7a3a2a', w: 4 });
    } }
  inkCircle(g, x, y, 22, { fill: '#6a5a4a', w: 6 });
  if (o.lamp) { const a = 0.5 + 0.5 * Math.sin(t * 5); g.save(); g.globalAlpha = 0.4 + 0.3 * a; g.fillStyle = '#ffe28a'; g.beginPath(); g.arc(x, y - r - 20, 46, 0, 7); g.fill(); g.restore(); inkCircle(g, x, y - r - 20, 12, { fill: '#fff2b0', w: 4 }); }
  return { top: cabs[0], cabs }; }
export function cabFront(g, pos, k = 1, wallTop) { const [cx, cy] = pos, y0 = wallTop ?? cy + 22 * k, h = cy + 62 * k - y0; inkRect(g, cx - 38 * k, y0, 76 * k, h, { fill: '#b8604c', r: 8 * k, w: 5 }); inkLine(g, [[cx - 34 * k, y0 + 12], [cx + 34 * k, y0 + 12]], { w: 5, stroke: '#7a3a2a' }); for (const dx of [-24, -8, 8, 24]) inkLine(g, [[cx + dx * k, y0 + 16], [cx + dx * k, y0 + h - 14]], { w: 3, stroke: '#8a4636' }); }
export function coaster(g, x0, x1, gy, t, o = {}) { // рельсы-горки и башня
  const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40, px = lerp(x0, x1, u); pts.push([px, gy - 260 - 190 * Math.sin(u * Math.PI * 3.2) * (0.5 + 0.5 * Math.sin(u * 5))]); }
  for (let i = 1; i < pts.length; i += 2) inkLine(g, [[pts[i][0], pts[i][1]], [pts[i][0] - 10, gy]], { w: 6, stroke: '#7a4a3a' });
  inkLine(g, pts, { w: 14, stroke: '#a84a3a' }); inkLine(g, pts.map(([a, b]) => [a, b + 22]), { w: 8, stroke: '#7a3a2a' }); return pts; }
export function tower(g, x, gy, h) { inkShape(g, [[x - 40, gy], [x - 18, gy - h], [x + 18, gy - h], [x + 40, gy]], { fill: '#8a8f9a', w: 6 }); inkRect(g, x - 60, gy - h - 40, 120, 44, { fill: '#a84a3a', r: 8, w: 5 }); }
export function phoneScreen(g, x, y, w, h, o = {}) { inkRect(g, x - w / 2, y - h / 2, w, h, { fill: '#1b2230', r: 36, w: 8 }); inkRect(g, x - w / 2 + 16, y - h / 2 + 30, w - 32, h - 60, { fill: o.bg || '#eef5ff', r: 16, w: 0, stroke: false }); }
export function bell(g, x, y, k = 1, t = 0) { g.save(); g.translate(x, y); g.rotate(Math.sin(t * 8) * 0.2); g.scale(k, k); inkShape(g, [[-40, 30], [-30, -30], [0, -50], [30, -30], [40, 30]], { fill: '#ffd23a', w: 5 }); inkCircle(g, 0, 40, 10, { fill: '#c48a00', w: 4 }); g.restore(); }
// ---------- предметы ----------
import { inkTube } from './lib.js';
export function phoneBig(g, cx, cy, h, t, o = {}) { const w = h * 0.52; phoneScreen(g, cx, cy, w, h, { bg: o.bg }); if (o.draw) o.draw(g, cx, cy, w, h); }
export function envelope(g, x, y, w, rot = 0, a = 1) { g.save(); g.translate(x, y); g.rotate(rot); g.globalAlpha *= a; inkRect(g, -w / 2, -w * 0.32, w, w * 0.64, { fill: '#fffdf6', r: 6, w: 5 }); inkLine(g, [[-w / 2, -w * 0.3], [0, w * 0.06], [w / 2, -w * 0.3]], { w: 4 }); inkCircle(g, 0, w * 0.1, w * 0.1, { fill: '#7dc47a', w: 3 }); g.restore(); }
export function mower(g, x, gy, s = 1, f = 1) { g.save(); g.translate(x, gy); g.scale(f * s, s); inkShape(g, [[-70, -50], [70, -50], [60, -110], [-40, -118]], { fill: '#d8232a', w: 6 }); inkLine(g, [[-60, -100], [-150, -190]], { w: 9 }); inkLine(g, [[-150, -190], [-190, -190]], { w: 9 }); inkCircle(g, -50, -26, 28, { fill: '#2b2b33', w: 5 }); inkCircle(g, 56, -26, 24, { fill: '#2b2b33', w: 5 }); inkCircle(g, -50, -26, 10, { fill: '#bbb', w: 3 }); g.restore(); }
// велосипед: рама, колёса, сиденье НИЖЕ таза, педали крутятся. Всадник (poseObj BP) ставится функцией bikePose.
export const BP = { head: [0, 0], sh: [0, 0], hip: [0, 0], eF: [0, 0], hF: [0, 0], eB: [0, 0], hB: [0, 0], kF: [0, 0], fF: [0, 0], kB: [0, 0], fB: [0, 0] };
export function bikePose(t, e, kb) { // e = реальный масштаб героя, kb = масштаб велосипеда; координаты в единицах героя от (x, земля), f=1
  const u = ([a, b]) => [a / e, b / e], th = t * 7, R = 22 * kb, BB = [-20 * kb, -66 * kb], pF = [BB[0] + R * Math.cos(th), BB[1] + R * Math.sin(th)], pB = [BB[0] - R * Math.cos(th), BB[1] - R * Math.sin(th)];
  const hip = [-10 * kb, -150 * kb - 12], sh = [hip[0] + 0.3 * 115 * 1.0 + 8, hip[1] - 108], hd = [sh[0] + 14, sh[1] - 52], grip = [70 * kb, -154 * kb];
  const L = 50 * e, ik = (h, ft, sg) => { let dx = ft[0] - h[0], dy = ft[1] - h[1], d = Math.hypot(dx, dy); const Lq = L; if (d > 2 * Lq - 1) { d = 2 * Lq - 1; } const hh = Math.sqrt(Math.max(0, Lq * Lq - d * d / 4)), nx = dx / Math.hypot(dx, dy), ny = dy / Math.hypot(dx, dy); return [(h[0] + ft[0]) / 2 + sg * ny * hh, (h[1] + ft[1]) / 2 - sg * nx * hh]; };
  const aik = (h, ft) => { const La = 42 * e, d = Math.min(Math.hypot(ft[0] - h[0], ft[1] - h[1]), 2 * La - 1), hh = Math.sqrt(Math.max(0, La * La - d * d / 4)), dd = Math.hypot(ft[0] - h[0], ft[1] - h[1]), nx = (ft[0] - h[0]) / dd, ny = (ft[1] - h[1]) / dd; return [(h[0] + ft[0]) / 2 - ny * hh, (h[1] + ft[1]) / 2 + nx * hh]; };
  const fF = [pF[0] + 8, pF[1] - 6], fB = [pB[0] + 8, pB[1] - 6];
  const set = { head: hd, sh, hip, hF: grip, hB: [grip[0] - 4, grip[1] + 2], kF: ik(hip, fF, 1), fF, kB: ik(hip, fB, 1), fB };
  set.eF = aik(sh, set.hF); set.eB = aik(sh, set.hB);
  for (const k of Object.keys(set)) BP[k] = u(set[k]); return BP; }
export function bike(g, x, gy, s = 1, f = 1, t = 0) { g.save(); g.translate(x, gy); g.scale(f * s, s); const sp = t * 8; for (const wx of [-90, 90]) { inkCircle(g, wx, -62, 62, { fill: 'rgba(0,0,0,0)', w: 8 }); for (let i = 0; i < 4; i++) { const a = sp + i * Math.PI / 4; inkLine(g, [[wx - Math.cos(a) * 58, -62 - Math.sin(a) * 58], [wx + Math.cos(a) * 58, -62 + Math.sin(a) * 58]], { w: 2, stroke: '#888' }); } }
  inkLine(g, [[-90, -62], [-20, -66], [60, -130], [90, -62]], { w: 9, stroke: '#2f6dd8' }); inkLine(g, [[-20, -66], [-10, -142]], { w: 9, stroke: '#2f6dd8' }); inkLine(g, [[-90, -62], [-10, -142]], { w: 7, stroke: '#2f6dd8' }); inkLine(g, [[60, -130], [74, -152]], { w: 9 }); inkLine(g, [[74, -152], [56, -160]], { w: 8 });
  inkRect(g, -34, -156, 52, 12, { fill: '#2b2b33', r: 5, w: 4 });
  const th = t * 7, R = 22; for (const a of [th, th + Math.PI]) { inkLine(g, [[-20, -66], [-20 + R * Math.cos(a), -66 + R * Math.sin(a)]], { w: 6, stroke: '#555' }); inkRect(g, -20 + R * Math.cos(a) - 9, -66 + R * Math.sin(a) - 3, 18, 6, { fill: '#2b2b33', r: 2, w: 3 }); }
  g.restore(); }
export function boxP(g, x, y, w, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); inkRect(g, -w / 2, -w * 0.4, w, w * 0.8, { fill: '#c9a46a', r: 5, w: 5 }); inkLine(g, [[0, -w * 0.4], [0, w * 0.4]], { w: 8, stroke: '#a67c43' }); inkLine(g, [[-w / 2, -w * 0.08], [w / 2, -w * 0.08]], { w: 4, stroke: '#a67c43' }); g.restore(); }
export function yacht(g, x, gy, w, f = 1, t = 0) { const T = (p) => P(p, x, gy, w, f);
  inkShape(g, T([[-0.5, -0.17], [0.5, -0.2], [0.42, -0.04], [-0.42, -0.04]]), { fill: '#f4f6f8', w: 7 }); inkLine(g, T([[-0.48, -0.12], [0.46, -0.14]]), { w: 5, stroke: '#2f6dd8' });
  inkShape(g, T([[-0.3, -0.19], [-0.24, -0.34], [0.2, -0.34], [0.3, -0.2]]), { fill: '#fff', w: 6 }); for (const a of [-0.2, -0.05, 0.1]) inkRect(g, x + f * a * w - 18, gy - 0.31 * w, 36, 0.08 * w, { fill: '#8ad0f0', r: 5, w: 4 });
  inkLine(g, T([[0.0, -0.34], [0.0, -0.5]]), { w: 7 }); inkShape(g, T([[0.0, -0.5], [0.12, -0.46], [0.0, -0.43]]), { fill: '#e5383b', w: 4 }); }
export function pickup(g, x, gy, w, f = 1) { const T = (p) => P(p, x, gy, w, f);
  inkShape(g, T([[-0.5, -0.1], [-0.5, -0.32], [-0.1, -0.32], [-0.1, -0.2], [0.08, -0.2], [0.14, -0.34], [0.3, -0.35], [0.45, -0.22], [0.5, -0.2], [0.5, -0.1]]), { fill: '#2f8a5a', w: 7 });
  inkShape(g, T([[0.16, -0.31], [0.28, -0.32], [0.38, -0.22], [0.16, -0.22]]), { fill: '#bfe3f5', w: 5 }); inkShape(g, T([[0.5, -0.17], [0.45, -0.18], [0.45, -0.14], [0.5, -0.135]]), { fill: '#ffe66b', w: 3 });
  for (const a of [0.3, -0.3]) { inkCircle(g, x + f * a * w, gy - 0.07 * w, 0.08 * w, { fill: '#222', w: 6 }); inkCircle(g, x + f * a * w, gy - 0.07 * w, 0.035 * w, { fill: '#bbb', w: 3 }); } }
export function goldBowl(g, x, gy, w = 140, full = true) { inkShape(g, [[x - w / 2, gy - w * 0.4], [x + w / 2, gy - w * 0.4], [x + w * 0.38, gy], [x - w * 0.38, gy]], { fill: '#ffcc33', w: 6 }); inkLine(g, [[x - w * 0.36, gy - w * 0.28], [x + w * 0.36, gy - w * 0.28]], { w: 4, stroke: '#fff2b0' }); if (full) for (let i = 0; i < 7; i++) inkCircle(g, x - w * 0.36 + i * w * 0.12, gy - w * 0.43 - (i % 2) * 8, w * 0.07, { fill: '#a0663a', w: 3 }); }
export function backpack(g, x, gy, k = 1, rot = 0) { g.save(); g.translate(x, gy); g.rotate(rot); g.scale(k, k); inkRect(g, -34, -90, 68, 90, { fill: '#2f6dd8', r: 16, w: 5 }); inkRect(g, -22, -50, 44, 30, { fill: '#1f4ea8', r: 8, w: 4 }); g.restore(); }
export function sandwich(g, x, y, k = 1, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(k, k); inkShape(g, [[-40, 14], [40, 14], [34, -2], [-34, -2]], { fill: '#e8c27a', w: 4 }); inkRect(g, -38, -12, 76, 12, { fill: '#7dc47a', r: 4, w: 3 }); inkShape(g, [[-40, -12], [40, -12], [30, -30], [-30, -30]], { fill: '#e8c27a', w: 4 }); g.restore(); }
export function bed(g, x, gy, w = 640, f = 1) { inkLine(g, [[x - w / 2, gy], [x - w / 2, gy - 150]], { w: 9 }); inkLine(g, [[x + w / 2, gy], [x + w / 2, gy - 90]], { w: 9 }); inkRect(g, x - w / 2, gy - 120, w, 40, { fill: '#e8f4f2', r: 10, w: 6 }); inkRect(g, x - w / 2 - 10, gy - 200, 24, 120, { fill: '#9aa8b0', r: 6, w: 5 }); inkRect(g, x - w / 2 + 14, gy - 150, 150, 40, { fill: '#fff', r: 18, w: 5 }); }
export function blanket(g, x, gy, w = 520) { inkRect(g, x, gy - 150, w, 70, { fill: '#7ab8e0', r: 16, w: 6 }); inkLine(g, [[x + 20, gy - 130], [x + w - 20, gy - 130]], { w: 3, stroke: '#cfe6f5' }); }
export function monitorH(g, x, gy, t, bpm = 1) { inkLine(g, [[x, gy], [x, gy - 200]], { w: 8 }); inkRect(g, x - 90, gy - 330, 180, 130, { fill: '#10182a', r: 12, w: 6 }); g.save(); g.strokeStyle = '#42ff8c'; g.lineWidth = 5; g.beginPath(); for (let i = 0; i <= 40; i++) { const u = i / 40, ph = (u * 2 - t * 1.4 * bpm) % 1, y = ph < 0.1 ? -Math.sin(ph / 0.1 * Math.PI) * 44 : ph < 0.16 ? 14 : 0; g.lineTo(x - 70 + u * 140, gy - 265 - y); } g.stroke(); g.restore(); }
export function chartBoard(g, x, y, k = 1) { g.save(); g.translate(x, y); g.scale(k, k); inkRect(g, -40, -56, 80, 112, { fill: '#c9a46a', r: 6, w: 5 }); inkRect(g, -30, -44, 60, 88, { fill: '#fffdf6', r: 3, w: 3 }); for (let i = 0; i < 4; i++) inkLine(g, [[-22, -30 + i * 20], [22, -30 + i * 20]], { w: 3, stroke: '#888' }); g.restore(); }
export function billDoc(g, x, y, w, str, a = 1) { g.save(); g.translate(x, y); g.globalAlpha *= a; inkRect(g, -w / 2, -w * 0.7, w, w * 1.4, { fill: '#fffdf6', r: 8, w: 6 }); text(g, 'HOSPITAL', 0, -w * 0.45, { size: w * 0.14, font: FONTS.title, weight: 400, color: '#2f5d8a' }); for (let i = 0; i < 3; i++) inkLine(g, [[-w * 0.34, -w * 0.28 + i * w * 0.14], [w * 0.34, -w * 0.28 + i * w * 0.14]], { w: 3, stroke: '#999' }); text(g, str, 0, w * 0.36, { size: w * 0.24, font: FONTS.title, weight: 400, color: '#d8232a' }); g.restore(); }
export function vest(g, x, y, k = 1) { g.save(); g.translate(x, y); g.scale(k, k); inkShape(g, [[-34, -40], [-12, -50], [-6, -34], [6, -34], [12, -50], [34, -40], [30, 36], [-30, 36]], { fill: '#4a6a9a', w: 5 }); inkLine(g, [[-26, -4], [26, -4]], { w: 4, stroke: '#2a3a5a' }); inkLine(g, [[-26, 14], [26, 14]], { w: 4, stroke: '#2a3a5a' }); g.restore(); }
export function sprinkler(g, x, gy, t, tx, ty) { inkRect(g, x - 8, gy - 30, 16, 30, { fill: '#6a6a72', r: 3, w: 4 }); g.save(); g.strokeStyle = 'rgba(120,200,255,.9)'; g.lineWidth = 7; g.lineCap = 'round'; for (let i = 0; i < 3; i++) { const ph = (t * 1.8 + i * 0.33) % 1; g.beginPath(); g.moveTo(x, gy - 30); g.quadraticCurveTo((x + tx) / 2, Math.min(gy, ty) - 140, lerp(x, tx, 0.9 + 0.1 * i), lerp(gy - 30, ty, 0.9 + 0.1 * i)); g.globalAlpha = 0.7; g.setLineDash([22, 30]); g.lineDashOffset = -ph * 52; g.stroke(); } g.restore(); }
export function particles(g, t, x, y, t0, col = '#bfc3c9', n = 26, spread = 260) { const d = t - t0; if (d < 0 || d > 1.6) return; g.save(); for (let i = 0; i < n; i++) { const a = (i / n) * Math.PI * 2 + i, sp = spread * (0.4 + 0.6 * ((i * 37) % 10) / 10); const px = x + Math.cos(a) * sp * d, py = y + Math.sin(a) * sp * d + 120 * d * d; g.globalAlpha = Math.max(0, 1 - d / 1.6); g.fillStyle = col; g.fillRect(px - 8, py - 8, 16, 16); } g.restore(); }
export function thoughtCloud(g, x, y, w, str, a = 1) { g.save(); g.globalAlpha = a; inkEllipse(g, x, y, w / 2, w * 0.18, { fill: '#fff', w: 5 }); inkCircle(g, x - w * 0.18, y + w * 0.22, 10, { fill: '#fff', w: 4 }); inkCircle(g, x - w * 0.24, y + w * 0.3, 6, { fill: '#fff', w: 3 }); text(g, str, x, y + 9, { size: w * 0.115, font: FONTS.title, weight: 400, color: S().ink }); g.restore(); }

export function blanketTo(g, x0, x1, topY, botY) { inkRect(g, x0, topY, x1 - x0, botY - topY, { fill: '#7ab8e0', r: 22, w: 6 }); inkLine(g, [[x0 + 24, topY + 26], [x1 - 24, topY + 26]], { w: 4, stroke: '#cfe6f5' }); inkLine(g, [[x0 + 24, topY + 54], [x1 - 24, topY + 54]], { w: 3, stroke: '#a6d0ec' }); }
export function phoneSmall(g, x, y, e, txt = '$', col = '#2a9a5a') { inkRect(g, x - 15 * e, y - 48 * e, 30 * e, 54 * e, { fill: '#10182a', r: 5 * e, w: 4 }); inkRect(g, x - 12 * e, y - 44 * e, 24 * e, 44 * e, { fill: '#dff3ff', r: 3 * e, w: 0, stroke: false }); text(g, txt, x, y - 22 * e, { size: 24 * e, font: FONTS.title, weight: 400, color: col }); }
