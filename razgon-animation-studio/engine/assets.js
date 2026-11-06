// engine/assets.js — image assets (PNG, JPG, WebP, SVG) for scenes: AI-generated or drawn backgrounds, props, puppets.
// Load with top-level await in a scene module so everything is ready before the first frame:
//   import { loadImages, img, project } from '/engine/assets.js';
//   const BG = await loadImages({ kitchen: project('assets/bg/kitchen.png'), mug: project('assets/props/mug.svg') });
//   img(g, BG.kitchen, E.W / 2, E.H / 2, { w: E.W * 1.1, anchor: [0.5, 0.5] });
// Paths: project('…') → the video's folder, pack('…') → the active style pack's folder, or any absolute '/…' URL.
import { E } from './core.js';

const CACHE = new Map();
export const project = (rel) => `/project/${rel.replace(/^\/+/, '')}`;
export const pack = (rel) => `${E.pack?.base || '/stylepacks/' + (E.packId || '')}/${rel.replace(/^\/+/, '')}`;

export function loadImage(url) {
  if (CACHE.has(url)) return CACHE.get(url);
  const p = new Promise((res, rej) => { const im = new Image(); im.onload = () => (im.decode ? im.decode().then(() => res(im), () => res(im)) : res(im)); im.onerror = () => rej(new Error(`image not found: ${url}`)); im.src = url; });
  CACHE.set(url, p); return p;
}
export async function loadImages(map) { const out = {}; await Promise.all(Object.entries(map).map(async ([k, u]) => { out[k] = await loadImage(u); })); return out; }
export async function loadJSON(url) { const r = await fetch(url); if (!r.ok) throw new Error(`json not found: ${url}`); return r.json(); }

// img(g, image, x, y, { w, h, scale, anchor:[ax,ay] (0..1, default bottom-centre), rot, flip, alpha, blur })
export function img(g, im, x, y, o = {}) {
  if (!im) return; const iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height;
  let w = o.w, h = o.h; if (w && !h) h = (w * ih) / iw; else if (h && !w) w = (h * iw) / ih; else if (!w && !h) { w = iw * (o.scale ?? 1); h = ih * (o.scale ?? 1); }
  const [ax, ay] = o.anchor || [0.5, 1];
  g.save(); if (o.alpha != null) g.globalAlpha *= o.alpha; if (o.blur) g.filter = `blur(${o.blur * E.PX}px)`;
  g.translate(x, y); if (o.rot) g.rotate(o.rot); if (o.flip) g.scale(-1, 1);
  g.drawImage(im, -w * ax, -h * ay, w, h); g.restore();
}
// cover(g, image, { x, y, zoom, alpha }) — fill the whole stage with a background image (keeps aspect, crops the rest)
export function cover(g, im, o = {}) { const iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height, k = Math.max(E.W / iw, E.H / ih) * (o.zoom ?? 1.08); img(g, im, E.W / 2 + (o.x || 0), E.H / 2 + (o.y || 0), { w: iw * k, h: ih * k, anchor: [0.5, 0.5], alpha: o.alpha, blur: o.blur }); }
