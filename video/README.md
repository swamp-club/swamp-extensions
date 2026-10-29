# @swamp/video

Turn any screen recording into a finished demo video. Record however you like
(OBS, a desktop recorder, a phone), then:

```bash
swamp workflow run @swamp/video/video-edit \
  --input recordingPath=~/Videos/demo.mkv --input "title=Build a swamp extension"
```

and you get, next to the recording:

| File                           | What                                               |
| ------------------------------ | -------------------------------------------------- |
| `demo.polished.mp4`            | the cut, with a soft caption track                 |
| `demo.polished.srt`            | the same captions as a file                        |
| `demo.captioned.mp4`           | the cut with captions burned in                    |
| `demo.thumbnail.jpg`           | 1280x720 thumbnail (the title card, or a frame)    |
| `demo.video/edit.txt`          | the cut as an editable transcript                  |
| `demo.video/storyboard.png`    | a contact sheet of the take                        |

The extension is private in the registry. It is the core of a family:
`@swamp/video/brand` (the Swamp Club look), `@swamp/video/obs` (recording) and
`@swamp/video/hyprland` (hotkeys, retake markers) build on it, and none of them
is needed for the core to work.

## What the edit does

From a verbatim transcript (fillers kept, so they can be cut):

- **cuts** ums and uhs, the first of an immediate repeat ("the the"), pauses
  over 1.5s (keeping a little air either side, cut edges eased into real
  silence), dead air at the start, and **retakes**: a retake marker cuts the
  sentence you abandoned. Markers come from `retakeMarkers` (raw seconds, e.g.
  from a hotkey) or a spoken "retake" when Whisper heard it (it often drops
  the word, so treat spoken markers as best effort);
- **fast-forwards** waits of 4s or more so each plays in about 4s (up to 32x)
  with a racing wall clock on screen and the voice muted, and waits where the
  screen sat idle in about 1s (up to 64x);
- **pixelates** credentials it reads on screen (AWS, GitHub, OpenAI-style,
  Slack, Google keys, JWTs, long high-entropy strings, `token=`/`password:`
  values) for as long as they show.

Render then adds the cards, intro music and a quiet bed under fast-forwards,
normalizes loudness to -14 LUFS (two passes), and writes the files above.

## Requirements

- `ffmpeg` and `ffprobe` 7.0 or newer (render passes its graph with
  `-/filter_complex`), with libass for burned captions
- `tesseract` (screen text and credential detection)
- `chromium` (or any Chromium; set `chromium` on the render behavior) for the
  simple title card
- transcription, one of:
  - `uv` (default): runs faster-whisper, fetched on first use
  - `whisper-cli` from whisper.cpp, with `ggml-<model>.bin` in
    `~/.cache/whisper.cpp`

### Why faster-whisper is the default

Both were run on the same 22:49 reference take with the same verbatim prompt
and `large-v3-turbo`:

|                                   | faster-whisper (uv) | whisper.cpp 1.9.5 |
| --------------------------------- | ------------------- | ----------------- |
| fillers kept (um, uh, ...)        | 70                  | 27                |
| time (16 threads)                 | 45s                 | 188s              |
| a silent 5:48 agent wait          | nothing transcribed | "Thank you." every 30s |

whisper.cpp has no voice-activity filter in this mode and invents text in
silence, which would break fast-forward detection. It remains available with
`backend: whisper-cpp` for machines without Python.

## Workflows

| Workflow                       | Does                                                        |
| ------------------------------ | ----------------------------------------------------------- |
| `@swamp/video/video-edit`      | transcribe and watch the screen (in parallel), build, render |
| `@swamp/video/video-recut`     | read `edit.txt` back, render again                           |
| `@swamp/video/video-describe`  | YouTube title, description and chapters                      |

They use fixed instances (`video-transcript`, `video-screen`, `video-edit`,
`video-render`, `video-describe`), created on first run; each take's data is
named after the recording, so many takes share them.

`video-edit` inputs: `recordingPath`, `title`, `subtitle`, `kicker`, `cards`
(`simple` | `none` | `custom` | `brand`), `cardsFrom`, `media`,
`retakeMarkers`, `pixelate`, `burn`.

## Changing the cut

**From chat** (the bundled `video` skill drives these), on `video-edit`:

```bash
swamp model method run video-edit cut   --input recordingPath=<rec> --input "quote=we can scratch that"
swamp model method run video-edit cut   --input recordingPath=<rec> --input quote=So --input "untilQuote=moving on"
swamp model method run video-edit keep  --input recordingPath=<rec> --input start=12:30 --input end=12:41
swamp model method run video-edit speed --input recordingPath=<rec> --input "quote=while it builds" --input speed=1
```

Times are raw recording time. `occurrence` picks a later repeat of a quote.
`cut` and `keep` act on whole waits, and refuse a range that covers only part
of one.
`speed` takes `1` (normal speed), a number, or `auto`, and changes only waits
that play; `keep` brings back a cut one. Chat edits rewrite edit.txt, so they
refuse while it holds hand edits that were not imported yet.

**By hand**, in `<rec>.video/edit.txt` (demo-polish's format, so its files
import unchanged):

```
2 [0:32] | Great, >>348.4s so I'm gonna, oh, I was just about to pause the recording, {um, ~1.7s} but {we can scratch that.}
```

- one line per sentence, with its raw start time;
- `{braced}` text is cut; remove the braces to keep it; deleting words or a
  whole line also cuts them;
- `~2.4s` is a pause played at normal speed and `>>12.0s` a wait played
  fast-forward; change one into the other, or brace either (`{~2.4s}`, as
  build writes trimmed pauses) to cut it;
- retyping a word changes only its caption ("Cooper Netties" → "Kubernetes");
- braces must not nest: `{a {b} c}` is an error naming the line (demo-polish
  silently kept `c`).

Then `swamp workflow run @swamp/video/video-recut --input recordingPath=<rec>`.
Chat edits rewrite `edit.txt`, so the file always matches the edit list. A wait
speed set from chat survives re-imports while the wait stays `>>`.

## Cards

Render takes a `cards` object; every source produces the same contract:

| Field              | Shape                         | Use                                         |
| ------------------ | ----------------------------- | ------------------------------------------- |
| `intro`            | `{path, seconds}`             | first frame, crossfades into the take       |
| `outro`            | `{path, seconds}`             | crossfades in at the end                    |
| `lowerThird`       | `{path, seconds, at}`         | full-frame transparent overlay, `at` output seconds into the take |
| `fastForwardBadge` | `{path}`                      | full-frame transparent overlay over every fast-forward |

Cards may be stills (PNG/JPEG/WebP, held for `seconds`) or videos (cut to
`seconds`). Overlays may be stills or videos with alpha (ProRes 4444 `.mov`
or VP9 `.webm`): an animated lower third plays once from `at`, so its own
entrance and exit show; an animated badge loops. Modes:

- `simple` (default): demo-polish's kicker / title / subtitle card, drawn by
  headless Chromium at the video's size;
- `none`;
- `custom`: the paths above, or `from: <instance>` to use any behavior that
  writes a `cards` resource (per take, or one shared record);
- `brand`: `from: <@swamp/video/brand instance>`; without it render stops and
  says so. With @swamp/video/brand installed, its
  `@swamp/video/brand/video-edit` workflow renders the brand cards and runs
  `video-edit` with them, so brand is the default there.

## Per-person settings

Nothing personal lives in the code. Keep yours in your repo:

```bash
swamp model create @swamp/video/presenter presenter \
  --global-arg "name=Your Name" --global-arg "title=Your Role" \
  --global-arg email=you@example.com --global-arg campaignUrl=https://example.com/you \
  --global-arg "cta=Book a call"
swamp model method run presenter show

swamp model create @swamp/video/media media \
  --global-arg encoder=vaapi --global-arg music=~/Music/sting.wav --global-arg bed=~/Music/bed.mp3
swamp model method run media show
```

and pass `--input media=media` to video-edit and video-recut, and `--input presenter=presenter` to video-describe.
Media settings: `width`/`height` (default: the recording's), `encoder`
(`libx264`, `vaapi`, `qsv`, `nvenc`), `quality`, `vaapiDevice`, `music`, `bed`,
`loudness` (LUFS), `font`.

## Behaviors

| Type                       | Methods                                     | Writes                    |
| -------------------------- | ------------------------------------------- | ------------------------- |
| `@swamp/video/transcript`  | `transcribe`, `import` (a demo-polish transcript.json) | `transcript` per take |
| `@swamp/video/screen`      | `analyze`                                   | `screen` per take         |
| `@swamp/video/edit`        | `build`, `cut`, `keep`, `speed`, `export`, `import` | `editList` per take |
| `@swamp/video/render`      | `render`                                    | `video` per take          |
| `@swamp/video/describe`    | `describe`                                  | `youtube` per take        |
| `@swamp/video/presenter`   | `show`                                      | `presenter`               |
| `@swamp/video/media`       | `show`                                      | `settings`                |

Large files (renders, frames, the voice-loudness envelope, edit.txt) stay on
disk next to the recording; swamp data holds metadata and paths. The screen
text timeline in swamp data has every detected credential replaced with
`[<kind> redacted]`; the sampled frames in `<rec>.video/frames/` are raw.
Busy screens are read every `activeEvery` seconds (5 by default), so a secret
on screen for less than that can be missed: lower it for takes that show keys,
and check the `pixelating ...` warnings. A secret seen at two positions in a
row (scrolling output) is covered across the band between them for that
interval. Finding secrets needs OCR, so `redact` without `ocr` is refused.

A take is named after the recording's file name. Two recordings with the same
name share that name, so the behaviors check the stored recording path and
stop with an error rather than mixing up their data: rename one of them.

## Development

```bash
deno check extensions/models/*.ts
deno lint extensions/models/ .claude/skills/
deno fmt --check extensions/models/ .claude/skills/
deno test --allow-read --allow-write --allow-env extensions/models/
```

Tests run with a fake process boundary (no ffmpeg, whisper, tesseract or
Chromium) and an in-memory swamp. The edit list is a port of demo-polish:
`scripts/gen_parity_fixtures.py` (the original's functions, copied in) writes
golden fixtures to `testdata/parity/`, and the tests require the TypeScript to
match them exactly.
