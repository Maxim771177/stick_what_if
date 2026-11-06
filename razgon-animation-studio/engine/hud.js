// engine/hud.js — game-like on-screen interface: counters (year, population, day), info boxes, checklists, headers,
// progress bars and pills. Used by map stories, "what if / life simulation" videos and any listicle.
// Fonts: FONTS.hud if the pack defines a "hud" font role (e.g. a pixel font), else FONTS.ui. Colours from S().ui.
import { E, V, S, ease, prog, clamp, lerp, alpha, text, measure, rr, FONTS } from './core.js';

const font = () => FONTS.hud || FONTS.ui;
const k = (t, start, d = 0.35) => (t == null ? 1 : ease.outBack(prog(t, start ?? 0, (start ?? 0) + d)));

// number formatting: fmt(1234567) -> "1,234,567"; fmt(1.2e9, 'short') -> "1.2B"; year(-3000) -> "3000 BC"
export function fmt(n, mode) {
  if (mode === 'short') { const a = Math.abs(n); return a >= 1e9 ? (n / 1e9).toFixed(1).replace(/\.0$/, '') + 'B' : a >= 1e6 ? (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M' : a >= 1e3 ? (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K' : String(Math.round(n)); }
  return Math.round(n).toLocaleString('en-US');
}
export const year = (y, o = {}) => (y < 0 ? `${Math.round(-y)} BC` : o.ad ? `AD ${Math.round(y)}` : `${Math.round(y)}`);
// a value that ticks from a to b between t0 and t1 (eased); round it yourself or pass to fmt/year
export const tick = (t, t0, t1, a, b, fn = ease.inOut) => lerp(a, b, fn(prog(t, t0, t1)));

function panel(g, x, y, w, h, o = {}) { const ui = S().ui; rr(g, x, y, w, h, o.r ?? Math.min(18, h / 3)); g.fillStyle = o.bg || alpha('#0b0f18', 0.72); g.fill(); if (o.line !== false) { g.strokeStyle = o.line || alpha(ui.cream || '#ffffff', 0.25); g.lineWidth = 2; g.stroke(); } }

// counter(g, str, x, y, { label, size, color, align, bg, t, start }) — a big number with a small label above it
export function counter(g, str, x, y, o = {}) {
  const s = k(o.t, o.start), ui = S().ui, size = o.size ?? V(64, 72), align = o.align || 'center'; if (s <= 0) return;
  g.save(); g.translate(x, y); g.scale(s, s);
  if (o.bg) { const w = Math.max(measure(g, str, size, font(), 900), o.label ? measure(g, o.label, size * 0.4, font(), 800) : 0) + size * 0.8, h = size * (o.label ? 1.75 : 1.3), x0 = align === 'left' ? -size * 0.4 : align === 'right' ? -w + size * 0.4 : -w / 2; panel(g, x0, -h + size * 0.72, w, h, { bg: o.bg === true ? undefined : o.bg }); }
  if (o.label) text(g, o.label, 0, -size * 0.85, { size: size * 0.4, color: o.labelColor || alpha(ui.cream || '#fff', 0.85), font: font(), weight: 800, align, spacing: 2 });
  text(g, str, 0, 0, { size, color: o.color || ui.gold, font: font(), weight: 900, align, stroke: o.stroke ?? size * 0.12, strokeColor: alpha('#000000', 0.55) });
  g.restore();
}
// infoBox(g, title, sub, { x, y, w, t, start, accent }) — dark translucent lower-third box (location, date, event)
export function infoBox(g, title, sub, o = {}) {
  const s = k(o.t, o.start, 0.3); if (s <= 0) return; const ui = S().ui, w = o.w ?? V(900, 900), size = o.size ?? V(40, 44), h = sub ? size * 2.6 : size * 1.6;
  const x = o.x ?? E.W / 2, y = o.y ?? E.H - V(130, 380);
  g.save(); g.globalAlpha *= clamp(s); g.translate(x, y + (1 - clamp(s)) * 30);
  panel(g, -w / 2, -h / 2, w, h, { bg: o.bg }); if (o.accent !== false) { g.fillStyle = o.accent || ui.accent; g.fillRect(-w / 2, -h / 2, 10, h); }
  text(g, title, 0, sub ? -size * 0.55 : 0, { size, color: '#ffffff', font: font(), weight: 900, spacing: 1 });
  if (sub) text(g, sub, 0, size * 0.6, { size: size * 0.7, color: alpha('#ffffff', 0.8), font: font(), weight: 700 });
  g.restore();
}
// checklist(g, items, x, y, { t, size, w, title }) — items: [{ text, at }] (ticked at time `at`) or [{ text, done }]
export function checklist(g, items, x, y, o = {}) {
  const ui = S().ui, size = o.size ?? V(32, 38), w = o.w ?? V(440, 520), lh = size * 1.55, h = items.length * lh + size * (o.title ? 2.2 : 0.8);
  g.save(); g.translate(x, y); panel(g, 0, 0, w, h, { bg: o.bg });
  let yy = size * 0.9; if (o.title) { text(g, o.title, size * 0.6, yy, { size: size * 0.9, color: ui.gold, font: font(), weight: 900, align: 'left', spacing: 1 }); yy += size * 1.4; }
  items.forEach((it) => {
    const done = it.done ?? (o.t != null && it.at != null && o.t >= it.at), pk = o.t != null && it.at != null ? ease.outBack(prog(o.t, it.at, it.at + 0.3)) : 1;
    rr(g, size * 0.6, yy - size * 0.45, size * 0.9, size * 0.9, 6); g.strokeStyle = alpha('#ffffff', 0.7); g.lineWidth = 3; g.stroke();
    if (done) { g.save(); g.translate(size * 1.05, yy); g.scale(pk, pk); g.strokeStyle = ui.good || '#5fd39a'; g.lineWidth = size * 0.16; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-size * 0.3, 0); g.lineTo(-size * 0.08, size * 0.22); g.lineTo(size * 0.34, -size * 0.3); g.stroke(); g.restore(); }
    text(g, it.text, size * 1.9, yy, { size, color: done ? '#ffffff' : alpha('#ffffff', 0.75), font: font(), weight: 800, align: 'left' });
    yy += lh;
  });
  g.restore();
}
// header(g, parts, { y, size, t, start }) — top status line: ['LIFE 3', 'AGE 7'] → "LIFE 3 • AGE 7"
export function header(g, parts, o = {}) {
  const s = k(o.t, o.start, 0.3); if (s <= 0) return; const ui = S().ui, size = o.size ?? V(40, 46), str = parts.join('  •  '), w = measure(g, str, size, font(), 900) + size * 1.6, y = o.y ?? V(70, 150);
  g.save(); g.globalAlpha *= clamp(s); panel(g, E.W / 2 - w / 2, y - size * 0.8, w, size * 1.6, { bg: o.bg, r: size * 0.8 }); text(g, str, E.W / 2, y, { size, color: o.color || '#ffffff', font: font(), weight: 900, spacing: 2 }); g.restore();
}
// bar(g, value 0..1, x, y, w, h, { color, label, t, start }) — a filling progress bar
export function bar(g, v, x, y, w, h, o = {}) {
  const ui = S().ui; panel(g, x, y, w, h, { bg: o.bg, r: h / 2 });
  const f = clamp(v); if (f > 0) { rr(g, x + 4, y + 4, Math.max(h - 8, (w - 8) * f), h - 8, (h - 8) / 2); g.fillStyle = o.color || ui.accent; g.fill(); }
  if (o.label) text(g, o.label, x + w / 2, y + h / 2, { size: h * 0.55, color: '#ffffff', font: font(), weight: 900, stroke: 4, strokeColor: alpha('#000', 0.5) });
}
// pill(g, str, x, y, { bg, color, size, t, start }) — rounded tag ("+12%", "WINNER", "DAY 3")
export function pill(g, str, x, y, o = {}) {
  const s = k(o.t, o.start); if (s <= 0) return; const ui = S().ui, size = o.size ?? V(34, 40), w = measure(g, str, size, font(), 900) + size * 1.2;
  g.save(); g.translate(x, y); g.scale(s, s); rr(g, -w / 2, -size * 0.75, w, size * 1.5, size * 0.75); g.fillStyle = o.bg || ui.accent; g.fill(); text(g, str, 0, 0, { size, color: o.color || '#ffffff', font: font(), weight: 900 }); g.restore();
}
