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
 * Test doubles: an in-memory swamp (as @swamp/video's tests use), a fake
 * process boundary for ffmpeg, and a fake browser that hands back a tiny
 * PNG for every frame, so no Chromium or ffmpeg runs under test.
 *
 * @module
 */

import type { BrandContext, DataRecord } from "./context.ts";
import {
  type ExecRequest,
  type ExecResult,
  resetCommandExecutor,
  setCommandExecutor,
} from "./exec.ts";
import {
  resetSceneLauncher,
  type SceneOptions,
  setSceneLauncher,
} from "./scene.ts";

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
  ): BrandContext {
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

/** Install a fake ffmpeg that succeeds; returns the recorded requests. */
export function fakeExec(): ExecRequest[] {
  const calls: ExecRequest[] = [];
  setCommandExecutor((req): Promise<ExecResult> => {
    calls.push(req);
    return Promise.resolve({
      exitCode: 0,
      stdout: new Uint8Array(),
      stderr: "",
    });
  });
  return calls;
}

/** The smallest PNG signature a frame can be told apart by. */
export const FAKE_PNG = new Uint8Array([0x89, 0x50, 0x4e, 0x47]);

export interface SceneCall {
  opts: SceneOptions;
  /** The page's HTML when the scene opened. */
  html: string;
  frames: number[];
  closed: boolean;
}

/** Install a fake browser; returns each scene it opened. */
export function fakeScenes(): SceneCall[] {
  const scenes: SceneCall[] = [];
  setSceneLauncher(async (opts) => {
    const call: SceneCall = {
      opts,
      html: await Deno.readTextFile(opts.page),
      frames: [],
      closed: false,
    };
    scenes.push(call);
    return {
      frame: (seconds) => {
        call.frames.push(seconds);
        return Promise.resolve(FAKE_PNG);
      },
      close: () => {
        call.closed = true;
        return Promise.resolve();
      },
    };
  });
  return scenes;
}

export function resetFakes(): void {
  resetCommandExecutor();
  resetSceneLauncher();
}
