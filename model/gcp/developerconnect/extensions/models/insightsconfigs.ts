// Auto-generated extension model for @swamp/gcp/developerconnect/insightsconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Developer Connect InsightsConfigs.
 *
 * The InsightsConfig resource is the core configuration object to capture events from your Software Development Lifecycle. It acts as the central hub for managing how Developer Connect understands your application, its runtime environments, and the artifacts deployed within them.
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
  return `${parent}/insightsConfigs/${shortName}`;
}

const BASE_URL = "https://developerconnect.googleapis.com/";

const GET_CONFIG = {
  "id": "developerconnect.projects.locations.insightsConfigs.get",
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
  "id": "developerconnect.projects.locations.insightsConfigs.create",
  "path": "v1/{+parent}/insightsConfigs",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "insightsConfigId": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "developerconnect.projects.locations.insightsConfigs.patch",
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
    "validateOnly": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "developerconnect.projects.locations.insightsConfigs.delete",
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

const LIST_CONFIG = {
  "id": "developerconnect.projects.locations.insightsConfigs.list",
  "path": "v1/{+parent}/insightsConfigs",
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
    "Optional. User specified annotations. See https://google.aip.dev/148#annotations for more details such as format and size limitations.",
  ).optional(),
  appHubApplication: z.string().describe(
    "Optional. The name of the App Hub Application. Format: projects/{project}/locations/{location}/applications/{application}",
  ).optional(),
  artifactConfigs: z.array(z.object({
    googleArtifactAnalysis: z.object({
      projectId: z.string().describe(
        "Required. The project id of the project where the provenance is stored.",
      ).optional(),
    }).describe("Google Artifact Analysis configurations.").optional(),
    googleArtifactRegistry: z.object({
      artifactRegistryPackage: z.string().describe(
        "Required. Immutable. The name of the artifact registry package.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The host project of Artifact Registry.",
      ).optional(),
    }).describe("Google Artifact Registry configurations.").optional(),
    uri: z.string().describe(
      "Required. Immutable. The URI of the artifact that is deployed. e.g. `us-docker.pkg.dev/my-project/my-repo/image`. The URI does not include the tag / digest because it captures a lineage of artifacts.",
    ).optional(),
  })).describe(
    "Optional. The artifact configurations of the artifacts that are deployed.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with an InsightsConfig.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the InsightsConfig. Format: projects/{project}/locations/{location}/insightsConfigs/{insightsConfig}",
  ).optional(),
  projects: z.object({
    projectIds: z.array(z.string()).describe(
      "Optional. The project IDs. Format: {project}",
    ).optional(),
  }).describe(
    "Projects represents the projects to track with the InsightsConfig.",
  ).optional(),
  insightsConfigId: z.string().describe(
    "Required. ID of the requesting InsightsConfig.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  appHubApplication: z.string().optional(),
  artifactConfigs: z.array(z.object({
    googleArtifactAnalysis: z.object({
      projectId: z.string(),
    }),
    googleArtifactRegistry: z.object({
      artifactRegistryPackage: z.string(),
      projectId: z.string(),
    }),
    uri: z.string(),
  })).optional(),
  createTime: z.string().optional(),
  errors: z.array(z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  })).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  projects: z.object({
    projectIds: z.array(z.string()),
  }).optional(),
  reconciling: z.boolean().optional(),
  runtimeConfigs: z.array(z.object({
    appHubService: z.object({
      apphubService: z.string(),
      criticality: z.string(),
      environment: z.string(),
    }),
    appHubWorkload: z.object({
      criticality: z.string(),
      environment: z.string(),
      workload: z.string(),
    }),
    gkeWorkload: z.object({
      cluster: z.string(),
      deployment: z.string(),
    }),
    googleCloudRun: z.object({
      serviceUri: z.string(),
    }),
    state: z.string(),
    uri: z.string(),
  })).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User specified annotations. See https://google.aip.dev/148#annotations for more details such as format and size limitations.",
  ).optional(),
  appHubApplication: z.string().describe(
    "Optional. The name of the App Hub Application. Format: projects/{project}/locations/{location}/applications/{application}",
  ).optional(),
  artifactConfigs: z.array(z.object({
    googleArtifactAnalysis: z.object({
      projectId: z.string().describe(
        "Required. The project id of the project where the provenance is stored.",
      ).optional(),
    }).describe("Google Artifact Analysis configurations.").optional(),
    googleArtifactRegistry: z.object({
      artifactRegistryPackage: z.string().describe(
        "Required. Immutable. The name of the artifact registry package.",
      ).optional(),
      projectId: z.string().describe(
        "Required. The host project of Artifact Registry.",
      ).optional(),
    }).describe("Google Artifact Registry configurations.").optional(),
    uri: z.string().describe(
      "Required. Immutable. The URI of the artifact that is deployed. e.g. `us-docker.pkg.dev/my-project/my-repo/image`. The URI does not include the tag / digest because it captures a lineage of artifacts.",
    ).optional(),
  })).describe(
    "Optional. The artifact configurations of the artifacts that are deployed.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Set of labels associated with an InsightsConfig.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The name of the InsightsConfig. Format: projects/{project}/locations/{location}/insightsConfigs/{insightsConfig}",
  ).optional(),
  projects: z.object({
    projectIds: z.array(z.string()).describe(
      "Optional. The project IDs. Format: {project}",
    ).optional(),
  }).describe(
    "Projects represents the projects to track with the InsightsConfig.",
  ).optional(),
  insightsConfigId: z.string().describe(
    "Required. ID of the requesting InsightsConfig.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Developer Connect InsightsConfigs. Registered at `@swamp/gcp/developerconnect/insightsconfigs`. */
export const model = {
  type: "@swamp/gcp/developerconnect/insightsconfigs",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The InsightsConfig resource is the core configuration object to capture event...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a insightsConfigs",
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
        if (g["appHubApplication"] !== undefined) {
          body["appHubApplication"] = g["appHubApplication"];
        }
        if (g["artifactConfigs"] !== undefined) {
          body["artifactConfigs"] = g["artifactConfigs"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["projects"] !== undefined) body["projects"] = g["projects"];
        if (g["insightsConfigId"] !== undefined) {
          body["insightsConfigId"] = g["insightsConfigId"];
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
      description: "Get a insightsConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the insightsConfigs"),
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
      description: "Update insightsConfigs attributes",
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
        if (g["appHubApplication"] !== undefined) {
          body["appHubApplication"] = g["appHubApplication"];
        }
        if (g["artifactConfigs"] !== undefined) {
          body["artifactConfigs"] = g["artifactConfigs"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["projects"] !== undefined) body["projects"] = g["projects"];
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
      description: "Delete the insightsConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the insightsConfigs"),
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
      description: "Sync insightsConfigs state from GCP",
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
