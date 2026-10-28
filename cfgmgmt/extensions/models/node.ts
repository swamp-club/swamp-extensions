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
import { exec, getConnection } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  hostname: z.string().describe("Hostname or IP of the remote node"),
  sshUser: z.string().default("root").describe("SSH username"),
  sshPort: z.number().default(22).describe("SSH port"),
  sshIdentityFile: z.string().optional().describe("Path to SSH private key"),
});

type GlobalArgs = z.infer<typeof GlobalArgsSchema>;
type Context = ModelContext<GlobalArgs>;

const InfoSchema = z.object({
  hostname: z.string().describe("System hostname"),
  os: z.string().describe("OS identifier (e.g. fedora, ubuntu, arch)"),
  osVersion: z.string().describe("OS version (e.g. 41, 24.04)"),
  arch: z.string().describe("CPU architecture (e.g. x86_64, aarch64)"),
  kernel: z.string().describe("Kernel version"),
  packageManagers: z.array(z.string()).describe("Detected package managers"),
  gatheredAt: z.string().describe(
    "ISO 8601 timestamp of when facts were gathered",
  ),
});

/**
 * Gathers system facts (hostname, OS, version, architecture, kernel and
 * available package managers) from a remote node over SSH (`gather`).
 */
export const model = {
  type: "@swamp/cfgmgmt/node",
  version: "2026.10.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: z.object({
    hostname: z.string().optional().describe(
      "Hostname or IP of the remote node",
    ),
    sshUser: z.string().optional().describe("SSH username"),
    sshPort: z.number().optional().describe("SSH port"),
    sshIdentityFile: z.string().optional().describe("Path to SSH private key"),
  }),
  resources: {
    info: {
      description: "Facts gathered from the node",
      schema: InfoSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    gather: {
      description: "SSH to node and gather system facts",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Gathering facts from {host}", {
          host: g.hostname,
        });
        try {
          const client = await getConnection({
            host: g.hostname,
            port: g.sshPort,
            username: g.sshUser,
            privateKeyPath: g.sshIdentityFile,
          });

          const unameResult = await exec(client, "uname -srm");
          if (unameResult.exitCode !== 0) {
            throw new Error(
              `uname failed with exit code ${unameResult.exitCode}: ${unameResult.stderr.trim()}`,
            );
          }
          const unameParts = unameResult.stdout.trim().split(/\s+/);
          const kernel = unameParts[1] || unameParts[0] || "unknown";
          const arch = unameParts[2] || "unknown";

          const osReleaseResult = await exec(
            client,
            "cat /etc/os-release 2>/dev/null || echo 'ID=unknown'",
          );
          const osRelease = new Map<string, string>();
          for (const line of osReleaseResult.stdout.split("\n")) {
            const eq = line.indexOf("=");
            if (eq > 0) {
              const key = line.slice(0, eq);
              const val = line.slice(eq + 1).replace(/^"|"$/g, "");
              osRelease.set(key, val);
            }
          }

          const hostnameResult = await exec(client, "hostname");

          const probes = [
            ["pacman", "pacman"],
            ["apt", "apt-get"],
            ["dnf", "dnf"],
            ["yum", "yum"],
            ["homebrew", "brew"],
            ["nix", "nix-env"],
            ["zypper", "zypper"],
            ["apk", "apk"],
          ];
          const packageManagers: string[] = [];
          for (const [name, bin] of probes) {
            const r = await exec(client, `command -v ${bin} 2>/dev/null`);
            if (r.exitCode === 0) packageManagers.push(name);
          }

          const os = osRelease.get("ID") || "unknown";
          const osVersion = osRelease.get("VERSION_ID") || "unknown";
          const handle = await context.writeResource("info", g.hostname, {
            hostname: hostnameResult.stdout.trim() || "unknown",
            os,
            osVersion,
            arch,
            kernel,
            packageManagers,
            gatheredAt: new Date().toISOString(),
          });
          context.logger.info("Gathered facts from {host}: {os} {osVersion}", {
            host: g.hostname,
            os,
            osVersion,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error("Fact gathering failed on {host}: {error}", {
            host: g.hostname,
            error: errorMessage(err),
          });
          throw err;
        }
      },
    },
  },
  reports: [],
};
