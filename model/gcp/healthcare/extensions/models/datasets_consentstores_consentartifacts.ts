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

// Auto-generated extension model for @swamp/gcp/healthcare/datasets-consentstores-consentartifacts
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Healthcare Datasets.ConsentStores.ConsentArtifacts.
 *
 * Documentation of a user's consent.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/consentArtifacts/${shortName}`;
}

const BASE_URL = "https://healthcare.googleapis.com/";

const GET_CONFIG = {
  "id":
    "healthcare.projects.locations.datasets.consentStores.consentArtifacts.get",
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
  "id":
    "healthcare.projects.locations.datasets.consentStores.consentArtifacts.create",
  "path": "v1/{+parent}/consentArtifacts",
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

const DELETE_CONFIG = {
  "id":
    "healthcare.projects.locations.datasets.consentStores.consentArtifacts.delete",
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
  "id":
    "healthcare.projects.locations.datasets.consentStores.consentArtifacts.list",
  "path": "v1/{+parent}/consentArtifacts",
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  consentContentScreenshots: z.array(z.object({
    gcsUri: z.string().describe(
      "Input only. Points to a Cloud Storage URI containing the consent artifact content. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The Cloud Healthcare API service account must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage location. The consent artifact content at this URI is copied to a Cloud Storage location managed by the Cloud Healthcare API. Responses to fetching requests return the consent artifact content in raw_bytes.",
    ).optional(),
    rawBytes: z.string().describe(
      "Consent artifact content represented as a stream of bytes. This field is populated when returned in GetConsentArtifact response, but not included in CreateConsentArtifact and ListConsentArtifact response.",
    ).optional(),
  })).describe(
    "Optional. Screenshots, PDFs, or other binary information documenting the user's consent.",
  ).optional(),
  consentContentVersion: z.string().describe(
    "Optional. An string indicating the version of the consent information shown to the user.",
  ).optional(),
  guardianSignature: z.object({
    image: z.object({
      gcsUri: z.string().describe(
        "Input only. Points to a Cloud Storage URI containing the consent artifact content. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The Cloud Healthcare API service account must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage location. The consent artifact content at this URI is copied to a Cloud Storage location managed by the Cloud Healthcare API. Responses to fetching requests return the consent artifact content in raw_bytes.",
      ).optional(),
      rawBytes: z.string().describe(
        "Consent artifact content represented as a stream of bytes. This field is populated when returned in GetConsentArtifact response, but not included in CreateConsentArtifact and ListConsentArtifact response.",
      ).optional(),
    }).describe("Raw bytes representing consent artifact content.").optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "Optional. Metadata associated with the user's signature. For example, the user's name or the user's title.",
    ).optional(),
    signatureTime: z.string().describe("Optional. Timestamp of the signature.")
      .optional(),
    userId: z.string().describe("Required. User's UUID provided by the client.")
      .optional(),
  }).describe("User signature.").optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Optional. Metadata associated with the Consent artifact. For example, the consent locale or user agent version.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the Consent artifact, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`. Cannot be changed after creation.",
  ).optional(),
  userId: z.string().describe("Required. User's UUID provided by the client.")
    .optional(),
  userSignature: z.object({
    image: z.object({
      gcsUri: z.string().describe(
        "Input only. Points to a Cloud Storage URI containing the consent artifact content. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The Cloud Healthcare API service account must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage location. The consent artifact content at this URI is copied to a Cloud Storage location managed by the Cloud Healthcare API. Responses to fetching requests return the consent artifact content in raw_bytes.",
      ).optional(),
      rawBytes: z.string().describe(
        "Consent artifact content represented as a stream of bytes. This field is populated when returned in GetConsentArtifact response, but not included in CreateConsentArtifact and ListConsentArtifact response.",
      ).optional(),
    }).describe("Raw bytes representing consent artifact content.").optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "Optional. Metadata associated with the user's signature. For example, the user's name or the user's title.",
    ).optional(),
    signatureTime: z.string().describe("Optional. Timestamp of the signature.")
      .optional(),
    userId: z.string().describe("Required. User's UUID provided by the client.")
      .optional(),
  }).describe("User signature.").optional(),
  witnessSignature: z.object({
    image: z.object({
      gcsUri: z.string().describe(
        "Input only. Points to a Cloud Storage URI containing the consent artifact content. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The Cloud Healthcare API service account must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage location. The consent artifact content at this URI is copied to a Cloud Storage location managed by the Cloud Healthcare API. Responses to fetching requests return the consent artifact content in raw_bytes.",
      ).optional(),
      rawBytes: z.string().describe(
        "Consent artifact content represented as a stream of bytes. This field is populated when returned in GetConsentArtifact response, but not included in CreateConsentArtifact and ListConsentArtifact response.",
      ).optional(),
    }).describe("Raw bytes representing consent artifact content.").optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "Optional. Metadata associated with the user's signature. For example, the user's name or the user's title.",
    ).optional(),
    signatureTime: z.string().describe("Optional. Timestamp of the signature.")
      .optional(),
    userId: z.string().describe("Required. User's UUID provided by the client.")
      .optional(),
  }).describe("User signature.").optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  consentContentScreenshots: z.array(z.object({
    gcsUri: z.string(),
    rawBytes: z.string(),
  })).optional(),
  consentContentVersion: z.string().optional(),
  guardianSignature: z.object({
    image: z.object({
      gcsUri: z.string(),
      rawBytes: z.string(),
    }),
    metadata: z.record(z.string(), z.unknown()),
    signatureTime: z.string(),
    userId: z.string(),
  }).optional(),
  metadata: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  userId: z.string().optional(),
  userSignature: z.object({
    image: z.object({
      gcsUri: z.string(),
      rawBytes: z.string(),
    }),
    metadata: z.record(z.string(), z.unknown()),
    signatureTime: z.string(),
    userId: z.string(),
  }).optional(),
  witnessSignature: z.object({
    image: z.object({
      gcsUri: z.string(),
      rawBytes: z.string(),
    }),
    metadata: z.record(z.string(), z.unknown()),
    signatureTime: z.string(),
    userId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  consentContentScreenshots: z.array(z.object({
    gcsUri: z.string().describe(
      "Input only. Points to a Cloud Storage URI containing the consent artifact content. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The Cloud Healthcare API service account must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage location. The consent artifact content at this URI is copied to a Cloud Storage location managed by the Cloud Healthcare API. Responses to fetching requests return the consent artifact content in raw_bytes.",
    ).optional(),
    rawBytes: z.string().describe(
      "Consent artifact content represented as a stream of bytes. This field is populated when returned in GetConsentArtifact response, but not included in CreateConsentArtifact and ListConsentArtifact response.",
    ).optional(),
  })).describe(
    "Optional. Screenshots, PDFs, or other binary information documenting the user's consent.",
  ).optional(),
  consentContentVersion: z.string().describe(
    "Optional. An string indicating the version of the consent information shown to the user.",
  ).optional(),
  guardianSignature: z.object({
    image: z.object({
      gcsUri: z.string().describe(
        "Input only. Points to a Cloud Storage URI containing the consent artifact content. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The Cloud Healthcare API service account must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage location. The consent artifact content at this URI is copied to a Cloud Storage location managed by the Cloud Healthcare API. Responses to fetching requests return the consent artifact content in raw_bytes.",
      ).optional(),
      rawBytes: z.string().describe(
        "Consent artifact content represented as a stream of bytes. This field is populated when returned in GetConsentArtifact response, but not included in CreateConsentArtifact and ListConsentArtifact response.",
      ).optional(),
    }).describe("Raw bytes representing consent artifact content.").optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "Optional. Metadata associated with the user's signature. For example, the user's name or the user's title.",
    ).optional(),
    signatureTime: z.string().describe("Optional. Timestamp of the signature.")
      .optional(),
    userId: z.string().describe("Required. User's UUID provided by the client.")
      .optional(),
  }).describe("User signature.").optional(),
  metadata: z.record(z.string(), z.string()).describe(
    "Optional. Metadata associated with the Consent artifact. For example, the consent locale or user agent version.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the Consent artifact, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`. Cannot be changed after creation.",
  ).optional(),
  userId: z.string().describe("Required. User's UUID provided by the client.")
    .optional(),
  userSignature: z.object({
    image: z.object({
      gcsUri: z.string().describe(
        "Input only. Points to a Cloud Storage URI containing the consent artifact content. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The Cloud Healthcare API service account must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage location. The consent artifact content at this URI is copied to a Cloud Storage location managed by the Cloud Healthcare API. Responses to fetching requests return the consent artifact content in raw_bytes.",
      ).optional(),
      rawBytes: z.string().describe(
        "Consent artifact content represented as a stream of bytes. This field is populated when returned in GetConsentArtifact response, but not included in CreateConsentArtifact and ListConsentArtifact response.",
      ).optional(),
    }).describe("Raw bytes representing consent artifact content.").optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "Optional. Metadata associated with the user's signature. For example, the user's name or the user's title.",
    ).optional(),
    signatureTime: z.string().describe("Optional. Timestamp of the signature.")
      .optional(),
    userId: z.string().describe("Required. User's UUID provided by the client.")
      .optional(),
  }).describe("User signature.").optional(),
  witnessSignature: z.object({
    image: z.object({
      gcsUri: z.string().describe(
        "Input only. Points to a Cloud Storage URI containing the consent artifact content. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The Cloud Healthcare API service account must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage location. The consent artifact content at this URI is copied to a Cloud Storage location managed by the Cloud Healthcare API. Responses to fetching requests return the consent artifact content in raw_bytes.",
      ).optional(),
      rawBytes: z.string().describe(
        "Consent artifact content represented as a stream of bytes. This field is populated when returned in GetConsentArtifact response, but not included in CreateConsentArtifact and ListConsentArtifact response.",
      ).optional(),
    }).describe("Raw bytes representing consent artifact content.").optional(),
    metadata: z.record(z.string(), z.string()).describe(
      "Optional. Metadata associated with the user's signature. For example, the user's name or the user's title.",
    ).optional(),
    signatureTime: z.string().describe("Optional. Timestamp of the signature.")
      .optional(),
    userId: z.string().describe("Required. User's UUID provided by the client.")
      .optional(),
  }).describe("User signature.").optional(),
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

/** Swamp extension model for Google Cloud Healthcare Datasets.ConsentStores.ConsentArtifacts. Registered at `@swamp/gcp/healthcare/datasets-consentstores-consentartifacts`. */
export const model = {
  type: "@swamp/gcp/healthcare/datasets-consentstores-consentartifacts",
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
      description: "Documentation of a user's consent.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a consentArtifacts",
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
        if (g["consentContentScreenshots"] !== undefined) {
          body["consentContentScreenshots"] = g["consentContentScreenshots"];
        }
        if (g["consentContentVersion"] !== undefined) {
          body["consentContentVersion"] = g["consentContentVersion"];
        }
        if (g["guardianSignature"] !== undefined) {
          body["guardianSignature"] = g["guardianSignature"];
        }
        if (g["metadata"] !== undefined) body["metadata"] = g["metadata"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["userId"] !== undefined) body["userId"] = g["userId"];
        if (g["userSignature"] !== undefined) {
          body["userSignature"] = g["userSignature"];
        }
        if (g["witnessSignature"] !== undefined) {
          body["witnessSignature"] = g["witnessSignature"];
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
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a consentArtifacts",
      arguments: z.object({
        identifier: z.string().describe("The name of the consentArtifacts"),
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
    delete: {
      description: "Delete the consentArtifacts",
      arguments: z.object({
        identifier: z.string().describe("The name of the consentArtifacts"),
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
      description: "Sync consentArtifacts state from GCP",
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
      description: "List consentArtifacts resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. Restricts the artifacts returned to those matching a filter. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it\'s just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. The fields available for filtering are: - user_id. For example, `filter=user_id=\\"user123\\"`. - consent_content_version - metadata. For example, `filter=Metadata(\\"testkey\\")=\\"value\\"` or `filter=HasMetadata(\\"testkey\\")`.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Limit on the number of consent artifacts to return in a single response. If not specified, 100 is used. May not be larger than 1000.",
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
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "consentArtifacts",
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
