// engine/flags.js — simplified national flags drawn by code (no image files, nothing to credit).
// paintFlag(g, spec | countryName, x, y, w, h) fills the box; clip to any shape first (a ball, a country outline).
// Specs: {h:[colours], r:[ratios]} horizontal bands · {v:[…], r} vertical bands · {cross:[bg, cross, inner?]} Nordic
//        {disc:[bg, disc], dx} · {plus:[bg, fg]} · {star:[bg, fg], at:[fx,fy], size} · {crescent:[bg, fg]}
//        plus `over: [extra specs]` drawn on top, and `canton:{spec, w, h}` for a corner field.
// Emblems and fine details are simplified on purpose: at ball / map scale they read as the real flag.

const FLAGS = {
  France: { v: ['#0055a4', '#ffffff', '#ef4135'] }, Italy: { v: ['#009246', '#ffffff', '#ce2b37'] }, Ireland: { v: ['#169b62', '#ffffff', '#ff883e'] },
  Belgium: { v: ['#1a1a1a', '#fdda24', '#ef3340'] }, Romania: { v: ['#002b7f', '#fcd116', '#ce1126'] }, Chad: { v: ['#002664', '#fecb00', '#c60c30'] },
  Mali: { v: ['#14b53a', '#fcd116', '#ce1126'] }, Nigeria: { v: ['#008751', '#ffffff', '#008751'] }, Guinea: { v: ['#ce1126', '#fcd116', '#009460'] },
  "Côte d'Ivoire": { v: ['#f77f00', '#ffffff', '#009e60'] }, Peru: { v: ['#d91023', '#ffffff', '#d91023'] }, Afghanistan: { v: ['#1a1a1a', '#be0000', '#007a36'] },
  Germany: { h: ['#1a1a1a', '#dd0000', '#ffce00'] }, Netherlands: { h: ['#ae1c28', '#ffffff', '#21468b'] }, Russia: { h: ['#ffffff', '#0039a6', '#d52b1e'] },
  Austria: { h: ['#ed2939', '#ffffff', '#ed2939'] }, Hungary: { h: ['#ce2939', '#ffffff', '#477050'] }, Bulgaria: { h: ['#ffffff', '#00966e', '#d62612'] },
  Estonia: { h: ['#0072ce', '#1a1a1a', '#ffffff'] }, Lithuania: { h: ['#fdb913', '#006a44', '#c1272d'] }, Latvia: { h: ['#9e3039', '#ffffff', '#9e3039'], r: [2, 1, 2] },
  Ukraine: { h: ['#0057b7', '#ffd700'] }, Poland: { h: ['#ffffff', '#dc143c'] }, Indonesia: { h: ['#ce1126', '#ffffff'] }, Luxembourg: { h: ['#ed2939', '#ffffff', '#00a1de'] },
  Armenia: { h: ['#d90012', '#0033a0', '#f2a800'] }, Yemen: { h: ['#ce1126', '#ffffff', '#1a1a1a'] }, Egypt: { h: ['#ce1126', '#ffffff', '#1a1a1a'], over: [{ disc: [null, '#c09300'], size: 0.12 }] },
  Iraq: { h: ['#ce1126', '#ffffff', '#1a1a1a'] }, Syria: { h: ['#ce1126', '#ffffff', '#1a1a1a'] }, 'Sierra Leone': { h: ['#1eb53a', '#ffffff', '#0072c6'] },
  Gabon: { h: ['#009e60', '#fcd116', '#3a75c4'] }, Colombia: { h: ['#fcd116', '#003893', '#ce1126'], r: [2, 1, 1] }, Bolivia: { h: ['#d52b1e', '#f9e300', '#007934'] },
  Spain: { h: ['#aa151b', '#f1bf00', '#aa151b'], r: [1, 2, 1] }, Argentina: { h: ['#74acdf', '#ffffff', '#74acdf'], over: [{ disc: [null, '#f6b40e'], size: 0.13 }] },
  India: { h: ['#ff9933', '#ffffff', '#138808'], over: [{ disc: [null, '#000080'], size: 0.12, ring: true }] }, Iran: { h: ['#239f40', '#ffffff', '#da0000'] },
  Thailand: { h: ['#a51931', '#f4f5f8', '#2d2a4a', '#f4f5f8', '#a51931'], r: [1, 1, 2, 1, 1] }, Cambodia: { h: ['#032ea1', '#e00025', '#032ea1'], r: [1, 2, 1] },
  Sweden: { cross: ['#006aa7', '#fecc00'] }, Norway: { cross: ['#ba0c2f', '#ffffff', '#00205b'] }, Denmark: { cross: ['#c8102e', '#ffffff'] },
  Finland: { cross: ['#ffffff', '#002f6c'] }, Iceland: { cross: ['#02529c', '#ffffff', '#dc1e35'] },
  Japan: { disc: ['#ffffff', '#bc002d'] }, Bangladesh: { disc: ['#006a4e', '#f42a41'], dx: -0.05 }, Switzerland: { plus: ['#da291c', '#ffffff'] },
  China: { star: ['#de2910', '#ffde00'], at: [0.2, 0.28], size: 0.16 }, Vietnam: { star: ['#da251d', '#ffff00'], at: [0.5, 0.5], size: 0.26 },
  'North Korea': { h: ['#024fa2', '#ffffff', '#ed1c27', '#ffffff', '#024fa2'], r: [1, 0.2, 3, 0.2, 1] },
  Turkey: { crescent: ['#e30a17', '#ffffff'] }, Pakistan: { crescent: ['#01411c', '#ffffff'], hoist: '#ffffff' }, Tunisia: { crescent: ['#e70013', '#ffffff'] },
  'Saudi Arabia': { h: ['#006c35'] }, Libya: { h: ['#e70013', '#1a1a1a', '#239e46'], r: [1, 2, 1] }, Morocco: { star: ['#c1272d', '#006233'], at: [0.5, 0.5], size: 0.2 },
  Mexico: { v: ['#006847', '#ffffff', '#ce1126'], over: [{ disc: [null, '#8c5a2b'], size: 0.12 }] }, Portugal: { v: ['#006600', '#ff0000'], r: [2, 3], over: [{ disc: [null, '#ffcc29'], dx: -0.1, size: 0.16 }] },
  Czechia: { h: ['#ffffff', '#d7141a'], tri: '#11457e' }, Philippines: { h: ['#0038a8', '#ce1126'], tri: '#ffffff' }, Cuba: { h: ['#002a8f', '#ffffff', '#002a8f', '#ffffff', '#002a8f'], tri: '#cf142b' },
  Brazil: { h: ['#009c3b'], rhomb: '#ffdf00', over: [{ disc: [null, '#002776'], size: 0.2 }] }, Canada: { v: ['#d52b1e', '#ffffff', '#d52b1e'], r: [1, 2, 1], over: [{ star: [null, '#d52b1e'], at: [0.5, 0.5], size: 0.22 }] },
  'United States of America': { h: ['#b22234', '#ffffff', '#b22234', '#ffffff', '#b22234', '#ffffff', '#b22234', '#ffffff', '#b22234', '#ffffff', '#b22234', '#ffffff', '#b22234'], canton: { spec: { h: ['#3c3b6e'] }, w: 0.4, h: 7 / 13, dots: '#ffffff' } },
  Greece: { h: ['#0d5eaf', '#ffffff', '#0d5eaf', '#ffffff', '#0d5eaf', '#ffffff', '#0d5eaf', '#ffffff', '#0d5eaf'], canton: { spec: { plus: ['#0d5eaf', '#ffffff'] }, w: 0.37, h: 5 / 9 } },
  'United Kingdom': { union: true }, Australia: { h: ['#00008b'], canton: { spec: { union: true }, w: 0.5, h: 0.5 }, over: [{ star: [null, '#ffffff'], at: [0.25, 0.75], size: 0.12 }] },
  'New Zealand': { h: ['#00247d'], canton: { spec: { union: true }, w: 0.5, h: 0.5 } },
  'South Korea': { disc: ['#ffffff', '#cd2e3a'], half: '#0047a0' }, Israel: { h: ['#ffffff', '#0038b8', '#ffffff', '#0038b8', '#ffffff'], r: [1, 1.2, 4, 1.2, 1] },
  Kazakhstan: { h: ['#00afca'], over: [{ disc: [null, '#fec50c'], size: 0.14 }] }, Mongolia: { v: ['#c4272f', '#015197', '#c4272f'] }, Nepal: { h: ['#dc143c'] },
  'South Africa': { h: ['#e03c31', '#ffffff', '#007749', '#ffffff', '#001489'], r: [3, 0.6, 2, 0.6, 3], tri: '#1a1a1a' }, Kenya: { h: ['#1a1a1a', '#ffffff', '#bb0000', '#ffffff', '#006600'], r: [3, 0.5, 3, 0.5, 3] },
  Ethiopia: { h: ['#078930', '#fcdd09', '#da121a'] }, Ghana: { h: ['#ce1126', '#fcd116', '#006b3f'], over: [{ star: [null, '#1a1a1a'], at: [0.5, 0.5], size: 0.14 }] },
  Chile: { h: ['#ffffff', '#d52b1e'], canton: { spec: { star: ['#0039a6', '#ffffff'], at: [0.5, 0.5], size: 0.3 }, w: 1 / 3, h: 0.5 } }, Venezuela: { h: ['#ffcc00', '#00247d', '#cf142b'] },
  Serbia: { h: ['#c6363c', '#0c4076', '#ffffff'] }, Croatia: { h: ['#ff0000', '#ffffff', '#171796'] }, Slovakia: { h: ['#ffffff', '#0b4ea2', '#ee1c25'] }, Slovenia: { h: ['#ffffff', '#005ce5', '#ed1c24'] },
  Belarus: { h: ['#c8313e', '#4aa657'], r: [2, 1] }, Georgia: { plus: ['#ffffff', '#ff0000'] }, Moldova: { v: ['#0046ae', '#ffd200', '#cc092f'] }, Albania: { h: ['#e41e20'] },
  Malaysia: { h: ['#cc0001', '#ffffff', '#cc0001', '#ffffff', '#cc0001', '#ffffff', '#cc0001'], canton: { spec: { h: ['#010066'] }, w: 0.5, h: 4 / 7 } }, Myanmar: { h: ['#fecb00', '#34b233', '#ea2839'] },
  Laos: { h: ['#ce1126', '#002868', '#ce1126'], r: [1, 2, 1], over: [{ disc: [null, '#ffffff'], size: 0.16 }] }, 'Sri Lanka': { h: ['#8d153a'] }, Uzbekistan: { h: ['#0099b5', '#ffffff', '#1eb53a'] },
  Algeria: { v: ['#006233', '#ffffff'], over: [{ disc: [null, '#d21034'], size: 0.14, ring: true }] }, Sudan: { h: ['#d21034', '#ffffff', '#1a1a1a'], tri: '#007229' },
};
const hash = (s) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);
export const flagFor = (name) => FLAGS[name] || null;
export const hasFlag = (name) => !!FLAGS[name];
export const flagNames = () => Object.keys(FLAGS);
// a stable pleasant colour for countries without a flag spec (map fills)
export function countryColor(name, sat = 55, light = 62) { return `hsl(${hash(name || '?') % 360}, ${sat}%, ${light}%)`; }

function bands(g, cols, ratios, x, y, w, h, vertical) {
  const r = ratios || cols.map(() => 1), tot = r.reduce((a, b) => a + b, 0); let p = 0;
  cols.forEach((c, i) => { const d = (r[i] / tot) * (vertical ? w : h); g.fillStyle = c; vertical ? g.fillRect(x + p - 0.5, y, d + 1, h) : g.fillRect(x, y + p - 0.5, w, d + 1); p += d; });
}
function starPath(g, cx, cy, R, n = 5) { g.beginPath(); for (let i = 0; i < n * 2; i++) { const a = -Math.PI / 2 + (i * Math.PI) / n, r = i % 2 ? R * 0.42 : R; g.lineTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r); } g.closePath(); }
function union(g, x, y, w, h) {
  g.fillStyle = '#012169'; g.fillRect(x, y, w, h);
  const L = (x1, y1, x2, y2, wd, c) => { g.strokeStyle = c; g.lineWidth = wd; g.beginPath(); g.moveTo(x1, y1); g.lineTo(x2, y2); g.stroke(); };
  const t = Math.min(w, h);
  L(x, y, x + w, y + h, t * 0.2, '#ffffff'); L(x + w, y, x, y + h, t * 0.2, '#ffffff');
  L(x, y, x + w, y + h, t * 0.07, '#c8102e'); L(x + w, y, x, y + h, t * 0.07, '#c8102e');
  L(x + w / 2, y, x + w / 2, y + h, t * 0.33, '#ffffff'); L(x, y + h / 2, x + w, y + h / 2, t * 0.33, '#ffffff');
  L(x + w / 2, y, x + w / 2, y + h, t * 0.2, '#c8102e'); L(x, y + h / 2, x + w, y + h / 2, t * 0.2, '#c8102e');
}
export function paintFlag(g, spec, x, y, w, h) {
  if (typeof spec === 'string') spec = FLAGS[spec] || { h: [countryColor(spec)] };
  g.save(); g.lineCap = 'butt';
  if (spec.union) union(g, x, y, w, h);
  if (spec.h) bands(g, spec.h, spec.r, x, y, w, h, false);
  if (spec.v) bands(g, spec.v, spec.r, x, y, w, h, true);
  if (spec.cross) { const [bg, c, inner] = spec.cross; g.fillStyle = bg; g.fillRect(x, y, w, h); const cx = x + w * 0.36, t = h * 0.22; g.fillStyle = c; g.fillRect(cx - t / 2, y, t, h); g.fillRect(x, y + h / 2 - t / 2, w, t); if (inner) { const ti = t * 0.5; g.fillStyle = inner; g.fillRect(cx - ti / 2, y, ti, h); g.fillRect(x, y + h / 2 - ti / 2, w, ti); } }
  if (spec.plus) { const [bg, c] = spec.plus; g.fillStyle = bg; g.fillRect(x, y, w, h); const s = Math.min(w, h) * 0.6, t = s * 0.3; g.fillStyle = c; g.fillRect(x + w / 2 - t / 2, y + h / 2 - s / 2, t, s); g.fillRect(x + w / 2 - s / 2, y + h / 2 - t / 2, s, t); }
  if (spec.disc && spec.disc[0]) { g.fillStyle = spec.disc[0]; g.fillRect(x, y, w, h); }
  if (spec.star && spec.star[0]) { g.fillStyle = spec.star[0]; g.fillRect(x, y, w, h); }
  if (spec.crescent) { const [bg, c] = spec.crescent; g.fillStyle = bg; g.fillRect(x, y, w, h); if (spec.hoist) { g.fillStyle = spec.hoist; g.fillRect(x, y, w * 0.25, h); } const cx = x + w * (spec.hoist ? 0.6 : 0.42), cy = y + h / 2, R = h * 0.26; g.fillStyle = c; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.fill(); g.fillStyle = bg; g.beginPath(); g.arc(cx + R * 0.28, cy, R * 0.8, 0, Math.PI * 2); g.fill(); g.fillStyle = c; starPath(g, cx + R * 0.95, cy, R * 0.32); g.fill(); }
  if (spec.tri) { g.fillStyle = spec.tri; g.beginPath(); g.moveTo(x, y); g.lineTo(x + w * 0.42, y + h / 2); g.lineTo(x, y + h); g.closePath(); g.fill(); }
  if (spec.rhomb) { g.fillStyle = spec.rhomb; g.beginPath(); g.moveTo(x + w * 0.08, y + h / 2); g.lineTo(x + w / 2, y + h * 0.1); g.lineTo(x + w * 0.92, y + h / 2); g.lineTo(x + w / 2, y + h * 0.9); g.closePath(); g.fill(); }
  if (spec.canton) { const c = spec.canton, cw = w * c.w, ch = h * c.h; g.save(); g.beginPath(); g.rect(x, y, cw, ch); g.clip(); paintFlag(g, c.spec, x, y, cw, ch); if (c.dots) { g.fillStyle = c.dots; for (let i = 0; i < 9; i++) for (let j = 0; j < 5; j++) { g.beginPath(); g.arc(x + cw * (0.1 + i * 0.1), y + ch * (0.12 + j * 0.19 + (i % 2) * 0.09), Math.min(cw, ch) * 0.03, 0, Math.PI * 2); g.fill(); } } g.restore(); }
  const drawDisc = (d) => { const R = Math.min(w, h) * (d.size || 0.3), cx = x + w * (0.5 + (d.dx || 0)), cy = y + h / 2; g.fillStyle = d.disc[1]; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI * 2); g.fill(); if (d.ring) { g.fillStyle = '#ffffff'; g.beginPath(); g.arc(cx, cy, R * 0.75, 0, Math.PI * 2); g.fill(); } if (d.half) { g.fillStyle = d.half; g.beginPath(); g.arc(cx, cy, R, 0, Math.PI); g.fill(); } };
  const drawStar = (d) => { g.fillStyle = d.star[1]; starPath(g, x + w * d.at[0], y + h * d.at[1], Math.min(w, h) * d.size); g.fill(); };
  if (spec.disc) drawDisc({ ...spec, half: spec.half }); if (spec.star) drawStar(spec);
  for (const o of spec.over || []) { if (o.disc) drawDisc(o); if (o.star) drawStar(o); }
  g.restore();
}
