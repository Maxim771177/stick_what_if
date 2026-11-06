# Style pack: Flat Explainer

The look in words for this pack. It overrides `references/craft-bible.md` wherever the two differ. Engine values (palette, moods, variants, fonts) are in `style.json`. Working reference scenes: `examples/flat-demo/`.

## Source
Built from the style traits of big infographic and science explainer channels: flat-vector people with big heads and dot eyes, hard-edged cel shading, 2.5D stylised cities, offices and homes, info cards, charts, glowing highlights, liquid transitions. No characters, mascots, logos or titles are taken from any channel.

## The look in one paragraph
Clean flat-vector people (filled bodies and limbs, a big round head ≈ 1/4 of the body, dot eyes, simple mouth) stand in tidy 2.5D sets made of flat shapes: city streets with rows of buildings, offices with desks and monitors, living rooms with a window and sofa, parks. Light is suggested by one hard-edged darker side on every shape (cel shade), never by gradients on characters. Colours are muted backgrounds (lilac, slate, sand) with one or two bright accents for what matters. Graphics are part of the world: charts on boards and monitors, icons popping above heads, a glowing outline on the object being discussed, date / place cards. Energy comes from 2–4 s cuts, constant small camera moves, pops on the beat of the words and the occasional liquid or push transition.

## Characters (family `flat`)
- `drawCharacter` / `characterCloseUp` / `characterHead`; the pack sets `characters.head` = 1.15.
- Outfit: `skin, build: slim|average|heavy, top: tshirt|shirt|suit|hoodie|dress|coat|uniform|tank, color, color2 (tie/trim), legs, skirt, shoes, hair: none|short|side|long|bun|ponytail|curly|afro|mohawk|balding, hairColor, beard, mustache, hat: cap|hardhat|police|beanie|tophat, hatColor, glasses, kid`.
- Tell characters apart by silhouette first (build, hair, hat), then colour. Give each a signature colour that never changes.
- Expressions: the shared names (`neutral smile happy surprised shocked worried sad angry determined smirk thinking confused …`); props in hand: `phone briefcase money clipboard cup pointer`.
- Scale: wide shots `s` 1.6–2.0 (characters ~45–55 % of frame height), crowds 0.9–1.2, close-ups `characterCloseUp` radius 200–280.

## Sets and environments
- Moods (`mood(name)`): `city office home park night studio`, keys `sky[] bg ground wall floor trim accent dark buildings[]`.
- `engine/flat.js`: `sky ground sun cloud building city house road car truck tree bush`, interiors `room → {GY} windowPane(…, {fn}) door picture desk chair monitor(…, {fn}) sofa plant`, graphics `board(…, fn) lineChart barChart highlight icon`. Windows, monitors and boards take a `fn` to draw a view or a chart inside.
- Build each location once in `scenes/sets/` and reuse it; 2.5D depth = back row of buildings at parallax 0.4–0.6, street and characters at 1.0, a soft foreground prop now and then.
- Ready background plates (generated or the user's) can replace code sets: references/assets.md.

## Line, colour and light
- Variant tokens: `outline` (0 = no outlines, 4–5 = bold cartoon), `shade` (cel-shade strength). Everything from `flat.js` and `rig-flat.js` follows them, so one scene works in every variant. Draw extra shapes with `inkShape`/`inkEllipse` using `S().outline`.
- Flat fills; the only gradients are skies and the `nutshell` variant's grade. Accent colours from `S().ui` (`accent`, `good`, `gold`) for the one thing in focus.

## Camera and editing
2–4 s shots. Every shot moves a little (`camPath` push or pan, `drift`). Pops and slams land on words (`wordTime`). Transitions: hard cuts by default, `liquid` or `push` between topics, `whip` for "meanwhile", `smash` for a punchline. No letterbox.

## Shot mix
Wide establishing of the place with a date / location card · two-shot conversation · close-up reaction with an icon popping · the character at a board or monitor with a growing chart · a crowd or city to show scale · a glowing highlight on the object being explained · a number or verdict card.

## Graphics and typography
- Montserrat for titles and UI (bold, caps for cards), Caveat for handwritten notes on boards.
- `hud.js` (`infoBox`, `counter`, `pill`, `checklist`, `bar`), `ui2d.js` cards, `flat.js` charts and icons. Keep text short: a title, a number, a label.
- Pop everything in on its word with a small overshoot and a `pop`/`blip` SFX.

## Variants
- **infographic — Infographic:** no outlines, flat fills, soft cel shading, muted lilac / slate palette with bright accents.
- **outlined — Bold Outline:** thick dark outlines around every shape, brighter colours, crisp cartoon look.
- **nutshell — Rich Nutshell:** deep saturated purples and teals, soft gradients, glow and fine grain, a richer science-explainer feel.

## Preferred story format
Explainers, "what would happen if", money and career stories, top-N, history in modern settings.

## Don't
No rim light or gradients on characters. No mixing outlined and outline-free shapes in one frame. No hard-coded colours outside `mood()`/`S()`/the cast. No text walls. No lookalikes of other channels' characters.
