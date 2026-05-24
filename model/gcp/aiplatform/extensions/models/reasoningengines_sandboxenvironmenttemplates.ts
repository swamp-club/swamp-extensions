// Auto-generated extension model for @swamp/gcp/aiplatform/reasoningengines-sandboxenvironmenttemplates
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Agent Platform ReasoningEngines.SandboxEnvironmentTemplates.
 *
 * The specification of a SandboxEnvironmentTemplate. A SandboxEnvironmentTemplate defines a template for creating SandboxEnvironments.
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
  return `${parent}/sandboxEnvironmentTemplates/${shortName}`;
}

const BASE_URL = "https://aiplatform.googleapis.com/";

const GET_CONFIG = {
  "id":
    "aiplatform.projects.locations.reasoningEngines.sandboxEnvironmentTemplates.get",
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
    "aiplatform.projects.locations.reasoningEngines.sandboxEnvironmentTemplates.create",
  "path": "v1/{+parent}/sandboxEnvironmentTemplates",
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
    "aiplatform.projects.locations.reasoningEngines.sandboxEnvironmentTemplates.delete",
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
    "aiplatform.projects.locations.reasoningEngines.sandboxEnvironmentTemplates.list",
  "path": "v1/{+parent}/sandboxEnvironmentTemplates",
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
  customContainerEnvironment: z.object({
    customContainerSpec: z.object({
      imageUri: z.string().describe(
        "Required. The Artifact Registry Docker image URI (e.g., us-central1-docker.pkg.dev/my-project/my-repo/my-image:tag) of the container image that is to be run on each worker replica.",
      ).optional(),
    }).describe("Specification for deploying from a custom container image.")
      .optional(),
    ports: z.array(z.object({
      port: z.number().int().describe(
        "Optional. Port number to expose. This must be a valid port number, between 1 and 65535.",
      ).optional(),
      protocol: z.enum(["PROTOCOL_UNSPECIFIED", "TCP", "UDP"]).describe(
        "Optional. Protocol for port. Defaults to TCP if not specified.",
      ).optional(),
    })).describe("Ports to expose from the container.").optional(),
    resources: z.object({
      limits: z.record(z.string(), z.string()).describe(
        'Optional. The maximum amounts of compute resources allowed. Keys are resource names (e.g., "cpu", "memory"). Values are quantities (e.g., "500m", "1Gi").',
      ).optional(),
      requests: z.record(z.string(), z.string()).describe(
        'Optional. The requested amounts of compute resources. Keys are resource names (e.g., "cpu", "memory"). Values are quantities (e.g., "250m", "512Mi").',
      ).optional(),
    }).describe(
      "Message to define resource requests and limits (mirroring Kubernetes) for each sandbox instance created from this template.",
    ).optional(),
  }).describe("The customized sandbox runtime environment for BYOC.")
    .optional(),
  defaultContainerEnvironment: z.object({
    defaultContainerCategory: z.enum([
      "DEFAULT_CONTAINER_CATEGORY_UNSPECIFIED",
      "DEFAULT_CONTAINER_CATEGORY_COMPUTER_USE",
    ]).describe("Required. The category of the default container image.")
      .optional(),
  }).describe(
    "The default sandbox runtime environment for default container workloads.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the SandboxEnvironmentTemplate.",
  ).optional(),
  egressControlConfig: z.object({
    internetAccess: z.boolean().describe(
      "Optional. Whether to allow internet access.",
    ).optional(),
  }).describe("Configuration for egress control of sandbox instances.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the SandboxEnvironmentTemplate. Format: `projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine}/sandboxEnvironmentTemplates/{sandbox_environment_template}`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  customContainerEnvironment: z.object({
    customContainerSpec: z.object({
      imageUri: z.string(),
    }),
    ports: z.array(z.object({
      port: z.number(),
      protocol: z.string(),
    })),
    resources: z.object({
      limits: z.record(z.string(), z.unknown()),
      requests: z.record(z.string(), z.unknown()),
    }),
  }).optional(),
  defaultContainerEnvironment: z.object({
    defaultContainerCategory: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  egressControlConfig: z.object({
    internetAccess: z.boolean(),
  }).optional(),
  name: z.string(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  customContainerEnvironment: z.object({
    customContainerSpec: z.object({
      imageUri: z.string().describe(
        "Required. The Artifact Registry Docker image URI (e.g., us-central1-docker.pkg.dev/my-project/my-repo/my-image:tag) of the container image that is to be run on each worker replica.",
      ).optional(),
    }).describe("Specification for deploying from a custom container image.")
      .optional(),
    ports: z.array(z.object({
      port: z.number().int().describe(
        "Optional. Port number to expose. This must be a valid port number, between 1 and 65535.",
      ).optional(),
      protocol: z.enum(["PROTOCOL_UNSPECIFIED", "TCP", "UDP"]).describe(
        "Optional. Protocol for port. Defaults to TCP if not specified.",
      ).optional(),
    })).describe("Ports to expose from the container.").optional(),
    resources: z.object({
      limits: z.record(z.string(), z.string()).describe(
        'Optional. The maximum amounts of compute resources allowed. Keys are resource names (e.g., "cpu", "memory"). Values are quantities (e.g., "500m", "1Gi").',
      ).optional(),
      requests: z.record(z.string(), z.string()).describe(
        'Optional. The requested amounts of compute resources. Keys are resource names (e.g., "cpu", "memory"). Values are quantities (e.g., "250m", "512Mi").',
      ).optional(),
    }).describe(
      "Message to define resource requests and limits (mirroring Kubernetes) for each sandbox instance created from this template.",
    ).optional(),
  }).describe("The customized sandbox runtime environment for BYOC.")
    .optional(),
  defaultContainerEnvironment: z.object({
    defaultContainerCategory: z.enum([
      "DEFAULT_CONTAINER_CATEGORY_UNSPECIFIED",
      "DEFAULT_CONTAINER_CATEGORY_COMPUTER_USE",
    ]).describe("Required. The category of the default container image.")
      .optional(),
  }).describe(
    "The default sandbox runtime environment for default container workloads.",
  ).optional(),
  displayName: z.string().describe(
    "Required. The display name of the SandboxEnvironmentTemplate.",
  ).optional(),
  egressControlConfig: z.object({
    internetAccess: z.boolean().describe(
      "Optional. Whether to allow internet access.",
    ).optional(),
  }).describe("Configuration for egress control of sandbox instances.")
    .optional(),
  name: z.string().describe(
    "Identifier. The resource name of the SandboxEnvironmentTemplate. Format: `projects/{project}/locations/{location}/reasoningEngines/{reasoning_engine}/sandboxEnvironmentTemplates/{sandbox_environment_template}`",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Agent Platform ReasoningEngines.SandboxEnvironmentTemplates. Registered at `@swamp/gcp/aiplatform/reasoningengines-sandboxenvironmenttemplates`. */
export const model = {
  type: "@swamp/gcp/aiplatform/reasoningengines-sandboxenvironmenttemplates",
  version: "2026.05.24.1",
  upgrades: [
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
        "The specification of a SandboxEnvironmentTemplate. A SandboxEnvironmentTempla...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sandboxEnvironmentTemplates",
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
        if (g["customContainerEnvironment"] !== undefined) {
          body["customContainerEnvironment"] = g["customContainerEnvironment"];
        }
        if (g["defaultContainerEnvironment"] !== undefined) {
          body["defaultContainerEnvironment"] =
            g["defaultContainerEnvironment"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["egressControlConfig"] !== undefined) {
          body["egressControlConfig"] = g["egressControlConfig"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
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
      description: "Get a sandboxEnvironmentTemplates",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the sandboxEnvironmentTemplates",
        ),
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
      description: "Delete the sandboxEnvironmentTemplates",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the sandboxEnvironmentTemplates",
        ),
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
      description: "Sync sandboxEnvironmentTemplates state from GCP",
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
