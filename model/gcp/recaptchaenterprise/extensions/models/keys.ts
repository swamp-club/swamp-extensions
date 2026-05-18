// Auto-generated extension model for @swamp/gcp/recaptchaenterprise/keys
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud reCAPTCHA Enterprise Keys.
 *
 * A key used to identify and configure applications (web and/or mobile) that use reCAPTCHA Enterprise.
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/keys/${shortName}`;
}

const BASE_URL = "https://recaptchaenterprise.googleapis.com/";

const GET_CONFIG = {
  "id": "recaptchaenterprise.projects.keys.get",
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
  "id": "recaptchaenterprise.projects.keys.create",
  "path": "v1/{+parent}/keys",
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
  "id": "recaptchaenterprise.projects.keys.patch",
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
  "id": "recaptchaenterprise.projects.keys.delete",
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

const GlobalArgsSchema = z.object({
  androidSettings: z.object({
    allowAllPackageNames: z.boolean().describe(
      "Optional. If set to true, allowed_package_names are not enforced.",
    ).optional(),
    allowedPackageNames: z.array(z.string()).describe(
      "Optional. Android package names of apps allowed to use the key. Example: 'com.companyname.appname' Each key supports a maximum of 250 package names. To use a key on more apps, set `allow_all_package_names` to true. When this is set, you are responsible for validating the package name by checking the `token_properties.android_package_name` field in each assessment response against your list of allowed package names.",
    ).optional(),
    supportNonGoogleAppStoreDistribution: z.boolean().describe(
      "Optional. Set to true for keys that are used in an Android application that is available for download in app stores in addition to the Google Play Store.",
    ).optional(),
  }).describe("Settings specific to keys that can be used by Android apps.")
    .optional(),
  displayName: z.string().describe(
    "Required. Human-readable display name of this key. Modifiable by user.",
  ).optional(),
  expressSettings: z.object({}).describe(
    "Settings specific to keys that can be used for reCAPTCHA Express.",
  ).optional(),
  iosSettings: z.object({
    allowAllBundleIds: z.boolean().describe(
      "Optional. If set to true, allowed_bundle_ids are not enforced.",
    ).optional(),
    allowedBundleIds: z.array(z.string()).describe(
      "Optional. iOS bundle IDs of apps allowed to use the key. Example: 'com.companyname.productname.appname' Each key supports a maximum of 250 bundle IDs. To use a key on more apps, set `allow_all_bundle_ids` to true. When this is set, you are responsible for validating the bundle id by checking the `token_properties.ios_bundle_id` field in each assessment response against your list of allowed bundle IDs.",
    ).optional(),
    appleDeveloperId: z.object({
      keyId: z.string().describe(
        "Required. The Apple developer key ID (10-character string).",
      ).optional(),
      privateKey: z.string().describe(
        "Required. Input only. A private key (downloaded as a text file with a.p8 file extension) generated for your Apple Developer account. Ensure that Apple DeviceCheck is enabled for the private key.",
      ).optional(),
      teamId: z.string().describe(
        "Required. The Apple team ID (10-character string) owning the provisioning profile used to build your application.",
      ).optional(),
    }).describe(
      "Contains fields that are required to perform Apple-specific integrity checks.",
    ).optional(),
  }).describe("Settings specific to keys that can be used by iOS apps.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. See [Creating and managing labels] (https://cloud.google.com/recaptcha/docs/labels).",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for the Key in the format `projects/{project}/keys/{key}`.",
  ).optional(),
  testingOptions: z.object({
    testingChallenge: z.enum([
      "TESTING_CHALLENGE_UNSPECIFIED",
      "NOCAPTCHA",
      "UNSOLVABLE_CHALLENGE",
    ]).describe(
      "Optional. For challenge-based keys only (CHECKBOX, INVISIBLE), all challenge requests for this site return nocaptcha if NOCAPTCHA, or an unsolvable challenge if CHALLENGE.",
    ).optional(),
    testingScore: z.number().describe(
      "Optional. All assessments for this Key return this score. Must be between 0 (likely not legitimate) and 1 (likely legitimate) inclusive.",
    ).optional(),
  }).describe("Options for user acceptance testing.").optional(),
  wafSettings: z.object({
    wafFeature: z.enum([
      "WAF_FEATURE_UNSPECIFIED",
      "CHALLENGE_PAGE",
      "SESSION_TOKEN",
      "ACTION_TOKEN",
      "EXPRESS",
    ]).describe(
      "Required. The Web Application Firewall (WAF) feature for which this key is enabled.",
    ).optional(),
    wafService: z.enum([
      "WAF_SERVICE_UNSPECIFIED",
      "CA",
      "FASTLY",
      "CLOUDFLARE",
      "AKAMAI",
    ]).describe(
      "Required. The Web Application Firewall (WAF) service that uses this key.",
    ).optional(),
  }).describe(
    "Settings specific to keys that can be used for WAF (Web Application Firewall).",
  ).optional(),
  webSettings: z.object({
    allowAllDomains: z.boolean().describe(
      "Optional. If set to true, it means allowed_domains are not enforced.",
    ).optional(),
    allowAmpTraffic: z.boolean().describe(
      "Optional. If set to true, the key can be used on AMP (Accelerated Mobile Pages) websites. This is supported only for the SCORE integration type.",
    ).optional(),
    allowedDomains: z.array(z.string()).describe(
      "Optional. Domains or subdomains of websites allowed to use the key. All subdomains of an allowed domain are automatically allowed. A valid domain requires a host and must not include any path, port, query or fragment. Examples: 'example.com' or 'subdomain.example.com' Each key supports a maximum of 250 domains. To use a key on more domains, set `allow_all_domains` to true. When this is set, you are responsible for validating the hostname by checking the `token_properties.hostname` field in each assessment response against your list of allowed domains.",
    ).optional(),
    challengeSecurityPreference: z.enum([
      "CHALLENGE_SECURITY_PREFERENCE_UNSPECIFIED",
      "USABILITY",
      "BALANCE",
      "SECURITY",
    ]).describe(
      "Optional. Settings for the frequency and difficulty at which this key triggers captcha challenges. This should only be specified for `IntegrationType` CHECKBOX, INVISIBLE or POLICY_BASED_CHALLENGE.",
    ).optional(),
    challengeSettings: z.object({
      actionSettings: z.record(
        z.string(),
        z.object({
          scoreThreshold: z.number().describe(
            "Required. A challenge is triggered if the end-user score is below that threshold. Value must be between 0 and 1 (inclusive).",
          ).optional(),
        }),
      ).describe(
        "Optional. The action to score threshold map. The action name should be the same as the action name passed in the `data-action` attribute (see https://cloud.google.com/recaptcha/docs/actions-website). Action names are case-insensitive. There is a maximum of 100 action settings. An action name has a maximum length of 100.",
      ).optional(),
      defaultSettings: z.object({
        scoreThreshold: z.number().describe(
          "Required. A challenge is triggered if the end-user score is below that threshold. Value must be between 0 and 1 (inclusive).",
        ).optional(),
      }).describe("Per-action challenge settings.").optional(),
    }).describe(
      "Settings for POLICY_BASED_CHALLENGE keys to control when a challenge is triggered.",
    ).optional(),
    integrationType: z.enum([
      "INTEGRATION_TYPE_UNSPECIFIED",
      "SCORE",
      "CHECKBOX",
      "INVISIBLE",
      "POLICY_BASED_CHALLENGE",
    ]).describe(
      "Required. Describes how this key is integrated with the website.",
    ).optional(),
  }).describe("Settings specific to keys that can be used by websites.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  androidSettings: z.object({
    allowAllPackageNames: z.boolean(),
    allowedPackageNames: z.array(z.string()),
    supportNonGoogleAppStoreDistribution: z.boolean(),
  }).optional(),
  createTime: z.string().optional(),
  displayName: z.string().optional(),
  expressSettings: z.object({}).optional(),
  iosSettings: z.object({
    allowAllBundleIds: z.boolean(),
    allowedBundleIds: z.array(z.string()),
    appleDeveloperId: z.object({
      keyId: z.string(),
      privateKey: z.string(),
      teamId: z.string(),
    }),
  }).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  name: z.string(),
  testingOptions: z.object({
    testingChallenge: z.string(),
    testingScore: z.number(),
  }).optional(),
  wafSettings: z.object({
    wafFeature: z.string(),
    wafService: z.string(),
  }).optional(),
  webSettings: z.object({
    allowAllDomains: z.boolean(),
    allowAmpTraffic: z.boolean(),
    allowedDomains: z.array(z.string()),
    challengeSecurityPreference: z.string(),
    challengeSettings: z.object({
      actionSettings: z.record(z.string(), z.unknown()),
      defaultSettings: z.object({
        scoreThreshold: z.number(),
      }),
    }),
    integrationType: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  androidSettings: z.object({
    allowAllPackageNames: z.boolean().describe(
      "Optional. If set to true, allowed_package_names are not enforced.",
    ).optional(),
    allowedPackageNames: z.array(z.string()).describe(
      "Optional. Android package names of apps allowed to use the key. Example: 'com.companyname.appname' Each key supports a maximum of 250 package names. To use a key on more apps, set `allow_all_package_names` to true. When this is set, you are responsible for validating the package name by checking the `token_properties.android_package_name` field in each assessment response against your list of allowed package names.",
    ).optional(),
    supportNonGoogleAppStoreDistribution: z.boolean().describe(
      "Optional. Set to true for keys that are used in an Android application that is available for download in app stores in addition to the Google Play Store.",
    ).optional(),
  }).describe("Settings specific to keys that can be used by Android apps.")
    .optional(),
  displayName: z.string().describe(
    "Required. Human-readable display name of this key. Modifiable by user.",
  ).optional(),
  expressSettings: z.object({}).describe(
    "Settings specific to keys that can be used for reCAPTCHA Express.",
  ).optional(),
  iosSettings: z.object({
    allowAllBundleIds: z.boolean().describe(
      "Optional. If set to true, allowed_bundle_ids are not enforced.",
    ).optional(),
    allowedBundleIds: z.array(z.string()).describe(
      "Optional. iOS bundle IDs of apps allowed to use the key. Example: 'com.companyname.productname.appname' Each key supports a maximum of 250 bundle IDs. To use a key on more apps, set `allow_all_bundle_ids` to true. When this is set, you are responsible for validating the bundle id by checking the `token_properties.ios_bundle_id` field in each assessment response against your list of allowed bundle IDs.",
    ).optional(),
    appleDeveloperId: z.object({
      keyId: z.string().describe(
        "Required. The Apple developer key ID (10-character string).",
      ).optional(),
      privateKey: z.string().describe(
        "Required. Input only. A private key (downloaded as a text file with a.p8 file extension) generated for your Apple Developer account. Ensure that Apple DeviceCheck is enabled for the private key.",
      ).optional(),
      teamId: z.string().describe(
        "Required. The Apple team ID (10-character string) owning the provisioning profile used to build your application.",
      ).optional(),
    }).describe(
      "Contains fields that are required to perform Apple-specific integrity checks.",
    ).optional(),
  }).describe("Settings specific to keys that can be used by iOS apps.")
    .optional(),
  labels: z.record(z.string(), z.string()).describe(
    "Optional. See [Creating and managing labels] (https://cloud.google.com/recaptcha/docs/labels).",
  ).optional(),
  name: z.string().describe(
    "Identifier. The resource name for the Key in the format `projects/{project}/keys/{key}`.",
  ).optional(),
  testingOptions: z.object({
    testingChallenge: z.enum([
      "TESTING_CHALLENGE_UNSPECIFIED",
      "NOCAPTCHA",
      "UNSOLVABLE_CHALLENGE",
    ]).describe(
      "Optional. For challenge-based keys only (CHECKBOX, INVISIBLE), all challenge requests for this site return nocaptcha if NOCAPTCHA, or an unsolvable challenge if CHALLENGE.",
    ).optional(),
    testingScore: z.number().describe(
      "Optional. All assessments for this Key return this score. Must be between 0 (likely not legitimate) and 1 (likely legitimate) inclusive.",
    ).optional(),
  }).describe("Options for user acceptance testing.").optional(),
  wafSettings: z.object({
    wafFeature: z.enum([
      "WAF_FEATURE_UNSPECIFIED",
      "CHALLENGE_PAGE",
      "SESSION_TOKEN",
      "ACTION_TOKEN",
      "EXPRESS",
    ]).describe(
      "Required. The Web Application Firewall (WAF) feature for which this key is enabled.",
    ).optional(),
    wafService: z.enum([
      "WAF_SERVICE_UNSPECIFIED",
      "CA",
      "FASTLY",
      "CLOUDFLARE",
      "AKAMAI",
    ]).describe(
      "Required. The Web Application Firewall (WAF) service that uses this key.",
    ).optional(),
  }).describe(
    "Settings specific to keys that can be used for WAF (Web Application Firewall).",
  ).optional(),
  webSettings: z.object({
    allowAllDomains: z.boolean().describe(
      "Optional. If set to true, it means allowed_domains are not enforced.",
    ).optional(),
    allowAmpTraffic: z.boolean().describe(
      "Optional. If set to true, the key can be used on AMP (Accelerated Mobile Pages) websites. This is supported only for the SCORE integration type.",
    ).optional(),
    allowedDomains: z.array(z.string()).describe(
      "Optional. Domains or subdomains of websites allowed to use the key. All subdomains of an allowed domain are automatically allowed. A valid domain requires a host and must not include any path, port, query or fragment. Examples: 'example.com' or 'subdomain.example.com' Each key supports a maximum of 250 domains. To use a key on more domains, set `allow_all_domains` to true. When this is set, you are responsible for validating the hostname by checking the `token_properties.hostname` field in each assessment response against your list of allowed domains.",
    ).optional(),
    challengeSecurityPreference: z.enum([
      "CHALLENGE_SECURITY_PREFERENCE_UNSPECIFIED",
      "USABILITY",
      "BALANCE",
      "SECURITY",
    ]).describe(
      "Optional. Settings for the frequency and difficulty at which this key triggers captcha challenges. This should only be specified for `IntegrationType` CHECKBOX, INVISIBLE or POLICY_BASED_CHALLENGE.",
    ).optional(),
    challengeSettings: z.object({
      actionSettings: z.record(
        z.string(),
        z.object({
          scoreThreshold: z.number().describe(
            "Required. A challenge is triggered if the end-user score is below that threshold. Value must be between 0 and 1 (inclusive).",
          ).optional(),
        }),
      ).describe(
        "Optional. The action to score threshold map. The action name should be the same as the action name passed in the `data-action` attribute (see https://cloud.google.com/recaptcha/docs/actions-website). Action names are case-insensitive. There is a maximum of 100 action settings. An action name has a maximum length of 100.",
      ).optional(),
      defaultSettings: z.object({
        scoreThreshold: z.number().describe(
          "Required. A challenge is triggered if the end-user score is below that threshold. Value must be between 0 and 1 (inclusive).",
        ).optional(),
      }).describe("Per-action challenge settings.").optional(),
    }).describe(
      "Settings for POLICY_BASED_CHALLENGE keys to control when a challenge is triggered.",
    ).optional(),
    integrationType: z.enum([
      "INTEGRATION_TYPE_UNSPECIFIED",
      "SCORE",
      "CHECKBOX",
      "INVISIBLE",
      "POLICY_BASED_CHALLENGE",
    ]).describe(
      "Required. Describes how this key is integrated with the website.",
    ).optional(),
  }).describe("Settings specific to keys that can be used by websites.")
    .optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud reCAPTCHA Enterprise Keys. Registered at `@swamp/gcp/recaptchaenterprise/keys`. */
export const model = {
  type: "@swamp/gcp/recaptchaenterprise/keys",
  version: "2026.05.18.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A key used to identify and configure applications (web and/or mobile) that us...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a keys",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (g["androidSettings"] !== undefined) {
          body["androidSettings"] = g["androidSettings"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["expressSettings"] !== undefined) {
          body["expressSettings"] = g["expressSettings"];
        }
        if (g["iosSettings"] !== undefined) {
          body["iosSettings"] = g["iosSettings"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["testingOptions"] !== undefined) {
          body["testingOptions"] = g["testingOptions"];
        }
        if (g["wafSettings"] !== undefined) {
          body["wafSettings"] = g["wafSettings"];
        }
        if (g["webSettings"] !== undefined) {
          body["webSettings"] = g["webSettings"];
        }
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a keys",
      arguments: z.object({
        identifier: z.string().describe("The name of the keys"),
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
      description: "Update keys attributes",
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
        if (g["androidSettings"] !== undefined) {
          body["androidSettings"] = g["androidSettings"];
        }
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["expressSettings"] !== undefined) {
          body["expressSettings"] = g["expressSettings"];
        }
        if (g["iosSettings"] !== undefined) {
          body["iosSettings"] = g["iosSettings"];
        }
        if (g["labels"] !== undefined) body["labels"] = g["labels"];
        if (g["testingOptions"] !== undefined) {
          body["testingOptions"] = g["testingOptions"];
        }
        if (g["wafSettings"] !== undefined) {
          body["wafSettings"] = g["wafSettings"];
        }
        if (g["webSettings"] !== undefined) {
          body["webSettings"] = g["webSettings"];
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
      description: "Delete the keys",
      arguments: z.object({
        identifier: z.string().describe("The name of the keys"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
          args.identifier,
        );
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
      description: "Sync keys state from GCP",
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
    add_ip_override: {
      description: "add ip override",
      arguments: z.object({
        ipOverrideData: z.any().optional(),
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
        if (args["ipOverrideData"] !== undefined) {
          body["ipOverrideData"] = args["ipOverrideData"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "recaptchaenterprise.projects.keys.addIpOverride",
            "path": "v1/{+name}:addIpOverride",
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
    get_metrics: {
      description: "get metrics",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) {
          params["name"] = buildResourceName(
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "recaptchaenterprise.projects.keys.getMetrics",
            "path": "v1/{+name}",
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
    list_ip_overrides: {
      description: "list ip overrides",
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
            "id": "recaptchaenterprise.projects.keys.listIpOverrides",
            "path": "v1/{+parent}:listIpOverrides",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "pageSize": { "location": "query" },
              "pageToken": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    migrate: {
      description: "migrate",
      arguments: z.object({
        skipBillingCheck: z.any().optional(),
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
        if (args["skipBillingCheck"] !== undefined) {
          body["skipBillingCheck"] = args["skipBillingCheck"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "recaptchaenterprise.projects.keys.migrate",
            "path": "v1/{+name}:migrate",
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
    retrieve_legacy_secret_key: {
      description: "retrieve legacy secret key",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
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
        params["key"] = existing["name"]?.toString() ?? g["name"]?.toString() ??
          "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "recaptchaenterprise.projects.keys.retrieveLegacySecretKey",
            "path": "v1/{+key}:retrieveLegacySecretKey",
            "httpMethod": "GET",
            "parameterOrder": ["key"],
            "parameters": { "key": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
