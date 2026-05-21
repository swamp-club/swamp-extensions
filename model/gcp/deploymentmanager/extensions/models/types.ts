// Auto-generated extension model for @swamp/gcp/deploymentmanager/types
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Deployment Manager Types.
 *
 * A resource type supported by Deployment Manager.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://deploymentmanager.googleapis.com/";

const LIST_CONFIG = {
  "id": "deploymentmanager.types.list",
  "path": "deploymentmanager/v2/projects/{project}/global/types",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "project": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  id: z.string().optional(),
  insertTime: z.string().optional(),
  name: z.string(),
  operation: z.object({
    clientOperationId: z.string(),
    creationTimestamp: z.string(),
    description: z.string(),
    endTime: z.string(),
    error: z.object({
      errors: z.array(z.object({
        arguments: z.array(z.unknown()),
        code: z.string(),
        debugInfo: z.object({
          detail: z.unknown(),
          stackEntries: z.unknown(),
        }),
        errorDetails: z.array(z.unknown()),
        location: z.string(),
        message: z.string(),
      })),
    }),
    firewallPolicyRuleOperationMetadata: z.object({
      allocatedPriority: z.number(),
    }),
    getVersionOperationMetadata: z.object({
      inlineSbomInfo: z.object({
        currentComponentVersions: z.record(z.string(), z.unknown()),
        targetComponentVersions: z.record(z.string(), z.unknown()),
      }),
    }),
    httpErrorMessage: z.string(),
    httpErrorStatusCode: z.number(),
    id: z.string(),
    insertTime: z.string(),
    instancesBulkInsertOperationMetadata: z.object({
      machineType: z.string(),
      perLocationStatus: z.record(z.string(), z.unknown()),
    }),
    kind: z.string(),
    name: z.string(),
    operationGroupId: z.string(),
    operationType: z.string(),
    progress: z.number(),
    region: z.string(),
    selfLink: z.string(),
    selfLinkWithId: z.string(),
    setAutoscalerLinkOperationMetadata: z.object({
      zonalIgmIds: z.array(z.string()),
      zoneToIgmIds: z.record(z.string(), z.unknown()),
    }),
    setCommonInstanceMetadataOperationMetadata: z.object({
      clientOperationId: z.string(),
      perLocationOperations: z.record(z.string(), z.unknown()),
    }),
    startTime: z.string(),
    status: z.string(),
    statusMessage: z.string(),
    targetId: z.string(),
    targetLink: z.string(),
    user: z.string(),
    warnings: z.array(z.object({
      code: z.string(),
      data: z.array(z.object({
        key: z.unknown(),
        value: z.unknown(),
      })),
      message: z.string(),
    })),
    zone: z.string(),
  }).optional(),
  selfLink: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Deployment Manager Types. Registered at `@swamp/gcp/deploymentmanager/types`. */
export const model = {
  type: "@swamp/gcp/deploymentmanager/types",
  version: "2026.05.21.1",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A resource type supported by Deployment Manager.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a types",
      arguments: z.object({
        identifier: z.string().describe("The name of the types"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync types state from GCP",
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
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
