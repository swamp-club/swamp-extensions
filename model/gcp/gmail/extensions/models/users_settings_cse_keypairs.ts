// Auto-generated extension model for @swamp/gcp/gmail/users-settings-cse-keypairs
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Gmail Users.Settings.Cse.Keypairs.
 *
 * A client-side encryption S/MIME key pair, which is comprised of a public key, its certificate chain, and metadata for its paired private key. Gmail uses the key pair to complete the following tasks: - Sign outgoing client-side encrypted messages. - Save and reopen drafts of client-side encrypted messages. - Save and reopen sent messages. - Decrypt incoming or archived S/MIME messages. For administrators managing identities and keypairs for users in their organization, requests require authorization with a [service account](https://developers.google.com/identity/protocols/OAuth2ServiceAccount) that has [domain-wide delegation authority](https://developers.google.com/identity/protocols/OAuth2ServiceAccount#delegatingauthority) to impersonate users with the `https://www.googleapis.com/auth/gmail.settings.basic` scope. For users managing their own identities and keypairs, requests require [hardware key encryption](https://support.google.com/a/answer/14153163) turned on and configured.
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

const BASE_URL = "https://gmail.googleapis.com/";

const GET_CONFIG = {
  "id": "gmail.users.settings.cse.keypairs.get",
  "path": "gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}",
  "httpMethod": "GET",
  "parameterOrder": [
    "userId",
    "keyPairId",
  ],
  "parameters": {
    "keyPairId": {
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
  "id": "gmail.users.settings.cse.keypairs.create",
  "path": "gmail/v1/users/{userId}/settings/cse/keypairs",
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

const LIST_CONFIG = {
  "id": "gmail.users.settings.cse.keypairs.list",
  "path": "gmail/v1/users/{userId}/settings/cse/keypairs",
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
  pkcs7: z.string().describe(
    "Input only. The public key and its certificate chain. The chain must be in [PKCS#7](https://en.wikipedia.org/wiki/PKCS_7) format and use PEM encoding and ASCII armor.",
  ).optional(),
  privateKeyMetadata: z.array(z.object({
    hardwareKeyMetadata: z.object({
      description: z.string().describe("Description about the hardware key.")
        .optional(),
    }).describe(
      "Metadata for hardware keys. If [hardware key encryption](https://support.google.com/a/answer/14153163) is set up for the Google Workspace organization, users can optionally store their private key on their smart card and use it to sign and decrypt email messages in Gmail by inserting their smart card into a reader attached to their Windows device.",
    ).optional(),
    kaclsKeyMetadata: z.object({
      kaclsData: z.string().describe(
        "Opaque data generated and used by the key access control list service. Maximum size: 8 KiB.",
      ).optional(),
      kaclsUri: z.string().describe(
        "The URI of the key access control list service that manages the private key.",
      ).optional(),
    }).describe(
      "Metadata for private keys managed by an external key access control list service. For details about managing key access, see [Google Workspace CSE API Reference](https://developers.google.com/workspace/cse/reference).",
    ).optional(),
    privateKeyMetadataId: z.string().describe(
      "Output only. The immutable ID for the private key metadata instance.",
    ).optional(),
  })).describe("Metadata for instances of this key pair's private key.")
    .optional(),
  userId: z.string().describe(
    "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
  ),
});

const StateSchema = z.object({
  disableTime: z.string().optional(),
  enablementState: z.string().optional(),
  keyPairId: z.string().optional(),
  pem: z.string().optional(),
  pkcs7: z.string().optional(),
  privateKeyMetadata: z.array(z.object({
    hardwareKeyMetadata: z.object({
      description: z.string(),
    }),
    kaclsKeyMetadata: z.object({
      kaclsData: z.string(),
      kaclsUri: z.string(),
    }),
    privateKeyMetadataId: z.string(),
  })).optional(),
  subjectEmailAddresses: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  pkcs7: z.string().describe(
    "Input only. The public key and its certificate chain. The chain must be in [PKCS#7](https://en.wikipedia.org/wiki/PKCS_7) format and use PEM encoding and ASCII armor.",
  ).optional(),
  privateKeyMetadata: z.array(z.object({
    hardwareKeyMetadata: z.object({
      description: z.string().describe("Description about the hardware key.")
        .optional(),
    }).describe(
      "Metadata for hardware keys. If [hardware key encryption](https://support.google.com/a/answer/14153163) is set up for the Google Workspace organization, users can optionally store their private key on their smart card and use it to sign and decrypt email messages in Gmail by inserting their smart card into a reader attached to their Windows device.",
    ).optional(),
    kaclsKeyMetadata: z.object({
      kaclsData: z.string().describe(
        "Opaque data generated and used by the key access control list service. Maximum size: 8 KiB.",
      ).optional(),
      kaclsUri: z.string().describe(
        "The URI of the key access control list service that manages the private key.",
      ).optional(),
    }).describe(
      "Metadata for private keys managed by an external key access control list service. For details about managing key access, see [Google Workspace CSE API Reference](https://developers.google.com/workspace/cse/reference).",
    ).optional(),
    privateKeyMetadataId: z.string().describe(
      "Output only. The immutable ID for the private key metadata instance.",
    ).optional(),
  })).describe("Metadata for instances of this key pair's private key.")
    .optional(),
  userId: z.string().describe(
    "The requester's primary email address. To indicate the authenticated user, you can use the special value `me`.",
  ).optional(),
});

/** Swamp extension model for Google Cloud Gmail Users.Settings.Cse.Keypairs. Registered at `@swamp/gcp/gmail/users-settings-cse-keypairs`. */
export const model = {
  type: "@swamp/gcp/gmail/users-settings-cse-keypairs",
  version: "2026.05.21.2",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description:
        "A client-side encryption S/MIME key pair, which is comprised of a public key,...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a keypairs",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const body: Record<string, unknown> = {};
        if (g["pkcs7"] !== undefined) body["pkcs7"] = g["pkcs7"];
        if (g["privateKeyMetadata"] !== undefined) {
          body["privateKeyMetadata"] = g["privateKeyMetadata"];
        }
        if (g["name"] !== undefined) params["keyPairId"] = String(g["name"]);
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
      description: "Get a keypairs",
      arguments: z.object({
        identifier: z.string().describe("The name of the keypairs"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        params["keyPairId"] = args.identifier;
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
      description: "Sync keypairs state from GCP",
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
          params["keyPairId"] = identifier;
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
    disable: {
      description: "disable",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["keyPairId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.settings.cse.keypairs.disable",
            "path":
              "gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:disable",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "keyPairId"],
            "parameters": {
              "keyPairId": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
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
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["keyPairId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.settings.cse.keypairs.enable",
            "path":
              "gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:enable",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "keyPairId"],
            "parameters": {
              "keyPairId": { "location": "path", "required": true },
              "userId": { "location": "path", "required": true },
            },
          },
          params,
          {},
        );
        return { result };
      },
    },
    obliterate: {
      description: "obliterate",
      arguments: z.object({}),
      execute: async (_args: Record<string, unknown>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["userId"] !== undefined) params["userId"] = String(g["userId"]);
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          (g.name?.toString() ?? "current").replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, ""),
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        params["keyPairId"] = existing["name"]?.toString() ??
          g["name"]?.toString() ?? "";
        const result = await createResource(
          BASE_URL,
          {
            "id": "gmail.users.settings.cse.keypairs.obliterate",
            "path":
              "gmail/v1/users/{userId}/settings/cse/keypairs/{keyPairId}:obliterate",
            "httpMethod": "POST",
            "parameterOrder": ["userId", "keyPairId"],
            "parameters": {
              "keyPairId": { "location": "path", "required": true },
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
