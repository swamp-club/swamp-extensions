// Auto-generated extension model for @swamp/gcp/gmail/users-settings-sendas-smimeinfo
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gmail Users.Settings.SendAs.SmimeInfo.
 *
 * An S/MIME email config.
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
  listResources,
  readResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://gmail.googleapis.com/";

const GET_CONFIG = {
  "id": "gmail.users.settings.sendAs.smimeInfo.get",
  "path":
    "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "sendAsEmail",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
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
  "id": "gmail.users.settings.sendAs.smimeInfo.insert",
  "path": "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo",
  "httpMethod": "POST",
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
  "id": "gmail.users.settings.sendAs.smimeInfo.delete",
  "path":
    "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "userId",
    "sendAsEmail",
    "id",
  ],
  "parameters": {
    "id": {
      "location": "path",
      "required": true,
    },
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
  "id": "gmail.users.settings.sendAs.smimeInfo.list",
  "path": "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo",
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

const GlobalArgsSchema = z.object({
  encryptedKeyPassword: z.string().describe(
    "Encrypted key password, when key is encrypted.",
  ).optional(),
  expiration: z.string().describe(
    "When the certificate expires (in milliseconds since epoch).",
  ).optional(),
  id: z.string().describe("The immutable ID for the SmimeInfo.").optional(),
  isDefault: z.boolean().describe(
    "Whether this SmimeInfo is the default one for this user's send-as address.",
  ).optional(),
  issuerCn: z.string().describe("The S/MIME certificate issuer's common name.")
    .optional(),
  pem: z.string().describe(
    "PEM formatted X509 concatenated certificate string (standard base64 encoding). Format used for returning key, which includes public key as well as certificate chain (not private key).",
  ).optional(),
  pkcs12: z.string().describe(
    "PKCS#12 format containing a single private/public key pair and certificate chain. This format is only accepted from client for creating a new SmimeInfo and is never returned, because the private key is not intended to be exported. PKCS#12 may be encrypted, in which case encryptedKeyPassword should be set appropriately.",
  ).optional(),
  userId: z.string().describe(
    "The user's email address. The special value `me` can be used to indicate the authenticated user.",
  ),
  sendAsEmail: z.string().describe(
    'The email address that appears in the "From:" header for mail sent using this alias.',
  ),
});

const StateSchema = z.object({
  encryptedKeyPassword: z.string().optional(),
  expiration: z.string().optional(),
  id: z.string(),
  isDefault: z.boolean().optional(),
  issuerCn: z.string().optional(),
  pem: z.string().optional(),
  pkcs12: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  encryptedKeyPassword: z.string().describe(
    "Encrypted key password, when key is encrypted.",
  ).optional(),
  expiration: z.string().describe(
    "When the certificate expires (in milliseconds since epoch).",
  ).optional(),
  id: z.string().describe("The immutable ID for the SmimeInfo.").optional(),
  isDefault: z.boolean().describe(
    "Whether this SmimeInfo is the default one for this user's send-as address.",
  ).optional(),
  issuerCn: z.string().describe("The S/MIME certificate issuer's common name.")
    .optional(),
  pem: z.string().describe(
    "PEM formatted X509 concatenated certificate string (standard base64 encoding). Format used for returning key, which includes public key as well as certificate chain (not private key).",
  ).optional(),
  pkcs12: z.string().describe(
    "PKCS#12 format containing a single private/public key pair and certificate chain. This format is only accepted from client for creating a new SmimeInfo and is never returned, because the private key is not intended to be exported. PKCS#12 may be encrypted, in which case encryptedKeyPassword should be set appropriately.",
  ).optional(),
  userId: z.string().describe(
    "The user's email address. The special value `me` can be used to indicate the authenticated user.",
  ).optional(),
  sendAsEmail: z.string().describe(
    'The email address that appears in the "From:" header for mail sent using this alias.',
  ).optional(),
});

/** Swamp extension model for Google Cloud Gmail Users.Settings.SendAs.SmimeInfo. Registered at `@swamp/gcp/gmail/users-settings-sendas-smimeinfo`. */
export const model = {
  type: "@swamp/gcp/gmail/users-settings-sendas-smimeinfo",
  version: "2026.05.25.1",
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
    {
      toVersion: "2026.05.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "An S/MIME email config.",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a smimeInfo",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["sendAsEmail"] !== undefined) {
          params["sendAsEmail"] = String(g["sendAsEmail"]);
        }
        const body: Record<string, unknown> = {};
        if (g["encryptedKeyPassword"] !== undefined) {
          body["encryptedKeyPassword"] = g["encryptedKeyPassword"];
        }
        if (g["expiration"] !== undefined) body["expiration"] = g["expiration"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["isDefault"] !== undefined) body["isDefault"] = g["isDefault"];
        if (g["issuerCn"] !== undefined) body["issuerCn"] = g["issuerCn"];
        if (g["pem"] !== undefined) body["pem"] = g["pem"];
        if (g["pkcs12"] !== undefined) body["pkcs12"] = g["pkcs12"];
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
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
              "userId": String(g["userId"] ?? ""),
              "sendAsEmail": String(g["sendAsEmail"] ?? ""),
            },
            matchField: "id",
            matchValue: String(g["id"] ?? ""),
          },
        ) as StateData;
        const instanceName = ((result.id ?? g.id)?.toString() ?? "current")
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
      description: "Get a smimeInfo",
      arguments: z.object({
        identifier: z.string().describe("The id of the smimeInfo"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["sendAsEmail"] !== undefined) {
          params["sendAsEmail"] = String(g["sendAsEmail"]);
        }
        params["id"] = args.identifier;
        const result = await readResource(
          BASE_URL,
          GET_CONFIG,
          params,
        ) as StateData;
        const instanceName =
          ((result.id ?? g.id)?.toString() ?? args.identifier).replace(
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
      description: "Delete the smimeInfo",
      arguments: z.object({
        identifier: z.string().describe("The id of the smimeInfo"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["sendAsEmail"] !== undefined) {
          params["sendAsEmail"] = String(g["sendAsEmail"]);
        }
        params["id"] = args.identifier;
        const { existed } = await deleteResource(
          BASE_URL,
          DELETE_CONFIG,
          params,
        );
        const instanceName = (g.id?.toString() ?? args.identifier).replace(
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
      description: "Sync smimeInfo state from GCP",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const instanceName = (g.id?.toString() ?? "current").replace(
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
          if (g["sendAsEmail"] !== undefined) {
            params["sendAsEmail"] = String(g["sendAsEmail"]);
          } else if (existing["sendAsEmail"]) {
            params["sendAsEmail"] = String(existing["sendAsEmail"]);
          }
          const identifier = existing.id?.toString() ?? g["id"]?.toString();
          if (!identifier) {
            throw new Error(
              "No identifier found in existing state or globalArgs",
            );
          }
          params["id"] = identifier;
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
    set_default: {
      description: "set default",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (g["sendAsEmail"] !== undefined) {
          params["sendAsEmail"] = String(g["sendAsEmail"]);
        }
        if (g["id"] !== undefined) params["id"] = String(g["id"]);
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.settings.sendAs.smimeInfo.setDefault",
            "path":
              "gmail/v1/users/{userId}/settings/sendAs/{sendAsEmail}/smimeInfo/{id}/setDefault",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "sendAsEmail", "id"],
            "parameters": {
              "id": { "location": "path", "required": true },
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
