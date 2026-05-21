// Auto-generated extension model for @swamp/gcp/chromemanagement/customers-profiles-commands
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Chrome Management Customers.Profiles.Commands.
 *
 * A representation of a remote command for a Chrome browser profile.
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
  return `${parent}/commands/${shortName}`;
}

const BASE_URL = "https://chromemanagement.googleapis.com/";

const GET_CONFIG = {
  "id": "chromemanagement.customers.profiles.commands.get",
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
  "id": "chromemanagement.customers.profiles.commands.create",
  "path": "v1/{+parent}/commands",
  "httpMethod": "POST",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
    "parent": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "chromemanagement.customers.profiles.commands.list",
  "path": "v1/{+parent}/commands",
  "httpMethod": "GET",
  "parameterOrder": [
    "parent",
  ],
  "parameters": {
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
  commandResult: z.object({
    clientExecutionTime: z.string().describe(
      "Output only. Timestamp of the client execution of the remote command.",
    ).optional(),
    resultCode: z.string().describe(
      "Output only. Result code that indicates the type of error or success of the command.",
    ).optional(),
    resultType: z.enum([
      "COMMAND_RESULT_TYPE_UNSPECIFIED",
      "IGNORED",
      "FAILURE",
      "SUCCESS",
    ]).describe("Output only. Result type of the remote command.").optional(),
  }).describe("Result of the execution of a command.").optional(),
  commandType: z.string().describe(
    'Required. Type of the remote command. The only supported command_type is "clearBrowsingData".',
  ).optional(),
  name: z.string().describe(
    "Identifier. Format: customers/{customer_id}/profiles/{profile_permanent_id}/commands/{command_id}",
  ).optional(),
  payload: z.record(z.string(), z.string()).describe(
    'Required. Payload of the remote command. The payload for "clearBrowsingData" command supports: - fields "clearCache" and "clearCookies" - values of boolean type.',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

const StateSchema = z.object({
  commandResult: z.object({
    clientExecutionTime: z.string(),
    resultCode: z.string(),
    resultType: z.string(),
  }).optional(),
  commandState: z.string().optional(),
  commandType: z.string().optional(),
  issueTime: z.string().optional(),
  name: z.string(),
  payload: z.record(z.string(), z.unknown()).optional(),
  validDuration: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  commandResult: z.object({
    clientExecutionTime: z.string().describe(
      "Output only. Timestamp of the client execution of the remote command.",
    ).optional(),
    resultCode: z.string().describe(
      "Output only. Result code that indicates the type of error or success of the command.",
    ).optional(),
    resultType: z.enum([
      "COMMAND_RESULT_TYPE_UNSPECIFIED",
      "IGNORED",
      "FAILURE",
      "SUCCESS",
    ]).describe("Output only. Result type of the remote command.").optional(),
  }).describe("Result of the execution of a command.").optional(),
  commandType: z.string().describe(
    'Required. Type of the remote command. The only supported command_type is "clearBrowsingData".',
  ).optional(),
  name: z.string().describe(
    "Identifier. Format: customers/{customer_id}/profiles/{profile_permanent_id}/commands/{command_id}",
  ).optional(),
  payload: z.record(z.string(), z.string()).describe(
    'Required. Payload of the remote command. The payload for "clearBrowsingData" command supports: - fields "clearCache" and "clearCookies" - values of boolean type.',
  ).optional(),
  parent: z.string().describe(
    "The parent resource name (e.g., projects/my-project/locations/us-central1, organizations/123, folders/456)",
  ).optional(),
});

/** Swamp extension model for Google Cloud Chrome Management Customers.Profiles.Commands. Registered at `@swamp/gcp/chromemanagement/customers-profiles-commands`. */
export const model = {
  type: "@swamp/gcp/chromemanagement/customers-profiles-commands",
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
      description:
        "A representation of a remote command for a Chrome browser profile.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a commands",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["parent"] !== undefined) params["parent"] = String(g["parent"]);
        const body: Record<string, unknown> = {};
        if (g["commandResult"] !== undefined) {
          body["commandResult"] = g["commandResult"];
        }
        if (g["commandType"] !== undefined) {
          body["commandType"] = g["commandType"];
        }
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["payload"] !== undefined) body["payload"] = g["payload"];
        if (g["parent"] !== undefined && g["name"] !== undefined) {
          params["name"] = buildResourceName(
            String(g["parent"]),
            String(g["name"]),
          );
        }
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: {
              "parent": String(body["parent"] ?? g["parent"] ?? ""),
            },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.name ?? g.name)?.toString() ?? "current")
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
      description: "Get a commands",
      arguments: z.object({
        identifier: z.string().describe("The name of the commands"),
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
        const instanceName =
          ((result.name ?? g.name)?.toString() ?? args.identifier).replace(
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
      description: "Sync commands state from GCP",
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
  },
};
