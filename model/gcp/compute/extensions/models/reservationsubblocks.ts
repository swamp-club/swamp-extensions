// Auto-generated extension model for @swamp/gcp/compute/reservationsubblocks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Compute Engine ReservationSubBlocks.
 *
 * Retrieves information about the specified reservation subBlock.
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
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://compute.googleapis.com/compute/v1/";

const GET_CONFIG = {
  "id": "compute.reservationSubBlocks.get",
  "path":
    "projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}",
  "httpMethod": "GET",
  "parameterOrder": [
    "project",
    "zone",
    "parentName",
    "reservationSubBlock",
  ],
  "parameters": {
    "parentName": {
      "location": "path",
      "required": true,
    },
    "project": {
      "location": "path",
      "required": true,
    },
    "reservationSubBlock": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
    "zone": {
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
  resource: z.object({
    acceleratorTopologiesInfo: z.object({
      acceleratorTopologyInfos: z.array(z.object({
        acceleratorTopology: z.string(),
        infoPerTopologyStates: z.array(z.unknown()),
      })),
    }),
    count: z.number(),
    creationTimestamp: z.string(),
    healthInfo: z.object({
      degradedHostCount: z.number(),
      degradedInfraCount: z.number(),
      healthStatus: z.string(),
      healthyHostCount: z.number(),
      healthyInfraCount: z.number(),
    }),
    id: z.string(),
    inUseCount: z.number(),
    inUseHostCount: z.number(),
    kind: z.string(),
    name: z.string(),
    physicalTopology: z.object({
      block: z.string(),
      cluster: z.string(),
      subBlock: z.string(),
    }),
    reservationSubBlockMaintenance: z.object({
      instanceMaintenanceOngoingCount: z.number(),
      instanceMaintenancePendingCount: z.number(),
      maintenanceOngoingCount: z.number(),
      maintenancePendingCount: z.number(),
      schedulingType: z.string(),
      subblockInfraMaintenanceOngoingCount: z.number(),
      subblockInfraMaintenancePendingCount: z.number(),
      upcomingGroupMaintenance: z.object({
        canReschedule: z.boolean(),
        latestWindowStartTime: z.string(),
        maintenanceOnShutdown: z.boolean(),
        maintenanceReasons: z.array(z.string()),
        maintenanceStatus: z.string(),
        type: z.string(),
        windowEndTime: z.string(),
        windowStartTime: z.string(),
      }),
    }),
    selfLink: z.string(),
    selfLinkWithId: z.string(),
    status: z.string(),
    zone: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Compute Engine ReservationSubBlocks. Registered at `@swamp/gcp/compute/reservationsubblocks`. */
export const model = {
  type: "@swamp/gcp/compute/reservationsubblocks",
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
        "Retrieves information about the specified reservation subBlock.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a reservationSubBlocks",
      arguments: z.object({
        identifier: z.string().describe("The name of the reservationSubBlocks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
        if (g["parentName"] !== undefined) {
          params["parentName"] = String(g["parentName"]);
        }
        params["reservationSubBlock"] = args.identifier;
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
      description: "Sync reservationSubBlocks state from GCP",
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
          if (g["zone"] !== undefined) params["zone"] = String(g["zone"]);
          else if (existing["zone"]) params["zone"] = String(existing["zone"]);
          if (g["parentName"] !== undefined) {
            params["parentName"] = String(g["parentName"]);
          } else if (existing["parentName"]) {
            params["parentName"] = String(existing["parentName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["reservationSubBlock"] = identifier;
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
    get_iam_policy: {
      description: "get iam policy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["zone"] = existing["zone"]?.toString() ??
          g["zone"]?.toString() ?? "";
        params["parentResource"] = existing["parentResource"]?.toString() ??
          g["parentResource"]?.toString() ?? "";
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.reservationSubBlocks.getIamPolicy",
            "path":
              "projects/{project}/zones/{zone}/{+parentResource}/reservationSubBlocks/{resource}/getIamPolicy",
            "httpMethod": "GET",
            "parameterOrder": ["project", "zone", "parentResource", "resource"],
            "parameters": {
              "optionsRequestedPolicyVersion": { "location": "query" },
              "parentResource": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_version: {
      description: "get version",
      arguments: z.object({
        sbomSelections: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["zone"] = existing["zone"]?.toString() ??
          g["zone"]?.toString() ?? "";
        params["parentName"] = existing["parentName"]?.toString() ??
          g["parentName"]?.toString() ?? "";
        params["reservationSubBlock"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["sbomSelections"] !== undefined) {
          body["sbomSelections"] = args["sbomSelections"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.reservationSubBlocks.getVersion",
            "path":
              "projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}/getVersion",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "parentName",
              "reservationSubBlock",
            ],
            "parameters": {
              "parentName": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "reservationSubBlock": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    perform_maintenance: {
      description: "perform maintenance",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["zone"] = existing["zone"]?.toString() ??
          g["zone"]?.toString() ?? "";
        params["parentName"] = existing["parentName"]?.toString() ??
          g["parentName"]?.toString() ?? "";
        params["reservationSubBlock"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.reservationSubBlocks.performMaintenance",
            "path":
              "projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}/performMaintenance",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "parentName",
              "reservationSubBlock",
            ],
            "parameters": {
              "parentName": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "reservationSubBlock": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    report_faulty: {
      description: "report faulty",
      arguments: z.object({
        disruptionSchedule: z.any().optional(),
        failureComponent: z.any().optional(),
        faultReasons: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["zone"] = existing["zone"]?.toString() ??
          g["zone"]?.toString() ?? "";
        params["parentName"] = existing["parentName"]?.toString() ??
          g["parentName"]?.toString() ?? "";
        params["reservationSubBlock"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["disruptionSchedule"] !== undefined) {
          body["disruptionSchedule"] = args["disruptionSchedule"];
        }
        if (args["failureComponent"] !== undefined) {
          body["failureComponent"] = args["failureComponent"];
        }
        if (args["faultReasons"] !== undefined) {
          body["faultReasons"] = args["faultReasons"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.reservationSubBlocks.reportFaulty",
            "path":
              "projects/{project}/zones/{zone}/{+parentName}/reservationSubBlocks/{reservationSubBlock}/reportFaulty",
            "httpMethod": "POST",
            "parameterOrder": [
              "project",
              "zone",
              "parentName",
              "reservationSubBlock",
            ],
            "parameters": {
              "parentName": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "requestId": { "location": "query" },
              "reservationSubBlock": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    set_iam_policy: {
      description: "set iam policy",
      arguments: z.object({
        bindings: z.any().optional(),
        etag: z.any().optional(),
        policy: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["zone"] = existing["zone"]?.toString() ??
          g["zone"]?.toString() ?? "";
        params["parentResource"] = existing["parentResource"]?.toString() ??
          g["parentResource"]?.toString() ?? "";
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["bindings"] !== undefined) body["bindings"] = args["bindings"];
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["policy"] !== undefined) body["policy"] = args["policy"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.reservationSubBlocks.setIamPolicy",
            "path":
              "projects/{project}/zones/{zone}/{+parentResource}/reservationSubBlocks/{resource}/setIamPolicy",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "parentResource", "resource"],
            "parameters": {
              "parentResource": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    test_iam_permissions: {
      description: "test iam permissions",
      arguments: z.object({
        permissions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["zone"] = existing["zone"]?.toString() ??
          g["zone"]?.toString() ?? "";
        params["parentResource"] = existing["parentResource"]?.toString() ??
          g["parentResource"]?.toString() ?? "";
        params["resource"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["permissions"] !== undefined) {
          body["permissions"] = args["permissions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "compute.reservationSubBlocks.testIamPermissions",
            "path":
              "projects/{project}/zones/{zone}/{+parentResource}/reservationSubBlocks/{resource}/testIamPermissions",
            "httpMethod": "POST",
            "parameterOrder": ["project", "zone", "parentResource", "resource"],
            "parameters": {
              "parentResource": { "location": "path", "required": true },
              "project": { "location": "path", "required": true },
              "resource": { "location": "path", "required": true },
              "zone": { "location": "path", "required": true },
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
