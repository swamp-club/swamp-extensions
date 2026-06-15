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

// Auto-generated extension model for @swamp/aws/datazone/connection
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataZone Connection (AWS::DataZone::Connection).
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

const ConnectionConfigurationSchema = z.object({
  Classification: z.string().max(64).regex(new RegExp("^[\\w][\\w\\.\\-\\_]*$"))
    .describe("The classification of the connection configuration.").optional(),
  Properties: z.record(
    z.string(),
    z.string().min(1).max(2048).regex(
      new RegExp("^[\\u0020-\\uD7FF\\uE000-\\uFFFF\\t]*$"),
    ),
  ).describe("Property Map").optional(),
});

const AthenaPropertiesInputSchema = z.object({
  WorkgroupName: z.string().max(128).regex(new RegExp("^[a-zA-Z0-9._-]+$")),
});

const PhysicalConnectionRequirementsSchema = z.object({
  SubnetId: z.string().max(32).regex(new RegExp("^subnet-[a-z0-9]+$"))
    .optional(),
  SubnetIdList: z.array(
    z.string().max(32).regex(new RegExp("^subnet-[a-z0-9]+$")),
  ).optional(),
  SecurityGroupIdList: z.array(z.string().min(1).max(255)).optional(),
  AvailabilityZone: z.string().min(1).max(255).optional(),
});

const OAuth2ClientApplicationSchema = z.object({
  UserManagedClientApplicationClientId: z.string().max(2048).regex(
    new RegExp("^\\S+$"),
  ).optional(),
  AWSManagedClientApplicationReference: z.string().max(2048).regex(
    new RegExp("^\\S+$"),
  ).optional(),
});

const AuthorizationCodePropertiesSchema = z.object({
  AuthorizationCode: z.string().min(1).max(4096).optional(),
  RedirectUri: z.string().max(512).optional(),
});

const GlueOAuth2CredentialsSchema = z.object({
  UserManagedClientApplicationClientSecret: z.string().max(512).regex(
    new RegExp("^[\\x20-\\x7E]*$"),
  ).optional(),
  AccessToken: z.string().max(4096).regex(new RegExp("^[\\x20-\\x7E]*$"))
    .optional(),
  RefreshToken: z.string().max(4096).regex(new RegExp("^[\\x20-\\x7E]*$"))
    .optional(),
  JwtToken: z.string().max(8000).regex(
    new RegExp(
      "^([a-zA-Z0-9_=]+)\\.([a-zA-Z0-9_=]+)\\.([a-zA-Z0-9_\\-\\+\\/=]*)$",
    ),
  ).optional(),
});

const OAuth2PropertiesSchema = z.object({
  OAuth2GrantType: z.enum([
    "AUTHORIZATION_CODE",
    "CLIENT_CREDENTIALS",
    "JWT_BEARER",
  ]).describe("OAuth2 Grant Type").optional(),
  OAuth2ClientApplication: OAuth2ClientApplicationSchema.describe(
    "OAuth2 Client Application",
  ).optional(),
  TokenUrl: z.string().max(256).regex(
    new RegExp(
      "^(https?)://[-a-zA-Z0-9+&@#/%?=~_|!:,.;]*[-a-zA-Z0-9+&@#/%=~_|]$",
    ),
  ).optional(),
  TokenUrlParametersMap: z.record(z.string(), z.string().min(1).max(512))
    .describe("The token URL parameters.").optional(),
  AuthorizationCodeProperties: AuthorizationCodePropertiesSchema.describe(
    "Authorization Code Properties",
  ).optional(),
  OAuth2Credentials: GlueOAuth2CredentialsSchema.describe(
    "Glue OAuth2 Credentials",
  ).optional(),
});

const BasicAuthenticationCredentialsSchema = z.object({
  UserName: z.string().max(512).regex(new RegExp("^\\S+$")).optional(),
  Password: z.string().max(512).regex(new RegExp("^.*$")).optional(),
});

const AuthenticationConfigurationInputSchema = z.object({
  AuthenticationType: z.enum(["BASIC", "OAUTH2", "CUSTOM"]).describe(
    "Authentication Type",
  ).optional(),
  OAuth2Properties: OAuth2PropertiesSchema.describe("OAuth2 Properties")
    .optional(),
  SecretArn: z.string().regex(
    new RegExp("^arn:aws(-(cn|us-gov|iso(-[bef])?))?:secretsmanager:.*$"),
  ).optional(),
  KmsKeyArn: z.string().regex(new RegExp("^$|arn:aws[a-z0-9-]*:kms:.*$"))
    .optional(),
  BasicAuthenticationCredentials: BasicAuthenticationCredentialsSchema.describe(
    "Basic Authentication Credentials",
  ).optional(),
  CustomAuthenticationCredentials: z.record(
    z.string(),
    z.string().min(1).max(2048),
  ).describe("Credential Map").optional(),
});

const GlueConnectionInputSchema = z.object({
  ConnectionProperties: z.record(z.string(), z.string().min(1).max(2048))
    .describe("Connection Properties").optional(),
  PhysicalConnectionRequirements: PhysicalConnectionRequirementsSchema.describe(
    "Physical Connection Requirements",
  ).optional(),
  Name: z.string().min(1).max(255).regex(
    new RegExp("^[\\u0020-\\uD7FF\\uE000-\\uFFFF\\t]*$"),
  ).optional(),
  Description: z.string().max(2048).regex(
    new RegExp("^[\\u0020-\\uD7FF\\uE000-\\uFFFF\\r\\n\\t]*$"),
  ).optional(),
  ConnectionType: z.string().describe("Glue Connection Type").optional(),
  MatchCriteria: z.string().min(0).max(10).optional(),
  ValidateCredentials: z.boolean().optional(),
  ValidateForComputeEnvironments: z.array(z.string()).optional(),
  SparkProperties: z.record(
    z.string(),
    z.string().min(1).max(2048).regex(
      new RegExp("^[\\u0020-\\uD7FF\\uE000-\\uFFFF\\t]*$"),
    ),
  ).describe("Property Map").optional(),
  AthenaProperties: z.record(
    z.string(),
    z.string().min(1).max(2048).regex(
      new RegExp("^[\\u0020-\\uD7FF\\uE000-\\uFFFF\\t]*$"),
    ),
  ).describe("Property Map").optional(),
  PythonProperties: z.record(
    z.string(),
    z.string().min(1).max(2048).regex(
      new RegExp("^[\\u0020-\\uD7FF\\uE000-\\uFFFF\\t]*$"),
    ),
  ).describe("Property Map").optional(),
  AuthenticationConfiguration: AuthenticationConfigurationInputSchema.describe(
    "Authentication Configuration Input",
  ).optional(),
});

const GluePropertiesInputSchema = z.object({
  GlueConnectionInput: GlueConnectionInputSchema.describe(
    "Glue Connection Input",
  ).optional(),
});

const HyperPodPropertiesInputSchema = z.object({
  ClusterName: z.string().min(1).max(63).regex(
    new RegExp("^[a-zA-Z0-9](-*[a-zA-Z0-9])*$"),
  ),
});

const IamPropertiesInputSchema = z.object({
  GlueLineageSyncEnabled: z.boolean().optional(),
});

const UsernamePasswordSchema = z.object({
  Password: z.string().max(64).regex(new RegExp("^[\\S]*$")),
  Username: z.string().min(1).max(127).regex(new RegExp("^[\\S]*$")),
});

const LineageSyncScheduleSchema = z.object({
  Schedule: z.string().regex(
    new RegExp(
      "^cron\\((\\b[0-5]?[0-9]\\b) (\\b2[0-3]\\b|\\b[0-1]?[0-9]\\b) ([-?*,/\\dLW]){1,83} ([-*,/\\d]|[a-zA-Z]{3}){1,23} ([-?#*,/\\dL]|[a-zA-Z]{3}){1,13} ([^\\)]+)\\)$",
    ),
  ).optional(),
});

const RedshiftLineageSyncConfigurationInputSchema = z.object({
  Enabled: z.boolean().optional(),
  Schedule: LineageSyncScheduleSchema.describe("Lineage Sync Schedule")
    .optional(),
});

const RedshiftPropertiesInputSchema = z.object({
  Storage: z.object({
    ClusterName: z.string().min(0).max(63).regex(new RegExp("^[a-z0-9-]+$"))
      .optional(),
    WorkgroupName: z.string().min(3).max(64).regex(new RegExp("^[a-z0-9-]+$"))
      .optional(),
  }).optional(),
  DatabaseName: z.string().min(1).max(64).regex(new RegExp("^[a-z0-9_-]+$"))
    .optional(),
  Host: z.string().max(256).regex(new RegExp("^[\\S]*$")).optional(),
  Port: z.number().min(0).max(65535).optional(),
  Credentials: z.object({
    SecretArn: z.string().max(2048).regex(
      new RegExp(
        "^arn:aws[^:]*:secretsmanager:[a-z]{2}-?(iso|gov)?-{1}[a-z]*-{1}[0-9]:\\d{12}:secret:.*$",
      ),
    ).optional(),
    UsernamePassword: UsernamePasswordSchema.describe(
      "The username and password to be used for authentication.",
    ).optional(),
  }).optional(),
  LineageSync: RedshiftLineageSyncConfigurationInputSchema.describe(
    "Redshift Lineage Sync Configuration Input",
  ).optional(),
});

const SparkEmrPropertiesInputSchema = z.object({
  ComputeArn: z.string().max(2048).regex(
    new RegExp(
      "^arn:aws(-(cn|us-gov|iso(-[bef])?))?:(elasticmapreduce|emr-serverless|emr-containers):.*",
    ),
  ).optional(),
  InstanceProfileArn: z.string().max(2048).regex(
    new RegExp(
      "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
    ),
  ).optional(),
  JavaVirtualEnv: z.string().max(256).regex(new RegExp("^[\\S]*$")).optional(),
  LogUri: z.string().max(2048).regex(new RegExp("^s3://.+$")).optional(),
  PythonVirtualEnv: z.string().max(256).regex(new RegExp("^[\\S]*$"))
    .optional(),
  RuntimeRole: z.string().max(2048).regex(
    new RegExp(
      "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
    ),
  ).optional(),
  TrustedCertificatesS3Uri: z.string().max(2048).regex(new RegExp("^s3://.+$"))
    .optional(),
  ManagedEndpointArn: z.string().max(2048).optional(),
});

const AmazonQPropertiesInputSchema = z.object({
  IsEnabled: z.boolean().describe(
    "Specifies whether Amazon Q is enabled for the connection",
  ).optional(),
  AuthMode: z.string().min(0).max(128).describe(
    "The authentication mode of the connection's AmazonQ properties",
  ).optional(),
  ProfileArn: z.string().min(0).max(2048).regex(
    new RegExp("arn:aws[a-z\\-]*:[a-z0-9\\-]+:[a-z0-9\\-]*:[0-9]*:.*"),
  ).optional(),
});

const SparkGlueArgsSchema = z.object({
  Connection: z.string().max(128).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .optional(),
});

const SparkGluePropertiesInputSchema = z.object({
  AdditionalArgs: SparkGlueArgsSchema.describe("Spark Glue Args.").optional(),
  GlueConnectionName: z.string().min(1).max(255).regex(new RegExp("^[\\S]*$"))
    .optional(),
  GlueVersion: z.string().max(256).regex(new RegExp("^\\w+\\.\\w+$"))
    .optional(),
  IdleTimeout: z.number().min(1).max(3000).optional(),
  JavaVirtualEnv: z.string().max(256).regex(new RegExp("^[\\S]*$")).optional(),
  NumberOfWorkers: z.number().min(1).max(1000).optional(),
  PythonVirtualEnv: z.string().max(256).regex(new RegExp("^[\\S]*$"))
    .optional(),
  WorkerType: z.string().max(256).regex(new RegExp("^[G|Z].*$")).optional(),
});

const S3PropertiesInputSchema = z.object({
  S3Uri: z.string().min(0).max(2048).regex(new RegExp("s3://.+")).describe(
    "The Amazon S3 URI that's part of the Amazon S3 properties of a connection.",
  ),
  S3AccessGrantLocationId: z.string().min(0).max(64).regex(
    new RegExp("[a-zA-Z0-9\\-]+"),
  ).describe(
    "The Amazon S3 Access Grant location ID that's part of the Amazon S3 properties of a connection.",
  ).optional(),
  RegisterS3AccessGrantLocation: z.boolean().describe(
    "Specifies whether to register the S3 Access Grant location.",
  ).optional(),
});

const MlflowPropertiesInputSchema = z.object({
  TrackingServerArn: z.string().describe(
    "The ARN of the MLflow tracking server",
  ).optional(),
});

const WorkflowsMwaaPropertiesInputSchema = z.object({
  MwaaEnvironmentName: z.string().describe("The name of the MWAA environment.")
    .optional(),
});

const LakehousePropertiesInputSchema = z.object({
  GlueLineageSyncEnabled: z.boolean().describe(
    "Specifies whether Glue lineage sync is enabled for the lakehouse connection.",
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
    "AWS region; overrides AWS_REGION / AWS_DEFAULT_REGION environment variables and ~/.aws/config profile region. Defaults to us-east-1.",
  ).optional(),
  AwsLocation: z.object({
    AccessRole: z.string().max(2048).regex(
      new RegExp(
        "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
      ),
    ).optional(),
    AwsAccountId: z.string().regex(new RegExp("^\\d{12}$")).optional(),
    AwsRegion: z.string().regex(new RegExp("^[a-z]{2}-[a-z]{4,10}-\\d$"))
      .optional(),
    IamConnectionId: z.string().max(128).regex(new RegExp("^[a-zA-Z0-9]+$"))
      .optional(),
  }).describe("AWS Location of project").optional(),
  Configurations: z.array(ConnectionConfigurationSchema).describe(
    "The configurations of the connection.",
  ).optional(),
  Description: z.string().max(128).regex(new RegExp("^[\\S\\s]*$")).describe(
    "The description of the connection.",
  ).optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[_-][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The identifier of the domain in which the connection is created.",
    ),
  EnableTrustedIdentityPropagation: z.boolean().describe(
    "Specifies whether the trusted identity propagation is enabled",
  ).optional(),
  EnvironmentIdentifier: z.string().describe(
    "The identifier of the environment in which the connection is created.",
  ).optional(),
  ProjectIdentifier: z.string().describe(
    "The identifier of the project in which the connection should be created. If",
  ).optional(),
  Name: z.string().max(64).regex(new RegExp("^[\\w][\\w\\.\\-\\_]*$")).describe(
    "The name of the connection.",
  ),
  Props: z.object({
    AthenaProperties: AthenaPropertiesInputSchema.describe(
      "Athena Properties Input",
    ).optional(),
    GlueProperties: GluePropertiesInputSchema.describe("Glue Properties Input")
      .optional(),
    HyperPodProperties: HyperPodPropertiesInputSchema.describe(
      "HyperPod Properties Input",
    ).optional(),
    IamProperties: IamPropertiesInputSchema.describe("IAM Properties Input")
      .optional(),
    RedshiftProperties: RedshiftPropertiesInputSchema.describe(
      "Redshift Properties Input",
    ).optional(),
    SparkEmrProperties: SparkEmrPropertiesInputSchema.describe(
      "Spark EMR Properties Input.",
    ).optional(),
    AmazonQProperties: AmazonQPropertiesInputSchema.describe(
      "Amazon Q properties of the connection.",
    ).optional(),
    SparkGlueProperties: SparkGluePropertiesInputSchema.describe(
      "Spark Glue Properties Input.",
    ).optional(),
    S3Properties: S3PropertiesInputSchema.describe("S3 Properties Input")
      .optional(),
    MlflowProperties: MlflowPropertiesInputSchema.describe(
      "MLflow Properties Input",
    ).optional(),
    WorkflowsMwaaProperties: WorkflowsMwaaPropertiesInputSchema.describe(
      "Workflows MWAA Properties Input",
    ).optional(),
    WorkflowsServerlessProperties: z.record(z.string(), z.unknown()).describe(
      "Workflows Serverless Properties Input",
    ).optional(),
    LakehouseProperties: LakehousePropertiesInputSchema.describe(
      "Lakehouse Properties Input",
    ).optional(),
  }).optional(),
  Scope: z.enum(["DOMAIN", "PROJECT"]).describe("The scope of the connection.")
    .optional(),
});

const StateSchema = z.object({
  AwsLocation: z.object({
    AccessRole: z.string(),
    AwsAccountId: z.string(),
    AwsRegion: z.string(),
    IamConnectionId: z.string(),
  }).optional(),
  Configurations: z.array(ConnectionConfigurationSchema).optional(),
  ConnectionId: z.string(),
  Description: z.string().optional(),
  DomainId: z.string(),
  DomainIdentifier: z.string().optional(),
  DomainUnitId: z.string().optional(),
  EnableTrustedIdentityPropagation: z.boolean().optional(),
  EnvironmentId: z.string().optional(),
  EnvironmentIdentifier: z.string().optional(),
  ProjectIdentifier: z.string().optional(),
  EnvironmentUserRole: z.string().optional(),
  Name: z.string().optional(),
  ProjectId: z.string().optional(),
  Props: z.object({
    AthenaProperties: AthenaPropertiesInputSchema,
    GlueProperties: GluePropertiesInputSchema,
    HyperPodProperties: HyperPodPropertiesInputSchema,
    IamProperties: IamPropertiesInputSchema,
    RedshiftProperties: RedshiftPropertiesInputSchema,
    SparkEmrProperties: SparkEmrPropertiesInputSchema,
    AmazonQProperties: AmazonQPropertiesInputSchema,
    SparkGlueProperties: SparkGluePropertiesInputSchema,
    S3Properties: S3PropertiesInputSchema,
    MlflowProperties: MlflowPropertiesInputSchema,
    WorkflowsMwaaProperties: WorkflowsMwaaPropertiesInputSchema,
    WorkflowsServerlessProperties: z.record(z.string(), z.unknown()),
    LakehouseProperties: LakehousePropertiesInputSchema,
  }).optional(),
  Type: z.string().optional(),
  Scope: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AwsLocation: z.object({
    AccessRole: z.string().max(2048).regex(
      new RegExp(
        "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
      ),
    ).optional(),
    AwsAccountId: z.string().regex(new RegExp("^\\d{12}$")).optional(),
    AwsRegion: z.string().regex(new RegExp("^[a-z]{2}-[a-z]{4,10}-\\d$"))
      .optional(),
    IamConnectionId: z.string().max(128).regex(new RegExp("^[a-zA-Z0-9]+$"))
      .optional(),
  }).describe("AWS Location of project").optional(),
  Configurations: z.array(ConnectionConfigurationSchema).describe(
    "The configurations of the connection.",
  ).optional(),
  Description: z.string().max(128).regex(new RegExp("^[\\S\\s]*$")).describe(
    "The description of the connection.",
  ).optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[_-][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The identifier of the domain in which the connection is created.",
    ).optional(),
  EnableTrustedIdentityPropagation: z.boolean().describe(
    "Specifies whether the trusted identity propagation is enabled",
  ).optional(),
  EnvironmentIdentifier: z.string().describe(
    "The identifier of the environment in which the connection is created.",
  ).optional(),
  ProjectIdentifier: z.string().describe(
    "The identifier of the project in which the connection should be created. If",
  ).optional(),
  Name: z.string().max(64).regex(new RegExp("^[\\w][\\w\\.\\-\\_]*$")).describe(
    "The name of the connection.",
  ).optional(),
  Props: z.object({
    AthenaProperties: AthenaPropertiesInputSchema.describe(
      "Athena Properties Input",
    ).optional(),
    GlueProperties: GluePropertiesInputSchema.describe("Glue Properties Input")
      .optional(),
    HyperPodProperties: HyperPodPropertiesInputSchema.describe(
      "HyperPod Properties Input",
    ).optional(),
    IamProperties: IamPropertiesInputSchema.describe("IAM Properties Input")
      .optional(),
    RedshiftProperties: RedshiftPropertiesInputSchema.describe(
      "Redshift Properties Input",
    ).optional(),
    SparkEmrProperties: SparkEmrPropertiesInputSchema.describe(
      "Spark EMR Properties Input.",
    ).optional(),
    AmazonQProperties: AmazonQPropertiesInputSchema.describe(
      "Amazon Q properties of the connection.",
    ).optional(),
    SparkGlueProperties: SparkGluePropertiesInputSchema.describe(
      "Spark Glue Properties Input.",
    ).optional(),
    S3Properties: S3PropertiesInputSchema.describe("S3 Properties Input")
      .optional(),
    MlflowProperties: MlflowPropertiesInputSchema.describe(
      "MLflow Properties Input",
    ).optional(),
    WorkflowsMwaaProperties: WorkflowsMwaaPropertiesInputSchema.describe(
      "Workflows MWAA Properties Input",
    ).optional(),
    WorkflowsServerlessProperties: z.record(z.string(), z.unknown()).describe(
      "Workflows Serverless Properties Input",
    ).optional(),
    LakehouseProperties: LakehousePropertiesInputSchema.describe(
      "Lakehouse Properties Input",
    ).optional(),
  }).optional(),
  Scope: z.enum(["DOMAIN", "PROJECT"]).describe("The scope of the connection.")
    .optional(),
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

/** Swamp extension model for DataZone Connection. Registered at `@swamp/aws/datazone/connection`. */
export const model = {
  type: "@swamp/aws/datazone/connection",
  version: "2026.06.15.1",
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
      toVersion: "2026.05.09.1",
      description: "Added: Configurations",
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
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "DataZone Connection resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataZone Connection",
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
          "AWS::DataZone::Connection",
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
      description: "Get a DataZone Connection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone Connection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DataZone::Connection",
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
      description: "Update a DataZone Connection",
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
          existing.DomainId?.toString(),
          existing.ConnectionId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::DataZone::Connection",
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
          "AWS::DataZone::Connection",
          identifier,
          currentState,
          desiredState,
          [
            "DomainIdentifier",
            "EnableTrustedIdentityPropagation",
            "EnvironmentIdentifier",
            "ProjectIdentifier",
            "Name",
            "Scope",
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
      description: "Delete a DataZone Connection",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone Connection",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DataZone::Connection",
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
      description: "Sync DataZone Connection state from AWS",
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
          existing.DomainId?.toString(),
          existing.ConnectionId?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::DataZone::Connection",
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
