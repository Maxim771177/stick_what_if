// Сцена ролика 12: камера, три плана, актёры, предметы, тексты, звук-события. Рендер: window.draw(t).
import { POSES, posesAt, breathe, walkPose } from "/engine/characters.js";
import { E, setStyle } from "/engine/core.js";
import { loadPack } from "/engine/stylepack.js";
import { W, H, FONT, mk, clamp, lerp, sm, eo, back, prog, rnd, rr, outline, stext, burst, dots } from "/hybrid12/lib.js";
import { drawFig, blinkAt, OUT } from "/hybrid12/fig.js";
import { K, PR, boat, INK, poly, circ, line, wob } from "/hybrid12/kit.js";
import { placeOf, planView, TONES } from "/hybrid12/places.js";
import { ICON } from "/hybrid12/icons.js";
import { SC } from "/hybrid12/scenes.js";
let _ready; window.fontsReady = new Promise(r => _ready = r);
Object.assign(E, { W, H, PX: 1, fps: 60, cfg: {}, words: [], shots: [] }); await loadPack("doodle"); setStyle("clean");
const DATA = await (await fetch('/data/сцены.json')).json(); const SCN = DATA.scenes; const END = DATA.duration;
const BASE = 1.25, NSUB = +(new URLSearchParams(location.search).get('nsub') || 3);
const cv = document.getElementById('c'), C = cv.getContext('2d'), sc = mk(W, H), sx = sc.getContext('2d'), layerF = mk(W, H), layerN = mk(W, H);
// ---------- события из данных ----------
const num = s => parseFloat(String(s).replace(/[^0-9.]/g, ''));
const HUDEV = [], APPR = [];
for (const s of SCN) for (const t of s.texts) { if (t.k === 'hud') HUDEV.push({ t: t.t, s: t.s, id: s.id }); if (t.k === 'plate' && /^APPROVAL/.test(t.s)) APPR.push({ t: t.t, v: num(t.s) }); }
const sceneIdx = t => { let i = 0; while (i < SCN.length - 1 && t >= SCN[i + 1].start) i++; return i; };
// ---------- актёры ----------
const poseOf = (a, u, t, seed) => {
  const v = a.p ?? 'stand'; if (Array.isArray(v) && Array.isArray(v[0])) { return posesAt(u, v.map(([tt, n]) => [tt, typeof n === 'string' ? (POSES[n] || POSES.stand) : n]), a.bl ?? .3); }
  return typeof v === 'string' ? (POSES[v] || POSES.stand) : v;
};
function actState(a, u, t, i) {
  const scale = BASE * (OUT[a.oid]?.s || 1) * (a.s || 1); let x = K(a.x, u), y = K(a.y, u, 0), face = K(a.f, u, 1), walking = false, dist = 0;
  if (a.go) { let cx = K(a.x, 0), cy = K(a.y, 0, 0); for (const g of a.go) { const [u0, u1, x1, y1 = cy] = g; if (u < u0) break; const kk = clamp((u - u0) / ((u1 - u0) || 1)), k = a.lin ? kk : sm(kk); const nx = lerp(cx, x1, k), ny = lerp(cy, y1, k); dist += Math.abs(nx - cx) + Math.abs(ny - cy) * .5; if (Math.abs(x1 - cx) > 1) face = x1 > cx ? 1 : -1; if (u < u1) walking = true; cx = nx; cy = ny; } x = cx; y = cy; }
  let pose; if (walking && !a.nowalk) { const ph = dist / ((a.run ? 92 : 60) * scale) * Math.PI; pose = walkPose(ph, a.run ? { run: true } : { stride: 30 }); } else { pose = poseOf(a, u, t, i); if (!/hang|lie|sleep/.test(String(a.p))) pose = breathe(pose, t, .8, i * 1.7 + 1); }
  return { x, y, scale, face, pose, walking };
}
// ---------- рендер кадра ----------
let HEADS = [], CURSC = null;
const scr = (c, x, y) => { const M = c.getTransform(); return [M.a * x + M.c * y + M.e, M.b * x + M.d * y + M.f, Math.hypot(M.a, M.b)]; };
function evalProp(p, u) { const o = {}; for (const k in p) o[k] = (k === 'k' || k === 't' || k === 'att' || k === 'liq') ? p[k] : (k === 'ob' || k === 'fr' || k === 'glow') ? p[k] : K(p[k], u, 0); return o; }
function renderScene(t) {
  const i = sceneIdx(t), sd = SCN[i], n = i + 1, S = SC[n] || { pl: sd.place }; CURSC = { sd, S, n }; const u = Math.max(0, t - sd.start), dur = sd.end - sd.start; HEADS = [];
  const PL = placeOf(S.pl || sd.place, S), T = PL.T;
  // камера
  let cm; { const cs = S.c || [200, -250, 1.15], num3 = a => a.length === 3 && typeof a[0] === 'number';
    if (num3(cs)) cm = { x: cs[0], y: cs[1], z: cs[2], r: 0 }; else if (Array.isArray(cs[0]) && cs[0].length === 3) { const k = sm(u / dur); cm = { x: lerp(cs[0][0], cs[1][0], k), y: lerp(cs[0][1], cs[1][1], k), z: lerp(cs[0][2], cs[1][2], k), r: 0 }; } else { let j = 0; while (j < cs.length - 2 && u > cs[j + 1][0]) j++; const a = cs[j], b = cs[j + 1] || cs[j], k = sm(clamp((u - a[0]) / ((b[0] - a[0]) || 1))); cm = { x: lerp(a[1], b[1], k), y: lerp(a[2], b[2], k), z: lerp(a[3], b[3], k), r: lerp(a[4] || 0, b[4] || 0, k) }; }
    if (!(Array.isArray(cs[0]) && cs[0].length >= 3)) { const tx = sd.camera || '', k = sm(u / dur); const z = /наезд|ближе|к лицу/.test(tx) ? 1 + .13 * k : /отъезд|отъезжа/.test(tx) ? 1.13 - .13 * k : 1; cm.z *= z; if (/вправо/.test(tx) && /пролёт|панорам|идёт|слежен/.test(tx)) cm.x += (k - .5) * 320; if (/влево/.test(tx) && /пролёт|панорам|идёт|слежен/.test(tx)) cm.x -= (k - .5) * 320; if (/вверх/.test(tx)) cm.y -= k * 40; if (/крен/.test(tx)) cm.r = -.03 + .02 * Math.sin(u); }
    cm.x += Math.sin(t * .7) * 10; cm.y += Math.cos(t * .55) * 7; }
  let shk = 0; for (const x of sd.texts) if (x.k === 'boom') { const d = u - (x.t - sd.start); if (d > 0 && d < .5) shk += 16 * (1 - d / .5) * Math.sin(d * 70); }
  const cc = { x: cm.x + (shk ? Math.sin(t * 90) * shk * .25 : 0), y: cm.y + (shk ? Math.cos(t * 80) * shk * .22 : 0), z: cm.z * (1 + shk * .0014), r: cm.r };
  const wt = (c, par) => { c.setTransform(1, 0, 0, 1, 0, 0); c.translate(W / 2, H / 2); c.rotate(cc.r * (par > 1 ? 1.15 : 1)); c.scale(cc.z, cc.z); c.translate(-cc.x * par, -cc.y); };
  // дальний
  const f = layerF.getContext('2d'); f.setTransform(1, 0, 0, 1, 0, 0); f.clearRect(0, 0, W, H); wt(f, .35); PL.far && PL.far(f, u);
  sx.setTransform(1, 0, 0, 1, 0, 0); sx.fillStyle = T.sky[1]; sx.fillRect(0, 0, W, H); sx.filter = 'blur(3px)'; sx.drawImage(layerF, 0, 0); sx.filter = 'none';
  wt(sx, 1); const c = sx;
  const props = (S.pr || []).flat().filter(p => p && (p.a0 === undefined || u >= p.a0) && (p.a1 === undefined || u < p.a1)); const ST = {};
  const acts = (S.act || []).flat().filter(a => a && (a.a0 === undefined || u >= a.a0) && (a.a1 === undefined || u < a.a1));
  const sts = acts.map((a, k) => ({ a, st: actState(a, u, t, k), k })); sts.forEach(o => ST[o.a.oid] = o.st);
  const dpU = (fr, glow, under) => props.forEach(p => { if (!!p.under !== !!under) return; });
  if (props.some(p => p.under)) { const sv = props; props.forEach(p => { if (p.under) { const q = evalProp(p, u); PR[p.k] && PR[p.k](c, q, u); } }); }
  if (S.pl === 'TIDEL' || sd.place === 'TIDEL') { planView(c, u, S, T); } else PL.mid && PL.mid(c, u);
  if (S.icon && ICON[S.icon]) ICON[S.icon](c, u, S, sd);
  // лодка/катер
  const bt = S.boat ? { x: K(S.boat.x, u), y: K(S.boat.y, u, -120), s: K(S.boat.s, u, 1), tilt: K(S.boat.tilt, u, 0), smoke: S.boat.smoke, rail: S.boat.rail } : null;
  const drawProps = (fr, glow, under) => props.forEach(p => { if (!!p.fr !== fr || !!p.glow !== glow || !!p.under !== !!under) return; const q = evalProp(p, u); if (p.att && (p.at0 === undefined || u >= p.at0)) { const [id, j] = p.att.split('.'), st = ST[id]; if (st) { const jp = st.pose[j]; q.x = st.x + st.face * jp[0] * st.scale + (q.dx || 0) + (p.k === 'bag' ? 18 * st.face : 0); q.y = st.y + jp[1] * st.scale + (q.dy || 0) + (p.k === 'bag' ? 60 : 0); } }
    const g = () => PR[p.k] && PR[p.k](c, q, u); if (p.ob && bt) { c.save(); c.translate(bt.x, bt.y); c.scale(bt.s, bt.s); c.rotate(bt.tilt); g(); c.restore(); } else g(); });
  drawProps(false, false);
  if (bt) { boat(c, bt, u); }
  // актёры
  sts.sort((p, q) => (!!p.a.ob - !!q.a.ob) || ((p.a.z ?? K(p.a.y, u, 0)) - (q.a.z ?? K(q.a.y, u, 0))) || p.k - q.k).forEach(({ a, st, k }) => {
    const draw = () => { const look = a.lk ? K(a.lk, u, [0, 0]) : [st.face * .6, 0]; drawFig(c, { oid: a.oid, x: st.x, y: st.y, s: st.scale, face: st.face, pose: st.pose, expr: ({ happy: 'smile', joy: 'smile', cry: 'sad' })[K(a.e, u, 'neutral')] || K(a.e, u, 'neutral'), blink: blinkAt(t, k * 1.3 + 1), look, rot: K(a.rot, u, 0), alpha: K(a.al, u, 1), prop: a.pr, ol: a.ol, talk: (a.tk && u >= a.tk[0] && u <= a.tk[1]) ? (Math.sin(t * 14) * .5 + .5) : 0 });
      const hd = st.pose.head, h = scr(c, st.x + st.face * hd[0] * st.scale, st.y + hd[1] * st.scale), ft = scr(c, st.x, st.y); HEADS.push({ oid: a.oid, hx: h[0], hy: h[1], r: 40 * st.scale * h[2], fx: ft[0], fy: ft[1], z: h[2], lying: /lie|sleep/.test(String(a.p)) || !!a.rot, ob: !!a.ob }); };
    if (a.ob && bt) { c.save(); c.translate(bt.x, bt.y); c.scale(bt.s, bt.s); c.rotate(bt.tilt); draw(); c.restore(); } else draw(); });
  if (((n >= 25 && n <= 81) || (n >= 94 && n <= 126)) && !S.nobag && !props.some(p => p.k === 'bag') && (ST.LEON_NC || ST.LEON_NCW) && !sts.some(o => /^LEON/.test(o.a.oid) && (o.a.rot || /lie|crawl|sit|sleep|fall|hug|jump/.test(JSON.stringify(o.a.p)))) && (S.pl || sd.place) !== 'VOID') props.push({ k: 'bag', att: (ST.LEON_NC ? 'LEON_NC' : 'LEON_NCW') + '.hB', fr: true, glow: false, s: 1.1, dx: -10 });
  drawProps(true, false);
  if (S.fgx) S.fgx(c, u, ST);
  // стикеры мира (вода у кормы и т. п.)
  // ближний план
  const nL = layerN.getContext('2d'); nL.setTransform(1, 0, 0, 1, 0, 0); nL.clearRect(0, 0, W, H); wt(nL, 1.45); PL.near && PL.near(nL, u);
  sx.setTransform(1, 0, 0, 1, 0, 0); sx.filter = 'blur(6px)'; sx.drawImage(layerN, 0, 0); sx.filter = 'none';
  // тон ночи
  if (T.tint) { sx.setTransform(1, 0, 0, 1, 0, 0); sx.globalCompositeOperation = 'multiply'; sx.fillStyle = T.tint; sx.fillRect(0, 0, W, H); sx.globalCompositeOperation = 'source-over'; wt(sx, 1); drawProps(false, true); drawProps(true, true); }
  else { wt(sx, 1); drawProps(false, true); drawProps(true, true); }
  sx.setTransform(1, 0, 0, 1, 0, 0);
  if (T.fogK || (S.fx || []).includes('fog')) { const g = sx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, `rgba(235,240,245,${(T.fogK || .4) * .35})`); g.addColorStop(.5, `rgba(235,240,245,${(T.fogK || .4) * .5})`); g.addColorStop(1, `rgba(235,240,245,${(T.fogK || .4) * .25})`); sx.fillStyle = g; sx.fillRect(0, 0, W, H); }
  if (T.rain || (S.fx || []).includes('rain')) { sx.strokeStyle = 'rgba(210,225,245,.75)'; sx.lineWidth = 3; sx.beginPath(); for (let q = 0; q < 170; q++) { const x = (rnd(q) * (W + 400) + t * 700 * (.8 + rnd(q + 9) * .4) * 0 - 200 + (t * 900 * (.8 + rnd(q + 3) * .4)) * .0) , y = ((rnd(q + 50) * H * 1.3 + t * 1500 * (.8 + rnd(q + 7) * .5)) % (H + 200)) - 100; sx.moveTo(x + y * .18, y); sx.lineTo(x + y * .18 - 22, y + 64); } sx.stroke(); }
  if (S.dark) { const dk = K(S.dark, u, 0); const gd = sx.createLinearGradient(0, 0, 0, H * .75); gd.addColorStop(0, `rgba(25,30,60,${dk})`); gd.addColorStop(1, `rgba(25,30,60,${dk * .3})`); sx.fillStyle = gd; sx.fillRect(0, 0, W, H); }
  const g2 = sx.createRadialGradient(W / 2, H / 2, H * .5, W / 2, H / 2, H * .98); g2.addColorStop(0, 'rgba(0,0,0,0)'); g2.addColorStop(1, 'rgba(0,0,0,.26)'); sx.fillStyle = g2; sx.fillRect(0, 0, W, H);
}
// ---------- тексты и HUD (экранные) ----------
const FNT = (s) => `${s}px ${FONT}`;
function wrap(c, txt, maxW) { const w = txt.split(' '), L = []; let cur = ''; for (const x of w) { const tt = cur ? cur + ' ' + x : x; if (c.measureText(tt).width > maxW && cur) { L.push(cur); cur = x; } else cur = tt; } if (cur) L.push(cur); return L; }
const hit = (a, b) => !(a.x1 < b.x0 || a.x0 > b.x1 || a.y1 < b.y0 || a.y0 > b.y1);
function overlays(c, t) {
  const { sd, S, n } = CURSC, u = t - sd.start; c.setTransform(1, 0, 0, 1, 0, 0);
  const avoid = HEADS.map(h => ({ x0: h.hx - h.r * 1.4, x1: h.hx + h.r * 1.4, y0: h.hy - h.r * 1.5, y1: Math.max(h.hy + h.r * 1.5, Math.min(h.fy, h.hy + h.r * 7)) }));
  const isVoid = (S.pl || sd.place) === 'VOID';
  // HUD
  const hv = [...HUDEV].filter(x => x.t <= t).pop(); let hudR = null;
  if (hv && !S.nohud && t < 525.3) { const w = 380, x = W - 40 - w, y = 36, d = t - hv.t, pk = d < .5 ? 1 + .12 * Math.sin(d / .5 * Math.PI) : 1; c.save(); c.translate(x + w / 2, y + 48); c.scale(pk, pk); c.beginPath(); rr(c, -w / 2, -48, w, 96, 18); c.lineWidth = 16; c.strokeStyle = '#fff'; c.stroke(); outline(c, '#0d1b17', 8);
    c.font = FNT(62); c.textAlign = 'center'; c.textBaseline = 'middle'; c.shadowColor = '#38ff9c'; c.shadowBlur = 12; c.fillStyle = '#6bffb4'; c.fillText(hv.s, 22, 4); c.shadowBlur = 0; // песочные часы
    c.fillStyle = '#ffd23f'; c.beginPath(); c.moveTo(-w / 2 + 26, -26); c.lineTo(-w / 2 + 62, -26); c.lineTo(-w / 2 + 44, 0); c.lineTo(-w / 2 + 62, 26); c.lineTo(-w / 2 + 26, 26); c.lineTo(-w / 2 + 44, 0); c.closePath(); c.fill(); c.lineWidth = 4; c.strokeStyle = '#fff'; c.stroke(); c.restore(); hudR = { x0: x - 10, x1: x + w + 10, y0: y - 10, y1: y + 110 }; avoid.push(hudR); }
  if (S.apr !== undefined) { c.save(); approval(c, { s: 'APPROVAL ' + S.apr + ' %', t: 0 }, 99, -9, null, null); c.restore(); c.setTransform(1, 0, 0, 1, 0, 0); }
  const placed = [];
  const place = (w, h, cand) => { for (const [cx, cy] of cand) { const r = { x0: cx - w / 2, x1: cx + w / 2, y0: cy - h / 2, y1: cy + h / 2 }; if (r.x0 < 24 || r.x1 > W - 24 || r.y0 < 20 || r.y1 > H - 20) continue; if ([...avoid, ...placed].some(a => hit(a, r))) continue; placed.push(r); return [cx, cy]; }
    const [cx, cy] = cand[cand.length - 1]; placed.push({ x0: cx - w / 2, x1: cx + w / 2, y0: cy - h / 2, y1: cy + h / 2 }); return [cx, cy]; };
  const CANDS = [[W * .27, 150], [W * .5, 150], [W * .27, 940], [W * .5, 940], [W * .73, 940], [W * .73, 250], [W * .27, 300], [W * .5, 330], [W * .73, 460]];
  let bi = 0;
  for (const x of sd.texts) { const tt = x.t - sd.start; if (u < tt) continue; const k = back(prog(u, tt, tt + .28)); if (k <= .01) continue; const d = u - tt;
    c.save();
    if (x.k === 'cap') { c.font = FNT(isVoid ? 78 : 70); const w = c.measureText(x.s).width + 70, h = 108; const [cx, cy] = place(w * 1.02, h * 1.1, isVoid ? [[W / 2, H * .78], [W / 2, H * .7]] : CANDS); c.translate(cx, cy); c.rotate(-.025); c.scale(k, k); c.beginPath(); rr(c, -w / 2, -h / 2, w, h, 24); c.lineWidth = 20; c.strokeStyle = '#fff'; c.lineJoin = 'round'; c.stroke(); outline(c, '#ffd23f', 9); c.fillStyle = INK; c.font = FNT(isVoid ? 78 : 70); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(x.s, 0, 5); }
    else if (x.k === 'plate') { if (/^APPROVAL/.test(x.s)) { approval(c, x, u, tt, place, avoid); } else { const big = isVoid ? 118 : 84; c.font = FNT(big); const lines = wrap(c, x.s, isVoid ? 1500 : 1200), w = Math.max(...lines.map(l => c.measureText(l).width)) + 90, h = lines.length * big * 1.05 + 40; const [cx, cy] = place(w, h, isVoid ? [[W / 2, 200 + h / 2 - 60], [W / 2, 190]] : CANDS); c.translate(cx, cy); c.scale(k, k); c.rotate(.012); c.beginPath(); rr(c, -w / 2, -h / 2, w, h, 26); c.lineWidth = 22; c.strokeStyle = '#fff'; c.stroke(); outline(c, '#fff4c8', 10); c.fillStyle = INK; c.font = FNT(big); c.textAlign = 'center'; c.textBaseline = 'middle'; lines.forEach((l, q) => c.fillText(l, 0, (q - (lines.length - 1) / 2) * big * 1.05 + 4)); } }
    else if (x.k === 'card') { c.font = FNT(66); const lines = wrap(c, x.s, 1000), w = Math.max(...lines.map(l => c.measureText(l).width)) + 100, h = lines.length * 70 + 60; const [cx, cy] = place(w, h, isVoid ? [[W / 2, H * .78]] : CANDS); c.translate(cx, cy); c.rotate(-.02); c.scale(k, k); c.beginPath(); rr(c, -w / 2, -h / 2, w, h, 12); c.lineWidth = 18; c.strokeStyle = '#fff'; c.stroke(); outline(c, '#f6ecd0', 9); circ(c, 0, -h / 2 + 4, 14, '#e0242b', 5); c.fillStyle = '#1b2b4b'; c.font = FNT(66); c.textAlign = 'center'; c.textBaseline = 'middle'; lines.forEach((l, q) => c.fillText(l, 0, (q - (lines.length - 1) / 2) * 70 + 10)); }
    else if (x.k === 'say') { const sayIdx = sd.texts.filter(q => q.k === 'say').indexOf(x); const spk = Array.isArray(S.sp) ? S.sp[sayIdx] : S.sp; c.font = FNT(58); const lines = wrap(c, '“' + x.s + '”', 1180), w = Math.max(...lines.map(l => c.measureText(l).width)) + 80, h = lines.length * 64 + 44; const sp = HEADS.find(h2 => h2.oid === (spk || '')) || HEADS.find(h2 => !/^LEON/.test(h2.oid)) || HEADS[0]; const cy0 = (sp && sp.hy < H * .5) ? H - 40 - h / 2 - 20 : 40 + h / 2 + 20 + (hudR && hudR.x0 < W / 2 + w / 2 ? 0 : 0); const cx0 = clamp(sp ? sp.hx : W / 2, w / 2 + 30, W - w / 2 - 30);
      const [cx, cy] = place(w, h, [[cx0, cy0], [W / 2, cy0], [W / 2, cy0 < H / 2 ? H - 120 : 120]]); c.translate(cx, cy); c.scale(k, k); c.beginPath(); rr(c, -w / 2, -h / 2, w, h, 40); c.lineWidth = 20; c.strokeStyle = '#fff'; c.stroke(); outline(c, '#fff', 9);
      if (sp) { const tx = clamp((sp.hx - cx) / k, -w / 2 + 60, w / 2 - 60), up = cy > sp.hy ? -1 : 1; c.beginPath(); c.moveTo(tx - 28, up * (h / 2 - 3)); c.lineTo(clamp((sp.hx - cx), -w / 2 + 40, w / 2 - 40) * .5 + tx * .5, up * (h / 2 + 46)); c.lineTo(tx + 28, up * (h / 2 - 3)); c.fillStyle = '#fff'; c.fill(); c.lineWidth = 9; c.strokeStyle = INK; c.stroke(); c.beginPath(); c.moveTo(tx - 24, up * (h / 2 - 4)); c.lineTo(tx + 24, up * (h / 2 - 4)); c.lineWidth = 14; c.strokeStyle = '#fff'; c.stroke(); }
      c.fillStyle = INK; c.font = FNT(58); c.textAlign = 'center'; c.textBaseline = 'middle'; lines.forEach((l, q) => c.fillText(l, 0, (q - (lines.length - 1) / 2) * 64 + 4)); }
    else if (x.k === 'boom') { if (d > 1.2) { c.restore(); continue; } const kk = k * (1 - sm(prog(d, .9, 1.2))); const big = x.s.length < 4 ? 190 : 100, rad = x.s.length < 4 ? 190 : 250; bi++; const [cx, cy] = place(rad * 2.2, rad * 1.6, [[W * .5, 230], [W * .3, 230], [W * .7, 260], [W * .5, 700], [W * .25, 700], [W * .75, 700], [W * .5, 330]]); c.translate(cx, cy); c.rotate(-.12 + d * .08); burst(c, 0, 0, (x.s.length < 4 ? 190 : 250), 11, ['#ff6b3d', '#ffd23f', '#ff5fa2'][bi % 3], 0, kk); stext(c, x.s, 0, 0, big, '#fff', -.06, kk); }
    c.restore(); }
}
function approval(c, x, u, tt, place, avoid) {
  const v1 = num(x.s), prev = [...APPR].filter(a => a.t < x.t).pop(), v0 = prev ? prev.v : 0, vv = lerp(v0, v1, sm(prog(u, tt + .1, tt + .7))); const w = 620, h = 150, cx = 60 + w / 2, cy = H - 70 - h / 2;
  c.translate(cx, cy); c.beginPath(); rr(c, -w / 2, -h / 2, w, h, 24); c.lineWidth = 18; c.strokeStyle = '#fff'; c.stroke(); outline(c, '#1b2b4b', 9); c.fillStyle = '#fff'; c.font = FNT(40); c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('APPROVAL', -w / 2 + 28, -h / 2 + 34);
  c.textAlign = 'right'; c.font = FNT(66); c.fillStyle = vv > 50 ? '#6bffb4' : vv > 10 ? '#ffd23f' : '#ff7b6b'; c.fillText(Math.round(vv) + ' %', w / 2 - 28, -h / 2 + 40); c.beginPath(); rr(c, -w / 2 + 28, 14, w - 56, 36, 12); c.fillStyle = '#0d1b17'; c.fill(); c.lineWidth = 5; c.strokeStyle = '#fff'; c.stroke(); if (vv > 0.5) { c.beginPath(); rr(c, -w / 2 + 28, 14, Math.max(14, (w - 56) * vv / 100), 36, 12); c.fillStyle = vv > 50 ? '#38ff9c' : vv > 10 ? '#ffd23f' : '#ff5a4a'; c.fill(); }
}
// ---------- сборка ----------
window.sceneAt = t => sceneIdx(t) + 1; window.SCN = SCN; window.END = END;
window.draw = function (tOut, nsub = NSUB) { const SH = .5 / 30; E.t = tOut; C.setTransform(1, 0, 0, 1, 0, 0); C.globalAlpha = 1;
  for (let i = 0; i < nsub; i++) { const tt = Math.min(END - .01, Math.max(0, tOut + (nsub > 1 ? (i / (nsub - 1) - .5) * SH : 0))); renderScene(tt); C.globalAlpha = 1 / (i + 1); C.drawImage(sc, 0, 0); } C.globalAlpha = 1; overlays(C, tOut > END - .01 ? END - .01 : tOut); return true; };
// проверка героя в кадре
window.check = function (tOut) { renderScene(tOut); const { sd, S, n } = CURSC, errs = []; if (S.cut) return errs;
  for (const h of HEADS) { if (!/^LEON/.test(h.oid) || h.lying) continue; const top = h.hy - h.r * 1.55, feet = h.fy; if (top < 8) errs.push(`S${String(n).padStart(3, '0')} t=${tOut.toFixed(1)} голова/кепка за верхом кадра (${top | 0})`); if (feet > H - 6) errs.push(`S${String(n).padStart(3, '0')} t=${tOut.toFixed(1)} ступни за низом кадра (${feet | 0})`); if (h.hx < 30 || h.hx > W - 30) errs.push(`S${String(n).padStart(3, '0')} t=${tOut.toFixed(1)} герой у края по x (${h.hx | 0})`); }
  return errs; };
window.sheet = function (items, cols = 4, cw = 480, ch = 270) { const rows = Math.ceil(items.length / cols), sh = mk(cols * cw, rows * (ch + 26)), g = sh.getContext('2d'); g.fillStyle = '#000'; g.fillRect(0, 0, sh.width, sh.height);
  items.forEach(([t, lab], i) => { window.draw(t, 2); const x = (i % cols) * cw, y = Math.floor(i / cols) * (ch + 26); g.drawImage(cv, x, y + 26, cw, ch); g.fillStyle = '#ffd23f'; g.font = 'bold 20px Arial'; g.fillText(lab, x + 6, y + 20); }); return sh.toDataURL('image/jpeg', .85); };
document.fonts.ready.then(() => _ready(true));
