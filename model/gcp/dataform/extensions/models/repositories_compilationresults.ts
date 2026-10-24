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

// Auto-generated extension model for @swamp/gcp/dataform/repositories-compilationresults
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Dataform Repositories.CompilationResults.
 *
 * Represents the result of compiling a Dataform project.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/compilationResults/${shortName}`;
}

const BASE_URL = "https://dataform.googleapis.com/";

const GET_CONFIG = {
  "id": "dataform.projects.locations.repositories.compilationResults.get",
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
  "id": "dataform.projects.locations.repositories.compilationResults.create",
  "path": "v1/{+parent}/compilationResults",
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

const LIST_CONFIG = {
  "id": "dataform.projects.locations.repositories.compilationResults.list",
  "path": "v1/{+parent}/compilationResults",
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
  codeCompilationConfig: z.object({
    assertionSchema: z.string().describe(
      "Optional. The default schema (BigQuery dataset ID) for assertions.",
    ).optional(),
    builtinAssertionNamePrefix: z.string().describe(
      "Optional. The prefix to prepend to built-in assertion names.",
    ).optional(),
    databaseSuffix: z.string().describe(
      "Optional. The suffix that should be appended to all database (Google Cloud project ID) names.",
    ).optional(),
    defaultDatabase: z.string().describe(
      "Optional. The default database (Google Cloud project ID).",
    ).optional(),
    defaultLocation: z.string().describe(
      'Optional. The default BigQuery location to use. Defaults to "US". See the BigQuery docs for a full list of locations: https://cloud.google.com/bigquery/docs/locations.',
    ).optional(),
    defaultNotebookRuntimeOptions: z.object({
      aiPlatformNotebookRuntimeTemplate: z.string().describe(
        "Optional. The resource name of the [Colab runtime template] (https://cloud.google.com/colab/docs/runtimes), from which a runtime is created for notebook executions. If not specified, a runtime is created with Colab's default specifications.",
      ).optional(),
      gcsOutputBucket: z.string().describe(
        "Optional. The Google Cloud Storage location to upload the result to. Format: `gs://bucket-name`.",
      ).optional(),
      gcsRepositorySnapshotDestination: z.object({
        repositorySnapshotUri: z.string().describe(
          "Optional. The Google Cloud Storage destination to upload the repository snapshot to. Format: `gs://bucket-name/path/`.",
        ).optional(),
      }).describe(
        "Optional. The Google Cloud Storage destination to upload the snapshot to. For empty URI it defaults to the provided gcs_output_bucket. Format: `gs://bucket-name/path/`.",
      ).optional(),
    }).describe("Optional. The default notebook runtime options.").optional(),
    defaultSchema: z.string().describe(
      "Optional. The default schema (BigQuery dataset ID).",
    ).optional(),
    pipelineConfig: z.object({
      path: z.string().describe(
        "Required. The relative path within the Git repository where the pipeline is defined. For example, for a Dataform pipeline, it is a path to the folder where `workflow_settings.yaml` or `dataform.json` is located.",
      ).optional(),
      pipelineType: z.enum([
        "PIPELINE_TYPE_UNSPECIFIED",
        "DATAFORM",
        "SQL",
        "NOTEBOOK",
      ]).describe("Required. The type of the pipeline.").optional(),
    }).describe(
      "Optional. The pipeline options which defines the pipeline type and path within the Git repository.",
    ).optional(),
    schemaSuffix: z.string().describe(
      "Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names.",
    ).optional(),
    tablePrefix: z.string().describe(
      "Optional. The prefix that should be prepended to all table names.",
    ).optional(),
    vars: z.record(z.string(), z.string()).describe(
      "Optional. User-defined variables that are made available to project code during compilation.",
    ).optional(),
  }).describe(
    "Immutable. If set, fields of `code_compilation_config` override the default compilation settings that are specified in dataform.json.",
  ).optional(),
  gitCommitish: z.string().describe(
    "Immutable. Git commit/tag/branch name at which the repository should be compiled. Must exist in the remote repository. Examples: - a commit SHA: `12ade345` - a tag: `tag1` - a branch name: `branch1`",
  ).optional(),
  releaseConfig: z.string().describe(
    "Immutable. The name of the release config to compile. Must be in the format `projects/*/locations/*/repositories/*/releaseConfigs/*`.",
  ).optional(),
  workspace: z.string().describe(
    "Immutable. The name of the workspace to compile. Must be in the format `projects/*/locations/*/repositories/*/workspaces/*`.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  codeCompilationConfig: z.object({
    assertionSchema: z.string(),
    builtinAssertionNamePrefix: z.string(),
    databaseSuffix: z.string(),
    defaultDatabase: z.string(),
    defaultLocation: z.string(),
    defaultNotebookRuntimeOptions: z.object({
      aiPlatformNotebookRuntimeTemplate: z.string(),
      gcsOutputBucket: z.string(),
      gcsRepositorySnapshotDestination: z.object({
        repositorySnapshotUri: z.string(),
      }),
    }),
    defaultSchema: z.string(),
    pipelineConfig: z.object({
      path: z.string(),
      pipelineType: z.string(),
    }),
    schemaSuffix: z.string(),
    tablePrefix: z.string(),
    vars: z.record(z.string(), z.unknown()),
  }).optional(),
  compilationErrors: z.array(z.object({
    actionTarget: z.object({
      database: z.string(),
      name: z.string(),
      schema: z.string(),
    }),
    message: z.string(),
    path: z.string(),
    stack: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  dataEncryptionState: z.object({
    kmsKeyVersionName: z.string(),
  }).optional(),
  dataformCoreVersion: z.string().optional(),
  gcsRepositorySnapshotMetadata: z.object({
    crc32cChecksum: z.string(),
    generation: z.string(),
    repositorySnapshotUri: z.string(),
  }).optional(),
  gitCommitish: z.string().optional(),
  internalMetadata: z.string().optional(),
  name: z.string(),
  privateResourceMetadata: z.object({
    userScoped: z.boolean(),
  }).optional(),
  releaseConfig: z.string().optional(),
  resolvedGitCommitSha: z.string().optional(),
  workspace: z.string().optional(),
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
  codeCompilationConfig: z.object({
    assertionSchema: z.string().describe(
      "Optional. The default schema (BigQuery dataset ID) for assertions.",
    ).optional(),
    builtinAssertionNamePrefix: z.string().describe(
      "Optional. The prefix to prepend to built-in assertion names.",
    ).optional(),
    databaseSuffix: z.string().describe(
      "Optional. The suffix that should be appended to all database (Google Cloud project ID) names.",
    ).optional(),
    defaultDatabase: z.string().describe(
      "Optional. The default database (Google Cloud project ID).",
    ).optional(),
    defaultLocation: z.string().describe(
      'Optional. The default BigQuery location to use. Defaults to "US". See the BigQuery docs for a full list of locations: https://cloud.google.com/bigquery/docs/locations.',
    ).optional(),
    defaultNotebookRuntimeOptions: z.object({
      aiPlatformNotebookRuntimeTemplate: z.string().describe(
        "Optional. The resource name of the [Colab runtime template] (https://cloud.google.com/colab/docs/runtimes), from which a runtime is created for notebook executions. If not specified, a runtime is created with Colab's default specifications.",
      ).optional(),
      gcsOutputBucket: z.string().describe(
        "Optional. The Google Cloud Storage location to upload the result to. Format: `gs://bucket-name`.",
      ).optional(),
      gcsRepositorySnapshotDestination: z.object({
        repositorySnapshotUri: z.string().describe(
          "Optional. The Google Cloud Storage destination to upload the repository snapshot to. Format: `gs://bucket-name/path/`.",
        ).optional(),
      }).describe(
        "Optional. The Google Cloud Storage destination to upload the snapshot to. For empty URI it defaults to the provided gcs_output_bucket. Format: `gs://bucket-name/path/`.",
      ).optional(),
    }).describe("Optional. The default notebook runtime options.").optional(),
    defaultSchema: z.string().describe(
      "Optional. The default schema (BigQuery dataset ID).",
    ).optional(),
    pipelineConfig: z.object({
      path: z.string().describe(
        "Required. The relative path within the Git repository where the pipeline is defined. For example, for a Dataform pipeline, it is a path to the folder where `workflow_settings.yaml` or `dataform.json` is located.",
      ).optional(),
      pipelineType: z.enum([
        "PIPELINE_TYPE_UNSPECIFIED",
        "DATAFORM",
        "SQL",
        "NOTEBOOK",
      ]).describe("Required. The type of the pipeline.").optional(),
    }).describe(
      "Optional. The pipeline options which defines the pipeline type and path within the Git repository.",
    ).optional(),
    schemaSuffix: z.string().describe(
      "Optional. The suffix that should be appended to all schema (BigQuery dataset ID) names.",
    ).optional(),
    tablePrefix: z.string().describe(
      "Optional. The prefix that should be prepended to all table names.",
    ).optional(),
    vars: z.record(z.string(), z.string()).describe(
      "Optional. User-defined variables that are made available to project code during compilation.",
    ).optional(),
  }).describe(
    "Immutable. If set, fields of `code_compilation_config` override the default compilation settings that are specified in dataform.json.",
  ).optional(),
  gitCommitish: z.string().describe(
    "Immutable. Git commit/tag/branch name at which the repository should be compiled. Must exist in the remote repository. Examples: - a commit SHA: `12ade345` - a tag: `tag1` - a branch name: `branch1`",
  ).optional(),
  releaseConfig: z.string().describe(
    "Immutable. The name of the release config to compile. Must be in the format `projects/*/locations/*/repositories/*/releaseConfigs/*`.",
  ).optional(),
  workspace: z.string().describe(
    "Immutable. The name of the workspace to compile. Must be in the format `projects/*/locations/*/repositories/*/workspaces/*`.",
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

/** Swamp extension model for Google Cloud Dataform Repositories.CompilationResults. Registered at `@swamp/gcp/dataform/repositories-compilationresults`. */
export const model = {
  type: "@swamp/gcp/dataform/repositories-compilationresults",
  version: "2026.10.24.1",
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
      toVersion: "2026.05.26.1",
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
      toVersion: "2026.06.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.26.1",
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
      description: "Removed: dataEncryptionState, privateResourceMetadata",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          dataEncryptionState: _dataEncryptionState,
          privateResourceMetadata: _privateResourceMetadata,
          ...rest
        } = old;
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
      toVersion: "2026.09.07.1",
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
    {
      toVersion: "2026.10.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Represents the result of compiling a Dataform project.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a compilationResults",
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
        if (g["codeCompilationConfig"] !== undefined) {
          body["codeCompilationConfig"] = g["codeCompilationConfig"];
        }
        if (g["gitCommitish"] !== undefined) {
          body["gitCommitish"] = g["gitCommitish"];
        }
        if (g["releaseConfig"] !== undefined) {
          body["releaseConfig"] = g["releaseConfig"];
        }
        if (g["workspace"] !== undefined) body["workspace"] = g["workspace"];
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
          undefined,
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
      description: "Get a compilationResults",
      arguments: z.object({
        identifier: z.string().describe("The name of the compilationResults"),
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
    sync: {
      description: "Sync compilationResults state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific compilationResults by name (e.g. one discovered by list)",
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
      description: "List compilationResults resources",
      arguments: z.object({
        filter: z.string().describe("Optional. Filter for the returned list.")
          .optional(),
        orderBy: z.string().describe(
          "Optional. This field only supports ordering by `name` and `create_time`. If unspecified, the server will choose the ordering. If specified, the default order is ascending for the `name` field.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. Maximum number of compilation results to return. The server may return fewer items than requested. If unspecified, the server will pick an appropriate default.",
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
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "compilationResults",
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
    query: {
      description: "query",
      arguments: z.object({
        filter: z.any().optional(),
        pageSize: z.any().optional(),
        pageToken: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["pageToken"] !== undefined) {
          params["pageToken"] = String(args["pageToken"]);
        }
        const result = await createResource(
          baseUrl,
          {
            "id":
              "dataform.projects.locations.repositories.compilationResults.query",
            "path": "v1/{+name}:query",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": {
              "filter": { "location": "query" },
              "name": { "location": "path", "required": true },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
            },
          },
          params,
          undefined,
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
