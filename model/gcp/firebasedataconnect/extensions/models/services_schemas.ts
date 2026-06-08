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

// Auto-generated extension model for @swamp/gcp/firebasedataconnect/services-schemas
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase SQL Connect Services.Schemas.
 *
 * The application schema of a Firebase SQL Connect service.
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
  return `${parent}/schemas/${shortName}`;
}

const BASE_URL = "https://firebasedataconnect.googleapis.com/";

const GET_CONFIG = {
  "id": "firebasedataconnect.projects.locations.services.schemas.get",
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
  "id": "firebasedataconnect.projects.locations.services.schemas.create",
  "path": "v1/{+parent}/schemas",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
    "schemaId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "firebasedataconnect.projects.locations.services.schemas.patch",
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
  "id": "firebasedataconnect.projects.locations.services.schemas.delete",
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

const LIST_CONFIG = {
  "id": "firebasedataconnect.projects.locations.services.schemas.list",
  "path": "v1/{+parent}/schemas",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Stores small amounts of arbitrary data.",
  ).optional(),
  datasources: z.array(z.object({
    httpGraphql: z.object({
      timeout: z.string().describe(
        "Optional. Timeout duration for the HTTP request.",
      ).optional(),
      uri: z.string().describe(
        "Required. The endpoint of the HTTP GraphQL server.",
      ).optional(),
    }).describe("Settings for HTTP GraphQL server webhook.").optional(),
    postgresql: z.object({
      cloudSql: z.object({
        instance: z.string().describe(
          "Required. Name of the CloudSQL instance, in the format: ` projects/{project}/locations/{location}/instances/{instance} `",
        ).optional(),
      }).describe("Settings for CloudSQL instance configuration.").optional(),
      database: z.string().describe(
        "Required. Name of the PostgreSQL database.",
      ).optional(),
      ephemeral: z.boolean().describe(
        "Output only. Ephemeral is true if this SQL Connect service is served from temporary in-memory emulation of Postgres. While Cloud SQL is being provisioned, the SQL Connect service provides the ephemeral service to help developers get started. Once the Cloud SQL is provisioned, SQL Connect service will transfer its data on a best-effort basis to the Cloud SQL instance. WARNING: Ephemeral data sources will expire after 24 hour. The data will be lost if they aren't transferred to the Cloud SQL instance. WARNING: When `ephemeral=true`, mutations to the database are not guaranteed to be durably persisted, even if an OK status code is returned. All or parts of the data may be lost or reverted to earlier versions.",
      ).optional(),
      schema: z.string().describe(
        'Optional. User-configured PostgreSQL schema. Defaults to "public" if not specified.',
      ).optional(),
      schemaMigration: z.enum([
        "SQL_SCHEMA_MIGRATION_UNSPECIFIED",
        "MIGRATE_COMPATIBLE",
      ]).describe(
        "Optional. Configure how to perform automatic PostgreSQL schema migration before deploying the FDC schema. This is an additive-only operation.",
      ).optional(),
      schemaValidation: z.enum([
        "SQL_SCHEMA_VALIDATION_UNSPECIFIED",
        "NONE",
        "STRICT",
        "COMPATIBLE",
      ]).describe(
        "Optional. Configure how much PostgreSQL schema validation to perform against the live database before deploying the FDC schema.",
      ).optional(),
      unlinked: z.boolean().describe(
        "No Postgres data source is linked. If set, don't allow `database` and `schema_validation` to be configured.",
      ).optional(),
    }).describe("Settings for PostgreSQL data source.").optional(),
  })).describe("Required. The data sources linked in the schema.").optional(),
  displayName: z.string().describe(
    "Optional. Mutable human-readable name. 63 character limit.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The relative resource name of the schema, in the format: ` projects/{project}/locations/{location}/services/{service}/schemas/{schema} ` Right now, the only supported schema is "main".',
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
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  schemaId: z.string().describe(
    "Required. The ID to use for the schema, which will become the final component of the schema's resource name. Currently, only `main` is supported and any other schema ID will result in an error.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  datasources: z.array(z.object({
    httpGraphql: z.object({
      timeout: z.string(),
      uri: z.string(),
    }),
    postgresql: z.object({
      cloudSql: z.object({
        instance: z.string(),
      }),
      database: z.string(),
      ephemeral: z.boolean(),
      schema: z.string(),
      schemaMigration: z.string(),
      schemaValidation: z.string(),
      unlinked: z.boolean(),
    }),
  })).optional(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Stores small amounts of arbitrary data.",
  ).optional(),
  datasources: z.array(z.object({
    httpGraphql: z.object({
      timeout: z.string().describe(
        "Optional. Timeout duration for the HTTP request.",
      ).optional(),
      uri: z.string().describe(
        "Required. The endpoint of the HTTP GraphQL server.",
      ).optional(),
    }).describe("Settings for HTTP GraphQL server webhook.").optional(),
    postgresql: z.object({
      cloudSql: z.object({
        instance: z.string().describe(
          "Required. Name of the CloudSQL instance, in the format: ` projects/{project}/locations/{location}/instances/{instance} `",
        ).optional(),
      }).describe("Settings for CloudSQL instance configuration.").optional(),
      database: z.string().describe(
        "Required. Name of the PostgreSQL database.",
      ).optional(),
      ephemeral: z.boolean().describe(
        "Output only. Ephemeral is true if this SQL Connect service is served from temporary in-memory emulation of Postgres. While Cloud SQL is being provisioned, the SQL Connect service provides the ephemeral service to help developers get started. Once the Cloud SQL is provisioned, SQL Connect service will transfer its data on a best-effort basis to the Cloud SQL instance. WARNING: Ephemeral data sources will expire after 24 hour. The data will be lost if they aren't transferred to the Cloud SQL instance. WARNING: When `ephemeral=true`, mutations to the database are not guaranteed to be durably persisted, even if an OK status code is returned. All or parts of the data may be lost or reverted to earlier versions.",
      ).optional(),
      schema: z.string().describe(
        'Optional. User-configured PostgreSQL schema. Defaults to "public" if not specified.',
      ).optional(),
      schemaMigration: z.enum([
        "SQL_SCHEMA_MIGRATION_UNSPECIFIED",
        "MIGRATE_COMPATIBLE",
      ]).describe(
        "Optional. Configure how to perform automatic PostgreSQL schema migration before deploying the FDC schema. This is an additive-only operation.",
      ).optional(),
      schemaValidation: z.enum([
        "SQL_SCHEMA_VALIDATION_UNSPECIFIED",
        "NONE",
        "STRICT",
        "COMPATIBLE",
      ]).describe(
        "Optional. Configure how much PostgreSQL schema validation to perform against the live database before deploying the FDC schema.",
      ).optional(),
      unlinked: z.boolean().describe(
        "No Postgres data source is linked. If set, don't allow `database` and `schema_validation` to be configured.",
      ).optional(),
    }).describe("Settings for PostgreSQL data source.").optional(),
  })).describe("Required. The data sources linked in the schema.").optional(),
  displayName: z.string().describe(
    "Optional. Mutable human-readable name. 63 character limit.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The relative resource name of the schema, in the format: ` projects/{project}/locations/{location}/services/{service}/schemas/{schema} ` Right now, the only supported schema is "main".',
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
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  schemaId: z.string().describe(
    "Required. The ID to use for the schema, which will become the final component of the schema's resource name. Currently, only `main` is supported and any other schema ID will result in an error.",
  ).optional(),
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

/** Swamp extension model for Google Cloud Firebase SQL Connect Services.Schemas. Registered at `@swamp/gcp/firebasedataconnect/services-schemas`. */
export const model = {
  type: "@swamp/gcp/firebasedataconnect/services-schemas",
  version: "2026.06.08.1",
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
      toVersion: "2026.05.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
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
      toVersion: "2026.06.05.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "The application schema of a Firebase SQL Connect service.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a schemas",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["datasources"] !== undefined) {
          body["datasources"] = g["datasources"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["source"] !== undefined) body["source"] = g["source"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
        if (g["schemaId"] !== undefined) body["schemaId"] = g["schemaId"];
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
      description: "Get a schemas",
      arguments: z.object({
        identifier: z.string().describe("The name of the schemas"),
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
      description: "Update schemas attributes",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["datasources"] !== undefined) {
          body["datasources"] = g["datasources"];
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
      description: "Delete the schemas",
      arguments: z.object({
        identifier: z.string().describe("The name of the schemas"),
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
      description: "Sync schemas state from GCP",
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
      description: "List schemas resources",
      arguments: z.object({
        filter: z.string().describe("Optional. Filtering results.").optional(),
        orderBy: z.string().describe(
          "Optional. Hint for how to order the results.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
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
          "schemas",
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
