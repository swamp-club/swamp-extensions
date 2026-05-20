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
 *   - `master-writable`  — the ControlMaster socket dir (from globalArgs.name).
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
 */
export async function checkMasterWritable(
  ctx: CheckContext,
): Promise<CheckResult> {
  const g = GlobalArgsSchema.parse(ctx.globalArgs);
  const result = await ensureControlDir(g.name);
  if (result.writable) return { pass: true };
  return { pass: false, errors: [result.reason] };
}

/** Probe whether an executable is resolvable on PATH or as an absolute path. */
export type BinaryProbe = (binary: string) => Promise<boolean>;

/** Default probe — walks PATH (or stats an absolute/relative path). */
export const defaultBinaryProbe: BinaryProbe = async (binary) => {
  if (binary.includes("/")) {
    try {
      const stat = await Deno.stat(binary);
      return stat.isFile;
    } catch {
      return false;
    }
  }
  const pathEnv = Deno.env.get("PATH") ?? "";
  for (const dir of pathEnv.split(":")) {
    if (dir.length === 0) continue;
    try {
      const stat = await Deno.stat(`${dir}/${binary}`);
      if (stat.isFile) return true;
    } catch {
      // keep searching
    }
  }
  return false;
};

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
