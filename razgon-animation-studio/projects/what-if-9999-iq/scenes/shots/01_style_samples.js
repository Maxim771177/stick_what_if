// Кадры для сравнения стилей: s001 общий класс, s004 двое + карточка, s007 крупный план Leon, s013 лесенка IQ.
// Все цвета из mood()/S(), люди через drawCharacter: кадры одинаково работают в любом паке.
import { E, V, registerShot, mood, layer, blurLayer, ease, prog, S, shade, rr, seg, text, FONTS } from '/engine/core.js';
import { drawCharacter, characterCloseUp, POSES, posesAt, breathe } from '/engine/characters.js';
import { camPath, drift, camAdd, kText } from '/engine/motion.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import * as D from '/engine/doodle.js';
import { classroom, desk, box, classGround } from '../sets/classroom.js';
import { outfit, isDoodle } from '../cast.js';

const rim = (M, dir = [-1, -0.3]) => (isDoodle() ? undefined : { color: M.rim, dir });
const blink = (t, k = 3.1) => (t % k) > k - 0.1;
const label = (g, t, str, x, y, o = {}) => {
  if (isDoodle()) D.marker(g, str, x, y, { size: o.size || 70, t, start: o.start || 0, color: o.color, rot: o.rot || 0 });
  else kText(g, t, str, x, y, { start: o.start || 0, size: o.size || 76, mode: o.mode || 'slam', color: o.color || S().ui.gold, glow: 22, spacing: 2 });
};
function seated(g, t, x, GY, i, s = 1.25, facing = 1) {   // фоновый ученик за партой
  drawCharacter(g, { x, y: GY, s, facing, outfit: outfit('KIDBG'), pose: breathe(POSES.sit, t, 1, i + 3), expr: 'neutral', blink: blink(t, 2.7 + i * 0.4) });
  desk(g, x + 60, GY, s * 0.95);
}

registerShot('s001', { draw(g, t, info) {
  const cam = camAdd(camPath(t, [[0, { z: 1.0, x: -20 }], [info.dur, { z: 1.05, x: 10 }]]), drift(t, 3, 1));
  const { GY, M } = classroom(g, t, cam);
  layer(g, cam, 1, (g) => {
    [1240, 1450, 1640].forEach((x, i) => seated(g, t, x, GY + 30 + (i % 2) * 14, i, 1.2, -1));
    drawCharacter(g, { x: 960, y: GY - 6, s: 1.35, facing: 1, outfit: outfit('TEACHER'), pose: breathe(posesAt(t, [[0, 'holdFront']]), t, 1, 2), expr: 'neutral', blink: blink(t, 3.4), rim: rim(M) });
    seated(g, t, 470, GY + 80, 7, 1.55, 1);
    drawCharacter(g, { x: 470, y: GY + 80, s: 1.55, facing: 1, outfit: outfit('LEON'), pose: breathe(POSES.sit, t, 1, 9), expr: 'smirk', blink: blink(t), rim: rim(M) });
    desk(g, 530, GY + 80, 1.5);
  });
  if (!isDoodle()) FX.dust(g, t);
}});

registerShot('s004', { draw(g, t, info) {
  const cam = camAdd(camPath(t, [[0, { z: 1.0, x: 30 }], [info.dur, { z: 1.07, x: -20 }]]), drift(t, 3, 4));
  const { GY, M } = classroom(g, t, cam);
  layer(g, cam, 1, (g) => {
    drawCharacter(g, { x: 1450, y: GY - 4, s: 1.05, facing: -1, outfit: outfit('TEACHER'), pose: breathe(POSES.stand, t, 1, 2), expr: t > 3 ? 'surprised' : 'neutral', blink: blink(t, 3.4), rim: rim(M) });
    drawCharacter(g, { x: 700, y: GY + 70, s: 1.75, facing: 1, outfit: outfit('LEON'), pose: breathe(posesAt(t, [[0, 'relaxed'], [1.8, 'explain']]), t, 1, 5), expr: 'smirk', blink: blink(t), rim: rim(M) });
  });
  label(g, t, '50 / 50', E.W * 0.5, E.H * 0.2, { start: 1.2, size: 110, mode: 'slam', color: isDoodle() ? S().ui.accent : S().ui.gold });
  if (!isDoodle()) FX.dust(g, t);
}});

registerShot('s007', { draw(g, t, info) {
  const cam = { z: 1 + 0.05 * ease.inOut(t / info.dur), x: 0 };
  let M;
  blurLayer(g, 7, (g) => { ({ M } = classroom(g, t, cam)); [380, 1560].forEach((x, i) => drawCharacter(g, { x, y: classGround() + 40, s: 1.3, facing: i ? -1 : 1, outfit: outfit('KIDBG'), pose: POSES.stand, expr: 'surprised' })); }, cam, 0.7);
  layer(g, cam, 1, (g) => { characterCloseUp(g, E.W * 0.5, E.H * 0.6, V(330, 330), { outfit: outfit('LEON'), expr: 'smirk', blink: blink(t, 2.8), look: [0, 0], rimColor: M && !isDoodle() ? M.rim : undefined }); });
}});

registerShot('s013', { draw(g, t, info) {
  const dd = isDoodle(), cam = camPath(t, [[0, { z: 1.0, y: 80 }], [info.dur, { z: 1.0, y: -40 }]]);
  layer(g, cam, 0.2, (g) => { if (dd) D.plain(g, mood('board').bg); else UI.blueprint(g, { a: 0.08 }); });
  layer(g, cam, 1, (g) => {
    const ui = S().ui, GY = E.H * 0.86, sw = 250, sh = 118, x0 = 260;
    for (let i = 0; i < 6; i++) {
      const on = prog(t, 0.2 + i * 0.35, 0.5 + i * 0.35); if (on <= 0) continue;
      const col = i >= 1 && i <= 3 && t > 2.4 ? ui.gold : (dd ? '#e3d6b8' : ui.blueprint);
      const h = (i + 1) * sh * ease.out(on);
      if (dd) box(g, x0 + i * sw, GY - h, sw, h, col); else { g.fillStyle = col + '33'; g.fillRect(x0 + i * sw, GY - h, sw, h); g.strokeStyle = col; g.lineWidth = 3; g.strokeRect(x0 + i * sw, GY - h, sw, h); }
    }
    drawCharacter(g, { x: x0 + 120, y: GY - sh, s: 1.0, facing: 1, outfit: outfit('AVG'), pose: breathe(POSES.stand, t, 1, 3), expr: 'neutral', rim: undefined });
    if (t > 2.0) drawCharacter(g, { x: x0 + 3 * sw + 120, y: GY - sh * 4, s: 1.0, facing: 1, outfit: outfit('GENIUS'), pose: breathe(POSES.stand, t, 1, 6), expr: 'smile' });
  });
  label(g, t, '100 = AVERAGE', E.W * 0.26, E.H * 0.26, { start: 0.6, size: 64, mode: 'rise', color: isDoodle() ? undefined : S().ui.cream });
  label(g, t, '+15 = 1 STEP', E.W * 0.72, E.H * 0.2, { start: 1.4, size: 64, mode: 'rise', color: isDoodle() ? S().ui.accent : S().ui.gold });
}});
