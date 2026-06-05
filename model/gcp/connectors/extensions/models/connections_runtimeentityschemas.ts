// Auto-generated extension model for @swamp/gcp/connectors/connections-runtimeentityschemas
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Connectors Connections.RuntimeEntitySchemas.
 *
 * Schema of a runtime entity.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://connectors.googleapis.com/";

const LIST_CONFIG = {
  "id": "connectors.projects.locations.connections.runtimeEntitySchemas.list",
  "path": "v1/{+parent}/runtimeEntitySchemas",
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
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  entity: z.string().optional(),
  fields: z.array(z.object({
    additionalDetails: z.record(z.string(), z.unknown()),
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
    key: z.boolean(),
    nullable: z.boolean(),
    readonly: z.boolean(),
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
  operations: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Connectors Connections.RuntimeEntitySchemas. Registered at `@swamp/gcp/connectors/connections-runtimeentityschemas`. */
export const model = {
  type: "@swamp/gcp/connectors/connections-runtimeentityschemas",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Schema of a runtime entity.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a runtimeEntitySchemas",
      arguments: z.object({
        identifier: z.string().describe("The name of the runtimeEntitySchemas"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync runtimeEntitySchemas state from GCP",
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
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
      description: "List runtimeEntitySchemas resources",
      arguments: z.object({
        filter: z.string().describe(
          'Required. Filter Format: entity="{entityId}" Only entity field is supported with literal equality operator. Accepted filter example: entity="Order" Wildcards are not supported in the filter currently.',
        ).optional(),
        pageSize: z.number().describe("Page size.").optional(),
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "runtimeEntitySchemas",
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
