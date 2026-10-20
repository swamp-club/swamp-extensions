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
 * Materialize `identityContent` keys for the duration of one method call.
 *
 * Agent path (identityContentMode auto/agent): start a private ssh-agent on
 * a socket in a fresh 0700 directory and load each key with
 * `ssh-add -t <lifetime> -` over stdin; its public half comes back from
 * `ssh-add -L`. The private key never touches disk. Each host then points at the
 * agent (`IdentityAgent`) and its own `.pub` (`-i`), with IdentitiesOnly so
 * ssh offers exactly that key. The agent is killed after the call; the `-t`
 * lifetime bounds exposure if the process dies before cleanup.
 *
 * File path (mode file, or auto when no agent can be started): write the key
 * to a 0600 temp file and pass `-i`, removed after the call.
 *
 * Every spawn goes through `executeCommand`, the runner's executor seam.
 * Temp directories avoid paths with whitespace: ssh splits
 * `UserKnownHostsFile` (and other `-o` path values) on spaces.
 *
 * @module
 */

import type { EffectiveHost } from "./hosts.ts";
import { executeCommand } from "./runner.ts";

export type IdentityContentMode = "auto" | "agent" | "file";

export interface IdentityOptions {
  mode: IdentityContentMode;
  sshAgentBinary: string;
  sshAddBinary: string;
  /** Seconds the agent keeps each key (ssh-add -t). */
  keyLifetimeSec: number;
  logger: { warn(message: string, ...args: unknown[]): void };
}

export interface PreparedIdentities {
  hosts: EffectiveHost[];
  cleanup(): Promise<void>;
}

// macOS sockaddr_un.sun_path is 104 bytes including the NUL.
const UNIX_SOCKET_MAX = 103;

/**
 * Canonical key text: LF line endings, no trailing whitespace, one final
 * newline. Used for both the key handed to ssh and agent de-duplication, so
 * the same key with CRLF or extra blank lines is loaded once.
 */
function withTrailingNewline(key: string): string {
  return key.replaceAll("\r\n", "\n").trimEnd() + "\n";
}

/** `<algorithm> <base64>` of an `ssh-add -L` line — the comment varies. */
function keyId(line: string): string {
  return line.split(/\s+/).slice(0, 2).join(" ");
}

function needsIdentity(host: EffectiveHost): boolean {
  return host.transport.kind === "ssh" &&
    host.transport.identityContent !== undefined;
}

/** Spawn a short helper and return stdout, throwing on any failure. */
async function helper(
  command: string,
  args: string[],
  env: Record<string, string>,
  stdin?: string,
): Promise<string> {
  const out = await executeCommand({
    command,
    args,
    env,
    stdin,
    capture: true,
    signal: AbortSignal.timeout(30_000),
  });
  if (out.code !== 0) {
    throw new Error(
      `${command} ${args[0] ?? ""} exited ${
        out.code ?? out.signal
      }: ${out.stderr.trim()}`,
    );
  }
  return out.stdout;
}

/**
 * A fresh temp directory whose path has no whitespace. ssh splits some
 * `-o` path values (UserKnownHostsFile) on spaces, so a TMPDIR containing
 * one would silently point ssh at the wrong file; fall back to /tmp.
 */
export async function makeSafeTempDir(prefix: string): Promise<string> {
  const dir = await Deno.makeTempDir({ prefix });
  if (!/\s/.test(dir)) return dir;
  await Deno.remove(dir);
  return await Deno.makeTempDir({ prefix, dir: "/tmp" });
}

async function prepareFiles(
  hosts: EffectiveHost[],
): Promise<PreparedIdentities> {
  const paths: string[] = [];
  const cleanup = async () => {
    for (const p of paths) {
      try {
        await Deno.remove(p);
      } catch {
        // Already removed or never written — ignore.
      }
    }
  };
  const patched: EffectiveHost[] = [];
  try {
    for (const host of hosts) {
      if (host.transport.kind !== "ssh" || !needsIdentity(host)) {
        patched.push(host);
        continue;
      }
      const tmpFile = await Deno.makeTempFile({ prefix: "swamp-ssh-key-" });
      paths.push(tmpFile);
      await Deno.writeTextFile(
        tmpFile,
        withTrailingNewline(host.transport.identityContent!),
        { mode: 0o600 },
      );
      patched.push({
        ...host,
        transport: {
          ...host.transport,
          identityFile: tmpFile,
          identityContent: undefined,
        },
      });
    }
  } catch (err) {
    await cleanup();
    throw err;
  }
  return { hosts: patched, cleanup };
}

async function prepareAgent(
  hosts: EffectiveHost[],
  opts: IdentityOptions,
): Promise<PreparedIdentities> {
  const dir = await makeSafeTempDir("swamp-ssh-agent-");
  await Deno.chmod(dir, 0o700);
  const socket = `${dir}/a.sock`;
  let agentPid: string | undefined;

  const cleanup = async () => {
    if (agentPid !== undefined) {
      try {
        await helper(opts.sshAgentBinary, ["-k"], {
          SSH_AGENT_PID: agentPid,
          SSH_AUTH_SOCK: socket,
        });
      } catch {
        // `ssh-agent -k` failed; make sure the process still goes away. The
        // key lifetime bounds anything left behind if this fails too.
        try {
          Deno.kill(Number(agentPid), "SIGTERM");
        } catch {
          // Already gone.
        }
      }
    }
    try {
      await Deno.remove(dir, { recursive: true });
    } catch {
      // Already removed — ignore.
    }
  };

  try {
    if (socket.length > UNIX_SOCKET_MAX) {
      throw new Error(`agent socket path too long (${socket.length} bytes)`);
    }
    const started = await helper(
      opts.sshAgentBinary,
      ["-s", "-a", socket],
      {},
    );
    agentPid = started.match(/SSH_AGENT_PID=(\d+)/)?.[1];
    if (agentPid === undefined) {
      throw new Error("ssh-agent did not report SSH_AGENT_PID");
    }

    // One .pub per distinct key. Keys are added one at a time to a fresh
    // agent, so the line `ssh-add -L` lists after an add that it did not
    // list before is exactly that key's public half — a host can never be
    // pointed at another host's key. (`ssh-keygen -y -f /dev/stdin` is not
    // an option: OpenSSH's private-key permission check rejects a pipe,
    // which macOS reports as mode 0660.)
    const pubByKey = new Map<string, string>();
    const listed = new Set<string>();
    const patched: EffectiveHost[] = [];
    for (const host of hosts) {
      if (host.transport.kind !== "ssh" || !needsIdentity(host)) {
        patched.push(host);
        continue;
      }
      if (host.transport.identityAgent !== undefined) {
        opts.logger.warn(
          "identityContent on {host}: using a per-call agent instead of identityAgent {agent}",
          { host: host.name, agent: host.transport.identityAgent },
        );
      }
      const key = withTrailingNewline(host.transport.identityContent!);
      let pubPath = pubByKey.get(key);
      if (pubPath === undefined) {
        await helper(
          opts.sshAddBinary,
          ["-t", String(opts.keyLifetimeSec), "-"],
          { SSH_AUTH_SOCK: socket },
          key,
        );
        const lines = (await helper(
          opts.sshAddBinary,
          ["-L"],
          { SSH_AUTH_SOCK: socket },
        )).split("\n").map((l) => l.trim()).filter((l) => l !== "");
        const added = lines.filter((l) => !listed.has(keyId(l)));
        if (added.length !== 1) {
          throw new Error(
            added.length === 0
              ? "a key was already loaded under another encoding (e.g. PEM vs OpenSSH format); use one encoding per key"
              : `could not identify the loaded key (ssh-add -L listed ${added.length} new keys)`,
          );
        }
        for (const l of lines) listed.add(keyId(l));
        pubPath = `${dir}/k${pubByKey.size}.pub`;
        await Deno.writeTextFile(pubPath, added[0] + "\n", { mode: 0o600 });
        pubByKey.set(key, pubPath);
      }
      patched.push({
        ...host,
        transport: {
          ...host.transport,
          identityFile: pubPath,
          identityAgent: socket,
          // Always yes: the per-call agent holds every identityContent key in
          // the call, so falling back to "any agent key" would offer other
          // hosts' keys. The user's own agent is not consulted here anyway.
          identitiesOnly: true,
          // Never forward this agent: it holds every identityContent key in
          // the call, so a forwarded copy would let one target sign as any
          // other. Put first so it wins over the user's extraOptions and
          // over `ForwardAgent yes` in the runner's ssh_config.
          extraOptions: ["ForwardAgent=no", ...host.transport.extraOptions],
          identityContent: undefined,
        },
      });
    }
    return { hosts: patched, cleanup };
  } catch (err) {
    await cleanup();
    throw err;
  }
}

/**
 * Patch every `identityContent` host so ssh can use its key, choosing the
 * agent or temp-file path per `opts.mode`. Hosts without identityContent
 * pass through untouched. Always call `cleanup()` in a finally.
 */
export async function prepareIdentities(
  hosts: EffectiveHost[],
  opts: IdentityOptions,
): Promise<PreparedIdentities> {
  if (!hosts.some(needsIdentity)) {
    return { hosts, cleanup: () => Promise.resolve() };
  }
  if (opts.mode === "file") return await prepareFiles(hosts);
  try {
    return await prepareAgent(hosts, opts);
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    if (opts.mode === "agent") {
      throw new Error(
        `identityContentMode 'agent': could not load the key into an ssh-agent: ${reason}`,
      );
    }
    opts.logger.warn(
      "identityContent: could not use a per-call ssh-agent ({reason}); using a temporary key file",
      { reason },
    );
    return await prepareFiles(hosts);
  }
}
