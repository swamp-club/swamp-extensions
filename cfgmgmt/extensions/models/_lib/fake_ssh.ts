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
// Test harness: stand-in `ssh` and `scp` binaries on PATH, so models run
// end to end against scripted remote output with no network.
//
// The fake `ssh` treats ControlMaster calls (`-M`, `-O`) as successes, logs
// every remote command, and answers it from the first rule whose `match` is a
// substring of the command; unmatched commands exit 0 with no output. The fake
// `scp` logs the remote destination and keeps a copy of the uploaded file.

import type { DataHandle, Logger, ModelContext } from "./context.ts";
import { SUDO_OK } from "./ssh.ts";

/** A scripted answer: the first rule whose `match` is a substring of a remote command supplies its stdout and exit code. */
export interface FakeRule {
  match: string;
  stdout?: string;
  exitCode?: number;
  /**
   * For a command run through sudo: sudo itself refuses (no marker, exit 1),
   * as with a wrong password or missing sudo rights.
   */
  sudoFails?: boolean;
}

/** What a test can inspect after the models ran against the fake. */
export interface FakeSsh {
  /** Remote commands the models ran, in order. */
  commands(): Promise<string[]>;
  /**
   * Content uploaded with scp, keyed by where it was installed (the upload
   * path itself when no install command moved it).
   */
  uploads(): Promise<Map<string, string>>;
}

const SSH_SCRIPT = `#!/bin/sh
dir="$(dirname "$0")"
# ssh's own options are every argument before the remote command (the last).
opts=""
for a in "$@"; do opts="$opts \${last-}"; last="$a"; done
case "$opts " in *" -M "*|*" -O "*) exit 0 ;; esac
printf '%s\\0' "$last" >> "$dir/commands.log"
# Like real sudo, the wrapped shell prints the marker before the command runs.
case "$last" in *${SUDO_OK}*) sudo=1 ;; *) sudo=0 ;; esac
tab="$(printf '\\t')"
while IFS="$tab" read -r pat code out flag; do
  [ -n "$pat" ] || continue
  case "$last" in *"$pat"*)
    if [ "$sudo" = 1 ] && [ "$flag" = sudofails ]; then
      echo "sudo: a password is required" >&2; exit 1
    fi
    [ "$sudo" = 1 ] && [ "$code" != 255 ] && printf '%s\\n' ${SUDO_OK}
    cat "$dir/$out"; exit "$code" ;;
  esac
done < "$dir/rules.tsv"
[ "$sudo" = 1 ] && printf '%s\\n' ${SUDO_OK}
exit 0
`;

const SCP_SCRIPT = `#!/bin/sh
dir="$(dirname "$0")"
for a in "$@"; do src="$dst"; dst="$a"; done
remote="\${dst#*:}"
n=$(ls "$dir/uploads" | wc -l | tr -d ' ')
cp "$src" "$dir/uploads/$n"
printf '%s\\0' "$remote" >> "$dir/uploads.log"
`;

function splitNul(text: string): string[] {
  return text.split("\0").filter((s) => s.length > 0);
}

// The install script names its destination as `dest='<path>'`, or
// `dest='\\''<path>'\\''` once sudo's `sh -c` has quoted the script again.
const INSTALL_DEST = /dest=(?:'\\'')?'?([^'\\\n]+)/;

/**
 * Where a staged upload ended up: the destination of the install command that
 * moved it, or the upload path itself when nothing moved it.
 */
function installedPath(staged: string, commands: string[]): string {
  const install = commands.find((c) =>
    c.includes(staged) && c.includes("set -e")
  );
  return install?.match(INSTALL_DEST)?.[1] ?? staged;
}

/**
 * Runs `fn` with the fake binaries first on PATH. PATH is restored, and the
 * fake's directory removed, whether `fn` passes or throws.
 */
export async function withFakeSsh(
  rules: FakeRule[],
  fn: (fake: FakeSsh) => Promise<void>,
): Promise<void> {
  const dir = await Deno.makeTempDir({ prefix: "cfgmgmt-fake-ssh-" });
  const originalPath = Deno.env.get("PATH");
  try {
    await Deno.writeTextFile(`${dir}/ssh`, SSH_SCRIPT, { mode: 0o755 });
    await Deno.writeTextFile(`${dir}/scp`, SCP_SCRIPT, { mode: 0o755 });
    await Deno.mkdir(`${dir}/uploads`);
    await Deno.writeTextFile(`${dir}/commands.log`, "");
    await Deno.writeTextFile(`${dir}/uploads.log`, "");
    const lines: string[] = [];
    for (const [i, rule] of rules.entries()) {
      if (rule.match.includes("\t")) throw new Error("rule match has a tab");
      await Deno.writeTextFile(`${dir}/out-${i}`, rule.stdout ?? "");
      lines.push(
        `${rule.match}\t${rule.exitCode ?? 0}\tout-${i}\t${
          rule.sudoFails ? "sudofails" : "-"
        }`,
      );
    }
    await Deno.writeTextFile(`${dir}/rules.tsv`, lines.join("\n") + "\n");
    Deno.env.set("PATH", `${dir}:${originalPath ?? ""}`);

    await fn({
      commands: async () =>
        splitNul(await Deno.readTextFile(`${dir}/commands.log`)),
      uploads: async () => {
        const remotes = splitNul(await Deno.readTextFile(`${dir}/uploads.log`));
        const commands = splitNul(
          await Deno.readTextFile(`${dir}/commands.log`),
        );
        const out = new Map<string, string>();
        for (const [i, remote] of remotes.entries()) {
          out.set(
            installedPath(remote, commands),
            await Deno.readTextFile(`${dir}/uploads/${i}`),
          );
        }
        return out;
      },
    });
  } finally {
    if (originalPath === undefined) Deno.env.delete("PATH");
    else Deno.env.set("PATH", originalPath);
    await Deno.remove(dir, { recursive: true });
  }
}

/** One log call recorded by the fake context. */
export interface LogLine {
  level: "debug" | "info" | "warn" | "error";
  message: string;
  props?: Record<string, unknown>;
}

/** One resource write recorded by the fake context. */
export interface Write {
  specName: string;
  name: string;
  data: Record<string, unknown>;
}

/** A model context that records every resource write and log line. */
export function fakeContext<G>(
  globalArgs: G,
  repoDir = "/nonexistent",
): ModelContext<G> & { writes: Write[]; logs: LogLine[] } {
  const writes: Write[] = [];
  const logs: LogLine[] = [];
  const at =
    (level: LogLine["level"]) =>
    (message: string, props?: Record<string, unknown>) => {
      logs.push({ level, message, props });
    };
  const logger: Logger = {
    debug: at("debug"),
    info: at("info"),
    warn: at("warn"),
    error: at("error"),
  };
  return {
    globalArgs,
    repoDir,
    logger,
    writes,
    logs,
    writeResource: (specName, name, data): Promise<DataHandle> => {
      writes.push({ specName, name, data });
      return Promise.resolve({ name });
    },
  };
}
