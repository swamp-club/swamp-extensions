// Auto-generated extension model for @swamp/gcp/networkconnectivity/serviceconnectionpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Connectivity ServiceConnectionPolicies.
 *
 * The ServiceConnectionPolicy resource.
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
  return `${parent}/serviceConnectionPolicies/${shortName}`;
}

const BASE_URL = "https://networkconnectivity.googleapis.com/";

const GET_CONFIG = {
  "id": "networkconnectivity.projects.locations.serviceConnectionPolicies.get",
  "path": "v1/{+name}",
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
  "id":
    "networkconnectivity.projects.locations.serviceConnectionPolicies.create",
  "path": "v1/{+parent}/serviceConnectionPolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "autoSubnetworkConfig.allocRangeSpace": {
      "location": "query",
    },
    "autoSubnetworkConfig.ipStack": {
      "location": "query",
    },
    "autoSubnetworkConfig.prefixLength": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "serviceConnectionPolicyId": {
      "location": "query",
    },
    "subnetworkMode": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id":
    "networkconnectivity.projects.locations.serviceConnectionPolicies.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id":
    "networkconnectivity.projects.locations.serviceConnectionPolicies.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  autoCreatedSubnetInfo: z.object({
    delinked: z.boolean().describe(
      "Output only. Indicates whether the subnetwork is delinked from the Service Connection Policy. Only set if the subnetwork mode is AUTO_CREATED during creation.",
    ).optional(),
    internalRange: z.string().describe(
      "Output only. URI of the automatically created Internal Range. Only set if the subnetwork mode is AUTO_CREATED during creation.",
    ).optional(),
    internalRangeRef: z.string().describe(
      "Output only. URI of the automatically created Internal Range reference. Only set if the subnetwork mode is AUTO_CREATED during creation.",
    ).optional(),
    subnetwork: z.string().describe(
      "Output only. URI of the automatically created subnetwork. Only set if the subnetwork mode is AUTO_CREATED during creation.",
    ).optional(),
    subnetworkRef: z.string().describe(
      "Output only. URI of the automatically created subnetwork reference. Only set if the subnetwork mode is AUTO_CREATED during creation.",
    ).optional(),
  }).describe(
    "Information for the automatically created subnetwork and its associated IR.",
  ).optional(),
  description: z.string().describe("A description of this resource.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe("User-defined labels.")
    .optional(),
  name: z.string().describe(
    "Immutable. The name of a ServiceConnectionPolicy. Format: projects/{project}/locations/{location}/serviceConnectionPolicies/{service_connection_policy} See: https://google.aip.dev/122#fields-representing-resource-names",
  ).optional(),
  network: z.string().describe(
    "The resource path of the consumer network. Example: - projects/{projectNumOrId}/global/networks/{resourceId}.",
  ).optional(),
  pscConfig: z.object({
    allowedGoogleProducersResourceHierarchyLevel: z.array(z.string()).describe(
      "Optional. List of Projects, Folders, or Organizations from where the Producer instance can be within. For example, a network administrator can provide both 'organizations/foo' and 'projects/bar' as allowed_google_producers_resource_hierarchy_levels. This allowlists this network to connect with any Producer instance within the 'foo' organization or the 'bar' project. By default, allowed_google_producers_resource_hierarchy_level is empty. The format for each allowed_google_producers_resource_hierarchy_level is / where is one of 'projects', 'folders', or 'organizations' and is either the ID or the number of the resource type. Format for each allowed_google_producers_resource_hierarchy_level value: 'projects/' or 'folders/' or 'organizations/' Eg. [projects/my-project-id, projects/567, folders/891, organizations/123]",
    ).optional(),
    limit: z.string().describe(
      "Optional. Max number of PSC connections for this policy.",
    ).optional(),
    producerInstanceLocation: z.enum([
      "PRODUCER_INSTANCE_LOCATION_UNSPECIFIED",
      "CUSTOM_RESOURCE_HIERARCHY_LEVELS",
    ]).describe(
      "Optional. ProducerInstanceLocation is used to specify which authorization mechanism to use to determine which projects the Producer instance can be within.",
    ).optional(),
    subnetworks: z.array(z.string()).describe(
      "The resource paths of subnetworks to use for IP address management. Example: projects/{projectNumOrId}/regions/{region}/subnetworks/{resourceId}.",
    ).optional(),
  }).describe(
    "Configuration used for Private Service Connect connections. Used when Infrastructure is PSC.",
  ).optional(),
  serviceClass: z.string().describe(
    "The service class identifier for which this ServiceConnectionPolicy is for. The service class identifier is a unique, symbolic representation of a ServiceClass. It is provided by the Service Producer. Google services have a prefix of gcp or google-cloud. For example, gcp-memorystore-redis or google-cloud-sql. 3rd party services do not. For example, test-service-a3dfcx.",
  ).optional(),
  autoSubnetworkConfig_allocRangeSpace: z.string().describe(
    "Optional. The space where we search for a free range to create a subnetwork. It can be narrow down or pick a different space. This is in standard CIDR format. If not specified, “10.0.0.0/8” is used. Only eligible for IPV4_ONLY and IPV4_IPV6 subnetwork.",
  ).optional(),
  autoSubnetworkConfig_ipStack: z.string().describe(
    "Optional. The requested IP stack for the subnetwork. If not specified, IPv4 is used.",
  ).optional(),
  autoSubnetworkConfig_prefixLength: z.string().describe(
    "Optional. The desired prefix length for the subnet's IP address range. E.g., 24 for a /24. The actual range is allocated from available space. If not specified, 24 is used. Only eligible for IPV4_ONLY and IPV4_IPV6 subnetwork.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  serviceConnectionPolicyId: z.string().describe(
    "Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/serviceConnectionPolicies/foo') See https://google.aip.dev/122#resource-id-segments Unique per location.",
  ).optional(),
  subnetworkMode: z.string().describe(
    "Optional. If this field is not set, USER_PROVIDED is the inferred value to use.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  autoCreatedSubnetInfo: z.object({
    delinked: z.boolean(),
    internalRange: z.string(),
    internalRangeRef: z.string(),
    subnetwork: z.string(),
    subnetworkRef: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  infrastructure: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  network: z.string().optional(),
  pscConfig: z.object({
    allowedGoogleProducersResourceHierarchyLevel: z.array(z.string()),
    limit: z.string(),
    producerInstanceLocation: z.string(),
    subnetworks: z.array(z.string()),
  }).optional(),
  pscConnections: z.array(z.object({
    consumerAddress: z.string(),
    consumerForwardingRule: z.string(),
    consumerTargetProject: z.string(),
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    errorInfo: z.object({
      domain: z.string(),
      metadata: z.record(z.string(), z.unknown()),
      reason: z.string(),
    }),
    errorType: z.string(),
    gceOperation: z.string(),
    ipVersion: z.string(),
    producerInstanceId: z.string(),
    producerInstanceMetadata: z.record(z.string(), z.unknown()),
    pscConnectionId: z.string(),
    selectedSubnetwork: z.string(),
    serviceClass: z.string(),
    state: z.string(),
  })).optional(),
  serviceClass: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  autoCreatedSubnetInfo: z.object({
    delinked: z.boolean().describe(
      "Output only. Indicates whether the subnetwork is delinked from the Service Connection Policy. Only set if the subnetwork mode is AUTO_CREATED during creation.",
    ).optional(),
    internalRange: z.string().describe(
      "Output only. URI of the automatically created Internal Range. Only set if the subnetwork mode is AUTO_CREATED during creation.",
    ).optional(),
    internalRangeRef: z.string().describe(
      "Output only. URI of the automatically created Internal Range reference. Only set if the subnetwork mode is AUTO_CREATED during creation.",
    ).optional(),
    subnetwork: z.string().describe(
      "Output only. URI of the automatically created subnetwork. Only set if the subnetwork mode is AUTO_CREATED during creation.",
    ).optional(),
    subnetworkRef: z.string().describe(
      "Output only. URI of the automatically created subnetwork reference. Only set if the subnetwork mode is AUTO_CREATED during creation.",
    ).optional(),
  }).describe(
    "Information for the automatically created subnetwork and its associated IR.",
  ).optional(),
  description: z.string().describe("A description of this resource.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe("User-defined labels.")
    .optional(),
  name: z.string().describe(
    "Immutable. The name of a ServiceConnectionPolicy. Format: projects/{project}/locations/{location}/serviceConnectionPolicies/{service_connection_policy} See: https://google.aip.dev/122#fields-representing-resource-names",
  ).optional(),
  network: z.string().describe(
    "The resource path of the consumer network. Example: - projects/{projectNumOrId}/global/networks/{resourceId}.",
  ).optional(),
  pscConfig: z.object({
    allowedGoogleProducersResourceHierarchyLevel: z.array(z.string()).describe(
      "Optional. List of Projects, Folders, or Organizations from where the Producer instance can be within. For example, a network administrator can provide both 'organizations/foo' and 'projects/bar' as allowed_google_producers_resource_hierarchy_levels. This allowlists this network to connect with any Producer instance within the 'foo' organization or the 'bar' project. By default, allowed_google_producers_resource_hierarchy_level is empty. The format for each allowed_google_producers_resource_hierarchy_level is / where is one of 'projects', 'folders', or 'organizations' and is either the ID or the number of the resource type. Format for each allowed_google_producers_resource_hierarchy_level value: 'projects/' or 'folders/' or 'organizations/' Eg. [projects/my-project-id, projects/567, folders/891, organizations/123]",
    ).optional(),
    limit: z.string().describe(
      "Optional. Max number of PSC connections for this policy.",
    ).optional(),
    producerInstanceLocation: z.enum([
      "PRODUCER_INSTANCE_LOCATION_UNSPECIFIED",
      "CUSTOM_RESOURCE_HIERARCHY_LEVELS",
    ]).describe(
      "Optional. ProducerInstanceLocation is used to specify which authorization mechanism to use to determine which projects the Producer instance can be within.",
    ).optional(),
    subnetworks: z.array(z.string()).describe(
      "The resource paths of subnetworks to use for IP address management. Example: projects/{projectNumOrId}/regions/{region}/subnetworks/{resourceId}.",
    ).optional(),
  }).describe(
    "Configuration used for Private Service Connect connections. Used when Infrastructure is PSC.",
  ).optional(),
  serviceClass: z.string().describe(
    "The service class identifier for which this ServiceConnectionPolicy is for. The service class identifier is a unique, symbolic representation of a ServiceClass. It is provided by the Service Producer. Google services have a prefix of gcp or google-cloud. For example, gcp-memorystore-redis or google-cloud-sql. 3rd party services do not. For example, test-service-a3dfcx.",
  ).optional(),
  autoSubnetworkConfig_allocRangeSpace: z.string().describe(
    "Optional. The space where we search for a free range to create a subnetwork. It can be narrow down or pick a different space. This is in standard CIDR format. If not specified, “10.0.0.0/8” is used. Only eligible for IPV4_ONLY and IPV4_IPV6 subnetwork.",
  ).optional(),
  autoSubnetworkConfig_ipStack: z.string().describe(
    "Optional. The requested IP stack for the subnetwork. If not specified, IPv4 is used.",
  ).optional(),
  autoSubnetworkConfig_prefixLength: z.string().describe(
    "Optional. The desired prefix length for the subnet's IP address range. E.g., 24 for a /24. The actual range is allocated from available space. If not specified, 24 is used. Only eligible for IPV4_ONLY and IPV4_IPV6 subnetwork.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  serviceConnectionPolicyId: z.string().describe(
    "Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/serviceConnectionPolicies/foo') See https://google.aip.dev/122#resource-id-segments Unique per location.",
  ).optional(),
  subnetworkMode: z.string().describe(
    "Optional. If this field is not set, USER_PROVIDED is the inferred value to use.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Connectivity ServiceConnectionPolicies. Registered at `@swamp/gcp/networkconnectivity/serviceconnectionpolicies`. */
export const model = {
  type: "@swamp/gcp/networkconnectivity/serviceconnectionpolicies",
  version: "2026.05.19.2",
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
      toVersion: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The ServiceConnectionPolicy resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a serviceConnectionPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["autoCreatedSubnetInfo"] !== undefined) {
          body["autoCreatedSubnetInfo"] = g["autoCreatedSubnetInfo"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["pscConfig"] !== undefined) body["pscConfig"] = g["pscConfig"];
        if (g["serviceClass"] !== undefined) {
          body["serviceClass"] = g["serviceClass"];
        }
        if (g["autoSubnetworkConfig_allocRangeSpace"] !== undefined) {
          body["autoSubnetworkConfig_allocRangeSpace"] =
            g["autoSubnetworkConfig_allocRangeSpace"];
        }
        if (g["autoSubnetworkConfig_ipStack"] !== undefined) {
          body["autoSubnetworkConfig_ipStack"] =
            g["autoSubnetworkConfig_ipStack"];
        }
        if (g["autoSubnetworkConfig_prefixLength"] !== undefined) {
          body["autoSubnetworkConfig_prefixLength"] =
            g["autoSubnetworkConfig_prefixLength"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["serviceConnectionPolicyId"] !== undefined) {
          body["serviceConnectionPolicyId"] = g["serviceConnectionPolicyId"];
        }
        if (g["subnetworkMode"] !== undefined) {
          body["subnetworkMode"] = g["subnetworkMode"];
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
      description: "Get a serviceConnectionPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the serviceConnectionPolicies",
        ),
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
      description: "Update serviceConnectionPolicies attributes",
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
        if (g["autoCreatedSubnetInfo"] !== undefined) {
          body["autoCreatedSubnetInfo"] = g["autoCreatedSubnetInfo"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["pscConfig"] !== undefined) body["pscConfig"] = g["pscConfig"];
        if (g["serviceClass"] !== undefined) {
          body["serviceClass"] = g["serviceClass"];
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
      description: "Delete the serviceConnectionPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the serviceConnectionPolicies",
        ),
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
      description: "Sync serviceConnectionPolicies state from GCP",
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
