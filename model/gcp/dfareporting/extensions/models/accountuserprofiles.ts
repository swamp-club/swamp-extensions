// Auto-generated extension model for @swamp/gcp/dfareporting/accountuserprofiles
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 AccountUserProfiles.
 *
 * AccountUserProfiles contains properties of a Campaign Manager user profile. This resource is specifically for managing user profiles, whereas UserProfiles is for accessing the API.
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
  readResource,
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.accountUserProfiles.get",
  "path": "userprofiles/{profileId}/accountUserProfiles/{+id}",
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
  "id": "dfareporting.accountUserProfiles.insert",
  "path": "userprofiles/{+profileId}/accountUserProfiles",
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
  "id": "dfareporting.accountUserProfiles.update",
  "path": "userprofiles/{+profileId}/accountUserProfiles",
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

const LIST_CONFIG = {
  "id": "dfareporting.accountUserProfiles.list",
  "path": "userprofiles/{+profileId}/accountUserProfiles",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "active": {
      "location": "query",
    },
    "ids": {
      "location": "query",
    },
    "maxResults": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "profileId": {
      "location": "path",
      "required": true,
    },
    "searchString": {
      "location": "query",
    },
    "sortField": {
      "location": "query",
    },
    "sortOrder": {
      "location": "query",
    },
    "subaccountId": {
      "location": "query",
    },
    "userRoleId": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of the user profile. This is a read-only field that can be left blank.",
  ).optional(),
  active: z.boolean().describe(
    "Whether this user profile is active. This defaults to false, and must be set true on insert for the user profile to be usable.",
  ).optional(),
  advertiserFilter: z.object({
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#objectFilter".',
    ).optional(),
    objectIds: z.array(z.string()).describe(
      "Applicable when status is ASSIGNED. The user has access to objects with these object IDs.",
    ).optional(),
    status: z.enum(["NONE", "ASSIGNED", "ALL"]).describe(
      "Status of the filter. NONE means the user has access to none of the objects. ALL means the user has access to all objects. ASSIGNED means the user has access to the objects with IDs in the objectIds list.",
    ).optional(),
  }).describe("Object Filter.").optional(),
  campaignFilter: z.object({
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#objectFilter".',
    ).optional(),
    objectIds: z.array(z.string()).describe(
      "Applicable when status is ASSIGNED. The user has access to objects with these object IDs.",
    ).optional(),
    status: z.enum(["NONE", "ASSIGNED", "ALL"]).describe(
      "Status of the filter. NONE means the user has access to none of the objects. ALL means the user has access to all objects. ASSIGNED means the user has access to the objects with IDs in the objectIds list.",
    ).optional(),
  }).describe("Object Filter.").optional(),
  comments: z.string().describe("Comments for this user profile.").optional(),
  email: z.string().describe(
    "Email of the user profile. The email address must be linked to a Google Account. This field is required on insertion and is read-only after insertion.",
  ).optional(),
  id: z.string().describe(
    "ID of the user profile. This is a read-only, auto-generated field.",
  ).optional(),
  locale: z.string().describe(
    'Locale of the user profile. This is a required field. Acceptable values are: - "cs" (Czech) - "de" (German) - "en" (English) - "en-GB" (English United Kingdom) - "es" (Spanish) - "fr" (French) - "it" (Italian) - "ja" (Japanese) - "ko" (Korean) - "pl" (Polish) - "pt-BR" (Portuguese Brazil) - "ru" (Russian) - "sv" (Swedish) - "tr" (Turkish) - "zh-CN" (Chinese Simplified) - "zh-TW" (Chinese Traditional)',
  ).optional(),
  name: z.string().describe(
    'Name of the user profile. This is a required field. Must be less than 64 characters long, must be globally unique, and cannot contain whitespace or any of the following characters: "&;<>"#%,".',
  ).optional(),
  siteFilter: z.object({
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#objectFilter".',
    ).optional(),
    objectIds: z.array(z.string()).describe(
      "Applicable when status is ASSIGNED. The user has access to objects with these object IDs.",
    ).optional(),
    status: z.enum(["NONE", "ASSIGNED", "ALL"]).describe(
      "Status of the filter. NONE means the user has access to none of the objects. ALL means the user has access to all objects. ASSIGNED means the user has access to the objects with IDs in the objectIds list.",
    ).optional(),
  }).describe("Object Filter.").optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of the user profile. This is a read-only field that can be left blank.",
  ).optional(),
  traffickerType: z.enum([
    "INTERNAL_NON_TRAFFICKER",
    "INTERNAL_TRAFFICKER",
    "EXTERNAL_TRAFFICKER",
  ]).describe(
    "Trafficker type of this user profile. This is a read-only field.",
  ).optional(),
  userAccessType: z.enum([
    "NORMAL_USER",
    "SUPER_USER",
    "INTERNAL_ADMINISTRATOR",
    "READ_ONLY_SUPER_USER",
  ]).describe(
    "User type of the user profile. This is a read-only field that can be left blank.",
  ).optional(),
  userRoleFilter: z.object({
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#objectFilter".',
    ).optional(),
    objectIds: z.array(z.string()).describe(
      "Applicable when status is ASSIGNED. The user has access to objects with these object IDs.",
    ).optional(),
    status: z.enum(["NONE", "ASSIGNED", "ALL"]).describe(
      "Status of the filter. NONE means the user has access to none of the objects. ALL means the user has access to all objects. ASSIGNED means the user has access to the objects with IDs in the objectIds list.",
    ).optional(),
  }).describe("Object Filter.").optional(),
  userRoleId: z.string().describe(
    "User role ID of the user profile. This is a required field.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  accountId: z.string().optional(),
  active: z.boolean().optional(),
  advertiserFilter: z.object({
    kind: z.string(),
    objectIds: z.array(z.string()),
    status: z.string(),
  }).optional(),
  campaignFilter: z.object({
    kind: z.string(),
    objectIds: z.array(z.string()),
    status: z.string(),
  }).optional(),
  comments: z.string().optional(),
  email: z.string().optional(),
  id: z.string(),
  kind: z.string().optional(),
  locale: z.string().optional(),
  name: z.string().optional(),
  siteFilter: z.object({
    kind: z.string(),
    objectIds: z.array(z.string()),
    status: z.string(),
  }).optional(),
  subaccountId: z.string().optional(),
  traffickerType: z.string().optional(),
  userAccessType: z.string().optional(),
  userRoleFilter: z.object({
    kind: z.string(),
    objectIds: z.array(z.string()),
    status: z.string(),
  }).optional(),
  userRoleId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accountId: z.string().describe(
    "Account ID of the user profile. This is a read-only field that can be left blank.",
  ).optional(),
  active: z.boolean().describe(
    "Whether this user profile is active. This defaults to false, and must be set true on insert for the user profile to be usable.",
  ).optional(),
  advertiserFilter: z.object({
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#objectFilter".',
    ).optional(),
    objectIds: z.array(z.string()).describe(
      "Applicable when status is ASSIGNED. The user has access to objects with these object IDs.",
    ).optional(),
    status: z.enum(["NONE", "ASSIGNED", "ALL"]).describe(
      "Status of the filter. NONE means the user has access to none of the objects. ALL means the user has access to all objects. ASSIGNED means the user has access to the objects with IDs in the objectIds list.",
    ).optional(),
  }).describe("Object Filter.").optional(),
  campaignFilter: z.object({
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#objectFilter".',
    ).optional(),
    objectIds: z.array(z.string()).describe(
      "Applicable when status is ASSIGNED. The user has access to objects with these object IDs.",
    ).optional(),
    status: z.enum(["NONE", "ASSIGNED", "ALL"]).describe(
      "Status of the filter. NONE means the user has access to none of the objects. ALL means the user has access to all objects. ASSIGNED means the user has access to the objects with IDs in the objectIds list.",
    ).optional(),
  }).describe("Object Filter.").optional(),
  comments: z.string().describe("Comments for this user profile.").optional(),
  email: z.string().describe(
    "Email of the user profile. The email address must be linked to a Google Account. This field is required on insertion and is read-only after insertion.",
  ).optional(),
  id: z.string().describe(
    "ID of the user profile. This is a read-only, auto-generated field.",
  ).optional(),
  locale: z.string().describe(
    'Locale of the user profile. This is a required field. Acceptable values are: - "cs" (Czech) - "de" (German) - "en" (English) - "en-GB" (English United Kingdom) - "es" (Spanish) - "fr" (French) - "it" (Italian) - "ja" (Japanese) - "ko" (Korean) - "pl" (Polish) - "pt-BR" (Portuguese Brazil) - "ru" (Russian) - "sv" (Swedish) - "tr" (Turkish) - "zh-CN" (Chinese Simplified) - "zh-TW" (Chinese Traditional)',
  ).optional(),
  name: z.string().describe(
    'Name of the user profile. This is a required field. Must be less than 64 characters long, must be globally unique, and cannot contain whitespace or any of the following characters: "&;<>"#%,".',
  ).optional(),
  siteFilter: z.object({
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#objectFilter".',
    ).optional(),
    objectIds: z.array(z.string()).describe(
      "Applicable when status is ASSIGNED. The user has access to objects with these object IDs.",
    ).optional(),
    status: z.enum(["NONE", "ASSIGNED", "ALL"]).describe(
      "Status of the filter. NONE means the user has access to none of the objects. ALL means the user has access to all objects. ASSIGNED means the user has access to the objects with IDs in the objectIds list.",
    ).optional(),
  }).describe("Object Filter.").optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of the user profile. This is a read-only field that can be left blank.",
  ).optional(),
  traffickerType: z.enum([
    "INTERNAL_NON_TRAFFICKER",
    "INTERNAL_TRAFFICKER",
    "EXTERNAL_TRAFFICKER",
  ]).describe(
    "Trafficker type of this user profile. This is a read-only field.",
  ).optional(),
  userAccessType: z.enum([
    "NORMAL_USER",
    "SUPER_USER",
    "INTERNAL_ADMINISTRATOR",
    "READ_ONLY_SUPER_USER",
  ]).describe(
    "User type of the user profile. This is a read-only field that can be left blank.",
  ).optional(),
  userRoleFilter: z.object({
    kind: z.string().describe(
      'Identifies what kind of resource this is. Value: the fixed string "dfareporting#objectFilter".',
    ).optional(),
    objectIds: z.array(z.string()).describe(
      "Applicable when status is ASSIGNED. The user has access to objects with these object IDs.",
    ).optional(),
    status: z.enum(["NONE", "ASSIGNED", "ALL"]).describe(
      "Status of the filter. NONE means the user has access to none of the objects. ALL means the user has access to all objects. ASSIGNED means the user has access to the objects with IDs in the objectIds list.",
    ).optional(),
  }).describe("Object Filter.").optional(),
  userRoleId: z.string().describe(
    "User role ID of the user profile. This is a required field.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 AccountUserProfiles. Registered at `@swamp/gcp/dfareporting/accountuserprofiles`. */
export const model = {
  type: "@swamp/gcp/dfareporting/accountuserprofiles",
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
        "AccountUserProfiles contains properties of a Campaign Manager user profile. T...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a accountUserProfiles",
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
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["advertiserFilter"] !== undefined) {
          body["advertiserFilter"] = g["advertiserFilter"];
        }
        if (g["campaignFilter"] !== undefined) {
          body["campaignFilter"] = g["campaignFilter"];
        }
        if (g["comments"] !== undefined) body["comments"] = g["comments"];
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["locale"] !== undefined) body["locale"] = g["locale"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["siteFilter"] !== undefined) body["siteFilter"] = g["siteFilter"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["traffickerType"] !== undefined) {
          body["traffickerType"] = g["traffickerType"];
        }
        if (g["userAccessType"] !== undefined) {
          body["userAccessType"] = g["userAccessType"];
        }
        if (g["userRoleFilter"] !== undefined) {
          body["userRoleFilter"] = g["userRoleFilter"];
        }
        if (g["userRoleId"] !== undefined) body["userRoleId"] = g["userRoleId"];
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "profileId": String(g["profileId"] ?? "") },
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
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
      description: "Get a accountUserProfiles",
      arguments: z.object({
        identifier: z.string().describe("The id of the accountUserProfiles"),
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
      description: "Update accountUserProfiles attributes",
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
        if (g["active"] !== undefined) body["active"] = g["active"];
        if (g["advertiserFilter"] !== undefined) {
          body["advertiserFilter"] = g["advertiserFilter"];
        }
        if (g["campaignFilter"] !== undefined) {
          body["campaignFilter"] = g["campaignFilter"];
        }
        if (g["comments"] !== undefined) body["comments"] = g["comments"];
        if (g["email"] !== undefined) body["email"] = g["email"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["locale"] !== undefined) body["locale"] = g["locale"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["siteFilter"] !== undefined) body["siteFilter"] = g["siteFilter"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["traffickerType"] !== undefined) {
          body["traffickerType"] = g["traffickerType"];
        }
        if (g["userAccessType"] !== undefined) {
          body["userAccessType"] = g["userAccessType"];
        }
        if (g["userRoleFilter"] !== undefined) {
          body["userRoleFilter"] = g["userRoleFilter"];
        }
        if (g["userRoleId"] !== undefined) body["userRoleId"] = g["userRoleId"];
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
      description: "Sync accountUserProfiles state from GCP",
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
    list: {
      description: "List accountUserProfiles resources",
      arguments: z.object({
        active: z.boolean().describe("Select only active user profiles.")
          .optional(),
        ids: z.string().describe("Select only user profiles with these IDs.")
          .optional(),
        maxResults: z.number().describe("Maximum number of results to return.")
          .optional(),
        searchString: z.string().describe(
          'Allows searching for objects by name, ID or email. Wildcards (*) are allowed. For example, "user profile*2015" will return objects with names like "user profile June 2015", "user profile April 2015", or simply "user profile 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "user profile" will match objects with name "my user profile", "user profile 2015", or simply "user profile".',
        ).optional(),
        sortField: z.string().describe("Field by which to sort the list.")
          .optional(),
        sortOrder: z.string().describe("Order of sorted results.").optional(),
        subaccountId: z.string().describe(
          "Select only user profiles with the specified subaccount ID.",
        ).optional(),
        userRoleId: z.string().describe(
          "Select only user profiles with the specified user role ID.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (args["active"] !== undefined) {
          params["active"] = String(args["active"]);
        }
        if (args["ids"] !== undefined) params["ids"] = String(args["ids"]);
        if (args["maxResults"] !== undefined) {
          params["maxResults"] = String(args["maxResults"]);
        }
        if (args["searchString"] !== undefined) {
          params["searchString"] = String(args["searchString"]);
        }
        if (args["sortField"] !== undefined) {
          params["sortField"] = String(args["sortField"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        if (args["subaccountId"] !== undefined) {
          params["subaccountId"] = String(args["subaccountId"]);
        }
        if (args["userRoleId"] !== undefined) {
          params["userRoleId"] = String(args["userRoleId"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "accountUserProfiles",
          (args.maxPages as number | undefined) ?? 10,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.id?.toString() ?? String(i)).replace(
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
  },
};
