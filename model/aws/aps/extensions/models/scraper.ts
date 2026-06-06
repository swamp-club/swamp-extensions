// Auto-generated extension model for @swamp/aws/aps/scraper
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for APS Scraper (AWS::APS::Scraper).
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

const ComponentConfigSchema = z.object({
  Options: z.record(z.string(), z.string()).optional(),
});

const ScraperComponentSchema = z.object({
  Type: z.enum(["SERVICE_DISCOVERY", "COLLECTOR", "EXPORTER"]).describe(
    "Type of scraper component",
  ),
  Config: ComponentConfigSchema.optional(),
});

const CloudWatchLogDestinationSchema = z.object({
  LogGroupArn: z.string().min(0).max(512).describe(
    "ARN of the CloudWatch log group",
  ).optional(),
});

const ScraperLoggingDestinationSchema = z.object({
  CloudWatchLogs: CloudWatchLogDestinationSchema.describe(
    "Represents a cloudwatch logs destination for scraper logging",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
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
  Alias: z.string().min(1).max(100).regex(
    new RegExp("^[0-9A-Za-z][-.0-9A-Z_a-z]*$"),
  ).describe("Scraper alias.").optional(),
  ScraperLoggingConfiguration: z.object({
    ScraperComponents: z.array(ScraperComponentSchema),
    LoggingDestination: ScraperLoggingDestinationSchema.describe(
      "Destination for scraper logging",
    ),
  }).describe("Configuration for scraper logging").optional(),
  ScrapeConfiguration: z.object({
    ConfigurationBlob: z.string().describe(
      "Prometheus compatible scrape configuration in base64 encoded blob format",
    ).optional(),
  }).describe("Scraper configuration"),
  RoleConfiguration: z.object({
    SourceRoleArn: z.string().describe("IAM Role in source account").optional(),
    TargetRoleArn: z.string().describe("IAM Role in the target account")
      .optional(),
  }).describe("Role configuration").optional(),
  Source: z.object({
    EksConfiguration: z.object({
      ClusterArn: z.string().regex(
        new RegExp("^arn:aws[-a-z]*:eks:[-a-z0-9]+:[0-9]{12}:cluster/.+$"),
      ).describe("ARN of an EKS cluster"),
      SecurityGroupIds: z.array(z.string().regex(new RegExp("^sg-[0-9a-z]+$")))
        .describe("List of security group IDs").optional(),
      SubnetIds: z.array(z.string().regex(new RegExp("^subnet-[0-9a-z]+$")))
        .describe("List of subnet IDs"),
    }).describe("Configuration for EKS metrics source").optional(),
    VpcConfiguration: z.object({
      SecurityGroupIds: z.array(z.string().regex(new RegExp("^sg-[0-9a-z]+$")))
        .describe("List of security group IDs"),
      SubnetIds: z.array(z.string().regex(new RegExp("^subnet-[0-9a-z]+$")))
        .describe("List of subnet IDs"),
    }).describe("Configuration for VPC metrics source").optional(),
  }).describe("Scraper metrics source"),
  Destination: z.object({
    AmpConfiguration: z.object({
      WorkspaceArn: z.string().regex(
        new RegExp("^arn:aws[-a-z]*:aps:[-a-z0-9]+:[0-9]{12}:workspace/.+$"),
      ).describe("ARN of an Amazon Managed Prometheus workspace"),
    }).describe(
      "Configuration for Amazon Managed Prometheus metrics destination",
    ).optional(),
  }).describe("Scraper metrics destination"),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  ScraperId: z.string().optional(),
  Alias: z.string().optional(),
  Arn: z.string(),
  RoleArn: z.string().optional(),
  ScraperLoggingConfiguration: z.object({
    ScraperComponents: z.array(ScraperComponentSchema),
    LoggingDestination: ScraperLoggingDestinationSchema,
  }).optional(),
  ScrapeConfiguration: z.object({
    ConfigurationBlob: z.string(),
  }).optional(),
  RoleConfiguration: z.object({
    SourceRoleArn: z.string(),
    TargetRoleArn: z.string(),
  }).optional(),
  Source: z.object({
    EksConfiguration: z.object({
      ClusterArn: z.string(),
      SecurityGroupIds: z.array(z.string()),
      SubnetIds: z.array(z.string()),
    }),
    VpcConfiguration: z.object({
      SecurityGroupIds: z.array(z.string()),
      SubnetIds: z.array(z.string()),
    }),
  }).optional(),
  Destination: z.object({
    AmpConfiguration: z.object({
      WorkspaceArn: z.string(),
    }),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Alias: z.string().min(1).max(100).regex(
    new RegExp("^[0-9A-Za-z][-.0-9A-Z_a-z]*$"),
  ).describe("Scraper alias.").optional(),
  ScraperLoggingConfiguration: z.object({
    ScraperComponents: z.array(ScraperComponentSchema).optional(),
    LoggingDestination: ScraperLoggingDestinationSchema.describe(
      "Destination for scraper logging",
    ).optional(),
  }).describe("Configuration for scraper logging").optional(),
  ScrapeConfiguration: z.object({
    ConfigurationBlob: z.string().describe(
      "Prometheus compatible scrape configuration in base64 encoded blob format",
    ).optional(),
  }).describe("Scraper configuration").optional(),
  RoleConfiguration: z.object({
    SourceRoleArn: z.string().describe("IAM Role in source account").optional(),
    TargetRoleArn: z.string().describe("IAM Role in the target account")
      .optional(),
  }).describe("Role configuration").optional(),
  Source: z.object({
    EksConfiguration: z.object({
      ClusterArn: z.string().regex(
        new RegExp("^arn:aws[-a-z]*:eks:[-a-z0-9]+:[0-9]{12}:cluster/.+$"),
      ).describe("ARN of an EKS cluster").optional(),
      SecurityGroupIds: z.array(z.string().regex(new RegExp("^sg-[0-9a-z]+$")))
        .describe("List of security group IDs").optional(),
      SubnetIds: z.array(z.string().regex(new RegExp("^subnet-[0-9a-z]+$")))
        .describe("List of subnet IDs").optional(),
    }).describe("Configuration for EKS metrics source").optional(),
    VpcConfiguration: z.object({
      SecurityGroupIds: z.array(z.string().regex(new RegExp("^sg-[0-9a-z]+$")))
        .describe("List of security group IDs").optional(),
      SubnetIds: z.array(z.string().regex(new RegExp("^subnet-[0-9a-z]+$")))
        .describe("List of subnet IDs").optional(),
    }).describe("Configuration for VPC metrics source").optional(),
  }).describe("Scraper metrics source").optional(),
  Destination: z.object({
    AmpConfiguration: z.object({
      WorkspaceArn: z.string().regex(
        new RegExp("^arn:aws[-a-z]*:aps:[-a-z0-9]+:[0-9]{12}:workspace/.+$"),
      ).describe("ARN of an Amazon Managed Prometheus workspace").optional(),
    }).describe(
      "Configuration for Amazon Managed Prometheus metrics destination",
    ).optional(),
  }).describe("Scraper metrics destination").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
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

/** Swamp extension model for APS Scraper. Registered at `@swamp/aws/aps/scraper`. */
export const model = {
  type: "@swamp/aws/aps/scraper",
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
      description: "APS Scraper resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a APS Scraper",
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
          "AWS::APS::Scraper",
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
      description: "Get a APS Scraper",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the APS Scraper",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::APS::Scraper",
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
      description: "Update a APS Scraper",
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
          "AWS::APS::Scraper",
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
          "AWS::APS::Scraper",
          identifier,
          currentState,
          desiredState,
          ["Source"],
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
      description: "Delete a APS Scraper",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the APS Scraper",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::APS::Scraper",
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
      description: "Sync APS Scraper state from AWS",
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
            "AWS::APS::Scraper",
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
