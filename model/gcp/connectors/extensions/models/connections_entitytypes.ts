// Auto-generated extension model for @swamp/gcp/connectors/connections-entitytypes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Connectors Connections.EntityTypes.
 *
 * EntityType message contains metadata information about a single entity type present in the external system.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/entityTypes/${shortName}`;
}

const BASE_URL = "https://connectors.googleapis.com/";

const GET_CONFIG = {
  "id": "connectors.projects.locations.connections.entityTypes.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "contextMetadata": {
      "location": "query",
    },
    "executionConfig.headers": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "connectors.projects.locations.connections.entityTypes.list",
  "path": "v2/{+parent}/entityTypes",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "executionConfig.headers": {
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
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  defaultSortBy: z.string().optional(),
  fields: z.array(z.object({
    additionalDetails: z.record(z.string(), z.unknown()),
    dataType: z.string(),
    defaultValue: z.string(),
    description: z.string(),
    jsonSchema: z.object({
      $comment: z.string(),
      $defs: z.record(z.string(), z.unknown()),
      $id: z.string(),
      $ref: z.string(),
      $schema: z.string(),
      additionalDetails: z.record(z.string(), z.unknown()),
      additionalItems: z.record(z.string(), z.unknown()),
      additionalProperties: z.record(z.string(), z.unknown()),
      allOf: z.array(z.record(z.string(), z.unknown())),
      anyOf: z.array(z.record(z.string(), z.unknown())),
      const: z.string(),
      contains: z.record(z.string(), z.unknown()),
      contentEncoding: z.string(),
      contentMediaType: z.string(),
      default: z.string(),
      definitions: z.record(z.string(), z.unknown()),
      dependencies: z.record(z.string(), z.unknown()),
      description: z.string(),
      else: z.record(z.string(), z.unknown()),
      enum: z.array(z.string()),
      examples: z.array(z.string()),
      exclusiveMaximum: z.string(),
      exclusiveMinimum: z.string(),
      format: z.string(),
      if: z.record(z.string(), z.unknown()),
      items: z.record(z.string(), z.unknown()),
      jdbcType: z.string(),
      maxItems: z.number(),
      maxLength: z.number(),
      maxProperties: z.number(),
      maximum: z.string(),
      minItems: z.number(),
      minLength: z.number(),
      minProperties: z.number(),
      minimum: z.string(),
      multipleOf: z.number(),
      not: z.record(z.string(), z.unknown()),
      oneOf: z.array(z.record(z.string(), z.unknown())),
      pattern: z.string(),
      patternProperties: z.record(z.string(), z.unknown()),
      properties: z.record(z.string(), z.unknown()),
      propertyNames: z.record(z.string(), z.unknown()),
      readOnly: z.boolean(),
      required: z.array(z.string()),
      then: z.record(z.string(), z.unknown()),
      title: z.string(),
      type: z.array(z.string()),
      uniqueItems: z.boolean(),
      writeOnly: z.boolean(),
    }),
    key: z.boolean(),
    name: z.string(),
    nullable: z.boolean(),
    reference: z.object({
      name: z.string(),
      type: z.string(),
    }),
  })).optional(),
  jsonSchema: z.object({
    $comment: z.string(),
    $defs: z.record(z.string(), z.unknown()),
    $id: z.string(),
    $ref: z.string(),
    $schema: z.string(),
    additionalDetails: z.record(z.string(), z.unknown()),
    additionalItems: z.record(z.string(), z.unknown()),
    additionalProperties: z.record(z.string(), z.unknown()),
    allOf: z.array(z.record(z.string(), z.unknown())),
    anyOf: z.array(z.record(z.string(), z.unknown())),
    const: z.string(),
    contains: z.record(z.string(), z.unknown()),
    contentEncoding: z.string(),
    contentMediaType: z.string(),
    default: z.string(),
    definitions: z.record(z.string(), z.unknown()),
    dependencies: z.record(z.string(), z.unknown()),
    description: z.string(),
    else: z.record(z.string(), z.unknown()),
    enum: z.array(z.string()),
    examples: z.array(z.string()),
    exclusiveMaximum: z.string(),
    exclusiveMinimum: z.string(),
    format: z.string(),
    if: z.record(z.string(), z.unknown()),
    items: z.record(z.string(), z.unknown()),
    jdbcType: z.string(),
    maxItems: z.number(),
    maxLength: z.number(),
    maxProperties: z.number(),
    maximum: z.string(),
    minItems: z.number(),
    minLength: z.number(),
    minProperties: z.number(),
    minimum: z.string(),
    multipleOf: z.number(),
    not: z.record(z.string(), z.unknown()),
    oneOf: z.array(z.record(z.string(), z.unknown())),
    pattern: z.string(),
    patternProperties: z.record(z.string(), z.unknown()),
    properties: z.record(z.string(), z.unknown()),
    propertyNames: z.record(z.string(), z.unknown()),
    readOnly: z.boolean(),
    required: z.array(z.string()),
    then: z.record(z.string(), z.unknown()),
    title: z.string(),
    type: z.array(z.string()),
    uniqueItems: z.boolean(),
    writeOnly: z.boolean(),
  }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  operations: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Connectors Connections.EntityTypes. Registered at `@swamp/gcp/connectors/connections-entitytypes`. */
export const model = {
  type: "@swamp/gcp/connectors/connections-entitytypes",
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
      toVersion: "2026.05.02.1",
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
      toVersion: "2026.05.20.1",
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
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.27.1",
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
        "EntityType message contains metadata information about a single entity type p...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a entityTypes",
      arguments: z.object({
        identifier: z.string().describe("The name of the entityTypes"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
    sync: {
      description: "Sync entityTypes state from GCP",
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
      description: "List entityTypes resources",
      arguments: z.object({
        executionConfig_headers: z.string().describe(
          'headers to be used for the request. For example: headers:\'{"x-integration-connectors-managed-connection-id":"conn-id","x-integration-connectors-runtime-config":"runtime-cfg"}\'',
        ).optional(),
        pageSize: z.number().describe(
          "Number of entity types to return. Defaults to 25.",
        ).optional(),
        view: z.string().describe(
          "Specifies which fields of the Entity Type are returned in the response.",
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
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        if (args["executionConfig_headers"] !== undefined) {
          params["executionConfig.headers"] = String(
            args["executionConfig_headers"],
          );
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "types",
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
  },
};
