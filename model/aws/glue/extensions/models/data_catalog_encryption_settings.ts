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

// Auto-generated extension model for @swamp/aws/glue/data-catalog-encryption-settings
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Glue DataCatalogEncryptionSettings (AWS::Glue::DataCatalogEncryptionSettings).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, and sync can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.3.6";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const ConnectionPasswordEncryptionSchema = z.object({
  KmsKeyId: z.string().describe(
    "An AWS KMS key that is used to encrypt the connection password.",
  ).optional(),
  ReturnConnectionPasswordEncrypted: z.boolean().describe(
    "When the ReturnConnectionPasswordEncrypted flag is set to 'true', passwords remain encrypted in the responses of GetConnection and GetConnections. This encryption takes effect independently from catalog encryption.",
  ).optional(),
});

const EncryptionAtRestSchema = z.object({
  CatalogEncryptionMode: z.string().describe(
    "The encryption-at-rest mode for encrypting Data Catalog data.",
  ).optional(),
  CatalogEncryptionServiceRole: z.string().describe(
    "The role that AWS Glue assumes to encrypt and decrypt the Data Catalog objects on the caller's behalf.",
  ).optional(),
  SseAwsKmsKeyId: z.string().describe(
    "The ID of the AWS KMS key to use for encryption at rest.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).describe(
    "AWS access key ID; overrides AWS_ACCESS_KEY_ID environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).describe(
    "AWS secret access key; overrides AWS_SECRET_ACCESS_KEY environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  sessionToken: z.string().meta({ sensitive: true }).describe(
    "AWS session token for temporary credentials; overrides AWS_SESSION_TOKEN environment variable. Wire with a vault.get(...) expression to source it from a vault.",
  ).optional(),
  region: z.string().describe(
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  CatalogId: z.string().describe(
    "The ID of the Data Catalog in which the settings are created.",
  ),
  DataCatalogEncryptionSettings: z.object({
    ConnectionPasswordEncryption: ConnectionPasswordEncryptionSchema.describe(
      "When connection password protection is enabled, the Data Catalog uses a customer-provided key to encrypt the password as part of CreateConnection or UpdateConnection and store it in the ENCRYPTED_PASSWORD field in the connection properties. You can enable catalog encryption or only password encryption.",
    ).optional(),
    EncryptionAtRest: EncryptionAtRestSchema.describe(
      "Specifies the encryption-at-rest configuration for the Data Catalog.",
    ).optional(),
  }).describe(
    "Contains configuration information for maintaining Data Catalog security.",
  ),
});

const StateSchema = z.object({
  CatalogId: z.string(),
  DataCatalogEncryptionSettings: z.object({
    ConnectionPasswordEncryption: ConnectionPasswordEncryptionSchema,
    EncryptionAtRest: EncryptionAtRestSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CatalogId: z.string().describe(
    "The ID of the Data Catalog in which the settings are created.",
  ).optional(),
  DataCatalogEncryptionSettings: z.object({
    ConnectionPasswordEncryption: ConnectionPasswordEncryptionSchema.describe(
      "When connection password protection is enabled, the Data Catalog uses a customer-provided key to encrypt the password as part of CreateConnection or UpdateConnection and store it in the ENCRYPTED_PASSWORD field in the connection properties. You can enable catalog encryption or only password encryption.",
    ).optional(),
    EncryptionAtRest: EncryptionAtRestSchema.describe(
      "Specifies the encryption-at-rest configuration for the Data Catalog.",
    ).optional(),
  }).describe(
    "Contains configuration information for maintaining Data Catalog security.",
  ).optional(),
});

const _credentialKeys = new Set([
  "accessKeyId",
  "secretAccessKey",
  "sessionToken",
  "region",
]);

function _buildCredentials(g: Record<string, unknown>): AwsCredentials {
  return {
    accessKeyId: g.accessKeyId as string | undefined,
    secretAccessKey: g.secretAccessKey as string | undefined,
    sessionToken: g.sessionToken as string | undefined,
    region: g.region as string | undefined,
  };
}

/** Swamp extension model for Glue DataCatalogEncryptionSettings. Registered at `@swamp/aws/glue/data-catalog-encryption-settings`. */
export const model = {
  type: "@swamp/aws/glue/data-catalog-encryption-settings",
  version: "2026.06.27.1",
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Glue DataCatalogEncryptionSettings resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Glue DataCatalogEncryptionSettings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Glue::DataCatalogEncryptionSettings",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.CatalogId ?? g.CatalogId)?.toString() ?? "current").replace(
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
      description: "Get a Glue DataCatalogEncryptionSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue DataCatalogEncryptionSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Glue::DataCatalogEncryptionSettings",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.CatalogId ?? context.globalArgs.CatalogId)?.toString() ??
            args.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
            .replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Glue DataCatalogEncryptionSettings",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.CatalogId?.toString() ?? "current").replace(
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
        const identifier = existing.CatalogId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Glue::DataCatalogEncryptionSettings",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Glue::DataCatalogEncryptionSettings",
          identifier,
          currentState,
          desiredState,
          ["CatalogId"],
          credentials,
        );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    delete: {
      description: "Delete a Glue DataCatalogEncryptionSettings",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Glue DataCatalogEncryptionSettings",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Glue::DataCatalogEncryptionSettings",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.CatalogId?.toString() ?? args.identifier).replace(
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
      description: "Sync Glue DataCatalogEncryptionSettings state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.CatalogId?.toString() ?? "current").replace(
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
        const identifier = existing.CatalogId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Glue::DataCatalogEncryptionSettings",
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
              identifier,
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
