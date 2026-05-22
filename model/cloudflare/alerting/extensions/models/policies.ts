// Auto-generated extension model for @swamp/cloudflare/alerting/policies
// Do not edit manually. Re-generate with: deno task generate:cloudflare

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Cloudflare Policies.
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
  alert_interval: z.string().describe(
    "Optional specification of how often to re-alert from the same incident, not support on all alert types.",
  ).optional(),
  alert_type: z.enum([
    "abuse_report_alert",
    "access_custom_certificate_expiration_type",
    "advanced_ddos_attack_l4_alert",
    "advanced_ddos_attack_l7_alert",
    "advanced_http_alert_error",
    "bgp_hijack_notification",
    "billing_usage_alert",
    "block_notification_block_removed",
    "block_notification_new_block",
    "block_notification_review_rejected",
    "bot_traffic_basic_alert",
    "brand_protection_alert",
    "brand_protection_digest",
    "clickhouse_alert_fw_anomaly",
    "clickhouse_alert_fw_ent_anomaly",
    "cloudforce_one_request_notification",
    "cni_maintenance_notification",
    "custom_analytics",
    "custom_bot_detection_alert",
    "custom_ssl_certificate_event_type",
    "dedicated_ssl_certificate_event_type",
    "device_connectivity_anomaly_alert",
    "dos_attack_l4",
    "dos_attack_l7",
    "expiring_service_token_alert",
    "failing_logpush_job_disabled_alert",
    "fbm_auto_advertisement",
    "fbm_dosd_attack",
    "fbm_volumetric_attack",
    "health_check_status_notification",
    "hostname_aop_custom_certificate_expiration_type",
    "http_alert_edge_error",
    "http_alert_origin_error",
    "image_notification",
    "image_resizing_notification",
    "incident_alert",
    "load_balancing_health_alert",
    "load_balancing_pool_enablement_alert",
    "logo_match_alert",
    "magic_tunnel_health_check_event",
    "magic_wan_tunnel_health",
    "maintenance_event_notification",
    "mtls_certificate_store_certificate_expiration_type",
    "pages_event_alert",
    "radar_notification",
    "real_origin_monitoring",
    "scriptmonitor_alert_new_code_change_detections",
    "scriptmonitor_alert_new_hosts",
    "scriptmonitor_alert_new_malicious_hosts",
    "scriptmonitor_alert_new_malicious_scripts",
    "scriptmonitor_alert_new_malicious_url",
    "scriptmonitor_alert_new_max_length_resource_url",
    "scriptmonitor_alert_new_resources",
    "secondary_dns_all_primaries_failing",
    "secondary_dns_primaries_failing",
    "secondary_dns_warning",
    "secondary_dns_zone_successfully_updated",
    "secondary_dns_zone_validation_warning",
    "security_insights_alert",
    "sentinel_alert",
    "stream_live_notifications",
    "synthetic_test_latency_alert",
    "synthetic_test_low_availability_alert",
    "traffic_anomalies_alert",
    "tunnel_health_event",
    "tunnel_update_event",
    "universal_ssl_event_type",
    "web_analytics_metrics_update",
    "zone_aop_custom_certificate_expiration_type",
  ]).describe(
    "Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values.",
  ),
  description: z.string().describe(
    "Optional description for the Notification policy.",
  ).optional(),
  enabled: z.boolean().describe(
    "Whether or not the Notification policy is enabled.",
  ),
  filters: z.object({
    actions: z.array(z.string()).optional(),
    affected_asns: z.array(z.string()).optional(),
    affected_components: z.array(z.string()).optional(),
    affected_locations: z.array(z.string()).optional(),
    airport_code: z.array(z.string()).optional(),
    alert_trigger_preferences: z.array(z.string()).optional(),
    alert_trigger_preferences_value: z.array(z.string()).optional(),
    enabled: z.array(z.string()).optional(),
    environment: z.array(z.string()).optional(),
    event: z.array(z.string()).optional(),
    event_source: z.array(z.string()).optional(),
    event_type: z.array(z.string()).optional(),
    group_by: z.array(z.string()).optional(),
    health_check_id: z.array(z.string()).optional(),
    incident_impact: z.array(
      z.enum([
        "INCIDENT_IMPACT_NONE",
        "INCIDENT_IMPACT_MINOR",
        "INCIDENT_IMPACT_MAJOR",
        "INCIDENT_IMPACT_CRITICAL",
      ]),
    ).optional(),
    input_id: z.array(z.string()).optional(),
    insight_class: z.array(z.string()).optional(),
    limit: z.array(z.string()).optional(),
    logo_tag: z.array(z.string()).optional(),
    megabits_per_second: z.array(z.string()).optional(),
    new_health: z.array(z.string()).optional(),
    new_status: z.array(z.string()).optional(),
    packets_per_second: z.array(z.string()).optional(),
    pool_id: z.array(z.string()).optional(),
    pop_names: z.array(z.string()).optional(),
    product: z.array(z.string()).optional(),
    project_id: z.array(z.string()).optional(),
    protocol: z.array(z.string()).optional(),
    query_tag: z.array(z.string()).optional(),
    requests_per_second: z.array(z.string()).optional(),
    selectors: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    slo: z.array(z.string()).optional(),
    status: z.array(z.string()).optional(),
    target_hostname: z.array(z.string()).optional(),
    target_ip: z.array(z.string()).optional(),
    target_zone_name: z.array(z.string()).optional(),
    traffic_exclusions: z.array(z.enum(["security_events"])).optional(),
    tunnel_id: z.array(z.string()).optional(),
    tunnel_name: z.array(z.string()).optional(),
    type: z.array(z.string()).optional(),
    where: z.array(z.string()).optional(),
    zones: z.array(z.string()).optional(),
  }).describe(
    "Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.",
  ).optional(),
  mechanisms: z.object({
    email: z.array(z.object({
      id: z.string().optional(),
    })).optional(),
    pagerduty: z.array(z.object({
      id: z.string().max(32).optional(),
    })).optional(),
    webhooks: z.array(z.object({
      id: z.string().max(32).optional(),
    })).optional(),
  }).describe(
    "List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.",
  ),
  name: z.string().describe("Name of the policy."),
});

const ResourceSchema = z.object({
  alert_interval: z.string().optional(),
  alert_type: z.string().optional(),
  created: z.string().optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  filters: z.object({
    actions: z.array(z.string()).optional(),
    affected_asns: z.array(z.string()).optional(),
    affected_components: z.array(z.string()).optional(),
    affected_locations: z.array(z.string()).optional(),
    airport_code: z.array(z.string()).optional(),
    alert_trigger_preferences: z.array(z.string()).optional(),
    alert_trigger_preferences_value: z.array(z.string()).optional(),
    enabled: z.array(z.string()).optional(),
    environment: z.array(z.string()).optional(),
    event: z.array(z.string()).optional(),
    event_source: z.array(z.string()).optional(),
    event_type: z.array(z.string()).optional(),
    group_by: z.array(z.string()).optional(),
    health_check_id: z.array(z.string()).optional(),
    incident_impact: z.array(z.string()).optional(),
    input_id: z.array(z.string()).optional(),
    insight_class: z.array(z.string()).optional(),
    limit: z.array(z.string()).optional(),
    logo_tag: z.array(z.string()).optional(),
    megabits_per_second: z.array(z.string()).optional(),
    new_health: z.array(z.string()).optional(),
    new_status: z.array(z.string()).optional(),
    packets_per_second: z.array(z.string()).optional(),
    pool_id: z.array(z.string()).optional(),
    pop_names: z.array(z.string()).optional(),
    product: z.array(z.string()).optional(),
    project_id: z.array(z.string()).optional(),
    protocol: z.array(z.string()).optional(),
    query_tag: z.array(z.string()).optional(),
    requests_per_second: z.array(z.string()).optional(),
    selectors: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    slo: z.array(z.string()).optional(),
    status: z.array(z.string()).optional(),
    target_hostname: z.array(z.string()).optional(),
    target_ip: z.array(z.string()).optional(),
    target_zone_name: z.array(z.string()).optional(),
    traffic_exclusions: z.array(z.string()).optional(),
    tunnel_id: z.array(z.string()).optional(),
    tunnel_name: z.array(z.string()).optional(),
    type: z.array(z.string()).optional(),
    where: z.array(z.string()).optional(),
    zones: z.array(z.string()).optional(),
  }).optional(),
  id: z.string(),
  mechanisms: z.object({
    email: z.array(z.object({
      id: z.string().optional(),
    })).optional(),
    pagerduty: z.array(z.object({
      id: z.string().optional(),
    })).optional(),
    webhooks: z.array(z.object({
      id: z.string().optional(),
    })).optional(),
  }).optional(),
  modified: z.string().optional(),
  name: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  account_id: z.string().optional(),
  alert_interval: z.string().optional(),
  alert_type: z.enum([
    "abuse_report_alert",
    "access_custom_certificate_expiration_type",
    "advanced_ddos_attack_l4_alert",
    "advanced_ddos_attack_l7_alert",
    "advanced_http_alert_error",
    "bgp_hijack_notification",
    "billing_usage_alert",
    "block_notification_block_removed",
    "block_notification_new_block",
    "block_notification_review_rejected",
    "bot_traffic_basic_alert",
    "brand_protection_alert",
    "brand_protection_digest",
    "clickhouse_alert_fw_anomaly",
    "clickhouse_alert_fw_ent_anomaly",
    "cloudforce_one_request_notification",
    "cni_maintenance_notification",
    "custom_analytics",
    "custom_bot_detection_alert",
    "custom_ssl_certificate_event_type",
    "dedicated_ssl_certificate_event_type",
    "device_connectivity_anomaly_alert",
    "dos_attack_l4",
    "dos_attack_l7",
    "expiring_service_token_alert",
    "failing_logpush_job_disabled_alert",
    "fbm_auto_advertisement",
    "fbm_dosd_attack",
    "fbm_volumetric_attack",
    "health_check_status_notification",
    "hostname_aop_custom_certificate_expiration_type",
    "http_alert_edge_error",
    "http_alert_origin_error",
    "image_notification",
    "image_resizing_notification",
    "incident_alert",
    "load_balancing_health_alert",
    "load_balancing_pool_enablement_alert",
    "logo_match_alert",
    "magic_tunnel_health_check_event",
    "magic_wan_tunnel_health",
    "maintenance_event_notification",
    "mtls_certificate_store_certificate_expiration_type",
    "pages_event_alert",
    "radar_notification",
    "real_origin_monitoring",
    "scriptmonitor_alert_new_code_change_detections",
    "scriptmonitor_alert_new_hosts",
    "scriptmonitor_alert_new_malicious_hosts",
    "scriptmonitor_alert_new_malicious_scripts",
    "scriptmonitor_alert_new_malicious_url",
    "scriptmonitor_alert_new_max_length_resource_url",
    "scriptmonitor_alert_new_resources",
    "secondary_dns_all_primaries_failing",
    "secondary_dns_primaries_failing",
    "secondary_dns_warning",
    "secondary_dns_zone_successfully_updated",
    "secondary_dns_zone_validation_warning",
    "security_insights_alert",
    "sentinel_alert",
    "stream_live_notifications",
    "synthetic_test_latency_alert",
    "synthetic_test_low_availability_alert",
    "traffic_anomalies_alert",
    "tunnel_health_event",
    "tunnel_update_event",
    "universal_ssl_event_type",
    "web_analytics_metrics_update",
    "zone_aop_custom_certificate_expiration_type",
  ]).optional(),
  description: z.string().optional(),
  enabled: z.boolean().optional(),
  filters: z.object({
    actions: z.array(z.string()).optional(),
    affected_asns: z.array(z.string()).optional(),
    affected_components: z.array(z.string()).optional(),
    affected_locations: z.array(z.string()).optional(),
    airport_code: z.array(z.string()).optional(),
    alert_trigger_preferences: z.array(z.string()).optional(),
    alert_trigger_preferences_value: z.array(z.string()).optional(),
    enabled: z.array(z.string()).optional(),
    environment: z.array(z.string()).optional(),
    event: z.array(z.string()).optional(),
    event_source: z.array(z.string()).optional(),
    event_type: z.array(z.string()).optional(),
    group_by: z.array(z.string()).optional(),
    health_check_id: z.array(z.string()).optional(),
    incident_impact: z.array(
      z.enum([
        "INCIDENT_IMPACT_NONE",
        "INCIDENT_IMPACT_MINOR",
        "INCIDENT_IMPACT_MAJOR",
        "INCIDENT_IMPACT_CRITICAL",
      ]),
    ).optional(),
    input_id: z.array(z.string()).optional(),
    insight_class: z.array(z.string()).optional(),
    limit: z.array(z.string()).optional(),
    logo_tag: z.array(z.string()).optional(),
    megabits_per_second: z.array(z.string()).optional(),
    new_health: z.array(z.string()).optional(),
    new_status: z.array(z.string()).optional(),
    packets_per_second: z.array(z.string()).optional(),
    pool_id: z.array(z.string()).optional(),
    pop_names: z.array(z.string()).optional(),
    product: z.array(z.string()).optional(),
    project_id: z.array(z.string()).optional(),
    protocol: z.array(z.string()).optional(),
    query_tag: z.array(z.string()).optional(),
    requests_per_second: z.array(z.string()).optional(),
    selectors: z.array(z.string()).optional(),
    services: z.array(z.string()).optional(),
    slo: z.array(z.string()).optional(),
    status: z.array(z.string()).optional(),
    target_hostname: z.array(z.string()).optional(),
    target_ip: z.array(z.string()).optional(),
    target_zone_name: z.array(z.string()).optional(),
    traffic_exclusions: z.array(z.enum(["security_events"])).optional(),
    tunnel_id: z.array(z.string()).optional(),
    tunnel_name: z.array(z.string()).optional(),
    type: z.array(z.string()).optional(),
    where: z.array(z.string()).optional(),
    zones: z.array(z.string()).optional(),
  }).optional(),
  mechanisms: z.object({
    email: z.array(z.object({
      id: z.string().optional(),
    })).optional(),
    pagerduty: z.array(z.object({
      id: z.string().max(32).optional(),
    })).optional(),
    webhooks: z.array(z.object({
      id: z.string().max(32).optional(),
    })).optional(),
  }).optional(),
  name: z.string().optional(),
});

/** Swamp extension model for Cloudflare Policies. Registered at `@swamp/cloudflare/alerting/policies`. */
export const model = {
  type: "@swamp/cloudflare/alerting/policies",
  version: "2026.05.22.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Policies resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Policies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/alerting/v3/policies";
        const body: Record<string, unknown> = {};
        if (g.alert_interval !== undefined) {
          body.alert_interval = g.alert_interval;
        }
        if (g.alert_type !== undefined) body.alert_type = g.alert_type;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.filters !== undefined) body.filters = g.filters;
        if (g.mechanisms !== undefined) body.mechanisms = g.mechanisms;
        if (g.name !== undefined) body.name = g.name;
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
      description: "Get a Policies",
      arguments: z.object({
        id: z.string().describe("The ID of the Policies"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/alerting/v3/policies";
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
      description: "Update Policies attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/alerting/v3/policies";
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
        if (g.alert_interval !== undefined) {
          body.alert_interval = g.alert_interval;
        }
        if (g.alert_type !== undefined) body.alert_type = g.alert_type;
        if (g.description !== undefined) body.description = g.description;
        if (g.enabled !== undefined) body.enabled = g.enabled;
        if (g.filters !== undefined) body.filters = g.filters;
        if (g.mechanisms !== undefined) body.mechanisms = g.mechanisms;
        if (g.name !== undefined) body.name = g.name;
        const result = await update(
          endpoint,
          existing.id,
          body,
          "PUT",
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
      description: "Delete the Policies",
      arguments: z.object({
        id: z.string().describe("The ID of the Policies"),
      }),
      execute: async (args: { id: string }, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/alerting/v3/policies";
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
      description: "Sync Policies state from Cloudflare",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const endpoint = "/accounts/" + g.account_id + "/alerting/v3/policies";
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
