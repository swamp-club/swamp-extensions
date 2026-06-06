// Auto-generated extension model for @swamp/aws/ec2/verified-access-endpoint
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EC2 VerifiedAccessEndpoint (AWS::EC2::VerifiedAccessEndpoint).
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

const PortRangeSchema = z.object({
  FromPort: z.number().int().min(1).max(65535).describe(
    "The first port in the range.",
  ).optional(),
  ToPort: z.number().int().min(1).max(65535).describe(
    "The last port in the range.",
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
  VerifiedAccessGroupId: z.string().describe(
    "The ID of the AWS Verified Access group.",
  ),
  SecurityGroupIds: z.array(z.string()).describe(
    "The IDs of the security groups for the endpoint.",
  ).optional(),
  NetworkInterfaceOptions: z.object({
    NetworkInterfaceId: z.string().describe("The ID of the network interface.")
      .optional(),
    Port: z.number().int().min(1).max(65535).describe("The IP port number.")
      .optional(),
    PortRanges: z.array(PortRangeSchema).describe("The list of port ranges.")
      .optional(),
    Protocol: z.string().describe("The IP protocol.").optional(),
  }).describe("The options for network-interface type endpoint.").optional(),
  LoadBalancerOptions: z.object({
    LoadBalancerArn: z.string().describe("The ARN of the load balancer.")
      .optional(),
    Port: z.number().int().min(1).max(65535).describe("The IP port number.")
      .optional(),
    PortRanges: z.array(PortRangeSchema).describe("The list of port range.")
      .optional(),
    Protocol: z.string().describe("The IP protocol.").optional(),
    SubnetIds: z.array(z.string()).describe("The IDs of the subnets.")
      .optional(),
  }).describe(
    "The load balancer details if creating the AWS Verified Access endpoint as load-balancer type.",
  ).optional(),
  RdsOptions: z.object({
    Protocol: z.string().describe("The IP protocol.").optional(),
    Port: z.number().int().min(1).max(65535).describe("The IP port number.")
      .optional(),
    RdsDbInstanceArn: z.string().describe("The ARN of the RDS DB instance.")
      .optional(),
    RdsDbClusterArn: z.string().describe("The ARN of the RDS DB cluster.")
      .optional(),
    RdsDbProxyArn: z.string().describe("The ARN of the RDS DB proxy.")
      .optional(),
    RdsEndpoint: z.string().describe("The RDS endpoint.").optional(),
    SubnetIds: z.array(z.string()).describe("The IDs of the subnets.")
      .optional(),
  }).describe("The options for rds type endpoint.").optional(),
  CidrOptions: z.object({
    Cidr: z.string().describe("The IP address range, in CIDR notation.")
      .optional(),
    PortRanges: z.array(PortRangeSchema).describe("The list of port range.")
      .optional(),
    Protocol: z.string().describe("The IP protocol.").optional(),
    SubnetIds: z.array(z.string()).describe("The IDs of the subnets.")
      .optional(),
  }).describe("The options for cidr type endpoint.").optional(),
  EndpointType: z.string().describe(
    "The type of AWS Verified Access endpoint. Incoming application requests will be sent to an IP address, load balancer or a network interface depending on the endpoint type specified.The type of AWS Verified Access endpoint. Incoming application requests will be sent to an IP address, load balancer or a network interface depending on the endpoint type specified.",
  ),
  EndpointDomainPrefix: z.string().describe(
    "A custom identifier that gets prepended to a DNS name that is generated for the endpoint.",
  ).optional(),
  DomainCertificateArn: z.string().describe(
    "The ARN of a public TLS/SSL certificate imported into or created with ACM.",
  ).optional(),
  AttachmentType: z.string().describe(
    "The type of attachment used to provide connectivity between the AWS Verified Access endpoint and the application.",
  ),
  ApplicationDomain: z.string().describe(
    "The DNS name for users to reach your application.",
  ).optional(),
  Description: z.string().describe(
    "A description for the AWS Verified Access endpoint.",
  ).optional(),
  PolicyDocument: z.string().describe(
    "The AWS Verified Access policy document.",
  ).optional(),
  PolicyEnabled: z.boolean().describe(
    "The status of the Verified Access policy.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  SseSpecification: z.object({
    KmsKeyArn: z.string().describe(
      "KMS Key Arn used to encrypt the group policy",
    ).optional(),
    CustomerManagedKeyEnabled: z.boolean().describe(
      "Whether to encrypt the policy with the provided key or disable encryption",
    ).optional(),
  }).describe("The configuration options for customer provided KMS encryption.")
    .optional(),
});

const StateSchema = z.object({
  VerifiedAccessEndpointId: z.string(),
  VerifiedAccessGroupId: z.string().optional(),
  VerifiedAccessInstanceId: z.string().optional(),
  Status: z.string().optional(),
  SecurityGroupIds: z.array(z.string()).optional(),
  NetworkInterfaceOptions: z.object({
    NetworkInterfaceId: z.string(),
    Port: z.number(),
    PortRanges: z.array(PortRangeSchema),
    Protocol: z.string(),
  }).optional(),
  LoadBalancerOptions: z.object({
    LoadBalancerArn: z.string(),
    Port: z.number(),
    PortRanges: z.array(PortRangeSchema),
    Protocol: z.string(),
    SubnetIds: z.array(z.string()),
  }).optional(),
  RdsOptions: z.object({
    Protocol: z.string(),
    Port: z.number(),
    RdsDbInstanceArn: z.string(),
    RdsDbClusterArn: z.string(),
    RdsDbProxyArn: z.string(),
    RdsEndpoint: z.string(),
    SubnetIds: z.array(z.string()),
  }).optional(),
  CidrOptions: z.object({
    Cidr: z.string(),
    PortRanges: z.array(PortRangeSchema),
    Protocol: z.string(),
    SubnetIds: z.array(z.string()),
  }).optional(),
  EndpointType: z.string().optional(),
  EndpointDomain: z.string().optional(),
  EndpointDomainPrefix: z.string().optional(),
  DeviceValidationDomain: z.string().optional(),
  DomainCertificateArn: z.string().optional(),
  AttachmentType: z.string().optional(),
  ApplicationDomain: z.string().optional(),
  CreationTime: z.string().optional(),
  LastUpdatedTime: z.string().optional(),
  Description: z.string().optional(),
  PolicyDocument: z.string().optional(),
  PolicyEnabled: z.boolean().optional(),
  Tags: z.array(TagSchema).optional(),
  SseSpecification: z.object({
    KmsKeyArn: z.string(),
    CustomerManagedKeyEnabled: z.boolean(),
  }).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  VerifiedAccessGroupId: z.string().describe(
    "The ID of the AWS Verified Access group.",
  ).optional(),
  SecurityGroupIds: z.array(z.string()).describe(
    "The IDs of the security groups for the endpoint.",
  ).optional(),
  NetworkInterfaceOptions: z.object({
    NetworkInterfaceId: z.string().describe("The ID of the network interface.")
      .optional(),
    Port: z.number().int().min(1).max(65535).describe("The IP port number.")
      .optional(),
    PortRanges: z.array(PortRangeSchema).describe("The list of port ranges.")
      .optional(),
    Protocol: z.string().describe("The IP protocol.").optional(),
  }).describe("The options for network-interface type endpoint.").optional(),
  LoadBalancerOptions: z.object({
    LoadBalancerArn: z.string().describe("The ARN of the load balancer.")
      .optional(),
    Port: z.number().int().min(1).max(65535).describe("The IP port number.")
      .optional(),
    PortRanges: z.array(PortRangeSchema).describe("The list of port range.")
      .optional(),
    Protocol: z.string().describe("The IP protocol.").optional(),
    SubnetIds: z.array(z.string()).describe("The IDs of the subnets.")
      .optional(),
  }).describe(
    "The load balancer details if creating the AWS Verified Access endpoint as load-balancer type.",
  ).optional(),
  RdsOptions: z.object({
    Protocol: z.string().describe("The IP protocol.").optional(),
    Port: z.number().int().min(1).max(65535).describe("The IP port number.")
      .optional(),
    RdsDbInstanceArn: z.string().describe("The ARN of the RDS DB instance.")
      .optional(),
    RdsDbClusterArn: z.string().describe("The ARN of the RDS DB cluster.")
      .optional(),
    RdsDbProxyArn: z.string().describe("The ARN of the RDS DB proxy.")
      .optional(),
    RdsEndpoint: z.string().describe("The RDS endpoint.").optional(),
    SubnetIds: z.array(z.string()).describe("The IDs of the subnets.")
      .optional(),
  }).describe("The options for rds type endpoint.").optional(),
  CidrOptions: z.object({
    Cidr: z.string().describe("The IP address range, in CIDR notation.")
      .optional(),
    PortRanges: z.array(PortRangeSchema).describe("The list of port range.")
      .optional(),
    Protocol: z.string().describe("The IP protocol.").optional(),
    SubnetIds: z.array(z.string()).describe("The IDs of the subnets.")
      .optional(),
  }).describe("The options for cidr type endpoint.").optional(),
  EndpointType: z.string().describe(
    "The type of AWS Verified Access endpoint. Incoming application requests will be sent to an IP address, load balancer or a network interface depending on the endpoint type specified.The type of AWS Verified Access endpoint. Incoming application requests will be sent to an IP address, load balancer or a network interface depending on the endpoint type specified.",
  ).optional(),
  EndpointDomainPrefix: z.string().describe(
    "A custom identifier that gets prepended to a DNS name that is generated for the endpoint.",
  ).optional(),
  DomainCertificateArn: z.string().describe(
    "The ARN of a public TLS/SSL certificate imported into or created with ACM.",
  ).optional(),
  AttachmentType: z.string().describe(
    "The type of attachment used to provide connectivity between the AWS Verified Access endpoint and the application.",
  ).optional(),
  ApplicationDomain: z.string().describe(
    "The DNS name for users to reach your application.",
  ).optional(),
  Description: z.string().describe(
    "A description for the AWS Verified Access endpoint.",
  ).optional(),
  PolicyDocument: z.string().describe(
    "The AWS Verified Access policy document.",
  ).optional(),
  PolicyEnabled: z.boolean().describe(
    "The status of the Verified Access policy.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
  SseSpecification: z.object({
    KmsKeyArn: z.string().describe(
      "KMS Key Arn used to encrypt the group policy",
    ).optional(),
    CustomerManagedKeyEnabled: z.boolean().describe(
      "Whether to encrypt the policy with the provided key or disable encryption",
    ).optional(),
  }).describe("The configuration options for customer provided KMS encryption.")
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

/** Swamp extension model for EC2 VerifiedAccessEndpoint. Registered at `@swamp/aws/ec2/verified-access-endpoint`. */
export const model = {
  type: "@swamp/aws/ec2/verified-access-endpoint",
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
      description: "EC2 VerifiedAccessEndpoint resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EC2 VerifiedAccessEndpoint",
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
          "AWS::EC2::VerifiedAccessEndpoint",
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
      description: "Get a EC2 VerifiedAccessEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 VerifiedAccessEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EC2::VerifiedAccessEndpoint",
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
      description: "Update a EC2 VerifiedAccessEndpoint",
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
        const identifier = existing.VerifiedAccessEndpointId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EC2::VerifiedAccessEndpoint",
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
          "AWS::EC2::VerifiedAccessEndpoint",
          identifier,
          currentState,
          desiredState,
          [
            "ApplicationDomain",
            "AttachmentType",
            "DomainCertificateArn",
            "EndpointDomainPrefix",
            "EndpointType",
            "SecurityGroupIds",
            "NetworkInterfaceId",
            "LoadBalancerArn",
            "Protocol",
            "RdsDbInstanceArn",
            "RdsDbClusterArn",
            "RdsDbProxyArn",
            "Cidr",
            "Protocol",
            "SubnetIds",
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
      description: "Delete a EC2 VerifiedAccessEndpoint",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EC2 VerifiedAccessEndpoint",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EC2::VerifiedAccessEndpoint",
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
      description: "Sync EC2 VerifiedAccessEndpoint state from AWS",
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
        const identifier = existing.VerifiedAccessEndpointId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EC2::VerifiedAccessEndpoint",
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
