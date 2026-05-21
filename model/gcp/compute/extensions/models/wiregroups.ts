// Auto-generated extension model for @swamp/gcp/compute/wiregroups
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine WireGroups.
 *
 * A resource that represents a group of redundant wires.
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
  "id": "compute.wireGroups.get",
  "path":
    "projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups/{wireGroup}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "crossSiteNetwork",
    "wireGroup",
  ],
  "parameters": {
    "crossSiteNetwork": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "wireGroup": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.wireGroups.insert",
  "path":
    "projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
    "crossSiteNetwork",
  ],
  "parameters": {
    "crossSiteNetwork": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "compute.wireGroups.patch",
  "path":
    "projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups/{wireGroup}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "crossSiteNetwork",
    "wireGroup",
  ],
  "parameters": {
    "crossSiteNetwork": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
    "wireGroup": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.wireGroups.delete",
  "path":
    "projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups/{wireGroup}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "crossSiteNetwork",
    "wireGroup",
  ],
  "parameters": {
    "crossSiteNetwork": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "wireGroup": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.wireGroups.list",
  "path":
    "projects/{project}/global/crossSiteNetworks/{crossSiteNetwork}/wireGroups",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "crossSiteNetwork",
  ],
  "parameters": {
    "crossSiteNetwork": {
      "location": "path",
      "required": true,
    },
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
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  adminEnabled: z.boolean().describe(
    "Indicates whether the wires in the wire group are enabled. When false, the wires in the wire group are disabled. When true and when there is simultaneously no wire-specific override of `adminEnabled` to false, a given wire is enabled. Defaults to true.",
  ).optional(),
  description: z.string().describe("An optional description of the wire group.")
    .optional(),
  endpoints: z.record(
    z.string(),
    z.object({
      interconnects: z.record(
        z.string(),
        z.object({
          interconnect: z.string().describe(
            "Required. An Interconnect connection. You can specify the connection as a partial or full URL. If the connection is in a different project from the cross-site network, use a format that specifies the project. See the following examples of partial and full URLs: global/interconnects/NAME projects/PROJECT_ID/global/interconnects/NAME - https://compute.googleapis.com/compute/projects/PROJECT_ID/global/interconnects/NAME",
          ).optional(),
          vlanTags: z.array(z.unknown()).describe(
            "Required. To configure the wire group for VLAN mode, enter a VLAN tag, which is a number from `2` to `4093`. You can autoallocate a tag by entering `0`. To configure the wire group for port mode, enter `-1`. Review the following guidelines: - A VLAN tag must be unique for an Interconnect connection across all attachments and wire groups. - Both endpoints of a wire must use the same VLAN tag value. - Single wire and redundant type wire groups must have only one VLAN tag. - Port mode pseudowires must have a single VLAN tag with a value of `-1` for both endpoints. - Box and cross type wire groups must have two VLAN tags. The first is for the same-zone pseudowire, and the second is for the cross-zone pseudowire.",
          ).optional(),
        }),
      ).describe(
        "A map that contains the redundant Interconnect connections. Specify key-value pairs for the map as follows: - Key: an RFC1035 user-specified label. - Value: an Interconnect object.",
      ).optional(),
    }),
  ).describe(
    "A map that contains the logical endpoints of the wire group. Specify key-value pairs for the map as follows: - Key: an RFC1035 user-specified label. - Value: an Endpoint object.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  topology: z.object({
    endpoints: z.array(z.object({
      city: z.string().describe(
        "Output only. The InterconnectLocation.city (metropolitan area designator) that all interconnects are located in.",
      ).optional(),
      label: z.string().describe(
        "Output only. Endpoint label from the wire group.",
      ).optional(),
    })).describe(
      "Output only. Topology details for all endpoints in the wire group.",
    ).optional(),
  }).describe("Topology details for the wire group.").optional(),
  wireProperties: z.object({
    bandwidthAllocation: z.enum(["ALLOCATE_PER_WIRE", "SHARED_WITH_WIRE_GROUP"])
      .describe(
        "The configuration of the bandwidth allocation, one of the following: - ALLOCATE_PER_WIRE: configures a separate unmetered bandwidth allocation (and associated charges) for each wire in the group. - SHARED_WITH_WIRE_GROUP: this is the default behavior, which configures one unmetered bandwidth allocation for the wire group. The unmetered bandwidth is divided equally across each wire in the group, but dynamic throttling reallocates unused unmetered bandwidth from unused or underused wires to other wires in the group.",
      ).optional(),
    bandwidthUnmetered: z.string().describe(
      "The unmetered bandwidth in Gigabits per second, using decimal units. `10` is 10 Gbps, `100` is 100 Gbps. The bandwidth must be greater than 0.",
    ).optional(),
    faultResponse: z.enum(["DISABLE_PORT", "NONE"]).describe(
      "Response when a fault is detected in a pseudowire: - NONE: default. - DISABLE_PORT: set the port line protocol down when inline probes detect a fault. This setting is only permitted on port mode pseudowires.",
    ).optional(),
  }).describe("The properties of a wire.").optional(),
  crossSiteNetwork: z.string().describe(
    "The crossSiteNetwork for this resource",
  ),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). end_interface: MixerMutationRequestBuilder",
  ).optional(),
});

const StateSchema = z.object({
  adminEnabled: z.boolean().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  endpoints: z.record(z.string(), z.unknown()).optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  selfLink: z.string().optional(),
  topology: z.object({
    endpoints: z.array(z.object({
      city: z.string(),
      label: z.string(),
    })),
  }).optional(),
  wireProperties: z.object({
    bandwidthAllocation: z.string(),
    bandwidthUnmetered: z.string(),
    faultResponse: z.string(),
  }).optional(),
  wires: z.array(z.object({
    adminEnabled: z.boolean(),
    endpoints: z.array(z.object({
      interconnect: z.string(),
      vlanTag: z.number(),
    })),
    label: z.string(),
    wireProperties: z.object({
      bandwidthAllocation: z.string(),
      bandwidthUnmetered: z.string(),
      faultResponse: z.string(),
    }),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  adminEnabled: z.boolean().describe(
    "Indicates whether the wires in the wire group are enabled. When false, the wires in the wire group are disabled. When true and when there is simultaneously no wire-specific override of `adminEnabled` to false, a given wire is enabled. Defaults to true.",
  ).optional(),
  description: z.string().describe("An optional description of the wire group.")
    .optional(),
  endpoints: z.record(
    z.string(),
    z.object({
      interconnects: z.record(
        z.string(),
        z.object({
          interconnect: z.string().describe(
            "Required. An Interconnect connection. You can specify the connection as a partial or full URL. If the connection is in a different project from the cross-site network, use a format that specifies the project. See the following examples of partial and full URLs: global/interconnects/NAME projects/PROJECT_ID/global/interconnects/NAME - https://compute.googleapis.com/compute/projects/PROJECT_ID/global/interconnects/NAME",
          ).optional(),
          vlanTags: z.array(z.unknown()).describe(
            "Required. To configure the wire group for VLAN mode, enter a VLAN tag, which is a number from `2` to `4093`. You can autoallocate a tag by entering `0`. To configure the wire group for port mode, enter `-1`. Review the following guidelines: - A VLAN tag must be unique for an Interconnect connection across all attachments and wire groups. - Both endpoints of a wire must use the same VLAN tag value. - Single wire and redundant type wire groups must have only one VLAN tag. - Port mode pseudowires must have a single VLAN tag with a value of `-1` for both endpoints. - Box and cross type wire groups must have two VLAN tags. The first is for the same-zone pseudowire, and the second is for the cross-zone pseudowire.",
          ).optional(),
        }),
      ).describe(
        "A map that contains the redundant Interconnect connections. Specify key-value pairs for the map as follows: - Key: an RFC1035 user-specified label. - Value: an Interconnect object.",
      ).optional(),
    }),
  ).describe(
    "A map that contains the logical endpoints of the wire group. Specify key-value pairs for the map as follows: - Key: an RFC1035 user-specified label. - Value: an Endpoint object.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  topology: z.object({
    endpoints: z.array(z.object({
      city: z.string().describe(
        "Output only. The InterconnectLocation.city (metropolitan area designator) that all interconnects are located in.",
      ).optional(),
      label: z.string().describe(
        "Output only. Endpoint label from the wire group.",
      ).optional(),
    })).describe(
      "Output only. Topology details for all endpoints in the wire group.",
    ).optional(),
  }).describe("Topology details for the wire group.").optional(),
  wireProperties: z.object({
    bandwidthAllocation: z.enum(["ALLOCATE_PER_WIRE", "SHARED_WITH_WIRE_GROUP"])
      .describe(
        "The configuration of the bandwidth allocation, one of the following: - ALLOCATE_PER_WIRE: configures a separate unmetered bandwidth allocation (and associated charges) for each wire in the group. - SHARED_WITH_WIRE_GROUP: this is the default behavior, which configures one unmetered bandwidth allocation for the wire group. The unmetered bandwidth is divided equally across each wire in the group, but dynamic throttling reallocates unused unmetered bandwidth from unused or underused wires to other wires in the group.",
      ).optional(),
    bandwidthUnmetered: z.string().describe(
      "The unmetered bandwidth in Gigabits per second, using decimal units. `10` is 10 Gbps, `100` is 100 Gbps. The bandwidth must be greater than 0.",
    ).optional(),
    faultResponse: z.enum(["DISABLE_PORT", "NONE"]).describe(
      "Response when a fault is detected in a pseudowire: - NONE: default. - DISABLE_PORT: set the port line protocol down when inline probes detect a fault. This setting is only permitted on port mode pseudowires.",
    ).optional(),
  }).describe("The properties of a wire.").optional(),
  crossSiteNetwork: z.string().describe(
    "The crossSiteNetwork for this resource",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). end_interface: MixerMutationRequestBuilder",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine WireGroups. Registered at `@swamp/gcp/compute/wiregroups`. */
export const model = {
  type: "@swamp/gcp/compute/wiregroups",
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
      description: "A resource that represents a group of redundant wires.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a wireGroups",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["crossSiteNetwork"] !== undefined) {
          params["crossSiteNetwork"] = String(g["crossSiteNetwork"]);
        }
        const body: Record<string, unknown> = {};
        if (g["adminEnabled"] !== undefined) {
          body["adminEnabled"] = g["adminEnabled"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["endpoints"] !== undefined) body["endpoints"] = g["endpoints"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["topology"] !== undefined) body["topology"] = g["topology"];
        if (g["wireProperties"] !== undefined) {
          body["wireProperties"] = g["wireProperties"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["wireGroup"] = String(g["name"]);
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
              "crossSiteNetwork": String(g["crossSiteNetwork"] ?? ""),
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
      description: "Get a wireGroups",
      arguments: z.object({
        identifier: z.string().describe("The name of the wireGroups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["crossSiteNetwork"] !== undefined) {
          params["crossSiteNetwork"] = String(g["crossSiteNetwork"]);
        }
        params["wireGroup"] = args.identifier;
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
      description: "Update wireGroups attributes",
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
        if (g["crossSiteNetwork"] !== undefined) {
          params["crossSiteNetwork"] = String(g["crossSiteNetwork"]);
        } else if (existing["crossSiteNetwork"]) {
          params["crossSiteNetwork"] = String(existing["crossSiteNetwork"]);
        }
        params["wireGroup"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["adminEnabled"] !== undefined) {
          body["adminEnabled"] = g["adminEnabled"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["endpoints"] !== undefined) body["endpoints"] = g["endpoints"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["topology"] !== undefined) body["topology"] = g["topology"];
        if (g["wireProperties"] !== undefined) {
          body["wireProperties"] = g["wireProperties"];
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
      description: "Delete the wireGroups",
      arguments: z.object({
        identifier: z.string().describe("The name of the wireGroups"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["crossSiteNetwork"] !== undefined) {
          params["crossSiteNetwork"] = String(g["crossSiteNetwork"]);
        }
        params["wireGroup"] = args.identifier;
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
      description: "Sync wireGroups state from GCP",
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
          if (g["crossSiteNetwork"] !== undefined) {
            params["crossSiteNetwork"] = String(g["crossSiteNetwork"]);
          } else if (existing["crossSiteNetwork"]) {
            params["crossSiteNetwork"] = String(existing["crossSiteNetwork"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["wireGroup"] = identifier;
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
