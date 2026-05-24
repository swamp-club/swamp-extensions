// Auto-generated extension model for @swamp/gcp/gmail/users-settings-sendas
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gmail Users.Settings.SendAs.
 *
 * Settings associated with a send-as alias, which can be either the primary login address associated with the account or a custom "from" address. Send-as aliases correspond to the "Send Mail As" feature in the web interface. The send-as alias must be a valid email address.
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

const BASE_URL = "https://gmail.googleapis.com/";

const GET_CONFIG = {
  "id": "gmail.users.settings.sendAs.get",
  "path": "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "sendAsEmail",
  ],
  "parameters": {
    "sendAsEmail": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const INSERT_CONFIG = {
  "id": "gmail.users.settings.sendAs.create",
  "path": "gmail/v1/users/{userId}/settings/sendAs",
  "httpMethod": "POST",
  "parameterOrder": [
    "userId",
  ],
  "parameters": {
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const UPDATE_CONFIG = {
  "id": "gmail.users.settings.sendAs.update",
  "path": "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
  "httpMethod": "PUT",
  "parameterOrder": [
    "userId",
    "sendAsEmail",
  ],
  "parameters": {
    "sendAsEmail": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "gmail.users.settings.sendAs.delete",
  "path": "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "userId",
    "sendAsEmail",
  ],
  "parameters": {
    "sendAsEmail": {
      "location": "path",
      "required": true,
    },
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "gmail.users.settings.sendAs.list",
  "path": "gmail/v1/users/{userId}/settings/sendAs",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
  ],
  "parameters": {
    "userId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  displayName: z.string().describe(
    'A name that appears in the "From:" header for mail sent using this alias. For custom "from" addresses, when this is empty, Gmail will populate the "From:" header with the name that is used for the primary address associated with the account. If the admin has disabled the ability for users to update their name format, requests to update this field for the primary login will silently fail.',
  ).optional(),
  isDefault: z.boolean().describe(
    'Whether this address is selected as the default "From:" address in situations such as composing a new message or sending a vacation auto-reply. Every Gmail account has exactly one default send-as address, so the only legal value that clients may write to this field is `true`. Changing this from `false` to `true` for an address will result in this field becoming `false` for the other previous default address.',
  ).optional(),
  isPrimary: z.boolean().describe(
    "Whether this address is the primary address used to login to the account. Every Gmail account has exactly one primary address, and it cannot be deleted from the collection of send-as aliases. This field is read-only.",
  ).optional(),
  replyToAddress: z.string().describe(
    'An optional email address that is included in a "Reply-To:" header for mail sent using this alias. If this is empty, Gmail will not generate a "Reply-To:" header.',
  ).optional(),
  sendAsEmail: z.string().describe(
    'The email address that appears in the "From:" header for mail sent using this alias. This is read-only for all operations except create.',
  ).optional(),
  signature: z.string().describe(
    "An optional HTML signature that is included in messages composed with this alias in the Gmail web UI. This signature is added to new emails only.",
  ).optional(),
  smtpMsa: z.object({
    host: z.string().describe("The hostname of the SMTP service. Required.")
      .optional(),
    password: z.string().describe(
      "The password that will be used for authentication with the SMTP service. This is a write-only field that can be specified in requests to create or update SendAs settings; it is never populated in responses.",
    ).optional(),
    port: z.number().int().describe("The port of the SMTP service. Required.")
      .optional(),
    securityMode: z.enum(["securityModeUnspecified", "none", "ssl", "starttls"])
      .describe(
        "The protocol that will be used to secure communication with the SMTP service. Required.",
      ).optional(),
    username: z.string().describe(
      "The username that will be used for authentication with the SMTP service. This is a write-only field that can be specified in requests to create or update SendAs settings; it is never populated in responses.",
    ).optional(),
  }).describe("Configuration for communication with an SMTP service.")
    .optional(),
  treatAsAlias: z.boolean().describe(
    'Whether Gmail should treat this address as an alias for the user\'s primary email address. This setting only applies to custom "from" aliases.',
  ).optional(),
  verificationStatus: z.enum([
    "verificationStatusUnspecified",
    "accepted",
    "pending",
  ]).describe(
    'Indicates whether this address has been verified for use as a send-as alias. Read-only. This setting only applies to custom "from" aliases.',
  ).optional(),
  userId: z.string().describe(
    'User\'s email address. The special value "me" can be used to indicate the authenticated user.',
  ),
});

const StateSchema = z.object({
  displayName: z.string().optional(),
  isDefault: z.boolean().optional(),
  isPrimary: z.boolean().optional(),
  replyToAddress: z.string().optional(),
  sendAsEmail: z.string().optional(),
  signature: z.string().optional(),
  smtpMsa: z.object({
    host: z.string(),
    password: z.string(),
    port: z.number(),
    securityMode: z.string(),
    username: z.string(),
  }).optional(),
  treatAsAlias: z.boolean().optional(),
  verificationStatus: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  displayName: z.string().describe(
    'A name that appears in the "From:" header for mail sent using this alias. For custom "from" addresses, when this is empty, Gmail will populate the "From:" header with the name that is used for the primary address associated with the account. If the admin has disabled the ability for users to update their name format, requests to update this field for the primary login will silently fail.',
  ).optional(),
  isDefault: z.boolean().describe(
    'Whether this address is selected as the default "From:" address in situations such as composing a new message or sending a vacation auto-reply. Every Gmail account has exactly one default send-as address, so the only legal value that clients may write to this field is `true`. Changing this from `false` to `true` for an address will result in this field becoming `false` for the other previous default address.',
  ).optional(),
  isPrimary: z.boolean().describe(
    "Whether this address is the primary address used to login to the account. Every Gmail account has exactly one primary address, and it cannot be deleted from the collection of send-as aliases. This field is read-only.",
  ).optional(),
  replyToAddress: z.string().describe(
    'An optional email address that is included in a "Reply-To:" header for mail sent using this alias. If this is empty, Gmail will not generate a "Reply-To:" header.',
  ).optional(),
  sendAsEmail: z.string().describe(
    'The email address that appears in the "From:" header for mail sent using this alias. This is read-only for all operations except create.',
  ).optional(),
  signature: z.string().describe(
    "An optional HTML signature that is included in messages composed with this alias in the Gmail web UI. This signature is added to new emails only.",
  ).optional(),
  smtpMsa: z.object({
    host: z.string().describe("The hostname of the SMTP service. Required.")
      .optional(),
    password: z.string().describe(
      "The password that will be used for authentication with the SMTP service. This is a write-only field that can be specified in requests to create or update SendAs settings; it is never populated in responses.",
    ).optional(),
    port: z.number().int().describe("The port of the SMTP service. Required.")
      .optional(),
    securityMode: z.enum(["securityModeUnspecified", "none", "ssl", "starttls"])
      .describe(
        "The protocol that will be used to secure communication with the SMTP service. Required.",
      ).optional(),
    username: z.string().describe(
      "The username that will be used for authentication with the SMTP service. This is a write-only field that can be specified in requests to create or update SendAs settings; it is never populated in responses.",
    ).optional(),
  }).describe("Configuration for communication with an SMTP service.")
    .optional(),
  treatAsAlias: z.boolean().describe(
    'Whether Gmail should treat this address as an alias for the user\'s primary email address. This setting only applies to custom "from" aliases.',
  ).optional(),
  verificationStatus: z.enum([
    "verificationStatusUnspecified",
    "accepted",
    "pending",
  ]).describe(
    'Indicates whether this address has been verified for use as a send-as alias. Read-only. This setting only applies to custom "from" aliases.',
  ).optional(),
  userId: z.string().describe(
    'User\'s email address. The special value "me" can be used to indicate the authenticated user.',
  ).optional(),
});

/** Swamp extension model for Google Cloud Gmail Users.Settings.SendAs. Registered at `@swamp/gcp/gmail/users-settings-sendas`. */
export const model = {
  type: "@swamp/gcp/gmail/users-settings-sendas",
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
      toVersion: "2026.05.01.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "Settings associated with a send-as alias, which can be either the primary log...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a sendAs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["isDefault"] !== undefined) body["isDefault"] = g["isDefault"];
        if (g["isPrimary"] !== undefined) body["isPrimary"] = g["isPrimary"];
        if (g["replyToAddress"] !== undefined) {
          body["replyToAddress"] = g["replyToAddress"];
        }
        if (g["sendAsEmail"] !== undefined) {
          body["sendAsEmail"] = g["sendAsEmail"];
        }
        if (g["signature"] !== undefined) body["signature"] = g["signature"];
        if (g["smtpMsa"] !== undefined) body["smtpMsa"] = g["smtpMsa"];
        if (g["treatAsAlias"] !== undefined) {
          body["treatAsAlias"] = g["treatAsAlias"];
        }
        if (g["verificationStatus"] !== undefined) {
          body["verificationStatus"] = g["verificationStatus"];
        }
        if (g["name"] !== undefined) params["sendAsEmail"] = String(g["name"]);
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          GET_CONFIG,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "userId": String(g["userId"] ?? "") },
            matchField: "displayName",
            matchValue: String(g["displayName"] ?? ""),
          },
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
      description: "Get a sendAs",
      arguments: z.object({
        identifier: z.string().describe("The name of the sendAs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["sendAsEmail"] = args.identifier;
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
    update: {
      description: "Update sendAs attributes",
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
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        else if (existing["userId"]) {
          params["userId"] = String(existing["userId"]);
        }
        params["sendAsEmail"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["displayName"] !== undefined) {
          body["displayName"] = g["displayName"];
        }
        if (g["isDefault"] !== undefined) body["isDefault"] = g["isDefault"];
        if (g["isPrimary"] !== undefined) body["isPrimary"] = g["isPrimary"];
        if (g["replyToAddress"] !== undefined) {
          body["replyToAddress"] = g["replyToAddress"];
        }
        if (g["signature"] !== undefined) body["signature"] = g["signature"];
        if (g["smtpMsa"] !== undefined) body["smtpMsa"] = g["smtpMsa"];
        if (g["treatAsAlias"] !== undefined) {
          body["treatAsAlias"] = g["treatAsAlias"];
        }
        if (g["verificationStatus"] !== undefined) {
          body["verificationStatus"] = g["verificationStatus"];
        }
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
      description: "Delete the sendAs",
      arguments: z.object({
        identifier: z.string().describe("The name of the sendAs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["sendAsEmail"] = args.identifier;
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
      description: "Sync sendAs state from GCP",
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
          if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
          else if (existing["userId"]) {
            params["userId"] = String(existing["userId"]);
          }
          const identifier = existing.name?.toString() ?? g["name"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["sendAsEmail"] = identifier;
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
    verify: {
      description: "verify",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["sendAsEmail"] !== undefined) {
          params["sendAsEmail"] = String(g["sendAsEmail"]);
        }
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.settings.sendAs.verify",
            "path":
              "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/verify",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "sendAsEmail"],
            "parameters": {
              "sendAsEmail": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
  },
};
