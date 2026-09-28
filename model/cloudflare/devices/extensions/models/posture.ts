// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/cloudflare/devices/posture
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Posture.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, lookup,
 * adopt, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  listAll,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  description: z.string().describe(
    "The description of the device posture rule.",
  ).optional(),
  expiration: z.string().describe(
    "Sets the expiration time for a posture check result. If empty, the result remains valid until it is overwritten by new data from the WARP client.",
  ).optional(),
  input: z.object({
    exists: z.boolean().optional(),
    operating_system: z.enum([
      "windows",
      "linux",
      "mac",
      "android",
      "ios",
      "chromeos",
    ]).optional(),
    path: z.string().optional(),
    sha256: z.string().optional(),
    thumbprint: z.string().optional(),
    id: z.string().optional(),
    domain: z.string().optional(),
    operator: z.enum(["<", "<=", ">", ">=", "=="]).optional(),
    os_distro_name: z.string().optional(),
    os_distro_revision: z.string().optional(),
    os_version_extra: z.string().optional(),
    version: z.string().optional(),
    enabled: z.boolean().optional(),
    checkDisks: z.array(z.string()).optional(),
    requireAll: z.boolean().optional(),
    certificate_id: z.string().max(36).optional(),
    cn: z.string().optional(),
    check_private_key: z.boolean().optional(),
    extended_key_usage: z.array(z.enum(["clientAuth", "emailProtection"]))
      .optional(),
    locations: z.object({
      paths: z.array(z.string()).optional(),
      trust_stores: z.array(z.enum(["system", "user"])).optional(),
    }).optional(),
    subject_alternative_names: z.array(z.string()).optional(),
    update_window_days: z.number().optional(),
    compliance_status: z.enum([
      "compliant",
      "noncompliant",
      "unknown",
      "notapplicable",
      "ingraceperiod",
      "error",
    ]).optional(),
    connection_id: z.string().optional(),
    last_seen: z.string().optional(),
    os: z.string().optional(),
    overall: z.string().optional(),
    sensor_config: z.string().optional(),
    state: z.enum(["online", "offline", "unknown"]).optional(),
    versionOperator: z.enum(["<", "<=", ">", ">=", "=="]).optional(),
    auth_state: z.array(z.enum(["Good", "Notified", "Will Block", "Blocked"]))
      .optional(),
    countOperator: z.enum(["<", "<=", ">", ">=", "=="]).optional(),
    issue_count: z.string().optional(),
    eid_last_seen: z.string().optional(),
    risk_level: z.enum(["low", "medium", "high", "critical"]).optional(),
    scoreOperator: z.enum(["<", "<=", ">", ">=", "=="]).optional(),
    total_score: z.number().optional(),
    active_threats: z.number().optional(),
    infected: z.boolean().optional(),
    is_active: z.boolean().optional(),
    network_status: z.enum([
      "connected",
      "disconnected",
      "disconnecting",
      "connecting",
    ]).optional(),
    operational_state: z.enum([
      "na",
      "partially_disabled",
      "auto_fully_disabled",
      "fully_disabled",
      "auto_partially_disabled",
      "disabled_error",
      "db_corruption",
    ]).optional(),
    score: z.number().optional(),
  }).optional(),
  match: z.array(z.object({
    platform: z.enum(["windows", "mac", "linux", "android", "ios", "chromeos"])
      .optional(),
  })).describe("The conditions that the client must match to run the rule.")
    .optional(),
  name: z.string().describe("The name of the device posture rule.").optional(),
  schedule: z.string().describe(
    "Polling frequency for the WARP client posture check. Default: `5m` (poll every five minutes). Minimum: `1m`.",
  ).optional(),
  type: z.enum([
    "file",
    "application",
    "tanium",
    "gateway",
    "warp",
    "disk_encryption",
    "serial_number",
    "sentinelone",
    "carbonblack",
    "firewall",
    "os_version",
    "domain_joined",
    "client_certificate",
    "client_certificate_v2",
    "antivirus",
    "unique_client_id",
    "kolide",
    "tanium_s2s",
    "crowdstrike_s2s",
    "intune",
    "workspace_one",
    "sentinelone_s2s",
    "custom_s2s",
  ]).describe("The type of device posture rule.").optional(),
  apiToken: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API token; overrides the CLOUDFLARE_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  apiKey: z.string().meta({ sensitive: true }).describe(
    "Cloudflare API key for the legacy key+email auth path; overrides the CLOUDFLARE_API_KEY environment variable. Wire with a vault.get(...) expression. Requires email.",
  ).optional(),
  email: z.string().meta({ sensitive: true }).describe(
    "Cloudflare account email for the legacy key+email auth path; overrides the CLOUDFLARE_EMAIL environment variable. Requires apiKey.",
  ).optional(),
});

const ResourceSchema = z.object({
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  expiration: z.string().optional(),
  id: z.string(),
  input: z.object({
    exists: z.boolean().optional(),
    operating_system: z.string().optional(),
    path: z.string().optional(),
    sha256: z.string().optional(),
    thumbprint: z.string().optional(),
    id: z.string().optional(),
    domain: z.string().optional(),
    operator: z.string().optional(),
    os_distro_name: z.string().optional(),
    os_distro_revision: z.string().optional(),
    os_version_extra: z.string().optional(),
    version: z.string().optional(),
    enabled: z.boolean().optional(),
    checkDisks: z.array(z.string()).optional(),
    requireAll: z.boolean().optional(),
    certificate_id: z.string().optional(),
    cn: z.string().optional(),
    check_private_key: z.boolean().optional(),
    extended_key_usage: z.array(z.string()).optional(),
    locations: z.object({
      paths: z.array(z.string()).optional(),
      trust_stores: z.array(z.string()).optional(),
    }).optional(),
    subject_alternative_names: z.array(z.string()).optional(),
    update_window_days: z.number().optional(),
    compliance_status: z.string().optional(),
    connection_id: z.string().optional(),
    last_seen: z.string().optional(),
    os: z.string().optional(),
    overall: z.string().optional(),
    sensor_config: z.string().optional(),
    state: z.string().optional(),
    versionOperator: z.string().optional(),
    auth_state: z.array(z.string()).optional(),
    countOperator: z.string().optional(),
    issue_count: z.string().optional(),
    eid_last_seen: z.string().optional(),
    risk_level: z.string().optional(),
    scoreOperator: z.string().optional(),
    total_score: z.number().optional(),
    active_threats: z.number().optional(),
    infected: z.boolean().optional(),
    is_active: z.boolean().optional(),
    network_status: z.string().optional(),
    operational_state: z.string().optional(),
    score: z.number().optional(),
  }).optional(),
  match: z.array(z.object({
    platform: z.string().optional(),
  })).optional(),
  name: z.string().optional(),
  schedule: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  description: z.string().optional(),
  expiration: z.string().optional(),
  input: z.object({
    exists: z.boolean().optional(),
    operating_system: z.enum([
      "windows",
      "linux",
      "mac",
      "android",
      "ios",
      "chromeos",
    ]).optional(),
    path: z.string().optional(),
    sha256: z.string().optional(),
    thumbprint: z.string().optional(),
    id: z.string().optional(),
    domain: z.string().optional(),
    operator: z.enum(["<", "<=", ">", ">=", "=="]).optional(),
    os_distro_name: z.string().optional(),
    os_distro_revision: z.string().optional(),
    os_version_extra: z.string().optional(),
    version: z.string().optional(),
    enabled: z.boolean().optional(),
    checkDisks: z.array(z.string()).optional(),
    requireAll: z.boolean().optional(),
    certificate_id: z.string().max(36).optional(),
    cn: z.string().optional(),
    check_private_key: z.boolean().optional(),
    extended_key_usage: z.array(z.enum(["clientAuth", "emailProtection"]))
      .optional(),
    locations: z.object({
      paths: z.array(z.string()).optional(),
      trust_stores: z.array(z.enum(["system", "user"])).optional(),
    }).optional(),
    subject_alternative_names: z.array(z.string()).optional(),
    update_window_days: z.number().optional(),
    compliance_status: z.enum([
      "compliant",
      "noncompliant",
      "unknown",
      "notapplicable",
      "ingraceperiod",
      "error",
    ]).optional(),
    connection_id: z.string().optional(),
    last_seen: z.string().optional(),
    os: z.string().optional(),
    overall: z.string().optional(),
    sensor_config: z.string().optional(),
    state: z.enum(["online", "offline", "unknown"]).optional(),
    versionOperator: z.enum(["<", "<=", ">", ">=", "=="]).optional(),
    auth_state: z.array(z.enum(["Good", "Notified", "Will Block", "Blocked"]))
      .optional(),
    countOperator: z.enum(["<", "<=", ">", ">=", "=="]).optional(),
    issue_count: z.string().optional(),
    eid_last_seen: z.string().optional(),
    risk_level: z.enum(["low", "medium", "high", "critical"]).optional(),
    scoreOperator: z.enum(["<", "<=", ">", ">=", "=="]).optional(),
    total_score: z.number().optional(),
    active_threats: z.number().optional(),
    infected: z.boolean().optional(),
    is_active: z.boolean().optional(),
    network_status: z.enum([
      "connected",
      "disconnected",
      "disconnecting",
      "connecting",
    ]).optional(),
    operational_state: z.enum([
      "na",
      "partially_disabled",
      "auto_fully_disabled",
      "fully_disabled",
      "auto_partially_disabled",
      "disabled_error",
      "db_corruption",
    ]).optional(),
    score: z.number().optional(),
  }).optional(),
  match: z.array(z.object({
    platform: z.enum(["windows", "mac", "linux", "android", "ios", "chromeos"])
      .optional(),
  })).optional(),
  name: z.string().optional(),
  schedule: z.string().optional(),
  type: z.enum([
    "file",
    "application",
    "tanium",
    "gateway",
    "warp",
    "disk_encryption",
    "serial_number",
    "sentinelone",
    "carbonblack",
    "firewall",
    "os_version",
    "domain_joined",
    "client_certificate",
    "client_certificate_v2",
    "antivirus",
    "unique_client_id",
    "kolide",
    "tanium_s2s",
    "crowdstrike_s2s",
    "intune",
    "workspace_one",
    "sentinelone_s2s",
    "custom_s2s",
  ]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Posture. Registered at `@swamp/cloudflare/devices/posture`. */
export const model = {
  type: "@swamp/cloudflare/devices/posture",
  version: "2026.09.29.1",
  upgrades: [
    {
      toVersion: "2026.05.29.1",
      description: "Added: apiToken, apiKey, email",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.11.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Posture resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Posture",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["name", "type"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.expiration !== undefined) body.expiration = g.expiration;
        if (g.input !== undefined) body.input = g.input;
        if (g.match !== undefined) body.match = g.match;
        if (g.name !== undefined) body.name = g.name;
        if (g.schedule !== undefined) body.schedule = g.schedule;
        if (g.type !== undefined) body.type = g.type;
        const result = await create(endpoint, body, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Posture",
      arguments: z.object({ id: z.string().describe("The ID of the Posture") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName = (g.name?.toString() ?? args.id).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    lookup: {
      description:
        "Look up an existing Posture by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
        const filters: [string, string][] = [];
        if (g.description !== undefined) {
          filters.push(["description", String(g.description)]);
        }
        if (g.expiration !== undefined) {
          filters.push(["expiration", String(g.expiration)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.schedule !== undefined) {
          filters.push(["schedule", String(g.schedule)]);
        }
        if (g.type !== undefined) filters.push(["type", String(g.type)]);
        if (filters.length === 0) {
          throw new Error(
            "At least one global argument must be set to filter by",
          );
        }
        const items = await listAll(endpoint, "none", undefined, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const matches = items.filter((item) => {
          for (const [key, val] of filters) {
            if (String((item as Record<string, unknown>)[key]) !== val) {
              return false;
            }
          }
          return true;
        });
        if (matches.length === 0) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(`No posture found matching filters: ${filterDesc}`);
        }
        if (matches.length > 1) {
          const filterDesc = filters.map(([k, v]) =>
            `${k}=${JSON.stringify(v)}`
          ).join(", ");
          throw new Error(
            `Expected exactly 1 match, found ${matches.length} for filters: ${filterDesc}`,
          );
        }
        const result = matches[0] as ResourceData;
        const instanceName =
          (g.name?.toString() ?? result.id?.toString() ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    adopt: {
      description: "Import an existing Posture by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Posture to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
        const result = await read(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const instanceName =
          (result.name?.toString() ?? g.name?.toString() ?? args.id).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update Posture attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Posture by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.expiration !== undefined) body.expiration = g.expiration;
        if (g.input !== undefined) body.input = g.input;
        if (g.match !== undefined) body.match = g.match;
        if (g.name !== undefined) body.name = g.name;
        if (g.schedule !== undefined) body.schedule = g.schedule;
        if (g.type !== undefined) body.type = g.type;
        const unset = ["name", "type"].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
            apiKey: g.apiKey,
            email: g.email,
          });
          for (const k of unset) if (live[k] !== undefined) body[k] = live[k];
        }
        const missingForUpdate = ["name", "type"].filter((k) =>
          body[k] === undefined
        );
        if (missingForUpdate.length > 0) {
          throw new Error(
            "update requires global arguments: " + missingForUpdate.join(", "),
          );
        }
        const result = await update(endpoint, existing.id, body, "PUT", {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Posture",
      arguments: z.object({ id: z.string().describe("The ID of the Posture") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
        const { existed } = await remove(endpoint, args.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        });
        const instanceName = (context.globalArgs.name?.toString() ?? args.id)
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          id: args.id,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync Posture state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Posture by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/devices/posture";
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create, get, or list first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id, {
          apiToken: g.apiToken,
          apiKey: g.apiKey,
          email: g.email,
        }) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: existing.id,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
