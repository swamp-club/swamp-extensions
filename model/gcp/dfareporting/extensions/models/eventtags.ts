// Auto-generated extension model for @swamp/gcp/dfareporting/eventtags
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 EventTags.
 *
 * Contains properties of an event tag.
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

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.eventTags.get",
  "path": "userprofiles/{+profileId}/eventTags/{+id}",
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
  "id": "dfareporting.eventTags.insert",
  "path": "userprofiles/{+profileId}/eventTags",
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
  "id": "dfareporting.eventTags.update",
  "path": "userprofiles/{+profileId}/eventTags",
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
  "id": "dfareporting.eventTags.delete",
  "path": "userprofiles/{+profileId}/eventTags/{+id}",
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

const LIST_CONFIG = {
  "id": "dfareporting.eventTags.list",
  "path": "userprofiles/{+profileId}/eventTags",
  "httpMethod": "GET",
  "parameterOrder": [
    "profileId",
  ],
  "parameters": {
    "adId": {
      "location": "query",
    },
    "advertiserId": {
      "location": "query",
    },
    "campaignId": {
      "location": "query",
    },
    "definitionsOnly": {
      "location": "query",
    },
    "enabled": {
      "location": "query",
    },
    "eventTagTypes": {
      "location": "query",
    },
    "ids": {
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
  },
} as const;

const GlobalArgsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
  accountId: z.string().describe(
    "Account ID of this event tag. This is a read-only field that can be left blank.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this event tag. This field or the campaignId field is required on insertion.",
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
  campaignId: z.string().describe(
    "Campaign ID of this event tag. This field or the advertiserId field is required on insertion.",
  ).optional(),
  campaignIdDimensionValue: z.object({
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
  enabledByDefault: z.boolean().describe(
    "Whether this event tag should be automatically enabled for all of the advertiser's campaigns and ads.",
  ).optional(),
  excludeFromAdxRequests: z.boolean().describe(
    "Whether to remove this event tag from ads that are trafficked through Display & Video 360 to Ad Exchange. This may be useful if the event tag uses a pixel that is unapproved for Ad Exchange bids on one or more networks, such as the Google Display Network.",
  ).optional(),
  id: z.string().describe(
    "ID of this event tag. This is a read-only, auto-generated field.",
  ).optional(),
  name: z.string().describe(
    "Name of this event tag. This is a required field and must be less than 256 characters long.",
  ).optional(),
  siteFilterType: z.enum(["ALLOWLIST", "BLOCKLIST"]).describe(
    "Site filter type for this event tag. If no type is specified then the event tag will be applied to all sites.",
  ).optional(),
  siteIds: z.array(z.string()).describe(
    "Filter list of site IDs associated with this event tag. The siteFilterType determines whether this is a allowlist or blocklist filter.",
  ).optional(),
  sslCompliant: z.boolean().describe(
    "Whether this tag is SSL-compliant or not. This is a read-only field.",
  ).optional(),
  status: z.enum(["ENABLED", "DISABLED"]).describe(
    "Status of this event tag. Must be ENABLED for this event tag to fire. This is a required field.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this event tag. This is a read-only field that can be left blank.",
  ).optional(),
  type: z.enum([
    "IMPRESSION_IMAGE_EVENT_TAG",
    "IMPRESSION_JAVASCRIPT_EVENT_TAG",
    "CLICK_THROUGH_EVENT_TAG",
  ]).describe(
    "Event tag type. Can be used to specify whether to use a third-party pixel, a third-party JavaScript URL, or a third-party click-through URL for either impression or click tracking. This is a required field.",
  ).optional(),
  url: z.string().describe(
    "Payload URL for this event tag. The URL on a click-through event tag should have a landing page URL appended to the end of it. This field is required on insertion.",
  ).optional(),
  urlEscapeLevels: z.number().int().describe(
    "Number of times the landing page URL should be URL-escaped before being appended to the click-through event tag URL. Only applies to click-through event tags as specified by the event tag type.",
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
  campaignId: z.string().optional(),
  campaignIdDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  enabledByDefault: z.boolean().optional(),
  excludeFromAdxRequests: z.boolean().optional(),
  id: z.string(),
  kind: z.string().optional(),
  name: z.string().optional(),
  siteFilterType: z.string().optional(),
  siteIds: z.array(z.string()).optional(),
  sslCompliant: z.boolean().optional(),
  status: z.string().optional(),
  subaccountId: z.string().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
  urlEscapeLevels: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
  accountId: z.string().describe(
    "Account ID of this event tag. This is a read-only field that can be left blank.",
  ).optional(),
  advertiserId: z.string().describe(
    "Advertiser ID of this event tag. This field or the campaignId field is required on insertion.",
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
  campaignId: z.string().describe(
    "Campaign ID of this event tag. This field or the advertiserId field is required on insertion.",
  ).optional(),
  campaignIdDimensionValue: z.object({
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
  enabledByDefault: z.boolean().describe(
    "Whether this event tag should be automatically enabled for all of the advertiser's campaigns and ads.",
  ).optional(),
  excludeFromAdxRequests: z.boolean().describe(
    "Whether to remove this event tag from ads that are trafficked through Display & Video 360 to Ad Exchange. This may be useful if the event tag uses a pixel that is unapproved for Ad Exchange bids on one or more networks, such as the Google Display Network.",
  ).optional(),
  id: z.string().describe(
    "ID of this event tag. This is a read-only, auto-generated field.",
  ).optional(),
  name: z.string().describe(
    "Name of this event tag. This is a required field and must be less than 256 characters long.",
  ).optional(),
  siteFilterType: z.enum(["ALLOWLIST", "BLOCKLIST"]).describe(
    "Site filter type for this event tag. If no type is specified then the event tag will be applied to all sites.",
  ).optional(),
  siteIds: z.array(z.string()).describe(
    "Filter list of site IDs associated with this event tag. The siteFilterType determines whether this is a allowlist or blocklist filter.",
  ).optional(),
  sslCompliant: z.boolean().describe(
    "Whether this tag is SSL-compliant or not. This is a read-only field.",
  ).optional(),
  status: z.enum(["ENABLED", "DISABLED"]).describe(
    "Status of this event tag. Must be ENABLED for this event tag to fire. This is a required field.",
  ).optional(),
  subaccountId: z.string().describe(
    "Subaccount ID of this event tag. This is a read-only field that can be left blank.",
  ).optional(),
  type: z.enum([
    "IMPRESSION_IMAGE_EVENT_TAG",
    "IMPRESSION_JAVASCRIPT_EVENT_TAG",
    "CLICK_THROUGH_EVENT_TAG",
  ]).describe(
    "Event tag type. Can be used to specify whether to use a third-party pixel, a third-party JavaScript URL, or a third-party click-through URL for either impression or click tracking. This is a required field.",
  ).optional(),
  url: z.string().describe(
    "Payload URL for this event tag. The URL on a click-through event tag should have a landing page URL appended to the end of it. This field is required on insertion.",
  ).optional(),
  urlEscapeLevels: z.number().int().describe(
    "Number of times the landing page URL should be URL-escaped before being appended to the click-through event tag URL. Only applies to click-through event tags as specified by the event tag type.",
  ).optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
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

/** Swamp extension model for Google Cloud Campaign Manager 360 EventTags. Registered at `@swamp/gcp/dfareporting/eventtags`. */
export const model = {
  type: "@swamp/gcp/dfareporting/eventtags",
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
      description: "Contains properties of an event tag.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a eventTags",
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
        if (g["campaignId"] !== undefined) body["campaignId"] = g["campaignId"];
        if (g["campaignIdDimensionValue"] !== undefined) {
          body["campaignIdDimensionValue"] = g["campaignIdDimensionValue"];
        }
        if (g["enabledByDefault"] !== undefined) {
          body["enabledByDefault"] = g["enabledByDefault"];
        }
        if (g["excludeFromAdxRequests"] !== undefined) {
          body["excludeFromAdxRequests"] = g["excludeFromAdxRequests"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["siteFilterType"] !== undefined) {
          body["siteFilterType"] = g["siteFilterType"];
        }
        if (g["siteIds"] !== undefined) body["siteIds"] = g["siteIds"];
        if (g["sslCompliant"] !== undefined) {
          body["sslCompliant"] = g["sslCompliant"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["url"] !== undefined) body["url"] = g["url"];
        if (g["urlEscapeLevels"] !== undefined) {
          body["urlEscapeLevels"] = g["urlEscapeLevels"];
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ENABLED"],
              "failedValues": [],
            }
            : undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "profileId": String(g["profileId"] ?? "") },
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
          credentials,
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
      description: "Get a eventTags",
      arguments: z.object({
        identifier: z.string().describe("The id of the eventTags"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
          credentials,
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
      description: "Update eventTags attributes",
      arguments: z.object({
        waitForReady: z.boolean().describe(
          "Wait for the resource to reach a ready state after update (default: true)",
        ).optional(),
      }),
      execute: async (args: { waitForReady?: boolean }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
        if (g["campaignId"] !== undefined) body["campaignId"] = g["campaignId"];
        if (g["campaignIdDimensionValue"] !== undefined) {
          body["campaignIdDimensionValue"] = g["campaignIdDimensionValue"];
        }
        if (g["enabledByDefault"] !== undefined) {
          body["enabledByDefault"] = g["enabledByDefault"];
        }
        if (g["excludeFromAdxRequests"] !== undefined) {
          body["excludeFromAdxRequests"] = g["excludeFromAdxRequests"];
        }
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["siteFilterType"] !== undefined) {
          body["siteFilterType"] = g["siteFilterType"];
        }
        if (g["siteIds"] !== undefined) body["siteIds"] = g["siteIds"];
        if (g["sslCompliant"] !== undefined) {
          body["sslCompliant"] = g["sslCompliant"];
        }
        if (g["status"] !== undefined) body["status"] = g["status"];
        if (g["subaccountId"] !== undefined) {
          body["subaccountId"] = g["subaccountId"];
        }
        if (g["type"] !== undefined) body["type"] = g["type"];
        if (g["url"] !== undefined) body["url"] = g["url"];
        if (g["urlEscapeLevels"] !== undefined) {
          body["urlEscapeLevels"] = g["urlEscapeLevels"];
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
          (args.waitForReady ?? true)
            ? {
              "statusField": "status",
              "readyValues": ["ENABLED"],
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
      description: "Delete the eventTags",
      arguments: z.object({
        identifier: z.string().describe("The id of the eventTags"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        params["id"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
          credentials,
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
      description: "Sync eventTags state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List eventTags resources",
      arguments: z.object({
        adId: z.string().describe(
          "Select only event tags that belong to this ad.",
        ).optional(),
        advertiserId: z.string().describe(
          "Select only event tags that belong to this advertiser.",
        ).optional(),
        campaignId: z.string().describe(
          "Select only event tags that belong to this campaign.",
        ).optional(),
        definitionsOnly: z.boolean().describe(
          "Examine only the specified campaign or advertiser's event tags for matching selector criteria. When set to false, the parent advertiser and parent campaign of the specified ad or campaign is examined as well. In addition, when set to false, the status field is examined as well, along with the enabledByDefault field. This parameter can not be set to true when adId is specified as ads do not define their own even tags.",
        ).optional(),
        enabled: z.boolean().describe(
          "Select only enabled event tags. What is considered enabled or disabled depends on the definitionsOnly parameter. When definitionsOnly is set to true, only the specified advertiser or campaign's event tags' enabledByDefault field is examined. When definitionsOnly is set to false, the specified ad or specified campaign's parent advertiser's or parent campaign's event tags' enabledByDefault and status fields are examined as well.",
        ).optional(),
        eventTagTypes: z.string().describe(
          "Select only event tags with the specified event tag types. Event tag types can be used to specify whether to use a third-party pixel, a third-party JavaScript URL, or a third-party click-through URL for either impression or click tracking.",
        ).optional(),
        ids: z.string().describe("Select only event tags with these IDs.")
          .optional(),
        searchString: z.string().describe(
          'Allows searching for objects by name or ID. Wildcards (*) are allowed. For example, "eventtag*2015" will return objects with names like "eventtag June 2015", "eventtag April 2015", or simply "eventtag 2015". Most of the searches also add wildcards implicitly at the start and the end of the search string. For example, a search string of "eventtag" will match objects with name "my eventtag", "eventtag 2015", or simply "eventtag".',
        ).optional(),
        sortField: z.string().describe("Field by which to sort the list.")
          .optional(),
        sortOrder: z.string().describe("Order of sorted results.").optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        if (args["adId"] !== undefined) params["adId"] = String(args["adId"]);
        if (args["advertiserId"] !== undefined) {
          params["advertiserId"] = String(args["advertiserId"]);
        }
        if (args["campaignId"] !== undefined) {
          params["campaignId"] = String(args["campaignId"]);
        }
        if (args["definitionsOnly"] !== undefined) {
          params["definitionsOnly"] = String(args["definitionsOnly"]);
        }
        if (args["enabled"] !== undefined) {
          params["enabled"] = String(args["enabled"]);
        }
        if (args["eventTagTypes"] !== undefined) {
          params["eventTagTypes"] = String(args["eventTagTypes"]);
        }
        if (args["ids"] !== undefined) params["ids"] = String(args["ids"]);
        if (args["searchString"] !== undefined) {
          params["searchString"] = String(args["searchString"]);
        }
        if (args["sortField"] !== undefined) {
          params["sortField"] = String(args["sortField"]);
        }
        if (args["sortOrder"] !== undefined) {
          params["sortOrder"] = String(args["sortOrder"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "eventTags",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
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
