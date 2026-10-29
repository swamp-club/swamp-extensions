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
 * The parts of swamp's method context the video behaviors use, and helpers
 * for reading another behavior's data about the same take.
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

export interface VideoContext {
  signal: AbortSignal;
  repoDir?: string;
  globalArgs: Record<string, unknown>;
  logger: Logger;
  writeResource: (
    specName: string,
    name: string,
    data: Record<string, unknown>,
  ) => Promise<unknown>;
  readResource: (
    name: string,
    version?: number,
  ) => Promise<Record<string, unknown> | null>;
  readModelData: (
    modelName: string,
    specName?: string,
  ) => Promise<DataRecord[]>;
}

/** The name and recording path of a take, as media.ts makes them. */
export interface TakeRef {
  name: string;
  recording: string;
}

/**
 * Fail when data stored under a take's name came from another recording:
 * two recordings with the same base name share a take name.
 */
export function checkSameRecording(
  data: Record<string, unknown>,
  take: TakeRef,
  where: string,
): void {
  const stored = data.recording;
  if (typeof stored === "string" && stored !== take.recording) {
    throw new Error(
      `${where} holds take ${take.name} for ${stored}, not ${take.recording}: ` +
        `two recordings share the name ${take.name}; rename one of them`,
    );
  }
}

/** Another instance's latest `specName` record for this take, if any. */
export async function readTakeData(
  ctx: VideoContext,
  instance: string,
  specName: string,
  take: TakeRef,
): Promise<Record<string, unknown> | undefined> {
  const records = await ctx.readModelData(instance, specName);
  const data = records.find((r) => r.name === take.name)?.attributes;
  if (data) checkSameRecording(data, take, instance);
  return data;
}

/** Like readTakeData, but a missing record is an error naming the fix. */
export async function requireTakeData(
  ctx: VideoContext,
  instance: string,
  specName: string,
  take: TakeRef,
  hint: string,
): Promise<Record<string, unknown>> {
  const data = await readTakeData(ctx, instance, specName, take);
  if (!data) {
    throw new Error(
      `no ${specName} for take ${take.name} on ${instance}: ${hint}`,
    );
  }
  return data;
}

/** An instance's latest record of a spec regardless of name (config). */
export async function readLatest(
  ctx: VideoContext,
  instance: string,
  specName: string,
): Promise<Record<string, unknown> | undefined> {
  const records = await ctx.readModelData(instance, specName);
  return records.sort((a, b) => b.version - a.version)[0]?.attributes;
}

/** A path from an argument: absolute, ~/, or relative to the repo. */
export function resolvePath(ctx: { repoDir?: string }, path: string): string {
  // Absolute, because ffmpeg runs from the take's work dir.
  const p = expandHome(path);
  if (p.startsWith("/")) return p;
  return `${ctx.repoDir ?? Deno.cwd()}/${p}`;
}

export function home(): string {
  return Deno.env.get("HOME") ?? ".";
}

export function expandHome(path: string): string {
  return path.startsWith("~/") ? `${home()}${path.slice(1)}` : path;
}
