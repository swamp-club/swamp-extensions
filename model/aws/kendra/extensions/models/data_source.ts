// Auto-generated extension model for @swamp/aws/kendra/data-source
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Kendra DataSource (AWS::Kendra::DataSource).
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

const DocumentsMetadataConfigurationSchema = z.object({
  S3Prefix: z.string().min(1).max(1024).optional(),
});

const AccessControlListConfigurationSchema = z.object({
  KeyPath: z.string().min(1).max(1024).optional(),
});

const S3DataSourceConfigurationSchema = z.object({
  BucketName: z.string().min(3).max(63).regex(
    new RegExp("[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]"),
  ),
  InclusionPrefixes: z.array(z.string().min(1).max(50)).optional(),
  InclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  ExclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  DocumentsMetadataConfiguration: DocumentsMetadataConfigurationSchema
    .optional(),
  AccessControlListConfiguration: AccessControlListConfigurationSchema
    .optional(),
});

const DataSourceVpcConfigurationSchema = z.object({
  SubnetIds: z.array(
    z.string().min(1).max(200).regex(new RegExp("[\\-0-9a-zA-Z]+")),
  ),
  SecurityGroupIds: z.array(
    z.string().min(1).max(200).regex(new RegExp("[\\-0-9a-zA-Z]+")),
  ),
});

const DataSourceToIndexFieldMappingSchema = z.object({
  DataSourceFieldName: z.string().min(1).max(100),
  DateFieldFormat: z.string().min(4).max(40).optional(),
  IndexFieldName: z.string().min(1).max(30),
});

const S3PathSchema = z.object({
  Bucket: z.string().min(3).max(63).regex(
    new RegExp("[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]"),
  ),
  Key: z.string().min(1).max(1024),
});

const SharePointConfigurationSchema = z.object({
  SharePointVersion: z.enum([
    "SHAREPOINT_ONLINE",
    "SHAREPOINT_2013",
    "SHAREPOINT_2016",
  ]),
  Urls: z.array(
    z.string().min(1).max(2048).regex(
      new RegExp("^(https?|ftp|file)://([^\\s]*)"),
    ),
  ),
  SecretArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ),
  CrawlAttachments: z.boolean().optional(),
  UseChangeLog: z.boolean().optional(),
  InclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  ExclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  VpcConfiguration: DataSourceVpcConfigurationSchema.optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
  DocumentTitleFieldName: z.string().min(1).max(100).optional(),
  DisableLocalGroups: z.boolean().optional(),
  SslCertificateS3Path: S3PathSchema.optional(),
});

const SalesforceStandardObjectConfigurationSchema = z.object({
  Name: z.enum([
    "ACCOUNT",
    "CAMPAIGN",
    "CASE",
    "CONTACT",
    "CONTRACT",
    "DOCUMENT",
    "GROUP",
    "IDEA",
    "LEAD",
    "OPPORTUNITY",
    "PARTNER",
    "PRICEBOOK",
    "PRODUCT",
    "PROFILE",
    "SOLUTION",
    "TASK",
    "USER",
  ]),
  DocumentDataFieldName: z.string().min(1).max(100),
  DocumentTitleFieldName: z.string().min(1).max(100).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
});

const SalesforceStandardKnowledgeArticleTypeConfigurationSchema = z.object({
  DocumentDataFieldName: z.string().min(1).max(100),
  DocumentTitleFieldName: z.string().min(1).max(100).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
});

const SalesforceCustomKnowledgeArticleTypeConfigurationSchema = z.object({
  Name: z.string().min(1).max(100),
  DocumentDataFieldName: z.string().min(1).max(100),
  DocumentTitleFieldName: z.string().min(1).max(100).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
});

const SalesforceKnowledgeArticleConfigurationSchema = z.object({
  IncludedStates: z.array(z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"])),
  StandardKnowledgeArticleTypeConfiguration:
    SalesforceStandardKnowledgeArticleTypeConfigurationSchema.optional(),
  CustomKnowledgeArticleTypeConfigurations: z.array(
    SalesforceCustomKnowledgeArticleTypeConfigurationSchema,
  ).optional(),
});

const SalesforceChatterFeedConfigurationSchema = z.object({
  DocumentDataFieldName: z.string().min(1).max(100),
  DocumentTitleFieldName: z.string().min(1).max(100).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
  IncludeFilterTypes: z.array(z.enum(["ACTIVE_USER", "STANDARD_USER"]))
    .optional(),
});

const SalesforceStandardObjectAttachmentConfigurationSchema = z.object({
  DocumentTitleFieldName: z.string().min(1).max(100).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
});

const SalesforceConfigurationSchema = z.object({
  ServerUrl: z.string().min(1).max(2048).regex(
    new RegExp("^(https?|ftp|file)://([^\\s]*)"),
  ),
  SecretArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ),
  StandardObjectConfigurations: z.array(
    SalesforceStandardObjectConfigurationSchema,
  ).optional(),
  KnowledgeArticleConfiguration: SalesforceKnowledgeArticleConfigurationSchema
    .optional(),
  ChatterFeedConfiguration: SalesforceChatterFeedConfigurationSchema.optional(),
  CrawlAttachments: z.boolean().optional(),
  StandardObjectAttachmentConfiguration:
    SalesforceStandardObjectAttachmentConfigurationSchema.optional(),
  IncludeAttachmentFilePatterns: z.array(z.string().min(1).max(50)).optional(),
  ExcludeAttachmentFilePatterns: z.array(z.string().min(1).max(50)).optional(),
});

const OneDriveUsersSchema = z.object({
  OneDriveUserList: z.array(
    z.string().min(1).max(256).regex(
      new RegExp("^(?!\\s).+@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$"),
    ),
  ).optional(),
  OneDriveUserS3Path: S3PathSchema.optional(),
});

const OneDriveConfigurationSchema = z.object({
  TenantDomain: z.string().min(1).max(256).regex(
    new RegExp("^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\\.)+[a-z]{2,}$"),
  ),
  SecretArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ),
  OneDriveUsers: OneDriveUsersSchema,
  InclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  ExclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
  DisableLocalGroups: z.boolean().optional(),
});

const ServiceNowKnowledgeArticleConfigurationSchema = z.object({
  CrawlAttachments: z.boolean().optional(),
  IncludeAttachmentFilePatterns: z.array(z.string().min(1).max(50)).optional(),
  ExcludeAttachmentFilePatterns: z.array(z.string().min(1).max(50)).optional(),
  DocumentDataFieldName: z.string().min(1).max(100),
  DocumentTitleFieldName: z.string().min(1).max(100).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
  FilterQuery: z.string().min(1).max(2048).optional(),
});

const ServiceNowServiceCatalogConfigurationSchema = z.object({
  CrawlAttachments: z.boolean().optional(),
  IncludeAttachmentFilePatterns: z.array(z.string().min(1).max(50)).optional(),
  ExcludeAttachmentFilePatterns: z.array(z.string().min(1).max(50)).optional(),
  DocumentDataFieldName: z.string().min(1).max(100),
  DocumentTitleFieldName: z.string().min(1).max(100).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
});

const ServiceNowConfigurationSchema = z.object({
  HostUrl: z.string().min(1).max(2048).regex(
    new RegExp(
      "^(?!(^(https?|ftp|file):\\/\\/))[a-z0-9-]+(\\.service-now\\.com)$",
    ),
  ),
  SecretArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ),
  ServiceNowBuildVersion: z.enum(["LONDON", "OTHERS"]),
  AuthenticationType: z.enum(["HTTP_BASIC", "OAUTH2"]).optional(),
  KnowledgeArticleConfiguration: ServiceNowKnowledgeArticleConfigurationSchema
    .optional(),
  ServiceCatalogConfiguration: ServiceNowServiceCatalogConfigurationSchema
    .optional(),
});

const ConnectionConfigurationSchema = z.object({
  DatabaseHost: z.string().min(1).max(253),
  DatabasePort: z.number().int().min(1).max(65535),
  DatabaseName: z.string().min(1).max(100),
  TableName: z.string().min(1).max(100),
  SecretArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ),
});

const ColumnConfigurationSchema = z.object({
  DocumentIdColumnName: z.string().min(1).max(100),
  DocumentDataColumnName: z.string().min(1).max(100),
  DocumentTitleColumnName: z.string().min(1).max(100).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
  ChangeDetectingColumns: z.array(z.string().min(1).max(100)),
});

const AclConfigurationSchema = z.object({
  AllowedGroupsColumnName: z.string().min(1).max(100),
});

const SqlConfigurationSchema = z.object({
  QueryIdentifiersEnclosingOption: z.enum(["DOUBLE_QUOTES", "NONE"]).optional(),
});

const DatabaseConfigurationSchema = z.object({
  DatabaseEngineType: z.enum([
    "RDS_AURORA_MYSQL",
    "RDS_AURORA_POSTGRESQL",
    "RDS_MYSQL",
    "RDS_POSTGRESQL",
  ]),
  ConnectionConfiguration: ConnectionConfigurationSchema,
  VpcConfiguration: DataSourceVpcConfigurationSchema.optional(),
  ColumnConfiguration: ColumnConfigurationSchema,
  AclConfiguration: AclConfigurationSchema.optional(),
  SqlConfiguration: SqlConfigurationSchema.optional(),
});

const ConfluenceSpaceToIndexFieldMappingSchema = z.object({
  DataSourceFieldName: z.enum(["DISPLAY_URL", "ITEM_TYPE", "SPACE_KEY", "URL"]),
  DateFieldFormat: z.string().min(4).max(40).optional(),
  IndexFieldName: z.string().min(1).max(30),
});

const ConfluenceSpaceConfigurationSchema = z.object({
  CrawlPersonalSpaces: z.boolean().optional(),
  CrawlArchivedSpaces: z.boolean().optional(),
  IncludeSpaces: z.array(z.string().min(1).max(255)).optional(),
  ExcludeSpaces: z.array(z.string().min(1).max(255)).optional(),
  SpaceFieldMappings: z.array(ConfluenceSpaceToIndexFieldMappingSchema)
    .optional(),
});

const ConfluencePageToIndexFieldMappingSchema = z.object({
  DataSourceFieldName: z.enum([
    "AUTHOR",
    "CONTENT_STATUS",
    "CREATED_DATE",
    "DISPLAY_URL",
    "ITEM_TYPE",
    "LABELS",
    "MODIFIED_DATE",
    "PARENT_ID",
    "SPACE_KEY",
    "SPACE_NAME",
    "URL",
    "VERSION",
  ]),
  DateFieldFormat: z.string().min(4).max(40).optional(),
  IndexFieldName: z.string().min(1).max(30),
});

const ConfluencePageConfigurationSchema = z.object({
  PageFieldMappings: z.array(ConfluencePageToIndexFieldMappingSchema)
    .optional(),
});

const ConfluenceBlogToIndexFieldMappingSchema = z.object({
  DataSourceFieldName: z.enum([
    "AUTHOR",
    "DISPLAY_URL",
    "ITEM_TYPE",
    "LABELS",
    "PUBLISH_DATE",
    "SPACE_KEY",
    "SPACE_NAME",
    "URL",
    "VERSION",
  ]),
  DateFieldFormat: z.string().min(4).max(40).optional(),
  IndexFieldName: z.string().min(1).max(30),
});

const ConfluenceBlogConfigurationSchema = z.object({
  BlogFieldMappings: z.array(ConfluenceBlogToIndexFieldMappingSchema)
    .optional(),
});

const ConfluenceAttachmentToIndexFieldMappingSchema = z.object({
  DataSourceFieldName: z.enum([
    "AUTHOR",
    "CONTENT_TYPE",
    "CREATED_DATE",
    "DISPLAY_URL",
    "FILE_SIZE",
    "ITEM_TYPE",
    "PARENT_ID",
    "SPACE_KEY",
    "SPACE_NAME",
    "URL",
    "VERSION",
  ]),
  DateFieldFormat: z.string().min(4).max(40).optional(),
  IndexFieldName: z.string().min(1).max(30),
});

const ConfluenceAttachmentConfigurationSchema = z.object({
  CrawlAttachments: z.boolean().optional(),
  AttachmentFieldMappings: z.array(
    ConfluenceAttachmentToIndexFieldMappingSchema,
  ).optional(),
});

const ConfluenceConfigurationSchema = z.object({
  ServerUrl: z.string().min(1).max(2048).regex(
    new RegExp("^(https?|ftp|file)://([^\\s]*)"),
  ),
  SecretArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ),
  Version: z.enum(["CLOUD", "SERVER"]),
  SpaceConfiguration: ConfluenceSpaceConfigurationSchema.optional(),
  PageConfiguration: ConfluencePageConfigurationSchema.optional(),
  BlogConfiguration: ConfluenceBlogConfigurationSchema.optional(),
  AttachmentConfiguration: ConfluenceAttachmentConfigurationSchema.optional(),
  VpcConfiguration: DataSourceVpcConfigurationSchema.optional(),
  InclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  ExclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
});

const GoogleDriveConfigurationSchema = z.object({
  SecretArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ),
  InclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  ExclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
  ExcludeMimeTypes: z.array(z.string().min(1).max(256)).optional(),
  ExcludeUserAccounts: z.array(z.string().min(1).max(256)).optional(),
  ExcludeSharedDrives: z.array(z.string().min(1).max(256)).optional(),
});

const WebCrawlerSeedUrlConfigurationSchema = z.object({
  SeedUrls: z.array(
    z.string().min(1).max(2048).regex(new RegExp("^(https?)://([^\\s]*)")),
  ),
  WebCrawlerMode: z.enum(["HOST_ONLY", "SUBDOMAINS", "EVERYTHING"]).optional(),
});

const WebCrawlerSiteMapsConfigurationSchema = z.object({
  SiteMaps: z.array(
    z.string().min(1).max(2048).regex(new RegExp("^(https?):\\/\\/([^\\s]*)")),
  ),
});

const WebCrawlerUrlsSchema = z.object({
  SeedUrlConfiguration: WebCrawlerSeedUrlConfigurationSchema.optional(),
  SiteMapsConfiguration: WebCrawlerSiteMapsConfigurationSchema.optional(),
});

const ProxyConfigurationSchema = z.object({
  Host: z.string().min(1).max(253).regex(new RegExp("([^\\s]*)")),
  Port: z.number().int().min(1).max(65535),
  Credentials: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ).optional(),
});

const WebCrawlerBasicAuthenticationSchema = z.object({
  Host: z.string().min(1).max(253).regex(new RegExp("([^\\s]*)")),
  Port: z.number().int().min(1).max(65535),
  Credentials: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ),
});

const WebCrawlerAuthenticationConfigurationSchema = z.object({
  BasicAuthentication: z.array(WebCrawlerBasicAuthenticationSchema).optional(),
});

const WebCrawlerConfigurationSchema = z.object({
  Urls: WebCrawlerUrlsSchema,
  CrawlDepth: z.number().int().min(1).max(10).optional(),
  MaxLinksPerPage: z.number().int().min(1).max(1000).optional(),
  MaxContentSizePerPageInMegaBytes: z.number().min(0).max(50).optional(),
  MaxUrlsPerMinuteCrawlRate: z.number().int().min(1).max(300).optional(),
  UrlInclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  UrlExclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  ProxyConfiguration: ProxyConfigurationSchema.optional(),
  AuthenticationConfiguration: WebCrawlerAuthenticationConfigurationSchema
    .optional(),
});

const WorkDocsConfigurationSchema = z.object({
  OrganizationId: z.string().min(12).max(12).regex(
    new RegExp("d-[0-9a-fA-F]{10}"),
  ),
  CrawlComments: z.boolean().optional(),
  UseChangeLog: z.boolean().optional(),
  InclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  ExclusionPatterns: z.array(z.string().min(1).max(50)).optional(),
  FieldMappings: z.array(DataSourceToIndexFieldMappingSchema).optional(),
});

const TemplateConfigurationSchema = z.object({
  Template: z.record(z.string(), z.unknown()),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "A string used to identify this tag",
  ),
  Value: z.string().min(0).max(256).describe(
    "A string containing the value for the tag",
  ),
});

const DocumentAttributeValueSchema = z.object({
  StringValue: z.string().min(1).max(2048).optional(),
  StringListValue: z.array(z.string()).optional(),
  LongValue: z.number().int().optional(),
  DateValue: z.string().optional(),
});

const DocumentAttributeConditionSchema = z.object({
  ConditionDocumentAttributeKey: z.string().min(1).max(200).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z0-9_-]*"),
  ),
  Operator: z.enum([
    "GreaterThan",
    "GreaterThanOrEquals",
    "LessThan",
    "LessThanOrEquals",
    "Equals",
    "NotEquals",
    "Contains",
    "NotContains",
    "Exists",
    "NotExists",
    "BeginsWith",
  ]),
  ConditionOnValue: DocumentAttributeValueSchema.optional(),
});

const DocumentAttributeTargetSchema = z.object({
  TargetDocumentAttributeKey: z.string().min(1).max(200).regex(
    new RegExp("[a-zA-Z0-9_][a-zA-Z0-9_-]*"),
  ),
  TargetDocumentAttributeValueDeletion: z.boolean().optional(),
  TargetDocumentAttributeValue: DocumentAttributeValueSchema.optional(),
});

const InlineCustomDocumentEnrichmentConfigurationSchema = z.object({
  Condition: DocumentAttributeConditionSchema.optional(),
  Target: DocumentAttributeTargetSchema.optional(),
  DocumentContentDeletion: z.boolean().optional(),
});

const HookConfigurationSchema = z.object({
  InvocationCondition: DocumentAttributeConditionSchema.optional(),
  LambdaArn: z.string().min(1).max(2048),
  S3Bucket: z.string().min(3).max(63).regex(
    new RegExp("[a-z0-9][\\.\\-a-z0-9]{1,61}[a-z0-9]"),
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
  Name: z.string().min(1).max(1000).describe("Name of data source"),
  IndexId: z.string().min(36).max(36).describe("ID of Index"),
  Type: z.enum([
    "S3",
    "SHAREPOINT",
    "SALESFORCE",
    "ONEDRIVE",
    "SERVICENOW",
    "DATABASE",
    "CUSTOM",
    "CONFLUENCE",
    "GOOGLEDRIVE",
    "WEBCRAWLER",
    "WORKDOCS",
    "TEMPLATE",
  ]).describe("Data source type"),
  DataSourceConfiguration: z.object({
    S3Configuration: S3DataSourceConfigurationSchema.describe(
      "S3 data source configuration",
    ).optional(),
    SharePointConfiguration: SharePointConfigurationSchema.describe(
      "SharePoint configuration",
    ).optional(),
    SalesforceConfiguration: SalesforceConfigurationSchema.optional(),
    OneDriveConfiguration: OneDriveConfigurationSchema.optional(),
    ServiceNowConfiguration: ServiceNowConfigurationSchema.optional(),
    DatabaseConfiguration: DatabaseConfigurationSchema.optional(),
    ConfluenceConfiguration: ConfluenceConfigurationSchema.optional(),
    GoogleDriveConfiguration: GoogleDriveConfigurationSchema.optional(),
    WebCrawlerConfiguration: WebCrawlerConfigurationSchema.optional(),
    WorkDocsConfiguration: WorkDocsConfigurationSchema.optional(),
    TemplateConfiguration: TemplateConfigurationSchema.optional(),
  }).optional(),
  Description: z.string().min(1).max(1000).describe(
    "Description of data source",
  ).optional(),
  Schedule: z.string().max(1000).describe("Schedule").optional(),
  RoleArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ).describe("Role ARN").optional(),
  Tags: z.array(TagSchema).describe("Tags for labeling the data source")
    .optional(),
  CustomDocumentEnrichmentConfiguration: z.object({
    InlineConfigurations: z.array(
      InlineCustomDocumentEnrichmentConfigurationSchema,
    ).describe("List of InlineCustomDocumentEnrichmentConfigurations")
      .optional(),
    PreExtractionHookConfiguration: HookConfigurationSchema.optional(),
    PostExtractionHookConfiguration: HookConfigurationSchema.optional(),
    RoleArn: z.string().min(1).max(1284).regex(
      new RegExp(
        "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
      ),
    ).describe("Role ARN").optional(),
  }).optional(),
  LanguageCode: z.string().min(2).max(10).regex(new RegExp("[a-zA-Z-]*"))
    .describe("The code for a language.").optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Arn: z.string().optional(),
  Name: z.string().optional(),
  IndexId: z.string(),
  Type: z.string().optional(),
  DataSourceConfiguration: z.object({
    S3Configuration: S3DataSourceConfigurationSchema,
    SharePointConfiguration: SharePointConfigurationSchema,
    SalesforceConfiguration: SalesforceConfigurationSchema,
    OneDriveConfiguration: OneDriveConfigurationSchema,
    ServiceNowConfiguration: ServiceNowConfigurationSchema,
    DatabaseConfiguration: DatabaseConfigurationSchema,
    ConfluenceConfiguration: ConfluenceConfigurationSchema,
    GoogleDriveConfiguration: GoogleDriveConfigurationSchema,
    WebCrawlerConfiguration: WebCrawlerConfigurationSchema,
    WorkDocsConfiguration: WorkDocsConfigurationSchema,
    TemplateConfiguration: TemplateConfigurationSchema,
  }).optional(),
  Description: z.string().optional(),
  Schedule: z.string().optional(),
  RoleArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  CustomDocumentEnrichmentConfiguration: z.object({
    InlineConfigurations: z.array(
      InlineCustomDocumentEnrichmentConfigurationSchema,
    ),
    PreExtractionHookConfiguration: HookConfigurationSchema,
    PostExtractionHookConfiguration: HookConfigurationSchema,
    RoleArn: z.string(),
  }).optional(),
  LanguageCode: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Name: z.string().min(1).max(1000).describe("Name of data source").optional(),
  IndexId: z.string().min(36).max(36).describe("ID of Index").optional(),
  Type: z.enum([
    "S3",
    "SHAREPOINT",
    "SALESFORCE",
    "ONEDRIVE",
    "SERVICENOW",
    "DATABASE",
    "CUSTOM",
    "CONFLUENCE",
    "GOOGLEDRIVE",
    "WEBCRAWLER",
    "WORKDOCS",
    "TEMPLATE",
  ]).describe("Data source type").optional(),
  DataSourceConfiguration: z.object({
    S3Configuration: S3DataSourceConfigurationSchema.describe(
      "S3 data source configuration",
    ).optional(),
    SharePointConfiguration: SharePointConfigurationSchema.describe(
      "SharePoint configuration",
    ).optional(),
    SalesforceConfiguration: SalesforceConfigurationSchema.optional(),
    OneDriveConfiguration: OneDriveConfigurationSchema.optional(),
    ServiceNowConfiguration: ServiceNowConfigurationSchema.optional(),
    DatabaseConfiguration: DatabaseConfigurationSchema.optional(),
    ConfluenceConfiguration: ConfluenceConfigurationSchema.optional(),
    GoogleDriveConfiguration: GoogleDriveConfigurationSchema.optional(),
    WebCrawlerConfiguration: WebCrawlerConfigurationSchema.optional(),
    WorkDocsConfiguration: WorkDocsConfigurationSchema.optional(),
    TemplateConfiguration: TemplateConfigurationSchema.optional(),
  }).optional(),
  Description: z.string().min(1).max(1000).describe(
    "Description of data source",
  ).optional(),
  Schedule: z.string().max(1000).describe("Schedule").optional(),
  RoleArn: z.string().min(1).max(1284).regex(
    new RegExp(
      "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
    ),
  ).describe("Role ARN").optional(),
  Tags: z.array(TagSchema).describe("Tags for labeling the data source")
    .optional(),
  CustomDocumentEnrichmentConfiguration: z.object({
    InlineConfigurations: z.array(
      InlineCustomDocumentEnrichmentConfigurationSchema,
    ).describe("List of InlineCustomDocumentEnrichmentConfigurations")
      .optional(),
    PreExtractionHookConfiguration: HookConfigurationSchema.optional(),
    PostExtractionHookConfiguration: HookConfigurationSchema.optional(),
    RoleArn: z.string().min(1).max(1284).regex(
      new RegExp(
        "arn:[a-z0-9-\\.]{1,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[a-z0-9-\\.]{0,63}:[^/].{0,1023}",
      ),
    ).describe("Role ARN").optional(),
  }).optional(),
  LanguageCode: z.string().min(2).max(10).regex(new RegExp("[a-zA-Z-]*"))
    .describe("The code for a language.").optional(),
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

/** Swamp extension model for Kendra DataSource. Registered at `@swamp/aws/kendra/data-source`. */
export const model = {
  type: "@swamp/aws/kendra/data-source",
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
      description: "Kendra DataSource resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Kendra DataSource",
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
          "AWS::Kendra::DataSource",
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
      description: "Get a Kendra DataSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Kendra DataSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Kendra::DataSource",
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
      description: "Update a Kendra DataSource",
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
        const idParts = [existing.Id?.toString(), existing.IndexId?.toString()];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::Kendra::DataSource",
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
          "AWS::Kendra::DataSource",
          identifier,
          currentState,
          desiredState,
          ["Type", "IndexId"],
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
      description: "Delete a Kendra DataSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Kendra DataSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Kendra::DataSource",
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
      description: "Sync Kendra DataSource state from AWS",
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
        const idParts = [existing.Id?.toString(), existing.IndexId?.toString()];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::Kendra::DataSource",
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
