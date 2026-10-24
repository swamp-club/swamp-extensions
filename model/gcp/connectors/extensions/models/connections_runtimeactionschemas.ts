// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/connectors/connections-runtimeactionschemas
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Connectors Connections.RuntimeActionSchemas.
 *
 * Schema of a runtime action.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://connectors.googleapis.com/";

const LIST_CONFIG = {
  "id": "connectors.projects.locations.connections.runtimeActionSchemas.list",
  "path": "v1/{+parent}/runtimeActionSchemas",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
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
    "schemaAsString": {
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  action: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  inputJsonSchema: z.object({
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
  inputParameters: z.array(z.object({
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
    nullable: z.boolean(),
    parameter: z.string(),
  })).optional(),
  inputSchemaAsString: z.string().optional(),
  resultJsonSchema: z.object({
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
  resultMetadata: z.array(z.object({
    dataType: z.string(),
    defaultValue: z.string(),
    description: z.string(),
    field: z.string(),
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
    nullable: z.boolean(),
  })).optional(),
  resultSchemaAsString: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Connectors Connections.RuntimeActionSchemas. Registered at `@swamp/gcp/connectors/connections-runtimeactionschemas`. */
export const model = {
  type: "@swamp/gcp/connectors/connections-runtimeactionschemas",
  version: "2026.10.23.1",
  upgrades: [
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Schema of a runtime action.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a runtimeActionSchemas",
      arguments: z.object({
        identifier: z.string().describe("The name of the runtimeActionSchemas"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          baseUrl,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync runtimeActionSchemas state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific runtimeActionSchemas by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        try {
          const params: Record<string, string> = { project: projectId };
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            baseUrl,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List runtimeActionSchemas resources",
      arguments: z.object({
        filter: z.string().describe(
          'Required. Filter Format: action="{actionId}" Only action field is supported with literal equality operator. Accepted filter example: action="CancelOrder" Wildcards are not supported in the filter currently.',
        ).optional(),
        pageSize: z.number().describe("Page size.").optional(),
        schemaAsString: z.boolean().describe(
          "Optional. Flag to indicate if schema should be returned as string or not",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["schemaAsString"] !== undefined) {
          params["schemaAsString"] = String(args["schemaAsString"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "runtimeActionSchemas",
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
