// Auto-generated extension model for @swamp/aws/healthlake/fhirdatastore
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for HealthLake FHIRDatastore (AWS::HealthLake::FHIRDatastore).
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

const KmsEncryptionConfigSchema = z.object({
  CmkType: z.enum(["CUSTOMER_MANAGED_KMS_KEY", "AWS_OWNED_KMS_KEY"]).describe(
    "The type of customer-managed-key (CMK) used for encryption. The two types of supported CMKs are customer owned CMKs and AWS owned CMKs.",
  ),
  KmsKeyId: z.string().min(1).max(400).regex(
    new RegExp(
      "(arn:aws((-us-gov)|(-iso)|(-iso-b)|(-cn))?:kms:)?([a-z]{2}-[a-z]+(-[a-z]+)?-\\d:)?(\\d{12}:)?(((key/)?[a-zA-Z0-9-_]+)|(alias/[a-zA-Z0-9:/_-]+))",
    ),
  ).describe(
    "The KMS encryption key id/alias used to encrypt the Data Store contents at rest.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("The key of the tag."),
  Value: z.string().min(0).max(256).describe("The value of the tag."),
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
  CreatedAt: z.object({
    Seconds: z.string().describe("Seconds since epoch."),
    Nanos: z.number().int().describe("Nanoseconds."),
  }).describe("The time that a Data Store was created.").optional(),
  DatastoreName: z.string().min(1).max(256).describe(
    "The user-generated name for the Data Store.",
  ).optional(),
  DatastoreTypeVersion: z.enum(["R4"]).describe(
    "The FHIR version. Only R4 version data is supported.",
  ),
  PreloadDataConfig: z.object({
    PreloadDataType: z.enum(["SYNTHEA"]).describe(
      "The type of preloaded data. Only Synthea preloaded data is supported.",
    ),
  }).describe(
    "The preloaded data configuration for the Data Store. Only data preloaded from Synthea is supported.",
  ).optional(),
  SseConfiguration: z.object({
    KmsEncryptionConfig: KmsEncryptionConfigSchema.describe(
      "The customer-managed-key (CMK) used when creating a Data Store. If a customer owned key is not specified, an AWS owned key will be used for encryption.",
    ),
  }).describe(
    "The server-side encryption key configuration for a customer provided encryption key.",
  ).optional(),
  IdentityProviderConfiguration: z.object({
    AuthorizationStrategy: z.enum([
      "SMART_ON_FHIR_V1",
      "AWS_AUTH",
      "SMART_ON_FHIR",
    ]).describe(
      "Type of Authorization Strategy. The two types of supported Authorization strategies are SMART_ON_FHIR_V1 and AWS_AUTH.",
    ),
    FineGrainedAuthorizationEnabled: z.boolean().describe(
      "Flag to indicate if fine-grained authorization will be enabled for the datastore",
    ).optional(),
    Metadata: z.string().describe(
      "The JSON metadata elements for identity provider configuration.",
    ).optional(),
    IdpLambdaArn: z.string().min(49).max(256).regex(
      new RegExp(
        "arn:aws[-a-z]*:lambda:[a-z]{2}-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9\\-_\\.]+(:(\\$LATEST|[a-zA-Z0-9\\-_]+))?",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the Lambda function that will be used to decode the access token created by the authorization server.",
    ).optional(),
  }).describe("The identity provider configuration for the datastore")
    .optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  CreatedAt: z.object({
    Seconds: z.string(),
    Nanos: z.number(),
  }).optional(),
  DatastoreArn: z.string().optional(),
  DatastoreEndpoint: z.string().optional(),
  DatastoreId: z.string(),
  DatastoreName: z.string().optional(),
  DatastoreStatus: z.string().optional(),
  DatastoreTypeVersion: z.string().optional(),
  PreloadDataConfig: z.object({
    PreloadDataType: z.string(),
  }).optional(),
  SseConfiguration: z.object({
    KmsEncryptionConfig: KmsEncryptionConfigSchema,
  }).optional(),
  IdentityProviderConfiguration: z.object({
    AuthorizationStrategy: z.string(),
    FineGrainedAuthorizationEnabled: z.boolean(),
    Metadata: z.string(),
    IdpLambdaArn: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CreatedAt: z.object({
    Seconds: z.string().describe("Seconds since epoch.").optional(),
    Nanos: z.number().int().describe("Nanoseconds.").optional(),
  }).describe("The time that a Data Store was created.").optional(),
  DatastoreName: z.string().min(1).max(256).describe(
    "The user-generated name for the Data Store.",
  ).optional(),
  DatastoreTypeVersion: z.enum(["R4"]).describe(
    "The FHIR version. Only R4 version data is supported.",
  ).optional(),
  PreloadDataConfig: z.object({
    PreloadDataType: z.enum(["SYNTHEA"]).describe(
      "The type of preloaded data. Only Synthea preloaded data is supported.",
    ).optional(),
  }).describe(
    "The preloaded data configuration for the Data Store. Only data preloaded from Synthea is supported.",
  ).optional(),
  SseConfiguration: z.object({
    KmsEncryptionConfig: KmsEncryptionConfigSchema.describe(
      "The customer-managed-key (CMK) used when creating a Data Store. If a customer owned key is not specified, an AWS owned key will be used for encryption.",
    ).optional(),
  }).describe(
    "The server-side encryption key configuration for a customer provided encryption key.",
  ).optional(),
  IdentityProviderConfiguration: z.object({
    AuthorizationStrategy: z.enum([
      "SMART_ON_FHIR_V1",
      "AWS_AUTH",
      "SMART_ON_FHIR",
    ]).describe(
      "Type of Authorization Strategy. The two types of supported Authorization strategies are SMART_ON_FHIR_V1 and AWS_AUTH.",
    ).optional(),
    FineGrainedAuthorizationEnabled: z.boolean().describe(
      "Flag to indicate if fine-grained authorization will be enabled for the datastore",
    ).optional(),
    Metadata: z.string().describe(
      "The JSON metadata elements for identity provider configuration.",
    ).optional(),
    IdpLambdaArn: z.string().min(49).max(256).regex(
      new RegExp(
        "arn:aws[-a-z]*:lambda:[a-z]{2}-[a-z]+-\\d{1}:\\d{12}:function:[a-zA-Z0-9\\-_\\.]+(:(\\$LATEST|[a-zA-Z0-9\\-_]+))?",
      ),
    ).describe(
      "The Amazon Resource Name (ARN) of the Lambda function that will be used to decode the access token created by the authorization server.",
    ).optional(),
  }).describe("The identity provider configuration for the datastore")
    .optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for HealthLake FHIRDatastore. Registered at `@swamp/aws/healthlake/fhirdatastore`. */
export const model = {
  type: "@swamp/aws/healthlake/fhirdatastore",
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
      description: "HealthLake FHIRDatastore resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a HealthLake FHIRDatastore",
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
          "AWS::HealthLake::FHIRDatastore",
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
      description: "Get a HealthLake FHIRDatastore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the HealthLake FHIRDatastore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::HealthLake::FHIRDatastore",
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
      description: "Update a HealthLake FHIRDatastore",
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
        const identifier = existing.DatastoreId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::HealthLake::FHIRDatastore",
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
          "AWS::HealthLake::FHIRDatastore",
          identifier,
          currentState,
          desiredState,
          [
            "DatastoreName",
            "DatastoreTypeVersion",
            "PreloadDataConfig",
            "SseConfiguration",
            "IdentityProviderConfiguration",
          ],
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
      description: "Delete a HealthLake FHIRDatastore",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the HealthLake FHIRDatastore",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::HealthLake::FHIRDatastore",
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
      description: "Sync HealthLake FHIRDatastore state from AWS",
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
        const identifier = existing.DatastoreId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::HealthLake::FHIRDatastore",
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
