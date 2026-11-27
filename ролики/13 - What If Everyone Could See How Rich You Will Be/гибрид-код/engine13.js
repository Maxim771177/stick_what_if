// Ядро сборки ролика 13: гибрид Razgon + vizavi. Камера, герои, числа, надписи-стикеры, кадр.
// Сцены описаны в scenes13.js (функции от контекста k), места в places13.js, предметы в props13.js.
import { drawCharacter, POSES, posesAt, breathe, walkPose as rzWalk } from "/engine/characters.js";
import { E, setStyle } from "/engine/core.js";
import { loadPack } from "/engine/stylepack.js";
import * as H from "/hybrid13/heroes.js";

export const W = 1920, HT = 1080, SPEED = 1.2, BASE = 1.55;
export const FONT = 'Impact,"Arial Black",sans-serif';
export const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v)), lerp = (a, b, t) => a + (b - a) * t;
export const sm = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };
export const eo = (t) => 1 - Math.pow(1 - clamp(t), 3);
export const back = (t) => { t = clamp(t); const c = 2.2; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
export const prog = (t, a, b) => clamp((t - a) / (b - a));
export const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const mk = (w, h) => { const e = document.createElement('canvas'); e.width = w; e.height = h; return e; };
export { POSES, posesAt, breathe, H, E };

// ---------- примитивы ----------
export const rr = (c, x, y, w, h, r) => { c.beginPath(); c.roundRect(x, y, w, h, r); };
export function outline(c, fill, lw = 9) { if (fill) { c.fillStyle = fill; c.fill(); } if (lw) { c.lineWidth = lw; c.strokeStyle = '#111'; c.lineJoin = 'round'; c.stroke(); } }
export const rect = (c, x, y, w, h, fill, r = 8, lw = 8) => { rr(c, x, y, w, h, r); outline(c, fill, lw); };
export const circ = (c, x, y, r, fill, lw = 8) => { c.beginPath(); c.arc(x, y, r, 0, 7); outline(c, fill, lw); };
export const poly = (c, pts, fill, lw = 8) => { c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.closePath(); outline(c, fill, lw); };
export const line = (c, pts, lw = 8, col = '#111') => { c.beginPath(); pts.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.lineWidth = lw; c.strokeStyle = col; c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke(); };
export function dots(c, x, y, w, h, col, step, rad, fade) { c.save(); c.beginPath(); c.rect(x, y, w, h); c.clip(); c.fillStyle = col; for (let j = 0, yy = y; yy < y + h; yy += step, j++) for (let xx = x + (j % 2 ? step / 2 : 0); xx < x + w; xx += step) { const f = fade ? clamp(fade(xx, yy)) : 1; if (f <= 0) continue; c.beginPath(); c.arc(xx, yy, rad * f, 0, 7); c.fill(); } c.restore(); }
// ---- АВТО-ЧИТАЕМОСТЬ (правило с 27.11.2026): цвет текста подбирается под фон под ним, обводка контрастная ----
const hex2l = (h) => { let m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(h || ''); if (!m) return .8; let x = m[1]; if (x.length === 3) x = x.split('').map((q) => q + q).join(''); const v = [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16) / 255).map((u) => (u <= .03928 ? u / 12.92 : Math.pow((u + .055) / 1.055, 2.4))); return .2126 * v[0] + .7152 * v[1] + .0722 * v[2]; };
const contrast = (a, b) => (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
export const READ_LOG = (typeof window !== 'undefined' ? (window.__readLog = window.__readLog || []) : []);
function bgLum(c, w, h) { try { const m = c.getTransform(); const cw = c.canvas.width, ch = c.canvas.height; const bw = Math.abs(w * m.a), bh = Math.abs(h * m.d); const x0 = Math.max(0, Math.floor(m.e - bw / 2)), y0 = Math.max(0, Math.floor(m.f - bh / 2)), x1 = Math.min(cw, Math.ceil(m.e + bw / 2)), y1 = Math.min(ch, Math.ceil(m.f + bh / 2)); if (x1 - x0 < 4 || y1 - y0 < 4) return null; const d = c.getImageData(x0, y0, x1 - x0, y1 - y0).data; let sum = 0, n = 0; const step = Math.max(1, Math.floor(d.length / 4 / 200)); for (let i = 0; i < d.length; i += 4 * step) { const u = [d[i], d[i + 1], d[i + 2]].map((q) => { q /= 255; return q <= .03928 ? q / 12.92 : Math.pow((q + .055) / 1.055, 2.4); }); sum += .2126 * u[0] + .7152 * u[1] + .0722 * u[2]; n++; } return n ? sum / n : null; } catch (e) { return null; } }
export function stext(c, txt, x, y, size, fill, rot = 0, sc_ = 1, stroke = '#111', white = true, align = 'center') {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(sc_, sc_); c.font = `${size}px ${FONT}`; c.textAlign = align; c.textBaseline = 'middle'; c.lineJoin = 'round';
  let f = fill; let fl = hex2l(f); const tw = c.measureText(txt).width; const bl = bgLum(c, tw * (align === 'center' ? 1 : 2), size);
  // фон под текстом: если контраст с ним мал, берём противоположный цвет
  if (bl != null && !white && contrast(fl, bl) < 3) { f = bl > .35 ? '#0b1630' : '#ffffff'; fl = hex2l(f); if (!READ_LOG.includes(txt)) { READ_LOG.push(txt); console.warn('WARN readable-swap: ' + txt); } }
  const dark = fl < .3;
  if (dark) { // тёмный текст: белое гало, без чёрной обводки (иначе буквы заливает чёрным)
    c.lineWidth = size * .26; c.strokeStyle = '#fff'; c.strokeText(txt, 0, 0);
  } else { if (white) { c.lineWidth = size * .34; c.strokeStyle = '#fff'; c.strokeText(txt, 0, 0); } c.lineWidth = size * .17; c.strokeStyle = stroke; c.strokeText(txt, 0, 0); }
  c.fillStyle = f; c.fillText(txt, 0, 0); c.restore();
}
export function burst(c, x, y, r, n, fill, rot = 0, sc_ = 1) {
  c.save(); c.translate(x, y); c.rotate(rot); c.scale(sc_, sc_); c.beginPath(); for (let i = 0; i < n * 2; i++) { const a = i / (n * 2) * Math.PI * 2, r_ = i % 2 ? r * .62 : r * (0.95 + 0.1 * rnd(i)); c.lineTo(Math.cos(a) * r_, Math.sin(a) * r_); } c.closePath();
  c.lineWidth = 22; c.strokeStyle = '#fff'; c.lineJoin = 'round'; c.stroke(); outline(c, fill, 10); c.restore();
}
export function ptext(c, txt, x, y, size, fill = '#111', align = 'center', font = 'Arial Black,Impact,sans-serif') { c.save(); c.font = `${size}px ${font}`; c.textAlign = align; c.textBaseline = 'middle'; c.fillStyle = fill; c.fillText(txt, x, y); c.restore(); }
export function wrapText(c, txt, maxW, size, font = 'Arial Black,Impact,sans-serif') { c.save(); c.font = `${size}px ${font}`; const ws = txt.split(' '), lines = []; let cur = ''; for (const w of ws) { const t = cur ? cur + ' ' + w : w; if (c.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; } else cur = t; } if (cur) lines.push(cur); c.restore(); return lines; }

// ---------- состав героев ----------
const KIDS = H.KIDS;
const ADULTS = [
  { top: 'tshirt', color: '#3f8f5a', hair: 'short', hairColor: '#8a8a8a', legs: '#4a4a58' },
  { top: 'dress', color: '#b86ad0', hair: 'bun', hairColor: '#6b3a1e' },
  { top: 'suit', color: '#e8eef5', face: 'glasses', hair: 'short', hairColor: '#9a9a9a', legs: '#4a5a78', beard: true, whiteHands: true },
  { top: 'hoodie', color: '#c0504d', hair: 'short', hairColor: '#2b2420', legs: '#3a3a48' },
  { top: 'dress', color: '#f2c21a', hair: 'ponytail', hairColor: '#2b2420' },
  { top: 'jersey', color: '#2f80ed', hair: 'curly', hairColor: '#4a2f1e', legs: '#2b3a6b' }];
export const outfitOf = (id) => /^A\d$/.test(id) ? ADULTS[parseInt(id.slice(1)) % ADULTS.length] : (/^K\d+$/.test(id) ? KIDS[parseInt(id.slice(1)) % KIDS.length] : H[id]);
export const smOf = (id) => /^A\d$/.test(id) ? 1.2 : /^K\d+$/.test(id) ? H.SM.KID : (H.SM[id] ?? 1.15);
POSES.holdUp = { ...POSES.stand, eF: [24, -176], hF: [40, -220], eB: [8, -150], hB: [22, -172] };
POSES.sitHand = { ...POSES.sit, eF: [22, -122], hF: [50, -112] };
POSES.sitLean = { ...POSES.sit, head: [22, -176], sh: [14, -144], eF: [30, -116], hF: [54, -112], eB: [24, -112], hB: [44, -104] };
POSES.sitTurn = { ...POSES.sit };
POSES.sitWrite = { ...POSES.sit, head: [20, -172], sh: [10, -142], eF: [34, -112], hF: [58, -104], eB: [18, -112], hB: [36, -98] };
POSES.sitUp = { ...POSES.sit, head: [6, -184], eF: [14, -112], hF: [30, -92], eB: [8, -112], hB: [24, -88] };
POSES.sitHands = { ...POSES.sit, eF: [24, -168], hF: [12, -202], eB: [-6, -168], hB: [-2, -206] };
POSES.sitCheer = { ...POSES.sit, eF: [22, -190], hF: [36, -228], eB: [-14, -190], hB: [-24, -226] };
POSES.hold2 = { ...POSES.stand, eF: [24, -140], hF: [48, -146], eB: [14, -140], hB: [38, -144] };
POSES.back = { ...POSES.stand, head: [-6, -208], sh: [-4, -174] };
POSES.lean = { ...POSES.stand, head: [24, -196], sh: [14, -168], eF: [30, -140], hF: [46, -124], eB: [8, -138], hB: [20, -110] };
POSES.clap = { ...POSES.stand, eF: [24, -152], hF: [40, -170], eB: [18, -150], hB: [38, -168] };
POSES.thumb = { ...POSES.stand, eF: [30, -170], hF: [54, -196], eB: [-7, -136], hB: [-9, -100] };
POSES.writeAir = { ...POSES.stand, eF: [30, -170], hF: [56, -180], eB: [-7, -136], hB: [-9, -100] };
POSES.pull = { ...POSES.stand, head: [-8, -206], sh: [-8, -172], eF: [30, -150], hF: [56, -120], eB: [22, -150], hB: [48, -118] };
POSES.ride = { ...POSES.sit, head: [14, -180], sh: [8, -146], eF: [40, -134], hF: [62, -118], eB: [34, -132], hB: [58, -112] };
POSES.tear = { ...POSES.stand, eF: [28, -170], hF: [48, -170], eB: [-4, -170], hB: [-38, -170] };
POSES.tie = { ...POSES.stand, head: [30, -140], sh: [22, -118], hip: [0, -86], eF: [44, -90], hF: [60, -52], eB: [34, -88], hB: [52, -46], kF: [20, -46], fF: [16, 0], kB: [-4, -46], fB: [-16, 0] };

// ---------- камера: [x, zoom, gy] — gy = экранная y земли ----------
export function camAt(sc, lt, D) {
  const ks = sc.cam || [[0, 1, 890], [0, 1.06, 890]], a = ks[0], b = ks[ks.length - 1], u = sm(clamp(lt / D));
  let x = lerp(a[0], b[0], u), z = lerp(a[1], b[1], u), gy = lerp(a[2] ?? 890, b[2] ?? 890, u), r = lerp(a[3] || 0, b[3] || 0, u);
  if (ks.length === 3) { const m = ks[1], u2 = sm(clamp(lt / D * 2)), u3 = sm(clamp(lt / D * 2 - 1)); const p = lt / D < .5 ? [lerp(a[0], m[0], u2), lerp(a[1], m[1], u2), lerp(a[2] ?? 890, m[2] ?? 890, u2)] : [lerp(m[0], b[0], u3), lerp(m[1], b[1], u3), lerp(m[2] ?? 890, b[2] ?? 890, u3)]; x = p[0]; z = p[1]; gy = p[2]; }
  x += Math.sin(lt * .9) * 10; r += Math.sin(lt * .6) * .003; gy += Math.sin(lt * 1.1) * 5;
  return { x, z, y: -(gy - 540) / z, r, gy };
}
export function worldTransform(c, cm, par) { c.setTransform(1, 0, 0, 1, 0, 0); c.translate(W / 2, HT / 2); c.rotate(cm.r * (par > 1 ? 1.15 : 1)); c.scale(cm.z, cm.z); c.translate(-cm.x * par, -cm.y); }
export const toScreen = (cm, wx, wy) => { const dx = wx - cm.x, dy = wy - cm.y; const c = Math.cos(cm.r), s = Math.sin(cm.r); return [W / 2 + cm.z * (dx * c - dy * s), HT / 2 + cm.z * (dx * s + dy * c)]; };

// ---------- числа над головой ----------
const parseVal = (s) => { const m = s.replace(/[−–]/g, '-').match(/\$?([\d,]+)/g); if (!m) return null; const v = parseInt(m[m.length - 1].replace(/[$,]/g, '')); return isNaN(v) ? null : v; };
export const fmtVal = (v) => '$' + Math.round(v).toLocaleString('en-US');
export function buildNumTimeline(scenes) {
  const ev = []; const skip = new Set(['S137', 'S138', 'S139', 'S142']);
  for (const s of scenes) { if (skip.has(s.id)) continue; for (const t of s.texts) if (t.k === 'num') { const v = parseVal(t.s); if (v == null) continue; const arrow = t.s.includes('→') ? t.s.split('→')[0].trim() : ''; ev.push({ t: t.t, v, label: arrow }); } }
  for (const [t, v] of [[463.4, 52e9], [465.9, 64e9], [468.4, 78e9], [470.8, 95e9], [472.4, 112e9]]) ev.push({ t, v, label: '' });
  ev.sort((a, b) => a.t - b.t); return ev;
}
export function numAt(ev, t) {
  let i = -1; for (let k = 0; k < ev.length; k++) if (ev[k].t <= t) i = k; if (i < 0) return null;
  const cur = ev[i], prev = i > 0 ? ev[i - 1].v : cur.v, u = sm(prog(t, cur.t, cur.t + .6));
  const d = t - cur.t; return { v: lerp(prev, cur.v, u), label: cur.label, d, up: cur.v > prev, change: cur.v !== prev, first: i === 0 };
}
export function drawNum(c, x, y, txt, o = {}) {
  const fs = o.fs || 66, t = o.t || 0, k = o.k ?? 1; if (k <= 0.01) return; const flash = o.flash || 0, col = flash > 0 ? (o.up ? '#8aff6a' : '#ff5b4a') : '#ffd23f';
  const yy = y + Math.sin(t * 3) * 6 - (1 - k) * 30; c.save(); c.translate(x, yy); c.scale(k * (1 + .03 * Math.sin(t * 6)), k * (1 + .03 * Math.sin(t * 6)));
  c.save(); c.globalAlpha = .55; const g = c.createRadialGradient(0, 0, 10, 0, 0, fs * 4.2); g.addColorStop(0, 'rgba(255,225,90,.85)'); g.addColorStop(1, 'rgba(255,225,90,0)'); c.fillStyle = g; c.fillRect(-fs * 5, -fs * 2, fs * 10, fs * 4); c.restore();
  stext(c, txt, 0, 0, fs, col, 0, 1, '#111', true); c.restore();
}
export function deltaLabel(c, x, y, label, up, k) {
  if (k <= .01) return; c.save(); c.translate(x, y); c.rotate(up ? -.08 : .08); c.scale(k, k); const col = up ? '#3fdc55' : '#ff4a3d';
  c.font = `54px ${FONT}`; const w = c.measureText(label).width + 90; rr(c, -w / 2, -40, w, 80, 24); c.lineWidth = 18; c.strokeStyle = '#fff'; c.stroke(); outline(c, '#111', 10);
  c.beginPath(); if (up) { c.moveTo(-w / 2 + 38, 18); c.lineTo(-w / 2 + 38, -18); c.moveTo(-w / 2 + 22, -2); c.lineTo(-w / 2 + 38, -20); c.lineTo(-w / 2 + 54, -2); } else { c.moveTo(-w / 2 + 38, -18); c.lineTo(-w / 2 + 38, 18); c.moveTo(-w / 2 + 22, 2); c.lineTo(-w / 2 + 38, 20); c.lineTo(-w / 2 + 54, 2); }
  c.lineWidth = 9; c.strokeStyle = col; c.lineCap = 'round'; c.lineJoin = 'round'; c.stroke(); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = col; c.fillText(label, 22, 3); c.restore();
}

// ---------- фигура со стикер-вырубкой ----------
const fig_cv = mk(1500, 1500), fig_x = fig_cv.getContext('2d'), sil = mk(1500, 1500), sil_x = sil.getContext('2d');
export function drawFigure(c, o) {
  const rz = { x: 0, y: 0, s: o.s, facing: o.face, pose: o.pose, outfit: o.outfit, expr: o.expr || 'neutral', blink: o.blink, talk: o.talk || 0, look: o.look, prop: o.prop, rot: o.rot };
  if (o.plain) { c.save(); c.translate(o.x, o.y); c.globalAlpha *= o.alpha ?? 1; drawCharacter(c, rz); c.restore(); return; }
  fig_x.setTransform(1, 0, 0, 1, 0, 0); fig_x.clearRect(0, 0, 1500, 1500); fig_x.save(); fig_x.translate(750, 1050); const sq = o.squash || [1, 1]; fig_x.scale(sq[0], sq[1]); drawCharacter(fig_x, rz); fig_x.restore();
  sil_x.setTransform(1, 0, 0, 1, 0, 0); sil_x.globalCompositeOperation = 'source-over'; sil_x.clearRect(0, 0, 1500, 1500); sil_x.drawImage(fig_cv, 0, 0); sil_x.globalCompositeOperation = 'source-in'; sil_x.fillStyle = '#fff'; sil_x.fillRect(0, 0, 1500, 1500); sil_x.globalCompositeOperation = 'source-over';
  c.save(); c.translate(o.x, o.y); c.translate(-750, -1050); c.globalAlpha *= o.alpha ?? 1; const R = 8; for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; c.drawImage(sil, Math.cos(a) * R, Math.sin(a) * R); } c.drawImage(fig_cv, 0, 0); c.restore();
}
export const blinkAt = (t, k) => ((t + k) % (2.8 + (k % 1.3))) > 2.7;

// ---------- собака Biscuit (картинки канала) ----------
export const TANDEM_IMG = new Image(); const DOGIMG = {}; export async function loadDog() { TANDEM_IMG.src = '/hybrid13/assets/tandem.png'; await new Promise((r) => { TANDEM_IMG.onload = r; TANDEM_IMG.onerror = r; }); for (const n of ['sit', 'lie', 'stand', 'tilt', 'wag', 'beg', 'sniff', 'tired']) { const im = new Image(); im.src = `/hybrid13/assets/dog_${n}.png`; await new Promise((r) => { im.onload = r; im.onerror = r; }); DOGIMG[n] = im; } }
const DOGH = { sit: 170, lie: 100, stand: 165, tilt: 175, wag: 165, beg: 210, sniff: 140, tired: 100 };
export function dog(c, x, y, o = {}) {
  const t = o.t || 0, f = o.f ?? 1, p = o.pose || 'stand', key = p === 'stand' && (o.wag ?? 0) > 0 && Math.sin(t * o.wag) > 0 ? 'wag' : p; const im = DOGIMG[key] || DOGIMG.stand; if (!im || !im.width) return null;
  const h = DOGH[key] * (o.k || 1), sc = h / im.height; c.save(); c.translate(x, y); c.rotate(o.rot || 0); c.scale(f * sc, sc * (o.sq || 1)); c.drawImage(im, -im.width / 2, -im.height); c.restore(); return { x, y: y - h, h, w: im.width * sc };
}

// ---------- контекст сцены ----------
export class K {
  constructor(sc, t, cam) { this.sc = sc; this.t = t; this.lt = t - sc.start; this.D = sc.end - sc.start; this.items = []; this.heads = {}; this.cam = cam; this.errs = []; this.overlays = []; this.pops = []; }
  ph(a, b) { return prog(this.lt, a, b); }
  // ключи [[t,v],...] → число с плавной интерполяцией
  at(keys, fn = sm) { let v = keys[0][1]; for (let i = 1; i < keys.length; i++) { if (this.lt < keys[i][0]) { const a = keys[i - 1], b = keys[i]; return lerp(a[1], b[1], fn(prog(this.lt, a[0], b[0]))); } v = keys[i][1]; } return v; }
  step(keys) { let v = keys[0][1]; for (const [t, x] of keys) if (this.lt >= t) v = x; return v; }
  pose(spec, blend = .3) { if (!spec) return POSES.stand; if (typeof spec === 'string') return POSES[spec] || POSES.stand; if (Array.isArray(spec)) return posesAt(this.lt, spec.map(([t, p]) => [t, typeof p === 'string' ? (POSES[p] || POSES.stand) : p]), blend); return spec; }
  push(z, fn) { this.items.push({ z, fn }); }
  p(kind, x, y, o = {}) { const z = o.z ?? 5; const self = this; this.push(z, (c) => PROPS[kind] && PROPS[kind](c, x, y, { t: self.t, lt: self.lt, k: self, ...o })); }
  // актёр: x — позиция (число) или path [[t,x],...]; o: pose, expr, look, face, y, s, prop, z, still, talk
  a(id, x, o = {}) {
    const out = o.out ? { ...outfitOf(id), ...o.out } : outfitOf(id), sm_ = smOf(id), S = BASE * sm_ * (o.s || 1), kid = !!out.kid, se = S * (kid ? .72 : 1);
    let f = o.face ?? 1, moving = false, ph = 0, X = x;
    if (Array.isArray(x)) { const pts = x; let trav = 0; X = pts[0][1]; for (let i = 1; i < pts.length; i++) { const a = pts[i - 1], b = pts[i], seg = Math.abs(b[1] - a[1]); if (this.lt >= b[0]) { X = b[1]; trav += seg; } else if (this.lt > a[0]) { const u = sm(prog(this.lt, a[0], b[0])); X = lerp(a[1], b[1], u); trav += Math.abs(X - a[1]); if (seg > 4 && this.lt < b[0]) { moving = true; if (o.face == null) f = Math.sign(b[1] - a[1]) || f; } break; } else break; } ph = trav / (o.run ? 190 : 112) / S * Math.PI * 2; if (moving && o.face == null) { } if (o.face == null && !moving) { const last = pts.findLast((p, i) => i > 0 && this.lt >= p[0] && Math.abs(p[1] - pts[i - 1][1]) > 4); if (last) { const i = pts.indexOf(last); f = Math.sign(last[1] - pts[i - 1][1]); } else if (pts.length > 1) { f = Math.sign(pts[1][1] - pts[0][1]) || 1; } } }
    let pose = moving && !o.noWalk ? rzWalk(ph, o.run ? { run: true } : { stride: o.stride || 34 }) : this.pose(o.pose);
    if (moving && o.carry) { const c0 = POSES[o.carry], dx = pose.sh[0] - c0.sh[0], dy = pose.sh[1] - c0.sh[1]; pose = { ...pose, eF: [c0.eF[0] + dx, c0.eF[1] + dy], hF: [c0.hF[0] + dx, c0.hF[1] + dy], eB: [c0.eB[0] + dx, c0.eB[1] + dy], hB: [c0.hB[0] + dx, c0.hB[1] + dy] }; }
    if (!o.still && !moving) pose = breathe(pose, this.t, 1, id.length * 3 + (parseInt(id.slice(1)) || 0));
    const y = Array.isArray(o.y) ? this.at(o.y) : (o.y || 0), expr = Array.isArray(o.expr) ? this.stepx(o.expr) : (o.expr || 'neutral');
    let look = o.look; if (look === 'up') look = [0.05, -1.6]; else if (look === 'upL') look = [-0.5, -1.5]; else if (look === 'upR') look = [0.5, -1.5]; else if (Array.isArray(look) && Array.isArray(look[0])) look = this.stepx(look); else if (!look) look = [f * .55, 0];
    const bob = o.bob ? -Math.abs(Math.sin(this.t * o.bob)) * 14 : 0;
    const HR = 44 * 1.25 * (kid ? 1.12 : 1), dx_ = pose.head[0] - pose.sh[0], dy_ = pose.head[1] - pose.sh[1], dl = Math.hypot(dx_, dy_) || 1, hcl = [pose.sh[0] + dx_ / dl * HR * .92, pose.sh[1] + dy_ / dl * HR * .92];
    const head = [X + f * se * hcl[0], y + se * hcl[1] + bob], hr = HR * se, hand = [X + f * se * pose.hF[0], y + se * pose.hF[1] + bob], handB = [X + f * se * pose.hB[0], y + se * pose.hB[1] + bob], sh = [X + f * se * pose.sh[0], y + se * pose.sh[1]];
    const r = { id, x: X, y, f, se, S, head, hand, handB, sh, top: [head[0], head[1] - hr * 1.28], hr, eyes: [[head[0] + f * .08 * hr, head[1] - .16 * hr], [head[0] + f * .66 * hr, head[1] - .16 * hr]], pose, moving, kid, out };
    if (!o.hide) { this.heads[id] = r; const z = o.z ?? (10 + y * .02);
      const obj = { oid: id, outfit: out, x: X, y: y + bob, s: S, face: f, pose, expr, blink: blinkAt(this.t, id.length * 3 + (parseInt(id.slice(1)) || 0)), talk: o.talk ? Math.abs(Math.sin(this.t * 13)) : 0, look, prop: o.prop, rot: o.rot, alpha: o.alpha, squash: o.squash, plain: o.plain ?? (/^K\d+$/.test(id)) };
      this.push(z, (c) => { if (o.clip) { c.beginPath(); typeof o.clip === 'function' ? o.clip(c) : c.rect(...o.clip); c.clip(); } if (o.sil) c.filter = 'brightness(0) opacity(.6)'; drawFigure(c, obj); });
      if (!o.crop && !/^K\d+$/.test(id) && !o.noCheck) this.check(id, r, o); }
    return r;
  }
  stepx(keys) { let v = keys[0][1]; for (const [t, x] of keys) if (this.lt >= t) v = x; return v; }
  // число над актёром: txt или null (берёт глобальное для LEON)
  num(r, txt, o = {}) { if (!r || txt == null) return; const self = this; this.push(60, (c) => drawNum(c, r.head[0] + (o.dx || 0), r.top[1] - (o.up ?? 70 * r.se / 1.0) - (o.fs || 66) * .5, txt, { t: self.t, fs: o.fs || 66, k: o.k ?? 1, flash: o.flash, up: o.upc })); }
  check(id, r, o) {
    const cm = this.cam; const hs = toScreen(cm, r.head[0], r.top[1] - 4), ft = toScreen(cm, r.x, r.y + 2); const m = 8; if (hs[0] > W + 150 || hs[0] < -150) return;
    const strict = id === 'LEON'; const bad = hs[1] < m || ft[1] > HT - m + 40 || (strict && (hs[0] < 24 || hs[0] > W - 24 || ft[0] < 24 || ft[0] > W - 24));
    if (bad) this.errs.push(`ERROR frame-check ${this.sc.id} ${id} head=(${hs.map(Math.round)}) foot=(${ft.map(Math.round)}) lt=${this.lt.toFixed(1)}`);
  }
  heartEyes(r, o = {}) { if (r) this.p('heartEyes', 0, 0, { z: 85, e: r.eyes, r: .21 * r.hr, ...o }); }
  pop(name, at) { this.pops.push({ name, at }); }
}
export const PROPS = {}; export const PLACES = {};
export function registerProps(o) { Object.assign(PROPS, o); } export function registerPlaces(o) { Object.assign(PLACES, o); }
export async function boot() { Object.assign(E, { W, H: HT, PX: 1, fps: 60, cfg: {}, words: [], shots: [] }); await loadPack("doodle"); setStyle("clean"); await loadDog(); }
