# Style pack: Cartoon Cutout

The look in words for this pack. It overrides `references/craft-bible.md` wherever the two differ. Engine values (palette, moods, variants, fonts) are in `style.json`. Working reference scenes: `examples/cutout-demo/`. Materials and puppets: `references/assets.md`.

## Source
Built from the style traits of sitcom-style finance and story cartoon channels: detailed TV-cartoon characters with thick outlines and cel shading, lip-flap mouths, expression swaps, outlined 2.5D rooms, glowing highlights on objects, bottom captions. No characters, mascots, logos or titles are taken from any channel or show; every character in this pack must be original.

## The look in one paragraph
Characters are drawn once as images (generated with our prompts, drawn by the user, or bought with a licence that needs no credit) and animated as cutout puppets: parts that rotate at the joints, eyes and mouths that swap with the words, whole-body poses for side characters. They act in outlined flat rooms (living rooms, offices, streets) with hard cel shadows and saturated TV colours. Comedy timing carries it: a line, a cut to the reaction, a held expression, a punchline with a sting. Objects being discussed glow; numbers pop as pills.

## Characters (family `cutout`)
- Every character is a puppet folder + `rig.json` (`loadPuppet`), see references/assets.md for the parts / sprites modes, the prompts, `sheet_cut.py` and `puppet.py`.
- Main characters: **parts** mode (they walk, point, gesture with every skeleton pose). Side characters, crowds and one-off cameos: **sprites** mode with 2–5 poses.
- Lip flap: pass `talk` (0–1) from the voice (`talkAmount`) or a flap curve while the character speaks; blink every 2–4 s; change `expr` on the beat of the words.
- When there is no art yet, the pack still works: draw people with `family: 'flat'` (outlined variant look) until the puppets are ready, then swap `puppet:` in.
- Scale: wide shots `s` 1.8–2.2, close-ups `characterCloseUp` radius 200–260. Keep one scale per character within a scene.

## Sets and environments
- Moods: `city office home park studio night`; sets from `engine/flat.js` (they follow the variant's outline and shade), or ready background plates with the same outline weight (references/assets.md, background prompt).
- Rooms are shallow stages: wall, floor line, one window or picture, 2–3 furniture props. Characters stand on the floor line `GY`.

## Line, colour and light
- Variant tokens `outline` 4–5 and `shade` ≈ 0.13 for code-drawn shapes; generated art must match (thick dark outline, one hard shadow). Regenerate any image that breaks the look instead of mixing.
- Saturated flat colours; glow (`F.highlight`) only for the object in focus.

## Camera and editing
2–4 s shots, cut on the line and on the reaction. Small pushes and `drift`, a quick zoom-in on a shocked face, `smash` cut for punchlines, `whip` for "meanwhile". No letterbox. Captions at the bottom suit this look (config `captions: true`).

## Shot mix
Wide of the room with both characters · single on the speaker with lip flap · reaction close-up · the object glowing with a price / number pill · a cutaway gag (sprite pose) · a chart on a monitor or board.

## Graphics and typography
Montserrat bold for pills, cards and captions; `H.pill`, `H.infoBox`, `F.lineChart`/`F.barChart` on a board or monitor, `F.icon`. Green for gains, red for losses (`S().ui.good` / `accent`).

## Variants
- **sitcom — Sitcom:** saturated TV-cartoon colours, thick dark outlines on sets and props, flat cel shading.
- **muted — Muted Indie:** desaturated warm palette, slightly softer outlines, light grain, a calmer storytelling cartoon.

## Preferred story format
Money and life-choice stories with recurring characters, "what happens if", short sitcom-style skits around a lesson.

## Don't
No lookalikes of known cartoon families or their characters, no prompts naming shows or characters. No mixing art from different generators or prompts in one cast. No photo backgrounds behind cartoon characters. No attribution-required images.
