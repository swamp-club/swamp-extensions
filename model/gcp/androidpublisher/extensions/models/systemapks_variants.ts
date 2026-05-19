// Auto-generated extension model for @swamp/gcp/androidpublisher/systemapks-variants
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play Android Developer Systemapks.Variants.
 *
 * APK that is suitable for inclusion in a system image. The resource of SystemApksService.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidpublisher.googleapis.com/";

const GET_CONFIG = {
  "id": "androidpublisher.systemapks.variants.get",
  "path":
    "androidpublisher/v3/applications/{packageName}/systemApks/{versionCode}/variants/{variantId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "packageName",
    "versionCode",
    "variantId",
  ],
  "parameters": {
    "packageName": {
      "location": "path",
      "required": true,
    },
    "variantId": {
      "location": "path",
      "required": true,
    },
    "versionCode": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "androidpublisher.systemapks.variants.create",
  "path":
    "androidpublisher/v3/applications/{packageName}/systemApks/{versionCode}/variants",
  "httpMethod": "POST",
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
  deviceSpec: z.object({
    screenDensity: z.number().int().describe("Screen dpi.").optional(),
    supportedAbis: z.array(z.string()).describe(
      'Supported ABI architectures in the order of preference. The values should be the string as reported by the platform, e.g. "armeabi-v7a", "x86_64".',
    ).optional(),
    supportedLocales: z.array(z.string()).describe(
      'All installed locales represented as BCP-47 strings, e.g. "en-US".',
    ).optional(),
  }).describe("The device spec used to generate a system APK.").optional(),
  options: z.object({
    rotated: z.boolean().describe(
      "Whether to use the rotated key for signing the system APK.",
    ).optional(),
    uncompressedDexFiles: z.boolean().describe(
      "Whether system APK was generated with uncompressed dex files.",
    ).optional(),
    uncompressedNativeLibraries: z.boolean().describe(
      "Whether system APK was generated with uncompressed native libraries.",
    ).optional(),
  }).describe("Options for system APKs.").optional(),
  packageName: z.string().describe("Package name of the app."),
  versionCode: z.string().describe("The version code of the App Bundle."),
});

const StateSchema = z.object({
  deviceSpec: z.object({
    screenDensity: z.number(),
    supportedAbis: z.array(z.string()),
    supportedLocales: z.array(z.string()),
  }).optional(),
  options: z.object({
    rotated: z.boolean(),
    uncompressedDexFiles: z.boolean(),
    uncompressedNativeLibraries: z.boolean(),
  }).optional(),
  variantId: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  deviceSpec: z.object({
    screenDensity: z.number().int().describe("Screen dpi.").optional(),
    supportedAbis: z.array(z.string()).describe(
      'Supported ABI architectures in the order of preference. The values should be the string as reported by the platform, e.g. "armeabi-v7a", "x86_64".',
    ).optional(),
    supportedLocales: z.array(z.string()).describe(
      'All installed locales represented as BCP-47 strings, e.g. "en-US".',
    ).optional(),
  }).describe("The device spec used to generate a system APK.").optional(),
  options: z.object({
    rotated: z.boolean().describe(
      "Whether to use the rotated key for signing the system APK.",
    ).optional(),
    uncompressedDexFiles: z.boolean().describe(
      "Whether system APK was generated with uncompressed dex files.",
    ).optional(),
    uncompressedNativeLibraries: z.boolean().describe(
      "Whether system APK was generated with uncompressed native libraries.",
    ).optional(),
  }).describe("Options for system APKs.").optional(),
  packageName: z.string().describe("Package name of the app.").optional(),
  versionCode: z.string().describe("The version code of the App Bundle.")
    .optional(),
});

/** Swamp extension model for Google Cloud Google Play Android Developer Systemapks.Variants. Registered at `@swamp/gcp/androidpublisher/systemapks-variants`. */
export const model = {
  type: "@swamp/gcp/androidpublisher/systemapks-variants",
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
        "APK that is suitable for inclusion in a system image. The resource of SystemA...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a variants",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["versionCode"] !== undefined) {
          params["versionCode"] = String(g["versionCode"]);
        }
        const body: Record<string, unknown> = {};
        if (g["deviceSpec"] !== undefined) body["deviceSpec"] = g["deviceSpec"];
        if (g["options"] !== undefined) body["options"] = g["options"];
        if (g["name"] !== undefined) params["variantId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
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
      description: "Get a variants",
      arguments: z.object({
        identifier: z.string().describe("The name of the variants"),
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
        params["variantId"] = args.identifier;
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
      description: "Sync variants state from GCP",
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
          params["variantId"] = identifier;
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
    download: {
      description: "download",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["packageName"] !== undefined) {
          params["packageName"] = String(g["packageName"]);
        }
        if (g["versionCode"] !== undefined) {
          params["versionCode"] = String(g["versionCode"]);
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
        params["variantId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "androidpublisher.systemapks.variants.download",
            "path":
              "androidpublisher/v3/applications/{packageName}/systemApks/{versionCode}/variants/{variantId}:download",
            "httpMethod": "GET",
            "parameterOrder": ["packageName", "versionCode", "variantId"],
            "parameters": {
              "packageName": { "location": "path", "required": true },
              "variantId": { "location": "path", "required": true },
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
