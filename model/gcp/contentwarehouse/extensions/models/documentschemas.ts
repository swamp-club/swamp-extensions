// Auto-generated extension model for @swamp/gcp/contentwarehouse/documentschemas
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Document AI Warehouse DocumentSchemas.
 *
 * A document schema used to define document structure.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/documentSchemas/${shortName}`;
}

const BASE_URL = "https://contentwarehouse.googleapis.com/";

const GET_CONFIG = {
  "id": "contentwarehouse.projects.locations.documentSchemas.get",
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
  "id": "contentwarehouse.projects.locations.documentSchemas.create",
  "path": "v1/{+parent}/documentSchemas",
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
  "id": "contentwarehouse.projects.locations.documentSchemas.patch",
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
  },
} as const;

const DELETE_CONFIG = {
  "id": "contentwarehouse.projects.locations.documentSchemas.delete",
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

const LIST_CONFIG = {
  "id": "contentwarehouse.projects.locations.documentSchemas.list",
  "path": "v1/{+parent}/documentSchemas",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  description: z.string().describe("Schema description.").optional(),
  displayName: z.string().describe(
    "Required. Name of the schema given by the user. Must be unique per project.",
  ).optional(),
  documentIsFolder: z.boolean().describe(
    "Document Type, true refers the document is a folder, otherwise it is a typical document.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the document schema. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. The name is ignored when creating a document schema.",
  ).optional(),
  propertyDefinitions: z.array(z.object({
    dateTimeTypeOptions: z.object({}).describe(
      "Configurations for a date time property.",
    ).optional(),
    displayName: z.string().describe(
      "The display-name for the property, used for front-end.",
    ).optional(),
    enumTypeOptions: z.object({
      possibleValues: z.array(z.string()).describe(
        "Required. List of possible enum values.",
      ).optional(),
      validationCheckDisabled: z.boolean().describe(
        "Make sure the Enum property value provided in the document is in the possile value list during document creation. The validation check runs by default.",
      ).optional(),
    }).describe("Configurations for an enum/categorical property.").optional(),
    floatTypeOptions: z.object({}).describe(
      "Configurations for a float property.",
    ).optional(),
    integerTypeOptions: z.object({}).describe(
      "Configurations for an integer property.",
    ).optional(),
    isFilterable: z.boolean().describe(
      "Whether the property can be filtered. If this is a sub-property, all the parent properties must be marked filterable.",
    ).optional(),
    isMetadata: z.boolean().describe(
      "Whether the property is user supplied metadata. This out-of-the box placeholder setting can be used to tag derived properties. Its value and interpretation logic should be implemented by API user.",
    ).optional(),
    isRepeatable: z.boolean().describe(
      "Whether the property can have multiple values.",
    ).optional(),
    isRequired: z.boolean().describe(
      "Whether the property is mandatory. Default is 'false', i.e. populating property value can be skipped. If 'true' then user must populate the value for this property.",
    ).optional(),
    isSearchable: z.boolean().describe(
      "Indicates that the property should be included in a global search.",
    ).optional(),
    mapTypeOptions: z.object({}).describe("Configurations for a Map property.")
      .optional(),
    name: z.string().describe(
      "Required. The name of the metadata property. Must be unique within a document schema and is case insensitive. Names must be non-blank, start with a letter, and can contain alphanumeric characters and: /,:, -, _, and.",
    ).optional(),
    propertyTypeOptions: z.object({
      propertyDefinitions: z.array(z.record(z.string(), z.unknown())).describe(
        "Required. List of property definitions.",
      ).optional(),
    }).describe("Configurations for a nested structured data property.")
      .optional(),
    retrievalImportance: z.enum([
      "RETRIEVAL_IMPORTANCE_UNSPECIFIED",
      "HIGHEST",
      "HIGHER",
      "HIGH",
      "MEDIUM",
      "LOW",
      "LOWEST",
    ]).describe("The retrieval importance of the property during search.")
      .optional(),
    schemaSources: z.array(z.object({
      name: z.string().describe("The schema name in the source.").optional(),
      processorType: z.string().describe("The Doc AI processor type name.")
        .optional(),
    })).describe(
      "The mapping information between this property to another schema source.",
    ).optional(),
    textTypeOptions: z.object({}).describe(
      "Configurations for a text property.",
    ).optional(),
    timestampTypeOptions: z.object({}).describe(
      "Configurations for a timestamp property.",
    ).optional(),
  })).describe("Document details.").optional(),
  documentSchema: z.object({
    createTime: z.string().describe(
      "Output only. The time when the document schema is created.",
    ).optional(),
    description: z.string().describe("Schema description.").optional(),
    displayName: z.string().describe(
      "Required. Name of the schema given by the user. Must be unique per project.",
    ).optional(),
    documentIsFolder: z.boolean().describe(
      "Document Type, true refers the document is a folder, otherwise it is a typical document.",
    ).optional(),
    name: z.string().describe(
      "The resource name of the document schema. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. The name is ignored when creating a document schema.",
    ).optional(),
    propertyDefinitions: z.array(z.object({
      dateTimeTypeOptions: z.object({}).describe(
        "Configurations for a date time property.",
      ).optional(),
      displayName: z.string().describe(
        "The display-name for the property, used for front-end.",
      ).optional(),
      enumTypeOptions: z.object({
        possibleValues: z.array(z.unknown()).describe(
          "Required. List of possible enum values.",
        ).optional(),
        validationCheckDisabled: z.boolean().describe(
          "Make sure the Enum property value provided in the document is in the possile value list during document creation. The validation check runs by default.",
        ).optional(),
      }).describe("Configurations for an enum/categorical property.")
        .optional(),
      floatTypeOptions: z.object({}).describe(
        "Configurations for a float property.",
      ).optional(),
      integerTypeOptions: z.object({}).describe(
        "Configurations for an integer property.",
      ).optional(),
      isFilterable: z.boolean().describe(
        "Whether the property can be filtered. If this is a sub-property, all the parent properties must be marked filterable.",
      ).optional(),
      isMetadata: z.boolean().describe(
        "Whether the property is user supplied metadata. This out-of-the box placeholder setting can be used to tag derived properties. Its value and interpretation logic should be implemented by API user.",
      ).optional(),
      isRepeatable: z.boolean().describe(
        "Whether the property can have multiple values.",
      ).optional(),
      isRequired: z.boolean().describe(
        "Whether the property is mandatory. Default is 'false', i.e. populating property value can be skipped. If 'true' then user must populate the value for this property.",
      ).optional(),
      isSearchable: z.boolean().describe(
        "Indicates that the property should be included in a global search.",
      ).optional(),
      mapTypeOptions: z.object({}).describe(
        "Configurations for a Map property.",
      ).optional(),
      name: z.string().describe(
        "Required. The name of the metadata property. Must be unique within a document schema and is case insensitive. Names must be non-blank, start with a letter, and can contain alphanumeric characters and: /,:, -, _, and.",
      ).optional(),
      propertyTypeOptions: z.object({
        propertyDefinitions: z.array(z.unknown()).describe(
          "Required. List of property definitions.",
        ).optional(),
      }).describe("Configurations for a nested structured data property.")
        .optional(),
      retrievalImportance: z.enum([
        "RETRIEVAL_IMPORTANCE_UNSPECIFIED",
        "HIGHEST",
        "HIGHER",
        "HIGH",
        "MEDIUM",
        "LOW",
        "LOWEST",
      ]).describe("The retrieval importance of the property during search.")
        .optional(),
      schemaSources: z.array(z.object({
        name: z.unknown().describe("The schema name in the source.").optional(),
        processorType: z.unknown().describe("The Doc AI processor type name.")
          .optional(),
      })).describe(
        "The mapping information between this property to another schema source.",
      ).optional(),
      textTypeOptions: z.object({}).describe(
        "Configurations for a text property.",
      ).optional(),
      timestampTypeOptions: z.object({}).describe(
        "Configurations for a timestamp property.",
      ).optional(),
    })).describe("Document details.").optional(),
    updateTime: z.string().describe(
      "Output only. The time when the document schema is last updated.",
    ).optional(),
  }).describe("A document schema used to define document structure.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  documentIsFolder: z.boolean().optional(),
  name: z.string(),
  propertyDefinitions: z.array(z.object({
    dateTimeTypeOptions: z.object({}),
    displayName: z.string(),
    enumTypeOptions: z.object({
      possibleValues: z.array(z.string()),
      validationCheckDisabled: z.boolean(),
    }),
    floatTypeOptions: z.object({}),
    integerTypeOptions: z.object({}),
    isFilterable: z.boolean(),
    isMetadata: z.boolean(),
    isRepeatable: z.boolean(),
    isRequired: z.boolean(),
    isSearchable: z.boolean(),
    mapTypeOptions: z.object({}),
    name: z.string(),
    propertyTypeOptions: z.object({
      propertyDefinitions: z.array(z.record(z.string(), z.unknown())),
    }),
    retrievalImportance: z.string(),
    schemaSources: z.array(z.object({
      name: z.string(),
      processorType: z.string(),
    })),
    textTypeOptions: z.object({}),
    timestampTypeOptions: z.object({}),
  })).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  description: z.string().describe("Schema description.").optional(),
  displayName: z.string().describe(
    "Required. Name of the schema given by the user. Must be unique per project.",
  ).optional(),
  documentIsFolder: z.boolean().describe(
    "Document Type, true refers the document is a folder, otherwise it is a typical document.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the document schema. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. The name is ignored when creating a document schema.",
  ).optional(),
  propertyDefinitions: z.array(z.object({
    dateTimeTypeOptions: z.object({}).describe(
      "Configurations for a date time property.",
    ).optional(),
    displayName: z.string().describe(
      "The display-name for the property, used for front-end.",
    ).optional(),
    enumTypeOptions: z.object({
      possibleValues: z.array(z.string()).describe(
        "Required. List of possible enum values.",
      ).optional(),
      validationCheckDisabled: z.boolean().describe(
        "Make sure the Enum property value provided in the document is in the possile value list during document creation. The validation check runs by default.",
      ).optional(),
    }).describe("Configurations for an enum/categorical property.").optional(),
    floatTypeOptions: z.object({}).describe(
      "Configurations for a float property.",
    ).optional(),
    integerTypeOptions: z.object({}).describe(
      "Configurations for an integer property.",
    ).optional(),
    isFilterable: z.boolean().describe(
      "Whether the property can be filtered. If this is a sub-property, all the parent properties must be marked filterable.",
    ).optional(),
    isMetadata: z.boolean().describe(
      "Whether the property is user supplied metadata. This out-of-the box placeholder setting can be used to tag derived properties. Its value and interpretation logic should be implemented by API user.",
    ).optional(),
    isRepeatable: z.boolean().describe(
      "Whether the property can have multiple values.",
    ).optional(),
    isRequired: z.boolean().describe(
      "Whether the property is mandatory. Default is 'false', i.e. populating property value can be skipped. If 'true' then user must populate the value for this property.",
    ).optional(),
    isSearchable: z.boolean().describe(
      "Indicates that the property should be included in a global search.",
    ).optional(),
    mapTypeOptions: z.object({}).describe("Configurations for a Map property.")
      .optional(),
    name: z.string().describe(
      "Required. The name of the metadata property. Must be unique within a document schema and is case insensitive. Names must be non-blank, start with a letter, and can contain alphanumeric characters and: /,:, -, _, and.",
    ).optional(),
    propertyTypeOptions: z.object({
      propertyDefinitions: z.array(z.record(z.string(), z.unknown())).describe(
        "Required. List of property definitions.",
      ).optional(),
    }).describe("Configurations for a nested structured data property.")
      .optional(),
    retrievalImportance: z.enum([
      "RETRIEVAL_IMPORTANCE_UNSPECIFIED",
      "HIGHEST",
      "HIGHER",
      "HIGH",
      "MEDIUM",
      "LOW",
      "LOWEST",
    ]).describe("The retrieval importance of the property during search.")
      .optional(),
    schemaSources: z.array(z.object({
      name: z.string().describe("The schema name in the source.").optional(),
      processorType: z.string().describe("The Doc AI processor type name.")
        .optional(),
    })).describe(
      "The mapping information between this property to another schema source.",
    ).optional(),
    textTypeOptions: z.object({}).describe(
      "Configurations for a text property.",
    ).optional(),
    timestampTypeOptions: z.object({}).describe(
      "Configurations for a timestamp property.",
    ).optional(),
  })).describe("Document details.").optional(),
  documentSchema: z.object({
    createTime: z.string().describe(
      "Output only. The time when the document schema is created.",
    ).optional(),
    description: z.string().describe("Schema description.").optional(),
    displayName: z.string().describe(
      "Required. Name of the schema given by the user. Must be unique per project.",
    ).optional(),
    documentIsFolder: z.boolean().describe(
      "Document Type, true refers the document is a folder, otherwise it is a typical document.",
    ).optional(),
    name: z.string().describe(
      "The resource name of the document schema. Format: projects/{project_number}/locations/{location}/documentSchemas/{document_schema_id}. The name is ignored when creating a document schema.",
    ).optional(),
    propertyDefinitions: z.array(z.object({
      dateTimeTypeOptions: z.object({}).describe(
        "Configurations for a date time property.",
      ).optional(),
      displayName: z.string().describe(
        "The display-name for the property, used for front-end.",
      ).optional(),
      enumTypeOptions: z.object({
        possibleValues: z.array(z.unknown()).describe(
          "Required. List of possible enum values.",
        ).optional(),
        validationCheckDisabled: z.boolean().describe(
          "Make sure the Enum property value provided in the document is in the possile value list during document creation. The validation check runs by default.",
        ).optional(),
      }).describe("Configurations for an enum/categorical property.")
        .optional(),
      floatTypeOptions: z.object({}).describe(
        "Configurations for a float property.",
      ).optional(),
      integerTypeOptions: z.object({}).describe(
        "Configurations for an integer property.",
      ).optional(),
      isFilterable: z.boolean().describe(
        "Whether the property can be filtered. If this is a sub-property, all the parent properties must be marked filterable.",
      ).optional(),
      isMetadata: z.boolean().describe(
        "Whether the property is user supplied metadata. This out-of-the box placeholder setting can be used to tag derived properties. Its value and interpretation logic should be implemented by API user.",
      ).optional(),
      isRepeatable: z.boolean().describe(
        "Whether the property can have multiple values.",
      ).optional(),
      isRequired: z.boolean().describe(
        "Whether the property is mandatory. Default is 'false', i.e. populating property value can be skipped. If 'true' then user must populate the value for this property.",
      ).optional(),
      isSearchable: z.boolean().describe(
        "Indicates that the property should be included in a global search.",
      ).optional(),
      mapTypeOptions: z.object({}).describe(
        "Configurations for a Map property.",
      ).optional(),
      name: z.string().describe(
        "Required. The name of the metadata property. Must be unique within a document schema and is case insensitive. Names must be non-blank, start with a letter, and can contain alphanumeric characters and: /,:, -, _, and.",
      ).optional(),
      propertyTypeOptions: z.object({
        propertyDefinitions: z.array(z.unknown()).describe(
          "Required. List of property definitions.",
        ).optional(),
      }).describe("Configurations for a nested structured data property.")
        .optional(),
      retrievalImportance: z.enum([
        "RETRIEVAL_IMPORTANCE_UNSPECIFIED",
        "HIGHEST",
        "HIGHER",
        "HIGH",
        "MEDIUM",
        "LOW",
        "LOWEST",
      ]).describe("The retrieval importance of the property during search.")
        .optional(),
      schemaSources: z.array(z.object({
        name: z.unknown().describe("The schema name in the source.").optional(),
        processorType: z.unknown().describe("The Doc AI processor type name.")
          .optional(),
      })).describe(
        "The mapping information between this property to another schema source.",
      ).optional(),
      textTypeOptions: z.object({}).describe(
        "Configurations for a text property.",
      ).optional(),
      timestampTypeOptions: z.object({}).describe(
        "Configurations for a timestamp property.",
      ).optional(),
    })).describe("Document details.").optional(),
    updateTime: z.string().describe(
      "Output only. The time when the document schema is last updated.",
    ).optional(),
  }).describe("A document schema used to define document structure.")
    .optional(),
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

/** Swamp extension model for Google Cloud Document AI Warehouse DocumentSchemas. Registered at `@swamp/gcp/contentwarehouse/documentschemas`. */
export const model = {
  type: "@swamp/gcp/contentwarehouse/documentschemas",
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
      description: "A document schema used to define document structure.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a documentSchemas",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["documentIsFolder"] !== undefined) {
          body["documentIsFolder"] = g["documentIsFolder"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["propertyDefinitions"] !== undefined) {
          body["propertyDefinitions"] = g["propertyDefinitions"];
        }
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
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
      description: "Get a documentSchemas",
      arguments: z.object({
        identifier: z.string().describe("The name of the documentSchemas"),
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
      description: "Update documentSchemas attributes",
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
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["documentSchema"] !== undefined) {
          body["documentSchema"] = g["documentSchema"];
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
          undefined,
          credentials,
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
      description: "Delete the documentSchemas",
      arguments: z.object({
        identifier: z.string().describe("The name of the documentSchemas"),
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
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync documentSchemas state from GCP",
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
      description: "List documentSchemas resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of document schemas to return. The service may return fewer than this value. If unspecified, at most 50 document schemas will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "documentSchemas",
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
