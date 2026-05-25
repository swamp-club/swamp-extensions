// Auto-generated extension model for @swamp/gcp/gmail/users-settings-cse-identities
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gmail Users.Settings.Cse.Identities.
 *
 * The client-side encryption (CSE) configuration for the email address of an authenticated user. Gmail uses CSE configurations to save drafts of client-side encrypted email messages, and to sign and send encrypted email messages. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured.
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
  updateResource,
} from "./_lib/gcp.ts";

const BASE_URL = "https://gmail.googleapis.com/";

const GET_CONFIG = {
  "id": "gmail.users.settings.cse.identities.get",
  "path": "gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "cseEmailAddress",
  ],
  "parameters": {
    "cseEmailAddress": {
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
  "id": "gmail.users.settings.cse.identities.create",
  "path": "gmail/v1/users/{userId}/settings/cse/identities",
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

const PATCH_CONFIG = {
  "id": "gmail.users.settings.cse.identities.patch",
  "path": "gmail/v1/users/{userId}/settings/cse/identities/{emailAddress}",
  "httpMethod": "PATCH",
  "parameterOrder": [
    "userId",
    "emailAddress",
  ],
  "parameters": {
    "emailAddress": {
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
  "id": "gmail.users.settings.cse.identities.delete",
  "path": "gmail/v1/users/{userId}/settings/cse/identities/{cseEmailAddress}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "userId",
    "cseEmailAddress",
  ],
  "parameters": {
    "cseEmailAddress": {
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
  "id": "gmail.users.settings.cse.identities.list",
  "path": "gmail/v1/users/{userId}/settings/cse/identities",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
  ],
  "parameters": {
    "pageSize": {
      "location": "query",
    },
    "pageToken": {
      "location": "query",
    },
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
  emailAddress: z.string().describe(
    "The email address for the sending identity. The email address must be the primary email address of the authenticated user.",
  ).optional(),
  primaryKeyPairId: z.string().describe(
    "If a key pair is associated, the ID of the key pair, CseKeyPair.",
  ).optional(),
  signAndEncryptKeyPairs: z.object({
    encryptionKeyPairId: z.string().describe(
      "The ID of the CseKeyPair that encrypts signed outgoing mail.",
    ).optional(),
    signingKeyPairId: z.string().describe(
      "The ID of the CseKeyPair that signs outgoing mail.",
    ).optional(),
  }).describe(
    "The configuration of a CSE identity that uses different key pairs for signing and encryption.",
  ).optional(),
  userId: z.string().describe(
    "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
  ),
});

const StateSchema = z.object({
  emailAddress: z.string().optional(),
  primaryKeyPairId: z.string().optional(),
  signAndEncryptKeyPairs: z.object({
    encryptionKeyPairId: z.string(),
    signingKeyPairId: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  emailAddress: z.string().describe(
    "The email address for the sending identity. The email address must be the primary email address of the authenticated user.",
  ).optional(),
  primaryKeyPairId: z.string().describe(
    "If a key pair is associated, the ID of the key pair, CseKeyPair.",
  ).optional(),
  signAndEncryptKeyPairs: z.object({
    encryptionKeyPairId: z.string().describe(
      "The ID of the CseKeyPair that encrypts signed outgoing mail.",
    ).optional(),
    signingKeyPairId: z.string().describe(
      "The ID of the CseKeyPair that signs outgoing mail.",
    ).optional(),
  }).describe(
    "The configuration of a CSE identity that uses different key pairs for signing and encryption.",
  ).optional(),
  userId: z.string().describe(
    "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Gmail Users.Settings.Cse.Identities. Registered at `@swamp/gcp/gmail/users-settings-cse-identities`. */
export const model = {
  type: "@swamp/gcp/gmail/users-settings-cse-identities",
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
      description:
        "The client-side encryption (CSE) configuration for the email address of an au...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a identities",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (g["emailAddress"] !== undefined) {
          body["emailAddress"] = g["emailAddress"];
        }
        if (g["primaryKeyPairId"] !== undefined) {
          body["primaryKeyPairId"] = g["primaryKeyPairId"];
        }
        if (g["signAndEncryptKeyPairs"] !== undefined) {
          body["signAndEncryptKeyPairs"] = g["signAndEncryptKeyPairs"];
        }
        if (g["name"] !== undefined) {
          params["cseEmailAddress"] = String(g["name"]);
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
            listParams: { "userId": String(g["userId"] ?? "") },
            matchField: "name",
            matchValue: String(g["name"] ?? ""),
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
      description: "Get a identities",
      arguments: z.object({
        identifier: z.string().describe("The name of the identities"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["cseEmailAddress"] = args.identifier;
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
      description: "Update identities attributes",
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
        params["emailAddress"] = existing["name"]?.toString() ?? "";
        const body: Record<string, unknown> = {};
        if (g["primaryKeyPairId"] !== undefined) {
          body["primaryKeyPairId"] = g["primaryKeyPairId"];
        }
        if (g["signAndEncryptKeyPairs"] !== undefined) {
          body["signAndEncryptKeyPairs"] = g["signAndEncryptKeyPairs"];
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
          PATCH_CONFIG,
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
      description: "Delete the identities",
      arguments: z.object({
        identifier: z.string().describe("The name of the identities"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["cseEmailAddress"] = args.identifier;
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
      description: "Sync identities state from GCP",
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
          params["cseEmailAddress"] = identifier;
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
    list: {
      description: "List identities resources",
      arguments: z.object({
        pageSize: z.number().describe(
          "The number of identities to return. If not provided, the page size will default to 20 entries.",
        ).optional(),
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
      }),
      execute: async (args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        if (args["pageSize"] !== undefined) {
          params["pageSize"] = String(args["pageSize"]);
        }
        const { items, nextPageToken } = await listResources(
          BASE_URL,
          LIST_CONFIG,
          params,
          "cseIdentities",
          (args.maxPages as number | undefined) ?? 10,
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
  },
};
