// engine/stylepack.js — loads the active style pack into the engine.
// A pack lives in stylepacks/<id>/ next to render.mjs: style.json (machine-readable look), bible.md (the look in words,
// read by Claude), optional fonts/, refs/ (reference screenshots) and assets/.
// Font "src" starting with "@fontsource/" is read from node_modules, anything else from the pack folder.
import { setPack, setFonts } from './core.js';

const REQUIRED = ['id', 'characters', 'fonts', 'moods', 'variants'];

export async function loadPack(id) {
  const base = `/stylepacks/${id}`;
  const r = await fetch(`${base}/style.json`);
  if (!r.ok) throw new Error(`style pack "${id}" not found (expected stylepacks/${id}/style.json)`);
  const p = await r.json();
  const miss = REQUIRED.filter(k => !(k in p));
  if (miss.length) throw new Error(`style pack "${id}" is missing: ${miss.join(', ')}`);
  p.id = id; p.base = base;
  setPack(p);
  setFonts(p.fonts);
  await loadFonts(p);
  return p;
}

async function loadFonts(p) {
  for (const role of Object.keys(p.fonts || {})) {
    const f = p.fonts[role];
    for (const face of f.faces || []) {
      const url = face.src.startsWith('@fontsource/') ? `/node_modules/${face.src}` : `${p.base}/${face.src}`;
      try {
        const ff = new FontFace(f.family, `url(${url})`, { weight: face.weight || '400', style: face.style || 'normal' });
        await ff.load(); document.fonts.add(ff);
      } catch (e) { console.log('font missing', f.family, face.weight, url); }
    }
  }
}
