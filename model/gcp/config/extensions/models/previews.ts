// Auto-generated extension model for @swamp/gcp/config/previews
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Infrastructure Manager Previews.
 *
 * A preview represents a set of actions Infra Manager would perform to move the resources towards the desired state as specified in the configuration.
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
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/previews/${shortName}`;
}

const BASE_URL = "https://config.googleapis.com/";

const GET_CONFIG = {
  "id": "config.projects.locations.previews.get",
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
  "id": "config.projects.locations.previews.create",
  "path": "v1/{+parent}/previews",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "previewId": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "config.projects.locations.previews.delete",
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
    "requestId": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "config.projects.locations.previews.list",
  "path": "v1/{+parent}/previews",
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
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Arbitrary key-value metadata storage e.g. to help client tools identify preview during automation. See https://google.aip.dev/148#annotations for details on format and size limitations.",
  ).optional(),
  artifactsGcsBucket: z.string().describe(
    "Optional. User-defined location of Cloud Build logs, artifacts, and in Google Cloud Storage. Format: `gs://{bucket}/{folder}` A default bucket will be bootstrapped if the field is not set or empty Default Bucket Format: `gs://--blueprint-config` Constraints: - The bucket needs to be in the same project as the deployment - The path cannot be within the path of `gcs_source` If omitted and deployment resource ref provided has artifacts_gcs_bucket defined, that artifact bucket is used.",
  ).optional(),
  deployment: z.string().describe(
    "Optional. Optional deployment reference. If specified, the preview will be performed using the provided deployment's current state and use any relevant fields from the deployment unless explicitly specified in the preview create request.",
  ).optional(),
  errorStatus: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for the preview.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the preview. Resource name can be user provided or server generated ID if unspecified. Format: `projects/{project}/locations/{location}/previews/{preview}`",
  ).optional(),
  previewArtifacts: z.object({
    artifacts: z.string().describe(
      "Output only. Location of artifacts in Google Cloud Storage. Format: `gs://{bucket}/{object}`",
    ).optional(),
    content: z.string().describe(
      "Output only. Location of a blueprint copy and other content in Google Cloud Storage. Format: `gs://{bucket}/{object}`",
    ).optional(),
  }).describe("Artifacts created by preview.").optional(),
  previewMode: z.enum(["PREVIEW_MODE_UNSPECIFIED", "DEFAULT", "DELETE"])
    .describe("Optional. Current mode of preview.").optional(),
  providerConfig: z.object({
    sourceType: z.enum(["PROVIDER_SOURCE_UNSPECIFIED", "SERVICE_MAINTAINED"])
      .describe(
        "Optional. ProviderSource specifies the source type of the provider.",
      ).optional(),
  }).describe("ProviderConfig contains the provider configurations.")
    .optional(),
  serviceAccount: z.string().describe(
    "Required. User-specified Service Account (SA) credentials to be used when previewing resources. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}`",
  ).optional(),
  terraformBlueprint: z.object({
    externalValues: z.record(
      z.string(),
      z.object({
        deploymentSource: z.object({
          deployment: z.string().describe(
            "Required. The resource name of the source Deployment to import the output from. Format: projects/{project}/locations/{location}/deployments/{deployment} The source deployment must be in the same project and location.",
          ).optional(),
          outputName: z.string().describe(
            "Required. The name of the output variable in the source deployment's latest successfully applied revision.",
          ).optional(),
        }).describe("Configuration for a value sourced from a Deployment.")
          .optional(),
      }),
    ).describe(
      "Optional. Map of input variable names in this blueprint to configurations for importing values from external sources.",
    ).optional(),
    gcsSource: z.string().describe(
      "URI of an object in Google Cloud Storage. Format: `gs://{bucket}/{object}` URI may also specify an object version for zipped objects. Format: `gs://{bucket}/{object}#{version}`",
    ).optional(),
    gitSource: z.object({
      directory: z.string().describe(
        "Optional. Subdirectory inside the repository. Example: 'staging/my-package'",
      ).optional(),
      ref: z.string().describe("Optional. Git reference (e.g. branch or tag).")
        .optional(),
      repo: z.string().describe(
        "Optional. Repository URL. Example: 'https://github.com/kubernetes/examples.git'",
      ).optional(),
    }).describe("A set of files in a Git repository.").optional(),
    inputValues: z.record(
      z.string(),
      z.object({
        inputValue: z.string().describe("Optional. Input variable value.")
          .optional(),
      }),
    ).describe("Optional. Input variable values for the Terraform blueprint.")
      .optional(),
  }).describe(
    "TerraformBlueprint describes the source of a Terraform root module which describes the resources and configs to be deployed.",
  ).optional(),
  tfVersionConstraint: z.string().describe(
    'Optional. The user-specified Terraform version constraint. Example: "=1.3.10".',
  ).optional(),
  workerPool: z.string().describe(
    "Optional. The user-specified Worker Pool resource in which the Cloud Build job will execute. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} If this field is unspecified, the default Cloud Build worker pool will be used. If omitted and deployment resource ref provided has worker_pool defined, that worker pool is used.",
  ).optional(),
  previewId: z.string().describe("Optional. The preview ID.").optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  artifactsGcsBucket: z.string().optional(),
  build: z.string().optional(),
  createTime: z.string().optional(),
  deployment: z.string().optional(),
  errorCode: z.string().optional(),
  errorLogs: z.string().optional(),
  errorStatus: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  logs: z.string().optional(),
  name: z.string(),
  previewArtifacts: z.object({
    artifacts: z.string(),
    content: z.string(),
  }).optional(),
  previewMode: z.string().optional(),
  providerConfig: z.object({
    sourceType: z.string(),
  }).optional(),
  serviceAccount: z.string().optional(),
  state: z.string().optional(),
  terraformBlueprint: z.object({
    externalValues: z.record(z.string(), z.unknown()),
    gcsSource: z.string(),
    gitSource: z.object({
      directory: z.string(),
      ref: z.string(),
      repo: z.string(),
    }),
    inputValues: z.record(z.string(), z.unknown()),
  }).optional(),
  tfErrors: z.array(z.object({
    error: z.object({
      code: z.number(),
      details: z.array(z.record(z.string(), z.unknown())),
      message: z.string(),
    }),
    errorDescription: z.string(),
    httpResponseCode: z.number(),
    resourceAddress: z.string(),
  })).optional(),
  tfVersion: z.string().optional(),
  tfVersionConstraint: z.string().optional(),
  workerPool: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Arbitrary key-value metadata storage e.g. to help client tools identify preview during automation. See https://google.aip.dev/148#annotations for details on format and size limitations.",
  ).optional(),
  artifactsGcsBucket: z.string().describe(
    "Optional. User-defined location of Cloud Build logs, artifacts, and in Google Cloud Storage. Format: `gs://{bucket}/{folder}` A default bucket will be bootstrapped if the field is not set or empty Default Bucket Format: `gs://--blueprint-config` Constraints: - The bucket needs to be in the same project as the deployment - The path cannot be within the path of `gcs_source` If omitted and deployment resource ref provided has artifacts_gcs_bucket defined, that artifact bucket is used.",
  ).optional(),
  deployment: z.string().describe(
    "Optional. Optional deployment reference. If specified, the preview will be performed using the provided deployment's current state and use any relevant fields from the deployment unless explicitly specified in the preview create request.",
  ).optional(),
  errorStatus: z.object({
    code: z.number().int().describe(
      "The status code, which should be an enum value of google.rpc.Code.",
    ).optional(),
    details: z.array(z.record(z.string(), z.string())).describe(
      "A list of messages that carry the error details. There is a common set of message types for APIs to use.",
    ).optional(),
    message: z.string().describe(
      "A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client.",
    ).optional(),
  }).describe(
    "The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by [gRPC](https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the [API Design Guide](https://cloud.google.com/apis/design/errors).",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined labels for the preview.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the preview. Resource name can be user provided or server generated ID if unspecified. Format: `projects/{project}/locations/{location}/previews/{preview}`",
  ).optional(),
  previewArtifacts: z.object({
    artifacts: z.string().describe(
      "Output only. Location of artifacts in Google Cloud Storage. Format: `gs://{bucket}/{object}`",
    ).optional(),
    content: z.string().describe(
      "Output only. Location of a blueprint copy and other content in Google Cloud Storage. Format: `gs://{bucket}/{object}`",
    ).optional(),
  }).describe("Artifacts created by preview.").optional(),
  previewMode: z.enum(["PREVIEW_MODE_UNSPECIFIED", "DEFAULT", "DELETE"])
    .describe("Optional. Current mode of preview.").optional(),
  providerConfig: z.object({
    sourceType: z.enum(["PROVIDER_SOURCE_UNSPECIFIED", "SERVICE_MAINTAINED"])
      .describe(
        "Optional. ProviderSource specifies the source type of the provider.",
      ).optional(),
  }).describe("ProviderConfig contains the provider configurations.")
    .optional(),
  serviceAccount: z.string().describe(
    "Required. User-specified Service Account (SA) credentials to be used when previewing resources. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}`",
  ).optional(),
  terraformBlueprint: z.object({
    externalValues: z.record(
      z.string(),
      z.object({
        deploymentSource: z.object({
          deployment: z.string().describe(
            "Required. The resource name of the source Deployment to import the output from. Format: projects/{project}/locations/{location}/deployments/{deployment} The source deployment must be in the same project and location.",
          ).optional(),
          outputName: z.string().describe(
            "Required. The name of the output variable in the source deployment's latest successfully applied revision.",
          ).optional(),
        }).describe("Configuration for a value sourced from a Deployment.")
          .optional(),
      }),
    ).describe(
      "Optional. Map of input variable names in this blueprint to configurations for importing values from external sources.",
    ).optional(),
    gcsSource: z.string().describe(
      "URI of an object in Google Cloud Storage. Format: `gs://{bucket}/{object}` URI may also specify an object version for zipped objects. Format: `gs://{bucket}/{object}#{version}`",
    ).optional(),
    gitSource: z.object({
      directory: z.string().describe(
        "Optional. Subdirectory inside the repository. Example: 'staging/my-package'",
      ).optional(),
      ref: z.string().describe("Optional. Git reference (e.g. branch or tag).")
        .optional(),
      repo: z.string().describe(
        "Optional. Repository URL. Example: 'https://github.com/kubernetes/examples.git'",
      ).optional(),
    }).describe("A set of files in a Git repository.").optional(),
    inputValues: z.record(
      z.string(),
      z.object({
        inputValue: z.string().describe("Optional. Input variable value.")
          .optional(),
      }),
    ).describe("Optional. Input variable values for the Terraform blueprint.")
      .optional(),
  }).describe(
    "TerraformBlueprint describes the source of a Terraform root module which describes the resources and configs to be deployed.",
  ).optional(),
  tfVersionConstraint: z.string().describe(
    'Optional. The user-specified Terraform version constraint. Example: "=1.3.10".',
  ).optional(),
  workerPool: z.string().describe(
    "Optional. The user-specified Worker Pool resource in which the Cloud Build job will execute. Format projects/{project}/locations/{location}/workerPools/{workerPoolId} If this field is unspecified, the default Cloud Build worker pool will be used. If omitted and deployment resource ref provided has worker_pool defined, that worker pool is used.",
  ).optional(),
  previewId: z.string().describe("Optional. The preview ID.").optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Infrastructure Manager Previews. Registered at `@swamp/gcp/config/previews`. */
export const model = {
  type: "@swamp/gcp/config/previews",
  version: "2026.05.24.1",
  upgrades: [
    {
      toVersion: "2026.03.31.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A preview represents a set of actions Infra Manager would perform to move the...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a previews",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["artifactsGcsBucket"] !== undefined) {
          body["artifactsGcsBucket"] = g["artifactsGcsBucket"];
        }
        if (g["deployment"] !== undefined) body["deployment"] = g["deployment"];
        if (g["errorStatus"] !== undefined) {
          body["errorStatus"] = g["errorStatus"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["previewArtifacts"] !== undefined) {
          body["previewArtifacts"] = g["previewArtifacts"];
        }
        if (g["previewMode"] !== undefined) {
          body["previewMode"] = g["previewMode"];
        }
        if (g["providerConfig"] !== undefined) {
          body["providerConfig"] = g["providerConfig"];
        }
        if (g["serviceAccount"] !== undefined) {
          body["serviceAccount"] = g["serviceAccount"];
        }
        if (g["terraformBlueprint"] !== undefined) {
          body["terraformBlueprint"] = g["terraformBlueprint"];
        }
        if (g["tfVersionConstraint"] !== undefined) {
          body["tfVersionConstraint"] = g["tfVersionConstraint"];
        }
        if (g["workerPool"] !== undefined) body["workerPool"] = g["workerPool"];
        if (g["previewId"] !== undefined) body["previewId"] = g["previewId"];
        if (g["requestId"] !== undefined) body["requestId"] = g["requestId"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["SUCCEEDED"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Get a previews",
      arguments: z.object({
        identifier: z.string().describe("The name of the previews"),
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
    delete: {
      description: "Delete the previews",
      arguments: z.object({
        identifier: z.string().describe("The name of the previews"),
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
      description: "Sync previews state from GCP",
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
    export: {
      description: "export",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id": "config.projects.locations.previews.export",
            "path": "v1/{+parent}:export",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
