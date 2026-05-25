// Auto-generated extension model for @swamp/gcp/androidenterprise/managedconfigurationsforuser
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play EMM Managedconfigurationsforuser.
 *
 * *Deprecated:* New integrations cannot use this method and can refer to our new recommendations
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
  listResources,
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidenterprise.googleapis.com/";

const GET_CONFIG = {
  "id": "androidenterprise.managedconfigurationsforuser.get",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/managedConfigurationsForUser/{managedConfigurationForUserId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
    "userId",
    "managedConfigurationForUserId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "managedConfigurationForUserId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "androidenterprise.managedconfigurationsforuser.update",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/managedConfigurationsForUser/{managedConfigurationForUserId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "enterpriseId",
    "userId",
    "managedConfigurationForUserId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "managedConfigurationForUserId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidenterprise.managedconfigurationsforuser.delete",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/managedConfigurationsForUser/{managedConfigurationForUserId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "enterpriseId",
    "userId",
    "managedConfigurationForUserId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "managedConfigurationForUserId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidenterprise.managedconfigurationsforuser.list",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/users/{userId}/managedConfigurationsForUser",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
    "userId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  configurationVariables: z.object({
    mcmId: z.string().describe("The ID of the managed configurations settings.")
      .optional(),
    variableSet: z.array(z.object({
      placeholder: z.string().describe(
        "The placeholder string; defined by EMM.",
      ).optional(),
      userValue: z.string().describe(
        "The value of the placeholder, specific to the user.",
      ).optional(),
    })).describe("The variable set that is attributed to the user.").optional(),
  }).describe(
    "A configuration variables resource contains the managed configuration settings ID to be applied to a single user, as well as the variable set that is attributed to the user. The variable set will be used to replace placeholders in the managed configuration settings.",
  ).optional(),
  kind: z.string().describe("Deprecated.").optional(),
  managedProperty: z.array(z.object({
    key: z.string().describe("The unique key that identifies the property.")
      .optional(),
    valueBool: z.boolean().describe(
      "The boolean value - this will only be present if type of the property is bool.",
    ).optional(),
    valueBundle: z.object({
      managedProperty: z.array(z.string()).describe(
        "The list of managed properties.",
      ).optional(),
    }).describe("A bundle of managed properties.").optional(),
    valueBundleArray: z.array(z.object({
      managedProperty: z.array(z.unknown()).describe(
        "The list of managed properties.",
      ).optional(),
    })).describe(
      "The list of bundles of properties - this will only be present if type of the property is bundle_array.",
    ).optional(),
    valueInteger: z.number().int().describe(
      "The integer value - this will only be present if type of the property is integer.",
    ).optional(),
    valueString: z.string().describe(
      "The string value - this will only be present if type of the property is string, choice or hidden.",
    ).optional(),
    valueStringArray: z.array(z.string()).describe(
      "The list of string values - this will only be present if type of the property is multiselect.",
    ).optional(),
  })).describe("The set of managed properties for this configuration.")
    .optional(),
  productId: z.string().describe(
    'The ID of the product that the managed configuration is for, e.g. "app:com.google.android.gm".',
  ).optional(),
});

const StateSchema = z.object({
  configurationVariables: z.object({
    mcmId: z.string(),
    variableSet: z.array(z.object({
      placeholder: z.string(),
      userValue: z.string(),
    })),
  }).optional(),
  kind: z.string().optional(),
  managedProperty: z.array(z.object({
    key: z.string(),
    valueBool: z.boolean(),
    valueBundle: z.object({
      managedProperty: z.array(z.string()),
    }),
    valueBundleArray: z.array(z.object({
      managedProperty: z.array(z.unknown()),
    })),
    valueInteger: z.number(),
    valueString: z.string(),
    valueStringArray: z.array(z.string()),
  })).optional(),
  productId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  configurationVariables: z.object({
    mcmId: z.string().describe("The ID of the managed configurations settings.")
      .optional(),
    variableSet: z.array(z.object({
      placeholder: z.string().describe(
        "The placeholder string; defined by EMM.",
      ).optional(),
      userValue: z.string().describe(
        "The value of the placeholder, specific to the user.",
      ).optional(),
    })).describe("The variable set that is attributed to the user.").optional(),
  }).describe(
    "A configuration variables resource contains the managed configuration settings ID to be applied to a single user, as well as the variable set that is attributed to the user. The variable set will be used to replace placeholders in the managed configuration settings.",
  ).optional(),
  kind: z.string().describe("Deprecated.").optional(),
  managedProperty: z.array(z.object({
    key: z.string().describe("The unique key that identifies the property.")
      .optional(),
    valueBool: z.boolean().describe(
      "The boolean value - this will only be present if type of the property is bool.",
    ).optional(),
    valueBundle: z.object({
      managedProperty: z.array(z.string()).describe(
        "The list of managed properties.",
      ).optional(),
    }).describe("A bundle of managed properties.").optional(),
    valueBundleArray: z.array(z.object({
      managedProperty: z.array(z.unknown()).describe(
        "The list of managed properties.",
      ).optional(),
    })).describe(
      "The list of bundles of properties - this will only be present if type of the property is bundle_array.",
    ).optional(),
    valueInteger: z.number().int().describe(
      "The integer value - this will only be present if type of the property is integer.",
    ).optional(),
    valueString: z.string().describe(
      "The string value - this will only be present if type of the property is string, choice or hidden.",
    ).optional(),
    valueStringArray: z.array(z.string()).describe(
      "The list of string values - this will only be present if type of the property is multiselect.",
    ).optional(),
  })).describe("The set of managed properties for this configuration.")
    .optional(),
  productId: z.string().describe(
    'The ID of the product that the managed configuration is for, e.g. "app:com.google.android.gm".',
  ).optional(),
});

/** Swamp extension model for Google Cloud Google Play EMM Managedconfigurationsforuser. Registered at `@swamp/gcp/androidenterprise/managedconfigurationsforuser`. */
export const model = {
  type: "@swamp/gcp/androidenterprise/managedconfigurationsforuser",
  version: "2026.05.25.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "*Deprecated:* New integrations cannot use this method and can refer to our ne...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a managedconfigurationsforuser",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the managedconfigurationsforuser",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["managedConfigurationForUserId"] = args.identifier;
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
      description: "Update managedconfigurationsforuser attributes",
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
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        else if (existing["userId"]) {
          params["userId"] = String(existing["userId"]);
        }
        params["managedConfigurationForUserId"] =
          existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["configurationVariables"] !== undefined) {
          body["configurationVariables"] = g["configurationVariables"];
        }
        if (g["kind"] !== undefined) body["kind"] = g["kind"];
        if (g["managedProperty"] !== undefined) {
          body["managedProperty"] = g["managedProperty"];
        }
        if (g["productId"] !== undefined) body["productId"] = g["productId"];
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
      description: "Delete the managedconfigurationsforuser",
      arguments: z.object({
        identifier: z.string().describe(
          "The name of the managedconfigurationsforuser",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["managedConfigurationForUserId"] = args.identifier;
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
      description: "Sync managedconfigurationsforuser state from GCP",
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
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["managedConfigurationForUserId"] = identifier;
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
