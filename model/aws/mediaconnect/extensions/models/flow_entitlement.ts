// Auto-generated extension model for @swamp/aws/mediaconnect/flow-entitlement
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MediaConnect FlowEntitlement (AWS::MediaConnect::FlowEntitlement).
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
  Key: z.string(),
  Value: z.string(),
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
  FlowArn: z.string().describe("The ARN of the flow."),
  DataTransferSubscriberFeePercent: z.number().int().describe(
    "Percentage from 0-100 of the data transfer cost to be billed to the subscriber.",
  ).optional(),
  Description: z.string().describe("A description of the entitlement."),
  Encryption: z.object({
    Algorithm: z.enum(["aes128", "aes192", "aes256"]).describe(
      "The type of algorithm that is used for the encryption (such as aes128, aes192, or aes256).",
    ),
    ConstantInitializationVector: z.string().describe(
      "A 128-bit, 16-byte hex value represented by a 32-character string, to be used with the key for encrypting content. This parameter is not valid for static key encryption.",
    ).optional(),
    DeviceId: z.string().describe(
      "The value of one of the devices that you configured with your digital rights management (DRM) platform key provider. This parameter is required for SPEKE encryption and is not valid for static key encryption.",
    ).optional(),
    KeyType: z.enum(["speke", "static-key"]).describe(
      "The type of key that is used for the encryption. If no keyType is provided, the service will use the default setting (static-key).",
    ).optional(),
    Region: z.string().describe(
      "The AWS Region that the API Gateway proxy endpoint was created in. This parameter is required for SPEKE encryption and is not valid for static key encryption.",
    ).optional(),
    ResourceId: z.string().describe(
      "An identifier for the content. The service sends this value to the key server to identify the current endpoint. The resource ID is also known as the content ID. This parameter is required for SPEKE encryption and is not valid for static key encryption.",
    ).optional(),
    RoleArn: z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*):iam::[0-9]{12}:role/[a-zA-Z0-9_+=,.@-]+$",
      ),
    ).describe(
      "The ARN of the role that you created during setup (when you set up AWS Elemental MediaConnect as a trusted entity).",
    ),
    SecretArn: z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*):secretsmanager:[a-z0-9-]+:[0-9]{12}:secret:[a-zA-Z0-9/_+=.@-]+$",
      ),
    ).describe(
      "The ARN of the secret that you created in AWS Secrets Manager to store the encryption key. This parameter is required for static key encryption and is not valid for SPEKE encryption.",
    ).optional(),
    Url: z.string().describe(
      "The URL from the API Gateway proxy that you set up to talk to your key server. This parameter is required for SPEKE encryption and is not valid for static key encryption.",
    ).optional(),
  }).describe(
    "The type of encryption that will be used on the output that is associated with this entitlement.",
  ).optional(),
  EntitlementStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "An indication of whether the entitlement is enabled.",
  ).optional(),
  Name: z.string().describe("The name of the entitlement."),
  Subscribers: z.array(z.string()).describe(
    "The AWS account IDs that you want to share your content with. The receiving accounts (subscribers) will be allowed to create their own flow using your content as the source.",
  ),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to tag and organize this flow entitlement.",
  ).optional(),
});

const StateSchema = z.object({
  FlowArn: z.string().optional(),
  EntitlementArn: z.string(),
  DataTransferSubscriberFeePercent: z.number().optional(),
  Description: z.string().optional(),
  Encryption: z.object({
    Algorithm: z.string(),
    ConstantInitializationVector: z.string(),
    DeviceId: z.string(),
    KeyType: z.string(),
    Region: z.string(),
    ResourceId: z.string(),
    RoleArn: z.string(),
    SecretArn: z.string(),
    Url: z.string(),
  }).optional(),
  EntitlementStatus: z.string().optional(),
  Name: z.string().optional(),
  Subscribers: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FlowArn: z.string().describe("The ARN of the flow.").optional(),
  DataTransferSubscriberFeePercent: z.number().int().describe(
    "Percentage from 0-100 of the data transfer cost to be billed to the subscriber.",
  ).optional(),
  Description: z.string().describe("A description of the entitlement.")
    .optional(),
  Encryption: z.object({
    Algorithm: z.enum(["aes128", "aes192", "aes256"]).describe(
      "The type of algorithm that is used for the encryption (such as aes128, aes192, or aes256).",
    ).optional(),
    ConstantInitializationVector: z.string().describe(
      "A 128-bit, 16-byte hex value represented by a 32-character string, to be used with the key for encrypting content. This parameter is not valid for static key encryption.",
    ).optional(),
    DeviceId: z.string().describe(
      "The value of one of the devices that you configured with your digital rights management (DRM) platform key provider. This parameter is required for SPEKE encryption and is not valid for static key encryption.",
    ).optional(),
    KeyType: z.enum(["speke", "static-key"]).describe(
      "The type of key that is used for the encryption. If no keyType is provided, the service will use the default setting (static-key).",
    ).optional(),
    Region: z.string().describe(
      "The AWS Region that the API Gateway proxy endpoint was created in. This parameter is required for SPEKE encryption and is not valid for static key encryption.",
    ).optional(),
    ResourceId: z.string().describe(
      "An identifier for the content. The service sends this value to the key server to identify the current endpoint. The resource ID is also known as the content ID. This parameter is required for SPEKE encryption and is not valid for static key encryption.",
    ).optional(),
    RoleArn: z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*):iam::[0-9]{12}:role/[a-zA-Z0-9_+=,.@-]+$",
      ),
    ).describe(
      "The ARN of the role that you created during setup (when you set up AWS Elemental MediaConnect as a trusted entity).",
    ).optional(),
    SecretArn: z.string().regex(
      new RegExp(
        "^arn:(aws[a-zA-Z-]*):secretsmanager:[a-z0-9-]+:[0-9]{12}:secret:[a-zA-Z0-9/_+=.@-]+$",
      ),
    ).describe(
      "The ARN of the secret that you created in AWS Secrets Manager to store the encryption key. This parameter is required for static key encryption and is not valid for SPEKE encryption.",
    ).optional(),
    Url: z.string().describe(
      "The URL from the API Gateway proxy that you set up to talk to your key server. This parameter is required for SPEKE encryption and is not valid for static key encryption.",
    ).optional(),
  }).describe(
    "The type of encryption that will be used on the output that is associated with this entitlement.",
  ).optional(),
  EntitlementStatus: z.enum(["ENABLED", "DISABLED"]).describe(
    "An indication of whether the entitlement is enabled.",
  ).optional(),
  Name: z.string().describe("The name of the entitlement.").optional(),
  Subscribers: z.array(z.string()).describe(
    "The AWS account IDs that you want to share your content with. The receiving accounts (subscribers) will be allowed to create their own flow using your content as the source.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Key-value pairs that can be used to tag and organize this flow entitlement.",
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

/** Swamp extension model for MediaConnect FlowEntitlement. Registered at `@swamp/aws/mediaconnect/flow-entitlement`. */
export const model = {
  type: "@swamp/aws/mediaconnect/flow-entitlement",
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
      description: "MediaConnect FlowEntitlement resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MediaConnect FlowEntitlement",
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
          "AWS::MediaConnect::FlowEntitlement",
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
      description: "Get a MediaConnect FlowEntitlement",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect FlowEntitlement",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::MediaConnect::FlowEntitlement",
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
      description: "Update a MediaConnect FlowEntitlement",
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
        const identifier = existing.EntitlementArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MediaConnect::FlowEntitlement",
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
          "AWS::MediaConnect::FlowEntitlement",
          identifier,
          currentState,
          desiredState,
          ["FlowArn", "DataTransferSubscriberFeePercent", "Name"],
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
      description: "Delete a MediaConnect FlowEntitlement",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MediaConnect FlowEntitlement",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::MediaConnect::FlowEntitlement",
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
      description: "Sync MediaConnect FlowEntitlement state from AWS",
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
        const identifier = existing.EntitlementArn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MediaConnect::FlowEntitlement",
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
