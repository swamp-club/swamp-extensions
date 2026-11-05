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
 * Running the read-only probe on a target: locally, or in a Docker container
 * (a running one, or one started from an image for the scan). The probe is a
 * POSIX shell script fed on stdin to `sh -s`, so the same script works on
 * every transport.
 *
 * @module
 */

import { analyze, parseProbe } from "./analysis.ts";
import { PROBE_SCRIPT } from "./probe.ts";
import type { Status } from "./schemas.ts";

export type Logger = {
  info: (msg: string) => void;
  debug: (msg: string) => void;
};

export type Transport =
  | { kind: "local" }
  | { kind: "docker"; container: string };

export type RunResult = { stdout: string; stderr: string; exitCode: number };

export const DEFAULT_TIMEOUT_MS = 120_000;
export const TIMEOUT_EXIT = 124;
export const NOT_FOUND_EXIT = 127;

export function present(val: string | undefined): string | undefined {
  return val && val.length > 0 ? val : undefined;
}

/** Rejects a Docker reference docker could read as an option. */
export function assertSafeDockerRef(label: string, value: string): void {
  if (!/^[A-Za-z0-9][A-Za-z0-9._/:@-]*$/.test(value)) {
    throw new Error(`Refusing unsafe ${label} ${JSON.stringify(value)}`);
  }
}

/** A running container when one is named, else the local machine. */
export function buildTransport(g: { dockerContainer?: string }): Transport {
  const container = present(g.dockerContainer);
  if (container) {
    assertSafeDockerRef("dockerContainer", container);
    return { kind: "docker", container };
  }
  return { kind: "local" };
}

export function targetLabel(g: { dockerContainer?: string }): string {
  const container = present(g.dockerContainer);
  // The full name: a prefix could collide (app-production-1 / -2).
  if (container) return `docker-${container}`;
  return "localhost";
}

/** Runs argv with optional stdin, killing it after timeoutMs. */
export async function runArgv(
  cmd: string[],
  timeoutMs: number,
  stdin?: string,
): Promise<RunResult> {
  const signal = AbortSignal.timeout(timeoutMs);
  let child: Deno.ChildProcess;
  try {
    // swamp-quality-ignore deno-command
    child = new Deno.Command(cmd[0], {
      args: cmd.slice(1),
      stdin: stdin !== undefined ? "piped" : "null",
      stdout: "piped",
      stderr: "piped",
      signal,
    }).spawn();
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return {
        stdout: "",
        stderr: `${cmd[0]}: command not found`,
        exitCode: NOT_FOUND_EXIT,
      };
    }
    throw err;
  }
  if (stdin !== undefined) {
    const writer = child.stdin.getWriter();
    await writer.write(new TextEncoder().encode(stdin)).catch(() => {});
    await writer.close().catch(() => {});
  }
  const { code, stdout, stderr } = await child.output();
  const out = new TextDecoder().decode(stdout).trim();
  const err = new TextDecoder().decode(stderr).trim();
  if (signal.aborted) {
    return {
      stdout: out,
      stderr: `timed out after ${timeoutMs / 1000}s${err ? `: ${err}` : ""}`,
      exitCode: TIMEOUT_EXIT,
    };
  }
  return { stdout: out, stderr: err, exitCode: code };
}

/** Wraps a shell script so it runs on the chosen transport, via `sh -s`. */
export function probeCommand(t: Transport): string[] {
  switch (t.kind) {
    case "local":
      return ["sh", "-s"];
    case "docker":
      return ["docker", "exec", "-i", t.container, "sh", "-s"];
  }
}

export type Runner = (
  script: string,
  timeoutMs?: number,
) => Promise<RunResult>;

export function makeRunner(t: Transport, logger: Logger): Runner {
  return (script: string, timeoutMs = DEFAULT_TIMEOUT_MS) => {
    const cmd = probeCommand(t);
    logger.debug(`run: ${cmd.join(" ")}`);
    return runArgv(cmd, timeoutMs, script);
  };
}

/** How startDockerImage and stopContainer run docker; tests stub it. */
export type DockerOptions = {
  /** The argv prefix that runs docker (default `["docker"]`). */
  docker?: string[];
  /** Limit for `docker pull` when the image is not present yet. */
  pullTimeoutMs?: number;
  /** Limit for `docker run` itself, which is quick once the image is local. */
  runTimeoutMs?: number;
  /** Pause before removing a failed container a second time. */
  retryDelayMs?: number;
};

export const PULL_TIMEOUT_MS = 600_000;
export const RETRY_DELAY_MS = 3_000;

/**
 * Starts a container from an image so its sshd can be probed, and returns its
 * name. The image is pulled first, under its own limit, so `docker run` does
 * not time out on a slow pull. The name is chosen up front, so a run that
 * fails or times out can still be removed; after a timeout the removal is
 * repeated after a pause in case the daemon finished creating it late.
 */
export async function startDockerImage(
  image: string,
  logger: Logger,
  opts: DockerOptions = {},
): Promise<string> {
  assertSafeDockerRef("dockerImage", image);
  const docker = opts.docker ?? ["docker"];
  const present = await runArgv(
    [...docker, "image", "inspect", image],
    DEFAULT_TIMEOUT_MS,
  );
  if (present.exitCode !== 0) {
    logger.info(`Pulling image ${image}`);
    const pull = await runArgv(
      [...docker, "pull", image],
      opts.pullTimeoutMs ?? PULL_TIMEOUT_MS,
    );
    if (pull.exitCode !== 0) {
      throw new Error(`docker pull failed: ${pull.stderr || pull.stdout}`);
    }
  }
  const name = `sshole-scan-${crypto.randomUUID().slice(0, 12)}`;
  logger.info(`Starting container ${name} from image ${image}`);
  const res = await runArgv(
    [
      ...docker,
      "run",
      "-d",
      "--rm",
      "--name",
      name,
      "--entrypoint",
      "sleep",
      image,
      "3600",
    ],
    opts.runTimeoutMs ?? DEFAULT_TIMEOUT_MS,
  );
  if (res.exitCode !== 0) {
    await stopContainer(name, logger, opts);
    // A timed-out run may still be finishing in the daemon: remove it again.
    if (res.exitCode === TIMEOUT_EXIT) {
      await new Promise((r) =>
        setTimeout(r, opts.retryDelayMs ?? RETRY_DELAY_MS)
      );
      await stopContainer(name, logger, opts);
    }
    throw new Error(`docker run failed: ${res.stderr || res.stdout}`);
  }
  return name;
}

export async function stopContainer(
  container: string,
  logger: Logger,
  opts: DockerOptions = {},
): Promise<void> {
  const docker = opts.docker ?? ["docker"];
  logger.info(`Stopping container ${container}`);
  await runArgv([...docker, "rm", "-f", container], DEFAULT_TIMEOUT_MS)
    .catch(() => {});
}

/** Runs the probe and grades the result. */
export async function scanTarget(
  run: Runner,
  target: string,
): Promise<Status> {
  const res = await run(PROBE_SCRIPT);
  if (!res.stdout.includes("SSHOLE_DONE=1")) {
    throw new Error(
      `probe did not complete on ${target} (exit ${res.exitCode})${
        res.stderr ? `: ${res.stderr}` : ""
      }`,
    );
  }
  const facts = parseProbe(res.stdout);
  return analyze(facts, { target });
}
