// Flat-explainer reference shots: 2.5D city and office sets, walking and talking flat people, charts, highlight glow, HUD.
import { E, V, registerShot, mood, layer, ease, prog, clamp, lerp, text, FONTS } from '/engine/core.js';
import { drawCharacter, characterCloseUp, POSES, posesAt, breathe, walkPose } from '/engine/characters.js';
import { camPath, drift, camAdd, posesSpring, impact } from '/engine/motion.js';
import * as F from '/engine/flat.js';
import * as H from '/engine/hud.js';

const DAVE = { top: 'suit', color: '#3d4a66', color2: '#d94b3b', legs: '#2b3245', hair: 'balding', hairColor: '#5a4030', build: 'heavy', glasses: true };
const MIA = { top: 'tshirt', color: '#e5a33b', legs: '#3b5a8a', hair: 'ponytail', hairColor: '#6b3a24', skin: '#c98c64' };

// f001 — city street: skyline (parallax), road, a passing car, two people walking
registerShot('f001', { draw(g, t, info) {
  const M = mood('city'), cam = camPath(t, [[0, { z: 1.0, x: -40 }], [info.dur, { z: 1.04, x: 40 }]]), GY = E.H * V(0.8, 0.7);
  layer(g, cam, 0.1, g => { F.sky(g, M.sky); F.sun(g, E.W * 0.82, E.H * 0.16, 54); F.cloud(g, E.W * 0.3, E.H * 0.14, 1.1); });
  layer(g, cam, 0.35, g => F.city(g, GY - 60, { colors: M.buildings, h: 300, seed: 4 }));
  layer(g, cam, 0.6, g => { F.ground(g, GY - 60, M.ground, { edge: false }); F.tree(g, E.W * 0.1, GY - 40, 0.8); F.tree(g, E.W * 0.9, GY - 40, 0.9); });
  layer(g, cam, 1, g => {
    F.road(g, GY, { h: 150 }); g.fillStyle = '#c9c9d4'; g.fillRect(-E.W, GY - 20, E.W * 3, 20);
    F.car(g, lerp(-300, E.W + 300, prog(t, 0.2, 3.2)), GY + 110, 1.2, { color: M.accent });
    const wx = lerp(E.W * 0.25, E.W * 0.55, t / info.dur);
    drawCharacter(g, { x: wx, y: GY - 6, s: 1.6, facing: 1, outfit: DAVE, pose: walkPose(t * 2 * Math.PI * 0.9), expr: 'neutral' });
    drawCharacter(g, { x: wx + 190, y: GY - 6, s: 1.55, facing: 1, outfit: MIA, pose: walkPose(t * 2 * Math.PI * 0.9 + 1.2), expr: 'smile' });
  });
  H.infoBox(g, 'NEW YORK CITY', 'MONDAY · 08:30', { t, start: 0.6 });
}});

// f002 — office: Dave at his desk, the monitor's chart draws on and glows
registerShot('f002', { draw(g, t, info) {
  const M = mood('office'), cam = camAdd(camPath(t, [[0, { z: 1.0 }], [info.dur, { z: 1.07, x: 30 }]]), drift(t, 3, 2));
  layer(g, cam, 1, g => {
    const { GY } = F.room(g, { wall: M.wall, floor: M.floor, trim: M.trim });
    F.windowPane(g, E.W * 0.08, E.H * 0.16, 360, 300, { sky: M.sky, fn: (g, x, y, w, h) => F.city(g, y + h, { colors: M.buildings, h: 160, seed: 9 }) });
    F.picture(g, E.W * 0.78, E.H * 0.2, 170, 130);
    F.plant(g, E.W * 0.92, GY, 1.1);
    F.chair(g, E.W * 0.36, GY, 1.6, { facing: 1 });
    drawCharacter(g, { x: E.W * 0.36, y: GY - 10, s: 1.85, facing: 1, outfit: DAVE, pose: breathe({ ...POSES.sit, hF: [52, -150], eF: [34, -128] }, t), expr: t > 1.4 ? 'happy' : 'neutral', talk: t > 2.2 && t < 3.6 ? 0.5 + 0.5 * Math.sin(t * 16) : 0 });
    F.desk(g, E.W * 0.62, GY, 1.6);
    F.highlight(g, g => F.monitor(g, E.W * 0.64, GY - 192, 1.7, { fn: (g, x, y, w, h) => F.lineChart(g, x + 14, y + 12, w - 28, h - 24, [3, 4, 3.6, 5, 6.2, 5.8, 7.4, 9], { t, start: 0.4, dur: 1.2, axis: false, w: 5, color: E.style.ui.good }) }), { color: E.style.ui.good, t, start: 1.4 });
  });
}});

// f003 — presenter at the board; bars grow on their words
registerShot('f003', { draw(g, t, info) {
  const M = mood('office'), cam = camAdd({ z: 1.02 }, drift(t, 4, 5));
  layer(g, cam, 1, g => {
    const { GY } = F.room(g, { wall: M.wall, floor: M.floor, trim: M.trim });
    F.board(g, E.W * 0.36, E.H * 0.12, E.W * 0.52, E.H * 0.5, (g, x, y, w, h) => {
      text(g, 'WHERE THE MONEY GOES', x + w / 2, y + 50, { size: 40, font: FONTS.title, weight: 900, color: E.style.ink });
      F.barChart(g, x + 40, y + 90, w - 80, h - 160, [42, 26, 18, 14], { labels: ['RENT', 'CAR', 'FOOD', 'FUN'], values: ['42%', '26%', '18%', '14%'], t, start: 0.6 });
    });
    drawCharacter(g, { x: E.W * 0.19, y: GY, s: 1.9, facing: 1, outfit: MIA, pose: posesSpring(t, [[0, POSES.stand], [0.5, POSES.point], [2.6, POSES.explain]]), expr: 'smile', talk: 0.5 + 0.5 * Math.sin(t * 15), prop: t < 2.6 ? 'pointer' : null });
  });
}});

// f004 — close-up: shocked; a hard number pops with a hit
registerShot('f004', { draw(g, t, info) {
  const M = mood('studio'), hit = impact(t, 0.6, { amp: 10 });
  g.fillStyle = M.bg; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  characterCloseUp(g, E.W * 0.42 + hit.x, E.H * 0.5 + hit.y, 210, { outfit: MIA, expr: t < 0.6 ? 'neutral' : 'shocked', blink: t > 2.4 && t < 2.5 });
  H.pill(g, '-$80,000', E.W * 0.74, E.H * 0.42, { size: 70, t, start: 0.6 });
}});

// f005 — icons with arrows
registerShot('f005', { draw(g, t, info) {
  const M = mood('studio'); g.fillStyle = M.bg; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  [['house', 'up'], ['coin', 'down'], ['heart', 'up']].forEach(([ic, ar], i) => {
    const x = E.W * (0.25 + i * 0.25), st = 0.3 + i * 0.3;
    F.icon(g, ic, x, E.H * 0.48, 200, { t, start: st }); F.icon(g, ar, x + 90, E.H * 0.34, 90, { t, start: st + 0.5 });
    if (t > st) text(g, ['HOUSE', 'SAVINGS', 'HEALTH'][i], x, E.H * 0.72, { size: 46, font: FONTS.title, weight: 900, color: E.style.ink, alpha: clamp((t - st) * 3) });
  });
}});
