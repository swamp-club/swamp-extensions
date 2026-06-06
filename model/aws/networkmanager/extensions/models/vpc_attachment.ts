// Auto-generated extension model for @swamp/aws/networkmanager/vpc-attachment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for NetworkManager VpcAttachment (AWS::NetworkManager::VpcAttachment).
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
  Key: z.string().describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
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
  CoreNetworkId: z.string().describe(
    "The ID of a core network for the VPC attachment.",
  ),
  VpcArn: z.string().describe("The ARN of the VPC."),
  ProposedSegmentChange: z.object({
    Tags: z.array(TagSchema).describe(
      "The key-value tags that changed for the segment.",
    ).optional(),
  }).describe("The attachment to move from one segment to another.").optional(),
  ProposedNetworkFunctionGroupChange: z.object({
    Tags: z.array(TagSchema).describe(
      "The key-value tags that changed for the network function group.",
    ).optional(),
  }).describe(
    "The attachment to move from one network function group to another.",
  ).optional(),
  RoutingPolicyLabel: z.string().describe("Routing policy label").optional(),
  Tags: z.array(TagSchema).describe("Tags for the attachment.").optional(),
  SubnetArns: z.array(z.string()).describe("Subnet Arn list"),
  Options: z.object({
    Ipv6Support: z.boolean().describe(
      "Indicates whether to enable Ipv6 Support for Vpc Attachment. Valid Values: enable | disable",
    ).optional(),
    ApplianceModeSupport: z.boolean().describe(
      "Indicates whether to enable ApplianceModeSupport Support for Vpc Attachment. Valid Values: true | false",
    ).optional(),
    DnsSupport: z.boolean().describe(
      "Indicates whether to enable private DNS Support for Vpc Attachment. Valid Values: true | false",
    ).optional(),
    SecurityGroupReferencingSupport: z.boolean().describe(
      "Indicates whether to enable Security Group Referencing Support for Vpc Attachment. Valid Values: true | false",
    ).optional(),
  }).describe("Vpc options of the attachment.").optional(),
});

const StateSchema = z.object({
  CoreNetworkId: z.string().optional(),
  CoreNetworkArn: z.string().optional(),
  AttachmentId: z.string(),
  OwnerAccountId: z.string().optional(),
  AttachmentType: z.string().optional(),
  State: z.string().optional(),
  EdgeLocation: z.string().optional(),
  VpcArn: z.string().optional(),
  ResourceArn: z.string().optional(),
  AttachmentPolicyRuleNumber: z.number().optional(),
  SegmentName: z.string().optional(),
  ProposedSegmentChange: z.object({
    Tags: z.array(TagSchema),
    AttachmentPolicyRuleNumber: z.number(),
    SegmentName: z.string(),
  }).optional(),
  NetworkFunctionGroupName: z.string().optional(),
  ProposedNetworkFunctionGroupChange: z.object({
    Tags: z.array(TagSchema),
    AttachmentPolicyRuleNumber: z.number(),
    NetworkFunctionGroupName: z.string(),
  }).optional(),
  RoutingPolicyLabel: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  CreatedAt: z.string().optional(),
  UpdatedAt: z.string().optional(),
  SubnetArns: z.array(z.string()).optional(),
  Options: z.object({
    Ipv6Support: z.boolean(),
    ApplianceModeSupport: z.boolean(),
    DnsSupport: z.boolean(),
    SecurityGroupReferencingSupport: z.boolean(),
  }).optional(),
  LastModificationErrors: z.array(z.string()).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  CoreNetworkId: z.string().describe(
    "The ID of a core network for the VPC attachment.",
  ).optional(),
  VpcArn: z.string().describe("The ARN of the VPC.").optional(),
  ProposedSegmentChange: z.object({
    Tags: z.array(TagSchema).describe(
      "The key-value tags that changed for the segment.",
    ).optional(),
  }).describe("The attachment to move from one segment to another.").optional(),
  ProposedNetworkFunctionGroupChange: z.object({
    Tags: z.array(TagSchema).describe(
      "The key-value tags that changed for the network function group.",
    ).optional(),
  }).describe(
    "The attachment to move from one network function group to another.",
  ).optional(),
  RoutingPolicyLabel: z.string().describe("Routing policy label").optional(),
  Tags: z.array(TagSchema).describe("Tags for the attachment.").optional(),
  SubnetArns: z.array(z.string()).describe("Subnet Arn list").optional(),
  Options: z.object({
    Ipv6Support: z.boolean().describe(
      "Indicates whether to enable Ipv6 Support for Vpc Attachment. Valid Values: enable | disable",
    ).optional(),
    ApplianceModeSupport: z.boolean().describe(
      "Indicates whether to enable ApplianceModeSupport Support for Vpc Attachment. Valid Values: true | false",
    ).optional(),
    DnsSupport: z.boolean().describe(
      "Indicates whether to enable private DNS Support for Vpc Attachment. Valid Values: true | false",
    ).optional(),
    SecurityGroupReferencingSupport: z.boolean().describe(
      "Indicates whether to enable Security Group Referencing Support for Vpc Attachment. Valid Values: true | false",
    ).optional(),
  }).describe("Vpc options of the attachment.").optional(),
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

/** Swamp extension model for NetworkManager VpcAttachment. Registered at `@swamp/aws/networkmanager/vpc-attachment`. */
export const model = {
  type: "@swamp/aws/networkmanager/vpc-attachment",
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
      description: "NetworkManager VpcAttachment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a NetworkManager VpcAttachment",
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
          "AWS::NetworkManager::VpcAttachment",
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
      description: "Get a NetworkManager VpcAttachment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkManager VpcAttachment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::NetworkManager::VpcAttachment",
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
      description: "Update a NetworkManager VpcAttachment",
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
        const identifier = existing.AttachmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::NetworkManager::VpcAttachment",
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
          "AWS::NetworkManager::VpcAttachment",
          identifier,
          currentState,
          desiredState,
          ["CoreNetworkId", "VpcArn", "RoutingPolicyLabel"],
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
      description: "Delete a NetworkManager VpcAttachment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the NetworkManager VpcAttachment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::NetworkManager::VpcAttachment",
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
      description: "Sync NetworkManager VpcAttachment state from AWS",
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
        const identifier = existing.AttachmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::NetworkManager::VpcAttachment",
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
