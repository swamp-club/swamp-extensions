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

// Auto-generated extension model for @swamp/aws/datazone/data-source
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for DataZone DataSource (AWS::DataZone::DataSource).
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

const FormInputSchema = z.object({
  FormName: z.string().min(1).max(128).regex(
    new RegExp("^(?![0-9_])\\w+$|^_\\w*[a-zA-Z0-9]\\w*$"),
  ).describe("The name of the metadata form."),
  TypeIdentifier: z.string().min(1).max(385).regex(
    new RegExp("^(?!\\.)[\\w\\.]*\\w$"),
  ).describe("The ID of the metadata form type.").optional(),
  TypeRevision: z.string().min(1).max(64).describe(
    "The revision of the metadata form type.",
  ).optional(),
  Content: z.string().max(75000).describe("The content of the metadata form.")
    .optional(),
});

const FilterExpressionSchema = z.object({
  Type: z.enum(["INCLUDE", "EXCLUDE"]).describe(
    "The search filter expression type.",
  ),
  Expression: z.string().min(1).max(2048),
});

const RelationalFilterConfigurationSchema = z.object({
  DatabaseName: z.string().min(1).max(128).describe(
    "The database name specified in the relational filter configuration for the data source.",
  ),
  SchemaName: z.string().min(1).max(128).describe(
    "The schema name specified in the relational filter configuration for the data source.",
  ).optional(),
  FilterExpressions: z.array(FilterExpressionSchema).describe(
    "The filter expressions specified in the relational filter configuration for the data source.",
  ).optional(),
});

const GlueRunConfigurationInputSchema = z.object({
  AutoImportDataQualityResult: z.boolean().describe(
    "Specifies whether to automatically import data quality metrics as part of the data source run.",
  ).optional(),
  CatalogName: z.string().min(1).max(128).describe(
    "The catalog name in the AWS Glue run configuration.",
  ).optional(),
  DataAccessRole: z.string().regex(
    new RegExp(
      "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
    ),
  ).describe(
    "The data access role included in the configuration details of the AWS Glue data source.",
  ).optional(),
  RelationalFilterConfigurations: z.array(RelationalFilterConfigurationSchema)
    .describe(
      "The relational filter configurations included in the configuration details of the AWS Glue data source.",
    ),
});

const RedshiftCredentialConfigurationSchema = z.object({
  SecretManagerArn: z.string().max(256).regex(
    new RegExp(
      "^arn:aws[^:]*:secretsmanager:[a-z]{2}-?(iso|gov)?-{1}[a-z]*-{1}[0-9]:\\d{12}:secret:.*$",
    ),
  ).describe("The ARN of a secret manager for an Amazon Redshift cluster."),
});

const RedshiftClusterStorageSchema = z.object({
  ClusterName: z.string().min(1).max(63).regex(
    new RegExp("^[0-9a-z].[a-z0-9\\-]*$"),
  ).describe("The name of an Amazon Redshift cluster."),
});

const RedshiftServerlessStorageSchema = z.object({
  WorkgroupName: z.string().min(3).max(64).regex(new RegExp("^[a-z0-9-]+$"))
    .describe("The name of the Amazon Redshift Serverless workgroup."),
});

const RedshiftRunConfigurationInputSchema = z.object({
  DataAccessRole: z.string().regex(
    new RegExp(
      "^arn:aws[^:]*:iam::\\d{12}:role(/[a-zA-Z0-9+=,.@_-]+)*/[a-zA-Z0-9+=,.@_-]+$",
    ),
  ).describe(
    "The data access role included in the configuration details of the Amazon Redshift data source.",
  ).optional(),
  RelationalFilterConfigurations: z.array(RelationalFilterConfigurationSchema)
    .describe(
      "The relational filter configurations included in the configuration details of the Amazon Redshift data source.",
    ),
  RedshiftCredentialConfiguration: RedshiftCredentialConfigurationSchema
    .describe(
      "The details of the credentials required to access an Amazon Redshift cluster.",
    ).optional(),
  RedshiftStorage: z.object({
    RedshiftClusterSource: RedshiftClusterStorageSchema.describe(
      "The name of an Amazon Redshift cluster.",
    ).optional(),
    RedshiftServerlessSource: RedshiftServerlessStorageSchema.describe(
      "The details of the Amazon Redshift Serverless workgroup storage.",
    ).optional(),
  }).describe(
    "The details of the Amazon Redshift storage as part of the configuration of an Amazon Redshift data source run.",
  ).optional(),
});

const SageMakerRunConfigurationInputSchema = z.object({
  TrackingAssets: z.record(
    z.string(),
    z.array(
      z.string().regex(
        new RegExp(
          "^arn:aws[^:]*:sagemaker:[a-z]{2}-?(iso|gov)?-{1}[a-z]*-{1}[0-9]:\\d{12}:[\\w+=,.@-]{1,128}/[\\w+=,.@-]{1,256}$",
        ),
      ),
    ),
  ).describe("The tracking assets of the Amazon SageMaker run."),
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
  AssetFormsInput: z.array(FormInputSchema).describe(
    "The metadata forms that are to be attached to the assets that this data source works with.",
  ).optional(),
  ConnectionIdentifier: z.string().describe(
    "The unique identifier of a connection used to fetch relevant parameters from connection during Datasource run",
  ).optional(),
  Description: z.string().max(2048).describe(
    "The description of the data source.",
  ).optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The ID of the Amazon DataZone domain where the data source is created.",
    ),
  EnableSetting: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies whether the data source is enabled.",
  ).optional(),
  EnvironmentIdentifier: z.string().describe(
    "The unique identifier of the Amazon DataZone environment to which the data source publishes assets.",
  ).optional(),
  Configuration: z.object({
    GlueRunConfiguration: GlueRunConfigurationInputSchema.optional(),
    RedshiftRunConfiguration: RedshiftRunConfigurationInputSchema.describe(
      "The configuration details of the Amazon Redshift data source.",
    ).optional(),
    SageMakerRunConfiguration: SageMakerRunConfigurationInputSchema.describe(
      "The configuration details of the Amazon SageMaker data source.",
    ).optional(),
  }).describe(
    "Configuration of the data source. It can be set to either glueRunConfiguration or redshiftRunConfiguration.",
  ).optional(),
  Name: z.string().min(1).max(256).describe("The name of the data source."),
  ProjectIdentifier: z.string().describe(
    "The identifier of the Amazon DataZone project in which you want to add the data source.",
  ),
  PublishOnImport: z.boolean().describe(
    "Specifies whether the assets that this data source creates in the inventory are to be also automatically published to the catalog.",
  ).optional(),
  Recommendation: z.object({
    EnableBusinessNameGeneration: z.boolean().describe(
      "Specifies whether automatic business name generation is to be enabled or not as part of the recommendation configuration.",
    ).optional(),
  }).describe(
    "Specifies whether the business name generation is to be enabled for this data source.",
  ).optional(),
  Schedule: z.object({
    Timezone: z.string().describe("The timezone of the data source run.")
      .optional(),
    Schedule: z.string().min(1).max(256).regex(
      new RegExp(
        "cron\\((\\b[0-5]?[0-9]\\b) (\\b2[0-3]\\b|\\b[0-1]?[0-9]\\b) (.*){1,5} (.*){1,5} (.*){1,5} (.*){1,5}\\)",
      ),
    ).describe("The schedule of the data source runs.").optional(),
  }).describe("The schedule of the data source runs.").optional(),
  Type: z.string().min(1).max(256).describe("The type of the data source."),
});

const StateSchema = z.object({
  AssetFormsInput: z.array(FormInputSchema).optional(),
  ConnectionId: z.string().optional(),
  ConnectionIdentifier: z.string().optional(),
  CreatedAt: z.string().optional(),
  Description: z.string().optional(),
  DomainId: z.string(),
  DomainIdentifier: z.string().optional(),
  EnableSetting: z.string().optional(),
  EnvironmentId: z.string().optional(),
  EnvironmentIdentifier: z.string().optional(),
  Id: z.string(),
  Configuration: z.object({
    GlueRunConfiguration: GlueRunConfigurationInputSchema,
    RedshiftRunConfiguration: RedshiftRunConfigurationInputSchema,
    SageMakerRunConfiguration: SageMakerRunConfigurationInputSchema,
  }).optional(),
  LastRunAssetCount: z.number().optional(),
  LastRunAt: z.string().optional(),
  LastRunStatus: z.string().optional(),
  Name: z.string().optional(),
  ProjectId: z.string().optional(),
  ProjectIdentifier: z.string().optional(),
  PublishOnImport: z.boolean().optional(),
  Recommendation: z.object({
    EnableBusinessNameGeneration: z.boolean(),
  }).optional(),
  Schedule: z.object({
    Timezone: z.string(),
    Schedule: z.string(),
  }).optional(),
  Status: z.string().optional(),
  Type: z.string().optional(),
  UpdatedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  AssetFormsInput: z.array(FormInputSchema).describe(
    "The metadata forms that are to be attached to the assets that this data source works with.",
  ).optional(),
  ConnectionIdentifier: z.string().describe(
    "The unique identifier of a connection used to fetch relevant parameters from connection during Datasource run",
  ).optional(),
  Description: z.string().max(2048).describe(
    "The description of the data source.",
  ).optional(),
  DomainIdentifier: z.string().regex(new RegExp("^dzd[-_][a-zA-Z0-9_-]{1,36}$"))
    .describe(
      "The ID of the Amazon DataZone domain where the data source is created.",
    ).optional(),
  EnableSetting: z.enum(["ENABLED", "DISABLED"]).describe(
    "Specifies whether the data source is enabled.",
  ).optional(),
  EnvironmentIdentifier: z.string().describe(
    "The unique identifier of the Amazon DataZone environment to which the data source publishes assets.",
  ).optional(),
  Configuration: z.object({
    GlueRunConfiguration: GlueRunConfigurationInputSchema.optional(),
    RedshiftRunConfiguration: RedshiftRunConfigurationInputSchema.describe(
      "The configuration details of the Amazon Redshift data source.",
    ).optional(),
    SageMakerRunConfiguration: SageMakerRunConfigurationInputSchema.describe(
      "The configuration details of the Amazon SageMaker data source.",
    ).optional(),
  }).describe(
    "Configuration of the data source. It can be set to either glueRunConfiguration or redshiftRunConfiguration.",
  ).optional(),
  Name: z.string().min(1).max(256).describe("The name of the data source.")
    .optional(),
  ProjectIdentifier: z.string().describe(
    "The identifier of the Amazon DataZone project in which you want to add the data source.",
  ).optional(),
  PublishOnImport: z.boolean().describe(
    "Specifies whether the assets that this data source creates in the inventory are to be also automatically published to the catalog.",
  ).optional(),
  Recommendation: z.object({
    EnableBusinessNameGeneration: z.boolean().describe(
      "Specifies whether automatic business name generation is to be enabled or not as part of the recommendation configuration.",
    ).optional(),
  }).describe(
    "Specifies whether the business name generation is to be enabled for this data source.",
  ).optional(),
  Schedule: z.object({
    Timezone: z.string().describe("The timezone of the data source run.")
      .optional(),
    Schedule: z.string().min(1).max(256).regex(
      new RegExp(
        "cron\\((\\b[0-5]?[0-9]\\b) (\\b2[0-3]\\b|\\b[0-1]?[0-9]\\b) (.*){1,5} (.*){1,5} (.*){1,5} (.*){1,5}\\)",
      ),
    ).describe("The schedule of the data source runs.").optional(),
  }).describe("The schedule of the data source runs.").optional(),
  Type: z.string().min(1).max(256).describe("The type of the data source.")
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

/** Swamp extension model for DataZone DataSource. Registered at `@swamp/aws/datazone/data-source`. */
export const model = {
  type: "@swamp/aws/datazone/data-source",
  version: "2026.06.15.1",
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
      description: "DataZone DataSource resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a DataZone DataSource",
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
          "AWS::DataZone::DataSource",
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
      description: "Get a DataZone DataSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone DataSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::DataZone::DataSource",
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
      description: "Update a DataZone DataSource",
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
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::DataZone::DataSource",
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
          "AWS::DataZone::DataSource",
          identifier,
          currentState,
          desiredState,
          [
            "ConnectionIdentifier",
            "EnvironmentIdentifier",
            "DomainIdentifier",
            "ProjectIdentifier",
            "Type",
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
      description: "Delete a DataZone DataSource",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the DataZone DataSource",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::DataZone::DataSource",
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
      description: "Sync DataZone DataSource state from AWS",
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
          existing.Id?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::DataZone::DataSource",
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
