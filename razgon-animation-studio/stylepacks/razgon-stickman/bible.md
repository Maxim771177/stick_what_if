# Style pack: Razgon Stickman

The look in words for this pack. It overrides `references/craft-bible.md` wherever the two differ. The engine-side values (palette, moods, variants, fonts, letterbox) are in `style.json` next to this file.

## The look in one paragraph
Pure black (`S().ink`) stick figures, each with a circle head and thick round-capped line limbs, carry a thin rim-light edge on the side facing the light. They act inside **low-key, cinematic, flat-shaded vector environments**: one strong light source per scene (a sunset window, a street lamp, stadium floodlights, a monitor), deep purple or navy shadows, warm amber highlights, soft glows, floating dust or rain, shallow depth of field (blurred foreground and background layers), a slow constant camera drift, letterboxed frames, film grain and a vignette. Characters are recognised by ONE coloured garment or accessory. Faces are minimal: white dot or ring eyes, a simple white mouth shape, and occasional brows. The rhythm is broken up with giant face close-ups that fill the frame, freeze-frame moments with particles hanging in the air, glowing animated numbers and charts, navy blueprint diagrams for explanations, and low-poly 3D shots that use the same figures and palette. The overall feel is "a stick-figure film lit by a cinematographer": simple shapes, sophisticated light.

## Characters (family `stick`)
- **Construction** (handled by `drawCharacter` → the stick rig): head circle r = 26 rig units, torso 15, limbs 11–13 with round caps, short forward-pointing foot stubs, no fingers at normal sizes. Hands and fingers appear only in insert close-ups (thick capsules).
- **Depth shading:** the near arm and leg are pure ink. The far arm and leg use `inkFar`, a dark purple-grey. That's automatic.
- **Rim light on every lit character:** pass `rim: { color: M.rim, dir: [dx, dy] }`, where `dir` points from the figure toward the light. Backlit by a window or sun behind → `[0, -1]`. Light from the left → `[-1, -0.3]`. Width 4–5 at 1080p. The rim is what makes black-on-dark readable, so never skip it.
- **Signature items** (exactly one strong colour per recurring character; keep it identical all video): red-orange hoodie `#d64a33`, yellow cap `#f2c21a`, pink beanie `#f29ac0`, green cap `#3fb950`, blue tee `#3a6ea5`, purple tracksuit `#8a5ad6`, white lab coat + round glasses (scientist), black trench + fedora + sunglasses (mysterious mentor or antagonist, often half in shadow), headband in any accent colour (athlete), ponytail or bun to add variety. Children: `kid: true` (72% size). Background people and crowds: plain ink with no colour item.
- **Outfit fields:** `top: hoodie|labcoat|trench|jersey|tshirt|suit|dress|tracksuit|none, color, color2, legs, head: cap|capBack|beanie|fedora|headband|visor|hood|ponytail|bun|curly|spiky|none, headColor, face: glasses|sunglasses, gloves, number, kid`.
- **Faces** are drawn on the side the figure faces (3/4 view). Expressions: `neutral, smile, happy, joy, surprised, shocked, scared, worried, nervous, angry, determined, sad, cry, smirk, sleepy, thinking, confused, awe`.
- **Scale:** wide shots `s` ≈ 0.8–1.2 (figures fill 15–25% of the frame height). Medium shots `s` ≈ 1.5–1.8. Emotional close-ups use `characterCloseUp` (radius 280–360 at 1080p, head slightly below centre, shoulders cropped by the frame bottom, with a rim crescent on the lit side).
- **Super-speed:** `trail: {count:4, dx:-40}` for afterimages.

## Sets and environments
- Built from **flat shapes and soft linear gradients**: no outlines, no photos, no clip-art, no emoji. Texture is limited to floor lines, window mullions, blinds and lit-window grids.
- **Value structure:** 60–75% of the frame is dark mid-tones (walls and floors from the mood, usually darkened with `shade(c, -0.3)`), with 1–3 bright accents (a window, lamps, screens, floodlights, a sunset). **Stage black figures in front of the brightest area** so their silhouettes read.
- **Windows are the signature element.** Large windows with mullions and a sky gradient behind (sunset, golden, or night with a skyline of lit windows), a sun or moon glow, sometimes blinds. Night streets have house facades with warm lit windows, steps, lamp posts with light cones, parked cars and trees as round silhouettes.
- Typical locations: labs, cafés, bedrooms (moonlight on the bed), kitchens, classrooms, offices, hospitals, locker rooms, stadiums (tiered crowd rows, floodlight rigs, giant screen), streets, rooftops, piers at sunset, roads at night, parks, airports, space.
- **Atmosphere in nearly every shot:** dust motes indoors (`FX.dust`), rain streaks for storms and night (`FX.rain`), frozen droplets or bubbles for time-stop (`FX.drops`), stars in night skies, a lens streak across bright sources (`FX.lensStreak`), god rays from suns and windows (`FX.godRays`), and soft fog bands.

## Light and colour
- Moods in this pack: `day | golden | dusk | night | storm | interiorWarm | interiorCool | void`. Tense or scary beats go darker and cooler (night/storm/interiorCool), triumphant or tender beats go warm (golden/dusk/interiorWarm), explanations use `void`/blueprint.
- **One key light per shot.** Show it (a sun, lamp or window) and spill it: `glow()` around the source, `FX.pool()` on the floor under it, `FX.lightCone()` from lamps, `FX.godRays()` from windows and suns.

## Shot mix for this pack
Use all of these across a video, roughly in these proportions: establishing wide 10% (often 3D) · medium two-shot 25% · over-the-shoulder 10% · **giant face close-up 10–15%** · insert/macro 10% · top-down diagram 5% · **freeze frame / time-stop 1–3 per video** (particles hanging in the air, a cool tint, a corner badge `100x`, slow rings, only the hero moving; enter with `flash` + `freeze` SFX) · **3D orbit / fly-through about 1 per minute** · data cards as needed · **navy blueprint diagram** for the explanation segment (navy grid, light-blue line art, gold highlights) · glowing caps title card over a cinematic wide · end screen (question in serif italic, comment bubble, subscribe pill, the cast lined up).

**Letterbox:** `wide` (2:1) is the default in 16:9. `scope` (2.39:1) for drama: the title, freezes, climaxes and intense close-ups. `none` for full-frame UI or blueprint.

## Graphics and typography
- **Fonts:** Fredoka Bold for titles and big lines (ALL CAPS, letter-spaced, warm glow). Nunito Black for labels and numbers. Playfair Display Black Italic for the end-screen question.
- **Colours:** gold `S().ui.gold` for key numbers, coral `ui.accent` for alarming values, cream `ui.cream` for labels, blueprint blue `ui.blueprint`.

## Variants (colour treatments, `style` in config.json)
- **dusk — Cinematic Dusk:** mauve-purple shadows, amber key light, cream rim light (the reference look).
- **midnight — Midnight Blue:** cold navy, blue-white rims, sodium-orange practicals; good for night, rain, thrillers.
- **golden — Golden Hour:** warm orange-and-teal, big sun glows; uplifting and nostalgic.
- **neon — Neon Noir:** deep blacks, magenta and teal rims, strong bloom; sci-fi, tech, crime.
- **storybook — Soft Storybook:** lighter pastel, low contrast; family-friendly.

## Preferred story format
"What if…?" narratives fit this pack best (see `references/story-formats.md`), but explainers, history and documentaries work with the same vocabulary.

## Don't (in addition to the craft bible)
No realism, gradients on characters, thick outlines, photos, emoji, clip-art or flat white backgrounds (except flashes). No figures without rim light in lit scenes. No outfit colour changes.
