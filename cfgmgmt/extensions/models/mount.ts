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
import { execChecked } from "./_lib/checks.ts";
import {
  execSudo,
  getConnection,
  shellEscape,
  writeFileAs,
} from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";

/**
 * One whitespace-free fstab field: a space, tab or newline would split the
 * written line into the wrong columns or inject another entry.
 */
const FSTAB_FIELD = /^\S+$/;
const FSTAB_FIELD_MSG = "must not contain whitespace";

const GlobalArgsSchema = z.object({
  path: z.string().regex(FSTAB_FIELD, FSTAB_FIELD_MSG).describe(
    "Mount point path",
  ),
  device: z.string().regex(FSTAB_FIELD, FSTAB_FIELD_MSG).describe(
    "Device or remote filesystem to mount",
  ),
  fstype: z.string().regex(FSTAB_FIELD, FSTAB_FIELD_MSG).describe(
    "Filesystem type (e.g. ext4, nfs, tmpfs)",
  ),
  options: z.string().regex(FSTAB_FIELD, FSTAB_FIELD_MSG).default("defaults")
    .describe(
      "Mount options (e.g. defaults,noatime)",
    ),
  ensure: z.enum(["mounted", "unmounted", "present", "absent"]).describe(
    "Desired mount state: mounted=fstab+mounted, unmounted=fstab+not mounted, present=fstab only, absent=remove fstab+unmount",
  ),
  dump: z.number().default(0).describe("fstab dump field"),
  pass: z.number().default(0).describe("fstab pass field"),
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

interface Current {
  mounted: boolean;
  mountDevice: string | null;
  mountFstype: string | null;
  mountOptions: string | null;
  fstabPresent: boolean;
  fstabDevice: string | null;
  fstabFstype: string | null;
  fstabOptions: string | null;
}

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  path: z.string().describe("Mount point path"),
  ensure: z.string().describe("Desired mount state"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    mounted: z.boolean().describe("Whether currently mounted"),
    mountDevice: z.string().nullable().describe("Device of active mount"),
    mountFstype: z.string().nullable().describe(
      "Filesystem type of active mount",
    ),
    mountOptions: z.string().nullable().describe("Options of active mount"),
    fstabPresent: z.boolean().describe("Whether entry exists in fstab"),
    fstabDevice: z.string().nullable().describe("Device in fstab"),
    fstabFstype: z.string().nullable().describe("Filesystem type in fstab"),
    fstabOptions: z.string().nullable().describe("Options in fstab"),
  }).describe("Current mount state"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

function connect(g: GlobalArgs) {
  return getConnection({
    host: g.nodeHost,
    port: g.nodePort,
    username: g.nodeUser,
    privateKeyPath: g.nodeIdentityFile,
  });
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const so = sudoOpts(g);

  const findmnt = await execSudo(
    client,
    `findmnt -n -o SOURCE,FSTYPE,OPTIONS --target ${
      shellEscape(g.path)
    } 2>/dev/null`,
    so,
  );
  let mounted = false;
  let mountDevice: string | null = null;
  let mountFstype: string | null = null;
  let mountOptions: string | null = null;

  if (findmnt.exitCode === 0 && findmnt.stdout.trim()) {
    const parts = findmnt.stdout.trim().split(/\s+/);
    if (parts.length >= 3) {
      const mountTarget = await execSudo(
        client,
        `findmnt -n -o TARGET --target ${shellEscape(g.path)} 2>/dev/null`,
        so,
      );
      if (mountTarget.stdout.trim() === g.path) {
        mounted = true;
        mountDevice = parts[0];
        mountFstype = parts[1];
        mountOptions = parts.slice(2).join(" ");
      }
    }
  }

  const fstabResult = await execSudo(
    client,
    `cat /etc/fstab 2>/dev/null`,
    so,
  );
  let fstabPresent = false;
  let fstabDevice: string | null = null;
  let fstabFstype: string | null = null;
  let fstabOptions: string | null = null;

  for (const line of fstabResult.stdout.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length >= 4 && parts[1] === g.path) {
      fstabPresent = true;
      fstabDevice = parts[0];
      fstabFstype = parts[2];
      fstabOptions = parts[3];
      break;
    }
  }

  return {
    mounted,
    mountDevice,
    mountFstype,
    mountOptions,
    fstabPresent,
    fstabDevice,
    fstabFstype,
    fstabOptions,
  };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  const needFstab = g.ensure !== "absent";
  const needMounted = g.ensure === "mounted";
  const needUnmounted = g.ensure === "unmounted" || g.ensure === "absent";

  if (needFstab) {
    if (!current.fstabPresent) {
      changes.push("add fstab entry");
    } else {
      if (current.fstabDevice !== g.device) {
        changes.push(`fstab device: ${current.fstabDevice} -> ${g.device}`);
      }
      if (current.fstabFstype !== g.fstype) {
        changes.push(`fstab fstype: ${current.fstabFstype} -> ${g.fstype}`);
      }
      if (current.fstabOptions !== g.options) {
        changes.push(`fstab options: ${current.fstabOptions} -> ${g.options}`);
      }
    }
  }

  if (g.ensure === "absent" && current.fstabPresent) {
    changes.push("remove fstab entry");
  }

  if (needMounted && !current.mounted) {
    changes.push("mount filesystem");
  }
  if (needUnmounted && current.mounted) {
    changes.push("unmount filesystem");
  }

  return changes;
}

function emptyCurrent(): Current {
  return {
    mounted: false,
    mountDevice: null,
    mountFstype: null,
    mountOptions: null,
    fstabPresent: false,
    fstabDevice: null,
    fstabFstype: null,
    fstabOptions: null,
  };
}

/**
 * Manages a filesystem mount point and its /etc/fstab entry over SSH.
 * `check` reports drift; `apply` edits fstab and mounts, remounts or unmounts.
 */
export const model = {
  type: "@swamp/cfgmgmt/mount",
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
      description: "Check if mount matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking mount {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const handle = await context.writeResource("state", g.nodeHost, {
            path: g.path,
            ensure: g.ensure,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Mount {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("Check mount {path} failed on {host}: {error}", {
            path: g.path,
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource("state", g.nodeHost, {
            path: g.path,
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
      description: "Manage filesystem mount and fstab entry",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying mount {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              path: g.path,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Mount {path} on {host} is {status}", {
              path: g.path,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);
          const needFstab = g.ensure !== "absent";

          if (
            changes.includes("unmount filesystem")
          ) {
            await execChecked(
              client,
              `umount ${shellEscape(g.path)}`,
              so,
              "umount",
            );
          }

          const fstabChanges = changes.some((c) => c.includes("fstab"));
          if (fstabChanges) {
            const fstabResult = await execChecked(
              client,
              `cat /etc/fstab`,
              so,
              "read /etc/fstab",
            );
            const lines = fstabResult.stdout.split("\n");
            const filtered = lines.filter((line) => {
              const trimmed = line.trim();
              if (!trimmed || trimmed.startsWith("#")) return true;
              const parts = trimmed.split(/\s+/);
              return !(parts.length >= 2 && parts[1] === g.path);
            });

            if (needFstab) {
              filtered.push(
                `${g.device}\t${g.path}\t${g.fstype}\t${g.options}\t${g.dump}\t${g.pass}`,
              );
            }

            let content = filtered.join("\n");
            if (!content.endsWith("\n")) content += "\n";
            await writeFileAs(client, "/etc/fstab", content, so);
          }

          // An already-mounted filesystem whose fstab entry changed must be
          // brought in line too: a new device or fstype needs a fresh mount,
          // new options only a remount.
          if (g.ensure === "mounted" && current.mounted) {
            const sourceChanged = changes.some((c) =>
              c.startsWith("fstab device:") || c.startsWith("fstab fstype:")
            );
            const optionsChanged = changes.some((c) =>
              c.startsWith("fstab options:")
            );
            if (sourceChanged) {
              await execChecked(
                client,
                `umount ${shellEscape(g.path)}`,
                so,
                "umount",
              );
              await execChecked(
                client,
                `mount ${shellEscape(g.path)}`,
                so,
                "mount",
              );
              changes.push("remount filesystem (device/fstype changed)");
            } else if (optionsChanged) {
              await execChecked(
                client,
                `mount -o ${shellEscape(`remount,${g.options}`)} ${
                  shellEscape(g.path)
                }`,
                so,
                "remount",
              );
              changes.push("remount filesystem (options changed)");
            }
          }

          if (changes.includes("mount filesystem")) {
            await execChecked(
              client,
              `mkdir -p ${shellEscape(g.path)}`,
              so,
              "mkdir",
            );
            await execChecked(
              client,
              `mount ${shellEscape(g.path)}`,
              so,
              "mount",
            );
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            path: g.path,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Mount {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("Apply mount {path} failed on {host}: {error}", {
            path: g.path,
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource("state", g.nodeHost, {
            path: g.path,
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
