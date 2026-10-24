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

// Auto-generated extension model for @swamp/gcp/androidpublisher/appstorecatalog-recentappviews
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Appstorecatalog.Recentappviews.
 *
 * Metadata about a recently updated app.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "androidpublisher.appstorecatalog.recentappviews.get",
  "path":
    "androidpublisher/v3/appstorecatalog/{appStorePackageName}/recentAppViews/{playAppPackageName}",
  "httpMethod": "GET",
  "parameterOrder": [
    "appStorePackageName",
    "playAppPackageName",
  ],
  "parameters": {
    "appStorePackageName": {
      "location": "path",
      "required": true,
    },
    "playAppPackageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const _defaultOAuthScopes: string[] = [
  "https://www.googleapis.com/auth/androidpublisher",
];

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  appStorePackageName: z.string().describe(
    "Required. The package name of the app store on behalf of which the request is made.",
  ),
});

const StateSchema = z.object({
  appView: z.object({
    activeVersionNames: z.array(z.string()),
    appCategory: z.string(),
    appContactInformation: z.object({
      contactEmail: z.string(),
      phoneNumber: z.string(),
      websiteUrl: z.string(),
    }),
    appSubcategory: z.string(),
    deliveryToken: z.string(),
    developerDetails: z.object({
      address: z.string(),
      contactEmail: z.string(),
      developerName: z.string(),
      phoneNumber: z.string(),
      website: z.string(),
    }),
    deviceCompatibilityRequirements: z.array(z.object({
      compatibleScreens: z.array(z.object({
        density: z.unknown(),
        screenSize: z.unknown(),
      })),
      glEsVersion: z.number(),
      isScreenRequired: z.boolean(),
      nativePlatforms: z.array(z.string()),
      requiredSoftwareLibraries: z.array(z.string()),
      requiredSystemFeatures: z.array(z.string()),
      requiresSmallestWidthDp: z.string(),
      sdkVersion: z.object({
        maxSdkVersion: z.string(),
        minSdkVersion: z.string(),
        targetSdkVersion: z.string(),
      }),
      supportedGlTextures: z.array(z.string()),
      supportedScreens: z.array(z.string()),
      use32BitAbi: z.string(),
      usesConfigurations: z.array(z.object({
        requiredKeyboardType: z.unknown(),
        requiredNavigationType: z.unknown(),
        requiredTouchscreenType: z.unknown(),
        requiresFiveWayNavigation: z.unknown(),
        requiresHardwareKeyboard: z.unknown(),
      })),
    })),
    excludedDevicesByIdentifier: z.array(z.object({
      deviceBrand: z.string(),
      deviceModel: z.string(),
    })),
    excludedDevicesBySelector: z.array(z.object({
      deviceTypeSelector: z.string(),
      ramSelector: z.object({
        ramMbLessThanOrEqual: z.string(),
      }),
      socSelectors: z.array(z.object({
        socMake: z.unknown(),
        socModel: z.unknown(),
      })),
    })),
    firstReleaseDate: z.object({
      day: z.number(),
      month: z.number(),
      year: z.number(),
    }),
    hasInAppAds: z.boolean(),
    hasInAppPurchases: z.boolean(),
    iarcCertificateId: z.string(),
    isAdultOnlyAudience: z.boolean(),
    lastPublishTime: z.string(),
    localizedStoreListings: z.object({
      defaultLanguageCode: z.string(),
      localizedStoreListings: z.array(z.object({
        appName: z.string(),
        featureGraphic: z.object({
          imageUrl: z.unknown(),
        }),
        fullDescription: z.string(),
        icon: z.object({
          imageUrl: z.unknown(),
        }),
        languageCode: z.string(),
        phoneScreenshots: z.object({
          screenshots: z.unknown(),
        }),
        shortDescription: z.string(),
        tabletRegularScreenshots: z.object({
          screenshots: z.unknown(),
        }),
        tabletSmallScreenshots: z.object({
          screenshots: z.unknown(),
        }),
        video: z.object({
          videoUrl: z.unknown(),
        }),
      })),
    }),
    packageName: z.string(),
    permissions: z.array(z.object({
      maxSdkVersion: z.number(),
      name: z.string(),
    })),
    permissionsSdk23: z.array(z.object({
      maxSdkVersion: z.number(),
      name: z.string(),
    })),
    priceInTheUnitedStates: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
    privacyPolicyUrl: z.string(),
    salePriceInTheUnitedStates: z.object({
      currencyCode: z.string(),
      nanos: z.number(),
      units: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  scopes: z.string().optional(),
  quotaProject: z.string().optional(),
  apiEndpoint: z.string().optional(),
  appStorePackageName: z.string().describe(
    "Required. The package name of the app store on behalf of which the request is made.",
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

/** Swamp extension model for Google Cloud Google Play Android Developer Appstorecatalog.Recentappviews. Registered at `@swamp/gcp/androidpublisher/appstorecatalog-recentappviews`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/appstorecatalog-recentappviews",
  version: "2026.10.23.1",
  upgrades: [
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
      description: "Metadata about a recently updated app.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a recentappviews",
      arguments: z.object({
        identifier: z.string().describe("The name of the recentappviews"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const baseUrl = g["apiEndpoint"]?.toString() ??
          Deno.env.get("GCP_API_ENDPOINT")?.trim() ?? BASE_URL;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["appStorePackageName"] !== undefined) {
          params["appStorePackageName"] = String(g["appStorePackageName"]);
        }
        params["playAppPackageName"] = args.identifier;
        const result = await readResource(
          baseUrl,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Sync recentappviews state from GCP",
      arguments: z.object({
        identifier: z.string().describe(
          "Target a specific recentappviews by name (e.g. one discovered by list)",
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
          if (g["appStorePackageName"] !== undefined) {
            params["appStorePackageName"] = String(g["appStorePackageName"]);
          } else if (existing["appStorePackageName"]) {
            params["appStorePackageName"] = String(
              existing["appStorePackageName"],
            );
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["playAppPackageName"] = identifier;
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
  },
};
