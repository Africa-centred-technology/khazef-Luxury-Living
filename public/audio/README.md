# Audio assets — Virtual Tour

Every clip below is optional. The tour degrades silently when any file is missing.

## Expected files

| Room     | Filename                       | Content                                   |
| -------- | ------------------------------ | ----------------------------------------- |
| living   | `ambience-fireplace.mp3`       | Soft fireplace crackle, intimate and slow |
| kitchen  | `ambience-water.mp3`           | Faint water drip + dishware & espresso hum|
| bedroom  | `ambience-breeze.mp3`          | Soft atlantic breeze + curtain rustle     |
| (legacy) | `ambience-atlantic.mp3`        | Boucle ~60s, -20 LUFS (fallback/general)  |

## Audio spec

- Format: **MP3, 128 kbps**
- Sample rate: **44.1 kHz**
- Channels: **mono** (preferred — positional audio is panned by Three's AudioPanner)
- Duration: **60 – 90 s**, seamlessly looping
- Loudness: **-20 LUFS**, integrated, normalized
- No hard transients, no voices, no music
- Export with fade-in/out disabled (they kill the loop)

Missing files are logged once as a dev-only `console.warn` and otherwise ignored.
