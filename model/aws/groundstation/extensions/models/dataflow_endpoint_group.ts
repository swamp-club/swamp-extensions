// Auto-generated extension model for @swamp/aws/groundstation/dataflow-endpoint-group
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for GroundStation DataflowEndpointGroup (AWS::GroundStation::DataflowEndpointGroup).
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

const SecurityDetailsSchema = z.object({
  SubnetIds: z.array(z.string()).optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  RoleArn: z.string().regex(
    new RegExp("^(arn:(aws[a-zA-Z-]*)?:[a-z0-9-.]+:.*)|()$"),
  ).optional(),
});

const SocketAddressSchema = z.object({
  Name: z.string().optional(),
  Port: z.number().int().optional(),
});

const DataflowEndpointSchema = z.object({
  Name: z.string().regex(new RegExp("^[ a-zA-Z0-9_:-]{1,256}$")).optional(),
  Address: SocketAddressSchema.optional(),
  Mtu: z.number().int().optional(),
});

const ConnectionDetailsSchema = z.object({
  SocketAddress: SocketAddressSchema.optional(),
  Mtu: z.number().int().describe(
    "Maximum transmission unit (MTU) size in bytes of a dataflow endpoint.",
  ).optional(),
});

const IntegerRangeSchema = z.object({
  Minimum: z.number().int().describe("A minimum value.").optional(),
  Maximum: z.number().int().describe("A maximum value.").optional(),
});

const RangedSocketAddressSchema = z.object({
  Name: z.string().describe("IPv4 socket address.").optional(),
  PortRange: IntegerRangeSchema.describe("Port range of a socket address.")
    .optional(),
});

const RangedConnectionDetailsSchema = z.object({
  SocketAddress: RangedSocketAddressSchema.describe(
    "A socket address with a port range.",
  ).optional(),
  Mtu: z.number().int().describe(
    "Maximum transmission unit (MTU) size in bytes of a dataflow endpoint.",
  ).optional(),
});

const AwsGroundStationAgentEndpointSchema = z.object({
  Name: z.string().regex(new RegExp("^[ a-zA-Z0-9_:-]{1,256}$")).optional(),
  EgressAddress: ConnectionDetailsSchema.describe(
    "Egress address of AgentEndpoint with an optional mtu.",
  ).optional(),
  IngressAddress: RangedConnectionDetailsSchema.describe(
    "Ingress address of AgentEndpoint with a port range and an optional mtu.",
  ).optional(),
  AgentStatus: z.enum(["SUCCESS", "FAILED", "ACTIVE", "INACTIVE"]).describe(
    "The status of AgentEndpoint.",
  ).optional(),
  AuditResults: z.enum(["HEALTHY", "UNHEALTHY"]).describe(
    "The results of the audit.",
  ).optional(),
});

const EndpointDetailsSchema = z.object({
  SecurityDetails: SecurityDetailsSchema.optional(),
  Endpoint: DataflowEndpointSchema.optional(),
  AwsGroundStationAgentEndpoint: AwsGroundStationAgentEndpointSchema.describe(
    "Information about AwsGroundStationAgentEndpoint.",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().regex(new RegExp("^[ a-zA-Z0-9\\+\\-=._:/@]{1,128}$")),
  Value: z.string().regex(new RegExp("^[ a-zA-Z0-9\\+\\-=._:/@]{1,256}$")),
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
  EndpointDetails: z.array(EndpointDetailsSchema),
  ContactPrePassDurationSeconds: z.number().int().describe(
    "Amount of time, in seconds, before a contact starts that the Ground Station Dataflow Endpoint Group will be in a PREPASS state. A Ground Station Dataflow Endpoint Group State Change event will be emitted when the Dataflow Endpoint Group enters and exits the PREPASS state.",
  ).optional(),
  ContactPostPassDurationSeconds: z.number().int().describe(
    "Amount of time, in seconds, after a contact ends that the Ground Station Dataflow Endpoint Group will be in a POSTPASS state. A Ground Station Dataflow Endpoint Group State Change event will be emitted when the Dataflow Endpoint Group enters and exits the POSTPASS state.",
  ).optional(),
  Tags: z.array(TagSchema).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  Arn: z.string().optional(),
  EndpointDetails: z.array(EndpointDetailsSchema).optional(),
  ContactPrePassDurationSeconds: z.number().optional(),
  ContactPostPassDurationSeconds: z.number().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  EndpointDetails: z.array(EndpointDetailsSchema).optional(),
  ContactPrePassDurationSeconds: z.number().int().describe(
    "Amount of time, in seconds, before a contact starts that the Ground Station Dataflow Endpoint Group will be in a PREPASS state. A Ground Station Dataflow Endpoint Group State Change event will be emitted when the Dataflow Endpoint Group enters and exits the PREPASS state.",
  ).optional(),
  ContactPostPassDurationSeconds: z.number().int().describe(
    "Amount of time, in seconds, after a contact ends that the Ground Station Dataflow Endpoint Group will be in a POSTPASS state. A Ground Station Dataflow Endpoint Group State Change event will be emitted when the Dataflow Endpoint Group enters and exits the POSTPASS state.",
  ).optional(),
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

/** Swamp extension model for GroundStation DataflowEndpointGroup. Registered at `@swamp/aws/groundstation/dataflow-endpoint-group`. */
export const model = {
  type: "@swamp/aws/groundstation/dataflow-endpoint-group",
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
      description: "GroundStation DataflowEndpointGroup resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a GroundStation DataflowEndpointGroup",
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
          "AWS::GroundStation::DataflowEndpointGroup",
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
      description: "Get a GroundStation DataflowEndpointGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GroundStation DataflowEndpointGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::GroundStation::DataflowEndpointGroup",
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
      description: "Update a GroundStation DataflowEndpointGroup",
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
          "AWS::GroundStation::DataflowEndpointGroup",
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
          "AWS::GroundStation::DataflowEndpointGroup",
          identifier,
          currentState,
          desiredState,
          [
            "EndpointDetails",
            "ContactPrePassDurationSeconds",
            "ContactPostPassDurationSeconds",
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
      description: "Delete a GroundStation DataflowEndpointGroup",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the GroundStation DataflowEndpointGroup",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::GroundStation::DataflowEndpointGroup",
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
      description: "Sync GroundStation DataflowEndpointGroup state from AWS",
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
            "AWS::GroundStation::DataflowEndpointGroup",
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
