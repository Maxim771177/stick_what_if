// engine/rig-doodle.js — character family "doodle": big-headed outlined figures with stick limbs and outlined clothes
// (the explainer / history-doodle look). Driven by the shared skeleton poses (skeleton.js), so any acting written for
// the stick family works here too. Line quality (width, wobble, boil) comes from the variant's `line` tokens via ink.js.
//
// drawDoodle(g, { x, y, s, facing, pose, rot, outfit, expr, talk, blink, look, alpha, shadow, prop })
// outfit = { skin, top: 'none'|'tshirt'|'shirt'|'hoodie'|'dress'|'fur'|'labcoat'|'suit'|'robe', color, color2,
//            legs: colour|null, shoes: colour|null,
//            hair: 'none'|'short'|'messy'|'spiky'|'curly'|'long'|'ponytail'|'bun', hairColor, beard: bool,
//            hat: 'cap'|'beanie'|'headband'|'hardhat'|null, hatColor, face: 'glasses'|null, kid: bool }
import { E, S, lerp, shade, circle } from './core.js';
import { POSES } from './skeleton.js';
import { face } from './rig2d.js';
import { LINE, inkShape, inkCircle, inkEllipse, inkLine, inkTube, inkRect, contact } from './ink.js';

const CH = () => ({ head: 1, limb: 1, ...(E.pack?.characters || {}) });
const SKIN = () => S().skin || '#ffffff';
const HAIR = '#2b2420';

// geometry helpers in the figure's local space
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
const norm = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
const at = (a, b, u) => [lerp(a[0], b[0], u), lerp(a[1], b[1], u)];

function headGeom(p, kid) {
  const HR = 44 * CH().head * (kid ? 1.12 : 1);   // pack characters.head scales it (1.25 = the big-headed explainer look)
  const dir = norm(sub(p.head, p.sh));
  return { c: add(p.sh, mul(dir, HR * 0.92)), r: HR, dir };
}

// ---------- hair & hats ----------
function arcPts(cx, cy, r, a0, a1, n, jag = 0) { const out = []; for (let i = 0; i <= n; i++) { const a = a0 + (a1 - a0) * (i / n), rr = r * (jag && i % 2 ? 1 + jag : 1); out.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr]); } return out; }
function hairBack(g, of, c, r) {
  const col = of.hairColor || HAIR;
  if (of.hair === 'long') inkShape(g, [...arcPts(c[0] - r * 0.05, c[1], r * 1.08, Math.PI * 0.95, Math.PI * 2.05, 14), [c[0] + r * 0.2, c[1] + r * 1.15], [c[0] - r * 1.05, c[1] + r * 1.2]], { fill: col, smooth: true, seed: 41 });
  if (of.hair === 'ponytail') inkTube(g, [[c[0] - r * 0.8, c[1] - r * 0.45], [c[0] - r * 1.5, c[1] - r * 0.1], [c[0] - r * 1.35, c[1] + r * 0.7]], r * 0.36, col, { seed: 42 });
  if (of.hair === 'bun') inkCircle(g, c[0] - r * 0.55, c[1] - r * 0.95, r * 0.36, { fill: col, seed: 43 });
}
function hairTop(g, of, c, r, front = false) {
  const col = of.hairColor || HAIR, h = of.hair;
  if (!h || h === 'none') return;
  // side view: hairline high at the front (+x), low at the back; front view: symmetric
  const A = front ? [0.94, 2.06] : [1.02, 1.92], Ai = front ? [2.0, 1.0] : [1.9, 1.05], off = front ? [0, r * 0.14] : [-r * 0.12, r * 0.16];
  const cap = (jag, a0 = A[0], a1 = A[1], ro = 1.06, ri = 0.86, n = 12) => inkShape(g, [...arcPts(c[0], c[1], r * ro, Math.PI * a0, Math.PI * a1, n, jag), ...arcPts(c[0] + off[0], c[1] + off[1], r * ri, Math.PI * Ai[0], Math.PI * Ai[1], 10)], { fill: col, seed: 44 });
  if (['short', 'long', 'ponytail', 'bun'].includes(h)) cap(0);
  else if (h === 'messy') cap(0.13, front ? 0.86 : 0.82, front ? 2.14 : 1.95, 1.08, 0.84, 18);
  else if (h === 'spiky') cap(0.3, A[0], A[1], 1.05, 0.88, 10);
  else if (h === 'curly') for (let i = 0; i < 7; i++) { const a = Math.PI * ((front ? 1.05 : 1.02) + i * (front ? 0.15 : 0.15)); inkCircle(g, c[0] + Math.cos(a) * r * 0.9, c[1] + Math.sin(a) * r * 0.9, r * 0.3, { fill: col, seed: 47 + i }); }
}
function beard(g, of, c, r) {
  if (!of.beard) return;
  const col = of.hairColor || HAIR;
  // a jaw ring: from ear to ear under the face, leaving the mouth on skin
  const outer = arcPts(c[0], c[1] + r * 0.04, r * 1.1, Math.PI * 0.05, Math.PI * 0.95, 16, 0.1);
  const inner = arcPts(c[0], c[1] - r * 0.18, r * 0.96, Math.PI * 0.86, Math.PI * 0.14, 10);
  inkShape(g, [...outer, ...inner], { fill: col, seed: 48 });
}
function hat(g, of, c, r, front = false) {
  const col = of.hatColor || '#d9483b';
  switch (of.hat) {
    case 'capBack': {   // кепка задом наперёд (Leon) по эталону: купол с долями, ровный ремешок с дырочками у ободка, небольшой чуб-волна, козырёк того же цвета — прямой, с закруглённым концом
      const hc = of.hairColor || '#6b3a1e', X = c[0], Y = c[1], tx = X + (front ? r * 0.28 : r * 0.46), thin = Math.max(1.2, LINE().width * 0.55);
      const top = Y - r * 1.62, rimY = Y - r * 0.7;
      // волосы у щёк под кепкой
      inkShape(g, [[X - r * 0.97, rimY + r * 0.1], [X - r * 0.86, Y - r * 0.12], [X - r * 0.7, rimY + r * 0.16]], { fill: hc, seed: 63, w: thin, smooth: true });
      inkShape(g, [[X + r * 0.97, rimY + r * 0.1], [X + r * 0.9, Y - r * 0.16], [X + r * 0.76, rimY + r * 0.16]], { fill: hc, seed: 64, w: thin, smooth: true });
      // купол и козырёк — один силуэт одного цвета: козырёк прямой, конец закруглён
      const tip = []; for (let k = 0; k <= 10; k++) { const th = Math.PI * (0.5 + k / 10); tip.push([X - r * 1.5 + Math.cos(th) * r * 0.22, rimY + r * 0.47 + Math.sin(th) * r * 0.22]); }
      inkShape(g, [...arcPts(X, Y - r * 0.62, r * 1.0, Math.PI, Math.PI * 2, 20), [X + r * 0.97, rimY + r * 0.18], [X + r * 0.55, rimY + r * 0.04], [X, rimY], [X - r * 0.5, rimY + r * 0.05], [X - r * 0.78, rimY + r * 0.3], ...tip, [X - r * 1.2, rimY + r * 0.19]], { fill: col, seed: 57 });
      // дольки купола
      for (const vx of [-0.62, -0.26, 0.12]) {
        const pts = []; for (let k = 0; k <= 8; k++) { const u = k / 8; pts.push([X + r * (vx * u + 0.1 * Math.sin(u * Math.PI) * (vx < 0 ? -1 : 1)), top + r * 0.03 + (rimY - top - r * 0.03) * u]); }
        inkLine(g, pts, { w: thin * 0.9 });
      }
      // ремешок: полоса, огибающая край кепки (идёт по дуге ободка), с тремя дырочками
      const rimAt = (x) => rimY + r * 0.2 * Math.pow(x / r, 2), sw = r * 0.55, th = r * 0.26, N = 8, sx = tx - X;
      const topE = [], botE = []; for (let k = 0; k <= N; k++) { const x = sx - sw + (2 * sw) * (k / N); topE.push([X + x, rimAt(x) - th - r * 0.03]); botE.push([X + x, rimAt(x) - r * 0.03]); }
      const sy = rimY - r * 0.17, sh = th / 2;
      // чуб поменьше: небольшая волна вбок из-за ремешка
      const T = [[-0.2, 0.1], [-0.2, -0.1], [-0.08, -0.26], [0.1, -0.36], [0.3, -0.38], [0.46, -0.32], [0.32, -0.24], [0.22, -0.2], [0.4, -0.18], [0.56, -0.06], [0.36, -0.05], [0.26, 0.0], [0.26, 0.1]].map(([a, b]) => [tx + r * a, rimAt(sx + r * a) - th - r * 0.03 + r * b]);
      inkShape(g, T, { fill: hc, seed: 56, w: thin, smooth: true });
      inkShape(g, [...topE, ...botE.reverse()], { fill: col, seed: 59, w: thin });
      for (let i = -1; i <= 1; i++) { const x = sx + i * r * 0.26; inkCircle(g, X + x, rimAt(x) - th / 2 - r * 0.03, r * 0.04, { fill: shade(col, -0.45), w: 0, seed: 62 + i }); }
      break;
    }
    case 'cap': inkShape(g, [...arcPts(c[0], c[1] - r * 0.1, r * 1.04, Math.PI, Math.PI * 2, 12), [c[0] + r * 1.6, c[1] - r * 0.12], [c[0] + r * 1.55, c[1] + r * 0.02], [c[0] - r * 1.04, c[1] - r * 0.02]], { fill: col, seed: 51 }); break;
    case 'hardhat': inkShape(g, [...arcPts(c[0], c[1] - r * 0.15, r * 1.02, Math.PI, Math.PI * 2, 12), [c[0] + r * 1.3, c[1] - r * 0.12], [c[0] + r * 1.3, c[1] + r * 0.02], [c[0] - r * 1.3, c[1] + r * 0.02], [c[0] - r * 1.3, c[1] - r * 0.12]], { fill: of.hatColor || '#f2c21a', seed: 52 }); break;
    case 'beanie': inkShape(g, [...arcPts(c[0], c[1] - r * 0.36, r * 1.08, Math.PI, Math.PI * 2, 12)], { fill: col, seed: 53 }); inkRect(g, c[0] - r * 1.1, c[1] - r * 0.46, r * 2.2, r * 0.16, { fill: shade(col, -0.1), r: 3, seed: 54 }); inkCircle(g, c[0], c[1] - r * 1.5, r * 0.24, { fill: shade(col, 0.3), seed: 54 }); break;
    case 'headband': inkShape(g, [[c[0] - r * 1.02, c[1] - r * 0.5], [c[0] + r * 1.0, c[1] - r * 0.5], [c[0] + r * 1.0, c[1] - r * 0.28], [c[0] - r * 1.02, c[1] - r * 0.28]], { fill: col, seed: 55 }); break;
  }
}
const seg2 = (g, pts) => inkLine(g, pts, { w: LINE().width * 0.45, smooth: false });
function glasses(g, of, c, r, front) {
  if (of.face !== 'glasses') return;
  const w = LINE().width * 0.55, fx = front ? c[0] : c[0] + r * 0.34, ey = c[1] - r * 0.16;
  const xs = front ? [fx - r * 0.34, fx + r * 0.34] : [fx - r * 0.26, fx + r * 0.32];
  xs.forEach((x, i) => inkCircle(g, x, ey, r * 0.2, { w, seed: 60 + i, wobble: 0 }));
  inkLine(g, [[xs[0] + r * 0.2, ey], [xs[1] - r * 0.2, ey]], { w, wobble: 0 });
}

// ---------- clothes ----------
function torsoShape(p, top) {
  const u = norm(sub(p.hip, p.sh)), n = [-u[1], u[0]];
  const W = { tshirt: [17, 16, 8], shirt: [17, 16, 8], hoodie: [19, 18, 10], suit: [18, 16, 10], dress: [16, 36, 50], fur: [16, 22, 24], labcoat: [18, 26, 48], robe: [17, 30, 70] }[top] || [17, 16, 8];
  const [sw, hw, hem] = W, top0 = add(p.sh, mul(u, -4)), bot = add(p.hip, mul(u, hem));
  const pts = [];
  for (let i = 0; i <= 6; i++) { const a = Math.PI + (i / 6) * Math.PI; pts.push(add(top0, add(mul(n, Math.cos(a) * -sw), mul(u, Math.sin(a) * 5)))); }  // rounded shoulders
  pts.push(add(bot, mul(n, -hw)));
  if (top === 'fur') { for (let i = 1; i < 6; i++) pts.push(add(add(bot, mul(n, -hw + (2 * hw * i) / 6)), mul(u, i % 2 ? 9 : 0))); }  // jagged hem
  pts.push(add(bot, mul(n, hw)));
  return { pts: pts.reverse(), u, n, bot };
}
function drawTorso(g, of, p) {
  const top = of.top;
  if (!top || top === 'none') { inkLine(g, [p.sh, p.hip], { w: LINE().width * 1.15 * CH().limb }); return; }
  const col = of.color || { labcoat: '#f4f3ee', fur: '#a9733f', suit: '#2f3340' }[top] || '#4a90d9';
  const { pts, u, n, bot } = torsoShape(p, top);
  inkShape(g, pts, { fill: col, seed: 70 });
  const w = LINE().width * 0.5;
  if (top === 'fur') { for (let i = 0; i < 4; i++) { const q = add(at(p.sh, p.hip, 0.3 + i * 0.18), mul(n, (i % 2 ? 6 : -7))); circle(g, q[0], q[1], 3.2, shade(col, -0.35)); } }
  if (top === 'labcoat') inkLine(g, [add(p.sh, mul(n, 2)), add(bot, mul(n, 3))], { w });
  if (top === 'suit') inkShape(g, [add(p.sh, mul(u, 2)), add(add(p.sh, mul(u, 6)), mul(n, 4)), add(at(p.sh, p.hip, 0.7), mul(n, 1)), add(add(p.sh, mul(u, 6)), mul(n, -2))], { fill: of.color2 || '#d9483b', w });
  if (of.emblem === 'bolt') { const c0 = at(p.sh, p.hip, 0.5), q = (a, b) => add(add(c0, mul(u, a)), mul(n, b)); circle(g, 0, 0, 0, 'transparent'); g.beginPath(); [[-15, 3], [-2, 3], [-12, 14], [14, -3], [2, -3], [10, -15]].forEach(([a, b], i) => { const P = q(a * -0.6 - 4, b * 0.5); i ? g.lineTo(P[0], P[1]) : g.moveTo(P[0], P[1]); }); g.closePath(); g.fillStyle = of.color2 || '#fff'; g.fill(); }
  if (top === 'hoodie') inkLine(g, [add(at(p.sh, p.hip, 0.72), mul(n, -10)), add(at(p.sh, p.hip, 0.72), mul(n, 10))], { w });
}
const sleeveOf = (of) => (['shirt', 'hoodie', 'labcoat', 'suit', 'robe'].includes(of.top) ? 'long' : ['tshirt', 'dress'].includes(of.top) ? 'short' : null);
const sleeveCol = (of) => of.color || { labcoat: '#f4f3ee', suit: '#2f3340' }[of.top] || '#4a90d9';

function limb(g, a, b, c, w) { inkLine(g, [a, b, c], { w, smooth: false }); }
function arm(g, of, sh, e, h, far) {
  const w = LINE().width * 1.15 * CH().limb;
  limb(g, sh, e, h, w);
  const sl = sleeveOf(of);
  if (sl === 'long') inkTube(g, [sh, e, at(e, h, 0.72)], 11, far ? shade(sleeveCol(of), -0.12) : sleeveCol(of), { smooth: false });
  if (sl === 'short') inkTube(g, [sh, at(sh, e, 0.6)], 12, far ? shade(sleeveCol(of), -0.12) : sleeveCol(of), { smooth: false });
  if (of.whiteHands) inkCircle(g, h[0], h[1], w * 1.5, { fill: of.skin || SKIN(), w: LINE().width * 0.7, seed: 90 }); else circle(g, h[0], h[1], w * 0.9, S().ink);
}
function leg(g, of, hip, k, f, far) {
  const w = LINE().width * 1.15 * CH().limb;
  if (of.shorts) { limb(g, hip, k, f, w); inkTube(g, [at(hip, k, -0.05), at(hip, k, 0.62)], 21, far ? shade(of.shorts, -0.12) : of.shorts, { smooth: false }); }
  else if (of.legs) inkTube(g, [hip, k, at(k, f, 0.85)], 12, far ? shade(of.legs, -0.12) : of.legs, { smooth: false });
  else limb(g, hip, k, f, w);
  if (of.sneakers) { const sc = far ? shade(of.shoes, -0.12) : of.shoes; inkEllipse(g, f[0] + 8, f[1] - 9, 15, 10, { fill: sc, seed: far ? 81 : 82, w: LINE().width * 0.6 }); inkShape(g, [[f[0] - 8, f[1] - 3], [f[0] + 26, f[1] - 3], [f[0] + 26, f[1] + 3], [f[0] - 8, f[1] + 3]], { fill: '#ffffff', seed: far ? 83 : 84, w: LINE().width * 0.5 }); }
  else inkEllipse(g, f[0] + 6, f[1] - 4, 10, 5.5, { fill: of.shoes || S().ink, seed: far ? 81 : 82, w: LINE().width * 0.6 });
}

// ---------- props ----------
function prop(g, pr, p, t) {
  const o = typeof pr === 'string' ? { type: pr } : pr, h = o.hand === 'B' ? p.hB : p.hF, w = LINE().width * 0.8;
  switch (o.type) {
    case 'spear': inkLine(g, [[h[0] - 20, h[1] + 30], [h[0] + 70, h[1] - 130]], { w: w * 1.3, stroke: '#7a5230' }); inkShape(g, [[h[0] + 62, h[1] - 120], [h[0] + 90, h[1] - 168], [h[0] + 78, h[1] - 114]], { fill: '#9aa3ad', w }); break;   // held forward, clear of the big head
    case 'torch': { inkTube(g, [h, [h[0] + 8, h[1] - 40]], 7, '#7a5230', {}); const fl = 1 + 0.12 * Math.sin((E.t || 0) * 19); inkShape(g, [[h[0] - 4, h[1] - 40], [h[0] + 8, h[1] - 40 - 34 * fl], [h[0] + 22, h[1] - 42]], { fill: '#f5a524', smooth: true, w, seed: 90 + Math.floor((E.t || 0) * 8) }); break; }
    case 'stone': inkBlob(g, [[h[0] - 4, h[1] - 6], [h[0] + 14, h[1] - 14], [h[0] + 22, h[1]], [h[0] + 6, h[1] + 8]], { fill: '#9a948a', w }); break;
    case 'phone': g.save(); inkShape(g, [[h[0] - 2, h[1] - 26], [h[0] + 14, h[1] - 26], [h[0] + 14, h[1] + 2], [h[0] - 2, h[1] + 2]], { fill: '#3a3f4a', w }); g.restore(); break;
    case 'book': inkShape(g, [[h[0] - 4, h[1] - 30], [h[0] + 30, h[1] - 34], [h[0] + 30, h[1] + 4], [h[0] - 4, h[1] + 8]], { fill: o.color || '#d9483b', w }); break;
    case 'cup': inkShape(g, [[h[0] - 2, h[1] - 20], [h[0] + 14, h[1] - 20], [h[0] + 12, h[1] + 2], [h[0], h[1] + 2]], { fill: '#f4f3ee', w }); break;
    case 'pointer': inkLine(g, [h, [h[0] + 80, h[1] - 54]], { w, stroke: '#7a5230' }); break;
    case 'sign': inkLine(g, [h, [h[0] + 4, h[1] - 90]], { w: w * 1.3, stroke: '#7a5230' }); inkShape(g, [[h[0] - 46, h[1] - 150], [h[0] + 54, h[1] - 150], [h[0] + 54, h[1] - 86], [h[0] - 46, h[1] - 86]], { fill: o.color || '#f4f3ee', w }); break;
  }
}
const inkBlob = (g, pts, o) => inkShape(g, pts, { smooth: true, ...o });

// ---------- main draw ----------
export function drawDoodle(g, o) {
  const p = o.pose || POSES.stand, of = o.outfit || {}, kid = !!of.kid, s = (o.s ?? 1) * (kid ? 0.72 : 1), f = o.facing ?? 1;
  g.save(); if (o.alpha != null) g.globalAlpha *= o.alpha;
  if (o.shadow !== false && !o.rot) contact(g, o.x, o.y + 2, 40 * s);
  g.translate(o.x, o.y); g.scale(f * s, s);
  if (o.rot) { g.translate(p.hip[0], p.hip[1]); g.rotate(o.rot); g.translate(-p.hip[0], -p.hip[1]); }
  const H = headGeom(p, kid), skin = of.skin || SKIN();
  // back layer
  hairBack(g, of, H.c, H.r);
  leg(g, of, p.hip, p.kB, p.fB, true);
  arm(g, of, p.sh, p.eB, p.hB, true);
  // body (у платья передняя нога рисуется ДО тела, чтобы подол закрывал ногу)
  if (of.top === 'dress') leg(g, of, p.hip, p.kF, p.fF, false);
  drawTorso(g, of, p);
  if (of.top !== 'dress') leg(g, of, p.hip, p.kF, p.fF, false);
  // head
  inkCircle(g, H.c[0], H.c[1], H.r, { fill: skin, w: LINE().width * 1.1, seed: 33 });
  beard(g, of, H.c, H.r);
  hairTop(g, of, H.c, H.r);
  face(g, H.c[0], H.c[1], H.r, { arcBrows: of.arcBrows, browDrop: of.browDrop, expr: o.expr, talk: o.talk, blink: o.blink, look: o.look, override: o.face, color: S().ink });
  glasses(g, of, H.c, H.r, false);
  hat(g, of, H.c, H.r, false);
  // near arm on top
  arm(g, of, p.sh, p.eF, p.hF, false);
  if (o.prop) prop(g, o.prop, p, E.t);
  g.restore();
}

export function doodleHead(o) {
  const p = o.pose || POSES.stand, kid = !!o.outfit?.kid, s = (o.s ?? 1) * (kid ? 0.72 : 1), f = o.facing ?? 1, H = headGeom(p, kid);
  let [x, y] = H.c;
  if (o.rot) { const [hx, hy] = p.hip, c = Math.cos(o.rot), sn = Math.sin(o.rot); [x, y] = [hx + (x - hx) * c - (y - hy) * sn, hy + (x - hx) * sn + (y - hy) * c]; }
  return [o.x + x * f * s, o.y + y * s, H.r * s];
}

// frame-filling close-up: shoulders at the bottom, big head, front-facing face
export function doodleCloseUp(g, cx, cy, r, o = {}) {
  const of = o.outfit || {}, skin = of.skin || SKIN(), R = r / 3.2, k = 3.2;   // drawn at the normal head size, scaled up: lines thicken like a real close-up
  g.save(); g.translate(cx, cy); if (o.tilt) g.rotate(o.tilt); g.scale(k, k);
  const col = of.top && of.top !== 'none' ? of.color || { labcoat: '#f4f3ee', fur: '#a9733f', suit: '#2f3340' }[of.top] || '#4a90d9' : null;
  if (col) inkShape(g, [[-R * 1.35, R * 2.6], [-R * 1.25, R * 1.45], [-R * 0.6, R * 1.02], [R * 0.6, R * 1.02], [R * 1.25, R * 1.45], [R * 1.35, R * 2.6]], { fill: col, smooth: true, seed: 71 });
  else inkLine(g, [[0, R * 0.9], [0, R * 2.6]], { w: LINE().width * 1.3 });
  if (['long', 'ponytail', 'bun'].includes(of.hair)) hairBack(g, of, [0, 0], R);
  inkCircle(g, 0, 0, R, { fill: skin, w: LINE().width * 1.1, seed: 34 });
  beard(g, of, [0, 0], R);
  hairTop(g, of, [0, 0], R, true);
  face(g, 0, 0, R, { arcBrows: of.arcBrows, browDrop: of.browDrop, expr: o.expr, talk: o.talk, blink: o.blink, look: o.look, front: true, override: o.face, color: S().ink });
  glasses(g, of, [0, 0], R, true);
  hat(g, of, [0, 0], R, true);
  g.restore();
}
