// Auto-generated extension model for @swamp/gcp/compute/publicadvertisedprefixes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine PublicAdvertisedPrefixes.
 *
 * A public advertised prefix represents an aggregated IP prefix or netblock which customers bring to cloud. The IP prefix is a single unit of route advertisement and is announced globally to the internet.
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
  "id": "compute.publicAdvertisedPrefixes.get",
  "path":
    "projects/{project}/global/publicAdvertisedPrefixes/{publicAdvertisedPrefix}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "publicAdvertisedPrefix",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "publicAdvertisedPrefix": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "compute.publicAdvertisedPrefixes.insert",
  "path": "projects/{project}/global/publicAdvertisedPrefixes",
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
  "id": "compute.publicAdvertisedPrefixes.patch",
  "path":
    "projects/{project}/global/publicAdvertisedPrefixes/{publicAdvertisedPrefix}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "project",
    "publicAdvertisedPrefix",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "publicAdvertisedPrefix": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "compute.publicAdvertisedPrefixes.delete",
  "path":
    "projects/{project}/global/publicAdvertisedPrefixes/{publicAdvertisedPrefix}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "project",
    "publicAdvertisedPrefix",
  ],
  "parameters": {
    "project": {
      "location": "path",
      "required": true,
    },
    "publicAdvertisedPrefix": {
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
  dnsVerificationIp: z.string().describe(
    "The address to be used for reverse DNS verification.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicAdvertisedPrefix. An up-to-date fingerprint must be provided in order to update thePublicAdvertisedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicAdvertisedPrefix.",
  ).optional(),
  ipCidrRange: z.string().describe(
    "The address range, in CIDR format, represented by this public advertised prefix.",
  ).optional(),
  ipv6AccessType: z.enum(["EXTERNAL", "INTERNAL"]).describe(
    "The internet access type for IPv6 Public Advertised Prefixes.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ),
  status: z.enum([
    "ANNOUNCED_TO_INTERNET",
    "INITIAL",
    "PREFIX_CONFIGURATION_COMPLETE",
    "PREFIX_CONFIGURATION_IN_PROGRESS",
    "PREFIX_REMOVAL_IN_PROGRESS",
    "PTR_CONFIGURED",
    "READY_TO_ANNOUNCE",
    "REVERSE_DNS_LOOKUP_FAILED",
    "VALIDATED",
  ]).describe(
    "The status of the public advertised prefix. Possible values include: - `INITIAL`: RPKI validation is complete. - `PTR_CONFIGURED`: User has configured the PTR. - `VALIDATED`: Reverse DNS lookup is successful. - `REVERSE_DNS_LOOKUP_FAILED`: Reverse DNS lookup failed. - `PREFIX_CONFIGURATION_IN_PROGRESS`: The prefix is being configured. - `PREFIX_CONFIGURATION_COMPLETE`: The prefix is fully configured. - `PREFIX_REMOVAL_IN_PROGRESS`: The prefix is being removed.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

const StateSchema = z.object({
  byoipApiVersion: z.string().optional(),
  creationTimestamp: z.string().optional(),
  description: z.string().optional(),
  dnsVerificationIp: z.string().optional(),
  fingerprint: z.string().optional(),
  id: z.string().optional(),
  ipCidrRange: z.string().optional(),
  ipv6AccessType: z.string().optional(),
  kind: z.string().optional(),
  name: z.string(),
  pdpScope: z.string().optional(),
  publicDelegatedPrefixs: z.array(z.object({
    ipRange: z.string(),
    name: z.string(),
    project: z.string(),
    region: z.string(),
    status: z.string(),
  })).optional(),
  selfLink: z.string().optional(),
  sharedSecret: z.string().optional(),
  status: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  description: z.string().describe(
    "An optional description of this resource. Provide this property when you create the resource.",
  ).optional(),
  dnsVerificationIp: z.string().describe(
    "The address to be used for reverse DNS verification.",
  ).optional(),
  fingerprint: z.string().describe(
    "Fingerprint of this resource. A hash of the contents stored in this object. This field is used in optimistic locking. This field will be ignored when inserting a new PublicAdvertisedPrefix. An up-to-date fingerprint must be provided in order to update thePublicAdvertisedPrefix, otherwise the request will fail with error 412 conditionNotMet. To see the latest fingerprint, make a get() request to retrieve a PublicAdvertisedPrefix.",
  ).optional(),
  ipCidrRange: z.string().describe(
    "The address range, in CIDR format, represented by this public advertised prefix.",
  ).optional(),
  ipv6AccessType: z.enum(["EXTERNAL", "INTERNAL"]).describe(
    "The internet access type for IPv6 Public Advertised Prefixes.",
  ).optional(),
  name: z.string().regex(new RegExp("[a-z](?:[-a-z0-9]{0,61}[a-z0-9])?"))
    .describe(
      "Name of the resource. Provided by the client when the resource is created. The name must be 1-63 characters long, and comply withRFC1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash.",
    ).optional(),
  status: z.enum([
    "ANNOUNCED_TO_INTERNET",
    "INITIAL",
    "PREFIX_CONFIGURATION_COMPLETE",
    "PREFIX_CONFIGURATION_IN_PROGRESS",
    "PREFIX_REMOVAL_IN_PROGRESS",
    "PTR_CONFIGURED",
    "READY_TO_ANNOUNCE",
    "REVERSE_DNS_LOOKUP_FAILED",
    "VALIDATED",
  ]).describe(
    "The status of the public advertised prefix. Possible values include: - `INITIAL`: RPKI validation is complete. - `PTR_CONFIGURED`: User has configured the PTR. - `VALIDATED`: Reverse DNS lookup is successful. - `REVERSE_DNS_LOOKUP_FAILED`: Reverse DNS lookup failed. - `PREFIX_CONFIGURATION_IN_PROGRESS`: The prefix is being configured. - `PREFIX_CONFIGURATION_COMPLETE`: The prefix is fully configured. - `PREFIX_REMOVAL_IN_PROGRESS`: The prefix is being removed.",
  ).optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
});

/** Swamp extension model for Google Cloud Compute Engine PublicAdvertisedPrefixes. Registered at `@swamp/gcp/compute/publicadvertisedprefixes`. */
export const model = {
  type: "@swamp/gcp/compute/publicadvertisedprefixes",
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
      description:
        "A public advertised prefix represents an aggregated IP prefix or netblock whi...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a publicAdvertisedPrefixes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dnsVerificationIp"] !== undefined) {
          body["dnsVerificationIp"] = g["dnsVerificationIp"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["ipCidrRange"] !== undefined) {
          body["ipCidrRange"] = g["ipCidrRange"];
        }
        if (g["ipv6AccessType"] !== undefined) {
          body["ipv6AccessType"] = g["ipv6AccessType"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["name"] !== undefined) {
          params["publicAdvertisedPrefix"] = String(g["name"]);
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
      description: "Get a publicAdvertisedPrefixes",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the publicAdvertisedPrefixes",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["publicAdvertisedPrefix"] = args.identifier;
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
      description: "Update publicAdvertisedPrefixes attributes",
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
        params["publicAdvertisedPrefix"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dnsVerificationIp"] !== undefined) {
          body["dnsVerificationIp"] = g["dnsVerificationIp"];
        }
        if (g["fingerprint"] !== undefined) {
          body["fingerprint"] = g["fingerprint"];
        }
        if (g["ipCidrRange"] !== undefined) {
          body["ipCidrRange"] = g["ipCidrRange"];
        }
        if (g["ipv6AccessType"] !== undefined) {
          body["ipv6AccessType"] = g["ipv6AccessType"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["status"] !== undefined) body["status"] = g["status"];
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
      description: "Delete the publicAdvertisedPrefixes",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the publicAdvertisedPrefixes",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["publicAdvertisedPrefix"] = args.identifier;
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
      description: "Sync publicAdvertisedPrefixes state from GCP",
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
          params["publicAdvertisedPrefix"] = identifier;
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
    announce: {
      description: "announce",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
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
        params["publicAdvertisedPrefix"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.publicAdvertisedPrefixes.announce",
            "path":
              "projects/{project}/global/publicAdvertisedPrefixes/{publicAdvertisedPrefix}/announce",
            "httpMethod": "POST",
            "parameterOrder": ["project", "publicAdvertisedPrefix"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "publicAdvertisedPrefix": {
                "location": "path",
                "required": true,
              },
              "requestId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    withdraw: {
      description: "withdraw",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
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
        params["publicAdvertisedPrefix"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.publicAdvertisedPrefixes.withdraw",
            "path":
              "projects/{project}/global/publicAdvertisedPrefixes/{publicAdvertisedPrefix}/withdraw",
            "httpMethod": "POST",
            "parameterOrder": ["project", "publicAdvertisedPrefix"],
            "parameters": {
              "project": { "location": "path", "required": true },
              "publicAdvertisedPrefix": {
                "location": "path",
                "required": true,
              },
              "requestId": { "location": "query" },
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
