// lib.js: общий каркас кадров ролика 01 (пак doodle:clean). Кадр = одна строка-описание def('s001', {...}).
// Поля: set, cam, chars[], fx(g,t,info,c) (поверх людей), pre(g,t,info,c) (до людей), close{...} (крупный план), ty (высота подписей).
// Тексты на экране берутся из story/texts.json (сделан из text_elements.md): время абсолютное, показывается само.
import { E, V, S, registerShot, mood, layer, blurLayer, ease, prog, lerp, clamp, FONTS, text, measure, shade, alpha } from '/engine/core.js';
import { drawCharacter, characterCloseUp, characterHead, POSES, posesAt, breathe, walkPose } from '/engine/characters.js';
import { camPath, drift, camAdd } from '/engine/motion.js';
import * as D from '/engine/doodle.js';
import { inkShape, inkCircle, inkRect, inkLine, inkTube, inkEllipse, inkBlob } from '/engine/ink.js';
import { loadImages, img, loadJSON, project } from '/engine/assets.js';

export { E, V, S, mood, ease, prog, lerp, clamp, FONTS, text, measure, shade, alpha, D, inkShape, inkCircle, inkRect, inkLine, inkTube, inkEllipse, inkBlob, POSES, walkPose, posesAt, breathe, drawCharacter };

const TEXTS = await loadJSON(project('story/texts.json'));
const IM = await loadImages({ idle: project('assets/chars/leon/idle.png'), walk: project('assets/chars/leon/walk.png'), happy: project('assets/chars/leon/happy.png'), surprised: project('assets/chars/leon/surprised.png'), worried: project('assets/chars/leon/worried.png'), determined: project('assets/chars/leon/determined.png') });

// ---------- палитра предметов (плоские цвета doodle) ----------
export const C = { wood: '#c98b4a', woodD: '#9a6a3a', board: '#3f6b57', paper: '#fffdf6', glass: '#cfe6f5', red: '#d8232a', gold: '#f6b93b', blue: '#3d7ea6', grey: '#b8b3a8', night: '#2e3a5c', green: '#7da55a', cream: '#f3e8d6' };
export const ui = () => S().ui;

// ---------- наряды (doodle) ----------
export const OUT = {
  LEON: { top: 'tshirt', color: '#d8232a', color2: '#ffffff', emblem: 'bolt', shorts: '#8a8a8a', shoes: '#f28a1e', sneakers: true, whiteHands: true, hair: 'none', hairColor: '#6b3a1e', hat: 'capBack', hatColor: '#17c3b2' },
  TEACHER: { top: 'suit', color: '#6b4e9b', hair: 'bun', face: 'glasses' },
  MOM: { top: 'dress', color: '#f29ac0', hair: 'ponytail', hairColor: '#6b3a1e' },
  NIA: { top: 'tshirt', color: '#f2c21a', hat: 'beanie', hatColor: '#f29ac0', kid: true },
  GRANDPA: { top: 'suit', color: '#8a6a45', hair: 'none', face: 'glasses' },
  FRIEND: { top: 'tshirt', color: '#3a6ea5', hair: 'spiky', hairColor: '#2b2420', kid: true },
  KID: { top: 'hoodie', color: '#3fb950', hair: 'short', kid: true },
  KIDBG: { top: 'tshirt', color: '#c9c3b4', hair: 'short', kid: true },
  LUNCHLADY: { top: 'dress', color: '#f2f2f2', hair: 'bun' },
  NEIGHBOR: { top: 'tshirt', color: '#d6872b', hair: 'short', hairColor: '#6b3a1e' },
  PSYCH: { top: 'labcoat', face: 'glasses', hair: 'none' },
  AVG: { top: 'none', hair: 'none' },
  GENIUS: { top: 'labcoat', hair: 'none', face: 'glasses' },
};
const SM = { LEON: 0.86, NIA: 0.9, FRIEND: 1.15, KID: 1.15, KIDBG: 1.1 };
const PUP = 1.5;     // масштаб куклы Leon относительно кодовой фигуры (подгонка по росту)


// ---------- рот Leon из эталона: закрашиваем нарисованный рот и рисуем свой, открывающийся под речь ----------
const MOUTH = { idle: { c: [370, 432], cv: [288, 400, 164, 68] }, happy: { c: [345, 415], cv: [266, 366, 160, 112] }, worried: { c: [350, 418], cv: [268, 381, 164, 80] }, determined: { c: [358, 420], cv: [280, 381, 156, 80] }, surprised: { c: [347, 410], cv: [298, 358, 100, 104] } };
const talkAmt = (t) => 0.2 + 0.8 * Math.abs(Math.sin(t * 13) * Math.sin(t * 4.7 + 1));
function mouthOverlay(g, key, t) {
  const m = MOUTH[key]; if (!m) return; const a = talkAmt(t);
  g.save(); g.fillStyle = '#ffffff'; g.fillRect(...m.cv);
  const [cx, cy] = m.c, rx = 40 + a * 8, ry = 7 + a * 30;
  g.lineWidth = 13; g.strokeStyle = '#111'; g.fillStyle = '#7a1f1f'; g.beginPath(); g.ellipse(cx, cy + ry * 0.2, rx, ry, 0, 0, Math.PI * 2); g.fill(); g.stroke();
  g.save(); g.beginPath(); g.ellipse(cx, cy + ry * 0.2, rx - 6, ry - 6, 0, 0, Math.PI * 2); g.clip(); g.fillStyle = '#ff9aa8'; g.beginPath(); g.ellipse(cx, cy + ry * 0.2 + ry * 0.75, rx * 0.7, ry * 0.7, 0, 0, Math.PI * 2); g.fill(); g.restore();
  g.restore();
}
const wordsOf = (s) => s.split(/\s+/).length;
export function talkWins(spec, info) {
  const T0 = info.shot.start, T1 = info.shot.end, out = {}; let k = 0;
  for (const r of TEXTS) { if (r.k !== 'say' || r.t < T0 - 0.02 || r.t >= T1 - 0.05) continue; const idx = (spec.say ?? [0])[k % (spec.say ?? [0]).length] ?? 0; k++; const a = r.t - T0, b = Math.min(info.dur, a + Math.max(1.0, wordsOf(r.s) * 0.34 + 0.3)); (out[idx] ||= []).push([a, b]); }
  return out;
}
const inWin = (w, t) => (w || []).some(([a, b]) => t >= a && t <= b);
const TALKSEQ = ['talk', 'explain', 'talk', 'point'];

const tl = (v, t) => (Array.isArray(v) && Array.isArray(v[0]) ? v.reduce((a, [tt, x]) => (t >= tt ? x : a), v[0][1]) : v);
const blinkAt = (t, k) => ((t + k) % (2.8 + (k % 1.3))) > 2.7 + (k % 1.3) * 0;
const SIT = (p) => p === 'sit' || p === 'sitBack';

// ---------- один персонаж ----------
export function who(g, c, t, info, GY, wins) {
  const id = c.w || 'KIDBG', f = c.f ?? 1, x = (c.x ?? 0.5) * E.W, y = GY + (c.dy ?? 0);
  let cx = x; let walking = false;
  if (c.walk) { const [x0, x1, t0, t1] = c.walk; const u = clamp((t - t0) / (t1 - t0)); cx = lerp(x0, x1, u) * E.W; walking = u > 0 && u < 1; }
  const pn = tl(c.pose || 'stand', t), expr = tl(c.expr || 'neutral', t);
  const s = (c.s ?? 1.55) * (SM[id] ?? 1);
  const talking = (c.talk && t >= c.talk[0] && t <= c.talk[1]) || inWin(wins, t);
  const ent = c.noin ? 1 : ease.outBack(prog(t, c.in ?? 0, (c.in ?? 0) + 0.5)), pop = 0.86 + 0.14 * ent;
  const o = { x: cx, y: y, s, facing: f, outfit: OUT[id], expr, blink: blinkAt(t, (c.x || 0) * 9 + id.length), talk: talking ? 0.5 + 0.5 * Math.sin(t * 22) : 0, look: c.look, prop: c.prop, alpha: c.a == null ? undefined : tl(c.a, t), rot: c.rot };
  if (c.fall) o.rot = c.fall * ease.in(clamp((t - 0) / 0.5));
  const usePup = id === 'LEON' && !c.code && !c.rot && !c.prop && ['neutral', 'smile', 'smirk', 'happy', 'joy'].includes(expr) && (walking || ['stand', 'relaxed', 'talk', 'explain', 'point'].includes(pn));
  if (usePup) {
    const im = walking ? IM.walk : IM.idle, k = s * PUP, h = 240 * k * 0.92, sc = h / im.height;
    const bob = walking ? Math.abs(Math.sin(t * 8)) * 8 : talking ? Math.abs(Math.sin(t * 9)) * 7 : Math.sin(t * 2.2) * 2;
    const sway = (talking ? Math.sin(t * 5) * 0.035 : Math.sin(t * 1.7) * 0.012) + (walking ? Math.sin(t * 8) * 0.03 : 0);
    D.contact?.(g, cx, y + 2, 40 * s);
    g.save(); g.translate(cx, y - bob); g.rotate(sway * f); g.scale(f * pop * (1 + (talking ? 0.012 * Math.sin(t * 9) : 0)), pop); g.scale(sc, sc); g.translate(-im.width / 2, -im.height * 0.995);
    g.drawImage(im, 0, 0); if (talking && !walking) mouthOverlay(g, 'idle', t);
    g.restore();
    o.pup = true; o.hy = y - 240 * k * 0.8;
    return o;
  }
  let pose;
  if (walking) pose = walkPose(t * 2 * Math.PI * 1.3);
  else if (c.poseObj) pose = c.poseObj;
  else if (talking && ['stand', 'relaxed', 'talk', 'explain'].includes(pn) && !SIT(pn)) pose = breathe(posesAt(t, Array.from({ length: 30 }, (_, i) => [i * 0.7, TALKSEQ[(i + id.length) % 4]])), t, 1, id.length + 2);
  else pose = breathe(posesAt(t, (Array.isArray(c.pose) ? c.pose : [[0, c.pose || 'stand']])), t, 1, id.length + 2);
  o.pose = pose;
  g.save(); g.translate(cx, y); g.scale(pop, pop); g.translate(-cx, -y);
  if (!c.nostool && (SIT(Array.isArray(c.pose) ? tl(c.pose, t) : c.pose) || SIT(pn))) {      // табурет под сидящим
    const hx = cx + pose.hip[0] * s * f, hy = y + (pose.hip[1] + 6) * s;
    inkRect(g, hx - 46 * s, hy, 92 * s, 14 * s, { fill: C.woodD, r: 4 });
    inkLine(g, [[hx - 36 * s, hy + 14 * s], [hx - 36 * s, y]], { w: 6 }); inkLine(g, [[hx + 36 * s, hy + 14 * s], [hx + 36 * s, y]], { w: 6 });
  }
  drawCharacter(g, o);
  g.restore();
  o.hy = characterHead(o)[1];
  return o;
}

// крупный план: Leon из эталона (лицо по эмоции), остальные кодом
const FACE = { happy: 'happy', joy: 'happy', smile: 'happy', surprised: 'surprised', shocked: 'surprised', awe: 'surprised', worried: 'worried', scared: 'worried', nervous: 'worried', sad: 'worried', confused: 'worried', cry: 'worried', neutral: 'determined', smirk: 'determined', determined: 'determined', angry: 'determined', thinking: 'determined', sleepy: 'determined' };
export function closeUp(g, c, t, wins) {
  const id = c.w || 'LEON', x = (c.x ?? 0.5) * E.W, y = (c.y ?? 0.62) * E.H, r = c.r ?? 330;
  if (id === 'LEON' && !c.code) { const key = FACE[tl(c.expr || 'smirk', t)] || 'determined', im = IM[key], sc = (r * 2.9) / im.height, tk = (c.talk && t >= c.talk[0] && t <= c.talk[1]) || inWin(wins, t); g.save(); g.translate(x, y + (tk ? Math.sin(t * 9) * 4 : 0)); g.rotate(tk ? Math.sin(t * 5) * 0.03 : 0); g.scale(sc, sc); g.translate(-im.width / 2, -im.height / 2); g.drawImage(im, 0, 0); if (tk) mouthOverlay(g, key, t); g.restore(); return; }
  characterCloseUp(g, x, y, r, { outfit: OUT[id], expr: tl(c.expr || 'neutral', t), blink: blinkAt(t, 1), talk: (c.talk && t >= c.talk[0] && t <= c.talk[1]) || inWin(wins, t) ? 0.5 + 0.5 * Math.sin(t * 22) : 0 });
}

// ---------- места ----------
const rect = (g, x, y, w, h, fill, o = {}) => inkRect(g, x, y, w, h, { fill, r: 4, ...o });
export const K = { rect, circ: (g, x, y, r, fill, o = {}) => inkCircle(g, x, y, r, { fill, ...o }), line: (g, pts, o = {}) => inkLine(g, pts, o), poly: (g, pts, fill, o = {}) => inkShape(g, pts, { fill, ...o }), W: () => E.W, H: () => E.H };
const win = (g, x, y, w, h, sky = C.glass, panes = 2) => { rect(g, x, y, w, h, sky); for (let i = 1; i < panes; i++) inkLine(g, [[x + (w * i) / panes, y], [x + (w * i) / panes, y + h]], { w: 6 }); inkLine(g, [[x, y + h / 2], [x + w, y + h / 2]], { w: 6 }); };
const floorLine = (g, GY) => inkLine(g, [[-E.W, GY], [E.W * 2, GY]], { w: 6, step: 40 });
const clock = (g, x, y, r, hh = 10, mm = 15) => { inkCircle(g, x, y, r, { fill: '#fff' }); for (let i = 0; i < 12; i++) { const a = (i / 12) * 6.283; inkLine(g, [[x + Math.sin(a) * r * 0.82, y - Math.cos(a) * r * 0.82], [x + Math.sin(a) * r * 0.94, y - Math.cos(a) * r * 0.94]], { w: 3 }); } const ha = ((hh % 12) + mm / 60) / 12 * 6.283, ma = mm / 60 * 6.283; inkLine(g, [[x, y], [x + Math.sin(ha) * r * 0.5, y - Math.cos(ha) * r * 0.5]], { w: 7 }); inkLine(g, [[x, y], [x + Math.sin(ma) * r * 0.78, y - Math.cos(ma) * r * 0.78]], { w: 5 }); };
export { clock, win, rect };

const SETS = {
  classroom(g, o) { const GY = E.H * 0.84; D.plain(g, '#f3e8d6'); g.fillStyle = '#c9a77c'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); win(g, 120, 150, 430, 400); rect(g, 746, 176, 788, 328, C.wood); rect(g, 760, 190, 760, 300, C.board); clock(g, 1680, 170, 56, 10, 15); return { GY }; },
  cafeteria(g) { const GY = E.H * 0.84; D.plain(g, '#f1e3c4'); g.fillStyle = '#d9c7a1'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); for (let i = 0; i < 3; i++) win(g, 160 + i * 520, 70, 340, 150, C.glass, 2); rect(g, 1180, GY - 250, 700, 250, '#b9c6cf'); rect(g, 1160, GY - 270, 740, 30, C.woodD); for (let i = 0; i < 4; i++) rect(g, 1230 + i * 160, GY - 330, 100, 60, '#e8e2d2'); return { GY }; },
  livingRoom(g) { const GY = E.H * 0.84; D.plain(g, '#efe0c8'); g.fillStyle = '#b98f62'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); win(g, 150, 160, 380, 380); rect(g, 1480, 140, 260, 320, '#fffdf6'); for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) inkRect(g, 1498 + c * 56, 180 + r * 66, 48, 54, { fill: '#fff', r: 2, w: 3 }); text(g, 'SUNDAYS', 1610, 168, { size: 28, font: FONTS.ui, weight: 900, color: S().ink }); rect(g, 1500, GY - 190, 250, 190, '#a35a3d'); rect(g, 1480, GY - 240, 290, 70, '#b96f4c'); return { GY }; },
  interiorWarm(g) { const GY = E.H * 0.84; D.plain(g, '#efd9b8'); g.fillStyle = '#c9a77c'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); win(g, 1330, 150, 400, 330, '#f6dcae'); rect(g, 130, GY - 300, 250, 300, C.woodD); for (let i = 0; i < 3; i++) rect(g, 150, GY - 280 + i * 90, 210, 70, C.wood); return { GY }; },
  interiorCool(g) { const GY = E.H * 0.84; D.plain(g, '#dce6ec'); g.fillStyle = '#a9b8c0'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); win(g, 1250, 140, 440, 360, '#e9f1f6'); rect(g, 1180, GY - 150, 600, 28, C.wood); inkLine(g, [[1220, GY - 122], [1220, GY]], { w: 10 }); inkLine(g, [[1740, GY - 122], [1740, GY]], { w: 10 }); return { GY }; },
  bedroom(g) { const GY = E.H * 0.84; D.plain(g, '#c9d3ec'); g.fillStyle = '#8b7a68'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); win(g, 140, 120, 360, 400, '#26314f'); inkCircle(g, 360, 230, 62, { fill: '#fff6c8' }); rect(g, 880, GY - 190, 820, 190, '#e4572e'); rect(g, 880, GY - 270, 130, 270, C.woodD); rect(g, 500, GY - 160, 280, 160, C.wood); inkLine(g, [[500, GY - 80], [780, GY - 80]], { w: 5 }); clock(g, 672, GY - 208, 38, 9, 0); return { GY }; },
  studyNight(g) { const GY = E.H * 0.84; D.plain(g, '#3a4466'); g.fillStyle = '#2f3550'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); rect(g, 720, 150, 940, 380, '#24324a'); rect(g, 160, GY - 190, 440, 30, C.woodD); inkLine(g, [[200, GY - 160], [200, GY]], { w: 10 }); inkLine(g, [[560, GY - 160], [560, GY]], { w: 10 }); rect(g, 280, GY - 224, 160, 34, '#fffdf6'); inkCircle(g, 380, GY - 300, 120, { fill: alpha('#f6d86a', 0.3), stroke: false }); rect(g, 560, GY - 300, 14, 110, C.woodD); inkCircle(g, 560, GY - 310, 28, { fill: '#f6d86a' }); return { GY }; },
  night(g) { const GY = E.H * 0.84; D.plain(g, '#2e3a5c'); inkCircle(g, 1320, 330, 190, { fill: '#fff6c8' }); inkCircle(g, 1260, 280, 40, { fill: '#e8dca0', w: 3 }); inkCircle(g, 1390, 400, 28, { fill: '#e8dca0', w: 3 }); g.fillStyle = '#26314f'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); rect(g, 150, 120, 420, 700, '#3a4466'); return { GY }; },
  street(g, o) { const GY = E.H * 0.8; D.plain(g, o?.dusk === false ? '#e3eef6' : '#f3cfa5'); g.fillStyle = '#c9c0ae'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); for (let x = 60; x < 1900; x += 150) { rect(g, x, GY - 170, 110, 170, '#a88b6b', { r: 2 }); inkLine(g, [[x + 55, GY - 170], [x + 55, GY]], { w: 3 }); } D.tree(g, 260, GY, 1.2); D.tree(g, 1650, GY, 1.4); rect(g, 1060, GY - 106, 460, 20, C.woodD); rect(g, 1080, GY - 215, 420, 16, C.woodD); inkLine(g, [[1100, GY - 215], [1100, GY - 106]], { w: 8 }); inkLine(g, [[1480, GY - 215], [1480, GY - 106]], { w: 8 }); inkLine(g, [[1100, GY - 86], [1100, GY]], { w: 10 }); inkLine(g, [[1480, GY - 86], [1480, GY]], { w: 10 }); return { GY }; },
  nbhd(g) { const GY = E.H * 0.82; D.plain(g, '#3b4a70'); g.fillStyle = '#4a4a3a'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); for (let i = 0; i < 5; i++) { const x = 40 + i * 390; rect(g, x, GY - 330, 330, 330, ['#c8a27c', '#b98a8a', '#9fb4a0', '#c8b27c', '#a0a8c8'][i]); inkShape(g, [[x - 20, GY - 330], [x + 165, GY - 450], [x + 350, GY - 330]], { fill: '#7a4a3a' }); rect(g, x + 40, GY - 250, 90, 90, '#f6d86a'); rect(g, x + 200, GY - 250, 90, 90, '#f6d86a'); rect(g, x + 140, GY - 130, 60, 130, C.woodD); inkCircle(g, x + 120, GY - 160, 10, { fill: '#fff3b0' }); } return { GY }; },
  pond(g, o) { const GY = E.H * 0.9; D.plain(g, '#e4eef4'); g.fillStyle = '#d3dcc9'; g.fillRect(-E.W, E.H * 0.34, E.W * 3, E.H); inkLine(g, [[-E.W, E.H * 0.34], [E.W * 2, E.H * 0.34]], { w: 5, step: 40 }); rect(g, 1380, 250, 300, 250, '#c8a27c'); inkShape(g, [[1350, 250], [1530, 140], [1710, 250]], { fill: '#7a4a3a' }); rect(g, 1430, 320, 70, 70, '#f6d86a'); [180, 700, 1260].forEach((x) => { inkLine(g, [[x, E.H * 0.34], [x, E.H * 0.2]], { w: 10 }); inkLine(g, [[x, E.H * 0.26], [x + 40, E.H * 0.2]], { w: 6 }); inkLine(g, [[x, E.H * 0.28], [x - 40, E.H * 0.22]], { w: 6 }); }); inkEllipse(g, E.W * 0.5, E.H * 0.66, 780, 250, { fill: '#e6f4fb' }); g.fillStyle = '#e9efe0'; g.fillRect(-E.W, E.H * 0.92, E.W * 3, E.H); inkLine(g, [[-E.W, E.H * 0.92], [E.W * 2, E.H * 0.92]], { w: 6, step: 40 }); return { GY: E.H * 0.97 }; },
  gym(g) { const GY = E.H * 0.82; D.plain(g, '#e8d9c0'); g.fillStyle = '#d6a566'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); [420, 1500].forEach((x) => { rect(g, x - 10, 120, 20, 130, C.grey); rect(g, x - 90, 240, 180, 110, '#fff'); inkEllipse(g, x, 370, 60, 14, { fill: '#e4572e' }); }); inkLine(g, [[0, GY + 90], [E.W, GY + 90]], { w: 5 }); rect(g, 700, GY - 70, 520, 24, C.woodD); return { GY }; },
  office(g) { const GY = E.H * 0.84; D.plain(g, '#d8c6a2'); g.fillStyle = '#a8855c'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); rect(g, 560, 150, 800, 340, C.board); rect(g, 1500, 120, 340, 400, '#eef3f6'); for (let i = 0; i < 6; i++) inkLine(g, [[1500, 160 + i * 60], [1840, 160 + i * 60]], { w: 5 }); rect(g, 120, GY - 190, 380, 30, C.woodD); inkLine(g, [[160, GY - 160], [160, GY]], { w: 10 }); inkLine(g, [[460, GY - 160], [460, GY]], { w: 10 }); return { GY }; },
  parking(g) { const GY = E.H * 0.78; D.plain(g, '#f6c98f'); rect(g, 140, GY - 420, 900, 420, '#d9d0c0', { r: 2 }); rect(g, 260, GY - 330, 340, 250, C.glass); text(g, 'MARKET', 590, GY - 380, { size: 64, font: FONTS.title, weight: 400, color: S().ink }); g.fillStyle = '#8a8a90'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); for (let x = 200; x < 1900; x += 260) inkLine(g, [[x, GY + 120], [x + 80, GY + 300]], { w: 8, stroke: '#fff' }); return { GY: GY + 70 }; },
  bus(g) { const GY = E.H * 0.84; D.plain(g, '#d9e4ea'); g.fillStyle = '#8b8f98'; g.fillRect(-E.W, GY, E.W * 3, E.H); floorLine(g, GY); for (let i = 0; i < 4; i++) win(g, 100 + i * 440, 150, 400, 300, '#cfe6f5', 1); inkLine(g, [[0, 120], [E.W, 120]], { w: 12 }); for (let i = 0; i < 5; i++) { inkLine(g, [[200 + i * 380, 120], [200 + i * 380, 300]], { w: 6 }); } return { GY }; },
  void(g) { const GY = E.H * 0.84; D.plain(g, '#fbf8f1'); g.strokeStyle = 'rgba(61,126,166,.10)'; g.lineWidth = 2; for (let x = 0; x <= E.W; x += 60) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke(); } for (let y = 0; y <= E.H; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke(); } return { GY }; },
  store(g) { D.plain(g, '#f1ead9'); g.strokeStyle = 'rgba(0,0,0,.07)'; g.lineWidth = 2; for (let x = 0; x <= E.W; x += 120) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke(); } for (let y = 0; y <= E.H; y += 120) { g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke(); } for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) rect(g, 160 + c * 440, 150 + r * 290, 300, 90, ['#e4572e', '#3d7ea6', '#7da55a', '#f6b93b'][(r + c) % 4], { r: 6 }); rect(g, 1500, 900, 380, 70, C.woodD); return { GY: E.H * 0.84 }; },
};
export const set = (name, g, o) => (SETS[name] || SETS.void)(g, o);

// ---------- кровать: Leon ЛЕЖИТ на подушке, укрыт одеялом, кепка на тумбочке ----------
export function bedScene(g, t, c, o = {}) {
  const GY = c.GY, x0 = 880, top = GY - 190, hx = x0 + 150, hy = top - 52, r = o.r || 72;
  // кепка на тумбочке (слева от часов)
  const cx = 548, cy = GY - 160;
  inkShape(g, [...Array.from({ length: 11 }, (_, i) => { const a = Math.PI * (1 + i / 10); return [cx + Math.cos(a) * 34, cy + Math.sin(a) * 34]; })], { fill: '#17c3b2', w: 4 });
  inkShape(g, [[cx - 32, cy - 4], [cx - 70, cy + 2], [cx - 60, cy + 12], [cx - 30, cy + 4]], { fill: '#10998c', w: 4 });
  inkRect(g, x0 + 20, top - 62, 260, 70, { fill: '#fff', r: 32 });                                  // подушка
  g.save(); g.translate(hx + 10, hy + Math.sin(t * 1.5) * 2); g.rotate(-Math.PI / 2 * 0.9); g.beginPath(); g.arc(0, 0, r * 1.2, 0, Math.PI * 2); g.clip();          // голова на подушке, лицом вверх
  characterCloseUp(g, 0, 0, r, { outfit: { ...OUT.LEON, hat: null, hair: 'short', hairColor: '#6b3a1e' }, expr: o.expr || 'sleepy', blink: o.expr === 'sleepy' ? 1 : blinkAt(t, 3), talk: 0 });
  g.restore();
  const k = 1 + 0.012 * Math.sin(t * 1.6);                                                              // дыхание одеяла
  inkShape(g, [[hx + 70, top - 4], [hx + 82, top - 62 * k], [hx + 260, top - 76 * k], [hx + 470, top - 70 * k], [hx + 640, top - 52 * k], [x0 + 800, top - 6]], { fill: '#6fa8dc', smooth: true });   // одеяло
  inkShape(g, [[hx + 70, top - 4], [hx + 82, top - 62 * k], [hx + 110, top - 64 * k], [hx + 104, top - 4]], { fill: '#e9f3fa', w: 4 });   // отворот
  for (let i = 0; i < 3; i++) inkLine(g, [[hx + 250 + i * 150, top - 60 * k], [hx + 262 + i * 150, top - 14]], { w: 3, stroke: '#4c86b5' });
}

// ---------- надписи ----------
function overlay(g, t, info, spec, heads) {
  const T0 = info.shot.start, T1 = info.shot.end, rows = (spec.nocap ? [] : TEXTS).filter((r) => r.t >= T0 - 0.02 && r.t < T1 - 0.05 && !(spec.skip || []).includes(r.s));
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
  const base = { push: { z: lerp(1, 1.11, u), x: lerp(0, -30, u) }, pull: { z: lerp(1.13, 1, u), x: lerp(-30, 10, u) }, left: { z: 1.06, x: lerp(80, -80, u) }, right: { z: 1.06, x: lerp(-80, 80, u) }, still: { z: 1, x: 0 }, up: { z: 1.02, y: lerp(120, -60, u) }, down: { z: 1.02, y: lerp(-80, 100, u) } }[m] || { z: 1, x: 0 };
  let punch = 0, sh = 0;
  if (info) for (const r of TEXTS) { if (r.t < info.shot.start - 0.02 || r.t >= info.shot.end - 0.05) continue; const d = t - (r.t - info.shot.start); if (d >= 0 && d < 1.2) { punch += (r.k === 'plate' ? 0.05 : 0.028) * Math.exp(-d * 6); sh += Math.sin(d * 70) * Math.exp(-d * 9) * (r.k === 'plate' ? 10 : 4); } }
  const b2 = { ...base, z: (base.z || 1) + punch, x: (base.x || 0) + sh };
  return camAdd(b2, drift(t, 5, 5));
}


// ---------- IQ-метки над головами (хук первых секунд): у всех обычные, у Leon золотая ----------
const IQV = { LEON: '9,999', TEACHER: '120', KIDBG: ['100', '95', '105', '98'], KID: '100', FRIEND: '110' };
function iqTag(g, t, x, y, id, i, start) {
  const k = ease.outBack(prog(t, start, start + 0.4)); if (k <= 0) return;
  const leon = id === 'LEON', v = Array.isArray(IQV[id]) ? IQV[id][i % IQV[id].length] : IQV[id]; if (!v) return;
  const pulse = leon ? 1 + 0.05 * Math.sin(t * 6) : 1, sz = leon ? 78 : 40, str = 'IQ ' + v;
  g.save(); g.translate(x, y); g.scale(k * pulse, k * pulse);
  const w = measure(g, str, sz) + (leon ? 70 : 44), h = sz * 1.5;
  if (leon) { for (let j = 0; j < 12; j++) { const a = j / 12 * 6.283 + t * 0.6; inkLine(g, [[Math.cos(a) * (w * 0.62), Math.sin(a) * (h * 0.9)], [Math.cos(a) * (w * 0.78), Math.sin(a) * (h * 1.15)]], { w: 6, stroke: ui().gold }); } }
  inkRect(g, -w / 2, -h / 2, w, h, { fill: leon ? ui().gold : '#ffffff', r: h / 2 });
  text(g, str, 0, sz * 0.18, { size: sz, font: FONTS.title, weight: 400, color: S().ink });
  g.restore();
}
function iqTitle(g, t, info) {
  const gt = info.globalT; if (gt > 3.4) return;
  const a = ease.out(prog(gt, 0.1, 0.5)) * (1 - ease.in(prog(gt, 2.9, 3.4))); g.save(); g.globalAlpha *= a;
  D.marker(g, 'WHAT IF YOU HAD', E.W / 2, 90, { size: 62, outline: 12 }); D.marker(g, 'AN IQ OF 9,999?', E.W / 2, 190, { size: 110, outline: 14, color: ui().accent }); g.restore();
}

// ---------- регистрация кадра ----------
export function def(id, spec) {
  registerShot(id, { draw(g, t, info) {
    const cam = camOf(spec, t, info.dur, info), wins = talkWins(spec, info);
    let ctx = { GY: E.H * 0.84, dur: info.dur };
    layer(g, cam, 0.9, (g) => { ctx = { ...ctx, ...set(spec.set || 'void', g, spec.so) }; });
    const heads = [];
    layer(g, cam, 1, (g) => {
      ctx.cam = cam;
      if (spec.pre) spec.pre(g, t, info, ctx);
      (spec.chars || []).forEach((c, i) => { const o = who(g, c, t, info, ctx.GY, wins[i]); heads.push({ x: o.x, y: o.hy ?? o.y - 360, id: c.w, s: o.s }); });
      if (spec.iq) { const cnt = {}; heads.forEach((h, i) => { cnt[h.id] = (cnt[h.id] || 0); iqTag(g, t, h.x, h.y - (h.id === 'LEON' ? 60 : 30) - 90 * h.s * 0.6, h.id, cnt[h.id]++, h.id === 'LEON' ? 0.15 : 0.45 + i * 0.1); }); }
      if (spec.close && spec.iq) iqTag(g, t, E.W * 0.5, E.H * 0.13, 'LEON', 0, 0.4);
      if (spec.close) closeUp(g, spec.close, t, spec.chars && spec.chars.length ? undefined : wins[0]);
      if (spec.fx) spec.fx(g, t, info, ctx);
    });
    if (spec.iq) iqTitle(g, t, info);
    overlay(g, t, info, spec, heads.length ? heads : [{ x: E.W / 2, y: E.H * 0.55 }]);
  } });
}
