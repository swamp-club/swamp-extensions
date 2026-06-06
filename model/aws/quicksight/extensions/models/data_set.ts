// Auto-generated extension model for @swamp/aws/quicksight/data-set
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for QuickSight DataSet (AWS::QuickSight::DataSet).
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

const ColumnLevelPermissionRuleSchema = z.object({
  ColumnNames: z.array(z.string()).describe("An array of column names.")
    .optional(),
  Principals: z.array(z.string()).describe(
    "An array of Amazon Resource Names (ARNs) for Amazon QuickSight users or groups.",
  ).optional(),
});

const ResourcePermissionSchema = z.object({
  Actions: z.array(z.string()).describe(
    "The IAM action to grant or revoke permissions on.",
  ),
  Principal: z.string().min(1).max(256).describe(
    "The Amazon Resource Name (ARN) of the principal. This can be one of the following:   The ARN of an Amazon QuickSight user or group associated with a data source or dataset. (This is common.)   The ARN of an Amazon QuickSight user, group, or namespace associated with an analysis, dashboard, template, or theme. (This is common.)   The ARN of an Amazon Web Services account root: This is an IAM ARN rather than a QuickSight ARN. Use this option only to share resources (templates) across Amazon Web Services accounts. (This is less common.)",
  ),
});

const TagSchema = z.object({
  Value: z.string().min(1).max(256).describe("Tag value."),
  Key: z.string().min(1).max(128).describe("Tag key."),
});

const InputColumnSchema = z.object({
  Type: z.enum([
    "STRING",
    "INTEGER",
    "DECIMAL",
    "DATETIME",
    "BIT",
    "BOOLEAN",
    "JSON",
    "SEMISTRUCT",
  ]),
  SubType: z.enum(["FLOAT", "FIXED"]).optional(),
  Id: z.string().min(1).max(256).optional(),
  Name: z.string().min(1).max(127).describe(
    "The name of this column in the underlying data source.",
  ),
});

const TablePathElementSchema = z.object({
  Id: z.string().min(1).max(256).optional(),
  Name: z.string().min(1).max(256).optional(),
});

const SaaSTableSchema = z.object({
  DataSourceArn: z.string(),
  InputColumns: z.array(InputColumnSchema),
  TablePath: z.array(TablePathElementSchema),
});

const RelationalTableSchema = z.object({
  DataSourceArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the data source.",
  ),
  InputColumns: z.array(InputColumnSchema).describe(
    "The column schema of the table.",
  ),
  Schema: z.string().min(0).max(256).describe(
    "The schema name. This name applies to certain relational database engines.",
  ).optional(),
  Catalog: z.string().min(0).max(256).describe(
    "The catalog associated with a table.",
  ).optional(),
  Name: z.string().min(1).max(256).describe(
    "The name of the relational table.",
  ),
});

const CustomSqlSchema = z.object({
  DataSourceArn: z.string().describe(
    "The Amazon Resource Name (ARN) of the data source.",
  ),
  SqlQuery: z.string().min(1).max(168000).describe("The SQL query."),
  Columns: z.array(InputColumnSchema).describe(
    "The column schema from the SQL query result set.",
  ),
  Name: z.string().min(1).max(128).describe(
    "A display name for the SQL query result.",
  ),
});

const UploadSettingsSchema = z.object({
  ContainsHeader: z.boolean().describe(
    "Whether the file has a header row, or the files each have a header row.",
  ).optional(),
  TextQualifier: z.enum(["DOUBLE_QUOTE", "SINGLE_QUOTE"]).optional(),
  Format: z.enum(["CSV", "TSV", "CLF", "ELF", "XLSX", "JSON"]).optional(),
  StartFromRow: z.number().min(1).describe(
    "A row number to start reading data from.",
  ).optional(),
  Delimiter: z.string().min(1).max(1).describe(
    "The delimiter between values in the file.",
  ).optional(),
});

const S3SourceSchema = z.object({
  DataSourceArn: z.string().describe(
    "The Amazon Resource Name (ARN) for the data source.",
  ),
  InputColumns: z.array(InputColumnSchema).describe(
    "A physical table type for an S3 data source.  For files that aren't JSON, only STRING data types are supported in input columns.",
  ),
  UploadSettings: UploadSettingsSchema.describe(
    "Information about the format for a source file or files.",
  ).optional(),
});

const PhysicalTableSchema = z.object({
  SaaSTable: SaaSTableSchema.optional(),
  RelationalTable: RelationalTableSchema.describe(
    "A physical table type for relational data sources.",
  ).optional(),
  CustomSql: CustomSqlSchema.describe(
    "A physical table type built from the results of the custom SQL query.",
  ).optional(),
  S3Source: S3SourceSchema.describe(
    "A physical table type for an S3 data source.",
  ).optional(),
});

const FieldFolderSchema = z.object({
  Description: z.string().min(0).max(500).describe(
    "The description for a field folder.",
  ).optional(),
  Columns: z.array(z.string()).describe(
    "A folder has a list of columns. A column can only be in one folder.",
  ).optional(),
});

const UploadedDocumentMetadataSchema = z.object({
  Name: z.string().min(1).max(127).optional(),
});

const InlineCustomInstructionSchema = z.object({
  InstructionText: z.string().min(0).max(50000),
  UploadedDocumentMetadata: UploadedDocumentMetadataSchema.optional(),
});

const CustomInstructionSchema = z.object({
  InlineCustomInstruction: InlineCustomInstructionSchema.optional(),
});

const DataSetSemanticDescriptionSchema = z.object({
  Text: z.string().min(1).max(500),
});

const DataSetSemanticMetadataSchema = z.object({
  CustomInstructions: z.array(CustomInstructionSchema).optional(),
  Description: DataSetSemanticDescriptionSchema.optional(),
});

const ColumnSemanticTypeSchema = z.object({
  GeographicalRole: z.enum([
    "COUNTRY",
    "STATE",
    "COUNTY",
    "CITY",
    "POSTCODE",
    "LONGITUDE",
    "LATITUDE",
    "POLITICAL1",
    "CENSUS_TRACT",
    "CENSUS_BLOCK_GROUP",
    "CENSUS_BLOCK",
  ]).optional(),
});

const ColumnDescriptionSchema = z.object({
  Text: z.string().min(0).max(500).describe(
    "The text of a description for a column.",
  ).optional(),
});

const AdditionalNotesSchema = z.object({
  Text: z.string().min(0).max(2000).optional(),
});

const ColumnSemanticPropertySchema = z.object({
  SemanticType: ColumnSemanticTypeSchema.optional(),
  Description: ColumnDescriptionSchema.describe(
    "Metadata that contains a description for a column.",
  ).optional(),
  AdditionalNotes: AdditionalNotesSchema.optional(),
});

const SharedColumnSemanticMetadataSchema = z.object({
  ColumnNames: z.array(z.string()).optional(),
  ColumnProperties: z.array(ColumnSemanticPropertySchema),
});

const TableSemanticMetadataSchema = z.object({
  ColumnMetadata: z.array(SharedColumnSemanticMetadataSchema).optional(),
});

const RowLevelPermissionTagRuleSchema = z.object({
  ColumnName: z.string().describe(
    "The column name that a tag key is assigned to.",
  ),
  TagKey: z.string().min(1).max(128).describe("The unique key for a tag."),
  MatchAllValue: z.string().min(1).max(256).describe(
    "A string that you want to use to filter by all the values in a column in the dataset and don’t want to list the values one by one. For example, you can use an asterisk as your match all value.",
  ).optional(),
  TagMultiValueDelimiter: z.string().min(0).max(10).describe(
    "A string that you want to use to delimit the values when you pass the values at run time. For example, you can delimit the values with a comma.",
  ).optional(),
});

const RowLevelPermissionTagConfigurationSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  TagRules: z.array(RowLevelPermissionTagRuleSchema).describe(
    "A set of rules associated with row-level security, such as the tag names and columns that they are assigned to.",
  ),
  TagRuleConfigurations: z.array(z.array(z.string().min(1).max(128))).describe(
    "A list of tag configuration rules to apply to a dataset. All tag configurations have the OR condition. Tags within each tile will be joined (AND). At least one rule in this structure must have all tag values assigned to it to apply Row-level security (RLS) to the dataset.",
  ).optional(),
});

const RowLevelPermissionDataSetSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  FormatVersion: z.enum(["VERSION_1", "VERSION_2"]).optional(),
  Arn: z.string().describe(
    "The Amazon Resource Name (ARN) of the dataset that contains permissions for RLS.",
  ),
  Namespace: z.string().min(0).max(64).regex(new RegExp("^[a-zA-Z0-9._-]*$"))
    .describe(
      "The namespace associated with the dataset that contains permissions for RLS.",
    ).optional(),
  PermissionPolicy: z.enum(["GRANT_ACCESS", "DENY_ACCESS"]),
});

const RowLevelPermissionConfigurationSchema = z.object({
  TagConfiguration: RowLevelPermissionTagConfigurationSchema.describe(
    "The configuration of tags on a dataset to set row-level security.",
  ).optional(),
  RowLevelPermissionDataSet: RowLevelPermissionDataSetSchema.describe(
    "Information about a dataset that contains permissions for row-level security (RLS). The permissions dataset maps fields to users or groups. For more information, see Using Row-Level Security (RLS) to Restrict Access to a Dataset in the Amazon QuickSight User Guide. The option to deny permissions by setting PermissionPolicy to DENY_ACCESS is not supported for new RLS datasets.",
  ).optional(),
});

const SemanticTableSchema = z.object({
  SemanticMetadata: TableSemanticMetadataSchema.optional(),
  Alias: z.string().min(1).max(64),
  DestinationTableId: z.string().min(1).max(64).regex(
    new RegExp("^[0-9a-zA-Z-]*$"),
  ),
  RowLevelPermissionConfiguration: RowLevelPermissionConfigurationSchema
    .optional(),
});

const UniqueKeySchema = z.object({
  ColumnNames: z.array(z.string().min(1).max(127)),
});

const LookbackWindowSchema = z.object({
  ColumnName: z.string().describe("The name of the lookback window column."),
  SizeUnit: z.enum(["HOUR", "DAY", "WEEK"]),
  Size: z.number().min(1).describe("The lookback window column size."),
});

const IncrementalRefreshSchema = z.object({
  LookbackWindow: LookbackWindowSchema.describe(
    "The lookback window setup of an incremental refresh configuration.",
  ),
});

const RefreshConfigurationSchema = z.object({
  IncrementalRefresh: IncrementalRefreshSchema.describe(
    "The incremental refresh configuration for a dataset.",
  ),
});

const RefreshFailureEmailAlertSchema = z.object({
  AlertStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const RefreshFailureConfigurationSchema = z.object({
  EmailAlert: RefreshFailureEmailAlertSchema.optional(),
});

const GeoSpatialColumnGroupSchema = z.object({
  Columns: z.array(z.string().min(1).max(127)).describe(
    "Columns in this hierarchy.",
  ),
  CountryCode: z.enum(["US"]).optional(),
  Name: z.string().min(1).max(64).describe("A display name for the hierarchy."),
});

const ColumnGroupSchema = z.object({
  GeoSpatialColumnGroup: GeoSpatialColumnGroupSchema.describe(
    "Geospatial column group that denotes a hierarchy.",
  ).optional(),
});

const IntegerDatasetParameterDefaultValuesSchema = z.object({
  StaticValues: z.array(z.number().int()).describe(
    "A list of static default values for a given integer parameter.",
  ).optional(),
});

const IntegerDatasetParameterSchema = z.object({
  ValueType: z.enum(["MULTI_VALUED", "SINGLE_VALUED"]),
  DefaultValues: IntegerDatasetParameterDefaultValuesSchema.describe(
    "The default values of an integer parameter.",
  ).optional(),
  Id: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$")).describe(
    "An identifier for the integer parameter created in the dataset.",
  ),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .describe(
      "The name of the integer parameter that is created in the dataset.",
    ),
});

const DateTimeDatasetParameterDefaultValuesSchema = z.object({
  StaticValues: z.array(z.string()).describe(
    "A list of static default values for a given date time parameter.",
  ).optional(),
});

const DateTimeDatasetParameterSchema = z.object({
  ValueType: z.enum(["MULTI_VALUED", "SINGLE_VALUED"]),
  TimeGranularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]).optional(),
  DefaultValues: DateTimeDatasetParameterDefaultValuesSchema.describe(
    "The default values of a date time parameter.",
  ).optional(),
  Id: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$")).describe(
    "An identifier for the parameter that is created in the dataset.",
  ),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .describe(
      "The name of the date time parameter that is created in the dataset.",
    ),
});

const DecimalDatasetParameterDefaultValuesSchema = z.object({
  StaticValues: z.array(z.number()).describe(
    "A list of static default values for a given decimal parameter.",
  ).optional(),
});

const DecimalDatasetParameterSchema = z.object({
  ValueType: z.enum(["MULTI_VALUED", "SINGLE_VALUED"]),
  DefaultValues: DecimalDatasetParameterDefaultValuesSchema.describe(
    "The default values of a decimal parameter.",
  ).optional(),
  Id: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$")).describe(
    "An identifier for the decimal parameter created in the dataset.",
  ),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .describe(
      "The name of the decimal parameter that is created in the dataset.",
    ),
});

const StringDatasetParameterDefaultValuesSchema = z.object({
  StaticValues: z.array(z.string().min(0).max(512)).describe(
    "A list of static default values for a given string parameter.",
  ).optional(),
});

const StringDatasetParameterSchema = z.object({
  ValueType: z.enum(["MULTI_VALUED", "SINGLE_VALUED"]),
  DefaultValues: StringDatasetParameterDefaultValuesSchema.describe(
    "The default values of a string parameter.",
  ).optional(),
  Id: z.string().min(1).max(128).regex(new RegExp("^[a-zA-Z0-9-]+$")).describe(
    "An identifier for the string parameter that is created in the dataset.",
  ),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .describe(
      "The name of the string parameter that is created in the dataset.",
    ),
});

const DatasetParameterSchema = z.object({
  IntegerDatasetParameter: IntegerDatasetParameterSchema.describe(
    "An integer parameter for a dataset.",
  ).optional(),
  DateTimeDatasetParameter: DateTimeDatasetParameterSchema.describe(
    "A date time parameter for a dataset.",
  ).optional(),
  DecimalDatasetParameter: DecimalDatasetParameterSchema.describe(
    "A decimal parameter for a dataset.",
  ).optional(),
  StringDatasetParameter: StringDatasetParameterSchema.describe(
    "A string parameter for a dataset.",
  ).optional(),
});

const ColumnTagSchema = z.object({
  ColumnGeographicRole: z.enum([
    "COUNTRY",
    "STATE",
    "COUNTY",
    "CITY",
    "POSTCODE",
    "LONGITUDE",
    "LATITUDE",
    "POLITICAL1",
    "CENSUS_TRACT",
    "CENSUS_BLOCK_GROUP",
    "CENSUS_BLOCK",
  ]).optional(),
  ColumnDescription: ColumnDescriptionSchema.describe(
    "Metadata that contains a description for a column.",
  ).optional(),
});

const TagColumnOperationSchema = z.object({
  ColumnName: z.string().min(1).max(127).describe(
    "The column that this operation acts on.",
  ),
  Tags: z.array(ColumnTagSchema).describe(
    "The dataset column tag, currently only used for geospatial type tagging.  This is not tags for the Amazon Web Services tagging feature.",
  ),
});

const UntagColumnOperationSchema = z.object({
  ColumnName: z.string().min(1).max(127).describe(
    "The column that this operation acts on.",
  ),
  TagNames: z.array(z.enum(["COLUMN_GEOGRAPHIC_ROLE", "COLUMN_DESCRIPTION"]))
    .describe("The column tags to remove from this column."),
});

const NewDefaultValuesSchema = z.object({
  DecimalStaticValues: z.array(z.number()).describe(
    "A list of static default values for a given decimal parameter.",
  ).optional(),
  IntegerStaticValues: z.array(z.number().int()).describe(
    "A list of static default values for a given integer parameter.",
  ).optional(),
  StringStaticValues: z.array(z.string().min(0).max(512)).describe(
    "A list of static default values for a given string parameter.",
  ).optional(),
  DateTimeStaticValues: z.array(z.string()).describe(
    "A list of static default values for a given date time parameter.",
  ).optional(),
});

const OverrideDatasetParameterOperationSchema = z.object({
  NewDefaultValues: NewDefaultValuesSchema.describe(
    "The configuration that overrides the existing default values for a dataset parameter that is inherited from another dataset.",
  ).optional(),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .describe(
      "The name of the parameter to be overridden with different values.",
    ),
  NewParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ).describe("The new name for the parameter.").optional(),
});

const DataSetDateFilterValueSchema = z.object({
  StaticValue: z.string().optional(),
});

const DataSetDateRangeFilterConditionSchema = z.object({
  IncludeMaximum: z.boolean().optional(),
  RangeMinimum: DataSetDateFilterValueSchema.optional(),
  RangeMaximum: DataSetDateFilterValueSchema.optional(),
  IncludeMinimum: z.boolean().optional(),
});

const DataSetDateComparisonFilterConditionSchema = z.object({
  Operator: z.enum([
    "BEFORE",
    "BEFORE_OR_EQUALS_TO",
    "AFTER",
    "AFTER_OR_EQUALS_TO",
  ]),
  Value: DataSetDateFilterValueSchema.optional(),
});

const DataSetDateFilterConditionSchema = z.object({
  ColumnName: z.string().min(1).max(127).optional(),
  RangeFilterCondition: DataSetDateRangeFilterConditionSchema.optional(),
  ComparisonFilterCondition: DataSetDateComparisonFilterConditionSchema
    .optional(),
});

const DataSetStringFilterValueSchema = z.object({
  StaticValue: z.string().min(0).max(512).optional(),
});

const DataSetStringComparisonFilterConditionSchema = z.object({
  Operator: z.enum([
    "EQUALS",
    "DOES_NOT_EQUAL",
    "CONTAINS",
    "DOES_NOT_CONTAIN",
    "STARTS_WITH",
    "ENDS_WITH",
  ]),
  Value: DataSetStringFilterValueSchema.optional(),
});

const DataSetStringListFilterValueSchema = z.object({
  StaticValues: z.array(z.string().min(0).max(512)).optional(),
});

const DataSetStringListFilterConditionSchema = z.object({
  Operator: z.enum(["INCLUDE", "EXCLUDE"]),
  Values: DataSetStringListFilterValueSchema.optional(),
});

const DataSetStringFilterConditionSchema = z.object({
  ColumnName: z.string().min(1).max(127).optional(),
  ComparisonFilterCondition: DataSetStringComparisonFilterConditionSchema
    .optional(),
  ListFilterCondition: DataSetStringListFilterConditionSchema.optional(),
});

const DataSetNumericFilterValueSchema = z.object({
  StaticValue: z.number().optional(),
});

const DataSetNumericRangeFilterConditionSchema = z.object({
  IncludeMaximum: z.boolean().optional(),
  RangeMinimum: DataSetNumericFilterValueSchema.optional(),
  RangeMaximum: DataSetNumericFilterValueSchema.optional(),
  IncludeMinimum: z.boolean().optional(),
});

const DataSetNumericComparisonFilterConditionSchema = z.object({
  Operator: z.enum([
    "EQUALS",
    "DOES_NOT_EQUAL",
    "GREATER_THAN",
    "GREATER_THAN_OR_EQUALS_TO",
    "LESS_THAN",
    "LESS_THAN_OR_EQUALS_TO",
  ]),
  Value: DataSetNumericFilterValueSchema.optional(),
});

const DataSetNumericFilterConditionSchema = z.object({
  ColumnName: z.string().min(1).max(127).optional(),
  RangeFilterCondition: DataSetNumericRangeFilterConditionSchema.optional(),
  ComparisonFilterCondition: DataSetNumericComparisonFilterConditionSchema
    .optional(),
});

const FilterOperationSchema = z.object({
  DateFilterCondition: DataSetDateFilterConditionSchema.optional(),
  StringFilterCondition: DataSetStringFilterConditionSchema.optional(),
  ConditionExpression: z.string().min(1).max(4096).describe(
    "An expression that must evaluate to a Boolean value. Rows for which the expression evaluates to true are kept in the dataset.",
  ).optional(),
  NumericFilterCondition: DataSetNumericFilterConditionSchema.optional(),
});

const CastColumnTypeOperationSchema = z.object({
  ColumnName: z.string().min(1).max(127).describe("Column name."),
  SubType: z.enum(["FLOAT", "FIXED"]).optional(),
  Format: z.string().min(0).max(32).describe(
    "When casting a column from string to datetime type, you can supply a string in a format supported by Amazon QuickSight to denote the source data format.",
  ).optional(),
  NewColumnType: z.enum(["STRING", "INTEGER", "DECIMAL", "DATETIME"]),
});

const CalculatedColumnSchema = z.object({
  ColumnId: z.string().min(1).max(64).describe(
    "A unique ID to identify a calculated column. During a dataset update, if the column ID of a calculated column matches that of an existing calculated column, Amazon QuickSight preserves the existing calculated column.",
  ),
  ColumnName: z.string().min(1).max(127).describe("Column name."),
  Expression: z.string().min(1).max(250000).describe(
    "An expression that defines the calculated column.",
  ),
});

const DataSetColumnIdMappingSchema = z.object({
  SourceColumnId: z.string().min(1).max(256),
  TargetColumnId: z.string().min(1).max(64),
});

const TransformOperationSourceSchema = z.object({
  TransformOperationId: z.string().min(1).max(64).regex(
    new RegExp("^[0-9a-zA-Z-]*$"),
  ),
  ColumnIdMappings: z.array(DataSetColumnIdMappingSchema).optional(),
});

const CreateColumnsOperationSchema = z.object({
  Alias: z.string().min(1).max(64).optional(),
  Columns: z.array(CalculatedColumnSchema).describe(
    "Calculated columns to create.",
  ),
  Source: TransformOperationSourceSchema.optional(),
});

const RenameColumnOperationSchema = z.object({
  NewColumnName: z.string().min(1).max(127).describe(
    "The new name for the column.",
  ),
  ColumnName: z.string().min(1).max(127).describe(
    "The name of the column to be renamed.",
  ),
});

const ProjectOperationSchema = z.object({
  Alias: z.string().min(1).max(64).optional(),
  ProjectedColumns: z.array(z.string()).describe("Projected columns.")
    .optional(),
  Source: TransformOperationSourceSchema.optional(),
});

const TransformOperationSchema = z.object({
  TagColumnOperation: TagColumnOperationSchema.describe(
    "A transform operation that tags a column with additional information.",
  ).optional(),
  UntagColumnOperation: UntagColumnOperationSchema.describe(
    "A transform operation that removes tags associated with a column.",
  ).optional(),
  OverrideDatasetParameterOperation: OverrideDatasetParameterOperationSchema
    .describe(
      "A transform operation that overrides the dataset parameter values that are defined in another dataset.",
    ).optional(),
  FilterOperation: FilterOperationSchema.describe(
    "A transform operation that filters rows based on a condition.",
  ).optional(),
  CastColumnTypeOperation: CastColumnTypeOperationSchema.describe(
    "A transform operation that casts a column to a different type.",
  ).optional(),
  CreateColumnsOperation: CreateColumnsOperationSchema.describe(
    "A transform operation that creates calculated columns. Columns created in one such operation form a lexical closure.",
  ).optional(),
  RenameColumnOperation: RenameColumnOperationSchema.describe(
    "A transform operation that renames a column.",
  ).optional(),
  ProjectOperation: ProjectOperationSchema.describe(
    "A transform operation that projects columns. Operations that come after a projection can only refer to projected columns.",
  ).optional(),
});

const JoinKeyPropertiesSchema = z.object({
  UniqueKey: z.boolean().describe(
    "A value that indicates that a row in a table is uniquely identified by the columns in a join key. This is used by Amazon QuickSight to optimize query performance.",
  ).optional(),
});

const JoinInstructionSchema = z.object({
  OnClause: z.string().min(1).max(512).describe(
    "The join instructions provided in the ON clause of a join.",
  ),
  Type: z.enum(["INNER", "OUTER", "LEFT", "RIGHT"]),
  LeftJoinKeyProperties: JoinKeyPropertiesSchema.describe(
    "Properties associated with the columns participating in a join.",
  ).optional(),
  LeftOperand: z.string().min(1).max(64).regex(new RegExp("^[0-9a-zA-Z-]*$"))
    .describe("The operand on the left side of a join."),
  RightOperand: z.string().min(1).max(64).regex(new RegExp("^[0-9a-zA-Z-]*$"))
    .describe("The operand on the right side of a join."),
  RightJoinKeyProperties: JoinKeyPropertiesSchema.describe(
    "Properties associated with the columns participating in a join.",
  ).optional(),
});

const LogicalTableSourceSchema = z.object({
  PhysicalTableId: z.string().min(1).max(64).regex(
    new RegExp("^[0-9a-zA-Z-]*$"),
  ).describe("Physical table ID.").optional(),
  JoinInstruction: JoinInstructionSchema.describe(
    "The instructions associated with a join.",
  ).optional(),
  DataSetArn: z.string().describe(
    "The Amazon Resource Number (ARN) of the parent dataset.",
  ).optional(),
});

const LogicalTableSchema = z.object({
  Alias: z.string().min(1).max(64).describe(
    "A display name for the logical table.",
  ),
  DataTransforms: z.array(TransformOperationSchema).describe(
    "Transform operations that act on this logical table. For this structure to be valid, only one of the attributes can be non-null.",
  ).optional(),
  Source: LogicalTableSourceSchema.describe(
    "Information about the source of a logical table. This is a variant type structure. For this structure to be valid, only one of the attributes can be non-null.",
  ),
});

const DestinationTableSourceSchema = z.object({
  TransformOperationId: z.string().min(1).max(64).regex(
    new RegExp("^[0-9a-zA-Z-]*$"),
  ),
});

const DestinationTableSchema = z.object({
  Alias: z.string().min(1).max(64),
  Source: DestinationTableSourceSchema,
});

const RenameColumnsOperationSchema = z.object({
  Alias: z.string().min(1).max(64),
  RenameColumnOperations: z.array(RenameColumnOperationSchema),
  Source: TransformOperationSourceSchema,
});

const CastColumnTypesOperationSchema = z.object({
  CastColumnTypeOperations: z.array(CastColumnTypeOperationSchema),
  Alias: z.string().min(1).max(64),
  Source: TransformOperationSourceSchema,
});

const ImportTableOperationSourceSchema = z.object({
  SourceTableId: z.string().min(1).max(64).regex(new RegExp("^[0-9a-zA-Z-]*$")),
  ColumnIdMappings: z.array(DataSetColumnIdMappingSchema).optional(),
});

const ImportTableOperationSchema = z.object({
  Alias: z.string().min(1).max(64),
  Source: ImportTableOperationSourceSchema,
});

const ColumnToUnpivotSchema = z.object({
  ColumnName: z.string().min(1).max(127).optional(),
  NewValue: z.string().min(0).max(2047).optional(),
});

const UnpivotOperationSchema = z.object({
  UnpivotedLabelColumnName: z.string().min(1).max(127),
  ColumnsToUnpivot: z.array(ColumnToUnpivotSchema),
  UnpivotedLabelColumnId: z.string().min(1).max(64),
  Alias: z.string().min(1).max(64),
  UnpivotedValueColumnId: z.string().min(1).max(64),
  UnpivotedValueColumnName: z.string().min(1).max(127),
  Source: TransformOperationSourceSchema,
});

const OutputColumnNameOverrideSchema = z.object({
  OutputColumnName: z.string().min(1).max(127),
  SourceColumnName: z.string().min(1).max(127).optional(),
});

const JoinOperandPropertiesSchema = z.object({
  OutputColumnNameOverrides: z.array(OutputColumnNameOverrideSchema),
});

const JoinOperationSchema = z.object({
  OnClause: z.string().min(1).max(512),
  Type: z.enum(["INNER", "OUTER", "LEFT", "RIGHT"]),
  RightOperandProperties: JoinOperandPropertiesSchema.optional(),
  LeftOperandProperties: JoinOperandPropertiesSchema.optional(),
  Alias: z.string().min(1).max(64),
  LeftOperand: TransformOperationSourceSchema,
  RightOperand: TransformOperationSourceSchema,
});

const AppendedColumnSchema = z.object({
  ColumnName: z.string().min(1).max(127),
  NewColumnId: z.string().min(1).max(64),
});

const AppendOperationSchema = z.object({
  AppendedColumns: z.array(AppendedColumnSchema),
  SecondSource: TransformOperationSourceSchema.optional(),
  Alias: z.string().min(1).max(64),
  FirstSource: TransformOperationSourceSchema.optional(),
});

const FiltersOperationSchema = z.object({
  FilterOperations: z.array(FilterOperationSchema),
  Alias: z.string().min(1).max(64),
  Source: TransformOperationSourceSchema,
});

const DataPrepPercentileAggregationFunctionSchema = z.object({
  InputColumnName: z.string().min(1).max(127).optional(),
  PercentileValue: z.number().min(0).max(100),
});

const DataPrepSimpleAggregationFunctionSchema = z.object({
  FunctionType: z.enum([
    "COUNT",
    "DISTINCT_COUNT",
    "SUM",
    "AVERAGE",
    "MEDIAN",
    "MAX",
    "MIN",
    "VARIANCE",
    "STANDARD_DEVIATION",
  ]),
  InputColumnName: z.string().min(1).max(127).optional(),
});

const DataPrepListAggregationFunctionSchema = z.object({
  Distinct: z.boolean(),
  InputColumnName: z.string().min(1).max(127).optional(),
  Separator: z.string(),
});

const DataPrepAggregationFunctionSchema = z.object({
  PercentileAggregation: DataPrepPercentileAggregationFunctionSchema.optional(),
  SimpleAggregation: DataPrepSimpleAggregationFunctionSchema.optional(),
  ListAggregation: DataPrepListAggregationFunctionSchema.optional(),
});

const AggregationSchema = z.object({
  AggregationFunction: DataPrepAggregationFunctionSchema,
  NewColumnName: z.string().min(1).max(127),
  NewColumnId: z.string().min(1).max(64),
});

const AggregateOperationSchema = z.object({
  GroupByColumnNames: z.array(z.string().min(1).max(127)).optional(),
  Alias: z.string().min(1).max(64),
  Aggregations: z.array(AggregationSchema),
  Source: TransformOperationSourceSchema,
});

const PivotedLabelSchema = z.object({
  NewColumnName: z.string().min(1).max(127),
  NewColumnId: z.string().min(1).max(64),
  LabelName: z.string().min(0).max(2047),
});

const PivotConfigurationSchema = z.object({
  LabelColumnName: z.string().min(1).max(127).optional(),
  PivotedLabels: z.array(PivotedLabelSchema),
});

const ValueColumnConfigurationSchema = z.object({
  AggregationFunction: DataPrepAggregationFunctionSchema.optional(),
});

const PivotOperationSchema = z.object({
  PivotConfiguration: PivotConfigurationSchema,
  GroupByColumnNames: z.array(z.string().min(1).max(127)).optional(),
  Alias: z.string().min(1).max(64),
  ValueColumnConfiguration: ValueColumnConfigurationSchema,
  Source: TransformOperationSourceSchema,
});

const TransformStepSchema = z.object({
  ProjectStep: ProjectOperationSchema.describe(
    "A transform operation that projects columns. Operations that come after a projection can only refer to projected columns.",
  ).optional(),
  CreateColumnsStep: CreateColumnsOperationSchema.describe(
    "A transform operation that creates calculated columns. Columns created in one such operation form a lexical closure.",
  ).optional(),
  RenameColumnsStep: RenameColumnsOperationSchema.optional(),
  CastColumnTypesStep: CastColumnTypesOperationSchema.optional(),
  ImportTableStep: ImportTableOperationSchema.optional(),
  UnpivotStep: UnpivotOperationSchema.optional(),
  JoinStep: JoinOperationSchema.optional(),
  AppendStep: AppendOperationSchema.optional(),
  FiltersStep: FiltersOperationSchema.optional(),
  AggregateStep: AggregateOperationSchema.optional(),
  PivotStep: PivotOperationSchema.optional(),
});

const ParentDataSetSchema = z.object({
  InputColumns: z.array(InputColumnSchema),
  DataSetArn: z.string(),
});

const SourceTableSchema = z.object({
  PhysicalTableId: z.string().min(1).max(64).regex(
    new RegExp("^[0-9a-zA-Z-]*$"),
  ).optional(),
  DataSet: ParentDataSetSchema.optional(),
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
  FolderArns: z.array(z.string()).describe(
    "When you create the dataset, Amazon QuickSight adds the dataset to these folders.",
  ).optional(),
  RowLevelPermissionDataSet: z.object({
    Status: z.enum(["ENABLED", "DISABLED"]).optional(),
    FormatVersion: z.enum(["VERSION_1", "VERSION_2"]).optional(),
    Namespace: z.string().min(0).max(64).regex(new RegExp("^[a-zA-Z0-9._-]*$"))
      .describe(
        "The namespace associated with the dataset that contains permissions for RLS.",
      ).optional(),
    PermissionPolicy: z.enum(["GRANT_ACCESS", "DENY_ACCESS"]),
  }).describe(
    "Information about a dataset that contains permissions for row-level security (RLS). The permissions dataset maps fields to users or groups. For more information, see Using Row-Level Security (RLS) to Restrict Access to a Dataset in the Amazon QuickSight User Guide. The option to deny permissions by setting PermissionPolicy to DENY_ACCESS is not supported for new RLS datasets.",
  ).optional(),
  IngestionWaitPolicy: z.object({
    WaitForSpiceIngestion: z.boolean().describe(
      "Wait for SPICE ingestion to finish to mark dataset creation/update successful. Default (true). Applicable only when DataSetImportMode mode is set to SPICE.",
    ).optional(),
    IngestionWaitTimeInHours: z.number().min(1).max(36).describe(
      "The maximum time (in hours) to wait for Ingestion to complete. Default timeout is 36 hours. Applicable only when DataSetImportMode mode is set to SPICE and WaitForSpiceIngestion is set to true.",
    ).optional(),
  }).describe(
    "Wait policy to use when creating/updating dataset. Default is to wait for SPICE ingestion to finish with timeout of 36 hours.",
  ).optional(),
  ColumnLevelPermissionRules: z.array(ColumnLevelPermissionRuleSchema).describe(
    "A set of one or more definitions of a  ColumnLevelPermissionRule .",
  ).optional(),
  Name: z.string().min(1).max(128).describe("The display name for the dataset.")
    .optional(),
  Permissions: z.array(ResourcePermissionSchema).describe(
    "A list of resource permissions on the dataset.",
  ).optional(),
  UseAs: z.enum(["RLS_RULES"]).optional(),
  Tags: z.array(TagSchema).describe(
    "Contains a map of the key-value pairs for the resource tag or tags assigned to the dataset.",
  ).optional(),
  PhysicalTableMap: z.record(z.string(), PhysicalTableSchema).optional(),
  FieldFolders: z.record(z.string(), FieldFolderSchema).optional(),
  SemanticModelConfiguration: z.object({
    SemanticMetadata: z.array(DataSetSemanticMetadataSchema).optional(),
    TableMap: z.record(z.string(), SemanticTableSchema).optional(),
  }).optional(),
  DataSetId: z.string().optional(),
  PerformanceConfiguration: z.object({
    UniqueKeys: z.array(UniqueKeySchema).optional(),
  }).optional(),
  DataSetRefreshProperties: z.object({
    RefreshConfiguration: RefreshConfigurationSchema.describe(
      "The refresh configuration of a dataset.",
    ).optional(),
    FailureConfiguration: RefreshFailureConfigurationSchema.optional(),
  }).describe("The refresh properties of a dataset.").optional(),
  RowLevelPermissionTagConfiguration: z.object({
    Status: z.enum(["ENABLED", "DISABLED"]).optional(),
    TagRules: z.array(RowLevelPermissionTagRuleSchema).describe(
      "A set of rules associated with row-level security, such as the tag names and columns that they are assigned to.",
    ),
    TagRuleConfigurations: z.array(z.array(z.string().min(1).max(128)))
      .describe(
        "A list of tag configuration rules to apply to a dataset. All tag configurations have the OR condition. Tags within each tile will be joined (AND). At least one rule in this structure must have all tag values assigned to it to apply Row-level security (RLS) to the dataset.",
      ).optional(),
  }).describe(
    "The configuration of tags on a dataset to set row-level security.",
  ).optional(),
  ColumnGroups: z.array(ColumnGroupSchema).describe(
    "Groupings of columns that work together in certain Amazon QuickSight features. Currently, only geospatial hierarchy is supported.",
  ).optional(),
  ImportMode: z.enum(["SPICE", "DIRECT_QUERY"]).optional(),
  DatasetParameters: z.array(DatasetParameterSchema).describe(
    "The parameter declarations of the dataset.",
  ).optional(),
  LogicalTableMap: z.record(z.string(), LogicalTableSchema).optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  DataSetUsageConfiguration: z.object({
    DisableUseAsImportedSource: z.boolean().describe(
      "An option that controls whether a child dataset that's stored in QuickSight can use this dataset as a source.",
    ).optional(),
    DisableUseAsDirectQuerySource: z.boolean().describe(
      "An option that controls whether a child dataset of a direct query can use this dataset as a source.",
    ).optional(),
  }).describe(
    "The usage configuration to apply to child datasets that reference this dataset as a source.",
  ).optional(),
  DataPrepConfiguration: z.object({
    DestinationTableMap: z.record(z.string(), DestinationTableSchema),
    TransformStepMap: z.record(z.string(), TransformStepSchema),
    SourceTableMap: z.record(z.string(), SourceTableSchema),
  }).optional(),
});

const StateSchema = z.object({
  CreatedTime: z.string().optional(),
  FolderArns: z.array(z.string()).optional(),
  ConsumedSpiceCapacityInBytes: z.number().optional(),
  RowLevelPermissionDataSet: RowLevelPermissionDataSetSchema.optional(),
  IngestionWaitPolicy: z.object({
    WaitForSpiceIngestion: z.boolean(),
    IngestionWaitTimeInHours: z.number(),
  }).optional(),
  ColumnLevelPermissionRules: z.array(ColumnLevelPermissionRuleSchema)
    .optional(),
  Name: z.string().optional(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  UseAs: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  PhysicalTableMap: z.record(z.string(), z.unknown()).optional(),
  FieldFolders: z.record(z.string(), z.unknown()).optional(),
  LastUpdatedTime: z.string().optional(),
  SemanticModelConfiguration: z.object({
    SemanticMetadata: z.array(DataSetSemanticMetadataSchema),
    TableMap: z.record(z.string(), z.unknown()),
  }).optional(),
  DataSetId: z.string(),
  PerformanceConfiguration: z.object({
    UniqueKeys: z.array(UniqueKeySchema),
  }).optional(),
  DataSetRefreshProperties: z.object({
    RefreshConfiguration: RefreshConfigurationSchema,
    FailureConfiguration: RefreshFailureConfigurationSchema,
  }).optional(),
  RowLevelPermissionTagConfiguration: RowLevelPermissionTagConfigurationSchema
    .optional(),
  ColumnGroups: z.array(ColumnGroupSchema).optional(),
  ImportMode: z.string().optional(),
  DatasetParameters: z.array(DatasetParameterSchema).optional(),
  LogicalTableMap: z.record(z.string(), z.unknown()).optional(),
  AwsAccountId: z.string(),
  DataSetUsageConfiguration: z.object({
    DisableUseAsImportedSource: z.boolean(),
    DisableUseAsDirectQuerySource: z.boolean(),
  }).optional(),
  OutputColumns: z.array(z.object({
    Type: z.string(),
    Description: z.string(),
    SubType: z.string(),
    Id: z.string(),
    Name: z.string(),
  })).optional(),
  DataPrepConfiguration: z.object({
    DestinationTableMap: z.record(z.string(), z.unknown()),
    TransformStepMap: z.record(z.string(), z.unknown()),
    SourceTableMap: z.record(z.string(), z.unknown()),
  }).optional(),
  Arn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FolderArns: z.array(z.string()).describe(
    "When you create the dataset, Amazon QuickSight adds the dataset to these folders.",
  ).optional(),
  RowLevelPermissionDataSet: z.object({
    Status: z.enum(["ENABLED", "DISABLED"]).optional(),
    FormatVersion: z.enum(["VERSION_1", "VERSION_2"]).optional(),
    Namespace: z.string().min(0).max(64).regex(new RegExp("^[a-zA-Z0-9._-]*$"))
      .describe(
        "The namespace associated with the dataset that contains permissions for RLS.",
      ).optional(),
    PermissionPolicy: z.enum(["GRANT_ACCESS", "DENY_ACCESS"]).optional(),
  }).describe(
    "Information about a dataset that contains permissions for row-level security (RLS). The permissions dataset maps fields to users or groups. For more information, see Using Row-Level Security (RLS) to Restrict Access to a Dataset in the Amazon QuickSight User Guide. The option to deny permissions by setting PermissionPolicy to DENY_ACCESS is not supported for new RLS datasets.",
  ).optional(),
  IngestionWaitPolicy: z.object({
    WaitForSpiceIngestion: z.boolean().describe(
      "Wait for SPICE ingestion to finish to mark dataset creation/update successful. Default (true). Applicable only when DataSetImportMode mode is set to SPICE.",
    ).optional(),
    IngestionWaitTimeInHours: z.number().min(1).max(36).describe(
      "The maximum time (in hours) to wait for Ingestion to complete. Default timeout is 36 hours. Applicable only when DataSetImportMode mode is set to SPICE and WaitForSpiceIngestion is set to true.",
    ).optional(),
  }).describe(
    "Wait policy to use when creating/updating dataset. Default is to wait for SPICE ingestion to finish with timeout of 36 hours.",
  ).optional(),
  ColumnLevelPermissionRules: z.array(ColumnLevelPermissionRuleSchema).describe(
    "A set of one or more definitions of a  ColumnLevelPermissionRule .",
  ).optional(),
  Name: z.string().min(1).max(128).describe("The display name for the dataset.")
    .optional(),
  Permissions: z.array(ResourcePermissionSchema).describe(
    "A list of resource permissions on the dataset.",
  ).optional(),
  UseAs: z.enum(["RLS_RULES"]).optional(),
  Tags: z.array(TagSchema).describe(
    "Contains a map of the key-value pairs for the resource tag or tags assigned to the dataset.",
  ).optional(),
  PhysicalTableMap: z.record(z.string(), PhysicalTableSchema).optional(),
  FieldFolders: z.record(z.string(), FieldFolderSchema).optional(),
  SemanticModelConfiguration: z.object({
    SemanticMetadata: z.array(DataSetSemanticMetadataSchema).optional(),
    TableMap: z.record(z.string(), SemanticTableSchema).optional(),
  }).optional(),
  DataSetId: z.string().optional(),
  PerformanceConfiguration: z.object({
    UniqueKeys: z.array(UniqueKeySchema).optional(),
  }).optional(),
  DataSetRefreshProperties: z.object({
    RefreshConfiguration: RefreshConfigurationSchema.describe(
      "The refresh configuration of a dataset.",
    ).optional(),
    FailureConfiguration: RefreshFailureConfigurationSchema.optional(),
  }).describe("The refresh properties of a dataset.").optional(),
  RowLevelPermissionTagConfiguration: z.object({
    Status: z.enum(["ENABLED", "DISABLED"]).optional(),
    TagRules: z.array(RowLevelPermissionTagRuleSchema).describe(
      "A set of rules associated with row-level security, such as the tag names and columns that they are assigned to.",
    ).optional(),
    TagRuleConfigurations: z.array(z.array(z.string().min(1).max(128)))
      .describe(
        "A list of tag configuration rules to apply to a dataset. All tag configurations have the OR condition. Tags within each tile will be joined (AND). At least one rule in this structure must have all tag values assigned to it to apply Row-level security (RLS) to the dataset.",
      ).optional(),
  }).describe(
    "The configuration of tags on a dataset to set row-level security.",
  ).optional(),
  ColumnGroups: z.array(ColumnGroupSchema).describe(
    "Groupings of columns that work together in certain Amazon QuickSight features. Currently, only geospatial hierarchy is supported.",
  ).optional(),
  ImportMode: z.enum(["SPICE", "DIRECT_QUERY"]).optional(),
  DatasetParameters: z.array(DatasetParameterSchema).describe(
    "The parameter declarations of the dataset.",
  ).optional(),
  LogicalTableMap: z.record(z.string(), LogicalTableSchema).optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  DataSetUsageConfiguration: z.object({
    DisableUseAsImportedSource: z.boolean().describe(
      "An option that controls whether a child dataset that's stored in QuickSight can use this dataset as a source.",
    ).optional(),
    DisableUseAsDirectQuerySource: z.boolean().describe(
      "An option that controls whether a child dataset of a direct query can use this dataset as a source.",
    ).optional(),
  }).describe(
    "The usage configuration to apply to child datasets that reference this dataset as a source.",
  ).optional(),
  DataPrepConfiguration: z.object({
    DestinationTableMap: z.record(z.string(), DestinationTableSchema)
      .optional(),
    TransformStepMap: z.record(z.string(), TransformStepSchema).optional(),
    SourceTableMap: z.record(z.string(), SourceTableSchema).optional(),
  }).optional(),
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

/** Swamp extension model for QuickSight DataSet. Registered at `@swamp/aws/quicksight/data-set`. */
export const model = {
  type: "@swamp/aws/quicksight/data-set",
  version: "2026.06.06.1",
  upgrades: [
    {
      toVersion: "2026.04.01.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
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
      toVersion: "2026.04.03.3",
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
      toVersion: "2026.05.15.1",
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
      description: "QuickSight DataSet resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QuickSight DataSet",
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
          "AWS::QuickSight::DataSet",
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
      description: "Get a QuickSight DataSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight DataSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::QuickSight::DataSet",
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
      description: "Update a QuickSight DataSet",
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
          existing.DataSetId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QuickSight::DataSet",
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
          "AWS::QuickSight::DataSet",
          identifier,
          currentState,
          desiredState,
          ["AwsAccountId", "DataSetId"],
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
      description: "Delete a QuickSight DataSet",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight DataSet",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::QuickSight::DataSet",
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
      description: "Sync QuickSight DataSet state from AWS",
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
          existing.DataSetId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QuickSight::DataSet",
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
