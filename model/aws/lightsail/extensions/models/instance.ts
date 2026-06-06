// Auto-generated extension model for @swamp/aws/lightsail/instance
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for Lightsail Instance (AWS::Lightsail::Instance).
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

const DiskSchema = z.object({
  DiskName: z.string().min(1).max(254).regex(
    new RegExp("^[a-zA-Z0-9][\\w\\-.]*[a-zA-Z0-9]$"),
  ).describe("The names to use for your new Lightsail disk."),
  SizeInGb: z.string().describe("Size of the disk attached to the Instance.")
    .optional(),
  IsSystemDisk: z.boolean().describe(
    "Is the Attached disk is the system disk of the Instance.",
  ).optional(),
  IOPS: z.number().int().describe("IOPS of disk.").optional(),
  Path: z.string().describe("Path of the disk attached to the instance."),
  AttachedTo: z.string().describe("Instance attached to the disk.").optional(),
  AttachmentState: z.string().describe("Attachment state of the disk.")
    .optional(),
});

const PortSchema = z.object({
  FromPort: z.number().int().describe("From Port of the Instance.").optional(),
  ToPort: z.number().int().describe("To Port of the Instance.").optional(),
  Protocol: z.string().describe("Port Protocol of the Instance.").optional(),
  AccessFrom: z.string().describe("Access From Protocol of the Instance.")
    .optional(),
  AccessType: z.string().describe("Access Type Protocol of the Instance.")
    .optional(),
  CommonName: z.string().describe("CommonName for Protocol of the Instance.")
    .optional(),
  AccessDirection: z.string().describe(
    "Access Direction for Protocol of the Instance(inbound/outbound).",
  ).optional(),
  Ipv6Cidrs: z.array(z.string()).describe("IPv6 Cidrs").optional(),
  CidrListAliases: z.array(z.string()).describe("cidr List Aliases").optional(),
  Cidrs: z.array(z.string()).describe("cidrs").optional(),
});

const AutoSnapshotAddOnSchema = z.object({
  SnapshotTimeOfDay: z.string().regex(new RegExp("^[0-9]{2}:00$")).describe(
    "The daily time when an automatic snapshot will be created.",
  ).optional(),
});

const AddOnSchema = z.object({
  AddOnType: z.string().min(1).max(128).describe("The add-on type"),
  Status: z.enum([
    "Enabling",
    "Disabling",
    "Enabled",
    "Terminating",
    "Terminated",
    "Disabled",
    "Failed",
  ]).describe("Status of the Addon").optional(),
  AutoSnapshotAddOnRequest: AutoSnapshotAddOnSchema.describe(
    "An object that represents additional parameters when enabling or modifying the automatic snapshot add-on",
  ).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128).describe(
    "The key name of the tag. You can specify a value that is 1 to 128 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(0).max(256).describe(
    "The value for the tag. You can specify a value that is 0 to 256 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ).optional(),
});

const GlobalArgsSchema = z.object({
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
  Hardware: z.object({
    Disks: z.array(DiskSchema).describe("Disks attached to the Instance.")
      .optional(),
  }).describe("Hardware of the Instance.").optional(),
  Networking: z.object({
    Ports: z.array(PortSchema).describe("Ports to the Instance."),
  }).describe("Networking of the Instance.").optional(),
  InstanceName: z.string().min(1).max(254).regex(
    new RegExp("^[a-zA-Z0-9][\\w\\-.]*[a-zA-Z0-9]$"),
  ).describe("The names to use for your new Lightsail instance."),
  BundleId: z.string().min(1).max(255).describe(
    "The bundle of specification information for your virtual private server (or instance), including the pricing plan (e.g., micro_1_0).",
  ),
  BlueprintId: z.string().min(1).max(255).describe(
    "The ID for a virtual private server image (e.g., app_wordpress_4_4 or app_lamp_7_0). Use the get blueprints operation to return a list of available images (or blueprints).",
  ),
  AddOns: z.array(AddOnSchema).describe(
    "An array of objects representing the add-ons to enable for the new instance.",
  ).optional(),
  UserData: z.string().describe(
    "A launch script you can create that configures a server with additional user data. For example, you might want to run apt-get -y update.",
  ).optional(),
  KeyPairName: z.string().describe("The name of your key pair.").optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  SupportCode: z.string().optional(),
  ResourceType: z.string().optional(),
  IsStaticIp: z.boolean().optional(),
  PrivateIpAddress: z.string().optional(),
  PublicIpAddress: z.string().optional(),
  Ipv6Addresses: z.array(z.string()).optional(),
  Location: z.object({
    AvailabilityZone: z.string(),
    RegionName: z.string(),
  }).optional(),
  Hardware: z.object({
    CpuCount: z.number(),
    RamSizeInGb: z.number(),
    Disks: z.array(DiskSchema),
  }).optional(),
  State: z.object({
    Code: z.number(),
    Name: z.string(),
  }).optional(),
  Networking: z.object({
    Ports: z.array(PortSchema),
    MonthlyTransfer: z.object({
      GbPerMonthAllocated: z.string(),
    }),
  }).optional(),
  UserName: z.string().optional(),
  SshKeyName: z.string().optional(),
  InstanceName: z.string(),
  AvailabilityZone: z.string().optional(),
  BundleId: z.string().optional(),
  BlueprintId: z.string().optional(),
  AddOns: z.array(AddOnSchema).optional(),
  UserData: z.string().optional(),
  KeyPairName: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
  InstanceArn: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  Hardware: z.object({
    Disks: z.array(DiskSchema).describe("Disks attached to the Instance.")
      .optional(),
  }).describe("Hardware of the Instance.").optional(),
  Networking: z.object({
    Ports: z.array(PortSchema).describe("Ports to the Instance.").optional(),
  }).describe("Networking of the Instance.").optional(),
  InstanceName: z.string().min(1).max(254).regex(
    new RegExp("^[a-zA-Z0-9][\\w\\-.]*[a-zA-Z0-9]$"),
  ).describe("The names to use for your new Lightsail instance.").optional(),
  BundleId: z.string().min(1).max(255).describe(
    "The bundle of specification information for your virtual private server (or instance), including the pricing plan (e.g., micro_1_0).",
  ).optional(),
  BlueprintId: z.string().min(1).max(255).describe(
    "The ID for a virtual private server image (e.g., app_wordpress_4_4 or app_lamp_7_0). Use the get blueprints operation to return a list of available images (or blueprints).",
  ).optional(),
  AddOns: z.array(AddOnSchema).describe(
    "An array of objects representing the add-ons to enable for the new instance.",
  ).optional(),
  UserData: z.string().describe(
    "A launch script you can create that configures a server with additional user data. For example, you might want to run apt-get -y update.",
  ).optional(),
  KeyPairName: z.string().describe("The name of your key pair.").optional(),
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

/** Swamp extension model for Lightsail Instance. Registered at `@swamp/aws/lightsail/instance`. */
export const model = {
  type: "@swamp/aws/lightsail/instance",
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
      description: "Lightsail Instance resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a Lightsail Instance",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::Lightsail::Instance",
          desiredState,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.InstanceName ?? g.InstanceName)?.toString() ?? "current")
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    get: {
      description: "Get a Lightsail Instance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail Instance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::Lightsail::Instance",
          args.identifier,
          credentials,
        ) as StateData;
        const instanceName =
          ((result.InstanceName ?? context.globalArgs.InstanceName)
            ?.toString() ?? args.identifier).replace(/[\/\\]/g, "_").replace(
              /\.\./g,
              "_",
            ).replace(/\0/g, "");
        const handle = await context.writeResource(
          "state",
          instanceName,
          result,
        );
        return { dataHandles: [handle] };
      },
    },
    update: {
      description: "Update a Lightsail Instance",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.InstanceName?.toString() ?? "current").replace(
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
        const identifier = existing.InstanceName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::Lightsail::Instance",
          identifier,
          credentials,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (_credentialKeys.has(key)) continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::Lightsail::Instance",
          identifier,
          currentState,
          desiredState,
          ["InstanceName", "BlueprintId", "BundleId", "AvailabilityZone"],
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
      description: "Delete a Lightsail Instance",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the Lightsail Instance",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::Lightsail::Instance",
          args.identifier,
          credentials,
        );
        const instanceName =
          (context.globalArgs.InstanceName?.toString() ?? args.identifier)
            .replace(/[\/\\]/g, "_").replace(/\.\./g, "_").replace(/\0/g, "");
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
      description: "Sync Lightsail Instance state from AWS",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const credentials = _buildCredentials(g);
        const instanceName = (g.InstanceName?.toString() ?? "current").replace(
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
        const identifier = existing.InstanceName?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::Lightsail::Instance",
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
