---
name: Multifaceted Mathematics
description: "Interactive math lessons on a bright, quiet page, with one lit solid at the center."
colors:
  daylight-sky: "oklch(96.5% 0.022 228)"
  clean-sheet: "oklch(99.5% 0.004 230)"
  soft-sky: "oklch(85% 0.09 232)"
  draft-blue: "oklch(62% 0.15 248)"
  navy-ink: "oklch(24% 0.07 258)"
  navy-ink-hover: "oklch(34% 0.09 258)"
  slate-ink: "oklch(46% 0.05 256)"
  outline-navy: "oklch(30% 0.08 257)"
  marker-orange: "oklch(72% 0.18 48)"
  marker-orange-deep: "oklch(62% 0.19 40)"
  check-green: "oklch(76% 0.15 160)"
  check-green-wash: "oklch(95% 0.05 160)"
  facet-deep: "oklch(55% 0.15 252)"
  facet-mid: "oklch(66% 0.14 246)"
  facet-light: "oklch(76% 0.11 240)"
  facet-pale: "oklch(85% 0.075 234)"
  facet-mist: "oklch(93% 0.04 230)"
typography:
  display:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.75rem, 1rem + 6.6vw, 5.25rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.125rem, 1.2rem + 3.2vw, 3.25rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Newsreader, Georgia, 'Times New Roman', serif"
    fontSize: "1.375rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: "'Atkinson Hyperlegible Next', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
  mono:
    fontFamily: "'Atkinson Hyperlegible Mono', ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  md: "12px"
  lg: "20px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "96px"
components:
  button-primary:
    backgroundColor: "{colors.navy-ink}"
    textColor: "{colors.clean-sheet}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 32px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.navy-ink-hover}"
    textColor: "{colors.clean-sheet}"
  button-light:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.navy-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 32px"
    height: "52px"
  nav-bar:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.navy-ink}"
    padding: "8px 24px"
  topic-card:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  topic-card-lead:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.navy-ink}"
    rounded: "{rounded.lg}"
    padding: "32px"
  status-chip:
    backgroundColor: "{colors.daylight-sky}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  lesson-option:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.slate-ink}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  lesson-option-picked:
    backgroundColor: "{colors.check-green-wash}"
    textColor: "{colors.navy-ink}"
  closing-panel:
    backgroundColor: "{colors.navy-ink}"
    textColor: "{colors.clean-sheet}"
    rounded: "{rounded.lg}"
    padding: "96px 48px"
  ticker:
    backgroundColor: "{colors.clean-sheet}"
    textColor: "{colors.navy-ink}"
    typography: "{typography.title}"
    padding: "16px 24px"
---

# Design System: Multifaceted Mathematics

## Overview

**Creative North Star: "The Drafting Table"**

A bright drafting surface. Faint graph paper fades out toward the edges, hairline rules do the framing, navy is the only ink, and one lit solid (the 20-faced icosahedron) sits in the middle of the sheet like the piece being worked on. Everything else is measured and quiet so the object and the question on the page get all the attention.

The page reads as a precise instrument, not a toy: light-weight serif headings give it a printed, grown-up voice, while the cool daylight ground keeps it open and bright. Playfulness is allowed in exactly two places: the shape you can drag, and a single orange mark.

**Key Characteristics:**
- Bright, cool daylight ground with graph paper that fades out instead of tiling.
- Light-weight upright serif headings over a legible humanist sans body.
- Hairline 1px borders and long, soft shadows; no heavy outlines.
- One confident object (the icosahedron) and one orange highlight per view.
- Navy ink carries text and every primary action.

## Colors

A bright, cool, daylight palette: sky-tinted ground, clean white sheets, navy ink, and one orange mark.

### Primary
- **Navy Ink** (oklch(24% 0.07 258)): body text, headings, primary buttons and the closing panel. Hover darkens toward lighter navy (oklch(34% 0.09 258)).
- **Draft Blue** (oklch(62% 0.15 248)): focus rings, the graph-paper lines and the topic-symbol accents. Never body text.

### Secondary
- **Marker Orange** (oklch(72% 0.18 48)): the single warm highlight: the headline underline, the first-topic face on the solid, and the Logic tile. Deeper (oklch(62% 0.19 40)) only for the lit-face edge on the solid.

### Neutral
- **Daylight Sky** (oklch(96.5% 0.022 228)): the page ground, and the quiet fill inside chips and lesson explanations.
- **Clean Sheet** (oklch(99.5% 0.004 230)): cards, the header bar, the ticker band and lesson options.
- **Soft Sky** (oklch(85% 0.09 232)): the offset layer behind the lesson card, inactive progress segments.
- **Slate Ink** (oklch(46% 0.05 256)): secondary text; passes AA on Daylight Sky (about 6.5:1).
- **Outline Navy** (oklch(30% 0.08 257)): the edge strokes of the solid.
- **Check Green** (oklch(76% 0.15 160)) with **Check Green Wash** (oklch(95% 0.05 160)): the correct-answer state only.
- **Facet ramp** (deep oklch(55% 0.15 252) to mist oklch(93% 0.04 230)): five flat shades for the solid's faces and the topic symbol tiles.

### Named Rules
**The One Highlight Rule.** Marker Orange appears once per view. It is never a button fill and never decorates text.

**The Navy Action Rule.** Every primary action is solid Navy Ink with white text; contrast stays above 15:1.

## Typography

**Display Font:** Newsreader (with Georgia, Times New Roman, serif)
**Body Font:** Atkinson Hyperlegible Next (with system-ui, sans-serif)
**Label/Mono Font:** Manrope for buttons, the brand mark and small labels; Atkinson Hyperlegible Mono for the footer and the shape readout. Math symbols use the system math stack (Cambria Math, STIX Two Math, Noto Sans Math, Segoe UI Symbol).

**Character:** A light, upright text serif speaks in headings and questions, with a legibility-first sans for reading. The pairing is chosen so numerals and symbols (1 / l / I, 0 / O) never get confused, which matters for math.

### Hierarchy
- **Display** (500, clamp(2.75rem, 1rem + 6.6vw, 5.25rem), 1.02): the hero headline only; letter-spacing -0.025em.
- **Headline** (500, clamp(2.125rem, 1.2rem + 3.2vw, 3.25rem), 1.08): section headings; letter-spacing -0.02em.
- **Title** (500, 1.375rem to 1.875rem, 1.15): topic names, lesson principles, roadmap stages, ticker items.
- **Body** (400, 1.0625rem, 1.6): questions and supporting text; keep lines to 65 to 75ch.
- **Label** (600, 1rem, 1): button text and the brand wordmark (Manrope; 800 for the wordmark).

### Named Rules
**The Light Serif Rule.** Headings are upright serif at weight 500. Never bold, never italic, never a single italic word inside a heading.

## Layout

A single 75rem content column, centered, with 1.5rem side padding (1rem under 40rem). The hero is two columns (1.05fr text, 1fr solid) and stacks on tablet. The topic grid is six columns where the first two cards span three and the rest span two, collapsing to two columns under 64rem and one under 40rem. The lesson section is two columns (1.1fr / 1fr) that stack under 52rem; the roadmap is three columns that become a vertical line on phones.

Spacing follows a 4pt scale (4, 8, 12, 16, 24, 32, 48, 64, 96 px). Sections breathe with 48 to 64px of vertical padding; the closing panel uses 96px. The header is a fixed full-width bar whose contents align to the same 75rem column, and a full-bleed ticker band sits directly under the hero.

## Elevation & Depth

Hybrid and restrained: depth comes mostly from tonal layering (white sheets on a sky ground) and 1px hairlines, with long, low shadows only to lift sheets slightly off the page. Nothing glows.

### Shadow Vocabulary
- **Button lift** (`box-shadow: 0 10px 20px -10px oklch(24% 0.07 258 / 0.32)`): primary buttons at rest; hover raises 1px.
- **Card lift** (`box-shadow: 0 20px 40px -30px oklch(24% 0.07 258 / 0.32)`): topic cards.
- **Lesson lift** (`box-shadow: 0 24px 48px -28px oklch(24% 0.07 258 / 0.32)`): the example lesson card, over a Soft Sky offset layer at 50% opacity.

### Named Rules
**The Soft Lift Rule.** Shadows are long, low and diffuse. Borders stay 1px hairlines (Navy Ink at 12%); never a heavy outline.

**The Sheet Rule.** Content sits on clean white sheets (Clean Sheet) over the Daylight Sky ground. Sheets are flat, hairline-bordered and lightly lifted; they are never tinted, never glassy.

## Shapes

Soft but not bubbly. Cards and panels use a 20px radius (`--radius-lg`), inner controls and symbol tiles use 12px (`--radius-md`), and buttons, the status chip and the progress segments are full pills (999px). The hero solid is a flat-shaded polyhedron with thin navy edges, which gives the page its one sharp-cornered form against the rounded UI. The headline underline is a 2px straight stroke in Marker Orange that draws once.

## Components

### Buttons
- **Shape:** full pill (999px), 52px tall (44px in the header), 32px side padding.
- **Primary:** solid Navy Ink with Clean Sheet text, Manrope 600 at 16px, an arrow icon where it navigates.
- **Hover / Focus:** hover lightens to oklch(34% 0.09 258), lifts 1px and nudges the arrow 3px; active scales to 0.97; focus shows a 3px Draft Blue ring with 3px offset.
- **Light:** on the navy closing panel, a Clean Sheet fill with Navy Ink text.

### Chips
- **Style:** Daylight Sky fill, Slate Ink text, 1px hairline, pill radius, 14px text. Used for the *Coming soon* status.

### Cards / Containers
- **Corner Style:** 20px (`--radius-lg`).
- **Background:** Clean Sheet with a 1px hairline border.
- **Shadow Strategy:** Card lift (see Elevation).
- **Internal Padding:** 24px; the two lead topic cards use 32px.

### Navigation
- **Style:** fixed full-width bar, Clean Sheet with a 1px hairline underneath; mark and wordmark on the left (Manrope 800), one small navy pill button on the right. No hamburger, even on phones.

### Topic card
A symbol tile (56px, 72px on lead cards; 12px radius, a facet-blue or Marker Orange fill, math-font symbol in Navy Ink), a serif title, one question in Slate Ink and a status chip pinned to the bottom. Cards are not clickable on the landing page and have no hover effect.

### Ticker
A full-bleed Clean Sheet band with hairline top and bottom, serif 22px topic names with a Draft Blue math symbol before each. It scrolls left to right at a steady 45s per loop, pauses on hover and stops under reduced motion, where the names wrap and sit still.

### Lesson screen
A real HTML card (not a device frame): topic label and five progress segments, a serif question, three options (12px radius, hairline), the picked option in Check Green Wash with a green check badge, and an explanation block on Daylight Sky.

### Closing panel
Navy Ink panel with a faint white grid in its lower right corner, a white display headline with the orange underline, and a light button.

## Do's and Don'ts

### Do:
- **Do** keep primary actions solid Navy Ink with white text (contrast about 16:1).
- **Do** use Marker Orange once per view, as a highlight only.
- **Do** set headings in upright Newsreader at weight 500, with letter-spacing between -0.01em and -0.025em.
- **Do** frame surfaces with 1px hairlines (Navy Ink at 12%) and long, low shadows.
- **Do** animate only transform and opacity (the headline underline's stroke draw is the one exception) and provide a reduced-motion alternative for every motion.
- **Do** keep tap targets at 44px or larger and show a 3px Draft Blue focus ring.
- **Do** let graph-paper lines fade out toward the edges with a radial mask; never tile them across the full page.

### Don't:
- **Don't** use gradient text, glassmorphism, glow blobs or purple-blue gradients.
- **Don't** fill a button with orange or use orange for body text.
- **Don't** set headings in bold sans or in italics.
- **Don't** add descriptive taglines under headings or beside buttons; the content explains itself (PRODUCT.md anti-reference: filler).
- **Don't** use a row of identical icon-in-rounded-box cards, side-stripe borders, or fake phone or browser frames.
- **Don't** invent numbers, reviews or logos; unfinished things say Coming soon.
- **Don't** draw decoration that is not measured: no blobs, confetti, or random gradients. Patterns come from real math (grids, circles with axes, facets).
