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
import { execChecked, RecordedFailure } from "./_lib/checks.ts";
import { execSudo, getConnection, shellEscape } from "./_lib/ssh.ts";
import type { SshConn } from "./_lib/ssh.ts";

const GlobalArgsSchema = z.object({
  image: z.string().describe("Docker image name with tag (e.g. nginx:1.25)"),
  ensure: z.enum(["present", "absent"]).describe(
    "Whether image should be present or absent",
  ),
  force: z.boolean().default(false).describe(
    "Force pull even if image is already present",
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
  image: z.string().describe("Docker image name"),
  ensure: z.string().describe("Desired state"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    imageExists: z.boolean().describe("Whether the image exists locally"),
    imageId: z.string().nullable().describe("Image ID"),
    tags: z.array(z.string()).describe("Image tags"),
    created: z.string().nullable().describe("Image creation timestamp"),
    size: z.number().nullable().describe("Image size in bytes"),
  }).describe("Current Docker image state"),
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

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  const so = sudoOpts(g);

  const dockerCheck = await execSudo(
    client,
    `command -v docker`,
    so,
  );
  if (dockerCheck.exitCode !== 0) {
    throw new Error("Docker is not installed");
  }

  const result = await execSudo(
    client,
    `docker image inspect ${
      shellEscape(g.image)
    } --format '{{.Id}}|||{{json .RepoTags}}|||{{.Created}}|||{{.Size}}' 2>/dev/null`,
    so,
  );

  if (result.exitCode !== 0) {
    return {
      imageExists: false,
      imageId: null,
      tags: [] as string[],
      created: null,
      size: null,
    };
  }

  const parts = result.stdout.trim().split("|||");
  let tags: string[] = [];
  try {
    const parsed: unknown = JSON.parse(parts[1] || "[]");
    if (Array.isArray(parsed)) {
      tags = parsed.filter((t): t is string => typeof t === "string");
    }
  } catch {
    tags = [];
  }
  const size = parts[3] ? parseInt(parts[3], 10) : NaN;

  return {
    imageExists: true,
    imageId: parts[0] || null,
    tags,
    created: parts[2] || null,
    size: Number.isFinite(size) ? size : null,
  };
}

function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];
  if (g.ensure === "present") {
    if (!current.imageExists) {
      changes.push("pull image");
    } else if (g.force) {
      changes.push("force pull image");
    }
  } else {
    if (current.imageExists) changes.push("remove image");
  }
  return changes;
}

function emptyCurrent(): Current {
  return {
    imageExists: false,
    imageId: null,
    tags: [] as string[],
    created: null,
    size: null,
  };
}

/**
 * Manages a Docker image on a remote node over SSH: `check` reports whether
 * the image is present or absent as desired, `apply` pulls or removes it, and
 * `prune` removes dangling images.
 */
export const model = {
  type: "@swamp/cfgmgmt/docker_image",
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
      description: "Check if Docker image matches desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking image {image} on {host}", {
          image: g.image,
          host: g.nodeHost,
        });
        let current: Current | null = null;
        try {
          const client = await connect(g);
          current = await gather(client, g);
          const changes = detectChanges(g, current);
          const status = changes.length === 0 ? "compliant" : "non_compliant";
          const handle = await context.writeResource("state", g.nodeHost, {
            image: g.image,
            ensure: g.ensure,
            status,
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Image {image} on {host} is {status}", {
            image: g.image,
            host: g.nodeHost,
            status,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "docker_image check failed on {host}: {error}",
            { host: g.nodeHost, error: errorMessage(err) },
          );
          await context.writeResource("state", g.nodeHost, {
            image: g.image,
            ensure: g.ensure,
            status: "failed",
            current: current ?? emptyCurrent(),
            changes: [],
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    apply: {
      description: "Pull or remove a Docker image",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying image {image} ({ensure}) on {host}", {
          image: g.image,
          ensure: g.ensure,
          host: g.nodeHost,
        });
        let current: Current | null = null;
        let changes: string[] = [];
        try {
          const client = await connect(g);
          current = await gather(client, g);
          changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              image: g.image,
              ensure: g.ensure,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Image {image} on {host} is compliant", {
              image: g.image,
              host: g.nodeHost,
            });
            return { dataHandles: [handle] };
          }

          const so = sudoOpts(g);

          if (g.ensure === "absent") {
            await execChecked(
              client,
              `docker rmi ${shellEscape(g.image)}`,
              so,
              "docker rmi",
            );
          } else {
            await execChecked(
              client,
              `docker pull ${shellEscape(g.image)}`,
              so,
              "docker pull",
            );
          }

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            image: g.image,
            ensure: g.ensure,
            status: "applied",
            current: updated,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Applied {changes} for {image} on {host}", {
            changes,
            image: g.image,
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "docker_image apply failed on {host}: {error}",
            { host: g.nodeHost, error: errorMessage(err) },
          );
          await context.writeResource("state", g.nodeHost, {
            image: g.image,
            ensure: g.ensure,
            status: "failed",
            current: current ?? emptyCurrent(),
            changes,
            error: errorMessage(err),
            timestamp: new Date().toISOString(),
          });
          throw err;
        }
      },
    },
    prune: {
      description: "Remove dangling Docker images (imperative, always runs)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Pruning dangling images on {host}", {
          host: g.nodeHost,
        });
        try {
          const client = await connect(g);
          const so = sudoOpts(g);
          const result = await execSudo(
            client,
            `docker image prune -f`,
            so,
          );
          const current = await gather(client, g);
          const detail = result.stderr.trim() || result.stdout.trim();
          const error = result.exitCode === 0 ? null : `docker image prune ` +
            `failed with exit code ${result.exitCode}${
              detail ? `: ${detail}` : ""
            }`;
          const handle = await context.writeResource("state", g.nodeHost, {
            image: g.image,
            ensure: g.ensure,
            status: error === null ? "applied" : "failed",
            current,
            changes: ["prune dangling images"],
            error,
            timestamp: new Date().toISOString(),
          });
          if (error !== null) throw new RecordedFailure(error);
          context.logger.info("Pruned dangling images on {host}", {
            host: g.nodeHost,
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "docker_image prune failed on {host}: {error}",
            { host: g.nodeHost, error: errorMessage(err) },
          );
          if (err instanceof RecordedFailure) throw err;
          await context.writeResource("state", g.nodeHost, {
            image: g.image,
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
