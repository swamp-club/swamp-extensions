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
import {
  execSudo,
  getConnection,
  shellEscape,
  writeFileAs,
} from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";
import { execChecked } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  name: z.string().regex(
    /^[A-Za-z0-9_-]+$/,
    "must be a module name (letters, digits, '_' and '-')",
  ).describe("Kernel module name (e.g. br_netfilter, overlay)"),
  ensure: z.enum(["present", "absent"]).default("present").describe(
    "Whether the module should be loaded or unloaded",
  ),
  params: z.string().optional().describe(
    "Module parameters (e.g. 'option1=value1 option2=value2')",
  ),
  persist: z.boolean().default(true).describe(
    "Persist the module across reboots via /etc/modules-load.d/",
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

const StateSchema = z.object({
  name: z.string().describe("Module name"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    loaded: z.boolean().describe("Whether the module is currently loaded"),
    persisted: z.boolean().describe(
      "Whether a persistence file exists in /etc/modules-load.d/",
    ),
  }).describe("Current kernel module state"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

type Current = z.infer<typeof StateSchema>["current"];

function connect(g: GlobalArgs) {
  return getConnection({
    host: g.nodeHost,
    port: g.nodePort,
    username: g.nodeUser,
    privateKeyPath: g.nodeIdentityFile,
  });
}

function emptyCurrent() {
  return { loaded: false, persisted: false };
}

function persistPath(name: string) {
  return `/etc/modules-load.d/cfgmgmt-${name}.conf`;
}

/** lsmod reports module names with underscores, while modprobe accepts either. */
function moduleKey(name: string): string {
  return name.replace(/-/g, "_");
}

/**
 * Whether `name` is a loaded module in lsmod output. Only the first column is
 * a module name; the "Used by" column lists dependents and must not match.
 */
function lsmodHasModule(lsmodOutput: string, name: string): boolean {
  const want = moduleKey(name);
  return lsmodOutput.split("\n").slice(1).some((line) => {
    const first = line.trim().split(/\s+/)[0];
    return first !== "" && moduleKey(first) === want;
  });
}

async function gather(client: SshConn, g: GlobalArgs) {
  const so = sudoOpts(g);

  const lsmodResult = await execChecked(client, "lsmod", so, "lsmod");
  const loaded = lsmodHasModule(lsmodResult.stdout, g.name);

  const path = persistPath(g.name);
  const fileResult = await execSudo(
    client,
    `test -f ${shellEscape(path)} && echo Y || echo N`,
    so,
  );
  const persisted = fileResult.stdout.trim() === "Y";

  return { loaded, persisted };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes = [];

  if (g.ensure === "present") {
    if (!current.loaded) changes.push("load module");
    if (g.persist && !current.persisted) {
      changes.push("create persistence file");
    }
  } else {
    if (current.loaded) changes.push("unload module");
    if (current.persisted) changes.push("remove persistence file");
  }

  return changes;
}

/**
 * Manages a Linux kernel module over SSH: whether it is loaded and whether
 * it is persisted in /etc/modules-load.d. `check` reports drift; `apply`
 * loads or unloads it.
 */
export const model = {
  type: "@swamp/cfgmgmt/kernel_module",
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
        "Check if the kernel module is loaded/persisted as desired (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking kernel module {name} on {host}", {
          name: g.name,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const handle = await context.writeResource("state", g.nodeHost, {
            name: g.name,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Kernel module {name} on {host} is {status}", {
            name: g.name,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check kernel module {name} failed on {host}: {error}",
            { name: g.name, host: g.nodeHost, error: errorMessage(err) },
          );
          await context.writeResource("state", g.nodeHost, {
            name: g.name,
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
      description: "Load or unload a kernel module and manage persistence",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying kernel module {name} on {host}", {
          name: g.name,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              name: g.name,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Kernel module {name} on {host} is {status}", {
              name: g.name,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);

          if (g.ensure === "present") {
            if (changes.includes("load module")) {
              // Each parameter is quoted on its own so a value cannot run
              // as shell under sudo.
              const params = (g.params ?? "").split(/\s+/).filter((p) => p)
                .map(shellEscape).join(" ");
              const r = await execSudo(
                client,
                `modprobe ${shellEscape(g.name)} ${params}`.trimEnd(),
                so,
              );
              if (r.exitCode !== 0) {
                throw new Error(`modprobe failed: ${r.stderr}`);
              }
            }
            if (changes.includes("create persistence file")) {
              const path = persistPath(g.name);
              await writeFileAs(client, path, `${g.name}\n`, so);
            }
          } else {
            if (changes.includes("unload module")) {
              const r = await execSudo(
                client,
                `rmmod ${shellEscape(g.name)}`,
                so,
              );
              if (r.exitCode !== 0) {
                throw new Error(`rmmod failed: ${r.stderr}`);
              }
            }
            if (changes.includes("remove persistence file")) {
              const path = persistPath(g.name);
              await execChecked(
                client,
                `rm -f ${shellEscape(path)}`,
                so,
                `remove ${path}`,
              );
            }
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            name: g.name,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Kernel module {name} on {host} is {status}", {
            name: g.name,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply kernel module {name} failed on {host}: {error}",
            { name: g.name, host: g.nodeHost, error: errorMessage(err) },
          );
          await context.writeResource("state", g.nodeHost, {
            name: g.name,
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
