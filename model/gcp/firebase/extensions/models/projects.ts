// Auto-generated extension model for @swamp/gcp/firebase/projects
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Firebase Management Projects.
 *
 * A `FirebaseProject` is the top-level Firebase entity. It is the container for Firebase Apps, Firebase Hosting sites, storage systems (Firebase Realtime Database, Cloud Firestore, Cloud Storage buckets), and other Firebase and Google Cloud resources. You create a `FirebaseProject` by calling AddFirebase and specifying an *existing* [Google Cloud `Project`](https://cloud.google.com/resource-manager/reference/rest/v1/projects). This adds Firebase resources to the existing Google Cloud `Project`. Since a FirebaseProject is actually also a Google Cloud `Project`, a `FirebaseProject` has the same underlying Google Cloud identifiers (`projectNumber` and `projectId`). This allows for easy interop with Google APIs.
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

const BASE_URL = "https://firebase.googleapis.com/";

const GET_CONFIG = {
  "id": "firebase.projects.get",
  "path": "v1beta1/{+name}",
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
  "id": "firebase.projects.patch",
  "path": "v1beta1/{+name}",
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

const DELETE_CONFIG = {
  "id": "firebase.projects.removeAnalytics",
  "path": "v1beta1/{+parent}:removeAnalytics",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "A set of user-defined annotations for the FirebaseProject. Learn more about annotations in Google's [AIP-128 standard](https://google.aip.dev/128#annotations). These annotations are intended solely for developers and client-side tools. Firebase services will not mutate this annotations set.",
  ).optional(),
  displayName: z.string().describe(
    "The user-assigned display name of the Project.",
  ).optional(),
  etag: z.string().describe(
    "This checksum is computed by the server based on the value of other fields, and it may be sent with update requests to ensure the client has an up-to-date value before proceeding. Learn more about `etag` in Google's [AIP-154 standard](https://google.aip.dev/154#declarative-friendly-resources). This etag is strongly validated.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the Project, in the format: projects/PROJECT_IDENTIFIER PROJECT_IDENTIFIER: the Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`.",
  ).optional(),
  projectId: z.string().describe(
    "Output only. Immutable. A user-assigned unique identifier for the Project. This identifier may appear in URLs or names for some Firebase resources associated with the Project, but it should generally be treated as a convenience alias to reference the Project.",
  ).optional(),
  projectNumber: z.string().describe(
    "Output only. Immutable. The globally unique, Google-assigned canonical identifier for the Project. Use this identifier when configuring integrations and/or making API calls to Firebase or third-party services.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "DELETED"]).describe(
    "Output only. The lifecycle state of the Project.",
  ).optional(),
});

const StateSchema = z.object({
  annotations: z.record(z.string(), z.unknown()).optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  name: z.string(),
  projectId: z.string().optional(),
  projectNumber: z.string().optional(),
  resources: z.object({
    hostingSite: z.string(),
    locationId: z.string(),
    realtimeDatabaseInstance: z.string(),
    storageBucket: z.string(),
  }).optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  annotations: z.record(z.string(), z.string()).describe(
    "A set of user-defined annotations for the FirebaseProject. Learn more about annotations in Google's [AIP-128 standard](https://google.aip.dev/128#annotations). These annotations are intended solely for developers and client-side tools. Firebase services will not mutate this annotations set.",
  ).optional(),
  displayName: z.string().describe(
    "The user-assigned display name of the Project.",
  ).optional(),
  etag: z.string().describe(
    "This checksum is computed by the server based on the value of other fields, and it may be sent with update requests to ensure the client has an up-to-date value before proceeding. Learn more about `etag` in Google's [AIP-154 standard](https://google.aip.dev/154#declarative-friendly-resources). This etag is strongly validated.",
  ).optional(),
  name: z.string().describe(
    "The resource name of the Project, in the format: projects/PROJECT_IDENTIFIER PROJECT_IDENTIFIER: the Project's [`ProjectNumber`](../projects#FirebaseProject.FIELDS.project_number) ***(recommended)*** or its [`ProjectId`](../projects#FirebaseProject.FIELDS.project_id). Learn more about using project identifiers in Google's [AIP 2510 standard](https://google.aip.dev/cloud/2510). Note that the value for PROJECT_IDENTIFIER in any response body will be the `ProjectId`.",
  ).optional(),
  projectId: z.string().describe(
    "Output only. Immutable. A user-assigned unique identifier for the Project. This identifier may appear in URLs or names for some Firebase resources associated with the Project, but it should generally be treated as a convenience alias to reference the Project.",
  ).optional(),
  projectNumber: z.string().describe(
    "Output only. Immutable. The globally unique, Google-assigned canonical identifier for the Project. Use this identifier when configuring integrations and/or making API calls to Firebase or third-party services.",
  ).optional(),
  state: z.enum(["STATE_UNSPECIFIED", "ACTIVE", "DELETED"]).describe(
    "Output only. The lifecycle state of the Project.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Firebase Management Projects. Registered at `@swamp/gcp/firebase/projects`. */
export const model = {
  type: "@swamp/gcp/firebase/projects",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A `FirebaseProject` is the top-level Firebase entity. It is the container for...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a projects",
      arguments: z.object({
        identifier: z.string().describe("The name of the projects"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
      description: "Update projects attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
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
        params["name"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["annotations"] !== undefined) {
          body["annotations"] = g["annotations"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["etag"] !== undefined) body["etag"] = g["etag"];
        if (g["projectId"] !== undefined) body["projectId"] = g["projectId"];
        if (g["projectNumber"] !== undefined) {
          body["projectNumber"] = g["projectNumber"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "state",
              "readyValues": ["ACTIVE"],
              "failedValues": [],
            }
            : undefined,
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
      description: "Delete the projects",
      arguments: z.object({
        identifier: z.string().describe("The name of the projects"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = args.identifier;
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
      description: "Sync projects state from GCP",
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
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["name"] = identifier;
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
    add_firebase: {
      description: "add firebase",
      arguments: z.object({
        locationId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["locationId"] !== undefined) {
          body["locationId"] = args["locationId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firebase.projects.addFirebase",
            "path": "v1beta1/{+project}:addFirebase",
            "httpMethod": "POST",
            "parameterOrder": ["project"],
            "parameters": {
              "project": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    add_google_analytics: {
      description: "add google analytics",
      arguments: z.object({
        analyticsAccountId: z.any().optional(),
        analyticsPropertyId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["analyticsAccountId"] !== undefined) {
          body["analyticsAccountId"] = args["analyticsAccountId"];
        }
        if (args["analyticsPropertyId"] !== undefined) {
          body["analyticsPropertyId"] = args["analyticsPropertyId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "firebase.projects.addGoogleAnalytics",
            "path": "v1beta1/{+parent}:addGoogleAnalytics",
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
    get_admin_sdk_config: {
      description: "get admin sdk config",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "firebase.projects.getAdminSdkConfig",
            "path": "v1beta1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    get_analytics_details: {
      description: "get analytics details",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "firebase.projects.getAnalyticsDetails",
            "path": "v1beta1/{+name}",
            "httpMethod": "GET",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
    search_apps: {
      description: "search apps",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const result = await createResource(
          BASE_URL,
          {
            "id": "firebase.projects.searchApps",
            "path": "v1beta1/{+parent}:searchApps",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "filter": { "location": "query" },
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
              "showDeleted": { "location": "query" },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
