// Auto-generated extension model for @swamp/aws/rtbfabric/responder-gateway
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for RTBFabric ResponderGateway (AWS::RTBFabric::ResponderGateway).
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

const TagSchema = z.object({
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
  Key: z.string().min(1).max(128).regex(
    new RegExp("^(resourceArn|internalId|[a-zA-Z0-9+\\-=._:/@]+)$"),
  ).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  TrustStoreConfiguration: z.object({
    CertificateAuthorityCertificates: z.array(z.string().min(1).max(2097152)),
  }).optional(),
  Description: z.string().regex(new RegExp("^[A-Za-z0-9 ]+$")).optional(),
  DomainName: z.string().regex(
    new RegExp(
      "^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)(?:\\.(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?))+$",
    ),
  ).optional(),
  Port: z.number().int().min(1).max(65535),
  GatewayType: z.enum(["EXTERNAL", "INTERNAL"]).optional(),
  ManagedEndpointConfiguration: z.record(z.string(), z.unknown()).optional(),
  SubnetIds: z.array(z.string()).describe(
    "The ID of one or more subnets in order to create a gateway.",
  ),
  SecurityGroupIds: z.array(z.string()).describe(
    "The ID of one or more security groups in order to create a gateway.",
  ),
  ListenerConfig: z.object({
    Protocols: z.array(z.enum(["HTTP", "HTTPS"])),
  }).optional(),
  VpcId: z.string().min(5).max(50),
  Protocol: z.enum(["HTTP", "HTTPS"]),
  Tags: z.array(TagSchema).describe("Tags to assign to the Responder Gateway.")
    .optional(),
  AcmCertificateArn: z.string().regex(
    new RegExp(
      "arn:(aws|aws-cn|aws-us-gov):acm:([a-z0-9-]+):[0-9]{12}:certificate/.{1,2048}",
    ),
  ).optional(),
});

const StateSchema = z.object({
  UpdatedTimestamp: z.string().optional(),
  TrustStoreConfiguration: z.object({
    CertificateAuthorityCertificates: z.array(z.string()),
  }).optional(),
  Description: z.string().optional(),
  CreatedTimestamp: z.string().optional(),
  DomainName: z.string().optional(),
  Port: z.number().optional(),
  GatewayType: z.string().optional(),
  ExternalInboundEndpoint: z.string().optional(),
  GatewayId: z.string().optional(),
  ManagedEndpointConfiguration: z.record(z.string(), z.unknown()).optional(),
  SubnetIds: z.array(z.string()).optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  ListenerConfig: z.object({
    Protocols: z.array(z.string()),
  }).optional(),
  VpcId: z.string().optional(),
  ResponderGatewayStatus: z.string().optional(),
  CertificateAssociationStatus: z.string().optional(),
  Arn: z.string(),
  Protocol: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  AcmCertificateArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  TrustStoreConfiguration: z.object({
    CertificateAuthorityCertificates: z.array(z.string().min(1).max(2097152))
      .optional(),
  }).optional(),
  Description: z.string().regex(new RegExp("^[A-Za-z0-9 ]+$")).optional(),
  DomainName: z.string().regex(
    new RegExp(
      "^(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)(?:\\.(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?))+$",
    ),
  ).optional(),
  Port: z.number().int().min(1).max(65535).optional(),
  GatewayType: z.enum(["EXTERNAL", "INTERNAL"]).optional(),
  ManagedEndpointConfiguration: z.record(z.string(), z.unknown()).optional(),
  SubnetIds: z.array(z.string()).describe(
    "The ID of one or more subnets in order to create a gateway.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "The ID of one or more security groups in order to create a gateway.",
  ).optional(),
  ListenerConfig: z.object({
    Protocols: z.array(z.enum(["HTTP", "HTTPS"])).optional(),
  }).optional(),
  VpcId: z.string().min(5).max(50).optional(),
  Protocol: z.enum(["HTTP", "HTTPS"]).optional(),
  Tags: z.array(TagSchema).describe("Tags to assign to the Responder Gateway.")
    .optional(),
  AcmCertificateArn: z.string().regex(
    new RegExp(
      "arn:(aws|aws-cn|aws-us-gov):acm:([a-z0-9-]+):[0-9]{12}:certificate/.{1,2048}",
    ),
  ).optional(),
});

/** Swamp extension model for RTBFabric ResponderGateway. Registered at `@swamp/aws/rtbfabric/responder-gateway`. */
export const model = {
  type: "@swamp/aws/rtbfabric/responder-gateway",
  version: "2026.06.03.1",
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
      toVersion: "2026.06.03.1",
      description: "Added: GatewayType, ListenerConfig, AcmCertificateArn",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "RTBFabric ResponderGateway resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a RTBFabric ResponderGateway",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::RTBFabric::ResponderGateway",
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
      description: "Get a RTBFabric ResponderGateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RTBFabric ResponderGateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::RTBFabric::ResponderGateway",
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
      description: "Update a RTBFabric ResponderGateway",
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
          "AWS::RTBFabric::ResponderGateway",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::RTBFabric::ResponderGateway",
          identifier,
          currentState,
          desiredState,
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
      description: "Delete a RTBFabric ResponderGateway",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the RTBFabric ResponderGateway",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::RTBFabric::ResponderGateway",
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
      description: "Sync RTBFabric ResponderGateway state from AWS",
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
            "AWS::RTBFabric::ResponderGateway",
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
