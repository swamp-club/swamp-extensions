---
name: video-brand
description: >
  Make a demo video in the Swamp Club look with @swamp/video/brand: the
  synthwave intro, presenter lower third, outro with QR code and call to
  action, and FAST FORWARD badge; or render the OBS studio look (backdrop,
  neon webcam ring, webcam mask). Use when the user names @swamp/video/brand,
  the brand video-edit workflow, branded or Swamp Club cards, or the OBS
  studio stage for their videos.
---

# Swamp Club videos with @swamp/video/brand

@swamp/video/brand renders the Swamp Club cards for a take and hands them to
@swamp/video's render as its `brand` cards. Everything about editing the cut is
@swamp/video's (see its `video` skill); this covers the look.

## First cut

Check a presenter instance exists (`swamp model get presenter`). If not, ask the
user for their name, role, handle, email, campaign URL and call to action, then:

```bash
swamp model create @swamp/video/presenter presenter \
  --global-arg "name=<name>" --global-arg "title=<role>" \
  --global-arg 'handle=\@<handle>' --global-arg email=<email> \
  --global-arg campaignUrl=<url> --global-arg "cta=<call to action>"
swamp model method run presenter show
```

A value starting with `@` is read as a file, so escape a handle as `\@`. Never
fill these in yourself: an empty field just drops its line.

Then run the brand workflow instead of @swamp/video's `video-edit`:

```bash
swamp workflow run @swamp/video/brand/video-edit \
  --input recordingPath=<path> --input "title=<headline>" \
  --input "episode=<label, e.g. Tutorial 3>"
```

It renders the cards (a minute and a half or so) into `<rec>.video/brand/`, then
runs `video-edit` with `cards=brand` and `cardsFrom=video-brand`. It takes
`subtitle`, `presenter`, `media`, `retakeMarkers`, `coldOpenUntil`, `pixelate`
and `burn` like `video-edit`. For "open on me talking, then the title", pass
`coldOpenUntil` with the words that end the hook (or a time); the lower third
shows during the hook.

## After that

- Changing the cut: @swamp/video's `video-recut` with
  `--input cards=brand --input cardsFrom=video-brand`. The cards don't need
  rendering again.
- New title or presenter details: run
  `swamp model method run video-brand cards --input recordingPath=<rec> --input "title=..."`,
  then `video-recut` as above.
- The OBS studio look: `swamp model method run video-brand stage` writes
  `video-stage/backdrop.png`, `camera-ring.webm` and `camera-mask.png`.

Card timings are `cards` arguments: `introSeconds`, `outroSeconds`,
`lowerThirdSeconds`, `lowerThirdAt` (seconds into the take). Layout and output
size are global arguments on `video-brand`: `screenScale`, `cameraSize`,
`width`/`height` (16:9), `fps`, and `brandDir` for the user's own fonts and
marks.

Failures name their fix: a missing presenter says how to create one; a missing
`chromium` or `ffmpeg` names the binary setting.
