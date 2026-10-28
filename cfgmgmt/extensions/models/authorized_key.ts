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

import { z } from "zod";
import { errorMessage, type ModelContext } from "./_lib/context.ts";
import { getConnection, shellEscape, writeFileAs } from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";
import { execChecked, getentProbe, statProbe } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  user: z.string().describe("User whose authorized_keys file to manage"),
  key: z.string().describe("Full SSH public key line"),
  ensure: z.enum(["present", "absent"]).describe(
    "Whether the key should be present or absent",
  ),
  nodeHost: z.string().describe("Hostname or IP of the remote node"),
  nodeUser: z.string().default("root").describe("SSH username"),
  nodePort: z.number().default(22).describe("SSH port"),
  nodeIdentityFile: z.string().optional().describe("Path to SSH private key"),
  become: z.boolean().default(false).describe(
    "Enable sudo privilege escalation",
  ),
  becomeUser: z.string().default("root").describe("User to become via sudo"),
  becomePassword: z.string().optional().meta({ sensitive: true }).describe(
    "Password for sudo -S",
  ),
});

type GlobalArgs = z.infer<typeof GlobalArgsSchema>;
type Context = ModelContext<GlobalArgs>;

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

/**
 * Runs as the account's owner: the connection as-is when it already is that
 * user, otherwise `sudo -u <user>` (root connecting without `become` too).
 * The owner controls ~/.ssh, so a root write there could be redirected by a
 * symlink; and files root creates there would be root's, which sshd rejects.
 */
function ownerOpts(g: GlobalArgs) {
  if (!g.become && g.nodeUser === g.user) return sudoOpts(g);
  return {
    become: true,
    becomeUser: g.user,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  user: z.string().describe("Target user"),
  ensure: z.string().describe("Desired state (present or absent)"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    fileExists: z.boolean().describe(
      "Whether authorized_keys file exists",
    ),
    keyPresent: z.boolean().describe("Whether the key is in the file"),
    authorizedKeysPath: z.string().nullable().describe(
      "Path to the authorized_keys file",
    ),
  }).describe("Current authorized key state"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

type Current = z.infer<typeof StateSchema>["current"];

/** Structured log fields naming what this run manages, and where. */
function logFields(g: GlobalArgs) {
  return { user: g.user, host: g.nodeHost };
}

function connect(g: GlobalArgs) {
  return getConnection({
    host: g.nodeHost,
    port: g.nodePort,
    username: g.nodeUser,
    privateKeyPath: g.nodeIdentityFile,
  });
}

interface ParsedKey {
  type: string;
  body: string;
}

const KEY_TYPE = /^(?:ssh|ecdsa|sk)-[A-Za-z0-9@._-]+$/;
const KEY_BODY = /^[A-Za-z0-9+/]+={0,3}$/;

/**
 * The (key type, base64 body) pair of an authorized_keys line, skipping any
 * leading options and ignoring the trailing comment; null when the line holds
 * no key.
 */
function parseKey(line: string): ParsedKey | null {
  const tokens = line.trim().split(/\s+/);
  for (let i = 0; i + 1 < tokens.length; i++) {
    if (KEY_TYPE.test(tokens[i]) && KEY_BODY.test(tokens[i + 1])) {
      return { type: tokens[i], body: tokens[i + 1] };
    }
  }
  return null;
}

function desiredKey(g: GlobalArgs): ParsedKey {
  const parsed = parseKey(g.key);
  if (!parsed) {
    throw new Error(
      "key is not a valid SSH public key line (expected '<type> <base64> [comment]')",
    );
  }
  return parsed;
}

function lineHasKey(line: string, key: ParsedKey): boolean {
  if (line.trim().startsWith("#")) return false;
  const parsed = parseKey(line);
  return parsed !== null && parsed.type === key.type &&
    parsed.body === key.body;
}

/**
 * A shell guard that fails when ~/.ssh or authorized_keys has become a
 * symlink, run in the same command as each root operation on them so a link
 * swapped in after gather is still refused.
 */
function noLinks(sshDir: string, akPath: string): string {
  return `{ [ ! -L ${shellEscape(sshDir)} ] && [ ! -L ${
    shellEscape(akPath)
  } ] || { echo 'refusing to follow a symlink in ~/.ssh' >&2; false; }; }`;
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const key = desiredKey(g);
  const so = sudoOpts(g);
  // getent's own status matters: "no such user" (exit 2) is a clear error,
  // and any other failure must not pass for an empty home directory.
  const entry = (await execChecked(
    client,
    getentProbe("passwd", g.user),
    so,
    `getent passwd ${g.user}`,
  )).stdout.trim();
  const home = entry === "NOTFOUND" ? "" : entry.split(":")[5] ?? "";
  if (!home) {
    throw new Error(`User ${g.user} not found`);
  }

  // A read failure must not look like a missing file: apply would then write
  // a file holding only the managed key and drop every other key.
  const akPath = `${home}/.ssh/authorized_keys`;
  // The managed user owns ~/.ssh and everything in it, and the writes below
  // run as root: a symlink there (to /etc/sudoers, say) would turn them into
  // writes on whatever the user chose. Links are refused, never followed.
  const sshDir = `${home}/.ssh`;
  const dirKind = (await execChecked(
    client,
    statProbe(sshDir, "%F"),
    so,
    `stat ${sshDir}`,
  )).stdout.trim();
  if (dirKind !== "NOTFOUND" && dirKind !== "directory") {
    throw new Error(
      `${sshDir} is not a directory (${dirKind}); refusing to manage it`,
    );
  }
  const kind = (await execChecked(
    client,
    statProbe(akPath, "%F"),
    so,
    `stat ${akPath}`,
  )).stdout.trim();
  const fileExists = kind !== "NOTFOUND";
  if (
    fileExists && kind !== "regular file" && kind !== "regular empty file"
  ) {
    throw new Error(
      `${akPath} is not a regular file (${kind}); refusing to manage it`,
    );
  }
  const content = fileExists
    ? (await execChecked(
      client,
      `cat ${shellEscape(akPath)}`,
      // Read as the account's owner too: root never opens a path in a
      // directory the owner controls.
      ownerOpts(g),
      `read ${akPath}`,
    )).stdout
    : "";
  const keyPresent = content.split("\n").some((line) => lineHasKey(line, key));

  return { fileExists, keyPresent, authorizedKeysPath: akPath };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (g.ensure === "present" && !current.keyPresent) {
    changes.push("add key");
  }
  if (g.ensure === "absent" && current.keyPresent) {
    changes.push("remove key");
  }
  return changes;
}

function emptyCurrent(): Current {
  return { fileExists: false, keyPresent: false, authorizedKeysPath: null };
}

/**
 * Manages one SSH public key in a user's `~/.ssh/authorized_keys` over SSH,
 * matched by key type and body. `check` reports drift without changing
 * anything; `apply` adds or removes the key and restores file permissions.
 */
export const model = {
  type: "@swamp/cfgmgmt/authorized_key",
  version: "2026.10.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: z.object({
    nodeHost: z.string().optional().describe(
      "Hostname or IP of the remote node",
    ),
    nodeUser: z.string().optional().describe("SSH username"),
    nodePort: z.number().optional().describe("SSH port"),
    nodeIdentityFile: z.string().optional().describe("Path to SSH private key"),
    become: z.boolean().optional().describe("Enable sudo privilege escalation"),
    becomeUser: z.string().optional().describe("User to become via sudo"),
    becomePassword: z.string().optional().meta({ sensitive: true }).describe(
      "Password for sudo -S",
    ),
  }),
  resources: {
    state: {
      description: "Result of check or apply operation",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    check: {
      description:
        "Check if SSH authorized key matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Checking authorized key for {user} on {host}",
          logFields(g),
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const status = changes.length === 0 ? "compliant" : "non_compliant";
          const handle = await context.writeResource("state", g.nodeHost, {
            user: g.user,
            ensure: g.ensure,
            status,
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Authorized key for {user} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: status,
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Checking authorized key for {user} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            user: g.user,
            ensure: g.ensure,
            status: "failed",
            current: emptyCurrent(),
            changes: [],
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    apply: {
      description:
        "Add or remove an SSH public key from a user's authorized_keys",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Applying authorized key for {user} on {host}",
          logFields(g),
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              user: g.user,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info(
              "Authorized key for {user} on {host} is {status} ({changeCount} changes)",
              {
                ...logFields(g),
                status: "compliant",
                changeCount: changes.length,
              },
            );
            return { dataHandles: [handle] };
          }

          const akPath = current.authorizedKeysPath!;
          const sshDir = akPath.substring(0, akPath.lastIndexOf("/"));
          // The file work runs as the account's owner, never as root: the
          // owner controls ~/.ssh, so a root write there could be redirected
          // by a symlink to any file. As the owner, it reaches only what the
          // owner could reach anyway, and the files stay theirs.
          const asOwner = ownerOpts(g);

          if (g.ensure === "present") {
            await execChecked(
              client,
              `${noLinks(sshDir, akPath)} && mkdir -p ${
                shellEscape(sshDir)
              } && chmod 700 ${shellEscape(sshDir)}`,
              asOwner,
              `creating ${sshDir}`,
            );
            let content = "";
            if (current.fileExists) {
              const existing = await execChecked(
                client,
                `cat ${shellEscape(akPath)}`,
                asOwner,
                `reading ${akPath}`,
              );
              content = existing.stdout;
              if (content && !content.endsWith("\n")) content += "\n";
            }
            content += g.key.trim() + "\n";
            await writeFileAs(client, akPath, content, asOwner);
            await execChecked(
              client,
              `${noLinks(sshDir, akPath)} && chmod 600 ${shellEscape(akPath)}`,
              asOwner,
              `securing ${akPath}`,
            );
          } else {
            const key = desiredKey(g);
            const existing = await execChecked(
              client,
              `cat ${shellEscape(akPath)}`,
              asOwner,
              `reading ${akPath}`,
            );
            const filtered = existing.stdout.split("\n")
              .filter((line) => !lineHasKey(line, key))
              .join("\n");
            await writeFileAs(client, akPath, filtered, asOwner);
            await execChecked(
              client,
              `${noLinks(sshDir, akPath)} && chmod 600 ${shellEscape(akPath)}`,
              asOwner,
              `securing ${akPath}`,
            );
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            user: g.user,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Authorized key for {user} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: "applied",
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Applying authorized key for {user} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            user: g.user,
            ensure: g.ensure,
            status: "failed",
            current: emptyCurrent(),
            changes: [],
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
  },
  reports: [],
};
