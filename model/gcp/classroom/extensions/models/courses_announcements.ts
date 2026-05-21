// Auto-generated extension model for @swamp/gcp/classroom/courses-announcements
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Classroom Courses.Announcements.
 *
 * Announcement created by a teacher for students of the course
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

const BASE_URL = "https://classroom.googleapis.com/";

const GET_CONFIG = {
  "id": "classroom.courses.announcements.get",
  "path": "v1/courses/{courseId}/announcements/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
    "id",
  ],
  "parameters": {
    "courseId": {
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
  "id": "classroom.courses.announcements.create",
  "path": "v1/courses/{courseId}/announcements",
  "httpMethod": "POST",
  "parameterOrder": [
    "courseId",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "classroom.courses.announcements.patch",
  "path": "v1/courses/{courseId}/announcements/{id}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "courseId",
    "id",
  ],
  "parameters": {
    "courseId": {
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
  "id": "classroom.courses.announcements.delete",
  "path": "v1/courses/{courseId}/announcements/{id}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "courseId",
    "id",
  ],
  "parameters": {
    "courseId": {
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
  "id": "classroom.courses.announcements.list",
  "path": "v1/courses/{courseId}/announcements",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
  ],
  "parameters": {
    "announcementStates": {
      "location": "query",
    },
    "courseId": {
      "location": "path",
      "required": true,
    },
    "orderBy": {
      "location": "query",
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
  alternateLink: z.string().describe(
    "Absolute link to this announcement in the Classroom web UI. This is only populated if `state` is `PUBLISHED`. Read-only.",
  ).optional(),
  assigneeMode: z.enum([
    "ASSIGNEE_MODE_UNSPECIFIED",
    "ALL_STUDENTS",
    "INDIVIDUAL_STUDENTS",
  ]).describe(
    "Assignee mode of the announcement. If unspecified, the default value is `ALL_STUDENTS`.",
  ).optional(),
  courseId: z.string().describe("Identifier of the course. Read-only.")
    .optional(),
  creationTime: z.string().describe(
    "Timestamp when this announcement was created. Read-only.",
  ).optional(),
  creatorUserId: z.string().describe(
    "Identifier for the user that created the announcement. Read-only.",
  ).optional(),
  id: z.string().describe(
    "Classroom-assigned identifier of this announcement, unique per course. Read-only.",
  ).optional(),
  individualStudentsOptions: z.object({
    studentIds: z.array(z.string()).describe(
      "Identifiers for the students that have access to the coursework/announcement.",
    ).optional(),
  }).describe(
    "Assignee details about a coursework/announcement. This field is set if and only if `assigneeMode` is `INDIVIDUAL_STUDENTS`.",
  ).optional(),
  materials: z.array(z.object({
    driveFile: z.object({
      driveFile: z.object({
        alternateLink: z.string().describe(
          "URL that can be used to access the Drive item. Read-only.",
        ).optional(),
        id: z.string().describe("Drive API resource ID.").optional(),
        thumbnailUrl: z.string().describe(
          "URL of a thumbnail image of the Drive item. Read-only.",
        ).optional(),
        title: z.string().describe("Title of the Drive item. Read-only.")
          .optional(),
      }).describe("Representation of a Google Drive file.").optional(),
      shareMode: z.enum(["UNKNOWN_SHARE_MODE", "VIEW", "EDIT", "STUDENT_COPY"])
        .describe("Mechanism by which students access the Drive item.")
        .optional(),
    }).describe("Drive file that is used as material for course work.")
      .optional(),
    form: z.object({
      formUrl: z.string().describe("URL of the form.").optional(),
      responseUrl: z.string().describe(
        "URL of the form responses document. Only set if responses have been recorded and only when the requesting user is an editor of the form. Read-only.",
      ).optional(),
      thumbnailUrl: z.string().describe(
        "URL of a thumbnail image of the Form. Read-only.",
      ).optional(),
      title: z.string().describe("Title of the Form. Read-only.").optional(),
    }).describe("Google Forms item.").optional(),
    gem: z.object({
      id: z.string().describe("Gems resource id.").optional(),
      title: z.string().describe("Title of the Gem.").optional(),
      url: z.string().describe("URL that can be used to access the Gem.")
        .optional(),
    }).describe("Gemini Gem link.").optional(),
    link: z.object({
      thumbnailUrl: z.string().describe(
        "URL of a thumbnail image of the target URL. Read-only.",
      ).optional(),
      title: z.string().describe("Title of the target of the URL. Read-only.")
        .optional(),
      url: z.string().describe(
        "URL to link to. This must be a valid UTF-8 string containing between 1 and 2024 characters.",
      ).optional(),
    }).describe("URL item.").optional(),
    notebook: z.object({
      id: z.string().describe("Notebook resource id.").optional(),
      title: z.string().describe("Title of the Notebook.").optional(),
      url: z.string().describe("URL that can be used to access the Notebook.")
        .optional(),
    }).describe("NotebookLM Notebook link.").optional(),
    youtubeVideo: z.object({
      alternateLink: z.string().describe(
        "URL that can be used to view the YouTube video. Read-only.",
      ).optional(),
      id: z.string().describe("YouTube API resource ID.").optional(),
      thumbnailUrl: z.string().describe(
        "URL of a thumbnail image of the YouTube video. Read-only.",
      ).optional(),
      title: z.string().describe("Title of the YouTube video. Read-only.")
        .optional(),
    }).describe("YouTube video item.").optional(),
  })).describe(
    "Additional materials. Announcements must have no more than 20 material items.",
  ).optional(),
  scheduledTime: z.string().describe(
    "Optional timestamp when this announcement is scheduled to be published.",
  ).optional(),
  state: z.enum([
    "ANNOUNCEMENT_STATE_UNSPECIFIED",
    "PUBLISHED",
    "DRAFT",
    "DELETED",
  ]).describe(
    "Status of this announcement. If unspecified, the default state is `DRAFT`.",
  ).optional(),
  text: z.string().describe(
    "Description of this announcement. The text must be a valid UTF-8 string containing no more than 30,000 characters.",
  ).optional(),
  updateTime: z.string().describe(
    "Timestamp of the most recent change to this announcement. Read-only.",
  ).optional(),
});

const StateSchema = z.object({
  alternateLink: z.string().optional(),
  assigneeMode: z.string().optional(),
  courseId: z.string().optional(),
  creationTime: z.string().optional(),
  creatorUserId: z.string().optional(),
  id: z.string(),
  individualStudentsOptions: z.object({
    studentIds: z.array(z.string()),
  }).optional(),
  materials: z.array(z.object({
    driveFile: z.object({
      driveFile: z.object({
        alternateLink: z.string(),
        id: z.string(),
        thumbnailUrl: z.string(),
        title: z.string(),
      }),
      shareMode: z.string(),
    }),
    form: z.object({
      formUrl: z.string(),
      responseUrl: z.string(),
      thumbnailUrl: z.string(),
      title: z.string(),
    }),
    gem: z.object({
      id: z.string(),
      title: z.string(),
      url: z.string(),
    }),
    link: z.object({
      thumbnailUrl: z.string(),
      title: z.string(),
      url: z.string(),
    }),
    notebook: z.object({
      id: z.string(),
      title: z.string(),
      url: z.string(),
    }),
    youtubeVideo: z.object({
      alternateLink: z.string(),
      id: z.string(),
      thumbnailUrl: z.string(),
      title: z.string(),
    }),
  })).optional(),
  scheduledTime: z.string().optional(),
  state: z.string().optional(),
  text: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  alternateLink: z.string().describe(
    "Absolute link to this announcement in the Classroom web UI. This is only populated if `state` is `PUBLISHED`. Read-only.",
  ).optional(),
  assigneeMode: z.enum([
    "ASSIGNEE_MODE_UNSPECIFIED",
    "ALL_STUDENTS",
    "INDIVIDUAL_STUDENTS",
  ]).describe(
    "Assignee mode of the announcement. If unspecified, the default value is `ALL_STUDENTS`.",
  ).optional(),
  courseId: z.string().describe("Identifier of the course. Read-only.")
    .optional(),
  creationTime: z.string().describe(
    "Timestamp when this announcement was created. Read-only.",
  ).optional(),
  creatorUserId: z.string().describe(
    "Identifier for the user that created the announcement. Read-only.",
  ).optional(),
  id: z.string().describe(
    "Classroom-assigned identifier of this announcement, unique per course. Read-only.",
  ).optional(),
  individualStudentsOptions: z.object({
    studentIds: z.array(z.string()).describe(
      "Identifiers for the students that have access to the coursework/announcement.",
    ).optional(),
  }).describe(
    "Assignee details about a coursework/announcement. This field is set if and only if `assigneeMode` is `INDIVIDUAL_STUDENTS`.",
  ).optional(),
  materials: z.array(z.object({
    driveFile: z.object({
      driveFile: z.object({
        alternateLink: z.string().describe(
          "URL that can be used to access the Drive item. Read-only.",
        ).optional(),
        id: z.string().describe("Drive API resource ID.").optional(),
        thumbnailUrl: z.string().describe(
          "URL of a thumbnail image of the Drive item. Read-only.",
        ).optional(),
        title: z.string().describe("Title of the Drive item. Read-only.")
          .optional(),
      }).describe("Representation of a Google Drive file.").optional(),
      shareMode: z.enum(["UNKNOWN_SHARE_MODE", "VIEW", "EDIT", "STUDENT_COPY"])
        .describe("Mechanism by which students access the Drive item.")
        .optional(),
    }).describe("Drive file that is used as material for course work.")
      .optional(),
    form: z.object({
      formUrl: z.string().describe("URL of the form.").optional(),
      responseUrl: z.string().describe(
        "URL of the form responses document. Only set if responses have been recorded and only when the requesting user is an editor of the form. Read-only.",
      ).optional(),
      thumbnailUrl: z.string().describe(
        "URL of a thumbnail image of the Form. Read-only.",
      ).optional(),
      title: z.string().describe("Title of the Form. Read-only.").optional(),
    }).describe("Google Forms item.").optional(),
    gem: z.object({
      id: z.string().describe("Gems resource id.").optional(),
      title: z.string().describe("Title of the Gem.").optional(),
      url: z.string().describe("URL that can be used to access the Gem.")
        .optional(),
    }).describe("Gemini Gem link.").optional(),
    link: z.object({
      thumbnailUrl: z.string().describe(
        "URL of a thumbnail image of the target URL. Read-only.",
      ).optional(),
      title: z.string().describe("Title of the target of the URL. Read-only.")
        .optional(),
      url: z.string().describe(
        "URL to link to. This must be a valid UTF-8 string containing between 1 and 2024 characters.",
      ).optional(),
    }).describe("URL item.").optional(),
    notebook: z.object({
      id: z.string().describe("Notebook resource id.").optional(),
      title: z.string().describe("Title of the Notebook.").optional(),
      url: z.string().describe("URL that can be used to access the Notebook.")
        .optional(),
    }).describe("NotebookLM Notebook link.").optional(),
    youtubeVideo: z.object({
      alternateLink: z.string().describe(
        "URL that can be used to view the YouTube video. Read-only.",
      ).optional(),
      id: z.string().describe("YouTube API resource ID.").optional(),
      thumbnailUrl: z.string().describe(
        "URL of a thumbnail image of the YouTube video. Read-only.",
      ).optional(),
      title: z.string().describe("Title of the YouTube video. Read-only.")
        .optional(),
    }).describe("YouTube video item.").optional(),
  })).describe(
    "Additional materials. Announcements must have no more than 20 material items.",
  ).optional(),
  scheduledTime: z.string().describe(
    "Optional timestamp when this announcement is scheduled to be published.",
  ).optional(),
  state: z.enum([
    "ANNOUNCEMENT_STATE_UNSPECIFIED",
    "PUBLISHED",
    "DRAFT",
    "DELETED",
  ]).describe(
    "Status of this announcement. If unspecified, the default state is `DRAFT`.",
  ).optional(),
  text: z.string().describe(
    "Description of this announcement. The text must be a valid UTF-8 string containing no more than 30,000 characters.",
  ).optional(),
  updateTime: z.string().describe(
    "Timestamp of the most recent change to this announcement. Read-only.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Classroom Courses.Announcements. Registered at `@swamp/gcp/classroom/courses-announcements`. */
export const model = {
  type: "@swamp/gcp/classroom/courses-announcements",
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
      description:
        "Announcement created by a teacher for students of the course",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a announcements",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["alternateLink"] !== undefined) {
          body["alternateLink"] = g["alternateLink"];
        }
        if (g["assigneeMode"] !== undefined) {
          body["assigneeMode"] = g["assigneeMode"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["creatorUserId"] !== undefined) {
          body["creatorUserId"] = g["creatorUserId"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["individualStudentsOptions"] !== undefined) {
          body["individualStudentsOptions"] = g["individualStudentsOptions"];
        }
        if (g["materials"] !== undefined) body["materials"] = g["materials"];
        if (g["scheduledTime"] !== undefined) {
          body["scheduledTime"] = g["scheduledTime"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["text"] !== undefined) body["text"] = g["text"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
            listParams: { "courseId": String(g["courseId"] ?? "") },
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
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
      description: "Get a announcements",
      arguments: z.object({
        identifier: z.string().describe("The id of the announcements"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
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
      description: "Update announcements attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["id"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["alternateLink"] !== undefined) {
          body["alternateLink"] = g["alternateLink"];
        }
        if (g["assigneeMode"] !== undefined) {
          body["assigneeMode"] = g["assigneeMode"];
        }
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["creatorUserId"] !== undefined) {
          body["creatorUserId"] = g["creatorUserId"];
        }
        if (g["individualStudentsOptions"] !== undefined) {
          body["individualStudentsOptions"] = g["individualStudentsOptions"];
        }
        if (g["materials"] !== undefined) body["materials"] = g["materials"];
        if (g["scheduledTime"] !== undefined) {
          body["scheduledTime"] = g["scheduledTime"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["text"] !== undefined) body["text"] = g["text"];
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
    delete: {
      description: "Delete the announcements",
      arguments: z.object({
        identifier: z.string().describe("The id of the announcements"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        params["id"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
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
      description: "Sync announcements state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
    get_add_on_context: {
      description: "get add on context",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.id?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["itemId"] = existing["id"]?.toString() ?? g["id"]?.toString() ??
          "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "classroom.courses.announcements.getAddOnContext",
            "path": "v1/courses/{courseId}/announcements/{itemId}/addOnContext",
            "httpMethod": "GET",
            "parameterOrder": ["courseId", "itemId"],
            "parameters": {
              "addOnToken": { "location": "query" },
              "attachmentId": { "location": "query" },
              "courseId": { "location": "path", "required": true },
              "itemId": { "location": "path", "required": true },
              "postId": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    modify_assignees: {
      description: "modify assignees",
      arguments: z.object({
        assigneeMode: z.any().optional(),
        modifyIndividualStudentsOptions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const body: Record<string, unknown> = {};
        if (args["assigneeMode"] !== undefined) {
          body["assigneeMode"] = args["assigneeMode"];
        }
        if (args["modifyIndividualStudentsOptions"] !== undefined) {
          body["modifyIndividualStudentsOptions"] =
            args["modifyIndividualStudentsOptions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "classroom.courses.announcements.modifyAssignees",
            "path": "v1/courses/{courseId}/announcements/{id}:modifyAssignees",
            "httpMethod": "POST",
            "parameterOrder": ["courseId", "id"],
            "parameters": {
              "courseId": { "location": "path", "required": true },
              "id": { "location": "path", "required": true },
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
