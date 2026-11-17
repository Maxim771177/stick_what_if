// gfx2.js ролика 07 (GTA-жизнь): HUD, транспорт, парк аттракционов. Всё кодом (ink-стиль).
import { E, S, C, D, ease, prog, clamp, lerp, text, measure, FONTS, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha } from './lib.js';
const INK = () => S().ink;
const P = (pts, x, y, w, f = 1) => pts.map(([a, b]) => [x + f * a * w, y + b * w]);
// ---------- HUD ----------
export function ring(g, x, y, rx, t, col = '#ffd23a') { // жёлтый круг на полу (овал в перспективе)
  const ry = rx * 0.26, pu = 0.5 + 0.5 * Math.sin(t * 3);
  g.save(); g.globalAlpha = 0.28 + 0.18 * pu; g.fillStyle = col; g.beginPath(); g.ellipse(x, y, rx * (1.1 + 0.05 * pu), ry * (1.1 + 0.05 * pu), 0, 0, 7); g.fill(); g.globalAlpha = 1;
  g.strokeStyle = '#fff6c4'; g.lineWidth = 12; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, 7); g.stroke(); g.strokeStyle = col; g.lineWidth = 6; g.stroke();
  g.globalAlpha = 0.5 * (1 - pu); g.strokeStyle = col; g.lineWidth = 5; g.beginPath(); g.ellipse(x, y - 4 - 40 * pu, rx * 0.9, ry * 0.9, 0, 0, 7); g.stroke(); g.restore(); }
export function label(g, x, y, lines, a = 1, size = 54, o = {}) { // белая надпись в воздухе
  g.save(); g.globalAlpha = a; const col = o.col || '#ffffff';
  lines.forEach((l, i) => { const big = i === 0; text(g, l, x, y + i * size * 1.05, { size: big ? size * 1.2 : size, font: FONTS.title, weight: 400, color: i === lines.length - 1 && o.last ? o.last : col, stroke: size * 0.14, strokeColor: '#10182a' }); });
  g.restore(); }
export function plusPop(g, x, y, str, t, t0, col = '#42ff8c') { const u = prog(t, t0, t0 + 1.8); if (u <= 0 || u >= 1) return; const a = u < 0.15 ? u / 0.15 : 1 - Math.pow((u - 0.15) / 0.85, 2); g.save(); g.globalAlpha = clamp(a); text(g, str, x, y - 120 * ease.out(u), { size: 96, font: FONTS.title, weight: 400, color: col, stroke: 12, strokeColor: '#10321c' }); g.restore(); }
export function hudStars(g, n, t, o = {}) { // звёзды в правом верхнем углу
  const x0 = E.W - 60, y0 = 70, sz = 28; g.save();
  for (let i = 0; i < 5; i++) { const on = i < n, x = x0 - i * 74; let k = 1, col = on ? '#ffd23a' : 'rgba(255,255,255,.28)';
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
export function wasted(g, t, t0, o = {}) { const u = ease.out(prog(t, t0, t0 + 0.5)); if (u <= 0.01) return; g.save(); g.fillStyle = `rgba(30,30,34,${0.55 * u})`; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); const k = 1.5 - 0.5 * u; g.translate(E.W / 2, E.H * 0.46); g.scale(k, k); g.globalAlpha = u; text(g, 'WASTED', 0, 0, { size: 240, font: FONTS.title, weight: 400, color: '#c9c9cf', stroke: 20, strokeColor: '#18181c' }); g.restore(); }
export function passed(g, t, t0, lines = ['MISSION PASSED', 'RESPECT +1']) { const u = ease.outBack(prog(t, t0, t0 + 0.6)); if (u <= 0.01) return; g.save(); g.translate(E.W / 2, E.H * 0.2); g.scale(u, u); text(g, lines[0], 0, 0, { size: 150, font: FONTS.title, weight: 400, color: '#42ff8c', stroke: 16, strokeColor: '#0c3a1c' }); text(g, lines[1], 0, 120, { size: 84, font: FONTS.title, weight: 400, color: '#ffffff', stroke: 12, strokeColor: '#0c3a1c' }); g.restore(); }
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
  inkShape(g, T([[0.5, -0.1], [0.5, -0.17], [0.34, -0.2], [0.2, -0.215], [0.1, -0.31], [-0.22, -0.31], [-0.3, -0.22], [-0.5, -0.2], [-0.5, -0.08], [0.44, -0.06]]), { fill: '#f4f6f8', w: 6 });
  inkShape(g, T([[0.18, -0.225], [0.1, -0.295], [-0.04, -0.295], [-0.04, -0.225]]), { fill: '#bfe3f5', w: 4 }); inkShape(g, T([[-0.08, -0.225], [-0.08, -0.295], [-0.2, -0.295], [-0.26, -0.225]]), { fill: '#bfe3f5', w: 4 });
  inkRect(g, Math.min(x - 0.5 * w, x + 0.5 * w), gy - w * 0.15, w, w * 0.04, { fill: '#2f5d8a', r: 2, w: 0, stroke: false });
  const on = Math.floor(t * 6) % 2; inkRect(g, x + f * -0.13 * w - w * 0.07, gy - w * 0.345, w * 0.07, w * 0.04, { fill: on ? '#ff3b3b' : '#7a2020', r: 3, w: 3 }); inkRect(g, x + f * -0.13 * w, gy - w * 0.345, w * 0.07, w * 0.04, { fill: on ? '#2b3a8a' : '#4aa8ff', r: 3, w: 3 });
  if (on) { g.save(); g.globalAlpha = 0.28; g.fillStyle = '#ff3b3b'; g.beginPath(); g.arc(x + f * -0.1 * w, gy - w * 0.33, w * 0.2, 0, 7); g.fill(); g.restore(); }
  for (const a of [0.29, -0.3]) { const cx = x + f * a * w, cy = gy - w * 0.075; inkCircle(g, cx, cy, w * 0.078, { fill: '#222', w: 5 }); inkCircle(g, cx, cy, w * 0.035, { fill: '#bbb', w: 3 }); }
  inkShape(g, T([[0.5, -0.15], [0.45, -0.165], [0.45, -0.13], [0.5, -0.125]]), { fill: '#ffe66b', w: 3 }); }
export function speedboat(g, x, gy, w, o = {}) { const f = o.f ?? 1, T = (p) => P(p, x, gy, w, f);
  for (const a of [-0.2, 0.15]) { const cx = x + f * a * w, cy = gy - w * 0.05; inkCircle(g, cx, cy, w * 0.05, { fill: '#17171b', w: 5 }); inkCircle(g, cx, cy, w * 0.02, { fill: '#9aa0aa', w: 3 }); }
  inkLine(g, T([[-0.34, -0.1], [0.3, -0.1]]), { w: 7 }); inkLine(g, T([[0.3, -0.1], [0.5, -0.12]]), { w: 6 });
  inkShape(g, T([[-0.45, -0.25], [0.46, -0.27], [0.5, -0.2], [0.2, -0.1], [-0.4, -0.1]]), { fill: '#e8eef5', w: 6 });
  inkShape(g, T([[-0.44, -0.21], [0.48, -0.225], [0.46, -0.2], [-0.43, -0.19]]), { fill: '#d8232a', w: 3 });
  inkShape(g, T([[0.05, -0.27], [0.22, -0.27], [0.12, -0.36]]), { fill: '#bfe3f5', w: 5 }); }
export function helicopter(g, x, y, w, t, o = {}) { // y = полозья на земле; нос вправо при f=1; пилот (рисуется до вертолёта) виден через стеклянный колпак
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
export function ferris(g, x, y, r, t, o = {}) { // колесо: центр (x,y); ось на стойках до земли gy
  const gy = o.gy ?? y + r * 1.25, rot = (o.spin ?? 0) * t;
  inkLine(g, [[x - r * 0.5, gy], [x, y]], { w: 14 }); inkLine(g, [[x + r * 0.5, gy], [x, y]], { w: 14 });
  inkCircle(g, x, y, r, { fill: 'rgba(0,0,0,0)', w: 10 }); inkCircle(g, x, y, r * 0.62, { fill: 'rgba(0,0,0,0)', w: 6 });
  for (let i = 0; i < 12; i++) { const a = rot + (i / 12) * Math.PI * 2; inkLine(g, [[x, y], [x + Math.cos(a) * r, y + Math.sin(a) * r]], { w: 5 }); }
  const cabs = []; for (let i = 0; i < 12; i++) { const a = -Math.PI / 2 + rot + (i / 12) * Math.PI * 2, cx = x + Math.cos(a) * r, cy = y + Math.sin(a) * r; cabs.push([cx, cy]); const top = i === 0; inkRect(g, cx - 38, cy, 76, 62, { fill: top && o.topCab ? '#3a3f4a' : ['#a85a4a', '#7a8a9a', '#9a8a5a', '#6a8a7a'][i % 4], r: 10, w: 5 }); inkRect(g, cx - 30, cy + 8, 60, 28, { fill: top && o.topCab ? 'rgba(0,0,0,0)' : '#cfd8e0', r: 6, w: 3 }); }
  inkCircle(g, x, y, 22, { fill: '#6a5a4a', w: 6 });
  if (o.lamp) { const a = 0.5 + 0.5 * Math.sin(t * 5); g.save(); g.globalAlpha = 0.4 + 0.3 * a; g.fillStyle = '#ffe28a'; g.beginPath(); g.arc(x, y - r - 20, 46, 0, 7); g.fill(); g.restore(); inkCircle(g, x, y - r - 20, 12, { fill: '#fff2b0', w: 4 }); }
  return { top: cabs[0], cabs }; }
export function coaster(g, x0, x1, gy, t, o = {}) { // рельсы-горки и башня
  const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40, px = lerp(x0, x1, u); pts.push([px, gy - 260 - 190 * Math.sin(u * Math.PI * 3.2) * (0.5 + 0.5 * Math.sin(u * 5))]); }
  for (let i = 1; i < pts.length; i += 2) inkLine(g, [[pts[i][0], pts[i][1]], [pts[i][0] - 10, gy]], { w: 6, stroke: '#7a4a3a' });
  inkLine(g, pts, { w: 14, stroke: '#a84a3a' }); inkLine(g, pts.map(([a, b]) => [a, b + 22]), { w: 8, stroke: '#7a3a2a' }); return pts; }
export function tower(g, x, gy, h) { inkShape(g, [[x - 40, gy], [x - 18, gy - h], [x + 18, gy - h], [x + 40, gy]], { fill: '#8a8f9a', w: 6 }); inkRect(g, x - 60, gy - h - 40, 120, 44, { fill: '#a84a3a', r: 8, w: 5 }); }
export function phoneScreen(g, x, y, w, h, o = {}) { inkRect(g, x - w / 2, y - h / 2, w, h, { fill: '#1b2230', r: 36, w: 8 }); inkRect(g, x - w / 2 + 16, y - h / 2 + 30, w - 32, h - 60, { fill: o.bg || '#eef5ff', r: 16, w: 0, stroke: false }); }
export function bell(g, x, y, k = 1, t = 0) { g.save(); g.translate(x, y); g.rotate(Math.sin(t * 8) * 0.2); g.scale(k, k); inkShape(g, [[-40, 30], [-30, -30], [0, -50], [30, -30], [40, 30]], { fill: '#ffd23a', w: 5 }); inkCircle(g, 0, 40, 10, { fill: '#c48a00', w: 4 }); g.restore(); }
