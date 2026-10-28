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
import {
  execSudo,
  getConnection,
  shellEscape,
  writeFileAs,
} from "./_lib/ssh.ts";
import type { BecomeOpts, SshConn } from "./_lib/ssh.ts";
import { errorMessage, type ModelContext } from "./_lib/context.ts";
import { execChecked, remoteHash, statProbe } from "./_lib/checks.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Certificate name — used as a label in state output",
  ),
  certContent: z.string().describe("PEM-encoded certificate content"),
  keyContent: z.string().meta({ sensitive: true }).describe(
    "PEM-encoded private key content",
  ),
  chainContent: z.string().optional().describe(
    "PEM-encoded certificate chain (intermediate + root CAs)",
  ),
  certPath: z.string().describe(
    "Absolute path for the certificate file on the remote node",
  ),
  keyPath: z.string().describe(
    "Absolute path for the private key file on the remote node",
  ),
  chainPath: z.string().optional().describe(
    "Absolute path for the chain file on the remote node",
  ),
  owner: z.string().optional().describe(
    "Owner for all certificate files",
  ),
  group: z.string().optional().describe(
    "Group for all certificate files",
  ),
  certMode: z.string().default("0644").describe(
    "Permissions for the certificate file",
  ),
  keyMode: z.string().default("0600").describe(
    "Permissions for the private key file (default: restricted)",
  ),
  chainMode: z.string().default("0644").describe(
    "Permissions for the chain file",
  ),
  validate: z.boolean().default(true).describe(
    "Validate that the certificate and key match using openssl",
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
type Current = z.infer<typeof StateSchema>["current"];

function sudoOpts(g: GlobalArgs) {
  return {
    become: g.become,
    becomeUser: g.becomeUser,
    becomePassword: g.becomePassword,
  };
}

const StateSchema = z.object({
  name: z.string().describe("Certificate name"),
  status: z.enum(["compliant", "non_compliant", "applied", "failed"]).describe(
    "Compliance status",
  ),
  current: z.object({
    certExists: z.boolean().describe("Whether the cert file exists"),
    keyExists: z.boolean().describe("Whether the key file exists"),
    chainExists: z.boolean().describe("Whether the chain file exists"),
    certSha256: z.string().nullable().describe("SHA-256 of current cert file"),
    keySha256: z.string().nullable().describe("SHA-256 of current key file"),
    chainSha256: z.string().nullable().describe(
      "SHA-256 of current chain file",
    ),
    certKeyMatch: z.boolean().nullable().describe(
      "Whether the cert and key public keys match",
    ),
  }).describe("Current certificate state on the remote node"),
  changes: z.array(z.string()).describe("List of changes detected or applied"),
  error: z.string().nullable().describe("Error message if status is failed"),
  timestamp: z.string().describe("ISO 8601 timestamp"),
});

/** Structured log fields naming what this run manages, and where. */
function logFields(g: GlobalArgs) {
  return { name: g.name, host: g.nodeHost };
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
    certExists: false,
    keyExists: false,
    chainExists: false,
    certSha256: null,
    keySha256: null,
    chainSha256: null,
    certKeyMatch: null,
  };
}

async function hashContent(content: string) {
  const data = new TextEncoder().encode(content);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) =>
    b.toString(16).padStart(2, "0")
  ).join("");
}

function fileHash(client: SshConn, path: string, so: BecomeOpts) {
  return remoteHash(client, path, so);
}

async function fileExists(
  client: SshConn,
  path: string,
  so: BecomeOpts,
) {
  // A failed probe is an error, not "missing": deploy would overwrite a key.
  const kind = (await execChecked(
    client,
    statProbe(path, "%F", { follow: true }),
    so,
    `stat ${path}`,
  )).stdout.trim();
  if (kind === "NOTFOUND") return false;
  if (kind !== "regular file" && kind !== "regular empty file") {
    throw new Error(`${path} exists but is not a regular file (${kind})`);
  }
  return true;
}

async function checkCertKeyMatch(
  client: SshConn,
  certPath: string,
  keyPath: string,
  so: BecomeOpts,
) {
  // Compare public keys rather than RSA moduli, so EC and Ed25519 pairs are
  // validated too. Both commands print a PEM SubjectPublicKeyInfo.
  const certPub = await execSudo(
    client,
    `openssl x509 -noout -pubkey -in ${shellEscape(certPath)} 2>/dev/null`,
    so,
  );
  const keyPub = await execSudo(
    client,
    `openssl pkey -pubout -in ${shellEscape(keyPath)} 2>/dev/null`,
    so,
  );
  if (
    certPub.exitCode !== 0 || keyPub.exitCode !== 0 ||
    !certPub.stdout.trim() || !keyPub.stdout.trim()
  ) {
    return null;
  }
  return certPub.stdout.trim() === keyPub.stdout.trim();
}

/** chainPath and chainContent only make sense together. */
function validateArgs(g: GlobalArgs) {
  if (g.chainPath && g.chainContent === undefined) {
    throw new Error("chainPath is set but chainContent is not");
  }
  if (g.chainContent !== undefined && !g.chainPath) {
    throw new Error("chainContent is set but chainPath is not");
  }
}

async function gather(client: SshConn, g: GlobalArgs): Promise<Current> {
  validateArgs(g);
  const so = sudoOpts(g);

  const certEx = await fileExists(client, g.certPath, so);
  const keyEx = await fileExists(client, g.keyPath, so);
  const chainEx = g.chainPath
    ? await fileExists(client, g.chainPath, so)
    : false;

  const certSha256 = certEx ? await fileHash(client, g.certPath, so) : null;
  const keySha256 = keyEx ? await fileHash(client, g.keyPath, so) : null;
  const chainSha256 = chainEx && g.chainPath
    ? await fileHash(client, g.chainPath, so)
    : null;

  const certKeyMatch = certEx && keyEx
    ? await checkCertKeyMatch(client, g.certPath, g.keyPath, so)
    : null;

  return {
    certExists: certEx,
    keyExists: keyEx,
    chainExists: chainEx,
    certSha256,
    keySha256,
    chainSha256,
    certKeyMatch,
  };
}

async function detectChanges(g: GlobalArgs, current: Current) {
  const changes: string[] = [];

  const desiredCertHash = await hashContent(g.certContent);
  const desiredKeyHash = await hashContent(g.keyContent);

  if (!current.certExists) {
    changes.push("deploy certificate");
  } else if (current.certSha256 !== desiredCertHash) {
    changes.push("update certificate");
  }

  if (!current.keyExists) {
    changes.push("deploy private key");
  } else if (current.keySha256 !== desiredKeyHash) {
    changes.push("update private key");
  }

  if (g.chainContent && g.chainPath) {
    const desiredChainHash = await hashContent(g.chainContent);
    if (!current.chainExists) {
      changes.push("deploy certificate chain");
    } else if (current.chainSha256 !== desiredChainHash) {
      changes.push("update certificate chain");
    }
  }

  return changes;
}

async function deployFile(
  client: SshConn,
  path: string,
  content: string,
  mode: string,
  g: GlobalArgs,
) {
  const so = sudoOpts(g);
  const dir = path.substring(0, path.lastIndexOf("/"));
  if (dir) {
    await execChecked(
      client,
      `mkdir -p ${shellEscape(dir)}`,
      so,
      `mkdir ${dir}`,
    );
  }
  await writeFileAs(client, path, content, so);
  await execChecked(
    client,
    `chmod ${shellEscape(mode)} ${shellEscape(path)}`,
    so,
    `chmod ${path}`,
  );
  if (g.owner || g.group) {
    const ownership = g.group ? `${g.owner || ""}:${g.group}` : g.owner;
    await execChecked(
      client,
      // Non-null: guarded by `g.owner || g.group` above, so when group is
      // unset owner is truthy.
      `chown ${shellEscape(ownership!)} ${shellEscape(path)}`,
      so,
      `chown ${path}`,
    );
  }
}

/**
 * Deploys a TLS certificate, private key and optional chain to a node over
 * SSH, compared by SHA-256. `check` reports drift without changing anything;
 * `apply` writes changed files, sets modes/ownership and, when `validate` is
 * set, verifies the certificate and key share a public key.
 */
export const model = {
  type: "@swamp/cfgmgmt/certificate",
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
        "Check if certificates are deployed and match desired state (dry-run)",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Checking certificate {name} on {host}",
          logFields(g),
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = await detectChanges(g, current);
          const status = changes.length === 0 ? "compliant" : "non_compliant";
          const handle = await context.writeResource("state", g.nodeHost, {
            name: g.name,
            status,
            current,
            changes,
            error: null,
            timestamp: new Date().toISOString(),
          });
          context.logger.info(
            "Certificate {name} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: status,
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Checking certificate {name} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
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
      description:
        "Deploy certificate, key, and optional chain to the remote node",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: Context) => {
        const g = context.globalArgs;
        context.logger.info(
          "Applying certificate {name} on {host}",
          logFields(g),
        );
        try {
          const client = await connect(g);
          const current = await gather(client, g);
          const changes = await detectChanges(g, current);

          if (changes.length === 0) {
            const handle = await context.writeResource("state", g.nodeHost, {
              name: g.name,
              status: "compliant",
              current,
              changes: [],
              error: null,
              timestamp: new Date().toISOString(),
            });
            context.logger.info(
              "Certificate {name} on {host} is {status} ({changeCount} changes)",
              {
                ...logFields(g),
                status: "compliant",
                changeCount: changes.length,
              },
            );
            return { dataHandles: [handle] };
          }

          // Deploy cert
          if (
            changes.includes("deploy certificate") ||
            changes.includes("update certificate")
          ) {
            await deployFile(
              client,
              g.certPath,
              g.certContent,
              g.certMode,
              g,
            );
          }

          // Deploy key
          if (
            changes.includes("deploy private key") ||
            changes.includes("update private key")
          ) {
            await deployFile(
              client,
              g.keyPath,
              g.keyContent,
              g.keyMode,
              g,
            );
          }

          // Deploy chain
          if (
            g.chainContent && g.chainPath &&
            (changes.includes("deploy certificate chain") ||
              changes.includes("update certificate chain"))
          ) {
            await deployFile(
              client,
              g.chainPath,
              g.chainContent,
              g.chainMode,
              g,
            );
          }

          // Validate cert/key match
          if (g.validate) {
            const so = sudoOpts(g);
            const match = await checkCertKeyMatch(
              client,
              g.certPath,
              g.keyPath,
              so,
            );
            if (match === false) {
              throw new Error(
                "Certificate and private key do not match (public key mismatch)",
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
          context.logger.info(
            "Certificate {name} on {host} is {status} ({changeCount} changes)",
            {
              ...logFields(g),
              status: "applied",
              changeCount: changes.length,
            },
          );
          return { dataHandles: [handle] };
        } catch (err) {
          context.logger.error(
            "Applying certificate {name} on {host} failed: {error}",
            {
              ...logFields(g),
              error: errorMessage(err),
            },
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
