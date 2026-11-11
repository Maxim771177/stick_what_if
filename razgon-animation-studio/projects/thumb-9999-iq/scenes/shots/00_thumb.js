import { def, E, C, D, S, ui, text, measure, FONTS, inkLine, inkRect, inkCircle, alpha } from '../lib.js';
// Превью ролика 01: Leon с ухмылкой и огромным золотым IQ, одноклассники с малым IQ смотрят на него с удивлением.
const pill = (g, str, x, y, sz, fill, o = {}) => {
  const w = measure(g, str, sz) + sz * 0.9, h = sz * 1.45;
  if (o.rays) for (let j = 0; j < 18; j++) { const a = (j / 18) * 6.283 + 0.1; inkLine(g, [[x + Math.cos(a) * w * 0.62, y + Math.sin(a) * h * 0.95], [x + Math.cos(a) * w * 0.8, y + Math.sin(a) * h * 1.3]], { w: 10, stroke: ui().gold }); }
  inkRect(g, x - w / 2, y - h / 2, w, h, { fill, r: h / 2, w: o.w || 8 });
  text(g, str, x, y + sz * 0.18, { size: sz, font: FONTS.title, weight: 400, color: S().ink });
};
def('t001', { set: 'classroom', cam: 'still',
  chars: [
    { w: 'LEON', x: 0.3, s: 3.0, dy: 95, pose: 'crossArms', expr: 'smirk', noin: true },
    { w: 'KIDBG', x: 0.62, s: 1.9, f: -1, pose: 'stand', expr: 'surprised', noin: true },
    { w: 'KIDBG', x: 0.77, s: 1.9, f: -1, pose: 'stand', expr: 'surprised', noin: true },
    { w: 'KIDBG', x: 0.92, s: 1.9, f: -1, pose: 'stand', expr: 'surprised', noin: true },
  ],
  pre: (g) => { for (let j = 0; j < 20; j++) { const a = (j / 20) * 6.283, x = 600, y = 480; inkLine(g, [[x + Math.cos(a) * 520, y + Math.sin(a) * 430], [x + Math.cos(a) * 760, y + Math.sin(a) * 620]], { w: 12, stroke: alpha(ui().gold, 0.85) }); } },
  fx: (g, t, info, c) => {
    pill(g, 'IQ 9,999', 600, 128, 150, ui().gold, { w: 10 });
    [['IQ 60', 0.62], ['IQ 80', 0.77], ['IQ 100', 0.92]].forEach(([s, x]) => pill(g, s, x * E.W - 10, 420, 54, '#ffffff'));
  } });
