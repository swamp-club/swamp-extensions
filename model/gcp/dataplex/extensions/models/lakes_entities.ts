// Auto-generated extension model for @swamp/gcp/dataplex/lakes-entities
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataplex Lakes.Entities.
 *
 * Represents tables and fileset metadata contained within a zone.
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
  return `${parent}/entities/${shortName}`;
}

const BASE_URL = "https://dataplex.googleapis.com/";

const GET_CONFIG = {
  "id": "dataplex.projects.locations.lakes.zones.entities.get",
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
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dataplex.projects.locations.lakes.zones.entities.create",
  "path": "v1/{+parent}/entities",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dataplex.projects.locations.lakes.zones.entities.update",
  "path": "v1/{+name}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "dataplex.projects.locations.lakes.zones.entities.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "etag": {
      "location": "query",
    },
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  access: z.object({
    read: z.enum(["ACCESS_MODE_UNSPECIFIED", "DIRECT", "MANAGED"]).describe(
      "Output only. Describes the read access mechanism of the data. Not user settable.",
    ).optional(),
  }).describe(
    "Describes the access mechanism of the data within its storage location.",
  ).optional(),
  asset: z.string().describe(
    "Required. Immutable. The ID of the asset associated with the storage location containing the entity data. The entity must be with in the same zone with the asset.",
  ).optional(),
  compatibility: z.object({
    bigquery: z.object({
      compatible: z.boolean().describe(
        "Output only. Whether the entity is compatible and can be represented in the metadata store.",
      ).optional(),
      reason: z.string().describe(
        "Output only. Provides additional detail if the entity is incompatible with the metadata store.",
      ).optional(),
    }).describe(
      "Provides compatibility information for a specific metadata store.",
    ).optional(),
    hiveMetastore: z.object({
      compatible: z.boolean().describe(
        "Output only. Whether the entity is compatible and can be represented in the metadata store.",
      ).optional(),
      reason: z.string().describe(
        "Output only. Provides additional detail if the entity is incompatible with the metadata store.",
      ).optional(),
    }).describe(
      "Provides compatibility information for a specific metadata store.",
    ).optional(),
  }).describe("Provides compatibility information for various metadata stores.")
    .optional(),
  dataPath: z.string().describe(
    "Required. Immutable. The storage path of the entity data. For Cloud Storage data, this is the fully-qualified path to the entity, such as gs://bucket/path/to/data. For BigQuery data, this is the name of the table resource, such as projects/project_id/datasets/dataset_id/tables/table_id.",
  ).optional(),
  dataPathPattern: z.string().describe(
    "Optional. The set of items within the data path constituting the data in the entity, represented as a glob path. Example: gs://bucket/path/to/data/**/*.csv.",
  ).optional(),
  description: z.string().describe(
    "Optional. User friendly longer description text. Must be shorter than or equal to 1024 characters.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Display name must be shorter than or equal to 256 characters.",
  ).optional(),
  format: z.object({
    compressionFormat: z.enum([
      "COMPRESSION_FORMAT_UNSPECIFIED",
      "GZIP",
      "BZIP2",
    ]).describe(
      "Optional. The compression type associated with the stored data. If unspecified, the data is uncompressed.",
    ).optional(),
    csv: z.object({
      delimiter: z.string().describe(
        "Optional. The delimiter used to separate values. Defaults to ','.",
      ).optional(),
      encoding: z.string().describe(
        'Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8", and "ISO-8859-1". Defaults to UTF-8 if unspecified.',
      ).optional(),
      headerRows: z.number().int().describe(
        "Optional. The number of rows to interpret as header rows that should be skipped when reading data rows. Defaults to 0.",
      ).optional(),
      quote: z.string().describe(
        "Optional. The character used to quote column values. Accepts '\"' (double quotation mark) or ''' (single quotation mark). Defaults to '\"' (double quotation mark) if unspecified.",
      ).optional(),
    }).describe("Describes CSV and similar semi-structured data formats.")
      .optional(),
    format: z.enum([
      "FORMAT_UNSPECIFIED",
      "PARQUET",
      "AVRO",
      "ORC",
      "CSV",
      "JSON",
      "IMAGE",
      "AUDIO",
      "VIDEO",
      "TEXT",
      "TFRECORD",
      "OTHER",
      "UNKNOWN",
    ]).describe(
      "Output only. The data format associated with the stored data, which represents content type values. The value is inferred from mime type.",
    ).optional(),
    iceberg: z.object({
      metadataLocation: z.string().describe(
        "Optional. The location of where the iceberg metadata is present, must be within the table path",
      ).optional(),
    }).describe("Describes Iceberg data format.").optional(),
    json: z.object({
      encoding: z.string().describe(
        'Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8" and "ISO-8859-1". Defaults to UTF-8 if not specified.',
      ).optional(),
    }).describe("Describes JSON data format.").optional(),
    mimeType: z.string().describe(
      "Required. The mime type descriptor for the data. Must match the pattern {type}/{subtype}. Supported values: application/x-parquet application/x-avro application/x-orc application/x-tfrecord application/x-parquet+iceberg application/x-avro+iceberg application/x-orc+iceberg application/json application/{subtypes} text/csv text/ image/{image subtype} video/{video subtype} audio/{audio subtype}",
    ).optional(),
  }).describe("Describes the format of the data within its storage location.")
    .optional(),
  id: z.string().describe(
    "Required. A user-provided entity ID. It is mutable, and will be used as the published table name. Specifying a new ID in an update entity request will override the existing value. The ID must contain only letters (a-z, A-Z), numbers (0-9), and underscores, and consist of 256 or fewer characters.",
  ).optional(),
  schema: z.object({
    fields: z.array(z.object({
      description: z.string().describe(
        "Optional. User friendly field description. Must be less than or equal to 1024 characters.",
      ).optional(),
      fields: z.array(z.string()).describe(
        "Optional. Any nested field for complex types.",
      ).optional(),
      mode: z.enum(["MODE_UNSPECIFIED", "REQUIRED", "NULLABLE", "REPEATED"])
        .describe("Required. Additional field semantics.").optional(),
      name: z.string().describe(
        "Required. The name of the field. Must contain only letters, numbers and underscores, with a maximum length of 767 characters, and must begin with a letter or underscore.",
      ).optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "BOOLEAN",
        "BYTE",
        "INT16",
        "INT32",
        "INT64",
        "FLOAT",
        "DOUBLE",
        "DECIMAL",
        "STRING",
        "BINARY",
        "TIMESTAMP",
        "DATE",
        "TIME",
        "RECORD",
        "NULL",
      ]).describe("Required. The type of field.").optional(),
    })).describe(
      "Optional. The sequence of fields describing data in table entities. Note: BigQuery SchemaFields are immutable.",
    ).optional(),
    partitionFields: z.array(z.object({
      name: z.string().describe(
        "Required. Partition field name must consist of letters, numbers, and underscores only, with a maximum of length of 256 characters, and must begin with a letter or underscore..",
      ).optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "BOOLEAN",
        "BYTE",
        "INT16",
        "INT32",
        "INT64",
        "FLOAT",
        "DOUBLE",
        "DECIMAL",
        "STRING",
        "BINARY",
        "TIMESTAMP",
        "DATE",
        "TIME",
        "RECORD",
        "NULL",
      ]).describe("Required. Immutable. The type of field.").optional(),
    })).describe(
      "Optional. The sequence of fields describing the partition structure in entities. If this field is empty, there are no partitions within the data.",
    ).optional(),
    partitionStyle: z.enum(["PARTITION_STYLE_UNSPECIFIED", "HIVE_COMPATIBLE"])
      .describe(
        "Optional. The structure of paths containing partition data within the entity.",
      ).optional(),
    userManaged: z.boolean().describe(
      "Required. Set to true if user-managed or false if managed by Dataplex Universal Catalog. The default is false (managed by Dataplex Universal Catalog). Set to falseto enable Dataplex Universal Catalog discovery to update the schema. including new data discovery, schema inference, and schema evolution. Users retain the ability to input and edit the schema. Dataplex Universal Catalog treats schema input by the user as though produced by a previous Dataplex Universal Catalog discovery operation, and it will evolve the schema and take action based on that treatment. Set to true to fully manage the entity schema. This setting guarantees that Dataplex Universal Catalog will not change schema fields.",
    ).optional(),
  }).describe(
    "Schema information describing the structure and layout of the data.",
  ).optional(),
  system: z.enum(["STORAGE_SYSTEM_UNSPECIFIED", "CLOUD_STORAGE", "BIGQUERY"])
    .describe(
      "Required. Immutable. Identifies the storage system of the entity data.",
    ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TABLE", "FILESET"]).describe(
    "Required. Immutable. The type of entity.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  access: z.object({
    read: z.string(),
  }).optional(),
  asset: z.string().optional(),
  catalogEntry: z.string().optional(),
  compatibility: z.object({
    bigquery: z.object({
      compatible: z.boolean(),
      reason: z.string(),
    }),
    hiveMetastore: z.object({
      compatible: z.boolean(),
      reason: z.string(),
    }),
  }).optional(),
  createTime: z.string().optional(),
  dataPath: z.string().optional(),
  dataPathPattern: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  format: z.object({
    compressionFormat: z.string(),
    csv: z.object({
      delimiter: z.string(),
      encoding: z.string(),
      headerRows: z.number(),
      quote: z.string(),
    }),
    format: z.string(),
    iceberg: z.object({
      metadataLocation: z.string(),
    }),
    json: z.object({
      encoding: z.string(),
    }),
    mimeType: z.string(),
  }).optional(),
  id: z.string().optional(),
  name: z.string(),
  schema: z.object({
    fields: z.array(z.object({
      description: z.string(),
      fields: z.array(z.string()),
      mode: z.string(),
      name: z.string(),
      type: z.string(),
    })),
    partitionFields: z.array(z.object({
      name: z.string(),
      type: z.string(),
    })),
    partitionStyle: z.string(),
    userManaged: z.boolean(),
  }).optional(),
  system: z.string().optional(),
  type: z.string().optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  access: z.object({
    read: z.enum(["ACCESS_MODE_UNSPECIFIED", "DIRECT", "MANAGED"]).describe(
      "Output only. Describes the read access mechanism of the data. Not user settable.",
    ).optional(),
  }).describe(
    "Describes the access mechanism of the data within its storage location.",
  ).optional(),
  asset: z.string().describe(
    "Required. Immutable. The ID of the asset associated with the storage location containing the entity data. The entity must be with in the same zone with the asset.",
  ).optional(),
  compatibility: z.object({
    bigquery: z.object({
      compatible: z.boolean().describe(
        "Output only. Whether the entity is compatible and can be represented in the metadata store.",
      ).optional(),
      reason: z.string().describe(
        "Output only. Provides additional detail if the entity is incompatible with the metadata store.",
      ).optional(),
    }).describe(
      "Provides compatibility information for a specific metadata store.",
    ).optional(),
    hiveMetastore: z.object({
      compatible: z.boolean().describe(
        "Output only. Whether the entity is compatible and can be represented in the metadata store.",
      ).optional(),
      reason: z.string().describe(
        "Output only. Provides additional detail if the entity is incompatible with the metadata store.",
      ).optional(),
    }).describe(
      "Provides compatibility information for a specific metadata store.",
    ).optional(),
  }).describe("Provides compatibility information for various metadata stores.")
    .optional(),
  dataPath: z.string().describe(
    "Required. Immutable. The storage path of the entity data. For Cloud Storage data, this is the fully-qualified path to the entity, such as gs://bucket/path/to/data. For BigQuery data, this is the name of the table resource, such as projects/project_id/datasets/dataset_id/tables/table_id.",
  ).optional(),
  dataPathPattern: z.string().describe(
    "Optional. The set of items within the data path constituting the data in the entity, represented as a glob path. Example: gs://bucket/path/to/data/**/*.csv.",
  ).optional(),
  description: z.string().describe(
    "Optional. User friendly longer description text. Must be shorter than or equal to 1024 characters.",
  ).optional(),
  displayName: z.string().describe(
    "Optional. Display name must be shorter than or equal to 256 characters.",
  ).optional(),
  format: z.object({
    compressionFormat: z.enum([
      "COMPRESSION_FORMAT_UNSPECIFIED",
      "GZIP",
      "BZIP2",
    ]).describe(
      "Optional. The compression type associated with the stored data. If unspecified, the data is uncompressed.",
    ).optional(),
    csv: z.object({
      delimiter: z.string().describe(
        "Optional. The delimiter used to separate values. Defaults to ','.",
      ).optional(),
      encoding: z.string().describe(
        'Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8", and "ISO-8859-1". Defaults to UTF-8 if unspecified.',
      ).optional(),
      headerRows: z.number().int().describe(
        "Optional. The number of rows to interpret as header rows that should be skipped when reading data rows. Defaults to 0.",
      ).optional(),
      quote: z.string().describe(
        "Optional. The character used to quote column values. Accepts '\"' (double quotation mark) or ''' (single quotation mark). Defaults to '\"' (double quotation mark) if unspecified.",
      ).optional(),
    }).describe("Describes CSV and similar semi-structured data formats.")
      .optional(),
    format: z.enum([
      "FORMAT_UNSPECIFIED",
      "PARQUET",
      "AVRO",
      "ORC",
      "CSV",
      "JSON",
      "IMAGE",
      "AUDIO",
      "VIDEO",
      "TEXT",
      "TFRECORD",
      "OTHER",
      "UNKNOWN",
    ]).describe(
      "Output only. The data format associated with the stored data, which represents content type values. The value is inferred from mime type.",
    ).optional(),
    iceberg: z.object({
      metadataLocation: z.string().describe(
        "Optional. The location of where the iceberg metadata is present, must be within the table path",
      ).optional(),
    }).describe("Describes Iceberg data format.").optional(),
    json: z.object({
      encoding: z.string().describe(
        'Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8" and "ISO-8859-1". Defaults to UTF-8 if not specified.',
      ).optional(),
    }).describe("Describes JSON data format.").optional(),
    mimeType: z.string().describe(
      "Required. The mime type descriptor for the data. Must match the pattern {type}/{subtype}. Supported values: application/x-parquet application/x-avro application/x-orc application/x-tfrecord application/x-parquet+iceberg application/x-avro+iceberg application/x-orc+iceberg application/json application/{subtypes} text/csv text/ image/{image subtype} video/{video subtype} audio/{audio subtype}",
    ).optional(),
  }).describe("Describes the format of the data within its storage location.")
    .optional(),
  id: z.string().describe(
    "Required. A user-provided entity ID. It is mutable, and will be used as the published table name. Specifying a new ID in an update entity request will override the existing value. The ID must contain only letters (a-z, A-Z), numbers (0-9), and underscores, and consist of 256 or fewer characters.",
  ).optional(),
  schema: z.object({
    fields: z.array(z.object({
      description: z.string().describe(
        "Optional. User friendly field description. Must be less than or equal to 1024 characters.",
      ).optional(),
      fields: z.array(z.string()).describe(
        "Optional. Any nested field for complex types.",
      ).optional(),
      mode: z.enum(["MODE_UNSPECIFIED", "REQUIRED", "NULLABLE", "REPEATED"])
        .describe("Required. Additional field semantics.").optional(),
      name: z.string().describe(
        "Required. The name of the field. Must contain only letters, numbers and underscores, with a maximum length of 767 characters, and must begin with a letter or underscore.",
      ).optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "BOOLEAN",
        "BYTE",
        "INT16",
        "INT32",
        "INT64",
        "FLOAT",
        "DOUBLE",
        "DECIMAL",
        "STRING",
        "BINARY",
        "TIMESTAMP",
        "DATE",
        "TIME",
        "RECORD",
        "NULL",
      ]).describe("Required. The type of field.").optional(),
    })).describe(
      "Optional. The sequence of fields describing data in table entities. Note: BigQuery SchemaFields are immutable.",
    ).optional(),
    partitionFields: z.array(z.object({
      name: z.string().describe(
        "Required. Partition field name must consist of letters, numbers, and underscores only, with a maximum of length of 256 characters, and must begin with a letter or underscore..",
      ).optional(),
      type: z.enum([
        "TYPE_UNSPECIFIED",
        "BOOLEAN",
        "BYTE",
        "INT16",
        "INT32",
        "INT64",
        "FLOAT",
        "DOUBLE",
        "DECIMAL",
        "STRING",
        "BINARY",
        "TIMESTAMP",
        "DATE",
        "TIME",
        "RECORD",
        "NULL",
      ]).describe("Required. Immutable. The type of field.").optional(),
    })).describe(
      "Optional. The sequence of fields describing the partition structure in entities. If this field is empty, there are no partitions within the data.",
    ).optional(),
    partitionStyle: z.enum(["PARTITION_STYLE_UNSPECIFIED", "HIVE_COMPATIBLE"])
      .describe(
        "Optional. The structure of paths containing partition data within the entity.",
      ).optional(),
    userManaged: z.boolean().describe(
      "Required. Set to true if user-managed or false if managed by Dataplex Universal Catalog. The default is false (managed by Dataplex Universal Catalog). Set to falseto enable Dataplex Universal Catalog discovery to update the schema. including new data discovery, schema inference, and schema evolution. Users retain the ability to input and edit the schema. Dataplex Universal Catalog treats schema input by the user as though produced by a previous Dataplex Universal Catalog discovery operation, and it will evolve the schema and take action based on that treatment. Set to true to fully manage the entity schema. This setting guarantees that Dataplex Universal Catalog will not change schema fields.",
    ).optional(),
  }).describe(
    "Schema information describing the structure and layout of the data.",
  ).optional(),
  system: z.enum(["STORAGE_SYSTEM_UNSPECIFIED", "CLOUD_STORAGE", "BIGQUERY"])
    .describe(
      "Required. Immutable. Identifies the storage system of the entity data.",
    ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TABLE", "FILESET"]).describe(
    "Required. Immutable. The type of entity.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Dataplex Lakes.Entities. Registered at `@swamp/gcp/dataplex/lakes-entities`. */
export const model = {
  type: "@swamp/gcp/dataplex/lakes-entities",
  version: "2026.05.19.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents tables and fileset metadata contained within a zone.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a entities",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["access"] !== undefined) body["access"] = g["access"];
        if (g["asset"] !== undefined) body["asset"] = g["asset"];
        if (g["compatibility"] !== undefined) {
          body["compatibility"] = g["compatibility"];
        }
        if (g["dataPath"] !== undefined) body["dataPath"] = g["dataPath"];
        if (g["dataPathPattern"] !== undefined) {
          body["dataPathPattern"] = g["dataPathPattern"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["schema"] !== undefined) body["schema"] = g["schema"];
        if (g["system"] !== undefined) body["system"] = g["system"];
        if (g["type"] !== undefined) body["type"] = g["type"];
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
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a entities",
      arguments: z.object({
        identifier: z.string().describe("The name of the entities"),
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
    update: {
      description: "Update entities attributes",
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
        if (g["access"] !== undefined) body["access"] = g["access"];
        if (g["compatibility"] !== undefined) {
          body["compatibility"] = g["compatibility"];
        }
        if (g["dataPathPattern"] !== undefined) {
          body["dataPathPattern"] = g["dataPathPattern"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["format"] !== undefined) body["format"] = g["format"];
        if (g["id"] !== undefined) body["id"] = g["id"];
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
      description: "Delete the entities",
      arguments: z.object({
        identifier: z.string().describe("The name of the entities"),
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
      description: "Sync entities state from GCP",
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
  },
};
