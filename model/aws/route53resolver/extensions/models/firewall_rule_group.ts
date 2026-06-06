// Auto-generated extension model for @swamp/aws/route53resolver/firewall-rule-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Route53Resolver FirewallRuleGroup (AWS::Route53Resolver::FirewallRuleGroup).
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

const FirewallAdvancedContentCategoryConfigSchema = z.object({
  Category: z.string().min(1).max(128).describe("The content category value."),
});

const FirewallAdvancedThreatCategoryConfigSchema = z.object({
  Category: z.string().min(1).max(128).describe("The threat category value."),
});

const FirewallRuleTypeSchema = z.object({
  FirewallAdvancedContentCategory: FirewallAdvancedContentCategoryConfigSchema
    .describe("Configuration for an advanced content category rule type.")
    .optional(),
  FirewallAdvancedThreatCategory: FirewallAdvancedThreatCategoryConfigSchema
    .describe("Configuration for an advanced threat category rule type.")
    .optional(),
});

const FirewallRuleSchema = z.object({
  FirewallDomainListId: z.string().min(1).max(64).describe("ResourceId")
    .optional(),
  FirewallThreatProtectionId: z.string().min(1).max(64).describe("ResourceId")
    .optional(),
  Priority: z.number().int().describe("Rule Priority"),
  Action: z.enum(["ALLOW", "BLOCK", "ALERT"]).describe("Rule Action"),
  BlockResponse: z.enum(["NODATA", "NXDOMAIN", "OVERRIDE"]).describe(
    "BlockResponse",
  ).optional(),
  BlockOverrideDomain: z.string().min(1).max(255).describe(
    "BlockOverrideDomain",
  ).optional(),
  BlockOverrideDnsType: z.enum(["CNAME"]).describe("BlockOverrideDnsType")
    .optional(),
  BlockOverrideTtl: z.number().int().min(0).max(604800).describe(
    "BlockOverrideTtl",
  ).optional(),
  Qtype: z.string().min(1).max(16).describe("Qtype").optional(),
  ConfidenceThreshold: z.enum(["LOW", "MEDIUM", "HIGH"]).describe(
    "ConfidenceThreshold",
  ).optional(),
  DnsThreatProtection: z.enum(["DGA", "DNS_TUNNELING", "DICTIONARY_DGA"])
    .describe("DnsThreatProtection").optional(),
  FirewallDomainRedirectionAction: z.enum([
    "INSPECT_REDIRECTION_DOMAIN",
    "TRUST_REDIRECTION_DOMAIN",
  ]).describe("FirewallDomainRedirectionAction").optional(),
  FirewallRuleType: FirewallRuleTypeSchema.describe(
    "Advanced firewall rule type. Mutually exclusive with FirewallDomainListId and DnsThreatProtection/ConfidenceThreshold.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(127).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(255).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  Name: z.string().min(1).max(64).regex(
    new RegExp("(?!^[0-9]+$)([a-zA-Z0-9\\-_' ']+)"),
  ).describe("FirewallRuleGroupName").optional(),
  FirewallRules: z.array(FirewallRuleSchema).describe("FirewallRules")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags").optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Arn: z.string().optional(),
  Name: z.string().optional(),
  RuleCount: z.number().optional(),
  Status: z.string().optional(),
  StatusMessage: z.string().optional(),
  OwnerId: z.string().optional(),
  ShareStatus: z.string().optional(),
  CreatorRequestId: z.string().optional(),
  CreationTime: z.string().optional(),
  ModificationTime: z.string().optional(),
  FirewallRules: z.array(FirewallRuleSchema).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(64).regex(
    new RegExp("(?!^[0-9]+$)([a-zA-Z0-9\\-_' ']+)"),
  ).describe("FirewallRuleGroupName").optional(),
  FirewallRules: z.array(FirewallRuleSchema).describe("FirewallRules")
    .optional(),
  Tags: z.array(TagSchema).describe("Tags").optional(),
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

/** Swamp extension model for Route53Resolver FirewallRuleGroup. Registered at `@swamp/aws/route53resolver/firewall-rule-group`. */
export const model = {
  type: "@swamp/aws/route53resolver/firewall-rule-group",
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
      toVersion: "2026.05.12.1",
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
      description: "Route53Resolver FirewallRuleGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Route53Resolver FirewallRuleGroup",
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
          "AWS::Route53Resolver::FirewallRuleGroup",
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
      description: "Get a Route53Resolver FirewallRuleGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53Resolver FirewallRuleGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Route53Resolver::FirewallRuleGroup",
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
      description: "Update a Route53Resolver FirewallRuleGroup",
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
          "AWS::Route53Resolver::FirewallRuleGroup",
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
          "AWS::Route53Resolver::FirewallRuleGroup",
          identifier,
          currentState,
          desiredState,
          ["Name"],
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
      description: "Delete a Route53Resolver FirewallRuleGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Route53Resolver FirewallRuleGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Route53Resolver::FirewallRuleGroup",
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
      description: "Sync Route53Resolver FirewallRuleGroup state from AWS",
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
            "AWS::Route53Resolver::FirewallRuleGroup",
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
