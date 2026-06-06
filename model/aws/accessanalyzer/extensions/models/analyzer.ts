// Auto-generated extension model for @swamp/aws/accessanalyzer/analyzer
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for AccessAnalyzer Analyzer (AWS::AccessAnalyzer::Analyzer).
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

const FilterSchema = z.object({
  Contains: z.array(z.string()).optional(),
  Eq: z.array(z.string()).optional(),
  Exists: z.boolean().optional(),
  Property: z.string(),
  Neq: z.array(z.string()).optional(),
});

const ArchiveRuleSchema = z.object({
  Filter: z.array(FilterSchema),
  RuleName: z.string().describe("The archive rule name"),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(127).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(255).describe(
    "The value for the tag. You can specify a value that is 0 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
});

const AnalysisRuleCriteriaSchema = z.object({
  AccountIds: z.array(z.string()).describe(
    "A list of AWS account IDs to apply to the analysis rule criteria. The accounts cannot include the organization analyzer owner account. Account IDs can only be applied to the analysis rule criteria for organization-level analyzers.",
  ).optional(),
  ResourceTags: z.array(z.array(TagSchema)).describe(
    "An array of key-value pairs to match for your resources. You can use the set of Unicode letters, digits, whitespace, _,., /, =, +, and -. For the tag key, you can specify a value that is 1 to 128 characters in length and cannot be prefixed with aws:. For the tag value, you can specify a value that is 0 to 256 characters in length. If the specified tag value is 0 characters, the rule is applied to all principals with the specified tag key.",
  ).optional(),
});

const UnusedAccessConfigurationSchema = z.object({
  UnusedAccessAge: z.number().int().min(1).max(365).describe(
    "The specified access age in days for which to generate findings for unused access. For example, if you specify 90 days, the analyzer will generate findings for IAM entities within the accounts of the selected organization for any access that hasn't been used in 90 or more days since the analyzer's last scan. You can choose a value between 1 and 365 days.",
  ).optional(),
  AnalysisRule: z.object({
    Exclusions: z.array(AnalysisRuleCriteriaSchema).describe(
      "A list of rules for the analyzer containing criteria to exclude from analysis. Entities that meet the rule criteria will not generate findings.",
    ).optional(),
  }).describe("Contains information about rules for the analyzer.").optional(),
});

const InternalAccessAnalysisRuleCriteriaSchema = z.object({
  AccountIds: z.array(z.string()).describe(
    "A list of AWS account IDs to apply to the internal access analysis rule criteria. Account IDs can only be applied to the analysis rule criteria for organization-level analyzers and cannot include the organization owner account.",
  ).optional(),
  ResourceArns: z.array(z.string()).describe(
    "A list of resource ARNs to apply to the internal access analysis rule criteria. The analyzer will only generate findings for resources that match these ARNs.",
  ).optional(),
  ResourceTypes: z.array(z.string()).describe(
    "A list of resource types to apply to the internal access analysis rule criteria. The analyzer will only generate findings for resources of these types.",
  ).optional(),
});

const InternalAccessConfigurationSchema = z.object({
  InternalAccessAnalysisRule: z.object({
    Inclusions: z.array(InternalAccessAnalysisRuleCriteriaSchema).describe(
      "A list of rules for the internal access analyzer containing criteria to include in analysis. Only resources that meet the rule criteria will generate findings.",
    ).optional(),
  }).describe(
    "Contains information about analysis rules for the internal access analyzer. Analysis rules determine which entities will generate findings based on the criteria you define when you create the rule.",
  ).optional(),
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
  AnalyzerName: z.string().min(1).max(1024).describe("Analyzer name")
    .optional(),
  ArchiveRules: z.array(ArchiveRuleSchema).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  Type: z.string().min(0).max(1024).describe(
    "The type of the analyzer, must be one of ACCOUNT, ORGANIZATION, ACCOUNT_INTERNAL_ACCESS, ORGANIZATION_INTERNAL_ACCESS, ACCOUNT_UNUSED_ACCESS and ORGANIZATION_UNUSED_ACCESS",
  ),
  AnalyzerConfiguration: z.object({
    UnusedAccessConfiguration: UnusedAccessConfigurationSchema.describe(
      "The Configuration for Unused Access Analyzer",
    ).optional(),
    InternalAccessConfiguration: InternalAccessConfigurationSchema.describe(
      "Specifies the configuration of an internal access analyzer for an AWS organization or account. This configuration determines how the analyzer evaluates internal access within your AWS environment.",
    ).optional(),
  }).describe("The configuration for the analyzer").optional(),
});

const StateSchema = z.object({
  AnalyzerName: z.string().optional(),
  ArchiveRules: z.array(ArchiveRuleSchema).optional(),
  Arn: z.string(),
  Tags: z.array(TagSchema).optional(),
  Type: z.string().optional(),
  AnalyzerConfiguration: z.object({
    UnusedAccessConfiguration: UnusedAccessConfigurationSchema,
    InternalAccessConfiguration: InternalAccessConfigurationSchema,
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AnalyzerName: z.string().min(1).max(1024).describe("Analyzer name")
    .optional(),
  ArchiveRules: z.array(ArchiveRuleSchema).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  Type: z.string().min(0).max(1024).describe(
    "The type of the analyzer, must be one of ACCOUNT, ORGANIZATION, ACCOUNT_INTERNAL_ACCESS, ORGANIZATION_INTERNAL_ACCESS, ACCOUNT_UNUSED_ACCESS and ORGANIZATION_UNUSED_ACCESS",
  ).optional(),
  AnalyzerConfiguration: z.object({
    UnusedAccessConfiguration: UnusedAccessConfigurationSchema.describe(
      "The Configuration for Unused Access Analyzer",
    ).optional(),
    InternalAccessConfiguration: InternalAccessConfigurationSchema.describe(
      "Specifies the configuration of an internal access analyzer for an AWS organization or account. This configuration determines how the analyzer evaluates internal access within your AWS environment.",
    ).optional(),
  }).describe("The configuration for the analyzer").optional(),
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

/** Swamp extension model for AccessAnalyzer Analyzer. Registered at `@swamp/aws/accessanalyzer/analyzer`. */
export const model = {
  type: "@swamp/aws/accessanalyzer/analyzer",
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
      description: "AccessAnalyzer Analyzer resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a AccessAnalyzer Analyzer",
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
          "AWS::AccessAnalyzer::Analyzer",
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
      description: "Get a AccessAnalyzer Analyzer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AccessAnalyzer Analyzer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::AccessAnalyzer::Analyzer",
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
      description: "Update a AccessAnalyzer Analyzer",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::AccessAnalyzer::Analyzer",
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
          "AWS::AccessAnalyzer::Analyzer",
          identifier,
          currentState,
          desiredState,
          ["AnalyzerName", "Type"],
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
      description: "Delete a AccessAnalyzer Analyzer",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the AccessAnalyzer Analyzer",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::AccessAnalyzer::Analyzer",
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
      description: "Sync AccessAnalyzer Analyzer state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::AccessAnalyzer::Analyzer",
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
