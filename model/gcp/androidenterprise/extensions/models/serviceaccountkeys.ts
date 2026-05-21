// Auto-generated extension model for @swamp/gcp/androidenterprise/serviceaccountkeys
// Do not edit manually. Re-generate with: deno task generate:gcp

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Google Cloud Google Play EMM Serviceaccountkeys.
 *
 * *Deprecated:* New integrations cannot use this method and can refer to our new recommendations
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
  readViaList,
} from "./_lib/gcp.ts";

const BASE_URL = "https://androidenterprise.googleapis.com/";

const INSERT_CONFIG = {
  "id": "androidenterprise.serviceaccountkeys.insert",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/serviceAccountKeys",
  "httpMethod": "POST",
  "parameterOrder": [
    "enterpriseId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const DELETE_CONFIG = {
  "id": "androidenterprise.serviceaccountkeys.delete",
  "path":
    "androidenterprise/v1/enterprises/{enterpriseId}/serviceAccountKeys/{keyId}",
  "httpMethod": "DELETE",
  "parameterOrder": [
    "enterpriseId",
    "keyId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
    "keyId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const LIST_CONFIG = {
  "id": "androidenterprise.serviceaccountkeys.list",
  "path": "androidenterprise/v1/enterprises/{enterpriseId}/serviceAccountKeys",
  "httpMethod": "GET",
  "parameterOrder": [
    "enterpriseId",
  ],
  "parameters": {
    "enterpriseId": {
      "location": "path",
      "required": true,
    },
  },
} as const;

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  data: z.string().describe(
    'The body of the private key credentials file, in string format. This is only populated when the ServiceAccountKey is created, and is not stored by Google. When type is "pkcs12", the contents of the data field is base64 encoded and has the password "notasecret".',
  ).optional(),
  id: z.string().describe(
    "An opaque, unique identifier for this ServiceAccountKey. Assigned by the server.",
  ).optional(),
  publicData: z.string().describe(
    "Public key data for the credentials file. This is an X.509 cert. If you are using the googleCredentials key type, this is identical to the cert that can be retrieved by using the X.509 cert url inside of the credentials file.",
  ).optional(),
  type: z.enum(["googleCredentials", "pkcs12"]).describe(
    "The file format of the generated key data.",
  ),
  enterpriseId: z.string().describe("The ID of the enterprise."),
});

const StateSchema = z.object({
  data: z.string().optional(),
  id: z.string().optional(),
  publicData: z.string().optional(),
  type: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  data: z.string().describe(
    'The body of the private key credentials file, in string format. This is only populated when the ServiceAccountKey is created, and is not stored by Google. When type is "pkcs12", the contents of the data field is base64 encoded and has the password "notasecret".',
  ).optional(),
  id: z.string().describe(
    "An opaque, unique identifier for this ServiceAccountKey. Assigned by the server.",
  ).optional(),
  publicData: z.string().describe(
    "Public key data for the credentials file. This is an X.509 cert. If you are using the googleCredentials key type, this is identical to the cert that can be retrieved by using the X.509 cert url inside of the credentials file.",
  ).optional(),
  type: z.enum(["googleCredentials", "pkcs12"]).describe(
    "The file format of the generated key data.",
  ).optional(),
  enterpriseId: z.string().describe("The ID of the enterprise.").optional(),
});

/** Swamp extension model for Google Cloud Google Play EMM Serviceaccountkeys. Registered at `@swamp/gcp/androidenterprise/serviceaccountkeys`. */
export const model = {
  type: "@swamp/gcp/androidenterprise/serviceaccountkeys",
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
      toVersion: "2026.04.24.1",
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
      description:
        "*Deprecated:* New integrations cannot use this method and can refer to our ne...",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a serviceaccountkeys",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        const body: Record<string, unknown> = {};
        if (g["data"] !== undefined) body["data"] = g["data"];
        if (g["id"] !== undefined) body["id"] = g["id"];
        if (g["publicData"] !== undefined) body["publicData"] = g["publicData"];
        if (g["type"] !== undefined) body["type"] = g["type"];
        const result = await createResource(
          BASE_URL,
          INSERT_CONFIG,
          params,
          body,
          undefined,
          undefined,
          {
            listConfig: LIST_CONFIG,
            listParams: { "enterpriseId": String(g["enterpriseId"] ?? "") },
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
      description: "Get a serviceaccountkeys",
      arguments: z.object({
        identifier: z.string().describe("The name of the serviceaccountkeys"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        const g = context.globalArgs;
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
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
    delete: {
      description: "Delete the serviceaccountkeys",
      arguments: z.object({
        identifier: z.string().describe("The name of the serviceaccountkeys"),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const g = context.globalArgs;
        const projectId = await getProjectId();
        const params: Record<string, string> = { project: projectId };
        if (g["enterpriseId"] !== undefined) {
          params["enterpriseId"] = String(g["enterpriseId"]);
        }
        params["keyId"] = args.identifier;
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
      description: "Sync serviceaccountkeys state from GCP",
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
          if (g["enterpriseId"] !== undefined) {
            params["enterpriseId"] = String(g["enterpriseId"]);
          } else if (existing["enterpriseId"]) {
            params["enterpriseId"] = String(existing["enterpriseId"]);
          }
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
  },
};
