// engine/map.js — animated maps from Natural Earth data (public domain, via the world-atlas package; nothing to credit).
// Import it only in shots that need maps: it loads the country data once at boot (110m for the world, 50m when zoomed).
//
//   import { geo, flyTo, COUNTRY } from '/engine/map.js';
//   const view = flyTo(t, [[0, { center: [10, 50], zoom: 1.2 }], [3, { center: [2, 47], zoom: 4 }]]);   // camera keys
//   const M = geo({ projection: 'natural', ...view });
//   M.world(g);  M.country(g, 'France', { flag: true });  M.union(g, ['Spain', 'Portugal'], { fill: '#c44' });
//   M.region(g, [[lon, lat], …], { fill });  M.route(g, [[lon, lat], …], { progress });  M.label(g, 'PARIS', 2.35, 48.85);
//
// Projections: 'natural' (Natural Earth I, the default world look), 'mercator', 'equirect', 'globe' (orthographic, rotates to `center`).
// zoom 1 = the whole world fits the frame width (globe: the sphere fills ~85% of the frame height).
// Line widths are in screen pixels and stay constant while zooming. Colours come from the variant's `map` tokens:
//   map: { sea, land, border, coast, borderWidth, coastWidth, label, labelFont }
import { E, S, lerp, clamp, ease, text, FONTS, alpha, shade } from './core.js';
import { paintFlag, countryColor } from './flags.js';

const load = async (res) => (await fetch(`/node_modules/world-atlas/countries-${res}.json`)).json();
const RAW = { '110m': await load('110m'), '50m': await load('50m') };

// ---------- TopoJSON → features ----------
function decode(topo) {
  const [sx, sy] = topo.transform.scale, [tx, ty] = topo.transform.translate;
  const arcs = topo.arcs.map(a => { let x = 0, y = 0; return a.map(([dx, dy]) => { x += dx; y += dy; return [x * sx + tx, y * sy + ty]; }); });
  const ring = (ids) => { const out = []; ids.forEach((i, k) => { const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i]; a.forEach((p, j) => { if (k && !j) return; out.push(p); }); }); return out; };
  const feats = {};
  for (const gm of topo.objects.countries.geometries) {
    const name = gm.properties?.name; if (!name) continue;
    const polys = gm.type === 'Polygon' ? [gm.arcs.map(ring)] : gm.type === 'MultiPolygon' ? gm.arcs.map(p => p.map(ring)) : [];
    let best = null, bestA = -1, bb = [180, 90, -180, -90], main = null;
    for (const p of polys) { const r = p[0]; let a = 0, cx = 0, cy = 0; for (let i = 0; i < r.length - 1; i++) { const [x0, y0] = r[i], [x1, y1] = r[i + 1], c = x0 * y1 - x1 * y0; a += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c; } a /= 2; if (Math.abs(a) > bestA) { bestA = Math.abs(a); best = a ? [cx / (6 * a), cy / (6 * a)] : r[0]; main = r; } for (const [x, y] of r) { bb[0] = Math.min(bb[0], x); bb[1] = Math.min(bb[1], y); bb[2] = Math.max(bb[2], x); bb[3] = Math.max(bb[3], y); } }
    const mb = main ? main.reduce((b, [x, y]) => [Math.min(b[0], x), Math.min(b[1], y), Math.max(b[2], x), Math.max(b[3], y)], [180, 90, -180, -90]) : bb;
    feats[name] = { name, id: gm.id, polys, centroid: best, bbox: bb, mainBbox: mb };
  }
  return feats;
}
const FEAT = { '110m': decode(RAW['110m']), '50m': decode(RAW['50m']) };
const ALIAS = { USA: 'United States of America', US: 'United States of America', 'United States': 'United States of America', UK: 'United Kingdom', Britain: 'United Kingdom', 'Great Britain': 'United Kingdom', 'Czech Republic': 'Czechia', DRC: 'Dem. Rep. Congo', 'DR Congo': 'Dem. Rep. Congo', 'Bosnia': 'Bosnia and Herz.', 'North Macedonia': 'Macedonia', 'Ivory Coast': "Côte d'Ivoire", 'Central African Republic': 'Central African Rep.', 'South Sudan': 'S. Sudan', 'Dominican Republic': 'Dominican Rep.', 'Equatorial Guinea': 'Eq. Guinea', 'Western Sahara': 'W. Sahara', Eswatini: 'eSwatini', Swaziland: 'eSwatini' };
const LABEL_AT = { 'United States of America': [-98, 39], Canada: [-100, 58], Russia: [95, 62], Norway: [9, 61], France: [2.5, 46.6], Chile: [-71, -33], Indonesia: [117, -1], Malaysia: [102, 4], Croatia: [16, 45.4], Vietnam: [106, 15] };
export const COUNTRY = (n) => ALIAS[n] || n;
export const countryNames = () => Object.keys(FEAT['50m']).sort();

// ---------- projections (radians in, unit coords out) ----------
const R = Math.PI / 180;
const PROJ = {
  equirect: (l, p) => [l, -p],
  mercator: (l, p) => [l, -Math.log(Math.tan(Math.PI / 4 + clamp(p, -1.48, 1.48) / 2))],
  natural: (l, p) => { const p2 = p * p, p4 = p2 * p2; return [l * (0.8707 - 0.131979 * p2 + p4 * (-0.013791 + p4 * (0.003971 * p2 - 0.001529 * p4))), -p * (1.007226 + p2 * (0.015085 + p4 * (-0.044475 + 0.028874 * p2 - 0.005916 * p4)))]; },
};

// camera keyframes for maps: zoom is interpolated in log space so flights feel even
export function flyTo(t, keys, fn = ease.inOut) {
  if (t <= keys[0][0]) return { ...keys[0][1] };
  for (let i = 1; i < keys.length; i++) {
    const [t1, b] = keys[i]; if (t > t1) continue; const [t0, a] = keys[i - 1], k = fn((t - t0) / (t1 - t0));
    return { center: [lerp(a.center[0], b.center[0], k), lerp(a.center[1], b.center[1], k)], zoom: Math.exp(lerp(Math.log(a.zoom), Math.log(b.zoom), k)), rot: lerp(a.rot || 0, b.rot || 0, k) };
  }
  return { ...keys[keys.length - 1][1] };
}

export function geo(o = {}) {
  const type = o.projection || 'natural', zoom = o.zoom ?? 1, center = o.center || [0, 0], T = { sea: '#9fd3e6', land: '#f2e6c9', border: '#ffffff', coast: '#3b4a5a', borderWidth: 1.6, coastWidth: 2.4, label: '#1f2a36', ...(S()?.map || {}) };
  const res = o.res || (zoom >= 2.4 ? '50m' : '110m'), F = FEAT[res];
  const cxs = E.W / 2 + (o.offset?.[0] || 0), cys = E.H / 2 + (o.offset?.[1] || 0);
  let proj, visible = () => true;
  if (type === 'globe') {
    const Rg = zoom * E.H * 0.425, l0 = center[0] * R, p0 = center[1] * R, sp0 = Math.sin(p0), cp0 = Math.cos(p0);
    proj = (lon, lat) => { const l = lon * R - l0, p = lat * R, cp = Math.cos(p), sp = Math.sin(p), cl = Math.cos(l); let x = cp * Math.sin(l), y = -(cp0 * sp - sp0 * cp * cl); const cc = sp0 * sp + cp0 * cp * cl; if (cc < 0) { const k = Math.hypot(x, y) || 1; x /= k; y /= k; } return [cxs + x * Rg, cys + y * Rg]; };
    visible = (lon, lat) => sp0 * Math.sin(lat * R) + cp0 * Math.cos(lat * R) * Math.cos(lon * R - l0) >= 0;
  } else {
    const f = PROJ[type] || PROJ.natural, sc = zoom * E.W / (2 * Math.PI) * (type === 'natural' ? 1.15 : 1), c0 = f(center[0] * R, center[1] * R);
    proj = (lon, lat) => { const [x, y] = f(lon * R, lat * R); return [cxs + (x - c0[0]) * sc, cys + (y - c0[1]) * sc]; };
  }
  const feat = (n) => F[COUNTRY(n)] || FEAT['50m'][COUNTRY(n)];
  // build a canvas path for a feature (rings fully on the back of the globe are skipped)
  function tracePolys(g, polys) {
    g.beginPath();
    for (const poly of polys) for (const ringPts of poly) {
      if (type === 'globe' && !ringPts.some(([x, y]) => visible(x, y))) continue;
      let px0 = null; ringPts.forEach(([x, y], i) => { const [px, py] = proj(x, y); if (i && !(type !== 'globe' && Math.abs(x - px0) > 180)) g.lineTo(px, py); else g.moveTo(px, py); px0 = x; }); g.closePath();
    }
  }
  const inView = (f) => { if (type === 'globe') return true; const [a, b] = proj(f.bbox[0], f.bbox[3]), [c, d] = proj(f.bbox[2], f.bbox[1]); return !(c < -E.W * 0.6 || a > E.W * 1.6 || d < -E.H * 0.6 || b > E.H * 1.6); };
  const api = {
    proj, visible, res, zoom, type,
    feature: feat,
    sea(g, color) { g.fillStyle = color || T.sea; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); if (type === 'globe') { g.fillStyle = o.space || '#0d1424'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.fillStyle = color || T.sea; g.beginPath(); g.arc(cxs, cys, zoom * E.H * 0.425, 0, Math.PI * 2); g.fill(); } },
    // world(g, { land, sea, border, colors: 'random' | fn(name) -> colour, except: [names] })
    world(g, w = {}) {
      if (w.sea !== false) api.sea(g, w.sea);
      const ex = new Set((w.except || []).map(COUNTRY)); if (!w.antarctica && type !== 'globe') ex.add('Antarctica');
      for (const f of Object.values(F)) { if (ex.has(f.name) || !inView(f)) continue; const fill = typeof w.colors === 'function' ? w.colors(f.name) : w.colors === 'random' ? countryColor(f.name) : w.land || T.land; tracePolys(g, f.polys); g.fillStyle = fill; g.fill('evenodd'); }
      g.save(); g.lineJoin = 'round'; g.strokeStyle = w.border || T.border; g.lineWidth = w.borderWidth ?? T.borderWidth;
      for (const f of Object.values(F)) { if (ex.has(f.name) || !inView(f)) continue; tracePolys(g, f.polys); g.stroke(); }
      g.restore();
    },
    // country(g, name, { fill, flag: true|spec, stroke, w, alpha })
    country(g, name, s = {}) {
      const f = feat(name); if (!f) { console.log('map: unknown country', name); return; }
      g.save(); if (s.alpha != null) g.globalAlpha *= s.alpha; tracePolys(g, f.polys);
      if (s.flag) { g.save(); g.clip('evenodd'); const [a, b] = proj(f.mainBbox[0], f.mainBbox[3]), [c, d] = proj(f.mainBbox[2], f.mainBbox[1]); paintFlag(g, s.flag === true ? f.name : s.flag, Math.min(a, c), Math.min(b, d), Math.abs(c - a), Math.abs(d - b)); g.restore(); tracePolys(g, f.polys); }
      else { g.fillStyle = s.fill || countryColor(f.name); g.fill('evenodd'); }
      if (s.stroke !== false) { g.lineJoin = 'round'; g.strokeStyle = s.stroke || T.coast; g.lineWidth = s.w ?? T.coastWidth; g.stroke(); }
      g.restore();
    },
    countries(g, names, s = {}) { names.forEach(n => api.country(g, n, typeof s === 'function' ? s(n) : s)); },
    // union(g, names, { fill, stroke, w }) — one merged region with no inner borders (an empire, a bloc, a grown country)
    union(g, names, s = {}) {
      const fs = names.map(feat).filter(Boolean); g.save(); if (s.alpha != null) g.globalAlpha *= s.alpha; g.lineJoin = 'round';
      if (s.stroke !== false) { g.strokeStyle = s.stroke || T.coast; g.lineWidth = (s.w ?? T.coastWidth) * 2; fs.forEach(f => { tracePolys(g, f.polys); g.stroke(); }); }
      g.fillStyle = s.fill || '#d9483b'; fs.forEach(f => { tracePolys(g, f.polys); g.fill('evenodd'); g.strokeStyle = s.fill || '#d9483b'; g.lineWidth = 1.5; g.stroke(); });
      g.restore();
    },
    // region(g, [[lon, lat], …] | [[ring], [ring]], { fill, stroke, w, alpha }) — any area drawn from coordinates (historical borders, zones)
    region(g, coords, s = {}) {
      const rings = Array.isArray(coords[0][0]) ? coords : [coords];
      g.save(); if (s.alpha != null) g.globalAlpha *= s.alpha; g.beginPath(); rings.forEach(r => r.forEach(([x, y], i) => { const [px, py] = proj(x, y); i ? g.lineTo(px, py) : g.moveTo(px, py); }) || g.closePath());
      if (s.fill) { g.fillStyle = s.fill; g.fill('evenodd'); } if (s.stroke !== false) { g.lineJoin = 'round'; g.strokeStyle = s.stroke || T.coast; g.lineWidth = s.w ?? T.coastWidth; g.stroke(); } g.restore();
    },
    // route(g, [[lon, lat], …], { color, w, dash, progress 0..1, arrow }) — a travelled line that draws on
    route(g, coords, s = {}) {
      const P = coords.map(([x, y]) => proj(x, y)), L = []; let tot = 0; for (let i = 1; i < P.length; i++) { tot += Math.hypot(P[i][0] - P[i - 1][0], P[i][1] - P[i - 1][1]); L.push(tot); }
      const want = tot * clamp(s.progress ?? 1); if (want <= 0) return;
      g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = s.color || '#d9483b'; g.lineWidth = s.w ?? 5; if (s.dash) g.setLineDash(s.dash);
      g.beginPath(); g.moveTo(...P[0]); let end = P[0], ang = 0;
      for (let i = 1; i < P.length; i++) { const l0 = L[i - 2] || 0, l1 = L[i - 1]; if (want >= l1) { g.lineTo(...P[i]); end = P[i]; ang = Math.atan2(P[i][1] - P[i - 1][1], P[i][0] - P[i - 1][0]); } else { const k = (want - l0) / (l1 - l0); end = [lerp(P[i - 1][0], P[i][0], k), lerp(P[i - 1][1], P[i][1], k)]; ang = Math.atan2(P[i][1] - P[i - 1][1], P[i][0] - P[i - 1][0]); g.lineTo(...end); break; } }
      g.stroke(); g.setLineDash([]);
      if (s.arrow !== false && want > 10) { const a = 18 + (s.w ?? 5) * 1.5; g.fillStyle = s.color || '#d9483b'; g.beginPath(); g.moveTo(end[0] + Math.cos(ang) * a * 0.6, end[1] + Math.sin(ang) * a * 0.6); g.lineTo(end[0] + Math.cos(ang + 2.5) * a, end[1] + Math.sin(ang + 2.5) * a); g.lineTo(end[0] + Math.cos(ang - 2.5) * a, end[1] + Math.sin(ang - 2.5) * a); g.closePath(); g.fill(); }
      g.restore(); return end;
    },
    dot(g, lon, lat, s = {}) { if (!visible(lon, lat)) return; const [x, y] = proj(lon, lat); g.fillStyle = s.color || '#d9483b'; g.beginPath(); g.arc(x, y, s.r ?? 9, 0, Math.PI * 2); g.fill(); g.strokeStyle = s.stroke || '#ffffff'; g.lineWidth = s.w ?? 3; g.stroke(); return [x, y]; },
    label(g, str, lon, lat, s = {}) { if (!visible(lon, lat)) return; const [x, y] = proj(lon, lat); text(g, str, x + (s.dx || 0), y + (s.dy || 0), { size: s.size || 34, color: s.color || T.label, font: s.font || T.labelFont || FONTS.ui, weight: s.weight || 800, stroke: s.halo ?? 6, strokeColor: s.haloColor || alpha('#ffffff', 0.85), spacing: s.spacing || 1, alpha: s.alpha ?? 1 }); return [x, y]; },
    // where a country's label / face / ball goes (the centre of its largest landmass, with manual fixes for odd shapes)
    anchor(name) { const n = COUNTRY(name), f = feat(n); const ll = LABEL_AT[n] || f?.centroid || [0, 0]; return { lonlat: ll, xy: proj(ll[0], ll[1]) }; },
    // screen size of a country (px) — use it to size faces / balls placed on it
    size(name) { const f = feat(name); if (!f) return 0; const [a, b] = proj(f.bbox[0], f.bbox[3]), [c, d] = proj(f.bbox[2], f.bbox[1]); return Math.min(Math.abs(c - a), Math.abs(d - b)); },
  };
  return api;
}

// fit(names | [[lon,lat]…], { projection, pad, all }) → { center, zoom } that frames those countries/points (main landmass only unless all:true)
export function fit(what, o = {}) {
  let bb = [180, 90, -180, -90];
  for (const w of what) { if (Array.isArray(w)) { bb = [Math.min(bb[0], w[0]), Math.min(bb[1], w[1]), Math.max(bb[2], w[0]), Math.max(bb[3], w[1])]; continue; } const f = FEAT['50m'][COUNTRY(w)]; if (!f) continue; const [a, b, c, d] = o.all ? f.bbox : f.mainBbox; bb = [Math.min(bb[0], a), Math.min(bb[1], b), Math.max(bb[2], c), Math.max(bb[3], d)]; }
  const center = [(bb[0] + bb[2]) / 2, (bb[1] + bb[3]) / 2], pad = o.pad ?? 1.25;
  const probe = geo({ projection: o.projection || 'natural', center, zoom: 1 }), [x0, y0] = probe.proj(bb[0], bb[3]), [x1, y1] = probe.proj(bb[2], bb[1]);
  const zoom = Math.min(E.W / (Math.abs(x1 - x0) * pad), E.H / (Math.abs(y1 - y0) * pad));
  return { center, zoom: clamp(zoom, 0.5, 60) };
}
