// Auto-generated extension model for @swamp/cloudflare/gateway/rules
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Rules.
 *
 * Wraps the Cloudflare API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/cloudflare.ts";

const GlobalArgsSchema = z.object({
  account_id: z.string().describe("Cloudflare account ID"),
  description: z.string().describe("Specify the rule description.").optional(),
  enabled: z.boolean().describe("Specify whether the rule is enabled.")
    .optional(),
  name: z.string().describe("Specify the rule name."),
  precedence: z.number().int().describe(
    "Set the order of your rules. Lower values indicate higher precedence. At each processing phase, evaluate applicable rules in ascending order of this value. Refer to [Order of enforcement](http://developers.cloudflare.com/learning-paths/secure-internet-traffic/understand-policies/order-of-enforcement/#manage-precedence-with-terraform) to manage precedence via Terraform.",
  ).optional(),
  action: z.enum([
    "on",
    "off",
    "allow",
    "block",
    "scan",
    "noscan",
    "safesearch",
    "ytrestricted",
    "isolate",
    "noisolate",
    "override",
    "l4_override",
    "egress",
    "resolve",
    "quarantine",
    "redirect",
  ]).describe(
    "Specify the action to perform when the associated traffic, identity, and device posture expressions either absent or evaluate to `true`.",
  ),
  device_posture: z.string().describe(
    "Specify the wirefilter expression used for device posture check. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.",
  ).optional(),
  expiration: z.object({
    duration: z.number().int().min(5).optional(),
    expired: z.boolean().optional(),
    expires_at: z.string(),
  }).describe(
    "Defines the expiration time stamp and default duration of a DNS policy. Takes precedence over the policy's `schedule` configuration, if any. This  does not apply to HTTP or network policies. Settable only for `dns` rules.",
  ).optional(),
  filters: z.array(z.enum(["http", "dns", "l4", "egress", "dns_resolver"]))
    .describe(
      "Specify the protocol or layer to evaluate the traffic, identity, and device posture expressions. Can only contain a single value.",
    ).optional(),
  identity: z.string().describe(
    "Specify the wirefilter expression used for identity matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.",
  ).optional(),
  rule_settings: z.object({
    add_headers: z.record(z.string(), z.unknown()).optional(),
    allow_child_bypass: z.boolean().optional(),
    audit_ssh: z.object({
      command_logging: z.boolean().optional(),
    }).optional(),
    biso_admin_controls: z.object({
      copy: z.enum(["enabled", "disabled", "remote_only"]).optional(),
      dcp: z.boolean().optional(),
      dd: z.boolean().optional(),
      dk: z.boolean().optional(),
      download: z.enum(["enabled", "disabled", "remote_only"]).optional(),
      dp: z.boolean().optional(),
      du: z.boolean().optional(),
      keyboard: z.enum(["enabled", "disabled"]).optional(),
      paste: z.enum(["enabled", "disabled", "remote_only"]).optional(),
      printing: z.enum(["enabled", "disabled"]).optional(),
      upload: z.enum(["enabled", "disabled"]).optional(),
      version: z.enum(["v1", "v2"]).optional(),
      wm_id: z.string().min(1).max(36).optional(),
    }).optional(),
    block_page: z.object({
      include_context: z.boolean().optional(),
      target_uri: z.string(),
    }).optional(),
    block_page_enabled: z.boolean().optional(),
    block_reason: z.string().optional(),
    bypass_parent_rule: z.boolean().optional(),
    check_session: z.object({
      duration: z.string().optional(),
      enforce: z.boolean().optional(),
    }).optional(),
    dns_resolvers: z.object({
      ipv4: z.array(z.object({
        ip: z.string(),
        port: z.number().int().optional(),
        route_through_private_network: z.boolean().optional(),
        vnet_id: z.string().optional(),
      })).optional(),
      ipv6: z.array(z.object({
        ip: z.string(),
        port: z.number().int().optional(),
        route_through_private_network: z.boolean().optional(),
        vnet_id: z.string().optional(),
      })).optional(),
    }).optional(),
    egress: z.object({
      ipv4: z.string().optional(),
      ipv4_fallback: z.string().optional(),
      ipv6: z.string().optional(),
    }).optional(),
    forensic_copy: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    ignore_cname_category_matches: z.boolean().optional(),
    insecure_disable_dnssec_validation: z.boolean().optional(),
    ip_categories: z.boolean().optional(),
    ip_indicator_feeds: z.boolean().optional(),
    l4override: z.object({
      ip: z.string().optional(),
      port: z.number().int().optional(),
    }).optional(),
    notification_settings: z.object({
      enabled: z.boolean().optional(),
      include_context: z.boolean().optional(),
      msg: z.string().optional(),
      support_url: z.string().optional(),
    }).optional(),
    override_host: z.string().optional(),
    override_ips: z.array(z.string()).optional(),
    payload_log: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    quarantine: z.object({
      file_types: z.array(
        z.enum([
          "exe",
          "pdf",
          "doc",
          "docm",
          "docx",
          "rtf",
          "ppt",
          "pptx",
          "xls",
          "xlsm",
          "xlsx",
          "zip",
          "rar",
        ]),
      ).optional(),
    }).optional(),
    redirect: z.object({
      include_context: z.boolean().optional(),
      preserve_path_and_query: z.boolean().optional(),
      target_uri: z.string(),
    }).optional(),
    resolve_dns_internally: z.object({
      fallback: z.enum(["none", "public_dns"]).optional(),
      view_id: z.string().optional(),
    }).optional(),
    resolve_dns_through_cloudflare: z.boolean().optional(),
    untrusted_cert: z.object({
      action: z.enum(["pass_through", "block", "error"]).optional(),
    }).optional(),
  }).describe(
    "Defines settings for this rule. Settings apply only to specific rule types and must use compatible selectors. If Terraform detects drift, confirm the setting supports your rule type and check whether the API modifies the value. Use API-returned values in your configuration to prevent drift.",
  ).optional(),
  schedule: z.object({
    fri: z.string().optional(),
    mon: z.string().optional(),
    sat: z.string().optional(),
    sun: z.string().optional(),
    thu: z.string().optional(),
    time_zone: z.string().optional(),
    tue: z.string().optional(),
    wed: z.string().optional(),
  }).describe(
    "Defines the schedule for activating DNS policies. Settable only for `dns` and `dns_resolver` rules.",
  ).optional(),
  traffic: z.string().describe(
    "Specify the wirefilter expression used for traffic matching. The API automatically formats and sanitizes expressions before storing them. To prevent Terraform state drift, use the formatted expression returned in the API response.",
  ).optional(),
});

const ResourceSchema = z.object({
  action: z.string().optional(),
  created_at: z.string().optional(),
  deleted_at: z.string().optional(),
  description: z.string().optional(),
  device_posture: z.string().optional(),
  enabled: z.boolean().optional(),
  expiration: z.object({
    duration: z.number().optional(),
    expired: z.boolean().optional(),
    expires_at: z.string().optional(),
  }).optional(),
  filters: z.array(z.string()).optional(),
  id: z.string(),
  identity: z.string().optional(),
  name: z.string().optional(),
  precedence: z.number().optional(),
  read_only: z.boolean().optional(),
  rule_settings: z.object({
    add_headers: z.record(z.string(), z.unknown()).optional(),
    allow_child_bypass: z.boolean().optional(),
    audit_ssh: z.object({
      command_logging: z.boolean().optional(),
    }).optional(),
    biso_admin_controls: z.object({
      copy: z.string().optional(),
      dcp: z.boolean().optional(),
      dd: z.boolean().optional(),
      dk: z.boolean().optional(),
      download: z.string().optional(),
      dp: z.boolean().optional(),
      du: z.boolean().optional(),
      keyboard: z.string().optional(),
      paste: z.string().optional(),
      printing: z.string().optional(),
      upload: z.string().optional(),
      version: z.string().optional(),
      wm_id: z.string().optional(),
    }).optional(),
    block_page: z.object({
      include_context: z.boolean().optional(),
      target_uri: z.string().optional(),
    }).optional(),
    block_page_enabled: z.boolean().optional(),
    block_reason: z.string().optional(),
    bypass_parent_rule: z.boolean().optional(),
    check_session: z.object({
      duration: z.string().optional(),
      enforce: z.boolean().optional(),
    }).optional(),
    dns_resolvers: z.object({
      ipv4: z.array(z.object({
        ip: z.string().optional(),
        port: z.number().optional(),
        route_through_private_network: z.boolean().optional(),
        vnet_id: z.string().optional(),
      })).optional(),
      ipv6: z.array(z.object({
        ip: z.string().optional(),
        port: z.number().optional(),
        route_through_private_network: z.boolean().optional(),
        vnet_id: z.string().optional(),
      })).optional(),
    }).optional(),
    egress: z.object({
      ipv4: z.string().optional(),
      ipv4_fallback: z.string().optional(),
      ipv6: z.string().optional(),
    }).optional(),
    forensic_copy: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    ignore_cname_category_matches: z.boolean().optional(),
    insecure_disable_dnssec_validation: z.boolean().optional(),
    ip_categories: z.boolean().optional(),
    ip_indicator_feeds: z.boolean().optional(),
    l4override: z.object({
      ip: z.string().optional(),
      port: z.number().optional(),
    }).optional(),
    notification_settings: z.object({
      enabled: z.boolean().optional(),
      include_context: z.boolean().optional(),
      msg: z.string().optional(),
      support_url: z.string().optional(),
    }).optional(),
    override_host: z.string().optional(),
    override_ips: z.array(z.string()).optional(),
    payload_log: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    quarantine: z.object({
      file_types: z.array(z.string()).optional(),
    }).optional(),
    redirect: z.object({
      include_context: z.boolean().optional(),
      preserve_path_and_query: z.boolean().optional(),
      target_uri: z.string().optional(),
    }).optional(),
    resolve_dns_internally: z.object({
      fallback: z.string().optional(),
      view_id: z.string().optional(),
    }).optional(),
    resolve_dns_through_cloudflare: z.boolean().optional(),
    untrusted_cert: z.object({
      action: z.string().optional(),
    }).optional(),
  }).optional(),
  schedule: z.object({
    fri: z.string().optional(),
    mon: z.string().optional(),
    sat: z.string().optional(),
    sun: z.string().optional(),
    thu: z.string().optional(),
    time_zone: z.string().optional(),
    tue: z.string().optional(),
    wed: z.string().optional(),
  }).optional(),
  sharable: z.boolean().optional(),
  source_account: z.string().optional(),
  traffic: z.string().optional(),
  updated_at: z.string().optional(),
  version: z.number().optional(),
  warning_status: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  name: z.string().optional(),
  precedence: z.number().int().optional(),
  action: z.enum([
    "on",
    "off",
    "allow",
    "block",
    "scan",
    "noscan",
    "safesearch",
    "ytrestricted",
    "isolate",
    "noisolate",
    "override",
    "l4_override",
    "egress",
    "resolve",
    "quarantine",
    "redirect",
  ]).optional(),
  device_posture: z.string().optional(),
  expiration: z.object({
    duration: z.number().int().min(5).optional(),
    expired: z.boolean().optional(),
    expires_at: z.string(),
  }).optional(),
  filters: z.array(z.enum(["http", "dns", "l4", "egress", "dns_resolver"]))
    .optional(),
  identity: z.string().optional(),
  rule_settings: z.object({
    add_headers: z.record(z.string(), z.unknown()).optional(),
    allow_child_bypass: z.boolean().optional(),
    audit_ssh: z.object({
      command_logging: z.boolean().optional(),
    }).optional(),
    biso_admin_controls: z.object({
      copy: z.enum(["enabled", "disabled", "remote_only"]).optional(),
      dcp: z.boolean().optional(),
      dd: z.boolean().optional(),
      dk: z.boolean().optional(),
      download: z.enum(["enabled", "disabled", "remote_only"]).optional(),
      dp: z.boolean().optional(),
      du: z.boolean().optional(),
      keyboard: z.enum(["enabled", "disabled"]).optional(),
      paste: z.enum(["enabled", "disabled", "remote_only"]).optional(),
      printing: z.enum(["enabled", "disabled"]).optional(),
      upload: z.enum(["enabled", "disabled"]).optional(),
      version: z.enum(["v1", "v2"]).optional(),
      wm_id: z.string().min(1).max(36).optional(),
    }).optional(),
    block_page: z.object({
      include_context: z.boolean().optional(),
      target_uri: z.string(),
    }).optional(),
    block_page_enabled: z.boolean().optional(),
    block_reason: z.string().optional(),
    bypass_parent_rule: z.boolean().optional(),
    check_session: z.object({
      duration: z.string().optional(),
      enforce: z.boolean().optional(),
    }).optional(),
    dns_resolvers: z.object({
      ipv4: z.array(z.object({
        ip: z.string(),
        port: z.number().int().optional(),
        route_through_private_network: z.boolean().optional(),
        vnet_id: z.string().optional(),
      })).optional(),
      ipv6: z.array(z.object({
        ip: z.string(),
        port: z.number().int().optional(),
        route_through_private_network: z.boolean().optional(),
        vnet_id: z.string().optional(),
      })).optional(),
    }).optional(),
    egress: z.object({
      ipv4: z.string().optional(),
      ipv4_fallback: z.string().optional(),
      ipv6: z.string().optional(),
    }).optional(),
    forensic_copy: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    ignore_cname_category_matches: z.boolean().optional(),
    insecure_disable_dnssec_validation: z.boolean().optional(),
    ip_categories: z.boolean().optional(),
    ip_indicator_feeds: z.boolean().optional(),
    l4override: z.object({
      ip: z.string().optional(),
      port: z.number().int().optional(),
    }).optional(),
    notification_settings: z.object({
      enabled: z.boolean().optional(),
      include_context: z.boolean().optional(),
      msg: z.string().optional(),
      support_url: z.string().optional(),
    }).optional(),
    override_host: z.string().optional(),
    override_ips: z.array(z.string()).optional(),
    payload_log: z.object({
      enabled: z.boolean().optional(),
    }).optional(),
    quarantine: z.object({
      file_types: z.array(
        z.enum([
          "exe",
          "pdf",
          "doc",
          "docm",
          "docx",
          "rtf",
          "ppt",
          "pptx",
          "xls",
          "xlsm",
          "xlsx",
          "zip",
          "rar",
        ]),
      ).optional(),
    }).optional(),
    redirect: z.object({
      include_context: z.boolean().optional(),
      preserve_path_and_query: z.boolean().optional(),
      target_uri: z.string(),
    }).optional(),
    resolve_dns_internally: z.object({
      fallback: z.enum(["none", "public_dns"]).optional(),
      view_id: z.string().optional(),
    }).optional(),
    resolve_dns_through_cloudflare: z.boolean().optional(),
    untrusted_cert: z.object({
      action: z.enum(["pass_through", "block", "error"]).optional(),
    }).optional(),
  }).optional(),
  schedule: z.object({
    fri: z.string().optional(),
    mon: z.string().optional(),
    sat: z.string().optional(),
    sun: z.string().optional(),
    thu: z.string().optional(),
    time_zone: z.string().optional(),
    tue: z.string().optional(),
    wed: z.string().optional(),
  }).optional(),
  traffic: z.string().optional(),
});

/** Swamp extension model for Cloudflare Rules. Registered at `@swamp/cloudflare/gateway/rules`. */
export const model = {
  type: "@swamp/cloudflare/gateway/rules",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Rules resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Rules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/rules";
        const body: Record<string, unknown> = {};
        if (g.action !== undefined) body.action = g.action;
        if (g.description !== undefined) body.description = g.description;
        if (g.device_posture !== undefined) {
          body.device_posture = g.device_posture;
        }
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.expiration !== undefined) body.expiration = g.expiration;
        if (g.filters !== undefined) body.filters = g.filters;
        if (g.identity !== undefined) body.identity = g.identity;
        if (g.name !== undefined) body.name = g.name;
        if (g.precedence !== undefined) body.precedence = g.precedence;
        if (g.rule_settings !== undefined) body.rule_settings = g.rule_settings;
        if (g.schedule !== undefined) body.schedule = g.schedule;
        if (g.traffic !== undefined) body.traffic = g.traffic;
        const result = await create(endpoint, body) as ResourceData;
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
      description: "Get a Rules",
      arguments: z.object({ id: z.string().describe("The ID of the Rules") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/rules";
        const result = await read(endpoint, args.id) as ResourceData;
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
    update: {
      description: "Update Rules attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/rules";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) throw new Error("No data found - run create first");
        const existing = JSON.parse(new TextDecoder().decode(content));
        const body: Record<string, unknown> = {};
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.name !== undefined) body.name = g.name;
        if (g.precedence !== undefined) body.precedence = g.precedence;
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PATCH",
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the Rules",
      arguments: z.object({ id: z.string().describe("The ID of the Rules") }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/rules";
        const { existed } = await remove(endpoint, args.id);
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
      description: "Sync Rules state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/gateway/rules";
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No data found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        if (!existing.id) {
          throw new Error("Stored state has no id - cannot sync");
        }
        const result = await tryRead(endpoint, existing.id) as
          | ResourceData
          | null;
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
