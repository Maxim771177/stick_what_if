// sets/car.js — view from inside a car: windshield with outside scene, dashboard, wheel. film = grease haze 0..1
import { E, V, mood, backdrop, rr, seg, circle, poly, linGrad, glow, alpha, shade, rng } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const WS = () => ({ x0: 150, x1: 1770, top: 80, bot: 650 });
export function windshieldPath(g) { const w = WS(); g.beginPath(); g.moveTo(w.x0 + 90, w.top); g.lineTo(w.x1 - 90, w.top); g.lineTo(w.x1, w.bot); g.lineTo(w.x0, w.bot); g.closePath(); }
export function carInterior(g, t, o = {}) {
  const M = mood(o.mood || 'golden'), w = WS(), night = o.night;
  g.save(); windshieldPath(g); g.clip();
  const sky = night ? ['#070a1c', '#1b1840', '#2a2250'] : M.sky;
  backdrop(g, sky);
  if (!night) { FX.sun(g, 1250, 330, 56, '#fff3dc', M.key, 5); FX.skyline(g, { x: 0, y: 430, w: 1920, minH: 60, maxH: 170, color: '#4a3558', windowColor: 'rgba(255,200,120,.4)', lit: 0.1, seed: 5 }); }
  else FX.skyline(g, { x: 0, y: 470, w: 1920, minH: 60, maxH: 150, color: '#0c0a1e', windowColor: 'rgba(255,200,120,.7)', lit: 0.4, seed: 9 });
  // road with perspective
  const hy = 470; g.fillStyle = linGrad(g, 0, hy, 0, w.bot, night ? ['#14122a', '#0a0818'] : ['#4a3d52', '#2a2230']); g.fillRect(w.x0, hy, w.x1 - w.x0, w.bot - hy);
  poly(g, [[960 - 8, hy], [960 + 8, hy], [960 + 80, w.bot], [960 - 80, w.bot]], 'rgba(255,230,160,.0)');
  for (let i = 0; i < 6; i++) { const k = ((i / 6) + t * 0.25) % 1, y = hy + (w.bot - hy) * k * k, ww = 4 + 46 * k * k; g.fillStyle = 'rgba(255,230,170,.6)'; g.fillRect(960 - ww / 2, y, ww, 6 + 30 * k * k); }
  o.outside?.(g, t);
  // grease film: soft haze + streak lines
  const f = o.film ?? 0.5; if (f > 0) {
    g.fillStyle = `rgba(235,230,215,${0.22 * f})`; g.fillRect(w.x0, w.top, w.x1 - w.x0, w.bot - w.top);
    const r = rng(11); g.lineCap = 'round';
    for (let i = 0; i < 46; i++) { const x = w.x0 + r() * (w.x1 - w.x0), y = w.top + r() * (w.bot - w.top), l = 80 + r() * 200, a = 0.1 + 0.18 * r(); g.strokeStyle = `rgba(255,252,240,${a * f})`; g.lineWidth = 6 + r() * 16; g.beginPath(); g.moveTo(x, y); g.lineTo(x + l * 0.8, y - l * 0.35 * (r() - 0.3)); g.stroke(); }
  }
  g.restore();
  // frame/pillars + roof
  g.fillStyle = shade(M.wall, -0.7); g.fillRect(0, 0, E.W, w.top); g.fillRect(0, 0, w.x0 + 90, E.H);
  poly(g, [[w.x0 + 90, w.top], [w.x0, w.bot], [0, w.bot + 40], [0, 0]], shade(M.wall, -0.65));
  poly(g, [[w.x1 - 90, w.top], [w.x1, w.bot], [E.W, w.bot + 40], [E.W, 0]], shade(M.wall, -0.65));
  seg(g, [[w.x0 + 90, w.top], [w.x0, w.bot]], 12, shade(M.wall, -0.8)); seg(g, [[w.x1 - 90, w.top], [w.x1, w.bot]], 12, shade(M.wall, -0.8));
  // dashboard
  g.fillStyle = linGrad(g, 0, w.bot - 10, 0, E.H, ['#3a3040', '#1c1624', '#120e18']); g.fillRect(0, w.bot - 6, E.W, E.H - w.bot + 6);
  g.fillStyle = 'rgba(255,255,255,.08)'; g.fillRect(0, w.bot - 6, E.W, 8);
  for (const x of [1180, 1330]) { rr(g, x, w.bot + 40, 130, 46, 8); g.fillStyle = '#0e0a14'; g.fill(); for (let k = 0; k < 4; k++) seg(g, [[x + 14, w.bot + 52 + k * 9], [x + 116, w.bot + 52 + k * 9]], 2, '#2a2234'); }
  circle(g, 640, 880, 150, '#0c0810'); circle(g, 640, 880, 120, '#18121f');
  g.strokeStyle = '#08060c'; g.lineWidth = 28; g.beginPath(); g.ellipse(520, 840, 210, 250, 0.25, 0, 7); g.stroke();
  g.strokeStyle = 'rgba(255,255,255,.09)'; g.lineWidth = 4; g.beginPath(); g.ellipse(520, 840, 222, 262, 0.25, 3.6, 5.2); g.stroke();
  return { M, w };
}
export function caption(g, str, a = 1, o = {}) {
  if (a <= 0) return; const size = o.size || 62, y = o.y || E.H - 105;
  g.save(); g.globalAlpha = a; g.font = `700 ${size}px "Fredoka"`; const tw = g.measureText(str).width;
  rr(g, E.W / 2 - tw / 2 - 40, y - size * 0.8, tw + 80, size * 1.6, 28); g.fillStyle = 'rgba(10,6,16,.72)'; g.fill();
  g.fillStyle = o.color || '#fff4dc'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = o.glow || 'rgba(255,170,60,.7)'; g.shadowBlur = 18; g.fillText(str, E.W / 2, y); g.restore();
}
