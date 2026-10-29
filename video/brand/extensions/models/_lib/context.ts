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
 * The parts of swamp's method context brand uses, and the take naming it
 * must share with @swamp/video: render finds brand's cards by the take's
 * name and checks the recording path stored with them. Copied from core
 * (extensions can't import each other); context_test.ts pins the naming.
 *
 * @module
 */

export interface Logger {
  debug: (msg: string) => void;
  info: (msg: string) => void;
  warn: (msg: string) => void;
  error: (msg: string) => void;
}

export interface DataRecord {
  name?: string;
  version: number;
  attributes?: Record<string, unknown>;
}

export interface BrandContext {
  signal: AbortSignal;
  repoDir?: string;
  globalArgs: Record<string, unknown>;
  logger: Logger;
  writeResource: (
    specName: string,
    name: string,
    data: Record<string, unknown>,
  ) => Promise<unknown>;
  readModelData: (
    modelName: string,
    specName?: string,
  ) => Promise<DataRecord[]>;
}

/** An instance's latest record of a spec regardless of name (config). */
export async function readLatest(
  ctx: BrandContext,
  instance: string,
  specName: string,
): Promise<Record<string, unknown> | undefined> {
  const records = await ctx.readModelData(instance, specName);
  return records.sort((a, b) => b.version - a.version)[0]?.attributes;
}

/** A path from an argument: absolute, ~/, or relative to the repo. */
export function resolvePath(ctx: { repoDir?: string }, path: string): string {
  const p = expandHome(path);
  if (p.startsWith("/")) return p;
  return `${ctx.repoDir ?? Deno.cwd()}/${p}`;
}

export function expandHome(path: string): string {
  return path.startsWith("~/")
    ? `${Deno.env.get("HOME") ?? "."}${path.slice(1)}`
    : path;
}

export interface Take {
  recording: string;
  /** The recording's path without its extension. */
  stem: string;
  /** A data-safe name for the take (no `/`, `\`, `..`). */
  name: string;
  workDir: string;
}

/** The take for a resolved recording path, exactly as core names it. */
export function takeOf(recordingPath: string): Take {
  const slash = recordingPath.lastIndexOf("/");
  const dot = recordingPath.lastIndexOf(".");
  const stem = dot > slash + 1 ? recordingPath.slice(0, dot) : recordingPath;
  const base = stem.slice(slash + 1);
  const name = base.toLowerCase().replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "") || "take";
  return {
    recording: recordingPath,
    stem,
    name,
    workDir: `${stem}.video`,
  };
}
