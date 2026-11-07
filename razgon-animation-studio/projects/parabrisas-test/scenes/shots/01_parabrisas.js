// 30s silent test: "El secreto para dejar el parabrisas impecable" — Leon + razgon-stickman
import { E, V, registerShot, mood, blurLayer, veil, ease, prog, clamp, lerp, shake, seg, circle, ring, rr, poly, glow, alpha, shade, text } from '/engine/core.js';
import { drawCharacter, POSES, breathe, characterCloseUp } from '/engine/characters.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { carInterior, caption, WS } from '../sets/car.js';
import { LEON } from '../cast.js';

function cloth(g, x, y, r = 1) { g.save(); g.translate(x, y); g.rotate(-0.25); rr(g, -62 * r, -50 * r, 124 * r, 100 * r, 22 * r); g.fillStyle = '#9aa3ad'; g.fill(); g.lineWidth = 4; g.strokeStyle = '#2a2f36'; g.stroke(); for (let i = 0; i < 4; i++) seg(g, [[-40 * r, -26 * r + i * 18 * r], [40 * r, -26 * r + i * 18 * r]], 3, 'rgba(255,255,255,.35)'); g.restore(); }

// s001 — Leon wipes the windshield again and again, streaks stay
registerShot('s001', { draw(g, t) {
  const s = 3.6, sw = Math.sin(t * 5.2), sv = Math.sin(t * 2.6);
  const x = 380 + sw * 190, y = 1250 - 40 + sv * 70;
  const { M } = carInterior(g, t, { mood: 'golden', film: 0.9 - 0.15 * Math.abs(sw) });
  const hx = x + 62 * s, hy = y - 204 * s;
  drawCharacter(g, { x, y, s, facing: 1, outfit: LEON, pose: POSES.reach, expr: t > 3.4 ? 'worried' : 'determined', rim: { color: M.rim, dir: [1, -0.4], w: 5 }, shadow: false });
  cloth(g, hx, hy, 1.5);
  FX.dust(g, t, { count: 30, color: '#ffe2bd', a: 0.3 });
  caption(g, t < 3 ? 'LIMPIAS Y LIMPIAS…' : '…Y NUNCA QUEDA BIEN', ease.out(prog(t, 0.3, 0.8)) * (1 - prog(t, 5.5, 6)));
} });

// s002 — giant frustrated face + greasy glass layer
registerShot('s002', { draw(g, t) {
  blurLayer(g, 12, (g) => carInterior(g, t, { mood: 'golden', film: 1 })); veil(g, '#120a10', 0.35);
  const M = mood('golden'), r = V(300, 330) * (1 + 0.04 * t);
  const [sx, sy] = shake(t, t > 3 ? 4 : 1, 14);
  g.save(); g.translate(sx, sy);
  characterCloseUp(g, E.W / 2 - 220, E.H * 0.62, r, { outfit: LEON, expr: t < 3 ? 'worried' : 'angry', look: [0.6, -0.3], rimColor: M.rim, rimSide: 1 });
  g.restore();
  // grease smears across the foreground glass
  g.save(); g.lineCap = 'round'; for (let i = 0; i < 14; i++) { const k = prog(t, 0.3 + i * 0.15, 1.2 + i * 0.15); g.strokeStyle = `rgba(255,248,225,${0.16 * k})`; g.lineWidth = 30; g.beginPath(); g.moveTo(1100 + i * 40, 150 + (i % 4) * 90); g.lineTo(1100 + i * 40 + 280 * k, 190 + (i % 4) * 90); g.stroke(); } g.restore();
  UI.bigLine(g, t, { str: 'PELÍCULA GRASOSA', dur: 6, y: E.H * 0.2, size: 96 });
  caption(g, 'SIEMPRE QUEDA ESE VELO OPACO', ease.out(prog(t, 1.2, 1.7)) * (1 - prog(t, 5.5, 6)));
} });

// s003 — night, headlights bloom into a white screen
registerShot('s003', { draw(g, t) {
  const k = ease.in(prog(t, 1.2, 5.2)), cx = [800, 1080];
  const { M } = carInterior(g, t, { mood: 'night', night: true, film: 0.9, outside: (g, tt) => { for (const x of cx) { glow(g, x, 470, 40 + 520 * k, '#fff6d8', 0.5 + 0.5 * k); circle(g, x, 470, 10 + 60 * k, '#ffffff'); } } });
  drawCharacter(g, { x: 330, y: 1250, s: 3.6, facing: 1, outfit: LEON, pose: breathe(POSES.stand, t), expr: k > 0.5 ? 'scared' : 'worried', rim: { color: '#fff1c8', dir: [1, -0.3], w: 5 }, shadow: false, look: [0.8, 0] });
  FX.lensStreak(g, 940, 470, E.W * (0.4 + k), '#fff6d8', 0.1 + 0.5 * k);
  g.save(); g.fillStyle = `rgba(255,252,240,${0.82 * k})`; const w = WS(); g.beginPath(); g.moveTo(w.x0 + 90, w.top); g.lineTo(w.x1 - 90, w.top); g.lineTo(w.x1, w.bot); g.lineTo(w.x0, w.bot); g.closePath(); g.fill(); g.restore();
  caption(g, 'DE NOCHE: PANTALLA BLANCA', ease.out(prog(t, 0.4, 0.9)) * (1 - prog(t, 6.4, 7)), { color: k > 0.7 ? '#fff' : '#fff4dc' });
} });

// s004 — blueprint: the grease comes from the dashboard plastics
registerShot('s004', { draw(g, t) {
  UI.blueprint(g); const ui = E.style.ui, bp = ui.blueprint;
  const gx = 360, gy = 220, gw = 1200;
  // glass line
  g.fillStyle = alpha(bp, 0.18); g.fillRect(gx, gy, gw, 26); seg(g, [[gx, gy], [gx + gw, gy]], 5, bp); seg(g, [[gx, gy + 26], [gx + gw, gy + 26]], 5, bp);
  // dashboard block
  const dy = 700; rr(g, gx - 60, dy, gw + 120, 170, 18); g.strokeStyle = bp; g.lineWidth = 5; g.stroke(); g.fillStyle = alpha(bp, 0.1); g.fill();
  // rising wavy grease molecules
  for (let i = 0; i < 16; i++) { const k = ((t * 0.28 + i / 16) % 1), x = gx + 60 + i * 72 + Math.sin(k * 9 + i) * 26, y = lerp(dy - 6, gy + 40, k); circle(g, x, y, 9 + 4 * Math.sin(i), alpha('#ffd25a', 0.9 * (1 - Math.abs(k - 0.5) * 1.2))); }
  g.fillStyle = `rgba(255,210,90,${0.35 * prog(t, 2, 5)})`; g.fillRect(gx, gy + 26, gw, 20 * prog(t, 2, 5));
  UI.callout(g, t, { at: [gx + 300, dy + 40], to: [gx + 300, dy + 130], str: 'PLÁSTICOS DEL TABLERO', start: 0.4 });
  UI.callout(g, t, { at: [gx + 800, 480], to: [gx + 960, 400], str: 'PELÍCULA DE GRASA', start: 1.6, color: '#ffd25a' });
  UI.callout(g, t, { at: [gx + 1000, gy + 13], to: [gx + 1100, gy - 90], str: 'VIDRIO', start: 2.6 });
  caption(g, 'LA GRASA SALE DEL TABLERO', ease.out(prog(t, 0.3, 0.8)) * (1 - prog(t, 5.5, 6)));
} });

// s005 — clean glass, sparkles, title
registerShot('s005', { draw(g, t) {
  const clean = ease.out(prog(t, 0.2, 2.2));
  const { M } = carInterior(g, t, { mood: 'golden', film: 0.9 * (1 - clean) });
  const s = 3.6, x = 380 + (1 - clean) * Math.sin(t * 7) * 150, y = 1210;
  drawCharacter(g, { x, y, s, facing: 1, outfit: LEON, pose: clean < 1 ? POSES.reach : breathe(POSES.cheer, t), expr: clean > 0.8 ? 'joy' : 'determined', rim: { color: M.rim, dir: [1, -0.4], w: 5 }, shadow: false });
  if (clean < 1) cloth(g, x + 62 * s, y - 204 * s, 1.5);
  const r = [[700, 220], [1050, 340], [1400, 200], [900, 520], [1550, 470]]; r.forEach(([sx, sy], i) => { const a = clamp(Math.sin(Math.max(0, t - 1.6 - i * 0.25) * 3.2)) * clean; FX.sparkle(g, sx, sy, 26 + 10 * i % 3, '#ffffff', a); });
  FX.godRays(g, 1250, 330, { a: 0.18 * clean });
  UI.titleCard(g, t - 2.4, { lines: ['EL SECRETO PARA UN', 'PARABRISAS IMPECABLE'], dur: 2.6, y: E.H * 0.3 });
} });
