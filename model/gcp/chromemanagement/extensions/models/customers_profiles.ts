// Auto-generated extension model for @swamp/gcp/chromemanagement/customers-profiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Chrome Management Customers.Profiles.
 *
 * A representation of a Chrome browser profile.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  deleteResource,
  getProjectId,
  isResourceNotFoundError,
  readResource,
} from "./_lib/gcp.ts";

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/profiles/${shortName}`;
}

const BASE_URL = "https://chromemanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "chromemanagement.customers.profiles.get",
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

const DELETE_CONFIG = {
  "id": "chromemanagement.customers.profiles.delete",
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
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  affiliationState: z.string().optional(),
  annotatedLocation: z.string().optional(),
  annotatedUser: z.string().optional(),
  attestationCredential: z.object({
    keyRotationTime: z.string(),
    keyTrustLevel: z.string(),
    keyType: z.string(),
    publicKey: z.string(),
  }).optional(),
  browserChannel: z.string().optional(),
  browserVersion: z.string().optional(),
  deviceInfo: z.object({
    affiliatedDeviceId: z.string(),
    deviceType: z.string(),
    hostname: z.string(),
    machine: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  etag: z.string().optional(),
  extensionCount: z.string().optional(),
  firstEnrollmentTime: z.string().optional(),
  identityProvider: z.string().optional(),
  lastActivityTime: z.string().optional(),
  lastPolicyFetchTime: z.string().optional(),
  lastPolicySyncTime: z.string().optional(),
  lastStatusReportTime: z.string().optional(),
  name: z.string(),
  osPlatformType: z.string().optional(),
  osPlatformVersion: z.string().optional(),
  osVersion: z.string().optional(),
  policyCount: z.string().optional(),
  profileId: z.string().optional(),
  profilePermanentId: z.string().optional(),
  reportingData: z.object({
    browserExecutablePath: z.string(),
    extensionData: z.array(z.object({
      description: z.string(),
      extensionId: z.string(),
      extensionType: z.string(),
      homepageUri: z.string(),
      installationType: z.string(),
      isDisabled: z.boolean(),
      isWebstoreExtension: z.boolean(),
      manifestVersion: z.number(),
      name: z.string(),
      permissions: z.array(z.string()),
      version: z.string(),
    })),
    extensionPolicyData: z.array(z.object({
      extensionId: z.string(),
      extensionName: z.string(),
      policyData: z.array(z.object({
        conflicts: z.unknown(),
        error: z.unknown(),
        name: z.unknown(),
        source: z.unknown(),
        value: z.unknown(),
      })),
    })),
    installedBrowserVersion: z.string(),
    policyData: z.array(z.object({
      conflicts: z.array(z.object({
        source: z.unknown(),
      })),
      error: z.string(),
      name: z.string(),
      source: z.string(),
      value: z.string(),
    })),
    profilePath: z.string(),
  }).optional(),
  supportsFcmNotifications: z.boolean().optional(),
  userEmail: z.string().optional(),
  userId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Chrome Management Customers.Profiles. Registered at `@swamp/gcp/chromemanagement/customers-profiles`. */
export const model = {
  type: "@swamp/gcp/chromemanagement/customers-profiles",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A representation of a Chrome browser profile.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a profiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the profiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
          args.identifier,
        );
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
    delete: {
      description: "Delete the profiles",
      arguments: z.object({
        identifier: z.string().describe("The name of the profiles"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = buildResourceName(
          String(g["parent"] ?? ""),
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
      description: "Sync profiles state from GCP",
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
            String(g["parent"] ?? ""),
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
  },
};
