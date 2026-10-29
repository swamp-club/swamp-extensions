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
 * Verbatim, word-timed transcripts. faster-whisper is the default: on the
 * reference take it kept 70 fillers to whisper.cpp's 27, ran in 45s to
 * 188s, and whisper.cpp (no VAD) invented "Thank you." every 30s through a
 * silent six-minute wait, which would defeat fast-forward detection.
 * whisper.cpp stays available for machines without Python.
 *
 * @module
 */

import type { Word } from "./edit_list.ts";
import { run } from "./exec.ts";
import { FASTER_WHISPER_SCRIPT } from "./faster_whisper_helper.ts";
import { ensureWorkDir, type Take } from "./media.ts";

/** Whisper drops fillers unless the prompt shows them transcribed verbatim. */
export const VERBATIM_PROMPT =
  "Umm, so, uh, let me, um, show you how this, uh... works. Hmm, okay, so, like, yeah.";

export type Backend = "faster-whisper" | "whisper-cpp";

export interface TranscribeOptions {
  backend: Backend;
  model: string;
  language: string;
  prompt: string;
  vocabulary: string[];
  threads: number;
  ffmpeg: string;
  uv: string;
  whisperCli: string;
  modelDir: string;
  signal?: AbortSignal;
}

export function fullPrompt(prompt: string, vocabulary: string[]): string {
  return vocabulary.length ? `${prompt} ${vocabulary.join(", ")}.` : prompt;
}

interface WhisperToken {
  text: string;
  offsets: { from: number; to: number };
}

/**
 * whisper-cli -ojf output to words: a token with a leading space starts a
 * word, others (punctuation, word pieces) extend it; special tokens such as
 * [_BEG_] are dropped. Times are milliseconds.
 */
export function wordsFromWhisperCpp(json: string): Word[][] {
  const doc = JSON.parse(json) as {
    transcription?: { tokens?: WhisperToken[] }[];
  };
  const segments: Word[][] = [];
  for (const seg of doc.transcription ?? []) {
    const words: Word[] = [];
    for (const tok of seg.tokens ?? []) {
      if (tok.text.startsWith("[_") || !tok.text.trim()) continue;
      const s = tok.offsets.from / 1000, e = tok.offsets.to / 1000;
      const last = words[words.length - 1];
      if (last && !tok.text.startsWith(" ")) {
        last.w += tok.text;
        last.e = Math.max(last.e, e);
      } else {
        words.push({ w: tok.text, s, e });
      }
    }
    if (words.length) segments.push(words);
  }
  return segments;
}

async function extractWav(
  take: Take,
  track: number,
  opts: TranscribeOptions,
): Promise<string> {
  await ensureWorkDir(take);
  const wav = `${take.workDir}/speech.wav`;
  await run({
    bin: opts.ffmpeg,
    args: [
      "-hide_banner",
      "-loglevel",
      "error",
      "-y",
      "-i",
      take.recording,
      "-map",
      `0:a:${track}`,
      "-ac",
      "1",
      "-ar",
      "16000",
      "-c:a",
      "pcm_s16le",
      wav,
    ],
    signal: opts.signal,
  });
  return wav;
}

async function fasterWhisper(
  take: Take,
  wav: string,
  opts: TranscribeOptions,
): Promise<Word[][]> {
  const script = `${take.workDir}/video_transcribe.py`;
  const out = `${take.workDir}/transcript.raw.json`;
  await Deno.writeTextFile(script, FASTER_WHISPER_SCRIPT);
  await run({
    bin: opts.uv,
    args: [
      "run",
      "--quiet",
      "--script",
      script,
      wav,
      out,
      opts.model,
      opts.language,
      fullPrompt(opts.prompt, opts.vocabulary),
      String(opts.threads),
    ],
    signal: opts.signal,
  });
  return JSON.parse(await Deno.readTextFile(out));
}

async function whisperCpp(
  take: Take,
  wav: string,
  opts: TranscribeOptions,
): Promise<Word[][]> {
  const modelPath = `${opts.modelDir}/ggml-${opts.model}.bin`;
  try {
    await Deno.stat(modelPath);
  } catch {
    throw new Error(
      `whisper.cpp model ${modelPath} not found: download ggml-${opts.model}.bin ` +
        `from https://huggingface.co/ggerganov/whisper.cpp into ${opts.modelDir}`,
    );
  }
  const base = `${take.workDir}/whisper`;
  await run({
    bin: opts.whisperCli,
    args: [
      "-m",
      modelPath,
      "-f",
      wav,
      "-l",
      opts.language || "auto",
      "-t",
      String(opts.threads),
      "--prompt",
      fullPrompt(opts.prompt, opts.vocabulary),
      "-ojf",
      "-of",
      base,
      "-np",
    ],
    signal: opts.signal,
  });
  return wordsFromWhisperCpp(await Deno.readTextFile(`${base}.json`));
}

export async function transcribe(
  take: Take,
  track: number,
  opts: TranscribeOptions,
): Promise<Word[][]> {
  const wav = await extractWav(take, track, opts);
  try {
    return opts.backend === "whisper-cpp"
      ? await whisperCpp(take, wav, opts)
      : await fasterWhisper(take, wav, opts);
  } finally {
    await Deno.remove(wav).catch(() => {});
  }
}
