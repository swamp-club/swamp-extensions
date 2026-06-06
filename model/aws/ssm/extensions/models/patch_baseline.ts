// Auto-generated extension model for @swamp/aws/ssm/patch-baseline
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for SSM PatchBaseline (AWS::SSM::PatchBaseline).
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

const PatchFilterSchema = z.object({
  Values: z.array(z.string().min(1).max(64)).optional(),
  Key: z.enum([
    "ADVISORY_ID",
    "ARCH",
    "BUGZILLA_ID",
    "CLASSIFICATION",
    "CVE_ID",
    "EPOCH",
    "MSRC_SEVERITY",
    "NAME",
    "PATCH_ID",
    "PATCH_SET",
    "PRIORITY",
    "PRODUCT",
    "PRODUCT_FAMILY",
    "RELEASE",
    "REPOSITORY",
    "SECTION",
    "SECURITY",
    "SEVERITY",
    "VERSION",
  ]).optional(),
});

const PatchFilterGroupSchema = z.object({
  PatchFilters: z.array(PatchFilterSchema).optional(),
});

const RuleSchema = z.object({
  ApproveUntilDate: z.string().min(0).max(10).optional(),
  EnableNonSecurity: z.boolean().optional(),
  PatchFilterGroup: PatchFilterGroupSchema.describe(
    "The patch filter group that defines the criteria for the rule.",
  ).optional(),
  ApproveAfterDays: z.number().int().min(0).max(360).optional(),
  ComplianceLevel: z.enum([
    "CRITICAL",
    "HIGH",
    "INFORMATIONAL",
    "LOW",
    "MEDIUM",
    "UNSPECIFIED",
  ]).optional(),
});

const PatchSourceSchema = z.object({
  Products: z.array(z.string().min(1).max(128)).optional(),
  Configuration: z.string().min(1).max(1024).optional(),
  Name: z.string().regex(new RegExp("^[a-zA-Z0-9_\\-.]{3,50}$")).optional(),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(128),
  Value: z.string().min(1).max(256),
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
  DefaultBaseline: z.boolean().describe(
    "Set the baseline as default baseline. Only registering to default patch baseline is allowed.",
  ).optional(),
  OperatingSystem: z.enum([
    "WINDOWS",
    "AMAZON_LINUX",
    "AMAZON_LINUX_2",
    "AMAZON_LINUX_2022",
    "AMAZON_LINUX_2023",
    "UBUNTU",
    "REDHAT_ENTERPRISE_LINUX",
    "SUSE",
    "CENTOS",
    "ORACLE_LINUX",
    "DEBIAN",
    "MACOS",
    "RASPBIAN",
    "ROCKY_LINUX",
    "ALMA_LINUX",
  ]).describe(
    "Defines the operating system the patch baseline applies to. The Default value is WINDOWS.",
  ).optional(),
  Description: z.string().min(1).max(1024).describe(
    "The description of the patch baseline.",
  ).optional(),
  ApprovalRules: z.object({
    PatchRules: z.array(RuleSchema).optional(),
  }).describe(
    "A set of rules defining the approval rules for a patch baseline.",
  ).optional(),
  Sources: z.array(PatchSourceSchema).describe(
    "Information about the patches to use to update the instances, including target operating systems and source repository. Applies to Linux instances only.",
  ).optional(),
  Name: z.string().min(3).max(128).regex(
    new RegExp("^[a-zA-Z0-9_\\-.]{3,128}$"),
  ).describe("The name of the patch baseline."),
  RejectedPatches: z.array(z.string().min(1).max(100)).describe(
    "A list of explicitly rejected patches for the baseline.",
  ).optional(),
  ApprovedPatches: z.array(z.string().min(1).max(100)).describe(
    "A list of explicitly approved patches for the baseline.",
  ).optional(),
  RejectedPatchesAction: z.enum(["ALLOW_AS_DEPENDENCY", "BLOCK"]).describe(
    "The action for Patch Manager to take on patches included in the RejectedPackages list.",
  ).optional(),
  PatchGroups: z.array(z.string().min(1).max(256)).describe(
    "PatchGroups is used to associate instances with a specific patch baseline",
  ).optional(),
  ApprovedPatchesComplianceLevel: z.enum([
    "CRITICAL",
    "HIGH",
    "MEDIUM",
    "LOW",
    "INFORMATIONAL",
    "UNSPECIFIED",
  ]).describe(
    "Defines the compliance level for approved patches. This means that if an approved patch is reported as missing, this is the severity of the compliance violation. The default value is UNSPECIFIED.",
  ).optional(),
  ApprovedPatchesEnableNonSecurity: z.boolean().describe(
    "Indicates whether the list of approved patches includes non-security updates that should be applied to the instances. The default value is 'false'. Applies to Linux instances only.",
  ).optional(),
  GlobalFilters: z.object({
    PatchFilters: z.array(PatchFilterSchema).optional(),
  }).describe(
    "A set of global filters used to include patches in the baseline.",
  ).optional(),
  AvailableSecurityUpdatesComplianceStatus: z.enum([
    "NON_COMPLIANT",
    "COMPLIANT",
  ]).describe(
    "The compliance status for vendor recommended security updates that are not approved by this patch baseline.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Optional metadata that you assign to a resource. Tags enable you to categorize a resource in different ways.",
  ).optional(),
});

const StateSchema = z.object({
  Id: z.string(),
  DefaultBaseline: z.boolean().optional(),
  OperatingSystem: z.string().optional(),
  Description: z.string().optional(),
  ApprovalRules: z.object({
    PatchRules: z.array(RuleSchema),
  }).optional(),
  Sources: z.array(PatchSourceSchema).optional(),
  Name: z.string().optional(),
  RejectedPatches: z.array(z.string()).optional(),
  ApprovedPatches: z.array(z.string()).optional(),
  RejectedPatchesAction: z.string().optional(),
  PatchGroups: z.array(z.string()).optional(),
  ApprovedPatchesComplianceLevel: z.string().optional(),
  ApprovedPatchesEnableNonSecurity: z.boolean().optional(),
  GlobalFilters: PatchFilterGroupSchema.optional(),
  AvailableSecurityUpdatesComplianceStatus: z.string().optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  accessKeyId: z.string().meta({ sensitive: true }).optional(),
  secretAccessKey: z.string().meta({ sensitive: true }).optional(),
  sessionToken: z.string().meta({ sensitive: true }).optional(),
  region: z.string().optional(),
  DefaultBaseline: z.boolean().describe(
    "Set the baseline as default baseline. Only registering to default patch baseline is allowed.",
  ).optional(),
  OperatingSystem: z.enum([
    "WINDOWS",
    "AMAZON_LINUX",
    "AMAZON_LINUX_2",
    "AMAZON_LINUX_2022",
    "AMAZON_LINUX_2023",
    "UBUNTU",
    "REDHAT_ENTERPRISE_LINUX",
    "SUSE",
    "CENTOS",
    "ORACLE_LINUX",
    "DEBIAN",
    "MACOS",
    "RASPBIAN",
    "ROCKY_LINUX",
    "ALMA_LINUX",
  ]).describe(
    "Defines the operating system the patch baseline applies to. The Default value is WINDOWS.",
  ).optional(),
  Description: z.string().min(1).max(1024).describe(
    "The description of the patch baseline.",
  ).optional(),
  ApprovalRules: z.object({
    PatchRules: z.array(RuleSchema).optional(),
  }).describe(
    "A set of rules defining the approval rules for a patch baseline.",
  ).optional(),
  Sources: z.array(PatchSourceSchema).describe(
    "Information about the patches to use to update the instances, including target operating systems and source repository. Applies to Linux instances only.",
  ).optional(),
  Name: z.string().min(3).max(128).regex(
    new RegExp("^[a-zA-Z0-9_\\-.]{3,128}$"),
  ).describe("The name of the patch baseline.").optional(),
  RejectedPatches: z.array(z.string().min(1).max(100)).describe(
    "A list of explicitly rejected patches for the baseline.",
  ).optional(),
  ApprovedPatches: z.array(z.string().min(1).max(100)).describe(
    "A list of explicitly approved patches for the baseline.",
  ).optional(),
  RejectedPatchesAction: z.enum(["ALLOW_AS_DEPENDENCY", "BLOCK"]).describe(
    "The action for Patch Manager to take on patches included in the RejectedPackages list.",
  ).optional(),
  PatchGroups: z.array(z.string().min(1).max(256)).describe(
    "PatchGroups is used to associate instances with a specific patch baseline",
  ).optional(),
  ApprovedPatchesComplianceLevel: z.enum([
    "CRITICAL",
    "HIGH",
    "MEDIUM",
    "LOW",
    "INFORMATIONAL",
    "UNSPECIFIED",
  ]).describe(
    "Defines the compliance level for approved patches. This means that if an approved patch is reported as missing, this is the severity of the compliance violation. The default value is UNSPECIFIED.",
  ).optional(),
  ApprovedPatchesEnableNonSecurity: z.boolean().describe(
    "Indicates whether the list of approved patches includes non-security updates that should be applied to the instances. The default value is 'false'. Applies to Linux instances only.",
  ).optional(),
  GlobalFilters: z.object({
    PatchFilters: z.array(PatchFilterSchema).optional(),
  }).describe(
    "A set of global filters used to include patches in the baseline.",
  ).optional(),
  AvailableSecurityUpdatesComplianceStatus: z.enum([
    "NON_COMPLIANT",
    "COMPLIANT",
  ]).describe(
    "The compliance status for vendor recommended security updates that are not approved by this patch baseline.",
  ).optional(),
  Tags: z.array(TagSchema).describe(
    "Optional metadata that you assign to a resource. Tags enable you to categorize a resource in different ways.",
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

/** Swamp extension model for SSM PatchBaseline. Registered at `@swamp/aws/ssm/patch-baseline`. */
export const model = {
  type: "@swamp/aws/ssm/patch-baseline",
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
      description: "SSM PatchBaseline resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a SSM PatchBaseline",
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
          "AWS::SSM::PatchBaseline",
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
      description: "Get a SSM PatchBaseline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM PatchBaseline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const result = await readResource(
          "AWS::SSM::PatchBaseline",
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
      description: "Update a SSM PatchBaseline",
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
          "AWS::SSM::PatchBaseline",
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
          "AWS::SSM::PatchBaseline",
          identifier,
          currentState,
          desiredState,
          ["OperatingSystem"],
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
      description: "Delete a SSM PatchBaseline",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the SSM PatchBaseline",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const credentials = _buildCredentials(context.globalArgs);
        const { existed } = await deleteResource(
          "AWS::SSM::PatchBaseline",
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
      description: "Sync SSM PatchBaseline state from AWS",
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
            "AWS::SSM::PatchBaseline",
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
