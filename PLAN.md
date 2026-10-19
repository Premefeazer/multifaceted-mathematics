# Multifaceted Mathematics — Landing Page Plan

> **Status:** Phase 0 done, Phase 1 built and waiting for Checkpoint 1 review · updated 2026-10-19
> This file is both the plan and the tracker. Tick the checkboxes as each step finishes.
> **Language rule:** everything on disk (docs, code, comments, commits) is English. Thai is for chat only.

## 1. Goal

A single-page landing site, fully in English, for an interactive math-learning platform in the style of Duolingo / Brilliant.

- Light-blue theme, modern, energetic, eager.
- Every pattern and animation must have a job. No decoration for its own sake.
- Must not look like a template or AI slop.
- **No** log in / sign up for now.

**Success test:** a visitor understands within 10 seconds that "you learn math by doing it here", and has tried a real puzzle within a minute.

## 2. Decisions made

| Topic | Decision | Consequence |
|---|---|---|
| Audience | Middle and high school students (~12–18) | Direct, short copy. Playful but not childish. Topics from algebra to intro calculus. |
| Main CTA | **Try a puzzle** → scrolls to the playable puzzles on the page | No backend, no user data collected. |
| Tech | Plain HTML / CSS / JS, no build step | No dependencies. Deploys as static files anywhere. |
| Visual identity | Geometric polyhedra, no mascot | The 20-face icosahedron is both the mark and the hero. |
| Logo | None exists yet | Design a simple icosahedron mark + wordmark. Replaceable later. |
| Footer | One copyright line, no links | Links and socials come later. |

**Tone (updated 2026-10-19):** professional and a little fancy, in the spirit of Brilliant. Not childish, not game-like. Calm surfaces, hairline borders, soft shadows, one confident hero object.

## 3. Concept — *See math from every side.*

*Multifaceted* means "many-sided". One problem can be seen as numbers, an equation, a graph, or a shape.

- **Symbol:** the icosahedron (20 faces, like a d20 die). Each face stands for one branch of math.
- **Every pattern comes from real math:** graph paper, function curves, tiled triangles. No floating blobs or random gradients.
- **The page teaches by letting you try**, not by listing features.

## 4. Design direction

### 4.1 Color — custom palette anchored on light blue

Starting OKLCH values. They get tuned for real at Checkpoint 1.

| Token | Value | Used for |
|---|---|---|
| `--color-paper` | `oklch(96.5% 0.022 228)` | Main background (light blue) |
| `--color-sheet` | `oklch(99.5% 0.004 230)` | Puzzle sheet / cards |
| `--color-sky` | `oklch(85% 0.09 232)` | Brand blue: facets, highlights |
| `--color-sky-deep` | `oklch(62% 0.15 248)` | Grid lines, focus rings, active state |
| `--color-ink` | `oklch(24% 0.07 258)` | Main text and primary buttons (deep navy) |
| `--color-ink-soft` | `oklch(46% 0.05 256)` | Secondary text |
| `--color-accent` | `oklch(72% 0.18 48)` | Orange: one highlight only (the active facet, the headline curve) |
| `--color-spark` | `oklch(88% 0.16 95)` | Yellow: stars in puzzles |
| `--color-correct` | `oklch(76% 0.15 160)` | Correct answer (mint) |
| `--color-wrong` | `oklch(64% 0.2 20)` | Wrong answer |

Rules:
- Blue is the brand ground. Navy replaces black.
- Primary buttons are solid navy with white text (16:1 contrast). Orange is a single highlight, never a button fill, so the page reads as refined rather than playful.
- Correct / wrong always come with an icon and text, never color alone.

### 4.2 Typography (all free on Google Fonts)

| Role | Font | Why |
|---|---|---|
| Headings | **Manrope** (700–800) | Clean, modern grotesk with tight tracking: professional, close to Brilliant's look. (Gabarito was dropped on 2026-10-19: too playful.) |
| Body | **Atkinson Hyperlegible Next** | Built for maximum legibility. Tells 1 / l / I and 0 / O apart, which matters for math. |
| Numbers / equations | **Atkinson Hyperlegible Mono** | Equations, slider values, numbers that must line up. |

All three families were confirmed to exist on Google Fonts on 2026-10-19 (Atkinson Hyperlegible Next / Mono, Manrope).

Rules: headings are always upright, never italic. Hero headline is 7 words or fewer. Equations use the browser's built-in MathML, so no KaTeX download.

### 4.3 Patterns and animation — 5 signature moves

1. **Hero icosahedron** — drag to spin with inertia, slow auto-rotation when idle, tap a face to see which branch it is. One orange face marks "the facet you're learning".
2. **Graph-paper sky** — a very faint blue grid that fades out toward the edges, plus a thin curve that draws itself under the words *every side* (plays once).
3. **Refined buttons** — solid navy pills with a soft shadow, a small lift on hover, an arrow that nudges forward, and a gentle press on click. Hairline borders and soft shadows everywhere instead of thick outlines.
4. **Puzzle feedback** — progress bar fills, a star lights up when the line passes through it, a wrong answer shakes gently with a hint.
5. **Facet strip** — a strip of triangles (the net of an icosahedron) that flip to reveal each topic on hover / focus / tap.

Motion rules:
- Animate only `transform` / `opacity`, with one shared easing set. One exception: the headline curve draws itself once with `stroke-dashoffset` (a tiny SVG, plays a single time).
- No fade-up on scroll for every section (the most common AI-slop tell).
- Respect `prefers-reduced-motion`: no auto-spin, no self-drawing line, but the user can still drag.
- The canvas stops rendering when scrolled off-screen.

### 4.4 Copy voice

- Talk to teenagers like a sharp, respectful mentor: direct, short, confident and precise. Never childish, never corporate.
- Use concrete verbs: *drag, tilt, test, break, figure out*.
- Banned phrases: *Unlock your potential · Revolutionize · Seamless · Empower · Journey · Dive in · Master math effortlessly*
- No invented numbers, reviews or logos (*"Trusted by 10,000 students"*). With no real users yet, we claim nothing.

| Where | Example |
|---|---|
| Hero | **See math from every side.** |
| Sub | Hands-on puzzles for middle and high school math. Drag it, test it, figure it out. |
| Correct | That's the one. |
| Wrong | Too steep — try a smaller slope. |
| Closing | Every problem has another side. |

## 5. Page structure

```text
┌──────────────────────────────────────────────────────────────┐
│ <> Multifaceted Mathematics    Facets  How it works  [Try >] │  0  Nav · floating pill
├──────────────────────────────────────────────────────────────┤
│ See math from                                  ______        │  1  Hero · text left, icosahedron right
│ every side.                                   /\    /\       │
│ ~~~~~~~~~~~ <- curve draws itself            /  \  /  \      │
│                                             /____\/____\     │
│ Hands-on puzzles for middle and             \    /\    /     │
│ high school math. Drag it, test it.          \  /  \  /      │
│                                               \/____\/       │
│ [Try a puzzle]   Explore the facets ->      drag to turn     │
├──────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────┐ │  2  Try it · 3-step puzzle on a graph-paper sheet
│ │ [====|    |    ]  1/3   Line it up                       │ │
│ │                                                          │ │
│ │  +----------+   slope m        ---o-----                 │ │
│ │  |       *  |   intercept b    -----o---                 │ │
│ │  |     /    |   y = 1x + 1                               │ │
│ │  |   *      |                              [ Check ]     │ │
│ │  +----------+                                            │ │
│ │                                                          │ │
│ └──────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────┤
│  /\  /\  /\  /\  /\  /\  /\  /\     8 facets of math         │  3  Facets · triangle strip, tap to flip
│ /__\/__\/__\/__\/__\/__\/__\/__\                             │
├──────────────────────────────────────────────────────────────┤
│ +---------------------+                                      │  4  How a lesson works · real UI, annotated
│ | What is 3/4 of 8?   |  <- One idea per screen              │
│ |  [ 4 ]  [ 6 ]  [ 2 ]|  <- You try first, we explain after  │
│ |  Need a hint?       |  <- Hints, not answers               │
│ +---------------------+                                      │
├──────────────────────────────────────────────────────────────┤
│ Now ---------------- Next ---------------- Later             │  5  What's next · honest roadmap
│ puzzles here         full lessons          accounts          │
├──────────────────────────────────────────────────────────────┤
│ Every problem has another side.               [Try a puzzle] │  6  Closing + footer
│ © 2026 Multifaceted Mathematics                              │
└──────────────────────────────────────────────────────────────┘
```

| # | Section | Job | Details |
|---|---|---|---|
| 0 | Nav — floating capsule | Get around | Mark + wordmark · *Facets* · *How it works* + **Try a puzzle** button. On mobile: mark + button only (no hamburger). |
| 1 | Hero | Say who we are in 10 seconds | Headline left, draggable icosahedron right, asymmetric layout. On mobile: headline first, shape below. |
| 2 | Try it | Let people try the real thing — the heart of the page | 3 puzzles from 3 branches on a graph-paper sheet, with a progress bar (see 5.1). |
| 3 | Facets | What you can learn | Strip of 8 triangles, tap to flip to a thought-provoking question (see 5.2). |
| 4 | How a lesson works | Explain the method instead of a feature grid | A lesson screen built from real HTML (no fake phone frame) plus callouts: *One idea per screen* · *You try first, we explain after* · *Hints, not answers* · *Five minutes, tops*. |
| 5 | What's next | Honest status, and why there is no login yet | *Now:* puzzles right here → *Next:* full lessons for all 8 facets → *Later:* accounts, streaks, progress. Replaces fake reviews / stats. |
| 6 | Closing + footer | End with momentum | Big line *Every problem has another side.* + button. Footer is one © line, no links. |

### 5.1 Try it — three puzzles (the heart of the page)

| # | Branch | How you play | Passes when |
|---|---|---|---|
| **1. Line it up** | Functions & Graphs | Move sliders for slope *m* and intercept *b* so the line passes through 2 stars. The equation `y = mx + b` updates live. | The line hits both stars, then press Check. |
| **2. The 180° trick** | Geometry | Drag the corners of a triangle. The three angle values update. | Answer *"What do the angles always add up to?"* → 180°. |
| **3. Fair or not?** | Probability | Simulate flipping a coin 10 / 100 times and watch the share of heads. | Answer *"With lots of flips, heads gets close to…"* → 1/2. |

- After all 3: *3 for 3 — you just saw three sides of math.* + a link to What's next.
- Wrong answers get a hint specific to the mistake (e.g. *Too steep — try a smaller slope.*), not just "Wrong".
- Accessibility: sliders are `<input type="range">`. Triangle corners move with arrow keys. Results are announced through `aria-live`.

### 5.2 Facets — 8 branches (draft)

| Facet | Symbol | Thought question |
|---|---|---|
| Number Sense | √ | Why is 0.999… exactly 1? |
| Algebra | x | Why is a negative times a negative positive? |
| Geometry | △ | Why do a triangle's angles always add to 180°? |
| Functions & Graphs | f(x) | What does a slope actually measure? |
| Trigonometry | θ | How tall is a tree you can't climb? |
| Probability & Statistics | % | After five heads in a row, is tails "due"? |
| Sequences & Series | Σ | Can infinitely many steps cover a finite distance? |
| Calculus Basics | ∫ | How fast is a falling ball at exactly one second? |

Every facet carries an honest *Coming soon* label.

## 6. Files and technique

```text
Multifaceted Mathematics/
├── index.html
├── css/
│   ├── tokens.css       colors, fonts, spacing, easing — change the design here only
│   └── styles.css
├── js/
│   ├── geometry.js      pure icosahedron math (no DOM, unit-tested)
│   ├── polyhedron.js    canvas 2D: shading, drag, inertia, tap-to-pick
│   ├── facets.js        the 8 branches of math, shared by hero and Facets section
│   ├── main.js          wires the page together
│   └── puzzle.js        (Phase 2) puzzle logic
├── tests/
│   └── geometry.test.js pure-logic tests, run with `node --test`
├── assets/mark.svg      logo mark and favicon (generated from the real geometry)
├── .claude/launch.json  preview server config for the Claude app
└── PLAN.md
```

- **No dependencies:** the icosahedron is about 150 lines of our own code instead of Three.js (~150 KB gzip). Much lighter and fully controllable.
- **Run locally:** `python -m http.server 5173`, then open <http://localhost:5173>. Opening the file directly will not work with ES modules.
- **Browsers:** current Chrome / Edge / Safari / Firefox. `oklch()` and MathML work in all of them.
- **Non-UI logic** (geometry, answer checking) lives in pure functions, testable with `node --test` without a browser.

## 7. Work order

**How we work:** every phase = build → check in the browser pane at desktop and mobile → you review → fix → next phase. Commit to git when you approve each phase.

- [x] **Phase 0 — Setup:** `git init` · file structure · `tokens.css` · fonts · launch config for in-app preview
- [x] **Phase 1 — Nav + Hero + icosahedron** (built, awaiting review) → **Checkpoint 1:** colors, fonts, overall feel (the cheapest point to change direction)
- [ ] **Phase 2 — Puzzle 1 "Line it up"** with every state → **Checkpoint 2:** does it feel like Duolingo / Brilliant yet?
- [ ] **Phase 3 — Facets · How a lesson works · What's next · Footer**
- [ ] **Phase 4 — Puzzles 2–3** + motion polish
- [ ] **Phase 5 — QA:** responsive at 320 / 375 / 414 / 768 / 1024 / 1440 · keyboard + screen reader · reduced motion · Lighthouse · section 8 checklist · meta / OG image / favicon
- [ ] **Phase 6 (optional) — Deploy** to GitHub Pages or Netlify (your own account)

## 8. Definition of done

**Must have**
- [ ] Every color and font references a token in `tokens.css`. No hard-coded values.
- [ ] Spacing uses a 4 pt scale.
- [ ] Contrast passes WCAG AA (normal text ≥ 4.5:1, large text ≥ 3:1) and focus rings are clearly visible.
- [ ] Every button / control has: default · hover · focus-visible · active · disabled (+ loading / error / success where relevant).
- [ ] At 320 px there is no horizontal scroll and button text never wraps to two lines.
- [ ] The whole page, including puzzles, works with the keyboard alone.
- [ ] Reduced-motion mode is fully usable.
- [ ] Lighthouse: Performance and Accessibility ≥ 95 · total JS around 30 KB or less.

**Must not have (AI-slop tells)**
- [ ] Purple-blue gradients, gradient text, glassmorphism, glowing blobs
- [ ] Default fonts such as Inter / Roboto / Poppins / Montserrat
- [ ] Emoji used as icons, three icon-in-rounded-box cards
- [ ] Invented numbers, reviews or logos
- [ ] Fake phone frames or fake browser bars
- [ ] Italic headings, or a single italic word inside a heading
- [ ] Tiny labels like "01 · FEATURES" above every section
- [ ] Fade-up on scroll for every section
- [ ] Everything centered / a grid of identical cards
- [ ] A four-column footer whose links go nowhere

## 9. Not now

Log in / sign up · user accounts · backend / database · real lessons beyond the sample puzzles · dark mode · Thai / other languages · analytics and cookie banner · pricing · blog

## 10. Risks and mitigation

| Risk | Mitigation |
|---|---|
| A hand-written polyhedron may need several tuning passes to look good | Built first in Phase 1 so it is visible as early as possible. |
| Light blue + white risks looking generic | A strong hero object (the faceted shape), graph-paper detail, tight type, and one orange highlight. |
| Atkinson Hyperlegible Next / Mono might be missing from Google Fonts | Checked in Phase 0: all three families exist. Fallback would be the original Atkinson Hyperlegible. |
| Dragging triangle corners (puzzle 2) is hard by keyboard | Arrow-key movement plus angle values announced via `aria-live`. |

## 11. Decided

- The hero image is the icosahedron (20 faces). No mascot.
- No logo exists, so a simple icosahedron mark + wordmark is designed here (`assets/favicon.svg`, used in the nav). Replaceable later.
- The footer is one copyright line with no links and no socials.
