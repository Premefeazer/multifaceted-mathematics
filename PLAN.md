# Multifaceted Mathematics — Landing Page Plan

> **Status:** Every section of the landing page is built and QA'd (Phase 4, 2026-10-19). Phases 0–3 are committed; the QA fixes are waiting for review. Remaining: optional deploy, and a real-device check (see 12).
> This file is both the plan and the tracker. Tick the checkboxes as each step finishes.
> **Language rule:** everything on disk (docs, code, comments, commits) is English. Thai is for chat only.

## 1. Goal

A single-page landing site, fully in English, for an interactive math-learning platform in the style of Brilliant.

- Light-blue theme. Professional and a little fancy, not childish.
- Every pattern and animation must have a job. No decoration for its own sake.
- Must not look like a template or AI slop.
- **No** log in / sign up for now.
- **No** lesson content yet. The page shows what will be taught, honestly marked *Coming soon*.

**Success test:** a visitor understands within 10 seconds that this is interactive math learning, and can see which topic they would start with.

## 2. Decisions made

| Topic | Decision | Consequence |
|---|---|---|
| Audience | Middle and high school students (~12–18) | Direct, short copy. Topics are explained through questions a teenager can feel. |
| Main CTA | **Explore topics** scrolls to the topic cards | No backend, no user data collected. |
| Content on the page | Topic cards only, all *Coming soon* (decided 2026-10-19) | Lesson writing is a separate, later project. |
| Topics | Logic · Set Theory · Real Numbers · Functions & Relations · Number Theory · Combinatorics · Sequences & Series · Calculus Basics | Ordered so each builds on the last. Logic and Set Theory come first because everything else rests on them. |
| Tech | Plain HTML / CSS / JS, no build step | No dependencies. Deploys as static files anywhere. |
| Visual identity | Geometric polyhedra, no mascot | The 20-face icosahedron is the mark and the hero. |
| Logo | None existed | A simple icosahedron mark + wordmark was designed here (`assets/mark.svg`). Replaceable later. |
| Footer | One copyright line, no links | Links and socials come later. |

## 3. Concept — *See math from every side.*

*Multifaceted* means "many-sided". The hero shape has 20 faces, and 8 of them stand for the 8 topics. Tap a face and it tells you which one. The orange face is the first topic, Logic, and the Logic card carries the same orange.

- **Every pattern comes from real math:** graph paper, a unit circle with axes, a faceted solid. No floating blobs or random gradients.
- **The page invites you in with questions**, not feature lists.

## 4. Design direction

**Tone (updated 2026-10-19):** professional and a little fancy, in the spirit of Brilliant. Not childish, not game-like. Calm surfaces, hairline borders, soft shadows, one confident hero object.

### 4.1 Color

All values live in `css/tokens.css`. OKLCH.

| Token | Value | Used for |
|---|---|---|
| `--color-paper` | `oklch(96.5% 0.022 228)` | Main background (light blue) |
| `--color-sheet` | `oklch(99.5% 0.004 230)` | Cards |
| `--color-sky` | `oklch(85% 0.09 232)` | Brand blue |
| `--color-sky-deep` | `oklch(62% 0.15 248)` | Grid lines, focus rings |
| `--color-ink` | `oklch(24% 0.07 258)` | Text and primary buttons (deep navy) |
| `--color-ink-soft` | `oklch(46% 0.05 256)` | Secondary text |
| `--color-accent` | `oklch(72% 0.18 48)` | Orange: one highlight only (the first-topic face, the Logic tile, the headline curve) |
| `--facet-1` … `--facet-5` | blue ramp | Shading of the polyhedron faces and the topic tiles |

Rules:
- Primary buttons are solid navy with white text (16:1 contrast). Orange is never a button fill.
- Contrast checked on 2026-10-19: ink on paper 15:1, ink-soft on paper 6.5:1, white on navy 16:1.

### 4.2 Typography (all free on Google Fonts, confirmed to exist)

| Role | Font | Why |
|---|---|---|
| Headings | **Manrope** (700–800) | Clean modern grotesk with tight tracking. Professional. |
| Body | **Atkinson Hyperlegible Next** | Built for legibility. Tells 1 / l / I and 0 / O apart, which matters for math. |
| Numbers / code-like text | **Atkinson Hyperlegible Mono** | The hero hint and the footer. |
| Math symbols in tiles | System math fonts (Cambria Math, STIX, Segoe UI Symbol) | The web fonts above do not carry symbols such as ∈ ℝ ≡. |

Rules: headings are always upright, never italic. The hero headline is 7 words or fewer. Equations use the browser's built-in MathML, so no KaTeX download.

### 4.3 Patterns and animation

1. **Hero icosahedron** — drag to spin with inertia, slow auto-rotation when idle, arrow keys turn it, tap a face to see its topic.
2. **Graph-paper sky** — a very faint grid that fades out toward the edges, plus a thin curve that draws itself under *every side* (plays once).
3. **Refined buttons** — solid navy pills with a soft shadow, a small lift on hover, an arrow that nudges forward, a gentle press on click.
4. **Topic cards** — one tile color per topic, drawn from the same ramp as the shape. The first two cards are larger, so the grid is not a wall of identical boxes.

Motion rules:
- Animate only `transform` / `opacity`, with one shared easing set. One exception: the headline curve draws itself once with `stroke-dashoffset`.
- No fade-up on scroll for every section.
- Respect `prefers-reduced-motion`: no auto-spin, no inertia, no self-drawing line.
- The canvas stops rendering when scrolled off-screen.
- Cards are not clickable yet, so they have no hover effect that would suggest they are.

### 4.4 Copy voice

- Talk to teenagers like a sharp, respectful mentor: direct, short, confident and precise. Never childish, never corporate.
- Banned phrases: *Unlock your potential · Revolutionize · Seamless · Empower · Journey · Dive in · Master math effortlessly*
- No invented numbers, reviews or logos. With no real users and no lessons yet, we claim nothing. Every unfinished thing says *Coming soon*.

| Where | Copy |
|---|---|
| Hero | **See math from every side.** |
| Sub | Interactive math lessons for middle and high school, from logic and sets to calculus. Drag it, test it, figure it out. |
| Reassurance | No account needed. First lessons are on the way. |
| Topics heading | Math, from the ground up. |
| Closing | Every problem has another side. |

## 5. Page structure

```text
┌──────────────────────────────────────────────────────────────┐
│ <> Multifaceted Mathematics                        [ Topics ]│  0  Nav · floating pill
├──────────────────────────────────────────────────────────────┤
│ See math from                                  ______        │  1  Hero · text left, shape right
│ every side.                                   /\    /\       │
│ ~~~~~~~~~~~ <- curve draws itself            /  \  /  \      │
│                                             /____\/____\     │
│ Interactive math lessons for                \    /\    /     │
│ middle and high school.                      \  /  \  /      │
│ [Explore topics >]                            \/____\/       │
│ No account needed.                          drag to turn     │
├──────────────────────────────────────────────────────────────┤
│ Math, from the ground up.                                    │  2  Topics · 2 large + 6 small cards
│                                                              │
│ +---------------------------+ +---------------------------+  │
│ | [=>] Logic                | | [in] Set Theory           |  │
│ | If it rains, the street.. | | More whole numbers than.. |  │
│ | (Coming soon)             | | (Coming soon)             |  │
│ +---------------------------+ +---------------------------+  │
│ +-----------------+ +-----------------+ +-----------------+  │
│ | Real Numbers    | | Functions       | | Number Theory   |  │
│ | (Coming soon)   | | (Coming soon)   | | (Coming soon)   |  │
│ +-----------------+ +-----------------+ +-----------------+  │
│ +-----------------+ +-----------------+ +-----------------+  │
│ | Combinatorics   | | Sequences       | | Calculus        |  │
│ | (Coming soon)   | | (Coming soon)   | | (Coming soon)   |  │
│ +-----------------+ +-----------------+ +-----------------+  │
├──────────────────────────────────────────────────────────────┤
│ How a lesson works                                          │  3  Real lesson UI, annotated
│ +---------------------+                                      │
│ | What is 3/4 of 8?   |  <- One idea per screen              │
│ |  [ 4 ]  [ 6 ]  [ 2 ]|  <- You try first, we explain after  │
│ +---------------------+                                      │
├──────────────────────────────────────────────────────────────┤
│ Now ---------------- Next ---------------- Later             │  4  What's next · honest roadmap
│ topics overview      first lessons         accounts          │
├──────────────────────────────────────────────────────────────┤
│ Every problem has another side.           [Explore topics >] │  5  Closing + footer
│ © 2026 Multifaceted Mathematics                              │
└──────────────────────────────────────────────────────────────┘
```

| # | Section | Job | Status |
|---|---|---|---|
| 0 | Nav — floating capsule | Mark + wordmark and a **Topics** button. On mobile it is the same two items, no hamburger. | Built |
| 1 | Hero | Headline left, draggable icosahedron right. On mobile the headline comes first. | Built |
| 2 | Topics | 8 topic cards, two large then six small, each with a symbol tile, a thought-provoking question and a *Coming soon* tag. | Built |
| 3 | How a lesson works | Explain the method with a lesson screen built from real HTML (no fake phone frame) plus callouts: *One idea per screen* · *You try first, we explain after* · *Hints, not answers* · *Five minutes, tops*. | Built |
| 4 | What's next | Honest roadmap that also explains why there is no login yet: *Now:* topic overview → *Next:* first lessons → *Later:* accounts, streaks, progress. | Built |
| 5 | Closing + footer | Big line *Every problem has another side.* + button. A dark panel with *Every problem has another side.* and an **Explore topics** button. The footer is one © line, no links. | Built |

### 5.1 Topics (in learning order)

| # | Topic | Symbol | Question on the card |
|---|---|---|---|
| 1 | Logic | ⇒ | If it rains, the street is wet. The street is wet. Did it rain? |
| 2 | Set Theory | ∈ | Are there more whole numbers than even numbers? |
| 3 | Real Numbers | ℝ | Why can't you write √2 as a fraction? |
| 4 | Functions & Relations | f(x) | Why isn't a circle the graph of a function? |
| 5 | Number Theory | ≡ | Why do the digits of a multiple of 9 always add up to a multiple of 9? |
| 6 | Combinatorics | ! | How many ways can five friends line up for a photo? |
| 7 | Sequences & Series | Σ | Can infinitely many steps add up to a finite distance? |
| 8 | Calculus Basics | ∫ | How fast is a falling ball at exactly one second? |

The HTML is the single source for topic names. The hero shape reads them from the cards, so adding or renaming a topic is one edit.

### 5.2 Parked: the puzzle

"Line it up" (draggable slope and intercept sliders, two stars on a graph, direction-only hints) was built and committed in `40d071a`, then removed from the page. It is recoverable from git and can be reused inside a Functions & Relations lesson later.

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
│   └── main.js          wires the hero shape to the topic cards
├── scripts/
│   └── inline-css.mjs   deploy-time step: inlines the two stylesheets into index.html
├── tests/
│   ├── geometry.test.js pure-logic tests, run with `node --test`
│   └── inline.test.js
├── assets/mark.svg      logo mark and favicon (generated from the real geometry)
├── .github/workflows/pages.yml  tests, then publishes only index.html, css, js, assets
├── .claude/launch.json  preview server config for the Claude app
└── PLAN.md
```

- **No dependencies:** the icosahedron is our own code instead of Three.js (~150 KB gzip).
- **Run locally:** `python -m http.server 5173`, then open <http://localhost:5173>. Opening the file directly will not work with ES modules.
- **Browsers:** current Chrome / Edge / Safari / Firefox. `oklch()` works in all of them.
- **Tests:** `node --test` (no path argument).

## 7. Work order

**How we work:** every phase = build → check in the browser pane at desktop and mobile → you review → fix → next phase. Commit to git when you approve each phase.

- [x] **Phase 0 — Setup:** git, file structure, tokens, fonts, preview config
- [x] **Phase 1 — Nav + Hero + icosahedron** (committed)
- [x] **Phase 2 — Puzzle "Line it up"** (built and committed, then removed from the page; see 5.2)
- [x] **Phase 2b — Topics section** (built, awaiting review)
- [x] **Phase 3 — How a lesson works · What's next · Closing** (built, awaiting review)
- [x] **Phase 4 — QA** (done, results in section 12). Not done: OG image, because there is no public URL yet.
- [ ] **Phase 5 — Deploy to GitHub Pages.** Prepared: workflow written and tested locally (section 13). Waiting for the owner steps below.

## 8. Definition of done

**Must have**
- [x] Every color and font references a token in `tokens.css`. No hard-coded values.
- [x] Spacing uses a 4 pt scale (a few component sizes such as the 3.25 rem button height are deliberate exceptions).
- [x] Contrast passes WCAG AA and focus rings are clearly visible.
- [x] Every button / control has: default · hover · focus-visible · active · disabled (where relevant).
- [x] At 320 px there is no horizontal scroll and button text never wraps to two lines.
- [x] The whole page works with the keyboard alone.
- [x] Reduced-motion mode is fully usable.
- [x] Lighthouse: Performance and Accessibility ≥ 95 · total JS around 30 KB or less.

**Must not have (AI-slop tells)**
- [x] Purple-blue gradients, gradient text, glassmorphism, glowing blobs
- [x] Default fonts such as Inter / Roboto / Poppins / Montserrat
- [x] Emoji used as icons, three icon-in-rounded-box cards
- [x] Invented numbers, reviews or logos
- [x] Fake phone frames or fake browser bars
- [x] Italic headings, or a single italic word inside a heading
- [x] Tiny labels like "01 · FEATURES" above every section
- [x] Fade-up on scroll for every section
- [x] Everything centered / a grid of identical cards
- [x] A four-column footer whose links go nowhere

## 9. Not now

Log in / sign up · user accounts · backend / database · lesson content · puzzles on the landing page · dark mode · Thai / other languages · analytics and cookie banner · pricing · blog

## 10. Risks and mitigation

| Risk | Mitigation |
|---|---|
| A page of only *Coming soon* cards can feel empty | The "How a lesson works" section (Phase 3) shows the method with a real lesson screen. The hero shape is interactive. Honest status text beats fake content. |
| Topics such as Set Theory and Real Numbers sit above typical middle-school level | Each card is phrased as a question a teenager can feel. The audience stays middle and high school (confirmed 2026-10-19). Revisit when lessons are written. |
| Math symbols depend on system fonts and may look different per OS | Checked on Windows. Check macOS / Android in Phase 4. |
| Light blue + white risks looking generic | A strong hero object, graph-paper detail, tight type, and one orange highlight. |

## 11. Decided

- The hero image is the icosahedron (20 faces). No mascot.
- No logo existed, so a simple icosahedron mark + wordmark was designed (`assets/mark.svg`).
- The footer is one copyright line with no links and no socials.
- The landing page does not host puzzles or lessons. It shows the eight topics only.

## 12. QA results (2026-10-19)

| Area | Result |
|---|---|
| Responsive | Checked at 320, 375, 414, 768, 1024 and 1440 px: no horizontal scroll, no element past the viewport, no button text on two lines. Cards go 3 → 2 → 1 columns, the roadmap goes vertical on phones. |
| Keyboard | Tab order is skip link → brand → Topics → Explore topics → hero shape → closing button, then leaves the page (no trap). Every stop shows a 3 px focus ring. Arrow keys turn the hero shape. |
| Structure | One `h1`, then `h2` / `h3` in order. Landmarks: header, main, four labelled sections, footer. No duplicate ids, every control has a name, `lang="en"`. |
| Reduced motion | Verified in headless Chrome with `prefers-reduced-motion: reduce`: no auto-spin, no inertia, headline curve already drawn, no smooth scroll, no transitions. Arrow keys still turn the shape. |
| Lighthouse | Mobile 100 / 100 / 100 / 100 (performance, accessibility, best practices, SEO). Desktop 98 / 100 / 100 / 100 before the fixes below. CLS 0. |
| JS size | About 9.5 KB unminified in total. |

Fixes made during QA:
- The brand link's accessible name did not contain its visible text (missing space), so it was reworded.
- The Google Fonts stylesheet no longer blocks rendering (mobile performance 90 → 100).
- The brand link now has a 44 px tap target, and the skip link has a stronger focus ring.

Not covered, and worth doing before launch:
- **A real screen reader** (NVDA, VoiceOver). Only the accessibility tree and Lighthouse were checked.
- **Real phones and other browsers.** Everything ran in Chrome. Safari and Firefox are untested, in particular the `mask-image` fade of the page grid and the math symbols in the topic tiles on macOS and Android.
- **Server settings at deploy.** Lighthouse still flags missing compression and cache headers, which come from the host (GitHub Pages and Netlify both gzip). Re-run Lighthouse on the live URL.
- **An OG image and canonical URL**, once the final address is known.

## 13. Deploy to GitHub Pages

**Prepared in the repo (done):** branch renamed to `main`; `.github/workflows/pages.yml` runs `node --test`, copies only `index.html`, `js/` and `assets/` into `_site/` (with the CSS inlined into `index.html` by `scripts/inline-css.mjs`), and publishes that. The staged site was served from a subpath (`/multifaceted-mathematics/`) and loaded with no errors, so the site works both at `user.github.io/repo/` and at a custom domain. All paths in the site are relative.

**Steps for the owner (needs your GitHub account):**
1. Create a new repository on github.com, for example `multifaceted-mathematics`. Leave "Add a README", ".gitignore" and "license" **unchecked**, so it starts empty. Choose **Public** (GitHub Pages on a private repository needs a paid plan).
2. **Commit identity (done).** All commits use the GitHub noreply address, so no personal email is exposed. New commits use it too (set in this repository's git config).
3. Connect and push (a browser sign-in window will appear the first time):
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/multifaceted-mathematics.git
   git push -u origin main
   ```
4. In the repository open *Settings → Pages → Build and deployment → Source* and choose **GitHub Actions**.
5. Open the *Actions* tab. If the first run failed because Pages was not switched on yet, open it and press *Re-run all jobs*. A green run shows the site address.
6. Open `https://YOUR-USERNAME.github.io/multifaceted-mathematics/` and look at it on a real phone.

**Afterwards (Claude can do these once the address is known):**
- ~~Add the canonical URL and Open Graph tags plus a 1200 × 630 share image.~~ Done: `assets/og.png` (rendered from the site's own tokens) and the tags in `index.html`. After deploying, check the preview with a share debugger (Facebook Sharing Debugger, LinkedIn Post Inspector); platforms cache the first result.
- Re-run Lighthouse on the live address.
- Optional: a custom domain (*Settings → Pages → Custom domain*, plus a DNS record at the domain registrar).

**Good to know:** the live site contains only the four items above, but a public repository also exposes `PLAN.md`, `tests/`, `.claude/` and `.hallmark/`. Remove them from the repository, or make it private on a paid plan, if that matters. The workflow uses `actions/checkout@v4`, `configure-pages@v5`, `upload-pages-artifact@v3` and `deploy-pages@v4`; if GitHub reports a newer major version, bump the number.

## 14. Live performance (2026-10-19)

The first live Lighthouse run (mobile) scored performance 85–88 with a first paint of about 3.3 s, because the real host adds about 550 ms to the first byte and the two stylesheets cost another round trip. Reproduced locally with a server that adds 500 ms per response: separate CSS scored 82–86 (first paint 3.2–3.5 s, matching the live numbers); CSS inlined scored 99 (first paint 1.2 s, largest paint 2.0 s).

**Fix:** the deploy workflow inlines `css/tokens.css` and `css/styles.css` into the published `index.html`. Source files stay separate for editing, and local development is unchanged. The build step throws if either stylesheet link is missing, so a broken page is never deployed. **Check after the next deploy:** re-run Lighthouse on the live address; expect about 95 or better. If it is lower, the host's latency is the cause, not the page.
