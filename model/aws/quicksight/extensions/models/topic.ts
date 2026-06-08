// Swamp, an Automation Framework
// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/quicksight/topic
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for QuickSight Topic (AWS::QuickSight::Topic).
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

const DataAggregationSchema = z.object({
  DatasetRowDateGranularity: z.enum([
    "SECOND",
    "MINUTE",
    "HOUR",
    "DAY",
    "WEEK",
    "MONTH",
    "QUARTER",
    "YEAR",
  ]).optional(),
  DefaultDateColumnName: z.string().min(0).max(256).optional(),
});

const CollectiveConstantSchema = z.object({
  ValueList: z.array(z.string()).optional(),
});

const TopicCategoryFilterConstantSchema = z.object({
  ConstantType: z.enum(["SINGULAR", "RANGE", "COLLECTIVE"]).optional(),
  SingularConstant: z.string().min(0).max(256).optional(),
  CollectiveConstant: CollectiveConstantSchema.optional(),
});

const TopicCategoryFilterSchema = z.object({
  CategoryFilterFunction: z.enum(["EXACT", "CONTAINS"]).optional(),
  CategoryFilterType: z.enum([
    "CUSTOM_FILTER",
    "CUSTOM_FILTER_LIST",
    "FILTER_LIST",
  ]).optional(),
  Constant: TopicCategoryFilterConstantSchema.optional(),
  Inverse: z.boolean().optional(),
});

const TopicSingularFilterConstantSchema = z.object({
  ConstantType: z.enum(["SINGULAR", "RANGE", "COLLECTIVE"]).optional(),
  SingularConstant: z.string().min(0).max(256).optional(),
});

const TopicNumericEqualityFilterSchema = z.object({
  Constant: TopicSingularFilterConstantSchema.optional(),
  Aggregation: z.enum([
    "NO_AGGREGATION",
    "SUM",
    "AVERAGE",
    "COUNT",
    "DISTINCT_COUNT",
    "MAX",
    "MEDIAN",
    "MIN",
    "STDEV",
    "STDEVP",
    "VAR",
    "VARP",
  ]).optional(),
});

const RangeConstantSchema = z.object({
  Minimum: z.string().min(0).max(256).optional(),
  Maximum: z.string().min(0).max(256).optional(),
});

const TopicRangeFilterConstantSchema = z.object({
  ConstantType: z.enum(["SINGULAR", "RANGE", "COLLECTIVE"]).optional(),
  RangeConstant: RangeConstantSchema.optional(),
});

const TopicNumericRangeFilterSchema = z.object({
  Inclusive: z.boolean().optional(),
  Constant: TopicRangeFilterConstantSchema.optional(),
  Aggregation: z.enum([
    "NO_AGGREGATION",
    "SUM",
    "AVERAGE",
    "COUNT",
    "DISTINCT_COUNT",
    "MAX",
    "MEDIAN",
    "MIN",
    "STDEV",
    "STDEVP",
    "VAR",
    "VARP",
  ]).optional(),
});

const TopicDateRangeFilterSchema = z.object({
  Inclusive: z.boolean().optional(),
  Constant: TopicRangeFilterConstantSchema.optional(),
});

const TopicRelativeDateFilterSchema = z.object({
  TimeGranularity: z.enum([
    "SECOND",
    "MINUTE",
    "HOUR",
    "DAY",
    "WEEK",
    "MONTH",
    "QUARTER",
    "YEAR",
  ]).optional(),
  RelativeDateFilterFunction: z.enum([
    "PREVIOUS",
    "THIS",
    "LAST",
    "NEXT",
    "NOW",
  ]).optional(),
  Constant: TopicSingularFilterConstantSchema.optional(),
});

const TopicFilterSchema = z.object({
  FilterDescription: z.string().min(0).max(256).optional(),
  FilterClass: z.enum([
    "ENFORCED_VALUE_FILTER",
    "CONDITIONAL_VALUE_FILTER",
    "NAMED_VALUE_FILTER",
  ]).optional(),
  FilterName: z.string().min(0).max(256),
  FilterSynonyms: z.array(z.string().min(0).max(256)).optional(),
  OperandFieldName: z.string().min(0).max(256),
  FilterType: z.enum([
    "CATEGORY_FILTER",
    "NUMERIC_EQUALITY_FILTER",
    "NUMERIC_RANGE_FILTER",
    "DATE_RANGE_FILTER",
    "RELATIVE_DATE_FILTER",
  ]).optional(),
  CategoryFilter: TopicCategoryFilterSchema.optional(),
  NumericEqualityFilter: TopicNumericEqualityFilterSchema.optional(),
  NumericRangeFilter: TopicNumericRangeFilterSchema.optional(),
  DateRangeFilter: TopicDateRangeFilterSchema.optional(),
  RelativeDateFilter: TopicRelativeDateFilterSchema.optional(),
});

const ComparativeOrderSchema = z.object({
  UseOrdering: z.enum(["GREATER_IS_BETTER", "LESSER_IS_BETTER", "SPECIFIED"])
    .optional(),
  SpecifedOrder: z.array(z.string()).optional(),
  TreatUndefinedSpecifiedValues: z.enum(["LEAST", "MOST"]).optional(),
});

const SemanticTypeSchema = z.object({
  TypeName: z.string().min(0).max(256).optional(),
  SubTypeName: z.string().min(0).max(256).optional(),
  TypeParameters: z.record(z.string(), z.string().min(0).max(256)).optional(),
  TruthyCellValue: z.string().optional(),
  TruthyCellValueSynonyms: z.array(z.string()).optional(),
  FalseyCellValue: z.string().optional(),
  FalseyCellValueSynonyms: z.array(z.string()).optional(),
});

const NegativeFormatSchema = z.object({
  Prefix: z.string().min(0).max(256).optional(),
  Suffix: z.string().min(0).max(256).optional(),
});

const DisplayFormatOptionsSchema = z.object({
  UseBlankCellFormat: z.boolean().optional(),
  BlankCellFormat: z.string().min(0).max(256).optional(),
  DateFormat: z.string().min(0).max(256).optional(),
  DecimalSeparator: z.enum(["COMMA", "DOT"]).optional(),
  GroupingSeparator: z.string().min(0).max(256).optional(),
  UseGrouping: z.boolean().optional(),
  FractionDigits: z.number().optional(),
  Prefix: z.string().min(0).max(256).optional(),
  Suffix: z.string().min(0).max(256).optional(),
  UnitScaler: z.enum([
    "NONE",
    "AUTO",
    "THOUSANDS",
    "MILLIONS",
    "BILLIONS",
    "TRILLIONS",
    "LAKHS",
    "CRORES",
  ]).optional(),
  NegativeFormat: NegativeFormatSchema.optional(),
  CurrencySymbol: z.string().min(0).max(256).optional(),
});

const DefaultFormattingSchema = z.object({
  DisplayFormat: z.enum([
    "AUTO",
    "PERCENT",
    "CURRENCY",
    "NUMBER",
    "DATE",
    "STRING",
  ]).optional(),
  DisplayFormatOptions: DisplayFormatOptionsSchema.optional(),
});

const CellValueSynonymSchema = z.object({
  CellValue: z.string().min(0).max(256).optional(),
  Synonyms: z.array(z.string()).optional(),
});

const TopicColumnSchema = z.object({
  ColumnName: z.string().min(0).max(256),
  ColumnFriendlyName: z.string().min(0).max(256).optional(),
  ColumnDescription: z.string().min(0).max(256).optional(),
  ColumnSynonyms: z.array(z.string().min(0).max(256)).optional(),
  ColumnDataRole: z.enum(["DIMENSION", "MEASURE"]).optional(),
  Aggregation: z.enum([
    "SUM",
    "MAX",
    "MIN",
    "COUNT",
    "DISTINCT_COUNT",
    "AVERAGE",
    "MEDIAN",
    "STDEV",
    "STDEVP",
    "VAR",
    "VARP",
  ]).optional(),
  IsIncludedInTopic: z.boolean().optional(),
  DisableIndexing: z.boolean().optional(),
  ComparativeOrder: ComparativeOrderSchema.optional(),
  SemanticType: SemanticTypeSchema.optional(),
  TimeGranularity: z.enum([
    "SECOND",
    "MINUTE",
    "HOUR",
    "DAY",
    "WEEK",
    "MONTH",
    "QUARTER",
    "YEAR",
  ]).optional(),
  AllowedAggregations: z.array(
    z.enum([
      "COUNT",
      "DISTINCT_COUNT",
      "MIN",
      "MAX",
      "MEDIAN",
      "SUM",
      "AVERAGE",
      "STDEV",
      "STDEVP",
      "VAR",
      "VARP",
      "PERCENTILE",
    ]),
  ).optional(),
  NotAllowedAggregations: z.array(
    z.enum([
      "COUNT",
      "DISTINCT_COUNT",
      "MIN",
      "MAX",
      "MEDIAN",
      "SUM",
      "AVERAGE",
      "STDEV",
      "STDEVP",
      "VAR",
      "VARP",
      "PERCENTILE",
    ]),
  ).optional(),
  DefaultFormatting: DefaultFormattingSchema.optional(),
  NeverAggregateInFilter: z.boolean().optional(),
  CellValueSynonyms: z.array(CellValueSynonymSchema).optional(),
  NonAdditive: z.boolean().optional(),
});

const TopicCalculatedFieldSchema = z.object({
  CalculatedFieldName: z.string().min(0).max(256),
  CalculatedFieldDescription: z.string().min(0).max(256).optional(),
  Expression: z.string().min(1).max(4096),
  CalculatedFieldSynonyms: z.array(z.string().min(0).max(256)).optional(),
  IsIncludedInTopic: z.boolean().optional(),
  DisableIndexing: z.boolean().optional(),
  ColumnDataRole: z.enum(["DIMENSION", "MEASURE"]).optional(),
  TimeGranularity: z.enum([
    "SECOND",
    "MINUTE",
    "HOUR",
    "DAY",
    "WEEK",
    "MONTH",
    "QUARTER",
    "YEAR",
  ]).optional(),
  DefaultFormatting: DefaultFormattingSchema.optional(),
  Aggregation: z.enum([
    "SUM",
    "MAX",
    "MIN",
    "COUNT",
    "DISTINCT_COUNT",
    "AVERAGE",
    "MEDIAN",
    "STDEV",
    "STDEVP",
    "VAR",
    "VARP",
  ]).optional(),
  ComparativeOrder: ComparativeOrderSchema.optional(),
  SemanticType: SemanticTypeSchema.optional(),
  AllowedAggregations: z.array(
    z.enum([
      "COUNT",
      "DISTINCT_COUNT",
      "MIN",
      "MAX",
      "MEDIAN",
      "SUM",
      "AVERAGE",
      "STDEV",
      "STDEVP",
      "VAR",
      "VARP",
      "PERCENTILE",
    ]),
  ).optional(),
  NotAllowedAggregations: z.array(
    z.enum([
      "COUNT",
      "DISTINCT_COUNT",
      "MIN",
      "MAX",
      "MEDIAN",
      "SUM",
      "AVERAGE",
      "STDEV",
      "STDEVP",
      "VAR",
      "VARP",
      "PERCENTILE",
    ]),
  ).optional(),
  NeverAggregateInFilter: z.boolean().optional(),
  CellValueSynonyms: z.array(CellValueSynonymSchema).optional(),
  NonAdditive: z.boolean().optional(),
});

const SemanticEntityTypeSchema = z.object({
  TypeName: z.string().min(0).max(256).optional(),
  SubTypeName: z.string().min(0).max(256).optional(),
  TypeParameters: z.record(z.string(), z.string().min(0).max(256)).optional(),
});

const NamedEntityDefinitionMetricSchema = z.object({
  Aggregation: z.enum([
    "SUM",
    "MIN",
    "MAX",
    "COUNT",
    "AVERAGE",
    "DISTINCT_COUNT",
    "STDEV",
    "STDEVP",
    "VAR",
    "VARP",
    "PERCENTILE",
    "MEDIAN",
    "CUSTOM",
  ]).optional(),
  AggregationFunctionParameters: z.record(
    z.string(),
    z.string().min(0).max(256),
  ).optional(),
});

const NamedEntityDefinitionSchema = z.object({
  FieldName: z.string().min(0).max(256).optional(),
  PropertyName: z.string().min(0).max(256).optional(),
  PropertyRole: z.enum(["PRIMARY", "ID"]).optional(),
  PropertyUsage: z.enum(["INHERIT", "DIMENSION", "MEASURE"]).optional(),
  Metric: NamedEntityDefinitionMetricSchema.optional(),
});

const TopicNamedEntitySchema = z.object({
  EntityName: z.string().min(0).max(256),
  EntityDescription: z.string().min(0).max(256).optional(),
  EntitySynonyms: z.array(z.string().min(0).max(256)).optional(),
  SemanticEntityType: SemanticEntityTypeSchema.optional(),
  Definition: z.array(NamedEntityDefinitionSchema).optional(),
});

const DatasetMetadataSchema = z.object({
  DatasetArn: z.string(),
  DatasetName: z.string().min(0).max(256).optional(),
  DatasetDescription: z.string().min(0).max(256).optional(),
  DataAggregation: DataAggregationSchema.optional(),
  Filters: z.array(TopicFilterSchema).optional(),
  Columns: z.array(TopicColumnSchema).optional(),
  CalculatedFields: z.array(TopicCalculatedFieldSchema).optional(),
  NamedEntities: z.array(TopicNamedEntitySchema).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe("Tag key."),
  Value: z.string().min(1).max(256).describe("Tag value."),
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
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  ConfigOptions: z.object({
    QBusinessInsightsEnabled: z.boolean().optional(),
  }).describe("Model for configuration of a Topic").optional(),
  CustomInstructions: z.object({
    CustomInstructionsString: z.string().min(0).max(5000),
  }).optional(),
  DataSets: z.array(DatasetMetadataSchema).optional(),
  Description: z.string().min(0).max(256).optional(),
  FolderArns: z.array(z.string()).optional(),
  Name: z.string().min(1).max(128).optional(),
  Tags: z.array(TagSchema).optional(),
  TopicId: z.string().min(0).max(256).regex(
    new RegExp("^[A-Za-z0-9-_.\\\\+]*$"),
  ).optional(),
  UserExperienceVersion: z.enum(["LEGACY", "NEW_READER_EXPERIENCE"]).optional(),
});

const StateSchema = z.object({
  Arn: z.string().optional(),
  AwsAccountId: z.string(),
  ConfigOptions: z.object({
    QBusinessInsightsEnabled: z.boolean(),
  }).optional(),
  CustomInstructions: z.object({
    CustomInstructionsString: z.string(),
  }).optional(),
  DataSets: z.array(DatasetMetadataSchema).optional(),
  Description: z.string().optional(),
  FolderArns: z.array(z.string()).optional(),
  Name: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  TopicId: z.string(),
  UserExperienceVersion: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  ConfigOptions: z.object({
    QBusinessInsightsEnabled: z.boolean().optional(),
  }).describe("Model for configuration of a Topic").optional(),
  CustomInstructions: z.object({
    CustomInstructionsString: z.string().min(0).max(5000).optional(),
  }).optional(),
  DataSets: z.array(DatasetMetadataSchema).optional(),
  Description: z.string().min(0).max(256).optional(),
  FolderArns: z.array(z.string()).optional(),
  Name: z.string().min(1).max(128).optional(),
  Tags: z.array(TagSchema).optional(),
  TopicId: z.string().min(0).max(256).regex(
    new RegExp("^[A-Za-z0-9-_.\\\\+]*$"),
  ).optional(),
  UserExperienceVersion: z.enum(["LEGACY", "NEW_READER_EXPERIENCE"]).optional(),
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

/** Swamp extension model for QuickSight Topic. Registered at `@swamp/aws/quicksight/topic`. */
export const model = {
  type: "@swamp/aws/quicksight/topic",
  version: "2026.06.08.1",
  upgrades: [
    {
      toVersion: "2026.04.01.2",
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
    {
      toVersion: "2026.06.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "QuickSight Topic resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QuickSight Topic",
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
          "AWS::QuickSight::Topic",
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
      description: "Get a QuickSight Topic",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight Topic",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::QuickSight::Topic",
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
      description: "Update a QuickSight Topic",
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
        const idParts = [
          existing.AwsAccountId?.toString(),
          existing.TopicId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QuickSight::Topic",
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
          "AWS::QuickSight::Topic",
          identifier,
          currentState,
          desiredState,
          ["AwsAccountId", "FolderArns", "TopicId", "Tags"],
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
      description: "Delete a QuickSight Topic",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight Topic",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::QuickSight::Topic",
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
      description: "Sync QuickSight Topic state from AWS",
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
        const idParts = [
          existing.AwsAccountId?.toString(),
          existing.TopicId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QuickSight::Topic",
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
