// Cartoon-cutout reference shots: image-part puppets on the shared skeleton, face overlays (lip flap, expressions),
// a sprite puppet that swaps whole-body images by emotion, outlined flat sets, glowing highlight.
import { E, V, registerShot, mood, layer, ease, prog, clamp, lerp, text, FONTS } from '/engine/core.js';
import { drawCharacter, characterCloseUp, characterHead, POSES, posesAt, breathe, walkPose } from '/engine/characters.js';
import { camPath, drift, camAdd, posesSpring, spring } from '/engine/motion.js';
import { loadPuppet } from '/engine/rig-cutout.js';
import { project } from '/engine/assets.js';
import * as F from '/engine/flat.js';
import * as H from '/engine/hud.js';

const RAY = await loadPuppet(project('assets/ray/rig.json'));     // parts puppet (SVG parts drawn once)
const BOSS = await loadPuppet(project('assets/boss/rig.json'));   // sprites puppet (one image per emotion)
const flap = (t, a, b) => (t > a && t < b ? 0.5 + 0.5 * Math.sin(t * 17) * Math.sin(t * 5.3) : 0);

function livingRoom(g, M) {
  const { GY } = F.room(g, { wall: M.wall, floor: M.floor, trim: M.trim });
  F.windowPane(g, E.W * 0.62, E.H * 0.14, 380, 300, { sky: M.sky, fn: (g, x, y, w, h) => { F.tree(g, x + w * 0.3, y + h, 0.8); F.house(g, x + w * 0.75, y + h, 0.6); } });
  F.picture(g, E.W * 0.12, E.H * 0.18, 200, 150); F.sofa(g, E.W * 0.85, GY, 1.1); F.plant(g, E.W * 0.05, GY, 1.2);
  return GY;
}

// c001 — Ray walks in, stops, waves and talks
registerShot('c001', { draw(g, t, info) {
  const M = mood('home'), cam = camAdd(camPath(t, [[0, { z: 1.0, x: -30 }], [info.dur, { z: 1.05, x: 20 }]]), drift(t, 3, 1));
  layer(g, cam, 1, g => {
    const GY = livingRoom(g, M), wt = clamp(t / 2.0), x = lerp(E.W * 0.12, E.W * 0.42, ease.out(wt));
    const pose = wt < 1 ? walkPose(t * 2 * Math.PI * 0.9) : breathe(posesSpring(t, [[2.0, POSES.stand], [2.3, POSES.wave], [3.3, POSES.explain]]), t);
    drawCharacter(g, { puppet: RAY, x, y: GY, s: 2.0, facing: 1, pose, expr: 'happy', talk: flap(t, 2.3, 4.2), blink: (t % 3.1) > 3.0 });
  });
}});

// c002 — close-up: happy talking, then shocked
registerShot('c002', { draw(g, t, info) {
  const M = mood('home'); g.fillStyle = M.wall; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  F.picture(g, E.W * 0.72, E.H * 0.15, 260, 190);
  characterCloseUp(g, E.W * 0.42, E.H * 0.5 + Math.sin(t * 2) * 4, 230, { puppet: RAY, expr: t < 2.2 ? 'happy' : 'shocked', talk: flap(t, 0.2, 2.0), blink: t > 1.3 && t < 1.42 });
}});

// c003 — office: the boss (sprite puppet) goes from idle to angry with a bounce; Ray sad
registerShot('c003', { draw(g, t, info) {
  const M = mood('office'), cam = camAdd({ z: 1.02 }, drift(t, 4, 6));
  layer(g, cam, 1, g => {
    const { GY } = F.room(g, { wall: M.wall, floor: M.floor, trim: M.trim });
    F.windowPane(g, E.W * 0.38, E.H * 0.12, 420, 300, { sky: M.sky, fn: (g, x, y, w, h) => F.city(g, y + h, { colors: M.buildings, h: 180, seed: 5 }) });
    F.desk(g, E.W * 0.74, GY, 1.4); F.monitor(g, E.W * 0.8, GY - 168, 1.2);
    const angry = t > 1.4, sq = angry ? Math.max(0, 1 - spring(t, 1.4, { freq: 4, damp: 0.4 })) * -0.6 : 0;
    drawCharacter(g, { puppet: BOSS, x: E.W * 0.64, y: GY, s: 2.1, facing: -1, expr: angry ? 'angry' : 'idle', squash: sq });
    drawCharacter(g, { puppet: RAY, x: E.W * 0.26, y: GY, s: 2.0, facing: 1, pose: breathe(angry ? POSES.sad : POSES.stand, t), expr: angry ? 'sad' : 'neutral', blink: (t % 2.7) > 2.6 });
  });
}});

// c004 — Ray points at a glowing savings jar; a number pops
registerShot('c004', { draw(g, t, info) {
  const M = mood('home'), cam = camAdd({ z: 1.04 }, drift(t, 3, 9));
  layer(g, cam, 1, g => {
    const GY = livingRoom(g, M);
    F.desk(g, E.W * 0.66, GY, 1.3);
    F.highlight(g, g => { F.icon(g, 'coin', E.W * 0.66, GY - 230, 150); }, { color: E.style.ui.good, t, start: 0.8 });
    drawCharacter(g, { puppet: RAY, x: E.W * 0.32, y: GY, s: 2.0, facing: 1, pose: posesSpring(t, [[0, POSES.stand], [0.6, POSES.point]]), expr: 'smile', talk: flap(t, 0.8, 3.4) });
  });
  H.pill(g, '+$1,000 / MONTH', E.W * 0.66, E.H * 0.18, { size: 56, t, start: 1.0, bg: E.style.ui.good });
}});
