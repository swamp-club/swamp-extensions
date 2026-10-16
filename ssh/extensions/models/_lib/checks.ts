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
 * Pre-flight check implementations.
 *
 * **Important constraint:** swamp's pre-flight check context exposes only
 * `globalArgs` and `definition` — NOT the per-method arguments. (See
 * `method_execution_service.ts`: the check context is
 * `{ ...context, methodName, globalArgs, definition }`; `unresolvedMethodArgs`
 * is populated only on the *execute* context, never the check context.) So a
 * check can validate things derivable from the fleet definition, but anything
 * that depends on a method's arguments — the host selector, the forward spec —
 * must be validated elsewhere:
 *   - the forward spec is validated by `ForwardArgsSchema` at argument-parse
 *     time (regex + refine), before execute;
 *   - selector syntax and empty-selection are validated inside `execute`
 *     (see `resolveSelection` in `operations.ts`), which DOES receive args.
 *
 * That leaves two checks here, both computable from `globalArgs` alone:
 *   - `master-writable`  — the ControlMaster socket dir (from globalArgs.name),
 *     only when some ssh host has ControlMaster enabled.
 *   - `sshpass-available` — sshpass presence when *any* fleet host uses
 *     password auth (whole fleet, since the selection isn't visible here).
 *
 * @module
 */

import { GlobalArgsSchema } from "./schemas.ts";
import { effectiveHosts } from "./hosts.ts";
import { ensureControlDir } from "./control_master.ts";

/** Result shape matching swamp's CheckResult. */
export interface CheckResult {
  pass: boolean;
  errors?: string[];
}

/** Check context — the subset of MethodContext checks actually receive. */
export interface CheckContext {
  globalArgs: Record<string, unknown>;
}

/**
 * Ensure the control directory is writable + 0700 before opening masters.
 *
 * Passes outright when no effective host is an ssh host with ControlMaster
 * enabled (fleet-level disable, per-host overrides, all-tailscale fleets) —
 * nothing will create a socket. On Windows, OpenSSH does not support
 * ControlMaster, so an enabled host fails with that reason instead of a
 * permission check that cannot mean anything there. `platform` defaults to
 * `Deno.build.os`; tests inject it.
 */
export async function checkMasterWritable(
  ctx: CheckContext,
  platform: typeof Deno.build.os = Deno.build.os,
): Promise<CheckResult> {
  const g = GlobalArgsSchema.parse(ctx.globalArgs);
  const masterHosts = effectiveHosts(g).filter(
    (h) => h.transport.kind === "ssh" && h.transport.controlMaster.enabled,
  );
  if (masterHosts.length === 0) return { pass: true };

  if (platform === "windows") {
    return {
      pass: false,
      errors: [
        `ControlMaster is enabled for ${
          masterHosts.map((h) => h.name).join(", ")
        }, but OpenSSH for Windows does not support ControlMaster. ` +
        `Set transport.controlMaster.enabled: false.`,
      ],
    };
  }

  const result = await ensureControlDir(g.name, undefined, platform);
  if (result.writable) return { pass: true };
  return { pass: false, errors: [result.reason] };
}

/** Probe whether an executable is resolvable on PATH or as an absolute path. */
export type BinaryProbe = (binary: string) => Promise<boolean>;

/**
 * Resolve an executable against a PATH string, platform-aware. On Windows
 * PATH is `;`-separated and an extensionless binary is also tried with each
 * PATHEXT suffix (`sshpass` → `sshpass.EXE`, ...). A binary containing a
 * path separator is stat'ed directly.
 */
export async function resolveOnPath(
  binary: string,
  pathEnv: string,
  platform: typeof Deno.build.os = Deno.build.os,
  pathExt: string = ".EXE;.CMD;.BAT;.COM",
): Promise<boolean> {
  const windows = platform === "windows";
  const isFile = async (p: string): Promise<boolean> => {
    try {
      return (await Deno.stat(p)).isFile;
    } catch {
      return false;
    }
  };

  const hasSep = binary.includes("/") || (windows && binary.includes("\\"));
  if (hasSep) return await isFile(binary);

  const candidates = [binary];
  if (windows && !/\.[^\\/.]+$/.test(binary)) {
    for (const ext of pathExt.split(";")) {
      if (ext.length > 0) candidates.push(`${binary}${ext}`);
    }
  }
  const sep = windows ? "\\" : "/";
  for (const dir of pathEnv.split(windows ? ";" : ":")) {
    if (dir.length === 0) continue;
    for (const name of candidates) {
      if (await isFile(`${dir}${sep}${name}`)) return true;
    }
  }
  return false;
}

/** Default probe — walks PATH (or stats an absolute/relative path). */
export const defaultBinaryProbe: BinaryProbe = (binary) =>
  resolveOnPath(
    binary,
    Deno.env.get("PATH") ?? "",
    Deno.build.os,
    Deno.env.get("PATHEXT") || undefined,
  );

/**
 * Ensure sshpass is available when any fleet host uses password auth.
 *
 * The selected subset isn't visible to checks (no method args), so this is
 * scoped to the whole fleet: if any host in `hosts[]` uses `auth.kind:
 * password`, sshpass must be present. A method that only targets key-auth
 * hosts still passes; the cost is a slightly broader guard, which is the
 * right trade for catching a missing dependency before any network I/O.
 */
export async function checkSshpassAvailable(
  ctx: CheckContext,
  probe: BinaryProbe = defaultBinaryProbe,
): Promise<CheckResult> {
  const g = GlobalArgsSchema.parse(ctx.globalArgs);
  const needsSshpass = effectiveHosts(g).some(
    (h) => h.transport.kind === "ssh" && h.transport.auth.kind === "password",
  );
  if (!needsSshpass) return { pass: true };

  const available = await probe(g.sshpassBinary);
  if (available) return { pass: true };
  return {
    pass: false,
    errors: [
      `A host uses password auth but '${g.sshpassBinary}' was not found on PATH. ` +
      `Install sshpass or switch the host to auth.kind: key.`,
    ],
  };
}
