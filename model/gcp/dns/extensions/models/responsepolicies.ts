// Auto-generated extension model for @swamp/gcp/dns/responsepolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud DNS ResponsePolicies.
 *
 * A Response Policy is a collection of selectors that apply to queries made against one or more Virtual Private Cloud networks.
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

const BASE_URL = "https://dns.googleapis.com/";

const GET_CONFIG = {
  "id": "dns.responsePolicies.get",
  "path": "dns/v1/projects/{project}/responsePolicies/{responsePolicy}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "responsePolicy",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "responsePolicy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dns.responsePolicies.create",
  "path": "dns/v1/projects/{project}/responsePolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dns.responsePolicies.update",
  "path": "dns/v1/projects/{project}/responsePolicies/{responsePolicy}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "project",
    "responsePolicy",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "responsePolicy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dns.responsePolicies.delete",
  "path": "dns/v1/projects/{project}/responsePolicies/{responsePolicy}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "responsePolicy",
  ],
  "parameters": {
    "clientOperationId": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "responsePolicy": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "dns.responsePolicies.list",
  "path": "dns/v1/projects/{project}/responsePolicies",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  description: z.string().describe(
    "User-provided description for this Response Policy.",
  ).optional(),
  gkeClusters: z.array(z.object({
    gkeClusterName: z.string().describe(
      "The resource name of the cluster to bind this response policy to. This should be specified in the format like: projects/*/locations/*/clusters/*. This is referenced from GKE projects.locations.clusters.get API: https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get",
    ).optional(),
    kind: z.string().optional(),
  })).describe(
    "The list of Google Kubernetes Engine clusters to which this response policy is applied.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("User labels.").optional(),
  networks: z.array(z.object({
    kind: z.string().optional(),
    networkUrl: z.string().describe(
      "The fully qualified URL of the VPC network to bind to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`",
    ).optional(),
  })).describe(
    "List of network names specifying networks to which this policy is applied.",
  ).optional(),
  responsePolicyName: z.string().describe(
    "User assigned name for this Response Policy.",
  ).optional(),
  clientOperationId: z.string().describe(
    "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  gkeClusters: z.array(z.object({
    gkeClusterName: z.string(),
    kind: z.string(),
  })).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  networks: z.array(z.object({
    kind: z.string(),
    networkUrl: z.string(),
  })).optional(),
  responsePolicyName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  description: z.string().describe(
    "User-provided description for this Response Policy.",
  ).optional(),
  gkeClusters: z.array(z.object({
    gkeClusterName: z.string().describe(
      "The resource name of the cluster to bind this response policy to. This should be specified in the format like: projects/*/locations/*/clusters/*. This is referenced from GKE projects.locations.clusters.get API: https://cloud.google.com/kubernetes-engine/docs/reference/rest/v1/projects.locations.clusters/get",
    ).optional(),
    kind: z.string().optional(),
  })).describe(
    "The list of Google Kubernetes Engine clusters to which this response policy is applied.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe("User labels.").optional(),
  networks: z.array(z.object({
    kind: z.string().optional(),
    networkUrl: z.string().describe(
      "The fully qualified URL of the VPC network to bind to. This should be formatted like `https://www.googleapis.com/compute/v1/projects/{project}/global/networks/{network}`",
    ).optional(),
  })).describe(
    "List of network names specifying networks to which this policy is applied.",
  ).optional(),
  responsePolicyName: z.string().describe(
    "User assigned name for this Response Policy.",
  ).optional(),
  clientOperationId: z.string().describe(
    "For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection.",
  ).optional(),
});

/** Swamp extension model for Google Cloud DNS ResponsePolicies. Registered at `@swamp/gcp/dns/responsepolicies`. */
export const model = {
  type: "@swamp/gcp/dns/responsepolicies",
  version: "2026.05.24.1",
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
    {
      toVersion: "2026.05.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Response Policy is a collection of selectors that apply to queries made aga...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a responsePolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["gkeClusters"] !== undefined) {
          body["gkeClusters"] = g["gkeClusters"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["networks"] !== undefined) body["networks"] = g["networks"];
        if (g["responsePolicyName"] !== undefined) {
          body["responsePolicyName"] = g["responsePolicyName"];
        }
        if (g["clientOperationId"] !== undefined) {
          body["clientOperationId"] = g["clientOperationId"];
        }
        if (g["name"] !== undefined) {
          params["responsePolicy"] = String(g["name"]);
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
            listParams: { "project": projectId },
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
      description: "Get a responsePolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the responsePolicies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["responsePolicy"] = args.identifier;
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
      description: "Update responsePolicies attributes",
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
        params["responsePolicy"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["gkeClusters"] !== undefined) {
          body["gkeClusters"] = g["gkeClusters"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["networks"] !== undefined) body["networks"] = g["networks"];
        if (g["responsePolicyName"] !== undefined) {
          body["responsePolicyName"] = g["responsePolicyName"];
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
          UPDATE_CONFIG,
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
      description: "Delete the responsePolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the responsePolicies"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["responsePolicy"] = args.identifier;
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
      description: "Sync responsePolicies state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["responsePolicy"] = identifier;
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
