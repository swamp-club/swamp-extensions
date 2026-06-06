// Auto-generated extension model for @swamp/aws/applicationinsights/application
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for ApplicationInsights Application (AWS::ApplicationInsights::Application).
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
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const CustomComponentSchema = z.object({
  ComponentName: z.string().min(1).max(128).regex(
    new RegExp("^[\\d\\w\\-_.+]*$"),
  ).describe("The name of the component."),
  ResourceList: z.array(
    z.string().min(20).max(300).regex(
      new RegExp(
        "^arn:aws(-[\\w]+)*:[\\w\\d-]+:([\\w\\d-]*)?:[\\w\\d_-]*([:/].+)*$",
      ),
    ),
  ).describe("The list of resource ARNs that belong to the component."),
});

const LogPatternSchema = z.object({
  PatternName: z.string().min(1).max(50).regex(new RegExp("[a-zA-Z0-9.-_]*"))
    .describe("The name of the log pattern."),
  Pattern: z.string().min(1).max(50).describe("The log pattern."),
  Rank: z.number().int().describe("Rank of the log pattern."),
});

const LogPatternSetSchema = z.object({
  PatternSetName: z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9.-_]*"))
    .describe("The name of the log pattern set."),
  LogPatterns: z.array(LogPatternSchema).describe("The log patterns of a set."),
});

const AlarmMetricSchema = z.object({
  AlarmMetricName: z.string().describe(
    "The name of the metric to be monitored for the component.",
  ),
});

const LogSchema = z.object({
  LogGroupName: z.string().min(1).max(512).regex(
    new RegExp("[\\.\\-_/#A-Za-z0-9]+"),
  ).describe(
    "The CloudWatch log group name to be associated to the monitored log.",
  ).optional(),
  LogPath: z.string().min(1).max(260).regex(
    new RegExp("^([a-zA-Z]:\\\\[\\\\\\S|*\\S]?.*|/[^\"']*)$"),
  ).describe("The path of the logs to be monitored.").optional(),
  LogType: z.string().regex(new RegExp("^[A-Z][A-Z_]*$")).describe(
    "The log type decides the log patterns against which Application Insights analyzes the log.",
  ),
  Encoding: z.enum(["utf-8", "utf-16", "ascii"]).describe(
    "The type of encoding of the logs to be monitored.",
  ).optional(),
  PatternSet: z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9.-_]*"))
    .describe("The name of the log pattern set.").optional(),
});

const WindowsEventSchema = z.object({
  LogGroupName: z.string().min(1).max(512).regex(
    new RegExp("[\\.\\-_/#A-Za-z0-9]+"),
  ).describe(
    "The CloudWatch log group name to be associated to the monitored log.",
  ),
  EventName: z.string().min(1).max(260).regex(
    new RegExp("^[a-zA-Z0-9_ \\\\/-]+$"),
  ).describe("The type of Windows Events to log."),
  EventLevels: z.array(
    z.enum(["INFORMATION", "WARNING", "ERROR", "CRITICAL", "VERBOSE"]),
  ).describe("The levels of event to log."),
  PatternSet: z.string().min(1).max(30).regex(new RegExp("[a-zA-Z0-9.-_]*"))
    .describe("The name of the log pattern set.").optional(),
});

const ProcessSchema = z.object({
  ProcessName: z.string().min(1).max(256).regex(new RegExp("^[a-zA-Z0-9_,-]+$"))
    .describe("The name of the process to be monitored for the component."),
  AlarmMetrics: z.array(AlarmMetricSchema).describe(
    "A list of metrics to monitor for the component.",
  ),
});

const AlarmSchema = z.object({
  AlarmName: z.string().min(1).max(255).describe(
    "The name of the CloudWatch alarm to be monitored for the component.",
  ),
  Severity: z.enum(["HIGH", "MEDIUM", "LOW"]).describe(
    "Indicates the degree of outage when the alarm goes off.",
  ).optional(),
});

const JMXPrometheusExporterSchema = z.object({
  JMXURL: z.string().describe("JMX service URL.").optional(),
  HostPort: z.string().describe("Java agent host port").optional(),
  PrometheusPort: z.string().describe("Prometheus exporter port.").optional(),
});

const HANAPrometheusExporterSchema = z.object({
  HANASID: z.string().describe("HANA DB SID."),
  HANAPort: z.string().describe("The HANA DB port."),
  HANASecretName: z.string().describe(
    'The secret name which manages the HANA DB credentials e.g. { "username": "<>", "password": "<>" }.',
  ),
  AgreeToInstallHANADBClient: z.boolean().describe(
    "A flag which indicates agreeing to install SAP HANA DB client.",
  ),
  PrometheusPort: z.string().describe("Prometheus exporter port.").optional(),
});

const HAClusterPrometheusExporterSchema = z.object({
  PrometheusPort: z.string().describe("Prometheus exporter port.").optional(),
});

const NetWeaverPrometheusExporterSchema = z.object({
  SAPSID: z.string().describe("SAP NetWeaver SID."),
  InstanceNumbers: z.array(
    z.string().min(1).max(2).regex(new RegExp("\\b([0-9]|[0-9][0-9])\\b")),
  ).describe("SAP instance numbers for ASCS, ERS, and App Servers."),
  PrometheusPort: z.string().describe("Prometheus exporter port.").optional(),
});

const SQLServerPrometheusExporterSchema = z.object({
  PrometheusPort: z.string().describe("Prometheus exporter port."),
  SQLSecretName: z.string().describe(
    'Secret name which managers SQL exporter connection. e.g. {"data_source_name": "sqlserver://:@localhost:1433"}',
  ),
});

const ConfigurationDetailsSchema = z.object({
  AlarmMetrics: z.array(AlarmMetricSchema).describe(
    "A list of metrics to monitor for the component.",
  ).optional(),
  Logs: z.array(LogSchema).describe(
    "A list of logs to monitor for the component.",
  ).optional(),
  WindowsEvents: z.array(WindowsEventSchema).describe(
    "A list of Windows Events to log.",
  ).optional(),
  Processes: z.array(ProcessSchema).describe(
    "A list of processes to monitor for the component. Only Windows EC2 instances can have a processes section.",
  ).optional(),
  Alarms: z.array(AlarmSchema).describe(
    "A list of alarms to monitor for the component.",
  ).optional(),
  JMXPrometheusExporter: JMXPrometheusExporterSchema.describe(
    "The JMX Prometheus Exporter settings.",
  ).optional(),
  HANAPrometheusExporter: HANAPrometheusExporterSchema.describe(
    "The HANA DB Prometheus Exporter settings.",
  ).optional(),
  HAClusterPrometheusExporter: HAClusterPrometheusExporterSchema.describe(
    "The HA cluster Prometheus Exporter settings.",
  ).optional(),
  NetWeaverPrometheusExporter: NetWeaverPrometheusExporterSchema.describe(
    "The NetWeaver Prometheus Exporter settings.",
  ).optional(),
  SQLServerPrometheusExporter: SQLServerPrometheusExporterSchema.describe(
    "The SQL Prometheus Exporter settings.",
  ).optional(),
});

const SubComponentConfigurationDetailsSchema = z.object({
  AlarmMetrics: z.array(AlarmMetricSchema).describe(
    "A list of metrics to monitor for the component.",
  ).optional(),
  Logs: z.array(LogSchema).describe(
    "A list of logs to monitor for the component.",
  ).optional(),
  WindowsEvents: z.array(WindowsEventSchema).describe(
    "A list of Windows Events to log.",
  ).optional(),
  Processes: z.array(ProcessSchema).describe(
    "A list of processes to monitor for the component. Only Windows EC2 instances can have a processes section.",
  ).optional(),
});

const SubComponentTypeConfigurationSchema = z.object({
  SubComponentType: z.enum(["AWS::EC2::Instance", "AWS::EC2::Volume"]).describe(
    "The sub component type.",
  ),
  SubComponentConfigurationDetails: SubComponentConfigurationDetailsSchema
    .describe("The configuration settings of sub components."),
});

const ComponentConfigurationSchema = z.object({
  ConfigurationDetails: ConfigurationDetailsSchema.describe(
    "The configuration settings",
  ).optional(),
  SubComponentTypeConfigurations: z.array(SubComponentTypeConfigurationSchema)
    .describe("Sub component configurations of the component.").optional(),
});

const ComponentMonitoringSettingSchema = z.object({
  ComponentName: z.string().min(1).max(128).regex(
    new RegExp("^[\\d\\w\\-_.+]*$"),
  ).describe("The name of the component.").optional(),
  ComponentARN: z.string().min(20).max(300).regex(
    new RegExp(
      "^arn:aws(-[\\w]+)*:[\\w\\d-]+:([\\w\\d-]*)?:[\\w\\d_-]*([:/].+)*$",
    ),
  ).describe("The ARN of the compnonent.").optional(),
  Tier: z.string().regex(new RegExp("^[A-Z][A-Z_]*$")).describe(
    "The tier of the application component.",
  ),
  ComponentConfigurationMode: z.enum([
    "DEFAULT",
    "DEFAULT_WITH_OVERWRITE",
    "CUSTOM",
  ]).describe("The component monitoring configuration mode."),
  DefaultOverwriteComponentConfiguration: ComponentConfigurationSchema.describe(
    "The overwritten settings on default component monitoring configuration.",
  ).optional(),
  CustomComponentConfiguration: ComponentConfigurationSchema.describe(
    "The monitoring configuration of the component.",
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
    "AWS region; overrides AWS_REGION environment variable. Defaults to us-east-1.",
  ).optional(),
  ResourceGroupName: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z0-9.-_]*"),
  ).describe("The name of the resource group."),
  CWEMonitorEnabled: z.boolean().describe(
    "Indicates whether Application Insights can listen to CloudWatch events for the application resources.",
  ).optional(),
  OpsCenterEnabled: z.boolean().describe(
    "When set to true, creates opsItems for any problems detected on an application.",
  ).optional(),
  OpsItemSNSTopicArn: z.string().min(20).max(300).regex(
    new RegExp(
      "^arn:aws(-[\\w]+)*:[\\w\\d-]+:([\\w\\d-]*)?:[\\w\\d_-]*([:/].+)*$",
    ),
  ).describe(
    "The SNS topic provided to Application Insights that is associated to the created opsItem.",
  ).optional(),
  SNSNotificationArn: z.string().min(20).max(300).regex(
    new RegExp(
      "^arn:aws(-[\\w]+)*:[\\w\\d-]+:([\\w\\d-]*)?:[\\w\\d_-]*([:/].+)*$",
    ),
  ).describe(
    "Application Insights sends notifications to this SNS topic whenever there is a problem update in the associated application.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags of Application Insights application.",
  ).optional(),
  CustomComponents: z.array(CustomComponentSchema).describe(
    "The custom grouped components.",
  ).optional(),
  LogPatternSets: z.array(LogPatternSetSchema).describe("The log pattern sets.")
    .optional(),
  AutoConfigurationEnabled: z.boolean().describe(
    "If set to true, application will be configured with recommended monitoring configuration.",
  ).optional(),
  ComponentMonitoringSettings: z.array(ComponentMonitoringSettingSchema)
    .describe("The monitoring settings of the components.").optional(),
  GroupingType: z.enum(["ACCOUNT_BASED"]).describe(
    "The grouping type of the application",
  ).optional(),
  AttachMissingPermission: z.boolean().describe(
    "If set to true, the managed policies for SSM and CW will be attached to the instance roles if they are missing",
  ).optional(),
});

const StateSchema = z.object({
  ResourceGroupName: z.string().optional(),
  ApplicationARN: z.string(),
  CWEMonitorEnabled: z.boolean().optional(),
  OpsCenterEnabled: z.boolean().optional(),
  OpsItemSNSTopicArn: z.string().optional(),
  SNSNotificationArn: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  CustomComponents: z.array(CustomComponentSchema).optional(),
  LogPatternSets: z.array(LogPatternSetSchema).optional(),
  AutoConfigurationEnabled: z.boolean().optional(),
  ComponentMonitoringSettings: z.array(ComponentMonitoringSettingSchema)
    .optional(),
  GroupingType: z.string().optional(),
  AttachMissingPermission: z.boolean().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  ResourceGroupName: z.string().min(1).max(256).regex(
    new RegExp("[a-zA-Z0-9.-_]*"),
  ).describe("The name of the resource group.").optional(),
  CWEMonitorEnabled: z.boolean().describe(
    "Indicates whether Application Insights can listen to CloudWatch events for the application resources.",
  ).optional(),
  OpsCenterEnabled: z.boolean().describe(
    "When set to true, creates opsItems for any problems detected on an application.",
  ).optional(),
  OpsItemSNSTopicArn: z.string().min(20).max(300).regex(
    new RegExp(
      "^arn:aws(-[\\w]+)*:[\\w\\d-]+:([\\w\\d-]*)?:[\\w\\d_-]*([:/].+)*$",
    ),
  ).describe(
    "The SNS topic provided to Application Insights that is associated to the created opsItem.",
  ).optional(),
  SNSNotificationArn: z.string().min(20).max(300).regex(
    new RegExp(
      "^arn:aws(-[\\w]+)*:[\\w\\d-]+:([\\w\\d-]*)?:[\\w\\d_-]*([:/].+)*$",
    ),
  ).describe(
    "Application Insights sends notifications to this SNS topic whenever there is a problem update in the associated application.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "The tags of Application Insights application.",
  ).optional(),
  CustomComponents: z.array(CustomComponentSchema).describe(
    "The custom grouped components.",
  ).optional(),
  LogPatternSets: z.array(LogPatternSetSchema).describe("The log pattern sets.")
    .optional(),
  AutoConfigurationEnabled: z.boolean().describe(
    "If set to true, application will be configured with recommended monitoring configuration.",
  ).optional(),
  ComponentMonitoringSettings: z.array(ComponentMonitoringSettingSchema)
    .describe("The monitoring settings of the components.").optional(),
  GroupingType: z.enum(["ACCOUNT_BASED"]).describe(
    "The grouping type of the application",
  ).optional(),
  AttachMissingPermission: z.boolean().describe(
    "If set to true, the managed policies for SSM and CW will be attached to the instance roles if they are missing",
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

/** Swamp extension model for ApplicationInsights Application. Registered at `@swamp/aws/applicationinsights/application`. */
export const model = {
  type: "@swamp/aws/applicationinsights/application",
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
      description: "ApplicationInsights Application resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a ApplicationInsights Application",
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
          "AWS::ApplicationInsights::Application",
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
      description: "Get a ApplicationInsights Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApplicationInsights Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::ApplicationInsights::Application",
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
      description: "Update a ApplicationInsights Application",
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
        const identifier = existing.ApplicationARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::ApplicationInsights::Application",
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
          "AWS::ApplicationInsights::Application",
          identifier,
          currentState,
          desiredState,
          ["ResourceGroupName", "GroupingType"],
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
      description: "Delete a ApplicationInsights Application",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the ApplicationInsights Application",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::ApplicationInsights::Application",
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
      description: "Sync ApplicationInsights Application state from AWS",
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
        const identifier = existing.ApplicationARN?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::ApplicationInsights::Application",
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
