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

// Auto-generated extension model for @swamp/gcp/firebasecrashlytics/apps-issues
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase Crashlytics Apps.Issues.
 *
 * An issue describes a set of similar events that have been analyzed by Crashlytics and grouped together. All events within an issue will be of the same error_type: crash, non-fatal exception or ANR. All events within an issue will contain similar stack traces in their blamed thread.
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

const BASE_URL = "https://firebasecrashlytics.googleapis.com/";

const GET_CONFIG = {
  "id": "firebasecrashlytics.projects.apps.issues.get",
  "path": "v1alpha/{+name}",
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

const PATCH_CONFIG = {
  "id": "firebasecrashlytics.projects.apps.issues.patch",
  "path": "v1alpha/{+name}",
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
  errorType: z.enum(["ERROR_TYPE_UNSPECIFIED", "FATAL", "NON_FATAL", "ANR"])
    .describe(
      "Output only. Immutable. Indicates whether this issue is a crash, non-fatal exception, or ANR.",
    ).optional(),
  firstSeenTime: z.string().describe(
    "Output only. Immutable. The first time this issue was seen.",
  ).optional(),
  firstSeenVersion: z.string().describe(
    "Output only. Immutable. The first app display_version in which this issue was seen, populated for mobile issues only.",
  ).optional(),
  id: z.string().describe(
    "Output only. Immutable. Unique identifier for the issue.",
  ).optional(),
  lastSeenTime: z.string().describe(
    "Output only. The most recent time this issue was seen.",
  ).optional(),
  lastSeenVersion: z.string().describe(
    "Output only. The most recent app display_version in which this issue was seen, populated for mobile issues only.",
  ).optional(),
  name: z.string().describe(
    'Required. Output only. Immutable. Identifier. The name of the issue resource. Format: "projects/{project}/apps/{app}/issues/{issue}".',
  ).optional(),
  notesCount: z.string().describe(
    "Output only. The number of notes attached to an issue.",
  ).optional(),
  sampleEvent: z.string().describe(
    "Output only. The resource name for a sample event in this issue.",
  ).optional(),
  signals: z.array(z.object({
    description: z.string().describe(
      "Output only. Supporting detail information.",
    ).optional(),
    signal: z.enum([
      "SIGNAL_UNSPECIFIED",
      "SIGNAL_EARLY",
      "SIGNAL_FRESH",
      "SIGNAL_REGRESSED",
      "SIGNAL_REPETITIVE",
    ]).describe("Output only. The signal name.").optional(),
  })).describe(
    "Output only. Immutable. Distinctive characteristics assigned by the Crashlytics analyzer.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "OPEN", "CLOSED", "MUTED"]).describe(
    "Output only. Indicates whether this issue is open, closed or muted. For details on how issue states change without user actions, see [Regressed Issues](https://firebase.google.com/docs/crashlytics/troubleshooting?platform=ios#regressed-issues).",
  ).optional(),
  stateUpdateTime: z.string().describe(
    "Output only. The time at which the issue state was last changed.",
  ).optional(),
  subtitle: z.string().describe(
    "Output only. Immutable. Caption subtitle. This is usually a symbol or an exception message.",
  ).optional(),
  title: z.string().describe(
    "Output only. Immutable. Caption title. This is usually a source file or method name.",
  ).optional(),
  uri: z.string().describe(
    "Output only. Provides a link to the Issue on the Firebase console. When this Issue is obtained as part of a Report, then the link will be configured with the same time interval and filters as the request.",
  ).optional(),
  variants: z.array(z.object({
    id: z.string().describe(
      "Output only. Immutable. Distinct identifier for the variant.",
    ).optional(),
    sampleEvent: z.string().describe(
      "Output only. The resource name for a sample event in this variant.",
    ).optional(),
    uri: z.string().describe(
      "Output only. Provides a link to the variant on the Firebase console. When this variant is obtained as part of a Report, then the link will be configured with the same time interval and filters as the request.",
    ).optional(),
  })).describe(
    "Output only. Immutable. The top 12 variants (subgroups) within the issue. Variants group events within an issue that are very similar. A single result implies that the variant is the same as the parent issue. This field will be empty when multiple issues are requested. Request a single issue to list variants.",
  ).optional(),
});

const StateSchema = z.object({
  errorType: z.string().optional(),
  firstSeenTime: z.string().optional(),
  firstSeenVersion: z.string().optional(),
  id: z.string().optional(),
  lastSeenTime: z.string().optional(),
  lastSeenVersion: z.string().optional(),
  name: z.string(),
  notesCount: z.string().optional(),
  sampleEvent: z.string().optional(),
  signals: z.array(z.object({
    description: z.string(),
    signal: z.string(),
  })).optional(),
  state: z.string().optional(),
  stateUpdateTime: z.string().optional(),
  subtitle: z.string().optional(),
  title: z.string().optional(),
  uri: z.string().optional(),
  variants: z.array(z.object({
    id: z.string(),
    sampleEvent: z.string(),
    uri: z.string(),
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
  errorType: z.enum(["ERROR_TYPE_UNSPECIFIED", "FATAL", "NON_FATAL", "ANR"])
    .describe(
      "Output only. Immutable. Indicates whether this issue is a crash, non-fatal exception, or ANR.",
    ).optional(),
  firstSeenTime: z.string().describe(
    "Output only. Immutable. The first time this issue was seen.",
  ).optional(),
  firstSeenVersion: z.string().describe(
    "Output only. Immutable. The first app display_version in which this issue was seen, populated for mobile issues only.",
  ).optional(),
  id: z.string().describe(
    "Output only. Immutable. Unique identifier for the issue.",
  ).optional(),
  lastSeenTime: z.string().describe(
    "Output only. The most recent time this issue was seen.",
  ).optional(),
  lastSeenVersion: z.string().describe(
    "Output only. The most recent app display_version in which this issue was seen, populated for mobile issues only.",
  ).optional(),
  name: z.string().describe(
    'Required. Output only. Immutable. Identifier. The name of the issue resource. Format: "projects/{project}/apps/{app}/issues/{issue}".',
  ).optional(),
  notesCount: z.string().describe(
    "Output only. The number of notes attached to an issue.",
  ).optional(),
  sampleEvent: z.string().describe(
    "Output only. The resource name for a sample event in this issue.",
  ).optional(),
  signals: z.array(z.object({
    description: z.string().describe(
      "Output only. Supporting detail information.",
    ).optional(),
    signal: z.enum([
      "SIGNAL_UNSPECIFIED",
      "SIGNAL_EARLY",
      "SIGNAL_FRESH",
      "SIGNAL_REGRESSED",
      "SIGNAL_REPETITIVE",
    ]).describe("Output only. The signal name.").optional(),
  })).describe(
    "Output only. Immutable. Distinctive characteristics assigned by the Crashlytics analyzer.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "OPEN", "CLOSED", "MUTED"]).describe(
    "Output only. Indicates whether this issue is open, closed or muted. For details on how issue states change without user actions, see [Regressed Issues](https://firebase.google.com/docs/crashlytics/troubleshooting?platform=ios#regressed-issues).",
  ).optional(),
  stateUpdateTime: z.string().describe(
    "Output only. The time at which the issue state was last changed.",
  ).optional(),
  subtitle: z.string().describe(
    "Output only. Immutable. Caption subtitle. This is usually a symbol or an exception message.",
  ).optional(),
  title: z.string().describe(
    "Output only. Immutable. Caption title. This is usually a source file or method name.",
  ).optional(),
  uri: z.string().describe(
    "Output only. Provides a link to the Issue on the Firebase console. When this Issue is obtained as part of a Report, then the link will be configured with the same time interval and filters as the request.",
  ).optional(),
  variants: z.array(z.object({
    id: z.string().describe(
      "Output only. Immutable. Distinct identifier for the variant.",
    ).optional(),
    sampleEvent: z.string().describe(
      "Output only. The resource name for a sample event in this variant.",
    ).optional(),
    uri: z.string().describe(
      "Output only. Provides a link to the variant on the Firebase console. When this variant is obtained as part of a Report, then the link will be configured with the same time interval and filters as the request.",
    ).optional(),
  })).describe(
    "Output only. Immutable. The top 12 variants (subgroups) within the issue. Variants group events within an issue that are very similar. A single result implies that the variant is the same as the parent issue. This field will be empty when multiple issues are requested. Request a single issue to list variants.",
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
      : undefined,
    quotaProject: g.quotaProject as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Firebase Crashlytics Apps.Issues. Registered at `@swamp/gcp/firebasecrashlytics/apps-issues`. */
export const model = {
  type: "@swamp/gcp/firebasecrashlytics/apps-issues",
  version: "2026.10.06.1",
  upgrades: [
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
      toVersion: "2026.07.18.2",
      description: "No schema changes",
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
        "An issue describes a set of similar events that have been analyzed by Crashly...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a issues",
      arguments: z.object({
        identifier: z.string().describe("The name of the issues"),
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
      description: "Update issues attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific issues by name (e.g. one discovered by list)",
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
        if (g["errorType"] !== undefined) body["errorType"] = g["errorType"];
        if (g["firstSeenTime"] !== undefined) {
          body["firstSeenTime"] = g["firstSeenTime"];
        }
        if (g["firstSeenVersion"] !== undefined) {
          body["firstSeenVersion"] = g["firstSeenVersion"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["lastSeenTime"] !== undefined) {
          body["lastSeenTime"] = g["lastSeenTime"];
        }
        if (g["lastSeenVersion"] !== undefined) {
          body["lastSeenVersion"] = g["lastSeenVersion"];
        }
        if (g["notesCount"] !== undefined) body["notesCount"] = g["notesCount"];
        if (g["sampleEvent"] !== undefined) {
          body["sampleEvent"] = g["sampleEvent"];
        }
        if (g["signals"] !== undefined) body["signals"] = g["signals"];
        if (g["state"] !== undefined) body["state"] = g["state"];
        if (g["stateUpdateTime"] !== undefined) {
          body["stateUpdateTime"] = g["stateUpdateTime"];
        }
        if (g["subtitle"] !== undefined) body["subtitle"] = g["subtitle"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["uri"] !== undefined) body["uri"] = g["uri"];
        if (g["variants"] !== undefined) body["variants"] = g["variants"];
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
      description: "Sync issues state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific issues by name (e.g. one discovered by list)",
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
    batch_update: {
      description: "batch update",
      arguments: z.object({
        requests: z.any().optional(),
        updateMask: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["requests"] !== undefined) body["requests"] = args["requests"];
        if (args["updateMask"] !== undefined) {
          body["updateMask"] = args["updateMask"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "firebasecrashlytics.projects.apps.issues.batchUpdate",
            "path": "v1alpha/{+parent}/issues:batchUpdate",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
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
