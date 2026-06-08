// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

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
  type ExplicitGcpCredentials,
  getProjectId,
  isResourceNotFoundError,
  listResources,
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
  accessToken: z.string().meta({ sensitive: true }).describe(
    "GCP OAuth2 access token; overrides GCP_ACCESS_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).describe(
    "GCP service account JSON credentials; overrides GOOGLE_APPLICATION_CREDENTIALS_JSON environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  project: z.string().describe(
    "GCP project ID; overrides GCP_PROJECT / GOOGLE_CLOUD_PROJECT environment variables.",
  ).optional(),
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
  accessToken: z.string().meta({ sensitive: true }).optional(),
  credentialsJson: z.string().meta({ sensitive: true }).optional(),
  project: z.string().optional(),
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

/** Swamp extension model for Google Cloud Logging Entries. Registered at `@swamp/gcp/logging/entries`. */
export const model = {
  type: "@swamp/gcp/logging/entries",
  version: "2026.06.08.1",
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
      toVersion: "2026.05.25.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.26.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.07.1",
      description: "Added: accessToken, credentialsJson, project",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
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
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const result = await readViaList(
          BASE_URL,
          LIST_CONFIG,
          params,
          "name",
          args.identifier,
          credentials,
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
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
      description: "List entries resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
        const params: Record<string, string> = { project: projectId };
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "entries",
          (args.maxPages as number | undefined) ?? 10,
          credentials,
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i] as StateData;
          const instanceName = (item.name?.toString() ?? String(i)).replace(
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
    copy: {
      description: "copy",
      arguments: z.object({
        destination: z.any().optional(),
        filter: z.any().optional(),
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          undefined,
          undefined,
          undefined,
          credentials,
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
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          undefined,
          undefined,
          undefined,
          credentials,
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
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildGcpCredentials(g);
        const projectId = await getProjectId(credentials);
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
          undefined,
          undefined,
          undefined,
          credentials,
        );
        return { result };
      },
    },
  },
};
