// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/meet/spaces
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Meet Spaces.
 *
 * Virtual place where conferences are held. Only one active conference can be held in one space at any given time.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://meet.googleapis.com/";

const GET_CONFIG = {
  "id": "meet.spaces.get",
  "path": "v2/{+name}",
  "httpMethod": "GET",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "meet.spaces.create",
  "path": "v2/spaces",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const PATCH_CONFIG = {
  "id": "meet.spaces.patch",
  "path": "v2/{+name}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "name",
  ],
  "parameters": {
    "name": {
      "location": "path",
      "required": true,
    },
    "updateMask": {
      "location": "query",
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/meetings.space.created",
  "https://www.googleapis.com/auth/meetings.space.readonly",
  "https://www.googleapis.com/auth/meetings.space.settings",
];

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
  scopes: z.string().describe(
    "Comma-separated OAuth scopes to request when minting access tokens via gcloud. Defaults to the API's Discovery Document scopes.",
  ).optional(),
  quotaProject: z.string().describe(
    "GCP project ID for quota and billing attribution; sets the x-goog-user-project header. Overrides GOOGLE_CLOUD_QUOTA_PROJECT environment variable. Required for APIs like Cloud Identity when using user credentials.",
  ).optional(),
  apiEndpoint: z.string().describe(
    "Custom API endpoint for emulators; overrides GCP_API_ENDPOINT environment variable. Defaults to the service's production URL.",
  ).optional(),
  activeConference: z.object({
    conferenceRecord: z.string().describe(
      "Output only. Reference to 'ConferenceRecord' resource. Format: `conferenceRecords/{conference_record}` where `{conference_record}` is a unique ID for each instance of a call within a space.",
    ).optional(),
  }).describe("Active conference, if it exists.").optional(),
  config: z.object({
    accessType: z.enum([
      "ACCESS_TYPE_UNSPECIFIED",
      "OPEN",
      "TRUSTED",
      "RESTRICTED",
    ]).describe(
      "Access type of the meeting space that determines who can join without knocking. Default: The user's default access settings. Controlled by the user's admin for enterprise users or RESTRICTED.",
    ).optional(),
    artifactConfig: z.object({
      recordingConfig: z.object({
        autoRecordingGeneration: z.enum([
          "AUTO_GENERATION_TYPE_UNSPECIFIED",
          "ON",
          "OFF",
        ]).describe(
          "Defines whether a meeting space is automatically recorded when someone with the privilege to record joins the meeting.",
        ).optional(),
      }).describe("Configuration for recording.").optional(),
      smartNotesConfig: z.object({
        autoSmartNotesGeneration: z.enum([
          "AUTO_GENERATION_TYPE_UNSPECIFIED",
          "ON",
          "OFF",
        ]).describe(
          "Defines whether to automatically generate a summary and recap of the meeting for all invitees in the organization when someone with the privilege to enable smart notes joins the meeting.",
        ).optional(),
      }).describe("Configuration for auto-smart-notes.").optional(),
      transcriptionConfig: z.object({
        autoTranscriptionGeneration: z.enum([
          "AUTO_GENERATION_TYPE_UNSPECIFIED",
          "ON",
          "OFF",
        ]).describe(
          "Defines whether the content of a meeting is automatically transcribed when someone with the privilege to transcribe joins the meeting.",
        ).optional(),
      }).describe("Configuration for auto-transcript.").optional(),
    }).describe(
      "Configuration pertaining to the auto-generated artifacts that the meeting supports.",
    ).optional(),
    attendanceReportGenerationType: z.enum([
      "ATTENDANCE_REPORT_GENERATION_TYPE_UNSPECIFIED",
      "GENERATE_REPORT",
      "DO_NOT_GENERATE",
    ]).describe("Whether attendance report is enabled for the meeting space.")
      .optional(),
    entryPointAccess: z.enum([
      "ENTRY_POINT_ACCESS_UNSPECIFIED",
      "ALL",
      "CREATOR_APP_ONLY",
    ]).describe(
      "Defines the entry points that can be used to join meetings hosted in this meeting space. Default: EntryPointAccess.ALL",
    ).optional(),
    moderation: z.enum(["MODERATION_UNSPECIFIED", "OFF", "ON"]).describe(
      "The pre-configured moderation mode for the Meeting. Default: Controlled by the user's policies.",
    ).optional(),
    moderationRestrictions: z.object({
      chatRestriction: z.enum([
        "RESTRICTION_TYPE_UNSPECIFIED",
        "HOSTS_ONLY",
        "NO_RESTRICTION",
      ]).describe(
        "Defines who has permission to send chat messages in the meeting space.",
      ).optional(),
      defaultJoinAsViewerType: z.enum([
        "DEFAULT_JOIN_AS_VIEWER_TYPE_UNSPECIFIED",
        "ON",
        "OFF",
      ]).describe(
        "Defines whether to restrict the default role assigned to users as viewer.",
      ).optional(),
      presentRestriction: z.enum([
        "RESTRICTION_TYPE_UNSPECIFIED",
        "HOSTS_ONLY",
        "NO_RESTRICTION",
      ]).describe(
        "Defines who has permission to share their screen in the meeting space.",
      ).optional(),
      reactionRestriction: z.enum([
        "RESTRICTION_TYPE_UNSPECIFIED",
        "HOSTS_ONLY",
        "NO_RESTRICTION",
      ]).describe(
        "Defines who has permission to send reactions in the meeting space.",
      ).optional(),
    }).describe(
      "When moderation.ON, these restrictions go into effect for the meeting. When moderation.OFF, will be reset to default ModerationRestrictions.",
    ).optional(),
  }).describe("Configuration pertaining to the meeting space.").optional(),
  name: z.string().describe(
    "Immutable. Resource name of the space. Format: `spaces/{space}`. `{space}` is the resource identifier for the space. It's a unique, server-generated ID and is case sensitive. For example, `jQCFfuBOdN5z`. For more information, see [How Meet identifies a meeting space](https://developers.google.com/workspace/meet/api/guides/meeting-spaces#identify-meeting-space).",
  ).optional(),
});

const StateSchema = z.object({
  activeConference: z.object({
    conferenceRecord: z.string(),
  }).optional(),
  config: z.object({
    accessType: z.string(),
    artifactConfig: z.object({
      recordingConfig: z.object({
        autoRecordingGeneration: z.string(),
      }),
      smartNotesConfig: z.object({
        autoSmartNotesGeneration: z.string(),
      }),
      transcriptionConfig: z.object({
        autoTranscriptionGeneration: z.string(),
      }),
    }),
    attendanceReportGenerationType: z.string(),
    entryPointAccess: z.string(),
    moderation: z.string(),
    moderationRestrictions: z.object({
      chatRestriction: z.string(),
      defaultJoinAsViewerType: z.string(),
      presentRestriction: z.string(),
      reactionRestriction: z.string(),
    }),
  }).optional(),
  gatewaySipAccess: z.array(z.object({
    sipAccessCode: z.string(),
    uri: z.string(),
  })).optional(),
  meetingCode: z.string().optional(),
  meetingUri: z.string().optional(),
  name: z.string(),
  phoneAccess: z.array(z.object({
    languageCode: z.string(),
    phoneNumber: z.string(),
    pin: z.string(),
    regionCode: z.string(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  activeConference: z.object({
    conferenceRecord: z.string().describe(
      "Output only. Reference to 'ConferenceRecord' resource. Format: `conferenceRecords/{conference_record}` where `{conference_record}` is a unique ID for each instance of a call within a space.",
    ).optional(),
  }).describe("Active conference, if it exists.").optional(),
  config: z.object({
    accessType: z.enum([
      "ACCESS_TYPE_UNSPECIFIED",
      "OPEN",
      "TRUSTED",
      "RESTRICTED",
    ]).describe(
      "Access type of the meeting space that determines who can join without knocking. Default: The user's default access settings. Controlled by the user's admin for enterprise users or RESTRICTED.",
    ).optional(),
    artifactConfig: z.object({
      recordingConfig: z.object({
        autoRecordingGeneration: z.enum([
          "AUTO_GENERATION_TYPE_UNSPECIFIED",
          "ON",
          "OFF",
        ]).describe(
          "Defines whether a meeting space is automatically recorded when someone with the privilege to record joins the meeting.",
        ).optional(),
      }).describe("Configuration for recording.").optional(),
      smartNotesConfig: z.object({
        autoSmartNotesGeneration: z.enum([
          "AUTO_GENERATION_TYPE_UNSPECIFIED",
          "ON",
          "OFF",
        ]).describe(
          "Defines whether to automatically generate a summary and recap of the meeting for all invitees in the organization when someone with the privilege to enable smart notes joins the meeting.",
        ).optional(),
      }).describe("Configuration for auto-smart-notes.").optional(),
      transcriptionConfig: z.object({
        autoTranscriptionGeneration: z.enum([
          "AUTO_GENERATION_TYPE_UNSPECIFIED",
          "ON",
          "OFF",
        ]).describe(
          "Defines whether the content of a meeting is automatically transcribed when someone with the privilege to transcribe joins the meeting.",
        ).optional(),
      }).describe("Configuration for auto-transcript.").optional(),
    }).describe(
      "Configuration pertaining to the auto-generated artifacts that the meeting supports.",
    ).optional(),
    attendanceReportGenerationType: z.enum([
      "ATTENDANCE_REPORT_GENERATION_TYPE_UNSPECIFIED",
      "GENERATE_REPORT",
      "DO_NOT_GENERATE",
    ]).describe("Whether attendance report is enabled for the meeting space.")
      .optional(),
    entryPointAccess: z.enum([
      "ENTRY_POINT_ACCESS_UNSPECIFIED",
      "ALL",
      "CREATOR_APP_ONLY",
    ]).describe(
      "Defines the entry points that can be used to join meetings hosted in this meeting space. Default: EntryPointAccess.ALL",
    ).optional(),
    moderation: z.enum(["MODERATION_UNSPECIFIED", "OFF", "ON"]).describe(
      "The pre-configured moderation mode for the Meeting. Default: Controlled by the user's policies.",
    ).optional(),
    moderationRestrictions: z.object({
      chatRestriction: z.enum([
        "RESTRICTION_TYPE_UNSPECIFIED",
        "HOSTS_ONLY",
        "NO_RESTRICTION",
      ]).describe(
        "Defines who has permission to send chat messages in the meeting space.",
      ).optional(),
      defaultJoinAsViewerType: z.enum([
        "DEFAULT_JOIN_AS_VIEWER_TYPE_UNSPECIFIED",
        "ON",
        "OFF",
      ]).describe(
        "Defines whether to restrict the default role assigned to users as viewer.",
      ).optional(),
      presentRestriction: z.enum([
        "RESTRICTION_TYPE_UNSPECIFIED",
        "HOSTS_ONLY",
        "NO_RESTRICTION",
      ]).describe(
        "Defines who has permission to share their screen in the meeting space.",
      ).optional(),
      reactionRestriction: z.enum([
        "RESTRICTION_TYPE_UNSPECIFIED",
        "HOSTS_ONLY",
        "NO_RESTRICTION",
      ]).describe(
        "Defines who has permission to send reactions in the meeting space.",
      ).optional(),
    }).describe(
      "When moderation.ON, these restrictions go into effect for the meeting. When moderation.OFF, will be reset to default ModerationRestrictions.",
    ).optional(),
  }).describe("Configuration pertaining to the meeting space.").optional(),
  name: z.string().describe(
    "Immutable. Resource name of the space. Format: `spaces/{space}`. `{space}` is the resource identifier for the space. It's a unique, server-generated ID and is case sensitive. For example, `jQCFfuBOdN5z`. For more information, see [How Meet identifies a meeting space](https://developers.google.com/workspace/meet/api/guides/meeting-spaces#identify-meeting-space).",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessToken",
  "credentialsJson",
  "project",
  "scopes",
  "quotaProject",
  "apiEndpoint",
]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
    scopes: typeof g.scopes === "string"
      ? g.scopes.split(",").map((s: string) => s.trim())
      : _defaultOAuthScopes,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Google Meet Spaces. Registered at `@swamp/gcp/meet/spaces`. */
export const model = {
  type: "@swamp/gcp/meet/spaces",
  version: "2026.10.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.01.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.02.1",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.18.1",
      description: "Added: scopes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.20.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.12.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Virtual place where conferences are held. Only one active conference can be h...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a spaces",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (g["activeConference"] !== undefined) {
          body["activeConference"] = g["activeConference"];
        }
        if (g["config"] !== undefined) body["config"] = g["config"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          undefined,
          credentials,
        ) as StateData;
        const instanceName = ((g.name ?? result.name)?.toString() ?? "current")
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
      description: "Get a spaces",
      arguments: z.object({
        identifier: z.string().describe("The name of the spaces"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
        ) as StateData;
        const instanceName =
          ((g.name ?? result.name)?.toString() ?? args.identifier).replace(
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
      description: "Update spaces attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific spaces by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const params: Record<string, string> = { project: projectId };
        const resourceId = existing["name"]?.toString() ??
          g["name"]?.toString();
        if (!resourceId) {
          throw new Error(
            "No identifier found in existing state or globalArgs",
          );
        }
        params["name"] = resourceId;
        const body: Record<string, unknown> = {};
        if (g["activeConference"] !== undefined) {
          body["activeConference"] = g["activeConference"];
        }
        if (g["config"] !== undefined) body["config"] = g["config"];
        const updateMaskKeys = Object.keys(body);
        if (updateMaskKeys.length > 0) {
          params["updateMask"] = updateMaskKeys.join(",");
        }
        for (const key of Object.keys(existing)) {
          if (
            key === "fingerprint" || key === "labelFingerprint" ||
            key === "etag" || key.endsWith("Fingerprint")
          ) {
            body[key] = existing[key];
          }
        }
        const result = await updateResource(
          baseUrl,
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
    sync: {
      description: "Sync spaces state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific spaces by name (e.g. one discovered by list)",
        ).optional(),
      }),
      execute: async (args: { identifier?: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const instanceName =
          (g.name?.toString() ?? args.identifier ?? "current").replace(
            /[\/\\]/g,
            "_",
          ).replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error(
            "No existing state found - run create, get, or list first",
          );
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
          params["name"] = identifier;
          const result = await readResource(
            baseUrl,
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
    end_active_conference: {
      description: "end active conference",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          baseUrl,
          {
            "id": "meet.spaces.endActiveConference",
            "path": "v2/{+name}:endActiveConference",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
