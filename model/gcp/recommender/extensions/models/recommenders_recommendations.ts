// Auto-generated extension model for @swamp/gcp/recommender/recommenders-recommendations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Recommender Recommenders.Recommendations.
 *
 * A recommendation along with a suggested action. E.g., a rightsizing recommendation for an underutilized VM, IAM role recommendations, etc
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

/** Construct the fully-qualified resource name from parent and short name. */
function buildResourceName(parent: string, shortName: string): string {
  return `${parent}/recommendations/${shortName}`;
}

const BASE_URL = "https://recommender.googleapis.com/";

const GET_CONFIG = {
  "id":
    "recommender.billingAccounts.locations.recommenders.recommendations.get",
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

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  additionalImpact: z.array(z.object({
    category: z.string(),
    costProjection: z.object({
      cost: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      costInLocalCurrency: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      duration: z.string(),
    }),
    reliabilityProjection: z.object({
      details: z.record(z.string(), z.unknown()),
      risks: z.array(z.string()),
    }),
    securityProjection: z.object({
      details: z.record(z.string(), z.unknown()),
    }),
    service: z.string(),
    sustainabilityProjection: z.object({
      duration: z.string(),
      kgCO2e: z.number(),
    }),
  })).optional(),
  associatedInsights: z.array(z.object({
    insight: z.string(),
  })).optional(),
  content: z.object({
    operationGroups: z.array(z.object({
      operations: z.array(z.object({
        action: z.unknown(),
        path: z.unknown(),
        pathFilters: z.unknown(),
        pathValueMatchers: z.unknown(),
        resource: z.unknown(),
        resourceType: z.unknown(),
        sourcePath: z.unknown(),
        sourceResource: z.unknown(),
        value: z.unknown(),
        valueMatcher: z.unknown(),
      })),
    })),
    overview: z.record(z.string(), z.unknown()),
  }).optional(),
  description: z.string().optional(),
  etag: z.string().optional(),
  lastRefreshTime: z.string().optional(),
  name: z.string(),
  primaryImpact: z.object({
    category: z.string(),
    costProjection: z.object({
      cost: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      costInLocalCurrency: z.object({
        currencyCode: z.string(),
        nanos: z.number(),
        units: z.string(),
      }),
      duration: z.string(),
    }),
    reliabilityProjection: z.object({
      details: z.record(z.string(), z.unknown()),
      risks: z.array(z.string()),
    }),
    securityProjection: z.object({
      details: z.record(z.string(), z.unknown()),
    }),
    service: z.string(),
    sustainabilityProjection: z.object({
      duration: z.string(),
      kgCO2e: z.number(),
    }),
  }).optional(),
  priority: z.string().optional(),
  recommenderSubtype: z.string().optional(),
  stateInfo: z.object({
    state: z.string(),
    stateMetadata: z.record(z.string(), z.unknown()),
  }).optional(),
  targetResources: z.array(z.string()).optional(),
  xorGroupId: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Recommender Recommenders.Recommendations. Registered at `@swamp/gcp/recommender/recommenders-recommendations`. */
export const model = {
  type: "@swamp/gcp/recommender/recommenders-recommendations",
  version: "2026.05.24.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A recommendation along with a suggested action. E.g., a rightsizing recommend...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a recommendations",
      arguments: z.object({
        identifier: z.string().describe("The name of the recommendations"),
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
    sync: {
      description: "Sync recommendations state from GCP",
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
    mark_claimed: {
      description: "mark claimed",
      arguments: z.object({
        etag: z.any().optional(),
        stateMetadata: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["stateMetadata"] !== undefined) {
          body["stateMetadata"] = args["stateMetadata"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "recommender.billingAccounts.locations.recommenders.recommendations.markClaimed",
            "path": "v1/{+name}:markClaimed",
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
    mark_dismissed: {
      description: "mark dismissed",
      arguments: z.object({
        etag: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "recommender.billingAccounts.locations.recommenders.recommendations.markDismissed",
            "path": "v1/{+name}:markDismissed",
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
    mark_failed: {
      description: "mark failed",
      arguments: z.object({
        etag: z.any().optional(),
        stateMetadata: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["stateMetadata"] !== undefined) {
          body["stateMetadata"] = args["stateMetadata"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "recommender.billingAccounts.locations.recommenders.recommendations.markFailed",
            "path": "v1/{+name}:markFailed",
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
    mark_succeeded: {
      description: "mark succeeded",
      arguments: z.object({
        etag: z.any().optional(),
        stateMetadata: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const body: Record<string, unknown> = {};
        if (args["etag"] !== undefined) body["etag"] = args["etag"];
        if (args["stateMetadata"] !== undefined) {
          body["stateMetadata"] = args["stateMetadata"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "recommender.billingAccounts.locations.recommenders.recommendations.markSucceeded",
            "path": "v1/{+name}:markSucceeded",
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
  },
};
