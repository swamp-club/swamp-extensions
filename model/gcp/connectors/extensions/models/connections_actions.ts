// Auto-generated extension model for @swamp/gcp/connectors/connections-actions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Connectors Connections.Actions.
 *
 * Action message contains metadata information about a single action present in the external system.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/actions/${shortName}`;
}

const BASE_URL = "https://connectors.googleapis.com/";

const GET_CONFIG = {
  "id": "connectors.projects.locations.connections.actions.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  description: z.string().optional(),
  displayName: z.string().optional(),
  inputJsonSchema: z.object({
    $comment: z.string(),
    $defs: z.record(z.string(), z.unknown()),
    $id: z.string(),
    $ref: z.string(),
    $schema: z.string(),
    additionalDetails: z.record(z.string(), z.unknown()),
    additionalItems: z.string(),
    additionalProperties: z.string(),
    allOf: z.array(z.string()),
    anyOf: z.array(z.string()),
    const: z.string(),
    contains: z.string(),
    contentEncoding: z.string(),
    contentMediaType: z.string(),
    default: z.string(),
    definitions: z.record(z.string(), z.unknown()),
    dependencies: z.record(z.string(), z.unknown()),
    description: z.string(),
    else: z.string(),
    enum: z.array(z.string()),
    examples: z.array(z.string()),
    exclusiveMaximum: z.string(),
    exclusiveMinimum: z.string(),
    format: z.string(),
    if: z.string(),
    items: z.string(),
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
    not: z.string(),
    oneOf: z.array(z.string()),
    pattern: z.string(),
    patternProperties: z.record(z.string(), z.unknown()),
    properties: z.record(z.string(), z.unknown()),
    propertyNames: z.string(),
    readOnly: z.boolean(),
    required: z.array(z.string()),
    then: z.string(),
    title: z.string(),
    type: z.array(z.string()),
    uniqueItems: z.boolean(),
    writeOnly: z.boolean(),
  }).optional(),
  inputParameters: z.array(z.object({
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
      additionalItems: z.string(),
      additionalProperties: z.string(),
      allOf: z.array(z.string()),
      anyOf: z.array(z.string()),
      const: z.string(),
      contains: z.string(),
      contentEncoding: z.string(),
      contentMediaType: z.string(),
      default: z.string(),
      definitions: z.record(z.string(), z.unknown()),
      dependencies: z.record(z.string(), z.unknown()),
      description: z.string(),
      else: z.string(),
      enum: z.array(z.string()),
      examples: z.array(z.string()),
      exclusiveMaximum: z.string(),
      exclusiveMinimum: z.string(),
      format: z.string(),
      if: z.string(),
      items: z.string(),
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
      not: z.string(),
      oneOf: z.array(z.string()),
      pattern: z.string(),
      patternProperties: z.record(z.string(), z.unknown()),
      properties: z.record(z.string(), z.unknown()),
      propertyNames: z.string(),
      readOnly: z.boolean(),
      required: z.array(z.string()),
      then: z.string(),
      title: z.string(),
      type: z.array(z.string()),
      uniqueItems: z.boolean(),
      writeOnly: z.boolean(),
    }),
    name: z.string(),
    nullable: z.boolean(),
  })).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  resultJsonSchema: z.object({
    $comment: z.string(),
    $defs: z.record(z.string(), z.unknown()),
    $id: z.string(),
    $ref: z.string(),
    $schema: z.string(),
    additionalDetails: z.record(z.string(), z.unknown()),
    additionalItems: z.string(),
    additionalProperties: z.string(),
    allOf: z.array(z.string()),
    anyOf: z.array(z.string()),
    const: z.string(),
    contains: z.string(),
    contentEncoding: z.string(),
    contentMediaType: z.string(),
    default: z.string(),
    definitions: z.record(z.string(), z.unknown()),
    dependencies: z.record(z.string(), z.unknown()),
    description: z.string(),
    else: z.string(),
    enum: z.array(z.string()),
    examples: z.array(z.string()),
    exclusiveMaximum: z.string(),
    exclusiveMinimum: z.string(),
    format: z.string(),
    if: z.string(),
    items: z.string(),
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
    not: z.string(),
    oneOf: z.array(z.string()),
    pattern: z.string(),
    patternProperties: z.record(z.string(), z.unknown()),
    properties: z.record(z.string(), z.unknown()),
    propertyNames: z.string(),
    readOnly: z.boolean(),
    required: z.array(z.string()),
    then: z.string(),
    title: z.string(),
    type: z.array(z.string()),
    uniqueItems: z.boolean(),
    writeOnly: z.boolean(),
  }).optional(),
  resultMetadata: z.array(z.object({
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
      additionalItems: z.string(),
      additionalProperties: z.string(),
      allOf: z.array(z.string()),
      anyOf: z.array(z.string()),
      const: z.string(),
      contains: z.string(),
      contentEncoding: z.string(),
      contentMediaType: z.string(),
      default: z.string(),
      definitions: z.record(z.string(), z.unknown()),
      dependencies: z.record(z.string(), z.unknown()),
      description: z.string(),
      else: z.string(),
      enum: z.array(z.string()),
      examples: z.array(z.string()),
      exclusiveMaximum: z.string(),
      exclusiveMinimum: z.string(),
      format: z.string(),
      if: z.string(),
      items: z.string(),
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
      not: z.string(),
      oneOf: z.array(z.string()),
      pattern: z.string(),
      patternProperties: z.record(z.string(), z.unknown()),
      properties: z.record(z.string(), z.unknown()),
      propertyNames: z.string(),
      readOnly: z.boolean(),
      required: z.array(z.string()),
      then: z.string(),
      title: z.string(),
      type: z.array(z.string()),
      uniqueItems: z.boolean(),
      writeOnly: z.boolean(),
    }),
    name: z.string(),
    nullable: z.boolean(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Connectors Connections.Actions. Registered at `@swamp/gcp/connectors/connections-actions`. */
export const model = {
  type: "@swamp/gcp/connectors/connections-actions",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Action message contains metadata information about a single action present in...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a actions",
      arguments: z.object({
        identifier: z.string().describe("The name of the actions"),
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
      description: "Sync actions state from GCP",
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
    execute: {
      description: "execute",
      arguments: z.object({
        executionConfig: z.any().optional(),
        parameters: z.any().optional(),
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
        if (args["executionConfig"] !== undefined) {
          body["executionConfig"] = args["executionConfig"];
        }
        if (args["parameters"] !== undefined) {
          body["parameters"] = args["parameters"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "connectors.projects.locations.connections.actions.execute",
            "path": "v2/{+name}:execute",
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
