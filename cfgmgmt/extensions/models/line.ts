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
import { execChecked, statProbe } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  path: z.string().describe("Absolute path of the file on the remote node"),
  regexp: z.string().describe(
    "Regular expression to match the target line. First match is used.",
  ),
  line: z.string().optional().describe(
    "The line to insert or replace. Required when ensure is present.",
  ),
  ensure: z.enum(["present", "absent"]).default("present").describe(
    "Whether the matching line should be present or absent",
  ),
  insertAfter: z.string().optional().describe(
    "Regex pattern — insert the line after the last match of this pattern if regexp has no match. Defaults to EOF.",
  ),
  insertBefore: z.string().optional().describe(
    "Regex pattern — insert the line before the first match of this pattern if regexp has no match",
  ),
  createFile: z.boolean().default(true).describe(
    "Create the file if it does not exist (ensure=present only)",
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
  path: z.string().describe("File path"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    fileExists: z.boolean().describe("Whether the file exists"),
    matchFound: z.boolean().describe(
      "Whether the regexp matched a line in the file",
    ),
    matchedLine: z.string().nullable().describe("The line that matched"),
    lineNumber: z.number().nullable().describe(
      "Line number of the match (1-based)",
    ),
  }).describe("Current state on the remote node"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

type Current = z.infer<typeof StateSchema>["current"];

interface Gathered extends Current {
  lines: string[];
}

function connect(g: GlobalArgs) {
  return getConnection({
    host: g.nodeHost,
    port: g.nodePort,
    username: g.nodeUser,
    privateKeyPath: g.nodeIdentityFile,
  });
}

function emptyCurrent(): Current {
  return {
    fileExists: false,
    matchFound: false,
    matchedLine: null,
    lineNumber: null,
  };
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Gathered> {
  const so = sudoOpts(g);
  // A probe failure must not read as "no file", and a directory at the path
  // must not read as one either: the write would land inside it.
  const kind = (await execChecked(
    client,
    statProbe(g.path, "%F", { follow: true }),
    so,
    `stat ${g.path}`,
  )).stdout.trim();
  const fileExists = kind !== "NOTFOUND";
  if (
    fileExists && kind !== "regular file" && kind !== "regular empty file"
  ) {
    throw new Error(`${g.path} exists but is not a regular file (${kind})`);
  }

  if (!fileExists) {
    return {
      fileExists,
      matchFound: false,
      matchedLine: null,
      lineNumber: null,
      lines: [],
    };
  }

  // A failed read must not look like an empty file: apply would then
  // overwrite the whole file with just the managed line.
  const catResult = await execChecked(
    client,
    `cat ${shellEscape(g.path)}`,
    so,
    `read ${g.path}`,
  );
  const lines = catResult.stdout.split("\n");
  // Remove trailing empty element from split if file ends with newline
  if (lines.length > 0 && lines[lines.length - 1] === "") {
    lines.pop();
  }

  const re = new RegExp(g.regexp);
  let matchedLine = null;
  let lineNumber = null;
  for (let i = 0; i < lines.length; i++) {
    if (re.test(lines[i])) {
      matchedLine = lines[i];
      lineNumber = i + 1;
      break;
    }
  }

  return {
    fileExists,
    matchFound: matchedLine !== null,
    matchedLine,
    lineNumber,
    lines,
  };
}

/**
 * ensure=present needs a line; fail clearly instead of writing "undefined".
 * The patterns are compiled up front so a typo fails before connecting.
 */
function validateArgs(g: GlobalArgs) {
  if (g.ensure === "present" && g.line === undefined) {
    throw new Error("line is required when ensure is present");
  }
  const patterns: [string, string | undefined][] = [
    ["regexp", g.regexp],
    ["insertAfter", g.insertAfter],
    ["insertBefore", g.insertBefore],
  ];
  for (const [name, pattern] of patterns) {
    if (pattern === undefined) continue;
    try {
      new RegExp(pattern);
    } catch (err) {
      throw new Error(
        `${name} is not a valid regular expression: ${errorMessage(err)}`,
      );
    }
  }
}

function detectChanges(g: GlobalArgs, current: Gathered) {
  const changes = [];

  if (g.ensure === "present") {
    if (!current.fileExists) {
      if (g.createFile) {
        changes.push("create file and add line");
      } else {
        changes.push("file does not exist");
      }
    } else if (!current.matchFound) {
      // A `line` that `regexp` does not match would otherwise be appended
      // again on every run; once it is present, the file is compliant.
      if (g.line === undefined || !current.lines.includes(g.line)) {
        changes.push("add line");
      }
    } else if (current.matchedLine !== g.line) {
      changes.push(
        `replace line ${current.lineNumber}: ${
          JSON.stringify(current.matchedLine)
        } -> ${JSON.stringify(g.line)}`,
      );
    }
  } else {
    // Every matching line goes, so one apply converges.
    const re = new RegExp(g.regexp);
    for (const [i, l] of current.lines.entries()) {
      if (re.test(l)) {
        changes.push(`remove line ${i + 1}: ${JSON.stringify(l)}`);
      }
    }
  }

  return changes;
}

function applyLineEdit(g: GlobalArgs, lines: string[], current: Current) {
  const result = [...lines];

  if (g.ensure === "present") {
    if (current.matchFound && current.lineNumber !== null) {
      // Replace existing line
      result[current.lineNumber - 1] = g.line!;
    } else if (!result.includes(g.line!)) {
      // Insert new line
      if (g.insertBefore) {
        const re = new RegExp(g.insertBefore);
        const idx = result.findIndex((l) => re.test(l));
        if (idx >= 0) {
          result.splice(idx, 0, g.line!);
          return result;
        }
      }
      if (g.insertAfter) {
        const re = new RegExp(g.insertAfter);
        let lastIdx = -1;
        for (let i = 0; i < result.length; i++) {
          if (re.test(result[i])) lastIdx = i;
        }
        if (lastIdx >= 0) {
          result.splice(lastIdx + 1, 0, g.line!);
          return result;
        }
      }
      // Default: append to end
      result.push(g.line!);
    }
  } else {
    // Remove every matching line
    const re = new RegExp(g.regexp);
    return result.filter((l) => !re.test(l));
  }

  return result;
}

/**
 * Ensures a single line, selected by a regular expression, is present (inserted or replaced) or absent in a file on a remote node over SSH. `check` reports drift without changing anything; `apply` edits the file.
 */
export const model = {
  type: "@swamp/cfgmgmt/line",
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
        "Check if the line matches desired state in the file (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Checking line in {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          validateArgs(g);
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);
          const handle = await context.writeResource("state", g.nodeHost, {
            path: g.path,
            status: changes.length === 0 ? "compliant" : "non_compliant",
            current: {
              fileExists: current.fileExists,
              matchFound: current.matchFound,
              matchedLine: current.matchedLine,
              lineNumber: current.lineNumber,
            },
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Line in {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: changes.length === 0 ? "compliant" : "non_compliant",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Check of line in {path} failed on {host}: {error}",
            {
              path: g.path,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            path: g.path,
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
      description: "Ensure a line is present/absent in the file",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info("Applying line in {path} on {host}", {
          path: g.path,
          host: g.nodeHost,
        });
        try {
          validateArgs(g);
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              path: g.path,
              status: "compliant",
              current: {
                fileExists: current.fileExists,
                matchFound: current.matchFound,
                matchedLine: current.matchedLine,
                lineNumber: current.lineNumber,
              },
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info("Line in {path} on {host} is {status}", {
              path: g.path,
              host: g.nodeHost,
              status: "compliant",
            });
            return { dataHandles: [handle] };
          }

          if (!current.fileExists && g.ensure === "present" && !g.createFile) {
            throw new Error(`File does not exist: ${g.path}`);
          }

          const so = sudoOpts(g);
          const lines = current.fileExists ? current.lines : [];
          const newLines = applyLineEdit(g, lines, current);
          const newContent = newLines.length > 0
            ? newLines.join("\n") + "\n"
            : "";

          const dir = g.path.substring(0, g.path.lastIndexOf("/"));
          if (dir && !current.fileExists) {
            await execChecked(
              client,
              `mkdir -p ${shellEscape(dir)}`,
              so,
              "mkdir",
            );
          }

          await writeFileAs(client, g.path, newContent, so);

          const updated = await gather(client, g);
          const handle = await context.writeResource("state", g.nodeHost, {
            path: g.path,
            status: "applied",
            current: {
              fileExists: updated.fileExists,
              matchFound: updated.matchFound,
              matchedLine: updated.matchedLine,
              lineNumber: updated.lineNumber,
            },
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info("Line in {path} on {host} is {status}", {
            path: g.path,
            host: g.nodeHost,
            status: "applied",
          });
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Apply of line in {path} failed on {host}: {error}",
            {
              path: g.path,
              host: g.nodeHost,
              error: errorMessage(err),
            },
          );
          await context.writeResource("state", g.nodeHost, {
            path: g.path,
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
