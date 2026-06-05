// Auto-generated extension model for @swamp/gcp/osconfig/patchjobs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud OS Config PatchJobs.
 *
 * A high level representation of a patch job that is either in progress or has completed. Instance details are not included in the job. To paginate through instance details, use `ListPatchJobInstanceDetails`. For more information about patch jobs, see [Creating patch jobs](https://cloud.google.com/compute/docs/os-patch-management/create-patch-job).
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/patchJobs/${shortName}`;
}

const BASE_URL = "https://osconfig.googleapis.com/";

const GET_CONFIG = {
  "id": "osconfig.projects.patchJobs.get",
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

const LIST_CONFIG = {
  "id": "osconfig.projects.patchJobs.list",
  "path": "v1/{+parent}/patchJobs",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  description: z.string().optional(),
  displayName: z.string().optional(),
  dryRun: z.boolean().optional(),
  duration: z.string().optional(),
  errorMessage: z.string().optional(),
  instanceDetailsSummary: z.object({
    ackedInstanceCount: z.string(),
    applyingPatchesInstanceCount: z.string(),
    downloadingPatchesInstanceCount: z.string(),
    failedInstanceCount: z.string(),
    inactiveInstanceCount: z.string(),
    noAgentDetectedInstanceCount: z.string(),
    notifiedInstanceCount: z.string(),
    pendingInstanceCount: z.string(),
    postPatchStepInstanceCount: z.string(),
    prePatchStepInstanceCount: z.string(),
    rebootingInstanceCount: z.string(),
    skippedInstanceCount: z.string(),
    startedInstanceCount: z.string(),
    succeededInstanceCount: z.string(),
    succeededRebootRequiredInstanceCount: z.string(),
    timedOutInstanceCount: z.string(),
  }).optional(),
  instanceFilter: z.object({
    all: z.boolean(),
    groupLabels: z.array(z.object({
      labels: z.record(z.string(), z.unknown()),
    })),
    instanceNamePrefixes: z.array(z.string()),
    instances: z.array(z.string()),
    zones: z.array(z.string()),
  }).optional(),
  name: z.string(),
  patchConfig: z.object({
    apt: z.object({
      excludes: z.array(z.string()),
      exclusivePackages: z.array(z.string()),
      type: z.string(),
    }),
    goo: z.object({}),
    migInstancesAllowed: z.boolean(),
    postStep: z.object({
      linuxExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number()),
        gcsObject: z.object({
          bucket: z.string(),
          generationNumber: z.string(),
          object: z.string(),
        }),
        interpreter: z.string(),
        localPath: z.string(),
      }),
      windowsExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number()),
        gcsObject: z.object({
          bucket: z.string(),
          generationNumber: z.string(),
          object: z.string(),
        }),
        interpreter: z.string(),
        localPath: z.string(),
      }),
    }),
    preStep: z.object({
      linuxExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number()),
        gcsObject: z.object({
          bucket: z.string(),
          generationNumber: z.string(),
          object: z.string(),
        }),
        interpreter: z.string(),
        localPath: z.string(),
      }),
      windowsExecStepConfig: z.object({
        allowedSuccessCodes: z.array(z.number()),
        gcsObject: z.object({
          bucket: z.string(),
          generationNumber: z.string(),
          object: z.string(),
        }),
        interpreter: z.string(),
        localPath: z.string(),
      }),
    }),
    rebootConfig: z.string(),
    skipUnpatchableVms: z.boolean(),
    windowsUpdate: z.object({
      classifications: z.array(z.string()),
      excludes: z.array(z.string()),
      exclusivePatches: z.array(z.string()),
    }),
    yum: z.object({
      excludes: z.array(z.string()),
      exclusivePackages: z.array(z.string()),
      minimal: z.boolean(),
      security: z.boolean(),
    }),
    zypper: z.object({
      categories: z.array(z.string()),
      excludes: z.array(z.string()),
      exclusivePatches: z.array(z.string()),
      severities: z.array(z.string()),
      withOptional: z.boolean(),
      withUpdate: z.boolean(),
    }),
  }).optional(),
  patchDeployment: z.string().optional(),
  percentComplete: z.number().optional(),
  rollout: z.object({
    disruptionBudget: z.object({
      fixed: z.number(),
      percent: z.number(),
    }),
    mode: z.string(),
  }).optional(),
  state: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud OS Config PatchJobs. Registered at `@swamp/gcp/osconfig/patchjobs`. */
export const model = {
  type: "@swamp/gcp/osconfig/patchjobs",
  version: "2026.06.05.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A high level representation of a patch job that is either in progress or has ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a patchJobs",
      arguments: z.object({
        identifier: z.string().describe("The name of the patchJobs"),
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
      description: "Sync patchJobs state from GCP",
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
    list: {
      description: "List patchJobs resources",
      arguments: z.object({
        filter: z.string().describe(
          "If provided, this field specifies the criteria that must be met by patch jobs to be included in the response. Currently, filtering is only available on the patch_deployment field.",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of instance status to return.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
          "patchJobs",
          (args.maxPages as number | undefined) ?? 10,
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
    cancel: {
      description: "cancel",
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
            "id": "osconfig.projects.patchJobs.cancel",
            "path": "v1/{+name}:cancel",
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
    execute: {
      description: "execute",
      arguments: z.object({
        description: z.any().optional(),
        displayName: z.any().optional(),
        dryRun: z.any().optional(),
        duration: z.any().optional(),
        instanceFilter: z.any().optional(),
        patchConfig: z.any().optional(),
        rollout: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["dryRun"] !== undefined) body["dryRun"] = args["dryRun"];
        if (args["duration"] !== undefined) body["duration"] = args["duration"];
        if (args["instanceFilter"] !== undefined) {
          body["instanceFilter"] = args["instanceFilter"];
        }
        if (args["patchConfig"] !== undefined) {
          body["patchConfig"] = args["patchConfig"];
        }
        if (args["rollout"] !== undefined) body["rollout"] = args["rollout"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "osconfig.projects.patchJobs.execute",
            "path": "v1/{+parent}/patchJobs:execute",
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
  },
};
