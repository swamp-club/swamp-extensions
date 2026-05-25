// Auto-generated extension model for @swamp/gcp/classroom/courses-posts-addonattachments
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Classroom Courses.Posts.AddOnAttachments.
 *
 * An add-on attachment on a post.
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://classroom.googleapis.com/";

const GET_CONFIG = {
  "id": "classroom.courses.posts.addOnAttachments.get",
  "path":
    "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
    "postId",
    "attachmentId",
  ],
  "parameters": {
    "attachmentId": {
      "location": "path",
      "required": true,
    },
    "courseId": {
      "location": "path",
      "required": true,
    },
    "itemId": {
      "location": "query",
    },
    "postId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "classroom.courses.posts.addOnAttachments.create",
  "path": "v1/courses/{courseId}/posts/{postId}/addOnAttachments",
  "httpMethod": "POST",
  "parameterOrder": [
    "courseId",
    "postId",
  ],
  "parameters": {
    "addOnToken": {
      "location": "query",
    },
    "courseId": {
      "location": "path",
      "required": true,
    },
    "itemId": {
      "location": "query",
    },
    "postId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "classroom.courses.posts.addOnAttachments.patch",
  "path":
    "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "courseId",
    "postId",
    "attachmentId",
  ],
  "parameters": {
    "attachmentId": {
      "location": "path",
      "required": true,
    },
    "courseId": {
      "location": "path",
      "required": true,
    },
    "itemId": {
      "location": "query",
    },
    "postId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "classroom.courses.posts.addOnAttachments.delete",
  "path":
    "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "courseId",
    "postId",
    "attachmentId",
  ],
  "parameters": {
    "attachmentId": {
      "location": "path",
      "required": true,
    },
    "courseId": {
      "location": "path",
      "required": true,
    },
    "itemId": {
      "location": "query",
    },
    "postId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "classroom.courses.posts.addOnAttachments.list",
  "path": "v1/courses/{courseId}/posts/{postId}/addOnAttachments",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
    "postId",
  ],
  "parameters": {
    "courseId": {
      "location": "path",
      "required": true,
    },
    "itemId": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "postId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  courseId: z.string().describe("Immutable. Identifier of the course.")
    .optional(),
  dueDate: z.object({
    day: z.number().int().describe(
      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
    ).optional(),
    month: z.number().int().describe(
      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
    ).optional(),
    year: z.number().int().describe(
      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
    ).optional(),
  }).describe(
    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
  ).optional(),
  dueTime: z.object({
    hours: z.number().int().describe(
      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
    ).optional(),
    minutes: z.number().int().describe(
      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
    ).optional(),
    nanos: z.number().int().describe(
      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
    ).optional(),
    seconds: z.number().int().describe(
      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
    ).optional(),
  }).describe(
    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
  ).optional(),
  id: z.string().describe(
    "Immutable. Classroom-assigned identifier for this attachment, unique per post.",
  ).optional(),
  itemId: z.string().describe(
    "Immutable. Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. Unique per course.",
  ).optional(),
  maxPoints: z.number().describe(
    "Maximum grade for this attachment. Can only be set if `studentWorkReviewUri` is set. Set to a non-zero value to indicate that the attachment supports grade passback. If set, this must be a non-negative integer value. When set to zero, the attachment will not support grade passback.",
  ).optional(),
  studentViewUri: z.object({
    uri: z.string().describe(
      "Required. URI to be iframed after being populated with query parameters. This must be a valid UTF-8 string containing between 1 and 1800 characters.",
    ).optional(),
  }).describe("URI to be iframed after being populated with query parameters.")
    .optional(),
  studentWorkReviewUri: z.object({
    uri: z.string().describe(
      "Required. URI to be iframed after being populated with query parameters. This must be a valid UTF-8 string containing between 1 and 1800 characters.",
    ).optional(),
  }).describe("URI to be iframed after being populated with query parameters.")
    .optional(),
  teacherViewUri: z.object({
    uri: z.string().describe(
      "Required. URI to be iframed after being populated with query parameters. This must be a valid UTF-8 string containing between 1 and 1800 characters.",
    ).optional(),
  }).describe("URI to be iframed after being populated with query parameters.")
    .optional(),
  title: z.string().describe(
    "Required. Title of this attachment. The title must be between 1 and 1000 characters.",
  ).optional(),
  addOnToken: z.string().describe(
    "Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. This authorization token is required for in-Classroom attachment creation but optional for partner-first attachment creation. Returns an error if not provided for partner-first attachment creation and the developer projects that created the attachment and its parent stream item do not match.",
  ).optional(),
});

const StateSchema = z.object({
  copyHistory: z.array(z.object({
    attachmentId: z.string(),
    courseId: z.string(),
    itemId: z.string(),
    postId: z.string(),
  })).optional(),
  courseId: z.string().optional(),
  dueDate: z.object({
    day: z.number(),
    month: z.number(),
    year: z.number(),
  }).optional(),
  dueTime: z.object({
    hours: z.number(),
    minutes: z.number(),
    nanos: z.number(),
    seconds: z.number(),
  }).optional(),
  id: z.string().optional(),
  itemId: z.string().optional(),
  maxPoints: z.number().optional(),
  postId: z.string().optional(),
  studentViewUri: z.object({
    uri: z.string(),
  }).optional(),
  studentWorkReviewUri: z.object({
    uri: z.string(),
  }).optional(),
  teacherViewUri: z.object({
    uri: z.string(),
  }).optional(),
  title: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  courseId: z.string().describe("Immutable. Identifier of the course.")
    .optional(),
  dueDate: z.object({
    day: z.number().int().describe(
      "Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant.",
    ).optional(),
    month: z.number().int().describe(
      "Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day.",
    ).optional(),
    year: z.number().int().describe(
      "Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year.",
    ).optional(),
  }).describe(
    "Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: * A full date, with non-zero year, month, and day values. * A month and day, with a zero year (for example, an anniversary). * A year on its own, with a zero month and a zero day. * A year and month, with a zero day (for example, a credit card expiration date). Related types: * google.type.TimeOfDay * google.type.DateTime * google.protobuf.Timestamp",
  ).optional(),
  dueTime: z.object({
    hours: z.number().int().describe(
      'Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time.',
    ).optional(),
    minutes: z.number().int().describe(
      "Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59.",
    ).optional(),
    nanos: z.number().int().describe(
      "Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999.",
    ).optional(),
    seconds: z.number().int().describe(
      "Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds.",
    ).optional(),
  }).describe(
    "Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.",
  ).optional(),
  id: z.string().describe(
    "Immutable. Classroom-assigned identifier for this attachment, unique per post.",
  ).optional(),
  itemId: z.string().describe(
    "Immutable. Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` under which the attachment is attached. Unique per course.",
  ).optional(),
  maxPoints: z.number().describe(
    "Maximum grade for this attachment. Can only be set if `studentWorkReviewUri` is set. Set to a non-zero value to indicate that the attachment supports grade passback. If set, this must be a non-negative integer value. When set to zero, the attachment will not support grade passback.",
  ).optional(),
  studentViewUri: z.object({
    uri: z.string().describe(
      "Required. URI to be iframed after being populated with query parameters. This must be a valid UTF-8 string containing between 1 and 1800 characters.",
    ).optional(),
  }).describe("URI to be iframed after being populated with query parameters.")
    .optional(),
  studentWorkReviewUri: z.object({
    uri: z.string().describe(
      "Required. URI to be iframed after being populated with query parameters. This must be a valid UTF-8 string containing between 1 and 1800 characters.",
    ).optional(),
  }).describe("URI to be iframed after being populated with query parameters.")
    .optional(),
  teacherViewUri: z.object({
    uri: z.string().describe(
      "Required. URI to be iframed after being populated with query parameters. This must be a valid UTF-8 string containing between 1 and 1800 characters.",
    ).optional(),
  }).describe("URI to be iframed after being populated with query parameters.")
    .optional(),
  title: z.string().describe(
    "Required. Title of this attachment. The title must be between 1 and 1000 characters.",
  ).optional(),
  addOnToken: z.string().describe(
    "Optional. Token that authorizes the request. The token is passed as a query parameter when the user is redirected from Classroom to the add-on's URL. This authorization token is required for in-Classroom attachment creation but optional for partner-first attachment creation. Returns an error if not provided for partner-first attachment creation and the developer projects that created the attachment and its parent stream item do not match.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Classroom Courses.Posts.AddOnAttachments. Registered at `@swamp/gcp/classroom/courses-posts-addonattachments`. */
export const model = {
  type: "@swamp/gcp/classroom/courses-posts-addonattachments",
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
      description: "An add-on attachment on a post.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a addOnAttachments",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["postId"] !== undefined) params["postId"] = String(g["postId"]);
        const body: Record<string, unknown> = {};
        if (g["dueDate"] !== undefined) body["dueDate"] = g["dueDate"];
        if (g["dueTime"] !== undefined) body["dueTime"] = g["dueTime"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["itemId"] !== undefined) body["itemId"] = g["itemId"];
        if (g["maxPoints"] !== undefined) body["maxPoints"] = g["maxPoints"];
        if (g["studentViewUri"] !== undefined) {
          body["studentViewUri"] = g["studentViewUri"];
        }
        if (g["studentWorkReviewUri"] !== undefined) {
          body["studentWorkReviewUri"] = g["studentWorkReviewUri"];
        }
        if (g["teacherViewUri"] !== undefined) {
          body["teacherViewUri"] = g["teacherViewUri"];
        }
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["addOnToken"] !== undefined) body["addOnToken"] = g["addOnToken"];
        if (g["name"] !== undefined) params["attachmentId"] = String(g["name"]);
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
              "postId": String(g["postId"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
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
      description: "Get a addOnAttachments",
      arguments: z.object({
        identifier: z.string().describe("The name of the addOnAttachments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["postId"] !== undefined) params["postId"] = String(g["postId"]);
        params["attachmentId"] = args.identifier;
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
    update: {
      description: "Update addOnAttachments attributes",
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
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        } else if (existing["courseId"]) {
          params["courseId"] = String(existing["courseId"]);
        }
        if (g["postId"] !== undefined) params["postId"] = String(g["postId"]);
        else if (existing["postId"]) {
          params["postId"] = String(existing["postId"]);
        }
        params["attachmentId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["dueDate"] !== undefined) body["dueDate"] = g["dueDate"];
        if (g["dueTime"] !== undefined) body["dueTime"] = g["dueTime"];
        if (g["maxPoints"] !== undefined) body["maxPoints"] = g["maxPoints"];
        if (g["studentViewUri"] !== undefined) {
          body["studentViewUri"] = g["studentViewUri"];
        }
        if (g["studentWorkReviewUri"] !== undefined) {
          body["studentWorkReviewUri"] = g["studentWorkReviewUri"];
        }
        if (g["teacherViewUri"] !== undefined) {
          body["teacherViewUri"] = g["teacherViewUri"];
        }
        if (g["title"] !== undefined) body["title"] = g["title"];
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
      description: "Delete the addOnAttachments",
      arguments: z.object({
        identifier: z.string().describe("The name of the addOnAttachments"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["postId"] !== undefined) params["postId"] = String(g["postId"]);
        params["attachmentId"] = args.identifier;
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
      description: "Sync addOnAttachments state from GCP",
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
          if (g["courseId"] !== undefined) {
            params["courseId"] = String(g["courseId"]);
          } else if (existing["courseId"]) {
            params["courseId"] = String(existing["courseId"]);
          }
          if (g["postId"] !== undefined) params["postId"] = String(g["postId"]);
          else if (existing["postId"]) {
            params["postId"] = String(existing["postId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["attachmentId"] = identifier;
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
      description: "List addOnAttachments resources",
      arguments: z.object({
        itemId: z.string().describe(
          "Identifier of the `Announcement`, `CourseWork`, or `CourseWorkMaterial` whose attachments should be enumerated. This field is required, but is not marked as such while we are migrating from post_id.",
        ).optional(),
        pageSize: z.number().describe(
          "The maximum number of attachments to return. The service may return fewer than this value. If unspecified, at most 20 attachments will be returned. The maximum value is 20; values above 20 will be coerced to 20.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["postId"] !== undefined) params["postId"] = String(g["postId"]);
        if (args["itemId"] !== undefined) {
          params["itemId"] = String(args["itemId"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "addOnAttachments",
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
