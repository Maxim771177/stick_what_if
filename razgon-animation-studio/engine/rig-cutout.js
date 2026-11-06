// engine/rig-cutout.js — character family "cutout": puppets made of image parts (PNG / SVG), for detailed cartoon looks
// that code can't draw: AI-generated or hand-drawn characters, cut into parts once and animated forever.
//
// A puppet is a folder with images + rig.json (see references/assets.md; tools/puppet.py makes and checks it).
//   import { loadPuppet } from '/engine/rig-cutout.js';  import { project } from '/engine/assets.js';
//   const RAY = await loadPuppet(project('assets/ray/rig.json'));
//   drawCharacter(g, { puppet: RAY, x, y, s, facing, pose, expr, talk, blink, sprite, alpha })
//
// mode "parts": every body part is an image bound to a bone of the shared skeleton (sh, hip, head, eF/hF, eB/hB, kF/fF, kB/fB),
//   so posesAt / posesSpring / walkPose / breathe drive it exactly like the code-drawn families.
// mode "sprites": whole-body images per pose or emotion (idle, point, angry …), with breathing, bob, squash and mouth swaps.
// Faces: optional eye and mouth overlay images swapped by expression, blink and talk (lip flap).
import { E } from './core.js';
import { POSES } from './skeleton.js';
import { loadImage, loadJSON } from './assets.js';
import { contact } from './ink.js';

const ORDER = ['armUpperB', 'armLowerB', 'handB', 'legUpperB', 'legLowerB', 'footB', 'torso', 'legUpperF', 'legLowerF', 'footF', 'head', '@face', 'armUpperF', 'armLowerF', 'handF'];
const DEFAULT_BONES = { torso: ['sh', 'hip'], head: ['sh', 'head'], armUpperF: ['sh', 'eF'], armLowerF: ['eF', 'hF'], handF: ['eF', 'hF', 'end'], armUpperB: ['sh', 'eB'], armLowerB: ['eB', 'hB'], handB: ['eB', 'hB', 'end'], legUpperF: ['hip', 'kF'], legLowerF: ['kF', 'fF'], footF: ['kF', 'fF', 'end'], legUpperB: ['hip', 'kB'], legLowerB: ['kB', 'fB'], footB: ['kB', 'fB', 'end'] };
const EXPR = { neutral: ['open', 'closed'], smile: ['open', 'smile'], happy: ['happy', 'smile'], joy: ['happy', 'smile'], surprised: ['wide', 'o'], shocked: ['wide', 'o'], awe: ['wide', 'o'], scared: ['wide', 'o'], worried: ['sad', 'frown'], sad: ['sad', 'frown'], cry: ['sad', 'frown'], angry: ['angry', 'frown'], determined: ['angry', 'closed'], smirk: ['open', 'smile'], sleepy: ['closed', 'closed'], thinking: ['open', 'closed'], confused: ['open', 'frown'], nervous: ['sad', 'closed'] };
const RIG_H = 236;   // skeleton units from the soles to the crown

export async function loadPuppet(url) {
  const m = await loadJSON(url), base = url.replace(/[^/]+$/, ''), files = new Set();
  for (const p of Object.values(m.parts || {})) files.add(p.file);
  for (const s of Object.values(m.sprites || {})) files.add(s.file);
  for (const set of [m.face?.eyes, m.face?.mouth]) for (const f of Object.values(set || {})) files.add(f);
  const images = {}; await Promise.all([...files].filter(Boolean).map(async f => { images[f] = await loadImage(base + f); }));
  return { m, images, k: RIG_H / (m.height || 600) };
}
const ang = (a, b) => Math.atan2(b[1] - a[1], b[0] - a[0]);

function partXform(P, name, p) {
  const d = P.m.parts[name]; if (!d) return null;
  const [a, b, attach] = d.bone || DEFAULT_BONES[name] || []; if (!a || !p[a] || !p[b]) return null;
  const J = (d.attach || attach) === 'end' ? p[b] : p[a], th = ang(p[a], p[b]) - ang(d.from, d.to);
  return { d, J, th };
}
function drawPart(g, P, x) {
  const im = P.images[x.d.file]; if (!im) return;
  g.save(); g.translate(x.J[0], x.J[1]); g.rotate(x.th); g.scale(P.k * (x.d.scale ?? 1), P.k * (x.d.scale ?? 1)); g.translate(-x.d.from[0], -x.d.from[1]);
  if (x.d.dark) g.filter = `brightness(${1 - x.d.dark})`;
  g.drawImage(im, 0, 0); g.restore();
}
function faceKeys(P, o) {
  const ex = { ...EXPR, ...(P.m.expressions || {}) }[o.expr || 'neutral'] || EXPR.neutral, F = P.m.face || {};
  let eyes = Array.isArray(ex) ? ex[0] : ex.eyes, mouth = Array.isArray(ex) ? ex[1] : ex.mouth;
  if (!F.eyes?.[eyes]) eyes = 'open'; if (o.blink && F.eyes?.closed) eyes = 'closed';
  const talk = o.talk || 0; if (talk > 0.45 && F.mouth?.open) mouth = 'open'; else if (talk > 0.15) mouth = F.mouth?.mid ? 'mid' : F.mouth?.open ? 'open' : mouth;
  if (!F.mouth?.[mouth]) mouth = F.mouth?.closed ? 'closed' : Object.keys(F.mouth || {})[0];
  return { eyes, mouth };
}
// face overlays are placed in the head image's own pixel space
function drawFace(g, P, o) {
  const F = P.m.face; if (!F) return; const { eyes, mouth } = faceKeys(P, o);
  const put = (file, at) => { const im = P.images[file]; if (!im || !at) return; g.drawImage(im, at[0] - im.width / 2, at[1] - im.height / 2); };
  put(F.eyes?.[eyes], F.eyesAt); put(F.mouth?.[mouth], F.mouthAt);
}

export function drawCutout(g, o) {
  const P = o.puppet; if (!P) throw new Error('cutout family needs { puppet } (loadPuppet)');
  const s = o.s ?? 1, f = o.facing ?? 1;
  g.save(); if (o.alpha != null) g.globalAlpha *= o.alpha;
  if (o.shadow !== false && !o.rot) contact(g, o.x, o.y + 2, (P.m.shadow ?? 42) * s);
  g.translate(o.x, o.y); g.scale(f * s * (P.m.flip ? -1 : 1), s);
  if (P.m.mode === 'sprites') {
    const key = o.sprite || (P.m.sprites[o.expr] ? o.expr : 'idle'), sp = P.m.sprites[key] || Object.values(P.m.sprites)[0], im = P.images[sp.file];
    const bob = o.still ? 0 : Math.sin((E.t || 0) * 2.1 + (o.seed || 0)) * 0.008, sq = o.squash || 0;
    g.scale(P.k * (1 + sq * 0.3), P.k * (1 + bob - sq * 0.3));
    const [ax, ay] = sp.anchor || [0.5, 1]; g.translate(-im.width * ax, -im.height * ay); g.drawImage(im, 0, 0);
    if (sp.faceAt && P.m.face) { g.save(); g.translate(sp.faceAt[0], sp.faceAt[1]); g.scale(sp.faceScale ?? 1, sp.faceScale ?? 1); g.translate(-(P.m.face.origin?.[0] ?? 0), -(P.m.face.origin?.[1] ?? 0)); drawFace(g, P, o); g.restore(); }
  } else {
    const p = o.pose || POSES.stand;
    if (o.rot) { g.translate(p.hip[0], p.hip[1]); g.rotate(o.rot); g.translate(-p.hip[0], -p.hip[1]); }
    for (const name of ORDER) {
      if (name === '@face') continue;
      const x = partXform(P, name, p); if (!x) continue; drawPart(g, P, x);
      if (name === 'head' && P.m.face) { g.save(); g.translate(x.J[0], x.J[1]); g.rotate(x.th); g.scale(P.k * (x.d.scale ?? 1), P.k * (x.d.scale ?? 1)); g.translate(-x.d.from[0], -x.d.from[1]); drawFace(g, P, o); g.restore(); }
    }
  }
  g.restore();
}
export function cutoutHead(o) {
  const P = o.puppet, s = o.s ?? 1, f = o.facing ?? 1;
  if (!P || P.m.mode === 'sprites') { const h = (P?.m.sprites?.idle?.headY ?? 0.85) * RIG_H; return [o.x, o.y - h * s, 30 * s]; }
  const p = o.pose || POSES.stand, x = partXform(P, 'head', p); if (!x) return [o.x, o.y - 210 * s, 30 * s];
  const mid = [(x.d.from[0] + x.d.to[0]) / 2 - x.d.from[0], (x.d.from[1] + x.d.to[1]) / 2 - x.d.from[1]], c = Math.cos(x.th), sn = Math.sin(x.th);
  const kk = P.k * (x.d.scale ?? 1), lx = x.J[0] + (mid[0] * c - mid[1] * sn) * kk, ly = x.J[1] + (mid[0] * sn + mid[1] * c) * kk, len = Math.hypot(x.d.to[0] - x.d.from[0], x.d.to[1] - x.d.from[1]) * kk;
  return [o.x + lx * f * s, o.y + ly * s, len * 0.5 * s];
}
// close-up: the head (and the top of the torso) scaled so the head's from→to length = 2r; sprites use a "closeup" sprite if present
export function cutoutCloseUp(g, cx, cy, r, o = {}) {
  const P = o.puppet; if (!P) return;
  g.save(); g.translate(cx, cy); if (o.tilt) g.rotate(o.tilt);
  if (P.m.mode === 'sprites') { const sp = P.m.sprites.closeup || P.m.sprites.idle, im = P.images[sp.file], k = (r * 2.6) / im.height; g.scale(k * (o.facing ?? 1), k); g.translate(-im.width / 2, -im.height * 0.42); g.drawImage(im, 0, 0); if (sp.faceAt && P.m.face) { g.translate(sp.faceAt[0], sp.faceAt[1]); g.scale(sp.faceScale ?? 1, sp.faceScale ?? 1); g.translate(-(P.m.face.origin?.[0] ?? 0), -(P.m.face.origin?.[1] ?? 0)); drawFace(g, P, o); } g.restore(); return; }
  const H = P.m.parts.head, T = P.m.parts.torso, len = Math.hypot(H.to[0] - H.from[0], H.to[1] - H.from[1]), k = (2 * r) / len;
  g.scale(k * (o.facing ?? 1), k); const up = ang(H.from, H.to) + Math.PI / 2; g.rotate(-up);
  const mid = [(H.from[0] + H.to[0]) / 2, (H.from[1] + H.to[1]) / 2];
  if (T) { const th = ang(H.to, H.from) - ang(T.from, T.to), im = P.images[T.file]; g.save(); g.translate(H.from[0] - mid[0], H.from[1] - mid[1]); g.rotate(th); g.translate(-T.from[0], -T.from[1]); g.drawImage(im, 0, 0); g.restore(); }
  g.translate(-mid[0], -mid[1]); g.drawImage(P.images[H.file], 0, 0); drawFace(g, P, o);
  g.restore();
}
