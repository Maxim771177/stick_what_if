// Помощники описания сцен. Время u в секундах от начала сцены (итоговое время ролика, после ×1,2).
export const SC = {};
export const S = (n, spec) => { SC[n] = spec; };
const A = (oid, x, o = {}) => ({ oid, x, ...o });
export const L = (x, o) => A('LEON_NC', x, o), LC = (x, o) => A('LEON', x, o), LW = (x, o) => A('LEON_NCW', x, o);
export const Hz = (x, o) => A('H', x, o), Iv = (x, o) => A('I', x, o), Pp = (x, o) => A('P', x, o), Dn = (x, o) => A('D', x, o);
export const G = (i, x, o) => A('G' + i, x, o);
const EXP = ['smile', 'neutral', 'smile', 'happy'];
// толпа девочек: два ряда вперемешку, n штук из G1..G16 (начиная с from), от x0 до x1
export function GS(n, x0, x1, o = {}) {
  const out = [], per = Math.ceil(n / 2), dx = per > 1 ? (x1 - x0) / (per - 1) : 0, from = o.from || 1;
  for (let i = 0; i < n; i++) {
    const row = i % 2, col = Math.floor(i / 2), id = ((from - 1 + i) % 16) + 1;
    const a = { oid: 'G' + id, x: x0 + col * dx + (row ? dx / 2 : 0), y: (o.y || 0) + (row ? 0 : -(o.dy ?? 30)), s: (o.s || 1) * (row ? 1 : 0.96), f: o.f ?? -1, p: o.p || 'stand', e: o.e || EXP[i % 4], ob: o.ob, lk: o.lk };
    if (o.rx !== undefined) { const t0 = o.rx + i * 0.035; a.p = [[0, o.p || 'stand'], [t0, o.pr_ || 'vote']]; a.e = [[0, o.e || EXP[i % 4]], [t0, 'surprised']]; }
    if (o.each) Object.assign(a, o.each(i, a)); out.push(a);
  }
  return out;
}
export const hang = (n, x0, x1, o = {}) => GS(n, x0, x1, { ...o, p: 'hang', ob: true, y: o.y ?? 210, dy: 0 });
export const wob = (a, f = 1) => Math.sin(f * 6.283);
