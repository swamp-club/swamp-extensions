// Auto-generated extension model for @swamp/gcp/compute/serviceattachments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine ServiceAttachments.
 *
 * Represents a ServiceAttachment resource. A service attachment represents a service that a producer has exposed. It encapsulates the load balancer which fronts the service runs and a list of NAT IP ranges that the producers uses to represent the consumers connecting to the service.
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
  "id": "compute.serviceAttachments.get",
  "path":
    "projects/{project}/regions/{region}/serviceAttachments/{serviceAttachment}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "serviceAttachment",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "serviceAttachment": {
      "location": "path",
      "required": true,
    },
    "showNatIps": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.serviceAttachments.insert",
  "path": "projects/{project}/regions/{region}/serviceAttachments",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.serviceAttachments.patch",
  "path":
    "projects/{project}/regions/{region}/serviceAttachments/{serviceAttachment}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "serviceAttachment",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "serviceAttachment": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.serviceAttachments.delete",
  "path":
    "projects/{project}/regions/{region}/serviceAttachments/{serviceAttachment}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "serviceAttachment",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "serviceAttachment": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.serviceAttachments.list",
  "path": "projects/{project}/regions/{region}/serviceAttachments",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  connectionPreference: z.enum([
    "ACCEPT_AUTOMATIC",
    "ACCEPT_MANUAL",
    "CONNECTION_PREFERENCE_UNSPECIFIED",
  ]).describe(
    "The connection preference of service attachment. The value can be set to ACCEPT_AUTOMATIC. An ACCEPT_AUTOMATIC service attachment is one that always accepts the connection from consumer forwarding rules.",
  ).optional(),
  consumerAcceptLists: z.array(z.object({
    connectionLimit: z.number().int().describe(
      "The value of the limit to set. For endpoint_url, the limit should be no more than 1.",
    ).optional(),
    endpointUrl: z.string().describe("The URL for the PSC endpoint to accept")
      .optional(),
    networkUrl: z.string().describe(
      "The network URL for the network to set the limit for.",
    ).optional(),
    projectIdOrNum: z.string().describe(
      "The project id or number for the project to set the limit for.",
    ).optional(),
  })).describe(
    "Specifies which consumer projects or networks are allowed to connect to the service attachment. Each project or network has a connection limit. A given service attachment can manage connections at either the project or network level. Therefore, both the accept and reject lists for a given service attachment must contain either only projects or only networks or only endpoints.",
  ).optional(),
  consumerRejectLists: z.array(z.string()).describe(
    "Specifies a list of projects or networks that are not allowed to connect to this service attachment. The project can be specified using its project ID or project number and the network can be specified using its URL. A given service attachment can manage connections at either the project or network level. Therefore, both the reject and accept lists for a given service attachment must contain either only projects or only networks.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  domainNames: z.array(z.string()).describe(
    'If specified, the domain name will be used during the integration between the PSC connected endpoints and the Cloud DNS. For example, this is a valid domain name: "p.mycompany.com.". Current max number of domain names supported is 1.',
  ).optional(),
  enableProxyProtocol: z.boolean().describe(
    "If true, enable the proxy protocol which is for supplying client TCP/IP address data in TCP connections that traverse proxies on their way to destination servers.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ServiceAttachment. An up-to-date fingerprint must be provided in order to patch/update the ServiceAttachment; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the ServiceAttachment.",
  ).optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Metadata of the service attachment.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ),
  natSubnets: z.array(z.string()).describe(
    "An array of URLs where each entry is the URL of a subnet provided by the service producer to use for NAT in this service attachment.",
  ).optional(),
  propagatedConnectionLimit: z.number().int().describe(
    "The number of consumer spokes that connected Private Service Connect endpoints can be propagated to through Network Connectivity Center. This limit lets the service producer limit how many propagated Private Service Connect connections can be established to this service attachment from a single consumer. If the connection preference of the service attachment is ACCEPT_MANUAL, the limit applies to each project or network that is listed in the consumer accept list. If the connection preference of the service attachment is ACCEPT_AUTOMATIC, the limit applies to each project that contains a connected endpoint. If unspecified, the default propagated connection limit is 250.",
  ).optional(),
  pscServiceAttachmentId: z.object({
    high: z.string().optional(),
    low: z.string().optional(),
  }).optional(),
  reconcileConnections: z.boolean().describe(
    "This flag determines whether a consumer accept/reject list change can reconcile the statuses of existing ACCEPTED or REJECTED PSC endpoints. - If false, connection policy update will only affect existing PENDING PSC endpoints. Existing ACCEPTED/REJECTED endpoints will remain untouched regardless how the connection policy is modified. - If true, update will affect both PENDING and ACCEPTED/REJECTED PSC endpoints. For example, an ACCEPTED PSC endpoint will be moved to REJECTED if its project is added to the reject list. For newly created service attachment, this boolean defaults to false.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the service attachment resides. This field applies only to the region resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  targetService: z.string().describe(
    "The URL of a service serving the endpoint identified by this service attachment.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  connectedEndpoints: z.array(z.object({
    consumerNetwork: z.string(),
    endpoint: z.string(),
    endpointWithId: z.string(),
    natIps: z.array(z.string()),
    propagatedConnectionCount: z.number(),
    pscConnectionId: z.string(),
    status: z.string(),
  })).optional(),
  connectionPreference: z.string().optional(),
  consumerAcceptLists: z.array(z.object({
    connectionLimit: z.number(),
    endpointUrl: z.string(),
    networkUrl: z.string(),
    projectIdOrNum: z.string(),
  })).optional(),
  consumerRejectLists: z.array(z.string()).optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  domainNames: z.array(z.string()).optional(),
  enableProxyProtocol: z.boolean().optional(),
  fingerprint: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  natSubnets: z.array(z.string()).optional(),
  producerForwardingRule: z.string().optional(),
  propagatedConnectionLimit: z.number().optional(),
  pscServiceAttachmentId: z.object({
    high: z.string(),
    low: z.string(),
  }).optional(),
  reconcileConnections: z.boolean().optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  targetService: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  connectionPreference: z.enum([
    "ACCEPT_AUTOMATIC",
    "ACCEPT_MANUAL",
    "CONNECTION_PREFERENCE_UNSPECIFIED",
  ]).describe(
    "The connection preference of service attachment. The value can be set to ACCEPT_AUTOMATIC. An ACCEPT_AUTOMATIC service attachment is one that always accepts the connection from consumer forwarding rules.",
  ).optional(),
  consumerAcceptLists: z.array(z.object({
    connectionLimit: z.number().int().describe(
      "The value of the limit to set. For endpoint_url, the limit should be no more than 1.",
    ).optional(),
    endpointUrl: z.string().describe("The URL for the PSC endpoint to accept")
      .optional(),
    networkUrl: z.string().describe(
      "The network URL for the network to set the limit for.",
    ).optional(),
    projectIdOrNum: z.string().describe(
      "The project id or number for the project to set the limit for.",
    ).optional(),
  })).describe(
    "Specifies which consumer projects or networks are allowed to connect to the service attachment. Each project or network has a connection limit. A given service attachment can manage connections at either the project or network level. Therefore, both the accept and reject lists for a given service attachment must contain either only projects or only networks or only endpoints.",
  ).optional(),
  consumerRejectLists: z.array(z.string()).describe(
    "Specifies a list of projects or networks that are not allowed to connect to this service attachment. The project can be specified using its project ID or project number and the network can be specified using its URL. A given service attachment can manage connections at either the project or network level. Therefore, both the reject and accept lists for a given service attachment must contain either only projects or only networks.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  domainNames: z.array(z.string()).describe(
    'If specified, the domain name will be used during the integration between the PSC connected endpoints and the Cloud DNS. For example, this is a valid domain name: "p.mycompany.com.". Current max number of domain names supported is 1.',
  ).optional(),
  enableProxyProtocol: z.boolean().describe(
    "If true, enable the proxy protocol which is for supplying client TCP/IP address data in TCP connections that traverse proxies on their way to destination servers.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a ServiceAttachment. An up-to-date fingerprint must be provided in order to patch/update the ServiceAttachment; otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the ServiceAttachment.",
  ).optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Metadata of the service attachment.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  natSubnets: z.array(z.string()).describe(
    "An array of URLs where each entry is the URL of a subnet provided by the service producer to use for NAT in this service attachment.",
  ).optional(),
  propagatedConnectionLimit: z.number().int().describe(
    "The number of consumer spokes that connected Private Service Connect endpoints can be propagated to through Network Connectivity Center. This limit lets the service producer limit how many propagated Private Service Connect connections can be established to this service attachment from a single consumer. If the connection preference of the service attachment is ACCEPT_MANUAL, the limit applies to each project or network that is listed in the consumer accept list. If the connection preference of the service attachment is ACCEPT_AUTOMATIC, the limit applies to each project that contains a connected endpoint. If unspecified, the default propagated connection limit is 250.",
  ).optional(),
  pscServiceAttachmentId: z.object({
    high: z.string().optional(),
    low: z.string().optional(),
  }).optional(),
  reconcileConnections: z.boolean().describe(
    "This flag determines whether a consumer accept/reject list change can reconcile the statuses of existing ACCEPTED or REJECTED PSC endpoints. - If false, connection policy update will only affect existing PENDING PSC endpoints. Existing ACCEPTED/REJECTED endpoints will remain untouched regardless how the connection policy is modified. - If true, update will affect both PENDING and ACCEPTED/REJECTED PSC endpoints. For example, an ACCEPTED PSC endpoint will be moved to REJECTED if its project is added to the reject list. For newly created service attachment, this boolean defaults to false.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the service attachment resides. This field applies only to the region resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  targetService: z.string().describe(
    "The URL of a service serving the endpoint identified by this service attachment.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine ServiceAttachments. Registered at `@swamp/gcp/compute/serviceattachments`. */
export const model = {
  type: "@swamp/gcp/compute/serviceattachments",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a ServiceAttachment resource. A service attachment represents a se...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a serviceAttachments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["connectionPreference"] !== undefined) {
          body["connectionPreference"] = g["connectionPreference"];
        }
        if (g["consumerAcceptLists"] !== undefined) {
          body["consumerAcceptLists"] = g["consumerAcceptLists"];
        }
        if (g["consumerRejectLists"] !== undefined) {
          body["consumerRejectLists"] = g["consumerRejectLists"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["domainNames"] !== undefined) {
          body["domainNames"] = g["domainNames"];
        }
        if (g["enableProxyProtocol"] !== undefined) {
          body["enableProxyProtocol"] = g["enableProxyProtocol"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["natSubnets"] !== undefined) body["natSubnets"] = g["natSubnets"];
        if (g["propagatedConnectionLimit"] !== undefined) {
          body["propagatedConnectionLimit"] = g["propagatedConnectionLimit"];
        }
        if (g["pscServiceAttachmentId"] !== undefined) {
          body["pscServiceAttachmentId"] = g["pscServiceAttachmentId"];
        }
        if (g["reconcileConnections"] !== undefined) {
          body["reconcileConnections"] = g["reconcileConnections"];
        }
        if (g["targetService"] !== undefined) {
          body["targetService"] = g["targetService"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["serviceAttachment"] = String(g["name"]);
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
              "project": projectId,
              "region": String(g["region"] ?? ""),
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
      description: "Get a serviceAttachments",
      arguments: z.object({
        identifier: z.string().describe("The name of the serviceAttachments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["serviceAttachment"] = args.identifier;
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
      description: "Update serviceAttachments attributes",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
        params["serviceAttachment"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["connectionPreference"] !== undefined) {
          body["connectionPreference"] = g["connectionPreference"];
        }
        if (g["consumerAcceptLists"] !== undefined) {
          body["consumerAcceptLists"] = g["consumerAcceptLists"];
        }
        if (g["consumerRejectLists"] !== undefined) {
          body["consumerRejectLists"] = g["consumerRejectLists"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["domainNames"] !== undefined) {
          body["domainNames"] = g["domainNames"];
        }
        if (g["enableProxyProtocol"] !== undefined) {
          body["enableProxyProtocol"] = g["enableProxyProtocol"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["natSubnets"] !== undefined) body["natSubnets"] = g["natSubnets"];
        if (g["propagatedConnectionLimit"] !== undefined) {
          body["propagatedConnectionLimit"] = g["propagatedConnectionLimit"];
        }
        if (g["pscServiceAttachmentId"] !== undefined) {
          body["pscServiceAttachmentId"] = g["pscServiceAttachmentId"];
        }
        if (g["reconcileConnections"] !== undefined) {
          body["reconcileConnections"] = g["reconcileConnections"];
        }
        if (g["targetService"] !== undefined) {
          body["targetService"] = g["targetService"];
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
      description: "Delete the serviceAttachments",
      arguments: z.object({
        identifier: z.string().describe("The name of the serviceAttachments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["serviceAttachment"] = args.identifier;
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
      description: "Sync serviceAttachments state from GCP",
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
          if (g["region"] !== undefined) params["region"] = String(g["region"]);
          else if (existing["region"]) {
            params["region"] = String(existing["region"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["serviceAttachment"] = identifier;
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.serviceAttachments.getIamPolicy",
            "path":
              "projects/{project}/regions/{region}/serviceAttachments/{resource}/getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "optionsRequestedPolicyVersion": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        bindings: z.any().optional(),
        etag: z.any().optional(),
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["bindings"] !== undefined) body["bindings"] = args["bindings"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.serviceAttachments.setIamPolicy",
            "path":
              "projects/{project}/regions/{region}/serviceAttachments/{resource}/setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.serviceAttachments.testIamPermissions",
            "path":
              "projects/{project}/regions/{region}/serviceAttachments/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "resource"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
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
