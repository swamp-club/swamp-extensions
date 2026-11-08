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

// Auto-generated extension model for @swamp/aws/ec2/network-insights-analysis
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 NetworkInsightsAnalysis (AWS::EC2::NetworkInsightsAnalysis).
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

const TagSchema = z.object({
  Value: z.string().optional(),
  Key: z.string(),
});

const AnalysisComponentStateSchema = z.object({
  Id: z.string(),
  Arn: z.string(),
}).partial();

const AdditionalDetailStateSchema = z.object({
  ServiceName: z.string(),
  AdditionalDetailType: z.string(),
  LoadBalancers: z.array(AnalysisComponentStateSchema),
  Component: AnalysisComponentStateSchema,
}).partial();

const PortRangeStateSchema = z.object({
  From: z.number(),
  To: z.number(),
}).partial();

const AnalysisPacketHeaderStateSchema = z.object({
  DestinationPortRanges: z.array(PortRangeStateSchema),
  SourcePortRanges: z.array(PortRangeStateSchema),
  DestinationAddresses: z.array(z.string()),
  Protocol: z.string(),
  SourceAddresses: z.array(z.string()),
}).partial();

const AnalysisSecurityGroupRuleStateSchema = z.object({
  PortRange: PortRangeStateSchema,
  Cidr: z.string(),
  PrefixListId: z.string(),
  SecurityGroupId: z.string(),
  Protocol: z.string(),
  Direction: z.string(),
}).partial();

const AnalysisTransitGatewayPolicyTableEntryStateSchema = z.object({
  DestinationPortRange: PortRangeStateSchema,
  SourcePortRange: PortRangeStateSchema,
  SourceCidr: z.string(),
  RuleNumber: z.number(),
  TargetRouteTableId: z.string(),
  Protocol: z.string(),
  DestinationCidr: z.string(),
}).partial();

const AnalysisLoadBalancerListenerStateSchema = z.object({
  InstancePort: z.number(),
  LoadBalancerPort: z.number(),
}).partial();

const TransitGatewayRouteTableRouteStateSchema = z.object({
  PrefixListId: z.string(),
  ResourceId: z.string(),
  State: z.string(),
  ResourceType: z.string(),
  RouteOrigin: z.string(),
  DestinationCidr: z.string(),
  AttachmentId: z.string(),
}).partial();

const AnalysisLoadBalancerTargetStateSchema = z.object({
  Address: z.string(),
  Instance: AnalysisComponentStateSchema,
  Port: z.number(),
  AvailabilityZone: z.string(),
}).partial();

const AnalysisRouteTableRouteStateSchema = z.object({
  Origin: z.string(),
  destinationPrefixListId: z.string(),
  destinationCidr: z.string(),
  NetworkInterfaceId: z.string(),
  TransitGatewayId: z.string(),
  VpcPeeringConnectionId: z.string(),
  instanceId: z.string(),
  State: z.string(),
  egressOnlyInternetGatewayId: z.string(),
  NatGatewayId: z.string(),
  gatewayId: z.string(),
}).partial();

const AnalysisAclRuleStateSchema = z.object({
  PortRange: PortRangeStateSchema,
  Cidr: z.string(),
  RuleAction: z.string(),
  Egress: z.boolean(),
  RuleNumber: z.number(),
  Protocol: z.string(),
}).partial();

const ExplanationStateSchema = z.object({
  VpnGateway: AnalysisComponentStateSchema,
  PacketField: z.string(),
  TransitGatewayAttachment: AnalysisComponentStateSchema,
  Protocols: z.array(z.string()),
  IngressRouteTable: AnalysisComponentStateSchema,
  ClassicLoadBalancerListener: AnalysisLoadBalancerListenerStateSchema,
  VpcPeeringConnection: AnalysisComponentStateSchema,
  Address: z.string(),
  Port: z.number(),
  TransitGatewayPolicyTableEntry:
    AnalysisTransitGatewayPolicyTableEntryStateSchema,
  Addresses: z.array(z.string()),
  ElasticLoadBalancerListener: AnalysisComponentStateSchema,
  TransitGatewayRouteTable: AnalysisComponentStateSchema,
  ExplanationCode: z.string(),
  InternetGateway: AnalysisComponentStateSchema,
  SourceVpc: AnalysisComponentStateSchema,
  AttachedTo: AnalysisComponentStateSchema,
  PrefixList: AnalysisComponentStateSchema,
  TransitGatewayRouteTableRoute: TransitGatewayRouteTableRouteStateSchema,
  ComponentRegion: z.string(),
  LoadBalancerTargetGroup: AnalysisComponentStateSchema,
  NetworkInterface: AnalysisComponentStateSchema,
  CustomerGateway: AnalysisComponentStateSchema,
  DestinationVpc: AnalysisComponentStateSchema,
  SecurityGroup: AnalysisComponentStateSchema,
  TransitGateway: AnalysisComponentStateSchema,
  RouteTable: AnalysisComponentStateSchema,
  State: z.string(),
  LoadBalancerListenerPort: z.number(),
  vpcEndpoint: AnalysisComponentStateSchema,
  Subnet: AnalysisComponentStateSchema,
  Cidrs: z.array(z.string()),
  Destination: AnalysisComponentStateSchema,
  SecurityGroups: z.array(AnalysisComponentStateSchema),
  ComponentAccount: z.string(),
  VpnConnection: AnalysisComponentStateSchema,
  Vpc: AnalysisComponentStateSchema,
  NatGateway: AnalysisComponentStateSchema,
  Direction: z.string(),
  LoadBalancerTargetPort: z.number(),
  LoadBalancerTarget: AnalysisLoadBalancerTargetStateSchema,
  TransitGatewayPolicyTable: AnalysisComponentStateSchema,
  LoadBalancerTargetGroups: z.array(AnalysisComponentStateSchema),
  Component: AnalysisComponentStateSchema,
  MissingComponent: z.string(),
  RouteTableRoute: AnalysisRouteTableRouteStateSchema,
  AvailabilityZones: z.array(z.string()),
  PortRanges: z.array(PortRangeStateSchema),
  Acl: AnalysisComponentStateSchema,
  SecurityGroupRule: AnalysisSecurityGroupRuleStateSchema,
  SubnetRouteTable: AnalysisComponentStateSchema,
  LoadBalancerArn: z.string(),
  AclRule: AnalysisAclRuleStateSchema,
}).partial();

const PathComponentStateSchema = z.object({
  AdditionalDetails: z.array(AdditionalDetailStateSchema),
  InboundHeader: AnalysisPacketHeaderStateSchema,
  Vpc: AnalysisComponentStateSchema,
  DestinationVpc: AnalysisComponentStateSchema,
  SecurityGroupRule: AnalysisSecurityGroupRuleStateSchema,
  TransitGatewayPolicyTableEntry:
    AnalysisTransitGatewayPolicyTableEntryStateSchema,
  TransitGateway: AnalysisComponentStateSchema,
  ElasticLoadBalancerListener: AnalysisComponentStateSchema,
  Explanations: z.array(ExplanationStateSchema),
  ServiceName: z.string(),
  SequenceNumber: z.number(),
  SourceVpc: AnalysisComponentStateSchema,
  OutboundHeader: AnalysisPacketHeaderStateSchema,
  AclRule: AnalysisAclRuleStateSchema,
  TransitGatewayRouteTableRoute: TransitGatewayRouteTableRouteStateSchema,
  Component: AnalysisComponentStateSchema,
  Subnet: AnalysisComponentStateSchema,
  RouteTableRoute: AnalysisRouteTableRouteStateSchema,
}).partial();

const AlternatePathHintStateSchema = z.object({
  ComponentArn: z.string(),
  ComponentId: z.string(),
}).partial();

const TagStateSchema = z.object({
  Value: z.string(),
  Key: z.string(),
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
  FilterOutArns: z.array(z.string()).optional(),
  NetworkInsightsPathId: z.string().optional(),
  FilterInArns: z.array(z.string()).optional(),
  AdditionalAccounts: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Status: z.string().optional(),
  ReturnPathComponents: z.array(PathComponentStateSchema).optional(),
  NetworkInsightsAnalysisId: z.string(),
  FilterOutArns: z.array(z.string()).optional(),
  NetworkInsightsPathId: z.string().optional(),
  NetworkPathFound: z.boolean().optional(),
  SuggestedAccounts: z.array(z.string()).optional(),
  FilterInArns: z.array(z.string()).optional(),
  NetworkInsightsAnalysisArn: z.string().optional(),
  StatusMessage: z.string().optional(),
  StartDate: z.string().optional(),
  AlternatePathHints: z.array(AlternatePathHintStateSchema).optional(),
  Explanations: z.array(ExplanationStateSchema).optional(),
  ForwardPathComponents: z.array(PathComponentStateSchema).optional(),
  AdditionalAccounts: z.array(z.string()).optional(),
  Tags: z.array(TagStateSchema).optional(),
}).passthrough();

type StateData = Record<string, unknown>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  FilterOutArns: z.array(z.string()).optional(),
  NetworkInsightsPathId: z.string().optional(),
  FilterInArns: z.array(z.string()).optional(),
  AdditionalAccounts: z.array(z.string()).optional(),
  Tags: z.array(TagSchema).optional(),
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

/** Swamp extension model for EC2 NetworkInsightsAnalysis. Registered at `@swamp/aws/ec2/network-insights-analysis`. */
export const model = {
  type: "@swamp/aws/ec2/network-insights-analysis",
  version: "2026.11.08.2",
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
      toVersion: "2026.11.08.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
    {
      toVersion: "2026.11.08.2",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EC2 NetworkInsightsAnalysis resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 NetworkInsightsAnalysis",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const missing = ["NetworkInsightsPathId"].filter((k) =>
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
          "AWS::EC2::NetworkInsightsAnalysis",
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
      description: "Get a EC2 NetworkInsightsAnalysis",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 NetworkInsightsAnalysis",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::NetworkInsightsAnalysis",
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
      description: "Update a EC2 NetworkInsightsAnalysis",
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
        const identifier = existing.NetworkInsightsAnalysisId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::NetworkInsightsAnalysis",
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
          "AWS::EC2::NetworkInsightsAnalysis",
          identifier,
          currentState,
          desiredState,
          ["NetworkInsightsPathId", "FilterInArns", "FilterOutArns"],
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
      description: "Delete a EC2 NetworkInsightsAnalysis",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 NetworkInsightsAnalysis",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::NetworkInsightsAnalysis",
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
      description: "Sync EC2 NetworkInsightsAnalysis state from AWS",
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
        const identifier = existing.NetworkInsightsAnalysisId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::NetworkInsightsAnalysis",
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
      description: "List EC2 NetworkInsightsAnalysis resources",
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
          "AWS::EC2::NetworkInsightsAnalysis",
          {
            resourceModel: args.resourceModel,
            maxPages: args.maxPages,
            credentials,
          },
        );
        const dataHandles = [];
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const instanceName =
            (item.properties?.NetworkInsightsAnalysisId?.toString() ??
              item.identifier).replace(/[\/\\]/g, "_").replace(/\.\./g, "_")
              .replace(/\0/g, "");
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
