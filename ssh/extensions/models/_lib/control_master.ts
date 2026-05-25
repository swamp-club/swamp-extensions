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
 * ControlMaster socket path calculation + directory setup helpers.
 *
 * Sockets live at:
 *   <base>/swamp-ssh/<fleet>/<sha1(user@addr:port)[:12]>.sock
 *
 * where `<base>` is resolved length-aware: XDG_RUNTIME_DIR or TMPDIR when
 * the total path fits in 104 bytes, otherwise /tmp. `<fleet>` isolates
 * masters per swamp model instance — two fleets that happen to share a
 * host don't fight over a socket. The truncated SHA-1 (12 hex chars, 48
 * bits) keeps filenames short while providing ample collision resistance
 * for per-machine socket naming.
 *
 * @module
 */

import type { EffectiveHost } from "./hosts.ts";

// macOS sockaddr_un.sun_path is 104 bytes; Linux is 108. Use the smaller.
const UNIX_SOCKET_MAX = 104;
// 12 hex chars = 48 bits. Birthday-bound collision at ~2^24 (16M) sockets
// per fleet — safe for per-machine naming.
const HASH_CHARS = 12;
const SOCK_SUFFIX = ".sock";
const SOCK_FILENAME_LEN = HASH_CHARS + SOCK_SUFFIX.length; // 17

/**
 * Compute the base directory for a fleet's control sockets.
 *
 * Resolution order: `XDG_RUNTIME_DIR` (Linux session, mode 700), then
 * `TMPDIR` (POSIX), then `/tmp`. The base dir is one level above the
 * per-fleet dir we actually create.
 */
export function controlBaseDir(envSource: Record<string, string> = {
  XDG_RUNTIME_DIR: Deno.env.get("XDG_RUNTIME_DIR") ?? "",
  TMPDIR: Deno.env.get("TMPDIR") ?? "",
}): string {
  const xdg = envSource.XDG_RUNTIME_DIR;
  if (xdg && xdg.length > 0) return `${xdg}/swamp-ssh`;
  const tmp = envSource.TMPDIR;
  if (tmp && tmp.length > 0) return `${tmp}/swamp-ssh`;
  return "/tmp/swamp-ssh";
}

/** Per-fleet directory for control sockets. */
export function controlFleetDir(
  fleetName: string,
  envSource?: Record<string, string>,
): string {
  return `${controlBaseDir(envSource)}/${fleetName}`;
}

/**
 * Return a fleet directory whose full socket path fits within
 * {@link UNIX_SOCKET_MAX}. Tries the env-based directory first; falls
 * back to `/tmp/swamp-ssh/<fleet>` if too long; hashes the fleet name
 * as a last resort for extremely long names.
 */
export async function safeFleetDir(
  fleetName: string,
  envSource?: Record<string, string>,
): Promise<string> {
  const budget = UNIX_SOCKET_MAX - 1 - SOCK_FILENAME_LEN; // 1 for '/'
  let dir = controlFleetDir(fleetName, envSource);
  if (dir.length <= budget) return dir;

  dir = `/tmp/swamp-ssh/${fleetName}`;
  if (dir.length <= budget) return dir;

  const shortFleet = (await sha1Hex(fleetName)).slice(0, 8);
  return `/tmp/swamp-ssh/${shortFleet}`;
}

/**
 * SHA-1 of `<user>@<address>:<port>` rendered as lowercase hex. Stable
 * across invocations so subsequent calls find the same socket; identity-
 * sensitive to user/address/port so a change in any of them lands on a
 * new socket (and the old one drains naturally via ControlPersist).
 */
export async function sha1Hex(value: string): Promise<string> {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * Build the ControlPath for a given fleet + host.
 *
 * Only meaningful for `ssh` transport hosts. Callers should not invoke
 * this for `tailscale` hosts — there's no master to address.
 */
export async function controlPath(
  fleetName: string,
  host: EffectiveHost,
  envSource?: Record<string, string>,
): Promise<string> {
  if (host.transport.kind !== "ssh") {
    throw new Error(
      `controlPath called for non-ssh host ${host.name} (transport ${host.transport.kind})`,
    );
  }
  const user = host.transport.user ?? "";
  const handle = `${user}@${host.address}:${host.transport.port}`;
  const digest = (await sha1Hex(handle)).slice(0, HASH_CHARS);
  const dir = await safeFleetDir(fleetName, envSource);
  return `${dir}/${digest}${SOCK_SUFFIX}`;
}

/**
 * Ensure the per-fleet control directory exists with mode 0700. If it
 * already exists with broader permissions, returns `{ writable: false,
 * reason: ... }` so the `master-writable` check can refuse the call
 * before we touch the network.
 *
 * Creates parent directories as needed (`recursive: true`). On systems
 * without UNIX permissions (e.g. Windows), the mode check is skipped —
 * Deno.stat().mode is null there.
 */
export async function ensureControlDir(
  fleetName: string,
  envSource?: Record<string, string>,
): Promise<
  { writable: true; path: string } | { writable: false; reason: string }
> {
  const dir = await safeFleetDir(fleetName, envSource);
  try {
    await Deno.mkdir(dir, { recursive: true, mode: 0o700 });
  } catch (err) {
    if (!(err instanceof Deno.errors.AlreadyExists)) {
      return {
        writable: false,
        reason: `failed to create ${dir}: ${
          err instanceof Error ? err.message : String(err)
        }`,
      };
    }
  }

  try {
    const stat = await Deno.stat(dir);
    if (!stat.isDirectory) {
      return {
        writable: false,
        reason: `${dir} exists but is not a directory`,
      };
    }
    // mode === null on platforms without UNIX permissions. Treat that as
    // "good enough" — the caller has nothing to compare against.
    if (stat.mode !== null && (stat.mode & 0o077) !== 0) {
      return {
        writable: false,
        reason:
          `${dir} has world/group permissions (mode ${
            (stat.mode & 0o777).toString(8)
          }). ` +
          `Expected 0700 — adjust with chmod or relocate XDG_RUNTIME_DIR.`,
      };
    }
  } catch (err) {
    return {
      writable: false,
      reason: `stat ${dir}: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }

  return { writable: true, path: dir };
}

// ---------------------------------------------------------------------------
// Argv helpers (master lifecycle commands). These return argv arrays
// only — the runner is responsible for spawning. Keeping them here keeps
// every ControlMaster knob in one file.
// ---------------------------------------------------------------------------

/**
 * Options pulled from the EffectiveHost that affect master argv. Subset
 * sufficient for open/check/exit; the full -o pile lives in runner.ts.
 */
export interface MasterArgvOptions {
  controlPath: string;
  persistSec: number;
  identityFile?: string;
  identityAgent?: string;
  identitiesOnly?: boolean;
  user?: string;
  address: string;
  port: number;
  proxyJump?: string;
  proxyCommand?: string;
}

/** Argv for `ssh -fN ...` to open a master in the background. */
export function openMasterArgv(
  sshBinary: string,
  opts: MasterArgvOptions,
): string[] {
  const argv: string[] = [
    sshBinary,
    "-o",
    "ControlMaster=yes",
    "-o",
    `ControlPath=${opts.controlPath}`,
    "-o",
    `ControlPersist=${opts.persistSec}`,
  ];
  if (opts.identitiesOnly !== undefined) {
    argv.push("-o", `IdentitiesOnly=${opts.identitiesOnly ? "yes" : "no"}`);
  }
  if (opts.identityAgent) {
    argv.push("-o", `IdentityAgent=${opts.identityAgent}`);
  }
  if (opts.proxyCommand) {
    argv.push("-o", `ProxyCommand=${opts.proxyCommand}`);
  }
  if (opts.proxyJump) argv.push("-J", opts.proxyJump);
  if (opts.identityFile) argv.push("-i", opts.identityFile);
  argv.push("-p", String(opts.port));
  argv.push("-fN");
  argv.push(opts.user ? `${opts.user}@${opts.address}` : opts.address);
  return argv;
}

/** Argv for `ssh -O check` against an existing master. */
export function checkMasterArgv(
  sshBinary: string,
  controlPath: string,
  user: string | undefined,
  address: string,
): string[] {
  return [
    sshBinary,
    "-O",
    "check",
    "-o",
    `ControlPath=${controlPath}`,
    user ? `${user}@${address}` : address,
  ];
}

/** Argv for `ssh -O exit` to close an existing master. */
export function exitMasterArgv(
  sshBinary: string,
  controlPath: string,
  user: string | undefined,
  address: string,
): string[] {
  return [
    sshBinary,
    "-O",
    "exit",
    "-o",
    `ControlPath=${controlPath}`,
    user ? `${user}@${address}` : address,
  ];
}
