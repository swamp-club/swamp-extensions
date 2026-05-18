// Auto-generated extension model for @swamp/gcp/compute/licenses
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine Licenses.
 *
 * Represents a License resource. A License represents billing and aggregate usage data forpublic andmarketplace images. *Caution* This resource is intended for use only by third-party partners who are creatingCloud Marketplace images.
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
  "id": "compute.licenses.get",
  "path": "projects/{project}/global/licenses/{license}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "license",
  ],
  "parameters": {
    "license": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.licenses.insert",
  "path": "projects/{project}/global/licenses",
  "httpMethod": "POST",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "compute.licenses.update",
  "path": "projects/{project}/global/licenses/{license}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "license",
  ],
  "parameters": {
    "license": {
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.licenses.delete",
  "path": "projects/{project}/global/licenses/{license}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "license",
  ],
  "parameters": {
    "license": {
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
  },
} as const;

const GlobalArgsSchema = z.object({
  allowedReplacementLicenses: z.array(z.string()).describe(
    "Specifies licenseCodes of licenses that can replace this license. Note: such replacements are allowed even if removable_from_disk is false.",
  ).optional(),
  appendableToDisk: z.boolean().describe(
    "If true, this license can be appended to an existing disk's set of licenses.",
  ).optional(),
  description: z.string().describe(
    "An optional textual description of the resource; provided by the client when the resource is created.",
  ).optional(),
  incompatibleLicenses: z.array(z.string()).describe(
    "Specifies licenseCodes of licenses that are incompatible with this license. If a license is incompatible with this license, it cannot be attached to the same disk or image.",
  ).optional(),
  minimumRetention: z.object({
    nanos: z.number().int().describe(
      "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
  ).optional(),
  multiTenantOnly: z.boolean().describe(
    "If true, this license can only be used on VMs on multi tenant nodes.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. The name must be 1-63 characters long and comply withRFC1035.",
    ).optional(),
  osLicense: z.boolean().describe(
    "If true, indicates this is an OS license. Only one OS license can be attached to a disk or image at a time.",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the license. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional license params.").optional(),
  removableFromDisk: z.boolean().describe(
    "If true, this license can be removed from a disk's set of licenses, with no replacement license needed.",
  ).optional(),
  requiredCoattachedLicenses: z.array(z.string()).describe(
    "Specifies the set of permissible coattached licenseCodes of licenses that satisfy the coattachment requirement of this license. At least one license from the set must be attached to the same disk or image as this license.",
  ).optional(),
  resourceRequirements: z.object({
    minGuestCpuCount: z.number().int().describe(
      "[Input Only] Deprecated. This field no longer reflects the minimum number of guest cpus required to use the Instance.",
    ).optional(),
    minMemoryMb: z.number().int().describe(
      "[Input Only] Deprecated. This field no longer reflects the minimum memory required to use the Instance.",
    ).optional(),
  }).optional(),
  soleTenantOnly: z.boolean().describe(
    "If true, this license can only be used on VMs on sole tenant nodes.",
  ).optional(),
  transferable: z.boolean().describe(
    "If false, licenses will not be copied from the source resource when creating an image from a disk, disk from snapshot, or snapshot from disk.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  allowedReplacementLicenses: z.array(z.string()).optional(),
  appendableToDisk: z.boolean().optional(),
  chargesUseFee: z.boolean().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  id: z.string().optional(),
  incompatibleLicenses: z.array(z.string()).optional(),
  kind: z.string().optional(),
  licenseCode: z.string().optional(),
  minimumRetention: z.object({
    nanos: z.number(),
    seconds: z.string(),
  }).optional(),
  multiTenantOnly: z.boolean().optional(),
  name: z.string(),
  osLicense: z.boolean().optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.unknown()),
  }).optional(),
  removableFromDisk: z.boolean().optional(),
  requiredCoattachedLicenses: z.array(z.string()).optional(),
  resourceRequirements: z.object({
    minGuestCpuCount: z.number(),
    minMemoryMb: z.number(),
  }).optional(),
  selfLink: z.string().optional(),
  selfLinkWithId: z.string().optional(),
  soleTenantOnly: z.boolean().optional(),
  transferable: z.boolean().optional(),
  updateTimestamp: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  allowedReplacementLicenses: z.array(z.string()).describe(
    "Specifies licenseCodes of licenses that can replace this license. Note: such replacements are allowed even if removable_from_disk is false.",
  ).optional(),
  appendableToDisk: z.boolean().describe(
    "If true, this license can be appended to an existing disk's set of licenses.",
  ).optional(),
  description: z.string().describe(
    "An optional textual description of the resource; provided by the client when the resource is created.",
  ).optional(),
  incompatibleLicenses: z.array(z.string()).describe(
    "Specifies licenseCodes of licenses that are incompatible with this license. If a license is incompatible with this license, it cannot be attached to the same disk or image.",
  ).optional(),
  minimumRetention: z.object({
    nanos: z.number().int().describe(
      "Span of time that's a fraction of a second at nanosecond resolution. Durations less than one second are represented with a 0 `seconds` field and a positive `nanos` field. Must be from 0 to 999,999,999 inclusive.",
    ).optional(),
    seconds: z.string().describe(
      "Span of time at a resolution of a second. Must be from 0 to 315,576,000,000 inclusive. Note: these bounds are computed from: 60 sec/min * 60 min/hr * 24 hr/day * 365.25 days/year * 10000 years",
    ).optional(),
  }).describe(
    'A Duration represents a fixed-length span of time represented as a count of seconds and fractions of seconds at nanosecond resolution. It is independent of any calendar and concepts like "day" or "month". Range is approximately 10,000 years.',
  ).optional(),
  multiTenantOnly: z.boolean().describe(
    "If true, this license can only be used on VMs on multi tenant nodes.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. The name must be 1-63 characters long and comply withRFC1035.",
    ).optional(),
  osLicense: z.boolean().describe(
    "If true, indicates this is an OS license. Only one OS license can be attached to a disk or image at a time.",
  ).optional(),
  params: z.object({
    resourceManagerTags: z.record(z.string(), z.string()).describe(
      "Input only. Resource manager tags to be bound to the license. Tag keys and values have the same definition as resource manager tags. Keys and values can be either in numeric format, such as `tagKeys/{tag_key_id}` and `tagValues/{tag_value_id}` or in namespaced format such as `{org_id|project_id}/{tag_key_short_name}` and `{tag_value_short_name}`. The field is ignored (both PUT & PATCH) when empty.",
    ).optional(),
  }).describe("Additional license params.").optional(),
  removableFromDisk: z.boolean().describe(
    "If true, this license can be removed from a disk's set of licenses, with no replacement license needed.",
  ).optional(),
  requiredCoattachedLicenses: z.array(z.string()).describe(
    "Specifies the set of permissible coattached licenseCodes of licenses that satisfy the coattachment requirement of this license. At least one license from the set must be attached to the same disk or image as this license.",
  ).optional(),
  resourceRequirements: z.object({
    minGuestCpuCount: z.number().int().describe(
      "[Input Only] Deprecated. This field no longer reflects the minimum number of guest cpus required to use the Instance.",
    ).optional(),
    minMemoryMb: z.number().int().describe(
      "[Input Only] Deprecated. This field no longer reflects the minimum memory required to use the Instance.",
    ).optional(),
  }).optional(),
  soleTenantOnly: z.boolean().describe(
    "If true, this license can only be used on VMs on sole tenant nodes.",
  ).optional(),
  transferable: z.boolean().describe(
    "If false, licenses will not be copied from the source resource when creating an image from a disk, disk from snapshot, or snapshot from disk.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine Licenses. Registered at `@swamp/gcp/compute/licenses`. */
export const model = {
  type: "@swamp/gcp/compute/licenses",
  version: "2026.05.18.2",
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
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a License resource. A License represents billing and aggregate usa...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a licenses",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["allowedReplacementLicenses"] !== undefined) {
          body["allowedReplacementLicenses"] = g["allowedReplacementLicenses"];
        }
        if (g["appendableToDisk"] !== undefined) {
          body["appendableToDisk"] = g["appendableToDisk"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["incompatibleLicenses"] !== undefined) {
          body["incompatibleLicenses"] = g["incompatibleLicenses"];
        }
        if (g["minimumRetention"] !== undefined) {
          body["minimumRetention"] = g["minimumRetention"];
        }
        if (g["multiTenantOnly"] !== undefined) {
          body["multiTenantOnly"] = g["multiTenantOnly"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["osLicense"] !== undefined) body["osLicense"] = g["osLicense"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["removableFromDisk"] !== undefined) {
          body["removableFromDisk"] = g["removableFromDisk"];
        }
        if (g["requiredCoattachedLicenses"] !== undefined) {
          body["requiredCoattachedLicenses"] = g["requiredCoattachedLicenses"];
        }
        if (g["resourceRequirements"] !== undefined) {
          body["resourceRequirements"] = g["resourceRequirements"];
        }
        if (g["soleTenantOnly"] !== undefined) {
          body["soleTenantOnly"] = g["soleTenantOnly"];
        }
        if (g["transferable"] !== undefined) {
          body["transferable"] = g["transferable"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) params["license"] = String(g["name"]);
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
      description: "Get a licenses",
      arguments: z.object({
        identifier: z.string().describe("The name of the licenses"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["license"] = args.identifier;
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
      description: "Update licenses attributes",
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
        params["license"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["allowedReplacementLicenses"] !== undefined) {
          body["allowedReplacementLicenses"] = g["allowedReplacementLicenses"];
        }
        if (g["appendableToDisk"] !== undefined) {
          body["appendableToDisk"] = g["appendableToDisk"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["incompatibleLicenses"] !== undefined) {
          body["incompatibleLicenses"] = g["incompatibleLicenses"];
        }
        if (g["minimumRetention"] !== undefined) {
          body["minimumRetention"] = g["minimumRetention"];
        }
        if (g["multiTenantOnly"] !== undefined) {
          body["multiTenantOnly"] = g["multiTenantOnly"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["osLicense"] !== undefined) body["osLicense"] = g["osLicense"];
        if (g["params"] !== undefined) body["params"] = g["params"];
        if (g["removableFromDisk"] !== undefined) {
          body["removableFromDisk"] = g["removableFromDisk"];
        }
        if (g["requiredCoattachedLicenses"] !== undefined) {
          body["requiredCoattachedLicenses"] = g["requiredCoattachedLicenses"];
        }
        if (g["resourceRequirements"] !== undefined) {
          body["resourceRequirements"] = g["resourceRequirements"];
        }
        if (g["soleTenantOnly"] !== undefined) {
          body["soleTenantOnly"] = g["soleTenantOnly"];
        }
        if (g["transferable"] !== undefined) {
          body["transferable"] = g["transferable"];
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
      description: "Delete the licenses",
      arguments: z.object({
        identifier: z.string().describe("The name of the licenses"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["license"] = args.identifier;
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
      description: "Sync licenses state from GCP",
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
          params["license"] = identifier;
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
