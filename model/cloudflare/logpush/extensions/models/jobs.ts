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

// Auto-generated extension model for @swamp/cloudflare/logpush/jobs
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Jobs.
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
  account_id: z.string().optional().describe(
    "Cloudflare account ID (provide account_id or zone_id)",
  ),
  zone_id: z.string().optional().describe(
    "Cloudflare zone ID (provide account_id or zone_id)",
  ),
  destination_conf: z.string().max(4096).describe(
    "Uniquely identifies a resource (such as an s3 bucket) where data. will be pushed. Additional configuration parameters supported by the destination may be included.",
  ).optional(),
  enabled: z.boolean().describe("Flag that indicates if the job is enabled.")
    .optional(),
  filter: z.string().describe(
    "The filters to select the events to include and/or remove from your logs. For more information, refer to [Filters](https://developers.cloudflare.com/logs/reference/filters/).",
  ).optional(),
  filter_attack_traffic: z.boolean().describe(
    "When true, excludes DDoS attack traffic from logs. This option is supported for the `http_requests`, `firewall_events`, and `network_analytics_logs` datasets.",
  ).optional(),
  frequency: z.enum(["high", "low"]).describe(
    "This field is deprecated. Please use `max_upload_*` parameters instead. . The frequency at which Cloudflare sends batches of logs to your destination. Setting frequency to high sends your logs in larger quantities of smaller files. Setting frequency to low sends logs in smaller quantities of larger files.",
  ).optional(),
  kind: z.enum(["", "edge"]).describe(
    "The kind parameter (optional) is used to differentiate between Logpush and Edge Log Delivery jobs (when supported by the dataset).",
  ).optional(),
  logpull_options: z.string().max(4096).describe(
    "This field is deprecated. Use `output_options` instead. Configuration string. It specifies things like requested fields and timestamp formats. If migrating from the logpull api, copy the url (full url or just the query string) of your call here, and logpush will keep on making this call for you, setting start and end times appropriately.",
  ).optional(),
  max_upload_bytes: z.union([z.literal(0)]).optional(),
  max_upload_interval_seconds: z.union([z.literal(0)]).optional(),
  max_upload_records: z.union([z.literal(0)]).optional(),
  name: z.string().max(512).regex(new RegExp("^[a-zA-Z0-9\\._-]*$")).describe(
    "Optional human readable job name. Not unique. Cloudflare suggests. that you set this to a meaningful string, like the domain name, to make it easier to identify your job.",
  ).optional(),
  output_options: z.object({
    "CVE-2021-44228": z.boolean().optional(),
    batch_prefix: z.string().optional(),
    batch_suffix: z.string().optional(),
    field_delimiter: z.string().optional(),
    field_names: z.array(z.string()).optional(),
    merge_subrequests: z.boolean().optional(),
    output_type: z.enum(["ndjson", "csv"]).optional(),
    record_delimiter: z.string().optional(),
    record_prefix: z.string().optional(),
    record_suffix: z.string().optional(),
    record_template: z.string().optional(),
    sample_rate: z.number().min(0).max(1).optional(),
    timestamp_format: z.enum([
      "unixnano",
      "unix",
      "rfc3339",
      "rfc3339ms",
      "rfc3339ns",
    ]).optional(),
  }).describe(
    "The structured replacement for `logpull_options`. When including this field, the `logpull_option` field will be ignored.",
  ).optional(),
  ownership_challenge: z.string().max(4096).regex(
    new RegExp("^[a-zA-Z0-9/\\+\\._-]*$"),
  ).describe("Ownership challenge token to prove destination ownership.")
    .optional(),
  dataset: z.enum([
    "access_requests",
    "account_abuse_protection_events",
    "audit_logs",
    "audit_logs_v2",
    "biso_user_actions",
    "casb_findings",
    "device_posture_results",
    "dex_application_tests",
    "dex_device_state_events",
    "dlp_forensic_copies",
    "dns_firewall_logs",
    "dns_logs",
    "email_security_alerts",
    "email_security_post_delivery_events",
    "firewall_events",
    "gateway_dns",
    "gateway_http",
    "gateway_network",
    "http_requests",
    "ipsec_logs",
    "magic_bgp_logs",
    "magic_ids_detections",
    "mcp_portal_logs",
    "mnm_flow_logs",
    "nel_reports",
    "network_analytics_logs",
    "page_shield_events",
    "sinkhole_http_logs",
    "spectrum_events",
    "ssh_logs",
    "turnstile_events",
    "warp_config_changes",
    "warp_toggle_changes",
    "websocket_analytics",
    "workers_trace_events",
    "zaraz_events",
    "zero_trust_network_sessions",
  ]).describe(
    "Name of the dataset. A list of supported datasets can be found on the [Developer Docs](https://developers.cloudflare.com/logs/reference/log-fields/).",
  ).optional(),
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
  dataset: z.string().optional(),
  destination_conf: z.string().optional(),
  enabled: z.boolean().optional(),
  error_message: z.string().optional(),
  filter_attack_traffic: z.boolean().optional(),
  frequency: z.string().optional(),
  id: z.number(),
  kind: z.string().optional(),
  last_complete: z.string().optional(),
  last_error: z.string().optional(),
  logpull_options: z.string().optional(),
  max_upload_bytes: z.number().optional(),
  max_upload_interval_seconds: z.number().optional(),
  max_upload_records: z.number().optional(),
  name: z.string().optional(),
  output_options: z.object({
    "CVE-2021-44228": z.boolean().optional(),
    batch_prefix: z.string().optional(),
    batch_suffix: z.string().optional(),
    field_delimiter: z.string().optional(),
    field_names: z.array(z.string()).optional(),
    merge_subrequests: z.boolean().optional(),
    output_type: z.string().optional(),
    record_delimiter: z.string().optional(),
    record_prefix: z.string().optional(),
    record_suffix: z.string().optional(),
    record_template: z.string().optional(),
    sample_rate: z.number().optional(),
    timestamp_format: z.string().optional(),
  }).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  zone_id: z.string().optional(),
  destination_conf: z.string().max(4096).optional(),
  enabled: z.boolean().optional(),
  filter: z.string().optional(),
  filter_attack_traffic: z.boolean().optional(),
  frequency: z.enum(["high", "low"]).optional(),
  kind: z.enum(["", "edge"]).optional(),
  logpull_options: z.string().max(4096).optional(),
  max_upload_bytes: z.union([z.literal(0)]).optional(),
  max_upload_interval_seconds: z.union([z.literal(0)]).optional(),
  max_upload_records: z.union([z.literal(0)]).optional(),
  name: z.string().max(512).regex(new RegExp("^[a-zA-Z0-9\\._-]*$")).optional(),
  output_options: z.object({
    "CVE-2021-44228": z.boolean().optional(),
    batch_prefix: z.string().optional(),
    batch_suffix: z.string().optional(),
    field_delimiter: z.string().optional(),
    field_names: z.array(z.string()).optional(),
    merge_subrequests: z.boolean().optional(),
    output_type: z.enum(["ndjson", "csv"]).optional(),
    record_delimiter: z.string().optional(),
    record_prefix: z.string().optional(),
    record_suffix: z.string().optional(),
    record_template: z.string().optional(),
    sample_rate: z.number().min(0).max(1).optional(),
    timestamp_format: z.enum([
      "unixnano",
      "unix",
      "rfc3339",
      "rfc3339ms",
      "rfc3339ns",
    ]).optional(),
  }).optional(),
  ownership_challenge: z.string().max(4096).regex(
    new RegExp("^[a-zA-Z0-9/\\+\\._-]*$"),
  ).optional(),
  dataset: z.enum([
    "access_requests",
    "account_abuse_protection_events",
    "audit_logs",
    "audit_logs_v2",
    "biso_user_actions",
    "casb_findings",
    "device_posture_results",
    "dex_application_tests",
    "dex_device_state_events",
    "dlp_forensic_copies",
    "dns_firewall_logs",
    "dns_logs",
    "email_security_alerts",
    "email_security_post_delivery_events",
    "firewall_events",
    "gateway_dns",
    "gateway_http",
    "gateway_network",
    "http_requests",
    "ipsec_logs",
    "magic_bgp_logs",
    "magic_ids_detections",
    "mcp_portal_logs",
    "mnm_flow_logs",
    "nel_reports",
    "network_analytics_logs",
    "page_shield_events",
    "sinkhole_http_logs",
    "spectrum_events",
    "ssh_logs",
    "turnstile_events",
    "warp_config_changes",
    "warp_toggle_changes",
    "websocket_analytics",
    "workers_trace_events",
    "zaraz_events",
    "zero_trust_network_sessions",
  ]).optional(),
  apiToken: z.string().meta({ sensitive: true }).optional(),
  apiKey: z.string().meta({ sensitive: true }).optional(),
  email: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Cloudflare Jobs. Registered at `@swamp/cloudflare/logpush/jobs`. */
export const model = {
  type: "@swamp/cloudflare/logpush/jobs",
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
      toVersion: "2026.06.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.24.1",
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
      toVersion: "2026.07.24.1",
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
      toVersion: "2026.08.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.09.1",
      description: "Added: filter_attack_traffic",
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
      description: "Jobs resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Jobs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["destination_conf"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/logpush/jobs";
        const body: Record<string, unknown> = {};
        if (g.dataset !== undefined) body.dataset = g.dataset;
        if (g.destination_conf !== undefined) {
          body.destination_conf = g.destination_conf;
        }
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.filter !== undefined) body.filter = g.filter;
        if (g.filter_attack_traffic !== undefined) {
          body.filter_attack_traffic = g.filter_attack_traffic;
        }
        if (g.frequency !== undefined) body.frequency = g.frequency;
        if (g.kind !== undefined) body.kind = g.kind;
        if (g.logpull_options !== undefined) {
          body.logpull_options = g.logpull_options;
        }
        if (g.max_upload_bytes !== undefined) {
          body.max_upload_bytes = g.max_upload_bytes;
        }
        if (g.max_upload_interval_seconds !== undefined) {
          body.max_upload_interval_seconds = g.max_upload_interval_seconds;
        }
        if (g.max_upload_records !== undefined) {
          body.max_upload_records = g.max_upload_records;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.output_options !== undefined) {
          body.output_options = g.output_options;
        }
        if (g.ownership_challenge !== undefined) {
          body.ownership_challenge = g.ownership_challenge;
        }
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
      description: "Get a Jobs",
      arguments: z.object({ id: z.string().describe("The ID of the Jobs") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/logpush/jobs";
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
        "Look up an existing Jobs by matching global argument values and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/logpush/jobs";
        const filters: [string, string][] = [];
        if (g.destination_conf !== undefined) {
          filters.push(["destination_conf", String(g.destination_conf)]);
        }
        if (g.enabled !== undefined) {
          filters.push(["enabled", String(g.enabled)]);
        }
        if (g.filter !== undefined) filters.push(["filter", String(g.filter)]);
        if (g.filter_attack_traffic !== undefined) {
          filters.push([
            "filter_attack_traffic",
            String(g.filter_attack_traffic),
          ]);
        }
        if (g.frequency !== undefined) {
          filters.push(["frequency", String(g.frequency)]);
        }
        if (g.kind !== undefined) filters.push(["kind", String(g.kind)]);
        if (g.logpull_options !== undefined) {
          filters.push(["logpull_options", String(g.logpull_options)]);
        }
        if (g.max_upload_bytes !== undefined) {
          filters.push(["max_upload_bytes", String(g.max_upload_bytes)]);
        }
        if (g.max_upload_interval_seconds !== undefined) {
          filters.push([
            "max_upload_interval_seconds",
            String(g.max_upload_interval_seconds),
          ]);
        }
        if (g.max_upload_records !== undefined) {
          filters.push(["max_upload_records", String(g.max_upload_records)]);
        }
        if (g.name !== undefined) filters.push(["name", String(g.name)]);
        if (g.ownership_challenge !== undefined) {
          filters.push(["ownership_challenge", String(g.ownership_challenge)]);
        }
        if (g.dataset !== undefined) {
          filters.push(["dataset", String(g.dataset)]);
        }
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
          throw new Error(`No jobs found matching filters: ${filterDesc}`);
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
      description: "Import an existing Jobs by ID into state for management",
      arguments: z.object({
        id: z.string().describe("The ID of the Jobs to import"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/logpush/jobs";
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
      description: "Update Jobs attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Jobs by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/logpush/jobs";
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
        if (g.destination_conf !== undefined) {
          body.destination_conf = g.destination_conf;
        }
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.filter !== undefined) body.filter = g.filter;
        if (g.filter_attack_traffic !== undefined) {
          body.filter_attack_traffic = g.filter_attack_traffic;
        }
        if (g.frequency !== undefined) body.frequency = g.frequency;
        if (g.kind !== undefined) body.kind = g.kind;
        if (g.logpull_options !== undefined) {
          body.logpull_options = g.logpull_options;
        }
        if (g.max_upload_bytes !== undefined) {
          body.max_upload_bytes = g.max_upload_bytes;
        }
        if (g.max_upload_interval_seconds !== undefined) {
          body.max_upload_interval_seconds = g.max_upload_interval_seconds;
        }
        if (g.max_upload_records !== undefined) {
          body.max_upload_records = g.max_upload_records;
        }
        if (g.name !== undefined) body.name = g.name;
        if (g.output_options !== undefined) {
          body.output_options = g.output_options;
        }
        if (g.ownership_challenge !== undefined) {
          body.ownership_challenge = g.ownership_challenge;
        }
        const unset = ["destination_conf"].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(endpoint, existing.id, {
            apiToken: g.apiToken,
            apiKey: g.apiKey,
            email: g.email,
          });
          for (const k of unset) if (live[k] !== undefined) body[k] = live[k];
        }
        const missingForUpdate = ["destination_conf"].filter((k) =>
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
      description: "Delete the Jobs",
      arguments: z.object({ id: z.string().describe("The ID of the Jobs") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/logpush/jobs";
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
      description: "Sync Jobs state from Cloudflare",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific Jobs by id (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        if ((g.account_id == null) === (g.zone_id == null)) {
          throw new Error(
            "Exactly one of account_id or zone_id must be provided",
          );
        }
        const scopePrefix = g.account_id
          ? "/accounts/" + g.account_id
          : "/zones/" + g.zone_id;
        const endpoint = scopePrefix + "/logpush/jobs";
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
