// Auto-generated extension model for @swamp/aws/kendra/index
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Kendra Index (AWS::Kendra::Index).
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

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A string used to identify this tag",
  ),
  Value: z.string().min(0).max(256).describe(
    "A string containing the value for the tag",
  ),
});

const ValueImportanceItemSchema = z.object({
  Key: z.string().min(1).max(50).optional(),
  Value: z.number().int().min(1).max(10).optional(),
});

const RelevanceSchema = z.object({
  Freshness: z.boolean().optional(),
  Importance: z.number().int().min(1).max(10).optional(),
  Duration: z.string().min(1).max(10).regex(new RegExp("[0-9]+[s]")).optional(),
  RankOrder: z.enum(["ASCENDING", "DESCENDING"]).optional(),
  ValueImportanceItems: z.array(ValueImportanceItemSchema).optional(),
});

const SearchSchema = z.object({
  Facetable: z.boolean().optional(),
  Searchable: z.boolean().optional(),
  Displayable: z.boolean().optional(),
  Sortable: z.boolean().optional(),
});

const DocumentMetadataConfigurationSchema = z.object({
  Name: z.string().min(1).max(30),
  Type: z.enum([
    "STRING_VALUE",
    "STRING_LIST_VALUE",
    "LONG_VALUE",
    "DATE_VALUE",
  ]),
  Relevance: RelevanceSchema.optional(),
  Search: SearchSchema.optional(),
});

const JwtTokenTypeConfigurationSchema = z.object({
  KeyLocation: z.enum(["URL", "SECRET_MANAGER"]),
  URL: z.string().min(1).max(2048).regex(
    new RegExp("^(https?|ftp|file):\\/\\/([^\\s]*)"),
  ).optional(),
  SecretManagerArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ).describe("Role Arn").optional(),
  UserNameAttributeField: z.string().min(1).max(100).optional(),
  GroupAttributeField: z.string().min(1).max(100).optional(),
  Issuer: z.string().min(1).max(65).optional(),
  ClaimRegex: z.string().min(1).max(100).optional(),
});

const JsonTokenTypeConfigurationSchema = z.object({
  UserNameAttributeField: z.string().min(1).max(100),
  GroupAttributeField: z.string().min(1).max(100),
});

const UserTokenConfigurationSchema = z.object({
  JwtTokenTypeConfiguration: JwtTokenTypeConfigurationSchema.optional(),
  JsonTokenTypeConfiguration: JsonTokenTypeConfigurationSchema.optional(),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Description: z.string().max(1000).describe("A description for the index")
    .optional(),
  ServerSideEncryptionConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(2048).optional(),
  }).describe("Server side encryption configuration").optional(),
  Tags: z.array(TagSchema).describe("Tags for labeling the index").optional(),
  Name: z.string().min(1).max(1000).describe("Name of index"),
  RoleArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ).describe("Role Arn"),
  Edition: z.enum([
    "DEVELOPER_EDITION",
    "ENTERPRISE_EDITION",
    "GEN_AI_ENTERPRISE_EDITION",
  ]).describe("Edition of index"),
  DocumentMetadataConfigurations: z.array(DocumentMetadataConfigurationSchema)
    .describe("Document metadata configurations").optional(),
  CapacityUnits: z.object({
    StorageCapacityUnits: z.number().int().min(0),
    QueryCapacityUnits: z.number().int().min(0),
  }).describe("Capacity units").optional(),
  UserContextPolicy: z.enum(["ATTRIBUTE_FILTER", "USER_TOKEN"]).optional(),
  UserTokenConfigurations: z.array(UserTokenConfigurationSchema).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Arn: z.string().optional(),
  Description: z.string().optional(),
  ServerSideEncryptionConfiguration: z.object({
    KmsKeyId: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  Name: z.string().optional(),
  RoleArn: z.string().optional(),
  Edition: z.string().optional(),
  DocumentMetadataConfigurations: z.array(DocumentMetadataConfigurationSchema)
    .optional(),
  CapacityUnits: z.object({
    StorageCapacityUnits: z.number(),
    QueryCapacityUnits: z.number(),
  }).optional(),
  UserContextPolicy: z.string().optional(),
  UserTokenConfigurations: z.array(UserTokenConfigurationSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Description: z.string().max(1000).describe("A description for the index")
    .optional(),
  ServerSideEncryptionConfiguration: z.object({
    KmsKeyId: z.string().min(1).max(2048).optional(),
  }).describe("Server side encryption configuration").optional(),
  Tags: z.array(TagSchema).describe("Tags for labeling the index").optional(),
  Name: z.string().min(1).max(1000).describe("Name of index").optional(),
  RoleArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ).describe("Role Arn").optional(),
  Edition: z.enum([
    "DEVELOPER_EDITION",
    "ENTERPRISE_EDITION",
    "GEN_AI_ENTERPRISE_EDITION",
  ]).describe("Edition of index").optional(),
  DocumentMetadataConfigurations: z.array(DocumentMetadataConfigurationSchema)
    .describe("Document metadata configurations").optional(),
  CapacityUnits: z.object({
    StorageCapacityUnits: z.number().int().min(0).optional(),
    QueryCapacityUnits: z.number().int().min(0).optional(),
  }).describe("Capacity units").optional(),
  UserContextPolicy: z.enum(["ATTRIBUTE_FILTER", "USER_TOKEN"]).optional(),
  UserTokenConfigurations: z.array(UserTokenConfigurationSchema).optional(),
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

/** Swamp extension model for Kendra Index. Registered at `@swamp/aws/kendra/index`. */
export const model = {
  type: "@swamp/aws/kendra/index",
  version: "2026.06.06.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "Kendra Index resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Kendra Index",
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
          "AWS::Kendra::Index",
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
      description: "Get a Kendra Index",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Kendra Index",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Kendra::Index",
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
      description: "Update a Kendra Index",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Kendra::Index",
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
          "AWS::Kendra::Index",
          identifier,
          currentState,
          desiredState,
          ["Edition", "ServerSideEncryptionConfiguration"],
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
      description: "Delete a Kendra Index",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Kendra Index",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Kendra::Index",
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
      description: "Sync Kendra Index state from AWS",
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
        const identifier = existing.Id?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Kendra::Index",
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
