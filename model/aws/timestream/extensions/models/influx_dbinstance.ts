// Auto-generated extension model for @swamp/aws/timestream/influx-dbinstance
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Timestream InfluxDBInstance (AWS::Timestream::InfluxDBInstance).
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

const TagSchema = z.object({
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  Organization: z.string().min(1).max(64).describe(
    "The organization for the InfluxDB instance.",
  ).optional(),
  Port: z.number().int().min(1024).max(65535).describe(
    "The port number on which InfluxDB accepts connections.",
  ).optional(),
  DbInstanceType: z.enum([
    "db.influx.medium",
    "db.influx.large",
    "db.influx.xlarge",
    "db.influx.2xlarge",
    "db.influx.4xlarge",
    "db.influx.8xlarge",
    "db.influx.12xlarge",
    "db.influx.16xlarge",
    "db.influx.24xlarge",
  ]).describe("The compute instance of the InfluxDB instance.").optional(),
  VpcSubnetIds: z.array(z.string()).describe(
    "A list of EC2 subnet IDs for this InfluxDB instance.",
  ).optional(),
  DeploymentType: z.enum(["SINGLE_AZ", "WITH_MULTIAZ_STANDBY"]).describe(
    "Deployment type of the InfluxDB Instance.",
  ).optional(),
  Name: z.string().min(3).max(40).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$"),
  ).describe("The unique name that is associated with the InfluxDB instance.")
    .optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "A list of Amazon EC2 VPC security groups to associate with this InfluxDB instance.",
  ).optional(),
  NetworkType: z.enum(["IPV4", "DUAL"]).describe(
    "Network type of the InfluxDB Instance.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this DB instance.",
  ).optional(),
  Password: z.string().min(8).max(64).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .describe("The password for the InfluxDB instance.").optional(),
  DbParameterGroupIdentifier: z.string().min(3).max(64).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ).describe("The name of an existing InfluxDB parameter group.").optional(),
  AllocatedStorage: z.number().int().min(20).max(16384).describe(
    "The allocated storage for the InfluxDB instance.",
  ).optional(),
  DbStorageType: z.enum([
    "InfluxIOIncludedT1",
    "InfluxIOIncludedT2",
    "InfluxIOIncludedT3",
  ]).describe("The storage type of the InfluxDB instance.").optional(),
  LogDeliveryConfiguration: z.object({
    S3Configuration: z.object({
      BucketName: z.string().min(3).max(63).regex(
        new RegExp("^[0-9a-z]+[0-9a-z\\.\\-]*[0-9a-z]+$"),
      ).describe(
        "The bucket name for logs to be sent from the InfluxDB instance",
      ),
      Enabled: z.boolean().describe(
        "Specifies whether logging to customer specified bucket is enabled.",
      ),
    }).describe(
      "S3 configuration for sending logs to customer account from the InfluxDB instance.",
    ),
  }).describe(
    "Configuration for sending logs to customer account from the InfluxDB instance.",
  ).optional(),
  Username: z.string().min(1).max(64).describe(
    "The username for the InfluxDB instance.",
  ).optional(),
  Bucket: z.string().min(2).max(64).regex(new RegExp('^[^_][^"]*$')).describe(
    "The bucket for the InfluxDB instance.",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Attach a public IP to the customer ENI.",
  ).optional(),
  MaintenanceSchedule: z.object({
    Timezone: z.string().min(1).max(64).regex(
      new RegExp("^(UTC|[A-Za-z_]+/[A-Za-z0-9_]+(/[A-Za-z0-9_]+)?)$"),
    ).describe("The IANA timezone identifier for the maintenance schedule."),
    PreferredMaintenanceWindow: z.string().min(0).max(19).regex(
      new RegExp(
        "^$|^(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):[0-5]\\d-(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):[0-5]\\d$",
      ),
    ).describe(
      "The preferred maintenance window in format ddd:HH:MM-ddd:HH:MM.",
    ),
  }).describe("The maintenance schedule for the InfluxDB instance.").optional(),
});

const StateSchema = z.object({
  Organization: z.string().optional(),
  InfluxAuthParametersSecretArn: z.string().optional(),
  Port: z.number().optional(),
  DbInstanceType: z.string().optional(),
  VpcSubnetIds: z.array(z.string()).optional(),
  DeploymentType: z.string().optional(),
  Name: z.string().optional(),
  Endpoint: z.string().optional(),
  VpcSecurityGroupIds: z.array(z.string()).optional(),
  NetworkType: z.string().optional(),
  NextMaintenanceTime: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  Password: z.string().optional(),
  DbParameterGroupIdentifier: z.string().optional(),
  Status: z.string().optional(),
  AvailabilityZone: z.string().optional(),
  AllocatedStorage: z.number().optional(),
  DbStorageType: z.string().optional(),
  LogDeliveryConfiguration: z.object({
    S3Configuration: z.object({
      BucketName: z.string(),
      Enabled: z.boolean(),
    }),
  }).optional(),
  Username: z.string().optional(),
  Bucket: z.string().optional(),
  PubliclyAccessible: z.boolean().optional(),
  SecondaryAvailabilityZone: z.string().optional(),
  Id: z.string(),
  Arn: z.string().optional(),
  MaintenanceSchedule: z.object({
    Timezone: z.string(),
    PreferredMaintenanceWindow: z.string(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Organization: z.string().min(1).max(64).describe(
    "The organization for the InfluxDB instance.",
  ).optional(),
  Port: z.number().int().min(1024).max(65535).describe(
    "The port number on which InfluxDB accepts connections.",
  ).optional(),
  DbInstanceType: z.enum([
    "db.influx.medium",
    "db.influx.large",
    "db.influx.xlarge",
    "db.influx.2xlarge",
    "db.influx.4xlarge",
    "db.influx.8xlarge",
    "db.influx.12xlarge",
    "db.influx.16xlarge",
    "db.influx.24xlarge",
  ]).describe("The compute instance of the InfluxDB instance.").optional(),
  VpcSubnetIds: z.array(z.string()).describe(
    "A list of EC2 subnet IDs for this InfluxDB instance.",
  ).optional(),
  DeploymentType: z.enum(["SINGLE_AZ", "WITH_MULTIAZ_STANDBY"]).describe(
    "Deployment type of the InfluxDB Instance.",
  ).optional(),
  Name: z.string().min(3).max(40).regex(
    new RegExp("^[a-zA-Z][a-zA-Z0-9]*(-[a-zA-Z0-9]+)*$"),
  ).describe("The unique name that is associated with the InfluxDB instance.")
    .optional(),
  VpcSecurityGroupIds: z.array(z.string()).describe(
    "A list of Amazon EC2 VPC security groups to associate with this InfluxDB instance.",
  ).optional(),
  NetworkType: z.enum(["IPV4", "DUAL"]).describe(
    "Network type of the InfluxDB Instance.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An arbitrary set of tags (key-value pairs) for this DB instance.",
  ).optional(),
  Password: z.string().min(8).max(64).regex(new RegExp("^[a-zA-Z0-9]+$"))
    .describe("The password for the InfluxDB instance.").optional(),
  DbParameterGroupIdentifier: z.string().min(3).max(64).regex(
    new RegExp("^[a-zA-Z0-9]+$"),
  ).describe("The name of an existing InfluxDB parameter group.").optional(),
  AllocatedStorage: z.number().int().min(20).max(16384).describe(
    "The allocated storage for the InfluxDB instance.",
  ).optional(),
  DbStorageType: z.enum([
    "InfluxIOIncludedT1",
    "InfluxIOIncludedT2",
    "InfluxIOIncludedT3",
  ]).describe("The storage type of the InfluxDB instance.").optional(),
  LogDeliveryConfiguration: z.object({
    S3Configuration: z.object({
      BucketName: z.string().min(3).max(63).regex(
        new RegExp("^[0-9a-z]+[0-9a-z\\.\\-]*[0-9a-z]+$"),
      ).describe(
        "The bucket name for logs to be sent from the InfluxDB instance",
      ).optional(),
      Enabled: z.boolean().describe(
        "Specifies whether logging to customer specified bucket is enabled.",
      ).optional(),
    }).describe(
      "S3 configuration for sending logs to customer account from the InfluxDB instance.",
    ).optional(),
  }).describe(
    "Configuration for sending logs to customer account from the InfluxDB instance.",
  ).optional(),
  Username: z.string().min(1).max(64).describe(
    "The username for the InfluxDB instance.",
  ).optional(),
  Bucket: z.string().min(2).max(64).regex(new RegExp('^[^_][^"]*$')).describe(
    "The bucket for the InfluxDB instance.",
  ).optional(),
  PubliclyAccessible: z.boolean().describe(
    "Attach a public IP to the customer ENI.",
  ).optional(),
  MaintenanceSchedule: z.object({
    Timezone: z.string().min(1).max(64).regex(
      new RegExp("^(UTC|[A-Za-z_]+/[A-Za-z0-9_]+(/[A-Za-z0-9_]+)?)$"),
    ).describe("The IANA timezone identifier for the maintenance schedule.")
      .optional(),
    PreferredMaintenanceWindow: z.string().min(0).max(19).regex(
      new RegExp(
        "^$|^(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):[0-5]\\d-(Mon|Tue|Wed|Thu|Fri|Sat|Sun):([01]\\d|2[0-3]):[0-5]\\d$",
      ),
    ).describe(
      "The preferred maintenance window in format ddd:HH:MM-ddd:HH:MM.",
    ).optional(),
  }).describe("The maintenance schedule for the InfluxDB instance.").optional(),
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

/** Swamp extension model for Timestream InfluxDBInstance. Registered at `@swamp/aws/timestream/influx-dbinstance`. */
export const model = {
  type: "@swamp/aws/timestream/influx-dbinstance",
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
      description: "Added: MaintenanceSchedule",
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
      description: "Timestream InfluxDBInstance resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Timestream InfluxDBInstance",
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
          "AWS::Timestream::InfluxDBInstance",
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
      description: "Get a Timestream InfluxDBInstance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Timestream InfluxDBInstance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Timestream::InfluxDBInstance",
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
      description: "Update a Timestream InfluxDBInstance",
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
          "AWS::Timestream::InfluxDBInstance",
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
          "AWS::Timestream::InfluxDBInstance",
          identifier,
          currentState,
          desiredState,
          [
            "Name",
            "Username",
            "Password",
            "Organization",
            "Bucket",
            "VpcSubnetIds",
            "VpcSecurityGroupIds",
            "PubliclyAccessible",
            "NetworkType",
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
      description: "Delete a Timestream InfluxDBInstance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Timestream InfluxDBInstance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Timestream::InfluxDBInstance",
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
      description: "Sync Timestream InfluxDBInstance state from AWS",
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
            "AWS::Timestream::InfluxDBInstance",
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
