// Auto-generated extension model for @swamp/gcp/serviceusage/services
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Service Usage Services.
 *
 * A service that is available for use by the consumer.
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
  return `${parent}/services/${shortName}`;
}

const BASE_URL = "https://serviceusage.googleapis.com/";

const GET_CONFIG = {
  "id": "serviceusage.services.get",
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
  config: z.object({
    apis: z.array(z.object({
      edition: z.string(),
      methods: z.array(z.object({
        edition: z.unknown(),
        name: z.unknown(),
        options: z.unknown(),
        requestStreaming: z.unknown(),
        requestTypeUrl: z.unknown(),
        responseStreaming: z.unknown(),
        responseTypeUrl: z.unknown(),
        syntax: z.unknown(),
      })),
      mixins: z.array(z.object({
        name: z.unknown(),
        root: z.unknown(),
      })),
      name: z.string(),
      options: z.array(z.object({
        name: z.unknown(),
        value: z.unknown(),
      })),
      sourceContext: z.object({
        fileName: z.string(),
      }),
      syntax: z.string(),
      version: z.string(),
    })),
    authentication: z.object({
      providers: z.array(z.object({
        audiences: z.string(),
        authorizationUrl: z.string(),
        id: z.string(),
        issuer: z.string(),
        jwksUri: z.string(),
        jwtLocations: z.array(z.unknown()),
      })),
      rules: z.array(z.object({
        allowWithoutCredential: z.boolean(),
        oauth: z.object({
          canonicalScopes: z.unknown(),
        }),
        requirements: z.array(z.unknown()),
        selector: z.string(),
      })),
    }),
    documentation: z.object({
      additionalIamInfo: z.string(),
      documentationRootUrl: z.string(),
      overview: z.string(),
      pages: z.array(z.object({
        content: z.string(),
        name: z.string(),
        subpages: z.array(z.unknown()),
      })),
      rules: z.array(z.object({
        deprecationDescription: z.string(),
        description: z.string(),
        disableReplacementWords: z.string(),
        selector: z.string(),
      })),
      sectionOverrides: z.array(z.object({
        content: z.string(),
        name: z.string(),
        subpages: z.array(z.unknown()),
      })),
      serviceRootUrl: z.string(),
      summary: z.string(),
    }),
    endpoints: z.array(z.object({
      aliases: z.array(z.string()),
      allowCors: z.boolean(),
      name: z.string(),
      target: z.string(),
    })),
    monitoredResources: z.array(z.object({
      description: z.string(),
      displayName: z.string(),
      labels: z.array(z.object({
        description: z.unknown(),
        key: z.unknown(),
        valueType: z.unknown(),
      })),
      launchStage: z.string(),
      name: z.string(),
      type: z.string(),
    })),
    monitoring: z.object({
      consumerDestinations: z.array(z.object({
        metrics: z.array(z.unknown()),
        monitoredResource: z.string(),
      })),
      producerDestinations: z.array(z.object({
        metrics: z.array(z.unknown()),
        monitoredResource: z.string(),
      })),
    }),
    name: z.string(),
    quota: z.object({
      limits: z.array(z.object({
        defaultLimit: z.string(),
        description: z.string(),
        displayName: z.string(),
        duration: z.string(),
        freeTier: z.string(),
        maxLimit: z.string(),
        metric: z.string(),
        name: z.string(),
        unit: z.string(),
        values: z.record(z.string(), z.unknown()),
      })),
      metricRules: z.array(z.object({
        metricCosts: z.record(z.string(), z.unknown()),
        selector: z.string(),
      })),
    }),
    title: z.string(),
    usage: z.object({
      producerNotificationChannel: z.string(),
      requirements: z.array(z.string()),
      rules: z.array(z.object({
        allowUnregisteredCalls: z.boolean(),
        selector: z.string(),
        skipServiceControl: z.boolean(),
      })),
    }),
  }).optional(),
  name: z.string(),
  parent: z.string().optional(),
  state: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Service Usage Services. Registered at `@swamp/gcp/serviceusage/services`. */
export const model = {
  type: "@swamp/gcp/serviceusage/services",
  version: "2026.05.21.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A service that is available for use by the consumer.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a services",
      arguments: z.object({
        identifier: z.string().describe("The name of the services"),
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
      description: "Sync services state from GCP",
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
    batch_enable: {
      description: "batch enable",
      arguments: z.object({
        serviceIds: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (args["serviceIds"] !== undefined) {
          body["serviceIds"] = args["serviceIds"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "serviceusage.services.batchEnable",
            "path": "v1/{+parent}/services:batchEnable",
            "httpMethod": "POST",
            "parameterOrder": ["parent"],
            "parameters": {
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_get: {
      description: "batch get",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "serviceusage.services.batchGet",
            "path": "v1/{+parent}/services:batchGet",
            "httpMethod": "GET",
            "parameterOrder": ["parent"],
            "parameters": {
              "names": { "location": "query" },
              "parent": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    disable: {
      description: "disable",
      arguments: z.object({
        checkIfServiceHasUsage: z.any().optional(),
        disableDependentServices: z.any().optional(),
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
        if (args["checkIfServiceHasUsage"] !== undefined) {
          body["checkIfServiceHasUsage"] = args["checkIfServiceHasUsage"];
        }
        if (args["disableDependentServices"] !== undefined) {
          body["disableDependentServices"] = args["disableDependentServices"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "serviceusage.services.disable",
            "path": "v1/{+name}:disable",
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
    enable: {
      description: "enable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "serviceusage.services.enable",
            "path": "v1/{+name}:enable",
            "httpMethod": "POST",
            "parameterOrder": ["name"],
            "parameters": { "name": { "location": "path", "required": true } },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
