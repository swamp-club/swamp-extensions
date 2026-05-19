// Auto-generated extension model for @swamp/gcp/dfareporting/advertiserlandingpages
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 AdvertiserLandingPages.
 *
 * Contains information about where a user's browser is taken after the user clicks an ad.
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

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.advertiserLandingPages.get",
  "path": "userprofiles/{+profileId}/advertiserLandingPages/{+id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "dfareporting.advertiserLandingPages.insert",
  "path": "userprofiles/{+profileId}/advertiserLandingPages",
  "httpMethod": "POST",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "dfareporting.advertiserLandingPages.update",
  "path": "userprofiles/{+profileId}/advertiserLandingPages",
  "httpMethod": "PUT",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "profileId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  advertiserId: z.string().describe(
    "Advertiser ID of this landing page. This is a required field.",
  ).optional(),
  archived: z.boolean().describe("Whether this landing page has been archived.")
    .optional(),
  deepLinks: z.array(z.object({
    appUrl: z.string().describe("The URL of the mobile app being linked to.")
      .optional(),
    fallbackUrl: z.string().describe(
      "The fallback URL. This URL will be served to users who do not have the mobile app installed.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#deepLink".',
    ).optional(),
    mobileApp: z.object({
      directory: z.enum([
        "UNKNOWN",
        "APPLE_APP_STORE",
        "GOOGLE_PLAY_STORE",
        "ROKU_APP_STORE",
        "AMAZON_FIRETV_APP_STORE",
        "PLAYSTATION_APP_STORE",
        "APPLE_TV_APP_STORE",
        "XBOX_APP_STORE",
        "SAMSUNG_TV_APP_STORE",
        "ANDROID_TV_APP_STORE",
        "GENERIC_CTV_APP_STORE",
      ]).describe("Mobile app directory.").optional(),
      id: z.string().describe("ID of this mobile app.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileApp".',
      ).optional(),
      publisherName: z.string().describe("Publisher name.").optional(),
      title: z.string().describe("Title of this mobile app.").optional(),
    }).describe(
      "Contains information about a mobile app. Used as a landing page deep link.",
    ).optional(),
    remarketingListIds: z.array(z.string()).describe(
      "Ads served to users on these remarketing lists will use this deep link. Applicable when mobileApp.directory is APPLE_APP_STORE.",
    ).optional(),
  })).describe("Links that will direct the user to a mobile app, if installed.")
    .optional(),
  id: z.string().describe(
    "ID of this landing page. This is a read-only, auto-generated field.",
  ).optional(),
  name: z.string().describe(
    "Name of this landing page. This is a required field. It must be less than 256 characters long.",
  ).optional(),
  url: z.string().describe(
    "URL of this landing page. This is a required field.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  advertiserId: z.string().optional(),
  archived: z.boolean().optional(),
  deepLinks: z.array(z.object({
    appUrl: z.string(),
    fallbackUrl: z.string(),
    kind: z.string(),
    mobileApp: z.object({
      directory: z.string(),
      id: z.string(),
      kind: z.string(),
      publisherName: z.string(),
      title: z.string(),
    }),
    remarketingListIds: z.array(z.string()),
  })).optional(),
  id: z.string(),
  kind: z.string().optional(),
  name: z.string().optional(),
  url: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  advertiserId: z.string().describe(
    "Advertiser ID of this landing page. This is a required field.",
  ).optional(),
  archived: z.boolean().describe("Whether this landing page has been archived.")
    .optional(),
  deepLinks: z.array(z.object({
    appUrl: z.string().describe("The URL of the mobile app being linked to.")
      .optional(),
    fallbackUrl: z.string().describe(
      "The fallback URL. This URL will be served to users who do not have the mobile app installed.",
    ).optional(),
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#deepLink".',
    ).optional(),
    mobileApp: z.object({
      directory: z.enum([
        "UNKNOWN",
        "APPLE_APP_STORE",
        "GOOGLE_PLAY_STORE",
        "ROKU_APP_STORE",
        "AMAZON_FIRETV_APP_STORE",
        "PLAYSTATION_APP_STORE",
        "APPLE_TV_APP_STORE",
        "XBOX_APP_STORE",
        "SAMSUNG_TV_APP_STORE",
        "ANDROID_TV_APP_STORE",
        "GENERIC_CTV_APP_STORE",
      ]).describe("Mobile app directory.").optional(),
      id: z.string().describe("ID of this mobile app.").optional(),
      kind: z.string().describe(
        'Identifies what kind of resource this is. Value: the fixed string "dfareporting#mobileApp".',
      ).optional(),
      publisherName: z.string().describe("Publisher name.").optional(),
      title: z.string().describe("Title of this mobile app.").optional(),
    }).describe(
      "Contains information about a mobile app. Used as a landing page deep link.",
    ).optional(),
    remarketingListIds: z.array(z.string()).describe(
      "Ads served to users on these remarketing lists will use this deep link. Applicable when mobileApp.directory is APPLE_APP_STORE.",
    ).optional(),
  })).describe("Links that will direct the user to a mobile app, if installed.")
    .optional(),
  id: z.string().describe(
    "ID of this landing page. This is a read-only, auto-generated field.",
  ).optional(),
  name: z.string().describe(
    "Name of this landing page. This is a required field. It must be less than 256 characters long.",
  ).optional(),
  url: z.string().describe(
    "URL of this landing page. This is a required field.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 AdvertiserLandingPages. Registered at `@swamp/gcp/dfareporting/advertiserlandingpages`. */
export const model = {
  type: "@swamp/gcp/dfareporting/advertiserlandingpages",
  version: "2026.05.19.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Contains information about where a user's browser is taken after the user cli...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a advertiserLandingPages",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["archived"] !== undefined) body["archived"] = g["archived"];
        if (g["deepLinks"] !== undefined) body["deepLinks"] = g["deepLinks"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["url"] !== undefined) body["url"] = g["url"];
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = ((result.id ?? g.id)?.toString() ?? "current")
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
      description: "Get a advertiserLandingPages",
      arguments: z.object({
        identifier: z.string().describe("The id of the advertiserLandingPages"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.id ?? g.id)?.toString() ?? args.identifier).replace(
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
      description: "Update advertiserLandingPages attributes",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
        params["profileId"] = existing["id"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["archived"] !== undefined) body["archived"] = g["archived"];
        if (g["deepLinks"] !== undefined) body["deepLinks"] = g["deepLinks"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["url"] !== undefined) body["url"] = g["url"];
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
      description: "Sync advertiserLandingPages state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
          if (g["profileId"] !== undefined) {
            params["profileId"] = String(g["profileId"]);
          } else if (existing["profileId"]) {
            params["profileId"] = String(existing["profileId"]);
          }
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
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
