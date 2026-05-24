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

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  getProjectId,
  isResourceNotFoundError,
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

const GlobalArgsSchema = z.object({
  binaryDownloadUri: z.string().describe(
    "Output only. A signed link (which expires in one hour) to directly download the app binary (IPA/APK/AAB) file.",
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
  firebaseConsoleUri: z.string().describe(
    "Output only. A link to the Firebase console displaying a single release.",
  ).optional(),
  name: z.string().describe(
    "The name of the release resource. Format: `projects/{project_number}/apps/{app}/releases/{release}`",
  ).optional(),
  releaseNotes: z.object({
    text: z.string().describe("The text of the release notes.").optional(),
  }).describe("Notes that belong to a release.").optional(),
  testingUri: z.string().describe(
    "Output only. A link to the release in the tester web clip or Android app that lets testers (which were granted access to the app) view release notes and install the app onto their devices.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time the release was last updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  binaryDownloadUri: z.string().optional(),
  buildVersion: z.string().optional(),
  createTime: z.string().optional(),
  displayVersion: z.string().optional(),
  expireTime: z.string().optional(),
  firebaseConsoleUri: z.string().optional(),
  name: z.string(),
  releaseNotes: z.object({
    text: z.string(),
  }).optional(),
  testingUri: z.string().optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  binaryDownloadUri: z.string().describe(
    "Output only. A signed link (which expires in one hour) to directly download the app binary (IPA/APK/AAB) file.",
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
  firebaseConsoleUri: z.string().describe(
    "Output only. A link to the Firebase console displaying a single release.",
  ).optional(),
  name: z.string().describe(
    "The name of the release resource. Format: `projects/{project_number}/apps/{app}/releases/{release}`",
  ).optional(),
  releaseNotes: z.object({
    text: z.string().describe("The text of the release notes.").optional(),
  }).describe("Notes that belong to a release.").optional(),
  testingUri: z.string().describe(
    "Output only. A link to the release in the tester web clip or Android app that lets testers (which were granted access to the app) view release notes and install the app onto their devices.",
  ).optional(),
  updateTime: z.string().describe(
    "Output only. The time the release was last updated.",
  ).optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firebase App Distribution Apps.Releases. Registered at `@swamp/gcp/firebaseappdistribution/apps-releases`. */
export const model = {
  type: "@swamp/gcp/firebaseappdistribution/apps-releases",
  version: "2026.05.24.1",
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["binaryDownloadUri"] !== undefined) {
          body["binaryDownloadUri"] = g["binaryDownloadUri"];
        }
        if (g["buildVersion"] !== undefined) {
          body["buildVersion"] = g["buildVersion"];
        }
        if (g["createTime"] !== undefined) body["createTime"] = g["createTime"];
        if (g["displayVersion"] !== undefined) {
          body["displayVersion"] = g["displayVersion"];
        }
        if (g["expireTime"] !== undefined) body["expireTime"] = g["expireTime"];
        if (g["firebaseConsoleUri"] !== undefined) {
          body["firebaseConsoleUri"] = g["firebaseConsoleUri"];
        }
        if (g["releaseNotes"] !== undefined) {
          body["releaseNotes"] = g["releaseNotes"];
        }
        if (g["testingUri"] !== undefined) body["testingUri"] = g["testingUri"];
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
    sync: {
      description: "Sync releases state from GCP",
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
          const shortName = existing.name?.toString() ?? g["name"]?.toString();
          if (!shortName) throw new Error("No identifier found");
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            shortName,
          );
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
    batch_delete: {
      description: "batch delete",
      arguments: z.object({
        names: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["names"] !== undefined) body["names"] = args["names"];
        const result = await createResource(
          BASE_URL,
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
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
          BASE_URL,
          {
            "id": "firebaseappdistribution.projects.apps.releases.distribute",
            "path": "v1/{+name}:distribute",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
