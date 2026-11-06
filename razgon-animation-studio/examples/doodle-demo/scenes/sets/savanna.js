// savanna.js — flat doodle landscape: sky, horizon, sun, clouds, bushes, a tree. Returns the ground line.
import { E, V, layer, mood } from '/engine/core.js';
import * as D from '/engine/doodle.js';

export function savanna(g, t, cam) {
  const M = mood('savanna'), GY = E.H * V(0.78, 0.68);
  layer(g, cam, 0.15, g => { D.plain(g, M.sky[1]); D.sun(g, E.W * 0.82, E.H * 0.2, 46, { spin: t * 0.2 }); D.cloud(g, E.W * 0.25, E.H * 0.18, 0.9, { seed: 3 }); D.cloud(g, E.W * 0.6, E.H * 0.12, 0.6, { seed: 4 }); });
  layer(g, cam, 0.5, g => { D.mountain(g, E.W * 0.15, GY, 700, 220, { color: M.wall, seed: 5 }); D.mountain(g, E.W * 0.55, GY, 900, 160, { color: M.wall, seed: 6 }); });
  layer(g, cam, 1, g => { D.horizon(g, GY, { ground: M.ground }); D.tree(g, E.W * 0.78, GY, 1.1, { color: M.grass }); D.bush(g, E.W * 0.12, GY, 1, { color: M.grass }); D.grass(g, -E.W * 0.2, E.W * 1.2, GY + 70, { seed: 9 }); });
  return { GY, M };
}
