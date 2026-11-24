// _c.js (ролик 11): общие кирпичики. Реэкспорт _common.js + gfx6 (K) + новые герои и позы.
export * from './_common.js';
import * as K from '../gfx6.js';
export { K };
import { SMX, OUT, POSES, E, ease, prog, clamp, lerp } from '../lib.js';
OUT.POPPY = { top: 'dress', color: '#f2c21a', hair: 'ponytail', hairColor: '#8a5a2e', kid: true, legs: '#e8a640' };
OUT.DADFAIR = { top: 'tshirt', color: '#3a6ea5', hat: 'headband', hatColor: '#d8232a', hair: 'short', hairColor: '#3a2a1e', legs: '#4a5a78' };
OUT.CAPTAIN = { top: 'jersey', color: '#2f5db0', hair: 'short', hairColor: '#4a2f1e', kid: true, legs: '#2b3a6b' };
OUT.BOXER = { top: 'tshirt', color: '#d8232a', hair: 'short', hairColor: '#2b2420', legs: '#2b2b33', whiteHands: false };
SMX.POPPY = 0.82;
POSES.punch = { ...POSES.stand, head: [8, -206], sh: [4, -172], eF: [42, -170], hF: [80, -168], eB: [-14, -150], hB: [-4, -136] };
POSES.tap = { ...POSES.stand, head: [6, -207], sh: [2, -173], eF: [34, -150], hF: [60, -138], eB: [-7, -136], hB: [-9, -100] };
POSES.guard = { ...POSES.stand, head: [6, -208], eF: [26, -172], hF: [42, -192], eB: [14, -170], hB: [30, -188] };
POSES.fistUp = { ...POSES.stand, eF: [24, -190], hF: [30, -236], eB: [-7, -136], hB: [-9, -100] };
POSES.windBack = { ...POSES.stand, head: [2, -208], sh: [-2, -174], eF: [-34, -168], hF: [-62, -158], eB: [-20, -152], hB: [-4, -140] };
export const SEC = E;
export const FW = () => E.W;
export const TX = () => 0.40 * E.W, LX = () => 0.64 * E.W, DX = () => 0.89 * E.W, HX0 = () => 0.185 * E.W;
export const sw = (t, t0, A = 1, k = 3.2, f = 10) => (t < t0 ? 0 : A * Math.exp(-(t - t0) * k) * Math.cos((t - t0) * f));
export const hit = (t, t0, d = 0.12) => ease.out(prog(t, t0, t0 + d));
export const cnt = (t, t0, t1, v) => String(Math.round(v * ease.out(prog(t, t0, t1))));
// траектория груши силомера (общая для сцен 009-011): u 0..1 от покоя до мишени аквагорки
export const BAG_U = (GY, x0 = 0.40 * 1920 - K.TB_DX, y0 = GY - K.TB_Y) => (u) => K.flight(x0, y0, 0.89 * 1920 - 260, GY - 430, 520, u);
// палатки ярмарки позади героев: o.tester, o.tank, o.lemon, o.candy
export const fairPre = (o = {}) => (g, t, i, ctx) => {
  const GY = ctx.GY;
  if (o.candy !== false) K.candyStand(g, 0.078 * E.W, GY - 8, 0.8);
  if (o.lemon !== false) K.lemonade(g, LX(), GY, 0.95);
  if (o.tank !== false) K.dunkTank(g, DX(), GY, { hit: o.hit ? o.hit(t) : 0 });
  if (o.tester !== false) K.tester(g, TX(), GY, o.tst ? o.tst(t) : { comp: 0.05 * Math.sin(t * 4) });
  if (o.more) o.more(g, t, i, ctx);
};
// Park в аквагорке: до удара сидит на сиденье, потом падает в воду
export const parkTank = (tHit = 0.5, o = {}) => Q0.c('PARK', 0.89 + 0.02, { f: -1, pose: 'sit', poseObj: Q0.SITW, tag: 'PARK', s: 1.5, expr: [[0, 'smile'], [tHit, 'shocked'], [tHit + 1.0, 'angry']], dy: -310, dyK: [[0, 0], [tHit, 0], [tHit + 0.8, 355]], rotK: [[0, 0], [tHit, 0], [tHit + 0.4, 0.5], [tHit + 0.9, 0.1]], noin: 1, ...o });
import * as Q0 from './_common.js';
POSES.bump = { ...POSES.stand, head: [6, -207], sh: [2, -173], eF: [34, -152], hF: [64, -150], eB: [-7, -136], hB: [-9, -100] };
POSES.armBack = { ...POSES.stand, head: [4, -207], sh: [0, -173], eF: [-30, -160], hF: [-64, -176], eB: [-7, -136], hB: [-9, -100] };
POSES.armUp = { ...POSES.stand, eF: [18, -206], hF: [10, -250], eB: [-7, -136], hB: [-9, -100] };
POSES.swingMallet = { ...POSES.stand, head: [0, -208], sh: [-2, -174], eF: [-10, -200], hF: [-26, -250], eB: [-18, -196], hB: [-30, -240] };

POSES.tap1 = { ...POSES.tap, eF: [34, -178], hF: [62, -198] };
POSES.tap2 = { ...POSES.tap, eF: [34, -166], hF: [62, -160] };
POSES.tap3 = { ...POSES.tap, eF: [34, -150], hF: [62, -124] };
POSES.tap4 = { ...POSES.tap, eF: [34, -138], hF: [62, -90] };
