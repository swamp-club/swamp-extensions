// Auto-generated extension model for @swamp/gcp/documentai/schemas-schemaversions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Document AI Schemas.SchemaVersions.
 *
 * SchemaVersion is a version of the Schema which is created in SchemaGroup.
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
  return `${parent}/schemaVersions/${shortName}`;
}

const BASE_URL = "https://documentai.googleapis.com/";

const GET_CONFIG = {
  "id": "documentai.projects.locations.schemas.schemaVersions.get",
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
  "id": "documentai.projects.locations.schemas.schemaVersions.create",
  "path": "v1/{+parent}/schemaVersions",
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

const PATCH_CONFIG = {
  "id": "documentai.projects.locations.schemas.schemaVersions.patch",
  "path": "v1/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "documentai.projects.locations.schemas.schemaVersions.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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

const GlobalArgsSchema = z.object({
  displayName: z.string().describe(
    "Required. The user-defined name of the SchemaVersion.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The {{gcp_name_short}} labels for the SchemaVersion.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the SchemaVersion. Format: `projects/{project}/locations/{location}/schemas/{schema}/schemaVersions/{schema_version}`",
  ).optional(),
  schema: z.object({
    description: z.string().describe("Description of the schema.").optional(),
    displayName: z.string().describe("Display name to show users.").optional(),
    documentPrompt: z.string().describe(
      "Optional. Document level prompt provided by the user. This custom text is injected into the AI model's prompt to provide extra, document-wide guidance for processing.",
    ).optional(),
    entityTypes: z.array(z.object({
      baseTypes: z.array(z.string()).describe(
        "The entity type that this type is derived from. For now, one and only one should be set.",
      ).optional(),
      displayName: z.string().describe("User defined name for the type.")
        .optional(),
      enumValues: z.object({
        values: z.array(z.unknown()).describe(
          "The individual values that this enum values type can include.",
        ).optional(),
      }).describe("Defines the a list of enum values.").optional(),
      name: z.string().describe(
        'Name of the type. It must be unique within the schema file and cannot be a "Common Type". The following naming conventions are used: - Use `snake_casing`. - Name matching is case-sensitive. - Maximum 64 characters. - Must start with a letter. - Allowed characters: ASCII letters `[a-z0-9_-]`. (For backward compatibility, internal infrastructure and tooling can handle any ASCII character.) - The `/` is sometimes used to denote a property of a type. For example `line_item/amount`. This convention is deprecated, but will still be honored for backward compatibility.',
      ).optional(),
      properties: z.array(z.object({
        displayName: z.unknown().describe("User defined name for the property.")
          .optional(),
        method: z.unknown().describe(
          "Specifies how the entity's value is obtained.",
        ).optional(),
        name: z.unknown().describe(
          "The name of the property. Follows the same guidelines as the EntityType name.",
        ).optional(),
        occurrenceType: z.unknown().describe(
          "Occurrence type limits the number of instances an entity type appears in the document.",
        ).optional(),
        valueType: z.unknown().describe(
          "A reference to the value type of the property. This type is subject to the same conventions as the `Entity.base_types` field.",
        ).optional(),
      })).describe(
        "Description the nested structure, or composition of an entity.",
      ).optional(),
    })).describe("Entity types of the schema.").optional(),
    metadata: z.object({
      documentAllowMultipleLabels: z.boolean().describe(
        "If true, on a given page, there can be multiple `document` annotations covering it.",
      ).optional(),
      documentSplitter: z.boolean().describe(
        "If true, a `document` entity type can be applied to subdocument (splitting). Otherwise, it can only be applied to the entire document (classification).",
      ).optional(),
      prefixedNamingOnProperties: z.boolean().describe(
        "If set, all the nested entities must be prefixed with the parents.",
      ).optional(),
      skipNamingValidation: z.boolean().describe(
        "If set, this will skip the naming format validation in the schema. So the string values in `DocumentSchema.EntityType.name` and `DocumentSchema.EntityType.Property.name` will not be checked.",
      ).optional(),
    }).describe("Metadata for global schema behavior.").optional(),
  }).describe(
    "The schema defines the output of the processed document by a processor.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  schema: z.object({
    description: z.string(),
    displayName: z.string(),
    documentPrompt: z.string(),
    entityTypes: z.array(z.object({
      baseTypes: z.array(z.string()),
      displayName: z.string(),
      enumValues: z.object({
        values: z.array(z.unknown()),
      }),
      name: z.string(),
      properties: z.array(z.object({
        displayName: z.unknown(),
        method: z.unknown(),
        name: z.unknown(),
        occurrenceType: z.unknown(),
        valueType: z.unknown(),
      })),
    })),
    metadata: z.object({
      documentAllowMultipleLabels: z.boolean(),
      documentSplitter: z.boolean(),
      prefixedNamingOnProperties: z.boolean(),
      skipNamingValidation: z.boolean(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  displayName: z.string().describe(
    "Required. The user-defined name of the SchemaVersion.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The {{gcp_name_short}} labels for the SchemaVersion.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the SchemaVersion. Format: `projects/{project}/locations/{location}/schemas/{schema}/schemaVersions/{schema_version}`",
  ).optional(),
  schema: z.object({
    description: z.string().describe("Description of the schema.").optional(),
    displayName: z.string().describe("Display name to show users.").optional(),
    documentPrompt: z.string().describe(
      "Optional. Document level prompt provided by the user. This custom text is injected into the AI model's prompt to provide extra, document-wide guidance for processing.",
    ).optional(),
    entityTypes: z.array(z.object({
      baseTypes: z.array(z.string()).describe(
        "The entity type that this type is derived from. For now, one and only one should be set.",
      ).optional(),
      displayName: z.string().describe("User defined name for the type.")
        .optional(),
      enumValues: z.object({
        values: z.array(z.unknown()).describe(
          "The individual values that this enum values type can include.",
        ).optional(),
      }).describe("Defines the a list of enum values.").optional(),
      name: z.string().describe(
        'Name of the type. It must be unique within the schema file and cannot be a "Common Type". The following naming conventions are used: - Use `snake_casing`. - Name matching is case-sensitive. - Maximum 64 characters. - Must start with a letter. - Allowed characters: ASCII letters `[a-z0-9_-]`. (For backward compatibility, internal infrastructure and tooling can handle any ASCII character.) - The `/` is sometimes used to denote a property of a type. For example `line_item/amount`. This convention is deprecated, but will still be honored for backward compatibility.',
      ).optional(),
      properties: z.array(z.object({
        displayName: z.unknown().describe("User defined name for the property.")
          .optional(),
        method: z.unknown().describe(
          "Specifies how the entity's value is obtained.",
        ).optional(),
        name: z.unknown().describe(
          "The name of the property. Follows the same guidelines as the EntityType name.",
        ).optional(),
        occurrenceType: z.unknown().describe(
          "Occurrence type limits the number of instances an entity type appears in the document.",
        ).optional(),
        valueType: z.unknown().describe(
          "A reference to the value type of the property. This type is subject to the same conventions as the `Entity.base_types` field.",
        ).optional(),
      })).describe(
        "Description the nested structure, or composition of an entity.",
      ).optional(),
    })).describe("Entity types of the schema.").optional(),
    metadata: z.object({
      documentAllowMultipleLabels: z.boolean().describe(
        "If true, on a given page, there can be multiple `document` annotations covering it.",
      ).optional(),
      documentSplitter: z.boolean().describe(
        "If true, a `document` entity type can be applied to subdocument (splitting). Otherwise, it can only be applied to the entire document (classification).",
      ).optional(),
      prefixedNamingOnProperties: z.boolean().describe(
        "If set, all the nested entities must be prefixed with the parents.",
      ).optional(),
      skipNamingValidation: z.boolean().describe(
        "If set, this will skip the naming format validation in the schema. So the string values in `DocumentSchema.EntityType.name` and `DocumentSchema.EntityType.Property.name` will not be checked.",
      ).optional(),
    }).describe("Metadata for global schema behavior.").optional(),
  }).describe(
    "The schema defines the output of the processed document by a processor.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Document AI Schemas.SchemaVersions. Registered at `@swamp/gcp/documentai/schemas-schemaversions`. */
export const model = {
  type: "@swamp/gcp/documentai/schemas-schemaversions",
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
      toVersion: "2026.04.04.1",
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
        "SchemaVersion is a version of the Schema which is created in SchemaGroup.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a schemaVersions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["schema"] !== undefined) body["schema"] = g["schema"];
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
      description: "Get a schemaVersions",
      arguments: z.object({
        identifier: z.string().describe("The name of the schemaVersions"),
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
      description: "Update schemaVersions attributes",
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
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["schema"] !== undefined) body["schema"] = g["schema"];
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
      description: "Delete the schemaVersions",
      arguments: z.object({
        identifier: z.string().describe("The name of the schemaVersions"),
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
      description: "Sync schemaVersions state from GCP",
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
    generate: {
      description: "generate",
      arguments: z.object({
        baseSchemaVersion: z.any().optional(),
        gcsDocuments: z.any().optional(),
        gcsPrefix: z.any().optional(),
        generateSchemaVersionParams: z.any().optional(),
        inlineDocuments: z.any().optional(),
        rawDocuments: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["baseSchemaVersion"] !== undefined) {
          body["baseSchemaVersion"] = args["baseSchemaVersion"];
        }
        if (args["gcsDocuments"] !== undefined) {
          body["gcsDocuments"] = args["gcsDocuments"];
        }
        if (args["gcsPrefix"] !== undefined) {
          body["gcsPrefix"] = args["gcsPrefix"];
        }
        if (args["generateSchemaVersionParams"] !== undefined) {
          body["generateSchemaVersionParams"] =
            args["generateSchemaVersionParams"];
        }
        if (args["inlineDocuments"] !== undefined) {
          body["inlineDocuments"] = args["inlineDocuments"];
        }
        if (args["rawDocuments"] !== undefined) {
          body["rawDocuments"] = args["rawDocuments"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "documentai.projects.locations.schemas.schemaVersions.generate",
            "path": "v1/{+parent}/schemaVersions:generate",
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
