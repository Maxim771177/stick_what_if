// engine/clips.js — ready video clips (AI-generated, stock without attribution, the user's own footage) inside shots.
// A clip is first turned into a frame folder by tools/clip_frames.py (ffmpeg, project fps), then drawn like an image,
// so it can be framed, moved, masked, graded and overlaid with code graphics like anything else.
//   import { loadClip, clip } from '/engine/clips.js';  import { project } from '/engine/assets.js';
//   const INTRO = await loadClip(project('assets/clips/intro'));
//   clip(g, INTRO, t)                                         // fill the stage (cover), clip time = shot time
//   clip(g, INTRO, t, { fit: 'contain', x: 960, y: 540, w: 1100, start: 2.0, speed: 0.8, loop: true, alpha: 1, zoom: 1.05 })
// Frames are fetched on demand; the renderer waits for them (E.pending), so renders stay complete and deterministic.
import { E } from './core.js';

export async function loadClip(url) {
  const base = url.replace(/\/+$/, ''), r = await fetch(`${base}/clip.json`);
  if (!r.ok) throw new Error(`clip not found: ${base}/clip.json (run tools/clip_frames.py)`);
  return { ...(await r.json()), base, cache: new Map(), order: [] };
}
function frameImage(C, i) {
  let e = C.cache.get(i);
  if (!e) {
    const im = new Image(); e = { im, ok: false };
    e.p = new Promise(res => { im.onload = () => { e.ok = true; res(); }; im.onerror = () => { e.ok = true; e.bad = true; res(); }; });
    im.src = `${C.base}/${String(i + 1).padStart(6, '0')}.${C.ext || 'jpg'}`; C.cache.set(i, e); C.order.push(i);
    while (C.order.length > (C.keep || 96)) C.cache.delete(C.order.shift());
  }
  return e;
}
// the frame index for clip-time t (seconds)
export function clipIndex(C, t, o = {}) {
  let i = Math.floor(((o.start || 0) + Math.max(0, t) * (o.speed ?? 1)) * C.fps + 1e-6);
  return o.loop ? ((i % C.frames) + C.frames) % C.frames : Math.min(C.frames - 1, Math.max(0, i));
}
// returns the decoded frame image, or null while it loads (the renderer redraws the frame when it arrives)
export function clipFrame(C, t, o = {}) {
  const i = clipIndex(C, t, o), e = frameImage(C, i);
  for (let k = 1; k <= 6; k++) frameImage(C, o.loop ? (i + k) % C.frames : Math.min(C.frames - 1, i + k));   // read ahead
  if (!e.ok) { (E.pending ||= []).push(e.p); return null; }
  return e.bad ? null : e.im;
}
export function clip(g, C, t, o = {}) {
  const im = clipFrame(C, t, o); if (!im) return false;
  const iw = C.w || im.naturalWidth, ih = C.h || im.naturalHeight, fit = o.fit || 'cover';
  let w = o.w, h = o.h;
  if (!w && !h) { const k = (fit === 'contain' ? Math.min(E.W / iw, E.H / ih) : Math.max(E.W / iw, E.H / ih)) * (o.zoom ?? 1); w = iw * k; h = ih * k; }
  else if (w && !h) h = (w * ih) / iw; else if (h && !w) w = (h * iw) / ih;
  g.save(); if (o.alpha != null) g.globalAlpha *= o.alpha; if (o.filter) g.filter = o.filter;
  g.translate(o.x ?? E.W / 2, o.y ?? E.H / 2); if (o.rot) g.rotate(o.rot); if (o.flip) g.scale(-1, 1);
  if (o.radius) { g.beginPath(); g.roundRect(-w / 2, -h / 2, w, h, o.radius); g.clip(); }
  g.drawImage(im, -w / 2, -h / 2, w, h); g.restore(); return true;
}
