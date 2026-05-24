// Auto-generated extension model for @swamp/gcp/threatintelligence/configurations
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Threat Intelligence Configurations.
 *
 * A configuration represents a behavior an engine should follow when producing new findings.
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
  return `${parent}/configurations/${shortName}`;
}

const BASE_URL = "https://threatintelligence.googleapis.com/";

const GET_CONFIG = {
  "id": "threatintelligence.projects.configurations.get",
  "path": "v1beta/{+name}",
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
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

const StateSchema = z.object({
  audit: z.object({
    createTime: z.string(),
    creator: z.string(),
    updateTime: z.string(),
    updater: z.string(),
  }).optional(),
  description: z.string().optional(),
  detail: z.object({
    customerProfile: z.object({
      citations: z.array(z.object({
        citationId: z.string(),
        document: z.string(),
        retrievalTime: z.string(),
        source: z.string(),
        uri: z.string(),
      })),
      contactInfo: z.array(z.object({
        address: z.string(),
        citationIds: z.array(z.unknown()),
        email: z.string(),
        label: z.string(),
        other: z.string(),
        phone: z.string(),
      })),
      executives: z.array(z.object({
        citationIds: z.array(z.unknown()),
        name: z.string(),
        title: z.string(),
      })),
      industries: z.array(z.object({
        citationIds: z.array(z.unknown()),
        industry: z.string(),
      })),
      locations: z.array(z.object({
        address: z.string(),
        brand: z.string(),
        citationIds: z.array(z.unknown()),
        facilityType: z.string(),
      })),
      org: z.string(),
      orgSummary: z.string(),
      parentCompanies: z.array(z.object({
        citationIds: z.array(z.unknown()),
        company: z.string(),
      })),
      products: z.array(z.object({
        brand: z.string(),
        citationIds: z.array(z.unknown()),
        product: z.string(),
      })),
      securityConsiderations: z.object({
        considerations: z.array(z.string()),
        note: z.string(),
      }),
      summary: z.object({
        areaServed: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        brands: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        entityType: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        founded: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        headquarters: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        industry: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        keyPeopleSummary: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        parentCompany: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        primaryWebsite: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        productsSummary: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        servicesSummary: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
        title: z.object({
          citationIds: z.array(z.unknown()),
          value: z.string(),
        }),
      }),
      technologyPresence: z.string(),
      webPresences: z.array(z.object({
        citationIds: z.array(z.unknown()),
        domain: z.string(),
      })),
    }),
    detailType: z.string(),
  }).optional(),
  displayName: z.string().optional(),
  name: z.string(),
  provider: z.string().optional(),
  state: z.string().optional(),
  version: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  location: z.string().describe(
    "The location for this resource (e.g., 'us', 'us-central1', 'europe-west1')",
  ).optional(),
});

/** Swamp extension model for Google Cloud Threat Intelligence Configurations. Registered at `@swamp/gcp/threatintelligence/configurations`. */
export const model = {
  type: "@swamp/gcp/threatintelligence/configurations",
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
      toVersion: "2026.05.18.1",
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
        "A configuration represents a behavior an engine should follow when producing ...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a configurations",
      arguments: z.object({
        identifier: z.string().describe("The name of the configurations"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = buildResourceName(
          `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
      description: "Sync configurations state from GCP",
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
            `projects/${projectId}/locations/${String(g["location"] ?? "")}`,
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
    upsert: {
      description: "upsert",
      arguments: z.object({
        audit: z.any().optional(),
        description: z.any().optional(),
        detail: z.any().optional(),
        displayName: z.any().optional(),
        name: z.any().optional(),
        provider: z.any().optional(),
        state: z.any().optional(),
        version: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["audit"] !== undefined) body["audit"] = args["audit"];
        if (args["description"] !== undefined) {
          body["description"] = args["description"];
        }
        if (args["detail"] !== undefined) body["detail"] = args["detail"];
        if (args["displayName"] !== undefined) {
          body["displayName"] = args["displayName"];
        }
        if (args["name"] !== undefined) body["name"] = args["name"];
        if (args["provider"] !== undefined) body["provider"] = args["provider"];
        if (args["state"] !== undefined) body["state"] = args["state"];
        if (args["version"] !== undefined) body["version"] = args["version"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "threatintelligence.projects.configurations.upsert",
            "path": "v1beta/{+parent}/configurations:upsert",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
              "publishTime": { "location": "query" },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
