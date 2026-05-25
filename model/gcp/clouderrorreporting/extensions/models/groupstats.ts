// Auto-generated extension model for @swamp/gcp/clouderrorreporting/groupstats
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Error Reporting GroupStats.
 *
 * Data extracted for a specific group based on certain filter criteria, such as a given time period and/or service filter.
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
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://clouderrorreporting.googleapis.com/";

const LIST_CONFIG = {
  "id": "clouderrorreporting.projects.groupStats.list",
  "path": "v1beta1/{+projectName}/groupStats",
  "httpMethod": "GET",
  "parameterOrder": [
    "projectName",
  ],
  "parameters": {
    "alignment": {
      "location": "query",
    },
    "alignmentTime": {
      "location": "query",
    },
    "groupId": {
      "location": "query",
    },
    "order": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "projectName": {
      "location": "path",
      "required": true,
    },
    "serviceFilter.resourceType": {
      "location": "query",
    },
    "serviceFilter.service": {
      "location": "query",
    },
    "serviceFilter.version": {
      "location": "query",
    },
    "timeRange.period": {
      "location": "query",
    },
    "timedCountDuration": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  affectedServices: z.array(z.object({
    resourceType: z.string(),
    service: z.string(),
    version: z.string(),
  })).optional(),
  affectedUsersCount: z.string().optional(),
  count: z.string().optional(),
  firstSeenTime: z.string().optional(),
  group: z.object({
    groupId: z.string(),
    name: z.string(),
    resolutionStatus: z.string(),
    trackingIssues: z.array(z.object({
      url: z.string(),
    })),
  }).optional(),
  lastSeenTime: z.string().optional(),
  numAffectedServices: z.number().optional(),
  representative: z.object({
    context: z.object({
      httpRequest: z.object({
        method: z.string(),
        referrer: z.string(),
        remoteIp: z.string(),
        responseStatusCode: z.number(),
        url: z.string(),
        userAgent: z.string(),
      }),
      reportLocation: z.object({
        filePath: z.string(),
        functionName: z.string(),
        lineNumber: z.number(),
      }),
      sourceReferences: z.array(z.object({
        repository: z.string(),
        revisionId: z.string(),
      })),
      user: z.string(),
    }),
    eventTime: z.string(),
    message: z.string(),
    serviceContext: z.object({
      resourceType: z.string(),
      service: z.string(),
      version: z.string(),
    }),
  }).optional(),
  timedCounts: z.array(z.object({
    count: z.string(),
    endTime: z.string(),
    startTime: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Error Reporting GroupStats. Registered at `@swamp/gcp/clouderrorreporting/groupstats`. */
export const model = {
  type: "@swamp/gcp/clouderrorreporting/groupstats",
  version: "2026.05.25.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Data extracted for a specific group based on certain filter criteria, such as...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a groupStats",
      arguments: z.object({
        identifier: z.string().describe("The name of the groupStats"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["projectName"] !== undefined) {
          params["projectName"] = String(g["projectName"]);
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
      description: "Sync groupStats state from GCP",
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
          if (g["projectName"] !== undefined) {
            params["projectName"] = String(g["projectName"]);
          } else if (existing["projectName"]) {
            params["projectName"] = String(existing["projectName"]);
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
    list: {
      description: "List groupStats resources",
      arguments: z.object({
        alignment: z.string().describe(
          "Optional. The alignment of the timed counts to be returned. Default is `ALIGNMENT_EQUAL_AT_END`.",
        ).optional(),
        alignmentTime: z.string().describe(
          "Optional. Time where the timed counts shall be aligned if rounded alignment is chosen. Default is 00:00 UTC.",
        ).optional(),
        groupId: z.string().describe(
          "Optional. List all ErrorGroupStats with these IDs. The `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice] (https://cloud.google.com/terms/cloud-privacy-notice).",
        ).optional(),
        order: z.string().describe(
          "Optional. The sort order in which the results are returned. Default is `COUNT_DESC`.",
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of results to return per response. Default is 20.",
        ).optional(),
        serviceFilter_resourceType: z.string().describe(
          "Optional. The exact value to match against [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type).",
        ).optional(),
        serviceFilter_service: z.string().describe(
          "Optional. The exact value to match against [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service).",
        ).optional(),
        serviceFilter_version: z.string().describe(
          "Optional. The exact value to match against [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version).",
        ).optional(),
        timeRange_period: z.string().describe(
          "Restricts the query to the specified time range.",
        ).optional(),
        timedCountDuration: z.string().describe(
          "Optional. The preferred duration for a single returned TimedCount. If not set, no timed counts are returned.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["projectName"] !== undefined) {
          params["projectName"] = String(g["projectName"]);
        }
        if (args["alignment"] !== undefined) {
          params["alignment"] = String(args["alignment"]);
        }
        if (args["alignmentTime"] !== undefined) {
          params["alignmentTime"] = String(args["alignmentTime"]);
        }
        if (args["groupId"] !== undefined) {
          params["groupId"] = String(args["groupId"]);
        }
        if (args["order"] !== undefined) {
          params["order"] = String(args["order"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        if (args["serviceFilter_resourceType"] !== undefined) {
          params["serviceFilter.resourceType"] = String(
            args["serviceFilter_resourceType"],
          );
        }
        if (args["serviceFilter_service"] !== undefined) {
          params["serviceFilter.service"] = String(
            args["serviceFilter_service"],
          );
        }
        if (args["serviceFilter_version"] !== undefined) {
          params["serviceFilter.version"] = String(
            args["serviceFilter_version"],
          );
        }
        if (args["timeRange_period"] !== undefined) {
          params["timeRange.period"] = String(args["timeRange_period"]);
        }
        if (args["timedCountDuration"] !== undefined) {
          params["timedCountDuration"] = String(args["timedCountDuration"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "errorGroupStats",
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
  },
};
