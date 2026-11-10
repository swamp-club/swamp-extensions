// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Auto-generated extension model for @swamp/aws/quicksight/analysis
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any no-control-regex

/**
 * Swamp extension model for QuickSight Analysis (AWS::QuickSight::Analysis).
 *
 * Wraps the CloudFormation resource type as a swamp model so create,
 * get, update, delete, sync, and list can be driven through `swamp model`.
 *
 * @module
 */

import { z } from "npm:zod@4.6.7";
import {
  createResource,
  deleteResource,
  isResourceNotFoundError,
  listResources,
  readResource,
  updateResource,
} from "./_lib/aws.ts";
import type { AwsCredentials } from "./_lib/aws.ts";

const StringParameterSchema = z.object({
  Values: z.array(z.string()).describe("The values of a string parameter."),
  Name: z.string().regex(new RegExp("\\S")).describe(
    "A display name for a string parameter.",
  ),
});

const DecimalParameterSchema = z.object({
  Values: z.array(z.number()).describe("The values for the decimal parameter."),
  Name: z.string().regex(new RegExp("\\S")).describe(
    "A display name for the decimal parameter.",
  ),
});

const IntegerParameterSchema = z.object({
  Values: z.array(z.number()).describe("The values for the integer parameter."),
  Name: z.string().regex(new RegExp("\\S")).describe(
    "The name of the integer parameter.",
  ),
});

const DateTimeParameterSchema = z.object({
  Values: z.array(z.string()).describe(
    "The values for the date-time parameter.",
  ),
  Name: z.string().regex(new RegExp("\\S")).describe(
    "A display name for the date-time parameter.",
  ),
});

const DataSetReferenceSchema = z.object({
  DataSetArn: z.string().describe("Dataset Amazon Resource Name (ARN)."),
  DataSetPlaceholder: z.string().regex(new RegExp("\\S")).describe(
    "Dataset placeholder.",
  ),
});

const TopicReferenceSchema = z.object({
  TopicArn: z.string(),
  TopicPlaceholder: z.string().min(1).max(2048),
});

const AnalysisSourceTemplateSchema = z.object({
  DataSetReferences: z.array(DataSetReferenceSchema).describe(
    "The dataset references of the source template of an analysis.",
  ),
  Arn: z.string().describe(
    "The Amazon Resource Name (ARN) of the source template of an analysis.",
  ),
  TopicReferences: z.array(TopicReferenceSchema).optional(),
});

const VisualHighlightOperationSchema = z.object({
  Trigger: z.enum(["DATA_POINT_CLICK", "DATA_POINT_HOVER", "NONE"]),
});

const VisualCustomActionDefaultsSchema = z.object({
  HighlightOperation: VisualHighlightOperationSchema.optional(),
});

const VisualMessageConfigurationSchema = z.object({
  TitleVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Description: z.string().min(0).max(120).regex(
    new RegExp("^[^*;=`{}~\\x00-\\x08\\x0E-\\x1F\\x7F]*$"),
  ).optional(),
  LinkUrl: z.string().min(0).max(120).regex(
    new RegExp(
      "^(?:(?:[hH][tT][tT][pP][sS]?://|[mM][aA][iI][lL][tT][oO]:)\\S*<<\\$.+?>>\\S*|[hH][tT][tT][pP][sS]?://[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,63}(?::\\d+)?(?:[/?#][^\\s]*)?|[mM][aA][iI][lL][tT][oO]:[^\\s@]+@[a-zA-Z\\d.-]+\\.[a-zA-Z]{2,63})$(?![\\s\\S])",
    ),
  ).optional(),
  LinkVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Enabled: z.boolean().optional(),
  Title: z.string().min(0).max(120).regex(
    new RegExp("^[^*;=`{}~\\x00-\\x08\\x0E-\\x1F\\x7F]*$"),
  ).optional(),
  DescriptionVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  LinkText: z.string().min(0).max(120).regex(
    new RegExp("^[^*;=`{}~\\x00-\\x08\\x0E-\\x1F\\x7F]*$"),
  ).optional(),
});

const VisualMessagesSchema = z.object({
  NoDataMessage: VisualMessageConfigurationSchema.optional(),
});

const AssetOptionsSchema = z.object({
  Timezone: z.string().optional(),
  WeekStart: z.enum([
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ]).optional(),
  CustomActionDefaults: VisualCustomActionDefaultsSchema.optional(),
  VisualMessages: VisualMessagesSchema.optional(),
});

const ColumnIdentifierSchema = z.object({
  ColumnName: z.string().min(1).max(127),
  DataSetIdentifier: z.string().min(0).max(2048).optional(),
  TopicIdentifier: z.string().min(1).max(2048).optional(),
});

const CustomFilterListConfigurationSchema = z.object({
  CategoryValues: z.array(z.string().min(0).max(512)).optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  MatchOperator: z.enum([
    "EQUALS",
    "DOES_NOT_EQUAL",
    "CONTAINS",
    "DOES_NOT_CONTAIN",
    "STARTS_WITH",
    "ENDS_WITH",
  ]),
  SelectAllOptions: z.enum(["FILTER_ALL_VALUES"]).optional(),
});

const CustomFilterConfigurationSchema = z.object({
  CategoryValue: z.string().min(0).max(512).optional(),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  MatchOperator: z.enum([
    "EQUALS",
    "DOES_NOT_EQUAL",
    "CONTAINS",
    "DOES_NOT_CONTAIN",
    "STARTS_WITH",
    "ENDS_WITH",
  ]),
  SelectAllOptions: z.enum(["FILTER_ALL_VALUES"]).optional(),
});

const FilterListConfigurationSchema = z.object({
  CategoryValues: z.array(z.string().min(0).max(512)).optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]).optional(),
  MatchOperator: z.enum([
    "EQUALS",
    "DOES_NOT_EQUAL",
    "CONTAINS",
    "DOES_NOT_CONTAIN",
    "STARTS_WITH",
    "ENDS_WITH",
  ]),
  SelectAllOptions: z.enum(["FILTER_ALL_VALUES"]).optional(),
});

const CategoryFilterConfigurationSchema = z.object({
  CustomFilterListConfiguration: CustomFilterListConfigurationSchema.optional(),
  CustomFilterConfiguration: CustomFilterConfigurationSchema.optional(),
  FilterListConfiguration: FilterListConfigurationSchema.optional(),
});

const FontSizeSchema = z.object({
  Relative: z.enum(["EXTRA_SMALL", "SMALL", "MEDIUM", "LARGE", "EXTRA_LARGE"])
    .optional(),
  Absolute: z.string().describe("The font size that you want to use in px.")
    .optional(),
});

const FontWeightSchema = z.object({
  Name: z.enum(["NORMAL", "BOLD"]).optional(),
});

const FontConfigurationSchema = z.object({
  FontFamily: z.string().describe("The font family that you want to use.")
    .optional(),
  FontStyle: z.enum(["NORMAL", "ITALIC"]).optional(),
  FontSize: FontSizeSchema.optional(),
  FontDecoration: z.enum(["UNDERLINE", "NONE"]).optional(),
  FontColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  FontWeight: FontWeightSchema.optional(),
});

const LabelOptionsSchema = z.object({
  CustomLabel: z.string().optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FontConfiguration: FontConfigurationSchema.optional(),
});

const SheetControlInfoIconLabelOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  InfoIconText: z.string().min(1).max(100).optional(),
});

const SliderControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
});

const DefaultSliderControlOptionsSchema = z.object({
  Type: z.enum(["SINGLE_POINT", "RANGE"]).optional(),
  StepSize: z.number(),
  DisplayOptions: SliderControlDisplayOptionsSchema.optional(),
  MaximumValue: z.number(),
  MinimumValue: z.number(),
});

const RelativeDateTimeControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
  DateTimeFormat: z.string().min(1).max(128).optional(),
});

const DefaultRelativeDateTimeControlOptionsSchema = z.object({
  DisplayOptions: RelativeDateTimeControlDisplayOptionsSchema.optional(),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
});

const TextControlPlaceholderOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const TextFieldControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  PlaceholderOptions: TextControlPlaceholderOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
});

const DefaultTextFieldControlOptionsSchema = z.object({
  DisplayOptions: TextFieldControlDisplayOptionsSchema.optional(),
});

const TextAreaControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  PlaceholderOptions: TextControlPlaceholderOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
});

const DefaultTextAreaControlOptionsSchema = z.object({
  Delimiter: z.string().min(1).max(2048).optional(),
  DisplayOptions: TextAreaControlDisplayOptionsSchema.optional(),
});

const ListControlSelectAllOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const DropDownControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  SelectAllOptions: ListControlSelectAllOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
});

const FilterSelectableValuesSchema = z.object({
  Values: z.array(z.string()).optional(),
});

const DefaultFilterDropDownControlOptionsSchema = z.object({
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: DropDownControlDisplayOptionsSchema.optional(),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
  SelectableValues: FilterSelectableValuesSchema.optional(),
});

const DateTimePickerControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
  HelperTextVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  DateIconVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  DateTimeFormat: z.string().min(1).max(128).optional(),
});

const DefaultDateTimePickerControlOptionsSchema = z.object({
  Type: z.enum(["SINGLE_VALUED", "DATE_RANGE"]).optional(),
  DisplayOptions: DateTimePickerControlDisplayOptionsSchema.optional(),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
});

const ListControlSearchOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const ListControlDisplayOptionsSchema = z.object({
  TitleOptions: LabelOptionsSchema.optional(),
  SearchOptions: ListControlSearchOptionsSchema.optional(),
  SelectAllOptions: ListControlSelectAllOptionsSchema.optional(),
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsSchema.optional(),
});

const DefaultFilterListControlOptionsSchema = z.object({
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: ListControlDisplayOptionsSchema.optional(),
  SelectableValues: FilterSelectableValuesSchema.optional(),
});

const DefaultFilterControlOptionsSchema = z.object({
  DefaultSliderOptions: DefaultSliderControlOptionsSchema.optional(),
  DefaultRelativeDateTimeOptions: DefaultRelativeDateTimeControlOptionsSchema
    .optional(),
  DefaultTextFieldOptions: DefaultTextFieldControlOptionsSchema.optional(),
  DefaultTextAreaOptions: DefaultTextAreaControlOptionsSchema.optional(),
  DefaultDropdownOptions: DefaultFilterDropDownControlOptionsSchema.optional(),
  DefaultDateTimePickerOptions: DefaultDateTimePickerControlOptionsSchema
    .optional(),
  DefaultListOptions: DefaultFilterListControlOptionsSchema.optional(),
});

const DefaultFilterControlConfigurationSchema = z.object({
  ControlOptions: DefaultFilterControlOptionsSchema,
  Title: z.string().min(1).max(2048),
});

const CategoryInnerFilterSchema = z.object({
  Configuration: CategoryFilterConfigurationSchema,
  Column: ColumnIdentifierSchema,
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
});

const InnerFilterSchema = z.object({
  CategoryInnerFilter: CategoryInnerFilterSchema.optional(),
});

const NestedFilterSchema = z.object({
  Column: ColumnIdentifierSchema,
  InnerFilter: InnerFilterSchema,
  IncludeInnerSet: z.boolean(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const AttributeAggregationFunctionSchema = z.object({
  SimpleAttributeAggregation: z.enum(["UNIQUE_VALUE"]).optional(),
  ValueForMultipleValues: z.string().optional(),
});

const PercentileAggregationSchema = z.object({
  PercentileValue: z.number().min(0).max(100).optional(),
});

const NumericalAggregationFunctionSchema = z.object({
  PercentileAggregation: PercentileAggregationSchema.optional(),
  SimpleNumericalAggregation: z.enum([
    "SUM",
    "AVERAGE",
    "MIN",
    "MAX",
    "COUNT",
    "DISTINCT_COUNT",
    "VAR",
    "VARP",
    "STDEV",
    "STDEVP",
    "MEDIAN",
  ]).optional(),
});

const AggregationFunctionSchema = z.object({
  AttributeAggregationFunction: AttributeAggregationFunctionSchema.optional(),
  DateAggregationFunction: z.enum(["COUNT", "DISTINCT_COUNT", "MIN", "MAX"])
    .optional(),
  NumericalAggregationFunction: NumericalAggregationFunctionSchema.optional(),
  CategoricalAggregationFunction: z.enum(["COUNT", "DISTINCT_COUNT"])
    .optional(),
});

const NumericEqualityFilterSchema = z.object({
  AggregationFunction: AggregationFunctionSchema.optional(),
  Column: ColumnIdentifierSchema,
  Value: z.number().optional(),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  MatchOperator: z.enum(["EQUALS", "DOES_NOT_EQUAL"]),
  SelectAllOptions: z.enum(["FILTER_ALL_VALUES"]).optional(),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const NumericRangeFilterValueSchema = z.object({
  StaticValue: z.number().optional(),
  Parameter: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
});

const NumericRangeFilterSchema = z.object({
  AggregationFunction: AggregationFunctionSchema.optional(),
  Column: ColumnIdentifierSchema,
  IncludeMaximum: z.boolean().optional(),
  RangeMinimum: NumericRangeFilterValueSchema.optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  SelectAllOptions: z.enum(["FILTER_ALL_VALUES"]).optional(),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  RangeMaximum: NumericRangeFilterValueSchema.optional(),
  IncludeMinimum: z.boolean().optional(),
});

const RollingDateConfigurationSchema = z.object({
  Expression: z.string().min(1).max(4096),
  DataSetIdentifier: z.string().min(0).max(2048).optional(),
});

const TimeRangeFilterValueSchema = z.object({
  RollingDate: RollingDateConfigurationSchema.optional(),
  StaticValue: z.string().optional(),
  Parameter: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
});

const ExcludePeriodConfigurationSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  Amount: z.number(),
  Granularity: z.enum([
    "YEAR",
    "QUARTER",
    "MONTH",
    "WEEK",
    "DAY",
    "HOUR",
    "MINUTE",
    "SECOND",
    "MILLISECOND",
  ]),
});

const TimeRangeFilterSchema = z.object({
  RangeMinimumValue: TimeRangeFilterValueSchema.optional(),
  Column: ColumnIdentifierSchema,
  RangeMaximumValue: TimeRangeFilterValueSchema.optional(),
  IncludeMaximum: z.boolean().optional(),
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
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  IncludeMinimum: z.boolean().optional(),
  ExcludePeriodConfiguration: ExcludePeriodConfigurationSchema.optional(),
});

const AnchorDateConfigurationSchema = z.object({
  AnchorOption: z.enum(["NOW"]).optional(),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
});

const RelativeDatesFilterSchema = z.object({
  RelativeDateValue: z.number().optional(),
  Column: ColumnIdentifierSchema,
  RelativeDateType: z.enum(["PREVIOUS", "THIS", "LAST", "NOW", "NEXT"]),
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
  ]),
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
  NullOption: z.enum(["ALL_VALUES", "NULLS_ONLY", "NON_NULLS_ONLY"]),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  AnchorDateConfiguration: AnchorDateConfigurationSchema,
  MinimumGranularity: z.enum([
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
  ExcludePeriodConfiguration: ExcludePeriodConfigurationSchema.optional(),
});

const AggregationSortConfigurationSchema = z.object({
  AggregationFunction: AggregationFunctionSchema.optional(),
  SortDirection: z.enum(["ASC", "DESC"]),
  Column: ColumnIdentifierSchema,
});

const TopBottomFilterSchema = z.object({
  AggregationSortConfigurations: z.array(AggregationSortConfigurationSchema),
  Column: ColumnIdentifierSchema,
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
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
  Limit: z.number().optional(),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const TimeEqualityFilterSchema = z.object({
  Column: ColumnIdentifierSchema,
  RollingDate: RollingDateConfigurationSchema.optional(),
  Value: z.string().optional(),
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
  ParameterName: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const CategoryFilterSchema = z.object({
  Configuration: CategoryFilterConfigurationSchema,
  Column: ColumnIdentifierSchema,
  DefaultFilterControlConfiguration: DefaultFilterControlConfigurationSchema
    .optional(),
  FilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const FilterSchema = z.object({
  NestedFilter: NestedFilterSchema.optional(),
  NumericEqualityFilter: NumericEqualityFilterSchema.optional(),
  NumericRangeFilter: NumericRangeFilterSchema.optional(),
  TimeRangeFilter: TimeRangeFilterSchema.optional(),
  RelativeDatesFilter: RelativeDatesFilterSchema.optional(),
  TopBottomFilter: TopBottomFilterSchema.optional(),
  TimeEqualityFilter: TimeEqualityFilterSchema.optional(),
  CategoryFilter: CategoryFilterSchema.optional(),
});

const SheetVisualScopingConfigurationSchema = z.object({
  Scope: z.enum(["ALL_VISUALS", "SELECTED_VISUALS"]),
  SheetId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  VisualIds: z.array(
    z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ).optional(),
});

const SelectedSheetsFilterScopeConfigurationSchema = z.object({
  SheetVisualScopingConfigurations: z.array(
    SheetVisualScopingConfigurationSchema,
  ).optional(),
});

const FilterScopeConfigurationSchema = z.object({
  AllSheets: z.record(z.string(), z.unknown()).optional(),
  SelectedSheets: SelectedSheetsFilterScopeConfigurationSchema.optional(),
});

const FilterGroupSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  Filters: z.array(FilterSchema),
  CrossDataset: z.enum(["ALL_DATASETS", "SINGLE_DATASET"]),
  ScopeConfiguration: FilterScopeConfigurationSchema,
  FilterGroupId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const QueryExecutionOptionsSchema = z.object({
  QueryExecutionMode: z.enum(["AUTO", "MANUAL"]).optional(),
});

const StaticFileUrlSourceOptionsSchema = z.object({
  Url: z.string(),
});

const StaticFileS3SourceOptionsSchema = z.object({
  BucketName: z.string(),
  ObjectKey: z.string(),
  Region: z.string(),
});

const StaticFileSourceSchema = z.object({
  UrlOptions: StaticFileUrlSourceOptionsSchema.optional(),
  S3Options: StaticFileS3SourceOptionsSchema.optional(),
});

const ImageStaticFileSchema = z.object({
  StaticFileId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Source: StaticFileSourceSchema.optional(),
});

const SpatialStaticFileSchema = z.object({
  StaticFileId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Source: StaticFileSourceSchema.optional(),
});

const StaticFileSchema = z.object({
  ImageStaticFile: ImageStaticFileSchema.optional(),
  SpatialStaticFile: SpatialStaticFileSchema.optional(),
});

const TopicIdentifierDeclarationSchema = z.object({
  Identifier: z.string().min(1).max(2048),
  TopicArn: z.string(),
});

const CalculatedFieldSchema = z.object({
  Expression: z.string().min(1).max(32000),
  DataSetIdentifier: z.string().min(0).max(2048).optional(),
  TopicIdentifier: z.string().min(1).max(2048).optional(),
  Name: z.string().min(1).max(127),
});

const DataSetIdentifierDeclarationSchema = z.object({
  Identifier: z.string().min(0).max(2048),
  DataSetArn: z.string(),
});

const NegativeValueConfigurationSchema = z.object({
  DisplayMode: z.enum(["POSITIVE", "NEGATIVE"]),
});

const DecimalPlacesConfigurationSchema = z.object({
  DecimalPlaces: z.number().min(0).max(20),
});

const NullValueFormatConfigurationSchema = z.object({
  NullString: z.string().min(1).max(128),
});

const ThousandSeparatorOptionsSchema = z.object({
  Symbol: z.enum(["COMMA", "DOT", "SPACE"]).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  GroupingStyle: z.enum(["DEFAULT", "LAKHS"]).optional(),
});

const NumericSeparatorConfigurationSchema = z.object({
  DecimalSeparator: z.enum(["COMMA", "DOT", "SPACE"]).optional(),
  ThousandsSeparator: ThousandSeparatorOptionsSchema.optional(),
});

const NumberDisplayFormatConfigurationSchema = z.object({
  NegativeValueConfiguration: NegativeValueConfigurationSchema.optional(),
  DecimalPlacesConfiguration: DecimalPlacesConfigurationSchema.optional(),
  NumberScale: z.enum([
    "NONE",
    "AUTO",
    "THOUSANDS",
    "MILLIONS",
    "BILLIONS",
    "TRILLIONS",
    "LAKHS",
    "CRORES",
  ]).optional(),
  NullValueFormatConfiguration: NullValueFormatConfigurationSchema.optional(),
  Suffix: z.string().min(1).max(128).optional(),
  SeparatorConfiguration: NumericSeparatorConfigurationSchema.optional(),
  Prefix: z.string().min(1).max(128).optional(),
});

const CurrencyDisplayFormatConfigurationSchema = z.object({
  NegativeValueConfiguration: NegativeValueConfigurationSchema.optional(),
  DecimalPlacesConfiguration: DecimalPlacesConfigurationSchema.optional(),
  NumberScale: z.enum([
    "NONE",
    "AUTO",
    "THOUSANDS",
    "MILLIONS",
    "BILLIONS",
    "TRILLIONS",
    "LAKHS",
    "CRORES",
  ]).optional(),
  NullValueFormatConfiguration: NullValueFormatConfigurationSchema.optional(),
  Suffix: z.string().min(1).max(128).optional(),
  SeparatorConfiguration: NumericSeparatorConfigurationSchema.optional(),
  Symbol: z.string().regex(new RegExp("^[A-Z]{3}$")).optional(),
  Prefix: z.string().min(1).max(128).optional(),
});

const PercentageDisplayFormatConfigurationSchema = z.object({
  NegativeValueConfiguration: NegativeValueConfigurationSchema.optional(),
  DecimalPlacesConfiguration: DecimalPlacesConfigurationSchema.optional(),
  NullValueFormatConfiguration: NullValueFormatConfigurationSchema.optional(),
  Suffix: z.string().min(1).max(128).optional(),
  SeparatorConfiguration: NumericSeparatorConfigurationSchema.optional(),
  Prefix: z.string().min(1).max(128).optional(),
});

const NumericFormatConfigurationSchema = z.object({
  NumberDisplayFormatConfiguration: NumberDisplayFormatConfigurationSchema
    .optional(),
  CurrencyDisplayFormatConfiguration: CurrencyDisplayFormatConfigurationSchema
    .optional(),
  PercentageDisplayFormatConfiguration:
    PercentageDisplayFormatConfigurationSchema.optional(),
});

const NumberFormatConfigurationSchema = z.object({
  FormatConfiguration: NumericFormatConfigurationSchema.optional(),
});

const DateTimeFormatConfigurationSchema = z.object({
  NumericFormatConfiguration: NumericFormatConfigurationSchema.optional(),
  NullValueFormatConfiguration: NullValueFormatConfigurationSchema.optional(),
  DateTimeFormat: z.string().min(1).max(128).optional(),
});

const StringFormatConfigurationSchema = z.object({
  NumericFormatConfiguration: NumericFormatConfigurationSchema.optional(),
  NullValueFormatConfiguration: NullValueFormatConfigurationSchema.optional(),
});

const FormatConfigurationSchema = z.object({
  NumberFormatConfiguration: NumberFormatConfigurationSchema.optional(),
  DateTimeFormatConfiguration: DateTimeFormatConfigurationSchema.optional(),
  StringFormatConfiguration: StringFormatConfigurationSchema.optional(),
});

const DecalSettingsSchema = z.object({
  DecalStyleType: z.enum(["Manual", "Auto"]).optional(),
  DecalColor: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  DecalVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  DecalPatternType: z.enum([
    "SOLID",
    "DIAGONAL_MEDIUM",
    "CIRCLE_MEDIUM",
    "DIAMOND_GRID_MEDIUM",
    "CHECKERBOARD_MEDIUM",
    "TRIANGLE_MEDIUM",
    "DIAGONAL_OPPOSITE_MEDIUM",
    "DIAMOND_MEDIUM",
    "DIAGONAL_LARGE",
    "CIRCLE_LARGE",
    "DIAMOND_GRID_LARGE",
    "CHECKERBOARD_LARGE",
    "TRIANGLE_LARGE",
    "DIAGONAL_OPPOSITE_LARGE",
    "DIAMOND_LARGE",
    "DIAGONAL_SMALL",
    "CIRCLE_SMALL",
    "DIAMOND_GRID_SMALL",
    "CHECKERBOARD_SMALL",
    "TRIANGLE_SMALL",
    "DIAGONAL_OPPOSITE_SMALL",
    "DIAMOND_SMALL",
  ]).optional(),
  ElementValue: z.string().min(0).max(1024).optional(),
});

const DecalSettingsConfigurationSchema = z.object({
  CustomDecalSettings: z.array(DecalSettingsSchema).optional(),
});

const CustomColorSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")),
  FieldValue: z.string().min(0).max(2048).optional(),
  SpecialValue: z.enum(["EMPTY", "NULL", "OTHER"]).optional(),
});

const ColorsConfigurationSchema = z.object({
  CustomColors: z.array(CustomColorSchema).optional(),
});

const ColumnConfigurationSchema = z.object({
  Role: z.enum(["DIMENSION", "MEASURE"]).optional(),
  FormatConfiguration: FormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  DecalSettingsConfiguration: DecalSettingsConfigurationSchema.optional(),
  ColorsConfiguration: ColorsConfigurationSchema.optional(),
});

const FreeFormLayoutScreenCanvasSizeOptionsSchema = z.object({
  OptimizedViewPortWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ),
});

const FreeFormLayoutCanvasSizeOptionsSchema = z.object({
  ScreenCanvasSizeOptions: FreeFormLayoutScreenCanvasSizeOptionsSchema
    .optional(),
});

const DefaultFreeFormLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: FreeFormLayoutCanvasSizeOptionsSchema,
});

const GridLayoutScreenCanvasSizeOptionsSchema = z.object({
  OptimizedViewPortWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  ResizeOption: z.enum(["FIXED", "RESPONSIVE"]),
});

const GridLayoutCanvasSizeOptionsSchema = z.object({
  ScreenCanvasSizeOptions: GridLayoutScreenCanvasSizeOptionsSchema.optional(),
});

const DefaultGridLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: GridLayoutCanvasSizeOptionsSchema,
});

const DefaultInteractiveLayoutConfigurationSchema = z.object({
  FreeForm: DefaultFreeFormLayoutConfigurationSchema.optional(),
  Grid: DefaultGridLayoutConfigurationSchema.optional(),
});

const SpacingSchema = z.object({
  Left: z.string().describe(
    "String based length that is composed of value and unit",
  ).optional(),
  Top: z.string().describe(
    "String based length that is composed of value and unit",
  ).optional(),
  Right: z.string().describe(
    "String based length that is composed of value and unit",
  ).optional(),
  Bottom: z.string().describe(
    "String based length that is composed of value and unit",
  ).optional(),
});

const SectionBasedLayoutPaperCanvasSizeOptionsSchema = z.object({
  PaperMargin: SpacingSchema.optional(),
  PaperSize: z.enum([
    "US_LETTER",
    "US_LEGAL",
    "US_TABLOID_LEDGER",
    "A0",
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
    "JIS_B4",
    "JIS_B5",
  ]).optional(),
  PaperOrientation: z.enum(["PORTRAIT", "LANDSCAPE"]).optional(),
});

const SectionBasedLayoutCanvasSizeOptionsSchema = z.object({
  PaperCanvasSizeOptions: SectionBasedLayoutPaperCanvasSizeOptionsSchema
    .optional(),
});

const DefaultSectionBasedLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: SectionBasedLayoutCanvasSizeOptionsSchema,
});

const DefaultPaginatedLayoutConfigurationSchema = z.object({
  SectionBased: DefaultSectionBasedLayoutConfigurationSchema.optional(),
});

const DefaultNewSheetConfigurationSchema = z.object({
  SheetContentType: z.enum(["PAGINATED", "INTERACTIVE"]).optional(),
  InteractiveLayoutConfiguration: DefaultInteractiveLayoutConfigurationSchema
    .optional(),
  PaginatedLayoutConfiguration: DefaultPaginatedLayoutConfigurationSchema
    .optional(),
});

const AnalysisDefaultsSchema = z.object({
  DefaultNewSheetConfiguration: DefaultNewSheetConfigurationSchema,
});

const ParameterSliderControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  StepSize: z.number(),
  DisplayOptions: SliderControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  Title: z.string().min(1).max(2048),
  MaximumValue: z.number(),
  MinimumValue: z.number(),
});

const ParameterTextAreaControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  Delimiter: z.string().min(1).max(2048).optional(),
  DisplayOptions: TextAreaControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  Title: z.string().min(1).max(2048),
});

const CascadingControlSourceSchema = z.object({
  SourceSheetControlId: z.string().optional(),
  ColumnToMatch: ColumnIdentifierSchema.optional(),
});

const CascadingControlConfigurationSchema = z.object({
  SourceControls: z.array(CascadingControlSourceSchema).optional(),
});

const ParameterSelectableValuesSchema = z.object({
  LinkToDataSetColumn: ColumnIdentifierSchema.optional(),
  Values: z.array(z.string()).optional(),
});

const ParameterDropDownControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: DropDownControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  CascadingControlConfiguration: CascadingControlConfigurationSchema.optional(),
  Title: z.string().min(1).max(2048),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
  SelectableValues: ParameterSelectableValuesSchema.optional(),
});

const ParameterTextFieldControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  DisplayOptions: TextFieldControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  Title: z.string().min(1).max(2048),
});

const ParameterListControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: ListControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  CascadingControlConfiguration: CascadingControlConfigurationSchema.optional(),
  Title: z.string().min(1).max(2048),
  SelectableValues: ParameterSelectableValuesSchema.optional(),
});

const ParameterDateTimePickerControlSchema = z.object({
  ParameterControlId: z.string().min(1).max(512).regex(
    new RegExp("^[\\w\\-]+$"),
  ),
  DisplayOptions: DateTimePickerControlDisplayOptionsSchema.optional(),
  SourceParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  Title: z.string().min(1).max(2048),
});

const ParameterControlSchema = z.object({
  Slider: ParameterSliderControlSchema.optional(),
  TextArea: ParameterTextAreaControlSchema.optional(),
  Dropdown: ParameterDropDownControlSchema.optional(),
  TextField: ParameterTextFieldControlSchema.optional(),
  List: ParameterListControlSchema.optional(),
  DateTimePicker: ParameterDateTimePickerControlSchema.optional(),
});

const LocalNavigationConfigurationSchema = z.object({
  TargetSheetId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const CustomActionNavigationOperationSchema = z.object({
  LocalNavigationConfiguration: LocalNavigationConfigurationSchema.optional(),
});

const CustomParameterValuesSchema = z.object({
  DecimalValues: z.array(z.number()).optional(),
  IntegerValues: z.array(z.number()).optional(),
  StringValues: z.array(z.string()).optional(),
  DateTimeValues: z.array(z.string()).optional(),
});

const CustomValuesConfigurationSchema = z.object({
  IncludeNullValue: z.boolean().optional(),
  CustomValues: CustomParameterValuesSchema,
});

const DestinationParameterValueConfigurationSchema = z.object({
  CustomValuesConfiguration: CustomValuesConfigurationSchema.optional(),
  SourceParameterName: z.string().optional(),
  SelectAllValueOptions: z.enum(["ALL_VALUES"]).optional(),
  SourceField: z.string().min(1).max(512).optional(),
  SourceColumn: ColumnIdentifierSchema.optional(),
});

const SetParameterValueConfigurationSchema = z.object({
  DestinationParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  Value: DestinationParameterValueConfigurationSchema,
});

const CustomActionSetParametersOperationSchema = z.object({
  ParameterValueConfigurations: z.array(SetParameterValueConfigurationSchema),
});

const CustomActionURLOperationSchema = z.object({
  URLTemplate: z.string().min(1).max(2048),
  URLTarget: z.enum(["NEW_TAB", "NEW_WINDOW", "SAME_TAB"]),
});

const ImageCustomActionOperationSchema = z.object({
  NavigationOperation: CustomActionNavigationOperationSchema.optional(),
  SetParametersOperation: CustomActionSetParametersOperationSchema.optional(),
  URLOperation: CustomActionURLOperationSchema.optional(),
});

const ImageCustomActionSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  Trigger: z.enum(["CLICK", "MENU"]),
  CustomActionId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().min(1).max(256),
  ActionOperations: z.array(ImageCustomActionOperationSchema),
});

const SheetImageTooltipTextSchema = z.object({
  PlainText: z.string().min(1).max(1024).optional(),
});

const SheetImageTooltipConfigurationSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  TooltipText: SheetImageTooltipTextSchema.optional(),
});

const SheetImageScalingConfigurationSchema = z.object({
  ScalingType: z.enum([
    "SCALE_TO_WIDTH",
    "SCALE_TO_HEIGHT",
    "SCALE_TO_CONTAINER",
    "SCALE_NONE",
  ]).optional(),
});

const ImageMenuOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const ImageInteractionOptionsSchema = z.object({
  ImageMenuOption: ImageMenuOptionSchema.optional(),
});

const SheetImageStaticFileSourceSchema = z.object({
  StaticFileId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const SheetImageSourceSchema = z.object({
  SheetImageStaticFileSource: SheetImageStaticFileSourceSchema.optional(),
});

const SheetImageSchema = z.object({
  Actions: z.array(ImageCustomActionSchema).optional(),
  SheetImageId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Tooltip: SheetImageTooltipConfigurationSchema.optional(),
  Scaling: SheetImageScalingConfigurationSchema.optional(),
  Interactions: ImageInteractionOptionsSchema.optional(),
  Source: SheetImageSourceSchema,
  ImageContentAltText: z.string().min(1).max(1024).optional(),
});

const GridLayoutElementBorderStyleSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Width: z.string().min(0).max(50).describe(
    "String to encapsulate the most generic way Width can be formatted with whatever units (px, em etc)",
  ).optional(),
});

const LoadingAnimationSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const GridLayoutElementBackgroundStyleSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const GridLayoutElementSchema = z.object({
  ElementType: z.enum([
    "VISUAL",
    "FILTER_CONTROL",
    "PARAMETER_CONTROL",
    "TEXT_BOX",
    "IMAGE",
  ]),
  ColumnSpan: z.number().min(1).max(36),
  ColumnIndex: z.number().min(0).max(35).optional(),
  RowIndex: z.number().min(0).max(9009).optional(),
  BorderStyle: GridLayoutElementBorderStyleSchema.optional(),
  BorderRadius: z.string().min(0).max(50).optional(),
  RowSpan: z.number().min(1).max(21),
  Padding: z.string().min(0).max(200).optional(),
  LoadingAnimation: LoadingAnimationSchema.optional(),
  BackgroundStyle: GridLayoutElementBackgroundStyleSchema.optional(),
  ElementId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  SelectedBorderStyle: GridLayoutElementBorderStyleSchema.optional(),
});

const GridLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: GridLayoutCanvasSizeOptionsSchema.optional(),
  Elements: z.array(GridLayoutElementSchema),
});

const SheetControlLayoutConfigurationSchema = z.object({
  GridLayout: GridLayoutConfigurationSchema.optional(),
});

const SheetControlLayoutSchema = z.object({
  Configuration: SheetControlLayoutConfigurationSchema,
});

const SheetTextBoxSchema = z.object({
  SheetTextBoxId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Content: z.string().min(0).max(150000).optional(),
});

const SheetLayoutGroupMemberSchema = z.object({
  Type: z.enum(["ELEMENT", "GROUP"]),
  Id: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const SheetLayoutGroupSchema = z.object({
  Id: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Members: z.array(SheetLayoutGroupMemberSchema),
});

const FreeFormLayoutElementBorderStyleSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Width: z.string().min(0).max(50).describe(
    "String to encapsulate the most generic way Width can be formatted with whatever units (px, em etc)",
  ).optional(),
});

const SheetElementConfigurationOverridesSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const SheetElementRenderingRuleSchema = z.object({
  Expression: z.string().min(1).max(4096),
  ConfigurationOverrides: SheetElementConfigurationOverridesSchema,
});

const FreeFormLayoutElementBackgroundStyleSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const FreeFormLayoutElementSchema = z.object({
  ElementType: z.enum([
    "VISUAL",
    "FILTER_CONTROL",
    "PARAMETER_CONTROL",
    "TEXT_BOX",
    "IMAGE",
  ]),
  BorderStyle: FreeFormLayoutElementBorderStyleSchema.optional(),
  BorderRadius: z.string().min(0).max(50).optional(),
  RenderingRules: z.array(SheetElementRenderingRuleSchema).optional(),
  YAxisLocation: z.string().describe(
    "String based length that is composed of value and unit in px with Integer.MAX_VALUE as maximum value",
  ),
  BackgroundStyle: FreeFormLayoutElementBackgroundStyleSchema.optional(),
  XAxisLocation: z.string().describe(
    "String based length that is composed of value and unit in px",
  ),
  Padding: z.string().min(0).max(200).optional(),
  Height: z.string().describe(
    "String based length that is composed of value and unit in px",
  ),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  LoadingAnimation: LoadingAnimationSchema.optional(),
  Width: z.string().describe(
    "String based length that is composed of value and unit in px",
  ),
  ElementId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  SelectedBorderStyle: FreeFormLayoutElementBorderStyleSchema.optional(),
});

const FreeFormLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: FreeFormLayoutCanvasSizeOptionsSchema.optional(),
  Groups: z.array(SheetLayoutGroupSchema).optional(),
  Elements: z.array(FreeFormLayoutElementSchema),
});

const FreeFormSectionLayoutConfigurationSchema = z.object({
  Elements: z.array(FreeFormLayoutElementSchema),
});

const SectionLayoutConfigurationSchema = z.object({
  FreeFormLayout: FreeFormSectionLayoutConfigurationSchema,
});

const SectionStyleSchema = z.object({
  Padding: SpacingSchema.optional(),
  Height: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

const HeaderFooterSectionConfigurationSchema = z.object({
  Layout: SectionLayoutConfigurationSchema,
  Style: SectionStyleSchema.optional(),
  SectionId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const BodySectionContentSchema = z.object({
  Layout: SectionLayoutConfigurationSchema.optional(),
});

const SectionAfterPageBreakSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const SectionPageBreakConfigurationSchema = z.object({
  After: SectionAfterPageBreakSchema.optional(),
});

const ColumnSortSchema = z.object({
  AggregationFunction: AggregationFunctionSchema.optional(),
  SortBy: ColumnIdentifierSchema,
  Direction: z.enum(["ASC", "DESC"]),
});

const BodySectionDynamicNumericDimensionConfigurationSchema = z.object({
  Column: ColumnIdentifierSchema,
  SortByMetrics: z.array(ColumnSortSchema).optional(),
  Limit: z.number().min(1).max(1000).optional(),
});

const BodySectionDynamicCategoryDimensionConfigurationSchema = z.object({
  Column: ColumnIdentifierSchema,
  SortByMetrics: z.array(ColumnSortSchema).optional(),
  Limit: z.number().min(1).max(1000).optional(),
});

const BodySectionRepeatDimensionConfigurationSchema = z.object({
  DynamicNumericDimensionConfiguration:
    BodySectionDynamicNumericDimensionConfigurationSchema.optional(),
  DynamicCategoryDimensionConfiguration:
    BodySectionDynamicCategoryDimensionConfigurationSchema.optional(),
});

const BodySectionRepeatPageBreakConfigurationSchema = z.object({
  After: SectionAfterPageBreakSchema.optional(),
});

const BodySectionRepeatConfigurationSchema = z.object({
  DimensionConfigurations: z.array(
    BodySectionRepeatDimensionConfigurationSchema,
  ).optional(),
  NonRepeatingVisuals: z.array(
    z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ).optional(),
  PageBreakConfiguration: BodySectionRepeatPageBreakConfigurationSchema
    .optional(),
});

const BodySectionConfigurationSchema = z.object({
  Content: BodySectionContentSchema,
  Style: SectionStyleSchema.optional(),
  PageBreakConfiguration: SectionPageBreakConfigurationSchema.optional(),
  SectionId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  RepeatConfiguration: BodySectionRepeatConfigurationSchema.optional(),
});

const SectionBasedLayoutConfigurationSchema = z.object({
  CanvasSizeOptions: SectionBasedLayoutCanvasSizeOptionsSchema,
  FooterSections: z.array(HeaderFooterSectionConfigurationSchema),
  BodySections: z.array(BodySectionConfigurationSchema),
  HeaderSections: z.array(HeaderFooterSectionConfigurationSchema),
});

const LayoutConfigurationSchema = z.object({
  GridLayout: GridLayoutConfigurationSchema.optional(),
  FreeFormLayout: FreeFormLayoutConfigurationSchema.optional(),
  SectionBasedLayout: SectionBasedLayoutConfigurationSchema.optional(),
});

const LayoutSchema = z.object({
  Configuration: LayoutConfigurationSchema,
});

const FilterSliderControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Type: z.enum(["SINGLE_POINT", "RANGE"]).optional(),
  StepSize: z.number(),
  DisplayOptions: SliderControlDisplayOptionsSchema.optional(),
  Title: z.string().min(1).max(2048),
  MaximumValue: z.number(),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  MinimumValue: z.number(),
});

const FilterTextAreaControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Delimiter: z.string().min(1).max(2048).optional(),
  DisplayOptions: TextAreaControlDisplayOptionsSchema.optional(),
  Title: z.string().min(1).max(2048),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const FilterDropDownControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: DropDownControlDisplayOptionsSchema.optional(),
  CascadingControlConfiguration: CascadingControlConfigurationSchema.optional(),
  Title: z.string().min(1).max(2048),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  SelectableValues: FilterSelectableValuesSchema.optional(),
});

const FilterTextFieldControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  DisplayOptions: TextFieldControlDisplayOptionsSchema.optional(),
  Title: z.string().min(1).max(2048),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const FilterListControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Type: z.enum(["MULTI_SELECT", "SINGLE_SELECT"]).optional(),
  DisplayOptions: ListControlDisplayOptionsSchema.optional(),
  CascadingControlConfiguration: CascadingControlConfigurationSchema.optional(),
  Title: z.string().min(1).max(2048),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  SelectableValues: FilterSelectableValuesSchema.optional(),
});

const FilterDateTimePickerControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Type: z.enum(["SINGLE_VALUED", "DATE_RANGE"]).optional(),
  DisplayOptions: DateTimePickerControlDisplayOptionsSchema.optional(),
  Title: z.string().min(1).max(2048),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const FilterRelativeDateTimeControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  DisplayOptions: RelativeDateTimeControlDisplayOptionsSchema.optional(),
  Title: z.string().min(1).max(2048),
  CommitMode: z.enum(["AUTO", "MANUAL"]).optional(),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const FilterCrossSheetControlSchema = z.object({
  FilterControlId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  CascadingControlConfiguration: CascadingControlConfigurationSchema.optional(),
  SourceFilterId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const FilterControlSchema = z.object({
  Slider: FilterSliderControlSchema.optional(),
  TextArea: FilterTextAreaControlSchema.optional(),
  Dropdown: FilterDropDownControlSchema.optional(),
  TextField: FilterTextFieldControlSchema.optional(),
  List: FilterListControlSchema.optional(),
  DateTimePicker: FilterDateTimePickerControlSchema.optional(),
  RelativeDateTime: FilterRelativeDateTimeControlSchema.optional(),
  CrossSheet: FilterCrossSheetControlSchema.optional(),
});

const LongFormatTextSchema = z.object({
  RichText: z.string().min(1).max(2048).optional(),
  PlainText: z.string().min(1).max(1024).optional(),
});

const VisualSubtitleLabelOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FormatText: LongFormatTextSchema.optional(),
});

const ItemsLimitConfigurationSchema = z.object({
  ItemsLimit: z.number().optional(),
  OtherCategories: z.enum(["INCLUDE", "EXCLUDE"]).optional(),
});

const FieldSortSchema = z.object({
  FieldId: z.string().min(1).max(512),
  Direction: z.enum(["ASC", "DESC"]),
});

const FieldSortOptionsSchema = z.object({
  FieldSort: FieldSortSchema.optional(),
  ColumnSort: ColumnSortSchema.optional(),
});

const FunnelChartSortConfigurationSchema = z.object({
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

const FunnelChartDataLabelOptionsSchema = z.object({
  MeasureLabelVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Position: z.enum(["INSIDE", "OUTSIDE", "LEFT", "TOP", "BOTTOM", "RIGHT"])
    .optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  CategoryLabelVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  LabelColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  MeasureDataLabelStyle: z.enum([
    "VALUE_ONLY",
    "PERCENTAGE_BY_FIRST_STAGE",
    "PERCENTAGE_BY_PREVIOUS_STAGE",
    "VALUE_AND_PERCENTAGE_BY_FIRST_STAGE",
    "VALUE_AND_PERCENTAGE_BY_PREVIOUS_STAGE",
  ]).optional(),
  LabelFontConfiguration: FontConfigurationSchema.optional(),
});

const AxisLabelReferenceOptionsSchema = z.object({
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

const AxisLabelOptionsSchema = z.object({
  CustomLabel: z.string().optional(),
  ApplyTo: AxisLabelReferenceOptionsSchema.optional(),
  FontConfiguration: FontConfigurationSchema.optional(),
});

const ChartAxisLabelOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  SortIconVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  AxisLabelOptions: z.array(AxisLabelOptionsSchema).optional(),
});

const DateDimensionFieldSchema = z.object({
  HierarchyId: z.string().min(1).max(512).optional(),
  FormatConfiguration: DateTimeFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
  DateGranularity: z.enum([
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
});

const NumericalDimensionFieldSchema = z.object({
  HierarchyId: z.string().min(1).max(512).optional(),
  FormatConfiguration: NumberFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

const CategoricalDimensionFieldSchema = z.object({
  HierarchyId: z.string().min(1).max(512).optional(),
  FormatConfiguration: StringFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

const DimensionFieldSchema = z.object({
  DateDimensionField: DateDimensionFieldSchema.optional(),
  NumericalDimensionField: NumericalDimensionFieldSchema.optional(),
  CategoricalDimensionField: CategoricalDimensionFieldSchema.optional(),
});

const DateMeasureFieldSchema = z.object({
  AggregationFunction: z.enum(["COUNT", "DISTINCT_COUNT", "MIN", "MAX"])
    .optional(),
  FormatConfiguration: DateTimeFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

const NumericalMeasureFieldSchema = z.object({
  AggregationFunction: NumericalAggregationFunctionSchema.optional(),
  FormatConfiguration: NumberFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

const CategoricalMeasureFieldSchema = z.object({
  AggregationFunction: z.enum(["COUNT", "DISTINCT_COUNT"]).optional(),
  FormatConfiguration: StringFormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

const CalculatedMeasureFieldSchema = z.object({
  Expression: z.string().min(1).max(4096),
  FieldId: z.string().min(1).max(512),
});

const MeasureFieldSchema = z.object({
  DateMeasureField: DateMeasureFieldSchema.optional(),
  NumericalMeasureField: NumericalMeasureFieldSchema.optional(),
  CategoricalMeasureField: CategoricalMeasureFieldSchema.optional(),
  CalculatedMeasureField: CalculatedMeasureFieldSchema.optional(),
});

const FunnelChartAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

const FunnelChartFieldWellsSchema = z.object({
  FunnelChartAggregatedFieldWells: FunnelChartAggregatedFieldWellsSchema
    .optional(),
});

const FieldTooltipItemSchema = z.object({
  TooltipTarget: z.enum(["BOTH", "BAR", "LINE"]).optional(),
  FieldId: z.string().min(1).max(512),
  Label: z.string().optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const ColumnTooltipItemSchema = z.object({
  Aggregation: AggregationFunctionSchema.optional(),
  TooltipTarget: z.enum(["BOTH", "BAR", "LINE"]).optional(),
  Column: ColumnIdentifierSchema,
  Label: z.string().optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const TooltipItemSchema = z.object({
  FieldTooltipItem: FieldTooltipItemSchema.optional(),
  ColumnTooltipItem: ColumnTooltipItemSchema.optional(),
});

const FieldBasedTooltipSchema = z.object({
  TooltipFields: z.array(TooltipItemSchema).optional(),
  AggregationVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  TooltipTitleType: z.enum(["NONE", "PRIMARY_VALUE"]).optional(),
});

const TooltipOptionsSchema = z.object({
  SelectedTooltipType: z.enum(["BASIC", "DETAILED", "SHEET"]).optional(),
  TooltipVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FieldBasedTooltip: FieldBasedTooltipSchema.optional(),
});

const ContextMenuOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const VisualMenuOptionSchema = z.object({
  AvailabilityStatus: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const VisualInteractionOptionsSchema = z.object({
  ContextMenuOption: ContextMenuOptionSchema.optional(),
  VisualMenuOption: VisualMenuOptionSchema.optional(),
});

const DataPathTypeSchema = z.object({
  PivotTableDataPathType: z.enum([
    "HIERARCHY_ROWS_LAYOUT_COLUMN",
    "MULTIPLE_ROW_METRICS_COLUMN",
    "EMPTY_COLUMN_HEADER",
    "COUNT_METRIC_COLUMN",
  ]).optional(),
});

const DataPathValueSchema = z.object({
  DataPathType: DataPathTypeSchema.optional(),
  FieldId: z.string().min(1).max(512).optional(),
  FieldValue: z.string().min(0).max(2048).optional(),
});

const DataPathColorSchema = z.object({
  Element: DataPathValueSchema,
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")),
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
});

const VisualPaletteSchema = z.object({
  ChartColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  ColorMap: z.array(DataPathColorSchema).optional(),
});

const FunnelChartConfigurationSchema = z.object({
  SortConfiguration: FunnelChartSortConfigurationSchema.optional(),
  DataLabelOptions: FunnelChartDataLabelOptionsSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: FunnelChartFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  ValueLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

const FilterOperationSelectedFieldsConfigurationSchema = z.object({
  SelectedColumns: z.array(ColumnIdentifierSchema).describe(
    "The selected columns of a dataset.",
  ).optional(),
  SelectedFields: z.array(z.string().min(1).max(512)).optional(),
  SelectedFieldOptions: z.enum(["ALL_FIELDS"]).optional(),
});

const SameSheetTargetVisualConfigurationSchema = z.object({
  TargetVisualOptions: z.enum(["ALL_VISUALS"]).optional(),
  TargetVisuals: z.array(
    z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ).optional(),
});

const FilterOperationTargetVisualsConfigurationSchema = z.object({
  SameSheetTargetVisualConfiguration: SameSheetTargetVisualConfigurationSchema
    .optional(),
});

const CustomActionFilterOperationSchema = z.object({
  SelectedFieldsConfiguration: FilterOperationSelectedFieldsConfigurationSchema,
  TargetVisualsConfiguration: FilterOperationTargetVisualsConfigurationSchema,
});

const VisualCustomActionOperationSchema = z.object({
  NavigationOperation: CustomActionNavigationOperationSchema.optional(),
  SetParametersOperation: CustomActionSetParametersOperationSchema.optional(),
  FilterOperation: CustomActionFilterOperationSchema.optional(),
  URLOperation: CustomActionURLOperationSchema.optional(),
});

const VisualCustomActionSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  Trigger: z.enum(["DATA_POINT_CLICK", "DATA_POINT_MENU"]),
  CustomActionId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().min(1).max(256),
  ActionOperations: z.array(VisualCustomActionOperationSchema),
});

const ShortFormatTextSchema = z.object({
  RichText: z.string().min(1).max(1024).optional(),
  PlainText: z.string().min(1).max(512).optional(),
});

const VisualTitleLabelOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FormatText: ShortFormatTextSchema.optional(),
});

const NumericEqualityDrillDownFilterSchema = z.object({
  Column: ColumnIdentifierSchema,
  Value: z.number(),
});

const TimeRangeDrillDownFilterSchema = z.object({
  Column: ColumnIdentifierSchema,
  RangeMinimum: z.string(),
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
  ]),
  RangeMaximum: z.string(),
});

const CategoryDrillDownFilterSchema = z.object({
  Column: ColumnIdentifierSchema,
  CategoryValues: z.array(z.string().min(0).max(512)),
});

const DrillDownFilterSchema = z.object({
  NumericEqualityFilter: NumericEqualityDrillDownFilterSchema.optional(),
  TimeRangeFilter: TimeRangeDrillDownFilterSchema.optional(),
  CategoryFilter: CategoryDrillDownFilterSchema.optional(),
});

const DateTimeHierarchySchema = z.object({
  HierarchyId: z.string().min(1).max(512),
  DrillDownFilters: z.array(DrillDownFilterSchema).optional(),
});

const ExplicitHierarchySchema = z.object({
  HierarchyId: z.string().min(1).max(512),
  DrillDownFilters: z.array(DrillDownFilterSchema).optional(),
  Columns: z.array(ColumnIdentifierSchema),
});

const PredefinedHierarchySchema = z.object({
  HierarchyId: z.string().min(1).max(512),
  DrillDownFilters: z.array(DrillDownFilterSchema).optional(),
  Columns: z.array(ColumnIdentifierSchema),
});

const ColumnHierarchySchema = z.object({
  DateTimeHierarchy: DateTimeHierarchySchema.optional(),
  ExplicitHierarchy: ExplicitHierarchySchema.optional(),
  PredefinedHierarchy: PredefinedHierarchySchema.optional(),
});

const FunnelChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: FunnelChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const PaginationConfigurationSchema = z.object({
  PageSize: z.number(),
  PageNumber: z.number().min(0),
});

const BoxPlotSortConfigurationSchema = z.object({
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
  PaginationConfiguration: PaginationConfigurationSchema.optional(),
});

const LegendOptionsSchema = z.object({
  Position: z.enum(["AUTO", "RIGHT", "BOTTOM", "TOP"]).optional(),
  ValueFontConfiguration: FontConfigurationSchema.optional(),
  Title: LabelOptionsSchema.optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Height: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  Width: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

const ReferenceLineDynamicDataConfigurationSchema = z.object({
  Column: ColumnIdentifierSchema,
  MeasureAggregationFunction: AggregationFunctionSchema.optional(),
  Calculation: NumericalAggregationFunctionSchema,
});

const ReferenceLineStaticDataConfigurationSchema = z.object({
  Value: z.number(),
});

const ReferenceLineDataConfigurationSchema = z.object({
  DynamicConfiguration: ReferenceLineDynamicDataConfigurationSchema.optional(),
  AxisBinding: z.enum(["PRIMARY_YAXIS", "SECONDARY_YAXIS"]).optional(),
  SeriesType: z.enum(["BAR", "LINE"]).optional(),
  StaticConfiguration: ReferenceLineStaticDataConfigurationSchema.optional(),
});

const ReferenceLineValueLabelConfigurationSchema = z.object({
  FormatConfiguration: NumericFormatConfigurationSchema.optional(),
  RelativePosition: z.enum(["BEFORE_CUSTOM_LABEL", "AFTER_CUSTOM_LABEL"])
    .optional(),
});

const ReferenceLineCustomLabelConfigurationSchema = z.object({
  CustomLabel: z.string().regex(new RegExp("\\S")),
});

const ReferenceLineLabelConfigurationSchema = z.object({
  HorizontalPosition: z.enum(["LEFT", "CENTER", "RIGHT"]).optional(),
  ValueLabelConfiguration: ReferenceLineValueLabelConfigurationSchema
    .optional(),
  CustomLabelConfiguration: ReferenceLineCustomLabelConfigurationSchema
    .optional(),
  FontColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  FontConfiguration: FontConfigurationSchema.optional(),
  VerticalPosition: z.enum(["ABOVE", "BELOW"]).optional(),
});

const ReferenceLineStyleConfigurationSchema = z.object({
  Pattern: z.enum(["SOLID", "DASHED", "DOTTED"]).optional(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

const ReferenceLineSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  DataConfiguration: ReferenceLineDataConfigurationSchema,
  LabelConfiguration: ReferenceLineLabelConfigurationSchema.optional(),
  StyleConfiguration: ReferenceLineStyleConfigurationSchema.optional(),
});

const DateAxisOptionsSchema = z.object({
  MissingDateVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const AxisLogarithmicScaleSchema = z.object({
  Base: z.number().optional(),
});

const AxisLinearScaleSchema = z.object({
  StepSize: z.number().optional(),
  StepCount: z.number().optional(),
});

const AxisScaleSchema = z.object({
  Logarithmic: AxisLogarithmicScaleSchema.optional(),
  Linear: AxisLinearScaleSchema.optional(),
});

const AxisDisplayMinMaxRangeSchema = z.object({
  Minimum: z.number().optional(),
  Maximum: z.number().optional(),
});

const AxisDisplayRangeSchema = z.object({
  DataDriven: z.record(z.string(), z.unknown()).optional(),
  MinMax: AxisDisplayMinMaxRangeSchema.optional(),
});

const NumericAxisOptionsSchema = z.object({
  Scale: AxisScaleSchema.optional(),
  Range: AxisDisplayRangeSchema.optional(),
});

const AxisDataOptionsSchema = z.object({
  DateAxisOptions: DateAxisOptionsSchema.optional(),
  NumericAxisOptions: NumericAxisOptionsSchema.optional(),
});

const AxisTickLabelOptionsSchema = z.object({
  RotationAngle: z.number().optional(),
  LabelOptions: LabelOptionsSchema.optional(),
});

const PercentVisibleRangeSchema = z.object({
  From: z.number().min(0).max(100).optional(),
  To: z.number().min(0).max(100).optional(),
});

const VisibleRangeOptionsSchema = z.object({
  PercentRange: PercentVisibleRangeSchema.optional(),
});

const ScrollBarOptionsSchema = z.object({
  VisibleRange: VisibleRangeOptionsSchema.optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const AxisDisplayOptionsSchema = z.object({
  DataOptions: AxisDataOptionsSchema.optional(),
  TickLabelOptions: AxisTickLabelOptionsSchema.optional(),
  AxisOffset: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  AxisLineVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  GridLineVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  ScrollbarOptions: ScrollBarOptionsSchema.optional(),
});

const BoxPlotAggregatedFieldWellsSchema = z.object({
  GroupBy: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

const BoxPlotFieldWellsSchema = z.object({
  BoxPlotAggregatedFieldWells: BoxPlotAggregatedFieldWellsSchema.optional(),
});

const BoxPlotStyleOptionsSchema = z.object({
  FillStyle: z.enum(["SOLID", "TRANSPARENT"]).optional(),
});

const BoxPlotOptionsSchema = z.object({
  StyleOptions: BoxPlotStyleOptionsSchema.optional(),
  OutlierVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  AllDataPointsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const BoxPlotChartConfigurationSchema = z.object({
  SortConfiguration: BoxPlotSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  ReferenceLines: z.array(ReferenceLineSchema).optional(),
  CategoryAxis: AxisDisplayOptionsSchema.optional(),
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: BoxPlotFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  BoxPlotOptions: BoxPlotOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  PrimaryYAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

const BoxPlotVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: BoxPlotChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const GeospatialCoordinateBoundsSchema = z.object({
  West: z.number().min(-1800).max(1800),
  South: z.number().min(-90).max(90),
  North: z.number().min(-90).max(90),
  East: z.number().min(-1800).max(1800),
});

const GeospatialMapStateSchema = z.object({
  Bounds: GeospatialCoordinateBoundsSchema.optional(),
  MapNavigation: z.enum(["ENABLED", "DISABLED"]).optional(),
});

const GeospatialMapStyleSchema = z.object({
  BaseMapStyle: z.enum(["LIGHT_GRAY", "DARK_GRAY", "STREET", "IMAGERY"])
    .optional(),
  BaseMapVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  BackgroundColor: z.string().regex(
    new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"),
  ).optional(),
});

const GeospatialLayerColorFieldSchema = z.object({
  ColorValuesFields: z.array(MeasureFieldSchema).optional(),
  ColorDimensionsFields: z.array(DimensionFieldSchema).optional(),
});

const UnaggregatedFieldSchema = z.object({
  FormatConfiguration: FormatConfigurationSchema.optional(),
  Column: ColumnIdentifierSchema,
  FieldId: z.string().min(1).max(512),
});

const GeospatialLayerJoinDefinitionSchema = z.object({
  ColorField: GeospatialLayerColorFieldSchema.optional(),
  ShapeKeyField: z.string().optional(),
  DatasetKeyField: UnaggregatedFieldSchema.optional(),
});

const LayerCustomActionOperationSchema = z.object({
  NavigationOperation: CustomActionNavigationOperationSchema.optional(),
  SetParametersOperation: CustomActionSetParametersOperationSchema.optional(),
  FilterOperation: CustomActionFilterOperationSchema.optional(),
  URLOperation: CustomActionURLOperationSchema.optional(),
});

const LayerCustomActionSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  Trigger: z.enum(["DATA_POINT_CLICK", "DATA_POINT_MENU"]),
  CustomActionId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().min(1).max(256),
  ActionOperations: z.array(LayerCustomActionOperationSchema),
});

const GeospatialGradientStepColorSchema = z.object({
  DataValue: z.number(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$")),
});

const GeospatialNullSymbolStyleSchema = z.object({
  FillColor: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  StrokeWidth: z.number().min(0).optional(),
  StrokeColor: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
});

const GeospatialNullDataSettingsSchema = z.object({
  SymbolStyle: GeospatialNullSymbolStyleSchema,
});

const GeospatialGradientColorSchema = z.object({
  DefaultOpacity: z.number().min(0).max(1).optional(),
  StepColors: z.array(GeospatialGradientStepColorSchema),
  NullDataVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  NullDataSettings: GeospatialNullDataSettingsSchema.optional(),
});

const GeospatialCategoricalDataColorSchema = z.object({
  DataValue: z.string(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$")),
});

const GeospatialCategoricalColorSchema = z.object({
  CategoryDataColors: z.array(GeospatialCategoricalDataColorSchema),
  DefaultOpacity: z.number().min(0).max(1).optional(),
  NullDataVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  NullDataSettings: GeospatialNullDataSettingsSchema.optional(),
});

const GeospatialSolidColorSchema = z.object({
  State: z.enum(["ENABLED", "DISABLED"]).describe(
    "Defines view state of the color",
  ).optional(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$")),
});

const GeospatialColorSchema = z.object({
  Gradient: GeospatialGradientColorSchema.optional(),
  Categorical: GeospatialCategoricalColorSchema.optional(),
  Solid: GeospatialSolidColorSchema.describe(
    "Describes the properties for a solid color",
  ).optional(),
});

const GeospatialLineWidthSchema = z.object({
  LineWidth: z.number().min(0).optional(),
});

const GeospatialCircleRadiusSchema = z.object({
  Radius: z.number().min(0).optional(),
});

const GeospatialCircleSymbolStyleSchema = z.object({
  FillColor: GeospatialColorSchema.optional(),
  StrokeWidth: GeospatialLineWidthSchema.optional(),
  StrokeColor: GeospatialColorSchema.optional(),
  CircleRadius: GeospatialCircleRadiusSchema.optional(),
});

const GeospatialPointStyleSchema = z.object({
  CircleSymbolStyle: GeospatialCircleSymbolStyleSchema.optional(),
});

const GeospatialPointLayerSchema = z.object({
  Style: GeospatialPointStyleSchema,
});

const GeospatialPolygonSymbolStyleSchema = z.object({
  FillColor: GeospatialColorSchema.optional(),
  StrokeWidth: GeospatialLineWidthSchema.optional(),
  StrokeColor: GeospatialColorSchema.optional(),
});

const GeospatialPolygonStyleSchema = z.object({
  PolygonSymbolStyle: GeospatialPolygonSymbolStyleSchema.optional(),
});

const GeospatialPolygonLayerSchema = z.object({
  Style: GeospatialPolygonStyleSchema,
});

const GeospatialLineSymbolStyleSchema = z.object({
  FillColor: GeospatialColorSchema.optional(),
  LineWidth: GeospatialLineWidthSchema.optional(),
});

const GeospatialLineStyleSchema = z.object({
  LineSymbolStyle: GeospatialLineSymbolStyleSchema.optional(),
});

const GeospatialLineLayerSchema = z.object({
  Style: GeospatialLineStyleSchema,
});

const GeospatialLayerDefinitionSchema = z.object({
  PointLayer: GeospatialPointLayerSchema.optional(),
  PolygonLayer: GeospatialPolygonLayerSchema.optional(),
  LineLayer: GeospatialLineLayerSchema.optional(),
});

const GeospatialStaticFileSourceSchema = z.object({
  StaticFileId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
});

const GeospatialDataSourceItemSchema = z.object({
  StaticFileDataSource: GeospatialStaticFileSourceSchema.optional(),
});

const GeospatialLayerItemSchema = z.object({
  LayerId: z.string(),
  JoinDefinition: GeospatialLayerJoinDefinitionSchema.optional(),
  Actions: z.array(LayerCustomActionSchema).optional(),
  LayerType: z.enum(["POINT", "LINE", "POLYGON"]).optional(),
  LayerDefinition: GeospatialLayerDefinitionSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  Label: z.string().optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  DataSource: GeospatialDataSourceItemSchema.optional(),
});

const GeospatialLayerMapConfigurationSchema = z.object({
  Legend: LegendOptionsSchema.optional(),
  MapState: GeospatialMapStateSchema.optional(),
  MapStyle: GeospatialMapStyleSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  MapLayers: z.array(GeospatialLayerItemSchema).optional(),
});

const LayerMapVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: GeospatialLayerMapConfigurationSchema.optional(),
  DataSetIdentifier: z.string().min(0).max(2048).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  TopicIdentifier: z.string().min(1).max(2048).optional(),
});

const GeospatialMapStyleOptionsSchema = z.object({
  BaseMapStyle: z.enum(["LIGHT_GRAY", "DARK_GRAY", "STREET", "IMAGERY"])
    .optional(),
});

const GeospatialMapAggregatedFieldWellsSchema = z.object({
  Colors: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
  Geospatial: z.array(DimensionFieldSchema).optional(),
});

const GeospatialMapFieldWellsSchema = z.object({
  GeospatialMapAggregatedFieldWells: GeospatialMapAggregatedFieldWellsSchema
    .optional(),
});

const GeospatialWindowOptionsSchema = z.object({
  Bounds: GeospatialCoordinateBoundsSchema.optional(),
  MapZoomMode: z.enum(["AUTO", "MANUAL"]).optional(),
});

const SimpleClusterMarkerSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

const ClusterMarkerSchema = z.object({
  SimpleClusterMarker: SimpleClusterMarkerSchema.optional(),
});

const ClusterMarkerConfigurationSchema = z.object({
  ClusterMarker: ClusterMarkerSchema.optional(),
});

const GeospatialHeatmapDataColorSchema = z.object({
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")),
});

const GeospatialHeatmapColorScaleSchema = z.object({
  Colors: z.array(GeospatialHeatmapDataColorSchema).optional(),
});

const GeospatialHeatmapConfigurationSchema = z.object({
  HeatmapColor: GeospatialHeatmapColorScaleSchema.optional(),
});

const GeospatialPointStyleOptionsSchema = z.object({
  SelectedPointStyle: z.enum(["POINT", "CLUSTER", "HEATMAP"]).optional(),
  ClusterMarkerConfiguration: ClusterMarkerConfigurationSchema.optional(),
  HeatmapConfiguration: GeospatialHeatmapConfigurationSchema.optional(),
});

const GeospatialMapConfigurationSchema = z.object({
  Legend: LegendOptionsSchema.optional(),
  MapStyleOptions: GeospatialMapStyleOptionsSchema.optional(),
  FieldWells: GeospatialMapFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  WindowOptions: GeospatialWindowOptionsSchema.optional(),
  PointStyleOptions: GeospatialPointStyleOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

const GeospatialMapVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: GeospatialMapConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const ScatterPlotSortConfigurationSchema = z.object({
  ScatterPlotLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
});

const MaximumLabelTypeSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const DataPathLabelTypeSchema = z.object({
  FieldId: z.string().min(1).max(512).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FieldValue: z.string().min(0).max(2048).optional(),
});

const RangeEndsLabelTypeSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const FieldLabelTypeSchema = z.object({
  FieldId: z.string().min(1).max(512).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const MinimumLabelTypeSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const DataLabelTypeSchema = z.object({
  MaximumLabelType: MaximumLabelTypeSchema.optional(),
  DataPathLabelType: DataPathLabelTypeSchema.optional(),
  RangeEndsLabelType: RangeEndsLabelTypeSchema.optional(),
  FieldLabelType: FieldLabelTypeSchema.optional(),
  MinimumLabelType: MinimumLabelTypeSchema.optional(),
});

const DataLabelOptionsSchema = z.object({
  DataLabelTypes: z.array(DataLabelTypeSchema).optional(),
  MeasureLabelVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Position: z.enum(["INSIDE", "OUTSIDE", "LEFT", "TOP", "BOTTOM", "RIGHT"])
    .optional(),
  LabelContent: z.enum(["VALUE", "PERCENT", "VALUE_AND_PERCENT"]).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  TotalsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Overlap: z.enum(["DISABLE_OVERLAP", "ENABLE_OVERLAP"]).optional(),
  CategoryLabelVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  LabelColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  LabelFontConfiguration: FontConfigurationSchema.optional(),
});

const ScatterPlotUnaggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Size: z.array(MeasureFieldSchema).optional(),
  Label: z.array(DimensionFieldSchema).optional(),
  XAxis: z.array(DimensionFieldSchema).optional(),
  YAxis: z.array(DimensionFieldSchema).optional(),
});

const ScatterPlotCategoricallyAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Size: z.array(MeasureFieldSchema).optional(),
  Label: z.array(DimensionFieldSchema).optional(),
  XAxis: z.array(MeasureFieldSchema).optional(),
  YAxis: z.array(MeasureFieldSchema).optional(),
});

const ScatterPlotFieldWellsSchema = z.object({
  ScatterPlotUnaggregatedFieldWells: ScatterPlotUnaggregatedFieldWellsSchema
    .optional(),
  ScatterPlotCategoricallyAggregatedFieldWells:
    ScatterPlotCategoricallyAggregatedFieldWellsSchema.optional(),
});

const ScatterPlotConfigurationSchema = z.object({
  YAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  SortConfiguration: ScatterPlotSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  YAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  FieldWells: ScatterPlotFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  XAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  XAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
});

const ScatterPlotVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: ScatterPlotConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const RadarChartSortConfigurationSchema = z.object({
  ColorSort: z.array(FieldSortOptionsSchema).optional(),
  ColorItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

const RadarChartAreaStyleSettingsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const RadarChartSeriesSettingsSchema = z.object({
  AreaStyleSettings: RadarChartAreaStyleSettingsSchema.optional(),
});

const RadarChartAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Color: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

const RadarChartFieldWellsSchema = z.object({
  RadarChartAggregatedFieldWells: RadarChartAggregatedFieldWellsSchema
    .optional(),
});

const RadarChartConfigurationSchema = z.object({
  SortConfiguration: RadarChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  Shape: z.enum(["CIRCLE", "POLYGON"]).optional(),
  BaseSeriesSettings: RadarChartSeriesSettingsSchema.optional(),
  ColorLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  AxesRangeScale: z.enum(["AUTO", "INDEPENDENT", "SHARED"]).optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  AlternateBandColorsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  StartAngle: z.number().min(-360).max(360).optional(),
  CategoryAxis: AxisDisplayOptionsSchema.optional(),
  FieldWells: RadarChartFieldWellsSchema.optional(),
  ColorAxis: AxisDisplayOptionsSchema.optional(),
  AlternateBandOddColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$"))
    .optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  AlternateBandEvenColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$"))
    .optional(),
});

const RadarChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: RadarChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const ComboChartSortConfigurationSchema = z.object({
  ColorSort: z.array(FieldSortOptionsSchema).optional(),
  ColorItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

const YAxisOptionsSchema = z.object({
  YAxis: z.enum(["PRIMARY_Y_AXIS"]),
});

const SingleAxisOptionsSchema = z.object({
  YAxisOptions: YAxisOptionsSchema.optional(),
});

const BorderSettingsSchema = z.object({
  BorderVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  BorderColor: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  BorderWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

const LineChartLineStyleSettingsSchema = z.object({
  LineInterpolation: z.enum(["LINEAR", "SMOOTH", "STEPPED"]).optional(),
  LineStyle: z.enum(["SOLID", "DOTTED", "DASHED"]).optional(),
  LineVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  LineWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

const LineChartMarkerStyleSettingsSchema = z.object({
  MarkerShape: z.enum([
    "CIRCLE",
    "TRIANGLE",
    "SQUARE",
    "DIAMOND",
    "ROUNDED_SQUARE",
  ]).optional(),
  MarkerSize: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  MarkerVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  MarkerColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

const ComboChartDefaultSeriesSettingsSchema = z.object({
  BorderSettings: BorderSettingsSchema.optional(),
  DecalSettings: DecalSettingsSchema.optional(),
  LineStyleSettings: LineChartLineStyleSettingsSchema.optional(),
  MarkerStyleSettings: LineChartMarkerStyleSettingsSchema.optional(),
});

const ComboSeriesItemSchema = z.object({});

const ComboChartAggregatedFieldWellsSchema = z.object({
  BarValues: z.array(MeasureFieldSchema).optional(),
  Category: z.array(DimensionFieldSchema).optional(),
  Colors: z.array(DimensionFieldSchema).optional(),
  LineValues: z.array(MeasureFieldSchema).optional(),
});

const ComboChartFieldWellsSchema = z.object({
  ComboChartAggregatedFieldWells: ComboChartAggregatedFieldWellsSchema
    .optional(),
});

const ComboChartConfigurationSchema = z.object({
  SortConfiguration: ComboChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  ReferenceLines: z.array(ReferenceLineSchema).optional(),
  ColorLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  BarDataLabels: DataLabelOptionsSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  SingleAxisOptions: SingleAxisOptionsSchema.optional(),
  PrimaryYAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  BarsArrangement: z.enum(["CLUSTERED", "STACKED", "STACKED_PERCENT"])
    .optional(),
  DefaultSeriesSettings: ComboChartDefaultSeriesSettingsSchema.optional(),
  SecondaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Series: z.array(ComboSeriesItemSchema).optional(),
  LineDataLabels: DataLabelOptionsSchema.optional(),
  CategoryAxis: AxisDisplayOptionsSchema.optional(),
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: ComboChartFieldWellsSchema.optional(),
  SecondaryYAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

const ComboChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: ComboChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const WordCloudSortConfigurationSchema = z.object({
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

const WordCloudAggregatedFieldWellsSchema = z.object({
  GroupBy: z.array(DimensionFieldSchema).optional(),
  Size: z.array(MeasureFieldSchema).optional(),
});

const WordCloudFieldWellsSchema = z.object({
  WordCloudAggregatedFieldWells: WordCloudAggregatedFieldWellsSchema.optional(),
});

const WordCloudOptionsSchema = z.object({
  WordOrientation: z.enum(["HORIZONTAL", "HORIZONTAL_AND_VERTICAL"]).optional(),
  WordScaling: z.enum(["EMPHASIZE", "NORMAL"]).optional(),
  CloudLayout: z.enum(["FLUID", "NORMAL"]).optional(),
  MaximumStringLength: z.number().min(1).max(100).optional(),
  WordCasing: z.enum(["LOWER_CASE", "EXISTING_CASE"]).optional(),
  WordPadding: z.enum(["NONE", "SMALL", "MEDIUM", "LARGE"]).optional(),
});

const WordCloudChartConfigurationSchema = z.object({
  SortConfiguration: WordCloudSortConfigurationSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: WordCloudFieldWellsSchema.optional(),
  WordCloudOptions: WordCloudOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

const WordCloudVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: WordCloudChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const SankeyDiagramSortConfigurationSchema = z.object({
  WeightSort: z.array(FieldSortOptionsSchema).optional(),
  SourceItemsLimit: ItemsLimitConfigurationSchema.optional(),
  DestinationItemsLimit: ItemsLimitConfigurationSchema.optional(),
});

const SankeyDiagramAggregatedFieldWellsSchema = z.object({
  Destination: z.array(DimensionFieldSchema).optional(),
  Source: z.array(DimensionFieldSchema).optional(),
  Weight: z.array(MeasureFieldSchema).optional(),
});

const SankeyDiagramFieldWellsSchema = z.object({
  SankeyDiagramAggregatedFieldWells: SankeyDiagramAggregatedFieldWellsSchema
    .optional(),
});

const SankeyDiagramChartConfigurationSchema = z.object({
  SortConfiguration: SankeyDiagramSortConfigurationSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  FieldWells: SankeyDiagramFieldWellsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

const SankeyDiagramVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: SankeyDiagramChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

const GradientStopSchema = z.object({
  GradientOffset: z.number(),
  DataValue: z.number().optional(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

const GradientColorSchema = z.object({
  Stops: z.array(GradientStopSchema).optional(),
});

const ConditionalFormattingGradientColorSchema = z.object({
  Expression: z.string().min(1).max(4096),
  Color: GradientColorSchema,
});

const ConditionalFormattingSolidColorSchema = z.object({
  Expression: z.string().min(1).max(4096),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

const ConditionalFormattingColorSchema = z.object({
  Gradient: ConditionalFormattingGradientColorSchema.optional(),
  Solid: ConditionalFormattingSolidColorSchema.optional(),
});

const GaugeChartArcConditionalFormattingSchema = z.object({
  ForegroundColor: ConditionalFormattingColorSchema.optional(),
});

const ConditionalFormattingIconDisplayConfigurationSchema = z.object({
  IconDisplayOption: z.enum(["ICON_ONLY"]).optional(),
});

const ConditionalFormattingCustomIconOptionsSchema = z.object({
  UnicodeIcon: z.string().regex(new RegExp("^[^\\u0000-\\u00FF]$")).optional(),
  Icon: z.enum([
    "CARET_UP",
    "CARET_DOWN",
    "PLUS",
    "MINUS",
    "ARROW_UP",
    "ARROW_DOWN",
    "ARROW_LEFT",
    "ARROW_UP_LEFT",
    "ARROW_DOWN_LEFT",
    "ARROW_RIGHT",
    "ARROW_UP_RIGHT",
    "ARROW_DOWN_RIGHT",
    "FACE_UP",
    "FACE_DOWN",
    "FACE_FLAT",
    "ONE_BAR",
    "TWO_BAR",
    "THREE_BAR",
    "CIRCLE",
    "TRIANGLE",
    "SQUARE",
    "FLAG",
    "THUMBS_UP",
    "THUMBS_DOWN",
    "CHECKMARK",
    "X",
  ]).optional(),
});

const ConditionalFormattingCustomIconConditionSchema = z.object({
  Expression: z.string().min(1).max(4096),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  DisplayConfiguration: ConditionalFormattingIconDisplayConfigurationSchema
    .optional(),
  IconOptions: ConditionalFormattingCustomIconOptionsSchema,
});

const ConditionalFormattingIconSetSchema = z.object({
  Expression: z.string().min(1).max(4096),
  IconSetType: z.enum([
    "PLUS_MINUS",
    "CHECK_X",
    "THREE_COLOR_ARROW",
    "THREE_GRAY_ARROW",
    "CARET_UP_MINUS_DOWN",
    "THREE_SHAPE",
    "THREE_CIRCLE",
    "FLAGS",
    "BARS",
    "FOUR_COLOR_ARROW",
    "FOUR_GRAY_ARROW",
  ]).optional(),
});

const ConditionalFormattingIconSchema = z.object({
  CustomCondition: ConditionalFormattingCustomIconConditionSchema.optional(),
  IconSet: ConditionalFormattingIconSetSchema.optional(),
});

const GaugeChartPrimaryValueConditionalFormattingSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  Icon: ConditionalFormattingIconSchema.optional(),
});

const GaugeChartConditionalFormattingOptionSchema = z.object({
  Arc: GaugeChartArcConditionalFormattingSchema.optional(),
  PrimaryValue: GaugeChartPrimaryValueConditionalFormattingSchema.optional(),
});

const GaugeChartConditionalFormattingSchema = z.object({
  ConditionalFormattingOptions: z.array(
    GaugeChartConditionalFormattingOptionSchema,
  ).optional(),
});

const GaugeChartFieldWellsSchema = z.object({
  TargetValues: z.array(MeasureFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

const ArcConfigurationSchema = z.object({
  ArcAngle: z.number().optional(),
  ArcThickness: z.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
});

const ComparisonFormatConfigurationSchema = z.object({
  NumberDisplayFormatConfiguration: NumberDisplayFormatConfigurationSchema
    .optional(),
  PercentageDisplayFormatConfiguration:
    PercentageDisplayFormatConfigurationSchema.optional(),
});

const ComparisonConfigurationSchema = z.object({
  ComparisonMethod: z.enum(["DIFFERENCE", "PERCENT_DIFFERENCE", "PERCENT"])
    .optional(),
  ComparisonFormat: ComparisonFormatConfigurationSchema.optional(),
});

const ArcAxisDisplayRangeSchema = z.object({
  Min: z.number().optional(),
  Max: z.number().optional(),
});

const ArcAxisConfigurationSchema = z.object({
  Range: ArcAxisDisplayRangeSchema.optional(),
  ReserveRange: z.number().optional(),
});

const GaugeChartOptionsSchema = z.object({
  Arc: ArcConfigurationSchema.optional(),
  Comparison: ComparisonConfigurationSchema.optional(),
  PrimaryValueDisplayType: z.enum(["HIDDEN", "COMPARISON", "ACTUAL"])
    .optional(),
  ArcAxis: ArcAxisConfigurationSchema.optional(),
  PrimaryValueFontConfiguration: FontConfigurationSchema.optional(),
});

const GaugeChartColorConfigurationSchema = z.object({
  ForegroundColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  BackgroundColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

const GaugeChartConfigurationSchema = z.object({
  DataLabels: DataLabelOptionsSchema.optional(),
  FieldWells: GaugeChartFieldWellsSchema.optional(),
  TooltipOptions: TooltipOptionsSchema.optional(),
  GaugeChartOptions: GaugeChartOptionsSchema.optional(),
  ColorConfiguration: GaugeChartColorConfigurationSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

const GaugeChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  ConditionalFormatting: GaugeChartConditionalFormattingSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: GaugeChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

const ShapeConditionalFormatSchema = z.object({
  BackgroundColor: ConditionalFormattingColorSchema,
});

const FilledMapShapeConditionalFormattingSchema = z.object({
  Format: ShapeConditionalFormatSchema.optional(),
  FieldId: z.string().min(1).max(512),
});

const FilledMapConditionalFormattingOptionSchema = z.object({
  Shape: FilledMapShapeConditionalFormattingSchema,
});

const FilledMapConditionalFormattingSchema = z.object({
  ConditionalFormattingOptions: z.array(
    FilledMapConditionalFormattingOptionSchema,
  ),
});

const FilledMapSortConfigurationSchema = z.object({
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

const FilledMapAggregatedFieldWellsSchema = z.object({
  Values: z.array(MeasureFieldSchema).optional(),
  Geospatial: z.array(DimensionFieldSchema).optional(),
});

const FilledMapFieldWellsSchema = z.object({
  FilledMapAggregatedFieldWells: FilledMapAggregatedFieldWellsSchema.optional(),
});

const FilledMapConfigurationSchema = z.object({
  SortConfiguration: FilledMapSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  MapStyleOptions: GeospatialMapStyleOptionsSchema.optional(),
  FieldWells: FilledMapFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  WindowOptions: GeospatialWindowOptionsSchema.optional(),
});

const FilledMapVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  ConditionalFormatting: FilledMapConditionalFormattingSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: FilledMapConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const WaterfallChartSortConfigurationSchema = z.object({
  BreakdownItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
});

const WaterfallChartAggregatedFieldWellsSchema = z.object({
  Categories: z.array(DimensionFieldSchema).optional(),
  Breakdowns: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

const WaterfallChartFieldWellsSchema = z.object({
  WaterfallChartAggregatedFieldWells: WaterfallChartAggregatedFieldWellsSchema
    .optional(),
});

const WaterfallChartOptionsSchema = z.object({
  TotalBarLabel: z.string().optional(),
});

const WaterfallChartGroupColorConfigurationSchema = z.object({
  NegativeBarColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  TotalBarColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  PositiveBarColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

const WaterfallChartColorConfigurationSchema = z.object({
  GroupColorConfiguration: WaterfallChartGroupColorConfigurationSchema
    .optional(),
});

const WaterfallChartConfigurationSchema = z.object({
  CategoryAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  SortConfiguration: WaterfallChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: WaterfallChartFieldWellsSchema.optional(),
  WaterfallChartOptions: WaterfallChartOptionsSchema.optional(),
  ColorConfiguration: WaterfallChartColorConfigurationSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  CategoryAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  PrimaryYAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

const WaterfallVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: WaterfallChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const CustomContentConfigurationSchema = z.object({
  ContentUrl: z.string().min(1).max(2048).optional(),
  ContentType: z.enum(["IMAGE", "OTHER_EMBEDDED_CONTENT"]).optional(),
  ImageScaling: z.enum([
    "FIT_TO_HEIGHT",
    "FIT_TO_WIDTH",
    "DO_NOT_SCALE",
    "SCALE_TO_VISUAL",
  ]).optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

const CustomContentVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: CustomContentConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  DataSetIdentifier: z.string().min(0).max(2048).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  TopicIdentifier: z.string().min(1).max(2048).optional(),
});

const PieChartSortConfigurationSchema = z.object({
  SmallMultiplesSort: z.array(FieldSortOptionsSchema).optional(),
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
  SmallMultiplesLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
});

const ContributionAnalysisDefaultSchema = z.object({
  MeasureFieldId: z.string().min(1).max(512),
  ContributorDimensions: z.array(ColumnIdentifierSchema),
});

const PieChartAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
  SmallMultiples: z.array(DimensionFieldSchema).optional(),
});

const PieChartFieldWellsSchema = z.object({
  PieChartAggregatedFieldWells: PieChartAggregatedFieldWellsSchema.optional(),
});

const DonutCenterOptionsSchema = z.object({
  LabelVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const ArcOptionsSchema = z.object({
  ArcThickness: z.enum(["SMALL", "MEDIUM", "LARGE", "WHOLE"]).optional(),
});

const DonutOptionsSchema = z.object({
  DonutCenterOptions: DonutCenterOptionsSchema.optional(),
  ArcOptions: ArcOptionsSchema.optional(),
});

const PanelTitleOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FontConfiguration: FontConfigurationSchema.optional(),
  HorizontalTextAlignment: z.enum(["LEFT", "CENTER", "RIGHT", "AUTO"])
    .optional(),
});

const PanelConfigurationSchema = z.object({
  BorderThickness: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  BorderStyle: z.enum(["SOLID", "DASHED", "DOTTED"]).optional(),
  GutterSpacing: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  BackgroundVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  BorderVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  BorderColor: z.string().regex(new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"))
    .optional(),
  Title: PanelTitleOptionsSchema.optional(),
  GutterVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  BackgroundColor: z.string().regex(
    new RegExp("^#[A-F0-9]{6}(?:[A-F0-9]{2})?$"),
  ).optional(),
});

const SmallMultiplesAxisPropertiesSchema = z.object({
  Placement: z.enum(["OUTSIDE", "INSIDE"]).optional(),
  Scale: z.enum(["SHARED", "INDEPENDENT"]).optional(),
});

const SmallMultiplesOptionsSchema = z.object({
  MaxVisibleRows: z.number().min(1).max(10).optional(),
  PanelConfiguration: PanelConfigurationSchema.optional(),
  MaxVisibleColumns: z.number().min(1).max(10).optional(),
  XAxis: SmallMultiplesAxisPropertiesSchema.optional(),
  YAxis: SmallMultiplesAxisPropertiesSchema.optional(),
});

const PieChartConfigurationSchema = z.object({
  SortConfiguration: PieChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  ContributionAnalysisDefaults: z.array(ContributionAnalysisDefaultSchema)
    .optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: PieChartFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  DonutOptions: DonutOptionsSchema.optional(),
  SmallMultiplesOptions: SmallMultiplesOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  ValueLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
});

const PieChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: PieChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const KPIPrimaryValueConditionalFormattingSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  Icon: ConditionalFormattingIconSchema.optional(),
});

const KPIActualValueConditionalFormattingSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  Icon: ConditionalFormattingIconSchema.optional(),
});

const KPIComparisonValueConditionalFormattingSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  Icon: ConditionalFormattingIconSchema.optional(),
});

const KPIProgressBarConditionalFormattingSchema = z.object({
  ForegroundColor: ConditionalFormattingColorSchema.optional(),
});

const KPIConditionalFormattingOptionSchema = z.object({
  PrimaryValue: KPIPrimaryValueConditionalFormattingSchema.optional(),
  ActualValue: KPIActualValueConditionalFormattingSchema.optional(),
  ComparisonValue: KPIComparisonValueConditionalFormattingSchema.optional(),
  ProgressBar: KPIProgressBarConditionalFormattingSchema.optional(),
});

const KPIConditionalFormattingSchema = z.object({
  ConditionalFormattingOptions: z.array(KPIConditionalFormattingOptionSchema)
    .optional(),
});

const KPISortConfigurationSchema = z.object({
  TrendGroupSort: z.array(FieldSortOptionsSchema).optional(),
});

const KPIVisualStandardLayoutSchema = z.object({
  Type: z.enum(["CLASSIC", "VERTICAL"]),
});

const KPIVisualLayoutOptionsSchema = z.object({
  StandardLayout: KPIVisualStandardLayoutSchema.optional(),
});

const TrendArrowOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const SecondaryValueOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const ProgressBarOptionsSchema = z.object({
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const KPISparklineOptionsSchema = z.object({
  Type: z.enum(["LINE", "AREA"]),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  TooltipVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const KPIOptionsSchema = z.object({
  SecondaryValueFontConfiguration: FontConfigurationSchema.optional(),
  VisualLayoutOptions: KPIVisualLayoutOptionsSchema.optional(),
  TrendArrows: TrendArrowOptionsSchema.optional(),
  SecondaryValue: SecondaryValueOptionsSchema.optional(),
  Comparison: ComparisonConfigurationSchema.optional(),
  PrimaryValueDisplayType: z.enum(["HIDDEN", "COMPARISON", "ACTUAL"])
    .optional(),
  ProgressBar: ProgressBarOptionsSchema.optional(),
  PrimaryValueFontConfiguration: FontConfigurationSchema.optional(),
  Sparkline: KPISparklineOptionsSchema.optional(),
});

const KPIFieldWellsSchema = z.object({
  TargetValues: z.array(MeasureFieldSchema).optional(),
  TrendGroups: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

const KPIConfigurationSchema = z.object({
  SortConfiguration: KPISortConfigurationSchema.optional(),
  KPIOptions: KPIOptionsSchema.optional(),
  FieldWells: KPIFieldWellsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

const KPIVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  ConditionalFormatting: KPIConditionalFormattingSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: KPIConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const BinWidthOptionsSchema = z.object({
  BinCountLimit: z.number().min(0).max(1000).optional(),
  Value: z.number().min(0).optional(),
});

const BinCountOptionsSchema = z.object({
  Value: z.number().min(0).optional(),
});

const HistogramBinOptionsSchema = z.object({
  BinWidth: BinWidthOptionsSchema.optional(),
  StartValue: z.number().optional(),
  SelectedBinType: z.enum(["BIN_COUNT", "BIN_WIDTH"]).optional(),
  BinCount: BinCountOptionsSchema.optional(),
});

const HistogramAggregatedFieldWellsSchema = z.object({
  Values: z.array(MeasureFieldSchema).optional(),
});

const HistogramFieldWellsSchema = z.object({
  HistogramAggregatedFieldWells: HistogramAggregatedFieldWellsSchema.optional(),
});

const HistogramConfigurationSchema = z.object({
  YAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  BinOptions: HistogramBinOptionsSchema.optional(),
  FieldWells: HistogramFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  XAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  XAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
});

const HistogramVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: HistogramConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

const PluginVisualItemsLimitConfigurationSchema = z.object({
  ItemsLimit: z.number().optional(),
});

const PluginVisualTableQuerySortSchema = z.object({
  ItemsLimitConfiguration: PluginVisualItemsLimitConfigurationSchema.optional(),
  RowSort: z.array(FieldSortOptionsSchema).optional(),
});

const PluginVisualSortConfigurationSchema = z.object({
  PluginVisualTableQuerySort: PluginVisualTableQuerySortSchema.optional(),
});

const PluginVisualPropertySchema = z.object({
  Value: z.string().optional(),
  Name: z.string().optional(),
});

const PluginVisualOptionsSchema = z.object({
  VisualProperties: z.array(PluginVisualPropertySchema).optional(),
});

const PluginVisualFieldWellSchema = z.object({
  Unaggregated: z.array(UnaggregatedFieldSchema).optional(),
  AxisName: z.enum(["GROUP_BY", "VALUE"]).optional(),
  Measures: z.array(MeasureFieldSchema).optional(),
  Dimensions: z.array(DimensionFieldSchema).optional(),
});

const PluginVisualConfigurationSchema = z.object({
  SortConfiguration: PluginVisualSortConfigurationSchema.optional(),
  VisualOptions: PluginVisualOptionsSchema.optional(),
  FieldWells: z.array(PluginVisualFieldWellSchema).optional(),
});

const PluginVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  PluginArn: z.string(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: PluginVisualConfigurationSchema.optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

const TableRowConditionalFormattingSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  BackgroundColor: ConditionalFormattingColorSchema.optional(),
});

const TextConditionalFormatSchema = z.object({
  TextColor: ConditionalFormattingColorSchema.optional(),
  Icon: ConditionalFormattingIconSchema.optional(),
  BackgroundColor: ConditionalFormattingColorSchema.optional(),
});

const TableCellConditionalFormattingSchema = z.object({
  FieldId: z.string().min(1).max(512),
  TextFormat: TextConditionalFormatSchema.optional(),
});

const TableConditionalFormattingOptionSchema = z.object({
  Row: TableRowConditionalFormattingSchema.optional(),
  Cell: TableCellConditionalFormattingSchema.optional(),
});

const TableConditionalFormattingSchema = z.object({
  ConditionalFormattingOptions: z.array(TableConditionalFormattingOptionSchema)
    .optional(),
});

const TableSortConfigurationSchema = z.object({
  RowSort: z.array(FieldSortOptionsSchema).optional(),
  PaginationConfiguration: PaginationConfigurationSchema.optional(),
});

const TablePaginatedReportOptionsSchema = z.object({
  OverflowColumnHeaderVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  VerticalOverflowVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const TableBorderOptionsSchema = z.object({
  Thickness: z.number().min(1).max(4).optional(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  Style: z.enum(["NONE", "SOLID"]).optional(),
});

const TableSideBorderOptionsSchema = z.object({
  Left: TableBorderOptionsSchema.optional(),
  Top: TableBorderOptionsSchema.optional(),
  InnerHorizontal: TableBorderOptionsSchema.optional(),
  Right: TableBorderOptionsSchema.optional(),
  Bottom: TableBorderOptionsSchema.optional(),
  InnerVertical: TableBorderOptionsSchema.optional(),
});

const GlobalTableBorderOptionsSchema = z.object({
  UniformBorder: TableBorderOptionsSchema.optional(),
  SideSpecificBorder: TableSideBorderOptionsSchema.optional(),
});

const TableCellStyleSchema = z.object({
  VerticalTextAlignment: z.enum(["TOP", "MIDDLE", "BOTTOM", "AUTO"]).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Height: z.number().min(8).max(500).optional(),
  FontConfiguration: FontConfigurationSchema.optional(),
  Border: GlobalTableBorderOptionsSchema.optional(),
  TextWrap: z.enum(["NONE", "WRAP"]).optional(),
  HorizontalTextAlignment: z.enum(["LEFT", "CENTER", "RIGHT", "AUTO"])
    .optional(),
  BackgroundColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

const RowAlternateColorOptionsSchema = z.object({
  Status: z.enum(["ENABLED", "DISABLED"]).optional(),
  UsePrimaryBackgroundColor: z.enum(["ENABLED", "DISABLED"]).optional(),
  RowAlternateColors: z.array(z.string().regex(new RegExp("^#[A-F0-9]{6}$")))
    .optional(),
});

const TableOptionsSchema = z.object({
  HeaderStyle: TableCellStyleSchema.optional(),
  CellStyle: TableCellStyleSchema.optional(),
  Orientation: z.enum(["VERTICAL", "HORIZONTAL"]).optional(),
  RowAlternateColorOptions: RowAlternateColorOptionsSchema.optional(),
});

const SparklinesOptionsSchema = z.object({
  LineInterpolation: z.enum(["LINEAR", "SMOOTH", "STEPPED"]).optional(),
  MaxValueMarker: LineChartMarkerStyleSettingsSchema.optional(),
  XAxisField: DimensionFieldSchema,
  AllPointsMarker: LineChartMarkerStyleSettingsSchema.optional(),
  MinValueMarker: LineChartMarkerStyleSettingsSchema.optional(),
  FieldId: z.string().min(1).max(512),
  VisualType: z.enum(["LINE", "AREA_LINE"]).optional(),
  LineColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  YAxisBehavior: z.enum(["SHARED", "INDEPENDENT"]).optional(),
});

const DataBarsOptionsSchema = z.object({
  PositiveColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
  FieldId: z.string().min(1).max(512),
  NegativeColor: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

const TableInlineVisualizationSchema = z.object({
  Sparklines: SparklinesOptionsSchema.optional(),
  DataBars: DataBarsOptionsSchema.optional(),
});

const TableUnaggregatedFieldWellsSchema = z.object({
  Values: z.array(UnaggregatedFieldSchema).optional(),
});

const TableAggregatedFieldWellsSchema = z.object({
  GroupBy: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
});

const TableFieldWellsSchema = z.object({
  TableUnaggregatedFieldWells: TableUnaggregatedFieldWellsSchema.optional(),
  TableAggregatedFieldWells: TableAggregatedFieldWellsSchema.optional(),
});

const TablePinnedFieldOptionsSchema = z.object({
  PinnedLeftFields: z.array(z.string().min(1).max(512)).optional(),
});

const TransposedTableOptionSchema = z.object({
  ColumnWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  ColumnIndex: z.number().min(0).max(9999).optional(),
  ColumnType: z.enum(["ROW_HEADER_COLUMN", "VALUE_COLUMN"]),
});

const TableFieldCustomIconContentSchema = z.object({
  Icon: z.enum(["LINK"]).optional(),
});

const TableFieldCustomTextContentSchema = z.object({
  Value: z.string().optional(),
  FontConfiguration: FontConfigurationSchema,
});

const TableFieldLinkContentConfigurationSchema = z.object({
  CustomIconContent: TableFieldCustomIconContentSchema.optional(),
  CustomTextContent: TableFieldCustomTextContentSchema.optional(),
});

const TableFieldLinkConfigurationSchema = z.object({
  Target: z.enum(["NEW_TAB", "NEW_WINDOW", "SAME_TAB"]),
  Content: TableFieldLinkContentConfigurationSchema,
});

const TableCellImageSizingConfigurationSchema = z.object({
  TableCellImageScalingConfiguration: z.enum([
    "FIT_TO_CELL_HEIGHT",
    "FIT_TO_CELL_WIDTH",
    "DO_NOT_SCALE",
  ]).optional(),
});

const TableFieldImageConfigurationSchema = z.object({
  SizingOptions: TableCellImageSizingConfigurationSchema.optional(),
});

const TableFieldURLConfigurationSchema = z.object({
  LinkConfiguration: TableFieldLinkConfigurationSchema.optional(),
  ImageConfiguration: TableFieldImageConfigurationSchema.optional(),
});

const TableFieldOptionSchema = z.object({
  CustomLabel: z.string().min(1).max(2048).optional(),
  URLStyling: TableFieldURLConfigurationSchema.optional(),
  FieldId: z.string().min(1).max(512),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  Width: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

const TableFieldOptionsSchema = z.object({
  Order: z.array(z.string().min(1).max(512)).optional(),
  PinnedFieldOptions: TablePinnedFieldOptionsSchema.optional(),
  TransposedTableOptions: z.array(TransposedTableOptionSchema).optional(),
  SelectedFieldOptions: z.array(TableFieldOptionSchema).optional(),
});

const TotalAggregationFunctionSchema = z.object({
  SimpleTotalAggregationFunction: z.enum([
    "DEFAULT",
    "SUM",
    "AVERAGE",
    "MIN",
    "MAX",
    "NONE",
  ]).optional(),
});

const TotalAggregationOptionSchema = z.object({
  TotalAggregationFunction: TotalAggregationFunctionSchema,
  FieldId: z.string().min(1).max(512),
});

const TotalOptionsSchema = z.object({
  TotalAggregationOptions: z.array(TotalAggregationOptionSchema).optional(),
  CustomLabel: z.string().optional(),
  ScrollStatus: z.enum(["PINNED", "SCROLLED"]).optional(),
  Placement: z.enum(["START", "END", "AUTO"]).optional(),
  TotalCellStyle: TableCellStyleSchema.optional(),
  TotalsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const TableConfigurationSchema = z.object({
  SortConfiguration: TableSortConfigurationSchema.optional(),
  PaginatedReportOptions: TablePaginatedReportOptionsSchema.optional(),
  TableOptions: TableOptionsSchema.optional(),
  TableInlineVisualizations: z.array(TableInlineVisualizationSchema).optional(),
  FieldWells: TableFieldWellsSchema.optional(),
  FieldOptions: TableFieldOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  TotalOptions: TotalOptionsSchema.optional(),
});

const TableVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  ConditionalFormatting: TableConditionalFormattingSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: TableConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

const PivotTableConditionalFormattingScopeSchema = z.object({
  Role: z.enum(["FIELD", "FIELD_TOTAL", "GRAND_TOTAL"]).optional(),
});

const PivotTableCellConditionalFormattingSchema = z.object({
  Scope: PivotTableConditionalFormattingScopeSchema.optional(),
  Scopes: z.array(PivotTableConditionalFormattingScopeSchema).optional(),
  FieldId: z.string().min(1).max(512),
  TextFormat: TextConditionalFormatSchema.optional(),
});

const PivotTableConditionalFormattingOptionSchema = z.object({
  Cell: PivotTableCellConditionalFormattingSchema.optional(),
});

const PivotTableConditionalFormattingSchema = z.object({
  ConditionalFormattingOptions: z.array(
    PivotTableConditionalFormattingOptionSchema,
  ).optional(),
});

const DataPathSortSchema = z.object({
  SortPaths: z.array(DataPathValueSchema),
  Direction: z.enum(["ASC", "DESC"]),
});

const PivotTableSortBySchema = z.object({
  Field: FieldSortSchema.optional(),
  DataPath: DataPathSortSchema.optional(),
  Column: ColumnSortSchema.optional(),
});

const PivotFieldSortOptionsSchema = z.object({
  SortBy: PivotTableSortBySchema,
  FieldId: z.string().min(1).max(512),
});

const PivotTableSortConfigurationSchema = z.object({
  FieldSortOptions: z.array(PivotFieldSortOptionsSchema).optional(),
});

const PivotTablePaginatedReportOptionsSchema = z.object({
  OverflowColumnHeaderVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  VerticalOverflowVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const PivotTableRowsLabelOptionsSchema = z.object({
  CustomLabel: z.string().min(1).max(1024).optional(),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const PivotTableOptionsSchema = z.object({
  RowFieldNamesStyle: TableCellStyleSchema.optional(),
  RowHeaderStyle: TableCellStyleSchema.optional(),
  CollapsedRowDimensionsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  RowsLayout: z.enum(["TABULAR", "HIERARCHY"]).optional(),
  MetricPlacement: z.enum(["ROW", "COLUMN"]).optional(),
  DefaultCellWidth: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
  ColumnNamesVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  RowsLabelOptions: PivotTableRowsLabelOptionsSchema.optional(),
  SingleMetricVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  ColumnHeaderStyle: TableCellStyleSchema.optional(),
  ToggleButtonsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  CellStyle: TableCellStyleSchema.optional(),
  RowAlternateColorOptions: RowAlternateColorOptionsSchema.optional(),
});

const PivotTableAggregatedFieldWellsSchema = z.object({
  Values: z.array(MeasureFieldSchema).optional(),
  Columns: z.array(DimensionFieldSchema).optional(),
  Rows: z.array(DimensionFieldSchema).optional(),
});

const PivotTableFieldWellsSchema = z.object({
  PivotTableAggregatedFieldWells: PivotTableAggregatedFieldWellsSchema
    .optional(),
});

const PivotTableFieldCollapseStateTargetSchema = z.object({
  FieldId: z.string().optional(),
  FieldDataPathValues: z.array(DataPathValueSchema).optional(),
});

const PivotTableFieldCollapseStateOptionSchema = z.object({
  Target: PivotTableFieldCollapseStateTargetSchema,
  State: z.enum(["COLLAPSED", "EXPANDED"]).optional(),
});

const PivotTableDataPathOptionSchema = z.object({
  DataPathList: z.array(DataPathValueSchema),
  Width: z.string().describe(
    "String based length that is composed of value and unit in px",
  ).optional(),
});

const PivotTableFieldOptionSchema = z.object({
  CustomLabel: z.string().min(1).max(2048).optional(),
  FieldId: z.string().min(1).max(512),
  Visibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
});

const PivotTableFieldOptionsSchema = z.object({
  CollapseStateOptions: z.array(PivotTableFieldCollapseStateOptionSchema)
    .optional(),
  DataPathOptions: z.array(PivotTableDataPathOptionSchema).optional(),
  SelectedFieldOptions: z.array(PivotTableFieldOptionSchema).optional(),
});

const PivotTableFieldSubtotalOptionsSchema = z.object({
  FieldId: z.string().min(1).max(512).optional(),
});

const TableStyleTargetSchema = z.object({
  CellType: z.enum(["TOTAL", "METRIC_HEADER", "VALUE"]),
});

const SubtotalOptionsSchema = z.object({
  CustomLabel: z.string().optional(),
  FieldLevelOptions: z.array(PivotTableFieldSubtotalOptionsSchema).optional(),
  ValueCellStyle: TableCellStyleSchema.optional(),
  TotalCellStyle: TableCellStyleSchema.optional(),
  TotalsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  FieldLevel: z.enum(["ALL", "CUSTOM", "LAST"]).optional(),
  MetricHeaderCellStyle: TableCellStyleSchema.optional(),
  StyleTargets: z.array(TableStyleTargetSchema).optional(),
});

const PivotTotalOptionsSchema = z.object({
  TotalAggregationOptions: z.array(TotalAggregationOptionSchema).optional(),
  CustomLabel: z.string().optional(),
  ValueCellStyle: TableCellStyleSchema.optional(),
  ScrollStatus: z.enum(["PINNED", "SCROLLED"]).optional(),
  Placement: z.enum(["START", "END", "AUTO"]).optional(),
  TotalCellStyle: TableCellStyleSchema.optional(),
  TotalsVisibility: z.enum(["HIDDEN", "VISIBLE"]).optional(),
  MetricHeaderCellStyle: TableCellStyleSchema.optional(),
});

const PivotTableTotalOptionsSchema = z.object({
  ColumnSubtotalOptions: SubtotalOptionsSchema.optional(),
  RowSubtotalOptions: SubtotalOptionsSchema.optional(),
  RowTotalOptions: PivotTotalOptionsSchema.optional(),
  ColumnTotalOptions: PivotTotalOptionsSchema.optional(),
});

const PivotTableConfigurationSchema = z.object({
  SortConfiguration: PivotTableSortConfigurationSchema.optional(),
  PaginatedReportOptions: PivotTablePaginatedReportOptionsSchema.optional(),
  TableOptions: PivotTableOptionsSchema.optional(),
  FieldWells: PivotTableFieldWellsSchema.optional(),
  FieldOptions: PivotTableFieldOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  TotalOptions: PivotTableTotalOptionsSchema.optional(),
});

const PivotTableVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  ConditionalFormatting: PivotTableConditionalFormattingSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: PivotTableConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
});

const BarChartSortConfigurationSchema = z.object({
  SmallMultiplesSort: z.array(FieldSortOptionsSchema).optional(),
  ColorSort: z.array(FieldSortOptionsSchema).optional(),
  ColorItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategoryItemsLimit: ItemsLimitConfigurationSchema.optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
  SmallMultiplesLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
});

const BarChartDefaultSeriesSettingsSchema = z.object({
  BorderSettings: BorderSettingsSchema.optional(),
  DecalSettings: DecalSettingsSchema.optional(),
});

const BarSeriesItemSchema = z.object({});

const BarChartAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Colors: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
  SmallMultiples: z.array(DimensionFieldSchema).optional(),
});

const BarChartFieldWellsSchema = z.object({
  BarChartAggregatedFieldWells: BarChartAggregatedFieldWellsSchema.optional(),
});

const BarChartConfigurationSchema = z.object({
  SortConfiguration: BarChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  ReferenceLines: z.array(ReferenceLineSchema).optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  ColorLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  CategoryLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  SmallMultiplesOptions: SmallMultiplesOptionsSchema.optional(),
  Orientation: z.enum(["HORIZONTAL", "VERTICAL"]).optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  ValueLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  BarsArrangement: z.enum(["CLUSTERED", "STACKED", "STACKED_PERCENT"])
    .optional(),
  DefaultSeriesSettings: BarChartDefaultSeriesSettingsSchema.optional(),
  Series: z.array(BarSeriesItemSchema).optional(),
  CategoryAxis: AxisDisplayOptionsSchema.optional(),
  ContributionAnalysisDefaults: z.array(ContributionAnalysisDefaultSchema)
    .optional(),
  FieldWells: BarChartFieldWellsSchema.optional(),
  ValueAxis: AxisDisplayOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

const BarChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: BarChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const HeatMapSortConfigurationSchema = z.object({
  HeatMapRowSort: z.array(FieldSortOptionsSchema).optional(),
  HeatMapRowItemsLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
  HeatMapColumnItemsLimitConfiguration: ItemsLimitConfigurationSchema
    .optional(),
  HeatMapColumnSort: z.array(FieldSortOptionsSchema).optional(),
});

const HeatMapAggregatedFieldWellsSchema = z.object({
  Values: z.array(MeasureFieldSchema).optional(),
  Columns: z.array(DimensionFieldSchema).optional(),
  Rows: z.array(DimensionFieldSchema).optional(),
});

const HeatMapFieldWellsSchema = z.object({
  HeatMapAggregatedFieldWells: HeatMapAggregatedFieldWellsSchema.optional(),
});

const DataColorSchema = z.object({
  DataValue: z.number().optional(),
  Color: z.string().regex(new RegExp("^#[A-F0-9]{6}$")).optional(),
});

const ColorScaleSchema = z.object({
  Colors: z.array(DataColorSchema),
  ColorFillType: z.enum(["DISCRETE", "GRADIENT"]),
  NullValueColor: DataColorSchema.optional(),
});

const HeatMapConfigurationSchema = z.object({
  SortConfiguration: HeatMapSortConfigurationSchema.optional(),
  ColumnLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  FieldWells: HeatMapFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  ColorScale: ColorScaleSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  RowLabelOptions: ChartAxisLabelOptionsSchema.optional(),
});

const HeatMapVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: HeatMapConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const TreeMapSortConfigurationSchema = z.object({
  TreeMapSort: z.array(FieldSortOptionsSchema).optional(),
  TreeMapGroupItemsLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
});

const TreeMapAggregatedFieldWellsSchema = z.object({
  Sizes: z.array(MeasureFieldSchema).optional(),
  Colors: z.array(MeasureFieldSchema).optional(),
  Groups: z.array(DimensionFieldSchema).optional(),
});

const TreeMapFieldWellsSchema = z.object({
  TreeMapAggregatedFieldWells: TreeMapAggregatedFieldWellsSchema.optional(),
});

const TreeMapConfigurationSchema = z.object({
  SortConfiguration: TreeMapSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  ColorLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  SizeLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  FieldWells: TreeMapFieldWellsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  ColorScale: ColorScaleSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
  GroupLabelOptions: ChartAxisLabelOptionsSchema.optional(),
});

const TreeMapVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: TreeMapConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const PeriodToDateComputationSchema = z.object({
  PeriodTimeGranularity: z.enum([
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
  Value: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

const GrowthRateComputationSchema = z.object({
  Value: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  PeriodSize: z.number().min(2).max(52).optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

const TopBottomRankedComputationSchema = z.object({
  Type: z.enum(["TOP", "BOTTOM"]),
  Category: DimensionFieldSchema.optional(),
  ResultSize: z.number().min(1).max(20).optional(),
  Value: MeasureFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

const TotalAggregationComputationSchema = z.object({
  Value: MeasureFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

const ForecastComputationSchema = z.object({
  PeriodsBackward: z.number().min(0).max(1000).optional(),
  PeriodsForward: z.number().min(1).max(1000).optional(),
  PredictionInterval: z.number().min(50).max(95).optional(),
  Seasonality: z.enum(["AUTOMATIC", "CUSTOM"]).optional(),
  CustomSeasonalityValue: z.number().min(1).max(180).optional(),
  Value: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  UpperBoundary: z.number().optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
  LowerBoundary: z.number().optional(),
});

const MaximumMinimumComputationSchema = z.object({
  Type: z.enum(["MAXIMUM", "MINIMUM"]),
  Value: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

const PeriodOverPeriodComputationSchema = z.object({
  Value: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

const MetricComparisonComputationSchema = z.object({
  TargetValue: MeasureFieldSchema.optional(),
  Time: DimensionFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  FromValue: MeasureFieldSchema.optional(),
  Name: z.string().optional(),
});

const TopBottomMoversComputationSchema = z.object({
  Type: z.enum(["TOP", "BOTTOM"]),
  Category: DimensionFieldSchema.optional(),
  Value: MeasureFieldSchema.optional(),
  SortOrder: z.enum(["PERCENT_DIFFERENCE", "ABSOLUTE_DIFFERENCE"]).optional(),
  Time: DimensionFieldSchema.optional(),
  MoverSize: z.number().min(1).max(20).optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

const UniqueValuesComputationSchema = z.object({
  Category: DimensionFieldSchema.optional(),
  ComputationId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Name: z.string().optional(),
});

const ComputationSchema = z.object({
  PeriodToDate: PeriodToDateComputationSchema.optional(),
  GrowthRate: GrowthRateComputationSchema.optional(),
  TopBottomRanked: TopBottomRankedComputationSchema.optional(),
  TotalAggregation: TotalAggregationComputationSchema.optional(),
  Forecast: ForecastComputationSchema.optional(),
  MaximumMinimum: MaximumMinimumComputationSchema.optional(),
  PeriodOverPeriod: PeriodOverPeriodComputationSchema.optional(),
  MetricComparison: MetricComparisonComputationSchema.optional(),
  TopBottomMovers: TopBottomMoversComputationSchema.optional(),
  UniqueValues: UniqueValuesComputationSchema.optional(),
});

const CustomNarrativeOptionsSchema = z.object({
  Narrative: z.string().min(0).max(150000),
});

const InsightConfigurationSchema = z.object({
  Computations: z.array(ComputationSchema).optional(),
  CustomNarrative: CustomNarrativeOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

const InsightVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Actions: z.array(VisualCustomActionSchema).optional(),
  DataSetIdentifier: z.string().min(0).max(2048).optional(),
  InsightConfiguration: InsightConfigurationSchema.optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  TopicIdentifier: z.string().min(1).max(2048).optional(),
});

const LineChartSortConfigurationSchema = z.object({
  CategoryItemsLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
  ColorItemsLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
  SmallMultiplesSort: z.array(FieldSortOptionsSchema).optional(),
  CategorySort: z.array(FieldSortOptionsSchema).optional(),
  SmallMultiplesLimitConfiguration: ItemsLimitConfigurationSchema.optional(),
});

const MissingDataConfigurationSchema = z.object({
  TreatmentOption: z.enum(["INTERPOLATE", "SHOW_AS_ZERO", "SHOW_AS_BLANK"])
    .optional(),
});

const LineSeriesAxisDisplayOptionsSchema = z.object({
  MissingDataConfigurations: z.array(MissingDataConfigurationSchema).optional(),
  AxisOptions: AxisDisplayOptionsSchema.optional(),
});

const LineChartDefaultSeriesSettingsSchema = z.object({
  DecalSettings: DecalSettingsSchema.optional(),
  LineStyleSettings: LineChartLineStyleSettingsSchema.optional(),
  AxisBinding: z.enum(["PRIMARY_YAXIS", "SECONDARY_YAXIS"]).optional(),
  MarkerStyleSettings: LineChartMarkerStyleSettingsSchema.optional(),
});

const TimeBasedForecastPropertiesSchema = z.object({
  PeriodsBackward: z.number().min(0).max(1000).optional(),
  PeriodsForward: z.number().min(1).max(1000).optional(),
  PredictionInterval: z.number().min(50).max(95).optional(),
  Seasonality: z.number().min(1).max(180).optional(),
  UpperBoundary: z.number().optional(),
  LowerBoundary: z.number().optional(),
});

const WhatIfRangeScenarioSchema = z.object({
  StartDate: z.string(),
  Value: z.number(),
  EndDate: z.string(),
});

const WhatIfPointScenarioSchema = z.object({
  Value: z.number(),
  Date: z.string(),
});

const ForecastScenarioSchema = z.object({
  WhatIfRangeScenario: WhatIfRangeScenarioSchema.optional(),
  WhatIfPointScenario: WhatIfPointScenarioSchema.optional(),
});

const ForecastConfigurationSchema = z.object({
  ForecastProperties: TimeBasedForecastPropertiesSchema.optional(),
  Scenario: ForecastScenarioSchema.optional(),
});

const LineChartSeriesSettingsSchema = z.object({
  DecalSettings: DecalSettingsSchema.optional(),
  LineStyleSettings: LineChartLineStyleSettingsSchema.optional(),
  MarkerStyleSettings: LineChartMarkerStyleSettingsSchema.optional(),
});

const FieldSeriesItemSchema = z.object({
  FieldId: z.string().min(1).max(512),
  AxisBinding: z.enum(["PRIMARY_YAXIS", "SECONDARY_YAXIS"]),
  Settings: LineChartSeriesSettingsSchema.optional(),
});

const DataFieldSeriesItemSchema = z.object({
  FieldId: z.string().min(1).max(512),
  AxisBinding: z.enum(["PRIMARY_YAXIS", "SECONDARY_YAXIS"]),
  FieldValue: z.string().optional(),
  Settings: LineChartSeriesSettingsSchema.optional(),
});

const SeriesItemSchema = z.object({
  FieldSeriesItem: FieldSeriesItemSchema.optional(),
  DataFieldSeriesItem: DataFieldSeriesItemSchema.optional(),
});

const LineChartAggregatedFieldWellsSchema = z.object({
  Category: z.array(DimensionFieldSchema).optional(),
  Colors: z.array(DimensionFieldSchema).optional(),
  Values: z.array(MeasureFieldSchema).optional(),
  SmallMultiples: z.array(DimensionFieldSchema).optional(),
});

const LineChartFieldWellsSchema = z.object({
  LineChartAggregatedFieldWells: LineChartAggregatedFieldWellsSchema.optional(),
});

const LineChartConfigurationSchema = z.object({
  SortConfiguration: LineChartSortConfigurationSchema.optional(),
  Legend: LegendOptionsSchema.optional(),
  ReferenceLines: z.array(ReferenceLineSchema).optional(),
  DataLabels: DataLabelOptionsSchema.optional(),
  Tooltip: TooltipOptionsSchema.optional(),
  SingleAxisOptions: SingleAxisOptionsSchema.optional(),
  SmallMultiplesOptions: SmallMultiplesOptionsSchema.optional(),
  PrimaryYAxisDisplayOptions: LineSeriesAxisDisplayOptionsSchema.optional(),
  VisualPalette: VisualPaletteSchema.optional(),
  XAxisDisplayOptions: AxisDisplayOptionsSchema.optional(),
  DefaultSeriesSettings: LineChartDefaultSeriesSettingsSchema.optional(),
  SecondaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  ForecastConfigurations: z.array(ForecastConfigurationSchema).optional(),
  Series: z.array(SeriesItemSchema).optional(),
  Type: z.enum(["LINE", "AREA", "STACKED_AREA"]).optional(),
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  ContributionAnalysisDefaults: z.array(ContributionAnalysisDefaultSchema)
    .optional(),
  FieldWells: LineChartFieldWellsSchema.optional(),
  SecondaryYAxisDisplayOptions: LineSeriesAxisDisplayOptionsSchema.optional(),
  XAxisLabelOptions: ChartAxisLabelOptionsSchema.optional(),
  Interactions: VisualInteractionOptionsSchema.optional(),
});

const LineChartVisualSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsSchema.optional(),
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  ChartConfiguration: LineChartConfigurationSchema.optional(),
  Actions: z.array(VisualCustomActionSchema).optional(),
  Title: VisualTitleLabelOptionsSchema.optional(),
  VisualContentAltText: z.string().min(1).max(1024).optional(),
  ColumnHierarchies: z.array(ColumnHierarchySchema).optional(),
});

const EmptyVisualSchema = z.object({
  VisualId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Actions: z.array(VisualCustomActionSchema).optional(),
  DataSetIdentifier: z.string().min(0).max(2048).optional(),
  TopicIdentifier: z.string().min(1).max(2048).optional(),
});

const VisualSchema = z.object({
  FunnelChartVisual: FunnelChartVisualSchema.optional(),
  BoxPlotVisual: BoxPlotVisualSchema.optional(),
  LayerMapVisual: LayerMapVisualSchema.optional(),
  GeospatialMapVisual: GeospatialMapVisualSchema.optional(),
  ScatterPlotVisual: ScatterPlotVisualSchema.optional(),
  RadarChartVisual: RadarChartVisualSchema.optional(),
  ComboChartVisual: ComboChartVisualSchema.optional(),
  WordCloudVisual: WordCloudVisualSchema.optional(),
  SankeyDiagramVisual: SankeyDiagramVisualSchema.optional(),
  GaugeChartVisual: GaugeChartVisualSchema.optional(),
  FilledMapVisual: FilledMapVisualSchema.optional(),
  WaterfallVisual: WaterfallVisualSchema.optional(),
  CustomContentVisual: CustomContentVisualSchema.optional(),
  PieChartVisual: PieChartVisualSchema.optional(),
  KPIVisual: KPIVisualSchema.optional(),
  HistogramVisual: HistogramVisualSchema.optional(),
  PluginVisual: PluginVisualSchema.optional(),
  TableVisual: TableVisualSchema.optional(),
  PivotTableVisual: PivotTableVisualSchema.optional(),
  BarChartVisual: BarChartVisualSchema.optional(),
  HeatMapVisual: HeatMapVisualSchema.optional(),
  TreeMapVisual: TreeMapVisualSchema.optional(),
  InsightVisual: InsightVisualSchema.optional(),
  LineChartVisual: LineChartVisualSchema.optional(),
  EmptyVisual: EmptyVisualSchema.optional(),
});

const SheetDefinitionSchema = z.object({
  Description: z.string().min(1).max(1024).optional(),
  ParameterControls: z.array(ParameterControlSchema).optional(),
  ContentType: z.enum(["PAGINATED", "INTERACTIVE"]).optional(),
  SheetId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")),
  Images: z.array(SheetImageSchema).optional(),
  SheetControlLayouts: z.array(SheetControlLayoutSchema).optional(),
  Title: z.string().min(1).max(1024).optional(),
  Name: z.string().min(1).max(2048).optional(),
  TextBoxes: z.array(SheetTextBoxSchema).optional(),
  Layouts: z.array(LayoutSchema).optional(),
  FilterControls: z.array(FilterControlSchema).optional(),
  CustomActionDefaults: VisualCustomActionDefaultsSchema.optional(),
  Visuals: z.array(VisualSchema).optional(),
});

const MappedDataSetParameterSchema = z.object({
  DataSetParameterName: z.string().min(1).max(2048).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ),
  DataSetIdentifier: z.string().min(0).max(2048),
});

const DynamicDefaultValueSchema = z.object({
  GroupNameColumn: ColumnIdentifierSchema.optional(),
  DefaultValueColumn: ColumnIdentifierSchema,
  UserNameColumn: ColumnIdentifierSchema.optional(),
});

const StringDefaultValuesSchema = z.object({
  DynamicValue: DynamicDefaultValueSchema.optional(),
  StaticValues: z.array(z.string()).optional(),
});

const StringValueWhenUnsetConfigurationSchema = z.object({
  ValueWhenUnsetOption: z.enum(["RECOMMENDED_VALUE", "NULL"]).optional(),
  CustomValue: z.string().optional(),
});

const StringParameterDeclarationSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterSchema).optional(),
  DefaultValues: StringDefaultValuesSchema.optional(),
  ParameterValueType: z.enum(["MULTI_VALUED", "SINGLE_VALUED"]),
  ValueWhenUnset: StringValueWhenUnsetConfigurationSchema.optional(),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$")),
});

const DateTimeDefaultValuesSchema = z.object({
  RollingDate: RollingDateConfigurationSchema.optional(),
  DynamicValue: DynamicDefaultValueSchema.optional(),
  StaticValues: z.array(z.string()).optional(),
});

const DateTimeValueWhenUnsetConfigurationSchema = z.object({
  ValueWhenUnsetOption: z.enum(["RECOMMENDED_VALUE", "NULL"]).optional(),
  CustomValue: z.string().optional(),
});

const DateTimeParameterDeclarationSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterSchema).optional(),
  DefaultValues: DateTimeDefaultValuesSchema.optional(),
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
  ValueWhenUnset: DateTimeValueWhenUnsetConfigurationSchema.optional(),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$")),
});

const DecimalDefaultValuesSchema = z.object({
  DynamicValue: DynamicDefaultValueSchema.optional(),
  StaticValues: z.array(z.number()).optional(),
});

const DecimalValueWhenUnsetConfigurationSchema = z.object({
  ValueWhenUnsetOption: z.enum(["RECOMMENDED_VALUE", "NULL"]).optional(),
  CustomValue: z.number().optional(),
});

const DecimalParameterDeclarationSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterSchema).optional(),
  DefaultValues: DecimalDefaultValuesSchema.optional(),
  ParameterValueType: z.enum(["MULTI_VALUED", "SINGLE_VALUED"]),
  ValueWhenUnset: DecimalValueWhenUnsetConfigurationSchema.optional(),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$")),
});

const IntegerDefaultValuesSchema = z.object({
  DynamicValue: DynamicDefaultValueSchema.optional(),
  StaticValues: z.array(z.number()).optional(),
});

const IntegerValueWhenUnsetConfigurationSchema = z.object({
  ValueWhenUnsetOption: z.enum(["RECOMMENDED_VALUE", "NULL"]).optional(),
  CustomValue: z.number().optional(),
});

const IntegerParameterDeclarationSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterSchema).optional(),
  DefaultValues: IntegerDefaultValuesSchema.optional(),
  ParameterValueType: z.enum(["MULTI_VALUED", "SINGLE_VALUED"]),
  ValueWhenUnset: IntegerValueWhenUnsetConfigurationSchema.optional(),
  Name: z.string().min(1).max(2048).regex(new RegExp("^[a-zA-Z0-9]+$")),
});

const ParameterDeclarationSchema = z.object({
  StringParameterDeclaration: StringParameterDeclarationSchema.optional(),
  DateTimeParameterDeclaration: DateTimeParameterDeclarationSchema.optional(),
  DecimalParameterDeclaration: DecimalParameterDeclarationSchema.optional(),
  IntegerParameterDeclaration: IntegerParameterDeclarationSchema.optional(),
});

const EntitySchema = z.object({
  Path: z.string().regex(new RegExp("\\S")).optional(),
});

const AnalysisErrorSchema = z.object({
  Type: z.enum([
    "ACCESS_DENIED",
    "SOURCE_NOT_FOUND",
    "DATA_SET_NOT_FOUND",
    "INTERNAL_FAILURE",
    "PARAMETER_VALUE_INCOMPATIBLE",
    "PARAMETER_TYPE_INVALID",
    "PARAMETER_NOT_FOUND",
    "COLUMN_TYPE_MISMATCH",
    "COLUMN_GEOGRAPHIC_ROLE_MISMATCH",
    "COLUMN_REPLACEMENT_MISSING",
  ]).optional(),
  Message: z.string().regex(new RegExp("\\S")).describe(
    "The message associated with the analysis error.",
  ).optional(),
  ViolatedEntities: z.array(EntitySchema).describe(
    "Lists the violated entities that caused the analysis error",
  ).optional(),
});

const ResourcePermissionSchema = z.object({
  Actions: z.array(z.string()).describe(
    "The IAM action to grant or revoke permissions on.",
  ),
  Principal: z.string().min(1).max(256).describe(
    "The Amazon Resource Name (ARN) of the principal. This can be one of the following:   The ARN of an Amazon Quick user or group associated with a data source or dataset. (This is common.)   The ARN of an Amazon Quick user, group, or namespace associated with an analysis, dashboard, template, or theme. (This is common.)   The ARN of an Amazon Web Services account root: This is an IAM ARN rather than a QuickSight ARN. Use this option only to share resources (templates) across Amazon Web Services accounts. (This is less common.)",
  ),
});

const TagSchema = z.object({
  Value: z.string().min(1).max(256).describe("Tag value."),
  Key: z.string().min(1).max(128).describe("Tag key."),
});

const SheetSchema = z.object({
  SheetId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$")).describe(
    "The unique identifier associated with a sheet.",
  ).optional(),
  Name: z.string().min(1).max(2048).describe(
    "The name of a sheet. This name is displayed on the sheet's tab in the Quick console.",
  ).optional(),
});

const StringParameterStateSchema = z.object({
  Values: z.array(z.string()),
  Name: z.string(),
}).partial();

const DecimalParameterStateSchema = z.object({
  Values: z.array(z.number()),
  Name: z.string(),
}).partial();

const IntegerParameterStateSchema = z.object({
  Values: z.array(z.number()),
  Name: z.string(),
}).partial();

const DateTimeParameterStateSchema = z.object({
  Values: z.array(z.string()),
  Name: z.string(),
}).partial();

const DataSetReferenceStateSchema = z.object({
  DataSetArn: z.string(),
  DataSetPlaceholder: z.string(),
}).partial();

const TopicReferenceStateSchema = z.object({
  TopicArn: z.string(),
  TopicPlaceholder: z.string(),
}).partial();

const AnalysisSourceTemplateStateSchema = z.object({
  DataSetReferences: z.array(DataSetReferenceStateSchema),
  Arn: z.string(),
  TopicReferences: z.array(TopicReferenceStateSchema),
}).partial();

const VisualHighlightOperationStateSchema = z.object({
  Trigger: z.string(),
}).partial();

const VisualCustomActionDefaultsStateSchema = z.object({
  HighlightOperation: VisualHighlightOperationStateSchema,
}).partial();

const VisualMessageConfigurationStateSchema = z.object({
  TitleVisibility: z.string(),
  Description: z.string(),
  LinkUrl: z.string(),
  LinkVisibility: z.string(),
  Enabled: z.boolean(),
  Title: z.string(),
  DescriptionVisibility: z.string(),
  LinkText: z.string(),
}).partial();

const VisualMessagesStateSchema = z.object({
  NoDataMessage: VisualMessageConfigurationStateSchema,
}).partial();

const AssetOptionsStateSchema = z.object({
  Timezone: z.string(),
  WeekStart: z.string(),
  CustomActionDefaults: VisualCustomActionDefaultsStateSchema,
  VisualMessages: VisualMessagesStateSchema,
}).partial();

const ColumnIdentifierStateSchema = z.object({
  ColumnName: z.string(),
  DataSetIdentifier: z.string(),
  TopicIdentifier: z.string(),
}).partial();

const CustomFilterListConfigurationStateSchema = z.object({
  CategoryValues: z.array(z.string()),
  NullOption: z.string(),
  MatchOperator: z.string(),
  SelectAllOptions: z.string(),
}).partial();

const CustomFilterConfigurationStateSchema = z.object({
  CategoryValue: z.string(),
  ParameterName: z.string(),
  NullOption: z.string(),
  MatchOperator: z.string(),
  SelectAllOptions: z.string(),
}).partial();

const FilterListConfigurationStateSchema = z.object({
  CategoryValues: z.array(z.string()),
  NullOption: z.string(),
  MatchOperator: z.string(),
  SelectAllOptions: z.string(),
}).partial();

const CategoryFilterConfigurationStateSchema = z.object({
  CustomFilterListConfiguration: CustomFilterListConfigurationStateSchema,
  CustomFilterConfiguration: CustomFilterConfigurationStateSchema,
  FilterListConfiguration: FilterListConfigurationStateSchema,
}).partial();

const FontSizeStateSchema = z.object({
  Relative: z.string(),
  Absolute: z.string(),
}).partial();

const FontWeightStateSchema = z.object({
  Name: z.string(),
}).partial();

const FontConfigurationStateSchema = z.object({
  FontFamily: z.string(),
  FontStyle: z.string(),
  FontSize: FontSizeStateSchema,
  FontDecoration: z.string(),
  FontColor: z.string(),
  FontWeight: FontWeightStateSchema,
}).partial();

const LabelOptionsStateSchema = z.object({
  CustomLabel: z.string(),
  Visibility: z.string(),
  FontConfiguration: FontConfigurationStateSchema,
}).partial();

const SheetControlInfoIconLabelOptionsStateSchema = z.object({
  Visibility: z.string(),
  InfoIconText: z.string(),
}).partial();

const SliderControlDisplayOptionsStateSchema = z.object({
  TitleOptions: LabelOptionsStateSchema,
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsStateSchema,
}).partial();

const DefaultSliderControlOptionsStateSchema = z.object({
  Type: z.string(),
  StepSize: z.number(),
  DisplayOptions: SliderControlDisplayOptionsStateSchema,
  MaximumValue: z.number(),
  MinimumValue: z.number(),
}).partial();

const RelativeDateTimeControlDisplayOptionsStateSchema = z.object({
  TitleOptions: LabelOptionsStateSchema,
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsStateSchema,
  DateTimeFormat: z.string(),
}).partial();

const DefaultRelativeDateTimeControlOptionsStateSchema = z.object({
  DisplayOptions: RelativeDateTimeControlDisplayOptionsStateSchema,
  CommitMode: z.string(),
}).partial();

const TextControlPlaceholderOptionsStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const TextFieldControlDisplayOptionsStateSchema = z.object({
  TitleOptions: LabelOptionsStateSchema,
  PlaceholderOptions: TextControlPlaceholderOptionsStateSchema,
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsStateSchema,
}).partial();

const DefaultTextFieldControlOptionsStateSchema = z.object({
  DisplayOptions: TextFieldControlDisplayOptionsStateSchema,
}).partial();

const TextAreaControlDisplayOptionsStateSchema = z.object({
  TitleOptions: LabelOptionsStateSchema,
  PlaceholderOptions: TextControlPlaceholderOptionsStateSchema,
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsStateSchema,
}).partial();

const DefaultTextAreaControlOptionsStateSchema = z.object({
  Delimiter: z.string(),
  DisplayOptions: TextAreaControlDisplayOptionsStateSchema,
}).partial();

const ListControlSelectAllOptionsStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const DropDownControlDisplayOptionsStateSchema = z.object({
  TitleOptions: LabelOptionsStateSchema,
  SelectAllOptions: ListControlSelectAllOptionsStateSchema,
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsStateSchema,
}).partial();

const FilterSelectableValuesStateSchema = z.object({
  Values: z.array(z.string()),
}).partial();

const DefaultFilterDropDownControlOptionsStateSchema = z.object({
  Type: z.string(),
  DisplayOptions: DropDownControlDisplayOptionsStateSchema,
  CommitMode: z.string(),
  SelectableValues: FilterSelectableValuesStateSchema,
}).partial();

const DateTimePickerControlDisplayOptionsStateSchema = z.object({
  TitleOptions: LabelOptionsStateSchema,
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsStateSchema,
  HelperTextVisibility: z.string(),
  DateIconVisibility: z.string(),
  DateTimeFormat: z.string(),
}).partial();

const DefaultDateTimePickerControlOptionsStateSchema = z.object({
  Type: z.string(),
  DisplayOptions: DateTimePickerControlDisplayOptionsStateSchema,
  CommitMode: z.string(),
}).partial();

const ListControlSearchOptionsStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const ListControlDisplayOptionsStateSchema = z.object({
  TitleOptions: LabelOptionsStateSchema,
  SearchOptions: ListControlSearchOptionsStateSchema,
  SelectAllOptions: ListControlSelectAllOptionsStateSchema,
  InfoIconLabelOptions: SheetControlInfoIconLabelOptionsStateSchema,
}).partial();

const DefaultFilterListControlOptionsStateSchema = z.object({
  Type: z.string(),
  DisplayOptions: ListControlDisplayOptionsStateSchema,
  SelectableValues: FilterSelectableValuesStateSchema,
}).partial();

const DefaultFilterControlOptionsStateSchema = z.object({
  DefaultSliderOptions: DefaultSliderControlOptionsStateSchema,
  DefaultRelativeDateTimeOptions:
    DefaultRelativeDateTimeControlOptionsStateSchema,
  DefaultTextFieldOptions: DefaultTextFieldControlOptionsStateSchema,
  DefaultTextAreaOptions: DefaultTextAreaControlOptionsStateSchema,
  DefaultDropdownOptions: DefaultFilterDropDownControlOptionsStateSchema,
  DefaultDateTimePickerOptions: DefaultDateTimePickerControlOptionsStateSchema,
  DefaultListOptions: DefaultFilterListControlOptionsStateSchema,
}).partial();

const DefaultFilterControlConfigurationStateSchema = z.object({
  ControlOptions: DefaultFilterControlOptionsStateSchema,
  Title: z.string(),
}).partial();

const CategoryInnerFilterStateSchema = z.object({
  Configuration: CategoryFilterConfigurationStateSchema,
  Column: ColumnIdentifierStateSchema,
  DefaultFilterControlConfiguration:
    DefaultFilterControlConfigurationStateSchema,
}).partial();

const InnerFilterStateSchema = z.object({
  CategoryInnerFilter: CategoryInnerFilterStateSchema,
}).partial();

const NestedFilterStateSchema = z.object({
  Column: ColumnIdentifierStateSchema,
  InnerFilter: InnerFilterStateSchema,
  IncludeInnerSet: z.boolean(),
  FilterId: z.string(),
}).partial();

const AttributeAggregationFunctionStateSchema = z.object({
  SimpleAttributeAggregation: z.string(),
  ValueForMultipleValues: z.string(),
}).partial();

const PercentileAggregationStateSchema = z.object({
  PercentileValue: z.number(),
}).partial();

const NumericalAggregationFunctionStateSchema = z.object({
  PercentileAggregation: PercentileAggregationStateSchema,
  SimpleNumericalAggregation: z.string(),
}).partial();

const AggregationFunctionStateSchema = z.object({
  AttributeAggregationFunction: AttributeAggregationFunctionStateSchema,
  DateAggregationFunction: z.string(),
  NumericalAggregationFunction: NumericalAggregationFunctionStateSchema,
  CategoricalAggregationFunction: z.string(),
}).partial();

const NumericEqualityFilterStateSchema = z.object({
  AggregationFunction: AggregationFunctionStateSchema,
  Column: ColumnIdentifierStateSchema,
  Value: z.number(),
  ParameterName: z.string(),
  NullOption: z.string(),
  MatchOperator: z.string(),
  SelectAllOptions: z.string(),
  DefaultFilterControlConfiguration:
    DefaultFilterControlConfigurationStateSchema,
  FilterId: z.string(),
}).partial();

const NumericRangeFilterValueStateSchema = z.object({
  StaticValue: z.number(),
  Parameter: z.string(),
}).partial();

const NumericRangeFilterStateSchema = z.object({
  AggregationFunction: AggregationFunctionStateSchema,
  Column: ColumnIdentifierStateSchema,
  IncludeMaximum: z.boolean(),
  RangeMinimum: NumericRangeFilterValueStateSchema,
  NullOption: z.string(),
  SelectAllOptions: z.string(),
  DefaultFilterControlConfiguration:
    DefaultFilterControlConfigurationStateSchema,
  FilterId: z.string(),
  RangeMaximum: NumericRangeFilterValueStateSchema,
  IncludeMinimum: z.boolean(),
}).partial();

const RollingDateConfigurationStateSchema = z.object({
  Expression: z.string(),
  DataSetIdentifier: z.string(),
}).partial();

const TimeRangeFilterValueStateSchema = z.object({
  RollingDate: RollingDateConfigurationStateSchema,
  StaticValue: z.string(),
  Parameter: z.string(),
}).partial();

const ExcludePeriodConfigurationStateSchema = z.object({
  Status: z.string(),
  Amount: z.number(),
  Granularity: z.string(),
}).partial();

const TimeRangeFilterStateSchema = z.object({
  RangeMinimumValue: TimeRangeFilterValueStateSchema,
  Column: ColumnIdentifierStateSchema,
  RangeMaximumValue: TimeRangeFilterValueStateSchema,
  IncludeMaximum: z.boolean(),
  TimeGranularity: z.string(),
  NullOption: z.string(),
  DefaultFilterControlConfiguration:
    DefaultFilterControlConfigurationStateSchema,
  FilterId: z.string(),
  IncludeMinimum: z.boolean(),
  ExcludePeriodConfiguration: ExcludePeriodConfigurationStateSchema,
}).partial();

const AnchorDateConfigurationStateSchema = z.object({
  AnchorOption: z.string(),
  ParameterName: z.string(),
}).partial();

const RelativeDatesFilterStateSchema = z.object({
  RelativeDateValue: z.number(),
  Column: ColumnIdentifierStateSchema,
  RelativeDateType: z.string(),
  TimeGranularity: z.string(),
  ParameterName: z.string(),
  NullOption: z.string(),
  DefaultFilterControlConfiguration:
    DefaultFilterControlConfigurationStateSchema,
  FilterId: z.string(),
  AnchorDateConfiguration: AnchorDateConfigurationStateSchema,
  MinimumGranularity: z.string(),
  ExcludePeriodConfiguration: ExcludePeriodConfigurationStateSchema,
}).partial();

const AggregationSortConfigurationStateSchema = z.object({
  AggregationFunction: AggregationFunctionStateSchema,
  SortDirection: z.string(),
  Column: ColumnIdentifierStateSchema,
}).partial();

const TopBottomFilterStateSchema = z.object({
  AggregationSortConfigurations: z.array(
    AggregationSortConfigurationStateSchema,
  ),
  Column: ColumnIdentifierStateSchema,
  TimeGranularity: z.string(),
  ParameterName: z.string(),
  Limit: z.number(),
  DefaultFilterControlConfiguration:
    DefaultFilterControlConfigurationStateSchema,
  FilterId: z.string(),
}).partial();

const TimeEqualityFilterStateSchema = z.object({
  Column: ColumnIdentifierStateSchema,
  RollingDate: RollingDateConfigurationStateSchema,
  Value: z.string(),
  TimeGranularity: z.string(),
  ParameterName: z.string(),
  DefaultFilterControlConfiguration:
    DefaultFilterControlConfigurationStateSchema,
  FilterId: z.string(),
}).partial();

const CategoryFilterStateSchema = z.object({
  Configuration: CategoryFilterConfigurationStateSchema,
  Column: ColumnIdentifierStateSchema,
  DefaultFilterControlConfiguration:
    DefaultFilterControlConfigurationStateSchema,
  FilterId: z.string(),
}).partial();

const FilterStateSchema = z.object({
  NestedFilter: NestedFilterStateSchema,
  NumericEqualityFilter: NumericEqualityFilterStateSchema,
  NumericRangeFilter: NumericRangeFilterStateSchema,
  TimeRangeFilter: TimeRangeFilterStateSchema,
  RelativeDatesFilter: RelativeDatesFilterStateSchema,
  TopBottomFilter: TopBottomFilterStateSchema,
  TimeEqualityFilter: TimeEqualityFilterStateSchema,
  CategoryFilter: CategoryFilterStateSchema,
}).partial();

const SheetVisualScopingConfigurationStateSchema = z.object({
  Scope: z.string(),
  SheetId: z.string(),
  VisualIds: z.array(z.string()),
}).partial();

const SelectedSheetsFilterScopeConfigurationStateSchema = z.object({
  SheetVisualScopingConfigurations: z.array(
    SheetVisualScopingConfigurationStateSchema,
  ),
}).partial();

const FilterScopeConfigurationStateSchema = z.object({
  AllSheets: z.record(z.string(), z.unknown()),
  SelectedSheets: SelectedSheetsFilterScopeConfigurationStateSchema,
}).partial();

const FilterGroupStateSchema = z.object({
  Status: z.string(),
  Filters: z.array(FilterStateSchema),
  CrossDataset: z.string(),
  ScopeConfiguration: FilterScopeConfigurationStateSchema,
  FilterGroupId: z.string(),
}).partial();

const QueryExecutionOptionsStateSchema = z.object({
  QueryExecutionMode: z.string(),
}).partial();

const StaticFileUrlSourceOptionsStateSchema = z.object({
  Url: z.string(),
}).partial();

const StaticFileS3SourceOptionsStateSchema = z.object({
  BucketName: z.string(),
  ObjectKey: z.string(),
  Region: z.string(),
}).partial();

const StaticFileSourceStateSchema = z.object({
  UrlOptions: StaticFileUrlSourceOptionsStateSchema,
  S3Options: StaticFileS3SourceOptionsStateSchema,
}).partial();

const ImageStaticFileStateSchema = z.object({
  StaticFileId: z.string(),
  Source: StaticFileSourceStateSchema,
}).partial();

const SpatialStaticFileStateSchema = z.object({
  StaticFileId: z.string(),
  Source: StaticFileSourceStateSchema,
}).partial();

const StaticFileStateSchema = z.object({
  ImageStaticFile: ImageStaticFileStateSchema,
  SpatialStaticFile: SpatialStaticFileStateSchema,
}).partial();

const TopicIdentifierDeclarationStateSchema = z.object({
  Identifier: z.string(),
  TopicArn: z.string(),
}).partial();

const CalculatedFieldStateSchema = z.object({
  Expression: z.string(),
  DataSetIdentifier: z.string(),
  TopicIdentifier: z.string(),
  Name: z.string(),
}).partial();

const DataSetIdentifierDeclarationStateSchema = z.object({
  Identifier: z.string(),
  DataSetArn: z.string(),
}).partial();

const NegativeValueConfigurationStateSchema = z.object({
  DisplayMode: z.string(),
}).partial();

const DecimalPlacesConfigurationStateSchema = z.object({
  DecimalPlaces: z.number(),
}).partial();

const NullValueFormatConfigurationStateSchema = z.object({
  NullString: z.string(),
}).partial();

const ThousandSeparatorOptionsStateSchema = z.object({
  Symbol: z.string(),
  Visibility: z.string(),
  GroupingStyle: z.string(),
}).partial();

const NumericSeparatorConfigurationStateSchema = z.object({
  DecimalSeparator: z.string(),
  ThousandsSeparator: ThousandSeparatorOptionsStateSchema,
}).partial();

const NumberDisplayFormatConfigurationStateSchema = z.object({
  NegativeValueConfiguration: NegativeValueConfigurationStateSchema,
  DecimalPlacesConfiguration: DecimalPlacesConfigurationStateSchema,
  NumberScale: z.string(),
  NullValueFormatConfiguration: NullValueFormatConfigurationStateSchema,
  Suffix: z.string(),
  SeparatorConfiguration: NumericSeparatorConfigurationStateSchema,
  Prefix: z.string(),
}).partial();

const CurrencyDisplayFormatConfigurationStateSchema = z.object({
  NegativeValueConfiguration: NegativeValueConfigurationStateSchema,
  DecimalPlacesConfiguration: DecimalPlacesConfigurationStateSchema,
  NumberScale: z.string(),
  NullValueFormatConfiguration: NullValueFormatConfigurationStateSchema,
  Suffix: z.string(),
  SeparatorConfiguration: NumericSeparatorConfigurationStateSchema,
  Symbol: z.string(),
  Prefix: z.string(),
}).partial();

const PercentageDisplayFormatConfigurationStateSchema = z.object({
  NegativeValueConfiguration: NegativeValueConfigurationStateSchema,
  DecimalPlacesConfiguration: DecimalPlacesConfigurationStateSchema,
  NullValueFormatConfiguration: NullValueFormatConfigurationStateSchema,
  Suffix: z.string(),
  SeparatorConfiguration: NumericSeparatorConfigurationStateSchema,
  Prefix: z.string(),
}).partial();

const NumericFormatConfigurationStateSchema = z.object({
  NumberDisplayFormatConfiguration: NumberDisplayFormatConfigurationStateSchema,
  CurrencyDisplayFormatConfiguration:
    CurrencyDisplayFormatConfigurationStateSchema,
  PercentageDisplayFormatConfiguration:
    PercentageDisplayFormatConfigurationStateSchema,
}).partial();

const NumberFormatConfigurationStateSchema = z.object({
  FormatConfiguration: NumericFormatConfigurationStateSchema,
}).partial();

const DateTimeFormatConfigurationStateSchema = z.object({
  NumericFormatConfiguration: NumericFormatConfigurationStateSchema,
  NullValueFormatConfiguration: NullValueFormatConfigurationStateSchema,
  DateTimeFormat: z.string(),
}).partial();

const StringFormatConfigurationStateSchema = z.object({
  NumericFormatConfiguration: NumericFormatConfigurationStateSchema,
  NullValueFormatConfiguration: NullValueFormatConfigurationStateSchema,
}).partial();

const FormatConfigurationStateSchema = z.object({
  NumberFormatConfiguration: NumberFormatConfigurationStateSchema,
  DateTimeFormatConfiguration: DateTimeFormatConfigurationStateSchema,
  StringFormatConfiguration: StringFormatConfigurationStateSchema,
}).partial();

const DecalSettingsStateSchema = z.object({
  DecalStyleType: z.string(),
  DecalColor: z.string(),
  DecalVisibility: z.string(),
  DecalPatternType: z.string(),
  ElementValue: z.string(),
}).partial();

const DecalSettingsConfigurationStateSchema = z.object({
  CustomDecalSettings: z.array(DecalSettingsStateSchema),
}).partial();

const CustomColorStateSchema = z.object({
  Color: z.string(),
  FieldValue: z.string(),
  SpecialValue: z.string(),
}).partial();

const ColorsConfigurationStateSchema = z.object({
  CustomColors: z.array(CustomColorStateSchema),
}).partial();

const ColumnConfigurationStateSchema = z.object({
  Role: z.string(),
  FormatConfiguration: FormatConfigurationStateSchema,
  Column: ColumnIdentifierStateSchema,
  DecalSettingsConfiguration: DecalSettingsConfigurationStateSchema,
  ColorsConfiguration: ColorsConfigurationStateSchema,
}).partial();

const FreeFormLayoutScreenCanvasSizeOptionsStateSchema = z.object({
  OptimizedViewPortWidth: z.string(),
}).partial();

const FreeFormLayoutCanvasSizeOptionsStateSchema = z.object({
  ScreenCanvasSizeOptions: FreeFormLayoutScreenCanvasSizeOptionsStateSchema,
}).partial();

const DefaultFreeFormLayoutConfigurationStateSchema = z.object({
  CanvasSizeOptions: FreeFormLayoutCanvasSizeOptionsStateSchema,
}).partial();

const GridLayoutScreenCanvasSizeOptionsStateSchema = z.object({
  OptimizedViewPortWidth: z.string(),
  ResizeOption: z.string(),
}).partial();

const GridLayoutCanvasSizeOptionsStateSchema = z.object({
  ScreenCanvasSizeOptions: GridLayoutScreenCanvasSizeOptionsStateSchema,
}).partial();

const DefaultGridLayoutConfigurationStateSchema = z.object({
  CanvasSizeOptions: GridLayoutCanvasSizeOptionsStateSchema,
}).partial();

const DefaultInteractiveLayoutConfigurationStateSchema = z.object({
  FreeForm: DefaultFreeFormLayoutConfigurationStateSchema,
  Grid: DefaultGridLayoutConfigurationStateSchema,
}).partial();

const SpacingStateSchema = z.object({
  Left: z.string(),
  Top: z.string(),
  Right: z.string(),
  Bottom: z.string(),
}).partial();

const SectionBasedLayoutPaperCanvasSizeOptionsStateSchema = z.object({
  PaperMargin: SpacingStateSchema,
  PaperSize: z.string(),
  PaperOrientation: z.string(),
}).partial();

const SectionBasedLayoutCanvasSizeOptionsStateSchema = z.object({
  PaperCanvasSizeOptions: SectionBasedLayoutPaperCanvasSizeOptionsStateSchema,
}).partial();

const DefaultSectionBasedLayoutConfigurationStateSchema = z.object({
  CanvasSizeOptions: SectionBasedLayoutCanvasSizeOptionsStateSchema,
}).partial();

const DefaultPaginatedLayoutConfigurationStateSchema = z.object({
  SectionBased: DefaultSectionBasedLayoutConfigurationStateSchema,
}).partial();

const DefaultNewSheetConfigurationStateSchema = z.object({
  SheetContentType: z.string(),
  InteractiveLayoutConfiguration:
    DefaultInteractiveLayoutConfigurationStateSchema,
  PaginatedLayoutConfiguration: DefaultPaginatedLayoutConfigurationStateSchema,
}).partial();

const AnalysisDefaultsStateSchema = z.object({
  DefaultNewSheetConfiguration: DefaultNewSheetConfigurationStateSchema,
}).partial();

const ParameterSliderControlStateSchema = z.object({
  ParameterControlId: z.string(),
  StepSize: z.number(),
  DisplayOptions: SliderControlDisplayOptionsStateSchema,
  SourceParameterName: z.string(),
  Title: z.string(),
  MaximumValue: z.number(),
  MinimumValue: z.number(),
}).partial();

const ParameterTextAreaControlStateSchema = z.object({
  ParameterControlId: z.string(),
  Delimiter: z.string(),
  DisplayOptions: TextAreaControlDisplayOptionsStateSchema,
  SourceParameterName: z.string(),
  Title: z.string(),
}).partial();

const CascadingControlSourceStateSchema = z.object({
  SourceSheetControlId: z.string(),
  ColumnToMatch: ColumnIdentifierStateSchema,
}).partial();

const CascadingControlConfigurationStateSchema = z.object({
  SourceControls: z.array(CascadingControlSourceStateSchema),
}).partial();

const ParameterSelectableValuesStateSchema = z.object({
  LinkToDataSetColumn: ColumnIdentifierStateSchema,
  Values: z.array(z.string()),
}).partial();

const ParameterDropDownControlStateSchema = z.object({
  ParameterControlId: z.string(),
  Type: z.string(),
  DisplayOptions: DropDownControlDisplayOptionsStateSchema,
  SourceParameterName: z.string(),
  CascadingControlConfiguration: CascadingControlConfigurationStateSchema,
  Title: z.string(),
  CommitMode: z.string(),
  SelectableValues: ParameterSelectableValuesStateSchema,
}).partial();

const ParameterTextFieldControlStateSchema = z.object({
  ParameterControlId: z.string(),
  DisplayOptions: TextFieldControlDisplayOptionsStateSchema,
  SourceParameterName: z.string(),
  Title: z.string(),
}).partial();

const ParameterListControlStateSchema = z.object({
  ParameterControlId: z.string(),
  Type: z.string(),
  DisplayOptions: ListControlDisplayOptionsStateSchema,
  SourceParameterName: z.string(),
  CascadingControlConfiguration: CascadingControlConfigurationStateSchema,
  Title: z.string(),
  SelectableValues: ParameterSelectableValuesStateSchema,
}).partial();

const ParameterDateTimePickerControlStateSchema = z.object({
  ParameterControlId: z.string(),
  DisplayOptions: DateTimePickerControlDisplayOptionsStateSchema,
  SourceParameterName: z.string(),
  Title: z.string(),
}).partial();

const ParameterControlStateSchema = z.object({
  Slider: ParameterSliderControlStateSchema,
  TextArea: ParameterTextAreaControlStateSchema,
  Dropdown: ParameterDropDownControlStateSchema,
  TextField: ParameterTextFieldControlStateSchema,
  List: ParameterListControlStateSchema,
  DateTimePicker: ParameterDateTimePickerControlStateSchema,
}).partial();

const LocalNavigationConfigurationStateSchema = z.object({
  TargetSheetId: z.string(),
}).partial();

const CustomActionNavigationOperationStateSchema = z.object({
  LocalNavigationConfiguration: LocalNavigationConfigurationStateSchema,
}).partial();

const CustomParameterValuesStateSchema = z.object({
  DecimalValues: z.array(z.number()),
  IntegerValues: z.array(z.number()),
  StringValues: z.array(z.string()),
  DateTimeValues: z.array(z.string()),
}).partial();

const CustomValuesConfigurationStateSchema = z.object({
  IncludeNullValue: z.boolean(),
  CustomValues: CustomParameterValuesStateSchema,
}).partial();

const DestinationParameterValueConfigurationStateSchema = z.object({
  CustomValuesConfiguration: CustomValuesConfigurationStateSchema,
  SourceParameterName: z.string(),
  SelectAllValueOptions: z.string(),
  SourceField: z.string(),
  SourceColumn: ColumnIdentifierStateSchema,
}).partial();

const SetParameterValueConfigurationStateSchema = z.object({
  DestinationParameterName: z.string(),
  Value: DestinationParameterValueConfigurationStateSchema,
}).partial();

const CustomActionSetParametersOperationStateSchema = z.object({
  ParameterValueConfigurations: z.array(
    SetParameterValueConfigurationStateSchema,
  ),
}).partial();

const CustomActionURLOperationStateSchema = z.object({
  URLTemplate: z.string(),
  URLTarget: z.string(),
}).partial();

const ImageCustomActionOperationStateSchema = z.object({
  NavigationOperation: CustomActionNavigationOperationStateSchema,
  SetParametersOperation: CustomActionSetParametersOperationStateSchema,
  URLOperation: CustomActionURLOperationStateSchema,
}).partial();

const ImageCustomActionStateSchema = z.object({
  Status: z.string(),
  Trigger: z.string(),
  CustomActionId: z.string(),
  Name: z.string(),
  ActionOperations: z.array(ImageCustomActionOperationStateSchema),
}).partial();

const SheetImageTooltipTextStateSchema = z.object({
  PlainText: z.string(),
}).partial();

const SheetImageTooltipConfigurationStateSchema = z.object({
  Visibility: z.string(),
  TooltipText: SheetImageTooltipTextStateSchema,
}).partial();

const SheetImageScalingConfigurationStateSchema = z.object({
  ScalingType: z.string(),
}).partial();

const ImageMenuOptionStateSchema = z.object({
  AvailabilityStatus: z.string(),
}).partial();

const ImageInteractionOptionsStateSchema = z.object({
  ImageMenuOption: ImageMenuOptionStateSchema,
}).partial();

const SheetImageStaticFileSourceStateSchema = z.object({
  StaticFileId: z.string(),
}).partial();

const SheetImageSourceStateSchema = z.object({
  SheetImageStaticFileSource: SheetImageStaticFileSourceStateSchema,
}).partial();

const SheetImageStateSchema = z.object({
  Actions: z.array(ImageCustomActionStateSchema),
  SheetImageId: z.string(),
  Tooltip: SheetImageTooltipConfigurationStateSchema,
  Scaling: SheetImageScalingConfigurationStateSchema,
  Interactions: ImageInteractionOptionsStateSchema,
  Source: SheetImageSourceStateSchema,
  ImageContentAltText: z.string(),
}).partial();

const GridLayoutElementBorderStyleStateSchema = z.object({
  Color: z.string(),
  Visibility: z.string(),
  Width: z.string(),
}).partial();

const LoadingAnimationStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const GridLayoutElementBackgroundStyleStateSchema = z.object({
  Color: z.string(),
  Visibility: z.string(),
}).partial();

const GridLayoutElementStateSchema = z.object({
  ElementType: z.string(),
  ColumnSpan: z.number(),
  ColumnIndex: z.number(),
  RowIndex: z.number(),
  BorderStyle: GridLayoutElementBorderStyleStateSchema,
  BorderRadius: z.string(),
  RowSpan: z.number(),
  Padding: z.string(),
  LoadingAnimation: LoadingAnimationStateSchema,
  BackgroundStyle: GridLayoutElementBackgroundStyleStateSchema,
  ElementId: z.string(),
  SelectedBorderStyle: GridLayoutElementBorderStyleStateSchema,
}).partial();

const GridLayoutConfigurationStateSchema = z.object({
  CanvasSizeOptions: GridLayoutCanvasSizeOptionsStateSchema,
  Elements: z.array(GridLayoutElementStateSchema),
}).partial();

const SheetControlLayoutConfigurationStateSchema = z.object({
  GridLayout: GridLayoutConfigurationStateSchema,
}).partial();

const SheetControlLayoutStateSchema = z.object({
  Configuration: SheetControlLayoutConfigurationStateSchema,
}).partial();

const SheetTextBoxStateSchema = z.object({
  SheetTextBoxId: z.string(),
  Content: z.string(),
}).partial();

const SheetLayoutGroupMemberStateSchema = z.object({
  Type: z.string(),
  Id: z.string(),
}).partial();

const SheetLayoutGroupStateSchema = z.object({
  Id: z.string(),
  Members: z.array(SheetLayoutGroupMemberStateSchema),
}).partial();

const FreeFormLayoutElementBorderStyleStateSchema = z.object({
  Color: z.string(),
  Visibility: z.string(),
  Width: z.string(),
}).partial();

const SheetElementConfigurationOverridesStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const SheetElementRenderingRuleStateSchema = z.object({
  Expression: z.string(),
  ConfigurationOverrides: SheetElementConfigurationOverridesStateSchema,
}).partial();

const FreeFormLayoutElementBackgroundStyleStateSchema = z.object({
  Color: z.string(),
  Visibility: z.string(),
}).partial();

const FreeFormLayoutElementStateSchema = z.object({
  ElementType: z.string(),
  BorderStyle: FreeFormLayoutElementBorderStyleStateSchema,
  BorderRadius: z.string(),
  RenderingRules: z.array(SheetElementRenderingRuleStateSchema),
  YAxisLocation: z.string(),
  BackgroundStyle: FreeFormLayoutElementBackgroundStyleStateSchema,
  XAxisLocation: z.string(),
  Padding: z.string(),
  Height: z.string(),
  Visibility: z.string(),
  LoadingAnimation: LoadingAnimationStateSchema,
  Width: z.string(),
  ElementId: z.string(),
  SelectedBorderStyle: FreeFormLayoutElementBorderStyleStateSchema,
}).partial();

const FreeFormLayoutConfigurationStateSchema = z.object({
  CanvasSizeOptions: FreeFormLayoutCanvasSizeOptionsStateSchema,
  Groups: z.array(SheetLayoutGroupStateSchema),
  Elements: z.array(FreeFormLayoutElementStateSchema),
}).partial();

const FreeFormSectionLayoutConfigurationStateSchema = z.object({
  Elements: z.array(FreeFormLayoutElementStateSchema),
}).partial();

const SectionLayoutConfigurationStateSchema = z.object({
  FreeFormLayout: FreeFormSectionLayoutConfigurationStateSchema,
}).partial();

const SectionStyleStateSchema = z.object({
  Padding: SpacingStateSchema,
  Height: z.string(),
}).partial();

const HeaderFooterSectionConfigurationStateSchema = z.object({
  Layout: SectionLayoutConfigurationStateSchema,
  Style: SectionStyleStateSchema,
  SectionId: z.string(),
}).partial();

const BodySectionContentStateSchema = z.object({
  Layout: SectionLayoutConfigurationStateSchema,
}).partial();

const SectionAfterPageBreakStateSchema = z.object({
  Status: z.string(),
}).partial();

const SectionPageBreakConfigurationStateSchema = z.object({
  After: SectionAfterPageBreakStateSchema,
}).partial();

const ColumnSortStateSchema = z.object({
  AggregationFunction: AggregationFunctionStateSchema,
  SortBy: ColumnIdentifierStateSchema,
  Direction: z.string(),
}).partial();

const BodySectionDynamicNumericDimensionConfigurationStateSchema = z.object({
  Column: ColumnIdentifierStateSchema,
  SortByMetrics: z.array(ColumnSortStateSchema),
  Limit: z.number(),
}).partial();

const BodySectionDynamicCategoryDimensionConfigurationStateSchema = z.object({
  Column: ColumnIdentifierStateSchema,
  SortByMetrics: z.array(ColumnSortStateSchema),
  Limit: z.number(),
}).partial();

const BodySectionRepeatDimensionConfigurationStateSchema = z.object({
  DynamicNumericDimensionConfiguration:
    BodySectionDynamicNumericDimensionConfigurationStateSchema,
  DynamicCategoryDimensionConfiguration:
    BodySectionDynamicCategoryDimensionConfigurationStateSchema,
}).partial();

const BodySectionRepeatPageBreakConfigurationStateSchema = z.object({
  After: SectionAfterPageBreakStateSchema,
}).partial();

const BodySectionRepeatConfigurationStateSchema = z.object({
  DimensionConfigurations: z.array(
    BodySectionRepeatDimensionConfigurationStateSchema,
  ),
  NonRepeatingVisuals: z.array(z.string()),
  PageBreakConfiguration: BodySectionRepeatPageBreakConfigurationStateSchema,
}).partial();

const BodySectionConfigurationStateSchema = z.object({
  Content: BodySectionContentStateSchema,
  Style: SectionStyleStateSchema,
  PageBreakConfiguration: SectionPageBreakConfigurationStateSchema,
  SectionId: z.string(),
  RepeatConfiguration: BodySectionRepeatConfigurationStateSchema,
}).partial();

const SectionBasedLayoutConfigurationStateSchema = z.object({
  CanvasSizeOptions: SectionBasedLayoutCanvasSizeOptionsStateSchema,
  FooterSections: z.array(HeaderFooterSectionConfigurationStateSchema),
  BodySections: z.array(BodySectionConfigurationStateSchema),
  HeaderSections: z.array(HeaderFooterSectionConfigurationStateSchema),
}).partial();

const LayoutConfigurationStateSchema = z.object({
  GridLayout: GridLayoutConfigurationStateSchema,
  FreeFormLayout: FreeFormLayoutConfigurationStateSchema,
  SectionBasedLayout: SectionBasedLayoutConfigurationStateSchema,
}).partial();

const LayoutStateSchema = z.object({
  Configuration: LayoutConfigurationStateSchema,
}).partial();

const FilterSliderControlStateSchema = z.object({
  FilterControlId: z.string(),
  Type: z.string(),
  StepSize: z.number(),
  DisplayOptions: SliderControlDisplayOptionsStateSchema,
  Title: z.string(),
  MaximumValue: z.number(),
  SourceFilterId: z.string(),
  MinimumValue: z.number(),
}).partial();

const FilterTextAreaControlStateSchema = z.object({
  FilterControlId: z.string(),
  Delimiter: z.string(),
  DisplayOptions: TextAreaControlDisplayOptionsStateSchema,
  Title: z.string(),
  SourceFilterId: z.string(),
}).partial();

const FilterDropDownControlStateSchema = z.object({
  FilterControlId: z.string(),
  Type: z.string(),
  DisplayOptions: DropDownControlDisplayOptionsStateSchema,
  CascadingControlConfiguration: CascadingControlConfigurationStateSchema,
  Title: z.string(),
  CommitMode: z.string(),
  SourceFilterId: z.string(),
  SelectableValues: FilterSelectableValuesStateSchema,
}).partial();

const FilterTextFieldControlStateSchema = z.object({
  FilterControlId: z.string(),
  DisplayOptions: TextFieldControlDisplayOptionsStateSchema,
  Title: z.string(),
  SourceFilterId: z.string(),
}).partial();

const FilterListControlStateSchema = z.object({
  FilterControlId: z.string(),
  Type: z.string(),
  DisplayOptions: ListControlDisplayOptionsStateSchema,
  CascadingControlConfiguration: CascadingControlConfigurationStateSchema,
  Title: z.string(),
  SourceFilterId: z.string(),
  SelectableValues: FilterSelectableValuesStateSchema,
}).partial();

const FilterDateTimePickerControlStateSchema = z.object({
  FilterControlId: z.string(),
  Type: z.string(),
  DisplayOptions: DateTimePickerControlDisplayOptionsStateSchema,
  Title: z.string(),
  CommitMode: z.string(),
  SourceFilterId: z.string(),
}).partial();

const FilterRelativeDateTimeControlStateSchema = z.object({
  FilterControlId: z.string(),
  DisplayOptions: RelativeDateTimeControlDisplayOptionsStateSchema,
  Title: z.string(),
  CommitMode: z.string(),
  SourceFilterId: z.string(),
}).partial();

const FilterCrossSheetControlStateSchema = z.object({
  FilterControlId: z.string(),
  CascadingControlConfiguration: CascadingControlConfigurationStateSchema,
  SourceFilterId: z.string(),
}).partial();

const FilterControlStateSchema = z.object({
  Slider: FilterSliderControlStateSchema,
  TextArea: FilterTextAreaControlStateSchema,
  Dropdown: FilterDropDownControlStateSchema,
  TextField: FilterTextFieldControlStateSchema,
  List: FilterListControlStateSchema,
  DateTimePicker: FilterDateTimePickerControlStateSchema,
  RelativeDateTime: FilterRelativeDateTimeControlStateSchema,
  CrossSheet: FilterCrossSheetControlStateSchema,
}).partial();

const LongFormatTextStateSchema = z.object({
  RichText: z.string(),
  PlainText: z.string(),
}).partial();

const VisualSubtitleLabelOptionsStateSchema = z.object({
  Visibility: z.string(),
  FormatText: LongFormatTextStateSchema,
}).partial();

const ItemsLimitConfigurationStateSchema = z.object({
  ItemsLimit: z.number(),
  OtherCategories: z.string(),
}).partial();

const FieldSortStateSchema = z.object({
  FieldId: z.string(),
  Direction: z.string(),
}).partial();

const FieldSortOptionsStateSchema = z.object({
  FieldSort: FieldSortStateSchema,
  ColumnSort: ColumnSortStateSchema,
}).partial();

const FunnelChartSortConfigurationStateSchema = z.object({
  CategoryItemsLimit: ItemsLimitConfigurationStateSchema,
  CategorySort: z.array(FieldSortOptionsStateSchema),
}).partial();

const FunnelChartDataLabelOptionsStateSchema = z.object({
  MeasureLabelVisibility: z.string(),
  Position: z.string(),
  Visibility: z.string(),
  CategoryLabelVisibility: z.string(),
  LabelColor: z.string(),
  MeasureDataLabelStyle: z.string(),
  LabelFontConfiguration: FontConfigurationStateSchema,
}).partial();

const AxisLabelReferenceOptionsStateSchema = z.object({
  Column: ColumnIdentifierStateSchema,
  FieldId: z.string(),
}).partial();

const AxisLabelOptionsStateSchema = z.object({
  CustomLabel: z.string(),
  ApplyTo: AxisLabelReferenceOptionsStateSchema,
  FontConfiguration: FontConfigurationStateSchema,
}).partial();

const ChartAxisLabelOptionsStateSchema = z.object({
  Visibility: z.string(),
  SortIconVisibility: z.string(),
  AxisLabelOptions: z.array(AxisLabelOptionsStateSchema),
}).partial();

const DateDimensionFieldStateSchema = z.object({
  HierarchyId: z.string(),
  FormatConfiguration: DateTimeFormatConfigurationStateSchema,
  Column: ColumnIdentifierStateSchema,
  FieldId: z.string(),
  DateGranularity: z.string(),
}).partial();

const NumericalDimensionFieldStateSchema = z.object({
  HierarchyId: z.string(),
  FormatConfiguration: NumberFormatConfigurationStateSchema,
  Column: ColumnIdentifierStateSchema,
  FieldId: z.string(),
}).partial();

const CategoricalDimensionFieldStateSchema = z.object({
  HierarchyId: z.string(),
  FormatConfiguration: StringFormatConfigurationStateSchema,
  Column: ColumnIdentifierStateSchema,
  FieldId: z.string(),
}).partial();

const DimensionFieldStateSchema = z.object({
  DateDimensionField: DateDimensionFieldStateSchema,
  NumericalDimensionField: NumericalDimensionFieldStateSchema,
  CategoricalDimensionField: CategoricalDimensionFieldStateSchema,
}).partial();

const DateMeasureFieldStateSchema = z.object({
  AggregationFunction: z.string(),
  FormatConfiguration: DateTimeFormatConfigurationStateSchema,
  Column: ColumnIdentifierStateSchema,
  FieldId: z.string(),
}).partial();

const NumericalMeasureFieldStateSchema = z.object({
  AggregationFunction: NumericalAggregationFunctionStateSchema,
  FormatConfiguration: NumberFormatConfigurationStateSchema,
  Column: ColumnIdentifierStateSchema,
  FieldId: z.string(),
}).partial();

const CategoricalMeasureFieldStateSchema = z.object({
  AggregationFunction: z.string(),
  FormatConfiguration: StringFormatConfigurationStateSchema,
  Column: ColumnIdentifierStateSchema,
  FieldId: z.string(),
}).partial();

const CalculatedMeasureFieldStateSchema = z.object({
  Expression: z.string(),
  FieldId: z.string(),
}).partial();

const MeasureFieldStateSchema = z.object({
  DateMeasureField: DateMeasureFieldStateSchema,
  NumericalMeasureField: NumericalMeasureFieldStateSchema,
  CategoricalMeasureField: CategoricalMeasureFieldStateSchema,
  CalculatedMeasureField: CalculatedMeasureFieldStateSchema,
}).partial();

const FunnelChartAggregatedFieldWellsStateSchema = z.object({
  Category: z.array(DimensionFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
}).partial();

const FunnelChartFieldWellsStateSchema = z.object({
  FunnelChartAggregatedFieldWells: FunnelChartAggregatedFieldWellsStateSchema,
}).partial();

const FieldTooltipItemStateSchema = z.object({
  TooltipTarget: z.string(),
  FieldId: z.string(),
  Label: z.string(),
  Visibility: z.string(),
}).partial();

const ColumnTooltipItemStateSchema = z.object({
  Aggregation: AggregationFunctionStateSchema,
  TooltipTarget: z.string(),
  Column: ColumnIdentifierStateSchema,
  Label: z.string(),
  Visibility: z.string(),
}).partial();

const TooltipItemStateSchema = z.object({
  FieldTooltipItem: FieldTooltipItemStateSchema,
  ColumnTooltipItem: ColumnTooltipItemStateSchema,
}).partial();

const FieldBasedTooltipStateSchema = z.object({
  TooltipFields: z.array(TooltipItemStateSchema),
  AggregationVisibility: z.string(),
  TooltipTitleType: z.string(),
}).partial();

const TooltipOptionsStateSchema = z.object({
  SelectedTooltipType: z.string(),
  TooltipVisibility: z.string(),
  FieldBasedTooltip: FieldBasedTooltipStateSchema,
}).partial();

const ContextMenuOptionStateSchema = z.object({
  AvailabilityStatus: z.string(),
}).partial();

const VisualMenuOptionStateSchema = z.object({
  AvailabilityStatus: z.string(),
}).partial();

const VisualInteractionOptionsStateSchema = z.object({
  ContextMenuOption: ContextMenuOptionStateSchema,
  VisualMenuOption: VisualMenuOptionStateSchema,
}).partial();

const DataPathTypeStateSchema = z.object({
  PivotTableDataPathType: z.string(),
}).partial();

const DataPathValueStateSchema = z.object({
  DataPathType: DataPathTypeStateSchema,
  FieldId: z.string(),
  FieldValue: z.string(),
}).partial();

const DataPathColorStateSchema = z.object({
  Element: DataPathValueStateSchema,
  Color: z.string(),
  TimeGranularity: z.string(),
}).partial();

const VisualPaletteStateSchema = z.object({
  ChartColor: z.string(),
  ColorMap: z.array(DataPathColorStateSchema),
}).partial();

const FunnelChartConfigurationStateSchema = z.object({
  SortConfiguration: FunnelChartSortConfigurationStateSchema,
  DataLabelOptions: FunnelChartDataLabelOptionsStateSchema,
  CategoryLabelOptions: ChartAxisLabelOptionsStateSchema,
  FieldWells: FunnelChartFieldWellsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  ValueLabelOptions: ChartAxisLabelOptionsStateSchema,
  VisualPalette: VisualPaletteStateSchema,
}).partial();

const FilterOperationSelectedFieldsConfigurationStateSchema = z.object({
  SelectedColumns: z.array(ColumnIdentifierStateSchema),
  SelectedFields: z.array(z.string()),
  SelectedFieldOptions: z.string(),
}).partial();

const SameSheetTargetVisualConfigurationStateSchema = z.object({
  TargetVisualOptions: z.string(),
  TargetVisuals: z.array(z.string()),
}).partial();

const FilterOperationTargetVisualsConfigurationStateSchema = z.object({
  SameSheetTargetVisualConfiguration:
    SameSheetTargetVisualConfigurationStateSchema,
}).partial();

const CustomActionFilterOperationStateSchema = z.object({
  SelectedFieldsConfiguration:
    FilterOperationSelectedFieldsConfigurationStateSchema,
  TargetVisualsConfiguration:
    FilterOperationTargetVisualsConfigurationStateSchema,
}).partial();

const VisualCustomActionOperationStateSchema = z.object({
  NavigationOperation: CustomActionNavigationOperationStateSchema,
  SetParametersOperation: CustomActionSetParametersOperationStateSchema,
  FilterOperation: CustomActionFilterOperationStateSchema,
  URLOperation: CustomActionURLOperationStateSchema,
}).partial();

const VisualCustomActionStateSchema = z.object({
  Status: z.string(),
  Trigger: z.string(),
  CustomActionId: z.string(),
  Name: z.string(),
  ActionOperations: z.array(VisualCustomActionOperationStateSchema),
}).partial();

const ShortFormatTextStateSchema = z.object({
  RichText: z.string(),
  PlainText: z.string(),
}).partial();

const VisualTitleLabelOptionsStateSchema = z.object({
  Visibility: z.string(),
  FormatText: ShortFormatTextStateSchema,
}).partial();

const NumericEqualityDrillDownFilterStateSchema = z.object({
  Column: ColumnIdentifierStateSchema,
  Value: z.number(),
}).partial();

const TimeRangeDrillDownFilterStateSchema = z.object({
  Column: ColumnIdentifierStateSchema,
  RangeMinimum: z.string(),
  TimeGranularity: z.string(),
  RangeMaximum: z.string(),
}).partial();

const CategoryDrillDownFilterStateSchema = z.object({
  Column: ColumnIdentifierStateSchema,
  CategoryValues: z.array(z.string()),
}).partial();

const DrillDownFilterStateSchema = z.object({
  NumericEqualityFilter: NumericEqualityDrillDownFilterStateSchema,
  TimeRangeFilter: TimeRangeDrillDownFilterStateSchema,
  CategoryFilter: CategoryDrillDownFilterStateSchema,
}).partial();

const DateTimeHierarchyStateSchema = z.object({
  HierarchyId: z.string(),
  DrillDownFilters: z.array(DrillDownFilterStateSchema),
}).partial();

const ExplicitHierarchyStateSchema = z.object({
  HierarchyId: z.string(),
  DrillDownFilters: z.array(DrillDownFilterStateSchema),
  Columns: z.array(ColumnIdentifierStateSchema),
}).partial();

const PredefinedHierarchyStateSchema = z.object({
  HierarchyId: z.string(),
  DrillDownFilters: z.array(DrillDownFilterStateSchema),
  Columns: z.array(ColumnIdentifierStateSchema),
}).partial();

const ColumnHierarchyStateSchema = z.object({
  DateTimeHierarchy: DateTimeHierarchyStateSchema,
  ExplicitHierarchy: ExplicitHierarchyStateSchema,
  PredefinedHierarchy: PredefinedHierarchyStateSchema,
}).partial();

const FunnelChartVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: FunnelChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const PaginationConfigurationStateSchema = z.object({
  PageSize: z.number(),
  PageNumber: z.number(),
}).partial();

const BoxPlotSortConfigurationStateSchema = z.object({
  CategorySort: z.array(FieldSortOptionsStateSchema),
  PaginationConfiguration: PaginationConfigurationStateSchema,
}).partial();

const LegendOptionsStateSchema = z.object({
  Position: z.string(),
  ValueFontConfiguration: FontConfigurationStateSchema,
  Title: LabelOptionsStateSchema,
  Visibility: z.string(),
  Height: z.string(),
  Width: z.string(),
}).partial();

const ReferenceLineDynamicDataConfigurationStateSchema = z.object({
  Column: ColumnIdentifierStateSchema,
  MeasureAggregationFunction: AggregationFunctionStateSchema,
  Calculation: NumericalAggregationFunctionStateSchema,
}).partial();

const ReferenceLineStaticDataConfigurationStateSchema = z.object({
  Value: z.number(),
}).partial();

const ReferenceLineDataConfigurationStateSchema = z.object({
  DynamicConfiguration: ReferenceLineDynamicDataConfigurationStateSchema,
  AxisBinding: z.string(),
  SeriesType: z.string(),
  StaticConfiguration: ReferenceLineStaticDataConfigurationStateSchema,
}).partial();

const ReferenceLineValueLabelConfigurationStateSchema = z.object({
  FormatConfiguration: NumericFormatConfigurationStateSchema,
  RelativePosition: z.string(),
}).partial();

const ReferenceLineCustomLabelConfigurationStateSchema = z.object({
  CustomLabel: z.string(),
}).partial();

const ReferenceLineLabelConfigurationStateSchema = z.object({
  HorizontalPosition: z.string(),
  ValueLabelConfiguration: ReferenceLineValueLabelConfigurationStateSchema,
  CustomLabelConfiguration: ReferenceLineCustomLabelConfigurationStateSchema,
  FontColor: z.string(),
  FontConfiguration: FontConfigurationStateSchema,
  VerticalPosition: z.string(),
}).partial();

const ReferenceLineStyleConfigurationStateSchema = z.object({
  Pattern: z.string(),
  Color: z.string(),
}).partial();

const ReferenceLineStateSchema = z.object({
  Status: z.string(),
  DataConfiguration: ReferenceLineDataConfigurationStateSchema,
  LabelConfiguration: ReferenceLineLabelConfigurationStateSchema,
  StyleConfiguration: ReferenceLineStyleConfigurationStateSchema,
}).partial();

const DateAxisOptionsStateSchema = z.object({
  MissingDateVisibility: z.string(),
}).partial();

const AxisLogarithmicScaleStateSchema = z.object({
  Base: z.number(),
}).partial();

const AxisLinearScaleStateSchema = z.object({
  StepSize: z.number(),
  StepCount: z.number(),
}).partial();

const AxisScaleStateSchema = z.object({
  Logarithmic: AxisLogarithmicScaleStateSchema,
  Linear: AxisLinearScaleStateSchema,
}).partial();

const AxisDisplayMinMaxRangeStateSchema = z.object({
  Minimum: z.number(),
  Maximum: z.number(),
}).partial();

const AxisDisplayRangeStateSchema = z.object({
  DataDriven: z.record(z.string(), z.unknown()),
  MinMax: AxisDisplayMinMaxRangeStateSchema,
}).partial();

const NumericAxisOptionsStateSchema = z.object({
  Scale: AxisScaleStateSchema,
  Range: AxisDisplayRangeStateSchema,
}).partial();

const AxisDataOptionsStateSchema = z.object({
  DateAxisOptions: DateAxisOptionsStateSchema,
  NumericAxisOptions: NumericAxisOptionsStateSchema,
}).partial();

const AxisTickLabelOptionsStateSchema = z.object({
  RotationAngle: z.number(),
  LabelOptions: LabelOptionsStateSchema,
}).partial();

const PercentVisibleRangeStateSchema = z.object({
  From: z.number(),
  To: z.number(),
}).partial();

const VisibleRangeOptionsStateSchema = z.object({
  PercentRange: PercentVisibleRangeStateSchema,
}).partial();

const ScrollBarOptionsStateSchema = z.object({
  VisibleRange: VisibleRangeOptionsStateSchema,
  Visibility: z.string(),
}).partial();

const AxisDisplayOptionsStateSchema = z.object({
  DataOptions: AxisDataOptionsStateSchema,
  TickLabelOptions: AxisTickLabelOptionsStateSchema,
  AxisOffset: z.string(),
  AxisLineVisibility: z.string(),
  GridLineVisibility: z.string(),
  ScrollbarOptions: ScrollBarOptionsStateSchema,
}).partial();

const BoxPlotAggregatedFieldWellsStateSchema = z.object({
  GroupBy: z.array(DimensionFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
}).partial();

const BoxPlotFieldWellsStateSchema = z.object({
  BoxPlotAggregatedFieldWells: BoxPlotAggregatedFieldWellsStateSchema,
}).partial();

const BoxPlotStyleOptionsStateSchema = z.object({
  FillStyle: z.string(),
}).partial();

const BoxPlotOptionsStateSchema = z.object({
  StyleOptions: BoxPlotStyleOptionsStateSchema,
  OutlierVisibility: z.string(),
  AllDataPointsVisibility: z.string(),
}).partial();

const BoxPlotChartConfigurationStateSchema = z.object({
  SortConfiguration: BoxPlotSortConfigurationStateSchema,
  Legend: LegendOptionsStateSchema,
  ReferenceLines: z.array(ReferenceLineStateSchema),
  CategoryAxis: AxisDisplayOptionsStateSchema,
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  CategoryLabelOptions: ChartAxisLabelOptionsStateSchema,
  FieldWells: BoxPlotFieldWellsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  BoxPlotOptions: BoxPlotOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  PrimaryYAxisDisplayOptions: AxisDisplayOptionsStateSchema,
  VisualPalette: VisualPaletteStateSchema,
}).partial();

const BoxPlotVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: BoxPlotChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const GeospatialCoordinateBoundsStateSchema = z.object({
  West: z.number(),
  South: z.number(),
  North: z.number(),
  East: z.number(),
}).partial();

const GeospatialMapStateStateSchema = z.object({
  Bounds: GeospatialCoordinateBoundsStateSchema,
  MapNavigation: z.string(),
}).partial();

const GeospatialMapStyleStateSchema = z.object({
  BaseMapStyle: z.string(),
  BaseMapVisibility: z.string(),
  BackgroundColor: z.string(),
}).partial();

const GeospatialLayerColorFieldStateSchema = z.object({
  ColorValuesFields: z.array(MeasureFieldStateSchema),
  ColorDimensionsFields: z.array(DimensionFieldStateSchema),
}).partial();

const UnaggregatedFieldStateSchema = z.object({
  FormatConfiguration: FormatConfigurationStateSchema,
  Column: ColumnIdentifierStateSchema,
  FieldId: z.string(),
}).partial();

const GeospatialLayerJoinDefinitionStateSchema = z.object({
  ColorField: GeospatialLayerColorFieldStateSchema,
  ShapeKeyField: z.string(),
  DatasetKeyField: UnaggregatedFieldStateSchema,
}).partial();

const LayerCustomActionOperationStateSchema = z.object({
  NavigationOperation: CustomActionNavigationOperationStateSchema,
  SetParametersOperation: CustomActionSetParametersOperationStateSchema,
  FilterOperation: CustomActionFilterOperationStateSchema,
  URLOperation: CustomActionURLOperationStateSchema,
}).partial();

const LayerCustomActionStateSchema = z.object({
  Status: z.string(),
  Trigger: z.string(),
  CustomActionId: z.string(),
  Name: z.string(),
  ActionOperations: z.array(LayerCustomActionOperationStateSchema),
}).partial();

const GeospatialGradientStepColorStateSchema = z.object({
  DataValue: z.number(),
  Color: z.string(),
}).partial();

const GeospatialNullSymbolStyleStateSchema = z.object({
  FillColor: z.string(),
  StrokeWidth: z.number(),
  StrokeColor: z.string(),
}).partial();

const GeospatialNullDataSettingsStateSchema = z.object({
  SymbolStyle: GeospatialNullSymbolStyleStateSchema,
}).partial();

const GeospatialGradientColorStateSchema = z.object({
  DefaultOpacity: z.number(),
  StepColors: z.array(GeospatialGradientStepColorStateSchema),
  NullDataVisibility: z.string(),
  NullDataSettings: GeospatialNullDataSettingsStateSchema,
}).partial();

const GeospatialCategoricalDataColorStateSchema = z.object({
  DataValue: z.string(),
  Color: z.string(),
}).partial();

const GeospatialCategoricalColorStateSchema = z.object({
  CategoryDataColors: z.array(GeospatialCategoricalDataColorStateSchema),
  DefaultOpacity: z.number(),
  NullDataVisibility: z.string(),
  NullDataSettings: GeospatialNullDataSettingsStateSchema,
}).partial();

const GeospatialSolidColorStateSchema = z.object({
  State: z.string(),
  Color: z.string(),
}).partial();

const GeospatialColorStateSchema = z.object({
  Gradient: GeospatialGradientColorStateSchema,
  Categorical: GeospatialCategoricalColorStateSchema,
  Solid: GeospatialSolidColorStateSchema,
}).partial();

const GeospatialLineWidthStateSchema = z.object({
  LineWidth: z.number(),
}).partial();

const GeospatialCircleRadiusStateSchema = z.object({
  Radius: z.number(),
}).partial();

const GeospatialCircleSymbolStyleStateSchema = z.object({
  FillColor: GeospatialColorStateSchema,
  StrokeWidth: GeospatialLineWidthStateSchema,
  StrokeColor: GeospatialColorStateSchema,
  CircleRadius: GeospatialCircleRadiusStateSchema,
}).partial();

const GeospatialPointStyleStateSchema = z.object({
  CircleSymbolStyle: GeospatialCircleSymbolStyleStateSchema,
}).partial();

const GeospatialPointLayerStateSchema = z.object({
  Style: GeospatialPointStyleStateSchema,
}).partial();

const GeospatialPolygonSymbolStyleStateSchema = z.object({
  FillColor: GeospatialColorStateSchema,
  StrokeWidth: GeospatialLineWidthStateSchema,
  StrokeColor: GeospatialColorStateSchema,
}).partial();

const GeospatialPolygonStyleStateSchema = z.object({
  PolygonSymbolStyle: GeospatialPolygonSymbolStyleStateSchema,
}).partial();

const GeospatialPolygonLayerStateSchema = z.object({
  Style: GeospatialPolygonStyleStateSchema,
}).partial();

const GeospatialLineSymbolStyleStateSchema = z.object({
  FillColor: GeospatialColorStateSchema,
  LineWidth: GeospatialLineWidthStateSchema,
}).partial();

const GeospatialLineStyleStateSchema = z.object({
  LineSymbolStyle: GeospatialLineSymbolStyleStateSchema,
}).partial();

const GeospatialLineLayerStateSchema = z.object({
  Style: GeospatialLineStyleStateSchema,
}).partial();

const GeospatialLayerDefinitionStateSchema = z.object({
  PointLayer: GeospatialPointLayerStateSchema,
  PolygonLayer: GeospatialPolygonLayerStateSchema,
  LineLayer: GeospatialLineLayerStateSchema,
}).partial();

const GeospatialStaticFileSourceStateSchema = z.object({
  StaticFileId: z.string(),
}).partial();

const GeospatialDataSourceItemStateSchema = z.object({
  StaticFileDataSource: GeospatialStaticFileSourceStateSchema,
}).partial();

const GeospatialLayerItemStateSchema = z.object({
  LayerId: z.string(),
  JoinDefinition: GeospatialLayerJoinDefinitionStateSchema,
  Actions: z.array(LayerCustomActionStateSchema),
  LayerType: z.string(),
  LayerDefinition: GeospatialLayerDefinitionStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  Label: z.string(),
  Visibility: z.string(),
  DataSource: GeospatialDataSourceItemStateSchema,
}).partial();

const GeospatialLayerMapConfigurationStateSchema = z.object({
  Legend: LegendOptionsStateSchema,
  MapState: GeospatialMapStateStateSchema,
  MapStyle: GeospatialMapStyleStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  MapLayers: z.array(GeospatialLayerItemStateSchema),
}).partial();

const LayerMapVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: GeospatialLayerMapConfigurationStateSchema,
  DataSetIdentifier: z.string(),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  TopicIdentifier: z.string(),
}).partial();

const GeospatialMapStyleOptionsStateSchema = z.object({
  BaseMapStyle: z.string(),
}).partial();

const GeospatialMapAggregatedFieldWellsStateSchema = z.object({
  Colors: z.array(DimensionFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
  Geospatial: z.array(DimensionFieldStateSchema),
}).partial();

const GeospatialMapFieldWellsStateSchema = z.object({
  GeospatialMapAggregatedFieldWells:
    GeospatialMapAggregatedFieldWellsStateSchema,
}).partial();

const GeospatialWindowOptionsStateSchema = z.object({
  Bounds: GeospatialCoordinateBoundsStateSchema,
  MapZoomMode: z.string(),
}).partial();

const SimpleClusterMarkerStateSchema = z.object({
  Color: z.string(),
}).partial();

const ClusterMarkerStateSchema = z.object({
  SimpleClusterMarker: SimpleClusterMarkerStateSchema,
}).partial();

const ClusterMarkerConfigurationStateSchema = z.object({
  ClusterMarker: ClusterMarkerStateSchema,
}).partial();

const GeospatialHeatmapDataColorStateSchema = z.object({
  Color: z.string(),
}).partial();

const GeospatialHeatmapColorScaleStateSchema = z.object({
  Colors: z.array(GeospatialHeatmapDataColorStateSchema),
}).partial();

const GeospatialHeatmapConfigurationStateSchema = z.object({
  HeatmapColor: GeospatialHeatmapColorScaleStateSchema,
}).partial();

const GeospatialPointStyleOptionsStateSchema = z.object({
  SelectedPointStyle: z.string(),
  ClusterMarkerConfiguration: ClusterMarkerConfigurationStateSchema,
  HeatmapConfiguration: GeospatialHeatmapConfigurationStateSchema,
}).partial();

const GeospatialMapConfigurationStateSchema = z.object({
  Legend: LegendOptionsStateSchema,
  MapStyleOptions: GeospatialMapStyleOptionsStateSchema,
  FieldWells: GeospatialMapFieldWellsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  WindowOptions: GeospatialWindowOptionsStateSchema,
  PointStyleOptions: GeospatialPointStyleOptionsStateSchema,
  VisualPalette: VisualPaletteStateSchema,
}).partial();

const GeospatialMapVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: GeospatialMapConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const ScatterPlotSortConfigurationStateSchema = z.object({
  ScatterPlotLimitConfiguration: ItemsLimitConfigurationStateSchema,
}).partial();

const MaximumLabelTypeStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const DataPathLabelTypeStateSchema = z.object({
  FieldId: z.string(),
  Visibility: z.string(),
  FieldValue: z.string(),
}).partial();

const RangeEndsLabelTypeStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const FieldLabelTypeStateSchema = z.object({
  FieldId: z.string(),
  Visibility: z.string(),
}).partial();

const MinimumLabelTypeStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const DataLabelTypeStateSchema = z.object({
  MaximumLabelType: MaximumLabelTypeStateSchema,
  DataPathLabelType: DataPathLabelTypeStateSchema,
  RangeEndsLabelType: RangeEndsLabelTypeStateSchema,
  FieldLabelType: FieldLabelTypeStateSchema,
  MinimumLabelType: MinimumLabelTypeStateSchema,
}).partial();

const DataLabelOptionsStateSchema = z.object({
  DataLabelTypes: z.array(DataLabelTypeStateSchema),
  MeasureLabelVisibility: z.string(),
  Position: z.string(),
  LabelContent: z.string(),
  Visibility: z.string(),
  TotalsVisibility: z.string(),
  Overlap: z.string(),
  CategoryLabelVisibility: z.string(),
  LabelColor: z.string(),
  LabelFontConfiguration: FontConfigurationStateSchema,
}).partial();

const ScatterPlotUnaggregatedFieldWellsStateSchema = z.object({
  Category: z.array(DimensionFieldStateSchema),
  Size: z.array(MeasureFieldStateSchema),
  Label: z.array(DimensionFieldStateSchema),
  XAxis: z.array(DimensionFieldStateSchema),
  YAxis: z.array(DimensionFieldStateSchema),
}).partial();

const ScatterPlotCategoricallyAggregatedFieldWellsStateSchema = z.object({
  Category: z.array(DimensionFieldStateSchema),
  Size: z.array(MeasureFieldStateSchema),
  Label: z.array(DimensionFieldStateSchema),
  XAxis: z.array(MeasureFieldStateSchema),
  YAxis: z.array(MeasureFieldStateSchema),
}).partial();

const ScatterPlotFieldWellsStateSchema = z.object({
  ScatterPlotUnaggregatedFieldWells:
    ScatterPlotUnaggregatedFieldWellsStateSchema,
  ScatterPlotCategoricallyAggregatedFieldWells:
    ScatterPlotCategoricallyAggregatedFieldWellsStateSchema,
}).partial();

const ScatterPlotConfigurationStateSchema = z.object({
  YAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  SortConfiguration: ScatterPlotSortConfigurationStateSchema,
  Legend: LegendOptionsStateSchema,
  YAxisDisplayOptions: AxisDisplayOptionsStateSchema,
  DataLabels: DataLabelOptionsStateSchema,
  FieldWells: ScatterPlotFieldWellsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  XAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  VisualPalette: VisualPaletteStateSchema,
  XAxisDisplayOptions: AxisDisplayOptionsStateSchema,
}).partial();

const ScatterPlotVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: ScatterPlotConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const RadarChartSortConfigurationStateSchema = z.object({
  ColorSort: z.array(FieldSortOptionsStateSchema),
  ColorItemsLimit: ItemsLimitConfigurationStateSchema,
  CategoryItemsLimit: ItemsLimitConfigurationStateSchema,
  CategorySort: z.array(FieldSortOptionsStateSchema),
}).partial();

const RadarChartAreaStyleSettingsStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const RadarChartSeriesSettingsStateSchema = z.object({
  AreaStyleSettings: RadarChartAreaStyleSettingsStateSchema,
}).partial();

const RadarChartAggregatedFieldWellsStateSchema = z.object({
  Category: z.array(DimensionFieldStateSchema),
  Color: z.array(DimensionFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
}).partial();

const RadarChartFieldWellsStateSchema = z.object({
  RadarChartAggregatedFieldWells: RadarChartAggregatedFieldWellsStateSchema,
}).partial();

const RadarChartConfigurationStateSchema = z.object({
  SortConfiguration: RadarChartSortConfigurationStateSchema,
  Legend: LegendOptionsStateSchema,
  Shape: z.string(),
  BaseSeriesSettings: RadarChartSeriesSettingsStateSchema,
  ColorLabelOptions: ChartAxisLabelOptionsStateSchema,
  CategoryLabelOptions: ChartAxisLabelOptionsStateSchema,
  AxesRangeScale: z.string(),
  VisualPalette: VisualPaletteStateSchema,
  AlternateBandColorsVisibility: z.string(),
  StartAngle: z.number(),
  CategoryAxis: AxisDisplayOptionsStateSchema,
  FieldWells: RadarChartFieldWellsStateSchema,
  ColorAxis: AxisDisplayOptionsStateSchema,
  AlternateBandOddColor: z.string(),
  Interactions: VisualInteractionOptionsStateSchema,
  AlternateBandEvenColor: z.string(),
}).partial();

const RadarChartVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: RadarChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const ComboChartSortConfigurationStateSchema = z.object({
  ColorSort: z.array(FieldSortOptionsStateSchema),
  ColorItemsLimit: ItemsLimitConfigurationStateSchema,
  CategoryItemsLimit: ItemsLimitConfigurationStateSchema,
  CategorySort: z.array(FieldSortOptionsStateSchema),
}).partial();

const YAxisOptionsStateSchema = z.object({
  YAxis: z.string(),
}).partial();

const SingleAxisOptionsStateSchema = z.object({
  YAxisOptions: YAxisOptionsStateSchema,
}).partial();

const BorderSettingsStateSchema = z.object({
  BorderVisibility: z.string(),
  BorderColor: z.string(),
  BorderWidth: z.string(),
}).partial();

const LineChartLineStyleSettingsStateSchema = z.object({
  LineInterpolation: z.string(),
  LineStyle: z.string(),
  LineVisibility: z.string(),
  LineWidth: z.string(),
}).partial();

const LineChartMarkerStyleSettingsStateSchema = z.object({
  MarkerShape: z.string(),
  MarkerSize: z.string(),
  MarkerVisibility: z.string(),
  MarkerColor: z.string(),
}).partial();

const ComboChartDefaultSeriesSettingsStateSchema = z.object({
  BorderSettings: BorderSettingsStateSchema,
  DecalSettings: DecalSettingsStateSchema,
  LineStyleSettings: LineChartLineStyleSettingsStateSchema,
  MarkerStyleSettings: LineChartMarkerStyleSettingsStateSchema,
}).partial();

const ComboSeriesItemStateSchema = z.object({}).partial();

const ComboChartAggregatedFieldWellsStateSchema = z.object({
  BarValues: z.array(MeasureFieldStateSchema),
  Category: z.array(DimensionFieldStateSchema),
  Colors: z.array(DimensionFieldStateSchema),
  LineValues: z.array(MeasureFieldStateSchema),
}).partial();

const ComboChartFieldWellsStateSchema = z.object({
  ComboChartAggregatedFieldWells: ComboChartAggregatedFieldWellsStateSchema,
}).partial();

const ComboChartConfigurationStateSchema = z.object({
  SortConfiguration: ComboChartSortConfigurationStateSchema,
  Legend: LegendOptionsStateSchema,
  ReferenceLines: z.array(ReferenceLineStateSchema),
  ColorLabelOptions: ChartAxisLabelOptionsStateSchema,
  BarDataLabels: DataLabelOptionsStateSchema,
  CategoryLabelOptions: ChartAxisLabelOptionsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  SingleAxisOptions: SingleAxisOptionsStateSchema,
  PrimaryYAxisDisplayOptions: AxisDisplayOptionsStateSchema,
  VisualPalette: VisualPaletteStateSchema,
  BarsArrangement: z.string(),
  DefaultSeriesSettings: ComboChartDefaultSeriesSettingsStateSchema,
  SecondaryYAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  Series: z.array(ComboSeriesItemStateSchema),
  LineDataLabels: DataLabelOptionsStateSchema,
  CategoryAxis: AxisDisplayOptionsStateSchema,
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  FieldWells: ComboChartFieldWellsStateSchema,
  SecondaryYAxisDisplayOptions: AxisDisplayOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
}).partial();

const ComboChartVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: ComboChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const WordCloudSortConfigurationStateSchema = z.object({
  CategoryItemsLimit: ItemsLimitConfigurationStateSchema,
  CategorySort: z.array(FieldSortOptionsStateSchema),
}).partial();

const WordCloudAggregatedFieldWellsStateSchema = z.object({
  GroupBy: z.array(DimensionFieldStateSchema),
  Size: z.array(MeasureFieldStateSchema),
}).partial();

const WordCloudFieldWellsStateSchema = z.object({
  WordCloudAggregatedFieldWells: WordCloudAggregatedFieldWellsStateSchema,
}).partial();

const WordCloudOptionsStateSchema = z.object({
  WordOrientation: z.string(),
  WordScaling: z.string(),
  CloudLayout: z.string(),
  MaximumStringLength: z.number(),
  WordCasing: z.string(),
  WordPadding: z.string(),
}).partial();

const WordCloudChartConfigurationStateSchema = z.object({
  SortConfiguration: WordCloudSortConfigurationStateSchema,
  CategoryLabelOptions: ChartAxisLabelOptionsStateSchema,
  FieldWells: WordCloudFieldWellsStateSchema,
  WordCloudOptions: WordCloudOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
}).partial();

const WordCloudVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: WordCloudChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const SankeyDiagramSortConfigurationStateSchema = z.object({
  WeightSort: z.array(FieldSortOptionsStateSchema),
  SourceItemsLimit: ItemsLimitConfigurationStateSchema,
  DestinationItemsLimit: ItemsLimitConfigurationStateSchema,
}).partial();

const SankeyDiagramAggregatedFieldWellsStateSchema = z.object({
  Destination: z.array(DimensionFieldStateSchema),
  Source: z.array(DimensionFieldStateSchema),
  Weight: z.array(MeasureFieldStateSchema),
}).partial();

const SankeyDiagramFieldWellsStateSchema = z.object({
  SankeyDiagramAggregatedFieldWells:
    SankeyDiagramAggregatedFieldWellsStateSchema,
}).partial();

const SankeyDiagramChartConfigurationStateSchema = z.object({
  SortConfiguration: SankeyDiagramSortConfigurationStateSchema,
  DataLabels: DataLabelOptionsStateSchema,
  FieldWells: SankeyDiagramFieldWellsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
}).partial();

const SankeyDiagramVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: SankeyDiagramChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
}).partial();

const GradientStopStateSchema = z.object({
  GradientOffset: z.number(),
  DataValue: z.number(),
  Color: z.string(),
}).partial();

const GradientColorStateSchema = z.object({
  Stops: z.array(GradientStopStateSchema),
}).partial();

const ConditionalFormattingGradientColorStateSchema = z.object({
  Expression: z.string(),
  Color: GradientColorStateSchema,
}).partial();

const ConditionalFormattingSolidColorStateSchema = z.object({
  Expression: z.string(),
  Color: z.string(),
}).partial();

const ConditionalFormattingColorStateSchema = z.object({
  Gradient: ConditionalFormattingGradientColorStateSchema,
  Solid: ConditionalFormattingSolidColorStateSchema,
}).partial();

const GaugeChartArcConditionalFormattingStateSchema = z.object({
  ForegroundColor: ConditionalFormattingColorStateSchema,
}).partial();

const ConditionalFormattingIconDisplayConfigurationStateSchema = z.object({
  IconDisplayOption: z.string(),
}).partial();

const ConditionalFormattingCustomIconOptionsStateSchema = z.object({
  UnicodeIcon: z.string(),
  Icon: z.string(),
}).partial();

const ConditionalFormattingCustomIconConditionStateSchema = z.object({
  Expression: z.string(),
  Color: z.string(),
  DisplayConfiguration:
    ConditionalFormattingIconDisplayConfigurationStateSchema,
  IconOptions: ConditionalFormattingCustomIconOptionsStateSchema,
}).partial();

const ConditionalFormattingIconSetStateSchema = z.object({
  Expression: z.string(),
  IconSetType: z.string(),
}).partial();

const ConditionalFormattingIconStateSchema = z.object({
  CustomCondition: ConditionalFormattingCustomIconConditionStateSchema,
  IconSet: ConditionalFormattingIconSetStateSchema,
}).partial();

const GaugeChartPrimaryValueConditionalFormattingStateSchema = z.object({
  TextColor: ConditionalFormattingColorStateSchema,
  Icon: ConditionalFormattingIconStateSchema,
}).partial();

const GaugeChartConditionalFormattingOptionStateSchema = z.object({
  Arc: GaugeChartArcConditionalFormattingStateSchema,
  PrimaryValue: GaugeChartPrimaryValueConditionalFormattingStateSchema,
}).partial();

const GaugeChartConditionalFormattingStateSchema = z.object({
  ConditionalFormattingOptions: z.array(
    GaugeChartConditionalFormattingOptionStateSchema,
  ),
}).partial();

const GaugeChartFieldWellsStateSchema = z.object({
  TargetValues: z.array(MeasureFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
}).partial();

const ArcConfigurationStateSchema = z.object({
  ArcAngle: z.number(),
  ArcThickness: z.string(),
}).partial();

const ComparisonFormatConfigurationStateSchema = z.object({
  NumberDisplayFormatConfiguration: NumberDisplayFormatConfigurationStateSchema,
  PercentageDisplayFormatConfiguration:
    PercentageDisplayFormatConfigurationStateSchema,
}).partial();

const ComparisonConfigurationStateSchema = z.object({
  ComparisonMethod: z.string(),
  ComparisonFormat: ComparisonFormatConfigurationStateSchema,
}).partial();

const ArcAxisDisplayRangeStateSchema = z.object({
  Min: z.number(),
  Max: z.number(),
}).partial();

const ArcAxisConfigurationStateSchema = z.object({
  Range: ArcAxisDisplayRangeStateSchema,
  ReserveRange: z.number(),
}).partial();

const GaugeChartOptionsStateSchema = z.object({
  Arc: ArcConfigurationStateSchema,
  Comparison: ComparisonConfigurationStateSchema,
  PrimaryValueDisplayType: z.string(),
  ArcAxis: ArcAxisConfigurationStateSchema,
  PrimaryValueFontConfiguration: FontConfigurationStateSchema,
}).partial();

const GaugeChartColorConfigurationStateSchema = z.object({
  ForegroundColor: z.string(),
  BackgroundColor: z.string(),
}).partial();

const GaugeChartConfigurationStateSchema = z.object({
  DataLabels: DataLabelOptionsStateSchema,
  FieldWells: GaugeChartFieldWellsStateSchema,
  TooltipOptions: TooltipOptionsStateSchema,
  GaugeChartOptions: GaugeChartOptionsStateSchema,
  ColorConfiguration: GaugeChartColorConfigurationStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  VisualPalette: VisualPaletteStateSchema,
}).partial();

const GaugeChartVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  ConditionalFormatting: GaugeChartConditionalFormattingStateSchema,
  VisualId: z.string(),
  ChartConfiguration: GaugeChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
}).partial();

const ShapeConditionalFormatStateSchema = z.object({
  BackgroundColor: ConditionalFormattingColorStateSchema,
}).partial();

const FilledMapShapeConditionalFormattingStateSchema = z.object({
  Format: ShapeConditionalFormatStateSchema,
  FieldId: z.string(),
}).partial();

const FilledMapConditionalFormattingOptionStateSchema = z.object({
  Shape: FilledMapShapeConditionalFormattingStateSchema,
}).partial();

const FilledMapConditionalFormattingStateSchema = z.object({
  ConditionalFormattingOptions: z.array(
    FilledMapConditionalFormattingOptionStateSchema,
  ),
}).partial();

const FilledMapSortConfigurationStateSchema = z.object({
  CategorySort: z.array(FieldSortOptionsStateSchema),
}).partial();

const FilledMapAggregatedFieldWellsStateSchema = z.object({
  Values: z.array(MeasureFieldStateSchema),
  Geospatial: z.array(DimensionFieldStateSchema),
}).partial();

const FilledMapFieldWellsStateSchema = z.object({
  FilledMapAggregatedFieldWells: FilledMapAggregatedFieldWellsStateSchema,
}).partial();

const FilledMapConfigurationStateSchema = z.object({
  SortConfiguration: FilledMapSortConfigurationStateSchema,
  Legend: LegendOptionsStateSchema,
  MapStyleOptions: GeospatialMapStyleOptionsStateSchema,
  FieldWells: FilledMapFieldWellsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  WindowOptions: GeospatialWindowOptionsStateSchema,
}).partial();

const FilledMapVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  ConditionalFormatting: FilledMapConditionalFormattingStateSchema,
  VisualId: z.string(),
  ChartConfiguration: FilledMapConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const WaterfallChartSortConfigurationStateSchema = z.object({
  BreakdownItemsLimit: ItemsLimitConfigurationStateSchema,
  CategorySort: z.array(FieldSortOptionsStateSchema),
}).partial();

const WaterfallChartAggregatedFieldWellsStateSchema = z.object({
  Categories: z.array(DimensionFieldStateSchema),
  Breakdowns: z.array(DimensionFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
}).partial();

const WaterfallChartFieldWellsStateSchema = z.object({
  WaterfallChartAggregatedFieldWells:
    WaterfallChartAggregatedFieldWellsStateSchema,
}).partial();

const WaterfallChartOptionsStateSchema = z.object({
  TotalBarLabel: z.string(),
}).partial();

const WaterfallChartGroupColorConfigurationStateSchema = z.object({
  NegativeBarColor: z.string(),
  TotalBarColor: z.string(),
  PositiveBarColor: z.string(),
}).partial();

const WaterfallChartColorConfigurationStateSchema = z.object({
  GroupColorConfiguration: WaterfallChartGroupColorConfigurationStateSchema,
}).partial();

const WaterfallChartConfigurationStateSchema = z.object({
  CategoryAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  SortConfiguration: WaterfallChartSortConfigurationStateSchema,
  Legend: LegendOptionsStateSchema,
  DataLabels: DataLabelOptionsStateSchema,
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  FieldWells: WaterfallChartFieldWellsStateSchema,
  WaterfallChartOptions: WaterfallChartOptionsStateSchema,
  ColorConfiguration: WaterfallChartColorConfigurationStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  CategoryAxisDisplayOptions: AxisDisplayOptionsStateSchema,
  PrimaryYAxisDisplayOptions: AxisDisplayOptionsStateSchema,
  VisualPalette: VisualPaletteStateSchema,
}).partial();

const WaterfallVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: WaterfallChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const CustomContentConfigurationStateSchema = z.object({
  ContentUrl: z.string(),
  ContentType: z.string(),
  ImageScaling: z.string(),
  Interactions: VisualInteractionOptionsStateSchema,
}).partial();

const CustomContentVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: CustomContentConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  DataSetIdentifier: z.string(),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  TopicIdentifier: z.string(),
}).partial();

const PieChartSortConfigurationStateSchema = z.object({
  SmallMultiplesSort: z.array(FieldSortOptionsStateSchema),
  CategoryItemsLimit: ItemsLimitConfigurationStateSchema,
  CategorySort: z.array(FieldSortOptionsStateSchema),
  SmallMultiplesLimitConfiguration: ItemsLimitConfigurationStateSchema,
}).partial();

const ContributionAnalysisDefaultStateSchema = z.object({
  MeasureFieldId: z.string(),
  ContributorDimensions: z.array(ColumnIdentifierStateSchema),
}).partial();

const PieChartAggregatedFieldWellsStateSchema = z.object({
  Category: z.array(DimensionFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
  SmallMultiples: z.array(DimensionFieldStateSchema),
}).partial();

const PieChartFieldWellsStateSchema = z.object({
  PieChartAggregatedFieldWells: PieChartAggregatedFieldWellsStateSchema,
}).partial();

const DonutCenterOptionsStateSchema = z.object({
  LabelVisibility: z.string(),
}).partial();

const ArcOptionsStateSchema = z.object({
  ArcThickness: z.string(),
}).partial();

const DonutOptionsStateSchema = z.object({
  DonutCenterOptions: DonutCenterOptionsStateSchema,
  ArcOptions: ArcOptionsStateSchema,
}).partial();

const PanelTitleOptionsStateSchema = z.object({
  Visibility: z.string(),
  FontConfiguration: FontConfigurationStateSchema,
  HorizontalTextAlignment: z.string(),
}).partial();

const PanelConfigurationStateSchema = z.object({
  BorderThickness: z.string(),
  BorderStyle: z.string(),
  GutterSpacing: z.string(),
  BackgroundVisibility: z.string(),
  BorderVisibility: z.string(),
  BorderColor: z.string(),
  Title: PanelTitleOptionsStateSchema,
  GutterVisibility: z.string(),
  BackgroundColor: z.string(),
}).partial();

const SmallMultiplesAxisPropertiesStateSchema = z.object({
  Placement: z.string(),
  Scale: z.string(),
}).partial();

const SmallMultiplesOptionsStateSchema = z.object({
  MaxVisibleRows: z.number(),
  PanelConfiguration: PanelConfigurationStateSchema,
  MaxVisibleColumns: z.number(),
  XAxis: SmallMultiplesAxisPropertiesStateSchema,
  YAxis: SmallMultiplesAxisPropertiesStateSchema,
}).partial();

const PieChartConfigurationStateSchema = z.object({
  SortConfiguration: PieChartSortConfigurationStateSchema,
  Legend: LegendOptionsStateSchema,
  DataLabels: DataLabelOptionsStateSchema,
  ContributionAnalysisDefaults: z.array(ContributionAnalysisDefaultStateSchema),
  CategoryLabelOptions: ChartAxisLabelOptionsStateSchema,
  FieldWells: PieChartFieldWellsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  DonutOptions: DonutOptionsStateSchema,
  SmallMultiplesOptions: SmallMultiplesOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  ValueLabelOptions: ChartAxisLabelOptionsStateSchema,
  VisualPalette: VisualPaletteStateSchema,
}).partial();

const PieChartVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: PieChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const KPIPrimaryValueConditionalFormattingStateSchema = z.object({
  TextColor: ConditionalFormattingColorStateSchema,
  Icon: ConditionalFormattingIconStateSchema,
}).partial();

const KPIActualValueConditionalFormattingStateSchema = z.object({
  TextColor: ConditionalFormattingColorStateSchema,
  Icon: ConditionalFormattingIconStateSchema,
}).partial();

const KPIComparisonValueConditionalFormattingStateSchema = z.object({
  TextColor: ConditionalFormattingColorStateSchema,
  Icon: ConditionalFormattingIconStateSchema,
}).partial();

const KPIProgressBarConditionalFormattingStateSchema = z.object({
  ForegroundColor: ConditionalFormattingColorStateSchema,
}).partial();

const KPIConditionalFormattingOptionStateSchema = z.object({
  PrimaryValue: KPIPrimaryValueConditionalFormattingStateSchema,
  ActualValue: KPIActualValueConditionalFormattingStateSchema,
  ComparisonValue: KPIComparisonValueConditionalFormattingStateSchema,
  ProgressBar: KPIProgressBarConditionalFormattingStateSchema,
}).partial();

const KPIConditionalFormattingStateSchema = z.object({
  ConditionalFormattingOptions: z.array(
    KPIConditionalFormattingOptionStateSchema,
  ),
}).partial();

const KPISortConfigurationStateSchema = z.object({
  TrendGroupSort: z.array(FieldSortOptionsStateSchema),
}).partial();

const KPIVisualStandardLayoutStateSchema = z.object({
  Type: z.string(),
}).partial();

const KPIVisualLayoutOptionsStateSchema = z.object({
  StandardLayout: KPIVisualStandardLayoutStateSchema,
}).partial();

const TrendArrowOptionsStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const SecondaryValueOptionsStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const ProgressBarOptionsStateSchema = z.object({
  Visibility: z.string(),
}).partial();

const KPISparklineOptionsStateSchema = z.object({
  Type: z.string(),
  Color: z.string(),
  TooltipVisibility: z.string(),
  Visibility: z.string(),
}).partial();

const KPIOptionsStateSchema = z.object({
  SecondaryValueFontConfiguration: FontConfigurationStateSchema,
  VisualLayoutOptions: KPIVisualLayoutOptionsStateSchema,
  TrendArrows: TrendArrowOptionsStateSchema,
  SecondaryValue: SecondaryValueOptionsStateSchema,
  Comparison: ComparisonConfigurationStateSchema,
  PrimaryValueDisplayType: z.string(),
  ProgressBar: ProgressBarOptionsStateSchema,
  PrimaryValueFontConfiguration: FontConfigurationStateSchema,
  Sparkline: KPISparklineOptionsStateSchema,
}).partial();

const KPIFieldWellsStateSchema = z.object({
  TargetValues: z.array(MeasureFieldStateSchema),
  TrendGroups: z.array(DimensionFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
}).partial();

const KPIConfigurationStateSchema = z.object({
  SortConfiguration: KPISortConfigurationStateSchema,
  KPIOptions: KPIOptionsStateSchema,
  FieldWells: KPIFieldWellsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
}).partial();

const KPIVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  ConditionalFormatting: KPIConditionalFormattingStateSchema,
  VisualId: z.string(),
  ChartConfiguration: KPIConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const BinWidthOptionsStateSchema = z.object({
  BinCountLimit: z.number(),
  Value: z.number(),
}).partial();

const BinCountOptionsStateSchema = z.object({
  Value: z.number(),
}).partial();

const HistogramBinOptionsStateSchema = z.object({
  BinWidth: BinWidthOptionsStateSchema,
  StartValue: z.number(),
  SelectedBinType: z.string(),
  BinCount: BinCountOptionsStateSchema,
}).partial();

const HistogramAggregatedFieldWellsStateSchema = z.object({
  Values: z.array(MeasureFieldStateSchema),
}).partial();

const HistogramFieldWellsStateSchema = z.object({
  HistogramAggregatedFieldWells: HistogramAggregatedFieldWellsStateSchema,
}).partial();

const HistogramConfigurationStateSchema = z.object({
  YAxisDisplayOptions: AxisDisplayOptionsStateSchema,
  DataLabels: DataLabelOptionsStateSchema,
  BinOptions: HistogramBinOptionsStateSchema,
  FieldWells: HistogramFieldWellsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  XAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  VisualPalette: VisualPaletteStateSchema,
  XAxisDisplayOptions: AxisDisplayOptionsStateSchema,
}).partial();

const HistogramVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: HistogramConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
}).partial();

const PluginVisualItemsLimitConfigurationStateSchema = z.object({
  ItemsLimit: z.number(),
}).partial();

const PluginVisualTableQuerySortStateSchema = z.object({
  ItemsLimitConfiguration: PluginVisualItemsLimitConfigurationStateSchema,
  RowSort: z.array(FieldSortOptionsStateSchema),
}).partial();

const PluginVisualSortConfigurationStateSchema = z.object({
  PluginVisualTableQuerySort: PluginVisualTableQuerySortStateSchema,
}).partial();

const PluginVisualPropertyStateSchema = z.object({
  Value: z.string(),
  Name: z.string(),
}).partial();

const PluginVisualOptionsStateSchema = z.object({
  VisualProperties: z.array(PluginVisualPropertyStateSchema),
}).partial();

const PluginVisualFieldWellStateSchema = z.object({
  Unaggregated: z.array(UnaggregatedFieldStateSchema),
  AxisName: z.string(),
  Measures: z.array(MeasureFieldStateSchema),
  Dimensions: z.array(DimensionFieldStateSchema),
}).partial();

const PluginVisualConfigurationStateSchema = z.object({
  SortConfiguration: PluginVisualSortConfigurationStateSchema,
  VisualOptions: PluginVisualOptionsStateSchema,
  FieldWells: z.array(PluginVisualFieldWellStateSchema),
}).partial();

const PluginVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  PluginArn: z.string(),
  VisualId: z.string(),
  ChartConfiguration: PluginVisualConfigurationStateSchema,
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
}).partial();

const TableRowConditionalFormattingStateSchema = z.object({
  TextColor: ConditionalFormattingColorStateSchema,
  BackgroundColor: ConditionalFormattingColorStateSchema,
}).partial();

const TextConditionalFormatStateSchema = z.object({
  TextColor: ConditionalFormattingColorStateSchema,
  Icon: ConditionalFormattingIconStateSchema,
  BackgroundColor: ConditionalFormattingColorStateSchema,
}).partial();

const TableCellConditionalFormattingStateSchema = z.object({
  FieldId: z.string(),
  TextFormat: TextConditionalFormatStateSchema,
}).partial();

const TableConditionalFormattingOptionStateSchema = z.object({
  Row: TableRowConditionalFormattingStateSchema,
  Cell: TableCellConditionalFormattingStateSchema,
}).partial();

const TableConditionalFormattingStateSchema = z.object({
  ConditionalFormattingOptions: z.array(
    TableConditionalFormattingOptionStateSchema,
  ),
}).partial();

const TableSortConfigurationStateSchema = z.object({
  RowSort: z.array(FieldSortOptionsStateSchema),
  PaginationConfiguration: PaginationConfigurationStateSchema,
}).partial();

const TablePaginatedReportOptionsStateSchema = z.object({
  OverflowColumnHeaderVisibility: z.string(),
  VerticalOverflowVisibility: z.string(),
}).partial();

const TableBorderOptionsStateSchema = z.object({
  Thickness: z.number(),
  Color: z.string(),
  Style: z.string(),
}).partial();

const TableSideBorderOptionsStateSchema = z.object({
  Left: TableBorderOptionsStateSchema,
  Top: TableBorderOptionsStateSchema,
  InnerHorizontal: TableBorderOptionsStateSchema,
  Right: TableBorderOptionsStateSchema,
  Bottom: TableBorderOptionsStateSchema,
  InnerVertical: TableBorderOptionsStateSchema,
}).partial();

const GlobalTableBorderOptionsStateSchema = z.object({
  UniformBorder: TableBorderOptionsStateSchema,
  SideSpecificBorder: TableSideBorderOptionsStateSchema,
}).partial();

const TableCellStyleStateSchema = z.object({
  VerticalTextAlignment: z.string(),
  Visibility: z.string(),
  Height: z.number(),
  FontConfiguration: FontConfigurationStateSchema,
  Border: GlobalTableBorderOptionsStateSchema,
  TextWrap: z.string(),
  HorizontalTextAlignment: z.string(),
  BackgroundColor: z.string(),
}).partial();

const RowAlternateColorOptionsStateSchema = z.object({
  Status: z.string(),
  UsePrimaryBackgroundColor: z.string(),
  RowAlternateColors: z.array(z.string()),
}).partial();

const TableOptionsStateSchema = z.object({
  HeaderStyle: TableCellStyleStateSchema,
  CellStyle: TableCellStyleStateSchema,
  Orientation: z.string(),
  RowAlternateColorOptions: RowAlternateColorOptionsStateSchema,
}).partial();

const SparklinesOptionsStateSchema = z.object({
  LineInterpolation: z.string(),
  MaxValueMarker: LineChartMarkerStyleSettingsStateSchema,
  XAxisField: DimensionFieldStateSchema,
  AllPointsMarker: LineChartMarkerStyleSettingsStateSchema,
  MinValueMarker: LineChartMarkerStyleSettingsStateSchema,
  FieldId: z.string(),
  VisualType: z.string(),
  LineColor: z.string(),
  YAxisBehavior: z.string(),
}).partial();

const DataBarsOptionsStateSchema = z.object({
  PositiveColor: z.string(),
  FieldId: z.string(),
  NegativeColor: z.string(),
}).partial();

const TableInlineVisualizationStateSchema = z.object({
  Sparklines: SparklinesOptionsStateSchema,
  DataBars: DataBarsOptionsStateSchema,
}).partial();

const TableUnaggregatedFieldWellsStateSchema = z.object({
  Values: z.array(UnaggregatedFieldStateSchema),
}).partial();

const TableAggregatedFieldWellsStateSchema = z.object({
  GroupBy: z.array(DimensionFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
}).partial();

const TableFieldWellsStateSchema = z.object({
  TableUnaggregatedFieldWells: TableUnaggregatedFieldWellsStateSchema,
  TableAggregatedFieldWells: TableAggregatedFieldWellsStateSchema,
}).partial();

const TablePinnedFieldOptionsStateSchema = z.object({
  PinnedLeftFields: z.array(z.string()),
}).partial();

const TransposedTableOptionStateSchema = z.object({
  ColumnWidth: z.string(),
  ColumnIndex: z.number(),
  ColumnType: z.string(),
}).partial();

const TableFieldCustomIconContentStateSchema = z.object({
  Icon: z.string(),
}).partial();

const TableFieldCustomTextContentStateSchema = z.object({
  Value: z.string(),
  FontConfiguration: FontConfigurationStateSchema,
}).partial();

const TableFieldLinkContentConfigurationStateSchema = z.object({
  CustomIconContent: TableFieldCustomIconContentStateSchema,
  CustomTextContent: TableFieldCustomTextContentStateSchema,
}).partial();

const TableFieldLinkConfigurationStateSchema = z.object({
  Target: z.string(),
  Content: TableFieldLinkContentConfigurationStateSchema,
}).partial();

const TableCellImageSizingConfigurationStateSchema = z.object({
  TableCellImageScalingConfiguration: z.string(),
}).partial();

const TableFieldImageConfigurationStateSchema = z.object({
  SizingOptions: TableCellImageSizingConfigurationStateSchema,
}).partial();

const TableFieldURLConfigurationStateSchema = z.object({
  LinkConfiguration: TableFieldLinkConfigurationStateSchema,
  ImageConfiguration: TableFieldImageConfigurationStateSchema,
}).partial();

const TableFieldOptionStateSchema = z.object({
  CustomLabel: z.string(),
  URLStyling: TableFieldURLConfigurationStateSchema,
  FieldId: z.string(),
  Visibility: z.string(),
  Width: z.string(),
}).partial();

const TableFieldOptionsStateSchema = z.object({
  Order: z.array(z.string()),
  PinnedFieldOptions: TablePinnedFieldOptionsStateSchema,
  TransposedTableOptions: z.array(TransposedTableOptionStateSchema),
  SelectedFieldOptions: z.array(TableFieldOptionStateSchema),
}).partial();

const TotalAggregationFunctionStateSchema = z.object({
  SimpleTotalAggregationFunction: z.string(),
}).partial();

const TotalAggregationOptionStateSchema = z.object({
  TotalAggregationFunction: TotalAggregationFunctionStateSchema,
  FieldId: z.string(),
}).partial();

const TotalOptionsStateSchema = z.object({
  TotalAggregationOptions: z.array(TotalAggregationOptionStateSchema),
  CustomLabel: z.string(),
  ScrollStatus: z.string(),
  Placement: z.string(),
  TotalCellStyle: TableCellStyleStateSchema,
  TotalsVisibility: z.string(),
}).partial();

const TableConfigurationStateSchema = z.object({
  SortConfiguration: TableSortConfigurationStateSchema,
  PaginatedReportOptions: TablePaginatedReportOptionsStateSchema,
  TableOptions: TableOptionsStateSchema,
  TableInlineVisualizations: z.array(TableInlineVisualizationStateSchema),
  FieldWells: TableFieldWellsStateSchema,
  FieldOptions: TableFieldOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  TotalOptions: TotalOptionsStateSchema,
}).partial();

const TableVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  ConditionalFormatting: TableConditionalFormattingStateSchema,
  VisualId: z.string(),
  ChartConfiguration: TableConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
}).partial();

const PivotTableConditionalFormattingScopeStateSchema = z.object({
  Role: z.string(),
}).partial();

const PivotTableCellConditionalFormattingStateSchema = z.object({
  Scope: PivotTableConditionalFormattingScopeStateSchema,
  Scopes: z.array(PivotTableConditionalFormattingScopeStateSchema),
  FieldId: z.string(),
  TextFormat: TextConditionalFormatStateSchema,
}).partial();

const PivotTableConditionalFormattingOptionStateSchema = z.object({
  Cell: PivotTableCellConditionalFormattingStateSchema,
}).partial();

const PivotTableConditionalFormattingStateSchema = z.object({
  ConditionalFormattingOptions: z.array(
    PivotTableConditionalFormattingOptionStateSchema,
  ),
}).partial();

const DataPathSortStateSchema = z.object({
  SortPaths: z.array(DataPathValueStateSchema),
  Direction: z.string(),
}).partial();

const PivotTableSortByStateSchema = z.object({
  Field: FieldSortStateSchema,
  DataPath: DataPathSortStateSchema,
  Column: ColumnSortStateSchema,
}).partial();

const PivotFieldSortOptionsStateSchema = z.object({
  SortBy: PivotTableSortByStateSchema,
  FieldId: z.string(),
}).partial();

const PivotTableSortConfigurationStateSchema = z.object({
  FieldSortOptions: z.array(PivotFieldSortOptionsStateSchema),
}).partial();

const PivotTablePaginatedReportOptionsStateSchema = z.object({
  OverflowColumnHeaderVisibility: z.string(),
  VerticalOverflowVisibility: z.string(),
}).partial();

const PivotTableRowsLabelOptionsStateSchema = z.object({
  CustomLabel: z.string(),
  Visibility: z.string(),
}).partial();

const PivotTableOptionsStateSchema = z.object({
  RowFieldNamesStyle: TableCellStyleStateSchema,
  RowHeaderStyle: TableCellStyleStateSchema,
  CollapsedRowDimensionsVisibility: z.string(),
  RowsLayout: z.string(),
  MetricPlacement: z.string(),
  DefaultCellWidth: z.string(),
  ColumnNamesVisibility: z.string(),
  RowsLabelOptions: PivotTableRowsLabelOptionsStateSchema,
  SingleMetricVisibility: z.string(),
  ColumnHeaderStyle: TableCellStyleStateSchema,
  ToggleButtonsVisibility: z.string(),
  CellStyle: TableCellStyleStateSchema,
  RowAlternateColorOptions: RowAlternateColorOptionsStateSchema,
}).partial();

const PivotTableAggregatedFieldWellsStateSchema = z.object({
  Values: z.array(MeasureFieldStateSchema),
  Columns: z.array(DimensionFieldStateSchema),
  Rows: z.array(DimensionFieldStateSchema),
}).partial();

const PivotTableFieldWellsStateSchema = z.object({
  PivotTableAggregatedFieldWells: PivotTableAggregatedFieldWellsStateSchema,
}).partial();

const PivotTableFieldCollapseStateTargetStateSchema = z.object({
  FieldId: z.string(),
  FieldDataPathValues: z.array(DataPathValueStateSchema),
}).partial();

const PivotTableFieldCollapseStateOptionStateSchema = z.object({
  Target: PivotTableFieldCollapseStateTargetStateSchema,
  State: z.string(),
}).partial();

const PivotTableDataPathOptionStateSchema = z.object({
  DataPathList: z.array(DataPathValueStateSchema),
  Width: z.string(),
}).partial();

const PivotTableFieldOptionStateSchema = z.object({
  CustomLabel: z.string(),
  FieldId: z.string(),
  Visibility: z.string(),
}).partial();

const PivotTableFieldOptionsStateSchema = z.object({
  CollapseStateOptions: z.array(PivotTableFieldCollapseStateOptionStateSchema),
  DataPathOptions: z.array(PivotTableDataPathOptionStateSchema),
  SelectedFieldOptions: z.array(PivotTableFieldOptionStateSchema),
}).partial();

const PivotTableFieldSubtotalOptionsStateSchema = z.object({
  FieldId: z.string(),
}).partial();

const TableStyleTargetStateSchema = z.object({
  CellType: z.string(),
}).partial();

const SubtotalOptionsStateSchema = z.object({
  CustomLabel: z.string(),
  FieldLevelOptions: z.array(PivotTableFieldSubtotalOptionsStateSchema),
  ValueCellStyle: TableCellStyleStateSchema,
  TotalCellStyle: TableCellStyleStateSchema,
  TotalsVisibility: z.string(),
  FieldLevel: z.string(),
  MetricHeaderCellStyle: TableCellStyleStateSchema,
  StyleTargets: z.array(TableStyleTargetStateSchema),
}).partial();

const PivotTotalOptionsStateSchema = z.object({
  TotalAggregationOptions: z.array(TotalAggregationOptionStateSchema),
  CustomLabel: z.string(),
  ValueCellStyle: TableCellStyleStateSchema,
  ScrollStatus: z.string(),
  Placement: z.string(),
  TotalCellStyle: TableCellStyleStateSchema,
  TotalsVisibility: z.string(),
  MetricHeaderCellStyle: TableCellStyleStateSchema,
}).partial();

const PivotTableTotalOptionsStateSchema = z.object({
  ColumnSubtotalOptions: SubtotalOptionsStateSchema,
  RowSubtotalOptions: SubtotalOptionsStateSchema,
  RowTotalOptions: PivotTotalOptionsStateSchema,
  ColumnTotalOptions: PivotTotalOptionsStateSchema,
}).partial();

const PivotTableConfigurationStateSchema = z.object({
  SortConfiguration: PivotTableSortConfigurationStateSchema,
  PaginatedReportOptions: PivotTablePaginatedReportOptionsStateSchema,
  TableOptions: PivotTableOptionsStateSchema,
  FieldWells: PivotTableFieldWellsStateSchema,
  FieldOptions: PivotTableFieldOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  TotalOptions: PivotTableTotalOptionsStateSchema,
}).partial();

const PivotTableVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  ConditionalFormatting: PivotTableConditionalFormattingStateSchema,
  VisualId: z.string(),
  ChartConfiguration: PivotTableConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
}).partial();

const BarChartSortConfigurationStateSchema = z.object({
  SmallMultiplesSort: z.array(FieldSortOptionsStateSchema),
  ColorSort: z.array(FieldSortOptionsStateSchema),
  ColorItemsLimit: ItemsLimitConfigurationStateSchema,
  CategoryItemsLimit: ItemsLimitConfigurationStateSchema,
  CategorySort: z.array(FieldSortOptionsStateSchema),
  SmallMultiplesLimitConfiguration: ItemsLimitConfigurationStateSchema,
}).partial();

const BarChartDefaultSeriesSettingsStateSchema = z.object({
  BorderSettings: BorderSettingsStateSchema,
  DecalSettings: DecalSettingsStateSchema,
}).partial();

const BarSeriesItemStateSchema = z.object({}).partial();

const BarChartAggregatedFieldWellsStateSchema = z.object({
  Category: z.array(DimensionFieldStateSchema),
  Colors: z.array(DimensionFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
  SmallMultiples: z.array(DimensionFieldStateSchema),
}).partial();

const BarChartFieldWellsStateSchema = z.object({
  BarChartAggregatedFieldWells: BarChartAggregatedFieldWellsStateSchema,
}).partial();

const BarChartConfigurationStateSchema = z.object({
  SortConfiguration: BarChartSortConfigurationStateSchema,
  Legend: LegendOptionsStateSchema,
  ReferenceLines: z.array(ReferenceLineStateSchema),
  DataLabels: DataLabelOptionsStateSchema,
  ColorLabelOptions: ChartAxisLabelOptionsStateSchema,
  CategoryLabelOptions: ChartAxisLabelOptionsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  SmallMultiplesOptions: SmallMultiplesOptionsStateSchema,
  Orientation: z.string(),
  VisualPalette: VisualPaletteStateSchema,
  ValueLabelOptions: ChartAxisLabelOptionsStateSchema,
  BarsArrangement: z.string(),
  DefaultSeriesSettings: BarChartDefaultSeriesSettingsStateSchema,
  Series: z.array(BarSeriesItemStateSchema),
  CategoryAxis: AxisDisplayOptionsStateSchema,
  ContributionAnalysisDefaults: z.array(ContributionAnalysisDefaultStateSchema),
  FieldWells: BarChartFieldWellsStateSchema,
  ValueAxis: AxisDisplayOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
}).partial();

const BarChartVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: BarChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const HeatMapSortConfigurationStateSchema = z.object({
  HeatMapRowSort: z.array(FieldSortOptionsStateSchema),
  HeatMapRowItemsLimitConfiguration: ItemsLimitConfigurationStateSchema,
  HeatMapColumnItemsLimitConfiguration: ItemsLimitConfigurationStateSchema,
  HeatMapColumnSort: z.array(FieldSortOptionsStateSchema),
}).partial();

const HeatMapAggregatedFieldWellsStateSchema = z.object({
  Values: z.array(MeasureFieldStateSchema),
  Columns: z.array(DimensionFieldStateSchema),
  Rows: z.array(DimensionFieldStateSchema),
}).partial();

const HeatMapFieldWellsStateSchema = z.object({
  HeatMapAggregatedFieldWells: HeatMapAggregatedFieldWellsStateSchema,
}).partial();

const DataColorStateSchema = z.object({
  DataValue: z.number(),
  Color: z.string(),
}).partial();

const ColorScaleStateSchema = z.object({
  Colors: z.array(DataColorStateSchema),
  ColorFillType: z.string(),
  NullValueColor: DataColorStateSchema,
}).partial();

const HeatMapConfigurationStateSchema = z.object({
  SortConfiguration: HeatMapSortConfigurationStateSchema,
  ColumnLabelOptions: ChartAxisLabelOptionsStateSchema,
  Legend: LegendOptionsStateSchema,
  DataLabels: DataLabelOptionsStateSchema,
  FieldWells: HeatMapFieldWellsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  ColorScale: ColorScaleStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  RowLabelOptions: ChartAxisLabelOptionsStateSchema,
}).partial();

const HeatMapVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: HeatMapConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const TreeMapSortConfigurationStateSchema = z.object({
  TreeMapSort: z.array(FieldSortOptionsStateSchema),
  TreeMapGroupItemsLimitConfiguration: ItemsLimitConfigurationStateSchema,
}).partial();

const TreeMapAggregatedFieldWellsStateSchema = z.object({
  Sizes: z.array(MeasureFieldStateSchema),
  Colors: z.array(MeasureFieldStateSchema),
  Groups: z.array(DimensionFieldStateSchema),
}).partial();

const TreeMapFieldWellsStateSchema = z.object({
  TreeMapAggregatedFieldWells: TreeMapAggregatedFieldWellsStateSchema,
}).partial();

const TreeMapConfigurationStateSchema = z.object({
  SortConfiguration: TreeMapSortConfigurationStateSchema,
  Legend: LegendOptionsStateSchema,
  DataLabels: DataLabelOptionsStateSchema,
  ColorLabelOptions: ChartAxisLabelOptionsStateSchema,
  SizeLabelOptions: ChartAxisLabelOptionsStateSchema,
  FieldWells: TreeMapFieldWellsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  ColorScale: ColorScaleStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
  GroupLabelOptions: ChartAxisLabelOptionsStateSchema,
}).partial();

const TreeMapVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: TreeMapConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const PeriodToDateComputationStateSchema = z.object({
  PeriodTimeGranularity: z.string(),
  Value: MeasureFieldStateSchema,
  Time: DimensionFieldStateSchema,
  ComputationId: z.string(),
  Name: z.string(),
}).partial();

const GrowthRateComputationStateSchema = z.object({
  Value: MeasureFieldStateSchema,
  Time: DimensionFieldStateSchema,
  PeriodSize: z.number(),
  ComputationId: z.string(),
  Name: z.string(),
}).partial();

const TopBottomRankedComputationStateSchema = z.object({
  Type: z.string(),
  Category: DimensionFieldStateSchema,
  ResultSize: z.number(),
  Value: MeasureFieldStateSchema,
  ComputationId: z.string(),
  Name: z.string(),
}).partial();

const TotalAggregationComputationStateSchema = z.object({
  Value: MeasureFieldStateSchema,
  ComputationId: z.string(),
  Name: z.string(),
}).partial();

const ForecastComputationStateSchema = z.object({
  PeriodsBackward: z.number(),
  PeriodsForward: z.number(),
  PredictionInterval: z.number(),
  Seasonality: z.string(),
  CustomSeasonalityValue: z.number(),
  Value: MeasureFieldStateSchema,
  Time: DimensionFieldStateSchema,
  UpperBoundary: z.number(),
  ComputationId: z.string(),
  Name: z.string(),
  LowerBoundary: z.number(),
}).partial();

const MaximumMinimumComputationStateSchema = z.object({
  Type: z.string(),
  Value: MeasureFieldStateSchema,
  Time: DimensionFieldStateSchema,
  ComputationId: z.string(),
  Name: z.string(),
}).partial();

const PeriodOverPeriodComputationStateSchema = z.object({
  Value: MeasureFieldStateSchema,
  Time: DimensionFieldStateSchema,
  ComputationId: z.string(),
  Name: z.string(),
}).partial();

const MetricComparisonComputationStateSchema = z.object({
  TargetValue: MeasureFieldStateSchema,
  Time: DimensionFieldStateSchema,
  ComputationId: z.string(),
  FromValue: MeasureFieldStateSchema,
  Name: z.string(),
}).partial();

const TopBottomMoversComputationStateSchema = z.object({
  Type: z.string(),
  Category: DimensionFieldStateSchema,
  Value: MeasureFieldStateSchema,
  SortOrder: z.string(),
  Time: DimensionFieldStateSchema,
  MoverSize: z.number(),
  ComputationId: z.string(),
  Name: z.string(),
}).partial();

const UniqueValuesComputationStateSchema = z.object({
  Category: DimensionFieldStateSchema,
  ComputationId: z.string(),
  Name: z.string(),
}).partial();

const ComputationStateSchema = z.object({
  PeriodToDate: PeriodToDateComputationStateSchema,
  GrowthRate: GrowthRateComputationStateSchema,
  TopBottomRanked: TopBottomRankedComputationStateSchema,
  TotalAggregation: TotalAggregationComputationStateSchema,
  Forecast: ForecastComputationStateSchema,
  MaximumMinimum: MaximumMinimumComputationStateSchema,
  PeriodOverPeriod: PeriodOverPeriodComputationStateSchema,
  MetricComparison: MetricComparisonComputationStateSchema,
  TopBottomMovers: TopBottomMoversComputationStateSchema,
  UniqueValues: UniqueValuesComputationStateSchema,
}).partial();

const CustomNarrativeOptionsStateSchema = z.object({
  Narrative: z.string(),
}).partial();

const InsightConfigurationStateSchema = z.object({
  Computations: z.array(ComputationStateSchema),
  CustomNarrative: CustomNarrativeOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
}).partial();

const InsightVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  Actions: z.array(VisualCustomActionStateSchema),
  DataSetIdentifier: z.string(),
  InsightConfiguration: InsightConfigurationStateSchema,
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  TopicIdentifier: z.string(),
}).partial();

const LineChartSortConfigurationStateSchema = z.object({
  CategoryItemsLimitConfiguration: ItemsLimitConfigurationStateSchema,
  ColorItemsLimitConfiguration: ItemsLimitConfigurationStateSchema,
  SmallMultiplesSort: z.array(FieldSortOptionsStateSchema),
  CategorySort: z.array(FieldSortOptionsStateSchema),
  SmallMultiplesLimitConfiguration: ItemsLimitConfigurationStateSchema,
}).partial();

const MissingDataConfigurationStateSchema = z.object({
  TreatmentOption: z.string(),
}).partial();

const LineSeriesAxisDisplayOptionsStateSchema = z.object({
  MissingDataConfigurations: z.array(MissingDataConfigurationStateSchema),
  AxisOptions: AxisDisplayOptionsStateSchema,
}).partial();

const LineChartDefaultSeriesSettingsStateSchema = z.object({
  DecalSettings: DecalSettingsStateSchema,
  LineStyleSettings: LineChartLineStyleSettingsStateSchema,
  AxisBinding: z.string(),
  MarkerStyleSettings: LineChartMarkerStyleSettingsStateSchema,
}).partial();

const TimeBasedForecastPropertiesStateSchema = z.object({
  PeriodsBackward: z.number(),
  PeriodsForward: z.number(),
  PredictionInterval: z.number(),
  Seasonality: z.number(),
  UpperBoundary: z.number(),
  LowerBoundary: z.number(),
}).partial();

const WhatIfRangeScenarioStateSchema = z.object({
  StartDate: z.string(),
  Value: z.number(),
  EndDate: z.string(),
}).partial();

const WhatIfPointScenarioStateSchema = z.object({
  Value: z.number(),
  Date: z.string(),
}).partial();

const ForecastScenarioStateSchema = z.object({
  WhatIfRangeScenario: WhatIfRangeScenarioStateSchema,
  WhatIfPointScenario: WhatIfPointScenarioStateSchema,
}).partial();

const ForecastConfigurationStateSchema = z.object({
  ForecastProperties: TimeBasedForecastPropertiesStateSchema,
  Scenario: ForecastScenarioStateSchema,
}).partial();

const LineChartSeriesSettingsStateSchema = z.object({
  DecalSettings: DecalSettingsStateSchema,
  LineStyleSettings: LineChartLineStyleSettingsStateSchema,
  MarkerStyleSettings: LineChartMarkerStyleSettingsStateSchema,
}).partial();

const FieldSeriesItemStateSchema = z.object({
  FieldId: z.string(),
  AxisBinding: z.string(),
  Settings: LineChartSeriesSettingsStateSchema,
}).partial();

const DataFieldSeriesItemStateSchema = z.object({
  FieldId: z.string(),
  AxisBinding: z.string(),
  FieldValue: z.string(),
  Settings: LineChartSeriesSettingsStateSchema,
}).partial();

const SeriesItemStateSchema = z.object({
  FieldSeriesItem: FieldSeriesItemStateSchema,
  DataFieldSeriesItem: DataFieldSeriesItemStateSchema,
}).partial();

const LineChartAggregatedFieldWellsStateSchema = z.object({
  Category: z.array(DimensionFieldStateSchema),
  Colors: z.array(DimensionFieldStateSchema),
  Values: z.array(MeasureFieldStateSchema),
  SmallMultiples: z.array(DimensionFieldStateSchema),
}).partial();

const LineChartFieldWellsStateSchema = z.object({
  LineChartAggregatedFieldWells: LineChartAggregatedFieldWellsStateSchema,
}).partial();

const LineChartConfigurationStateSchema = z.object({
  SortConfiguration: LineChartSortConfigurationStateSchema,
  Legend: LegendOptionsStateSchema,
  ReferenceLines: z.array(ReferenceLineStateSchema),
  DataLabels: DataLabelOptionsStateSchema,
  Tooltip: TooltipOptionsStateSchema,
  SingleAxisOptions: SingleAxisOptionsStateSchema,
  SmallMultiplesOptions: SmallMultiplesOptionsStateSchema,
  PrimaryYAxisDisplayOptions: LineSeriesAxisDisplayOptionsStateSchema,
  VisualPalette: VisualPaletteStateSchema,
  XAxisDisplayOptions: AxisDisplayOptionsStateSchema,
  DefaultSeriesSettings: LineChartDefaultSeriesSettingsStateSchema,
  SecondaryYAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  ForecastConfigurations: z.array(ForecastConfigurationStateSchema),
  Series: z.array(SeriesItemStateSchema),
  Type: z.string(),
  PrimaryYAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  ContributionAnalysisDefaults: z.array(ContributionAnalysisDefaultStateSchema),
  FieldWells: LineChartFieldWellsStateSchema,
  SecondaryYAxisDisplayOptions: LineSeriesAxisDisplayOptionsStateSchema,
  XAxisLabelOptions: ChartAxisLabelOptionsStateSchema,
  Interactions: VisualInteractionOptionsStateSchema,
}).partial();

const LineChartVisualStateSchema = z.object({
  Subtitle: VisualSubtitleLabelOptionsStateSchema,
  VisualId: z.string(),
  ChartConfiguration: LineChartConfigurationStateSchema,
  Actions: z.array(VisualCustomActionStateSchema),
  Title: VisualTitleLabelOptionsStateSchema,
  VisualContentAltText: z.string(),
  ColumnHierarchies: z.array(ColumnHierarchyStateSchema),
}).partial();

const EmptyVisualStateSchema = z.object({
  VisualId: z.string(),
  Actions: z.array(VisualCustomActionStateSchema),
  DataSetIdentifier: z.string(),
  TopicIdentifier: z.string(),
}).partial();

const VisualStateSchema = z.object({
  FunnelChartVisual: FunnelChartVisualStateSchema,
  BoxPlotVisual: BoxPlotVisualStateSchema,
  LayerMapVisual: LayerMapVisualStateSchema,
  GeospatialMapVisual: GeospatialMapVisualStateSchema,
  ScatterPlotVisual: ScatterPlotVisualStateSchema,
  RadarChartVisual: RadarChartVisualStateSchema,
  ComboChartVisual: ComboChartVisualStateSchema,
  WordCloudVisual: WordCloudVisualStateSchema,
  SankeyDiagramVisual: SankeyDiagramVisualStateSchema,
  GaugeChartVisual: GaugeChartVisualStateSchema,
  FilledMapVisual: FilledMapVisualStateSchema,
  WaterfallVisual: WaterfallVisualStateSchema,
  CustomContentVisual: CustomContentVisualStateSchema,
  PieChartVisual: PieChartVisualStateSchema,
  KPIVisual: KPIVisualStateSchema,
  HistogramVisual: HistogramVisualStateSchema,
  PluginVisual: PluginVisualStateSchema,
  TableVisual: TableVisualStateSchema,
  PivotTableVisual: PivotTableVisualStateSchema,
  BarChartVisual: BarChartVisualStateSchema,
  HeatMapVisual: HeatMapVisualStateSchema,
  TreeMapVisual: TreeMapVisualStateSchema,
  InsightVisual: InsightVisualStateSchema,
  LineChartVisual: LineChartVisualStateSchema,
  EmptyVisual: EmptyVisualStateSchema,
}).partial();

const SheetDefinitionStateSchema = z.object({
  Description: z.string(),
  ParameterControls: z.array(ParameterControlStateSchema),
  ContentType: z.string(),
  SheetId: z.string(),
  Images: z.array(SheetImageStateSchema),
  SheetControlLayouts: z.array(SheetControlLayoutStateSchema),
  Title: z.string(),
  Name: z.string(),
  TextBoxes: z.array(SheetTextBoxStateSchema),
  Layouts: z.array(LayoutStateSchema),
  FilterControls: z.array(FilterControlStateSchema),
  CustomActionDefaults: VisualCustomActionDefaultsStateSchema,
  Visuals: z.array(VisualStateSchema),
}).partial();

const MappedDataSetParameterStateSchema = z.object({
  DataSetParameterName: z.string(),
  DataSetIdentifier: z.string(),
}).partial();

const DynamicDefaultValueStateSchema = z.object({
  GroupNameColumn: ColumnIdentifierStateSchema,
  DefaultValueColumn: ColumnIdentifierStateSchema,
  UserNameColumn: ColumnIdentifierStateSchema,
}).partial();

const StringDefaultValuesStateSchema = z.object({
  DynamicValue: DynamicDefaultValueStateSchema,
  StaticValues: z.array(z.string()),
}).partial();

const StringValueWhenUnsetConfigurationStateSchema = z.object({
  ValueWhenUnsetOption: z.string(),
  CustomValue: z.string(),
}).partial();

const StringParameterDeclarationStateSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterStateSchema),
  DefaultValues: StringDefaultValuesStateSchema,
  ParameterValueType: z.string(),
  ValueWhenUnset: StringValueWhenUnsetConfigurationStateSchema,
  Name: z.string(),
}).partial();

const DateTimeDefaultValuesStateSchema = z.object({
  RollingDate: RollingDateConfigurationStateSchema,
  DynamicValue: DynamicDefaultValueStateSchema,
  StaticValues: z.array(z.string()),
}).partial();

const DateTimeValueWhenUnsetConfigurationStateSchema = z.object({
  ValueWhenUnsetOption: z.string(),
  CustomValue: z.string(),
}).partial();

const DateTimeParameterDeclarationStateSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterStateSchema),
  DefaultValues: DateTimeDefaultValuesStateSchema,
  TimeGranularity: z.string(),
  ValueWhenUnset: DateTimeValueWhenUnsetConfigurationStateSchema,
  Name: z.string(),
}).partial();

const DecimalDefaultValuesStateSchema = z.object({
  DynamicValue: DynamicDefaultValueStateSchema,
  StaticValues: z.array(z.number()),
}).partial();

const DecimalValueWhenUnsetConfigurationStateSchema = z.object({
  ValueWhenUnsetOption: z.string(),
  CustomValue: z.number(),
}).partial();

const DecimalParameterDeclarationStateSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterStateSchema),
  DefaultValues: DecimalDefaultValuesStateSchema,
  ParameterValueType: z.string(),
  ValueWhenUnset: DecimalValueWhenUnsetConfigurationStateSchema,
  Name: z.string(),
}).partial();

const IntegerDefaultValuesStateSchema = z.object({
  DynamicValue: DynamicDefaultValueStateSchema,
  StaticValues: z.array(z.number()),
}).partial();

const IntegerValueWhenUnsetConfigurationStateSchema = z.object({
  ValueWhenUnsetOption: z.string(),
  CustomValue: z.number(),
}).partial();

const IntegerParameterDeclarationStateSchema = z.object({
  MappedDataSetParameters: z.array(MappedDataSetParameterStateSchema),
  DefaultValues: IntegerDefaultValuesStateSchema,
  ParameterValueType: z.string(),
  ValueWhenUnset: IntegerValueWhenUnsetConfigurationStateSchema,
  Name: z.string(),
}).partial();

const ParameterDeclarationStateSchema = z.object({
  StringParameterDeclaration: StringParameterDeclarationStateSchema,
  DateTimeParameterDeclaration: DateTimeParameterDeclarationStateSchema,
  DecimalParameterDeclaration: DecimalParameterDeclarationStateSchema,
  IntegerParameterDeclaration: IntegerParameterDeclarationStateSchema,
}).partial();

const EntityStateSchema = z.object({
  Path: z.string(),
}).partial();

const AnalysisErrorStateSchema = z.object({
  Type: z.string(),
  Message: z.string(),
  ViolatedEntities: z.array(EntityStateSchema),
}).partial();

const ResourcePermissionStateSchema = z.object({
  Actions: z.array(z.string()),
  Principal: z.string(),
}).partial();

const TagStateSchema = z.object({
  Value: z.string(),
  Key: z.string(),
}).partial();

const SheetStateSchema = z.object({
  SheetId: z.string(),
  Name: z.string(),
}).partial();

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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  Status: z.enum([
    "CREATION_IN_PROGRESS",
    "CREATION_SUCCESSFUL",
    "CREATION_FAILED",
    "UPDATE_IN_PROGRESS",
    "UPDATE_SUCCESSFUL",
    "UPDATE_FAILED",
    "PENDING_UPDATE",
    "DELETED",
  ]).optional(),
  Parameters: z.object({
    StringParameters: z.array(StringParameterSchema).describe(
      "The parameters that have a data type of string.",
    ).optional(),
    DecimalParameters: z.array(DecimalParameterSchema).describe(
      "The parameters that have a data type of decimal.",
    ).optional(),
    IntegerParameters: z.array(IntegerParameterSchema).describe(
      "The parameters that have a data type of integer.",
    ).optional(),
    DateTimeParameters: z.array(DateTimeParameterSchema).describe(
      "The parameters that have a data type of date-time.",
    ).optional(),
  }).describe("A list of Quick parameters and the list's override values.")
    .optional(),
  SourceEntity: z.object({
    SourceTemplate: AnalysisSourceTemplateSchema.describe(
      "The source template of an analysis.",
    ).optional(),
  }).describe("The source entity of an analysis.").optional(),
  ThemeArn: z.string().describe("The ARN of the theme of the analysis.")
    .optional(),
  Definition: z.object({
    Options: AssetOptionsSchema.optional(),
    FilterGroups: z.array(FilterGroupSchema).optional(),
    QueryExecutionOptions: QueryExecutionOptionsSchema.optional(),
    StaticFiles: z.array(StaticFileSchema).describe(
      "The static files for the definition.",
    ).optional(),
    TopicIdentifierDeclarations: z.array(TopicIdentifierDeclarationSchema)
      .optional(),
    CalculatedFields: z.array(CalculatedFieldSchema).optional(),
    DataSetIdentifierDeclarations: z.array(DataSetIdentifierDeclarationSchema),
    ColumnConfigurations: z.array(ColumnConfigurationSchema).optional(),
    AnalysisDefaults: AnalysisDefaultsSchema.optional(),
    Sheets: z.array(SheetDefinitionSchema).optional(),
    ParameterDeclarations: z.array(ParameterDeclarationSchema).optional(),
  }).optional(),
  ValidationStrategy: z.object({
    Mode: z.enum(["STRICT", "LENIENT"]),
  }).describe(
    "The option to relax the validation that is required to create and update analyses, dashboards, and templates with definition objects. When you set this value to LENIENT, validation is skipped for specific errors.",
  ).optional(),
  FolderArns: z.array(z.string()).optional(),
  Name: z.string().min(1).max(2048).describe(
    "The descriptive name of the analysis.",
  ).optional(),
  Errors: z.array(AnalysisErrorSchema).describe(
    "Errors associated with the analysis.",
  ).optional(),
  AnalysisId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$"))
    .optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  Sheets: z.array(SheetSchema).describe(
    "A list of the associated sheets with the unique identifier and name of each sheet.",
  ).optional(),
});

const StateSchema = z.object({
  Status: z.string().optional(),
  CreatedTime: z.string().optional(),
  Parameters: z.object({
    StringParameters: z.array(StringParameterStateSchema),
    DecimalParameters: z.array(DecimalParameterStateSchema),
    IntegerParameters: z.array(IntegerParameterStateSchema),
    DateTimeParameters: z.array(DateTimeParameterStateSchema),
  }).partial().optional(),
  DataSetArns: z.array(z.string()).optional(),
  SourceEntity: z.object({
    SourceTemplate: AnalysisSourceTemplateStateSchema,
  }).partial().optional(),
  ThemeArn: z.string().optional(),
  Definition: z.object({
    Options: AssetOptionsStateSchema,
    FilterGroups: z.array(FilterGroupStateSchema),
    QueryExecutionOptions: QueryExecutionOptionsStateSchema,
    StaticFiles: z.array(StaticFileStateSchema),
    TopicIdentifierDeclarations: z.array(TopicIdentifierDeclarationStateSchema),
    CalculatedFields: z.array(CalculatedFieldStateSchema),
    DataSetIdentifierDeclarations: z.array(
      DataSetIdentifierDeclarationStateSchema,
    ),
    ColumnConfigurations: z.array(ColumnConfigurationStateSchema),
    AnalysisDefaults: AnalysisDefaultsStateSchema,
    Sheets: z.array(SheetDefinitionStateSchema),
    ParameterDeclarations: z.array(ParameterDeclarationStateSchema),
  }).partial().optional(),
  LastUpdatedTime: z.string().optional(),
  ValidationStrategy: z.object({
    Mode: z.string(),
  }).partial().optional(),
  FolderArns: z.array(z.string()).optional(),
  Name: z.string().optional(),
  Errors: z.array(AnalysisErrorStateSchema).optional(),
  AnalysisId: z.string(),
  AwsAccountId: z.string(),
  Permissions: z.array(ResourcePermissionStateSchema).optional(),
  Arn: z.string().optional(),
  Tags: z.array(TagStateSchema).optional(),
  Sheets: z.array(SheetStateSchema).optional(),
}).passthrough();

type StateData = Record<string, unknown>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Status: z.enum([
    "CREATION_IN_PROGRESS",
    "CREATION_SUCCESSFUL",
    "CREATION_FAILED",
    "UPDATE_IN_PROGRESS",
    "UPDATE_SUCCESSFUL",
    "UPDATE_FAILED",
    "PENDING_UPDATE",
    "DELETED",
  ]).optional(),
  Parameters: z.object({
    StringParameters: z.array(StringParameterSchema).describe(
      "The parameters that have a data type of string.",
    ).optional(),
    DecimalParameters: z.array(DecimalParameterSchema).describe(
      "The parameters that have a data type of decimal.",
    ).optional(),
    IntegerParameters: z.array(IntegerParameterSchema).describe(
      "The parameters that have a data type of integer.",
    ).optional(),
    DateTimeParameters: z.array(DateTimeParameterSchema).describe(
      "The parameters that have a data type of date-time.",
    ).optional(),
  }).describe("A list of Quick parameters and the list's override values.")
    .optional(),
  SourceEntity: z.object({
    SourceTemplate: AnalysisSourceTemplateSchema.describe(
      "The source template of an analysis.",
    ).optional(),
  }).describe("The source entity of an analysis.").optional(),
  ThemeArn: z.string().describe("The ARN of the theme of the analysis.")
    .optional(),
  Definition: z.object({
    Options: AssetOptionsSchema.optional(),
    FilterGroups: z.array(FilterGroupSchema).optional(),
    QueryExecutionOptions: QueryExecutionOptionsSchema.optional(),
    StaticFiles: z.array(StaticFileSchema).describe(
      "The static files for the definition.",
    ).optional(),
    TopicIdentifierDeclarations: z.array(TopicIdentifierDeclarationSchema)
      .optional(),
    CalculatedFields: z.array(CalculatedFieldSchema).optional(),
    DataSetIdentifierDeclarations: z.array(DataSetIdentifierDeclarationSchema)
      .optional(),
    ColumnConfigurations: z.array(ColumnConfigurationSchema).optional(),
    AnalysisDefaults: AnalysisDefaultsSchema.optional(),
    Sheets: z.array(SheetDefinitionSchema).optional(),
    ParameterDeclarations: z.array(ParameterDeclarationSchema).optional(),
  }).optional(),
  ValidationStrategy: z.object({
    Mode: z.enum(["STRICT", "LENIENT"]).optional(),
  }).describe(
    "The option to relax the validation that is required to create and update analyses, dashboards, and templates with definition objects. When you set this value to LENIENT, validation is skipped for specific errors.",
  ).optional(),
  FolderArns: z.array(z.string()).optional(),
  Name: z.string().min(1).max(2048).describe(
    "The descriptive name of the analysis.",
  ).optional(),
  Errors: z.array(AnalysisErrorSchema).describe(
    "Errors associated with the analysis.",
  ).optional(),
  AnalysisId: z.string().min(1).max(512).regex(new RegExp("^[\\w\\-]+$"))
    .optional(),
  AwsAccountId: z.string().min(12).max(12).regex(new RegExp("^[0-9]{12}$"))
    .optional(),
  Permissions: z.array(ResourcePermissionSchema).optional(),
  Tags: z.array(TagSchema).optional(),
  Sheets: z.array(SheetSchema).describe(
    "A list of the associated sheets with the unique identifier and name of each sheet.",
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

/** Swamp extension model for QuickSight Analysis. Registered at `@swamp/aws/quicksight/analysis`. */
export const model = {
  type: "@swamp/aws/quicksight/analysis",
  version: "2026.11.10.1",
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
      toVersion: "2026.05.27.1",
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
    {
      toVersion: "2026.06.15.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.08.17.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.09.24.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.04.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.13.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.23.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.10.25.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.10.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "QuickSight Analysis resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a QuickSight Analysis",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["AnalysisId", "AwsAccountId", "Name"].filter((k) =>
          g[k] === undefined
        );
        if (missing.length > 0) {
          throw new Error(
            "create requires global arguments: " + missing.join(", "),
          );
        }
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::QuickSight::Analysis",
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
      description: "Get a QuickSight Analysis",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight Analysis",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::QuickSight::Analysis",
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
      description: "Update a QuickSight Analysis",
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
          existing.AnalysisId?.toString(),
          existing.AwsAccountId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::QuickSight::Analysis",
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
          "AWS::QuickSight::Analysis",
          identifier,
          currentState,
          desiredState,
          ["AnalysisId", "AwsAccountId"],
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
      description: "Delete a QuickSight Analysis",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the QuickSight Analysis",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::QuickSight::Analysis",
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
      description: "Sync QuickSight Analysis state from AWS",
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
          existing.AnalysisId?.toString(),
          existing.AwsAccountId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::QuickSight::Analysis",
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
    list: {
      description: "List QuickSight Analysis resources",
      arguments: z.object({
        maxPages: z.number().describe(
          "Maximum number of pages to fetch (default: 10)",
        ).optional(),
        resourceModel: z.string().describe(
          "JSON resource model for parent-scoped listing (e.g. parent identifier)",
        ).optional(),
      }),
      execute: async (
        args: { maxPages?: number; resourceModel?: string },
        context: any,
      ) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { items, nextToken } = await listResources(
          "AWS::QuickSight::Analysis",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName = item.identifier.replace(/[\/\\]/g, "_").replace(
            /\.\./g,
            "_",
          ).replace(/\0/g, "");
          const handle = await context.writeResource("state", instanceName, {
            ...item.properties,
            _identifier: item.identifier,
          });
          dataHandles.push(handle);
        }
        return {
          dataHandles,
          result: { count: items.length, nextPageToken: nextToken },
        };
      },
    },
  },
};
