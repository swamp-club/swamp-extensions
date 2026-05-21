// Auto-generated extension model for @swamp/gcp/threatintelligence/configurations-revisions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Threat Intelligence Configurations.Revisions.
 *
 * A ConfigurationRevision is a snapshot of a Configuration at a point in time. It is immutable.
 *
 * Wraps the GCP resource as a swamp model so create, get, update,
 * delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  getProjectId,
  isResourceNotFoundError,
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://threatintelligence.googleapis.com/";

const LIST_CONFIG = {
  "id": "threatintelligence.projects.configurations.revisions.list",
  "path": "v1beta/{+parent}/revisions",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "filter": {
      "location": "query",
    },
    "orderBy": {
      "location": "query",
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  createTime: z.string().optional(),
  name: z.string(),
  snapshot: z.object({
    audit: z.object({
      createTime: z.string(),
      creator: z.string(),
      updateTime: z.string(),
      updater: z.string(),
    }),
    description: z.string(),
    detail: z.object({
      customerProfile: z.object({
        citations: z.array(z.object({
          citationId: z.unknown(),
          document: z.unknown(),
          retrievalTime: z.unknown(),
          source: z.unknown(),
          uri: z.unknown(),
        })),
        contactInfo: z.array(z.object({
          address: z.unknown(),
          citationIds: z.unknown(),
          email: z.unknown(),
          label: z.unknown(),
          other: z.unknown(),
          phone: z.unknown(),
        })),
        executives: z.array(z.object({
          citationIds: z.unknown(),
          name: z.unknown(),
          title: z.unknown(),
        })),
        industries: z.array(z.object({
          citationIds: z.unknown(),
          industry: z.unknown(),
        })),
        locations: z.array(z.object({
          address: z.unknown(),
          brand: z.unknown(),
          citationIds: z.unknown(),
          facilityType: z.unknown(),
        })),
        org: z.string(),
        orgSummary: z.string(),
        parentCompanies: z.array(z.object({
          citationIds: z.unknown(),
          company: z.unknown(),
        })),
        products: z.array(z.object({
          brand: z.unknown(),
          citationIds: z.unknown(),
          product: z.unknown(),
        })),
        securityConsiderations: z.object({
          considerations: z.array(z.unknown()),
          note: z.string(),
        }),
        summary: z.object({
          areaServed: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          brands: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          entityType: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          founded: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          headquarters: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          industry: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          keyPeopleSummary: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          parentCompany: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          primaryWebsite: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          productsSummary: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          servicesSummary: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
          title: z.object({
            citationIds: z.unknown(),
            value: z.unknown(),
          }),
        }),
        technologyPresence: z.string(),
        webPresences: z.array(z.object({
          citationIds: z.unknown(),
          domain: z.unknown(),
        })),
      }),
      detailType: z.string(),
    }),
    displayName: z.string(),
    name: z.string(),
    provider: z.string(),
    state: z.string(),
    version: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Threat Intelligence Configurations.Revisions. Registered at `@swamp/gcp/threatintelligence/configurations-revisions`. */
export const model = {
  type: "@swamp/gcp/threatintelligence/configurations-revisions",
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
      description:
        "A ConfigurationRevision is a snapshot of a Configuration at a point in time. ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a revisions",
      arguments: z.object({
        identifier: z.string().describe("The name of the revisions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
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
      description: "Sync revisions state from GCP",
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
          if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
          else if (existing["parent"]) {
            params["parent"] = String(existing["parent"]);
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
  },
};
