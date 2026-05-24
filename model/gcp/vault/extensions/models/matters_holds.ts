// Auto-generated extension model for @swamp/gcp/vault/matters-holds
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Vault Matters.Holds.
 *
 * A hold. A hold prevents the specified Google Workspace service from purging data for specific accounts or all members of an organizational unit. To work with Vault resources, the account must have the [required Vault privileges] (https://support.google.com/vault/answer/2799699) and access to the matter. To access a matter, the account must have created the matter, have the matter shared with them, or have the **View All Matters** privilege.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://vault.googleapis.com/";

const GET_CONFIG = {
  "id": "vault.matters.holds.get",
  "path": "v1/matters/{matterId}/holds/{holdId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "matterId",
    "holdId",
  ],
  "parameters": {
    "holdId": {
      "location": "path",
      "required": true,
    },
    "matterId": {
      "location": "path",
      "required": true,
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "vault.matters.holds.create",
  "path": "v1/matters/{matterId}/holds",
  "httpMethod": "POST",
  "parameterOrder": [
    "matterId",
  ],
  "parameters": {
    "matterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "vault.matters.holds.update",
  "path": "v1/matters/{matterId}/holds/{holdId}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "matterId",
    "holdId",
  ],
  "parameters": {
    "holdId": {
      "location": "path",
      "required": true,
    },
    "matterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "vault.matters.holds.delete",
  "path": "v1/matters/{matterId}/holds/{holdId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "matterId",
    "holdId",
  ],
  "parameters": {
    "holdId": {
      "location": "path",
      "required": true,
    },
    "matterId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "vault.matters.holds.list",
  "path": "v1/matters/{matterId}/holds",
  "httpMethod": "GET",
  "parameterOrder": [
    "matterId",
  ],
  "parameters": {
    "matterId": {
      "location": "path",
      "required": true,
    },
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
    "view": {
      "location": "query",
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  accounts: z.array(z.object({
    accountId: z.string().describe(
      "The account ID, as provided by the [Admin SDK](https://developers.google.com/admin-sdk/).",
    ).optional(),
    email: z.string().describe(
      "The primary email address of the account. If used as an input, this takes precedence over **accountId**.",
    ).optional(),
    firstName: z.string().describe(
      "Output only. The first name of the account holder.",
    ).optional(),
    holdTime: z.string().describe(
      "Output only. When the account was put on hold.",
    ).optional(),
    lastName: z.string().describe(
      "Output only. The last name of the account holder.",
    ).optional(),
  })).describe(
    "If set, the hold applies to the specified accounts and **orgUnit** must be empty.",
  ).optional(),
  corpus: z.enum([
    "CORPUS_TYPE_UNSPECIFIED",
    "DRIVE",
    "MAIL",
    "GROUPS",
    "HANGOUTS_CHAT",
    "VOICE",
    "CALENDAR",
    "GEMINI",
  ]).describe("The service to be searched.").optional(),
  holdId: z.string().describe(
    "The unique immutable ID of the hold. Assigned during creation.",
  ).optional(),
  name: z.string().describe("The name of the hold.").optional(),
  orgUnit: z.object({
    holdTime: z.string().describe(
      "When the organizational unit was put on hold. This property is immutable.",
    ).optional(),
    orgUnitId: z.string().describe(
      "The organizational unit's immutable ID as provided by the [Admin SDK](https://developers.google.com/admin-sdk/).",
    ).optional(),
  }).describe(
    "The organizational unit covered by a hold. This structure is immutable.",
  ).optional(),
  query: z.object({
    calendarQuery: z.object({}).describe("Options for Calendar holds.")
      .optional(),
    driveQuery: z.object({
      includeSharedDriveFiles: z.boolean().describe(
        "To include files in shared drives in the hold, set to **true**.",
      ).optional(),
      includeTeamDriveFiles: z.boolean().describe(
        "To include files in Team Drives in the hold, set to **true**.",
      ).optional(),
    }).describe("Options for Drive holds.").optional(),
    groupsQuery: z.object({
      endTime: z.string().describe(
        "The end time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
      ).optional(),
      startTime: z.string().describe(
        "The start time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
      ).optional(),
      terms: z.string().describe(
        "The [search operators](https://support.google.com/vault/answer/2474474) used to refine the messages covered by the hold.",
      ).optional(),
    }).describe("Query options for group holds.").optional(),
    hangoutsChatQuery: z.object({
      includeRooms: z.boolean().describe(
        "To include messages in Chat spaces the user was a member of, set to **true**.",
      ).optional(),
    }).describe("Options for Chat holds.").optional(),
    mailQuery: z.object({
      endTime: z.string().describe(
        "The end time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
      ).optional(),
      startTime: z.string().describe(
        "The start time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
      ).optional(),
      terms: z.string().describe(
        "The [search operators](https://support.google.com/vault/answer/2474474) used to refine the messages covered by the hold.",
      ).optional(),
    }).describe("Query options for Gmail holds.").optional(),
    voiceQuery: z.object({
      coveredData: z.array(
        z.enum([
          "COVERED_DATA_UNSPECIFIED",
          "TEXT_MESSAGES",
          "VOICEMAILS",
          "CALL_LOGS",
        ]),
      ).describe(
        "A list of data types covered by the hold. Should be non-empty. Order does not matter and duplicates are ignored.",
      ).optional(),
    }).describe("Options for Voice holds.").optional(),
  }).describe("Service-specific options for holds.").optional(),
  updateTime: z.string().describe("The last time this hold was modified.")
    .optional(),
  matterId: z.string().describe("The matter ID."),
});

const StateSchema = z.object({
  accounts: z.array(z.object({
    accountId: z.string(),
    email: z.string(),
    firstName: z.string(),
    holdTime: z.string(),
    lastName: z.string(),
  })).optional(),
  corpus: z.string().optional(),
  holdId: z.string().optional(),
  name: z.string(),
  orgUnit: z.object({
    holdTime: z.string(),
    orgUnitId: z.string(),
  }).optional(),
  query: z.object({
    calendarQuery: z.object({}),
    driveQuery: z.object({
      includeSharedDriveFiles: z.boolean(),
      includeTeamDriveFiles: z.boolean(),
    }),
    groupsQuery: z.object({
      endTime: z.string(),
      startTime: z.string(),
      terms: z.string(),
    }),
    hangoutsChatQuery: z.object({
      includeRooms: z.boolean(),
    }),
    mailQuery: z.object({
      endTime: z.string(),
      startTime: z.string(),
      terms: z.string(),
    }),
    voiceQuery: z.object({
      coveredData: z.array(z.string()),
    }),
  }).optional(),
  updateTime: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accounts: z.array(z.object({
    accountId: z.string().describe(
      "The account ID, as provided by the [Admin SDK](https://developers.google.com/admin-sdk/).",
    ).optional(),
    email: z.string().describe(
      "The primary email address of the account. If used as an input, this takes precedence over **accountId**.",
    ).optional(),
    firstName: z.string().describe(
      "Output only. The first name of the account holder.",
    ).optional(),
    holdTime: z.string().describe(
      "Output only. When the account was put on hold.",
    ).optional(),
    lastName: z.string().describe(
      "Output only. The last name of the account holder.",
    ).optional(),
  })).describe(
    "If set, the hold applies to the specified accounts and **orgUnit** must be empty.",
  ).optional(),
  corpus: z.enum([
    "CORPUS_TYPE_UNSPECIFIED",
    "DRIVE",
    "MAIL",
    "GROUPS",
    "HANGOUTS_CHAT",
    "VOICE",
    "CALENDAR",
    "GEMINI",
  ]).describe("The service to be searched.").optional(),
  holdId: z.string().describe(
    "The unique immutable ID of the hold. Assigned during creation.",
  ).optional(),
  name: z.string().describe("The name of the hold.").optional(),
  orgUnit: z.object({
    holdTime: z.string().describe(
      "When the organizational unit was put on hold. This property is immutable.",
    ).optional(),
    orgUnitId: z.string().describe(
      "The organizational unit's immutable ID as provided by the [Admin SDK](https://developers.google.com/admin-sdk/).",
    ).optional(),
  }).describe(
    "The organizational unit covered by a hold. This structure is immutable.",
  ).optional(),
  query: z.object({
    calendarQuery: z.object({}).describe("Options for Calendar holds.")
      .optional(),
    driveQuery: z.object({
      includeSharedDriveFiles: z.boolean().describe(
        "To include files in shared drives in the hold, set to **true**.",
      ).optional(),
      includeTeamDriveFiles: z.boolean().describe(
        "To include files in Team Drives in the hold, set to **true**.",
      ).optional(),
    }).describe("Options for Drive holds.").optional(),
    groupsQuery: z.object({
      endTime: z.string().describe(
        "The end time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
      ).optional(),
      startTime: z.string().describe(
        "The start time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
      ).optional(),
      terms: z.string().describe(
        "The [search operators](https://support.google.com/vault/answer/2474474) used to refine the messages covered by the hold.",
      ).optional(),
    }).describe("Query options for group holds.").optional(),
    hangoutsChatQuery: z.object({
      includeRooms: z.boolean().describe(
        "To include messages in Chat spaces the user was a member of, set to **true**.",
      ).optional(),
    }).describe("Options for Chat holds.").optional(),
    mailQuery: z.object({
      endTime: z.string().describe(
        "The end time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
      ).optional(),
      startTime: z.string().describe(
        "The start time for the query. Specify in GMT. The value is rounded to 12 AM on the specified date.",
      ).optional(),
      terms: z.string().describe(
        "The [search operators](https://support.google.com/vault/answer/2474474) used to refine the messages covered by the hold.",
      ).optional(),
    }).describe("Query options for Gmail holds.").optional(),
    voiceQuery: z.object({
      coveredData: z.array(
        z.enum([
          "COVERED_DATA_UNSPECIFIED",
          "TEXT_MESSAGES",
          "VOICEMAILS",
          "CALL_LOGS",
        ]),
      ).describe(
        "A list of data types covered by the hold. Should be non-empty. Order does not matter and duplicates are ignored.",
      ).optional(),
    }).describe("Options for Voice holds.").optional(),
  }).describe("Service-specific options for holds.").optional(),
  updateTime: z.string().describe("The last time this hold was modified.")
    .optional(),
  matterId: z.string().describe("The matter ID.").optional(),
});

/** Swamp extension model for Google Cloud Google Vault Matters.Holds. Registered at `@swamp/gcp/vault/matters-holds`. */
export const model = {
  type: "@swamp/gcp/vault/matters-holds",
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
        "A hold. A hold prevents the specified Google Workspace service from purging d...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a holds",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["accounts"] !== undefined) body["accounts"] = g["accounts"];
        if (g["corpus"] !== undefined) body["corpus"] = g["corpus"];
        if (g["holdId"] !== undefined) body["holdId"] = g["holdId"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["orgUnit"] !== undefined) body["orgUnit"] = g["orgUnit"];
        if (g["query"] !== undefined) body["query"] = g["query"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
        if (g["name"] !== undefined) params["holdId"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "matterId": String(g["matterId"] ?? "") },
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
      description: "Get a holds",
      arguments: z.object({
        identifier: z.string().describe("The name of the holds"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        params["holdId"] = args.identifier;
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
    update: {
      description: "Update holds attributes",
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
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        } else if (existing["matterId"]) {
          params["matterId"] = String(existing["matterId"]);
        }
        params["holdId"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["accounts"] !== undefined) body["accounts"] = g["accounts"];
        if (g["corpus"] !== undefined) body["corpus"] = g["corpus"];
        if (g["name"] !== undefined) body["name"] = g["name"];
        if (g["query"] !== undefined) body["query"] = g["query"];
        if (g["updateTime"] !== undefined) body["updateTime"] = g["updateTime"];
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
      description: "Delete the holds",
      arguments: z.object({
        identifier: z.string().describe("The name of the holds"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        params["holdId"] = args.identifier;
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
      description: "Sync holds state from GCP",
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
          if (g["matterId"] !== undefined) {
            params["matterId"] = String(g["matterId"]);
          } else if (existing["matterId"]) {
            params["matterId"] = String(existing["matterId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["holdId"] = identifier;
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
    add_held_accounts: {
      description: "add held accounts",
      arguments: z.object({
        accountIds: z.any().optional(),
        emails: z.any().optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["matterId"] !== undefined) {
          params["matterId"] = String(g["matterId"]);
        }
        if (g["holdId"] !== undefined) params["holdId"] = String(g["holdId"]);
        const body: Record<string, unknown> = {};
        if (args["accountIds"] !== undefined) {
          body["accountIds"] = args["accountIds"];
        }
        if (args["emails"] !== undefined) body["emails"] = args["emails"];
        const result = await createResource(
          BASE_URL,
          {
            "id": "vault.matters.holds.addHeldAccounts",
            "path": "v1/matters/{matterId}/holds/{holdId}:addHeldAccounts",
            "httpMethod": "POST",
            "parameterOrder": ["matterId", "holdId"],
            "parameters": {
              "holdId": { "location": "path", "required": true },
              "matterId": { "location": "path", "required": true },
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
