// Куклы: рисование с белой вырубкой стикера, состояние актёра по времени сцены.
import { drawCharacter, POSES, posesAt, breathe, walkPose } from "/engine/characters.js";
import { W, H, mk, clamp, lerp, eio } from "/hybrid12/lib.js";
import { LEON, LEON_NC, HAZEL, IVY, POPPY, GIRLS, DUNN, wetOf } from "/hybrid12/heroes.js";
// дополнительные позы
POSES.vote = { ...POSES.stand, eB: [-24, -204], hB: [-28, -298] };               // дальняя рука вверх (лицо открыто)
POSES.voteLow = { ...POSES.stand, eB: [-20, -178], hB: [-40, -222] };
POSES.hang = { ...POSES.stand, head: [-4, -206], sh: [-4, -172], eF: [8, -232], hF: [10, -304], eB: [-16, -232], hB: [-16, -304], kF: [12, -52], fF: [20, -14], kB: [-8, -52], fB: [-18, -22] };
POSES.pull = { ...POSES.stand, head: [30, -190], sh: [22, -160], eF: [52, -130], hF: [84, -112], eB: [44, -128], hB: [76, -106], kF: [34, -52], fF: [42, 0], kB: [-14, -50], fB: [-34, 0] };
POSES.hold = { ...POSES.stand, eF: [24, -146], hF: [40, -130], eB: [14, -144], hB: [32, -128] };
POSES.bagHold = { ...POSES.stand, eF: [14, -128], hF: [20, -92], eB: [-7, -136], hB: [-9, -100] };
POSES.hug = { ...POSES.stand, head: [8, -205], eF: [30, -150], hF: [14, -150], eB: [26, -148], hB: [4, -146] };
POSES.hands2 = { ...POSES.stand, eF: [22, -158], hF: [38, -172], eB: [16, -156], hB: [30, -168] };
POSES.armsUp = { ...POSES.stand, eF: [20, -210], hF: [26, -292], eB: [-14, -208], hB: [-20, -290] };
POSES.sleep = { ...POSES.lie };
POSES.swim = { ...POSES.dive };
POSES.salute = { ...POSES.stand, eF: [24, -190], hF: [40, -226] };
POSES.sitHug = { ...POSES.sit };
POSES.knock = { ...POSES.stand, eF: [34, -168], hF: [60, -170], eB: [30, -160], hB: [56, -156] };
POSES.crawl = { head: [60, -80], sh: [44, -70], hip: [-30, -62], eF: [64, -40], hF: [74, 0], eB: [30, -38], hB: [38, 0], kF: [-4, -36], fF: [8, 0], kB: [-44, -34], fB: [-60, 0] };
POSES.tow = { ...POSES.pull };
POSES.pointUpF = { ...POSES.stand, eF: [46, -172], hF: [88, -246] };
POSES.sitG = { head: [5, -128], sh: [4, -94], hip: [0, -22], eF: [20, -60], hF: [44, -32], eB: [10, -60], hB: [30, -30], kF: [52, -36], fF: [100, 0], kB: [44, -30], fB: [90, 0] };
export { POSES };
export const OUT = { LEON, LEON_NC, LEON_W: wetOf(LEON), LEON_NCW: wetOf(LEON_NC), H: HAZEL, I: IVY, P: POPPY, D: DUNN };
GIRLS.forEach((g, i) => OUT['G' + (i + 1)] = g);
const FW = 900, FH = 900, OX = 450, OY = 700;
const figC = mk(FW, FH), fx = figC.getContext('2d'), silC = mk(FW, FH), sx = silC.getContext('2d');
const blinkAt = (t, k) => ((t + k) % (2.8 + (k % 1.3))) > 2.7;
// отрисовка одной куклы; o: {oid,x,y,s,face,pose,expr,rot,alpha,ol(оутлайн),look,prop,t,blink}
export function drawFig(c, o) {
  const of = OUT[o.oid] || OUT.G1, s = o.s;
  const hw = Math.min(OX - 4, 200 * s + 40), up = Math.min(OY - 4, 330 * s + 50), dn = Math.min(FH - OY - 4, 70 * s + 30);
  const rx = OX - hw, ry = OY - up, rw = 2 * hw, rh = up + dn;
  fx.setTransform(1, 0, 0, 1, 0, 0); fx.clearRect(rx, ry, rw, rh); fx.save(); fx.translate(OX, OY);
  drawCharacter(fx, { x: 0, y: 0, s, facing: o.face, pose: o.pose, outfit: of, expr: o.expr || 'neutral', blink: o.blink, talk: o.talk || 0, look: o.look || [o.face * .6, 0], rot: o.rot, shadow: false, prop: o.prop });
  fx.restore();
  c.save(); c.translate(o.x, o.y); c.translate(-OX, -OY); c.globalAlpha *= o.alpha ?? 1;
  if (o.ol !== false) {
    sx.setTransform(1, 0, 0, 1, 0, 0); sx.globalCompositeOperation = 'source-over'; sx.clearRect(rx, ry, rw, rh); sx.drawImage(figC, rx, ry, rw, rh, rx, ry, rw, rh);
    sx.globalCompositeOperation = 'source-in'; sx.fillStyle = '#fff'; sx.fillRect(rx, ry, rw, rh); sx.globalCompositeOperation = 'source-over';
    const R = 8; for (let i = 0; i < 8; i++) { const a = i / 8 * 6.283; c.drawImage(silC, rx, ry, rw, rh, rx + Math.cos(a) * R, ry + Math.sin(a) * R, rw, rh); }
  }
  c.drawImage(figC, rx, ry, rw, rh, rx, ry, rw, rh); c.restore();
}
const P = (n) => typeof n === 'string' ? (POSES[n] || POSES.stand) : n;
const seqVal = (keys, u, def) => { if (!keys) return def; if (!Array.isArray(keys)) return keys; let v = keys[0][1]; for (const [t, x] of keys) { if (u >= t) v = x; else break; } return v; };
// состояние актёра: a = {x, y, f, go:[[u0,u1,x1,y1?]...], lin, run, s}
export function actorState(a, u) {
  let cx = a.x, cy = a.y || 0, dist = 0, face = a.f ?? 1, walking = false;
  if (a.go) for (const g of a.go) {
    const [u0, u1, x1, y1 = cy] = g; if (u < u0) break;
    const kk = clamp((u - u0) / ((u1 - u0) || 1)), k = a.lin ? kk : eio(kk);
    const nx = lerp(cx, x1, k), ny = lerp(cy, y1, k); dist += Math.abs(nx - cx) + Math.abs(ny - cy) * .5;
    if (u < u1) { walking = true; face = Math.abs(x1 - cx) < 1 ? (a.f ?? 1) : (x1 - cx >= 0 ? 1 : -1); }
    cx = nx; cy = ny;
  }
  const step = (a.run ? 92 : 60) * (a.s || 1);
  return { x: cx, y: cy, face, walking, ph: dist / step * Math.PI };
}
export const walk = (ph, run) => walkPose(ph, run ? { run: true } : { stride: 30 });
export { breathe, posesAt, blinkAt, P, seqVal };
