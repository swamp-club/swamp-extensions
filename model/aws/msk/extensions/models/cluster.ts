// Auto-generated extension model for @swamp/aws/msk/cluster
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for MSK Cluster (AWS::MSK::Cluster).
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

const ProvisionedThroughputSchema = z.object({
  Enabled: z.boolean().optional(),
  VolumeThroughput: z.number().int().optional(),
});

const EBSStorageInfoSchema = z.object({
  VolumeSize: z.number().int().min(1).max(16384).optional(),
  ProvisionedThroughput: ProvisionedThroughputSchema.optional(),
});

const StorageInfoSchema = z.object({
  EBSStorageInfo: EBSStorageInfoSchema.optional(),
});

const PublicAccessSchema = z.object({
  Type: z.string().min(7).max(23).optional(),
});

const VpcConnectivityTlsSchema = z.object({
  Enabled: z.boolean(),
});

const VpcConnectivityScramSchema = z.object({
  Enabled: z.boolean(),
});

const VpcConnectivityIamSchema = z.object({
  Enabled: z.boolean(),
});

const VpcConnectivitySaslSchema = z.object({
  Scram: VpcConnectivityScramSchema.optional(),
  Iam: VpcConnectivityIamSchema.optional(),
});

const VpcConnectivityClientAuthenticationSchema = z.object({
  Tls: VpcConnectivityTlsSchema.optional(),
  Sasl: VpcConnectivitySaslSchema.optional(),
});

const VpcConnectivitySchema = z.object({
  ClientAuthentication: VpcConnectivityClientAuthenticationSchema.optional(),
});

const ConnectivityInfoSchema = z.object({
  PublicAccess: PublicAccessSchema.optional(),
  VpcConnectivity: VpcConnectivitySchema.optional(),
  NetworkType: z.enum(["IPV4", "DUAL"]).optional(),
});

const EncryptionAtRestSchema = z.object({
  DataVolumeKMSKeyId: z.string(),
});

const EncryptionInTransitSchema = z.object({
  InCluster: z.boolean().optional(),
  ClientBroker: z.enum(["TLS", "TLS_PLAINTEXT", "PLAINTEXT"]).optional(),
});

const JmxExporterSchema = z.object({
  EnabledInBroker: z.boolean(),
});

const NodeExporterSchema = z.object({
  EnabledInBroker: z.boolean(),
});

const PrometheusSchema = z.object({
  JmxExporter: JmxExporterSchema.optional(),
  NodeExporter: NodeExporterSchema.optional(),
});

const TlsSchema = z.object({
  CertificateAuthorityArnList: z.array(z.string()).optional(),
  Enabled: z.boolean().optional(),
});

const ScramSchema = z.object({
  Enabled: z.boolean(),
});

const IamSchema = z.object({
  Enabled: z.boolean(),
});

const SaslSchema = z.object({
  Scram: ScramSchema.optional(),
  Iam: IamSchema.optional(),
});

const UnauthenticatedSchema = z.object({
  Enabled: z.boolean(),
});

const S3Schema = z.object({
  Enabled: z.boolean(),
  Prefix: z.string().optional(),
  Bucket: z.string().optional(),
});

const CloudWatchLogsSchema = z.object({
  LogGroup: z.string().optional(),
  Enabled: z.boolean(),
});

const FirehoseSchema = z.object({
  Enabled: z.boolean(),
  DeliveryStream: z.string().optional(),
});

const BrokerLogsSchema = z.object({
  S3: S3Schema.optional(),
  CloudWatchLogs: CloudWatchLogsSchema.optional(),
  Firehose: FirehoseSchema.optional(),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  BrokerNodeGroupInfo: z.object({
    StorageInfo: StorageInfoSchema.optional(),
    ConnectivityInfo: ConnectivityInfoSchema.optional(),
    SecurityGroups: z.array(z.string()).optional(),
    BrokerAZDistribution: z.string().min(6).max(9).optional(),
    ClientSubnets: z.array(z.string()),
    InstanceType: z.string().min(5).max(32),
  }),
  EnhancedMonitoring: z.enum([
    "DEFAULT",
    "PER_BROKER",
    "PER_TOPIC_PER_BROKER",
    "PER_TOPIC_PER_PARTITION",
  ]).optional(),
  KafkaVersion: z.string().min(1).max(128),
  NumberOfBrokerNodes: z.number().int(),
  EncryptionInfo: z.object({
    EncryptionAtRest: EncryptionAtRestSchema.optional(),
    EncryptionInTransit: EncryptionInTransitSchema.optional(),
  }).optional(),
  OpenMonitoring: z.object({
    Prometheus: PrometheusSchema,
  }).optional(),
  ClusterName: z.string().min(1).max(64),
  ClientAuthentication: z.object({
    Tls: TlsSchema.optional(),
    Sasl: SaslSchema.optional(),
    Unauthenticated: UnauthenticatedSchema.optional(),
  }).optional(),
  LoggingInfo: z.object({
    BrokerLogs: BrokerLogsSchema,
  }).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
  ConfigurationInfo: z.object({
    Revision: z.number().int(),
  }).optional(),
  StorageMode: z.enum(["LOCAL", "TIERED"]).optional(),
  Rebalancing: z.object({
    Status: z.enum(["PAUSED", "ACTIVE"]),
  }).optional(),
  ZookeeperAccess: z.object({
    Enabled: z.boolean().optional(),
  }).optional(),
});

const StateSchema = z.object({
  BrokerNodeGroupInfo: z.object({
    StorageInfo: StorageInfoSchema,
    ConnectivityInfo: ConnectivityInfoSchema,
    SecurityGroups: z.array(z.string()),
    BrokerAZDistribution: z.string(),
    ClientSubnets: z.array(z.string()),
    InstanceType: z.string(),
  }).optional(),
  EnhancedMonitoring: z.string().optional(),
  KafkaVersion: z.string().optional(),
  NumberOfBrokerNodes: z.number().optional(),
  EncryptionInfo: z.object({
    EncryptionAtRest: EncryptionAtRestSchema,
    EncryptionInTransit: EncryptionInTransitSchema,
  }).optional(),
  OpenMonitoring: z.object({
    Prometheus: PrometheusSchema,
  }).optional(),
  ClusterName: z.string().optional(),
  Arn: z.string(),
  CurrentVersion: z.string().optional(),
  ClientAuthentication: z.object({
    Tls: TlsSchema,
    Sasl: SaslSchema,
    Unauthenticated: UnauthenticatedSchema,
  }).optional(),
  LoggingInfo: z.object({
    BrokerLogs: BrokerLogsSchema,
  }).optional(),
  Tags: z.record(z.string(), z.unknown()).optional(),
  ConfigurationInfo: z.object({
    Revision: z.number(),
    Arn: z.string(),
  }).optional(),
  StorageMode: z.string().optional(),
  Rebalancing: z.object({
    Status: z.string(),
  }).optional(),
  ZookeeperAccess: z.object({
    Enabled: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  BrokerNodeGroupInfo: z.object({
    StorageInfo: StorageInfoSchema.optional(),
    ConnectivityInfo: ConnectivityInfoSchema.optional(),
    SecurityGroups: z.array(z.string()).optional(),
    BrokerAZDistribution: z.string().min(6).max(9).optional(),
    ClientSubnets: z.array(z.string()).optional(),
    InstanceType: z.string().min(5).max(32).optional(),
  }).optional(),
  EnhancedMonitoring: z.enum([
    "DEFAULT",
    "PER_BROKER",
    "PER_TOPIC_PER_BROKER",
    "PER_TOPIC_PER_PARTITION",
  ]).optional(),
  KafkaVersion: z.string().min(1).max(128).optional(),
  NumberOfBrokerNodes: z.number().int().optional(),
  EncryptionInfo: z.object({
    EncryptionAtRest: EncryptionAtRestSchema.optional(),
    EncryptionInTransit: EncryptionInTransitSchema.optional(),
  }).optional(),
  OpenMonitoring: z.object({
    Prometheus: PrometheusSchema.optional(),
  }).optional(),
  ClusterName: z.string().min(1).max(64).optional(),
  ClientAuthentication: z.object({
    Tls: TlsSchema.optional(),
    Sasl: SaslSchema.optional(),
    Unauthenticated: UnauthenticatedSchema.optional(),
  }).optional(),
  LoggingInfo: z.object({
    BrokerLogs: BrokerLogsSchema.optional(),
  }).optional(),
  Tags: z.record(z.string(), z.string()).describe(
    "A key-value pair to associate with a resource.",
  ).optional(),
  ConfigurationInfo: z.object({
    Revision: z.number().int().optional(),
  }).optional(),
  StorageMode: z.enum(["LOCAL", "TIERED"]).optional(),
  Rebalancing: z.object({
    Status: z.enum(["PAUSED", "ACTIVE"]).optional(),
  }).optional(),
  ZookeeperAccess: z.object({
    Enabled: z.boolean().optional(),
  }).optional(),
});

/** Swamp extension model for MSK Cluster. Registered at `@swamp/aws/msk/cluster`. */
export const model = {
  type: "@swamp/aws/msk/cluster",
  version: "2026.05.01.1",
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
      toVersion: "2026.05.01.1",
      description: "Added: ZookeeperAccess",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "MSK Cluster resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a MSK Cluster",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::MSK::Cluster",
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
      description: "Get a MSK Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MSK Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::MSK::Cluster",
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
      description: "Update a MSK Cluster",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::MSK::Cluster",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::MSK::Cluster",
          identifier,
          currentState,
          desiredState,
          [
            "BrokerAZDistribution",
            "ClientSubnets",
            "SecurityGroups",
            "EncryptionAtRest",
            "InCluster",
            "ClusterName",
          ],
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
      description: "Delete a MSK Cluster",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the MSK Cluster",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::MSK::Cluster",
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
      description: "Sync MSK Cluster state from AWS",
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
        const identifier = existing.Arn?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::MSK::Cluster",
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
