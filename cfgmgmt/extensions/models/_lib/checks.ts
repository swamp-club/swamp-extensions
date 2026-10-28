// Copyright (C) 2026 Adam Jacob
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
// Helpers shared by the models' check/apply paths.

import {
  type BecomeOpts,
  type ExecResult,
  execSudo,
  shellEscape,
  type SshConn,
} from "./ssh.ts";

/**
 * Thrown after a method has already written its `failed` state, so the
 * method's outer catch rethrows it without overwriting that record with an
 * emptier one.
 */
export class RecordedFailure extends Error {
  override name = "RecordedFailure";
}

/**
 * Canonical four-digit octal mode, so "644", "0644" and stat's "644" compare
 * equal, and setuid modes like "4755" are not padded to "04755".
 */
export function normalizeMode(mode: string): string;
export function normalizeMode(mode: string | null): string | null;
export function normalizeMode(mode: string | null): string | null {
  if (mode === null || !/^[0-7]{1,5}$/.test(mode)) return mode;
  return parseInt(mode, 8).toString(8).padStart(4, "0");
}

/** execSudo that throws, naming `what` and the remote stderr, on a non-zero exit. */
export async function execChecked(
  conn: SshConn,
  command: string,
  opts: BecomeOpts | undefined,
  what: string,
): Promise<ExecResult> {
  const r = await execSudo(conn, command, opts);
  if (r.exitCode !== 0) {
    const detail = r.stderr.trim() || r.stdout.trim();
    throw new Error(
      `${what} failed with exit code ${r.exitCode}${
        detail ? `: ${detail}` : ""
      }`,
    );
  }
  return r;
}

/**
 * Clears the way for writing a regular file at `path`, which exists but is not
 * one. A symlink (a distro's `/etc/issue.net -> ../usr/lib/issue.net`, say) is
 * removed so the managed file replaces it, as a local override should;
 * anything else (a directory, a device) is refused, since writing would land
 * inside or through it and never converge.
 */
export async function replaceSymlinkOrRefuse(
  conn: SshConn,
  path: string,
  opts: BecomeOpts | undefined,
): Promise<void> {
  const link = await execSudo(conn, `test -L ${shellEscape(path)}`, opts);
  if (link.exitCode === 0) {
    await execChecked(conn, `rm -f ${shellEscape(path)}`, opts, "rm symlink");
    return;
  }
  if (link.exitCode !== 1) {
    throw new Error(
      `checking whether ${path} is a symlink failed with exit code ${link.exitCode}`,
    );
  }
  throw new Error(
    `${path} exists but is not a regular file or symlink; refusing to replace it`,
  );
}

/**
 * A remote command printing `stat -c <format>` for `path`, or `NOTFOUND`
 * when nothing is at the path. Only stat's own "no such file" (or a path
 * component that is not a directory) reads as NOTFOUND; any other failure,
 * such as permission denied on the path or a parent, exits non-zero. Run it
 * with execChecked so an unreadable path fails instead of looking absent.
 * With `follow`, a symlink is described by its target (`stat -L`).
 */
export function statProbe(
  path: string,
  format: string,
  opts: { follow?: boolean } = {},
): string {
  const p = shellEscape(path);
  const stat = opts.follow ? "stat -L" : "stat";
  return `out=$(LC_ALL=C ${stat} -c ${shellEscape(format)} ${p} 2>&1) && ` +
    `printf '%s\\n' "$out" || case "$out" in ` +
    `*"No such file or directory"*|*"Not a directory"*) echo NOTFOUND ;; ` +
    `*) printf '%s\\n' "$out" >&2; exit 1 ;; esac`;
}

/**
 * A remote `getent <db> <name>` printing `NOTFOUND` only for getent's "no
 * such key" (exit 2); any other failure keeps its non-zero exit, so run it
 * with execChecked.
 */
export function getentProbe(db: "passwd" | "group", name: string): string {
  return `getent ${db} ${
    shellEscape(name)
  }; rc=$?; if [ $rc -eq 2 ]; then echo NOTFOUND; else exit $rc; fi`;
}

/** Hash tools a remote file can be checked with. */
export type HashTool = "sha256sum" | "sha1sum" | "md5sum";

/**
 * The hex digest of a remote file. Any failure throws: a hash tool that
 * cannot read the file (or is missing) must never yield an empty digest,
 * which would skip the content comparison and pass a changed file as
 * compliant.
 */
export async function remoteHash(
  conn: SshConn,
  path: string,
  opts: BecomeOpts | undefined,
  tool: HashTool = "sha256sum",
): Promise<string> {
  const r = await execChecked(
    conn,
    `${tool} ${shellEscape(path)}`,
    opts,
    `${tool} ${path}`,
  );
  // GNU tools prefix the line with `\` when the file name holds a backslash
  // or newline; the digest follows it.
  const digest = (r.stdout.trim().split(/\s+/)[0] ?? "").replace(/^\\/, "");
  if (!/^[0-9a-f]{32,128}$/.test(digest)) {
    throw new Error(`${tool} ${path} returned no digest`);
  }
  return digest;
}
