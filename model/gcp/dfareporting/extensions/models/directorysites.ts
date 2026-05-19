// Auto-generated extension model for @swamp/gcp/dfareporting/directorysites
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Campaign Manager 360 DirectorySites.
 *
 * DirectorySites contains properties of a website from the Site Directory. Sites need to be added to an account via the Sites resource before they can be assigned to a placement.
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

const BASE_URL = "https://dfareporting.googleapis.com/dfareporting/v5/";

const GET_CONFIG = {
  "id": "dfareporting.directorySites.get",
  "path": "userprofiles/{+profileId}/directorySites/{+id}",
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
  "id": "dfareporting.directorySites.insert",
  "path": "userprofiles/{+profileId}/directorySites",
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

const GlobalArgsSchema = z.object({
  id: z.string().describe(
    "ID of this directory site. This is a read-only, auto-generated field.",
  ).optional(),
  idDimensionValue: z.object({
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
  inpageTagFormats: z.array(
    z.enum([
      "STANDARD",
      "IFRAME_JAVASCRIPT_INPAGE",
      "INTERNAL_REDIRECT_INPAGE",
      "JAVASCRIPT_INPAGE",
    ]),
  ).describe(
    'Tag types for regular placements. Acceptable values are: - "STANDARD" - "IFRAME_JAVASCRIPT_INPAGE" - "INTERNAL_REDIRECT_INPAGE" - "JAVASCRIPT_INPAGE"',
  ).optional(),
  interstitialTagFormats: z.array(
    z.enum([
      "IFRAME_JAVASCRIPT_INTERSTITIAL",
      "INTERNAL_REDIRECT_INTERSTITIAL",
      "JAVASCRIPT_INTERSTITIAL",
    ]),
  ).describe(
    'Tag types for interstitial placements. Acceptable values are: - "IFRAME_JAVASCRIPT_INTERSTITIAL" - "INTERNAL_REDIRECT_INTERSTITIAL" - "JAVASCRIPT_INTERSTITIAL"',
  ).optional(),
  name: z.string().describe("Name of this directory site.").optional(),
  settings: z.object({
    activeViewOptOut: z.boolean().describe(
      "Whether this directory site has disabled active view creatives.",
    ).optional(),
    dfpSettings: z.object({
      dfpNetworkCode: z.string().describe(
        "Ad Manager network code for this directory site.",
      ).optional(),
      dfpNetworkName: z.string().describe(
        "Ad Manager network name for this directory site.",
      ).optional(),
      programmaticPlacementAccepted: z.boolean().describe(
        "Whether this directory site accepts programmatic placements.",
      ).optional(),
      pubPaidPlacementAccepted: z.boolean().describe(
        "Whether this directory site accepts publisher-paid tags.",
      ).optional(),
      publisherPortalOnly: z.boolean().describe(
        "Whether this directory site is available only via Publisher Portal.",
      ).optional(),
    }).describe("Google Ad Manager Settings").optional(),
    instreamVideoPlacementAccepted: z.boolean().describe(
      "Whether this site accepts in-stream video ads.",
    ).optional(),
    interstitialPlacementAccepted: z.boolean().describe(
      "Whether this site accepts interstitial ads.",
    ).optional(),
  }).describe("Directory Site Settings").optional(),
  url: z.string().describe("URL of this directory site.").optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ),
});

const StateSchema = z.object({
  id: z.string(),
  idDimensionValue: z.object({
    dimensionName: z.string(),
    etag: z.string(),
    id: z.string(),
    kind: z.string(),
    matchType: z.string(),
    value: z.string(),
  }).optional(),
  inpageTagFormats: z.array(z.string()).optional(),
  interstitialTagFormats: z.array(z.string()).optional(),
  kind: z.string().optional(),
  name: z.string().optional(),
  publisherSpecificationId: z.string().optional(),
  settings: z.object({
    activeViewOptOut: z.boolean(),
    dfpSettings: z.object({
      dfpNetworkCode: z.string(),
      dfpNetworkName: z.string(),
      programmaticPlacementAccepted: z.boolean(),
      pubPaidPlacementAccepted: z.boolean(),
      publisherPortalOnly: z.boolean(),
    }),
    instreamVideoPlacementAccepted: z.boolean(),
    interstitialPlacementAccepted: z.boolean(),
  }).optional(),
  url: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  id: z.string().describe(
    "ID of this directory site. This is a read-only, auto-generated field.",
  ).optional(),
  idDimensionValue: z.object({
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
  inpageTagFormats: z.array(
    z.enum([
      "STANDARD",
      "IFRAME_JAVASCRIPT_INPAGE",
      "INTERNAL_REDIRECT_INPAGE",
      "JAVASCRIPT_INPAGE",
    ]),
  ).describe(
    'Tag types for regular placements. Acceptable values are: - "STANDARD" - "IFRAME_JAVASCRIPT_INPAGE" - "INTERNAL_REDIRECT_INPAGE" - "JAVASCRIPT_INPAGE"',
  ).optional(),
  interstitialTagFormats: z.array(
    z.enum([
      "IFRAME_JAVASCRIPT_INTERSTITIAL",
      "INTERNAL_REDIRECT_INTERSTITIAL",
      "JAVASCRIPT_INTERSTITIAL",
    ]),
  ).describe(
    'Tag types for interstitial placements. Acceptable values are: - "IFRAME_JAVASCRIPT_INTERSTITIAL" - "INTERNAL_REDIRECT_INTERSTITIAL" - "JAVASCRIPT_INTERSTITIAL"',
  ).optional(),
  name: z.string().describe("Name of this directory site.").optional(),
  settings: z.object({
    activeViewOptOut: z.boolean().describe(
      "Whether this directory site has disabled active view creatives.",
    ).optional(),
    dfpSettings: z.object({
      dfpNetworkCode: z.string().describe(
        "Ad Manager network code for this directory site.",
      ).optional(),
      dfpNetworkName: z.string().describe(
        "Ad Manager network name for this directory site.",
      ).optional(),
      programmaticPlacementAccepted: z.boolean().describe(
        "Whether this directory site accepts programmatic placements.",
      ).optional(),
      pubPaidPlacementAccepted: z.boolean().describe(
        "Whether this directory site accepts publisher-paid tags.",
      ).optional(),
      publisherPortalOnly: z.boolean().describe(
        "Whether this directory site is available only via Publisher Portal.",
      ).optional(),
    }).describe("Google Ad Manager Settings").optional(),
    instreamVideoPlacementAccepted: z.boolean().describe(
      "Whether this site accepts in-stream video ads.",
    ).optional(),
    interstitialPlacementAccepted: z.boolean().describe(
      "Whether this site accepts interstitial ads.",
    ).optional(),
  }).describe("Directory Site Settings").optional(),
  url: z.string().describe("URL of this directory site.").optional(),
  profileId: z.string().describe(
    "User profile ID associated with this request.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Campaign Manager 360 DirectorySites. Registered at `@swamp/gcp/dfareporting/directorysites`. */
export const model = {
  type: "@swamp/gcp/dfareporting/directorysites",
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
      description:
        "DirectorySites contains properties of a website from the Site Directory. Site...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a directorySites",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["profileId"] !== undefined) {
          params["profileId"] = String(g["profileId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["idDimensionValue"] !== undefined) {
          body["idDimensionValue"] = g["idDimensionValue"];
        }
        if (g["inpageTagFormats"] !== undefined) {
          body["inpageTagFormats"] = g["inpageTagFormats"];
        }
        if (g["interstitialTagFormats"] !== undefined) {
          body["interstitialTagFormats"] = g["interstitialTagFormats"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["settings"] !== undefined) body["settings"] = g["settings"];
        if (g["url"] !== undefined) body["url"] = g["url"];
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
      description: "Get a directorySites",
      arguments: z.object({
        identifier: z.string().describe("The id of the directorySites"),
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
    sync: {
      description: "Sync directorySites state from GCP",
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
