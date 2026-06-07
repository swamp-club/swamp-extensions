// Auto-generated extension model for @swamp/gcp/realtimebidding/bidders-pretargetingconfigs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Real-time Bidding Bidders.PretargetingConfigs.
 *
 * Pretargeting config: a set of targeting dimensions applied at the pretargeting stage of the RTB funnel. These control which inventory a bidder will receive bid requests for.
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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/pretargetingConfigs/${shortName}`;
}

const BASE_URL = "https://realtimebidding.googleapis.com/";

const GET_CONFIG = {
  "id": "realtimebidding.bidders.pretargetingConfigs.get",
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

const INSERT_CONFIG = {
  "id": "realtimebidding.bidders.pretargetingConfigs.create",
  "path": "v1/{+parent}/pretargetingConfigs",
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

const PATCH_CONFIG = {
  "id": "realtimebidding.bidders.pretargetingConfigs.patch",
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

const DELETE_CONFIG = {
  "id": "realtimebidding.bidders.pretargetingConfigs.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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

const LIST_CONFIG = {
  "id": "realtimebidding.bidders.pretargetingConfigs.list",
  "path": "v1/{+parent}/pretargetingConfigs",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  allowedUserTargetingModes: z.array(
    z.enum([
      "USER_TARGETING_MODE_UNSPECIFIED",
      "REMARKETING_ADS",
      "INTEREST_BASED_TARGETING",
    ]),
  ).describe(
    "Targeting modes included by this config. A bid request must allow all the specified targeting modes. An unset value allows all bid requests to be sent, regardless of which targeting modes they allow.",
  ).optional(),
  appTargeting: z.object({
    mobileAppCategoryTargeting: z.object({
      excludedIds: z.array(z.string()).describe("The IDs excluded in a config.")
        .optional(),
      includedIds: z.array(z.string()).describe("The IDs included in a config.")
        .optional(),
    }).describe(
      "Generic targeting used for targeting dimensions that contain a list of included and excluded numeric IDs used in app, user list, geo, and vertical id targeting.",
    ).optional(),
    mobileAppTargeting: z.object({
      targetingMode: z.enum([
        "TARGETING_MODE_UNSPECIFIED",
        "INCLUSIVE",
        "EXCLUSIVE",
      ]).describe("How the items in this list should be targeted.").optional(),
      values: z.array(z.string()).describe("The values specified.").optional(),
    }).describe(
      "Generic targeting with string values used in app, website and publisher targeting.",
    ).optional(),
  }).describe(
    "A subset of app inventory to target. Bid requests that match criteria in at least one of the specified dimensions will be sent.",
  ).optional(),
  displayName: z.string().describe(
    "The diplay name associated with this config. This name must be unique among all the pretargeting configs a bidder has.",
  ).optional(),
  excludedContentLabelIds: z.array(z.string()).describe(
    "The sensitive content category label IDs excluded in this config. Bid requests for inventory with any of the specified content label IDs will not be sent. Refer to this file https://storage.googleapis.com/adx-rtb-dictionaries/content-labels.txt for category IDs.",
  ).optional(),
  geoTargeting: z.object({
    excludedIds: z.array(z.string()).describe("The IDs excluded in a config.")
      .optional(),
    includedIds: z.array(z.string()).describe("The IDs included in a config.")
      .optional(),
  }).describe(
    "Generic targeting used for targeting dimensions that contain a list of included and excluded numeric IDs used in app, user list, geo, and vertical id targeting.",
  ).optional(),
  includedCreativeDimensions: z.array(z.object({
    height: z.string().describe("The height of the creative in pixels.")
      .optional(),
    width: z.string().describe("The width of the creative in pixels.")
      .optional(),
  })).describe(
    "Creative dimensions included by this config. Only bid requests eligible for at least one of the specified creative dimensions will be sent. An unset value allows all bid requests to be sent, regardless of creative dimension.",
  ).optional(),
  includedEnvironments: z.array(
    z.enum(["ENVIRONMENT_UNSPECIFIED", "APP", "WEB"]),
  ).describe(
    "Environments that are being included. Bid requests will not be sent for a given environment if it is not included. Further restrictions can be applied to included environments to target only a subset of its inventory. An unset value includes all environments.",
  ).optional(),
  includedFormats: z.array(
    z.enum(["CREATIVE_FORMAT_UNSPECIFIED", "HTML", "VAST", "NATIVE"]),
  ).describe(
    "Creative formats included by this config. Only bid requests eligible for at least one of the specified creative formats will be sent. An unset value will allow all bid requests to be sent, regardless of format.",
  ).optional(),
  includedLanguages: z.array(z.string()).describe(
    "The languages included in this config, represented by their language code. See https://developers.google.com/adwords/api/docs/appendix/languagecodes.",
  ).optional(),
  includedMobileOperatingSystemIds: z.array(z.string()).describe(
    "The mobile operating systems included in this config as defined in https://storage.googleapis.com/adx-rtb-dictionaries/mobile-os.csv",
  ).optional(),
  includedPlatforms: z.array(
    z.enum([
      "PLATFORM_UNSPECIFIED",
      "PERSONAL_COMPUTER",
      "PHONE",
      "TABLET",
      "CONNECTED_TV",
    ]),
  ).describe(
    "The platforms included by this config. Bid requests for devices with the specified platform types will be sent. An unset value allows all bid requests to be sent, regardless of platform.",
  ).optional(),
  includedUserIdTypes: z.array(
    z.enum([
      "USER_ID_TYPE_UNSPECIFIED",
      "HOSTED_MATCH_DATA",
      "GOOGLE_COOKIE",
      "DEVICE_ID",
      "PUBLISHER_PROVIDED_ID",
      "PUBLISHER_FIRST_PARTY_ID",
    ]),
  ).describe(
    "User identifier types included in this config. At least one of the user identifier types specified in this list must be available for the bid request to be sent.",
  ).optional(),
  interstitialTargeting: z.enum([
    "INTERSTITIAL_TARGETING_UNSPECIFIED",
    "ONLY_INTERSTITIAL_REQUESTS",
    "ONLY_NON_INTERSTITIAL_REQUESTS",
  ]).describe(
    "The interstitial targeting specified for this config. The unset value will allow bid requests to be sent regardless of whether they are for interstitials or not.",
  ).optional(),
  maximumQps: z.string().describe(
    "The maximum QPS threshold for this config. The bidder should receive no more than this number of bid requests matching this config per second across all their bidding endpoints among all trading locations. Further information available at https://developers.google.com/authorized-buyers/rtb/peer-guide",
  ).optional(),
  minimumViewabilityDecile: z.number().int().describe(
    "The targeted minimum viewability decile, ranging in values [0, 10]. A value of 5 means that the config will only match adslots for which we predict at least 50% viewability. Values > 10 will be rounded down to 10. An unset value or a value of 0 indicates that bid requests will be sent regardless of viewability.",
  ).optional(),
  publisherTargeting: z.object({
    targetingMode: z.enum([
      "TARGETING_MODE_UNSPECIFIED",
      "INCLUSIVE",
      "EXCLUSIVE",
    ]).describe("How the items in this list should be targeted.").optional(),
    values: z.array(z.string()).describe("The values specified.").optional(),
  }).describe(
    "Generic targeting with string values used in app, website and publisher targeting.",
  ).optional(),
  userListTargeting: z.object({
    excludedIds: z.array(z.string()).describe("The IDs excluded in a config.")
      .optional(),
    includedIds: z.array(z.string()).describe("The IDs included in a config.")
      .optional(),
  }).describe(
    "Generic targeting used for targeting dimensions that contain a list of included and excluded numeric IDs used in app, user list, geo, and vertical id targeting.",
  ).optional(),
  verticalTargeting: z.object({
    excludedIds: z.array(z.string()).describe("The IDs excluded in a config.")
      .optional(),
    includedIds: z.array(z.string()).describe("The IDs included in a config.")
      .optional(),
  }).describe(
    "Generic targeting used for targeting dimensions that contain a list of included and excluded numeric IDs used in app, user list, geo, and vertical id targeting.",
  ).optional(),
  webTargeting: z.object({
    targetingMode: z.enum([
      "TARGETING_MODE_UNSPECIFIED",
      "INCLUSIVE",
      "EXCLUSIVE",
    ]).describe("How the items in this list should be targeted.").optional(),
    values: z.array(z.string()).describe("The values specified.").optional(),
  }).describe(
    "Generic targeting with string values used in app, website and publisher targeting.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  allowedUserTargetingModes: z.array(z.string()).optional(),
  appTargeting: z.object({
    mobileAppCategoryTargeting: z.object({
      excludedIds: z.array(z.string()),
      includedIds: z.array(z.string()),
    }),
    mobileAppTargeting: z.object({
      targetingMode: z.string(),
      values: z.array(z.string()),
    }),
  }).optional(),
  billingId: z.string().optional(),
  displayName: z.string().optional(),
  excludedContentLabelIds: z.array(z.string()).optional(),
  geoTargeting: z.object({
    excludedIds: z.array(z.string()),
    includedIds: z.array(z.string()),
  }).optional(),
  includedCreativeDimensions: z.array(z.object({
    height: z.string(),
    width: z.string(),
  })).optional(),
  includedEnvironments: z.array(z.string()).optional(),
  includedFormats: z.array(z.string()).optional(),
  includedLanguages: z.array(z.string()).optional(),
  includedMobileOperatingSystemIds: z.array(z.string()).optional(),
  includedPlatforms: z.array(z.string()).optional(),
  includedUserIdTypes: z.array(z.string()).optional(),
  interstitialTargeting: z.string().optional(),
  invalidGeoIds: z.array(z.string()).optional(),
  maximumQps: z.string().optional(),
  minimumViewabilityDecile: z.number().optional(),
  name: z.string(),
  publisherTargeting: z.object({
    targetingMode: z.string(),
    values: z.array(z.string()),
  }).optional(),
  state: z.string().optional(),
  userListTargeting: z.object({
    excludedIds: z.array(z.string()),
    includedIds: z.array(z.string()),
  }).optional(),
  verticalTargeting: z.object({
    excludedIds: z.array(z.string()),
    includedIds: z.array(z.string()),
  }).optional(),
  webTargeting: z.object({
    targetingMode: z.string(),
    values: z.array(z.string()),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  allowedUserTargetingModes: z.array(
    z.enum([
      "USER_TARGETING_MODE_UNSPECIFIED",
      "REMARKETING_ADS",
      "INTEREST_BASED_TARGETING",
    ]),
  ).describe(
    "Targeting modes included by this config. A bid request must allow all the specified targeting modes. An unset value allows all bid requests to be sent, regardless of which targeting modes they allow.",
  ).optional(),
  appTargeting: z.object({
    mobileAppCategoryTargeting: z.object({
      excludedIds: z.array(z.string()).describe("The IDs excluded in a config.")
        .optional(),
      includedIds: z.array(z.string()).describe("The IDs included in a config.")
        .optional(),
    }).describe(
      "Generic targeting used for targeting dimensions that contain a list of included and excluded numeric IDs used in app, user list, geo, and vertical id targeting.",
    ).optional(),
    mobileAppTargeting: z.object({
      targetingMode: z.enum([
        "TARGETING_MODE_UNSPECIFIED",
        "INCLUSIVE",
        "EXCLUSIVE",
      ]).describe("How the items in this list should be targeted.").optional(),
      values: z.array(z.string()).describe("The values specified.").optional(),
    }).describe(
      "Generic targeting with string values used in app, website and publisher targeting.",
    ).optional(),
  }).describe(
    "A subset of app inventory to target. Bid requests that match criteria in at least one of the specified dimensions will be sent.",
  ).optional(),
  displayName: z.string().describe(
    "The diplay name associated with this config. This name must be unique among all the pretargeting configs a bidder has.",
  ).optional(),
  excludedContentLabelIds: z.array(z.string()).describe(
    "The sensitive content category label IDs excluded in this config. Bid requests for inventory with any of the specified content label IDs will not be sent. Refer to this file https://storage.googleapis.com/adx-rtb-dictionaries/content-labels.txt for category IDs.",
  ).optional(),
  geoTargeting: z.object({
    excludedIds: z.array(z.string()).describe("The IDs excluded in a config.")
      .optional(),
    includedIds: z.array(z.string()).describe("The IDs included in a config.")
      .optional(),
  }).describe(
    "Generic targeting used for targeting dimensions that contain a list of included and excluded numeric IDs used in app, user list, geo, and vertical id targeting.",
  ).optional(),
  includedCreativeDimensions: z.array(z.object({
    height: z.string().describe("The height of the creative in pixels.")
      .optional(),
    width: z.string().describe("The width of the creative in pixels.")
      .optional(),
  })).describe(
    "Creative dimensions included by this config. Only bid requests eligible for at least one of the specified creative dimensions will be sent. An unset value allows all bid requests to be sent, regardless of creative dimension.",
  ).optional(),
  includedEnvironments: z.array(
    z.enum(["ENVIRONMENT_UNSPECIFIED", "APP", "WEB"]),
  ).describe(
    "Environments that are being included. Bid requests will not be sent for a given environment if it is not included. Further restrictions can be applied to included environments to target only a subset of its inventory. An unset value includes all environments.",
  ).optional(),
  includedFormats: z.array(
    z.enum(["CREATIVE_FORMAT_UNSPECIFIED", "HTML", "VAST", "NATIVE"]),
  ).describe(
    "Creative formats included by this config. Only bid requests eligible for at least one of the specified creative formats will be sent. An unset value will allow all bid requests to be sent, regardless of format.",
  ).optional(),
  includedLanguages: z.array(z.string()).describe(
    "The languages included in this config, represented by their language code. See https://developers.google.com/adwords/api/docs/appendix/languagecodes.",
  ).optional(),
  includedMobileOperatingSystemIds: z.array(z.string()).describe(
    "The mobile operating systems included in this config as defined in https://storage.googleapis.com/adx-rtb-dictionaries/mobile-os.csv",
  ).optional(),
  includedPlatforms: z.array(
    z.enum([
      "PLATFORM_UNSPECIFIED",
      "PERSONAL_COMPUTER",
      "PHONE",
      "TABLET",
      "CONNECTED_TV",
    ]),
  ).describe(
    "The platforms included by this config. Bid requests for devices with the specified platform types will be sent. An unset value allows all bid requests to be sent, regardless of platform.",
  ).optional(),
  includedUserIdTypes: z.array(
    z.enum([
      "USER_ID_TYPE_UNSPECIFIED",
      "HOSTED_MATCH_DATA",
      "GOOGLE_COOKIE",
      "DEVICE_ID",
      "PUBLISHER_PROVIDED_ID",
      "PUBLISHER_FIRST_PARTY_ID",
    ]),
  ).describe(
    "User identifier types included in this config. At least one of the user identifier types specified in this list must be available for the bid request to be sent.",
  ).optional(),
  interstitialTargeting: z.enum([
    "INTERSTITIAL_TARGETING_UNSPECIFIED",
    "ONLY_INTERSTITIAL_REQUESTS",
    "ONLY_NON_INTERSTITIAL_REQUESTS",
  ]).describe(
    "The interstitial targeting specified for this config. The unset value will allow bid requests to be sent regardless of whether they are for interstitials or not.",
  ).optional(),
  maximumQps: z.string().describe(
    "The maximum QPS threshold for this config. The bidder should receive no more than this number of bid requests matching this config per second across all their bidding endpoints among all trading locations. Further information available at https://developers.google.com/authorized-buyers/rtb/peer-guide",
  ).optional(),
  minimumViewabilityDecile: z.number().int().describe(
    "The targeted minimum viewability decile, ranging in values [0, 10]. A value of 5 means that the config will only match adslots for which we predict at least 50% viewability. Values > 10 will be rounded down to 10. An unset value or a value of 0 indicates that bid requests will be sent regardless of viewability.",
  ).optional(),
  publisherTargeting: z.object({
    targetingMode: z.enum([
      "TARGETING_MODE_UNSPECIFIED",
      "INCLUSIVE",
      "EXCLUSIVE",
    ]).describe("How the items in this list should be targeted.").optional(),
    values: z.array(z.string()).describe("The values specified.").optional(),
  }).describe(
    "Generic targeting with string values used in app, website and publisher targeting.",
  ).optional(),
  userListTargeting: z.object({
    excludedIds: z.array(z.string()).describe("The IDs excluded in a config.")
      .optional(),
    includedIds: z.array(z.string()).describe("The IDs included in a config.")
      .optional(),
  }).describe(
    "Generic targeting used for targeting dimensions that contain a list of included and excluded numeric IDs used in app, user list, geo, and vertical id targeting.",
  ).optional(),
  verticalTargeting: z.object({
    excludedIds: z.array(z.string()).describe("The IDs excluded in a config.")
      .optional(),
    includedIds: z.array(z.string()).describe("The IDs included in a config.")
      .optional(),
  }).describe(
    "Generic targeting used for targeting dimensions that contain a list of included and excluded numeric IDs used in app, user list, geo, and vertical id targeting.",
  ).optional(),
  webTargeting: z.object({
    targetingMode: z.enum([
      "TARGETING_MODE_UNSPECIFIED",
      "INCLUSIVE",
      "EXCLUSIVE",
    ]).describe("How the items in this list should be targeted.").optional(),
    values: z.array(z.string()).describe("The values specified.").optional(),
  }).describe(
    "Generic targeting with string values used in app, website and publisher targeting.",
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const _credentialKeys = new Set(["accessToken", "credentialsJson", "project"]);

function _buildGcpCredentials(
  g: Record<string, unknown>,
): ExplicitGcpCredentials {
  return {
    accessToken: g.accessToken as string | undefined,
    credentialsJson: g.credentialsJson as string | undefined,
    project: g.project as string | undefined,
  };
}

/** Swamp extension model for Google Cloud Real-time Bidding Bidders.PretargetingConfigs. Registered at `@swamp/gcp/realtimebidding/bidders-pretargetingconfigs`. */
export const model = {
  type: "@swamp/gcp/realtimebidding/bidders-pretargetingconfigs",
  version: "2026.06.07.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Pretargeting config: a set of targeting dimensions applied at the pretargetin...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a pretargetingConfigs",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after creation (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["allowedUserTargetingModes"] !== undefined) {
          body["allowedUserTargetingModes"] = g["allowedUserTargetingModes"];
        }
        if (g["appTargeting"] !== undefined) {
          body["appTargeting"] = g["appTargeting"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["excludedContentLabelIds"] !== undefined) {
          body["excludedContentLabelIds"] = g["excludedContentLabelIds"];
        }
        if (g["geoTargeting"] !== undefined) {
          body["geoTargeting"] = g["geoTargeting"];
        }
        if (g["includedCreativeDimensions"] !== undefined) {
          body["includedCreativeDimensions"] = g["includedCreativeDimensions"];
        }
        if (g["includedEnvironments"] !== undefined) {
          body["includedEnvironments"] = g["includedEnvironments"];
        }
        if (g["includedFormats"] !== undefined) {
          body["includedFormats"] = g["includedFormats"];
        }
        if (g["includedLanguages"] !== undefined) {
          body["includedLanguages"] = g["includedLanguages"];
        }
        if (g["includedMobileOperatingSystemIds"] !== undefined) {
          body["includedMobileOperatingSystemIds"] =
            g["includedMobileOperatingSystemIds"];
        }
        if (g["includedPlatforms"] !== undefined) {
          body["includedPlatforms"] = g["includedPlatforms"];
        }
        if (g["includedUserIdTypes"] !== undefined) {
          body["includedUserIdTypes"] = g["includedUserIdTypes"];
        }
        if (g["interstitialTargeting"] !== undefined) {
          body["interstitialTargeting"] = g["interstitialTargeting"];
        }
        if (g["maximumQps"] !== undefined) body["maximumQps"] = g["maximumQps"];
        if (g["minimumViewabilityDecile"] !== undefined) {
          body["minimumViewabilityDecile"] = g["minimumViewabilityDecile"];
        }
        if (g["publisherTargeting"] !== undefined) {
          body["publisherTargeting"] = g["publisherTargeting"];
        }
        if (g["userListTargeting"] !== undefined) {
          body["userListTargeting"] = g["userListTargeting"];
        }
        if (g["verticalTargeting"] !== undefined) {
          body["verticalTargeting"] = g["verticalTargeting"];
        }
        if (g["webTargeting"] !== undefined) {
          body["webTargeting"] = g["webTargeting"];
        }
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
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
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
          credentials,
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
      description: "Get a pretargetingConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the pretargetingConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const result = await readResource(
          BASE_URL,
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
    update: {
      description: "Update pretargetingConfigs attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          String(g["parent"] ?? ""),
          existing["name"]?.toString() ?? g["name"]?.toString() ?? "",
        );
        const body: Record<string, unknown> = {};
        if (g["allowedUserTargetingModes"] !== undefined) {
          body["allowedUserTargetingModes"] = g["allowedUserTargetingModes"];
        }
        if (g["appTargeting"] !== undefined) {
          body["appTargeting"] = g["appTargeting"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["excludedContentLabelIds"] !== undefined) {
          body["excludedContentLabelIds"] = g["excludedContentLabelIds"];
        }
        if (g["geoTargeting"] !== undefined) {
          body["geoTargeting"] = g["geoTargeting"];
        }
        if (g["includedCreativeDimensions"] !== undefined) {
          body["includedCreativeDimensions"] = g["includedCreativeDimensions"];
        }
        if (g["includedEnvironments"] !== undefined) {
          body["includedEnvironments"] = g["includedEnvironments"];
        }
        if (g["includedFormats"] !== undefined) {
          body["includedFormats"] = g["includedFormats"];
        }
        if (g["includedLanguages"] !== undefined) {
          body["includedLanguages"] = g["includedLanguages"];
        }
        if (g["includedMobileOperatingSystemIds"] !== undefined) {
          body["includedMobileOperatingSystemIds"] =
            g["includedMobileOperatingSystemIds"];
        }
        if (g["includedPlatforms"] !== undefined) {
          body["includedPlatforms"] = g["includedPlatforms"];
        }
        if (g["includedUserIdTypes"] !== undefined) {
          body["includedUserIdTypes"] = g["includedUserIdTypes"];
        }
        if (g["interstitialTargeting"] !== undefined) {
          body["interstitialTargeting"] = g["interstitialTargeting"];
        }
        if (g["maximumQps"] !== undefined) body["maximumQps"] = g["maximumQps"];
        if (g["minimumViewabilityDecile"] !== undefined) {
          body["minimumViewabilityDecile"] = g["minimumViewabilityDecile"];
        }
        if (g["publisherTargeting"] !== undefined) {
          body["publisherTargeting"] = g["publisherTargeting"];
        }
        if (g["userListTargeting"] !== undefined) {
          body["userListTargeting"] = g["userListTargeting"];
        }
        if (g["verticalTargeting"] !== undefined) {
          body["verticalTargeting"] = g["verticalTargeting"];
        }
        if (g["webTargeting"] !== undefined) {
          body["webTargeting"] = g["webTargeting"];
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
    delete: {
      description: "Delete the pretargetingConfigs",
      arguments: z.object({
        identifier: z.string().describe("The name of the pretargetingConfigs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync pretargetingConfigs state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
            String(g["parent"] ?? ""),
            shortName,
          );
          const result = await readResource(
            BASE_URL,
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
      description: "List pretargetingConfigs resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The maximum number of pretargeting configurations to return. If unspecified, at most 10 pretargeting configurations will be returned. The maximum value is 100; values above 100 will be coerced to 100.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "pretargetingConfigs",
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
    activate: {
      description: "activate",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "realtimebidding.bidders.pretargetingConfigs.activate",
            "path": "v1/{+name}:activate",
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
    add_targeted_apps: {
      description: "add targeted apps",
      arguments: z.object({
        appIds: z.any().optional(),
        targetingMode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["pretargetingConfig"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["appIds"] !== undefined) body["appIds"] = args["appIds"];
        if (args["targetingMode"] !== undefined) {
          body["targetingMode"] = args["targetingMode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "realtimebidding.bidders.pretargetingConfigs.addTargetedApps",
            "path": "v1/{+pretargetingConfig}:addTargetedApps",
            "httpMethod": "POST",
            "parameterOrder": ["pretargetingConfig"],
            "parameters": {
              "pretargetingConfig": { "location": "path", "required": true },
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
    add_targeted_publishers: {
      description: "add targeted publishers",
      arguments: z.object({
        publisherIds: z.any().optional(),
        targetingMode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["pretargetingConfig"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["publisherIds"] !== undefined) {
          body["publisherIds"] = args["publisherIds"];
        }
        if (args["targetingMode"] !== undefined) {
          body["targetingMode"] = args["targetingMode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "realtimebidding.bidders.pretargetingConfigs.addTargetedPublishers",
            "path": "v1/{+pretargetingConfig}:addTargetedPublishers",
            "httpMethod": "POST",
            "parameterOrder": ["pretargetingConfig"],
            "parameters": {
              "pretargetingConfig": { "location": "path", "required": true },
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
    add_targeted_sites: {
      description: "add targeted sites",
      arguments: z.object({
        sites: z.any().optional(),
        targetingMode: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["pretargetingConfig"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["sites"] !== undefined) body["sites"] = args["sites"];
        if (args["targetingMode"] !== undefined) {
          body["targetingMode"] = args["targetingMode"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "realtimebidding.bidders.pretargetingConfigs.addTargetedSites",
            "path": "v1/{+pretargetingConfig}:addTargetedSites",
            "httpMethod": "POST",
            "parameterOrder": ["pretargetingConfig"],
            "parameters": {
              "pretargetingConfig": { "location": "path", "required": true },
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
    suspend: {
      description: "suspend",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "realtimebidding.bidders.pretargetingConfigs.suspend",
            "path": "v1/{+name}:suspend",
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
