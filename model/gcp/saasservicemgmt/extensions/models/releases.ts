// Auto-generated extension model for @swamp/gcp/saasservicemgmt/releases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud App Lifecycle Manager Releases.
 *
 * A new version to be propagated and deployed to units. This includes pointers to packaged blueprints for actuation (e.g Helm or Terraform configuration packages) via artifact registry.
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
  return `${parent}/releases/${shortName}`;
}

const BASE_URL = "https://saasservicemgmt.googleapis.com/";

const GET_CONFIG = {
  "id": "saasservicemgmt.projects.locations.releases.get",
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
  "id": "saasservicemgmt.projects.locations.releases.create",
  "path": "v1/{+parent}/releases",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
    "releaseId": {
      "location": "query",
    },
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "saasservicemgmt.projects.locations.releases.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "saasservicemgmt.projects.locations.releases.delete",
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
    "requestId": {
      "location": "query",
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations",
  ).optional(),
  blueprint: z.object({
    engine: z.string().describe(
      "Output only. Type of the engine used to actuate the blueprint. e.g. terraform, helm etc.",
    ).optional(),
    package: z.string().describe(
      "Optional. Immutable. URI to a blueprint used by the Unit (required unless unitKind or release is set).",
    ).optional(),
    version: z.string().describe(
      "Output only. Version metadata if present on the blueprint.",
    ).optional(),
  }).describe(
    "Blueprints are OCI Images that contain all of the artifacts needed to provision a unit. Metadata such as, type of the engine used to actuate the blueprint (e.g. terraform, helm etc) and version will come from the image manifest. If the hostname is omitted, it will be assumed to be the regional path to Artifact Registry (eg. us-east1-docker.pkg.dev).",
  ).optional(),
  inputVariableDefaults: z.array(z.object({
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "STRING",
      "INT",
      "BOOL",
      "STRUCT",
      "LIST",
    ]).describe(
      "Optional. Immutable. Name of a supported variable type. Supported types are string, int, bool.",
    ).optional(),
    value: z.string().describe(
      "Optional. String encoded value for the variable.",
    ).optional(),
    variable: z.string().describe(
      "Required. Immutable. Name of the variable from actuation configs.",
    ).optional(),
  })).describe(
    "Optional. Mapping of input variables to default values. Maximum 100",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/releases/{release}"',
  ).optional(),
  releaseRequirements: z.object({
    upgradeableFromReleases: z.array(z.string()).describe(
      "Optional. A list of releases from which a unit can be upgraded to this one (optional). If left empty no constraints will be applied. When provided, unit upgrade requests to this release will check and enforce this constraint.",
    ).optional(),
  }).describe(
    "Set of requirements to be fulfilled on the Unit when using this Release.",
  ).optional(),
  unitKind: z.string().describe(
    "Required. Immutable. Reference to the UnitKind this Release corresponds to (required and immutable once created).",
  ).optional(),
  releaseId: z.string().describe("Required. The ID value for the new release.")
    .optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  blueprint: z.object({
    engine: z.string(),
    package: z.string(),
    version: z.string(),
  }).optional(),
  createTime: z.string().optional(),
  etag: z.string().optional(),
  inputVariableDefaults: z.array(z.object({
    type: z.string(),
    value: z.string(),
    variable: z.string(),
  })).optional(),
  inputVariables: z.array(z.object({
    type: z.string(),
    value: z.string(),
    variable: z.string(),
  })).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  outputVariables: z.array(z.object({
    type: z.string(),
    value: z.string(),
    variable: z.string(),
  })).optional(),
  releaseRequirements: z.object({
    upgradeableFromReleases: z.array(z.string()),
  }).optional(),
  uid: z.string().optional(),
  unitKind: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/user-guide/annotations",
  ).optional(),
  blueprint: z.object({
    engine: z.string().describe(
      "Output only. Type of the engine used to actuate the blueprint. e.g. terraform, helm etc.",
    ).optional(),
    package: z.string().describe(
      "Optional. Immutable. URI to a blueprint used by the Unit (required unless unitKind or release is set).",
    ).optional(),
    version: z.string().describe(
      "Output only. Version metadata if present on the blueprint.",
    ).optional(),
  }).describe(
    "Blueprints are OCI Images that contain all of the artifacts needed to provision a unit. Metadata such as, type of the engine used to actuate the blueprint (e.g. terraform, helm etc) and version will come from the image manifest. If the hostname is omitted, it will be assumed to be the regional path to Artifact Registry (eg. us-east1-docker.pkg.dev).",
  ).optional(),
  inputVariableDefaults: z.array(z.object({
    type: z.enum([
      "TYPE_UNSPECIFIED",
      "STRING",
      "INT",
      "BOOL",
      "STRUCT",
      "LIST",
    ]).describe(
      "Optional. Immutable. Name of a supported variable type. Supported types are string, int, bool.",
    ).optional(),
    value: z.string().describe(
      "Optional. String encoded value for the variable.",
    ).optional(),
    variable: z.string().describe(
      "Required. Immutable. Name of the variable from actuation configs.",
    ).optional(),
  })).describe(
    "Optional. Mapping of input variables to default values. Maximum 100",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. The labels on the resource, which can be used for categorization. similar to Kubernetes resource labels.",
  ).optional(),
  name: z.string().describe(
    'Identifier. The resource name (full URI of the resource) following the standard naming scheme: "projects/{project}/locations/{location}/releases/{release}"',
  ).optional(),
  releaseRequirements: z.object({
    upgradeableFromReleases: z.array(z.string()).describe(
      "Optional. A list of releases from which a unit can be upgraded to this one (optional). If left empty no constraints will be applied. When provided, unit upgrade requests to this release will check and enforce this constraint.",
    ).optional(),
  }).describe(
    "Set of requirements to be fulfilled on the Unit when using this Release.",
  ).optional(),
  unitKind: z.string().describe(
    "Required. Immutable. Reference to the UnitKind this Release corresponds to (required and immutable once created).",
  ).optional(),
  releaseId: z.string().describe("Required. The ID value for the new release.")
    .optional(),
  requestId: z.string().describe(
    "An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud App Lifecycle Manager Releases. Registered at `@swamp/gcp/saasservicemgmt/releases`. */
export const model = {
  type: "@swamp/gcp/saasservicemgmt/releases",
  version: "2026.05.18.2",
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
      toVersion: "2026.04.11.1",
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
      toVersion: "2026.05.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A new version to be propagated and deployed to units. This includes pointers ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a releases",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
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
        if (g["blueprint"] !== undefined) body["blueprint"] = g["blueprint"];
        if (g["inputVariableDefaults"] !== undefined) {
          body["inputVariableDefaults"] = g["inputVariableDefaults"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["releaseRequirements"] !== undefined) {
          body["releaseRequirements"] = g["releaseRequirements"];
        }
        if (g["unitKind"] !== undefined) body["unitKind"] = g["unitKind"];
        if (g["releaseId"] !== undefined) body["releaseId"] = g["releaseId"];
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
      description: "Get a releases",
      arguments: z.object({
        identifier: z.string().describe("The name of the releases"),
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
      description: "Update releases attributes",
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
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["blueprint"] !== undefined) body["blueprint"] = g["blueprint"];
        if (g["inputVariableDefaults"] !== undefined) {
          body["inputVariableDefaults"] = g["inputVariableDefaults"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["releaseRequirements"] !== undefined) {
          body["releaseRequirements"] = g["releaseRequirements"];
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
      description: "Delete the releases",
      arguments: z.object({
        identifier: z.string().describe("The name of the releases"),
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
      description: "Sync releases state from GCP",
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
