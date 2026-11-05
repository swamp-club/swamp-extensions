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
 * Detector for the *sshole OpenSSH musl password bypass: on musl libc (Alpine,
 * OpenWrt, buildroot, yocto), with password auth handled without PAM, an
 * account whose /etc/shadow field is "*" accepts any 257–1024 character
 * password. Fixed in OpenSSH 10.6p2. Runs a read-only probe on the local
 * machine, a running Docker container, or a container started from an image,
 * and reports whether the target is vulnerable. It never logs in over SSH and
 * never changes the target.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import type { Status } from "./_lib/schemas.ts";
import { StatusSchema } from "./_lib/schemas.ts";
import {
  buildTransport,
  type Logger,
  makeRunner,
  present,
  scanTarget,
  startDockerImage,
  stopContainer,
  targetLabel,
  type Transport,
} from "./_lib/transport.ts";

export type FileWriter = {
  writeLine: (line: string) => Promise<void>;
  finalize: () => Promise<void>;
};

type MethodContext = {
  globalArgs: z.infer<typeof GlobalArgsSchema>;
  logger: Logger;
  createFileWriter: (fileSpec: string, label: string) => FileWriter;
  writeResource: (
    specName: string,
    instanceName: string,
    data: unknown,
  ) => Promise<unknown>;
};

const GlobalArgsSchema = z.object({
  dockerContainer: z
    .string()
    .optional()
    .describe(
      "Docker container name or ID to scan; omit to scan the local machine",
    ),
  dockerImage: z
    .string()
    .optional()
    .describe("Docker image to start and scan; the container is removed after"),
});

const InputsSchema = z.object({
  dockerContainer: z.string().optional().describe("Docker container to scan"),
  dockerImage: z.string().optional().describe("Docker image to auto-start"),
});

/** A target label as a portable data instance name: only [A-Za-z0-9._-],
 * no "..". Image refs ("alpine:3.20") contain ':', which Windows rejects. */
export function instanceName(label: string): string {
  return label.replace(/[^A-Za-z0-9._-]/g, "_").replace(/\.\./g, "_");
}

type OpenTarget = { label: string; transport: Transport; started?: string };

/** Rejects global arguments that name two targets at once. */
export function checkTargetArgs(g: z.infer<typeof GlobalArgsSchema>): void {
  if (present(g.dockerImage) && present(g.dockerContainer)) {
    throw new Error(
      "Set either dockerContainer or dockerImage, not both: each names the target to scan.",
    );
  }
}

async function openTarget(
  g: z.infer<typeof GlobalArgsSchema>,
  logger: Logger,
): Promise<OpenTarget> {
  checkTargetArgs(g);
  if (present(g.dockerImage)) {
    const container = await startDockerImage(g.dockerImage!, logger);
    return {
      label: g.dockerImage!,
      transport: { kind: "docker", container },
      started: container,
    };
  }
  return { label: targetLabel(g), transport: buildTransport(g) };
}

/** The one-word answer printed at the top of the log. */
export function verdictLine(status: Status): string {
  switch (status.verdict) {
    case "vulnerable":
      return "VULNERABLE";
    case "not-vulnerable":
      return "NOT VULNERABLE";
    default:
      return "UNKNOWN";
  }
}

/** Writes a human-readable summary of a scan into the streaming log. */
export async function writeScanLog(
  log: FileWriter,
  status: Status,
): Promise<void> {
  await log.writeLine(`Verdict:    ${verdictLine(status)}`);
  await log.writeLine(`Host:       ${status.hostname} (${status.target})`);
  await log.writeLine(
    `OS:         ${status.os.prettyName || status.os.id || "unknown"}`,
  );
  await log.writeLine(`libc:       ${status.libc}`);
  await log.writeLine(`OpenSSH:    ${status.openSshVersion ?? "unknown"}`);
  await log.writeLine(
    `UsePAM:     ${status.usesPam} (sshd links pam: ${status.sshdLinksPam})`,
  );
  await log.writeLine(`PasswordAuthentication: ${status.passwordAuth}`);
  await log.writeLine(
    `'*' accounts: ${
      status.starAccountsKnown
        ? status.starAccounts.map((a) => a.user).join(", ") || "none"
        : "unknown (need root)"
    }`,
  );
  await log.writeLine(
    `Risk:       ${status.riskLevel.toUpperCase()} — ${status.summary}`,
  );
  for (const r of status.reasons) await log.writeLine(`  - ${r}`);
  await log.writeLine("");
}

/** The @swamp/cve/sshole model. */
export const model = {
  type: "@swamp/cve/sshole",
  version: "2026.11.05.2",
  globalArguments: GlobalArgsSchema,
  upgrades: [
    {
      toVersion: "2026.11.05.2",
      description:
        "Follows Include, picks the sshd build that runs (sshd.pam on Alpine), treats unevaluated AllowUsers-style rules and packaged non-Alpine builds below 10.6p2 as unknown, and records xbps. Existing arguments are unchanged.",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  inputsSchema: InputsSchema,
  reports: ["@swamp/cve/sshole-report"],
  resources: {
    status: {
      description:
        "Whether the target is vulnerable to the *sshole OpenSSH musl password bypass",
      schema: StatusSchema,
      lifetime: "infinite" as const,
      garbageCollection: 20,
    },
  },
  files: {
    log: {
      description: "Scan execution log",
      contentType: "text/plain",
      lifetime: "7d" as const,
      garbageCollection: 5,
      streaming: true,
    },
  },
  methods: {
    scan: {
      description:
        "Report whether the local machine, a container or an image is vulnerable to the *sshole OpenSSH musl password bypass (read-only)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: MethodContext) => {
        const logger = context.logger;
        const t = await openTarget(context.globalArgs, logger);
        // Everything after the container starts sits inside try, so a failure
        // opening or writing the log still removes the container.
        let log: FileWriter | undefined;
        try {
          // The log and the status resource need distinct names within a run.
          log = context.createFileWriter("log", `${instanceName(t.label)}-log`);
          await log.writeLine(
            `[${new Date().toISOString()}] *sshole scan of ${t.label}\n`,
          );
          const status = await scanTarget(
            makeRunner(t.transport, logger),
            t.label,
          );
          await writeScanLog(log, status);
          logger.info(`${t.label}: ${verdictLine(status)} — ${status.summary}`);
          const handle = await context.writeResource(
            "status",
            instanceName(t.label),
            status,
          );
          return { dataHandles: [handle] };
        } finally {
          if (t.started) await stopContainer(t.started, logger);
          await log?.finalize();
        }
      },
    },
  },
};
