// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/gcp/firebaseappdistribution/apps-releases
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase App Distribution Apps.Releases.
 *
 * A release of a Firebase app.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/releases/${shortName}`;
}

const BASE_URL = "https://firebaseappdistribution.googleapis.com/";

const GET_CONFIG = {
  "id": "firebaseappdistribution.projects.apps.releases.get",
  "path": "v1/{+name}",
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
  "id": "firebaseappdistribution.projects.apps.releases.patch",
  "path": "v1/{+name}",
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

const LIST_CONFIG = {
  "id": "firebaseappdistribution.projects.apps.releases.list",
  "path": "v1/{+parent}/releases",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
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
    "parent": {
      "location": "path",
      "required": true,
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
  acceptedInvitationCount: z.number().int().describe(
    "Output only. Number of testers with accepted invitations.",
  ).optional(),
  androidPackageRegistrationState: z.enum([
    "ANDROID_PACKAGE_REGISTRATION_STATE_UNSPECIFIED",
    "REGISTERED",
    "NOT_REGISTERED",
    "REGISTERED_WITH_ANOTHER_CERTIFICATE_FINGERPRINT",
  ]).describe(
    "Output only. Registration state of the Android package (BinaryType.APK).",
  ).optional(),
  binaryDownloadUri: z.string().describe(
    "Output only. A signed link (which expires in one hour) to directly download the app binary (IPA/APK/AAB) file.",
  ).optional(),
  binaryType: z.enum(["BINARY_TYPE_UNSPECIFIED", "IPA", "APK", "AAB"]).describe(
    "Output only. Type of binary.",
  ).optional(),
  buildVersion: z.string().describe(
    "Output only. Build version of the release. For an Android release, the build version is the `versionCode`. For an iOS release, the build version is the `CFBundleVersion`.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The time the release was created.",
  ).optional(),
  displayVersion: z.string().describe(
    "Output only. Display version of the release. For an Android release, the display version is the `versionName`. For an iOS release, the display version is the `CFBundleShortVersionString`.",
  ).optional(),
  expireTime: z.string().describe(
    "Output only. The time the release will expire.",
  ).optional(),
  feedbackCount: z.number().int().describe(
    "Output only. Number of feedback reports left by testers.",
  ).optional(),
  firebaseConsoleUri: z.string().describe(
    "Output only. A link to the Firebase console displaying a single release.",
  ).optional(),
  installationCount: z.number().int().describe(
    "Output only. Number of testers who have downloaded this release.",
  ).optional(),
  name: z.string().describe(
    "The name of the release resource. Format: `projects/{project_number}/apps/{app}/releases/{release}`",
  ).optional(),
  openInvitationCount: z.number().int().describe(
    "Output only. Number of testers who were invited (incl. expired invitations), but did not (yet) accept the invitation.",
  ).optional(),
  releaseNotes: z.object({
    text: z.string().describe("The text of the release notes.").optional(),
  }).describe("Notes about the release.").optional(),
  testState: z.enum([
    "TEST_STATE_UNSPECIFIED",
    "NO_TESTS_REQUESTED",
    "IN_PROGRESS",
    "PASSED",
    "FAILED",
    "INCONCLUSIVE",
  ]).describe("Output only. The overall state of tests run on this release")
    .optional(),
  testingUri: z.string().describe(
    "Output only. A link to the release in the tester web clip or Android app that lets testers (which were granted access to the app) view release notes and install the app onto their devices.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time the release was last updated.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  acceptedInvitationCount: z.number().optional(),
  androidPackageRegistrationState: z.string().optional(),
  binaryDownloadUri: z.string().optional(),
  binaryType: z.string().optional(),
  buildVersion: z.string().optional(),
  createTime: z.string().optional(),
  displayVersion: z.string().optional(),
  expireTime: z.string().optional(),
  feedbackCount: z.number().optional(),
  firebaseConsoleUri: z.string().optional(),
  installationCount: z.number().optional(),
  name: z.string(),
  openInvitationCount: z.number().optional(),
  releaseNotes: z.object({
    text: z.string(),
  }).optional(),
  testState: z.string().optional(),
  testingUri: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  acceptedInvitationCount: z.number().int().describe(
    "Output only. Number of testers with accepted invitations.",
  ).optional(),
  androidPackageRegistrationState: z.enum([
    "ANDROID_PACKAGE_REGISTRATION_STATE_UNSPECIFIED",
    "REGISTERED",
    "NOT_REGISTERED",
    "REGISTERED_WITH_ANOTHER_CERTIFICATE_FINGERPRINT",
  ]).describe(
    "Output only. Registration state of the Android package (BinaryType.APK).",
  ).optional(),
  binaryDownloadUri: z.string().describe(
    "Output only. A signed link (which expires in one hour) to directly download the app binary (IPA/APK/AAB) file.",
  ).optional(),
  binaryType: z.enum(["BINARY_TYPE_UNSPECIFIED", "IPA", "APK", "AAB"]).describe(
    "Output only. Type of binary.",
  ).optional(),
  buildVersion: z.string().describe(
    "Output only. Build version of the release. For an Android release, the build version is the `versionCode`. For an iOS release, the build version is the `CFBundleVersion`.",
  ).optional(),
  createTime: z.string().describe(
    "Output only. The time the release was created.",
  ).optional(),
  displayVersion: z.string().describe(
    "Output only. Display version of the release. For an Android release, the display version is the `versionName`. For an iOS release, the display version is the `CFBundleShortVersionString`.",
  ).optional(),
  expireTime: z.string().describe(
    "Output only. The time the release will expire.",
  ).optional(),
  feedbackCount: z.number().int().describe(
    "Output only. Number of feedback reports left by testers.",
  ).optional(),
  firebaseConsoleUri: z.string().describe(
    "Output only. A link to the Firebase console displaying a single release.",
  ).optional(),
  installationCount: z.number().int().describe(
    "Output only. Number of testers who have downloaded this release.",
  ).optional(),
  name: z.string().describe(
    "The name of the release resource. Format: `projects/{project_number}/apps/{app}/releases/{release}`",
  ).optional(),
  openInvitationCount: z.number().int().describe(
    "Output only. Number of testers who were invited (incl. expired invitations), but did not (yet) accept the invitation.",
  ).optional(),
  releaseNotes: z.object({
    text: z.string().describe("The text of the release notes.").optional(),
  }).describe("Notes about the release.").optional(),
  testState: z.enum([
    "TEST_STATE_UNSPECIFIED",
    "NO_TESTS_REQUESTED",
    "IN_PROGRESS",
    "PASSED",
    "FAILED",
    "INCONCLUSIVE",
  ]).describe("Output only. The overall state of tests run on this release")
    .optional(),
  testingUri: z.string().describe(
    "Output only. A link to the release in the tester web clip or Android app that lets testers (which were granted access to the app) view release notes and install the app onto their devices.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time the release was last updated.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
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

/** Swamp extension model for Google Cloud Firebase App Distribution Apps.Releases. Registered at `@swamp/gcp/firebaseappdistribution/apps-releases`. */
export const model = {
  type: "@swamp/gcp/firebaseappdistribution/apps-releases",
  version: "2026.10.23.1",
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
      toVersion: "2026.05.18.1",
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
      toVersion: "2026.07.14.1",
      description: "Added: androidPackageRegistrationState",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.1",
      description: "Added: parent",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.17.2",
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
      toVersion: "2026.07.20.2",
      description: "Added: androidPackageRegistrationState",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.3",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.21.4",
      description: "Added: androidPackageRegistrationState",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.07.24.1",
      description:
        "Added: acceptedInvitationCount, binaryType, feedbackCount, installationCount, openInvitationCount, testState",
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
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A release of a Firebase app.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a releases",
      arguments: z.object({
        identifier: z.string().describe("The name of the releases"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
      description: "Update releases attributes",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific releases by name (e.g. one discovered by list)",
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
        const existingName = existing["name"]?.toString();
        if (existingName && existingName.includes("/")) {
          params["name"] = existingName;
        } else {
          params["name"] = buildResourceName(
            String(g["parent"] ?? ""),
            existingName ?? g["name"]?.toString() ?? "",
          );
        }
        const body: Record<string, unknown> = {};
        if (g["acceptedInvitationCount"] !== undefined) {
          body["acceptedInvitationCount"] = g["acceptedInvitationCount"];
        }
        if (g["androidPackageRegistrationState"] !== undefined) {
          body["androidPackageRegistrationState"] =
            g["androidPackageRegistrationState"];
        }
        if (g["binaryDownloadUri"] !== undefined) {
          body["binaryDownloadUri"] = g["binaryDownloadUri"];
        }
        if (g["binaryType"] !== undefined) body["binaryType"] = g["binaryType"];
        if (g["buildVersion"] !== undefined) {
          body["buildVersion"] = g["buildVersion"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["displayVersion"] !== undefined) {
          body["displayVersion"] = g["displayVersion"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["feedbackCount"] !== undefined) {
          body["feedbackCount"] = g["feedbackCount"];
        }
        if (g["firebaseConsoleUri"] !== undefined) {
          body["firebaseConsoleUri"] = g["firebaseConsoleUri"];
        }
        if (g["installationCount"] !== undefined) {
          body["installationCount"] = g["installationCount"];
        }
        if (g["openInvitationCount"] !== undefined) {
          body["openInvitationCount"] = g["openInvitationCount"];
        }
        if (g["releaseNotes"] !== undefined) {
          body["releaseNotes"] = g["releaseNotes"];
        }
        if (g["testState"] !== undefined) body["testState"] = g["testState"];
        if (g["testingUri"] !== undefined) body["testingUri"] = g["testingUri"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
      description: "Sync releases state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific releases by name (e.g. one discovered by list)",
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
          const existingName = existing.name?.toString();
          if (existingName && existingName.includes("/")) {
            params["name"] = existingName;
          } else {
            const shortName = existingName ?? g["name"]?.toString();
            if (!shortName) throw new Error("No identifier found");
            params["name"] = buildResourceName(
              String(g["parent"] ?? ""),
              shortName,
            );
          }
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
    list: {
      description: "List releases resources",
      arguments: z.object({
        filter: z.string().describe(
          'Optional. The expression to filter releases listed in the response. To learn more about filtering, refer to the [AIP-160 standard](http://aip.dev/160). Supported fields: - Time fields supporting `<`, `<=`, `>` and `>=`; expecting an RFC-3339 formatted string: - `create_time` (or `createTime`) - `update_time` (or `updateTime`) - `expire_time` (or `expireTime`) - Text fields supporting `=`. The compared text can contain a wildcard character (`*`) at the beginning and/or end of the string which also enables case-insensitive matching: - `release_notes.text` (or `releaseNotes.text`) - `display_version` (or `displayVersion`) - `build_version` (or `buildVersion`). Examples: - `createTime <= "2021-09-08T00:00:00+04:00"` - `expire_time > "2021-09-08T00:00:00+04:00"` - `releaseNotes.text="fixes" AND createTime >= "2021-09-08T00:00:00.0Z"` - `releaseNotes.text="*v1.0.0-rc*"` - `(display_version = "v1.0.0-rc2" AND `build_version = "123") OR release_notes = "*v1.0.0-rc2 (123)*"`',
        ).optional(),
        orderBy: z.string().describe(
          'Optional. The fields used to order releases. Supported fields: - `create_time` (or `createTime`) - `update_time` (or `updateTime`) - `expire_time` (or `expireTime`) To specify descending order for a field, append a "desc" suffix, for example, `createTime desc`. If this parameter is not set, releases are ordered by `createTime` in descending order.',
        ).optional(),
        pageSize: z.number().describe(
          "Optional. The maximum number of releases to return. The service may return fewer than this value. The valid range is [1-100]; If unspecified (0), at most 25 releases are returned. Values above 100 are coerced to 100.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["filter"] !== undefined) {
          params["filter"] = String(args["filter"]);
        }
        if (args["orderBy"] !== undefined) {
          params["orderBy"] = String(args["orderBy"]);
        }
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          baseUrl,
          LIST_CONFIG,
          params,
          "releases",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        names: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["names"] !== undefined) body["names"] = args["names"];
        const result = await createResource(
          baseUrl,
          {
            "id": "firebaseappdistribution.projects.apps.releases.batchDelete",
            "path": "v1/{+parent}/releases:batchDelete",
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
    distribute: {
      description: "distribute",
      arguments: z.object({
        groupAliases: z.any().optional(),
        testerEmails: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["groupAliases"] !== undefined) {
          body["groupAliases"] = args["groupAliases"];
        }
        if (args["testerEmails"] !== undefined) {
          body["testerEmails"] = args["testerEmails"];
        }
        const result = await createResource(
          baseUrl,
          {
            "id": "firebaseappdistribution.projects.apps.releases.distribute",
            "path": "v1/{+name}:distribute",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
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
