// Map-story reference shots: map flights, highlighted countries, countryballs, growing regions, routes on a globe, HUD.
import { E, V, registerShot, mood, ease, prog, clamp, lerp, key } from '/engine/core.js';
import { drawCharacter, characterCloseUp } from '/engine/characters.js';
import { spring, drift, camAdd } from '/engine/motion.js';
import { geo, flyTo, fit } from '/engine/map.js';
import { faceOn } from '/engine/rig-faceobj.js';
import * as H from '/engine/hud.js';

const EUROPE = fit(['France', 'Germany', 'Poland', 'Spain', 'Italy'], { pad: 1.15 });

// m001 — world → Europe flight, DAY header, countries-left counter
registerShot('m001', { draw(g, t, info) {
  const view = flyTo(t, [[0, { center: [12, 25], zoom: 1.0 }], [0.6, { center: [12, 25], zoom: 1.0 }], [3.4, EUROPE]]);
  const M = geo({ projection: 'natural', ...view });
  M.world(g);
  H.header(g, ['DAY 1'], { t, start: 0.3 });
  H.counter(g, String(Math.round(H.tick(t, 1.0, 3.4, 195, 44))), V(150, 160), V(170, 300), { label: 'COUNTRIES LEFT', size: 52, align: 'left', bg: true, t, start: 0.2 });
}});

// m002 — France and Germany on their flags, countryballs bounce in
registerShot('m002', { draw(g, t, info) {
  const view = flyTo(t, [[0, EUROPE], [info.dur, { ...EUROPE, zoom: EUROPE.zoom * 1.12 }]]);
  const M = geo({ projection: 'natural', ...view });
  M.world(g);
  M.country(g, 'France', { flag: true, alpha: 0.55 }); M.country(g, 'Germany', { flag: true, alpha: 0.55 });
  ['France', 'Germany'].forEach((n, i) => {
    const { xy } = M.anchor(n), t0 = 0.4 + i * 0.4, sp = spring(t, t0, { freq: 3, damp: 0.5 }), land = clamp(1 - Math.abs(t - t0 - 0.35) * 6) * 0.35;
    if (t < t0) return;
    const speaking = (i === 0 && t > 1.4 && t < 2.6) || (i === 1 && t > 2.8 && t < 3.9);
    drawCharacter(g, { x: xy[0] + (i ? 40 : -40), y: xy[1] + 70 - (1 - Math.min(1, sp)) * 260, r: 82, flag: n, facing: i ? -1 : 1, squash: land, expr: speaking ? 'smile' : i ? 'determined' : 'neutral', talk: speaking ? 0.5 + 0.5 * Math.sin(t * 18) : 0, blink: (t % (2.6 + i)) > 2.5 + i, look: [i ? -0.6 : 0.6, 0] });
  });
  H.infoBox(g, 'BERLIN, GERMANY', 'DAY 3 · 08:00', { t, start: 1.0 });
}});

// m003 — one region grows country by country; the year ticks; the region has a face
const STEPS = [[0, ['Italy']], [1.2, ['France', 'Spain', 'Portugal', 'Switzerland']], [2.4, ['Greece', 'Turkey', 'Albania', 'Macedonia', 'Bulgaria']], [3.4, ['Egypt', 'Libya', 'Tunisia', 'Syria', 'Israel', 'Lebanon']]];
registerShot('m003', { draw(g, t, info) {
  const view = flyTo(t, [[0, fit(['Italy', 'France'], { pad: 1.3 })], [3.6, fit(['Spain', 'Turkey', 'Libya'], { pad: 1.2 })]]);
  const M = geo({ projection: 'natural', ...view });
  M.world(g);
  const owned = STEPS.filter(([at]) => t >= at).flatMap(([, n]) => n), fill = E.style.ui.accent;
  const lastAt = STEPS.filter(([at]) => t >= at).pop()[0], flash = clamp(1 - (t - lastAt) * 3);
  M.union(g, owned, { fill, alpha: 0.85 + 0.15 * flash });
  const { xy } = M.anchor('Italy');
  faceOn(g, xy[0] - 10, xy[1] + 10, 95, { expr: t > 3.4 ? 'joy' : 'smirk', lidColor: fill, blink: (t % 2.9) > 2.8 });
  H.counter(g, H.year(H.tick(t, 0.2, 4.6, -264, 117), { ad: true }), V(200, 220), V(150, 260), { label: 'YEAR', size: 56, bg: true });
}});

// m004 — globe rotates west while a route draws from Lisbon to Salvador
registerShot('m004', { draw(g, t, info) {
  const view = flyTo(t, [[0, { center: [-5, 32], zoom: 1.05 }], [info.dur, { center: [-30, 8], zoom: 1.25 }]]);
  const M = geo({ projection: 'globe', ...view, space: mood('night').bg });
  M.world(g);
  const p = ease.inOut(prog(t, 0.6, 3.6));
  M.route(g, [[-9.14, 38.72], [-17, 28], [-25, 14], [-33, 0], [-38.5, -12.97]], { progress: p, w: 6, dash: [2, 14] });
  M.dot(g, -9.14, 38.72); M.label(g, 'LISBON', -9.14, 38.72, { dy: -34 });
  if (p > 0.98) { M.dot(g, -38.5, -12.97); M.label(g, 'SALVADOR', -38.5, -12.97, { dy: -34 }); }
}});

// m005 — close-up countryball: shocked, then determined; pill pops
registerShot('m005', { draw(g, t, info) {
  const M = mood('studio'), hit = t > 1.0 ? Math.exp(-(t - 1.0) * 6) * Math.sin((t - 1.0) * 40) * 10 : 0;
  g.fillStyle = M.bg; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  characterCloseUp(g, E.W / 2 + hit, E.H * 0.56, 230 * (1 + 0.04 * ease.inOut(t / info.dur)), { flag: 'Poland', accessory: 'helmet', expr: t < 1.0 ? 'shocked' : 'determined', blink: t > 2.6 && t < 2.72 });
  H.pill(g, 'ONLY 1 SURVIVES', E.W / 2, V(110, 260), { size: 48, t, start: 1.0 });
}});
