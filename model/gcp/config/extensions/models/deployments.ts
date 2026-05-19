// Auto-generated extension model for @swamp/gcp/config/deployments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Infrastructure Manager Deployments.
 *
 * A Deployment is a group of resources and configs managed and provisioned by Infra Manager.
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
  return `${parent}/deployments/${shortName}`;
}

const BASE_URL = "https://config.googleapis.com/";

const GET_CONFIG = {
  "id": "config.projects.locations.deployments.get",
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
  "id": "config.projects.locations.deployments.create",
  "path": "v1/{+parent}/deployments",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "deploymentId": {
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
  "id": "config.projects.locations.deployments.patch",
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
  "id": "config.projects.locations.deployments.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "deletePolicy": {
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
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Arbitrary key-value metadata storage e.g. to help client tools identify deployments during automation. See https://google.aip.dev/148#annotations for details on format and size limitations.",
  ).optional(),
  artifactsGcsBucket: z.string().describe(
    "Optional. User-defined location of Cloud Build logs and artifacts in Google Cloud Storage. Format: `gs://{bucket}/{folder}` A default bucket will be bootstrapped if the field is not set or empty. Default bucket format: `gs://--blueprint-config` Constraints: - The bucket needs to be in the same project as the deployment - The path cannot be within the path of `gcs_source` - The field cannot be updated, including changing its presence",
  ).optional(),
  deleteResults: z.object({
    artifacts: z.string().describe(
      "Location of artifacts (e.g. logs) in Google Cloud Storage. Format: `gs://{bucket}/{object}`",
    ).optional(),
    content: z.string().describe(
      "Location of a blueprint copy and other manifests in Google Cloud Storage. Format: `gs://{bucket}/{object}`",
    ).optional(),
    outputs: z.record(
      z.string(),
      z.object({
        sensitive: z.boolean().describe(
          "Identifies whether Terraform has set this output as a potential sensitive value.",
        ).optional(),
        value: z.string().describe("Value of output.").optional(),
      }),
    ).describe("Map of output name to output info.").optional(),
  }).describe("Outputs and artifacts from applying a deployment.").optional(),
  importExistingResources: z.boolean().describe(
    "By default, Infra Manager will return a failure when Terraform encounters a 409 code (resource conflict error) during actuation. If this flag is set to true, Infra Manager will instead attempt to automatically import the resource into the Terraform state (for supported resource types) and continue actuation. Not all resource types are supported, refer to documentation.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined metadata for the deployment.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the deployment. Format: `projects/{project}/locations/{location}/deployments/{deployment}`",
  ).optional(),
  providerConfig: z.object({
    sourceType: z.enum(["PROVIDER_SOURCE_UNSPECIFIED", "SERVICE_MAINTAINED"])
      .describe(
        "Optional. ProviderSource specifies the source type of the provider.",
      ).optional(),
  }).describe("ProviderConfig contains the provider configurations.")
    .optional(),
  quotaValidation: z.enum([
    "QUOTA_VALIDATION_UNSPECIFIED",
    "ENABLED",
    "ENFORCED",
  ]).describe(
    "Optional. Input to control quota checks for resources in terraform configuration files. There are limited resources on which quota validation applies.",
  ).optional(),
  serviceAccount: z.string().describe(
    "Required. User-specified Service Account (SA) credentials to be used when actuating resources. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}`",
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
    "Optional. The user-specified Cloud Build worker pool resource in which the Cloud Build job will execute. Format: `projects/{project}/locations/{location}/workerPools/{workerPoolId}`. If this field is unspecified, the default Cloud Build worker pool will be used.",
  ).optional(),
  deploymentId: z.string().describe("Required. The Deployment ID.").optional(),
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
  createTime: z.string().optional(),
  deleteBuild: z.string().optional(),
  deleteLogs: z.string().optional(),
  deleteResults: z.object({
    artifacts: z.string(),
    content: z.string(),
    outputs: z.record(z.string(), z.unknown()),
  }).optional(),
  errorCode: z.string().optional(),
  errorLogs: z.string().optional(),
  importExistingResources: z.boolean().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  latestRevision: z.string().optional(),
  lockState: z.string().optional(),
  name: z.string(),
  providerConfig: z.object({
    sourceType: z.string(),
  }).optional(),
  quotaValidation: z.string().optional(),
  serviceAccount: z.string().optional(),
  state: z.string().optional(),
  stateDetail: z.string().optional(),
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
  updateTime: z.string().optional(),
  workerPool: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Arbitrary key-value metadata storage e.g. to help client tools identify deployments during automation. See https://google.aip.dev/148#annotations for details on format and size limitations.",
  ).optional(),
  artifactsGcsBucket: z.string().describe(
    "Optional. User-defined location of Cloud Build logs and artifacts in Google Cloud Storage. Format: `gs://{bucket}/{folder}` A default bucket will be bootstrapped if the field is not set or empty. Default bucket format: `gs://--blueprint-config` Constraints: - The bucket needs to be in the same project as the deployment - The path cannot be within the path of `gcs_source` - The field cannot be updated, including changing its presence",
  ).optional(),
  deleteResults: z.object({
    artifacts: z.string().describe(
      "Location of artifacts (e.g. logs) in Google Cloud Storage. Format: `gs://{bucket}/{object}`",
    ).optional(),
    content: z.string().describe(
      "Location of a blueprint copy and other manifests in Google Cloud Storage. Format: `gs://{bucket}/{object}`",
    ).optional(),
    outputs: z.record(
      z.string(),
      z.object({
        sensitive: z.boolean().describe(
          "Identifies whether Terraform has set this output as a potential sensitive value.",
        ).optional(),
        value: z.string().describe("Value of output.").optional(),
      }),
    ).describe("Map of output name to output info.").optional(),
  }).describe("Outputs and artifacts from applying a deployment.").optional(),
  importExistingResources: z.boolean().describe(
    "By default, Infra Manager will return a failure when Terraform encounters a 409 code (resource conflict error) during actuation. If this flag is set to true, Infra Manager will instead attempt to automatically import the resource into the Terraform state (for supported resource types) and continue actuation. Not all resource types are supported, refer to documentation.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. User-defined metadata for the deployment.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Resource name of the deployment. Format: `projects/{project}/locations/{location}/deployments/{deployment}`",
  ).optional(),
  providerConfig: z.object({
    sourceType: z.enum(["PROVIDER_SOURCE_UNSPECIFIED", "SERVICE_MAINTAINED"])
      .describe(
        "Optional. ProviderSource specifies the source type of the provider.",
      ).optional(),
  }).describe("ProviderConfig contains the provider configurations.")
    .optional(),
  quotaValidation: z.enum([
    "QUOTA_VALIDATION_UNSPECIFIED",
    "ENABLED",
    "ENFORCED",
  ]).describe(
    "Optional. Input to control quota checks for resources in terraform configuration files. There are limited resources on which quota validation applies.",
  ).optional(),
  serviceAccount: z.string().describe(
    "Required. User-specified Service Account (SA) credentials to be used when actuating resources. Format: `projects/{projectID}/serviceAccounts/{serviceAccount}`",
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
    "Optional. The user-specified Cloud Build worker pool resource in which the Cloud Build job will execute. Format: `projects/{project}/locations/{location}/workerPools/{workerPoolId}`. If this field is unspecified, the default Cloud Build worker pool will be used.",
  ).optional(),
  deploymentId: z.string().describe("Required. The Deployment ID.").optional(),
  requestId: z.string().describe(
    "Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Infrastructure Manager Deployments. Registered at `@swamp/gcp/config/deployments`. */
export const model = {
  type: "@swamp/gcp/config/deployments",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A Deployment is a group of resources and configs managed and provisioned by I...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a deployments",
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
        if (g["deleteResults"] !== undefined) {
          body["deleteResults"] = g["deleteResults"];
        }
        if (g["importExistingResources"] !== undefined) {
          body["importExistingResources"] = g["importExistingResources"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["providerConfig"] !== undefined) {
          body["providerConfig"] = g["providerConfig"];
        }
        if (g["quotaValidation"] !== undefined) {
          body["quotaValidation"] = g["quotaValidation"];
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
        if (g["deploymentId"] !== undefined) {
          body["deploymentId"] = g["deploymentId"];
        }
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
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Get a deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
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
      description: "Update deployments attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["deleteResults"] !== undefined) {
          body["deleteResults"] = g["deleteResults"];
        }
        if (g["importExistingResources"] !== undefined) {
          body["importExistingResources"] = g["importExistingResources"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["providerConfig"] !== undefined) {
          body["providerConfig"] = g["providerConfig"];
        }
        if (g["quotaValidation"] !== undefined) {
          body["quotaValidation"] = g["quotaValidation"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": ["FAILED"],
            }
            : undefined,
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
      description: "Delete the deployments",
      arguments: z.object({
        identifier: z.string().describe("The name of the deployments"),
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
      description: "Sync deployments state from GCP",
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
    export_lock: {
      description: "export lock",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "config.projects.locations.deployments.exportLock",
            "path": "v1/{+name}:exportLock",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    export_state: {
      description: "export state",
      arguments: z.object({
        draft: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["draft"] !== undefined) body["draft"] = args["draft"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "config.projects.locations.deployments.exportState",
            "path": "v1/{+parent}:exportState",
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
    import_state: {
      description: "import state",
      arguments: z.object({
        lockId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["lockId"] !== undefined) body["lockId"] = args["lockId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "config.projects.locations.deployments.importState",
            "path": "v1/{+parent}:importState",
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
    lock: {
      description: "lock",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "config.projects.locations.deployments.lock",
            "path": "v1/{+name}:lock",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    unlock: {
      description: "unlock",
      arguments: z.object({
        lockId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["lockId"] !== undefined) body["lockId"] = args["lockId"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "config.projects.locations.deployments.unlock",
            "path": "v1/{+name}:unlock",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
