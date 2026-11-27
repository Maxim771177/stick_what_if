// Надписи-стикеры по JSON сцены (экранные): hud, plate, cap, card, say, boom. Числа рисуются в мире (engine13.drawNum).
import { W, HT, FONT, clamp, lerp, sm, eo, back, prog, rr, outline, stext, burst, wrapText, toScreen, rnd } from "/hybrid13/engine13.js";

const CAPCOL = ['#ffd23f', '#19c8b3', '#ff7eb6', '#ff9c3a', '#9be15d', '#8ab6ff'];
const pop = (t, a, d = .3) => back(prog(t, a, a + d));
const LIFE = { cap: 2.9, card: 3.6, boom: 1.15, say: 3.4, plate: 4.6 };

export function textState(sc, t) {
  // живые тексты сцены: [{tx, age, k(0..1 появление), out(0..1 исчезновение)}]
  const live = []; const txs = sc.texts.filter((x) => x.k !== 'num');
  txs.forEach((tx, i) => {
    if (t < tx.t) return; let end = sc.end; const same = txs.filter((y, j) => j > i && y.k === tx.k); if (tx.k !== 'hud') { end = Math.min(sc.end, tx.t + LIFE[tx.k], same.length ? same[0].t + .05 : 1e9); if (tx.k === 'plate' && !same.length) end = Math.min(sc.end, tx.t + 5.5); }
    if (t > end + .02) return; live.push({ tx, i, age: t - tx.t, k: pop(t, tx.t, tx.k === 'boom' ? .22 : .32), out: 1 - sm(prog(t, end - .25, end)), end });
  });
  return live;
}

export function drawOverlays(c, k, sc, t) {
  const live = textState(sc, t), cm = k.cam; const hud = live.find((l) => l.tx.k === 'hud');
  const slotY = hud ? 285 : 150; let slotUsed = 0;
  c.setTransform(1, 0, 0, 1, 0, 0);
  // hud
  if (hud) { const l = hud, s = l.tx.s; const kk = l.k * l.out; c.save(); c.translate(52, 44); c.scale(kk, kk); c.font = `46px ${FONT}`; const w = c.measureText(s).width + 120; rr(c, 0, 0, w, 84, 22); c.lineWidth = 16; c.strokeStyle = '#fff'; c.stroke(); outline(c, '#10233f', 9);
    c.beginPath(); c.arc(46, 42, 24, 0, 7); outline(c, '#fff', 6); c.beginPath(); c.moveTo(46, 42); c.lineTo(46, 28); c.moveTo(46, 42); c.lineTo(58, 46); c.lineWidth = 6; c.strokeStyle = '#111'; c.stroke(); c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillStyle = '#ffd23f'; c.fillText(s, 86, 46); c.restore(); }
  // plate: слова выскакивают по очереди
  for (const l of live) if (l.tx.k === 'plate') {
    const s = l.tx.s, ws = s.split(' '), n = Math.max(1, Math.round(prog(l.age, 0, .7) * ws.length + .49)); const shown = ws.slice(0, n).join(' ');
    c.save(); const big = s.length > 30; let fs = big ? 96 : 84; c.font = `${fs}px ${FONT}`; const maxW = big ? 1450 : 1500; const lines = wrapText(c, s, maxW, fs, FONT); while (lines.length > 1 && !big) { fs -= 6; lines.splice(0, lines.length, ...wrapText(c, s, maxW, fs, FONT)); if (fs < 56) break; }
    c.font = `${fs}px ${FONT}`; const lw = Math.max(...lines.map((x) => c.measureText(x).width)), ph = lines.length * fs * 1.12 + 44, pw = lw + 110; const cy = big ? 330 : slotY + slotUsed * 0; const kk = l.k * l.out; c.translate(960, cy + ph / 2 - 40); c.rotate(-.012); c.scale(kk, kk);
    rr(c, -pw / 2, -ph / 2, pw, ph, 28); c.lineWidth = 20; c.strokeStyle = '#fff'; c.stroke(); outline(c, '#12213d', 10);
    // золотая полоска
    c.beginPath(); c.roundRect(-pw / 2 + 14, -ph / 2 + 12, pw - 28, 8, 4); c.fillStyle = '#ffd23f'; c.fill();
    // показанный текст по строкам
    let acc = 0; lines.forEach((ln, i) => { const lnw = ln.split(' ').length; const show = ws.slice(0, n).join(' '); const part = ws.slice(acc, acc + lnw).filter((_, j) => acc + j < n).join(' '); acc += lnw; if (part) { c.font = `${fs}px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = i === 0 && lines.length === 1 && /RULE|HOW IT/.test(s) ? '#ffd23f' : '#ffd23f'; c.lineJoin = 'round'; c.lineWidth = fs * .08; c.strokeStyle = '#000'; c.strokeText(part, 0, (i - (lines.length - 1) / 2) * fs * 1.12 + 6); c.fillText(part, 0, (i - (lines.length - 1) / 2) * fs * 1.12 + 6); } });
    c.restore(); slotUsed++;
  }
  // card
  for (const l of live) if (l.tx.k === 'card') {
    const s = l.tx.s; c.save(); const fs = 58; c.font = `${fs}px ${FONT}`; const lines = wrapText(c, s, 1250, fs, FONT); c.font = `${fs}px ${FONT}`; const lw = Math.max(...lines.map((x) => c.measureText(x).width)); const ph = lines.length * fs * 1.1 + 40, pw = lw + 100;
    const y0 = slotUsed ? slotY + 150 : slotY + 10; const kk = l.k * l.out; c.translate(960, y0 + ph / 2); c.rotate(.01); c.scale(kk, kk);
    rr(c, -pw / 2, -ph / 2, pw, ph, 20); c.lineWidth = 18; c.strokeStyle = '#fff'; c.stroke(); outline(c, '#fff8e0', 9); c.beginPath(); c.roundRect(-pw / 2 + 10, -ph / 2 + 10, 14, ph - 20, 6); c.fillStyle = '#e0242b'; c.fill();
    lines.forEach((ln, i) => stext(c, ln, 12, (i - (lines.length - 1) / 2) * fs * 1.1 + 3, fs, '#12213d', 0, 1, '#111', false)); c.restore(); slotUsed++;
  }
  // cap
  const caps = live.filter((l) => l.tx.k === 'cap'); caps.forEach((l, j) => {
    const s = l.tx.s, top = sc.capTop ?? (cm.z > 1.35); const kk = l.k * l.out; const col = CAPCOL[(l.i + sc.id.length) % CAPCOL.length]; c.save(); const fs = s.length > 22 ? 60 : 68; c.font = `${fs}px ${FONT}`; const w = Math.min(1700, c.measureText(s).width + 110);
    const cy = top ? (slotUsed ? slotY + 170 : slotY + 40) + (caps.length - 1 - j) * 0 : 992 - (caps.length - 1 - j) * 96; const cx = (sc.capX ?? 960); c.translate(cx, cy); c.rotate((rnd(l.i + 3) - .5) * .06); c.scale(kk, kk);
    rr(c, -w / 2, -48, w, 96, 26); c.lineWidth = 18; c.strokeStyle = '#fff'; c.stroke(); outline(c, col, 9); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#111'; c.font = `${fs}px ${FONT}`; c.fillText(s, 0, 4); c.restore();
  });
  // boom
  for (const l of live) if (l.tx.k === 'boom') {
    const [bx, by] = sc.boom || [1450, 360]; const kk = l.k * l.out; const s = l.tx.s; const cols = ['#ffd23f', '#ff6b3d', '#ff5fa2', '#3fdc9d']; const col = cols[l.i % 4]; const fs = s.length > 8 ? 70 : 92; const r = Math.max(170, s.length * 18 + 110);
    burst(c, bx, by, r, 10, col, -.15 + l.age * .12, kk); stext(c, s, bx, by, fs, '#fff', -.12, kk);
  }
  // say: облачко сбоку от головы говорящего
  for (const l of live) if (l.tx.k === 'say') {
    const ids = (l.tx.who || '').split(',').map((x) => x.trim()).filter(Boolean); const hs = ids.map((id) => k.heads[id]).filter(Boolean); if (!hs.length) continue;
    const mx = hs.reduce((a, h) => a + h.head[0], 0) / hs.length, my = hs.reduce((a, h) => a + h.head[1], 0) / hs.length; let [hx, hy] = toScreen(cm, mx, my);
    const s = l.tx.s; c.save(); const fs = 44; c.font = `${fs}px Arial Black,Impact,sans-serif`; const lines = wrapText(c, s, 600, fs); c.font = `${fs}px Arial Black,Impact,sans-serif`; const lw = Math.max(...lines.map((x) => c.measureText(x).width)); const bw = lw + 70, bh = lines.length * fs * 1.15 + 50;
    const side = sc.sayDir?.[ids[0]] ?? (hx < W / 2 ? 1 : -1); let bx = hx + side * (bw / 2 + 95 * cm.z), by = hy - bh / 2 - 60 * cm.z; bx = clamp(bx, bw / 2 + 24, W - bw / 2 - 24); by = clamp(by, bh / 2 + 24, HT - bh / 2 - 130);
    const kk = l.k * l.out; c.translate(bx, by); c.scale(kk, kk); const tipx = clamp(hx - bx, -bw / 2 + 40, bw / 2 - 40), tipX = hx - bx, tipY = hy - by + 10;
    // хвост
    c.beginPath(); c.moveTo(tipx - 26, bh / 2 - 6); c.lineTo(tipX * .94, tipY * .9); c.lineTo(tipx + 26, bh / 2 - 6); c.closePath(); c.lineWidth = 16; c.strokeStyle = '#fff'; c.lineJoin = 'round'; c.stroke(); outline(c, '#fff', 8);
    rr(c, -bw / 2, -bh / 2, bw, bh, 34); c.lineWidth = 16; c.strokeStyle = '#fff'; c.stroke(); outline(c, '#fff', 8); c.beginPath(); c.moveTo(tipx - 22, bh / 2 - 4); c.lineTo(tipx + 22, bh / 2 - 4); c.lineWidth = 12; c.strokeStyle = '#fff'; c.stroke();
    c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#111'; lines.forEach((ln, i) => c.fillText(ln, 0, (i - (lines.length - 1) / 2) * fs * 1.15 + 2)); c.restore();
  }
}
// моменты, когда нужен звук (поп стикера): для audio
export function popTimes(sc) { return sc.texts.map((t) => ({ t: t.t, k: t.k })); }
