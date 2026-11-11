import { def, E, C, D, S, ui, text, measure, FONTS, inkLine, inkRect, inkCircle, inkShape, alpha, closeUp } from '../lib.js';
import * as X from '../gfx.js';
// Превью ролика 01 (v2): Leon крупным планом с наглой ухмылкой и золотым IQ над головой; позади, мельче, одноклассники за партами с малым IQ смотрят на него.
const pill = (g, str, x, y, sz, fill, o = {}) => {
  const w = measure(g, str, sz) + sz * 0.9, h = sz * 1.45;
  inkRect(g, x - w / 2, y - h / 2, w, h, { fill, r: h / 2, w: o.w || 8 });
  text(g, str, x, y + sz * 0.18, { size: sz, font: FONTS.title, weight: 400, color: S().ink });
};
const kids = [[0.52], [0.655], [0.79], [0.925]];
const LX = 0.27 * 1920, LY = 0.7 * 1080, LR = 370;
def('t001', { set: 'classroom', cam: 'still',
  chars: kids.map(([x]) => ({ w: 'KIDBG', x, s: 1.35, f: -1, pose: 'sit', expr: 'surprised', noin: true, dy: 40 })),
  pre: (g, t, info, c) => { for (let j = 0; j < 22; j++) { const a = (j / 22) * 6.283, x = 560, y = 620; inkLine(g, [[x + Math.cos(a) * 500, y + Math.sin(a) * 420], [x + Math.cos(a) * 820, y + Math.sin(a) * 700]], { w: 14, stroke: alpha(ui().gold, 0.8) }); } },
  fx: (g, t, info, c) => {
    kids.forEach(([x]) => X.desk(g, x * E.W + 10, c.GY + 40, 1.25));
    [['IQ 60', 0], ['IQ 80', 1], ['IQ 100', 2], ['IQ 70', 3]].forEach(([s, i]) => pill(g, s, kids[i][0] * E.W + 5, 590, 54, '#ffffff', { w: 6 }));
    closeUp(g, { w: 'LEON', expr: 'smirk', x: LX / E.W, y: LY / E.H, r: LR }, t);
    const R = LR, ink = '#161616';
    // наглая ухмылка: стираем мягкую, рисуем широкую с ямочкой; полуприкрытые веки
    g.save(); g.fillStyle = '#ffffff'; g.fillRect(LX - 0.42 * R, LY + 0.2 * R, 0.95 * R, 0.3 * R); g.restore();
    g.save(); g.lineCap = 'round'; g.strokeStyle = ink; g.lineWidth = 0.075 * R; g.beginPath(); g.moveTo(LX - 0.3 * R, LY + 0.34 * R); g.quadraticCurveTo(LX + 0.08 * R, LY + 0.5 * R, LX + 0.42 * R, LY + 0.2 * R); g.stroke();
    g.lineWidth = 0.05 * R; g.beginPath(); g.moveTo(LX + 0.46 * R, LY + 0.3 * R); g.quadraticCurveTo(LX + 0.5 * R, LY + 0.22 * R, LX + 0.47 * R, LY + 0.14 * R); g.stroke(); g.restore();
    [[-0.34, 0.12], [0.34, -0.12]].forEach(([dx, tilt]) => { const ex = LX + dx * R, ey = LY - 0.17 * R, er = 0.15 * R; g.save(); g.beginPath(); g.rect(ex - er * 1.3, ey - er * 1.0, er * 2.6, er * 1.1); g.clip(); g.translate(ex, ey); g.rotate(tilt); g.fillStyle = '#ffffff'; g.fillRect(-er * 1.3, -er * 1.0, er * 2.6, er * 1.05); g.restore(); g.save(); g.translate(ex, ey); g.rotate(tilt); g.strokeStyle = ink; g.lineWidth = 0.06 * R; g.lineCap = 'round'; g.beginPath(); g.moveTo(-er * 1.15, 0); g.lineTo(er * 1.15, 0); g.stroke(); g.restore(); });
    pill(g, 'IQ 9,999', 560, 135, 160, ui().gold, { w: 10 });
    D.marker(g, 'WHAT IF YOU HAD', 1330, 90, { size: 80, outline: 14 });
  } });
