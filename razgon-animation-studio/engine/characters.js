// engine/characters.js — one entry point for every character family.
// Scenes call drawCharacter / characterCloseUp / characterHead; the family comes from o.family, else from the
// style pack ("characters": {"family": "stick"}). All families share the skeleton poses in skeleton.js, so the same
// acting (posesAt, posesSpring, walkPose, breathe) drives any look.
//
// Family contract (registerFamily(name, impl)):
//   draw(g, o)               full body at o.x, o.y (feet), scale o.s, o.facing ±1, o.pose (skeleton), o.expr, o.outfit, …
//   bigFace(g, cx, cy, r, o) frame-filling close-up of the head
//   headPos(o) -> [x, y, r]  where the head is for a given draw() call (for speech rings, props, eye-lines)
import { E } from './core.js';
import * as stick from './rig2d.js';
import * as doodle from './rig-doodle.js';
import * as faceobj from './rig-faceobj.js';
import * as flat from './rig-flat.js';
import * as cutout from './rig-cutout.js';

const FAMILIES = {
  stick: { draw: stick.drawFigure, bigFace: stick.bigFace, headPos: stick.headPos },
  doodle: { draw: doodle.drawDoodle, bigFace: doodle.doodleCloseUp, headPos: doodle.doodleHead },
  faceobj: { draw: faceobj.drawFaceObj, bigFace: faceobj.faceObjCloseUp, headPos: faceobj.faceObjHead },
  flat: { draw: flat.drawFlat, bigFace: flat.flatCloseUp, headPos: flat.flatHead },
  cutout: { draw: cutout.drawCutout, bigFace: cutout.cutoutCloseUp, headPos: cutout.cutoutHead },
};

export function registerFamily(name, impl) { FAMILIES[name] = impl; }
export const families = () => Object.keys(FAMILIES);

function fam(o) {
  const name = o?.family || (o?.puppet ? 'cutout' : null) || E.pack?.characters?.family || 'stick';
  const f = FAMILIES[name];
  if (!f) throw new Error(`character family "${name}" is not registered (have: ${families().join(', ')})`);
  return f;
}
export const drawCharacter = (g, o) => fam(o).draw(g, o);
export const characterCloseUp = (g, cx, cy, r, o = {}) => fam(o).bigFace(g, cx, cy, r, o);
export const characterHead = (o) => fam(o).headPos(o);

export { POSES, pose, blendPose, posesAt, breathe, walkPose } from './skeleton.js';
