// Auto-generated extension model for @swamp/gcp/servicenetworking/services-dnsrecordsets
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Service Networking Services.DnsRecordSets.
 *
 * Represents a DNS record set resource.
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

const BASE_URL = "https://servicenetworking.googleapis.com/";

const GET_CONFIG = {
  "id": "servicenetworking.services.dnsRecordSets.get",
  "path": "v1/{+parent}/dnsRecordSets:get",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "consumerNetwork": {
      "location": "query",
    },
    "domain": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "type": {
      "location": "query",
    },
    "zone": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "servicenetworking.services.dnsRecordSets.update",
  "path": "v1/{+parent}/dnsRecordSets:update",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "servicenetworking.services.dnsRecordSets.remove",
  "path": "v1/{+parent}/dnsRecordSets:remove",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  consumerNetwork: z.string().describe(
    "Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is the project number, as in '12345' {network} is the network name.",
  ).optional(),
  existingDnsRecordSet: z.object({
    data: z.array(z.string()).describe(
      "Required. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) for examples see https://cloud.google.com/dns/records/json-record.",
    ).optional(),
    domain: z.string().describe(
      "Required. The DNS or domain name of the record set, e.g. `test.example.com`. Cloud DNS requires that a DNS suffix ends with a trailing dot.",
    ).optional(),
    ttl: z.string().describe(
      "Required. The period of time for which this RecordSet can be cached by resolvers.",
    ).optional(),
    type: z.string().describe(
      "Required. The identifier of a supported record type.",
    ).optional(),
  }).describe("Represents a DNS record set resource.").optional(),
  newDnsRecordSet: z.object({
    data: z.array(z.string()).describe(
      "Required. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) for examples see https://cloud.google.com/dns/records/json-record.",
    ).optional(),
    domain: z.string().describe(
      "Required. The DNS or domain name of the record set, e.g. `test.example.com`. Cloud DNS requires that a DNS suffix ends with a trailing dot.",
    ).optional(),
    ttl: z.string().describe(
      "Required. The period of time for which this RecordSet can be cached by resolvers.",
    ).optional(),
    type: z.string().describe(
      "Required. The identifier of a supported record type.",
    ).optional(),
  }).describe("Represents a DNS record set resource.").optional(),
  zone: z.string().describe(
    "Required. The name of the private DNS zone in the shared producer host project from which the record set will be removed.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  data: z.array(z.string()).optional(),
  domain: z.string().optional(),
  ttl: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  consumerNetwork: z.string().describe(
    "Required. The network that the consumer is using to connect with services. Must be in the form of projects/{project}/global/networks/{network} {project} is the project number, as in '12345' {network} is the network name.",
  ).optional(),
  existingDnsRecordSet: z.object({
    data: z.array(z.string()).describe(
      "Required. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) for examples see https://cloud.google.com/dns/records/json-record.",
    ).optional(),
    domain: z.string().describe(
      "Required. The DNS or domain name of the record set, e.g. `test.example.com`. Cloud DNS requires that a DNS suffix ends with a trailing dot.",
    ).optional(),
    ttl: z.string().describe(
      "Required. The period of time for which this RecordSet can be cached by resolvers.",
    ).optional(),
    type: z.string().describe(
      "Required. The identifier of a supported record type.",
    ).optional(),
  }).describe("Represents a DNS record set resource.").optional(),
  newDnsRecordSet: z.object({
    data: z.array(z.string()).describe(
      "Required. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) for examples see https://cloud.google.com/dns/records/json-record.",
    ).optional(),
    domain: z.string().describe(
      "Required. The DNS or domain name of the record set, e.g. `test.example.com`. Cloud DNS requires that a DNS suffix ends with a trailing dot.",
    ).optional(),
    ttl: z.string().describe(
      "Required. The period of time for which this RecordSet can be cached by resolvers.",
    ).optional(),
    type: z.string().describe(
      "Required. The identifier of a supported record type.",
    ).optional(),
  }).describe("Represents a DNS record set resource.").optional(),
  zone: z.string().describe(
    "Required. The name of the private DNS zone in the shared producer host project from which the record set will be removed.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Service Networking Services.DnsRecordSets. Registered at `@swamp/gcp/servicenetworking/services-dnsrecordsets`. */
export const model = {
  type: "@swamp/gcp/servicenetworking/services-dnsrecordsets",
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
      description: "Represents a DNS record set resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a dnsRecordSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the dnsRecordSets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["parent"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Update dnsRecordSets attributes",
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
        params["parent"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["consumerNetwork"] !== undefined) {
          body["consumerNetwork"] = g["consumerNetwork"];
        }
        if (g["existingDnsRecordSet"] !== undefined) {
          body["existingDnsRecordSet"] = g["existingDnsRecordSet"];
        }
        if (g["newDnsRecordSet"] !== undefined) {
          body["newDnsRecordSet"] = g["newDnsRecordSet"];
        }
        if (g["zone"] !== undefined) body["zone"] = g["zone"];
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
      description: "Delete the dnsRecordSets",
      arguments: z.object({
        identifier: z.string().describe("The name of the dnsRecordSets"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = args.identifier;
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
      description: "Sync dnsRecordSets state from GCP",
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
          params["parent"] = identifier;
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
    add: {
      description: "add",
      arguments: z.object({
        consumerNetwork: z.any().optional(),
        dnsRecordSet: z.any().optional(),
        zone: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["consumerNetwork"] !== undefined) {
          body["consumerNetwork"] = args["consumerNetwork"];
        }
        if (args["dnsRecordSet"] !== undefined) {
          body["dnsRecordSet"] = args["dnsRecordSet"];
        }
        if (args["zone"] !== undefined) body["zone"] = args["zone"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "servicenetworking.services.dnsRecordSets.add",
            "path": "v1/{+parent}/dnsRecordSets:add",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
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
