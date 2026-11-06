// engine/toons.js — space and science-cartoon helpers for face-object packs: starry backdrops with nebulae,
// ready-made planet characters, sun rays. Characters are drawn by the faceobj family (drawCharacter / drawFaceObj).
import { E, S, rng, noise, alpha, circle, linGrad, radGrad } from './core.js';
import { drawFaceObj } from './rig-faceobj.js';
import { LINE, inkLine, inkShape, inkEllipse } from './ink.js';

// space(g, t, { top, bottom, stars, nebulae:[{x,y,r,color}], seed }) — flat-cartoon space backdrop
export function space(g, t = 0, o = {}) {
  const M = o.colors || {}; g.fillStyle = linGrad(g, 0, 0, 0, E.H, [M.top || '#130f2e', M.bottom || '#2a1c4f']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  for (const n of o.nebulae ?? [{ x: 0.2, y: 0.3, r: 0.35, color: '#7b3fa0' }, { x: 0.8, y: 0.7, r: 0.4, color: '#2f6fa8' }]) {
    g.save(); g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 5; i++) { const dx = noise(i * 1.7, 3) * n.r * 0.5, dy = noise(i * 2.3, 5) * n.r * 0.4, rr = n.r * (0.55 + 0.1 * i); g.fillStyle = radGrad(g, (n.x + dx) * E.W, (n.y + dy) * E.H, 0, rr * E.W, [alpha(n.color, 0.22), alpha(n.color, 0)]); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); }
    g.restore();
  }
  const r = rng(o.seed ?? 21), N = o.stars ?? 160;
  for (let i = 0; i < N; i++) { const x = r() * E.W * 1.4 - E.W * 0.2, y = r() * E.H * 1.4 - E.H * 0.2, s = r(), tw = 0.55 + 0.45 * Math.sin(t * (1 + s * 2) + i); if (s > 0.93) { const R = 6 + s * 6; g.save(); g.globalAlpha = tw; inkLine(g, [[x - R, y], [x + R, y]], { w: 2.5, stroke: '#fff7d6', wobble: 0 }); inkLine(g, [[x, y - R], [x, y + R]], { w: 2.5, stroke: '#fff7d6', wobble: 0 }); g.restore(); } else circle(g, x, y, 1 + s * 2.2, alpha('#ffffff', 0.35 + 0.6 * s * tw)); }
}

// planet presets: planet(g, 'earth', x, y, r, { expr, look, blink, talk, center:true, … any drawFaceObj option })
const PRESETS = {
  sun: { fill: '#ffcf33', surface: { type: 'shade', color: 'rgba(230,120,0,.25)' } },
  mercury: { fill: '#b9a99a', surface: { type: 'craters', colors: ['#9b8b7c'] } },
  venus: { fill: '#e8c27a', surface: { type: 'bands', colors: ['rgba(200,140,60,.25)', 'rgba(255,255,255,.15)', 'rgba(200,140,60,.25)'] } },
  earth: { fill: '#3d8fe0', continents: true },
  moon: { fill: '#d9d9d9', surface: { type: 'craters', colors: ['#bdbdbd', '#c9c9c9'] } },
  mars: { fill: '#d9603b', surface: { type: 'craters', colors: ['#b84a2b', '#c9573a'] } },
  jupiter: { fill: '#e2b07a', surface: { type: 'bands', colors: ['#c98b55', '#f1d2a6', '#b8743f', '#f1d2a6', '#c98b55', '#e8c39a'] } },
  saturn: { fill: '#e8cc8a', surface: { type: 'bands', colors: ['#d4b06a', '#f2e0b0', '#c9a35a', '#f2e0b0'] }, ring: '#cbb37a' },
  uranus: { fill: '#9fe3e8', surface: { type: 'shade', color: 'rgba(40,120,140,.2)' } },
  neptune: { fill: '#3f6fe0', surface: { type: 'bands', colors: ['rgba(255,255,255,.12)', 'rgba(0,0,60,.15)', 'rgba(255,255,255,.12)'] } },
};
export const planetNames = () => Object.keys(PRESETS);
export function planet(g, kind, x, y, r, o = {}) {
  const P = PRESETS[kind] || { fill: kind }, ring = o.ring ?? P.ring;
  const ringPart = (front) => { g.save(); g.translate(x, o.center === false ? y - r : y); g.rotate(-0.25); g.beginPath(); front ? g.rect(-r * 2, 0, r * 4, r * 2) : g.rect(-r * 2, -r * 2, r * 4, r * 2); g.clip(); inkEllipse(g, 0, 0, r * 1.75, r * 0.42, { w: r * 0.16 + LINE().width * 2, stroke: S().ink, wobble: 0 }); inkEllipse(g, 0, 0, r * 1.75, r * 0.42, { w: r * 0.16, stroke: ring, wobble: 0 }); g.restore(); };
  if (kind === 'sun' && o.rays !== false) sunRays(g, x, o.center === false ? y - r : y, r, o.t ?? E.t ?? 0);
  if (ring) ringPart(false);
  drawFaceObj(g, { center: true, ...P, ...o, x, y, r, surface: o.surface ?? P.surface });
  if (P.continents) { g.save(); g.beginPath(); g.arc(x, y, r * 0.98, 0, Math.PI * 2); g.clip(); [[-0.45, -0.35, 0.42], [0.35, 0.25, 0.38], [0.5, -0.55, 0.22], [-0.3, 0.6, 0.25]].forEach(([cx, cy, k], i) => inkShape(g, [...Array(9)].map((_, j) => { const a = (j / 9) * Math.PI * 2, rr = r * k * (1 + 0.25 * Math.sin(j * 2.3 + i)); return [x + cx * r + Math.cos(a) * rr, y + cy * r + Math.sin(a) * rr * 0.8]; }), { fill: '#5cb85c', smooth: true, w: LINE().width * 0.6, seed: 300 + i })); g.restore(); drawFaceObj(g, { center: true, ...o, x, y, r, fill: 'rgba(0,0,0,0)', shadow: false, accessory: o.accessory }); }
  if (ring) ringPart(true);
}
export function sunRays(g, x, y, r, t = 0) {
  g.save(); g.translate(x, y); g.rotate(t * 0.15);
  for (let i = 0; i < 14; i++) { const a = (i / 14) * Math.PI * 2, r0 = r * 1.15, r1 = r * (1.45 + 0.08 * Math.sin(t * 3 + i)); inkShape(g, [[Math.cos(a - 0.09) * r0, Math.sin(a - 0.09) * r0], [Math.cos(a) * r1, Math.sin(a) * r1], [Math.cos(a + 0.09) * r0, Math.sin(a + 0.09) * r0]], { fill: '#ffb21e', seed: 200 + i }); }
  g.restore();
}
