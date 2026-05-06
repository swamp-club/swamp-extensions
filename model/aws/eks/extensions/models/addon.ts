// Auto-generated extension model for @swamp/aws/eks/addon
// Do not edit manually. Re-generate with: deno task generate:aws

// deno-lint-ignore-file no-explicit-any

/**
 * Swamp extension model for EKS Addon (AWS::EKS::Addon).
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

const PodIdentityAssociationSchema = z.object({
  ServiceAccount: z.string().describe(
    "The Kubernetes service account that the pod identity association is created for.",
  ),
  RoleArn: z.string().regex(
    new RegExp("^arn:aws[a-zA-Z-]*:iam::\\d{12}:(role)\\/*"),
  ).describe(
    "The IAM role ARN that the pod identity association is created for.",
  ),
});

const TagSchema = z.object({
  Key: z.string().min(1).max(127).describe(
    "The key name of the tag. You can specify a value that is 1 to 127 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
  Value: z.string().min(1).max(255).describe(
    "The value for the tag. You can specify a value that is 1 to 255 Unicode characters in length and cannot be prefixed with aws:. You can use any of the following characters: the set of Unicode letters, digits, whitespace, _,., /, =, +, and -.",
  ),
});

const GlobalArgsSchema = z.object({
  name: z.string().describe(
    "Instance name for this resource (used as the unique identifier in the factory pattern)",
  ),
  ClusterName: z.string().min(1).describe("Name of Cluster"),
  AddonName: z.string().min(1).describe("Name of Addon"),
  AddonVersion: z.string().min(1).describe("Version of Addon").optional(),
  PreserveOnDelete: z.boolean().describe("PreserveOnDelete parameter value")
    .optional(),
  ResolveConflicts: z.enum(["NONE", "OVERWRITE", "PRESERVE"]).describe(
    "Resolve parameter value conflicts",
  ).optional(),
  ServiceAccountRoleArn: z.string().min(1).describe(
    "IAM role to bind to the add-on's service account",
  ).optional(),
  PodIdentityAssociations: z.array(PodIdentityAssociationSchema).describe(
    "An array of pod identities to apply to this add-on.",
  ).optional(),
  ConfigurationValues: z.string().min(1).describe(
    "The configuration values to use with the add-on",
  ).optional(),
  NamespaceConfig: z.object({
    Namespace: z.string().describe(
      "The custom namespace for creating the add-on",
    ),
  }).describe("The custom namespace configuration to use with the add-on")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

const StateSchema = z.object({
  ClusterName: z.string(),
  AddonName: z.string(),
  AddonVersion: z.string().optional(),
  PreserveOnDelete: z.boolean().optional(),
  ResolveConflicts: z.string().optional(),
  ServiceAccountRoleArn: z.string().optional(),
  PodIdentityAssociations: z.array(PodIdentityAssociationSchema).optional(),
  ConfigurationValues: z.string().optional(),
  Arn: z.string().optional(),
  NamespaceConfig: z.object({
    Namespace: z.string(),
  }).optional(),
  Tags: z.array(TagSchema).optional(),
}).passthrough();

type StateData = z.infer<typeof StateSchema>;

const InputsSchema = z.object({
  name: z.string().optional(),
  ClusterName: z.string().min(1).describe("Name of Cluster").optional(),
  AddonName: z.string().min(1).describe("Name of Addon").optional(),
  AddonVersion: z.string().min(1).describe("Version of Addon").optional(),
  PreserveOnDelete: z.boolean().describe("PreserveOnDelete parameter value")
    .optional(),
  ResolveConflicts: z.enum(["NONE", "OVERWRITE", "PRESERVE"]).describe(
    "Resolve parameter value conflicts",
  ).optional(),
  ServiceAccountRoleArn: z.string().min(1).describe(
    "IAM role to bind to the add-on's service account",
  ).optional(),
  PodIdentityAssociations: z.array(PodIdentityAssociationSchema).describe(
    "An array of pod identities to apply to this add-on.",
  ).optional(),
  ConfigurationValues: z.string().min(1).describe(
    "The configuration values to use with the add-on",
  ).optional(),
  NamespaceConfig: z.object({
    Namespace: z.string().describe(
      "The custom namespace for creating the add-on",
    ).optional(),
  }).describe("The custom namespace configuration to use with the add-on")
    .optional(),
  Tags: z.array(TagSchema).describe(
    "An array of key-value pairs to apply to this resource.",
  ).optional(),
});

/** Swamp extension model for EKS Addon. Registered at `@swamp/aws/eks/addon`. */
export const model = {
  type: "@swamp/aws/eks/addon",
  version: "2026.05.06.1",
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
      toVersion: "2026.05.06.1",
      description: "No schema changes",
      upgradeAttributes: (old: Record<string, unknown>) => old,
    },
  ],
  globalArguments: GlobalArgsSchema,
  inputsSchema: InputsSchema,
  resources: {
    state: {
      description: "EKS Addon resource state",
      schema: StateSchema,
      lifetime: "infinite",
      garbageCollection: 10,
    },
  },
  methods: {
    create: {
      description: "Create a EKS Addon",
      arguments: z.object({}),
      execute: async (_args: Record<string, never>, context: any) => {
        const g = context.globalArgs;
        const desiredState: Record<string, unknown> = {};
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await createResource(
          "AWS::EKS::Addon",
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
      description: "Get a EKS Addon",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EKS Addon",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const result = await readResource(
          "AWS::EKS::Addon",
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
      description: "Update a EKS Addon",
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
        const idParts = [
          existing.ClusterName?.toString(),
          existing.AddonName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        const currentState = await readResource(
          "AWS::EKS::Addon",
          identifier,
        ) as StateData;
        const desiredState: Record<string, unknown> = { ...currentState };
        for (const [key, value] of Object.entries(g)) {
          if (key === "name") continue;
          if (value !== undefined) desiredState[key] = value;
        }
        const result = await updateResource(
          "AWS::EKS::Addon",
          identifier,
          currentState,
          desiredState,
          ["ClusterName", "AddonName", "NamespaceConfig"],
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
      description: "Delete a EKS Addon",
      arguments: z.object({
        identifier: z.string().describe(
          "The primary identifier of the EKS Addon",
        ),
      }),
      execute: async (args: { identifier: string }, context: any) => {
        const { existed } = await deleteResource(
          "AWS::EKS::Addon",
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
      description: "Sync EKS Addon state from AWS",
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
        const idParts = [
          existing.ClusterName?.toString(),
          existing.AddonName?.toString(),
        ];
        if (idParts.some((p) => !p)) {
          throw new Error(
            "Missing primary identifier fields in existing state",
          );
        }
        const identifier = idParts.join("|");
        try {
          const result = await readResource(
            "AWS::EKS::Addon",
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
