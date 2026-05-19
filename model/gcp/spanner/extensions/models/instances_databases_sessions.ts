// Auto-generated extension model for @swamp/gcp/spanner/instances-databases-sessions
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Spanner Instances.Databases.Sessions.
 *
 * A session in the Cloud Spanner API.
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
} from "./_lib/gcp.ts";

const BASE_URL = "https://spanner.googleapis.com/";

const GET_CONFIG = {
  "id": "spanner.projects.instances.databases.sessions.get",
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

const INSERT_CONFIG = {
  "id": "spanner.projects.instances.databases.sessions.create",
  "path": "v1/{+database}/sessions",
  "httpMethod": "POST",
  "parameterOrder": [
    "database",
  ],
  "parameters": {
    "database": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "spanner.projects.instances.databases.sessions.delete",
  "path": "v1/{+name}",
  "httpMethod": "DELETE",
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
  session: z.object({
    approximateLastUseTime: z.string().describe(
      "Output only. The approximate timestamp when the session is last used. It's typically earlier than the actual last use time.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The timestamp when the session is created.",
    ).optional(),
    creatorRole: z.string().describe(
      "The database role which created this session.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels for the session. * Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. * Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. * No more than 64 labels can be associated with a given session. See https://goo.gl/xmQnxf for more information on and examples of labels.",
    ).optional(),
    multiplexed: z.boolean().describe(
      "Optional. If `true`, specifies a multiplexed session. Use a multiplexed session for multiple, concurrent operations including any combination of read-only and read-write transactions. Use `sessions.create` to create multiplexed sessions. Don't use BatchCreateSessions to create a multiplexed session. You can't delete or list multiplexed sessions.",
    ).optional(),
    name: z.string().describe(
      "Output only. The name of the session. This is always system-assigned.",
    ).optional(),
  }).describe("A session in the Cloud Spanner API.").optional(),
  database: z.string().describe(
    "Required. The database in which the new session is created.",
  ),
});

const StateSchema = z.object({
  approximateLastUseTime: z.string().optional(),
  createTime: z.string().optional(),
  creatorRole: z.string().optional(),
  labels: z.record(z.string(), z.unknown()).optional(),
  multiplexed: z.boolean().optional(),
  name: z.string(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  session: z.object({
    approximateLastUseTime: z.string().describe(
      "Output only. The approximate timestamp when the session is last used. It's typically earlier than the actual last use time.",
    ).optional(),
    createTime: z.string().describe(
      "Output only. The timestamp when the session is created.",
    ).optional(),
    creatorRole: z.string().describe(
      "The database role which created this session.",
    ).optional(),
    labels: z.record(z.string(), z.string()).describe(
      "The labels for the session. * Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. * Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. * No more than 64 labels can be associated with a given session. See https://goo.gl/xmQnxf for more information on and examples of labels.",
    ).optional(),
    multiplexed: z.boolean().describe(
      "Optional. If `true`, specifies a multiplexed session. Use a multiplexed session for multiple, concurrent operations including any combination of read-only and read-write transactions. Use `sessions.create` to create multiplexed sessions. Don't use BatchCreateSessions to create a multiplexed session. You can't delete or list multiplexed sessions.",
    ).optional(),
    name: z.string().describe(
      "Output only. The name of the session. This is always system-assigned.",
    ).optional(),
  }).describe("A session in the Cloud Spanner API.").optional(),
  database: z.string().describe(
    "Required. The database in which the new session is created.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Spanner Instances.Databases.Sessions. Registered at `@swamp/gcp/spanner/instances-databases-sessions`. */
export const model = {
  type: "@swamp/gcp/spanner/instances-databases-sessions",
  version: "2026.05.19.1",
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
      toVersion: "2026.05.18.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.05.19.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "A session in the Cloud Spanner API.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sessions",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["database"] !== undefined) {
          params["database"] = String(g["database"]);
        }
        const body: Record<string, unknown> = {};
        if (g["session"] !== undefined) body["session"] = g["session"];
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
        ) as StateData;
        const instanceName = (g.name?.toString() ?? "current").replace(
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
    get: {
      description: "Get a sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        params["name"] = args.identifier;
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
    delete: {
      description: "Delete the sessions",
      arguments: z.object({
        identifier: z.string().describe("The name of the sessions"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["name"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.name?.toString() ?? args.identifier).replace(
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
      description: "Sync sessions state from GCP",
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
          params["name"] = identifier;
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
    adapter: {
      description: "adapter",
      arguments: z.object({
        name: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        params["parent"] = `projects/${projectId}/locations/${
          String(g["location"] ?? "")
        }`;
        const body: Record<string, unknown> = {};
        if (args["name"] !== undefined) body["name"] = args["name"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.sessions.adapter",
            "path": "v1/{+parent}/sessions:adapter",
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
    adapt_message: {
      description: "adapt message",
      arguments: z.object({
        attachments: z.any().optional(),
        payload: z.any().optional(),
        protocol: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["name"] !== undefined) params["name"] = String(g["name"]);
        const body: Record<string, unknown> = {};
        if (args["attachments"] !== undefined) {
          body["attachments"] = args["attachments"];
        }
        if (args["payload"] !== undefined) body["payload"] = args["payload"];
        if (args["protocol"] !== undefined) body["protocol"] = args["protocol"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.sessions.adaptMessage",
            "path": "v1/{+name}:adaptMessage",
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
    batch_create: {
      description: "batch create",
      arguments: z.object({
        sessionCount: z.any().optional(),
        sessionTemplate: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["database"] !== undefined) {
          params["database"] = String(g["database"]);
        }
        const body: Record<string, unknown> = {};
        if (args["sessionCount"] !== undefined) {
          body["sessionCount"] = args["sessionCount"];
        }
        if (args["sessionTemplate"] !== undefined) {
          body["sessionTemplate"] = args["sessionTemplate"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.sessions.batchCreate",
            "path": "v1/{+database}/sessions:batchCreate",
            "httpMethod": "POST",
            "parameterOrder": ["database"],
            "parameters": {
              "database": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    batch_write: {
      description: "batch write",
      arguments: z.object({
        excludeTxnFromChangeStreams: z.any().optional(),
        mutationGroups: z.any().optional(),
        requestOptions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["excludeTxnFromChangeStreams"] !== undefined) {
          body["excludeTxnFromChangeStreams"] =
            args["excludeTxnFromChangeStreams"];
        }
        if (args["mutationGroups"] !== undefined) {
          body["mutationGroups"] = args["mutationGroups"];
        }
        if (args["requestOptions"] !== undefined) {
          body["requestOptions"] = args["requestOptions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.sessions.batchWrite",
            "path": "v1/{+session}:batchWrite",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    begin_transaction: {
      description: "begin transaction",
      arguments: z.object({
        mutationKey: z.any().optional(),
        options: z.any().optional(),
        requestOptions: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["mutationKey"] !== undefined) {
          body["mutationKey"] = args["mutationKey"];
        }
        if (args["options"] !== undefined) body["options"] = args["options"];
        if (args["requestOptions"] !== undefined) {
          body["requestOptions"] = args["requestOptions"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "spanner.projects.instances.databases.sessions.beginTransaction",
            "path": "v1/{+session}:beginTransaction",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    commit: {
      description: "commit",
      arguments: z.object({
        maxCommitDelay: z.any().optional(),
        mutations: z.any().optional(),
        precommitToken: z.any().optional(),
        requestOptions: z.any().optional(),
        returnCommitStats: z.any().optional(),
        singleUseTransaction: z.any().optional(),
        transactionId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["maxCommitDelay"] !== undefined) {
          body["maxCommitDelay"] = args["maxCommitDelay"];
        }
        if (args["mutations"] !== undefined) {
          body["mutations"] = args["mutations"];
        }
        if (args["precommitToken"] !== undefined) {
          body["precommitToken"] = args["precommitToken"];
        }
        if (args["requestOptions"] !== undefined) {
          body["requestOptions"] = args["requestOptions"];
        }
        if (args["returnCommitStats"] !== undefined) {
          body["returnCommitStats"] = args["returnCommitStats"];
        }
        if (args["singleUseTransaction"] !== undefined) {
          body["singleUseTransaction"] = args["singleUseTransaction"];
        }
        if (args["transactionId"] !== undefined) {
          body["transactionId"] = args["transactionId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.sessions.commit",
            "path": "v1/{+session}:commit",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    execute_batch_dml: {
      description: "execute batch dml",
      arguments: z.object({
        lastStatements: z.any().optional(),
        requestOptions: z.any().optional(),
        seqno: z.any().optional(),
        statements: z.any().optional(),
        transaction: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["lastStatements"] !== undefined) {
          body["lastStatements"] = args["lastStatements"];
        }
        if (args["requestOptions"] !== undefined) {
          body["requestOptions"] = args["requestOptions"];
        }
        if (args["seqno"] !== undefined) body["seqno"] = args["seqno"];
        if (args["statements"] !== undefined) {
          body["statements"] = args["statements"];
        }
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "spanner.projects.instances.databases.sessions.executeBatchDml",
            "path": "v1/{+session}:executeBatchDml",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    execute_sql: {
      description: "execute sql",
      arguments: z.object({
        dataBoostEnabled: z.any().optional(),
        directedReadOptions: z.any().optional(),
        lastStatement: z.any().optional(),
        paramTypes: z.any().optional(),
        params: z.any().optional(),
        partitionToken: z.any().optional(),
        queryMode: z.any().optional(),
        queryOptions: z.any().optional(),
        requestOptions: z.any().optional(),
        resumeToken: z.any().optional(),
        seqno: z.any().optional(),
        sql: z.any().optional(),
        transaction: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["dataBoostEnabled"] !== undefined) {
          body["dataBoostEnabled"] = args["dataBoostEnabled"];
        }
        if (args["directedReadOptions"] !== undefined) {
          body["directedReadOptions"] = args["directedReadOptions"];
        }
        if (args["lastStatement"] !== undefined) {
          body["lastStatement"] = args["lastStatement"];
        }
        if (args["paramTypes"] !== undefined) {
          body["paramTypes"] = args["paramTypes"];
        }
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["partitionToken"] !== undefined) {
          body["partitionToken"] = args["partitionToken"];
        }
        if (args["queryMode"] !== undefined) {
          body["queryMode"] = args["queryMode"];
        }
        if (args["queryOptions"] !== undefined) {
          body["queryOptions"] = args["queryOptions"];
        }
        if (args["requestOptions"] !== undefined) {
          body["requestOptions"] = args["requestOptions"];
        }
        if (args["resumeToken"] !== undefined) {
          body["resumeToken"] = args["resumeToken"];
        }
        if (args["seqno"] !== undefined) body["seqno"] = args["seqno"];
        if (args["sql"] !== undefined) body["sql"] = args["sql"];
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.sessions.executeSql",
            "path": "v1/{+session}:executeSql",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    execute_streaming_sql: {
      description: "execute streaming sql",
      arguments: z.object({
        dataBoostEnabled: z.any().optional(),
        directedReadOptions: z.any().optional(),
        lastStatement: z.any().optional(),
        paramTypes: z.any().optional(),
        params: z.any().optional(),
        partitionToken: z.any().optional(),
        queryMode: z.any().optional(),
        queryOptions: z.any().optional(),
        requestOptions: z.any().optional(),
        resumeToken: z.any().optional(),
        seqno: z.any().optional(),
        sql: z.any().optional(),
        transaction: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["dataBoostEnabled"] !== undefined) {
          body["dataBoostEnabled"] = args["dataBoostEnabled"];
        }
        if (args["directedReadOptions"] !== undefined) {
          body["directedReadOptions"] = args["directedReadOptions"];
        }
        if (args["lastStatement"] !== undefined) {
          body["lastStatement"] = args["lastStatement"];
        }
        if (args["paramTypes"] !== undefined) {
          body["paramTypes"] = args["paramTypes"];
        }
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["partitionToken"] !== undefined) {
          body["partitionToken"] = args["partitionToken"];
        }
        if (args["queryMode"] !== undefined) {
          body["queryMode"] = args["queryMode"];
        }
        if (args["queryOptions"] !== undefined) {
          body["queryOptions"] = args["queryOptions"];
        }
        if (args["requestOptions"] !== undefined) {
          body["requestOptions"] = args["requestOptions"];
        }
        if (args["resumeToken"] !== undefined) {
          body["resumeToken"] = args["resumeToken"];
        }
        if (args["seqno"] !== undefined) body["seqno"] = args["seqno"];
        if (args["sql"] !== undefined) body["sql"] = args["sql"];
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "spanner.projects.instances.databases.sessions.executeStreamingSql",
            "path": "v1/{+session}:executeStreamingSql",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    partition_query: {
      description: "partition query",
      arguments: z.object({
        paramTypes: z.any().optional(),
        params: z.any().optional(),
        partitionOptions: z.any().optional(),
        sql: z.any().optional(),
        transaction: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["paramTypes"] !== undefined) {
          body["paramTypes"] = args["paramTypes"];
        }
        if (args["params"] !== undefined) body["params"] = args["params"];
        if (args["partitionOptions"] !== undefined) {
          body["partitionOptions"] = args["partitionOptions"];
        }
        if (args["sql"] !== undefined) body["sql"] = args["sql"];
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id":
              "spanner.projects.instances.databases.sessions.partitionQuery",
            "path": "v1/{+session}:partitionQuery",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    partition_read: {
      description: "partition read",
      arguments: z.object({
        columns: z.any().optional(),
        index: z.any().optional(),
        keySet: z.any().optional(),
        partitionOptions: z.any().optional(),
        table: z.any().optional(),
        transaction: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["columns"] !== undefined) body["columns"] = args["columns"];
        if (args["index"] !== undefined) body["index"] = args["index"];
        if (args["keySet"] !== undefined) body["keySet"] = args["keySet"];
        if (args["partitionOptions"] !== undefined) {
          body["partitionOptions"] = args["partitionOptions"];
        }
        if (args["table"] !== undefined) body["table"] = args["table"];
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.sessions.partitionRead",
            "path": "v1/{+session}:partitionRead",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    read: {
      description: "read",
      arguments: z.object({
        columns: z.any().optional(),
        dataBoostEnabled: z.any().optional(),
        directedReadOptions: z.any().optional(),
        index: z.any().optional(),
        keySet: z.any().optional(),
        limit: z.any().optional(),
        lockHint: z.any().optional(),
        orderBy: z.any().optional(),
        partitionToken: z.any().optional(),
        requestOptions: z.any().optional(),
        resumeToken: z.any().optional(),
        table: z.any().optional(),
        transaction: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["columns"] !== undefined) body["columns"] = args["columns"];
        if (args["dataBoostEnabled"] !== undefined) {
          body["dataBoostEnabled"] = args["dataBoostEnabled"];
        }
        if (args["directedReadOptions"] !== undefined) {
          body["directedReadOptions"] = args["directedReadOptions"];
        }
        if (args["index"] !== undefined) body["index"] = args["index"];
        if (args["keySet"] !== undefined) body["keySet"] = args["keySet"];
        if (args["limit"] !== undefined) body["limit"] = args["limit"];
        if (args["lockHint"] !== undefined) body["lockHint"] = args["lockHint"];
        if (args["orderBy"] !== undefined) body["orderBy"] = args["orderBy"];
        if (args["partitionToken"] !== undefined) {
          body["partitionToken"] = args["partitionToken"];
        }
        if (args["requestOptions"] !== undefined) {
          body["requestOptions"] = args["requestOptions"];
        }
        if (args["resumeToken"] !== undefined) {
          body["resumeToken"] = args["resumeToken"];
        }
        if (args["table"] !== undefined) body["table"] = args["table"];
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.sessions.read",
            "path": "v1/{+session}:read",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    rollback: {
      description: "rollback",
      arguments: z.object({
        transactionId: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["transactionId"] !== undefined) {
          body["transactionId"] = args["transactionId"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.sessions.rollback",
            "path": "v1/{+session}:rollback",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
            },
          },
          params,
          body,
        );
        return { result };
      },
    },
    streaming_read: {
      description: "streaming read",
      arguments: z.object({
        columns: z.any().optional(),
        dataBoostEnabled: z.any().optional(),
        directedReadOptions: z.any().optional(),
        index: z.any().optional(),
        keySet: z.any().optional(),
        limit: z.any().optional(),
        lockHint: z.any().optional(),
        orderBy: z.any().optional(),
        partitionToken: z.any().optional(),
        requestOptions: z.any().optional(),
        resumeToken: z.any().optional(),
        table: z.any().optional(),
        transaction: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["session"] !== undefined) {
          params["session"] = String(g["session"]);
        }
        const body: Record<string, unknown> = {};
        if (args["columns"] !== undefined) body["columns"] = args["columns"];
        if (args["dataBoostEnabled"] !== undefined) {
          body["dataBoostEnabled"] = args["dataBoostEnabled"];
        }
        if (args["directedReadOptions"] !== undefined) {
          body["directedReadOptions"] = args["directedReadOptions"];
        }
        if (args["index"] !== undefined) body["index"] = args["index"];
        if (args["keySet"] !== undefined) body["keySet"] = args["keySet"];
        if (args["limit"] !== undefined) body["limit"] = args["limit"];
        if (args["lockHint"] !== undefined) body["lockHint"] = args["lockHint"];
        if (args["orderBy"] !== undefined) body["orderBy"] = args["orderBy"];
        if (args["partitionToken"] !== undefined) {
          body["partitionToken"] = args["partitionToken"];
        }
        if (args["requestOptions"] !== undefined) {
          body["requestOptions"] = args["requestOptions"];
        }
        if (args["resumeToken"] !== undefined) {
          body["resumeToken"] = args["resumeToken"];
        }
        if (args["table"] !== undefined) body["table"] = args["table"];
        if (args["transaction"] !== undefined) {
          body["transaction"] = args["transaction"];
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "spanner.projects.instances.databases.sessions.streamingRead",
            "path": "v1/{+session}:streamingRead",
            "httpMethod": "POST",
            "parameterOrder": ["session"],
            "parameters": {
              "session": { "location": "path", "required": true },
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
