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
 * Running an sh script over SSH when swamp itself runs on Windows.
 *
 * Windows OpenSSH (9.5p2, checked on Windows 11) has two faults this works
 * around:
 *
 * - Spawned with pipes, ssh.exe never exits: it hangs closing its stdout
 *   pipe. Run through cmd.exe with its stdio redirected to files, it exits.
 * - It stops delivering a session's output partway once there is more than
 *   about 160 KB of it. A probe sends several hundred KB (bundles and
 *   keystores), so its output is written to a file on the target and read
 *   back in pieces well under that.
 *
 * So the script is uploaded with `cat` into a private directory (mktemp -d,
 * mode 0700) on the target, run there with its output to files in the same
 * directory, read back 64 KB per session, and the directory is removed. No
 * other user can see or replace the files between sessions. These are the
 * only files a scan writes to a target. The steps take an injectable
 * runner, so the sequence is tested without Windows.
 *
 * @module
 */

/** One ssh session's result; stdout stays bytes so chunks join cleanly. */
export type SshSessionResult = {
  stdout: Uint8Array;
  stderr: string;
  exitCode: number;
};

/** The script's result. */
export type SshResult = { stdout: string; stderr: string; exitCode: number };

/**
 * Run one ssh session: `remote` is the remote command, `input` what ssh
 * sends on stdin (none means NUL). Remote commands never contain a double
 * quote or a %, which cmd.exe would read.
 */
export type SshSession = (
  remote: string,
  input?: string,
) => Promise<SshSessionResult>;

/** Output read back per session, well under the size that stalls. */
export const CHUNK_BYTES = 64 * 1024;

/**
 * Check a value that cmd.exe will see inside double quotes: a double quote
 * would end the quoting and a % would expand a variable.
 */
export function assertCmdSafe(label: string, value: string): void {
  // A trailing backslash would escape the closing quote for ssh.exe's
  // argument parser.
  if (/["%\r\n\0]/.test(value) || value.endsWith("\\")) {
    throw new Error(
      `Refusing ${label} ${
        JSON.stringify(value)
      }: it can't be passed through cmd.exe to Windows OpenSSH`,
    );
  }
}

/**
 * The cmd.exe command line that runs ssh with its stdio in files. Every
 * argument is double-quoted, so cmd.exe reads none of its characters as
 * redirection or a pipe.
 */
export function cmdLine(
  sshArgs: string[],
  remote: string,
  files: { input?: string; stdout: string; stderr: string },
): string {
  const quote = (v: string) => {
    assertCmdSafe("ssh argument", v);
    return `"${v}"`;
  };
  return `"ssh ${[...sshArgs, remote].map(quote).join(" ")} <${
    files.input ? quote(files.input) : "NUL"
  } >${quote(files.stdout)} 2>${quote(files.stderr)}"`;
}

/** A remote temporary directory mktemp -d printed: absolute and plain. */
function remotePath(bytes: Uint8Array): string {
  const p = new TextDecoder().decode(bytes).trim().split("\n").pop()?.trim() ??
    "";
  if (!/^\/[A-Za-z0-9._/-]+$/.test(p)) {
    throw new Error(
      `could not create a temporary directory on the target (mktemp printed ${
        JSON.stringify(p)
      })`,
    );
  }
  return p;
}

/**
 * Run an sh script on the target through `session`: upload, run with output
 * to files, read back in chunks, then remove the files whatever happened.
 */
export async function runOverWindowsSsh(
  session: SshSession,
  script: string,
): Promise<SshResult> {
  const up = await session(
    // A failed upload removes its own directory: its name never reaches us.
    // cmd.exe would read double quotes, so no expansion here is quoted:
    // set -f and an empty IFS stop TMPDIR and $d from being split or globbed.
    // A directory whose name remotePath would refuse is removed here, since
    // nothing after this command would know to remove it.
    "umask 077; set -f; IFS=; d=$(mktemp -d ${TMPDIR:-/tmp}/emudhra.XXXXXX) && case $d in ''|[!/]*|*[!A-Za-z0-9._/-]*) echo mktemp made a directory with an unusable name: $d >&2; rm -rf $d; exit 1;; esac && { cat > $d/probe.sh || { rm -rf $d; exit 1; }; } && echo $d",
    script,
  );
  if (up.exitCode !== 0) {
    return {
      stdout: "",
      stderr: up.stderr || `upload exit ${up.exitCode}`,
      exitCode: up.exitCode,
    };
  }
  const d = remotePath(up.stdout);
  try {
    const ran = await session(
      `cd '${d}' && umask 077 && { sh probe.sh < /dev/null > out 2> err; echo rc=$?; wc -c < out; wc -c < err; }`,
    );
    const m = new TextDecoder().decode(ran.stdout).match(
      /rc=(\d+)\s+(\d+)\s+(\d+)/,
    );
    if (!m) {
      return {
        stdout: "",
        stderr: ran.stderr || `running the script on the target failed`,
        exitCode: ran.exitCode || 1,
      };
    }
    const read = async (file: string, size: number) => {
      const parts: Uint8Array[] = [];
      for (let off = 0; off < size; off += CHUNK_BYTES) {
        const r = await session(
          `tail -c +${off + 1} '${file}' | head -c ${CHUNK_BYTES}`,
        );
        if (r.exitCode !== 0) {
          throw new Error(
            `reading the output back failed at byte ${off}: ${
              r.stderr || `exit ${r.exitCode}`
            }`,
          );
        }
        parts.push(r.stdout);
      }
      const all = new Uint8Array(parts.reduce((n, p) => n + p.length, 0));
      let o = 0;
      for (const p of parts) {
        all.set(p, o);
        o += p.length;
      }
      if (all.length !== size) {
        throw new Error(
          `read ${all.length} of ${size} bytes of output back from the target`,
        );
      }
      return new TextDecoder().decode(all);
    };
    return {
      stdout: await read(`${d}/out`, parseInt(m[2], 10)),
      // stderr is only for error messages; its first chunk is enough.
      stderr: (await read(
        `${d}/err`,
        Math.min(parseInt(m[3], 10), CHUNK_BYTES),
      )).trim().slice(0, 4000),
      exitCode: parseInt(m[1], 10),
    };
  } finally {
    await session(`rm -rf '${d}'`).catch(() => {});
  }
}
