import { def, E, C, D, S, ui, text, measure, FONTS, inkLine, inkRect, inkCircle, inkShape, alpha, closeUp } from '../lib.js';
import { loadImages, project } from '/engine/assets.js';
// Превью ролика 01 (v3): фон от OpenAI (закатный класс), Leon кодом крупным планом с наглой ухмылкой и золотым свечением,
// позади рядами за партами одноклассники с малым IQ.
const IM = await loadImages({ bg: project('local/bg.png') });
const pill = (g, str, x, y, sz, fill, o = {}) => {
  const w = measure(g, str, sz) + sz * 0.9, h = sz * 1.45;
  g.save(); g.translate(x, y); g.rotate(o.rot || 0);
  if (o.glow) { g.shadowColor = 'rgba(255,200,60,.95)'; g.shadowBlur = 50; }
  inkRect(g, -w / 2, -h / 2, w, h, { fill, r: h / 2, w: o.w || 8 });
  g.shadowBlur = 0;
  text(g, str, 0, sz * 0.18, { size: sz, font: FONTS.title, weight: 400, color: o.color || S().ink });
  g.restore();
};
const KIDS = [   // голова (x, y), радиус, лицо, дальний край парты (за ним тело скрыто)
  { x: 1190, y: 395, r: 40, w: 'KIDBG', iq: 'IQ 60', desk: 458 }, { x: 1700, y: 390, r: 40, w: 'KID', iq: 'IQ 70', desk: 452 },
  { x: 1310, y: 500, r: 52, w: 'FRIEND', iq: 'IQ 80', desk: 566 }, { x: 1590, y: 500, r: 52, w: 'KIDBG', iq: 'IQ 90', desk: 566 },
  { x: 1440, y: 618, r: 66, w: 'KID', iq: 'IQ 100', desk: 690 }, { x: 1780, y: 622, r: 66, w: 'FRIEND', iq: 'IQ 85', desk: 690 },
];
const LX = 0.26 * 1920, LY = 0.72 * 1080, LR = 380;
def('t001', { set: 'void', cam: 'still',
  pre: (g) => { g.drawImage(IM.bg, 0, -120, 1920, 1280); const gr = g.createRadialGradient(LX, LY - 100, 80, LX, LY - 100, 900); gr.addColorStop(0, 'rgba(255,205,70,.65)'); gr.addColorStop(1, 'rgba(255,205,70,0)'); g.fillStyle = gr; g.fillRect(0, 0, 1920, 1080); },
  fx: (g, t, info, c) => {
    KIDS.forEach((k) => { closeUp(g, { w: k.w, expr: 'surprised', x: k.x / E.W, y: k.y / E.H, r: k.r }, t);
      g.save(); g.beginPath(); g.rect(k.x - k.r * 2.2, k.desk, k.r * 4.4, 400); g.clip(); g.drawImage(IM.bg, 0, -120, 1920, 1280); g.restore(); });   // стол закрывает тело
    KIDS.forEach((k) => pill(g, k.iq, k.x + 4, k.y - k.r * 2.05, 22 + k.r * 0.3, '#ffffff', { w: 5, rot: -0.04 }));
    closeUp(g, { w: 'LEON', expr: 'smirk', x: LX / E.W, y: LY / E.H, r: LR }, t);
    const R = LR, ink = '#161616';
    g.save(); g.fillStyle = '#ffffff'; g.fillRect(LX - 0.42 * R, LY + 0.2 * R, 0.95 * R, 0.3 * R); g.restore();
    g.save(); g.lineCap = 'round'; g.strokeStyle = ink; g.lineWidth = 0.075 * R; g.beginPath(); g.moveTo(LX - 0.3 * R, LY + 0.34 * R); g.quadraticCurveTo(LX + 0.08 * R, LY + 0.5 * R, LX + 0.42 * R, LY + 0.2 * R); g.stroke();
    g.lineWidth = 0.05 * R; g.beginPath(); g.moveTo(LX + 0.46 * R, LY + 0.3 * R); g.quadraticCurveTo(LX + 0.5 * R, LY + 0.22 * R, LX + 0.47 * R, LY + 0.14 * R); g.stroke(); g.restore();
    [[-0.34, 0.12], [0.34, -0.12]].forEach(([dx, tilt]) => { const ex = LX + dx * R, ey = LY - 0.17 * R, er = 0.15 * R; g.save(); g.beginPath(); g.rect(ex - er * 1.1, ey - er * 0.9, er * 2.2, er * 1.0); g.clip(); g.translate(ex, ey); g.rotate(tilt); g.fillStyle = '#ffffff'; g.fillRect(-er * 1.1, -er * 0.9, er * 2.2, er * 0.95); g.restore(); g.save(); g.translate(ex, ey); g.rotate(tilt); g.strokeStyle = ink; g.lineWidth = 0.06 * R; g.lineCap = 'round'; g.beginPath(); g.moveTo(-er * 1.15, 0); g.lineTo(er * 1.15, 0); g.stroke(); g.restore(); });
    pill(g, 'IQ 9,999', 500, 150, 140, ui().gold, { w: 10, glow: true, rot: -0.03 });
    text(g, 'WHAT IF', 1330, 105, { size: 135, font: FONTS.ui, weight: 900, color: '#ffffff', stroke: 22, strokeColor: '#161616' });
    text(g, 'YOU HAD', 1330, 245, { size: 135, font: FONTS.ui, weight: 900, color: '#ffe14a', stroke: 22, strokeColor: '#161616' });
  } });
