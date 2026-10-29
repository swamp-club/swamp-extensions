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
 * The process boundary for ffmpeg, a copy of @swamp/video's (extensions
 * can't import each other). Every call goes through `run`, as
 * `Deno.Command(bin, { args })` and never `sh -c`. Tests swap the executor
 * for a fake that records argv and answers with canned output. Chromium is
 * driven over its DevTools socket instead: see scene.ts.
 *
 * @module
 */

export interface ExecRequest {
  bin: string;
  args: string[];
  cwd?: string;
  stdin?: string;
  signal?: AbortSignal;
}

export interface ExecResult {
  exitCode: number;
  /** Raw stdout: raw PCM for the energy envelope, text for the rest. */
  stdout: Uint8Array;
  stderr: string;
}

export type CommandExecutor = (req: ExecRequest) => Promise<ExecResult>;

const realExecutor: CommandExecutor = async (req) => {
  // ffmpeg, whisper and friends are the work itself; argv only, never a
  // shell, and the README lists every binary.
  // swamp-quality-ignore deno-command
  const cmd = new Deno.Command(req.bin, {
    args: req.args,
    cwd: req.cwd,
    stdin: req.stdin === undefined ? "null" : "piped",
    stdout: "piped",
    stderr: "piped",
    signal: req.signal,
  });
  const child = cmd.spawn();
  // Drain stdout/stderr while writing stdin, so neither side can block.
  const output = child.output();
  if (req.stdin !== undefined) {
    const writer = child.stdin.getWriter();
    try {
      await writer.write(new TextEncoder().encode(req.stdin));
      await writer.close();
    } catch {
      // The child exited without reading it all; its exit code says why.
    }
  }
  const out = await output;
  return {
    exitCode: out.code,
    stdout: out.stdout,
    stderr: new TextDecoder().decode(out.stderr),
  };
};

let executor: CommandExecutor = realExecutor;

export function setCommandExecutor(fn: CommandExecutor): void {
  executor = fn;
}

export function resetCommandExecutor(): void {
  executor = realExecutor;
}

export class ExecError extends Error {
  constructor(
    readonly bin: string,
    readonly exitCode: number,
    readonly stderr: string,
  ) {
    const tail = stderr.trim().split("\n").slice(-15).join("\n");
    super(`${bin} exited ${exitCode}${tail ? `:\n${tail}` : ""}`);
  }
}

/** Run a command; throw with the last stderr lines when it fails. */
export async function run(req: ExecRequest): Promise<ExecResult> {
  let result: ExecResult;
  try {
    result = await executor(req);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      throw new Error(
        `${req.bin} not found: install it or point the binary setting at it`,
      );
    }
    throw err;
  }
  if (result.exitCode !== 0) {
    throw new ExecError(req.bin, result.exitCode, result.stderr);
  }
  return result;
}

export async function runText(req: ExecRequest): Promise<string> {
  return new TextDecoder().decode((await run(req)).stdout);
}
