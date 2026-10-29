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
 * Test doubles: an in-memory swamp (each instance's resources, readable
 * across instances like readModelData) and a fake process boundary that
 * records argv and answers each binary from a handler.
 *
 * @module
 */

import type { DataRecord, VideoContext } from "./context.ts";
import {
  type ExecRequest,
  type ExecResult,
  resetCommandExecutor,
  setCommandExecutor,
} from "./exec.ts";

export class FakeSwamp {
  /** instance -> resource name -> [spec, versions] */
  data = new Map<
    string,
    Map<string, { spec: string; versions: Record<string, unknown>[] }>
  >();
  logs: { level: string; msg: string }[] = [];

  context(
    instance: string,
    globalArgs: Record<string, unknown> = {},
    repoDir?: string,
  ): VideoContext {
    const mine = () => {
      let m = this.data.get(instance);
      if (!m) this.data.set(instance, m = new Map());
      return m;
    };
    const log = (level: string) => (msg: string) =>
      this.logs.push({ level, msg });
    return {
      signal: new AbortController().signal,
      repoDir,
      globalArgs,
      logger: {
        debug: log("debug"),
        info: log("info"),
        warn: log("warn"),
        error: log("error"),
      },
      writeResource: (spec, name, data) => {
        const m = mine();
        const entry = m.get(name) ?? { spec, versions: [] };
        entry.versions.push(structuredClone(JSON.parse(JSON.stringify(data))));
        m.set(name, entry);
        return Promise.resolve({ name, version: entry.versions.length });
      },
      readResource: (name, version) => {
        const versions = mine().get(name)?.versions ?? [];
        const v = versions[(version ?? versions.length) - 1];
        return Promise.resolve(v === undefined ? null : structuredClone(v));
      },
      readModelData: (modelName, specName) => {
        const out: DataRecord[] = [];
        for (const [name, entry] of this.data.get(modelName) ?? []) {
          if (specName !== undefined && entry.spec !== specName) continue;
          out.push({
            name,
            version: entry.versions.length,
            attributes: structuredClone(
              entry.versions[entry.versions.length - 1],
            ),
          });
        }
        return Promise.resolve(out);
      },
    };
  }

  latest(instance: string, name: string): Record<string, unknown> | undefined {
    const versions = this.data.get(instance)?.get(name)?.versions;
    return versions?.[versions.length - 1];
  }
}

export type Handler = (
  req: ExecRequest,
) => Partial<ExecResult> | Promise<Partial<ExecResult>>;

/** Install a fake process boundary; returns the recorded requests. */
export function fakeExec(handlers: Record<string, Handler>): ExecRequest[] {
  const calls: ExecRequest[] = [];
  setCommandExecutor(async (req) => {
    calls.push(req);
    const handler = handlers[req.bin];
    if (!handler) throw new Deno.errors.NotFound(req.bin);
    const r = await handler(req);
    return {
      exitCode: r.exitCode ?? 0,
      stdout: r.stdout ?? new Uint8Array(),
      stderr: r.stderr ?? "",
    };
  });
  return calls;
}

export { resetCommandExecutor };

export function text(s: string): Uint8Array {
  return new TextEncoder().encode(s);
}

/** ffprobe JSON for a take. */
export function probeJson(
  duration: number,
  audioTracks = 1,
  fps = "30/1",
): Uint8Array {
  const streams: Record<string, unknown>[] = [{
    codec_type: "video",
    r_frame_rate: fps,
    width: 1920,
    height: 1080,
  }];
  for (let i = 0; i < audioTracks; i++) streams.push({ codec_type: "audio" });
  return text(
    JSON.stringify({ streams, format: { duration: String(duration) } }),
  );
}

/** Mono s16le PCM: loud where `speech` says, near silence elsewhere. */
export function pcm(duration: number, speech: [number, number][]): Uint8Array {
  const n = Math.floor(duration * 16000);
  const buf = new Uint8Array(n * 2);
  const view = new DataView(buf.buffer);
  for (let i = 0; i < n; i++) {
    const t = i / 16000;
    const loud = speech.some(([a, b]) => t >= a && t < b);
    view.setInt16(i * 2, loud ? (i % 2 ? 8000 : -8000) : 0, true);
  }
  return buf;
}

/** The argument after `flag` in a recorded request. */
export function argAfter(req: ExecRequest, flag: string): string | undefined {
  const i = req.args.indexOf(flag);
  return i >= 0 ? req.args[i + 1] : undefined;
}
