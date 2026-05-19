// Auto-generated extension model for @swamp/gcp/compute/regionhealthaggregationpolicies
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine RegionHealthAggregationPolicies.
 *
 * Represents a health aggregation policy. A health aggregation policy resource defines a policy to aggregate health. For more information, see Health checks overview.
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
  "id": "compute.regionHealthAggregationPolicies.get",
  "path":
    "projects/{project}/regions/{region}/healthAggregationPolicies/{healthAggregationPolicy}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "region",
    "healthAggregationPolicy",
  ],
  "parameters": {
    "healthAggregationPolicy": {
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
  "id": "compute.regionHealthAggregationPolicies.insert",
  "path": "projects/{project}/regions/{region}/healthAggregationPolicies",
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
  "id": "compute.regionHealthAggregationPolicies.patch",
  "path":
    "projects/{project}/regions/{region}/healthAggregationPolicies/{healthAggregationPolicy}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "region",
    "healthAggregationPolicy",
  ],
  "parameters": {
    "healthAggregationPolicy": {
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
  "id": "compute.regionHealthAggregationPolicies.delete",
  "path":
    "projects/{project}/regions/{region}/healthAggregationPolicies/{healthAggregationPolicy}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "region",
    "healthAggregationPolicy",
  ],
  "parameters": {
    "healthAggregationPolicy": {
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

const GlobalArgsSchema = z.object({
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a HealthAggregationPolicy. An up-to-date fingerprint must be provided in order to patch the HealthAggregationPolicy; Otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the HealthAggregationPolicy.",
  ).optional(),
  healthyPercentThreshold: z.number().int().describe(
    'Can only be set if the policyType field isBACKEND_SERVICE_POLICY. Specifies the threshold (as a percentage) of healthy endpoints required in order to consider the aggregated health result HEALTHY. Defaults to 60. Must be in range [0, 100]. Not applicable if the policyType field isDNB_PUBLIC_IP_POLICY. Can be mutated. This field is optional, and will be set to the default if unspecified. Note that both this threshold and minHealthyThreshold must be satisfied in order for HEALTHY to be the aggregated result. "Endpoints" refers to network endpoints within a Network Endpoint Group or instances within an Instance Group.',
  ).optional(),
  minHealthyThreshold: z.number().int().describe(
    'Can only be set if the policyType field isBACKEND_SERVICE_POLICY. Specifies the minimum number of healthy endpoints required in order to consider the aggregated health result HEALTHY. Defaults to 1. Must be positive. Not applicable if the policyType field isDNB_PUBLIC_IP_POLICY. Can be mutated. This field is optional, and will be set to the default if unspecified. Note that both this threshold and healthyPercentThreshold must be satisfied in order for HEALTHY to be the aggregated result. "Endpoints" refers to network endpoints within a Network Endpoint Group or instances within an Instance Group.',
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  policyType: z.enum(["BACKEND_SERVICE_POLICY", "DNS_PUBLIC_IP_POLICY"])
    .describe(
      "Specifies the type of the healthAggregationPolicy. The only allowed value for global resources is DNS_PUBLIC_IP_POLICY. The only allowed value for regional resources is BACKEND_SERVICE_POLICY. Must be specified when the healthAggregationPolicy is created, and cannot be mutated.",
    ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the health aggregation policy resides. This field applies only to the regional resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  fingerprint: z.string().optional(),
  healthyPercentThreshold: z.number().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  minHealthyThreshold: z.number().optional(),
  name: z.string(),
  policyType: z.string().optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a HealthAggregationPolicy. An up-to-date fingerprint must be provided in order to patch the HealthAggregationPolicy; Otherwise, the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve the HealthAggregationPolicy.",
  ).optional(),
  healthyPercentThreshold: z.number().int().describe(
    'Can only be set if the policyType field isBACKEND_SERVICE_POLICY. Specifies the threshold (as a percentage) of healthy endpoints required in order to consider the aggregated health result HEALTHY. Defaults to 60. Must be in range [0, 100]. Not applicable if the policyType field isDNB_PUBLIC_IP_POLICY. Can be mutated. This field is optional, and will be set to the default if unspecified. Note that both this threshold and minHealthyThreshold must be satisfied in order for HEALTHY to be the aggregated result. "Endpoints" refers to network endpoints within a Network Endpoint Group or instances within an Instance Group.',
  ).optional(),
  minHealthyThreshold: z.number().int().describe(
    'Can only be set if the policyType field isBACKEND_SERVICE_POLICY. Specifies the minimum number of healthy endpoints required in order to consider the aggregated health result HEALTHY. Defaults to 1. Must be positive. Not applicable if the policyType field isDNB_PUBLIC_IP_POLICY. Can be mutated. This field is optional, and will be set to the default if unspecified. Note that both this threshold and healthyPercentThreshold must be satisfied in order for HEALTHY to be the aggregated result. "Endpoints" refers to network endpoints within a Network Endpoint Group or instances within an Instance Group.',
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  policyType: z.enum(["BACKEND_SERVICE_POLICY", "DNS_PUBLIC_IP_POLICY"])
    .describe(
      "Specifies the type of the healthAggregationPolicy. The only allowed value for global resources is DNS_PUBLIC_IP_POLICY. The only allowed value for regional resources is BACKEND_SERVICE_POLICY. Must be specified when the healthAggregationPolicy is created, and cannot be mutated.",
    ).optional(),
  region: z.string().describe(
    "Output only. [Output Only] URL of the region where the health aggregation policy resides. This field applies only to the regional resource. You must specify this field as part of the HTTP request URL. It is not settable as a field in the request body.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine RegionHealthAggregationPolicies. Registered at `@swamp/gcp/compute/regionhealthaggregationpolicies`. */
export const model = {
  type: "@swamp/gcp/compute/regionhealthaggregationpolicies",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a health aggregation policy. A health aggregation policy resource ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a regionHealthAggregationPolicies",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["healthyPercentThreshold"] !== undefined) {
          body["healthyPercentThreshold"] = g["healthyPercentThreshold"];
        }
        if (g["minHealthyThreshold"] !== undefined) {
          body["minHealthyThreshold"] = g["minHealthyThreshold"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["policyType"] !== undefined) body["policyType"] = g["policyType"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["healthAggregationPolicy"] = String(g["name"]);
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
      description: "Get a regionHealthAggregationPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the regionHealthAggregationPolicies",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["healthAggregationPolicy"] = args.identifier;
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
      description: "Update regionHealthAggregationPolicies attributes",
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
        params["healthAggregationPolicy"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["healthyPercentThreshold"] !== undefined) {
          body["healthyPercentThreshold"] = g["healthyPercentThreshold"];
        }
        if (g["minHealthyThreshold"] !== undefined) {
          body["minHealthyThreshold"] = g["minHealthyThreshold"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["policyType"] !== undefined) body["policyType"] = g["policyType"];
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
      description: "Delete the regionHealthAggregationPolicies",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the regionHealthAggregationPolicies",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["region"] !== undefined) params["region"] = String(g["region"]);
        params["healthAggregationPolicy"] = args.identifier;
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
      description: "Sync regionHealthAggregationPolicies state from GCP",
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
          params["healthAggregationPolicy"] = identifier;
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
