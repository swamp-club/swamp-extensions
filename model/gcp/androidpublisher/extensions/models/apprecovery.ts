// Auto-generated extension model for @swamp/gcp/androidpublisher/apprecovery
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Apprecovery.
 *
 * Information about an app recovery action.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const INSERT_CONFIG = {
  "id": "androidpublisher.apprecovery.create",
  "path": "androidpublisher/v3/applications/{packageName}/appRecoveries",
  "httpMethod": "POST",
  "parameterOrder": [
    "packageName",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidpublisher.apprecovery.list",
  "path": "androidpublisher/v3/applications/{packageName}/appRecoveries",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "versionCode": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  remoteInAppUpdate: z.object({
    isRemoteInAppUpdateRequested: z.boolean().describe(
      "Required. Set to true if Remote In-App Update action type is needed.",
    ).optional(),
  }).describe("Object representation for Remote in-app update action type.")
    .optional(),
  targeting: z.object({
    allUsers: z.object({
      isAllUsersRequested: z.boolean().describe(
        "Required. Set to true if all set of users are needed.",
      ).optional(),
    }).describe("Object representation to describe all set of users.")
      .optional(),
    androidSdks: z.object({
      sdkLevels: z.array(z.string()).describe(
        "Android api levels of devices targeted by recovery action. See https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels for different api levels in android.",
      ).optional(),
    }).describe(
      "Android api level targeting data for app recovery action targeting.",
    ).optional(),
    regions: z.object({
      regionCode: z.array(z.string()).describe(
        "Regions targeted by the recovery action. Region codes are ISO 3166 Alpha-2 country codes. For example, US stands for United States of America. See https://www.iso.org/iso-3166-country-codes.html for the complete list of country codes.",
      ).optional(),
    }).describe("Region targeting data for app recovery action targeting.")
      .optional(),
    versionList: z.object({
      versionCodes: z.array(z.string()).describe("List of app version codes.")
        .optional(),
    }).describe("Data format for a list of app versions.").optional(),
    versionRange: z.object({
      versionCodeEnd: z.string().describe(
        "Highest app version in the range, inclusive.",
      ).optional(),
      versionCodeStart: z.string().describe(
        "Lowest app version in the range, inclusive.",
      ).optional(),
    }).describe("Data format for a continuous range of app versions.")
      .optional(),
  }).describe(
    "Targeting details for a recovery action such as regions, android sdk levels, app versions etc.",
  ).optional(),
  packageName: z.string().describe(
    "Required. Package name of the app on which recovery action is performed.",
  ),
});

const StateSchema = z.object({
  appRecoveryId: z.string().optional(),
  cancelTime: z.string().optional(),
  createTime: z.string().optional(),
  deployTime: z.string().optional(),
  lastUpdateTime: z.string().optional(),
  remoteInAppUpdateData: z.object({
    remoteAppUpdateDataPerBundle: z.array(z.object({
      recoveredDeviceCount: z.string(),
      totalDeviceCount: z.string(),
      versionCode: z.string(),
    })),
  }).optional(),
  status: z.string().optional(),
  targeting: z.object({
    allUsers: z.object({
      isAllUsersRequested: z.boolean(),
    }),
    androidSdks: z.object({
      sdkLevels: z.array(z.string()),
    }),
    regions: z.object({
      regionCode: z.array(z.string()),
    }),
    versionList: z.object({
      versionCodes: z.array(z.string()),
    }),
    versionRange: z.object({
      versionCodeEnd: z.string(),
      versionCodeStart: z.string(),
    }),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  remoteInAppUpdate: z.object({
    isRemoteInAppUpdateRequested: z.boolean().describe(
      "Required. Set to true if Remote In-App Update action type is needed.",
    ).optional(),
  }).describe("Object representation for Remote in-app update action type.")
    .optional(),
  targeting: z.object({
    allUsers: z.object({
      isAllUsersRequested: z.boolean().describe(
        "Required. Set to true if all set of users are needed.",
      ).optional(),
    }).describe("Object representation to describe all set of users.")
      .optional(),
    androidSdks: z.object({
      sdkLevels: z.array(z.string()).describe(
        "Android api levels of devices targeted by recovery action. See https://developer.android.com/guide/topics/manifest/uses-sdk-element#ApiLevels for different api levels in android.",
      ).optional(),
    }).describe(
      "Android api level targeting data for app recovery action targeting.",
    ).optional(),
    regions: z.object({
      regionCode: z.array(z.string()).describe(
        "Regions targeted by the recovery action. Region codes are ISO 3166 Alpha-2 country codes. For example, US stands for United States of America. See https://www.iso.org/iso-3166-country-codes.html for the complete list of country codes.",
      ).optional(),
    }).describe("Region targeting data for app recovery action targeting.")
      .optional(),
    versionList: z.object({
      versionCodes: z.array(z.string()).describe("List of app version codes.")
        .optional(),
    }).describe("Data format for a list of app versions.").optional(),
    versionRange: z.object({
      versionCodeEnd: z.string().describe(
        "Highest app version in the range, inclusive.",
      ).optional(),
      versionCodeStart: z.string().describe(
        "Lowest app version in the range, inclusive.",
      ).optional(),
    }).describe("Data format for a continuous range of app versions.")
      .optional(),
  }).describe(
    "Targeting details for a recovery action such as regions, android sdk levels, app versions etc.",
  ).optional(),
  packageName: z.string().describe(
    "Required. Package name of the app on which recovery action is performed.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Apprecovery. Registered at `@swamp/gcp/androidpublisher/apprecovery`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/apprecovery",
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
      description: "Information about an app recovery action.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a apprecovery",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        const body: Record<string, unknown> = {};
        if (g["remoteInAppUpdate"] !== undefined) {
          body["remoteInAppUpdate"] = g["remoteInAppUpdate"];
        }
        if (g["targeting"] !== undefined) body["targeting"] = g["targeting"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "packageName": String(g["packageName"] ?? "") },
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
      description: "Get a apprecovery",
      arguments: z.object({
        identifier: z.string().describe("The name of the apprecovery"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
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
      description: "Sync apprecovery state from GCP",
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
          if (g["packageName"] !== undefined) {
            params["packageName"] = String(g["packageName"]);
          } else if (existing["packageName"]) {
            params["packageName"] = String(existing["packageName"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          const result = await readViaList(
            BASE_URL,
            LIST_CONFIG,
            params,
            "name",
            identifier,
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
    add_targeting: {
      description: "add targeting",
      arguments: z.object({
        targetingUpdate: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
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
        params["appRecoveryId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (args["targetingUpdate"] !== undefined) {
          body["targetingUpdate"] = args["targetingUpdate"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.apprecovery.addTargeting",
            "path":
              "androidpublisher/v3/applications/{packageName}/appRecoveries/{appRecoveryId}:addTargeting",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "appRecoveryId"],
            "parameters": {
              "appRecoveryId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    cancel: {
      description: "cancel",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
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
        params["appRecoveryId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.apprecovery.cancel",
            "path":
              "androidpublisher/v3/applications/{packageName}/appRecoveries/{appRecoveryId}:cancel",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "appRecoveryId"],
            "parameters": {
              "appRecoveryId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    deploy: {
      description: "deploy",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
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
        params["appRecoveryId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.apprecovery.deploy",
            "path":
              "androidpublisher/v3/applications/{packageName}/appRecoveries/{appRecoveryId}:deploy",
            "httpMethod": "POST",
            "parameterOrder": ["packageName", "appRecoveryId"],
            "parameters": {
              "appRecoveryId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
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
