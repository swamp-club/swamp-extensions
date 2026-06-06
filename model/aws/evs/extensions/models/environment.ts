// Auto-generated extension model for @swamp/aws/evs/environment
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EVS Environment (AWS::EVS::Environment).
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

const InitialVlanInfoSchema = z.object({
  Cidr: z.string().regex(
    new RegExp(
      "^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/(3[0-2]|[1-2][0-9]|[0-9])$",
    ),
  ),
});

const HostInfoForCreateSchema = z.object({
  HostName: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")),
  KeyName: z.string().min(1).max(255).regex(new RegExp("^[a-zA-Z0-9_-]+$")),
  InstanceType: z.enum(["i4i.metal", "i7i.metal-24xl"]),
  PlacementGroupId: z.string().min(1).max(25).regex(
    new RegExp("^pg-[a-f0-9]{8}([a-f0-9]{9})?$"),
  ).optional(),
  DedicatedHostId: z.string().min(1).max(25).regex(
    new RegExp("^h-[a-f0-9]{8}([a-f0-9]{9})?$"),
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
  EnvironmentName: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,100}$"))
    .describe("The name of an EVS environment").optional(),
  KmsKeyId: z.string().optional(),
  VpcId: z.string().min(12).max(21).regex(
    new RegExp("^vpc-[a-f0-9]{8}([a-f0-9]{9})?$"),
  ),
  ServiceAccessSubnetId: z.string().min(15).max(24).regex(
    new RegExp("^subnet-[a-f0-9]{8}([a-f0-9]{9})?$"),
  ),
  VcfVersion: z.enum(["VCF-5.2.1", "VCF-5.2.2"]),
  TermsAccepted: z.boolean(),
  LicenseInfo: z.object({
    SolutionKey: z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}$",
      ),
    ),
    VsanKey: z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}$",
      ),
    ),
  }).describe("The license information for an EVS environment"),
  InitialVlans: z.object({
    VmkManagement: InitialVlanInfoSchema,
    VmManagement: InitialVlanInfoSchema,
    VMotion: InitialVlanInfoSchema,
    VSan: InitialVlanInfoSchema,
    VTep: InitialVlanInfoSchema,
    EdgeVTep: InitialVlanInfoSchema,
    NsxUpLink: InitialVlanInfoSchema,
    Hcx: InitialVlanInfoSchema,
    IsHcxPublic: z.boolean().optional(),
    HcxNetworkAclId: z.string().regex(new RegExp("^acl-[a-zA-Z0-9_-]+$"))
      .optional(),
    ExpansionVlan1: InitialVlanInfoSchema,
    ExpansionVlan2: InitialVlanInfoSchema,
  }).describe(
    "The initial Vlan configuration only required upon creation. Modification after creation will have no effect",
  ).optional(),
  Hosts: z.array(HostInfoForCreateSchema).describe(
    "The initial hosts for environment only required upon creation. Modification after creation will have no effect",
  ).optional(),
  ConnectivityInfo: z.object({
    PrivateRouteServerPeerings: z.array(z.string().min(3).max(21)),
  }),
  VcfHostnames: z.object({
    VCenter: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")),
    Nsx: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")),
    NsxManager1: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")),
    NsxManager2: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")),
    NsxManager3: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")),
    NsxEdge1: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")),
    NsxEdge2: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")),
    SddcManager: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")),
    CloudBuilder: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")),
  }),
  SiteId: z.string(),
  ServiceAccessSecurityGroups: z.object({
    SecurityGroups: z.array(
      z.string().min(3).max(25).regex(new RegExp("^sg-[0-9a-zA-Z]*$")),
    ).optional(),
  }).optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  EnvironmentName: z.string().optional(),
  KmsKeyId: z.string().optional(),
  VpcId: z.string().optional(),
  ServiceAccessSubnetId: z.string().optional(),
  VcfVersion: z.string().optional(),
  TermsAccepted: z.boolean().optional(),
  LicenseInfo: z.object({
    SolutionKey: z.string(),
    VsanKey: z.string(),
  }).optional(),
  InitialVlans: z.object({
    VmkManagement: InitialVlanInfoSchema,
    VmManagement: InitialVlanInfoSchema,
    VMotion: InitialVlanInfoSchema,
    VSan: InitialVlanInfoSchema,
    VTep: InitialVlanInfoSchema,
    EdgeVTep: InitialVlanInfoSchema,
    NsxUpLink: InitialVlanInfoSchema,
    Hcx: InitialVlanInfoSchema,
    IsHcxPublic: z.boolean(),
    HcxNetworkAclId: z.string(),
    ExpansionVlan1: InitialVlanInfoSchema,
    ExpansionVlan2: InitialVlanInfoSchema,
  }).optional(),
  Hosts: z.array(HostInfoForCreateSchema).optional(),
  ConnectivityInfo: z.object({
    PrivateRouteServerPeerings: z.array(z.string()),
  }).optional(),
  VcfHostnames: z.object({
    VCenter: z.string(),
    Nsx: z.string(),
    NsxManager1: z.string(),
    NsxManager2: z.string(),
    NsxManager3: z.string(),
    NsxEdge1: z.string(),
    NsxEdge2: z.string(),
    SddcManager: z.string(),
    CloudBuilder: z.string(),
  }).optional(),
  SiteId: z.string().optional(),
  EnvironmentId: z.string(),
  EnvironmentArn: z.string().optional(),
  EnvironmentState: z.string().optional(),
  StateDetails: z.string().optional(),
  Checks: z.array(z.object({
    Type: z.string(),
    Result: z.string(),
    ImpairedSince: z.string(),
  })).optional(),
  Credentials: z.array(z.object({
    SecretArn: z.string(),
  })).optional(),
  ServiceAccessSecurityGroups: z.object({
    SecurityGroups: z.array(z.string()),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
  CreatedAt: z.string().optional(),
  ModifiedAt: z.string().optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  EnvironmentName: z.string().regex(new RegExp("^[a-zA-Z0-9_-]{1,100}$"))
    .describe("The name of an EVS environment").optional(),
  KmsKeyId: z.string().optional(),
  VpcId: z.string().min(12).max(21).regex(
    new RegExp("^vpc-[a-f0-9]{8}([a-f0-9]{9})?$"),
  ).optional(),
  ServiceAccessSubnetId: z.string().min(15).max(24).regex(
    new RegExp("^subnet-[a-f0-9]{8}([a-f0-9]{9})?$"),
  ).optional(),
  VcfVersion: z.enum(["VCF-5.2.1", "VCF-5.2.2"]).optional(),
  TermsAccepted: z.boolean().optional(),
  LicenseInfo: z.object({
    SolutionKey: z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}$",
      ),
    ).optional(),
    VsanKey: z.string().regex(
      new RegExp(
        "^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}$",
      ),
    ).optional(),
  }).describe("The license information for an EVS environment").optional(),
  InitialVlans: z.object({
    VmkManagement: InitialVlanInfoSchema.optional(),
    VmManagement: InitialVlanInfoSchema.optional(),
    VMotion: InitialVlanInfoSchema.optional(),
    VSan: InitialVlanInfoSchema.optional(),
    VTep: InitialVlanInfoSchema.optional(),
    EdgeVTep: InitialVlanInfoSchema.optional(),
    NsxUpLink: InitialVlanInfoSchema.optional(),
    Hcx: InitialVlanInfoSchema.optional(),
    IsHcxPublic: z.boolean().optional(),
    HcxNetworkAclId: z.string().regex(new RegExp("^acl-[a-zA-Z0-9_-]+$"))
      .optional(),
    ExpansionVlan1: InitialVlanInfoSchema.optional(),
    ExpansionVlan2: InitialVlanInfoSchema.optional(),
  }).describe(
    "The initial Vlan configuration only required upon creation. Modification after creation will have no effect",
  ).optional(),
  Hosts: z.array(HostInfoForCreateSchema).describe(
    "The initial hosts for environment only required upon creation. Modification after creation will have no effect",
  ).optional(),
  ConnectivityInfo: z.object({
    PrivateRouteServerPeerings: z.array(z.string().min(3).max(21)).optional(),
  }).optional(),
  VcfHostnames: z.object({
    VCenter: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")).optional(),
    Nsx: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")).optional(),
    NsxManager1: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")).optional(),
    NsxManager2: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")).optional(),
    NsxManager3: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")).optional(),
    NsxEdge1: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")).optional(),
    NsxEdge2: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")).optional(),
    SddcManager: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$")).optional(),
    CloudBuilder: z.string().regex(new RegExp("^([a-zA-Z0-9\\-]*)$"))
      .optional(),
  }).optional(),
  SiteId: z.string().optional(),
  ServiceAccessSecurityGroups: z.object({
    SecurityGroups: z.array(
      z.string().min(3).max(25).regex(new RegExp("^sg-[0-9a-zA-Z]*$")),
    ).optional(),
  }).optional(),
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

/** Swamp extension model for EVS Environment. Registered at `@swamp/aws/evs/environment`. */
export const model = {
  type: "@swamp/aws/evs/environment",
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
      toVersion: "2026.04.24.1",
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
      description: "EVS Environment resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EVS Environment",
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
          "AWS::EVS::Environment",
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
      description: "Get a EVS Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EVS Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::EVS::Environment",
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
      description: "Update a EVS Environment",
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
        const identifier = existing.EnvironmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        const currentState = await readResource(
          "AWS::EVS::Environment",
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
          "AWS::EVS::Environment",
          identifier,
          currentState,
          desiredState,
          [
            "EnvironmentName",
            "VpcId",
            "ServiceAccessSubnetId",
            "VcfVersion",
            "TermsAccepted",
            "LicenseInfo",
            "ConnectivityInfo",
            "VcfHostnames",
            "SiteId",
            "KmsKeyId",
            "ServiceAccessSecurityGroups",
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
      description: "Delete a EVS Environment",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EVS Environment",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::EVS::Environment",
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
      description: "Sync EVS Environment state from AWS",
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
        const identifier = existing.EnvironmentId?.toString();
        if (!identifier) {
          throw new Error("No identifier found in existing state");
        }
        try {
          const result = await readResource(
            "AWS::EVS::Environment",
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
