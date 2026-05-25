// Auto-generated extension model for @swamp/gcp/networkconnectivity/automateddnsrecords
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Network Connectivity AutomatedDnsRecords.
 *
 * Represents a DNS record managed by the AutomatedDnsRecord API.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/automatedDnsRecords/${shortName}`;
}

const BASE_URL = "https://networkconnectivity.googleapis.com/";

const GET_CONFIG = {
  "id": "networkconnectivity.projects.locations.automatedDnsRecords.get",
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
  "id": "networkconnectivity.projects.locations.automatedDnsRecords.create",
  "path": "v1/{+parent}/automatedDnsRecords",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "automatedDnsRecordId": {
      "location": "query",
    },
    "insertMode": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "networkconnectivity.projects.locations.automatedDnsRecords.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "deleteMode": {
      "location": "query",
    },
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "networkconnectivity.projects.locations.automatedDnsRecords.list",
  "path": "v1/{+parent}/automatedDnsRecords",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
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
  },
} as const;

const GlobalArgsSchema = z.object({
  consumerNetwork: z.string().describe(
    'Required. Immutable. The full resource path of the consumer network this AutomatedDnsRecord is visible to. Example: "projects/{projectNumOrId}/global/networks/{networkName}".',
  ).optional(),
  creationMode: z.enum([
    "CREATION_MODE_UNSPECIFIED",
    "CONSUMER_API",
    "SERVICE_CONNECTION_MAP",
  ]).describe(
    "Required. Immutable. The creation mode of the AutomatedDnsRecord. This field is immutable.",
  ).optional(),
  currentConfig: z.object({
    rrdatas: z.array(z.string()).describe(
      'Required. The list of resource record data strings. The content and format of these strings depend on the AutomatedDnsRecord.type. For many common record types, this list may contain multiple strings. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples. Examples: A record: ["192.0.2.1"] or ["192.0.2.1", "192.0.2.2"] TXT record: ["This is a text record"] CNAME record: ["target.example.com."] AAAA record: ["::1"] or ["2001:0db8:85a3:0000:0000:8a2e:0370:7334", "2001:0db8:85a3:0000:0000:8a2e:0370:7335"]',
    ).optional(),
    ttl: z.string().describe(
      "Required. Number of seconds that this DNS record can be cached by resolvers.",
    ).optional(),
  }).describe("Defines the configuration of a DNS record.").optional(),
  description: z.string().describe(
    "A human-readable description of the record.",
  ).optional(),
  dnsSuffix: z.string().describe(
    'Required. Immutable. The dns suffix for this record to use in longest-suffix matching. Requires a trailing dot. Example: "example.com."',
  ).optional(),
  hostname: z.string().describe(
    'Required. Immutable. The hostname for the DNS record. This value will be prepended to the `dns_suffix` to create the full domain name (FQDN) for the record. For example, if `hostname` is "corp.db" and `dns_suffix` is "example.com.", the resulting record will be "corp.db.example.com.". Should not include a trailing dot.',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. The name of an AutomatedDnsRecord. Format: projects/{project}/locations/{location}/automatedDnsRecords/{automated_dns_record} See: https://google.aip.dev/122#fields-representing-resource-names",
  ).optional(),
  originalConfig: z.object({
    rrdatas: z.array(z.string()).describe(
      'Required. The list of resource record data strings. The content and format of these strings depend on the AutomatedDnsRecord.type. For many common record types, this list may contain multiple strings. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples. Examples: A record: ["192.0.2.1"] or ["192.0.2.1", "192.0.2.2"] TXT record: ["This is a text record"] CNAME record: ["target.example.com."] AAAA record: ["::1"] or ["2001:0db8:85a3:0000:0000:8a2e:0370:7334", "2001:0db8:85a3:0000:0000:8a2e:0370:7335"]',
    ).optional(),
    ttl: z.string().describe(
      "Required. Number of seconds that this DNS record can be cached by resolvers.",
    ).optional(),
  }).describe("Defines the configuration of a DNS record.").optional(),
  recordType: z.enum(["RECORD_TYPE_UNSPECIFIED", "A", "AAAA", "TXT", "CNAME"])
    .describe("Required. Immutable. The identifier of a supported record type.")
    .optional(),
  serviceClass: z.string().describe(
    "Required. Immutable. The service class identifier which authorizes this AutomatedDnsRecord. Any API calls targeting this AutomatedDnsRecord must have `networkconnectivity.serviceclasses.use` IAM permission for the provided service class.",
  ).optional(),
  automatedDnsRecordId: z.string().describe(
    "Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/automatedDnsRecords/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. If one is not provided, one will be generated.",
  ).optional(),
  insertMode: z.string().describe(
    "Optional. The insert mode when creating AutomatedDnsRecord.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  consumerNetwork: z.string().optional(),
  createTime: z.string().optional(),
  creationMode: z.string().optional(),
  currentConfig: z.object({
    rrdatas: z.array(z.string()),
    ttl: z.string(),
  }).optional(),
  description: z.string().optional(),
  dnsSuffix: z.string().optional(),
  dnsZone: z.string().optional(),
  etag: z.string().optional(),
  fqdn: z.string().optional(),
  hostname: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  originalConfig: z.object({
    rrdatas: z.array(z.string()),
    ttl: z.string(),
  }).optional(),
  recordType: z.string().optional(),
  serviceClass: z.string().optional(),
  state: z.string().optional(),
  stateDetails: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  consumerNetwork: z.string().describe(
    'Required. Immutable. The full resource path of the consumer network this AutomatedDnsRecord is visible to. Example: "projects/{projectNumOrId}/global/networks/{networkName}".',
  ).optional(),
  creationMode: z.enum([
    "CREATION_MODE_UNSPECIFIED",
    "CONSUMER_API",
    "SERVICE_CONNECTION_MAP",
  ]).describe(
    "Required. Immutable. The creation mode of the AutomatedDnsRecord. This field is immutable.",
  ).optional(),
  currentConfig: z.object({
    rrdatas: z.array(z.string()).describe(
      'Required. The list of resource record data strings. The content and format of these strings depend on the AutomatedDnsRecord.type. For many common record types, this list may contain multiple strings. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples. Examples: A record: ["192.0.2.1"] or ["192.0.2.1", "192.0.2.2"] TXT record: ["This is a text record"] CNAME record: ["target.example.com."] AAAA record: ["::1"] or ["2001:0db8:85a3:0000:0000:8a2e:0370:7334", "2001:0db8:85a3:0000:0000:8a2e:0370:7335"]',
    ).optional(),
    ttl: z.string().describe(
      "Required. Number of seconds that this DNS record can be cached by resolvers.",
    ).optional(),
  }).describe("Defines the configuration of a DNS record.").optional(),
  description: z.string().describe(
    "A human-readable description of the record.",
  ).optional(),
  dnsSuffix: z.string().describe(
    'Required. Immutable. The dns suffix for this record to use in longest-suffix matching. Requires a trailing dot. Example: "example.com."',
  ).optional(),
  hostname: z.string().describe(
    'Required. Immutable. The hostname for the DNS record. This value will be prepended to the `dns_suffix` to create the full domain name (FQDN) for the record. For example, if `hostname` is "corp.db" and `dns_suffix` is "example.com.", the resulting record will be "corp.db.example.com.". Should not include a trailing dot.',
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels.",
  ).optional(),
  name: z.string().describe(
    "Immutable. Identifier. The name of an AutomatedDnsRecord. Format: projects/{project}/locations/{location}/automatedDnsRecords/{automated_dns_record} See: https://google.aip.dev/122#fields-representing-resource-names",
  ).optional(),
  originalConfig: z.object({
    rrdatas: z.array(z.string()).describe(
      'Required. The list of resource record data strings. The content and format of these strings depend on the AutomatedDnsRecord.type. For many common record types, this list may contain multiple strings. As defined in RFC 1035 (section 5) and RFC 1034 (section 3.6.1) -- see examples. Examples: A record: ["192.0.2.1"] or ["192.0.2.1", "192.0.2.2"] TXT record: ["This is a text record"] CNAME record: ["target.example.com."] AAAA record: ["::1"] or ["2001:0db8:85a3:0000:0000:8a2e:0370:7334", "2001:0db8:85a3:0000:0000:8a2e:0370:7335"]',
    ).optional(),
    ttl: z.string().describe(
      "Required. Number of seconds that this DNS record can be cached by resolvers.",
    ).optional(),
  }).describe("Defines the configuration of a DNS record.").optional(),
  recordType: z.enum(["RECORD_TYPE_UNSPECIFIED", "A", "AAAA", "TXT", "CNAME"])
    .describe("Required. Immutable. The identifier of a supported record type.")
    .optional(),
  serviceClass: z.string().describe(
    "Required. Immutable. The service class identifier which authorizes this AutomatedDnsRecord. Any API calls targeting this AutomatedDnsRecord must have `networkconnectivity.serviceclasses.use` IAM permission for the provided service class.",
  ).optional(),
  automatedDnsRecordId: z.string().describe(
    "Optional. Resource ID (i.e. 'foo' in '[...]/projects/p/locations/l/automatedDnsRecords/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. If one is not provided, one will be generated.",
  ).optional(),
  insertMode: z.string().describe(
    "Optional. The insert mode when creating AutomatedDnsRecord.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Network Connectivity AutomatedDnsRecords. Registered at `@swamp/gcp/networkconnectivity/automateddnsrecords`. */
export const model = {
  type: "@swamp/gcp/networkconnectivity/automateddnsrecords",
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
        "Represents a DNS record managed by the AutomatedDnsRecord API.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a automatedDnsRecords",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["consumerNetwork"] !== undefined) {
          body["consumerNetwork"] = g["consumerNetwork"];
        }
        if (g["creationMode"] !== undefined) {
          body["creationMode"] = g["creationMode"];
        }
        if (g["currentConfig"] !== undefined) {
          body["currentConfig"] = g["currentConfig"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["dnsSuffix"] !== undefined) body["dnsSuffix"] = g["dnsSuffix"];
        if (g["hostname"] !== undefined) body["hostname"] = g["hostname"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["originalConfig"] !== undefined) {
          body["originalConfig"] = g["originalConfig"];
        }
        if (g["recordType"] !== undefined) body["recordType"] = g["recordType"];
        if (g["serviceClass"] !== undefined) {
          body["serviceClass"] = g["serviceClass"];
        }
        if (g["automatedDnsRecordId"] !== undefined) {
          body["automatedDnsRecordId"] = g["automatedDnsRecordId"];
        }
        if (g["insertMode"] !== undefined) body["insertMode"] = g["insertMode"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
      description: "Get a automatedDnsRecords",
      arguments: z.object({
        identifier: z.string().describe("The name of the automatedDnsRecords"),
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
    delete: {
      description: "Delete the automatedDnsRecords",
      arguments: z.object({
        identifier: z.string().describe("The name of the automatedDnsRecords"),
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
      description: "Sync automatedDnsRecords state from GCP",
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
      description: "List automatedDnsRecords resources",
      arguments: z.object({
        filter: z.string().describe(
          "A filter expression that filters the results listed in the response.",
        ).optional(),
        orderBy: z.string().describe("Sort the results by a certain order.")
          .optional(),
        pageSize: z.number().describe(
          "The maximum number of results per page that should be returned.",
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
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "automatedDnsRecords",
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
