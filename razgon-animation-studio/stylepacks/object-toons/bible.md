# Style pack: Object Toons

The look in words for this pack. It overrides `references/craft-bible.md` wherever the two differ. Engine values are in `style.json`. Working reference scenes: `examples/toons-demo/`.

## Source
Built from the style traits of kids-science cartoon channels: personified planets and objects with googly eyes, a sticker-like flat look, starry space. No characters, mascots, logos or titles are taken from any channel.

## The look in one paragraph
Everything has a face. Planets, the Sun, drops of water, cells, coins and clouds are round, flat-coloured shapes with a thick dark outline, big white googly eyes with black pupils and a simple mouth. They float, bob and bounce with squash and stretch, look at each other and talk (open-mouth swaps). Backdrops are simple: deep purple space with soft nebulae and twinkling stars, a flat sky, or a bright lab. Colours are saturated and friendly; there's no lighting beyond a soft shade on round bodies. A human presenter, if any, is a simple big-headed doodle kid.

## Characters
- Objects: family `faceobj` (`drawCharacter(g, { x, y, r, shape, fill, surface, expr, look, talk, blink, squash, accessory })`). Shapes `ball blob square drop star path`; surfaces `bands craters spots shade`.
- Planets: `planet(g, name, x, y, r, opts)` from `toons.js`: `sun mercury venus earth moon mars jupiter saturn uranus neptune` (Saturn gets its ring, the Sun its rays).
- Eyes are `googly` (pupils follow `look`); expressions as in every family. Change them on the beat of the words; keep eyes looking at whoever is talking.
- A presenter: `drawCharacter(g, { family: 'doodle', outfit: { kid: true, … } })`. The pack's `characters.head` (1.4) makes it big-headed. Families mix freely in one scene.
- Motion: bob (`Math.sin(t)`), arrive with `spring` + `squash`, orbit, spin. Nothing stays perfectly still.

## Sets and backgrounds
- `space(g, t, { colors: mood('space') })`: gradient, two or three nebulae, twinkling stars. Move nebulae positions per scene so space doesn't look copy-pasted.
- `sky` and `lab` moods: a flat background plus a ground strip. Keep props few and big.

## Graphics and typography
Rounded heavy title font (Baloo 2), outlined in ink for titles; `hud.js` counters and pills for numbers ("99.8%"). One number or title at a time.

## Camera and editing
Shots 2–4 s, cuts and gentle pushes, `whip` for jumps across the solar system. Small drift in every shot.

## Variants
- **bright — Bright Sticker:** vivid saturated colours, thick black outlines, deep purple space.
- **pastel — Soft Pastel:** pastel palette, softer navy outlines, gentle grain.

## Preferred story format
"What if…" science for kids, space facts, how-things-work explainers.

## Don't
No realistic textures or photos of planets. No scary imagery beyond cartoon peril. No thin outlines: every object has the same thick ink line.
