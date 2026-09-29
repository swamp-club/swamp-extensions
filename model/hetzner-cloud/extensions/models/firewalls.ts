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

// Auto-generated extension model for @swamp/hetzner-cloud/firewalls
// Do not edit manually. Re-generate with: deno task generate:hetzner

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for a Hetzner Cloud firewall.
 *
 * Wraps the `/firewalls` API as a swamp model so create, get, update, delete, sync, list, lookup, adopt, apply_to_resources, remove_from_resources, set_rules
 * can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  create,
  listAll,
  postAction,
  read,
  remove,
  tryRead,
  update,
} from "./_lib/hetzner.ts";

const GlobalArgsSchema = z.object({
  name: z.string().min(1).max(128).describe(
    "Name of the [Firewall](#tag/firewalls).\n\nMust be unique per Project.\n",
  ).optional(),
  labels: z.record(z.string(), z.unknown()).describe(
    'User-defined labels (`key/value` pairs) for the Resource.\nFor more information, see "[Labels](#description/labels)".\n',
  ).optional(),
  rules: z.array(z.object({
    description: z.unknown().optional(),
    direction: z.enum(["in", "out"]),
    source_ips: z.array(z.string()).optional(),
    destination_ips: z.array(z.string()).optional(),
    protocol: z.enum(["tcp", "udp", "icmp", "esp", "gre"]),
    port: z.string().optional(),
  })).describe(
    "Array of rules.\n\nRules are limited to 50 entries per [Firewall](#tag/firewalls) and [500 effective rules](https://docs.hetzner.com/cloud/firewalls/overview#limits).\n",
  ).optional(),
  apply_to: z.array(z.object({
    type: z.enum(["server", "label_selector"]),
    server: z.object({
      id: z.number().int(),
    }).optional(),
    label_selector: z.object({
      selector: z.string(),
    }).optional(),
  })).describe(
    "Resources to apply the [Firewall](#tag/firewalls) to.\n\nResources added directly are taking precedence over those added via a [Label Selector](#description/label-selector).\n",
  ).optional(),
  token: z.string().meta({ sensitive: true }).describe(
    "Hetzner API token; overrides the HETZNER_API_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
});

const ResourceSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  created: z.string().optional(),
  rules: z.array(z.object({
    description: z.unknown().optional(),
    direction: z.string().optional(),
    source_ips: z.array(z.string()).optional(),
    destination_ips: z.array(z.string()).optional(),
    protocol: z.string().optional(),
    port: z.unknown().optional(),
  })).optional(),
  applied_to: z.array(z.object({
    type: z.string().optional(),
    server: z.object({
      id: z.number().optional(),
    }).optional(),
    label_selector: z.object({
      selector: z.string().optional(),
    }).optional(),
    applied_to_resources: z.array(z.object({
      type: z.string().optional(),
      server: z.object({
        id: z.number().optional(),
      }).optional(),
    })).optional(),
  })).optional(),
}).passthrough();

type ResourceData = z.infer<typeof ResourceSchema>;

const InputsSchema = z.object({
  name: z.string().min(1).max(128).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  rules: z.array(z.object({
    description: z.unknown().optional(),
    direction: z.enum(["in", "out"]),
    source_ips: z.array(z.string()).optional(),
    destination_ips: z.array(z.string()).optional(),
    protocol: z.enum(["tcp", "udp", "icmp", "esp", "gre"]),
    port: z.string().optional(),
  })).optional(),
  apply_to: z.array(z.object({
    type: z.enum(["server", "label_selector"]),
    server: z.object({
      id: z.number().int(),
    }).optional(),
    label_selector: z.object({
      selector: z.string(),
    }).optional(),
  })).optional(),
  token: z.string().meta({ sensitive: true }).optional(),
});

/** Swamp extension model for Hetzner Cloud firewall. Registered at `@swamp/hetzner-cloud/firewalls`. */
export const model = {
  type: "@swamp/hetzner-cloud/firewalls",
  version: "2026.09.29.2",
  upgrades: [
    {
      toVersion: "2026.04.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.03.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.22.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes (version bump for manifest republish)",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.4",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.28.1",
      description: "Added: token",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.03.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.10.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.29.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Firewall resource state",
      schema: ResourceSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a firewall",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["name"].filter((k) =>
          g[k] === undefined || g[k] === null || g[k] === ""
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const body: Record<string, unknown> = {};
        if (g.name !== undefined) body.name = g.name;
        if (g.labels !== undefined) body.labels = g.labels;
        if (g.rules !== undefined) body.rules = g.rules;
        if (g.apply_to !== undefined) body.apply_to = g.apply_to;
        const result = await create(
          "/firewalls",
          body,
          g.token,
        ) as ResourceData;
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
      description: "Get a firewall",
      arguments: z.object({
        id: z.number().int().describe("The ID of the firewall"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const result = await read(
          "/firewalls",
          args.id,
          context.globalArgs.token,
        ) as ResourceData;
        const instanceName = (result.name?.toString() ?? args.id.toString())
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update firewall attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        if (g.name === undefined || g.name === null || g.name === "") {
          throw new Error("update requires global argument: name");
        }
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
        if (g.name !== undefined) body.name = g.name;
        if (g.labels !== undefined) body.labels = g.labels;
        const result = await update(
          "/firewalls",
          existing.id,
          body,
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
      description: "Delete the firewall",
      arguments: z.object({
        id: z.number().int().describe("The ID of the firewall"),
      }),
      execute: async (args: { id: number }, context: any) => {
        const { existed } = await remove(
          "/firewalls",
          args.id,
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
      description: "Sync firewall state from Hetzner",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        if (g.name === undefined || g.name === null || g.name === "") {
          throw new Error("sync requires global argument: name");
        }
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
        const result = await tryRead("/firewalls", existing.id, g.token) as
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
    list: {
      description:
        "List firewalls, optionally filtered by a Hetzner label selector or name",
      arguments: z.object({
        label_selector: z.string().describe(
          "Hetzner label selector to filter results, e.g. env=production,role!=db",
        ).optional(),
        name: z.string().describe("Filter resources by their name.").optional(),
      }),
      execute: async (
        args: { label_selector?: string; name?: string },
        context: any,
      ) => {
        const g = context.globalArgs;
        const queryParams: Record<string, string> = {};
        if (args.label_selector !== undefined) {
          queryParams.label_selector = args.label_selector;
        }
        if (args.name !== undefined) queryParams.name = args.name;
        const items = await listAll(
          "/firewalls",
          queryParams,
          g.token,
        ) as ResourceData[];
        const dataHandles: any[] = [];
        for (const item of items) {
          const instanceName =
            (item.name?.toString() ?? item.id?.toString() ?? "unknown").replace(
              /[\/\\]/g,
              "_",
            ).replace(/\.\./g, "_").replace(/\0/g, "");
          const handle = await context.writeResource(
            "state",
            instanceName,
            item,
          );
          dataHandles.push(handle);
        }
        return { dataHandles, result: { count: items.length } };
      },
    },
    lookup: {
      description: "Find an existing firewall by name and import it into state",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const expectedName = g.name;
        if (!expectedName) {
          throw new Error("globalArgs.name is required for lookup");
        }
        const items = await listAll(
          "/firewalls",
          {},
          g.token,
        ) as ResourceData[];
        const matches = items.filter((item) => item.name === expectedName);
        if (matches.length === 0) {
          throw new Error(`No firewall found matching name=${expectedName}`);
        }
        if (matches.length > 1) {
          throw new Error(
            `Multiple firewalls found matching name=${expectedName} (found ${matches.length}). Use adopt with a specific ID instead.`,
          );
        }
        const result = matches[0];
        const instanceName = (result.name?.toString() ?? "current").replace(
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
      description: "Adopt an existing firewall by ID into managed state",
      arguments: z.object({
        id: z.number().int().describe("The ID of the firewall to adopt"),
        expected_name: z.string().describe(
          "Expected name for identity validation",
        ).optional(),
      }),
      execute: async (
        args: { id: number; expected_name?: string },
        context: any,
      ) => {
        const result = await read(
          "/firewalls",
          args.id,
          context.globalArgs.token,
        ) as ResourceData;
        if (
          args.expected_name !== undefined && result.name !== args.expected_name
        ) {
          throw new Error(
            `Identity mismatch: expected name=${args.expected_name} but got ${result.name}`,
          );
        }
        const instanceName = (result.name?.toString() ?? args.id.toString())
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    set_rules: {
      description: "Set firewall rules, replacing all existing rules",
      arguments: z.object({
        rules: z.array(z.object({
          direction: z.enum(["in", "out"]).describe("Traffic direction"),
          protocol: z.enum(["tcp", "udp", "icmp", "esp", "gre"]).describe(
            "Protocol",
          ),
          port: z.string().describe(
            'Port or port range (e.g. "443" or "1-65535")',
          ).optional(),
          source_ips: z.array(z.string()).describe(
            "Permitted source IPs in CIDR notation (for direction=in)",
          ).optional(),
          destination_ips: z.array(z.string()).describe(
            "Permitted destination IPs in CIDR notation (for direction=out)",
          ).optional(),
          description: z.string().describe("Description of the rule")
            .optional(),
        })).describe("Array of firewall rules"),
      }),
      execute: async (
        args: { rules: Record<string, unknown>[] },
        context: any,
      ) => {
        const g = context.globalArgs;
        if (g.name === undefined || g.name === null || g.name === "") {
          throw new Error("set_rules requires global argument: name");
        }
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
          throw new Error("No data found - run create, lookup, or adopt first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        await postAction("/firewalls", existing.id, "set_rules", {
          rules: args.rules,
        }, g.token);
        const result = await read(
          "/firewalls",
          existing.id,
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
    apply_to_resources: {
      description: "Apply the firewall to additional resources",
      arguments: z.object({
        apply_to: z.array(z.object({
          type: z.enum(["server", "label_selector"]).describe(
            "Type of the resource",
          ),
          server: z.object({ id: z.number().int() }).describe(
            "Server to apply to (for type=server)",
          ).optional(),
          label_selector: z.object({ selector: z.string() }).describe(
            "Label selector to apply to (for type=label_selector)",
          ).optional(),
        })).describe("Resources to apply the firewall to"),
      }),
      execute: async (
        args: { apply_to: Record<string, unknown>[] },
        context: any,
      ) => {
        const g = context.globalArgs;
        if (g.name === undefined || g.name === null || g.name === "") {
          throw new Error("apply_to_resources requires global argument: name");
        }
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
          throw new Error("No data found - run create, lookup, or adopt first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        await postAction("/firewalls", existing.id, "apply_to_resources", {
          apply_to: args.apply_to,
        }, g.token);
        const result = await read(
          "/firewalls",
          existing.id,
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
    remove_from_resources: {
      description: "Remove the firewall from resources",
      arguments: z.object({
        remove_from: z.array(z.object({
          type: z.enum(["server", "label_selector"]).describe(
            "Type of the resource",
          ),
          server: z.object({ id: z.number().int() }).describe(
            "Server to remove from (for type=server)",
          ).optional(),
          label_selector: z.object({ selector: z.string() }).describe(
            "Label selector to remove from (for type=label_selector)",
          ).optional(),
        })).describe("Resources to remove the firewall from"),
      }),
      execute: async (
        args: { remove_from: Record<string, unknown>[] },
        context: any,
      ) => {
        const g = context.globalArgs;
        if (g.name === undefined || g.name === null || g.name === "") {
          throw new Error(
            "remove_from_resources requires global argument: name",
          );
        }
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
          throw new Error("No data found - run create, lookup, or adopt first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        await postAction("/firewalls", existing.id, "remove_from_resources", {
          remove_from: args.remove_from,
        }, g.token);
        const result = await read(
          "/firewalls",
          existing.id,
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
  },
};
