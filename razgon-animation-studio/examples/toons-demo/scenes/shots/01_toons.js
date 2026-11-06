// Object-toons reference shots: personified planets, googly eyes, squash and stretch, space backdrops, mixing families.
import { E, V, registerShot, mood, ease, prog, clamp, lerp, text, FONTS } from '/engine/core.js';
import { drawCharacter, characterCloseUp, POSES, posesAt, breathe } from '/engine/characters.js';
import { spring, camPath, drift, camAdd } from '/engine/motion.js';
import { layer } from '/engine/core.js';
import { space, planet } from '/engine/toons.js';
import * as H from '/engine/hud.js';

const SPACE = () => ({ colors: mood('space') });

// t001 — the Sun talks, Earth smiles, the Moon orbits; title pops
registerShot('t001', { draw(g, t, info) {
  const cam = camAdd(camPath(t, [[0, { z: 1.0 }], [info.dur, { z: 1.06 }]]), drift(t, 4, 2));
  layer(g, cam, 0.2, g => space(g, t, SPACE()));
  layer(g, cam, 1, g => {
    const talk = t > 1.2 && t < 3.6 ? 0.5 + 0.5 * Math.sin(t * 16) : 0;
    planet(g, 'sun', E.W * 0.24, E.H * 0.55, 170, { expr: 'happy', talk, look: [0.6, 0], t });
    const ex = E.W * 0.68, ey = E.H * 0.55, a = t * 0.9;
    const moon = [ex + Math.cos(a) * 230, ey + Math.sin(a) * 90];
    if (Math.sin(a) < 0) planet(g, 'moon', moon[0], moon[1], 34, { expr: 'smile', look: [-0.5, 0] });
    planet(g, 'earth', ex, ey, 110, { expr: 'smile', look: [-0.7, 0], blink: (t % 3) > 2.9 });
    if (Math.sin(a) >= 0) planet(g, 'moon', moon[0], moon[1], 40, { expr: 'smile', look: [-0.5, 0] });
  });
  const k = ease.outBack(prog(t, 0.4, 0.8));
  if (k > 0) { g.save(); g.translate(E.W / 2, V(120, 240)); g.scale(k, k); text(g, 'WHAT IF THE SUN DISAPPEARED?', 0, 0, { size: V(76, 64), color: E.style.ui.gold, font: FONTS.title, weight: 800, stroke: 12, strokeColor: E.style.ink }); g.restore(); }
}});

// t002 — close-up Earth: worried glance, then shocked; the Moon bounces in with squash
registerShot('t002', { draw(g, t, info) {
  space(g, t, SPACE());
  characterCloseUp(g, E.W * 0.45, E.H * 0.55, 250, { fill: '#3d8fe0', expr: t < 1.4 ? 'worried' : 'shocked', look: t < 1.4 ? [-0.8, -0.2] : [0, 0], blink: t > 0.9 && t < 1.0, surface: { type: 'spots', colors: ['#5cb85c'], at: [[-0.45, -0.35, 0.3], [0.4, 0.3, 0.26], [0.5, -0.55, 0.14], [-0.3, 0.62, 0.16]] } });
  const t0 = 2.0, sp = spring(t, t0, { freq: 2.5, damp: 0.45 }), y = lerp(-200, E.H * 0.42, Math.min(1, sp)), squash = t > t0 ? clamp(sp - 1, -0.4, 0.4) * 1.5 : 0;
  if (t > t0) planet(g, 'moon', E.W * 0.82, y, 70, { expr: 'surprised', squash, look: [-0.6, 0.2] });
}});

// t003 — Jupiter and Saturn bob; the big number
registerShot('t003', { draw(g, t, info) {
  space(g, t, SPACE());
  planet(g, 'jupiter', E.W * 0.28, E.H * 0.58 + Math.sin(t * 2.2) * 14, 130, { expr: 'awe', look: [0.5, -0.4] });
  planet(g, 'saturn', E.W * 0.72, E.H * 0.6 + Math.sin(t * 2.2 + 1.5) * 14, 95, { expr: 'surprised', look: [-0.5, -0.4] });
  H.counter(g, `${H.tick(t, 0.4, 2.0, 0, 99.8).toFixed(1)}%`, E.W / 2, E.H * 0.24, { label: 'OF ALL MASS IS THE SUN', size: 110, t, start: 0.3 });
}});

// t004 — a doodle-family presenter (families can mix in one scene) points at a talking water drop
registerShot('t004', { draw(g, t, info) {
  const M = mood('lab'); g.fillStyle = M.bg; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.fillStyle = M.ground; g.fillRect(-E.W, E.H * 0.82, E.W * 3, E.H);
  const GY = E.H * 0.82;
  drawCharacter(g, { family: 'doodle', x: E.W * 0.3, y: GY, s: 1.9, facing: 1, outfit: { top: 'tshirt', color: '#ff5a5f', hair: 'spiky', hairColor: '#2b2420', skin: E.style.skin, kid: true }, pose: breathe(posesAt(t, [[0, 'stand'], [0.6, 'point']]), t), expr: 'happy', talk: t > 0.7 && t < 2.2 ? 0.5 + 0.5 * Math.sin(t * 17) : 0 });
  const sp = spring(t, 0.8, { freq: 3, damp: 0.5 });
  if (t > 0.8) drawCharacter(g, { x: E.W * 0.68, y: GY, r: 95 * Math.min(1.05, sp), shape: 'drop', fill: '#6cc6ff', expr: t > 2.2 ? 'joy' : 'smile', talk: t > 2.4 && t < 3.6 ? 0.5 + 0.5 * Math.sin(t * 18) : 0, facing: -1, look: [-0.5, 0] });
}});
