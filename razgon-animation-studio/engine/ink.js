// engine/ink.js — outlined, optionally hand-drawn shapes for line-art packs (doodle, cartoon, flat-with-outline).
// Every shape = fill + outline in the variant's ink. The line treatment comes from the variant's `line` tokens:
//   line: { width: 6,        outline width in logical px at scale 1
//           wobble: 1.2,     hand-drawn jitter amplitude in px (0 = clean vector)
//           boil: 0 }        re-jitter this many times per second ("line boil"); 0 = the wobble stays still
// Use these in sets, props and characters of such packs so everything shares one line quality.
import { E, S, noise, circle, alpha } from './core.js';

export const LINE = () => ({ width: 6, wobble: 0, boil: 0, join: 'round', ...(S()?.line || {}) });
const tick = (l) => (l.boil > 0 ? Math.floor((E.t || 0) * l.boil) : 0);

// jitter a polyline: subdivide to ~step px and push points sideways by smooth noise
export function jitter(pts, amp, seed = 1, step = 14, closed = false) {
  if (!amp) return pts;
  const out = [], n = pts.length, segs = closed ? n : n - 1;
  for (let i = 0; i < segs; i++) {
    const a = pts[i], b = pts[(i + 1) % n], len = Math.hypot(b[0] - a[0], b[1] - a[1]), k = Math.max(1, Math.round(len / step));
    const nx = -(b[1] - a[1]) / (len || 1), ny = (b[0] - a[0]) / (len || 1);
    for (let j = 0; j < k; j++) {
      const u = j / k, idx = out.length;
      const d = noise(idx * 0.55 + seed * 3.1, seed) * amp;
      out.push([a[0] + (b[0] - a[0]) * u + nx * d, a[1] + (b[1] - a[1]) * u + ny * d]);
    }
  }
  if (!closed) { const z = pts[n - 1]; out.push([z[0] + noise(out.length * 0.55, seed) * amp * 0.5, z[1]]); }
  return out;
}
// smooth path through points (quadratic curves via midpoints)
function smoothPath(g, pts, closed) {
  g.beginPath();
  if (pts.length < 3) { g.moveTo(...pts[0]); pts.slice(1).forEach(p => g.lineTo(...p)); if (closed) g.closePath(); return; }
  if (closed) {
    const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], n = pts.length;
    g.moveTo(...m(pts[n - 1], pts[0]));
    for (let i = 0; i < n; i++) { const c = pts[i], nx = m(c, pts[(i + 1) % n]); g.quadraticCurveTo(c[0], c[1], nx[0], nx[1]); }
    g.closePath();
  } else {
    g.moveTo(...pts[0]);
    for (let i = 1; i < pts.length - 1; i++) { const c = pts[i], nx = [(c[0] + pts[i + 1][0]) / 2, (c[1] + pts[i + 1][1]) / 2]; g.quadraticCurveTo(c[0], c[1], nx[0], nx[1]); }
    g.lineTo(...pts[pts.length - 1]);
  }
}

// inkShape(g, pts, { fill, stroke, w, closed=true, smooth=false, seed, wobble }) — the base of everything below
export function inkShape(g, pts, o = {}) {
  const l = LINE(), closed = o.closed ?? true, w = o.w ?? l.width, amp = o.wobble ?? l.wobble;
  const P = jitter(pts, amp, (o.seed ?? 1) + tick(l) * 17, o.step ?? 14, closed);
  g.save(); g.lineJoin = 'round'; g.lineCap = 'round';
  if (o.smooth) smoothPath(g, P, closed); else { g.beginPath(); g.moveTo(...P[0]); for (let i = 1; i < P.length; i++) g.lineTo(...P[i]); if (closed) g.closePath(); }
  if (o.fill && closed) { g.fillStyle = o.fill; g.fill(); }
  if (w > 0 && o.stroke !== false) { g.strokeStyle = o.stroke || S().ink; g.lineWidth = w; g.stroke(); }
  g.restore();
}
const ring = (cx, cy, rx, ry, n = 28, rot = 0) => [...Array(n)].map((_, i) => { const a = (i / n) * Math.PI * 2; const c = Math.cos(rot), s = Math.sin(rot), x = Math.cos(a) * rx, y = Math.sin(a) * ry; return [cx + x * c - y * s, cy + x * s + y * c]; });
export const inkCircle = (g, x, y, r, o = {}) => inkShape(g, ring(x, y, r, r, Math.max(14, Math.round(r / 3))), { smooth: true, ...o });
export const inkEllipse = (g, x, y, rx, ry, o = {}) => inkShape(g, ring(x, y, rx, ry, Math.max(14, Math.round(Math.max(rx, ry) / 3)), o.rot || 0), { smooth: true, ...o });
export function inkRect(g, x, y, w, h, o = {}) {
  const r = Math.min(o.r ?? 6, w / 2, h / 2), pts = [];
  const corner = (cx, cy, a0) => { for (let i = 0; i <= 3; i++) { const a = a0 + (i / 3) * Math.PI / 2; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } };
  corner(x + w - r, y + r, -Math.PI / 2); corner(x + w - r, y + h - r, 0); corner(x + r, y + h - r, Math.PI / 2); corner(x + r, y + r, Math.PI);
  inkShape(g, pts, o);
}
// open stroke (lines, limbs, hair strands, arrows): one ink line of width w
export const inkLine = (g, pts, o = {}) => inkShape(g, pts, { closed: false, smooth: o.smooth ?? pts.length > 2, ...o, fill: null, w: o.w ?? LINE().width });
// outlined tube: a thick stroke of `fill` colour with an ink outline around it (sleeves, trouser legs, tails, branches)
export function inkTube(g, pts, width, fill, o = {}) {
  const l = LINE(), ow = o.ow ?? l.width * 0.85;
  inkLine(g, pts, { ...o, w: width + ow * 2, stroke: o.stroke || S().ink });
  inkLine(g, pts, { ...o, w: width, stroke: fill, wobble: 0 });
}
// closed smooth blob through control points (bushes, clouds, hair, rocks)
export const inkBlob = (g, pts, o = {}) => inkShape(g, pts, { smooth: true, ...o });
// a soft flat shadow ellipse under things (flat styles have no lighting, just contact)
export function contact(g, x, y, rx, a) { g.save(); g.fillStyle = alpha(S().ink, a ?? S().contactShadow ?? 0.12); g.beginPath(); g.ellipse(x, y, rx, rx * 0.16, 0, 0, Math.PI * 2); g.fill(); g.restore(); }
export const dot = (g, x, y, r, c) => circle(g, x, y, r, c || S().ink);
