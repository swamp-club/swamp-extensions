# @swamp/video/brand

The Swamp Club look for [@swamp/video](../README.md). One command turns a
screen recording into a finished video with:

- a synthwave **intro**: the sun rises over a neon grid, the SWAMP CLUB
  wordmark flickers on, then the episode, title, subtitle and the presenter;
- the presenter's **lower third**, sliding in beside the webcam;
- an animated **FAST FORWARD** badge over every fast-forward;
- an **outro** with the presenter's contact, a QR code to their campaign page
  and their call to action, fading to black.

It also renders the **OBS studio look**: the backdrop behind a centred screen
share, a looping neon ring around the webcam and a circular webcam mask.

```bash
swamp workflow run @swamp/video/brand/video-edit \
  --input recordingPath=~/Videos/demo.mkv \
  --input "title=Ship a data pipeline in ten minutes" \
  --input "episode=Tutorial 3"
```

The workflow renders the brand cards for the take, then runs @swamp/video's
`video-edit` with `cards: brand`, so you get everything `video-edit` makes
(`demo.polished.mp4`, captions, thumbnail, `edit.txt`) in this look. The
cards themselves land in `demo.video/brand/`, with `thumbnail.png`, the
settled intro, for a custom thumbnail.

Needs @swamp/video 2026.10.29.2 or later (it plays the animated lower third
and badge), `chromium` (any Chromium or Chrome, headless) and `ffmpeg` with
the `libx264`, `qtrle` and `libvpx-vp9` encoders.

## Who is on screen

Nothing personal lives in the code: every name, handle, email, link and call
to action comes from your @swamp/video/presenter instance, and an empty field
drops its line (no CTA line without `cta`, no QR code without
`campaignUrl`).

```bash
swamp model create @swamp/video/presenter presenter \
  --global-arg "name=Your Name" --global-arg "title=Your Role" \
  --global-arg 'handle=\@you' --global-arg email=you@example.com \
  --global-arg campaignUrl=https://swamp-club.com/campaign/you \
  --global-arg "cta=Book 30 minutes with me"
swamp model method run presenter show
```

The QR code encodes `campaignUrl` exactly as given. Pass `--input
presenter=<instance>` to use another one.

`video-edit` inputs: `recordingPath`, `title` (both required), `subtitle`,
`episode` (the label above the title, `Demo` by default), `presenter`,
`media`, `retakeMarkers`, `pixelate`, `burn`.

To re-render after changing the cut, use @swamp/video's `video-recut` with
`--input cards=brand --input cardsFrom=video-brand`: the cards are already
rendered for the take.

## The OBS studio look

```bash
swamp model method run video-brand stage --input dir=video-stage
```

writes into `video-stage/`:

| File               | What                                                         |
| ------------------ | ------------------------------------------------------------ |
| `backdrop.png`     | the full canvas behind the screen share, framed in neon      |
| `camera-ring.webm` | a seamless 6s VP9-with-alpha loop of the ring around the webcam |
| `camera-mask.png`  | a white disc whose alpha cuts the webcam to a circle         |

and a `stage` resource with their paths and the layout (`screen`, `camera`
and `ring` rectangles on a 1920x1080 stage), which @swamp/video/obs reads to
build its scene. The lower third and the badge line up with this layout:
`screenScale` (0.8) and `cameraSize` (300) on the instance move all of them
together.

## Settings

Global arguments on the `video-brand` instance (all optional):

| Argument      | Default    | What                                                    |
| ------------- | ---------- | ------------------------------------------------------- |
| `brandDir`    | (built in) | your own brand: `fonts/` (the six fonts below), `palm-silhouette.svg`, `sc-mark.svg` |
| `screenScale` | `0.8`      | screen share size on the OBS stage                      |
| `cameraSize`  | `300`      | webcam diameter in stage pixels                         |
| `width`, `height` | `1920`, `1080` | output size (16:9)                              |
| `fps`         | `30`       | card frame rate                                         |
| `chromium`, `ffmpeg` | names on PATH | the binaries                                  |

`brandDir` holds `fonts/ChakraPetch-{400,500,600,700}-latin.woff2`,
`fonts/Orbitron-var-latin.woff2`, `fonts/Inter-var-latin.woff2`,
`palm-silhouette.svg` and `sc-mark.svg`.

## Behavior

| Type                 | Methods | Writes                                   |
| -------------------- | ------- | ---------------------------------------- |
| `@swamp/video/brand` | `cards` | `cards` per take, in @swamp/video's cards contract |
|                      | `stage` | `stage`                                  |

`cards` arguments: `recordingPath`, `title`, `subtitle`, `episode`,
`presenter`, `introSeconds` (5.5), `outroSeconds` (8), `lowerThirdSeconds`
(6), `lowerThirdAt` (1.5 seconds into the take).

Each scene is an HTML page with CSS animations, captured frame by frame in
headless Chromium over the DevTools protocol and encoded with ffmpeg: the
intro and outro as H.264, the lower third and badge as QuickTime RLE with
alpha, the ring as VP9 with alpha. Rendering takes about five seconds per
second of card: a minute and a half or so for a default set.

## Development

```bash
deno check extensions/models/*.ts
deno lint extensions/models/ .claude/skills/ scripts/
deno fmt --check extensions/models/ .claude/skills/ scripts/
deno test --allow-read --allow-write --allow-env extensions/models/
```

Tests run with a fake browser and a fake ffmpeg (no Chromium or ffmpeg is
started), and pin brand's copies of the cards contract, the presenter and the
take naming to @swamp/video's own code in `../extensions/models/`.

The Swamp Club assets live in `assets/brand/` and ship embedded in
`extensions/models/_lib/brand_assets.ts`; after changing one, run
`deno task embed-assets`. The fonts are under the SIL Open Font License 1.1
(`FONTS-LICENSE.txt`).
