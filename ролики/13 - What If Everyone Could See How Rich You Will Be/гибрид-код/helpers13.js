// Общие сборщики мест: класс, спортзал, кухня. Возвращают результаты актёров.
import { POSES } from "/hybrid13/engine13.js";
POSES.scratch = { ...POSES.stand, eF: [22, -196], hF: [6, -236] };
POSES.sitScratch = { ...POSES.sit, eB: [-30, -170], hB: [-6, -232] };
POSES.sitShrug = { ...POSES.sit, eF: [30, -128], hF: [52, -130], eB: [-6, -126], hB: [-26, -128] };
POSES.sitPoint = { ...POSES.sit, eF: [34, -160], hF: [74, -170] };
POSES.sitBack = { ...POSES.sit, head: [-4, -178] };
POSES.walkUp = { ...POSES.stand };

// ---------- класс ----------
export const SEATS = { TESS: [-430, 0], NIA: [-290, 24], JUNE: [-150, 48], LEON: [150, 24], OWEN: [520, 24], K0: [-700, 0], K1: [-610, 24], K2: [-520, 48], K3: [-40, 0], K4: [30, 48], K5: [280, 0], K6: [340, 48], K7: [680, 0], K8: [740, 48], K9: [900, 24] };
// o.who[id] = {pose, expr, look, face, x(путь или число), stand, hide, prop, talk, noDesk}; o.def — общая доработка для всех учеников; o.park — Park
export function cls(k, o = {}) {
  const res = {}; const who = o.who || {};
  for (const id of Object.keys(SEATS)) {
    if ((o.skip || []).includes(id)) continue; const ov = { ...(o.def ? o.def(id, k) : {}), ...(who[id] || {}) }; if (ov.hide) continue; const [sx, sy] = SEATS[id];
    if (!ov.noDesk) { k.p('desk', sx, sy, { f: -1, z: 10 + sy * .02 - .5 }); const turned = (ov.face ?? -1) > 0 && !ov.stand; k.p('chair', sx, sy, { f: turned ? 1 : -1, z: 10 + sy * .02 - .6 }); }
    const { x, stand, ...rest } = ov; const xx = Array.isArray(x) ? x.map(([t, v]) => [t, v == null ? sx : v]) : (x ?? sx); res[id] = k.a(id, xx, { y: sy, face: -1, pose: stand ? 'stand' : 'sit', ...rest });
  }
  if (!o.noPark) res.PARK = k.a('PARK', -900, { face: 1, pose: 'stand', ...(o.park || {}) });
  return res;
}
POSES.pushBike = { ...POSES.stand, eF: [30, -170], hF: [58, -188], eB: [24, -168], hB: [52, -184] };
