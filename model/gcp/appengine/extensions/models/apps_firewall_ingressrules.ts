// Auto-generated extension model for @swamp/gcp/appengine/apps-firewall-ingressrules
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Engine Admin Apps.Firewall.IngressRules.
 *
 * A single firewall rule that is evaluated against incoming traffic and provides an action to take on matched requests. A positive integer between 1, Int32.MaxValue-1 that defines the order of rule evaluation. Rules with the lowest priority are evaluated first.A default rule at priority Int32.MaxValue matches all IPv4 and IPv6 traffic when no previous rule matches. Only the action of this rule can be modified by the user.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://appengine.googleapis.com/";

const GET_CONFIG = {
  "id": "appengine.apps.firewall.ingressRules.get",
  "path": "v1/apps/{appsId}/firewall/ingressRules/{ingressRulesId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "appsId",
    "ingressRulesId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "ingressRulesId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "appengine.apps.firewall.ingressRules.create",
  "path": "v1/apps/{appsId}/firewall/ingressRules",
  "httpMethod": "POST",
  "parameterOrder": [
    "appsId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "appengine.apps.firewall.ingressRules.patch",
  "path": "v1/apps/{appsId}/firewall/ingressRules/{ingressRulesId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "appsId",
    "ingressRulesId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "ingressRulesId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "appengine.apps.firewall.ingressRules.delete",
  "path": "v1/apps/{appsId}/firewall/ingressRules/{ingressRulesId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "appsId",
    "ingressRulesId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "ingressRulesId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "appengine.apps.firewall.ingressRules.list",
  "path": "v1/apps/{appsId}/firewall/ingressRules",
  "httpMethod": "GET",
  "parameterOrder": [
    "appsId",
  ],
  "parameters": {
    "appsId": {
      "location": "path",
      "required": true,
    },
    "matchingAddress": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  action: z.enum(["UNSPECIFIED_ACTION", "ALLOW", "DENY"]).describe(
    "The action to take on matched requests.",
  ).optional(),
  description: z.string().describe(
    "An optional string description of this rule. This field has a maximum length of 400 characters.",
  ).optional(),
  priority: z.number().int().optional(),
  sourceRange: z.string().describe(
    'IP address or range, defined using CIDR notation, of requests that this rule applies to. You can use the wildcard character "*" to match all IPs equivalent to "0/0" and "::/0" together. Examples: 192.168.1.1 or 192.168.0.0/16 or 2001:db8::/32 or 2001:0db8:0000:0042:0000:8a2e:0370:7334. Truncation will be silently performed on addresses which are not properly truncated. For example, 1.2.3.4/24 is accepted as the same address as 1.2.3.0/24. Similarly, for IPv6, 2001:db8::1/32 is accepted as the same address as 2001:db8::/32.',
  ).optional(),
  appsId: z.string().describe(
    "Part of `parent`. Required. Name of the parent Firewall collection in which to create a new rule. Example: apps/myapp/firewall/ingressRules.",
  ),
});

const StateSchema = z.object({
  action: z.string().optional(),
  description: z.string().optional(),
  priority: z.number().optional(),
  sourceRange: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  action: z.enum(["UNSPECIFIED_ACTION", "ALLOW", "DENY"]).describe(
    "The action to take on matched requests.",
  ).optional(),
  description: z.string().describe(
    "An optional string description of this rule. This field has a maximum length of 400 characters.",
  ).optional(),
  priority: z.number().int().optional(),
  sourceRange: z.string().describe(
    'IP address or range, defined using CIDR notation, of requests that this rule applies to. You can use the wildcard character "*" to match all IPs equivalent to "0/0" and "::/0" together. Examples: 192.168.1.1 or 192.168.0.0/16 or 2001:db8::/32 or 2001:0db8:0000:0042:0000:8a2e:0370:7334. Truncation will be silently performed on addresses which are not properly truncated. For example, 1.2.3.4/24 is accepted as the same address as 1.2.3.0/24. Similarly, for IPv6, 2001:db8::1/32 is accepted as the same address as 2001:db8::/32.',
  ).optional(),
  appsId: z.string().describe(
    "Part of `parent`. Required. Name of the parent Firewall collection in which to create a new rule. Example: apps/myapp/firewall/ingressRules.",
  ).optional(),
});

/** Swamp extension model for Google Cloud App Engine Admin Apps.Firewall.IngressRules. Registered at `@swamp/gcp/appengine/apps-firewall-ingressrules`. */
export const model = {
  type: "@swamp/gcp/appengine/apps-firewall-ingressrules",
  version: "2026.05.21.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      toVersion: "2026.04.03.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A single firewall rule that is evaluated against incoming traffic and provide...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ingressRules",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["sourceRange"] !== undefined) {
          body["sourceRange"] = g["sourceRange"];
        }
        if (g["name"] !== undefined) {
          params["ingressRulesId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "appsId": String(g["appsId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
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
      description: "Get a ingressRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the ingressRules"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        params["ingressRulesId"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update ingressRules attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        else if (existing["appsId"]) {
          params["appsId"] = String(existing["appsId"]);
        }
        params["ingressRulesId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["action"] !== undefined) body["action"] = g["action"];
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["sourceRange"] !== undefined) {
          body["sourceRange"] = g["sourceRange"];
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          BASE_URL,
          PATCH_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete the ingressRules",
      arguments: z.object({
        identifier: z.string().describe("The name of the ingressRules"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        params["ingressRulesId"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
          /[\/\\]/g,
          "_",
        ).replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource("state", instanceName, {
          identifier: args.identifier,
          existed,
          status: existed ? "deleted" : "not_found",
          deletedAt: new Date().toISOString(),
        });
        return { dataHandles: [handle] };
      },
    },
    sync: {
      description: "Sync ingressRules state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
          else if (existing["appsId"]) {
            params["appsId"] = String(existing["appsId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["ingressRulesId"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
          ) as StateData;
          const handle = await context.writeResource(
            "state",
            instanceName,
            result,
          );
          return { dataHandles: [handle] };
        } catch (error: unknown) {
          if (isResourceNotFoundError(error)) {
            const handle = await context.writeResource("state", instanceName, {
              status: "not_found",
              syncedAt: new Date().toISOString(),
            });
            return { dataHandles: [handle] };
          }
          throw error;
        }
      },
    },
    batch_update: {
      description: "batch update",
      arguments: z.object({
        ingressRules: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["appsId"] !== undefined) params["appsId"] = String(g["appsId"]);
        const body: Record<string, unknown> = {};
        if (args["ingressRules"] !== undefined) {
          body["ingressRules"] = args["ingressRules"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "appengine.apps.firewall.ingressRules.batchUpdate",
            "path": "v1/apps/{appsId}/firewall/ingressRules:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["appsId"],
            "parameters": {
              "appsId": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
