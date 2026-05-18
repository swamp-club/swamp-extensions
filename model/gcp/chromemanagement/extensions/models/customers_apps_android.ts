// Auto-generated extension model for @swamp/gcp/chromemanagement/customers-apps-android
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Chrome Management Customers.Apps.Android.
 *
 * Resource representing app details.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://chromemanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "chromemanagement.customers.apps.android.get",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  androidAppInfo: z.object({
    permissions: z.array(z.object({
      type: z.string(),
    })),
  }).optional(),
  appId: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
  chromeAppInfo: z.object({
    googleOwned: z.boolean(),
    isCwsHosted: z.boolean(),
    isExtensionPolicySupported: z.boolean(),
    isKioskOnly: z.boolean(),
    isTheme: z.boolean(),
    kioskEnabled: z.boolean(),
    manifestVersion: z.string(),
    minUserCount: z.number(),
    permissions: z.array(z.object({
      accessUserData: z.boolean(),
      documentationUri: z.string(),
      type: z.string(),
    })),
    siteAccess: z.array(z.object({
      hostMatch: z.string(),
    })),
    supportEnabled: z.boolean(),
    type: z.string(),
  }).optional(),
  description: z.string().optional(),
  detailUri: z.string().optional(),
  displayName: z.string().optional(),
  firstPublishTime: z.string().optional(),
  homepageUri: z.string().optional(),
  iconUri: z.string().optional(),
  isPaidApp: z.boolean().optional(),
  latestPublishTime: z.string().optional(),
  name: z.string(),
  privacyPolicyUri: z.string().optional(),
  publisher: z.string().optional(),
  reviewNumber: z.string().optional(),
  reviewRating: z.number().optional(),
  revisionId: z.string().optional(),
  serviceError: z.object({
    code: z.number(),
    details: z.array(z.record(z.string(), z.unknown())),
    message: z.string(),
  }).optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Chrome Management Customers.Apps.Android. Registered at `@swamp/gcp/chromemanagement/customers-apps-android`. */
export const model = {
  type: "@swamp/gcp/chromemanagement/customers-apps-android",
  version: "2026.05.18.2",
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
      toVersion: "2026.04.19.1",
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
      toVersion: "2026.05.18.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Resource representing app details.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a android",
      arguments: z.object({
        identifier: z.string().describe("The name of the android"),
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
    sync: {
      description: "Sync android state from GCP",
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
  },
};
