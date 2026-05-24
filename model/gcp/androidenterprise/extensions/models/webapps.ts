// Auto-generated extension model for @swamp/gcp/androidenterprise/webapps
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play EMM Webapps.
 *
 * A WebApps resource represents a web app created for an enterprise. Web apps are published to managed Google Play and can be distributed like other Android apps. On a user's device, a web app opens its specified URL.
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

const BASE_URL = "https://androidenterprise.googleapis.com/";

const GET_CONFIG = {
  "id": "androidenterprise.webapps.get",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/webApps/{webAppId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
    "webAppId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "webAppId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "androidenterprise.webapps.insert",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/webApps",
  "httpMethod": "POST",
  "parameterOrder": [
    "enterpriseId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "androidenterprise.webapps.update",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/webApps/{webAppId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "enterpriseId",
    "webAppId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "webAppId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidenterprise.webapps.delete",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/webApps/{webAppId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "enterpriseId",
    "webAppId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "webAppId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidenterprise.webapps.list",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/webApps",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  displayMode: z.enum([
    "displayModeUnspecified",
    "minimalUi",
    "standalone",
    "fullScreen",
  ]).describe(
    'The display mode of the web app. Possible values include: - "minimalUi", the device\'s status bar, navigation bar, the app\'s URL, and a refresh button are visible when the app is open. For HTTP URLs, you can only select this option. - "standalone", the device\'s status bar and navigation bar are visible when the app is open. - "fullScreen", the app opens in full screen mode, hiding the device\'s status and navigation bars. All browser UI elements, page URL, system status bar and back button are not visible, and the web app takes up the entirety of the available display area.',
  ).optional(),
  icons: z.array(z.object({
    imageData: z.string().describe(
      'The actual bytes of the image in a base64url encoded string (c.f. RFC4648, section 5 "Base 64 Encoding with URL and Filename Safe Alphabet"). - The image type can be png or jpg. - The image should ideally be square. - The image should ideally have a size of 512x512.',
    ).optional(),
  })).describe(
    "A list of icons representing this website. If absent, a default icon (for create) or the current icon (for update) will be used.",
  ).optional(),
  isPublished: z.boolean().describe(
    "A flag whether the app has been published to the Play store yet.",
  ).optional(),
  startUrl: z.string().describe(
    "The start URL, i.e. the URL that should load when the user opens the application.",
  ).optional(),
  title: z.string().describe(
    "The title of the web app as displayed to the user (e.g., amongst a list of other applications, or as a label for an icon).",
  ).optional(),
  versionCode: z.string().describe(
    "The current version of the app. Note that the version can automatically increase during the lifetime of the web app, while Google does internal housekeeping to keep the web app up-to-date.",
  ).optional(),
  webAppId: z.string().describe(
    'The ID of the application. A string of the form "app:" where the package name always starts with the prefix "com.google.enterprise.webapp." followed by a random id.',
  ).optional(),
  enterpriseId: z.string().describe("The ID of the enterprise."),
});

const StateSchema = z.object({
  displayMode: z.string().optional(),
  icons: z.array(z.object({
    imageData: z.string(),
  })).optional(),
  isPublished: z.boolean().optional(),
  startUrl: z.string().optional(),
  title: z.string().optional(),
  versionCode: z.string().optional(),
  webAppId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  displayMode: z.enum([
    "displayModeUnspecified",
    "minimalUi",
    "standalone",
    "fullScreen",
  ]).describe(
    'The display mode of the web app. Possible values include: - "minimalUi", the device\'s status bar, navigation bar, the app\'s URL, and a refresh button are visible when the app is open. For HTTP URLs, you can only select this option. - "standalone", the device\'s status bar and navigation bar are visible when the app is open. - "fullScreen", the app opens in full screen mode, hiding the device\'s status and navigation bars. All browser UI elements, page URL, system status bar and back button are not visible, and the web app takes up the entirety of the available display area.',
  ).optional(),
  icons: z.array(z.object({
    imageData: z.string().describe(
      'The actual bytes of the image in a base64url encoded string (c.f. RFC4648, section 5 "Base 64 Encoding with URL and Filename Safe Alphabet"). - The image type can be png or jpg. - The image should ideally be square. - The image should ideally have a size of 512x512.',
    ).optional(),
  })).describe(
    "A list of icons representing this website. If absent, a default icon (for create) or the current icon (for update) will be used.",
  ).optional(),
  isPublished: z.boolean().describe(
    "A flag whether the app has been published to the Play store yet.",
  ).optional(),
  startUrl: z.string().describe(
    "The start URL, i.e. the URL that should load when the user opens the application.",
  ).optional(),
  title: z.string().describe(
    "The title of the web app as displayed to the user (e.g., amongst a list of other applications, or as a label for an icon).",
  ).optional(),
  versionCode: z.string().describe(
    "The current version of the app. Note that the version can automatically increase during the lifetime of the web app, while Google does internal housekeeping to keep the web app up-to-date.",
  ).optional(),
  webAppId: z.string().describe(
    'The ID of the application. A string of the form "app:" where the package name always starts with the prefix "com.google.enterprise.webapp." followed by a random id.',
  ).optional(),
  enterpriseId: z.string().describe("The ID of the enterprise.").optional(),
});

/** Swamp extension model for Google Cloud Google Play EMM Webapps. Registered at `@swamp/gcp/androidenterprise/webapps`. */
export const model = {
  type: "@swamp/gcp/androidenterprise/webapps",
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
      description:
        "A WebApps resource represents a web app created for an enterprise. Web apps a...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a webapps",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["displayMode"] !== undefined) {
          body["displayMode"] = g["displayMode"];
        }
        if (g["icons"] !== undefined) body["icons"] = g["icons"];
        if (g["isPublished"] !== undefined) {
          body["isPublished"] = g["isPublished"];
        }
        if (g["startUrl"] !== undefined) body["startUrl"] = g["startUrl"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["versionCode"] !== undefined) {
          body["versionCode"] = g["versionCode"];
        }
        if (g["webAppId"] !== undefined) body["webAppId"] = g["webAppId"];
        if (g["name"] !== undefined) params["webAppId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "enterpriseId": String(g["enterpriseId"] ?? "") },
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
      description: "Get a webapps",
      arguments: z.object({
        identifier: z.string().describe("The name of the webapps"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        params["webAppId"] = args.identifier;
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
      description: "Update webapps attributes",
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
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        } else if (existing["enterpriseId"]) {
          params["enterpriseId"] = String(existing["enterpriseId"]);
        }
        params["webAppId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["displayMode"] !== undefined) {
          body["displayMode"] = g["displayMode"];
        }
        if (g["icons"] !== undefined) body["icons"] = g["icons"];
        if (g["isPublished"] !== undefined) {
          body["isPublished"] = g["isPublished"];
        }
        if (g["startUrl"] !== undefined) body["startUrl"] = g["startUrl"];
        if (g["title"] !== undefined) body["title"] = g["title"];
        if (g["versionCode"] !== undefined) {
          body["versionCode"] = g["versionCode"];
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
    delete: {
      description: "Delete the webapps",
      arguments: z.object({
        identifier: z.string().describe("The name of the webapps"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        params["webAppId"] = args.identifier;
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
      description: "Sync webapps state from GCP",
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
          if (g["enterpriseId"] !== undefined) {
            params["enterpriseId"] = String(g["enterpriseId"]);
          } else if (existing["enterpriseId"]) {
            params["enterpriseId"] = String(existing["enterpriseId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["webAppId"] = identifier;
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
