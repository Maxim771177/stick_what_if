// engine/rig-faceobj.js — character family "faceobj": any object with a face. Countryballs, personified planets,
// talking coins, cells, map regions with eyes. Outlined with the variant's ink line (ink.js).
//
// drawFaceObj(g, { x, y, s, r, center, shape, fill, flag, surface, path, facing, expr, blink, look, talk,
//                  eyes, mouth, squash, rot, alpha, shadow, accessory, limbs, pose })
//   x, y      bottom contact point (default) or the centre when `center: true`
//   r         radius in logical px (default 70 * s)
//   shape     'ball' | 'blob' | 'square' | 'drop' | 'star' | 'path' (with `path`: points relative to the centre, in units of r)
//   fill      colour · flag: country name or flags.js spec (clipped into the shape) · surface: { type: 'bands'|'craters'|'spots', colors }
//   eyes      'ball' (countryball: white ovals, no pupils) | 'googly' (white + pupils) | 'dot' — default from pack characters.eyes
//   mouth     true/false — default from pack characters.mouth
//   squash    -1..1 (positive = squashed flat on landing, negative = stretched); rot = tilt in radians
//   accessory 'helmet' | 'crown' | 'tophat' | 'glasses' | 'cap'
//   limbs     true: tiny stick arms and legs driven by the shared skeleton pose (`pose`)
import { E, S, clamp, lerp, shade, alpha, circle } from './core.js';
import { POSES } from './skeleton.js';
import { LINE, inkShape, inkCircle, inkEllipse, inkLine, contact } from './ink.js';
import { paintFlag } from './flags.js';

const CH = () => ({ eyes: 'ball', mouth: true, ...(E.pack?.characters || {}) });

function outline(shape, r, path) {
  const P = [];
  if (shape === 'square') { const k = 0.92; [[-k, -k], [k, -k], [k, k], [-k, k]].forEach(([x, y]) => P.push([x * r, y * r])); return { pts: P, smooth: false }; }
  if (shape === 'drop') { for (let i = 0; i < 24; i++) { const a = (i / 24) * Math.PI * 2 - Math.PI / 2, rr = r * (1 - 0.35 * Math.max(0, -Math.sin(a)) ** 3); P.push([Math.cos(a) * rr * (a < 0 ? 0.9 : 1), Math.sin(a) * r * (Math.sin(a) < 0 ? 1.25 : 1)]); } return { pts: P, smooth: true }; }
  if (shape === 'star') { for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.55 : r * 1.1; P.push([Math.cos(a) * rr, Math.sin(a) * rr]); } return { pts: P, smooth: false }; }
  if (shape === 'blob') { for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2, rr = r * (1 + 0.08 * Math.sin(i * 2.7)); P.push([Math.cos(a) * rr, Math.sin(a) * rr]); } return { pts: P, smooth: true }; }
  if (shape === 'path' && path) return { pts: path.map(([x, y]) => [x * r, y * r]), smooth: false };
  for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2; P.push([Math.cos(a) * r, Math.sin(a) * r]); }
  return { pts: P, smooth: true };
}
function surface(g, sf, r) {
  if (!sf) return; const cols = sf.colors || ['rgba(0,0,0,.18)'];
  if (sf.type === 'bands') cols.forEach((c, i) => { const y = -r + (i + 0.5) * (2 * r / cols.length); g.fillStyle = c; g.fillRect(-r * 1.2, y - r * 0.09, r * 2.4, r * 0.18); });
  if (sf.type === 'craters' || sf.type === 'spots') { const sp = sf.at || [[-0.4, -0.35, 0.18], [0.35, 0.3, 0.14], [-0.2, 0.45, 0.1], [0.45, -0.3, 0.09], [0.05, -0.05, 0.07]]; sp.forEach(([x, y, k], i) => sf.type === 'craters' ? inkCircle(g, x * r, y * r, k * r, { fill: cols[i % cols.length], w: LINE().width * 0.45, seed: 90 + i }) : circle(g, x * r, y * r, k * r, cols[i % cols.length])); }
  if (sf.type === 'shade') { g.fillStyle = sf.color || 'rgba(0,0,0,.15)'; g.beginPath(); g.arc(0, 0, r * 1.05, 0, Math.PI * 2); g.arc(-r * 0.18, -r * 0.18, r * 0.98, 0, Math.PI * 2, true); g.fill('evenodd'); }
}

// ---------- eyes & mouth ----------
const LID = { angry: 'angry', determined: 'angry', sad: 'sad', worried: 'sad', scared: 'sad', nervous: 'sad', cry: 'sad', sleepy: 'half', smirk: 'half', happy: 'arc', joy: 'arc', thinking: 'side', confused: 'one' };
function eyes(g, o, r, style) {
  const ink = S().ink, w = LINE().width * 0.6, e = o.expr || 'neutral', lid = LID[e], f = o.facing ?? 1;
  const big = ['surprised', 'shocked', 'awe', 'scared'].includes(e) ? 1.18 : 1, look = o.look || (lid === 'side' ? [0.6, -0.5] : [0, 0]);
  const ex = [-0.32, 0.32].map(x => (x + 0.1 * f) * r), ey = -0.12 * r, ER = (style === 'googly' ? 0.25 : 0.2) * r * big, EH = style === 'ball' ? ER * 1.25 : ER;
  ex.forEach((x, i) => {
    if (o.blink || e === 'sleepy') { inkLine(g, [[x - ER, ey + EH * 0.2], [x + ER, ey + EH * 0.2]], { w: w * 1.3, wobble: 0 }); return; }
    if (lid === 'arc') { g.save(); g.strokeStyle = ink; g.lineWidth = w * 1.5; g.lineCap = 'round'; g.beginPath(); g.arc(x, ey + EH * 0.35, ER * 0.9, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); g.restore(); return; }
    if (style === 'dot') { circle(g, x + look[0] * r * 0.06, ey + look[1] * r * 0.06, r * 0.08 * big, ink); return; }
    inkEllipse(g, x, ey, ER, EH, { fill: '#ffffff', w, seed: 70 + i, wobble: LINE().wobble * 0.3 });
    if (style === 'googly') circle(g, x + look[0] * ER * 0.45, ey + look[1] * EH * 0.45, ER * 0.45, ink);
    // eyelids: a filled cut in the body colour + an ink edge
    const lidCut = (ax, ay, bx, by) => { g.save(); g.beginPath(); g.ellipse(x, ey, ER + w, EH + w, 0, 0, Math.PI * 2); g.clip(); g.beginPath(); g.moveTo(ax, ay); g.lineTo(bx, by); g.lineTo(bx, ey - EH * 2); g.lineTo(ax, ey - EH * 2); g.closePath(); if (o._lidPaint) { g.clip(); o._lidPaint(g); } else { g.fillStyle = o._body || ink; g.fill(); } g.restore(); inkLine(g, [[ax, ay], [bx, by]], { w: w * 1.2, wobble: 0 }); };
    const inner = i === 0 ? 1 : -1;   // +1 = toward the centre on the left eye
    if (lid === 'angry') lidCut(x - ER * 1.1, ey - EH * (inner > 0 ? 0.9 : 0.1), x + ER * 1.1, ey - EH * (inner > 0 ? 0.1 : 0.9));
    if (lid === 'sad') lidCut(x - ER * 1.1, ey - EH * (inner > 0 ? 0.2 : 0.95), x + ER * 1.1, ey - EH * (inner > 0 ? 0.95 : 0.2));
    if (lid === 'half') lidCut(x - ER * 1.1, ey - EH * 0.05, x + ER * 1.1, ey - EH * 0.05);
    if (lid === 'one' && i === 1) lidCut(x - ER * 1.1, ey - EH * 0.3, x + ER * 1.1, ey - EH * 0.45);
  });
  if (e === 'cry') ex.forEach(x => inkEllipse(g, x, ey + EH * 1.5, r * 0.05, r * 0.09, { fill: '#8fd0ff', w: w * 0.6 }));
  if (e === 'nervous') inkEllipse(g, r * 0.62 * f, -r * 0.55, r * 0.06, r * 0.1, { fill: '#9fd8ff', w: w * 0.6 });
}
function mouth(g, o, r) {
  const e = o.expr || 'neutral', w = LINE().width * 0.7, f = o.facing ?? 1, mx = 0.1 * f * r, my = r * 0.36, talk = o.talk || 0;
  if (talk > 0.05) { inkEllipse(g, mx, my, r * 0.14, r * (0.05 + 0.13 * talk), { fill: '#5a1f1f', w, wobble: 0 }); return; }
  const arc = (cy, R, a0, a1) => { g.save(); g.strokeStyle = S().ink; g.lineWidth = w * 1.2; g.lineCap = 'round'; g.beginPath(); g.arc(mx, cy, R, a0, a1); g.stroke(); g.restore(); };
  switch (e) {
    case 'happy': case 'joy': inkShape(g, [[mx - r * 0.24, my - r * 0.04], [mx + r * 0.24, my - r * 0.04], [mx + r * 0.12, my + r * 0.16], [mx - r * 0.12, my + r * 0.16]], { fill: '#5a1f1f', smooth: true, w, wobble: 0 }); break;
    case 'smile': case 'smirk': case 'neutral': arc(my - r * 0.12, r * 0.18, 0.35, Math.PI - 0.35); break;
    case 'sad': case 'cry': case 'worried': arc(my + r * 0.14, r * 0.16, Math.PI + 0.45, Math.PI * 2 - 0.45); break;
    case 'surprised': case 'shocked': case 'awe': case 'scared': inkEllipse(g, mx, my + r * 0.02, r * 0.09, r * 0.12, { fill: '#5a1f1f', w, wobble: 0 }); break;
    case 'angry': case 'determined': inkLine(g, [[mx - r * 0.16, my + r * 0.04], [mx + r * 0.16, my]], { w: w * 1.2, wobble: 0 }); break;
    default: inkLine(g, [[mx - r * 0.12, my], [mx + r * 0.12, my]], { w: w * 1.2, wobble: 0 });
  }
}
function accessory(g, o, r) {
  const a = o.accessory; if (!a) return; const ink = S().ink;
  if (a === 'helmet') inkShape(g, [...[...Array(13)].map((_, i) => { const t = Math.PI + (i / 12) * Math.PI; return [Math.cos(t) * r * 1.06, -r * 0.18 + Math.sin(t) * r * 0.95]; }), [r * 1.2, -r * 0.18], [-r * 1.2, -r * 0.18]], { fill: o.accColor || '#5b6b3a', seed: 81 });
  if (a === 'crown') inkShape(g, [[-r * 0.5, -r * 0.82], [-r * 0.55, -r * 1.3], [-r * 0.25, -r * 1.05], [0, -r * 1.4], [r * 0.25, -r * 1.05], [r * 0.55, -r * 1.3], [r * 0.5, -r * 0.82]], { fill: o.accColor || '#f6c445', seed: 82 });
  if (a === 'tophat') { inkShape(g, [[-r * 0.45, -r * 0.85], [-r * 0.42, -r * 1.55], [r * 0.42, -r * 1.55], [r * 0.45, -r * 0.85]], { fill: o.accColor || '#22232a', seed: 83 }); inkEllipse(g, 0, -r * 0.86, r * 0.75, r * 0.12, { fill: o.accColor || '#22232a', seed: 84 }); }
  if (a === 'cap') inkShape(g, [...[...Array(11)].map((_, i) => { const t = Math.PI + (i / 10) * Math.PI; return [Math.cos(t) * r * 0.98, -r * 0.3 + Math.sin(t) * r * 0.75]; }), [r * 1.5 * (o.facing ?? 1), -r * 0.32], [-r * 0.98, -r * 0.3]], { fill: o.accColor || '#d9483b', seed: 85 });
  if (a === 'glasses') { [-0.32, 0.32].forEach((x, i) => inkCircle(g, (x + 0.1 * (o.facing ?? 1)) * r, -0.12 * r, r * 0.26, { w: LINE().width * 0.6, seed: 86 + i, wobble: 0 })); }
}
function limbs(g, o, r) {
  const p = o.pose || POSES.stand, k = r / 70, w = LINE().width * 0.9, f = o.facing ?? 1;
  const map = ([x, y]) => [x * k * 0.55 * f, r * 0.85 + (y + 100) * k * 0.55];   // skeleton hip (0,-100) sits at the bottom of the body
  const arm = (e, h) => inkLine(g, [[0.85 * r * (h[0] > 0 ? f : -f), 0], map(e), map(h)], { w, smooth: false });
  inkLine(g, [[-r * 0.3, r * 0.92], map(p.kB), map(p.fB)], { w, smooth: false }); inkLine(g, [[r * 0.3, r * 0.92], map(p.kF), map(p.fF)], { w, smooth: false });
  return () => { arm(p.eB, p.hB); arm(p.eF, p.hF); };
}

export function drawFaceObj(g, o) {
  const s = o.s ?? 1, r = o.r ?? 70 * s, sq = clamp(o.squash || 0, -0.6, 0.6), shape = o.shape || 'ball', ch = CH();
  const cx = o.x, cy = o.center ? o.y : o.y - r * (1 - sq * 0.5) - (o.limbs ? r * 0.75 : 0);
  g.save(); if (o.alpha != null) g.globalAlpha *= o.alpha;
  if (o.shadow !== false && !o.center) contact(g, o.x, o.y + 2, r * 0.9);
  g.translate(cx, cy); if (o.rot) g.rotate(o.rot); g.scale(1 + sq * 0.35, 1 - sq * 0.35);
  const after = o.limbs ? limbs(g, o, r) : null;
  const { pts, smooth } = outline(shape, r, o.path);
  const body = o.fill || (o.flag ? '#ffffff' : '#f6c445');
  inkShape(g, pts, { fill: body, smooth, w: LINE().width * 1.1, seed: o.seed ?? 61 });
  if (o.flag || o.surface) {
    g.save(); g.beginPath(); smooth ? (() => { const n = pts.length, m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; g.moveTo(...m(pts[n - 1], pts[0])); for (let i = 0; i < n; i++) { const c = pts[i], nx = m(c, pts[(i + 1) % n]); g.quadraticCurveTo(c[0], c[1], nx[0], nx[1]); } })() : pts.forEach((p, i) => (i ? g.lineTo(...p) : g.moveTo(...p))); g.closePath(); g.clip();
    if (o.flag) paintFlag(g, o.flag, -r * 1.25, -r * 1.05, r * 2.5, r * 2.1);
    surface(g, o.surface, r);
    g.restore();
    inkShape(g, pts, { smooth, w: LINE().width * 1.1, seed: o.seed ?? 61 });   // re-ink the outline over the flag
  }
  const eyeStyle = o.eyes || ch.eyes;
  const lidPaint = o.flag ? (gg) => paintFlag(gg, o.flag, -r * 1.25, -r * 1.05, r * 2.5, r * 2.1) : null;   // eyelids show the flag / body under them
  if (eyeStyle !== 'none') eyes(g, { ...o, _body: o.lidColor || body, _lidPaint: o.lidColor ? null : lidPaint }, r, eyeStyle);
  if (o.mouth ?? ch.mouth) mouth(g, o, r);
  accessory(g, o, r);
  if (after) after();
  g.restore();
}
export function faceObjHead(o) { const s = o.s ?? 1, r = o.r ?? 70 * s; return [o.x, o.center ? o.y : o.y - r - (o.limbs ? r * 0.75 : 0), r]; }
export function faceObjCloseUp(g, cx, cy, r, o = {}) { drawFaceObj(g, { ...o, x: cx, y: cy, r, center: true, shadow: false }); }
// faceOn(g, x, y, r, o) — just the eyes + mouth, centred at x,y: put a face on anything (a map region, a building, a cloud).
// o.lidColor should be the colour under the face (for eyelids).
export function faceOn(g, x, y, r, o = {}) {
  g.save(); g.translate(x, y);
  eyes(g, { ...o, _body: o.lidColor || '#ffffff' }, r, o.eyes || CH().eyes);
  if (o.mouth ?? CH().mouth) mouth(g, o, r);
  g.restore();
}
