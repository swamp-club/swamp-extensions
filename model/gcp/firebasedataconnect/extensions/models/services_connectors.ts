// Auto-generated extension model for @swamp/gcp/firebasedataconnect/services-connectors
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase Data Connect Services.Connectors.
 *
 * Connector consists of a set of operations, i.e. queries and mutations.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/connectors/${shortName}`;
}

const BASE_URL = "https://firebasedataconnect.googleapis.com/";

const GET_CONFIG = {
  "id": "firebasedataconnect.projects.locations.services.connectors.get",
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
  "id": "firebasedataconnect.projects.locations.services.connectors.create",
  "path": "v1/{+parent}/connectors",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "connectorId": {
      "location": "query",
    },
    "parent": {
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
  "id": "firebasedataconnect.projects.locations.services.connectors.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "name": {
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "firebasedataconnect.projects.locations.services.connectors.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "allowMissing": {
      "location": "query",
    },
    "etag": {
      "location": "query",
    },
    "force": {
      "location": "query",
    },
    "name": {
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

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Stores small amounts of arbitrary data.",
  ).optional(),
  clientCache: z.object({
    entityIdIncluded: z.boolean().describe(
      'Optional. A field that, if true, means that responses served by this connector will include entityIds in GraphQL response extensions. This helps the client SDK cache responses in an improved way, known as "normalized caching", if caching is enabled on the client. Each entityId is a stable key based on primary key values. Therefore, this field should only be set to true if the primary keys of accessed tables do not contain sensitive information.',
    ).optional(),
    strictValidationEnabled: z.boolean().describe(
      "Optional. A field that, if true, enables stricter validation on the connector source code to make sure the operation response shapes are suitable for client-side caching. This can include additional errors and warnings. For example, using the same alias for different fields is disallowed, as it may cause conflicts or confusion with normalized caching. (This field is off by default for compatibility, but enabling it is highly recommended to catch common caching pitfalls.)",
    ).optional(),
  }).describe("Client caching settings of a connector.").optional(),
  displayName: z.string().describe(
    "Optional. Mutable human-readable name. 63 character limit.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The relative resource name of the connector, in the format: ` projects/{project}/locations/{location}/services/{service}/connectors/{connector} `",
  ).optional(),
  source: z.object({
    files: z.array(z.object({
      content: z.string().describe("Required. The file's textual content.")
        .optional(),
      path: z.string().describe(
        "Required. The file name including folder path, if applicable. The path should be relative to a local workspace (e.g. dataconnect/(schema|connector)/*.gql) and not an absolute path (e.g. /absolute/path/(schema|connector)/*.gql).",
      ).optional(),
    })).describe("Required. The files that comprise the source set.")
      .optional(),
  }).describe("Used to represent a set of source files.").optional(),
  connectorId: z.string().describe(
    "Required. The ID to use for the connector, which will become the final component of the connector's resource name.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  clientCache: z.object({
    entityIdIncluded: z.boolean(),
    strictValidationEnabled: z.boolean(),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  source: z.object({
    files: z.array(z.object({
      content: z.string(),
      path: z.string(),
    })),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Stores small amounts of arbitrary data.",
  ).optional(),
  clientCache: z.object({
    entityIdIncluded: z.boolean().describe(
      'Optional. A field that, if true, means that responses served by this connector will include entityIds in GraphQL response extensions. This helps the client SDK cache responses in an improved way, known as "normalized caching", if caching is enabled on the client. Each entityId is a stable key based on primary key values. Therefore, this field should only be set to true if the primary keys of accessed tables do not contain sensitive information.',
    ).optional(),
    strictValidationEnabled: z.boolean().describe(
      "Optional. A field that, if true, enables stricter validation on the connector source code to make sure the operation response shapes are suitable for client-side caching. This can include additional errors and warnings. For example, using the same alias for different fields is disallowed, as it may cause conflicts or confusion with normalized caching. (This field is off by default for compatibility, but enabling it is highly recommended to catch common caching pitfalls.)",
    ).optional(),
  }).describe("Client caching settings of a connector.").optional(),
  displayName: z.string().describe(
    "Optional. Mutable human-readable name. 63 character limit.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The relative resource name of the connector, in the format: ` projects/{project}/locations/{location}/services/{service}/connectors/{connector} `",
  ).optional(),
  source: z.object({
    files: z.array(z.object({
      content: z.string().describe("Required. The file's textual content.")
        .optional(),
      path: z.string().describe(
        "Required. The file name including folder path, if applicable. The path should be relative to a local workspace (e.g. dataconnect/(schema|connector)/*.gql) and not an absolute path (e.g. /absolute/path/(schema|connector)/*.gql).",
      ).optional(),
    })).describe("Required. The files that comprise the source set.")
      .optional(),
  }).describe("Used to represent a set of source files.").optional(),
  connectorId: z.string().describe(
    "Required. The ID to use for the connector, which will become the final component of the connector's resource name.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firebase Data Connect Services.Connectors. Registered at `@swamp/gcp/firebasedataconnect/services-connectors`. */
export const model = {
  type: "@swamp/gcp/firebasedataconnect/services-connectors",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Connector consists of a set of operations, i.e. queries and mutations.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a connectors",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["clientCache"] !== undefined) {
          body["clientCache"] = g["clientCache"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["connectorId"] !== undefined) {
          body["connectorId"] = g["connectorId"];
        }
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
      description: "Get a connectors",
      arguments: z.object({
        identifier: z.string().describe("The name of the connectors"),
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
      description: "Update connectors attributes",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["clientCache"] !== undefined) {
          body["clientCache"] = g["clientCache"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["source"] !== undefined) body["source"] = g["source"];
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
      description: "Delete the connectors",
      arguments: z.object({
        identifier: z.string().describe("The name of the connectors"),
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
      description: "Sync connectors state from GCP",
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
    execute_mutation: {
      description: "execute mutation",
      arguments: z.object({
        operationName: z.any().optional(),
        variables: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["operationName"] !== undefined) {
          body["operationName"] = args["operationName"];
        }
        if (args["variables"] !== undefined) {
          body["variables"] = args["variables"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "firebasedataconnect.projects.locations.services.connectors.executeMutation",
            "path": "v1/{+name}:executeMutation",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    execute_query: {
      description: "execute query",
      arguments: z.object({
        operationName: z.any().optional(),
        variables: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["operationName"] !== undefined) {
          body["operationName"] = args["operationName"];
        }
        if (args["variables"] !== undefined) {
          body["variables"] = args["variables"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "firebasedataconnect.projects.locations.services.connectors.executeQuery",
            "path": "v1/{+name}:executeQuery",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    impersonate_mutation: {
      description: "impersonate mutation",
      arguments: z.object({
        extensions: z.any().optional(),
        operationName: z.any().optional(),
        variables: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["extensions"] !== undefined) {
          body["extensions"] = args["extensions"];
        }
        if (args["operationName"] !== undefined) {
          body["operationName"] = args["operationName"];
        }
        if (args["variables"] !== undefined) {
          body["variables"] = args["variables"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "firebasedataconnect.projects.locations.services.connectors.impersonateMutation",
            "path": "v1/{+name}:impersonateMutation",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
    impersonate_query: {
      description: "impersonate query",
      arguments: z.object({
        extensions: z.any().optional(),
        operationName: z.any().optional(),
        variables: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["extensions"] !== undefined) {
          body["extensions"] = args["extensions"];
        }
        if (args["operationName"] !== undefined) {
          body["operationName"] = args["operationName"];
        }
        if (args["variables"] !== undefined) {
          body["variables"] = args["variables"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "firebasedataconnect.projects.locations.services.connectors.impersonateQuery",
            "path": "v1/{+name}:impersonateQuery",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
