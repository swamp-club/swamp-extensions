// Auto-generated extension model for @swamp/aws/customerprofiles/domain
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for CustomerProfiles Domain (AWS::CustomerProfiles::Domain).
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

const ConflictResolutionSchema = z.object({
  ConflictResolvingModel: z.enum(["RECENCY", "SOURCE"]).describe(
    "How the auto-merging process should resolve conflicts between different profiles.",
  ),
  SourceName: z.string().min(1).max(255).describe(
    "The ObjectType name that is used to resolve profile merging conflicts when choosing SOURCE as the ConflictResolvingModel.",
  ).optional(),
});

const ConsolidationSchema = z.object({
  MatchingAttributesList: z.array(z.array(z.string().min(1).max(255))).describe(
    "A list of matching criteria.",
  ),
});

const AutoMergingSchema = z.object({
  Enabled: z.boolean().describe(
    "The flag that enables the auto-merging of duplicate profiles.",
  ),
  ConflictResolution: ConflictResolutionSchema.describe(
    "How the auto-merging process should resolve conflicts between different profiles. For example, if Profile A and Profile B have the same FirstName and LastName (and that is the matching criteria), which EmailAddress should be used?",
  ).optional(),
  Consolidation: ConsolidationSchema.describe(
    "A list of matching attributes that represent matching criteria. If two profiles meet at least one of the requirements in the matching attributes list, they will be merged.",
  ).optional(),
  MinAllowedConfidenceScoreForMerging: z.number().min(0).max(1).describe(
    "A number between 0 and 1 that represents the minimum confidence score required for profiles within a matching group to be merged during the auto-merge process. A higher score means higher similarity required to merge profiles.",
  ).optional(),
});

const S3ExportingConfigSchema = z.object({
  S3BucketName: z.string().min(3).max(63).regex(new RegExp("^[a-z0-9.-]+$"))
    .describe(
      "The name of the S3 bucket where Identity Resolution Jobs write result files.",
    ),
  S3KeyName: z.string().min(1).max(800).regex(new RegExp(".*")).describe(
    "The S3 key name of the location where Identity Resolution Jobs write result files.",
  ).optional(),
});

const ExportingConfigSchema = z.object({
  S3Exporting: S3ExportingConfigSchema.describe(
    "The S3 location where Identity Resolution Jobs write result files.",
  ).optional(),
});

const JobScheduleSchema = z.object({
  DayOfTheWeek: z.enum([
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ]).describe(
    "The day when the Identity Resolution Job should run every week.",
  ),
  Time: z.string().min(3).max(5).regex(
    new RegExp("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"),
  ).describe(
    "The time when the Identity Resolution Job should run every week.",
  ),
});

const AttributeTypesSelectorSchema = z.object({
  AttributeMatchingModel: z.enum(["ONE_TO_ONE", "MANY_TO_MANY"]).describe(
    "Configures the AttributeMatchingModel, you can either choose ONE_TO_ONE or MANY_TO_MANY.",
  ),
  Address: z.array(z.string().min(1).max(255)).describe(
    "The Address type. You can choose from Address, BusinessAddress, MaillingAddress, and ShippingAddress. You only can use the Address type in the MatchingRule. For example, if you want to match profile based on BusinessAddress.City or MaillingAddress.City, you need to choose the BusinessAddress and the MaillingAddress to represent the Address type and specify the Address.City on the matching rule.",
  ).optional(),
  EmailAddress: z.array(z.string().min(1).max(255)).describe(
    "The Email type. You can choose from EmailAddress, BusinessEmailAddress and PersonalEmailAddress. You only can use the EmailAddress type in the MatchingRule. For example, if you want to match profile based on PersonalEmailAddress or BusinessEmailAddress, you need to choose the PersonalEmailAddress and the BusinessEmailAddress to represent the EmailAddress type and only specify the EmailAddress on the matching rule.",
  ).optional(),
  PhoneNumber: z.array(z.string().min(1).max(255)).describe(
    "The PhoneNumber type. You can choose from PhoneNumber, HomePhoneNumber, and MobilePhoneNumber. You only can use the PhoneNumber type in the MatchingRule. For example, if you want to match a profile based on Phone or HomePhone, you need to choose the Phone and the HomePhone to represent the PhoneNumber type and only specify the PhoneNumber on the matching rule.",
  ).optional(),
});

const MatchingRuleSchema = z.object({
  Rule: z.array(z.string().min(1).max(255)).describe(
    "A single rule level of the MatchRules. Configures how the rule-based matching process should match profiles.",
  ),
});

const ReadinessSchema = z.object({
  ProgressPercentage: z.number().int().min(0).max(100).describe(
    "The percentage of progress completed.",
  ).optional(),
  Message: z.string().describe("A message describing the current progress.")
    .optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(?!aws:)[a-zA-Z+-=._:/]+$"),
  ),
  Value: z.string().min(0).max(256),
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
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain."),
  DeadLetterQueueUrl: z.string().min(0).max(255).describe(
    "The URL of the SQS dead letter queue",
  ).optional(),
  DefaultEncryptionKey: z.string().min(0).max(255).describe(
    "The default encryption key",
  ).optional(),
  DefaultExpirationDays: z.number().int().min(1).max(1098).describe(
    "The default number of days until the data within the domain expires.",
  ),
  Matching: z.object({
    Enabled: z.boolean().describe(
      "The flag that enables the matching process of duplicate profiles.",
    ),
    AutoMerging: AutoMergingSchema.describe(
      "Configuration information about the auto-merging process.",
    ).optional(),
    ExportingConfig: ExportingConfigSchema.describe(
      "Configuration information for exporting Identity Resolution results, for example, to an S3 bucket.",
    ).optional(),
    JobSchedule: JobScheduleSchema.describe(
      "The day and time when do you want to start the Identity Resolution Job every week.",
    ).optional(),
  }).describe(
    "The process of matching duplicate profiles. If Matching = true, Amazon Connect Customer Profiles starts a weekly batch process called Identity Resolution Job. If you do not specify a date and time for Identity Resolution Job to run, by default it runs every Saturday at 12AM UTC to detect duplicate profiles in your domains. After the Identity Resolution Job completes, use the GetMatches API to return and review the results. Or, if you have configured ExportingConfig in the MatchingRequest, you can download the results from S3.",
  ).optional(),
  RuleBasedMatching: z.object({
    Enabled: z.boolean().describe(
      "The flag that enables the rule-based matching process of duplicate profiles.",
    ),
    AttributeTypesSelector: AttributeTypesSelectorSchema.describe(
      "Configures information about the AttributeTypesSelector where the rule-based identity resolution uses to match profiles.",
    ).optional(),
    ConflictResolution: ConflictResolutionSchema.describe(
      "How the auto-merging process should resolve conflicts between different profiles. For example, if Profile A and Profile B have the same FirstName and LastName (and that is the matching criteria), which EmailAddress should be used?",
    ).optional(),
    ExportingConfig: ExportingConfigSchema.describe(
      "Configuration information for exporting Identity Resolution results, for example, to an S3 bucket.",
    ).optional(),
    MatchingRules: z.array(MatchingRuleSchema).describe(
      "Configures how the rule-based matching process should match profiles. You can have up to 15 MatchingRule in the MatchingRules.",
    ).optional(),
    MaxAllowedRuleLevelForMatching: z.number().int().min(1).max(15).describe(
      "Indicates the maximum allowed rule level for matching.",
    ).optional(),
    MaxAllowedRuleLevelForMerging: z.number().int().min(1).max(15).describe(
      "Indicates the maximum allowed rule level for merging.",
    ).optional(),
  }).describe(
    "The process of matching duplicate profiles using the Rule-Based matching. If RuleBasedMatching = true, Amazon Connect Customer Profiles will start to match and merge your profiles according to your configuration in the RuleBasedMatchingRequest. You can use the ListRuleBasedMatches and GetSimilarProfiles API to return and review the results. Also, if you have configured ExportingConfig in the RuleBasedMatchingRequest, you can download the results from S3.",
  ).optional(),
  DataStore: z.object({
    Enabled: z.boolean().describe("Whether the data store is enabled.")
      .optional(),
    Readiness: ReadinessSchema.describe(
      "Progress information for data store setup.",
    ).optional(),
  }).describe("Configuration and status of the data store for the domain.")
    .optional(),
  Stats: z.object({
    MeteringProfileCount: z.number().describe(
      "The number of profiles that you are currently paying for in the domain. If you have more than 100 objects associated with a single profile, that profile counts as two profiles. If you have more than 200 objects, that profile counts as three, and so on.",
    ).optional(),
    ObjectCount: z.number().describe("The total number of objects in domain.")
      .optional(),
    ProfileCount: z.number().describe(
      "The total number of profiles currently in the domain.",
    ).optional(),
    TotalSize: z.number().describe(
      "The total size, in bytes, of all objects in the domain.",
    ).optional(),
  }).describe("Usage-specific statistics about the domain.").optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the domain",
  ).optional(),
});

const StateSchema = z.object({
  DomainName: z.string(),
  DeadLetterQueueUrl: z.string().optional(),
  DefaultEncryptionKey: z.string().optional(),
  DefaultExpirationDays: z.number().optional(),
  Matching: z.object({
    Enabled: z.boolean(),
    AutoMerging: AutoMergingSchema,
    ExportingConfig: ExportingConfigSchema,
    JobSchedule: JobScheduleSchema,
  }).optional(),
  RuleBasedMatching: z.object({
    Enabled: z.boolean(),
    AttributeTypesSelector: AttributeTypesSelectorSchema,
    ConflictResolution: ConflictResolutionSchema,
    ExportingConfig: ExportingConfigSchema,
    MatchingRules: z.array(MatchingRuleSchema),
    MaxAllowedRuleLevelForMatching: z.number(),
    MaxAllowedRuleLevelForMerging: z.number(),
    Status: z.string(),
  }).optional(),
  DataStore: z.object({
    Enabled: z.boolean(),
    Readiness: ReadinessSchema,
  }).optional(),
  Stats: z.object({
    MeteringProfileCount: z.number(),
    ObjectCount: z.number(),
    ProfileCount: z.number(),
    TotalSize: z.number(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  CreatedAt: z.string().optional(),
  LastUpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DomainName: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9_-]+$"))
    .describe("The unique name of the domain.").optional(),
  DeadLetterQueueUrl: z.string().min(0).max(255).describe(
    "The URL of the SQS dead letter queue",
  ).optional(),
  DefaultEncryptionKey: z.string().min(0).max(255).describe(
    "The default encryption key",
  ).optional(),
  DefaultExpirationDays: z.number().int().min(1).max(1098).describe(
    "The default number of days until the data within the domain expires.",
  ).optional(),
  Matching: z.object({
    Enabled: z.boolean().describe(
      "The flag that enables the matching process of duplicate profiles.",
    ).optional(),
    AutoMerging: AutoMergingSchema.describe(
      "Configuration information about the auto-merging process.",
    ).optional(),
    ExportingConfig: ExportingConfigSchema.describe(
      "Configuration information for exporting Identity Resolution results, for example, to an S3 bucket.",
    ).optional(),
    JobSchedule: JobScheduleSchema.describe(
      "The day and time when do you want to start the Identity Resolution Job every week.",
    ).optional(),
  }).describe(
    "The process of matching duplicate profiles. If Matching = true, Amazon Connect Customer Profiles starts a weekly batch process called Identity Resolution Job. If you do not specify a date and time for Identity Resolution Job to run, by default it runs every Saturday at 12AM UTC to detect duplicate profiles in your domains. After the Identity Resolution Job completes, use the GetMatches API to return and review the results. Or, if you have configured ExportingConfig in the MatchingRequest, you can download the results from S3.",
  ).optional(),
  RuleBasedMatching: z.object({
    Enabled: z.boolean().describe(
      "The flag that enables the rule-based matching process of duplicate profiles.",
    ).optional(),
    AttributeTypesSelector: AttributeTypesSelectorSchema.describe(
      "Configures information about the AttributeTypesSelector where the rule-based identity resolution uses to match profiles.",
    ).optional(),
    ConflictResolution: ConflictResolutionSchema.describe(
      "How the auto-merging process should resolve conflicts between different profiles. For example, if Profile A and Profile B have the same FirstName and LastName (and that is the matching criteria), which EmailAddress should be used?",
    ).optional(),
    ExportingConfig: ExportingConfigSchema.describe(
      "Configuration information for exporting Identity Resolution results, for example, to an S3 bucket.",
    ).optional(),
    MatchingRules: z.array(MatchingRuleSchema).describe(
      "Configures how the rule-based matching process should match profiles. You can have up to 15 MatchingRule in the MatchingRules.",
    ).optional(),
    MaxAllowedRuleLevelForMatching: z.number().int().min(1).max(15).describe(
      "Indicates the maximum allowed rule level for matching.",
    ).optional(),
    MaxAllowedRuleLevelForMerging: z.number().int().min(1).max(15).describe(
      "Indicates the maximum allowed rule level for merging.",
    ).optional(),
  }).describe(
    "The process of matching duplicate profiles using the Rule-Based matching. If RuleBasedMatching = true, Amazon Connect Customer Profiles will start to match and merge your profiles according to your configuration in the RuleBasedMatchingRequest. You can use the ListRuleBasedMatches and GetSimilarProfiles API to return and review the results. Also, if you have configured ExportingConfig in the RuleBasedMatchingRequest, you can download the results from S3.",
  ).optional(),
  DataStore: z.object({
    Enabled: z.boolean().describe("Whether the data store is enabled.")
      .optional(),
    Readiness: ReadinessSchema.describe(
      "Progress information for data store setup.",
    ).optional(),
  }).describe("Configuration and status of the data store for the domain.")
    .optional(),
  Stats: z.object({
    MeteringProfileCount: z.number().describe(
      "The number of profiles that you are currently paying for in the domain. If you have more than 100 objects associated with a single profile, that profile counts as two profiles. If you have more than 200 objects, that profile counts as three, and so on.",
    ).optional(),
    ObjectCount: z.number().describe("The total number of objects in domain.")
      .optional(),
    ProfileCount: z.number().describe(
      "The total number of profiles currently in the domain.",
    ).optional(),
    TotalSize: z.number().describe(
      "The total size, in bytes, of all objects in the domain.",
    ).optional(),
  }).describe("Usage-specific statistics about the domain.").optional(),
  Tags: z.array(TagSchema).describe(
    "The tags (keys and values) associated with the domain",
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

/** Swamp extension model for CustomerProfiles Domain. Registered at `@swamp/aws/customerprofiles/domain`. */
export const model = {
  type: "@swamp/aws/customerprofiles/domain",
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
      description: "CustomerProfiles Domain resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a CustomerProfiles Domain",
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
          "AWS::CustomerProfiles::Domain",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DomainName ?? g.DomainName)?.toString() ?? "current")
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
      description: "Get a CustomerProfiles Domain",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles Domain",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::CustomerProfiles::Domain",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.DomainName ?? context.globalArgs.DomainName)?.toString() ??
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
      description: "Update a CustomerProfiles Domain",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DomainName?.toString() ?? "current").replace(
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
        const identifier = existing.DomainName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::CustomerProfiles::Domain",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::CustomerProfiles::Domain",
          identifier,
          currentState,
          desiredState,
          ["DomainName"],
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
      description: "Delete a CustomerProfiles Domain",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the CustomerProfiles Domain",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::CustomerProfiles::Domain",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.DomainName?.toString() ?? args.identifier)
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
      description: "Sync CustomerProfiles Domain state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.DomainName?.toString() ?? "current").replace(
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
        const identifier = existing.DomainName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::CustomerProfiles::Domain",
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
