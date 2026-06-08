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

// Auto-generated extension model for @swamp/gcp/admin/schemas
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Schemas.
 *
 * The type of API resource. For Schema resources, this is always `admin#directory#schema`.
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

const BASE_URL = "https://admin.googleapis.com/";

const GET_CONFIG = {
  "id": "directory.schemas.get",
  "path": "admin/directory/v1/customer/{customerId}/schemas/{schemaKey}",
  "httpMethod": "GET",
  "parameterOrder": [
    "customerId",
    "schemaKey",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
    "schemaKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "directory.schemas.insert",
  "path": "admin/directory/v1/customer/{customerId}/schemas",
  "httpMethod": "POST",
  "parameterOrder": [
    "customerId",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "directory.schemas.update",
  "path": "admin/directory/v1/customer/{customerId}/schemas/{schemaKey}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "customerId",
    "schemaKey",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
    "schemaKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "directory.schemas.delete",
  "path": "admin/directory/v1/customer/{customerId}/schemas/{schemaKey}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "customerId",
    "schemaKey",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
    },
    "schemaKey": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "directory.schemas.list",
  "path": "admin/directory/v1/customer/{customerId}/schemas",
  "httpMethod": "GET",
  "parameterOrder": [
    "customerId",
  ],
  "parameters": {
    "customerId": {
      "location": "path",
      "required": true,
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
  displayName: z.string().describe("Display name for the schema."),
  fields: z.array(z.object({
    displayName: z.string().describe("Display Name of the field.").optional(),
    etag: z.string().describe("The ETag of the field.").optional(),
    fieldId: z.string().describe(
      "The unique identifier of the field (Read-only)",
    ).optional(),
    fieldName: z.string().describe("The name of the field.").optional(),
    fieldType: z.string().describe("The type of the field.").optional(),
    indexed: z.boolean().describe(
      "Boolean specifying whether the field is indexed or not. Default: `true`.",
    ).optional(),
    kind: z.string().describe(
      "The kind of resource this is. For schema fields this is always `admin#directory#schema#fieldspec`.",
    ).optional(),
    multiValued: z.boolean().describe(
      "A boolean specifying whether this is a multi-valued field or not. Default: `false`.",
    ).optional(),
    numericIndexingSpec: z.object({
      maxValue: z.number().describe(
        "Maximum value of this field. This is meant to be indicative rather than enforced. Values outside this range will still be indexed, but search may not be as performant.",
      ).optional(),
      minValue: z.number().describe(
        "Minimum value of this field. This is meant to be indicative rather than enforced. Values outside this range will still be indexed, but search may not be as performant.",
      ).optional(),
    }).describe(
      "Indexing spec for a numeric field. By default, only exact match queries will be supported for numeric fields. Setting the `numericIndexingSpec` allows range queries to be supported.",
    ).optional(),
    readAccessType: z.string().describe(
      "Specifies who can view values of this field. See [Retrieve users as a non-administrator](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users#retrieve_users_non_admin) for more information. Note: It may take up to 24 hours for changes to this field to be reflected.",
    ).optional(),
  })).describe("A list of fields in the schema."),
  schemaId: z.string().describe(
    "The unique identifier of the schema (Read-only)",
  ).optional(),
  schemaName: z.string().describe(
    "The schema's name. Each `schema_name` must be unique within a customer. Reusing a name results in a `409: Entity already exists` error.",
  ),
  customerId: z.string().describe(
    "Immutable ID of the Google Workspace account.",
  ),
});

const StateSchema = z.object({
  displayName: z.string().optional(),
  etag: z.string().optional(),
  fields: z.array(z.object({
    displayName: z.string(),
    etag: z.string(),
    fieldId: z.string(),
    fieldName: z.string(),
    fieldType: z.string(),
    indexed: z.boolean(),
    kind: z.string(),
    multiValued: z.boolean(),
    numericIndexingSpec: z.object({
      maxValue: z.number(),
      minValue: z.number(),
    }),
    readAccessType: z.string(),
  })).optional(),
  kind: z.string().optional(),
  schemaId: z.string().optional(),
  schemaName: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  displayName: z.string().describe("Display name for the schema.").optional(),
  fields: z.array(z.object({
    displayName: z.string().describe("Display Name of the field.").optional(),
    etag: z.string().describe("The ETag of the field.").optional(),
    fieldId: z.string().describe(
      "The unique identifier of the field (Read-only)",
    ).optional(),
    fieldName: z.string().describe("The name of the field.").optional(),
    fieldType: z.string().describe("The type of the field.").optional(),
    indexed: z.boolean().describe(
      "Boolean specifying whether the field is indexed or not. Default: `true`.",
    ).optional(),
    kind: z.string().describe(
      "The kind of resource this is. For schema fields this is always `admin#directory#schema#fieldspec`.",
    ).optional(),
    multiValued: z.boolean().describe(
      "A boolean specifying whether this is a multi-valued field or not. Default: `false`.",
    ).optional(),
    numericIndexingSpec: z.object({
      maxValue: z.number().describe(
        "Maximum value of this field. This is meant to be indicative rather than enforced. Values outside this range will still be indexed, but search may not be as performant.",
      ).optional(),
      minValue: z.number().describe(
        "Minimum value of this field. This is meant to be indicative rather than enforced. Values outside this range will still be indexed, but search may not be as performant.",
      ).optional(),
    }).describe(
      "Indexing spec for a numeric field. By default, only exact match queries will be supported for numeric fields. Setting the `numericIndexingSpec` allows range queries to be supported.",
    ).optional(),
    readAccessType: z.string().describe(
      "Specifies who can view values of this field. See [Retrieve users as a non-administrator](https://developers.google.com/workspace/admin/directory/v1/guides/manage-users#retrieve_users_non_admin) for more information. Note: It may take up to 24 hours for changes to this field to be reflected.",
    ).optional(),
  })).describe("A list of fields in the schema.").optional(),
  schemaId: z.string().describe(
    "The unique identifier of the schema (Read-only)",
  ).optional(),
  schemaName: z.string().describe(
    "The schema's name. Each `schema_name` must be unique within a customer. Reusing a name results in a `409: Entity already exists` error.",
  ).optional(),
  customerId: z.string().describe(
    "Immutable ID of the Google Workspace account.",
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

/** Swamp extension model for Google Cloud Admin SDK Schemas. Registered at `@swamp/gcp/admin/schemas`. */
export const model = {
  type: "@swamp/gcp/admin/schemas",
  version: "2026.06.08.1",
  upgrades: [
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
      description:
        "The type of API resource. For Schema resources, this is always `admin#directo...",
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
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["fields"] !== undefined) body["fields"] = g["fields"];
        if (g["schemaId"] !== undefined) body["schemaId"] = g["schemaId"];
        if (g["schemaName"] !== undefined) body["schemaName"] = g["schemaName"];
        if (g["name"] !== undefined) params["schemaKey"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "customerId": String(g["customerId"] ?? "") },
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
      description: "Get a schemas",
      arguments: z.object({
        identifier: z.string().describe("The name of the schemas"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        params["schemaKey"] = args.identifier;
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
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        } else if (existing["customerId"]) {
          params["customerId"] = String(existing["customerId"]);
        }
        params["schemaKey"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["fields"] !== undefined) body["fields"] = g["fields"];
        if (g["schemaId"] !== undefined) body["schemaId"] = g["schemaId"];
        if (g["schemaName"] !== undefined) body["schemaName"] = g["schemaName"];
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
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
        }
        params["schemaKey"] = args.identifier;
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
          if (g["customerId"] !== undefined) {
            params["customerId"] = String(g["customerId"]);
          } else if (existing["customerId"]) {
            params["customerId"] = String(existing["customerId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["schemaKey"] = identifier;
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
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["customerId"] !== undefined) {
          params["customerId"] = String(g["customerId"]);
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
