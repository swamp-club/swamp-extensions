// Auto-generated extension model for @swamp/aws/s3/storage-lens
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for S3 StorageLens (AWS::S3::StorageLens).
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

const AdvancedDataProtectionMetricsSchema = z.object({
  IsEnabled: z.boolean().describe(
    "Specifies whether advanced data protection metrics are enabled or disabled.",
  ).optional(),
});

const StorageLensGroupSelectionCriteriaSchema = z.object({
  Exclude: z.array(z.string()).optional(),
  Include: z.array(z.string()).optional(),
});

const StorageLensGroupLevelSchema = z.object({
  StorageLensGroupSelectionCriteria: StorageLensGroupSelectionCriteriaSchema
    .describe("Selection criteria for Storage Lens Group level metrics")
    .optional(),
});

const ActivityMetricsSchema = z.object({
  IsEnabled: z.boolean().describe(
    "Specifies whether activity metrics are enabled or disabled.",
  ).optional(),
});

const AdvancedPerformanceMetricsSchema = z.object({
  IsEnabled: z.boolean().describe(
    "Specifies whether the Advanced Performance Metrics is enabled or disabled.",
  ).optional(),
});

const SelectionCriteriaSchema = z.object({
  Delimiter: z.string().describe(
    "Delimiter to divide S3 key into hierarchy of prefixes.",
  ).optional(),
  MaxDepth: z.number().int().describe(
    "Max depth of prefixes of S3 key that Amazon S3 Storage Lens will analyze.",
  ).optional(),
  MinStorageBytesPercentage: z.number().describe(
    "The minimum storage bytes threshold for the prefixes to be included in the analysis.",
  ).optional(),
});

const PrefixLevelStorageMetricsSchema = z.object({
  IsEnabled: z.boolean().describe(
    "Specifies whether prefix-level storage metrics are enabled or disabled.",
  ).optional(),
  SelectionCriteria: SelectionCriteriaSchema.describe(
    "Selection criteria for prefix-level metrics.",
  ).optional(),
});

const PrefixLevelSchema = z.object({
  StorageMetrics: PrefixLevelStorageMetricsSchema,
});

const AdvancedCostOptimizationMetricsSchema = z.object({
  IsEnabled: z.boolean().describe(
    "Specifies whether advanced cost optimization metrics are enabled or disabled.",
  ).optional(),
});

const DetailedStatusCodesMetricsSchema = z.object({
  IsEnabled: z.boolean().describe(
    "Specifies whether detailed status codes metrics are enabled or disabled.",
  ).optional(),
});

const BucketLevelSchema = z.object({
  AdvancedDataProtectionMetrics: AdvancedDataProtectionMetricsSchema.describe(
    "Enables advanced data protection metrics.",
  ).optional(),
  PrefixLevel: PrefixLevelSchema.describe(
    "Prefix-level metrics configurations.",
  ).optional(),
  ActivityMetrics: ActivityMetricsSchema.describe("Enables activity metrics.")
    .optional(),
  AdvancedPerformanceMetrics: AdvancedPerformanceMetricsSchema.describe(
    "Advanced Performance Metrics.",
  ).optional(),
  AdvancedCostOptimizationMetrics: AdvancedCostOptimizationMetricsSchema
    .describe("Enables advanced cost optimization metrics.").optional(),
  DetailedStatusCodesMetrics: DetailedStatusCodesMetricsSchema.describe(
    "Enables detailed status codes metrics.",
  ).optional(),
});

const AccountLevelSchema = z.object({
  AdvancedDataProtectionMetrics: AdvancedDataProtectionMetricsSchema.describe(
    "Enables advanced data protection metrics.",
  ).optional(),
  StorageLensGroupLevel: StorageLensGroupLevelSchema.describe(
    "Specifies the details of Amazon S3 Storage Lens Group configuration.",
  ).optional(),
  ActivityMetrics: ActivityMetricsSchema.describe("Enables activity metrics.")
    .optional(),
  AdvancedPerformanceMetrics: AdvancedPerformanceMetricsSchema.describe(
    "Advanced Performance Metrics.",
  ).optional(),
  BucketLevel: BucketLevelSchema.describe(
    "Bucket-level metrics configurations.",
  ),
  AdvancedCostOptimizationMetrics: AdvancedCostOptimizationMetricsSchema
    .describe("Enables advanced cost optimization metrics.").optional(),
  DetailedStatusCodesMetrics: DetailedStatusCodesMetricsSchema.describe(
    "Enables detailed status codes metrics.",
  ).optional(),
});

const BucketsAndRegionsSchema = z.object({
  Regions: z.array(z.string()).optional(),
  Buckets: z.array(z.string()).optional(),
});

const AwsOrgSchema = z.object({
  Arn: z.string().describe(
    "The Amazon Resource Name (ARN) of the specified resource.",
  ),
});

const StorageLensTableDestinationSchema = z.object({
  IsEnabled: z.boolean().describe(
    "Specifies whether the export to S3 Tables is enabled or disabled.",
  ),
  Encryption: z.record(z.string(), z.unknown()).describe(
    "Configures the server-side encryption for Amazon S3 Storage Lens report files with either S3-managed keys (SSE-S3) or KMS-managed keys (SSE-KMS).",
  ).optional(),
});

const S3BucketDestinationSchema = z.object({
  OutputSchemaVersion: z.enum(["V_1"]).describe(
    "The version of the output schema to use when exporting Amazon S3 Storage Lens metrics.",
  ),
  Format: z.enum(["CSV", "Parquet"]).describe(
    "Specifies the file format to use when exporting Amazon S3 Storage Lens metrics export.",
  ),
  AccountId: z.string().describe(
    "The AWS account ID that owns the destination S3 bucket.",
  ),
  Prefix: z.string().describe(
    "The prefix to use for Amazon S3 Storage Lens export.",
  ).optional(),
  Encryption: z.record(z.string(), z.unknown()).describe(
    "Configures the server-side encryption for Amazon S3 Storage Lens report files with either S3-managed keys (SSE-S3) or KMS-managed keys (SSE-KMS).",
  ).optional(),
  Arn: z.string().describe(
    "The ARN of the bucket to which Amazon S3 Storage Lens exports will be placed.",
  ),
});

const CloudWatchMetricsSchema = z.object({
  IsEnabled: z.boolean().describe(
    "Specifies whether CloudWatch metrics are enabled or disabled.",
  ),
});

const DataExportSchema = z.object({
  StorageLensTableDestination: StorageLensTableDestinationSchema.describe(
    "S3 Tables destination settings for the Amazon S3 Storage Lens metrics export.",
  ).optional(),
  S3BucketDestination: S3BucketDestinationSchema.describe(
    "S3 bucket destination settings for the Amazon S3 Storage Lens metrics export.",
  ).optional(),
  CloudWatchMetrics: CloudWatchMetricsSchema.describe(
    "CloudWatch metrics settings for the Amazon S3 Storage Lens metrics export.",
  ).optional(),
});

const StorageLensExpandedPrefixesDataExportSchema = z.object({
  StorageLensTableDestination: StorageLensTableDestinationSchema.describe(
    "S3 Tables destination settings for the Amazon S3 Storage Lens metrics export.",
  ).optional(),
  S3BucketDestination: S3BucketDestinationSchema.describe(
    "S3 bucket destination settings for the Amazon S3 Storage Lens metrics export.",
  ).optional(),
});

const TagSchema = z.object({
  Value: z.string().min(1).max(255).regex(
    new RegExp("^(?!aws:.*)[a-zA-Z0-9\\s\\_\\.\\/\\=\\+\\-\\@\\:]+$"),
  ),
  Key: z.string().min(1).max(127).regex(
    new RegExp("^(?!aws:.*)[a-zA-Z0-9\\s\\_\\.\\/\\=\\+\\-\\@\\:]+$"),
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  StorageLensConfiguration: z.object({
    AccountLevel: AccountLevelSchema.describe(
      "Account-level metrics configurations.",
    ),
    Exclude: BucketsAndRegionsSchema.describe(
      "S3 buckets and Regions to include/exclude in the Amazon S3 Storage Lens configuration.",
    ).optional(),
    IsEnabled: z.boolean().describe(
      "Specifies whether the Amazon S3 Storage Lens configuration is enabled or disabled.",
    ),
    Include: BucketsAndRegionsSchema.describe(
      "S3 buckets and Regions to include/exclude in the Amazon S3 Storage Lens configuration.",
    ).optional(),
    PrefixDelimiter: z.string().describe(
      "The delimiter to divide S3 key into hierarchy of prefixes.",
    ).optional(),
    AwsOrg: AwsOrgSchema.describe(
      "The AWS Organizations ARN to use in the Amazon S3 Storage Lens configuration.",
    ).optional(),
    Id: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9\\-_.]+$"))
      .describe(
        "The ID that identifies the Amazon S3 Storage Lens configuration.",
      ),
    DataExport: DataExportSchema.describe(
      "Specifies how Amazon S3 Storage Lens metrics should be exported.",
    ).optional(),
    ExpandedPrefixesDataExport: StorageLensExpandedPrefixesDataExportSchema
      .describe("Expanded Prefixes Data Export.").optional(),
  }).describe("Specifies the details of Amazon S3 Storage Lens configuration."),
  Tags: z.array(TagSchema).describe(
    "A set of tags (key-value pairs) for this Amazon S3 Storage Lens configuration.",
  ).optional(),
});

const StateSchema = z.object({
  StorageLensConfiguration: z.object({
    AccountLevel: AccountLevelSchema,
    Exclude: BucketsAndRegionsSchema,
    IsEnabled: z.boolean(),
    Include: BucketsAndRegionsSchema,
    PrefixDelimiter: z.string(),
    AwsOrg: AwsOrgSchema,
    Id: z.string(),
    StorageLensArn: z.string(),
    DataExport: DataExportSchema,
    ExpandedPrefixesDataExport: StorageLensExpandedPrefixesDataExportSchema,
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  StorageLensConfiguration: z.object({
    AccountLevel: AccountLevelSchema.describe(
      "Account-level metrics configurations.",
    ).optional(),
    Exclude: BucketsAndRegionsSchema.describe(
      "S3 buckets and Regions to include/exclude in the Amazon S3 Storage Lens configuration.",
    ).optional(),
    IsEnabled: z.boolean().describe(
      "Specifies whether the Amazon S3 Storage Lens configuration is enabled or disabled.",
    ).optional(),
    Include: BucketsAndRegionsSchema.describe(
      "S3 buckets and Regions to include/exclude in the Amazon S3 Storage Lens configuration.",
    ).optional(),
    PrefixDelimiter: z.string().describe(
      "The delimiter to divide S3 key into hierarchy of prefixes.",
    ).optional(),
    AwsOrg: AwsOrgSchema.describe(
      "The AWS Organizations ARN to use in the Amazon S3 Storage Lens configuration.",
    ).optional(),
    Id: z.string().min(1).max(64).regex(new RegExp("^[a-zA-Z0-9\\-_.]+$"))
      .describe(
        "The ID that identifies the Amazon S3 Storage Lens configuration.",
      ).optional(),
    DataExport: DataExportSchema.describe(
      "Specifies how Amazon S3 Storage Lens metrics should be exported.",
    ).optional(),
    ExpandedPrefixesDataExport: StorageLensExpandedPrefixesDataExportSchema
      .describe("Expanded Prefixes Data Export.").optional(),
  }).describe("Specifies the details of Amazon S3 Storage Lens configuration.")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "A set of tags (key-value pairs) for this Amazon S3 Storage Lens configuration.",
  ).optional(),
});

/** Swamp extension model for S3 StorageLens. Registered at `@swamp/aws/s3/storage-lens`. */
export const model = {
  type: "@swamp/aws/s3/storage-lens",
  version: "2026.05.27.1",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "S3 StorageLens resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a S3 StorageLens",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::S3::StorageLens",
          desiredState,
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
      description: "Get a S3 StorageLens",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3 StorageLens",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::S3::StorageLens",
          args.identifier,
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
      description: "Update a S3 StorageLens",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
          "AWS::S3::StorageLens",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::S3::StorageLens",
          identifier,
          currentState,
          desiredState,
          ["Id"],
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
      description: "Delete a S3 StorageLens",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the S3 StorageLens",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::S3::StorageLens",
          args.identifier,
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
      description: "Sync S3 StorageLens state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
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
            "AWS::S3::StorageLens",
            identifier,
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
