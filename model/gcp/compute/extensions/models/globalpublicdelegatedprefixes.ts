// Auto-generated extension model for @swamp/gcp/compute/globalpublicdelegatedprefixes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine GlobalPublicDelegatedPrefixes.
 *
 * A PublicDelegatedPrefix resource represents an IP block within a PublicAdvertisedPrefix that is configured within a single cloud scope (global or region). IPs in the block can be allocated to resources within that scope. Public delegated prefixes may be further broken up into smaller IP blocks in the same scope as the parent block.
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
  "id": "compute.globalPublicDelegatedPrefixes.get",
  "path":
    "projects/{project}/global/publicDelegatedPrefixes/{publicDelegatedPrefix}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "publicDelegatedPrefix",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "publicDelegatedPrefix": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.globalPublicDelegatedPrefixes.insert",
  "path": "projects/{project}/global/publicDelegatedPrefixes",
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

const PATCH_CONFIG = {
  "id": "compute.globalPublicDelegatedPrefixes.patch",
  "path":
    "projects/{project}/global/publicDelegatedPrefixes/{publicDelegatedPrefix}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "publicDelegatedPrefix",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "publicDelegatedPrefix": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.globalPublicDelegatedPrefixes.delete",
  "path":
    "projects/{project}/global/publicDelegatedPrefixes/{publicDelegatedPrefix}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "publicDelegatedPrefix",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "publicDelegatedPrefix": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "compute.globalPublicDelegatedPrefixes.list",
  "path": "projects/{project}/global/publicDelegatedPrefixes",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
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
    "returnPartialSuccess": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  allocatablePrefixLength: z.number().int().describe(
    "The allocatable prefix length supported by this public delegated prefix. This field is optional and cannot be set for prefixes in DELEGATION mode. It cannot be set for IPv4 prefixes either, and it always defaults to 32.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicDelegatedPrefix. An up-to-date fingerprint must be provided in order to update thePublicDelegatedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicDelegatedPrefix.",
  ).optional(),
  ipCidrRange: z.string().describe(
    "The IP address range, in CIDR format, represented by this public delegated prefix.",
  ).optional(),
  isLiveMigration: z.boolean().describe(
    "If true, the prefix will be live migrated.",
  ).optional(),
  mode: z.enum([
    "DELEGATION",
    "EXTERNAL_IPV6_FORWARDING_RULE_CREATION",
    "EXTERNAL_IPV6_SUBNETWORK_CREATION",
    "INTERNAL_IPV6_SUBNETWORK_CREATION",
  ]).describe("The public delegated prefix mode for IPv6 only.").optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  parentPrefix: z.string().describe(
    "The URL of parent prefix. Either PublicAdvertisedPrefix or PublicDelegatedPrefix.",
  ).optional(),
  publicDelegatedSubPrefixs: z.array(z.object({
    allocatablePrefixLength: z.number().int().describe(
      "The allocatable prefix length supported by this PublicDelegatedSubPrefix.",
    ).optional(),
    delegateeProject: z.string().describe(
      "Name of the project scoping this PublicDelegatedSubPrefix.",
    ).optional(),
    description: z.string().describe(
      "An optional description of this resource. Provide this property when you create the resource.",
    ).optional(),
    enableEnhancedIpv4Allocation: z.boolean().describe(
      "Output only. [Output Only] Whether this PDP supports enhanced IPv4 allocations. Applicable for IPv4 PDPs only.",
    ).optional(),
    ipCidrRange: z.string().describe(
      "The IP address range, in CIDR format, represented by this sub public delegated prefix.",
    ).optional(),
    ipv6AccessType: z.enum(["EXTERNAL", "INTERNAL"]).describe(
      "Output only. [Output Only] The internet access type for IPv6 Public Delegated Sub Prefixes. Inherited from parent prefix.",
    ).optional(),
    isAddress: z.boolean().describe(
      "Whether the sub prefix is delegated to create Address resources in the delegatee project.",
    ).optional(),
    mode: z.enum([
      "DELEGATION",
      "EXTERNAL_IPV6_FORWARDING_RULE_CREATION",
      "EXTERNAL_IPV6_SUBNETWORK_CREATION",
      "INTERNAL_IPV6_SUBNETWORK_CREATION",
    ]).describe("The PublicDelegatedSubPrefix mode for IPv6 only.").optional(),
    name: z.string().describe("The name of the sub public delegated prefix.")
      .optional(),
    region: z.string().describe(
      "Output only. [Output Only] The region of the sub public delegated prefix if it is regional. If absent, the sub prefix is global.",
    ).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).describe(
      "Output only. [Output Only] The status of the sub public delegated prefix.",
    ).optional(),
  })).describe(
    "The list of sub public delegated prefixes that exist for this public delegated prefix.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  allocatablePrefixLength: z.number().optional(),
  byoipApiVersion: z.string().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  enableEnhancedIpv4Allocation: z.boolean().optional(),
  fingerprint: z.string().optional(),
  id: z.string().optional(),
  ipCidrRange: z.string().optional(),
  ipv6AccessType: z.string().optional(),
  isLiveMigration: z.boolean().optional(),
  kind: z.string().optional(),
  mode: z.string().optional(),
  name: z.string(),
  parentPrefix: z.string().optional(),
  publicDelegatedSubPrefixs: z.array(z.object({
    allocatablePrefixLength: z.number(),
    delegateeProject: z.string(),
    description: z.string(),
    enableEnhancedIpv4Allocation: z.boolean(),
    ipCidrRange: z.string(),
    ipv6AccessType: z.string(),
    isAddress: z.boolean(),
    mode: z.string(),
    name: z.string(),
    region: z.string(),
    status: z.string(),
  })).optional(),
  region: z.string().optional(),
  selfLink: z.string().optional(),
  status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  allocatablePrefixLength: z.number().int().describe(
    "The allocatable prefix length supported by this public delegated prefix. This field is optional and cannot be set for prefixes in DELEGATION mode. It cannot be set for IPv4 prefixes either, and it always defaults to 32.",
  ).optional(),
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicDelegatedPrefix. An up-to-date fingerprint must be provided in order to update thePublicDelegatedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicDelegatedPrefix.",
  ).optional(),
  ipCidrRange: z.string().describe(
    "The IP address range, in CIDR format, represented by this public delegated prefix.",
  ).optional(),
  isLiveMigration: z.boolean().describe(
    "If true, the prefix will be live migrated.",
  ).optional(),
  mode: z.enum([
    "DELEGATION",
    "EXTERNAL_IPV6_FORWARDING_RULE_CREATION",
    "EXTERNAL_IPV6_SUBNETWORK_CREATION",
    "INTERNAL_IPV6_SUBNETWORK_CREATION",
  ]).describe("The public delegated prefix mode for IPv6 only.").optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  parentPrefix: z.string().describe(
    "The URL of parent prefix. Either PublicAdvertisedPrefix or PublicDelegatedPrefix.",
  ).optional(),
  publicDelegatedSubPrefixs: z.array(z.object({
    allocatablePrefixLength: z.number().int().describe(
      "The allocatable prefix length supported by this PublicDelegatedSubPrefix.",
    ).optional(),
    delegateeProject: z.string().describe(
      "Name of the project scoping this PublicDelegatedSubPrefix.",
    ).optional(),
    description: z.string().describe(
      "An optional description of this resource. Provide this property when you create the resource.",
    ).optional(),
    enableEnhancedIpv4Allocation: z.boolean().describe(
      "Output only. [Output Only] Whether this PDP supports enhanced IPv4 allocations. Applicable for IPv4 PDPs only.",
    ).optional(),
    ipCidrRange: z.string().describe(
      "The IP address range, in CIDR format, represented by this sub public delegated prefix.",
    ).optional(),
    ipv6AccessType: z.enum(["EXTERNAL", "INTERNAL"]).describe(
      "Output only. [Output Only] The internet access type for IPv6 Public Delegated Sub Prefixes. Inherited from parent prefix.",
    ).optional(),
    isAddress: z.boolean().describe(
      "Whether the sub prefix is delegated to create Address resources in the delegatee project.",
    ).optional(),
    mode: z.enum([
      "DELEGATION",
      "EXTERNAL_IPV6_FORWARDING_RULE_CREATION",
      "EXTERNAL_IPV6_SUBNETWORK_CREATION",
      "INTERNAL_IPV6_SUBNETWORK_CREATION",
    ]).describe("The PublicDelegatedSubPrefix mode for IPv6 only.").optional(),
    name: z.string().describe("The name of the sub public delegated prefix.")
      .optional(),
    region: z.string().describe(
      "Output only. [Output Only] The region of the sub public delegated prefix if it is regional. If absent, the sub prefix is global.",
    ).optional(),
    status: z.enum(["ACTIVE", "INACTIVE"]).describe(
      "Output only. [Output Only] The status of the sub public delegated prefix.",
    ).optional(),
  })).describe(
    "The list of sub public delegated prefixes that exist for this public delegated prefix.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine GlobalPublicDelegatedPrefixes. Registered at `@swamp/gcp/compute/globalpublicdelegatedprefixes`. */
export const model = {
  type: "@swamp/gcp/compute/globalpublicdelegatedprefixes",
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
        "A PublicDelegatedPrefix resource represents an IP block within a PublicAdvert...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a globalPublicDelegatedPrefixes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["allocatablePrefixLength"] !== undefined) {
          body["allocatablePrefixLength"] = g["allocatablePrefixLength"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["ipCidrRange"] !== undefined) {
          body["ipCidrRange"] = g["ipCidrRange"];
        }
        if (g["isLiveMigration"] !== undefined) {
          body["isLiveMigration"] = g["isLiveMigration"];
        }
        if (g["mode"] !== undefined) body["mode"] = g["mode"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentPrefix"] !== undefined) {
          body["parentPrefix"] = g["parentPrefix"];
        }
        if (g["publicDelegatedSubPrefixs"] !== undefined) {
          body["publicDelegatedSubPrefixs"] = g["publicDelegatedSubPrefixs"];
        }
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["publicDelegatedPrefix"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "project": projectId },
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
      description: "Get a globalPublicDelegatedPrefixes",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the globalPublicDelegatedPrefixes",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["publicDelegatedPrefix"] = args.identifier;
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
      description: "Update globalPublicDelegatedPrefixes attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        params["publicDelegatedPrefix"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["allocatablePrefixLength"] !== undefined) {
          body["allocatablePrefixLength"] = g["allocatablePrefixLength"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["ipCidrRange"] !== undefined) {
          body["ipCidrRange"] = g["ipCidrRange"];
        }
        if (g["isLiveMigration"] !== undefined) {
          body["isLiveMigration"] = g["isLiveMigration"];
        }
        if (g["mode"] !== undefined) body["mode"] = g["mode"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["parentPrefix"] !== undefined) {
          body["parentPrefix"] = g["parentPrefix"];
        }
        if (g["publicDelegatedSubPrefixs"] !== undefined) {
          body["publicDelegatedSubPrefixs"] = g["publicDelegatedSubPrefixs"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the globalPublicDelegatedPrefixes",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the globalPublicDelegatedPrefixes",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["publicDelegatedPrefix"] = args.identifier;
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
      description: "Sync globalPublicDelegatedPrefixes state from GCP",
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
          params["publicDelegatedPrefix"] = identifier;
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
