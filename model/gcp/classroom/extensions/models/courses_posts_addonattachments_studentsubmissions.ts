// Auto-generated extension model for @swamp/gcp/classroom/courses-posts-addonattachments-studentsubmissions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Classroom Courses.Posts.AddOnAttachments.StudentSubmissions.
 *
 * Payload for grade update requests.
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

const BASE_URL = "https://classroom.googleapis.com/";

const GET_CONFIG = {
  "id": "classroom.courses.posts.addOnAttachments.studentSubmissions.get",
  "path":
    "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}/studentSubmissions/{submissionId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "courseId",
    "postId",
    "attachmentId",
    "submissionId",
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
    "submissionId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "classroom.courses.posts.addOnAttachments.studentSubmissions.patch",
  "path":
    "v1/courses/{courseId}/posts/{postId}/addOnAttachments/{attachmentId}/studentSubmissions/{submissionId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "courseId",
    "postId",
    "attachmentId",
    "submissionId",
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
    "submissionId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  pointsEarned: z.number().describe(
    "Student grade on this attachment. If unset, no grade was set.",
  ).optional(),
  postSubmissionState: z.enum([
    "SUBMISSION_STATE_UNSPECIFIED",
    "NEW",
    "CREATED",
    "TURNED_IN",
    "RETURNED",
    "RECLAIMED_BY_STUDENT",
  ]).describe(
    "Submission state of add-on attachment's parent post (i.e. assignment).",
  ).optional(),
  userId: z.string().describe(
    "Identifier for the student that owns this submission. Requires the user to be a teacher in the course and have permission to read student submissions. Read-only.",
  ).optional(),
});

const StateSchema = z.object({
  pointsEarned: z.number().optional(),
  postSubmissionState: z.string().optional(),
  userId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  pointsEarned: z.number().describe(
    "Student grade on this attachment. If unset, no grade was set.",
  ).optional(),
  postSubmissionState: z.enum([
    "SUBMISSION_STATE_UNSPECIFIED",
    "NEW",
    "CREATED",
    "TURNED_IN",
    "RETURNED",
    "RECLAIMED_BY_STUDENT",
  ]).describe(
    "Submission state of add-on attachment's parent post (i.e. assignment).",
  ).optional(),
  userId: z.string().describe(
    "Identifier for the student that owns this submission. Requires the user to be a teacher in the course and have permission to read student submissions. Read-only.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Classroom Courses.Posts.AddOnAttachments.StudentSubmissions. Registered at `@swamp/gcp/classroom/courses-posts-addonattachments-studentsubmissions`. */
export const model = {
  type:
    "@swamp/gcp/classroom/courses-posts-addonattachments-studentsubmissions",
  version: "2026.05.18.1",
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
      description: "Added: courseWorkSubmissionId, id",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.1",
      description: "Removed: courseWorkSubmissionId, id",
      upgradeAttributes: (old: Record<string, unknown>) => {
        const {
          courseWorkSubmissionId: _courseWorkSubmissionId,
          id: _id,
          ...rest
        } = old;
        return rest;
      },
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Payload for grade update requests.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a studentSubmissions",
      arguments: z.object({
        identifier: z.string().describe("The name of the studentSubmissions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["courseId"] !== undefined) {
          params["courseId"] = String(g["courseId"]);
        }
        if (g["postId"] !== undefined) params["postId"] = String(g["postId"]);
        if (g["attachmentId"] !== undefined) {
          params["attachmentId"] = String(g["attachmentId"]);
        }
        params["submissionId"] = args.identifier;
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
      description: "Update studentSubmissions attributes",
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
        if (g["attachmentId"] !== undefined) {
          params["attachmentId"] = String(g["attachmentId"]);
        } else if (existing["attachmentId"]) {
          params["attachmentId"] = String(existing["attachmentId"]);
        }
        params["submissionId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["pointsEarned"] !== undefined) {
          body["pointsEarned"] = g["pointsEarned"];
        }
        if (g["postSubmissionState"] !== undefined) {
          body["postSubmissionState"] = g["postSubmissionState"];
        }
        if (g["userId"] !== undefined) body["userId"] = g["userId"];
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
      description: "Sync studentSubmissions state from GCP",
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
          if (g["attachmentId"] !== undefined) {
            params["attachmentId"] = String(g["attachmentId"]);
          } else if (existing["attachmentId"]) {
            params["attachmentId"] = String(existing["attachmentId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["submissionId"] = identifier;
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
