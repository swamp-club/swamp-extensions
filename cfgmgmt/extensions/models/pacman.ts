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
import { execSudo, getConnection, shellEscape } from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";
import { errorMessage, type ModelContext } from "./_lib/context.ts";
import { RecordedFailure } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  packages: z.array(
    z.string().regex(
      /^[^\s-]\S*$/,
      "a package name may not start with '-' or contain whitespace",
    ),
  ).default([]).describe("Package names to manage"),
  ensure: z.enum(["present", "absent"]).default("present").describe(
    "Whether packages should be present or absent",
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
type PackageStatus = NonNullable<
  z.infer<typeof StateSchema>["packages"]
>[number];

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  packages: z.array(z.object({
    name: z.string().describe("Package name"),
    installed: z.boolean().describe("Whether the package is installed"),
    version: z.string().nullable().describe("Installed version"),
  })).nullable().describe("Per-package status"),
  changes: z.array(z.string()).describe("List of changes (e.g. install nginx)"),
  stdout: z.string().describe("Command output"),
  stderr: z.string().describe("Command error output"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

const InstalledSchema = z.object({
  packages: z.array(z.object({
    name: z.string().describe("Package name"),
    version: z.string().describe("Installed version"),
  })).describe("All installed packages"),
  count: z.number().describe("Total number of installed packages"),
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

async function queryPackages(
  client: SshConn,
  packages: string[],
  g: GlobalArgs,
): Promise<PackageStatus[]> {
  const so = sudoOpts(g);
  const results: PackageStatus[] = [];
  for (const pkg of packages) {
    const r = await execSudo(
      client,
      `pacman -Q ${shellEscape(pkg)} 2>/dev/null`,
      so,
    );
    if (r.exitCode === 0) {
      const parts = r.stdout.trim().split(/\s+/);
      results.push({ name: pkg, installed: true, version: parts[1] || null });
    } else {
      results.push({ name: pkg, installed: false, version: null });
    }
  }
  return results;
}

function detectChanges(
  packages: PackageStatus[],
  ensure: GlobalArgs["ensure"],
) {
  const changes: string[] = [];
  for (const pkg of packages) {
    if (ensure === "present" && !pkg.installed) {
      changes.push(`install ${pkg.name}`);
    } else if (ensure === "absent" && pkg.installed) {
      changes.push(`remove ${pkg.name}`);
    }
  }
  return changes;
}

/**
 * Manages Arch Linux packages with pacman over SSH: `check` reports drift,
 * `apply` installs or removes packages, `refresh` syncs the package database,
 * `upgrade` runs a full system upgrade and `list` records every installed
 * package.
 */
export const model = {
  type: "@swamp/cfgmgmt/pacman",
  version: "2026.10.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: z.object({
    packages: z.array(z.string()).optional().describe(
      "Package names to manage",
    ),
    ensure: z.enum(["present", "absent"]).optional().describe(
      "Whether packages should be present or absent",
    ),
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
      description: "Package operation state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
    installed: {
      description: "All installed packages",
      schema: InstalledSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    check: {
      description: "Check if packages match desired state without modifying",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking {packages} on {host} (ensure {ensure})", {
          packages: g.packages,
          ensure: g.ensure,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const packages = await queryPackages(client, g.packages, g);
          const changes = detectChanges(packages, g.ensure);
          const handle = await context.writeResource("state", g.nodeHost, {
            status: changes.length === 0 ? "compliant" : "non_compliant",
            packages,
            changes,
            stdout: "",
            stderr: "",
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Packages on {host} are {status}: {changes}", {
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            changes,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("pacman check failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          await context.writeResource("state", g.nodeHost, {
            status: "failed",
            packages: null,
            changes: [],
            stdout: "",
            stderr: "",
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    apply: {
      description: "Install or remove packages based on ensure state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying {packages} on {host} (ensure {ensure})", {
          packages: g.packages,
          ensure: g.ensure,
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const packages = await queryPackages(client, g.packages, g);
          const changes = detectChanges(packages, g.ensure);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              status: "compliant",
              packages,
              changes: [],
              stdout: "",
              stderr: "",
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Packages on {host} are already compliant", {
              host: g.nodeHost,
            });
            return { dataHandles: [handle] };
          }

          const toInstall = packages.filter((p) =>
            g.ensure === "present" && !p.installed
          ).map((p) => p.name);
          const toRemove = packages.filter((p) =>
            g.ensure === "absent" && p.installed
          ).map((p) => p.name);

          let stdout = "";
          let stderr = "";

          const so = sudoOpts(g);
          if (toInstall.length > 0) {
            const r = await execSudo(
              client,
              `pacman -S --noconfirm ${toInstall.map(shellEscape).join(" ")}`,
              so,
            );
            stdout += r.stdout;
            stderr += r.stderr;
            if (r.exitCode !== 0) {
              const errorMsg = `pacman -S failed with exit code ${r.exitCode}`;
              await context.writeResource("state", g.nodeHost, {
                status: "failed",
                packages: await queryPackages(client, g.packages, g),
                changes,
                stdout,
                stderr,
                error: errorMsg,
                timestamp: new Date().toISOString(),
              });
              throw new RecordedFailure(errorMsg);
            }
          }

          if (toRemove.length > 0) {
            const r = await execSudo(
              client,
              `pacman -R --noconfirm ${toRemove.map(shellEscape).join(" ")}`,
              so,
            );
            stdout += r.stdout;
            stderr += r.stderr;
            if (r.exitCode !== 0) {
              const errorMsg = `pacman -R failed with exit code ${r.exitCode}`;
              await context.writeResource("state", g.nodeHost, {
                status: "failed",
                packages: await queryPackages(client, g.packages, g),
                changes,
                stdout,
                stderr,
                error: errorMsg,
                timestamp: new Date().toISOString(),
              });
              throw new RecordedFailure(errorMsg);
            }
          }

          const updated = await queryPackages(client, g.packages, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            status: "applied",
            packages: updated,
            changes,
            stdout,
            stderr,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Applied {changes} on {host}", {
            host: g.nodeHost,
            changes,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("pacman apply failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          if (err instanceof RecordedFailure) throw err;
          await context.writeResource("state", g.nodeHost, {
            status: "failed",
            packages: null,
            changes: [],
            stdout: "",
            stderr: "",
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    refresh: {
      description: "Update the pacman package database",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Refreshing the pacman package database on {host}",
          { host: g.nodeHost },
        );
        try {
          const client = await connect(g);
          const r = await execSudo(client, "pacman -Sy", sudoOpts(g));
          const failed = r.exitCode !== 0;
          const handle = await context.writeResource("state", g.nodeHost, {
            status: failed ? "failed" : "applied",
            packages: null,
            changes: failed ? [] : ["database updated"],
            stdout: r.stdout,
            stderr: r.stderr,
            error: failed
              ? `pacman -Sy failed with exit code ${r.exitCode}`
              : null,
            timestamp: new Date().toISOString(),
          });
          if (failed) {
            throw new RecordedFailure(
              `pacman -Sy failed with exit code ${r.exitCode}`,
            );
          }
          context.logger.info(
            "Refreshed the pacman package database on {host}",
            { host: g.nodeHost },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("pacman refresh failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          if (err instanceof RecordedFailure) throw err;
          await context.writeResource("state", g.nodeHost, {
            status: "failed",
            packages: null,
            changes: [],
            stdout: "",
            stderr: "",
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    upgrade: {
      description: "Upgrade all installed packages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Upgrading all pacman packages on {host}", {
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const r = await execSudo(
            client,
            "pacman -Syu --noconfirm",
            sudoOpts(g),
          );
          const failed = r.exitCode !== 0;
          const handle = await context.writeResource("state", g.nodeHost, {
            status: failed ? "failed" : "applied",
            packages: null,
            changes: failed ? [] : ["system upgraded"],
            stdout: r.stdout,
            stderr: r.stderr,
            error: failed
              ? `pacman -Syu failed with exit code ${r.exitCode}`
              : null,
            timestamp: new Date().toISOString(),
          });
          if (failed) {
            throw new RecordedFailure(
              `pacman -Syu failed with exit code ${r.exitCode}`,
            );
          }
          context.logger.info("Upgraded all pacman packages on {host}", {
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("pacman upgrade failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          if (err instanceof RecordedFailure) throw err;
          await context.writeResource("state", g.nodeHost, {
            status: "failed",
            packages: null,
            changes: [],
            stdout: "",
            stderr: "",
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    list: {
      description: "List all installed packages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Listing installed pacman packages on {host}", {
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const r = await execSudo(client, "pacman -Q", sudoOpts(g));
          if (r.exitCode !== 0) {
            const errorMsg = `pacman -Q failed with exit code ${r.exitCode}`;
            await context.writeResource("state", g.nodeHost, {
              status: "failed",
              packages: null,
              changes: [],
              stdout: r.stdout,
              stderr: r.stderr,
              error: errorMsg,
              timestamp: new Date().toISOString(),
            });
            throw new RecordedFailure(errorMsg);
          }

          const packages = r.stdout.trim().split("\n")
            .filter((line) => line.length > 0)
            .map((line) => {
              const parts = line.split(/\s+/);
              return { name: parts[0], version: parts[1] || "unknown" };
            });

          const handle = await context.writeResource("installed", g.nodeHost, {
            packages,
            count: packages.length,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Found {count} installed pacman packages on {host}",
            { host: g.nodeHost, count: packages.length },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("pacman list failed on {host}: {error}", {
            host: g.nodeHost,
            error: errorMessage(err),
          });
          if (err instanceof RecordedFailure) throw err;
          await context.writeResource("state", g.nodeHost, {
            status: "failed",
            packages: null,
            changes: [],
            stdout: "",
            stderr: "",
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
