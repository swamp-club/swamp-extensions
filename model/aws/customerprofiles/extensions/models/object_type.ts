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

// Auto-generated extension model for @swamp/aws/customerprofiles/object-type
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CustomerProfiles ObjectType (AWS::CustomerProfiles::ObjectType).
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

const ObjectTypeFieldSchema = z.object({
  Source: z.string().min(1).max(1000).describe(
    'A field of a ProfileObject. For example: _source.FirstName, where "_source" is a ProfileObjectType of a Zendesk user and "FirstName" is a field in that ObjectType.',
  ).optional(),
  Target: z.string().min(1).max(1000).describe(
    "The location of the data in the standard ProfileObject model. For example: _profile.Address.PostalCode.",
  ).optional(),
  ContentType: z.enum([
    "STRING",
    "NUMBER",
    "PHONE_NUMBER",
    "EMAIL_ADDRESS",
    "NAME",
  ]).describe(
    "The content type of the field. Used for determining equality when searching.",
  ).optional(),
});

const FieldMapSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .optional(),
  ObjectTypeField: ObjectTypeFieldSchema.describe(
    "Represents a field in a ProfileObjectType.",
  ).optional(),
});

const ObjectTypeKeySchema = z.object({
  FieldNames: z.array(
    z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
  ).describe("The reference for the key name of the fields map.").optional(),
  StandardIdentifiers: z.array(
    z.enum([
      "PROFILE",
      "UNIQUE",
      "SECONDARY",
      "LOOKUP_ONLY",
      "NEW_ONLY",
      "ASSET",
      "CASE",
      "ORDER",
      "AIR_PREFERENCE",
      "AIR_BOOKING",
      "AIR_SEGMENT",
      "HOTEL_PREFERENCE",
      "HOTEL_STAY_REVENUE",
      "HOTEL_RESERVATION",
      "LOYALTY",
      "LOYALTY_TRANSACTION",
      "LOYALTY_PROMOTION",
      "WEB_ANALYTICS",
      "DEVICE",
    ]),
  ).describe(
    "The types of keys that a ProfileObject can have. Each ProfileObject can have only 1 UNIQUE key but multiple PROFILE keys. PROFILE means that this key can be used to tie an object to a PROFILE. UNIQUE means that it can be used to uniquely identify an object. If a key a is marked as SECONDARY, it will be used to search for profiles after all other PROFILE keys have been searched. A LOOKUP_ONLY key is only used to match a profile but is not persisted to be used for searching of the profile. A NEW_ONLY key is only used if the profile does not already exist before the object is ingested, otherwise it is only used for matching objects to profiles.",
  ).optional(),
});

const KeyMapSchema = z.object({
  Name: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .optional(),
  ObjectTypeKeyList: z.array(ObjectTypeKeySchema).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(0).max(256),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
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
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain."),
  ObjectTypeName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-]*$"),
  ).describe("The name of the profile object type."),
  AllowProfileCreation: z.boolean().describe(
    "Indicates whether a profile should be created when data is received.",
  ).optional(),
  Description: z.string().min(1).max(10000).describe(
    "Description of the profile object type.",
  ),
  EncryptionKey: z.string().min(0).max(255).describe(
    "The default encryption key",
  ).optional(),
  ExpirationDays: z.number().int().min(1).max(1098).describe(
    "The default number of days until the data within the domain expires.",
  ).optional(),
  Fields: z.array(FieldMapSchema).describe(
    "A list of the name and ObjectType field.",
  ).optional(),
  Keys: z.array(KeyMapSchema).describe(
    "A list of unique keys that can be used to map data to the profile.",
  ).optional(),
  SourceLastUpdatedTimestampFormat: z.string().min(1).max(255).describe(
    "The format of your sourceLastUpdatedTimestamp that was previously set up.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the integration.",
  ).optional(),
  TemplateId: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("A unique identifier for the object template.").optional(),
  MaxProfileObjectCount: z.number().int().min(1).describe(
    "The maximum number of profile objects for this object type",
  ).optional(),
  SourcePriority: z.number().int().min(1).describe(
    "Defines the priority order of object types. Lower value indicates higher priority.",
  ).optional(),
});

const StateSchema = z.object({
  DomainName: z.string(),
  ObjectTypeName: z.string(),
  AllowProfileCreation: z.boolean().optional(),
  Description: z.string().optional(),
  EncryptionKey: z.string().optional(),
  ExpirationDays: z.number().optional(),
  Fields: z.array(FieldMapSchema).optional(),
  Keys: z.array(KeyMapSchema).optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
  SourceLastUpdatedTimestampFormat: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TemplateId: z.string().optional(),
  MaxProfileObjectCount: z.number().optional(),
  MaxAvailableProfileObjectCount: z.number().optional(),
  SourcePriority: z.number().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain.").optional(),
  ObjectTypeName: z.string().min(1).max(255).regex(
    new RegExp("^[a-zA-Z_][a-zA-Z_0-9-]*$"),
  ).describe("The name of the profile object type.").optional(),
  AllowProfileCreation: z.boolean().describe(
    "Indicates whether a profile should be created when data is received.",
  ).optional(),
  Description: z.string().min(1).max(10000).describe(
    "Description of the profile object type.",
  ).optional(),
  EncryptionKey: z.string().min(0).max(255).describe(
    "The default encryption key",
  ).optional(),
  ExpirationDays: z.number().int().min(1).max(1098).describe(
    "The default number of days until the data within the domain expires.",
  ).optional(),
  Fields: z.array(FieldMapSchema).describe(
    "A list of the name and ObjectType field.",
  ).optional(),
  Keys: z.array(KeyMapSchema).describe(
    "A list of unique keys that can be used to map data to the profile.",
  ).optional(),
  SourceLastUpdatedTimestampFormat: z.string().min(1).max(255).describe(
    "The format of your sourceLastUpdatedTimestamp that was previously set up.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the integration.",
  ).optional(),
  TemplateId: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("A unique identifier for the object template.").optional(),
  MaxProfileObjectCount: z.number().int().min(1).describe(
    "The maximum number of profile objects for this object type",
  ).optional(),
  SourcePriority: z.number().int().min(1).describe(
    "Defines the priority order of object types. Lower value indicates higher priority.",
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

/** Swamp extension model for CustomerProfiles ObjectType. Registered at `@swamp/aws/customerprofiles/object-type`. */
export const model = {
  type: "@swamp/aws/customerprofiles/object-type",
  version: "2026.06.15.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
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
      toVersion: "2026.04.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.04.23.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.06.1",
      description: "Added: accessKeyId, secretAccessKey, sessionToken, region",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "CustomerProfiles ObjectType resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CustomerProfiles ObjectType",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::CustomerProfiles::ObjectType",
          desiredState,
          credentials,
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
      description: "Get a CustomerProfiles ObjectType",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles ObjectType",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CustomerProfiles::ObjectType",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Update a CustomerProfiles ObjectType",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const idParts = [
          existing.DomainName?.toString(),
          existing.ObjectTypeName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::CustomerProfiles::ObjectType",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CustomerProfiles::ObjectType",
          identifier,
          currentState,
          desiredState,
          ["DomainName", "ObjectTypeName"],
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
      description: "Delete a CustomerProfiles ObjectType",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles ObjectType",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CustomerProfiles::ObjectType",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.name?.toString() ?? args.identifier).replace(
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
      description: "Sync CustomerProfiles ObjectType state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
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
        const idParts = [
          existing.DomainName?.toString(),
          existing.ObjectTypeName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::CustomerProfiles::ObjectType",
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
