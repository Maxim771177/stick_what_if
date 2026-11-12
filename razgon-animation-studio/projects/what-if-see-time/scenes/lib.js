// lib.js: общий каркас кадров ролика 02 «What If You Could See How Long Everyone Has Left» (пак doodle:clean).
// Кадр = def('s001', {...}). Поля: set, cam, chars[], bars[], kids{}, fx(g,t,info,c) (поверх людей), pre(g,t,info,c) (до людей), close{...}, ty.
// Тексты на экране: story/texts.json (из text_elements.md; k = cap | plate | say | lbl). Подписи полоски (lbl) рисует сама полоска.
import { E, V, S, registerShot, mood, layer, blurLayer, ease, prog, lerp, clamp, FONTS, text, measure, shade, alpha } from '/engine/core.js';
import { drawCharacter, characterCloseUp, characterHead, POSES, posesAt, breathe, walkPose } from '/engine/characters.js';
import { camPath, drift, camAdd } from '/engine/motion.js';
import * as D from '/engine/doodle.js';
import { inkShape, inkCircle, inkRect, inkLine, inkTube, inkEllipse, inkBlob } from '/engine/ink.js';
import { loadImages, img, loadJSON, project } from '/engine/assets.js';

export { E, V, S, mood, ease, prog, lerp, clamp, FONTS, text, measure, shade, alpha, D, inkShape, inkCircle, inkRect, inkLine, inkTube, inkEllipse, inkBlob, POSES, walkPose, posesAt, breathe, drawCharacter, characterHead };

const TEXTS = await loadJSON(project('story/texts.json'));
export const C = { wood: '#c98b4a', woodD: '#9a6a3a', board: '#3f6b57', paper: '#fffdf6', glass: '#cfe6f5', red: '#d8232a', gold: '#f6b93b', blue: '#3d7ea6', grey: '#b8b3a8', night: '#2e3a5c', green: '#7da55a', cream: '#f3e8d6' };
export const ui = () => S().ui;

// ---------- наряды (doodle). Leon: одна кукла Razgon на весь канал, ONE_LEON ниже не отключать ----------
export const OUT = {
  LEON: { arcBrows: true, top: 'tshirt', color: '#d8232a', color2: '#ffffff', emblem: 'bolt', shorts: '#8a8a8a', shoes: '#f28a1e', sneakers: true, whiteHands: true, hair: 'none', hairColor: '#6b3a1e', hat: 'capBack', hatColor: '#17c3b2' },
  PARK: { top: 'suit', color: '#6b4e9b', hair: 'bun', face: 'glasses' },
  OMAR: { top: 'hoodie', color: '#e4872b', hair: 'spiky', hairColor: '#2b2420', kid: true },
  MOM: { top: 'dress', color: '#f29ac0', hair: 'ponytail', hairColor: '#6b3a1e' },
  DAD: { top: 'tshirt', color: '#5a7fb0', hair: 'short', hairColor: '#3a2a1e', shorts: '#6b5a48' },
  NORA: { top: 'tshirt', color: '#f2c21a', hair: 'ponytail', hairColor: '#8a5a2e', kid: true },
  ROCCO: { top: 'hoodie', color: '#5a3e8a', hair: 'short', hairColor: '#2b2420', kid: true },
  LADY: { top: 'dress', color: '#f2f2f2', hair: 'bun' },
  LADY2: { top: 'dress', color: '#f2f2f2', hair: 'ponytail', hairColor: '#2b2420' },
  LADY3: { top: 'dress', color: '#f2f2f2', hair: 'short', hairColor: '#8a5a2e' },
  CLOWN: { top: 'tshirt', color: '#e4572e', hair: 'spiky', hairColor: '#ff7a3d' },
  FIRE: { top: 'jersey', color: '#d8232a', hat: 'hardhat', hatColor: '#f2c21a' },
  DOC: { top: 'labcoat', face: 'glasses', hair: 'none' },
  PLUMBER: { top: 'hoodie', color: '#3d7ea6', hat: 'cap', hatColor: '#f2c21a' },
  SUB: { top: 'suit', color: '#4b5a3c', hair: 'short', hairColor: '#2b2420' },
  GUY: { top: 'tshirt', color: '#7da55a', hair: 'short', hairColor: '#2b2420' },
  STRANGER: { top: 'hoodie', color: '#2b2b33', hat: 'cap', hatColor: '#2b2b33' },
  NEIGHBOR: { top: 'tshirt', color: '#d6872b', hair: 'short', hairColor: '#6b3a1e' },
  SCI: { top: 'labcoat', face: 'glasses', hair: 'bun' },
  KID: { top: 'hoodie', color: '#3fb950', hair: 'short', kid: true },
  KID2: { top: 'tshirt', color: '#3a6ea5', hair: 'spiky', hairColor: '#2b2420', kid: true },
  KID3: { top: 'tshirt', color: '#f29ac0', hair: 'ponytail', hairColor: '#6b3a1e', kid: true },
  KID4: { top: 'hoodie', color: '#c9c3b4', hair: 'short', hairColor: '#8a5a2e', kid: true },
  KID5: { top: 'tshirt', color: '#8a6ab0', hair: 'short', hairColor: '#2b2420', kid: true },
  KID6: { top: 'tshirt', color: '#f2a03a', hair: 'bun', hairColor: '#2b2420', kid: true },
};
Object.values(OUT).forEach((o) => { o.whiteHands = true; });
OUT.FIRE = { top: 'jersey', color: '#d8232a', helmet: '#f2c21a', whiteHands: true };
const KIDS = ['KID', 'KID2', 'KID3', 'KID4', 'KID5', 'KID6', 'OMAR'];
const SM = { LEON: 0.86, NORA: 0.78, OMAR: 1.12, ROCCO: 1.42, KID: 1.15, KID2: 1.15, KID3: 1.15, KID4: 1.15, KID5: 1.15, KID6: 1.15 };

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
  const id = c.w || 'KID', f = c.f ?? 1, x = (c.x ?? 0.5) * E.W, y = GY + (c.dy ?? 0);
  let cx = x; let walking = false;
  if (c.walk) { const [x0, x1, t0, t1] = c.walk; const u = clamp((t - t0) / (t1 - t0)); cx = lerp(x0, x1, ease.inOut(u)) * E.W; walking = u > 0 && u < 1; }
  const pn = tl(c.pose || 'stand', t), expr = tl(c.expr || 'neutral', t);
  const s = kf(c.s, t, 1.55) * (SM[id] ?? 1);
  const talking = (c.talk && t >= c.talk[0] && t <= c.talk[1]) || inWin(wins, t);
  const ent = c.noin ? 1 : ease.outBack(prog(t, c.in ?? 0, (c.in ?? 0) + 0.5)), pop = 0.86 + 0.14 * ent;
  const o = { x: cx, y: y, s, facing: f, outfit: { ...OUT[id], ...(c.of || {}) }, expr, blink: blinkAt(t, (c.x || 0) * 9 + id.length), talk: talking ? 0.5 + 0.5 * Math.sin(t * 22) : 0, look: c.look, prop: tl(c.prop, t), alpha: c.a == null ? undefined : tl(c.a, t), rot: c.rot };
  if (c.fall) o.rot = c.fall * ease.in(clamp(t / 0.5));
  if (c.rotK) o.rot = kf(c.rotK, t);
  if (c.hide && t < c.hide[0]) return { x: cx, y, s, hy: y - 300 * s * 0.5, hidden: true };
  if (c.hide && t > c.hide[1]) return { x: cx, y, s, hy: y - 300 * s * 0.5, hidden: true };
  let pose;
  if (walking) pose = walkPose(t * 2 * Math.PI * 1.3);
  else if (c.poseObj) pose = c.poseObj;
  else if (talking && ['stand', 'relaxed', 'talk', 'explain'].includes(pn) && !SIT(pn)) pose = breathe(posesAt(t, Array.from({ length: 30 }, (_, i) => [i * 0.7, TALKSEQ[(i + id.length) % 4]])), t, 1, id.length + 2);
  else pose = breathe(posesAt(t, (Array.isArray(c.pose) ? c.pose : [[0, c.pose || 'stand']])), t, 1, id.length + 2);
  o.pose = pose;
  const yo = c.bob ? -Math.abs(Math.sin(t * c.bob)) * 10 : 0;
  g.save(); g.translate(cx, y); g.scale(pop, pop); g.translate(-cx, -y);
  if (!c.nostool && (SIT(Array.isArray(c.pose) ? tl(c.pose, t) : c.pose) || SIT(pn))) {
    const hx = cx + pose.hip[0] * s * f, hy = y + (pose.hip[1] + 6) * s;
    inkRect(g, hx - 46 * s, hy, 92 * s, 14 * s, { fill: C.woodD, r: 4 });
    inkLine(g, [[hx - 36 * s, hy + 14 * s], [hx - 36 * s, y]], { w: 6 }); inkLine(g, [[hx + 36 * s, hy + 14 * s], [hx + 36 * s, y]], { w: 6 });
  }
  o.y = y + yo;
  drawCharacter(g, o);
  g.restore();
  o.hy = characterHead(o)[1];
  if (OUT[id].helmet && !o.hidden) { const R = 55 * s / 1.55 * 1.55, hx = o.x + 2 * f * s / 1.55, hyy = o.hy - R * 0.62, pts = []; for (let i = 0; i <= 14; i++) { const a = Math.PI + (i / 14) * Math.PI; pts.push([hx + Math.cos(a) * R * 0.95, hyy + Math.sin(a) * R * 0.62]); } inkShape(g, pts, { fill: OUT[id].helmet, smooth: true, seed: 71 }); inkRect(g, hx - R * 1.05, hyy - 4, R * 2.1, R * 0.16, { fill: shade(OUT[id].helmet, -0.12), r: 5, w: 4 }); inkRect(g, hx - R * 0.16, hyy - R * 0.66, R * 0.32, R * 0.3, { fill: '#d8232a', r: 4, w: 3 }); }
  if (c.after) c.after(g, o, t);
  return o;
}

export function closeUp(g, c, t, wins) {
  const id = c.w || 'LEON', x = (c.x ?? 0.5) * E.W, y = (c.y ?? 0.62) * E.H, r = c.r ?? 330;
  characterCloseUp(g, x, y, r, { outfit: { ...OUT[id], ...(c.of || {}) }, expr: tl(c.expr || 'neutral', t), blink: blinkAt(t, 1), talk: (c.talk && t >= c.talk[0] && t <= c.talk[1]) || inWin(wins, t) ? 0.5 + 0.5 * Math.sin(t * 22) : 0 });
}

// ---------- ПОЛОСКА ЗДОРОВЬЯ (HUD-компонент). Правила: тёмная рамка, заливка слева направо, голубая ≥50%, розовая ≤25%, подпись белая с чёрным контуром.
// bar(g, x, y, frac, { w, t, start, label, labelAt, breathe })  — x,y = центр полоски. label — строка; labelAt = момент, когда подпись сменилась (для «перекатывания»).
const BLUE = [63, 184, 255], PINK = [255, 95, 162];
export const barColor = (f) => { const u = clamp((f - 0.25) / 0.25), c = PINK.map((p, i) => Math.round(lerp(p, BLUE[i], u))); return `rgb(${c[0]},${c[1]},${c[2]})`; };
export function bar(g, x, y, frac, o = {}) {
  const k = o.t == null ? 1 : ease.outBack(prog(o.t, o.start ?? 0, (o.start ?? 0) + 0.35)); if (k <= 0.02) return;
  const w = o.w ?? 250, st = o.style || 'under', h = o.h ?? (st === 'in' ? Math.max(30, w * 0.22) : Math.max(18, w * 0.125)), sc = o.s ?? 1, tt = o.t ?? 0;
  let f = clamp(frac - (o.breathe === false ? 0 : 0.004 * Math.sin(tt * 0.5)));
  g.save(); g.translate(x, y); g.scale(k * sc, k * sc);
  if (o.glow) { g.save(); g.globalAlpha = 0.35 + 0.25 * Math.sin(tt * 6); inkRect(g, -w / 2 - 14, -h / 2 - 14, w + 28, h + 28, { fill: barColor(f), r: h, stroke: false }); g.restore(); }
  inkRect(g, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, { fill: '#1b2230', r: (h + 12) / 2, w: 5 });
  const fw = Math.max(h * 0.9, w * f);
  g.save(); g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, h / 2); g.clip(); g.fillStyle = '#39445a'; g.fillRect(-w / 2, -h / 2, w, h); g.fillStyle = barColor(f); g.fillRect(-w / 2, -h / 2, fw, h); g.fillStyle = 'rgba(255,255,255,.28)'; g.fillRect(-w / 2, -h / 2, fw, h * 0.34); g.restore();
  if (o.label && st === 'in') { const sz = h * 0.72; text(g, o.label, 0, sz * 0.03, { size: sz, color: '#ffffff', weight: 900, font: FONTS.ui, stroke: sz * 0.26, strokeColor: '#000' }); }
  else if (o.label && st === 'pill') { const sz = h * 1.5, pw = measure(g, o.label, sz) + sz * 0.9; inkRect(g, -pw / 2, -h / 2 - sz * 1.75, pw, sz * 1.45, { fill: '#1b2230', r: sz * 0.7, w: 4 }); text(g, o.label, 0, -h / 2 - sz * 0.72, { size: sz, color: '#fff', weight: 900, font: FONTS.title }); }
  else if (o.label && st === 'end') { const sz = h * 1.6; text(g, o.label, w / 2 + 24, sz * 0.32, { size: sz, color: '#fff', weight: 900, font: FONTS.title, align: 'left', stroke: sz * 0.2, strokeColor: '#000' }); }
  else if (o.label) {
    const la = o.labelAt ?? -9, u = ease.outBack(prog(tt, la, la + 0.3)), ly = h / 2 + (o.size ?? w * 0.17) * 0.95;
    const sz = (o.size ?? w * 0.17) * (0.6 + 0.4 * u) * (o.labelBig ? 1.3 : 1);
    g.save(); g.globalAlpha *= clamp(u * 1.4); if (o.prevLabel && u < 1) { g.save(); g.globalAlpha *= 1 - u; text(g, o.prevLabel, 0, ly - 40 * u, { size: sz, color: '#fff', weight: 900, font: FONTS.title, stroke: sz * 0.2, strokeColor: '#000' }); g.restore(); }
    text(g, o.label, 0, ly + (1 - u) * 26, { size: sz, color: '#ffffff', weight: 900, font: FONTS.title, stroke: sz * 0.2, strokeColor: '#000' });
    g.restore();
  }
  g.restore();
}

// ---------- места ----------
const rect = (g, x, y, w, h, fill, o = {}) => inkRect(g, x, y, w, h, { fill, r: 4, ...o });
export const K = { rect, circ: (g, x, y, r, fill, o = {}) => inkCircle(g, x, y, r, { fill, ...o }), line: (g, pts, o = {}) => inkLine(g, pts, o), poly: (g, pts, fill, o = {}) => inkShape(g, pts, { fill, ...o }), W: () => E.W, H: () => E.H };
const floorLine = (g, GY) => inkLine(g, [[-E.W, GY], [E.W * 2, GY]], { w: 6, step: 40 });
const win = (g, x, y, w, h, sky = C.glass, panes = 2) => { rect(g, x, y, w, h, sky); for (let i = 1; i < panes; i++) inkLine(g, [[x + (w * i) / panes, y], [x + (w * i) / panes, y + h]], { w: 6 }); inkLine(g, [[x, y + h / 2], [x + w, y + h / 2]], { w: 6 }); };
export { win, rect, floorLine };
// GY = линия пола, на которую встают герои (по фону OpenAI)
const SETS = {
  void(g) { const GY = E.H * 0.84; D.plain(g, '#fbf8f1'); g.strokeStyle = 'rgba(61,126,166,.10)'; g.lineWidth = 2; for (let x = 0; x <= E.W; x += 60) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke(); } for (let y = 0; y <= E.H; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke(); } return { GY }; },
  voidDark(g) { const GY = E.H * 0.84; D.plain(g, '#243046'); g.strokeStyle = 'rgba(255,255,255,.07)'; g.lineWidth = 2; for (let x = 0; x <= E.W; x += 60) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke(); } for (let y = 0; y <= E.H; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke(); } return { GY }; },
  hall(g) { const GY = E.H * 0.8; D.plain(g, '#f0e2c6'); g.fillStyle = '#ecd7b0'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); for (let i = 0; i < 6; i++) rect(g, 420 + i * 140, 220, 120, 440, '#3d7ea6'); return { GY }; },
  kitchen(g) { const GY = E.H * 0.84; D.plain(g, '#f3e8d6'); g.fillStyle = '#c9a77c'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); win(g, 120, 150, 380, 330); rect(g, 1420, 300, 360, 540, '#c9d3da'); return { GY }; },
  basement(g) { const GY = E.H * 0.82; D.plain(g, '#9aa3b2'); g.fillStyle = '#7a8394'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  fair(g) { const GY = E.H * 0.8; D.plain(g, '#cfe6f5'); g.fillStyle = '#d8a066'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  lobby(g) { const GY = E.H * 0.84; D.plain(g, '#f0dcc0'); g.fillStyle = '#d7a77c'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  streetNight(g) { const GY = E.H * 0.86; D.plain(g, '#2e3a5c'); g.fillStyle = '#3b4258'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  frontYard(g) { const GY = E.H * 0.88; D.plain(g, '#cfe6f5'); g.fillStyle = '#7da55a'; g.fillRect(-E.W, E.H * 0.55, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  classroom(g) { const GY = E.H * 0.84; D.plain(g, '#f3e8d6'); g.fillStyle = '#c9a77c'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); win(g, 120, 150, 430, 400); rect(g, 746, 176, 788, 328, C.wood); rect(g, 760, 190, 760, 300, C.board); return { GY }; },
  cafeteria(g) { const GY = E.H * 0.8; D.plain(g, '#efe0bd'); g.fillStyle = '#d9c7a1'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); return { GY }; },
  livingRoom(g) { const GY = E.H * 0.84; D.plain(g, '#efe0c8'); g.fillStyle = '#b98f62'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); win(g, 150, 160, 380, 380); return { GY }; },
};
// Фоны от OpenAI (assets/bg/<файл>.png, 1536x1024, в кадре обрезаются до 16:9). BG_IMG=false вернёт кодовые заглушки.
const BG_IMG = true;
const BG_FILES = { hall: 'hall', kitchen: 'kitchen', basement: 'basement', fair: 'fair', lobby: 'lobby', streetNight: 'street_night', frontYard: 'front_yard', classroom: 'classroom', cafeteria: 'cafeteria', livingRoom: 'livingRoom' };
const BGIM = await loadImages(Object.fromEntries(Object.entries(BG_FILES).map(([n, f]) => [n, project(`assets/bg/${f}.png`)])));
const PIM = await loadImages(Object.fromEntries(['basement/battery', 'basement/co_detector', 'basement/co_detector_open', 'basement/gas_analyzer', 'basement/medkit', 'basement/oxygen_mask', 'basement/penlight', 'basement/thermometer', 'fair/balloons', 'fair/clown_hat', 'fair/cotton_candy', 'fair/icecream', 'fair/icecream_fallen', 'fair/popcorn', 'fair/teddy', 'fair/tickets', 'icons/blood_cell', 'icons/crystal_ball', 'icons/fire_truck', 'icons/gamepad', 'icons/gavel', 'icons/magazine', 'icons/medal', 'icons/star', 'kitchen/bone', 'kitchen/cereal', 'kitchen/coffee_cup', 'kitchen/coffee_pot', 'kitchen/juice_boxes', 'kitchen/keys', 'kitchen/pizza', 'kitchen/water_bottle'].map((n) => [n.split('/')[1], project(`assets/props/${n}.png`)])));
// картинка-предмет: prop(g,'keys',x,y,h,{rot,flip,a}) — h = высота в пикселях кадра, x,y = центр
export function prop(g, name, x, y, h, o = {}) { const im = PIM[name]; if (!im) return; const sc = h / im.height, k = o.k ?? 1; g.save(); g.translate(x, y); if (o.rot) g.rotate(o.rot); g.scale((o.flip ?? 1) * sc * k, sc * k); if (o.a != null) g.globalAlpha *= o.a; if (o.shadow) { g.fillStyle = 'rgba(0,0,0,.15)'; g.beginPath(); g.ellipse(0, im.height * 0.5, im.width * 0.4, im.height * 0.05, 0, 0, 7); g.fill(); } g.drawImage(im, -im.width / 2, -im.height / 2); g.restore(); }
if (BG_IMG) for (const n of Object.keys(BG_FILES)) { const orig = SETS[n]; SETS[n] = (g, o) => { const r = orig(g, o), im = BGIM[n]; g.drawImage(im, 0, 80, im.width, im.height - 160, -E.W * 0.05, -E.H * 0.03, E.W * 1.1, E.H * 1.06); return r; }; }
export const set = (name, g, o) => (SETS[name] || SETS.void)(g, o);

// ---------- толпа ребят: n фигурок, ряды по глубине, у каждого (по желанию) полоска ----------
const rnd = (seed) => { let a = seed * 9301 + 49297; return () => { a = (a * 9301 + 49297) % 233280; return a / 233280; }; };
export const kidsPos = (n, seed, x0 = 0.05, x1 = 0.95, y0 = 0.78, y1 = 0.9) => { const r = rnd(seed); return Array.from({ length: n }, () => ({ x: lerp(x0, x1, r()), y: lerp(y0, y1, r()), id: KIDS[Math.floor(r() * KIDS.length)], f: r() < 0.5 ? -1 : 1, fr: r() < 0.22 ? 0.12 + r() * 0.2 : 0.55 + r() * 0.45 })); };
function drawKids(g, t, spec, GY) {
  const k = spec.kids; const list = k.list || kidsPos(k.n ?? 12, k.seed ?? 3, k.x0, k.x1, k.y0, k.y1); const sc = k.s ?? 1.0;
  [...list].sort((a, b) => a.y - b.y).forEach((p, i) => {
    const y = p.y * E.H, depth = 0.7 + 0.5 * (y / E.H), s = (k.s ?? 1.1) * depth * 1.35; const wob = Math.sin(t * 2 + i) * 0.5;
    const a = k.in ? ease.out(prog(t, k.in + i * (k.stagger ?? 0.03), k.in + i * (k.stagger ?? 0.03) + 0.4)) : 1; if (a <= 0) return;
    const o = { x: p.x * E.W + (k.drift ? Math.sin(t * k.drift + i) * 20 : 0) + (k.march ? (t * k.march * (p.f)) : 0), y, s, facing: p.f, outfit: OUT[p.id], expr: k.expr || 'neutral', blink: blinkAt(t, i * 3), pose: breathe(POSES[k.pose || 'stand'], t, 1, i + 1), alpha: a };
    g.save(); g.translate(o.x, y); g.scale(1, 1); g.translate(-o.x, -y); drawCharacter(g, o); g.restore();
    if (k.bars) { const bw = (k.bw ?? 120) * depth, bt = k.barAt != null ? k.barAt + (k.wave ? (p.x * k.wave) : i * 0.04) : 0; const hy = characterHead(o)[1]; bar(g, o.x, hy - 70 * s, k.fr != null ? k.fr : p.fr, { w: bw, t: t, start: bt, label: k.lbl ? k.lbl(p, i) : null }); }
  });
}

// ---------- надписи ----------
function overlay(g, t, info, spec, heads) {
  const T0 = info.shot.start, T1 = info.shot.end, rows = (spec.nocap ? [] : TEXTS).filter((r) => r.k !== 'lbl' && r.t >= T0 - 0.02 && r.t < T1 - 0.05 && !(spec.skip || []).includes(r.s));
  let capIdx = 0, sayIdx = 0; const ty0 = spec.ty ?? 0.13;
  for (const r of rows) {
    const lt = r.t - T0; if (t < lt) { if (r.k === 'cap') capIdx++; if (r.k === 'say') sayIdx++; continue; }
    if (r.k === 'plate') { const k = ease.outBack(prog(t, lt, lt + 0.35)); g.save(); g.translate(E.W / 2, E.H * (spec.plateY ?? 0.22)); g.rotate(-0.03); g.scale(k, k); const w = measure(g, r.s, 150) + 160; inkRect(g, -w / 2, -110, w, 190, { fill: ui().gold, r: 30 }); text(g, r.s, 0, 10, { size: 150, font: FONTS.title, weight: 400, color: S().ink }); g.restore(); }
    else if (r.k === 'cap') { const at = spec.capAt && spec.capAt[r.s]; const y = E.H * (at ? at[1] : spec.tyList ? spec.tyList[capIdx] ?? ty0 : ty0 + capIdx * 0.1); const x = at ? at[0] : (spec.tx ?? 0.5); const bigsz = at && at[2] ? at[2] : 84; const sz = Math.min(bigsz, (E.W * 0.9) / Math.max(1, measure(g, r.s, 84) / 84) * (bigsz / 84)); D.marker(g, r.s, E.W * x, y, { size: sz, t, start: lt, outline: 14, color: r.s === r.s.toUpperCase() && /\d/.test(r.s) && capIdx % 2 ? ui().accent : S().ink }); capIdx++; }
    else { const idx = (spec.say ?? [0])[sayIdx % (spec.say ?? [0]).length] ?? 0; const h = heads[idx]; sayIdx++; if (!h) continue; const lines = wrap(r.s, 26), w = Math.min(980, Math.max(...lines.map((l) => measure(g, l, 44))) + 90), hgt = 70 + lines.length * 56, bx = clamp(h.x, w / 2 + 40, E.W - w / 2 - 40), by = clamp(h.y - 130 - hgt / 2, hgt / 2 + 30, E.H - 300); D.bubble(g, bx, by, w, hgt, { tail: [h.x, h.y - 70], t, start: lt }, (g2) => lines.forEach((l, i) => text(g2, l, 0, (i - (lines.length - 1) / 2) * 56 + 4, { size: 44, font: FONTS.ui, weight: 900, color: S().ink }))); }
  }
}
function wrap(s, n) { const words = s.split(' '), out = []; let cur = ''; for (const w of words) { if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); } if (cur) out.push(cur); return out; }

// ---------- камера ----------
function camOf(spec, t, dur, info) {
  const m = spec.cam || 'push', u = ease.inOut(clamp(t / dur));
  const base = { push: { z: lerp(1, 1.11, u), x: lerp(0, -30, u) }, pull: { z: lerp(1.13, 1, u), x: lerp(-30, 10, u) }, left: { z: 1.06, x: lerp(80, -80, u) }, right: { z: 1.06, x: lerp(-80, 80, u) }, still: { z: 1, x: 0 }, up: { z: 1.02, y: lerp(120, -60, u) }, down: { z: 1.02, y: lerp(-80, 100, u) }, zoom: { z: lerp(1, 1.4, u), x: lerp(0, -100, u) } }[m] || { z: 1, x: 0 };
  let punch = 0, sh = 0;
  if (info) for (const r of TEXTS) { if (r.k === 'lbl' || r.t < info.shot.start - 0.02 || r.t >= info.shot.end - 0.05) continue; const d = t - (r.t - info.shot.start); if (d >= 0 && d < 1.2) { punch += (r.k === 'plate' ? 0.05 : 0.028) * Math.exp(-d * 6); sh += Math.sin(d * 70) * Math.exp(-d * 9) * (r.k === 'plate' ? 10 : 4); } }
  const b2 = { ...base, z: (base.z || 1) + punch, x: (base.x || 0) + sh };
  return camAdd(b2, drift(t, 5, 5));
}

// ---------- регистрация кадра ----------
export function def(id, spec) {
  registerShot(id, { draw(g, t, info) {
    const cam = camOf(spec, t, info.dur, info), wins = talkWins(spec, info);
    let ctx = { GY: E.H * 0.84, dur: info.dur };
    layer(g, cam, 0.9, (g) => { ctx = { ...ctx, ...set(spec.set || 'void', g, spec.so) }; });
    const heads = [];
    const lbls = TEXTS.filter((r) => r.k === 'lbl' && r.t >= info.shot.start - 0.02 && r.t < info.shot.end - 0.05).map((r) => ({ t: r.t - info.shot.start, s: r.s }));
    layer(g, cam, 1, (g) => {
      ctx.cam = cam;
      if (spec.pre) spec.pre(g, t, info, ctx);
      if (spec.kids) drawKids(g, t, spec, ctx.GY);
      (spec.chars || []).forEach((c, i) => { const o = who(g, c, t, info, ctx.GY, wins[i]); heads.push({ x: o.x, y: o.hy ?? o.y - 360, id: c.w, s: o.s, hidden: o.hidden }); });
      if (spec.close) closeUp(g, spec.close, t, spec.chars && spec.chars.length ? undefined : wins[0]);
      if (spec.mid) spec.mid(g, t, info, { ...ctx, heads });
      // полоски: { c: индекс героя | at:[x,y] в долях кадра, f: число или [[t,доля]], on, w, dy, lbl: true | строка | индексы lr }
      (spec.bars || []).forEach((b) => {
        const h = b.c != null ? heads[b.c] : null; if (h && h.hidden) return;
        const px = b.at ? b.at[0] * E.W : h.x + (b.dx ?? 0), py = b.at ? b.at[1] * E.H : h.y - (b.dy ?? 135 * (h.s ?? 1.5) / 1.5) + 22 + (b.lbl ? 36 : 0);
        const mine = b.lbl === true ? lbls : Array.isArray(b.lr) ? b.lr.map((i) => lbls[i]).filter(Boolean) : [];
        let label = typeof b.lbl === 'string' ? b.lbl : typeof b.label === 'string' ? b.label : null, la = b.on ?? 0, prev = null;
        for (const r of mine) if (t >= r.t) { prev = label; label = r.s; la = r.t; }
        if (typeof b.label === 'function') { const q = b.label(t); if (q) label = q.s, la = q.at ?? la, prev = q.prev ?? prev; }
        bar(g, px, py, kf(b.f ?? 1, t, 1), { w: b.w ?? 250, t, start: b.on ?? 0, label, labelAt: la, prevLabel: prev, glow: b.glow ? tl(b.glow, t) : false, style: b.style, s: b.s, labelBig: b.big, size: b.size });
      });
      if (spec.fx) spec.fx(g, t, info, ctx);
    });
    if (spec.top) spec.top(g, t, info, ctx);
    overlay(g, t, info, spec, heads.length ? heads : spec.close ? (() => { const c = spec.close, r = c.r ?? 330, cx = (c.x ?? 0.5) * E.W, cy = (c.y ?? 0.62) * E.H; return [{ x: cx - r * 0.55, y: cy - r * 1.62 + 110 }]; })() : [{ x: E.W / 2, y: E.H * 0.55 }]);
  } });
}
