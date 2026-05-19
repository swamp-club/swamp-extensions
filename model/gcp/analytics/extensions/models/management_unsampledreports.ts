// Auto-generated extension model for @swamp/gcp/analytics/management-unsampledreports
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Analytics Management.UnsampledReports.
 *
 * JSON template for Analytics unsampled report resource.
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

const BASE_URL = "https://www.googleapis.com/analytics/v3/";

const GET_CONFIG = {
  "id": "analytics.management.unsampledReports.get",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports/{unsampledReportId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
    "unsampledReportId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "unsampledReportId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "analytics.management.unsampledReports.insert",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports",
  "httpMethod": "POST",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "analytics.management.unsampledReports.delete",
  "path":
    "management/accounts/{accountId}/webproperties/{webPropertyId}/profiles/{profileId}/unsampledReports/{unsampledReportId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "accountId",
    "webPropertyId",
    "profileId",
    "unsampledReportId",
  ],
  "parameters": {
    "accountId": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "unsampledReportId": {
      "location": "path",
      "required": true,
    },
    "webPropertyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  accountId: z.string().describe(
    "Account ID to which this unsampled report belongs.",
  ).optional(),
  cloudStorageDownloadDetails: z.object({
    bucketId: z.string().describe(
      "Id of the bucket the file object is stored in.",
    ).optional(),
    objectId: z.string().describe(
      "Id of the file object containing the report data.",
    ).optional(),
  }).describe("Download details for a file stored in Google Cloud Storage.")
    .optional(),
  created: z.string().describe("Time this unsampled report was created.")
    .optional(),
  dimensions: z.string().describe("The dimensions for the unsampled report.")
    .optional(),
  downloadType: z.string().describe(
    "The type of download you need to use for the report data file. Possible values include `GOOGLE_DRIVE` and `GOOGLE_CLOUD_STORAGE`. If the value is `GOOGLE_DRIVE`, see the `driveDownloadDetails` field. If the value is `GOOGLE_CLOUD_STORAGE`, see the `cloudStorageDownloadDetails` field.",
  ).optional(),
  driveDownloadDetails: z.object({
    documentId: z.string().describe(
      "Id of the document/file containing the report data.",
    ).optional(),
  }).describe("Download details for a file stored in Google Drive.").optional(),
  end_date: z.string().describe("The end date for the unsampled report.")
    .optional(),
  filters: z.string().describe("The filters for the unsampled report.")
    .optional(),
  id: z.string().describe("Unsampled report ID.").optional(),
  metrics: z.string().describe("The metrics for the unsampled report."),
  profileId: z.string().describe(
    "View (Profile) ID to which this unsampled report belongs.",
  ).optional(),
  segment: z.string().describe("The segment for the unsampled report.")
    .optional(),
  start_date: z.string().describe("The start date for the unsampled report.")
    .optional(),
  status: z.string().describe(
    "Status of this unsampled report. Possible values are PENDING, COMPLETED, or FAILED.",
  ).optional(),
  title: z.string().describe("Title of the unsampled report."),
  updated: z.string().describe("Time this unsampled report was last modified.")
    .optional(),
  webPropertyId: z.string().describe(
    "Web property ID to which this unsampled report belongs. The web property ID is of the form UA-XXXXX-YY.",
  ).optional(),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  cloudStorageDownloadDetails: z.object({
    bucketId: z.string(),
    objectId: z.string(),
  }).optional(),
  created: z.string().optional(),
  dimensions: z.string().optional(),
  downloadType: z.string().optional(),
  driveDownloadDetails: z.object({
    documentId: z.string(),
  }).optional(),
  end_date: z.string().optional(),
  filters: z.string().optional(),
  id: z.string().optional(),
  kind: z.string().optional(),
  metrics: z.string().optional(),
  profileId: z.string().optional(),
  segment: z.string().optional(),
  selfLink: z.string().optional(),
  start_date: z.string().optional(),
  status: z.string().optional(),
  title: z.string().optional(),
  updated: z.string().optional(),
  webPropertyId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accountId: z.string().describe(
    "Account ID to which this unsampled report belongs.",
  ).optional(),
  cloudStorageDownloadDetails: z.object({
    bucketId: z.string().describe(
      "Id of the bucket the file object is stored in.",
    ).optional(),
    objectId: z.string().describe(
      "Id of the file object containing the report data.",
    ).optional(),
  }).describe("Download details for a file stored in Google Cloud Storage.")
    .optional(),
  created: z.string().describe("Time this unsampled report was created.")
    .optional(),
  dimensions: z.string().describe("The dimensions for the unsampled report.")
    .optional(),
  downloadType: z.string().describe(
    "The type of download you need to use for the report data file. Possible values include `GOOGLE_DRIVE` and `GOOGLE_CLOUD_STORAGE`. If the value is `GOOGLE_DRIVE`, see the `driveDownloadDetails` field. If the value is `GOOGLE_CLOUD_STORAGE`, see the `cloudStorageDownloadDetails` field.",
  ).optional(),
  driveDownloadDetails: z.object({
    documentId: z.string().describe(
      "Id of the document/file containing the report data.",
    ).optional(),
  }).describe("Download details for a file stored in Google Drive.").optional(),
  end_date: z.string().describe("The end date for the unsampled report.")
    .optional(),
  filters: z.string().describe("The filters for the unsampled report.")
    .optional(),
  id: z.string().describe("Unsampled report ID.").optional(),
  metrics: z.string().describe("The metrics for the unsampled report.")
    .optional(),
  profileId: z.string().describe(
    "View (Profile) ID to which this unsampled report belongs.",
  ).optional(),
  segment: z.string().describe("The segment for the unsampled report.")
    .optional(),
  start_date: z.string().describe("The start date for the unsampled report.")
    .optional(),
  status: z.string().describe(
    "Status of this unsampled report. Possible values are PENDING, COMPLETED, or FAILED.",
  ).optional(),
  title: z.string().describe("Title of the unsampled report.").optional(),
  updated: z.string().describe("Time this unsampled report was last modified.")
    .optional(),
  webPropertyId: z.string().describe(
    "Web property ID to which this unsampled report belongs. The web property ID is of the form UA-XXXXX-YY.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Analytics Management.UnsampledReports. Registered at `@swamp/gcp/analytics/management-unsampledreports`. */
export const model = {
  type: "@swamp/gcp/analytics/management-unsampledreports",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "JSON template for Analytics unsampled report resource.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a unsampledReports",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["cloudStorageDownloadDetails"] !== undefined) {
          body["cloudStorageDownloadDetails"] =
            g["cloudStorageDownloadDetails"];
        }
        if (g["created"] !== undefined) body["created"] = g["created"];
        if (g["dimensions"] !== undefined) body["dimensions"] = g["dimensions"];
        if (g["downloadType"] !== undefined) {
          body["downloadType"] = g["downloadType"];
        }
        if (g["driveDownloadDetails"] !== undefined) {
          body["driveDownloadDetails"] = g["driveDownloadDetails"];
        }
        if (g["end_date"] !== undefined) body["end_date"] = g["end_date"];
        if (g["filters"] !== undefined) body["filters"] = g["filters"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["metrics"] !== undefined) body["metrics"] = g["metrics"];
        if (g["segment"] !== undefined) body["segment"] = g["segment"];
        if (g["start_date"] !== undefined) body["start_date"] = g["start_date"];
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["updated"] !== undefined) body["updated"] = g["updated"];
        if (g["name"] !== undefined) {
          params["unsampledReportId"] = String(g["name"]);
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a unsampledReports",
      arguments: z.object({
        identifier: z.string().describe("The name of the unsampledReports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["unsampledReportId"] = args.identifier;
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
    delete: {
      description: "Delete the unsampledReports",
      arguments: z.object({
        identifier: z.string().describe("The name of the unsampledReports"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["accountId"] !== undefined) {
          params["accountId"] = String(g["accountId"]);
        }
        if (g["webPropertyId"] !== undefined) {
          params["webPropertyId"] = String(g["webPropertyId"]);
        }
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["unsampledReportId"] = args.identifier;
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
      description: "Sync unsampledReports state from GCP",
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
          if (g["accountId"] !== undefined) {
            params["accountId"] = String(g["accountId"]);
          } else if (existing["accountId"]) {
            params["accountId"] = String(existing["accountId"]);
          }
          if (g["webPropertyId"] !== undefined) {
            params["webPropertyId"] = String(g["webPropertyId"]);
          } else if (existing["webPropertyId"]) {
            params["webPropertyId"] = String(existing["webPropertyId"]);
          }
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["unsampledReportId"] = identifier;
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
