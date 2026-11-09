# Benefits explainer video (Remotion)

A data-driven motion piece built with [Remotion](https://www.remotion.dev): a pet-membership "year in review" video, rendered from a JSON file to MP4.

Every frame is React code. There is no After Effects file and no timeline editor. The animation is computed from `useCurrentFrame()` with `interpolate()` and `spring()`.

## What it renders

1. **Intro**: a line-drawn paw icon, then the headline springs in word by word.
2. **One scene per benefit**: a card slides in, its single-line icon draws itself (SVG `stroke-dashoffset`) and the headline number counts up from zero to the data value.
3. **Summary**: the total of the dollar-value benefits counts up, a bar per benefit grows on a shared scale, and non-dollar benefits (counts, days) pop in as chips.
4. **Outro**: a CTA button springs in and does a small "press".

There are two compositions from the same code: `BenefitsSquare` (1080×1080) and `BenefitsStory` (1080×1920).

## What drives the output

Everything comes from props validated by a Zod schema (`src/schema.ts`). The defaults live in `src/data/benefits.json`:

| Field | Effect |
|---|---|
| `headline`, `subhead`, `cta` | Copy for the intro and outro |
| `theme.*` | Six hex colours (ink, accent, surface, soft, mid, cta) used by every scene |
| `benefits[]` | 1–8 rows of `{ icon, title, value, format, caption }` |
| `benefits[].format` | `currency` → `$1,840`, `count` → `4`, `days` → `2.5 days`; also decides bar vs. chip in the summary |
| `benefits[].icon` | One of `shield`, `gift`, `heart`, `clock`, `paw` (hand-written SVG paths) |
| `currency` | Prefix for currency values |

**Duration is derived from the data.** `calculateMetadata` sets `durationInFrames = 75 + 80 × benefits + 120 + 80`. The default 4-benefit file renders 595 frames (19.8 s at 30 fps). The 3-benefit example renders 515.

Because the schema is attached to the composition, every field can also be edited live in Remotion Studio's props panel.

## Export to video

```bash
npm install
npm run dev            # Remotion Studio preview
npm run render         # out/benefits-square.mp4  (H.264, CRF 18)
npm run render:story   # out/benefits-story.mp4   (9:16)
npm run render:example # out/example-props.mp4    (different data + palette via --props)
```

`remotion render` bundles the project, opens it in headless Chromium, screenshots each frame, and encodes the frames with Remotion's bundled FFmpeg. To render your own data without touching the code:

```bash
npx remotion render BenefitsSquare out/mine.mp4 --props=path/to/your.json
```

## Structure

```
src/
  Root.tsx              compositions, schema, calculateMetadata
  BenefitsVideo.tsx     sequences scenes from the data
  schema.ts             Zod schema, timing constants, value formatting
  scenes/               Intro, BenefitScene, Summary, Outro
  components/LineIcon   self-drawing SVG line icons
  data/benefits.json    default data
examples/               alternative props files
```

Fonts are Inter and Outfit, loaded from Google Fonts via `@remotion/google-fonts`. Figures in the sample data are illustrative.
