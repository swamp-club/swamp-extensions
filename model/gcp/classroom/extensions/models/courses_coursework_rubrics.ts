// Auto-generated extension model for @swamp/gcp/classroom/courses-coursework-rubrics
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Classroom Courses.CourseWork.Rubrics.
 *
 * The rubric of the course work. A rubric is a scoring guide used to evaluate student work and give feedback. For further details, see [Rubrics structure and known limitations](/classroom/rubrics/limitations).
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://classroom.googleapis.com/";

const GET_CONFIG = {
  "id": "classroom.courses.courseWork.rubrics.get",
  "path": "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
    "courseWorkId",
    "id",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "courseWorkId": {
      "location": "path",
      "required": true,
    },
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "classroom.courses.courseWork.rubrics.create",
  "path": "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics",
  "httpMethod": "POST",
  "parameterOrder": [
    "courseId",
    "courseWorkId",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "courseWorkId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "classroom.courses.courseWork.rubrics.patch",
  "path": "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics/{id}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "courseId",
    "courseWorkId",
    "id",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "courseWorkId": {
      "location": "path",
      "required": true,
    },
    "id": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "classroom.courses.courseWork.rubrics.delete",
  "path": "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics/{id}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "courseId",
    "courseWorkId",
    "id",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "courseWorkId": {
      "location": "path",
      "required": true,
    },
    "id": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "classroom.courses.courseWork.rubrics.list",
  "path": "v1/courses/{courseId}/courseWork/{courseWorkId}/rubrics",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
    "courseWorkId",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "courseWorkId": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  courseId: z.string().describe("Identifier of the course. Read-only.")
    .optional(),
  courseWorkId: z.string().describe(
    "Identifier for the course work this corresponds to. Read-only.",
  ).optional(),
  criteria: z.array(z.object({
    description: z.string().describe("The description of the criterion.")
      .optional(),
    id: z.string().describe("The criterion ID. On creation, an ID is assigned.")
      .optional(),
    levels: z.array(z.object({
      description: z.string().describe("The description of the level.")
        .optional(),
      id: z.string().describe("The level ID. On creation, an ID is assigned.")
        .optional(),
      points: z.number().describe(
        "Optional points associated with this level. If set, all levels within the rubric must specify points and the value must be distinct across all levels within a single criterion. 0 is distinct from no points.",
      ).optional(),
      title: z.string().describe(
        "The title of the level. If the level has no points set, title must be set.",
      ).optional(),
    })).describe("The list of levels within this criterion.").optional(),
    title: z.string().describe("The title of the criterion.").optional(),
  })).describe(
    "List of criteria. Each criterion is a dimension on which performance is rated.",
  ).optional(),
  id: z.string().describe(
    "Classroom-assigned identifier for the rubric. This is unique among rubrics for the relevant course work. Read-only.",
  ).optional(),
  sourceSpreadsheetId: z.string().describe(
    "Input only. Immutable. Google Sheets ID of the spreadsheet. This spreadsheet must contain formatted rubric settings. See [Create or reuse a rubric for an assignment](https://support.google.com/edu/classroom/answer/9335069). Use of this field requires the `https://www.googleapis.com/auth/spreadsheets.readonly` or `https://www.googleapis.com/auth/spreadsheets` scope.",
  ).optional(),
});

const StateSchema = z.object({
  courseId: z.string().optional(),
  courseWorkId: z.string().optional(),
  creationTime: z.string().optional(),
  criteria: z.array(z.object({
    description: z.string(),
    id: z.string(),
    levels: z.array(z.object({
      description: z.string(),
      id: z.string(),
      points: z.number(),
      title: z.string(),
    })),
    title: z.string(),
  })).optional(),
  id: z.string(),
  sourceSpreadsheetId: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  courseId: z.string().describe("Identifier of the course. Read-only.")
    .optional(),
  courseWorkId: z.string().describe(
    "Identifier for the course work this corresponds to. Read-only.",
  ).optional(),
  criteria: z.array(z.object({
    description: z.string().describe("The description of the criterion.")
      .optional(),
    id: z.string().describe("The criterion ID. On creation, an ID is assigned.")
      .optional(),
    levels: z.array(z.object({
      description: z.string().describe("The description of the level.")
        .optional(),
      id: z.string().describe("The level ID. On creation, an ID is assigned.")
        .optional(),
      points: z.number().describe(
        "Optional points associated with this level. If set, all levels within the rubric must specify points and the value must be distinct across all levels within a single criterion. 0 is distinct from no points.",
      ).optional(),
      title: z.string().describe(
        "The title of the level. If the level has no points set, title must be set.",
      ).optional(),
    })).describe("The list of levels within this criterion.").optional(),
    title: z.string().describe("The title of the criterion.").optional(),
  })).describe(
    "List of criteria. Each criterion is a dimension on which performance is rated.",
  ).optional(),
  id: z.string().describe(
    "Classroom-assigned identifier for the rubric. This is unique among rubrics for the relevant course work. Read-only.",
  ).optional(),
  sourceSpreadsheetId: z.string().describe(
    "Input only. Immutable. Google Sheets ID of the spreadsheet. This spreadsheet must contain formatted rubric settings. See [Create or reuse a rubric for an assignment](https://support.google.com/edu/classroom/answer/9335069). Use of this field requires the `https://www.googleapis.com/auth/spreadsheets.readonly` or `https://www.googleapis.com/auth/spreadsheets` scope.",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Google Classroom Courses.CourseWork.Rubrics. Registered at `@swamp/gcp/classroom/courses-coursework-rubrics`. */
export const model = {
  type: "@swamp/gcp/classroom/courses-coursework-rubrics",
  version: "2026.06.07.1",
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
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "The rubric of the course work. A rubric is a scoring guide used to evaluate s...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a rubrics",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["criteria"] !== undefined) body["criteria"] = g["criteria"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["sourceSpreadsheetId"] !== undefined) {
          body["sourceSpreadsheetId"] = g["sourceSpreadsheetId"];
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
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
              "courseId": String(g["courseId"] ?? ""),
              "courseWorkId": String(g["courseWorkId"] ?? ""),
            },
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
          credentials,
        ) as StateData;
        const instanceName = ((result.id ?? g.id)?.toString() ?? "current")
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
      description: "Get a rubrics",
      arguments: z.object({
        identifier: z.string().describe("The id of the rubrics"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.id ?? g.id)?.toString() ?? args.identifier).replace(
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
      description: "Update rubrics attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName = (g.id?.toString() ?? "current").replace(
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
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        } else if (existing["courseId"]) {
          params["courseId"] = String(existing["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        } else if (existing["courseWorkId"]) {
          params["courseWorkId"] = String(existing["courseWorkId"]);
        }
        params["id"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["criteria"] !== undefined) body["criteria"] = g["criteria"];
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
          undefined,
          credentials,
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
      description: "Delete the rubrics",
      arguments: z.object({
        identifier: z.string().describe("The id of the rubrics"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        }
        params["id"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
        );
        const instanceName = (g.id?.toString() ?? args.identifier).replace(
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
      description: "Sync rubrics state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName = (g.id?.toString() ?? "current").replace(
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
          if (g["courseId"] !== undefined) {
            params["courseId"] = String(g["courseId"]);
          } else if (existing["courseId"]) {
            params["courseId"] = String(existing["courseId"]);
          }
          if (g["courseWorkId"] !== undefined) {
            params["courseWorkId"] = String(g["courseWorkId"]);
          } else if (existing["courseWorkId"]) {
            params["courseWorkId"] = String(existing["courseWorkId"]);
          }
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
          const result = await readResource(
            BASE_URL,
            GET_CONFIG,
            params,
            credentials,
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
      description: "List rubrics resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of rubrics to return. If unspecified, at most 1 rubric is returned. The maximum value is 1; values above 1 are coerced to 1.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["courseWorkId"] !== undefined) {
          params["courseWorkId"] = String(g["courseWorkId"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "rubrics",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
