// Auto-generated extension model for @swamp/gcp/clouddeploy/customtargettypes
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Deploy CustomTargetTypes.
 *
 * A `CustomTargetType` resource in the Cloud Deploy API. A `CustomTargetType` defines a type of custom target that can be referenced in a `Target` in order to facilitate deploying to other systems besides the supported runtimes.
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
  return `${parent}/customTargetTypes/${shortName}`;
}

const BASE_URL = "https://clouddeploy.googleapis.com/";

const GET_CONFIG = {
  "id": "clouddeploy.projects.locations.customTargetTypes.get",
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
  "id": "clouddeploy.projects.locations.customTargetTypes.create",
  "path": "v1/{+parent}/customTargetTypes",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "customTargetTypeId": {
      "location": "query",
    },
    "parent": {
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

const PATCH_CONFIG = {
  "id": "clouddeploy.projects.locations.customTargetTypes.patch",
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
  "id": "clouddeploy.projects.locations.customTargetTypes.delete",
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
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  customActions: z.object({
    deployAction: z.string().describe(
      "Required. The Skaffold custom action responsible for deploy operations.",
    ).optional(),
    includeSkaffoldModules: z.array(z.object({
      configs: z.array(z.string()).describe(
        "Optional. The Skaffold Config modules to use from the specified source.",
      ).optional(),
      git: z.object({
        path: z.string().describe(
          "Optional. Relative path from the repository root to the Skaffold file.",
        ).optional(),
        ref: z.string().describe(
          "Optional. Git branch or tag to use when cloning the repository.",
        ).optional(),
        repo: z.string().describe(
          "Required. Git repository the package should be cloned from.",
        ).optional(),
      }).describe("Git repository containing Skaffold Config modules.")
        .optional(),
      googleCloudBuildRepo: z.object({
        path: z.string().describe(
          "Optional. Relative path from the repository root to the Skaffold Config file.",
        ).optional(),
        ref: z.string().describe(
          "Optional. Branch or tag to use when cloning the repository.",
        ).optional(),
        repository: z.string().describe(
          "Required. Name of the Cloud Build V2 Repository. Format is projects/{project}/locations/{location}/connections/{connection}/repositories/{repository}.",
        ).optional(),
      }).describe("Cloud Build V2 Repository containing Skaffold Configs.")
        .optional(),
      googleCloudStorage: z.object({
        path: z.string().describe(
          "Optional. Relative path from the source to the Skaffold file.",
        ).optional(),
        source: z.string().describe(
          'Required. Cloud Storage source paths to copy recursively. For example, providing "gs://my-bucket/dir/configs/*" will result in Skaffold copying all files within the "dir/configs" directory in the bucket "my-bucket".',
        ).optional(),
      }).describe("Cloud Storage bucket containing Skaffold Config modules.")
        .optional(),
    })).describe(
      "Optional. List of Skaffold modules Cloud Deploy will include in the Skaffold Config as required before performing diagnose.",
    ).optional(),
    renderAction: z.string().describe(
      "Optional. The Skaffold custom action responsible for render operations. If not provided then Cloud Deploy will perform the render operations via `skaffold render`.",
    ).optional(),
  }).describe(
    "CustomTargetSkaffoldActions represents the `CustomTargetType` configuration using Skaffold custom actions.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `CustomTargetType`. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `CustomTargetType`. Format is `projects/{project}/locations/{location}/customTargetTypes/{customTargetType}`. The `customTargetType` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
  ).optional(),
  tasks: z.object({
    deploy: z.object({
      container: z.object({
        args: z.array(z.string()).describe(
          "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
        ).optional(),
        command: z.array(z.string()).describe(
          "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
        ).optional(),
        env: z.record(z.string(), z.string()).describe(
          "Optional. Environment variables that are set in the container.",
        ).optional(),
        image: z.string().describe(
          "Required. Image is the container image to use.",
        ).optional(),
      }).describe(
        "This task is represented by a container that is executed in the Cloud Build execution environment.",
      ).optional(),
    }).describe(
      "A Task represents a unit of work that is executed as part of a Job.",
    ).optional(),
    render: z.object({
      container: z.object({
        args: z.array(z.string()).describe(
          "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
        ).optional(),
        command: z.array(z.string()).describe(
          "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
        ).optional(),
        env: z.record(z.string(), z.string()).describe(
          "Optional. Environment variables that are set in the container.",
        ).optional(),
        image: z.string().describe(
          "Required. Image is the container image to use.",
        ).optional(),
      }).describe(
        "This task is represented by a container that is executed in the Cloud Build execution environment.",
      ).optional(),
    }).describe(
      "A Task represents a unit of work that is executed as part of a Job.",
    ).optional(),
  }).describe(
    "CustomTargetTasks represents the `CustomTargetType` configuration using tasks.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  customActions: z.object({
    deployAction: z.string(),
    includeSkaffoldModules: z.array(z.object({
      configs: z.array(z.string()),
      git: z.object({
        path: z.string(),
        ref: z.string(),
        repo: z.string(),
      }),
      googleCloudBuildRepo: z.object({
        path: z.string(),
        ref: z.string(),
        repository: z.string(),
      }),
      googleCloudStorage: z.object({
        path: z.string(),
        source: z.string(),
      }),
    })),
    renderAction: z.string(),
  }).optional(),
  customTargetTypeId: z.string().optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  tasks: z.object({
    deploy: z.object({
      container: z.object({
        args: z.array(z.string()),
        command: z.array(z.string()),
        env: z.record(z.string(), z.unknown()),
        image: z.string(),
      }),
    }),
    render: z.object({
      container: z.object({
        args: z.array(z.string()),
        command: z.array(z.string()),
        env: z.record(z.string(), z.unknown()),
        image: z.string(),
      }),
    }),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. User annotations. These attributes can only be set and used by the user, and not by Cloud Deploy. See https://google.aip.dev/128#annotations for more details such as format and size limitations.",
  ).optional(),
  customActions: z.object({
    deployAction: z.string().describe(
      "Required. The Skaffold custom action responsible for deploy operations.",
    ).optional(),
    includeSkaffoldModules: z.array(z.object({
      configs: z.array(z.string()).describe(
        "Optional. The Skaffold Config modules to use from the specified source.",
      ).optional(),
      git: z.object({
        path: z.string().describe(
          "Optional. Relative path from the repository root to the Skaffold file.",
        ).optional(),
        ref: z.string().describe(
          "Optional. Git branch or tag to use when cloning the repository.",
        ).optional(),
        repo: z.string().describe(
          "Required. Git repository the package should be cloned from.",
        ).optional(),
      }).describe("Git repository containing Skaffold Config modules.")
        .optional(),
      googleCloudBuildRepo: z.object({
        path: z.string().describe(
          "Optional. Relative path from the repository root to the Skaffold Config file.",
        ).optional(),
        ref: z.string().describe(
          "Optional. Branch or tag to use when cloning the repository.",
        ).optional(),
        repository: z.string().describe(
          "Required. Name of the Cloud Build V2 Repository. Format is projects/{project}/locations/{location}/connections/{connection}/repositories/{repository}.",
        ).optional(),
      }).describe("Cloud Build V2 Repository containing Skaffold Configs.")
        .optional(),
      googleCloudStorage: z.object({
        path: z.string().describe(
          "Optional. Relative path from the source to the Skaffold file.",
        ).optional(),
        source: z.string().describe(
          'Required. Cloud Storage source paths to copy recursively. For example, providing "gs://my-bucket/dir/configs/*" will result in Skaffold copying all files within the "dir/configs" directory in the bucket "my-bucket".',
        ).optional(),
      }).describe("Cloud Storage bucket containing Skaffold Config modules.")
        .optional(),
    })).describe(
      "Optional. List of Skaffold modules Cloud Deploy will include in the Skaffold Config as required before performing diagnose.",
    ).optional(),
    renderAction: z.string().describe(
      "Optional. The Skaffold custom action responsible for render operations. If not provided then Cloud Deploy will perform the render operations via `skaffold render`.",
    ).optional(),
  }).describe(
    "CustomTargetSkaffoldActions represents the `CustomTargetType` configuration using Skaffold custom actions.",
  ).optional(),
  description: z.string().describe(
    "Optional. Description of the `CustomTargetType`. Max length is 255 characters.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Labels are attributes that can be set and used by both the user and by Cloud Deploy. Labels must meet the following constraints: * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. * All characters must use UTF-8 encoding, and international characters are allowed. * Keys must start with a lowercase letter or international character. * Each resource is limited to a maximum of 64 labels. Both keys and values are additionally constrained to be <= 128 bytes.",
  ).optional(),
  name: z.string().describe(
    "Identifier. Name of the `CustomTargetType`. Format is `projects/{project}/locations/{location}/customTargetTypes/{customTargetType}`. The `customTargetType` component must match `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`",
  ).optional(),
  tasks: z.object({
    deploy: z.object({
      container: z.object({
        args: z.array(z.string()).describe(
          "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
        ).optional(),
        command: z.array(z.string()).describe(
          "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
        ).optional(),
        env: z.record(z.string(), z.string()).describe(
          "Optional. Environment variables that are set in the container.",
        ).optional(),
        image: z.string().describe(
          "Required. Image is the container image to use.",
        ).optional(),
      }).describe(
        "This task is represented by a container that is executed in the Cloud Build execution environment.",
      ).optional(),
    }).describe(
      "A Task represents a unit of work that is executed as part of a Job.",
    ).optional(),
    render: z.object({
      container: z.object({
        args: z.array(z.string()).describe(
          "Optional. Args is the container arguments to use. This overrides the default arguments defined in the container image.",
        ).optional(),
        command: z.array(z.string()).describe(
          "Optional. Command is the container entrypoint to use. This overrides the default entrypoint defined in the container image.",
        ).optional(),
        env: z.record(z.string(), z.string()).describe(
          "Optional. Environment variables that are set in the container.",
        ).optional(),
        image: z.string().describe(
          "Required. Image is the container image to use.",
        ).optional(),
      }).describe(
        "This task is represented by a container that is executed in the Cloud Build execution environment.",
      ).optional(),
    }).describe(
      "A Task represents a unit of work that is executed as part of a Job.",
    ).optional(),
  }).describe(
    "CustomTargetTasks represents the `CustomTargetType` configuration using tasks.",
  ).optional(),
  requestId: z.string().describe(
    "Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000).",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Deploy CustomTargetTypes. Registered at `@swamp/gcp/clouddeploy/customtargettypes`. */
export const model = {
  type: "@swamp/gcp/clouddeploy/customtargettypes",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A `CustomTargetType` resource in the Cloud Deploy API. A `CustomTargetType` d...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a customTargetTypes",
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
        if (g["customActions"] !== undefined) {
          body["customActions"] = g["customActions"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["tasks"] !== undefined) body["tasks"] = g["tasks"];
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
      description: "Get a customTargetTypes",
      arguments: z.object({
        identifier: z.string().describe("The name of the customTargetTypes"),
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
      description: "Update customTargetTypes attributes",
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
        if (g["customActions"] !== undefined) {
          body["customActions"] = g["customActions"];
        }
        if (g["description"] !== undefined) {
          body["description"] = g["description"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["tasks"] !== undefined) body["tasks"] = g["tasks"];
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
      description: "Delete the customTargetTypes",
      arguments: z.object({
        identifier: z.string().describe("The name of the customTargetTypes"),
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
      description: "Sync customTargetTypes state from GCP",
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
