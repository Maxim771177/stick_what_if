import { def, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, texts } from '../lib.js';
import * as X from '../gfx.js';
import { W, H, UP, c, LEON, kids, chair, table, desk, hs, trayAt, ballAt } from '../cast.js';
export { def, E, C, D, ease, prog, clamp, lerp, text, measure, FONTS, S, inkLine, inkRect, inkCircle, inkShape, inkEllipse, alpha, prop, kf, texts, X, W, H, UP, c, LEON, kids, chair, table, desk, hs, trayAt, ballAt };
export const GYH = () => E.H * 0.82;
// мяч: центр (x,y), r = радиус в пикселях
export const ball = (g, x, y, r, rot = 0) => prop(g, 'dodgeball', x, y, r * 2, { rot });
// траектория: от (x0,y0) к (x1,y1) за [t0,t0+d] с дугой arc (px вверх)
export const fly = (t, t0, d, x0, y0, x1, y1, arc = 80) => { const u = clamp((t - t0) / d); return [lerp(x0, x1, u), lerp(y0, y1, u) - Math.sin(u * Math.PI) * arc, u]; };
export const tag = (id, x, o = {}) => c(id, x, { tag: id, ...o });
// команда Chase: 4 ребёнка в ряд лицом вправо (f=1)
export const TEAM = (xs, o = {}) => kids(xs, { f: 1, off: 2, pose: 'stand', ...o });
// зрители на скамейке
export const bench = (g, x, GY, w = 520) => { inkRect(g, x - w / 2, GY - 120, w, 22, { fill: '#c98b4a', r: 6, w: 5 }); inkLine(g, [[x - w / 2 + 30, GY - 98], [x - w / 2 + 30, GY]], { w: 6 }); inkLine(g, [[x + w / 2 - 30, GY - 98], [x + w / 2 - 30, GY]], { w: 6 }); };
// подпись-метка со стрелкой (кодом поверх)
export const arrow = (g, x0, y0, x1, y1, col = '#e5383b') => { g.save(); g.strokeStyle = col; g.fillStyle = col; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); const a = Math.atan2(y1 - y0, x1 - x0); g.beginPath(); g.moveTo(x1, y1); g.lineTo(x1 - 30 * Math.cos(a - 0.5), y1 - 30 * Math.sin(a - 0.5)); g.lineTo(x1 - 30 * Math.cos(a + 0.5), y1 - 30 * Math.sin(a + 0.5)); g.closePath(); g.fill(); g.restore(); };
