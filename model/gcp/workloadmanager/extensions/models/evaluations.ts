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

// Auto-generated extension model for @swamp/gcp/workloadmanager/evaluations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Workload Manager Evaluations.
 *
 * Represents a Workload Manager Evaluation configuration. An Evaluation defines a set of rules to be validated against a scope of Cloud resources.
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
  return `${parent}/evaluations/${shortName}`;
}

const BASE_URL = "https://workloadmanager.googleapis.com/";

const GET_CONFIG = {
  "id": "workloadmanager.projects.locations.evaluations.get",
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
  "id": "workloadmanager.projects.locations.evaluations.create",
  "path": "v1/{+parent}/evaluations",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "evaluationId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "workloadmanager.projects.locations.evaluations.patch",
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
    "requestId": {
      "location": "query",
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "workloadmanager.projects.locations.evaluations.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
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
  },
} as const;

const LIST_CONFIG = {
  "id": "workloadmanager.projects.locations.evaluations.list",
  "path": "v1/{+parent}/evaluations",
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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  bigQueryDestination: z.object({
    createNewResultsTable: z.boolean().describe(
      "Optional. Determines if a new results table will be created when an Execution is created.",
    ).optional(),
    destinationDataset: z.string().describe(
      "Optional. Destination dataset to save evaluation results.",
    ).optional(),
  }).describe(
    "Optional. The BigQuery destination for detailed evaluation results. If this field is specified, the results of each evaluation execution are exported to BigQuery.",
  ).optional(),
  customRulesBucket: z.string().describe(
    "The Cloud Storage bucket name for custom rules.",
  ).optional(),
  description: z.string().describe("Description of the Evaluation.").optional(),
  evaluationType: z.enum([
    "EVALUATION_TYPE_UNSPECIFIED",
    "SAP",
    "SQL_SERVER",
    "OTHER",
  ]).describe("Evaluation type.").optional(),
  kmsKey: z.string().describe(
    "Optional. Immutable. Customer-managed encryption key name, in the format projects/*/locations/*/keyRings/*/cryptoKeys/*. The key will be used for CMEK encryption of the evaluation resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    "Name of resource that has the form `projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}`.",
  ).optional(),
  resourceFilter: z.object({
    gceInstanceFilter: z.object({
      serviceAccounts: z.array(z.string()).describe(
        "If non-empty, only Compute Engine instances associated with at least one of the provided service accounts will be included in the evaluation.",
      ).optional(),
    }).describe("Filter compute engine resources.").optional(),
    inclusionLabels: z.record(z.string(), z.string()).describe(
      'Labels to filter resources by. Each key-value pair in the map must exist on the resource for it to be included (e.g. VM instance labels). For example, specifying `{ "env": "prod", "database": "nosql" }` will only include resources that have labels `env=prod` and `database=nosql`.',
    ).optional(),
    resourceIdPatterns: z.array(z.string()).describe(
      'The pattern to filter resources by their id For example, a pattern of ".*prod-cluster.*" will match all resources that contain "prod-cluster" in their ID.',
    ).optional(),
    scopes: z.array(z.string()).describe(
      "The scopes of evaluation resource. Format: * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`",
    ).optional(),
  }).describe(
    "Resource filter for an evaluation defining the scope of resources to be evaluated.",
  ).optional(),
  ruleNames: z.array(z.string()).describe(
    "The names of the rules used for this evaluation.",
  ).optional(),
  schedule: z.string().describe(
    "Crontab format schedule for scheduled evaluation, currently only supports the following fixed schedules: * `0 */1 * * *` # Hourly * `0 */6 * * *` # Every 6 hours * `0 */12 * * *` # Every 12 hours * `0 0 */1 * *` # Daily * `0 0 */7 * *` # Weekly * `0 0 */14 * *` # Every 14 days * `0 0 1 */1 *` # Monthly",
  ).optional(),
  evaluationId: z.string().describe("Required. Id of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  bigQueryDestination: z.object({
    createNewResultsTable: z.boolean(),
    destinationDataset: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  customRulesBucket: z.string().optional(),
  description: z.string().optional(),
  evaluationType: z.string().optional(),
  kmsKey: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  resourceFilter: z.object({
    gceInstanceFilter: z.object({
      serviceAccounts: z.array(z.string()),
    }),
    inclusionLabels: z.record(z.string(), z.unknown()),
    resourceIdPatterns: z.array(z.string()),
    scopes: z.array(z.string()),
  }).optional(),
  resourceStatus: z.object({
    state: z.string(),
  }).optional(),
  ruleNames: z.array(z.string()).optional(),
  schedule: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  bigQueryDestination: z.object({
    createNewResultsTable: z.boolean().describe(
      "Optional. Determines if a new results table will be created when an Execution is created.",
    ).optional(),
    destinationDataset: z.string().describe(
      "Optional. Destination dataset to save evaluation results.",
    ).optional(),
  }).describe(
    "Optional. The BigQuery destination for detailed evaluation results. If this field is specified, the results of each evaluation execution are exported to BigQuery.",
  ).optional(),
  customRulesBucket: z.string().describe(
    "The Cloud Storage bucket name for custom rules.",
  ).optional(),
  description: z.string().describe("Description of the Evaluation.").optional(),
  evaluationType: z.enum([
    "EVALUATION_TYPE_UNSPECIFIED",
    "SAP",
    "SQL_SERVER",
    "OTHER",
  ]).describe("Evaluation type.").optional(),
  kmsKey: z.string().describe(
    "Optional. Immutable. Customer-managed encryption key name, in the format projects/*/locations/*/keyRings/*/cryptoKeys/*. The key will be used for CMEK encryption of the evaluation resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Labels as key value pairs.",
  ).optional(),
  name: z.string().describe(
    "Name of resource that has the form `projects/{project_id}/locations/{location_id}/evaluations/{evaluation_id}`.",
  ).optional(),
  resourceFilter: z.object({
    gceInstanceFilter: z.object({
      serviceAccounts: z.array(z.string()).describe(
        "If non-empty, only Compute Engine instances associated with at least one of the provided service accounts will be included in the evaluation.",
      ).optional(),
    }).describe("Filter compute engine resources.").optional(),
    inclusionLabels: z.record(z.string(), z.string()).describe(
      'Labels to filter resources by. Each key-value pair in the map must exist on the resource for it to be included (e.g. VM instance labels). For example, specifying `{ "env": "prod", "database": "nosql" }` will only include resources that have labels `env=prod` and `database=nosql`.',
    ).optional(),
    resourceIdPatterns: z.array(z.string()).describe(
      'The pattern to filter resources by their id For example, a pattern of ".*prod-cluster.*" will match all resources that contain "prod-cluster" in their ID.',
    ).optional(),
    scopes: z.array(z.string()).describe(
      "The scopes of evaluation resource. Format: * `projects/{project_id}` * `folders/{folder_id}` * `organizations/{organization_id}`",
    ).optional(),
  }).describe(
    "Resource filter for an evaluation defining the scope of resources to be evaluated.",
  ).optional(),
  ruleNames: z.array(z.string()).describe(
    "The names of the rules used for this evaluation.",
  ).optional(),
  schedule: z.string().describe(
    "Crontab format schedule for scheduled evaluation, currently only supports the following fixed schedules: * `0 */1 * * *` # Hourly * `0 */6 * * *` # Every 6 hours * `0 */12 * * *` # Every 12 hours * `0 0 */1 * *` # Daily * `0 0 */7 * *` # Weekly * `0 0 */14 * *` # Every 14 days * `0 0 1 */1 *` # Monthly",
  ).optional(),
  evaluationId: z.string().describe("Required. Id of the requesting object.")
    .optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
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

/** Swamp extension model for Google Cloud Workload Manager Evaluations. Registered at `@swamp/gcp/workloadmanager/evaluations`. */
export const model = {
  type: "@swamp/gcp/workloadmanager/evaluations",
  version: "2026.10.13.1",
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
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
      description: "No schema changes",
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
      description: "Removed: resourceStatus",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const { resourceStatus: _resourceStatus, ...rest } = old;
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Represents a Workload Manager Evaluation configuration. An Evaluation defines...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a evaluations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["bigQueryDestination"] !== undefined) {
          body["bigQueryDestination"] = g["bigQueryDestination"];
        }
        if (g["customRulesBucket"] !== undefined) {
          body["customRulesBucket"] = g["customRulesBucket"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["evaluationType"] !== undefined) {
          body["evaluationType"] = g["evaluationType"];
        }
        if (g["kmsKey"] !== undefined) body["kmsKey"] = g["kmsKey"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["resourceFilter"] !== undefined) {
          body["resourceFilter"] = g["resourceFilter"];
        }
        if (g["ruleNames"] !== undefined) body["ruleNames"] = g["ruleNames"];
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        if (g["evaluationId"] !== undefined) {
          params["evaluationId"] = String(g["evaluationId"]);
        }
        if (g["requestId"] !== undefined) {
          params["requestId"] = String(g["requestId"]);
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
              "parent": `projects/${projectId}/locations/${
                String(g["location"] ?? "")
              }`,
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a evaluations",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update evaluations attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific evaluations by name (e.g. one discovered by list)",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["bigQueryDestination"] !== undefined) {
          body["bigQueryDestination"] = g["bigQueryDestination"];
        }
        if (g["customRulesBucket"] !== undefined) {
          body["customRulesBucket"] = g["customRulesBucket"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["evaluationType"] !== undefined) {
          body["evaluationType"] = g["evaluationType"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["resourceFilter"] !== undefined) {
          body["resourceFilter"] = g["resourceFilter"];
        }
        if (g["ruleNames"] !== undefined) body["ruleNames"] = g["ruleNames"];
        if (g["schedule"] !== undefined) body["schedule"] = g["schedule"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
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
          baseUrl,
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
      description: "Delete the evaluations",
      arguments: z.object({
        identifier: z.string().describe("The name of the evaluations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync evaluations state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific evaluations by name (e.g. one discovered by list)",
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
              `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "List evaluations resources",
      arguments: z.object({
        filter: z.string().describe(
          "Filter to be applied when listing the evaluation results.",
        ).optional(),
        orderBy: z.string().describe("Hint for how to order the results.")
          .optional(),
        pageSize: z.number().describe(
          "Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default.",
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
          baseUrl,
          LIST_CONFIG,
          params,
          "evaluations",
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
