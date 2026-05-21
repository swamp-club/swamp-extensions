// Auto-generated extension model for @swamp/gcp/logging/entries
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Logging Entries.
 *
 * An individual entry in a log.
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://logging.googleapis.com/";

const LIST_CONFIG = {
  "id": "logging.entries.list",
  "path": "v2/entries:list",
  "httpMethod": "POST",
  "parameterOrder": [],
  "parameters": {},
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
});

const StateSchema = z.object({
  apphub: z.object({
    application: z.object({
      container: z.string(),
      id: z.string(),
      location: z.string(),
    }),
    service: z.object({
      criticalityType: z.string(),
      environmentType: z.string(),
      id: z.string(),
    }),
    workload: z.object({
      criticalityType: z.string(),
      environmentType: z.string(),
      id: z.string(),
    }),
  }).optional(),
  apphubDestination: z.object({
    application: z.object({
      container: z.string(),
      id: z.string(),
      location: z.string(),
    }),
    service: z.object({
      criticalityType: z.string(),
      environmentType: z.string(),
      id: z.string(),
    }),
    workload: z.object({
      criticalityType: z.string(),
      environmentType: z.string(),
      id: z.string(),
    }),
  }).optional(),
  apphubSource: z.object({
    application: z.object({
      container: z.string(),
      id: z.string(),
      location: z.string(),
    }),
    service: z.object({
      criticalityType: z.string(),
      environmentType: z.string(),
      id: z.string(),
    }),
    workload: z.object({
      criticalityType: z.string(),
      environmentType: z.string(),
      id: z.string(),
    }),
  }).optional(),
  errorGroups: z.array(z.object({
    id: z.string(),
  })).optional(),
  httpRequest: z.object({
    cacheFillBytes: z.string(),
    cacheHit: z.boolean(),
    cacheLookup: z.boolean(),
    cacheValidatedWithOriginServer: z.boolean(),
    latency: z.string(),
    protocol: z.string(),
    referer: z.string(),
    remoteIp: z.string(),
    requestMethod: z.string(),
    requestSize: z.string(),
    requestUrl: z.string(),
    responseSize: z.string(),
    serverIp: z.string(),
    status: z.number(),
    userAgent: z.string(),
  }).optional(),
  insertId: z.string().optional(),
  jsonPayload: z.record(z.string(), z.unknown()).optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  logName: z.string().optional(),
  metadata: z.object({
    systemLabels: z.record(z.string(), z.unknown()),
    userLabels: z.record(z.string(), z.unknown()),
  }).optional(),
  operation: z.object({
    first: z.boolean(),
    id: z.string(),
    last: z.boolean(),
    producer: z.string(),
  }).optional(),
  otel: z.record(z.string(), z.unknown()).optional(),
  protoPayload: z.record(z.string(), z.unknown()).optional(),
  receiveTimestamp: z.string().optional(),
  resource: z.object({
    labels: z.record(z.string(), z.unknown()),
    type: z.string(),
  }).optional(),
  severity: z.string().optional(),
  sourceLocation: z.object({
    file: z.string(),
    function: z.string(),
    line: z.string(),
  }).optional(),
  spanId: z.string().optional(),
  split: z.object({
    index: z.number(),
    totalSplits: z.number(),
    uid: z.string(),
  }).optional(),
  textPayload: z.string().optional(),
  timestamp: z.string().optional(),
  trace: z.string().optional(),
  traceSampled: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
});

/** Swamp extension model for Google Cloud Logging Entries. Registered at `@swamp/gcp/logging/entries`. */
export const model = {
  type: "@swamp/gcp/logging/entries",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.18.2",
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
      toVersion: "2026.05.20.1",
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
      description: "An individual entry in a log.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    get: {
      description: "Get a entries",
      arguments: z.object({
        identifier: z.string().describe("The name of the entries"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
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
      description: "Sync entries state from GCP",
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
    copy: {
      description: "copy",
      arguments: z.object({
        destination: z.any().optional(),
        filter: z.any().optional(),
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["destination"] !== undefined) {
          body["destination"] = args["destination"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["name"] !== undefined) body["name"] = args["name"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "logging.entries.copy",
            "path": "v2/entries:copy",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
    tail: {
      description: "tail",
      arguments: z.object({
        bufferWindow: z.any().optional(),
        filter: z.any().optional(),
        resourceNames: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["bufferWindow"] !== undefined) {
          body["bufferWindow"] = args["bufferWindow"];
        }
        if (args["filter"] !== undefined) body["filter"] = args["filter"];
        if (args["resourceNames"] !== undefined) {
          body["resourceNames"] = args["resourceNames"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "logging.entries.tail",
            "path": "v2/entries:tail",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
    write: {
      description: "write",
      arguments: z.object({
        dryRun: z.any().optional(),
        entries: z.any().optional(),
        labels: z.any().optional(),
        logName: z.any().optional(),
        partialSuccess: z.any().optional(),
        resource: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, _context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const body: Record<string, unknown> = {};
        if (args["dryRun"] !== undefined) body["dryRun"] = args["dryRun"];
        if (args["entries"] !== undefined) body["entries"] = args["entries"];
        if (args["labels"] !== undefined) body["labels"] = args["labels"];
        if (args["logName"] !== undefined) body["logName"] = args["logName"];
        if (args["partialSuccess"] !== undefined) {
          body["partialSuccess"] = args["partialSuccess"];
        }
        if (args["resource"] !== undefined) body["resource"] = args["resource"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "logging.entries.write",
            "path": "v2/entries:write",
            "httpMethod": "POST",
            "parameterOrder": [],
            "parameters": {},
          },
          params,
          body,
        );
        return { result };
      },
    },
  },
};
