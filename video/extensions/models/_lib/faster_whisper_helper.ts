// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

/**
 * The faster-whisper backend: a uv inline-script, written to the take's work
 * dir and run with `uv run --script`, so uv fetches faster-whisper on first
 * use and the extension ships no Python files. It reads a 16 kHz mono WAV
 * and writes demo-polish's transcript.json shape: segments of {w, s, e}.
 *
 * Arguments: wav, output json, model, language, prompt, threads.
 *
 * @module
 */

export const FASTER_WHISPER_SCRIPT = `# /// script
# requires-python = ">=3.12,<3.13"
# dependencies = ["faster-whisper==1.2.1"]
# ///
import json, sys, wave

import numpy as np
from faster_whisper import WhisperModel

wav, out, model_name, lang, prompt, threads = sys.argv[1:7]
with wave.open(wav) as f:
    audio = np.frombuffer(f.readframes(f.getnframes()), np.int16).astype(np.float32) / 32768
model = WhisperModel(model_name, device="cpu", compute_type="int8", cpu_threads=int(threads))
segments, _ = model.transcribe(audio, language=lang or None, initial_prompt=prompt or None,
                               word_timestamps=True, vad_filter=True, condition_on_previous_text=True)
result = []
for seg in segments:
    print(f"transcribed {seg.end:.1f}s", file=sys.stderr, flush=True)
    result.append([{"w": w.word, "s": w.start, "e": w.end} for w in seg.words or []])
with open(out, "w") as f:
    json.dump(result, f)
`;
