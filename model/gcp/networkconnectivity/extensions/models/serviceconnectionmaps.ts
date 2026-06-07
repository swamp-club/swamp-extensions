// Auto-generated extension model for @swamp/gcp/networkconnectivity/serviceconnectionmaps
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Connectivity ServiceConnectionMaps.
 *
 * The ServiceConnectionMap resource.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/serviceConnectionMaps/${shortName}`;
}

const BASE_URL = "https://networkconnectivity.googleapis.com/";

const GET_CONFIG = {
  "id": "networkconnectivity.projects.locations.serviceConnectionMaps.get",
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
  "id": "networkconnectivity.projects.locations.serviceConnectionMaps.create",
  "path": "v1/{+parent}/serviceConnectionMaps",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "serviceConnectionMapId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkconnectivity.projects.locations.serviceConnectionMaps.patch",
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
  "id": "networkconnectivity.projects.locations.serviceConnectionMaps.delete",
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

const LIST_CONFIG = {
  "id": "networkconnectivity.projects.locations.serviceConnectionMaps.list",
  "path": "v1/{+parent}/serviceConnectionMaps",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  consumerPscConfigs: z.array(z.object({
    consumerInstanceProject: z.string().describe(
      "Required. The project ID or project number of the consumer project. This project is the one that the consumer uses to interact with the producer instance. From the perspective of a consumer who's created a producer instance, this is the project of the producer instance. Format: 'projects/' Eg. 'projects/consumer-project' or 'projects/1234'",
    ).optional(),
    disableGlobalAccess: z.boolean().describe(
      "This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region.",
    ).optional(),
    ipVersion: z.enum(["IP_VERSION_UNSPECIFIED", "IPV4", "IPV6"]).describe(
      "The requested IP version for the PSC connection.",
    ).optional(),
    network: z.string().describe(
      "The resource path of the consumer network where PSC connections are allowed to be created in. Note, this network does not need be in the ConsumerPscConfig.project in the case of SharedVPC. Example: projects/{projectNumOrId}/global/networks/{networkId}.",
    ).optional(),
    producerInstanceId: z.string().describe(
      "Immutable. Deprecated. Use producer_instance_metadata instead. An immutable identifier for the producer instance.",
    ).optional(),
    producerInstanceMetadata: z.record(z.string(), z.string()).describe(
      "Immutable. An immutable map for the producer instance metadata.",
    ).optional(),
    project: z.string().describe(
      "The consumer project where PSC connections are allowed to be created in.",
    ).optional(),
    serviceAttachmentIpAddressMap: z.record(z.string(), z.string()).describe(
      "Optional. A map to store mapping between customer vip and target service attachment. This field can be used to specify a static IP address for a PSC connection.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "VALID",
      "CONNECTION_POLICY_MISSING",
      "POLICY_LIMIT_REACHED",
      "CONSUMER_INSTANCE_PROJECT_NOT_ALLOWLISTED",
    ]).describe(
      "Output only. Overall state of PSC Connections management for this consumer psc config.",
    ).optional(),
  })).describe("The PSC configurations on consumer side.").optional(),
  description: z.string().describe("A description of this resource.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe("User-defined labels.")
    .optional(),
  name: z.string().describe(
    "Immutable. The name of a ServiceConnectionMap. Format: projects/{project}/locations/{location}/serviceConnectionMaps/{service_connection_map} See: https://google.aip.dev/122#fields-representing-resource-names",
  ).optional(),
  producerPscConfigs: z.array(z.object({
    automatedDnsCreationSpec: z.object({
      dnsSuffix: z.string().describe(
        'Required. The DNS suffix to use for the DNS record. Must end with a dot. This should be a valid DNS domain name as per RFC 1035. Each label (between dots) can contain letters, digits, and hyphens, and must not start or end with a hyphen. Example: "my-service.example.com.", "internal."',
      ).optional(),
      hostname: z.string().describe(
        'Required. The hostname (the first label of the FQDN) to use for the DNS record. This should be a valid DNS label as per RFC 1035. Generally, this means the hostname can contain letters, digits, and hyphens, and must not start or end with a hyphen. Example: "my-instance", "db-1"',
      ).optional(),
      ttl: z.string().describe(
        "Optional. The Time To Live for the DNS record, in seconds. If not provided, a default of 30 seconds will be used.",
      ).optional(),
    }).describe("The specification for automatically creating a DNS record.")
      .optional(),
    serviceAttachmentUri: z.string().describe(
      "The resource path of a service attachment. Example: projects/{projectNumOrId}/regions/{region}/serviceAttachments/{resourceId}.",
    ).optional(),
  })).describe("The PSC configurations on producer side.").optional(),
  serviceClass: z.string().describe(
    "The service class identifier this ServiceConnectionMap is for. The user of ServiceConnectionMap create API needs to have networkconnectivity.serviceClasses.use IAM permission for the service class.",
  ).optional(),
  token: z.string().describe(
    "The token provided by the consumer. This token authenticates that the consumer can create a connection within the specified project and network.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  serviceConnectionMapId: z.string().describe(
    "Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/serviceConnectionMaps/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. If one is not provided, one will be generated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  consumerPscConfigs: z.array(z.object({
    consumerInstanceProject: z.string(),
    disableGlobalAccess: z.boolean(),
    ipVersion: z.string(),
    network: z.string(),
    producerInstanceId: z.string(),
    producerInstanceMetadata: z.record(z.string(), z.unknown()),
    project: z.string(),
    serviceAttachmentIpAddressMap: z.record(z.string(), z.unknown()),
    state: z.string(),
  })).optional(),
  consumerPscConnections: z.array(z.object({
    dnsAutomationStatus: z.object({
      error: z.object({
        code: z.number(),
        details: z.array(z.unknown()),
        message: z.string(),
      }),
      fqdn: z.string(),
      state: z.string(),
    }),
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
    forwardingRule: z.string(),
    gceOperation: z.string(),
    ip: z.string(),
    ipVersion: z.string(),
    network: z.string(),
    producerInstanceId: z.string(),
    producerInstanceMetadata: z.record(z.string(), z.unknown()),
    project: z.string(),
    pscConnectionId: z.string(),
    selectedSubnetwork: z.string(),
    serviceAttachmentUri: z.string(),
    state: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  infrastructure: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  producerPscConfigs: z.array(z.object({
    automatedDnsCreationSpec: z.object({
      dnsSuffix: z.string(),
      hostname: z.string(),
      ttl: z.string(),
    }),
    serviceAttachmentUri: z.string(),
  })).optional(),
  serviceClass: z.string().optional(),
  serviceClassUri: z.string().optional(),
  token: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  consumerPscConfigs: z.array(z.object({
    consumerInstanceProject: z.string().describe(
      "Required. The project ID or project number of the consumer project. This project is the one that the consumer uses to interact with the producer instance. From the perspective of a consumer who's created a producer instance, this is the project of the producer instance. Format: 'projects/' Eg. 'projects/consumer-project' or 'projects/1234'",
    ).optional(),
    disableGlobalAccess: z.boolean().describe(
      "This is used in PSC consumer ForwardingRule to control whether the PSC endpoint can be accessed from another region.",
    ).optional(),
    ipVersion: z.enum(["IP_VERSION_UNSPECIFIED", "IPV4", "IPV6"]).describe(
      "The requested IP version for the PSC connection.",
    ).optional(),
    network: z.string().describe(
      "The resource path of the consumer network where PSC connections are allowed to be created in. Note, this network does not need be in the ConsumerPscConfig.project in the case of SharedVPC. Example: projects/{projectNumOrId}/global/networks/{networkId}.",
    ).optional(),
    producerInstanceId: z.string().describe(
      "Immutable. Deprecated. Use producer_instance_metadata instead. An immutable identifier for the producer instance.",
    ).optional(),
    producerInstanceMetadata: z.record(z.string(), z.string()).describe(
      "Immutable. An immutable map for the producer instance metadata.",
    ).optional(),
    project: z.string().describe(
      "The consumer project where PSC connections are allowed to be created in.",
    ).optional(),
    serviceAttachmentIpAddressMap: z.record(z.string(), z.string()).describe(
      "Optional. A map to store mapping between customer vip and target service attachment. This field can be used to specify a static IP address for a PSC connection.",
    ).optional(),
    state: z.enum([
      "STATE_UNSPECIFIED",
      "VALID",
      "CONNECTION_POLICY_MISSING",
      "POLICY_LIMIT_REACHED",
      "CONSUMER_INSTANCE_PROJECT_NOT_ALLOWLISTED",
    ]).describe(
      "Output only. Overall state of PSC Connections management for this consumer psc config.",
    ).optional(),
  })).describe("The PSC configurations on consumer side.").optional(),
  description: z.string().describe("A description of this resource.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe("User-defined labels.")
    .optional(),
  name: z.string().describe(
    "Immutable. The name of a ServiceConnectionMap. Format: projects/{project}/locations/{location}/serviceConnectionMaps/{service_connection_map} See: https://google.aip.dev/122#fields-representing-resource-names",
  ).optional(),
  producerPscConfigs: z.array(z.object({
    automatedDnsCreationSpec: z.object({
      dnsSuffix: z.string().describe(
        'Required. The DNS suffix to use for the DNS record. Must end with a dot. This should be a valid DNS domain name as per RFC 1035. Each label (between dots) can contain letters, digits, and hyphens, and must not start or end with a hyphen. Example: "my-service.example.com.", "internal."',
      ).optional(),
      hostname: z.string().describe(
        'Required. The hostname (the first label of the FQDN) to use for the DNS record. This should be a valid DNS label as per RFC 1035. Generally, this means the hostname can contain letters, digits, and hyphens, and must not start or end with a hyphen. Example: "my-instance", "db-1"',
      ).optional(),
      ttl: z.string().describe(
        "Optional. The Time To Live for the DNS record, in seconds. If not provided, a default of 30 seconds will be used.",
      ).optional(),
    }).describe("The specification for automatically creating a DNS record.")
      .optional(),
    serviceAttachmentUri: z.string().describe(
      "The resource path of a service attachment. Example: projects/{projectNumOrId}/regions/{region}/serviceAttachments/{resourceId}.",
    ).optional(),
  })).describe("The PSC configurations on producer side.").optional(),
  serviceClass: z.string().describe(
    "The service class identifier this ServiceConnectionMap is for. The user of ServiceConnectionMap create API needs to have networkconnectivity.serviceClasses.use IAM permission for the service class.",
  ).optional(),
  token: z.string().describe(
    "The token provided by the consumer. This token authenticates that the consumer can create a connection within the specified project and network.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  serviceConnectionMapId: z.string().describe(
    "Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/serviceConnectionMaps/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. If one is not provided, one will be generated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Network Connectivity ServiceConnectionMaps. Registered at `@swamp/gcp/networkconnectivity/serviceconnectionmaps`. */
export const model = {
  type: "@swamp/gcp/networkconnectivity/serviceconnectionmaps",
  version: "2026.06.07.1",
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
      toVersion: "2026.04.04.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The ServiceConnectionMap resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a serviceConnectionMaps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["consumerPscConfigs"] !== undefined) {
          body["consumerPscConfigs"] = g["consumerPscConfigs"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["producerPscConfigs"] !== undefined) {
          body["producerPscConfigs"] = g["producerPscConfigs"];
        }
        if (g["serviceClass"] !== undefined) {
          body["serviceClass"] = g["serviceClass"];
        }
        if (g["token"] !== undefined) body["token"] = g["token"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["serviceConnectionMapId"] !== undefined) {
          body["serviceConnectionMapId"] = g["serviceConnectionMapId"];
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
          credentials,
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
      description: "Get a serviceConnectionMaps",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the serviceConnectionMaps",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update serviceConnectionMaps attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["consumerPscConfigs"] !== undefined) {
          body["consumerPscConfigs"] = g["consumerPscConfigs"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["producerPscConfigs"] !== undefined) {
          body["producerPscConfigs"] = g["producerPscConfigs"];
        }
        if (g["serviceClass"] !== undefined) {
          body["serviceClass"] = g["serviceClass"];
        }
        if (g["token"] !== undefined) body["token"] = g["token"];
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
          undefined,
          credentials,
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
      description: "Delete the serviceConnectionMaps",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the serviceConnectionMaps",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync serviceConnectionMaps state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            credentials,
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
    list: {
      description: "List serviceConnectionMaps resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters the results listed in the response.",
        ).optional(),
        orderBy: z.string().describe("Sort the results by a certain order.")
          .optional(),
        pageSize: z.number().describe(
          "The maximum number of results per page that should be returned.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "serviceConnectionMaps",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
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
        return { dataHandles, result: { count: items.length, nextPageToken } };
      },
    },
  },
};
