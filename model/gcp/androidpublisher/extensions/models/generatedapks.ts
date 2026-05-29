// Auto-generated extension model for @swamp/gcp/androidpublisher/generatedapks
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Generatedapks.
 *
 * Download metadata for split, standalone and universal APKs, as well as asset pack slices, signed with a given key.
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
  listResources,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const LIST_CONFIG = {
  "id": "androidpublisher.generatedapks.list",
  "path":
    "androidpublisher/v3/applications/{packageName}/generatedApks/{versionCode}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "versionCode",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "versionCode": {
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
  certificateSha256Hash: z.string().optional(),
  generatedAssetPackSlices: z.array(z.object({
    downloadId: z.string(),
    moduleName: z.string(),
    sliceId: z.string(),
    version: z.string(),
  })).optional(),
  generatedRecoveryModules: z.array(z.object({
    downloadId: z.string(),
    moduleName: z.string(),
    recoveryId: z.string(),
    recoveryStatus: z.string(),
  })).optional(),
  generatedSplitApks: z.array(z.object({
    downloadId: z.string(),
    moduleName: z.string(),
    splitId: z.string(),
    variantId: z.number(),
  })).optional(),
  generatedStandaloneApks: z.array(z.object({
    downloadId: z.string(),
    variantId: z.number(),
  })).optional(),
  generatedUniversalApk: z.object({
    downloadId: z.string(),
  }).optional(),
  targetingInfo: z.object({
    assetSliceSet: z.array(z.object({
      apkDescription: z.array(z.object({
        assetSliceMetadata: z.unknown(),
        instantApkMetadata: z.unknown(),
        path: z.unknown(),
        splitApkMetadata: z.unknown(),
        standaloneApkMetadata: z.unknown(),
        targeting: z.unknown(),
      })),
      assetModuleMetadata: z.object({
        deliveryType: z.string(),
        name: z.string(),
      }),
    })),
    packageName: z.string(),
    variant: z.array(z.object({
      apkSet: z.array(z.object({
        apkDescription: z.unknown(),
        moduleMetadata: z.unknown(),
      })),
      targeting: z.object({
        abiTargeting: z.object({
          alternatives: z.unknown(),
          value: z.unknown(),
        }),
        multiAbiTargeting: z.object({
          alternatives: z.unknown(),
          value: z.unknown(),
        }),
        screenDensityTargeting: z.object({
          alternatives: z.unknown(),
          value: z.unknown(),
        }),
        sdkVersionTargeting: z.object({
          alternatives: z.unknown(),
          value: z.unknown(),
        }),
        textureCompressionFormatTargeting: z.object({
          alternatives: z.unknown(),
          value: z.unknown(),
        }),
      }),
      variantNumber: z.number(),
    })),
  }).optional(),
  unprotectedGeneratedSplitApks: z.array(z.object({
    downloadId: z.string(),
    moduleName: z.string(),
    splitId: z.string(),
    variantId: z.number(),
  })).optional(),
  unprotectedGeneratedStandaloneApks: z.array(z.object({
    downloadId: z.string(),
    variantId: z.number(),
  })).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Generatedapks. Registered at `@swamp/gcp/androidpublisher/generatedapks`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/generatedapks",
  version: "2026.05.29.1",
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
      toVersion: "2026.04.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.09.1",
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
      toVersion: "2026.05.20.1",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.29.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Download metadata for split, standalone and universal APKs, as well as asset ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a generatedapks",
      arguments: z.object({
        identifier: z.string().describe("The name of the generatedapks"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["versionCode"] !== undefined) {
          params["versionCode"] = String(g["versionCode"]);
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
      description: "Sync generatedapks state from GCP",
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
          if (g["versionCode"] !== undefined) {
            params["versionCode"] = String(g["versionCode"]);
          } else if (existing["versionCode"]) {
            params["versionCode"] = String(existing["versionCode"]);
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
    list: {
      description: "List generatedapks resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["versionCode"] !== undefined) {
          params["versionCode"] = String(g["versionCode"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "generatedApks",
          (args.maxPages as number | undefined) ?? 10,
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
    download: {
      description: "download",
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
        params["packageName"] = existing["packageName"]?.toString() ??
          g["packageName"]?.toString() ?? "";
        params["versionCode"] = existing["versionCode"]?.toString() ??
          g["versionCode"]?.toString() ?? "";
        params["downloadId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.generatedapks.download",
            "path":
              "androidpublisher/v3/applications/{packageName}/generatedApks/{versionCode}/downloads/{downloadId}:download",
            "httpMethod": "GET",
            "parameterOrder": ["packageName", "versionCode", "downloadId"],
            "parameters": {
              "downloadId": { "location": "path", "required": true },
              "packageName": { "location": "path", "required": true },
              "versionCode": { "location": "path", "required": true },
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
