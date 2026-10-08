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

// Auto-generated extension model for @swamp/digitalocean/insight-alert-rule
// Do not edit manually. Re-generate with: deno task generate:digitalocean

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a DigitalOcean insight alert rule.
 *
 * Wraps the `/v2/insights/alert-rules` API as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import { create, read, remove, tryRead, update } from "./_lib/digitalocean.ts";

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  spec: z.object({
    name: z.string(),
    query: z.object({
      metric: z.string(),
      filters: z.array(z.object({
        field: z.string(),
        operator: z.enum([
          "FILTER_OPERATOR_EQUAL",
          "FILTER_OPERATOR_NOT_EQUAL",
          "FILTER_OPERATOR_LESS_THAN",
          "FILTER_OPERATOR_LESS_THAN_OR_EQUAL",
          "FILTER_OPERATOR_GREATER_THAN",
          "FILTER_OPERATOR_GREATER_THAN_OR_EQUAL",
        ]),
        value: z.string(),
      })).optional(),
      resource_urns: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
    }),
    condition: z.object({
      window: z.enum([
        "EVALUATION_WINDOW_1M",
        "EVALUATION_WINDOW_5M",
        "EVALUATION_WINDOW_10M",
        "EVALUATION_WINDOW_15M",
        "EVALUATION_WINDOW_30M",
        "EVALUATION_WINDOW_1H",
      ]).optional(),
    }).optional(),
    thresholds: z.object({
      warning: z.number().optional(),
      critical: z.number().optional(),
      operator: z.enum([
        "THRESHOLD_OPERATOR_EQUAL",
        "THRESHOLD_OPERATOR_LESS_THAN_OR_EQUAL",
        "THRESHOLD_OPERATOR_LESS_THAN",
        "THRESHOLD_OPERATOR_GREATER_THAN",
        "THRESHOLD_OPERATOR_GREATER_THAN_OR_EQUAL",
        "THRESHOLD_OPERATOR_NOT_EQUAL",
      ]),
    }),
    notification_channels: z.array(z.object({
      notification_channel_id: z.string(),
      notify_on: z.array(z.enum(["SEVERITY_WARNING", "SEVERITY_CRITICAL"]))
        .optional(),
    })),
    re_alert_duration: z.enum([
      "RE_ALERT_DURATION_30M",
      "RE_ALERT_DURATION_1H",
      "RE_ALERT_DURATION_4H",
      "RE_ALERT_DURATION_NEVER",
    ]).optional(),
  }).describe(
    "Spec for an Insights alert rule. On create, `name`, `query`, `thresholds`,\nand at least one `notification_channels` binding are required. On update,\nomit `notification_channels` to keep existing bindings; an explicit empty\nlist is rejected.\n",
  ).optional(),
  status: z.enum(["ALERT_RULE_STATUS_ACTIVE", "ALERT_RULE_STATUS_PAUSED"])
    .describe(
      "Desired alert rule status. Allowed values:\n\n- `ALERT_RULE_STATUS_ACTIVE` = active\n- `ALERT_RULE_STATUS_PAUSED` = paused\n",
    ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "DigitalOcean API token; overrides the DO_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.string(),
  spec: z.object({
    name: z.string().optional(),
    query: z.object({
      metric: z.string().optional(),
      filters: z.array(z.object({
        field: z.string().optional(),
        operator: z.string().optional(),
        value: z.string().optional(),
      })).optional(),
      resource_urns: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
    }).optional(),
    condition: z.object({
      window: z.string().optional(),
    }).optional(),
    thresholds: z.object({
      warning: z.number().optional(),
      critical: z.number().optional(),
      operator: z.string().optional(),
    }).optional(),
    notification_channels: z.array(z.object({
      notification_channel_id: z.string().optional(),
      notify_on: z.array(z.string()).optional(),
    })).optional(),
    re_alert_duration: z.string().optional(),
  }).optional(),
  status: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  spec: z.object({
    name: z.string(),
    query: z.object({
      metric: z.string(),
      filters: z.array(z.object({
        field: z.string(),
        operator: z.enum([
          "FILTER_OPERATOR_EQUAL",
          "FILTER_OPERATOR_NOT_EQUAL",
          "FILTER_OPERATOR_LESS_THAN",
          "FILTER_OPERATOR_LESS_THAN_OR_EQUAL",
          "FILTER_OPERATOR_GREATER_THAN",
          "FILTER_OPERATOR_GREATER_THAN_OR_EQUAL",
        ]),
        value: z.string(),
      })).optional(),
      resource_urns: z.array(z.string()).optional(),
      tags: z.array(z.string()).optional(),
    }),
    condition: z.object({
      window: z.enum([
        "EVALUATION_WINDOW_1M",
        "EVALUATION_WINDOW_5M",
        "EVALUATION_WINDOW_10M",
        "EVALUATION_WINDOW_15M",
        "EVALUATION_WINDOW_30M",
        "EVALUATION_WINDOW_1H",
      ]).optional(),
    }).optional(),
    thresholds: z.object({
      warning: z.number().optional(),
      critical: z.number().optional(),
      operator: z.enum([
        "THRESHOLD_OPERATOR_EQUAL",
        "THRESHOLD_OPERATOR_LESS_THAN_OR_EQUAL",
        "THRESHOLD_OPERATOR_LESS_THAN",
        "THRESHOLD_OPERATOR_GREATER_THAN",
        "THRESHOLD_OPERATOR_GREATER_THAN_OR_EQUAL",
        "THRESHOLD_OPERATOR_NOT_EQUAL",
      ]),
    }),
    notification_channels: z.array(z.object({
      notification_channel_id: z.string(),
      notify_on: z.array(z.enum(["SEVERITY_WARNING", "SEVERITY_CRITICAL"]))
        .optional(),
    })),
    re_alert_duration: z.enum([
      "RE_ALERT_DURATION_30M",
      "RE_ALERT_DURATION_1H",
      "RE_ALERT_DURATION_4H",
      "RE_ALERT_DURATION_NEVER",
    ]).optional(),
  }).optional(),
  status: z.enum(["ALERT_RULE_STATUS_ACTIVE", "ALERT_RULE_STATUS_PAUSED"])
    .optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for DigitalOcean insight alert rule. Registered at `@swamp/digitalocean/insight-alert-rule`. */
export const model = {
  type: "@swamp/digitalocean/insight-alert-rule",
  version: "2026.10.08.1",
  upgrades: [
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Insight Alert Rule resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a insight alert rule",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["spec"].filter((k) => g[k] === undefined);
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const instanceName = (g.name?.toString() ?? "current").replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const body: Record<string, unknown> = {};
        if (g.spec !== undefined) body.spec = g.spec;
        if (g.status !== undefined) body.status = g.status;
        const result = await create(
          "/v2/insights/alert-rules",
          body,
          undefined,
          g.token,
        ) as ResourceData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a insight alert rule",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the insight alert rule",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const result = await read(
          "/v2/insights/alert-rules",
          args.id,
          undefined,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
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
      description: "Update insight alert rule attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const storedId = existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no id; run get with the resource ID first",
          );
        }
        const body: Record<string, unknown> = {};
        if (g.spec !== undefined) body.spec = g.spec;
        if (g.status !== undefined) body.status = g.status;
        const unset = ["spec", "status"].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          const live = await read(
            "/v2/insights/alert-rules",
            storedId,
            undefined,
            g.token,
          );
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const missingForUpdate = ["spec"].filter((k) => body[k] === undefined);
        if (missingForUpdate.length > 0) {
          throw new Error(
            "update requires global arguments: " + missingForUpdate.join(", "),
          );
        }
        const result = await update(
          "/v2/insights/alert-rules",
          storedId,
          body,
          "PUT",
          undefined,
          g.token,
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
      description: "Delete the insight alert rule",
      arguments: z.object({
        id: z.union([z.string(), z.number()]).describe(
          "The ID of the insight alert rule",
        ),
      }),
      execute: async (args: { id: string | number }, context: any) => {
        const { existed } = await remove(
          "/v2/insights/alert-rules",
          args.id,
          undefined,
          context.globalArgs.token,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.id.toString()).replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync insight alert rule state from DigitalOcean",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
        const storedId = existing.id;
        if (storedId === undefined || storedId === null) {
          throw new Error(
            "Stored state for " + instanceName +
              " has no id; run get with the resource ID first",
          );
        }
        const result = await tryRead(
          "/v2/insights/alert-rules",
          storedId,
          undefined,
          g.token,
        ) as ResourceData | null;
        if (result) {
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        }
        const handle = await context.writeResource("state", instanceName, {
          id: storedId,
          status: "not_found",
          syncedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
  },
};
