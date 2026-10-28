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
import { exec, getConnection, shellEscape } from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";
import { errorMessage, type ModelContext } from "./_lib/context.ts";
import { RecordedFailure } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  packages: z.array(
    z.string().regex(
      /^[^\s-]\S*$/,
      "a package name may not start with '-' or contain whitespace",
    ),
  ).default([]).describe("Formula names to manage"),
  ensure: z.enum(["present", "absent"]).default("present").describe(
    "Whether packages should be present or absent",
  ),
  nodeHost: z.string().describe("Hostname or IP of the remote node"),
  nodeUser: z.string().default("root").describe("SSH username"),
  nodePort: z.number().default(22).describe("SSH port"),
  nodeIdentityFile: z.string().optional().describe("Path to SSH private key"),
  become: z.boolean().default(false).describe(
    "Accepted but ignored (brew forbids root)",
  ),
  becomeUser: z.string().default("root").describe("Accepted but ignored"),
  becomePassword: z.string().optional().meta({ sensitive: true }).describe(
    "Accepted but ignored",
  ),
});

type GlobalArgs = z.infer<typeof GlobalArgsSchema>;
type Context = ModelContext<GlobalArgs>;
type PackageStatus = NonNullable<
  z.infer<typeof StateSchema>["packages"]
>[number];

const StateSchema = z.object({
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  packages: z.array(z.object({
    name: z.string().describe("Package name"),
    installed: z.boolean().describe("Whether the package is installed"),
    version: z.string().nullable().describe("Installed version"),
  })).nullable().describe("Per-package status"),
  changes: z.array(z.string()).describe("List of changes (e.g. install jq)"),
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
): Promise<PackageStatus[]> {
  const results: PackageStatus[] = [];
  for (const pkg of packages) {
    const r = await exec(
      client,
      `brew list --formula ${shellEscape(pkg)} 2>/dev/null`,
    );
    if (r.exitCode === 0) {
      const v = await exec(
        client,
        `brew list --formula --versions ${shellEscape(pkg)} 2>/dev/null`,
      );
      const version = v.exitCode === 0
        ? v.stdout.trim().split(/\s+/).slice(1).join(" ") || null
        : null;
      results.push({ name: pkg, installed: true, version });
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
 * Manages Homebrew formulae over SSH (always as the SSH user; brew refuses
 * root): `check` reports drift, `apply` installs or uninstalls formulae,
 * `refresh` runs brew update, `upgrade` upgrades everything and `list`
 * records every installed formula.
 */
export const model = {
  type: "@swamp/cfgmgmt/homebrew",
  version: "2026.10.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: z.object({
    packages: z.array(z.string()).optional().describe(
      "Formula names to manage",
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
    become: z.boolean().optional().describe(
      "Accepted but ignored (brew forbids root)",
    ),
    becomeUser: z.string().optional().describe("Accepted but ignored"),
    becomePassword: z.string().optional().meta({ sensitive: true }).describe(
      "Accepted but ignored",
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
          const packages = await queryPackages(client, g.packages);
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
          context.logger.error("homebrew check failed on {host}: {error}", {
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
          const packages = await queryPackages(client, g.packages);
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

          if (toInstall.length > 0) {
            const r = await exec(
              client,
              `brew install ${toInstall.map(shellEscape).join(" ")}`,
            );
            stdout += r.stdout;
            stderr += r.stderr;
            if (r.exitCode !== 0) {
              const errorMsg =
                `brew install failed with exit code ${r.exitCode}`;
              await context.writeResource("state", g.nodeHost, {
                status: "failed",
                packages: await queryPackages(client, g.packages),
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
            const r = await exec(
              client,
              `brew uninstall ${toRemove.map(shellEscape).join(" ")}`,
            );
            stdout += r.stdout;
            stderr += r.stderr;
            if (r.exitCode !== 0) {
              const errorMsg =
                `brew uninstall failed with exit code ${r.exitCode}`;
              await context.writeResource("state", g.nodeHost, {
                status: "failed",
                packages: await queryPackages(client, g.packages),
                changes,
                stdout,
                stderr,
                error: errorMsg,
                timestamp: new Date().toISOString(),
              });
              throw new RecordedFailure(errorMsg);
            }
          }

          const updated = await queryPackages(client, g.packages);
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
          context.logger.error("homebrew apply failed on {host}: {error}", {
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
      description: "Update the homebrew package database",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Refreshing the homebrew package database on {host}",
          { host: g.nodeHost },
        );
        try {
          const client = await connect(g);
          const r = await exec(client, "brew update");
          const failed = r.exitCode !== 0;
          const handle = await context.writeResource("state", g.nodeHost, {
            status: failed ? "failed" : "applied",
            packages: null,
            changes: failed ? [] : ["database updated"],
            stdout: r.stdout,
            stderr: r.stderr,
            error: failed
              ? `brew update failed with exit code ${r.exitCode}`
              : null,
            timestamp: new Date().toISOString(),
          });
          if (failed) {
            throw new RecordedFailure(
              `brew update failed with exit code ${r.exitCode}`,
            );
          }
          context.logger.info(
            "Refreshed the homebrew package database on {host}",
            { host: g.nodeHost },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("homebrew refresh failed on {host}: {error}", {
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
        context.logger.info("Upgrading all homebrew packages on {host}", {
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const r = await exec(client, "brew upgrade");
          const failed = r.exitCode !== 0;
          const handle = await context.writeResource("state", g.nodeHost, {
            status: failed ? "failed" : "applied",
            packages: null,
            changes: failed ? [] : ["system upgraded"],
            stdout: r.stdout,
            stderr: r.stderr,
            error: failed
              ? `brew upgrade failed with exit code ${r.exitCode}`
              : null,
            timestamp: new Date().toISOString(),
          });
          if (failed) {
            throw new RecordedFailure(
              `brew upgrade failed with exit code ${r.exitCode}`,
            );
          }
          context.logger.info("Upgraded all homebrew packages on {host}", {
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("homebrew upgrade failed on {host}: {error}", {
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
        context.logger.info("Listing installed homebrew packages on {host}", {
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const r = await exec(client, "brew list --formula --versions");
          if (r.exitCode !== 0) {
            const errorMsg = `brew list failed with exit code ${r.exitCode}`;
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
              return {
                name: parts[0],
                version: parts.slice(1).join(" ") || "unknown",
              };
            });

          const handle = await context.writeResource("installed", g.nodeHost, {
            packages,
            count: packages.length,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Found {count} installed homebrew packages on {host}",
            { host: g.nodeHost, count: packages.length },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("homebrew list failed on {host}: {error}", {
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
