// Auto-generated extension model for @swamp/gcp/classroom/userprofiles-guardianinvitations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Classroom UserProfiles.GuardianInvitations.
 *
 * An invitation to become the guardian of a specified user, sent to a specified email address.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://classroom.googleapis.com/";

const GET_CONFIG = {
  "id": "classroom.userProfiles.guardianInvitations.get",
  "path": "v1/userProfiles/{studentId}/guardianInvitations/{invitationId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "studentId",
    "invitationId",
  ],
  "parameters": {
    "invitationId": {
      "location": "path",
      "required": true,
    },
    "studentId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "classroom.userProfiles.guardianInvitations.create",
  "path": "v1/userProfiles/{studentId}/guardianInvitations",
  "httpMethod": "POST",
  "parameterOrder": [
    "studentId",
  ],
  "parameters": {
    "studentId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const PATCH_CONFIG = {
  "id": "classroom.userProfiles.guardianInvitations.patch",
  "path": "v1/userProfiles/{studentId}/guardianInvitations/{invitationId}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "studentId",
    "invitationId",
  ],
  "parameters": {
    "invitationId": {
      "location": "path",
      "required": true,
    },
    "studentId": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "classroom.userProfiles.guardianInvitations.list",
  "path": "v1/userProfiles/{studentId}/guardianInvitations",
  "httpMethod": "GET",
  "parameterOrder": [
    "studentId",
  ],
  "parameters": {
    "invitedEmailAddress": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "states": {
      "location": "query",
    },
    "studentId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  creationTime: z.string().describe(
    "The time that this invitation was created. Read-only.",
  ).optional(),
  invitationId: z.string().describe(
    "Unique identifier for this invitation. Read-only.",
  ).optional(),
  invitedEmailAddress: z.string().describe(
    "Email address that the invitation was sent to. This field is only visible to domain administrators.",
  ).optional(),
  state: z.enum([
    "GUARDIAN_INVITATION_STATE_UNSPECIFIED",
    "PENDING",
    "COMPLETE",
  ]).describe("The state that this invitation is in.").optional(),
  studentId: z.string().describe("ID of the student (in standard format)")
    .optional(),
});

const StateSchema = z.object({
  creationTime: z.string().optional(),
  invitationId: z.string().optional(),
  invitedEmailAddress: z.string().optional(),
  state: z.string().optional(),
  studentId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  creationTime: z.string().describe(
    "The time that this invitation was created. Read-only.",
  ).optional(),
  invitationId: z.string().describe(
    "Unique identifier for this invitation. Read-only.",
  ).optional(),
  invitedEmailAddress: z.string().describe(
    "Email address that the invitation was sent to. This field is only visible to domain administrators.",
  ).optional(),
  state: z.enum([
    "GUARDIAN_INVITATION_STATE_UNSPECIFIED",
    "PENDING",
    "COMPLETE",
  ]).describe("The state that this invitation is in.").optional(),
  studentId: z.string().describe("ID of the student (in standard format)")
    .optional(),
});

/** Swamp extension model for Google Cloud Google Classroom UserProfiles.GuardianInvitations. Registered at `@swamp/gcp/classroom/userprofiles-guardianinvitations`. */
export const model = {
  type: "@swamp/gcp/classroom/userprofiles-guardianinvitations",
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
      description:
        "An invitation to become the guardian of a specified user, sent to a specified...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a guardianInvitations",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["studentId"] !== undefined) {
          params["studentId"] = String(g["studentId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["invitationId"] !== undefined) {
          body["invitationId"] = g["invitationId"];
        }
        if (g["invitedEmailAddress"] !== undefined) {
          body["invitedEmailAddress"] = g["invitedEmailAddress"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["name"] !== undefined) params["invitationId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "studentId": String(g["studentId"] ?? "") },
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
      description: "Get a guardianInvitations",
      arguments: z.object({
        identifier: z.string().describe("The name of the guardianInvitations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["studentId"] !== undefined) {
          params["studentId"] = String(g["studentId"]);
        }
        params["invitationId"] = args.identifier;
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
      description: "Update guardianInvitations attributes",
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
        if (g["studentId"] !== undefined) {
          params["studentId"] = String(g["studentId"]);
        } else if (existing["studentId"]) {
          params["studentId"] = String(existing["studentId"]);
        }
        params["invitationId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["creationTime"] !== undefined) {
          body["creationTime"] = g["creationTime"];
        }
        if (g["invitedEmailAddress"] !== undefined) {
          body["invitedEmailAddress"] = g["invitedEmailAddress"];
        }
        if (g["state"] !== undefined) body["state"] = g["state"];
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
      description: "Sync guardianInvitations state from GCP",
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
          if (g["studentId"] !== undefined) {
            params["studentId"] = String(g["studentId"]);
          } else if (existing["studentId"]) {
            params["studentId"] = String(existing["studentId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["invitationId"] = identifier;
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
