// Swamp, an Automation Framework
// Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Port forwarding.
 *
 *   ssh transport       → `ssh -O forward / -O cancel` against the master.
 *                         The control connection is opened lazily if needed.
 *   tailscale transport → a detached `tailscale ssh -N -L <spec>` child
 *                         whose pid is tracked in a forwardState resource;
 *                         cancel kills the pid.
 *
 * @module
 */

import type { EffectiveHost } from "./hosts.ts";

/** Parsed `LPORT:RHOST:RPORT`. */
export interface ForwardSpec {
  localPort: number;
  remoteHost: string;
  remotePort: number;
}

/** Parse and validate a forward spec. Returns null on malformed input. */
export function parseForwardSpec(spec: string): ForwardSpec | null {
  const parts = spec.split(":");
  if (parts.length !== 3) return null;
  const [lp, rh, rp] = parts;
  const localPort = Number(lp);
  const remotePort = Number(rp);
  if (!isPort(localPort) || !isPort(remotePort)) return null;
  if (rh.length === 0) return null;
  return { localPort, remoteHost: rh, remotePort };
}

function isPort(n: number): boolean {
  return Number.isInteger(n) && n >= 0 && n <= 65535;
}

/** `user@address` or bare `address`. */
function destination(host: EffectiveHost): string {
  return host.transport.user
    ? `${host.transport.user}@${host.address}`
    : host.address;
}

// ---------------------------------------------------------------------------
// Argv builders
// ---------------------------------------------------------------------------

/** `ssh -O forward -L <spec> <dest>` (or `-O cancel`, or `-R`). */
export function sshForwardArgv(
  sshBinary: string,
  controlPath: string,
  action: "forward" | "cancel",
  type: "L" | "R",
  spec: string,
  host: EffectiveHost,
): string[] {
  return [
    sshBinary,
    "-O",
    action,
    "-o",
    `ControlPath=${controlPath}`,
    `-${type}`,
    spec,
    destination(host),
  ];
}

/** `tailscale ssh -N -L <spec> <dest>` for a detached forward child. */
export function tailscaleForwardArgv(
  tailscaleBinary: string,
  type: "L" | "R",
  spec: string,
  host: EffectiveHost,
): string[] {
  if (host.transport.kind !== "tailscale") {
    throw new Error("tailscaleForwardArgv called for non-tailscale host");
  }
  return [
    tailscaleBinary,
    "ssh",
    ...host.transport.sshExtraArgs,
    "-N",
    `-${type}`,
    spec,
    destination(host),
  ];
}

// ---------------------------------------------------------------------------
// Injectable process seams
// ---------------------------------------------------------------------------

/** Spawns a detached process and returns its pid. */
export type ForwardSpawner = (
  argv: string[],
  env: Record<string, string>,
) => { pid: number };

/** Kills a process by pid. */
export type ProcessKiller = (pid: number) => void;

/** Production spawner — detaches the child so it outlives this run. */
export const denoForwardSpawner: ForwardSpawner = (argv, env) => {
  const child = new Deno.Command(argv[0], {
    args: argv.slice(1),
    env,
    clearEnv: false,
    stdin: "null",
    stdout: "null",
    stderr: "null",
  }).spawn();
  // Detach so the parent process can exit without waiting on the forward.
  child.unref();
  return { pid: child.pid };
};

/** Production killer. */
export const denoProcessKiller: ProcessKiller = (pid) => {
  Deno.kill(pid, "SIGTERM");
};

let activeSpawner: ForwardSpawner = denoForwardSpawner;
let activeKiller: ProcessKiller = denoProcessKiller;

/** Replace the forward spawner (test seam). */
export function setForwardSpawner(s: ForwardSpawner): void {
  activeSpawner = s;
}
/** Replace the process killer (test seam). */
export function setProcessKiller(k: ProcessKiller): void {
  activeKiller = k;
}
/** Restore production spawner + killer. */
export function resetForwardSeams(): void {
  activeSpawner = denoForwardSpawner;
  activeKiller = denoProcessKiller;
}

// ---------------------------------------------------------------------------
// Lifecycle operations
// ---------------------------------------------------------------------------

/** What an open returns so the model can persist forwardState. */
export interface OpenedForward {
  pid?: number;
  controlPath?: string;
}

/**
 * Open a forward against a tailscale host. Spawns the detached child and
 * returns its pid for tracking.
 */
export function openTailscaleForward(
  host: EffectiveHost,
  tailscaleBinary: string,
  type: "L" | "R",
  spec: string,
  env: Record<string, string>,
): OpenedForward {
  const bin = host.transport.kind === "tailscale" &&
      host.transport.tailscaleBinary
    ? host.transport.tailscaleBinary
    : tailscaleBinary;
  const argv = tailscaleForwardArgv(bin, type, spec, host);
  const { pid } = activeSpawner(argv, env);
  return { pid };
}

/** Cancel a tailscale forward by killing its tracked pid. */
export function cancelTailscaleForward(pid: number): void {
  activeKiller(pid);
}
