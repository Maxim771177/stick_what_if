# Style pack: Map Story

The look in words for this pack. It overrides `references/craft-bible.md` wherever the two differ. Engine values (palette, map colours, variants, fonts) are in `style.json`. Working reference scenes: `examples/map-demo/`.

## Source
Built from the style traits of animated map channels (evolution of countries, "only one survives" scenarios, country rankings): flat maps, personified countries, game-like counters. Map data is Natural Earth (public domain). No characters, logos or titles are taken from any channel.

## The look in one paragraph
A clean flat world map (sea, land, thin borders) is the stage for the whole video. The camera flies and zooms between places; countries light up, fill with their flags, merge into empires and shrink back. Countries are characters: round countryballs painted with their flag (thick outline, white eyes without pupils, expressive eyelids) bounce onto the map and react, or a face sits right on a country or empire. A game interface frames everything: a day / year counter, a "countries left" or population number, a dark info box at the bottom with place and date. Shots are short (1–4 s) and the map is always moving a little.

## Characters (family `faceobj`)
- Countryballs: `drawCharacter(g, { x, y, r, flag: 'France', expr, look, talk, blink, squash, accessory })`. `flag` takes any country name the map knows; `flags.js` has simplified flags for ~100 countries (others get a stable plain colour; add a spec if a flag matters).
- Eyes are `ball` style (white ovals, no pupils); emotion comes from eyelids: `angry determined sad worried scared nervous sleepy smirk happy joy thinking confused`, plus `surprised / shocked / awe` (bigger eyes). Mouth on (`characters.mouth`), off per call with `mouth: false`.
- Accessories: `helmet crown tophat cap glasses` (war, king, rich, sport, smart).
- A face on a region: `faceOn(g, x, y, r, { expr, lidColor })` from `rig-faceobj.js`, at `M.anchor(name).xy`.
- Size balls against the map: r 60–90 at country scale, 200–260 for close-ups (`characterCloseUp`). Land them with `spring` and `squash`.

## The map (engine/map.js)
- `const M = geo({ projection, center, zoom })` per frame; animate the camera with `flyTo(t, keys)` and frame places with `fit([names])`.
- Projections: `natural` for the world, `mercator` for regional close-ups if you prefer straight latitudes, `globe` for spinning-Earth and ocean-crossing shots.
- Draw order: `M.world(g)` → highlighted countries (`M.country(g, name, { fill | flag, alpha })`) → empires / blocs (`M.union(g, names, { fill })`) → custom regions (`M.region(g, [[lon, lat]…])` for historical borders that don't follow modern countries) → routes (`M.route(g, coords, { progress })`) → dots and labels → characters → HUD.
- Facts first: borders, dates, populations and routes must match the script and real history. When a historical border isn't a set of modern countries, draw it with `M.region` from real coordinates rather than approximating with modern countries, and say in the plan where a shape is simplified.

## Interface (engine/hud.js)
`header(['DAY 3'])`, `counter(str, x, y, { label, bg })` with `tick()` for ticking numbers and `year()` for BC / AD, `infoBox(title, sub)`, `pill(str)`, `bar(v)`, `checklist(items)`. The `hud` font role is a pixel font in this pack; keep HUD text short and in caps.

## Camera and editing
Hard cuts and `push` / `whip` between regions; inside a shot the map keeps a slow drift or zoom. Year jumps can be a fast cut with an `impact` and a `tick` SFX.

## Shot mix
World establishing flight · country / region close-up with highlight · countryballs reacting on the map · empire growing / shrinking with ticking year · route or invasion arrow · close-up countryball reaction · ranking or data card with counters.

## Variants
- **classic — Classic Atlas:** light blue sea, warm cream land, white borders, bright flags.
- **dark — War Room:** dark navy sea, slate land, blue borders, red alerts; wars, outbreaks, survival scenarios.
- **parchment — Old Parchment:** sepia sea, paper land, paper texture, handwritten labels; history and evolution of empires.

## Preferred story format
History / evolution of countries, "what if / only one survives" scenarios, top-N rankings of countries.

## Don't
No 3D terrain or satellite imagery. No real political party logos or leaders' faces. No invented borders presented as real.
