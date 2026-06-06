// Auto-generated extension model for @swamp/aws/logs/delivery-destination
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Logs DeliveryDestination (AWS::Logs::DeliveryDestination).
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
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
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
  Name: z.string().min(1).max(60).regex(new RegExp("[\\w-]*$")).describe(
    "The name of this delivery destination.",
  ),
  DestinationResourceArn: z.string().min(16).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*\\*?"),
  ).describe(
    "The ARN of the Amazon Web Services destination that this delivery destination represents. That Amazon Web Services destination can be a log group in CloudWatch Logs, an Amazon S3 bucket, or a delivery stream in Firehose.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that have been assigned to this delivery destination.",
  ).optional(),
  DeliveryDestinationType: z.string().min(1).max(12).regex(
    new RegExp("^[0-9A-Za-z]+$"),
  ).describe(
    "Displays whether this delivery destination is CloudWatch Logs, Amazon S3, Kinesis Data Firehose, or XRay.",
  ).optional(),
  DeliveryDestinationPolicy: z.object({
    DeliveryDestinationName: z.string().min(1).max(60).describe(
      "The name of the delivery destination to assign this policy to",
    ).optional(),
    DeliveryDestinationPolicy: z.record(z.string(), z.unknown()).describe(
      "The contents of the policy attached to the delivery destination",
    ).optional(),
  }).describe(
    "IAM policy that grants permissions to CloudWatch Logs to deliver logs cross-account to a specified destination in this account. The policy must be in JSON string format. Length Constraints: Maximum length of 51200",
  ).optional(),
  OutputFormat: z.string().min(1).max(12).regex(new RegExp("^[0-9A-Za-z]+$"))
    .describe(
      "The format of the logs that are sent to this delivery destination.",
    ).optional(),
});

const StateSchema = z.object({
  Name: z.string(),
  Arn: z.string().optional(),
  DestinationResourceArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  DeliveryDestinationType: z.string().optional(),
  DeliveryDestinationPolicy: z.object({
    DeliveryDestinationName: z.string(),
    DeliveryDestinationPolicy: z.record(z.string(), z.unknown()),
  }).optional(),
  OutputFormat: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(60).regex(new RegExp("[\\w-]*$")).describe(
    "The name of this delivery destination.",
  ).optional(),
  DestinationResourceArn: z.string().min(16).max(2048).regex(
    new RegExp("[\\w#+=/:,.@-]*\\*?"),
  ).describe(
    "The ARN of the Amazon Web Services destination that this delivery destination represents. That Amazon Web Services destination can be a log group in CloudWatch Logs, an Amazon S3 bucket, or a delivery stream in Firehose.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags that have been assigned to this delivery destination.",
  ).optional(),
  DeliveryDestinationType: z.string().min(1).max(12).regex(
    new RegExp("^[0-9A-Za-z]+$"),
  ).describe(
    "Displays whether this delivery destination is CloudWatch Logs, Amazon S3, Kinesis Data Firehose, or XRay.",
  ).optional(),
  DeliveryDestinationPolicy: z.object({
    DeliveryDestinationName: z.string().min(1).max(60).describe(
      "The name of the delivery destination to assign this policy to",
    ).optional(),
    DeliveryDestinationPolicy: z.record(z.string(), z.unknown()).describe(
      "The contents of the policy attached to the delivery destination",
    ).optional(),
  }).describe(
    "IAM policy that grants permissions to CloudWatch Logs to deliver logs cross-account to a specified destination in this account. The policy must be in JSON string format. Length Constraints: Maximum length of 51200",
  ).optional(),
  OutputFormat: z.string().min(1).max(12).regex(new RegExp("^[0-9A-Za-z]+$"))
    .describe(
      "The format of the logs that are sent to this delivery destination.",
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

/** Swamp extension model for Logs DeliveryDestination. Registered at `@swamp/aws/logs/delivery-destination`. */
export const model = {
  type: "@swamp/aws/logs/delivery-destination",
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
      toVersion: "2026.05.27.1",
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
      description: "Logs DeliveryDestination resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Logs DeliveryDestination",
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
          "AWS::Logs::DeliveryDestination",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName = ((result.Name ?? g.Name)?.toString() ?? "current")
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
      description: "Get a Logs DeliveryDestination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs DeliveryDestination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Logs::DeliveryDestination",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.Name ?? context.globalArgs.Name)?.toString() ??
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
      description: "Update a Logs DeliveryDestination",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Logs::DeliveryDestination",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Logs::DeliveryDestination",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "OutputFormat",
            "DestinationResourceArn",
            "DeliveryDestinationType",
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
      description: "Delete a Logs DeliveryDestination",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Logs DeliveryDestination",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Logs::DeliveryDestination",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.Name?.toString() ?? args.identifier).replace(
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
      description: "Sync Logs DeliveryDestination state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.Name?.toString() ?? "current").replace(
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
        const identifier = existing.Name?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Logs::DeliveryDestination",
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
