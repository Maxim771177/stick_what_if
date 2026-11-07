// sets/classroom.js: класс утром. Работает в паках razgon-stickman (свет из окна слева) и doodle (плоский цвет + контур).
import { E, V, mood, layer, backdrop, rr, seg, linGrad, glow, alpha, shade, mix } from '/engine/core.js';
import { inkRect } from '/engine/ink.js';
import * as FX from '/engine/fx2d.js';
import { isDoodle } from '../cast.js';

export const classGround = () => E.H * 0.84;
export const box = (g, x, y, w, h, fill) => { if (isDoodle()) inkRect(g, x, y, w, h, { fill }); else { g.fillStyle = fill; g.fillRect(x, y, w, h); } };
export function classroom(g, t, cam, o = {}) {
  const dd = isDoodle(), M = mood(dd ? 'interior' : (o.mood || 'day')), GY = classGround(), CX = E.W / 2;
  const wall = dd ? M.wall : shade(M.wall, -0.15), floor = dd ? M.floor : shade(M.floor, -0.25);
  layer(g, cam, 0.5, (g) => {
    g.fillStyle = dd ? wall : linGrad(g, 0, 0, 0, GY, [shade(wall, 0.08), wall, shade(wall, -0.25)]); g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H + 4);
    // окно слева
    const wx = 120, wy = 150, ww = 430, wh = 400;
    if (dd) { box(g, wx, wy, ww, wh, '#cfe6f5'); seg(g, [[wx + ww / 2, wy], [wx + ww / 2, wy + wh]], 8, E.style.ink); seg(g, [[wx, wy + wh / 2], [wx + ww, wy + wh / 2]], 8, E.style.ink); }
    else {
      FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 2, rows: 2, frame: shade(M.dark, -0.2), bar: 12 }, (g, x, y, w, h) => { g.fillStyle = linGrad(g, 0, y, 0, y + h, [M.sky[0], M.sky[1], M.sky[2]]); g.fillRect(x, y, w, h); });
      glow(g, wx + ww / 2, wy + wh / 2, 520, M.key, 0.18);
    }
    // доска
    const bx = 760, by = 190, bw = 760, bh = 300;
    box(g, bx - 14, by - 14, bw + 28, bh + 28, dd ? '#c98b4a' : shade(M.dark, 0.15)); box(g, bx, by, bw, bh, dd ? '#3f6b57' : shade('#2f4a3d', -0.2));
    seg(g, [[bx + 30, by + bh + 14], [bx + bw - 30, by + bh + 14]], 10, dd ? '#c98b4a' : shade(M.dark, 0.1));
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = dd ? floor : linGrad(g, 0, GY, 0, GY + 400, [floor, shade(floor, -0.4)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    if (dd) seg(g, [[-E.W, GY], [E.W * 2, GY]], 6, E.style.ink); else { FX.floorLines(g, GY, GY + 500, 'rgba(0,0,0,.25)', 0.08); FX.pool(g, 360, GY + 70, 420, 50, M.key, 0.22); }
  });
  return { GY, CX, M };
}
export function desk(g, x, GY, s = 1) {
  const dd = isDoodle(), top = GY - 118 * s, c = dd ? '#c98b4a' : shade(mood('day').floor, -0.1);
  if (dd) { inkRect(g, x - 70 * s, top, 140 * s, 14 * s, { fill: c }); seg(g, [[x - 58 * s, top + 14 * s], [x - 58 * s, GY]], 6, E.style.ink); seg(g, [[x + 58 * s, top + 14 * s], [x + 58 * s, GY]], 6, E.style.ink); }
  else { rr(g, x - 70 * s, top, 140 * s, 14 * s, 4); g.fillStyle = c; g.fill(); seg(g, [[x - 58 * s, top + 14 * s], [x - 58 * s, GY]], 6 * s, shade(c, -0.4)); seg(g, [[x + 58 * s, top + 14 * s], [x + 58 * s, GY]], 6 * s, shade(c, -0.4)); }
}
