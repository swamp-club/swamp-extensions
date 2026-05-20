// Auto-generated extension model for @swamp/gcp/compute/zonevmextensionpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine ZoneVmExtensionPolicies.
 *
 * Represents a VM extension policy.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.zoneVmExtensionPolicies.get",
  "path":
    "projects/{project}/zones/{zone}/vmExtensionPolicies/{vmExtensionPolicy}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "vmExtensionPolicy",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "vmExtensionPolicy": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.zoneVmExtensionPolicies.insert",
  "path": "projects/{project}/zones/{zone}/vmExtensionPolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "zone",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.zoneVmExtensionPolicies.update",
  "path":
    "projects/{project}/zones/{zone}/vmExtensionPolicies/{vmExtensionPolicy}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "zone",
    "vmExtensionPolicy",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "vmExtensionPolicy": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.zoneVmExtensionPolicies.delete",
  "path":
    "projects/{project}/zones/{zone}/vmExtensionPolicies/{vmExtensionPolicy}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "zone",
    "vmExtensionPolicy",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "vmExtensionPolicy": {
      "location": "path",
      "required": true,
    },
    "zone": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  description: z.string().describe("An optional description of this resource.")
    .optional(),
  extensionPolicies: z.record(
    z.string(),
    z.object({
      pinnedVersion: z.string().describe(
        "Optional. The specific version of the extension to install. If not set, the latest version is used.",
      ).optional(),
      stringConfig: z.string().describe(
        "Optional. String-based configuration data for the extension.",
      ).optional(),
    }),
  ).describe(
    'Required. A map of extension names (for example, "ops-agent") to their corresponding policy configurations.',
  ).optional(),
  instanceSelectors: z.array(z.object({
    labelSelector: z.object({
      inclusionLabels: z.record(z.string(), z.string()).describe(
        'Optional. A map of key-value pairs representing VM labels. VMs must have all of the labels specified in this map to be selected (logical AND). e.g. If the `inclusion_labels` are {("key1", "value1"), ("key2", "value2")}, the VM labels must contain both ("key1", "value1") and ("key2", "value2") to be selected. If the VM labels are ("key1", "value1") and ("something", "else"), it will not be selected. If the map is empty, it\'s considered a match.',
      ).optional(),
    }).describe(
      "A LabelSelector is applied to a VM only if it matches all the specified labels.",
    ).optional(),
  })).describe(
    "Optional. Selectors to target VMs for this policy. VMs are selected if they match *any* of the provided selectors (logical OR). If this list is empty, the policy applies to all VMs.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ),
  priority: z.number().int().describe(
    "Optional. Priority of this policy. Used to resolve conflicts when multiple policies apply to the same extension. The policy priority is an integer from 0 to 65535, inclusive. Lower integers indicate higher priorities. If you do not specify a priority when creating a rule, it is assigned a priority of 1000. If priorities are equal, the policy with the most recent creation timestamp takes precedence.",
  ).optional(),
  zone: z.string().describe("Name of the zone for this request."),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  extensionPolicies: z.record(z.string(), z.unknown()).optional(),
  globalResourceLink: z.string().optional(),
  id: z.string().optional(),
  instanceSelectors: z.array(z.object({
    labelSelector: z.object({
      inclusionLabels: z.record(z.string(), z.unknown()),
    }),
  })).optional(),
  kind: z.string().optional(),
  managedByGlobal: z.boolean().optional(),
  name: z.string(),
  priority: z.number().optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  state: z.string().optional(),
  updateTimestamp: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe("An optional description of this resource.")
    .optional(),
  extensionPolicies: z.record(
    z.string(),
    z.object({
      pinnedVersion: z.string().describe(
        "Optional. The specific version of the extension to install. If not set, the latest version is used.",
      ).optional(),
      stringConfig: z.string().describe(
        "Optional. String-based configuration data for the extension.",
      ).optional(),
    }),
  ).describe(
    'Required. A map of extension names (for example, "ops-agent") to their corresponding policy configurations.',
  ).optional(),
  instanceSelectors: z.array(z.object({
    labelSelector: z.object({
      inclusionLabels: z.record(z.string(), z.string()).describe(
        'Optional. A map of key-value pairs representing VM labels. VMs must have all of the labels specified in this map to be selected (logical AND). e.g. If the `inclusion_labels` are {("key1", "value1"), ("key2", "value2")}, the VM labels must contain both ("key1", "value1") and ("key2", "value2") to be selected. If the VM labels are ("key1", "value1") and ("something", "else"), it will not be selected. If the map is empty, it\'s considered a match.',
      ).optional(),
    }).describe(
      "A LabelSelector is applied to a VM only if it matches all the specified labels.",
    ).optional(),
  })).describe(
    "Optional. Selectors to target VMs for this policy. VMs are selected if they match *any* of the provided selectors (logical OR). If this list is empty, the policy applies to all VMs.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  priority: z.number().int().describe(
    "Optional. Priority of this policy. Used to resolve conflicts when multiple policies apply to the same extension. The policy priority is an integer from 0 to 65535, inclusive. Lower integers indicate higher priorities. If you do not specify a priority when creating a rule, it is assigned a priority of 1000. If priorities are equal, the policy with the most recent creation timestamp takes precedence.",
  ).optional(),
  zone: z.string().describe("Name of the zone for this request.").optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine ZoneVmExtensionPolicies. Registered at `@swamp/gcp/compute/zonevmextensionpolicies`. */
export const model = {
  type: "@swamp/gcp/compute/zonevmextensionpolicies",
  version: "2026.05.20.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents a VM extension policy.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a zoneVmExtensionPolicies",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["extensionPolicies"] !== undefined) {
          body["extensionPolicies"] = g["extensionPolicies"];
        }
        if (g["instanceSelectors"] !== undefined) {
          body["instanceSelectors"] = g["instanceSelectors"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["vmExtensionPolicy"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a zoneVmExtensionPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the zoneVmExtensionPolicies",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["vmExtensionPolicy"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Update zoneVmExtensionPolicies attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        else if (existing["zone"]) params["zone"] = String(existing["zone"]);
        params["vmExtensionPolicy"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["extensionPolicies"] !== undefined) {
          body["extensionPolicies"] = g["extensionPolicies"];
        }
        if (g["instanceSelectors"] !== undefined) {
          body["instanceSelectors"] = g["instanceSelectors"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
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
          UPDATE_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the zoneVmExtensionPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the zoneVmExtensionPolicies",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        params["vmExtensionPolicy"] = args.identifier;
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
      description: "Sync zoneVmExtensionPolicies state from GCP",
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
          if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
          else if (existing["zone"]) params["zone"] = String(existing["zone"]);
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["vmExtensionPolicy"] = identifier;
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
  },
};
