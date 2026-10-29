---
name: video
description: >
  Edit a demo video made with @swamp/video from chat: turn a screen recording
  into a finished video, then change the cut by quoting what was said ("cut
  where I said ...", "don't speed up the part where ...", "keep the bit
  about ..."), fix captions, re-render, and write the YouTube description and
  chapters. Use when the user names @swamp/video, a video-edit / video-recut /
  video-describe workflow, an edit.txt next to a recording, or asks to cut,
  speed up, slow down, caption or describe a screen recording.
---

# Editing videos with @swamp/video

A take is one recording. Everything about it lives in two places:

- **swamp data** on fixed instances the workflows create: `video-transcript`
  (words with timings), `video-screen` (idle stretches, on-screen text,
  credential boxes), `video-edit` (the edit list: the source of truth for the
  cut), `video-render` (output paths), `video-describe`.
- **files** next to the recording: `<rec>.polished.mp4` (soft captions),
  `<rec>.captioned.mp4` (burned captions), `<rec>.polished.srt`,
  `<rec>.thumbnail.jpg`, and a work dir `<rec>.video/` holding `edit.txt`,
  `storyboard.png` and `youtube.txt`.

All times you pass are **raw recording time** (seconds or `m:ss`), never output
time. The transcript and edit.txt show raw times.

## First cut

```bash
swamp workflow run @swamp/video/video-edit \
  --input recordingPath=<path> --input "title=<headline>"
```

`cards` is `simple` (a title card; needs `title`), `none`, `custom`
(`cardsFrom=<instance>` with a `cards` resource) or `brand` (needs
@swamp/video/brand; when it is installed, run its
`@swamp/video/brand/video-edit` workflow instead, which renders the brand cards
and passes them on). Pass `retakeMarkers` (raw seconds) when the user marked
retakes; a spoken "retake" is also honoured when Whisper heard it.

Afterwards, tell the user the before/after lengths from the log, where the files
are, and anything pixelated (each credential box is logged).

## Changing the cut from chat

Read the edit list first so you quote real words:

```bash
cat <rec>.video/edit.txt
```

Each line is a sentence: `N [m:ss] | words`. `{braced}` text is cut (words or
pauses, e.g. `{~2.4s}`); an unbraced `~2.4s` plays at normal speed and `>>12.0s`
plays fast-forward.

Then call the edit methods on `video-edit` (each rewrites edit.txt to match):

| User says                         | Call                                                                        |
| --------------------------------- | --------------------------------------------------------------------------- |
| "cut where I said X"              | `cut --input quote="X"`                                                     |
| "cut from where I said X to Y"    | `cut --input quote="X" --input untilQuote="Y"`                              |
| "cut 12:30 to 13:05"              | `cut --input start=12:30 --input end=13:05`                                 |
| "put back the part about X"       | `keep --input quote="X"`                                                    |
| "don't speed up the part where X" | `speed --input quote="X" --input untilQuote="<next words>" --input speed=1` |
| "speed that wait back up"         | `speed --input start=... --input end=... --input speed=auto`                |

```bash
swamp model method run video-edit cut \
  --input recordingPath=<path> --input "quote=we can scratch that"
```

`occurrence=2` picks the second time a phrase was said. A wait that should stay
but play faster or slower takes `speed=<n>`.

`cut` and `keep` act on whole waits: a time range that covers only part of a
wait is refused (the message names the wait), so widen it or use `speed`.
`speed` changes only waits that play (`>>`, or a kept `~`); to bring back a wait
that was cut, `keep` it first. Chat edits refuse while edit.txt holds hand edits
that were not imported: import them (or run video-recut) first.

For caption fixes, or many changes at once, edit `edit.txt` directly: retyping a
word changes only its caption, deleting or bracing words cuts them, `>>` ↔ `~`
switches a wait between fast-forward and normal speed, and bracing a wait
(`{>>30.1s}`) cuts it. Never turn `>>` into `~` to cut a wait: that plays it in
real time. Braces must not nest (the import says which line is wrong).

Then re-render, which reads edit.txt back first:

```bash
swamp workflow run @swamp/video/video-recut \
  --input recordingPath=<path> --input "title=<same headline>"
```

## Describing it

Draft the title, a two-to-three sentence summary and chapters from the
transcript (`swamp data get video-transcript <take>`) and the screen text
timeline (`swamp data get video-screen <take>`; anything that looked like a
credential reads `[<kind> redacted]` there). Chapter starts are raw times taken
from edit.txt line stamps. Show the draft, then:

```bash
swamp workflow run @swamp/video/video-describe \
  --input recordingPath=<path> --input "title=..." --input "summary=..." \
  --input-file chapters.yaml   # chapters: [{start: "0:00", title: ...}, ...]
```

YouTube needs at least three chapters, each 10s or longer, starting at 0:00;
describe drops chapters that don't fit and omits them all below three. Pass
`presenter=<instance>` (a @swamp/video/presenter) to add the call to action and
links.

## Things to check before saying it's done

- A `pixelating ...` warning for every credential the user expects hidden. If
  something sensitive shows that OCR missed, cut that range.
- `allow` on the screen analysis for text that looks secret but isn't.
- Hand-written forced speeds survive re-imports only while the wait stays `>>`.
