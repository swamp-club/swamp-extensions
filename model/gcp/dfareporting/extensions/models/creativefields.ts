// Auto-generated extension model for @swamp/gcp/dfareporting/creativefields
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 CreativeFields.
 *
 * Contains properties of a creative field.
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

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.creativeFields.get",
  "path": "userprofiles/{+profileId}/creativeFields/{+id}",
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
  "id": "dfareporting.creativeFields.insert",
  "path": "userprofiles/{+profileId}/creativeFields",
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
  "id": "dfareporting.creativeFields.update",
  "path": "userprofiles/{+profileId}/creativeFields",
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

const DELETE_CONFIG = {
  "id": "dfareporting.creativeFields.delete",
  "path": "userprofiles/{+profileId}/creativeFields/{+id}",
  "httpMethod": "DELETE",
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

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this creative field. This is a read-only field that can be left blank.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this creative field. This is a required field on insertion.",
  ).optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  id: z.string().describe(
    "ID of this creative field. This is a read-only, auto-generated field.",
  ).optional(),
  name: z.string().describe(
    "Name of this creative field. This is a required field and must be less than 256 characters long and unique among creative fields of the same advertiser.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this creative field. This is a read-only field that can be left blank.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  advertiserId: z.string().optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  id: z.string(),
  kind: z.string().optional(),
  name: z.string().optional(),
  subaccountId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of this creative field. This is a read-only field that can be left blank.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this creative field. This is a required field on insertion.",
  ).optional(),
  advertiserIdDimensionValue: z.object({
    dimensionName: z.string().describe("The name of the dimension.").optional(),
    etag: z.string().describe("The eTag of this response for caching purposes.")
      .optional(),
    id: z.string().describe("The ID associated with the value if available.")
      .optional(),
    kind: z.string().describe(
      "The kind of resource this is, in this case dfareporting#dimensionValue.",
    ).optional(),
    matchType: z.enum([
      "EXACT",
      "BEGINS_WITH",
      "CONTAINS",
      "WILDCARD_EXPRESSION",
    ]).describe(
      "Determines how the 'value' field is matched when filtering. If not specified, defaults to EXACT. If set to WILDCARD_EXPRESSION, '*' is allowed as a placeholder for variable length character sequences, and it can be escaped with a backslash. Note, only paid search dimensions ('dfa:paidSearch*') allow a matchType other than EXACT.",
    ).optional(),
    value: z.string().describe("The value of the dimension.").optional(),
  }).describe("Represents a DimensionValue resource.").optional(),
  id: z.string().describe(
    "ID of this creative field. This is a read-only, auto-generated field.",
  ).optional(),
  name: z.string().describe(
    "Name of this creative field. This is a required field and must be less than 256 characters long and unique among creative fields of the same advertiser.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this creative field. This is a read-only field that can be left blank.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 CreativeFields. Registered at `@swamp/gcp/dfareporting/creativefields`. */
export const model = {
  type: "@swamp/gcp/dfareporting/creativefields",
  version: "2026.05.19.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Contains properties of a creative field.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a creativeFields",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
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
      description: "Get a creativeFields",
      arguments: z.object({
        identifier: z.string().describe("The id of the creativeFields"),
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
      description: "Update creativeFields attributes",
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
        if (g["accountId"] !== undefined) body["accountId"] = g["accountId"];
        if (g["advertiserId"] !== undefined) {
          body["advertiserId"] = g["advertiserId"];
        }
        if (g["advertiserIdDimensionValue"] !== undefined) {
          body["advertiserIdDimensionValue"] = g["advertiserIdDimensionValue"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
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
      description: "Delete the creativeFields",
      arguments: z.object({
        identifier: z.string().describe("The id of the creativeFields"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.id?.toString() ?? args.identifier).replace(
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
      description: "Sync creativeFields state from GCP",
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
