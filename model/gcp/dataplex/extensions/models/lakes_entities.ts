// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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

const LIST_CONFIG = {
  "id": "dataplex.projects.locations.lakes.zones.entities.list",
  "path": "v1/{+parent}/entities",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  asset: z.string().describe(
    "Required. Immutable. The ID of the asset associated with the storage location containing the entity data. The entity must be with in the same zone with the asset.",
  ).optional(),
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
    }).describe("Optional. Additional information about CSV formatted data.")
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
    }).describe("Optional. Additional information about iceberg tables.")
      .optional(),
    json: z.object({
      encoding: z.string().describe(
        'Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8" and "ISO-8859-1". Defaults to UTF-8 if not specified.',
      ).optional(),
    }).describe("Optional. Additional information about CSV formatted data.")
      .optional(),
    mimeType: z.string().describe(
      "Required. The mime type descriptor for the data. Must match the pattern {type}/{subtype}. Supported values: application/x-parquet application/x-avro application/x-orc application/x-tfrecord application/x-parquet+iceberg application/x-avro+iceberg application/x-orc+iceberg application/json application/{subtypes} text/csv text/ image/{image subtype} video/{video subtype} audio/{audio subtype}",
    ).optional(),
  }).describe(
    "Required. Identifies the storage format of the entity data. It does not apply to entities with data stored in BigQuery.",
  ).optional(),
  id: z.string().describe(
    "Required. A user-provided entity ID. It is mutable, and will be used as the published table name. Specifying a new ID in an update entity request will override the existing value. The ID must contain only letters (a-z, A-Z), numbers (0-9), and underscores, and consist of 256 or fewer characters.",
  ).optional(),
  schema: z.object({
    fields: z.array(z.object({
      description: z.string().describe(
        "Optional. User friendly field description. Must be less than or equal to 1024 characters.",
      ).optional(),
      fields: z.array(z.record(z.string(), z.unknown())).describe(
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
    "Required. The description of the data structure and layout. The schema is not included in list responses. It is only included in SCHEMA and FULL entity views of a GetEntity response.",
  ).optional(),
  system: z.enum(["STORAGE_SYSTEM_UNSPECIFIED", "CLOUD_STORAGE", "BIGQUERY"])
    .describe(
      "Required. Immutable. Identifies the storage system of the entity data.",
    ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TABLE", "FILESET"]).describe(
    "Required. Immutable. The type of entity.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
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
      fields: z.array(z.record(z.string(), z.unknown())),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  asset: z.string().describe(
    "Required. Immutable. The ID of the asset associated with the storage location containing the entity data. The entity must be with in the same zone with the asset.",
  ).optional(),
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
    }).describe("Optional. Additional information about CSV formatted data.")
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
    }).describe("Optional. Additional information about iceberg tables.")
      .optional(),
    json: z.object({
      encoding: z.string().describe(
        'Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8" and "ISO-8859-1". Defaults to UTF-8 if not specified.',
      ).optional(),
    }).describe("Optional. Additional information about CSV formatted data.")
      .optional(),
    mimeType: z.string().describe(
      "Required. The mime type descriptor for the data. Must match the pattern {type}/{subtype}. Supported values: application/x-parquet application/x-avro application/x-orc application/x-tfrecord application/x-parquet+iceberg application/x-avro+iceberg application/x-orc+iceberg application/json application/{subtypes} text/csv text/ image/{image subtype} video/{video subtype} audio/{audio subtype}",
    ).optional(),
  }).describe(
    "Required. Identifies the storage format of the entity data. It does not apply to entities with data stored in BigQuery.",
  ).optional(),
  id: z.string().describe(
    "Required. A user-provided entity ID. It is mutable, and will be used as the published table name. Specifying a new ID in an update entity request will override the existing value. The ID must contain only letters (a-z, A-Z), numbers (0-9), and underscores, and consist of 256 or fewer characters.",
  ).optional(),
  schema: z.object({
    fields: z.array(z.object({
      description: z.string().describe(
        "Optional. User friendly field description. Must be less than or equal to 1024 characters.",
      ).optional(),
      fields: z.array(z.record(z.string(), z.unknown())).describe(
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
    "Required. The description of the data structure and layout. The schema is not included in list responses. It is only included in SCHEMA and FULL entity views of a GetEntity response.",
  ).optional(),
  system: z.enum(["STORAGE_SYSTEM_UNSPECIFIED", "CLOUD_STORAGE", "BIGQUERY"])
    .describe(
      "Required. Immutable. Identifies the storage system of the entity data.",
    ).optional(),
  type: z.enum(["TYPE_UNSPECIFIED", "TABLE", "FILESET"]).describe(
    "Required. Immutable. The type of entity.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Dataplex Lakes.Entities. Registered at `@swamp/gcp/dataplex/lakes-entities`. */
export const model = {
  type: "@swamp/gcp/dataplex/lakes-entities",
  version: "2026.09.29.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "Removed: access, compatibility",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { access: _access, compatibility: _compatibility, ...rest } = old;
        return rest;
      },
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      toVersion: "2026.09.29.1",
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
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["asset"] !== undefined) body["asset"] = g["asset"];
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
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
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
    update: {
      description: "Update entities attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific entities by name (e.g. one discovered by list)",
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
        const params: Record<string, string> = { project: projectId };
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
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
        let live: Record<string, unknown> | undefined;
        const unset = [
          "dataPathPattern",
          "description",
          "displayName",
          "format",
          "id",
          "schema",
        ].filter((k) => body[k] === undefined);
        if (unset.length > 0) {
          live = await readResource(
            baseUrl,
            GET_CONFIG,
            params,
            credentials,
          ) as Record<string, unknown>;
          for (const k of unset) {
            if (live[k] !== undefined && live[k] !== null) body[k] = live[k];
          }
        }
        const concurrency: Record<string, unknown> = live ?? existing;
        for (const key of Object.keys(concurrency)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = concurrency[key];
          }
        }
        const result = await updateResource(
          baseUrl,
          UPDATE_CONFIG,
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
      description: "Delete the entities",
      arguments: z.object({
        identifier: z.string().describe("The name of the entities"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          baseUrl,
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
      description: "Sync entities state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific entities by name (e.g. one discovered by list)",
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
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
          const result = await readResource(
            baseUrl,
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
      description: "List entities resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. The following filter parameters can be added to the URL to limit the entities returned by the API: Entity ID: ?filter="id=entityID" Asset ID: ?filter="asset=assetID" Data path ?filter="data_path=gs://my-bucket" Is HIVE compatible: ?filter="hive_compatible=true" Is BigQuery compatible: ?filter="bigquery_compatible=true"',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of entities to return. The service may return fewer than this value. If unspecified, 100 entities will be returned by default. The maximum value is 500; larger values will will be truncated to 500.",
        ).optional(),
        view: z.string().describe(
          "Required. Specify the entity view to make a partial list request.",
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
        if (args["view"] !== undefined) params["view"] = String(args["view"]);
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "entities",
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
