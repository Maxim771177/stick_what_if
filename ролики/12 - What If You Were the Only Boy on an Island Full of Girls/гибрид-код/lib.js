// Общие функции: математика, примитивы рисования, куклы, камера.
export const W = 1920, H = 1080, FONT = 'Impact,"Arial Black",sans-serif';
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)), lerp = (a, b, t) => a + (b - a) * t;
export const sm = t => { t = clamp(t); return t * t * (3 - 2 * t); }, eio = sm, eo = t => 1 - Math.pow(1 - clamp(t), 3);
export const back = t => { t = clamp(t); const c = 2.2; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
export const prog = (t, a, b) => clamp((t - a) / (b - a));
export function rnd(i) { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
export const mk = (w, h) => { const e = document.createElement('canvas'); e.width = w; e.height = h; return e; };
export function rr(c, x, y, w, h, r) { c.beginPath(); c.roundRect(x, y, w, h, r); }
export function outline(c, fill, lw = 9) { if (fill) { c.fillStyle = fill; c.fill(); } c.lineWidth = lw; c.strokeStyle = '#111'; c.lineJoin = 'round'; c.stroke(); }
export function dots(c, x, y, w, h, col, step, rad, fade) {
  c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.fillStyle = col;
  for (let j = 0, yy = y; yy < y + h; yy += step, j++) for (let xx = x + (j % 2 ? step / 2 : 0); xx < x + w; xx += step) { const f = fade ? clamp(fade(xx, yy)) : 1; if (f <= 0) continue; c.beginPath(); c.arc(xx, yy, rad * f, 0, 7); c.fill(); }
  c.restore();
}
export function stext(c, txt, x, y, size, fill, rot = 0, sc_ = 1, stroke = '#111', white = true) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(sc_, sc_); c.font = `${size}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.lineJoin = 'round';
  if (white) { c.lineWidth = size * .34; c.strokeStyle = '#fff'; c.strokeText(txt, 0, 0); }
  c.lineWidth = size * .17; c.strokeStyle = stroke; c.strokeText(txt, 0, 0); c.fillStyle = fill; c.fillText(txt, 0, 0); c.restore();
}
export function burst(c, x, y, r, n, fill, rot = 0, sc_ = 1) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(sc_, sc_); c.beginPath();
  for (let i = 0; i < n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, r_ = i % 2 ? r * .62 : r * (0.95 + 0.1 * rnd(i)); c.lineTo(Math.cos(a) * r_, Math.sin(a) * r_); }
  c.closePath(); c.lineWidth = 22; c.strokeStyle = '#fff'; c.lineJoin = 'round'; c.stroke(); outline(c, fill, 10); c.restore();
}
// камера: ключи [u, x, y, z, r], кубический эрмит как в шаблоне
export function camAt(K, u) {
  if (K.length === 1) return { x: K[0][1], y: K[0][2], z: K[0][3], r: K[0][4] || 0 };
  let i = 0; while (i < K.length - 2 && u > K[i + 1][0]) i++;
  const a = K[i], b = K[i + 1], p0 = K[Math.max(0, i - 1)], p1 = K[Math.min(K.length - 1, i + 2)];
  const uu = clamp((u - a[0]) / (b[0] - a[0] || 1)), o = [];
  for (let k = 1; k < 5; k++) {
    const A = a[k] ?? 0, B = b[k] ?? 0, P0 = p0[k] ?? 0, P1 = p1[k] ?? 0;
    const m0 = (B - P0) / ((b[0] - p0[0]) || 1) * (b[0] - a[0]) * .5, m1 = (P1 - A) / ((p1[0] - a[0]) || 1) * (b[0] - a[0]) * .5, u2 = uu * uu, u3 = u2 * uu;
    o.push((2 * u3 - 3 * u2 + 1) * A + (u3 - 2 * u2 + uu) * m0 + (-2 * u3 + 3 * u2) * B + (u3 - u2) * m1);
  }
  return { x: o[0], y: o[1], z: Math.max(.3, o[2]), r: o[3] };
}
