// Auto-generated extension model for @swamp/gcp/firebaseapphosting/backends-traffic
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase App Hosting Backends.Traffic.
 *
 * Controls traffic configuration for the backend.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://firebaseapphosting.googleapis.com/";

const GET_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.traffic.get",
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

const PATCH_CONFIG = {
  "id": "firebaseapphosting.projects.locations.backends.traffic.patch",
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

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. Time at which the backend was created.",
  ).optional(),
  current: z.object({
    splits: z.array(z.object({
      build: z.string().describe(
        "Required. The build that traffic is being routed to.",
      ).optional(),
      percent: z.number().int().describe(
        "Required. The percentage of traffic to send to the build. Currently must be 100% or 0%.",
      ).optional(),
    })).describe("Required. The list of traffic splits.").optional(),
  }).describe(
    "A list of traffic splits that together represent where traffic is being routed.",
  ).optional(),
  etag: z.string().describe(
    "Output only. Server-computed checksum based on other values; may be sent on update or delete to ensure operation is done on expected resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that can be used to organize and categorize objects.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the backend's traffic. Format: `projects/{project}/locations/{locationId}/backends/{backendId}/traffic`.",
  ).optional(),
  reconciling: z.boolean().describe(
    "Output only. A field that, if true, indicates that the system is working to make the backend's `current` match the requested `target` list.",
  ).optional(),
  rolloutPolicy: z.object({
    codebaseBranch: z.string().describe(
      "If set, specifies a branch that triggers a new build to be started with this policy. Otherwise, no automatic rollouts will happen.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. A flag that, if true, prevents automatic rollouts from being created via this RolloutPolicy.",
    ).optional(),
    disabledTime: z.string().describe(
      "Output only. If `disabled` is set, the time at which the automatic rollouts were disabled.",
    ).optional(),
    ignoredPaths: z.array(z.object({
      pattern: z.string().describe("Optional. The pattern to match against.")
        .optional(),
      type: z.enum(["PATTERN_TYPE_UNSPECIFIED", "RE2", "GLOB", "PREFIX"])
        .describe("Optional. The type of pattern to match against.").optional(),
    })).describe(
      'Optional. A list of file paths patterns to exclude from triggering a rollout. Patterns in this list take precedence over required_paths. **Note**: All paths must be in the ignored_paths in order for the rollout to be skipped. Limited to 100 paths. Example: ` ignored_paths: { pattern: "foo/bar/excluded/*", type: "GLOB" } `',
    ).optional(),
    requiredPaths: z.array(z.object({
      pattern: z.string().describe("Optional. The pattern to match against.")
        .optional(),
      type: z.enum(["PATTERN_TYPE_UNSPECIFIED", "RE2", "GLOB", "PREFIX"])
        .describe("Optional. The type of pattern to match against.").optional(),
    })).describe(
      'Optional. A list of file paths patterns that trigger a build and rollout if at least one of the changed files in the commit are present in this list. This field is optional; the rollout policy will default to triggering on all paths if both ignored_paths and required_paths are not populated. Limited to 100 paths. Example: ` required_paths: { pattern: "foo/bar/*", type: "GLOB" } `',
    ).optional(),
  }).describe(
    "The policy for how automatic builds and rollouts are triggered and rolled out.",
  ).optional(),
  target: z.object({
    splits: z.array(z.object({
      build: z.string().describe(
        "Required. The build that traffic is being routed to.",
      ).optional(),
      percent: z.number().int().describe(
        "Required. The percentage of traffic to send to the build. Currently must be 100% or 0%.",
      ).optional(),
    })).describe("Required. The list of traffic splits.").optional(),
  }).describe(
    "A list of traffic splits that together represent where traffic is being routed.",
  ).optional(),
  uid: z.string().describe("Output only. System-assigned, unique identifier.")
    .optional(),
  updateTime: z.string().describe(
    "Output only. Time at which the backend was last updated.",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  createTime: z.string().optional(),
  current: z.object({
    splits: z.array(z.object({
      build: z.string(),
      percent: z.number(),
    })),
  }).optional(),
  etag: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  reconciling: z.boolean().optional(),
  rolloutPolicy: z.object({
    codebaseBranch: z.string(),
    disabled: z.boolean(),
    disabledTime: z.string(),
    ignoredPaths: z.array(z.object({
      pattern: z.string(),
      type: z.string(),
    })),
    requiredPaths: z.array(z.object({
      pattern: z.string(),
      type: z.string(),
    })),
  }).optional(),
  target: z.object({
    splits: z.array(z.object({
      build: z.string(),
      percent: z.number(),
    })),
  }).optional(),
  uid: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that may be set by external tools to store and arbitrary metadata. They are not queryable and should be preserved when modifying objects.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. Time at which the backend was created.",
  ).optional(),
  current: z.object({
    splits: z.array(z.object({
      build: z.string().describe(
        "Required. The build that traffic is being routed to.",
      ).optional(),
      percent: z.number().int().describe(
        "Required. The percentage of traffic to send to the build. Currently must be 100% or 0%.",
      ).optional(),
    })).describe("Required. The list of traffic splits.").optional(),
  }).describe(
    "A list of traffic splits that together represent where traffic is being routed.",
  ).optional(),
  etag: z.string().describe(
    "Output only. Server-computed checksum based on other values; may be sent on update or delete to ensure operation is done on expected resource.",
  ).optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. Unstructured key value map that can be used to organize and categorize objects.",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name of the backend's traffic. Format: `projects/{project}/locations/{locationId}/backends/{backendId}/traffic`.",
  ).optional(),
  reconciling: z.boolean().describe(
    "Output only. A field that, if true, indicates that the system is working to make the backend's `current` match the requested `target` list.",
  ).optional(),
  rolloutPolicy: z.object({
    codebaseBranch: z.string().describe(
      "If set, specifies a branch that triggers a new build to be started with this policy. Otherwise, no automatic rollouts will happen.",
    ).optional(),
    disabled: z.boolean().describe(
      "Optional. A flag that, if true, prevents automatic rollouts from being created via this RolloutPolicy.",
    ).optional(),
    disabledTime: z.string().describe(
      "Output only. If `disabled` is set, the time at which the automatic rollouts were disabled.",
    ).optional(),
    ignoredPaths: z.array(z.object({
      pattern: z.string().describe("Optional. The pattern to match against.")
        .optional(),
      type: z.enum(["PATTERN_TYPE_UNSPECIFIED", "RE2", "GLOB", "PREFIX"])
        .describe("Optional. The type of pattern to match against.").optional(),
    })).describe(
      'Optional. A list of file paths patterns to exclude from triggering a rollout. Patterns in this list take precedence over required_paths. **Note**: All paths must be in the ignored_paths in order for the rollout to be skipped. Limited to 100 paths. Example: ` ignored_paths: { pattern: "foo/bar/excluded/*", type: "GLOB" } `',
    ).optional(),
    requiredPaths: z.array(z.object({
      pattern: z.string().describe("Optional. The pattern to match against.")
        .optional(),
      type: z.enum(["PATTERN_TYPE_UNSPECIFIED", "RE2", "GLOB", "PREFIX"])
        .describe("Optional. The type of pattern to match against.").optional(),
    })).describe(
      'Optional. A list of file paths patterns that trigger a build and rollout if at least one of the changed files in the commit are present in this list. This field is optional; the rollout policy will default to triggering on all paths if both ignored_paths and required_paths are not populated. Limited to 100 paths. Example: ` required_paths: { pattern: "foo/bar/*", type: "GLOB" } `',
    ).optional(),
  }).describe(
    "The policy for how automatic builds and rollouts are triggered and rolled out.",
  ).optional(),
  target: z.object({
    splits: z.array(z.object({
      build: z.string().describe(
        "Required. The build that traffic is being routed to.",
      ).optional(),
      percent: z.number().int().describe(
        "Required. The percentage of traffic to send to the build. Currently must be 100% or 0%.",
      ).optional(),
    })).describe("Required. The list of traffic splits.").optional(),
  }).describe(
    "A list of traffic splits that together represent where traffic is being routed.",
  ).optional(),
  uid: z.string().describe("Output only. System-assigned, unique identifier.")
    .optional(),
  updateTime: z.string().describe(
    "Output only. Time at which the backend was last updated.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firebase App Hosting Backends.Traffic. Registered at `@swamp/gcp/firebaseapphosting/backends-traffic`. */
export const model = {
  type: "@swamp/gcp/firebaseapphosting/backends-traffic",
  version: "2026.05.24.1",
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
      toVersion: "2026.05.14.1",
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
    {
      toVersion: "2026.05.20.1",
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
      description: "Controls traffic configuration for the backend.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a traffic",
      arguments: z.object({
        identifier: z.string().describe("The name of the traffic"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Update traffic attributes",
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["current"] !== undefined) body["current"] = g["current"];
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["reconciling"] !== undefined) {
          body["reconciling"] = g["reconciling"];
        }
        if (g["rolloutPolicy"] !== undefined) {
          body["rolloutPolicy"] = g["rolloutPolicy"];
        }
        if (g["target"] !== undefined) body["target"] = g["target"];
        if (g["uid"] !== undefined) body["uid"] = g["uid"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
    sync: {
      description: "Sync traffic state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
