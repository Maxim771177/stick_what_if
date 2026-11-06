# Style pack: Doodle Explainer

The look in words for this pack. It overrides `references/craft-bible.md` wherever the two differ. Engine values (palette, moods, variants, fonts, line tokens) are in `style.json`. Working reference scenes: `examples/doodle-demo/`.

## Source
Built from the style traits of hand-drawn history/psychology explainer channels: big-headed outlined doodle people, nearly empty flat backgrounds, marker titles, paper texture. No characters, mascots, logos or titles are taken from any channel.

## The look in one paragraph
Simple doodle people with a big round head (white or skin-coloured, thick dark outline), dot eyes, a single-stroke mouth and stick limbs, wearing one outlined piece of clothing in a flat colour. They stand on flat colour fields: a single horizon line, a plain off-white board, a brown cave wall. No lighting, no gradients on characters, no shading: just fill + outline. Everything (people, props, titles, arrows, icons) shares one line quality from the variant. Titles are hand-lettered marker caps; labels are handwriting. Energy comes from cutting (2–3 s shots), pops, scribbled underlines and arrows, thought bubbles and small camera pushes, not from rendering.

## Characters (family `doodle`)
- Draw with `drawCharacter` / `characterCloseUp` / `characterHead`; the pack sets `characters.head` = 1.25 (big heads: head ≈ 1/3 of body height).
- Outfit: `skin, top: none|tshirt|shirt|hoodie|dress|fur|labcoat|suit|robe, color, color2, legs, shoes, hair: none|short|messy|spiky|curly|long|ponytail|bun, hairColor, beard, hat: cap|beanie|headband|hardhat, hatColor, face: glasses, kid`.
- The default narrator is the plainest figure (`top: 'none', hair: 'none'`): a white head and stick body. Story characters are told apart by hair + clothing (e.g. a messy-haired, bearded caveman in a fur tunic).
- Expressions are the same names as every family (`neutral smile happy joy surprised shocked scared worried nervous angry determined sad cry smirk sleepy thinking confused awe`), with dark features on the light face. Change them on the beat of the words.
- Props in hand: `prop: 'spear'|'torch'|'stone'|'phone'|'book'|'cup'|'pointer'|'sign'` (or `{type, hand:'B', color}`).
- Scale: wide shots `s` 1.4–1.8 (characters are big in this look, ~40–55% of frame height), two-shots 1.6–1.8, close-ups `characterCloseUp` radius 260–340.

## Sets and environments
- Flat colour fields from `mood()`: `plain` (off-white board), `savanna`, `cave`, `night`, `interior`, `board`. Keys: `bg, sky[], ground, grass, wall, floor, prop, dark`.
- Build with `engine/doodle.js`: `plain horizon sun cloud bush tree rock mountain grass campfire cave`. Keep backgrounds sparse: one horizon line and 2–4 props. Empty space is part of the look.
- Parallax still applies (sky 0.15, hills 0.5, ground/characters 1.0) but camera moves are small.

## Line and colour
- One line for everything, from the variant's `line` tokens (`width`, `wobble`, `boil`) via `engine/ink.js` (`inkShape inkCircle inkEllipse inkRect inkLine inkTube inkBlob`). Never draw an outline with raw canvas strokes in this pack, or it won't wobble with the rest.
- Flat fills only. Accent colours (`S().ui.accent` coral, `ui.gold`) for the one thing that matters in the frame.

## Camera and editing
Shots 2–3 s, hard cuts, occasional `push`/`whip` between places. Small pushes (z 1.0 → 1.06) and `drift`; a little `impact` shake when a question or verdict pops. No letterbox.

## Shot mix
Narrator on a plain board · wide establishing of the place/era with a marker date label · close-up reaction (`characterCloseUp`) with a popped icon · character doing the thing (scratching, carrying, building) · two-shot of "then vs now" figures · diagram on the board with arrows, tallies, numbers and icons. Signature devices: thought bubble with an icon inside, scribbled underline under the key word, marker date labels ("40,000 YEARS AGO").

## Graphics and typography
- `D.marker(g, str, x, y, {size, color, rot, t, start})` for titles and labels (Permanent Marker), `FONTS.ui` (Patrick Hand) for small handwriting, `FONTS.serif` (Caveat) for quotes.
- `D.bubble` (speech / thought), `D.arrow`, `D.underline`, `D.tally`, `D.icon(name)`: `bulb clock fire check cross heart star question coin`. Draw any other icon or prop with the ink primitives in the same line.
- Pop everything in on its word (`t`, `start`), with a `pop`/`blip` SFX.

## Variants
- **clean — Clean Marker:** crisp thick black outlines, white faces, off-white backgrounds, bright flat accents.
- **paper — Paper Sketchbook:** warm paper texture over everything, softer brown-black ink with a hand-drawn wobble, muted sage / ochre / beige.
- **sketch — Living Sketch:** graphite pencil line that gently re-draws itself (line boil) on white paper.

## Preferred story format
History / "how did humans…" explainers and psychology explainers; works for any explainer or top-N.

## Don't
No gradients, glows, rim light or lighting on characters. No busy backgrounds. No thin vector-clean lines mixed with wobbly ones. No hard-coded colours outside `mood()`/`S()`. No text walls: one marker line at a time.
