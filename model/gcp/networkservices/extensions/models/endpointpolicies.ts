// Auto-generated extension model for @swamp/gcp/networkservices/endpointpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Services EndpointPolicies.
 *
 * EndpointPolicy is a resource that helps apply desired configuration on the endpoints that match specific criteria. For example, this resource can be used to apply "authentication config" an all endpoints that serve on port 8080.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/endpointPolicies/${shortName}`;
}

const BASE_URL = "https://networkservices.googleapis.com/";

const GET_CONFIG = {
  "id": "networkservices.projects.locations.endpointPolicies.get",
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
  "id": "networkservices.projects.locations.endpointPolicies.create",
  "path": "v1/{+parent}/endpointPolicies",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "endpointPolicyId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "networkservices.projects.locations.endpointPolicies.patch",
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
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "networkservices.projects.locations.endpointPolicies.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "networkservices.projects.locations.endpointPolicies.list",
  "path": "v1/{+parent}/endpointPolicies",
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
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  authorizationPolicy: z.string().describe(
    "Optional. This field specifies the URL of AuthorizationPolicy resource that applies authorization policies to the inbound traffic at the matched endpoints. Refer to Authorization. If this field is not specified, authorization is disabled(no authz checks) for this endpoint.",
  ).optional(),
  clientTlsPolicy: z.string().describe(
    "Optional. A URL referring to a ClientTlsPolicy resource. ClientTlsPolicy can be set to specify the authentication for traffic from the proxy to the actual endpoints. More specifically, it is applied to the outgoing traffic from the proxy to the endpoint. This is typically used for sidecar model where the proxy identifies itself as endpoint to the control plane, with the connection between sidecar and endpoint requiring authentication. If this field is not set, authentication is disabled(open). Applicable only when EndpointPolicyType is SIDECAR_PROXY.",
  ).optional(),
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  endpointMatcher: z.object({
    metadataLabelMatcher: z.object({
      metadataLabelMatchCriteria: z.enum([
        "METADATA_LABEL_MATCH_CRITERIA_UNSPECIFIED",
        "MATCH_ANY",
        "MATCH_ALL",
      ]).describe(
        "Specifies how matching should be done. Supported values are: MATCH_ANY: At least one of the Labels specified in the matcher should match the metadata presented by xDS client. MATCH_ALL: The metadata presented by the xDS client should contain all of the labels specified here. The selection is determined based on the best match. For example, suppose there are three EndpointPolicy resources P1, P2 and P3 and if P1 has a the matcher as MATCH_ANY, P2 has MATCH_ALL, and P3 has MATCH_ALL. If a client with label connects, the config from P1 will be selected. If a client with label connects, the config from P2 will be selected. If a client with label connects, the config from P3 will be selected. If there is more than one best match, (for example, if a config P4 with selector exists and if a client with label connects), pick up the one with older creation time.",
      ).optional(),
      metadataLabels: z.array(z.object({
        labelName: z.string().describe(
          "Required. Label name presented as key in xDS Node Metadata.",
        ).optional(),
        labelValue: z.string().describe(
          "Required. Label value presented as value corresponding to the above key, in xDS Node Metadata.",
        ).optional(),
      })).describe(
        "The list of label value pairs that must match labels in the provided metadata based on filterMatchCriteria This list can have at most 64 entries. The list can be empty if the match criteria is MATCH_ANY, to specify a wildcard match (i.e this matches any client).",
      ).optional(),
    }).describe(
      "The matcher that is based on node metadata presented by xDS clients.",
    ).optional(),
  }).describe(
    "A definition of a matcher that selects endpoints to which the policies should be applied.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the EndpointPolicy resource.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the EndpointPolicy resource. It matches pattern `projects/{project}/locations/*/endpointPolicies/{endpoint_policy}`.",
  ).optional(),
  serverTlsPolicy: z.string().describe(
    "Optional. A URL referring to ServerTlsPolicy resource. ServerTlsPolicy is used to determine the authentication policy to be applied to terminate the inbound traffic at the identified backends. If this field is not set, authentication is disabled(open) for this endpoint.",
  ).optional(),
  trafficPortSelector: z.object({
    ports: z.array(z.string()).describe(
      "Optional. A list of ports. Can be port numbers or port range (example, [80-90] specifies all ports from 80 to 90, including 80 and 90) or named ports or * to specify all ports. If the list is empty, all ports are selected.",
    ).optional(),
  }).describe("Specification of a port-based selector.").optional(),
  type: z.enum([
    "ENDPOINT_POLICY_TYPE_UNSPECIFIED",
    "SIDECAR_PROXY",
    "GRPC_SERVER",
  ]).describe(
    "Required. The type of endpoint policy. This is primarily used to validate the configuration.",
  ).optional(),
  endpointPolicyId: z.string().describe(
    'Required. Short name of the EndpointPolicy resource to be created. E.g. "CustomECS".',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  authorizationPolicy: z.string().optional(),
  clientTlsPolicy: z.string().optional(),
  createTime: z.string().optional(),
  description: z.string().optional(),
  endpointMatcher: z.object({
    metadataLabelMatcher: z.object({
      metadataLabelMatchCriteria: z.string(),
      metadataLabels: z.array(z.object({
        labelName: z.string(),
        labelValue: z.string(),
      })),
    }),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  serverTlsPolicy: z.string().optional(),
  trafficPortSelector: z.object({
    ports: z.array(z.string()),
  }).optional(),
  type: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  authorizationPolicy: z.string().describe(
    "Optional. This field specifies the URL of AuthorizationPolicy resource that applies authorization policies to the inbound traffic at the matched endpoints. Refer to Authorization. If this field is not specified, authorization is disabled(no authz checks) for this endpoint.",
  ).optional(),
  clientTlsPolicy: z.string().describe(
    "Optional. A URL referring to a ClientTlsPolicy resource. ClientTlsPolicy can be set to specify the authentication for traffic from the proxy to the actual endpoints. More specifically, it is applied to the outgoing traffic from the proxy to the endpoint. This is typically used for sidecar model where the proxy identifies itself as endpoint to the control plane, with the connection between sidecar and endpoint requiring authentication. If this field is not set, authentication is disabled(open). Applicable only when EndpointPolicyType is SIDECAR_PROXY.",
  ).optional(),
  description: z.string().describe(
    "Optional. A free-text description of the resource. Max length 1024 characters.",
  ).optional(),
  endpointMatcher: z.object({
    metadataLabelMatcher: z.object({
      metadataLabelMatchCriteria: z.enum([
        "METADATA_LABEL_MATCH_CRITERIA_UNSPECIFIED",
        "MATCH_ANY",
        "MATCH_ALL",
      ]).describe(
        "Specifies how matching should be done. Supported values are: MATCH_ANY: At least one of the Labels specified in the matcher should match the metadata presented by xDS client. MATCH_ALL: The metadata presented by the xDS client should contain all of the labels specified here. The selection is determined based on the best match. For example, suppose there are three EndpointPolicy resources P1, P2 and P3 and if P1 has a the matcher as MATCH_ANY, P2 has MATCH_ALL, and P3 has MATCH_ALL. If a client with label connects, the config from P1 will be selected. If a client with label connects, the config from P2 will be selected. If a client with label connects, the config from P3 will be selected. If there is more than one best match, (for example, if a config P4 with selector exists and if a client with label connects), pick up the one with older creation time.",
      ).optional(),
      metadataLabels: z.array(z.object({
        labelName: z.string().describe(
          "Required. Label name presented as key in xDS Node Metadata.",
        ).optional(),
        labelValue: z.string().describe(
          "Required. Label value presented as value corresponding to the above key, in xDS Node Metadata.",
        ).optional(),
      })).describe(
        "The list of label value pairs that must match labels in the provided metadata based on filterMatchCriteria This list can have at most 64 entries. The list can be empty if the match criteria is MATCH_ANY, to specify a wildcard match (i.e this matches any client).",
      ).optional(),
    }).describe(
      "The matcher that is based on node metadata presented by xDS clients.",
    ).optional(),
  }).describe(
    "A definition of a matcher that selects endpoints to which the policies should be applied.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of label tags associated with the EndpointPolicy resource.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the EndpointPolicy resource. It matches pattern `projects/{project}/locations/*/endpointPolicies/{endpoint_policy}`.",
  ).optional(),
  serverTlsPolicy: z.string().describe(
    "Optional. A URL referring to ServerTlsPolicy resource. ServerTlsPolicy is used to determine the authentication policy to be applied to terminate the inbound traffic at the identified backends. If this field is not set, authentication is disabled(open) for this endpoint.",
  ).optional(),
  trafficPortSelector: z.object({
    ports: z.array(z.string()).describe(
      "Optional. A list of ports. Can be port numbers or port range (example, [80-90] specifies all ports from 80 to 90, including 80 and 90) or named ports or * to specify all ports. If the list is empty, all ports are selected.",
    ).optional(),
  }).describe("Specification of a port-based selector.").optional(),
  type: z.enum([
    "ENDPOINT_POLICY_TYPE_UNSPECIFIED",
    "SIDECAR_PROXY",
    "GRPC_SERVER",
  ]).describe(
    "Required. The type of endpoint policy. This is primarily used to validate the configuration.",
  ).optional(),
  endpointPolicyId: z.string().describe(
    'Required. Short name of the EndpointPolicy resource to be created. E.g. "CustomECS".',
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Services EndpointPolicies. Registered at `@swamp/gcp/networkservices/endpointpolicies`. */
export const model = {
  type: "@swamp/gcp/networkservices/endpointpolicies",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "EndpointPolicy is a resource that helps apply desired configuration on the en...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a endpointPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["authorizationPolicy"] !== undefined) {
          body["authorizationPolicy"] = g["authorizationPolicy"];
        }
        if (g["clientTlsPolicy"] !== undefined) {
          body["clientTlsPolicy"] = g["clientTlsPolicy"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["endpointMatcher"] !== undefined) {
          body["endpointMatcher"] = g["endpointMatcher"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["serverTlsPolicy"] !== undefined) {
          body["serverTlsPolicy"] = g["serverTlsPolicy"];
        }
        if (g["trafficPortSelector"] !== undefined) {
          body["trafficPortSelector"] = g["trafficPortSelector"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["endpointPolicyId"] !== undefined) {
          body["endpointPolicyId"] = g["endpointPolicyId"];
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
      description: "Get a endpointPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the endpointPolicies"),
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
      description: "Update endpointPolicies attributes",
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
        if (g["authorizationPolicy"] !== undefined) {
          body["authorizationPolicy"] = g["authorizationPolicy"];
        }
        if (g["clientTlsPolicy"] !== undefined) {
          body["clientTlsPolicy"] = g["clientTlsPolicy"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["endpointMatcher"] !== undefined) {
          body["endpointMatcher"] = g["endpointMatcher"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["serverTlsPolicy"] !== undefined) {
          body["serverTlsPolicy"] = g["serverTlsPolicy"];
        }
        if (g["trafficPortSelector"] !== undefined) {
          body["trafficPortSelector"] = g["trafficPortSelector"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
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
      description: "Delete the endpointPolicies",
      arguments: z.object({
        identifier: z.string().describe("The name of the endpointPolicies"),
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
      description: "Sync endpointPolicies state from GCP",
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
    list: {
      description: "List endpointPolicies resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "Maximum number of EndpointPolicies to return per call.",
        ).optional(),
        returnPartialSuccess: z.boolean().describe(
          "Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["returnPartialSuccess"] !== undefined) {
          params["returnPartialSuccess"] = String(args["returnPartialSuccess"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "endpointPolicies",
          (args.maxPages as number | undefined) ?? 10,
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
