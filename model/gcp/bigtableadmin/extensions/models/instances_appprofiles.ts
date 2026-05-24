// Auto-generated extension model for @swamp/gcp/bigtableadmin/instances-appprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Bigtable Admin Instances.AppProfiles.
 *
 * A configuration object describing how Cloud Bigtable should treat traffic from a particular end user application.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/appProfiles/${shortName}`;
}

const BASE_URL = "https://bigtableadmin.googleapis.com/";

const GET_CONFIG = {
  "id": "bigtableadmin.projects.instances.appProfiles.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "bigtableadmin.projects.instances.appProfiles.create",
  "path": "v2/{+parent}/appProfiles",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "appProfileId": {
      "location": "query",
    },
    "ignoreWarnings": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "bigtableadmin.projects.instances.appProfiles.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "ignoreWarnings": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "bigtableadmin.projects.instances.appProfiles.delete",
  "path": "v2/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "ignoreWarnings": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "bigtableadmin.projects.instances.appProfiles.list",
  "path": "v2/{+parent}/appProfiles",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  dataBoostIsolationReadOnly: z.object({
    computeBillingOwner: z.enum([
      "COMPUTE_BILLING_OWNER_UNSPECIFIED",
      "HOST_PAYS",
    ]).describe("The Compute Billing Owner for this Data Boost App Profile.")
      .optional(),
  }).describe(
    "Data Boost is a serverless compute capability that lets you run high-throughput read jobs and queries on your Bigtable data, without impacting the performance of the clusters that handle your application traffic. Data Boost supports read-only use cases with single-cluster routing.",
  ).optional(),
  description: z.string().describe(
    "Long form description of the use case for this AppProfile.",
  ).optional(),
  multiClusterRoutingUseAny: z.object({
    clusterIds: z.array(z.string()).describe(
      "The set of clusters to route to. The order is ignored; clusters will be tried in order of distance. If left empty, all clusters are eligible.",
    ).optional(),
    rowAffinity: z.object({}).describe(
      "If enabled, Bigtable will route the request based on the row key of the request, rather than randomly. Instead, each row key will be assigned to a cluster, and will stick to that cluster. If clusters are added or removed, then this may affect which row keys stick to which clusters. To avoid this, users can use a cluster group to specify which clusters are to be used. In this case, new clusters that are not a part of the cluster group will not be routed to, and routing will be unaffected by the new cluster. Moreover, clusters specified in the cluster group cannot be deleted unless removed from the cluster group.",
    ).optional(),
  }).describe(
    "Read/write requests are routed to the nearest cluster in the instance, and will fail over to the nearest cluster that is available in the event of transient errors or delays. Clusters in a region are considered equidistant. Choosing this option sacrifices read-your-writes consistency to improve availability.",
  ).optional(),
  name: z.string().describe(
    "The unique name of the app profile, up to 50 characters long. Values are of the form `projects/{project}/instances/{instance}/appProfiles/_a-zA-Z0-9*`.",
  ).optional(),
  singleClusterRouting: z.object({
    allowTransactionalWrites: z.boolean().describe(
      "Whether or not `CheckAndMutateRow` and `ReadModifyWriteRow` requests are allowed by this app profile. It is unsafe to send these requests to the same table/row/column in multiple clusters.",
    ).optional(),
    clusterId: z.string().describe(
      "The cluster to which read/write requests should be routed.",
    ).optional(),
  }).describe(
    "Unconditionally routes all read/write requests to a specific cluster. This option preserves read-your-writes consistency but does not improve availability.",
  ).optional(),
  standardIsolation: z.object({
    memoryConfig: z.object({}).describe(
      "If set, eligible single-row requests (currently limited to ReadRows) using this app profile will be routed to the memory layer. All eligible writes populate the memory layer. MemoryConfig can only be set if the AppProfile uses single cluster routing and the configured cluster has a memory layer enabled.",
    ).optional(),
    priority: z.enum([
      "PRIORITY_UNSPECIFIED",
      "PRIORITY_LOW",
      "PRIORITY_MEDIUM",
      "PRIORITY_HIGH",
    ]).describe("The priority of requests sent using this app profile.")
      .optional(),
  }).describe(
    "Standard options for isolating this app profile's traffic from other use cases.",
  ).optional(),
  appProfileId: z.string().describe(
    "Required. The ID to be used when referring to the new app profile within its instance, e.g., just `myprofile` rather than `projects/myproject/instances/myinstance/appProfiles/myprofile`.",
  ).optional(),
  ignoreWarnings: z.string().describe(
    "If true, ignore safety checks when creating the app profile.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  dataBoostIsolationReadOnly: z.object({
    computeBillingOwner: z.string(),
  }).optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  multiClusterRoutingUseAny: z.object({
    clusterIds: z.array(z.string()),
    rowAffinity: z.object({}),
  }).optional(),
  name: z.string(),
  priority: z.string().optional(),
  singleClusterRouting: z.object({
    allowTransactionalWrites: z.boolean(),
    clusterId: z.string(),
  }).optional(),
  standardIsolation: z.object({
    memoryConfig: z.object({}),
    priority: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  dataBoostIsolationReadOnly: z.object({
    computeBillingOwner: z.enum([
      "COMPUTE_BILLING_OWNER_UNSPECIFIED",
      "HOST_PAYS",
    ]).describe("The Compute Billing Owner for this Data Boost App Profile.")
      .optional(),
  }).describe(
    "Data Boost is a serverless compute capability that lets you run high-throughput read jobs and queries on your Bigtable data, without impacting the performance of the clusters that handle your application traffic. Data Boost supports read-only use cases with single-cluster routing.",
  ).optional(),
  description: z.string().describe(
    "Long form description of the use case for this AppProfile.",
  ).optional(),
  multiClusterRoutingUseAny: z.object({
    clusterIds: z.array(z.string()).describe(
      "The set of clusters to route to. The order is ignored; clusters will be tried in order of distance. If left empty, all clusters are eligible.",
    ).optional(),
    rowAffinity: z.object({}).describe(
      "If enabled, Bigtable will route the request based on the row key of the request, rather than randomly. Instead, each row key will be assigned to a cluster, and will stick to that cluster. If clusters are added or removed, then this may affect which row keys stick to which clusters. To avoid this, users can use a cluster group to specify which clusters are to be used. In this case, new clusters that are not a part of the cluster group will not be routed to, and routing will be unaffected by the new cluster. Moreover, clusters specified in the cluster group cannot be deleted unless removed from the cluster group.",
    ).optional(),
  }).describe(
    "Read/write requests are routed to the nearest cluster in the instance, and will fail over to the nearest cluster that is available in the event of transient errors or delays. Clusters in a region are considered equidistant. Choosing this option sacrifices read-your-writes consistency to improve availability.",
  ).optional(),
  name: z.string().describe(
    "The unique name of the app profile, up to 50 characters long. Values are of the form `projects/{project}/instances/{instance}/appProfiles/_a-zA-Z0-9*`.",
  ).optional(),
  singleClusterRouting: z.object({
    allowTransactionalWrites: z.boolean().describe(
      "Whether or not `CheckAndMutateRow` and `ReadModifyWriteRow` requests are allowed by this app profile. It is unsafe to send these requests to the same table/row/column in multiple clusters.",
    ).optional(),
    clusterId: z.string().describe(
      "The cluster to which read/write requests should be routed.",
    ).optional(),
  }).describe(
    "Unconditionally routes all read/write requests to a specific cluster. This option preserves read-your-writes consistency but does not improve availability.",
  ).optional(),
  standardIsolation: z.object({
    memoryConfig: z.object({}).describe(
      "If set, eligible single-row requests (currently limited to ReadRows) using this app profile will be routed to the memory layer. All eligible writes populate the memory layer. MemoryConfig can only be set if the AppProfile uses single cluster routing and the configured cluster has a memory layer enabled.",
    ).optional(),
    priority: z.enum([
      "PRIORITY_UNSPECIFIED",
      "PRIORITY_LOW",
      "PRIORITY_MEDIUM",
      "PRIORITY_HIGH",
    ]).describe("The priority of requests sent using this app profile.")
      .optional(),
  }).describe(
    "Standard options for isolating this app profile's traffic from other use cases.",
  ).optional(),
  appProfileId: z.string().describe(
    "Required. The ID to be used when referring to the new app profile within its instance, e.g., just `myprofile` rather than `projects/myproject/instances/myinstance/appProfiles/myprofile`.",
  ).optional(),
  ignoreWarnings: z.string().describe(
    "If true, ignore safety checks when creating the app profile.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Bigtable Admin Instances.AppProfiles. Registered at `@swamp/gcp/bigtableadmin/instances-appprofiles`. */
export const model = {
  type: "@swamp/gcp/bigtableadmin/instances-appprofiles",
  version: "2026.05.24.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
        "A configuration object describing how Cloud Bigtable should treat traffic fro...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a appProfiles",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["dataBoostIsolationReadOnly"] !== undefined) {
          body["dataBoostIsolationReadOnly"] = g["dataBoostIsolationReadOnly"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["multiClusterRoutingUseAny"] !== undefined) {
          body["multiClusterRoutingUseAny"] = g["multiClusterRoutingUseAny"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["singleClusterRouting"] !== undefined) {
          body["singleClusterRouting"] = g["singleClusterRouting"];
        }
        if (g["standardIsolation"] !== undefined) {
          body["standardIsolation"] = g["standardIsolation"];
        }
        if (g["appProfileId"] !== undefined) {
          body["appProfileId"] = g["appProfileId"];
        }
        if (g["ignoreWarnings"] !== undefined) {
          body["ignoreWarnings"] = g["ignoreWarnings"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
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
            listParams: {
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a appProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the appProfiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Update appProfiles attributes",
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["dataBoostIsolationReadOnly"] !== undefined) {
          body["dataBoostIsolationReadOnly"] = g["dataBoostIsolationReadOnly"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["multiClusterRoutingUseAny"] !== undefined) {
          body["multiClusterRoutingUseAny"] = g["multiClusterRoutingUseAny"];
        }
        if (g["singleClusterRouting"] !== undefined) {
          body["singleClusterRouting"] = g["singleClusterRouting"];
        }
        if (g["standardIsolation"] !== undefined) {
          body["standardIsolation"] = g["standardIsolation"];
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
      description: "Delete the appProfiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the appProfiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync appProfiles state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
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
