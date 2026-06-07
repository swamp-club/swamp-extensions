// Auto-generated extension model for @swamp/gcp/compute/packetmirrorings
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine PacketMirrorings.
 *
 * Represents a Packet Mirroring resource. Packet Mirroring clones the traffic of specified instances in your Virtual Private Cloud (VPC) network and forwards it to a collector destination, such as an instance group of an internal TCP/UDP load balancer, for analysis or examination. For more information about setting up Packet Mirroring, seeUsing Packet Mirroring.
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

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.packetMirrorings.get",
  "path":
    "projects/{project}/regions/{region}/packetMirrorings/{packetMirroring}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "packetMirroring",
  ],
  "parameters": {
    "packetMirroring": {
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
  "id": "compute.packetMirrorings.insert",
  "path": "projects/{project}/regions/{region}/packetMirrorings",
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
  "id": "compute.packetMirrorings.patch",
  "path":
    "projects/{project}/regions/{region}/packetMirrorings/{packetMirroring}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "packetMirroring",
  ],
  "parameters": {
    "packetMirroring": {
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

const DELETE_CONFIG = {
  "id": "compute.packetMirrorings.delete",
  "path":
    "projects/{project}/regions/{region}/packetMirrorings/{packetMirroring}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "packetMirroring",
  ],
  "parameters": {
    "packetMirroring": {
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
  "id": "compute.packetMirrorings.list",
  "path": "projects/{project}/regions/{region}/packetMirrorings",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  collectorIlb: z.object({
    canonicalUrl: z.string().describe(
      "Output only. [Output Only] Unique identifier for the forwarding rule; defined by the server.",
    ).optional(),
    url: z.string().describe(
      "Resource URL to the forwarding rule representing the ILB configured as destination of the mirrored traffic.",
    ).optional(),
  }).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  enable: z.enum(["FALSE", "TRUE"]).describe(
    "Indicates whether or not this packet mirroring takes effect. If set to FALSE, this packet mirroring policy will not be enforced on the network. The default is TRUE.",
  ).optional(),
  filter: z.object({
    IPProtocols: z.array(z.string()).describe(
      "Protocols that apply as filter on mirrored traffic. If no protocols are specified, all traffic that matches the specified CIDR ranges is mirrored. If neither cidrRanges nor IPProtocols is specified, all IPv4 traffic is mirrored.",
    ).optional(),
    cidrRanges: z.array(z.string()).describe(
      'One or more IPv4 or IPv6 CIDR ranges that apply as filters on the source (ingress) or destination (egress) IP in the IP header. If no ranges are specified, all IPv4 traffic that matches the specified IPProtocols is mirrored. If neither cidrRanges nor IPProtocols is specified, all IPv4 traffic is mirrored. To mirror all IPv4 and IPv6 traffic, use "0.0.0.0/0,::/0".',
    ).optional(),
    direction: z.enum(["BOTH", "EGRESS", "INGRESS"]).describe(
      "Direction of traffic to mirror, either INGRESS, EGRESS, or BOTH. The default is BOTH.",
    ).optional(),
  }).optional(),
  mirroredResources: z.object({
    instances: z.array(z.object({
      canonicalUrl: z.string().describe(
        "Output only. [Output Only] Unique identifier for the instance; defined by the server.",
      ).optional(),
      url: z.string().describe(
        "Resource URL to the virtual machine instance which is being mirrored.",
      ).optional(),
    })).describe(
      "A set of virtual machine instances that are being mirrored. They must live in zones contained in the same region as this packetMirroring. Note that this config will apply only to those network interfaces of the Instances that belong to the network specified in this packetMirroring. You may specify a maximum of 50 Instances.",
    ).optional(),
    subnetworks: z.array(z.object({
      canonicalUrl: z.string().describe(
        "Output only. [Output Only] Unique identifier for the subnetwork; defined by the server.",
      ).optional(),
      url: z.string().describe(
        "Resource URL to the subnetwork for which traffic from/to all VM instances will be mirrored.",
      ).optional(),
    })).describe(
      "A set of subnetworks for which traffic from/to all VM instances will be mirrored. They must live in the same region as this packetMirroring. You may specify a maximum of 5 subnetworks.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "A set of mirrored tags. Traffic from/to all VM instances that have one or more of these tags will be mirrored.",
    ).optional(),
  }).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ),
  network: z.object({
    canonicalUrl: z.string().describe(
      "Output only. [Output Only] Unique identifier for the network; defined by the server.",
    ).optional(),
    url: z.string().describe("URL of the network resource.").optional(),
  }).optional(),
  priority: z.number().int().describe(
    "The priority of applying this configuration. Priority is used to break ties in cases where there is more than one matching rule. In the case of two rules that apply for a given Instance, the one with the lowest-numbered priority value wins. Default value is 1000. Valid range is 0 through 65535.",
  ).optional(),
  region: z.string().describe(
    "[Output Only] URI of the region where the packetMirroring resides.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  collectorIlb: z.object({
    canonicalUrl: z.string(),
    url: z.string(),
  }).optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  enable: z.string().optional(),
  filter: z.object({
    IPProtocols: z.array(z.string()),
    cidrRanges: z.array(z.string()),
    direction: z.string(),
  }).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  mirroredResources: z.object({
    instances: z.array(z.object({
      canonicalUrl: z.string(),
      url: z.string(),
    })),
    subnetworks: z.array(z.object({
      canonicalUrl: z.string(),
      url: z.string(),
    })),
    tags: z.array(z.string()),
  }).optional(),
  name: z.string(),
  network: z.object({
    canonicalUrl: z.string(),
    url: z.string(),
  }).optional(),
  priority: z.number().optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  collectorIlb: z.object({
    canonicalUrl: z.string().describe(
      "Output only. [Output Only] Unique identifier for the forwarding rule; defined by the server.",
    ).optional(),
    url: z.string().describe(
      "Resource URL to the forwarding rule representing the ILB configured as destination of the mirrored traffic.",
    ).optional(),
  }).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  enable: z.enum(["FALSE", "TRUE"]).describe(
    "Indicates whether or not this packet mirroring takes effect. If set to FALSE, this packet mirroring policy will not be enforced on the network. The default is TRUE.",
  ).optional(),
  filter: z.object({
    IPProtocols: z.array(z.string()).describe(
      "Protocols that apply as filter on mirrored traffic. If no protocols are specified, all traffic that matches the specified CIDR ranges is mirrored. If neither cidrRanges nor IPProtocols is specified, all IPv4 traffic is mirrored.",
    ).optional(),
    cidrRanges: z.array(z.string()).describe(
      'One or more IPv4 or IPv6 CIDR ranges that apply as filters on the source (ingress) or destination (egress) IP in the IP header. If no ranges are specified, all IPv4 traffic that matches the specified IPProtocols is mirrored. If neither cidrRanges nor IPProtocols is specified, all IPv4 traffic is mirrored. To mirror all IPv4 and IPv6 traffic, use "0.0.0.0/0,::/0".',
    ).optional(),
    direction: z.enum(["BOTH", "EGRESS", "INGRESS"]).describe(
      "Direction of traffic to mirror, either INGRESS, EGRESS, or BOTH. The default is BOTH.",
    ).optional(),
  }).optional(),
  mirroredResources: z.object({
    instances: z.array(z.object({
      canonicalUrl: z.string().describe(
        "Output only. [Output Only] Unique identifier for the instance; defined by the server.",
      ).optional(),
      url: z.string().describe(
        "Resource URL to the virtual machine instance which is being mirrored.",
      ).optional(),
    })).describe(
      "A set of virtual machine instances that are being mirrored. They must live in zones contained in the same region as this packetMirroring. Note that this config will apply only to those network interfaces of the Instances that belong to the network specified in this packetMirroring. You may specify a maximum of 50 Instances.",
    ).optional(),
    subnetworks: z.array(z.object({
      canonicalUrl: z.string().describe(
        "Output only. [Output Only] Unique identifier for the subnetwork; defined by the server.",
      ).optional(),
      url: z.string().describe(
        "Resource URL to the subnetwork for which traffic from/to all VM instances will be mirrored.",
      ).optional(),
    })).describe(
      "A set of subnetworks for which traffic from/to all VM instances will be mirrored. They must live in the same region as this packetMirroring. You may specify a maximum of 5 subnetworks.",
    ).optional(),
    tags: z.array(z.string()).describe(
      "A set of mirrored tags. Traffic from/to all VM instances that have one or more of these tags will be mirrored.",
    ).optional(),
  }).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource; provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  network: z.object({
    canonicalUrl: z.string().describe(
      "Output only. [Output Only] Unique identifier for the network; defined by the server.",
    ).optional(),
    url: z.string().describe("URL of the network resource.").optional(),
  }).optional(),
  priority: z.number().int().describe(
    "The priority of applying this configuration. Priority is used to break ties in cases where there is more than one matching rule. In the case of two rules that apply for a given Instance, the one with the lowest-numbered priority value wins. Default value is 1000. Valid range is 0 through 65535.",
  ).optional(),
  region: z.string().describe(
    "[Output Only] URI of the region where the packetMirroring resides.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Compute Engine PacketMirrorings. Registered at `@swamp/gcp/compute/packetmirrorings`. */
export const model = {
  type: "@swamp/gcp/compute/packetmirrorings",
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
      description:
        "Represents a Packet Mirroring resource. Packet Mirroring clones the traffic o...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a packetMirrorings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["collectorIlb"] !== undefined) {
          body["collectorIlb"] = g["collectorIlb"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enable"] !== undefined) body["enable"] = g["enable"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["mirroredResources"] !== undefined) {
          body["mirroredResources"] = g["mirroredResources"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
        if (g["priority"] !== undefined) body["priority"] = g["priority"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["packetMirroring"] = String(g["name"]);
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
      description: "Get a packetMirrorings",
      arguments: z.object({
        identifier: z.string().describe("The name of the packetMirrorings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["packetMirroring"] = args.identifier;
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
      description: "Update packetMirrorings attributes",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        else if (existing["region"]) {
          params["region"] = String(existing["region"]);
        }
        params["packetMirroring"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["collectorIlb"] !== undefined) {
          body["collectorIlb"] = g["collectorIlb"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["enable"] !== undefined) body["enable"] = g["enable"];
        if (g["filter"] !== undefined) body["filter"] = g["filter"];
        if (g["mirroredResources"] !== undefined) {
          body["mirroredResources"] = g["mirroredResources"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["network"] !== undefined) body["network"] = g["network"];
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
      description: "Delete the packetMirrorings",
      arguments: z.object({
        identifier: z.string().describe("The name of the packetMirrorings"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["packetMirroring"] = args.identifier;
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
      description: "Sync packetMirrorings state from GCP",
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
          params["packetMirroring"] = identifier;
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
      description: "List packetMirrorings resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters resources listed in the response. Most",
        ).optional(),
        maxResults: z.number().describe(
          "The maximum number of results per page that should be returned.",
        ).optional(),
        orderBy: z.string().describe(
          "Sorts list results by a certain order. By default, results",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Opt-in for partial success behavior which provides partial results in case",
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
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "items",
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
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            "id": "compute.packetMirrorings.testIamPermissions",
            "path":
              "projects/{project}/regions/{region}/packetMirrorings/{resource}/testIamPermissions",
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
