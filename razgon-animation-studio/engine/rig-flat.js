// engine/rig-flat.js — character family "flat": flat-vector explainer people (filled bodies and limbs, big heads,
// dot eyes, hard-edged cel shading, outline optional). Driven by the shared skeleton poses (skeleton.js).
//
// drawFlat(g, { x, y, s, facing, pose, rot, outfit, expr, talk, blink, look, alpha, shadow, prop })
// outfit = { skin, build: 'slim'|'average'|'heavy', top: 'tshirt'|'shirt'|'suit'|'hoodie'|'dress'|'coat'|'uniform'|'tank',
//            color, color2 (tie / trim), legs (trousers colour), skirt: bool, shoes,
//            hair: 'none'|'short'|'side'|'long'|'bun'|'ponytail'|'curly'|'afro'|'mohawk'|'balding', hairColor, beard, mustache,
//            hat: 'cap'|'hardhat'|'police'|'beanie'|'tophat', hatColor, glasses: bool, kid: bool }
// Variant tokens used: ink (outline + features), outline (outline width, 0 = none), shade (0..0.4 cel-shade strength),
//                      skin (default skin tone), contactShadow.
import { E, S, lerp, shade, circle, alpha } from './core.js';
import { POSES } from './skeleton.js';
import { inkShape, inkEllipse, contact } from './ink.js';

const CH = () => ({ head: 1.15, ...(E.pack?.characters || {}) });
const OW = () => S().outline ?? 0, SH = () => S().shade ?? 0.18, INK = () => S().ink;
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
const norm = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
const at = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];

function shape(g, pts, fill, o = {}) { inkShape(g, pts, { fill, w: OW(), wobble: 0, smooth: o.smooth, stroke: INK(), closed: true }); }
function tube(g, pts, w, fill) {
  const ow = OW(); g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  const path = () => { g.beginPath(); g.moveTo(...pts[0]); for (let i = 1; i < pts.length; i++) g.lineTo(...pts[i]); };
  if (ow > 0) { path(); g.strokeStyle = INK(); g.lineWidth = w + ow * 2; g.stroke(); }
  path(); g.strokeStyle = fill; g.lineWidth = w; g.stroke(); g.restore();
}
// cel shade: darken the part of a shape on the side away from the light (light from the upper front)
function celShade(g, pts, smooth, cut) {
  const k = SH(); if (k <= 0) return;
  g.save(); g.beginPath(); pts.forEach((p, i) => (i ? g.lineTo(...p) : g.moveTo(...p))); g.closePath(); g.clip();
  g.fillStyle = alpha('#000000', k); g.beginPath(); cut.forEach((p, i) => (i ? g.lineTo(...p) : g.moveTo(...p))); g.closePath(); g.fill(); g.restore();
}

function headGeom(p, kid) { const HR = 34 * CH().head * (kid ? 1.15 : 1), dir = norm(sub(p.head, p.sh)); return { c: add(p.sh, mul(dir, HR * 1.05)), r: HR }; }
const BUILD = { slim: 0.85, average: 1, heavy: 1.3 };

// ---------- head ----------
function hairShape(c, r, h, back, front = false) {
  const A = (a0, a1, rr, n = 12, dx = 0, dy = 0) => [...Array(n + 1)].map((_, i) => { const a = Math.PI * (a0 + (a1 - a0) * i / n); return [c[0] + dx + Math.cos(a) * r * rr, c[1] + dy + Math.sin(a) * r * rr]; });
  if (front) {   // close-ups: symmetric hair
    if (back) return h === 'long' ? [...A(0.85, 2.15, 1.12), [c[0] + r * 1.15, c[1] + r * 1.35], [c[0] - r * 1.15, c[1] + r * 1.35]] : h === 'afro' ? A(0, 2, 1.45, 18, 0, -r * 0.25) : h === 'bun' ? A(0, 2, 0.42, 14, 0, -r * 1.12) : null;
    if (['short', 'long', 'ponytail', 'bun', 'side', 'curly'].includes(h)) return [...A(0.92, 2.08, 1.08, 14), ...A(2.0, 1.0, 0.84, 10, 0, -r * 0.02).map(([x, y]) => [x, y - r * 0.06])];
    if (h === 'mohawk') return [[c[0] - r * 0.22, c[1] - r * 0.85], [c[0] - r * 0.18, c[1] - r * 1.55], [c[0] + r * 0.18, c[1] - r * 1.55], [c[0] + r * 0.22, c[1] - r * 0.85]];
    if (h === 'balding') return null;
  }
  if (back) {
    if (h === 'long') return [...A(0.9, 2.1, 1.12), [c[0] - r * 0.2, c[1] + r * 1.5], [c[0] - r * 1.15, c[1] + r * 1.4]];
    if (h === 'ponytail') return [[c[0] - r * 0.7, c[1] - r * 0.5], [c[0] - r * 1.55, c[1] - r * 0.2], [c[0] - r * 1.7, c[1] + r * 0.9], [c[0] - r * 1.2, c[1] + r * 0.3], [c[0] - r * 0.8, c[1]]];
    if (h === 'bun') return A(0, 2, 0.42, 14, -r * 0.45, -r * 1.0);
    if (h === 'afro') return A(0, 2, 1.45, 18, -r * 0.1, -r * 0.25);
    return null;
  }
  switch (h) {
    case 'short': case 'long': case 'ponytail': case 'bun': return [...A(1.0, 1.95, 1.08), ...A(1.9, 1.1, 0.8, 8, -r * 0.1, r * 0.06).map(([x, y], i) => [x, y + (i < 3 ? r * 0.12 : 0)])];
    case 'side': return [...A(0.95, 1.98, 1.1), [c[0] + r * 0.9, c[1] - r * 0.15], [c[0] + r * 0.2, c[1] - r * 0.55], [c[0] - r * 0.6, c[1] - r * 0.35], [c[0] - r * 0.95, c[1] + r * 0.2]];
    case 'curly': return [...A(0.95, 2.0, 1.12, 16).map(([x, y], i) => i % 2 ? [x + (x - c[0]) * 0.1, y + (y - c[1]) * 0.1] : [x, y]), ...A(1.95, 1.0, 0.82, 8, 0, r * 0.05)];
    case 'mohawk': return [[c[0] - r * 0.7, c[1] - r * 0.7], [c[0] - r * 0.3, c[1] - r * 1.55], [c[0] + r * 0.2, c[1] - r * 1.6], [c[0] + r * 0.45, c[1] - r * 0.85]];
    case 'balding': return [...A(0.95, 1.2, 1.06, 4), ...A(1.2, 0.95, 0.86, 4, -r * 0.05, 0)];
    default: return null;
  }
}
const EX = { neutral: ['dot', 0, 'line'], smile: ['dot', 0, 'smile'], happy: ['arc', 0, 'grin'], joy: ['arc', 1, 'grin'], surprised: ['big', 1, 'o'], shocked: ['big', 1, 'O'], scared: ['big', -1, 'wave'], worried: ['dot', -1, 'wave'], nervous: ['dot', -1, 'flat'], angry: ['dot', 2, 'flat'], determined: ['dot', 2, 'line'], sad: ['dot', -1, 'frown'], cry: ['closed', -1, 'frown'], smirk: ['dot', 0, 'smirk'], sleepy: ['closed', 0, 'line'], thinking: ['dot', 1, 'line'], confused: ['dot', 3, 'wave'], awe: ['big', 1, 'o'] };
function face(g, c, r, o, front) {
  const [eye, brow, mouth] = EX[o.expr] || EX.neutral, ink = INK(), look = o.look || (o.expr === 'thinking' ? [0.6, -0.6] : [0, 0]);
  const fx = c[0] + (front ? 0 : r * 0.28), xs = front ? [fx - r * 0.32, fx + r * 0.32] : [fx - r * 0.18, fx + r * 0.36], ey = c[1] - r * 0.02;
  g.save(); g.lineCap = 'round'; g.strokeStyle = ink; g.fillStyle = ink;
  xs.forEach((x, i) => {
    const ex = x + look[0] * r * 0.05, eyy = ey + look[1] * r * 0.05, er = r * (front ? 0.1 : 0.085) * (i === 0 && !front ? 0.85 : 1);
    if (o.blink || eye === 'closed') { g.lineWidth = r * 0.06; g.beginPath(); g.moveTo(x - er * 1.3, ey); g.lineTo(x + er * 1.3, ey); g.stroke(); }
    else if (eye === 'arc') { g.lineWidth = r * 0.065; g.beginPath(); g.arc(x, ey + er * 0.6, er * 1.3, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); }
    else if (eye === 'big') { g.fillStyle = '#ffffff'; g.beginPath(); g.arc(x, ey, er * 1.9, 0, Math.PI * 2); g.fill(); g.lineWidth = r * 0.03; g.stroke(); g.fillStyle = ink; g.beginPath(); g.arc(ex, eyy, er * 0.9, 0, Math.PI * 2); g.fill(); }
    else { g.beginPath(); g.ellipse(ex, eyy, er, er * 1.25, 0, 0, Math.PI * 2); g.fill(); }
    const by = ey - r * 0.26, bw = r * 0.14, t = brow === 2 ? (i ? -1 : 1) * r * 0.06 : brow === -1 ? (i ? 1 : -1) * r * 0.06 : brow === 3 && i ? -r * 0.07 : 0, lift = brow === 1 ? -r * 0.06 : 0;
    if (brow !== 0 || o.brows) { g.lineWidth = r * 0.055; g.beginPath(); g.moveTo(x - bw, by + lift + t); g.lineTo(x + bw, by + lift - t); g.stroke(); }
  });
  const mx = fx + (front ? 0 : r * 0.08), my = c[1] + r * 0.42, talk = o.talk || 0, mw = r * 0.2;
  g.lineWidth = r * 0.055;
  if (talk > 0.05) { g.fillStyle = '#6b2b2b'; g.beginPath(); g.ellipse(mx, my, mw * 0.8, r * (0.04 + 0.13 * talk), 0, 0, Math.PI * 2); g.fill(); }
  else switch (mouth) {
    case 'smile': g.beginPath(); g.arc(mx, my - mw * 0.7, mw, 0.5, Math.PI - 0.5); g.stroke(); break;
    case 'grin': g.fillStyle = '#6b2b2b'; g.beginPath(); g.moveTo(mx - mw, my - mw * 0.2); g.quadraticCurveTo(mx, my + mw * 1.3, mx + mw, my - mw * 0.2); g.closePath(); g.fill(); break;
    case 'o': g.fillStyle = '#6b2b2b'; g.beginPath(); g.ellipse(mx, my, mw * 0.35, mw * 0.5, 0, 0, Math.PI * 2); g.fill(); break;
    case 'O': g.fillStyle = '#6b2b2b'; g.beginPath(); g.ellipse(mx, my + mw * 0.1, mw * 0.55, mw * 0.75, 0, 0, Math.PI * 2); g.fill(); break;
    case 'frown': g.beginPath(); g.arc(mx, my + mw * 0.8, mw * 0.9, Math.PI + 0.6, Math.PI * 2 - 0.6); g.stroke(); break;
    case 'smirk': g.beginPath(); g.moveTo(mx - mw * 0.7, my); g.quadraticCurveTo(mx + mw * 0.2, my + mw * 0.3, mx + mw, my - mw * 0.4); g.stroke(); break;
    case 'wave': g.beginPath(); for (let i = 0; i <= 10; i++) { const u = i / 10; g.lineTo(mx - mw + u * mw * 2, my + Math.sin(u * Math.PI * 2) * mw * 0.2); } g.stroke(); break;
    case 'flat': g.beginPath(); g.moveTo(mx - mw * 0.8, my); g.lineTo(mx + mw * 0.8, my); g.stroke(); break;
    default: g.beginPath(); g.moveTo(mx - mw * 0.5, my); g.lineTo(mx + mw * 0.5, my); g.stroke();
  }
  if (o.expr === 'cry') { g.fillStyle = '#8fd0ff'; xs.forEach(x => { g.beginPath(); g.ellipse(x, ey + r * 0.22, r * 0.04, r * 0.08, 0, 0, Math.PI * 2); g.fill(); }); }
  if (o.expr === 'nervous') { g.fillStyle = '#9fd8ff'; g.beginPath(); g.ellipse(c[0] - r * 0.6, c[1] - r * 0.5, r * 0.06, r * 0.1, 0, 0, Math.PI * 2); g.fill(); }
  g.restore();
}
function drawHead(g, of, c, r, o, front) {
  const skin = of.skin || S().skin || '#f1c7a5', hc = of.hairColor || '#3b2a20';
  const back = hairShape(c, r, of.hair, true, front); if (back) shape(g, back, hc, { smooth: true });
  if (!front) { inkEllipse(g, c[0] - r * 0.12, c[1] + r * 0.05, r * 0.17, r * 0.22, { fill: shade(skin, -0.08), w: OW(), wobble: 0 }); }
  const head = [...Array(24)].map((_, i) => { const a = (i / 24) * Math.PI * 2; return [c[0] + Math.cos(a) * r, c[1] + Math.sin(a) * r * 1.06]; });
  shape(g, head, skin, { smooth: true });
  if (!front) celShade(g, head, true, [[c[0] - r * 1.2, c[1] - r * 1.2], [c[0] - r * 0.35, c[1] - r * 1.2], [c[0] - r * 0.55, c[1] + r * 1.3], [c[0] - r * 1.2, c[1] + r * 1.3]]);
  if (of.beard) shape(g, [...Array(13)].map((_, i) => { const a = Math.PI * (0.02 + 0.96 * i / 12); return [c[0] + Math.cos(a) * r * 1.02, c[1] + Math.sin(a) * r * 1.08]; }).concat([...Array(9)].map((_, i) => { const a = Math.PI * (0.92 - 0.84 * i / 8); return [c[0] + Math.cos(a) * r * 0.7, c[1] + r * 0.12 + Math.sin(a) * r * 0.55]; })), hc, { smooth: true });
  face(g, c, r, o, front);
  if (of.mustache) { const mx = c[0] + (front ? 0 : r * 0.36); shape(g, [[mx - r * 0.28, c[1] + r * 0.36], [mx, c[1] + r * 0.26], [mx + r * 0.28, c[1] + r * 0.36], [mx, c[1] + r * 0.33]], hc); }
  if (!front) { const nx = c[0] + r * 0.62; inkShape(g, [[nx, c[1] + r * 0.02], [nx + r * 0.16, c[1] + r * 0.22], [nx, c[1] + r * 0.26]], { fill: shade(skin, -0.06), w: 0, wobble: 0, closed: true }); }
  const top = hairShape(c, r, of.hair, false, front); if (top) shape(g, top, hc, { smooth: of.hair !== 'mohawk' });
  if (of.glasses) { g.save(); g.strokeStyle = INK(); g.lineWidth = r * 0.06; const fx = c[0] + (front ? 0 : r * 0.28), xs = front ? [fx - r * 0.32, fx + r * 0.32] : [fx - r * 0.18, fx + r * 0.36]; xs.forEach(x => { g.beginPath(); g.arc(x, c[1] - r * 0.02, r * 0.17, 0, Math.PI * 2); g.stroke(); }); g.beginPath(); g.moveTo(xs[0] + r * 0.17, c[1] - r * 0.02); g.lineTo(xs[1] - r * 0.17, c[1] - r * 0.02); g.stroke(); g.restore(); }
  hat(g, of, c, r, front);
}
function hat(g, of, c, r, front) {
  const col = of.hatColor || '#2f4f8f', f = front ? 0 : 1;
  const dome = (y0, rr, h) => [...Array(13)].map((_, i) => { const a = Math.PI + Math.PI * i / 12; return [c[0] + Math.cos(a) * r * rr, c[1] + y0 + Math.sin(a) * r * h]; });
  switch (of.hat) {
    case 'cap': shape(g, [...dome(-r * 0.25, 1.05, 0.85), [c[0] + r * 1.05 + f * r * 0.55, c[1] - r * 0.22], [c[0] + r * 1.0, c[1] - r * 0.12], [c[0] - r * 1.05, c[1] - r * 0.2]], col); break;
    case 'hardhat': shape(g, [...dome(-r * 0.3, 1.0, 0.85), [c[0] + r * 1.25, c[1] - r * 0.3], [c[0] + r * 1.25, c[1] - r * 0.18], [c[0] - r * 1.25, c[1] - r * 0.18], [c[0] - r * 1.25, c[1] - r * 0.3]], of.hatColor || '#f2c21a'); break;
    case 'police': shape(g, [[c[0] - r * 1.0, c[1] - r * 0.45], [c[0] - r * 1.15, c[1] - r * 1.05], [c[0] + r * 1.15, c[1] - r * 1.05], [c[0] + r * 1.0, c[1] - r * 0.45]], col); shape(g, [[c[0] - r * 1.0, c[1] - r * 0.5], [c[0] + r * 1.0 + f * r * 0.4, c[1] - r * 0.5], [c[0] + r * 1.0, c[1] - r * 0.36], [c[0] - r * 1.0, c[1] - r * 0.36]], '#1a1a1a'); circle(g, c[0] + f * r * 0.3, c[1] - r * 0.78, r * 0.12, '#f2c21a'); break;
    case 'beanie': shape(g, dome(-r * 0.12, 1.08, 1.0), col, { smooth: true }); break;
    case 'tophat': shape(g, [[c[0] - r * 0.7, c[1] - r * 0.7], [c[0] - r * 0.65, c[1] - r * 1.9], [c[0] + r * 0.65, c[1] - r * 1.9], [c[0] + r * 0.7, c[1] - r * 0.7]], of.hatColor || '#22232a'); shape(g, [[c[0] - r * 1.1, c[1] - r * 0.78], [c[0] + r * 1.1, c[1] - r * 0.78], [c[0] + r * 1.1, c[1] - r * 0.62], [c[0] - r * 1.1, c[1] - r * 0.62]], of.hatColor || '#22232a'); break;
  }
}

// ---------- body ----------
function torso(g, of, p) {
  const b = BUILD[of.build] ?? 1, top = of.top || 'tshirt', col = of.color || { suit: '#2f3340', uniform: '#3b5a8a', coat: '#7a5c42' }[top] || '#4a90d9';
  const u = norm(sub(p.hip, p.sh)), n = [-u[1], u[0]], sw = 19 * b, hw = 17 * b * (of.build === 'heavy' ? 1.15 : 1), hem = top === 'dress' ? 48 : top === 'coat' ? 40 : 10, bot = add(p.hip, mul(u, hem)), hwB = top === 'dress' ? hw * 1.9 : top === 'coat' ? hw * 1.25 : hw;
  const s0 = add(p.sh, mul(u, -3)), pts = [add(s0, mul(n, sw)), add(add(s0, mul(u, -4)), mul(n, sw * 0.4)), add(add(s0, mul(u, -4)), mul(n, -sw * 0.4)), add(s0, mul(n, -sw)), add(bot, mul(n, -hwB)), add(bot, mul(n, hwB))];
  if (of.build === 'heavy') pts.splice(4, 0, add(at(p.sh, p.hip, 0.6), mul(n, -hw * 1.3))), pts.push(add(at(p.sh, p.hip, 0.6), mul(n, hw * 1.3)));
  shape(g, pts, col, { smooth: of.build === 'heavy' });
  celShade(g, pts, false, [add(s0, mul(n, sw * 2)), add(s0, mul(n, sw * 0.35)), add(bot, mul(n, hwB * 0.2)), add(bot, mul(n, hwB * 2))]);
  if (top === 'suit' || top === 'shirt' || top === 'uniform') { const ty = add(s0, mul(u, 2)); shape(g, [add(ty, mul(n, -5)), add(ty, mul(n, 5)), add(add(ty, mul(u, 12)), mul(n, 0))], '#ffffff'); }
  if (top === 'suit') shape(g, [add(add(s0, mul(u, 6)), mul(n, -2.5)), add(add(s0, mul(u, 6)), mul(n, 2.5)), add(at(p.sh, p.hip, 0.75), mul(n, 3)), add(at(p.sh, p.hip, 0.82), mul(n, 0)), add(at(p.sh, p.hip, 0.75), mul(n, -3))], of.color2 || '#c0392b');
  if (top === 'uniform') { circle(g, ...add(at(p.sh, p.hip, 0.3), mul(n, -8)), 3.5, '#f2c21a'); }
  if (top === 'hoodie') shape(g, [add(at(p.sh, p.hip, 0.68), mul(n, -10)), add(at(p.sh, p.hip, 0.68), mul(n, 10)), add(at(p.sh, p.hip, 0.9), mul(n, 12)), add(at(p.sh, p.hip, 0.9), mul(n, -12))], shade(col, -0.12));
  if (top === 'tank') shape(g, [add(s0, mul(n, -sw * 0.35)), add(s0, mul(n, sw * 0.35)), add(add(s0, mul(u, 12)), mul(n, 0))], of.skin || S().skin || '#f1c7a5');
}
const sleeveLen = (of) => ({ tshirt: 0.55, dress: 0.3, tank: 0, uniform: 1, shirt: 1, suit: 1, hoodie: 1, coat: 1 }[of.top || 'tshirt'] ?? 0.55);
function arm(g, of, sh, e, h, far) {
  const skin = of.skin || S().skin || '#f1c7a5', col = of.color || { suit: '#2f3340', uniform: '#3b5a8a', coat: '#7a5c42' }[of.top] || '#4a90d9', d = far ? -0.12 : 0, b = BUILD[of.build] ?? 1;
  tube(g, [sh, e, h], 9.5 * b, shade(skin, d));
  const L = sleeveLen(of); if (L > 0) { const pts = L >= 1 ? [sh, e, at(e, h, 0.82)] : [sh, at(sh, e, L * 1.6 > 1 ? 1 : L * 1.6)]; tube(g, pts, 13 * b, shade(col, d - (far ? 0.05 : 0))); }
  inkEllipse(g, h[0], h[1], 7.5 * b, 6.5 * b, { fill: shade(skin, d), w: OW(), wobble: 0 });
}
function leg(g, of, hip, k, f, far) {
  const legs = of.legs || '#3b4a63', d = far ? -0.14 : 0, b = BUILD[of.build] ?? 1, skin = of.skin || S().skin || '#f1c7a5';
  if (of.skirt || of.top === 'dress') tube(g, [hip, k, f], 9 * b, shade(skin, d)); else tube(g, [hip, k, at(k, f, 0.92)], 13 * b, shade(legs, d));
  inkShape(g, [[f[0] - 7, f[1] - 9], [f[0] + 17, f[1] - 7], [f[0] + 18, f[1] + 1], [f[0] - 8, f[1] + 1]], { fill: shade(of.shoes || '#2a2a2e', d), w: OW(), wobble: 0, smooth: false });
}
function prop(g, pr, p) {
  const o = typeof pr === 'string' ? { type: pr } : pr, h = o.hand === 'B' ? p.hB : p.hF;
  switch (o.type) {
    case 'phone': shape(g, [[h[0] - 3, h[1] - 26], [h[0] + 13, h[1] - 26], [h[0] + 13, h[1] + 2], [h[0] - 3, h[1] + 2]], '#2b2f3a'); break;
    case 'briefcase': shape(g, [[h[0] - 18, h[1] + 4], [h[0] + 18, h[1] + 4], [h[0] + 18, h[1] + 30], [h[0] - 18, h[1] + 30]], o.color || '#6b4a2e'); break;
    case 'money': shape(g, [[h[0] - 4, h[1] - 14], [h[0] + 36, h[1] - 20], [h[0] + 38, h[1] - 2], [h[0] - 2, h[1] + 4]], '#7fc47a'); break;
    case 'clipboard': shape(g, [[h[0] - 4, h[1] - 34], [h[0] + 26, h[1] - 34], [h[0] + 26, h[1] + 4], [h[0] - 4, h[1] + 4]], '#c9a26b'); shape(g, [[h[0], h[1] - 28], [h[0] + 22, h[1] - 28], [h[0] + 22, h[1]], [h[0], h[1]]], '#ffffff'); break;
    case 'cup': shape(g, [[h[0] - 2, h[1] - 20], [h[0] + 14, h[1] - 20], [h[0] + 12, h[1] + 2], [h[0], h[1] + 2]], o.color || '#ffffff'); break;
    case 'pointer': g.save(); g.strokeStyle = '#3b3b3b'; g.lineWidth = 3; g.beginPath(); g.moveTo(...h); g.lineTo(h[0] + 80, h[1] - 55); g.stroke(); g.restore(); break;
  }
}

export function drawFlat(g, o) {
  const p = o.pose || POSES.stand, of = o.outfit || {}, kid = !!of.kid, s = (o.s ?? 1) * (kid ? 0.7 : 1), f = o.facing ?? 1;
  g.save(); if (o.alpha != null) g.globalAlpha *= o.alpha;
  if (o.shadow !== false && !o.rot) contact(g, o.x, o.y + 2, 38 * s * (BUILD[of.build] ?? 1));
  g.translate(o.x, o.y); g.scale(f * s, s);
  if (o.rot) { g.translate(p.hip[0], p.hip[1]); g.rotate(o.rot); g.translate(-p.hip[0], -p.hip[1]); }
  const H = headGeom(p, kid);
  leg(g, of, p.hip, p.kB, p.fB, true); arm(g, of, p.sh, p.eB, p.hB, true);
  leg(g, of, p.hip, p.kF, p.fF, false); torso(g, of, p);
  drawHead(g, of, H.c, H.r, o, false);
  arm(g, of, p.sh, p.eF, p.hF, false);
  if (o.prop) prop(g, o.prop, p);
  g.restore();
}
export function flatHead(o) {
  const p = o.pose || POSES.stand, kid = !!o.outfit?.kid, s = (o.s ?? 1) * (kid ? 0.7 : 1), f = o.facing ?? 1, H = headGeom(p, kid);
  let [x, y] = H.c; if (o.rot) { const [hx, hy] = p.hip, c = Math.cos(o.rot), sn = Math.sin(o.rot); [x, y] = [hx + (x - hx) * c - (y - hy) * sn, hy + (x - hx) * sn + (y - hy) * c]; }
  return [o.x + x * f * s, o.y + y * s, H.r * s];
}
export function flatCloseUp(g, cx, cy, r, o = {}) {
  const of = o.outfit || {}, R = 34, k = r / R, col = of.color || { suit: '#2f3340', uniform: '#3b5a8a', coat: '#7a5c42' }[of.top] || '#4a90d9';
  g.save(); g.translate(cx, cy); if (o.tilt) g.rotate(o.tilt); g.scale(k, k);
  const body = [[-R * 1.6, R * 3], [-R * 1.45, R * 1.6], [-R * 0.5, R * 1.15], [R * 0.5, R * 1.15], [R * 1.45, R * 1.6], [R * 1.6, R * 3]];
  shape(g, body, col, { smooth: true }); celShade(g, body, true, [[0, R], [R * 2, R], [R * 2, R * 3.2], [R * 0.4, R * 3.2]]);
  tube(g, [[0, R * 0.8], [0, R * 1.25]], R * 0.55, shade(of.skin || S().skin || '#f1c7a5', -0.1));
  drawHead(g, of, [0, 0], R, o, true);
  g.restore();
}
