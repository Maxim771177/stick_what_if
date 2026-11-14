// lib.js: общий каркас кадров ролика 03 «What If You Doubled in Size Every 10 Minutes?» (пак doodle:clean, как ролики 01 и 02).
// Кадр = def('s001', {...}). Поля: set, cam, chars[], kids{}, fx(g,t,info,c) (поверх людей), pre(g,t,info,c) (до людей), close{...}, ty.
// Тексты на экране: story/texts.json (из text_elements.md; k = cap | plate | say | hud | hudtick | lbl). HUD (время и рост) рисует lib по полю hud раскадровки.
import { E, V, S, registerShot, mood, layer, blurLayer, ease, prog, lerp, clamp, FONTS, text, measure, shade, alpha } from '/engine/core.js';
import { drawCharacter, characterCloseUp, characterHead, POSES, posesAt, breathe, walkPose } from '/engine/characters.js';
import { camPath, drift, camAdd } from '/engine/motion.js';
import * as D from '/engine/doodle.js';
import { inkShape, inkCircle, inkRect, inkLine, inkTube, inkEllipse, inkBlob } from '/engine/ink.js';
import { loadImages, img, loadJSON, project } from '/engine/assets.js';

export { E, V, S, mood, layer, ease, prog, lerp, clamp, FONTS, text, measure, shade, alpha, D, inkShape, inkCircle, inkRect, inkLine, inkTube, inkEllipse, inkBlob, POSES, walkPose, posesAt, breathe, drawCharacter, characterHead, characterCloseUp };

const TEXTS = await loadJSON(project('story/texts.json'));
const STORY = await loadJSON(project('story/shots.json'));
export const C = { wood: '#c98b4a', woodD: '#9a6a3a', board: '#3f6b57', paper: '#fffdf6', glass: '#cfe6f5', red: '#d8232a', gold: '#f6b93b', blue: '#3d7ea6', grey: '#b8b3a8', night: '#2e3a5c', green: '#7da55a', cream: '#f3e8d6', asphalt: '#8c8c93', orange: '#f28a1e' };
export const ui = () => S().ui;
// маленькие люди для масштаба рядом с гигантом: TINY(x, i, s, о) — ребёнок, смотрит вверх, в шоке
export const TINY = (x, i = 0, s = 0.5, o = {}) => ({ w: ['KID', 'KID2', 'KID3', 'KID4', 'KID5', 'KID6'][i % 6], x, s, pose: 'stand', expr: 'shocked', look: [0.3, -2.2], noin: true, ...o });
export const texts = (info, k) => TEXTS.filter((r) => (!k || r.k === k) && r.t >= info.shot.start - 0.02 && r.t < info.shot.end - 0.05).map((r) => ({ ...r, lt: r.t - info.shot.start }));

// ---------- наряды (doodle). Leon: одна кукла Razgon на весь канал, ONE_LEON ниже не отключать ----------
export const OUT = {
  LEON: { arcBrows: true, top: 'tshirt', color: '#d8232a', color2: '#ffffff', emblem: 'bolt', shorts: '#8a8a8a', shoes: '#f28a1e', sneakers: true, whiteHands: true, hair: 'none', hairColor: '#6b3a1e', hat: 'capBack', hatColor: '#17c3b2' },
  NORA: { top: 'tshirt', color: '#f2c21a', hair: 'short', hairColor: '#8a5a2e', kid: true, legs: '#7a5a9b' },
  MOM: { top: 'dress', color: '#f29ac0', hair: 'ponytail', hairColor: '#6b3a1e' },
  DRIVER: { top: 'suit', color: '#2f5d8a', hat: 'capBack', hatColor: '#2f5d8a', hair: 'short', hairColor: '#2b2420', legs: '#3a3a48' },
  BULLY: { top: 'hoodie', color: '#8a3a3a', hair: 'messy', hairColor: '#2b2420', legs: '#3a3a48', kid: true },
  GUARD: { top: 'jersey', color: '#f2a03a', hat: 'capBack', hatColor: '#f2a03a', hair: 'short', hairColor: '#6b3a1e', legs: '#3a4a6b' },
  MAN: { top: 'tshirt', color: '#5a7fb0', hat: 'capBack', hatColor: '#d8232a', hair: 'short', hairColor: '#3a2a1e', legs: '#4a5a78' },
  PILOT: { top: 'suit', color: '#2b3a55', hat: 'capBack', hatColor: '#2b3a55', hair: 'short', hairColor: '#2b2420', legs: '#2b3a55' },
  CTRL: { top: 'suit', color: '#6b4e9b', face: 'glasses', hair: 'bun', legs: '#4a3a6b' },
  CLIMB: { top: 'hoodie', color: '#e4872b', hat: 'beanie', hatColor: '#3d7ea6', legs: '#3a4a6b' },
  CLIMB2: { top: 'hoodie', color: '#3fb950', hat: 'beanie', hatColor: '#f2c21a', legs: '#3a4a6b' },
  GALILEO: { top: 'suit', color: '#8a4a3a', hair: 'long', hairColor: '#d8d8d8', face: 'glasses', legs: '#3a2a2a' },
  NEIGH: { top: 'tshirt', color: '#d6872b', hair: 'short', hairColor: '#6b3a1e', legs: '#4a5a78' },
  NEIGH2: { top: 'dress', color: '#7da55a', hair: 'bun', hairColor: '#2b2420' },
  NEIGH3: { top: 'hoodie', color: '#5a3e8a', hair: 'curly', hairColor: '#2b2420', legs: '#3a3a48' },
  TODD: { top: 'tshirt', color: '#3a6ea5', hair: 'curly', hairColor: '#2b2420', kid: true, legs: '#3a4a6b' },
  BABY: { top: 'hoodie', color: '#7da55a', hair: 'short', hairColor: '#8a5a2e', kid: true, legs: '#3a4a6b' },
  KID: { top: 'hoodie', color: '#3fb950', hair: 'short', kid: true },
  KID2: { top: 'tshirt', color: '#3a6ea5', hair: 'curly', hairColor: '#2b2420', kid: true },
  KID3: { top: 'tshirt', color: '#f29ac0', hair: 'ponytail', hairColor: '#6b3a1e', kid: true },
  KID4: { top: 'hoodie', color: '#c9c3b4', hair: 'messy', hairColor: '#8a5a2e', kid: true },
  KID5: { top: 'tshirt', color: '#8a6ab0', hair: 'short', hairColor: '#2b2420', kid: true },
  KID6: { top: 'tshirt', color: '#f2a03a', hair: 'long', hairColor: '#2b2420', kid: true },
};
Object.values(OUT).forEach((o) => { o.whiteHands = true; });
for (const k of ['KID', 'KID2', 'KID3', 'KID4', 'KID5', 'KID6']) OUT[k].legs = OUT[k].legs || '#3a4a6b';
const KIDS = ['KID', 'KID2', 'KID3', 'KID4', 'KID5', 'KID6', 'TODD'];
const SM = { LEON: 0.86, NORA: 0.78, BULLY: 1.5, TODD: 1.1, BABY: 0.8, KID: 1.15, KID2: 1.15, KID3: 1.15, KID4: 1.15, KID5: 1.15, KID6: 1.15 };

const tl = (v, t) => (Array.isArray(v) && Array.isArray(v[0]) ? v.reduce((a, [tt, x]) => (t >= tt ? x : a), v[0][1]) : v);
const kf = (v, t, d = 0) => { if (v == null) return d; if (!Array.isArray(v)) return v; if (t <= v[0][0]) return v[0][1]; for (let i = 1; i < v.length; i++) if (t <= v[i][0]) { const [a, x] = v[i - 1], [b, y] = v[i]; return lerp(x, y, ease.inOut(prog(t, a, b))); } return v[v.length - 1][1]; };
export { tl, kf };
const blinkAt = (t, k) => ((t + k) % (2.8 + (k % 1.3))) > 2.7 + (k % 1.3) * 0;
const ONE_LEON = true;
const SIT = (p) => p === 'sit' || p === 'sitBack';
const wordsOf = (s) => s.split(/\s+/).length;
const TALKSEQ = ['talk', 'explain', 'talk', 'point'];
export function talkWins(spec, info) {
  const T0 = info.shot.start, T1 = info.shot.end, out = {}; let k = 0;
  for (const r of TEXTS) { if (r.k !== 'say' || r.t < T0 - 0.02 || r.t >= T1 - 0.05) continue; const idx = (spec.say ?? [0])[k % (spec.say ?? [0]).length] ?? 0; k++; const a = r.t - T0, b = Math.min(info.dur, a + Math.max(1.0, wordsOf(r.s) * 0.34 + 0.3)); (out[idx] ||= []).push([a, b]); }
  return out;
}
const inWin = (w, t) => (w || []).some(([a, b]) => t >= a && t <= b);

// ---------- один персонаж ----------
export function who(g, c, t, info, GY, wins) {
  const id = c.w || 'KID', f = c.f ?? 1, x = (c.x ?? 0.5) * E.W, y = GY + (c.dy ?? 0) + kf(c.dyK, t, 0);
  let cx = x; let walking = false;
  if (c.walk) { const [x0, x1, t0, t1] = c.walk; const u = clamp((t - t0) / (t1 - t0)); cx = lerp(x0, x1, ease.inOut(u)) * E.W; walking = u > 0 && u < 1; }
  if (c.xK) cx = kf(c.xK, t, 0.5) * E.W;
  const pn = tl(c.pose || 'stand', t), expr = tl(c.expr || 'neutral', t);
  const s = kf(c.s, t, 1.55) * (SM[id] ?? 1);
  const talking = (c.talk && t >= c.talk[0] && t <= c.talk[1]) || inWin(wins, t);
  const ent = c.noin ? 1 : ease.outBack(prog(t, c.in ?? 0, (c.in ?? 0) + 0.5)), pop = 0.86 + 0.14 * ent;
  const o = { x: cx, y: y, s, facing: f, outfit: { ...OUT[id], ...(c.of || {}) }, expr, blink: blinkAt(t, (c.x || 0) * 9 + id.length), talk: talking ? 0.5 + 0.5 * Math.sin(t * 22) : 0, look: c.look, prop: tl(c.prop, t), alpha: c.a == null ? undefined : tl(c.a, t), rot: c.rot };
  if (c.fall) o.rot = c.fall * ease.in(clamp(t / 0.5));
  if (c.rotK) o.rot = kf(c.rotK, t);
  if (c.hide && (t < c.hide[0] || t > c.hide[1])) return { x: cx, y, s, hy: y - 300 * s * 0.5, hidden: true };
  let pose;
  if (walking) pose = walkPose(t * 2 * Math.PI * 1.3);
  else if (c.poseObj) pose = c.poseObj;
  else if (talking && ['stand', 'relaxed', 'talk', 'explain'].includes(pn) && !SIT(pn)) pose = breathe(posesAt(t, Array.from({ length: 30 }, (_, i) => [i * 0.7, TALKSEQ[(i + id.length) % 4]])), t, 1, id.length + 2);
  else pose = breathe(posesAt(t, (Array.isArray(c.pose) ? c.pose : [[0, c.pose || 'stand']])), t, 1, id.length + 2);
  o.pose = pose;
  const yo = c.bob ? -Math.abs(Math.sin(t * c.bob)) * 10 : 0;
  g.save(); g.translate(cx, y); g.scale(pop, pop); g.translate(-cx, -y);
  o.y = y + yo;
  drawCharacter(g, o);
  g.restore();
  o.hy = characterHead(o)[1];
  if (c.after) c.after(g, o, t);
  return o;
}

export function closeUp(g, c, t, wins) {
  if (c.show && (t < c.show[0] || t > c.show[1])) return;
  const id = c.w || 'LEON', x = (c.x ?? 0.5) * E.W, y = (c.y ?? 0.62) * E.H, r = kf(c.rK, t, c.r ?? 330);
  characterCloseUp(g, x, y, r, { outfit: { ...OUT[id], ...(c.of || {}) }, expr: tl(c.expr || 'neutral', t), blink: blinkAt(t, 1), talk: (c.talk && t >= c.talk[0] && t <= c.talk[1]) || inWin(wins, t) ? 0.5 + 0.5 * Math.sin(t * 22) : 0 });
}

// ---------- HUD: время и рост (правила в начале storyboard.md) ----------
// Плашка справа сверху, тёмная: время белым (значок часов), рост жёлтым. На каждом удвоении метка «+10 MIN» (оранжевая капсула), рост перекатывается счётчиком.
const parseTime = (s) => { const m = /(\d+):(\d+)\s*(AM|PM)/i.exec(s || ''); return m ? ((+m[1] % 12) + (/PM/i.test(m[3]) ? 12 : 0)) * 60 + +m[2] : null; };
const fmtTime = (m) => { m = Math.round(m); const h = Math.floor(m / 60) % 24, mm = m % 60; return `${((h + 11) % 12) + 1}:${String(mm).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };
const parseFt = (s) => { const q = /(\d+)\s*ft\s*(\d+)\s*in/i.exec(s || ''); if (q) return +q[1] + +q[2] / 12; const m = /([\d.,]+)\s*(ft|mi|miles)\b/i.exec(s || ''); if (!m) return null; const v = parseFloat(m[1].replace(/,/g, '')); return /ft/i.test(m[2]) ? v : v * 5280; };
const comma = (n) => Math.round(n).toLocaleString('en-US');
export function fmtH(ft) { if (ft < 5) return `${Math.floor(ft)} FT ${Math.round((ft % 1) * 12)} IN`; if (ft < 40000 && ft < 5280 * 3.4 || ft < 40000 && ft > 20000) return `${comma(ft)} FT${ft >= 4000 && ft < 5280 ? ` · ${(ft / 5280).toFixed(2)} MI` : ''}`; const mi = ft / 5280; return mi < 50 ? `${mi.toFixed(1)} MI` : `${comma(mi)} MI`; }
const HUD = {}; { let prev = null; for (const sh of STORY.shots) { const raw = sh.hud; if (!raw || raw === '—') continue; const [ts, hs] = raw.split('·').map((x) => x.trim()); const st = { t: parseTime(ts), time: ts.toUpperCase(), ft: parseFt(hs), h: (hs || '').toUpperCase().replace(/ MILES$/, ' MI') }; if (st.ft != null && Math.abs(st.ft - 4608) < 1) st.h = '4,608 FT · 0.87 MI'; if (st.ft != null && /\bmi\b/i.test(hs) && (Math.round(st.ft / 5280) === 62 || Math.round(st.ft / 5280) === 223)) st.h = st.h.replace(' MI', ' MILES'); if (!st.h || st.h.startsWith('…')) st.h = '…'; st.h = st.h.replace(/^(\d+) FT$/, (m, a) => m); HUD[sh.id] = { cur: st, prev }; prev = st; } }
const HUD_FROM = { s070: { t: parseTime('4:00 PM'), time: '4:00 PM', ft: 288, h: fmtH(288) } };
const HUD_TIME_ONLY = { s001: '3:00 PM', s002: '3:00 PM' };
const stOf = (t, d) => ({ t: d.t, time: d.time, ft: d.ft, h: d.h });
function hudState(info, t) {
  const id = info.shot.id, H = HUD[id], ticks = texts(info, 'hudtick'), hrows = texts(info, 'hud');
  if (HUD_TIME_ONLY[id]) return { vis: 1, time: HUD_TIME_ONLY[id], h: null, tick: null, k: ease.outBack(prog(t, 0.3, 0.7)) };
  if (!H) return null;
  const cur = H.cur, prev = HUD_FROM[id] || H.prev; let time = cur.time, h = cur.h, tickT = null, tickN = 0;
  const lastShotHud = (() => { const i = STORY.shots.findIndex((x) => x.id === id); const p = STORY.shots[i - 1]; return p && p.hud && p.hud !== '—'; })();
  const slideAt = (id === 's003') ? 0.9 : 0;
  if (ticks.length && prev && prev.ft && cur.ft) {
    const t0 = ticks[0].lt, n = Math.max(1, Math.round(Math.log2(cur.ft / prev.ft))); tickT = t0; tickN = n; const stepD = n > 1 ? 0.55 : 0.8;
    const u = clamp((t - t0) / (stepD * n)); const idx = Math.min(n, Math.floor(u * n + 0.0001)), frac = u * n - Math.floor(u * n);
    if (t < t0) { time = prev.time; h = prev.h; } else if (u >= 1) { time = cur.time; h = cur.h; } else { const q = idx / n; const tm = lerp(prev.t, cur.t, q), ftv = prev.ft * Math.pow(cur.ft / prev.ft, q); time = fmtTime(tm); h = fmtH(ftv); }
    if (hrows.length && t < hrows[0].lt && t >= t0 + stepD * n) { time = cur.time; h = cur.h; }
  } else if (prev && !lastShotHud && id !== 's003') { /* HUD появляется заново */ }
  else if (prev && prev.h !== cur.h && t < 0.5 && id !== 's003') { time = cur.time; h = cur.h; }
  if (id === 's132') { const m = lerp(parseTime('7:41 PM'), 21 * 60, ease.inOut(prog(t, 0, 3))); time = prog(t, 0, 3) >= 1 ? '≈ 9:00 PM' : fmtTime(m); }
  const enter = !lastShotHud ? ease.outBack(prog(t, slideAt + (hrows[0] && id === 's003' ? hrows[0].lt - 0.6 : 0), slideAt + 0.45 + (hrows[0] && id === 's003' ? hrows[0].lt - 0.6 : 0))) : 1;
  return { vis: 1, time, h, tick: tickT, tickN, k: enter, popH: ticks.length ? tickT : null, id };
}
export function drawHud(g, t, info) {
  const st = hudState(info, t); if (!st || st.k <= 0.01) return;
  const W = 330, Hh = st.h ? 128 : 76, x = E.W - W - 28, y = 26;
  g.save(); g.translate(x + W, y); g.scale(st.k, st.k); g.translate(-W, 0);
  inkRect(g, 0, 0, W, Hh, { fill: '#1b2230', r: 26, w: 5 });
  inkCircle(g, 40, 38, 19, { fill: '#fff', w: 4 }); inkLine(g, [[40, 38], [40, 26]], { w: 4 }); inkLine(g, [[40, 38], [49, 42]], { w: 4 });
  const shown = st.tick != null && t >= st.tick && t < st.tick + 0.5 ? 1 + 0.12 * Math.sin(prog(t, st.tick, st.tick + 0.5) * Math.PI) : 1;
  text(g, st.time, 74, 40, { size: 44 * shown, color: '#fff', font: FONTS.title, weight: 400 , align: 'left', size2: shown });
  if (st.h) { let sz = st.h.length > 9 ? 48 : 58; const mw = measure(g, st.h, sz); if (mw > W - 50) sz = Math.floor(sz * (W - 50) / mw); text(g, st.h, W / 2, 94, { size: sz, color: '#ffd23a', font: FONTS.title, weight: 400, stroke: 6, strokeColor: '#1b2230' }); }
  g.restore();
  if (st.tick != null) { const lt = t - st.tick; for (let i = 0; i < (st.tickN || 1); i++) { const t0 = i * (st.tickN > 1 ? 0.55 : 0); const d = lt - t0; if (d < 0 || d > 1.1) continue; const k = ease.outBack(prog(d, 0, 0.25)), a = 1 - prog(d, 0.7, 1.1); g.save(); g.globalAlpha = a; g.translate(x + W - 100 + (i % 2 ? 24 : 0), y + Hh + 36 - d * 36); g.scale(k, k); inkRect(g, -86, -30, 172, 60, { fill: '#f28a1e', r: 30, w: 5 }); text(g, '+10 MIN', 0, 3, { size: 38, color: '#fff', font: FONTS.title, weight: 400, stroke: 5, strokeColor: '#1b2230' }); g.restore(); } }
}

// ---------- места ----------
const rect = (g, x, y, w, h, fill, o = {}) => inkRect(g, x, y, w, h, { fill, r: 4, ...o });
export const K = { rect, circ: (g, x, y, r, fill, o = {}) => inkCircle(g, x, y, r, { fill, ...o }), line: (g, pts, o = {}) => inkLine(g, pts, o), poly: (g, pts, fill, o = {}) => inkShape(g, pts, { fill, ...o }), W: () => E.W, H: () => E.H };
const floorLine = (g, GY) => inkLine(g, [[-E.W, GY], [E.W * 2, GY]], { w: 6, step: 40 });
const win = (g, x, y, w, h, sky = C.glass, panes = 2) => { rect(g, x, y, w, h, sky); for (let i = 1; i < panes; i++) inkLine(g, [[x + (w * i) / panes, y], [x + (w * i) / panes, y + h]], { w: 6 }); inkLine(g, [[x, y + h / 2], [x + w, y + h / 2]], { w: 6 }); };
export { win, rect, floorLine };
const stars = (g, n, seed = 3, a = 1) => { let q = seed * 9301 + 49297; const r = () => (q = (q * 9301 + 49297) % 233280) / 233280; g.save(); g.fillStyle = '#fff'; for (let i = 0; i < n; i++) { g.globalAlpha = a * (0.5 + 0.5 * r()); g.beginPath(); g.arc(r() * E.W * 1.1 - E.W * 0.05, r() * E.H, 1.4 + r() * 2.2, 0, 7); g.fill(); } g.restore(); };
export { stars };
const SETS = {
  void(g) { const GY = E.H * 0.84; D.plain(g, '#fbf8f1'); g.strokeStyle = 'rgba(61,126,166,.10)'; g.lineWidth = 2; for (let x = 0; x <= E.W; x += 60) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke(); } for (let y = 0; y <= E.H; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke(); } return { GY }; },
  voidDark(g) { const GY = E.H * 0.84; D.plain(g, '#243046'); g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 2; for (let x = 0; x <= E.W; x += 60) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke(); } for (let y = 0; y <= E.H; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke(); } return { GY }; },
  space(g) { D.plain(g, '#070b1c'); stars(g, 110, 5); return { GY: E.H * 0.9 }; },
  parking(g) { const GY = E.H * 0.86; D.plain(g, '#78cdfa'); g.fillStyle = C.asphalt; g.fillRect(-E.W, E.H * 0.6, E.W * 3, E.H); return { GY }; },
  street(g) { const GY = E.H * 0.9; D.plain(g, '#78cdfa'); g.fillStyle = C.asphalt; g.fillRect(-E.W, E.H * 0.6, E.W * 3, E.H); return { GY }; },
  aerial(g) { const GY = E.H * 0.9; D.plain(g, '#7da55a'); return { GY }; },
  field(g) { const GY = E.H * 0.88; D.plain(g, '#78cdfa'); g.fillStyle = '#7bc04a'; g.fillRect(-E.W, E.H * 0.55, E.W * 3, E.H); return { GY }; },
  sky(g) { const GY = E.H * 1.0; D.plain(g, '#44b4ff'); return { GY }; },
  edge(g) { const GY = E.H * 1.1; D.plain(g, '#000'); stars(g, 90, 7); return { GY }; },
  orbit(g) { const GY = E.H * 1.1; D.plain(g, '#071536'); stars(g, 60, 9); return { GY }; },
  kitchen(g) { const GY = E.H * 0.84; D.plain(g, '#f3e8d6'); g.fillStyle = '#c9a77c'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); win(g, 120, 150, 380, 330); rect(g, 1420, 300, 360, 540, '#c9d3da'); return { GY }; },
  frontYard(g) { const GY = E.H * 0.88; D.plain(g, '#cfe6f5'); g.fillStyle = '#7da55a'; g.fillRect(-E.W, E.H * 0.55, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  streetNight(g) { const GY = E.H * 0.86; D.plain(g, '#2e3a5c'); g.fillStyle = '#3b4258'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  court(g) { const GY = E.H * 0.84; D.plain(g, '#78cdfa'); rect(g, -80, 0, E.W + 160, GY - 40, '#b4553a'); for (let y = 60; y < GY - 40; y += 70) inkLine(g, [[-80, y], [E.W + 80, y]], { w: 3, stroke: alpha('#000', 0.25) }); for (let r = 0; r * 70 < GY - 40; r++) for (let x = (r % 2 ? 0 : 70); x < E.W + 80; x += 140) inkLine(g, [[x, r * 70], [x, r * 70 + 70]], { w: 3, stroke: alpha('#000', 0.2) }); win(g, 160, 120, 360, 200, C.glass, 4); win(g, 1380, 120, 360, 200, C.glass, 4); g.fillStyle = '#c9a77c'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  roof(g) { const GY = E.H * 0.8; D.plain(g, '#78cdfa'); D.cloud(g, 360, 200, 1.6); D.cloud(g, 1500, 300, 1.3); g.fillStyle = '#8a8a90'; g.fillRect(-E.W, GY, E.W * 3, E.H); inkRect(g, -80, GY - 36, E.W + 160, 42, { fill: '#6e6e76', r: 6 }); return { GY }; },
  cockpit(g) { const GY = E.H * 0.95; D.plain(g, '#2a3040'); inkRect(g, 160, 90, E.W - 320, 560, { fill: '#9fd8ff', r: 40, w: 8 }); inkLine(g, [[E.W / 2, 90], [E.W / 2, 650]], { w: 10 }); D.cloud(g, 560, 320, 1.8); D.cloud(g, 1380, 220, 1.4); inkRect(g, 0, 700, E.W, 380, { fill: '#3a4258', r: 0, w: 6 }); for (let i = 0; i < 9; i++) { inkCircle(g, 220 + i * 190, 800 + (i % 2) * 70, 46, { fill: '#222', w: 4 }); inkLine(g, [[220 + i * 190, 800 + (i % 2) * 70], [220 + i * 190 + 20, 780 + (i % 2) * 70]], { w: 4, stroke: '#ffd23a' }); } return { GY }; },
};
// Фоны от OpenAI (assets/bg/<файл>.png, 1536x1024, в кадре обрезаются до 16:9). BG_IMG=false вернёт кодовые заглушки.
const BG_IMG = true;
export const BG_SETS = { parking: 'parking', street: 'street', aerial: 'aerial', field: 'field', sky: 'sky', edge: 'edge', orbit: 'orbit', kitchen: 'kitchen', frontYard: 'front_yard', streetNight: 'street_night' };
const BGIM = await loadImages(Object.fromEntries(Object.entries(BG_SETS).map(([n, f]) => [n, project(`assets/bg/${f}.png`)])));
const PNAMES = ['vehicles/bus', 'vehicles/jet', 'vehicles/minivan', 'vehicles/pickup', 'vehicles/sedan', 'vehicles/suv', 'vehicles/taxi', 'vehicles/van', 'school/basketball', 'school/cupcake_choc', 'school/cupcake_pink', 'school/desserts', 'school/hoop', 'school/mailbox', 'school/mailbox_flat', 'school/seagull', 'items/balloons', 'items/cake', 'items/feather', 'items/geese', 'items/megaphone', 'items/peak', 'items/sneaker', 'items/soccer_balls'];
export const PIM = await loadImages(Object.fromEntries(PNAMES.map((n) => [n.split('/')[1], project(`assets/props/${n}.png`)])));
// картинка-предмет: prop(g,'bus',x,y,h,{rot,flip,a,k}) — h = высота в пикселях кадра, x,y = центр; o.base = true: y = низ предмета
export function prop(g, name, x, y, h, o = {}) { const im = PIM[name]; if (!im) return; const sc = h / im.height, k = o.k ?? 1; g.save(); g.translate(x, y); if (o.rot) g.rotate(o.rot); g.scale((o.flip ?? 1) * sc * k, sc * k); if (o.a != null) g.globalAlpha *= o.a; if (o.base) g.translate(0, -im.height / 2); if (o.shadow) { g.fillStyle = 'rgba(0,0,0,.15)'; g.beginPath(); g.ellipse(0, im.height * 0.5, im.width * 0.4, im.height * 0.05, 0, 0, 7); g.fill(); } g.drawImage(im, -im.width / 2, -im.height / 2); g.restore(); }
export const propSize = (name) => { const im = PIM[name]; return im ? [im.width, im.height] : [1, 1]; };
// картинка фона: bgImg(g,'parking',{x,y,k}) — вся картинка (1536x1024 растянута на кадр) + свой кроп
export function bgImg(g, n, o = {}) { const im = BGIM[n]; const k = o.k ?? 1, cx = o.x ?? 0.5, cy = o.y ?? 0.5; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(k, k); g.translate(-cx * E.W, -cy * E.H); g.drawImage(im, 0, 80, im.width, im.height - 160, -E.W * 0.05, -E.H * 0.03, E.W * 1.1, E.H * 1.06); g.restore(); }
if (BG_IMG) for (const n of Object.keys(BG_SETS)) { const orig = SETS[n]; SETS[n] = (g, o) => { const r = orig(g, o), im = BGIM[n]; if (!(o && o.noimg)) g.drawImage(im, 0, 80, im.width, im.height - 160, -E.W * 0.05, -E.H * 0.03, E.W * 1.1, E.H * 1.06); return r; }; }
export const set = (name, g, o) => (SETS[name] || SETS.void)(g, o);

// ---------- толпа ребят: n фигурок, ряды по глубине ----------
const rnd = (seed) => { let a = seed * 9301 + 49297; return () => { a = (a * 9301 + 49297) % 233280; return a / 233280; }; };
const HAIRS = [['short', '#2b2420'], ['messy', '#8a5a2e'], ['curly', '#2b2420'], ['long', '#c8923a'], ['ponytail', '#6b3a1e'], ['bun', '#2b2420'], ['short', '#c8923a'], ['curly', '#6b3a1e'], ['messy', '#2b2420'], ['long', '#6b3a1e']];
const KCOL = ['#3fb950', '#3a6ea5', '#f29ac0', '#8a6ab0', '#f2a03a', '#c0504d', '#17a2b8', '#e4872b', '#5a7fb0', '#9aa84a'];
export const kidsPos = (n, seed, x0 = 0.05, x1 = 0.95, y0 = 0.78, y1 = 0.9) => { const r = rnd(seed); return Array.from({ length: n }, () => ({ x: lerp(x0, x1, r()), y: lerp(y0, y1, r()), id: KIDS[Math.floor(r() * KIDS.length)], f: r() < 0.5 ? -1 : 1, h: HAIRS[Math.floor(r() * HAIRS.length)], c: KCOL[Math.floor(r() * KCOL.length)] })); };
function drawKids(g, t, spec, GY, layerName) {
  const k = spec.kids; const list = k.list || kidsPos(k.n ?? 12, k.seed ?? 3, k.x0, k.x1, k.y0, k.y1);
  [...list].map((p, i) => ({ ...p, i })).filter((p) => (layerName === 'front') === (p.y * E.H > GY + 4)).sort((a, b) => a.y - b.y).forEach((p) => { const i = p.i;
    const y = p.y * E.H, depth = 0.7 + 0.5 * (y / E.H), s = (k.s ?? 1.1) * depth * 1.35;
    const a = k.in ? ease.out(prog(t, k.in + i * (k.stagger ?? 0.03), k.in + i * (k.stagger ?? 0.03) + 0.4)) : 1; if (a <= 0) return;
    const look = k.up ? kf(k.up, t, 0) : 0;
    const o = { x: p.x * E.W + (k.drift ? Math.sin(t * k.drift + i) * 20 : 0) + (k.march ? (t * k.march * (p.f)) : 0), y, s, facing: p.f, outfit: { ...OUT[p.id], ...(p.id === 'TODD' ? {} : { hair: p.h[0], hairColor: p.h[1], color: p.c }) }, expr: tl(k.expr || 'neutral', t), blink: blinkAt(t, i * 3), pose: breathe(POSES[tl(k.pose || 'stand', t)], t, 1, i + 1), alpha: a };
    if (k.lookUp !== undefined && k.lookUp !== false && t >= (k.lookUp === true ? 0 : k.lookUp)) o.look = [0.3, -2.2];
    drawCharacter(g, o);
  });
}

// ---------- надписи ----------
function wrap(s, n) { const words = s.split(' '), out = []; let cur = ''; for (const w of words) { if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); } if (cur) out.push(cur); return out; }
// автопроверка наложения: надпись не должна закрывать голову героя. Возвращает долю X (0..1) с запасом от голов в верхней части кадра
const bigHeads = (heads) => (heads || []).filter((h) => h && !h.hidden && h.id === 'LEON' && h.y - 60 * (h.s || 1.5) < E.H * 0.42);
const freeX = (heads, def, span = 0.3, cands = [0.22, 0.5, 0.78]) => { const hs = bigHeads(heads); if (!hs.length || hs.every((h) => Math.abs(h.x / E.W - def) > span)) return def; let best = def, bd = -1; for (const c of cands) { const d = Math.min(...hs.map((h) => Math.abs(h.x / E.W - c))); if (d > bd) { bd = d; best = c; } } return best; };
const hasHud = (info, spec) => (!!HUD[info.shot.id] || !!HUD_TIME_ONLY[info.shot.id]) && !spec.nohudx;
function overlay(g, t, info, spec, heads, only) {
  const T0 = info.shot.start, T1 = info.shot.end, rows = (spec.nocap ? [] : TEXTS).filter((r) => ['cap', 'plate', 'say'].includes(r.k) && (only === 'say' ? r.k === 'say' : only === 'rest' ? r.k !== 'say' : true) && r.t >= T0 - 0.02 && r.t < T1 - 0.05 && !(spec.skip || []).includes(r.s));
  let capIdx = 0, sayIdx = 0; const ty0 = spec.ty ?? (rows.some((r) => r.k === 'plate') ? 0.42 : 0.13); const sayRows = rows.filter((r) => r.k === 'say'); const hud = hasHud(info, spec);
  for (const r of rows) {
    const lt = r.t - T0; if (t < lt) { if (r.k === 'cap') capIdx++; if (r.k === 'say') sayIdx++; continue; }
    if (r.k === 'plate') { const k = ease.outBack(prog(t, lt, lt + 0.35)); g.save(); const w0 = measure(g, r.s, 150) + 160; let px = E.W * (spec.plateX ?? freeX(heads, hud ? 0.45 : 0.5, 0.26, [0.2, 0.5, 0.8])), ps = 1; if (spec.plateX == null) for (const h of bigHeads(heads)) { const hr = 62 * (h.s || 1.5), py = E.H * (spec.plateY ?? (hud ? 0.25 : 0.22)); if (h.y - hr * 1.7 < py + 90 && Math.abs(px - h.x) < w0 / 2 + hr) { const Lsp = h.x - hr - 30, Rsp = E.W - 20 - (h.x + hr); if (Rsp >= Lsp) { ps = Math.min(1, Rsp / w0); px = h.x + hr + 10 + (w0 * ps) / 2; } else { ps = Math.min(1, Lsp / w0); px = h.x - hr - 10 - (w0 * ps) / 2; } } } g.translate(px, E.H * (spec.plateY ?? (hud ? 0.25 : 0.22))); g.rotate(-0.03); g.scale(k * ps, k * ps); const w = w0; inkRect(g, -w / 2, -110, w, 190, { fill: ui().gold, r: 30 }); text(g, r.s, 0, 10, { size: 150, font: FONTS.title, weight: 400, color: S().ink }); g.restore(); }
    else if (r.k === 'cap') { const at = spec.capAt && spec.capAt[r.s]; const y = E.H * (at ? at[1] : spec.tyList ? spec.tyList[capIdx] ?? ty0 : ty0 + capIdx * 0.1); const bx = spec.tx ?? (hud ? 0.4 : 0.5); const x = at ? at[0] : (spec.tx != null ? bx : freeX(heads, bx, 0.25)); const side = !at && spec.tx == null && x !== bx; const bigsz = at && at[2] ? at[2] : 84; const maxW = E.W * (side ? 0.38 : hud ? 0.72 : 0.9); const sz = Math.min(bigsz, maxW / Math.max(1, measure(g, r.s, 84) / 84) * (bigsz / 84)); let xx = E.W * x, szz = sz; if (hud && y < 215) { const w1 = () => measure(g, r.s, 84) / 84 * szz, lim = E.W - 400; if (w1() > lim - 40) szz *= (lim - 40) / w1(); const rt = xx + w1() / 2; if (rt > lim) xx -= rt - lim; xx = Math.max(xx, w1() / 2 + 20); } D.marker(g, r.s, xx, y, { size: szz, t, start: lt, outline: 14, color: r.s === r.s.toUpperCase() && /\d/.test(r.s) && capIdx % 2 ? ui().accent : S().ink }); capIdx++; }
    else { const nx = sayRows.find((q) => q.t > r.t + 0.05), endT = nx ? nx.t - T0 : lt + 4; if (t > endT) { sayIdx++; continue; } const idx = (spec.say ?? [0])[sayIdx % (spec.say ?? [0]).length] ?? 0; const h = heads[idx]; sayIdx++; if (!h) continue; const lines = wrap(r.s, 26), w = Math.min(980, Math.max(...lines.map((l) => measure(g, l, 44))) + 90), hgt = 70 + lines.length * 56, side = h.id && h.id !== 'LEON', dir = h.x < E.W * 0.6 ? 1 : -1, bx = clamp(h.x + (side ? 230 * dir : 0), w / 2 + 40, E.W - w / 2 - 40), by = clamp(h.y - 130 - hgt / 2 - (side ? 190 : 0), hgt / 2 + 30, E.H - 300); D.bubble(g, bx, by, w, hgt, { tail: [side ? clamp(h.x + 150 * dir, bx - w / 2 + 40, bx + w / 2 - 40) : h.x, h.y - (side ? 50 : 70)], t, start: lt }, (g2) => lines.forEach((l, i) => text(g2, l, 0, (i - (lines.length - 1) / 2) * 56 + 4, { size: 44, font: FONTS.ui, weight: 900, color: S().ink }))); }
  }
}

// ---------- камера ----------
function camOf(spec, t, dur, info) {
  const m = spec.cam || 'push', u = ease.inOut(clamp(t / dur));
  const base = { push: { z: lerp(1, 1.11, u), x: lerp(0, -30, u) }, pull: { z: lerp(1.13, 1, u), x: lerp(-30, 10, u) }, left: { z: 1.06, x: lerp(80, -80, u) }, right: { z: 1.06, x: lerp(-80, 80, u) }, still: { z: 1, x: 0 }, up: { z: 1.02, y: lerp(120, -60, u) }, down: { z: 1.02, y: lerp(-80, 100, u) }, zoom: { z: lerp(1, 1.4, u), x: lerp(0, -100, u) }, zoomOut: { z: lerp(1.5, 1, u) }, tiltUp: { z: 1.05, y: lerp(300, -300, u) }, tiltDown: { z: 1.05, y: lerp(-300, 300, u) } }[m] || { z: 1, x: 0 };
  if (spec.camK) { const z = kf(spec.camK.z, t, 1), x = kf(spec.camK.x, t, 0), y = kf(spec.camK.y, t, 0); base.z = z; base.x = x; base.y = y; }
  let punch = 0, sh = 0;
  if (info) for (const r of TEXTS) { if (!['cap', 'plate', 'say'].includes(r.k) || r.t < info.shot.start - 0.02 || r.t >= info.shot.end - 0.05) continue; const d = t - (r.t - info.shot.start); if (d >= 0 && d < 1.2) { punch += (r.k === 'plate' ? 0.05 : 0.028) * Math.exp(-d * 6); sh += Math.sin(d * 70) * Math.exp(-d * 9) * (r.k === 'plate' ? 10 : 4); } }
  const b2 = { ...base, z: (base.z || 1) + punch, x: (base.x || 0) + sh };
  return camAdd(b2, drift(t, 5, 5));
}

// ---------- автопроверка кадра: Leon целиком в кадре (голова и ступни), печатает ERROR frame-check в консоль рендера ----------
const CHECKED = new Set();
function frameCheck(id, o, walking) { const top = o.hy - 100 * o.s, bad = []; if (top < -4) bad.push(`кепка или голова за верхом кадра (${Math.round(top)}px)`); if (o.y > E.H + 6) bad.push(`ступни ниже кадра (${Math.round(o.y - E.H)}px)`); if (o.x < 40 || o.x > E.W - 40) { if (!walking) bad.push('Leon у края кадра по горизонтали'); } for (const b of bad) { const key = id + b; if (!CHECKED.has(key)) { CHECKED.add(key); console.log(`ERROR frame-check ${id}: ${b}`); } } }

// ---------- регистрация кадра ----------
export function def(id, spec) {
  registerShot(id, { draw(g, t, info) {
    const cam = camOf(spec, t, info.dur, info), wins = talkWins(spec, info);
    let ctx = { GY: E.H * 0.84, dur: info.dur };
    layer(g, cam, 0.9, (g) => { ctx = { ...ctx, ...set(spec.set || 'void', g, spec.so) }; if (spec.bg) spec.bg(g, t, info, ctx); });
    const heads = [];
    layer(g, cam, 1, (g) => {
      ctx.cam = cam;
      if (spec.pre) spec.pre(g, t, info, ctx);
      if (spec.kids) drawKids(g, t, spec, ctx.GY, 'back');
      (spec.chars || []).forEach((c, i) => { const o = who(g, c, t, info, ctx.GY, wins[i]); heads.push({ x: o.x, y: o.hy ?? o.y - 360, id: c.w, s: o.s, hidden: o.hidden }); if (!spec.nocheck && c.w === 'LEON' && !o.hidden && !c.nocheck) frameCheck(info.shot.id, o, !!c.walk); });
      if (spec.kids) drawKids(g, t, spec, ctx.GY, 'front');
      if (spec.close) { closeUp(g, spec.close, t, spec.chars && spec.chars.length ? undefined : wins[0]); const c = spec.close; if (!(spec.chars && spec.chars.length)) heads.push({ x: (c.x ?? 0.5) * E.W - (c.r ?? 330) * 0.1, y: (c.y ?? 0.62) * E.H - (c.r ?? 330) * 0.62 + 40, id: c.w || 'LEON', s: 1.5 }); }
      if (spec.closes) spec.closes.forEach((c, i) => { closeUp(g, c, t, wins[i]); heads.push({ x: (c.x ?? 0.5) * E.W, y: (c.y ?? 0.62) * E.H - (c.r ?? 330) * 0.62 + 40, id: c.w || 'LEON', s: 1.5, hidden: !!(c.show && (t < c.show[0] || t > c.show[1])) }); });
      if (spec.mid) spec.mid(g, t, info, { ...ctx, heads });
      overlay(g, t, info, spec, heads.length ? heads : [{ x: E.W / 2, y: E.H * 0.55 }], 'say');
      if (spec.fx) spec.fx(g, t, info, { ...ctx, heads });
    });
    if (spec.top) spec.top(g, t, info, ctx);
    overlay(g, t, info, spec, heads.length ? heads : spec.close ? (() => { const c = spec.close, r = c.r ?? 330, cx = (c.x ?? 0.5) * E.W, cy = (c.y ?? 0.62) * E.H; return [{ x: cx - r * 0.55, y: cy - r * 1.62 + 110 }]; })() : [{ x: E.W / 2, y: E.H * 0.55 }], 'rest');
    if (!spec.nohud) drawHud(g, t, info);
  } });
}
