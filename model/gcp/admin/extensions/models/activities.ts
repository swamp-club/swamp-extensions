// Auto-generated extension model for @swamp/gcp/admin/activities
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Admin SDK Activities.
 *
 * JSON template for the activity resource.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://admin.googleapis.com/";

const LIST_CONFIG = {
  "id": "reports.activities.list",
  "path":
    "admin/reports/v1/activity/users/{userKey}/applications/{applicationName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userKey",
    "applicationName",
  ],
  "parameters": {
    "actorIpAddress": {
      "location": "query",
    },
    "applicationInfoFilter": {
      "location": "query",
    },
    "applicationName": {
      "location": "path",
      "required": true,
    },
    "customerId": {
      "location": "query",
    },
    "endTime": {
      "location": "query",
    },
    "eventName": {
      "location": "query",
    },
    "filters": {
      "location": "query",
    },
    "groupIdFilter": {
      "location": "query",
    },
    "includeSensitiveData": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "networkInfoFilter": {
      "location": "query",
    },
    "orgUnitID": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "resourceDetailsFilter": {
      "location": "query",
    },
    "startTime": {
      "location": "query",
    },
    "statusFilter": {
      "location": "query",
    },
    "userKey": {
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
  actor: z.object({
    applicationInfo: z.object({
      applicationName: z.string(),
      impersonation: z.boolean(),
      oauthClientId: z.string(),
    }),
    callerType: z.string(),
    email: z.string(),
    key: z.string(),
    profileId: z.string(),
  }).optional(),
  etag: z.string().optional(),
  events: z.array(z.object({
    name: z.string(),
    parameters: z.array(z.object({
      boolValue: z.boolean(),
      intValue: z.string(),
      messageValue: z.object({
        parameter: z.unknown(),
      }),
      multiIntValue: z.array(z.unknown()),
      multiMessageValue: z.array(z.unknown()),
      multiValue: z.array(z.unknown()),
      name: z.string(),
      value: z.string(),
    })),
    resourceIds: z.array(z.string()),
    sensitiveParameters: z.array(z.object({
      boolValue: z.boolean(),
      intValue: z.string(),
      messageValue: z.object({
        parameter: z.unknown(),
      }),
      multiIntValue: z.array(z.unknown()),
      multiMessageValue: z.array(z.unknown()),
      multiValue: z.array(z.unknown()),
      name: z.string(),
      value: z.string(),
    })),
    status: z.object({
      errorCode: z.string(),
      errorMessage: z.string(),
      eventStatus: z.string(),
      httpStatusCode: z.number(),
    }),
    type: z.string(),
  })).optional(),
  id: z.object({
    applicationName: z.string(),
    customerId: z.string(),
    time: z.string(),
    uniqueQualifier: z.string(),
  }).optional(),
  ipAddress: z.string().optional(),
  kind: z.string().optional(),
  networkInfo: z.object({
    ipAsn: z.array(z.number()),
    regionCode: z.string(),
    subdivisionCode: z.string(),
  }).optional(),
  ownerDomain: z.string().optional(),
  resourceDetails: z.array(z.object({
    appliedLabels: z.array(z.object({
      fieldValues: z.array(z.unknown()),
      id: z.string(),
      reason: z.object({
        reasonType: z.unknown(),
      }),
      title: z.string(),
    })),
    id: z.string(),
    ownerDetails: z.object({
      ownerIdentity: z.array(z.object({
        customerIdentity: z.unknown(),
        groupIdentity: z.unknown(),
        userIdentity: z.unknown(),
      })),
      ownerType: z.string(),
    }),
    relation: z.string(),
    title: z.string(),
    type: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Admin SDK Activities. Registered at `@swamp/gcp/admin/activities`. */
export const model = {
  type: "@swamp/gcp/admin/activities",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "JSON template for the activity resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a activities",
      arguments: z.object({
        identifier: z.string().describe("The name of the activities"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userKey"] !== undefined) {
          params["userKey"] = String(g["userKey"]);
        }
        if (g["applicationName"] !== undefined) {
          params["applicationName"] = String(g["applicationName"]);
        }
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
      description: "Sync activities state from GCP",
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
          if (g["userKey"] !== undefined) {
            params["userKey"] = String(g["userKey"]);
          } else if (existing["userKey"]) {
            params["userKey"] = String(existing["userKey"]);
          }
          if (g["applicationName"] !== undefined) {
            params["applicationName"] = String(g["applicationName"]);
          } else if (existing["applicationName"]) {
            params["applicationName"] = String(existing["applicationName"]);
          }
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
    watch: {
      description: "watch",
      arguments: z.object({
        address: z.any().optional(),
        expiration: z.any().optional(),
        id: z.any().optional(),
        kind: z.any().optional(),
        params: z.any().optional(),
        payload: z.any().optional(),
        resourceId: z.any().optional(),
        resourceUri: z.any().optional(),
        token: z.any().optional(),
        type: z.any().optional(),
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
        params["userKey"] = existing["userKey"]?.toString() ??
          g["userKey"]?.toString() ?? "";
        params["applicationName"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["address"] !== undefined) body["address"] = args["address"];
        if (args["expiration"] !== undefined) {
          body["expiration"] = args["expiration"];
        }
        if (args["id"] !== undefined) body["id"] = args["id"];
        if (args["kind"] !== undefined) body["kind"] = args["kind"];
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["payload"] !== undefined) body["payload"] = args["payload"];
        if (args["resourceId"] !== undefined) {
          body["resourceId"] = args["resourceId"];
        }
        if (args["resourceUri"] !== undefined) {
          body["resourceUri"] = args["resourceUri"];
        }
        if (args["token"] !== undefined) body["token"] = args["token"];
        if (args["type"] !== undefined) body["type"] = args["type"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "reports.activities.watch",
            "path":
              "admin/reports/v1/activity/users/{userKey}/applications/{applicationName}/watch",
            "httpMethod": "POST",
            "parameterOrder": ["userKey", "applicationName"],
            "parameters": {
              "actorIpAddress": { "location": "query" },
              "applicationName": { "location": "path", "required": true },
              "customerId": { "location": "query" },
              "endTime": { "location": "query" },
              "eventName": { "location": "query" },
              "filters": { "location": "query" },
              "groupIdFilter": { "location": "query" },
              "maxResults": { "location": "query" },
              "orgUnitID": { "location": "query" },
              "pageToken": { "location": "query" },
              "startTime": { "location": "query" },
              "userKey": { "location": "path", "required": true },
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
