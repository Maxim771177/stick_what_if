// lib.js (ролик 09 «What If You Could See 10 Seconds Into the Future?», копия каркаса роликов 06–08) (пак doodle:clean, как ролики 01 и 02).
// Кадр = def('s001', {...}). Поля: set, cam, chars[], kids{}, fx(g,t,info,c) (поверх людей), pre(g,t,info,c) (до людей), close{...}, ty.
// Тексты на экране: story/texts.json (из text_elements.md; k = cap | plate | say | hud | hudtick | lbl). HUD (время и рост) рисует lib по полю hud раскадровки.
import { E, V, S, registerShot, mood, layer, blurLayer, ease, prog, lerp, clamp, FONTS, text, measure, shade, alpha } from '/engine/core.js';
import { drawCharacter, characterCloseUp, characterHead, POSES, posesAt, breathe, walkPose } from '/engine/characters.js';
import { camPath, drift, camAdd } from '/engine/motion.js';
import * as D from '/engine/doodle.js';
import { inkShape, inkCircle, inkRect, inkLine, inkTube, inkEllipse, inkBlob } from '/engine/ink.js';
import { loadImages, img, loadJSON, project } from '/engine/assets.js';
import { EXPR } from '/engine/rig2d.js';
// стеклянный взгляд (Leon «зависает» на 3 секунды): кольца вместо зрачков, рот «о»; глаза видны
EXPR.glassy = { eyes: 'ring', brows: null, mouth: 'o', look: [0, 0] };

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
  DUNN: { top: 'jersey', color: '#d8232a', hat: 'capBack', hatColor: '#d8232a', hair: 'none', hairColor: '#2b2420', legs: '#2b2b33', emblem: 'D' },
  DOCTOR: { top: 'suit', color: '#f4f6f8', face: 'glasses', hair: 'short', hairColor: '#4a3a2a', legs: '#5a6b7a' },
  ATTEND: { top: 'tshirt', color: '#f2c21a', hat: 'capBack', hatColor: '#d8232a', hair: 'none', hairColor: '#2b2420', legs: '#3a4a6b' },
  NORA: { top: 'tshirt', color: '#f2c21a', hair: 'short', hairColor: '#8a5a2e', kid: true, legs: '#7a5a9b' },
  MOM: { top: 'dress', color: '#f29ac0', hair: 'ponytail', hairColor: '#6b3a1e' },
  DRIVER: { top: 'suit', color: '#2f5d8a', hat: 'capBack', hatColor: '#2f5d8a', hair: 'none', hairColor: '#2b2420', legs: '#3a3a48' },
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
  ZOE: { top: 'sweater', color: '#f2c21a', hair: 'long', hairColor: '#2b2420', kid: true, legs: '#3a4a6b' },
  ROCCO: { top: 'hoodie', color: '#8a5a2e', hair: 'short', hairColor: '#2b2420', kid: true, legs: '#3a3a48' },
  CHASE: { top: 'jersey', color: '#2f5db0', hair: 'short', hairColor: '#4a2f1e', kid: true, legs: '#2b3a6b', emblem: '7' },
  OWEN: { top: 'hoodie', color: '#3fb950', hair: 'messy', hairColor: '#c8723a', face: 'glasses', kid: true, legs: '#3a4a6b' },
  PARK: { top: 'suit', color: '#6b4e9b', hair: 'bun', hairColor: '#2b2420', face: 'glasses', legs: '#4a3a6b' },
  LEO: { top: 'hoodie', color: '#f2c21a', hair: 'messy', hairColor: '#2b2420', kid: true, legs: '#3a4a6b' },
  DAD: { top: 'tshirt', color: '#5a7fb0', hair: 'short', hairColor: '#3a2a1e', legs: '#4a5a78' },
  COOL1: { top: 'hoodie', color: '#c0504d', hair: 'short', hairColor: '#2b2420', kid: true, legs: '#3a3a48' },
  COOL2: { top: 'tshirt', color: '#17a2b8', hair: 'curly', hairColor: '#6b3a1e', kid: true, legs: '#3a4a6b' },
  COOL3: { top: 'hoodie', color: '#e4872b', hair: 'ponytail', hairColor: '#2b2420', kid: true, legs: '#3a3a48' },
  COOL4: { top: 'tshirt', color: '#8a6ab0', hair: 'long', hairColor: '#c8923a', kid: true, legs: '#3a4a6b' },
  WALT: { top: 'coat', color: '#6b6f4a', hair: 'messy', hairColor: '#b9b9b9', beard: true, legs: '#4a4a52', shoes: '#5a4a3a' },
  GIRL: { top: 'hoodie', color: '#f2c21a', hair: 'long', hairColor: '#2b2420', kid: true, legs: '#3a4a6b' },
  OLDMAN: { top: 'sweater', color: '#8a5a3a', hat: 'beanie', hatColor: '#7a7a7a', hair: 'short', hairColor: '#dcdcdc', beard: true, legs: '#5a6b7a' },
  MAILMAN: { top: 'uniform', color: '#2f5d8a', hat: 'capBack', hatColor: '#2f5d8a', hair: 'short', hairColor: '#4a2f1e', legs: '#2f4a6b' },
  SKATER: { top: 'hoodie', color: '#e5383b', hair: 'ponytail', hairColor: '#6b3a1e', kid: true, legs: '#2b2b33' },
  P1: { top: 'suit', color: '#3a4a6b', hair: 'short', hairColor: '#2b2420', legs: '#2b3a55' },
  P2: { top: 'dress', color: '#c0504d', hair: 'bun', hairColor: '#6b3a1e' },
  P3: { top: 'coat', color: '#7a5a8a', hair: 'curly', hairColor: '#2b2420', legs: '#3a3a48' },
  P4: { top: 'tshirt', color: '#17a2b8', hair: 'short', hairColor: '#8a5a2e', legs: '#4a5a78' },
  PRINCIPAL: { top: 'suit', color: '#2f3b52', face: 'glasses', hair: 'none', hairColor: '#b9b9b9', legs: '#242b3a' },
  HALE: { top: 'suit', color: '#8b6b43', face: 'glasses', hair: 'short', hairColor: '#b8b8b8', legs: '#4a3f33' },
  BURKE: { top: 'tshirt', color: '#2f7d4f', hat: 'capBack', hatColor: '#2f7d4f', hair: 'none', hairColor: '#2b2420', legs: '#2b2b33' },
  PIKE: { top: 'suit', color: '#5a6470', hat: 'capBack', hatColor: '#3a4450', hair: 'short', hairColor: '#2b2420', legs: '#3a4450' },
  MAYOR: { top: 'suit', color: '#7a2e3a', hair: 'curly', hairColor: '#5a3a22', legs: '#3a2a2e' },
  ENG: { top: 'jersey', color: '#f28a1e', hat: 'capBack', hatColor: '#f2c21a', hair: 'short', hairColor: '#3a2a1e', legs: '#4a5a78' },
  ENG2: { top: 'jersey', color: '#f2c21a', hat: 'capBack', hatColor: '#f28a1e', hair: 'bun', hairColor: '#2b2420', legs: '#3a4a6b' },
  KID: { top: 'hoodie', color: '#3fb950', hair: 'short', kid: true },
  KID2: { top: 'tshirt', color: '#3a6ea5', hair: 'curly', hairColor: '#2b2420', kid: true },
  KID3: { top: 'tshirt', color: '#f29ac0', hair: 'ponytail', hairColor: '#6b3a1e', kid: true },
  KID4: { top: 'hoodie', color: '#c9c3b4', hair: 'messy', hairColor: '#8a5a2e', kid: true },
  KID5: { top: 'tshirt', color: '#8a6ab0', hair: 'short', hairColor: '#2b2420', kid: true },
  KID6: { top: 'tshirt', color: '#f2a03a', hair: 'long', hairColor: '#2b2420', kid: true },
  REF: { top: 'tshirt', color: '#222831', hat: 'capBack', hatColor: '#222831', hair: 'none', hairColor: '#2b2420', legs: '#222831' },
  KEEP: { top: 'jersey', color: '#f2c200', hair: 'short', hairColor: '#6b3a1e', kid: true, legs: '#222831' },
  KICK: { top: 'jersey', color: '#3a6ea5', hair: 'short', hairColor: '#2b2420', kid: true, legs: '#f4f6f8' },
  BKICK: { top: 'jersey', color: '#c0504d', hair: 'messy', hairColor: '#2b2420', kid: true, legs: '#f4f6f8' },
  FAN1: { top: 'tshirt', color: '#17a2b8', hat: 'capBack', hatColor: '#e4872b', hair: 'none', hairColor: '#2b2420', legs: '#4a5a78' },
  FAN2: { top: 'dress', color: '#8a6ab0', hair: 'ponytail', hairColor: '#8a5a2e' },
  SCOOT: { top: 'hoodie', color: '#7d848c', hat: 'beanie', hatColor: '#7d848c', hair: 'none', hairColor: '#2b2420', kid: true, legs: '#2b2b33' },
  NURSE: { top: 'dress', color: '#f4f6f8', hair: 'bun', hairColor: '#6b3a1e', headband: true },
};
Object.values(OUT).forEach((o) => { o.whiteHands = true; });
for (const k of ['KID', 'KID2', 'KID3', 'KID4', 'KID5', 'KID6']) OUT[k].legs = OUT[k].legs || '#3a4a6b';
const KIDS = ['KID', 'KID2', 'KID3', 'KID4', 'KID5', 'KID6', 'TODD'];
const FIXED = (id) => ['TODD'].includes(id);
const SM = { KEEP: 1.55, REF: 1.2, BKICK: 1.55, KICK: 1.1, FAN1: 1.18, FAN2: 1.14, NURSE: 1.2, SCOOT: 1.1, PRINCIPAL: 1.22, HALE: 1.2, BURKE: 1.22, PIKE: 1.2, MAYOR: 1.16, ENG: 1.2, ENG2: 1.14, WALT: 1.2, GIRL: 1.12, OLDMAN: 1.12, MAILMAN: 1.2, SKATER: 1.1, P1: 1.2, P2: 1.14, P3: 1.18, P4: 1.2, DUNN: 1.22, DOCTOR: 1.22, ATTEND: 1.2, DRIVER: 1.2, PARK: 1.2, DAD: 1.22, MOM: 1.14, LEON: 0.86, ZOE: 1.15, ROCCO: 1.42, CHASE: 1.2, OWEN: 1.12, LEO: 1.15, COOL1: 1.18, COOL2: 1.15, COOL3: 1.18, COOL4: 1.15, NORA: 0.78, BULLY: 1.5, TODD: 1.1, BABY: 0.8, KID: 1.15, KID2: 1.15, KID3: 1.15, KID4: 1.15, KID5: 1.15, KID6: 1.15 };

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
  for (const r of TEXTS) { if (r.k !== 'say' || r.t < T0 - 0.02 || r.t >= T1 - 0.05) continue; let idx = (spec.say ?? [0])[k % (spec.say ?? [0]).length] ?? 0; if (r.who) { const j = (spec.chars || []).findIndex((q) => (q.tag || q.w) === r.who); if (j >= 0) idx = j; } k++; const a = r.t - T0, b = Math.min(info.dur, a + Math.max(1.0, wordsOf(r.s) * 0.34 + 0.3)); (out[idx] ||= []).push([a, b]); }
  return out;
}
const inWin = (w, t) => (w || []).some(([a, b]) => t >= a && t <= b);

// ---------- один персонаж ----------
export function who(g, c, t, info, GY, wins) {
  const id = c.w || 'KID', f = c.f ?? 1, x = (c.x ?? 0.5) * E.W, y = GY + (c.dy ?? 0) + kf(c.dyK, t, 0);
  let cx = x; let walking = false;
  if (c.walk) { const [x0, x1, t0, t1] = c.walk; const u = clamp((t - t0) / (t1 - t0)); cx = lerp(x0, x1, c.lin ? u : ease.inOut(u)) * E.W; walking = c.lin ? (t >= t0 && t <= t1) : (u > 0 && u < 1); }
  if (c.xK) cx = kf(c.xK, t, 0.5) * E.W;
  const pn = tl(c.pose || 'stand', t), expr = tl(c.expr || 'neutral', t);
  const s = kf(c.s, t, 1.55) * (SM[id] ?? 1);
  const talking = (c.talk && t >= c.talk[0] && t <= c.talk[1]) || inWin(wins, t);
  const ent = c.noin ? 1 : ease.outBack(prog(t, c.in ?? 0, (c.in ?? 0) + 0.5)), pop = 0.86 + 0.14 * ent;
  const o = { x: cx, y: y, s, facing: f, outfit: { ...OUT[id], ...(c.of || {}) }, expr, blink: blinkAt(t, (c.x || 0) * 9 + id.length), talk: talking ? 0.5 + 0.5 * Math.sin(t * 22) : 0, look: (Array.isArray(c.look) && Array.isArray(c.look[0]) && typeof c.look[0][0] === 'number' && Array.isArray(c.look[0][1])) ? tl(c.look, t) : c.look, prop: tl(c.prop, t), alpha: c.a == null ? undefined : tl(c.a, t), rot: c.rot };
  if (c.fall) o.rot = c.fall * ease.in(clamp(t / 0.5));
  if (c.rotK) o.rot = kf(c.rotK, t);
  if (c.hide && (t < c.hide[0] || t > c.hide[1])) return { x: cx, y, s, hy: y - 300 * s * 0.5, hidden: true };
  let pose;
  if (walking) {
    const hold = pn === 'holdTray' || pn === 'holdBall';
    pose = walkPose(t * 2 * Math.PI * 1.3, hold ? { bob: 0, arm: 0 } : {});
    if (hold) { const P0 = POSES[pn], hy = pose.hip[1] + 100, d = (a) => [a[0] + pose.sh[0] - 1, a[1] + hy]; pose = { ...pose, eF: d(P0.eF), hF: d(P0.hF), eB: d(P0.eB), hB: d(P0.hB) }; }
  }
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

// ---------- счётчик DAY (слева сверху, правило владельца 14.11.2026) ----------
const DAYS = TEXTS.filter((r) => r.k === 'day').map((r) => ({ t: r.t, n: +/\d+/.exec(r.s)[0] }));
export function drawHud(g, t, info) {
    const T = info.shot.start + t; let cur = null; for (const d of DAYS) if (T >= d.t - 0.001) cur = d; if (!cur) return;
  const k = ease.outBack(prog(T, cur.t, cur.t + 0.45)); if (k <= 0.01) return;
  const flash = T - cur.t < 0.9 ? 1 + 0.1 * Math.sin(prog(T, cur.t, cur.t + 0.9) * Math.PI * 3) : 1;
  g.save(); g.translate(28, 26); g.scale(k * flash, k * flash);
  inkRect(g, 0, 0, 230, 96, { fill: '#1b2230', r: 26, w: 5 });
  text(g, 'DAY', 22, 52, { size: 40, color: '#fff', font: FONTS.title, weight: 400, align: 'left' });
  text(g, String(cur.n), 180, 54, { size: 74, color: '#ffd23a', font: FONTS.title, weight: 400, stroke: 6, strokeColor: '#1b2230' });
  g.restore();
}
export const dayAt = (T) => { let c = null; for (const d of DAYS) if (T >= d.t - 0.001) c = d.n; return c; };

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
  street(g) { const GY = E.H * 0.92; D.plain(g, '#78cdfa'); g.fillStyle = C.asphalt; g.fillRect(-E.W, E.H * 0.6, E.W * 3, E.H); return { GY }; },
  aerial(g) { const GY = E.H * 0.9; D.plain(g, '#7da55a'); return { GY }; },
  field(g) { const GY = E.H * 0.78; D.plain(g, '#78cdfa'); g.fillStyle = '#7bc04a'; g.fillRect(-E.W, E.H * 0.55, E.W * 3, E.H); return { GY }; },
  sky(g) { const GY = E.H * 1.0; D.plain(g, '#44b4ff'); return { GY }; },
  edge(g) { const GY = E.H * 1.1; D.plain(g, '#000'); stars(g, 90, 7); return { GY }; },
  orbit(g) { const GY = E.H * 1.1; D.plain(g, '#071536'); stars(g, 60, 9); return { GY }; },
  kitchen(g) { const GY = E.H * 0.84; D.plain(g, '#f3e8d6'); g.fillStyle = '#c9a77c'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); win(g, 120, 150, 380, 330); rect(g, 1420, 300, 360, 540, '#c9d3da'); return { GY }; },
  hall(g) { const GY = E.H * 0.8; D.plain(g, '#f0e2c6'); return { GY }; },
  gym(g) { const GY = E.H * 0.82; D.plain(g, '#e8d9c0'); return { GY }; },
  classroom(g) { const GY = E.H * 0.84; D.plain(g, '#f3e8d6'); return { GY }; },
  cafeteria(g) { const GY = E.H * 0.8; D.plain(g, '#efe0bd'); return { GY }; },
  livingRoom(g) { const GY = E.H * 0.84; D.plain(g, '#efe0c8'); return { GY }; },
  frontYard(g) { const GY = E.H * 0.88; D.plain(g, '#cfe6f5'); g.fillStyle = '#7da55a'; g.fillRect(-E.W, E.H * 0.55, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  streetNight(g) { const GY = E.H * 0.86; D.plain(g, '#2e3a5c'); g.fillStyle = '#3b4258'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  court(g) { const GY = E.H * 0.84; D.plain(g, '#78cdfa'); rect(g, -80, 0, E.W + 160, GY - 40, '#b4553a'); for (let y = 60; y < GY - 40; y += 70) inkLine(g, [[-80, y], [E.W + 80, y]], { w: 3, stroke: alpha('#000', 0.25) }); for (let r = 0; r * 70 < GY - 40; r++) for (let x = (r % 2 ? 0 : 70); x < E.W + 80; x += 140) inkLine(g, [[x, r * 70], [x, r * 70 + 70]], { w: 3, stroke: alpha('#000', 0.2) }); win(g, 160, 120, 360, 200, C.glass, 4); win(g, 1380, 120, 360, 200, C.glass, 4); g.fillStyle = '#c9a77c'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  roof(g) { const GY = E.H * 0.8; D.plain(g, '#78cdfa'); D.cloud(g, 360, 200, 1.6); D.cloud(g, 1500, 300, 1.3); g.fillStyle = '#8a8a90'; g.fillRect(-E.W, GY, E.W * 3, E.H); inkRect(g, -80, GY - 36, E.W + 160, 42, { fill: '#6e6e76', r: 6 }); return { GY }; },
  bus(g) { const GY = E.H * 0.86; D.plain(g, '#cfe0ee'); return { GY }; },
  principal(g) { const GY = E.H * 0.86; D.plain(g, '#dfeee8'); return { GY }; },
  towerNight(g) { const GY = E.H * 0.9; D.plain(g, '#16224a'); return { GY }; },
  clockInside(g) { const GY = E.H * 0.86; D.plain(g, '#6a5236'); return { GY }; },
  towerRoom(g) { const GY = E.H * 0.88; D.plain(g, '#8a8f98'); return { GY }; },
  cockpit(g) { const GY = E.H * 0.95; D.plain(g, '#2a3040'); inkRect(g, 160, 90, E.W - 320, 560, { fill: '#9fd8ff', r: 40, w: 8 }); inkLine(g, [[E.W / 2, 90], [E.W / 2, 650]], { w: 10 }); D.cloud(g, 560, 320, 1.8); D.cloud(g, 1380, 220, 1.4); inkRect(g, 0, 700, E.W, 380, { fill: '#3a4258', r: 0, w: 6 }); for (let i = 0; i < 9; i++) { inkCircle(g, 220 + i * 190, 800 + (i % 2) * 70, 46, { fill: '#222', w: 4 }); inkLine(g, [[220 + i * 190, 800 + (i % 2) * 70], [220 + i * 190 + 20, 780 + (i % 2) * 70]], { w: 4, stroke: '#ffd23a' }); } return { GY }; },
};
// Фоны от OpenAI (assets/bg/<файл>.png, 1536x1024, в кадре обрезаются до 16:9). BG_IMG=false вернёт кодовые заглушки.
const BG_IMG = true;
export const BG_SETS = { sportStore: 'sportStore', stage: 'stage2', gym: 'gym', classroom: 'classroom', kitchen: 'kitchen', livingRoom: 'livingRoom', cafeteria: 'cafeteria', street: 'street', hall: 'hall', streetNight: 'street_night', bus: 'bus', principal: 'principal', towerNight: 'towerNight', clockInside: 'clockInside', towerRoom: 'towerRoom' };
const BGIM = await loadImages(Object.fromEntries(Object.entries(BG_SETS).map(([n, f]) => [n, project(`assets/bg/${f}.png`)])));
const PNAMES = ['school/tray', 'school/dodgeball'];
export const PIM = await loadImages(Object.fromEntries(PNAMES.map((n) => [n.split('/')[1], project(`assets/props/${n}.png`)])));
// картинка-предмет: prop(g,'bus',x,y,h,{rot,flip,a,k}) — h = высота в пикселях кадра, x,y = центр; o.base = true: y = низ предмета
export function prop(g, name, x, y, h, o = {}) { const im = PIM[name]; if (!im) return; const sc = h / im.height, k = o.k ?? 1; g.save(); g.translate(x, y); if (o.rot) g.rotate(o.rot); g.scale((o.flip ?? 1) * sc * k, sc * k); if (o.a != null) g.globalAlpha *= o.a; if (o.base) g.translate(0, -im.height / 2); if (o.shadow) { g.fillStyle = 'rgba(0,0,0,.15)'; g.beginPath(); g.ellipse(0, im.height * 0.5, im.width * 0.4, im.height * 0.05, 0, 0, 7); g.fill(); } g.drawImage(im, -im.width / 2, -im.height / 2); g.restore(); }
export const propSize = (name) => { const im = PIM[name]; return im ? [im.width, im.height] : [1, 1]; };
// картинка фона: bgImg(g,'parking',{x,y,k}) — вся картинка (1536x1024 растянута на кадр) + свой кроп
export function bgImg(g, n, o = {}) { const im = BGIM[n]; const k = o.k ?? 1, cx = o.x ?? 0.5, cy = o.y ?? 0.5; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(k, k); g.translate(-cx * E.W, -cy * E.H); g.drawImage(im, 0, 80, im.width, im.height - 160, -E.W * 0.05, -E.H * 0.03, E.W * 1.1, E.H * 1.06); g.restore(); }
// ночная кухня: затемнение, тёплый круг света лампы над столом
SETS.kitchenNight = (g, o) => { const r = SETS.kitchen(g, o);
  g.save(); g.fillStyle = 'rgba(16,20,48,.72)'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const gr = g.createRadialGradient(E.W * 0.3, E.H * 0.5, 40, E.W * 0.3, E.H * 0.5, E.W * 0.42); gr.addColorStop(0, 'rgba(255,205,120,.5)'); gr.addColorStop(1, 'rgba(255,205,120,0)'); g.globalCompositeOperation = 'lighter'; g.fillStyle = gr; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.restore(); return r; };

// ---- новые места ролика 05 (кодом) ----
const tree = (g, x, GY, k = 1) => { inkRect(g, x - 16 * k, GY - 150 * k, 32 * k, 150 * k, { fill: '#7a4a1e', r: 6, w: 5 }); [[0, -190, 80], [-55, -150, 62], [55, -150, 62], [0, -130, 70]].forEach(([a, b, r]) => inkCircle(g, x + a * k, GY + b * k, r * k, { fill: '#4f9d3f', w: 5 })); };
SETS.park = (g) => { const GY = E.H * 0.72; const gr = g.createLinearGradient(0, 0, 0, E.H * 0.5); gr.addColorStop(0, '#78cdfa'); gr.addColorStop(1, '#d6efff'); g.fillStyle = gr; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 2);
  D.cloud(g, 360, 170, 1.5); D.cloud(g, 1420, 250, 1.2);
  g.fillStyle = '#8cc65a'; g.fillRect(-E.W, E.H * 0.5, E.W * 3, E.H * 0.3); inkLine(g, [[-E.W, E.H * 0.5], [E.W * 2, E.H * 0.5]], { w: 5, step: 40 });
  [0.06, 0.34, 0.66, 0.93].forEach((x, i) => tree(g, x * E.W, E.H * (0.5 + (i % 2) * 0.03), 1.2 - (i % 2) * 0.2));
  g.fillStyle = '#c9c3b4'; g.fillRect(-E.W, E.H * 0.76, E.W * 3, E.H * 0.05); inkLine(g, [[-E.W, E.H * 0.76], [E.W * 2, E.H * 0.76]], { w: 5, step: 40 }); inkLine(g, [[-E.W, E.H * 0.81], [E.W * 2, E.H * 0.81]], { w: 6, step: 40 });
  g.fillStyle = C.asphalt; g.fillRect(-E.W, E.H * 0.81, E.W * 3, E.H * 0.25); for (let x = -80; x < E.W + 160; x += 220) inkRect(g, x, E.H * 0.92, 120, 12, { fill: '#f6e27a', r: 4, w: 0, stroke: false });
  return { GY }; };
SETS.fair = (g) => { const GY = E.H * 0.84; D.plain(g, '#9bd7f5'); D.cloud(g, 300, 150, 1.4); D.cloud(g, 1500, 190, 1.2); g.fillStyle = '#8cc65a'; g.fillRect(-E.W, E.H * 0.6, E.W * 3, E.H); inkLine(g, [[-E.W, E.H * 0.6], [E.W * 2, E.H * 0.6]], { w: 5, step: 40 });
  inkCircle(g, E.W * 0.86, E.H * 0.33, 190, { fill: 'rgba(0,0,0,0)', w: 8 }); for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; inkLine(g, [[E.W * 0.86, E.H * 0.33], [E.W * 0.86 + Math.cos(a) * 190, E.H * 0.33 + Math.sin(a) * 190]], { w: 5 }); inkCircle(g, E.W * 0.86 + Math.cos(a) * 190, E.H * 0.33 + Math.sin(a) * 190, 22, { fill: i % 2 ? '#e5383b' : '#ffd23a', w: 4 }); }
  inkLine(g, [[E.W * 0.86, E.H * 0.33], [E.W * 0.82, E.H * 0.6]], { w: 7 }); inkLine(g, [[E.W * 0.86, E.H * 0.33], [E.W * 0.9, E.H * 0.6]], { w: 7 });
  [[0.12, '#e5383b'], [0.45, '#3d7ea6']].forEach(([x, col]) => { const cx = x * E.W; inkShape(g, [[cx - 230, E.H * 0.46], [cx, E.H * 0.3], [cx + 230, E.H * 0.46]], { fill: col, w: 6 }); for (let i = 0; i < 4; i++) inkRect(g, cx - 230 + i * 115, E.H * 0.46, 115, 40, { fill: i % 2 ? '#fff' : col, r: 8, w: 4 }); inkRect(g, cx - 230, E.H * 0.5, 460, E.H * 0.1, { fill: '#f3e8d6', r: 4, w: 5 }); });
  g.save(); const y0 = E.H * 0.18; inkLine(g, [[-20, y0], [E.W * 0.5, y0 + 50], [E.W + 20, y0]], { w: 4 }); for (let i = 0; i < 14; i++) { const u = i / 13, x = u * E.W, y = y0 + 50 * 4 * u * (1 - u) + (u > 0.5 ? 0 : 0); inkShape(g, [[x - 18, y], [x + 18, y], [x, y + 36]], { fill: ['#e5383b', '#ffd23a', '#3d7ea6', '#4fb04a'][i % 4], w: 3 }); } g.restore(); return { GY }; };
SETS.clinic = (g) => { const GY = E.H * 0.84; D.plain(g, '#e4f1ef'); g.fillStyle = '#b9cfd0'; g.fillRect(-E.W, GY, E.W * 3, E.H); inkLine(g, [[-E.W, GY], [E.W * 2, GY]], { w: 6, step: 40 }); rect(g, E.W * 0.06, E.H * 0.14, 300, 360, '#fff'); for (const [i, ch] of ['E', 'F P', 'T O Z', 'L P E D'].entries()) text(g, ch, E.W * 0.06 + 150, E.H * 0.14 + 60 + i * 72, { size: 70 - i * 12, font: FONTS.title, weight: 400, color: S().ink }); win(g, E.W * 0.78, E.H * 0.16, 330, 300); rect(g, E.W * 0.34, E.H * 0.62, 520, 24, '#c98b4a'); inkLine(g, [[E.W * 0.34 + 30, E.H * 0.62 + 24], [E.W * 0.34 + 30, GY]], { w: 6 }); inkLine(g, [[E.W * 0.34 + 490, E.H * 0.62 + 24], [E.W * 0.34 + 490, GY]], { w: 6 }); return { GY }; };

// ---- новые места ролика 06 (кодом) ----
const rain = (g, a = 1, n = 140) => { const T = NOW; g.save(); g.strokeStyle = `rgba(190,215,240,${0.55 * a})`; g.lineWidth = 3; g.lineCap = 'round'; for (let i = 0; i < n; i++) { const x = ((i * 137.5) % (E.W + 200)) - 100, y = ((i * 71.3 + T * 1500 * (0.8 + (i % 5) * 0.08)) % (E.H + 120)) - 60; g.beginPath(); g.moveTo(x, y); g.lineTo(x - 14, y + 44); g.stroke(); } g.restore(); };
export { rain };
SETS.store = (g) => { const GY = E.H * 0.84; D.plain(g, '#9bd7f5');
  const wall = '#b86a4e'; g.fillStyle = wall; g.fillRect(-E.W, E.H * 0.05, E.W * 3, GY - E.H * 0.05);
  for (let y = E.H * 0.05 + 50; y < GY; y += 50) inkLine(g, [[-E.W * 0.1, y], [E.W * 1.1, y]], { w: 2, stroke: 'rgba(60,20,10,.28)' });
  for (let r = 0; r * 50 + E.H * 0.05 < GY; r++) for (let x = (r % 2 ? 0 : 60); x < E.W + 60; x += 120) inkLine(g, [[x, E.H * 0.05 + r * 50], [x, E.H * 0.05 + r * 50 + 50]], { w: 2, stroke: 'rgba(60,20,10,.22)' });
  rect(g, E.W * 0.075, E.H * 0.2, E.W * 0.2, 84, '#2f5d8a', { w: 6 }); text(g, 'HARDWARE', E.W * 0.175, E.H * 0.2 + 46, { size: 56, font: FONTS.title, weight: 400, color: '#fff', stroke: 6, strokeColor: '#1b2230' });
  rect(g, E.W * 0.09, E.H * 0.31, E.W * 0.17, GY - E.H * 0.31, '#5a3e2a', { w: 6 }); rect(g, E.W * 0.105, E.H * 0.35, E.W * 0.14, E.H * 0.2, '#cfe6f5', { w: 5 }); inkCircle(g, E.W * 0.245, E.H * 0.62, 14, { fill: '#f6d15a', w: 4 });
  const wx = E.W * 0.56, wy = E.H * 0.26, ww = E.W * 0.34, wh = E.H * 0.34;
  rect(g, wx - 14, wy - 14, ww + 28, wh + 28, '#2b2b33', { w: 6 }); rect(g, wx, wy, ww, wh, '#bfe3f5', { w: 5, r: 6 });
  for (let i = 0; i < 3; i++) { inkRect(g, wx + 30 + i * 120, wy + wh - 130, 90, 120 - i * 10, { fill: ['#e5383b', '#ffd23a', '#3d7ea6'][i], r: 8, w: 4 }); }
  g.save(); g.globalAlpha = 0.5; g.fillStyle = '#fff'; g.beginPath(); g.moveTo(wx + ww * 0.62, wy); g.lineTo(wx + ww * 0.82, wy); g.lineTo(wx + ww * 0.52, wy + wh); g.lineTo(wx + ww * 0.32, wy + wh); g.closePath(); g.fill(); g.restore();
  g.fillStyle = '#c9c3b4'; g.fillRect(-E.W, GY, E.W * 3, E.H * 0.1); inkLine(g, [[-E.W, GY], [E.W * 2, GY]], { w: 6, step: 40 });
  g.fillStyle = '#8c8c93'; g.fillRect(-E.W, GY + E.H * 0.1, E.W * 3, E.H); inkLine(g, [[-E.W, GY + E.H * 0.1], [E.W * 2, GY + E.H * 0.1]], { w: 5 });
  return { GY, win: { x: wx, y: wy, w: ww, h: wh } }; };
SETS.storeRain = (g) => { const r = SETS.store(g); g.save(); g.fillStyle = 'rgba(44,56,86,.45)'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.restore();
  g.save(); g.fillStyle = 'rgba(120,150,190,.45)'; for (const [px, pw] of [[0.2, 260], [0.55, 320], [0.85, 220]]) { g.beginPath(); g.ellipse(E.W * px, r.GY + E.H * 0.06, pw, 24, 0, 0, 7); g.fill(); } g.restore();
  rain(g, 1); return r; };
SETS.alley = (g) => { const GY = E.H * 0.84; D.plain(g, '#52607a'); g.fillStyle = '#7a4a3e'; g.fillRect(-E.W, 0, E.W * 3, GY);
  for (let y = 40; y < GY; y += 50) inkLine(g, [[-E.W * 0.1, y], [E.W * 1.1, y]], { w: 2, stroke: 'rgba(20,10,10,.35)' });
  rect(g, E.W * 0.05, E.H * 0.2, 150, 400, '#5a5a62', { w: 6 }); inkLine(g, [[E.W * 0.05 + 75, E.H * 0.2], [E.W * 0.05 + 75, E.H * 0.2 + 400]], { w: 5 });
  g.fillStyle = '#6a6a72'; g.fillRect(-E.W, GY, E.W * 3, E.H); inkLine(g, [[-E.W, GY], [E.W * 2, GY]], { w: 6, step: 40 });
  g.save(); g.fillStyle = 'rgba(16,24,48,.4)'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.restore();
  const bx = E.W * 0.76, bw = 400, bh = 230; rect(g, bx - bw / 2, GY - bh, bw, bh, '#3d6b4a', { w: 6, r: 10 }); for (let i = 1; i < 4; i++) inkLine(g, [[bx - bw / 2 + i * bw / 4, GY - bh + 10], [bx - bw / 2 + i * bw / 4, GY - 12]], { w: 4, stroke: 'rgba(0,0,0,.35)' });
  inkShape(g, [[bx - bw / 2 - 10, GY - bh], [bx + bw / 2 + 10, GY - bh], [bx + bw / 2 + 30, GY - bh - 36], [bx - bw / 2 + 30, GY - bh - 36]], { fill: '#2f5338', w: 6 });
  inkCircle(g, bx - bw / 2 + 40, GY + 8, 24, { fill: '#222', w: 4 }); inkCircle(g, bx + bw / 2 - 40, GY + 8, 24, { fill: '#222', w: 4 });
  g.save(); g.fillStyle = 'rgba(120,150,190,.5)'; g.beginPath(); g.ellipse(E.W * 0.3, GY + E.H * 0.07, 280, 26, 0, 0, 7); g.fill(); g.restore();
  rain(g, 1); return { GY, bin: { x: bx, y: GY - bh, w: bw } }; };
SETS.garage = (g) => { const GY = E.H * 0.84; D.plain(g, '#cfc7b8'); g.fillStyle = '#bdb4a2'; g.fillRect(-E.W, GY, E.W * 3, E.H); inkLine(g, [[-E.W, GY], [E.W * 2, GY]], { w: 6, step: 40 });
  rect(g, E.W * 0.04, E.H * 0.12, E.W * 0.27, GY - E.H * 0.12 - 20, '#e8e1d2', { w: 6 }); for (let i = 1; i < 6; i++) inkLine(g, [[E.W * 0.04, E.H * 0.12 + i * (GY - E.H * 0.12 - 20) / 6], [E.W * 0.31, E.H * 0.12 + i * (GY - E.H * 0.12 - 20) / 6]], { w: 4 });
  for (const [y, n] of [[0.22, 4], [0.4, 3]]) { inkLine(g, [[E.W * 0.6, E.H * y + 80], [E.W * 0.95, E.H * y + 80]], { w: 8, stroke: '#7a4a1e' }); for (let i = 0; i < n; i++) inkRect(g, E.W * (0.62 + i * 0.08), E.H * y, 90, 80, { fill: ['#3d7ea6', '#e4872b', '#4fb04a', '#8a6ab0'][i % 4], r: 8, w: 4 }); }
  rect(g, E.W * 0.36, E.H * 0.24, 300, 130, '#fffdf6', { w: 5 }); text(g, 'ROBOT', E.W * 0.36 + 150, E.H * 0.24 + 70, { size: 64, font: FONTS.title, weight: 400, color: '#2f5d8a' });
  inkRect(g, E.W * 0.34, GY - 170, 760, 24, { fill: '#9a6a3a', r: 6, w: 5 }); inkLine(g, [[E.W * 0.34 + 40, GY - 146], [E.W * 0.34 + 40, GY]], { w: 7 }); inkLine(g, [[E.W * 0.34 + 720, GY - 146], [E.W * 0.34 + 720, GY]], { w: 7 });
  return { GY, benchY: GY - 170 }; };
SETS.busstop = (g) => { const GY = E.H * 0.84; const gr = g.createLinearGradient(0, 0, 0, E.H * 0.6); gr.addColorStop(0, '#9bd7f5'); gr.addColorStop(1, '#e6f4ff'); g.fillStyle = gr; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 2);
  for (const [x, w, h, col] of [[0.02, 280, 520, '#c9a77c'], [0.2, 240, 420, '#a8b4c4'], [0.7, 300, 560, '#d6b48a'], [0.88, 260, 460, '#b4c0d0']]) { rect(g, E.W * x, GY - h, w, h, col, { w: 5 }); for (let i = 0; i < 3; i++) for (let j = 0; j < Math.floor(h / 140); j++) inkRect(g, E.W * x + 30 + i * 80, GY - h + 40 + j * 130, 50, 70, { fill: '#cfe6f5', r: 4, w: 3 }); }
  g.fillStyle = '#c9c3b4'; g.fillRect(-E.W, GY - 8, E.W * 3, E.H * 0.1); inkLine(g, [[-E.W, GY - 8], [E.W * 2, GY - 8]], { w: 6, step: 40 }); g.fillStyle = '#8c8c93'; g.fillRect(-E.W, GY + E.H * 0.09, E.W * 3, E.H); inkLine(g, [[-E.W, GY + E.H * 0.09], [E.W * 2, GY + E.H * 0.09]], { w: 5 });
  const sx = E.W * 0.5; inkLine(g, [[sx, GY - 8], [sx, GY - 440]], { w: 9 }); inkRect(g, sx - 70, GY - 560, 140, 130, { fill: '#2f5d8a', r: 18, w: 6 }); text(g, 'BUS', sx, GY - 495, { size: 64, font: FONTS.title, weight: 400, color: '#fff' });
  inkRect(g, E.W * 0.58, GY - 92, 340, 18, { fill: '#9a6a3a', r: 6, w: 5 }); inkLine(g, [[E.W * 0.58 + 30, GY - 74], [E.W * 0.58 + 30, GY - 8]], { w: 6 }); inkLine(g, [[E.W * 0.58 + 310, GY - 74], [E.W * 0.58 + 310, GY - 8]], { w: 6 });
  return { GY: GY, benchY: GY - 150, benchX: E.W * 0.58 }; };

// ---- новые места ролика 09 (кодом; OpenAI-фоны sportStore/stage подключаются через BG_SETS после генерации) ----
SETS.sportStore = (g) => { const GY = E.H * 0.84; D.plain(g, '#9bd7f5'); D.cloud(g, 300, 150, 1.3); D.cloud(g, 1500, 200, 1.1);
  g.fillStyle = '#c9553a'; g.fillRect(-E.W, E.H * 0.2, E.W * 3, GY - E.H * 0.2 - 40);
  inkRect(g, E.W * 0.06, E.H * 0.26, E.W * 0.34, E.H * 0.34, { fill: '#cfe6f5', r: 8, w: 6 }); inkRect(g, E.W * 0.1, E.H * 0.1, E.W * 0.26, 90, { fill: '#2f5d8a', r: 10, w: 6 });
  text(g, 'HAT TRICK SPORTS', E.W * 0.23, E.H * 0.1 + 46, { size: 54, font: FONTS.title, weight: 400, color: '#fff' });
  inkRect(g, E.W * 0.47, E.H * 0.3, E.W * 0.1, GY - E.H * 0.3 - 40, { fill: '#6e4a2c', r: 10, w: 6 });
  g.fillStyle = '#7bc04a'; g.fillRect(-E.W, GY - 40, E.W * 3, E.H); inkLine(g, [[-E.W, GY - 40], [E.W * 2, GY - 40]], { w: 6 });
  for (let x = 0; x < E.W; x += 140) inkLine(g, [[x, GY + 20], [x + 70, GY + 20]], { w: 3, stroke: 'rgba(255,255,255,.4)' });
  return { GY: E.H * 0.9 }; };
SETS.stage = (g) => { const GY = E.H * 0.9; D.plain(g, '#3a2f48'); g.fillStyle = '#4a3f58'; g.fillRect(-E.W, GY - 60, E.W * 3, E.H);
  g.fillStyle = '#2a2236'; g.fillRect(-E.W, 0, E.W * 3, E.H * 0.1);
  inkRect(g, E.W * 0.06, E.H * 0.1, E.W * 0.88, E.H * 0.5, { fill: '#a62b3a', r: 0, w: 6 }); for (let x = E.W * 0.08; x < E.W * 0.94; x += 70) inkLine(g, [[x, E.H * 0.11], [x - 10, E.H * 0.6]], { w: 4, stroke: 'rgba(0,0,0,.28)' });
  inkRect(g, E.W * 0.04, E.H * 0.6, E.W * 0.92, 30, { fill: '#b57a3d', r: 4, w: 6 }); inkRect(g, E.W * 0.06, E.H * 0.6 + 30, E.W * 0.88, E.H * 0.12, { fill: '#8a5a2e', r: 0, w: 5 });
  return { GY }; };
SETS.roomNight = (g, o) => { const r = SETS.livingRoom(g, o); g.save(); g.fillStyle = 'rgba(16,20,48,.7)'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.restore(); return r; };
if (BG_IMG) for (const n of Object.keys(BG_SETS)) { const orig = SETS[n]; SETS[n] = (g, o) => { const r = orig(g, o), im = BGIM[n]; if (!(o && o.noimg)) if (n === 'stage') g.drawImage(im, 0, 0, im.width, im.height, -E.W * 0.05, E.H * 0.9 - 915 * 1.325, E.W * 1.1, im.height * 1.325); else g.drawImage(im, 0, 80, im.width, im.height - 160, -E.W * 0.05, -E.H * 0.03, E.W * 1.1, E.H * 1.06); return r; }; }
export { SETS };
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
const hasHud = (info, spec) => false;
function overlay(g, t, info, spec, heads, only) {
  const T0 = info.shot.start, T1 = info.shot.end, rows = (spec.nocap ? [] : TEXTS).filter((r) => ['cap', 'plate', 'say', 'card', 'lbl'].includes(r.k) && (only === 'say' ? r.k === 'say' : only === 'rest' ? r.k !== 'say' : true) && r.t >= T0 - 0.02 && r.t < T1 - 0.05 && !(spec.skip || []).includes(r.s));
  let capIdx = 0, sayIdx = 0; const ty0 = spec.ty ?? (rows.some((r) => r.k === 'plate') ? 0.42 : 0.13); const sayRows = rows.filter((r) => r.k === 'say'); const hud = hasHud(info, spec);
  for (const r of rows) {
    const lt = r.t - T0; if (t < lt) { if (r.k === 'cap') capIdx++; if (r.k === 'say') sayIdx++; continue; }
    if (r.k === 'plate') { const k = ease.outBack(prog(t, lt, lt + 0.35)); g.save(); const w0 = measure(g, r.s, 150) + 160; let px = E.W * (spec.plateX ?? freeX(heads, hud ? 0.45 : 0.5, 0.26, [0.2, 0.5, 0.8])), ps = 1; if (spec.plateX == null) for (const h of bigHeads(heads)) { const hr = 62 * (h.s || 1.5), py = E.H * (spec.plateY ?? (hud ? 0.25 : 0.22)); if (h.y - hr * 1.7 < py + 90 && Math.abs(px - h.x) < w0 / 2 + hr) { const Lsp = h.x - hr - 30, Rsp = E.W - 20 - (h.x + hr); if (Rsp >= Lsp) { ps = Math.min(1, Rsp / w0); px = h.x + hr + 10 + (w0 * ps) / 2; } else { ps = Math.min(1, Lsp / w0); px = h.x - hr - 10 - (w0 * ps) / 2; } } } g.translate(px, E.H * (spec.plateY ?? (hud ? 0.25 : 0.22))); g.rotate(-0.03); ps = Math.min(ps, 1760 / w0); g.scale(k * ps, k * ps); const w = w0; inkRect(g, -w / 2, -110, w, 190, { fill: ui().gold, r: 30 }); text(g, r.s, 0, 10, { size: 150, font: FONTS.title, weight: 400, color: S().ink }); g.restore(); }
    else if (r.k === 'cap' || r.k === 'card' || r.k === 'lbl') { const at = spec.capAt && spec.capAt[r.s]; const y = E.H * (at ? at[1] : spec.tyList ? spec.tyList[capIdx] ?? ty0 : ty0 + capIdx * 0.1); const bx = spec.tx ?? (hud ? 0.4 : 0.5); const x = at ? at[0] : (spec.tx != null ? bx : freeX(heads, bx, 0.25)); const side = !at && spec.tx == null && x !== bx; const bigsz = at && at[2] ? at[2] : 84; const maxW = E.W * (side ? 0.38 : hud ? 0.72 : 0.9); const sz = Math.min(bigsz, maxW / Math.max(1, measure(g, r.s, 84) / 84) * (bigsz / 84)); let xx = E.W * x, szz = sz; if (hud && y < 215) { const w1 = () => measure(g, r.s, 84) / 84 * szz, lim = E.W - 400; if (w1() > lim - 40) szz *= (lim - 40) / w1(); const rt = xx + w1() / 2; if (rt > lim) xx -= rt - lim; xx = Math.max(xx, w1() / 2 + 20); } if (dayAt(T0 + t) != null && !spec.nohud && y < 200) { const w1 = measure(g, r.s, 84) / 84 * szz, lim = E.W - 40; if (w1 > lim - 340) szz *= (lim - 340) / w1; const w2 = measure(g, r.s, 84) / 84 * szz; xx = Math.max(xx, 340 + w2 / 2); xx = Math.min(xx, lim - w2 / 2); }
 D.marker(g, r.s, xx, y, { size: szz, t, start: lt, outline: 14, color: r.s === r.s.toUpperCase() && /\d/.test(r.s) && capIdx % 2 ? ui().accent : S().ink }); capIdx++; }
    else { const nx = sayRows.find((q) => q.t > r.t + 0.05), endT = nx ? nx.t - T0 : lt + 4; if (t > endT) { sayIdx++; continue; } let idx = (spec.say ?? [0])[sayIdx % (spec.say ?? [0]).length] ?? 0; if (r.who) { const j = heads.findIndex((q) => q && (q.tag === r.who || q.id === r.who)); if (j >= 0) idx = j; } const h = heads[idx]; sayIdx++; if (!h) continue; const lines = wrap(r.s, 26), w = Math.min(980, Math.max(...lines.map((l) => measure(g, l, 50))) + 100), hgt = 76 + lines.length * 64, side = h.id && h.id !== 'LEON', dir = h.x < E.W * 0.6 ? 1 : -1, bx = clamp(h.x + (side ? 230 * dir : 0), w / 2 + 40, E.W - w / 2 - 40), by = clamp(h.y - 130 - hgt / 2 - (side ? 190 : 0), hgt / 2 + 30, E.H - 300); D.bubble(g, bx, by, w, hgt, { tail: [clamp(h.x + (h.f ?? 1) * 10 * (h.s || 1.5), bx - w / 2 + 40, bx + w / 2 - 40), Math.max(h.y - 70 * (h.s || 1.5), by + hgt / 2 + 22)], t, start: lt }, (g2) => lines.forEach((l, i) => text(g2, l, 0, (i - (lines.length - 1) / 2) * 56 + 4, { size: 50, font: FONTS.ui, weight: 900, color: S().ink }))); }
  }
}

// ---------- облака-мысли (ярусы, правило владельца 14.11.2026): над головой владельца, tier = высота этажа ----------
// spec.cloudInit {WHO: 'текст до первого ряда'}, spec.cloudEnd {WHO: lt лопания}, spec.cloudPic {WHO: (g,cx,cy,w,h,t)=>…} картинка вместо текста,
// spec.cloudAt {WHO: [dx, dy]} сдвиг, spec.cs масштаб облаков, spec.cloudsOff — не рисовать облака
export function cloudBox(g, str, cs = 1, pic = false) { const lines = pic ? [''] : wrap(str, 14); const w = pic ? 250 * cs : (Math.max(...lines.map((l) => measure(g, l, 46 * cs))) + 70 * cs); return { lines, w: Math.max(w, 150 * cs), h: pic ? 200 * cs : (lines.length * 54 + 50) * cs }; }
export function drawCloud(g, t, o) { // o: {x,y,tx,ty,text,pic,cs,start,end}
  const cs = o.cs ?? 1, bx = cloudBox(g, o.text || '', cs, !!o.pic); let k = 1;
  if (o.end != null && t >= o.end) { const d = (t - o.end) / 0.28; if (d >= 1) return; g.save(); g.globalAlpha = 1 - d; g.translate(o.x, o.y); g.scale(1 + d * 0.35, 1 + d * 0.35); g.translate(-o.x, -o.y); }
  else g.save();
  const kk = ease.outBack(prog(t, o.start ?? 0, (o.start ?? 0) + 0.35)); if (kk <= 0.01) { g.restore(); return; }
  const W2 = bx.w / 2, H2 = bx.h / 2, N = Math.max(10, Math.round((bx.w + bx.h) / 34)), blobs = [];
  for (let i = 0; i < N; i++) { const a = (i / N) * Math.PI * 2; const px = Math.cos(a) * (W2 - 18 * cs), py = Math.sin(a) * (H2 - 14 * cs); blobs.push([px, py, (44 + 8 * Math.sin(i * 2.3)) * cs * (bx.h > 120 ? 0.9 : 0.7)]); }
  blobs.push([0, 0, Math.max(W2, H2) * 0.6]);
  const tl = [o.tx - o.x, o.ty - o.y], tails = [[0.72, 17], [0.86, 11], [0.97, 7]].map(([u, r]) => [lerp(0, tl[0], u), lerp(H2 * 0.7, tl[1], u), r * cs]);
  g.translate(o.x, o.y); g.scale(kk, kk);
  const body = (g2, grow, col) => { g2.fillStyle = col; blobs.forEach(([x, y, r]) => { g2.beginPath(); g2.ellipse(x * 1, y * 1, r + grow, (r + grow) * 0.92, 0, 0, 7); g2.fill(); }); g2.beginPath(); g2.ellipse(0, 0, W2 - 10 * cs + grow, H2 - 6 * cs + grow, 0, 0, 7); g2.fill(); tails.forEach(([x, y, r]) => { g2.beginPath(); g2.arc(x, y, r + grow, 0, 7); g2.fill(); }); };
  g.save(); g.shadowColor = 'rgba(0,0,0,.18)'; g.shadowBlur = 14; g.shadowOffsetY = 6; body(g, 5, S().ink); g.restore();
  body(g, -1, o.fill || '#ffffff');
  if (o.pic) o.pic(g, 0, 0, bx.w, bx.h, t); else bx.lines.forEach((l, i) => text(g, l, 0, (i - (bx.lines.length - 1) / 2) * 54 * cs + 4, { size: 46 * cs, font: FONTS.ui, weight: 900, color: o.color || S().ink }));
  g.restore();
}
function cloudsPass(g, t, info, spec, heads) {
  if (spec.cloudsOff) return; const T0 = info.shot.start, T1 = info.shot.end;
  const rows = TEXTS.filter((r) => r.k === 'cloud' && r.t >= T0 - 0.02 && r.t < T1 - 0.05).map((r) => ({ ...r, lt: r.t - T0 }));
  const whos = new Set([...rows.map((r) => r.who), ...Object.keys(spec.cloudInit || {}), ...Object.keys(spec.cloudPic || {})]);
  for (const who of whos) {
    const h = heads.find((q) => q && !q.hidden && (q.tag === who || q.id === who)); if (!h) continue;
    const mine = rows.filter((r) => r.who === who); let cur = null; for (const r of mine) if (t >= r.lt) cur = r;
    const tier = (cur || mine[0] || { tier: spec.tierOf?.[who] ?? 1 }).tier;
    let text0 = cur ? cur.s : (spec.cloudInit || {})[who]; const pic = (spec.cloudPic || {})[who];
    if (text0 == null && !(pic && (cur || (t >= 0 && !mine.length)))) { if (!pic) continue; }
    if ((spec.cloudText || {})[who] != null && t >= ((spec.cloudFrom || {})[who] ?? 0)) text0 = spec.cloudText[who];
    if (text0 && text0.startsWith('[') ) text0 = '';
    const cs = spec.csK ? kf(spec.csK, t, 1) : (spec.cs ?? 1), bx = cloudBox(g, text0 || '', cs, !!pic && !text0), top = h.y - 74 * (h.s || 1.5) * 0.9;
    const at = (spec.cloudAt || {})[who] || [0, 0];
    let cx = clamp(h.x + at[0], bx.w / 2 + 24, E.W - bx.w / 2 - 24), cy = top - 64 - bx.h / 2 - (tier - 1) * (spec.tierGap ?? 150) + at[1];
    cy = Math.max(cy, bx.h / 2 + 64);
    if (dayAt(info.shot.start + t) != null && !spec.nohud && cy - bx.h / 2 < 150 && cx - bx.w / 2 < 350) cx = 350 + bx.w / 2 + 10;
    const from = (spec.cloudFrom || {})[who] ?? 0, start = (spec.cloudInit || {})[who] != null ? from : (mine[0] ? mine[0].lt : from); if (t < start) continue;
    drawCloud(g, t, { x: cx, y: cy, tx: clamp(h.x, cx - bx.w * 0.3, cx + bx.w * 0.3), ty: Math.max(top - 10, cy + bx.h / 2 + 30), text: text0 || '', pic: pic && !text0 ? pic : (pic && text0 === '' ? pic : null), cs, start, end: (spec.cloudEnd || {})[who], fill: (spec.cloudFill || {})[who] ? spec.cloudFill[who](t) : undefined });
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
export let NOW = 0;
function frameCheck(id, o, walking) { const top = o.hy - 100 * o.s, bad = []; if (top < -4) bad.push(`кепка или голова за верхом кадра (${Math.round(top)}px)`); if (o.y > E.H + 6) bad.push(`ступни ниже кадра (${Math.round(o.y - E.H)}px)`); if (o.x < 40 || o.x > E.W - 40) { if (!walking) bad.push('Leon у края кадра по горизонтали'); } for (const b of bad) { const key = id + b; if (!CHECKED.has(key)) { CHECKED.add(key); console.log(`ERROR frame-check ${id}: ${b}`); } } }

// ---------- регистрация кадра ----------
export function def(id, spec) {
  registerShot(id, { draw(g, t, info) {
    NOW = info.shot.start + t; const cam = camOf(spec, t, info.dur, info), wins = talkWins(spec, info);
    let ctx = { GY: E.H * 0.84, dur: info.dur };
    layer(g, cam, 0.9, (g) => { ctx = { ...ctx, ...set(spec.set || 'void', g, spec.so) }; if (spec.bg) spec.bg(g, t, info, ctx); });
    const heads = [];
    layer(g, cam, 1, (g) => {
      ctx.cam = cam;
      if (spec.pre) spec.pre(g, t, info, ctx);
      if (spec.kids) drawKids(g, t, spec, ctx.GY, 'back');
      (spec.chars || []).forEach((c, i) => { const o = who(g, c, t, info, ctx.GY, wins[i]); heads.push({ x: o.x, y: o.hy ?? o.y - 360, id: c.w, tag: c.tag || c.w, s: o.s, f: c.f ?? 1, hidden: o.hidden }); if (!spec.nocheck && c.w === 'LEON' && !o.hidden && !c.nocheck) frameCheck(info.shot.id, o, !!c.walk); });
      (spec.heads || []).forEach((h) => heads.push(h));
      if (spec.kids) drawKids(g, t, spec, ctx.GY, 'front');
      if (spec.close) { closeUp(g, spec.close, t, spec.chars && spec.chars.length ? undefined : wins[0]); const c = spec.close; if (!(spec.chars && spec.chars.length)) heads.push({ x: (c.x ?? 0.5) * E.W - (c.r ?? 330) * 0.1, y: (c.y ?? 0.62) * E.H - (c.r ?? 330) * 0.62 + 40, id: c.w || 'LEON', s: 1.5 }); }
      if (spec.closes) spec.closes.forEach((c, i) => { closeUp(g, c, t, wins[i]); heads.push({ x: (c.x ?? 0.5) * E.W, y: (c.y ?? 0.62) * E.H - (c.r ?? 330) * 0.62 + 40, id: c.w || 'LEON', s: 1.5, hidden: !!(c.show && (t < c.show[0] || t > c.show[1])) }); });
      if (spec.mid) spec.mid(g, t, info, { ...ctx, heads });
      cloudsPass(g, t, info, spec, heads);
      overlay(g, t, info, spec, heads.length ? heads : [{ x: E.W / 2, y: E.H * 0.55 }], 'say');
      if (spec.fx) spec.fx(g, t, info, { ...ctx, heads });
    });
    if (spec.top) spec.top(g, t, info, ctx);
    overlay(g, t, info, spec, heads.length ? heads : spec.close ? (() => { const c = spec.close, r = c.r ?? 330, cx = (c.x ?? 0.5) * E.W, cy = (c.y ?? 0.62) * E.H; return [{ x: cx - r * 0.55, y: cy - r * 1.62 + 110 }]; })() : [{ x: E.W / 2, y: E.H * 0.55 }], 'rest');
    if (!spec.nohud) drawHud(g, t, info);
  } });
}

export const SMX = SM;
