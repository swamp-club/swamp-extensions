// Auto-generated extension model for @swamp/aws/iotwireless/partner-account
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for IoTWireless PartnerAccount (AWS::IoTWireless::PartnerAccount).
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
  Key: z.string().min(1).max(127).optional(),
  Value: z.string().min(1).max(255).optional(),
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  Sidewalk: z.object({
    AppServerPrivateKey: z.string().min(1).max(4096).regex(
      new RegExp("[a-fA-F0-9]{64}"),
    ),
  }).describe("The Sidewalk account credentials.").optional(),
  PartnerAccountId: z.string().max(256).describe(
    "The partner account ID to disassociate from the AWS account",
  ).optional(),
  PartnerType: z.enum(["Sidewalk"]).describe("The partner type").optional(),
  SidewalkResponse: z.object({
    AmazonId: z.string().max(2048).optional(),
  }).describe("The Sidewalk account credentials.").optional(),
  AccountLinked: z.boolean().describe(
    "Whether the partner account is linked to the AWS account.",
  ).optional(),
  SidewalkUpdate: z.object({
    AppServerPrivateKey: z.string().min(1).max(4096).regex(
      new RegExp("[a-fA-F0-9]{64}"),
    ).optional(),
  }).describe("The Sidewalk account credentials.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the destination.",
  ).optional(),
});

const StateSchema = z.object({
  Sidewalk: z.object({
    AppServerPrivateKey: z.string(),
  }).optional(),
  PartnerAccountId: z.string(),
  PartnerType: z.string().optional(),
  SidewalkResponse: z.object({
    AmazonId: z.string(),
    Fingerprint: z.string(),
    Arn: z.string(),
  }).optional(),
  AccountLinked: z.boolean().optional(),
  SidewalkUpdate: z.object({
    AppServerPrivateKey: z.string(),
  }).optional(),
  Fingerprint: z.string().optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Sidewalk: z.object({
    AppServerPrivateKey: z.string().min(1).max(4096).regex(
      new RegExp("[a-fA-F0-9]{64}"),
    ).optional(),
  }).describe("The Sidewalk account credentials.").optional(),
  PartnerAccountId: z.string().max(256).describe(
    "The partner account ID to disassociate from the AWS account",
  ).optional(),
  PartnerType: z.enum(["Sidewalk"]).describe("The partner type").optional(),
  SidewalkResponse: z.object({
    AmazonId: z.string().max(2048).optional(),
  }).describe("The Sidewalk account credentials.").optional(),
  AccountLinked: z.boolean().describe(
    "Whether the partner account is linked to the AWS account.",
  ).optional(),
  SidewalkUpdate: z.object({
    AppServerPrivateKey: z.string().min(1).max(4096).regex(
      new RegExp("[a-fA-F0-9]{64}"),
    ).optional(),
  }).describe("The Sidewalk account credentials.").optional(),
  Tags: z.array(TagSchema).describe(
    "A list of key-value pairs that contain metadata for the destination.",
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

/** Swamp extension model for IoTWireless PartnerAccount. Registered at `@swamp/aws/iotwireless/partner-account`. */
export const model = {
  type: "@swamp/aws/iotwireless/partner-account",
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
      description: "IoTWireless PartnerAccount resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a IoTWireless PartnerAccount",
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
          "AWS::IoTWireless::PartnerAccount",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.PartnerAccountId ?? g.PartnerAccountId)?.toString() ??
            "current").replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(
              /\0/g,
              "",
            );
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a IoTWireless PartnerAccount",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless PartnerAccount",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::IoTWireless::PartnerAccount",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.PartnerAccountId ?? context.globalArgs.PartnerAccountId)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a IoTWireless PartnerAccount",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.PartnerAccountId?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.PartnerAccountId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::IoTWireless::PartnerAccount",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::IoTWireless::PartnerAccount",
          identifier,
          currentState,
          desiredState,
          ["PartnerAccountId"],
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
      description: "Delete a IoTWireless PartnerAccount",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the IoTWireless PartnerAccount",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::IoTWireless::PartnerAccount",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.PartnerAccountId?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync IoTWireless PartnerAccount state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.PartnerAccountId?.toString() ?? "current")
          .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const content = await context.dataRepository.getContent(
          context.modelType,
          context.modelId,
          instanceName,
        );
        if (!content) {
          throw new Error("No existing state found - run create or get first");
        }
        const existing = JSON.parse(new TextDecoder().decode(content));
        const identifier = existing.PartnerAccountId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::IoTWireless::PartnerAccount",
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
