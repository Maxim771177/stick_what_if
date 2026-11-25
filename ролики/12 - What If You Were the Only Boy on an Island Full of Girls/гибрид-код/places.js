// Места: дальний (far), средний (mid, земля y=0, герои стоят на ней) и ближний (near) планы.
import { W, H, FONT, clamp, lerp, sm, rnd, rr, outline, dots, stext } from "/hybrid12/lib.js";
import { PR, poly, circ, ell, line, boat, wob, INK } from "/hybrid12/kit.js";
export const TONES = {
  day: { sky: ['#46b9ee', '#bfeaff'], sea: '#3fa8dc', seaFar: '#5ab8e8', sand: '#f2d9a0', tint: null },
  fog: { sky: ['#a9b9c6', '#e3e9ee'], sea: '#7fa0b8', seaFar: '#a9bfce', sand: '#e2d2b0', tint: null, fogK: .55 },
  dawn: { sky: ['#e9b3a6', '#f7e9d2'], sea: '#7c9db5', seaFar: '#a9bccb', sand: '#d8cdb8', tint: null, fogK: .6 },
  night: { sky: ['#101a3c', '#2c4274'], sea: '#1d3a6b', seaFar: '#25467c', sand: '#e0c890', tint: '#6f80c0' },
  storm: { sky: ['#141a2e', '#33405c'], sea: '#1b3463', seaFar: '#243f6e', sand: '#d8c088', tint: '#6877b3', rain: 1 },
  dusk: { sky: ['#6a5aa8', '#f7b07a'], sea: '#4a78a8', seaFar: '#8a88b8', sand: '#f2d9a0', tint: '#f0c4a8' },
  morning: { sky: ['#6fc8f0', '#e6f6ff'], sea: '#3fa8dc', seaFar: '#5ab8e8', sand: '#f2d9a0', tint: null },
};
const sky = (c, T, hor = -330) => { const g = c.createLinearGradient(0, -2000, 0, hor); g.addColorStop(0, T.sky[0]); g.addColorStop(1, T.sky[1]); c.fillStyle = g; c.fillRect(-4600, -2000, 9200, 2000 + hor + 700); c.fillStyle = T.seaFar; c.fillRect(-4600, hor, 9200, 1400); line(c, [[-4600, hor], [4600, hor]], 6, 'rgba(17,17,17,.5)'); };
const clouds = (c, u, T, y = -980) => { if (T === TONES.night || T === TONES.storm) { for (let i = 0; i < 40; i++) { const x = (rnd(i) * 7000 - 3500), yy = y - 300 + rnd(i + 90) * 700; c.fillStyle = 'rgba(255,255,255,.85)'; c.beginPath(); c.arc(x, yy, 3 + rnd(i + 5) * 4, 0, 7); c.fill(); } if (T === TONES.storm) { PR.cloud(c, { x: -1200, y: y + 80, s: 2, col: '#4a5470' }, u); PR.cloud(c, { x: 400, y: y + 20, s: 2.4, col: '#3e4660' }, u); PR.cloud(c, { x: 1700, y: y + 100, s: 2, col: '#4a5470' }, u); } return; }
  PR.cloud(c, { x: -1500, y: y, s: 1.1 }, u); PR.cloud(c, { x: -200, y: y - 180, s: 1.5 }, u); PR.cloud(c, { x: 1400, y: y + 40, s: 1.2 }, u); PR.cloud(c, { x: 2800, y: y - 100, s: 1.3 }, u); };
const sandG = (c, x0, x1, T, y1 = 900) => { c.beginPath(); c.rect(x0, 0, x1 - x0, y1); c.fillStyle = T.sand; c.fill(); dots(c, x0, 0, x1 - x0, y1, 'rgba(190,140,60,.35)', 28, 5, (x, y) => clamp(1 - y / 800 + .2)); line(c, [[x0, 0], [x1, 0]], 10); };
const waterG = (c, u, x0, x1, T, topY = 0) => { c.beginPath(); c.moveTo(x0, topY); for (let x = x0; x <= x1; x += 80) c.lineTo(x, topY + wob(u, 7, .4, x * .01)); c.lineTo(x1, 1200); c.lineTo(x0, 1200); c.closePath(); c.fillStyle = T.sea; c.fill(); line(c, (() => { const a = []; for (let x = x0; x <= x1; x += 80) a.push([x, topY + wob(u, 7, .4, x * .01)]); return a; })(), 9);
  c.save(); c.beginPath(); c.rect(x0, topY, x1 - x0, 1200); c.clip(); c.strokeStyle = 'rgba(255,255,255,.55)'; c.lineWidth = 6; c.lineCap = 'round'; for (let i = 0; i < 26; i++) { const x = x0 + ((i * 331 + u * 40 * (1 + i % 3 * .3)) % (x1 - x0)), y = topY + 50 + (i * 97) % 700; c.beginPath(); c.moveTo(x, y); c.quadraticCurveTo(x + 40, y - 14, x + 80, y); c.stroke(); } c.restore(); };
const jungle = (c, u, x0, x1, T) => { for (let x = x0; x < x1; x += 190) { const h = 250 + rnd(x) * 260; ell(c, x, -h * .45, 130 + rnd(x + 3) * 60, h * .6, ['#2f8a45', '#3a9a52', '#27753b'][Math.floor(rnd(x + 9) * 3)], 9); }
  for (let x = x0 + 80; x < x1; x += 520) PR.palm(c, { x, y: 0, s: .9 + rnd(x + 4) * .5, f: rnd(x) > .5 ? 1 : -1 }, u); };
const beachWorld = (S, T) => ({
  far(c, u) { sky(c, T); clouds(c, u, T); if (T !== TONES.night && T !== TONES.storm) { c.beginPath(); c.moveTo(900, -330); c.quadraticCurveTo(1200, -520, 1500, -330); c.closePath(); outline(c, '#4aa56a', 9); PR.palm(c, { x: 1190, y: -420, s: .35 }, u); } },
  mid(c, u) { const edge = K_(S.tide, u, -900); sandG(c, -4200, 4200, T); waterG(c, u, -4200, edge, T, -4); PR.foam(c, { x: edge + 30, y: 4, w: 220 }, u);
    jungle(c, u, 1900, 4000, T); if (!S.nowrack) PR.seaweed(c, { x: -560, y: 0 }); if (!S.nologs) { PR.log(c, { x: 1350, y: 0 }); PR.log(c, { x: 1700, y: 6, len: 380 }); PR.log(c, { x: 1000, y: 4, len: 300 }); }
    if (!S.notents) { PR.tent(c, { x: 120, y: 0, col: '#e8a23a' }); PR.tent(c, { x: 360, y: 0, col: '#4aa6d8', flag: '#ffd23f' }); PR.tent(c, { x: 600, y: 0, col: '#e87aa8' }); PR.tent(c, { x: 840, y: 0, col: '#7ac85a' }); } },
  near(c, u) { for (let i = 0; i < 4; i++) { const x = -1500 + i * 1100 + wob(u, 20, .2, i); c.save(); c.translate(x, 0); for (let k = 0; k < 5; k++) { c.save(); c.rotate(-1.35 + k * .35 + wob(u, .04, .3, k)); c.beginPath(); c.moveTo(0, 0); c.quadraticCurveTo(80, -50, 210, 10); c.quadraticCurveTo(100, -10, 0, 12); c.closePath(); outline(c, '#2f8a45', 8); c.restore(); } c.restore(); } },
});
import { K } from "/hybrid12/kit.js"; const K_ = (v, u, d) => K(v, u, d);
const boyCamp = (S, T) => ({
  far: beachWorld(S, T).far,
  mid(c, u) { const edge = K_(S.tide, u, -1200); sandG(c, -4200, 4200, T); waterG(c, u, -4200, edge, T, -4); PR.foam(c, { x: edge + 30, y: 4, w: 220 }, u); jungle(c, u, 1400, 4000, T);
    PR.rock(c, { x: 300, y: 0, s: 1.5 }); if (!S.nopalm) PR.palm(c, { x: 1000, y: 0, s: 1.1 }, u); },
  near: beachWorld(S, T).near,
});
const seaWorld = (S, T, far) => ({
  far(c, u) { sky(c, T, -300); clouds(c, u, T, -900); far && far(c, u); },
  mid(c, u) { const y0 = S.wy ?? 20; waterG(c, u, -4200, 4200, T, y0); },
  near(c, u) { if (T.fogK) { for (let i = 0; i < 4; i++) { c.fillStyle = `rgba(235,240,245,${.28})`; c.beginPath(); c.ellipse(-1500 + i * 1100 + wob(u, 80, .08, i), -60, 600, 120, 0, 0, 7); c.fill(); } } },
});
const voidWorld = (S) => ({
  far(c, u) { const col = S.col || '#ffe08a'; c.fillStyle = col; c.fillRect(-4600, -3000, 9200, 6000); c.save(); c.translate(0, -200); c.rotate(u * .04); c.fillStyle = 'rgba(255,255,255,.28)'; for (let i = 0; i < 16; i++) { c.rotate(Math.PI * 2 / 16); c.beginPath(); c.moveTo(0, 0); c.lineTo(2400, -170); c.lineTo(2400, 170); c.closePath(); if (i % 2) c.fill(); } c.restore(); dots(c, -4600, -1500, 9200, 3000, 'rgba(0,0,0,.07)', 36, 7, () => 1); },
  mid(c, u) { c.beginPath(); c.ellipse(0, 20, 760, 70, 0, 0, 7); c.fillStyle = 'rgba(0,0,0,.18)'; c.fill(); },
  near(c, u) { },
});
const rocksN = (S, T) => ({
  far(c, u) { sky(c, T, -250); clouds(c, u, T, -900); // лагерь внизу
    for (let i = 0; i < 6; i++) { PR.tent(c, { x: -700 + i * 120, y: 270, s: .3, col: ['#e8a23a', '#4aa6d8', '#e87aa8'][i % 3] }); circ(c, -700 + i * 120, 190, 7, '#ffd23f', 0); }
    c.beginPath(); c.rect(-4600, 270, 5400, 1200); c.fillStyle = TONES.night.sand; c.fill(); },
  mid(c, u) { c.beginPath(); c.moveTo(-4600, 520); c.lineTo(-300, 520); c.lineTo(-250, 120); c.lineTo(-180, 0); c.lineTo(4600, 0); c.lineTo(4600, 1400); c.lineTo(-4600, 1400); c.closePath(); outline(c, '#5f5f6c', 10); dots(c, -300, 0, 4900, 800, 'rgba(0,0,0,.18)', 24, 5, () => 1);
    PR.rock(c, { x: 900, y: 0, s: 1.7, col: '#6a6a76' }); PR.rock(c, { x: -2400, y: 520, s: 1.5, col: '#6a6a76' }); },
  near(c, u) { },
});
const dawnWorld = (S, T) => ({
  far(c, u) { sky(c, T, -300); clouds(c, u, T, -900); },
  mid(c, u) { waterG(c, u, 760, 4600, T, 14); c.beginPath(); c.moveTo(-4600, 0); c.lineTo(700, 0); c.lineTo(790, 40); c.lineTo(790, 1400); c.lineTo(-4600, 1400); c.closePath(); outline(c, '#2a2a33', 10); dots(c, -4000, 0, 4700, 700, 'rgba(120,140,190,.25)', 26, 5, () => 1);
    c.beginPath(); c.rect(-1400, -800, 1700, 800); c.fillStyle = '#23232c'; c.fill(); dots(c, -1400, -800, 1700, 800, 'rgba(120,140,190,.18)', 30, 5, () => 1); line(c, [[-1400, -800], [-1400, 0]], 9); line(c, [[300, -800], [300, 0]], 9);
    S.sos && S.sos(c, u); },
  near(c, u) { for (let i = 0; i < 4; i++) { c.fillStyle = 'rgba(235,240,245,.34)'; c.beginPath(); c.ellipse(-1500 + i * 1100 + wob(u, 100, .06, i), -80, 700, 140, 0, 0, 7); c.fill(); } },
});
const chanWorld = (S, T) => ({
  far(c, u) { sky(c, T, -300); clouds(c, u, T, -900); // островок с водопадом справа
    c.beginPath(); c.moveTo(150, -300); c.quadraticCurveTo(550, -640, 1150, -300); c.closePath(); outline(c, '#4aa56a', 9); c.fillStyle = '#9fe0ff'; c.fillRect(620, -560, 40, 250); line(c, [[620, -560], [620, -310]], 5); line(c, [[660, -560], [660, -310]], 5); PR.palm(c, { x: 380, y: -360, s: .3 }, u); },
  mid(c, u) { waterG(c, u, -4200, 4200, T, 20); sandG(c, -4200, -760, T); c.beginPath(); c.rect(-4200, -10, 3440, 40); c.fillStyle = T.sand; c.fill(); PR.foam(c, { x: -740, y: 16, w: 200 }, u);
    // бурун: полосы пены вправо
    c.strokeStyle = 'rgba(255,255,255,.8)'; c.lineWidth = 8; c.lineCap = 'round'; for (let i = 0; i < 16; i++) { const x = -600 + ((i * 260 + u * 260) % 3600), y = 70 + (i % 4) * 36; c.beginPath(); c.moveTo(x, y); c.lineTo(x + 130, y + 2); c.stroke(); }
    PR.rock(c, { x: -1500, y: 0, s: .8 }); },
  near(c, u) { },
});
const boatWorld = (S, T) => ({
  far(c, u) { sky(c, T, -300); clouds(c, u, T, -900); // причал вдали справа
    c.fillStyle = '#8a6a44'; c.fillRect(700, -330, 2000, 50); for (let x = 740; x < 2600; x += 160) line(c, [[x, -280], [x, -180]], 10, '#5e3b1c');
    for (let i = 0; i < 12; i++) { const x = 900 + i * 70; ell(c, x, -420, 17, 17, '#2a2a33', 0); poly(c, [[x - 20, -400], [x + 20, -400], [x + 16, -330], [x - 16, -330]], '#2a2a33', 0); } },
  mid: seaWorld(S, T).mid, near: seaWorld(S, T).near,
});
export function placeOf(name, S) {
  const T = TONES[S.tone || ({ DECK: 'fog', SEA: 'fog', BEACH: 'day', BOYCAMP: 'day', TIDEL: 'day', CAMPN: 'night', CAMP_N: 'storm', CHAN: 'day', ROCKS_N: 'storm', DAWN: 'dawn', BOAT: 'morning', VOID: 'day' }[name])];
  const w = ({ BEACH: beachWorld, CAMPN: beachWorld, CAMP_N: beachWorld, BOYCAMP: boyCamp, DECK: (s, t) => seaWorld(s, t), SEA: (s, t) => seaWorld(s, t), CHAN: chanWorld, ROCKS_N: rocksN, DAWN: dawnWorld, BOAT: boatWorld, VOID: voidWorld, TIDEL: beachWorld }[name])(S, T);
  return { T, ...w };
}
// план пляжа сверху (TIDEL)
export function planView(c, u, S, T) {
  c.fillStyle = '#2f8a45'; c.fillRect(-1300, -800, 2600, 360); for (let i = 0; i < 14; i++) { ell(c, -1180 + i * 180, -560 + (i % 2) * 40, 100, 80, ['#3a9a52', '#27753b'][i % 2], 8); }
  c.fillStyle = T.sand; c.fillRect(-1300, -450, 2600, 800); dots(c, -1300, -450, 2600, 800, 'rgba(190,140,60,.3)', 30, 5, () => 1); line(c, [[-1300, -450], [1300, -450]], 9);
  c.fillStyle = T.sea; c.beginPath(); c.moveTo(-1300, 250); for (let x = -1300; x <= 1300; x += 80) c.lineTo(x, 250 + wob(u, 10, .4, x * .01)); c.lineTo(1300, 700); c.lineTo(-1300, 700); c.closePath(); c.fill(); line(c, (() => { const a = []; for (let x = -1300; x <= 1300; x += 80) a.push([x, 250 + wob(u, 10, .4, x * .01)]); return a; })(), 9);
  if (S.wrackOn !== false) for (let i = 0; i < 22; i++) { const x = -1100 + i * 100; ell(c, x, 140 + Math.sin(i * .5) * 18 - (i > 15 ? (i - 15) * 6 : 0), 40, 16, ['#3a5a2a', '#6a4a28', '#4a6a30'][i % 3], 5, (i % 3 - 1) * .3); }
  if (S.logsOn !== false) for (let i = 0; i < 7; i++) { const x = -900 + i * 300; c.save(); c.translate(x, -345 + Math.abs(i - 3) * 14); c.rotate((i - 3) * .09); c.beginPath(); rr(c, -110, -22, 220, 44, 20); outline(c, '#8a5a2e', 8); ell(c, 108, 0, 12, 22, '#c89a60', 6); c.restore(); }
  for (let i = 0; i < 7; i++) { const x = -800 + i * 260, y = -120 + (i % 2) * 70; poly(c, [[x - 70, y + 50], [x, y - 70], [x + 70, y + 50]], ['#e8a23a', '#4aa6d8', '#e87aa8', '#7ac85a'][i % 4], 7); }
}
