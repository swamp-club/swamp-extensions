// Auto-generated extension model for @swamp/gcp/compute/regionnetworkendpointgroups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine RegionNetworkEndpointGroups.
 *
 * Represents a collection of network endpoints. A network endpoint group (NEG) defines how a set of endpoints should be reached, whether they are reachable, and where they are located. For more information about using NEGs for different use cases, seeNetwork endpoint groups overview. Note: Use the following APIs to manage network endpoint groups: - To manage NEGs with zonal scope (such as zonal NEGs, hybrid connectivity NEGs): zonal API - To manage NEGs with regional scope (such as regional internet NEGs, serverless NEGs, Private Service Connect NEGs): regional API - To manage NEGs with global scope (such as global internet NEGs):global API
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.regionNetworkEndpointGroups.get",
  "path":
    "projects/{project}/regions/{region}/networkEndpointGroups/{networkEndpointGroup}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "networkEndpointGroup",
  ],
  "parameters": {
    "networkEndpointGroup": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "region": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.regionNetworkEndpointGroups.insert",
  "path": "projects/{project}/regions/{region}/networkEndpointGroups",
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

const DELETE_CONFIG = {
  "id": "compute.regionNetworkEndpointGroups.delete",
  "path":
    "projects/{project}/regions/{region}/networkEndpointGroups/{networkEndpointGroup}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "networkEndpointGroup",
  ],
  "parameters": {
    "networkEndpointGroup": {
      "location": "path",
      "required": true,
    },
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

const LIST_CONFIG = {
  "id": "compute.regionNetworkEndpointGroups.list",
  "path": "projects/{project}/regions/{region}/networkEndpointGroups",
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Metadata defined as annotations on the network endpoint group.",
  ).optional(),
  appEngine: z.object({
    service: z.string().describe(
      "Optional serving service. The service name is case-sensitive and must be 1-63 characters long. Example value: default, my-service.",
    ).optional(),
    urlMask: z.string().describe(
      'An URL mask is one of the main components of the Cloud Function. A template to parse service and version fields from a request URL. URL mask allows for routing to multiple App Engine services without having to create multiple Network Endpoint Groups and backend services. For example, the request URLsfoo1-dot-appname.appspot.com/v1 andfoo1-dot-appname.appspot.com/v2 can be backed by the same Serverless NEG with URL mask-dot-appname.appspot.com/. The URL mask will parse them to { service = "foo1", version = "v1" } and { service = "foo1", version = "v2" } respectively.',
    ).optional(),
    version: z.string().describe(
      "Optional serving version. The version name is case-sensitive and must be 1-100 characters long. Example value: v1, v2.",
    ).optional(),
  }).describe(
    "Configuration for an App Engine network endpoint group (NEG). The service is optional, may be provided explicitly or in the URL mask. The version is optional and can only be provided explicitly or in the URL mask when service is present. Note: App Engine service must be in the same project and located in the same region as the Serverless NEG.",
  ).optional(),
  cloudFunction: z.object({
    function: z.string().describe(
      "A user-defined name of the Cloud Function. The function name is case-sensitive and must be 1-63 characters long. Example value: func1.",
    ).optional(),
    urlMask: z.string().describe(
      'An URL mask is one of the main components of the Cloud Function. A template to parse function field from a request URL. URL mask allows for routing to multiple Cloud Functions without having to create multiple Network Endpoint Groups and backend services. For example, request URLs mydomain.com/function1 andmydomain.com/function2 can be backed by the same Serverless NEG with URL mask /. The URL mask will parse them to { function = "function1" } and{ function = "function2" } respectively.',
    ).optional(),
  }).describe(
    "Configuration for a Cloud Function network endpoint group (NEG). The function must be provided explicitly or in the URL mask. Note: Cloud Function must be in the same project and located in the same region as the Serverless NEG.",
  ).optional(),
  cloudRun: z.object({
    service: z.string().describe(
      'Cloud Run service is the main resource of Cloud Run. The service must be 1-63 characters long, and comply withRFC1035. Example value: "run-service".',
    ).optional(),
    tag: z.string().describe(
      'Optional Cloud Run tag represents the "named-revision" to provide additional fine-grained traffic routing information. The tag must be 1-63 characters long, and comply withRFC1035. Example value: "revision-0010".',
    ).optional(),
    urlMask: z.string().describe(
      'An URL mask is one of the main components of the Cloud Function. A template to parse  and fields from a request URL. URL mask allows for routing to multiple Run services without having to create multiple network endpoint groups and backend services. For example, request URLs foo1.domain.com/bar1 andfoo1.domain.com/bar2 can be backed by the same Serverless Network Endpoint Group (NEG) with URL mask.domain.com/. The URL mask will parse them to { service="bar1", tag="foo1" } and { service="bar2", tag="foo2" } respectively.',
    ).optional(),
  }).describe(
    "Configuration for a Cloud Run network endpoint group (NEG). The service must be provided explicitly or in the URL mask. The tag is optional, may be provided explicitly or in the URL mask. Note: Cloud Run service must be in the same project and located in the same region as the Serverless NEG.",
  ).optional(),
  defaultPort: z.number().int().describe(
    "The default port used if the port number is not specified in the network endpoint. Optional. If the network endpoint type is either GCE_VM_IP,SERVERLESS or PRIVATE_SERVICE_CONNECT, this field must not be specified.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  name: z.string().describe(
    "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
  ).optional(),
  network: z.string().describe(
    "The URL of the network to which all network endpoints in the NEG belong. For networkEndpointType GCE_VM_IP_PORT,GCE_VM_IP_PORTMAP or NON_GCP_PRIVATE_IP_PORT, if this field is not specified, a default network will be used. This field cannot be set for NEGs with networkEndpointType set toSERVERLESS or PRIVATE_SERVICE_CONNECT and for global NEGs. For all other network endpoint types, this field is required.",
  ).optional(),
  networkEndpointType: z.enum([
    "GCE_VM_IP",
    "GCE_VM_IP_PORT",
    "GCE_VM_IP_PORTMAP",
    "INTERNET_FQDN_PORT",
    "INTERNET_IP_PORT",
    "NON_GCP_PRIVATE_IP_PORT",
    "PRIVATE_SERVICE_CONNECT",
    "SERVERLESS",
  ]).describe(
    "Type of network endpoints in this network endpoint group. Can be one ofGCE_VM_IP, GCE_VM_IP_PORT,NON_GCP_PRIVATE_IP_PORT, INTERNET_FQDN_PORT,INTERNET_IP_PORT, SERVERLESS,PRIVATE_SERVICE_CONNECT, GCE_VM_IP_PORTMAP.",
  ).optional(),
  pscData: z.object({
    consumerPscAddress: z.string().describe(
      "Output only. [Output Only] Address allocated from given subnetwork for PSC. This IP address acts as a VIP for a PSC NEG, allowing it to act as an endpoint in L7 PSC-XLB.",
    ).optional(),
    producerPort: z.number().int().describe(
      "The psc producer port is used to connect PSC NEG with specific port on the PSC Producer side; should only be used for the PRIVATE_SERVICE_CONNECT NEG type",
    ).optional(),
    pscConnectionId: z.string().describe(
      "Output only. [Output Only] The PSC connection id of the PSC Network Endpoint Group Consumer.",
    ).optional(),
    pscConnectionStatus: z.enum([
      "ACCEPTED",
      "CLOSED",
      "NEEDS_ATTENTION",
      "PENDING",
      "REJECTED",
      "STATUS_UNSPECIFIED",
    ]).describe(
      "Output only. [Output Only] The connection status of the PSC Forwarding Rule.",
    ).optional(),
  }).describe(
    "All data that is specifically relevant to only network endpoint groups of type PRIVATE_SERVICE_CONNECT.",
  ).optional(),
  pscTargetService: z.string().describe(
    "The target service url used to set up private service connection to a Google API or a PSC Producer Service Attachment. An example value is: asia-northeast3-cloudkms.googleapis.com. Optional. Only valid when networkEndpointType isPRIVATE_SERVICE_CONNECT.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] The URL of theregion where the network endpoint group is located.",
  ).optional(),
  subnetwork: z.string().describe(
    "Optional URL of the subnetwork to which all network endpoints in the NEG belong.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  appEngine: z.object({
    service: z.string(),
    urlMask: z.string(),
    version: z.string(),
  }).optional(),
  cloudFunction: z.object({
    function: z.string(),
    urlMask: z.string(),
  }).optional(),
  cloudRun: z.object({
    service: z.string(),
    tag: z.string(),
    urlMask: z.string(),
  }).optional(),
  creationTimestamp: z.string().optional(),
  defaultPort: z.number().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  network: z.string().optional(),
  networkEndpointType: z.string().optional(),
  pscData: z.object({
    consumerPscAddress: z.string(),
    producerPort: z.number(),
    pscConnectionId: z.string(),
    pscConnectionStatus: z.string(),
  }).optional(),
  pscTargetService: z.string().optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  size: z.number().optional(),
  subnetwork: z.string().optional(),
  zone: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Metadata defined as annotations on the network endpoint group.",
  ).optional(),
  appEngine: z.object({
    service: z.string().describe(
      "Optional serving service. The service name is case-sensitive and must be 1-63 characters long. Example value: default, my-service.",
    ).optional(),
    urlMask: z.string().describe(
      'An URL mask is one of the main components of the Cloud Function. A template to parse service and version fields from a request URL. URL mask allows for routing to multiple App Engine services without having to create multiple Network Endpoint Groups and backend services. For example, the request URLsfoo1-dot-appname.appspot.com/v1 andfoo1-dot-appname.appspot.com/v2 can be backed by the same Serverless NEG with URL mask-dot-appname.appspot.com/. The URL mask will parse them to { service = "foo1", version = "v1" } and { service = "foo1", version = "v2" } respectively.',
    ).optional(),
    version: z.string().describe(
      "Optional serving version. The version name is case-sensitive and must be 1-100 characters long. Example value: v1, v2.",
    ).optional(),
  }).describe(
    "Configuration for an App Engine network endpoint group (NEG). The service is optional, may be provided explicitly or in the URL mask. The version is optional and can only be provided explicitly or in the URL mask when service is present. Note: App Engine service must be in the same project and located in the same region as the Serverless NEG.",
  ).optional(),
  cloudFunction: z.object({
    function: z.string().describe(
      "A user-defined name of the Cloud Function. The function name is case-sensitive and must be 1-63 characters long. Example value: func1.",
    ).optional(),
    urlMask: z.string().describe(
      'An URL mask is one of the main components of the Cloud Function. A template to parse function field from a request URL. URL mask allows for routing to multiple Cloud Functions without having to create multiple Network Endpoint Groups and backend services. For example, request URLs mydomain.com/function1 andmydomain.com/function2 can be backed by the same Serverless NEG with URL mask /. The URL mask will parse them to { function = "function1" } and{ function = "function2" } respectively.',
    ).optional(),
  }).describe(
    "Configuration for a Cloud Function network endpoint group (NEG). The function must be provided explicitly or in the URL mask. Note: Cloud Function must be in the same project and located in the same region as the Serverless NEG.",
  ).optional(),
  cloudRun: z.object({
    service: z.string().describe(
      'Cloud Run service is the main resource of Cloud Run. The service must be 1-63 characters long, and comply withRFC1035. Example value: "run-service".',
    ).optional(),
    tag: z.string().describe(
      'Optional Cloud Run tag represents the "named-revision" to provide additional fine-grained traffic routing information. The tag must be 1-63 characters long, and comply withRFC1035. Example value: "revision-0010".',
    ).optional(),
    urlMask: z.string().describe(
      'An URL mask is one of the main components of the Cloud Function. A template to parse  and fields from a request URL. URL mask allows for routing to multiple Run services without having to create multiple network endpoint groups and backend services. For example, request URLs foo1.domain.com/bar1 andfoo1.domain.com/bar2 can be backed by the same Serverless Network Endpoint Group (NEG) with URL mask.domain.com/. The URL mask will parse them to { service="bar1", tag="foo1" } and { service="bar2", tag="foo2" } respectively.',
    ).optional(),
  }).describe(
    "Configuration for a Cloud Run network endpoint group (NEG). The service must be provided explicitly or in the URL mask. The tag is optional, may be provided explicitly or in the URL mask. Note: Cloud Run service must be in the same project and located in the same region as the Serverless NEG.",
  ).optional(),
  defaultPort: z.number().int().describe(
    "The default port used if the port number is not specified in the network endpoint. Optional. If the network endpoint type is either GCE_VM_IP,SERVERLESS or PRIVATE_SERVICE_CONNECT, this field must not be specified.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  name: z.string().describe(
    "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
  ).optional(),
  network: z.string().describe(
    "The URL of the network to which all network endpoints in the NEG belong. For networkEndpointType GCE_VM_IP_PORT,GCE_VM_IP_PORTMAP or NON_GCP_PRIVATE_IP_PORT, if this field is not specified, a default network will be used. This field cannot be set for NEGs with networkEndpointType set toSERVERLESS or PRIVATE_SERVICE_CONNECT and for global NEGs. For all other network endpoint types, this field is required.",
  ).optional(),
  networkEndpointType: z.enum([
    "GCE_VM_IP",
    "GCE_VM_IP_PORT",
    "GCE_VM_IP_PORTMAP",
    "INTERNET_FQDN_PORT",
    "INTERNET_IP_PORT",
    "NON_GCP_PRIVATE_IP_PORT",
    "PRIVATE_SERVICE_CONNECT",
    "SERVERLESS",
  ]).describe(
    "Type of network endpoints in this network endpoint group. Can be one ofGCE_VM_IP, GCE_VM_IP_PORT,NON_GCP_PRIVATE_IP_PORT, INTERNET_FQDN_PORT,INTERNET_IP_PORT, SERVERLESS,PRIVATE_SERVICE_CONNECT, GCE_VM_IP_PORTMAP.",
  ).optional(),
  pscData: z.object({
    consumerPscAddress: z.string().describe(
      "Output only. [Output Only] Address allocated from given subnetwork for PSC. This IP address acts as a VIP for a PSC NEG, allowing it to act as an endpoint in L7 PSC-XLB.",
    ).optional(),
    producerPort: z.number().int().describe(
      "The psc producer port is used to connect PSC NEG with specific port on the PSC Producer side; should only be used for the PRIVATE_SERVICE_CONNECT NEG type",
    ).optional(),
    pscConnectionId: z.string().describe(
      "Output only. [Output Only] The PSC connection id of the PSC Network Endpoint Group Consumer.",
    ).optional(),
    pscConnectionStatus: z.enum([
      "ACCEPTED",
      "CLOSED",
      "NEEDS_ATTENTION",
      "PENDING",
      "REJECTED",
      "STATUS_UNSPECIFIED",
    ]).describe(
      "Output only. [Output Only] The connection status of the PSC Forwarding Rule.",
    ).optional(),
  }).describe(
    "All data that is specifically relevant to only network endpoint groups of type PRIVATE_SERVICE_CONNECT.",
  ).optional(),
  pscTargetService: z.string().describe(
    "The target service url used to set up private service connection to a Google API or a PSC Producer Service Attachment. An example value is: asia-northeast3-cloudkms.googleapis.com. Optional. Only valid when networkEndpointType isPRIVATE_SERVICE_CONNECT.",
  ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] The URL of theregion where the network endpoint group is located.",
  ).optional(),
  subnetwork: z.string().describe(
    "Optional URL of the subnetwork to which all network endpoints in the NEG belong.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine RegionNetworkEndpointGroups. Registered at `@swamp/gcp/compute/regionnetworkendpointgroups`. */
export const model = {
  type: "@swamp/gcp/compute/regionnetworkendpointgroups",
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
      toVersion: "2026.05.15.1",
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
        "Represents a collection of network endpoints. A network endpoint group (NEG) ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a regionNetworkEndpointGroups",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["appEngine"] !== undefined) body["appEngine"] = g["appEngine"];
        if (g["cloudFunction"] !== undefined) {
          body["cloudFunction"] = g["cloudFunction"];
        }
        if (g["cloudRun"] !== undefined) body["cloudRun"] = g["cloudRun"];
        if (g["defaultPort"] !== undefined) {
          body["defaultPort"] = g["defaultPort"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["networkEndpointType"] !== undefined) {
          body["networkEndpointType"] = g["networkEndpointType"];
        }
        if (g["pscData"] !== undefined) body["pscData"] = g["pscData"];
        if (g["pscTargetService"] !== undefined) {
          body["pscTargetService"] = g["pscTargetService"];
        }
        if (g["subnetwork"] !== undefined) body["subnetwork"] = g["subnetwork"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["networkEndpointGroup"] = String(g["name"]);
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
      description: "Get a regionNetworkEndpointGroups",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the regionNetworkEndpointGroups",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["networkEndpointGroup"] = args.identifier;
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
    delete: {
      description: "Delete the regionNetworkEndpointGroups",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the regionNetworkEndpointGroups",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["networkEndpointGroup"] = args.identifier;
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
      description: "Sync regionNetworkEndpointGroups state from GCP",
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
          params["networkEndpointGroup"] = identifier;
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
    attach_network_endpoints: {
      description: "attach network endpoints",
      arguments: z.object({
        networkEndpoints: z.any().optional(),
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
        params["networkEndpointGroup"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["networkEndpoints"] !== undefined) {
          body["networkEndpoints"] = args["networkEndpoints"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionNetworkEndpointGroups.attachNetworkEndpoints",
            "path":
              "projects/{project}/regions/{region}/networkEndpointGroups/{networkEndpointGroup}/attachNetworkEndpoints",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "networkEndpointGroup"],
            "parameters": {
              "networkEndpointGroup": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    detach_network_endpoints: {
      description: "detach network endpoints",
      arguments: z.object({
        networkEndpoints: z.any().optional(),
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
        params["networkEndpointGroup"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["networkEndpoints"] !== undefined) {
          body["networkEndpoints"] = args["networkEndpoints"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionNetworkEndpointGroups.detachNetworkEndpoints",
            "path":
              "projects/{project}/regions/{region}/networkEndpointGroups/{networkEndpointGroup}/detachNetworkEndpoints",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "networkEndpointGroup"],
            "parameters": {
              "networkEndpointGroup": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "requestId": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    list_network_endpoints: {
      description: "list network endpoints",
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
        params["networkEndpointGroup"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.regionNetworkEndpointGroups.listNetworkEndpoints",
            "path":
              "projects/{project}/regions/{region}/networkEndpointGroups/{networkEndpointGroup}/listNetworkEndpoints",
            "httpMethod": "POST",
            "parameterOrder": ["project", "region", "networkEndpointGroup"],
            "parameters": {
              "filter": { "location": "query" },
              "maxResults": { "location": "query" },
              "networkEndpointGroup": { "location": "path", "required": true },
              "orderBy": { "location": "query" },
              "pageToken": { "location": "query" },
              "project": { "location": "path", "required": true },
              "region": { "location": "path", "required": true },
              "returnPartialSuccess": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
