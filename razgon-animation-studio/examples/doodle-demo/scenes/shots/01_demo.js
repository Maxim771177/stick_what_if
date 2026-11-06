// Doodle-pack reference shots: how to build sets, act characters, and pop graphics in a line-art look.
import { E, V, registerShot, mood, layer, ease, prog, lerp, clamp, FONTS } from '/engine/core.js';
import { drawCharacter, characterCloseUp, characterHead, POSES, posesAt, breathe, walkPose } from '/engine/characters.js';
import { camPath, drift, camAdd, posesSpring, impact } from '/engine/motion.js';
import * as D from '/engine/doodle.js';
import { savanna } from '../sets/savanna.js';
import { NARRATOR, GUIDE, OOG } from '../cast.js';

// d001 — title: narrator thinking, thought bubble, marker title
registerShot('d001', { draw(g, t, info) {
  const M = mood('board'), cam = camAdd(camPath(t, [[0, { z: 1.0, x: 0 }], [info.dur, { z: 1.06, x: 20 }]]), drift(t, 3, 1));
  layer(g, cam, 0.2, g => D.plain(g, M.bg));
  layer(g, cam, 1, g => {
    const GY = E.H * 0.9, o = { x: E.W * 0.25, y: GY, s: 1.9, facing: 1, outfit: NARRATOR, pose: breathe(posesAt(t, [[0, 'stand'], [0.5, 'think']]), t), expr: t > 0.5 ? 'thinking' : 'neutral', blink: (t % 3.1) > 3.0 };
    drawCharacter(g, o);
    const [hx, hy] = characterHead(o);
    D.bubble(g, hx + 210, hy - 170, 250, 190, { thought: true, tail: [hx + 40, hy - 40], t, start: 0.5 }, g => D.icon(g, 'question', 0, 0, 130));
    D.marker(g, 'HOW DID WE', E.W * 0.66, E.H * 0.36, { size: 92, t, start: 1.1 });
    D.marker(g, 'LEARN TO COUNT?', E.W * 0.66, E.H * 0.5, { size: 92, t, start: 1.35, color: E.style.ui.accent });
    D.underline(g, E.W * 0.47, E.W * 0.85, E.H * 0.58, { t, start: 1.8 });
  });
}});

// d002 — savanna wide: the caveman walks in, date label pops
registerShot('d002', { draw(g, t, info) {
  const cam = camPath(t, [[0, { z: 1.0, x: -40 }], [info.dur, { z: 1.04, x: 30 }]]);
  const { GY } = savanna(g, t, cam);
  const walkT = clamp(t / 2.6), x = lerp(E.W * 0.1, E.W * 0.45, ease.out(walkT));
  layer(g, cam, 1, g => {
    const pose = walkT < 1 ? walkPose(t * 2 * Math.PI * 0.9) : breathe(POSES.stand, t);
    drawCharacter(g, { x, y: GY + 60, s: 1.7, facing: 1, outfit: OOG, pose, expr: 'neutral', prop: 'spear', blink: (t % 2.7) > 2.6 });
  });
  D.marker(g, '40,000 YEARS AGO', E.W * 0.3, E.H * 0.3, { size: 64, t, start: 0.6, rot: -0.03 });
}});

// d003 — close-up: confused, a question mark pops next to the head
registerShot('d003', { draw(g, t, info) {
  const M = mood('savanna'), hit = impact(t, 0.9, { amp: 8 }), cam = { z: 1 + 0.04 * ease.inOut(t / info.dur), x: hit.x, y: hit.y };
  layer(g, cam, 0.3, g => D.plain(g, M.sky[1]));
  layer(g, cam, 0.6, g => { g.fillStyle = M.ground; g.fillRect(-E.W, E.H * 0.86, E.W * 3, E.H); });
  layer(g, cam, 1, g => {
    characterCloseUp(g, E.W * 0.45, E.H * 0.55, 300, { outfit: OOG, expr: t < 0.9 ? 'confused' : 'thinking', blink: (t % 2.2) > 2.1, look: t > 0.9 ? [0.6, -0.5] : [0, 0] });
    D.icon(g, 'question', E.W * 0.74, E.H * 0.28, 160, { t, start: 0.9 });
  });
}});

// d004 — cave: tally marks on the wall by the fire
registerShot('d004', { draw(g, t, info) {
  const cam = camAdd(camPath(t, [[0, { z: 1.0, x: 0 }], [info.dur, { z: 1.08, x: -60 }]]), drift(t, 3, 4));
  let GY;
  layer(g, cam, 1, g => {
    ({ GY } = D.cave(g, { x: E.W * 0.84, w: E.W * 0.12, h: E.H * 0.36 }));
    D.tally(g, E.W * 0.12, E.H * 0.42, 9, { h: 110, t, start: 0.8, per: 0.32, stroke: '#f3e6c8', color: '#f6b93b', w: 9 });
    D.campfire(g, E.W * 0.6, GY + 10, 1.7, info.globalT);
    const scratching = t > 0.8 && t < 3.8, arm = scratching ? Math.sin(t * 9) * 0.5 + 0.5 : 0;
    const pose = scratching ? { ...POSES.reach, hF: [70 + arm * 4, -150 - arm * 40], eF: [40, -160] } : POSES.stand;
    drawCharacter(g, { x: E.W * 0.36, y: GY, s: 1.7, facing: -1, outfit: OOG, pose: breathe(pose, t), expr: t > 3.8 ? 'happy' : 'determined', prop: { type: 'stone' } });
  });
}});

// d005 — two-shot: modern person meets the caveman; arrow + light bulb
registerShot('d005', { draw(g, t, info) {
  const M = mood('board'), cam = camAdd({ z: 1.02, x: 0 }, drift(t, 4, 7));
  layer(g, cam, 0.2, g => D.plain(g, M.bg));
  layer(g, cam, 1, g => {
    const GY = E.H * 0.86;
    g.fillStyle = M.ground; g.fillRect(-E.W, GY, E.W * 3, E.H);
    D.horizon(g, GY, { ground: M.ground });
    drawCharacter(g, { x: E.W * 0.26, y: GY, s: 1.75, facing: 1, outfit: OOG, pose: breathe(posesAt(t, [[0, 'stand'], [1.4, 'shrug']]), t, 1, 2), expr: t > 1.6 ? 'surprised' : 'neutral' });
    drawCharacter(g, { x: E.W * 0.74, y: GY, s: 1.75, facing: -1, outfit: GUIDE, pose: posesSpring(t, [[0, POSES.stand], [0.6, POSES.point]]), expr: 'smile', talk: t > 0.6 && t < 1.6 ? 0.5 + 0.5 * Math.sin(t * 20) : 0 });
    D.arrow(g, [E.W * 0.62, E.H * 0.3], [E.W * 0.38, E.H * 0.3], { t, start: 0.9, bend: -0.2 });
    D.icon(g, 'bulb', E.W * 0.5, E.H * 0.14, 120, { t, start: 1.6 });
  });
}});

// d006 — board diagram: tally -> 5 -> 1 2 3 4 5 -> check
registerShot('d006', { draw(g, t, info) {
  const M = mood('board'), cam = camPath(t, [[0, { z: 1.06, x: -40 }], [info.dur, { z: 1.0, x: 40 }]]);
  layer(g, cam, 0.2, g => D.plain(g, M.bg));
  layer(g, cam, 1, g => {
    const y = E.H * 0.5;
    D.tally(g, E.W * 0.1, y + 40, 5, { h: 90, t, start: 0.2, per: 0.12 });
    D.arrow(g, [E.W * 0.27, y], [E.W * 0.37, y], { t, start: 1.0, bend: 0.1 });
    D.marker(g, '5', E.W * 0.44, y, { size: 150, t, start: 1.4, color: E.style.ui.accent });
    D.arrow(g, [E.W * 0.51, y], [E.W * 0.61, y], { t, start: 2.0, bend: -0.1 });
    D.marker(g, '1 2 3 4 5', E.W * 0.78, y, { size: 96, t, start: 2.4, rot: 0.01 });
    D.icon(g, 'check', E.W * 0.78, y + 130, 120, { t, start: 3.2 });
    D.marker(g, 'lines → groups → numbers', E.W * 0.5, E.H * 0.2, { size: 64, t, start: 0.4, font: FONTS.ui });
  });
}});
