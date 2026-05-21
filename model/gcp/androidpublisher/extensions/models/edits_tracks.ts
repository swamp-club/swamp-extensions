// Auto-generated extension model for @swamp/gcp/androidpublisher/edits-tracks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Edits.Tracks.
 *
 * A track configuration. The resource for TracksService.
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

const BASE_URL = "https://androidpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "androidpublisher.edits.tracks.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/edits/{editId}/tracks/{track}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "editId",
    "track",
  ],
  "parameters": {
    "editId": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "track": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "androidpublisher.edits.tracks.create",
  "path":
    "androidpublisher/v3/applications/{packageName}/edits/{editId}/tracks",
  "httpMethod": "POST",
  "parameterOrder": [
    "packageName",
    "editId",
  ],
  "parameters": {
    "editId": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "androidpublisher.edits.tracks.update",
  "path":
    "androidpublisher/v3/applications/{packageName}/edits/{editId}/tracks/{track}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "packageName",
    "editId",
    "track",
  ],
  "parameters": {
    "editId": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
    "track": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidpublisher.edits.tracks.list",
  "path":
    "androidpublisher/v3/applications/{packageName}/edits/{editId}/tracks",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "editId",
  ],
  "parameters": {
    "editId": {
      "location": "path",
      "required": true,
    },
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  formFactor: z.enum([
    "FORM_FACTOR_UNSPECIFIED",
    "DEFAULT",
    "WEAR",
    "AUTOMOTIVE",
  ]).describe(
    "Required. Form factor of the new track. Defaults to the default track.",
  ).optional(),
  track: z.string().describe(
    "Identifier of the track. Form factor tracks have a special prefix as an identifier, for example `wear:production`, `automotive:production`. [More on track name](https://developers.google.com/android-publisher/tracks#ff-track-name)",
  ).optional(),
  type: z.enum(["TRACK_TYPE_UNSPECIFIED", "CLOSED_TESTING"]).describe(
    "Required. Type of the new track. Currently, the only supported value is closedTesting.",
  ).optional(),
  releases: z.array(z.object({
    countryTargeting: z.object({
      countries: z.array(z.string()).describe(
        "Countries to target, specified as two letter [CLDR codes](https://unicode.org/cldr/charts/latest/supplemental/territory_containment_un_m_49.html).",
      ).optional(),
      includeRestOfWorld: z.boolean().describe(
        'Include "rest of world" as well as explicitly targeted countries.',
      ).optional(),
    }).describe("Country targeting specification.").optional(),
    inAppUpdatePriority: z.number().int().describe(
      "In-app update priority of the release. All newly added APKs in the release will be considered at this priority. Can take values in the range [0, 5], with 5 the highest priority. Defaults to 0. in_app_update_priority can not be updated once the release is rolled out. See https://developer.android.com/guide/playcore/in-app-updates.",
    ).optional(),
    name: z.string().describe(
      "The release name. Not required to be unique. If not set, the name is generated from the APK's version_name. If the release contains multiple APKs, the name is generated from the date.",
    ).optional(),
    releaseNotes: z.array(z.object({
      language: z.string().describe(
        'Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German).',
      ).optional(),
      text: z.string().describe("The text in the given language.").optional(),
    })).describe("A description of what is new in this release.").optional(),
    status: z.enum([
      "statusUnspecified",
      "draft",
      "inProgress",
      "halted",
      "completed",
    ]).describe("The status of the release.").optional(),
    userFraction: z.number().describe(
      'Fraction of users who are eligible for a staged release. 0 < fraction < 1. Can only be set when status is "inProgress" or "halted".',
    ).optional(),
    versionCodes: z.array(z.string()).describe(
      "Version codes of all APKs in the release. Must include version codes to retain from previous releases.",
    ).optional(),
  })).describe(
    "In a read request, represents all active releases in the track. In an update request, represents desired changes.",
  ).optional(),
  packageName: z.string().describe("Required. Package name of the app."),
  editId: z.string().describe("Required. Identifier of the edit."),
});

const StateSchema = z.object({
  releases: z.array(z.object({
    countryTargeting: z.object({
      countries: z.array(z.string()),
      includeRestOfWorld: z.boolean(),
    }),
    inAppUpdatePriority: z.number(),
    name: z.string(),
    releaseNotes: z.array(z.object({
      language: z.string(),
      text: z.string(),
    })),
    status: z.string(),
    userFraction: z.number(),
    versionCodes: z.array(z.string()),
  })).optional(),
  track: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  formFactor: z.enum([
    "FORM_FACTOR_UNSPECIFIED",
    "DEFAULT",
    "WEAR",
    "AUTOMOTIVE",
  ]).describe(
    "Required. Form factor of the new track. Defaults to the default track.",
  ).optional(),
  track: z.string().describe(
    "Identifier of the track. Form factor tracks have a special prefix as an identifier, for example `wear:production`, `automotive:production`. [More on track name](https://developers.google.com/android-publisher/tracks#ff-track-name)",
  ).optional(),
  type: z.enum(["TRACK_TYPE_UNSPECIFIED", "CLOSED_TESTING"]).describe(
    "Required. Type of the new track. Currently, the only supported value is closedTesting.",
  ).optional(),
  releases: z.array(z.object({
    countryTargeting: z.object({
      countries: z.array(z.string()).describe(
        "Countries to target, specified as two letter [CLDR codes](https://unicode.org/cldr/charts/latest/supplemental/territory_containment_un_m_49.html).",
      ).optional(),
      includeRestOfWorld: z.boolean().describe(
        'Include "rest of world" as well as explicitly targeted countries.',
      ).optional(),
    }).describe("Country targeting specification.").optional(),
    inAppUpdatePriority: z.number().int().describe(
      "In-app update priority of the release. All newly added APKs in the release will be considered at this priority. Can take values in the range [0, 5], with 5 the highest priority. Defaults to 0. in_app_update_priority can not be updated once the release is rolled out. See https://developer.android.com/guide/playcore/in-app-updates.",
    ).optional(),
    name: z.string().describe(
      "The release name. Not required to be unique. If not set, the name is generated from the APK's version_name. If the release contains multiple APKs, the name is generated from the date.",
    ).optional(),
    releaseNotes: z.array(z.object({
      language: z.string().describe(
        'Language localization code (a BCP-47 language tag; for example, "de-AT" for Austrian German).',
      ).optional(),
      text: z.string().describe("The text in the given language.").optional(),
    })).describe("A description of what is new in this release.").optional(),
    status: z.enum([
      "statusUnspecified",
      "draft",
      "inProgress",
      "halted",
      "completed",
    ]).describe("The status of the release.").optional(),
    userFraction: z.number().describe(
      'Fraction of users who are eligible for a staged release. 0 < fraction < 1. Can only be set when status is "inProgress" or "halted".',
    ).optional(),
    versionCodes: z.array(z.string()).describe(
      "Version codes of all APKs in the release. Must include version codes to retain from previous releases.",
    ).optional(),
  })).describe(
    "In a read request, represents all active releases in the track. In an update request, represents desired changes.",
  ).optional(),
  packageName: z.string().describe("Required. Package name of the app.")
    .optional(),
  editId: z.string().describe("Required. Identifier of the edit.").optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Edits.Tracks. Registered at `@swamp/gcp/androidpublisher/edits-tracks`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/edits-tracks",
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
      description: "A track configuration. The resource for TracksService.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a tracks",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
        const body: Record<string, unknown> = {};
        if (g["formFactor"] !== undefined) body["formFactor"] = g["formFactor"];
        if (g["track"] !== undefined) body["track"] = g["track"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["name"] !== undefined) params["track"] = String(g["name"]);
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
              "packageName": String(g["packageName"] ?? ""),
              "editId": String(g["editId"] ?? ""),
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
      description: "Get a tracks",
      arguments: z.object({
        identifier: z.string().describe("The name of the tracks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
        params["track"] = args.identifier;
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
      description: "Update tracks attributes",
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
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        } else if (existing["packageName"]) {
          params["packageName"] = String(existing["packageName"]);
        }
        if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
        else if (existing["editId"]) {
          params["editId"] = String(existing["editId"]);
        }
        params["track"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["releases"] !== undefined) body["releases"] = g["releases"];
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
          UPDATE_CONFIG,
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
      description: "Sync tracks state from GCP",
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
          if (g["packageName"] !== undefined) {
            params["packageName"] = String(g["packageName"]);
          } else if (existing["packageName"]) {
            params["packageName"] = String(existing["packageName"]);
          }
          if (g["editId"] !== undefined) params["editId"] = String(g["editId"]);
          else if (existing["editId"]) {
            params["editId"] = String(existing["editId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["track"] = identifier;
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
